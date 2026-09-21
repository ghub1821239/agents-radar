# AI CLI Tools Community Digest 2026-09-21

> Generated: 2026-09-21 00:28 UTC | Tools covered: 7

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

# **Cross-Tool AI CLI Ecosystem Comparison Report – 2026-09-21**

---

### **1. Ecosystem Overview**  
The AI CLI tool ecosystem in Q3 2026 is characterized by rapid iteration, growing maturity in agent orchestration, and increasing pressure on stability, security, and developer control. While all major tools continue to expand their capabilities—especially around multi-agent workflows, cross-platform support, and extensibility—the community is increasingly focused on *predictability*, *cost transparency*, and *trust* in autonomous behavior. Critical issues related to model hallucination, silent failures, quota abuse, and irreversible data loss are recurring across platforms, signaling a shift from feature velocity toward reliability and operational safety.

---

### **2. Activity Comparison**

| Tool | Hot Issues (Top 10) | Key PRs (Last 24h) | Discussions | Releases |
|------|---------------------|--------------------|-------------|----------|
| **Claude Code** | 10 | 10 | N/A | None |
| **OpenAI Codex** | 10 | 10 | 5 | 3 alpha releases |
| **Gemini CLI** | 10 | 10 | N/A | v0.62.0-nightly.20260920 |
| **GitHub Copilot CLI** | 10 | 0 | N/A | None |
| **OpenCode** | 10 | 9 | N/A | None |
| **Pi** | 10 | 10 | N/A | v0.86.1 |
| **Qwen Code** | 10 | 10 | N/A | v0.24.2 |

> ✅ **Notes**:  
> - OpenAI Codex leads in release activity with three new `alpha` builds.  
> - Pi and Qwen Code released stable/nightly updates today.  
> - All repos except OpenAI Codex have no new PRs in the last 24 hours; codex shows active internal development.  
> - Discussions are only present in **OpenAI Codex**—all others use GitHub Issues as primary community channel.

---

### **3. Shared Feature Directions**  
Across all tools, several high-priority themes emerge, indicating industry-wide convergence:

| Requirement | Tools Involved | Specific Needs |
|------------|----------------|----------------|
| **Headless & CI/CD readiness** | Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode | Device-code auth (RFC 8628), non-interactive tooling, session persistence, reliable token handling |
| **Agent reliability & state control** | All tools | Prevention of hallucination/memory corruption, consistent turn tracking, safe session resumption, recovery from hangs/crashes |
| **Cost & usage transparency** | OpenAI Codex, Qwen Code, OpenCode, Gemini CLI | Real-time quota visibility, accurate billing metadata (OTel), clear limits, budget warnings |
| **Security & privacy hardening** | Qwen Code, Gemini CLI, OpenCode, Claude Code | Secret redaction before model input, secure memory handling, audit trails, restricted telemetry |
| **Cross-platform consistency** | All tools | Fix Windows-specific UI bugs (e.g., always-on-top windows, IME lag), ARM64/Linux compatibility, terminal rendering fixes |

> 🔍 **Insight**: These shared demands reflect a maturing ecosystem where developers expect AI tools to behave like robust, production-grade systems—not experimental prototypes.

---

### **4. Differentiation Analysis**

| Dimension | Claude Code | OpenAI Codex | Gemini CLI | GitHub Copilot CLI | OpenCode | Pi | Qwen Code |
|---------|--------------|---------------|------------|--------------------|----------|----|-----------|
| **Target User Focus** | Enterprise DevOps, automation-heavy teams | Pro users, AI agents, power developers | Long-running agent sessions, Linux/CLI purists | VS Code-first integrators, GitHub-centric workflows | Open-source advocates, free-tier users | Multi-provider experimenters, performance-focused devs | Chinese-speaking dev community, long-context workflows |
| **Technical Approach** | Deep browser/tool integration, macOS Auto mode | Agent coordination via subagents, TUI polish | Subagent lifecycle management, signal propagation | MCP server discovery, extension resilience | Web-first UI, free-tier access | Meta provider expansion, incremental rendering | Web Shell + SSH remote editing |
| **Key Differentiator** | Browser automation robustness | Model rate-limiting diagnostics & UX clarity | Memory/scheduler cleanup, process signal handling | Figma/MCP integration, cost governance | Free-tier fairness, external API access | Cross-provider compatibility, real-time voice input | Built-in tool schema optimization, i18n polish |

> 🎯 **Summary**:  
> - **Claude Code** excels in tooling integration but struggles with headless usability.  
> - **OpenAI Codex** prioritizes diagnostic depth and user experience despite systemic instability.  
> - **Gemini CLI** focuses on agent resilience and process lifecycle rigor.  
> - **GitHub Copilot CLI** is deeply embedded in GitHub’s ecosystem but suffers from configuration drift.  
> - **OpenCode** is pushing boundaries in open-access models and free-tier design—but at the cost of reliability.  
> - **Pi** stands out for its expanding provider ecosystem and performance optimizations.  
> - **Qwen Code** emphasizes context efficiency and security, particularly for large-scale, multilingual workflows.

---

### **5. Community Momentum & Maturity**

