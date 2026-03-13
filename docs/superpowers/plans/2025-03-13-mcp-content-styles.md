# MCP Content Styles Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a lightweight MCP server that provides platform-specific content creation prompts for zhihu, wechat, xiaohongshu, weibo, and douyin.

**Architecture:** Pure Python MCP server using FastMCP. Markdown files store prompt templates in a skills directory. SkillManager handles loading and parameter substitution.

**Tech Stack:** Python 3.11+, FastMCP (mcp package), loguru for logging. No external AI/LLM dependencies - this is just a prompt delivery service.

**Reference:** Design doc at `docs/superpowers/specs/2025-03-13-mcp-content-styles-design.md`

---

## Chunk 1: Project Setup

### Task 1: Create Python Project Structure

**Files:**
- Create: `mcp-content-styles/pyproject.toml`
- Create: `mcp-content-styles/README.md`
- Create: `mcp-content-styles/.gitignore`

**Project root:** `mcp-content-styles/` (sibling to existing project files)

- [ ] **Step 1: Create project directory structure**

```bash
mkdir -p mcp-content-styles/src/mcp_content_styles/skills
mkdir -p mcp-content-styles/tests
touch mcp-content-styles/src/mcp_content_styles/__init__.py
touch mcp-content-styles/src/mcp_content_styles/skills/__init__.py
```

- [ ] **Step 2: Create pyproject.toml**

Create `mcp-content-styles/pyproject.toml`:

```toml
[project]
name = "mcp-content-styles"
version = "0.1.0"
description = "MCP server for platform-specific content creation prompts"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
    "mcp>=1.0.0",
    "loguru>=0.7.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project.scripts]
mcp-content-styles = "mcp_content_styles.main:mcp.run"
```

- [ ] **Step 3: Create README.md**

Create `mcp-content-styles/README.md`:

```markdown
# MCP Content Styles

MCP server providing platform-specific content creation prompts.

## Platforms Supported

- 知乎 (zhihu) - 技术深度文章
- 微信公众号 (wechat) - AI 工程化实践
- 小红书 (xiaohongshu) - AI 工具推荐
- 微博 (weibo) - 快速分享
- 抖音 (douyin) - 视频脚本

## Installation

```bash
pip install -e .
```

## Usage

```bash
# Run the MCP server
python -m mcp_content_styles.main

# Or use the entry point
mcp-content-styles
```

## MCP Tools

- `get_platform_prompt(platform, content_type, mode, topic, original_content)` - Get platform-specific prompt
- `list_platforms()` - List available platforms
- `convert_content(markdown_content, platform, mode)` - Convert content with instructions
- `get_skill_content(skill_name)` - Get raw skill template
```

- [ ] **Step 4: Create .gitignore**

Create `mcp-content-styles/.gitignore`:

```
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
.pytest_cache/
.coverage
htmlcov/
.venv/
venv/
ENV/
```

- [ ] **Step 5: Commit project structure**

```bash
cd mcp-content-styles
git add .
git commit -m "chore: initial project structure"
```

---

## Chunk 2: Skill Manager Core

### Task 2: Implement SkillManager

**Files:**
- Create: `mcp-content-styles/src/mcp_content_styles/skill_manager.py`
- Test: `mcp-content-styles/tests/test_skill_manager.py`

- [ ] **Step 1: Write failing test for SkillManager initialization**

Create `mcp-content-styles/tests/test_skill_manager.py`:

```python
import pytest
from pathlib import Path
from mcp_content_styles.skill_manager import SkillManager


def test_skill_manager_initializes_with_default_path():
    """SkillManager should initialize and load skills from default path"""
    manager = SkillManager()
    assert manager.skills_dir.exists()
    assert isinstance(manager.skills, list)


def test_skill_manager_initializes_with_custom_path(tmp_path):
    """SkillManager should work with custom skills directory"""
    skills_dir = tmp_path / "skills"
    skills_dir.mkdir()

    # Create a test skill file
    skill_file = skills_dir / "test_skill.md"
    skill_file.write_text("# test_skill\n> Test description\n\nTest content {param}")

    manager = SkillManager(str(skills_dir))
    assert manager.skills_dir == skills_dir
    assert len(manager.skills) == 1
    assert manager.skills[0]["name"] == "test_skill"
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd mcp-content-styles
python -m pytest tests/test_skill_manager.py -v
```

Expected: FAIL with "ModuleNotFoundError: No module named 'mcp_content_styles'"

- [ ] **Step 3: Install package in development mode**

```bash
cd mcp-content-styles
pip install -e .
```

- [ ] **Step 4: Run test again to see actual failures**

```bash
python -m pytest tests/test_skill_manager.py -v
```

Expected: FAIL with "ImportError: cannot import name 'SkillManager'"

