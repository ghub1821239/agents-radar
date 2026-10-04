# 个性化 AI 小技术学习卡 2026-10-04

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(pptx): make clean.py slide resolution namespace-aware and fail closed (#1953)

> 预计用时：20–30 分钟 · 难度：入门

Addresses #1953 in `skills/pptx/scripts/clean.py`: Previously, `clean.py` extracted slide relationship IDs from `ppt/presentation.xml` using a regex: If `presentation.xml` was missing, malformed, used single-quoted XML attributes (`r:id='rId1'`), or used an alternative namespace prefix (` `), the regex returned no IDs. The safety guard then failed to…

### 为什么适合你

与你 Star 中的 'skills'、'ai-agent' 兴趣高度匹配，且该 PR 修复了 PPTX 清理脚本中因 XML 命名空间问题导致的破坏性行为，属于可独立拆解的小技术改进，适合快速动手验证。

### 为什么现在学

该问题在实际使用 AI Agent 处理文档时常见，修复逻辑清晰，能直接提升对 AI Agent 工具安全性的理解，是今天可立即应用的实践点。

### 今天掌握

- 理解 XML 命名空间对正则匹配的影响，掌握如何编写健壮的解析逻辑
- 学习如何在工具脚本中实现‘失败闭合’（fail closed）设计原则，防止误删数据

### 动手任务

- 创建一个包含单引号属性和自定义命名空间的 `presentation.xml` 示例文件（如 `<p:presentation xmlns:p='http://example.com'>...</p:presentation>`），并用原 regex 模式测试是否能正确提取 slide ID
- 修改 `clean.py` 中的正则表达式，加入对命名空间前缀的动态匹配支持，并在相同测试文件上验证其不再返回空结果，确保清理逻辑不会误操作

### 原始资料

- [fix(pptx): make clean.py slide resolution namespace-aware and fail closed (#1953)](https://github.com/anthropics/skills/pull/1964)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(mcp-builder): require tool use for evaluation credit](https://github.com/anthropics/skills/pull/1928)

Problem The MCP evaluation guide requires questions whose answers depend on the server's tools, and the agent prompt says it must use those tools. Yet `evaluate_single_task` awards full credit for a matching ` ` even when `agent_loop` made zero tool calls. A model can guess or recall the answer and make an unusable server appear successful. Fix Require at…

- 推荐原因：针对 AI Agent 评估机制中的信用授予漏洞，可快速理解评估流程与工具调用之间的强关联性，适合拆成小技能练习
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [Fix destructive PPTX cleanup when presentation.xml cannot be parsed](https://github.com/anthropics/skills/pull/1954)

Problem `skills/pptx/scripts/clean.py` extracted slide relationship IDs from `ppt/presentation.xml` with a regex, and the safety guard in `remove_orphaned_slides()` used the same regex. When `presentation.xml` was missing, malformed, used a different namespace prefix, or used single-quoted attributes, the regex returned no IDs — so the guard treated the…

- 推荐原因：修复 PPTX 清理中因 XML 解析失败导致的破坏性行为，与主学项目同属文档处理场景，可对比学习错误处理策略
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source personal AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-agent, multi-model, multi-channel. Lightweight, extensible, one-line install.

- 推荐原因：作为高星开源个人 AI 助手框架，与你关注的 'ai-agent'、'skills' 兴趣一致，适合后续深入探索多代理协作模式
- 来源：GitHub Search: ai-agent

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*