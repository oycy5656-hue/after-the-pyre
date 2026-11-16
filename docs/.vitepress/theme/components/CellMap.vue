<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue'
import { withBase } from 'vitepress'
import mapData from '../../data/map.mjs'
import countries from '../../data/countries.mjs'
import { RESOURCES, deriveSpecialties } from '../../data/resources.mjs'
import { geoOf } from '../../data/geography.mjs'
import { metalTechOf } from '../../data/country-metal.mjs'
import { BUILDINGS } from '../../data/buildings.mjs'
import { simulate } from '../../data/sim.mjs'

// FMG 生物群系 id → 名称/配色（0–12 为标准集，13 为该图自定义）
const BIOMES = {
  0: { name: '湖泊', color: '#2b4a5e' },
  1: { name: '热荒漠', color: '#c9a45c' },
  2: { name: '高寒荒漠', color: '#a99a86' },
  3: { name: '稀树草原', color: '#a8a35a' },
  4: { name: '草原', color: '#8f9e57' },
  5: { name: '热带季雨林', color: '#4b8a4a' },
  6: { name: '温带落叶阔叶林', color: '#5f9655' },
  7: { name: '热带雨林', color: '#2f7440' },
  8: { name: '温带雨林', color: '#4f8060' },
  9: { name: '亚寒带针叶林', color: '#3f6b57' },
  10: { name: '苔原', color: '#7c8b80' },
  11: { name: '冰川', color: '#cfd8d6' },
  12: { name: '湿地', color: '#3f7f78' },
  13: { name: '温带草原', color: '#9aa055' }
}

// 生物群系 → 本地物产（与经济模型同一套命名）
const BIOME_RES = {
  热荒漠: ['date', 'natron', 'salt', 'sulphur', 'camel'],
  高寒荒漠: ['stone', 'peat', 'fur'],
  稀树草原: ['cattle', 'goat', 'millet', 'cotton'],
  草原: ['wheat', 'barley', 'sheep', 'wool', 'horse'],
  热带季雨林: ['rice', 'bamboo', 'dye', 'spice'],
  温带落叶阔叶林: ['wheat', 'timber', 'flax', 'apple', 'honey'],
  热带雨林: ['hardwood', 'spice', 'pepper', 'feather'],
  温带雨林: ['timber', 'birch', 'resin', 'salmon'],
  亚寒带针叶林: ['timber', 'resin', 'rye', 'fur', 'salmon'],
  苔原: ['fur', 'peat', 'rye'],
  冰川: ['stone'],
  湿地: ['rice', 'clay', 'riverfish', 'reed'],
  温带草原: ['wheat', 'wool', 'hide', 'horse'],
  湖泊: ['riverfish', 'reed']
}

const canvas = ref(null)
const wrap = ref(null)
const loading = ref(true)
const progress = ref('')
const selected = ref(null)
const hover = ref(null)
const zoom = ref(1)
const mode = ref('biome')
const flipped = ref(false)

const cells = shallowRef([])
let borderEdges = []
const stateById = new Map(mapData.states.map((s) => [s.i, s]))
const countryByState = new Map()
for (const [id, st] of stateById) {
  const c =
    (st.country && countries.find((x) => x.name === st.country)) ||
    (st.slug && countries.find((x) => x.slug === st.slug)) ||
    countries.find((x) => x.name === st.name) ||
    countries.find((x) => st.name.includes(x.name) || x.name.includes(st.name))
  if (c) countryByState.set(id, c)
}

const view = { scale: 1, tx: 0, ty: 0 }
let baseScale = 1
let paths = []
let raf = 0

const maxPop = ref(1)
const popColor = (p) => {
  if (!p) return '#0b1210'
  const t = Math.min(1, Math.pow(p / maxPop.value, 0.45))
  const stops = [[16, 26, 23], [46, 92, 74], [120, 150, 70], [200, 168, 84], [226, 120, 70]]
  const i = Math.min(stops.length - 2, Math.floor(t * (stops.length - 1)))
  const f = t * (stops.length - 1) - i
  const a = stops[i]
  const b = stops[i + 1]
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f))
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

