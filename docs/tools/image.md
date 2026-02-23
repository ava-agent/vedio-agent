# AI 图片生成工具全面调研

> 调研时间：2025-2026 年主流 AI 图片生成工具
> 覆盖工具：15 款

---

## 一、总览对比表

| # | 工具名称 | 开发商 | 最大分辨率 | 公开 API | MCP Server | 开源 | 单图价格 (API) |
|---|---------|--------|-----------|---------|------------|------|---------------|
| 1 | Nano Banana (Gemini 2.5 Flash Image) | Google DeepMind | 1024x1024 | Yes | Yes | No | ~$0.039/张 |
| 2 | Nano Banana Pro (Gemini 3 Pro Image) | Google DeepMind | 3840x2160 (4K) | Yes | Yes | No | ~$0.12/张 |
| 3 | Imagen 4 | Google DeepMind | 2048x2048 (2K) | Yes | Yes | No | $0.02-$0.06/张 |
| 4 | GPT-Image-1 | OpenAI | 4096x4096 | Yes | Yes | No | $0.02-$0.19/张 |
| 5 | Midjourney v6/v7 | Midjourney, Inc. | 2048x2048 (2x upscale) | No (非官方) | Yes (非官方) | No | $10-$120/月订阅 |
| 6 | SD 3.5 / SDXL | Stability AI | 1024x1024 | Yes | Yes | Yes | ~$0.065/张 (API) / 免费 (本地) |
| 7 | FLUX.2 | Black Forest Labs | 4MP (~2048x2048) | Yes | Yes | 部分开源 | $0.014-$0.05/张 |
| 8 | Ideogram 3.0 | Ideogram, Inc. | 1536x1536 (原生); 2048x2048 (upscale) | Yes | Yes | No | $0.01-$0.17/张 |
| 9 | Leonardo.ai (Phoenix) | Leonardo Interactive | ~5MP (~2560x2048) | Yes | Yes | No | 信用制, ~$9/月起 |
| 10 | SeedDream 4.5 | ByteDance (字节跳动) | 4096x4096 | Yes | Yes | No | ~$0.03-$0.045/张 |
| 11 | Recraft v3 | Recraft | 4096px max (16MP) | Yes | Yes (官方) | No | $0.04 (光栅) / $0.08 (矢量) |
| 12 | Adobe Firefly (IM4/IM5) | Adobe | 2048x2048 (IM4); 4MP (IM5) | Yes | No (无专用) | No | 信用制, $4.99/月起 |
| 13 | Kolors 2.1 | 快手 (Kuaishou) | 2048x2048 (2K) | Yes (第三方) | No | Yes (Apache-2.0) | 免费 (本地) |
| 14 | Playground v3 | Playground AI | 1024x1024 | No (受限) | No | No (v2.5开源) | $15-$45/月订阅 |
| 15 | SDXL Turbo / LCM | Stability AI / Tsinghua | 512x512 (原生) | Yes (第三方) | Yes | Yes | ~$0.003/张 (Replicate) |

---

## 二、各工具详细说明

### 1. Nano Banana / Gemini 2.5 Flash Image (Google)

| 属性 | 详情 |
|------|------|
| **开发商** | Google DeepMind |
| **核心能力** | 文生图、图生图、图片编辑（背景模糊、物体移除、姿态修改、上色等）、多模态对话式图片生成 |
| **最大分辨率** | 1024x1024 px (PNG 输出)，支持 10 种宽高比（1:1 到 21:9） |
| **公开 API** | Yes - https://ai.google.dev/gemini-api/docs/image-generation |
| **模型 ID** | `gemini-2.5-flash-image-preview` |
| **MCP Server** | https://github.com/qhdrl12/mcp-server-gemini-image-generator |
| **SDK (Python)** | `pip install google-genai` (import: `from google import genai`) |
| **SDK (Node.js)** | `@google/genai` |
| **定价** | $30/百万输出 tokens，每张图约 1290 tokens，合 ~$0.039/张；批量模式可低至 ~$0.0195/张 |
| **是否开源** | 否，闭源专有模型 |
| **关键特点** | 延迟极低（平均 3.2 秒），高吞吐量优化，适合大规模生产环境 |

