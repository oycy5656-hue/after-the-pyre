// 生产建筑（Vic3 式）：每级消耗劳力、产出物产
// output 为满级单级年产值（D），labor 为单级用工，input 为需要消耗的上游物产占比

export const BUILDING_GROUPS = {
  农林渔牧: '#8fae6a',
  采矿伐木: '#8a7f8f',
  加工制造: '#b08a4f',
  流通服务: '#5c8fa8'
}

export const BUILDINGS = [
  {
    id: 'farm',
    name: '谷物农场',
    group: '农林渔牧',
    resources: ['maize', 'wheat', 'rice', 'beans', 'tuber'],
    labor: 900,
    output: 2894400,
    note: '主粮生产，决定全境口粮'
  },
  {
    id: 'plantation',
    name: '经济作物园',
    group: '农林渔牧',
    resources: ['cotton', 'flax', 'sugarcane', 'spice', 'dye', 'silk'],
    labor: 950,
    output: 3350000,
    note: '纺织与香料的原料来源'
  },
  {
    id: 'pasture',
    name: '牧场',
    group: '农林渔牧',
    resources: ['cattle', 'sheep', 'horse', 'wool'],
    labor: 700,
    output: 2546000,
    note: '牲畜与羊毛，兼供军用马匹'
  },
  {
    id: 'fishery',
    name: '渔场',
    group: '农林渔牧',
    resources: ['seafish', 'riverfish', 'pearl', 'whaleoil'],
    labor: 620,
    output: 2278000,
    note: '沿海与河网国家的蛋白来源'
  },
  {
    id: 'logging',
    name: '伐木场',
    group: '采矿伐木',
    resources: ['timber', 'hardwood', 'resin', 'herb'],
    labor: 760,
    output: 2412000,
    note: '木材与药材，造船与建筑的起点'
  },
  {
    id: 'mine',
    name: '矿井',
    group: '采矿伐木',
    resources: ['iron', 'copper', 'tin', 'gold', 'silver', 'salt', 'sulphur', 'jade', 'obsidian'],
    labor: 1100,
    output: 3886000,
    note: '金属与宝石，兵器与礼仪的原料'
  },
  {
    id: 'workshop',
    name: '作坊',
    group: '加工制造',
    resources: [],
    labor: 880,
    output: 3216000,
    input: 0.55,
    note: '把原料变成布匹、工具、陶器与兵器'
  },
  {
    id: 'harbor',
    name: '商栈与码头',
    group: '流通服务',
    resources: [],
    labor: 520,
    output: 2010000,
    input: 0.25,
    note: '转运与仓储，放大交换半径'
  },
  {
    id: 'temple',
    name: '神庙与场院',
    group: '流通服务',
    resources: [],
    labor: 380,
    output: 1273000,
    note: '祭祀、历法与仓储，稳住人心'
  }
]

/** 按该国的物产与该国人口，推导各类建筑的等级 */
export function deriveBuildings(specs, population) {
  const ids = new Set(specs.map((s) => s.id))
  const pop = Math.max(500, population || 1000)

  // 总等级：人口越多、物产越杂，产业层级越高
  const totalLevels = Math.max(6, Math.round(Math.sqrt(pop) / 2.4))

  const weights = BUILDINGS.map((b) => {
    let w = 0
    if (b.resources.length) {
      w = b.resources.filter((r) => ids.has(r)).length * 1.4
    } else if (b.id === 'workshop') {
      w = specs.filter((s) => ['矿产', '林业', '农业'].includes(s.group)).length * 0.5
    } else if (b.id === 'harbor') {
      w = 0.6 + specs.filter((s) => ['渔猎', '特产'].includes(s.group)).length * 0.5
    } else {
      w = 0.7
    }
    return { b, w }
  })
  const sum = weights.reduce((n, x) => n + x.w, 0) || 1

  return weights.map(({ b, w }) => {
    const level = Math.max(b.resources.length && w < 0.4 ? 0 : 1, Math.round((w / sum) * totalLevels))
    return {
      ...b,
      level,
      laborTotal: level * b.labor,
      outputTotal: Math.round(level * b.output * (b.input ? 1 : 1))
    }
  })
}

export function buildingTotals(list) {
  return list.reduce(
    (acc, b) => {
      acc.levels += b.level
      acc.labor += b.laborTotal
      acc.output += b.outputTotal
      return acc
    },
    { levels: 0, labor: 0, output: 0 }
  )
}
