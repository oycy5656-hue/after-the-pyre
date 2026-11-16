// 天赋 → 经济系数：把 22 份登记档案里的天赋折算成经济修正
// 效果键与 economy-model 的 mod 一致：yield / extraction / ritual / exchange / stability / military / labor

import { TRAITS_BY_COUNTRY } from './traits.mjs'

/** 显式定义的关键天赋效果（未列出的按分类默认） */
export const TRAIT_ECON = {
  // —— 农业与产出 ——
  河谷灌溉: { yield: 0.05 },
  轮作公社: { yield: 0.04, stability: 0.01 },
  农耕传统: { yield: 0.06 },
  浮稻: { yield: 0.05 },
  梯田: { yield: 0.04 },
  安土重迁: { yield: 0.03, exchange: -0.02 },
  牧民传统: { yield: 0.03 },
  圣林: { yield: 0.02, ritual: 0.01 },
  圣山: { yield: 0.02, stability: 0.02 },
  潮汐水道: { yield: 0.04, exchange: 0.03 },
  凹凸河岸: { yield: 0.03, exchange: 0.02 },
  灰岩台地: { yield: -0.01, stability: 0.02 },
  荒野灰丘: { yield: -0.02 },
  泥炭沼泽: { yield: -0.03, exchange: 0.02 },
  灌木山地: { yield: -0.02 },
  花岗岩岛山: { yield: 0.01 },
  季节性泛滥森林: { yield: 0.02 },
  粮食产地: { yield: 0.05 },
  铁矿: { yield: 0.02, military: 0.02 },
  港口: { exchange: 0.05 },

  // —— 经济制度 ——
  劳役制度: { labor: 0.08, yield: 0.03, stability: -0.02 },
  贡赋经济: { extraction: 0.05, yield: 0.02 },
  神庙经济: { ritual: 0.05, stability: 0.02 },
  以物易物: { exchange: -0.06 },
  货币习俗: { exchange: 0.08 },
  佣兵经济: { military: 0.04, labor: 0.04, yield: -0.02 },
  国家奴隶: { labor: 0.05, yield: 0.02, stability: -0.03 },
  军事殖民: { military: 0.03, yield: 0.02 },
  迁民垦殖: { stability: -0.02, yield: 0.02 },
  手工业发达: { yield: 0.05, exchange: 0.03 },
  城市无产者: { labor: 0.04, stability: -0.02 },
  域外商港: { exchange: 0.08 },
  调控主义: { stability: 0.03, exchange: 0.02 },
  垂直游牧: { yield: 0.03 },
  技术优势: { yield: 0.04, military: 0.02 },

  // —— 政治与稳定 ——
  广场政治: { stability: 0.02, exchange: 0.02 },
  寡头共治: { stability: -0.02, extraction: 0.02 },
  贵族势力: { extraction: 0.02, stability: -0.01 },
  利益集团: { exchange: 0.02, stability: -0.02 },
  派系倾轧: { stability: -0.05, military: 0.02 },
  多元联合: { exchange: 0.05, stability: -0.02 },
  边民自治社群: { exchange: 0.02, extraction: -0.02 },
  缓冲地带: { military: 0.02, exchange: 0.02 },
  朝秦暮楚: { exchange: 0.03, stability: -0.02 },
  神圣家族: { stability: 0.04, extraction: 0.02 },
  强者为王: { military: 0.04, stability: -0.03 },
  军事兄弟会: { military: 0.05, stability: -0.02 },
  恐怖统治: { extraction: 0.03, stability: -0.04 },
  血海深仇: { military: 0.05, exchange: -0.04 },
  复国主义: { military: 0.02, stability: -0.01 },
  扩张习俗: { military: 0.03, extraction: 0.02, stability: -0.02 },
  蛮族: { military: 0.02, stability: -0.02 },
  僧侣集团: { ritual: 0.04, stability: 0.02 },
  圣地: { ritual: 0.03, exchange: 0.03 },
  文化辐射: { exchange: 0.05 },
  仲裁者: { exchange: 0.04, stability: 0.02 },
  文书体系: { extraction: 0.03, stability: 0.02 },
  集团政治: { stability: -0.02, extraction: 0.02 },
  稳定贵族: { stability: 0.03 },
  军功集团: { military: 0.04, extraction: 0.02 },
  枢纽通衢: { exchange: 0.06 },
  孤立主义: { exchange: -0.08, stability: 0.03 },
  内弭夫兄: { stability: 0.04 },

  // —— 军事 ——
  职业军团: { military: 0.06, labor: 0.02 },
  军事精锐化: { military: 0.05 },
  常胜之军: { military: 0.06, stability: 0.02 },
  人海战术: { military: 0.04, labor: 0.03 },
  依赖征召: { military: 0.03, labor: 0.03 },
  战争法师: { military: 0.04, ritual: 0.02 },
  海军传统: { exchange: 0.05, military: 0.02 },
  动物伙伴: { military: 0.03, yield: 0.02 },
  魔兽军团: { military: 0.05 },
  育马者: { military: 0.03, yield: 0.02 },
  长弓竞赛: { military: 0.03 },

  // —— 文化 ——
  尚武传统: { military: 0.03, stability: 0.01 },
  和谐劳作: { yield: 0.03, stability: 0.03 },
  家庭纽带: { stability: 0.03 },
  社会等级: { stability: 0.02, extraction: 0.02 },
  哲人主义: { yield: 0.02, stability: 0.01 },
  诗人传统: { stability: 0.01, exchange: 0.02 },
  优美诗歌: { stability: 0.01 },
  崇尚乐舞: { ritual: 0.02, stability: 0.01 },
  神化祖先: { stability: 0.03, extraction: 0.01 },
  合众为一: { stability: 0.02, exchange: 0.03 },
  昭昭天命: { military: 0.03, stability: 0.02 },
  律法主义: { stability: 0.03, exchange: 0.02 },
  深奥能量: { ritual: 0.04, stability: 0.02 },
  巫鬼之风: { ritual: 0.03 },
  圣猎: { yield: 0.02, military: 0.01 },
  宴会传统: { exchange: 0.03, stability: 0.01 },
  魅力非凡: { exchange: 0.05 },
  眺望远方: { exchange: 0.03, military: 0.01 },
  追求财富: { exchange: 0.05, extraction: 0.02 },
  海上人生: { exchange: 0.06, military: 0.01 },
  四海为家: { exchange: 0.03 },
  大迁徙的记忆: { stability: 0.01, exchange: 0.02 },
  爱好闯荡: { exchange: 0.03 },
  边区民族: { military: 0.03, stability: 0.01 },
  多元主义: { exchange: 0.03, stability: -0.01 },
  法师社会: { ritual: 0.03, military: 0.02 },
  术胄统治: { extraction: 0.03, ritual: 0.03 },
  奇迹工匠: { yield: 0.02, exchange: 0.02 },
  公共建设: { yield: 0.02, stability: 0.02 },
  慈善主义: { stability: 0.03, yield: -0.01 },
  宏伟建筑: { yield: 0.02 },
  圣婚: { stability: 0.02 },
  献祭仪式: { ritual: 0.04, stability: -0.02 },
  猎首传统: { military: 0.02, ritual: 0.02 },
  亡者文化: { ritual: 0.03 },
  巨石崇拜: { ritual: 0.02, stability: 0.01 },
  祭祖主义: { stability: 0.02 },
  恪守祖训: { stability: 0.03, yield: -0.02 },
  保守务实: { yield: 0.03, exchange: -0.02 },
  英雄主义: { military: 0.03 },
  浪漫主义: { exchange: 0.02, yield: -0.01 },
  文化孤岛: { exchange: -0.05, stability: 0.03 },
  部族方言: { exchange: -0.03 },
  百里同音: { exchange: 0.03 },
  同文同种: { exchange: 0.02, stability: 0.02 },
  繁盛族裔: { stability: 0.02 },
  其疾如风: { military: 0.02, exchange: 0.02 },
  首生之水: { yield: 0.03 },
  侵略如火: { military: 0.03 },
  不动如山: { stability: 0.03, military: 0.01 },
  动如雷震: { military: 0.02, exchange: 0.01 },
  其徐如林: { yield: 0.02, stability: 0.01 },
  四角学派: { ritual: 0.01, yield: 0.01 },
  无分元素: { yield: 0.01, military: 0.01 },
  炼金学派: { yield: 0.03 },
  灵魂学派: { ritual: 0.02 },
  巫王: { ritual: 0.03, military: 0.02 }
}

