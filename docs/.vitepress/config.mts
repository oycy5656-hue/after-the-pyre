import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '我的 Wiki',
  description: '一个用 Markdown 写成的知识库',

  // 生成 /guide/writing 这样的干净链接
  cleanUrls: true,
  // 在每页底部显示最后更新时间（取 git 提交时间，未提交时取文件修改时间）
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
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
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '笔记', link: '/notes/', activeMatch: '/notes/' },
      { text: '参考', link: '/reference/' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '首页', link: '/' },
          { text: '关于这个 Wiki', link: '/guide/' }
        ]
      },
      {
        text: '使用指南',
        items: [
          { text: '目录结构', link: '/guide/structure' },
          { text: '如何写一篇页面', link: '/guide/writing' },
          { text: '构建与发布', link: '/guide/deploy' }
        ]
      },
      {
        text: '笔记',
        items: [
          { text: '全部笔记', link: '/notes/' },
          { text: '示例笔记', link: '/notes/example' }
        ]
      },
      {
        text: '参考',
        items: [
          { text: 'Markdown 速查', link: '/reference/markdown' },
          { text: '常见问题', link: '/reference/faq' }
        ]
      }
    ],

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
      message: '本地搭建 · Markdown 驱动 · 由 VitePress 生成',
      copyright: '© 2026 我的 Wiki'
    }
  }
})
