# MCP Content Styles 设计文档

**日期**: 2025-03-13
**作者**: KevinTen
**状态**: 已批准

---

## 1. 项目概述

mcp-content-styles 是一个轻量级的 MCP (Model Context Protocol) 服务器，专注于管理和返回各平台的内容创作 Prompt 模板。

### 1.1 核心价值

- **解耦内容创作和平台适配**：原始 Markdown 内容与平台风格分离
- **Prompt 模板化管理**：易于维护和扩展
- **双模式支持**：格式化转换 vs 智能重写
- **工具链集成**：配合现有 MCP 工具（mcp-image、mcp-video-gen 等）使用

### 1.2 目标用户

KevinTen - AI-Native Architect，需要将 Markdown 技术文章转换为适合发布到各平台的内容格式。

### 1.3 使用场景

```
原始 Markdown 文章
  ↓
mcp-content-styles（获取平台 Prompt）
  ↓
LLM 生成平台适配内容
  ↓
mcp-image / mcp-video-gen（生成素材）
  ↓
其他 MCP（发布到平台）
```

---

## 2. 系统架构

```
┌─────────────────────────────────────────────────────────┐
│                    mcp-content-styles                   │
│                    MCP 服务器                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   MCP Tools                                            │
│   ├─ get_platform_prompt()       # 获取平台 Prompt     │
│   ├─ list_platforms()            # 列出可用平台        │
│   ├─ convert_content()           # 转换内容            │
│   └─ get_skill_content()         # 获取模板内容        │
│                                                         │
│   Skill Manager                                        │
│   ├─ 加载 Markdown 模板                                │
│   ├─ 参数替换 (format())                              │
│   └─ 技能列表管理                                      │
│                                                         │
│   Skills/ (Markdown 文件)                              │
│   ├─ zhihu_article.md          # 知乎文章              │
│   ├─ wechat_article.md         # 公众号文章            │
│   ├─ xiaohongshu_note.md       # 小红书笔记            │
│   ├─ weibo_post.md             # 微博博文              │
│   └─ douyin_script.md          # 抖音脚本              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.1 数据流

```
用户调用 MCP Tool
  ↓
Skill Manager 加载对应 Markdown 模板
  ↓
参数替换 ({topic}, {original_content}, ...)
  ↓
返回完整 Prompt 模板
```

---

## 3. API 设计

### 3.1 核心工具

#### `get_platform_prompt(platform, content_type, mode, topic, original_content)`

获取指定平台的内容创作 Prompt 模板。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| platform | str | 是 | 平台名称: "zhihu", "wechat", "xiaohongshu", "weibo", "douyin" |
| content_type | str | 是 | 内容类型: "article", "note", "post", "script" |
| mode | str | 是 | 处理模式: "format" (格式化) / "rewrite" (重写) |
| topic | str | 否* | 主题（rewrite 模式建议提供） |
| original_content | str | 否* | 原始 Markdown 内容 |

*注：根据 mode 不同，某些参数为必填。

**返回值：**

```python
str  # 完整的 Prompt 模板，包含平台风格指南和格式要求
```

**示例：**

```python
# 格式化模式：只改格式，保持原意
prompt = get_platform_prompt(
    platform="xiaohongshu",
    content_type="note",
    mode="format",
    original_content="## 我的 AI 工具分享..."
)

# 重写模式：智能改写为小红书风格
prompt = get_platform_prompt(
    platform="xiaohongshu",
    content_type="note",
    mode="rewrite",
    topic="AI工具推荐",
    original_content="## 我的 AI 工具分享..."
)
```

---

#### `list_platforms()`

列出所有可用的平台和内容类型。

**返回值：**

```python
str  # 格式化的平台列表
```

**输出示例：**

```
📱 可用平台内容类型

📕 xiaohongshu: note, image
📝 zhihu: article, answer
📰 wechat: article
📢 weibo: post
🎬 douyin: script
```

---

#### `convert_content(markdown_content, platform, mode)`

直接转换 Markdown 内容为平台适配格式（包含使用说明）。

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| markdown_content | str | Markdown 格式的原始内容 |
| platform | str | 目标平台 |
| mode | str | 处理模式 |

**返回值：**

```python
str  # 转换后的内容 + 使用说明
```

---

#### `get_skill_content(skill_name)`

获取指定技能（Prompt 模板）的原始内容。

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| skill_name | str | 技能名称，如 "zhihu_article" |

**返回值：**

```python
str  # Prompt 模板的原始 Markdown 内容
```

---

## 4. 项目结构

```
mcp-content-styles/
├── pyproject.toml              # 项目配置
├── README.md                   # 使用文档
├── src/
│   └── mcp_content_styles/
│       ├── __init__.py
│       ├── main.py            # MCP 服务器入口 (~100行)
│       ├── skill_manager.py   # Skills 管理器 (~150行)
│       └── skills/            # Prompt 模板目录
│           ├── __init__.py
│           ├── zhihu_article.md
│           ├── wechat_article.md
│           ├── xiaohongshu_note.md
│           ├── weibo_post.md
│           ├── douyin_script.md
│           └── common_writing.md  # 通用写作技巧
└── tests/
    └── test_skills.py