- [ ] **Step 5: Implement SkillManager**

Create `mcp-content-styles/src/mcp_content_styles/skill_manager.py`:

```python
"""
Skill Manager - Manages platform-specific prompt templates
"""

from pathlib import Path
from typing import List, Dict, Optional
from loguru import logger


class SkillManager:
    """Manages loading and formatting of skill templates"""

    def __init__(self, skills_dir: Optional[str] = None):
        """
        Initialize skill manager

        Args:
            skills_dir: Path to skills directory. If None, uses default.
        """
        if skills_dir is None:
            current_file = Path(__file__).resolve()
            skills_dir = current_file.parent / "skills"

        self.skills_dir = Path(skills_dir)
        self.skills: List[Dict[str, str]] = []
        self._load_all_skills()

    def _load_all_skills(self):
        """Load all skills from markdown files"""
        if not self.skills_dir.exists():
            logger.warning(f"Skills directory not found: {self.skills_dir}")
            return

        for skill_file in self.skills_dir.glob("*.md"):
            skill = self._parse_skill_file(skill_file)
            if skill:
                self.skills.append(skill)

        logger.info(f"Loaded {len(self.skills)} skills from {self.skills_dir}")

    def _parse_skill_file(self, file_path: Path) -> Optional[Dict[str, str]]:
        """
        Parse a skill markdown file

        Format:
        # Skill Name
        > Description

        Content with {placeholders}...
        """
        try:
            content = file_path.read_text(encoding='utf-8')
            lines = content.strip().split('\n')

            name = file_path.stem
            description = ""
            skill_content = []

            i = 0
            while i < len(lines):
                line = lines[i].strip()
                if line.startswith('# '):
                    name = line[2:].strip()
                elif line.startswith('> '):
                    description = line[2:].strip()
                elif line:
                    skill_content.append(lines[i])
                i += 1

            return {
                "name": name,
                "description": description or f"{name} skill template",
                "content": '\n'.join(skill_content),
                "file_stem": file_path.stem
            }
        except Exception as e:
            logger.error(f"Failed to parse skill file {file_path}: {e}")
            return None

    def get_skill(self, skill_name: str) -> Optional[str]:
        """Get skill content by name"""
        for skill in self.skills:
            if skill["name"] == skill_name:
                return skill["content"]

        for skill in self.skills:
            if skill.get("file_stem") == skill_name:
                return skill["content"]

        return None

    def format_skill(self, skill_name: str, **kwargs) -> Optional[str]:
        """
        Format skill content with parameter substitution

        Args:
            skill_name: Name of the skill
            **kwargs: Parameters for substitution

        Returns:
            Formatted content or None if skill not found
        """
        content = self.get_skill(skill_name)
        if content is None:
            return None

        if kwargs:
            try:
                return content.format(**kwargs)
            except KeyError as e:
                logger.warning(f"Missing parameter for skill '{skill_name}': {e}")
                return content
            except Exception as e:
                logger.error(f"Error formatting skill '{skill_name}': {e}")
                return content

        return content

    def list_skills(self) -> List[Dict[str, str]]:
        """List all available skills (name and description only)"""
        return [{"name": s["name"], "description": s["description"]} for s in self.skills]

    def has_skill(self, skill_name: str) -> bool:
        """Check if skill exists"""
        return self.get_skill(skill_name) is not None
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
python -m pytest tests/test_skill_manager.py -v
```

Expected: All tests PASS

- [ ] **Step 7: Add more comprehensive tests**

Add to `mcp-content-styles/tests/test_skill_manager.py`:

```python
def test_get_skill_returns_content(tmp_path):
    """get_skill should return skill content"""
    skills_dir = tmp_path / "skills"
    skills_dir.mkdir()

    skill_file = skills_dir / "test_skill.md"
    skill_file.write_text("# test_skill\n> Test desc\n\nTest content {param}")

    manager = SkillManager(str(skills_dir))
    content = manager.get_skill("test_skill")
    assert content is not None
    assert "Test content {param}" in content


def test_format_skill_with_parameters(tmp_path):
    """format_skill should substitute parameters"""
    skills_dir = tmp_path / "skills"
    skills_dir.mkdir()

    skill_file = skills_dir / "test_skill.md"
    skill_file.write_text("# test\n> desc\n\nHello {name}!")

    manager = SkillManager(str(skills_dir))
    result = manager.format_skill("test", name="World")
    assert result == "Hello World!"


def test_format_skill_missing_parameter(tmp_path, caplog):
    """format_skill should handle missing parameters gracefully"""
    skills_dir = tmp_path / "skills"
    skills_dir.mkdir()

    skill_file = skills_dir / "test_skill.md"
    skill_file.write_text("# test\n> desc\n\nHello {name}!")

    manager = SkillManager(str(skills_dir))
    result = manager.format_skill("test")  # Missing 'name'
    assert result == "Hello {name}!"  # Original content returned


def test_list_skills(tmp_path):
    """list_skills should return all skills"""
    skills_dir = tmp_path / "skills"
    skills_dir.mkdir()

    (skills_dir / "skill1.md").write_text("# skill1\n> desc1\n\ncontent1")
    (skills_dir / "skill2.md").write_text("# skill2\n> desc2\n\ncontent2")

    manager = SkillManager(str(skills_dir))
    skills = manager.list_skills()
    assert len(skills) == 2
    assert all("name" in s and "description" in s for s in skills)


def test_has_skill(tmp_path):
    """has_skill should check skill existence"""
    skills_dir = tmp_path / "skills"
    skills_dir.mkdir()

    (skills_dir / "existing.md").write_text("# existing\n> desc\n\ncontent")

    manager = SkillManager(str(skills_dir))
    assert manager.has_skill("existing") is True
    assert manager.has_skill("nonexistent") is False
```

