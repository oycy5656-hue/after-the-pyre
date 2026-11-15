// 生产建筑（v2）：通用 + 种族专属
// output/input 用「类别」，由模拟器按该国实际物产解析成具体资源
// 类别 → 资源候选见 CATEGORY

export const BUILDING_GROUPS = {
  农林渔牧: '#8fae6a',
  采矿采石: '#8a7f8f',
  加工制造: '#b08a4f',
  流通服务: '#5c8fa8',
  种族专属: '#c08a2e'
}

export const CATEGORY = {
  grain: ['rice', 'maize', 'wheat', 'tuber', 'beans'],
  cashcrop: ['cotton', 'flax', 'sugarcane', 'spice', 'dye', 'silk', 'oilseed', 'wax'],
  livestock: ['cattle', 'sheep', 'horse', 'wool', 'bone'],
  fish: ['seafish', 'riverfish', 'pearl', 'whaleoil', 'coral', 'whalebone'],
  wood: ['timber', 'hardwood', 'resin', 'herb', 'bamboo', 'rattan', 'lacquer'],
  stone: ['stone', 'clay', 'salt'],
  ore: ['iron', 'copper', 'tin', 'gold', 'silver', 'mercury', 'coal', 'sulphur', 'jade', 'obsidian', 'gem'],
  fiber: ['cotton', 'flax', 'wool', 'silk', 'feather', 'rattan'],
  metal: ['iron', 'copper', 'tin', 'silver', 'gold'],
  textile: ['cotton', 'flax', 'silk', 'wool'],
  ceramic: ['clay', 'stone'],
  wares: ['iron', 'copper', 'coal'],
  luxury: ['jade', 'gold', 'silver', 'gem', 'pearl'],
  drink: ['maize', 'rice', 'sugarcane', 'honey'],
  medicine: ['herb', 'honey', 'wax'],
  service: []
}

export const BUILDINGS = [
  // —— 农林渔牧 ——
  { id: 'farm', name: '谷物农场', group: '农林渔牧', budget: 620000, slots: 1, labor: 900, output: { category: 'grain' }, note: '主粮生产，决定全境口粮' },
  { id: 'plantation', name: '经济作物园', group: '农林渔牧', budget: 700000, slots: 1, labor: 950, output: { category: 'cashcrop' }, note: '纺织、香料与染料的原料' },
  { id: 'pasture', name: '牧场', group: '农林渔牧', budget: 640000, slots: 1, labor: 700, output: { category: 'livestock' }, note: '牲畜、羊毛与皮革' },
  { id: 'fishery', name: '渔场', group: '农林渔牧', budget: 610000, slots: 1, labor: 620, output: { category: 'fish' }, note: '沿海与河网的蛋白来源' },
  { id: 'orchard', name: '果园与蜂场', group: '农林渔牧', budget: 580000, slots: 1, labor: 660, output: { category: 'cashcrop' }, note: '果酒、蜂蜜与蜂蜡' },

  // —— 采矿采石 ——
  { id: 'logging', name: '伐木场', group: '采矿采石', budget: 620000, slots: 1, labor: 760, output: { category: 'wood' }, note: '木材、药材与生漆' },
  { id: 'quarry', name: '采石场', group: '采矿采石', budget: 640000, slots: 1, labor: 820, output: { category: 'stone' }, note: '石料、黏土与盐' },
  { id: 'mine', name: '矿井', group: '采矿采石', budget: 820000, slots: 1, labor: 1100, output: { category: 'ore' }, note: '金属、煤与宝石' },

  // —— 加工制造 ——
  { id: 'smelter', name: '冶炼坊', group: '加工制造', budget: 900000, slots: 1, labor: 980, input: { category: 'ore', qty: 160 }, output: { category: 'metal' }, note: '矿石 → 金属锭' },
  { id: 'weaver', name: '织造坊', group: '加工制造', budget: 880000, slots: 1, labor: 880, input: { category: 'fiber', qty: 220 }, output: { category: 'textile' }, note: '纤维 → 布匹' },
  { id: 'kiln', name: '窑场', group: '加工制造', budget: 700000, slots: 1, labor: 620, input: { category: 'stone', qty: 260 }, output: { category: 'ceramic' }, note: '黏土 → 砖石与陶器' },
  { id: 'workshop', name: '作坊', group: '加工制造', budget: 950000, slots: 1, labor: 900, input: { category: 'metal', qty: 60 }, output: { category: 'wares' }, note: '金属 + 皮革 → 工具与兵器' },
  { id: 'jeweler', name: '玉石工坊', group: '加工制造', budget: 900000, slots: 1, labor: 700, input: { category: 'ore', qty: 70 }, output: { category: 'luxury' }, note: '玉石与金 → 首饰' },
  { id: 'winery', name: '酒坊', group: '加工制造', budget: 660000, slots: 1, labor: 520, input: { category: 'grain', qty: 200 }, output: { category: 'drink' }, note: '谷物与甘蔗 → 果酒' },
  { id: 'apothecary', name: '药坊', group: '加工制造', budget: 620000, slots: 1, labor: 480, input: { category: 'wood', qty: 120 }, output: { category: 'medicine' }, note: '药材与蜂蜡 → 药与香膏' },

  // —— 流通服务 ——
  { id: 'harbor', name: '商栈与码头', group: '流通服务', budget: 700000, slots: 1, labor: 520, output: { category: 'service' }, note: '转运与仓储，放大交换半径' },
  { id: 'temple', name: '神庙与场院', group: '流通服务', budget: 520000, slots: 1, labor: 380, output: { category: 'service' }, note: '祭祀、历法与仓储，稳人心' },
  { id: 'barracks', name: '军营', group: '流通服务', budget: 680000, slots: 1, labor: 700, input: { category: 'wares', qty: 50 }, output: { category: 'service' }, note: '兵器 → 常备军' },

  // —— 种族专属 ——
  { id: 'elf_grove', name: '林间工坊', group: '种族专属', budget: 760000, race: '精灵', slots: 1, labor: 640, output: { category: 'wood' }, note: '与林共生，木材与药材产出高于常人' },
  { id: 'elf_moonwell', name: '月泉圣所', group: '种族专属', budget: 560000, race: '精灵', slots: 1, labor: 360, output: { category: 'service' }, note: '安抚林地精魂，稳定与医疗兼顾' },
  { id: 'fairy_dew', name: '露水园', group: '种族专属', budget: 640000, race: '小精灵', slots: 1, labor: 420, output: { category: 'medicine' }, note: '以露水与花蜜培植药材，占地极小' },
  { id: 'fairy_post', name: '飞行驿站', group: '种族专属', budget: 600000, race: '小精灵', slots: 1, labor: 300, output: { category: 'service' }, note: '翼骑速递，等于凭空多出一段交换半径' },
  { id: 'divine_oracle', name: '神谕殿', group: '种族专属', budget: 720000, race: '神明灵', slots: 1, labor: 520, output: { category: 'service' }, note: '以神谕裁决争端，抽取与稳定同时提升' },
  { id: 'beast_pen', name: '兽栏', group: '种族专属', budget: 800000, race: '怪兽', slots: 1, labor: 780, output: { category: 'livestock' }, note: '驯养巨兽，皮革与骨料产量翻倍' },
  { id: 'bird_loom', name: '羽织坊', group: '种族专属', budget: 900000, race: '凤仙', slots: 1, labor: 600, input: { category: 'fiber', qty: 120 }, output: { category: 'luxury' }, note: '羽与丝织成礼器之物，价比黄金' },
  { id: 'deep_trawler', name: '深水拖网', group: '种族专属', budget: 820000, race: '亚基', slots: 1, labor: 700, output: { category: 'fish' }, note: '深海作业，渔获与珍珠远胜沿岸' },
  { id: 'lizar_forge', name: '熔铁炉', group: '种族专属', budget: 1100000, race: '利扎', slots: 1, labor: 1050, input: { category: 'ore', qty: 220 }, output: { category: 'metal' }, note: '自身热量熔炼，无需木炭，效率极高' },
  { id: 'human_manor', name: '大农庄', group: '种族专属', budget: 780000, race: '人类', slots: 1, labor: 1000, output: { category: 'grain' }, note: '大规模轮作，单级口粮产出最高' }
]

