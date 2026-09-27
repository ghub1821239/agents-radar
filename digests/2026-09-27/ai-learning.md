# 个性化 AI 小技术学习卡 2026-09-27

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(pdf): handle plain-string choice options in extract_form_field_info

> 预计用时：20–30 分钟 · 难度：入门

PDF `/Opt` arrays for choice fields may contain plain strings (`["A", "B"]`) or `[export, display]` pairs. `make_field_dict` unconditionally does `state[0]`/`state[1]`, which on a string option yields its first two characters (`"/A"[0] == "/"`) instead of the option value. Keep a plain-string option intact and only split pairs. Verified with `python -m…

### 为什么适合你

与你 Star 中的 skills、skill、ai-agent 兴趣高度匹配，且该 PR 修复了 PDF 表单处理中的具体问题，可拆解为一个独立可动手的小技能练习。

### 为什么现在学

PDF 表单自动化是 AI Agent 常见应用场景，当前代码存在潜在崩溃风险，学习并验证修复逻辑能直接提升实际开发中的健壮性。

### 今天掌握

- 理解 PDF 选择字段中 `/Opt` 数组的两种格式：纯字符串列表与 `[export, display]` 对组
- 掌握如何在 Python 中安全处理混合格式数据，避免因索引错误导致的程序崩溃

### 动手任务

- 克隆 anthropics/skills 仓库并定位到 `extract_form_field_info.py` 文件，复制其内容到本地 `fix_pdf_choice.py`
- 修改代码逻辑：当检测到选项为纯字符串时，直接使用该字符串作为值，不再尝试访问 `state[0]`/`state[1]`；运行 `python -m py_compile fix_pdf_choice.py` 验证语法无误

### 原始资料

- [fix(pdf): handle plain-string choice options in extract_form_field_info](https://github.com/anthropics/skills/pull/1851)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(pdf): raise a clear error when fields.json lacks page info](https://github.com/anthropics/skills/pull/1850)

`fill_pdf_form_with_annotations.py` uses `next(p for p in fields_data["pages"] if p["page_number"] == page_num)`, which raises an unhandled `StopIteration` (or an unhelpful crash) when `fields.json` has no matching page entry. Use a default and raise a descriptive `ValueError` instead. Verified with `python -m py_compile`.

- 推荐原因：修复 PDF 表单缺少页面信息时的错误处理，适合练习异常捕获与健壮性设计
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [fix(pdf): resize thumbnails with LANCZOS instead of nearest-neighbor](https://github.com/anthropics/skills/pull/1849)

`convert_pdf_to_images.py` calls `image.resize((new_width, new_height))` without a resample filter, which defaults to nearest-neighbor and produces visibly jagged thumbnails. Use `Image.Resampling.LANCZOS`, and add the missing `from PIL import Image` import (the file already depends on PIL objects). Verified with `python -m py_compile`.

- 推荐原因：改进图像缩略图生成质量，可动手实践 PIL 图像处理与 resampling 概念
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)

Open-source super AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-agent, multi-model, multi-channel. Lightweight, extensible, one-line install.

- 推荐原因：开源超级 AI 助手框架，支持多智能体与技能调度，与你的 ai-agent、skills 兴趣契合
- 来源：GitHub Search: ai-agent

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*