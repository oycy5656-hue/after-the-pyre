// 经济模型（浏览器与构建脚本共用）
// 单位：D（当量）= 一名成年人维持一天基本生活所需的商品与劳务

export const DEFAULT_GOODS = [
  { name: '玉米（1 石 ≈ 30 kg）', value: 3.2, note: '主粮基准，一切折算的锚' },
  { name: '木薯 / 根茎（1 石）', value: 2.0, note: '热量低于玉米，耐贫瘠' },
  { name: '棉布（1 匹 ≈ 6 m）', value: 8.5, note: '玛雅式的「准货币」，可当贡赋与聘礼' },
  { name: '盐（1 斗）', value: 5.0, note: '内陆硬通货，产地垄断' },
  { name: '黑曜石（1 块标准石核）', value: 4.0, note: '刃具原料，兼作仪式用' },
  { name: '可可豆（100 粒）', value: 0.6, note: '小额支付与宴饮消耗' },
  { name: '羽毛（1 束，格查尔）', value: 22.0, note: '身份物资，贵族与神庙专用' },
  { name: '玉石（1 件）', value: 60.0, note: '祭祀与丧葬，价值由仪式定义而非重量' },
  { name: '普通劳役（1 人·日）', value: 1.0, note: '记账基准本身' },
  { name: '工匠劳役（1 人·日）', value: 2.4, note: '烧陶、织造、石作' },
  { name: '祭司劳役（1 人·日）', value: 3.0, note: '历法、祭祀、医病、记事' }
]

export const DEFAULT_TRAITS = [
  { name: '贵族势力', group: '社会', desc: '本土贵族与国同寿，对政治有很高影响力。', e: { extraction: 0.05, stability: -0.02 } },
  { name: '僧侣集团', group: '社会', desc: '有组织、有成文仪轨的宗教集团。', e: { ritual: 0.04, yield: -0.02 } },
  { name: '军事兄弟会', group: '社会', desc: '听命于国王的常备军事组织。', e: { military: 0.08, yield: -0.02 } },
  { name: '多元联合', group: '社会', desc: '多个民族组成的联合体，靠妥协运转。', e: { exchange: 0.08, stability: -0.03 } },
  { name: '边民自治社群', group: '社会', desc: '边地社群以贡赋换实质自治。', e: { extraction: -0.04, stability: 0.03 } },
  { name: '蜜獴', group: '社会', desc: '边地商队与猎团，游走于政权缝隙间。', e: { exchange: 0.03 } },
  { name: '圣地', group: '社会', desc: '公认的中立祭祀场所，庇护与朝圣之地。', e: { stability: 0.05, exchange: 0.03 } },
  { name: '劳力制度', group: '经济', desc: '以无偿公共劳役为经济基石。', e: { labor: 0.12, yield: 0.04, stability: -0.03 } },
  { name: '神庙经济', group: '经济', desc: '经济附着一层宗教分配，神庙是仓储与再分配中心。', e: { ritual: 0.06, exchange: 0.02, yield: -0.01 } },
  { name: '以物易物', group: '经济', desc: '市场不依赖货币，靠实物交换。', e: { exchange: -0.1 } },
  { name: '贡献经济', group: '经济', desc: '属邦定期缴纳定额贡赋。', e: { extraction: 0.08, yield: 0.02 } },
  { name: '社会等级', group: '文化', desc: '血统决定阶层，等级森严。', e: { yield: 0.03, stability: -0.04 } },
  { name: '圣山', group: '文化', desc: '山与神灵相连，可敬可畏。', e: { stability: 0.04 } },
  { name: '巫鬼之风', group: '文化', desc: '以神祕仪式获取族群认可。', e: { yield: -0.05, stability: -0.02 } },
  { name: '神化祖先', group: '文化', desc: '祖先进入神话，为统治提供合法性。', e: { stability: 0.05, extraction: 0.02 } },
  { name: '众为一', group: '文化', desc: '分布范围广，彼此存在互助认同。', e: { yield: 0.05, stability: 0.03 } },
  { name: '昭昭天命', group: '文化', desc: '向外扩张是不可违逆的天数。', e: { military: 0.06, stability: 0.03, extraction: 0.02 } },
  { name: '法师社会', group: '文化', desc: '法师组成学徒制行会，地位高于常人。', e: { yield: -0.03, military: 0.05, stability: -0.02 } },
  { name: '深奥能量', group: '文化', desc: '统治者借神圣能量证明正当性，须反复举行仪式。', e: { stability: 0.06, ritual: 0.03, yield: -0.02 } },
  { name: '依赖征召', group: '军事', desc: '动员体系依赖平民征召。', e: { military: 0.04, labor: 0.04, yield: -0.03 } },
  { name: '凹凸河岸', group: '地理', desc: '聚居点位于河曲环绕的平岛台地。', e: { yield: 0.08, exchange: 0.05 } }
]

