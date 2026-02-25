---
prev:
  text: '数字人制作'
  link: '/workflows/digital-human'
next:
  text: '图文内容创作'
  link: '/workflows/image-content'
---

# AI 营销视频全流程

> 从脚本到成片，5 步完成一条专业营销视频

<WorkflowStepper :steps="['脚本撰写', '分镜配图', '配音生成', '数字人出镜', '视频合成']" />

<CostEstimate :items="[
  { step: '脚本撰写', tool: 'Claude / GPT-4o', cost: '~$0.01' },
  { step: '分镜配图 (5张)', tool: 'FLUX.2 / Imagen 4', cost: '~$0.07-$0.10' },
  { step: '配音 (60秒)', tool: 'ElevenLabs / OpenAI TTS', cost: '~$0.10-$0.50' },
  { step: '数字人出镜 (60秒)', tool: 'HeyGen', cost: '~$1.00' },
  { step: '视频片段 (10秒)', tool: 'Runway Gen-4', cost: '~$0.50' },
]" total="~$1.68-$2.11" />

---

## Step 1: 脚本撰写

<PromptCard
  title="营销视频脚本生成器"
  platform="Claude / ChatGPT / Gemini"
  :params="['product_name', 'target_audience', 'video_duration', 'key_selling_points', 'tone']"
  template="你是一位资深的视频营销编剧。请为以下产品撰写一条{{video_duration}}秒的营销视频脚本。
产品名称：{{product_name}}
目标受众：{{target_audience}}
核心卖点：{{key_selling_points}}
语气风格：{{tone}}
请按以下格式输出：
| 时间码 | 画面描述 | 旁白/字幕 | 备注 |
|--------|---------|----------|------|
要求：
1. 前3秒必须有强力 hook 抓住注意力
2. 中间部分展示痛点+解决方案
3. 最后加入明确的 CTA（行动号召）
4. 每个镜头的画面描述要足够具体，便于后续 AI 生图"
  mcp-command="claude '为{{product_name}}写一条营销视频脚本'"
  cost-estimate="~$0.01/次"
/>

### 平台兼容性

| 平台 | 推荐模型 | 特点 |
|------|---------|------|
| Claude | claude-sonnet-4 | 结构化输出最好，遵循表格格式 |
| ChatGPT | gpt-4o | 创意写作强，脚本更有感染力 |
| Gemini | gemini-2.5-flash | 速度快，适合快速迭代 |

---

## Step 2: 分镜配图

<PromptCard
  title="营销视频分镜图生成"
  platform="FLUX.2 / Imagen 4 / GPT-Image-1"
  :params="['scene_description', 'style', 'aspect_ratio']"
  template="{{scene_description}}
Style: {{style}}, professional marketing photo, high quality, sharp focus
Aspect ratio: {{aspect_ratio}}
No text, no watermark, clean composition"
  mcp-command="claude mcp add gemini-image npx -y gemini-imagen4 && 使用 gemini-image 生成图片"
  cost-estimate="~$0.02/张"
/>

### 各平台图片生成对比

| 工具 | 命令 | 价格 | 最适合 |
|------|------|------|--------|
| Imagen 4 | `claude mcp add gemini-image npx -y gemini-imagen4` | $0.02/张 | 写实照片 |
| GPT-Image-1 | `claude mcp add openai-image npx -y imagegen-mcp` | $0.04/张 | 指令遵循精准 |
| FLUX.2 | `claude mcp add flux npx -y image-generation-mcp-server` | $0.014/张 | 性价比最高 |
| Ideogram 3.0 | `claude mcp add ideogram npx -y ideogram-mcp-server` | $0.02/张 | 带文字的图片 |

<GeneratePanel type="image" />

---

## Step 3: 配音生成

<PromptCard
  title="专业配音文稿"
  platform="ElevenLabs / OpenAI TTS / Fish Audio"
  :params="['narration_text', 'voice_style', 'language']"
  template="{{narration_text}}
[语音风格: {{voice_style}}]
[语言: {{language}}]"
  cost-estimate="~$0.10-$0.50/分钟"
/>

### 语音合成工具对比

| 工具 | MCP 命令 | 延迟 | 最适合 |
|------|---------|------|--------|
| ElevenLabs | `claude mcp add elevenlabs npx -y elevenlabs-mcp` | ~75ms | 品质最高，声音克隆 |
| OpenAI TTS | `claude mcp add openai-tts npx -y tts-mcp` | ~500ms | 简单好用 |
| MiniMax TTS | `claude mcp add minimax-tts npx -y @minimax-ai/mcp` | ~150ms | 中文效果佳 |
| Fish Audio | `claude mcp add fish-audio npx -y mcp-fish-audio-server` | ~300ms | 开源，性价比高 |

<GeneratePanel type="tts" />

---

## Step 4: 数字人出镜

<PromptCard
  title="数字人视频脚本"
  platform="HeyGen"
  :params="['script_text', 'avatar_style', 'background']"
  template="请使用以下文本生成数字人讲解视频：
台词：{{script_text}}
人物风格：{{avatar_style}}
背景：{{background}}
要求：
- 表情自然，口型准确
- 手势配合内容
- 1080p 输出"
  mcp-command="claude mcp add heygen npx -y @heygen/mcp-server && 使用 heygen 创建数字人视频"
  cost-estimate="~$1.00/分钟"
/>

> HeyGen 是目前**唯一提供官方 MCP Server 的数字人工具**，可直接在 Claude Code 中调用

<GeneratePanel type="avatar" />

---

## Step 5: 视频合成

<PromptCard
  title="视频片段生成"
  platform="Runway Gen-4 / Kling / Luma"
  :params="['video_description', 'duration', 'camera_movement']"
  template="Generate a {{duration}}-second video:
{{video_description}}
Camera: {{camera_movement}}
Style: cinematic, professional, high quality
Resolution: 1080p"
  mcp-command="claude mcp add runway npx -y @anthropic/mcp-runway && 使用 runway 生成视频"
  cost-estimate="~$0.50/10秒"
/>

### 视频生成对比

| 工具 | 最长时长 | 价格 | 最适合 |
|------|---------|------|--------|
| Runway Gen-4 | 10秒 | ~$0.50/10s | 质量最高 |
| Kling 2.0 | 10秒 | ~$0.14/10s | 性价比高 |
| Luma Dream Machine | 5秒 | ~$0.30/5s | 创意效果 |
| Seedance 1.0 | 10秒 | 按量付费 | 动作流畅 |

<GeneratePanel type="video" />

---

## 完整 Claude Code 一键流程

```bash
# 1. 安装所需 MCP 工具
claude mcp add gemini-image npx -y gemini-imagen4
claude mcp add elevenlabs npx -y elevenlabs-mcp
claude mcp add heygen npx -y @heygen/mcp-server
claude mcp add runway npx -y @anthropic/mcp-runway

# 2. 设置 API Key
export GEMINI_API_KEY=your_key
export ELEVENLABS_API_KEY=your_key
export HEYGEN_API_KEY=your_key
export RUNWAY_API_KEY=your_key

# 3. 让 Claude 帮你完成全流程
claude "帮我制作一条60秒的营销视频，产品是XX，
       请依次生成脚本、配图、配音和数字人视频"
```

---

*更多工具信息：[视频工具](/tools/video) · [图片工具](/tools/image) · [语音工具](/tools/tts) · [数字人](/tools/virtual-human)*
