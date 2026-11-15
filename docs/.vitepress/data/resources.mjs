// 物产与产业：基础资源目录 + 地理推导规则 + 经济环节
// 单位价值沿用经济页的「当量 D」

export const RESOURCE_GROUPS = {
  农业: '#8fae6a',
  畜牧: '#b08a4f',
  渔猎: '#5c8fa8',
  林业: '#4f8a5b',
  矿产: '#8a7f8f',
  特产: '#c08a2e'
}

// biome 权重：命中即按占比计分
export const RESOURCES = [
  // 农业
  { id: 'maize', name: '玉米', group: '农业', unit: '石', value: 3.2, biomes: { 热带季雨林: 1, 热带草原: 1, 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.8 }, h: [10, 70] },
  { id: 'wheat', name: '小麦', group: '农业', unit: '石', value: 3.6, biomes: { 温带落叶阔叶林: 1, 草原: 1, 亚热带常绿阔叶林带: 0.6 }, h: [20, 75] },
  { id: 'rice', name: '稻米', group: '农业', unit: '石', value: 4.0, biomes: { 湿地: 1.2, 热带季雨林: 0.7, 热带雨林: 0.6 }, river: 20 },
  { id: 'tuber', name: '薯蓣', group: '农业', unit: '石', value: 2.0, biomes: { 热带雨林: 1, 热带季雨林: 0.6 }, h: [10, 55] },
  { id: 'beans', name: '豆类', group: '农业', unit: '石', value: 2.4, biomes: { 温带落叶阔叶林: 0.8, 亚热带常绿阔叶林带: 0.8, 草原: 0.9 } },
  { id: 'cotton', name: '棉花', group: '农业', unit: '捆', value: 6.0, biomes: { 热带草原: 1, 亚热带常绿阔叶林带: 0.7, 湿地: 0.5 }, h: [10, 50] },
  { id: 'flax', name: '亚麻', group: '农业', unit: '捆', value: 4.5, biomes: { 温带落叶阔叶林: 0.8, 亚寒带针叶林: 0.8 }, h: [20, 65] },
  { id: 'sugarcane', name: '甘蔗', group: '农业', unit: '捆', value: 3.4, biomes: { 热带雨林: 1, 热带季雨林: 0.9 }, river: 20 },

  // 畜牧
  { id: 'cattle', name: '牛', group: '畜牧', unit: '头', value: 12, biomes: { 草原: 1, 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.7 }, h: [15, 70] },
  { id: 'sheep', name: '羊', group: '畜牧', unit: '头', value: 8, biomes: { 草原: 1, 寒漠: 0.8, 苔原: 0.7, 亚寒带针叶林: 0.5 }, h: [20, 95] },
  { id: 'horse', name: '马', group: '畜牧', unit: '匹', value: 25, biomes: { 草原: 1, 温带落叶阔叶林: 0.6 }, h: [15, 65] },
  { id: 'wool', name: '羊毛', group: '畜牧', unit: '捆', value: 5, biomes: { 草原: 1, 苔原: 0.9, 寒漠: 0.7 } },

  // 渔猎
  { id: 'seafish', name: '海鱼', group: '渔猎', unit: '担', value: 3.0, coast: 35 },
  { id: 'riverfish', name: '淡水鱼', group: '渔猎', unit: '担', value: 2.6, river: 35 },
  { id: 'pearl', name: '珍珠', group: '渔猎', unit: '颗', value: 18, coast: 45, biomes: { 热带季雨林: 0.8, 热带雨林: 0.8, 亚热带常绿阔叶林带: 0.6 } },
  { id: 'whaleoil', name: '鲸脂', group: '渔猎', unit: '桶', value: 14, coast: 55, h: [-20, 25] },

  // 林业
  { id: 'timber', name: '木材', group: '林业', unit: '方', value: 2.8, biomes: { 温带落叶阔叶林: 1, 亚寒带针叶林: 1, 亚热带常绿阔叶林带: 0.9, 热带季雨林: 0.8 } },
  { id: 'hardwood', name: '硬木', group: '林业', unit: '方', value: 6.5, biomes: { 热带雨林: 1.1, 热带季雨林: 0.8 } },
  { id: 'resin', name: '树脂', group: '林业', unit: '桶', value: 4.2, biomes: { 亚寒带针叶林: 1, 温带落叶阔叶林: 0.5 } },
  { id: 'herb', name: '药材', group: '林业', unit: '担', value: 7.0, biomes: { 热带雨林: 1, 亚热带常绿阔叶林带: 0.8, 湿地: 0.7 } },

  // 矿产
  { id: 'iron', name: '铁', group: '矿产', unit: '石', value: 9, h: [35, 100] },
  { id: 'copper', name: '铜', group: '矿产', unit: '石', value: 7.5, h: [30, 95] },
  { id: 'tin', name: '锡', group: '矿产', unit: '石', value: 11, h: [45, 100] },
  { id: 'gold', name: '金', group: '矿产', unit: '两', value: 40, h: [40, 100] },
  { id: 'silver', name: '银', group: '矿产', unit: '两', value: 22, h: [35, 100] },
  { id: 'salt', name: '盐', group: '矿产', unit: '斗', value: 5, coast: 20 },
  { id: 'sulphur', name: '硫磺', group: '矿产', unit: '担', value: 8.5, h: [50, 100], biomes: { 寒漠: 0.8, 热带沙漠: 1, 亚热带常绿阔叶林带: 0.4 } },
  { id: 'jade', name: '玉石', group: '矿产', unit: '件', value: 60, h: [40, 100], biomes: { 亚热带常绿阔叶林带: 0.7, 温带落叶阔叶林: 0.6 } },
  { id: 'obsidian', name: '黑曜石', group: '矿产', unit: '块', value: 4, h: [50, 100] },

  // 特产
  { id: 'spice', name: '香料', group: '特产', unit: '担', value: 16, biomes: { 热带雨林: 1, 热带季雨林: 0.9 } },
  { id: 'dye', name: '染料', group: '特产', unit: '桶', value: 9, biomes: { 热带季雨林: 0.9, 亚热带常绿阔叶林带: 0.6, 湿地: 0.6 } },
  { id: 'silk', name: '蚕丝', group: '特产', unit: '匹', value: 14, biomes: { 温带落叶阔叶林: 0.9, 亚热带常绿阔叶林带: 0.9 }, river: 25 },
  { id: 'honey', name: '蜂蜜', group: '特产', unit: '罐', value: 6, biomes: { 温带落叶阔叶林: 0.8, 草原: 0.7, 亚热带常绿阔叶林带: 0.8 } },
  { id: 'feather', name: '羽毛', group: '特产', unit: '束', value: 22, biomes: { 热带雨林: 1, 热带季雨林: 0.7 } }
]

