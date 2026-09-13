# AI 开源趋势日报 2026-09-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-13 00:16 UTC

---

# **AI 开源趋势报告 – 2026-09-13**

---

## **1. 今日亮点**

AI 开源生态正迎来以**代理驱动开发**为特征的爆发式增长，自主编码代理、记忆系统以及代理技能库成为当前最热门的趋势。值得注意的是，*asgeirtj/system_prompts_leaks* 通过聚合 Claude Opus 5、GPT-6-Astra、Grok 等主流模型的系统提示，迅速攀升至超过 6.5 万星标，充分反映出社区对提示工程与模型内部机制的深度关注。与此同时，*rtk-ai/rtk*（实现 60–90% 的令牌消耗降低）和 *thedotmack/claude-mem*（支持跨会话持久化上下文）等工具正在有效解决代理效率与连续性方面的关键瓶颈。**MCP（多代理控制平面）**、**RAG** 与 **代理技能** 向统一框架的融合，标志着下一代 AI 工作流基础设施的日趋成熟。

---

## **2. 按类别排名的顶级项目**

### 🔧 AI 基础设施

| 项目 | 语言 | 星标数（总计 / 今日） | 概述 |
| :--- | :--- | ---: | :--- |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 65,392 (+65,392 今日) | 一个快速发展的社区维护仓库，收录了包括 Claude、GPT-6-Astra、Gemini、Grok 等主流大模型的提取系统提示。为提示安全、对抗测试与模型行为分析提供重要参考。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,100 (+?) | CLI 代理工具，可在常见开发命令中将大模型令牌消耗降低 60–90%。轻量级、无依赖，专为终端环境下的代理工作流优化——是实现低成本高效 AI 编码的关键组件。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,111 (+?) | 针对 Claude Code、Codex、Cursor 等代理的性能优化系统，聚焦内存管理、安全性与研究导向开发。作为高性能多代理系统的底层基础架构。 |

### 🤖 AI 代理 / 工作流

| 项目 | 语言 | 星标数（总计 / 今日） | 概述 |
| :--- | :--- | ---: | :--- |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 376 (+376 今日) | 全自治的 AI 交易代理，在 Binance、Polymarket、Hyperliquid 以及 Solana DEXs 等超 1000 个市场运行。基于 Claude 构建，可扫描套利机会并执行带风险控制的交易——是代理商业协议在现实场景中的落地应用。 |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | Go | 189 (+189 今日) | 可执行复杂渗透测试任务的全自治 AI 代理系统。代表了 AI 驱动红队与安全自动化的发展趋势，支持自托管进攻型代理操作。 |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | 113 (+113 今日) | 专为 Claude 技能系统设计的进攻性安全技能集合库。每个技能以结构化的 `SKILL.md` 文件形式呈现，引导 Claude 实现真实攻击面操作，如 SQL 注入、EDR 绕过与漏洞开发——是 AI 辅助网络安全的新前沿。 |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 80,535 (+?) | 自适应网络爬虫框架，支持从单次请求扩展至完整爬取。专为与 AI 代理协同设计，可构建稳健的数据采集管道，用于 RAG 与代理训练——关键基础设施组件。 |

### 📦 AI 应用

| 项目 | 语言 | 星标数（总计 / 今日） | 概述 |
| :--- | :--- | ---: | :--- |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 504 (+504 今日) | 开源的 AI 销售操作系统，原生集成 AI 代理与 WhatsApp 集成（WAHA）。可自托管，替代 Kommo 与 Intercom，专为基于聊天的销售团队打造。支持 MCP 且符合 LGPD 要求——中小企业垂直领域 AI 应用的新兴趋势。 |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | 262 (+262 今日) | 专为数学建模设计的 AI 代理。可自动生成完整、可提交的研究论文——学术与竞赛场景的强大工具。体现了特定领域代理设计的专门化趋势。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,843 (+?) | AI 驱动的视频生成工作流，将主题或关键词转化为高清短视频。结合大模型与自动剪辑渲染——大规模生成内容创作的典范。 |

