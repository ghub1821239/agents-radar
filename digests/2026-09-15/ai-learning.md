# 个性化 AI 小技术学习卡 2026-09-15

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add resume-screening skill

> 预计用时：20–30 分钟 · 难度：入门

Adds `skills/resume-screening`, a skill that turns job-application emails into an HR-ready screening report, and registers it as a plugin in `.claude-plugin/marketplace.json`. It demonstrates a multi-step local workflow that combines scripts with Claude's judgment: 1. **Export**: `scripts/export_mail.applescript` pulls applications for a role from macOS…

### 为什么适合你

你 Star 了 'skills'、'ai-agent' 和 'claude-code'，该项目是官方仓库中一个真实的、可动手的技能开发 PR，演示如何将邮件自动转化为 HR 筛选报告，直接匹配你的兴趣点。

### 为什么现在学

这是一个典型的多步骤本地工作流案例，结合脚本与 Claude 判断，适合在 20–30 分钟内快速理解并复现一个小闭环，帮助你掌握 AI Agent 技能的构建逻辑。

### 今天掌握

- 理解 skill 作为可插拔模块在 Agent 工作流中的角色
- 掌握基于 AppleScript 提取邮件数据并集成到 Claude 判断流程的模式

### 动手任务

- 克隆 https://github.com/anthropics/skills 仓库，进入 `skills/resume-screening` 目录，阅读 `README.md` 和 `scripts/export_mail.applescript` 的内容，确认其功能和调用方式。
- 在本地模拟一个测试邮件文件（如 `test_email.txt`），使用 `export_mail.applescript` 导出内容，并手动运行 `python -m skills.resume_screening --input test_email.txt`，观察输出是否生成结构化筛选报告。

### 原始资料

- [Add resume-screening skill](https://github.com/anthropics/skills/pull/1763)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Add MAXIMO generalist agent and shortcut](https://github.com/anthropics/skills/pull/1747)

Add a reusable generalist agent for cross-domain requests that need coordinated routing, current-source verification, safety boundaries, privacy protection, and explicit validation. What changed Added the `MAXIMO` custom agent and `/maximo` shortcut. Added the `maximo` skill with domain routing for coding, finance, legal research, marketing, audit,…

- 推荐原因：该 PR 添加了一个通用型 AI Agent（MAXIMO）及其快捷命令，适合快速了解多领域任务协调的实现方式。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [fix(skill-creator): continue when report browser is unavailable](https://github.com/anthropics/skills/pull/1768)

When `skill-creator` starts its live HTML report, `webbrowser.open()` can raise or return `False` in a headless environment. The exception currently aborts the optimization loop before the first evaluation runs. This change makes report opening best-effort: convert the report path to a file URI before opening it; catch browser and OS errors and continue…

- 推荐原因：修复 headless 环境下报告无法打开的问题，展示了实际部署中常见的容错设计，适合学习健壮性处理技巧。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [affaan-m/ECC](https://github.com/affaan-m/ECC)

The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

- 推荐原因：项目聚焦于 Claude Code 的性能优化与技能系统，与你对 'claude-code' 与 'skills' 的关注高度契合，适合后续深入研究。
- 来源：GitHub Search: claude-code

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*