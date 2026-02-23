# AI 视频生成工具全面调研报告 (2025-2026)

> 调研日期：2026-02-21

---

## 一、总览对比表

| 工具 | 开发商 | 最新版本 | 最大分辨率 | 最大时长 | 公开 API | MCP Server | 开源 |
|------|--------|----------|-----------|---------|---------|------------|------|
| **Seedance** | ByteDance (字节跳动) | 2.0 | 2K | 4-15s | 即将开放 (BytePlus) | 有 | 否 |
| **Google Veo** | Google DeepMind | 3.1 | 1080p | 8s (可扩展至~148s) | 有 (Gemini API / Vertex AI) | 有 (多个) | 否 |
| **Runway** | Runway AI | Gen-4 / Gen-4.5 | 4K (上采样) | 5-10s (Gen-4.5 最长1分钟) | 有 | 有 | 否 |
| **OpenAI Sora** | OpenAI | Sora 2 / Sora 2 Pro | 1080p (Pro: 1792x1024) | 15-25s | 有 | 有 | 否 |
| **Kling / 可灵** | Kuaishou (快手) | 3.0 | 4K | 15s | 有 (官方 + 第三方) | 有 (via PiAPI/fal) | 否 |
| **Pika** | Pika Labs | 2.5 | 1080p | 10s | 有 (via fal.ai) | 无官方 | 否 |
| **MiniMax / Hailuo** | MiniMax (稀宇科技) | Hailuo 2.3 | 1080p | 10s | 有 | 有 (官方) | 否 |
| **Luma Dream Machine** | Luma AI | Ray2 (Ray3 预告) | 1080p (4K上采样) | 10s (可扩展至~30s) | 有 | 有 (官方) | 否 |
| **PixVerse** | 爱诗科技 (Aishi Tech) | V5.6 | 4K | 5-8s | 有 | 有 (官方) | 否 |
| **Vidu** | 生数科技 (ShengShu) | Q3 | 1080p | 16s | 有 | 有 (社区) | 部分 |
| **Mochi** | Genmo AI | Mochi 1 | 480p (预览版) | 5.4s | 有 (Genmo平台) | 无 (仅同名卡片应用) | **是** (Apache 2.0) |
| **LTX Video** | Lightricks | LTX-2 | 4K | 20s | 有 | 未发现 | **是** (开放权重) |
| **CogVideo** | 智谱AI / 清华大学 | CogVideoX 1.5 | 1360x768 | 10s | 有 (智谱开放平台) | 未发现 | **是** (Apache 2.0) |
| **Stable Video Diffusion** | Stability AI | SVD 1.1 / SVD 2.0 | 1024x576 | ~4s (25帧) | API已停止 (2025.8) | 无官方 | **是** |

---

## 二、详细信息

---

### 1. Seedance (ByteDance / 字节跳动)

**版本线：** 1.0 Lite / 1.0 Pro / 1.5 Pro / 2.0

**核心能力：**
- 文生视频 (Text-to-Video)
- 图生视频 (Image-to-Video)
- 多模态混合输入（图片/视频/音频/文本，最多12个参考文件）
- 原生音视频同步生成（含唇形同步，支持8+语言）
- 多镜头叙事生成
- 首尾帧控制

**最大分辨率：** 2K
**最大时长：** 4-15 秒（2.0版本），可扩展至60秒

**API：**
- 官方 API (BytePlus): 预计 2026.02.24 正式开放
- 第三方：fal.ai、Replicate、Atlas Cloud 等已可用
- URL: https://docs.byteplus.com/en/docs/ModelArk/1366799
- 定价：官方 $0.49-$0.99/5s (1.5 Pro); 第三方低至 $0.05/clip

**MCP Server：**
- https://github.com/hexiaochun/seedance2-api (含 MCP 集成指南)
- 可通过 sutui-ai MCP server 配置

**SDK/包名：**
- 官方 SDK 预计 Q1 2026 发布 (Python / TypeScript)
- 当前通过 `@fal-ai/client` (npm) 或 第三方 REST API 访问
- API 采用 OpenAI 兼容的请求/响应结构

**定价：**
- Dreamina 消费端：~$9.60/月 起
- API：通过 BytePlus 或第三方定价不同

