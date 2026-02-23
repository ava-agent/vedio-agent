---
prev:
  text: '工具对比总览'
  link: '/guide/comparison'
next:
  text: 'AI 视频生成工具'
  link: '/tools/video'
---

# MCP 集成指南

> 将 AI 多媒体工具集成到 Claude Code / Claude Desktop 的完整指南

---

## 什么是 MCP?

**MCP (Model Context Protocol)** 是 Anthropic 推出的开放标准协议，允许 AI 应用（如 Claude Desktop、Claude Code、Cursor）通过标准化接口与外部工具交互。

通过 MCP Server，你可以让 Claude 直接调用图片生成、语音合成、数字人创建等 AI 工具。

---

## 快速开始

### 安装 MCP Server

在 Claude Code 中使用 `claude mcp add` 命令添加 MCP Server：

```bash
# 语法
claude mcp add <server-name> <command> [args...]
```

---

## 图片生成 MCP Server

### Recraft v3 (官方)

```bash
# 安装
npm install -g @recraft-ai/mcp-recraft-server

# 添加到 Claude Code
claude mcp add recraft npx @recraft-ai/mcp-recraft-server

# 需要设置环境变量
export RECRAFT_API_TOKEN=your_api_token
```

**获取 API Key**: [recraft.ai](https://www.recraft.ai/) 注册后获取

### Gemini 图片生成 (Imagen 4 / Nano Banana)

```bash
# 方案一: gemini-imagen4
claude mcp add gemini-imagen npx -y gemini-imagen4

# 方案二: 通用 Gemini 图片 MCP
claude mcp add gemini-image npx -y mcp-server-gemini-image-generator

# 需要设置环境变量
export GEMINI_API_KEY=your_api_key
```

**获取 API Key**: [Google AI Studio](https://aistudio.google.com/) (免费)

### GPT-Image-1 / DALL-E

```bash
claude mcp add openai-image npx -y imagegen-mcp

# 需要设置环境变量
export OPENAI_API_KEY=your_api_key
```

**获取 API Key**: [OpenAI Platform](https://platform.openai.com/api-keys)

### Stability AI (SD 3.5 / SDXL)

```bash
claude mcp add stability npx -y mcp-server-stability-ai

# 需要设置环境变量
export STABILITY_API_KEY=your_api_key
```

### FLUX.2

```bash
claude mcp add flux npx -y image-generation-mcp-server

# 需要设置环境变量
export BFL_API_KEY=your_api_key
```

### Ideogram 3.0

```bash
claude mcp add ideogram npx -y ideogram-mcp-server

# 需要设置环境变量
export IDEOGRAM_API_KEY=your_api_key
```

### SeedDream (字节跳动)

```bash
claude mcp add seedream npx -y seedream-v4-fal-mcp-server

# 需要设置环境变量
export FAL_KEY=your_fal_key
```

---

## 视频生成 MCP Server

### Runway Gen-4

```bash
claude mcp add runway npx -y @anthropic/mcp-runway

# 需要设置环境变量
export RUNWAY_API_KEY=your_api_key
```

### Seedance (字节跳动)

```bash
# 通过 xskill.ai MCP 平台
claude mcp add seedance npx -y @xskill/mcp-seedance

# 需要设置环境变量
export XSKILL_API_KEY=your_api_key
```

### Kling (快手)

```bash
claude mcp add kling npx -y kling-ai-mcp-server

# 需要设置环境变量
export KLING_API_KEY=your_api_key
```

### Luma Dream Machine

```bash
claude mcp add luma npx -y luma-mcp-server

# 需要设置环境变量
export LUMA_API_KEY=your_api_key
```

---

## 语音合成 MCP Server

### ElevenLabs (官方)

```bash
# 官方 MCP Server
claude mcp add elevenlabs npx -y elevenlabs-mcp

# 需要设置环境变量
export ELEVENLABS_API_KEY=your_api_key
```

**获取 API Key**: [ElevenLabs](https://elevenlabs.io/) 注册 (有免费额度)

### MiniMax TTS (官方)

```bash
# Python 版
claude mcp add minimax-tts uvx minimax-mcp

# JavaScript 版
claude mcp add minimax-tts npx -y @minimax-ai/mcp

# 需要设置环境变量
export MINIMAX_API_KEY=your_api_key
```

### Murf.ai (官方)

```bash
claude mcp add murf npx -y murf-mcp

# 需要设置环境变量
export MURF_API_KEY=your_api_key
```

### OpenAI TTS

```bash
claude mcp add openai-tts npx -y tts-mcp

# 需要设置环境变量
export OPENAI_API_KEY=your_api_key
```

### Fish Audio

```bash
claude mcp add fish-audio npx -y mcp-fish-audio-server

# 需要设置环境变量
export FISH_AUDIO_API_KEY=your_api_key
```

### CosyVoice (阿里)

```bash
claude mcp add cosyvoice npx -y cosyvoice-mcp

# 需要设置环境变量
export DASHSCOPE_API_KEY=your_api_key
```

### 火山引擎 TTS

```bash
claude mcp add volcengine-tts npx -y @volcengine/mcp-server

# 需要设置环境变量
export VOLCENGINE_ACCESS_KEY=your_access_key
export VOLCENGINE_SECRET_KEY=your_secret_key
```

---

## 数字人 MCP Server

### HeyGen (官方)

```bash
# HeyGen 官方 MCP Server
claude mcp add heygen npx -y @heygen/mcp-server

# 需要设置环境变量
export HEYGEN_API_KEY=your_api_key
```

**获取 API Key**: [HeyGen](https://www.heygen.com/) 注册 (有免费额度)

> HeyGen 是目前**唯一提供官方原生 MCP Server 的数字人工具**

---

## 通用配置

### Claude Desktop 配置文件

如果使用 Claude Desktop，编辑配置文件 `~/.claude/claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "recraft": {
      "command": "npx",
      "args": ["@recraft-ai/mcp-recraft-server"],
      "env": {
        "RECRAFT_API_TOKEN": "your_token"
      }
    },
    "elevenlabs": {
      "command": "npx",
      "args": ["elevenlabs-mcp"],
      "env": {
        "ELEVENLABS_API_KEY": "your_key"
      }
    },
    "heygen": {
      "command": "npx",
      "args": ["@heygen/mcp-server"],
      "env": {
        "HEYGEN_API_KEY": "your_key"
      }
    },
    "gemini-image": {
      "command": "npx",
      "args": ["mcp-server-gemini-image-generator"],
      "env": {
        "GEMINI_API_KEY": "your_key"
      }
    }
  }
}
```

### 环境变量管理

建议使用 `.env` 文件管理 API Key：

```bash
# .env 文件（加入 .gitignore）
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
ELEVENLABS_API_KEY=your_elevenlabs_key
HEYGEN_API_KEY=your_heygen_key
RECRAFT_API_TOKEN=your_recraft_token
```

---

## API Key 获取渠道

| 工具 | 获取方式 | 免费额度 |
|------|---------|---------|
| Google (Gemini/Imagen) | [Google AI Studio](https://aistudio.google.com/) | 有免费层 |
| OpenAI | [OpenAI Platform](https://platform.openai.com/) | 新用户赠金 |
| ElevenLabs | [elevenlabs.io](https://elevenlabs.io/) | 10K credits/月 |
| HeyGen | [heygen.com](https://www.heygen.com/) | 10 credits/月 |
| Recraft | [recraft.ai](https://www.recraft.ai/) | 有免费层 |
| MiniMax | [platform.minimax.io](https://platform.minimax.io/) | 有试用额度 |
| Murf.ai | [murf.ai](https://murf.ai/) | 有试用 |
| Stability AI | [platform.stability.ai](https://platform.stability.ai/) | 有免费额度 |
| Black Forest Labs | [bfl.ai](https://bfl.ai/) | 有免费层 |
| Ideogram | [ideogram.ai](https://ideogram.ai/) | Free 计划 |
| 阿里云 (CosyVoice) | [dashscope.console.aliyun.com](https://dashscope.console.aliyun.com/) | 有免费额度 |
| 火山引擎 | [volcengine.com](https://www.volcengine.com/) | 有试用额度 |

---

## 最佳实践

### 推荐组合方案

**方案一：全能型（商业）**
```bash
claude mcp add gemini-image npx -y mcp-server-gemini-image-generator  # 图片
claude mcp add elevenlabs npx -y elevenlabs-mcp                        # 语音
claude mcp add heygen npx -y @heygen/mcp-server                        # 数字人
```

**方案二：性价比型**
```bash
claude mcp add gemini-image npx -y gemini-imagen4        # 图片 ($0.02/张)
claude mcp add openai-tts npx -y tts-mcp                 # 语音
claude mcp add recraft npx -y @recraft-ai/mcp-recraft-server  # 矢量图
```

**方案三：多模型图片**
```bash
claude mcp add gemini-image npx -y gemini-imagen4         # Google
claude mcp add openai-image npx -y imagegen-mcp           # OpenAI
claude mcp add stability npx -y mcp-server-stability-ai   # SD
claude mcp add flux npx -y image-generation-mcp-server    # FLUX
claude mcp add recraft npx -y @recraft-ai/mcp-recraft-server  # Recraft
```

---

*更多工具详细信息请参阅：[视频](/tools/video) · [图片](/tools/image) · [语音](/tools/tts) · [虚拟人](/tools/virtual-human)*
