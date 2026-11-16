// 国家资料（由 .tools/import-countries.mjs 从资料集生成，勿手改）
const COUNTRIES = [
  {
    "id": "c_1794481698467_7hjg7",
    "slug": "玉海国",
    "index": 1,
    "name": "玉海国",
    "race": "人类",
    "capital": "玉京",
    "faith": "先祖崇拜",
    "population": "203K",
    "bio": "尽管玉海的神话不断将天皇的统治延长至恒古，但它始终是一个年轻的国家，随着先祖扫荡岛东诸多氏族，并于如今的玉京立国，传到如今圆融手中也不过两代尔尔。这位古怪的天皇在幼时就已因为其的固执与急躁让服侍其的宫女苦不堪言，随着其父亲因衰老而放手让其亲政以来，圆融便以“上不便”的理由革除了诸多需要天皇亲临的繁复仪式，虽然围绕在圆融周围的政治势力都认为这些仪轨会在其登基时重新开展，可圆融以实际行动证明了其的延续。久居于宫中的天皇不再频繁地于人群中显露其的容颜，招致了流言蜚语的传播，东方的阿奴与西方的和族亦蠢蠢欲动，夜狮的神嗣或许需要以其的兵戈再现其的荣光，以彰显玉海那神圣而不可侵犯的地位之延续...",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "封建君主制",
      "leader": {
        "name": "圆融",
        "title": "天皇",
        "avatar": "/countries/c01-leader.jpg",
        "traits": [
          "急躁",
          "古怪",
          "固执"
        ],
        "stats": {
          "diplomacy": 6,
          "stewardship": 10,
          "martial": 12,
          "intrigue": 8,
          "learning": 2,
          "prowess": 5
        },
        "bio": "历代天皇都认为自己身上流淌着神明的血液，并不遗余力地向他们的民众强化这个概念"
      },
      "factions": [
        {
          "id": "f_1794482004562",
          "name": "宫家",
          "leader": "圆融天皇",
          "influence": 35,
          "color": "#5489a2"
        },
        {
          "id": "f_1794482005781",
          "name": "公家",
          "leader": "神里雅长",
          "influence": 36,
          "color": "#b29357"
        },
        {
          "id": "f_1794482006214",
          "name": "武家",
          "leader": "九条廉治",
          "influence": 21,
          "color": "#518c76"
        },
        {
          "id": "f_1794483744881",
          "name": "祝部",
          "leader": "八重宫司",
          "influence": 8,
          "color": "#b36e67"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794482409115",
          "name": "御稜威",
          "desc": "御稜威，这是一种衡量天皇陛下统治力的神圣力量，乃是作为玉海的夜狮后嗣所拥有的恩泽的太阳光辉，当其光辉炽烈的时候，民众便紧紧跟随，俯首叩拜，而那些心怀二心的小人也不敢靠近：当其光辉晦暗的时候，民众便难以寻见天皇的威光，而其遭遇公家与武家虚以委蛇甚至暗害的不测风险也将提高··",
          "effect": "当前陛下的御稜威为：35"
        }
      ],
      "wonders": [
        {
          "id": "w_1794483560495",
          "name": "影向山",
          "desc": "影向山位于皇居北东的深山御料地中，峰峦终年隐于云雾中，山体不列入一般神社参拜。山名“影向”，取“神道影向、皇祖垂临”之意：相传皇祖之灵曾于此山显影，庇佑天皇一系...",
          "avatar": "data:image/jpeg;base64,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",
          "image": ""
        }
      ],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 6,
      "stewardship": 10,
      "martial": 12,
      "intrigue": 8,
      "learning": 2,
      "prowess": 5
    }
  },
  {
    "id": "c_1794486623869_ejp4e",
    "slug": "八菽之囿",
    "index": 2,
    "name": "八菽之囿",
    "race": "神明灵",
    "capital": "无",
    "faith": "先祖崇拜",
    "population": "0.3K",
    "bio": "神明灵早已忘却那覆灭故国的名字，忘却自己生前的名字，仅凭那残破的记忆与执念，化作倒影在废墟中游荡。虞皞于这迷幻的白雾中窥视着它们的徒劳，并为此落泪，于是祂以神明灵那残破的记忆化作“阴天子”，甘愿带领这群神明灵于这迷雾缭绕的泽国中建立起名为“八菽”的亡魂之城。神明灵们夺舍这山精水怪，化作光怪陆离的妖魔游荡于这水泽之间——对于凡人而言，这里是生者止步的禁地；而对于那些亡魂而言，这里则是它们彻底消散前的最后归宿",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "神王统治",
      "leader": {
        "name": "虞皞",
        "title": "东海伯",
        "avatar": "/countries/c02-leader.jpg",
        "traits": [
          "慷慨",
          "耐心",
          "安于现状"
        ],
        "stats": {
          "diplomacy": 1,
          "stewardship": 2,
          "martial": 8,
          "intrigue": 19,
          "learning": 19,
          "prowess": 3
        },
        "bio": "于云梦泽的幻雾中浮现一隅伟岸的祂，是那不甘逝去的亡魂倒影的统治者"
      },
      "factions": [
        {
          "id": "f_1794488083958",
          "name": "虞皞",
          "leader": "虞皞",
          "influence": 82,
          "color": "#5489a2"
        },
        {
          "id": "f_1794488085005",
          "name": "巫祝",
          "leader": "望",
          "influence": 18,
          "color": "#b29357"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794487384538",
          "name": "百鬼夜行",
          "desc": "神明灵擅长夺舍与附身，它们能将周遭的山精野怪甚至强大的魔兽化作其的躯壳，以此来获得生者的肉身来延续生前的生活，可一旦那用以寄宿的躯壳遭到破坏，亦或者是明了自己早已死去的事实，便会顷刻间暴露自己脆弱的灵体，尔后化作一缕青烟，魂飞魄散",
          "effect": "“我不愿承认那故国已然覆灭的事实，甘愿化作死的倒影，延续生的幻梦”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 1,
      "stewardship": 2,
      "martial": 8,
      "intrigue": 19,
      "learning": 19,
      "prowess": 3
    }
  },
  {
    "id": "c_1794488197474_my9cx",
    "slug": "苇原中国",
    "index": 3,
    "name": "苇原中国",
    "race": "人类",
    "capital": "高天原",
    "faith": "高天原崇拜",
    "population": "205K",
    "bio": "苇原的建立离不开那神秘莫测的姐弟——天照命与月度命，祂们就如同受天感召一般降临于苇原大地，不过眨眼片刻，苇原人便在祂们的带领下走出蛮荒的年代，过去茹毛饮血的诸氏族如今摇身一变，成为了坐镇高天原的名家贵族，狂热地崇拜着那天照命与月读命。但与狂热的名家不同，姐弟二人对于苇原的未来仍旧充满着不确定，自西而来的海上民族冲击着周遭的岛屿，冲刷着湖岛上的民族；而南方，来自雷龙之王操纵着不被姐妹二人掌控的雷电；北方，遗世独立的神明灵时常化作妖怪侵扰苇原的边境...",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "神王统治",
      "leader": {
        "name": "天照命",
        "title": "大御神大人",
        "avatar": "/countries/c03-leader.jpg",
        "traits": [
          "勇敢",
          "野心勃勃",
          "贪婪"
        ],
        "stats": {
          "diplomacy": 7,
          "stewardship": 26,
          "martial": 0,
          "intrigue": 4,
          "learning": 26,
          "prowess": 0
        },
        "bio": "伴随雷霆的威光，天照命便同弟弟降临于彼时仍是蛮荒的苇原大地上，点化苇原民，建立高天原，建立起苇原国直到今日"
      },
      "factions": [
        {
          "id": "f_1",
          "name": "御所",
          "leader": "天照命",
          "influence": 46,
          "color": "#5489a2"
        },
        {
          "id": "f_1794488363733",
          "name": "名家",
          "leader": "柊弘嗣",
          "influence": 35,
          "color": "#b29357"
        },
        {
          "id": "f_1794488364743",
          "name": "守护",
          "leader": "无",
          "influence": 19,
          "color": "#518c76"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794488796905",
          "name": "高天原之治：日月同辉",
          "desc": "苇原是由天照命与月读命共治的国度。以文见长的天照命时常纠正弟弟过于急躁的行动，而以武见长的月读命则凭借那雷霆的威光斩去阻滞姐姐政策的敌人，姐弟二人一明一暗，相辅相成，缺一不可。苇原便是在这日月同辉的照拂之下，迎来了治世",
          "effect": "“若天照命与月读命能够绵延久治，苇原的辉光便永远不会消散！”"
        }
      ],
      "wonders": [],
      "heroes": [
        {
          "id": "h_1794488316269",
          "name": "月度命",
          "title": "持剑守护",
          "stars": 7,
          "avatar": "/countries/c03-hero-1.jpg",
          "bio": "伴随雷霆的威光，月读命便同姐姐降临于彼时仍是蛮荒的苇原大地上，在阴影中以持剑守护的身份保护天照命，为其斩去阻碍天照命的一切敌人"
        }
      ]
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 7,
      "stewardship": 26,
      "martial": 0,
      "intrigue": 4,
      "learning": 26,
      "prowess": 0
    }
  },
  {
    "id": "c_1794491631832_sji82",
    "slug": "昆云",
    "index": 4,
    "name": "昆云",
    "race": "人类",
    "capital": "龙京",
    "faith": "雷龙崇拜",
    "population": "368K",
    "bio": "于历史的迷雾中降临，自昆云有史以来，其人便自诩与龙同行的国家，伟大的龙帝以其的伟力建立起不可撼动的昆云国，并庇佑着昆云的土地风调雨顺。然而，漫长的时光，龙帝都沉溺于那无功而返的探求过去的行动，，忘却了曾许下的进取诺言，随着那一声不由其掌控的雷霆于其身侧响起，它才恍然发现，不知何时开始，雷霆的威光便不由其独享，北方新兴的苇原国，于其来说神秘莫测的天照命与月读命竟能染指其的权柄。幸好，它仍有弥补的机会——既是，行使身为君主的大权；又是，补完自己那空缺的过去",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "神王统治",
      "leader": {
        "name": "尧",
        "title": "龙帝",
        "avatar": "/countries/c04-leader.jpg",
        "traits": [
          "轻信他人",
          "古怪",
          "专断"
        ],
        "stats": {
          "diplomacy": 13,
          "stewardship": 3,
          "martial": 5,
          "intrigue": 2,
          "learning": 13,
          "prowess": 13
        },
        "bio": "它不明白自己因何而诞生，亦不知自己漫长的岁月该归往何处。它被稚童的歌声吸引，却不解这地上的渺小的生灵为何要向它跪拜，人们恐惧它的威名，祈求它保佑来年的风调雨顺，它欣然应允——这是作为稚童为它歌唱的回报。“昆云”这个由它所庇护的国家愈加庞大，人们为它献上美酒与牲祭，传颂它的美德，可它却从未在这仪式中感到欢欣，只不过是应允它们的祈求，以君主的姿态延续统治罢了..."
      },
      "factions": [
        {
          "id": "f_1794492946695",
          "name": "龙庭",
          "leader": "尧",
          "influence": 72,
          "color": "#5489a2"
        },
        {
          "id": "f_1794492951918",
          "name": "公卿",
          "leader": "无",
          "influence": 28,
          "color": "#b29357"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794492085404",
          "name": "“我是谁？”",
          "desc": "尧不明白自己因何而诞生，亦不知自己漫长的岁月该归往何处。长久以来，它都在追寻自己诞生的意义，却在一次次的希望中无功而返，可那支离破碎的记忆是如此真实，那不知因何而生的仇恨如同鸠毒般在它的心头回味沉淀——是何等惨痛的过去才能铭刻下这恨于心中？无论如何，尧都认为它有必要去一探究竟...",
          "effect": "外交：-10；管理：-10；军事：-10；谋略：-10；学识：-10；武艺：-10"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 13,
      "stewardship": 3,
      "martial": 5,
      "intrigue": 2,
      "learning": 13,
      "prowess": 13
    }
  },
  {
    "id": "c_1794494081449_q0xb9",
    "slug": "遴选",
    "index": 5,
    "name": "遴选",
    "race": "人类",
    "capital": "遴选城",
    "faith": "白虎崇拜",
    "population": "283K",
    "bio": "羌人的先祖于岩缝中找到了刚自地脉诞生的白虎，并同其立下盟约，白虎便庇佑着羌人建立了遴选城，可随着时间推移，白虎对于羌人政治的干预日益减少，除了一年一度的请仙仪式外，祂绝大多数的时间都栖息于羌人为其建造的行宫中...进行着...修仙？随着长老院的大姓第一次因土地纷争而分为泾渭分明的赵姚二党，遴选城的政治议题便因双方之间的政治冲突而陷入停滞中，而对于那些请求白虎出山整治环境的意愿，祂大多都不予理会，只有再最危险的时候祂才会履行同羌人的盟约行使权力。但如今的局势，纷争不休的遴选城又一次陷入停摆中，不见那自河口向内侵扰的“华人”，亦不管那欲意进取的炎国君主，白虎会选择行使祂的神圣权利干预遴选的政治吗？还是相信羌人，相信他们有足够的能力应对未来的挑战？",
    "accent": "#b29357",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "贵族共和制",
      "leader": {
        "name": "白虎",
        "title": "灵霄上清统雷元阳妙一飞玄真君",
        "avatar": "/countries/c05-leader.jpg",
        "traits": [
          "狂热",
          "狡诈",
          "专断"
        ],
        "stats": {
          "diplomacy": 6,
          "stewardship": 16,
          "martial": 20,
          "intrigue": 4,
          "learning": 17,
          "prowess": 18
        },
        "bio": "祂自地脉奔腾的岩元素力中化形成虎，被古时的羌人所发现并崇拜，虎与其先祖立下盟约，庇佑着羌人走至今日"
      },
      "factions": [
        {
          "id": "f_1794494848584",
          "name": "赵党",
          "leader": "赵武",
          "influence": 34,
          "color": "#b29357"
        },
        {
          "id": "f_1794494848942",
          "name": "姚党",
          "leader": "姚雄",
          "influence": 38,
          "color": "#518c76"
        },
        {
          "id": "f_1794494849081",
          "name": "清流",
          "leader": "无",
          "influence": 12,
          "color": "#b36e67"
        },
        {
          "id": "f_1794494849232",
          "name": "太祝",
          "leader": "祝乾",
          "influence": 16,
          "color": "#7b6899"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794494860292",
          "name": "纷争不休的遴选城",
          "desc": "很多旅行者都诧异遴选城实际上并不是一个由白虎亲自治理的国家，实际上，祂正在享受着被人当作神明供奉的感觉，白虎都会在祂烟雾缭绕的行宫中念书诵经。遴选城的政治实际上掌控在几个大姓组成的长老院手上，从最初的两个大姓之间因土地纠纷而临时组建的政治集团，到现在同对方议题相互狙击的党派之争，不堪忍受者组成清流自成一派，将希望寄托于白虎出手解决...",
          "effect": "“但实际上，白虎乐见这种情况...”（必须有一个行动用于白虎的个人行动上）"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 6,
      "stewardship": 16,
      "martial": 20,
      "intrigue": 4,
      "learning": 17,
      "prowess": 18
    }
  },
  {
    "id": "c_1794544159289_0y7bb",
    "slug": "华国",
    "index": 6,
    "name": "华国",
    "race": "人类",
    "capital": "华城",
    "faith": "先祖崇拜",
    "population": "51K",
    "bio": "华人在左大帅的率领下冲入云梦泽，试图在这异土建立起属于华人的独立城邦，左大帅的确成功了，他在泷河的河口建立起华城，并供养起追随他的庞大军势以捍卫城邦的独立，却使得城邦的负担愈加沉重。土地的产出显然无法供养起这支庞大的军队，华人重拾起过去佣兵的传统，成功在这云梦泽打响自己的名头，但这也使得华人不得不介入这复杂的列国政治中去，泷国的朝廷时刻想要将其的影响力施加在华城中，却遭到了左大帅的抵制，只是这位戎马一生的将军终有衰老的时刻，而那围绕其运转的亲军是否能够认可其的继承者？我们尚未可知...",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "军事民主制",
      "leader": {
        "name": "左大帅",
        "title": "平寇将军",
        "avatar": "",
        "traits": [
          "多疑",
          "贪婪",
          "勇敢"
        ],
        "stats": {
          "diplomacy": 19,
          "stewardship": 21,
          "martial": 11,
          "intrigue": 4,
          "learning": 10,
          "prowess": 14
        },
        "bio": "左大帅率领着华人闯入云梦泽中，侵占泷国的出海口建立了华国，并热衷于维持华国的独立性，并坚定地拒绝同泷、炎二国的进一步交往"
      },
      "factions": [
        {
          "id": "f_1794544622296",
          "name": "亲炎派",
          "leader": "魏彦吾",
          "influence": 8,
          "color": "#5489a2"
        },
        {
          "id": "f_1794544622431",
          "name": "亲泷派",
          "leader": "文月",
          "influence": 25,
          "color": "#b29357"
        },
        {
          "id": "f_1794544623385",
          "name": "海民派",
          "leader": "钟离渔",
          "influence": 19,
          "color": "#518c76"
        },
        {
          "id": "f_1794544625184",
          "name": "亲兵",
          "leader": "左大帅",
          "influence": 48,
          "color": "#7b6899"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794544795240",
          "name": "拥有城邦的军队",
          "desc": "显然，相较一个正常运转的城邦来说，华国的一切事务都是围绕左大帅与其的亲军展开，为了供养这支庞大的军队，华人已然被压迫至了极限，左大帅不得不允许华人自力更生，奔向大海，作为雇佣军戎马一生——显然，华人的流失是肉眼可见的",
          "effect": "“华人无处不在”"
        },
        {
          "id": "m_1794544873183",
          "name": "夹缝求生",
          "desc": "随着华人佣兵在国际市场打出自己的名声，位于泷国出海口的华国时刻受到来自泷庭的施压，后者企图将华国内附为其的一个附属国——但左大帅并不希望这样的事情发生，依凭其的外交手段与武力，他得以将泷国的影响力拒之门外，甚至得以联系野心勃勃的炎国介入其中",
          "effect": "“但他终会老去”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [
        {
          "id": "leg_1794544776327",
          "name": "左大帅部",
          "training": "百战老兵",
          "loyalty": 4,
          "unitNames": [
            "华人水手",
            "华人水手",
            "华人水手",
            "华人重步兵",
            "华人重步兵",
            "华人重步兵"
          ]
        }
      ],
      "units": [
        {
          "id": "u_1794544744433",
          "name": "华人水手",
          "role": "游击穿插",
          "race": "人类",
          "modifiers": "【尚武造诣】【两栖适应】",
          "size": 500,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "皮胄",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "皮甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "青铜短剑",
                "desc": "",
                "category": "青铜短剑"
              },
              {
                "name": "圆盾",
                "desc": "",
                "category": "圆盾"
              },
              {
                "name": "无",
                "desc": "",
                "category": "通用"
              },
              {
                "name": "无",
                "desc": "",
                "category": "通用"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794544770596",
          "name": "华人重步兵",
          "role": "坚阵中锋",
          "race": "人类",
          "modifiers": "【引发恐惧】【狂怒】",
          "size": 150,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "铜胄",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "青铜胸甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "简易屐",
              "desc": ""
            },
            "weapons": [
              {
                "name": "青铜短剑",
                "desc": "",
                "category": "青铜短剑"
              },
              {
                "name": "蒙皮小圆盾",
                "desc": "",
                "category": "蒙皮小圆盾"
              },
              {
                "name": "短矛",
                "desc": "",
                "category": "投掷"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        }
      ]
    },
    "stats": {
      "diplomacy": 19,
      "stewardship": 21,
      "martial": 11,
      "intrigue": 4,
      "learning": 10,
      "prowess": 14
    }
  },
  {
    "id": "c_1794550534585_6gknh",
    "slug": "德拉米共和国",
    "index": 7,
    "name": "德拉米共和国",
    "race": "小精灵",
    "capital": "德拉米",
    "faith": "原始崇拜",
    "population": "2.5K",
    "bio": "实际上...精灵帝国严格意义上并没有统治过小精灵，长久以来，他们都过着与世无争的美好生活，时代的变迁并没有影响到他们的哪怕一分一毫，直到——人类的到来。随着帝国岛被奥克萨隆大元帅率领的海上民族所攻陷后，精灵对于周遭领土的统治顷刻间化为乌有，人类开始频繁闯入小精灵的生活中，第一只小精灵被海上民族当作贡品献给大元帅后，海民便时常组织狩猎队猎杀小精灵，因而也给了第七百六十四位拉让米成为独裁官的机会。随着小精灵同人类的矛盾愈发尖锐，一次流血冲突，小精灵意外将率领狩猎队的奥克萨隆嫡子打死后，愤怒的元帅显然想要将这些小精灵赶尽杀绝，以来告慰他死去的孩子了",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "商贸航线",
        "旧都残殿"
      ],
      "customTag": "",
      "desc": "曾有神王梦想以音律建立庞大帝国，如今黄金乐章化为孤冷潮音。"
    },
    "politics": {
      "system": "贵族共和制",
      "leader": {
        "name": "第七百六十四位拉让米",
        "title": "凯撒",
        "avatar": "/countries/c07-leader.jpg",
        "traits": [
          "野心勃勃",
          "古怪",
          "忠贞"
        ],
        "stats": {
          "diplomacy": 6,
          "stewardship": 8,
          "martial": 4,
          "intrigue": 4,
          "learning": 9,
          "prowess": 6
        },
        "bio": "尽管这位凯撒通过军事阴谋成功夺得了国家的最高政治权力，并通过不断延长的紧急状态来维持“拉让米”这个合法头衔的存在，但正常人都能看出来，保证其不被日益愤怒的元老们所清算的，是其鼓吹的战无不胜的军团"
      },
      "factions": [
        {
          "id": "f_1",
          "name": "平民派",
          "leader": "盖乌斯·屋大维",
          "influence": 25,
          "color": "#5489a2"
        },
        {
          "id": "f_1794551276801",
          "name": "阿夸家族（贵人派）",
          "leader": "马尔库斯·阿夸利乌斯·萨卢斯",
          "influence": 16,
          "color": "#518c76"
        },
        {
          "id": "f_1794551278068",
          "name": "赫尔比亚家族（贵人派）",
          "leader": "莉薇娅·西尔维亚·赫巴",
          "influence": 13,
          "color": "#7b6899"
        },
        {
          "id": "f_1794553396429",
          "name": "佩特里亚家族（贵人派）",
          "leader": "提图斯·佩特里乌斯·卡斯特鲁姆",
          "influence": 8,
          "color": "#4c7387"
        },
        {
          "id": "f_1794553396753",
          "name": "弗尔米尼亚家族（贵人派）",
          "leader": "卢基乌斯·弗尔米尼乌斯·托尼特鲁斯",
          "influence": 15,
          "color": "#93845b"
        },
        {
          "id": "f_1794553522289",
          "name": "伊格尼斯家族（贵人派）",
          "leader": "盖乌斯·伊格尼乌斯·武尔坎",
          "influence": 11,
          "color": "#5489a2"
        },
        {
          "id": "f_1794553522555",
          "name": "泽菲利家族（贵人派）",
          "leader": "奥卢斯·泽菲利亚·塞勒尔",
          "influence": 12,
          "color": "#b29357"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794551377317",
          "name": "非正常的紧急状态",
          "desc": "明眼人都能看出来，元老们对于这位“终身凯撒”的不满已经达到了巅峰，只不过是碍于其的军势而没有发难，随着蛮族又一次进犯的消息传到元老院，元老们都等待着凯撒所吹嘘的军团战败的那一刻，并做好了给予其最致命一击的准备",
          "effect": "“尖刀在背”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [
        {
          "id": "leg_1794551361030",
          "name": "第一军团",
          "training": "一般",
          "loyalty": 5,
          "unitNames": [
            "元素傀儡",
            "元素傀儡",
            "元素傀儡",
            "德拉米战法团",
            "德拉米战法团",
            "德拉米斥候",
            "德拉米斥候"
          ]
        }
      ],
      "units": [
        {
          "id": "u_1794551360566",
          "name": "德拉米战法团",
          "role": "战争法师",
          "race": "小精灵",
          "modifiers": "【飞行】【激励友军】",
          "size": 15,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "无",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "术士法袍",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "学徒笔记",
                "desc": "",
                "category": "法器"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794555370962",
          "name": "元素傀儡",
          "role": "坚阵中锋",
          "race": "元素生命",
          "modifiers": "【构装体】",
          "size": 120,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "无",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "无",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "元素之拳",
                "desc": "",
                "category": "徒手"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794555548215",
          "name": "德拉米斥候",
          "role": "坚阵中锋",
          "race": "小精灵",
          "modifiers": "【飞行】",
          "size": 30,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "无",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "布甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "木签",
                "desc": "",
                "category": "长柄"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        }
      ]
    },
    "stats": {
      "diplomacy": 6,
      "stewardship": 8,
      "martial": 4,
      "intrigue": 4,
      "learning": 9,
      "prowess": 6
    }
  },
  {
    "id": "c_1794555968186_8264t",
    "slug": "莱塔尼亚",
    "index": 8,
    "name": "莱塔尼亚",
    "race": "人类",
    "capital": "莱塔尼亚",
    "faith": "原始崇拜",
    "population": "227K",
    "bio": "随着精灵帝国的崩溃，施加在莱塔尼亚人的枷锁已然过去，而此时，一律微风化作他们的模样，带领莱塔尼亚人建立了属于他们的国家——噢，海民，你在帝国岛肆虐，可这又与莱塔尼亚人有何关系呢？",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "封建君主制",
      "leader": {
        "name": "夜皇",
        "title": "皇",
        "avatar": "",
        "traits": [
          "野心勃勃",
          "暴食",
          "贪婪"
        ],
        "stats": {
          "diplomacy": 8,
          "stewardship": 6,
          "martial": 1,
          "intrigue": 1,
          "learning": 10,
          "prowess": 16
        },
        "bio": "昔日的一律微风，聆听到了莱塔尼亚人的呼唤，化作人之模样行使君主的权力，建立统治"
      },
      "factions": [
        {
          "id": "f_1",
          "name": "乌提卡家族",
          "leader": "弗朗茨·冯·乌提卡\t",
          "influence": 40,
          "color": "#5489a2"
        },
        {
          "id": "f_1794556141378",
          "name": "沃尔夫冈家族",
          "leader": "米夏埃尔·沃尔夫冈",
          "influence": 27,
          "color": "#b29357"
        },
        {
          "id": "f_1794556418569",
          "name": "德罗斯特家族",
          "leader": "薇薇安娜·德罗斯特",
          "influence": 33,
          "color": "#518c76"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794556423387",
          "name": "众赞的调弦师",
          "desc": "“扰乱世间者不得存留，贪婪者无应苟活；狡诈多变之混沌，是之为秩序秽尘废埃也。”\n夜皇鄙夷变化，希望世间的一切都能随其的乐声有序行动，然而世事又岂是其所能预料？",
          "effect": "“我苦恼那命运的无常，希望终有一日能够将其掌握于手中”"
        }
      ],
      "wonders": [
        {
          "id": "w_1794557710466",
          "name": "大皇宫（尚未完工）",
          "desc": "祂要彰显荣光，祂要让其的人民为之自豪，于是祂命莱塔尼亚人为其建筑皇宫，而今...地基尚未确立\n（夜皇目前希望大皇宫能在三回合内落成）",
          "avatar": "",
          "image": ""
        }
      ],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 8,
      "stewardship": 6,
      "martial": 1,
      "intrigue": 1,
      "learning": 10,
      "prowess": 16
    }
  },
  {
    "id": "c_1794558999440_x58nt",
    "slug": "安格烈",
    "index": 9,
    "name": "安格烈",
    "race": "人类",
    "capital": "安格烈",
    "faith": "原始一神论",
    "population": "346K",
    "bio": "诸多随奥克萨隆迁入帝国岛的海上民族之一，在奥克萨隆见过的民族中，安格烈恐怕是那最为酷爱鲜血的——战俘被当作牲祭献给天父，巫祭将新鲜的头颅剥离皮囊，变作用以施术的法器。也因而，在其他海上民族同奥克萨隆元帅国保持着千丝万缕的关系时，安格烈是那最早建立起独立的政治体系的征服者王国，而战争的号角再次在帝国岛响彻，伟大的帝国毁灭者——奥克萨隆大元帅，正在呼唤那些曾与其一同侵入帝国的海民，荡绝所有的小精灵。巫王会欣然加入这伟大的大狩猎中吗？还是说他已然有另外的选择，来献给伟大的天父？",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "蛮族王国",
      "leader": {
        "name": "巫王",
        "title": "巫王",
        "avatar": "/countries/c09-leader.jpg",
        "traits": [
          "暴怒",
          "虐待狂",
          "狡诈"
        ],
        "stats": {
          "diplomacy": 13,
          "stewardship": 12,
          "martial": 8,
          "intrigue": 13,
          "learning": 19,
          "prowess": 14
        },
        "bio": "全安格烈人最严厉的父亲，带领安格烈人征服这片过去为精灵故土的河湾，建立起了属于他的王国"
      },
      "factions": [
        {
          "id": "f_1794559353203",
          "name": "王庭",
          "leader": "巫王",
          "influence": 34,
          "color": "#5489a2"
        },
        {
          "id": "f_1794559358548",
          "name": "巫祭",
          "leader": "暂无",
          "influence": 39,
          "color": "#b29357"
        },
        {
          "id": "f_1794559442967",
          "name": "战团",
          "leader": "暂无",
          "influence": 27,
          "color": "#518c76"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794559460748",
          "name": "献给天父的武功歌",
          "desc": "与诸多海民不同，安格烈人并不认为世间是由诸神所共创，而是由一位神秘莫测的独一神所造，巫王宣称其为天父的选民，要用战争与鲜血告慰天父的创造世界的恩典，但这对于天父的狂热仍旧局限于巫王个人的王庭之中，或许只有更多的荣耀加冕于其神，当那颅骨的王座被垒起，鲜血流淌成河，或许天父真能自那高天诞临，为巫王戴上属于其的神圣的冠冕...",
          "effect": "“我们的父在渴求血与肉...”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [
        {
          "id": "leg_1794558999440",
          "name": "巫王战团",
          "training": "百战老兵",
          "loyalty": 5,
          "unitNames": [
            "安格烈猎手",
            "安格烈猎手",
            "安格烈猎手",
            "安格烈猎手",
            "安格烈猎手",
            "安格烈猎手",
            "安格烈猎手",
            "安格烈冠军勇士",
            "安格烈冠军勇士",
            "安格烈冠军勇士",
            "安格烈冠军勇士",
            "安格烈冠军勇士",
            "安格烈术士团",
            "安格烈术士团",
            "安格烈术士团"
          ]
        }
      ],
      "units": [
        {
          "id": "u_1794559501691",
          "name": "安格烈冠军勇士",
          "role": "坚阵中锋",
          "race": "人类",
          "modifiers": "【狂怒】【引发恐惧】",
          "size": 100,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "双角重盔",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "兽皮胸甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "青铜战斧",
                "desc": "",
                "category": "单手斧"
              },
              {
                "name": "圆盾",
                "desc": "",
                "category": "圆盾"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794559502975",
          "name": "安格烈猎手",
          "role": "游击穿插",
          "race": "人类",
          "modifiers": "",
          "size": 150,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "无",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "肩甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "短矛",
                "desc": "",
                "category": "投掷"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794560834865",
          "name": "安格烈术士团",
          "role": "战争法师",
          "race": "人类",
          "modifiers": "",
          "size": 24,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "动物骨盔",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "萨满服",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "头骨碗",
                "desc": "",
                "category": "法器"
              },
              {
                "name": "祭祀骨刃",
                "desc": "",
                "category": "匕首"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        }
      ]
    },
    "stats": {
      "diplomacy": 13,
      "stewardship": 12,
      "martial": 8,
      "intrigue": 13,
      "learning": 19,
      "prowess": 14
    }
  },
  {
    "id": "c_1794562873788_bg5cn",
    "slug": "吉利卡斯至高国",
    "index": 10,
    "name": "吉利卡斯至高国",
    "race": "精灵",
    "capital": "吉利卡斯",
    "faith": "先祖崇拜",
    "population": "5.2K",
    "bio": "帝国已然覆灭，昔日戍边的军团长已在其军士的拥簇下加冕为了至高王，但他并未因此感到高兴——王国内，那些昔日拥簇他加冕为王的军士正迫切地希望他们的王能够带领他们打回帝国岛；而王国之外，所能见到的只有蛮族、蛮族、还有蛮族，克拉兹尼必须小心翼翼地行使他作为至高王的权柄，以免其的王国在顷刻间被颠覆...",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "封建君主制",
      "leader": {
        "name": "克拉兹尼·佐·菲德索托孟卡",
        "title": "至高王",
        "avatar": "",
        "traits": [
          "古怪",
          "专断",
          "贪婪"
        ],
        "stats": {
          "diplomacy": 11,
          "stewardship": 18,
          "martial": 15,
          "intrigue": 5,
          "learning": 17,
          "prowess": 20
        },
        "bio": "随着帝国的覆灭，累年戍边同山民斗争的克拉兹尼在其的军士拥簇下，加冕为了吉利卡斯至高国的第一任至高王"
      },
      "factions": [
        {
          "id": "f_1794563193775",
          "name": "还乡团",
          "leader": "凯尔萨斯·逐日者",
          "influence": 77,
          "color": "#5489a2"
        },
        {
          "id": "f_1794563193918",
          "name": "本土派",
          "leader": "希尔瓦娜斯·风行者",
          "influence": 23,
          "color": "#b29357"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794563164113",
          "name": "蛮族，蛮族，怎么还是蛮族？",
          "desc": "事实上，吉利卡斯国已经被周遭的蛮族所包围，虽然精灵的武艺足够他们抵御蛮族的冲击，但他们的数量又不足矣向外扩张，至高王必须小心翼翼地延伸其的统治范围，以免最后放眼其的疆域内，都是那甚至连精灵语都不说的野人民族",
          "effect": "“小心翼翼”"
        },
        {
          "id": "m_1794563716268",
          "name": "“苦行东南山”",
          "desc": "虽然帝国覆灭的事实不可改写，但克拉兹尼的麾下仍有诸多精灵的出身来自帝国岛，对于故土的思念和报复心理，他们无时无刻不希望伟大的至高王能够带领其归家；然而，随着时间的推移，这些归心似箭的精灵迟早会退出政治的舞台，但在他们仍旧活跃的当下，请讨好他们吧，至高王！",
          "effect": "还乡团满意度：53%"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [
        {
          "id": "leg_1794562873788",
          "name": "第一军团",
          "training": "一般",
          "loyalty": 3,
          "unitNames": [
            "吉利卡斯长矛兵",
            "吉利卡斯长矛兵",
            "吉利卡斯长矛兵",
            "吉利卡斯长矛兵",
            "吉利卡斯长矛兵",
            "吉利卡斯长矛兵",
            "吉利卡斯炎术士团",
            "吉利卡斯炎术士团",
            "吉利卡斯炎术士团",
            "吉利卡斯炎术士团",
            "吉利卡斯炎术士团"
          ]
        }
      ],
      "units": [
        {
          "id": "u_1794563129568",
          "name": "吉利卡斯长矛兵",
          "role": "战线中坚",
          "race": "精灵",
          "modifiers": "【尚武造诣】",
          "size": 60,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "尖顶头盔",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "铁制胸甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "护腿",
              "desc": ""
            },
            "weapons": [
              {
                "name": "铁制长矛",
                "desc": "",
                "category": "长柄武器"
              },
              {
                "name": "塔盾",
                "desc": "",
                "category": "塔盾"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794564243712",
          "name": "吉利卡斯弓箭手",
          "role": "远程弓兵",
          "race": "精灵",
          "modifiers": "【尚武造诣】",
          "size": 45,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "铁制半盔",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "布甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "短剑",
                "desc": "",
                "category": "短剑"
              },
              {
                "name": "精灵长弓",
                "desc": "",
                "category": "弓"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794565250353",
          "name": "吉利卡斯炎术士团",
          "role": "战争法师",
          "race": "精灵",
          "modifiers": "【尚武造诣】【施法精通】",
          "size": 12,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "无",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "轻便布甲",
              "desc": ""
            },
            "gloves": {
              "name": "gloves",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "魔导绪论",
                "desc": "",
                "category": "法器"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        }
      ]
    },
    "stats": {
      "diplomacy": 11,
      "stewardship": 18,
      "martial": 15,
      "intrigue": 5,
      "learning": 17,
      "prowess": 20
    }
  },
  {
    "id": "c_1794564677374_iougr",
    "slug": "普拉纳",
    "index": 11,
    "name": "普拉纳",
    "race": "凤仙",
    "capital": "普拉纳",
    "faith": "先祖崇拜",
    "population": "2.5K",
    "bio": "普拉纳凤仙迁至帝国岛的时间早于海上民族侵扰，一直以来，凤仙都以作为精灵的斥候为生，一些富裕的精灵王公也乐意组建以凤仙为主的亲卫队，可随着帝国倾覆，普拉纳凤仙失去了绝大多数的经济来源，对于这些不善耕作的天空民族来说，周遭的人类已然开始侵占他们生活的土地，或许昔日的传统生活很快将要被打破，大家都在等待那最为悠久的老祖奶——库拉拉发话...",
    "accent": "#b29357",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "氏族联盟",
      "leader": {
        "name": "“虹弓”库拉拉",
        "title": "老祖母",
        "avatar": "/countries/c11-leader.jpg",
        "traits": [
          "急躁",
          "愤世嫉俗",
          "狡诈"
        ],
        "stats": {
          "diplomacy": 10,
          "stewardship": 13,
          "martial": 4,
          "intrigue": 6,
          "learning": 13,
          "prowess": 14
        },
        "bio": "昔日的高天之王，如今则是普拉纳凤仙最为年长的祖奶奶，她已无心追记自己诞生的原因，只希望能够带领凤仙找到安家之所"
      },
      "factions": [
        {
          "id": "f_1794566530342",
          "name": "斯涅日科夫氏族",
          "leader": "斯薇特兰娜·斯涅日科娃",
          "influence": 23,
          "color": "#b29357"
        },
        {
          "id": "f_1794566530488",
          "name": "切尔诺梅尔氏族",
          "leader": "阿纳斯塔西娅·切尔诺梅尔斯卡娅",
          "influence": 24,
          "color": "#518c76"
        },
        {
          "id": "f_1794566537981",
          "name": "别列佐夫氏族",
          "leader": "柳德米拉·别列佐芙娜",
          "influence": 27,
          "color": "#b36e67"
        },
        {
          "id": "f_1794566540223",
          "name": "维克托罗夫氏族",
          "leader": "卡捷琳娜·维克托罗芙娜",
          "influence": 26,
          "color": "#7b6899"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794566550777",
          "name": "居无定所之民",
          "desc": "事实上，普拉纳风仙向来不擅稼穑，土地对这群天空之子而言无异于枷锁。长久以来，他们习惯了受雇于其他部族，以斥候或向导的身份换取微薄的生计。而大多的凤仙氏族仍旧保留着传统的生活方式，而库拉拉似乎对于推动凤仙们更紧密的联合并无兴趣",
          "effect": "“我们能见到凤仙王国建立的那一天吗？”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 10,
      "stewardship": 13,
      "martial": 4,
      "intrigue": 6,
      "learning": 13,
      "prowess": 14
    }
  },
  {
    "id": "c_1794568276562_8xds4",
    "slug": "罗讷瓦尼亚",
    "index": 12,
    "name": "罗讷瓦尼亚",
    "race": "人类",
    "capital": "罗讷瓦尼亚",
    "faith": "水龙崇拜",
    "population": "326K",
    "bio": "水之龙王的央土征程骤然终止，因某种原因，她携带着罗讷瓦尼亚加入这海上民族对于帝国岛的征服之中，罗讷瓦尼亚人的故乡已然在兵燹中破灭，而今，他们将希望寄托于梅露施坦因，希望这位伟大的神王能够带领他们在帝国岛建立第二故乡——只是，罗讷瓦尼亚的步伐似乎有点太过缓慢，等待他们登陆此地时，罗讷瓦尼亚的第二家园已然挤满了其他民族...",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "商贸航线",
        "旧都残殿"
      ],
      "customTag": "",
      "desc": "曾有神王梦想以音律建立庞大帝国，如今黄金乐章化为孤冷潮音。"
    },
    "politics": {
      "system": "神王统治",
      "leader": {
        "name": "梅露施坦因",
        "title": "水龙",
        "avatar": "/countries/c12-leader.jpg",
        "traits": [
          "冷酷",
          "急躁",
          "诚实"
        ],
        "stats": {
          "diplomacy": 8,
          "stewardship": 3,
          "martial": 10,
          "intrigue": 2,
          "learning": 18,
          "prowess": 4
        },
        "bio": "自深海中诞生的水之龙，回应地上人类的愿望，而成为诸部族的领袖"
      },
      "factions": [
        {
          "id": "f_1794569743119",
          "name": "长老会议",
          "leader": "瓦伦蒂诺·德·卢卡",
          "influence": 26,
          "color": "#5489a2"
        },
        {
          "id": "f_1794569743309",
          "name": "祭司团",
          "leader": "无",
          "influence": 17,
          "color": "#b29357"
        },
        {
          "id": "f_1794569743450",
          "name": "战团",
          "leader": "里奥瑟斯利",
          "influence": 24,
          "color": "#518c76"
        },
        {
          "id": "f_1794569743803",
          "name": "萨鲁登人",
          "leader": "无",
          "influence": 16,
          "color": "#b36e67"
        },
        {
          "id": "f_1794569745052",
          "name": "卢卡维人",
          "leader": "无",
          "influence": 17,
          "color": "#7b6899"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794569747792",
          "name": "众人之梦",
          "desc": "我们的故乡已然消失于地平线，罗讷瓦尼亚人已然退无可退，只能将一切希望托付给梅露施坦因，希望她能够带领罗讷瓦尼亚建新乡",
          "effect": "“我会努力...”"
        },
        {
          "id": "m_1794570416663",
          "name": "疲惫之龙",
          "desc": "罗讷瓦尼亚人内部的冲突，罗讷瓦尼亚人同其他海民的冲突，海民之间的冲突——因土地、继承乃至因生活习惯而产生的矛盾日积月累，水之龙奔波于罗讷瓦尼亚境内的各个部族据点来磋商解决众人的矛盾，日日如此，纵使精力无穷，梅露施坦因也开始对公务感到精神上的疲惫了...",
          "effect": "“我将继续努力...希望你们接下来不要再扩张了”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 8,
      "stewardship": 3,
      "martial": 10,
      "intrigue": 2,
      "learning": 18,
      "prowess": 4
    }
  },
  {
    "id": "c_1794571210926_ysk69",
    "slug": "尼斯特",
    "index": 13,
    "name": "尼斯特",
    "race": "人类",
    "capital": "尼斯特",
    "faith": "先祖崇拜",
    "population": "249K",
    "bio": "作为天生的商人，尼斯特人曾建立起遍布央海的贸易站，可惜的是——随着维瑞亚帝国累年的内战，以及海上民族的冲击，尼斯特对于海上的统治权已然不复存在，阿刻洛伊家族的忒勒马科斯·阿刻洛伊啊，不忍心他的共和国就此倾覆，只是当他加冕为终身的执政官后，共和国的政敌们已然团结起来反对他的统治...这位曾抱有理想的执政官，是否能够带领迷思的尼斯特人走出黑暗的时代？",
    "accent": "#5489a2",
    "region": {
      "name": "央土",
      "traits": [
        "商贸航线",
        "旧都残殿"
      ],
      "customTag": "",
      "desc": "曾有神王梦想以音律建立庞大帝国，如今黄金乐章化为孤冷潮音。"
    },
    "politics": {
      "system": "贵族共和制",
      "leader": {
        "name": "忒勒马科斯·阿刻洛伊",
        "title": "终身执政官",
        "avatar": "",
        "traits": [
          "傲慢",
          "怯懦",
          "专断"
        ],
        "stats": {
          "diplomacy": 3,
          "stewardship": 5,
          "martial": 7,
          "intrigue": 10,
          "learning": 12,
          "prowess": 5
        },
        "bio": "尼斯特的僭主啊，他的早年奉献于子邦的开拓事业中去，并在共和国最危难的时候组建军团将她拯救...可如今，昔日共和国的拯救者已然成为遭人唾弃的僭主，忒勒马科斯的晚年已然是孤独的..."
      },
      "factions": [
        {
          "id": "f_1794573989706",
          "name": "阿刻洛伊家族",
          "leader": "忒勒马科斯·阿刻洛伊",
          "influence": 28,
          "color": "#5489a2"
        },
        {
          "id": "f_1794573990071",
          "name": "达伊达洛斯家族（不忠！）",
          "leader": "墨提斯·达伊达洛斯",
          "influence": 15,
          "color": "#b29357"
        },
        {
          "id": "f_1794573990240",
          "name": "福波斯忒斯家族（不忠！）",
          "leader": "阿波罗尼乌斯·福波斯忒斯",
          "influence": 17,
          "color": "#518c76"
        },
        {
          "id": "f_1794573990675",
          "name": "阿瑞忒斯家族（不忠！）",
          "leader": "列奥尼达斯·阿瑞忒斯",
          "influence": 23,
          "color": "#b36e67"
        },
        {
          "id": "f_1794573991338",
          "name": "波塞多尼亚家族（不忠！）",
          "leader": "卡利斯托斯·波塞多尼俄斯",
          "influence": 17,
          "color": "#7b6899"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794574001140",
          "name": "“时间紧，任务重”",
          "desc": "忒勒马科斯终将老去，是的...他留在尼斯特的历史会是什么样的？共和国的拯救者？还是僭越权力的暴君？他无从得知，政敌四面八方的攻讦已然让他疲乏，这位终身执政官或许是该为了自己的家族做些什么，或者...让大火升起——",
          "effect": "——“啊...我不在乎...”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 3,
      "stewardship": 5,
      "martial": 7,
      "intrigue": 10,
      "learning": 12,
      "prowess": 5
    }
  },
  {
    "id": "c_1794576853509_x19zz",
    "slug": "白昀",
    "index": 14,
    "name": "白昀",
    "race": "人类",
    "capital": "白昀",
    "faith": "图腾崇拜",
    "population": "201K",
    "bio": "尽管冰原的寒风依旧刺骨，但在这片无神怜爱的雪国，白昀人却用自己的“爱”包容那所有遭受兽怪蹂躏的民族——从人类到雪精，虽然他们的生活依旧要同这皑皑白雪斗争......只是，来自北方的不安消息，新的可汗试图将所有兽怪统合于其的帐下掀起对于这片冰原的征服，白昀人担忧战争再度降临于其的头上，急切地想要白昀之主给出解决的方案——迁徙，抑或是战斗？",
    "accent": "#5489a2",
    "region": {
      "name": "亥土",
      "traits": [],
      "customTag": "",
      "desc": ""
    },
    "politics": {
      "system": "氏族联盟",
      "leader": {
        "name": "？",
        "title": "韵律之主",
        "avatar": "",
        "traits": [
          "合群",
          "宽宏大量",
          "多疑"
        ],
        "stats": {
          "diplomacy": 20,
          "stewardship": 12,
          "martial": 11,
          "intrigue": 14,
          "learning": 19,
          "prowess": 8
        },
        "bio": "长袖善舞者，被上一任韵律之主所钦点..."
      },
      "factions": [
        {
          "id": "f_1794577210498",
          "name": "卜捷里宁氏族",
          "leader": "阿纳托利·卜捷里宁",
          "influence": 36,
          "color": "#5489a2"
        },
        {
          "id": "f_1794577210623",
          "name": "拉齐萨尔氏族",
          "leader": "费奥多尔·拉齐萨尔",
          "influence": 31,
          "color": "#b29357"
        },
        {
          "id": "f_1794577210738",
          "name": "阿尔维斯氏族",
          "leader": "小阿尔维斯",
          "influence": 25,
          "color": "#518c76"
        },
        {
          "id": "f_1794577210832",
          "name": "赫斯珀利德斯的代表",
          "leader": "帕芙琳娜",
          "influence": 8,
          "color": "#b36e67"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794577219487",
          "name": "来自北方的威胁",
          "desc": "来自赫斯珀利德斯的雪精为我们带来一则令人担忧的消息，游荡于古兽冰原的兽怪们似乎团结在了名叫“脱欢”的可汗帐下——对于白昀人来说，最为可怖的除了冬日的白灾外，就是那残忍的兽怪，绝大多数加入白昀的小部落没有一个不是遭到兽怪蹂躏的...",
          "effect": "“是选择再度迁徙...还是战胜心中的恐惧？”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 20,
      "stewardship": 12,
      "martial": 11,
      "intrigue": 14,
      "learning": 19,
      "prowess": 8
    }
  },
  {
    "id": "c_1794578406441_avlzl",
    "slug": "脱欢兀鲁斯",
    "index": 15,
    "name": "脱欢兀鲁斯",
    "race": "兽怪",
    "capital": "脱欢兀鲁斯",
    "faith": "先祖崇拜",
    "population": "25.8K",
    "bio": "自地脉诞生的大妖，应允兽怪统治的愿望，自合昔普儿迭思掠来一大批的雪精为其奴役，试图统合起冻原的诸部建立起以他为名的帝国，只是...或许我们应该想办法怎么应对，额...合昔普儿迭思雪精的报复？",
    "accent": "#5489a2",
    "region": {
      "name": "亥土",
      "traits": [],
      "customTag": "",
      "desc": ""
    },
    "politics": {
      "system": "氏族联盟",
      "leader": {
        "name": "脱欢·乎鲁不花",
        "title": "可汗",
        "avatar": "",
        "traits": [
          "忠贞",
          "傲慢",
          "合群"
        ],
        "stats": {
          "diplomacy": 6,
          "stewardship": 13,
          "martial": 19,
          "intrigue": 16,
          "learning": 8,
          "prowess": 14
        },
        "bio": "自地脉喷薄的冰元素而诞生的熊怪，回应了兽怪统治的愿望，奴役了来自赫斯珀利德斯的雪精，试图建立起一个辽阔的汗国"
      },
      "factions": [
        {
          "id": "f_1794578452730",
          "name": "合昔普儿迭思氏族（雪精）",
          "leader": "脱欢·乎鲁不花",
          "influence": 31,
          "color": "#5489a2"
        },
        {
          "id": "f_1794578452842",
          "name": "摩罗思氏族（熊）",
          "leader": "摩罗思·不花帖木儿",
          "influence": 17,
          "color": "#b29357"
        },
        {
          "id": "f_1794578452945",
          "name": "孛孛卜氏族（兔）",
          "leader": "孛孛卜·阔阔出",
          "influence": 17,
          "color": "#518c76"
        },
        {
          "id": "f_1794578453057",
          "name": "迭里牙惕氏族(树妖）",
          "leader": "迭里牙锡·脱脱",
          "influence": 3,
          "color": "#b36e67"
        },
        {
          "id": "f_1794578453167",
          "name": "唆阔罗氏族（猫）",
          "leader": "唆阔罗·黑的儿",
          "influence": 17,
          "color": "#7b6899"
        },
        {
          "id": "f_1794578453290",
          "name": "伯列辛（犬）",
          "leader": "伯列辛·也先",
          "influence": 15,
          "color": "#4c7387"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794578738393",
          "name": "脱欢的征服之旅",
          "desc": "“我已应允兽怪的愿望，以可汗的身份行使权力，故要建立起以吾名的帝国”",
          "effect": ""
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 6,
      "stewardship": 13,
      "martial": 19,
      "intrigue": 16,
      "learning": 8,
      "prowess": 14
    }
  },
  {
    "id": "c_1794580859586_0hsk8",
    "slug": "雅典",
    "index": 16,
    "name": "雅典",
    "race": "人类",
    "capital": "雅典",
    "faith": "图腾崇拜",
    "population": "117K",
    "bio": "智者聚集于教令院，试图在这里求索智慧的真谛，苏格拉底的根须是那支撑起教令院的基地，可神明的化身并不理解“智慧”的含义，只是懵懂地回应学者们的请求，将其落地实施。而今，派别与派别之间的矛盾日益尖锐，可这位“智者”对此却不以为然，让他们继续吵吧，又与我何关！",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "寡头共和制",
      "leader": {
        "name": "苏格拉底",
        "title": "智者",
        "avatar": "",
        "traits": [
          "轻信他人",
          "贪婪",
          "冷静"
        ],
        "stats": {
          "diplomacy": 2,
          "stewardship": 19,
          "martial": 1,
          "intrigue": 8,
          "learning": 4,
          "prowess": 2
        },
        "bio": "古人定向培育的智慧生命，不善言辞，不善辩论"
      },
      "factions": [
        {
          "id": "f_1794638546307",
          "name": "生论派",
          "leader": "纳菲斯",
          "influence": 13,
          "color": "#5489a2"
        },
        {
          "id": "f_1794638546485",
          "name": "知论派",
          "leader": "卡瓦贾",
          "influence": 19,
          "color": "#b29357"
        },
        {
          "id": "f_1794638548556",
          "name": "明论派",
          "leader": "阿扎尔",
          "influence": 18,
          "color": "#518c76"
        },
        {
          "id": "f_1794638548949",
          "name": "素论派",
          "leader": "居勒什",
          "influence": 22,
          "color": "#b36e67"
        },
        {
          "id": "f_1794638579182",
          "name": "因论派",
          "leader": "伊斯坎德",
          "influence": 17,
          "color": "#7b6899"
        },
        {
          "id": "f_1794638583715",
          "name": "妙论派",
          "leader": "赞迪克",
          "influence": 11,
          "color": "#4c7387"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794638476136",
          "name": "缄默之神",
          "desc": "派别与派别之间，因理想、利益等纠纷的矛盾日益尖锐，而苏格拉底甚至无法介入其中——他完全无法理解，他们为什么要打起来？",
          "effect": "“学城的学者正在催生愚行，而神的智慧对此并无意见”"
        }
      ],
      "wonders": [
        {
          "id": "w_1794638476401",
          "name": "教令院",
          "desc": "而雅典最初的教令院，便是由长久地去追随苏格拉底的学者组成，他们各司其职，协助苏格拉底管理雅典。最能理解苏格拉底的力量和哲思的，只能是教令院了",
          "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAEsAcIDASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAAAwACBAUGAQcI/8QAQhAAAgEDAwIFAgQFAgQEBgMBAQIDAAQRBRIhMUEGEyJRYRRxBzKBkRUjQlKhscEzctHhJENikhY0gqLw8URTVHP/xAAbAQABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EADURAAICAQMCBAMGBgIDAAAAAAECAAMRBBIhMUEFEyJRFGFxFTKRobHwI0JSgcHRU+EGFvH/2gAMAwEAAhEDEQA/AMSKcKW2ltr1KeWztdFIDFKlHzFSrortKPmcFdxmuiu0oU4Biu0qQGf/ANZpsxRUq6UZQCVKg9Dtxmlj9aaKcpU8xOE8wowQ8Z7U0rg8nIpwYpwcmnbaRGDgqc9qRDDlqePObcUqVKlFFSp1KlFG0qdSpRRtKnVwrTxTlKkFpU4iiru2uUqWYoqVKlSEUbtpbadSpxBjdtKnUqQjxu2l8U5etOp5GY3bkU5eKVdp8wTHV1fzCuCujrTyMwi/mo69TQUointTyCyTLbAYc49x719C/gNpUdn4bl1ORT510+P/AKRXzzZv5cquACVOeRuH7V9E/g/4z/jtv/CbuCOO6gTcpRNqlP071h+PCz4bCDjvNDwA1DWjzD6v5frPRFdiDxgDpRI3AGSaiXRcsQMgVGeRulcaK9wnam/Y0tGuIzwG5ppYEcc1UmQk4NGinCjJbGKc04g/EljzJck4U8136hdmelVksu5zg0NpCRipPJzI/iCDxJst7EDg85656Yr5+/GrQotL1tLyCYGO8LPsxjBHt+9e4OgxWS/E3wqviHSkeBkW6gyyEjORj8ue1avhNy6XUAk4B4MxfGtM2s0pGMkcifOMn+nFBNSryJoZ3icYdGKsD7g1FIrvpwC8Tq/mA7nit/4H8a+IbO3g0XT4Le5BO2JGjOd2fcVgEGT8/Fe8/gx4Xh0/RRrU0Y+rufVGHX/hJ8Vm+KXVVUZsXPsPnNPwqm62/bU233Pym2t4tVa3jadbVZSgLgE4DY5pVLyP7pP2pVxGJ3QCT4420ttF20ttdxOYBgwtLbRNtc20oWYzbXQtEK9Mk464qVa6beXAUxQcFS24nHHf9aFmC9TFuA6yCeBkZ6+1TP4TeeQbgxbUxnDHGfkURJtP0+yF1cJ9RNvKxx7vQP8AmqsvtdubmTMkgUDog4AHtis3UeIBG2oMwlV3+6JYw6VePA9ztVI0GSzuBu+1Die1STnDbUIIbjJ5qmfUZbhTGX9OffFRGl2xsZA2/PB3ZFVX19j9OJKNOx6mbdLyzvY411As8MQBChtpHGMZ/SolqumieUuZZkAJjQNjb9z3rKQyyFsGXAIGSelPku3ScjeRjpt6Go11TqMAxhpCuQpmmDLLA0W913HChh6asJtEityoS8SdyAWixjGfast9ZtEEzllIPTPWrIXYvvXFldowxLct8Cm+JfGAZXeqwdDxL2aCC5xFdMThciRRwo6YNEvbf+IyxwyPB5aKNrKMHa3c1W6dqc8dsD5GYVyrZHUfPzU8WiyW01zbsVlXDeX0BX2qMahweD0lVwynrLOHwfo+4ySavO8DLlWRBlWHv7isze6Jf2yyzi3uJLSNsC58s7CuetW7TPZTpBLJJE7KGRXIZdvtWgtvE7GJkjffEg2yISCjD2was1+IWJ97mD8TbWfWMiebYwa7Wo8TabZ3CtqmmqsC4LT25OMHPVfiswq8dc1s03Lcu5ZeqtW1dyzlKuleaXappJOUqW3HNKlFFSpUqUURptOpU/WKNro6Uttdp4jFSpUqUaKlSrmKfEEztKltru3ilAMVKltNd28Uoxjh0pd6QWugc08Axy9RRUoYWirwMUWZA4hIm2mth+HHiM+HvEMN4QjRsdjk9lPWsetTtMtbi9uo7S2iaSWQ4RR3oLUSysq/QiVC71WB6/vDp9Z9d2d9aX1nHc20qyRyqGGPaot1KA+F6Vlfwz0LUdA0R4dSmy8jh1TOdgx0rQTctxj75rgGpSu0qhyB3noK32W0q9i7Seoj2bIzTdzHg9K4v5aTyAUeIB94sU6hb810OO9ORECI934ob4kRlPQ8HnrTGYE10E8EduRS24EYNkzwj8VPB8uiag+oWqL/AA6d/RhvUpPWvPm/LgjBHFepfjbrL32ox6bb+Y0FocO4Ho3+2fevMHBPJ47n3rufDWsbTKbDz/icB4ktSaplq6fvpGwnDivo38JtaXVvDUcS20kX0wEe4nIb7V85Yx1GRWh8P+Ktb0kww2V66Qo4IiI9JPsaDxLRnVVBV6iTeFa0aO7e3Qz6d2felVTZajdS2cMsjWod41ZsP3I5pVxJSwHGJ3YurIzzPlHbS20XbS21285MQW2uhT2HxRQtcK47cfemJwMmEIayRYnFzMuYY2xn2NUOra7dXPmQCQiMOfyEjP29qfrdy7W30qFvzZwp/wBappRIjdWz3zXO6rUG2w+wl3TUA+pusN5jmMIwAPtTWfdlQAAPiggNjOefikhOD7/NVscS3tx0nWQ7OxHtQZBI+AO3HFWVrbo6b5pfLU9D3qRbwW0LbJFEoPIfOMUYQmRm4DtmU4eVV8rkBuOaUhkC8bDyRkVayWyRy8yoyA4yvUVCuEZZWVD5kfY0xUiEtgbpIfnSMuxm+1Sbaa4iddufTzkCmqqZztwRRUnZGx/cMZocQ2ORwJb6Xq80aSQmQqJD/V71o7TVFkRPqW9BjKgKeWYe9YdJPVhtpbPU1OeM+WrpMqgjoDQ7TKFunVjNaJ47u4WWNAZUHpbGcAdqjRtF9W7bNgdsms5peoSWs5IY+wcDNWK3MfBVgNxwOeTQnMp26Zl4HSba2exa3iVk3ADDBuQ33qPqul6dfTvJaD6FlUcYzGft81nIL54ZtuSuDwRVpa3AnZj5qBiRn5qWrUvWcqcTO2W0nKniR9V0O7sYVnA823k/8xBkKfkVWBecEc/A5raWmstbo6bSxK4OFDZ/elp+oWr6ilzJa2gLett0QAx7HitOrxQgYYcyzXrGx6hMXj7nHY0ilavxLoPman9Ro5WeK5O5UUgeW+7GPtVJq+lXmlXX095FscrvHOQV+K0q70sA2nmXEtV+krdtd20bbS21PmS5gdtLbRttLbSjZgdp965to+2ltpxETAha7tou2ltpZgEwW2ltou2ltpZjZgttO28U/bSwaeNB7acFp+3iltNPmNGheacBzTgtdC80swDOAc04Cu7aeowacSNolGMCvUPwKtNGbWJLq5u4mvVG2C3cf/cD715jxk1Z+GtSOkavb6gIvN8ps7R3qvq6mupZFOCY2nsWm9bGGQDPqaY+n4P+ajnGa898N/inYXuotbarB9FA3/DlzkD71vbSa3u4hPaXMc8R6MhyDXH26a3TnbYuJ19erq1PqqbP6wucCmEE8UQrxTHyBxUYMJlMbwOBQpGxTzn7UIrvIHcmpFkJ+U4WJ6UeIZBJI6YrLeIvGWgaFKbe4neW5H/lwjdj71caJrdlqGnQXYLWxmUsscp9WPc1I9NgQOVODApuqawoGGR2jdW8MaPqumPYT222J23kx4Dbvf7/AHrwDx5pGn6L4jm0/Tbz6uFFHqPJB7gn3r2T8R/FOlWvhy9tbfUYpbyZPLRIpPWP1FeBPuPfcSeT7/NbngiXAF3Y49j+swvHWpLKiKC3cj9IErXMEflB/Si7aaVrf3TB8oQw1HUVAUXt0AOAN54pUHbSoML7Q9p94zbS20TbS21VzNXMHtOabJDJKpVA2cZ4GcUYLzUu3ZobGWRcliwHA5I5qrq221kxixHMxmradPbuXeRWc88GoDMQcFApPernUpn+qcMjKB0De1VUshdsSEN9x0rnwAeZr1M2BmCVSASSKaAxPHU9DUpfptgypODyRTmkiExRdoGcg4o8YELzCT0jVx5R8wnJ6YofmEEKgOO/NPkUtGMMP0qNGnPUjFPmOADyZME+CGYZx1BOc0BJGQuM43c7aYY2z6W4711xtHCnPemMfbOsw64Gf8UKXDRkk7WHI9q6rBuG4HyKbKrheMbTwT8UGfeGBgwjpJEwZwAWGRjvRobk7SjlT96a0quBGQGQAAYHSo99A1vtnRh5ZOBnqKLHHEYAOdrdZNf6WYFsBT22moiSTwOVWTK9RTFlZUGCee+afGDKD0cdxUbZMJUx15EsI9UlbaWHqA/ep9hq/rVZgQWPBqjt2WJykkZjGcox7ferW28uY7ZUV8c5odoIlPUaescbeJei5fqg5I4JPBp51OOCwnW4kRnKbUX71Vpdx7pLeb0vHjaAeoptyn1YWESLtXBBzz1oVVuszl04B9QwJb6Rq7q0KOQVQljjj/8ADWijMfiCFLFpIo7hARbO/GR12msTqml3Flbi5jdZUb1ZU/lHsas/C0Q86K6v2kCAZjKPznNSVs9bhl6wbaqwPNrMU8DwzvDIm10cqRnPNN21r7nSdN1S4gNtcC0YqTcu4yPuKqtd8P3mleuTZNbsSFmTOB7Z9q6OnVV2YGeY6XI3fmUu2ltom0Y70ttWpNB7aW2ibaW3mlFB7aW2ibeaW2lBg9tLbRNtO28dKQigdtLbRgnxXNvNLMUHt4pbaLt4pYFPzBjAtLaafg0sGnzBzGgGuhTmnBTXRxTwWi6E04U6CPzGwRx71NhtBMwXlNvVgO3vTM4WB5ZbpIaHpnjnmvSPAPj230q0s9Jk05UTd/Mn3Y6nqawJt4PKMgmYjOF460ExFGO5hn2xUVtVWpTY8GtrdI/mJ1n0Jqvjnw3Yx8aik0jD0xoOSfarPS9Rj1DSob8q0KSLuCvivKbjwDM/gq11HT45LjUJiHZQfzA8VjJ73VkxYy3M4CHYY95AyDjGPvWNX4ZRcv8ACfkHnM2LfE9TS/8AFTgjjH+59A6rrOl6bCJL++ggQ9CWz/isP4h/E+2iSaHSbdpZMYjmP5fvivLLj6gTMlwX8xOCHPIoLLmr1HhFKcud36Sjd4tc/CDb+sLNdyzXjXlw4mmZw7M54JznH2qTq+s3+o3JmllMYwFWONiFVQOgHtUDBznvXCpznvWoQuQcdJlgMARnrGtyeevUmmMM0XbXNtOWjhAIPbS20QqaWOcjPTrjilmPgQe2lRDsBILj96VLMfYfaM20ttEY28IzPcBUwTuHO77VGGoWs909uiiNkHp9X5hjr96zjegYDMtg7ukLs+cU5iXt1hAAKtk/IrkLxzxmWNsoDg+rkGihSQWI4HcUTBbBzzH5lLrGnBz9Wsm7OcpjoKzs0SklgpXNb5lJtdkYBbOW4zxVHq2lBt80cZ4HCg1jXacq52jgS3RqMelplSCvA6U1s49PUVJe3m34A59qFJAV4dSuR1FQTSV1MYkjLjn9qNCVkB7HOeKhMhRvQSfvRbSVY3yxIJ4puklarIysPcqRExjJ3LzRbby54w5GeOcdqMBuG7qCO1Q3gubSYvbKWjbkrSzIVIYbM4MdcWpdCY5CoH9JqKEdQRu3EDkdjR5NQKqRLbsrHvQDIPL3bgT7UxOZMqWgcicgfGVzgD9zT7nzprcAbfLVskUFwHUSBsMvf4pksuIyFOcnNDntJUqLMCJJkRvSNvGK5aeb5jCNCSO2Kk20aTqpdguRng1YaYxspcxYdt3JbuPan7ZjrXngyKR9TayI/BI6Y/zRdMlSO0adyTKCEUA9RVrew2lxIswBgdshwOmKy960dtcyLbkMA2F561Hu6GC2kO0qDxLI3atfRSSEAqMZxRY7iISYBOAeKq7ZWEfmyAtnoPaiB+Dg1JkyrbQAds0Mt6kg9MgUYChe1OtdUa1kMgIJbgE8iqBJAF44H+9NLEDqeOajBMqfCL0M2tj4juipjJDhvzAjqKv9M1SK4SVLiVQrAehhuHHxXmdtMV9XI96tLC+Z5Qigj9aWWHMz9VoP5k7TZXWkF52+juI5VOOCMFd3aqx4WjleN+HVsYJxzRLW8aJ03lwezD3qz1FP4mZb1ZgJEiVpVZcHAwCR8kmtjR65nO2yV6r3DbXMpdtLbRcZ7Utta2ZdziC20ttF20ttLMbMFtpYNF20ttKLMFg0ttF20ttPBJgsGltou2ltpRQe3ilt+KLt4pBaUGCwaRFEK13bxT5jGGgUi2ZljyffqKdDIHjKknnr806xvHtfMVUDeYhXntTUQpO6+1QkE5zDyOMGFU7WDL25qUiw3d1KZgIwUJBx3xxQI03ehgfVwDRLyaCOM21qu4uuJHYcj4FR5JOB1kuFCknGJqdG/EHVbDT0thHbhbaIqg2/mx0rGX08097JdSHdI8nmNgcbic12Aqq/zMD3HcUyZleZ2UYTPpo6KK6nJVcZkN91lqAMc4ivrme9upLidy7uRkkewoWDTse1LBq1kDiVNsZtNLaafg0sH2pZi2xm013bTwDXdppZj7YILxznHwM16v8Ah8fCFl4Im1LUYYJZ4pMTiZQST2VRXlu3nNLaeBk4HbPFVdVp/iE27iOe0saW/wCHfftB47zT3OuaLJcyyReH4xGzkqPYE8UqzOG96VD8LX7fmYXxL/sCYOe5eabfIWIwACO2KbJOiqu3jH9Xeq/zzygGAa6GPILZrBLzVFMsre4EALpIWz1APTPep1v4lvoAttvYwHgqVGD+tZ13IG74xRNzyoqLhwOmadbCBxGbToeSJvbG9t5LJGnuRDcMAFUjg/qKlBGxnYxUjkjp+9YCOUqqorEKnTnpVxZ+I72ELG0rOucbSRjFXK9YQMMMyjZpmXleZoktIFJkWFA3UnFRvEUELWfmGNQix+nAxk1yx1u1uZGV18tieMNU67txPblCPQw471LYq3V/w+0hDMrAtwZgJLcZ5P25zQ4wIzsYKQeM1om8PXClwNrIDxzg1Eu9EuYofNMYVSOAx5rNat1HqE1U1CdzKryZY23W0nHdGqXa3O9hDIoSU9qBEksRwv5v7Wod4lwSs5i2lOcqahYSzgXeliPr3lsI434IU/cVH13SlGmi9t4Qqq2HwetP0/U4mtlV41OMkg96NcX5mgaONFVW6jtRKmeTKKedVYD7dZkgSg45GKmoLa409twCyxjP3p8ujyjDwyAg/wBJFQ/JkSaQONrImcfrQlcHIm0rq/3TJ+gSK26Nh0bIyOlW0ltubPIUnn4qhtLjyZAdmCCCR+lamRw1sHUjLYIx9qFFDR3sZSBIswljgZ35wp6+1Z23XzLou0bMFBIAHFX/AIguEj01UBy0i4zVfoERdrhz0SLGfmnK4bAjo7Ebj2lmtlHcWRKemRRkLuxkVV3FpPBepBKqoJE3Kc/4rZaTp8ZCzEBsjpjvVf40hVFtrhIiPKkOeP6SKsJQfKNhlHUahDcEUTNpC4kMfXHOamWlp56F9yALzzUPzC86lGBBQ9KUErMqRIDtGSTUA2wXRmXPSSJJU4RMNjqcUW1Vt4YALj2okbS3RC+WuAPSoWrW102QRBmQgn3pHPYSldeqDBk6xAkgjXeCc+onsKsYwVtzEDuycFs84znFVS27cBHA+xq4tVaeDLLiRepHQ1Z0LILPUPpMkbQ+cwWPjvS20Xae45pba6DMs5gttLbRdtd2fFLMbMFtpbKLt+KW2lmKB2Utpo2DXdtLdGgNtd28UUiuYNFmNGbTSCmn4NLBpZijNtLaaJt4pbaQgmD2804k9cnNO213BpRZnTI5weRimHcSDnp0ru2nAUsYjZMHg0gDRSppBaLMbEHtroWiba6Fpu8bEFtroWiha7tpRQW2u7aJtpBaUYHMHtpBaNt+KW34pRjBbfilRdtKmjTyaW1kjwYpN33FBEpVyJo2Qnv2qxcKW9L59qizjcdrHg8c9q5ZRmdSlgP3hOxeW4AI5oUDGOR4xz7UntrhBlSpA70JY5GbzRg44JBpE/KTJUrZAPBkiRxGDuNcjlLAYjYj3xXI0VpCzEfY0fBHTgD5plO7mROipwRzEspjbdGSGzmrvRtY1P6gbZS5YgFXOQR8VSghhxyftVnpGnT3bboNwkUbhg4zUtYO7iUr1Qj1CbxEYbSyHOOhFcmjEqKrAEDoCO1B0eO7j0+NLst5gJ4LZqYVrbA8xBvEx+8r5dKtJjnylXnt1qLqGkWywOI43CMOR1q52/FddSYnUNtLDGfao7KFKnA5h72HQzySZWsbx9uSm7uO1TrbULZh0ww7djWh1LQpVJE/82NsncDzWS1DTDFcskSyZAyKxmQqeZu1206vCscMJo7F7S9jIWby5E5wT1qsvohctL5SgkJtDDv6qrdKaT6zyZfS2OKvIIXETSocYOAKAn1CS0aPyGJz9JT69bC3aEENuZcMf2omkarsZIbkekcA1N1CylvIhmUFhk81QXdvPbEeYmAOp7UjkNkS6m1htaXniQr9PC8WGGeKXhxS9rcL03mqgO7Q48zK9hU7S5JYUIQgA/NR78HJjbRjE2dtqVnY2m+5uUVlUcYOSao7zWr3VLkW9nDuB4SIAEt+9Z/VHZ7geYS2RgZ6VaaHfQaTOsv/ABZ8cdgtTG92rCdBKV2mAJsVdzdhI2oaRrFpewJcWLwy3JxEvHr960uleH5Y7AC4QCUdUz0+9V3iTVzcS6dcxy5lgcuPjv1rW22r3huUuHk3RsBwyDBBFCj1g+sZmbrdTeKV3rgnrA6Xp300m90UFRweKsGQMpB5BqVb6nFd3UaT20BU8Er6eP0p95biO7ZY43CE5TPcdsVqaNqWBVR+My67A5MrIrWKMsSqkH4o0YKLtXIA7CpMsMkbgSxMpPQEYqTa2SlRcXb+TbqcvzhyPYCrGyikbsQia0GSZWBecbf3ru32GffHStFapon1zMbeaSI4Cxs5xn3JqZqX8Fu1NqtlBbzH/hyRE+n/AJvcVH8fXkASL4urOMzIhMe9LaautU0VrK0FwLyGfnDInUfb4qq21aSxXGVMsggjIgttLaaLtpbaOPBbfilg0XbS20swYLb8UtvxRdtLaafMUFt+KW34ou00ttLMUFtNLbRgtd2fFFugnrAhfiu7Pii7aW00t0YwWz4pbaKFNd2/FLdFBBaW2jBOOlLb8U+4RQQSu7TRcGuhaW4RjBBa6Fom2uhaW4RoPb8UttGC10KaW6MRAhDS2UfbXdtLdBkfZSqRtpU+Yp5Eltd3c6xQwuXBAwFxzUvX9KGnrH/4pZZmHrjI6V6UIkHSNRk84FZ3UvDBvZ5rg3bea35QF4FZTaXaPTzNNNfucZ4ExK+YqJjpxyelBKywyMUAwx6AZzWkufC9/byLHFGJ48dVOKtdN8JxGAfxF2YnkxKeB+tVvhnY4xLg1tKck5BmBbehO+MoxPcYp8Ev9Dqxx2NbLVfD9zZRsLZReWWc+S49aD4NY67RPPfyEkjUHG1+oqrbS1RwZo1XJqlOP39fnJaW8RcOsxEW3ccnmrjQrqwsbmG5M8zDo3cY+1ZtZUZljk6gYGRRvp5hmSIgqMcA1JXYBg55lS7Ss4IJ4nrEQR41mjwUcAg57Yp2K830fWdQ0q4kZB5kZG0o56n4rRQ+MovLBuLNlfGSEbNaKa2sjDHmZr+G3ryBmabb3JAHPeku1olkByrdD71m7jxdavb4tbaV5HO3DDGAarl1yWzeCMltkSB3z3J6ihs1yKwCnIklXhzspL8HtNsUVvzqCDxgiod5pNrcMztHhtuMrxis/D4xlnnCJZptJzuL1Xa94ynZZLOCARMW2lw3UUrNTQR7wU8N1AOMYnNYsLfTtSSVZUd/jnimz3kZjdITtbIxgVm2vyCBnLnuTkmmTX8wbaHxkdqyi2ScCb9NJRAjHOJpBeRq+4ByncVLtrCDXfMhafyAnLZAy32rJWd3I1zEHy6bxlfcVeyXpiuFaCIIYySMjr8H3pi5xgyvq32DCcH3l7J4S0OKxMcc1w0jHKylh6PjHequTwtfwpGweAhwxQb+SB/vTtP1dllCzPxIeD7VcC88zbGz5RiCD81AzZ4mENXrdOcM2czEalDPbs0N0hR1PI71Js1hlQNKgLIvBNXXitbVg90NwdyA0fUfemaXooksY9SnulhtWXbuzn1E4GaHzAuATjJm3TrDZRuHEieINNnttMiu5IkjR5QFG7kjBq68OLJdWkab2d4l5Bbt9qqfF8WrW9nbfxBhLB5i+VICDxjt+9SrcNYC21KzlzDKuM/2t3U+xqe0ItgDCVWR20mSecmaGG1l3li4iVT1ParuLUbdICUu0lnQBVDDPp/XpWL1XVrmXTBKTt5xkDGaojfTshAbqMEnrijFgrJCzHXQvYCTxN3P4vns7wB/KcjuecVDv/E738bku8kmex4rDTzPuG8kA0SFpgp8o7Q3fHWoyWMsfZlQAzNza3crQF2lbzD1U45FEh1Nlc4b1Yxkf6Vh4r++ilZGTC+Xwx96mWl3ujUGQbj3+aA7hK1vhm3kz03RL2S5haJpIwqoSGdefhajbe561ndGvZrbJ8wqOFx2z71f2F0byUx7fWOSfetPQXquUaVah5JKmO2nNdCUdo2VtrKVb2NJ42QDOOQCMHPetfIl3tkSPtroSi7c13bTxjA7KWyjba4VpRoIr8UtvxRgtLb8UukaCC0goz1o4SuYx2FKKE+mg+iMhl/nZ4Wo23vijFciubaFQRnJhOwbGBiC20ttGCV3y6PMjggvFc2mjhK7spZigAhroWjhK7spGNBBM9q4E+DRwppBKQjGCC13aaKEroT4ohiBmBC13bRdmKcFp8iNAbKVSNnxSpbopX4OaWDRtn3roQd81FmDmAwaQGOABj2xRyg7Zrmz70swoICqjXvD1nqil+IJwMiRV/N96vQntQb+OV7OZYT/ADGRgg9zjio7FDqQwzJaLWrcFTgzyTUdPntirSowRx6HxwcGoStNExKMcV6nowstW0SOxmRWeJPLmj6PE3fg/NYDxFpkul6jJA0Uwhz/AC3ZODWPbp9gDLyJ1Ok1a3sa2GGH5ytF1vGyTLHsaZvcSE7TgnPFPCI6YyN3auNG4HoOM44Pb71XwO00FpwYdblkQZPq7ZHSnSzGU7pZc/YVFLscb0OMe1DZiDwOKj8uCasyfYRubwOuNmDnJxVTqDl55GJPD1LEuUzg/pXJjE8RBQOMe+OaNDjrIwCjcw1wlsujwy+SDI527s81Es9Lmu4GmjZAF/uNEuZGezhhCfk9jmnRyTxaTJGI8JI+M+x+aIGShpBlVraVVLqTjO5DnFWNvrE0UTLIvnc+kmqgKfMYgEfA7UQFWTnAP2pEZgW1rZ94ZlrFdpI6uxyA+5gB0q3stTtnuPLM48vHpGMc1mLNQLlFDHYxwwoiKzXrAArhioGPaoGQFjKl2jRxiaLVbiW4Z4oAHjUctnj9KsvDlxY6rpv/AMOTrLbnYP5gXjKtnJFU1lLII1AjYYOCSOhrR6DHdW119buXc6bDwM4zk1R1m0V/PtIqVCegDgd5N01L230ltIurRb6SyYK+V3FechhVHo1zFHrZ0+5YyQ3e5ZYiMeXIOhrWWk/lie6WbZO/HHOT81ifGVi8HiGHVbImTzyJmMY5Vhwc/rQ0akXgrYee3tJNPQq3ZzwZb61pdpbWvk/VvJKuSVCnHxVAkStK2I3VFXr15rbxaaureTeLdBFYAzJn1Z+RUyfw9b7WFuAuBnawrWppe5A6iY9zHTu1ec8zzS4Zo1KLkgjPI706K8YBc9QOlb2bwz5tlMHjVX/8v3zWFvNG1KO48iK0aWXOGRetStTYmMiWKLUt9LcR0LpNJvmfav5eT3qbFa2c1wFibapxnnvWbd5o2e3uImR0JVlYYK/JrUeCdON9qZhZgFjjEjHrx7VAAzPtHWSajTtWhcHpLWKykhVmG91x3HH71KsoJo3SSFZkduCcVqkt4liEQjG32oiRhRsVR04HtV9PDueTMFkLdTATzskBkndSUAGScZ4rmlwytpEFzJHhmZt4Vgcc5HNUerXGnanfSWv1JAiiwCD6BITxn3FWXgvxpaWVrNaX1kEaGM5Rm4YgHP8AgUr70qdSGPp7e+Zr6TRuaSgTOe+cYxJpXAAHauhfiq3w3rA1iGaX6UwBG4BbIwelXG2tRX3DImcylDtMDtpbaNtroUUeY0CE4pbaNiuYpicxjB4rm2i4pYp4xjAvxS2/FEANdA+KUaDx8UiD7UXb8UguaeKCAru2ihOK7tpRQe00gtGAz2pbaUEmDC05VJoipRBGR2pQCZH207YewqdDY3EwBhhkkGeqrVmPDWqBA30r89iMULWKvBOI612P91SZnwhNIRmr6+8PanZxLLNauEJ5KjNVojYcMpByeMUksVxlTmR2BqzhxgyJsNKpfln2pUeZH5kqdvxTSDRwtLbUcPMAAadt+KKFpFaUfMDt+9dCkHPJogFd20jHzKfUtDs76UT5kt7lPyzwHDfY9j+tVtxomviMw2+urPEQQI7qIEkfetSVPt/iuEcHOBx2qNqlaWK9VYmBnP1GZ5jp0Oo21xc6dHomnX0tod0m5DvIPcdsVDg1G2j0d4bnw+MtMx+pUcA7hlSfjpW58T6WZ71rmCea3ma0kVXibG4jBw3uMA1DttB2WGlu1/Nc2oljKW5QBMMO4A5/WqZpIPE211tbKGbvj3HP6TIWmn6bqjR/T6glvczSOWhk4WMf0jPzUbWNH1DSn8u+h2KfyyL6kb5DV6Dr3hjTNR1GGE2yW4eF2MkK4bcCMftk1A029n0S5OgeIttxaSf8CZxlWHsfao30+PvcfOTV+IkjcnPyPX+xnnu3aRjIz3NBmUjgcCt94v8ABtvb2rahpTFU4PldVOf7TWQg02+mWULbOfLXc2Tgj9D1qtbU1ZwZfp1dVy7gZAhJ56UdJX8toy52Hnb2qy0fw9dXcgedha27jCu45z8jtUO60rUIZblBazyCDl3RMrt/u+1Qsp7SNrKi5UMMyAGBJJXPPNSQmmNattRvNB4HaoSt6SNwww4IOcimxttzimKnqpljZ7STCtsHYiL+Yq+kg8VK1LNxFFqEJ2BgFkUdVYd/1qqMjBeDj3xRoJysTpuJEmNwPx0qJ0JOYiJKl1F2YMTlsANz1rUaPfKIopCxKKMsCevxWFwhn3E4Gea0GnbJT5Ec4SMjOe1M1CvjdK2oPl1nHeaa58Qie6M8UESE4AKcbQP9ag3s63XlzXW8GP8AKFGA4+arAs5nFvAPPIOVCADNWIlu1e3trzaoY9AR09qsLtUYxMVgVOQfzkL+J31vcNHDI6q3QZ6D2q20bx9q9pN9Pdy/U27elo2UZA+9aN4dHurJfN0+GSVU2rJyCP2rI674Ye2hm1OKVfIjTJXHJ5o7bjYM55EenU6XVLscYP76T0yHV9MlijYW0ysyg/nB5xmpTRKSGRfS3IJUZx968r0PUY4VDy3S7B0y3A7Vbt46gsrZooka9mz6Bk7R7fP7VJptY2cP0lA6DUV3bF9Qk/8AEjRrW60d9SVB9VbEHeOpUnBB965+HMKC1EoASR4VRlPUkdT/AKVgtX8V6zqzNHdz+g8eUgwF5z06n/8AOKsPBviK609JLdm3PES0aNxj3Bz04qrrrW8xbqh0/OdFVprE05rsOcz1xcEEmk8YeNk6BgRz3zUTQdVtNasVu7YjI4df7TVgV7Gt2i9bqw69Jz1lZrbae08jn83TDfRBQxSQqFb33f6YxRrm2mubEuozJM4/+44qz/Ea0jhuppx/52xiPnOKvfCdhFeapbwSqAm1HX7jBH+lZeoxUSfnOi0zecqn5Qnga0+m0fzNu0ySFsH2HAq+xyf8U+K1S2j+mThYztFOIrYqGEAnPXOXsLGCxXCvNGxS21JIusFt4pYouKWKfMUFilijBaWz70+Y0EFru3Hai7fikV+KUUGFzS20QLTgtKMYMCuhaJiugU8UGF96dsz0BzT9uaekbOQoJyegFKCT2g0UscDrV94d0C71G5GUZIu7Edam6RowWNZHQMx963Gju9uiKUUKPYVm6vWlFIr6zT0Xh62OGtOB7SR4d0GKygUbRxVzLHATg4JFBe6j8g7Gwar/ADXJyxya5s+ZaSzGdTvShQiCT3hRztyGXuOuay174As55nkt7x4ixyVK7qvYGAlVjnHfmprysz5VjiiS22g/wziQW006tf4y5xMkPw7gwM6hLnv/AC6VbDzv+WlRfH6z+qQ/ZGg/4vzP+5877Md6W2pTQ47UvK4rrt04vGJF21wrUry+K55fxSzFiRgmK7tqUsWetIxUsxSKVpuwdxUpkPtTChxjFPEJX3cPmXEAUf3jp7qRUHQ41OiWMJHrtpBG3/NGSP8Aar4Rnj4NV2hxDy7slf8A+ZKR8c0JHOZYR/Rj2x/n/cO0ObmObuiMP3//AFUbWtHtdXsWtbpOCPQ4HKH3q0VB3Ga6ycYx1OKRAPBgq5Ugr2nm2paD4q0uyljtL8XdkB6oyedo+/T9Kqn1iee2iE8CQ+Sg2+5P+9etXhgitJJHljC+W39We3tXl+uaes6QyW0kJeRQQR78dRWbem0+iX69SLhhwPrIFteys26QkKTyFGeK0NhLI8TKWmjt3CkYPLcg4x3FZu3sZN7IVZXjALgPgAVpLbWIoliiKqFhUDHU1VZjIdV6fuCYPxLZTWmpNI8IiinYtH0wefjpVO+QQVwR3r1zWL3TdSsRDeW0bRY4wMMo+DWD1jSLeDSY57FSxaRsjfkqo6E0AI7TZ0HifmqFsUg9Jnm/MSDTlI2/NMLAAdTk0grHICkt7UjNfrOry54o0LMjq+70r1FTLTRb6VfMKpGG6FjVg2gwGJN92A/9QUZzQgE8yN3UjaYtGvRb3ZnywKLwRz1rmp6l5sytBGjbOVXuDXZbdbGy/wDCoZCc7y5wf0qmheIT+Y8RODnhsGkQn8xlEaRGfzJsNH1uOSBIgQkvQq3UGrSW6aW0kWGVXfZgqxyp+DWJc6XcnJhlicj827/pU+ys9Q0gQ6tpzedbh/5gzu4+VqtYy18hsyt9l1u+5TiUGoRyRX8mOAXBA/2x+9bD8PdPjWIXpjKXXmrtuJFyseDn056HtW1sfDPhjxZp0F3YahLZzgEyAwKxVvZu+OtUGtWmpaRd3tjLMXjtxmN9h2yL7r+36USammw4U/2mhrqrvh8IOveaNNS8O+akr6TYtcCUO0piG4tn82feqrxR4etNXlOs/wAQFtd8sf5IEbJ7cdTWRtNRYFncqM4AzV9p+tMtoyTsZUjIcKW4GOp+ftUjHInNivUUOGViZD8G348N+IJLS8VhBP8AlAP+a9ZkhKBCGBV0DqR0IrxzxqGutUtJ9PRnBYbQF6E/016n4ev2k0iKHUI3t57ZcTI/VB7/ACKgq1raO5c/dbg/LsD/ALmtdSuqoFg4bEy34gwpLewpKMoYwSM/NaL8M7eKfxTaRyHCGM9O2FrKT67NqGui9Wyiez3NAoMe7eo/q+D9qutFgdLS6vreS4t7+PLQ2+3HmJ/6W9/g1e1wL5HvLOhzSF3e01U6/wDiJf8A/o3H60wr7VW+F7261BJxdRtG8cmFDfmK+5/WrfYTya2anDICJz9tZRyDBbaW2jbaW2pcyKB28VzaakbOKWylmLEBg0sH2qSkTM2FGT7CjiwJVmNxAFAzlnx+n3pmsVepgsyr1MgAfFLbU+azZeYmEq4ySP6fvQAh70g4PSMDnkQASu4o+yuiOjyI8BtNOVMijCOnBMU+6NiA2Yqy0JYlusugY9s1GC1YaaIon3seaCw+kwqhiwGbrS4FkjUgVZpHgYAqs0K+gkiVFZQ1W6nIJBrl7iwcgzrqQjICI0RYGPeuhMdadkY5Jrm7PTmosmGQoixiuhmyOSKaTXaWIvpO7jSrlKmg5M8dKhq75XHNTPpR2NFSEDopf7DPNdRuGJxuwkyEsKSelhg+9MktjHyPUK0S+HNQngWdIgN3RS2CKLB4X1ATx+cAiFssQ3Ss0tss3pb6e6nn8PaW/grmAHlmZYRA9u3akI/bkYr0/TNA0i2RkaFZS3UvzVRfeDrmW+d7VoEgboC2CKlTxGosQeBJbPBtSihlG4+wmFMfxTPL+K0Ou6DeaSQbhQYzxvXkVUsnxV2uxXG5TkTOsqepyjjBEhlO2OlQ/D8JmF3GMArdSf7H/erQxkHNBtrcW/mlCcyStIT98cf4oyTjiPWVH3o1otpPTg4NUWv+IrbSJJYJ4nMirleODmtGE7Y69awX4haRqeoatE1paSOCNu/+k0JziOgDMB0mQvdVubpZWMjLuJ49gaBDNKAu3KgD/wDMVLfwrrcjCL6eSOTO1QT+Y/HvVLcXMtq7291EySxnY2euRVOw46zWppFi4r7TSzSWurW7zJI0N5GuJl6CQDv98VWX0IstNn3lzcf8S2uAf5bAdUPscVTpeSRszxtnI/qos+vXhsWssJ5ZGBlc8YxWcq7OO0v2afc6sAPnI38UkmGJG2tyCpPFCkvTGrKvG4Y+4oHmRnjaeOmRmuvscgOvGM5pFsSY6ZAeBIkIDStkYjJyfiplnam6uWitFLNnIOegFO8pfKxtxuFTvDjQWl07FiskqbQT0FAWzDut2Vkr1ll4e0jWrx2QSRRbM/8AG749qn6lo+t2cv8A4e3S7XgZj4OSKfZa9BHNs9L4JyM5q3sNRllgMpwoQ9D3od2Jz12v1aNuKjHtMDr0F/ZzCPVoJoSQCvHGCffpVWbe2dS0V2Qf7XH/AEr0zxPdRaro0umyzRoHw4JGSMV5trWmfQ2Ud3Fd+dE8jIqsu1uO/wBqYAHkGbPhuuF6YcbWk3SNGXUbaRoL+MTxDIjbjP61ES7uYGaON3ifO0qG/wBaiadePGQyybWHcd6kTXCSsGkiVmHOVOMn3qIo247uRNIriWdh4j1OzuI5obp4ZYzgMg5P396udZ8c65rmnNYz3cQUjDbIwrMPb3rKM0DL/wDLyZ991WOi6hbW4EFzaQPbucMCvI/+rrUT1gcqvIiCvjCnGZWtNLAyxsOOgyKs419CT2vmbM4lX82D2YfBqx1e0h04xTNCt1pdyf5bj88bd1J+1OOjmWH6jw7eFwQN8ZbDgD2pjqRgdv0lW1PLO1hOw2urQmKbyi39UchztqXqnijV7uwaxuEiDFdrTIuCVH9Jqv0rxHrGlOYLhmkTOGWVc7a0uj3ug6pPm4jjt5GGDJGMH9ulQPZ5TiyxAwHORAwAu0CZC1vJoseTKyDOQFbua0EfiaexsRMsjGR22I3UA9zRvE/hKW1Rb2zb6q1IJEkA5B/9SiqtbWXVNOgS3t2e8s1EcsCclgW4lUdweAT2OK3qtbTqqwynr+UFaMn1c4nsHg6ez16whu0KQzuu1mzgK3sfg9c1bXtnLa3BglA3YyCDkEVifww05tB0S/1jV7wWlpHGfKhYbi5HU/bkge9UWv8A4l6nqMhTTIUtI9u0OfU+PfPapdE7F2RTlR+spa3RMMHGM9J6Fqd/Y6bB5t7cpEuMgH8x+wpaTe2up2Md5aljG/8AcMEc14xaw6prd9hRPc3DDILtkkfc8V6h4Gs9RtbprOazkjt/p0CsRhdw61fttCMq+8pnToEYluRNHs446UgnxUye2khYK4DZGQVIIIoW0e2PvRhgRxKfWVWuXcOn2TzzK+0gL6DyCa83v9duLrUJFSZlQcDPsKu/xRe4hnjWGZyjrmRVP5SO9YSMyyuxjBYkZJPYe9VrWBMFdMtuWeeg+GvEF1vjjWc7gcFi/b7VtUZZcOrrIG53KeK8j0M2vl+ZJnIHGDg5rZaBr1rZWvleX5jd2J5pq32mUGddM5Haa3ZXduBQLHUba7C+W4BI6McVN28Zq2rgy6jrYMqYID4ru2ihfanAfFGDHIgQtOANFA+KcFpboxhLC4a3fduIx7VrNI1cPGoLF2Pasjs/ajRF0yFcr9qq30LaJZ0+rejp0noMEwlPUA+2aMoOSAKw9nqF3bABX3jvuGa1egC/1GAzOPIQ4w3vWPqNOaRknibWl1y6htgBzLIL6ck07acdKsIbVAAG5wP3oiWMeDuJPNZrXgTXTTsZV+n3NKrn6SH+xf3pUHxKw/g3/f8A8njcSNLIqR4LMcCtppemxWloke2MyEZZsZOapND0S+W6WebMIiO7nkmtaATyeRjvW1rbgxCqZjeF6UqC9i4MEFGeeacvXGKftOOldQc1Q4muBiPWJv6QR9qkwQyg55wKbAWByamRvzg1XdjJkUdZF1e2in0uaKWLzAyn09TmvIruCSGV45EZCpPpYYIr2s7SOCAMZJrynxGfN1q6cNvG+tLwewhmXtML/wAiqXalnfpKQjjpTClSSmRnn9qYVrfnMASOV4xSVcYx2NSNlcKUoWJVa7ZSXenMLeR47mI+bA46hhzivA75HN1Kt6hSTed+QQQcnr+9fSBTKke4rNeMfB9jr8ZlGLe+UeiZR+b4b3FROgYTU8P1goO1uk8KlgK8xkEZqNIhbOO1WeqWV1pd/LZXa+XPEQrjORz0NRZASckbXrPevE6dStgBEgqFVhuJp+7Jw2QDT3RZELLw4PNDfdsUjmoGURmAM6zrjG5uOnOafHIuzafUP80HygWBCqc96QVQCQeR1yagYYkRABxOzYRxg4z7VK03Wr2yYxo4dSCPVUOMK5Ktknsa5JEynhee9DI7a0YYcZlpDrc0NoY3KvKG3FmGSfj7VT3+oPPOrgEEKcg8jn2HQU9kOCWAx79xQZEwOeaNMCKiquttwHMg4P8ATmpNqZJHWJPzGlhC20g0+ArDch8kY6Gj4J5lvfgcRSSSRsVOCVODxRI7kSEAAA9MUxUeV2dcYJyeaY67eg2tQEL2jhszbeEL22ubGfQ9SYeTN0yeQexB9/8AaqLUbe/0TUmhDuhBzFOhwsi9iDVTFK2VcMQw64NabTfEET262WqwfV25GCH7exHsaqNW1bFgMg9RJrAtq+rqIO31RLxBb6v/ADGIwJv6v+9K40a9gj+rspDPEOQYz6sfah6no8Ty7tIlNzbt6tjH+Yh/3/Sm6Hrmp6HfeoM8SH+bC65wP9RQbcjNR/sZSFQPHSaTwb4sktHCPc7dvDBh1+MGvQbaXw/qEI1GAxQ3anaxjby5EZgQR9mzz1rzPxDbaNrFi2raTLHbXI9Twk4Df9KqFS/Wwtr22m85lOSA3qT/ALVVXQjUNvQlT3iUbepxNp431W4uLe50S7nSzNo2FjTO2QdgD7gYNY2NWU4Izg8Y6USS/m1W+DXSpJN5YVmHBYgY/wBK4mDc48jHloA6hv8AJrqdJjToR2/zKuoDvyx5mv0SY2trFEVIdR5yRxtwTjGT96vU8XalHJAWEinO0YByfisFbm7RxcKvloDlCT1+BTotXuEmZizZ/pzk4qFrN5zOY1GhNjEg5ns1hrjLGJLi3jEI5O/rmrdJYLkLJbEEMN2AOAa8k0jVHmZTId4K59R6mtToOvXSzpamFCpcYz2FHVcAZmV2PQ+xukja/wCE9b1HV55nuIjE6Eghuo/trM+IPDN7pcTTJE+YgqyGP1gA9yBzge9eleLvEMOiwsiNE1yVyq5yM/JryvVPEWrXupfU3FwYiQAQhKqQOx9xVhtpmvQpz6egliPDV9b6W1/HcwzWLBGaaOTgAnnj4od0LCzk8uK7Mo7EHk1URa3fWsdzZ2switrjho1GVI+KiWts0p83zFwMk4POaDgxX6bfkscCbPTGuWkWS2kDGPDYboa23hzVrvUbhoZrXYUHLA8YrzKwvY1g2q7BQeM9zV3Yatc2zedCME8Z/wC1SIxHSYbCzT2ZA4nqAU/1DFdC1V+G9XXU4QHiKSKPUcen96ugtWQ2Zq1WC1dwg9lOCUQLiiBeOlItiSERiJmrbR9Evb9gIIjs7ueFoGmRRSXsKzkLHvG4/FesWcUEVui2wCxY4x3rJ8Q1zUYCjkzV8K8MTWElzwPxmWi8G2302JbiTzT1dOn7VeadZQ6fZpaQsdq9z3qcwOc0J1JORWC+ostGHOZ0aaOjTnNa4PScAGaOh2ihKMU7OKhbmWUbEJvHuP2pUzPwKVNgSbc0878B6tdavonn3O2SSOQpvA5YfNam2t2cZYHnmvmfT9QuYoxFHeTRjOdquQDVtZaxqCOHS9uVK9/NNdPf4YxJKsAPpOR03jW1FDqSfrPokQIuAw5rhixyFP7V5l4Y8cX9vYTRX6vejbmFi3IPzV34e/EEXepLZ6raR20cvKSKThT81mPpL1zxnE1k8T0r7QTgn3H6npNqBjHB+1DMnq4z+tYjVfxE0+HVPItoDcWiHbLKDzn3HvW5jgEsKSgk7lDAfBGajspekA2DGZLRq6tSWWps7ev77xpkbHH6e1UetaBDdwy3NuBHMo3EdmrSpajoTT0iWJSzHgdzxUa6g1HchktmkF67bBPIXj6Z4bpQzHgZ/wBqp/xN1a4XxFPBbQR2kCMfVDLu389SR0NZiDxHfW0iOskky55BOciurq32IHHecLYgrsZOuJvShrhXin2sguLWK4MbR71DYI6ZohWiB7RbZGK/Fc28Z9qkFa5tx2osxYnlv426Hvgt9bhXJjzFO2OoJyCf9K8pUEKV57/p+tfTetWyXWkXdvJCJVkhYbSOCccV4drvhS807RrTWIB52nzxLISOTCcDIb9c81XtXImxoNUVUIZkGznePswpgzuOTlalTqokYgjuDz3qGwIOc8j/ADVJhNsPuGRFCnrIGcdqewAVlYAHqDXCrY8wDBrgbzR6uGHOKrMIioYwDMVJ/wA0ZJmKhScrTCoJ+DXChXOMY+9AeYLANxCuAy5B57VGiXy5Crj0nue1Otzz6jgUSQES7TyCOKEjEjwVOJxoFYna6KT0PvUd7aZQQ67/ALHNTkswq70Uk/NQnllglJBbI7UgT2hq2ekdDHtbawwDzn2opjZRkYcVIjmguYwfyPjmhNG6HaOc9xQhuYO85kGaPksoG2mIxA6E1MMTAkAiguhjYFgcH2qUmWBaMcQlu8odRG5U9uehqzk1B3jFvq1v5hX/AIcynDqPv3/WqclVxgU53aYgn+kcE0BRW6wtyt1EnnTZGDz2kqSQt+Y59X6ihxwSI7BZtit+bnAPtUa3uJrWRWjJXB7d6nedp9425me1lPtyjH59qQYp8/nBJyOIOOBUlDkk+3PI/WpUJiRpJVkxvXBXk5+9DNpNGCUKyL7q2QKjbrmLk/lHcDijVx2kRC2ZDS1lu5WjSJhxGvpGDkfYUora5kdc7lz0rS+Brq1utQU3yReq3YAuBwwHI/aqfUJo555bmEkxqTsx2FCLCW24ldtAAuVYCKz+o0u8j+rnV7fdhmU/lJ6A1sYbK5eM3MW0qVyH8wAY+5IrEzajD9CILqMToVyEBwQffNVlrfXkURjimdIyfylsgUjndxM7UeFjUAFjgj27zUeMNQY3qWsd1bzLHGMvG27nrgn3+1V8WuzR27W8hSVG/vUEj/FN07UhcutpqNvFdRMQNzDDKM9iKJ4m0CLTGivLcvNYzn+W/Xa39pok1ChwjcE9PnLlOjqRAgGcS48H6LZeI5ZImvktZV/IjHG77GtFrv4ay2GlT32m6g7TW8Zd4iM7yOo/avNbS4lgnR7ecI6/lI4KmvU9D/Eh4dHWHUtOmup1GwyKQoYYxzmtGt/eQWUWIcp09pXfg9oukataXzXdu73cRG0lzgKe4+a02peB5ReolhIfpT/xN7eoVgvDGt3eg3t9c2MEZW5VgY5DwnOR+1aSPxxr8Wn2y7rIqV2btmXHHJPzUvmLKms8ONxLEcT0rTrCCxtktolG1AOfc1MVCe/HbNeZ6p4p8UWAtW8y2a3uIRJAxhB3e4PzUeLx34iOMvakYycRAUaOrLlTA+BdBgT1lI3J2hSTjoBkn9qObeSPAkjdM92XFYzwd+JWo2VwC2lWNyznG7aQ4+1e5aDdQeI9EgvruwMLSf8AlyrgiqGq1j0Nyvpl3T+FrepG/DfTj8ZjNNtHuLtIFyC7YzXptnGYbaOHOQi4+9BtdPsrU5gt40JOcipRYZ61i6vV/EEYHAm54d4f8GCWOSZxj8UFmArsjgt1xUS7uYoUZ5HCqoJLE8ACqyKTLNrgQ5cc85+KFPdRxAlmAA6knAFee+JPxH0+1LRacjXUi/1HhM/7155rni3V9Vcie6ZI+0SHCitbT+E22ctwJhanxumrhPUfl0/Ge+/xWz//ANMf/vFKvmn6u4/vb/3mlV77EX+uZ/8A7Dd/QPxlYIwHGeCKsLNhGNrjKng4HaqiGX0CZQSpbGCe9W9uHeEOEOOhIPStK2zb1lFKT2llBfW8UYRSyjtURr+ZpvWu9QemakWEcIcLOisvzT9T0ry1MtqxKnnA6VAtqK3PeTWaeyxAc9Iy1lt47mKdXKPGwZCRlcjpkVsoPxN1xfLjkitXZTjcq4Mg+1YSGzdmyXOKnXFvb2tl59yf5YHqzwTTWrVYw8xcxtP8TVk1Hb9J7tZeKtLOnwT6he29rO6bmiaQZWsd+JHjTRrzSmsdP8QtBLuBcxRFt49s14xLqO5iyKwye/b2FQXdmJJ6nk+qoqfB60cNky5d41fbX5e0Y6Z5zL62uNHN95l6J76Mt6kB2ZGP3zVe9nMGIgYhS5KD2HbNQ4QyZkUKe/NW1jMZo2McoVgvKuOv2q+2azuBlGpdw2y30DWbqxMg1AySRsAE74xWrsb+3u4Q8ciEdwTgivNJb26GI32jHQA8Unu/KAkG5COfSeKW3d16yFqnQ8cz1bA9qRjyOKyfh7xVbNB5Ooy4ZeFbFXsmu6etg91FdxttBwD70DAqcGEORnElyR5BBHUe9UHhqzjufB0dlcRq0ciSRbT/AG7iOf8AWqOPxRqpu42Z4wsjjEbKcYz2rSaLqOnWml28Us6Bxv346D1k/wC9M4KjBhKRieBLo89zpOoahFzHp7qJcjkhmI/6VRyIrDjg9h716TpckNr4Y8Z6exDSrOpQH+pBJjI+OlebHIm2rzzzVGwAnib2mcsCD2nFVlyD0prIQQ4HPSpqW+58Ek4pSQujgY9J6n2qqeZOtuScSBt4IIyOopiknKlR96lNESV2kMW6AVIi027k2j6dwW6ZFQsQp5jM+OZVMrITxwTT1bdw/QVNvrGa2YLKjL96hP8AFPkMMiLfu5MPDdvHIInPoPQin3EUb5xyx6H3qG0bIQ/LUZWEg54IoSncRz7iRzbsp64+1Etptr7C2acjhGIbJpjRjzPMUAU3XrCByOYaRgclVBIoSMzH1gEVwy8kHH6U13JTcBTgQMTrFdxBUUzaFf4NcBLEE5ouFK9M0iIY4hY0ic4Y1HKRCUhgxA7gYogXnIJB9q4yI5O7PzzSziIHBhBJaKvoMsTHsG4P6UwDdkec4B7EdadbWiy3EaKOp6k9KNqCNaXDxMASvQjoRS+kLzOcCRVjlXozEDuGIoqOyLtY+kjkAmoz3DHpXFLspYkjPvSxHO/uZYTIvlK8R3Rn91qOJecdu1Ns5xHIEY+hutK9RkX+SAQOc0wBzgwAmTiPWQk+j0/NbbwhqUF7Zy6TqCCa3f8AOpPP/Mp7GsDtlRFMiOobvjip1hNNAfNgcqyjBoL6RYmO8BkK9JrdZ8LQmKSfw/ePc+UcvbyD1ge4PeqywuZTbqsjNz+YHqDVp4T8RaXp7s17dETMc9DgfGa74gSwmvri+0idJ7WX+YdnWMnrke2aHSamwP5VvPsf8Qix2wG+MoWXBBGG+9dti7IEU5c9R7E4qv08DznVpQRjJUnnNW9o5itCUwrlwQcZNaRfaMCV703HDTT3eoW114St9KO43kUmxRt6cnp8VD8I6V/Fby4t/VujtZ5ABz6o1JA/eg2DLLFM9zclJUUFDgDLVdeBo1Y6ygYo30zMjq2PV17e/eoqn8sECMwVQJB8FStJ4msk9IzOvOcDr3r63il9C7Tu9IwR06V8c6QSNVhCkoMg4A7V7d+GHiNra5e0vr3bbMvp8x+Aal1umNy+YvaDpNWKLPLYcN3nryzljgHmmTXfl5GCTWeu/FGi28XmSalAPhWz/pWW1r8Q7BVP0dvJOf7nO1f+tZlejsc8LL9+vqqXlhmbi41NUDMWwq9WJwBXnPj/AMY201tLpumzeY0mPNlH5QvcVjPEXiXUtYlZJp8QE8Qpwv8A3qtijji/mzsDg8Juzn71t6fw5KsM/X2nO6zxRrVKL0g5XBU4OPjtQGI5arOe5tZY8mBIz/6e1Utze2ttLknzAPmtDzx/NxMc2Ig5ht59/wDFKq062MnEYx2pUHxSQfih/QZLWykkJ8pCI2bcoPWr7QraVBsfhQKq7bXoGAYyKGPXK4qfDrqFgsZhL/61UttLDBE6KpBuyDLB4JTdfmG0Ads0a4MsdqS0oAA4B4qoF5dySbpSAS2fQeMU3VZHmRRLl4UOW3HFQC0ZAxLY0rFSQ0hW2uTR7wkUOCTkN1OKDdm5vCocSsjepYycgH4ofmWsjLthVFQkKAOtGnuj/wCQfKTZtIBzirS3bTlVlUeHseWfiCgSygYrcW8s0gGWw5A/0pXMdnc//Jh4pAcNG5yMfFOGnXcdq90LnAIDIM5L/HNMsBdl3l8r1Drngn7U3nEndukzaVQu3bEmmuSQzlcHBwOKnR2LpgEsCRheBT4/PVAzxsGbkqeanLcS3Efl5ViB7YIqNtS5PWRDTBOsq7qykMXBQ4/Q1W38TrBsZO35s1Y37XESlZAQoOMkZFSI7Eanp7pvzPCMxkDG74qau8oAW6SNk3HA6zNQllwwbvgg1qvDYintyksYJzis15bRyMkikODgqeoNaHw7IsQZmYBe5zVnVHKcQNMMPzGeJsLc7GErPGBsI6Yz9qqllVXAAaI5Gcng+9aPXrpLi2V7WTA/LIcDkfBqojFupG9dx67ie9RU2HZyI19Shjgyg17RHvAs+kpPJeupS4iQ5Eyg5BH/AE+Kw0sDLIsiqcA4bPUGvojw54jtbFFjvbCOeMD0yxYR1P8AvXl34s2On2mvPquiNKbO79brImPJf+ocdieapXctkAyzpXIABMrPA2mR6p4hgsZXCh+/2616z4l8G6Fc3Wn2v0McQ8ubMkY2ltqHBP61574Ans7OJL9IR9WOQe9bW51u51e3YznauxoiIvSwVuCc1kfaVVTNuBkr0WFxtnj6XEGm6hJFb+TP5LbVkxwCByRmhjVrvzDIz5YnOd1bhvDvh6Pcsdsyqp6M+QeOtdutD0e8AhjSGABSS47AVVfXVO2dplwA2kIBM1f3ltrGliEkJOgyT3NYySQJK2W9IPFaex8L6xq99crosYlt43CCaRtqtz2qbffhd4jS8ZYprSdMDY/mY3cdOmOvFSJqdNQdjOB8oyVhDtMy0ET3K7YgXOM4FRXVopGDqVx1zxipeqWGo+Hr9rLUInt5x/a2R+4psGp3IiMPnExv+bIB/wBRVzcWGV5EPy2HA5kWQhvT3610SgL81sfD0+k6rZjT9Ttrc59McgXa0Z9wR1/WsnrljPpuoyWlxksjAq56OPcVFXZvcowwZN5LgZMjM3qPApgc4xSOSzEc01RyAanxEKz3jmYsCV4xRFb0gjuKCoIdlPenJnaR3FFiSeWCI5ixQMCc5o4I2/JFR0G5enQ9KIrkkpz+1CywHr6Yk7SIGnukVTwoJb4Fd8R28kF1gNuSRcqT8dqsPB9rLc3E0FtbyzXLYIREJbaPgUXxVHNDFFbzWU8dyHwiPEysRnB4I96DviVlLC7GOJlWjMfJFOC5TDE8+1HWG4kRs28i45OVPH3oJ9QCjtUmCZaJBPWMVIw4DHge9TBcW6ZX8ynueoqM1vgZPI96Xkx45XA+aMICImwRJ97rN1dafDYOY2hhOUOzB6+9QCzsmAc8+1FWAegAH3GBmiwQF5FXcVdjkfb5pbQAYJUKOJ21uDbOH/luvQhh1reWtjBf6KNT0q1jhvbYfzYk4FxH/UprAXERikdHXLA/4962HgKa4SeIxh2iLANgH0fJxVDVKSodTgiBUAzDJlXBapFeu6+mN4y8ZPUg8/8AarG1Yb1JbIUeoA5r1mLwRoUcL3l15DOWLpMZCqru5xjIyKPpug6Nq8UsUtppwulJLBPQGBJClTn4qE+LjbnYfykbIzElZ5azZ6gZxkZFX3h23REmW4neETIAuw4OeeKm+IPB8uizRiGXzJpCdsfXjt6umKstE0+z0uxFxfSxtcMB5hzuAIOQFyKK3xahK8jknoO8yNSdQzeXR6cdSZA0nwnqv10N5HGGthxy43dD1q3f6a3h8ydTGhbZuJwCfip1lrUpf1XbTJ13MOgqV/EhcBQfJdFIwskasq/bjr81VTx/UVEh0BHyJH49ZC1LWIAX5+Y/1KYRpksCdvbn/emzWxeMupZl7cf9av7+6+otdltbWXmFxnzEwAPjAqlv99vIFc+W7rkpn/INbPh/jI1eBjafYmA+nWvr+MpJBMhxj9dtNHmseQeO+MVZm5zkEK5HWuv/ADoiqAIT0YrW2NR7iQ+SDKLU7hre39KbnJ4561jdQurgu8jKVy3ADV6G9i7c3BR1Byr4wVPvWL1Sy021vgTcG49Rb0jAP3+arah9xENKU3ZI5lJ9c/8Aaf8A30qt/qrHtYxH9KVVdx9pZ8pP6ZdMqpgbVOOh7GmyhnKsoj47L1qI0LuFCuXUDPXkUPcnDJIwPz2rU2ZHWBubtNTpBuJEUeaAD/SRzQtQn8qQ+YHXB7nOarra/lhjVPznu3eu+b5zZlBJaqnksGJPSTDUsF2iSEdZJN3pCZzgjrUuOOAnaoI38HA603R4okuFe4BaMckNVzBp6y214yuql+UJ6L8Co7WCyVTbaODK+WIDZG7O8aL6ADkVYRSItmX2lCDnf1o91LpGl6bI2oXkcUqgYXdlm47CsJqnjEiQpptv/K7NL/0qtkPxJ1WxTkmbmxZiJXnYTxn8jqMAD5HakLzSFuWRru3jdeD6xg15Lea7qE0eJryQqTyiHav+KrXuNzAhTkDqe9LYc8SdS+OZ7p5cE3qililRv7XBP7VLs4Y7dkwhGeue9eD217MshEbMg65DEH/FazwX4mvLbVI0u7ySW2ZWXypWzuPYZ7UiWHEEbQc4mq1PT/M1gxBgu98DI6UK+0jVEilEKI0UZw+zrTTqN5LO1wrIjZyFPOPir7Q7u4vbW5aZdpfAJDfmrWRmVRmYV92GJHSZDzD9GkQ3DJ5BobhsKCxFSPJImdCMKrkD9DRJo8qGx+XjirWQOkPk8x8Fw0cfl561WeLL61Ph27jnGGZQFU9zkc1P8r05JAPasx47jQW0O5382SQAJ221S1gIrysmowbQDGeA4SXSZlZ1XoorY+IJP4favOrKkZTJBOKofCwis7dXLYJGBj3ruuX8d9M1vKsUsanZsPOcdTXGMjX6gDtN1SAvmN0ExN/4qupXGwZVSQMHrUzTdalk8ljDJPDvCttHA96utM03QooWjNoj+ZncW6j4FW0Ftphhjt0i2RRjAC8ZHz81qPp6wuFEw7PHdPUSorOIfRtftxC1rFILONRgIcAA+9Gt9en2tBbXVvNHC4ZskZPx/vWE8SQyW0gEgUQO/LDqB2qu1G/td4ezAjdVChl4DD5qmPDqz26y2o8wBlPWajxxfR61HLEIoAzEEORk159NbPDI0ZHK/wBQPWrSG8EhXdKAe9T9WtoW0GO5CRli2Nw61aprGmwnaW6rGrIUyhtJnifIOGXkVb63fnUrGMSAGWMAK56n4qrtraOSXO7bx1965yrlRzirL1gtn2l4WcECR8OoxjrQ/MYMcp071YlN+7K9OnNRoljF0rSDKr1A5zUwIIzAFuIyGKa7VjFGSEGTiuRk43HAI6gmtLZXaEhVPlJ0CoAGH3qrv7eS6uAlvHJIM4Y7OP8AFAr7uMYiFzA5PSQFIHrXjPWrvQ7LSr30Sl47jthuDWjb8OJZfCkGqWF1FNNHzPGDt2/b3qit/Dt7DcLKzKFV9jK2VbPx71GLq2ztMa25WXg4lhbWk2h3cF/pMrpdQzCRXbqAOv8AirHxNqlx4k1WOSaa6itXYN5QcEq47rx781Av3NvEsf8AMAbgcdKqdR1B7IReTLvnDAg9higetSd5HMradrXxnmavV7G712xuJDPdBoEUF5k3FwBzwMYrKWWgPcLKYZ/VEMsrxkZPsPmtd4a8TSXFpO13ptxbLPKkk1xAu+ORl6Eoen6Vof4N4cigS6uNcuYI7+c4mjjDqzkcKMD0kfaqC32Ujax+ksuAGwP7zymHTppCPNIRO47irvT9E+pjWVXghXO0tIMnHwO9Wvjbw5eeG7m2WeXzbS8yYLhF/OOvI7Gs/damyuUV/wAnpweP1q+twdQynrKWt1FiqF0/BPcjpNlY6bpENm0DQx3E3OJGBUN8YB4rOa9fwrGthHpsVo8R5KOx3D7E9K7pmpySqFyOBgH5q0ntbG+K3F5Dvk2BQQ1OrjPM5ynxHVaZymrYsp/Ef9TFraXl9dFIbSefeMfyoy2D+lbfwtbeLNIit4THc2kDnawAQce5HWqqa2vbWYm0Mv0hIH8snj34Feg6Zd29r4f/AIgSqwRKA7OuDu9uap621gcKMgzrfDxXqF3huMSH4vuL2y0yBIhbPLI25RLklT/cB0rBWWreIdP1X6hZvOdpNrq59D+wGOlWWu6ydQ1iTU3fZH5YjgiLdAO/61VNrIcNB5IhWRSfy45HeoqVKJgjMs2atvM9Awo6T0DVvEXm2kT7ikpHriz6VOB0qmj1NrpD5hySfy54rLG483l2JAHPPwKtIYWazE8cU+C20t1GaqDSovyJmZYrXOWMv7bUmiQhXOxjjFFttUZdwYnGeMmspBcuI3VyC6NwmMHg1KE4liW5MqEckKB0A7fepW0oA9QlB6yMzWjVZHKqH2ge5zmjyzRXdvHbyzSqF5BV8Ef9qzGnzJNCrEjeedpNS3aVYy8KoWQbsMetRClmcKnBlKxvJOWOJW3uq6hpV9JbSzq4BJAPqyvbmpdp4iScBmZkK8+ms5defdzvJPkuxyT7fFStKmSFwjQbiTgFq6WtbEQHdzNPyVI5msW8kmAcyMytyTnGaqNQ8Pm9vo/pSIw/LHOcfajwXsUJ8yc/yyMFVqUvjOKAKkMUUYHAwBn96C7xHauAmT8pXaso/Ecv4f5UH+Iz9P8A+mlRB4xlIz5z8/8AqpVmfamp/wCP84/mN7SKksDR+X5MfHpBHUfNQfpIzckPI2D0Kjg1ZRwQiNnJVQerHjFQ7i/02AbRK0hXpt5rpfOVO8qJS1bHBzCQWEAIyzkj3NToLQb84H3rPy69j/gxAY6FqZ/8RXu3DCPb7KKga8npCbT2kZXGZrozZK5R3fd/Vk8VXeNvEclvYQ6bZMq+YN0jrww+1UttrMZcF0ZCe/WqbxFdLcaiChBxGBn5pmCtyJJo6dTXd6jkY+UgSyyyMGkYu3PqJyTQB3YsSKNYW7XN5HbBwhdsbj/TW6t/COkWa+ZJcS37jkgelKbaRwJo6jVVaUes8nt3mAjheVtsas5HYDNS59K1GGHzXspvLxncFyK9It10mKNNmnrD39HFHW2e5iH0Mo9PRGPH60W0dzM/7YLsAiY+s8k8wqvA696dFIchg2ADWi8WaDcWcrXQhIiYkMAPSG+KzxiYIDtIB6cdaDaBNVGFi7psdA1+zMSwapBuIPpuFOGHwfcVs7E6NbNFNFqw2gh2VJAc5rxpWdMg5H+lGgmZF9JJOO1LNqjCtxM+/Qq5JBInquoS6cs8k0V5BIJHZhg4xzVHqniTTLWPYZPPkB6Rjj96w00kpG0Ahce/NAWNmJZgcDr81J8TZ0j1aTaMMcy8vfE988hFuEhTsF5NUkt5c6nd/wA6UuV5Jc1KSaN7GW2WNRKSGibv2yP9aN4d06C4tppifWrjI9waz77iASxmjXQiDIEl2eqNZ6RMGC5JxGcc1VaRvu7lriWbaQevc5oOv3Aa/wDJjQ+XFgbR7+9bfw+/hKfwZO/8NlTU7V9jmGfaZFPO4A8fpUCgUruI+9H1KkoUrlLDaytJtNx5YXsOcferCydEO1pWcj54p/h7SlvIJ0EF2ZWHmQFSvqTPO75qj1EXWnXhSfT7i2JzsSVSMj3o1cMdomFqfDriSGlpfGO8ia3dQUzjPtWGu441uZEjywU4Gam3t1JLPcOA6AquACeCDzRIdLn/AJbXCzJE43FwueD3+amUhOpl/RaRtMuN3B7SpMLH4+wqfaxTuiwgu46hc5/xV83hONoVnttVWWNh1CUy30S4s43Ed1vlbo2Py0i4YcS4LEzhziUElnMlyscg2Fj0zzUnW0sob6MWSFEESqQT1buashoT7t7XGJC2SeSTVRrNnLaXCuzb1bA3HtiiAyIddtbthTJWnPBCha4hiAZiquw5JqRPPaBEFsU5Pq2IAaLo+kw3tlHJc3JjDk7MDOT9qemiTxKZEXzNrYkCjkfpUK3VsdmeYjWA2TK21ms+YbhOSxIkHUfeub2tZZQDJNAV6xuQMfNWaabbwkzyQjceOaGbgQyShl/8My7CgAxu96sWIVURy3q4mz8Fy+E7/wAPCK7s5fPhOJVNwwz7fepd9P4It5Y7WXR7+WV8urpcHYuPcmvK7y4VVJgndGPGFG3IoUNzI8E0Qmd/NGAS3IrPbSgufUfxi259Wf7T1KM+GXj3DTU8oNkeZOSB9yaw3jQwz3SmytLCOGMnDwPuLfeocNhcTQBd5CZ/rarnTPD1rIm64kLHHROBQM9NHLvn85Gjik5zmZyK8u7QoLK7mTAGRk4z3rVeGtTkEfmXOpp5pmQrExHGDnOOma5/BtJDlDby5HU7zU5NAsYImurNZPNjQsF/Nk/Y1Xu11DDHP5SavVhP5czn4jeItS1PU4ory/gmhtw307IgG0N1/Ws+lvc3qfVQWrTqi481YtwwD3+ajanqVvPOkGpwSxsjdCgB+/WtV4J8UaLpOjvZpezEtvKDGACf7vftU63mupcVx9q2tufiZaG+aW8NwwjRGbb6RgcADpR11L+jzSVJwgA60otMtruOGCC/iZlX+YFPO8nJwO4rc+FLDwxpUInecXV10G+Mnafge9StqaB16yL4CnU2YlHbvq9lbNcjdEgTJGPzD/rUzVYruX8N5NSvJ3NleuPIDryWB5HHtUzxMl9qsM30FpIyFSFAGPihql1ffh+PCKxzJfW8xu4hJwjKF9Sc9/aq9nl2EMCM5557TQXTDTqUUdAcfWeamaZtqMAuFK5I4IoemWV3fXC228iPkkscAfrVzF4e1q6YN5CwxAZ3TPtBOM4oh+qs9Pjk8mPbKAGyeQQf8Vb81Bwp5kR3BM45gdHsL22tbkSEKZo22gnPA/0rQW+vXjaDbaXvhhUIFEhGCX7DNVtjLts8uIwQSGYHJxjpVTBMsrpDn8shIAPt0ojQLgN8hVjgiO1jVroXf092WVo+HIAz/wB/vRNHcTq0X1kcMSDcrtn1e4+9WTW2n6nGkd+CjITsmX8w+/uPvUXS9MvtL1RWtsXcG/O8LgAH4PeldSEX08GOvlt16Sy0WS1luDbw6nFHcF9qJIpwwx0JPTNTru+ltpGs7m2eKbO11foP+1VdzDZXFneXt67W4aYrGoUbgR3FRIvFlwbQWuq2sd/HENkcpG2YAdBu9viqnlgkOBnH9pDfo6NSCg4I/P8A7kp5Cs2U3FQeR2qMfqHlLFgo3ZXLdKLHrXh6XYlxZ3Ee4Hc6TYK/oRzUC7EImZreQyRHoTwau/Eu3GMRNpWqQEkER2tX90kUMXmoyj+2qk3Ls+0kZNTCXI2hFI7ZqJLbTSSZSMD5FMGHeRKqg8Qmy8/9X/upUla4AAKPkUqHePYRYPtNJcXNzOf5szkHtnihMuMAkY+2KcTiTaOlEdQQcitQqJXAEj+Uf6ea5sOeTUonai4AoZ/NTAcx4McLjaB96rp8tKx4J+KtJT/L6Cq0fnenEnqPMlaEu7UYicdcjNbexmmEoCYI7rmspoUKG5JOeFyOelaDTU/m5V3Ug9QakToZm+JUeaw+kvUvbazmMkaI7sfUHGQB9q691G0ouYpI7Y9Tgek1VQyM0zK53j5rviN/L0kmNERi20kDnFV3OCCJUr0ig4MbqviS0lt7iFmluZnfOOPLUY7VlmvFDAYHXgEZC1HuQFjIUYyOaA4GzAGOO1QMgY8zUVAvAl3pZgvVkhaENkcsBUTWtMfTJizBjbsf5UmPSR7ZqTpRwYgoC+jJx3q+1JzJ4cn3gMCpGCOBjuKiLmtwo6GCrndtmJkzu+FoN0S0a7dw55oqnKk/enSgGLNXXGBLUr5Uljh86LH8sg/IrQeF5Y0naQSCJZUYuMcBxz+x5rPTFljkUO20gZH6iiwyyR8q2Ds29O1UL13rgyxVyJbJp1nqIuLq21S0E28s1tKpVzk/0k8H9KtNMez0cbJ7CWcx5BLYxj/eshBdSQxsUWPOQMlBkc1bLq11MHRxFj/lolUgYJzDW5tO++sDI9+ZqNQ8XWAhCHTvKdB6GHpB56HBrH634g1zWZYxfTSS2kLZSIfkXPb3NN1Zd0KAkkYPeq2eR/pWh3ts9JxmmFajkDmWzqW1R8y0DcR2GJLuw2nXctpLG0U8cm1uhXIPI+RUmHXJ/LwkMbSDCkkdvYCqZ2Zp5N7FyGxljk/ei6WxW5Qjk7u9WLKlKhmEpjoZa2Z1C33G0cxIW3NG4OATU1r3UWjyTbh+hODUOa4mLyoXJG4dq56hkh357ZoU9QkBwx5AlnHLqRXaZIC56HaeKjalMqxC1uRCwwTIzLyftXLENPdiN5H247HFK7soFuw+CWD9WOc1Hcme8kqrXOQJqbM+GLfwxc3sxCTG3ZLRMnKPt9Jx96h2/iO1tIgn8PMjSRqZZd+Cz4wapLsJ/C2CxomZRkqMGok/pCjr8mo6KUJLSY2nZwJaaprEV0y+XatEnsX71T3sx2YYAITkmiRgHqAeKZqLYRF2qQOnFT2WBBKr2ncMyEtobkhk4A65FRbi0mtWGVJU91FWsTMqcHrUPULmbewD4BHtWd57O3ygiwkzlkskjDE7xAd81b20NwjjGpT4PsKpLRyNg4P3q2yfLByar3DJgtNLpcUjFd127HuGArQ2LrE4EgDAjBI4rEaVI+B6j161pLFmkOHOQOlZNtXPWRbyJS+LdJa4vJLmOGGXAwN4PSsbOhilZDEsJPRV6CvV9Qt45dIdmyHj5RwcEVl5rS3u5YJLiJXbHJIHNaGi1flj1cyZLT3mUtWVWCYOSRgjg5+/WtTeapqOgW9nqGn3KkcLLFNGHRj7nNWcek6a+3dZxHDe1QPH9vDD4f8A5UYQpIuCCfmp21ldzqpXrLOmvw3E1vh78TtIubYrfp9Fcj0lSm5H46qR0/WsL4p8UX+o3kzNev5TuSkEQAGO2SOf81hriZ1WLo284O4ZqbaeqfafcVMmgopYsomoXe0AE8T2n8Jm0nWvCQGozX6alaysuUnJaVcZyB8f4oV5odve2xSC7UIzlt04DMM9jwaznga4ktbS+eIKGjjdgcd8VT+HPEmqZiheVJFI6suT2rMs86ux3qbGItZf5YQYyJpLrwTJErCXUrNI3PBwR2+1Ulx4esbCRXm1VWJGV8leT+9biwme8VppgpYSrGMDgD3+9Znxldy6bqkUFoQitg57jjtRprbn+80VlVPk+YF6/P8Af6Slc6NGgGL2Y9c7sUN9RtFXbBbTD/mmJNWmqpE+k2c7QxmWXl2IyTVDAkfnbjGp2tgA9Ku1OXXJJ/GZFleOIOaVpgAUwB05zzQfIbBbnrzxU7VJVDw+XbwxYX+hcZqtmlcxMc9T71YSwkRD0nEg6jgOMYDVN03zrkCNQ3/MBkUV4IolidVBLYzkVpvAWpTfxSODyoNrsvJTJHXoaG28KmQJepAtG1pX2nhzUJyWj3MAcH+WxH+BUqXT7nT7ZzJa52ry2OR+nWvY4AkUUaeXG+SeWUZrJfiJqlz5LKywsEAAygyR81kHxF2cAiFfoalTIJnk5LsSfNfnnpSr1W20e2lt4pDJOC6BiAwAGR24pVa+0x/TKfwh95//2Q==",
          "image": ""
        }
      ],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 2,
      "stewardship": 19,
      "martial": 1,
      "intrigue": 8,
      "learning": 4,
      "prowess": 2
    }
  },
  {
    "id": "c_1794580859922_x6ibb",
    "slug": "鸾尾花帝国",
    "index": 17,
    "name": "鸾尾花帝国",
    "race": "人类",
    "capital": "鸾城",
    "faith": "先祖崇拜",
    "population": "663K",
    "bio": "黄金时代已然过去，辽阔的国土已然大半沦陷于敌人之手，不幸的王啊，被他的宫相所架空，不知能否创造新的奇迹，还是说成为最后一任鸾尾王朝的统治者？",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "封建君主制",
      "leader": {
        "name": "受诅咒的洛泰尔·德·鸾尾",
        "title": "失地王",
        "avatar": "",
        "traits": [
          "狡诈",
          "傲慢",
          "愤世嫉俗"
        ],
        "stats": {
          "diplomacy": 9,
          "stewardship": 9,
          "martial": 15,
          "intrigue": 4,
          "learning": 11,
          "prowess": 2
        },
        "bio": "因丧失过多领土而被嘲笑为失地王的鸾尾王朝第七代皇帝"
      },
      "factions": [
        {
          "id": "f_1794637459854",
          "name": "鸾尾家族",
          "leader": "洛泰尔·德·鸾尾",
          "influence": 18,
          "color": "#5489a2"
        },
        {
          "id": "f_1794637473392",
          "name": "凡多姆海恩家族",
          "leader": "夏尔·凡多姆海恩",
          "influence": 82,
          "color": "#b29357"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794625702932",
          "name": "行将就木的王朝",
          "desc": "帝国的荣光已逐渐离开鸾尾王朝，意图终结王朝的安茹大军正步步进逼鸾城，众叛亲离的洛泰尔·德·鸾尾，诸神是否垂怜这位不幸之人？",
          "effect": "“诸神请垂怜我”"
        },
        {
          "id": "m_1794636883874",
          "name": "宫相的统治",
          "desc": "纵然王位更迭三代，夏尔公爵仍旧牢牢把持着鸾尾王朝的宫廷，他既维持了鸾尾王朝对于地方的基本统治，亦是洛泰尔亲政的最大敌人...",
          "effect": "“忠不可言呐”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": [
        {
          "id": "u_1794625679670",
          "name": "鸢尾花卫士",
          "role": "核心突击",
          "race": "人类",
          "modifiers": "【迅捷如风】【嗜血好战】",
          "size": 60,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "波奥蒂亚头盔",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "亚麻胸甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "皮质胫甲",
              "desc": ""
            },
            "weapons": [
              {
                "name": "骑枪",
                "desc": "",
                "category": "长柄武器"
              },
              {
                "name": "青铜弯刀",
                "desc": "",
                "category": "短剑"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "鸾尾战马",
              "desc": ""
            }
          }
        }
      ]
    },
    "stats": {
      "diplomacy": 9,
      "stewardship": 9,
      "martial": 15,
      "intrigue": 4,
      "learning": 11,
      "prowess": 2
    }
  },
  {
    "id": "c_1794580860154_44rkv",
    "slug": "学城",
    "index": 18,
    "name": "学城",
    "race": "人类",
    "capital": "学城",
    "faith": "无",
    "population": "18.5K",
    "bio": "百年前的纯水精灵化作人的模样，纠集人手，筑起了那高耸入云的自体自身之塔，如今，夹在大国之间的学城，其的独立地位岌岌可危，两方的王都希望大巫妖能为其卖命，而在塔内，杰出的学者们正在串联，试图提出挑战格兰的课题...",
    "accent": "#5489a2",
    "region": {
      "name": "央土",
      "traits": [
        "商贸航线",
        "旧都残殿"
      ],
      "customTag": "",
      "desc": "曾有神王梦想以音律建立庞大帝国，如今黄金乐章化为孤冷潮音。"
    },
    "politics": {
      "system": "魔权共和制",
      "leader": {
        "name": "格兰",
        "title": "巫妖",
        "avatar": "",
        "traits": [
          "谦卑",
          "节制",
          "睚眦必报"
        ],
        "stats": {
          "diplomacy": 10,
          "stewardship": 16,
          "martial": 12,
          "intrigue": 20,
          "learning": 6,
          "prowess": 6
        },
        "bio": "由纯水化作的人，试图将央土所有的人都吸纳进自体自身之塔中..."
      },
      "factions": [
        {
          "id": "f_1794640797109",
          "name": "青蛙社",
          "leader": "格兰",
          "influence": 62,
          "color": "#5489a2"
        },
        {
          "id": "f_1794640806327",
          "name": "朝露社",
          "leader": "玛丽安",
          "influence": 8,
          "color": "#b29357"
        },
        {
          "id": "f_1794640806490",
          "name": "科学社",
          "leader": "阿兰·吉约丹",
          "influence": 11,
          "color": "#518c76"
        },
        {
          "id": "f_1794640806640",
          "name": "超越社",
          "leader": "雷内·德·佩特莉可",
          "influence": 19,
          "color": "#b36e67"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794640886921",
          "name": "叛乱的结社",
          "desc": "伟大的巫妖以其的阴谋与力量铸就了这座象征“自我”的高塔，而今，杰出的学者们正团结起来，试图挑战格兰于这自体自身之塔不可撼动的统治",
          "effect": "“与我加入勇者斗恶龙的游戏来吧”(朝露、科学、超越，三个社团的影响力之和不能超过青蛙社）"
        }
      ],
      "wonders": [
        {
          "id": "w_1794640809912",
          "name": "自体自身之塔",
          "desc": "由格兰所设计，体现人类灵魂的进化以及世界的奥秘无穷的高塔，如今是央土学者们求知的乐园，是结社割据的场所...",
          "avatar": "data:image/jpeg;base64,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",
          "image": ""
        }
      ],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 10,
      "stewardship": 16,
      "martial": 12,
      "intrigue": 20,
      "learning": 6,
      "prowess": 6
    }
  },
  {
    "id": "c_1794580861530_scmhi",
    "slug": "维瑞亚帝国",
    "index": 19,
    "name": "维瑞亚帝国",
    "race": "人类",
    "capital": "基尼格",
    "faith": "原始崇拜",
    "population": "228K",
    "bio": "尽管过去帝国的武德曾照耀四海，但绵延的内战已然深深打击了她的国力——四个家族为了皇位的争夺而大打出手，昔日因理想而团结起来的诸民族之乐园，如今已成为了各自的绞肉机。脆弱的统一曾由哈巴哲家族用武力再度建立，可随着其的神秘死亡，纷争再度撕碎了帝国，戴伦元首是否能拼起帝国的碎片，还是任由帝国就此分崩离析？",
    "accent": "#5489a2",
    "region": {
      "name": "央土",
      "traits": [
        "商贸航线",
        "旧都残殿"
      ],
      "customTag": "",
      "desc": "曾有神王梦想以音律建立庞大帝国，如今黄金乐章化为孤冷潮音。"
    },
    "politics": {
      "system": "封建君主制",
      "leader": {
        "name": "受诅咒的戴伦·基尼格",
        "title": "元首",
        "avatar": "",
        "traits": [
          "愤世嫉俗",
          "懒惰",
          "暴怒"
        ],
        "stats": {
          "diplomacy": 6,
          "stewardship": 4,
          "martial": 12,
          "intrigue": 5,
          "learning": 10,
          "prowess": 7
        },
        "bio": "戴伦·基尼格是基尼格家族的私生子，尽管通过迎娶蒙格家族的长女试图缓和自己的正统性，但随着内战的再次到来无功而返"
      },
      "factions": [
        {
          "id": "f_1794649440709",
          "name": "基尼格家族",
          "leader": "戴伦·基尼格",
          "influence": 30,
          "color": "#5489a2"
        },
        {
          "id": "f_1794649440895",
          "name": "蒙格家族",
          "leader": "罗伊·蒙格",
          "influence": 17,
          "color": "#b29357"
        },
        {
          "id": "f_1794649440999",
          "name": "哈巴哲家族",
          "leader": "萨曼·哈巴哲",
          "influence": 30,
          "color": "#518c76"
        },
        {
          "id": "f_1794649441620",
          "name": "斯皮格家族",
          "leader": "卡尔·斯皮格",
          "influence": 23,
          "color": "#b36e67"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794644341626",
          "name": "大争之世",
          "desc": "维瑞亚的短暂统一因上任哈巴哲家族的神秘死亡而分裂，尽管戴伦通过贿赂的方式成功让议会的议员们拥簇其为新一任的皇帝，但维瑞亚的其他三个家族却不怎么认为——作为基尼格家族的合法私生子，其的正统一直饱受争议，于皇都传播的流言蜚语将其同哈巴哲的死亡相联系...",
          "effect": "“无论如何，戴伦必须通过铁腕手段彰显其的‘正统’不可撼动”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [
        {
          "id": "leg_1794652700611",
          "name": "维瑞亚第一军团",
          "training": "百战老兵",
          "loyalty": 3,
          "unitNames": [
            "维瑞亚长柄矛手",
            "维瑞亚长柄矛手",
            "维瑞亚长柄矛手",
            "维瑞亚长柄矛手",
            "维瑞亚重步兵",
            "维瑞亚重步兵",
            "维瑞亚重步兵",
            "维瑞亚弓箭手",
            "维瑞亚弓箭手",
            "维瑞亚战争术士",
            "维瑞亚战争术士"
          ]
        }
      ],
      "units": [
        {
          "id": "u_1794652016686",
          "name": "维瑞亚长柄矛手",
          "role": "炮灰",
          "race": "人类",
          "modifiers": "【炮灰】【狂暴】",
          "size": 500,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "无",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "轻便布甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "石制长矛",
                "desc": "",
                "category": "长柄武器"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794652018224",
          "name": "维瑞亚重步兵",
          "role": "坚阵中锋",
          "race": "人类",
          "modifiers": "【尚武造诣】【狂暴】【引发恐惧】",
          "size": 120,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "青铜全覆头盔",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "青铜胸甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "青铜护胫",
              "desc": ""
            },
            "weapons": [
              {
                "name": "青铜长矛",
                "desc": "",
                "category": "长柄武器"
              },
              {
                "name": "大圆盾",
                "desc": "",
                "category": "圆盾"
              },
              {
                "name": "反曲刀",
                "desc": "",
                "category": "短剑"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794652022158",
          "name": "维瑞亚弓箭手",
          "role": "远程弓兵",
          "race": "人类",
          "modifiers": "【尚武造诣】",
          "size": 250,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "无",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "轻便布甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "维瑞亚短弓",
                "desc": "",
                "category": "远程武器"
              },
              {
                "name": "青铜匕首",
                "desc": "",
                "category": "匕首"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794652035239",
          "name": "维瑞亚战争术士",
          "role": "战线撕裂者",
          "race": "人类",
          "modifiers": "【尚武造诣】【引发恐惧】【惊骇敌军】",
          "size": 50,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "青铜全覆头盔",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "维瑞亚肌肉甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "青铜护胫",
              "desc": ""
            },
            "weapons": [
              {
                "name": "维瑞亚大剑",
                "desc": "",
                "category": "双手剑"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        }
      ]
    },
    "stats": {
      "diplomacy": 6,
      "stewardship": 4,
      "martial": 12,
      "intrigue": 5,
      "learning": 10,
      "prowess": 7
    }
  },
  {
    "id": "c_1794582662401_mtec5",
    "slug": "伊瑟兰议邦",
    "index": 20,
    "name": "伊瑟兰议邦",
    "race": "精灵",
    "capital": "伊瑟兰",
    "faith": "自然崇拜",
    "population": "14.8K",
    "bio": "昔日的先祖们曾在这湖滨立下盟约，名作“伊瑟兰”的城邦就此屹立，而精灵们的势力也逐渐扩张至整个大湖——或许，盟约将团结所有的伊瑟兰精灵，并建立起一个不分你我的合众邦。但在眼下，日益壮大的诸邦正在为了自己的私欲撕裂盟约的精神，菲尔汀与缇洛伦因土地继承的纠纷而大打出手，孤立的希洛亚亦不再参与在伊瑟兰举办的丰收庆...而伊瑟兰本身，塞维里安议长也在疲于应对国内的游行",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "商贸航线",
        "旧都残殿"
      ],
      "customTag": "",
      "desc": "曾有神王梦想以音律建立庞大帝国，如今黄金乐章化为孤冷潮音。"
    },
    "politics": {
      "system": "寡头共和制",
      "leader": {
        "name": "塞维里安",
        "title": "白枝议长",
        "avatar": "",
        "traits": [
          "贪婪",
          "勤勉",
          "虐待狂"
        ],
        "stats": {
          "diplomacy": 11,
          "stewardship": 1,
          "martial": 2,
          "intrigue": 2,
          "learning": 15,
          "prowess": 13
        },
        "bio": "通过政治勾兑与恐吓，塞维里安终于成为了新一任的白枝议长，但这位眼高手低的精灵行事是如此的草率，以至于其的在野时期的政治阴谋被发现，成为了政敌攻击的把柄"
      },
      "factions": [
        {
          "id": "f_1794741245451",
          "name": "德墨特里奥斯家族",
          "leader": "尼基亚斯·德墨特里奥斯",
          "influence": 37,
          "color": "#5489a2"
        },
        {
          "id": "f_1794741245565",
          "name": "克里索斯家族",
          "leader": "卡珊德拉·克里索斯",
          "influence": 29,
          "color": "#b29357"
        },
        {
          "id": "f_1794741245694",
          "name": "塔拉西奥斯家族",
          "leader": "阿莱克西斯·塔拉西奥斯",
          "influence": 34,
          "color": "#518c76"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794658188057",
          "name": "伊瑟兰世界：分裂边缘",
          "desc": "昔日的精灵先辈于伊瑟兰立下盟约，希望能维持湖地的永久和平。但随着周遭精灵城邦的日益壮大，因水源与土地的纠纷正在撕裂牢不可破的伊瑟兰世界——就连城邦的内部，塞维里安可怖的名声已然动摇了其的统治地位，一场声势浩大的群众运动正在酝酿之中......",
          "effect": "“建国的神话已然处于破灭的边缘...”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {
      "diplomacy": 11,
      "stewardship": 1,
      "martial": 2,
      "intrigue": 2,
      "learning": 15,
      "prowess": 13
    }
  },
  {
    "id": "c_1794743161989_kaq1l",
    "slug": "克洛斯",
    "index": 21,
    "name": "克洛斯",
    "race": "亚基",
    "capital": "克洛斯",
    "faith": "原始崇拜",
    "population": "22K",
    "bio": "于火中诞生的元素精灵，试图带领亚基人征服赫奇顿的四翼大王，却被那喷薄的火山所吞没军势，如今被激怒的火龙大王正试图将克洛斯驱逐至更远的地方...或者，将其众群赶尽杀绝",
    "accent": "#5489a2",
    "region": {
      "name": "垠土",
      "traits": [
        "熔铁红铜",
        "镀金沙海"
      ],
      "customTag": "",
      "desc": "熔铁与红铜的荒凉边塞，烈日神君战车曾踏足的镀金遗迹。"
    },
    "politics": {
      "system": "神王统治",
      "leader": {
        "name": "克洛斯",
        "title": "王",
        "avatar": "",
        "traits": [
          "野心勃勃",
          "狂热",
          "暴怒"
        ],
        "stats": {
          "diplomacy": 11,
          "stewardship": 1,
          "martial": 17,
          "intrigue": 8,
          "learning": 1,
          "prowess": 9
        },
        "bio": "炙热的火元素化身成为亚基的模样，试图建立起辽阔的帝国，但对于虫人的孤僻无可奈何"
      },
      "factions": [
        {
          "id": "f_1794744033780",
          "name": "达克伦氏族",
          "leader": "达克伦",
          "influence": 76,
          "color": "#5489a2"
        },
        {
          "id": "f_1794744033911",
          "name": "穆尔瓦氏族",
          "leader": "穆尔瓦二世",
          "influence": 24,
          "color": "#b29357"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794743949471",
          "name": "孤立之治",
          "desc": "尽管克洛斯千方百计地想要进行扩张，但克洛斯亚基人却早已经受够了无处不在的蜥蜴人...",
          "effect": "“自闭...”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": [
        {
          "id": "u_1794745691872",
          "name": "克洛斯龙马骑手",
          "role": "战线撕裂者",
          "race": "亚基",
          "modifiers": "【捍卫者】【引发恐惧】【惊骇敌军】",
          "size": 24,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "几丁质头盔",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "几丁质胸甲",
              "desc": ""
            },
            "gloves": {
              "name": "几丁质护手",
              "desc": ""
            },
            "legs": {
              "name": "几丁质腿甲",
              "desc": ""
            },
            "weapons": [
              {
                "name": "亚基螳螂刀",
                "desc": "",
                "category": "徒手"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "龙马",
              "desc": ""
            }
          }
        }
      ]
    },
    "stats": {
      "diplomacy": 11,
      "stewardship": 1,
      "martial": 17,
      "intrigue": 8,
      "learning": 1,
      "prowess": 9
    }
  },
  {
    "id": "c_1794746121167_1kw45",
    "slug": "薪炎龙庭",
    "index": 22,
    "name": "薪炎龙庭",
    "race": "利扎",
    "capital": "奈龙城",
    "faith": "先祖崇拜",
    "population": "15.4K",
    "bio": "昔日的龙众不堪亚基的骚扰，率众向西南迁徙，高大威猛的双足飞龙掠过亲王的宫殿，意外扰动了那耽溺于幻梦的龙之王的血嗣，它的怒吼将随着火雨撒满大地，龙庭的勇士啊，是否能驱逐那有翼的大王？还是再度沦丧...",
    "accent": "#5489a2",
    "region": {
      "name": "垠土",
      "traits": [
        "熔铁红铜",
        "镀金沙海"
      ],
      "customTag": "",
      "desc": "熔铁与红铜的荒凉边塞，烈日神君战车曾踏足的镀金遗迹。"
    },
    "politics": {
      "system": "氏族联盟",
      "leader": {
        "name": "昊阳",
        "title": "大王",
        "avatar": "/countries/c22-leader.jpg",
        "traits": [
          "急躁",
          "愤世嫉俗",
          "轻信他人"
        ],
        "stats": {
          "diplomacy": 11,
          "stewardship": 6,
          "martial": 3,
          "intrigue": 4,
          "learning": 6,
          "prowess": 12
        },
        "bio": "骁勇善战的龙庭勇士，曾驾驭着最为可怖的双足飞龙，却被亚基人所暗算，逃亡此地的他，如今脑袋里时常有呢喃在回荡..."
      },
      "factions": [
        {
          "id": "f_1794746219903",
          "name": "昊阳与他的小子们",
          "leader": "昊阳",
          "influence": 67,
          "color": "#5489a2"
        },
        {
          "id": "f_1794748556420",
          "name": "长老团",
          "leader": "无",
          "influence": 33,
          "color": "#b29357"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794747157386",
          "name": "邪魔寄宿",
          "desc": "自从被亚基人的螳螂刀重伤，侥幸逃过一劫的他，迁徙此地后，脑袋里就一直有喃喃低语...令他寝食难安，而在内部，对于彼方高山的有翼大王的恐惧，长老团试图推动罢免昊阳的行动...",
          "effect": "“为了■■■■■的复兴...为了■■■■■■的族裔...听从我！听从我！”外交：-10；管理：-10；军事：-10；谋略：-10；学识：-10；武艺：-10"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [
        {
          "id": "leg_1794747154426",
          "name": "龙庭第一军团",
          "training": "一般",
          "loyalty": 3,
          "unitNames": [
            "龙庭勇士",
            "龙庭勇士",
            "龙庭勇士",
            "龙庭勇士",
            "龙庭勇士",
            "双足飞龙骑手",
            "双足飞龙骑手",
            "双足飞龙骑手"
          ]
        }
      ],
      "units": [
        {
          "id": "u_1794747149145",
          "name": "龙庭勇士",
          "role": "怪物步兵",
          "race": "利扎",
          "modifiers": "【原生本能】【掠食战士】【引发恐惧】",
          "size": 16,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "无",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "元素鳞甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "黑曜石大剑",
                "desc": "",
                "category": "双手剑"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "无",
              "desc": ""
            }
          }
        },
        {
          "id": "u_1794747151410",
          "name": "双足飞龙骑手",
          "role": "巨兽单位",
          "race": "利扎",
          "modifiers": "【飞行】【癫狂】【引发恐惧】【惊骇敌军】",
          "size": 1,
          "desc": "",
          "equipment": {
            "helmet": {
              "name": "无",
              "desc": ""
            },
            "neckguard": {
              "name": "无",
              "desc": ""
            },
            "armor": {
              "name": "元素鳞甲",
              "desc": ""
            },
            "gloves": {
              "name": "无",
              "desc": ""
            },
            "legs": {
              "name": "无",
              "desc": ""
            },
            "weapons": [
              {
                "name": "黑曜石短矛",
                "desc": "",
                "category": "投掷"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              },
              {
                "name": "无",
                "desc": "",
                "category": "无"
              }
            ],
            "mount": {
              "name": "双足飞龙",
              "desc": ""
            }
          }
        }
      ]
    },
    "stats": {
      "diplomacy": 11,
      "stewardship": 6,
      "martial": 3,
      "intrigue": 4,
      "learning": 6,
      "prowess": 12
    }
  },
  {
    "id": "c_1794831918616_1svs2",
    "slug": "帕拉夏教团",
    "index": 23,
    "name": "帕拉夏教团",
    "race": "精灵",
    "capital": "伊苏特",
    "faith": "阿纳亚图拉信仰",
    "population": "6.3K",
    "bio": "图兰精灵曾是伊瑟兰世界的一份子，因阿纳亚图拉的显圣曾引发伊瑟兰世界的第一次分裂，但当时的白枝议长长袖善舞，团结了几乎所有的伊瑟兰精灵将阿纳亚图拉放逐出了伊瑟兰，尽管如此，仍有精灵追随阿纳亚图拉的步伐消失于草原之中——从此，他们自称“图兰精灵”。北方的人类帝国成为了他们第二家园，基于精灵认同与对先知的个人崇拜，图兰精灵成功在这片土地扎根，随着人类帝国的分裂，教团也不再遮掩其的存在，处于继业者之间的阿纳亚图拉是否能将其的信仰散播于世界？并建立起属于图兰精灵的家园，还是说埋没于历史的洪流中...不再问津...",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "政教合一制",
      "leader": {
        "name": "阿纳亚图拉",
        "title": "先知，“贯穿天地之光”",
        "avatar": "",
        "traits": [
          "暴怒",
          "懒惰",
          "狂热"
        ],
        "stats": {
          "diplomacy": 16,
          "stewardship": 4,
          "martial": 4,
          "intrigue": 4,
          "learning": 12,
          "prowess": 12
        },
        "bio": "他是光，他是热，他乃炙热的火元素所化形，以六翼的姿态显圣人前"
      },
      "factions": [
        {
          "id": "f_1794832233704",
          "name": "萨法尔祭司",
          "leader": "阿纳亚图拉",
          "influence": 63,
          "color": "#5489a2"
        },
        {
          "id": "f_1794832233897",
          "name": "塞帕赫卫队",
          "leader": "索莱马尼",
          "influence": 37,
          "color": "#b29357"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794832372408",
          "name": "第一圣殿",
          "desc": "精灵的身份认同与对先知本人的个人崇拜维系了教团草创时期不分崩离析，但也因而使得帕拉夏教团并没有先知本人设想的“博爱”，少数的人类信徒不仅处于边缘地带，而且深受歧视",
          "effect": "“在此并不分化外人、西古提人，为奴的、自主的，惟有先知是包括一切，又住在各人之内”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {}
  },
  {
    "id": "c_1794833624926_hnbrl",
    "slug": "天朝",
    "index": 24,
    "name": "天朝",
    "race": "人类",
    "capital": "洛阳",
    "faith": "先祖崇拜",
    "population": "1011K",
    "bio": "昔日强盛的天朝，如今却日渐走入衰朽之治中，刘据试图夺回神师长期把持的政治大权，各地的侯爵趁机扩张权势，而再向外看，自海上而来的民族顺河而上，延伸其的定居点；而山内的蛮夷也在向天朝的内地迁入...神师是否能够恰当应对刘据对其的挑战，让天朝的国祚再延百年？",
    "accent": "#5489a2",
    "region": {
      "name": "昉土",
      "traits": [
        "纵横水网",
        "古代遗迹"
      ],
      "customTag": "",
      "desc": "纵横交织的水网与幽深芦荡，古老的水灵盟约长眠于泥沼深处。"
    },
    "politics": {
      "system": "封建君主制",
      "leader": {
        "name": "神师",
        "title": "监国",
        "avatar": "",
        "traits": [
          "虐待狂",
          "狡诈",
          "多疑"
        ],
        "stats": {
          "diplomacy": 18,
          "stewardship": 2,
          "martial": 8,
          "intrigue": 17,
          "learning": 3,
          "prowess": 14
        },
        "bio": "回应了天朝的天子之愿，自巨树中走出，来求索那永生的“房中术”，却因此药死了当时的天子。如今，昔日的求药使成为了架空今上的辅政监国，却连一本奏疏都读不懂，只能依赖府中吏员，帮其解字"
      },
      "factions": [
        {
          "id": "f_1794833720199",
          "name": "内庭",
          "leader": "刘据",
          "influence": 37,
          "color": "#5489a2"
        },
        {
          "id": "f_1794833720360",
          "name": "监国府",
          "leader": "神师",
          "influence": 63,
          "color": "#b29357"
        }
      ],
      "modifiers": [
        {
          "id": "m_1794834182492",
          "name": "日益激烈的内外之争",
          "desc": "尽管长久以来，天朝的朝廷政治都由神师所把控，但总有王上不甘成为前者的提线木偶，试图建立自己的内朝班子，同监国相抗衡",
          "effect": "“神师！前乱乃吾父不足邪？乃复乱吾也！”"
        }
      ],
      "wonders": [],
      "heroes": []
    },
    "military": {
      "conscription": {
        "name": "",
        "desc": ""
      },
      "legions": [],
      "units": []
    },
    "stats": {}
  }
]

export default COUNTRIES
