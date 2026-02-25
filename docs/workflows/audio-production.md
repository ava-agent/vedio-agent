---
prev:
  text: '图文内容创作'
  link: '/workflows/image-content'
next:
  text: '数字人制作'
  link: '/workflows/digital-human'
---

# AI 有声内容制作

> 从文稿到成品音频，覆盖播客、有声书、课程配音、多角色对话

<WorkflowStepper :steps="['稿件撰写', '语音合成', '多角色配音', 'BGM 配乐']" />

<CostEstimate :items="[
  { step: '稿件撰写 (1000字)', tool: 'Claude / GPT-4o', cost: '~$0.01' },
  { step: '语音合成 (5分钟)', tool: 'ElevenLabs / Fish Audio', cost: '~$0.30-$1.50' },
  { step: '多角色配音', tool: 'MiniMax / OpenAI TTS', cost: '~$0.20-$0.50' },
  { step: 'BGM 生成', tool: 'Suno / Udio', cost: '~$0.10' },
]" total="~$0.61-$2.11" />

---

## Step 1: 稿件撰写

<PromptCard
  title="播客/有声书脚本生成器"
  platform="Claude / ChatGPT / Gemini"
  :params="['topic', 'content_type', 'duration_minutes', 'audience', 'num_speakers']"
  template="你是一位专业的音频内容编剧。请撰写一份{{content_type}}脚本。
主题：{{topic}}
时长：约{{duration_minutes}}分钟（按每分钟 150 字计算）
受众：{{audience}}
角色数量：{{num_speakers}}人
格式要求：
- 如果是单人讲述，用【旁白】标注
- 如果是多人对话，用【角色A】【角色B】标注
- 标注语气提示，如（激动地）（停顿）（轻声）
- 标注适合插入 BGM 的时间点，如【BGM：轻快节奏】
- 避免过长的单句，便于 TTS 断句
示例格式：
【主持人】（热情地）大家好！欢迎来到今天的节目...
【BGM：轻快开场音乐】
【嘉宾】谢谢邀请！今天我想跟大家分享..."
  mcp-command="claude '写一份关于{{topic}}的{{content_type}}脚本，{{duration_minutes}}分钟'"
  cost-estimate="~$0.01"
/>

### 内容类型对照

| 类型 | 字数参考 | 角色数 | 风格 |
|------|---------|--------|------|
| 知识播客 | 1500字/10分钟 | 1-2人 | 专业、有深度 |
| 故事播客 | 2000字/10分钟 | 2-4人 | 生动、有画面感 |
| 有声书 | 3000字/20分钟 | 1人+角色 | 沉浸、文学性 |
| 课程讲解 | 1200字/10分钟 | 1人 | 清晰、有逻辑 |

---

## Step 2: 单人语音合成

<PromptCard
  title="高品质语音合成"
  platform="ElevenLabs / OpenAI TTS / Fish Audio"
  :params="['text_content', 'voice_gender', 'speaking_speed', 'emotion']"
  template="{{text_content}}
[语音设置]
- 性别：{{voice_gender}}
- 语速：{{speaking_speed}}
- 情感：{{emotion}}
- 输出格式：MP3 / WAV"
  cost-estimate="~$0.06-$0.30/分钟"
/>

### TTS 工具全面对比

| 工具 | MCP 命令 | 中文效果 | 英文效果 | 延迟 | 价格 |
|------|---------|---------|---------|------|------|
| ElevenLabs | `claude mcp add elevenlabs npx -y elevenlabs-mcp` | ★★★★ | ★★★★★ | 75ms | $0.30/分钟 |
| Fish Audio | `claude mcp add fish-audio npx -y mcp-fish-audio-server` | ★★★★★ | ★★★★ | 300ms | 开源免费 |
| MiniMax TTS | `claude mcp add minimax-tts npx -y @minimax-ai/mcp` | ★★★★★ | ★★★ | 150ms | ¥0.1/千字符 |
| OpenAI TTS | `claude mcp add openai-tts npx -y tts-mcp` | ★★★ | ★★★★ | 500ms | $0.015/千字符 |
| CosyVoice | `claude mcp add cosyvoice npx -y cosyvoice-mcp` | ★★★★★ | ★★★ | 200ms | 开源免费 |
| Edge TTS | 无需安装 | ★★★ | ★★★ | 100ms | **完全免费** |

> **零成本方案**: Edge TTS 完全免费，支持 322 种语音，适合批量生成或预算有限的场景

<GeneratePanel type="tts" />

---

## Step 3: 多角色配音

<PromptCard
  title="多角色对话配音方案"
  platform="ElevenLabs / MiniMax TTS"
  :params="['dialog_script', 'role_a_voice', 'role_b_voice']"
  template="请为以下对话生成多角色配音：
{{dialog_script}}
角色 A 声线：{{role_a_voice}}
角色 B 声线：{{role_b_voice}}
要求：
- 每个角色使用不同的音色
- 对话之间保留 0.3 秒间隔
- 语气符合角色特征"
  cost-estimate="~$0.20-$0.50/分钟"
/>

### 多角色配音实现方案

| 方案 | 工具组合 | 优点 | 缺点 |
|------|---------|------|------|
| 方案一 | ElevenLabs 多声线 | 声音最自然 | 成本较高 |
| 方案二 | MiniMax TTS 多角色 | 中文效果好，API 简单 | 英文一般 |
| 方案三 | OpenAI TTS 换 voice | 6 种预设声线 | 声线有限 |
| 方案四 | Fish Audio 声音克隆 | 开源免费 | 需要本地部署 |

---

## Step 4: BGM 配乐

<PromptCard
  title="背景音乐生成提示词"
  platform="Suno / Udio"
  :params="['music_mood', 'genre', 'duration_seconds', 'instruments']"
  template="Create a {{duration_seconds}}-second background music track.
Mood: {{music_mood}}
Genre: {{genre}}
Instruments: {{instruments}}
Purpose: background music for podcast/video, not overpowering
Volume: suitable for voice-over, mild and ambient"
  cost-estimate="~$0.10/首"
/>

---

## 完整 Claude Code 流程

```bash
# 安装语音工具
claude mcp add elevenlabs npx -y elevenlabs-mcp
claude mcp add minimax-tts npx -y @minimax-ai/mcp

# 设置 API Key
export ELEVENLABS_API_KEY=your_key
export MINIMAX_API_KEY=your_key

# 一键生成
claude "帮我制作一期10分钟的知识播客，主题是 [你的主题]，
       请先写脚本，然后为主持人和嘉宾分别配音"
```

---

*更多工具信息：[语音工具](/tools/tts) · [对比总览](/guide/comparison) · [MCP 集成](/guide/mcp-integration)*