---

### 2. Nano Banana Pro / Gemini 3 Pro Image (Google)

| 属性 | 详情 |
|------|------|
| **开发商** | Google DeepMind |
| **核心能力** | 高保真文生图、图生图、专业级资产生产、复杂指令遵循、高保真文字渲染、身份保持、一致光照 |
| **最大分辨率** | 原生支持 4K (3840x2160)，也支持 1K、2K 输出 |
| **公开 API** | Yes - https://ai.google.dev/gemini-api/docs/image-generation |
| **模型 ID** | `gemini-3-pro-image-preview` |
| **Vertex AI** | https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-pro-image |
| **MCP Server** | https://github.com/qhdrl12/mcp-server-gemini-image-generator （通用 Gemini MCP 服务器） |
| **SDK (Python)** | `google-genai` |
| **SDK (Node.js)** | `@google/genai` |
| **定价** | ~$0.12/张（约 24 信用点/张），比标准 Google 定价低约 20%（通过第三方） |
| **是否开源** | 否，闭源专有模型 |
| **关键特点** | 基于 Gemini 3.0 Pro 构建，专为专业设计师和内容创作者设计，支持复杂场景和精细材质 |

---

### 3. Imagen 4 (Google)

| 属性 | 详情 |
|------|------|
| **开发商** | Google DeepMind |
| **核心能力** | 文生图、文字渲染（大幅改进）、多样风格支持（写实到创意设计） |
| **最大分辨率** | 2048x2048 (2K)，支持多种宽高比 |
| **公开 API** | Yes |
| **Gemini API** | https://ai.google.dev/gemini-api/docs/imagen |
| **Vertex AI** | https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/imagen/4-0-generate |
| **模型 ID** | `imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`, `imagen-4.0-fast-generate-001` |
| **MCP Server** | https://github.com/chug2k/gemini-imagen4 / https://github.com/PierrunoYT/replicate-imagen4-mcp-server / https://github.com/serkanhaslak/gemini-imagen-mcp-server |
| **SDK (Python)** | `google-genai` |
| **SDK (Node.js)** | `@google/genai` |
| **定价** | Fast: $0.02/张, Standard: ~$0.04/张, Ultra: ~$0.06/张 |
| **是否开源** | 否，闭源专有模型 |
| **关键特点** | Google 最先进的文生图模型，细节极佳（布料、水滴、动物毛发等），文字渲染显著改进 |

---

### 4. GPT-Image-1 / DALL-E 3 (OpenAI)

| 属性 | 详情 |
|------|------|
| **开发商** | OpenAI |
| **核心能力** | 文生图、图生图、图片编辑（含遮罩编辑）、多模态原生理解和生成 |
| **最大分辨率** | GPT-Image-1: 最高 4096x4096; GPT-Image-1 Mini: 最高 1536x1024; DALL-E 3: 1024x1024 / 1024x1792 / 1792x1024 |
| **公开 API** | Yes - https://platform.openai.com/docs/guides/image-generation |
| **模型** | `gpt-image-1`, `gpt-image-1-mini`, `dall-e-3` |
| **MCP Server** | https://github.com/spartanz51/imagegen-mcp / https://github.com/lansespirit/image-gen-mcp / https://github.com/iplanwebsites/image-mcp |
| **SDK (Python)** | `pip install openai` |
| **SDK (Node.js)** | `npm install openai` |
| **定价** | GPT-Image-1: Low $0.02, Medium $0.07, High $0.19 (1024x1024); 4096x4096 High ~$2.88; GPT-Image-1 Mini: 便宜 80%; DALL-E 3: Standard $0.04, HD $0.08 |
| **是否开源** | 否，闭源专有模型 |
| **关键特点** | 原生多模态语言模型，指令遵循能力极强，与 ChatGPT 深度集成 |

---

### 5. Midjourney v6/v7

