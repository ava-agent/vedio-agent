---
prev:
  text: '营销视频制作'
  link: '/workflows/marketing-video'
next:
  text: '音频内容制作'
  link: '/workflows/audio-production'
---

# AI 图文内容创作

> 文案 + 配图一站式制作，覆盖公众号、小红书、博客等场景

<WorkflowStepper :steps="['文案撰写', '封面设计', '文章配图', '矢量图标']" />

<CostEstimate :items="[
  { step: '文案撰写', tool: 'Claude / GPT-4o', cost: '~$0.01' },
  { step: '封面图', tool: 'GPT-Image-1 / Ideogram', cost: '~$0.04' },
  { step: '配图 (3张)', tool: 'FLUX.2 / Imagen 4', cost: '~$0.04-$0.06' },
  { step: '矢量图标', tool: 'Recraft v3', cost: '~$0.02' },
]" total="~$0.11-$0.13" />

---

## Step 1: 文案撰写

<PromptCard
  title="多平台文案生成器"
  platform="Claude / ChatGPT / Gemini"
  :params="['topic', 'platform_type', 'word_count', 'style']"
  template="你是一位专业的内容创作者。请为以下主题撰写一篇适合{{platform_type}}发布的文章。
主题：{{topic}}
字数：约{{word_count}}字
风格：{{style}}
要求：
1. 标题吸引眼球，适合{{platform_type}}的调性
2. 开头 3 句话内抓住读者
3. 正文结构清晰，善用小标题和分段
4. 包含 3-5 处配图建议（用【配图：描述】标注）
5. 结尾有互动引导（点赞/收藏/关注）
请同时给出：
- SEO 关键词（5个）
- 摘要（50字内）
- 配图提示词（英文，可直接用于 AI 生图）"
  mcp-command="claude '为{{platform_type}}写一篇关于{{topic}}的文章'"
  cost-estimate="~$0.01/篇"
/>

### 不同平台的文案调性

| 平台 | 推荐字数 | 风格要求 | 配图数量 |
|------|---------|---------|---------|
| 公众号 | 1500-3000 | 深度分析，专业严谨 | 3-8 张 |
| 小红书 | 300-800 | 轻松活泼，emoji 多 | 6-9 张 |
| 知乎 | 2000-5000 | 数据驱动，逻辑严密 | 3-5 张 |
| 博客/官网 | 1000-2000 | SEO 友好，结构化 | 2-4 张 |

---

## Step 2: 封面图设计

<PromptCard
  title="文章封面图生成"
  platform="GPT-Image-1 / Ideogram / FLUX.2"
  :params="['title_text', 'theme_color', 'visual_style']"
  template="Design a blog cover image for an article titled '{{title_text}}'.
Visual style: {{visual_style}}
Color theme: {{theme_color}}
Requirements:
- Clean, modern design
- The title text '{{title_text}}' should be clearly readable
- 16:9 aspect ratio
- Professional quality, suitable for social media sharing
- No watermarks"
  cost-estimate="~$0.04/张"
/>

> **带文字的封面图首选 Ideogram 3.0** — 目前 AI 图片生成工具中文字渲染效果最好

### 封面图工具推荐

| 场景 | 推荐工具 | 理由 |
|------|---------|------|
| 有文字标题 | Ideogram 3.0 | 文字渲染精准 |
| 写实配图 | Imagen 4 / GPT-Image-1 | 指令遵循好 |
| 插画风格 | FLUX.2 / Midjourney | 艺术质量高 |
| 需要 SVG | Recraft v3 | 唯一支持矢量输出 |

<GeneratePanel type="image" />

---

## Step 3: 文章配图

<PromptCard
  title="文章插图批量生成"
  platform="FLUX.2 / Imagen 4 / Stability AI"
  :params="['image_description', 'art_style', 'color_palette']"
  template="{{image_description}}
Art style: {{art_style}}
Color palette: {{color_palette}}
Clean background, professional illustration, high resolution
No text, no watermark, suitable for blog article"
  mcp-command="claude mcp add flux npx -y image-generation-mcp-server && 生成配图"
  cost-estimate="~$0.014-$0.04/张"
/>

### 批量生成技巧

```bash
# 在 Claude Code 中一次性生成多张风格统一的配图
claude "请为我的文章生成 5 张配图，主题是 [你的主题]，
       风格统一为扁平插画风，颜色以蓝色为主调。
       每张图的内容分别对应文章的 5 个小节。"
```

---

## Step 4: 矢量图标/图表

<PromptCard
  title="SVG 矢量图标生成"
  platform="Recraft v3"
  :params="['icon_description', 'icon_style']"
  template="Create a vector icon: {{icon_description}}
Style: {{icon_style}}
Format: SVG vector, flat design, single color with accent
Clean lines, minimal details, suitable for web and print"
  mcp-command="claude mcp add recraft npx -y @recraft-ai/mcp-recraft-server && 生成SVG图标"
  cost-estimate="~$0.02/个"
/>

> **Recraft v3 是目前唯一支持 SVG 矢量输出的 AI 生图工具**，非常适合生成图标、logo 和信息图

---

## 完整 Claude Code 流程

```bash
# 安装工具
claude mcp add gemini-image npx -y gemini-imagen4
claude mcp add recraft npx -y @recraft-ai/mcp-recraft-server
claude mcp add ideogram npx -y ideogram-mcp-server

# 一键生成
claude "帮我制作一篇小红书图文，主题是 [你的主题]，
       包括文案、封面图、3张配图，风格统一"
```

---

*更多工具信息：[图片工具](/tools/image) · [对比总览](/guide/comparison) · [MCP 集成](/guide/mcp-integration)*
