---
layout: page
title: 世界地图
description: 葬火之后的世界地图，可缩放、可点击查看各国档案
outline: false
---

<div class="map-page">

# 世界地图

这张地图来自 Fantasy Map Generator（8desk.top 汉化版）导出的工程文件，包含海岸线、河流、山地阴影、城市与国界。
滚轮缩放、拖动平移；点击地图上的国名或右下角的政权列表，可以直接进入该国的档案页。

<MapViewer />

## 关于源文件

- 地图工程：20 个政权、278 座城市，尺寸 1912 × 956
- 想自己继续编辑这张图，可以下载工程文件后拖进 [8desk.top](https://www.8desk.top/)（该站点是 Fantasy Map Generator 的汉化版）
- <a href="/after-the-pyre/map/after-the-pyre.map" download>下载 .map 工程文件</a>（9 MB）

::: tip 名字对不上怎么办
地图里的国名和资料集里偶尔有异体字（比如「八薮之囿」与「八菽之囿」、「白韵」与「白昀」），导入脚本已经做了别名映射。如果以后新增了国家，记得在 `scripts/import-map.mjs` 的 `alias` 表里补一条。
:::

</div>

<style>
.map-page {
  max-width: 1480px;
  margin: 0 auto;
  padding: 32px 40px 90px;
}

.map-page h1 {
  margin-top: 0;
  font-size: 30px;
}

.map-page h2 {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 20px;
}

.map-page p,
.map-page li {
  line-height: 1.8;
}

@media (max-width: 767px) {
  .map-page {
    padding: 20px 16px 60px;
  }
}
</style>
