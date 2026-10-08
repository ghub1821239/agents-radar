# 个性化 AI 小技术学习卡 2026-10-08

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：Add seo-control-center skill

> 预计用时：20–30 分钟 · 难度：入门

Claude-Session: https://claude.ai/code/session_011sndqzt1HwGB2cAop3PuUs

### 为什么适合你

你 Star 了 skills、agent、claude-code，此 PR 提出新增一个 SEO 控制中心技能，直接关联你的核心兴趣，且可拆解为小而具体的动手练习。

### 为什么现在学

SEO 工具链是当前 AI Agent 实践中的高频需求，该技能设计简洁，适合在 30 分钟内快速理解并验证其功能逻辑。

### 今天掌握

- 理解 Agent Skill 的结构：输入、输出、执行逻辑与上下文依赖
- 掌握如何通过 PR 中的示例代码构建一个轻量级、可复用的工具型 Skill

### 动手任务

- 在本地创建一个名为 `seo-control-center.py` 的 Python 文件，内容包含一个函数 `run(query: str) -> dict`，返回固定结构的字典如 {'status': 'success', 'suggestions': ['optimize meta tags']}，模拟基础功能。
- 运行该函数并打印结果，验证其作为 Skill 能被 Agent 正常调用（无需部署环境，仅本地测试）

### 原始资料

- [Add seo-control-center skill](https://github.com/anthropics/skills/pull/1984)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [Fix destructive PPTX cleanup when presentation.xml cannot be parsed](https://github.com/anthropics/skills/pull/1954)

Problem `skills/pptx/scripts/clean.py` extracted slide relationship IDs from `ppt/presentation.xml` with a regex, and the safety guard in `remove_orphaned_slides()` used the same regex. When `presentation.xml` was missing, malformed, used a different namespace prefix, or used single-quoted attributes, the regex returned no IDs — so the guard treated the…

- 推荐原因：修复 PPTX 清理脚本中的破坏性行为，是典型的 Agent 安全实践案例，契合你对 skill 与 agent 安全的关注
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [webapp-testing: avoid shell=True in with_server.py](https://github.com/anthropics/skills/pull/1980)

In `skills/webapp-testing/scripts/with_server.py`, server commands were spawned using `subprocess.Popen(..., shell=True)` to support `cd && ` chains. Passing unsanitized user/agent command strings into a system shell introduces command injection risks (CWE-78). Replaced `shell=True` with explicit tokenization via `shlex.split` and `shell=False`. Added…

- 推荐原因：避免 shell=True 是关键安全编码规范，与你关注的 agent 安全和工具链可靠性高度匹配
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source personal AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-agent, multi-model, multi-channel. Lightweight, extensible, one-line install.

- 推荐原因：作为高星开源 AI 助手框架，其多技能调度机制与你关注的 skills、agent 模型高度一致，适合作为进阶参考
- 来源：GitHub Search: ai-agent

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*