| 属性 | 详情 |
|------|------|
| **开发商** | Midjourney, Inc. |
| **核心能力** | 文生图、图生图、图片变体、风格迁移、局部重绘、Upscale |
| **最大分辨率** | V7 基础: 1024x1024; V7 + 2x Upscale: 2048x2048; V5.2 + 4x Upscale: 4096x4096 |
| **公开 API** | **无官方 API**，仅通过 Discord Bot 或 Web 界面使用 |
| **非官方第三方 API** | https://www.useapi.net/ ($10/月) / https://www.imagineapi.dev/ |
| **MCP Server** | 均为非官方第三方: https://github.com/AceDataCloud/MCPMidjourney / https://github.com/Lala-0x3f/mj-mcp / https://github.com/z23cc/midjourney-mcp |
| **SDK** | 无官方 SDK |
| **定价** | Basic: $10/月 (3.3 GPU 小时), Standard: $30/月 (15h), Pro: $60/月 (30h), Mega: $120/月 (60h) |
| **是否开源** | 否，完全闭源 |
| **关键特点** | V7 于 2025 年 4 月发布，写实感、纹理丰富度、人体/手部/物体一致性大幅改进；生成速度较慢（45-60 秒） |

---

### 6. Stable Diffusion 3.5 / SDXL (Stability AI)

| 属性 | 详情 |
|------|------|
| **开发商** | Stability AI |
| **核心能力** | 文生图、图生图、Inpainting、ControlNet、LoRA 微调、本地部署 |
| **最大分辨率** | SD 3.5 Large: 1024x1024 (1MP); SD 3.5 Medium: 最高 2MP; SDXL: 1024x1024; SDXL Turbo: 512x512 |
| **公开 API** | Yes - https://platform.stability.ai/ ; 第三方: Replicate, fal.ai, Segmind |
| **MCP Server** | https://github.com/tadasant/mcp-server-stability-ai / https://github.com/CLOUDWERX-DEV/DiffuGen |
| **SDK (Python)** | `pip install diffusers` (HuggingFace Diffusers), `pip install stability-sdk` |
| **模型权重** | `stabilityai/stable-diffusion-3.5-large`, `stabilityai/sdxl-turbo` |
| **定价** | SD 3.5 API: ~$0.065/张; SDXL Turbo (Replicate): ~$0.003/张; 本地部署: 免费; 年收入 < $1M 免费商用 |
| **是否开源** | Yes (Community License, Apache-2.0 类)，年收入 > $1M 需企业授权 |
| **关键特点** | 生态系统极其丰富，支持 ComfyUI、Automatic1111 WebUI，海量 LoRA/Checkpoint 社区 |

---

### 7. FLUX.2 (Black Forest Labs)

