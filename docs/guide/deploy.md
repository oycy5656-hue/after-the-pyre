# 构建与发布

## 本地构建

```bash
npm run build      # 产物在 docs/.vitepress/dist
npm run preview    # 本地起一个服务预览构建结果
```

`dist/` 是一堆纯静态文件，任何静态托管都能用。

## 发布到 GitHub Pages

如果仓库叫 `my-wiki`，站点地址会是 `https://<用户名>.github.io/my-wiki/`，需要先告诉 VitePress 它挂在子路径下：

```ts
// docs/.vitepress/config.mts
export default defineConfig({
  base: '/my-wiki/',
  // ...
})
```

然后在仓库里加 `.github/workflows/deploy.yml`：

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

最后在仓库的 **Settings → Pages → Build and deployment** 里把 Source 选成 **GitHub Actions**。

::: tip 自定义域名
用自定义域名（比如 `wiki.example.com`）时，`base` 保持默认的 `/`，同时在 `docs/public/` 放一个名为 `CNAME` 的文件，内容写你的域名。
:::

## 发布到 Cloudflare Pages / Vercel / Netlify

三者流程一样，直接在面板里连仓库：

| 配置项 | 值 |
| --- | --- |
| 构建命令 | `npm run build` |
| 输出目录 | `docs/.vitepress/dist` |
| Node 版本 | 20 或以上 |

根路径部署时不需要设置 `base`。

## 其他去处

`dist/` 也能直接丢到对象存储（OSS / COS / R2）、内网 Nginx、或本地直接双击 `index.html`（需用 `npm run preview` 或任意静态服务器，因为路由依赖服务端回退到 `index.html`）。

::: warning 直接双击打开会有问题
`file://` 协议下 VitePress 的客户端路由和资源路径会失效。务必通过 HTTP 访问。
:::
