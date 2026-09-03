# 个性化 AI 小技术学习卡 2026-09-03

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add api-governance skill (CodeRifts)

> 预计用时：20–30 分钟 · 难度：入门

Add `api-governance` skill (CodeRifts) Adds one skill, `skills/api-governance/`, and registers it as a single-skill plugin in `.claude-plugin/marketplace.json`. What the skill does It teaches Claude when to ask for a governance decision on an **API or agent-tool contract change**, and how to read the answer. The decision comes from the CodeRifts MCP…

### 为什么适合你

与你 Star 中的 skills、ai-agent 和 skill 兴趣高度匹配，该 PR 提供一个可独立练习的 API 治理技能实现，符合你对 AI Agent 技能开发的关注。

### 为什么现在学

API 治理是 AI Agent 安全性和可控性的关键环节，当前正值 Agent 工具链演进期，掌握此类小技能可直接提升你的 Agent 架构设计能力。

### 今天掌握

- 理解 `api-governance` 技能如何在 Agent 决策中触发治理流程
- 掌握如何将一个独立技能注册到 `.claude-plugin/marketplace.json` 并作为插件使用

### 动手任务

- 在本地创建一个新目录 `my-api-governance-skill`，并新建文件 `skills/api-governance/SKILL.md`，内容为：`# api-governance
When changing an API or agent-tool contract, ask for governance approval before proceeding.`
- 编辑 `my-api-governance-skill/.claude-plugin/marketplace.json`，添加该技能的注册项：`{"name": "api-governance", "path": "skills/api-governance/"}`，验证其结构正确性

### 原始资料

- [Add api-governance skill (CodeRifts)](https://github.com/anthropics/skills/pull/1708)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Add md2video-audio skill](https://github.com/anthropics/skills/pull/1703)

Adds `md2video-audio`, a zero-cost skill that directly compiles Markdown documents into professional-grade talking-head MP4 videos with realistic human-like voiceovers. `skills/md2video-audio/SKILL.md` — Defines the workflow: Markdown documents are converted via Marp into presentation slides and paired with Microsoft Edge-TTS (Xiaoxiao voice) to generate…

- 推荐原因：提供一个零成本的 Markdown 转视频技能原型，适合快速体验 AI Agent 的多模态输出能力，与你对 AI-Agent 和技能的兴趣契合。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：解决 Agent 会话上下文持久化问题，直接服务于你关注的 Claude Code 与 Agent 实践场景，是提升 Agent 连贯性的关键技术。
- 来源：GitHub Search: claude-code

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source super AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-model, multi-channel. Lightweight, extensible, one-line install. (formerly chatgpt-on-wechat)

- 推荐原因：作为开源超级智能体框架，支持任务规划、技能调用和自我进化，与你对 AI Agent、skills 和 ai 兴趣高度一致，适合快速搭建实验环境。
- 来源：GitHub Search: codex

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*