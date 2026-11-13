# 如何写一篇页面

## 最短路径

1. 在合适的目录新建文件，比如 `docs/notes/我的第一篇.md`；
2. 写内容（Markdown，和写普通文档一样）；
3. 打开 `docs/.vitepress/config.mts`，把新页面加进 `sidebar`；
4. 保存，浏览器里刷新即可。

## 页面头信息（frontmatter）

文件开头两行 `---` 之间可以写 YAML，常用的几个：

```yaml
---
title: 自定义标题        # 不写就取正文第一个一级标题
description: 页面摘要     # 用于 SEO 和搜索预览
outline: [2, 4]         # 右侧目录显示 2~4 级标题
lastUpdated: false      # 单独关闭某页的更新时间
---
```

需要首页那种大标题卡片，就用 `layout: home`；需要独立排版（比如整页都是自定义 HTML），用 `layout: page`。

## 插入到侧边栏

在 `config.mts` 的 `sidebar` 数组里找到对应分组，追加一行：

```ts
{ text: '我的第一篇', link: '/notes/我的第一篇' }
```

分组也可以用 `collapsed: false` / `collapsed: true` 控制是否默认展开；条目多了可以嵌套：

```ts
{
  text: '项目',
  collapsed: false,
  items: [
    { text: '总览', link: '/projects/' },
    { text: '排期', link: '/projects/roadmap' }
  ]
}
```

::: warning 别忘了
只新建文件、不加进 `sidebar`，页面依然可以通过直链访问，也能被搜索到，但导航里看不到它。
:::

## 常用写法

### 提示框

```md
::: tip 提示
正文
:::

::: warning 注意
正文
:::

::: danger 危险
正文
:::

::: details 点击展开
折叠内容
:::
```

`tip`、`warning`、`danger` 还支持自定义标题，写 `::: tip 我的标题` 即可。

### 代码块

带高亮、行号（已在配置里开启）和行高亮：

````md
```ts{2,4}
const a = 1
const highlighted = 2
const c = 3
const alsoHighlighted = 4
```
````

### 表格与任务列表

```md
| 列一 | 列二 |
| --- | --- |
| 内容 | 内容 |

- [x] 已完成
- [ ] 待办
```

### 图片

放在 `docs/public/` 下，用绝对路径引用：

```md
![示意图](/images/diagram.png)
```

想放到和 Markdown 同目录也可以，用相对路径 `./diagram.png`，两种都行。

## 顺手的好习惯

- **一页一个主题**：标题先写清楚"这页解决什么问题"。
- **多用链接**：相关页面互相引用，知识才连成网，而不是一堆孤岛。
- **留个日期**：笔记类页面在正文开头写一句"记录于 2026-11-13"，几个月后回看会感谢自己。
- **提交到 git**：`git commit` 之后，页面底部的"最后更新"时间会自动变成提交时间。