- [ ] **Step 8: Run all tests**

```bash
python -m pytest tests/test_skill_manager.py -v
```

Expected: All 8 tests PASS

- [ ] **Step 9: Commit SkillManager**

```bash
git add src/mcp_content_styles/skill_manager.py tests/test_skill_manager.py
git commit -m "feat: implement SkillManager for loading and formatting skills"
```

---

## Chunk 3: MCP Server Core

### Task 3: Implement MCP Server with Core Tools

**Files:**
- Create: `mcp-content-styles/src/mcp_content_styles/main.py`
- Modify: `mcp-content-styles/src/mcp_content_styles/__init__.py`

- [ ] **Step 1: Create main.py with basic MCP server**

Create `mcp-content-styles/src/mcp_content_styles/main.py`:

```python
"""
MCP Content Styles Server
Provides platform-specific content creation prompts
"""

from mcp.server.fastmcp import FastMCP
from .skill_manager import SkillManager
from loguru import logger

# Configure logging
logger.add("mcp_content_styles.log", rotation="10 MB")

# Create MCP server
mcp = FastMCP("content-styles")

# Initialize skill manager
skill_manager = SkillManager()


@mcp.tool()
def get_platform_prompt(
    platform: str,
    content_type: str,
    mode: str = "format",
    topic: str = "",
    original_content: str = ""
) -> str:
    """
    Get platform-specific content creation prompt

    Args:
        platform: Platform name (zhihu, wechat, xiaohongshu, weibo, douyin)
        content_type: Content type (article, note, post, script, image)
        mode: Processing mode - "format" (keep structure) or "rewrite" (rewrite style)
        topic: Topic for rewrite mode
        original_content: Original markdown content

    Returns:
        Complete prompt template for the platform
    """
    try:
        # Build skill name
        skill_name = f"{platform}_{content_type}"

        # Check if skill exists
        if not skill_manager.has_skill(skill_name):
            available = skill_manager.list_skills()
            available_names = [s["name"] for s in available]
            return (
                f"❌ Skill not found: '{skill_name}'\n\n"
                f"Available skills: {', '.join(available_names) or 'None'}"
            )

        # Format skill with parameters
        prompt = skill_manager.format_skill(
            skill_name,
            platform=platform,
            content_type=content_type,
            mode=mode,
            topic=topic,
            original_content=original_content
        )

        if prompt is None:
            return f"❌ Failed to load skill: {skill_name}"

        logger.info(f"✅ Returned prompt for {platform}/{content_type} (mode: {mode})")
        return prompt

    except Exception as e:
        logger.error(f"❌ Error in get_platform_prompt: {e}")
        return f"❌ Error: {str(e)}"


@mcp.tool()
def list_platforms() -> str:
    """
    List all available platforms and content types

    Returns:
        Formatted list of available platforms
    """
    try:
        skills = skill_manager.list_skills()

        if not skills:
            return "❌ No skills available. Check skills directory."

        # Group by platform
        platforms = {}
        for skill in skills:
            parts = skill["name"].split("_")
            if len(parts) >= 2:
                platform = parts[0]
                content_type = "_".join(parts[1:])

                if platform not in platforms:
                    platforms[platform] = []
                platforms[platform].append(content_type)

        # Format output
        emojis = {
            "zhihu": "📝",
            "wechat": "📰",
            "xiaohongshu": "📕",
            "weibo": "📢",
            "douyin": "🎬"
        }

        result = "# 📱 Available Platforms\n\n"
        for platform, types in sorted(platforms.items()):
            emoji = emojis.get(platform, "📄")
            result += f"{emoji} **{platform}**: {', '.join(sorted(types))}\n"

        result += f"\n_Total: {len(skills)} skills_"

        return result

    except Exception as e:
        logger.error(f"❌ Error in list_platforms: {e}")
        return f"❌ Error: {str(e)}"


@mcp.tool()
def convert_content(
    markdown_content: str,
    platform: str,
    mode: str = "format"
) -> str:
    """
    Convert markdown content to platform-specific format

    Args:
        markdown_content: Original markdown content
        platform: Target platform
        mode: Processing mode (format or rewrite)

    Returns:
        Conversion instructions + prompt
    """
    # Detect content type from markdown
    content_type = "article"  # Default

    if platform == "xiaohongshu":
        content_type = "note"
    elif platform == "weibo":
        content_type = "post"
    elif platform == "douyin":
        content_type = "script"

    # Get the prompt
    prompt = get_platform_prompt(
        platform=platform,
        content_type=content_type,
        mode=mode,
        original_content=markdown_content
    )

    if prompt.startswith("❌"):
        return prompt

    # Add usage instructions
    result = f"""# Content Conversion for {platform}

## Original Content
```markdown
{markdown_content[:500]}{"..." if len(markdown_content) > 500 else ""}
```

## Instructions
Use the following prompt with your LLM to convert the content:

---

{prompt}

---

## Next Steps
1. Copy the prompt above
2. Use with your preferred LLM (Claude, GPT, etc.)
3. Review and refine the output
4. Use mcp-image or mcp-video-gen to create media
5. Publish to {platform}
"""

    return result


@mcp.tool()
def get_skill_content(skill_name: str) -> str:
    """
    Get raw skill template content

    Args:
        skill_name: Name of the skill (e.g., "zhihu_article")

    Returns:
        Raw skill template markdown
    """
    content = skill_manager.get_skill(skill_name)

    if content is None:
        available = skill_manager.list_skills()
        available_names = [s["name"] for s in available]
        return (
            f"❌ Skill not found: '{skill_name}'\n\n"
            f"Available: {', '.join(available_names) or 'None'}"
        )

    return content


if __name__ == "__main__":
    mcp.run()
```

