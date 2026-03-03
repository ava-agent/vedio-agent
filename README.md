# AI 多媒体工具百科

> 全面覆盖 60+ 款 AI 多媒体工具的调研、对比与 MCP 集成指南，附带 4 大工作流提示词模板

**线上地址**: https://vedio-agent.vercel.app

## 项目定位

本项目是一个**纯指南站**，专注于：

- 提供高质量的工作流指南和可复制的提示词模板
- 整理现有最佳开源项目，直接链接使用
- 提供 MCP Server 配置命令，快速集成 AI 能力
- 工具对比表和成本估算，帮助快速选型

**不重复造轮子** — 推荐直接使用 MoneyPrinterTurbo、ShortGPT 等成熟开源项目。

## 内容覆盖

| 类别 | 工具数量 | 包含内容 |
|------|---------|---------|
| AI 视频生成 | 14 款 | Seedance、Veo 3、Runway Gen-4、Sora、Kling、Pika 等 |
| AI 图片生成 | 15 款 | Imagen 4、GPT-Image-1、Midjourney、FLUX.2、SD 3.5 等 |
| AI 语音合成 | 15 款 | ElevenLabs、OpenAI TTS、Fish Audio、CosyVoice 等 |
| AI 虚拟人 | 17 款 | HeyGen、D-ID、Synthesia、LivePortrait、Hallo 等 |
| **合计** | **61 款** | 覆盖 API / SDK / MCP / 定价 / 开源方案 |

## 推荐开源项目

| 项目 | Stars | 描述 | 链接 |
|------|-------|------|------|
| MoneyPrinterTurbo | 49.8k | 一键生成高清短视频，批量支持 | [GitHub](https://github.com/harry0703/MoneyPrinterTurbo) |
| ShortGPT | 7.1k | AI 框架，YouTube Shorts 自动化 | [GitHub](https://github.com/RayVentura/ShortGPT) |
| LivePortrait | 17.9k | 实时人脸动画驱动 | [GitHub](https://github.com/KlingAIResearch/LivePortrait) |
| CosyVoice | 19.8k | 多语言语音生成 | [GitHub](https://github.com/FunAudioLLM/CosyVoice) |

## 工作流指南

| 工作流 | 步骤 | 预估成本 |
|--------|------|---------|
| [营销视频制作](/workflows/marketing-video) | 脚本 → 配图 → 配音 → 数字人 → 视频 | ~$1.68-$2.11 |
| [图文内容创作](/workflows/image-content) | 文案 → 封面 → 配图 → 图标 | ~$0.11-$0.13 |
| [有声内容制作](/workflows/audio-production) | 稿件 → 语音 → 多角色 → BGM | ~$0.61-$2.11 |
| [数字人制作](/workflows/digital-human) | 形象 → 动作 → 唇形 → 互动 | ~$0.54 |

## 特色

- **开源项目推荐** — 直接链接到 MoneyPrinterTurbo、ShortGPT 等成熟项目
- **MCP 集成指南** — 每款工具的 Claude Code / Claude Desktop MCP Server 配置方法
- **提示词模板** — 可复制粘贴的工作流提示词，支持参数替换
- **成本估算** — 每个步骤的预估成本，帮助预算规划
- **工具对比** — 按企业商用、开发者集成、开源自部署、零成本四大场景推荐

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
vedio-agent/
├── docs/
│   ├── workflows/                # 4 个工作流指南
│   ├── tools/                    # 4 类工具百科
│   ├── guide/                    # 快速开始 + 对比 + MCP
│   └── .vitepress/
│       ├── config.mts            # VitePress 配置
│       └── theme/                # 自定义主题 + Vue 组件
└── package.json
```

## 更新日志

### v3.0.0 (2026-03-03)

- 重构为纯指南站，移除自定义 API 功能
- 新增「快速开始」和「开源项目推荐」页面
- 推荐直接使用 MoneyPrinterTurbo、ShortGPT 等成熟项目
- 简化项目结构，移除 Supabase 依赖

### v2.0.0 (2026-03-02)

- 新增 4 个工作流页面
- 新增 Vue 交互组件
- 从 GitHub Pages 迁移到 Vercel

## License

MIT
