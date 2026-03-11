---
prev:
  text: 'AI 视频生成工具'
  link: '/tools/video'
next:
  text: 'AI 语音合成工具'
  link: '/tools/tts'
---

# AI 图片生成工具 (15 款)

> 覆盖 15 款主流 AI 图片生成工具，含 API、MCP、定价全面对比

![AI 图片生成工具对比](/images/tools-image-comparison.png)

---

## 总览对比表

| 工具 | 开发商 | 最大分辨率 | API | MCP | 开源 | 单图价格 |
|------|--------|-----------|-----|-----|------|---------|
| **Nano Banana** | Google | 1024x1024 | 有 | 社区 | 否 | ~$0.039 |
| **Nano Banana Pro** | Google | 4K | 有 | 社区 | 否 | ~$0.12 |
| **Imagen 4** | Google | 2K | 有 | 社区 | 否 | $0.02-$0.06 |
| **GPT-Image-1** | OpenAI | 4096x4096 | 有 | 社区 | 否 | $0.02-$0.19 |
| **Midjourney** | Midjourney | 2048x2048 | 非官方 | 非官方 | 否 | $10-$120/月 |
| **SD 3.5/SDXL** | Stability AI | 1024x1024 | 有 | 社区 | **开源** | ~$0.065 / 免费 |
| **FLUX.2** | Black Forest Labs | 2048x2048 | 有 | 社区 | **部分开源** | $0.014-$0.05 |
| **Ideogram 3.0** | Ideogram | 2048x2048 | 有 | 社区 | 否 | $0.01-$0.17 |
| **Leonardo.ai** | Leonardo | ~5MP | 有 | 社区 | 否 | $9/月起 |
| **SeedDream 4.5** | 字节跳动 | 4096x4096 | 有 | 社区 | 否 | ~$0.03-$0.045 |
| **Recraft v3** | Recraft | 16MP | 有 | **官方** | 否 | $0.04(光栅)/$0.08(矢量) |
| **Adobe Firefly** | Adobe | 4MP | 有 | 无 | 否 | $4.99/月起 |
| **Kolors 2.1** | 快手 | 2K | 第三方 | 无 | **Apache 2.0** | 免费 |
| **Playground v3** | Playground | 1024x1024 | 受限 | 无 | 否 | $15/月起 |
| **SDXL Turbo** | Stability AI | 512x512 | 第三方 | 社区 | **开源** | ~$0.003 |

---

## 按场景选型

| 场景 | 推荐工具 | 理由 |
|------|---------|------|
| **最高性价比** | FLUX.2 [klein] ($0.014) / Imagen 4 Fast ($0.02) | 最低单张价格 |
| **最强文字渲染** | Ideogram 3.0 (~90%准确率) / Recraft v3 | 文字精准 |
| **最佳矢量图** | Recraft v3 | 唯一原生 SVG 生成 |
| **最佳本地部署** | SD 3.5 + ComfyUI / FLUX.2 | 开源生态丰富 |
| **最佳商业安全** | Adobe Firefly | 合法授权数据训练 |
| **最佳中文支持** | Kolors (快手) / SeedDream (字节) | 中文场景理解强 |
| **极致速度** | SDXL Turbo (2-8步实时) | 毫秒级生成 |
| **MCP 集成** | Recraft v3 (官方) / Imagen 4 / FLUX.2 | MCP 生态完善 |

## MCP 快速接入

```bash
# 官方 MCP Server
claude mcp add recraft npx @recraft-ai/mcp-recraft-server  # Recraft (官方)

# 社区 MCP Server
claude mcp add gemini-image npx -y gemini-imagen4          # Imagen 4
claude mcp add openai-image npx -y imagegen-mcp            # GPT-Image-1
claude mcp add flux npx -y image-generation-mcp-server     # FLUX.2
claude mcp add ideogram npx -y ideogram-mcp-server         # Ideogram
```

---

*更多信息：[工具对比总览](/guide/comparison) · [MCP 集成指南](/guide/mcp-integration) · [图文内容工作流](/workflows/image-content)*