/** 按小类兜底 */
const CATEGORY_DEFAULT = {
  政治: { exchange: 0.01 },
  经济: { yield: 0.01 },
  文化: { stability: 0.01 },
  军事: { military: 0.01 },
  地理: { yield: 0.01 },
  出身: {},
  因果: {},
  实力: { military: 0.02 }
}

const KEYS = ['yield', 'extraction', 'ritual', 'exchange', 'stability', 'military', 'labor']

/** 单个天赋的经济效果 */
export function effectOf(trait) {
  const explicit = TRAIT_ECON[trait.name]
  if (explicit) return explicit
  return CATEGORY_DEFAULT[trait.category] || {}
}

/** 一个国家全部天赋的合计效果（限幅） */
export function countryEffects(name) {
  const card = TRAITS_BY_COUNTRY[name]
  const mod = Object.fromEntries(KEYS.map((k) => [k, 0]))
  if (!card) return mod

  const carriers = []
  for (const t of card.traits) {
    const e = effectOf(t)
    if (!e || !Object.keys(e).length) continue
    for (const [k, v] of Object.entries(e)) mod[k] += v
    carriers.push({ name: t.name, e })
  }

  // 边际递减：天赋越多，单条影响越小
  const damp = 1 / (1 + Math.max(0, carriers.length - 6) * 0.055)
  for (const k of Object.keys(mod)) mod[k] *= damp

  // 限幅，避免天赋堆叠失衡
  mod.yield = Math.max(-0.15, Math.min(0.22, mod.yield))
  mod.extraction = Math.max(-0.1, Math.min(0.15, mod.extraction))
  mod.ritual = Math.max(-0.05, Math.min(0.12, mod.ritual))
  mod.exchange = Math.max(-0.18, Math.min(0.22, mod.exchange))
  mod.stability = Math.max(-0.12, Math.min(0.16, mod.stability))
  mod.military = Math.max(-0.04, Math.min(0.16, mod.military))
  mod.labor = Math.max(-0.1, Math.min(0.2, mod.labor))

  return { mod, carriers, count: card.traits.length }
}

/** 供 economy-model 使用的 countryTraits：国名 → 天赋名数组 */
export const COUNTRY_TRAIT_NAMES = Object.fromEntries(
  Object.entries(TRAITS_BY_COUNTRY).map(([civ, card]) => [civ, card.traits.map((t) => t.name)])
)

/** 天赋索引（economy-model 的 traits 里要能找到对应 e） */
export const TRAIT_ECON_LIST = [...new Set(Object.values(TRAITS_BY_COUNTRY).flatMap((c) => c.traits.map((t) => t.name)))].map(
  (name) => {
    const card = Object.values(TRAITS_BY_COUNTRY).find((c) => c.traits.some((t) => t.name === name))
    const t = card.traits.find((x) => x.name === name)
    return { name, group: t.category, desc: t.desc, e: effectOf(t) }
  }
)