- [ ] **Step 2: Update __init__.py**

Update `mcp-content-styles/src/mcp_content_styles/__init__.py`:

```python
"""MCP Content Styles - Platform-specific content creation prompts"""

__version__ = "0.1.0"

from .skill_manager import SkillManager

__all__ = ["SkillManager"]
```

- [ ] **Step 3: Test server starts successfully**

```bash
cd mcp-content-styles
python -c "from mcp_content_styles.main import mcp; print('✅ MCP server imports successfully')"
```

Expected: `✅ MCP server imports successfully`

- [ ] **Step 4: Create test for MCP tools**

Create `mcp-content-styles/tests/test_mcp_tools.py`:

```python
import pytest
from mcp_content_styles.main import get_platform_prompt, list_platforms, convert_content, get_skill_content
from mcp_content_styles.skill_manager import SkillManager


def test_list_platforms_returns_formatted_string(tmp_path, monkeypatch):
    """list_platforms should return formatted platform list"""
    # Create temp skills directory
    skills_dir = tmp_path / "skills"
    skills_dir.mkdir()

    # Create test skills
    (skills_dir / "zhihu_article.md").write_text("# zhihu_article\n> desc\n\ncontent")
    (skills_dir / "xiaohongshu_note.md").write_text("# xiaohongshu_note\n> desc\n\ncontent")

    # Mock the skill_manager
    import mcp_content_styles.main as main_module
    main_module.skill_manager = SkillManager(str(skills_dir))

    result = list_platforms()

    assert "Available Platforms" in result
    assert "zhihu" in result
    assert "xiaohongshu" in result
    assert "article" in result
    assert "note" in result


def test_get_platform_prompt_with_missing_skill():
    """get_platform_prompt should handle missing skills"""
    result = get_platform_prompt("nonexistent", "type")
    assert "❌" in result
    assert "not found" in result.lower()


def test_get_skill_content_with_missing_skill():
    """get_skill_content should handle missing skills"""
    result = get_skill_content("nonexistent_skill")
    assert "❌" in result
    assert "not found" in result.lower()
```

- [ ] **Step 5: Run MCP tool tests**

```bash
python -m pytest tests/test_mcp_tools.py -v
```

Expected: All tests PASS (or show expected failures for missing skills)

- [ ] **Step 6: Commit MCP server**

```bash
git add src/mcp_content_styles/main.py src/mcp_content_styles/__init__.py tests/test_mcp_tools.py
git commit -m "feat: implement MCP server with core tools"
```

---

## Chunk 4: Platform Skill Templates

### Task 4: Create Platform-Specific Prompt Templates

