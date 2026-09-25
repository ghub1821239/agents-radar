# 个性化 AI 小技术学习卡 2026-09-25

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add NiceTryGPT skill for authorized CTF challenge adaptation

> 预计用时：20–30 分钟 · 难度：入门

Adds "nice-try-gpt", an Agent Skill for reviewing and minimally adapting authorized CTF challenges to reduce cheap LLM pattern-matching shortcuts without materially increasing human difficulty. The skill follows a verification-first workflow: 1. reproduce the original challenge end-to-end; 2. identify one evidence-backed cheap shortcut; 3. apply zero, one,…

### 为什么适合你

与你 Star 中的 skills、skill、agent 兴趣高度匹配，且是一个可独立动手的小技能，适合在 20–30 分钟内理解并实践。

### 为什么现在学

该 PR 提出的 NiceTryGPT 技能针对 CTF 挑战的模式化漏洞进行智能适配，是当前 AI Agent 安全性与鲁棒性演进中的典型实践，具有现实意义。

### 今天掌握

- 理解 'verification-first' 工作流：先复现挑战，再识别廉价捷径，最后最小化修改。
- 掌握如何通过结构化提示（prompt）让 Agent 自动检测并规避 LLM 常见的模式匹配陷阱。

### 动手任务

- 在本地创建一个简单的 Python 脚本 `test_challenge.py`，模拟一个可被 LLM 快速猜解的简单谜题（如固定格式输入输出），例如：`input: 'abc' → output: 'cba'`。
- 使用 Claude Code 或 Cursor 打开 `skills/ctf/nice-try-gpt.md` 的内容，手动构建一个 prompt 模板，要求 Agent 在执行前验证原逻辑，并尝试引入轻微扰动（如添加空格或大小写变化），然后运行并观察是否仍能正确响应。

### 原始资料

- [Add NiceTryGPT skill for authorized CTF challenge adaptation](https://github.com/anthropics/skills/pull/1798)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Add AI ML engineering mentor skill](https://github.com/anthropics/skills/pull/1799)

Adds an AI/ML Engineering Mentor skill designed to help users: Learn AI/ML concepts step by step Debug ML and Python implementations Design and review AI/ML projects Work with RAG and agentic AI systems Understand model training, evaluation, and optimization Follow structured workflows for project development The skill includes reference material,…

- 推荐原因：与你 Star 中的 skills、ai、agent 兴趣匹配，是一个可动手的 AI/ML 工程导师技能，适合快速上手实践。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [feat(skills): add proofcore-contract-auditor for smart contract notarization](https://github.com/anthropics/skills/pull/1771)

Adds `proofcore-contract-auditor`, an Agent Skill for Web3 developers that performs automated static analysis of Solidity and Rust smart contracts and anchors cryptographic audit proofs onto the public TON Blockchain using ProofCore's zero-storage Merkle protocol. What this skill does **Security Audit:** Scans `.sol` and `.rs` files for common…

- 推荐原因：与你 Star 中的 skills、skill、agent 兴趣匹配，涉及 Web3 安全审计，具备技术深度且可拆解为小练习。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [affaan-m/ECC](https://github.com/affaan-m/ECC)

The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

- 推荐原因：与你 Star 中的 claude-code、agent、skills 兴趣匹配，是当前主流 Agent Harness 中性能优化方向的代表项目。
- 来源：GitHub Search: claude-code

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*