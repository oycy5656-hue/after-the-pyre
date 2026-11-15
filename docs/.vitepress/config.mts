import { defineConfig } from 'vitepress'
import countrySidebar from './data/sidebar-countries.mjs'

// 仓库名决定线上路径；换成你的仓库名时只改这一行
const base = '/after-the-pyre/'

export default defineConfig({
  lang: 'zh-CN',
  title: '葬火之后',
  description: '葬火之后的公共 Wiki',

  // 部署在 https://<用户名>.github.io/after-the-pyre/ 这样的子路径下
  base,

  // GitHub Pages 不支持无扩展名 URL，所以保持 .html；目录仍是 /guide/ 形式
  cleanUrls: false,
  // 在每页底部显示最后更新时间（取 git 提交时间，未提交时取文件修改时间）
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#3c8772' }]
  ],

  markdown: {
    // 代码块显示行号
    lineNumbers: true,
    // 图片懒加载
    image: { lazyLoading: true }
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '国家', link: '/countries/', activeMatch: '/countries/' },
      { text: '地图', link: '/map/', activeMatch: '/map/' },
      { text: '经济', link: '/economy/', activeMatch: '/economy/' },
      { text: '账号', link: '/account/', activeMatch: '/account/' }
    ],

    sidebar: {
      // 国家页面显示完整的国家目录，其余页面用通用目录
      '/countries/': countrySidebar,
      '/': [
        {
          text: '葬火之后',
          items: [
            { text: '首页', link: '/' },
            { text: '国家档案', link: '/countries/' },
            { text: '世界地图', link: '/map/' }
          ]
        }
      ]
    },

    // 本地全文搜索（不需要联网、不需要 API Key）
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '返回',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        },
        // 让中文也能被逐字索引，搜索结果更准
        miniSearch: {
          options: {
            tokenize: (text: string) =>
              text.split(/[\s\-,./]+|(?<=[\u4e00-\u9fa5])|(?=[\u4e00-\u9fa5])/u)
          }
        }
      }
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    langMenuLabel: '语言',
    externalLinkIcon: true,

    notFound: {
      title: '页面走丢了',
      quote: '这个地址还没有内容——也许该由你来写第一篇。',
      linkLabel: '回到首页',
      linkText: '回首页'
    },

    footer: {
      message: '葬火之后 · 世界设定集',
      copyright: '© 2026 葬火之后'
    }
  }
})