**Files:**
- Create: `mcp-content-styles/src/mcp_content_styles/skills/zhihu_article.md`
- Create: `mcp-content-styles/src/mcp_content_styles/skills/wechat_article.md`
- Create: `mcp-content-styles/src/mcp_content_styles/skills/xiaohongshu_note.md`
- Create: `mcp-content-styles/src/mcp_content_styles/skills/weibo_post.md`
- Create: `mcp-content-styles/src/mcp_content_styles/skills/douyin_script.md`

- [ ] **Step 1: Create zhihu_article.md**

Create `mcp-content-styles/src/mcp_content_styles/skills/zhihu_article.md`:

```markdown
# zhihu_article
> 知乎专栏文章风格 - 技术深度解析

你是一位知乎专栏作家，擅长撰写逻辑严密、深度分析的知识类文章。

## 创作主题
{topic}

## 原始内容
{original_content}

## 格式要求

### 格式化模式 (mode="format")
保持原始内容的核心观点和逻辑结构，调整为知乎文章格式：
- 使用专业、理性的语言
- 添加适当的 ### 三级标题分隔
- 使用 1. 2. 3. 编号列表
- 重要概念用 **加粗**
- 引用权威观点使用 > 引用块
- 结尾添加参考资源链接

### 重写模式 (mode="rewrite")
将内容重写为知乎高赞文章风格：
- 标题要有深度或争议性
- 采用"现象-原因-对策"或"是什么-为什么-怎么做"结构
- 使用专业术语，但首次出现时解释
- 多用数据、案例、图表支撑观点
- 引用权威来源
- 语言客观理性，有学术或行业洞察力

### 通用要求
- 标题：有深度，能引发技术从业者思考
- 开头：简述背景，抛出核心论点
- 结构：逻辑递进，层次分明
- 语言：专业、理性、客观
- 结尾：总结全文，提供前瞻性思考

## 示例结构

## 建议标题：...

**开头**
{背景介绍 + 核心问题}

### 01. 背景与现状
{现状分析}

### 02. 核心概念解析
{概念定义 + 技术原理}

### 03. 实战方案
{具体实现 + 代码示例}
```python
# 代码示例
```

### 04. 深度分析
{对比分析 + 数据支撑}

> 引用权威观点

### 05. 总结与展望
{核心观点回顾 + 未来趋势}

**结语**
{个人见解 + 邀请讨论}

请根据以上要求，创作知乎文章。
```

- [ ] **Step 2: Create wechat_article.md**

Create `mcp-content-styles/src/mcp_content_styles/skills/wechat_article.md`:

```markdown
# wechat_article
> 微信公众号文章风格 - AI工程化实践

你是一位资深的 AI 技术博主，擅长撰写 AI 工程化实践类文章。

## 创作主题
{topic}

## 原始内容
{original_content}

## 格式要求

### 格式化模式 (mode="format")
保持核心内容，调整为公众号文章格式：
- 添加 ### 二级标题（使用数字编号：01. 02. 03.）
- 使用 **加粗** 强调金句和重点
- 使用 > 引用块标注重要观点
- 段落间适当留白，便于手机阅读
- 结尾添加推荐阅读和公众号关注引导

### 重写模式 (mode="rewrite")
将内容重写为公众号爆款文章风格：
- 导语简洁，快速引入主题
- 每部分使用 ### 01. 02. 编号小标题
- 语言亲切但有深度
- 多使用"你"来拉近读者距离
- 案例驱动，实战导向
- 结尾有温度，引发共鸣

### 通用要求
- 标题：吸引人但不标题党
- 导语：2-3行，引导阅读
- 段落：每段不要太长，适合手机阅读
- 金句：用 **加粗** 突出
- 结尾：有温度的总结 + 引导关注

## 示例结构

## 标题

**导语**
{1-2句话引入主题}

### 01. 背景与问题
{技术背景和痛点}

### 02. 解决方案
{架构设计和思路}

### 03. 实战落地
{具体实现步骤}

### 04. 经验总结
{踩坑记录和优化}

### 05. 写在最后
{核心观点 + 个人感悟}

> 金句引用

**推荐阅读**
- {相关文章1}
- {相关文章2}

---

感谢阅读！如果觉得有帮助，欢迎点赞、在看、转发。

请根据以上要求，创作公众号文章。
```

- [ ] **Step 3: Create xiaohongshu_note.md**

Create `mcp-content-styles/src/mcp_content_styles/skills/xiaohongshu_note.md`:

