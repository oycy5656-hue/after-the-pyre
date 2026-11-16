// 生产建筑（v4，黑暗时代）
// budget: 每级年产值（D）；input: 需要的原料类别；metal: 需要的金属条件

export const BUILDING_GROUPS = {
  农林渔牧: '#8fae6a',
  采矿采石: '#8a7f8f',
  加工制造: '#b08a4f',
  流通服务: '#5c8fa8',
  种族专属: '#c08a2e'
}

export const CATEGORY = {
  grain: ['wheat', 'barley', 'rye', 'oats', 'millet', 'rice', 'tuber', 'turnip', 'beans'],
  cashcrop: ['olive', 'grape', 'fig', 'flax', 'hemp', 'madder', 'woad', 'saffron', 'pepper', 'spice', 'date'],
  livestock: ['cattle', 'sheep', 'goat', 'pig', 'horse', 'hide', 'sinew', 'antler'],
  fish: ['seafish', 'riverfish', 'shellfish', 'seaweed', 'salmon', 'whale', 'shell'],
  wood: ['timber', 'hardwood', 'birch', 'bamboo', 'resin', 'bark', 'herb', 'lacquer'],
  stone: ['stone', 'clay', 'sand', 'salt', 'flint', 'ochre', 'peat'],
  ore: ['copper', 'tin', 'iron', 'gold', 'silver', 'sulphur', 'jade', 'obsidian', 'amber'],
  fiber: ['flax', 'hemp', 'wool', 'nettle', 'hide', 'sinew'],
  metal: ['iron', 'copper', 'tin'],
  service: []
}