const colorOf = (c) => {
  if (mode.value === 'pop') return popColor(c.p)
  if (mode.value === 'state') return c.s > 0 ? (stateById.get(c.s)?.color || '#d8b878') : '#16211d'
  return BIOMES[c.biomeId]?.color || '#5f9655'
}

const fmtPop = (n) => (n >= 1e4 ? (n / 1e4).toFixed(1) + ' 万' : String(n))

// 各政权官方总人口（资料集）
const parsePop = (raw) => {
  const m = /^([\d.]+)\s*([KM]?)$/i.exec(String(raw || '').trim())
  if (!m) return 0
  const n = Number(m[1])
  const u = m[2].toUpperCase()
  return u === 'K' ? n * 1e3 : u === 'M' ? n * 1e6 : n
}

const BIOME_WEIGHT = {
  湖泊: 0.2,
  热荒漠: 0.15,
  高寒荒漠: 0.1,
  稀树草原: 0.9,
  草原: 1.1,
  热带季雨林: 0.8,
  温带落叶阔叶林: 1.3,
  热带雨林: 0.6,
  温带雨林: 0.8,
  亚寒带针叶林: 0.7,
  苔原: 0.2,
  冰川: 0.03,
  湿地: 0.9,
  温带草原: 1.0
}

const officialPop = new Map()
for (const c of countries) officialPop.set(c.name, parsePop(c.population))

/** 把官方人口摊到该政权的每个地块；无档案政权与无主之地保留地图原值 */
const redistributePopulation = (list) => {
  const byState = new Map()
  for (const c of list) {
    if (c.s <= 0) continue
    if (!byState.has(c.s)) byState.set(c.s, [])
    byState.get(c.s).push(c)
  }

  let officialCells = 0
  let officialTotal = 0
  for (const [sid, cellsOfState] of byState) {
    const country = countryByState.get(sid)
    const total = country ? officialPop.get(country.name) || 0 : 0
    if (!total) continue

    const weights = cellsOfState.map((c) => (BIOME_WEIGHT[c.biome] || 0.5) * (0.35 + Math.min(1, c.p / 6000)))
    const sum = weights.reduce((n, w) => n + w, 0) || 1

    let assigned = 0
    cellsOfState.forEach((c, i) => {
      const v = Math.round((total * weights[i]) / sum)
      c.p = v
      c.src = 'official'
      assigned += v
    })
    // 四舍五入误差补到权重最大的地块
    if (assigned !== Math.round(total)) {
      const idx = weights.indexOf(Math.max(...weights))
      cellsOfState[idx].p += Math.round(total) - assigned
    }
    officialCells += cellsOfState.length
    officialTotal += Math.round(total)
  }
  return { officialCells, officialTotal }
}

const popSource = ref({ officialCells: 0, officialTotal: 0, mapTotal: 0 })

// burgs(SVG 坐标) → cells(GeoJSON 坐标)：由 35 个首都质心拟合，平均误差 0.76
const BURG_TRANSFORM = { sx: 0.18695, ox: -178.38, sy: -0.18751, oy: 89.56 }

const capitals = (mapData.states || [])
  .filter((st) => st.capital && typeof st.capital.x === 'number' && typeof st.capital.y === 'number')
  .map((st) => ({
    name: st.capital.name,
    state: st.i,
    x: st.capital.x,
    y: st.capital.y,
    color: st.color || '#d8b878'
  }))

if (typeof window !== "undefined") window.__caps = capitals

const stateAgg = computed(() => {
  const sid = selected.value?.s
  if (!sid) return null
  const own = cells.value.filter((c) => c.s === sid)
  if (!own.length) return null
  const pop = own.reduce((n, c) => n + c.p, 0)
  const biomeCount = new Map()
  for (const c of own) biomeCount.set(c.biome, (biomeCount.get(c.biome) || 0) + 1)
  return {
    name: stateById.get(sid)?.name || '未知政权',
    country: countryByState.get(sid) || null,
    tiles: own.length,
    pop,
    biomes: [...biomeCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4)
  }
})