```markdown
# xiaohongshu_note
> 小红书笔记风格 - AI工具推荐

你是一位专注于 AI 工具领域的技术博主，擅长分享实用工具和使用心得。

## 创作主题
{topic}

## 原始内容
{original_content}

## 格式要求

### 格式化模式 (mode="format")
保持核心观点，调整为小红书格式：
- 添加 Emoji 装饰
- 使用 ## 作为标题
- 短段落（每段2-3行）
- 添加 ### 分隔不同部分
- 结尾添加 5-8 个 hashtags

### 重写模式 (mode="rewrite")
将内容重写为小红书爆款笔记风格：
- 使用"宝子们""家人们"等亲切称呼
- 增加个人使用体验和感受
- 用"终于找到了""相见恨晚"制造情绪
- 每段开头或关键词后加 Emoji
- 添加互动引导（"你们用过吗？"）

### 通用要求
- 标题：## + Emoji，5-10字吸引眼球
- 开场：**加粗** 强调利益点 + 亲切称呼
- 正文：短段落，每段2-3行
- Emoji：🌟 ✨ 💡 🔥 💰 ⚡ 🌈 💖 📸
- 结构：痛点 → 解决方案 → 效果 → 总结
- 标签：5-8 个相关 hashtags

## 示例结构

## 标题 + Emoji

**开场白** 宝子们！

### 😭 痛点分享
{描述困扰}

### ✨ 终于找到解决方案
{工具介绍}
- 核心功能1
- 核心功能2
- 核心功能3

### 🔥 实测效果
{使用体验}
- 使用前：{描述}
- 使用后：{描述}

### 💡 适合谁？
{目标用户}

**总结**
{一句话价值总结}

#AI工具 #效率神器 #KevinTen分享 #AIRider

请根据以上要求，创作小红书笔记。
```

- [ ] **Step 4: Create weibo_post.md**

Create `mcp-content-styles/src/mcp_content_styles/skills/weibo_post.md`:

```markdown
# weibo_post
> 微博博文风格 - 快速分享

你是一位 AI 领域的技术博主，擅长快速分享技术见解和工具动态。

## 创作主题
{topic}

## 原始内容
{original_content}

## 格式要求

### 格式化模式 (mode="format")
保持核心信息，调整为微博格式：
- 使用【#话题#】开头
- 适当添加 Emoji
- 分段落，每段简短
- 结尾引导评论

### 重写模式 (mode="rewrite")
将内容重写为微博大V风格：
- 开头直接抛出观点
- 语言犀利或幽默
- 情绪感染力强
- 制造话题性

### 通用要求
- 长度：140-300字
- 话题：【#话题#】开头
- Emoji：适度使用 (🚀 💡 🔥 📊 👏)
- 语气：直接、有观点、有个人风格
- 结尾：引导评论/转发

## 示例结构

【#话题#】

一句话观点，击中痛点！💥

具体阐述...

关键数据/亮点...

大家怎么看？评论区聊聊👇

请根据以上要求，创作微博博文。
```

- [ ] **Step 5: Create douyin_script.md**

Create `mcp-content-styles/src/mcp_content_styles/skills/douyin_script.md`:

```markdown
# douyin_script
> 抖音视频脚本风格 - AI工具演示

你是一位 AI 工具测评博主，擅长制作吸引人的短视频脚本。

## 创作主题
{topic}

## 原始内容
{original_content}

## 格式要求

### 格式化模式 (mode="format")
保持核心内容，调整为视频脚本格式：
- 添加 [镜头] [画面] [字幕] 标注
- 标注 BGM 建议
- 标注转场效果
- 控制时长（建议15-60秒）

### 重写模式 (mode="rewrite")
将内容重写为抖音爆款脚本风格：
- 开头3秒抓眼球（"你知道吗""千万别""绝了"）
- 快节奏，信息密度高
- 展示前后对比
- 强调"简单""快速""免费"
- 结尾引导关注/点赞

### 通用要求
- 时长：15-60秒
- 结构：钩子 → 问题 → 方案 → 效果 → 引导
- 语言：口语化，有节奏感
- 画面：每个镜头有具体描述
- BGM：标注音乐风格建议

## 示例结构

---

[镜头1] 近景 - 博主表情惊讶
[画面] 博主看着屏幕，瞪大眼睛
[字幕] "绝了！这个AI工具让我效率提升10倍"
[时长] 0-3秒

[镜头2] 中景 - 展示工具界面
[画面] 屏幕录制，展示工具操作
[字幕] "只需要输入一句话..."
[时长] 3-8秒

[镜头3] 特写 - 前后对比
[画面] 左侧：手动操作（慢） 右侧：AI操作（快）
[字幕] "以前需要2小时，现在只要5分钟"
[时长] 8-15秒

[镜头4] 近景 - 博主总结
[画面] 博主面对镜头
[字幕] "关注我，分享更多AI神器"
[时长] 15-18秒

[BGM] 节奏感强的电子音乐
[转场] 快速切换，带音效

---

请根据以上要求，创作抖音视频脚本。
```

- [ ] **Step 6: Test all skills load correctly**

```bash
cd mcp-content-styles
python -c "
from mcp_content_styles.skill_manager import SkillManager
sm = SkillManager()
skills = sm.list_skills()
print(f'Loaded {len(skills)} skills:')
for s in skills:
    print(f'  - {s[\"name\"]}: {s[\"description\"]}')
"
```

