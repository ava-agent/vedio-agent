import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 多媒体工具百科',
  description: 'AI 视频、图片、配音、虚拟人工具全面调研资料站',
  lang: 'zh-CN',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'AI 多媒体工具百科',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '工具调研',
        items: [
          { text: 'AI 视频生成', link: '/tools/video' },
          { text: 'AI 图片生成', link: '/tools/image' },
          { text: 'AI 语音合成', link: '/tools/tts' },
          { text: 'AI 虚拟人', link: '/tools/virtual-human' },
        ]
      },
      { text: '对比总览', link: '/guide/comparison' },
      { text: 'MCP 集成', link: '/guide/mcp-integration' },
    ],

    sidebar: {
      '/tools/': [
        {
          text: '工具调研',
          items: [
            { text: 'AI 视频生成工具', link: '/tools/video' },
            { text: 'AI 图片生成工具', link: '/tools/image' },
            { text: 'AI 语音合成工具', link: '/tools/tts' },
            { text: 'AI 虚拟人工具', link: '/tools/virtual-human' },
          ]
        },
        {
          text: '指南',
          items: [
            { text: '工具对比总览', link: '/guide/comparison' },
            { text: 'MCP 集成指南', link: '/guide/mcp-integration' },
          ]
        }
      ],
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '工具对比总览', link: '/guide/comparison' },
            { text: 'MCP 集成指南', link: '/guide/mcp-integration' },
          ]
        },
        {
          text: '工具调研',
          items: [
            { text: 'AI 视频生成工具', link: '/tools/video' },
            { text: 'AI 图片生成工具', link: '/tools/image' },
            { text: 'AI 语音合成工具', link: '/tools/tts' },
            { text: 'AI 虚拟人工具', link: '/tools/virtual-human' },
          ]
        }
      ],
    },

    footer: {
      message: 'AI 多媒体工具调研资料',
      copyright: 'Copyright © 2025-2026'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '页面目录'
    },

    lastUpdated: {
      text: '最后更新',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  }
})
