---
layout: page
title: 世界地图
description: 葬火之后的世界地图，可缩放、可点击查看各国档案
outline: false
---

<div class="map-page">

# 世界地图

滚轮缩放、拖动平移。点击地图上的国名，或右下角的政权列表，可直接进入该国的档案页。

<MapViewer />

<p class="map-source">
地图工程文件：<a href="/after-the-pyre/map/after-the-pyre.map" download>下载 .map</a>（9 MB，可用 <a href="https://www.8desk.top/" target="_blank" rel="noreferrer">8desk.top</a> 继续编辑）
</p>

</div>

<style>
.map-page {
  max-width: 1480px;
  margin: 0 auto;
  padding: 32px 40px 80px;
}

.map-page h1 {
  margin-top: 0;
  font-size: 30px;
}

.map-source {
  margin-top: 18px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

@media (max-width: 767px) {
  .map-page {
    padding: 20px 16px 60px;
  }
}
</style>
