// 物产目录 v5：黑暗时代（新石器末至铁器初）适用清单
// 移除了超出时代上限的物料（可可、咖啡、橡胶、玻璃、纸、香水、首饰等）
// kind: raw 原料 / processed 加工品
// metal: 该加工品需要的金属（iron / bronze / any）

export const RESOURCE_GROUPS = {
  农业: '#8fae6a',
  畜牧: '#b08a4f',
  渔猎: '#5c8fa8',
  林业: '#4f8a5b',
  矿产: '#8a7f8f',
  特产: '#c08a2e',
  加工品: '#9c6f9c'
}

export const CLIMATES = {
  温带: '#7fa86b',
  地中海: '#c8a24a',
  干旱: '#c08a4f',
  热带: '#4f9a72',
  寒带: '#6f96b0',
  高山: '#8a7f9c',
  海洋: '#5c8fa8',
  通用: '#8a8a8a'
}

export const RESOURCES = [
  // —— 谷物与块茎 ——
  { id: 'wheat', name: '小麦', group: '农业', kind: 'raw', unit: '石', value: 34, icon: '🌾', climate: '温带', biomes: { 温带落叶阔叶林: 1, 草原: 1, 亚热带常绿阔叶林带: 0.7 }, h: [20, 75] },
  { id: 'barley', name: '大麦', group: '农业', kind: 'raw', unit: '石', value: 28, icon: '🌾', climate: '温带', biomes: { 草原: 1, 寒漠: 0.6, 温带落叶阔叶林: 0.8 }, h: [20, 90] },
  { id: 'rye', name: '黑麦', group: '农业', kind: 'raw', unit: '石', value: 26, icon: '🌾', climate: '寒带', biomes: { 亚寒带针叶林: 1, 苔原: 0.7, 温带落叶阔叶林: 0.6 }, h: [30, 95] },
  { id: 'oats', name: '燕麦', group: '农业', kind: 'raw', unit: '石', value: 24, icon: '🌾', climate: '寒带', biomes: { 亚寒带针叶林: 0.9, 温带落叶阔叶林: 0.7 }, h: [30, 90] },
  { id: 'millet', name: '粟', group: '农业', kind: 'raw', unit: '石', value: 22, icon: '🌾', climate: '干旱', biomes: { 草原: 1, 热带草原: 0.7, 热带沙漠: 0.5 }, h: [10, 80] },
  { id: 'rice', name: '稻米', group: '农业', kind: 'raw', unit: '石', value: 36, icon: '🍚', climate: '热带', biomes: { 湿地: 1.2, 热带季雨林: 0.7 }, river: 20 },
  { id: 'tuber', name: '块茎', group: '农业', kind: 'raw', unit: '石', value: 20, icon: '🍠', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.6 }, h: [10, 55] },
  { id: 'beans', name: '豆类', group: '农业', kind: 'raw', unit: '石', value: 26, icon: '🫘', climate: '温带', biomes: { 温带落叶阔叶林: 0.8, 亚热带常绿阔叶林带: 0.8, 草原: 0.9 } },
  { id: 'turnip', name: '芜菁', group: '农业', kind: 'raw', unit: '担', value: 18, icon: '🥕', climate: '寒带', biomes: { 亚寒带针叶林: 0.9, 苔原: 0.6 }, h: [30, 90] },
  { id: 'cabbage', name: '甘蓝', group: '农业', kind: 'raw', unit: '担', value: 22, icon: '🥬', climate: '温带', biomes: { 温带落叶阔叶林: 0.9, 亚寒带针叶林: 0.6 }, h: [20, 75] },

  // —— 地中海 ——
  { id: 'olive', name: '橄榄', group: '农业', kind: 'raw', unit: '石', value: 46, icon: '🫒', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1.2 }, h: [15, 45], coast: 25 },
  { id: 'grape', name: '葡萄', group: '农业', kind: 'raw', unit: '石', value: 44, icon: '🍇', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1.1, 温带落叶阔叶林: 0.7 }, h: [15, 55] },
  { id: 'fig', name: '无花果', group: '农业', kind: 'raw', unit: '担', value: 38, icon: '🫐', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1 }, h: [10, 45] },
  { id: 'cork', name: '软木', group: '林业', kind: 'raw', unit: '方', value: 70, icon: '🪵', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1 }, h: [15, 45] },
  { id: 'bay', name: '月桂', group: '特产', kind: 'raw', unit: '担', value: 120, icon: '🌿', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1 }, h: [10, 40] },

  // —— 纤维与染料 ——
  { id: 'flax', name: '亚麻', group: '农业', kind: 'raw', unit: '捆', value: 52, icon: '🌾', climate: '温带', biomes: { 温带落叶阔叶林: 0.8, 亚寒带针叶林: 0.8 }, h: [20, 65] },
  { id: 'hemp', name: '大麻', group: '农业', kind: 'raw', unit: '捆', value: 46, icon: '🌿', climate: '温带', biomes: { 温带落叶阔叶林: 0.7, 草原: 0.6 }, h: [15, 70] },
  { id: 'wool', name: '羊毛', group: '畜牧', kind: 'raw', unit: '捆', value: 48, icon: '🧶', climate: '温带', biomes: { 草原: 1, 苔原: 0.9, 寒漠: 0.7 } },
  { id: 'nettle', name: '荨麻', group: '林业', kind: 'raw', unit: '捆', value: 30, icon: '🌿', climate: '通用', biomes: { 温带落叶阔叶林: 0.7, 草原: 0.6, 湿地: 0.5 } },
  { id: 'madder', name: '茜草', group: '特产', kind: 'raw', unit: '担', value: 90, icon: '🔴', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 0.8, 温带落叶阔叶林: 0.5 } },
  { id: 'woad', name: '菘蓝', group: '特产', kind: 'raw', unit: '担', value: 110, icon: '🔵', climate: '温带', biomes: { 温带落叶阔叶林: 0.8, 草原: 0.5 } },
  { id: 'ochre', name: '赭石', group: '矿产', kind: 'raw', unit: '担', value: 60, icon: '🟤', climate: '通用', h: [20, 100] },

  // —— 畜牧 ——
  { id: 'cattle', name: '牛', group: '畜牧', kind: 'raw', unit: '头', value: 320, icon: '🐄', climate: '温带', biomes: { 草原: 1, 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.7 }, h: [15, 70] },
  { id: 'sheep', name: '羊', group: '畜牧', kind: 'raw', unit: '头', value: 130, icon: '🐑', climate: '温带', biomes: { 草原: 1, 寒漠: 0.8, 苔原: 0.7, 亚寒带针叶林: 0.5 }, h: [20, 95] },
  { id: 'goat', name: '山羊', group: '畜牧', kind: 'raw', unit: '头', value: 110, icon: '🐐', climate: '干旱', biomes: { 热带沙漠: 0.8, 草原: 0.7 }, h: [10, 90] },
  { id: 'pig', name: '猪', group: '畜牧', kind: 'raw', unit: '头', value: 160, icon: '🐖', climate: '温带', biomes: { 温带落叶阔叶林: 0.9, 亚热带常绿阔叶林带: 0.8, 湿地: 0.6 } },
  { id: 'horse', name: '马', group: '畜牧', kind: 'raw', unit: '匹', value: 620, icon: '🐎', climate: '温带', biomes: { 草原: 1, 温带落叶阔叶林: 0.6 }, h: [15, 65] },
  { id: 'hide', name: '生皮', group: '畜牧', kind: 'raw', unit: '张', value: 60, icon: '🟫', climate: '通用', biomes: { 草原: 0.7, 温带落叶阔叶林: 0.6 } },
  { id: 'antler', name: '兽角', group: '畜牧', kind: 'raw', unit: '件', value: 55, icon: '🦌', climate: '寒带', biomes: { 亚寒带针叶林: 0.9, 苔原: 0.8 } },
  { id: 'sinew', name: '兽筋', group: '畜牧', kind: 'raw', unit: '捆', value: 70, icon: '🧵', climate: '通用', biomes: { 草原: 0.7, 亚寒带针叶林: 0.6 } },
  { id: 'bone', name: '骨料', group: '畜牧', kind: 'raw', unit: '担', value: 34, icon: '🦴', climate: '通用', biomes: { 草原: 0.6, 寒漠: 0.8, 苔原: 0.7 } },
  { id: 'manure', name: '厩肥', group: '畜牧', kind: 'raw', unit: '担', value: 16, icon: '💩', climate: '通用', biomes: { 草原: 0.8, 温带落叶阔叶林: 0.6 } },

  // —— 渔猎 ——
  { id: 'seafish', name: '海鱼', group: '渔猎', kind: 'raw', unit: '担', value: 110, icon: '🐟', climate: '海洋', coast: 35 },
  { id: 'riverfish', name: '淡水鱼', group: '渔猎', kind: 'raw', unit: '担', value: 90, icon: '🎣', climate: '通用', river: 35 },
  { id: 'shellfish', name: '贝类', group: '渔猎', kind: 'raw', unit: '担', value: 80, icon: '🦪', climate: '海洋', coast: 30 },
  { id: 'seaweed', name: '海藻', group: '渔猎', kind: 'raw', unit: '担', value: 40, icon: '🌿', climate: '海洋', coast: 30 },
  { id: 'game', name: '野味', group: '渔猎', kind: 'raw', unit: '担', value: 95, icon: '🦌', climate: '通用', biomes: { 亚寒带针叶林: 0.9, 温带落叶阔叶林: 0.7, 苔原: 0.6 } },
  { id: 'salmon', name: '鲑鱼', group: '渔猎', kind: 'raw', unit: '担', value: 120, icon: '🐟', climate: '寒带', river: 40, h: [25, 90] },
  { id: 'whale', name: '鲸脂', group: '渔猎', kind: 'raw', unit: '桶', value: 280, icon: '🐋', climate: '海洋', coast: 50, h: [-10, 25] },
  { id: 'shell', name: '贝壳', group: '渔猎', kind: 'raw', unit: '担', value: 45, icon: '🐚', climate: '海洋', coast: 25 },

  // —— 林业 ——
  { id: 'timber', name: '木材', group: '林业', kind: 'raw', unit: '方', value: 45, icon: '🪵', climate: '温带', biomes: { 温带落叶阔叶林: 1, 亚寒带针叶林: 1, 亚热带常绿阔叶林带: 0.9, 热带季雨林: 0.8 } },
  { id: 'hardwood', name: '硬木', group: '林业', kind: 'raw', unit: '方', value: 110, icon: '🌳', climate: '热带', biomes: { 热带雨林: 1.1, 热带季雨林: 0.8 } },
  { id: 'birch', name: '桦木', group: '林业', kind: 'raw', unit: '方', value: 52, icon: '🌳', climate: '寒带', biomes: { 亚寒带针叶林: 0.8, 温带落叶阔叶林: 0.5 } },
  { id: 'bamboo', name: '竹材', group: '林业', kind: 'raw', unit: '方', value: 50, icon: '🎋', climate: '热带', biomes: { 亚热带常绿阔叶林带: 0.9, 热带季雨林: 0.8 } },
  { id: 'resin', name: '树脂', group: '林业', kind: 'raw', unit: '桶', value: 68, icon: '🌲', climate: '寒带', biomes: { 亚寒带针叶林: 1.1 } },
  { id: 'bark', name: '树皮', group: '林业', kind: 'raw', unit: '担', value: 24, icon: '🪵', climate: '通用', biomes: { 亚寒带针叶林: 0.9, 温带落叶阔叶林: 0.8 } },
  { id: 'herb', name: '药材', group: '林业', kind: 'raw', unit: '担', value: 150, icon: '🌿', climate: '通用', biomes: { 热带雨林: 1, 亚热带常绿阔叶林带: 0.8, 湿地: 0.7 } },
  { id: 'lacquer', name: '生漆', group: '林业', kind: 'raw', unit: '桶', value: 140, icon: '🪣', climate: '温带', biomes: { 亚热带常绿阔叶林带: 0.9, 温带落叶阔叶林: 0.6 } },
  { id: 'charcoal', name: '木炭', group: '林业', kind: 'processed', unit: '担', value: 60, icon: '⬛', recipe: { 木材: 1.4 } },
  { id: 'tar', name: '焦油', group: '林业', kind: 'processed', unit: '桶', value: 95, icon: '🛢️', recipe: { 木材: 1.2 } },

  // —— 矿产 ——
  { id: 'stone', name: '石料', group: '矿产', kind: 'raw', unit: '方', value: 32, icon: '🪨', climate: '通用', h: [20, 100] },
  { id: 'flint', name: '燧石', group: '矿产', kind: 'raw', unit: '担', value: 40, icon: '🔪', climate: '通用', h: [20, 100] },
  { id: 'clay', name: '黏土', group: '矿产', kind: 'raw', unit: '方', value: 24, icon: '🧱', climate: '通用', river: 20, biomes: { 湿地: 0.8, 草原: 0.6 } },
  { id: 'sand', name: '砂', group: '矿产', kind: 'raw', unit: '方', value: 14, icon: '⏳', climate: '通用', coast: 25, biomes: { 热带沙漠: 0.8 } },
  { id: 'salt', name: '盐', group: '矿产', kind: 'raw', unit: '斗', value: 95, icon: '🧂', climate: '通用', coast: 20 },
  { id: 'natron', name: '泡碱', group: '矿产', kind: 'raw', unit: '担', value: 90, icon: '🧂', climate: '干旱', biomes: { 热带沙漠: 1, 湿地: 0.4 } },
  { id: 'peat', name: '泥炭', group: '矿产', kind: 'raw', unit: '担', value: 30, icon: '🪨', climate: '寒带', biomes: { 苔原: 1, 湿地: 0.8 }, h: [30, 95] },
  { id: 'copper', name: '铜', group: '矿产', kind: 'raw', unit: '石', value: 130, icon: '🟠', climate: '通用', h: [30, 95] },
  { id: 'tin', name: '锡', group: '矿产', kind: 'raw', unit: '石', value: 190, icon: '⚪', climate: '通用', h: [45, 100] },
  { id: 'iron', name: '铁', group: '矿产', kind: 'raw', unit: '石', value: 150, icon: '⛓️', climate: '通用', h: [35, 100] },
  { id: 'gold', name: '金', group: '矿产', kind: 'raw', unit: '两', value: 4200, icon: '🟡', climate: '通用', h: [40, 100] },
  { id: 'silver', name: '银', group: '矿产', kind: 'raw', unit: '两', value: 800, icon: '⚪', climate: '通用', h: [35, 100] },
  { id: 'sulphur', name: '硫磺', group: '矿产', kind: 'raw', unit: '担', value: 130, icon: '🟨', climate: '干旱', h: [50, 100], biomes: { 寒漠: 0.8, 热带沙漠: 1 } },
  { id: 'jade', name: '玉石', group: '矿产', kind: 'raw', unit: '件', value: 1200, icon: '🟢', climate: '高山', h: [40, 100], biomes: { 亚热带常绿阔叶林带: 0.7 } },
  { id: 'obsidian', name: '黑曜石', group: '矿产', kind: 'raw', unit: '块', value: 60, icon: '⬛', climate: '高山', h: [50, 100] },
  { id: 'amber', name: '琥珀', group: '矿产', kind: 'raw', unit: '两', value: 600, icon: '🟠', climate: '寒带', coast: 45, h: [30, 80] },

  // —— 特产 ——
  { id: 'honey', name: '蜂蜜', group: '特产', kind: 'raw', unit: '罐', value: 70, icon: '🍯', climate: '通用', biomes: { 温带落叶阔叶林: 0.8, 草原: 0.7, 亚热带常绿阔叶林带: 0.8 } },
  { id: 'wax', name: '蜂蜡', group: '特产', kind: 'raw', unit: '担', value: 90, icon: '🕯️', climate: '通用', biomes: { 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.7 } },
  { id: 'date', name: '椰枣', group: '农业', kind: 'raw', unit: '担', value: 40, icon: '🌴', climate: '干旱', biomes: { 热带沙漠: 1.2, 热带草原: 0.5 }, h: [10, 55] },
  { id: 'saffron', name: '藏红花', group: '特产', kind: 'raw', unit: '两', value: 900, icon: '🌺', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 0.8 }, h: [20, 60] },
  { id: 'pepper', name: '胡椒', group: '特产', kind: 'raw', unit: '担', value: 260, icon: '🌶️', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.9 } },
  { id: 'spice', name: '香料', group: '特产', kind: 'raw', unit: '担', value: 220, icon: '🧂', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.9 } },
  { id: 'feather', name: '羽毛', group: '特产', kind: 'raw', unit: '束', value: 300, icon: '🪶', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.7 } },
  { id: 'fur', name: '毛皮', group: '畜牧', kind: 'raw', unit: '张', value: 200, icon: '🦊', climate: '寒带', biomes: { 亚寒带针叶林: 1, 苔原: 1, 寒漠: 0.8 }, h: [40, 100] },
  { id: 'ivory', name: '象牙', group: '特产', kind: 'raw', unit: '件', value: 800, icon: '🦣', climate: '干旱', biomes: { 热带草原: 0.9, 热带沙漠: 0.4 } },

  // —— 加工品 ——
  { id: 'flour', name: '面粉', group: '加工品', kind: 'processed', unit: '石', value: 55, icon: '🌾', recipe: { 小麦: 1.3 } },
  { id: 'bread', name: '面包', group: '加工品', kind: 'processed', unit: '担', value: 90, icon: '🍞', recipe: { 面粉: 0.9 } },
  { id: 'beer', name: '啤酒', group: '加工品', kind: 'processed', unit: '桶', value: 85, icon: '🍺', recipe: { 大麦: 1.2 } },
  { id: 'wine', name: '葡萄酒', group: '加工品', kind: 'processed', unit: '桶', value: 140, icon: '🍷', recipe: { 葡萄: 1.4 } },
  { id: 'oliveoil', name: '橄榄油', group: '加工品', kind: 'processed', unit: '罐', value: 180, icon: '🫗', recipe: { 橄榄: 1.2 } },
  { id: 'cheese', name: '奶酪', group: '加工品', kind: 'processed', unit: '担', value: 150, icon: '🧀', recipe: { 牛: 0.3, 羊: 0.5 } },
  { id: 'saltedfish', name: '腌鱼', group: '加工品', kind: 'processed', unit: '担', value: 160, icon: '🐠', recipe: { 海鱼: 1, 盐: 0.3 } },
  { id: 'cloth', name: '布匹', group: '加工品', kind: 'processed', unit: '匹', value: 240, icon: '🧵', recipe: { 亚麻: 1.2, 羊毛: 0.6 } },
  { id: 'felt', name: '毛毡', group: '加工品', kind: 'processed', unit: '匹', value: 200, icon: '🧶', recipe: { 羊毛: 1.4 } },
  { id: 'leather', name: '皮革', group: '加工品', kind: 'processed', unit: '张', value: 110, icon: '🟫', recipe: { 生皮: 1.2 } },
  { id: 'pottery', name: '陶器', group: '加工品', kind: 'processed', unit: '件', value: 70, icon: '🏺', recipe: { 黏土: 1 } },
  { id: 'brick', name: '砖坯', group: '加工品', kind: 'processed', unit: '方', value: 60, icon: '🧱', recipe: { 黏土: 1.4, 木材: 0.3 } },
  { id: 'rope', name: '绳索', group: '加工品', kind: 'processed', unit: '捆', value: 95, icon: '🪢', recipe: { 大麻: 1.2 } },
  { id: 'stone_tool', name: '石器', group: '加工品', kind: 'processed', unit: '件', value: 80, icon: '🪓', recipe: { 燧石: 1, 木材: 0.3 } },
  { id: 'bone_tool', name: '骨器', group: '加工品', kind: 'processed', unit: '件', value: 70, icon: '🦴', recipe: { 骨料: 1, 燧石: 0.3 } },
  { id: 'bronze', name: '青铜', group: '加工品', kind: 'processed', unit: '石', value: 420, icon: '🥉', metal: 'bronze', recipe: { 铜: 0.85, 锡: 0.15 } },
  { id: 'bronze_tool', name: '青铜器', group: '加工品', kind: 'processed', unit: '件', value: 520, icon: '🪓', metal: 'bronze', recipe: { 青铜: 0.9 } },
  { id: 'iron_tool', name: '铁器', group: '加工品', kind: 'processed', unit: '件', value: 620, icon: '🔨', metal: 'iron', recipe: { 铁: 0.8, 木炭: 0.4 } },
  { id: 'weapon', name: '兵器', group: '加工品', kind: 'processed', unit: '件', value: 680, icon: '⚔️', metal: 'any', recipe: { 铁: 0.6, 青铜: 0.5, 皮革: 0.3 } }
]

