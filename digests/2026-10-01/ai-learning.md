# 个性化 AI 小技术学习卡 2026-10-01

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(mcp-builder): require tool use for evaluation credit

> 预计用时：20–30 分钟 · 难度：入门

Problem The MCP evaluation guide requires questions whose answers depend on the server's tools, and the agent prompt says it must use those tools. Yet `evaluate_single_task` awards full credit for a matching ` ` even when `agent_loop` made zero tool calls. A model can guess or recall the answer and make an unusable server appear successful. Fix Require at…

### 为什么适合你

该 PR 与你 Star 中的 'skills'、'skill'、'agent' 兴趣高度匹配，聚焦于 MCP 评估中工具调用的信用机制，是可独立练习的小技术，直接关联你关注的 AI Agent 评估流程优化。

### 为什么现在学

当前 MCP 评估体系正逐步成熟，此修复解决了评估结果失真的关键问题，理解它能让你在构建或测试 Agent 时避免常见陷阱，具备即时实践价值。

### 今天掌握

- 理解 MCP 评估中 'evaluation credit' 的逻辑：只有实际调用工具才应获得评分
- 掌握如何通过代码约束确保 agent 必须使用工具才能获得完整分数

### 动手任务

- 在本地创建一个最小化的 Python 脚本，模拟 `evaluate_single_task` 函数，故意让 agent 不调用工具但返回正确答案，观察是否仍获得满分
- 修改该脚本，加入对 `tool_calls` 数量的检查，若为 0 则强制扣分，验证修正后的评估逻辑

### 原始资料

- [fix(mcp-builder): require tool use for evaluation credit](https://github.com/anthropics/skills/pull/1928)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(mcp-builder): collect every page of MCP tools](https://github.com/anthropics/skills/pull/1923)

Problem `MCPConnection.list_tools()` reads one `tools/list` response. MCP servers can return `nextCursor`, so every tool after the first page is silently absent from the evaluator's tool set. Evaluation results then misrepresent the server's capabilities. Fix Follow tool-list cursors until the server has no next page. The code accepts the Python MCP SDK v1…

- 推荐原因：解决 MCP 工具列表分页缺失问题，是可动手的底层调试技能，适合快速提升对 Agent 工具发现机制的理解。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [Add seo-aeo-audit skill](https://github.com/anthropics/skills/pull/1933)

Adds a new **seo-aeo-audit** skill: a one-URL audit that covers both classic SEO signals and Answer-Engine Optimization (AEO) — the properties that determine whether ChatGPT, Perplexity, Google AI Overviews, Claude, and similar answer engines will extract from and cite a page. Existing skills cover site-building and testing, but nothing in the repo…

- 推荐原因：新增 SEO-AEO 审计技能，可快速拆解为一个独立小工具，适用于你对 AI Agent 实际应用落地的兴趣。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source personal AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-agent, multi-model, multi-channel. Lightweight, extensible, one-line install.

- 推荐原因：作为轻量级开源 Agent Harness，支持多模型与自进化，与你关注的 agent 架构和 skills 高度契合，适合快速上手体验。
- 来源：GitHub Search: ai-agent

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*