### 🧠 大模型 / 训练

| 项目 | 语言 | 星标数（总计 / 今日） | 概述 |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,830 (+?) | 仅需 2 小时即可从零训练一个 6400 万参数的大模型。面向开发者与研究人员，提供快速、低成本的中小规模模型训练路径——显著提升小模型开发的可及性。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,561 (+?) | 专为 Apple Silicon 设计的动手式大模型推理系统，结合 vLLM 与 Qwen。适合系统工程师探索边缘推理与消费级硬件上的轻量级大模型部署。 |

### 🔍 RAG / 知识

| 项目 | 语言 | 星标数（总计 / 今日） | 概述 |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,249 (+?) | 利用本地 AST 解析，将代码库、文档、SQL 模式与 PDF 转换为可查询的知识图谱。无需向量存储，提供确定性、可解释的检索能力，适用于 Claude Code、Cursor 等代理。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,587 (+?) | 领先的开源 RAG 引擎，融合前沿检索能力与代理功能。为大模型提供卓越的上下文层支持，同时支持文档与代码库双基底。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,194 (+?) | AI 代理的即插即用记忆基础设施。支持跨会话持久化上下文——对长周期工作流与个性化至关重要。目前最成熟的开源记忆系统之一。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,747 (+?) | 持久化上下文系统，可压缩代理会话历史并将其相关上下文注入未来交互。兼容 Claude Code、Copilot、Gemini 等多个代理——持续智能的关键推动者。 |

---

## **3. 趋势信号分析**

今日数据揭示出一种**向代理为中心的开发范式转变**：工具不再只是关于提示，而是致力于构建自主、持久、协作的 AI 系统。*system_prompts_leaks* 的爆炸式增长反映出人们对模型行为透明度与控制力的强烈渴求——不仅限于输出结果，更延伸至模型内部逻辑。这与近期行业围绕模型可解释性与护栏绕过问题的讨论高度一致，尤其在 Anthropic 与 OpenAI 最新模型发布后更为明显。

一个新的**技术栈正在形成**：**MCP（多代理控制平面）** + **代理技能** + **持久化记忆** + **令牌优化代理**。如 *rtk-ai/rtk*、*affaan-m/ECC* 与 *mem0ai/mem0* 等项目共同构成了一套连贯的基础设施层，支持高效、安全、可扩展的代理执行。该技术栈已被开发者广泛应用于从自主交易员（*CloddsBot*）到安全代理（*Pentagi*、*Claude-Red*）等各类场景，表明发展已超越玩具级应用，迈向真实世界、生产级别的使用阶段。

尤为值得关注的是，**专业化代理框架**正日益流行，如 MathModelAgent 与 MoneyPrinterTurbo，预示着通用代理与特定领域“超级代理”之间的分野。结合**自托管、隐私优先平台**（如 DeskcommCRM、Siyuan）的兴起，这一趋势指向对 AI 工作流主权与定制化需求的持续上升。

---

## **4. 社区热点**

- **[asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)** – 对任何关注提示安全、模型行为分析或对抗性 AI 的人而言都是必看项目。其快速增长标志着一种文化转向：人们越来越重视理解并操控模型内部机制。
- **[rtk-ai/rtk](https://github.com/rtk-ai/rtk)** – 开发者工作流中降低大模型令牌成本的标杆方案。任何规模化运行 AI 代理的团队都不可或缺。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** – 提供罕见的、确定性的向量化 RAG 替代方案。对需要可复现、可解释知识检索的开发者至关重要。
- **[mem0ai/mem0](https://github.com/mem0ai/mem0)** – 目前最接近生产环境的开源记忆系统。构建长期、状态化 AI 代理的核心要素。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** – Claude Code 及类似代理的事实性能层。严肃代理工程的基础项目。

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*