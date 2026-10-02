# 个性化 AI 小技术学习卡 2026-10-02

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(skill-creator): add subagent capability check and inline fallback to eval loop

> 预计用时：20–30 分钟 · 难度：入门

Addresses #1942: in `skills/skill-creator/SKILL.md`, the evaluation workflow previously assumed subagents could always be spawned unconditionally at Step 1 (`Spawn all runs (with-skill AND baseline) in the same turn`). In harnesses like Claude Code or other environments where agent system instructions forbid unrequested subagent spawning, or in…

### 为什么适合你

该 PR 与你 Star 中的 'skills'、'agent'、'claude-code' 兴趣高度匹配，聚焦于子代理能力检查与回退逻辑，是可独立练习的 AI Agent 技术细节。

### 为什么现在学

当前 AI Agent 系统对子代理调用的权限控制日益严格，理解并实现安全的子代理调用检查机制是构建健壮 Agent 的关键实践。

### 今天掌握

- 理解子代理调用在 Agent 工作流中的角色及其潜在风险
- 掌握如何在评估循环中添加条件判断以避免非法子代理创建

### 动手任务

- 在本地克隆 anthropics/skills 仓库，进入 skill-creator 目录，创建一个名为 test_subagent_check.py 的文件。
- 编写一个简单的 Python 函数，模拟 PR 所描述的评估流程：当检测到 subagent 调用时，先检查是否允许，若不允许则返回 fallback 回应，验证其是否能正确绕过无效调用。预期产物为一个可运行的测试脚本，输出 'Subagent not allowed, using fallback'。

### 原始资料

- [fix(skill-creator): add subagent capability check and inline fallback to eval loop](https://github.com/anthropics/skills/pull/1947)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(mcp-builder): require tool use for evaluation credit](https://github.com/anthropics/skills/pull/1928)

Problem The MCP evaluation guide requires questions whose answers depend on the server's tools, and the agent prompt says it must use those tools. Yet `evaluate_single_task` awards full credit for a matching ` ` even when `agent_loop` made zero tool calls. A model can guess or recall the answer and make an unusable server appear successful. Fix Require at…

- 推荐原因：聚焦 Agent 评估中的工具使用信用机制，与你关注的 skills 与 agent 架构兴趣直接相关，适合拆解为小实验。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [fix(mcp-builder): collect every page of MCP tools](https://github.com/anthropics/skills/pull/1923)

Problem `MCPConnection.list_tools()` reads one `tools/list` response. MCP servers can return `nextCursor`, so every tool after the first page is silently absent from the evaluator's tool set. Evaluation results then misrepresent the server's capabilities. Fix Follow tool-list cursors until the server has no next page. The code accepts the Python MCP SDK v1…

- 推荐原因：解决多页工具列表收集问题，是 Agent 与 MCP 服务交互中的关键细节，适合快速动手验证。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [affaan-m/ECC](https://github.com/affaan-m/ECC)

The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

- 推荐原因：作为 Claude Code 环境下的性能优化系统，直接关联你 Star 中的 claude-code 与 agent 兴趣，具备高可学习性。
- 来源：GitHub Search: claude-code

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*