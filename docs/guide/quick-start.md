---
prev:
  text: '首页'
  link: '/'
next:
  text: '开源项目推荐'
  link: '/guide/open-source-projects'
---

# 快速开始

> 使用现有开源工具，10 分钟内生成你的第一个 AI 视频

## 方案一：MoneyPrinterTurbo（推荐）

**最适合**: 一键生成 YouTube Shorts / TikTok 视频

```bash
# 克隆项目
git clone https://github.com/harry0703/MoneyPrinterTurbo
cd MoneyPrinterTurbo

# 安装依赖
pip install -r requirements.txt

# 复制配置文件
cp .env.example .env
# 编辑 .env 填写 API keys

# 启动 Web UI
python webui.py
```

**功能**:
- 一键生成完整视频（脚本 + 配音 + 画面 + 字幕）
- 支持批量生成
- 中文支持好
- Web UI 界面

## 方案二：ShortGPT

**最适合**: AI 框架，可编程自动化

```bash
git clone https://github.com/RayVentura/ShortGPT
cd ShortGPT
pip install -r requirements.txt
```

**功能**:
- 模块化设计
- 支持多种 LLM
- 可扩展性强

## 方案三：MCP Server 集成

**最适合**: 在 Claude Code 中直接调用 AI 能力

### MiniMax MCP（推荐）

```bash
# 安装
claude mcp add minimax npx -y @minimax-ai/mcp

# 设置环境变量
export MINIMAX_API_KEY=your_key
export MINIMAX_GROUP_ID=your_group_id

# 使用
claude "帮我生成一张图片，内容是一只可爱的猫咪"
claude "帮我生成一段语音，内容是你好世界"
claude "帮我生成一段5秒视频，内容是日落"
```

### 安装多个 MCP Servers

```bash
# 图片生成
claude mcp add gemini-image npx -y gemini-imagen4

# 语音合成
claude mcp add elevenlabs npx -y elevenlabs-mcp

# 视频生成
claude mcp add runway npx -y @anthropic/mcp-runway
```

## 方案四：数字人制作

### 使用 LivePortrait + MuseTalk（开源）

```bash
# 1. 部署 CosyVoice（语音）
git clone https://github.com/FunAudioLLM/CosyVoice
cd CosyVoice && pip install -r requirements.txt
python webui.py

# 2. 部署 LivePortrait（动作驱动）
git clone https://github.com/KlingAIResearch/LivePortrait
cd LivePortrait && pip install -r requirements.txt
python inference.py --source_image face.jpg --driving_video driving.mp4

# 3. 部署 MuseTalk（唇形同步）
git clone https://github.com/TMElyralab/MuseTalk
cd MuseTalk && pip install -r requirements.txt
python -m scripts.inference --video face.mp4 --audio speech.wav
```

### 使用 HeyGen（商业方案）

```bash
# MCP 集成
claude mcp add heygen npx -y @heygen/mcp-server
export HEYGEN_API_KEY=your_key

# 使用
claude "帮我创建一个数字人视频，形象是30岁商务男性，台词是..."
```

---

*更多方案*: [开源项目推荐](/guide/open-source-projects) · [工作流指南](/workflows/marketing-video)*
