# 个性化 AI 小技术学习卡 2026-09-04

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add api-governance skill (CodeRifts)

> 预计用时：20–30 分钟 · 难度：入门

Add `api-governance` skill (CodeRifts) Adds one skill, `skills/api-governance/`, and registers it as a single-skill plugin in `.claude-plugin/marketplace.json`. What the skill does It teaches Claude when to ask for a governance decision on an **API or agent-tool contract change**, and how to read the answer. The decision comes from the CodeRifts MCP…

### 为什么适合你

与你 Star 中的 skills、ai-agent 和 claude-code 兴趣高度匹配，该 PR 提供了一个可独立练习的 API 治理技能实现，适合快速上手并验证小规模技能开发流程。

### 为什么现在学

API 治理是 AI Agent 安全演进的关键环节，当前 Anthropic 正在推进此能力，是学习 Agent 能力边界和工程化设计的绝佳时机。

### 今天掌握

- 理解 AI Agent 在变更工具或接口时如何触发治理决策的机制
- 掌握如何通过 skill 插件注册一个具备上下文判断逻辑的微服务协调能力

### 动手任务

- 在本地创建 `skills/api-governance/` 目录，并编写一个最小化的 `SKILL.md` 文件，内容为：`description: "Ask for governance approval before changing API contracts."`
- 在 `.claude-plugin/marketplace.json` 中添加该技能的注册条目，确保其路径正确且格式符合规范，然后验证是否能被 Claude Code 识别

### 原始资料

- [Add api-governance skill (CodeRifts)](https://github.com/anthropics/skills/pull/1708)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Add md2video-audio skill](https://github.com/anthropics/skills/pull/1703)

Adds `md2video-audio`, a zero-cost skill that directly compiles Markdown documents into professional-grade talking-head MP4 videos with realistic human-like voiceovers. `skills/md2video-audio/SKILL.md` — Defines the workflow: Markdown documents are converted via Marp into presentation slides and paired with Microsoft Edge-TTS (Xiaoxiao voice) to generate…

- 推荐原因：提供了一个可动手的 Markdown 转视频技能原型，与你的 ai-agent 与 skills 兴趣契合，适合快速体验 AI 内容生成链路。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [feat: add red-green-proof debugging skill](https://github.com/anthropics/skills/pull/1701)

Add the `red-green-proof` Agent Skill under `skills/red-green-proof/SKILL.md`. Require cause verification before test authoring. Require a focused red test, smallest fix, deliberate revert-to-red check, and final full-suite validation. Document honest alternatives for inaccessible code paths: extraction, structural, model, and characterization tests. This…

- 推荐原因：该 PR 展示了 Red-Green-Proof 调试技能的实现逻辑，是提升 AI 编程可靠性的重要实践，与你关注的 agent 技术深度相关。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [ruvnet/ruflo](https://github.com/ruvnet/ruflo)

🌊 The original agent meta-harness. Deploy intelligent multi-player swarms, coordinate autonomous workflows, and build conversational AI systems. Features adaptive memory, self-learning intelligence, RAG integration, and native Claude Code / Codex / Hermes and many more Integrated

- 推荐原因：作为支持 Claude Code 和多智能体协作的轻量级 meta-harness，直接服务于你对 agent 与 claude-code 的兴趣，具备快速集成实验价值。
- 来源：GitHub Search: claude-code

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*