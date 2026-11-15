// 计算各国经济账，输出 docs/.vitepress/data/economy.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { BASE, COUNTRY_TRAITS, GOODS, REGION_MODS, TRAITS } from './economy-model.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = join(root, 'docs/.vitepress/data')

const countries = (await import(pathToFileURL(join(dataDir, 'countries.mjs')).href)).default
const map = (await import(pathToFileURL(join(dataDir, 'map.mjs')).href)).default

const parsePop = (raw) => {
  const m = /^([\d.]+)\s*([KM]?)$/i.exec(String(raw || '').trim())
  if (!m) return 0
  const n = Number(m[1])
  const unit = m[2].toUpperCase()
  return unit === 'K' ? n * 1e3 : unit === 'M' ? n * 1e6 : n
}

const normalize = (n) => String(n || '').replace(/(帝国|共和国|王国|至高国|王朝|城|国)$/g, '').trim()
const stateByName = new Map()
for (const s of map.states) {
  stateByName.set(s.name, s)
  stateByName.set(normalize(s.name), s)
}
const burgsByState = new Map()
for (const b of map.burgs) burgsByState.set(b.state, (burgsByState.get(b.state) || 0) + 1)

const ALIAS = {
  '八菽之囿': '八薮之囿',
  '白昀': '白韵',
  '德拉米共和国': '德拉米',
  '遴选': '遴选城',
  '鸾尾花帝国': '鸾尾花',
  '吉利卡斯至高国': '吉利卡斯',
  '维瑞亚帝国': '维瑞亚'
}

const findState = (c) => {
  const cands = [c.name, ALIAS[c.name], normalize(c.name)].filter(Boolean)
  for (const k of cands) if (stateByName.has(k)) return stateByName.get(k)
  for (const k of cands) {
    for (const s of map.states) if (s.name.includes(k) || k.includes(s.name)) return s
  }
  return null
}

const traitByName = new Map(TRAITS.map((t) => [t.name, t]))

// 政体对经济的结构性影响（与天赋叠加）
const SYSTEM_MODS = {
  封建君主制: { yield: 0.02, extraction: 0.01 },
  神王统治: { stability: 0.05, extraction: 0.04, yield: -0.02 },
  贵族共和制: { exchange: 0.06, extraction: 0.02 },
  军事民主制: { military: 0.06, stability: 0.02, yield: -0.01 },
  蛮族王国: { military: 0.05, exchange: -0.04, yield: -0.02 },
  氏族联盟: { stability: 0.02, exchange: -0.03, extraction: -0.03 },
  寡头共和制: { exchange: 0.05, extraction: 0.03 },
  魔权共和制: { yield: -0.03, military: 0.04, ritual: 0.03 }
}

