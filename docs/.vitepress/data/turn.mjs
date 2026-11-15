// 回合推进：一回合 = 100 年，可推进、可撤销
// 每次推进：人口按粮食余缺增减、建筑按投资扩建与折旧、贸易与产值重算

import { deriveSpecialties } from './resources.mjs'
import { simulate } from './sim.mjs'
import { geoOf } from './geography.mjs'

export const YEARS_PER_TURN = 100
export const START_YEAR = 1003
const MAX_HISTORY = 12

export function emptyTurnState() {
  return { turn: 0, year: START_YEAR, countries: {}, log: [], history: [] }
}

const parsePop = (raw) => {
  const m = /^([\d.]+)\s*([KM]?)$/i.exec(String(raw || '').trim())
  if (!m) return 0
  const v = Number(m[1]) * (m[2].toUpperCase() === 'K' ? 1e3 : m[2].toUpperCase() === 'M' ? 1e6 : 1)
  return v
}

const fmtPop = (n) => (n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : String(Math.round(n)))

function countryTurn({ country, prev, geo, specs, area, race }) {
  const basePop = prev?.pop || parsePop(country.population)
  const levels = prev?.levels ? { ...prev.levels } : {}

  const before = simulate({ specs, population: basePop, race, geo, area, levels, autoAdjust: true })

  const foodRatio = before.totals.foodSupply / Math.max(1, before.totals.foodNeed)
  const annual = Math.max(-0.006, Math.min(0.007, (foodRatio - 1) * 0.008))
  const pop = Math.max(200, Math.round(basePop * Math.pow(1 + annual, YEARS_PER_TURN)))

  // 折旧：百年间淘汰约 25% 的旧产能
  const decayed = {}
  for (const b of before.buildings) {
    const lv = Math.max(0, Math.round(b.level * 0.75))
    if (lv > 0) decayed[b.id] = lv
  }

  // 扩建：按产值高低分配可扩建等级
  let budget = before.totals.buildable
  const built = {}
  const ranked = [...before.buildings].filter((b) => b.level > 0).sort((a, b) => b.value - a.value)
  let i = 0
  while (budget > 0 && ranked.length) {
    const b = ranked[i % ranked.length]
    decayed[b.id] = (decayed[b.id] || 0) + 1
    built[b.id] = (built[b.id] || 0) + 1
    budget--
    i++
  }

  const after = simulate({ specs, population: pop, race, geo, area, levels: decayed, autoAdjust: true })

  const entries = []
  const delta = pop - basePop
  entries.push('人口 ' + fmtPop(basePop) + ' → ' + fmtPop(pop) + '（' + (delta >= 0 ? '+' : '') + Math.round((delta / Math.max(1, basePop)) * 100) + '%）')
  const builtTotal = Object.values(built).reduce((n, v) => n + v, 0)
  const names = before.buildings.filter((b) => built[b.id]).map((b) => b.name).slice(0, 3)
  if (builtTotal) entries.push('扩建 ' + builtTotal + ' 级' + (names.length ? '（' + names.join('、') + '…）' : ''))
  if (after.totals.downgrades.length) {
    entries.push('缺料关闭 ' + after.totals.downgrades.map((d) => d.name + ' ' + d.times + ' 级').join('、'))
  }
  entries.push('产值 ' + (after.totals.gdp / 1e6).toFixed(1) + 'M，' + (after.totals.balance >= 0 ? '顺差 ' : '逆差 ') + (Math.abs(after.totals.balance) / 1e6).toFixed(1) + 'M')

  return {
    pop,
    levels: Object.fromEntries(after.buildings.filter((b) => b.level > 0).map((b) => [b.id, b.level])),
    gdp: after.totals.gdp,
    balance: after.totals.balance,
    timber: after.totals.timber,
    stone: after.totals.stone,
    entries
  }
}

/** 推进一回合（100 年） */
export function advanceTurn(state, countries) {
  const prevState = state || emptyTurnState()
  const next = {
    turn: (prevState.turn || 0) + 1,
    year: (prevState.year || START_YEAR) + YEARS_PER_TURN,
    countries: {},
    log: [...(prevState.log || [])],
    history: [
      ...(prevState.history || []),
      { turn: prevState.turn || 0, year: prevState.year || START_YEAR, countries: prevState.countries || {}, log: prevState.log || [] }
    ].slice(-MAX_HISTORY)
  }

  const allEntries = []
  for (const c of countries) {
    const geo = geoOf(c.name)
    const specs = deriveSpecialties(geo, 6)
    const prev = prevState.countries?.[c.name]
    const res = countryTurn({ country: c, prev, geo, specs, area: prev?.area || 140, race: c.race })
    next.countries[c.name] = { ...res, area: prev?.area || 140 }
    for (const e of res.entries) allEntries.push(c.name + '：' + e)
  }

  next.log.unshift({
    turn: next.turn,
    year: next.year,
    at: new Date().toLocaleString('zh-CN', { hour12: false }).slice(5),
    entries: allEntries.slice(0, 60)
  })

  return next
}

/** 撤销：回到上一回合 */
export function undoTurn(state) {
  if (!state?.history?.length) return null
  const history = [...state.history]
  const prev = history.pop()
  const log = [...(state.log || [])]
  log.shift()
  return {
    turn: prev.turn,
    year: prev.year,
    countries: prev.countries,
    log: prev.log?.length ? prev.log : log,
    history
  }
}

/** 全境汇总 */
export function worldSummary(state, countries) {
  if (!state || !state.countries) return null
  let pop = 0
  let gdp = 0
  let balance = 0
  for (const c of countries) {
    const s = state.countries[c.name]
    if (!s) continue
    pop += s.pop || 0
    gdp += s.gdp || 0
    balance += s.balance || 0
  }
  return { pop, gdp, balance, turn: state.turn, year: state.year, canUndo: (state.history || []).length > 0 }
}