// 地形 → 物产大类偏好
const BIOME_PREFER = {
  热荒漠: ['grain', 'salt', 'spice', 'mineral'],
  高寒荒漠: ['stone', 'fur', 'peat'],
  稀树草原: ['livestock', 'grain', 'textile'],
  草原: ['grain', 'livestock', 'textile'],
  热带季雨林: ['grain', 'wood', 'spice', 'dye'],
  温带落叶阔叶林: ['grain', 'wood', 'textile', 'sweet'],
  热带雨林: ['wood', 'spice', 'herb'],
  温带雨林: ['wood', 'resin', 'fish'],
  亚寒带针叶林: ['wood', 'fur', 'resin', 'fish'],
  苔原: ['fur', 'peat', 'grain'],
  冰川: ['stone'],
  湿地: ['grain', 'clay', 'fish', 'herb'],
  温带草原: ['grain', 'livestock', 'hide'],
  湖泊: ['fish', 'herb']
}

const simCache = new Map()
const simOfState = (sid) => {
  if (simCache.has(sid)) return simCache.get(sid)
  const st = stateById.get(sid)
  const country = countryByState.get(sid)
  if (!st || !country) {
    simCache.set(sid, null)
    return null
  }
  const geo = geoOf(country.name)
  const specs = deriveSpecialties(geo, { tech: metalTechOf(country.name) })
  const own = cells.value.filter((c) => c.s === sid)
  const pop = own.reduce((n, c) => n + c.p, 0) || 1
  const sim = simulate({
    specs,
    population: pop,
    race: country.race,
    geo,
    area: st.area || 120,
    system: country.politics?.system
  })
  const out = { specs, sim, running: new Set(sim.buildings.filter((b) => b.level > 0).map((b) => b.id)) }
  simCache.set(sid, out)
  return out
}

