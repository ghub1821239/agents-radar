# 个性化 AI 小技术学习卡 2026-09-09

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add portable CC for Codex Agent Skill

> 预计用时：20–30 分钟 · 难度：入门

This adds `skills/cc-for-codex`, a small, portable Agent Skill that teaches a Codex task how to use an explicitly requested local Claude Code installation as an independent second agent. It covers read-only review, adversarial review, bounded delegation, resumable handoffs, and the permission boundaries needed when two coding agents share a repository. The…

### 为什么适合你

你 Star 了 skills、ai-agent、codex 等相关项目，该 PR 提出的 `cc-for-codex` 技能正是围绕本地 Claude Code 与 Codex Agent 的协作设计，高度契合你的兴趣方向。

### 为什么现在学

当前 AI Agent 协作模式正从单体向多代理协同演进，掌握如何在两个代理间安全地共享任务与权限边界，是构建可复用技能的关键能力，适合今天快速实践。

### 今天掌握

- 理解 Portable Skill 的设计思想：如何将一个独立功能封装为可被多个 Agent 调用的模块
- 掌握双代理协作中的权限边界与委托机制：包括只读审查、对抗性审查、可恢复交接等核心概念

### 动手任务

- 在本地创建一个 `skills/cc-for-codex` 目录，编写一个最小化的 skill 配置文件 `skill.json`，定义其入口点和依赖项（如使用 `claude-code` 工具）
- 模拟一次任务交接流程：写一段伪代码或 Markdown 文档，描述当 Codex Agent 请求使用本地 Claude Code 执行代码审查时，如何通过 skill 触发并传递上下文，验证其是否符合‘受限委托’原则

### 原始资料

- [Add portable CC for Codex Agent Skill](https://github.com/anthropics/skills/pull/1729)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：你关注 claude-code 和 agent 持久化能力，该项目提供跨会话的上下文记忆方案，直接增强 Agent 的连续性体验。
- 来源：GitHub Search: claude-code

### 2. [Add api-governance skill (CodeRifts)](https://github.com/anthropics/skills/pull/1708)

Add `api-governance` skill (CodeRifts) Adds one skill, `skills/api-governance/`, and registers it as a single-skill plugin in `.claude-plugin/marketplace.json`. What the skill does It teaches Claude when to ask for a governance decision on an **API or agent-tool contract change**, and how to read the answer. The decision comes from the CodeRifts MCP…

- 推荐原因：你对 api-governance 与 agent 权限控制感兴趣，该 PR 探索了在工具变更时引入治理决策流程，适合拆解为小实验。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [Make the academy-guide skill use the Claude Academy connector when present](https://github.com/anthropics/skills/pull/1736)

Teaches the `academy-guide` skill to use the Claude Academy connector (the `claude-academy` MCP server: `search_academy`, `get_content`, `list_content`) when its tools are available in a conversation, and to behave exactly as today — fetching the published catalog.json — when they are not. **Why:** Claude Academy now has an MCP connector. A skill cannot…

- 推荐原因：你关注 skill 与外部连接器集成，该 PR 实现了 academy-guide 技能自动适配 Claude Academy 连接器，体现智能降级逻辑。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*