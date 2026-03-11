---
prev:
  text: 'AI 图片生成工具'
  link: '/tools/image'
next:
  text: 'AI 虚拟人工具'
  link: '/tools/virtual-human'
---

# AI 语音合成工具 (15 款)

> 覆盖 15 款主流 AI TTS 工具，含商业 API、开源方案、MCP 集成

![AI 语音合成工具对比](/images/tools-tts-comparison.png)

---

## 总览对比表

| 工具 | 开发商 | 开源 | MCP | 语言数 | 延迟 | 参考价格 |
|------|--------|------|-----|--------|------|---------|
| **ElevenLabs** | ElevenLabs | 否 | **官方** | 74+ | ~75ms | $5-$1,320/月 |
| **OpenAI TTS** | OpenAI | 否 | 社区 | 50+ | ~500ms | $15-$30/1M chars |
| **Azure TTS** | Microsoft | 否 | 无 | 140+ | ~100ms | $15-$30/1M chars |
| **Google Cloud TTS** | Google | 否 | 社区 | 80+ | ~100-300ms | $4-$160/1M chars |
| **Fish Audio** | Fish Audio | **Apache 2.0** | 社区 | 8+ | 低延迟 | ~$15/1M bytes |
| **ChatTTS** | 社区 | **开源** | 无 | 2 | 本地 | 免费 |
| **CosyVoice** | 阿里 | **Apache 2.0** | 社区 | 9+18方言 | ~150ms | ~$7.15/1M bytes |
| **MiniMax TTS** | MiniMax | 否 | **官方** | 40+ | 低延迟 | $30-$50/1M chars |
| **Bark** | Suno AI | **MIT** | 无 | 13+ | 较高 | 免费 |
| **XTTS/Coqui** | Idiap | **MPL-2.0** | 社区 | 17 | <200ms | 免费 |
| **Edge TTS** | Microsoft | 否(免费) | 无 | 74 | 低 | **完全免费** |
| **Volcengine TTS** | 字节跳动 | 否 | **官方** | 多语言 | 低延迟 | 按量计费 |
| **Resemble.ai** | Resemble | 部分(**MIT**) | 社区 | 149+ | 低延迟 | $40/1M chars |
| **Play.ht** | PlayHT | 否 | 无 | 100+ | 低延迟 | $39-$198/月 |
| **Murf.ai** | Murf | 否 | **官方** | 35+ | **<55ms** | $0.01/分钟 |

---

## 按场景选型

| 场景 | 推荐工具 | 理由 |
|------|---------|------|
| **最高语音品质** | ElevenLabs / MiniMax | 盲测排名最高 |
| **最低延迟** | Murf Falcon (<55ms) / ElevenLabs Flash (75ms) | 毫秒级响应 |
| **零成本** | Edge TTS (免费) / ChatTTS / Bark (开源) | 无需付费 |
| **最多语言** | Resemble.ai (149+) / Azure (140+) | 全球化覆盖 |
| **语音克隆** | ElevenLabs / Fish Audio / CosyVoice | 短音频高保真克隆 |
| **中文场景** | CosyVoice / 火山引擎 / Fish Audio | 中文优化 |
| **MCP 集成** | ElevenLabs / MiniMax / Murf | 官方 MCP Server |
| **开源 TTS-Arena #1** | Fish Audio S1 | Apache 2.0，品质领先 |

## MCP 快速接入

```bash
# 官方 MCP Server
claude mcp add elevenlabs npx -y elevenlabs-mcp            # ElevenLabs (官方)
claude mcp add minimax-tts npx -y @minimax-ai/mcp          # MiniMax (官方)
claude mcp add murf npx -y murf-mcp                        # Murf (官方)
claude mcp add volcengine-tts npx -y @volcengine/mcp-server # 火山引擎 (官方)

# 社区 MCP Server
claude mcp add openai-tts npx -y tts-mcp                   # OpenAI TTS
claude mcp add fish-audio npx -y mcp-fish-audio-server      # Fish Audio
claude mcp add cosyvoice npx -y cosyvoice-mcp              # CosyVoice
```

---

*更多信息：[工具对比总览](/guide/comparison) · [MCP 集成指南](/guide/mcp-integration) · [有声内容工作流](/workflows/audio-production)*