const cellResources = computed(() => {
  const c = selected.value
  if (!c) return []
  const pack = c.s > 0 ? simOfState(c.s) : null
  if (pack) {
    const prefer = BIOME_PREFER[c.biome] || []
    const scored = pack.specs
      .map((sp) => {
        const r = RESOURCES.find((x) => x.id === sp.id)
        if (!r) return null
        const cat = r.category || sp.group || ''
        const bias = prefer.some((k) => String(cat).includes(k) || String(sp.group || '').includes(k)) ? 2 : 0
        const biomeBias = (BIOME_RES[c.biome] || []).includes(sp.id) ? 3 : 0
        return { id: r.id, name: r.name, icon: r.icon, score: bias + biomeBias }
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
    return scored.slice(0, 3)
  }
  // 未收录政权：只能按地形给采集物
  return (BIOME_RES[c.biome] || [])
    .map((id) => RESOURCES.find((r) => r.id === id))
    .filter(Boolean)
    .slice(0, 3)
    .map((r) => ({ id: r.id, name: r.name, icon: r.icon }))
})

const cellBuildings = computed(() => {
  const c = selected.value
  const ids = new Set(cellResources.value.map((r) => r.id))
  if (!c || !ids.size) return []
  const pack = c.s > 0 ? simOfState(c.s) : null
  const pool = pack
    ? BUILDINGS.filter((b) => pack.running.has(b.id))
    : BUILDINGS
  const hit = pool.filter((b) => b.outputs && b.outputs.some((o) => ids.has(o)))
  return (hit.length ? hit : pool.slice(0, 2)).slice(0, 3)
})

// ---------- 渲染 ----------
const project = (x, y) => [x, y]

const draw = () => {
  const cv = canvas.value
  if (!cv || !cells.value.length) return
  const ctx = cv.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const w = cv.width / dpr
  const h = cv.height / dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#07100e'
  ctx.fillRect(0, 0, w, h)

  ctx.save()
  ctx.translate(view.tx, view.ty)
  ctx.scale(view.scale, view.scale)
  if (flipped.value) {
    const cy = bounds.y + bounds.h / 2
    ctx.translate(0, 2 * cy)
    ctx.scale(1, -1)
  }

  const sidSel = selected.value?.s || 0
  for (let i = 0; i < cells.value.length; i++) {
    const c = cells.value[i]
    const p = paths[i]
    ctx.fillStyle = colorOf(c)
    ctx.globalAlpha = mode.value === 'pop' ? 1 : c.s > 0 ? 0.92 : 0.74
    ctx.fill(p)
  }
  ctx.globalAlpha = 1

  // 国界线（Vic3 风格）：两侧各画一条本国颜色的细线，彼此贴合
  if (mode.value !== 'pop' && borderEdges.length) {
    const band = 3.4 / view.scale
    ctx.lineCap = 'butt'
    ctx.globalAlpha = 1
    for (const e of borderEdges) {
      const ca = cells.value[e.a]
      const cb = cells.value[e.b]
      const caOwned = ca.s > 0
      const cbOwned = cb.s > 0
      if (!caOwned && !cbOwned) continue

      const dx = e.bx - e.ax
      const dy = e.by - e.ay
      const len = Math.hypot(dx, dy) || 1
      const nx = -dy / len
      const ny = dx / len

      // 一方是荒野：只沿边画一条细线，居中不偏移（避免双线重影）
      if (!caOwned || !cbOwned) {
        const owned = caOwned ? ca : cb
        ctx.strokeStyle = stateById.get(owned.s)?.color || '#d8b878'
        ctx.lineWidth = band * 0.55
        ctx.beginPath()
        ctx.moveTo(e.ax, e.ay)
        ctx.lineTo(e.bx, e.by)
        ctx.stroke()
        continue
      }

      // 两国相接：各画一条，彼此贴合
      const mx = (e.ax + e.bx) / 2
      const my = (e.ay + e.by) / 2
      const va = (ca.cx - mx) * nx + (ca.cy - my) * ny
      const side = va >= 0 ? 1 : -1

      ctx.strokeStyle = stateById.get(ca.s)?.color || '#d8b878'
      ctx.lineWidth = band
      ctx.beginPath()
      ctx.moveTo(e.ax + nx * side * band * 0.5, e.ay + ny * side * band * 0.5)
      ctx.lineTo(e.bx + nx * side * band * 0.5, e.by + ny * side * band * 0.5)
      ctx.stroke()

      ctx.strokeStyle = stateById.get(cb.s)?.color || '#d8b878'
      ctx.beginPath()
      ctx.moveTo(e.ax - nx * side * band * 0.5, e.ay - ny * side * band * 0.5)
      ctx.lineTo(e.bx - nx * side * band * 0.5, e.by - ny * side * band * 0.5)
      ctx.stroke()
    }
  }

  ctx.restore()

  // 首都标记（屏幕坐标绘制，文字始终正向）
  if (capitals.length) {
    const flipCenter = bounds.y + bounds.h / 2
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (const cap of capitals) {
      const my = flipped.value ? 2 * flipCenter - cap.y : cap.y
      const px = view.tx + cap.x * view.scale
      const py = view.ty + my * view.scale
      if (px < -40 || py < -40 || px > w + 40 || py > h + 40) continue

      ctx.beginPath()
      ctx.arc(px, py, 4.2, 0, Math.PI * 2)
      ctx.fillStyle = cap.color
      ctx.fill()
      ctx.lineWidth = 1.4
      ctx.strokeStyle = 'rgba(240,230,210,0.9)'
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(px, py, 1.4, 0, Math.PI * 2)
      ctx.fillStyle = '#0b1412'
      ctx.fill()

      if (view.scale > baseScale * 1.15) {
        ctx.font = '11px system-ui, sans-serif'
        ctx.lineWidth = 3
        ctx.strokeStyle = 'rgba(6,9,8,0.85)'
        ctx.strokeText(cap.name, px, py + 13)
        ctx.fillStyle = '#f0e6d2'
        ctx.fillText(cap.name, px, py + 13)
      }
    }
  }

  // 选中格高亮
  const sel = selected.value
  if (sel) {
    const idx = cells.value.indexOf(sel)
    if (idx >= 0) {
      ctx.save()
      ctx.translate(view.tx, view.ty)
      ctx.scale(view.scale, view.scale)
      if (flipped.value) {
        const c = bounds.y + bounds.h / 2
        ctx.translate(0, 2 * c)
        ctx.scale(1, -1)
      }
      ctx.strokeStyle = '#f3d9a4'
      ctx.lineWidth = 2 / view.scale
      ctx.stroke(paths[idx])
      ctx.restore()
    }
  }
}

const requestDraw = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    draw()
  })
}

