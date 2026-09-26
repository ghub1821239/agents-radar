# 个性化 AI 小技术学习卡 2026-09-26

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add NiceTryGPT skill for authorized CTF challenge adaptation

> 预计用时：20–30 分钟 · 难度：入门

Adds "nice-try-gpt", an Agent Skill for reviewing and minimally adapting authorized CTF challenges to reduce cheap LLM pattern-matching shortcuts without materially increasing human difficulty. The skill follows a verification-first workflow: 1. reproduce the original challenge end-to-end; 2. identify one evidence-backed cheap shortcut; 3. apply zero, one,…

### 为什么适合你

与你 Star 中的 'skills'、'agent' 和 'ctf' 兴趣高度匹配，是一个可独立动手的小技能实现，适合快速实践。

### 为什么现在学

当前 AI 安全与对抗性测试趋势上升，该技能提供真实场景下的 LLM 模式规避策略，是提升 Agent 可靠性的实用技术点。

### 今天掌握

- 理解 'NiceTryGPT' 技能的核心目标：通过验证原始挑战并识别低成本模式匹配漏洞来增强挑战难度。
- 掌握其验证优先的工作流：复现挑战 → 识别证据支持的捷径 → 最小化修改以保留人类挑战性。

### 动手任务

- 在本地创建一个简单的 CTF 挑战（如字符串解密），用 Python 编写一个最小化脚本模拟原题逻辑。
- 基于该挑战，设计一个 'NiceTryGPT' 风格的改写规则：例如将固定密钥改为动态生成，但保持逻辑一致，提交一份简短说明文档作为练习产物。

### 原始资料

- [Add NiceTryGPT skill for authorized CTF challenge adaptation](https://github.com/anthropics/skills/pull/1798)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Add AI ML engineering mentor skill](https://github.com/anthropics/skills/pull/1799)

Adds an AI/ML Engineering Mentor skill designed to help users: Learn AI/ML concepts step by step Debug ML and Python implementations Design and review AI/ML projects Work with RAG and agentic AI systems Understand model training, evaluation, and optimization Follow structured workflows for project development The skill includes reference material,…

- 推荐原因：与你星标中的 'skills' 和 'ai' 兴趣匹配，是一个可拆解为小实验的 AI/ML 教练技能，适合快速上手。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [Update claude-api skill: Claude Opus 5.5, build-eval and hillclimb guides](https://github.com/anthropics/skills/pull/1802)

Updates the `claude-api` skill for **Claude Opus 5.5** (`claude-opus-5-5`), plus a catch-up of skill content that had not been published here yet. Claude Opus 5.5 New **Migrating to Claude Opus 5.5** section in `shared/model-migration.md`: **Four breaking changes vs Claude Opus 5**, each with before/after code: - Thinking can't be disabled - `{type:…

- 推荐原因：与你对 'skills' 和 'claude' 的兴趣匹配，涉及最新模型迁移指南，适合作为轻量级技术更新学习。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：与你星标中的 'agent' 和 'claude-code' 兴趣匹配，提供持久上下文机制的直观实现，可快速理解记忆复用原理。
- 来源：GitHub Search: claude-code

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*