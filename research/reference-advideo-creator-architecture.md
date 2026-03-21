# 参考案例：AI Video Ad Generator with Claude + MCP

> 原文：https://dev.to/qays_kadhim_c3fea1c94957f/i-built-an-ai-video-ad-generator-with-claude-mcp-heres-the-architecture-1kei
> 保存时间：2026-03-16

---

## 概述

一位开发者用 Claude + 单个 MCP Server 构建了完整的 AI 广告视频生成器。

- **MCP Server**：Python，通过 stdio JSON-RPC 通信
- **45 个 Tools** — 项目管理、图片生成、语音合成、视频合成、质量评分、品牌档案、素材搜索
- **12 个 Resources** — 平台规格、风格预设、评分标准、定价信息、语音目录、广告模板
- **8 个 Prompts** — 系统指令、脚本评分逻辑、素材评估规则
- **单条广告成本**：$0.01（最低配置）— $0.15（全功能配置）

---

## 15 步 Pipeline

<p align="center">
  <img src="images/ai-pipeline-9-steps.png" alt="AI Pipeline Steps" width="600">
</p>

Claude 不遵循硬编码工作流，而是读取所有 45 个工具描述后**自主决定调用顺序**：

```
Brief → 模板选择 → 项目创建 → 脚本撰写
→ 脚本自评分（8.0/10 阈值）→ 图片生成（Gate 1）
→ 配音生成（Gate 2）→ 音乐生成（Gate 3）
→ 跨素材一致性检查（Gate 4）→ 视频合成（Gate 5）
→ 字幕添加 → 导出 → 交付
```

**关键洞察**："Claude sees all 45 tools and figures out which ones to call and when."

---

## 各阶段工具分配

| 阶段 | 主工具 | Fallback |
|------|--------|----------|
| **图片生成** | Replicate (Flux Schnell, $0.003/张) | HuggingFace → 本地 SDXL |
| **配音** | ElevenLabs ($0.06/条) | OpenAI TTS ($0.003/条) |
| **音乐** | AI 生成 + librosa 分析 | — |
| **素材搜索** | Pexels API (免费) | — |
| **视频合成** | FFmpeg 管道 | — |
| **字幕** | Pillow 文本渲染 (支持 RTL) | — |
| **质量评分** | CLIP 相似度 / Whisper 转录 / librosa BPM | — |

---

## 5 个质量门控（Quality Gates）

| Gate | 评估对象 | 评估方法 | 阈值 |
|------|---------|---------|------|
| 1 | 场景图片 | CLIP 相似度 + 安全区域合规 | 7.0/10 |
| 2 | 配音 | Whisper 转录对比 + WPM 验证 | 7.5/10 |
| 3 | 音乐 | BPM 提取 + 循环检测 | 7.0/10 |
| 4 | 跨素材一致性 | 色彩聚类 + 节奏关联 | 6.5/10 |
| 5 | 最终合成 | 时长精度 + 音频平衡 | 7.5/10 |

**关键机制**："Always retry from the original parameters with a targeted fix, never modify the previous retry's parameters."（防止创意漂移）

---

## 脚本预评估

在昂贵的素材生成之前，Claude 按 6 个维度对脚本自评分：

| 维度 | 权重 |
|------|------|
| Hook 吸引力 | 25% |
| 情感吸引力 | 20% |
| CTA 清晰度 | 20% |
| 受众定位 | 15% |
| 节奏流畅 | 10% |
| 记忆点 | 10% |

脚本需 ≥ 8.0/10，最多 3 轮重写。

---

## 多语言支持（阿拉伯语 RTL 案例）

- HarfBuzz 文本整形（通过 Pillow）
- 语音稳定性参数：阿拉伯语 0.50 vs 默认 0.35
- WPM 范围：阿拉伯语 100-140 / 英语 130-170
- Whisper 对比前的文本归一化（去除变音符号）

---

## Fallback 分层策略

```
Replicate (Flux Schnell, $0.003)
    ↓ 失败/超时
HuggingFace (免费推理 API)
    ↓ 失败/超时
本地 SDXL (无成本，需 GPU)
```

添加新 provider API Key 自动升级 pipeline；移除则优雅降级。

---

## 成本结构

| 配置 | 单条广告成本 | 要求 |
|------|------------|------|
| 最低 | ~$0.01 | 仅需 Anthropic API Key |
| 全功能 | $0.10-$0.15 | 所有 provider API Key |

---

## 架构教训

1. **清晰的工具描述 = 自主编排**：Claude 仔细阅读工具描述，不需要硬编码工作流
2. **质量门控消除概率性输出**：CLIP/Whisper/librosa 信号处理使输出可控，额外开销仅 5-10%
3. **MCP 关注点分离加速开发**：可通过 MCP Inspector 独立测试工具，无需 Claude API 调用
4. **运行时资源发现**：tools/list、resources/list 调用让新能力自动被发现，无需修改客户端

---

## 待探索方向

- ControlNet 关键帧一致性（长视频）
- 跨广告模板类型的基准对比
- 平台特定视频规格优化
