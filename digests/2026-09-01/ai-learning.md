# 个性化 AI 小技术学习卡 2026-09-01

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：feat: add red-green-proof debugging skill

> 预计用时：20–30 分钟 · 难度：入门

Add the `red-green-proof` Agent Skill under `skills/red-green-proof/SKILL.md`. Require cause verification before test authoring. Require a focused red test, smallest fix, deliberate revert-to-red check, and final full-suite validation. Document honest alternatives for inaccessible code paths: extraction, structural, model, and characterization tests. This…

### 为什么适合你

与你 Star 中的 'skills'、'agent' 和 'ai' 兴趣高度匹配，且该 PR 提出的 'red-green-proof' 调试技能是可独立拆解、动手实践的小型 AI Agent 技能，符合你对 skill 技术的关注。

### 为什么现在学

当前 AI Agent 开发中调试可靠性问题突出，此技能提供一种结构化、可验证的测试驱动开发模式，适合在 20–30 分钟内快速掌握并应用于本地实验。

### 今天掌握

- 理解 red-green-proof 调试流程：先写一个聚焦的失败测试（red），再最小化修复（green），最后回退到 red 验证稳定性。
- 掌握该技能如何通过文档约束和自动验证机制提升 Agent 的行为一致性，避免无意识漂移。

### 动手任务

- 创建一个名为 `test_red_green.py` 的 Python 文件，模拟一个简单的函数（如 `add(a, b)`）并编写一个故意失败的断言（例如 `assert add(1, 1) == 5`）。
- 手动修改函数实现使测试通过（如改为 `return 5`），然后重新运行测试并确认其仍为通过；接着恢复原逻辑并再次运行，观察是否再次失败——完成一次完整的 red → green → revert-to-red 验证循环。

### 原始资料

- [feat: add red-green-proof debugging skill](https://github.com/anthropics/skills/pull/1701)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(mcp-builder): support streamable_http_client in MCP SDK 2.x (#1668)](https://github.com/anthropics/skills/pull/1677)

Fixes #1668 In `skills/mcp-builder/scripts/connections.py`: - Support importing `streamable_http_client` (MCP SDK 2.x) while maintaining backwards compatibility with `streamablehttp_client` (MCP SDK 1.x). - In MCP Python SDK 2.x, `streamablehttp_client` was renamed to `streamable_http_client`, causing module import failures when using `mcp>=2`.

- 推荐原因：与你关注的 skills 与 python 兴趣相关，涉及 MCP SDK 2.x 的兼容性修复，适合快速阅读并理解模块导入变化。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [fix(skill-creator): support direct execution of package_skill.py and update usage paths](https://github.com/anthropics/skills/pull/1681)

Problem Running \package_skill.py\ directly as a standalone script (e.g., \python skills/skill-creator/scripts/package_skill.py \) fails with \ModuleNotFoundError: No module named 'scripts.quick_validate'\. Additionally, the docstrings and CLI help messages contain outdated references to \utils/package_skill.py\ and \skills/public/...\. Root Cause When…

- 推荐原因：与你对 skill 构建工具链的兴趣匹配，可作为小规模动手练习，了解如何修复脚本执行路径问题。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：与你 Star 中的 claude-code 与 agent 兴趣相关，提供了持久上下文能力的轻量级实现，适合作为快速技术预览。
- 来源：GitHub Search: claude-code

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*