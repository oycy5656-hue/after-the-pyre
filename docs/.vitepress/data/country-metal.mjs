// 金属科技判定：只有点了「铁矿」天赋才有铁，兵种带青铜器才有青铜
import { TRAITS_BY_COUNTRY } from './traits.mjs'
import countries from './countries.mjs'

const hasBronzeUnit = (c) => {
  const blob = JSON.stringify(c.military || {})
  return blob.includes('青铜')
}

/** 返回 'iron' | 'bronze' | 'stone' */
export function metalTechOf(name) {
  const card = TRAITS_BY_COUNTRY[name]
  const traits = card ? card.traits.map((t) => t.name) : []
  if (traits.includes('铁矿')) return 'iron'
  const c = countries.find((x) => x.name === name)
  if (c && hasBronzeUnit(c)) return 'bronze'
  return 'stone'
}

/** 科技允许的矿石 */
export function allowedOres(tech) {
  if (tech === 'iron') return ['iron', 'copper', 'tin']
  if (tech === 'bronze') return ['copper', 'tin']
  return []
}

export const TECH_LABEL = {
  iron: '铁器',
  bronze: '青铜',
  stone: '石器'
}