const resize = () => {
  const cv = canvas.value
  const box = wrap.value?.getBoundingClientRect()
  if (!cv || !box) return
  const dpr = window.devicePixelRatio || 1
  cv.width = Math.round(box.width * dpr)
  cv.height = Math.round(box.height * dpr)
  cv.style.width = box.width + 'px'
  cv.style.height = box.height + 'px'
  requestDraw()
}

const fit = () => {
  const cv = canvas.value
  if (!cv) return
  const dpr = window.devicePixelRatio || 1
  const w = cv.width / dpr
  const h = cv.height / dpr
  const b = bounds
  const s = Math.min((w - 24) / b.w, (h - 24) / b.h)
  baseScale = s
  view.scale = s
  view.tx = (w - b.w * s) / 2 - b.x * s
  view.ty = (h - b.h * s) / 2 - b.y * s
  requestDraw()
}

let bounds = { x: 0, y: 0, w: 1, h: 1 }

// ---------- 交互 ----------
let dragging = false
let last = { x: 0, y: 0 }
let moved = 0

const onDown = (e) => {
  dragging = true
  moved = 0
  last = { x: e.clientX, y: e.clientY }
}
const onMove = (e) => {
  if (!dragging) return
  const dx = e.clientX - last.x
  const dy = e.clientY - last.y
  moved += Math.abs(dx) + Math.abs(dy)
  last = { x: e.clientX, y: e.clientY }
  view.tx += dx
  view.ty += dy
  requestDraw()
}
const onUp = (e) => {
  const wasDrag = moved > 4
  dragging = false
  if (!wasDrag) pick(e)
}

const onWheel = (e) => {
  e.preventDefault()
  const cv = canvas.value
  const rect = cv.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  const factor = e.deltaY < 0 ? 1.25 : 0.8
  const next = Math.min(baseScale * 12, Math.max(baseScale * 0.7, view.scale * factor))
  const k = next / view.scale
  view.tx = mx - (mx - view.tx) * k
  view.ty = my - (my - view.ty) * k
  view.scale = next
  zoom.value = next / baseScale
  requestDraw()
}

const pick = (e) => {
  const cv = canvas.value
  const rect = cv.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  const x = (mx - view.tx) / view.scale
  let y = (my - view.ty) / view.scale
  if (flipped.value) y = 2 * (bounds.y + bounds.h / 2) - y

  for (let i = 0; i < cells.value.length; i++) {
    const c = cells.value[i]
    const b = c.bbox
    if (x < b[0] || x > b[2] || y < b[1] || y > b[3]) continue
    if (inside(x, y, c.rings)) {
      selected.value = c
      requestDraw()
      return
    }
  }
  selected.value = null
  requestDraw()
}

const inside = (x, y, rings) => {
  let cnt = 0
  for (const ring of rings) {
    let c = false
    for (let i = 0, n = ring.length; i < n; i++) {
      const [x1, y1] = ring[i]
      const [x2, y2] = ring[(i + 1) % n]
      if (y1 > y !== y2 > y) {
        const xin = ((x2 - x1) * (y - y1)) / (y2 - y1 + 1e-12) + x1
        if (x < xin) c = !c
      }
    }
    if (c) cnt++
  }
  return cnt % 2 === 1
}