| 属性 | 详情 |
|------|------|
| **开发商** | Black Forest Labs（由 Stability AI 前核心成员创立） |
| **核心能力** | 文生图、图生图、多参考图编辑（最多 10 张参考图）、4MP 高分辨率编辑 |
| **最大分辨率** | 4MP (~2048x2048)，FLUX1.1 Pro Ultra 支持 4x 分辨率 |
| **公开 API** | Yes - https://docs.bfl.ml/ ; 定价页: https://bfl.ai/pricing |
| **MCP Server** | https://github.com/GongRzhe/Image-Generation-MCP-Server / https://github.com/CLOUDWERX-DEV/DiffuGen / https://github.com/RamboRogers/cyberimage |
| **SDK (Python)** | `pip install -e .` (GitHub: https://github.com/black-forest-labs/flux2); HuggingFace: `black-forest-labs/FLUX.2-dev`; 通过 `diffusers` 库使用 |
| **定价** | FLUX.2 [klein]: $0.014/张; FLUX 1.1 Pro: $0.04/张; FLUX 1.0 Pro: $0.05/张; 1 credit = $0.01 USD |
| **是否开源** | 部分开源: FLUX.2 [klein] 4B (Apache 2.0, 可商用); FLUX.2 [dev] 32B (非商用许可); FLUX.2 VAE (Apache 2.0); FLUX.2 [pro]/[max] (闭源, 仅 API) |
| **关键特点** | 32B 参数 Flow Matching Transformer，生成速度快且质量极高，社区快速增长 |

---

### 8. Ideogram 3.0

| 属性 | 详情 |
|------|------|
| **开发商** | Ideogram, Inc. |
| **核心能力** | 文生图、图片编辑、Reframe（智能扩展画布）、风格参考、角色一致性、极强的文字渲染（~90% 准确率） |
| **最大分辨率** | 原生: 1024x1024 (1:1), 1312x736 (16:9), 1536x512 (3:1) 等; Upscale: 最高 2048x2048 |
| **公开 API** | Yes - https://developer.ideogram.ai/ ; 定价: https://ideogram.ai/features/api-pricing |
| **MCP Server** | https://github.com/PierrunoYT/replicate-ideogram-v3-mcp-server / https://github.com/flowluap/ideogram-mcp-server / https://github.com/Sunwood-ai-labs/ideagram-mcp-server |
| **SDK (Node.js)** | `npm install @aigne/ideogram`; 也支持 REST API 直接调用 |
| **定价** | V3 Turbo: $0.03/张; V3 Quality: ~$0.08/张; API: $0.01-$0.17/张; 订阅: Free / Plus $8/月 / Pro $20/月 |
| **是否开源** | 否，闭源专有模型 |
| **关键特点** | 业界最强文字渲染能力，2025 年 3 月发布，特别适合设计师和需要精确文字的场景 |

---

### 9. Leonardo.ai (Phoenix)

| 属性 | 详情 |
|------|------|
| **开发商** | Leonardo Interactive Pty Ltd |
| **核心能力** | 文生图、图生图、实时 Canvas 编辑、3D 纹理合成、PhotoReal、Prompt Magic、Motion（视频）、模型训练 |
| **最大分辨率** | ~5MP (约 2560x2048)，Ultra 生成模式 |
| **公开 API** | Yes - https://leonardo.ai/api ; 文档: https://docs.leonardo.ai/ |
| **MCP Server** | https://github.com/ish-joshi/leonardo-mcp-server |
| **SDK (Python)** | `pip install Leonardo-Ai-SDK` |
| **SDK (Node.js)** | `npm install @leonardo-ai/sdk` |
| **定价** | API Basic: $9/月 (3,500 credits); Standard: $12/月; Pro: $30/月; 手动充值: $0.80-$3.00/5000 credits |
| **是否开源** | 否，闭源专有（Phoenix 模型基于 FLUX.1 架构但为专有实现） |
| **关键特点** | 综合创意套件，Alchemy v4 Pipeline，文字渲染能力显著改进，适合游戏/概念设计 |

---

### 10. SeedDream 4.5 (ByteDance 字节跳动)

| 属性 | 详情 |
|------|------|
| **开发商** | ByteDance Seed Team (字节跳动) |
| **核心能力** | 文生图、图生图、多图编辑、文字排版渲染（营销素材/产品标签/社交图形）、身份保持、参考图细节保留 |
| **最大分辨率** | 最高 4096x4096，原生支持 2K，多种宽高比 |
| **公开 API** | Yes - BytePlus: https://www.byteplus.com/en/product/Seedream ; 第三方: fal.ai, WaveSpeedAI, OpenRouter |
| **MCP Server** | https://github.com/PierrunoYT/seedream-v4-fal-mcp-server / https://github.com/PierrunoYT/seedream-v4-replicate-mcp-server |
| **SDK (Python)** | `pip install byteplus-sdk` (import: `from byteplus import ModelArk`) |
| **定价** | BytePlus: ~$0.03/张 (200 张免费试用); WaveSpeedAI: ~$0.045/张; fal.ai: ~$0.04/张 |
| **是否开源** | 否，模型权重不可下载，仅 API 访问 |
| **关键特点** | LM Arena 排行榜 #10 (1147 分)，中英双语文字渲染极强，SeedDream 5.0 预计 2026 年 2 月发布（引入 Web 搜索能力） |

---

### 11. Recraft v3

| 属性 | 详情 |
|------|------|
| **开发商** | Recraft |
| **核心能力** | 文生图（光栅 + 矢量图）、背景移除、Upscale（Creative/Crisp）、区域擦除、矢量化、品牌风格定制、长文本渲染 |
| **最大分辨率** | 最高 16MP，单维度最大 4096px，最小 256px |
| **公开 API** | Yes - https://www.recraft.ai/docs ; API 参考: https://www.recraft.ai/docs/api-reference/getting-started |
| **MCP Server (官方)** | https://github.com/recraft-ai/mcp-recraft-server (npm: `@recraft-ai/mcp-recraft-server`) |
| **MCP Server (社区)** | https://github.com/BartWaardenburg/recraft-mcp-server / https://github.com/PierrunoYT/fal-recraft-v3-mcp-server |
| **SDK** | MCP: `npm install @recraft-ai/mcp-recraft-server`; ComfyUI 节点: https://github.com/recraft-ai/ComfyUI-RecraftAI; REST API 直接调用 |
| **定价** | 光栅图: $0.04/张; 矢量图: $0.08/张; Creative Upscale: $0.25; Crisp Upscale: $0.004; 区域擦除: $0.002; 矢量化: $0.01; 去背景: $0.01 |
| **是否开源** | 否，Proprietary License |
| **关键特点** | **唯一原生支持矢量图 (SVG) 生成的 AI 工具**，V4 Pro 已支持 4MP 打印级输出，极适合品牌设计 |

---

### 12. Adobe Firefly (Image Model 4 / 5)

| 属性 | 详情 |
|------|------|
| **开发商** | Adobe |
| **核心能力** | 文生图、Generative Fill & Expand（Photoshop 集成）、文生矢量、文生视频、结构参考、风格参考、分层编辑（IM5） |
| **最大分辨率** | Image Model 4: ~2K (2048px); Image Model 5: 4MP |
| **公开 API** | Yes - https://developer.adobe.com/firefly-services/docs/firefly-api/ ; 文档: https://developer.adobe.com/firefly-services/docs/guides/ |
| **MCP Server** | 无专用图像生成 MCP Server（现有 Firefly MCP 是基础设施管理工具，非图像生成） |
| **SDK (Node.js)** | `npm install @adobe/firefly-apis`; Firefly Services SDK: https://github.com/Firefly-Services/firefly-services-sdk-js |
| **定价** | Free Plan: $0/月 (25 generative credits); Premium: $4.99/月; 企业: 定制价格; API: 基于信用消费 |
| **是否开源** | 否，完全闭源专有 |
| **关键特点** | 完全使用合法授权数据训练，**商业安全性最高**，深度集成 Photoshop/Illustrator/Premiere，适合企业级商用 |

---

### 13. Kolors 2.1 (快手)

| 属性 | 详情 |
|------|------|
| **开发商** | 快手 Kuaishou (Kwai-Kolors Team) |
| **核心能力** | 文生图、中英双语理解、超过 60 种风格效果、电影级画质、复杂语义理解、文字渲染 |
| **最大分辨率** | 2048x2048 (2K) |
| **公开 API** | 无官方独立 API; 第三方: Replicate (https://replicate.com/fofr/kolors), fal.ai, Segmind (https://www.segmind.com/models/kolors/api) |
| **MCP Server** | 未发现专用 MCP Server |
| **SDK (Python)** | 通过 HuggingFace Diffusers: `pip install diffusers`; 模型: `Kwai-Kolors/Kolors` |
| **GitHub** | https://github.com/Kwai-Kolors/Kolors |
| **定价** | 本地部署: 免费; 学术研究: 完全免费; 商用: 年收入 < $1M 可免费注册使用; 年收入 > $1M 需联系授权 |
| **是否开源** | Yes (Apache-2.0)，商用需注册 |
| **关键特点** | 数十亿文图对训练，GLM 文本编码器，中文场景理解能力极强，Kolors 2.1 在 Artificial Analysis Arena 排名 #5 |

---

### 14. Playground v3

| 属性 | 详情 |
|------|------|
| **开发商** | Playground AI |
| **核心能力** | 文生图、图生图、图形设计专用、高级文字渲染（82% 文字合成分数）、多语言文字支持、超长 Prompt 理解 |
| **最大分辨率** | 1024x1024（基础），支持不同宽高比 |
| **公开 API** | 极度受限 -- 仅对月生成量 > 100 万张的合作伙伴开放 |
| **MCP Server** | 未发现 |
| **SDK** | v3 无公开 SDK; v2.5 (开源版): HuggingFace `playgroundai/playground-v2.5-1024px-aesthetic` |
| **定价** | Free: 有限免费; Pro: $15/月; Pro Plus: $45/月 |
| **是否开源** | v3 未开源; v2.5 曾在 HuggingFace 开源; v3 为闭源，采用创新的 LLM 深度融合架构 |
| **关键特点** | 专为图形设计打造，DPG-bench Hard 基准测试超越所有竞品，引入 Argus 视觉语言模型 |

---

### 15. SDXL Turbo / LCM (Latent Consistency Model)

| 属性 | 详情 |
|------|------|
| **开发商** | Stability AI (SDXL Turbo) / Tsinghua University (LCM) |
| **核心能力** | 超快速文生图（2-8 步推理）、实时图像生成、Inpainting |
| **最大分辨率** | SDXL Turbo: 512x512 原生（768/1024 会降质）; LCM-SDXL: 1024x1024 |
| **公开 API** | Yes（第三方）: Replicate (https://replicate.com/lucataco/sdxl-lcm), fal.ai (https://fal.ai/models/fal-ai/lcm/api) |
| **MCP Server** | https://github.com/CLOUDWERX-DEV/DiffuGen / https://github.com/rupeshs/fastsdcpu |
| **SDK (Python)** | `pip install diffusers`; 模型: `stabilityai/sdxl-turbo`, `latent-consistency/lcm-sdxl`, `latent-consistency/lcm-lora-sdxl` |
| **定价** | Replicate: ~$0.003/张（约 370 张/$1）; 本地部署: 免费 |
| **是否开源** | Yes; SDXL Turbo: Stability AI Community License; LCM: 开源研究模型 |
| **关键特点** | 极致速度，适合实时交互式应用（如画布实时预览），可在 CPU 上运行 |

---

## 三、API 与 MCP Server 汇总表

| 工具 | 官方 API | MCP Server |
|------|---------|------------|
| Nano Banana | [Gemini API](https://ai.google.dev/gemini-api/docs/image-generation) | [mcp-server-gemini-image-generator](https://github.com/qhdrl12/mcp-server-gemini-image-generator) |
| Nano Banana Pro | [Gemini API](https://ai.google.dev/gemini-api/docs/image-generation) | 同上 |
| Imagen 4 | [Gemini API](https://ai.google.dev/gemini-api/docs/imagen) / [Vertex AI](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/imagen/4-0-generate) | [gemini-imagen4](https://github.com/chug2k/gemini-imagen4) |
| GPT-Image-1 | [OpenAI API](https://platform.openai.com/docs/guides/image-generation) | [imagegen-mcp](https://github.com/spartanz51/imagegen-mcp) |
| Midjourney | 无官方 API | [MCPMidjourney](https://github.com/AceDataCloud/MCPMidjourney) (非官方) |
| SD 3.5 / SDXL | [Stability AI](https://platform.stability.ai/) | [mcp-server-stability-ai](https://github.com/tadasant/mcp-server-stability-ai) |
| FLUX.2 | [BFL API](https://docs.bfl.ml/) | [Image-Generation-MCP-Server](https://github.com/GongRzhe/Image-Generation-MCP-Server) |
| Ideogram 3.0 | [Ideogram API](https://developer.ideogram.ai/) | [ideogram-mcp-server](https://github.com/flowluap/ideogram-mcp-server) |
| Leonardo.ai | [Leonardo API](https://docs.leonardo.ai/) | [leonardo-mcp-server](https://github.com/ish-joshi/leonardo-mcp-server) |
| SeedDream 4.5 | [BytePlus](https://www.byteplus.com/en/product/Seedream) | [seedream-v4-fal-mcp-server](https://github.com/PierrunoYT/seedream-v4-fal-mcp-server) |
| Recraft v3 | [Recraft API](https://www.recraft.ai/docs) | [mcp-recraft-server](https://github.com/recraft-ai/mcp-recraft-server) **(官方)** |
| Adobe Firefly | [Firefly API](https://developer.adobe.com/firefly-services/docs/firefly-api/) | 无专用 |
| Kolors | 无官方 (第三方: Replicate/fal.ai) | 无 |
| Playground v3 | 极度受限 | 无 |
| SDXL Turbo/LCM | 第三方 (Replicate/fal.ai) | [DiffuGen](https://github.com/CLOUDWERX-DEV/DiffuGen) |

---

## 四、SDK / 包名速查表

| 工具 | Python 包 | Node.js 包 |
|------|----------|------------|
| Google 系列 (Nano Banana / Imagen) | `google-genai` | `@google/genai` |
| OpenAI 系列 (GPT-Image-1 / DALL-E) | `openai` | `openai` |
| Midjourney | 无官方 | 无官方 |
| Stable Diffusion 系列 | `diffusers`, `stability-sdk` | N/A |
| FLUX | `diffusers` + GitHub repo | N/A |
| Ideogram | REST API | `@aigne/ideogram` |
| Leonardo.ai | `Leonardo-Ai-SDK` | `@leonardo-ai/sdk` |
| SeedDream | `byteplus-sdk` | N/A |
| Recraft | REST API | `@recraft-ai/mcp-recraft-server` |
| Adobe Firefly | REST API | `@adobe/firefly-apis` |
| Kolors | `diffusers` | N/A |
| SDXL Turbo / LCM | `diffusers` | N/A |

---

## 五、定价对比表

| 工具 | 按张计价 (API) | 订阅计划 | 本地部署 |
|------|---------------|---------|---------|
| Nano Banana | ~$0.039/张 (批量 ~$0.0195) | - | 不可 |
| Nano Banana Pro | ~$0.12/张 | - | 不可 |
| Imagen 4 | Fast $0.02, Standard $0.04, Ultra $0.06 | - | 不可 |
| GPT-Image-1 | Low $0.02, Medium $0.07, High $0.19 | - | 不可 |
| Midjourney | - | $10-$120/月 | 不可 |
| SD 3.5 / SDXL | ~$0.065/张 (API) | - | 免费 |
| FLUX.2 | $0.014-$0.05/张 | - | 部分可 |
| Ideogram 3.0 | $0.01-$0.17/张 | Free / $8 / $20/月 | 不可 |
| Leonardo.ai | 信用制 | $9-$30/月 | 不可 |
| SeedDream 4.5 | ~$0.03-$0.045/张 | - | 不可 |
| Recraft v3 | 光栅 $0.04, 矢量 $0.08 | - | 不可 |
| Adobe Firefly | 信用制 | Free / $4.99/月 / 企业定制 | 不可 |
| Kolors | 免费 (第三方有费) | - | 免费 |
| Playground v3 | - | Free / $15 / $45/月 | 不可 |
| SDXL Turbo / LCM | ~$0.003/张 (Replicate) | - | 免费 |

---

## 六、开源与闭源分类

### 完全/部分开源（可本地部署）

| 模型 | License | 商用限制 |
|------|---------|---------|
| Stable Diffusion 3.5 | Community License | 年收入 > $1M 需企业授权 |
| SDXL / SDXL Turbo | Community License | 年收入 > $1M 需企业授权 |
| LCM (Latent Consistency) | 开源 | 无 |
| FLUX.2 [klein] 4B | Apache 2.0 | 无限制 |
| FLUX.2 [dev] 32B | Non-Commercial License | 仅非商用 |
| Kolors | Apache-2.0 | 商用需注册，年收入 > $1M 需联系授权 |
| Playground v2.5 | 开源 (HuggingFace) | v3 不开源 |

### 完全闭源（仅 API/平台访问）

| 模型 | 访问方式 |
|------|---------|
| Nano Banana (Gemini 2.5 Flash Image) | API |
| Nano Banana Pro (Gemini 3 Pro Image) | API |
| Imagen 4 | API |
| GPT-Image-1 / DALL-E 3 | API |
| Midjourney v6/v7 | Discord / Web |
| Ideogram 3.0 | API / Web |
| Leonardo.ai | API / Web |
| SeedDream 4.5 | API |
| Recraft v3 | API / Web |
| Adobe Firefly | API / Creative Cloud |
| Playground v3 | Web |

---

## 七、关键洞察与选型建议

### 关键趋势

1. **多模态融合**: 2025-2026 年主流趋势是将图片生成能力融入多模态大语言模型（如 Gemini、GPT），而非独立的图像生成模型
2. **分辨率竞赛**: 多款工具已支持 4K 甚至 16MP 输出，高分辨率成为标配
3. **文字渲染突破**: Ideogram 3.0、Recraft v3、SeedDream 4.5 在文字渲染方面取得显著突破
4. **MCP 生态兴起**: 大部分工具已有 MCP Server 支持，Recraft 更提供官方 MCP Server
5. **开源与闭源并行**: 开源模型（SD、FLUX、Kolors）持续进步，但闭源模型在质量上仍保持优势

### 选型建议

| 场景 | 推荐工具 | 理由 |
|------|---------|------|
| **最高性价比 API** | Imagen 4 Fast ($0.02/张), FLUX.2 [klein] ($0.014/张) | 最低单张价格 |
| **最高分辨率** | GPT-Image-1 (4096x4096), Recraft v3 (16MP), SeedDream 4.5 (4096x4096), Nano Banana Pro (4K) | 支持超高分辨率输出 |
| **最强文字渲染** | Ideogram 3.0 (~90% 准确率), Recraft v3, SeedDream 4.5 | 文字准确性行业领先 |
| **最佳矢量图** | Recraft v3 | 唯一原生 SVG 生成 |
| **最佳本地部署** | SD 3.5 + ComfyUI, FLUX.2 [klein/dev] | 开源可部署，生态丰富 |
| **最佳商业安全性** | Adobe Firefly | 全部使用合法授权数据训练 |
| **最佳中文支持** | Kolors (快手), SeedDream (字节跳动) | 中文场景理解能力极强 |
| **最快速度** | SDXL Turbo / LCM (2-8 步实时), Gemini 2.5 Flash Image (3.2 秒) | 极低延迟 |
| **最佳 MCP 生态** | Recraft v3 (官方 MCP), Google/OpenAI 系列 (丰富社区 MCP) | MCP 集成最完善 |
| **最全能平台** | Leonardo.ai (图像+视频+3D+Canvas), Adobe Firefly (Creative Cloud 全套) | 综合创意工具集 |

---

## 八、参考来源

- [Google Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Google Developers Blog - Gemini 2.5 Flash Image](https://developers.googleblog.com/introducing-gemini-2-5-flash-image/)
- [Google Developers Blog - Nano Banana Pro](https://blog.google/innovation-and-ai/products/nano-banana-pro/)
- [Google Developers Blog - Imagen 4](https://developers.googleblog.com/imagen-4-now-available-in-the-gemini-api-and-google-ai-studio/)
- [OpenAI Pricing](https://platform.openai.com/docs/pricing)
- [OpenAI GPT Image 1 Model](https://platform.openai.com/docs/models/gpt-image-1)
- [Midjourney Documentation](https://docs.midjourney.com/hc/en-us)
- [Stability AI - Introducing SD 3.5](https://stability.ai/news/introducing-stable-diffusion-3-5)
- [Black Forest Labs - FLUX Pricing](https://bfl.ai/pricing)
- [Black Forest Labs - FLUX.2](https://bfl.ai/blog/flux-2)
- [Ideogram API Pricing](https://ideogram.ai/features/api-pricing)
- [Leonardo.ai Pricing](https://leonardo.ai/pricing)
- [SeedDream 4.5 BytePlus](https://www.byteplus.com/en/product/Seedream)
- [Recraft API](https://www.recraft.ai/api)
- [Recraft MCP Server](https://github.com/recraft-ai/mcp-recraft-server)
- [Adobe Firefly API](https://developer.adobe.com/firefly-services/docs/firefly-api/)
- [Kolors - HuggingFace](https://huggingface.co/Kwai-Kolors/Kolors)
- [Kolors - GitHub](https://github.com/Kwai-Kolors/Kolors)
- [Playground v3 Technical Report](https://playground.com/pg-v3)
- [SDXL Turbo - HuggingFace](https://huggingface.co/stabilityai/sdxl-turbo)
- [LCM-SDXL - HuggingFace](https://huggingface.co/latent-consistency/lcm-sdxl)
