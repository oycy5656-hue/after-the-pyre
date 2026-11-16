// 社会阶层与消费篮：让市场里的剩余被各阶层吃掉
// 每个阶层有固定人口占比，以及每人每年的消费清单

export const CLASS_ORDER = ['上层', '祭司', '武士', '农户', '贫民']

/** 政体 → 阶层占比 */
const SYSTEM_SHARES = {
  神王统治: { 上层: 0.03, 祭司: 0.09, 武士: 0.1, 农户: 0.58, 贫民: 0.2 },
  封建君主制: { 上层: 0.05, 祭司: 0.03, 武士: 0.13, 农户: 0.6, 贫民: 0.19 },
  贵族共和制: { 上层: 0.07, 祭司: 0.03, 武士: 0.12, 农户: 0.58, 贫民: 0.2 },
  寡头共和制: { 上层: 0.08, 祭司: 0.02, 武士: 0.1, 农户: 0.6, 贫民: 0.2 },
  魔权共和制: { 上层: 0.05, 祭司: 0.07, 武士: 0.1, 农户: 0.58, 贫民: 0.2 },
  军事民主制: { 上层: 0.03, 祭司: 0.03, 武士: 0.18, 农户: 0.58, 贫民: 0.18 },
  蛮族王国: { 上层: 0.04, 祭司: 0.04, 武士: 0.16, 农户: 0.56, 贫民: 0.2 },
  氏族联盟: { 上层: 0.03, 祭司: 0.05, 武士: 0.15, 农户: 0.57, 贫民: 0.2 }
}

const DEFAULT_SHARES = { 上层: 0.04, 祭司: 0.04, 武士: 0.12, 农户: 0.6, 贫民: 0.2 }

export function classShares(system) {
  return SYSTEM_SHARES[system] || DEFAULT_SHARES
}

/** 各阶层人均年消费（单位随物产） */
export const CLASS_BASKETS = {
  上层: {
    wine: 0.06,
    oliveoil: 0.03,
    linen: 0.02,
    woolen: 0.03,
    spice: 0.01,
    pepper: 0.008,
    honey: 0.02,
    wax: 0.01,
    ivory: 0.002,
    jade: 0.002,
    amber: 0.002,
    bronze_ware: 0.006,
    amphora: 0.02,
    cheese: 0.03,
    mead: 0.02
  },
  祭司: {
    wine: 0.03,
    oliveoil: 0.02,
    herb: 0.04,
    incense: 0.01,
    honey: 0.03,
    wax: 0.03,
    linen: 0.012,
    amphora: 0.03,
    cheese: 0.02,
    fishsauce: 0.015
  },
  武士: {
    leather: 0.03,
    weapon: 0.004,
    bronze_tool: 0.006,
    cloth: 0.02,
    beer: 0.03,
    saltedfish: 0.04,
    cheese: 0.03,
    salt: 0.04,
    rope: 0.008,
    hornware: 0.006
  },
  农户: {
    bread: 0.08,
    flour: 0.05,
    beer: 0.06,
    cheese: 0.03,
    saltedfish: 0.03,
    cloth: 0.04,
    felt: 0.02,
    pottery: 0.035,
    amphora: 0.02,
    wicker: 0.02,
    stone_tool: 0.02,
    salt: 0.05,
    charcoal: 0.03,
    stone: 0.08,
    timber: 0.1,
    clay: 0.02,
    tallow: 0.02,
    olive: 0.02,
    grape: 0.02,
    leather: 0.01,
    salt: 0.06
  },
  贫民: {
    flour: 0.06,
    fishsauce: 0.02,
    pottery: 0.03,
    salt: 0.04,
    wicker: 0.02,
    bone_tool: 0.01,
    stone: 0.05,
    timber: 0.06,
    charcoal: 0.015,
    nettle: 0.01
  }
}

/** 国内手工业：家庭纺纱织布、烧陶，补足作坊产能缺口 */
export const HOUSEHOLD_CRAFT = {
  beer: { from: 'barley', rate: 0.3 },
  cloth: { from: 'flax', rate: 0.85 },
  linen: { from: 'flax', rate: 0.25 },
  woolen: { from: 'wool', rate: 0.75 },
  pottery: { from: 'clay', rate: 0.7 },
  amphora: { from: 'clay', rate: 0.2 },
  wicker: { from: 'timber', rate: 0.12 },
  rope: { from: 'hemp', rate: 0.2 }
}