// ---------- 载入 ----------
onMounted(async () => {
  resize()
  window.addEventListener('resize', resize)
  try {
    const url = withBase('/map/cells.geojson')
    const res = await fetch(url)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const geo = await res.json()
    progress.value = '解析地块…'

    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    const list = []

    for (const f of geo.features) {
      const pr = f.properties
      const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates
      const rings = []
      let x0 = Infinity
      let y0 = Infinity
      let x1 = -Infinity
      let y1 = -Infinity
      for (const poly of polys) {
        for (const ring of poly) {
          rings.push(ring)
          for (const [x, y] of ring) {
            if (x < x0) x0 = x
            if (x > x1) x1 = x
            if (y < y0) y0 = y
            if (y > y1) y1 = y
          }
        }
      }
      if (!rings.length) continue
      minX = Math.min(minX, x0)
      minY = Math.min(minY, y0)
      maxX = Math.max(maxX, x1)
      maxY = Math.max(maxY, y1)
      let sumX = 0
      let sumY = 0
      let cnt = 0
      for (const ring of rings) {
        for (const [px, py] of ring) {
          sumX += px
          sumY += py
          cnt++
        }
      }

      list.push({
        i: pr.i,
        cx: cnt ? sumX / cnt : 0,
        cy: cnt ? sumY / cnt : 0,
        s: pr.s,
        biome: BIOMES[pr.b]?.name || '未知',
        biomeId: pr.b,
        h: pr.h,
        p: pr.p,
        rings,
        bbox: [x0, y0, x1, y1]
      })
    }

    const mapTotal = list.reduce((n, c) => n + c.p, 0)
    const info = redistributePopulation(list)
    popSource.value = { ...info, mapTotal }

    // 首都吸附：偏离本州地块质心过远时拉回质心
    const centers = new Map()
    for (const c of list) {
      if (!c.s) continue
      const cur = centers.get(c.s) || { n: 0, x: 0, y: 0 }
      const rings = c.rings
      let n = 0
      let sx = 0
      let sy = 0
      for (const ring of rings) for (const [x, y] of ring) { sx += x; sy += y; n++ }
      cur.n += n; cur.x += sx; cur.y += sy
      centers.set(c.s, cur)
    }
    const snapCapitals = () => {
      for (const cap of capitals) {
        const c = centers.get(cap.state)
        if (!c) continue
        const cx = c.x / c.n
        const cy2 = c.y / c.n
        const d = Math.hypot(cap.x - cx, cap.y - cy2)
        if (d > 6) { cap.x = cx; cap.y = cy2 }
      }
    }
    // 首都坐标已由数据端校准，不再吸附到质心

    bounds = { x: minX, y: minY, w: maxX - minX, h: maxY - minY }
    maxPop.value = Math.max(1, ...list.map((c) => c.p))
    cells.value = list

    // —— 国境边预计算：每条边若属于不同政权，则记录双方颜色 ——
    {
      const seen = new Map()
      const edges = []
      // 所有地块都参与建边，才能画出与荒野的国境
      for (let i = 0; i < list.length; i++) {
        const c = list[i]
        for (const ring of c.rings) {
          for (let k = 0; k < ring.length - 1; k++) {
            const [ax, ay] = ring[k]
            const [bx, by] = ring[k + 1]
            const q = (v) => Math.round(v * 2) / 2
            const qax = q(ax)
            const qay = q(ay)
            const qbx = q(bx)
            const qby = q(by)
            const key =
              qax < qbx || (qax === qbx && qay <= qby)
                ? qax + ',' + qay + '|' + qbx + ',' + qby
                : qbx + ',' + qby + '|' + qax + ',' + qay
            if (!seen.has(key)) {
              seen.set(key, i)
            } else {
              const other = seen.get(key)
              if (other === i || other === -1) continue
              const oc = list[other]
              if (oc.s !== c.s) {
                edges.push({ ax, ay, bx, by, a: i, b: other })
              } else {
                // 同国相邻：把边记为内部（不再重复统计）
                seen.set(key, -1)
              }
            }
          }
        }
      }
      borderEdges = edges
      window.__bd = { edges: edges.length, owned: list.filter((c) => c.s > 0).length }
    }

    const cv = canvas.value
    const ctx = cv.getContext('2d')
    paths = list.map((c) => {
      const p = new Path2D()
      for (const ring of c.rings) {
        p.moveTo(ring[0][0], ring[0][1])
        for (let k = 1; k < ring.length; k++) p.lineTo(ring[k][0], ring[k][1])
        p.closePath()
      }
      return p
    })
    void ctx

    loading.value = false
    fit()

    // 延迟聚焦：等画布完成首次布局
    setTimeout(() => {
    const focus = Number(new URLSearchParams(window.location.search).get('state') || 0)
    if (focus > 0) {
      const own = list.filter((c) => c.s === focus)
      if (own.length) {
        selected.value = own[0]
      }
      if (own.length) {
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
        for (const c of own) {
          x0 = Math.min(x0, c.bbox[0]); y0 = Math.min(y0, c.bbox[1])
          x1 = Math.max(x1, c.bbox[2]); y1 = Math.max(y1, c.bbox[3])
        }
        const pad = Math.max(20, (x1 - x0) * 0.15)
        const w = x1 - x0 + pad * 2
        const h = y1 - y0 + pad * 2
        const cv2 = canvas.value
        const dpr = window.devicePixelRatio || 1
        const cw = cv2.width / dpr
        const ch = cv2.height / dpr
        const sc = Math.min(cw / w, ch / h)
        view.scale = sc
        view.tx = cw / 2 - (x0 + x1) / 2 * sc
        view.ty = ch / 2 - (y0 + y1) / 2 * sc
        baseScale = sc
        requestDraw()
      }
    }
    }, 700)
  } catch (e) {
    progress.value = '加载失败：' + e.message
    loading.value = false
  }
})
</script>

