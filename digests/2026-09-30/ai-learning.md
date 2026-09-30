# 个性化 AI 小技术学习卡 2026-09-30

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(mcp-builder): collect every page of MCP tools

> 预计用时：20–30 分钟 · 难度：入门

Problem `MCPConnection.list_tools()` reads one `tools/list` response. MCP servers can return `nextCursor`, so every tool after the first page is silently absent from the evaluator's tool set. Evaluation results then misrepresent the server's capabilities. Fix Follow tool-list cursors until the server has no next page. The code accepts the Python MCP SDK v1…

### 为什么适合你

你 Star 了 skills、agent、ai-agent，该项目是针对 MCP 工具列表分页问题的修复，与你的兴趣高度匹配，且可拆解为一个独立小技能实践。

### 为什么现在学

MCP 工具链在 Agent 开发中日益关键，该 PR 解决了工具发现中的核心缺陷，掌握其逻辑能提升你在实际 Agent 系统中对工具调用完整性的把控能力。

### 今天掌握

- 理解 MCP 工具列表分页机制及 `nextCursor` 的作用
- 掌握如何通过循环请求实现多页工具列表收集

### 动手任务

- 在本地创建一个 Python 脚本，模拟 `MCPConnection.list_tools()`，使用 mock 响应测试单页和多页场景
- 修改脚本以支持 `nextCursor` 循环拉取，验证最终返回的工具列表是否完整

### 原始资料

- [fix(mcp-builder): collect every page of MCP tools](https://github.com/anthropics/skills/pull/1923)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(mcp-builder): require tool use for evaluation credit](https://github.com/anthropics/skills/pull/1928)

Problem The MCP evaluation guide requires questions whose answers depend on the server's tools, and the agent prompt says it must use those tools. Yet `evaluate_single_task` awards full credit for a matching ` ` even when `agent_loop` made zero tool calls. A model can guess or recall the answer and make an unusable server appear successful. Fix Require at…

- 推荐原因：聚焦于评估信用机制的修复，直接关联你关注的 skills 和 agent 评估流程，适合快速理解 Agent 评测逻辑
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [affaan-m/ECC](https://github.com/affaan-m/ECC)

The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

- 推荐原因：作为 Claude Code 生态中性能优化与 Agent 架构的核心项目，与你关注的 claude-code、agent、skills 兴趣高度契合
- 来源：GitHub Search: claude-code

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source personal AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-agent, multi-model, multi-channel. Lightweight, extensible, one-line install.

- 推荐原因：开源个人 AI 助手框架，支持任务规划与技能运行，与你关注的 ai-agent、skills 兴趣一致，适合观察 Agent 架构设计
- 来源：GitHub Search: ai-agent

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*