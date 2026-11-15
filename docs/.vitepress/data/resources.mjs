// 物产目录（v2）：原料 + 加工品
// kind: raw 原料 / processed 加工品
// recipe: 加工品每单位需要的原料

export const RESOURCE_GROUPS = {
  农业: '#8fae6a',
  畜牧: '#b08a4f',
  渔猎: '#5c8fa8',
  林业: '#4f8a5b',
  矿产: '#8a7f8f',
  特产: '#c08a2e',
  加工品: '#9c6f9c'
}

export const RESOURCES = [
  // —— 农业（原料）——
  { id: 'maize', name: '玉米', group: '农业', kind: 'raw', unit: '石', value: 32, biomes: { 热带季雨林: 1, 热带草原: 1, 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.8 }, h: [10, 70] },
  { id: 'wheat', name: '小麦', group: '农业', kind: 'raw', unit: '石', value: 36, biomes: { 温带落叶阔叶林: 1, 草原: 1, 亚热带常绿阔叶林带: 0.6 }, h: [20, 75] },
  { id: 'rice', name: '稻米', group: '农业', kind: 'raw', unit: '石', value: 40, biomes: { 湿地: 1.2, 热带季雨林: 0.7, 热带雨林: 0.6 }, river: 20 },
  { id: 'tuber', name: '薯蓣', group: '农业', kind: 'raw', unit: '石', value: 20, biomes: { 热带雨林: 1, 热带季雨林: 0.6 }, h: [10, 55] },
  { id: 'beans', name: '豆类', group: '农业', kind: 'raw', unit: '石', value: 24, biomes: { 温带落叶阔叶林: 0.8, 亚热带常绿阔叶林带: 0.8, 草原: 0.9 } },
  { id: 'cotton', name: '棉花', group: '农业', kind: 'raw', unit: '捆', value: 60, biomes: { 热带草原: 1, 亚热带常绿阔叶林带: 0.7, 湿地: 0.5 }, h: [10, 50] },
  { id: 'flax', name: '亚麻', group: '农业', kind: 'raw', unit: '捆', value: 45, biomes: { 温带落叶阔叶林: 0.8, 亚寒带针叶林: 0.8 }, h: [20, 65] },
  { id: 'sugarcane', name: '甘蔗', group: '农业', kind: 'raw', unit: '捆', value: 34, biomes: { 热带雨林: 1, 热带季雨林: 0.9 }, river: 20 },
  { id: 'oilseed', name: '油料', group: '农业', kind: 'raw', unit: '石', value: 42, biomes: { 草原: 0.9, 温带落叶阔叶林: 0.7, 热带草原: 0.7 } },
  { id: 'wine', name: '果酒', group: '农业', kind: 'processed', unit: '桶', value: 95, recipe: { 甘蔗: 0.4, 玉米: 0.6 } },

  // —— 畜牧 ——
  { id: 'cattle', name: '牛', group: '畜牧', kind: 'raw', unit: '头', value: 120, biomes: { 草原: 1, 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.7 }, h: [15, 70] },
  { id: 'sheep', name: '羊', group: '畜牧', kind: 'raw', unit: '头', value: 80, biomes: { 草原: 1, 寒漠: 0.8, 苔原: 0.7, 亚寒带针叶林: 0.5 }, h: [20, 95] },
  { id: 'horse', name: '马', group: '畜牧', kind: 'raw', unit: '匹', value: 250, biomes: { 草原: 1, 温带落叶阔叶林: 0.6 }, h: [15, 65] },
  { id: 'wool', name: '羊毛', group: '畜牧', kind: 'raw', unit: '捆', value: 50, biomes: { 草原: 1, 苔原: 0.9, 寒漠: 0.7 } },
  { id: 'leather', name: '皮革', group: '畜牧', kind: 'processed', unit: '张', value: 110, recipe: { 牛: 0.5, 羊: 0.8 } },
  { id: 'bone', name: '骨料', group: '畜牧', kind: 'raw', unit: '担', value: 34, biomes: { 草原: 0.6, 寒漠: 0.8, 苔原: 0.7 } },

  // —— 渔猎 ——
  { id: 'seafish', name: '海鱼', group: '渔猎', kind: 'raw', unit: '担', value: 30, coast: 35 },
  { id: 'riverfish', name: '淡水鱼', group: '渔猎', kind: 'raw', unit: '担', value: 26, river: 35 },
  { id: 'pearl', name: '珍珠', group: '渔猎', kind: 'raw', unit: '颗', value: 180, coast: 45, biomes: { 热带季雨林: 0.8, 热带雨林: 0.8, 亚热带常绿阔叶林带: 0.6 } },
  { id: 'whaleoil', name: '鲸脂', group: '渔猎', kind: 'raw', unit: '桶', value: 140, coast: 55, h: [-20, 25] },
  { id: 'coral', name: '珊瑚', group: '渔猎', kind: 'raw', unit: '担', value: 120, coast: 50, biomes: { 热带雨林: 0.9, 热带季雨林: 0.8 } },
  { id: 'whalebone', name: '鲸骨', group: '渔猎', kind: 'raw', unit: '担', value: 80, coast: 50, h: [-20, 25] },

  // —— 林业 ——
  { id: 'timber', name: '木材', group: '林业', kind: 'raw', unit: '方', value: 28, biomes: { 温带落叶阔叶林: 1, 亚寒带针叶林: 1, 亚热带常绿阔叶林带: 0.9, 热带季雨林: 0.8 } },
  { id: 'hardwood', name: '硬木', group: '林业', kind: 'raw', unit: '方', value: 65, biomes: { 热带雨林: 1.1, 热带季雨林: 0.8 } },
  { id: 'resin', name: '树脂', group: '林业', kind: 'raw', unit: '桶', value: 42, biomes: { 亚寒带针叶林: 1, 温带落叶阔叶林: 0.5 } },
  { id: 'herb', name: '药材', group: '林业', kind: 'raw', unit: '担', value: 70, biomes: { 热带雨林: 1, 亚热带常绿阔叶林带: 0.8, 湿地: 0.7 } },
  { id: 'bamboo', name: '竹材', group: '林业', kind: 'raw', unit: '方', value: 31, biomes: { 亚热带常绿阔叶林带: 0.9, 热带季雨林: 0.8 } },
  { id: 'rattan', name: '藤条', group: '林业', kind: 'raw', unit: '捆', value: 38, biomes: { 热带雨林: 1, 热带季雨林: 0.8 } },
  { id: 'lacquer', name: '生漆', group: '林业', kind: 'raw', unit: '桶', value: 105, biomes: { 亚热带常绿阔叶林带: 0.9, 温带落叶阔叶林: 0.6 } },
  { id: 'charcoal', name: '木炭', group: '林业', kind: 'processed', unit: '担', value: 54, recipe: { 木材: 1.4 } },

  // —— 矿产 ——
  { id: 'stone', name: '石料', group: '矿产', kind: 'raw', unit: '方', value: 26, h: [20, 100] },
  { id: 'clay', name: '黏土', group: '矿产', kind: 'raw', unit: '方', value: 20, river: 20, biomes: { 湿地: 0.8, 草原: 0.6 } },
  { id: 'coal', name: '煤', group: '矿产', kind: 'raw', unit: '担', value: 46, h: [35, 100] },
  { id: 'iron', name: '铁', group: '矿产', kind: 'raw', unit: '石', value: 90, h: [35, 100] },
  { id: 'copper', name: '铜', group: '矿产', kind: 'raw', unit: '石', value: 75, h: [30, 95] },
  { id: 'tin', name: '锡', group: '矿产', kind: 'raw', unit: '石', value: 110, h: [45, 100] },
  { id: 'gold', name: '金', group: '矿产', kind: 'raw', unit: '两', value: 400, h: [40, 100] },
  { id: 'silver', name: '银', group: '矿产', kind: 'raw', unit: '两', value: 220, h: [35, 100] },
  { id: 'mercury', name: '水银', group: '矿产', kind: 'raw', unit: '罐', value: 160, h: [50, 100] },
  { id: 'salt', name: '盐', group: '矿产', kind: 'raw', unit: '斗', value: 50, coast: 20 },
  { id: 'sulphur', name: '硫磺', group: '矿产', kind: 'raw', unit: '担', value: 85, h: [50, 100], biomes: { 寒漠: 0.8, 热带沙漠: 1, 亚热带常绿阔叶林带: 0.4 } },
  { id: 'jade', name: '玉石', group: '矿产', kind: 'raw', unit: '件', value: 600, h: [40, 100], biomes: { 亚热带常绿阔叶林带: 0.7, 温带落叶阔叶林: 0.6 } },
  { id: 'obsidian', name: '黑曜石', group: '矿产', kind: 'raw', unit: '块', value: 40, h: [50, 100] },
  { id: 'gem', name: '宝石', group: '矿产', kind: 'raw', unit: '件', value: 550, h: [55, 100] },

  // —— 特产 ——
  { id: 'spice', name: '香料', group: '特产', kind: 'raw', unit: '担', value: 160, biomes: { 热带雨林: 1, 热带季雨林: 0.9 } },
  { id: 'dye', name: '染料', group: '特产', kind: 'raw', unit: '桶', value: 90, biomes: { 热带季雨林: 0.9, 亚热带常绿阔叶林带: 0.6, 湿地: 0.6 } },
  { id: 'silk', name: '蚕丝', group: '特产', kind: 'raw', unit: '匹', value: 140, biomes: { 温带落叶阔叶林: 0.9, 亚热带常绿阔叶林带: 0.9 }, river: 25 },
  { id: 'honey', name: '蜂蜜', group: '特产', kind: 'raw', unit: '罐', value: 60, biomes: { 温带落叶阔叶林: 0.8, 草原: 0.7, 亚热带常绿阔叶林带: 0.8 } },
  { id: 'wax', name: '蜂蜡', group: '特产', kind: 'raw', unit: '担', value: 74, biomes: { 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.7 } },
  { id: 'feather', name: '羽毛', group: '特产', kind: 'raw', unit: '束', value: 220, biomes: { 热带雨林: 1, 热带季雨林: 0.7 } },

  // —— 加工品 ——
  { id: 'cloth', name: '布匹', group: '加工品', kind: 'processed', unit: '匹', value: 120, recipe: { 棉花: 1.2, 亚麻: 0.6 } },
  { id: 'brick', name: '砖石', group: '加工品', kind: 'processed', unit: '方', value: 68, recipe: { 黏土: 1.4, 木材: 0.3 } },
  { id: 'tools', name: '工具', group: '加工品', kind: 'processed', unit: '件', value: 180, recipe: { 铁: 0.8, 木炭: 0.4 } },
  { id: 'weapons', name: '兵器', group: '加工品', kind: 'processed', unit: '件', value: 340, recipe: { 铁: 1.2, 木炭: 0.6, 皮革: 0.3 } },
  { id: 'pottery', name: '陶器', group: '加工品', kind: 'processed', unit: '件', value: 82, recipe: { 黏土: 1.0 } },
  { id: 'paper', name: '纸', group: '加工品', kind: 'processed', unit: '捆', value: 140, recipe: { 竹材: 0.8, 木材: 0.6 } },
  { id: 'jewelry', name: '首饰', group: '加工品', kind: 'processed', unit: '件', value: 780, recipe: { 玉石: 0.6, 金: 0.3 } },
  { id: 'incense', name: '香膏', group: '加工品', kind: 'processed', unit: '罐', value: 260, recipe: { 香料: 0.7, 蜂蜡: 0.4 } }
]

