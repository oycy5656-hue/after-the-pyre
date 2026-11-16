// 物产目录 v4：按气候带扩充（温带 / 地中海 / 干旱 / 热带 / 寒带 / 高山 / 海洋）
// kind: raw 原料 / processed 加工品
// climate / icon：界面分组与图标

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
  // —— 谷类 ——
  { id: 'wheat', name: '小麦', group: '农业', kind: 'raw', unit: '石', value: 34, icon: '🌾', climate: '温带', biomes: { 温带落叶阔叶林: 1, 草原: 1, 亚热带常绿阔叶林带: 0.7 }, h: [20, 75] },
  { id: 'barley', name: '大麦', group: '农业', kind: 'raw', unit: '石', value: 28, icon: '🌾', climate: '温带', biomes: { 草原: 1, 寒漠: 0.6, 温带落叶阔叶林: 0.8 }, h: [20, 90] },
  { id: 'rye', name: '黑麦', group: '农业', kind: 'raw', unit: '石', value: 26, icon: '🌾', climate: '寒带', biomes: { 亚寒带针叶林: 1, 苔原: 0.7, 温带落叶阔叶林: 0.6 }, h: [30, 95] },
  { id: 'oats', name: '燕麦', group: '农业', kind: 'raw', unit: '石', value: 24, icon: '🌾', climate: '寒带', biomes: { 亚寒带针叶林: 0.9, 温带落叶阔叶林: 0.7 }, h: [30, 90] },
  { id: 'maize', name: '玉米', group: '农业', kind: 'raw', unit: '石', value: 30, icon: '🌽', climate: '热带', biomes: { 热带季雨林: 1, 热带草原: 1, 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.8 }, h: [10, 70] },
  { id: 'rice', name: '稻米', group: '农业', kind: 'raw', unit: '石', value: 36, icon: '🍚', climate: '热带', biomes: { 湿地: 1.2, 热带季雨林: 0.7, 热带雨林: 0.6 }, river: 20 },
  { id: 'millet', name: '粟', group: '农业', kind: 'raw', unit: '石', value: 22, icon: '🌾', climate: '干旱', biomes: { 草原: 1, 热带草原: 0.7, 热带沙漠: 0.5 }, h: [10, 80] },
  { id: 'tuber', name: '薯蓣', group: '农业', kind: 'raw', unit: '石', value: 20, icon: '🍠', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.6 }, h: [10, 55] },
  { id: 'beans', name: '豆类', group: '农业', kind: 'raw', unit: '石', value: 26, icon: '🫘', climate: '温带', biomes: { 温带落叶阔叶林: 0.8, 亚热带常绿阔叶林带: 0.8, 草原: 0.9 } },

  // —— 地中海 ——
  { id: 'olive', name: '橄榄', group: '农业', kind: 'raw', unit: '石', value: 46, icon: '🫒', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1.2 }, h: [15, 45], coast: 25 },
  { id: 'grape', name: '葡萄', group: '农业', kind: 'raw', unit: '石', value: 44, icon: '🍇', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1.1, 温带落叶阔叶林: 0.7 }, h: [15, 55] },
  { id: 'fig', name: '无花果', group: '农业', kind: 'raw', unit: '担', value: 38, icon: '🫐', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1 }, h: [10, 45] },
  { id: 'citrus', name: '柑橘', group: '农业', kind: 'raw', unit: '担', value: 42, icon: '🍊', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1, 热带季雨林: 0.5 }, h: [10, 40] },
  { id: 'cork', name: '软木', group: '林业', kind: 'raw', unit: '方', value: 70, icon: '🪵', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1 }, h: [15, 45] },
  { id: 'bay', name: '月桂', group: '特产', kind: 'raw', unit: '担', value: 120, icon: '🌿', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 1 }, h: [10, 40] },
  { id: 'saffron', name: '藏红花', group: '特产', kind: 'raw', unit: '两', value: 900, icon: '🌺', climate: '地中海', biomes: { 亚热带常绿阔叶林带: 0.8, 草原: 0.5 }, h: [20, 60] },
  { id: 'oliveoil', name: '橄榄油', group: '加工品', kind: 'processed', unit: '罐', value: 180, icon: '🫗', recipe: { 橄榄: 1.2 } },

  // —— 温带果蔬 ——
  { id: 'apple', name: '苹果', group: '农业', kind: 'raw', unit: '担', value: 34, icon: '🍎', climate: '温带', biomes: { 温带落叶阔叶林: 1 }, h: [20, 70] },
  { id: 'pear', name: '梨', group: '农业', kind: 'raw', unit: '担', value: 32, icon: '🍐', climate: '温带', biomes: { 温带落叶阔叶林: 0.9 }, h: [20, 70] },
  { id: 'hop', name: '啤酒花', group: '农业', kind: 'raw', unit: '担', value: 58, icon: '🌱', climate: '温带', biomes: { 温带落叶阔叶林: 1 }, h: [25, 65] },
  { id: 'cabbage', name: '甘蓝', group: '农业', kind: 'raw', unit: '担', value: 22, icon: '🥬', climate: '温带', biomes: { 温带落叶阔叶林: 0.9, 亚寒带针叶林: 0.6 }, h: [20, 75] },
  { id: 'turnip', name: '芜菁', group: '农业', kind: 'raw', unit: '担', value: 18, icon: '🥕', climate: '寒带', biomes: { 亚寒带针叶林: 0.9, 苔原: 0.6 }, h: [30, 90] },
  { id: 'flax', name: '亚麻', group: '农业', kind: 'raw', unit: '捆', value: 52, icon: '🌾', climate: '温带', biomes: { 温带落叶阔叶林: 0.8, 亚寒带针叶林: 0.8 }, h: [20, 65] },
  { id: 'hemp', name: '大麻', group: '农业', kind: 'raw', unit: '捆', value: 46, icon: '🌿', climate: '温带', biomes: { 温带落叶阔叶林: 0.7, 草原: 0.6 }, h: [15, 70] },
  { id: 'cotton', name: '棉花', group: '农业', kind: 'raw', unit: '捆', value: 62, icon: '☁️', climate: '干旱', biomes: { 热带草原: 1, 亚热带常绿阔叶林带: 0.7, 湿地: 0.5 }, h: [10, 50] },
  { id: 'sugarcane', name: '甘蔗', group: '农业', kind: 'raw', unit: '捆', value: 22, icon: '🎍', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.9 }, river: 20 },
  { id: 'oilseed', name: '油料', group: '农业', kind: 'raw', unit: '石', value: 42, icon: '🌻', climate: '温带', biomes: { 草原: 0.9, 温带落叶阔叶林: 0.7, 热带草原: 0.7 } },

  // —— 热带作物 ——
  { id: 'banana', name: '香蕉', group: '农业', kind: 'raw', unit: '担', value: 28, icon: '🍌', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.8 } },
  { id: 'coconut', name: '椰子', group: '农业', kind: 'raw', unit: '担', value: 30, icon: '🥥', climate: '热带', biomes: { 热带雨林: 1 }, coast: 20 },
  { id: 'cocoa', name: '可可', group: '农业', kind: 'raw', unit: '担', value: 190, icon: '🍫', climate: '热带', biomes: { 热带雨林: 1.1 } },
  { id: 'coffee', name: '咖啡', group: '农业', kind: 'raw', unit: '担', value: 210, icon: '☕', climate: '热带', biomes: { 热带雨林: 0.9, 热带季雨林: 0.7 }, h: [10, 55] },
  { id: 'pepper', name: '胡椒', group: '特产', kind: 'raw', unit: '担', value: 260, icon: '🌶️', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.9 } },
  { id: 'cinnamon', name: '肉桂', group: '特产', kind: 'raw', unit: '担', value: 240, icon: '🪵', climate: '热带', biomes: { 热带雨林: 0.9, 热带季雨林: 0.8 } },
  { id: 'clove', name: '丁香', group: '特产', kind: 'raw', unit: '担', value: 300, icon: '🌰', climate: '热带', biomes: { 热带雨林: 0.9 } },
  { id: 'ginger', name: '姜', group: '特产', kind: 'raw', unit: '担', value: 130, icon: '🫚', climate: '热带', biomes: { 热带季雨林: 0.8, 亚热带常绿阔叶林带: 0.7 } },
  { id: 'rubber', name: '橡胶', group: '林业', kind: 'raw', unit: '桶', value: 160, icon: '🛢️', climate: '热带', biomes: { 热带雨林: 0.9 } },
  { id: 'palm', name: '棕榈油', group: '加工品', kind: 'processed', unit: '桶', value: 150, icon: '🫗', recipe: { 椰子: 1.4 } },
  { id: 'spice', name: '香料', group: '特产', kind: 'raw', unit: '担', value: 220, icon: '🧂', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.9 } },
  { id: 'dye', name: '染料', group: '特产', kind: 'raw', unit: '桶', value: 180, icon: '🎨', climate: '热带', biomes: { 热带季雨林: 0.9, 亚热带常绿阔叶林带: 0.6, 湿地: 0.6 } },
  { id: 'silk', name: '蚕丝', group: '特产', kind: 'raw', unit: '匹', value: 260, icon: '🧵', climate: '温带', biomes: { 温带落叶阔叶林: 0.9, 亚热带常绿阔叶林带: 0.9 }, river: 25 },
  { id: 'honey', name: '蜂蜜', group: '特产', kind: 'raw', unit: '罐', value: 70, icon: '🍯', climate: '通用', biomes: { 温带落叶阔叶林: 0.8, 草原: 0.7, 亚热带常绿阔叶林带: 0.8 } },
  { id: 'wax', name: '蜂蜡', group: '特产', kind: 'raw', unit: '担', value: 90, icon: '🕯️', climate: '通用', biomes: { 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.7 } },
  { id: 'feather', name: '羽毛', group: '特产', kind: 'raw', unit: '束', value: 300, icon: '🪶', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.7 } },

  // —— 干旱 ——
  { id: 'date', name: '椰枣', group: '农业', kind: 'raw', unit: '担', value: 40, icon: '🌴', climate: '干旱', biomes: { 热带沙漠: 1.2, 热带草原: 0.5 }, h: [10, 55] },
  { id: 'myrrh', name: '没药', group: '特产', kind: 'raw', unit: '两', value: 700, icon: '🪔', climate: '干旱', biomes: { 热带沙漠: 0.9, 热带草原: 0.6 } },
  { id: 'frankincense', name: '乳香', group: '特产', kind: 'raw', unit: '两', value: 800, icon: '🌫️', climate: '干旱', biomes: { 热带沙漠: 0.9 } },
  { id: 'indigo', name: '靛蓝', group: '特产', kind: 'raw', unit: '桶', value: 170, icon: '💙', climate: '干旱', biomes: { 热带草原: 0.8, 热带季雨林: 0.6 } },
  { id: 'natron', name: '泡碱', group: '矿产', kind: 'raw', unit: '担', value: 90, icon: '🧂', climate: '干旱', biomes: { 热带沙漠: 1, 湿地: 0.4 } },
  { id: 'camel', name: '骆驼', group: '畜牧', kind: 'raw', unit: '峰', value: 480, icon: '🐫', climate: '干旱', biomes: { 热带沙漠: 1, 热带草原: 0.7, 草原: 0.4 } },
  { id: 'goat', name: '山羊', group: '畜牧', kind: 'raw', unit: '头', value: 110, icon: '🐐', climate: '干旱', biomes: { 热带沙漠: 0.8, 草原: 0.7 } },

  // —— 寒带 ——
  { id: 'fur', name: '毛皮', group: '畜牧', kind: 'raw', unit: '张', value: 200, icon: '🦊', climate: '寒带', biomes: { 亚寒带针叶林: 1, 苔原: 1, 寒漠: 0.8 }, h: [40, 100] },
  { id: 'amber', name: '琥珀', group: '矿产', kind: 'raw', unit: '两', value: 600, icon: '🟠', climate: '寒带', coast: 45, h: [30, 80] },
  { id: 'salmon', name: '鲑鱼', group: '渔猎', kind: 'raw', unit: '担', value: 120, icon: '🐟', climate: '寒带', river: 40, h: [25, 90] },
  { id: 'blubber', name: '海兽脂', group: '渔猎', kind: 'raw', unit: '桶', value: 280, icon: '🛢️', climate: '寒带', coast: 50, h: [-10, 25] },
  { id: 'peat', name: '泥炭', group: '矿产', kind: 'raw', unit: '担', value: 30, icon: '🪨', climate: '寒带', biomes: { 苔原: 1, 湿地: 0.8 }, h: [30, 95] },
  { id: 'pine', name: '松脂', group: '林业', kind: 'raw', unit: '桶', value: 68, icon: '🌲', climate: '寒带', biomes: { 亚寒带针叶林: 1.1 } },
  { id: 'birch', name: '桦木', group: '林业', kind: 'raw', unit: '方', value: 52, icon: '🌳', climate: '寒带', biomes: { 亚寒带针叶林: 0.8, 温带落叶阔叶林: 0.5 } },

  // —— 畜牧 ——
  { id: 'cattle', name: '牛', group: '畜牧', kind: 'raw', unit: '头', value: 320, icon: '🐄', climate: '温带', biomes: { 草原: 1, 温带落叶阔叶林: 0.7, 亚热带常绿阔叶林带: 0.7 }, h: [15, 70] },
  { id: 'sheep', name: '羊', group: '畜牧', kind: 'raw', unit: '头', value: 130, icon: '🐑', climate: '温带', biomes: { 草原: 1, 寒漠: 0.8, 苔原: 0.7, 亚寒带针叶林: 0.5 }, h: [20, 95] },
  { id: 'horse', name: '马', group: '畜牧', kind: 'raw', unit: '匹', value: 620, icon: '🐎', climate: '温带', biomes: { 草原: 1, 温带落叶阔叶林: 0.6 }, h: [15, 65] },
  { id: 'wool', name: '羊毛', group: '畜牧', kind: 'raw', unit: '捆', value: 48, icon: '🧶', climate: '温带', biomes: { 草原: 1, 苔原: 0.9, 寒漠: 0.7 } },
  { id: 'leather', name: '皮革', group: '畜牧', kind: 'processed', unit: '张', value: 110, icon: '🟫', recipe: { 牛: 0.5, 羊: 0.8 } },
  { id: 'bone', name: '骨料', group: '畜牧', kind: 'raw', unit: '担', value: 34, icon: '🦴', climate: '通用', biomes: { 草原: 0.6, 寒漠: 0.8, 苔原: 0.7 } },
  { id: 'cheese', name: '奶酪', group: '加工品', kind: 'processed', unit: '担', value: 150, icon: '🧀', recipe: { 牛: 0.3, 羊: 0.5 } },
  { id: 'butter', name: '黄油', group: '加工品', kind: 'processed', unit: '罐', value: 120, icon: '🧈', recipe: { 牛: 0.25 } },

  // —— 渔猎 ——
  { id: 'seafish', name: '海鱼', group: '渔猎', kind: 'raw', unit: '担', value: 110, icon: '🐟', climate: '海洋', coast: 35 },
  { id: 'riverfish', name: '淡水鱼', group: '渔猎', kind: 'raw', unit: '担', value: 90, icon: '🎣', climate: '通用', river: 35 },
  { id: 'shellfish', name: '贝类', group: '渔猎', kind: 'raw', unit: '担', value: 80, icon: '🦪', climate: '海洋', coast: 30 },
  { id: 'seaweed', name: '海藻', group: '渔猎', kind: 'raw', unit: '担', value: 40, icon: '🌿', climate: '海洋', coast: 30 },
  { id: 'pearl', name: '珍珠', group: '渔猎', kind: 'raw', unit: '颗', value: 900, icon: '⚪', climate: '海洋', coast: 45, biomes: { 热带季雨林: 0.8, 热带雨林: 0.8, 亚热带常绿阔叶林带: 0.6 } },
  { id: 'coral', name: '珊瑚', group: '渔猎', kind: 'raw', unit: '担', value: 260, icon: '🪸', climate: '海洋', coast: 50, biomes: { 热带雨林: 0.9, 热带季雨林: 0.8 } },
  { id: 'sponge', name: '海绵', group: '渔猎', kind: 'raw', unit: '担', value: 140, icon: '🧽', climate: '海洋', coast: 40 },
  { id: 'whaleoil', name: '鲸脂', group: '渔猎', kind: 'raw', unit: '桶', value: 300, icon: '🐋', climate: '海洋', coast: 55, h: [-20, 25] },
  { id: 'whalebone', name: '鲸骨', group: '渔猎', kind: 'raw', unit: '担', value: 160, icon: '🦴', climate: '海洋', coast: 50, h: [-20, 25] },
  { id: 'fishsauce', name: '鱼露', group: '加工品', kind: 'processed', unit: '罐', value: 130, icon: '🧴', recipe: { 海鱼: 1.1 } },
  { id: 'saltedfish', name: '腌鱼', group: '加工品', kind: 'processed', unit: '担', value: 160, icon: '🐠', recipe: { 海鱼: 1, 盐: 0.3 } },

  // —— 林业 ——
  { id: 'timber', name: '木材', group: '林业', kind: 'raw', unit: '方', value: 45, icon: '🪵', climate: '温带', biomes: { 温带落叶阔叶林: 1, 亚寒带针叶林: 1, 亚热带常绿阔叶林带: 0.9, 热带季雨林: 0.8 } },
  { id: 'hardwood', name: '硬木', group: '林业', kind: 'raw', unit: '方', value: 120, icon: '🌳', climate: '热带', biomes: { 热带雨林: 1.1, 热带季雨林: 0.8 } },
  { id: 'herb', name: '药材', group: '林业', kind: 'raw', unit: '担', value: 150, icon: '🌿', climate: '通用', biomes: { 热带雨林: 1, 亚热带常绿阔叶林带: 0.8, 湿地: 0.7 } },
  { id: 'bamboo', name: '竹材', group: '林业', kind: 'raw', unit: '方', value: 50, icon: '🎋', climate: '热带', biomes: { 亚热带常绿阔叶林带: 0.9, 热带季雨林: 0.8 } },
  { id: 'rattan', name: '藤条', group: '林业', kind: 'raw', unit: '捆', value: 40, icon: '🪢', climate: '热带', biomes: { 热带雨林: 1, 热带季雨林: 0.8 } },
  { id: 'lacquer', name: '生漆', group: '林业', kind: 'raw', unit: '桶', value: 140, icon: '🪣', climate: '温带', biomes: { 亚热带常绿阔叶林带: 0.9, 温带落叶阔叶林: 0.6 } },
  { id: 'charcoal', name: '木炭', group: '林业', kind: 'processed', unit: '担', value: 60, icon: '⬛', recipe: { 木材: 1.4 } },

  // —— 矿产 ——
  { id: 'stone', name: '石料', group: '矿产', kind: 'raw', unit: '方', value: 32, icon: '🪨', climate: '通用', h: [20, 100] },
  { id: 'marble', name: '大理石', group: '矿产', kind: 'raw', unit: '方', value: 160, icon: '⬜', climate: '高山', h: [30, 100], biomes: { 亚热带常绿阔叶林带: 0.5, 温带落叶阔叶林: 0.4 } },
  { id: 'granite', name: '花岗岩', group: '矿产', kind: 'raw', unit: '方', value: 90, icon: '⬛', climate: '高山', h: [40, 100] },
  { id: 'clay', name: '黏土', group: '矿产', kind: 'raw', unit: '方', value: 24, icon: '🧱', climate: '通用', river: 20, biomes: { 湿地: 0.8, 草原: 0.6 } },
  { id: 'coal', name: '煤', group: '矿产', kind: 'raw', unit: '担', value: 66, icon: '⚫', climate: '通用', h: [35, 100] },
  { id: 'iron', name: '铁', group: '矿产', kind: 'raw', unit: '石', value: 150, icon: '⛓️', climate: '通用', h: [35, 100] },
  { id: 'copper', name: '铜', group: '矿产', kind: 'raw', unit: '石', value: 130, icon: '🟠', climate: '通用', h: [30, 95] },
  { id: 'tin', name: '锡', group: '矿产', kind: 'raw', unit: '石', value: 190, icon: '⚪', climate: '通用', h: [45, 100] },
  { id: 'lead', name: '铅', group: '矿产', kind: 'raw', unit: '石', value: 100, icon: '⬛', climate: '通用', h: [35, 100] },
  { id: 'zinc', name: '锌', group: '矿产', kind: 'raw', unit: '石', value: 120, icon: '⚙️', climate: '通用', h: [40, 100] },
  { id: 'gold', name: '金', group: '矿产', kind: 'raw', unit: '两', value: 4200, icon: '🟡', climate: '通用', h: [40, 100] },
  { id: 'silver', name: '银', group: '矿产', kind: 'raw', unit: '两', value: 800, icon: '⚪', climate: '通用', h: [35, 100] },
  { id: 'mercury', name: '水银', group: '矿产', kind: 'raw', unit: '罐', value: 420, icon: '🌡️', climate: '通用', h: [50, 100] },
  { id: 'salt', name: '盐', group: '矿产', kind: 'raw', unit: '斗', value: 95, icon: '🧂', climate: '通用', coast: 20 },
  { id: 'sulphur', name: '硫磺', group: '矿产', kind: 'raw', unit: '担', value: 130, icon: '🟨', climate: '干旱', h: [50, 100], biomes: { 寒漠: 0.8, 热带沙漠: 1, 亚热带常绿阔叶林带: 0.4 } },
  { id: 'jade', name: '玉石', group: '矿产', kind: 'raw', unit: '件', value: 1200, icon: '🟢', climate: '高山', h: [40, 100], biomes: { 亚热带常绿阔叶林带: 0.7, 温带落叶阔叶林: 0.6 } },
  { id: 'obsidian', name: '黑曜石', group: '矿产', kind: 'raw', unit: '块', value: 60, icon: '⬛', climate: '高山', h: [50, 100] },
  { id: 'gem', name: '宝石', group: '矿产', kind: 'raw', unit: '件', value: 1600, icon: '💎', climate: '高山', h: [55, 100] },
  { id: 'lapis', name: '青金石', group: '矿产', kind: 'raw', unit: '两', value: 950, icon: '🔵', climate: '高山', h: [55, 100] },
  { id: 'crystal', name: '水晶', group: '矿产', kind: 'raw', unit: '件', value: 700, icon: '🔮', climate: '高山', h: [60, 100] },
  { id: 'bitumen', name: '沥青', group: '矿产', kind: 'raw', unit: '桶', value: 110, icon: '🛢️', climate: '干旱', biomes: { 热带沙漠: 0.8 }, h: [20, 70] },

  // —— 加工品 ——
  { id: 'flour', name: '面粉', group: '加工品', kind: 'processed', unit: '石', value: 55, icon: '🌾', recipe: { 小麦: 1.3 } },
  { id: 'bread', name: '面包', group: '加工品', kind: 'processed', unit: '担', value: 90, icon: '🍞', recipe: { 面粉: 0.9 } },
  { id: 'beer', name: '啤酒', group: '加工品', kind: 'processed', unit: '桶', value: 85, icon: '🍺', recipe: { 大麦: 1.2, 啤酒花: 0.2 } },
  { id: 'wine', name: '葡萄酒', group: '加工品', kind: 'processed', unit: '桶', value: 140, icon: '🍷', recipe: { 葡萄: 1.4 } },
  { id: 'cloth', name: '布匹', group: '加工品', kind: 'processed', unit: '匹', value: 240, icon: '🧵', recipe: { 棉花: 1.2, 亚麻: 0.6 } },
  { id: 'linen', name: '亚麻布', group: '加工品', kind: 'processed', unit: '匹', value: 200, icon: '🧶', recipe: { 亚麻: 1.5 } },
  { id: 'woolcloth', name: '毛呢', group: '加工品', kind: 'processed', unit: '匹', value: 260, icon: '🧥', recipe: { 羊毛: 1.4 } },
  { id: 'brick', name: '砖石', group: '加工品', kind: 'processed', unit: '方', value: 85, icon: '🧱', recipe: { 黏土: 1.4, 木材: 0.3 } },
  { id: 'glass', name: '玻璃', group: '加工品', kind: 'processed', unit: '件', value: 320, icon: '🪟', recipe: { 泡碱: 0.8, 石料: 0.6 } },
  { id: 'tools', name: '工具', group: '加工品', kind: 'processed', unit: '件', value: 420, icon: '🔨', recipe: { 铁: 0.8, 木炭: 0.4 } },
  { id: 'weapons', name: '兵器', group: '加工品', kind: 'processed', unit: '件', value: 860, icon: '⚔️', recipe: { 铁: 1.2, 木炭: 0.6, 皮革: 0.3 } },
  { id: 'pottery', name: '陶器', group: '加工品', kind: 'processed', unit: '件', value: 70, icon: '🏺', recipe: { 黏土: 1 } },
  { id: 'paper', name: '纸', group: '加工品', kind: 'processed', unit: '捆', value: 300, icon: '📜', recipe: { 竹材: 0.8, 木材: 0.6 } },
  { id: 'jewelry', name: '首饰', group: '加工品', kind: 'processed', unit: '件', value: 2600, icon: '💍', recipe: { 玉石: 0.6, 金: 0.3 } },
  { id: 'incense', name: '香膏', group: '加工品', kind: 'processed', unit: '罐', value: 520, icon: '🪔', recipe: { 香料: 0.7, 蜂蜡: 0.4 } },
  { id: 'perfume', name: '香水', group: '加工品', kind: 'processed', unit: '瓶', value: 680, icon: '🧴', recipe: { 月桂: 0.6, 橄榄油: 0.5 } },
  { id: 'cosmetic', name: '胭脂', group: '加工品', kind: 'processed', unit: '盒', value: 340, icon: '💄', recipe: { 藏红花: 0.2, 蜂蜡: 0.4 } },
  { id: 'rope', name: '绳索', group: '加工品', kind: 'processed', unit: '捆', value: 95, icon: '🪢', recipe: { 大麻: 1.2 } },
  { id: 'sailcloth', name: '帆布', group: '加工品', kind: 'processed', unit: '匹', value: 300, icon: '⛵', recipe: { 大麻: 1.4 } }
]