export const RACES = [...new Set(BUILDINGS.filter((b) => b.race).map((b) => b.race))]

/** 建造一级需要的建材与储备 */
export const BUILD_COST = { timber: 40, stone: 30, reserve: 60000 }

export function buildingsForRace(race) {
  return BUILDINGS.filter((b) => b.race === race)
}

/** 按物产与人口推导初始等级 */
export function deriveBuildings(specs, population, race) {
  const ids = new Set(specs.map((s) => s.id))
  const pop = Math.max(500, population || 1000)
  const totalLevels = Math.max(8, Math.round(pop / 650))

  const pool = BUILDINGS.filter((b) => !b.race || b.race === race)

  const weights = pool.map((b) => {
    let w = 0
    if (b.output.category === 'service') {
      w = b.id === 'temple' ? 1.2 : 0.8
    } else {
      const cands = CATEGORY[b.output.category] || []
      w = cands.filter((r) => ids.has(r)).length * 1.5
      if (b.input) {
        const inCands = CATEGORY[b.input.category] || []
        // 加工建筑可以靠进口开工，所以保底权重
        w = 1.3 + w * 0.6 + inCands.filter((r) => ids.has(r)).length * 0.5
      }
    }
    return { b, w }
  })

  const sum = weights.reduce((n, x) => n + x.w, 0) || 1
  return weights.map(({ b, w }) => ({ ...b, level: w <= 0 ? 0 : Math.max(1, Math.round((w / sum) * totalLevels)) }))
}

/** 地块容量 */
export function slotCapacity(geo, area) {
  if (!geo) return 12
  const byArea = Math.round(Math.sqrt(Math.max(1, area || 100)) * 1.9)
  const terrain = geo.h > 70 ? 8 : geo.h > 50 ? 12 : 16
  return Math.max(10, Math.min(64, byArea + terrain + (geo.river > 40 ? 4 : 0) + (geo.coast > 40 ? 4 : 0)))
}

export function slotsUsed(list) {
  // 每 8 级再占一格：产业越大，用地越多
  return list.reduce((n, b) => n + (b.level > 0 ? Math.max(b.slots || 1, Math.ceil(b.level / 8)) : 0), 0)
}
