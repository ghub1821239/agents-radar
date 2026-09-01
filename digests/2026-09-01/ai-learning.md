# 个性化 AI 小技术学习卡 2026-09-01

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add pr-reviewer skill for systematic 7-dimension code review

> 预计用时：20–30 分钟 · 难度：入门

## Summary

Adds `pr-reviewer`, a skill that turns code review from a superficial read into a systematic seven-dimension sweep — correctness, security, performance, contracts, error handling, tests, maintainability — with every finding classified as `blocker` / `should-fix` / `nit`, anchored to `file:line`, and paired with a minimal suggested fix.

- **`skills/pr-reviewer/SKILL.md`** — input detection (`gh pr diff`, branch diff, staged diff), the dimension checklist, output format (verdict + classified findings + questions for the author), and anti-patterns (no style comments when a linter exists, no rewrites when a 3-line fix works, no approving because tests pass).
- **`skills/pr-reviewer/LICENSE.txt`** — Apache 2.0.
- **`.claude-plugin/marketplace.json`** — registers the skill as its own plugin entry.

The engineering-workflow gap: current skills here cover documents, design, and API guidance well, but there is no review skill. This one is deliberately opinionated — it instructs the agent to read tests before implementation, verify suspicions in surrounding code before reporting, and discard any finding it cannot ground in a specific line.

I maintain a larger pack of engineerin

### 为什么适合你

你 Star 了 skills、agent、ai，该 PR 提供了一个系统化七维代码审查技能，与你关注的 AI Agent 工作流和开发效率提升高度契合。

### 为什么现在学

当前 AI Agent 在代码审查中仍依赖人工判断，此技能提供可落地的结构化检查框架，是提升 Agent 可靠性的关键实践。

### 今天掌握

- 理解七维代码审查维度：正确性、安全性、性能、契约、错误处理、测试、可维护性
- 掌握技能输出格式：包含分类标记（blocker/should-fix/nit）、文件行定位和最小修复建议

### 动手任务

- 在本地创建一个空的 `skills/pr-reviewer/SKILL.md` 文件，按模板填写 name 和 description
- 使用 `git diff --check` 验证其 YAML frontmatter 格式是否符合规范

### 原始资料

- [Add pr-reviewer skill for systematic 7-dimension code review](https://github.com/anthropics/skills/pull/1696)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source super AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-model, multi-channel. Lightweight, extensible, one-line install. (formerly chatgpt-on-wechat)

- 推荐原因：作为开源超级 AI 助手框架，它融合多模型、多通道与自进化能力，适合探索 AI Agent 综合工作流。
- 来源：GitHub Search: codex

### 2. [fix(claude-api): condense frontmatter description to fit within 1024-char limit](https://github.com/anthropics/skills/pull/1684)

Closes #1622

## Summary
The `description` frontmatter field in `skills/claude-api/SKILL.md` previously exceeded pi.dev's 1024-character frontmatter cap (1077 characters raw / 1068 characters parsed). This PR condenses and refines the frontmatter description to 950 characters while preserving all essential semantic triggers, SDK keywords (Anthropic TypeScript SDK, Python SDK, Message Batches, Prompt Caching, etc.), and clarity.

## Changes
- Refined the frontmatter `description` in `skills/claude-api/SKILL.md`:
  - Condensed description from 1068 characters down to 950 characters (parsed length).
  - Preserved all SDK keywords (`Anthropic TypeScript SDK`, `Python SDK`, `Message Batches`, `Prompt Caching`, etc.).
  - Retained all model name triggers (`Claude`, `Anthropic`, `Opus`, `Sonnet`, `Haiku`, `Fable`, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`).
  - Retained task types (agent, MCP, tool-definition, multi-agent, RAG, LLM-judge, computer-use, Message Batches, text operations, debugging).
  - Maintained provider skip conditions (`openai`, `langchain_openai`, `google.generativeai`, `genai`, `mistralai`, `cohere`, `ollama`).

## Validation
- Verified YAML f

- 推荐原因：该 PR 处理 frontmatter 字符限制问题，体现对 Skill 描述精炼与可读性的工程实践，适合优化你的 Skill 设计。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [feat: add red-green-proof debugging skill](https://github.com/anthropics/skills/pull/1701)

## Summary

- Add the `red-green-proof` Agent Skill under `skills/red-green-proof/SKILL.md`.
- Require cause verification before test authoring.
- Require a focused red test, smallest fix, deliberate revert-to-red check, and final full-suite validation.
- Document honest alternatives for inaccessible code paths: extraction, structural, model, and characterization tests.

## Why

This provides a disciplined debugging workflow for proving that a regression test is load-bearing rather than merely passing after a fix.

## Validation

- `git diff --check`
- YAML frontmatter follows this repository's skill template with only `name` and `description`.
- The contribution is a self-contained Markdown skill with no runtime dependencies.

## Provenance and attribution

This skill is contributed by RooAGI and developed in the open at https://github.com/RooAGI/red-green-proof. The source project uses the RooAGI brand and MIT licensing; this upstream contribution intentionally contains only the skill payload so it fits the repository's existing self-contained skill convention.


- 推荐原因：引入红绿证明调试技能，提供严谨的回归测试验证流程，契合你对 Agent 可靠性和调试能力的关注。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*