<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue'
import { withBase } from 'vitepress'
import mapData from '../../data/map.mjs'
import countries from '../../data/countries.mjs'
import { RESOURCES, deriveSpecialties } from '../../data/resources.mjs'
import { geoOf } from '../../data/geography.mjs'
import { metalTechOf } from '../../data/country-metal.mjs'
import { BUILDINGS } from '../../data/buildings.mjs'

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
const stateById = new Map(mapData.states.map((s) => [s.i, s]))
const countryByState = new Map()
for (const [id, st] of stateById) {
  const c =
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

const cellResources = computed(() => {
  const c = selected.value
  if (!c) return []
  const ids = BIOME_RES[c.biome] || []
  const country = c.s > 0 ? countryByState.get(c.s) : null
  const local = country
    ? new Set(deriveSpecialties(geoOf(country.name), { tech: metalTechOf(country.name) }).map((r) => r.id))
    : null
  const cands = ids
    .map((id) => RESOURCES.find((r) => r.id === id))
    .filter(Boolean)
    .map((r) => ({ id: r.id, name: r.name, icon: r.icon }))
  if (!local) return cands.slice(0, 4)
  const hit = cands.filter((r) => local.has(r.id))
  return (hit.length ? hit : cands).slice(0, 4)
})

const cellBuildings = computed(() => {
  const ids = new Set(cellResources.value.map((r) => r.id))
  if (!ids.size) return []
  return BUILDINGS.filter((b) => b.outputs && b.outputs.some((o) => ids.has(o))).slice(0, 3)
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
    if (c.s > 0 && mode.value === 'biome') {
      ctx.globalAlpha = 0.5
      ctx.strokeStyle = '#0b1412'
      ctx.lineWidth = 0.6 / view.scale
      ctx.stroke(p)
    }
  }
  ctx.globalAlpha = 1

  // 选中格高亮
  const sel = selected.value
  if (sel) {
    const idx = cells.value.indexOf(sel)
    if (idx >= 0) {
      ctx.strokeStyle = '#f3d9a4'
      ctx.lineWidth = 2 / view.scale
      ctx.stroke(paths[idx])
    }
  }
  ctx.restore()
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
      list.push({
        i: pr.i,
        s: pr.s,
        biome: BIOMES[pr.b]?.name || '未知',
        biomeId: pr.b,
        h: pr.h,
        p: pr.p,
        rings,
        bbox: [x0, y0, x1, y1]
      })
    }

    bounds = { x: minX, y: minY, w: maxX - minX, h: maxY - minY }
    maxPop.value = Math.max(1, ...list.map((c) => c.p))
    cells.value = list

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
  width: min(1500px, calc(100vw - 96px));
  margin-left: calc(50% - min(1500px, 100vw - 96px) / 2);
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
