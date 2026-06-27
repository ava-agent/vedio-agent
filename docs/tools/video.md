---
prev:
  text: '工具对比总览'
  link: '/guide/comparison'
next:
  text: 'AI 图片生成工具'
  link: '/tools/image'
---

# AI 视频生成工具 (13 款)

> 覆盖 13 款主流 AI 视频生成工具，含 API、MCP、定价全面对比

![AI 视频生成工具对比](/images/tools-video-comparison.png)

---

## 总览对比表

| 工具 | 开发商 | 最大分辨率 | 最大时长 | API | MCP | 开源 | 参考价格 |
|------|--------|-----------|---------|-----|-----|------|---------|
| **Seedance** | 字节跳动 | 2K | 15s | 有 | 社区 | 否 | ~$0.01-$0.99/clip |
| **Google Veo** | DeepMind | 1080p | ~148s | 有 | 社区 | 否 | $0.10-$0.75/s |
| **Runway** | Runway AI | 4K | 60s | 有 | 社区 | 否 | 5-15 credits/s |
| **Sora** | OpenAI | 1080p | 25s | 有 | 社区 | 否 | $0.10-$0.50/s |
| **Kling** | 快手 | 4K | 15s | 有 | 社区 | 否 | ~$0.07-$0.14/s |
| **Pika** | Pika Labs | 1080p | 10s | 第三方 | 无 | 否 | ~$0.20-$0.45 |
| **MiniMax/Hailuo** | MiniMax | 1080p | 10s | 有 | **官方** | 否 | ~$0.04-$0.05/s |
| **Luma** | Luma AI | 4K | 30s | 有 | **官方** | 否 | 170-340 credits |
| **PixVerse** | 爱诗科技 | 4K | 8s | 有 | **官方** | 否 | credit 制 |
| **Vidu** | 生数科技 | 1080p | 16s | 有 | 社区 | 部分 | ~$0.038/s |
| **Mochi** | Genmo | 480p | 5.4s | 第三方 | 无 | **Apache 2.0** | 免费 |
| **LTX Video** | Lightricks | 4K | 20s | 有 | 无 | **开放权重** | 免费 |
| **SVD** | Stability AI | 1024x576 | 4s | 已停止 | 无 | **开放权重** | 免费 |

---

## 按场景选型

| 场景 | 推荐工具 | 理由 |
|------|---------|------|
| **质量最高** | Runway Gen-4.5 / Veo 3.1 | 画面品质领先 |
| **性价比最高** | Seedance 2.0 / Kling / MiniMax Hailuo | API 价格低，质量好 |
| **MCP 集成** | Seedance via mcp-video-gen / MiniMax / Luma / PixVerse | Ark Seedance 已接入社区 MCP，MiniMax/Luma/PixVerse 有官方 MCP Server |
| **开源自部署** | LTX-2 / Mochi | 商用友好，适合本地 GPU 工作流 |
| **最长视频** | Veo 3.1 (~148s 扩展) | 支持视频扩展 |
| **原生音频** | Seedance 2.0 / Veo 3.1 / Kling 2.6 | 音视频同步生成 |

## MCP 快速接入

```bash
# 官方 MCP Server
claude mcp add minimax npx -y @minimax-ai/mcp           # MiniMax (官方)
claude mcp add luma npx -y luma-mcp-server               # Luma (官方)
claude mcp add pixverse npx -y pixverse-mcp              # PixVerse (官方)

# 社区 MCP Server
claude mcp add runway npx -y @anthropic/mcp-runway       # Runway
claude mcp add sora npx -y sora-mcp                      # Sora
```

---

*更多信息：[工具对比总览](/guide/comparison) · [MCP 集成指南](/guide/mcp-integration) · [营销视频工作流](/workflows/marketing-video)*