Expected: Shows all 5 skills loaded

- [ ] **Step 7: Test skill content retrieval**

```bash
python -c "
from mcp_content_styles.skill_manager import SkillManager
sm = SkillManager()

# Test getting a skill
content = sm.get_skill('zhihu_article')
print('✅ zhihu_article loaded:', '知乎' in content)

content = sm.get_skill('xiaohongshu_note')
print('✅ xiaohongshu_note loaded:', '小红书' in content)

# Test formatting
result = sm.format_skill('xiaohongshu_note', topic='AI工具', original_content='test')
print('✅ Formatting works:', 'AI工具' in result)
"
```

Expected: All tests pass

- [ ] **Step 8: Commit skill templates**

```bash
git add src/mcp_content_styles/skills/
git commit -m "feat: add platform-specific skill templates for zhihu, wechat, xiaohongshu, weibo, douyin"
```

---

## Chunk 5: Testing & Documentation

### Task 5: Integration Testing and Documentation

- [ ] **Step 1: Create integration test**

Create `mcp-content-styles/tests/test_integration.py`:

```python
"""Integration tests for MCP server"""

import pytest
from mcp_content_styles.skill_manager import SkillManager


class TestEndToEnd:
    """End-to-end tests using real skill files"""

    def test_all_platform_skills_exist(self):
        """All expected platform skills should exist"""
        sm = SkillManager()

        expected_skills = [
            "zhihu_article",
            "wechat_article",
            "xiaohongshu_note",
            "weibo_post",
            "douyin_script"
        ]

        for skill_name in expected_skills:
            assert sm.has_skill(skill_name), f"Missing skill: {skill_name}"

    def test_zhihu_article_formatting(self):
        """Zhihu article skill should format correctly"""
        sm = SkillManager()

        result = sm.format_skill(
            "zhihu_article",
            topic="MCP工具开发",
            original_content="## 我的MCP工具...",
            mode="format"
        )

        assert "MCP工具开发" in result
        assert "我的MCP工具" in result
        assert "知乎" in result
        assert "格式化模式" in result or "重写模式" in result

    def test_xiaohongshu_formatting(self):
        """Xiaohongshu note skill should format correctly"""
        sm = SkillManager()

        result = sm.format_skill(
            "xiaohongshu_note",
            topic="AI神器推荐",
            original_content="测试内容",
            mode="rewrite"
        )

        assert "AI神器推荐" in result
        assert "测试内容" in result
        assert "小红书" in result
        assert "宝子们" in result or "Emoji" in result


def test_skill_content_has_required_sections():
    """All skills should have required sections"""
    sm = SkillManager()

    skills = sm.list_skills()

    for skill_info in skills:
        skill_name = skill_info["name"]
        content = sm.get_skill(skill_name)

        # Check for required sections
        assert "{topic}" in content, f"{skill_name} missing {topic} placeholder"
        assert "{original_content}" in content, f"{skill_name} missing {original_content} placeholder"
        assert "格式化模式" in content or "format" in content.lower(), f"{skill_name} missing format mode"
```

- [ ] **Step 2: Run all tests**

```bash
python -m pytest tests/ -v
```

Expected: All tests PASS

- [ ] **Step 3: Update README with usage examples**

Update `mcp-content-styles/README.md` with complete usage:

```markdown
# MCP Content Styles

MCP server providing platform-specific content creation prompts.

## Supported Platforms

| Platform | Content Types | Style |
|----------|--------------|-------|
| 知乎 (zhihu) | article, answer | 技术深度 |
| 微信公众号 (wechat) | article | AI工程化 |
| 小红书 (xiaohongshu) | note, image | 工具推荐 |
| 微博 (weibo) | post | 快速分享 |
| 抖音 (douyin) | script | 视频脚本 |

## Installation

```bash
pip install -e .
```

## Usage

### Run the MCP Server

```bash
# Method 1: Direct run
python -m mcp_content_styles.main

# Method 2: Entry point
mcp-content-styles
```

### MCP Tools

#### 1. `get_platform_prompt`

Get platform-specific prompt template.

**Parameters:**
- `platform` (str): Platform name
- `content_type` (str): Content type
- `mode` (str): "format" or "rewrite"
- `topic` (str): Topic for rewrite mode
- `original_content` (str): Original markdown

**Example:**

```python
prompt = get_platform_prompt(
    platform="xiaohongshu",
    content_type="note",
    mode="format",
    original_content="## AI工具推荐\n\n我测试了50个工具..."
)
```

#### 2. `list_platforms`

List all available platforms.

```python
platforms = list_platforms()
```

#### 3. `convert_content`

Convert markdown to platform format with instructions.

```python
result = convert_content(
    markdown_content="## My Article...",
    platform="zhihu",
    mode="format"
)
```

#### 4. `get_skill_content`

Get raw skill template.

```python
template = get_skill_content("zhihu_article")
```

## Complete Workflow

```python
# 1. Get platform prompt
prompt = get_platform_prompt(
    platform="xiaohongshu",
    content_type="note",
    mode="format",
    original_content=my_markdown
)

