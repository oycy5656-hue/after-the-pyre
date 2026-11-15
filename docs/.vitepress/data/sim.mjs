// 经济模拟：建筑 → 产出 → 投入需求 → 缺口降效 → 供需定价 → 贸易差额

import { CATEGORY, deriveBuildings, slotCapacity, slotsUsed } from './buildings.mjs'
import { OUTPUT_CATEGORY, RESOURCES } from './resources.mjs'

const byId = new Map(RESOURCES.map((r) => [r.id, r]))
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const SCALE = 1000 // 建筑产量按千单位计

/** 为一个国家挑选每个类别实际产出的资源（取该国物产里最值钱的那个） */
function pickResource(category, specIds, valueOf, allowProcessed = false, mode = 'output') {
  const base = CATEGORY[category] || []
  const extra = allowProcessed ? OUTPUT_CATEGORY[category] || [] : []
  const pool0 = allowProcessed && extra.length ? extra : base
  const cands = pool0.filter((id) => byId.has(id))
  if (!cands.length) return null
  const owned = cands.filter((id) => specIds.has(id))
  if (mode === 'input') {
    // 输入按「主要候选」解释，缺料就靠进口，不用最贵的那种充数
    return owned[0] || cands[0]
  }
  const pool = owned.length ? owned : cands
  return pool.sort((a, b) => valueOf(b) - valueOf(a))[0]
}

/**
 * @param {object} p
 * @param {Array} p.specs 该国物产（含 id）
 * @param {number} p.population
 * @param {string} p.race
 * @param {object} p.geo
 * @param {number} p.area
 * @param {object} p.levels 建筑等级覆盖 { buildingId: level }
 * @param {object} p.priceOverrides 资源价格覆盖 { id: price }
 */
function grainTotalTotal(produced) {
  return ['rice', 'maize', 'wheat', 'tuber', 'beans'].reduce((n, id) => n + (produced.get(id) || 0), 0)
}

export function simulate({ specs, population, race, geo, area, levels = {}, priceOverrides = {} }) {
  const specIds = new Set(specs.map((s) => s.id))
  const valueOf = (id) => priceOverrides[id] ?? byId.get(id)?.value ?? 1

  const buildings = deriveBuildings(specs, population, race).map((b) => {
    const level = levels[b.id] === undefined ? b.level : Number(levels[b.id]) || 0
    return {
      ...b,
      level,
      outRes: b.output.category === 'service' ? null : pickResource(b.output.category, specIds, valueOf, !!b.input),
      inRes: b.input ? pickResource(b.input.category, specIds, valueOf, false, 'input') : null
    }
  })

  // ---- 第一轮：原料产出 ----
  const produced = new Map()
  const consumed = new Map()
  const add = (m, id, n) => m.set(id, (m.get(id) || 0) + n)

  for (const b of buildings) {
    if (!b.outRes || b.level <= 0 || b.input) continue
    add(produced, b.outRes, b.output.qty * b.level * SCALE)
  }

  // ---- 第二轮：加工建筑，按缺口算效率 ----
  const effOf = new Map()
  for (const b of buildings) {
    if (!b.input || b.level <= 0) continue
    const need = b.input.qty * b.level * SCALE
    const inRes = b.inRes
    const have = inRes ? produced.get(inRes) || 0 : 0
    const eff = need > 0 ? clamp(have / need, 0.12, 1) : 1
    effOf.set(b.id, eff)
    if (inRes) add(consumed, inRes, need) // 全额计入需求：缺口靠进口补
    if (b.outRes) add(produced, b.outRes, b.output.qty * b.level * eff * SCALE)
  }

  // ---- 居民口粮需求 ----
  const pop = Math.max(1, population || 1)
  const foodNeed = Math.round(grainTotalTotal(produced) * 0.62)
  const grain = ['rice', 'maize', 'wheat', 'tuber', 'beans'].filter((id) => (produced.get(id) || 0) > 0)
  const grainTotal = grain.reduce((n, id) => n + (produced.get(id) || 0), 0)
  if (grainTotal > 0) {
    for (const id of grain) add(consumed, id, Math.round(foodNeed * ((produced.get(id) || 0) / grainTotal)))
  }

  // ---- 供需与价格 ----
  const rows = []
  const ids = new Set([...produced.keys(), ...consumed.keys()])
  for (const id of ids) {
    const res = byId.get(id)
    if (!res) continue
    const supply = produced.get(id) || 0
    const demand = consumed.get(id) || 0
    const net = supply - demand
    const pressure = demand > 0 ? (demand - supply) / Math.max(demand, supply, 1) : 0
    const basePrice = priceOverrides[id] ?? res.value
    const price = Math.round(basePrice * clamp(1 + pressure * 0.9, 0.55, 2.4) * 100) / 100
    rows.push({
      id,
      name: res.name,
      unit: res.unit,
      kind: res.kind,
      group: res.group,
      supply,
      demand,
      net,
      base: res.value,
      price,
      value: Math.round(Math.abs(net) * price)
    })
  }
  rows.sort((a, b) => b.value - a.value)

  const exportsValue = rows.filter((r) => r.net > 0).reduce((n, r) => n + r.net * r.price, 0)
  const importsValue = rows.filter((r) => r.net < 0).reduce((n, r) => n + -r.net * r.price, 0)

  // ---- 建筑产值 ----
  for (const b of buildings) {
    if (b.level <= 0) {
      b.value = 0
      b.eff = 0
      continue
    }
    b.eff = b.input ? effOf.get(b.id) ?? 1 : 1
    if (b.outRes) b.value = Math.round(b.output.qty * b.level * b.eff * SCALE * valueOf(b.outRes))
    else b.value = Math.round(b.level * 420000) // 服务类按人头计价
  }

  const gdp = buildings.reduce((n, b) => n + (b.value || 0), 0)
  const cap = slotCapacity(geo, area)
  const used = slotsUsed(buildings)

  // ---- 产业链：原料 → 加工品 ----
  const chains = []
  for (const b of buildings) {
    if (!b.input || !b.outRes || b.level <= 0) continue
    chains.push({
      from: byId.get(b.inRes)?.name || '—',
      to: byId.get(b.outRes)?.name || '—',
      building: b.name,
      flow: Math.round(b.output.qty * b.level * b.eff * SCALE),
      eff: Math.round(b.eff * 100) / 100
    })
  }

  return {
    buildings,
    rows,
    chains,
    totals: {
      gdp: Math.round(gdp),
      exports: Math.round(exportsValue),
      imports: Math.round(importsValue),
      balance: Math.round(exportsValue - importsValue),
      slotsUsed: used,
      slotsCap: cap,
      efficiency: Math.round((buildings.filter((b) => b.input && b.level > 0).reduce((n, b) => n + b.eff, 0) /
        Math.max(1, buildings.filter((b) => b.input && b.level > 0).length)) * 100) / 100
    }
  }
}
