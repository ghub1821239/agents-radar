# 个性化 AI 小技术学习卡 2026-10-05

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(skill-creator): add subagent capability check and inline fallback to eval loop

> 预计用时：20–30 分钟 · 难度：入门

Addresses #1942: in `skills/skill-creator/SKILL.md`, the evaluation workflow previously assumed subagents could always be spawned unconditionally at Step 1 (`Spawn all runs (with-skill AND baseline) in the same turn`). In harnesses like Claude Code or other environments where agent system instructions forbid unrequested subagent spawning, or in…

### 为什么适合你

该 PR 与你 Star 中的 'skills'、'ai-agent' 和 'skill' 兴趣高度匹配，聚焦于子代理能力检查与回退逻辑，是可拆解的微技术实践。

### 为什么现在学

当前 AI Agent 系统对子代理调用的控制日益严格，理解并实现安全的子代理检查机制是构建健壮 Agent 流程的关键一步。

### 今天掌握

- 理解子代理在 Agent 流程中的角色及其潜在风险
- 掌握如何在评估循环中加入条件判断与回退策略

### 动手任务

- 在本地创建一个 Python 脚本 `subagent_check.py`，模拟一个基础的 `eval_loop` 函数，包含一个 `if` 判断：当 `subagent_enabled` 为 False 时，直接跳过子代理生成步骤并返回默认结果。
- 运行脚本并验证输出是否符合预期（即未启用子代理时仍能正常执行流程），确保没有因缺失子代理而中断。

### 原始资料

- [fix(skill-creator): add subagent capability check and inline fallback to eval loop](https://github.com/anthropics/skills/pull/1947)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(mcp-builder): require tool use for evaluation credit](https://github.com/anthropics/skills/pull/1928)

Problem The MCP evaluation guide requires questions whose answers depend on the server's tools, and the agent prompt says it must use those tools. Yet `evaluate_single_task` awards full credit for a matching ` ` even when `agent_loop` made zero tool calls. A model can guess or recall the answer and make an unusable server appear successful. Fix Require at…

- 推荐原因：该 PR 涉及评估信用机制的修复，与你关注的 'skills' 和 'agent' 架构密切相关，适合动手理解评价逻辑。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [fix(pptx): make clean.py slide resolution namespace-aware and fail closed (#1953)](https://github.com/anthropics/skills/pull/1964)

Addresses #1953 in `skills/pptx/scripts/clean.py`: Previously, `clean.py` extracted slide relationship IDs from `ppt/presentation.xml` using a regex: If `presentation.xml` was missing, malformed, used single-quoted XML attributes (`r:id='rId1'`), or used an alternative namespace prefix (` `), the regex returned no IDs. The safety guard then failed to…

- 推荐原因：该 PR 改进了 PPTX 清理脚本的安全性，是典型的文件处理类小技能，可作为轻量级练习。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source personal AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-agent, multi-model, multi-channel. Lightweight, extensible, one-line install.

- 推荐原因：作为高星开源个人 AI 助手框架，与你对 'ai-agent' 与 'skills' 的兴趣一致，适合快速探索其核心设计思想。
- 来源：GitHub Search: ai-agent

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*