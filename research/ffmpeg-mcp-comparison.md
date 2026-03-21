# FFmpeg MCP Server 市场调研

> 调研时间：2026-03-17
> 本机 FFmpeg 版本：8.0.1（已安装，功能完整）
> 数据来源：GitHub API + PyPI Stats（2026-03-17 抓取）

---

## 〇、社区数据总览

| 项目 | ⭐ Stars | 🍴 Forks | 👥 贡献者 | 📝 总提交 | 📅 最后提交 | 📦 PyPI 月下载 | 📋 License |
|------|---------|---------|----------|----------|-----------|-------------|-----------|
| **ffmpeg-mcp (video-creator)** | **125** | 24 | 2 | 15 | 2025-05-13 | — | MIT |
| **ffmpeg-mcp (egoist)** | **120** | 7 | 1 | 9 | 2025-03-29 | ~560 (npm) | 无 |
| **video-audio-mcp** | 65 | 14 | 1 | 6 | 2025-05-24 | — | MIT |
| **Video Editor MCP** | 48 | 15 | 1 | 2 | 2025-01-04 | ~111 | 无 |
| **mcp-ffmpeg (bitscorp)** | 47 | 17 | 3 | 26 | **2026-02-22** | — | 无 |
| **ffmpeg-mcp-lite** | 21 | 2 | 1 | 7 | 2026-01-08 | 163 | MIT |
| **VFX-MCP** | 6 | 3 | 1 | 12 | 2025-07-21 | 55 | MIT |

### 关键发现

1. **Star 最高的两个（125/120）都已停止维护**——ffmpeg-mcp (video-creator) 最后提交 2025-05，egoist 版最后提交 2025-03，均超过 9 个月未更新
2. **唯一在 2026 年还有活跃提交的是 bitscorp（2026-02）和 ffmpeg-mcp-lite（2026-01）**
3. **所有项目都是 1-3 人的个人项目**，无一有真正的社区协作
4. **功能最强的 video-audio-mcp（30+ 工具）仅 6 次提交**——意味着它是"一次性交付"而非持续迭代
5. **没有一个项目同时满足"高活跃度 + 功能全面 + 质量可靠"**

---

## 一、市场上的 FFmpeg MCP 汇总

共找到 **7 个** 主要 FFmpeg MCP Server 实现：

### 1. video-audio-mcp（⭐ 推荐）

- **作者**：misbahsy
- **GitHub**：https://github.com/misbahsy/video-audio-mcp
- **语言**：Python
- **工具数**：**30+**
- **安装**：`git clone` + `uv sync`

**工具清单**：

| 类别 | 工具 |
|------|------|
| 视频格式 | `convert_video_format`, `convert_video_properties` (MP4/MOV/AVI) |
| 分辨率/质量 | `set_video_resolution`, `set_video_bitrate`, `set_video_codec` (H.264/H.265/VP9) |
| 时间操作 | `set_video_frame_rate`, `change_video_speed` (慢动作/延时) |
| 宽高比 | `change_aspect_ratio` (填充/裁切) |
| 音频提取 | `extract_audio_from_video`, `trim_video` |
| 音频格式 | `convert_audio_format` (MP3/WAV/AAC) |
| 音频属性 | `set_audio_bitrate`, `set_audio_sample_rate`, `set_audio_channels` |
| 视频音轨 | `set_video_audio_track_codec`, `set_video_audio_track_bitrate` 等 |
| **叠加效果** | `add_text_overlay`, `add_image_overlay` (定位+时间控制) |
| **字幕** | `add_subtitles` (自定义样式/字体) |
| **转场** | `add_basic_transitions` (淡入淡出), `concatenate_videos` (交叉溶解) |
| **B-roll** | `add_b_roll` (带转场插入) |
| 静音移除 | `remove_silence` (自动去除静默段) |
| 健康检查 | `health_check` |

