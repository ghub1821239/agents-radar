# 个性化 AI 小技术学习卡 2026-09-05

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add api-governance skill (CodeRifts)

> 预计用时：20–30 分钟 · 难度：入门

Add `api-governance` skill (CodeRifts) Adds one skill, `skills/api-governance/`, and registers it as a single-skill plugin in `.claude-plugin/marketplace.json`. What the skill does It teaches Claude when to ask for a governance decision on an **API or agent-tool contract change**, and how to read the answer. The decision comes from the CodeRifts MCP…

### 为什么适合你

你 Star 中的 'skills'、'skill' 和 'ai-agent' 兴趣高度匹配，该 PR 提供一个可独立学习与实验的 API 治理技能实现，直接关联 AI Agent 的安全决策流程。

### 为什么现在学

API 治理是 AI Agent 实践中的关键环节，当前开放的 PR 展示了如何在 Agent 工作流中集成治理逻辑，适合快速理解并动手验证其设计模式。

### 今天掌握

- 理解 API 治理技能的核心目标：在 Agent 修改接口或工具合约前触发人工决策
- 掌握该技能通过 MCP 插件机制注册，并在 Claude Code 等环境中被调用的集成方式

### 动手任务

- 在本地创建一个空项目目录，手动编写 `skills/api-governance/SKILL.md` 文件，内容包含技能描述、触发条件和决策反馈格式
- 修改 `.claude-plugin/marketplace.json` 添加该技能条目，确保其能被识别为单技能插件（仅需结构正确即可验证）

### 原始资料

- [Add api-governance skill (CodeRifts)](https://github.com/anthropics/skills/pull/1708)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [feat: add red-green-proof debugging skill](https://github.com/anthropics/skills/pull/1701)

Add the `red-green-proof` Agent Skill under `skills/red-green-proof/SKILL.md`. Require cause verification before test authoring. Require a focused red test, smallest fix, deliberate revert-to-red check, and final full-suite validation. Document honest alternatives for inaccessible code paths: extraction, structural, model, and characterization tests. This…

- 推荐原因：该开放 PR 提供了一个可动手实践的红绿测试调试技能，契合你对 AI Agent 技能开发的兴趣
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [Add loopify: a standing brief + one /loop line for jobs that repeat](https://github.com/anthropics/skills/pull/1702)

loopify is a Claude Code skill for jobs that never quite finish — keeping a release PR healthy while reviews trickle in, watching a deploy until it settles, sweeping new bug reports every hour. You describe the job once; the skill reads the project, asks about the few real choices, and writes a standing brief: a file holding what one round of the job does,…

- 推荐原因：loopify 技能聚焦重复性任务自动化，是典型可拆解的小型 Agent Skill，适合快速上手
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：该项目解决 AI Agent 的上下文持久化问题，与你关注的 claude-code 与 agent 兴趣高度相关
- 来源：GitHub Search: claude-code

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*