// 政治集团（联邦/教团/家族联盟）与成员关系
// 由人工确认的设定写死在此，重新生成 diplomacy.mjs 时会自动并入
export const BLOCS = [
  {
    id: 'bloc:viria',
    name: '维瑞亚帝国',
    alias: ['维瑞亚'],
    type: '家族帝国',
    leader: '基尼格',
    player: '基尼格',
    members: ['基尼格', '蒙格王朝', '哈巴哲', '斯皮格'],
    note: '名义上是一个帝国，实际由四个家族共治；玩家扮演基尼格家族。',
    color: '#6f8ba8'
  },
  {
    id: 'bloc:iseran',
    name: '伊瑟兰世界',
    alias: ['伊瑟兰议邦', '白枝联邦'],
    type: '议邦联邦',
    leader: '伊瑟兰',
    player: '',
    members: ['伊瑟兰', '尤维尔', '菲尔汀', '希洛亚', '缇洛伦'],
    note: '又称伊瑟兰议邦，由白枝议长主持的精灵诸邦联盟。',
    color: '#7fb8a0'
  },
  {
    id: 'bloc:paraxia',
    name: '帕拉夏教团',
    alias: ['图兰精灵'],
    type: '政教一体',
    leader: '帕拉夏教团',
    player: '',
    members: ['帕拉夏教团', '林普斯', '罗金吉亚'],
    note: '以阿纳亚图拉为第一先知的图兰精灵教团，下辖两处附庸。',
    color: '#4fae8c'
  },
  {
    id: 'bloc:iris',
    name: '鸢尾花（分裂）',
    alias: ['鸢尾花帝国', '鸾尾花帝国'],
    type: '分裂中的帝国',
    leader: '—',
    player: '',
    members: ['鸾尾花', '安茹'],
    memberLabels: { 鸾尾花: '鸢尾花王朝', 安茹: '安茄王朝' },
    note: '旧鸢尾花帝国已分裂：安茄王朝据有新土，鸢尾花王朝保有旧统，两方皆自称正统。',
    color: '#b36e67'
  }
]

export const BLOC_ALIAS = {
  鸾尾花: '鸢尾花（分裂）',
  安茹: '鸢尾花（分裂）',
  伊瑟兰: '伊瑟兰世界',
  维瑞亚帝国: '维瑞亚帝国'
}
