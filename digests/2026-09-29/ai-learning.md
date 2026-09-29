# 个性化 AI 小技术学习卡 2026-09-29

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(mcp-builder): collect every page of MCP tools

> 预计用时：20–30 分钟 · 难度：入门

Problem `MCPConnection.list_tools()` reads one `tools/list` response. MCP servers can return `nextCursor`, so every tool after the first page is silently absent from the evaluator's tool set. Evaluation results then misrepresent the server's capabilities. Fix Follow tool-list cursors until the server has no next page. The code accepts the Python MCP SDK v1…

### 为什么适合你

与你 Star 中的 skills、ai-agent 和 python 兴趣高度匹配，且该 PR 解决了 MCP 工具列表分页收集的关键问题，是可独立练习的小技术。

### 为什么现在学

MCP 生态中工具发现能力直接影响 Agent 性能，掌握此修复逻辑有助于构建更可靠的评估系统，适合今日快速实践。

### 今天掌握

- 理解 MCP 工具列表分页机制：服务器通过 nextCursor 支持分页返回工具列表，但当前 evaluator 只读取第一页。
- 掌握如何遍历所有分页以完整收集工具集，避免评估时遗漏可用工具。

### 动手任务

- 在本地克隆 anthropics/skills 仓库，进入 mcp-builder 目录，创建一个名为 `test_list_tools.py` 的脚本。
- 编写代码模拟 MCP 服务器返回多页工具列表（使用 mock 响应包含 nextCursor），调用 `list_tools()` 函数并打印所有返回的工具，验证是否完整获取所有页面数据。预期产物：输出所有工具名称，无遗漏。

### 原始资料

- [fix(mcp-builder): collect every page of MCP tools](https://github.com/anthropics/skills/pull/1923)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(mcp-builder): require tool use for evaluation credit](https://github.com/anthropics/skills/pull/1928)

Problem The MCP evaluation guide requires questions whose answers depend on the server's tools, and the agent prompt says it must use those tools. Yet `evaluate_single_task` awards full credit for a matching ` ` even when `agent_loop` made zero tool calls. A model can guess or recall the answer and make an unusable server appear successful. Fix Require at…

- 推荐原因：直接关联你的 skills 兴趣，修复评估信用机制，适合拆解为一个小技能实验。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [affaan-m/ECC](https://github.com/affaan-m/ECC)

The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

- 推荐原因：与你 Star 中的 agent、skills、performance 与 research-first 兴趣匹配，是前沿 Agent Harness 系统。
- 来源：GitHub Search: mcp

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source super AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-agent, multi-model, multi-channel. Lightweight, extensible, one-line install.

- 推荐原因：与你 Star 中的 ai-agent、skills 兴趣匹配，开源轻量级 Agent 框架，适合快速体验。
- 来源：GitHub Search: ai-agent

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*