const rows = countries.map((c) => {
  const pop = parsePop(c.population)
  const traits = (COUNTRY_TRAITS[c.name] || []).map((n) => traitByName.get(n)).filter(Boolean)
  const st = findState(c)
  const area = st ? Math.max(1, st.area || 0) : null

  // 累加修正
  const mod = { yield: 0, extraction: 0, ritual: 0, exchange: 0, stability: 0, military: 0, labor: 0 }
  for (const t of traits) for (const [k, v] of Object.entries(t.e)) mod[k] = (mod[k] || 0) + v
  const sm = SYSTEM_MODS[c.politics?.system]
  if (sm) for (const [k, v] of Object.entries(sm)) mod[k] = (mod[k] || 0) + v

  // 集聚效应：人口越多、地块越紧，分工与交换越深；地广人稀则人均产出偏低
  if (pop > 0) {
    const scale = Math.log10(pop / 1000 + 1)
    mod.yield = (mod.yield || 0) + Math.min(0.16, scale * 0.06)
    mod.exchange = (mod.exchange || 0) + Math.min(0.12, scale * 0.05)
    if (area) {
      const density = pop / area // 人 / 地块单位
      const d = Math.min(0.14, Math.max(-0.06, (Math.log10(Math.max(10, density)) - 2) * 0.08))
      mod.exchange = (mod.exchange || 0) + d
    }
  }

  for (const tag of c.region?.traits || []) {
    const r = REGION_MODS[tag]
    if (!r) continue
    for (const [k, v] of Object.entries(r)) mod[k] = (mod[k] || 0) + v
  }

  const yieldRate = BASE.perCapita * (1 + mod.yield)
  const gross = pop * yieldRate
  const extractionRate = Math.min(0.45, Math.max(0.05, BASE.extraction + mod.extraction))
  const ritualRate = Math.min(0.3, Math.max(0.01, BASE.ritual + mod.ritual))
  const upkeep = gross * BASE.upkeep

  const extracted = gross * extractionRate
  const ritual = gross * ritualRate
  const surplus = gross - extracted - ritual - upkeep
  const perCapitaSurplus = pop ? surplus / pop : 0
  const surplusRate = gross ? surplus / gross : 0

  const exchange = Math.max(0.08, Math.min(0.95, BASE.exchangeBase + mod.exchange))
  const radius = Math.round(12 + 140 * Math.sqrt((area || 300) / 1000) * (0.4 + exchange))

  const reserveMonths = Math.max(0.4, BASE.reserveMonths * (1 + mod.yield * 1.4 - extractionRate - ritualRate + 0.2))
  const mobilization = Math.max(0.004, BASE.mobilization * (1 + mod.military))
  const levy = Math.round(pop * mobilization)

  // 经济体质：剩余率为主，兼顾交换、储备与稳定；超额抽取与仪式损耗扣分
  const stable = 0.5 + mod.stability
  const raw =
    20 +
    35 * Math.min(1, Math.max(0, surplusRate) / 0.7) +
    15 * exchange +
    15 * Math.min(1, reserveMonths / 6) +
    10 * Math.min(1, Math.max(0, stable)) -
    60 * Math.max(0, extractionRate - BASE.extraction) -
    40 * Math.max(0, ritualRate - BASE.ritual)
  const score = pop ? Math.max(1, Math.min(100, Math.round(raw))) : null

  return {
    name: c.name,
    slug: c.slug,
    population: pop,
    populationText: c.population || '—',
    area,
    traits: traits.map((t) => t.name),
    traitNames: traits.length,
    mod,
    gross: Math.round(gross),
    perCapita: Math.round(yieldRate),
    extractionRate,
    ritualRate,
    upkeep: Math.round(upkeep),
    extracted: Math.round(extracted),
    ritual: Math.round(ritual),
    surplus: Math.round(surplus),
    perCapitaSurplus: Math.round(perCapitaSurplus),
    surplusRate,
    exchange,
    radius,
    reserveMonths: Math.round(reserveMonths * 10) / 10,
    levy,
    score
  }
})

// 产出构成（仅对有天赋数据的国家细分）
const detail = rows
  .filter((r) => r.traits.length)
  .map((r) => ({
    name: r.name,
    parts: [
      { label: '谷物与根茎', value: Math.round(r.gross * 0.58), color: '#8fae6a' },
      { label: '织物与陶器', value: Math.round(r.gross * 0.17), color: '#b08a4f' },
      { label: '盐与黑曜石', value: Math.round(r.gross * 0.11), color: '#6f8ba8' },
      { label: '贡赋与转输', value: Math.round(r.gross * 0.09), color: '#9c6f9c' },
      { label: '朝圣与仪式', value: Math.round(r.gross * 0.05), color: '#c9a24a' }
    ]
  }))

const out = {
  unit: {
    name: 'D（当量）',
    desc: '一名成年人维持一天基本生活所需的商品与劳务。全大陆通用，不依赖货币。'
  },
  goods: GOODS,
  traits: TRAITS,
  countries: rows.sort((a, b) => b.perCapitaSurplus - a.perCapitaSurplus),
  detail
}

writeFileSync(
  join(dataDir, 'economy.mjs'),
  `// 由 scripts/compute-economy.mjs 自动生成，请勿手改\nexport default ${JSON.stringify(out, null, 2)}\n`,
  'utf8'
)

console.log('countries:', rows.length, 'with traits:', detail.length)
for (const r of rows.slice(0, 3)) console.log(`${r.name}: 产出 ${(r.gross / 1e6).toFixed(1)}M D, 人均剩余 ${r.perCapitaSurplus} D, 评分 ${r.score}`)