// ================= 季节 =================
export const SEASON_LABEL = { spring: '春', summer: '夏', autumn: '秋', winter: '冬', year: '常年' }
export const SEASON_HINT = { spring: '春季一收', summer: '夏季一收', autumn: '秋季一收', winter: '冬季采收', year: '全年可得' }

const SEASON_BY_ID = {
  wheat: 'summer', barley: 'summer', oats: 'summer', rye: 'summer',
  flax: 'summer', hemp: 'summer', hop: 'autumn',
  maize: 'autumn', rice: 'autumn', millet: 'autumn', tuber: 'autumn', beans: 'autumn',
  olive: 'autumn', grape: 'autumn', fig: 'autumn', date: 'autumn',
  saffron: 'autumn', pepper: 'autumn', spice: 'autumn', madder: 'autumn', woad: 'summer',
  timber: 'winter', hardwood: 'winter', birch: 'winter', bamboo: 'winter', cork: 'summer',
  resin: 'spring', herb: 'spring', lacquer: 'summer', bark: 'winter',
  seafish: 'spring', riverfish: 'spring', salmon: 'autumn', shellfish: 'winter', seaweed: 'spring',
  whale: 'summer', wool: 'spring', honey: 'autumn', wax: 'autumn', salt: 'summer', peat: 'summer'
}

