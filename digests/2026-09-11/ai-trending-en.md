# AI Open Source Trends 2026-09-11

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-11 00:30 UTC

---

# **AI Open Source Trends Report**  
*Date: 2026-09-11*

---

## **1. Today's Highlights**

The AI open-source ecosystem is witnessing a surge in agent-centric tooling, with frameworks enabling persistent memory, multi-provider routing, and agentic workflows gaining massive traction. Projects like *OmniRoute*, *Caveman*, and *rtk* are driving efficiency by reducing token usage by up to 95%, signaling a shift toward cost-optimized, production-grade AI development. The rise of "agent skills" as modular, reusable components—especially within the Claude Code and Copilot ecosystems—indicates a maturing developer experience layer. Meanwhile, local-first AI agents and self-hosted knowledge systems (e.g., *LLM Wiki*, *Cognee*) are emerging as key infrastructure for privacy-conscious teams.

---

## **2. Top Projects by Category**

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 64,233 (+626) | A free, MIT-licensed AI gateway that unifies 352 providers and 1200+ models into a single endpoint. Features quota-aware auto-fallback and RTK+Caveman compression saving 15–95% tokens—built by 550+ contributors. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,844 (+258) | CLI proxy that cuts LLM token consumption by 60–90% on common dev commands. Single binary, zero dependencies—ideal for efficient agent workflows. |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Go | 104,742 (+277) | A Claude Code skill that reduces token use by 65% by simplifying output to “caveman” language—proves minimalism improves performance. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,893 (+3882) | Agent harness optimized for performance, security, and research-first development across Claude Code, Codex, Cursor, and more—becoming the de facto standard. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | 837 (+837) | Open Multi-Agent Interactive Classroom—launch immersive, real-time collaborative learning environments with one click. |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 142 (+142) | Turns documents into a persistent, interlinked knowledge base via incremental LLM curation—replaces traditional RAG with continuous wiki evolution. |
| [zk-hub/AgentHub](https://github.com/zk-hub/AgentHub) | Python | 10,423 (+1,100) | A unified hub for managing autonomous agents, including task planning, tool execution, and memory persistence—emerging as a central control plane. |
| [Hmbown/Codewhale](https://github.com/Hmbown/Codewhale) | Rust | 40,942 (+277) | Open-source terminal-based coding agent built in Rust, designed for community-driven improvement and low-latency execution. |

> *Note: While not explicitly listed in trending, projects like `langchain-ai/langgraph`, `mem0ai/mem0`, and `ruvnet/ruflo` represent high-momentum agent workflow patterns in topic search.*

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 277 (+277) | Autonomous AI trading agent operating across 1000+ markets—Polymarket, Binance, Solana DEXs, and 5 EVM chains—with risk management and self-hosting support. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,899 (+1,100) | LLM-powered multi-market stock analysis system with real-time news, decision dashboards, and automated alerts—runs locally at zero cost. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,652 (+1,000) | AI productivity studio offering 300+ assistants, smart chat, and access to frontier LLMs—unified interface for personal and team workflows. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,541 (+1,200) | Converts documents or topics into native PowerPoint decks with animations, charts, and audio narration—fully customizable and exportable. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,546 (+1,100) | Train a 64M-parameter LLM from scratch in just 2 hours—ideal for developers seeking lightweight, fast training pipelines. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,557 (+100) | Builds a tiny vLLM + Qwen stack optimized for Apple Silicon—targeted at systems engineers exploring edge inference. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,415 (+50) | OpenCompass is a comprehensive LLM evaluation platform supporting over 100 models—including Llama3, Mistral, GPT-4, and Claude—across 100+ datasets. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,721 (+1,000) | Turns any codebase—including docs, SQL schemas, configs—into a queryable knowledge graph using deterministic AST parsing. No vector store needed. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,465 (+1,200) | Leading open-source RAG engine fusing retrieval with agent capabilities—supports complex reasoning and context fusion. |
| [MemPalace/mempalace](https://github.com/MemPalace/mempalace) | Python | 58,987 (+1,000) | Best-benchmarked open-source AI memory system—free, persistent, and production-ready for long-term agent recall. |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 30,630 (+800) | Self-hosted knowledge graph engine giving AI agents true persistent memory across sessions—ideal for long-running agents. |

---

## **3. Trend Signal Analysis**

Today’s data reveals a clear pivot toward **agent-first, cost-optimized infrastructure**. Tools that reduce token consumption—like *rtk*, *Caveman*, and *OmniRoute*—are seeing explosive growth, indicating rising demand for sustainable, efficient AI workflows. This trend aligns with the recent release of high-cost models like GPT-5 and Claude Opus 5, where token efficiency directly impacts usability and deployment economics.

A new tech stack is emerging: **modular agent skills** combined with **universal gateways** (e.g., OmniRoute) and **persistent memory systems** (e.g., MemPalace, Cognee). This creates a cohesive, composable architecture where developers can mix-and-match tools without vendor lock-in. The dominance of *Claude Code*-related projects (e.g., ECC, Ponytail, Caveman) signals strong momentum around Anthropic’s ecosystem, particularly in agent design and optimization.

Additionally, the rise of **local-first AI applications**—from self-hosted agents (*Codewhale*, *NanoBot*) to knowledge bases (*LLM Wiki*)—reflects growing concerns about data privacy and control. These projects are not just technical experiments but practical solutions for enterprises and individuals seeking sovereignty over their AI workflows.

---

## **4. Community Hot Spots**

- **[diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)** – A universal AI gateway with 1200+ model support and 15–95% token savings. Built by 550+ contributors—this is the new de facto standard for agent connectivity.
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** – The leading agent harness framework for Claude Code and related tools. Its rapid growth suggests it’s becoming the foundation for next-gen AI coding workflows.
- **[rtk-ai/rtk](https://github.com/rtk-ai/rtk)** – A Rust-based CLI proxy cutting token use by 60–90%. Ideal for developers building scalable, low-cost agent systems.
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** – Turns codebases into explainable, queryable knowledge graphs without vectors—revolutionizing how agents understand software.
- **[nashsu/llm_wiki](https://github.com/nashsu/llm_wiki)** – Replacing traditional RAG with a persistent, evolving knowledge base. A game-changer for long-term AI collaboration and documentation.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*