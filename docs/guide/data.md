# 导入国家资料

站点的「国家档案」不是手写的，而是从一份 JSON 资料集生成。改数据只需重新跑一次脚本。

## 一条命令

```bash
node scripts/import-countries.mjs "D:/Backup/Downloads/国家资料集_备份_2026-11-14.json"
```

脚本会做四件事：

| 产物 | 位置 |
| --- | --- |
| 每个国家一个页面 | `docs/countries/<国名>.md` |
| 页面用的结构化数据 | `docs/.vitepress/data/countries.mjs` |
| 侧边栏条目 | `docs/.vitepress/data/sidebar-countries.mjs` |
| 头像、奇观图 | `docs/public/countries/*.jpg` |

跑完 `npm run dev` 就能看到新内容；`docs/countries/index.md` 是手写的入口页，不会被覆盖。

## 资料集的字段

```jsonc
{
  "id": "c_...",
  "name": "玉海国",
  "race": "人类",
  "capital": "玉京",
  "faith": "先祖崇拜",
  "nation_bio": "国家简介",
  "region_name": "昉土",
  "region_traits": "纵横水网、古代遗迹",   // 顿号分隔
  "region_custom_tag": "",
  "region_desc": "区域描述",
  "politics": {
    "system": "封建君主制",
    "leader": {
      "name": "圆融",
      "title": "天皇",
      "avatar": "data:image/jpeg;base64,...", // 自动导出为图片
      "traits": ["急躁", "古怪", "固执"],
      "stats": { "diplomacy": 6, "stewardship": 10, "martial": 12,
                 "intrigue": 8, "learning": 2, "prowess": 5 },
      "bio": "统治者小传"
    },
    "factions": [{ "id": "f_...", "name": "宫家", "leader": "圆融天皇",
                   "influence": 35, "color": "#5489a2" }],
    "heroes": [],
    "wonders": [{ "name": "影向山", "desc": "…", "avatar": "data:image/jpeg;base64,…" }],
    "modifiers": [{ "name": "御稜威", "effect": "…" }]
  },
  "military": {
    "legions": [],
    "units": [{ "name": "华人水手", "role": "游击穿插", "race": "人类",
                "size": 500, "modifiers": "…", "desc": "…", "equipment": {} }]
  }
}
```

缺字段不会报错：没有头像就显示姓名首字，没有奇观或军团就整段隐藏。

## 页面长什么样

- `/countries/` 卡片墙：搜索、按种族筛选、派系席位色条、六维对比表
- `/countries/<国名>` 单国页：旗帜式页头 + 统治者六维条 + 派系席位 + 奇观 + 国策 + 军团

渲染由两个 Vue 组件负责：`CountryExplorer.vue`（列表）和 `CountryPage.vue`（详情），都在 `docs/.vitepress/theme/components/` 里，改样式直接改这两个文件的 `<style scoped>`。

## 想改配色

每个国家的主题色取「第一个派系的颜色」（`accent`），所以一个国家卡片和详情页的强调色是自动跟着派系走的。想统一换色，在 `CountryPage.vue` / `CountryExplorer.vue` 里把 `--accent` 换掉即可。

## 关于搜索（重要）

VitePress 的本地搜索**只索引 Markdown 正文**，有两件事必须注意：

1. 组件渲染出来的文字**不会**进搜索索引（因为索引在构建时只读 Markdown 渲染结果）。
2. 一页里没有任何 Markdown 标题时，**整页会被排除**在索引之外。

所以脚本生成页面时做了两件事来补：

- 每页开头有一行 `# 国名`，保证页面被收录、且搜索结果标题正确；
- 正文里加了一段 `<div class="search-only">` 隐藏文本，把国名、首都、信仰、统治者、派系、军团、简介都塞进去，供索引器读取（CSS 里 `display:none`，页面上看不到）。

自己写新页面时如果正文主要靠组件渲染，记得同样留一个标题和一段隐藏索引文本，否则搜索里搜不到。
