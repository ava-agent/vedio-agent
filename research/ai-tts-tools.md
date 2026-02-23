# AI 语音合成/配音工具全面调研

> 调研时间：2025-2026 年主流 AI TTS 工具
> 覆盖范围：15 款工具，涵盖商业 API、开源方案、MCP 集成等维度

---

## 目录

- [一、总览对比表](#一总览对比表)
- [二、各工具详细信息](#二各工具详细信息)
  - [1. ElevenLabs](#1-elevenlabs)
  - [2. OpenAI TTS](#2-openai-tts)
  - [3. Azure Speech Service / Azure TTS](#3-azure-speech-service--azure-tts)
  - [4. Google Cloud TTS / Gemini TTS](#4-google-cloud-tts--gemini-tts)
  - [5. Fish Audio / Fish Speech](#5-fish-audio--fish-speech)
  - [6. ChatTTS](#6-chattts)
  - [7. CosyVoice（阿里 FunAudioLLM）](#7-cosyvoice阿里-funaudiollm)
  - [8. MiniMax TTS](#8-minimax-tts)
  - [9. Bark（Suno）](#9-barksuno)
  - [10. XTTS / Coqui TTS](#10-xtts--coqui-tts)
  - [11. Edge TTS](#11-edge-tts)
  - [12. Volcengine TTS / 火山引擎](#12-volcengine-tts--火山引擎)
  - [13. Resemble.ai](#13-resembleai)
  - [14. Play.ht](#14-playht)
  - [15. Murf.ai](#15-murfai)
- [三、API / MCP Server 汇总表](#三api--mcp-server-汇总表)
- [四、SDK / 包名汇总表](#四sdk--包名汇总表)
- [五、定价对比表](#五定价对比表)
- [六、开源状态对比表](#六开源状态对比表)
- [七、关键趋势与选型建议](#七关键趋势与选型建议)
- [八、参考来源](#八参考来源)

---

## 一、总览对比表

| 工具 | 开发商 | 开源 | API | MCP Server | 语言数 | 延迟 | 定价（参考） |
|------|--------|------|-----|------------|--------|------|-------------|
| **ElevenLabs** | ElevenLabs Inc. | 否 (闭源) | 有 | 官方有 | 74+ | ~75ms (Flash) | $5-$1,320/月 |
| **OpenAI TTS** | OpenAI | 否 | 有 | 社区有 | 50+ | ~500ms | $15/$30 per 1M chars |
| **Azure TTS** | Microsoft | 否 | 有 | 无专用 | 140+ | ~100-200ms | $15-$30 per 1M chars |
| **Google Cloud TTS** | Google | 否 | 有 | 社区有 | 40+ (Cloud) / 80+ (Gemini) | ~100-300ms | $4-$160 per 1M chars |
| **Fish Audio** | Fish Audio | 是 (Apache-2.0) | 有 | 社区有 | 8+ | 低延迟流式 | ~$15 per 1M UTF-8 bytes |
| **ChatTTS** | 2noise (社区) | 是 (开源) | 无官方 | 无 | 2 (中/英) | 本地推理 | 免费 |
| **CosyVoice** | 阿里 FunAudioLLM | 是 (Apache-2.0) | 有 (阿里云) | 社区有 | 9+ 语言+18方言 | ~150ms | ~$7.15/1M UTF-8 bytes |
| **MiniMax TTS** | MiniMax | 否 | 有 | 官方有 | 40+ | 低延迟 | $30-$50 per 1M chars |
| **Bark (Suno)** | Suno AI | 是 (MIT) | 无官方 | 无 | 13+ | 较高 (非实时) | 免费 |
| **XTTS/Coqui TTS** | Coqui AI (已关闭)/Idiap | 是 (MPL-2.0) | 无官方 | 社区有 | 17 | <200ms 流式 | 免费 |
| **Edge TTS** | Microsoft | 否 (免费调用) | 非官方 | 无 | 74 | 低延迟 | 完全免费 |
| **Volcengine TTS** | 字节跳动 | 否 | 有 | 有 (官方仓库) | 多语言 | 低延迟流式 | 按并发/调用计费 |
| **Resemble.ai** | Resemble AI | 部分 (Chatterbox MIT) | 有 | 社区有 | 149+ | 低延迟 | $40/1M chars (Chatterbox HD) |
| **Play.ht** | PlayHT Inc. | 否 | 有 | 无 | 100+ | 低延迟流式 | $39-$198/月 |
| **Murf.ai** | Murf Inc. | 否 | 有 | 官方有 | 35+ | <55ms | $0.01/分钟 (Falcon) |

---

## 二、各工具详细信息

---

### 1. ElevenLabs

| 维度 | 详情 |
|------|------|
| **开发商** | ElevenLabs Inc. |
| **官网** | https://elevenlabs.io/ |
| **核心定位** | 业界领先的 AI 语音平台，独立盲测排名最高 |

**核心能力：**
- **TTS 模型**：Multilingual v2（最高品质）、Flash v2.5（超低延迟）、Eleven v3（最新，74 语言）
- **语音克隆**：即时克隆（Starter 计划起）+ 专业克隆（Creator 计划起）
- **情感控制**：根据文本上下文自动调整语调、节奏
- **多语言**：74+ 语言 (Eleven v3)
- **实时流式**：WebSocket 双向流式，Flash v2.5 低至 75ms 延迟

**API 信息：**
- **公开 API**：有
- **API 文档**：https://elevenlabs.io/docs/api-reference/introduction

**MCP Server：**
- **状态**：官方提供
- **GitHub**：https://github.com/elevenlabs/elevenlabs-mcp

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `elevenlabs` |
| npm | `elevenlabs` / `@elevenlabs/elevenlabs-js` |

**定价：**
- 免费层：10,000 credits/月
- Starter：$5/月
- Creator：$22/月
- Pro：$99/月
- Scale：$330/月
- Business：$1,320/月
- 按量付费 API 另计

**开源状态：** 否（模型闭源，SDK 和 UI 库开源）

**延迟：** Flash v2.5 模型推理延迟 ~75ms，WebSocket + 就近区域（美/欧/亚）优化

---

### 2. OpenAI TTS

| 维度 | 详情 |
|------|------|
| **开发商** | OpenAI |
| **官网** | https://platform.openai.com/ |
| **核心定位** | 与 OpenAI 生态深度集成的 TTS 服务 |

**核心能力：**
- **TTS 模型**：tts-1（标准，低延迟）、tts-1-hd（高保真）、gpt-4o-mini-tts（最新，更低 WER）
- **多音色**：13 种内置语音（Alloy, Ash, Ballad, Coral, Echo, Fable, Nova, Onyx, Sage, Shimmer, Verse 等）
- **流式输出**：支持 HTTP 流式
- **多格式**：MP3、Opus、AAC、FLAC、WAV、PCM
- **语音克隆**：无

**API 信息：**
- **公开 API**：有
- **API 文档**：https://platform.openai.com/docs/guides/text-to-speech

**MCP Server：**
- **状态**：社区实现
- **GitHub**：
  - https://github.com/JosefGold/tts-mcp
  - https://github.com/nakamurau1/tts-mcp
  - https://github.com/blacktop/mcp-tts

**SDK/包名：**
| 平台 | 包名 | 调用方式 |
|------|------|---------|
| pip | `openai` | `client.audio.speech.create()` |
| npm | `openai` | OpenAI SDK 内置 |

**定价：**
- tts-1：$15/1M chars
- tts-1-hd：$30/1M chars

**开源状态：** 否

**延迟：** tts-1 优化为低延迟（~500ms TTFB），Realtime API ~500ms

---

### 3. Azure Speech Service / Azure TTS

| 维度 | 详情 |
|------|------|
| **开发商** | Microsoft |
| **官网** | https://azure.microsoft.com/en-us/products/ai-services/speech-service |
| **核心定位** | 企业级多语言 TTS 服务，语言覆盖最广 |

**核心能力：**
- **TTS 模型**：Neural TTS（标准）+ Neural HD V2（高品质）
- **定制语音**：Custom Neural Voice（品牌专属音色训练）
- **SSML 支持**：精细控制语速、语调、停顿、音量
- **嵌入式部署**：支持容器化离线/边缘部署
- **上下文情感感知**：HD V2 自动检测并调整语气和风格

**API 信息：**
- **公开 API**：有
- **API 文档**：https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech
- **支持语言**：140+ 语言，500+ 语音

**MCP Server：**
- **状态**：无专用 TTS MCP Server
- **通用 Azure MCP**：https://github.com/Azure/azure-mcp

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `azure-cognitiveservices-speech` |
| npm | `microsoft-cognitiveservices-speech-sdk` |
| .NET | Azure.CognitiveServices.Speech |
| Java | Maven SDK |
| C++ | 有 |

**定价：**
- Neural 标准：$15/1M chars
- Neural HD V2：$30/1M chars
- 免费层：5M chars/月

**开源状态：** 否

**延迟：** ~100-200ms（Neural），支持流式合成优化

---

### 4. Google Cloud TTS / Gemini TTS

| 维度 | 详情 |
|------|------|
| **开发商** | Google |
| **官网** | https://cloud.google.com/text-to-speech |
| **核心定位** | 多层次品质选择 + Gemini 大模型 TTS 新能力 |

**核心能力：**
- **Google Cloud TTS**：Standard / WaveNet / Neural2 / Studio / Journey 多层次语音品质
- **Gemini TTS**：Gemini 2.5 Flash/Pro TTS，支持 30 speaker、80+ locale，自然语言 Prompt 控制风格/口音/语速/情感
- **流式合成**：支持
- **SSML 支持**：完善
- **单/多说话人合成**

**API 信息：**
- **Google Cloud TTS**：https://cloud.google.com/text-to-speech
- **Gemini TTS**：https://ai.google.dev/gemini-api/docs/pricing
- **支持语言**：Google Cloud TTS 40+ 语言 220+ 语音；Gemini TTS 80+ locale

**MCP Server：**
- **状态**：社区实现
- **GitHub**：https://github.com/blacktop/mcp-tts（包含 google_tts）

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `google-cloud-texttospeech` |
| npm | `@google-cloud/text-to-speech` |

**定价：**

| 层级 | 价格 |
|------|------|
| Cloud TTS Standard | $4/1M chars |
| Cloud TTS WaveNet | $16/1M chars |
| Cloud TTS Studio | $160/1M chars |
| 免费层 | 1M chars/月 |
| Gemini Flash 输入 | $0.50/1M tokens |
| Gemini Flash 输出 | $10/1M tokens |
| Gemini Pro 输入 | $1/1M tokens |
| Gemini Pro 输出 | $20/1M tokens |

**开源状态：** 否

**延迟：** ~100-300ms，Gemini TTS 支持流式输出

---

### 5. Fish Audio / Fish Speech

| 维度 | 详情 |
|------|------|
| **开发商** | Fish Audio |
| **官网** | https://fish.audio/ |
| **核心定位** | 开源 TTS 领先者，TTS-Arena 排名第一 |

**核心能力：**
- **TTS 模型**：OpenAudio S1（旗舰 4B）和 S1-mini，TTS-Arena 排名第一
- **语音克隆**：10-30 秒参考音频即可克隆，保留音色、风格和情感倾向
- **情感控制**：首个支持开放域细粒度情感控制的 TTS 模型（通过 emotion/tone markers）
- **多语言**：英语、日语、韩语、中文、法语、德语、阿拉伯语、西班牙语
- **实时流式 API**

**API 信息：**
- **公开 API**：有
- **API 文档**：https://docs.fish.audio/

**MCP Server：**
- **状态**：社区实现
- **GitHub**：https://github.com/da-okazaki/mcp-fish-audio-server

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `fish-audio-sdk`（旧）/ `fishaudio`（新官方） |
| npm | `fish-audio-sdk` / `fish-audio` |

**定价：**
- ~$15/1M UTF-8 bytes
- 免费层：1 小时/月

**开源状态：** 是 -- Apache-2.0
- **GitHub**：https://github.com/fishaudio/fish-speech

**延迟：** 低延迟流式（WER 0.008，CER 0.004 on English）

---

### 6. ChatTTS

| 维度 | 详情 |
|------|------|
| **开发商** | 2noise（开源社区项目） |
| **GitHub** | https://github.com/2noise/ChatTTS |
| **核心定位** | 专为 LLM 对话场景优化的开源 TTS |

**核心能力：**
- **对话式 TTS**：专为 LLM 对话场景优化
- **细粒度韵律控制**：笑声、停顿、叹息等副语言控制
- **多说话人支持**
- **训练数据**：约 10 万小时中英文数据

**API 信息：**
- **公开 API**：无官方托管 API（需自部署）

**MCP Server：** 无

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `chattts` |
| npm | 无 |

**定价：** 免费（开源自部署）

**开源状态：** 是
- **GitHub**：https://github.com/2noise/ChatTTS
- **支持语言**：2（中文、英文）

**延迟：** 取决于本地硬件，非云端服务

---

### 7. CosyVoice（阿里 FunAudioLLM）

| 维度 | 详情 |
|------|------|
| **开发商** | 阿里巴巴 FunAudioLLM 团队 |
| **GitHub** | https://github.com/FunAudioLLM/CosyVoice |
| **核心定位** | 阿里开源 TTS 旗舰，中文场景最佳选择之一 |

**核心能力：**
- **TTS 模型**：cosyvoice-v3-plus（最佳品质）、cosyvoice-v3-flash（快速）、cosyvoice-v2
- **语音克隆**：10-20 秒音频样本即可零样本克隆，支持跨语言克隆
- **实时流式**：双向流式输入输出，低延迟 150ms
- **精细控制**：语速、音调、音量、比特率
- **采样率**：支持 48kHz

**API 信息：**
- **公开 API**：有（阿里云）
- **API 文档**：https://www.alibabacloud.com/help/en/model-studio/text-to-speech
- **支持语言**：9 语言 + 18 方言（含中、英、日、韩等）

**MCP Server：**
- **状态**：社区实现
- **GitHub**：https://github.com/Z-bitlance/cosyVoice-mcp

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | 克隆仓库安装（无独立 PyPI 包） |
| 阿里云 SDK | Java/Python 通过 DashScope SDK |

**定价：**
- SiliconFlow 上 ~$7.15/1M UTF-8 bytes
- 阿里云官方按量计费（cosyvoice-v3-plus 品质最佳）

**开源状态：** 是 -- Apache-2.0
- **GitHub**：https://github.com/FunAudioLLM/CosyVoice

**延迟：** ~150ms（CosyVoice 3），支持流式

---

### 8. MiniMax TTS

| 维度 | 详情 |
|------|------|
| **开发商** | MiniMax |
| **官网** | https://platform.minimax.io/ |
| **核心定位** | Artificial Analysis 排名第二，超长文本处理优势 |

**核心能力：**
- **TTS 模型**：Speech-02-HD（高品质配音/有声书）、Speech-02-Turbo（实时应用，更快更便宜）
- **排名**：Speech 2.6 在 Artificial Analysis 排名第二（ELO 1,156）
- **语音克隆**：最短 5 秒音频，~30 秒训练完成
- **超长文本**：单次 200,000 字符批处理
- **多语言**：40+ 语言

**API 信息：**
- **公开 API**：有
- **API 文档**：https://platform.minimax.io/docs/

**MCP Server：**
- **状态**：官方提供（Python + JS）
- **GitHub**：
  - Python: https://github.com/MiniMax-AI/MiniMax-MCP
  - JS: https://github.com/MiniMax-AI/MiniMax-MCP-JS

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `minimax` |
| npm | `minimax` |

**定价：**
- Turbo：$30/1M chars
- HD：$50/1M chars
- 语音克隆：$3/voice

**开源状态：** 否

**延迟：** 低延迟（Turbo 模型针对实时场景优化）

---

### 9. Bark（Suno）

| 维度 | 详情 |
|------|------|
| **开发商** | Suno AI |
| **GitHub** | https://github.com/suno-ai/bark |
| **核心定位** | 开源文本到音频生成，不仅限语音 |

**核心能力：**
- **文本到音频**：可生成语音、笑声、叹气、哭泣、背景噪音、简单音效
- **语音克隆**：~10 秒音频即可
- **多说话人**：支持
- **小模型版本**：适配 8GB VRAM
- **加速**：GPU 2x 加速，CPU 10x 加速

**API 信息：**
- **公开 API**：无官方托管 API（需自部署）
- **支持语言**：13+（英、中、法、德、西、意、日、韩、波兰、葡、俄、土、印地语）

**MCP Server：** 无

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `pip install git+https://github.com/suno-ai/bark.git`（注意：勿用 `pip install bark`） |
| HuggingFace | `pip install transformers`（通过 Transformers 调用） |
| npm | 无 |

**定价：** 免费（开源自部署）

**开源状态：** 是 -- MIT 许可
- **GitHub**：https://github.com/suno-ai/bark

**延迟：** 较高，非实时（生成式模型，适合离线批量）

---

### 10. XTTS / Coqui TTS

| 维度 | 详情 |
|------|------|
| **开发商** | 原 Coqui AI（2023.12 关闭）/ 现由 Idiap Research Institute 社区维护 |
| **GitHub** | https://github.com/idiap/coqui-ai-TTS |
| **核心定位** | 经典开源 TTS 框架，社区维护活跃 |

**核心能力：**
- **TTS 模型**：XTTS-v2 旗舰模型，多语言多说话人
- **语音克隆**：仅需 6 秒音频
- **情感/风格迁移**：通过克隆实现
- **流式合成**：<200ms 延迟
- **多 GPU 训练**：支持

**API 信息：**
- **公开 API**：无官方托管 API（自部署 + xtts-streaming-server）
- **支持语言**：17（英、西、法、德、意、葡、波兰、土、俄、荷兰、捷克、阿拉伯、中、日、匈牙利、韩、印地语）

**MCP Server：**
- **状态**：社区实现
- **参考**：LobeHub MCP 目录（https://lobehub.com/mcp/yourusername-mcp-coqui-tts）

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `coqui-tts` |
| npm | 无 |

**定价：** 免费（开源自部署）

**开源状态：** 是 -- MPL-2.0
- **GitHub**：https://github.com/idiap/coqui-ai-TTS（社区 fork 维护）

**延迟：** <200ms（流式模式）

---

### 11. Edge TTS

| 维度 | 详情 |
|------|------|
| **开发商** | Microsoft（通过 Edge 浏览器 Read Aloud API） |
| **核心定位** | 完全免费的高品质神经网络语音服务 |

**核心能力：**
- **TTS 引擎**：利用 Microsoft Edge 在线语音合成服务
- **高品质神经网络语音**
- **无需 API Key**：完全免费
- **SSML 支持**：支持 SSML 子集
- **注意**：2025.12 起需要匹配 Edge 浏览器 User-Agent

**API 信息：**
- **公开 API**：非官方封装（无需 Key）
- **支持语言**：74 语言，322 种语音

**MCP Server：** 无

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `edge-tts` |
| npm | `edge-tts-universal` / `msedge-tts` / `@andresaya/edge-tts` |

**定价：** **完全免费**（个人和商用）

**开源状态：** 服务本身不开源（但调用端封装库开源）

**延迟：** 低延迟（依赖网络），支持流式

---

### 12. Volcengine TTS / 火山引擎

| 维度 | 详情 |
|------|------|
| **开发商** | 字节跳动 / 火山引擎 |
| **官网** | https://www.volcengine.com/product/tts |
| **核心定位** | 中文场景企业级 TTS，大模型驱动 |

**核心能力：**
- **大模型语音合成**：基于上下文智能预测情感和语调
- **双向流式 TTS**：边生成边输出
- **精细控制**：语速、音调、音量、比特率
- **音色定制**：丰富的预置音色 + 自定义训练
- **企业级并发能力**

**API 信息：**
- **公开 API**：有
- **API 文档**：https://www.volcengine.com/product/tts
- **支持语言**：多语言（主要中文为主，英语及其他语言支持）

**MCP Server：**
- **状态**：官方仓库含 TTS 集成
- **GitHub**：https://github.com/volcengine/mcp-server

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `volcengine` |
| Java | Maven `volcengine-tts-spring-boot-starter` |
| npm | 无专用包（通过 REST API） |

**定价：**
- 提供免费试用额度
- 正式版按调用量阶梯计费或按并发计费（2,000 元/并发/月）

**开源状态：** 否

**延迟：** 低延迟流式，适合实时交互

---

### 13. Resemble.ai

| 维度 | 详情 |
|------|------|
| **开发商** | Resemble AI |
| **官网** | https://www.resemble.ai/ |
| **核心定位** | 语音克隆专家，兼具安全防护能力 |

**核心能力：**
- **TTS 模型**：Chatterbox HD（闭源高品质）+ Chatterbox 开源系列
- **语音克隆**：快速克隆（10 秒音频）+ 专业克隆（更多数据、更高保真）
- **深度定制**：音调、节奏、情感、风格
- **Deepfake 检测**：内置音频/视频/图像检测
- **Perth 水印**：每段音频内嵌不可感知的神经水印
- **语音到语音转换**

**API 信息：**
- **公开 API**：有
- **API 文档**：https://docs.resemble.ai/
- **支持语言**：149+ 语言（API）；Chatterbox 开源版 23 语言

**MCP Server：**
- **状态**：社区/官方实现
- **GitHub**：https://github.com/obaid/resemble-mcp

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `resemble` |
| npm | `@resemble/node` |

**定价：**
- Chatterbox HD：$40/1M chars
- 企业级：定制定价

**开源状态：** 部分开源
- Chatterbox 系列 MIT 开源：https://github.com/resemble-ai/chatterbox

**延迟：** 低延迟（实时 API）

---

### 14. Play.ht

| 维度 | 详情 |
|------|------|
| **开发商** | PlayHT Inc. |
| **官网** | https://play.ht/ |
| **核心定位** | 超逼真语音，适合长篇内容（有声书、播客） |

**核心能力：**
- **超逼真语音**：适合长篇内容（有声书、播客）
- **语音克隆**：短音频样本即可创建高保真克隆
- **多格式输出**：MP3、WAV（8kHz-48kHz）
- **实时流式**：WebSocket API 低延迟
- **832+ AI 语音**

**API 信息：**
- **公开 API**：有
- **API 文档**：https://docs.play.ht/
- **支持语言**：100+ 语言，120+ 语言变体

**MCP Server：** 无

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `pyht`（官方） |
| npm | `playht` |

**定价：**
- Creator：$39/月
- Pro：$99/月
- Business：$198/月

**开源状态：** 否

**延迟：** 低延迟实时流式

---

### 15. Murf.ai

| 维度 | 详情 |
|------|------|
| **开发商** | Murf Inc. |
| **官网** | https://murf.ai/ |
| **核心定位** | 超低延迟 TTS + 翻译配音 |

**核心能力：**
- **TTS 引擎**：Falcon 引擎（超低延迟 <55ms）
- **150+ 语音**：多种说话风格（20+ 种）
- **翻译配音**：21+ 语言翻译后再合成语音
- **专业配音**：25+ 语言，保留原始感觉
- **高并发**：支持 10,000 并发调用，延迟不变
- **准确率**：99.38% 发音准确率

**API 信息：**
- **公开 API**：有
- **API 文档**：https://murf.ai/api/docs
- **支持语言**：35+ 语言

**MCP Server：**
- **状态**：官方提供
- **GitHub**：https://github.com/murf-ai/murf-mcp

**SDK/包名：**
| 平台 | 包名 |
|------|------|
| pip | `murf` |
| npm | 有（官方提及 JavaScript SDK） |

**定价：**
- Falcon API：$0.01/分钟
- Creator Lite：$29/月
- Business Plus：$199/月

**开源状态：** 否

**延迟：** <55ms 模型延迟，<130ms 首音频时间（TTFB）

---

## 三、API / MCP Server 汇总表

| 工具 | 公开 API | MCP Server 状态 | MCP GitHub 链接 |
|------|---------|----------------|-----------------|
| ElevenLabs | 有 | **官方** | https://github.com/elevenlabs/elevenlabs-mcp |
| OpenAI TTS | 有 | 社区 | https://github.com/JosefGold/tts-mcp / https://github.com/blacktop/mcp-tts |
| Azure TTS | 有 | 无专用（通用 Azure MCP） | https://github.com/Azure/azure-mcp |
| Google Cloud TTS | 有 | 社区 | https://github.com/blacktop/mcp-tts |
| Fish Audio | 有 | 社区 | https://github.com/da-okazaki/mcp-fish-audio-server |
| ChatTTS | 无官方 | 无 | -- |
| CosyVoice | 有（阿里云） | 社区 | https://github.com/Z-bitlance/cosyVoice-mcp |
| MiniMax TTS | 有 | **官方** (Python + JS) | https://github.com/MiniMax-AI/MiniMax-MCP |
| Bark | 无官方 | 无 | -- |
| XTTS/Coqui | 无官方 | 社区 | 参见 LobeHub MCP 目录 |
| Edge TTS | 非官方 | 无 | -- |
| Volcengine TTS | 有 | 官方仓库含集成 | https://github.com/volcengine/mcp-server |
| Resemble.ai | 有 | 社区/官方 | https://github.com/obaid/resemble-mcp |
| Play.ht | 有 | 无 | -- |
| Murf.ai | 有 | **官方** | https://github.com/murf-ai/murf-mcp |

---

## 四、SDK / 包名汇总表

| 工具 | pip 包名 | npm 包名 |
|------|---------|---------|
| ElevenLabs | `elevenlabs` | `elevenlabs` / `@elevenlabs/elevenlabs-js` |
| OpenAI TTS | `openai` | `openai` |
| Azure TTS | `azure-cognitiveservices-speech` | `microsoft-cognitiveservices-speech-sdk` |
| Google Cloud TTS | `google-cloud-texttospeech` | `@google-cloud/text-to-speech` |
| Fish Audio | `fish-audio-sdk` / `fishaudio` | `fish-audio-sdk` / `fish-audio` |
| ChatTTS | `chattts` | -- |
| CosyVoice | 克隆仓库安装 | -- |
| MiniMax TTS | `minimax` | `minimax` |
| Bark | `git+https://github.com/suno-ai/bark.git` | -- |
| XTTS/Coqui | `coqui-tts` | -- |
| Edge TTS | `edge-tts` | `edge-tts-universal` / `msedge-tts` |
| Volcengine TTS | `volcengine` | -- |
| Resemble.ai | `resemble` | `@resemble/node` |
| Play.ht | `pyht` | `playht` |
| Murf.ai | `murf` | 有（待确认包名） |

---

## 五、定价对比表

| 工具 | 免费层 | 按量计费 | 订阅计费 | 备注 |
|------|--------|---------|---------|------|
| ElevenLabs | 10K credits/月 | 按量付费 API | $5-$1,320/月 | 阶梯订阅 |
| OpenAI TTS | 无 | $15-$30/1M chars | -- | 按用量 |
| Azure TTS | 5M chars/月 | $15-$30/1M chars | -- | 企业折扣 |
| Google Cloud TTS | 1M chars/月 | $4-$160/1M chars | -- | 层级差异大 |
| Fish Audio | 1 小时/月 | ~$15/1M UTF-8 bytes | -- | -- |
| ChatTTS | **完全免费** | -- | -- | 自部署 |
| CosyVoice | -- | ~$7.15/1M UTF-8 bytes | -- | SiliconFlow 价格 |
| MiniMax TTS | -- | $30-$50/1M chars | -- | 克隆 $3/voice |
| Bark | **完全免费** | -- | -- | 自部署 |
| XTTS/Coqui | **完全免费** | -- | -- | 自部署 |
| Edge TTS | **完全免费** | -- | -- | 无限制 |
| Volcengine TTS | 试用额度 | 阶梯计费 | 2,000 元/并发/月 | 按并发 |
| Resemble.ai | -- | $40/1M chars | 企业定制 | -- |
| Play.ht | -- | -- | $39-$198/月 | 订阅制 |
| Murf.ai | -- | $0.01/分钟 | $29-$199/月 | API + 订阅 |

---

## 六、开源状态对比表

| 工具 | 开源 | 许可证 | GitHub 仓库 | 备注 |
|------|------|--------|-------------|------|
| ElevenLabs | 否 | -- | -- | 模型闭源，SDK 开源 |
| OpenAI TTS | 否 | -- | -- | 完全闭源 |
| Azure TTS | 否 | -- | -- | 完全闭源 |
| Google Cloud TTS | 否 | -- | -- | 完全闭源 |
| **Fish Audio** | **是** | Apache-2.0 | https://github.com/fishaudio/fish-speech | TTS-Arena 排名第一 |
| **ChatTTS** | **是** | 开源 | https://github.com/2noise/ChatTTS | 对话场景专用 |
| **CosyVoice** | **是** | Apache-2.0 | https://github.com/FunAudioLLM/CosyVoice | 阿里开源 |
| MiniMax TTS | 否 | -- | -- | 完全闭源 |
| **Bark** | **是** | MIT | https://github.com/suno-ai/bark | 文本到音频 |
| **XTTS/Coqui** | **是** | MPL-2.0 | https://github.com/idiap/coqui-ai-TTS | 社区 fork 维护 |
| Edge TTS | 否 | -- | -- | 封装库开源 |
| Volcengine TTS | 否 | -- | -- | 完全闭源 |
| **Resemble.ai** | **部分** | MIT (Chatterbox) | https://github.com/resemble-ai/chatterbox | 开源 + 闭源并行 |
| Play.ht | 否 | -- | -- | 完全闭源 |
| Murf.ai | 否 | -- | -- | 完全闭源 |

---

## 七、关键趋势与选型建议

### 行业趋势

1. **大模型驱动 TTS**：Gemini TTS、CosyVoice v3、Volcengine 大模型 TTS 等代表了上下文感知、情感自动适配的新方向
2. **延迟持续降低**：Murf Falcon (<55ms)、ElevenLabs Flash (75ms) 已接近实时交互要求
3. **MCP 生态快速成长**：ElevenLabs、MiniMax、Murf 等已推出官方 MCP Server，AI Agent 集成日益便捷
4. **开源追赶闭源**：Fish Audio S1 在 TTS-Arena 排名第一，开源方案品质已具备竞争力
5. **语音克隆门槛降低**：5-30 秒音频即可完成高保真克隆，成为标配能力
6. **安全与水印**：Resemble.ai 的 Perth 水印、Deepfake 检测代表了行业安全趋势

### 按场景选型推荐

| 场景 | 推荐工具 | 理由 |
|------|---------|------|
| **最高语音品质** | ElevenLabs / MiniMax Speech 2.6 | 独立盲测排名最高 |
| **最低延迟/实时对话** | Murf Falcon (<55ms) / ElevenLabs Flash (75ms) | 毫秒级响应 |
| **最低成本（商用 API）** | Edge TTS（免费） / CosyVoice ($7.15/1M) | 成本敏感场景 |
| **最低成本（自部署）** | ChatTTS / Bark / CosyVoice / XTTS | 完全免费开源 |
| **最多语言覆盖** | Resemble.ai (149+) / Azure TTS (140+) | 全球化覆盖 |
| **语音克隆** | ElevenLabs / Fish Audio / CosyVoice / Resemble.ai | 短音频高保真克隆 |
| **情感控制** | Fish Audio S1 / ElevenLabs / ChatTTS | 原生细粒度情感标记 |
| **有声书/长篇内容** | MiniMax (200K chars/batch) / Play.ht / ElevenLabs | 长文本优化 |
| **中文场景** | CosyVoice / 火山引擎 / ChatTTS / Fish Audio | 中文优化模型 |
| **完整 MCP 集成** | ElevenLabs / MiniMax / Murf | 官方 MCP Server |
| **安全/合规要求** | Resemble.ai | 内置水印 + Deepfake 检测 |
| **无需 API Key** | Edge TTS | 完全免费，无需注册 |

---

## 八、参考来源

- [ElevenLabs API Pricing](https://elevenlabs.io/pricing/api)
- [ElevenLabs Documentation](https://elevenlabs.io/docs/overview/capabilities/text-to-speech)
- [ElevenLabs MCP Server](https://github.com/elevenlabs/elevenlabs-mcp)
- [OpenAI TTS Pricing](https://platform.openai.com/docs/pricing)
- [OpenAI Text to Speech Guide](https://platform.openai.com/docs/guides/text-to-speech)
- [Azure Speech Service Pricing](https://azure.microsoft.com/en-us/pricing/details/speech/)
- [Azure TTS Overview](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech)
- [Google Cloud TTS Pricing](https://cloud.google.com/text-to-speech/pricing)
- [Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Fish Audio Official Site](https://fish.audio/)
- [Fish Speech GitHub](https://github.com/fishaudio/fish-speech)
- [ChatTTS GitHub](https://github.com/2noise/ChatTTS)
- [CosyVoice GitHub](https://github.com/FunAudioLLM/CosyVoice)
- [CosyVoice Alibaba Cloud Docs](https://www.alibabacloud.com/help/en/model-studio/text-to-speech)
- [MiniMax TTS API Docs](https://platform.minimax.io/docs/guides/speech-voice-clone)
- [MiniMax MCP Server](https://github.com/MiniMax-AI/MiniMax-MCP)
- [Bark GitHub](https://github.com/suno-ai/bark)
- [Coqui TTS (Idiap fork)](https://github.com/idiap/coqui-ai-TTS)
- [Edge TTS PyPI](https://pypi.org/project/edge-tts/)
- [Edge TTS Voices](https://tts.travisvn.com/)
- [Volcengine TTS](https://www.volcengine.com/product/tts)
- [Volcengine MCP Server](https://github.com/volcengine/mcp-server)
- [Resemble AI](https://www.resemble.ai/)
- [Resemble Chatterbox](https://github.com/resemble-ai/chatterbox)
- [Play.ht Docs](https://docs.play.ht/)
- [Murf AI API](https://murf.ai/api)
- [Murf MCP Server](https://github.com/murf-ai/murf-mcp)
- [Best TTS APIs 2026 - Speechmatics](https://www.speechmatics.com/company/articles-and-news/best-tts-apis-in-2025-top-12-text-to-speech-services-for-developers)
- [Best TTS APIs for Real-Time Voice Agents 2026 - Inworld](https://inworld.ai/resources/best-voice-ai-tts-apis-for-real-time-voice-agents-2026-benchmarks)
