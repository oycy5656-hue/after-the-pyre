// 经济模拟 v3：预算制产量、口粮标定、建材与扩建、亏损自动降级
// 标度：1 D = 一人日口粮（约 0.8 kg 谷物）；1 石 ≈ 30 D；每人每年 5 石

import { BUILD_COST, CATEGORY, deriveBuildings, slotCapacity, slotsUsed } from './buildings.mjs'
import { OUTPUT_CATEGORY, RESOURCES, metalAccess } from './resources.mjs'
import { HOUSEHOLD_CRAFT } from './classes.mjs'
import { classesFor } from './class-gen.mjs'

const byId = new Map(RESOURCES.map((r) => [r.id, r]))
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export const FOOD_PER_CAPITA = 3
// 民生需求（每人每年），参考 Vic3 的消费品概念
export const CIVIC_DEMAND = {
  // 衣食：主食之外，腌鱼与奶酪是主要蛋白
  bread: 0.02,
  flour: 0.012,
  cheese: 0.02,
  saltedfish: 0.02,
  fishsauce: 0.012,
  beer: 0.03,
  wine: 0.01,
  mead: 0.006,
  // 衣物与家居：家庭纺织消耗原麻与原毛
  cloth: 0.03,
  linen: 0.012,
  woolen: 0.012,
  felt: 0.012,
  flax: 0.01,
  wool: 0.01,
  hemp: 0.006,
  nettle: 0.004,
  leather: 0.012,
  // 器用
  pottery: 0.025,
  amphora: 0.01,
  brick: 0.006,
  millstone: 0.002,
  wicker: 0.004,
  hornware: 0.003,
  stone_tool: 0.006,
  bone_tool: 0.004,
  fishhook: 0.001,
  rope: 0.006,
  pitch: 0.002,
  // 盐与燃料
  salt: 0.03,
  charcoal: 0.02,
  tar: 0.003,
  tallow: 0.006,
  // 医药与礼制
  herb: 0.02,
  honey: 0.01,
  wax: 0.006,
  oliveoil: 0.008,
  spice: 0.006,
  pepper: 0.005,
  ochre: 0.004,
  madder: 0.004,
  woad: 0.004,
  resin: 0.005,
  feather: 0.003,
  ivory: 0.001,
  amber: 0.001,
  jade: 0.001,
  bronze_ware: 0.002,
  // 原料的直接民生用途：建房、燃料、鲜食
  stone: 0.006,
  timber: 0.008,
  clay: 0.004,
  grape: 0.006,
  fig: 0.004,
  pig: 0.012,
  cattle: 0.002,
  fishhook: 0.001
}

const AUX_TABLE = {
  farm: ['flax', 'barley'],
  pasture: ['wool', 'hide'],
  quarry: ['clay', 'flint'],
  logging: ['bark', 'resin'],
  fishery: ['shellfish', 'seaweed'],
  saltern: ['natron'],
  human_manor: ['flax', 'barley']
}

const MIN_EFF = 0.12
/** 阶层消费强度：整体放大，避免大量货物堆在仓里 */
export const CLASS_DEMAND_MULT = 1.6
const AUTO_DOWNGRADE_BELOW = 0.55

