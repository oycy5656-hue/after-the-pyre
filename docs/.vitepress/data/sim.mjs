// 经济模拟 v3：预算制产量、口粮标定、建材与扩建、亏损自动降级
// 标度：1 D = 一人日口粮（约 0.8 kg 谷物）；1 石 ≈ 30 D；每人每年 5 石

import { BUILD_COST, CATEGORY, deriveBuildings, slotCapacity, slotsUsed } from './buildings.mjs'
import { OUTPUT_CATEGORY, RESOURCES } from './resources.mjs'

const byId = new Map(RESOURCES.map((r) => [r.id, r]))
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export const FOOD_PER_CAPITA = 5
const MIN_EFF = 0.12
const AUTO_DOWNGRADE_BELOW = 0.55

function pickResource(category, specIds, valueOf, allowProcessed = false, mode = 'output') {
  const base = CATEGORY[category] || []
  const extra = allowProcessed ? OUTPUT_CATEGORY[category] || [] : []
  const pool0 = allowProcessed && extra.length ? extra : base
  const cands = pool0.filter((id) => byId.has(id))
  if (!cands.length) return null
  const owned = cands.filter((id) => specIds.has(id))
  if (mode === 'input') return owned[0] || cands[0]
  const pool = owned.length ? owned : cands
  return pool.sort((a, b) => valueOf(b) - valueOf(a))[0]
}

export function simulate({ specs, population, race, geo, area, levels = {}, priceOverrides = {}, autoAdjust = true }) {
  const specIds = new Set(specs.map((s) => s.id))
  const pop = Math.max(1, population || 1)
  const priceOf = (id) => (id ? priceOverrides[id] ?? byId.get(id)?.value ?? 1 : 1)

  const buildings = deriveBuildings(specs, pop, race).map((b) => {
    const level = levels[b.id] === undefined ? b.level : Number(levels[b.id]) || 0
    return {
      ...b,
      level,
      outRes: b.output.category === 'service' ? null : pickResource(b.output.category, specIds, priceOf, !!b.input),
      inRes: b.input ? pickResource(b.input.category, specIds, priceOf, false, 'input') : null,
      downgraded: 0
    }
  })

  const runPass = () => {
    const produced = new Map()
    const consumed = new Map()
    const add = (m, id, n) => m.set(id, (m.get(id) || 0) + n)

    for (const b of buildings) {
      if (!b.outRes || b.level <= 0 || b.input) continue
      const qtyPerLevel = b.budget / priceOf(b.outRes)
      b.qtyPerLevel = qtyPerLevel
      add(produced, b.outRes, qtyPerLevel * b.level)
    }

    for (const b of buildings) {
      if (!b.input || b.level <= 0) continue
      const outQty = b.budget / priceOf(b.outRes)
      const needPer = (b.budget * (b.inputShare || 0.55)) / priceOf(b.inRes)
      const need = needPer * b.level
      const have = b.inRes ? produced.get(b.inRes) || 0 : 0
      const eff = need > 0 ? clamp(have / need, MIN_EFF, 1) : 1
      b.eff = eff
      b.qtyPerLevel = outQty
      if (b.inRes) add(consumed, b.inRes, need)
      if (b.outRes) add(produced, b.outRes, outQty * b.level * eff)
    }

    return { produced, consumed, add }
  }

  let pass = runPass()
  if (autoAdjust) {
    for (let round = 0; round < 4; round++) {
      let changed = false
      for (const b of buildings) {
        if (!b.input || b.level <= 0) continue
        if ((b.eff ?? 1) < AUTO_DOWNGRADE_BELOW) {
          b.level -= 1
          b.downgraded += 1
          changed = true
        }
      }
      if (!changed) break
      pass = runPass()
    }
  }

  const { produced, consumed, add } = pass

  // 口粮：每人 5 石
  const grainIds = ['rice', 'maize', 'wheat', 'tuber', 'beans'].filter((id) => (produced.get(id) || 0) > 0)
  const grainTotal = grainIds.reduce((n, id) => n + (produced.get(id) || 0), 0)
  const foodNeed = Math.round(pop * FOOD_PER_CAPITA)
  if (grainTotal > 0) {
    for (const id of grainIds) add(consumed, id, Math.round(foodNeed * ((produced.get(id) || 0) / grainTotal)))
  }

  const rows = []
  const ids = new Set([...produced.keys(), ...consumed.keys()])
  for (const id of ids) {
    const res = byId.get(id)
    if (!res) continue
    const supply = Math.round(produced.get(id) || 0)
    const demand = Math.round(consumed.get(id) || 0)
    const net = supply - demand
    const pressure = demand > 0 ? (demand - supply) / Math.max(demand, supply, 1) : 0
    const base = priceOverrides[id] ?? res.value
    const price = Math.round(base * clamp(1 + pressure * 0.9, 0.55, 2.4) * 10) / 10
    rows.push({
      id, name: res.name, unit: res.unit, kind: res.kind, group: res.group,
      supply, demand, net, base, price, value: Math.round(Math.abs(net) * price)
    })
  }
  rows.sort((a, b) => b.value - a.value)

  const exportsValue = rows.filter((r) => r.net > 0).reduce((n, r) => n + r.net * r.price, 0)
  const importsValue = rows.filter((r) => r.net < 0).reduce((n, r) => n + -r.net * r.price, 0)

  for (const b of buildings) {
    if (b.level <= 0) {
      b.value = 0
      continue
    }
    b.eff = b.input ? b.eff ?? 1 : 1
    b.value = Math.round(b.budget * b.level * (b.input ? b.eff : 1))
  }

  const gdp = buildings.reduce((n, b) => n + (b.value || 0), 0)
  const cap = slotCapacity(geo, area)
  const used = slotsUsed(buildings)

  const timberNet = (produced.get('timber') || 0) - (consumed.get('timber') || 0)
  const stoneNet = (produced.get('stone') || 0) - (consumed.get('stone') || 0)
  const reserve = Math.max(0, gdp - importsValue)
  const buildable = Math.max(
    0,
    Math.min(
      Math.floor(Math.max(0, timberNet) / BUILD_COST.timber),
      Math.floor(Math.max(0, stoneNet) / BUILD_COST.stone),
      Math.floor(reserve / BUILD_COST.reserve)
    )
  )

  const chains = []
  for (const b of buildings) {
    if (!b.input || !b.outRes || b.level <= 0) continue
    chains.push({
      from: byId.get(b.inRes)?.name || '—',
      to: byId.get(b.outRes)?.name || '—',
      building: b.name,
      flow: Math.round((b.qtyPerLevel || 0) * b.level * (b.eff ?? 1)),
      eff: Math.round((b.eff ?? 1) * 100) / 100
    })
  }

  const processedActive = buildings.filter((b) => b.input && b.level > 0)
  const avgEff = processedActive.length ? processedActive.reduce((n, b) => n + (b.eff ?? 1), 0) / processedActive.length : 1

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
      efficiency: Math.round(avgEff * 100) / 100,
      timber: Math.round(timberNet),
      stone: Math.round(stoneNet),
      buildable,
      downgraded: buildings.filter((b) => b.downgraded > 0).length,
      foodNeed,
      foodSupply: Math.round(grainTotal)
    }
  }
}
