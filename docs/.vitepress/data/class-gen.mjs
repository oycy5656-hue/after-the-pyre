// 按国家背景生成阶层：名称、占比、消费篮都与当地条件相关

import { TRAITS_BY_COUNTRY } from './traits.mjs'
import { RESOURCES } from './resources.mjs'

const byId = new Map(RESOURCES.map((r) => [r.id, r]))
const NAME_TO_ID = new Map(RESOURCES.map((r) => [r.name, r.id]))

/** 每个「角色」的消费倾向（会按本地可得物产过滤） */
export const ROLE_BASKETS = {
  上层: {
    wine: 0.05, oliveoil: 0.03, woolen: 0.03, linen: 0.02, spice: 0.008, pepper: 0.006,
    honey: 0.02, wax: 0.01, cheese: 0.03, mead: 0.02, ivory: 0.001, jade: 0.001,
    amber: 0.001, bronze_ware: 0.004, amphora: 0.02, jewelry: 0.001
  },
  祭司: {
    wine: 0.02, herb: 0.03, honey: 0.02, wax: 0.03, oliveoil: 0.015,
    cheese: 0.02, fishsauce: 0.012, amphora: 0.025, incense: 0.004
  },
  武士: {
    leather: 0.03, weapon: 0.003, bronze_tool: 0.005, cloth: 0.025, beer: 0.04,
    saltedfish: 0.035, cheese: 0.025, salt: 0.04, rope: 0.006, hornware: 0.005,
    iron_tool: 0.004
  },
  农户: {
    bread: 0.06, flour: 0.04, beer: 0.05, cheese: 0.025, saltedfish: 0.025,
    cloth: 0.03, felt: 0.02, pottery: 0.04, amphora: 0.015, wicker: 0.02,
    stone_tool: 0.02, salt: 0.05, charcoal: 0.03, stone: 0.05, timber: 0.07,
    clay: 0.015, tallow: 0.01, olive: 0.015, grape: 0.015, date: 0.02,
    fishsauce: 0.015, tuber: 0.02, turnip: 0.02
  },
  贫民: {
    flour: 0.05, fishsauce: 0.02, pottery: 0.025, salt: 0.035, wicker: 0.015,
    bone_tool: 0.01, stone: 0.04, timber: 0.05, charcoal: 0.015, nettle: 0.01,
    tuber: 0.03, millet: 0.03
  },
  工匠: {
    stone: 0.02, clay: 0.03, timber: 0.04, charcoal: 0.05, rope: 0.008,
    stone_tool: 0.01, bronze_tool: 0.004, pottery: 0.02
  },
  水手: {
    saltedfish: 0.04, seafish: 0.05, rope: 0.012, sailcloth: 0.004,
    beer: 0.02, salt: 0.03, hemp: 0.02, tar: 0.004
  },
  牧民: {
    cheese: 0.06, butter: 0.02, wool: 0.02, hide: 0.02, felt: 0.03,
    tallow: 0.03, meat: 0.02, milk: 0.02
  },
  矿工: {
    charcoal: 0.02, stone_tool: 0.01, iron: 0.002, copper: 0.002, beer: 0.02,
    bread: 0.03, salt: 0.03
  },
  奴隶: {
    flour: 0.04, millet: 0.04, pottery: 0.02, salt: 0.03, nettle: 0.01, water: 0
  },
  学者: {
    paper: 0.006, herb: 0.02, wine: 0.015, oliveoil: 0.01, wax: 0.03, ink: 0
  },
  林民: {
    timber: 0.05, herb: 0.03, bark: 0.02, game: 0.03, honey: 0.02, wicker: 0.02
  }
}