export const DEFAULT_BASE = {
  perCapita: 700,
  laborShare: 0.42,
  extraction: 0.18,
  ritual: 0.06,
  upkeep: 0.12,
  exchangeBase: 0.5,
  reserveMonths: 3.2,
  mobilization: 0.02
}

export const DEFAULT_COUNTRY_TRAITS = {
  玉海国: DEFAULT_TRAITS.map((t) => t.name)
}

export const SYSTEM_MODS = {
  封建君主制: { yield: 0.02, extraction: 0.01 },
  神王统治: { stability: 0.05, extraction: 0.04, yield: -0.02 },
  贵族共和制: { exchange: 0.06, extraction: 0.02 },
  军事民主制: { military: 0.06, stability: 0.02, yield: -0.01 },
  蛮族王国: { military: 0.05, exchange: -0.04, yield: -0.02 },
  氏族联盟: { stability: 0.02, exchange: -0.03, extraction: -0.03 },
  寡头共和制: { exchange: 0.05, extraction: 0.03 },
  魔权共和制: { yield: -0.03, military: 0.04, ritual: 0.03 }
}

export const REGION_MODS = {
  纵横水网: { yield: 0.06, exchange: 0.03 },
  古代遗迹: { yield: -0.02, stability: 0.02 },
  商路航线: { yield: 0.02, exchange: 0.08 },
  旧都残骸: { yield: -0.04, stability: -0.02 }
}

const ALIAS = {
  八菽之囿: '八薮之囿',
  白昀: '白韵',
  德拉米共和国: '德拉米',
  遴选: '遴选城',
  鸾尾花帝国: '鸾尾花',
  吉利卡斯至高国: '吉利卡斯',
  伊瑟兰议邦: '伊瑟兰'
}

const normalize = (n) => String(n || '').replace(/(帝国|共和国|王国|至高国|王朝|城|国)$/g, '').trim()

export function parsePopulation(raw) {
  const m = /^([\d.]+)\s*([KM]?)$/i.exec(String(raw || '').trim())
  if (!m) return 0
  const v = Number(m[1]) * (m[2].toUpperCase() === 'K' ? 1e3 : m[2].toUpperCase() === 'M' ? 1e6 : 1)
  return v
}

