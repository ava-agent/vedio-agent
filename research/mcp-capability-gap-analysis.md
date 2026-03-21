# MCP 能力缺口分析

> 调研时间：2026-03-16
> 参照：AdVideo Creator（45 工具 MCP）、Cliprise、MoneyPrinterTurbo 等最佳实践

---

## 一、参照案例：AdVideo Creator 的 15 步 Pipeline

一位开发者用 Claude + MCP 构建了完整的 AI 广告视频生成器，单条广告成本 $0.01-$0.15：

```
Brief → 模板选择 → 项目创建 → 脚本撰写
→ 脚本自评分（8.0/10 阈值）→ 图片生成（Gate 1）
→ 配音生成（Gate 2）→ 音乐生成（Gate 3）
→ 跨素材一致性检查（Gate 4）→ 视频合成（Gate 5）
→ 字幕添加 → 导出 → 交付
```

关键设计：
- 45 个工具 + 12 个资源 + 8 个提示词模板
- 5 个质量门控（CLIP 相似度、Whisper 转录对比、librosa BPM 分析等）
- 分层 Fallback：Replicate → HuggingFace → 本地 SDXL

---

## 二、能力矩阵对比

### ✅ 已有能力（你的 3 个 MCP）

| 能力 | MCP | Provider | 状态 |
|------|-----|----------|------|
| 文生图 | mcp-image | Gemini | ✅ |
| 文生视频 | mcp-video-gen | cogvideo / kling / minimax | ✅ |
| 文字转语音 | mcp-video-gen | minimax TTS | ✅ |
| AI 音乐生成 | mcp-video-gen | minimax Music | ✅ |
| 文/图生 3D | mcp-3d-gen | Tripo3D | ✅ |

### ❌ 缺失能力（完整流水线所需）

#### 🔴 P0 — 核心缺失（无法闭环）

