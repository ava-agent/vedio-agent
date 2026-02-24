# AI 多媒体工具百科

> 全面覆盖 60+ 款 AI 多媒体工具的调研、对比与 MCP 集成指南

## 在线访问

**https://ava-agent.github.io/vedio-agent/**

## 内容覆盖

| 类别 | 工具数量 | 包含内容 |
|------|---------|---------|
| AI 视频生成 | 14 款 | Seedance、Veo 3、Runway Gen-4、Sora、Kling、Pika 等 |
| AI 图片生成 | 15 款 | Imagen 4、GPT-Image-1、Midjourney、FLUX.2、SD 3.5 等 |
| AI 语音合成 | 15 款 | ElevenLabs、OpenAI TTS、Fish Audio、CosyVoice 等 |
| AI 虚拟人 | 17 款 | HeyGen、D-ID、Synthesia、LivePortrait、Hallo 等 |
| **合计** | **61 款** | 覆盖 API / SDK / MCP / 定价 / 开源方案 |

## 特色

- **MCP 集成指南** — 每款工具的 Claude Code / Claude Desktop MCP Server 配置方法
- **横向对比** — 按企业商用、开发者集成、开源自部署、零成本四大场景推荐
- **全文搜索** — VitePress 本地搜索，快速定位工具信息
- **持续更新** — 追踪 2025-2026 年 AI 多媒体工具最新动态

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建静态站点
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 项目结构

```
docs/
├── index.md                    # 首页
├── tools/
│   ├── video.md                # AI 视频生成工具 (14款)
│   ├── image.md                # AI 图片生成工具 (15款)
│   ├── tts.md                  # AI 语音合成工具 (15款)
│   └── virtual-human.md        # AI 虚拟人工具 (17款)
├── guide/
│   ├── comparison.md           # 工具对比总览
│   └── mcp-integration.md      # MCP 集成指南
├── public/
│   └── logo.svg                # 站点 Logo
└── .vitepress/
    └── config.mjs              # VitePress 配置
```

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态站点生成
- [GitHub Pages](https://pages.github.com/) — 托管部署
- [GitHub Actions](https://github.com/features/actions) — CI/CD 自动构建

## License

MIT
