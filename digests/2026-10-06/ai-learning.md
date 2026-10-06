# 个性化 AI 小技术学习卡 2026-10-06

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(skill-creator): add subagent capability check and inline fallback to eval loop

> 预计用时：20–30 分钟 · 难度：入门

Addresses #1942: in `skills/skill-creator/SKILL.md`, the evaluation workflow previously assumed subagents could always be spawned unconditionally at Step 1 (`Spawn all runs (with-skill AND baseline) in the same turn`). In harnesses like Claude Code or other environments where agent system instructions forbid unrequested subagent spawning, or in…

### 为什么适合你

与你 Star 中的 'skills'、'agent' 和 'ai-agent' 兴趣高度匹配，且该 PR 涉及子代理能力检查与回退逻辑，是可拆解为小技能实践的典型场景。

### 为什么现在学

当前 AI Agent 系统对子代理调用的安全性要求越来越高，理解并动手实现此类防御机制能直接提升你在构建健壮 Agent 时的工程能力。

### 今天掌握

- 理解子代理在 Agent 工作流中的触发条件与潜在风险
- 掌握如何在评估循环中添加条件检查与安全回退逻辑

### 动手任务

- 在本地创建一个 Python 脚本 `subagent_check.py`，模拟 `skill-creator` 的评估流程：定义一个函数 `can_spawn_subagent()`，根据输入参数返回布尔值。
- 扩展该函数，加入一个 `fallback_to_baseline()` 函数，在 `can_spawn_subagent()` 返回 False 时执行，并输出一条日志信息如 'Fallback to baseline due to subagent restriction.'，验证逻辑是否正确执行。

### 原始资料

- [fix(skill-creator): add subagent capability check and inline fallback to eval loop](https://github.com/anthropics/skills/pull/1947)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Fix destructive PPTX cleanup when presentation.xml cannot be parsed](https://github.com/anthropics/skills/pull/1954)

Problem `skills/pptx/scripts/clean.py` extracted slide relationship IDs from `ppt/presentation.xml` with a regex, and the safety guard in `remove_orphaned_slides()` used the same regex. When `presentation.xml` was missing, malformed, used a different namespace prefix, or used single-quoted attributes, the regex returned no IDs — so the guard treated the…

- 推荐原因：涉及 PPTX 清理中的 XML 解析安全问题，适合快速学习错误处理与容错设计，与你关注的 'skills' 兴趣一致。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [fix(pptx): make clean.py slide resolution namespace-aware and fail closed (#1953)](https://github.com/anthropics/skills/pull/1964)

Addresses #1953 in `skills/pptx/scripts/clean.py`: Previously, `clean.py` extracted slide relationship IDs from `ppt/presentation.xml` using a regex: If `presentation.xml` was missing, malformed, used single-quoted XML attributes (`r:id='rId1'`), or used an alternative namespace prefix (` `), the regex returned no IDs. The safety guard then failed to…

- 推荐原因：改进 PPTX 清理脚本的命名空间感知能力，是典型的低风险、高价值的小技能优化实践，契合你对 'skills' 的关注。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [affaan-m/ECC](https://github.com/affaan-m/ECC)

The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

- 推荐原因：作为高性能 Agent Harness 系统，其核心理念（如记忆、本能、安全）与你关注的 'agent' 与 'skills' 兴趣深度契合，适合作为宏观视野补充。
- 来源：GitHub Search: llm

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*