**开源：** 否 (闭源商业模型)

---

### 2. Google Veo 3.1

**开发商：** Google DeepMind

**核心能力：**
- 文生视频 (Text-to-Video)
- 图生视频 (Image-to-Video)
- 视频扩展 (Video Extension)：每次扩展7秒，最多20次 → 最长约148秒
- 原生音频生成（对话、音效、环境声）
- 风格迁移、视频编辑（插入/删除/扩展/样式转换）
- 精准唇形同步

**最大分辨率：** 1080p
**最大时长：** 8秒/次（可通过扩展达到 ~148秒）

**API：**
- Gemini API (Google AI Studio): https://ai.google.dev/
- Vertex AI (企业): https://cloud.google.com/vertex-ai
- 模型 ID: `veo-3.1-generate-preview`

**定价 (API)：**
| 等级 | 价格 (含音频) | 价格 (无音频) |
|------|-------------|-------------|
| Veo 3.1 Fast | $0.15/s | $0.10/s |
| Veo 3.1 Standard | $0.40/s | - |
| Veo 3.0 Full | $0.75/s | - |

**MCP Server：**
- https://github.com/alohc/veo-mcp-server (官方风格，支持 T2V/I2V/扩展/风格化)
- https://github.com/dayongd1/mcp-veo3 (PyPI: `mcp-veo3`)
- https://github.com/piotrkandziora/pmind-veo-mcp
- https://github.com/mario-andreschak/mcp-veo2
- https://github.com/Stevekaplanai/google-ai-mcp-server

**SDK/包名：**
- Python: `google-cloud-aiplatform` (Vertex AI SDK)
- Python: `google-generativeai` (Gemini API SDK)
- Node.js: `@google/generative-ai`

**开源：** 否 (闭源，通过 API 提供服务)

---

### 3. Runway Gen-3 / Gen-4

**开发商：** Runway AI, Inc.

**版本线：** Gen-3 Alpha → Gen-4 → Gen-4 Turbo → Gen-4.5

**核心能力：**
- 文生视频 / 图生视频 / 视频到视频
- 文生图像
- 角色一致性 (Character Consistency)
- Aleph 视频内编辑
- Act-Two 动作捕捉
- 4K 上采样导出
- Gen-4.5: 原生音频、多镜头序列、长达1分钟视频

**最大分辨率：** 原生 ~1280x768，可上采样至 4K
**最大时长：** Gen-4: 5-10s; Gen-4.5: 最长约60s

**API：**
- URL: https://docs.dev.runwayml.com/
- 开发者门户: https://dev.runwayml.com/

**定价：**
| 模型 | 费用 |
|------|------|
| gen4_turbo | 5 credits/s |
| gen4_aleph | 15 credits/s |
| gen4_image (720p) | 5 credits |
| gen4_image (1080p) | 8 credits |

订阅计划：
- Free: 125 credits (一次性)
- Standard: $12/月 (625 credits)
- Pro: $28/月 (2,250 credits)
- Unlimited: $76/月 (2,250 credits)
- Enterprise: 定制

**MCP Server：**
- https://github.com/sidart10/runway-mcp-server (支持 Gen-4、Aleph 编辑)