/** 种族 → 阶层名与人设（占比按前工业社会的真实结构） */
const RACE_TEMPLATES = {
  人类: {
    feudal: [
      ['贵族', '上层', 0.012],
      ['祭司', '祭司', 0.015],
      ['战士', '武士', 0.035],
      ['农人', '农户', 0.72],
      ['隶农', '贫民', 0.15],
      ['匠户', '工匠', 0.068]
    ],
    republic: [
      ['世家', '上层', 0.015],
      ['商旅', '工匠', 0.05],
      ['桨手', '水手', 0.06],
      ['农人', '农户', 0.7],
      ['匠户', '工匠', 0.065],
      ['奴隶', '奴隶', 0.11]
    ],
    tribal: [
      ['族长', '上层', 0.008],
      ['祭司', '祭司', 0.012],
      ['勇士', '武士', 0.035],
      ['牧人', '牧民', 0.845],
      ['俘户', '贫民', 0.1]
    ]
  },
  精灵: [
    ['林主', '上层', 0.01],
    ['咏者', '祭司', 0.02],
    ['游侠', '武士', 0.03],
    ['林民', '林民', 0.86],
    ['林外流民', '贫民', 0.08]
  ],
  小精灵: [
    ['术胄家族', '上层', 0.01],
    ['六院法师', '学者', 0.04],
    ['匠户', '工匠', 0.15],
    ['苇民', '农户', 0.75],
    ['无派籍者', '贫民', 0.05]
  ],
  神明灵: [
    ['阴官', '上层', 0.008],
    ['祭司', '祭司', 0.04],
    ['附体者', '武士', 0.03],
    ['游魂', '农户', 0.85],
    ['将散之魄', '贫民', 0.072]
  ],
  亚基: [
    ['部族母', '上层', 0.01],
    ['甲士', '武士', 0.05],
    ['潜渊者', '水手', 0.1],
    ['礁民', '农户', 0.79],
    ['幼壳', '贫民', 0.05]
  ],
  利扎: [
    ['龙裔', '上层', 0.008],
    ['龙骑士', '武士', 0.03],
    ['匠奴', '工匠', 0.12],
    ['牧人', '牧民', 0.7],
    ['人牲', '奴隶', 0.142]
  ],
  凤仙: [
    ['老祖母', '上层', 0.005],
    ['巫祭', '祭司', 0.02],
    ['翼猎手', '武士', 0.04],
    ['部民', '农户', 0.885],
    ['无翼者', '贫民', 0.05]
  ],
  怪兽: [
    ['巨兽之主', '上层', 0.01],
    ['兽栏看守', '武士', 0.04],
    ['骨匠', '工匠', 0.1],
    ['牧群饲养人', '牧民', 0.75],
    ['旁支', '贫民', 0.1]
  ]
}

const SYSTEM_BUCKET = {
  神王统治: 'tribal',
  封建君主制: 'feudal',
  贵族共和制: 'republic',
  寡头共和制: 'republic',
  魔权共和制: 'republic',
  军事民主制: 'tribal',
  蛮族王国: 'tribal',
  氏族联盟: 'tribal'
}

/** 生成某国的阶层 */
export function classesFor(country, specIds) {
  const race = country.race || '人类'
  const bucket = SYSTEM_BUCKET[country.politics?.system] || 'feudal'
  const raceTmpl = RACE_TEMPLATES[race]
  const tmpl = Array.isArray(raceTmpl)
    ? raceTmpl
    : (raceTmpl && raceTmpl[bucket]) || RACE_TEMPLATES.人类.feudal

  const have = (id) => specIds.has(id)
  const available = (basket) => {
    const out = {}
    for (const [id, per] of Object.entries(basket)) {
      if (!byId.has(id)) continue
      // 只有本地能产或能加工的物产才计入消费
      const recipeIds = Object.keys(byId.get(id)?.recipe || {}).map((k) => NAME_TO_ID.get(k)).filter(Boolean)
      const local = have(id) || (byId.get(id)?.kind === 'processed' && recipeIds.some((k) => specIds.has(k)))
      if (local) out[id] = per
    }
    return out
  }

  const ensureUpper = (basket) => {
    if (Object.keys(basket).length >= 5) return basket
    const fallback = ['wine', 'oliveoil', 'woolen', 'linen', 'cheese', 'honey', 'wax', 'amphora', 'bronze_ware', 'mead', 'tallow']
    const out = { ...basket }
    for (const id of fallback) {
      if (Object.keys(out).length >= 5) break
      if (out[id]) continue
      if (!byId.has(id)) continue
      const r = byId.get(id)
      const recipeIds = Object.keys(r.recipe || {}).map((k) => NAME_TO_ID.get(k)).filter(Boolean)
      const craftable = r.kind === 'processed' && recipeIds.some((k) => specIds.has(k))
      if (specIds.has(id) || craftable) out[id] = 0.02
    }
    return out
  }

  return tmpl.map(([name, role, share]) => {
    const base = ROLE_BASKETS[role] || ROLE_BASKETS.农户
    let basket = available(base)
    if (role === '上层') basket = ensureUpper(basket)
    return { name, role, share, basket }
  })
}
