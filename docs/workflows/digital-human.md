---
prev:
  text: '音频内容制作'
  link: '/workflows/audio-production'
next:
  text: '营销视频制作'
  link: '/workflows/marketing-video'
---

# AI 数字人制作

> 从形象设计到实时互动，完整的数字人制作流程

<WorkflowStepper :steps="['形象设计', '动作驱动', '唇形同步', '实时互动']" />

<CostEstimate :items="[
  { step: '形象设计', tool: 'GPT-Image-1 / Midjourney', cost: '~$0.04' },
  { step: '动作驱动', tool: 'LivePortrait / Wan 2.2', cost: '开源免费' },
  { step: '唇形同步', tool: 'MuseTalk / LatentSync', cost: '开源免费' },
  { step: '实时互动 (10分钟)', tool: 'HeyGen Streaming', cost: '~$0.50' },
]" total="~$0.54 (含开源方案)" />

---

## Step 1: 数字人形象设计

<PromptCard
  title="数字人形象生成"
  platform="GPT-Image-1 / Midjourney / FLUX.2"
  :params="['character_description', 'gender', 'age_range', 'attire', 'background']"
  template="Portrait photo of a {{gender}} digital human avatar, {{age_range}} years old.
Appearance: {{character_description}}
Attire: {{attire}}
Background: {{background}}
Requirements:
- Front-facing, neutral expression, looking at camera
- High resolution, studio lighting
- Clean background for easy extraction
- Suitable for video avatar use
- Photorealistic, not cartoon
- Head and shoulders visible"
  cost-estimate="~$0.04/张"
/>

### 形象设计技巧

| 用途 | 推荐风格 | 推荐工具 |
|------|---------|---------|
| 企业代言人 | 商务正装，正面照 | GPT-Image-1 |
| 教育讲师 | 休闲亲和，微笑 | Midjourney |
| 虚拟主播 | 二次元/3D 风格 | FLUX.2 |
| 客服形象 | 职业装，友善表情 | Imagen 4 |

> **关键**: 生成的头像需要**正面朝向镜头**、**肩部以上**、**清晰的面部特征**，才能被后续的动作驱动和唇形同步工具正确处理

<GeneratePanel type="image" />

---

## Step 2: 动作驱动

<PromptCard
  title="视频驱动/表情迁移"
  platform="LivePortrait / Wan 2.2 / EMO"
  :params="['source_image', 'driving_video', 'motion_type']"
  template="使用 {{motion_type}} 将驱动视频中的表情和动作迁移到源图像上。
源图像：{{source_image}}（Step 1 生成的数字人头像）
驱动视频：{{driving_video}}（真人录制的表情/动作视频）
参数设置：
- 表情强度：0.8（推荐值）
- 头部旋转范围：适中
- 输出帧率：25fps
- 输出分辨率：512x512 或更高"
  cost-estimate="开源免费"
/>

### 动作驱动工具对比

| 工具 | 驱动方式 | 开源 | 实时性 | 最适合 |
|------|---------|------|--------|--------|
| **LivePortrait** | 视频驱动 | MIT | 12.8ms/帧 | 实时场景 |
| **Wan 2.2** | 音频+文本 | Apache 2.0 | 离线 | 全身动画 |
| **EMO** | 音频驱动 | 研究用 | 离线 | 情感表达 |
| **EchoMimic** | 音频驱动 | Apache 2.0 | 离线 | 半身动画 |
| **Hallo2** | 音频驱动 | MIT | 离线 | 4K 高清 |

```bash
# LivePortrait 本地部署（推荐）
git clone https://github.com/KwaiVGI/LivePortrait
cd LivePortrait
pip install -r requirements.txt
python inference.py --source_image face.jpg --driving_video driving.mp4
```

---

## Step 3: 唇形同步

<PromptCard
  title="音频驱动唇形同步"
  platform="MuseTalk / LatentSync / SadTalker"
  :params="['face_video', 'audio_file', 'sync_quality']"
  template="将音频文件与人脸视频进行唇形同步。
人脸视频：{{face_video}}（Step 2 输出的动作驱动视频）
音频文件：{{audio_file}}（配音音频，来自语音工作流）
同步质量：{{sync_quality}}
处理参数：
- 唇形精度：高
- 面部保持：保留原始表情
- 输出格式：MP4
- 音视频对齐：自动"
  cost-estimate="开源免费"
/>

### 唇形同步工具对比

| 工具 | 精度 | 速度 | 开源 | 推荐场景 |
|------|------|------|------|---------|
| **MuseTalk** | ★★★★ | 实时 (30fps+) | MIT | 实时直播 |
| **LatentSync** | ★★★★★ | 离线 | Apache 2.0 | 高精度后期 |
| **SadTalker** | ★★★ | 较快 | Apache 2.0 | 简单场景 |
| **V-Express** | ★★★★ | 离线 | 研究用 | 多条件控制 |

```bash
# MuseTalk 部署（实时唇形同步）
git clone https://github.com/TMElyralab/MuseTalk
cd MuseTalk
pip install -r requirements.txt
python -m scripts.inference --video face.mp4 --audio speech.wav
```

---

## Step 4: 实时互动

### 商业方案

<PromptCard
  title="HeyGen 实时数字人"
  platform="HeyGen Streaming API"
  :params="['avatar_id', 'initial_script', 'interaction_mode']"
  template="创建一个实时互动数字人会话：
数字人 ID：{{avatar_id}}
开场白：{{initial_script}}
交互模式：{{interaction_mode}}
配置：
- 延迟要求：小于1秒
- 视频质量：720p
- 语言：中文
- 会话时长：最长 30 分钟"
  mcp-command="claude mcp add heygen npx -y @heygen/mcp-server && 创建实时数字人会话"
  cost-estimate="~$0.05/分钟"
/>

### 实时互动方案对比

| 方案 | 延迟 | 成本 | 部署方式 | 推荐指数 |
|------|------|------|---------|---------|
| HeyGen Streaming | <1s | $0.05/分钟 | SaaS API | ★★★★★ |
| Hedra Live | <2s | $0.05/分钟 | SaaS | ★★★★ |
| LivePortrait + MuseTalk | <1s | 免费 (GPU) | 自部署 | ★★★★ |
| D-ID Streaming | <2s | $0.08/分钟 | SaaS API | ★★★ |

### 开源自部署方案

```bash
# 全链路开源方案：LivePortrait + MuseTalk + CosyVoice
# 要求：NVIDIA GPU (RTX 3060+)

# 1. 部署 CosyVoice（语音合成）
git clone https://github.com/FunAudioLLM/CosyVoice
cd CosyVoice && pip install -r requirements.txt

# 2. 部署 LivePortrait（动作驱动）
git clone https://github.com/KwaiVGI/LivePortrait

# 3. 部署 MuseTalk（唇形同步）
git clone https://github.com/TMElyralab/MuseTalk

# 4. 串联三个模块实现实时数字人
# 输入：文本/语音 → CosyVoice → MuseTalk → 视频流输出
```

---

## 完整 Claude Code 流程

```bash
# 商业方案（最简单）
claude mcp add heygen npx -y @heygen/mcp-server
export HEYGEN_API_KEY=your_key

claude "帮我创建一个数字人视频，
       形象要求：30岁商务男性，穿西装
       台词：[你的文案]"
```

---

*更多工具信息：[虚拟人工具](/tools/virtual-human) · [语音工具](/tools/tts) · [MCP 集成](/guide/mcp-integration)*
