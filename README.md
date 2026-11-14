# 葬火之后

一个关于「葬火之后」世界设定的站点：二十国志与世界地图。

线上地址：https://oycy5656-hue.github.io/after-the-pyre/
仓库：https://github.com/oycy5656-hue/after-the-pyre

## 内容

- `/countries/` 国家档案：卡片墙、搜索、种族筛选、统治者六维对比
- `/countries/<国名>` 单国页：统治者、势力格局、奇观、国策、军团
- `/map/` 世界地图：可缩放拖动，点国名进档案，附 `.map` 工程文件下载

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5199/after-the-pyre/
npm run build    # 产物在 docs/.vitepress/dist
```

推送到 `main` 后由 GitHub Actions 自动构建发布。

## 数据更新

```bash
# 国家资料
node scripts/import-countries.mjs "国家资料集.json"

# 地图（.map 工程文件）
node scripts/import-map.mjs "地图.map"
```

两个脚本会重新生成 `docs/countries/`、`docs/public/map/world.svg` 以及 `docs/.vitepress/data/` 下的数据模块。

## 结构

```
docs/
├─ index.md              首页
├─ countries/            国家档案（脚本生成，index.md 除外）
├─ map/                  世界地图
├─ public/map/           world.svg + .map 工程文件
└─ .vitepress/
   ├─ config.mts         站点配置
   ├─ data/              国家、地图、侧边栏数据
   └─ theme/components/  CountryExplorer / CountryPage / MapViewer
```
