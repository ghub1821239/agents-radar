# 个性化 AI 小技术学习卡 2026-09-28

> 基于 @ghub1821239 的公开 GitHub Stars 生成：共 9 个 Star；主要兴趣为 ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis。

## 今日主学：fix(pdf): handle plain-string choice options in extract_form_field_info

> 预计用时：20–30 分钟 · 难度：入门

PDF `/Opt` arrays for choice fields may contain plain strings (`["A", "B"]`) or `[export, display]` pairs. `make_field_dict` unconditionally does `state[0]`/`state[1]`, which on a string option yields its first two characters (`"/A"[0] == "/"`) instead of the option value. Keep a plain-string option intact and only split pairs. Verified with `python -m…

### 为什么适合你

与你 Star 中的 'skills'、'skill' 和 'python' 兴趣高度匹配，且该 PR 修复的是 PDF 表单处理中的具体问题，适合拆解为可动手的小技能练习。

### 为什么现在学

PDF 表单自动化是 AI Agent 常见应用场景，掌握此类细节能直接提升 Agent 的健壮性，今日学习可快速落地到实际项目中。

### 今天掌握

- 理解 PDF 中 `choice` 字段的两种数据结构：纯字符串数组（如 ["A", "B"]）和键值对（如 ["export", "display"]）
- 掌握如何在 `make_field_dict` 函数中区分并安全处理这两种格式，避免因索引错误导致逻辑崩溃

### 动手任务

- 在本地创建一个简单的 Python 脚本，模拟 `make_field_dict` 函数，输入一个包含纯字符串选项的列表（如 ['Option1', 'Option2']），输出应保持原样而非尝试切片。
- 修改脚本，添加条件判断逻辑，当元素为字符串时跳过索引操作，仅在元素为列表时执行 `state[0]`/`state[1]` 分解，验证输出结果正确无误。

### 原始资料

- [fix(pdf): handle plain-string choice options in extract_form_field_info](https://github.com/anthropics/skills/pull/1851)
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

## 三个快速候选

### 1. [fix(pdf): raise a clear error when fields.json lacks page info](https://github.com/anthropics/skills/pull/1850)

`fill_pdf_form_with_annotations.py` uses `next(p for p in fields_data["pages"] if p["page_number"] == page_num)`, which raises an unhandled `StopIteration` (or an unhelpful crash) when `fields.json` has no matching page entry. Use a default and raise a descriptive `ValueError` instead. Verified with `python -m py_compile`.

- 推荐原因：与你 Star 中的 'skills' 和 'python' 兴趣匹配，修复了 PDF 处理中常见的空页信息异常，适合拆成小练习提升容错能力。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 2. [fix(pdf): resize thumbnails with LANCZOS instead of nearest-neighbor](https://github.com/anthropics/skills/pull/1849)

`convert_pdf_to_images.py` calls `image.resize((new_width, new_height))` without a resample filter, which defaults to nearest-neighbor and produces visibly jagged thumbnails. Use `Image.Resampling.LANCZOS`, and add the missing `from PIL import Image` import (the file already depends on PIL objects). Verified with `python -m py_compile`.

- 推荐原因：与你 Star 中的 'skills' 和 'python' 兴趣匹配，涉及图像处理优化，可动手实践 PIL 图像重采样技术提升视觉质量。
- 来源：anthropics/skills PR
- 状态：开放 PR，仅建议阅读与实验

### 3. [affaan-m/ECC](https://github.com/affaan-m/ECC)

The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

- 推荐原因：与你 Star 中的 'agent'、'skills'、'llm' 兴趣高度匹配，是当前最活跃的 Agent Harness 系统之一，适合作为进阶参考框架。
- 来源：GitHub Search: llm

## 你的推荐画像

- 公开 Stars：9
- 主要 Topic：ai-agents、skills、agent、ai、ai-agent、claude-code、codex、cordis
- 常见语言：html、javascript、c、python、rust

> GitHub Explore 的私有个性化结果没有官方 API。本报告使用你的公开 Stars、当天 GitHub/Skill 候选及可解释评分生成，不读取浏览器 Cookie 或个人访问令牌。


---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*