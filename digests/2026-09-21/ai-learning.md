# 个性化 AI 小技术学习卡 2026-09-21

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 8 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add NiceTryGPT skill for authorized CTF challenge adaptation

> 预计用时：20–30 分钟 · 难度：入门

Adds "nice-try-gpt", an Agent Skill for reviewing and minimally adapting authorized CTF challenges to reduce cheap LLM pattern-matching shortcuts without materially increasing human difficulty. The skill follows a verification-first workflow: 1. reproduce the original challenge end-to-end; 2. identify one evidence-backed cheap shortcut; 3. apply zero, one,…

### 为什么适合你

你 Star 过 'skills' 和 'ai-agent'，该 PR 提出的 NiceTryGPT 技能直接针对 CTF 挑战的 LLM 模式匹配问题，与你的兴趣高度契合，且可拆解为一个独立小技能实践。

### 为什么现在学

当前 AI 安全与对抗性测试趋势上升，该技能设计精巧、流程清晰，适合在 25 分钟内理解并动手实现一个最小可运行版本。

### 今天掌握

- 理解验证优先的工作流：先复现原挑战，再定位廉价捷径，最后最小化修改。
- 掌握如何将 AI 判断与自动化脚本结合，构建可验证的防御性技能逻辑。

### 动手任务

- 创建一个名为 `nice_try_gpt.py` 的 Python 脚本，定义函数 `analyze_challenge(challenge_path)`，模拟读取一个简单的文本挑战文件并返回 'found cheap shortcut' 或 'no shortcut found'。
- 在本地运行脚本，传入一个包含简单模式（如固定格式输入）的示例挑战文件，验证输出是否符合预期，确保逻辑可被后续集成到 Agent 工作流中。

### 原始资料

- [Add NiceTryGPT skill for authorized CTF challenge adaptation](https://github.com/anthropics/skills/pull/1798)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Add AI ML engineering mentor skill](https://github.com/anthropics/skills/pull/1799)

Adds an AI/ML Engineering Mentor skill designed to help users: Learn AI/ML concepts step by step Debug ML and Python implementations Design and review AI/ML projects Work with RAG and agentic AI systems Understand model training, evaluation, and optimization Follow structured workflows for project development The skill includes reference material,…

- 推荐原因：你对 'skills' 和 'ai-agent' 有明确兴趣，该 PR 提出的 AI/ML 工程导师技能结构完整，适合作为可动手的小技能原型学习。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More

- 推荐原因：你关注 'claude-code' 和 'agent'，该项目提供持久上下文机制，是提升 Agent 连贯性的关键技术，适合快速体验。
- 来源：GitHub Search: claude-code

### 3. [feat(skills): add proofcore-contract-auditor for smart contract notarization](https://github.com/anthropics/skills/pull/1771)

Adds `proofcore-contract-auditor`, an Agent Skill for Web3 developers that performs automated static analysis of Solidity and Rust smart contracts and anchors cryptographic audit proofs onto the public TON Blockchain using ProofCore's zero-storage Merkle protocol. What this skill does **Security Audit:** Scans `.sol` and `.rs` files for common…

- 推荐原因：你对 'skills' 和 'ai-agent' 有持续关注，该 PR 中的智能合约审计技能涉及 Web3 与 AI 结合，具有前沿实践价值。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 你的推荐画像

- 公开 Stars：8
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、python、rust、typescript

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*