/** 计算所有国家的经济账 */
export function buildRows(countries, map, cfg = {}) {
  const base = { ...DEFAULT_BASE, ...(cfg.base || {}) }
  const traits = cfg.traits || DEFAULT_TRAITS
  const countryTraits = cfg.countryTraits || DEFAULT_COUNTRY_TRAITS
  const popOverride = cfg.populations || {}
  const traitByName = new Map(traits.map((t) => [t.name, t]))

  const stateByName = new Map()
  for (const s of map.states) {
    stateByName.set(s.name, s)
    stateByName.set(normalize(s.name), s)
  }

  const findState = (c) => {
    const cands = [c.name, ALIAS[c.name], normalize(c.name)].filter(Boolean)
    for (const k of cands) if (stateByName.has(k)) return stateByName.get(k)
    for (const k of cands) for (const s of map.states) if (s.name.includes(k) || k.includes(s.name)) return s
    return null
  }

  const rows = countries.map((c) => {
    const pop = parsePopulation(popOverride[c.name] ?? c.population)
    const st = findState(c)
    const area = st ? Math.max(1, st.area || 0) : null
    const active = (countryTraits[c.name] || []).map((n) => traitByName.get(n)).filter(Boolean)

    const mod = { yield: 0, extraction: 0, ritual: 0, exchange: 0, stability: 0, military: 0, labor: 0 }
    for (const t of active) for (const [k, v] of Object.entries(t.e || {})) mod[k] = (mod[k] || 0) + v

    const sm = SYSTEM_MODS[c.politics?.system]
    if (sm) for (const [k, v] of Object.entries(sm)) mod[k] = (mod[k] || 0) + v

    if (pop > 0) {
      const scale = Math.log10(pop / 1000 + 1)
      mod.yield += Math.min(0.16, scale * 0.06)
      mod.exchange += Math.min(0.12, scale * 0.05)
      if (area) {
        const density = pop / area
        mod.exchange += Math.min(0.14, Math.max(-0.06, (Math.log10(Math.max(10, density)) - 2) * 0.08))
      }
    }

    for (const tag of c.region?.traits || []) {
      const r = REGION_MODS[tag]
      if (!r) continue
      for (const [k, v] of Object.entries(r)) mod[k] = (mod[k] || 0) + v
    }

    const yieldRate = base.perCapita * (1 + mod.yield)
    const gross = pop * yieldRate
    const extractionRate = Math.min(0.45, Math.max(0.05, base.extraction + mod.extraction))
    const ritualRate = Math.min(0.3, Math.max(0.01, base.ritual + mod.ritual))
    const upkeep = gross * base.upkeep
    const extracted = gross * extractionRate
    const ritual = gross * ritualRate
    const surplus = gross - extracted - ritual - upkeep
    const perCapitaSurplus = pop ? surplus / pop : 0
    const surplusRate = gross ? surplus / gross : 0

    const exchange = Math.max(0.08, Math.min(0.95, base.exchangeBase + mod.exchange))
    const radius = Math.round(12 + 140 * Math.sqrt((area || 300) / 1000) * (0.4 + exchange))
    const reserveMonths = Math.max(0.4, base.reserveMonths * (1 + mod.yield * 1.4 - extractionRate - ritualRate + 0.2))
    const mobilization = Math.max(0.004, base.mobilization * (1 + mod.military))
    const levy = Math.round(pop * mobilization)

    const stable = 0.5 + mod.stability
    const raw =
      20 +
      35 * Math.min(1, Math.max(0, surplusRate) / 0.7) +
      15 * exchange +
      15 * Math.min(1, reserveMonths / 6) +
      10 * Math.min(1, Math.max(0, stable)) -
      60 * Math.max(0, extractionRate - base.extraction) -
      40 * Math.max(0, ritualRate - base.ritual)

    // 手工覆盖：允许直接改写最终数字
    const ov = (cfg.countryOverrides || {})[c.name] || {}
    const num = (k) => (ov[k] === undefined || ov[k] === '' || ov[k] === null ? null : Number(ov[k]))

    let finalGross = num('gross') ?? Math.round(gross)
    let finalPerCapita = num('perCapita') ?? Math.round(yieldRate)
    let finalExtraction = num('extractionPct') != null ? num('extractionPct') / 100 : extractionRate
    let finalRitual = ritualRate
    let finalReserve = num('reserveMonths') ?? Math.round(reserveMonths * 10) / 10
    let finalRadius = num('radius') ?? Math.round(12 + 140 * Math.sqrt((area || 300) / 1000) * (0.4 + exchange))
    let finalLevy = num('levy') ?? Math.round(pop * mobilization)
    let finalScore = num('score') ?? (pop ? Math.max(1, Math.min(100, Math.round(raw))) : null)

    const finalExtracted = Math.round(finalGross * finalExtraction)
    const finalRitualCost = Math.round(finalGross * finalRitual)
    const finalUpkeep = Math.round(finalGross * base.upkeep)
    const finalSurplus =
      num('surplusPct') != null
        ? Math.round(finalGross * (num('surplusPct') / 100))
        : finalGross - finalExtracted - finalRitualCost - finalUpkeep
    const finalSurplusRate = finalGross ? finalSurplus / finalGross : 0

    return {
      name: c.name,
      slug: c.slug,
      manual: Object.keys(ov).length > 0,
      population: pop,
      populationText: c.population || '—',
      area,
      traits: active.map((t) => t.name),
      traitNames: active.length,
      gross: finalGross,
      perCapita: finalPerCapita,
      extractionRate: finalExtraction,
      ritualRate: finalRitual,
      upkeep: finalUpkeep,
      extracted: finalExtracted,
      ritual: finalRitualCost,
      surplus: finalSurplus,
      perCapitaSurplus: pop ? Math.round(finalSurplus / pop) : 0,
      surplusRate: finalSurplusRate,
      exchange,
      radius: finalRadius,
      reserveMonths: finalReserve,
      levy: finalLevy,
      score: finalScore,
      parts: [
        { label: '谷物与根茎', value: Math.round(finalGross * 0.58), color: '#8fae6a' },
        { label: '织物与陶器', value: Math.round(finalGross * 0.17), color: '#b08a4f' },
        { label: '盐与黑曜石', value: Math.round(finalGross * 0.11), color: '#6f8ba8' },
        { label: '贡赋与转输', value: Math.round(finalGross * 0.09), color: '#9c6f9c' },
        { label: '朝圣与仪式', value: Math.round(finalGross * 0.05), color: '#c9a24a' }
      ]
    }
  })

  return rows.sort((a, b) => b.perCapitaSurplus - a.perCapitaSurplus)
}
