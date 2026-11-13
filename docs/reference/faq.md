# 常见问题

## 端口被占用怎么办

`npm run dev` 默认用 5199 端口，被占用时命令行会提示。两种办法：

```bash
# 换一个端口
npx vitepress dev docs --port 5201
```

或者改 `package.json` 里 `dev` 脚本的 `--port`。

## 中文搜索搜不到

配置里已经给 search 加了中文分词（按字切分），一般能命中。如果某个词仍然搜不到：

- 确认页面已经构建过（`npm run build`），搜索索引是在构建时生成的；
- 确认关键词确实出现在正文里，而不只是在标题的链接文字中；
- 页面被 `docs/.vitepress/config.mts` 里的 `srcExclude` 排除了的话，不会进索引。

## 改了配置没生效

`.vitepress/config.mts` 的修改通常会自动重启；如果没有，`Ctrl + C` 后重新 `npm run dev`。浏览器端还要强制刷新一次（`Ctrl + F5`）。

## 页面 404

- 检查文件路径和链接是否一致（`cleanUrls: true` 时不带 `.html`）；
- 中文文件名建议别带空格和 `#`、`?` 这类字符；
- 部署到子路径时忘了设 `base`，会导致所有资源 404。

## "最后更新"不显示

`lastUpdated: true` 取的是 git 提交时间。文件还没提交、或者目录不是 git 仓库时可能不显示——`git init` 并提交一次即可。

## 怎么换成英文界面

`config.mts` 里 `lang` 改成 `'en-US'`，再把 `nav`、`sidebar`、`outline.label`、`docFooter` 这些文字换成英文。VitePress 自带的按钮文案会跟着 `lang` 自动切换。

## 数据备份

内容就是 `docs/` 目录下的文件，加一个 git 仓库就够了：

```bash
cd wiki
git init
git add .
git commit -m "初始化 wiki"
```

之后接一个私有远程仓库，换机器 clone 下来 `npm install` 就能继续写。

## 能加评论、统计吗

能，但需要第三方服务（如 Giscus、Umami）。这类功能要往主题里加组件，等你需要时再说——现在保持简单。