# 2. Use with LLM to generate content
content = llm.generate(prompt)

# 3. Generate media with other MCPs
image = mcp_image.generate(f"xiaohongshu style: {content}")

# 4. Publish
mcp_xiaohongshu.publish(content, image)
```

## Development

```bash
# Install dev dependencies
pip install -e ".[dev]"

# Run tests
pytest tests/ -v

# Run specific test
pytest tests/test_skill_manager.py -v
```

## License

MIT
```

- [ ] **Step 4: Add usage example script**

Create `mcp-content-styles/examples/basic_usage.py`:

```python
#!/usr/bin/env python3
"""
Basic usage example for MCP Content Styles
"""

import sys
sys.path.insert(0, '../src')

from mcp_content_styles.skill_manager import SkillManager
from mcp_content_styles.main import get_platform_prompt, list_platforms


def main():
    print("=" * 50)
    print("MCP Content Styles - Basic Usage")
    print("=" * 50)

    # 1. List available platforms
    print("\n1. Available Platforms:")
    print(list_platforms())

    # 2. Get a prompt
    print("\n2. Getting Xiaohongshu Prompt:")
    prompt = get_platform_prompt(
        platform="xiaohongshu",
        content_type="note",
        mode="format",
        topic="AI工具推荐",
        original_content="## 我的AI工具分享\n\n我测试了很多AI工具，发现..."
    )

    # Show first 500 chars
    print(prompt[:500])
    print("\n... [truncated] ...")
    print(f"\nTotal length: {len(prompt)} characters")

    # 3. Get another platform
    print("\n3. Getting Zhihu Prompt:")
    prompt = get_platform_prompt(
        platform="zhihu",
        content_type="article",
        mode="rewrite",
        topic="MCP工具开发",
        original_content="## MCP开发经验\n\n我开发了7个MCP工具..."
    )
    print(prompt[:500])
    print("\n... [truncated] ...")


if __name__ == "__main__":
    main()
```

- [ ] **Step 5: Run example script**

```bash
cd mcp-content-styles/examples
python basic_usage.py
```

Expected: Shows platforms list and prompt previews

- [ ] **Step 6: Final commit**

```bash
git add README.md tests/test_integration.py examples/
git commit -m "docs: add comprehensive README and integration tests"
```

---

## Chunk 6: Claude Desktop Integration

### Task 6: Configure for Claude Desktop

- [ ] **Step 1: Create Claude Desktop config example**

Create `mcp-content-styles/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "content-styles": {
      "command": "python",
      "args": ["-m", "mcp_content_styles.main"],
      "cwd": "/path/to/mcp-content-styles"
    }
  }
}
```

- [ ] **Step 2: Add installation instructions to README**

Append to `mcp-content-styles/README.md`:

```markdown
## Claude Desktop Integration

Add to your Claude Desktop config (`~/.config/claude/claude_desktop_config.json` on Linux/Mac or `%APPDATA%/Claude/claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "content-styles": {
      "command": "python",
      "args": ["-m", "mcp_content_styles.main"],
      "cwd": "/path/to/mcp-content-styles"
    }
  }
}
```

Then restart Claude Desktop.
```

- [ ] **Step 3: Commit config example**

```bash
git add claude_desktop_config.json
git commit -m "docs: add Claude Desktop integration example"
```

---

## Summary

### Completed Deliverables

1. **Project Structure** - Python package with pyproject.toml
2. **SkillManager** - Loads and formats Markdown skill templates
3. **MCP Server** - FastMCP server with 4 tools
4. **Skill Templates** - 5 platform-specific prompts
5. **Tests** - Unit tests and integration tests
6. **Documentation** - README with usage examples
7. **Integration** - Claude Desktop config example

### File Summary

| File | Lines | Purpose |
|------|-------|---------|
| `main.py` | ~200 | MCP server and tools |
| `skill_manager.py` | ~150 | Skill loading and formatting |
| `skills/*.md` | ~100 each | Platform prompt templates |
| `test_*.py` | ~200 total | Test suite |
| `README.md` | ~150 | Documentation |

### Total Code

- **Python code**: ~550 lines
- **Skill templates**: ~500 lines
- **Tests**: ~200 lines
- **Total**: ~1250 lines

---

**Plan complete and saved to `docs/superpowers/plans/2025-03-13-mcp-content-styles.md`. Ready to execute?**
