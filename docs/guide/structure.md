# 目录结构

```
wiki/
├─ package.json              # 命令与依赖
├─ scripts/
│  └─ import-countries.mjs   # 把国家资料集 JSON 生成为页面
├─ README.md                 # 项目说明（给你自己看的）
└─ docs/                     # ← 网站根目录，只有这里的内容会被发布
   ├─ index.md               # 首页
   ├─ countries/             # 国家档案（由脚本生成，index.md 除外）
   ├─ guide/                 # 使用指南
   ├─ notes/                 # 你的笔记
   ├─ reference/             # 速查表、FAQ
   ├─ public/                # 静态资源：图片、logo、favicon，原样复制
   └─ .vitepress/
      ├─ config.mts          # 站点配置：标题、导航、侧边栏、搜索
      ├─ data/               # 由脚本生成的数据模块（国家、侧边栏）
      └─ theme/
         ├─ index.ts         # 主题入口（注册组件）
         ├─ components/      # CountryExplorer / CountryPage 等 Vue 组件
         └─ style.css        # 颜色、字号等样式微调
```

## 几个约定

- **文件路径 = 网址路径**。`docs/notes/读书笔记.md` 对应 `/notes/读书笔记.html`；目录页 `/notes/` 会自动指向 `notes/index.html`。
- **`index.md` 是目录页**。`docs/notes/index.md` 就是 `/notes/`。
- **`public/` 里的文件不做处理**。放 `docs/public/diagram.png`，正文用 `![图](/diagram.png)` 引用。
- **下划线开头的文件不会被当成页面**，适合放草稿或片段。

::: tip 建议
每篇文章尽量控制在一个主题内，长文拆成多篇，用链接互相引用。比一篇几千行的大文档好维护得多。
:::

## 新建分区

1. 在 `docs/` 下建目录，比如 `docs/projects/`；
2. 加一个 `docs/projects/index.md` 当分区首页；
3. 打开 `docs/.vitepress/config.mts`，在 `sidebar` 里加一组 `items`，`nav` 里加一项。

改完保存，侧边栏会立刻更新。