// 经济环节：每个环节吃掉上游产物、增加价值、占用劳力
export const SECTORS = [
  { id: 'extract', name: '采集与种植', share: 0.44, multiplier: 1.0, note: '谷物、矿石、渔获、林木的原始产出' },
  { id: 'process', name: '初加工', share: 0.18, multiplier: 1.35, note: '磨粉、腌渍、鞣革、冶炼、榨油' },
  { id: 'craft', name: '手工业', share: 0.15, multiplier: 2.1, note: '织造、陶器、兵器、造船、玉石琢磨' },
  { id: 'trade', name: '流通', share: 0.13, multiplier: 1.6, note: '市集、商队、码头、仓储' },
  { id: 'service', name: '神庙与行政', share: 0.1, multiplier: 1.25, note: '祭祀、历法、征税、文书' }
]

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

/** 按地理条件给单个资源打分 */
export function scoreResource(res, geo) {
  let score = 0
  if (res.biomes && geo.biomes) {
    for (const [name, pct] of geo.biomes) {
      const w = res.biomes[name]
      if (w) score += (pct / 100) * w * 10
    }
  }
  if (res.h) {
    const [lo, hi] = res.h
    if (geo.h >= lo && geo.h <= hi) score += 2.2
    else if (geo.h > hi) score += clamp(2.2 - (geo.h - hi) * 0.12, 0, 2.2)
    else score += clamp(2.2 - (lo - geo.h) * 0.12, 0, 2.2)
  }
  if (res.coast && geo.coast >= res.coast) score += 2.5 * (geo.coast / 100)
  if (res.river && geo.river >= res.river) score += 2.0 * (geo.river / 100)
  return score
}

/** 推导一国物产（默认取前 5，保证至少 3 种） */
export function deriveSpecialties(geo, count = 5) {
  if (!geo) return []
  const scored = RESOURCES.map((r) => ({ r, score: Math.round(scoreResource(r, geo) * 100) / 100 }))
    .filter((x) => x.score > 0.9)
    .sort((a, b) => b.score - a.score)
  const picked = scored.slice(0, count).map((x) => ({ ...x.r, score: x.score }))
  if (picked.length >= 3) return picked

  // 兜底：按海拔与海岸补足三种基础物产
  const fallback = RESOURCES.filter((r) => ['timber', 'beans', 'seabird'].includes(r.id) || r.id === 'timber')
  const extra = RESOURCES.filter((r) => !picked.some((p) => p.id === r.id)).slice(0, 3 - picked.length)
  return [...picked, ...extra.map((r) => ({ ...r, score: 0.5 }))]
}

/** 一国的产业结构（环节占比），按物产构成微调 */
export function deriveSectors(specs) {
  const groups = { 农业: 0, 畜牧: 0, 渔猎: 0, 林业: 0, 矿产: 0, 特产: 0 }
  for (const s of specs) groups[s.group] = (groups[s.group] || 0) + 1
  const total = Math.max(1, specs.length)

  const extract = 0.32 + (groups.农业 + groups.畜牧 + groups.渔猎) / total * 0.22
  const process = 0.14 + (groups.矿产 + groups.农业) / total * 0.08
  const craft = 0.12 + (groups.特产 + groups.林业) / total * 0.1
  const trade = 0.1 + (groups.矿产 + groups.特产) / total * 0.08
  const service = 1 - extract - process - craft - trade

  return SECTORS.map((s) => {
    const share =
      s.id === 'extract' ? extract : s.id === 'process' ? process : s.id === 'craft' ? craft : s.id === 'trade' ? trade : service
    return { ...s, share: Math.round(share * 1000) / 1000 }
  })
}
