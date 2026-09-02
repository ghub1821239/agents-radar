# AI CLI Tools Community Digest 2026-09-02

> Generated: 2026-09-02 00:30 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# **Cross-Tool AI CLI Ecosystem Comparison Report**  
*Generated: 2026-09-02 | Data Source: GitHub Community Digests*

---

### **1. Ecosystem Overview**

The AI CLI ecosystem in Q3 2026 is characterized by rapid innovation in agent autonomy, multimodal workflows, and developer experience (DX), but remains fragmented in stability, reliability, and cross-platform consistency. While all major tools are advancing toward full-stack AI co-development—enabling real-time collaboration, code generation, debugging, and deployment—persistent pain points around session persistence, memory leaks, safety overblocking, and silent failures undermine trust in production use. The convergence of open-source models (Ollama, llama.cpp), local execution, and enterprise-grade security controls reflects a maturing landscape where developers demand both performance and accountability. However, the lack of unified standards for model schema, plugin contracts, and state management continues to hinder interoperability.

---

### **2. Activity Comparison**

| Tool | Issues (Open) | PRs (Last 24h) | Discussions | Release Status |
|------|---------------|----------------|-------------|----------------|
| **Claude Code** | 7 | 1 | N/A | ✅ v2.1.258 & v2.1.257 (patch/minor) |
| **OpenAI Codex** | 10 | 10 | ✅ 5 active threads | ✅ `rust-v0.152.1` (patch), `v0.152.0` (minor), alpha releases ongoing |
| **Gemini CLI** | 10 | 10 | N/A | ✅ v0.59.0-nightly.20260901.g0bd1d4397 (nightly), v0.58.0 (stable) |
| **GitHub Copilot CLI** | 10 | 0 | N/A | ✅ v1.0.83-1 (patch) |
| **OpenCode** | 10 | 10 | N/A | ✅ v1.18.26 (patch) |
| **Pi** | 10 | 10 | N/A | ❌ No new release (stabilization phase) |
| **Qwen Code** | 10 | 10 | N/A | ✅ cua-driver-rs-v0.20.3 (prebuilt binaries only) |

> 🔍 *Notes*:  
> - OpenAI Codex leads in community engagement via discussions and PR velocity.  
> - Pi and Qwen Code show strong internal PR activity despite no public releases.  
> - Tools like Claude Code and GitHub Copilot CLI report minimal recent PRs, indicating stabilization or reduced visibility in upstream data.

---

### **3. Shared Feature Directions**

Multiple tools across the ecosystem are converging on the following high-impact feature needs:

| Feature Direction | Tools Involved | Specific Needs |
|-------------------|----------------|----------------|
| **Core UX Enhancements** | All (esp. OpenAI Codex, OpenCode, Qwen Code) | Undo/redo (`Cmd-Z`), copy-on-select toggle, Vim modal input, session sorting |
| **Local Model Integration** | OpenCode, Qwen Code, Pi, OpenAI Codex | Auto-discovery of Ollama, LM Studio, llama.cpp; seamless config |
| **Agent Reliability & Orchestration** | Gemini CLI, OpenAI Codex, Pi, Qwen Code | Subagent failure detection, turn limit handling, skill activation logic |
| **Session Persistence & Recovery** | All tools | Prevent data loss after crashes, resume state integrity, avoid silent deletions |
| **Security & Privacy Controls** | All tools | API key hygiene, credential redaction, sandboxing, access auditing |
| **Plugin & Extension Ecosystem** | OpenCode, Pi, Qwen Code, OpenAI Codex | Dynamic discovery, isolated execution, secure permission flows |

> 📌 **Key Insight**: The most pressing shared need is **predictable, observable, and safe agent behavior**, with emphasis on preventing silent failures and enabling developer control—especially in long-running or automated workflows.

---

### **4. Differentiation Analysis**

| Aspect | Differentiating Characteristics |
|------|-------------------------------|
| **Target Users** |  
- **Claude Code**: Enterprise + reverse-engineering professionals (Linux safety filter concerns highlight this).  
- **OpenAI Codex**: Power users & teams needing advanced agent orchestration (e.g., `/learn`, `/rewind`).  
- **Gemini CLI**: Developers focused on bash-native execution and AST-aware code understanding.  
- **GitHub Copilot CLI**: DevOps and team environments requiring org-level access enforcement and session governance.  
- **OpenCode**: Local-first, privacy-conscious developers (strong demand for auto-discovery, clipboard fixes).  
- **Pi**: Headless/containerized deployments (security-hardened, proxy-compliant, `--cap-drop ALL` support).  
- **Qwen Code**: Cross-platform contributors (emphasis on Windows extension installs, Node 20 compatibility).  

| **Technical Approach** |  
- **Claude Code**: Fable 5.1 default (1M context), time format customization, deep OS integration (macOS 12 fix).  
- **OpenAI Codex**: Guardian policy enforcement via metadata, rate-limit banners, proactive warnings.  
- **Gemini CLI**: Focus on zero-dependency OS sandboxing, deterministic redaction, subagent lifecycle tracking.  
- **Pi**: Strict separation between user-level and project-level extensions; headless TUI resilience.  
- **Qwen Code**: TUI migration from `ink` to `OpenTUI`, workspace-scoped MCP and skills.  
- **OpenCode**: Plugin-driven instruction sources, async webhooks, browser plugin exposure.  

> ✅ **Differentiator Summary**:  
> - **OpenAI Codex** leads in *agent intelligence* and *observability*.  
> - **Pi** excels in *secure, container-friendly deployment*.  
> - **OpenCode** dominates in *local model accessibility* and *UX polish*.  
> - **Qwen Code** emphasizes *cross-platform stability* and *modular architecture*.

---

### **5. Community Momentum & Maturity**