const DEFAULT_SEASON = { 农业: 'autumn', 畜牧: 'year', 渔猎: 'year', 林业: 'winter', 矿产: 'year', 特产: 'autumn', 加工品: 'year' }
for (const r of RESOURCES) {
  if (!r.season) r.season = SEASON_BY_ID[r.id] || DEFAULT_SEASON[r.group] || 'year'
}

export const RAW_RESOURCES = RESOURCES.filter((r) => r.kind === 'raw')
export const PROCESSED_RESOURCES = RESOURCES.filter((r) => r.kind === 'processed')

export const OUTPUT_CATEGORY = {
  metal: ['iron_tool', 'weapon'],
  iron: ['iron_tool', 'weapon'],
  bronze: ['bronze', 'bronze_tool'],
  stone: ['stone_tool', 'bone_tool'],
  textile: ['cloth', 'felt'],
  ceramic: ['pottery', 'brick'],
  wares: ['leather', 'rope', 'weapon'],
  luxury: ['wine', 'oliveoil'],
  drink: ['beer', 'wine'],
  food: ['bread', 'cheese', 'saltedfish', 'flour']
}

/** 所有国家保底拥有的基础物料 */
export const BASE_RESOURCES = ['timber', 'stone', 'clay', 'flint', 'salt', 'herb', 'hide', 'bone']

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