<template>
  <div class="cm">
    <div ref="wrap" class="cm-stage">
      <canvas
        ref="canvas"
        class="cm-canvas"
        @mousedown="onDown"
        @mousemove="onMove"
        @mouseup="onUp"
        @mouseleave="onUp"
        @wheel="onWheel"
      />

      <div class="cm-tools">
        <button type="button" @click="zoom = zoom; view.scale = Math.max(baseScale * 0.7, view.scale / 1.3); requestDraw()">−</button>
        <span>{{ zoom.toFixed(1) }}×</span>
        <button type="button" @click="view.scale = Math.min(baseScale * 12, view.scale * 1.3); requestDraw()">+</button>
        <button type="button" class="cm-fit" @click="fit">复位</button>
        <button
          type="button"
          class="cm-fit"
          :class="{ on: flipped }"
          title="上下翻转地图"
          @click="flipped = !flipped; requestDraw()"
        >翻转</button>
      </div>

      <div v-if="loading" class="cm-loading">{{ progress || '载入地块…' }}</div>

      <div class="cm-modes">
        <button type="button" :class="{ on: mode === 'biome' }" @click="mode = 'biome'; requestDraw()">地形</button>
        <button type="button" :class="{ on: mode === 'state' }" @click="mode = 'state'; requestDraw()">政权</button>
        <button type="button" :class="{ on: mode === 'pop' }" @click="mode = 'pop'; requestDraw()">人口</button>
      </div>

      <div v-if="mode === 'pop'" class="cm-legend cm-ramp">
        <span class="cm-ramp-title">人口密度</span>
        <i class="cm-ramp-bar" />
        <span class="cm-ramp-labels"><b>稀少</b><b>稠密</b></span>
      </div>

      <ul v-if="mode === 'biome'" class="cm-legend">
        <li v-for="(b, id) in BIOMES" :key="id">
          <i :style="{ background: b.color }" />{{ b.name }}
        </li>
      </ul>
    </div>

    <aside class="cm-side">
      <template v-if="!selected">
        <h3>地块地图</h3>
        <p class="hint">
          滚轮缩放、拖动平移；点击任意地块查看地形、人口与可建建筑。
          有色块的国家表示该地块已被政权占据，其余为无主荒野。
        </p>
        <p class="hint" v-if="cells.length">共 {{ cells.length }} 个地块（仅陆地）</p>
      </template>

      <template v-else>
        <p class="cm-biome" :style="{ borderColor: BIOMES[selected.biomeId]?.color }">
          <i :style="{ background: BIOMES[selected.biomeId]?.color }" />{{ selected.biome }}
        </p>
        <h3>{{ selected.s > 0 ? (stateById.get(selected.s)?.name || '未知政权') : '无主荒野' }}</h3>
        <p v-if="selected.s > 0 && !countryByState.get(selected.s)" class="hint">该政权尚未收入国家资料集，仅显示地块数据。</p>
        <p class="hint">
          海拔 {{ selected.h }} m · 人口 {{ fmtPop(selected.p) }}
        </p>

        <p class="label">本地物产</p>
        <ul class="chips">
          <li v-for="r in cellResources" :key="r.id">{{ r.icon }} {{ r.name }}</li>
        </ul>

        <p class="label">可建建筑</p>
        <ul class="list">
          <li v-for="b in cellBuildings" :key="b.id">
            <span>{{ b.name }}</span>
            <em>{{ b.labor }} 人/级</em>
          </li>
        </ul>
        <p v-if="!cellBuildings.length" class="hint">此地只有采集，没有加工设施。</p>

        <template v-if="stateAgg">
          <p class="label">全境</p>
          <ul class="agg">
            <li><span>地块</span><b>{{ stateAgg.tiles }}</b></li>
            <li><span>人口</span><b>{{ fmtPop(stateAgg.pop) }}</b></li>
            <li><span>种族</span><b>{{ stateAgg.country?.race || '未收录' }}</b></li>
            <li><span>政体</span><b>{{ stateAgg.country?.politics?.system || '—' }}</b></li>
          </ul>
        </template>
      </template>
    </aside>
  </div>