export const BUILDINGS = [
  // —— 农林渔牧 ——
  { id: 'farm', name: '农田', group: '农林渔牧', budget: 900000, slots: 1, labor: 900, outputs: ['wheat','barley','rye','oats','millet','rice','tuber','turnip','beans'], output: { category: 'grain' }, note: '主粮生产，决定全境口粮' },
  { id: 'pasture', name: '牧场', group: '农林渔牧', budget: 640000, slots: 1, labor: 700, outputs: ['cattle','sheep','goat','pig','wool','hide'], output: { category: 'livestock' }, note: '牲畜、皮毛与兽筋' },
  { id: 'fishery', name: '渔场', group: '农林渔牧', budget: 610000, slots: 1, labor: 620, outputs: ['seafish','riverfish','shellfish','salmon','seaweed'], output: { category: 'fish' }, note: '河海与芦苇荡的蛋白来源' },
  { id: 'orchard', name: '果园与蜂场', group: '农林渔牧', budget: 580000, slots: 1, labor: 660, outputs: ['olive','grape','fig','honey','date','saffron'], output: { category: 'cashcrop' }, note: '果木、蜂蜜与蜂蜡' },

  // —— 采矿采石 ——
  { id: 'logging', name: '伐木场', group: '采矿采石', budget: 620000, slots: 1, labor: 760, outputs: ['timber','birch','hardwood','bamboo','bark'], output: { category: 'wood' }, note: '木材、树皮与树脂' },
  { id: 'quarry', name: '采石场', group: '采矿采石', budget: 640000, slots: 1, labor: 820, outputs: ['stone','clay','flint','sand'], output: { category: 'stone' }, note: '石料、黏土与燧石' },
  { id: 'saltern', name: '盐场', group: '采矿采石', budget: 560000, slots: 1, labor: 480, outputs: ['salt','natron'], output: { category: 'stone' }, note: '沿海晒盐与泡碱' },
  { id: 'mine', name: '矿坑', group: '采矿采石', budget: 820000, slots: 1, labor: 1100, outputs: ['iron','copper','tin','gold','silver'], output: { category: 'ore' }, note: '铜、锡、铁与宝石', metal: 'any' },

  // —— 加工制造 ——
  { id: 'mill', name: '磨坊', group: '加工制造', budget: 700000, slots: 1, labor: 620, input: { category: 'grain', qty: 120 }, inputs: ['wheat','barley','rye','oats','millet','rice'], inputShare: 0.55, outputs: ["flour","bread"], output: { category: 'food' }, note: '谷物 → 面粉与面包' },
  { id: 'kiln', name: '陶窑', group: '加工制造', budget: 660000, slots: 1, labor: 600, input: { category: 'stone', qty: 100 }, inputs: ['clay','stone'], inputShare: 0.5, outputs: ["pottery","brick","amphora"], output: { category: 'ceramic' }, note: '黏土 → 陶器与砖坯' },
  { id: 'weaver', name: '织造坊', group: '加工制造', budget: 820000, slots: 1, labor: 880, input: { category: 'fiber', qty: 110 }, inputs: ['flax','wool','hemp','nettle'], inputShare: 0.55, outputs: ["cloth","linen","woolen","felt"], output: { category: 'textile' }, note: '亚麻与羊毛 → 布匹、毛毡' },
  { id: 'tannery', name: '鞣皮坊', group: '加工制造', budget: 640000, slots: 1, labor: 520, input: { category: 'livestock', qty: 90 }, inputs: ['hide','sinew','antler'], inputShare: 0.55, outputs: ["leather","rope","hornware"], output: { category: 'wares' }, note: '生皮与兽筋 → 皮革、绳索' },
  { id: 'stoneworks', name: '石器作坊', group: '加工制造', budget: 560000, slots: 1, labor: 460, input: { category: 'stone', qty: 80 }, inputs: ['flint','stone','bone'], inputShare: 0.5, outputs: ["stone_tool","bone_tool","millstone","fishhook"], output: { category: 'stone' }, note: '燧石与骨料 → 石器、骨器' },
  { id: 'brewery', name: '酿造坊', group: '加工制造', budget: 700000, slots: 1, labor: 560, input: { category: 'grain', qty: 110 }, inputs: ['barley','wheat','grape','honey'], inputShare: 0.5, outputs: ["beer","wine","mead"], output: { category: 'drink' }, note: '谷物与果木 → 啤酒、果酒' },
  { id: 'smelter', name: '冶炼坊', group: '加工制造', budget: 900000, slots: 1, labor: 980, input: { category: 'ore', qty: 120 }, inputs: ['copper','tin','iron'], inputShare: 0.55, outputs: ["bronze"], output: { category: 'metal' }, note: '矿石 → 金属锭', metal: 'bronze' },
  { id: 'ironworks', name: '炼铁炉', group: '加工制造', budget: 940000, slots: 1, labor: 960, inputs: ['copper', 'tin'], input: { category: 'ore', qty: 120 }, inputShare: 0.55, outputs: ['iron'], output: { category: 'ore' }, note: '铁矿石 → 铁锭', metal: 'iron' },
  { id: 'iron_forge', name: '铁匠炉', group: '加工制造', budget: 960000, slots: 1, labor: 880, inputs: ['iron'], input: { category: 'metal', qty: 100 }, inputShare: 0.62, outputs: ['iron_tool', 'weapon'], output: { category: 'iron' }, note: '铁锭 → 铁器与兵器', metal: 'iron' },
  { id: 'forge', name: '锻造坊', group: '加工制造', budget: 880000, slots: 1, labor: 900, input: { category: 'metal', qty: 100 }, inputs: ['bronze'], inputShare: 0.6, outputs: ["bronze_tool","bronze_ware","weapon"], output: { category: 'bronze' }, note: '金属 → 青铜器与兵器', metal: 'bronze' },

  // —— 流通服务 ——
  { id: 'harbor', name: '商栈', group: '流通服务', budget: 700000, slots: 1, labor: 520, input: { category: 'wares', qty: 80 }, inputs: ['leather','rope','cloth'], inputShare: 0.25, output: { category: 'service' }, note: '转运与仓储，放大交换半径' },
  { id: 'temple', name: '神庙与场院', group: '流通服务', budget: 520000, slots: 1, labor: 380, output: { category: 'service' }, note: '祭祀、历法与仓储' },
  { id: 'barracks', name: '军营', group: '流通服务', budget: 680000, slots: 1, labor: 700, input: { category: 'wares', qty: 70 }, inputs: ['leather','weapon','bronze_tool'], inputShare: 0.4, output: { category: 'service' }, note: '皮革与兵器 → 常备军' },

  // —— 种族专属 ——
  { id: 'elf_grove', name: '林间工坊', group: '种族专属', race: '精灵', budget: 760000, slots: 1, labor: 640, outputs: ['timber','herb','hardwood'], output: { category: 'wood' }, note: '与林共生，木与药材产出更高' },
  { id: 'elf_moonwell', name: '月泉圣所', group: '种族专属', race: '精灵', budget: 560000, slots: 1, labor: 360, output: { category: 'service' }, note: '安抚林地精魂' },
  { id: 'fairy_dew', name: '露水园', group: '种族专属', race: '小精灵', budget: 640000, slots: 1, labor: 420, outputs: ['herb','honey'], output: { category: 'cashcrop' }, note: '露水与花蜜培植药草' },
  { id: 'fairy_post', name: '飞行驿站', group: '种族专属', race: '小精灵', budget: 600000, slots: 1, labor: 300, output: { category: 'service' }, note: '翼骑速递，凭空多出一段交换半径' },
  { id: 'divine_oracle', name: '神谕殿', group: '种族专属', race: '神明灵', budget: 720000, slots: 1, labor: 520, output: { category: 'service' }, note: '以神谕裁决争端' },
  { id: 'beast_pen', name: '兽栏', group: '种族专属', race: '怪兽', budget: 800000, slots: 1, labor: 780, outputs: ['hide','bone','antler'], output: { category: 'livestock' }, note: '驯养巨兽，皮革与骨料翻倍' },
  { id: 'bird_loom', name: '羽织坊', group: '种族专属', race: '凤仙', budget: 900000, slots: 1, labor: 600, input: { category: 'fiber', qty: 90 }, inputShare: 0.5, outputs: ["linen","woolen","feather"], output: { category: 'textile' }, note: '羽与丝织成礼器' },
  { id: 'deep_trawler', name: '深水拖网', group: '种族专属', race: '亚基', budget: 820000, slots: 1, labor: 700, outputs: ['seafish','shellfish','whale'], output: { category: 'fish' }, note: '深海作业，渔获远胜沿岸' },
  { id: 'lizar_forge', name: '熔铁炉', group: '种族专属', race: '利扎', budget: 1100000, slots: 1, labor: 1050, input: { category: 'ore', qty: 110 }, inputShare: 0.5, outputs: ["bronze"], output: { category: 'metal' }, note: '自身热量熔炼，效率极高', metal: 'bronze' },
  { id: 'human_manor', name: '大农庄', group: '种族专属', race: '人类', budget: 1050000, slots: 1, labor: 1000, outputs: ['wheat','barley','rye'], output: { category: 'grain' }, note: '大规模轮作，单级口粮产出最高' }
]

