# AI 多媒体工具百科

> 全面覆盖 60+ 款 AI 多媒体工具的调研、对比与 MCP 集成指南，附带 4 大工作流提示词模板

## 内容覆盖

| 类别 | 工具数量 | 包含内容 |
|------|---------|---------|
| AI 视频生成 | 14 款 | Seedance、Veo 3、Runway Gen-4、Sora、Kling、Pika 等 |
| AI 图片生成 | 15 款 | Imagen 4、GPT-Image-1、Midjourney、FLUX.2、SD 3.5 等 |
| AI 语音合成 | 15 款 | ElevenLabs、OpenAI TTS、Fish Audio、CosyVoice 等 |
| AI 虚拟人 | 17 款 | HeyGen、D-ID、Synthesia、LivePortrait、Hallo 等 |
| **合计** | **61 款** | 覆盖 API / SDK / MCP / 定价 / 开源方案 |

## 工作流指南

| 工作流 | 步骤 | 预估成本 |
|--------|------|---------|
| [营销视频制作](/workflows/marketing-video) | 脚本 → 配图 → 配音 → 数字人 → 视频 | ~$1.68-$2.11 |
| [图文内容创作](/workflows/image-content) | 文案 → 封面 → 配图 → 图标 | ~$0.11-$0.13 |
| [有声内容制作](/workflows/audio-production) | 稿件 → 语音 → 多角色 → BGM | ~$0.61-$2.11 |
| [数字人制作](/workflows/digital-human) | 形象 → 动作 → 唇形 → 互动 | ~$0.54 |

每个工作流包含可复制的提示词模板、工具对比表和成本估算。

## 特色

- **工作流指南** — 4 大场景的完整制作流程，附带提示词模板和 MCP 命令
- **交互式生成** — 填写参数调用 AI API 生成图片/语音/视频（Vercel + Supabase）
- **MCP 集成指南** — 每款工具的 Claude Code / Claude Desktop MCP Server 配置方法
- **横向对比** — 按企业商用、开发者集成、开源自部署、零成本四大场景推荐
- **全文搜索** — VitePress 本地搜索，快速定位工具信息

## 技术架构

```
VitePress (静态文档 + Vue 交互组件)
    ↓
Vercel (静态托管 + Serverless API)
    ↓
Supabase (用户认证 + API Key 存储 + 生成历史)
    ↓
外部 AI APIs (OpenAI, Google, ElevenLabs, HeyGen, Runway...)
```

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

### 环境变量

```bash
cp .env.example .env.local
# 编辑 .env.local 填写 Supabase 和加密密钥
```

## 项目结构

```
vedio-agent/
├── api/                          # Vercel Serverless Functions
│   ├── generate/                 # AI 生成代理 (image/tts/video/avatar)
│   ├── keys/                     # API Key 管理
│   ├── history/                  # 生成历史
│   └── _lib/                     # 共享工具 (auth/supabase/encryption)
├── docs/
│   ├── workflows/                # 4 个工作流指南
│   ├── tools/                    # 4 类工具百科
│   ├── guide/                    # 对比总览 + MCP 集成
│   └── .vitepress/
│       ├── config.mts            # VitePress 配置
│       └── theme/                # 自定义主题 + Vue 组件
├── supabase/migrations/          # 数据库 schema
├── vercel.json                   # Vercel 部署配置
└── .env.example                  # 环境变量模板
```

## License

MIT