</template>

<style scoped>
.cm {
  width: 100%;
  max-width: 1560px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 16px;
  max-width: 1500px;
  margin: 0 auto;
  align-items: start;
}

.cm-stage {
  position: relative;
  height: 680px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  background: #07100e;
}

.cm-canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
}

.cm-canvas:active {
  cursor: grabbing;
}

.cm-tools {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  background: rgba(6, 9, 8, 0.8);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  backdrop-filter: blur(6px);
}

.cm-tools button {
  width: 22px;
  height: 22px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  cursor: pointer;
}

.cm-fit {
  width: auto !important;
  padding: 0 9px;
  border-radius: 999px !important;
}

.cm-tools .cm-fit.on {
  color: #0b1412;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.cm-loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  background: rgba(6, 9, 8, 0.6);
}

.cm-modes {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 4px;
  padding: 4px;
  background: rgba(6, 9, 8, 0.8);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  backdrop-filter: blur(6px);
}

.cm-modes button {
  padding: 3px 10px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  border-radius: 999px;
  cursor: pointer;
}

.cm-modes button.on {
  color: #0b1412;
  background: var(--vp-c-brand-1);
}

.cm-legend {
  position: absolute;
  left: 10px;
  bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 74%;
  margin: 0;
  padding: 8px 10px;
  list-style: none;
  font-size: 10.5px;
  color: var(--vp-c-text-3);
  background: rgba(6, 9, 8, 0.78);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  backdrop-filter: blur(6px);
}

.cm-ramp {
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  max-width: none;
}

.cm-ramp-title {
  font-size: 10px;
  letter-spacing: 0.06em;
}

.cm-ramp-bar {
  width: 150px;
  height: 7px;
  border-radius: 4px;
  background: linear-gradient(90deg, #101a17, #2e5c4a, #788c46, #c8a854, #e27846);
}

.cm-ramp-labels {
  display: flex;
  justify-content: space-between;
  width: 150px;
  font-size: 9px;
  color: var(--vp-c-text-3);
}

.cm-ramp-labels b {
  font-weight: 400;
}

.cm-legend li {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cm-legend i {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.cm-side {
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.cm-biome {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 6px;
  padding: 2px 9px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.cm-biome i {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.cm-side h3 {
  margin: 0 0 4px;
  font-size: 16px;
}

.hint {
  margin: 0 0 10px;
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--vp-c-text-3);
}

.label {
  margin: 14px 0 6px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.chips li {
  padding: 2px 8px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}

.list {
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list li {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 9px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background: var(--vp-c-bg);
}

.list em {
  font-style: normal;
  color: var(--vp-c-text-3);
}

.agg {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.agg li {
  display: flex;
  justify-content: space-between;
  padding: 5px 8px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
}

.agg b {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

@media (max-width: 900px) {
  .cm {
    grid-template-columns: minmax(0, 1fr);
  }
  .cm-stage {
    height: 520px;
  }
}
</style>