**优势**：工具数量最多，覆盖最全面，每个操作独立工具（Claude 更容易理解和选择）
**劣势**：需要 clone 仓库运行，非 npm/pip 一键安装

---

### 2. VFX-MCP

- **作者**：conneroisu
- **GitHub**：https://github.com/conneroisu/vfx-mcp
- **语言**：Python (FastMCP + ffmpeg-python)
- **工具数**：**10+**
- **安装**：`pip install vfx-mcp` 然后 `vfx-mcp`

**工具清单**：

| 工具 | 功能 |
|------|------|
| `trim_video` | 按起止时间裁剪 |
| `concatenate_videos` | 拼接 + 可选转场 |
| `convert_format` | 格式转换 + 编码器选择 |
| `resize_video` | 缩放 + 宽高比控制 |
| `extract_audio` | 提取为 MP3/WAV/AAC |
| `add_audio` | 替换或混合音轨 |
| `apply_filter` | 应用 FFmpeg 滤镜（模糊/翻转等） |
| `change_speed` | 变速播放 |
| `generate_thumbnail` | 提取帧为图片 |
| `get_video_info` | 获取元数据 |

**优势**：pip 一键安装，模块化架构（tools/basic.py, tools/transform.py 等分离），支持进度报告
**劣势**：需要 Python 3.13+

---

### 3. ffmpeg-mcp-lite

- **作者**：kevinwatt
- **GitHub**：https://github.com/kevinwatt/ffmpeg-mcp-lite
- **语言**：Python
- **工具数**：**8**
- **安装**：`claude mcp add ffmpeg uvx ffmpeg-mcp-lite`（最简单）

**工具清单**：

| 工具 | 功能 |
|------|------|
| 媒体分析 | 元数据获取（时长/分辨率/编码器/比特率） |
| 格式转换 | 任意格式互转 + 自定义编码器 |
| 压缩 | 低/中/高质量预设 + H.264 压缩 |
| 裁剪 | 精确时间段裁剪（stream copy 免重编码） |
| 音频提取 | MP3/AAC/WAV/FLAC/OGG/Opus |
| 帧提取 | 按间隔或帧数导出 JPG/PNG/BMP |
| 视频合并 | 多视频拼接 |
| **字幕烧录** | SRT/ASS/VTT + 4 种样式（描边/阴影/背景/发光） |

**优势**：安装最简单（uvx 一行搞定），异步处理，31 个测试用例，工具带 `ffmpeg_` 前缀避免冲突
**劣势**：功能较少，不支持叠加/转场/水印

---

### 4. Video Editor MCP

- **作者**：Kush36Agrawal
- **GitHub**：https://github.com/Kush36Agrawal/Video_Editor_MCP
- **语言**：Python
- **工具数**：**1**（通用 `execute_ffmpeg`）
- **安装**：`uv add video-editor`

**设计**：一个通用工具接收 FFmpeg 命令字符串，内置验证 + 进度跟踪 + 错误处理

**优势**：最灵活（任何 FFmpeg 命令都能执行），安全验证
**劣势**：单工具设计，Claude 难以按功能选择；依赖 Claude 自己构造 FFmpeg 命令

---

### 5. ffmpeg-mcp (video-creator)

- **作者**：video-creator
- **GitHub**：https://github.com/video-creator/ffmpeg-mcp
- **语言**：Python
- **工具数**：**8**
- **安装**：`git clone` + `uv sync`

**工具清单**：

| 工具 | 功能 |
|------|------|
| `find_video_path` | 递归搜索本地视频文件 |
| `get_video_info` | 获取元数据 |
| `clip_video` | 裁剪 |
| `concat_videos` | 拼接（自动检测属性一致性） |
| `play_video` | ffplay 播放 |
| `overlay_video` | 两个视频叠加合成 |
| `scale_video` | 缩放（保持比例） |
| `extract_frames_from_video` | 帧提取（PNG/JPG/WEBP） |