function pickResource(category, specIds, valueOf, allowProcessed = false, mode = 'output', explicit = null) {
  if (Array.isArray(explicit) && explicit.length) {
    const valid = explicit.filter((id) => byId.has(id))
    const owned = valid.filter((id) => specIds.has(id))
    // 产出：本国有的优先，否则用清单里第一个（加工品不需要"拥有"原料清单）
    const pool = owned.length ? owned : valid
    return pool[0] || null
  }
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

export function simulate({ specs, population, race, geo, area, levels = {}, priceOverrides = {}, autoAdjust = true, mods = {}, season = null, system = null }) {
  const specIds = new Set(specs.map((s) => s.id))
  const pop = Math.max(1, population || 1)
  const priceOf = (id) => (id ? priceOverrides[id] ?? byId.get(id)?.value ?? 1 : 1)
  // 建筑规模随人口缩放：小国不会有和人口相称的产能
  // 建筑规模由等级决定，不再按人口压缩（否则小国无法自给）
  const scale = 1
  // 天赋修正：产出、抽取、交换
  const yieldMod = 1 + (mods.yield || 0)
  const exchangeMod = 1 + (mods.exchange || 0)
  const extractionMod = 1 + (mods.extraction || 0)

  const access = metalAccess(new Set(specs.map((x) => x.id)))
  const buildings = deriveBuildings(specs, pop, race, access).map((b) => {
    const level = levels[b.id] === undefined ? b.level : Number(levels[b.id]) || 0
    return {
      ...b,
      level,
      outRes: b.output.category === 'service' ? null : pickResource(b.output.category, specIds, priceOf, !!b.input, 'output', b.outputs),
      auxRes: (() => {
        const list = AUX_TABLE[b.id]
        if (!list) return null
        const owned = list.filter((id) => byId.has(id) && specIds.has(id))
        return owned.length ? owned : null
      })(),
      inRes: b.input ? pickResource(b.input.category, specIds, priceOf, false, 'input', b.inputs) : null,
      downgraded: 0
    }
  })

  // 容量约束：地块不够时按比例压缩全部建筑等级，保证收敛
  {
    const cap = slotCapacity(geo, area, pop)
    let used = slotsUsed(buildings)
    let rounds = 0
    while (used > cap && rounds++ < 40) {
      const factor = Math.max(0.2, (cap / used) * 0.985)
      for (const b of buildings) {
        if (b.level > 0) {
          b.level = Math.floor(b.level * factor)
          b.overCap = true
        }
      }
      used = slotsUsed(buildings)
    }
    // 兜底：仍有超出则从最大者逐级削
    let guard = 5000
    while (used > cap && guard-- > 0) {
      const target = buildings.filter((b) => b.level > 0).sort((a, b) => b.level - a.level)[0]
      if (!target) break
      target.level -= 1
      used = slotsUsed(buildings)
    }
  }

  // 劳力约束：每级建筑需要 labor 人，人口不足时按比例减产
  const totalLaborNeed = buildings.reduce((n, b) => n + (b.level > 0 ? (b.labor || 700) * b.level : 0), 0)
  const laborPool = pop * 0.42
  const laborFactor = totalLaborNeed > 0 ? clamp(laborPool / totalLaborNeed, 0.18, 1) : 1

  const runPass = () => {
    const produced = new Map()
    const consumed = new Map()
    const add = (m, id, n) => m.set(id, (m.get(id) || 0) + n)

    for (const b of buildings) {
      if (!b.outRes || b.level <= 0 || b.input) continue
      const qtyPerLevel = (b.budget * scale * yieldMod * laborFactor) / priceOf(b.outRes)
      b.qtyPerLevel = qtyPerLevel
      add(produced, b.outRes, qtyPerLevel * b.level)
      if (Array.isArray(b.auxRes)) {
        const each = 0.35 / b.auxRes.length
        for (const id of b.auxRes) {
          const auxQty = (b.budget * scale * yieldMod * laborFactor * each) / priceOf(id)
          add(produced, id, auxQty * b.level)
        }
      }
    }

    // 口粮预留：谷物先扣人口口粮，余量才进工业
    const grainSet = new Set(['wheat', 'barley', 'rye', 'oats', 'millet', 'rice', 'tuber', 'turnip', 'beans'])
    const grainTotalRaw = [...grainSet].reduce((n, id) => n + (produced.get(id) || 0), 0)
    const foodReserve = Math.min(grainTotalRaw, pop * FOOD_PER_CAPITA)
    const pool = new Map(produced)
    if (grainTotalRaw > 0) {
      const ratio = Math.max(0, 1 - (foodReserve * 0.92) / grainTotalRaw)
      for (const id of grainSet) {
        if (produced.has(id)) pool.set(id, (produced.get(id) || 0) * ratio)
      }
    }

    for (const b of buildings) {
      if (!b.input || b.level <= 0) continue
      const outQty = (b.budget * scale * yieldMod * laborFactor) / priceOf(b.outRes)
      const needPer = (b.budget * scale * yieldMod * (b.inputShare || 0.55)) / priceOf(b.inRes)
      const need = needPer * b.level
      const raw = b.inRes ? pool.get(b.inRes) || 0 : 0
      const have = raw * 0.88
      // 原料不足一成即视为无料可加工，直接关厂
      if (need > 0 && have < need * 0.1) {
        b.eff = 0
        b.closed = true
        b.level = 0
        continue
      }
      const eff = need > 0 ? clamp(have / need, 0.1, 1) : 1
      b.eff = eff
      b.closed = false
      b.qtyPerLevel = outQty
      if (b.inRes) {
        add(consumed, b.inRes, Math.min(need, have))
        pool.set(b.inRes, Math.max(0, have - need))
      }
      if (b.outRes) add(produced, b.outRes, outQty * b.level * eff)
    }

    return { produced, consumed, add }
  }

  let pass = runPass()
  const downgrades = []
  if (autoAdjust) {
    for (let round = 0; round < 4; round++) {
      let changed = false
      for (const b of buildings) {
        if (!b.input || b.level <= 0) continue
        if (b.closed) continue
        if ((b.eff ?? 1) < AUTO_DOWNGRADE_BELOW) {
          const from = b.level
          b.level -= 1
          b.downgraded += 1
          const hit = downgrades.find((d) => d.id === b.id)
          if (hit) {
            hit.times += 1
            hit.to = b.level
          } else {
            downgrades.push({ id: b.id, name: b.name, from, to: b.level, times: 1, eff: Math.round((b.eff ?? 0) * 100) })
          }
          changed = true
        }
      }
      if (!changed) break
      pass = runPass()
    }
  }

  // 自给调整：若口粮不足，优先补农田（不超容量）
  {
    const grainProd = () => {
      let g = 0
      for (const b of buildings) {
        if (b.outRes && ['wheat', 'barley', 'rye', 'oats', 'millet', 'rice', 'tuber', 'turnip', 'beans'].includes(b.outRes) && !b.input) {
          g += (b.qtyPerLevel || 0) * b.level
        }
      }
      return g
    }
    const need = pop * FOOD_PER_CAPITA
    let guard = 60
    while (grainProd() < need * 1.05 && guard-- > 0) {
      // 粮食安全优先：允许略微超出地块容量开垦
      const farm = buildings.find((b) => b.id === 'farm' || b.id === 'human_manor')
      if (!farm) break
      farm.level += 2
      pass = runPass()
    }
  }

  const { produced, consumed, add } = pass

  // 家庭手工业：农户自家纺纱、烧陶，补上作坊产能不足
  {
    for (const [outId, cfg] of Object.entries(HOUSEHOLD_CRAFT)) {
      const src = produced.get(cfg.from) || 0
      const srcDemand = consumed.get(cfg.from) || 0
      const surplus = Math.max(0, src - srcDemand)
      if (surplus <= 0) continue
      const made = surplus * cfg.rate
      if (made <= 0) continue
      pass.produced.set(outId, (pass.produced.get(outId) || 0) + made)
      pass.consumed.set(cfg.from, (pass.consumed.get(cfg.from) || 0) + made)
    }
  }


  // 口粮优先：先满足人口，再谈工业用粮
  const grainIds = CATEGORY.grain.filter((id) => (produced.get(id) || 0) > 0)
  const grainTotal = grainIds.reduce((n, id) => n + (produced.get(id) || 0), 0)
  const foodNeed = Math.round(pop * FOOD_PER_CAPITA)
  if (grainTotal > 0) {
    for (const id of grainIds) add(consumed, id, Math.round(foodNeed * ((produced.get(id) || 0) / grainTotal)))
  }

  // 营造需求：修城、铺路、开渠要吃掉石料与木材
  {
    const levels = buildings.reduce((n, b) => n + Math.max(0, b.level), 0)
    const works = [
      ['stone', levels * 700 + pop * 0.5],
      ['timber', levels * 132 + pop * 0.15],
      ['clay', levels * 40],
      ['brick', levels * 30]
    ]
    for (const [id, amount] of works) {
      if (!byId.has(id)) continue
      const supply = produced.get(id) || 0
      if (supply <= 0) continue
      // 营造只能吃掉手头石木的 85%，材料不够就少修几段
      const need = Math.min(Math.round(amount), Math.round(supply * 0.85))
      if (need > 0) add(consumed, id, need)
    }
  }

  // 阶层消费：阶层由该国背景生成，篮子只取本地可得的物产
  const classList = classesFor(
    { race, politics: { system } },
    new Set(specs.map((x) => x.id))
  )
  for (const cls of classList) {
    const cp = pop * cls.share
    for (const [id, per] of Object.entries(cls.basket)) {
      if (!byId.has(id)) continue
      if ((produced.get(id) || 0) <= 0 && (pass.produced.get(id) || 0) <= 0) continue
      const need = Math.round(cp * per * CLASS_DEMAND_MULT)
      if (need > 0) add(consumed, id, need)
    }
  }

  // 基础民生兜底：即便阶层篮子未覆盖，也保证盐、燃料有消耗
  for (const [id, per] of [['salt', 0.02], ['charcoal', 0.012]]) {
    if ((produced.get(id) || 0) <= 0) continue
    add(consumed, id, Math.round(pop * per))
  }

  // 影子经济：农户自纺、自酿、自烧的部分不进市场统计，但确实被消费掉了
  {
    const shadowGoods = ['cloth', 'linen', 'woolen', 'felt', 'leather', 'hornware', 'pottery', 'amphora', 'beer', 'mead', 'bread', 'flour', 'cheese', 'saltedfish', 'fishsauce', 'wicker', 'rope', 'stone_tool', 'bone_tool', 'clay', 'wheat', 'barley', 'rye', 'oats', 'millet', 'rice', 'tuber', 'turnip', 'beans']
    for (const id of shadowGoods) {
      const supply = produced.get(id) || 0
      const demand = consumed.get(id) || 0
      if (demand > supply && demand > 0) {
        produced.set(id, demand * 1.02)
      }
    }
  }

  const rows = []
  const ids = new Set([...produced.keys(), ...consumed.keys()])
  for (const id of ids) {
    const res = byId.get(id)
    if (!res) continue
    const supply = Math.round(produced.get(id) || 0)
    const demand = Math.round(consumed.get(id) || 0)
    const net = supply - demand
    let pressure = demand > 0 ? (demand - supply) / Math.max(demand, supply, 1) : 0
    // 没有本地需求时，按产量相对基数的多寡给出温和的价格波动（过剩压价、稀缺抬价）
    if (demand === 0) {
      const baseline = Math.max(1, pop * 0.02)
      pressure = clamp((baseline - supply) / Math.max(baseline, supply, 1), -0.25, 0.35)
    }
    // 季节：非当季的农产品价格上浮
    if (season && res.season && res.season !== 'year' && res.season !== season) pressure += 0.12
    const base = priceOverrides[id] ?? res.value
    const ratio = demand / Math.max(1, supply)
    const factor = clamp(0.62 + 0.62 * Math.sqrt(ratio) + pressure * 0.15, 0.5, 2.6)
    const price = Math.round(base * factor * 10) / 10
    const traded = Math.min(supply, demand)
    rows.push({
      id, name: res.name, unit: res.unit, kind: res.kind, group: res.group,
      supply, demand, net, base, price,
      traded,
      stock: Math.max(0, net),
      short: Math.max(0, -net),
      value: Math.round(Math.abs(net) * price)
    })
  }
  rows.sort((a, b) => b.value - a.value)

  const exportsValue0 = rows.filter((r) => r.net > 0).reduce((n, r) => n + r.net * r.price, 0)
  const importsValue0 = rows.filter((r) => r.net < 0).reduce((n, r) => n + -r.net * r.price, 0)
  const exportsValue = exportsValue0 * exchangeMod
  const importsValue = importsValue0 * exchangeMod

  for (const b of buildings) {
    if (b.level <= 0) {
      b.value = 0
      continue
    }
    b.eff = b.input ? b.eff ?? 1 : 1
    b.value = Math.round(b.budget * scale * b.level * yieldMod * (b.input ? b.eff : 1))
  }

  const gdp = buildings.reduce((n, b) => n + (b.value || 0), 0)
  const cap = slotCapacity(geo, area, pop)
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
      imports: 0,
      shortValue: Math.round(importsValue),
      balance: Math.round(exportsValue - importsValue),
      slotsUsed: used,
      slotsCap: cap,
      efficiency: Math.round(avgEff * 100) / 100,
      timber: Math.round(timberNet),
      stone: Math.round(stoneNet),
      buildable,
      downgraded: buildings.filter((b) => b.downgraded > 0).length,
      downgrades,
      foodNeed,
      foodSupply: Math.round(grainTotal)
    }
  }
}
