// 由 scripts/compute-economy.mjs 自动生成，请勿手改
export default {
  "unit": {
    "name": "D（当量）",
    "desc": "一名成年人维持一天基本生活所需的商品与劳务。全大陆通用，不依赖货币。"
  },
  "goods": [
    {
      "name": "玉米（1 石 ≈ 30 kg）",
      "value": 3.2,
      "note": "主粮基准，一切折算的锚"
    },
    {
      "name": "木薯 / 根茎（1 石）",
      "value": 2,
      "note": "热量低于玉米，耐贫瘠"
    },
    {
      "name": "棉布（1 匹 ≈ 6 m）",
      "value": 8.5,
      "note": "玛雅式的“准货币”，可当贡赋与聘礼"
    },
    {
      "name": "盐（1 斗）",
      "value": 5,
      "note": "内陆硬通货，产地垄断"
    },
    {
      "name": "黑曜石（1 块标准石核）",
      "value": 4,
      "note": "刃具原料，兼作仪式用"
    },
    {
      "name": "可可豆（100 粒）",
      "value": 0.6,
      "note": "小额支付与宴饮消耗"
    },
    {
      "name": "羽毛（1 束，格查尔）",
      "value": 22,
      "note": "身份物资，贵族与神庙专用"
    },
    {
      "name": "玉石（1 件）",
      "value": 60,
      "note": "祭祀与丧葬，价值由仪式定义而非重量"
    },
    {
      "name": "普通劳役（1 人·日）",
      "value": 1,
      "note": "记帐基准本身"
    },
    {
      "name": "工匠劳役（1 人·日）",
      "value": 2.4,
      "note": "烧陶、织造、石作"
    },
    {
      "name": "祭司劳役（1 人·日）",
      "value": 3,
      "note": "历法、祭祀、医病、记事"
    }
  ],
  "traits": [
    {
      "name": "贵族势力",
      "group": "社会",
      "desc": "本土贵族与国同寿，对政治有很高影响力。",
      "e": {
        "extraction": 0.05,
        "stability": -0.02
      }
    },
    {
      "name": "僧侣集团",
      "group": "社会",
      "desc": "有组织、有成文仪轨的宗教集团。",
      "e": {
        "ritual": 0.04,
        "yield": -0.02
      }
    },
    {
      "name": "军事兄弟会",
      "group": "社会",
      "desc": "听命于国王的常备军事组织。",
      "e": {
        "military": 0.08,
        "yield": -0.02
      }
    },
    {
      "name": "多元联合",
      "group": "社会",
      "desc": "多个民族组成的联合体，靠妥协运转。",
      "e": {
        "exchange": 0.08,
        "stability": -0.03
      }
    },
    {
      "name": "边民自治社群",
      "group": "社会",
      "desc": "边地社群以贡赋换实质自治。",
      "e": {
        "extraction": -0.04,
        "stability": 0.03
      }
    },
    {
      "name": "蜜獴",
      "group": "社会",
      "desc": "边地商队与猎团，游走于政权缝隙间。",
      "e": {
        "exchange": 0.03
      }
    },
    {
      "name": "圣地",
      "group": "社会",
      "desc": "公认的中立祭祀场所，庇护与朝圣之地。",
      "e": {
        "stability": 0.05,
        "exchange": 0.03
      }
    },
    {
      "name": "劳力制度",
      "group": "经济",
      "desc": "以无偿公共劳役为经济基石。",
      "e": {
        "labor": 0.12,
        "yield": 0.04,
        "stability": -0.03
      }
    },
    {
      "name": "神庙经济",
      "group": "经济",
      "desc": "经济附着一层宗教分配，神庙是仓储与再分配中心。",
      "e": {
        "ritual": 0.06,
        "exchange": 0.02,
        "yield": -0.01
      }
    },
    {
      "name": "以物易物",
      "group": "经济",
      "desc": "市场不依赖货币，靠实物交换。",
      "e": {
        "exchange": -0.1
      }
    },
    {
      "name": "贡献经济",
      "group": "经济",
      "desc": "属邦定期缴纳定额贡赋，手工制品与贵金属为主。",
      "e": {
        "extraction": 0.08,
        "yield": 0.02
      }
    },
    {
      "name": "社会等级",
      "group": "文化",
      "desc": "血统决定阶层，等级森严。",
      "e": {
        "yield": 0.03,
        "stability": -0.04
      }
    },
    {
      "name": "圣山",
      "group": "文化",
      "desc": "山与神灵相连，可敬可畏。",
      "e": {
        "stability": 0.04
      }
    },
    {
      "name": "巫鬼之风",
      "group": "文化",
      "desc": "以神祕仪式获取族群认可。",
      "e": {
        "yield": -0.05,
        "stability": -0.02
      }
    },
    {
      "name": "神化祖先",
      "group": "文化",
      "desc": "祖先进入神话，为统治提供合法性。",
      "e": {
        "stability": 0.05,
        "extraction": 0.02
      }
    },
    {
      "name": "众为一",
      "group": "文化",
      "desc": "分布范围广，彼此存在互助认同。",
      "e": {
        "yield": 0.05,
        "stability": 0.03
      }
    },
    {
      "name": "昭昭天命",
      "group": "文化",
      "desc": "向外扩张是不可违逆的天数。",
      "e": {
        "military": 0.06,
        "stability": 0.03,
        "extraction": 0.02
      }
    },
    {
      "name": "法师社会",
      "group": "文化",
      "desc": "法师组成学徒制行会，地位高于常人。",
      "e": {
        "yield": -0.03,
        "military": 0.05,
        "stability": -0.02
      }
    },
    {
      "name": "深奥能量",
      "group": "文化",
      "desc": "统治者借神圣能量证明正当性，须反复举行仪式。",
      "e": {
        "stability": 0.06,
        "ritual": 0.03,
        "yield": -0.02
      }
    },
    {
      "name": "依赖征召",
      "group": "军事",
      "desc": "动员体系依赖平民征召。",
      "e": {
        "military": 0.04,
        "labor": 0.04,
        "yield": -0.03
      }
    },
    {
      "name": "凹凸河岸",
      "group": "地理",
      "desc": "聚居点位于河曲环绕的平岛台地，被水系屏隔包围。",
      "e": {
        "yield": 0.08,
        "exchange": 0.05
      }
    }
  ],
  "countries": [
    {
      "name": "鸾尾花帝国",
      "slug": "鸾尾花帝国",
      "population": 663000,
      "populationText": "663K",
      "area": 201,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.22,
        "extraction": 0.01,
        "ritual": 0,
        "exchange": 0.2714653976787427,
        "stability": 0.02,
        "military": 0,
        "labor": 0
      },
      "gross": 1617720000,
      "perCapita": 2440,
      "extractionRate": 0.19,
      "ritualRate": 0.06,
      "upkeep": 194126400,
      "extracted": 307366800,
      "ritual": 97063200,
      "surplus": 1019163600,
      "perCapitaSurplus": 1537,
      "surplusRate": 0.63,
      "exchange": 0.7714653976787427,
      "radius": 86,
      "reserveMonths": 4,
      "levy": 13260,
      "score": 78
    },
    {
      "name": "白昀",
      "slug": "白昀",
      "population": 201000,
      "populationText": "201K",
      "area": 149,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.13832108216679742,
        "extraction": -0.03,
        "ritual": 0,
        "exchange": 0.17566835159298838,
        "stability": 0.02,
        "military": 0,
        "labor": 0
      },
      "gross": 457605075,
      "perCapita": 2277,
      "extractionRate": 0.15,
      "ritualRate": 0.06,
      "upkeep": 54912609,
      "extracted": 68640761,
      "ritual": 27456305,
      "surplus": 306595400,
      "perCapitaSurplus": 1525,
      "surplusRate": 0.6699999999999999,
      "exchange": 0.6756683515929884,
      "radius": 70,
      "reserveMonths": 3.8,
      "levy": 4020,
      "score": 78
    },
    {
      "name": "莱塔尼亚",
      "slug": "莱塔尼亚",
      "population": 227000,
      "populationText": "227K",
      "area": 156,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.20147609082002724,
        "extraction": 0.01,
        "ritual": 0,
        "exchange": 0.24092884305711557,
        "stability": 0.02,
        "military": 0,
        "labor": 0
      },
      "gross": 545470145,
      "perCapita": 2403,
      "extractionRate": 0.19,
      "ritualRate": 0.06,
      "upkeep": 65456417,
      "extracted": 103639328,
      "ritual": 32728209,
      "surplus": 343646191,
      "perCapitaSurplus": 1514,
      "surplusRate": 0.6300000000000001,
      "exchange": 0.7409288430571156,
      "radius": 75,
      "reserveMonths": 3.9,
      "levy": 4540,
      "score": 77
    },
    {
      "name": "安格烈",
      "slug": "安格烈",
      "population": 346000,
      "populationText": "346K",
      "area": 164,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.1724197684874524,
        "extraction": 0,
        "ritual": 0,
        "exchange": 0.21593858005960628,
        "stability": 0.02,
        "military": 0.05,
        "labor": 0
      },
      "gross": 811314480,
      "perCapita": 2345,
      "extractionRate": 0.18,
      "ritualRate": 0.06,
      "upkeep": 97357738,
      "extracted": 146036606,
      "ritual": 48678869,
      "surplus": 519241267,
      "perCapitaSurplus": 1501,
      "surplusRate": 0.6399999999999999,
      "exchange": 0.7159385800596063,
      "radius": 75,
      "reserveMonths": 3.8,
      "levy": 7266,
      "score": 78
    },
    {
      "name": "遴选",
      "slug": "遴选",
      "population": 283000,
      "populationText": "283K",
      "area": 78,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.18719910040282225,
        "extraction": 0.02,
        "ritual": 0,
        "exchange": 0.33477534662670483,
        "stability": 0.02,
        "military": 0,
        "labor": 0
      },
      "gross": 671954691,
      "perCapita": 2374,
      "extractionRate": 0.19999999999999998,
      "ritualRate": 0.06,
      "upkeep": 80634563,
      "extracted": 134390938,
      "ritual": 40317281,
      "surplus": 416611908,
      "perCapitaSurplus": 1472,
      "surplusRate": 0.62,
      "exchange": 0.8347753466267048,
      "radius": 60,
      "reserveMonths": 3.8,
      "levy": 5660,
      "score": 77
    },
    {
      "name": "维瑞亚帝国",
      "slug": "维瑞亚帝国",
      "population": 228000,
      "populationText": "228K",
      "area": null,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.16159012894039326,
        "extraction": 0.01,
        "ritual": 0,
        "exchange": 0.11799177411699441,
        "stability": 0,
        "military": 0,
        "labor": 0
      },
      "gross": 529685099,
      "perCapita": 2323,
      "extractionRate": 0.19,
      "ritualRate": 0.06,
      "upkeep": 63562212,
      "extracted": 100640169,
      "ritual": 31781106,
      "surplus": 333701612,
      "perCapitaSurplus": 1464,
      "surplusRate": 0.6300000000000001,
      "exchange": 0.6179917741169945,
      "radius": 90,
      "reserveMonths": 3.8,
      "levy": 4560,
      "score": 75
    },
    {
      "name": "脱欢兀鲁斯",
      "slug": "脱欢兀鲁斯",
      "population": 25800,
      "populationText": "25.8K",
      "area": 210,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.08568808764172733,
        "extraction": -0.03,
        "ritual": 0,
        "exchange": 0.048558772599784326,
        "stability": 0.02,
        "military": 0,
        "labor": 0
      },
      "gross": 56021505,
      "perCapita": 2171,
      "extractionRate": 0.15,
      "ritualRate": 0.06,
      "upkeep": 6722581,
      "extracted": 8403226,
      "ritual": 3361290,
      "surplus": 37534409,
      "perCapitaSurplus": 1455,
      "surplusRate": 0.6699999999999999,
      "exchange": 0.5485587725997844,
      "radius": 73,
      "reserveMonths": 3.6,
      "levy": 516,
      "score": 76
    },
    {
      "name": "华国",
      "slug": "华国",
      "population": 51000,
      "populationText": "51K",
      "area": 92,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.13296020061808794,
        "extraction": 0,
        "ritual": 0,
        "exchange": 0.17530275508193044,
        "stability": 0.04,
        "military": 0.06,
        "labor": 0
      },
      "gross": 115561940,
      "perCapita": 2266,
      "extractionRate": 0.18,
      "ritualRate": 0.06,
      "upkeep": 13867433,
      "extracted": 20801149,
      "ritual": 6933716,
      "surplus": 73959642,
      "perCapitaSurplus": 1450,
      "surplusRate": 0.6399999999999999,
      "exchange": 0.6753027550819304,
      "radius": 58,
      "reserveMonths": 3.7,
      "levy": 1081,
      "score": 77
    },
    {
      "name": "薪炎龙庭",
      "slug": "薪炎龙庭",
      "population": 15400,
      "populationText": "15.4K",
      "area": 340,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.07289063088286186,
        "extraction": -0.03,
        "ritual": 0,
        "exchange": 0.003225536705921527,
        "stability": 0.02,
        "military": 0,
        "labor": 0
      },
      "gross": 33045031,
      "perCapita": 2146,
      "extractionRate": 0.15,
      "ritualRate": 0.06,
      "upkeep": 3965404,
      "extracted": 4956755,
      "ritual": 1982702,
      "surplus": 22140171,
      "perCapitaSurplus": 1438,
      "surplusRate": 0.67,
      "exchange": 0.5032255367059215,
      "radius": 86,
      "reserveMonths": 3.5,
      "levy": 308,
      "score": 75
    },
    {
      "name": "普拉纳",
      "slug": "普拉纳",
      "population": 2500,
      "populationText": "2.5K",
      "area": 139,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.07264408266101653,
        "extraction": -0.03,
        "ritual": 0,
        "exchange": -0.03240258110905081,
        "stability": 0.04,
        "military": 0,
        "labor": 0
      },
      "gross": 5363220,
      "perCapita": 2145,
      "extractionRate": 0.15,
      "ritualRate": 0.06,
      "upkeep": 643586,
      "extracted": 804483,
      "ritual": 321793,
      "surplus": 3593358,
      "perCapitaSurplus": 1437,
      "surplusRate": 0.67,
      "exchange": 0.4675974188909492,
      "radius": 57,
      "reserveMonths": 3.5,
      "levy": 50,
      "score": 75
    },
    {
      "name": "雅典",
      "slug": "雅典",
      "population": 117000,
      "populationText": "117K",
      "area": 117,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.16431292043836754,
        "extraction": 0.03,
        "ritual": 0,
        "exchange": 0.2635941003653063,
        "stability": 0.02,
        "military": 0,
        "labor": 0
      },
      "gross": 272449223,
      "perCapita": 2329,
      "extractionRate": 0.21,
      "ritualRate": 0.06,
      "upkeep": 32693907,
      "extracted": 57214337,
      "ritual": 16346953,
      "surplus": 166194026,
      "perCapitaSurplus": 1420,
      "surplusRate": 0.61,
      "exchange": 0.7635941003653063,
      "radius": 68,
      "reserveMonths": 3.7,
      "levy": 2340,
      "score": 75
    },
    {
      "name": "尼斯特",
      "slug": "尼斯特",
      "population": 249000,
      "populationText": "249K",
      "area": 167,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.14387640052032225,
        "extraction": 0.02,
        "ritual": 0,
        "exchange": 0.27377563050945414,
        "stability": 0,
        "military": 0,
        "labor": 0
      },
      "gross": 569650447,
      "perCapita": 2288,
      "extractionRate": 0.19999999999999998,
      "ritualRate": 0.06,
      "upkeep": 68358054,
      "extracted": 113930089,
      "ritual": 34179027,
      "surplus": 353183277,
      "perCapitaSurplus": 1418,
      "surplusRate": 0.62,
      "exchange": 0.7737756305094541,
      "radius": 79,
      "reserveMonths": 3.7,
      "levy": 4980,
      "score": 76
    },
    {
      "name": "昆云",
      "slug": "昆云",
      "population": 368000,
      "populationText": "368K",
      "area": 145,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.17402158196954362,
        "extraction": 0.04,
        "ritual": 0,
        "exchange": 0.2623583853150834,
        "stability": 0.07,
        "military": 0,
        "labor": 0
      },
      "gross": 864079884,
      "perCapita": 2348,
      "extractionRate": 0.22,
      "ritualRate": 0.06,
      "upkeep": 103689586,
      "extracted": 190097575,
      "ritual": 51844793,
      "surplus": 518447931,
      "perCapitaSurplus": 1409,
      "surplusRate": 0.6000000000000001,
      "exchange": 0.7623583853150834,
      "radius": 74,
      "reserveMonths": 3.7,
      "levy": 7360,
      "score": 74
    },
    {
      "name": "吉利卡斯至高国",
      "slug": "吉利卡斯至高国",
      "population": 5200,
      "populationText": "5.2K",
      "area": 101,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.10754350136989523,
        "extraction": 0.01,
        "ritual": 0,
        "exchange": 0.046554142063085224,
        "stability": 0.02,
        "military": 0,
        "labor": 0
      },
      "gross": 11518452,
      "perCapita": 2215,
      "extractionRate": 0.19,
      "ritualRate": 0.06,
      "upkeep": 1382214,
      "extracted": 2188506,
      "ritual": 691107,
      "surplus": 7256625,
      "perCapitaSurplus": 1396,
      "surplusRate": 0.63,
      "exchange": 0.5465541420630853,
      "radius": 54,
      "reserveMonths": 3.5,
      "levy": 104,
      "score": 73
    },
    {
      "name": "苇原中国",
      "slug": "苇原中国",
      "population": 205000,
      "populationText": "205K",
      "area": 73,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.1588320332221492,
        "extraction": 0.04,
        "ritual": 0,
        "exchange": 0.2615678410932816,
        "stability": 0.07,
        "military": 0,
        "labor": 0
      },
      "gross": 475121134,
      "perCapita": 2318,
      "extractionRate": 0.22,
      "ritualRate": 0.06,
      "upkeep": 57014536,
      "extracted": 104526649,
      "ritual": 28507268,
      "surplus": 285072680,
      "perCapitaSurplus": 1391,
      "surplusRate": 0.6000000000000001,
      "exchange": 0.7615678410932816,
      "radius": 56,
      "reserveMonths": 3.7,
      "levy": 4100,
      "score": 74
    },
    {
      "name": "罗讷瓦尼亚",
      "slug": "罗讷瓦尼亚",
      "population": 326000,
      "populationText": "326K",
      "area": 233,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.13087286515961716,
        "extraction": 0.04,
        "ritual": 0,
        "exchange": 0.2116689343233536,
        "stability": 0.05,
        "military": 0,
        "labor": 0
      },
      "gross": 737329108,
      "perCapita": 2262,
      "extractionRate": 0.22,
      "ritualRate": 0.06,
      "upkeep": 88479493,
      "extracted": 162212404,
      "ritual": 44239746,
      "surplus": 442397465,
      "perCapitaSurplus": 1357,
      "surplusRate": 0.6000000000000001,
      "exchange": 0.7116689343233535,
      "radius": 87,
      "reserveMonths": 3.5,
      "levy": 6520,
      "score": 73
    },
    {
      "name": "伊瑟兰议邦",
      "slug": "伊瑟兰议邦",
      "population": 14800,
      "populationText": "14.8K",
      "area": 84,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.07191942521726535,
        "extraction": 0.03,
        "ritual": 0,
        "exchange": 0.12961144869436722,
        "stability": 0,
        "military": 0,
        "labor": 0
      },
      "gross": 31728815,
      "perCapita": 2144,
      "extractionRate": 0.21,
      "ritualRate": 0.06,
      "upkeep": 3807458,
      "extracted": 6663051,
      "ritual": 1903729,
      "surplus": 19354577,
      "perCapitaSurplus": 1308,
      "surplusRate": 0.61,
      "exchange": 0.6296114486943672,
      "radius": 54,
      "reserveMonths": 3.3,
      "levy": 296,
      "score": 71
    },
    {
      "name": "德拉米共和国",
      "slug": "德拉米共和国",
      "population": 2500,
      "populationText": "2.5K",
      "area": 98,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.03264408266101654,
        "extraction": 0.02,
        "ritual": 0,
        "exchange": 0.03974051685587721,
        "stability": 0,
        "military": 0,
        "labor": 0
      },
      "gross": 5163220,
      "perCapita": 2065,
      "extractionRate": 0.19999999999999998,
      "ritualRate": 0.06,
      "upkeep": 619586,
      "extracted": 1032644,
      "ritual": 309793,
      "surplus": 3201197,
      "perCapitaSurplus": 1280,
      "surplusRate": 0.62,
      "exchange": 0.5397405168558772,
      "radius": 53,
      "reserveMonths": 3.2,
      "levy": 50,
      "score": 71
    },
    {
      "name": "学城",
      "slug": "学城",
      "population": 18500,
      "populationText": "18.5K",
      "area": 93,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.04740207668175109,
        "extraction": 0,
        "ritual": 0.03,
        "exchange": 0.08839683295605222,
        "stability": 0,
        "military": 0.04,
        "labor": 0
      },
      "gross": 38753877,
      "perCapita": 2095,
      "extractionRate": 0.18,
      "ritualRate": 0.09,
      "upkeep": 4650465,
      "extracted": 6975698,
      "ritual": 3487849,
      "surplus": 23639865,
      "perCapitaSurplus": 1278,
      "surplusRate": 0.61,
      "exchange": 0.5883968329560523,
      "radius": 54,
      "reserveMonths": 3.2,
      "levy": 385,
      "score": 71
    },
    {
      "name": "克洛斯",
      "slug": "克洛斯",
      "population": 22000,
      "populationText": "22K",
      "area": 17,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.06170367016105556,
        "extraction": 0.04,
        "ritual": 0,
        "exchange": 0.1570442925563942,
        "stability": 0.05,
        "military": 0,
        "labor": 0
      },
      "gross": 46714961,
      "perCapita": 2123,
      "extractionRate": 0.22,
      "ritualRate": 0.06,
      "upkeep": 5605795,
      "extracted": 10277292,
      "ritual": 2802898,
      "surplus": 28028977,
      "perCapitaSurplus": 1274,
      "surplusRate": 0.5999999999999999,
      "exchange": 0.6570442925563942,
      "radius": 31,
      "reserveMonths": 3.2,
      "levy": 440,
      "score": 71
    },
    {
      "name": "八菽之囿",
      "slug": "八菽之囿",
      "population": 300,
      "populationText": "0.3K",
      "area": 50,
      "traits": [],
      "traitNames": 0,
      "mod": {
        "yield": 0.026836601138410205,
        "extraction": 0.04,
        "ritual": 0,
        "exchange": -0.024302832384658163,
        "stability": 0.07,
        "military": 0,
        "labor": 0
      },
      "gross": 616102,
      "perCapita": 2054,
      "extractionRate": 0.22,
      "ritualRate": 0.06,
      "upkeep": 73932,
      "extracted": 135542,
      "ritual": 36966,
      "surplus": 369661,
      "perCapitaSurplus": 1232,
      "surplusRate": 0.6,
      "exchange": 0.47569716761534186,
      "radius": 39,
      "reserveMonths": 3.1,
      "levy": 6,
      "score": 68
    },
    {
      "name": "玉海国",
      "slug": "玉海国",
      "population": 203000,
      "populationText": "203K",
      "area": 328,
      "traits": [
        "贵族势力",
        "僧侣集团",
        "军事兄弟会",
        "多元联合",
        "边民自治社群",
        "蜜獴",
        "圣地",
        "劳力制度",
        "神庙经济",
        "以物易物",
        "贡献经济",
        "社会等级",
        "圣山",
        "巫鬼之风",
        "神化祖先",
        "众为一",
        "昭昭天命",
        "法师社会",
        "深奥能量",
        "依赖征召",
        "凹凸河岸"
      ],
      "traitNames": 21,
      "mod": {
        "yield": 0.23857781004555392,
        "extraction": 0.14,
        "ritual": 0.13,
        "exchange": 0.31881128390741764,
        "stability": 0.15,
        "military": 0.23,
        "labor": 0.16
      },
      "gross": 502862591,
      "perCapita": 2477,
      "extractionRate": 0.32,
      "ritualRate": 0.19,
      "upkeep": 60343511,
      "extracted": 160916029,
      "ritual": 95543892,
      "surplus": 186059159,
      "perCapitaSurplus": 917,
      "surplusRate": 0.37000000000000005,
      "exchange": 0.8188112839074176,
      "radius": 110,
      "reserveMonths": 3.3,
      "levy": 4994,
      "score": 52
    }
  ],
  "detail": [
    {
      "name": "玉海国",
      "parts": [
        {
          "label": "谷物与根茎",
          "value": 291660303,
          "color": "#8fae6a"
        },
        {
          "label": "织物与陶器",
          "value": 85486640,
          "color": "#b08a4f"
        },
        {
          "label": "盐与黑曜石",
          "value": 55314885,
          "color": "#6f8ba8"
        },
        {
          "label": "贡赋与转输",
          "value": 45257633,
          "color": "#9c6f9c"
        },
        {
          "label": "朝圣与仪式",
          "value": 25143130,
          "color": "#c9a24a"
        }
      ]
    }
  ]
}
