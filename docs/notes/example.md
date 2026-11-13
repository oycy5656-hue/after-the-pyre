---
title: 示例笔记
description: 一篇把常用 Markdown 元素都用上的模板页
---

# 示例笔记

> 记录于 2026-11-13 · 标签：#模板 #示例

这一页把所有常用排版元素集中放一遍，写新笔记时直接复制它改内容就行。

## 一句话结论

把最重要的结论放在最前面：**VitePress 把 Markdown 变成站点，你只需要关心内容。**

## 背景

假设这里是一段较长的说明文字，用来交代为什么会有这篇笔记、涉及什么上下文、当时遇到了什么问题。中文长文本的行高已经在 `style.css` 里调到 1.8，读起来不会太挤。

顺带演示行内元素：`行内代码`、**加粗**、*斜体*、~~删除线~~、[站内链接](/guide/writing)、[外链](https://vitepress.dev/zh/)。

## 步骤

1. 新建 Markdown 文件
2. 写正文和标题层级
3. 加进侧边栏
4. 提交到 git

## 对比表

| 方案 | 上手成本 | 适合场景 |
| --- | --- | --- |
| VitePress | 低 | 个人/团队文档站 |
| Docusaurus | 中 | 需要版本化的大文档 |
| Obsidian | 低 | 纯本地、不发布 |

## 代码

```ts
// 行号已开启，第 3 行会被高亮
interface Note {
  title: string
  tags: string[]
}

export function tagOf(note: Note, tag: string): boolean {
  return note.tags.includes(tag)
}
```

## 待办

- [x] 搭好站点框架
- [x] 写好示例页
- [ ] 把旧笔记迁移进来
- [ ] 发布到线上

## 备注框

::: tip 小技巧
按住 `Ctrl`（macOS 是 `Cmd`）再按 `K`，可以随时打开搜索框。
:::

::: warning 留意
这里的每条链接都会在构建时检查，写错路径会直接报错——这是好事，能提前发现死链。
:::

::: details 展开看一条补充说明
折叠块适合放细节、源数据、或者不那么重要的旁枝内容，避免打断主线的阅读节奏。
:::

## 相关

- [如何写一篇页面](/guide/writing)
- [Markdown 速查](/reference/markdown)
