# 个性化 AI 小技术学习卡 2026-10-03

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(skill-creator): add subagent capability check and inline fallback to eval loop

> 预计用时：20–30 分钟 · 难度：入门

Addresses #1942: in `skills/skill-creator/SKILL.md`, the evaluation workflow previously assumed subagents could always be spawned unconditionally at Step 1 (`Spawn all runs (with-skill AND baseline) in the same turn`). In harnesses like Claude Code or other environments where agent system instructions forbid unrequested subagent spawning, or in…

### 为什么适合你

你 Star 了 skills、agent、ai-agent 等相关项目，该 PR 直接涉及子代理能力检查与内联回退逻辑，是可拆解的微技能实践，契合你的技术兴趣。

### 为什么现在学

当前 AI Agent 框架对 subagent 的安全控制需求上升，此 PR 提供了实际的工程解决方案，适合在 20–30 分钟内理解并动手验证其设计思想。

### 今天掌握

- 理解 subagent 能力检查在 agent 评估流程中的必要性
- 掌握如何在 eval loop 中实现条件性子代理调用与 fallback 机制

### 动手任务

- 在本地创建一个 Python 脚本，模拟 `skill-creator` 中的 eval loop 流程，定义一个假的 `can_spawn_subagent` 函数返回 False
- 在脚本中加入条件判断：若无法启用子代理，则执行 inline fallback（如直接使用主代理完成任务），并打印结果以验证逻辑路径

### 原始资料

- [fix(skill-creator): add subagent capability check and inline fallback to eval loop](https://github.com/anthropics/skills/pull/1947)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(mcp-builder): require tool use for evaluation credit](https://github.com/anthropics/skills/pull/1928)

Problem The MCP evaluation guide requires questions whose answers depend on the server's tools, and the agent prompt says it must use those tools. Yet `evaluate_single_task` awards full credit for a matching ` ` even when `agent_loop` made zero tool calls. A model can guess or recall the answer and make an unusable server appear successful. Fix Require at…

- 推荐原因：聚焦工具调用与评估信用的绑定，是你关注的 skill 与 agent 评估体系的关键细节。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [docs(claude-api): update Python pause_turn runner guidance](https://github.com/anthropics/skills/pull/1950)

The Python guidance still says the tool runner cannot resume `pause_turn` and recommends restarting it in an outer loop. Python SDK 1.1.0 added automatic resumption, so that outer restart counter no longer bounds paused requests on current versions. With mocked responses, six paused turns followed by `end_turn` made seven requests while the old example's…

- 推荐原因：更新 Python pause_turn 的运行指南，直接关联你熟悉的 Python 和 Claude API 使用场景。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)

Turn any AI agent into an AI Scientist. The #1 Agent Skills library for science, used by 250,000+ scientists worldwide. 177 ready-to-use validated skills plus 100+ scientific databases covering biology, chemistry, medicine, and drug discovery. Compatible with Cursor, Claude Code, Codex, Pi, Antigravity, and the open Agent Skills standard.

- 推荐原因：作为高星的科学类 Agent Skills 库，能快速扩展你对领域专用 skill 构建的理解。
- 来源：GitHub Search: agent-skills

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*