**SDK/包名：**
- Python: `pip install runwayml` (GitHub: https://github.com/runwayml/sdk-python)
- Node.js: `npm install @runwayml/sdk`

**开源：** 否

---

### 4. OpenAI Sora

**开发商：** OpenAI

**版本线：** Sora 1 → Sora 2 → Sora 2 Pro

**核心能力：**
- 文生视频 (Text-to-Video)
- 图生视频 (Image-to-Video)
- 视频混编 (Remixing)
- 原生音频同步（对话、音效）
- Storyboard 多镜头控制

**最大分辨率：** Sora 2: 720p; Sora 2 Pro: 1080p (API: 1792x1024)
**最大时长：** 15-25 秒

**API：**
- URL: https://platform.openai.com/docs/models/sora-2
- 2025年9月30日正式发布 API

**定价 (API)：**
| 模型 | 720p | 1024p |
|------|------|-------|
| Sora 2 | $0.10/s | - |
| Sora 2 Pro | $0.30/s | $0.50/s |

订阅：
- Plus: $20/月
- Pro: $200/月
- 注意：2026.01.10 起免费用户无法使用 Sora

**MCP Server：**
- https://github.com/writingmate/sora-2-mcp (含 FFmpeg 合并和淡入淡出)
- https://github.com/Doriandarko/sora-mcp

**SDK/包名：**
- Python: `pip install openai` (通过 OpenAI SDK 统一调用)
- Node.js: `npm install openai`
- Sora 2 API 与 OpenAI SDK 完全兼容，只需切换 model 参数

**开源：** 否

---

### 5. Kling / 可灵 (Kuaishou / 快手)

**开发商：** 快手科技 (Kuaishou Technology)

**版本线：** 1.0 → 1.5 → 1.6 → 2.0 → 2.6 → 3.0

**核心能力：**
- 文生视频 / 图生视频 / 视频到视频
- 3.0: 原生 4K@60fps，多镜头故事板（最多6个镜头），"Elements"角色锁定
- 2.6: 首个音视频同步生成（语音/对话/音效/环境声/说唱）
- 动作控制 / 唇形同步
- Avatar 生成

**最大分辨率：** 4K (3.0)，1080p (2.6)
**最大时长：** 15 秒 (3.0)，10 秒 (2.6)

**API：**
- 官方: https://klingai.com/global/dev/pricing
- 官方 API 包：$4,200/30,000 credits (90天有效)
- 第三方 (PiAPI): https://piapi.ai/kling-api (~$0.07-$0.14/s)
- fal.ai 也有托管

**定价 (订阅)：**
- Free: 66 daily credits
- 标准: $6.99/月
- Ultra: $180/月

**MCP Server：**
- 通过 PiAPI MCP Server: https://github.com/apinetwork/piapi-mcp-server (支持 Kling/Luma/Midjourney 等)
- 通过 fal MCP Server: https://github.com/raveenb/fal-mcp-server
- Video Agent MCP: https://github.com/h2a-dev/video-gen-mcp-monolithic (支持 Kling 2.1)

**SDK/包名：**
- 无官方独立 SDK
- 通过 JWT Token 认证的 REST API (AccessKey + SecretKey)
- 第三方：`@fal-ai/client` (npm) 或 PiAPI SDK

**开源：** 否

---

### 6. Pika

**开发商：** Pika Labs

**版本线：** 1.0 → 1.5 → 2.0 → 2.1 → 2.2 → 2.5

**核心能力：**
- 文生视频 / 图生视频
- Pikascenes (场景生成)
- Pikadditions (元素添加)
- Pikaswaps (元素替换)
- Pikatwists (风格变换)
- Pikaffects (特效)
- Pikaframes (关键帧控制)
- 唇形同步

**最大分辨率：** 1080p
**最大时长：** 10 秒

**API：**
- 官方 API 仅限合作伙伴
- 公开通过 fal.ai: https://fal.ai/models/fal-ai/pika/v2.2/text-to-video
- 定价 (fal.ai): 720p ~$0.20; 1080p ~$0.45

**定价 (订阅)：**
- Free: 80 credits
- Standard: $10/月 (700 credits)
- Pro: $35/月 (2,300 credits)
- Fancy: $95/月 (6,000 credits)

**MCP Server：** 无已知官方 MCP Server

**SDK/包名：**
- 无官方独立 SDK
- 通过 fal.ai 客户端: `@fal-ai/client` (npm) / `fal-client` (pip)

**开源：** 否

---

### 7. MiniMax / Hailuo / 海螺AI

**开发商：** MiniMax (稀宇科技)

**版本线：** Video-01 → Hailuo 02 → Hailuo 2.3 → Hailuo 2.5

**核心能力：**
- 文生视频 / 图生视频
- 首尾帧视频生成
- 主体参考视频生成 (人脸照片 + 文本)
- 高保真运动渲染
- 面部微表情
- 1080p 原生生成

**最大分辨率：** 1080p
**最大时长：** 10 秒

**API：**
- 官方: https://platform.minimax.io/docs/guides/video-generation
- 定价: $0.25/6s (768p); $0.52/10s; 1080p-6s 可用
- Hailuo 2.3 Fast: 比标准价格低约50%

**定价 (订阅)：**
- Standard: $9.99/月 (1,000 credits)
- Unlimited: $94.99/月

**MCP Server (官方)：**
- Python: https://github.com/MiniMax-AI/MiniMax-MCP
- JavaScript: https://github.com/MiniMax-AI/MiniMax-MCP-JS
- 包名: `minimax-mcp` (pip/npm)

**SDK/包名：**
- 官方 REST API
- MCP 包: `minimax-mcp`
- 第三方: fal.ai / Replicate / Segmind

**开源：** 否

---

### 8. Luma Dream Machine

**开发商：** Luma AI

**版本线：** Dream Machine 1.0 → 1.5 → Ray2 → Ray2 Flash → (Ray3 预告)

**核心能力：**
- 文生视频 / 图生视频
- Modify with Instructions (自然语言编辑)：对象移除、风格重塑、场景更换
- 文生图像 (Photon 模型)
- 多种参考模式 (image_ref, style_ref, character_ref, modify_image_ref)

**最大分辨率：** 1080p 原生，可上采样至 4K
**最大时长：** 10s/次，可扩展至 ~30s

**API：**
- 官方: https://docs.lumalabs.ai/docs/api
- API Keys: https://lumalabs.ai/api/keys

**定价 (订阅)：**
- Lite: $9.99/月 (3,200 credits)
- Plus: $29.99/月 (10,000 credits)
- Unlimited: $94.99/月
- 视频费用: 5s = 170 credits; 10s = 340 credits

**MCP Server (官方)：**
- **官方**: https://github.com/lumalabs/luma-api-mcp (Luma AI 官方维护)
- 社区: https://github.com/bobtista/luma-ai-mcp-server
- 社区: https://github.com/Sunwood-ai-labs/luma-mcp-server

**SDK/包名：**
- Python: `lumaai` (GitHub: https://github.com/lumalabs/lumaai-python)
- AI SDK Provider: `@ai-sdk/luma` (Vercel AI SDK)
- ComfyUI: `comfyui-lumaai-api`

**开源：** 否

---

### 9. PixVerse

**开发商：** 爱诗科技 (Aishi Technology)

**版本线：** V1.0 → V2.0 → V2.5 → V4.5 → V5.6

**核心能力：**
- 文生视频 / 图生视频
- 视频扩展 / 转场
- 唇形同步
- 音效生成
- 多角色一致性 (V5.6)
- 原生 4K 生成 (V5.6)
- 真实物理模拟

**最大分辨率：** 4K (V5.6)，1080p (早期版本)
**最大时长：** 5-8 秒

**API：**
- 官方平台: https://platform.pixverse.ai
- 文档: https://docs.platform.pixverse.ai
- 定价: 基于 credit 系统，根据模型/时长/质量不同

**定价 (订阅)：**
- Standard: $10/月 (1,200 credits, 720P)
- Pro: $30/月 (6,000 credits, 1080P)
- Credit 包: $10/1,000 credits ~ $5,000/500,000 credits

**MCP Server (官方)：**
- **官方**: https://github.com/PixVerseAI/PixVerse-MCP
- 支持: T2V, I2V, 视频扩展, 转场, 唇形同步, 音效等

**SDK/包名：**
- 官方 REST API (app-key 认证)
- 无独立 SDK 包

**开源：** 否 (模型闭源，MCP 工具开源)

---

### 10. Vidu (生数科技)

**开发商：** 生数科技 (ShengShu Technology) + 清华大学

**版本线：** 1.0 → 1.5 → 2.0 → Q2 → Q3

**核心能力：**
- 文生视频 / 图生视频
- 参考视频生成 (Reference-to-Video)
- 多实体一致性 (Multiple-Entity Consistency)
- 多风格支持
- 模板功能
- 可选音频生成

**最大分辨率：** 1080p
**最大时长：** 16 秒

**API：**
- 官方: https://platform.vidu.com/
- 定价: https://platform.vidu.com/docs/pricing
- 起价 $10 (无需高级订阅)
- ~$0.0375/s (比行业平均低55%)

**定价 (订阅)：**
- Free / Standard / Premium / Ultimate 多档

**MCP Server：**
- https://github.com/el-el-san/vidu-mcp-server (社区)

**SDK/包名：**
- 官方 REST API
- 通过 fal.ai: `@fal-ai/client`

**开源：** 部分 (Apache 开源许可的模型组件)

---

### 11. Mochi (Genmo)

**开发商：** Genmo AI

**版本：** Mochi 1

**核心能力：**
- 文生视频 (Text-to-Video)
- 高保真运动
- 强提示词遵循
- 30fps 流畅输出
- 本地运行支持

**最大分辨率：** 480p (预览版)
**最大时长：** 5.4 秒

**API：**
- Genmo 平台: https://www.genmo.ai
- 可通过 Replicate / fal.ai 等调用

**MCP Server：** 无已知视频生成 MCP Server (同名 mochi-mcp 均为闪卡应用)

**SDK/包名：**
- GitHub: https://github.com/genmoai/mochi
- 安装: `uv pip install -e .` (本地部署)
- HuggingFace: `genmo/mochi-1-preview`
- 硬件需求: 单 GPU 约 60GB VRAM; ComfyUI 优化后 <20GB

**定价：** 开源免费; 云端通过第三方平台计费

**开源：** **是** (Apache 2.0)

---

### 12. LTX Video (Lightricks)

**开发商：** Lightricks

**版本线：** LTX-Video → LTX-2

**核心能力：**
- 文生视频 / 图生视频 / 视频到视频
- 关键帧插值
- 原生音视频同步生成
- 精确唇形同步
- LoRA 微调训练支持
- 50fps 高帧率

**最大分辨率：** 4K (原生)
**最大时长：** 20 秒

**API：**
- 自助 API: https://ltx.io/model
- 第三方: fal.ai / Replicate / ComfyUI / OpenArt
- 内置于 ComfyUI 核心

**MCP Server：** 未发现已知 MCP Server

**SDK/包名：**
- GitHub: https://github.com/Lightricks/LTX-2
- 包: `ltx-core`, `ltx-pipelines`, `ltx-trainer`
- HuggingFace Diffusers 支持
- ComfyUI: https://github.com/Lightricks/ComfyUI-LTXVideo
- 环境: Python >= 3.12, CUDA > 12.7, PyTorch ~= 2.7

**定价：**
- 学术用途: 免费
- 商业用途 (ARR < $10M): 免费
- 大型企业: 商业许可

**开源：** **是** (开放权重 + 推理代码 + 训练代码)

---

### 13. CogVideo (智谱AI / 清华大学)

**开发商：** 智谱AI (Zhipu AI) + 清华大学 THUDM 实验室

**版本线：** CogVideo → CogVideoX-2B → CogVideoX-5B → CogVideoX 1.5

**核心能力：**
- 文生视频 / 图生视频
- 多分辨率支持
- DDIM Inverse 支持
- CogKit 微调/推理框架
- 可在消费级 GPU 运行 (8-12GB VRAM)

**最大分辨率：** 1360x768 (CogVideoX); 4K (智谱云端 API)
**最大时长：** 10 秒 (CogVideoX 1.5-5B)

**API：**
- 智谱开放平台: https://open.bigmodel.cn/dev/api/videomodel/cogvideox-3
- 通过 "清影" (Qingying) 平台免费体验
- 支持 4K 分辨率、30/60fps (云端 API)

**MCP Server：** 未发现已知 MCP Server

**SDK/包名：**
- 智谱 Python SDK: `zhipuai` (GitHub: https://github.com/MetaGLM/zhipuai-sdk-python-v4)
- 开源代码: https://github.com/zai-org/CogVideo (原 THUDM/CogVideo)
- CogKit: 微调推理框架
- HuggingFace Diffusers 支持: `diffusers`

**定价：** 开源免费 (本地部署); 智谱云端 API 按量计费

**开源：** **是** (Apache 2.0)

---

### 14. Stable Video Diffusion (Stability AI)

**开发商：** Stability AI

**版本线：** SVD → SVD-XT → SVD 1.1 → SVD 2.0

**核心能力：**
- 图生视频 (Image-to-Video) 为主
- 支持 SV3D (3D 视频 / 轨道视图)
- SVD 2.0: 文生视频 + 最长60秒

**最大分辨率：** 1024x576 (SVD 1.1); SVD 2.0 有更高分辨率
**最大时长：** ~4 秒 / 25帧 (SVD 1.1); SVD 2.0 最长60秒

**API：**
- **已于 2025.08.01 停止 API 服务**
- 可自托管部署 (Self-Hosted License)
- NVIDIA NIM: https://docs.api.nvidia.com/nim/reference/stabilityai-stable-video-diffusion

**MCP Server：** 无官方 MCP Server; 相关项目: https://github.com/mkm29/stablemcp (图像生成)

**SDK/包名：**
- GitHub: https://github.com/Stability-AI/generative-models
- HuggingFace: `stabilityai/stable-video-diffusion-img2vid-xt`
- 通过 `diffusers` 库使用: `pip install diffusers`
- Stability Platform SDK: `stability-sdk` (已废弃)

**定价：** 开源免费 (本地部署); API 已停止

**开源：** **是** (模型权重开放，代码开源)

---

## 三、API 与 MCP Server 汇总表

| 工具 | API URL | MCP Server GitHub | 官方/社区 |
|------|---------|-------------------|----------|
| Seedance | BytePlus (即将) | [hexiaochun/seedance2-api](https://github.com/hexiaochun/seedance2-api) | 社区 |
| Google Veo | Gemini API / Vertex AI | [alohc/veo-mcp-server](https://github.com/alohc/veo-mcp-server), [dayongd1/mcp-veo3](https://github.com/dayongd1/mcp-veo3) 等多个 | 社区 |
| Runway | [docs.dev.runwayml.com](https://docs.dev.runwayml.com/) | [sidart10/runway-mcp-server](https://github.com/sidart10/runway-mcp-server) | 社区 |
| OpenAI Sora | [platform.openai.com](https://platform.openai.com/docs/models/sora-2) | [writingmate/sora-2-mcp](https://github.com/writingmate/sora-2-mcp), [Doriandarko/sora-mcp](https://github.com/Doriandarko/sora-mcp) | 社区 |
| Kling | [klingai.com/global/dev](https://klingai.com/global/dev/pricing) | [apinetwork/piapi-mcp-server](https://github.com/apinetwork/piapi-mcp-server) (多模型), [raveenb/fal-mcp-server](https://github.com/raveenb/fal-mcp-server) | 社区 |
| Pika | fal.ai (第三方) | 无 | - |
| MiniMax/Hailuo | [platform.minimax.io](https://platform.minimax.io/docs/guides/video-generation) | [MiniMax-AI/MiniMax-MCP](https://github.com/MiniMax-AI/MiniMax-MCP) | **官方** |
| Luma | [docs.lumalabs.ai](https://docs.lumalabs.ai/docs/api) | [lumalabs/luma-api-mcp](https://github.com/lumalabs/luma-api-mcp) | **官方** |
| PixVerse | [platform.pixverse.ai](https://platform.pixverse.ai) | [PixVerseAI/PixVerse-MCP](https://github.com/PixVerseAI/PixVerse-MCP) | **官方** |
| Vidu | [platform.vidu.com](https://platform.vidu.com/) | [el-el-san/vidu-mcp-server](https://github.com/el-el-san/vidu-mcp-server) | 社区 |
| Mochi | genmo.ai | 无 | - |
| LTX Video | [ltx.io/model](https://ltx.io/model) | 无 | - |
| CogVideo | [open.bigmodel.cn](https://open.bigmodel.cn/dev/api/videomodel/cogvideox-3) | 无 | - |
| SVD | API 已停止 | 无 | - |

---

## 四、SDK/包名汇总表

| 工具 | Python 包 | npm 包 | 备注 |
|------|----------|--------|------|
| Seedance | - (即将) | `@fal-ai/client` (第三方) | 兼容 OpenAI SDK 结构 |
| Google Veo | `google-cloud-aiplatform`, `google-generativeai` | `@google/generative-ai` | 通过 Gemini/Vertex SDK |
| Runway | `runwayml` | `@runwayml/sdk` | 官方 SDK |
| OpenAI Sora | `openai` | `openai` | 通过 OpenAI SDK 统一调用 |
| Kling | - | - | REST API + JWT; 第三方通过 fal/PiAPI |
| Pika | `fal-client` (第三方) | `@fal-ai/client` (第三方) | 官方 API 限合作伙伴 |
| MiniMax/Hailuo | `minimax-mcp` | `minimax-mcp` | 官方 MCP 包 |
| Luma | `lumaai` | `@ai-sdk/luma` | 官方 SDK |
| PixVerse | - | - | REST API (app-key) |
| Vidu | - | `@fal-ai/client` (第三方) | REST API |
| Mochi | 本地: `pip install -e .` | - | 开源仓库 |
| LTX Video | `ltx-core`, `ltx-pipelines`, `ltx-trainer` | - | 开源 monorepo |
| CogVideo | `zhipuai` | - | 智谱 SDK + diffusers |
| SVD | `diffusers` | - | HuggingFace diffusers |

---

## 五、开源状态与许可证

| 工具 | 开源 | 许可证 | 仓库 |
|------|------|--------|------|
| Seedance | 否 | 商业闭源 | - |
| Google Veo | 否 | 商业闭源 | - |
| Runway | 否 | 商业闭源 | - |
| OpenAI Sora | 否 | 商业闭源 | - |
| Kling | 否 | 商业闭源 | - |
| Pika | 否 | 商业闭源 | - |
| MiniMax/Hailuo | 否 | 商业闭源 | - |
| Luma | 否 | 商业闭源 | - |
| PixVerse | 否 | 商业闭源 | - |
| Vidu | 部分 | Apache 2.0 (部分组件) | - |
| **Mochi** | **是** | **Apache 2.0** | [genmoai/mochi](https://github.com/genmoai/mochi) |
| **LTX Video** | **是** | **开放权重 (学术+小企业免费)** | [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) |
| **CogVideo** | **是** | **Apache 2.0** | [zai-org/CogVideo](https://github.com/zai-org/CogVideo) |
| **SVD** | **是** | **开放权重** | [Stability-AI/generative-models](https://github.com/Stability-AI/generative-models) |

---

## 六、定价快速对比 (API 每秒成本)

| 工具 | 最低 API 价格 (/秒) | 备注 |
|------|---------------------|------|
| Vidu | ~$0.038 | 行业最低之一 |
| Seedance (第三方) | ~$0.01 | 第三方价格 |
| Kling (第三方) | ~$0.07-0.14 | PiAPI 等 |
| Veo 3.1 Fast | $0.10 (无音频) / $0.15 (含音频) | Google 官方 |
| Sora 2 | $0.10 (720p) | OpenAI 官方 |
| Hailuo 02 | ~$0.04-0.05 | MiniMax 官方 |
| Pika (fal.ai) | ~$0.04-0.045 | 第三方 |
| Sora 2 Pro | $0.30-0.50 | OpenAI 高端 |
| Veo 3.1 Standard | $0.40 | Google 官方 |
| Veo 3.0 Full | $0.75 | Google 最高端 |
| Mochi / CogVideo / LTX / SVD | **免费** (自托管) | 开源模型 |

---

## 七、关键趋势总结

1. **分辨率跃升**：从 720p 标配跳升至 1080p 成为主流，LTX-2 和 PixVerse V5.6 已支持原生 4K，Kling 3.0 支持 4K@60fps。

2. **音视频同步**：2025下半年起成为竞争焦点。Seedance 2.0、Kling 2.6、Veo 3.1、LTX-2 均支持原生音频同步生成，包括对话、音效、环境声。

3. **时长突破**：从早期的 3-5 秒扩展到 10-20 秒标准，Veo 3.1 通过扩展可达 ~148 秒，SVD 2.0 声称支持 60 秒。

4. **MCP 生态爆发**：MiniMax、Luma AI、PixVerse 已发布官方 MCP Server；几乎所有主流工具都有社区 MCP 实现。

5. **开源与闭源分化**：主流商业工具（Seedance、Veo、Runway、Sora、Kling）全部闭源；开源阵营（Mochi、LTX-2、CogVideoX）在质量上快速追赶但仍有差距。

6. **API 定价战**：每秒成本从 $0.75 (Veo 3.0 Full) 跨越到 $0.01 (第三方 Seedance)，价格差距高达 75 倍。

---

*本报告基于 2026 年 2 月 21 日的公开信息编写。AI 视频生成领域变化极快，建议定期更新。*
