# 个性化 AI 小技术学习卡 2026-09-08

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add portable CC for Codex Agent Skill

> 预计用时：20–30 分钟 · 难度：入门

This adds `skills/cc-for-codex`, a small, portable Agent Skill that teaches a Codex task how to use an explicitly requested local Claude Code installation as an independent second agent. It covers read-only review, adversarial review, bounded delegation, resumable handoffs, and the permission boundaries needed when two coding agents share a repository. The…

### 为什么适合你

与你 Star 中的 'skills'、'ai-agent'、'codex' 兴趣高度匹配，该 PR 提出的 portable CC for Codex Agent Skill 是一个可独立拆解的小技术，直接关联你关注的 Claude Code 和 Codex 集成场景。

### 为什么现在学

当前 AI Agent 多代理协作成为关键挑战，此技能演示了如何在不依赖外部服务的前提下，让两个编码代理（Codex + Claude Code）安全共享仓库并分权协作，是近期前沿实践的缩影。

### 今天掌握

- 理解 portable CC 技能如何通过本地 Claude Code 实例作为独立第二代理运行
- 掌握 read-only review、adversarial review、bounded delegation 等权限边界设计模式

### 动手任务

- 在本地创建一个空项目目录，复制 `skills/cc-for-codex` 的结构和 `SKILL.md` 内容，仅保留核心逻辑描述和入口函数框架
- 使用 `python -m http.server 8000` 启动本地服务，用浏览器访问 `http://localhost:8000` 模拟一次 agent 手动交互流程，验证其是否能正确识别并调用本地 Claude Code（无需实际部署）

### 原始资料

- [Add portable CC for Codex Agent Skill](https://github.com/anthropics/skills/pull/1729)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：与你星标中的 claude-code 与 agent 兴趣高度契合，提供持久上下文能力，是提升 agent 连贯性的关键技术点。
- 来源：GitHub Search: claude-code

### 2. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source super AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-model, multi-channel. Lightweight, extensible, one-line install. (formerly chatgpt-on-wechat)

- 推荐原因：与你关注的 ai-agent、skills 兴趣一致，是一个轻量级可快速实验的开源 Agent Harness，适合构建原型。
- 来源：GitHub Search: ai-agent

### 3. [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)

Turn any AI agent into an AI Scientist. The #1 Agent Skills library for science, used by 190,000+ scientists worldwide. 165 ready-to-use validated skills plus 100+ scientific databases covering biology, chemistry, medicine, and drug discovery. Compatible with Cursor, Claude Code, Codex, Pi, Antigravity, and the open Agent Skills standard.

- 推荐原因：与你星标中的 skills 与 agent 兴趣匹配，提供了大量可复用的科学领域技能，可快速集成到你的工作流中。
- 来源：GitHub Search: agent-skills

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*