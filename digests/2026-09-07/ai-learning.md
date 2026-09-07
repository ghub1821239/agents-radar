# 个性化 AI 小技术学习卡 2026-09-07

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add portable CC for Codex Agent Skill

> 预计用时：20–30 分钟 · 难度：入门

This adds `skills/cc-for-codex`, a small, portable Agent Skill that teaches a Codex task how to use an explicitly requested local Claude Code installation as an independent second agent. It covers read-only review, adversarial review, bounded delegation, resumable handoffs, and the permission boundaries needed when two coding agents share a repository. The…

### 为什么适合你

与你 Star 中的 'skills'、'ai-agent'、'codex' 兴趣高度匹配，该技能直接关联你关注的 Codex Agent 与 Claude Code 的协作模式。

### 为什么现在学

当前 AI Agent 协作场景中，本地独立代理的权限边界与任务分发是关键挑战，此技能提供可复用的 portable CC 实现方案，适合快速验证。

### 今天掌握

- 理解 portable CC 技能如何将本地 Claude Code 作为独立第二代理运行
- 掌握 read-only review、adversarial review、bounded delegation 等协作模式的设计原则

### 动手任务

- 在本地创建一个空项目目录，复制 `skills/cc-for-codex` 的 SKILL.md 内容并保存为 `skills/cc-for-codex/SKILL.md`
- 使用 `claude-agent` 或支持 MCP 的客户端运行该技能，观察其是否成功调用本地 Claude Code 并执行一次简单的代码审查任务（如检查函数命名）

### 原始资料

- [Add portable CC for Codex Agent Skill](https://github.com/anthropics/skills/pull/1729)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Make the academy-guide skill use the Claude Academy connector when present](https://github.com/anthropics/skills/pull/1736)

Teaches the `academy-guide` skill to use the Claude Academy connector (the `claude-academy` MCP server: `search_academy`, `get_content`, `list_content`) when its tools are available in a conversation, and to behave exactly as today — fetching the published catalog.json — when they are not. **Why:** Claude Academy now has an MCP connector. A skill cannot…

- 推荐原因：与你关注的 'skill' 和 'ai-agent' 兴趣一致，涉及 Claude Academy 连接器集成，适合探索智能体间上下文联动机制。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [Add api-governance skill (CodeRifts)](https://github.com/anthropics/skills/pull/1708)

Add `api-governance` skill (CodeRifts) Adds one skill, `skills/api-governance/`, and registers it as a single-skill plugin in `.claude-plugin/marketplace.json`. What the skill does It teaches Claude when to ask for a governance decision on an **API or agent-tool contract change**, and how to read the answer. The decision comes from the CodeRifts MCP…

- 推荐原因：与你对 'skills' 和 'ai-agent' 的兴趣匹配，该技能引入 API 变更治理逻辑，适合理解智能体决策中的安全边界设计。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：与你关注的 'agent' 和 'openclaw' 兴趣相关，提供跨会话持久化上下文能力，适合体验轻量级记忆系统实现。
- 来源：GitHub Search: rag

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*