| Metric | High Momentum | Moderate | Low |
|-------|---------------|----------|-----|
| **PR Velocity** | OpenAI Codex, Qwen Code, Pi | OpenCode, Gemini CLI | Claude Code, GitHub Copilot CLI |
| **Issue Engagement** | OpenCode (#4283: 128 comments), OpenAI Codex (#9618: 115 upvotes) | Others | GitHub Copilot CLI (low comment volume) |
| **Release Cadence** | OpenAI Codex (daily alpha), Qwen Code (binary updates), Gemini CLI (nightly) | Claude Code, OpenCode | Pi (no release), Copilot CLI (patch-only) |

> ⭐ **Top Performers**:  
> - **OpenAI Codex** shows highest maturity in development velocity and community interaction.  
> - **OpenCode** demonstrates strongest grassroots momentum with massive upvotes and vocal UX demands.  
> - **Qwen Code** exhibits engineering depth through modular refactoring and infrastructure upgrades.  
> - **Pi** is mature in niche areas (headless, security) but slower in public release cycles.

> 🚩 **Caution**: Tools with low activity (Copilot CLI, Pi) may be entering maintenance mode—developers should assess risk of stagnation.

---

### **6. Trend Signals**

The community feedback reveals several critical industry trends shaping the future of AI CLI tools:

1. **Shift from Assistive to Autonomous Co-Development**  
   > Demand for `/rewind`, `/undo`, `/model`, and agent self-correction indicates developers no longer want passive assistants—they expect intelligent, accountable partners that can recover from errors and adapt.

2. **Rise of Local & Self-Hosted Workflows**  
   > High demand for auto-discovery of Ollama/LM Studio models (OpenCode #6231, Qwen Code #10520) signals a growing preference for privacy-preserving, offline-capable tooling—especially among security-conscious and embedded systems developers.

3. **Security & Trust Are Non-Negotiable**  
   > Repeated reports of exposed API keys (Gemini CLI #29158), silent credential drops (Pi #8968), and unsafe model calls (Gemini CLI #22672) underscore that trust must be built into the stack—not bolted on later.

4. **UX Is Now a Competitive Moat**  
   > Features like dynamic cursor shapes (Claude Code #32469), copy-on-select toggles (OpenCode #10490), and Vim search navigation (Codex #14630) show that even small UI improvements drive adoption and retention.

5. **Platform-Specific Stability Is a Barrier**  
   > Persistent issues on macOS Monterey (Claude Code), WSL2 (Codex), Windows auto-updates (Claude Code, Copilot CLI), and Linux Kubuntu (OpenCode) reveal that true cross-platform parity remains elusive—requiring dedicated testing infrastructure.

> 💡 **Developer Takeaway**:  
> Choose tools based on **your workflow stage**:  
> - For **enterprise automation**: Prioritize OpenAI Codex (agent control) or GitHub Copilot CLI (org policies).  
> - For **local-first dev**: Go with OpenCode or Qwen Code.  
> - For **secure, headless deployment**: Pi is best-in-class.  
> - For **maximum innovation and polish**: OpenAI Codex and OpenCode lead—but at the cost of stability.

---

✅ **Final Recommendation**:  
The AI CLI space is evolving rapidly, but **reliability and trust remain the primary gatekeepers**. While innovation is accelerating, developers should prioritize tools with proven stability, transparent error handling, and active community responsiveness—especially when integrating into CI/CD or production pipelines.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

**Claude Code Skills Community Highlights Report**  
*Data as of 2026-09-02 | Source: github.com/anthropics/skills*

---

### **1. Top Skills Ranking**  
*(Based on community engagement, issue traction, and PR discussion depth)*

1. **`Hivemind: Zero-Cost Multi-Agent Orchestration Skill`**  
   - **Functionality**: Enables Claude Code to delegate mechanical tasks to headless, free-model workers via opencode.ai while retaining full oversight as planner and reviewer. Optimizes cost by leveraging low-cost inference for repetitive work.
   - **Discussion Highlights**: Praised for redefining agent economics—“The expensive model’s context is the scarce resource, not its intelligence.” Focuses on scalability without increasing compute burden.
   - **Status**: Open (PR #1628), high visibility; likely to be prioritized due to alignment with multi-agent trends.

2. **`skill-quality-analyzer` & `skill-security-analyzer` (Meta Skills)**  
   - **Functionality**: Adds automated quality and security checks for skills across five dimensions (structure, documentation, risk exposure, etc.). Designed for marketplace integrity.
   - **Discussion Highlights**: Direct response to Issue #492 (trust boundary abuse); seen as foundational for future skill governance.
   - **Status**: Open (PR #83), part of a broader push toward self-auditing ecosystems.

3. **`self-audit` (Mechanical + Reasoning Quality Gate)**  
   - **Functionality**: A universal pre-delivery audit that verifies file outputs mechanically and performs four-dimension reasoning checks (e.g., logic consistency, edge-case handling) in priority order.
   - **Discussion Highlights**: Cited in Issue #1385 as a key component of a proposed *Reasoning Quality Gate Pipeline*. Positioned as a critical reliability layer.
   - **Status**: Open (PR #1367), under active consideration.

4. **`scnet-hpc` – SCNet HPC Cluster Management**  
   - **Functionality**: Automates SSH connections, Slurm job submission, profile-based cluster configuration, and module management for high-performance computing workflows.
   - **Discussion Highlights**: Addresses real-world HPC workflow pain points; highly relevant to researchers and engineers using scientific computing environments.
   - **Status**: Open (PR #1615), recently updated; strong technical justification.

5. **`servicenow` – Enterprise Platform Assistant**  
   - **Functionality**: Comprehensive assistant covering ITSM, ITOM, SecOps, FSM, SPM, CSDM, and IntegrationHub within ServiceNow ecosystem.
   - **Discussion Highlights**: One of the most feature-rich proposals; addresses enterprise automation demand. High relevance for IT teams.
   - **Status**: Open (PR #568), actively maintained with updates through August 2026.

6. **`testing-patterns` – Full-Stack Testing Framework**  
   - **Functionality**: Covers testing philosophy, unit testing (AAA pattern), React component testing, integration strategies, and edge-case coverage.
   - **Discussion Highlights**: Fills a gap in developer-focused skill sets; aligns with rising demand for robust test generation.
   - **Status**: Open (PR #723), well-received but pending final review.

7. **`document-typography` – Typographic Quality Control**  
   - **Functionality**: Prevents common AI-generated document flaws: orphaned words, widowed paragraphs, and misaligned numbering.
   - **Discussion Highlights**: Highlights a systemic UX flaw in generated documents—users rarely ask for good typography, but it’s universally expected.
   - **Status**: Open (PR #514), simple yet impactful; may be fast-tracked due to broad usability.

---

### **2. Community Demand Trends**  
From top issues and proposal themes, the following new Skill directions are emerging as *most anticipated*:

- **Workflow Automation & Agent Orchestration**: Demand for skills enabling scalable, multi-agent systems (e.g., `Hivemind`, `agent-governance`) is growing rapidly.
- **Code & Test Generation**: Strong interest in structured, production-grade testing patterns (`testing-patterns`), with emphasis on realism and maintainability.
- **Enterprise Integration**: Skills for ServiceNow, SharePoint Online (SPO), and HPC clusters signal a shift toward mission-critical business and research use cases.
- **Security & Trust Infrastructure**: Post-Issue #492, there's clear momentum toward built-in security analyzers, trust boundaries, and governance patterns.
- **Documentation & Output Quality**: Users increasingly expect polished, publication-ready output—typography, formatting, and structural correctness are now considered non-negotiable.

---

### **3. High-Potential Pending Skills**  
These open PRs have strong traction and are likely candidates for imminent merge:

| Skill | PR | Status | Key Drivers |
|------|-----|--------|------------|
| `Hivemind` (Multi-Agent Orchestration) | [#1628](https://github.com/anthropics/skills/pull/1628) | Open | Cost efficiency, scalability, multi-agent trend |
| `scnet-hpc` (HPC Workflow) | [#1615](https://github.com/anthropics/skills/pull/1615) | Open | High specificity, real-world utility |
| `self-audit` (Quality Gate) | [#1367](https://github.com/anthropics/skills/pull/1367) | Open | Part of formal pipeline proposal (#1385), high reliability value |
| `skill-quality-analyzer` | [#83](https://github.com/anthropics/skills/pull/83) | Open | Core to future marketplace integrity |
| `servicenow` (Enterprise Platform) | [#568](https://github.com/anthropics/skills/pull/568) | Open | Broad scope, enterprise adoption potential |

---

### **4. Skills Ecosystem Insight**  
The community’s most concentrated demand at the Skills level is **reliability and safety-by-design**, particularly around trust boundaries, output quality, and secure execution—driven by the maturation of AI agents from experimental tools to production-grade systems.

---

# Claude Code Community Digest — 2026-09-02

---

### **1. Today's Highlights**  
The latest release, v2.1.258, resolves critical macOS 12 (Monterey) launch failures and fixes a regression in remote session handling after permission re-approval. Meanwhile, v2.1.257 introduced **Claude Fable 5.1** as the default model with 1M context and new time format settings—marking a significant step toward enhanced developer workflow customization. A cluster of high-priority safety filter false positives on Linux systems has sparked community concern around legitimate reverse-engineering and debugging workflows being blocked.

---

### **2. Releases**

#### **v2.1.258** *(2026-09-01)*  
- Fixed: Critical crash on **macOS 12 (Monterey)** caused by a regression introduced in v2.1.255.  
- Fixed: Remote and scheduled sessions failing with `"user messages must have non-empty content"` after re-sent permission approval.  

🔗 [GitHub Release v2.1.258](https://github.com/anthropics/claude-code/releases/tag/v2.1.258)

#### **v2.1.257** *(2026-09-01)*  
- ✅ Added **Claude Fable 5.1 (`claude-fable-5-1`)** as the default Fable model:  
  - 1M token context window  
  - Pricing: $10/$50 per Mtok; $0.25/Mtok for cache reads  
- 🕒 Added configurable **time format** (`timeFormat`) and `timeZone` options:  
  - 12-hour / 24-hour / 24-hour UTC / custom strftime patterns  
  - Applied to turn-end clock and transcript display  

🔗 [GitHub Release v2.1.257](https://github.com/anthropics/claude-code/releases/tag/v2.1.257)

---

### **3. Hot Issues**

| Issue | Summary & Impact | Community Reaction |
|------|------------------|--------------------|
| [#86142](https://github.com/anthropics/claude-code/issues/86142) *CLOSED* | MCP servers rejecting `draft-07` outputSchema due to "unsupported dialect" pre-dispatch on client side. Breaks integration with external agents. | 41 comments, 13 👍 — High severity; closed after fix, but highlights schema compatibility gaps in agent ecosystem. |
| [#61682](https://github.com/anthropics/claude-code/issues/61682) *OPEN* | GitHub connector shows "Connected" but exposes no tools in Cowork on Windows 11 (app v1.8555.2.0). Blocks CI/CD automation. | 31 comments, 24 👍 — Top-reported bug affecting core workflow integrations. Still unresolved. |
| [#53717](https://github.com/anthropics/claude-code/issues/53717) *CLOSED* | Windows auto-update causes message content loss: sessions appear in sidebar, but all content missing from `claude-code-sessions.jsonl`. Data loss risk. | 15 comments, 9 👍 — Closed with fix, but underscores persistent persistence concerns post-update. |
| [#32469](https://github.com/anthropics/claude-code/issues/32469) *OPEN* | Request to support dynamic cursor shape changes in Vim mode: beam in insert, block in normal. Enhances UX for Vim users. | 5 comments, 42 👍 — Most upvoted feature request; reflects growing demand for terminal-level polish. |
| [#91345](https://github.com/anthropics/claude-code/issues/91345) *OPEN* | Fable 5.1 requires unstable release branch — not available in stable channel. Hinders adoption. | 3 comments, 0 👍 — Raised immediately after release; indicates need for better versioning transparency. |
| [#84673](https://github.com/anthropics/claude-code/issues/84673) *OPEN* | Auto-mode classifier generates 5 `cache_control` blocks → API 400 error → “model temporarily unavailable” (regression from v2.1.220). | 3 comments, 0 👍 — High-impact regression disrupting automated workflows. |
| [#86628](https://github.com/anthropics/claude-code/issues/86628) *OPEN* | `getContextUsage` fans out one billed Haiku inference per context item on Bedrock — massive cost inflation. | 3 comments, 0 👍 — Critical cost abuse issue; suggests flawed fallback logic in token counting. |
| [#75792–75346](https://github.com/anthropics/claude-code/issues?q=is%3Aissue+label%3Acyber+label%3Abug+state%3Aclosed) *(13 closed duplicates)* | Multiple **false positive cybersecurity safety blocks** during legitimate hardware/device debugging, reverse-engineering, ADB/Frida use, and crypto protocol analysis on personal devices. Sessions halted mid-workflow. | All carry 3 comments, 0 👍 — Despite closure, these highlight a systemic flaw: overzealous filtering of technical work. Reproducible via Request IDs. |

---

### **4. Key PR Progress**

| PR | Summary | Status |
|----|--------|--------|
| [#78371](https://github.com/anthropics/claude-code/pull/78371) | Hardened `ralph-wiggum` plugin: bounded iterations, push/publish guards, stop-hook fixes. Prevents unattended loops from deploying unfinished code. | ✅ **Closed** — Critical safety improvement for experimental plugins. |
| *[No other PRs updated in last 24h]* | — | — |

---

### **5. Hot Discussions**  
*Not applicable — no discussion data provided.*

---

### **6. Feature Request Trends**

Based on top issues and community feedback, the following trends dominate feature requests:

- **Enhanced Vim Mode UX**: Dynamic cursor shape (beam/block) based on mode is the most requested UI polish (Issue #32469).
- **Stable Model Availability**: Developers demand that new models like Fable 5.1 be available in stable channels, not just unstable builds (Issue #91345).
- **Improved Agent & Plugin Safety Controls**: Users want granular controls over plugin behavior (e.g., loop limits, deploy guards), as seen in the ralph-wiggum PR.
- **Better Time & Format Customization**: Support for custom `strftime` patterns and timezone control is now expected for professional workflows.
- **Cross-Platform Reliability**: Persistent issues on Windows and macOS (especially Monterey) indicate a need for more rigorous platform-specific testing.

---

### **7. Developer Pain Points**

Recurring frustrations across platforms include:

- **Data Loss After Updates**: Windows users report complete message content loss after auto-updates (#53717).
- **Overzealous Safety Filters**: Multiple reports of legitimate technical work (debugging, reverse-engineering, crypto analysis) being blocked mid-session on Linux (#75792–75346).
- **Integration Gaps**: GitHub connector fails to expose tools in Cowork despite showing "Connected" on Windows (#61682).
- **Unstable Model Rollouts**: New models like Fable 5.1 are only accessible via unstable releases, limiting adoption and testing.
- **Cost Transparency Issues**: `getContextUsage` triggering unintended billing on Bedrock raises red flags about cost predictability (#86628).

> 🔔 **Developer Takeaway**: While innovation accelerates with Fable 5.1 and advanced features, stability, reliability, and trust in safety systems remain critical hurdles—especially for developers working on sensitive or low-level systems.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# **OpenAI Codex Community Digest – 2026-09-02**

---

### **1. Today's Highlights**  
The latest release, `rust-v0.152.1`, resolves a critical Guardian policy enforcement issue by ensuring Node REPL policies are respected via model metadata. This follows the broader `v0.152.0` update that introduced Vim search enhancements and rate-limit action banners—key usability improvements for power users. Meanwhile, a wave of high-priority bug reports highlights persistent issues with Windows performance, session stability, and quota accounting, underscoring ongoing challenges in reliability and transparency.

---

### **2. Releases**

#### **`rust-v0.152.1` (Patch)**  
- **Bug Fix**: Guardian approval reviews now correctly honor Node REPL policies provided through model metadata.  
  🔗 [Changelog](https://github.com/openai/codex/compare/rust-v0.152.0...rust-v0.152.1)

#### **`rust-v0.152.0` (Minor)**  
- **Vim Mode Enhancements**: Support for `/` and `?` searches within drafts, with match highlighting and repeat navigation using `n`/`N`.  
- **Rate-Limit UX**: New banners provide actionable steps—check usage, manage credits, reset limits, or upgrade plans.  
- **Terminal UI & `codex exec`**: Improved shell integration and execution flow.  

#### **Alpha Releases (`0.153.0-alpha.1` to `0.153.0-alpha.4`)**  
- Ongoing development focused on agent autonomy, plugin coordination, and remote execution stability. No public feature details yet.

---

### **3. Hot Issues**

| Issue | Summary | Why It Matters | Community Reaction |
|------|--------|----------------|--------------------|
| [#14630](https://github.com/openai/codex/issues/14630) | Voice transcription support for TUI | Users want access to superior OpenAI voice models in CLI; currently limited to basic dictation. | 22 comments, 58 upvotes — strong demand for voice input in terminal workflows. |
| [#38754](https://github.com/openai/codex/issues/38754) | Windows: Local stdio MCP servers repeatedly spawn and not reaped | Causes resource exhaustion and task instability in long-running sessions. | 19 comments — indicates systemic flaw in process lifecycle management on Windows. |
| [#39954](https://github.com/openai/codex/issues/39954) | Windows + Android Remote Control enters reconnect loop | Renders remote control unusable after successful initial connection. | 18 comments — major blocker for mobile developers relying on cross-device workflows. |
| [#40782](https://github.com/openai/codex/issues/40782) | macOS: UI text became thin and blurry post-update | Affects readability and user experience on Apple Silicon Macs. | 12 comments — visible regression impacting visual fidelity. |
| [#41433](https://github.com/openai/codex/issues/41433) | GitHub connector fails `mark_pull_request_ready_for_review` due to invalid `fullDatabaseId` | Blocks automated PR review workflows in enterprise environments. | 11 comments, 7 upvotes — critical for CI/CD integration. |
| [#41220](https://github.com/openai/codex/issues/41220) | Abnormal quota depletion across multiple accounts | Users report sudden, unexplained credit loss despite consistent usage patterns. | 11 comments, 6 upvotes — raises trust concerns around billing accuracy. |
| [#41088](https://github.com/openai/codex/issues/41088) | Windows: Local execution fails after desktop app update | Prevents local code execution post-upgrade, breaking core workflow. | 11 comments — urgent for developers relying on offline tooling. |
| [#38417](https://github.com/openai/codex/issues/38417) | WSL2: `codex-code-mode-host` crashes with SIGTRAP on every shell exec | Breaks Linux/WSL integration entirely in version 0.147.0. | 11 comments — severe regression affecting WSL-based dev environments. |
| [#39121](https://github.com/openai/codex/issues/39121) | Historical local projects disappear after update | Data loss risk for long-term projects; users lose work history. | 11 comments — serious concern for project continuity. |
| [#41809](https://github.com/openai/codex/issues/41809) | Windows: `thread/start` fails due to sandbox glob overflow | Blocks new thread creation due to command-line length limits. | 2 comments, 1 upvote — low visibility but high impact for sandboxed workflows. |

---

### **4. Key PR Progress**

| PR | Summary | Impact |
|----|--------|--------|
| [#42151](https://github.com/openai/codex/pull/42151) | Expose model settings (`model`, `reasoningEffort`) in app-server thread metadata | Enables better observability and orchestration of multi-agent systems. |
| [#42150](https://github.com/openai/codex/pull/42150) | Support remote marketplaces in plugin CLI | Expands plugin ecosystem beyond local installs; enables dynamic plugin discovery. |
| [#42147](https://github.com/openai/codex/pull/42147) | Skip Guardian reviews in Full Access mode | Reduces friction in high-trust environments where approvals are redundant. |
| [#42146](https://github.com/openai/codex/pull/42146) | Resolve permission requests in executor context | Ensures accurate path resolution across different OSes and environments. |
| [#42144](https://github.com/openai/codex/pull/42144) | Add Guardian V2 analytics events | Improves telemetry for security and compliance monitoring. |
| [#42142](https://github.com/openai/codex/pull/42142) | Add early rate-limit warnings for Plus/Team plans | Proactive alerts help prevent unexpected throttling during long tasks. |
| [#42140](https://github.com/openai/codex/pull/42140) | Add redo support to Vim composer history | Directly addresses long-standing UX gap in editor navigation. |
| [#42137](https://github.com/openai/codex/pull/42137) | Prewarm shell snapshots for eligible turns | Speeds up local command execution by reducing startup latency. |
| [#42135](https://github.com/openai/codex/pull/42135) | Support thread forks from symlinked session roots | Fixes edge case blocking reproducible workflows in shared setups. |
| [#42121](https://github.com/openai/codex/pull/42121) | Allow updating approval reviewer for active turns | Increases flexibility in collaborative agent workflows. |

---

### **5. Hot Discussions**

#### **Ideas**
- [#9618](https://github.com/openai/codex/discussions/9618) *How is there not a /rewind or /revert feature?*  
  📌 **Demand for undo/redo functionality** is overwhelming (19 comments, 115 upvotes). Developers cite OpenCode and Claude Code as benchmarks.  
  🔗 [Discussion](https://github.com/openai/codex/discussions/9618)

- [#2379](https://github.com/openai/codex/discussions/2379) *Undo / redo typing*  
  📌 Request for `Cmd-Z`/`Shift-Cmd-Z` support in prompt composer — still active after over 1 year.  
  🔗 [Discussion](https://github.com/openai/codex/discussions/2379)

#### **Show and Tell**
- [#42041](https://github.com/openai/codex/discussions/42041) *agent-watch — distinguish DONE, FAILED, STALL in background `codex exec`*  
  🛠️ Tool helps detect silent failures when running agents in parallel — crucial for debugging automation pipelines.  
  🔗 [Discussion](https://github.com/openai/codex/discussions/42041)

- [#41635](https://github.com/openai/codex/discussions/41635) *Skill Sunset: audit stale AGENTS.md rules*  
  🧹 Local, read-only audit tool to clean up outdated agent instructions — practical solution for maintainability.  
  🔗 [Discussion](https://github.com/openai/codex/discussions/41635)

- [#41898](https://github.com/openai/codex/discussions/41898) *Codex Task Title Organizer*  
  🏷️ Plugin to auto-generate meaningful task titles without reading transcripts — improves sidebar discoverability.  
  🔗 [Discussion](https://github.com/openai/codex/discussions/41898)

- [#42064](https://github.com/openai/codex/discussions/42064) *7 free SKILL.md skills from staff engineer workflows*  
  🎯 One-command install of proven engineering practices (code review, test gen, commit hygiene).  
  🔗 [Discussion](https://github.com/openai/codex/discussions/42064)

#### **Q&A / General**
- [#42049](https://github.com/openai/codex/discussions/42049) *Bundled-marketplace refresh leaks staging directories*  
  💾 Reports ~31 GiB disk consumption due to abandoned temp dirs — serious storage issue on macOS.  
  🔗 [Discussion](https://github.com/openai/codex/discussions/42049)

- [#41717](https://github.com/openai/codex/discussions/41717) *In-app `/mcp reload` command request*  
  🔁 Developers need a way to refresh MCP server connections without restarting the session.  
  🔗 [Discussion](https://github.com/openai/codex/discussions/41717)

---

### **6. Feature Request Trends**

Based on top Issues and Discussions, recurring themes include:
- **Editorial UX**: Undo/redo, prompt history, and keyboard navigation (e.g., Vim `n`/`N`).
- **Agent Autonomy**: Self-evolving agents, instruction distillation (`/learn`), rule metabolism.
- **Remote & Cross-Platform Workflows**: Mobile remote control, file upload support, stable multi-device sync.
- **Transparency & Control**: Real-time usage tracking, quota auditing, model effort proofing.
- **Plugin & Marketplace Expansion**: Remote plugin discovery, dynamic updates, secure credential handling.

> ✅ **Top Trend**: Developers increasingly demand **self-service, observable, and reliable agent systems** — not just AI assistance, but intelligent, accountable software co-developers.

---

### **7. Developer Pain Points**

High-frequency frustrations observed:
- **Unexplained Quota Depletion** ([#41220](https://github.com/openai/codex/issues/41220), [#41968](https://github.com/openai/codex/issues/41968)): Users report sudden credit loss despite stable usage, eroding trust.
- **Windows Stability Crashes** ([#38754](https://github.com/openai/codex/issues/38754), [#41088](https://github.com/openai/codex/issues/41088), [#41809](https://github.com/openai/codex/issues/41809)): Repeated spawning, infinite hangs, and sandbox failures hinder productivity.
- **Session & Data Loss** ([#39121](https://github.com/openai/codex/issues/39121)): Historical projects vanish after updates — data integrity concerns.
- **Missing Core Editor Features** ([#2379](https://github.com/openai/codex/issues/2379), [#9618](https://github.com/openai/codex/discussions/9618)): Lack of undo/redo and backspace recovery makes drafting feel risky.
- **Remote Workflow Gaps** ([#37074](https://github.com/openai/codex/issues/37074), [#42049](https://github.com/openai/codex/discussions/42049)): File uploads, UI flickering, and disk bloat impair mobile and cloud workflows.

> ⚠️ **Summary**: While Codex advances in agent capabilities and integrations, **core UX reliability, system stability, and developer trust** remain key hurdles for widespread adoption in production environments.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Gemini CLI Community Digest – 2026-09-02**

---

### **1. Today's Highlights**  
The Gemini CLI team shipped **v0.59.0-nightly.20260901.g0bd1d4397**, introducing critical fixes to shell execution stability and symlink handling in file operations. A major security patch removed a hardcoded Google CrUX API key from the `chrome-devtools-mcp` bundle, addressing a high-risk exposure vector. Meanwhile, core agent reliability remains under active scrutiny, with multiple P1 bugs related to subagent behavior and session hangups.

---

### **2. Releases**  
- **v0.59.0-nightly.20260901.g0bd1d4397**  
  [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.59.0-nightly.20260831.g0bd1d4397...v0.59.0-nightly.20260901.g0bd1d4397)  
  - Fixed shell command execution hanging after completion ("Waiting input" state).  
  - Improved symlink-aware glob resolution for workspace roots (fixes #28416).  
  - Added deterministic redaction and reduced Auto Memory logging (addresses #26525).  

- **v0.58.0**  
  [Changelog](https://github.com/google-gemini/gemini-cli/pull/28918)  
  - Ensured consistent symlink evaluation in ignore path handling (#28915).  
  - Refactored core logic for improved maintainability and extensibility.

---

### **3. Hot Issues**  
| Issue | Summary & Significance | Community Reaction |
|------|------------------------|--------------------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent reports "GOAL success" despite hitting MAX_TURNS — hides interruptions | 13 comments, 2 👍; critical for accurate agent feedback |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs indefinitely on simple tasks | 8 comments, 8 👍; top priority due to usability impact |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model’s native bash affinity via Zero-Dependency OS Sandboxing | 9 comments, 1 👍; foundational for performance & security |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess AST-aware file reads/search for precision and efficiency | 7 comments, 1 👍; key for reducing token bloat and improving accuracy |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Agent fails to auto-use skills/sub-agents even when relevant | 6 comments, 0 👍; indicates poor skill orchestration |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | Auto Memory logs secrets before redaction — security risk | 5 comments, 0 👍; P2 but high sensitivity due to data exposure |
| [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | Shell commands stuck in "Awaiting input" after completion | 4 comments, 3 👍; frequent user pain point |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | Browser sub-agent fails under Wayland | 4 comments, 1 👍; platform-specific regression affecting Linux users |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | Browser agent lacks session takeover/resilience | 4 comments, 0 👍; critical for long-running automation |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Model uses destructive Git commands (`reset --force`) | 3 comments, 1 👍; safety concern for production workflows |

---

### **4. Key PR Progress**  
| PR | Summary & Impact | Link |
|----|------------------|------|
| [#29163](https://github.com/google-gemini/gemini-cli/pull/29163) | Prevents crash during auth in restricted Git repos (macOS Seatbelt) | [Link](https://github.com/google-gemini/gemini-cli/pull/29163) |
| [#29158](https://github.com/google-gemini/gemini-cli/pull/29158) | Sanitizes hardcoded CrUX API key from `chrome-devtools-mcp` bundle | [Link](https://github.com/google-gemini/gemini-cli/pull/29158) |
| [#29156](https://github.com/google-gemini/gemini-cli/pull/29156) | Restores user git config in shell executions (previously nullified) | [Link](https://github.com/google-gemini/gemini-cli/pull/29156) |
| [#29155](https://github.com/google-gemini/gemini-cli/pull/29155) | Fixes BOM decoding in `isEmpty()` to avoid false non-empty detection | [Link](https://github.com/google-gemini/gemini-cli/pull/29155) |
| [#29151](https://github.com/google-gemini/gemini-cli/pull/29151) | Makes skill precedence and activation case-insensitive | [Link](https://github.com/google-gemini/gemini-cli/pull/29151) |
| [#28975](https://github.com/google-gemini/gemini-cli/pull/28975) | Preserves glob results for symlinked workspace roots | [Link](https://github.com/google-gemini/gemini-cli/pull/28975) |
| [#29115](https://github.com/google-gemini/gemini-cli/pull/29115) | Enforces strict permission checks on system-wide config paths | [Link](https://github.com/google-gemini/gemini-cli/pull/29115) |
| [#29117](https://github.com/google-gemini/gemini-cli/pull/29117) | Implements RFC 9207 issuer validation in MCP OAuth flow | [Link](https://github.com/google-gemini/gemini-cli/pull/29117) |
| [#29106](https://github.com/google-gemini/gemini-cli/pull/29106) | Ensures final SSE event is flushed even without trailing blank line | [Link](https://github.com/google-gemini/gemini-cli/pull/29106) |
| [#28866](https://github.com/google-gemini/gemini-cli/pull/28866) | Ignores `.gemini` folder by default in file search | [Link](https://github.com/google-gemini/gemini-cli/pull/28866) |

---

### **5. Hot Discussions**  
*No discussion threads were provided in the dataset. This section is omitted.*

---

### **6. Feature Request Trends**  
The community is converging on three core directions:  
1. **Agent Intelligence & Autonomy**: Users want agents to *proactively use* skills and sub-agents without explicit prompting ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).  
2. **Bash-Centric Execution**: Strong demand for leveraging the model’s native bash proficiency via sandboxed, zero-dependency toolchains ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)).  
3. **Codebase Understanding via AST**: High interest in AST-aware tools for precise code navigation, search, and mapping to reduce token overhead and improve accuracy ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)).

---

### **7. Developer Pain Points**  
Recurring frustrations include:  
- **Agent Hangs & Deadlocks**: Multiple P1 issues report generalist or browser agents freezing mid-task, often requiring manual termination ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), [#22232](https://github.com/google-gemini/gemini-cli/issues/22232)).  
- **Unreliable State Tracking**: Subagents report incorrect success states even when failing due to turn limits ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), undermining trust in outcomes.  
- **Security & Privacy Risks**: Exposed credentials (e.g., CrUX API key) and improper redaction of sensitive content in memory logs remain top concerns ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525), [#29158](https://github.com/google-gemini/gemini-cli/pull/29158)).  
- **Filesystem Quirks**: Symlinks, NTFS short names, and BOM handling continue to cause silent failures in file operations ([#28975](https://github.com/google-gemini/gemini-cli/pull/28975), [#29116](https://github.com/google-gemini/gemini-cli/pull/29116), [#29155](https://github.com/google-gemini/gemini-cli/pull/29155)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# **GitHub Copilot CLI Community Digest – 2026-09-02**

---

### **1. Today's Highlights**  
The latest release, **v1.0.83-1**, introduces enhanced session sorting and enterprise sign-in controls, improving usability and security for team environments. Meanwhile, critical memory and stability issues—particularly JavaScript heap out-of-memory crashes during long-session resume—have emerged as top concerns in the community.

---

### **2. Releases**  
**v1.0.83-1** (2026-09-01)  
- ✅ **Added**:  
  - New sorting options (Recent, Created, Name, None) in the split Sessions sidebar with persistent user preferences across restarts.  
  - Enterprise admins can now enforce sign-in to approved GitHub organizations via `forceLoginOrgs` managed setting.  
- ✅ **Improved**:  
  - Enhanced `/mcp config` and MCP add/edit workflows for better configuration management.

🔗 [GitHub Release v1.0.83-1](https://github.com/github/copilot-cli/releases/tag/v1.0.83-1)

---

### **3. Hot Issues**  
Top 10 most discussed or impactful issues based on engagement and severity:

1. **[Issue #13] CLI input should have a vi/vim input mode** (9 comments, 75 👍)  
   📌 *Why it matters*: Power users demand modal editing for faster, keyboard-driven interaction. This is a high-priority UX request from Vim/Vi adopters.  
   🔗 [GitHub Issue #13](https://github.com/github/copilot-cli/issues/13)

2. **[Issue #4664] CLI crashes with JS heap OOM when resuming long sessions** (5 comments, 0 👍)  
   📌 *Why it matters*: Critical stability bug affecting long-running sessions; impacts productivity and trust in the tool.  
   🔗 [GitHub Issue #4664](https://github.com/github/copilot-cli/issues/4664)

3. **[Issue #4686] Node.js OOM crash after ~37 min — 31,965 leaked async libuv handles** (1 comment, 0 👍)  
   📌 *Why it matters*: Indicates deep resource leak in event loop handling, likely related to streaming or agent concurrency.  
   🔗 [GitHub Issue #4686](https://github.com/github/copilot-cli/issues/4686)

4. **[Issue #4680] CLI sends wrong model ID to custom OpenAI-compatible endpoints** (2 comments, 0 👍)  
   📌 *Why it matters*: Breaks integration with non-OpenAI models (e.g., `mimo-v2.5`) due to hardcoded `gpt-5.4-nano`.  
   🔗 [GitHub Issue #4680](https://github.com/github/copilot-cli/issues/4680)

5. **[Issue #4525] Legacy `initialize` sent after modern `server/discover`, causing -32022** (4 comments, 0 👍)  
   📌 *Why it matters*: Conflicts with new MCP SDK 2.0.0 dual-era servers, breaking compatibility.  
   🔗 [GitHub Issue #4525](https://github.com/github/copilot-cli/issues/4525)

6. **[Issue #4438] `disable-model-invocation: true` makes skill unreachable, not manual-only** (3 comments, 6 👍)  
   📌 *Why it matters*: Misalignment between design intent and behavior—skills become unusable even manually.  
   🔗 [GitHub Issue #4438](https://github.com/github/copilot-cli/issues/4438)

7. **[Issue #4681] OAuth initialize request omits User-Agent header post-login** (2 comments, 0 👍)  
   📌 *Why it matters*: Can break auth flows in systems relying on `User-Agent` for rate-limiting or logging.  
   🔗 [GitHub Issue #4681](https://github.com/github/copilot-cli/issues/4681)

8. **[Issue #4672] `/model` command broken with BYOK + env vars** (2 comments, 1 👍)  
   📌 *Why it matters*: Regression affecting customization of models in enterprise or self-hosted setups.  
   🔗 [GitHub Issue #4672](https://github.com/github/copilot-cli/issues/4672)

9. **[Issue #4688] Subagent concurrency limiter is load-blind** (0 comments, 0 👍)  
   📌 *Why it matters*: Risk of UI freeze and system saturation due to unbounded parallelism.  
   🔗 [GitHub Issue #4688](https://github.com/github/copilot-cli/issues/4688)

10. **[Issue #4687] Repo-level instruction files (AGENTS.md) lost after `/compact`** (0 comments, 0 👍)  
    📌 *Why it matters*: Undermines consistency in agent behavior over time, especially in long sessions.  
    🔗 [GitHub Issue #4687](https://github.com/github/copilot-cli/issues/4687)

---

### **4. Key PR Progress**  
*No new pull requests were merged in the last 24 hours.*  
⚠️ No active PRs visible in the data stream. Development appears to be in stabilization phase following recent release.

---

### **5. Hot Discussions**  
*No discussion threads were provided in the dataset.*

---

### **6. Feature Request Trends**  
Based on recurring themes in issues and community feedback, the top feature directions are:

- **Enhanced Keyboard & Editing Experience**: Strong demand for Vi/Vim modal input mode (#13), indicating a desire for terminal-native efficiency.
- **Session Stability & Memory Management**: Multiple OOM and crash reports point to urgent need for better memory hygiene and session lifecycle handling.
- **Advanced Agent & Skill Control**: Requests for granular permissions (`write(path)` approvals), better skill visibility under `disable-model-invocation`, and proper agent discovery (e.g., plugins).
- **Better Context Persistence**: Users want repo-level instructions and configurations preserved through context compaction and session resume.
- **Enterprise-Grade Security & Access Control**: Features like org-bound login enforcement (`forceLoginOrgs`) and fine-grained write approvals reflect growing needs in regulated environments.

---

### **7. Developer Pain Points**  
Recurring frustrations include:

- **Unpredictable Session Behavior**: Model selection ignored during resume (#4645), session state corruption after compact (#4687), and silent failures when skills are disabled.
- **Resource Leaks & Crashes**: Persistent memory leaks (libuv handles, heap exhaustion) leading to crashes after moderate runtime.
- **Inconsistent Configuration Handling**: Mixed base directories for agents vs. skills (#3688), broken BYOK model resolution (#4672), and improper fallback logic.
- **Toolchain Integration Gaps**: Failures with Azure DevOps (#3421), PowerShell ConstrainedLanguage (#4683), and long-path file errors during marketplace setup (#4690).
- **Lack of Visibility into Internal State**: Silent failures (e.g., missing skills, model mismatches), no error feedback, and unclear diagnostics hinder debugging.

---

> 🔗 *Stay updated: [github.com/github/copilot-cli](https://github.com/github/copilot-cli)*  
> 💬 *Engage with the community: File issues, comment on trends, and contribute to shaping Copilot CLI’s future.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-02

---

### **1. Today's Highlights**  
The OpenCode v1.18.26 release strengthens reasoning stability across Claude 5 and Bedrock GPT-5.6 models, particularly improving resilience to stale thinking blocks and enhancing replay handling. Meanwhile, community momentum is building around core UX improvements—most notably, the high-profile `Copy To Clipboard` failure (Issue #4283) and growing demand for auto-discovery of local models (Issue #6231)—highlighting a strong push toward seamless developer experience.

---

### **2. Releases**  
**v1.18.26**  
- ✅ **Claude 5 sessions** now tolerate stale thinking blocks during prompt/tool changes, reducing session crashes.  
- ✅ **Bedrock GPT-5.6 models** accept `none` reasoning effort and exhibit more reliable reasoning/replay behavior.  
- ✅ Tool call timing accuracy preserved even during dynamic context shifts.  
🔗 [GitHub Release](https://github.com/anomalyco/opencode/releases/tag/v1.18.26)

---

### **3. Hot Issues**  
| Issue | Summary | Why It Matters | Community Reaction |
|------|--------|----------------|--------------------|
| [#4283](https://github.com/anomalyco/opencode/issues/4283) | Copy-to-clipboard fails despite text selection | Critical UX blocker; breaks workflow for developers relying on quick copy-paste | **128 comments**, **119 👍** – *Top priority issue* |
| [#6231](https://github.com/anomalyco/opencode/issues/6231) | Auto-discover OpenAI-compatible local models (Ollama, LM Studio, etc.) | Eliminates manual config burden; essential for local dev workflows | **47 comments**, **225 👍** – *Most upvoted feature request* |
| [#10490](https://github.com/anomalyco/opencode/issues/10490) | Disable copy-on-select behavior | Addresses user preference for traditional selection (e.g., in terminal-like UIs) | **18 comments**, **32 👍** |
| [#3688](https://github.com/anomalyco/opencode/issues/3688) | System theme no longer works post-v1.0.0 | Breaks accessibility and customization expectations | Closed with **38 comments**, **20 👍** – *Legacy bug resurfacing* |
| [#19466](https://github.com/anomalyco/opencode/issues/19466) | CPU usage spikes at 50% during API rate limits | Performance regression impacting long-running or low-resource systems | **16 comments**, **16 👍** |
| [#46625](https://github.com/anomalyco/opencode/issues/46625) | Ollama’s `qwen2.5-coder:7b` tool calls fail | Blocks critical agent functionality on popular local model | **4 comments**, **0 👍** – *High impact, niche but urgent* |
| [#45274](https://github.com/anomalyco/opencode/issues/45274) | Subscription misassignment due to shared workspace | Financial and access control concern for paid users | **5 comments**, **0 👍** – *Support escalation risk* |
| [#36383](https://github.com/anomalyco/opencode/issues/36383) | Fresh install crashes on GPU process exit (-2147483645) | Prevents adoption on Windows machines with discrete GPUs | **3 comments**, **0 👍** – *Critical launch blocker* |
| [#46685](https://github.com/anomalyco/opencode/issues/46685) | Subagent progress hidden from external integrations | Hinders observability and automation in multi-agent pipelines | **2 comments**, **0 👍** |
| [#46635](https://github.com/anomalyco/opencode/issues/46635) | Opencode fails to run on Linux Kubuntu | Indicates OS-specific compatibility issues | **2 comments**, **0 👍** |

---

### **4. Key PR Progress**  
| PR | Summary | Impact |
|----|--------|--------|
| [#46558](https://github.com/anomalyco/opencode/pull/46558) | Refactor persisted state to use Effect Schema | Enables stronger type safety and consistency across web/desktop persistence layers |
| [#46689](https://github.com/anomalyco/opencode/pull/46689) | Expose experimental instruction sources to plugins | Opens doors for dynamic, context-aware plugin behavior via `transform()` and `reload()` |
| [#46639](https://github.com/anomalyco/opencode/pull/46639) | Decouple plugins from config loading | Improves modularity and enables standalone plugin reuse beyond core app |
| [#46696](https://github.com/anomalyco/opencode/pull/46696) | Fix Windows sandbox access during installation | Resolves Electron startup failures on Windows due to ACL restrictions |
| [#46695](https://github.com/anomalyco/opencode/pull/46695) | Keep sync failures out of location recovery | Enhances reliability during network hiccups; prevents data loss |
| [#46694](https://github.com/anomalyco/opencode/pull/46694) | Preserve worktree creation title and busy state | Improves feedback clarity during long-running operations |
| [#46690](https://github.com/anomalyco/opencode/pull/46690) | Expose session forms, list, and global event stream | Empowers plugin developers to build richer integrations and monitoring tools |
| [#46687](https://github.com/anomalyco/opencode/pull/46687) | Add async session webhooks (callbackUrl) | Enables mobile notifications and serverless integrations without persistent SSE |
| [#46531](https://github.com/anomalyco/opencode/pull/46531) | Add public-API browser plugin | First step toward embeddable, secure browser tooling within agents |
| [#46630](https://github.com/anomalyco/opencode/pull/46630) | Expose permission assertions (`ctx.permission.assert`) | Gives plugins full control over approval logic and policy enforcement |

---

### **5. Hot Discussions**  
*No discussion threads provided in dataset.*  
→ **Omitted**  

---

### **6. Feature Request Trends**  
The most prominent trends in feature requests center on:
- **Local Model Integration**: Auto-discovery of models from LM Studio, Ollama, and llama.cpp (Issue #6231) is the top-requested improvement.
- **UX Customization**: Users want granular control over clipboard behavior (copy-on-select disable), theme loading (URL-based themes), and layout persistence.
- **Multi-Agent Workflows**: Demand for multiple skills in a single prompt (Issue #25570) and better subagent visibility (Issue #46685) reflects growing complexity in agent orchestration.
- **File & State Management**: Support for uploading attachments to a managed per-session store (Issue #46173) and review diffs for non-Git backends (PR #46684) indicates deeper project integration needs.

---

### **7. Developer Pain Points**  
Recurring frustrations include:
- **Clipboard & Selection Behavior**: The `copy-on-select` default causes accidental copies; users demand an opt-out (Issue #10490).
- **Local Model Discovery Friction**: Manual model listing in `opencode.json` is seen as tedious and error-prone (Issue #6231).
- **Session & State Consistency**: Stale `session.time_updated` timestamps break sort order (Issue #36893); session switching misroutes projects (Issue #31632).
- **Plugin & Permission Control**: Lack of hooks for plugin-driven approvals (Issue #34327), and `permission.ask` not triggering (Issue #7006) limit automation.
- **Performance & Stability**: High CPU usage during idle waits (Issue #19466), silent hangs in `opencode run` (Issue #38723), and crashes on fresh installs (Issue #36383) hinder productivity.

---

*Generated: 2026-09-02 | Source: github.com/anomalyco/opencode*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# **Pi Community Digest – 2026-09-02**

---

### **1. Today's Highlights**  
The Pi ecosystem continues to mature with a strong focus on stability, agent reliability, and developer experience. Notable activity includes critical fixes for model catalog inconsistencies, improved error handling in RPC workflows, and enhanced support for headless environments—especially around containerized deployments and credential management. A surge in PRs related to subagent customization and extension robustness signals growing demand for modular, composable AI workflows.

---

### **2. Releases**  
*No new releases detected in the last 24 hours.*

---

### **3. Hot Issues**  

| Issue | Summary & Significance | Community Reaction |
|------|------------------------|--------------------|
| [#2870](https://github.com/earendil-works/pi/issues/2870) `Follow XDG Base Directory` | Critical UX/OS hygiene fix: prevents cluttering `$HOME` by moving config/state to `$XDG_CONFIG_HOME/.config/pi`. High visibility (54 👍), reflects growing Linux-first adoption. | 🔥 54 👍 – widely seen as essential for system integration |
| [#6996](https://github.com/earendil-works/pi/issues/6996) `Gemini 3.x models fail during tool use due to missing thought_signature` | Breaks tool calling on Gemini 3.x models; exposes inconsistency in history format handling. Impacts users relying on Google’s latest models. | ⚠️ 7 comments – urgent for teams using Gemini-based pipelines |
| [#8134](https://github.com/earendil-works/pi/issues/8134) `Agent stops after first tool call when plain-HTTP provider is behind forward proxy` | Regression in v0.84.0 affecting enterprise proxy setups. Blocks automation in regulated or restricted networks. | 🛑 6 comments – high impact for CI/CD and internal tooling |
| [#8973](https://github.com/earendil-works/pi/issues/8973) `Grok 4.6 re-issues identical tool calls indefinitely` | Regression in xAI responses routing causes infinite loops. Devs report sessions stuck mid-task despite valid tool results. | ⚠️ 2 comments – serious workflow blocker |
| [#8968](https://github.com/earendil-works/pi/issues/8968) `providers with missing api-key disappear from model catalog` | Silent failure mode where missing keys cause providers to vanish — hard to debug. Affects multi-provider workflows. | 🔧 2 comments – raises concern about resilience |
| [#8977](https://github.com/earendil-works/pi/issues/8977) `llama.cpp provider catalog empty under --cap-drop ALL` | Security-hardened containers fail silently; no meaningful error. Hinders local LLM usage in CI/CD or sandboxed environments. | 🛡️ 1 comment – critical for secure deployment |
| [#8939](https://github.com/earendil-works/pi/issues/8939) `Session file deleted mid-run recreated without header` | Causes resume failures post-deletion. Risk of data loss in long-running scripts. | 💣 2 comments – potential for workflow corruption |
| [#8933](https://github.com/earendil-works/pi/issues/8933) `renderResult returning undefined crashes TUI` | Unhandled edge case leads to process exit. Direct threat to extension stability. | ❌ 2 comments – severe bug requiring immediate attention |
| [#8920](https://github.com/earendil-works/pi/issues/8920) `RPC abort reports success but doesn’t cancel compaction` | Misleading API behavior: `abort()` returns `success: true` while compaction persists. Breaks automation logic. | 📉 2 comments – affects script reliability |
| [#8971](https://github.com/earendil-works/pi/issues/8971) `pi update --extensions ignores duplicate project-level extension` | Confusing UX: updates only user-level extensions. No warning issued. Can lead to outdated code in projects. | ⚠️ 2 comments – subtle but impactful for team workflows |

---

### **4. Key PR Progress**  

| PR | Summary & Impact | Status |
|----|------------------|--------|
| [#8969](https://github.com/earendil-works/pi/pull/8969) `feat(coding-agent): add model and thinking overrides to subagent tool` | Enables dynamic model selection per subagent call—critical for cost-aware orchestration (e.g., scout → planner). | ✅ Merged |
| [#8966](https://github.com/earendil-works/pi/pull/8966) `fix(coding-agent): --provider without --model selects that provider's default` | Fixes silent ignoring of `--provider` flag; now correctly uses default model if none specified. | ✅ Merged |
| [#8941](https://github.com/earendil-works/pi/pull/8941) `fix(ai): add supportsMaxOutputTokens compat flag for openai-responses` | Adds opt-out for `max_output_tokens` to avoid 400 errors with non-compliant proxies. | ✅ Merged |
| [#8936](https://github.com/earendil-works/pi/pull/8936) `fix(agent): stop prepared tools after preflight abort` | Prevents orphaned parallel tool executions after early abort. Improves lifecycle safety. | ✅ Merged |
| [#8937](https://github.com/earendil-works/pi/pull/8937) `fix(coding-agent): settle active turn before in-memory fork` | Prevents resource leaks during session branching. Ensures correct disposal context. | ✅ Merged |
| [#8946](https://github.com/earendil-works/pi/pull/8946) `fix(extensions): never serve stale pre-trust runtime` | Stops race conditions during session replacement. Enhances trust resolution integrity. | ✅ Merged |
| [#8898](https://github.com/earendil-works/pi/pull/8898) `fix(tui): wrap SIGWINCH self-signal for seccomp policies` | Enables TUI to work in restricted environments (e.g., containers with `--cap-drop ALL`). | ✅ Merged |
| [#8951](https://github.com/earendil-works/pi/pull/8951) `feat(coding-agent): hide headless sessions from resume picker` | Reduces UI noise by excluding machine-generated sessions from `/resume`. | ✅ Merged |
| [#8737](https://github.com/earendil-works/pi/pull/8737) `fix(ai): match subdomains and root domains in NO_PROXY` | Fixes proxy misrouting issues in complex network setups. | ✅ Merged |
| [#8627](https://github.com/earendil-works/pi/pull/8627) `Use ctx.cwd for cwd-sensitive tools` | Makes path resolution consistent across tools (`read`, `write`, `edit`, etc.). | ✅ Merged |

---

### **5. Hot Discussions**  
*No discussion threads provided in dataset.*

---

### **6. Feature Request Trends**  

- **Modular Agent Orchestration**: Strong demand for per-call model/effort overrides in subagents (#8970, #8969).
- **Container & Headless Support**: Increasing requests for compatibility with `--cap-drop ALL`, minimal privileges, and secure credential handling.
- **Developer Experience (DX)**: Users want better error visibility (e.g., clear feedback when API key is missing), improved docs (e.g., `pi.setModel()` behavior), and reliable state recovery.
- **Extension Stability & Control**: Growing interest in de-registration hooks (#8967), safe rendering (`renderResult` guards), and predictable lifecycle events.
- **TUI Refinements**: Visual polish (spinner, scrollbar styling) and layout improvements (fullscreen scrollable transcript) are recurring themes.

---

### **7. Developer Pain Points**  

- **Silent Failures**: Multiple issues report *no error message* despite critical failures (e.g., `llama.cpp` catalog empty, `NO_PROXY` misparse, `api-key` drop).
- **Unclear State Management**: Confusion around session resumption, `settings.json` vs `state.json`, and `pi.setModel()` scoping changes.
- **Hard-to-Debug Workflows**: Agents get stuck in endless loops (Grok, Gemini), or hang behind proxies—without actionable logs.
- **Extension Crashes**: Unhandled `undefined` returns in `renderResult` and improper cleanup can crash the entire TUI.
- **Inconsistent Model Catalog Behavior**: Providers vanish, duplicates exist, and schema validation fails unexpectedly (e.g., Bedrock strict typing).

> 💡 **Bottom Line**: The community is pushing for greater reliability, transparency, and configurability—especially in production-grade, automated, and containerized environments. Priorities center on **predictability**, **security**, and **extensibility**.

---  
*Digest generated via GitHub data snapshot (2026-09-02).*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-02

---

### **1. Today's Highlights**  
The Qwen Code team continues to advance core UX and infrastructure improvements, with major progress on the TUI rendering migration from *ink* to *OpenTUI* and ongoing work to stabilize session management in `qwen serve`. Critical bug fixes address persistent issues in model parsing (`llama.cpp` grammar errors), permission handling (behavioral change in `permissions.allow`), and Web Shell session resilience—highlighting a strong focus on reliability and developer experience ahead of upcoming releases.

---

### **2. Releases**  
**cua-driver-rs-v0.20.3**  
Prebuilt binaries for Qwen CUA Driver now include platform-specific optimizations:  
- **macOS**: Codesigned + notarized universal binary with `QwenCuaDriver.app`  
- **Linux**: Unsigned x86_64/arm64 (glibc 2.31+), suitable for CI/CD pipelines  
- **Windows**: Unsigned UIAccess worker + native SDK payload (x86_64/arm64)  
> [GitHub Release](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.3)

---

### **3. Hot Issues**  

| Issue | Why It Matters | Community Reaction |
|------|----------------|--------------------|
| [#8662](https://github.com/QwenLM/qwen-code/issues/8662) | Migrating TUI from patched `ink` to `OpenTUI` is critical for long-term maintainability and performance. Current renderer has flicker and viewport bugs that hinder usability. | 16 comments, active discussion since Aug 7; tracked as P3 but high visibility |
| [#10520](https://github.com/QwenLM/qwen-code/issues/10520) | A regression in `toolSearch.threshold > 0` breaks `llama.cpp` integration due to malformed grammar parsing—blocks local AI tool usage. | 7 comments; labeled P2, status: ready-for-human |
| [#10530](https://github.com/QwenLM/qwen-code/issues/10530) | Persistent "failed to parse grammar" error in 0.22.3 with Qwen 3.8 27b/35b models—only affects certain models (not Gemma). Indicates a breaking change in tokenization or prompt formatting. | 5 comments; confirmed reproducible, prior version stable |
| [#10218](https://github.com/QwenLM/qwen-code/issues/10218) | Major semantic shift in `permissions.allow`: tools not in the list are now **silently blocked**, not just unapproved. Requires restart to re-evaluate—serious UX break. | 5 comments; flagged P1, needs documentation update |
| [#10162](https://github.com/QwenLM/qwen-code/issues/10162) | ACP channel queue saturation causes full teardown instead of graceful degradation—leads to lost assistant output and unstable sessions. | 5 comments; high impact on daemon stability |
| [#10710](https://github.com/QwenLM/qwen-code/issues/10710) | When a turn is killed mid-flight, its persisted assistant messages vanish upon reloading—a data loss risk in long-running sessions. | 4 comments; critical for Web Shell reliability |
| [#10698](https://github.com/QwenLM/qwen-code/issues/10698) | Build fails on Node 20 due to ESM/require mismatch—blocks modern dev environments. Immediate need for ESM compatibility fix. | 4 comments; urgent for CI/CD and contributor onboarding |
| [#10742](https://github.com/QwenLM/qwen-code/issues/10742) & [#10741](https://github.com/QwenLM/qwen-code/issues/10741) | `qwen extensions install` from `.zip` URL silently exits on Windows without installing—critical for plugin distribution. | 2 comments each; duplicates suggest widespread impact |
| [#10749](https://github.com/QwenLM/qwen-code/issues/10749) | TUI scrolling loads old prompts into input instead of scrolling conversation—breaks interactive flow. | 2 comments; low priority but visible UX flaw |
| [#10734](https://github.com/QwenLM/qwen-code/issues/10734) | Test uses wall-clock time (`1000ms`) for CPU budget while measuring `process.cpuUsage()`—causes deterministic failures on GitHub runners. | 2 comments; exposes flaky test suite issue |

---

### **4. Key PR Progress**  

| PR | Summary | Link |
|----|--------|------|
| [#10704](https://github.com/QwenLM/qwen-code/pull/10704) | Reconciles queued prompts by identity, not client—improves session consistency across devices. | [PR #10704](https://github.com/QwenLM/qwen-code/pull/10704) |
| [#10713](https://github.com/QwenLM/qwen-code/pull/10713) | Adds `/btw` side questions to Channel conversations—context-aware queries without polluting main thread. | [PR #10713](https://github.com/QwenLM/qwen-code/pull/10713) |
| [#10719](https://github.com/QwenLM/qwen-code/pull/10719) | Ensures Web Shell loads models before standalone sessions start—prevents runtime load delays. | [PR #10719](https://github.com/QwenLM/qwen-code/pull/10719) |
| [#10751](https://github.com/QwenLM/qwen-code/pull/10751) | Implements session turn navigation protocol—foundation for Codex-style jump-to-turn in Web Shell. | [PR #10751](https://github.com/QwenLM/qwen-code/pull/10751) |
| [#10746](https://github.com/QwenLM/qwen-code/pull/10746) | Hides “Modify with external editor” option if editor is missing—avoids failure during edit flow. | [PR #10746](https://github.com/QwenLM/qwen-code/pull/10746) |
| [#10730](https://github.com/QwenLM/qwen-code/pull/10730) | Preserves image/file attachments when expanding commands/skills—maintains context fidelity. | [PR #10730](https://github.com/QwenLM/qwen-code/pull/10730) |
| [#10697](https://github.com/QwenLM/qwen-code/pull/10697) | Migrates Skills runtime to workspace-scoped ownership—enables per-project skill isolation. | [PR #10697](https://github.com/QwenLM/qwen-code/pull/10697) |
| [#10679](https://github.com/QwenLM/qwen-code/pull/10679) | Adds workspace-scoped MCP management—supports isolated tool configuration per project. | [PR #10679](https://github.com/QwenLM/qwen-code/pull/10679) |
| [#10421](https://github.com/QwenLM/qwen-code/pull/10421) | Fixes content filter handling in `scratch-tree`—prevents incorrect file restoration. | [PR #10421](https://github.com/QwenLM/qwen-code/pull/10421) |
| [#10123](https://github.com/QwenLM/qwen-code/pull/10123) | Salvages superseded review runs—improves CI/CD resiliency and avoids redundant work. | [PR #10123](https://github.com/QwenLM/qwen-code/pull/10123) |

---

### **5. Hot Discussions**  
*(No active discussions found in provided data)*

---

### **6. Feature Request Trends**  
Top feature directions emerging from community feedback:  
- **Enhanced Web Shell UX**: Session-wide turn navigation (#10750), search by content (not just title), and better session persistence.  
- **Cross-platform Tooling**: Telegram bot mode (#2339), improved Windows support (especially extension installs), and better CLI robustness.  
- **Sandbox Security**: Lightweight Linux sandbox via Bubblewrap (#10583)—reducing Docker dependency for secure execution.  
- **AI Agent Workflows**: Agent board sharing (#9402), agent bridges for `/btw`, and better session lifecycle control.  
- **TUI Modernization**: Full migration from `ink` to `OpenTUI` (#8662) remains a foundational goal for long-term stability.

---

### **7. Developer Pain Points**  
Frequent frustrations reported:  
- **Silent failures**: Extensions fail to install from ZIP URLs on Windows without logs (#10742/#10741).  
- **Unpredictable permission behavior**: `permissions.allow` now silently blocks unlisted tools—breaks expected workflow (#10218).  
- **Build environment issues**: ESM/require errors on Node 20 block development setup (#10698).  
- **Flaky tests**: CPU-time vs wall-clock confusion leads to inconsistent CI results (#10734).  
- **Session data loss**: Assistant outputs lost after reload if turn was killed mid-flight (#10710).  
- **Missing feedback**: Users get no indication when external editors are unavailable (#10745).  

These indicate a growing need for clearer error messaging, better cross-platform testing, and more resilient state management in distributed workflows.

---  
*Digest generated: 2026-09-02 | Source: [Qwen Code GitHub](https://github.com/QwenLM/qwen-code)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*