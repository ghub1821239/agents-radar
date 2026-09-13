# AI Open Source Trends 2026-09-13

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-13 00:16 UTC

---

# **AI Open Source Trends Report – 2026-09-13**

---

## **1. Today's Highlights**

The AI open-source ecosystem is witnessing explosive momentum in **agent-driven development**, with autonomous coding agents, memory systems, and agent skill libraries dominating today’s trending list. Notably, *asgeirtj/system_prompts_leaks* has surged to over 65K stars by aggregating system prompts from leading models like Claude Opus 5, GPT-6-Astra, and Grok — a clear indicator of deep community interest in prompt engineering and model internals. Meanwhile, tools like *rtk-ai/rtk* (60–90% token reduction) and *thedotmack/claude-mem* (persistent context across sessions) are solving critical bottlenecks in agent efficiency and continuity. The convergence of **MCP (Multi-Agent Control Plane)**, **RAG**, and **agent skills** into unified frameworks signals a maturing infrastructure layer for next-gen AI workflows.

---

## **2. Top Projects by Category**

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 65,392 (+65,392 today) | A rapidly growing, community-maintained repository of extracted system prompts from major LLMs including Claude, GPT-6-Astra, Gemini, and Grok. Serves as a vital reference for prompt security, adversarial testing, and model behavior analysis. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,100 (+?) | CLI proxy that reduces LLM token consumption by 60–90% on common dev commands. Lightweight, zero-dependency, and optimized for terminal-based agent workflows — a key enabler for cost-efficient AI coding. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,111 (+?) | Agent harness performance optimization system focused on memory, security, and research-first development for Claude Code, Codex, and Cursor. Acts as a foundational layer for high-performance multi-agent systems. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 376 (+376 today) | Fully autonomous AI trading agent operating across 1000+ markets including Binance, Polymarket, Hyperliquid, and Solana DEXs. Built on Claude, it scans for arbitrage edges and executes trades with risk management — a real-world deployment of agent commerce protocols. |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | Go | 189 (+189 today) | Fully autonomous AI agent system capable of performing complex penetration testing tasks. Represents the rise of AI-powered red teaming and security automation, enabling self-hosted offensive agent operations. |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | 113 (+113 today) | Curated library of offensive security skills for the Claude skills system. Each skill is a structured `SKILL.md` file designed to guide Claude through real attack surfaces like SQLi, EDR evasion, and exploit development — a new frontier in AI-assisted cybersecurity. |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 80,535 (+?) | Adaptive web scraping framework that scales from single requests to full crawls. Designed for use with AI agents, it enables robust data collection pipelines for RAG and agent training — a critical infrastructure component. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 504 (+504 today) | Open-source AI sales OS with native AI agents and WhatsApp integration (WAHA). Self-hosted alternative to Kommo and Intercom, built for chat-based sales teams. MCP-ready and LGPD-compliant — a rising trend in vertical AI applications for SMBs. |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | 262 (+262 today) | AI agent specifically designed for mathematical modeling. Automatically generates complete, submission-ready research papers — a powerful tool for academic and competition use cases. Demonstrates specialization in domain-specific agent design. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,843 (+?) | AI-powered video generation workflow that turns topics or keywords into HD short videos. Combines LLMs with automated editing and rendering — a prime example of generative content creation at scale. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,830 (+?) | Train a 64M-parameter LLM from scratch in just 2 hours. Targets developers and researchers seeking fast, low-cost LLM training — a significant leap in accessibility for small-scale model development. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,561 (+?) | A hands-on LLM inference system built for Apple Silicon, combining vLLM and Qwen. Ideal for systems engineers exploring edge inference and lightweight LLM deployment on consumer hardware. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,249 (+?) | Turns codebases, docs, SQL schemas, and PDFs into queryable knowledge graphs using local AST parsing. No vector store required — offers deterministic, explainable retrieval for Claude Code, Cursor, and other agents. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,587 (+?) | Leading open-source RAG engine fusing cutting-edge retrieval with agent capabilities. Enables superior context layers for LLMs, supporting both document and codebase grounding. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,194 (+?) | Drop-in memory infrastructure for AI agents. Enables persistent context across sessions — critical for long-running workflows and personalization. One of the most mature open-source memory systems available. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,747 (+?) | Persistent context system that compresses agent session history and injects relevant context back into future interactions. Works across multiple agents including Claude Code, Copilot, and Gemini — a key enabler for continuous intelligence. |

---

## **3. Trend Signal Analysis**

Today’s data reveals a **paradigm shift toward agent-centric development**, where tools are no longer just about prompting but about building autonomous, persistent, and collaborative AI systems. The explosive growth of *system_prompts_leaks* reflects a growing appetite for transparency and control over model behavior — not just in outputs, but in internal logic. This aligns with recent industry debates around model interpretability and guardrail bypassing, especially following Anthropic’s and OpenAI’s latest model rollouts.

A new **stack is emerging**: **MCP (Multi-Agent Control Plane)** + **agent skills** + **persistent memory** + **token optimization proxies**. Projects like *rtk-ai/rtk*, *affaan-m/ECC*, and *mem0ai/mem0* form a cohesive infrastructure layer enabling efficient, secure, and scalable agent execution. This stack is being adopted by developers building everything from autonomous traders (*CloddsBot*) to security agents (*Pentagi*, *Claude-Red*), indicating a move beyond toy applications into real-world, production-grade use.

Notably, **specialized agent frameworks** are gaining traction — such as MathModelAgent and MoneyPrinterTurbo — suggesting a bifurcation between general-purpose agents and domain-specific "superagents." Combined with the rise of **self-hosted, privacy-first platforms** (e.g., DeskcommCRM, Siyuan), this points to increasing demand for sovereignty and customization in AI workflows.

---

## **4. Community Hot Spots**

- **[asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)** – A must-watch for anyone interested in prompt security, model behavior analysis, or adversarial AI. Its rapid growth signals a cultural shift toward understanding and manipulating model internals.
- **[rtk-ai/rtk](https://github.com/rtk-ai/rtk)** – The gold standard for reducing LLM token costs in developer workflows. Essential for any team running AI agents at scale.
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** – Offers a rare, deterministic alternative to vector-based RAG. Critical for developers who need reproducible, explainable knowledge retrieval.
- **[mem0ai/mem0](https://github.com/mem0ai/mem0)** – The most production-ready open-source memory system. Vital for building long-term, stateful AI agents.
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** – The de facto performance layer for Claude Code and similar agents. A foundational project for serious agent engineering.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*