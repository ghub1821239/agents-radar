# 个性化 AI 小技术学习卡 2026-09-02

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：feat: add red-green-proof debugging skill

> 预计用时：20–30 分钟 · 难度：入门

Add the `red-green-proof` Agent Skill under `skills/red-green-proof/SKILL.md`. Require cause verification before test authoring. Require a focused red test, smallest fix, deliberate revert-to-red check, and final full-suite validation. Document honest alternatives for inaccessible code paths: extraction, structural, model, and characterization tests. This…

### 为什么适合你

与你 Star 中的 'skills'、'ai-agent' 兴趣高度匹配，该 PR 提出的 'red-green-proof' 调试技能是可独立实践的 AI Agent 小技巧，直接关联开发中的调试工作流。

### 为什么现在学

当前 AI Agent 开发中对可靠测试流程的需求上升，此技能提供一种结构化、可验证的调试范式，适合在 20–30 分钟内快速掌握并应用到实际项目中。

### 今天掌握

- 理解红绿测试（Red-Green-Proof）在 AI Agent 调试中的核心逻辑：先写失败测试（红），再修复代码（绿），最后验证回归（再红）。
- 掌握该技能如何通过最小化修复、明确回滚检查和全量验证，确保生成代码的可靠性。

### 动手任务

- 创建一个名为 `test_red_green_proof.md` 的 Markdown 文件，内容为一个简单的函数需求（如：实现一个计算两个数乘积的函数）。
- 使用该技能的模板（来自 PR 内容）编写一个 `SKILL.md` 文件，定义从‘红’到‘绿’再到‘再红’的三步验证流程，并模拟一次执行结果。预期产物：一份结构清晰、包含三个阶段描述的技能文档。

### 原始资料

- [feat: add red-green-proof debugging skill](https://github.com/anthropics/skills/pull/1701)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Add md2video-audio skill](https://github.com/anthropics/skills/pull/1703)

Adds `md2video-audio`, a zero-cost skill that directly compiles Markdown documents into professional-grade talking-head MP4 videos with realistic human-like voiceovers. `skills/md2video-audio/SKILL.md` — Defines the workflow: Markdown documents are converted via Marp into presentation slides and paired with Microsoft Edge-TTS (Xiaoxiao voice) to generate…

- 推荐原因：与你关注的 'skills' 和 'ai-agent' 兴趣相关，'md2video-audio' 技能可快速体验 AI 生成多媒体内容的潜力，适合轻量级实验。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [Add loopify: a standing brief + one /loop line for jobs that repeat](https://github.com/anthropics/skills/pull/1702)

loopify is a Claude Code skill for jobs that never quite finish — keeping a release PR healthy while reviews trickle in, watching a deploy until it settles, sweeping new bug reports every hour. You describe the job once; the skill reads the project, asks about the few real choices, and writes a standing brief: a file holding what one round of the job does,…

- 推荐原因：与你兴趣中的 'skills'、'agent' 匹配，'loopify' 技能用于自动化重复性任务，可在短时间内理解其循环工作流设计。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：与你星标中的 'claude-code'、'agent' 兴趣一致，提供持久上下文能力，适合了解 AI Agent 的状态保持机制。
- 来源：GitHub Search: claude-code

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*