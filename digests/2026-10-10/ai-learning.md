# 个性化 AI 小技术学习卡 2026-10-10

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add frontend design example

> 预计用时：20–30 分钟 · 难度：入门

Adds a short "Before/after example" section to `README.md`, between "Skill Sets" and "Try in Claude Code, Claude.ai, and the API" (+9 lines, no deletions). It links the same plain ops dashboard before and after the `frontend-design` skill is applied: - Before: https://skill-fixture-before.theroost.dev?vr_gallery=1 - After:…

### 为什么适合你

你 Star 了 'skills'、'skill'、'ai-agent'，该项目是官方开放的前端设计技能示例更新，直接关联你的核心兴趣点，且为可独立实验的小型 Skill 变更。

### 为什么现在学

该 PR 添加了真实可用的前后对比示例，能快速理解如何通过 Skill 实现前端设计自动化，适合今日动手验证效果。

### 今天掌握

- 了解 MCP 技能中 'frontend-design' 的工作方式与输出效果
- 掌握如何在技能中嵌入可视化对比案例以提升可读性

### 动手任务

- 克隆 https://github.com/anthropics/skills 仓库并进入分支 `main`
- 打开 `README.md`，定位到 'Before/after example' 新增段落，复制链接中的两个演示页面（如：https://skill-fixture-before.theroost.dev?vr_gallery=1）在浏览器中打开，对比前后变化并记录差异

### 原始资料

- [Add frontend design example](https://github.com/anthropics/skills/pull/1993)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Update mcp-builder skill: add a TypeScript SDK v2 guide](https://github.com/anthropics/skills/pull/1989)

Update mcp-builder skill: add a TypeScript SDK v2 guide The MCP TypeScript SDK v2 (`@modelcontextprotocol/server`) is now the stable `latest` release on npm. v1 (`@modelcontextprotocol/sdk`) gets only bug and security fixes. The skill's TypeScript guide covered only v1, while `SKILL.md` told the agent to fetch the `main` README, which is now the v2 README.…

- 推荐原因：与你对 'skills'、'agent'、'claude-code' 的兴趣高度匹配，是官方 TypeScript SDK v2 的指南更新，适合快速学习新版本技能开发规范。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [Fix destructive PPTX cleanup when presentation.xml cannot be parsed](https://github.com/anthropics/skills/pull/1954)

Problem `skills/pptx/scripts/clean.py` extracted slide relationship IDs from `ppt/presentation.xml` with a regex, and the safety guard in `remove_orphaned_slides()` used the same regex. When `presentation.xml` was missing, malformed, used a different namespace prefix, or used single-quoted attributes, the regex returned no IDs — so the guard treated the…

- 推荐原因：针对 PPTX 处理的修复类 PR，适合拆解为一个可动手的小技能实践，贴合你对 'skills' 和 'ai-agent' 的关注。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source personal AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-agent, multi-model, multi-channel. Lightweight, extensible, one-line install.

- 推荐原因：作为开源个人 AI 助手框架，契合你对 'ai-agent' 与 'skills' 的兴趣，且支持多模型、多通道，具备可本地运行的轻量级特性。
- 来源：GitHub Search: ai-agent

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*