export const RAW_RESOURCES = RESOURCES.filter((r) => r.kind === 'raw')
export const PROCESSED_RESOURCES = RESOURCES.filter((r) => r.kind === 'processed')

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

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

/** 推导一国原料物产（默认前 6） */
export function deriveSpecialties(geo, count = 6) {
  if (!geo) return []
  const scored = RAW_RESOURCES.map((r) => ({ r, score: Math.round(scoreResource(r, geo) * 100) / 100 }))
    .filter((x) => x.score > 0.9)
    .sort((a, b) => b.score - a.score)
  const picked = scored.slice(0, count).map((x) => ({ ...x.r, score: x.score }))
  if (picked.length >= 3) return picked
  const extra = RAW_RESOURCES.filter((r) => !picked.some((p) => p.id === r.id)).slice(0, 3 - picked.length)
  return [...picked, ...extra.map((r) => ({ ...r, score: 0.5 }))]
}

export const SECTORS = [
  { id: 'extract', name: '采集与种植', note: '原料的原始产出' },
  { id: 'process', name: '初加工', note: '冶炼、酿造、鞣制' },
  { id: 'craft', name: '手工业', note: '织造、陶器、兵器、首饰' },
  { id: 'trade', name: '流通', note: '市集、商队、码头、仓储' },
  { id: 'service', name: '神庙与行政', note: '祭祀、历法、征税' }
]

