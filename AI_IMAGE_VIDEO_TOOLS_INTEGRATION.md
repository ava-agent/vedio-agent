# Claude Code 集成 AI 图片/视频工具调研报告

> 调研日期：2026-02-19

## 目录

- [一、Claude Code 原生多媒体能力](#一claude-code-原生多媒体能力)
- [二、Seedance（字节跳动 - AI 视频生成）](#二seedance字节跳动---ai-视频生成)
- [三、Gemini（Google - 图片 + 视频生成）](#三geminingoogle---图片--视频生成)
- [四、Nano Banana（Gemini 原生图片生成模型）](#四nano-bananagemini-原生图片生成模型)
- [五、其他值得关注的 AI 视频 MCP Server](#五其他值得关注的-ai-视频-mcp-server)
- [六、推荐集成方案](#六推荐集成方案)
- [七、自建 MCP Server 参考](#七自建-mcp-server-参考)

---

## 一、Claude Code 原生多媒体能力

### 1.1 图片处理（原生支持，无需安装）

| 方式       | 说明                                            |
| ---------- | ----------------------------------------------- |
| Read 工具  | 直接读取 PNG/JPG/GIF/WebP 文件，Claude 会"看到"图片 |
| 拖拽       | 将图片拖入 Claude Code 终端窗口                 |
| 粘贴       | 从剪贴板粘贴截图 (Ctrl+V)                       |
| 路径引用   | 直接说"分析这张图片：/path/to/image.png"         |

**支持能力：** OCR 文字识别、UI 截图分析、图表解读、设计稿转代码。每轮最多 20 张图片。

### 1.2 视频处理（不原生支持）

Claude Code 无法直接读取或分析视频文件。变通方案：

```bash
# 方案 A：ffmpeg 抽帧 → 图片分析
ffmpeg -i video.mp4 -vf fps=1 -q:v 2 frames/frame_%04d.png

# 方案 B：提取音频 → whisper 转文字
ffmpeg -i video.mp4 -vn -acodec pcm_s16le audio.wav
```

---

## 二、Seedance（字节跳动 - AI 视频生成）

### 2.1 概述

| 项目     | 详情                                                       |
| -------- | ---------------------------------------------------------- |
| 开发商   | ByteDance（字节跳动）                                       |
| 能力     | 文本生成视频、图片生成视频、多镜头叙事、唇形同步（8+语言）  |
| 分辨率   | 最高 2K，支持多种比例（16:9, 9:16, 4:3, 3:4, 21:9, 1:1）   |
| 时长     | 4-15 秒/片段                                                |
| 输入     | 最多 9 张图片 + 3 个视频 + 3 个音频                         |

### 2.2 模型版本

| 版本              | 说明                          |
| ----------------- | ----------------------------- |
| Seedance 1.0 Pro  | 基础模型，1080p HD            |
| Seedance 1.0 Pro Fast | 3x 更快，72% 更便宜       |
| Seedance 1.5 Pro  | 改进质量，通过 BytePlus 提供  |
| Seedance 2.0      | 最新版本，最高质量            |

### 2.3 API 接入

**官方 API（v1.0/1.5）—— BytePlus ModelArk：**

- 文档：https://docs.byteplus.com/en/docs/ModelArk/Video_Generation_API
- 认证：API Key
- 兼容 OpenAI API 协议

**第三方 API（v2.0）—— xskill.ai：**

- 创建任务：`POST https://api.xskill.ai/api/v3/tasks/create`
- 查询任务：`POST https://api.xskill.ai/api/v3/tasks/query`
- 认证：`Authorization: Bearer sk-your-api-key`
- 模型 ID：`st-ai/super-seed2`
- 定价：~$0.10/min (720p) ~ $0.80/min (2K)

### 2.4 MCP 集成

```bash
claude mcp add seedance -- npx -y mcp-remote https://api.xskill.ai/api/v3/mcp-http
```

完整配置：

```json
{
  "mcpServers": {
    "sutui-ai": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://api.xskill.ai/api/v3/mcp-http"],
      "env": {
        "SUTUI_API_KEY": "sk-your-api-key"
      }
    }
  }
}
```

### 2.5 SDK

| 语言       | 包名                          | 安装命令                                                  |
| ---------- | ----------------------------- | --------------------------------------------------------- |
| Python     | byteplus-python-sdk-v2        | `pip install byteplus-python-sdk-v2`                      |
| Go         | byteplus-go-sdk-v2            | `go get github.com/byteplus-sdk/byteplus-go-sdk-v2`      |
| Java       | byteplus-java-sdk-v2-ark-runtime | Maven/Gradle                                           |
| Node.js    | seedance-2 (社区)             | `npm i seedance-2`                                        |

### 2.6 参考链接

- GitHub: https://github.com/hexiaochun/seedance2-api
- 官网: https://seedance.io/
- BytePlus: https://www.byteplus.com/en/product/seedance

---

## 三、Gemini（Google - 图片 + 视频生成）

### 3.1 图片生成能力

| 模型             | Model ID                        | 特点                       | 价格         |
| ---------------- | ------------------------------- | -------------------------- | ------------ |
| Imagen 4         | `imagen-4.0-generate-001`       | 专业文生图，4K              | $0.04/张     |
| Imagen 4 Ultra   | `imagen-4.0-ultra-generate-001` | 更高保真度                  | $0.06/张     |
| Imagen 4 Fast    | `imagen-4.0-fast-generate-001`  | 最快/最便宜                 | $0.02/张     |
| Nano Banana      | `gemini-2.5-flash-image`        | 对话式生成/编辑             | ~$0.039/张   |
| Nano Banana Pro  | `gemini-3-pro-image-preview`    | 专业级，4K，高级推理        | 较高         |

### 3.2 视频生成能力（Veo）

| 模型           | Model ID                        | 特点                        | 价格         |
| -------------- | ------------------------------- | --------------------------- | ------------ |
| Veo 3.1        | `veo-3.1-generate-preview`      | 8 秒视频，720p-4K，含原生音频 | $0.40/秒    |
| Veo 3.1 Fast   | `veo-3.1-fast-generate-preview` | 更快生成                     | $0.15/秒    |

**Veo 3.1 能力：**
- 文本生成视频 / 图片生成视频（最多 3 张参考图）
- 横屏 (16:9) 和竖屏 (9:16)
- 原生音频（对话、音效、环境音）
- 视频续写（可延长至 1 分钟+）
- 指定首尾帧

### 3.3 MCP 集成（推荐 RLabs 方案）

```bash
# 一行命令安装，同时支持图片和视频生成
claude mcp add gemini -s user -- env GEMINI_API_KEY=YOUR_KEY npx -y @rlabs-inc/gemini-mcp
```

项目级配置（`.mcp.json`）：

```json
{
  "mcpServers": {
    "gemini": {
      "command": "npx",
      "args": ["-y", "@rlabs-inc/gemini-mcp"],
      "env": {
        "GEMINI_API_KEY": "your-api-key-here",
        "GEMINI_OUTPUT_DIR": "/path/to/output/directory"
      }
    }
  }
}
```

安装后可用工具：

| 工具名              | 功能                |
| ------------------- | ------------------- |
| `gemini-image`      | 文本生成图片        |
| `gemini-video`      | 文本生成视频        |
| `gemini-video-check`| 查询视频生成进度    |
| `gemini-query`      | 文本查询            |

### 3.4 其他 Gemini MCP Server

| MCP Server                                                                          | 特点                    |
| ----------------------------------------------------------------------------------- | ----------------------- |
| [sanxfxteam/gemini-mcp-server](https://github.com/sanxfxteam/gemini-mcp-server)    | 图片生成专注            |
| [bsmi021/mcp-gemini-server](https://github.com/bsmi021/mcp-gemini-server)          | 通用 Gemini 封装        |

### 3.5 SDK

**Node.js:**

```bash
npm install @google/genai
```

```javascript
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

// 图片生成
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-image",
  contents: "生成一张未来城市的日落图",
  config: { responseModalities: ["image", "text"] },
});

for (const part of response.candidates[0].content.parts) {
  if (part.inlineData) {
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync("output.png", buffer);
  }
}

// 视频生成
let operation = await ai.models.generateVideos({
  model: "veo-3.1-generate-preview",
  prompt: "山脉上空的电影级航拍镜头",
  config: { resolution: "720p", numberOfVideos: 1 },
});

while (!operation.done) {
  await new Promise((r) => setTimeout(r, 10000));
  operation = await ai.models.getVideoGenerationOperation({ operationName: operation.name });
}
```

**Python:**

```bash
pip install google-genai
```

```python
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_API_KEY")

# 图片生成
response = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=["生成一张未来城市的日落图"],
    config=types.GenerateContentConfig(response_modalities=["IMAGE", "TEXT"]),
)

for part in response.parts:
    if part.inline_data is not None:
        image = part.as_image()
        image.save("output.png")

# 视频生成
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt="山脉上空的电影级航拍镜头",
    config=types.GenerateVideosConfig(resolution="720p", number_of_videos=1),
)

while not operation.done:
    time.sleep(10)
    operation = client.models.get_video_generation_operation(operation.name)

for video in operation.response.generated_videos:
    client.files.download(file=video.video, download_path="output.mp4")
```

### 3.6 API Key 获取

前往 [Google AI Studio](https://aistudio.google.com/) 免费申请。

### 3.7 参考链接

- RLabs MCP: https://github.com/RLabs-Inc/gemini-mcp
- Gemini API 文档: https://ai.google.dev/gemini-api/docs
- Veo 文档: https://ai.google.dev/gemini-api/docs/video
- 图片生成文档: https://ai.google.dev/gemini-api/docs/image-generation

---

## 四、Nano Banana（Gemini 原生图片生成模型）

### 4.1 概述

Nano Banana 是 **Google Gemini 原生图片生成/编辑模型的昵称**，2025 年 8 月在 Arena 平台匿名上线后爆红，吸引 1000 万+ 新用户、2 亿+ 次图片编辑。

**核心能力：**
- 文本生成图片（最高 4K）
- 自然语言编辑图片（添加、删除、修改元素）
- 多轮对话式编辑（迭代优化）
- 角色一致性 & 场景保持
- 图片内文字渲染（信息图、菜单、图表）
- 风格迁移（最多 14 张参考图）
- 支持比例：1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

### 4.2 专用 MCP Server

**方案一：最简安装**

```bash
claude mcp add nanobanana -- npx -y @aeven/nanobanana-mcp@latest
```

**方案二：功能最全（YCSE）**

```bash
git clone https://github.com/YCSE/nanobanana-mcp.git
cd nanobanana-mcp && npm install && npm run build

claude mcp add nanobanana-mcp \
  -e GEMINI_API_KEY=your-key-here \
  -- node /path/to/nanobanana-mcp/dist/index.js
```

可用工具：

| 工具名                 | 功能                  |
| ---------------------- | --------------------- |
| `gemini_generate_image`| 文本生成图片          |
| `gemini_edit_image`    | 自然语言编辑图片      |
| `set_aspect_ratio`     | 设置图片比例          |
| `set_model`            | 切换 Flash / Pro 模型 |
| `gemini_chat`          | 对话（含图片上下文）  |
| `get_image_history`    | 查看生成历史          |
| `clear_conversation`   | 清除对话上下文        |

### 4.3 所有 Nano Banana MCP Server 对比

| MCP Server | npm / GitHub | 特点 |
| --- | --- | --- |
| @aeven/nanobanana-mcp | [npm](https://www.npmjs.com/package/@aeven/nanobanana-mcp) | 最易安装，npx 直接用 |
| YCSE/nanobanana-mcp | [GitHub](https://github.com/YCSE/nanobanana-mcp) | 功能全面，7 个工具，多轮编辑 |
| ConechoAI/Nano-Banana-MCP | [GitHub](https://github.com/ConechoAI/Nano-Banana-MCP) | 参考图支持、连续编辑 |
| zhongweili/nanobanana-mcp-server | [GitHub](https://github.com/zhongweili/nanobanana-mcp-server) | 轻量实现 |
| konigt6905/nano-banana-pro-mcp | [Glama](https://glama.ai/mcp/servers/@konigt6905/nano-banana-pro-mcp) | Pro 模型专注 |

---

## 五、其他值得关注的 AI 视频 MCP Server

| MCP Server | 后端模型 | 特点 | 链接 |
| --- | --- | --- | --- |
| Runway 官方 MCP | Runway Gen-3 | 官方维护，生成/编辑/超分，7 个工具 | [GitHub](https://github.com/runwayml/runway-api-mcp-server) |
| MiniMax MCP | MiniMax | 视频+图片+TTS+音乐，一站式 | [GitHub](https://github.com/MiniMax-AI/MiniMax-MCP) |
| ComfyUI MCP | 本地多模型 | 70+ 工作流，最全面（SD/SDXL/Flux/AnimateDiff/SVD/Mochi） | [GitHub](https://github.com/shawnrushefsky/comfyui-mcp) |
| MCPMidjourney | Midjourney | 15 个工具，含视频生成/扩展 | [GitHub](https://github.com/AceDataCloud/MCPMidjourney) |
| Replicate MCP | 数千模型 | 官方托管，最丰富模型库 | [mcp.replicate.com](https://mcp.replicate.com/) |
| Video Agent MCP | Kling 2.1 / Hailuo 02 | 场景管理、音频混合、视频装配 | [mcpservers.org](https://mcpservers.org/servers/h2a-dev/video-gen-mcp-monolithic) |
| Remotion Agent | Remotion (React) | 代码驱动的专业视频制作 | [mcpmarket.com](https://mcpmarket.com/tools/skills/remotion-video-generation-1770701548141) |

---

## 六、推荐集成方案

### 6.1 架构总览

```
┌──────────────────────────────────────────────────────────┐
│                      Claude Code                          │
│                                                           │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐ │
│  │ Seedance   │  │ Gemini     │  │ Nano Banana         │ │
│  │ MCP        │  │ MCP        │  │ MCP                 │ │
│  │ (视频生成) │  │ (视频生成) │  │ (图片生成/编辑)     │ │
│  └─────┬──────┘  └─────┬──────┘  └──────────┬──────────┘ │
└────────┼───────────────┼────────────────────┼────────────┘
         ▼               ▼                    ▼
    xskill.ai       Google API           Google API
    Seedance 2.0     Veo 3.1          Gemini Flash/Pro
```

### 6.2 快速启动（3 条命令）

```bash
# 1. 图片生成/编辑 - Nano Banana
claude mcp add nanobanana -- npx -y @aeven/nanobanana-mcp@latest

# 2. 图片 + 视频生成 - Gemini (Imagen4 + Veo 3.1)
claude mcp add gemini -s user -- env GEMINI_API_KEY=YOUR_KEY npx -y @rlabs-inc/gemini-mcp

# 3. 视频生成 - Seedance 2.0
claude mcp add seedance -- npx -y mcp-remote https://api.xskill.ai/api/v3/mcp-http
```

### 6.3 所需 API Key

| 服务 | 获取方式 | 费用 |
| --- | --- | --- |
| Google AI API Key | [aistudio.google.com](https://aistudio.google.com/) | 免费额度 |
| xskill.ai API Key | [xskill.ai](https://xskill.ai/) | 付费（按量） |

### 6.4 能力矩阵

| 能力 | Nano Banana MCP | Gemini MCP | Seedance MCP |
| --- | --- | --- | --- |
| 文本生成图片 | ✅ | ✅ | ❌ |
| 图片编辑 | ✅（对话式） | ❌ | ❌ |
| 文本生成视频 | ❌ | ✅ (Veo 3.1) | ✅ |
| 图片生成视频 | ❌ | ❌ | ✅ |
| 多镜头叙事 | ❌ | ❌ | ✅ |
| 原生音频 | ❌ | ✅ | ❌ |
| 唇形同步 | ❌ | ❌ | ✅ |
| 4K 分辨率 | ✅ (Pro) | ✅ | ✅ |

---

## 七、自建 MCP Server 参考

如果现有 MCP Server 不满足需求，可以自建：

### 7.1 TypeScript 模板

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-video-gen-server",
  version: "1.0.0",
});

server.tool(
  "generate_video",
  "Generate a video from a text prompt",
  {
    prompt: z.string().describe("视频描述"),
    duration: z.number().optional().describe("时长（秒）"),
  },
  async ({ prompt, duration }) => {
    const response = await fetch("https://api.example.com/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, duration: duration || 5 }),
    });
    const result = await response.json();
    return {
      content: [{ type: "text", text: `Video: ${result.video_url}` }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 7.2 Python 模板

```python
from mcp.server.fastmcp import FastMCP
import httpx, os

mcp = FastMCP("my-video-gen-server")

@mcp.tool()
async def generate_video(prompt: str, duration: int = 5) -> str:
    """从文本提示生成视频"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.example.com/v1/generate",
            headers={"Authorization": f"Bearer {os.environ['API_KEY']}"},
            json={"prompt": prompt, "duration": duration},
            timeout=300,
        )
        result = response.json()
    return f"Video: {result['video_url']}"

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

### 7.3 设计要点

1. **长任务轮询**：视频生成 30s-5min，使用「提交任务 → 返回 ID → check_status 工具」模式
2. **超时配置**：设置 `MCP_TOOL_TIMEOUT=1000000` (ms)
3. **文件下载**：生成的 URL 通常会过期（如 Runway 24 小时），需下载到本地
4. **工具拆分**：生成、查询状态、超分、编辑分为独立工具

### 7.4 参考资源

- MCP 官方 SDK: https://github.com/modelcontextprotocol/servers
- TypeScript 教程: https://www.freecodecamp.org/news/how-to-build-a-custom-mcp-server-with-typescript-a-handbook-for-developers/
- MCP Server 目录: https://mcpservers.org / https://mcp.so / https://www.pulsemcp.com
- Awesome MCP Servers: https://github.com/punkpeye/awesome-mcp-servers
