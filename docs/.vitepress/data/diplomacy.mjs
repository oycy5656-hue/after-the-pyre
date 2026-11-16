// 由 .tools/build-diplomacy.mjs 生成：政治实体名录与关系
const DIPLOMACY = {
 "blocs": [
  {
   "id": "bloc:viria",
   "name": "维瑞亚帝国",
   "alias": [
    "维瑞亚"
   ],
   "type": "家族帝国",
   "leader": "基尼格",
   "player": "基尼格",
   "members": [
    "基尼格",
    "蒙格王朝",
    "哈巴哲",
    "斯皮格"
   ],
   "note": "名义上是一个帝国，实际由四个家族共治；玩家扮演基尼格家族。",
   "color": "#6f8ba8"
  },
  {
   "id": "bloc:iseran",
   "name": "伊瑟兰世界",
   "alias": [
    "伊瑟兰议邦",
    "白枝联邦"
   ],
   "type": "议邦联邦",
   "leader": "伊瑟兰",
   "player": "",
   "members": [
    "伊瑟兰",
    "尤维尔",
    "菲尔汀",
    "希洛亚",
    "缇洛伦"
   ],
   "note": "又称伊瑟兰议邦，由白枝议长主持的精灵诸邦联盟。",
   "color": "#7fb8a0"
  },
  {
   "id": "bloc:paraxia",
   "name": "帕拉夏教团",
   "alias": [
    "图兰精灵"
   ],
   "type": "政教一体",
   "leader": "帕拉夏教团",
   "player": "",
   "members": [
    "帕拉夏教团",
    "林普斯",
    "罗金吉亚"
   ],
   "note": "以阿纳亚图拉为第一先知的图兰精灵教团，下辖两处附庸。",
   "color": "#4fae8c"
  },
  {
   "id": "bloc:iris",
   "name": "鸢尾花（分裂）",
   "alias": [
    "鸢尾花帝国",
    "鸾尾花帝国"
   ],
   "type": "分裂中的帝国",
   "leader": "—",
   "player": "",
   "members": [
    "鸾尾花",
    "安茹"
   ],
   "memberLabels": {
    "鸾尾花": "鸢尾花王朝",
    "安茹": "安茄王朝"
   },
   "note": "旧鸢尾花帝国已分裂：安茄王朝据有新土，鸢尾花王朝保有旧统，两方皆自称正统。",
   "color": "#b36e67"
  }
 ],
 "generatedAt": "2026-11-16",
 "entities": [
  {
   "id": "state:2",
   "stateId": 2,
   "name": "玉海国",
   "recorded": true,
   "countryName": "玉海国",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "封建君主制",
   "capital": "玉京",
   "population": "203K",
   "cells": 25,
   "color": "#3190ed",
   "area": 325,
   "region": "昉土"
  },
  {
   "id": "state:3",
   "stateId": 3,
   "name": "普拉纳",
   "recorded": true,
   "countryName": "普拉纳",
   "race": "凤仙",
   "faith": "先祖崇拜",
   "system": "氏族联盟",
   "capital": "普拉纳",
   "population": "2.5K",
   "cells": 9,
   "color": "#7ff558",
   "area": 117,
   "region": "昉土"
  },
  {
   "id": "state:4",
   "stateId": 4,
   "name": "吉利卡斯",
   "recorded": true,
   "countryName": "吉利卡斯至高国",
   "race": "精灵",
   "faith": "先祖崇拜",
   "system": "封建君主制",
   "capital": "吉利卡斯",
   "population": "5.2K",
   "cells": 5,
   "color": "#e8b02e",
   "area": 65,
   "region": "昉土"
  },
  {
   "id": "state:6",
   "stateId": 6,
   "name": "罗讷瓦尼亚",
   "recorded": true,
   "countryName": "罗讷瓦尼亚",
   "race": "人类",
   "faith": "水龙崇拜",
   "system": "神王统治",
   "capital": "罗讷瓦尼亚",
   "population": "326K",
   "cells": 14,
   "color": "#5c66d6",
   "area": 182,
   "region": "昉土"
  },
  {
   "id": "state:7",
   "stateId": 7,
   "name": "昆云",
   "recorded": true,
   "countryName": "昆云",
   "race": "人类",
   "faith": "雷龙崇拜",
   "system": "神王统治",
   "capital": "昆云",
   "population": "368K",
   "cells": 8,
   "color": "#8823eb",
   "area": 104,
   "region": "昉土"
  },
  {
   "id": "state:8",
   "stateId": 8,
   "name": "遴选城",
   "recorded": true,
   "countryName": "遴选",
   "race": "人类",
   "faith": "白虎崇拜",
   "system": "贵族共和制",
   "capital": "遴选",
   "population": "283K",
   "cells": 5,
   "color": "#a3a3a3",
   "area": 65,
   "region": "昉土"
  },
  {
   "id": "state:9",
   "stateId": 9,
   "name": "八薮之囿",
   "recorded": true,
   "countryName": "八菽之囿",
   "race": "神明灵",
   "faith": "先祖崇拜",
   "system": "神王统治",
   "capital": "八薮之囿",
   "population": "0.3K",
   "cells": 5,
   "color": "#daffff",
   "area": 65,
   "region": "昉土"
  },
  {
   "id": "state:10",
   "stateId": 10,
   "name": "苇原中国",
   "recorded": true,
   "countryName": "苇原中国",
   "race": "人类",
   "faith": "高天原崇拜",
   "system": "神王统治",
   "capital": "苇原",
   "population": "205K",
   "cells": 8,
   "color": "#cd3daa",
   "area": 104,
   "region": "昉土"
  },
  {
   "id": "state:11",
   "stateId": 11,
   "name": "白韵",
   "recorded": true,
   "countryName": "白昀",
   "race": "人类",
   "faith": "图腾崇拜",
   "system": "氏族联盟",
   "capital": "白韵",
   "population": "201K",
   "cells": 9,
   "color": "#6351c4",
   "area": 117,
   "region": "亥土"
  },
  {
   "id": "state:12",
   "stateId": 12,
   "name": "脱欢兀鲁斯",
   "recorded": true,
   "countryName": "脱欢兀鲁斯",
   "race": "兽怪",
   "faith": "先祖崇拜",
   "system": "氏族联盟",
   "capital": "脱欢",
   "population": "25.8K",
   "cells": 11,
   "color": "#96dede",
   "area": 143,
   "region": "亥土"
  },
  {
   "id": "state:13",
   "stateId": 13,
   "name": "莱塔尼亚",
   "recorded": true,
   "countryName": "莱塔尼亚",
   "race": "人类",
   "faith": "原始崇拜",
   "system": "封建君主制",
   "capital": "莱塔尼亚",
   "population": "227K",
   "cells": 8,
   "color": "#ff5c66",
   "area": 104,
   "region": "昉土"
  },
  {
   "id": "state:14",
   "stateId": 14,
   "name": "德拉米",
   "recorded": true,
   "countryName": "德拉米共和国",
   "race": "小精灵",
   "faith": "原始崇拜",
   "system": "贵族共和制",
   "capital": "德拉米",
   "population": "2.5K",
   "cells": 8,
   "color": "#cb3dab",
   "area": 104,
   "region": "昉土"
  },
  {
   "id": "state:15",
   "stateId": 15,
   "name": "奥克萨隆",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "奥克瑞姆",
   "population": "",
   "cells": 24,
   "color": "#3ea43e",
   "area": 312,
   "region": ""
  },
  {
   "id": "state:17",
   "stateId": 17,
   "name": "安格烈",
   "recorded": true,
   "countryName": "安格烈",
   "race": "人类",
   "faith": "原始一神论",
   "system": "蛮族王国",
   "capital": "安格烈",
   "population": "346K",
   "cells": 11,
   "color": "#843eb1",
   "area": 143,
   "region": "昉土"
  },
  {
   "id": "state:18",
   "stateId": 18,
   "name": "华国",
   "recorded": true,
   "countryName": "华国",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "军事民主制",
   "capital": "华城",
   "population": "51K",
   "cells": 7,
   "color": "#ff645b",
   "area": 91,
   "region": "昉土"
  },
  {
   "id": "state:19",
   "stateId": 19,
   "name": "泷",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "泷方",
   "population": "",
   "cells": 28,
   "color": "#ff8f36",
   "area": 364,
   "region": ""
  },
  {
   "id": "state:20",
   "stateId": 20,
   "name": "炎",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "龙门",
   "population": "",
   "cells": 21,
   "color": "#664dbf",
   "area": 273,
   "region": ""
  },
  {
   "id": "state:21",
   "stateId": 21,
   "name": "尼斯特",
   "recorded": true,
   "countryName": "尼斯特",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "贵族共和制",
   "capital": "尼斯特",
   "population": "249K",
   "cells": 14,
   "color": "#81f558",
   "area": 182,
   "region": "央土"
  },
  {
   "id": "state:22",
   "stateId": 22,
   "name": "鸾尾花",
   "recorded": true,
   "countryName": "鸾尾花帝国",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "封建君主制",
   "capital": "鸾城",
   "population": "663K",
   "cells": 11,
   "color": "#f79d31",
   "area": 143,
   "region": "昉土",
   "blocName": "鸢尾花（分裂）",
   "blocLeader": "—",
   "isPlayerHouse": ""
  },
  {
   "id": "state:23",
   "stateId": 23,
   "name": "安茹",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "安茹",
   "population": "",
   "cells": 10,
   "color": "#ecab2e",
   "area": 130,
   "region": "",
   "blocName": "鸢尾花（分裂）",
   "blocLeader": "—",
   "isPlayerHouse": ""
  },
  {
   "id": "state:24",
   "stateId": 24,
   "name": "雅典",
   "recorded": true,
   "countryName": "雅典",
   "race": "人类",
   "faith": "图腾崇拜",
   "system": "寡头共和制",
   "capital": "雅典",
   "population": "117K",
   "cells": 7,
   "color": "#427ce0",
   "area": 91,
   "region": "昉土"
  },
  {
   "id": "state:25",
   "stateId": 25,
   "name": "基尼格",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "基尼格",
   "population": "",
   "cells": 17,
   "color": "#5069d9",
   "area": 221,
   "region": "",
   "blocName": "维瑞亚帝国",
   "blocLeader": "基尼格",
   "isPlayerHouse": true
  },
  {
   "id": "state:26",
   "stateId": 26,
   "name": "哈巴哲",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "哈巴哲",
   "population": "",
   "cells": 20,
   "color": "#1ac8c2",
   "area": 260,
   "region": "",
   "blocName": "维瑞亚帝国",
   "blocLeader": "基尼格",
   "isPlayerHouse": false
  },
  {
   "id": "state:27",
   "stateId": 27,
   "name": "学城",
   "recorded": true,
   "countryName": "学城",
   "race": "人类",
   "faith": "无",
   "system": "魔权共和制",
   "capital": "学城",
   "population": "18.5K",
   "cells": 5,
   "color": "#575757",
   "area": 65,
   "region": "央土"
  },
  {
   "id": "state:28",
   "stateId": 28,
   "name": "斯皮格",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "斯皮格",
   "population": "",
   "cells": 10,
   "color": "#a43cb3",
   "area": 130,
   "region": "",
   "blocName": "维瑞亚帝国",
   "blocLeader": "基尼格",
   "isPlayerHouse": false
  },
  {
   "id": "state:29",
   "stateId": 29,
   "name": "蒙格王朝",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "蒙格",
   "population": "",
   "cells": 10,
   "color": "#ff744a",
   "area": 130,
   "region": "",
   "blocName": "维瑞亚帝国",
   "blocLeader": "基尼格",
   "isPlayerHouse": false
  },
  {
   "id": "state:30",
   "stateId": 30,
   "name": "佩克利菲亚",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "佩特拉",
   "population": "",
   "cells": 23,
   "color": "#b9e54a",
   "area": 299,
   "region": ""
  },
  {
   "id": "state:31",
   "stateId": 31,
   "name": "阿里斯特",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "阿瑞斯顿",
   "population": "",
   "cells": 19,
   "color": "#1ddea4",
   "area": 247,
   "region": ""
  },
  {
   "id": "state:32",
   "stateId": 32,
   "name": "伊瑟兰",
   "recorded": true,
   "countryName": "伊瑟兰议邦",
   "race": "精灵",
   "faith": "自然崇拜",
   "system": "寡头共和制",
   "capital": "伊瑟兰",
   "population": "14.8K",
   "cells": 6,
   "color": "#3988e1",
   "area": 78,
   "region": "昉土",
   "blocName": "伊瑟兰世界",
   "blocLeader": "伊瑟兰",
   "isPlayerHouse": ""
  },
  {
   "id": "state:34",
   "stateId": 34,
   "name": "赫奇顿",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "赫奇顿",
   "population": "",
   "cells": 28,
   "color": "#e87d7d",
   "area": 364,
   "region": ""
  },
  {
   "id": "state:35",
   "stateId": 35,
   "name": "缇洛伦",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "缇洛伦",
   "population": "",
   "cells": 3,
   "color": "#f0a62f",
   "area": 39,
   "region": "",
   "blocName": "伊瑟兰世界",
   "blocLeader": "伊瑟兰",
   "isPlayerHouse": ""
  },
  {
   "id": "state:36",
   "stateId": 36,
   "name": "菲尔汀",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "菲尔汀",
   "population": "",
   "cells": 5,
   "color": "#ff5e64",
   "area": 65,
   "region": "",
   "blocName": "伊瑟兰世界",
   "blocLeader": "伊瑟兰",
   "isPlayerHouse": ""
  },
  {
   "id": "state:37",
   "stateId": 37,
   "name": "尤维尔",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "尤维尔",
   "population": "",
   "cells": 3,
   "color": "#ff645c",
   "area": 39,
   "region": "",
   "blocName": "伊瑟兰世界",
   "blocLeader": "伊瑟兰",
   "isPlayerHouse": ""
  },
  {
   "id": "state:38",
   "stateId": 38,
   "name": "希洛亚",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "希洛亚",
   "population": "",
   "cells": 4,
   "color": "#2eed85",
   "area": 52,
   "region": "",
   "blocName": "伊瑟兰世界",
   "blocLeader": "伊瑟兰",
   "isPlayerHouse": ""
  },
  {
   "id": "state:39",
   "stateId": 39,
   "name": "克洛斯",
   "recorded": true,
   "countryName": "克洛斯",
   "race": "亚基",
   "faith": "原始崇拜",
   "system": "神王统治",
   "capital": "克洛斯",
   "population": "22K",
   "cells": 1,
   "color": "#ff7549",
   "area": 13,
   "region": "垠土"
  },
  {
   "id": "state:40",
   "stateId": 40,
   "name": "薪炎龙庭",
   "recorded": true,
   "countryName": "薪炎龙庭",
   "race": "利扎",
   "faith": "先祖崇拜",
   "system": "氏族联盟",
   "capital": "薪炎龙庭",
   "population": "15.4K",
   "cells": 6,
   "color": "#c2452f",
   "area": 78,
   "region": "垠土"
  },
  {
   "id": "state:41",
   "stateId": 41,
   "name": "奥奇坎纳塔",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "奥奇坎纳塔",
   "population": "",
   "cells": 17,
   "color": "#8e4fa8",
   "area": 221,
   "region": ""
  },
  {
   "id": "state:42",
   "stateId": 42,
   "name": "天朝",
   "recorded": true,
   "countryName": "天朝",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "封建君主制",
   "capital": "洛阳",
   "population": "1011K",
   "cells": 16,
   "color": "#c9a24a",
   "area": 208,
   "region": "昉土"
  },
  {
   "id": "state:43",
   "stateId": 43,
   "name": "帕拉夏教团",
   "recorded": true,
   "countryName": "帕拉夏教团",
   "race": "精灵",
   "faith": "阿纳亚图拉信仰",
   "system": "政教合一制",
   "capital": "苏特",
   "population": "6.3K",
   "cells": 3,
   "color": "#4fae8c",
   "area": 39,
   "region": "昉土",
   "blocName": "帕拉夏教团",
   "blocLeader": "帕拉夏教团",
   "isPlayerHouse": ""
  },
  {
   "id": "state:44",
   "stateId": 44,
   "name": "林普斯",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "帕兹尼顿",
   "population": "",
   "cells": 12,
   "color": "#d07a3c",
   "area": 156,
   "region": "",
   "blocName": "帕拉夏教团",
   "blocLeader": "帕拉夏教团",
   "isPlayerHouse": ""
  },
  {
   "id": "state:45",
   "stateId": 45,
   "name": "罗金吉亚",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "",
   "capital": "托特福",
   "population": "",
   "cells": 6,
   "color": "#5b7fc7",
   "area": 78,
   "region": "",
   "blocName": "帕拉夏教团",
   "blocLeader": "帕拉夏教团",
   "isPlayerHouse": ""
  },
  {
   "id": "bloc:viria",
   "stateId": 0,
   "name": "维瑞亚帝国",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "家族帝国",
   "capital": "",
   "population": "",
   "cells": 57,
   "color": "#6f8ba8",
   "area": 0,
   "region": "",
   "bloc": true,
   "leader": "基尼格",
   "player": "基尼格",
   "members": [
    "基尼格",
    "蒙格王朝",
    "哈巴哲",
    "斯皮格"
   ],
   "note": "名义上是一个帝国，实际由四个家族共治；玩家扮演基尼格家族。"
  },
  {
   "id": "bloc:iseran",
   "stateId": 0,
   "name": "伊瑟兰世界",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "议邦联邦",
   "capital": "",
   "population": "",
   "cells": 21,
   "color": "#7fb8a0",
   "area": 0,
   "region": "",
   "bloc": true,
   "leader": "伊瑟兰",
   "player": "",
   "members": [
    "伊瑟兰",
    "尤维尔",
    "菲尔汀",
    "希洛亚",
    "缇洛伦"
   ],
   "note": "又称伊瑟兰议邦，由白枝议长主持的精灵诸邦联盟。"
  },
  {
   "id": "bloc:paraxia",
   "stateId": 0,
   "name": "帕拉夏教团",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "政教一体",
   "capital": "",
   "population": "",
   "cells": 21,
   "color": "#4fae8c",
   "area": 0,
   "region": "",
   "bloc": true,
   "leader": "帕拉夏教团",
   "player": "",
   "members": [
    "帕拉夏教团",
    "林普斯",
    "罗金吉亚"
   ],
   "note": "以阿纳亚图拉为第一先知的图兰精灵教团，下辖两处附庸。",
   "blocName": "帕拉夏教团",
   "blocLeader": "帕拉夏教团",
   "isPlayerHouse": ""
  },
  {
   "id": "bloc:iris",
   "stateId": 0,
   "name": "鸢尾花（分裂）",
   "recorded": false,
   "countryName": "",
   "race": "",
   "faith": "",
   "system": "分裂中的帝国",
   "capital": "",
   "population": "",
   "cells": 21,
   "color": "#b36e67",
   "area": 0,
   "region": "",
   "bloc": true,
   "leader": "—",
   "player": "",
   "members": [
    "鸾尾花",
    "安茹"
   ],
   "note": "旧鸢尾花帝国已分裂：安茄王朝据有新土，鸢尾花王朝保有旧统，两方皆自称正统。"
  }
 ],
 "countries": [
  {
   "name": "玉海国",
   "slug": "玉海国",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "封建君主制",
   "capital": "玉京",
   "population": "203K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "尽管玉海的神话不断将天皇的统治延长至恒古，但它始终是一个年轻的国家，随着先祖扫荡岛东诸多氏族，并于如今的玉京立国，传到如今圆融手中也不过两代尔尔。这位古怪的天皇在幼时就已因为其的固执与急躁让服侍其的宫女苦不堪言，随着其父亲因衰老而放手让其亲政以来，圆融便以“上不便”的理由革除了诸多需要天皇亲临的繁复仪式，虽然围绕在圆融周围的政治势力都认为这些仪轨会在其登基时重新开展，可圆融以实际行动证明了其的延续。久居于宫中的天皇不再频繁地于人群中显露其的容颜，招致了流言蜚语的传播，东方的阿奴与西方的和族亦蠢蠢欲动，夜狮的神嗣或许需要以其的兵戈再现其的荣光，以彰显玉海那神圣而不可侵犯的地位之延续...",
   "leader": {
    "name": "圆融",
    "title": "天皇"
   },
   "factions": [
    {
     "name": "宫家",
     "influence": 35,
     "color": "#5489a2"
    },
    {
     "name": "公家",
     "influence": 36,
     "color": "#b29357"
    },
    {
     "name": "武家",
     "influence": 21,
     "color": "#518c76"
    },
    {
     "name": "祝部",
     "influence": 8,
     "color": "#b36e67"
    }
   ],
   "onMap": true,
   "stateName": "玉海国",
   "cells": 25,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "八菽之囿",
   "slug": "八菽之囿",
   "race": "神明灵",
   "faith": "先祖崇拜",
   "system": "神王统治",
   "capital": "无",
   "population": "0.3K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "神明灵早已忘却那覆灭故国的名字，忘却自己生前的名字，仅凭那残破的记忆与执念，化作倒影在废墟中游荡。虞皞于这迷幻的白雾中窥视着它们的徒劳，并为此落泪，于是祂以神明灵那残破的记忆化作“阴天子”，甘愿带领这群神明灵于这迷雾缭绕的泽国中建立起名为“八菽”的亡魂之城。神明灵们夺舍这山精水怪，化作光怪陆离的妖魔游荡于这水泽之间——对于凡人而言，这里是生者止步的禁地；而对于那些亡魂而言，这里则是它们彻底消散前的最后归宿",
   "leader": {
    "name": "虞皞",
    "title": "东海伯"
   },
   "factions": [
    {
     "name": "虞皞",
     "influence": 82,
     "color": "#5489a2"
    },
    {
     "name": "巫祝",
     "influence": 18,
     "color": "#b29357"
    }
   ],
   "onMap": true,
   "stateName": "八薮之囿",
   "cells": 5,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "苇原中国",
   "slug": "苇原中国",
   "race": "人类",
   "faith": "高天原崇拜",
   "system": "神王统治",
   "capital": "高天原",
   "population": "205K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "苇原的建立离不开那神秘莫测的姐弟——天照命与月度命，祂们就如同受天感召一般降临于苇原大地，不过眨眼片刻，苇原人便在祂们的带领下走出蛮荒的年代，过去茹毛饮血的诸氏族如今摇身一变，成为了坐镇高天原的名家贵族，狂热地崇拜着那天照命与月读命。但与狂热的名家不同，姐弟二人对于苇原的未来仍旧充满着不确定，自西而来的海上民族冲击着周遭的岛屿，冲刷着湖岛上的民族；而南方，来自雷龙之王操纵着不被姐妹二人掌控的雷电；北方，遗世独立的神明灵时常化作妖怪侵扰苇原的边境...",
   "leader": {
    "name": "天照命",
    "title": "大御神大人"
   },
   "factions": [
    {
     "name": "御所",
     "influence": 46,
     "color": "#5489a2"
    },
    {
     "name": "名家",
     "influence": 35,
     "color": "#b29357"
    },
    {
     "name": "守护",
     "influence": 19,
     "color": "#518c76"
    }
   ],
   "onMap": true,
   "stateName": "苇原中国",
   "cells": 8,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "昆云",
   "slug": "昆云",
   "race": "人类",
   "faith": "雷龙崇拜",
   "system": "神王统治",
   "capital": "龙京",
   "population": "368K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "于历史的迷雾中降临，自昆云有史以来，其人便自诩与龙同行的国家，伟大的龙帝以其的伟力建立起不可撼动的昆云国，并庇佑着昆云的土地风调雨顺。然而，漫长的时光，龙帝都沉溺于那无功而返的探求过去的行动，，忘却了曾许下的进取诺言，随着那一声不由其掌控的雷霆于其身侧响起，它才恍然发现，不知何时开始，雷霆的威光便不由其独享，北方新兴的苇原国，于其来说神秘莫测的天照命与月读命竟能染指其的权柄。幸好，它仍有弥补的机会——既是，行使身为君主的大权；又是，补完自己那空缺的过去",
   "leader": {
    "name": "尧",
    "title": "龙帝"
   },
   "factions": [
    {
     "name": "龙庭",
     "influence": 72,
     "color": "#5489a2"
    },
    {
     "name": "公卿",
     "influence": 28,
     "color": "#b29357"
    }
   ],
   "onMap": true,
   "stateName": "昆云",
   "cells": 8,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "遴选",
   "slug": "遴选",
   "race": "人类",
   "faith": "白虎崇拜",
   "system": "贵族共和制",
   "capital": "遴选城",
   "population": "283K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "羌人的先祖于岩缝中找到了刚自地脉诞生的白虎，并同其立下盟约，白虎便庇佑着羌人建立了遴选城，可随着时间推移，白虎对于羌人政治的干预日益减少，除了一年一度的请仙仪式外，祂绝大多数的时间都栖息于羌人为其建造的行宫中...进行着...修仙？随着长老院的大姓第一次因土地纷争而分为泾渭分明的赵姚二党，遴选城的政治议题便因双方之间的政治冲突而陷入停滞中，而对于那些请求白虎出山整治环境的意愿，祂大多都不予理会，只有再最危险的时候祂才会履行同羌人的盟约行使权力。但如今的局势，纷争不休的遴选城又一次陷入停摆中，不见那自河口向内侵扰的“华人”，亦不管那欲意进取的炎国君主，白虎会选择行使祂的神圣权利干预遴选的政治吗？还是相信羌人，相信他们有足够的能力应对未来的挑战？",
   "leader": {
    "name": "白虎",
    "title": "灵霄上清统雷元阳妙一飞玄真君"
   },
   "factions": [
    {
     "name": "赵党",
     "influence": 34,
     "color": "#b29357"
    },
    {
     "name": "姚党",
     "influence": 38,
     "color": "#518c76"
    },
    {
     "name": "清流",
     "influence": 12,
     "color": "#b36e67"
    },
    {
     "name": "太祝",
     "influence": 16,
     "color": "#7b6899"
    }
   ],
   "onMap": true,
   "stateName": "遴选城",
   "cells": 5,
   "neighbors": [],
   "mentions": [
    "遴选城"
   ]
  },
  {
   "name": "华国",
   "slug": "华国",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "军事民主制",
   "capital": "华城",
   "population": "51K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "华人在左大帅的率领下冲入云梦泽，试图在这异土建立起属于华人的独立城邦，左大帅的确成功了，他在泷河的河口建立起华城，并供养起追随他的庞大军势以捍卫城邦的独立，却使得城邦的负担愈加沉重。土地的产出显然无法供养起这支庞大的军队，华人重拾起过去佣兵的传统，成功在这云梦泽打响自己的名头，但这也使得华人不得不介入这复杂的列国政治中去，泷国的朝廷时刻想要将其的影响力施加在华城中，却遭到了左大帅的抵制，只是这位戎马一生的将军终有衰老的时刻，而那围绕其运转的亲军是否能够认可其的继承者？我们尚未可知...",
   "leader": {
    "name": "左大帅",
    "title": "平寇将军"
   },
   "factions": [
    {
     "name": "亲炎派",
     "influence": 8,
     "color": "#5489a2"
    },
    {
     "name": "亲泷派",
     "influence": 25,
     "color": "#b29357"
    },
    {
     "name": "海民派",
     "influence": 19,
     "color": "#518c76"
    },
    {
     "name": "亲兵",
     "influence": 48,
     "color": "#7b6899"
    }
   ],
   "onMap": true,
   "stateName": "华国",
   "cells": 7,
   "neighbors": [
    "泷"
   ],
   "mentions": []
  },
  {
   "name": "德拉米共和国",
   "slug": "德拉米共和国",
   "race": "小精灵",
   "faith": "原始崇拜",
   "system": "贵族共和制",
   "capital": "德拉米",
   "population": "2.5K",
   "region": "昉土",
   "regionTraits": [
    "商贸航线",
    "旧都残殿"
   ],
   "bio": "实际上...精灵帝国严格意义上并没有统治过小精灵，长久以来，他们都过着与世无争的美好生活，时代的变迁并没有影响到他们的哪怕一分一毫，直到——人类的到来。随着帝国岛被奥克萨隆大元帅率领的海上民族所攻陷后，精灵对于周遭领土的统治顷刻间化为乌有，人类开始频繁闯入小精灵的生活中，第一只小精灵被海上民族当作贡品献给大元帅后，海民便时常组织狩猎队猎杀小精灵，因而也给了第七百六十四位拉让米成为独裁官的机会。随着小精灵同人类的矛盾愈发尖锐，一次流血冲突，小精灵意外将率领狩猎队的奥克萨隆嫡子打死后，愤怒的元帅显然想要将这些小精灵赶尽杀绝，以来告慰他死去的孩子了",
   "leader": {
    "name": "第七百六十四位拉让米",
    "title": "凯撒"
   },
   "factions": [
    {
     "name": "平民派",
     "influence": 25,
     "color": "#5489a2"
    },
    {
     "name": "阿夸家族（贵人派）",
     "influence": 16,
     "color": "#518c76"
    },
    {
     "name": "赫尔比亚家族（贵人派）",
     "influence": 13,
     "color": "#7b6899"
    },
    {
     "name": "佩特里亚家族（贵人派）",
     "influence": 8,
     "color": "#4c7387"
    },
    {
     "name": "弗尔米尼亚家族（贵人派）",
     "influence": 15,
     "color": "#93845b"
    },
    {
     "name": "伊格尼斯家族（贵人派）",
     "influence": 11,
     "color": "#5489a2"
    },
    {
     "name": "泽菲利家族（贵人派）",
     "influence": 12,
     "color": "#b29357"
    }
   ],
   "onMap": true,
   "stateName": "德拉米",
   "cells": 8,
   "neighbors": [],
   "mentions": [
    "奥克萨隆"
   ]
  },
  {
   "name": "莱塔尼亚",
   "slug": "莱塔尼亚",
   "race": "人类",
   "faith": "原始崇拜",
   "system": "封建君主制",
   "capital": "莱塔尼亚",
   "population": "227K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "随着精灵帝国的崩溃，施加在莱塔尼亚人的枷锁已然过去，而此时，一律微风化作他们的模样，带领莱塔尼亚人建立了属于他们的国家——噢，海民，你在帝国岛肆虐，可这又与莱塔尼亚人有何关系呢？",
   "leader": {
    "name": "夜皇",
    "title": "皇"
   },
   "factions": [
    {
     "name": "乌提卡家族",
     "influence": 40,
     "color": "#5489a2"
    },
    {
     "name": "沃尔夫冈家族",
     "influence": 27,
     "color": "#b29357"
    },
    {
     "name": "德罗斯特家族",
     "influence": 33,
     "color": "#518c76"
    }
   ],
   "onMap": true,
   "stateName": "莱塔尼亚",
   "cells": 8,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "安格烈",
   "slug": "安格烈",
   "race": "人类",
   "faith": "原始一神论",
   "system": "蛮族王国",
   "capital": "安格烈",
   "population": "346K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "诸多随奥克萨隆迁入帝国岛的海上民族之一，在奥克萨隆见过的民族中，安格烈恐怕是那最为酷爱鲜血的——战俘被当作牲祭献给天父，巫祭将新鲜的头颅剥离皮囊，变作用以施术的法器。也因而，在其他海上民族同奥克萨隆元帅国保持着千丝万缕的关系时，安格烈是那最早建立起独立的政治体系的征服者王国，而战争的号角再次在帝国岛响彻，伟大的帝国毁灭者——奥克萨隆大元帅，正在呼唤那些曾与其一同侵入帝国的海民，荡绝所有的小精灵。巫王会欣然加入这伟大的大狩猎中吗？还是说他已然有另外的选择，来献给伟大的天父？",
   "leader": {
    "name": "巫王",
    "title": "巫王"
   },
   "factions": [
    {
     "name": "王庭",
     "influence": 34,
     "color": "#5489a2"
    },
    {
     "name": "巫祭",
     "influence": 39,
     "color": "#b29357"
    },
    {
     "name": "战团",
     "influence": 27,
     "color": "#518c76"
    }
   ],
   "onMap": true,
   "stateName": "安格烈",
   "cells": 11,
   "neighbors": [],
   "mentions": [
    "奥克萨隆"
   ]
  },
  {
   "name": "吉利卡斯至高国",
   "slug": "吉利卡斯至高国",
   "race": "精灵",
   "faith": "先祖崇拜",
   "system": "封建君主制",
   "capital": "吉利卡斯",
   "population": "5.2K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "帝国已然覆灭，昔日戍边的军团长已在其军士的拥簇下加冕为了至高王，但他并未因此感到高兴——王国内，那些昔日拥簇他加冕为王的军士正迫切地希望他们的王能够带领他们打回帝国岛；而王国之外，所能见到的只有蛮族、蛮族、还有蛮族，克拉兹尼必须小心翼翼地行使他作为至高王的权柄，以免其的王国在顷刻间被颠覆...",
   "leader": {
    "name": "克拉兹尼·佐·菲德索托孟卡",
    "title": "至高王"
   },
   "factions": [
    {
     "name": "还乡团",
     "influence": 77,
     "color": "#5489a2"
    },
    {
     "name": "本土派",
     "influence": 23,
     "color": "#b29357"
    }
   ],
   "onMap": true,
   "stateName": "吉利卡斯",
   "cells": 5,
   "neighbors": [],
   "mentions": [
    "吉利卡斯"
   ]
  },
  {
   "name": "普拉纳",
   "slug": "普拉纳",
   "race": "凤仙",
   "faith": "先祖崇拜",
   "system": "氏族联盟",
   "capital": "普拉纳",
   "population": "2.5K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "普拉纳凤仙迁至帝国岛的时间早于海上民族侵扰，一直以来，凤仙都以作为精灵的斥候为生，一些富裕的精灵王公也乐意组建以凤仙为主的亲卫队，可随着帝国倾覆，普拉纳凤仙失去了绝大多数的经济来源，对于这些不善耕作的天空民族来说，周遭的人类已然开始侵占他们生活的土地，或许昔日的传统生活很快将要被打破，大家都在等待那最为悠久的老祖奶——库拉拉发话...",
   "leader": {
    "name": "“虹弓”库拉拉",
    "title": "老祖母"
   },
   "factions": [
    {
     "name": "斯涅日科夫氏族",
     "influence": 23,
     "color": "#b29357"
    },
    {
     "name": "切尔诺梅尔氏族",
     "influence": 24,
     "color": "#518c76"
    },
    {
     "name": "别列佐夫氏族",
     "influence": 27,
     "color": "#b36e67"
    },
    {
     "name": "维克托罗夫氏族",
     "influence": 26,
     "color": "#7b6899"
    }
   ],
   "onMap": true,
   "stateName": "普拉纳",
   "cells": 9,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "罗讷瓦尼亚",
   "slug": "罗讷瓦尼亚",
   "race": "人类",
   "faith": "水龙崇拜",
   "system": "神王统治",
   "capital": "罗讷瓦尼亚",
   "population": "326K",
   "region": "昉土",
   "regionTraits": [
    "商贸航线",
    "旧都残殿"
   ],
   "bio": "水之龙王的央土征程骤然终止，因某种原因，她携带着罗讷瓦尼亚加入这海上民族对于帝国岛的征服之中，罗讷瓦尼亚人的故乡已然在兵燹中破灭，而今，他们将希望寄托于梅露施坦因，希望这位伟大的神王能够带领他们在帝国岛建立第二故乡——只是，罗讷瓦尼亚的步伐似乎有点太过缓慢，等待他们登陆此地时，罗讷瓦尼亚的第二家园已然挤满了其他民族...",
   "leader": {
    "name": "梅露施坦因",
    "title": "水龙"
   },
   "factions": [
    {
     "name": "长老会议",
     "influence": 26,
     "color": "#5489a2"
    },
    {
     "name": "祭司团",
     "influence": 17,
     "color": "#b29357"
    },
    {
     "name": "战团",
     "influence": 24,
     "color": "#518c76"
    },
    {
     "name": "萨鲁登人",
     "influence": 16,
     "color": "#b36e67"
    },
    {
     "name": "卢卡维人",
     "influence": 17,
     "color": "#7b6899"
    }
   ],
   "onMap": true,
   "stateName": "罗讷瓦尼亚",
   "cells": 14,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "尼斯特",
   "slug": "尼斯特",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "贵族共和制",
   "capital": "尼斯特",
   "population": "249K",
   "region": "央土",
   "regionTraits": [
    "商贸航线",
    "旧都残殿"
   ],
   "bio": "作为天生的商人，尼斯特人曾建立起遍布央海的贸易站，可惜的是——随着维瑞亚帝国累年的内战，以及海上民族的冲击，尼斯特对于海上的统治权已然不复存在，阿刻洛伊家族的忒勒马科斯·阿刻洛伊啊，不忍心他的共和国就此倾覆，只是当他加冕为终身的执政官后，共和国的政敌们已然团结起来反对他的统治...这位曾抱有理想的执政官，是否能够带领迷思的尼斯特人走出黑暗的时代？",
   "leader": {
    "name": "忒勒马科斯·阿刻洛伊",
    "title": "终身执政官"
   },
   "factions": [
    {
     "name": "阿刻洛伊家族",
     "influence": 28,
     "color": "#5489a2"
    },
    {
     "name": "达伊达洛斯家族（不忠！）",
     "influence": 15,
     "color": "#b29357"
    },
    {
     "name": "福波斯忒斯家族（不忠！）",
     "influence": 17,
     "color": "#518c76"
    },
    {
     "name": "阿瑞忒斯家族（不忠！）",
     "influence": 23,
     "color": "#b36e67"
    },
    {
     "name": "波塞多尼亚家族（不忠！）",
     "influence": 17,
     "color": "#7b6899"
    }
   ],
   "onMap": true,
   "stateName": "尼斯特",
   "cells": 14,
   "neighbors": [],
   "mentions": [
    "维瑞亚帝国"
   ]
  },
  {
   "name": "白昀",
   "slug": "白昀",
   "race": "人类",
   "faith": "图腾崇拜",
   "system": "氏族联盟",
   "capital": "白昀",
   "population": "201K",
   "region": "亥土",
   "regionTraits": [],
   "bio": "尽管冰原的寒风依旧刺骨，但在这片无神怜爱的雪国，白昀人却用自己的“爱”包容那所有遭受兽怪蹂躏的民族——从人类到雪精，虽然他们的生活依旧要同这皑皑白雪斗争......只是，来自北方的不安消息，新的可汗试图将所有兽怪统合于其的帐下掀起对于这片冰原的征服，白昀人担忧战争再度降临于其的头上，急切地想要白昀之主给出解决的方案——迁徙，抑或是战斗？",
   "leader": {
    "name": "？",
    "title": "韵律之主"
   },
   "factions": [
    {
     "name": "卜捷里宁氏族",
     "influence": 36,
     "color": "#5489a2"
    },
    {
     "name": "拉齐萨尔氏族",
     "influence": 31,
     "color": "#b29357"
    },
    {
     "name": "阿尔维斯氏族",
     "influence": 25,
     "color": "#518c76"
    },
    {
     "name": "赫斯珀利德斯的代表",
     "influence": 8,
     "color": "#b36e67"
    }
   ],
   "onMap": true,
   "stateName": "白韵",
   "cells": 9,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "脱欢兀鲁斯",
   "slug": "脱欢兀鲁斯",
   "race": "兽怪",
   "faith": "先祖崇拜",
   "system": "氏族联盟",
   "capital": "脱欢兀鲁斯",
   "population": "25.8K",
   "region": "亥土",
   "regionTraits": [],
   "bio": "自地脉诞生的大妖，应允兽怪统治的愿望，自合昔普儿迭思掠来一大批的雪精为其奴役，试图统合起冻原的诸部建立起以他为名的帝国，只是...或许我们应该想办法怎么应对，额...合昔普儿迭思雪精的报复？",
   "leader": {
    "name": "脱欢·乎鲁不花",
    "title": "可汗"
   },
   "factions": [
    {
     "name": "合昔普儿迭思氏族（雪精）",
     "influence": 31,
     "color": "#5489a2"
    },
    {
     "name": "摩罗思氏族（熊）",
     "influence": 17,
     "color": "#b29357"
    },
    {
     "name": "孛孛卜氏族（兔）",
     "influence": 17,
     "color": "#518c76"
    },
    {
     "name": "迭里牙惕氏族(树妖）",
     "influence": 3,
     "color": "#b36e67"
    },
    {
     "name": "唆阔罗氏族（猫）",
     "influence": 17,
     "color": "#7b6899"
    },
    {
     "name": "伯列辛（犬）",
     "influence": 15,
     "color": "#4c7387"
    }
   ],
   "onMap": true,
   "stateName": "脱欢兀鲁斯",
   "cells": 11,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "雅典",
   "slug": "雅典",
   "race": "人类",
   "faith": "图腾崇拜",
   "system": "寡头共和制",
   "capital": "雅典",
   "population": "117K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "智者聚集于教令院，试图在这里求索智慧的真谛，苏格拉底的根须是那支撑起教令院的基地，可神明的化身并不理解“智慧”的含义，只是懵懂地回应学者们的请求，将其落地实施。而今，派别与派别之间的矛盾日益尖锐，可这位“智者”对此却不以为然，让他们继续吵吧，又与我何关！",
   "leader": {
    "name": "苏格拉底",
    "title": "智者"
   },
   "factions": [
    {
     "name": "生论派",
     "influence": 13,
     "color": "#5489a2"
    },
    {
     "name": "知论派",
     "influence": 19,
     "color": "#b29357"
    },
    {
     "name": "明论派",
     "influence": 18,
     "color": "#518c76"
    },
    {
     "name": "素论派",
     "influence": 22,
     "color": "#b36e67"
    },
    {
     "name": "因论派",
     "influence": 17,
     "color": "#7b6899"
    },
    {
     "name": "妙论派",
     "influence": 11,
     "color": "#4c7387"
    }
   ],
   "onMap": true,
   "stateName": "雅典",
   "cells": 7,
   "neighbors": [],
   "mentions": []
  },
  {
   "name": "鸾尾花帝国",
   "slug": "鸾尾花帝国",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "封建君主制",
   "capital": "鸾城",
   "population": "663K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "黄金时代已然过去，辽阔的国土已然大半沦陷于敌人之手，不幸的王啊，被他的宫相所架空，不知能否创造新的奇迹，还是说成为最后一任鸾尾王朝的统治者？",
   "leader": {
    "name": "受诅咒的洛泰尔·德·鸾尾",
    "title": "失地王"
   },
   "factions": [
    {
     "name": "鸾尾家族",
     "influence": 18,
     "color": "#5489a2"
    },
    {
     "name": "凡多姆海恩家族",
     "influence": 82,
     "color": "#b29357"
    }
   ],
   "onMap": true,
   "stateName": "鸾尾花",
   "cells": 11,
   "neighbors": [
    "安茹"
   ],
   "mentions": [
    "安茹"
   ]
  },
  {
   "name": "学城",
   "slug": "学城",
   "race": "人类",
   "faith": "无",
   "system": "魔权共和制",
   "capital": "学城",
   "population": "18.5K",
   "region": "央土",
   "regionTraits": [
    "商贸航线",
    "旧都残殿"
   ],
   "bio": "百年前的纯水精灵化作人的模样，纠集人手，筑起了那高耸入云的自体自身之塔，如今，夹在大国之间的学城，其的独立地位岌岌可危，两方的王都希望大巫妖能为其卖命，而在塔内，杰出的学者们正在串联，试图提出挑战格兰的课题...",
   "leader": {
    "name": "格兰",
    "title": "巫妖"
   },
   "factions": [
    {
     "name": "青蛙社",
     "influence": 62,
     "color": "#5489a2"
    },
    {
     "name": "朝露社",
     "influence": 8,
     "color": "#b29357"
    },
    {
     "name": "科学社",
     "influence": 11,
     "color": "#518c76"
    },
    {
     "name": "超越社",
     "influence": 19,
     "color": "#b36e67"
    }
   ],
   "onMap": true,
   "stateName": "学城",
   "cells": 5,
   "neighbors": [
    "阿里斯特",
    "佩克利菲亚"
   ],
   "mentions": []
  },
  {
   "name": "维瑞亚帝国",
   "slug": "维瑞亚帝国",
   "race": "人类",
   "faith": "原始崇拜",
   "system": "封建君主制",
   "capital": "基尼格",
   "population": "228K",
   "region": "央土",
   "regionTraits": [
    "商贸航线",
    "旧都残殿"
   ],
   "bio": "尽管过去帝国的武德曾照耀四海，但绵延的内战已然深深打击了她的国力——四个家族为了皇位的争夺而大打出手，昔日因理想而团结起来的诸民族之乐园，如今已成为了各自的绞肉机。脆弱的统一曾由哈巴哲家族用武力再度建立，可随着其的神秘死亡，纷争再度撕碎了帝国，戴伦元首是否能拼起帝国的碎片，还是任由帝国就此分崩离析？",
   "leader": {
    "name": "受诅咒的戴伦·基尼格",
    "title": "元首"
   },
   "factions": [
    {
     "name": "基尼格家族",
     "influence": 30,
     "color": "#5489a2"
    },
    {
     "name": "蒙格家族",
     "influence": 17,
     "color": "#b29357"
    },
    {
     "name": "哈巴哲家族",
     "influence": 30,
     "color": "#518c76"
    },
    {
     "name": "斯皮格家族",
     "influence": 23,
     "color": "#b36e67"
    }
   ],
   "onMap": false,
   "stateName": "",
   "cells": 0,
   "neighbors": [],
   "mentions": [
    "基尼格",
    "哈巴哲"
   ]
  },
  {
   "name": "伊瑟兰议邦",
   "slug": "伊瑟兰议邦",
   "race": "精灵",
   "faith": "自然崇拜",
   "system": "寡头共和制",
   "capital": "伊瑟兰",
   "population": "14.8K",
   "region": "昉土",
   "regionTraits": [
    "商贸航线",
    "旧都残殿"
   ],
   "bio": "昔日的先祖们曾在这湖滨立下盟约，名作“伊瑟兰”的城邦就此屹立，而精灵们的势力也逐渐扩张至整个大湖——或许，盟约将团结所有的伊瑟兰精灵，并建立起一个不分你我的合众邦。但在眼下，日益壮大的诸邦正在为了自己的私欲撕裂盟约的精神，菲尔汀与缇洛伦因土地继承的纠纷而大打出手，孤立的希洛亚亦不再参与在伊瑟兰举办的丰收庆...而伊瑟兰本身，塞维里安议长也在疲于应对国内的游行",
   "leader": {
    "name": "塞维里安",
    "title": "白枝议长"
   },
   "factions": [
    {
     "name": "德墨特里奥斯家族",
     "influence": 37,
     "color": "#5489a2"
    },
    {
     "name": "克里索斯家族",
     "influence": 29,
     "color": "#b29357"
    },
    {
     "name": "塔拉西奥斯家族",
     "influence": 34,
     "color": "#518c76"
    }
   ],
   "onMap": true,
   "stateName": "伊瑟兰",
   "cells": 6,
   "neighbors": [
    "尤维尔"
   ],
   "mentions": [
    "伊瑟兰",
    "缇洛伦",
    "菲尔汀",
    "希洛亚",
    "伊瑟兰世界"
   ]
  },
  {
   "name": "克洛斯",
   "slug": "克洛斯",
   "race": "亚基",
   "faith": "原始崇拜",
   "system": "神王统治",
   "capital": "克洛斯",
   "population": "22K",
   "region": "垠土",
   "regionTraits": [
    "熔铁红铜",
    "镀金沙海"
   ],
   "bio": "于火中诞生的元素精灵，试图带领亚基人征服赫奇顿的四翼大王，却被那喷薄的火山所吞没军势，如今被激怒的火龙大王正试图将克洛斯驱逐至更远的地方...或者，将其众群赶尽杀绝",
   "leader": {
    "name": "克洛斯",
    "title": "王"
   },
   "factions": [
    {
     "name": "达克伦氏族",
     "influence": 76,
     "color": "#5489a2"
    },
    {
     "name": "穆尔瓦氏族",
     "influence": 24,
     "color": "#b29357"
    }
   ],
   "onMap": true,
   "stateName": "克洛斯",
   "cells": 1,
   "neighbors": [],
   "mentions": [
    "赫奇顿"
   ]
  },
  {
   "name": "薪炎龙庭",
   "slug": "薪炎龙庭",
   "race": "利扎",
   "faith": "先祖崇拜",
   "system": "氏族联盟",
   "capital": "奈龙城",
   "population": "15.4K",
   "region": "垠土",
   "regionTraits": [
    "熔铁红铜",
    "镀金沙海"
   ],
   "bio": "昔日的龙众不堪亚基的骚扰，率众向西南迁徙，高大威猛的双足飞龙掠过亲王的宫殿，意外扰动了那耽溺于幻梦的龙之王的血嗣，它的怒吼将随着火雨撒满大地，龙庭的勇士啊，是否能驱逐那有翼的大王？还是再度沦丧...",
   "leader": {
    "name": "昊阳",
    "title": "大王"
   },
   "factions": [
    {
     "name": "昊阳与他的小子们",
     "influence": 67,
     "color": "#5489a2"
    },
    {
     "name": "长老团",
     "influence": 33,
     "color": "#b29357"
    }
   ],
   "onMap": true,
   "stateName": "薪炎龙庭",
   "cells": 6,
   "neighbors": [
    "奥奇坎纳塔"
   ],
   "mentions": []
  },
  {
   "name": "帕拉夏教团",
   "slug": "帕拉夏教团",
   "race": "精灵",
   "faith": "阿纳亚图拉信仰",
   "system": "政教合一制",
   "capital": "伊苏特",
   "population": "6.3K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "图兰精灵曾是伊瑟兰世界的一份子，因阿纳亚图拉的显圣曾引发伊瑟兰世界的第一次分裂，但当时的白枝议长长袖善舞，团结了几乎所有的伊瑟兰精灵将阿纳亚图拉放逐出了伊瑟兰，尽管如此，仍有精灵追随阿纳亚图拉的步伐消失于草原之中——从此，他们自称“图兰精灵”。北方的人类帝国成为了他们第二家园，基于精灵认同与对先知的个人崇拜，图兰精灵成功在这片土地扎根，随着人类帝国的分裂，教团也不再遮掩其的存在，处于继业者之间的阿纳亚图拉是否能将其的信仰散播于世界？并建立起属于图兰精灵的家园，还是说埋没于历史的洪流中...不再问津...",
   "leader": {
    "name": "阿纳亚图拉",
    "title": "先知，“贯穿天地之光”"
   },
   "factions": [
    {
     "name": "萨法尔祭司",
     "influence": 63,
     "color": "#5489a2"
    },
    {
     "name": "塞帕赫卫队",
     "influence": 37,
     "color": "#b29357"
    }
   ],
   "onMap": true,
   "stateName": "帕拉夏教团",
   "cells": 3,
   "neighbors": [
    "罗金吉亚",
    "林普斯"
   ],
   "mentions": [
    "伊瑟兰",
    "伊瑟兰世界"
   ]
  },
  {
   "name": "天朝",
   "slug": "天朝",
   "race": "人类",
   "faith": "先祖崇拜",
   "system": "封建君主制",
   "capital": "洛阳",
   "population": "1011K",
   "region": "昉土",
   "regionTraits": [
    "纵横水网",
    "古代遗迹"
   ],
   "bio": "昔日强盛的天朝，如今却日渐走入衰朽之治中，刘据试图夺回神师长期把持的政治大权，各地的侯爵趁机扩张权势，而再向外看，自海上而来的民族顺河而上，延伸其的定居点；而山内的蛮夷也在向天朝的内地迁入...神师是否能够恰当应对刘据对其的挑战，让天朝的国祚再延百年？",
   "leader": {
    "name": "神师",
    "title": "监国"
   },
   "factions": [
    {
     "name": "内庭",
     "influence": 37,
     "color": "#5489a2"
    },
    {
     "name": "监国府",
     "influence": 63,
     "color": "#b29357"
    }
   ],
   "onMap": true,
   "stateName": "天朝",
   "cells": 16,
   "neighbors": [],
   "mentions": []
  }
 ],
 "regions": [
  {
   "name": "昉土",
   "members": [
    "玉海国",
    "八菽之囿",
    "苇原中国",
    "昆云",
    "遴选",
    "华国",
    "德拉米共和国",
    "莱塔尼亚",
    "安格烈",
    "吉利卡斯至高国",
    "普拉纳",
    "罗讷瓦尼亚",
    "雅典",
    "鸾尾花帝国",
    "伊瑟兰议邦",
    "帕拉夏教团",
    "天朝"
   ]
  },
  {
   "name": "央土",
   "members": [
    "尼斯特",
    "学城",
    "维瑞亚帝国"
   ]
  },
  {
   "name": "亥土",
   "members": [
    "白昀",
    "脱欢兀鲁斯"
   ]
  },
  {
   "name": "垠土",
   "members": [
    "克洛斯",
    "薪炎龙庭"
   ]
  }
 ],
 "faiths": [
  {
   "name": "先祖崇拜",
   "members": [
    "玉海国",
    "八菽之囿",
    "华国",
    "吉利卡斯至高国",
    "普拉纳",
    "尼斯特",
    "脱欢兀鲁斯",
    "鸾尾花帝国",
    "薪炎龙庭",
    "天朝"
   ]
  },
  {
   "name": "高天原崇拜",
   "members": [
    "苇原中国"
   ]
  },
  {
   "name": "雷龙崇拜",
   "members": [
    "昆云"
   ]
  },
  {
   "name": "白虎崇拜",
   "members": [
    "遴选"
   ]
  },
  {
   "name": "原始崇拜",
   "members": [
    "德拉米共和国",
    "莱塔尼亚",
    "维瑞亚帝国",
    "克洛斯"
   ]
  },
  {
   "name": "原始一神论",
   "members": [
    "安格烈"
   ]
  },
  {
   "name": "水龙崇拜",
   "members": [
    "罗讷瓦尼亚"
   ]
  },
  {
   "name": "图腾崇拜",
   "members": [
    "白昀",
    "雅典"
   ]
  },
  {
   "name": "无",
   "members": [
    "学城"
   ]
  },
  {
   "name": "自然崇拜",
   "members": [
    "伊瑟兰议邦"
   ]
  },
  {
   "name": "阿纳亚图拉信仰",
   "members": [
    "帕拉夏教团"
   ]
  }
 ],
 "adjacency": {
  "佩克利菲亚": [
   "阿里斯特",
   "学城"
  ],
  "阿里斯特": [
   "佩克利菲亚",
   "学城"
  ],
  "蒙格王朝": [
   "哈巴哲",
   "基尼格"
  ],
  "哈巴哲": [
   "蒙格王朝"
  ],
  "学城": [
   "阿里斯特",
   "佩克利菲亚"
  ],
  "基尼格": [
   "斯皮格",
   "蒙格王朝"
  ],
  "斯皮格": [
   "基尼格"
  ],
  "泷": [
   "华国"
  ],
  "华国": [
   "泷"
  ],
  "奥奇坎纳塔": [
   "薪炎龙庭"
  ],
  "薪炎龙庭": [
   "奥奇坎纳塔"
  ],
  "鸾尾花": [
   "安茹"
  ],
  "安茹": [
   "鸾尾花"
  ],
  "罗金吉亚": [
   "帕拉夏教团"
  ],
  "帕拉夏教团": [
   "罗金吉亚",
   "林普斯"
  ],
  "林普斯": [
   "帕拉夏教团"
  ],
  "伊瑟兰": [
   "尤维尔"
  ],
  "尤维尔": [
   "伊瑟兰"
  ],
  "菲尔汀": [
   "缇洛伦"
  ],
  "缇洛伦": [
   "菲尔汀"
  ]
 }
}

export default DIPLOMACY
export const { entities, blocs, countries: DIPLO_COUNTRIES, regions, faiths, adjacency } = DIPLOMACY