```

### 4.1 文件说明

| 文件 | 预估行数 | 职责 |
|------|---------|------|
| `main.py` | ~100 | MCP 服务器初始化、工具定义、请求处理 |
| `skill_manager.py` | ~150 | Markdown 文件加载、参数替换、技能查询 |
| `skills/*.md` | ~50-100/个 | 各平台的 Prompt 模板内容 |
| `pyproject.toml` | ~30 | 依赖管理、脚本定义、元数据 |

---

## 5. Prompt 模板格式

### 5.1 文件命名规范

```
{platform}_{content_type}.md
```

**示例：**
- `zhihu_article.md` - 知乎文章
- `xiaohongshu_note.md` - 小红书笔记
- `wechat_article.md` - 公众号文章
- `weibo_post.md` - 微博博文
- `douyin_script.md` - 抖音脚本

### 5.2 文件内容结构

```markdown
# {platform}_{content_type}
> {简短描述}

你是一位专业的... [角色设定]

## 创作主题
{topic}

## 原始内容
{original_content}

## 格式要求

### 模式区分

**格式化模式 (mode="format")：**
- 保持原始内容的核心观点
- 只调整格式、添加平台特色元素
- 保留原有的逻辑结构

**重写模式 (mode="rewrite")：**
- 保留核心观点，但重新表达
- 使用目标平台的语气和风格
- 可以适当增加或删减内容

### 通用要求
[平台通用的格式要求...]

### 具体格式
[具体排版、语气、结构要求...]

## 示例结构
[示例文章结构...]

请根据以上要求，处理以下内容：
```

### 5.3 参数说明

| 参数 | 用途 | 示例值 |
|------|------|--------|
| `{topic}` | 文章主题 | "AI工具推荐" |
| `{original_content}` | 原始 Markdown 内容 | "## 我的分享..." |
| `{mode}` | 处理模式 | "format" / "rewrite" |

---

## 6. 平台支持

### 6.1 优先级排序

根据用户需求，平台优先级如下：

1. **知乎** (`zhihu`) - 技术深度文章
2. **微信公众号** (`wechat`) - AI 工程化实践
3. **小红书** (`xiaohongshu`) - AI 工具推荐
4. **微博** (`weibo`) - 快速分享
5. **抖音** (`douyin`) - 视频脚本

### 6.2 内容类型映射

| 平台 | content_type | 说明 |
|------|--------------|------|
| zhihu | article | 知乎专栏文章 |
| zhihu | answer | 知乎回答 |
| wechat | article | 公众号文章 |
| xiaohongshu | note | 小红书笔记 |
| xiaohongshu | image | 小红书配图描述 |
| weibo | post | 微博博文 |
| douyin | script | 抖音视频脚本 |

---

## 7. 两种处理模式

### 7.1 格式化模式 (mode="format")

**目标**：保持原意，只调整格式

**适用场景**：
- 原始内容质量较高
- 只需要适配平台排版
- 快速发布

**处理逻辑**：
- 保留原始内容的核心观点和逻辑结构
- 添加平台特色元素（Emoji、分隔符等）
- 调整段落长度和留白
- 添加平台要求的标签/话题

### 7.2 重写模式 (mode="rewrite")

**目标**：智能改写为平台风格

**适用场景**：
- 需要彻底转换风格
- 原始内容不适合直接发布
- 需要增加平台特色表达

**处理逻辑**：
- 提取核心观点
- 使用目标平台的语气和表达方式
- 增加平台用户喜爱的元素
- 可以增删内容以适应平台特点

---

## 8. 错误处理策略

| 错误场景 | 处理方式 | 返回内容 |
|----------|----------|----------|
| 找不到对应平台 | 友好提示 | 返回可用平台列表 |
| 缺少必要参数 | 参数说明 | 明确告知需要哪些参数 |
| Markdown 模板解析失败 | 日志记录 + 友好错误 | 错误信息和调试建议 |
| 参数替换失败 | 降级处理 | 返回原始模板，标记未替换参数 |
| 空内容 | 输入验证 | 提示用户提供内容 |

---

## 9. 扩展性设计

### 9.1 添加新平台

1. 在 `src/mcp_content_styles/skills/` 创建新的 `.md` 文件
2. 按照命名规范：`{platform}_{content_type}.md`
3. 重启 MCP 服务器即可使用

### 9.2 添加新模式

- 在 Markdown 模板中增加模式说明
- 通过 `mode` 参数控制
- 模板中使用条件语句区分不同模式

### 9.3 未来可选增强

- **配置系统**：添加 `config.yaml` 配置默认参数
- **缓存机制**：添加模板缓存提高性能
- **验证系统**：添加模板验证（检查参数完整性）
- **热重载**：支持不重启服务器更新模板

---

## 10. 完整使用流程

### 10.1 手动使用流程

```python
# 1. 查询可用平台
platforms = list_platforms()
# 返回: zhihu, wechat, xiaohongshu, weibo, douyin

# 2. 获取小红书笔记的 Prompt
prompt = get_platform_prompt(
    platform="xiaohongshu",
    content_type="note",
    mode="format",
    original_content="## AI工具推荐\n\n我测试了50个AI工具..."
)

# 3. 使用 LLM 生成小红书内容
xiaohongshu_content = llm.generate(prompt)

# 4. 获取配图 Prompt
image_prompt = get_platform_prompt(
    platform="xiaohongshu",
    content_type="image",
    topic="AI工具"
)

# 5. 生成配图
image = mcp_image.generate(image_prompt)

# 6. 发布（通过其他 MCP）
mcp_xiaohongshu.publish(xiaohongshu_content, image)
```

### 10.2 AI Agent 自动流程

```python
# AI Agent 可以自动完成整个流程
async def publish_content(original_md, target_platform):
    # 1. 获取 Prompt
    prompt = get_platform_prompt(
        platform=target_platform,
        content_type="note",
        mode="format",
        original_content=original_md
    )

    # 2. 生成内容
    content = await llm.generate(prompt)

    # 3. 生成配图
    image = await mcp_image.generate(f"{target_platform} style: {content[:100]}")

    # 4. 发布
    await mcp_platforms[target_platform].publish(content, image)
```

---

## 11. 技术选型

### 11.1 核心依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| Python | 3.11+ | 运行时 |
| mcp | >=1.0.0 | MCP 协议实现 |
| loguru | >=0.7.0 | 日志记录 |

### 11.2 为什么这样选型

- **轻量级**：不引入重量级依赖
- **专注核心**：只做 Prompt 管理这一件事
- **易于维护**：纯文本 + 简单 Python 代码
- **快速启动**：最小依赖，快速部署

---

## 12. 成功标准

### 12.1 功能完成标准

- [ ] 支持 5 个平台的 Prompt 模板
- [ ] 支持 format 和 rewrite 两种模式
- [ ] 所有工具函数正常工作
- [ ] 参数替换正确
- [ ] 错误处理完善

### 12.2 使用体验标准

- [ ] 获取 Prompt 响应时间 < 100ms
- [ ] 模板文件易于阅读和修改
- [ ] 错误信息清晰友好
- [ ] 文档完整

---

## 13. 参考项目

- **content-flow**: GitHub ivvvan2261/content-flow - 多平台风格适配参考
- **xiaohongshu-mcp-python**: GitHub luyike221/xiaohongshu-mcp-python - Skills 管理架构参考

---

## 14. 决策记录

### 14.1 选择轻量级方案

**决策**：采用方案 A（轻量级 MCP 服务器），而非方案 B（完整框架）或方案 C（配置驱动）。

**理由**：
- 核心需求是获取 Prompt，不需要复杂内容处理
- ~300 行代码即可满足需求
- 易于快速启动和维护
- 未来可按需扩展

### 14.2 不包含个人信息

**决策**：Prompt 模板中不包含 KevinTen 的个人信息。

**理由**：
- 保持通用性
- 用户可以根据需要手动添加
- 避免硬编码个人信息

### 14.3 Markdown 纯文本存储

**决策**：使用 Markdown 文件存储 Prompt 模板，而非数据库或配置系统。

**理由**：
- 易于阅读和编辑
- 版本控制友好
- 无需额外依赖
- 符合 Skills 管理模式

---

## 15. 附录

### 15.1 术语表

| 术语 | 说明 |
|------|------|
| MCP | Model Context Protocol，模型上下文协议 |
| Skill | 技能，此处指 Prompt 模板 |
| Format 模式 | 格式化模式，保持原意只改格式 |
| Rewrite 模式 | 重写模式，智能改写为平台风格 |

### 15.2 文件路径约定

```
SKILLS_DIR = src/mcp_content_styles/skills/
TEMPLATE_PATTERN = {platform}_{content_type}.md
```

---

**文档结束**
