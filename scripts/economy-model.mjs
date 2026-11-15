// 经济模型：无货币社会的统一口径与天赋系数
// 单位 D（当量）= 一名成年人维持一天基本生活所需的商品与劳务

export const GOODS = [
  { name: '玉米（1 石 ≈ 30 kg）', value: 3.2, note: '主粮基准，一切折算的锚' },
  { name: '木薯 / 根茎（1 石）', value: 2.0, note: '热量低于玉米，耐贫瘠' },
  { name: '棉布（1 匹 ≈ 6 m）', value: 8.5, note: '玛雅式的“准货币”，可当贡赋与聘礼' },
  { name: '盐（1 斗）', value: 5.0, note: '内陆硬通货，产地垄断' },
  { name: '黑曜石（1 块标准石核）', value: 4.0, note: '刃具原料，兼作仪式用' },
  { name: '可可豆（100 粒）', value: 0.6, note: '小额支付与宴饮消耗' },
  { name: '羽毛（1 束，格查尔）', value: 22.0, note: '身份物资，贵族与神庙专用' },
  { name: '玉石（1 件）', value: 60.0, note: '祭祀与丧葬，价值由仪式定义而非重量' },
  { name: '普通劳役（1 人·日）', value: 1.0, note: '记帐基准本身' },
  { name: '工匠劳役（1 人·日）', value: 2.4, note: '烧陶、织造、石作' },
  { name: '祭司劳役（1 人·日）', value: 3.0, note: '历法、祭祀、医病、记事' }
]

// 天赋系数：对六个经济参数的乘性/加性影响
// 参数：yield 产出率、extraction 上层抽取、ritual 神庙消耗、exchange 交换效率、
//       stability 稳定度、military 军事动员
export const TRAITS = [
  // 社会结构
  { name: '贵族势力', group: '社会', desc: '本土贵族与国同寿，对政治有很高影响力。', e: { extraction: 0.05, stability: -0.02 } },
  { name: '僧侣集团', group: '社会', desc: '有组织、有成文仪轨的宗教集团。', e: { ritual: 0.04, yield: -0.02 } },
  { name: '军事兄弟会', group: '社会', desc: '听命于国王的常备军事组织。', e: { military: 0.08, yield: -0.02 } },
  { name: '多元联合', group: '社会', desc: '多个民族组成的联合体，靠妥协运转。', e: { exchange: 0.08, stability: -0.03 } },
  { name: '边民自治社群', group: '社会', desc: '边地社群以贡赋换实质自治。', e: { extraction: -0.04, stability: 0.03 } },
  { name: '蜜獴', group: '社会', desc: '边地商队与猎团，游走于政权缝隙间。', e: { exchange: 0.03 } },
  { name: '圣地', group: '社会', desc: '公认的中立祭祀场所，庇护与朝圣之地。', e: { stability: 0.05, exchange: 0.03 } },

  // 经济制度
  { name: '劳力制度', group: '经济', desc: '以无偿公共劳役为经济基石。', e: { labor: 0.12, yield: 0.04, stability: -0.03 } },
  { name: '神庙经济', group: '经济', desc: '经济附着一层宗教分配，神庙是仓储与再分配中心。', e: { ritual: 0.06, exchange: 0.02, yield: -0.01 } },
  { name: '以物易物', group: '经济', desc: '市场不依赖货币，靠实物交换。', e: { exchange: -0.10 } },
  { name: '贡献经济', group: '经济', desc: '属邦定期缴纳定额贡赋，手工制品与贵金属为主。', e: { extraction: 0.08, yield: 0.02 } },

  // 文化
  { name: '社会等级', group: '文化', desc: '血统决定阶层，等级森严。', e: { yield: 0.03, stability: -0.04 } },
  { name: '圣山', group: '文化', desc: '山与神灵相连，可敬可畏。', e: { stability: 0.04 } },
  { name: '巫鬼之风', group: '文化', desc: '以神祕仪式获取族群认可。', e: { yield: -0.05, stability: -0.02 } },
  { name: '神化祖先', group: '文化', desc: '祖先进入神话，为统治提供合法性。', e: { stability: 0.05, extraction: 0.02 } },
  { name: '众为一', group: '文化', desc: '分布范围广，彼此存在互助认同。', e: { yield: 0.05, stability: 0.03 } },
  { name: '昭昭天命', group: '文化', desc: '向外扩张是不可违逆的天数。', e: { military: 0.06, stability: 0.03, extraction: 0.02 } },
  { name: '法师社会', group: '文化', desc: '法师组成学徒制行会，地位高于常人。', e: { yield: -0.03, military: 0.05, stability: -0.02 } },
  { name: '深奥能量', group: '文化', desc: '统治者借神圣能量证明正当性，须反复举行仪式。', e: { stability: 0.06, ritual: 0.03, yield: -0.02 } },

  // 军事 / 地理
  { name: '依赖征召', group: '军事', desc: '动员体系依赖平民征召。', e: { military: 0.04, labor: 0.04, yield: -0.03 } },
  { name: '凹凸河岸', group: '地理', desc: '聚居点位于河曲环绕的平岛台地，被水系屏隔包围。', e: { yield: 0.08, exchange: 0.05 } }
]

// 已登记天赋的国家（按档案录入；未登记的国家只算基础盘）
export const COUNTRY_TRAITS = {
  玉海国: TRAITS.map((t) => t.name)
}

// 参数初值
export const BASE = {
  perCapita: 2000, // 人均年产出（D）
  laborShare: 0.42, // 劳力参与率
  extraction: 0.18, // 上层抽取
  ritual: 0.06, // 神庙/仪式消耗
  upkeep: 0.12, // 种子、工具、损耗
  exchangeBase: 0.5, // 交换效率基准
  reserveMonths: 3.2, // 基准储备（月）
  mobilization: 0.02 // 基准动员上限（占人口）
}

// 区域风土对产出/交换的轻量修正
export const REGION_MODS = {
  纵横水网: { yield: 0.06, exchange: 0.03 },
  古代遗迹: { yield: -0.02, stability: 0.02 },
  商路航线: { yield: 0.02, exchange: 0.08 },
  旧都残骸: { yield: -0.04, stability: -0.02 }
}
