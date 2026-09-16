# OpenClaw Ecosystem Digest 2026-09-16

> Issues: 467 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-16 00:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-16**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active with a surge in developer engagement: **467 issues** and **500 pull requests** updated in the past 24 hours, reflecting intense development and issue triage. The ecosystem shows strong momentum in addressing critical stability and security concerns, particularly around memory leaks, process management, and session state corruption. While no new releases were published, the volume of merged PRs suggests significant progress toward stabilizing the 2026.9.x release cycle. The high number of P0/P1 issues indicates that core runtime reliability is under active scrutiny.

---

### **2. Releases**  
❌ **No new releases** were published today.  
*Note:* The latest stable version remains `2026.9.4`, which has been associated with multiple regressions (e.g., #139847, #148614, #149546). Users are advised to monitor GitHub for patch updates or consider reverting to `2026.9.3` if experiencing instability.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
Several high-impact fixes were merged or closed, including:
- **PR #145223** – Fixes Telegram rich message delivery fallback after legacy rejection.
- **PR #149360** – Resolves touch device comment reveal behavior in web UI.
- **PR #147886** – Enables `markdown.tables` support in Feishu channel configuration.
- **PR #128872** – Separates `message_tool_only` reply decision from delivery logic, improving clarity.

🔧 **Key Feature Advancements:**  
- **PR #148193** (feat: Llama.cpp OCR/vision setup) is now awaiting maintainer acceptance—could enable local vision agents in future.
- **PR #146676** adds real-time voice switching during Talk/Discord calls—enhancing multimodal interaction.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Comment Count & Severity:**
| Issue | Comments | Rating | Link |
|------|---------|--------|------|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 40 | 🦞 Diamond Lobster (Security/UX) | Internal agent text leaking into messaging channels |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 31 | 🦪 Silver Shellfish (Crash Loop) | Zombie process accumulation due to un-reaped hooks |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 25 | 🦪 Silver Shellfish (OOM Crash) | Gateway memory leak (350MB → 15.5GB over days) |

🔍 **Underlying Needs:**  
- **Session integrity** is a recurring theme: 14+ issues involve state loss, crash loops, or stale sessions.
- **Security transparency**: Leaking internal agent output (#25592) and prompt cache failures (#102175) suggest a need for clearer isolation boundaries.
- **Process lifecycle management**: Multiple bugs stem from unreaped child processes (#97616, #144911), indicating systemic gaps in resource cleanup.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs Reported (P0/P1, High Impact):**
| Issue | Description | Status | Fix PR? |
|------|-------------|--------|--------|
| [#148866](https://github.com/openclaw/openclaw/issues/148866) | Gateway restart loop on `gateway.bind=lan` (Ubuntu/systemd) | ✅ Closed | No |
| [#148614](https://github.com/openclaw/openclaw/issues/148614) | Update failure: `runtime-verification-failed` (2026.9.3 → 2026.9.4) | ✅ Closed | No |
| [#149198](https://github.com/openclaw/openclaw/issues/149198) | Premature `stale_lane_task` release kills cron jobs | 🔴 Open | No |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | Reply lost due to "no active tool authority snapshot" (regression) | 🔴 Open | No |

⚠️ **High-Risk Regressions:**  
- **#139847** (2026.9.2 regression): Messages dropped during active reply runs — blocks user input mid-session.
- **#143524**: SQLite WAL grows unchecked (up to 2.8GB) despite `wal_autocheckpoint=1000`.

🛠️ **Fixes in Progress:**  
- **PR #149520** addresses excessive Codex session memory use — critical for long-running workflows.
- **PR #149533** aims to reduce CPU load on cold session listings — improves scalability.

---

### **6. Feature Requests & Roadmap Signals**  
📌 **Emerging Priorities Based on User Demand:**
- **Enhanced diagnostics**:  
  - **#51441** (Expose resolved backend model in session status) — users want visibility into actual model routing via LiteLLM.
  - **#149291** (Report session list CPU time) — signals growing need for performance profiling.
- **Improved UX & Reliability**:  
  - **#149384** (Keep task progress collapsed after scroll) — reflects demand for predictable UI state.
  - **#149549** (CLI heartbeat escape hatch) — highlights need for graceful fallbacks.
- **Multi-Agent Cost Attribution**:  
  - **#60602** (Per-agent Bedrock metadata injection) — requested for enterprise cost tracking; likely to be prioritized post-stability fix.

🔮 **Predicted Next Release Features:**  
- Local OCR/vision support (via #148193).
- Voice switching during live calls (via #146676).
- Better session state persistence and recovery mechanisms.

---

### **7. User Feedback Summary**  
💬 **Real Pain Points from Users:**  
- **Memory leaks** (e.g., #91588) cause repeated OOM crashes, breaking long-term agent usage.
- **Message loss** is frequent: users report replies vanishing mid-turn (#139847, #148707), causing frustration.
- **Hidden internals** leak into user channels (#25592), raising privacy and trust concerns.
- **Update failures** are common (e.g., #148614, #146637), disrupting production deployments.

🎯 **User Satisfaction Drivers:**  
- Web UI improvements (e.g., #149351, #149384) receive positive feedback for usability.
- CLI enhancements like `cron add` fixes (#149536) improve automation reliability.

---

### **8. Backlog Watch**  
⏳ **Long-Standing Issues Needing Maintainer Attention:**
| Issue | Age | Status | Notes |
|------|-----|--------|-------|
| [#115367](https://github.com/openclaw/openclaw/issues/115367) | 2026-07-28 | Open (P1, Security) | Provider-owned read gate requires `origin: bundled`, but external plugins now dominate — breaks access control. |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | 2026-06-09 | Open (P1, Security) | Embedded prompt cache breaks across session boundaries — undermines consistency. |
| [#118839](https://github.com/openclaw/openclaw/issues/118839) | 2026-08-03 | Open (P1, Regression) | Persistent session state corruption in Telegram — still reproducible despite prior fixes. |
| [#56692](https://github.com/openclaw/openclaw/issues/56692) | 2026-03-29 | Open (P2, UX) | Group chat context confusion — misdirected agent responses remain unresolved. |

💡 **Call to Action:** Maintainers should prioritize these P1 issues to prevent further erosion of trust in session integrity and cross-platform reliability.

---  
**Project Health Score:** ⚠️ **Stable but Under Pressure**  
While development velocity is high, the backlog of unresolved P0/P1 bugs poses a risk to production adoption. Immediate focus on memory safety, process lifecycle, and session durability is critical.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Assistant & Agent Open-Source Ecosystem – 2026-09-16**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem in Q3 2026 is characterized by rapid evolution, strong community engagement, and a strategic pivot toward **multi-agent systems**, **enterprise readiness**, and **secure, self-hosted deployments**. Projects are increasingly focused on runtime stability, session integrity, cost transparency, and cross-platform reliability—reflecting maturity beyond early experimentation. A clear trend emerges: the shift from individual tooling to **collaborative, team-oriented platforms** with governance, access control, and observability features. Security hardening, dependency hygiene, and UX predictability have become non-negotiable for production adoption.

---

### **2. Activity Comparison**

| Project        | Issues (24h) | PRs (24h) | Releases (Today) | Health Score             |
|----------------|--------------|-----------|------------------|----------------------------|
| **OpenClaw**   | 467          | 500       | ❌ No            | ⚠️ Stable but Under Pressure |
| **Hermes Agent** | 50           | 50        | ❌ No            | ⚠️ Vibrant, High Risk     |
| **IronClaw**   | 0            | 0         | ❌ No            | 🛑 Dormant                |
| **QwenPaw**    | 28           | 50        | ❌ No            | ✅ High-Growth, Active     |
| **ZeroClaw**   | 50           | 50        | ❌ No            | ✅ Strong (High Maturity)  |

> *Note: OpenClaw leads in volume; ZeroClaw and QwenPaw show balanced, sustainable activity. IronClaw is inactive.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the **most active project in terms of contributor velocity and issue volume**, with over 467 issues and 500 PRs updated daily—signaling intense development pressure. Its technical approach emphasizes **deep integration with external tools** (e.g., Telegram, Feishu, Discord) and **complex state management**, reflected in its focus on session persistence, memory leaks, and process lifecycle. Compared to peers, OpenClaw has the **largest community-driven backlog** (14+ P1/P0 issues related to session integrity), indicating higher complexity and deeper user reliance. However, this also means greater risk: while momentum is high, stability lags behind feature delivery. In contrast, projects like ZeroClaw and QwenPaw are more focused and cohesive in their scope.

---

### **4. Shared Technical Focus Areas**  
Across all active projects, the following **emerging systemic requirements** are evident:

| Need                          | Projects Involved                     | Specific Examples |
|-------------------------------|----------------------------------------|--------------------|
| **Session State Integrity**   | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Stale sessions, crash loops, lost replies (#148707, #106003, #7678) |
| **Memory & Resource Safety**  | OpenClaw, Hermes Agent, ZeroClaw        | Memory leaks (350MB → 15.5GB), un-reaped processes, OOM crashes |
| **Cost Transparency & Control** | Hermes Agent, QwenPaw, ZeroClaw         | Prompt cache abuse ($147/49min), unexpected billing, budget enforcement |
| **Security & Credential Handling** | Hermes Agent, ZeroClaw, OpenClaw      | Internal agent leaks (#25592), credential exposure in logs, insecure dependencies |
| **Multimodal Reliability**    | ZeroClaw, OpenClaw                      | Image loss after tool calls, caching corruption, streaming failures |

These are not isolated bugs—they reflect **shared architectural challenges** in building scalable, trustworthy AI agents at scale.

---

### **5. Differentiation Analysis**

| Project        | Feature Focus                             | Target Users                         | Technical Architecture               |
|----------------|--------------------------------------------|---------------------------------------|--------------------------------------|
| **OpenClaw**   | Multi-channel integration, rich UI, legacy support | Dev teams, integrators, enterprises | Monolithic core + modular plugins |
| **Hermes Agent** | Secure self-hosted deployments, auditability, CLI control | Enterprises, automation engineers | OAuth-first, Uvicorn-native HTTPS |
| **QwenPaw**    | Team collaboration, Hub multi-tenancy, explicit tooling | Teams, organizations, product builders | Modular skill system, MCP-centric |
| **ZeroClaw**   | Agent-to-agent communication, WASM security, desktop interaction | Research labs, autonomy pioneers | A2A protocol, OCI plugin registry |
| **IronClaw**   | —                                          | —                                     | — (inactive)                         |

> **Key Insight**: While OpenClaw and QwenPaw target **team-scale deployment**, ZeroClaw focuses on **agent autonomy** and **physical world interaction**, whereas Hermes Agent prioritizes **security and compliance**—each carving distinct niches within the broader ecosystem.

---

### **6. Community Momentum & Maturity**  

- **High-Momentum Iterators (Rapid Development):**  
  - **OpenClaw**: Highest activity (467 issues, 500 PRs). Rapid iteration but burdened by regressions.  
  - **ZeroClaw & QwenPaw**: Balanced, focused growth. Both are transitioning into **enterprise-grade platforms** with Hub and A2A capabilities.  
  - **Hermes Agent**: Fast-moving, but with high-risk UX/security gaps slowing trust-building.

- **Stabilizing / Mature Projects:**  
  - **ZeroClaw**: Shows signs of maturation—structured RFCs, dependency hygiene, test improvements.  
  - **QwenPaw**: Evolving from personal assistant to team platform; roadmap clarity increasing.

- **Inactive/Dormant:**  
  - **IronClaw**: No activity in 24 hours—potential signal of stagnation or reorganization.

> **Trend**: The most mature projects are those with **clear roadmaps**, **community-driven governance**, and **strategic focus on security and scalability**—not just feature velocity.

---

### **7. Trend Signals**  
Based on community feedback and technical direction, the following **industry trends** are emerging:

1. **Shift to Multi-Agent Systems**  
   - Demand for **inter-agent communication (A2A)**, **named sub-agent roles**, and **team-based workflows** is rising across QwenPaw, ZeroClaw, and OpenClaw. This signals a move beyond single-agent assistants to **orchestrated agent ecosystems**.

2. **Enterprise-Grade Requirements**  
   - Features like **role-based access**, **model gating**, **usage dashboards**, **cost attribution**, and **audit trails** are no longer optional. These are now top priorities in QwenPaw, Hermes Agent, and OpenClaw.

3. **Security as Core Infrastructure**  
   - Dependency updates (ZeroClaw), credential protection (Hermes Agent), and secure identity (ZeroClaw’s `zerorelay`) indicate that **security is being baked into the stack**, not bolted on.

4. **Self-Hosting & Trust**  
   - Projects emphasizing **self-contained HTTPS**, **unified TLS**, and **transparent logging** (Hermes Agent, ZeroClaw) are gaining traction—driven by privacy concerns and regulatory needs.

5. **UX as a Competitive Lever**  
   - Persistent UI frustrations (e.g., "Stop" button not working, hidden file previews) reveal that **user experience is now a key differentiator**—especially in production environments.

---

### ✅ **Conclusion for Developers & Decision-Makers**  
The personal AI assistant ecosystem is entering a **production-readiness phase**. Projects like **OpenClaw** offer unmatched integration depth but require caution due to stability risks. **ZeroClaw** and **QwenPaw** represent the future of **autonomous, collaborative agents**, while **Hermes Agent** leads in **secure, auditable deployments**. For developers, the clear path forward is to prioritize **session durability, cost control, and security hygiene**—not just feature innovation. The next wave will be defined not by what agents can do, but by **how reliably and safely they do it**.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

---

### **1. Today's Overview**  
As of 2026-09-16, the Hermes Agent project remains highly active with **50 open issues** and **50 open pull requests** updated in the last 24 hours—indicating strong developer engagement and a rapidly evolving feature set. The ecosystem is experiencing significant momentum around **security hardening**, **UX refinements in Desktop**, and **core stability fixes** related to session state, model switching, and context handling. Notably, no new releases were published, suggesting the team is prioritizing internal quality over versioning cycles. Activity spans critical areas including authentication, agent lifecycle management, and cross-platform compatibility.

---

### **2. Releases**  
**None**  
No new releases were published in the last 24 hours or during the week. The most recent release (v0.21.3) remains current, and ongoing work focuses on post-release stabilization rather than feature rollout. Maintainers appear to be holding off on a new version until key security and UX fixes are merged.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ `PR #112455` – *feat(dashboard): support native TLS*  
  Enables Uvicorn to serve HTTPS directly without reverse proxy, crucial for OAuth providers like Notion that reject plain HTTP redirects. A major step toward secure, self-contained deployments.  
  [Link](https://github.com/NousResearch/hermes-agent/pull/112455)

- ✅ `PR #50230` – *feat(sessions): add client-safe custom metadata*  
  Allows external clients and agents to attach labels (e.g., issue IDs, workflow states) without polluting prompts or configurations. Enhances auditability and tool integration.  
  [Link](https://github.com/NousResearch/hermes-agent/pull/50230)

- ✅ `PR #104625` – *fix(email): honor explicit outbound subjects; cron reports start fresh conversations*  
  Prevents scheduled email reports from being threaded into existing user conversations, improving clarity and reducing inbox clutter.  
  [Link](https://github.com/NousResearch/hermes-agent/pull/104625)

These merges reflect progress in **security**, **integration robustness**, and **user experience consistency**—particularly for enterprise and automated workflows.

---

### **4. Community Hot Topics**  
Top community-driven discussions center on **critical UX flaws**, **security gaps**, and **systemic instability**:

- 🔥 **#88584**: Automated Nous integration blocked due to merge conflicts in `cron/jobs.py`. With **104 comments**, this is the most active issue. It highlights **pipeline fragility** in CI/CD automation between core repos (Nouz vs Enterkey), potentially delaying major integrations.  
  [Link](https://github.com/NousResearch/hermes-agent/issues/88584)

- 🔥 **#103483**: Muse Spark abruptly ends mid-task with a single unrelated word (`finish_reason=stop`). Reported by a contributor using OpenAI via opencode-go, this impacts **stream reliability** and user trust in AI output fidelity. **15 comments**, **11 upvotes** — signals high concern among users relying on streaming responses.  
  [Link](https://github.com/NousResearch/hermes-agent/issues/103483)

- 🔥 **#112458 / PR #112463**: Desktop model-switch confirmation offers only "Confirm" and an "✕" — no way to decline safely. This is a **high-risk UX regression** that could lead to accidental expensive model switches. Fixed in a dedicated PR today.  
  [Link to Issue](https://github.com/NousResearch/hermes-agent/issues/112458) | [Fix PR](https://github.com/NousResearch/hermes-agent/pull/112463)

These topics reveal deep community investment in **reliability**, **control**, and **transparency**, especially in production-grade use cases.

---

### **5. Bugs & Stability**  
Critical bugs reported today point to **session integrity**, **resource safety**, and **secret exposure**:

| Severity | Issue ID | Summary | Fix Status |
|--------|---------|--------|-----------|
| ⚠️ P1 | #111761 | Reasoning content is promoted into visible assistant text even when empty — pollutes history permanently | ❌ No fix yet |
| ⚠️ P1 | #103483 | Muse Spark cuts off mid-turn with a random final word after `finish_reason=stop` | ❌ No fix yet |
| ⚠️ P1 | #112382 | WhatsApp bridge uses vulnerable `body-parser@1.20.6` — 3 moderate npm advisories present | ❌ No fix yet |
| ⚠️ P2 | #112358 | MoA aggregator prompt cache stays pinned to system prompt → repeated billing (~$147 in 49 min) | ❌ No fix yet |
| ⚠️ P2 | #112459 | Shutdown forensic logs dump live credentials from child process `argv` | ✅ **Fixed in PR #112460** |
| ⚠️ P2 | #111949 | SSH mode fails on zsh login shells due to `set -m` in non-interactive context | ❌ No fix yet |

The presence of multiple **P1/P2 bugs** affecting **cost**, **security**, and **output correctness** suggests a need for increased testing rigor before future releases.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging patterns suggest next-gen focus areas:

- 🛠 **Self-tuning agent evolution** (`#111237`) — An opt-in local loop that replays failure traces and keeps only statistically credited tweaks. This signals interest in **autonomous agent improvement** and **self-optimization**.
- 📝 **Korean language support** (`#52532`) — A growing demand from non-English users. Indicates expansion beyond Western markets.
- 🧩 **Named sub-agent roles** (`#112369`) — For delegating tasks with clear identity (e.g., "implementer", "reviewer"). Suggests deeper **multi-agent orchestration** needs.
- 🌐 **WebApp renderer in browser** (`#93508`) — Serving the Desktop UI via browser. A strong signal for **remote collaboration** and **platform agnosticism**.

These features align with a roadmap toward **autonomous, multi-agent, globally accessible, and self-improving AI assistants**.

---

### **7. User Feedback Summary**  
Real-world pain points from users include:

- **Cost unpredictability**: Users report massive token discrepancies (e.g., 4M tokens consumed in one session) and unexpected billing spikes due to cached prompt misuse (`#112358`).
- **Loss of control**: Model switches are too aggressive, with no safe decline path (`#112458`), leading to fear of accidental cost spikes.
- **Security anxiety**: CLI commands can bypass system-config protections (`#59293`), raising concerns about insider threats.
- **Frustration with hidden state**: Sessions show “No sessions yet” despite existing data (`#106003`), indicating poor UX feedback.
- **Language barrier**: Korean users struggle with English-only interfaces (`#52532`), highlighting localization as a growth blocker.

Users value **transparency**, **control**, and **predictability**—especially in financial or sensitive workflows.

---

### **8. Backlog Watch**  
High-priority items requiring maintainer attention:

- 🚨 **#88584** – *Automated Nous integration blocked*: Blocking a key integration path. Requires urgent triage and coordination between teams.  
  [Link](https://github.com/NousResearch/hermes-agent/issues/88584)

- 🚨 **#87948** – *Release tags unsigned since v2026.8.13*: Security-conscious operators question authenticity. Needs official clarification: intentional or lost signing key?  
  [Link](https://github.com/NousResearch/hermes-agent/issues/87948)

- 🚨 **#59293** – *CLI bypasses system-config write protection*: A serious security flaw allowing agents to disable approval layers un-gated. High risk of abuse.  
  [Link](https://github.com/NousResearch/hermes-agent/issues/59293)

- 🚨 **#105675** – *83% token consumption discrepancy with Anthropic*: Critical for cost transparency. Requires deep logging analysis.  
  [Link](https://github.com/NousResearch/hermes-agent/issues/105675)

These issues represent **unresolved risks** that could undermine trust, especially in enterprise adoption.

---

> **Final Assessment**: Hermes Agent is a vibrant, fast-moving project with strong community engagement and a clear direction toward autonomous, secure, and user-controlled AI agents. However, **technical debt and security gaps** in core systems (session state, credential handling, cost control) require immediate attention. The next release should prioritize **stability, security hardening, and UX clarity** over new features.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-16**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust development pulse: **50 pull requests** and **28 issues** updated in the past 24 hours, indicating strong community engagement and ongoing engineering momentum. The project is transitioning from a personal AI assistant toward a team-oriented, multi-tenant platform—evident in the growing focus on Hub features, governance, and collaboration. While no new releases have been published, multiple high-priority bug fixes and feature enhancements are actively being reviewed and merged, signaling readiness for an upcoming 2.2.1 or 2.3 release.

---

### **2. Releases**  
*No new releases were published as of 2026-09-16.*  
The latest stable version remains **2.2.1**, with several critical fixes (e.g., subagent spawning, MCP connectivity) pending inclusion. Users are advised to stay on 2.2.1 for stability, particularly if using Hub mode or external tools like Dagu MCP.

---

### **3. Project Progress**  
**Merged/Closed PRs (25):**  
- ✅ **PR #7759**: Restored visible keyboard focus indicators in the UI — improves accessibility.  
- ✅ **PR #7758**: Aligned embedding timeout validation with backend constraints (0–300 sec), now includes real-time feedback.  
- ✅ **PR #7756**: Improved error notification clarity by distinguishing empty success vs. failure states in memory systems.  
- ✅ **PR #7735**: Fixed HTTP error response handling in MCP clients — prevents silent failures when decoding JSON-RPC errors.  
- ✅ **PR #7737 & #7736**: Expanded trigger keywords for multi-agent collaboration skills, enabling earlier detection of team-based requests.  
- ✅ **PR #7636**: Patched PDF block transmission to OpenAI-compatible endpoints, resolving `{"type":"file"}` rejection issues.  

These fixes collectively improve **stability, usability, and tool interoperability**, especially for enterprise users relying on external models and complex workflows.

---

### **4. Community Hot Topics**  
#### 🔥 Most Active Issue:  
**[Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)** – *“QwenPaw Hub, the multi-tenant edition, is coming in 2.2.0: what should we build next?”*  
- **27 comments**, **4 upvotes** — one of the most discussed community-driven threads.  
- Highlights **strong demand for team-centric features**: admin-managed skills (#2324), role-based access, model gating, and usage dashboards.  
- Signals a strategic pivot: QwenPaw is evolving beyond personal use into a collaborative agent platform.

#### 🔥 Most Active PR:  
**[PR #7790](https://github.com/agentscope-ai/QwenPaw/pull/7790)** – *Add unified chat workbench shell*  
- Designed to replace fixed capability tabs with a dynamic, resizable right-side panel.  
- Addresses user frustration with cluttered interfaces and poor workspace organization — especially on smaller screens.  
- Reflects growing emphasis on **user experience (UX) refinement** and **modular workflow design**.

---

### **5. Bugs & Stability**  
| Severity | Issue | Summary | Fix PR? |
|---------|-------|--------|--------|
| ⚠️ Critical | [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | `spawn subAgent` consistently fails with timeouts even after increasing timeout values. | ❌ No fix yet; likely tied to context loading or config parsing. |
| ⚠️ High | [Issue #7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | “Stop” button appears inactive but task continues running — leads to duplicate executions and 409 conflicts. | ❌ Not resolved; impacts reliability during long-running tasks. |
| ⚠️ High | [Issue #7771](https://github.com/agentscope-ai/QwenPaw/issues/7771) | Empty "Compact Chat Session Title" labels appear after context compression or new conversation. | ❌ No fix; affects UI cleanliness and navigation. |
| ⚠️ High | [Issue #7786](https://github.com/agentscope-ai/QwenPaw/issues/7786) | Cloud/NFS deployment freezes entire process for 5–6 minutes when opening file browser. | ❌ No fix; severe performance regression in production environments. |
| ⚠️ Medium | [Issue #7792](https://github.com/agentscope-ai/QwenPaw/issues/7792) | WeChat video/audio attachments become invalid `file://` URLs → rejected by OpenAI API. | ❌ No fix; breaks multimedia workflows. |

> **Note:** Several critical bugs remain unresolved despite active PRs addressing related areas (e.g., #7636, #7796). This suggests deeper architectural challenges in async execution, state management, and I/O handling.

---

### **6. Feature Requests & Roadmap Signals**  
Users are clearly pushing for **team-scale capabilities** and **greater control over agent behavior**:

- **Multi-tenant Hub Features** (Issue #7318):  
  - Model gateway (PR #7779), member governance, usage dashboard — all under active development.
  - Strong demand for **admin-controlled skill visibility** and **channel-specific skill assignment** (Issue #7746).

- **Explicit Tool Invocation** (Issues #7778, #7780, #7777):  
  - Repeated request for `//` syntax to **explicitly call tools/MCPs**, solving ambiguity when multiple similar tools exist.  
  - Suggests current auto-tool selection is unreliable — a key UX pain point.

- **Improved File Handling** (Issue #7744):  
  - Request to **display sent files directly in the assistant reply**, not buried in collapsed tool steps.  
  - Indicates need for **visual clarity in output delivery**.

- **Background Updates** (Issue #7543):  
  - Long-standing desire to move updates from foreground to background — critical for uptime in production deployments.

> 💡 **Prediction**: The next major release (**2.3**) will likely include **Hub multi-tenancy**, **background update support**, **explicit tool invocation**, and **enhanced file preview UX**.

---

### **7. User Feedback Summary**  
Real-world user pain points reveal deep needs beyond basic functionality:

- **Enterprise/Team Use**:  
  - Users want **role-based access**, **model policy enforcement**, and **centralized monitoring** — driving Hub adoption.
  - Many report **deployment instability** (Docker, NFS) and **long freezes** during file operations — urgent for cloud hosting.

- **Reliability & Trust**:  
  - "Stop" button not working reliably causes confusion and data corruption risks.
  - Timeout issues persist even with extended settings — erodes trust in automation.

- **UX Friction**:  
  - History on the left side is hard to navigate on small screens (Issue #7739, #7700).
  - Files sent via `send_file_to_user` are hidden — users miss them entirely unless they manually expand tool logs.

- **Integration Gaps**:  
  - Model switching, fault tolerance, and channel parameter passing (e.g., QQ number) are still unclear or missing (Issues #7749, #7650).

---

### **8. Backlog Watch**  
These high-impact, long-standing issues require maintainer attention:

- **[Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)** – *Community-driven roadmap for QwenPaw Hub*  
  - 27 comments, 4 upvotes — **the single most important strategic issue**. Must be addressed before 2.3 launch.

- **[Issue #7772](https://github.com/agentscope-ai/QwenPaw/issues/7772)** – *Cannot connect to newapi proxy model*  
  - Reported by multiple users; no resolution despite v1.0.0-rc.26 support. Likely blocking early adopters.

- **[Issue #7749](https://github.com/agentscope-ai/QwenPaw/issues/7749)** – *Model fault tolerance configuration missing*  
  - Users upgraded to 2.2.1 but can’t find the setting — indicates documentation or UI gap.

- **[Issue #7767](https://github.com/agentscope-ai/QwenPaw/issues/7767)** – *Guardrail plugin issues: stale blobs, misfires, dropped events*  
  - Reports from production-like setups — **critical for security and audit integrity**.

> 📌 **Action Required**: Maintainers should prioritize triaging these issues and aligning community feedback with roadmap planning.

---

### ✅ Final Assessment  
QwenPaw is in a **high-growth, high-engagement phase** with clear direction toward a **multi-user, enterprise-ready agent platform**. While core stability issues remain (especially around subagents, file I/O, and UI responsiveness), the project demonstrates **strong technical momentum** and **deep user alignment**. With 25 PRs merged today and 28 active issues, the project is healthy — but must address **critical bugs and UX gaps** to maintain trust during its pivotal transition.  

**Next milestone**: A 2.3 release focused on **Hub capabilities**, **tool clarity**, and **system reliability**.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-09-16**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active with **50 new issues and 50 new pull requests** updated in the past 24 hours, indicating sustained momentum in development and community engagement. Activity is concentrated around core runtime stability, security hardening, and multi-agent architecture enhancements. Notably, no new releases were published, suggesting a focus on internal refinement ahead of a potential upcoming version. The high volume of **P1/P2 severity issues (especially in `provider:anthropic`, `runtime:wasm`, and `security`)** signals ongoing efforts to stabilize production-grade AI agent interactions and plugin trust boundaries.

---

### **2. Releases**  
❌ No new releases published as of 2026-09-16.  
*Note:* The last release was not specified in the data, but the absence of a new release suggests that recent PRs are still undergoing review or integration testing prior to a formal update.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- **PR #10872** (`chore(deps): bump hmac from 0.12.1 to 0.13.0`) – Security dependency update, mitigating known vulnerabilities via upstream patch.  
- **PR #10870** (`chore(deps): bump github/codeql-action/upload-sarif from 3.36.2 to 4.38.0`) – Enhances CI/CD security scanning capabilities with improved analysis engine.  
- **PR #10840** (`feat(docs): generate llms.txt and llms-full.txt in the mdBook build`) – Improves documentation tooling for LLM discovery and indexing.  
- **PR #10125** (`test(config): isolate process-environment fixtures`) – Removes unsafe environment mutations in tests, improving test reliability.  
- **PR #9324** (`feat(a2a): outbound client config, shared wire-model, tools`) – Finalized Phase 1 of A2A outbound client RFC (#9106), enabling inter-agent calls via standardized protocol.  

These merges reflect progress in **dependency hygiene**, **test robustness**, **documentation automation**, and **inter-agent communication foundation**.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement:**  
- **#6909 [RFC]: Computer-use support for desktop screen interaction and input control** – *16 comments*  
  → High-risk, high-impact vision into human-machine interface; critical for future agent autonomy. Signals growing interest in **physical world interaction** beyond chat.  
  🔗 [Issue #6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)

- **#9965 [Bug]: Harden runtime-written executable test fixtures under parallel runtime gate** – *12 comments*  
  → Focuses on **test safety in concurrent environments**, revealing concerns about race conditions in test execution.  
  🔗 [Issue #9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)

- **#9106 [RFC]: A2A outbound client (A2ATool)** – *11 comments*  
  → Follow-up to #3566; enables proactive agent-to-agent collaboration. Key enabler for **multi-agent systems**.  
  🔗 [Issue #9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)

🔥 **Top PRs by Engagement:**  
- **PR #10407** (`feat(sessions): add persistent session prompt attachments`) – *XL size, high risk*  
  → Addresses long-standing need for **persistent context retention** across sessions, enhancing user workflow continuity.  
  🔗 [PR #10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)

- **PR #10525** (`feat(zerorelay): relay-terminated browser enrollment frontdoor (phase 1)`) – *XL size, high risk*  
  → Reintroduces secure browser enrollment with transparency; critical for **decentralized identity and access control**.  
  🔗 [PR #10525](https://github.com/zeroclaw-labs/zeroclaw/pull/10525)

> **Analysis**: Community demand centers on **agent autonomy**, **secure identity management**, **context persistence**, and **test reliability**—all foundational for enterprise-grade AI agents.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs Reported (Severity S1/S2):**  
- **#10885 [Bug]: Tool-returned images disappear after unrelated tool call within same turn** – *S2, `provider:anthropic`*  
  → Breaks image continuity in conversations; impacts UX for multimodal workflows.  
  🔗 [Issue #10885](https://github.com/zeroclaw-labs/zeroclaw/issues/10885)  
  ✅ **Fix PR exists**: #10886 (pending review)

- **#10889 [Bug]: Native Anthropic provider drops rolling cache breakpoint when last message ends with an image** – *S2*  
  → Undermines caching efficiency for image-heavy queries.  
  🔗 [Issue #10889](https://github.com/zeroclaw-labs/zeroclaw/issues/10889)  
  ✅ **Fix PR exists**: #10895 (merged today)

- **#10888 [Bug]: Stale tool-result image strip rewrites message on second request, invalidating cache prefix** – *S2*  
  → Corrupts state during replay; breaks deterministic behavior.  
  🔗 [Issue #10888](https://github.com/zeroclaw-labs/zeroclaw/issues/10888)

- **#10659 [Bug]: Budget-exceeded Code turn loses visible progress after session restore** – *S1, `zerocode/tui`*  
  → Blocks user workflow post-cost limit; severe usability issue.  
  🔗 [Issue #10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)

> **Summary**: Multimodal handling (images, caching, streaming) is a key instability surface. Fix PRs exist for most, indicating rapid response.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Features (High Priority):**  
- **#6909 [RFC]: Desktop screen interaction and input control** – *P2, Risk: High*  
  → Strong signal for **physical-world agent actions** (e.g., automating GUI tasks). Likely to be prioritized in v0.9+.  
  🔗 [Issue #6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)

- **#9346 [RFC]: Unified package/capability/config/runtime-state catalog contract** – *P2, Risk: High*  
  → Indicates roadmap shift toward **standardized plugin lifecycle and discovery**, possibly using OCI registries.  
  🔗 [Issue #9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)

- **#7497 [RFC]: OCI-compliant registries for plugin storage and discovery** – *P3, Risk: High*  
  → Direct path to **containerized, verifiable WASM plugins**; aligns with broader ecosystem trends.  
  🔗 [Issue #7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497)

- **#10166 [Feature]: Default stream_mode to partial** – *P2, Medium Risk*  
  → User experience improvement; likely to ship soon.  
  🔗 [Issue #10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166)

> **Prediction**: Next major release (likely v0.9) will include **A2A outbound clients**, **OCI plugin registry**, and **default streaming**.

---

### **7. User Feedback Summary**  
🗣️ **Real User Pain Points (from Issues & PRs):**  
- **Image handling inconsistencies** (e.g., disappearing images, broken cache) — users expect reliable multimodal output.  
- **Loss of progress during cost-limit events** — frustrates long-running tasks in ZeroCode.  
- **Inconsistent session persistence** — desire for “remember me” across restarts.  
- **Need for explicit control over agent memory sharing** — users want fine-grained privacy (see #8983).  
- **Lack of visual feedback in subagent/tool execution** — users want deeper insight into complex agent workflows (see #8763).

> **Sentiment**: High engagement, strong desire for **reliability, visibility, and control**—indicative of mature user base moving beyond experimentation to production use.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered Critical Items Needing Attention:**  
- **#5869 [Bug]: rumqttc v0.25.1 pins outdated rustls-webpki** – *P1, Risk: High*  
  → Still blocked despite being flagged since April 2026. Requires urgent dependency upgrade.  
  🔗 [Issue #5869](https://github.com/zeroclaw-labs/zeroclaw/issues/5869)

- **#9802 [RFC]: Complete emergency-stop enforcement for in-flight and network operations** – *P1, Risk: High*  
  → Critical for safety in long-running agent tasks. Accepted but not yet implemented.  
  🔗 [Issue #9802](https://github.com/zeroclaw-labs/zeroclaw/issues/9802)

- **#8691 [Tracker]: ADR inventory and accepted RFC decision records** – *P2, Low risk but high impact*  
  → Maintainer-facing backlog item; essential for architectural traceability.  
  🔗 [Issue #8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691)

> **Recommendation**: Prioritize **dependency security fixes** and **emergency-stop enforcement** to reduce systemic risk.

---

**✅ Project Health Status**: **Strong** – High activity, focused on security, stability, and scalability.  
**🔧 Risks**: Dependency debt (RUSTSEC), image handling fragility, and delayed RFC implementation.  
**📅 Outlook**: Preparing for next major version with enhanced agent autonomy, plugin standardization, and UI maturity.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*