# 个性化 AI 小技术学习卡 2026-10-07

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：webapp-testing: avoid shell=True in with_server.py

> 预计用时：20–30 分钟 · 难度：入门

In `skills/webapp-testing/scripts/with_server.py`, server commands were spawned using `subprocess.Popen(..., shell=True)` to support `cd && ` chains. Passing unsanitized user/agent command strings into a system shell introduces command injection risks (CWE-78). Replaced `shell=True` with explicit tokenization via `shlex.split` and `shell=False`. Added…

### 为什么适合你

与你 Star 中的 skills、skill、agent 兴趣高度匹配，且涉及安全实践，适合在 20–30 分钟内动手理解并验证修复方案。

### 为什么现在学

当前 AI Agent 开发中常见命令注入风险，此 PR 提供了真实场景下的安全编码范例，可直接应用于你的项目中提升安全性。

### 今天掌握

- 理解 `shell=True` 在 subprocess 调用中的安全隐患（CWE-78）
- 掌握使用 `shlex.split` 和 `shell=False` 实现安全命令执行的最佳实践

### 动手任务

- 在本地创建一个 Python 脚本 `safe_shell.py`，使用 `shlex.split` 将用户输入的命令字符串解析为参数列表，并通过 `subprocess.Popen(..., shell=False)` 安全执行。
- 测试脚本对恶意输入如 `; rm -rf /` 的处理：预期输出应为错误或被拒绝执行，而非实际执行系统命令。

### 原始资料

- [webapp-testing: avoid shell=True in with_server.py](https://github.com/anthropics/skills/pull/1980)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Fix destructive PPTX cleanup when presentation.xml cannot be parsed](https://github.com/anthropics/skills/pull/1954)

Problem `skills/pptx/scripts/clean.py` extracted slide relationship IDs from `ppt/presentation.xml` with a regex, and the safety guard in `remove_orphaned_slides()` used the same regex. When `presentation.xml` was missing, malformed, used a different namespace prefix, or used single-quoted attributes, the regex returned no IDs — so the guard treated the…

- 推荐原因：与你关注的 skills 兴趣匹配，且涉及 PPTX 处理中的边界情况修复，适合小范围实验
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [fix(pptx): make clean.py slide resolution namespace-aware and fail closed (#1953)](https://github.com/anthropics/skills/pull/1964)

Addresses #1953 in `skills/pptx/scripts/clean.py`: Previously, `clean.py` extracted slide relationship IDs from `ppt/presentation.xml` using a regex: If `presentation.xml` was missing, malformed, used single-quoted XML attributes (`r:id='rId1'`), or used an alternative namespace prefix (` `), the regex returned no IDs. The safety guard then failed to…

- 推荐原因：与你关注的 skills 兴趣匹配，且聚焦于 XML 解析中的命名空间问题，是典型的边缘案例处理练习
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [affaan-m/ECC](https://github.com/affaan-m/ECC)

The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

- 推荐原因：与你 Star 中的 agent、skills、mcp 兴趣匹配，是一个高性能代理系统，适合作为进阶参考
- 来源：GitHub Search: mcp

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*