/** 产业环节占比（按物产构成推导） */
export function deriveSectors(specs) {
  const groups = { 农业: 0, 畜牧: 0, 渔猎: 0, 林业: 0, 矿产: 0, 特产: 0 }
  for (const s of specs) groups[s.group] = (groups[s.group] || 0) + 1
  const total = Math.max(1, specs.length)
  const extract = 0.3 + ((groups.农业 + groups.畜牧 + groups.渔猎) / total) * 0.24
  const process = 0.14 + ((groups.矿产 + groups.农业) / total) * 0.08
  const craft = 0.12 + ((groups.特产 + groups.林业) / total) * 0.1
  const trade = 0.1 + ((groups.矿产 + groups.特产) / total) * 0.08
  const service = Math.max(0.04, 1 - extract - process - craft - trade)
  const defs = [
    { id: 'extract', name: '采集与种植', note: '原料的原始产出' },
    { id: 'process', name: '初加工', note: '冶炼、酿造、鞣制' },
    { id: 'craft', name: '手工业', note: '织造、陶器、兵器、首饰' },
    { id: 'trade', name: '流通', note: '市集、商队、码头、仓储' },
    { id: 'service', name: '神庙与行政', note: '祭祀、历法、征税' }
  ]
  const vals = { extract, process, craft, trade, service }
  return defs.map((d) => ({ ...d, share: Math.round(vals[d.id] * 1000) / 1000 }))
}

/** 加工建筑的产出类别 → 实际加工品 */
export const OUTPUT_CATEGORY = {
  metal: ['tools'],
  textile: ['cloth'],
  ceramic: ['brick', 'pottery'],
  wares: ['tools', 'weapons'],
  luxury: ['jewelry', 'incense'],
  drink: ['wine'],
  medicine: ['incense']
}
