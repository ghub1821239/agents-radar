# 个性化 AI 小技术学习卡 2026-09-11

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add portable CC for Codex Agent Skill

> 预计用时：20–30 分钟 · 难度：入门

This adds `skills/cc-for-codex`, a small, portable Agent Skill that teaches a Codex task how to use an explicitly requested local Claude Code installation as an independent second agent. It covers read-only review, adversarial review, bounded delegation, resumable handoffs, and the permission boundaries needed when two coding agents share a repository. The…

### 为什么适合你

该 PR 提出的 `skills/cc-for-codex` 是一个可独立使用的便携式 Agent Skill，与你 Star 项目中高频出现的 skills、ai-agent、codex、claude-code 等兴趣高度匹配，且具备明确的动手实践价值。

### 为什么现在学

此技能设计聚焦于双代理协作场景（如本地 Claude Code 作为独立助手），是当前 AI Agent 架构中前沿的‘分身式’工作流模式，适合在 30 分钟内快速理解并实验。

### 今天掌握

- 理解如何通过一个独立的 skill 实现两个 coding agent 的安全协作：读写权限分离、手柄交接与边界控制。
- 掌握 portable skill 的结构：其 SKILL.md 如何定义行为、依赖和权限边界。

### 动手任务

- 在本地创建一个名为 `cc-for-codex` 的新目录，复制 `skills/cc-for-codex/SKILL.md` 内容到新文件中，并修改 `name` 为 `my-cc-for-codex`，保存后验证语法无误。
- 使用 `skillforge scan . --strict` 检查该文件是否符合规范，确认输出为 'No issues found'，证明该 skill 可被正确解析。

### 原始资料

- [Add portable CC for Codex Agent Skill](https://github.com/anthropics/skills/pull/1729)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Add MAXIMO generalist agent and shortcut](https://github.com/anthropics/skills/pull/1747)

Add a reusable generalist agent for cross-domain requests that need coordinated routing, current-source verification, safety boundaries, privacy protection, and explicit validation. What changed Added the `MAXIMO` custom agent and `/maximo` shortcut. Added the `maximo` skill with domain routing for coding, finance, legal research, marketing, audit,…

- 推荐原因：它引入了一个通用型 `MAXIMO` 代理和快捷方式，适合作为可拆解的小型 Skill 练习，与你关注的 generalist agent 与 skill 化设计一致。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：该项目提供持久上下文机制，与你对 agent 长期记忆和 session 连续性的兴趣直接相关，可快速体验核心功能。
- 来源：GitHub Search: claude-code

### 3. [affaan-m/ECC](https://github.com/affaan-m/ECC)

The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

- 推荐原因：这是一个高性能 Agent Harness 系统，涵盖技能、本能、安全等模块，适合快速了解现代 Agent 架构的集成设计。
- 来源：GitHub Search: claude-code

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*