export const SEASON_LABEL = {
  spring: '春',
  summer: '夏',
  autumn: '秋',
  winter: '冬',
  year: '常年'
}

export const SEASON_HINT = {
  spring: '春季一收',
  summer: '夏季一收',
  autumn: '秋季一收',
  winter: '冬季采收',
  year: '全年可得'
}

/** 各物产的采收季（未列出的按类别默认） */
const SEASON_BY_ID = {
  // 春
  saffron: 'autumn', hop: 'autumn', olive: 'autumn', grape: 'autumn',
  // 夏
  wheat: 'summer', barley: 'summer', oats: 'summer', rye: 'summer',
  flax: 'summer', hemp: 'summer', cherry: 'summer',
  // 秋
  maize: 'autumn', rice: 'autumn', millet: 'autumn', tuber: 'autumn',
  beans: 'autumn', apple: 'autumn', pear: 'autumn', fig: 'autumn',
  citrus: 'winter', date: 'autumn', banana: 'year', coconut: 'year',
  cocoa: 'autumn', coffee: 'autumn', pepper: 'autumn', cinnamon: 'autumn',
  clove: 'autumn', ginger: 'autumn', cotton: 'autumn', sugarcane: 'winter',
  // 林业
  timber: 'winter', hardwood: 'winter', birch: 'winter', bamboo: 'winter',
  cork: 'summer', pine: 'spring', lacquer: 'summer', herb: 'spring',
  resin: 'spring',
  // 渔汛
  seafish: 'spring', riverfish: 'spring', salmon: 'autumn', shellfish: 'winter',
  seaweed: 'spring', whaleoil: 'summer', blubber: 'summer', whalebone: 'summer',
  coral: 'summer', pearl: 'summer', sponge: 'summer',
  // 畜牧
  wool: 'spring', honey: 'autumn', wax: 'autumn',
  // 矿产与加工
  salt: 'summer', peat: 'summer'
}