**优势**：有本地文件搜索 + 播放功能
**劣势**：仅 macOS，无字幕/音频处理

---

### 6. ffmpeg-mcp (egoist)

- **作者**：egoist
- **GitHub**：https://github.com/egoist/ffmpeg-mcp
- **语言**：TypeScript
- **工具数**：待确认（早期阶段）
- **安装**：`npx -y ffmpeg-mcp`

**优势**：TypeScript 实现，npx 一键运行，极简
**劣势**：早期开发阶段，功能待完善

---

### 7. mcp-ffmpeg (bitscorp)

- **作者**：bitscorp-mcp
- **GitHub**：https://github.com/bitscorp-mcp/mcp-ffmpeg
- **语言**：Node.js
- **工具数**：~5
- **安装**：npm

**优势**：简单入门
**劣势**：功能最少，仅 resize + 音频提取

---

## 二、对比矩阵

| 维度 | video-audio-mcp | VFX-MCP | ffmpeg-mcp-lite | Video Editor | ffmpeg-mcp (vc) | ffmpeg-mcp (egoist) | mcp-ffmpeg |
|------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **工具数量** | 30+ | 10+ | 8 | 1 | 8 | ? | ~5 |
| **格式转换** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **裁剪** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **拼接** | ✅ 带转场 | ✅ 带转场 | ✅ | ✅ | ✅ | ? | ❌ |
| **字幕烧录** | ✅ | ❌ | ✅ 4种样式 | ✅ | ❌ | ? | ❌ |
| **文字/图片叠加** | ✅ | ✅ | ❌ | ✅ | ✅ | ? | ❌ |
| **音视频合成** | ✅ | ✅ | ✅ | ✅ | ❌ | ? | ✅ |
| **转场效果** | ✅ 淡入淡出 | ✅ | ❌ | ✅ | ❌ | ? | ❌ |
| **B-roll 插入** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **静音移除** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **变速** | ✅ | ✅ | ❌ | ✅ | ❌ | ? | ❌ |
| **帧提取** | ❌ | ✅ | ✅ | ✅ | ✅ | ? | ❌ |
| **本地播放** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **安装难度** | 中 (clone) | 低 (pip) | **最低 (uvx)** | 低 (uv) | 中 (clone) | **最低 (npx)** | 低 (npm) |
| **语言** | Python | Python | Python | Python | Python | TypeScript | Node.js |
| **成熟度** | ★★★★ | ★★★ | ★★★ | ★★★ | ★★ | ★ | ★ |

---

## 三、深度评估（结合你的场景）

### 你的需求画像

作为自研了 mcp-image / mcp-video-gen / mcp-3d-gen 的开发者，你需要：
1. **合成能力**：图片+视频+配音+BGM → 最终成品（P0）
2. **字幕烧录**：社交媒体必备（P0）
3. **水印/叠加**：品牌 Logo（P1）
4. **转场/拼接**：多片段组合（P1）
5. **多平台导出**：16:9 / 9:16 / 1:1（P1）
6. **可维护性**：你可能需要 fork 后定制

### 逐项评估

#### ❌ 排除的项目

| 项目 | 排除原因 |
|------|---------|
| **ffmpeg-mcp (egoist)** | Star 高但 2025-03 停更，功能不明确，无 license |
| **Video Editor MCP** | 2 次提交，单工具设计，无 license，本质是让 Claude 自己写 ffmpeg 命令 |
| **mcp-ffmpeg (bitscorp)** | 功能太少（仅 resize + 音频提取），无 license |
| **VFX-MCP** | Star 最低（6），PyPI 月下载仅 55，需 Python 3.13+，不支持字幕 |

#### 🔍 剩余 3 个候选

