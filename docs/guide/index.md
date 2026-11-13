# 关于这个 Wiki

这是你的知识库起点。站点本身是空的，只有结构和示例——内容由你一篇篇填进来。

## 它是什么

一个纯静态的文档站：

- 内容是 `docs/` 目录里的 Markdown 文件；
- 用 [VitePress](https://vitepress.dev/zh/) 渲染，本地开着预览服务边写边看；
- 构建产物是纯 HTML/CSS/JS，不需要数据库、不需要后端。

## 三分钟上手

```bash
# 进入项目目录
cd wiki

# 启动本地预览（默认 http://localhost:5199）
npm run dev

# 改完想检查最终效果
npm run build
npm run preview
```

`npm run dev` 支持热更新：保存 Markdown 文件，浏览器里的页面立刻刷新。

## 接下来看哪里

| 你想做的事 | 去看 |
| --- | --- |
| 搞清目录怎么组织 | [目录结构](/guide/structure) |
| 新增一篇文章 | [如何写一篇页面](/guide/writing) |
| 把站点发到网上 | [构建与发布](/guide/deploy) |
| 忘了 Markdown 语法 | [Markdown 速查](/reference/markdown) |
