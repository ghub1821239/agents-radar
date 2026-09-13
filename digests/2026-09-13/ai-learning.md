# 个性化 AI 小技术学习卡 2026-09-13

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add portable CC for Codex Agent Skill

> 预计用时：20–30 分钟 · 难度：入门

This adds `skills/cc-for-codex`, a small, portable Agent Skill that teaches a Codex task how to use an explicitly requested local Claude Code installation as an independent second agent. It covers read-only review, adversarial review, bounded delegation, resumable handoffs, and the permission boundaries needed when two coding agents share a repository. The…

### 为什么适合你

你 Star 了 skills、ai-agent、codex，此 PR 提出的 `cc-for-codex` 技能正是将 Claude Code 作为独立代理与 Codex 协同工作的可移植方案，直接契合你的兴趣点。

### 为什么现在学

该技能设计涵盖本地 Claude Code 集成、权限边界与任务交接，是当前 AI Agent 协作模式的前沿实践，适合在 30 分钟内快速理解并验证其逻辑。

### 今天掌握

- 理解如何通过一个小型 Skill 实现两个编码代理（Codex 与本地 Claude Code）之间的安全协作
- 掌握 'read-only review', 'adversarial review', 'bounded delegation' 等协作模式的设计原则

### 动手任务

- 在本地创建一个空目录，复制 `skills/cc-for-codex` 的目录结构和 `skill.json` 文件，仅修改 `name` 与 `description` 为自定义值
- 使用 `mcp-cli` 或本地测试环境运行 `mcp test cc-for-codex`，观察是否成功加载并展示其行为描述，确认无语法错误

### 原始资料

- [Add portable CC for Codex Agent Skill](https://github.com/anthropics/skills/pull/1729)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Make the academy-guide skill use the Claude Academy connector when present](https://github.com/anthropics/skills/pull/1736)

Teaches the `academy-guide` skill to use the Claude Academy connector (the `claude-academy` MCP server: `search_academy`, `get_content`, `list_content`) when its tools are available in a conversation, and to behave exactly as today — fetching the published catalog.json — when they are not. **Why:** Claude Academy now has an MCP connector. A skill cannot…

- 推荐原因：你关注 skill 与 ai-agent，此 PR 演示如何让 skill 动态调用 Claude Academy 的 MCP 连接器，提升智能上下文获取能力。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [Add MAXIMO generalist agent and shortcut](https://github.com/anthropics/skills/pull/1747)

Add a reusable generalist agent for cross-domain requests that need coordinated routing, current-source verification, safety boundaries, privacy protection, and explicit validation. What changed Added the `MAXIMO` custom agent and `/maximo` shortcut. Added the `maximo` skill with domain routing for coding, finance, legal research, marketing, audit,…

- 推荐原因：你对 generalist agent 与多领域路由感兴趣，此新增的 `MAXIMO` 通用代理可作为跨域任务协调的轻量级原型。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source super AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-agent, multi-model, multi-channel. Lightweight, extensible, one-line install. (formerly chatgpt-on-wechat)

- 推荐原因：你 Star 了 ai-agent 与 open-source 工具，此项目提供一键安装的多模型、多通道开源 Agent 框架，适合快速体验完整工作流。
- 来源：GitHub Search: ai-agent

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*