# 我的 Wiki

用 Markdown 写的本地 Wiki，基于 [VitePress](https://vitepress.dev/zh/)。
内容全在 `docs/` 目录，构建产物是纯静态文件。

## 快速开始

```bash
cd wiki
npm install      # 首次运行
npm run dev      # 打开 http://localhost:5199
```

## 命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 开发预览，改 Markdown 自动刷新 |
| `npm run build` | 构建到 `docs/.vitepress/dist` |
| `npm run preview` | 预览构建结果（http://localhost:5200） |

## 我要改什么

- **加内容** → 在 `docs/` 下新建 `.md`，再到 `docs/.vitepress/config.mts` 的 `sidebar` 里登记
- **改站名/导航** → `docs/.vitepress/config.mts` 顶部的 `title`、`nav`、`sidebar`
- **改配色** → `docs/.vitepress/theme/style.css` 里的 CSS 变量
- **换 logo** → 替换 `docs/public/logo.svg`

## 目录

```
wiki/
├─ package.json
└─ docs/
   ├─ index.md              首页
   ├─ guide/                使用指南
   ├─ notes/                笔记正文（示例在 notes/example.md）
   ├─ reference/            速查表与 FAQ
   ├─ public/               图片等静态资源
   └─ .vitepress/
      ├─ config.mts         站点配置
      └─ theme/             主题与样式
```
