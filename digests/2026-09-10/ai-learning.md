# 个性化 AI 小技术学习卡 2026-09-10

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：feat: add buffer-api Agent Skill (Buffer GraphQL scheduling for any agent)

> 预计用时：20–30 分钟 · 难度：入门

Adds a portable Agent Skill for the **Buffer GraphQL API** — schedule, manage, and analyze social posts from any AI agent (Claude, Cursor, Codex, OpenClaw, Hermes, n8n). What it covers Account / organization / channel discovery Post create / schedule (`addToQueue` / `customScheduled`) / edit / delete / reorder Image / video / document / link assets…

### 为什么适合你

你 Star 了 'skills'、'ai-agent' 和 'claude-code'，该 PR 提供一个可独立使用的 Buffer GraphQL Agent Skill，与你的兴趣高度契合，且适合快速拆解为小实验。

### 为什么现在学

社交内容自动化是 AI Agent 的典型应用场景，此技能可直接用于构建可复用的调度能力，提升开发效率。

### 今天掌握

- 理解 Agent Skill 的结构：输入/输出规范、API 调用方式与上下文管理
- 掌握如何将外部 API（Buffer GraphQL）封装为可被 Claude Code 等工具调用的 Portable Skill

### 动手任务

- 在本地创建一个 `buffer-schedule-post.py` 文件，使用 Python 模拟 `addToQueue` 请求，包含基本参数如 `text`、`media` 和 `scheduled_at`，并打印请求体作为预期产物
- 编写一个简单的 JSON 配置文件 `buffer-skill.json`，定义技能名称、描述、支持的操作（create, schedule, delete），并验证其符合 Agent Skills 标准格式

### 原始资料

- [feat: add buffer-api Agent Skill (Buffer GraphQL scheduling for any agent)](https://github.com/anthropics/skills/pull/1627)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Add portable CC for Codex Agent Skill](https://github.com/anthropics/skills/pull/1729)

This adds `skills/cc-for-codex`, a small, portable Agent Skill that teaches a Codex task how to use an explicitly requested local Claude Code installation as an independent second agent. It covers read-only review, adversarial review, bounded delegation, resumable handoffs, and the permission boundaries needed when two coding agents share a repository. The…

- 推荐原因：你关注 'codex' 与 'skill'，该 PR 实现了 Codex 与本地 Claude Code 的协同工作，适合拆解为轻量级代理协作实验。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：你 Star 了 'claude-code' 与 'agent'，该项目提供持久化上下文能力，是提升 Agent 连贯性的关键实践。
- 来源：GitHub Search: claude-code

### 3. [Add MAXIMO generalist agent and shortcut](https://github.com/anthropics/skills/pull/1747)

Add a reusable generalist agent for cross-domain requests that need coordinated routing, current-source verification, safety boundaries, privacy protection, and explicit validation. What changed Added the `MAXIMO` custom agent and `/maximo` shortcut. Added the `maximo` skill with domain routing for coding, finance, legal research, marketing, audit,…

- 推荐原因：你对 'skills' 与 'agent' 有持续兴趣，该 PR 引入通用型 `MAXIMO` Agent，可作为多领域路由原型快速验证。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*