| 维度 | ffmpeg-mcp (video-creator) | video-audio-mcp | ffmpeg-mcp-lite |
|------|:-:|:-:|:-:|
| ⭐ Stars | **125** | 65 | 21 |
| 功能覆盖 | 中（8 工具，无字幕/音频） | **最全（30+，含 B-roll/转场/静音移除）** | 基础（8 工具，有字幕） |
| 最后提交 | 2025-05 ⚠️ | 2025-05 ⚠️ | **2026-01** |
| 代码质量 | 中 | 中 | **高（31 测试、类型标注、mypy）** |
| 安装 | git clone | git clone | **`uvx` 一行** |
| 字幕 | ❌ | ✅ | ✅ 4种样式 |
| 水印/叠加 | ✅ overlay_video | ✅ text+image overlay | ❌ |
| 音视频合成 | ❌ | ✅ | ✅ |
| 转场 | ❌ | ✅ 淡入淡出 | ❌ |
| 你的定制性 | 中（47KB 仓库） | 中（13MB 仓库） | **高（43KB，模块清晰）** |
| 工具命名冲突 | 可能 | 可能 | **无（`ffmpeg_` 前缀）** |

---

## 四、最终推荐

### 🏆 推荐：ffmpeg-mcp-lite + 按需自研补充

**理由**：

1. **唯一在 2026 年维护的 Python 项目**——其他两个 2025-05 后无更新
2. **安装最简单**——`claude mcp add ffmpeg uvx ffmpeg-mcp-lite`，零配置
3. **代码质量最高**——31 个测试、类型标注、异步处理、`ffmpeg_` 前缀避免与你的 MCP 冲突
4. **覆盖你的 P0 需求**——格式转换、裁剪、拼接、音频提取、**字幕烧录（4 种样式）**
5. **最适合定制**——43KB 极简代码，模块化设计（一个文件一个工具），fork 后扩展成本低

**缺失的能力通过以下方式补充**：

| 缺失能力 | 补充方案 |
|----------|---------|
| 水印/图片叠加 | fork ffmpeg-mcp-lite 自研 `ffmpeg_add_overlay` 工具 |
| 转场效果 | fork 自研 `ffmpeg_add_transition` 工具 |
| 音视频混合 | Claude 可直接通过 Bash 调本机 FFmpeg 命令（你已有 8.0.1） |
| 多平台导出 | fork 自研 `ffmpeg_export_multi_format` 工具 |

这与你自研 MCP 的风格一致——**先用最小可用版本跑通，再按需增强**。

### 备选：如果你不想自研

直接用 **video-audio-mcp**（30+ 工具最全面），接受它的风险：
- 2025-05 后未更新
- 仅 1 人 6 次提交，无测试
- 13MB 仓库体积较大

```bash
# 推荐方案安装
claude mcp add ffmpeg uvx ffmpeg-mcp-lite

# 备选方案安装
git clone https://github.com/misbahsy/video-audio-mcp.git
cd video-audio-mcp && uv sync
claude mcp add-json "VideoAudioServer" '{"command":"uv","args":["--directory","'$(pwd)'","run","server.py"]}'
```

---

## 参考链接

- [video-audio-mcp](https://github.com/misbahsy/video-audio-mcp) — 30+ 工具，功能最全
- [VFX-MCP](https://github.com/conneroisu/vfx-mcp) — FastMCP 架构，pip 安装
- [ffmpeg-mcp-lite](https://github.com/kevinwatt/ffmpeg-mcp-lite) — 轻量级，代码质量最高
- [Video Editor MCP](https://github.com/Kush36Agrawal/Video_Editor_MCP) — 单工具设计
- [ffmpeg-mcp (video-creator)](https://github.com/video-creator/ffmpeg-mcp) — Star 最高，含本地搜索/播放
- [ffmpeg-mcp (egoist)](https://github.com/egoist/ffmpeg-mcp) — TypeScript，极简
- [mcp-ffmpeg (bitscorp)](https://github.com/bitscorp-mcp/mcp-ffmpeg) — Node.js，功能最少