const DEFAULT_SEASON = {
  农业: 'autumn',
  畜牧: 'year',
  渔猎: 'year',
  林业: 'winter',
  矿产: 'year',
  特产: 'autumn',
  加工品: 'year'
}

for (const r of RESOURCES) {
  if (!r.season) r.season = SEASON_BY_ID[r.id] || DEFAULT_SEASON[r.group] || 'year'
}

export const RAW_RESOURCES = RESOURCES.filter((r) => r.kind === 'raw')
export const PROCESSED_RESOURCES = RESOURCES.filter((r) => r.kind === 'processed')

export const OUTPUT_CATEGORY = {
  metal: ['tools'],
  textile: ['cloth', 'linen', 'woolcloth'],
  ceramic: ['brick', 'pottery', 'glass'],
  wares: ['tools', 'weapons', 'rope'],
  luxury: ['jewelry', 'incense', 'perfume', 'cosmetic'],
  drink: ['wine', 'beer'],
  food: ['bread', 'cheese', 'butter', 'saltedfish', 'fishsauce', 'flour'],
  medicine: ['incense', 'perfume']
}

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

export function deriveSpecialties(geo, opts = {}) {
  if (!geo) return []
  const min = opts.min || 3
  const max = opts.max || 14
  const ratio = opts.ratio ?? 0.55
  const perGroup = opts.perGroup || 3

  const scored = RAW_RESOURCES.map((r) => ({ r, score: Math.round(scoreResource(r, geo) * 100) / 100 }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  if (!scored.length) return []
  const best = scored[0].score
  const cut = best * ratio

  const picked = []
  const groupCount = {}
  for (const x of scored) {
    if (picked.length >= max) break
    if (x.score < cut) break
    const g = x.r.group
    if ((groupCount[g] || 0) >= perGroup) continue
    groupCount[g] = (groupCount[g] || 0) + 1
    picked.push(x)
  }

  // 不足下限则按分数补齐
  for (const x of scored) {
    if (picked.length >= min) break
    if (picked.includes(x)) continue
    picked.push(x)
  }

  return picked.map((x) => ({ ...x.r, score: x.score }))
}

/** 当季产出系数：非当季的原料只能靠库存 */
export function seasonFactor(res, season) {
  if (!res || !season) return 1
  if (res.season === 'year') return 1
  if (res.season === season) return 1
  const order = ['spring', 'summer', 'autumn', 'winter']
  const d = Math.abs(order.indexOf(res.season) - order.indexOf(season))
  const dist = Math.min(d, 4 - d)
  return dist === 1 ? 0.55 : 0.3
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