/** 金属矿：只要地理评分达标就强制入选，保证「有矿才有金属」 */
const ORE_IDS = ['iron', 'copper', 'tin']

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

/** 保底基础物料 + 主粮 + 地理特产 */
export function deriveSpecialties(geo, opts = {}) {
  if (!geo) return []
  const max = opts.max || 16
  const ratio = opts.ratio ?? 0.5

  const byId = new Map(RAW_RESOURCES.map((r) => [r.id, r]))
  const picked = []
  const seen = new Set()

  // 1) 保底：石头、木头、黏土、燧石等
  for (const id of BASE_RESOURCES) {
    const r = byId.get(id)
    if (!r) continue
    picked.push({ ...r, score: 1, baseline: true })
    seen.add(id)
  }

  // 2) 保底主粮：按气候挑一种
  const grains = ['wheat', 'barley', 'rye', 'oats', 'millet', 'rice', 'tuber', 'turnip']
  const bestGrain = grains
    .map((id) => ({ id, score: scoreResource(byId.get(id), geo) }))
    .sort((a, b) => b.score - a.score)[0]
  if (bestGrain && !seen.has(bestGrain.id)) {
    picked.push({ ...byId.get(bestGrain.id), score: Math.max(1, bestGrain.score), baseline: true })
    seen.add(bestGrain.id)
  }

  // 3) 地理推导
  const scored = RAW_RESOURCES.map((r) => ({ r, score: Math.round(scoreResource(r, geo) * 100) / 100 }))
    .filter((x) => x.score > 0 && !seen.has(x.r.id))
    .sort((a, b) => b.score - a.score)

  const top = scored[0]?.score || 1

  // 金属矿优先：地理条件达标即入选（有山就有矿）
  for (const id of ORE_IDS) {
    const entry = scored.find((x) => x.r.id === id)
    if (entry && entry.score >= 2.0 && !seen.has(id)) {
      picked.push({ ...entry.r, score: entry.score })
      seen.add(id)
    }
  }

  const cut = top * ratio
  for (const x of scored) {
    if (picked.length >= max) break
    if (x.score < cut) break
    picked.push({ ...x.r, score: x.score })
    seen.add(x.r.id)
  }

  return picked
}

/** 该经济体的金属可得性 */
export function metalAccess(specIds) {
  const has = (id) => specIds.has(id)
  if (has('iron')) return 'iron'
  if (has('copper') && has('tin')) return 'bronze'
  if (has('copper') || has('tin')) return 'copper'
  return 'none'
}

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