export const RACES = [...new Set(BUILDINGS.filter((b) => b.race).map((b) => b.race))]

/** 建造一级需要的建材与储备 */
export const BUILD_COST = { timber: 40, stone: 30, reserve: 60000 }

export function buildingsForRace(race) {
  return BUILDINGS.filter((b) => b.race === race)
}

/**
 * 地块容量：国土面积为主，人口为辅
 */
export function slotCapacity(geo, area, population = 0) {
  if (!geo) return 12
  const byArea = Math.round(Math.sqrt(Math.max(1, area || 100)) * 4.2)
  const terrain = geo.h > 70 ? 4 : geo.h > 50 ? 8 : 14
  const byPop = Math.min(34, Math.round(Math.sqrt(Math.max(0, population)) / 18))
  const water = (geo.river > 40 ? 3 : 0) + (geo.coast > 40 ? 3 : 0)
  return Math.max(14, Math.min(220, byArea + terrain + byPop + water))
}

export function slotsUsed(list) {
  // 建筑一旦建成就占地，哪怕停工也占着（每级 1/8 格，最少 1 格）
  return list.reduce((n, b) => n + Math.max(1, Math.ceil(Math.max(1, b.level) / 8)), 0)
}

/** 金属条件：'any' 任意矿；'bronze' 需铜/锡/铁；'iron' 需铁 */
export function metalAllowed(need, access) {
  if (!need) return true
  if (access === 'none') return false
  if (need === 'any') return true
  if (need === 'bronze') return access === 'bronze' || access === 'copper' || access === 'iron'
  if (need === 'iron') return access === 'iron'
  return true
}

export function deriveBuildings(specs, population, race, metalAccess = 'none') {
  const ids = new Set(specs.map((s) => s.id))
  const pop = Math.max(500, population || 1000)
  const totalLevels = Math.max(6, Math.round(pop / 650))

  const pool = BUILDINGS.filter((b) => !b.race || b.race === race).filter((b) => metalAllowed(b.metal, metalAccess))

  const weights = pool.map((b) => {
    let w = 0
    if (b.output.category === 'service') {
      w = b.id === 'temple' ? 1.4 : 1.0
    } else if (b.output.category === 'ore') {
      w = 2.4
    } else if (['textile', 'drink', 'ceramic'].includes(b.output.category)) {
      w = 2.0
    } else if (b.output.category === 'metal' || b.output.category === 'bronze') {
      w = 1.6
    } else {
      const cands = CATEGORY[b.output.category] || []
      w = cands.filter((r) => ids.has(r)).length * 1.5
      if (b.input) {
        const inCands = CATEGORY[b.input.category] || []
        w = 1.0 + w * 0.5 + inCands.filter((r) => ids.has(r)).length * 0.4
      }
    }
    return { b, w }
  })

  const sum = weights.reduce((n, x) => n + x.w, 0) || 1
  return weights.map(({ b, w }) => ({ ...b, level: w <= 0 ? 0 : Math.max(1, Math.round((w / sum) * totalLevels)) }))
}