| 缺失能力 | 说明 | 参考方案 | 建议 |
|----------|------|---------|------|
| **视频合成/编辑（FFmpeg）** | 将图片+视频+配音+BGM+字幕合成最终视频 | [Video Editor MCP](https://github.com/Kush36Agrawal/Video_Editor_MCP)、[mcp-ffmpeg](https://github.com/bitscorp-mcp/mcp-ffmpeg) | 接入现有 FFmpeg MCP 或自研 |
| **字幕生成与烧录** | AI 语音转文字 → 时间轴字幕 → 烧入视频 | Whisper + FFmpeg subtitle filter | FFmpeg MCP 中集成 |
| **图生视频（img2vid）** | 用 mcp-image 生成的图做参考帧输入视频生成 | 当前 mcp-video-gen 仅支持 text2vid | 补充 image_url 参数 |

#### 🟡 P1 — 质量提升（从"能用"到"好用"）

| 缺失能力 | 说明 | 参考方案 | 建议 |
|----------|------|---------|------|
| **图片超分/放大** | 生成图分辨率不够，需 2x-4x 放大 | Real-ESRGAN via Replicate、WaveSpeedAI | mcp-image 增加 upscale 工具 |
| **背景移除/替换** | 产品图抠图、换背景 | Clipdrop API、rembg | mcp-image 增加 remove_bg 工具 |
| **图片编辑（局部重绘）** | Inpainting / Outpainting | FLUX Fill、Stable Diffusion Inpaint | mcp-image 增加 edit_image 工具 |
| **质量评分/门控** | 自动评估生成质量，低于阈值自动重试 | CLIP similarity、Whisper 对比 | 可在 Claude 提示词层实现 |
| **多模型 Fallback** | 主 provider 失败时自动降级 | AdVideo Creator 的分层策略 | MCP 内增加 fallback 逻辑 |

#### 🟢 P2 — 效率倍增（从"好用"到"规模化"）

| 缺失能力 | 说明 | 参考方案 | 建议 |
|----------|------|---------|------|
| **批量生成** | 一次生成多张图/多条视频变体 | batch prompt + 并发调用 | MCP 增加 batch 接口 |
| **素材库检索** | 免费素材搜索（Pexels/Unsplash） | Pexels API（免费） | 新 MCP 或 mcp-image 集成 |
| **平台适配导出** | 按平台规格（抖音9:16、B站16:9、小红书1:1）批量导出 | FFmpeg 裁切 + 参数模板 | FFmpeg MCP 中实现 |
| **AI 脚本生成** | 结构化视频脚本（分镜、旁白、画面描述） | LLM prompt template | Claude 本身可做，需提示词模板 |
| **语音克隆** | 用几秒样本克隆特定人声 | ElevenLabs / Fish Audio | mcp-video-gen 增加 clone_voice |
| **音效生成** | 环境音、转场音效 | MMAudio、ElevenLabs SFX | mcp-video-gen 增加 generate_sfx |

#### 🔵 P3 — 差异化能力（竞争壁垒）

| 缺失能力 | 说明 | 参考方案 | 建议 |
|----------|------|---------|------|
| **角色一致性** | 多场景同一角色外观一致 | IP-Adapter / Character Reference | mcp-image 增加 character_ref |
| **视频超分** | AI 视频放大到 4K | Video upscaling models | mcp-video-gen 增加 upscale_video |
| **AI 字幕翻译** | 自动多语言字幕 | Whisper + LLM 翻译 | 可组合现有能力 |
| **内容安全检测** | NSFW 过滤、合规检查 | Google SafeSearch、CLIP 检测 | mcp-image 增加 safety_check |
| **3D → 视频** | 3D 模型渲染为视频 | Blender API、Three.js 渲染 | mcp-3d-gen 增加 render_video |

---

## 三、完整流水线目标架构

<p align="center">
  <img src="images/knowledge-flow-4-steps.png" alt="Knowledge Flow Pipeline" width="600">
</p>

```
用户意图（自然语言）
    │
    ▼
Claude 编排层（理解意图 → 规划步骤 → 调用工具）
    │
    ├── 📝 脚本生成 ─────── Claude 自身能力（需提示词模板）
    │
    ├── 🎨 mcp-image
    │     ├── generate_image ......... ✅ 已有
    │     ├── upscale_image .......... ❌ 缺失（P1）
    │     ├── remove_background ...... ❌ 缺失（P1）
    │     ├── edit_image (inpaint) ... ❌ 缺失（P1）
    │     └── search_stock ........... ❌ 缺失（P2）
    │
    ├── 🎬 mcp-video-gen
    │     ├── generate_video (t2v) ... ✅ 已有
    │     ├── image_to_video (i2v) ... ❌ 缺失（P0）
    │     ├── generate_speech ........ ✅ 已有
    │     ├── generate_music ......... ✅ 已有
    │     ├── generate_sfx ........... ❌ 缺失（P2）
    │     ├── clone_voice ............ ❌ 缺失（P2）
    │     └── upscale_video .......... ❌ 缺失（P3）
    │
    ├── 🧊 mcp-3d-gen
    │     ├── generate_3d ............ ✅ 已有
    │     └── render_3d_to_video ..... ❌ 缺失（P3）
    │
    ├── 🎞️ mcp-ffmpeg（新增）
    │     ├── compose_video .......... ❌ 缺失（P0）合成图片+视频+音频
    │     ├── add_subtitles .......... ❌ 缺失（P0）字幕烧录
    │     ├── trim_clip .............. ❌ 缺失（P1）裁切片段
    │     ├── concat_clips ........... ❌ 缺失（P1）拼接片段
    │     ├── add_transition ......... ❌ 缺失（P2）转场效果
    │     └── export_multi_format .... ❌ 缺失（P2）多平台导出
    │
    └── 📊 质量门控 ─────── Claude 提示词层 + CLIP/Whisper
```

---

## 四、推荐实施路径

### Phase 1：闭环（1-2 周）
1. **接入 FFmpeg MCP** — 用现有开源 [Video Editor MCP](https://github.com/Kush36Agrawal/Video_Editor_MCP) 或 [mcp-ffmpeg](https://github.com/bitscorp-mcp/mcp-ffmpeg)
2. **mcp-video-gen 补充 img2vid** — 让图片→视频链路打通

### Phase 2：质量（2-4 周）
3. **mcp-image 增加 upscale** — 接入 Real-ESRGAN / Replicate
4. **mcp-image 增加 remove_bg** — 接入 rembg 或 Clipdrop
5. **多 provider fallback 机制** — 主 provider 超时/失败自动切换

### Phase 3：规模化（4-8 周）
6. **批量生成接口**
7. **素材库检索（Pexels）**
8. **语音克隆 + 音效生成**
9. **多平台格式导出**

---

## 参考资料

- [AdVideo Creator Architecture (DEV)](https://dev.to/qays_kadhim_c3fea1c94957f/i-built-an-ai-video-ad-generator-with-claude-mcp-heres-the-architecture-1kei)
- [Video Editor FFmpeg MCP](https://github.com/Kush36Agrawal/Video_Editor_MCP)
- [mcp-ffmpeg (BitsCorp)](https://github.com/bitscorp-mcp/mcp-ffmpeg)
- [video-audio-mcp (FFmpeg)](https://github.com/misbahsy/video-audio-mcp)
- [8 MCP Servers for Content Creators (Snyk)](https://snyk.io/articles/8-ai-mcp-servers-speeding-up-content-creator-workflows/)
- [AI Video Pipeline 1000+ Clips (Joyspace)](https://joyspace.ai/ai-video-production-pipeline-1000-clips-monthly-2026)
- [AI Image Upscaler APIs 2026 (LetsEnhance)](https://letsenhance.io/blog/all/best-upscaler-apis/)
- [Replicate Super Resolution](https://replicate.com/collections/super-resolution)
- [Epidemic Sound MCP Server](https://www.epidemicsound.com/blog/mcp-server/)
- [MCP Ecosystem (awesome-mcp-servers)](https://github.com/wong2/awesome-mcp-servers)