| Metric | Most Active | Notes |
|-------|-------------|-------|
| **Issue Volume** | OpenAI Codex, OpenCode, Qwen Code | All report 10+ critical issues daily; OpenCode has highest comment volume (48 on #49433) |
| **PR Velocity** | OpenAI Codex (merged 10 in 24h), Pi, Qwen Code | Codex shows internal alpha development momentum; others show strong engineering throughput |
| **Release Cadence** | OpenAI Codex (3 alphas), Pi (v0.86.1), Qwen Code (v0.24.2) | Frequent updates indicate fast-moving teams; nightly builds signal continuous deployment culture |
| **Community Engagement** | OpenAI Codex (5 discussion threads) | Only repo using Discussions actively; others rely solely on Issues → lower engagement surface |

> ⚖️ **Maturity Signal**:  
> - **OpenAI Codex** and **Qwen Code** demonstrate the most mature ecosystems: high issue volume, rapid PR merges, frequent releases, and structured feedback loops.  
> - **OpenCode** and **Claude Code** show early-stage growth with intense community frustration—indicating unmet expectations and trust gaps.  
> - **Pi** and **Gemini CLI** are mid-maturity: stable core features, strong technical focus, but still resolving platform-specific edge cases.

---

### **6. Trend Signals**  
Based on community feedback, key industry trends are emerging:

| Trend | Evidence | Developer Implication |
|------|--------|------------------------|
| **Shift from novelty to operational reliability** | 70%+ of hot issues relate to crashes, hangs, silent failures, or data loss | Developers now prioritize stability over flashy features. Expectations for “production-ready” AI tools are rising. |
| **Demand for auditability & control** | Repeated calls for read-only transcripts, quota visibility, config validation, and error logs | Tools must expose internal state—developers need to debug, trace, and govern AI behavior. |
| **Security-by-default mindset** | Multiple reports of secrets leaking into prompts, unsafe Git commands, and insecure memory handling | Future tooling must enforce redaction, sandboxing, and least-privilege execution by default. |
| **Free-tier parity & fairness** | OpenCode users frustrated by opaque retry timers and broken external access | Free tiers are no longer just "try before you buy"—they’re expected to be usable and predictable. |
| **Cross-tool interoperability demand** | Requests for unified search across agents, local APIs, and standardized model routing | The future lies in composability: tools must work together seamlessly, not in silos. |

> 💡 **Strategic Takeaway for Developers & Teams**:  
> When selecting an AI CLI tool, prioritize those with:
> - Active, transparent issue resolution
> - Strong session resilience and error recovery
> - Clear cost tracking and usage controls
> - Support for headless automation and CI/CD pipelines
> - Proven track record in handling complex, long-running workflows

These signals suggest that **technical excellence in reliability, observability, and security will soon become the primary differentiator** in the AI developer tools market.

---  
*Compiled from GitHub community data — 2026-09-21*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

**Claude Code Skills Community Highlights Report**  
*Data as of 2026-09-21 | Source: github.com/anthropics/skills*

---

### **1. Top Skills Ranking**  
*(Based on community engagement and discussion volume in PRs)*

1. **`proofcore-contract-auditor`**  
   *GitHub PR #1771*  
   A Web3-focused Agent Skill that performs automated static analysis of Solidity and Rust smart contracts, then anchors cryptographic audit proofs to the public TON Blockchain via ProofCore’s zero-storage Merkle protocol.  
   **Discussion Highlights**: High interest from blockchain developers; emphasizes trustless verification and regulatory compliance.  
   **Status**: Open (created 2026-09-15), awaiting review.

2. **`md2video-audio`**  
   *GitHub PR #1703*  
   Converts Markdown documents into professional-grade MP4 videos with lifelike voiceovers using Marp for slide generation. Zero-cost, no external dependencies.  
   **Discussion Highlights**: Strong demand for AI-generated video content; praised for simplicity and production readiness.  
   **Status**: Open (created 2026-09-01), under active consideration.

3. **`blast-radius`**  
   *GitHub PR #1776*  
   A pre-deployment checklist skill for bulk or destructive operations (e.g., data deletion, access revocation). Helps prevent accidental system-wide damage by enforcing risk-aware workflows.  
   **Discussion Highlights**: Recognized as a critical safety tool; aligns with growing concerns around agent autonomy.  
   **Status**: Open (created 2026-09-17), minimal feedback but high strategic relevance.

4. **`awt` (AI Watch Tester)**  
   *GitHub PR #822*  
   Enables Claude to run end-to-end browser-based tests without code — point-and-click test generation, visual validation, and auto-recovery.  
   **Discussion Highlights**: Seen as a breakthrough for QA automation; cited as a potential game-changer for DevOps.  
   **Status**: Open (created 2026-03-31), mature implementation with ongoing improvements.

5. **`scnet-hpc`**  
   *GitHub PR #1615*  
   Provides profile-based SSH and Slurm workflow management for SCNet HPC clusters, including partition, memory, module, and accelerator guidance.  
   **Discussion Highlights**: Niche but highly valuable for academic and research users; detailed use cases discussed.  
   **Status**: Open (created 2026-08-20), pending integration testing.

6. **`skill-quality-analyzer` & `skill-security-analyzer`**  
   *GitHub PR #83*  
   Meta-skills to evaluate other skills across quality (structure, documentation) and security (permissions, injection risks) dimensions.  
   **Discussion Highlights**: Positioned as foundational tools for ecosystem health; widely seen as essential for scaling.  
   **Status**: Open (created 2025-11-06), part of the example-skills collection.

---

### **2. Community Demand Trends**  
*(From top Issues and emerging proposals)*

- **AI Safety & Governance**: Rising demand for skills that enforce policy, detect threats, and enable audit trails (e.g., Issue #412, #1385).
- **Workflow Automation**: Users want turnkey solutions for complex tasks like E2E testing (`AWT`), document redlining, and batch operations (`blast-radius`).
- **Developer Tooling**: Strong interest in tools that improve code quality, such as contract auditors (`proofcore-contract-auditor`) and documentation validators.
- **Cross-Platform Integration**: Requests for better support with AWS Bedrock (Issue #29), MCP exposure (Issue #16), and org-wide sharing (Issue #228).
- **Performance & Reliability**: Critical issues around context exhaustion (`claude-api`, Issue #1487), evaluation failures (`run_eval.py`, Issue #556), and duplicate skills (Issue #189).

---

### **3. High-Potential Pending Skills**  
*(Active PRs with strong momentum or high relevance)*

- **`proofcore-contract-auditor`** – *PR #1771*  
  Ready for integration; poised to become a flagship Web3 skill.
- **`md2video-audio`** – *PR #1703*  
  Low-friction, high-impact content creation tool; likely to be merged soon.
- **`blast-radius`** – *PR #1776*  
  Addresses real-world risk mitigation; may be prioritized due to safety implications.
- **`mcp-builder`: Update to `claude-sonnet-5`** – *PR #1724*  
  Minor but impactful update improving evaluation accuracy and model alignment.

---

### **4. Skills Ecosystem Insight**  
The community’s most concentrated demand is for **safe, reliable, and self-validating AI agents**, driven by a need for trustworthy automation, verifiable outputs, and robust guardrails—especially in high-stakes domains like finance, legal, and infrastructure.

---  
*Report compiled from official anthropics/skills repository activity.*

---

# **Claude Code Community Digest — 2026-09-21**

---

### **1. Today's Highlights**  
The community is actively addressing critical stability and security concerns, with rising attention on authentication flows for headless environments and persistent permission misbehavior in macOS Auto mode. A surge in Windows-specific issues—particularly around desktop window management and tool integration—signals growing friction in enterprise and developer workflows.

---

### **2. Releases**  
*No new releases in the past 24 hours.*

---

### **3. Hot Issues (Top 10)**

| # | Issue | Summary & Impact | Community Reaction |
|---|------|------------------|--------------------|
| [#22992](https://github.com/anthropics/claude-code/issues/22992) | **Support device-code auth flow (RFC 8628)** | Essential for Pro/Max users in CI/CD or headless setups. Currently blocks automation without interactive login. | 📌 *19 comments, 36 👍* – High demand from DevOps teams |
| [#95326](https://github.com/anthropics/claude-code/issues/95326) | **All tools blocked on reddit.com since 2026-09-18** | Sudden safety restriction breakage affects real-world browser automation. Reproducible across Chrome extensions. | 📌 *7 comments, 5 👍* – Urgent fix needed for public-facing tooling |
| [#84698](https://github.com/anthropics/claude-code/issues/84698) | **Unrequested `git fetch` on diff/commit refresh** | Background sync causes noise, latency, and privacy concerns. No opt-out setting exists. | 📌 *6 comments, 3 👍* – Frustration over uncontrolled network activity |
| [#95200](https://github.com/anthropics/claude-code/issues/95200) | **Auto mode regression: 12× more denials post-2.1.270** | One-person studio reports 55+ manual clicks for a simple config change. Breaks trust in autonomous workflows. | 📌 *3 comments, 0 👍* – High-stakes impact; likely widespread |
| [#95480](https://github.com/anthropics/claude-code/issues/95480) | **Treated normal platform artifact as bug symptom** | Agent misdiagnoses stable behavior as failure, wasting session budget and time. | 📌 *1 comment, 0 👍* – Critical for agent reliability |
| [#95436](https://github.com/anthropics/claude-code/issues/95436) | **Agent asserts hypotheses as facts, persists to memory** | Persistent incorrect state corrupts long-running sessions. Risk of cascading errors. | 📌 *1 comment, 0 👍* – Security/accuracy red flag |
| [#95425](https://github.com/anthropics/claude-code/issues/95425) | **Login success but token not saved due to ENOTDIR error** | Stale lock file prevents session persistence. Blocks access after restart. | 📌 *1 comment, 0 👍* – Fundamental UX flaw |
| [#95576](https://github.com/anthropics/claude-code/issues/95576) | **Git push of tags fails with 403 despite full permissions** | Cloud session lacks required scope for tag operations. Hinders release pipelines. | 📌 *1 comment, 0 👍* – Blocking for CI/CD workflows |
| [#95580](https://github.com/anthropics/claude-code/issues/95580) | **Desktop window stuck always-on-top on Windows** | UI corruption during computer use breaks multitasking. Raced with Win32 screenshot logic. | 📌 *1 comment, 0 👍* – High-visibility desktop UX issue |
| [#95466](https://github.com/anthropics/claude-code/issues/95466) | **iOS Simulator touch injection silently no-ops after Xcode 27** | Tool broken post-upgrade. Disrupts iOS QA automation. | 📌 *1 comment, 0 👍* – Immediate need for compatibility |

---

### **4. Key PR Progress (Top 10)**

| # | PR | Summary & Impact | Status |
|---|----|------------------|--------|
| [#95698](https://github.com/anthropics/claude-code/pull/95698) | **Fix plugin hooks: quote paths in bash execution** | Prevents shell parsing errors when plugin paths contain spaces or special chars. Fixes #78490 and #95673. | ✅ Merged |
| [#95423](https://github.com/anthropics/claude-code/pull/95423) | **diff mod: skip read-only shell commands from refetching** | Reduces unnecessary network I/O after `ls`, `cat`, etc. Improves performance. | 🔵 Open |
| [#95587](https://github.com/anthropics/claude-code/pull/95587) | **diff pane opens consistently on resume** | Aligns behavior between mod and built-in panel. Eliminates inconsistency in session recovery. | ✅ Closed |
| [#94847](https://github.com/anthropics/claude-code/pull/94847) | **diff pane only opens if there’s a file to list** | Prevents empty “No tracked changes” panes on irrelevant edits. Cleaner UX. | 🔵 Open |
| [#95618](https://github.com/anthropics/claude-code/pull/95618) | **Telemetry: restrict to built-in plugins only** | Enhances privacy by excluding third-party plugins from data collection. | ✅ Closed |
| [#87593](https://github.com/anthropics/claude-code/pull/87593) | **Fix sender label in cross-session messages** | Displays correct source session title instead of generic string. Improves traceability. | ✅ Closed |
| [#87587](https://github.com/anthropics/claude-code/pull/87587) | **Plan mode: re-show revised plan after "No, keep planning"** | Ensures user sees updated plan before approving. Prevents silent drift. | ✅ Closed |
| [#87585](https://github.com/anthropics/claude-code/pull/87585) | **Add official read-only transcript viewer** | Enables auditability and debugging without CLI re-entry. | ✅ Closed |
| [#87586](https://github.com/anthropics/claude-code/pull/87586) | **Fix inefficient browser automation actions** | Reduces redundant clicks, wrong shortcuts, and keyword guessing. Saves session budget. | ✅ Closed |
| [#87581](https://github.com/anthropics/claude-code/pull/87581) | **Preserve message when approving forwarded permission requests** | Ensures context isn’t lost in team collaboration workflows. | ✅ Closed |

---

### **5. Hot Discussions**  
*No discussion threads were provided in the dataset. This section is omitted.*

---

### **6. Feature Request Trends**  
The most prominent feature directions emerging from open issues include:

- **Headless & CI/CD readiness**: Device-code OAuth (RFC 8628) support is top-priority for automation.
- **Privacy & transparency**: Users demand clear documentation on session classification, telemetry, and diagnostic output warnings.
- **Permission control & UX clarity**: Requests for granular permission settings, better feedback on denials, and reduced friction in approval workflows.
- **Cross-platform consistency**: Especially around desktop behavior (Windows), simulator tooling (iOS), and browser extension reliability.
- **Developer tooling enhancements**: VS Code prompt suggestions, read-only transcript viewers, and better CLI upgrade validation.

---

### **7. Developer Pain Points**  
Recurring frustrations include:

- **Unwanted background network activity** (e.g., unrequested `git fetch`) causing latency and privacy concerns.
- **Inconsistent or broken tooling** in high-stakes environments (e.g., iOS Simulator, Reddit automation).
- **Agent hallucination and memory persistence** of unverified assumptions, leading to cascading failures.
- **Poor error handling** in login, session resume, and upgrade flows (e.g., token not saved, stub binaries).
- **Regression in core functionality** post-update (e.g., Auto mode blocking own work, Plan mode skipping revisions).
- **Lack of transparency** in session states, cost drivers, and model behavior (e.g., missing docs on `Classify session states`).

> 💡 **Recommendation**: Prioritize stability fixes for 2.1.270+ regressions and invest in auditability and user control—especially for enterprise and automated workflows.

---  
*Digest compiled from GitHub data: [anthropics/claude-code](https://github.com/anthropics/claude-code)*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**OpenAI Codex Community Digest — 2026-09-21**

---

### **1. Today's Highlights**  
The Codex ecosystem continues to face systemic rate-limiting and session stability challenges, with multiple high-impact issues reported around GPT-6 Astra’s excessive token consumption and persistent "model at capacity" errors across platforms. Meanwhile, the engineering team has been actively refining TUI usability, accessibility, and local server visibility through a wave of closed PRs focused on user experience and diagnostics.

---

### **2. Releases**  
Three new alpha releases were published in the `rust-v0.156.0-alpha` series:  
- [`v0.156.0-alpha.12`](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.12)  
- [`v0.156.0-alpha.11`](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.11)  
- [`v0.156.0-alpha.10`](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.10)  

These updates focus on internal stability improvements and enhanced support for experimental model routing and agent coordination pipelines. No public changelogs are available yet.

---

### **3. Hot Issues**  
*(Top 10 by comment count and impact)*

1. **[Issue #42987]** – *GPT-6 Astra Medium consumed full 5-hour Plus quota in minutes*  
   🔥 **Why it matters**: Users report extreme rate-limit abuse from GPT-6 Astra, undermining trust in usage predictability. 25 comments highlight widespread concern.  
   [View Issue](https://github.com/openai/codex/issues/42987)

2. **[Issue #45835]** – *Codex App shows “Selected model is at capacity” despite healthy connectivity*  
   🔥 **Why it matters**: Persistent false availability errors disrupt workflow continuity, especially for Pro Lite users. 17 comments confirm cross-platform recurrence.  
   [View Issue](https://github.com/openai/codex/issues/45835)

3. **[Issue #45974]** – *CLI repeatedly wakes xhigh to poll long-running jobs, exhausting weekly allowance*  
   🔥 **Why it matters**: Autonomous polling behavior drains finite quotas before tasks complete—critical for automation workflows.  
   [View Issue](https://github.com/openai/codex/issues/45974)

4. **[Issue #46819]** – *Security scan exhausted reset weekly allowance in 44 minutes via subagent fan-out*  
   🔥 **Why it matters**: Demonstrates unbounded resource escalation in multi-agent workflows; raises concerns about auditability and cost control.  
   [View Issue](https://github.com/openai/codex/issues/46819)

5. **[Issue #46869]** – *Opaque “Daybreak isn’t available for Astra” banner blocks review-only task*  
   🔥 **Why it matters**: Breaks offline code review workflows without clear cause or resolution path.  
   [View Issue](https://github.com/openai/codex/issues/46869)

6. **[Issue #46889]** – *Safeguard blocks authorized offline review (false positive)*  
   🔥 **Why it matters**: Safety systems interfering with legitimate, controlled workflows undermines developer autonomy.  
   [View Issue](https://github.com/openai/codex/issues/46889)

7. **[Issue #46891]** – *Chat history missing after Windows app update (26.915.31945)*  
   🔥 **Why it matters**: Data loss post-update erodes confidence in cloud sync reliability. Confirmed by multiple users.  
   [View Issue](https://github.com/openai/codex/issues/46891)

8. **[Issue #46906]** – *CPU spikes to 40%+ on startup due to checksum mismatch*  
   🔥 **Why it matters**: Performance degradation during boot impacts productivity on lower-end machines.  
   [View Issue](https://github.com/openai/codex/issues/46906)

9. **[Issue #46896]** – *Codex performs actions not explicitly requested (model behavior drift)*  
   🔥 **Why it matters**: Indicates potential instability in model inference logic—dangerous for automated tasks.  
   [View Issue](https://github.com/openai/codex/issues/46896)

10. **[Issue #46904]** – *Codex continued for 5 hours after explicit pause command*  
    🔥 **Why it matters**: Critical failure in task orchestration; contradicts user intent and consumes massive tokens.  
    [View Issue](https://github.com/openai/codex/issues/46904)

---

### **4. Key PR Progress**  
*(Top 10 recent merged PRs improving UX, diagnostics, and stability)*

1. **[PR #46912]** – *Keep quota warnings visible in TUI*  
   ✅ Fixes silent quota exhaustion by displaying active limits in composer hint row.  
   [View PR](https://github.com/openai/codex/pull/46912)

2. **[PR #46910]** – *Preserve transcript position when opening settings pickers*  
   ✅ Prevents jarring scroll resets during configuration changes.  
   [View PR](https://github.com/openai/codex/pull/46910)

3. **[PR #46905]** – *Identify local background servers in `/status`*  
   ✅ Improves clarity by labeling `Local background server` instead of raw socket addresses.  
   [View PR](https://github.com/openai/codex/pull/46905)

4. **[PR #46902]** – *Hide “Back to bottom” when tail is visible*  
   ✅ Reduces UI clutter after copying or resizing.  
   [View PR](https://github.com/openai/codex/pull/46902)

5. **[PR #46899]** – *Uniform spacing in transcript lists after streaming*  
   ✅ Eliminates uneven visual spacing in list items.  
   [View PR](https://github.com/openai/codex/pull/46899)

6. **[PR #46895]** – *Add right-click copying for transcript and composer*  
   ✅ Enables faster text selection and copy-paste workflows.  
   [View PR](https://github.com/openai/codex/pull/46895)

7. **[PR #46884]** – *Enable plain clicks on transcript links*  
   ✅ Removes friction for link navigation in terminal UI.  
   [View PR](https://github.com/openai/codex/pull/46884)

8. **[PR #46877]** – *Allow subagents to request MCP elicitation input*  
   ✅ Enables interactive tool approval (e.g., sign-in, form input) in child threads.  
   [View PR](https://github.com/openai/codex/pull/46877)

9. **[PR #46867]** – *Preserve streamed answers when subagents finish*  
   ✅ Prevents premature flush of parent answer streams.  
   [View PR](https://github.com/openai/codex/pull/46867)

10. **[PR #46859]** – *Limit welcome logo animation to onboarding only*  
    ✅ Reduces visual noise in ongoing conversations.  
    [View PR](https://github.com/openai/codex/pull/46859)

---

### **5. Hot Discussions**  
*(Grouped by category)*

#### **Ideas**
- **[Discussion #46797]** – *Feature Request: Local API to enqueue messages into existing desktop threads*  
  🛠️ Developer seeks programmatic access to persistently managed Codex threads—essential for integrating external event observers with live review.  
  [View Discussion](https://github.com/openai/codex/discussions/46797)

#### **Q&A**
- **[Discussion #5111]** – *Timeline for accepting community PRs*  
  💬 Contributor highlights delay in merging a fix for non-English backspacing bug (#4921), calling attention to open-source contribution bottlenecks.  
  [View Discussion](https://github.com/openai/codex/discussions/5111)
  
- **[Discussion #37991]** – *Mapping Windows Store package to CLI/app-server version*  
  🔍 User requests official mapping between MSIX package versions and internal binaries for debugging and reproducibility.  
  [View Discussion](https://github.com/openai/codex/discussions/37991)

- **[Discussion #46442]** – *Support for launching PowerShell directly without cmd.exe*  
  ⚙️ Windows desktop users ask for native PowerShell launch interface—important for scripting and automation workflows.  
  [View Discussion](https://github.com/openai/codex/discussions/46442)

#### **Show and Tell**
- **[Discussion #46874]** – *Agent Lint: Open-source linter for Codex, AGENTS.md, MCP, etc.*  
  🧩 Developer shares `agent-lint`, a cross-tool config validator supporting Codex, Cursor, Claude Code, and MCP configurations.  
  [View Project](https://github.com/zhupanov/agent-lint)

- **[Discussion #46774]** – *Searching old sessions by keyword across agents*  
  🔍 Proposes a unified search mechanism for fragmented conversation histories across Codex and other agents.  
  [View Discussion](https://github.com/openai/codex/discussions/46774)

---

### **6. Feature Request Trends**  
Across Issues and Discussions, recurring themes include:
- **Programmatic integration**: Demand for local APIs to enqueue messages into persistent threads ([#46797](https://github.com/openai/codex/discussions/46797)).
- **Cross-agent history unification**: Users want to search and recover conversations split across Codex, Cursor, and other agents ([#46774](https://github.com/openai/codex/discussions/46774)).
- **Enhanced diagnostics & transparency**: Requests for clearer server status (`/status`), local process visibility, and quota tracking.
- **Improved automation support**: Need for direct PowerShell launch, better CLI scripting, and reliable sandbox behavior.
- **Stable, predictable model behavior**: Strong desire for deterministic execution and no unexpected side effects.

---

### **7. Developer Pain Points**  
High-frequency frustrations include:
- **Unpredictable rate-limiting**: Multiple reports of models consuming entire quotas in seconds despite low activity.
- **Session and state corruption**: Chat history loss, disabled send buttons, and failed reconnects after crashes.
- **False safety alerts**: Safeguards interrupting valid workflows (e.g., offline reviews).
- **Poor feedback loops**: Silent failures, opaque error messages, and lack of actionable logs.
- **Tooling gaps**: Missing support for direct PowerShell execution, inconsistent handling of Unix sockets, and broken browser/file URL policies.
- **UI inconsistency**: Scroll jumps, missing chat data, and misleading status indicators across platforms.

> 💡 **Developer Takeaway**: While Codex is rapidly evolving in capabilities, core stability, predictability, and developer control remain urgent priorities. The community demands more transparency, diagnostic tools, and robustness—especially around usage quotas and agent orchestration.

---  
*Digest generated: 2026-09-21 | Source: [openai/codex GitHub](https://github.com/openai/codex)*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# **Gemini CLI Community Digest — 2026-09-21**

---

### **1. Today's Highlights**  
The Gemini CLI team continues to prioritize agent stability and security, with critical fixes for subagent recovery, memory handling, and process lifecycle management. Notable progress includes improved error reporting around quota limits and enhanced resilience in the browser and generalist agents—key steps toward production-grade reliability.

---

### **2. Releases**  
**v0.62.0-nightly.20260920.gcfbcaa8df**  
*Release Date:* 2026-09-20  
*Changelog:* [Compare v0.62.0-nightly.20260919 → v0.62.0-nightly.20260920](https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260919.gcfbcaa8df...v0.62.0-nightly.20260920.gcfbcaa8df)  
This nightly build includes core stability improvements, including scheduler disposal cleanup, TOML policy validation, and better signal propagation to child processes—critical for robust long-running agent sessions.

---

### **3. Hot Issues**  

| Issue | Summary & Significance | Community Reaction |
|------|------------------------|--------------------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagents incorrectly report success after hitting `MAX_TURNS`, masking interruptions. This undermines trust in goal completion tracking. | 🔥 13 comments, 2 👍 – High impact on agent reliability |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs indefinitely, blocking workflows. Users report waiting up to an hour before cancellation. | 🔥 8 comments, 8 👍 – Top-priority hang bug |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Model fails to invoke custom skills/sub-agents autonomously despite relevance. Suggests weak agent orchestration logic. | 6 comments – Critical UX flaw for power users |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Investigating AST-aware file operations to reduce token bloat and improve codebase navigation precision. | 7 comments – Strategic direction for future efficiency |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | Auto Memory sends secrets to models *before* redaction—security risk. Needs deterministic, pre-redaction sanitization. | 5 comments – Security-sensitive, high priority |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | Browser sub-agent crashes under Wayland. Affects Linux desktop users. | 4 comments, 1 👍 – Platform-specific blocker |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | Browser agent lacks session takeover and lock recovery—leads to deadlocks in persistent mode. | 4 comments – Needed for stable automation |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | Model occasionally uses destructive Git commands (`git reset --force`) instead of safer alternatives. | 3 comments, 1 👍 – Safety-critical behavior |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores `settings.json` overrides (e.g., `maxTurns`). Configuration misalignment. | 3 comments – Misleading UX for advanced users |
| [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) | `/compress` command not persisted across sessions—loses token-saving benefits. | 2 comments, 2 👍 – High usability cost |

---

### **4. Key PR Progress**  

| PR | Summary & Impact | Status |
|----|------------------|--------|
| [#29432](https://github.com/google-gemini/gemini-cli/pull/29432) | Fixes queued tool calls not being rejected on scheduler disposal—prevents memory leaks and zombie tasks. | ✅ Merged |
| [#29431](https://github.com/google-gemini/gemini-cli/pull/29431) | Skips invalid TOML policy rules during startup to prevent crashes from malformed configs. | ✅ Merged |
| [#29429](https://github.com/google-gemini/gemini-cli/pull/29429) | Exposes actual quota limit and reset window from server metadata—critical for debugging rate-limiting issues. | ✅ Merged |
| [#29427](https://github.com/google-gemini/gemini-cli/pull/29427) | Properly forwards signals (SIGTERM/SIGHUP) to child processes—prevents orphaned background tasks. | ✅ Closed |
| [#29426](https://github.com/google-gemini/gemini-cli/pull/29426) | Detects legacy CPUs incompatible with Antigravity binary early—avoids crash-on-launch. | ✅ Closed |
| [#29304](https://github.com/google-gemini/gemini-cli/pull/29304) | Prevents surrogate pair splitting during text truncation—fixes emoji corruption in logs. | ✅ Merged |
| [#29375](https://github.com/google-gemini/gemini-cli/pull/29375) | Implements stateful decoder for DevTools HTTP chunks—ensures streaming integrity. | ✅ Merged |
| [#29376](https://github.com/google-gemini/gemini-cli/pull/29376) | Stops Windows IDE detection fallback from running Unix `ps`—improves cross-platform compatibility. | ✅ Merged |
| [#29387](https://github.com/google-gemini/gemini-cli/pull/29387) | Makes extension loading resilient to malformed directories—prevents total failure on one bad extension. | ✅ Merged |
| [#29404](https://github.com/google-gemini/gemini-cli/pull/29404) | Adds `gemini models list -o json` for programmatic model discovery—enables integrations and CI/CD tooling. | ✅ Merged |

---

### **5. Hot Discussions**  
*No discussion data provided in source.*

---

### **6. Feature Request Trends**  
The community is converging on three major directions:  
- **Agent Intelligence & Orchestration:** Users want more autonomous use of sub-agents and skills ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968), [#22598](https://github.com/google-gemini/gemini-cli/issues/22598)).  
- **Codebase Precision via AST Awareness:** Multiple issues advocate for AST-aware tools to reduce token usage and improve accuracy in file reads and searches ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)).  
- **Security & Stability at Scale:** Demand for secure memory handling, deterministic redaction ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)), and resilient agent lifecycle management is growing rapidly.

---

### **7. Developer Pain Points**  
Recurring frustrations include:  
- **Agent Hangs & Crashes:** Generalist and browser agents freezing or failing silently ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)).  
- **Configuration Drift:** Agents ignoring `settings.json` overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) and symlink recognition failures ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)).  
- **Token & Workspace Bloat:** Uncontrolled script generation ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)), poor task tracking ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836)), and lack of persistence for `/compress` ([#21335](https://github.com/google-gemini/gemini-cli/issues/21335)).  
- **Security Gaps:** Secrets leaking into model context before redaction ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) and unhandled low-signal session retries ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)).

---  
*Digest compiled from GitHub data: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-21

---

### **Today's Highlights**  
The Copilot CLI community continues to report critical stability and integration issues, particularly around MCP server discovery, session resilience, and tooling behavior. Notably, the Figma MCP server fails to register tools due to a `-32601` error being treated as fatal, despite successful authentication. Meanwhile, new open issues highlight persistent problems with auto-mode model selection, non-interactive tool hangs, and ARM64 ripgrep crashes on Linux—indicating growing concern over cross-platform reliability.

---

### **Releases**  
*No new releases in the last 24 hours.*

---

### **Hot Issues**  
*(Top 10 by comment count and impact)*

1. **[#4870] Figma MCP server fails to load (`-32601` on `server/discover`)**  
   [Link](https://github.com/github/copilot-cli/issues/4870)  
   *Why it matters:* Breaks integration with a major design tool; CLI treats a recoverable error as fatal, unlike VS Code. 8 comments, 11 👍 — high visibility from Figma users.

2. **[#3762] `contextTier` config option does nothing**  
   [Link](https://github.com/github/copilot-cli/issues/3762)  
   *Why it matters:* Users expect long-context models to be enforced via config, but only manual model selection triggers it. 7 comments — undermines configuration-driven workflows.

3. **[#1675] `git clean -fd` permanently deletes untracked files during checkpoint restore**  
   [Link](https://github.com/github/copilot-cli/issues/1675)  
   *Why it matters:* A dangerous bug where restoring a session erases user work irreversibly. 5 comments — urgent fix needed for safety.

4. **[#4224] OTel spans omit billing attributes for subagent calls**  
   [Link](https://github.com/github/copilot-cli/issues/4224)  
   *Why it matters:* External cost tracking systems undercount actual usage since subagent calls lack billing metadata. 5 comments, 1 👍 — impacts enterprise cost governance.

5. **[#4606] Google Workspace MCP OAuth fails due to trailing-slash issuer mismatch**  
   [Link](https://github.com/github/copilot-cli/issues/4606)  
   *Why it matters:* Blocks authentication for Google Workspace users before authorization even begins. 3 comments, 1 👍 — affects corporate adoption.

6. **[#4910] Non-interactive MCP tool call hangs after progress notification**  
   [Link](https://github.com/github/copilot-cli/issues/4910)  
   *Why it matters:* Tool calls stall indefinitely without result or error, causing automation failures. 3 comments — critical for CI/CD pipelines.

7. **[#4807] Idle CLI enters FileWatch event storm (33+ GB log, 2 CPU cores)**  
   [Link](https://github.com/github/copilot-cli/issues/4807)  
   *Why it matters:* Resource exhaustion in idle state risks system instability. 2 comments — severe performance regression.

8. **[#3589] Multiple `additionalContext` hooks only inject last value**  
   [Link](https://github.com/github/copilot-cli/issues/3589)  
   *Why it matters:* Prevents additive context injection from multiple plugins — breaks plugin composability. 3 comments, 2 👍 — key for extensibility.

9. **[#4731] Tools/list refresh times out and permanently strips server tools**  
   [Link](https://github.com/github/copilot-cli/issues/4731)  
   *Why it matters:* Cancelling a tool call can render its server unusable for the entire session. 2 comments — deep reliability flaw.

10. **[#4918] Built-in ARM64 ripgrep crashes on Linux with 64 KiB pages**  
    [Link](https://github.com/github/copilot-cli/issues/4918)  
    *Why it matters:* Breaks search functionality on certain Linux systems (e.g., some cloud instances). 0 comments, but critical for Linux users.

---

### **Key PR Progress**  
*No pull requests updated in the last 24 hours.*

---

### **Hot Discussions**  
*None provided in data source.*

---

### **Feature Request Trends**  
Based on recurring themes across issues and feature requests:

- **Enhanced session control:** Users want better handling of interrupted sessions (e.g., preserving queued prompts on Escape — #3692), resuming safely without corruption (#4098), and avoiding auto-continuation of aborted work (#4673).
- **Improved plugin extensibility:** Demand for proper support of multiple `additionalContext` injections (#3589), safe `preToolUse` hook execution (#3874), and reliable extension reloads (#2348).
- **Cross-platform robustness:** Critical need for ARM64/Linux compatibility (e.g., ripgrep crash #4918), Windows `.bat/.cmd` script support (#3958), and consistent behavior across terminals.
- **Better configuration and model control:** Users seek deterministic model selection (e.g., `contextTier` working as expected #3762), auto-reset to "auto" mode (#2096), and support for newer models like `gpt-5.5` in BYOK (#3118).
- **Remote repository support:** Strong desire to use `/remote` beyond GitHub (e.g., GitLab, Bitbucket — #2922).

---

### **Developer Pain Points**  
The top recurring frustrations include:

- **Irreversible data loss:** `git clean -fd` during checkpoint restore deletes untracked files (#1675) — a serious trust issue.
- **Unpredictable tool behavior:** Tools hang (#4910), fail silently (#4448), or crash on specific platforms (#4918).
- **Configuration misalignment:** Key settings like `contextTier` (#3762) and model selection (#3118) don’t behave as documented.
- **Authentication friction:** OAuth issues with Google Workspace (#4606) and broken MCP server discovery (#4870) hinder enterprise adoption.
- **Plugin reliability:** Hooks deadlock (#2348), context injection is lost (#3589), and tool toggling becomes unreliable with many skills (#2320).
- **Session persistence bugs:** Corrupted `events.jsonl` due to U+2028/U+2029 characters (#2012) and truncated events after resume (#4098) break workflow continuity.

These patterns point to a need for deeper platform testing, improved error handling, and more rigorous validation of user-configurable behaviors.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# **OpenCode Community Digest – 2026-09-21**

---

### **1. Today's Highlights**  
The OpenCode community is grappling with critical usability and stability issues, particularly around the new UI layout and free-tier access restrictions. A growing number of users report being blocked from using free models due to escalating retry timers and unclear appeal paths. Meanwhile, a major refactor effort is underway to improve startup performance via lazy command loading.

---

### **2. Releases**  
*No new releases in the last 24 hours.*

---

### **3. Hot Issues**  

| Issue | Summary & Impact | Community Reaction |
|------|------------------|--------------------|
| [#49433](https://github.com/anomalyco/opencode/issues/49433) | Free tier restricted to internal use only — breaks external API access for all models. Users can’t use OpenCode’s free tier outside the app. | 🔥 **48 comments**, 12 👍 — High urgency; seen as a core limitation for developers relying on external integrations. |
| [#29363](https://github.com/anomalyco/opencode/issues/29363) | `limit.output` capped at 32k tokens silently, despite config settings. Only workaround is an undocumented experimental env var. | 🔥 **22 comments**, 23 👍 — Major pain point for long-context workflows (e.g., DeepSeek, GPT/Claude). Seen as a design flaw. |
| [#1735](https://github.com/anomalyco/opencode/issues/1735) | Custom providers default to 32k `max_tokens`, ignoring user config. Breaks expected behavior for non-standard LLM gateways. | 🔥 **19 comments**, 12 👍 — Critical for users running local or self-hosted models via OpenAI-compatible APIs. |
| [#49927](https://github.com/anomalyco/opencode/issues/49927) | First session of the week triggers "Free Usage Exceeded" even after a full week offline. Confuses users about usage reset logic. | 🟡 **12 comments**, 0 👍 — Suggests flawed free-tier reset mechanics; impacts trust in fair usage policies. |
| [#37546](https://github.com/anomalyco/opencode/issues/37546) | New "tabs-on-top" web layout lacks workspace/worktree support and has no way to revert. Renders legacy workflow unusable. | 🔥 **8 comments**, 26 👍 — Top complaint for web users; blocks multi-project workflows. |
| [#49965](https://github.com/anomalyco/opencode/issues/49965) | Auto-compaction runs after every tool call for Ollama provider, even when far from context limit. Causes unnecessary overhead. | 🟡 **5 comments**, 0 👍 — Hinders local model performance and increases latency. |
| [#50155](https://github.com/anomalyco/opencode/issues/50155) | Paid Go subscription fails on `deepseek-v4-flash` due to missing Global region toggle in Privacy settings. | 🟡 **2 comments**, 1 👍 — Blocks access to premium models without clear configuration path. |
| [#50093](https://github.com/anomalyco/opencode/issues/50093) | Free usage exceeded errors persist across model switches, with retry timers increasing unpredictably. | 🟡 **5 comments**, 5 👍 — Indicates systemic issue with rate-limit tracking and reset logic. |
| [#50202](https://github.com/anomalyco/opencode/issues/50202) | `big-pickle` free model produces corrupted, non-functional output — rendering it unusable. | 🟡 **2 comments**, 0 👍 — Threatens credibility of free model offerings. |
| [#50179](https://github.com/anomalyco/opencode/issues/50179) | `encrypted_content` error occurs during agent reasoning, blocking model access. Root cause unclear. | 🟡 **1 comment**, 1 👍 — Security-related error; may indicate token or identity mismanagement. |

---

### **4. Key PR Progress**  

| PR | Summary & Impact | Status |
|----|------------------|--------|
| [#50253](https://github.com/anomalyco/opencode/pull/50253) | Refactors `opencode --version` to skip full startup via lazy command loading. Reduces startup delay from seconds to milliseconds. | ✅ Open |
| [#50251](https://github.com/anomalyco/opencode/pull/50251) | Fixes silent session idle when a turn ends with `stop` and no output. Now surfaces such turns explicitly. | ✅ Open |
| [#50106](https://github.com/anomalyco/opencode/pull/50106) | Stops republishing summary diffs into durable snapshots, reducing session file size by up to 10x. Addresses massive heap spikes. | ✅ Open |
| [#50248](https://github.com/anomalyco/opencode/pull/50248) | Keeps mini-session waits alive during background processing — prevents premature timeouts. | ✅ Open |
| [#50249](https://github.com/anomalyco/opencode/pull/50249) | Adds OAuth provider connection badges to UI — improves visibility of linked accounts. | ✅ Open |
| [#50243](https://github.com/anomalyco/opencode/pull/50243) | Fixes model capability detection — ensures tools are only used if supported by the underlying model. | ✅ Withdrawn (issue assigned) |
| [#50239](https://github.com/anomalyco/opencode/pull/50239) | Shows actual command in external directory permission prompts — improves clarity during shell interactions. | ✅ Open |
| [#50245](https://github.com/anomalyco/opencode/pull/50245) | Preserves prompt argument text during CLI execution — fixes lost input in scripts. | ✅ Withdrawn (issue assigned) |
| [#43713](https://github.com/anomalyco/opencode/pull/43713) | Introduces per-model compaction thresholds — allows different models to auto-compact at optimal points. | ✅ Merged |
| [#43708](https://github.com/anomalyco/opencode/pull/43708) | Enables server-side response compaction — reduces memory pressure and speeds up stateful continuations. | ✅ Merged |

---

### **5. Hot Discussions**  
*No discussion threads were provided in the data source.*

---

### **6. Feature Request Trends**  
The most prominent feature requests center around **user control, transparency, and extensibility**:
- **Free-tier fairness**: Users demand predictable usage resets, clearer limits, and appeal mechanisms (e.g., [#10448](https://github.com/anomalyco/opencode/issues/10448), [#50093](https://github.com/anomalyco/opencode/issues/50093)).
- **UI flexibility**: Persistent need for customizable layouts, especially reverting the new "tabs-on-top" web interface and restoring workspaces (e.g., [#37546](https://github.com/anomalyco/opencode/issues/37546), [#39614](https://github.com/anomalyco/opencode/issues/39614)).
- **Developer tooling**: Requests for programmable balance checks (`Zen balance API`), better plugin loader fallbacks, and improved CLI debugging (e.g., [#10448](https://github.com/anomalyco/opencode/issues/10448), [#50172](https://github.com/anomalyco/opencode/issues/50172)).
- **Model customization**: Per-model config for output limits, compaction, and context handling — driven by diverse model behaviors (e.g., [#29363](https://github.com/anomalyco/opencode/issues/29363), [#43713](https://github.com/anomalyco/opencode/issues/43713)).

---

### **7. Developer Pain Points**  
Recurring frustrations include:
- **Silent limitations**: Features like `limit.output` capping at 32k without warnings or documentation.
- **Unreliable free tiers**: Escalating retry timers and inconsistent access across models.
- **Broken workflows**: New UI layout removes essential features (workspaces, worktrees) with no rollback option.
- **Poor error feedback**: Errors like `encrypted_content` or `user_blocked` lack context or resolution paths.
- **High memory usage**: Session files ballooning due to redundant diff storage (e.g., [#50089](https://github.com/anomalyco/opencode/issues/50089)).
- **Inconsistent plugin loading**: V2 plugin system breaks backward compatibility, especially with npm-spec plugins (e.g., [#33884](https://github.com/anomalyco/opencode/issues/33884)).
- **Tooling friction**: Missing notifications, unresponsive TUIs, and stuck terminal commands (e.g., [#43355](https://github.com/anomalyco/opencode/issues/43355), [#50170](https://github.com/anomalyco/opencode/issues/50170)).

---

*For full context, visit the [OpenCode GitHub repo](https://github.com/anomalyco/opencode).*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-21

---

### **1. Today's Highlights**  
The latest release, **v0.86.1**, introduces official support for the **Meta Muse Spark models** via OAuth and API key, expanding the AI provider ecosystem. Meanwhile, critical performance and stability fixes address high-impact issues including TUI CPU pinning, session persistence blocking, and streaming reliability across providers.

---

### **2. Releases**

- **v0.86.1** (Released: 2026-09-20)  
  - ✅ **New Feature**: Added **Meta Muse provider** — access via `/login meta` or `META_API_KEY`. See [Meta (Muse subscription)](https://github.com/earendil-works/pi/blob/v0.86.1/packages/coding-agent/docs/providers.md#meta-muse-subscription).  
  - 🔧 **Fixes**: Resolved NInfer compatibility breakage in v0.86.0, fixed clipboard copy regression, and improved error handling for Z.AI context overflow.  
  - 🛠️ **Bug Fixes**: Fixed `429` rate limit misbehavior due to missing `Retry-After` header handling, and addressed `openai-codex/gpt-5.6-sol` cache misses leading to high latency.

---

### **3. Hot Issues**

| Issue | Summary & Impact | Community Reaction |
|------|------------------|--------------------|
| [#7547](https://github.com/earendil-works/pi/issues/7547) | Windows users struggle with inconsistent Pi installation/run workflows; top request for unified, documented setup path. | 67 comments, 2 upvotes — major pain point for a large developer segment. |
| [#6665](https://github.com/earendil-works/pi/issues/6665) | TUI consumes 100% CPU during long sessions due to uncached `Intl.Segmenter` + inefficient Markdown rebuilds. | 13 comments, 6 upvotes — critical perf issue affecting real-time UX. |
| [#9815](https://github.com/earendil-works/pi/issues/9815) | Mistral API ignores `Retry-After` header, causing repeated 429 errors despite rate-limiting guidance. | 5 comments — urgent fix needed for stable external API integration. |
| [#9508](https://github.com/earendil-works/pi/issues/9508) | Pi sends OpenAI-specific fields/roles to compatible providers (e.g., Ollama), triggering 400/422 errors. | 5 comments — highlights fragility in cross-provider compatibility. |
| [#9062](https://github.com/earendil-works/pi/issues/9062) | Tool-call argument parsing becomes quadratic with fragmented deltas — severe scalability issue in long streams. | 5 comments — performance bottleneck in tool usage at scale. |
| [#9169](https://github.com/earendil-works/pi/issues/9169) | Images render incorrectly in fullscreen TUI mode on Windows 11 / WezTerm. | 5 comments — visual regression impacting user experience. |
| [#9497](https://github.com/earendil-works/pi/issues/9497) | CJK IME input is laggy and candidate window fails to appear on Windows; `showHardwareCursor` fixes it. | 3 comments — blocks non-Latin developers from productive use. |
| [#9810](https://github.com/earendil-works/pi/issues/9810) | OpenAI Codex model metadata causes CacheWarmer to fail after 100k+ idle cache misses → long first-token latency. | 3 comments — impacts performance for long-running sessions. |
| [#9770](https://github.com/earendil-works/pi/issues/9770) | `find` and `grep` tools lack timeout mechanisms — return empty success when killed externally. | 3 comments — security and reliability risk in untrusted environments. |
| [#9807](https://github.com/earendil-works/pi/issues/9807) | Full re-render on every interaction causes scroll/typing lag in sessions with 800+ messages. | 2 comments — direct UX degradation in large-scale workflows. |

---

### **4. Key PR Progress**

| PR | Summary | Link |
|----|--------|------|
| [#9804](https://github.com/earendil-works/pi/pull/9804) | Fixes Cerebras strict mode misalignment — marks `strictMode` as unsupported to prevent 400 errors. | [PR #9804](https://github.com/earendil-works/pi/pull/9804) |
| [#9117](https://github.com/earendil-works/pi/pull/9117) | Delivers prompt/tool changes as system message deltas instead of rewriting full prompts — improves modularity. | [PR #9117](https://github.com/earendil-works/pi/pull/9117) |
| [#9116](https://github.com/earendil-works/pi/pull/9116) | Adds mid-conversation system messages — enables dynamic role updates without full prompt reset. | [PR #9116](https://github.com/earendil-works/pi/pull/9116) |
| [#9096](https://github.com/earendil-works/pi/pull/9096) | Implements Meta Muse provider with OAuth flow and initial streaming (burst-mode) support. | [PR #9096](https://github.com/earendil-works/pi/pull/9096) |
| [#9800](https://github.com/earendil-works/pi/pull/9800) | Handles `WriteStream` errors in bash output temp files — prevents crashes on large outputs. | [PR #9800](https://github.com/earendil-works/pi/pull/9800) |
| [#9799](https://github.com/earendil-works/pi/pull/9799) | Ensures agentLoop streams are terminated on unrecoverable failure — prevents zombie processes. | [PR #9799](https://github.com/earendil-works/pi/pull/9799) |
| [#8743](https://github.com/earendil-works/pi/pull/8743) | Ignores stale tool image conversions — prevents rendering outdated or mismatched images. | [PR #8743](https://github.com/earendil-works/pi/pull/8743) |
| [#9816](https://github.com/earendil-works/pi/pull/9816) | Fixes NInfer support broken in v0.86.0 by adjusting strict tool handling. | [PR #9816](https://github.com/earendil-works/pi/pull/9816) |
| [#9803](https://github.com/earendil-works/pi/pull/9803) | Addresses RPC steer correlation loss post-v0.86.0 — enables reliable extension input tracking. | [PR #9803](https://github.com/earendil-works/pi/pull/9803) |
| [#9802](https://github.com/earendil-works/pi/pull/9802) | Documents Homebrew install (`brew install pi-coding-agent`) in README — improves discoverability. | [PR #9802](https://github.com/earendil-works/pi/pull/9802) |

---

### **5. Hot Discussions**  
*No discussion threads provided in data source.*

---

### **6. Feature Request Trends**

- **Cross-Provider Compatibility**: High demand for better normalization of OpenAI-specific fields (e.g., roles, auth) to work seamlessly with compatible providers like Ollama, Mistral, and Kimi.
- **Windows UX Optimization**: Recurring requests for better IME support (especially CJK), consistent install paths, and terminal rendering fixes (fullscreen TUI).
- **Performance & Scalability**: Strong interest in incremental rendering (TUI), efficient JSON parsing (tool args), and smarter caching (e.g., for long idle sessions).
- **Configurable Extensions & Tools**: Users want granular control over skill filtering (globs, exact matches), npm package resolution, and extension behavior.
- **Provider Ecosystem Expansion**: Desire for regional login options (e.g., Kimi Code in China), and more first-party provider integrations (e.g., Meta Muse, Z.AI).

---

### **7. Developer Pain Points**

- **Windows Instability & Setup Confusion**: Top-tier frustration with inconsistent installation methods, IME lag, and rendering bugs (Issue #7547, #9497, #9169).
- **Streaming & Performance Bottlenecks**: Critical CPU consumption in TUI (Issue #6665), quadratic parsing (Issue #9062), and full re-renders (Issue #9807).
- **Session Persistence & Async Issues**: Legacy sync I/O in `SessionManager` blocks async operations (Issue #2616), causing delays and instability.
- **Extension & Dependency Fragility**: Extensions fail to resolve packages with `main`/`exports` in `package.json` (Issue #9817), and callbacks lose context (Issue #9821).
- **Error Handling Gaps**: Providers ignore standard headers (e.g., `Retry-After`, `context_overflow`), leading to silent failures (Issues #9815, #9805).

---  
*Digest compiled from GitHub data: github.com/earendil-works/pi — 2026-09-21*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Qwen Code Community Digest – 2026-09-21**

---

### **1. Today's Highlights**  
The Qwen Code team continues to prioritize long-context performance and session reliability, with key updates focused on token management, Web Shell enhancements, and daemon stability. A major improvement in live voice input now uses AudioWorklet for real-time microphone capture, improving responsiveness in interactive sessions.

---

### **2. Releases**  
- **v0.24.2** (Released: 2026-09-21)  
  - Restored remote workspace addition flow in web-shell ([#12085](https://github.com/QwenLM/qwen-code/pull/12085))  
  - Nightly build `v0.24.2-nightly.20260920.eceaede18e` includes internal fixes and telemetry improvements  
  - No breaking changes reported  

---

### **3. Hot Issues**  
| Issue | Summary & Impact | Community Reaction |
|------|------------------|--------------------|
| [#12028](https://github.com/QwenLM/qwen-code/issues/12028) | Non-conversation context (system prompt, tool schemas, QWEN.md) is sent on every request—consumes up to 45% of tokens on large-context models | 10 comments, high priority (P2), critical for cost/performance tuning |
| [#12029](https://github.com/QwenLM/qwen-code/issues/12029) | Percentage-based budgets misbehave on large context windows—tools preload never triggers, warnings don’t fire | 8 comments, directly impacts scalability and user awareness |
| [#12303](https://github.com/QwenLM/qwen-code/issues/12303) | Cross-session governance needs capping, naming, and settlement logic for multi-session hosts | 6 comments, essential for enterprise-grade multi-agent use cases |
| [#12054](https://github.com/QwenLM/qwen-code/issues/12054) | Built-in tool descriptions are the largest non-conversation block (~21k tokens)—no tracking or budgeting | 6 comments, part of larger context-cost visibility initiative |
| [#12002](https://github.com/QwenLM/qwen-code/issues/12002) | Inline secrets in `function_args` are logged verbatim in chat JSONL and telemetry—security risk | 5 comments, labeled as security issue; urgent fix needed |
| [#12091](https://github.com/QwenLM/qwen-code/issues/12091) | Deleting a live session unlinks its transcript; writer recreates file without parent UUID → broken history | 5 comments, data integrity risk during cleanup |
| [#12224](https://github.com/QwenLM/qwen-code/issues/12224) | `/cd` command fails post-v0.24.0 due to "response/tool call in progress" error even when idle | 6 comments, affects CLI usability; P1 bug |
| [#12332](https://github.com/QwenLM/qwen-code/issues/12332) | Web-shell publish verifier rejects valid npm wildcard exports like `"./*": "./dist/src/*"` | 4 comments, blocks valid packaging workflows |
| [#12350](https://github.com/QwenLM/qwen-code/issues/12350) | `qwen serve` shutdown fails during ACP preheat on macOS — exits with code 1 despite cleanup | 3 comments, platform-specific regression |
| [#12306](https://github.com/QwenLM/qwen-code/issues/12306) | ~31 settings remain in English when UI language is set to Chinese — poor i18n coverage | 3 comments, 1 👍; highlights localization gaps |

---

### **4. Key PR Progress**  
| PR | Summary & Impact | Link |
|----|------------------|------|
| [#12364](https://github.com/QwenLM/qwen-code/pull/12364) | Fixes web-shell publish verifier to handle wildcard exports correctly | [PR #12364](https://github.com/QwenLM/qwen-code/pull/12364) |
| [#12322](https://github.com/QwenLM/qwen-code/pull/12322) | Enables expiring QR pairing on non-loopback listeners for secure mobile access | [PR #12322](https://github.com/QwenLM/qwen-code/pull/12322) |
| [#12362](https://github.com/QwenLM/qwen-code/pull/12362) | Restores mobile history navigation and input focus behavior in Web Shell | [PR #12362](https://github.com/QwenLM/qwen-code/pull/12362) |
| [#12267](https://github.com/QwenLM/qwen-code/pull/12267) | Moves bwrap sandboxing to tool execution level—enhances security isolation | [PR #12267](https://github.com/QwenLM/qwen-code/pull/12267) |
| [#12358](https://github.com/QwenLM/qwen-code/pull/12358) | Introduces standalone managed agent stack with Spring-based control plane | [PR #12358](https://github.com/QwenLM/qwen-code/pull/12358) |
| [#12183](https://github.com/QwenLM/qwen-code/pull/12183) | Adds support for loading deployment-managed extensions from local directories | [PR #12183](https://github.com/QwenLM/qwen-code/pull/12183) |
| [#12255](https://github.com/QwenLM/qwen-code/pull/12255) | Enables SSH workspaces without requiring a remote daemon—local-first remote editing | [PR #12255](https://github.com/QwenLM/qwen-code/pull/12255) |
| [#12258](https://github.com/QwenLM/qwen-code/pull/12258) | Makes App resource limits configurable per MCP server (up to 4 MiB / 120 sec) | [PR #12258](https://github.com/QwenLM/qwen-code/pull/12258) |
| [#12154](https://github.com/QwenLM/qwen-code/pull/12154) | Adds worktree management tab in Web Shell git dialog for better Git workflow control | [PR #12154](https://github.com/QwenLM/qwen-code/pull/12154) |
| [#12278](https://github.com/QwenLM/qwen-code/pull/12278) | Adds Landlock filesystem fallback for execution sandboxing where bwrap isn't available | [PR #12278](https://github.com/QwenLM/qwen-code/pull/12278) |

---

### **5. Hot Discussions**  
*No discussion threads provided in the dataset.*  
➡️ *Omitted per source data.*

---

### **6. Feature Request Trends**  
The community is converging on several core themes:  
- **Context Efficiency**: Demand for granular token budgeting, dynamic context gating, and automatic tool surface selection to reduce overhead from system prompts and built-in tools ([#12028], [#12054], [#12326]).  
- **Security & Privacy**: Strong interest in preventing inline secret exposure in logs and enhancing credential handling across sessions ([#12002], [#12091]).  
- **Multi-Agent & Session Management**: Growing need for cross-session governance, session naming, and resilience in multi-session environments ([#12303], [#11013]).  
- **Localization & UX Polish**: Persistent demand for full i18n support (especially Chinese) and consistent UI behavior across platforms ([#12306], [#11847]).  
- **Platform Expansion**: Requests to publish Chrome extension to Chrome Web Store and enable broader distribution via CI/CD pipelines ([#12240]).

---

### **7. Developer Pain Points**  
- **Token Cost Blind Spots**: Developers report being unaware of how much context is consumed by static system elements (e.g., tool schemas, `QWEN.md`) — leading to unexpected costs and performance degradation on large-context models.  
- **Inconsistent Build/Publish Logic**: The web-shell publish verifier incorrectly treats npm subpath patterns as paths, blocking valid package configurations ([#12332], [#12364]).  
- **CLI Stability Issues**: Post-v0.24.0, `/cd` commands fail unpredictably due to state mismanagement — disrupting basic workflow efficiency ([#12224]).  
- **Cross-Platform Crashes**: Daemon shutdown failures on macOS during ACP preheat indicate fragile lifecycle handling in production environments ([#12350]).  
- **Hard-to-Diagnose Telemetry Gaps**: Context usage telemetry is dropped when non-function tools are present, making debugging performance issues nearly impossible ([#12048]).  

---  
*Digest compiled from GitHub data at 2026-09-21. For full context, explore issues and PRs via links above.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*