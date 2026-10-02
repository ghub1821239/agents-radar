# OpenClaw Ecosystem Digest 2026-10-02

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-02 01:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest**  
**Date:** 2026-10-02  
**Repository:** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development and user-driven troubleshooting. The ecosystem is under significant stress due to a surge in high-severity bugs—particularly around **Windows-specific crashes, SQLite corruption, memory leaks, and session state instability**. A new release, **v2026.8.34**, was issued as a critical `extended-stable` update, reflecting ongoing stabilization efforts. Despite this, several P0 and P1 issues suggest deep architectural challenges in session management, database handling, and cross-platform compatibility, especially on Windows.

---

### **2. Releases**  
🔹 **New Release: `v2026.8.34` (gateway-only, extended-stable)**  
- **Status:** Critical security and stability update, equivalent to LTS.  
- **Scope:** Based on end-of-August 2026 codebase with **critical fixes** for:
  - SQLite WAL growth (Issue #143524)
  - Memory leaks in `prepared-model-catalog.worker.js` (Issue #159662)
  - Session startup failures on slower hosts (Issue #158239)
  - Windows cron environment cloning errors (Issue #157067)
- **Migration Note:** This release is recommended for all production environments. No breaking changes reported, but users on `2026.9.x` should upgrade immediately due to unresolved regressions in that series.  
🔗 [Release Notes](https://github.com/openclaw/openclaw/releases/tag/v2026.8.34)

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- **#163032** – Fixes delegation tools being lost after model retries (P1).  
- **#163155** – Stabilizes paired-node reconnect retain baseline in tests.  
- **#161012** – Stops duplicate requester profile hints from appearing in chat UI.  
- **#161759** – Settles remote turn ownership before cleanup (P1).  
- **#161440** – Preserves source host provenance in managed worktree sessions.  

🔧 **Key Advances:**  
- **Session integrity** improvements (ownership, delivery, recovery) are being prioritized.  
- **Testing infrastructure** is being hardened (e.g., E2E reliability in paired-node lifecycle).  
- **Code hygiene** continues with refactors like `deslop browser vocabulary` (#163161) and retirement of legacy migration paths (#163160).

---

### **4. Community Hot Topics**  
🔥 **Top 5 Most Active Issues (by comment count):**

| Issue | Comments | Severity | Key Concern |
|------|---------|----------|-----------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 103 | 🦐 P0 (Crash Loop) | SQLite WAL grows to 2.8 GB on Windows; blocks gateway startup |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 40 | 🦪 P0 (UX Release Blocker) | v2026.9.5 caused 8-hour failure recovery in stable env |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 23 | 🦐 P0 (Crash Loop) | Gateway reaches "ready" but never serves; event loop starved |
| [#157067](https://github.com/openclaw/openclaw/issues/157067) | 21 | 🦞 P1 (Security/Behavior) | Windows cron passes uncloneable Proxy → worker crash |
| [#139710](https://github.com/openclaw/openclaw/issues/139710) | 18 | 🦞 P1 (UX Friction) | Plugin hot reload kills system-agent turn + planner fallback |

💡 **Underlying Needs:**  
- **Stability under load** (especially on Windows and low-resource systems).  
- **Predictable session lifecycle** — no silent message loss or state corruption.  
- **Robust error handling** for async workflows and tool execution.  
- **Better diagnostics** for hard-to-reproduce crashes (e.g., `DataCloneError`, `unhandled rejection`).

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs Reported (P0/P1, High Impact):**

| Issue | Summary | Fix PR? | Platform | Risk |
|------|--------|--------|--------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL grows uncontrollably on Windows | ❌ | Windows | Crash-loop, disk exhaustion |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | `prepared-model-catalog.worker.js` leaks ~5 GB/h | ❌ | All | Memory starvation, crashes |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway ready but unresponsive; event loop starved | ❌ | Linux/Windows | UX blocker, memory leak |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) | Gateway crash: `Worker environment inventory has closed` | ❌ | Linux | Unhandled rejection, data loss |
| [#161654](https://github.com/openclaw/openclaw/issues/161654) | Windows `DataCloneError` in cron jobs | ✅ *(Partial fix)* | Windows | Regression, job failure |
| [#161828](https://github.com/openclaw/openclaw/issues/161828) | `chat.send` / heartbeat turns fail post-fix | ❌ | Windows | Ongoing failure despite patch |

⚠️ **Regression Trends:**  
- Multiple regressions in **2026.9.x** series (e.g., #155859, #160386, #161953).  
- **Windows-specific issues dominate** (WAL, Proxy cloning, path handling).  
- **Memory and I/O pressure** are recurring themes across multiple components.

---

### **6. Feature Requests & Roadmap Signals**  
📌 **High-Interest User-Requested Features:**

| Request | Link | Priority | Signal |
|-------|------|--------|--------|
| Add denylist support for `exec-approvals` | [#6615](https://github.com/openclaw/openclaw/issues/6615) | P2 | Security-focused, balanced access control |
| Audit log for agent memory changes | [#20935](https://github.com/openclaw/openclaw/issues/20935) | P1 | Compliance, debugging, tamper detection |
| Short-term recall retention evicts entries nightly | [#150635](https://github.com/openclaw/openclaw/issues/150635) | P2 | Dreaming system optimization |
| Stop inbound mentions cascading into replies | [#121932](https://github.com/openclaw/openclaw/pull/121932) | P1 | UX improvement for Feishu/Telegram |
| CLI-budget compaction timeout fires too early | [#115546](https://github.com/openclaw/openclaw/issues/115546) | P1 | Large-session performance |

🔮 **Predicted Next Version Focus:**  
- **Stability over features**: v2026.10.0 likely to be a *patch-release* focused on fixing the top 5 P0 bugs.  
- **Security hardening** via denylists and audit trails will gain traction.  
- **Windows platform parity** is becoming a core roadmap goal.

---

### **7. User Feedback Summary**  
💬 **Real User Pain Points (from issue descriptions):**

> “I genuinely regret upgrading to OpenClaw 2026.9.5. Before this update, my environment was stable. After installing 9.5, it took me 8 hours to recover.”  
– @abuegab1-spec, Issue #153257

> “After a manual offline `wal_checkpoint(TRUNCATE)`, the WAL grew back to 2.8 GB within days.”  
– @desksk, Issue #143524

> “Agent created jobs fail closed in ~20ms with 'Scheduled account unavailable' even though it’s configured.”  
– @syuanzhuo, Issue #156895

> “Messages appear duplicated 3–4 times in the chat UI.”  
– @li-y-w, Issue #142549

🧠 **User Sentiment:**  
- **Frustration** with regressions in recent releases (esp. 2026.9.x).  
- **Trust erosion** due to silent data loss, message duplication, and unrecoverable crashes.  
- **Demand for transparency**: users want clearer release notes, changelogs, and rollback paths.

---

### **8. Backlog Watch**  
⏳ **Long-Pending, High-Impact Issues Needing Maintainer Attention:**

| Issue | Status | Age | Why It Matters |
|------|--------|-----|----------------|
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | OPEN | 3 months | `memory_index_chunks` and `memory_embedding_cache` tables have no retention policy → disk fill |
| [#114211](https://github.com/openclaw/openclaw/issues/114211) | OPEN | 3 months | Matrix agents loop on no-reply → stale replay, session corruption |
| [#65374](https://github.com/openclaw/openclaw/issues/65374) | OPEN | 8 months | Built-in dreaming contaminates multi-agent identity → privacy/security risk |
| [#85030](https://github.com/openclaw/openclaw/issues/85030) | CLOSED | 4 months | MCP tools ignored in subagent sessions → broken automation |
| [#114414](https://github.com/openclaw/openclaw/issues/114414) | OPEN | 3 months | Dated TODO sweep — technical debt accumulation |

🔍 **Action Needed:**  
- Prioritize **data retention policies** and **session state consistency**.  
- Re-evaluate **multi-agent isolation** and **dreaming system boundaries**.  
- Resolve **long-standing security/behavior bugs** to rebuild trust.

---

### ✅ **Final Assessment**  
OpenClaw is a **highly active, rapidly evolving AI agent platform**, but current health is **fragile** due to widespread stability issues—especially on Windows and large-scale deployments. While the community drives urgent fixes, **core architecture gaps** in memory, session, and database management remain. The next few releases must prioritize **stability, diagnostics, and backward compatibility** over feature velocity. Without decisive action on top P0 bugs, user confidence will continue to erode.

📌 **Recommendation:** Treat v2026.10.0 as a **stability sprint**. Address the top 5 P0 issues first, then implement audit logs and retention policies. Engage users with transparent status updates and rollback mechanisms.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-10-02**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem in Q4 2026 is characterized by **rapid iteration, architectural divergence, and growing maturity in security and stability**. Projects are increasingly focused on **cross-platform reliability**, **session integrity**, and **user trust**, driven by real-world deployment pain points. While innovation remains strong—especially in multi-agent orchestration and identity management—several core projects face significant regression risks, indicating a critical phase of stabilization before broader adoption. The landscape reflects a shift from feature velocity to **infrastructure resilience**, with Windows-specific issues and memory/disk management emerging as systemic challenges.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Release Status | Health Score (1–5) |
|--------|------------------|----------------|----------------|--------------------|
| **OpenClaw** | 500 | 500 | `v2026.8.34` (critical patch) | ⚠️ **2.0** |
| **Hermes Agent** | 50 | 50 | No new release (v0.21.5 stable) | ✅ **4.2** |
| **IronClaw** | 2 | 2 | No new release | ⚠️ **3.0** |
| **QwenPaw** | 7 | 9 | No new release; beta regression | ⚠️ **2.5** |
| **ZeroClaw** | 38 | 50 | No new release; v0.8.6 in flux | ⚠️ **2.8** |

> 🔍 *Health Score Key*: 5 = Stable & Healthy | 4 = Active & Improving | 3 = Stable but Stagnant | 2 = High Risk / Unstable | 1 = Critical Failures

---

### **3. OpenClaw's Position**  
OpenClaw stands as the **most active and highest-velocity project** in the ecosystem, with unmatched issue/PR volume and a visible crisis response pattern. Its technical approach centers on **high-throughput session orchestration**, **deep database integration (SQLite/WAL)**, and **Windows-first compatibility**, setting it apart from peers. However, this comes at the cost of **increasing instability**, particularly in memory and I/O handling—evidenced by 12+ P0/P1 bugs related to crashes and data corruption. Compared to Hermes Agent’s steady progress or ZeroClaw’s security-focused architecture, OpenClaw’s community is larger but more fragmented due to frequent regressions. It is currently **leading in scale and visibility**, but its reputation hinges on whether it can stabilize before user attrition sets in.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, recurring themes indicate **emerging industry-wide requirements**:

- **Session Persistence & State Integrity**  
  → *OpenClaw (#143524, #149538), IronClaw (#2358), QwenPaw (#8076)*  
  Users demand reliable state across restarts, reboots, and reloads—especially for authenticated workflows.

- **Security Hardening & Access Control**  
  → *ZeroClaw (#11411, #11410), Hermes Agent (#131074), OpenClaw (#153257)*  
  Critical focus on audit trails, private ownership, sandbox isolation, and secure config handling.

- **Cross-Platform Reliability (Especially Windows)**  
  → *OpenClaw (#157067, #143524), QwenPaw (#8073), ZeroClaw (#11369)*  
  Persistent issues around path handling, proxy cloning, Docker startup, and file system access signal a major gap in platform parity.

- **Robust Error Handling & Diagnostics**  
  → *All projects*, especially OpenClaw (#161828) and ZeroClaw (#11332)  
  Silent failures, unhandled rejections, and missing logs are common complaints, pointing to a need for better observability.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Primary Focus** | High-scale agent orchestration, session resilience | Cross-gateway collaboration, desktop UX | Identity-first, processless agents | Multi-provider support, HITL safety | Security-by-design, capability composition |
| **Target User** | Enterprise teams, developers needing production-grade agents | Individual power users, hybrid remote workers | Privacy-conscious users, decentralized identity advocates | Multilingual teams, HITL workflows | DevOps engineers, security-sensitive deployments |
| **Architecture** | SQLite-heavy, gateway-centric, Windows-tuned | Lightweight, TTS-optimized, UI-driven | Host-mediated identity, knowledge graph-based | Plugin-extensible, model-agnostic | SOP-enforced, capability-composed |
| **Key Differentiator** | Scale + urgency | UX polish + cross-gateway sync | Zero-install identity | Human-in-the-loop control | Runtime isolation + auditability |

> 📌 *Notable divergence*: While OpenClaw and QwenPaw prioritize **multi-provider flexibility**, ZeroClaw and IronClaw emphasize **security and identity boundaries**—reflecting two distinct philosophical paths: *functionality-first* vs *trust-first*.

---

### **6. Community Momentum & Maturity**

| Tier | Project(s) | Characteristics |
|------|------------|-----------------|
| **Rapid Iteration** | OpenClaw, ZeroClaw | Extremely high PR/issue volume; rapid bug reporting; urgent fixes; unstable releases |
| **Stabilizing & Growing** | Hermes Agent, QwenPaw | Consistent PR activity; clear roadmap signals; user feedback driving features |
| **Stable but Stagnant** | IronClaw | Low engagement; foundational work only; slow triage; no pressure to release |

> 💡 *Maturity Signal*: OpenClaw and ZeroClaw are in **crisis mode**—driven by high activity but fragile health. Hermes Agent and QwenPaw show signs of **maturing ecosystems** with growing contributor base and user-driven innovation. IronClaw remains **in maintenance mode**, awaiting strategic direction.

---

### **7. Trend Signals**  
Based on community feedback and development patterns, key industry trends emerge:

1. **Human-in-the-Loop (HITL) is becoming mandatory**  
   → *QwenPaw (#6274), OpenClaw (#153257)*  
   Developers demand structured user input tools and fallback mechanisms—indicating a shift toward **responsible, auditable agent behavior**.

2. **Identity & Authentication Must Be Zero-Install**  
   → *IronClaw (#7499), ZeroClaw (#8076)*  
   Users reject complex setup flows; demand browser-native, extension-free authentication.

3. **Persistent State Is Non-Negotiable for Real-World Use**  
   → *IronClaw (#2358), QwenPaw (#8076), OpenClaw (#143524)*  
   Repeated login cycles and session loss are top usability blockers—**state persistence is now a baseline requirement**.

4. **Security Audits & Transparency Are Expected**  
   → *Hermes Agent (#131074), ZeroClaw (#11411)*  
   Users demand permission logs, rollback paths, and configuration safeguards—signaling **enterprise readiness expectations**.

5. **Multi-Agent Orchestration Is the Next Frontier**  
   → *Hermes Agent (#97681), QwenPaw (#7569)*  
   Teams want bots to collaborate across gateways—indicating a move beyond single-agent use cases.

---

### ✅ **Conclusion for Decision-Makers**  
The personal AI agent ecosystem is entering a **stability phase** where infrastructure quality determines adoption. OpenClaw leads in scale but risks burnout due to instability. Hermes Agent and QwenPaw represent **balanced, user-centric evolution**. IronClaw and ZeroClaw offer niche advantages in identity and security but require faster momentum. For developers, the clear takeaway: **prioritize platforms with robust session persistence, auditability, and Windows parity**—and avoid deploying any agent without verifying rollback capabilities and error diagnostics. The future belongs not to the most feature-rich, but to the most **reliable, transparent, and trustworthy**.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-10-02**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 open pull requests reported in the last 24 hours—indicating strong community engagement and ongoing development momentum. Despite no new releases, significant progress is evident in critical areas: session stability, cross-gateway collaboration, security hardening, and desktop performance. The volume of high-severity bugs (P1/P2) and PRs focused on message delivery, sandbox integrity, and compatibility suggests a stabilization phase ahead of a potential release cycle. Activity is particularly concentrated around Windows/Linux desktop UX, gateway restart logic, and plugin security.

---

### **2. Releases**  
❌ **No new releases** were published in the past 24 hours.  
*Note: The latest stable version remains v0.21.5 (2026-09-24). No breaking changes or migration notes are currently pending.*

---

### **3. Project Progress**  
**Merged / Closed PRs (Today):**  
None — all 50 PRs are still open. However, several high-impact fixes were proposed and are in review:

- ✅ **PR #131078**: MCP client now passes official conformance suite; three defects fixed via port of `pi a4715ec9b`. This is a major step toward protocol interoperability.
- ✅ **PR #131071**: Fixes #130987 by skipping restart-safe cron runs during gateway restart waits — prevents 30-minute lockups.
- ✅ **PR #131067**: Resolves Linux second-instance crash loop (#131055) by fixing poisoned sandbox fallback markers.
- ✅ **PR #131073 & #131077**: Improve TTS fallback clarity and eliminate false duplicate-send warnings — enhances user feedback reliability.
- ✅ **PR #131074 & #131079**: Security tightening: restricts backup file permissions to `0600` and improves stale session pruning documentation.

These PRs collectively advance **stability**, **security**, and **user experience** for core workflows.

---

### **4. Community Hot Topics**  
Top 5 most discussed issues/PRs reflect deep concerns about **core functionality reliability** and **cross-platform consistency**:

| Issue/PR | Comments | Severity | Focus Area | Link |
|--------|---------|----------|------------|------|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 30 | P3 (Feature) | Cross-gateway bot collaboration | [View Issue](https://github.com/NousResearch/hermes-agent/issues/97681) |
| [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) | 26 | P2 (Performance) | Desktop idle resource burn (CPU/GPU/memory) | [View Issue](https://github.com/NousResearch/hermes-agent/issues/127647) |
| [#127665](https://github.com/NousResearch/hermes-agent/issues/127665) | 21 | P2 (Bug) | Desktop renders reply twice due to state mismatch | [View Issue](https://github.com/NousResearch/hermes-agent/issues/127665) |
| [#131071](https://github.com/NousResearch/hermes-agent/pull/131071) | N/A (PR) | P1 (Bug Fix) | Cron restart wait blocking | [View PR](https://github.com/NousResearch/hermes-agent/pull/131071) |
| [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) | 2 | P2 (Bug) | Linux second-instance poisons sandbox → SIGILL loop | [View Issue](https://github.com/NousResearch/hermes-agent/issues/131055) |

🔍 **Underlying Needs:**  
Users demand **predictable UI behavior**, **efficient resource usage**, and **resilience across restarts and multi-instance launches**. The recurring theme is *state consistency*—especially between backend and frontend—highlighting a need for more robust synchronization mechanisms.

---

### **5. Bugs & Stability**  
Critical stability issues dominate today’s activity. Ranked by severity and impact:

| Issue | Severity | Description | Fix PR? |
|------|----------|-------------|--------|
| [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) | P2 | Linux second-instance launch causes persistent `--no-sandbox` poison → SIGILL loop | ✅ **PR #131067** (in review) |
| [#131033](https://github.com/NousResearch/hermes-agent/issues/131033) | P2 | Bedrock agent-loop skips redacted reasoning recovery → GPT→Claude fallback fails | ✅ **PR #131078** (already merged) |
| [#130987](https://github.com/NousResearch/hermes-agent/issues/130987) | P1 | Gateway restart wait blocks even for healthy cron runs (up to 30 min) | ✅ **PR #131071** (in review) |
| [#127665](https://github.com/NousResearch/hermes-agent/issues/127665) | P2 | Desktop UI renders one reply twice despite correct DB state | ❌ No fix yet |
| [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) | P2 | Desktop consumes excessive CPU/GPU/memory when idle | ❌ No fix yet |

⚠️ **Stability Risk:** Multiple P1/P2 bugs affect **desktop startup**, **session rendering**, and **gateway restarts**, indicating potential regression risks if not addressed before next release.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven innovation is emerging in three key directions:

- **Cross-Gateway Collaboration** ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681)): A growing demand for bots to collaborate across gateways, especially as users deploy multiple agents (e.g., for team workflows). This signals a shift toward **multi-agent orchestration**.
- **Agent Naming in Tabs** ([#131072](https://github.com/NousResearch/hermes-agent/pull/131072)): Simple but impactful UX improvement — users want better session identification in tabbed interfaces.
- **New Decision-Making Models** ([#129686](https://github.com/NousResearch/hermes-agent/issues/129686)): Interest in models like Jev, Tev1, Nimble — hints at expanding **agent tooling diversity** beyond OpenAI/Bedrock.
- **Voice Mode Guidance** ([#74094](https://github.com/NousResearch/hermes-agent/issues/74094)): Users want conversational tone adjustments for TTS — suggesting a focus on **natural, listener-friendly AI communication**.

📌 **Prediction:** The next release (likely v0.22.x) will likely include **session tab enhancements**, **improved TTS fallback UX**, and **initial support for cross-gateway coordination**.

---

### **7. User Feedback Summary**  
Real-world pain points reflect **frustration with instability and unpredictability**:

- **Windows Users**: Report frequent "Access denied" errors during local install recovery ([#124679](https://github.com/NousResearch/hermes-agent/issues/124679)) and update failures due to `ETIMEDOUT` on macOS ([#124972](https://github.com/NousResearch/hermes-agent/issues/124972)).
- **Desktop UX**: Users report **invisible UI glitches** (e.g., double-rendered messages), **menu hijacking** ([#127313](https://github.com/NousResearch/hermes-agent/issues/127313)), and **unresponsive chat after long sessions**.
- **Security & Privacy**: Strong demand for tighter backup permissions (`0600`) and safer environment variable handling — users are concerned about credential exposure.
- **Satisfaction**: Positive sentiment around **plugin security updates** and **conformance testing improvements**, indicating trust in maintainers’ rigor.

---

### **8. Backlog Watch**  
Critical issues that have remained open for weeks/months and require urgent maintainer attention:

| Issue | Age | Status | Why It Matters |
|------|-----|--------|----------------|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 2 months | Open, P3 | Blocking future multi-agent collaboration — foundational for team workflows |
| [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) | 2 weeks | Open, P2 | High resource usage degrades UX on low-end devices |
| [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) | 4 weeks | Open, P1 | Cron worker crashes due to missing `ruamel` — breaks scheduled tasks |
| [#129426](https://github.com/NousResearch/hermes-agent/issues/129426) | 2 days | Open, P3 | npm audit vulnerabilities in dependencies — security risk |
| [#13603](https://github.com/NousResearch/hermes-agent/issues/13603) | 6 months | Open, P3 | Missing rollback capability — critical for update resilience |

🔧 **Recommendation:** Prioritize **#122529 (cron bug)** and **#13603 (rollback)** — both are production-critical and affect system reliability. Addressing them would significantly reduce user frustration during maintenance.

--- 

✅ **Project Health Assessment:** **Active & Healthy** — high velocity in issue/PR creation, strong security focus, and clear roadmap signals. However, **bug triage backlog** and **desktop stability** remain key risks. With current momentum, a **stable v0.22 release** could emerge by late Q4 2026.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-10-02**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable but actively evolving state as of October 2, 2026. There are no new releases, indicating that the current version is being used in production and development pipelines without urgent updates. Activity is modest: two open issues and two open pull requests were updated within the last 24 hours, with minimal community engagement (no reactions or comments). The focus appears to be on foundational improvements—particularly around persistent browser session management and internal codebase knowledge graph maintenance—suggesting an emphasis on long-term reliability and developer experience over immediate feature delivery.

---

### **2. Releases**  
*No new releases detected.*  
The latest release remains unchanged from prior versions. No breaking changes, migration notes, or security patches were issued in the past 24 hours. Users should continue operating under the assumption that the current release train is stable and production-ready.

---

### **3. Project Progress**  
Two pull requests are currently open and active, both contributing to core infrastructure and developer tooling:

- **PR #7988** (*chore(agents): refresh codebase knowledge graph*) — This automated update, triggered by the nightly `Codebase Graph Refresh` workflow, ensures that IronClaw’s internal codebase memory snapshot remains aligned with the default branch. While not a functional change, this improves AI agent reasoning accuracy by reducing outdated or stale code references. It is marked as CI/Infrastructure and requires review for merge.

- **PR #7499** (*feat(identyclaw): host-mediated Passport for practitioners*) — A significant step toward enabling processless agents to authenticate via IdentyClaw Passport without requiring user-installed extensions or shell access. This introduces a lightweight host seam (`builtin.idcp`) and includes a practitioner host kit with Node CLI and optional loopback helper on port `:3921`. The PR is labeled as *new contributor*, suggesting growing ecosystem participation.

Neither PR has been merged or closed today, but both represent meaningful progress in identity integration and internal system hygiene.

---

### **4. Community Hot Topics**  
The most active issue today is **Issue #8121** ([Daily ironclaw failure taxonomy — 2026-10-01](https://github.com/nearai/ironclaw/issues/8121)), authored by pranavraja99 and created just minutes ago. It reports a recurring benchmark failure in the `clawbench` suite (128 non-passing tests), traced to a “benchmark-side broken-workspace-seeding defect.” This indicates a systemic issue in test reproducibility and environment setup, which may affect confidence in performance benchmarks.

Meanwhile, **Issue #2358** ([feat(browser): add BrowserProfileStore trait with encrypted tarball persistence](https://github.com/nearai/ironclaw/issues/2358)) stands out as a high-potential enhancement request. Though only one comment exists, it addresses a critical UX pain point: preserving browser state (cookies, localStorage, IndexedDB) across agent runs. Without this, users must re-authenticate every time—an unacceptable friction for practical AI agent workflows. This is likely a top-tier priority for usability and adoption.

---

### **5. Bugs & Stability**  
- **Critical**: Issue #8121 highlights a recurring regression in `clawbench`, affecting 128 test cases due to flawed workspace seeding. This undermines trust in benchmark results and could delay validation of future features. No fix PR exists yet.
- **Medium**: No crash logs or runtime failures reported today. However, the reliance on unstable test environments suggests underlying infrastructural fragility in the CI/CD pipeline.

No pull requests directly address these bugs. The absence of closed PRs or resolved issues indicates that stability concerns are being monitored but not yet acted upon.

---

### **6. Feature Requests & Roadmap Signals**  
- **Browser Persistence (Issue #2358)**: The need to persist browser profiles securely across agent executions is a clear roadmap signal. This feature would enable true session continuity, especially for authenticated workflows (e.g., email clients, CRM tools). Given its alignment with user retention and reduced friction, this is highly likely to be prioritized in Q4 2026 or early 2027.
- **Host-Mediated Identity (PR #7499)**: The proposal to enable extension-free authentication via `identyclaw` signals a strategic push toward decentralized identity and zero-install agent deployment. If merged, this could become a cornerstone of IronClaw’s enterprise and privacy-focused use cases.

These two items represent the most compelling forward-looking directions for the project.

---

### **7. User Feedback Summary**  
User feedback is indirect but revealing:
- The repeated failure in `clawbench` (Issue #8121) reflects frustration with inconsistent test outcomes, possibly impacting developers’ ability to validate their own work.
- The lack of browser state persistence (Issue #2358) is a known pain point that directly affects usability—users want agents to remember logins, avoid repetitive auth steps, and maintain context across sessions.
- No direct complaints about crashes or instability were logged, suggesting general reliability, but the benchmark issue hints at deeper systemic weaknesses in reproducibility.

Overall, users value persistence, reliability, and seamless identity integration—key pillars for real-world agent deployment.

---

### **8. Backlog Watch**  
Several high-impact items remain unaddressed:

- **Issue #2358** ([feat(browser): add BrowserProfileStore trait](https://github.com/nearai/ironclaw/issues/2358)) — Over 5 months old, this is a critical UX blocker. Despite being labeled as an enhancement, it enables fundamental functionality. Requires maintainer attention to prevent further drift.
- **Issue #8121** ([Daily failure taxonomy](https://github.com/nearai/ironclaw/issues/8121)) — A recurring, high-volume failure that undermines trust in the benchmarking system. Should be treated as a priority bug, not just a diagnostic report.
- **PR #7499** ([host-mediated Passport](https://github.com/nearai/ironclaw/pull/7499)) — A well-documented, low-risk contribution from a new contributor. Its delay in review may discourage future contributions; should be assessed promptly.

These items collectively indicate a backlog bottleneck in triaging and merging important enhancements and fixes.

--- 

**Project Health Score**: ⚠️ *Stable but stagnant* — Core infrastructure is maintained, but momentum in addressing user-facing needs is slow. Prioritization of persistent state and test reliability will be key to future growth.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-10-02**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active with a strong momentum in issue and pull request activity, reflecting ongoing development and community engagement. In the past 24 hours, 7 new issues were opened (all unresolved), and 9 PRs were updated—7 open, 2 merged or closed—indicating sustained engineering effort. No new releases were published, suggesting that current focus is on stabilizing features and addressing critical bugs ahead of a potential next release cycle. The project continues to evolve rapidly, particularly around agent interaction patterns, provider compatibility, and UI/UX refinements.

---

### **2. Releases**  
❌ **No new releases** were published as of 2026-10-02.  
- The latest stable version remains **v2.2.1**, with **v2.2.2.beta4** reported to have a regression affecting conversation page access (see Issue #8073).  
- No migration notes or breaking change announcements are currently available.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- **PR #8069** ([fix(agents): restrict deepseek formatters to image media](https://github.com/agentscope-ai/QwenPaw/pull/8069)) – Closed after being superseded by PR #8070. Fixed incorrect media type handling for DeepSeek’s API, preventing PDF/audio misserialization.
- **PR #8068** ([fix(console): repair CJK emphasis boundaries in chat Markdown](https://github.com/agentscope-ai/QwenPaw/pull/8068)) – Closed after resolving Markdown rendering issues for CJK text with punctuation inside bold/italic delimiters.

🔧 **Features Advanced:**  
- **PR #7569** ([feat(modes): add Advisor Mode](https://github.com/agentscope-ai/QwenPaw/pull/7569)) – A major feature proposal for a dual-model loop mode (Advisor + Worker) is still open but actively maintained, signaling a strategic shift toward cost-performance optimization in multi-agent workflows.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement & Urgency:**  

| Issue | Summary | Link | Comments | Reactions |
|------|--------|------|---------|----------|
| [#6274](https://github.com/agentscope-ai/QwenPaw/issues/6274) | Request for `ask_user_question` tool to enable Human-in-the-Loop (HITL) with structured input | [Issue #6274](https://github.com/agentscope-ai/QwenPaw/issues/6274) | 3 | 👍 1 |
| [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) | DeepSeek provider: `send_file_to_user` with PDF breaks session permanently | [Issue #8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) | 2 | 👍 0 |
| [#8076](https://github.com/agentscope-ai/QwenPaw/issues/8076) | Reload fails silently when drain timeout expires — in-flight turns abandoned | [Issue #8076](https://github.com/agentscope-ai/QwenPaw/issues/8076) | 1 | 👍 0 |

🔍 **Underlying Needs:**  
- **Human-in-the-loop safety**: Users demand more control over agent decisions via structured user input (Issue #6274), indicating growing interest in responsible AI deployment.
- **Provider reliability**: Persistent failures in DeepSeek (`#8064`) and OpenAI model detection (`#8074`) highlight concerns about edge-case robustness across providers.
- **Session resilience**: The reload behavior issue (`#8076`) reveals a systemic risk in long-running sessions—critical for production use cases.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs Reported (Ranked by Severity):**

1. **[#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064)** – *DeepSeek provider crash*: Sending a PDF via `send_file_to_user` causes permanent session failure due to missing `file_id` or `file_data`.  
   - **Impact**: High – renders the entire session unusable after one request.  
   - **Fix Status**: ❌ No fix PR yet; high-priority pending.

2. **[#8073](https://github.com/agentscope-ai/QwenPaw/issues/8073)** – *V2.2.2.beta4: Unable to access conversation page* when accessed remotely.  
   - **Impact**: Medium-high – breaks core functionality for distributed teams.  
   - **Fix Status**: ❌ No fix PR; likely network/config-level issue.

3. **[#8074](https://github.com/agentscope-ai/QwenPaw/issues/8074)** – *OpenAI connection test fails for gpt-6-family models* due to outdated `_uses_max_completion_tokens` whitelist.  
   - **Impact**: Medium – prevents testing and usage of newer models.  
   - **Fix Status**: ❌ No fix PR; codebase still only matches `gpt-5*` / `o<digit>*`.

4. **[#8076](https://github.com/agentscope-ai/QwenPaw/issues/8076)** – *Silent abandonment of in-flight turns during reload*.  
   - **Impact**: Medium – leads to unpredictable state loss during configuration updates.  
   - **Fix Status**: ❌ No PR submitted; requires architectural attention.

---

### **6. Feature Requests & Roadmap Signals**  
📈 **Emerging Priorities from User Feedback:**

- **Human-in-the-Loop (HITL) Support** ([#6274](https://github.com/agentscope-ai/QwenPaw/issues/6274)):  
  Users want a built-in `ask_user_question` tool with structured multi-choice inputs and "other/custom" fallback—this is a strong signal for **next-gen agent safety and controllability**.

- **Plugin Theme Extensibility** ([#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)):  
  Plugin authors desire deeper theme customization via semantic token overrides, indicating a maturing ecosystem where **third-party integrations are becoming first-class citizens**.

- **Advisor Mode** ([#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)):  
  This proposed mode pairs a powerful advisor model with a cheaper worker, pointing toward **cost-aware agent orchestration**—likely a key feature in the upcoming v2.3 release.

---

### **7. User Feedback Summary**  
💡 **Real User Pain Points:**  
- **Remote Access Friction**: Users report that V2.2.2.beta4 fails to load the chat UI when accessed from other devices on the LAN (Issue #8073), suggesting network binding or CORS misconfiguration.
- **PDF Handling Breakage**: DeepSeek users are blocked from sending PDFs entirely (Issue #8064), which undermines file-sharing workflows.
- **Model Compatibility Gaps**: Newer gpt-6 models fail connection tests (Issue #8074), limiting adoption of cutting-edge models.
- **UI/UX Nuances**: CJK users face formatting issues in markdown (e.g., punctuation inside bold tags), showing the need for better internationalization support.

😊 **Satisfaction Indicators:**  
- Positive reception to recent fixes like CJK emphasis rendering (PR #8068) suggests strong user appreciation for subtle but impactful UX improvements.
- First-time contributor involvement (e.g., PR #8063) indicates healthy community growth and accessibility.

---

### **8. Backlog Watch**  
📌 **Long-standing or High-Impact Issues Needing Maintainer Attention:**

| Issue | Status | Priority | Notes |
|------|--------|----------|-------|
| [#6274](https://github.com/agentscope-ai/QwenPaw/issues/6274) | Open | 🔴 Critical | Core HITL capability requested; no progress despite 3 comments. |
| [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) | Open | 🔴 Critical | Permanent session breakage with PDFs—high impact, zero fix PR. |
| [#8076](https://github.com/agentscope-ai/QwenPaw/issues/8076) | Open | 🟡 High | Silent abandonment of in-flight tasks during reload—a fundamental stability risk. |
| [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) | Open | 🟡 Medium | Plugin theme extensibility needed for ecosystem growth. |

🔍 **Recommendation**: Maintainers should prioritize **#6274** and **#8064** immediately—both represent showstoppers for real-world agent deployment. The **Advisor Mode PR (#7569)** should be fast-tracked as a flagship feature for the next release.

---  
*Data compiled from GitHub: agentscope-ai/QwenPaw – 2026-10-02*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-10-02  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project is experiencing intense development momentum with **38 open issues** and **50 open pull requests** updated in the last 24 hours—indicating a high velocity of active engineering work. The activity is heavily concentrated in **security hardening**, **runtime stability**, and **plugin/tooling infrastructure**, particularly around access control, session persistence, and binary size optimization. No new releases have been published, suggesting that current efforts are focused on stabilizing v0.8.6 and preparing for v0.9.0. The lack of closed PRs or issues implies this phase is still in deep implementation and review.

---

### **2. Releases**

❌ **No new releases** were published in the past 24 hours.  
- The latest stable release remains **v0.8.5**, with ongoing stabilization work targeting **v0.8.6** (see #11387, #11369).  
- **v0.9.0** is expected to include major architectural changes: `DefaultCapabilities` composition (#11187), core tool set separation (#10998), and enhanced security boundaries (#11411, #11410).

> 🔗 [Release Tracking](https://github.com/zeroclaw-labs/zeroclaw/releases)

---

### **3. Project Progress**

✅ **Merged/Closed PRs**: None reported today.  
✅ **Active PRs** (Top 5 by impact):

| PR | Summary | Status |
|----|--------|--------|
| [#11419](https://github.com/zeroclaw-labs/zeroclaw/pull/11419) | Make secret key/value maps editable in `zerocode` and dashboard | Open |
| [#11411](https://github.com/zeroclaw-labs/zeroclaw/pull/11411) | Enforce private run ownership and audit routing in SOP | Open |
| [#11410](https://github.com/zeroclaw-labs/zeroclaw/pull/11410) | Guard cron writes and contain unscoped execution | Open |
| [#11381](https://github.com/zeroclaw-labs/zeroclaw/pull/11381) | Gateway now serves session messages/state/delete by exact row | Open |
| [#11382](https://github.com/zeroclaw-labs/zeroclaw/pull/11382) | Gateway exposes status, logs, doctor, and event stream via core | Open |

> 🚀 **Key advancement**: Significant progress on **gateway integration** and **SOP security enforcement**. These PRs lay groundwork for tighter runtime isolation and auditability.

---

### **4. Community Hot Topics**

🔥 **Most Active Issues (by comment count)**:

1. **[#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600)** – *Session-persistence contract ownership and layer ordering* (16 comments)  
   - **Need**: Clear ownership and coordination across four independent workstreams touching session persistence. High-risk architectural ambiguity.
   
2. **[#9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799)** – *Long-lived ephemeral daemon enters sustained multi-core CPU spin* (5 comments)  
   - **Need**: Fix for runaway resource consumption in debug daemons—critical for developer experience and system reliability.

3. **[#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)** – *SOP engine promotes steps before recording output-schema rejection* (4 comments)  
   - **Need**: Prevent workflow corruption when schema validation fails—blocks users from reliable automation.

4. **[#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495)** – *Config::save() can replace populated config.toml with near-empty file* (4 comments)  
   - **Need**: Critical data loss prevention; user configs are at risk during workspace tests.

5. **[#11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)** – *zerocode ignores launch directory and forces agent workspace as cwd* (3 comments)  
   - **Need**: Restore expected working directory behavior after regression (reopened from #10609).

> 💬 **Analysis**: Users are reporting **workflow-blocking bugs** and **data integrity risks**, indicating growing maturity in real-world usage. Security and reliability concerns dominate community discourse.

---

### **5. Bugs & Stability**

🚨 **High-Priority Bugs Reported Today**:

| Issue | Severity | Component | Description | Fix PR? |
|------|----------|-----------|-------------|---------|
| [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | S1 (Workflow blocked) | Runtime/Daemon | SOP runs later steps before recording schema rejection | ❌ No PR yet |
| [#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) | S0 (Data loss/security) | Config/Onboarding | `config.toml` replaced with empty file | ❌ No PR yet |
| [#11369](https://github.com/zeroclaw-labs/zeroclaw/issues/11369) | S1 (Workflow blocked) | Config/Onboarding | Docker images exit at startup; upgrade can strand DB | ❌ No PR yet |
| [#11333](https://github.com/zeroclaw-labs/zeroclaw/issues/11333) | S2 (Degraded behavior) | Tools | Skill review tools can’t see skills from `skill_bundles` | ❌ No PR yet |
| [#11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332) | S2 (Degraded behavior) | Runtime/Daemon | Skill improvement never runs for channel/webhook/gateway turns | ❌ No PR yet |

📌 **Critical Regressions**:
- **#11387**: Regression of #10609 — `zerocode` ignores launch directory again.
- **#11369**: New Docker startup crash due to config/data_dir locking change (post #10621).
- **#11416**: Slack “is thinking…” status broken since v0.8.5 — UX degradation.

> ⚠️ **Stability Risk**: Multiple critical regressions suggest **pre-release testing gaps** in v0.8.6. Immediate triage required.

---

### **6. Feature Requests & Roadmap Signals**

🎯 **Top User-Requested Features**:

| Request | Link | Signal |
|-------|------|--------|
| Add verified plugin update with rollback | [#10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995) | Explicit demand for robust plugin lifecycle management |
| llama.cpp model router for quick switching | [#7539](https://github.com/zeroclaw-labs/zeroclaw/issues/7539) | Growing interest in local LLM workflows |
| Local username/password AuthProvider (IdP-less login) | [#8076](https://github.com/zeroclaw-labs/zeroclaw/issues/8076) | Demand for standalone, browser-based authentication |
| "Copy" one-click feature (TUI) | [#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418) | Low-friction UX enhancement |

> 📈 **Roadmap Prediction**:  
> - **v0.8.6** will focus on **plugin safety**, **Docker stability**, **gateway consolidation**, and **CLI UX fixes**.  
> - **v0.9.0** will deliver **core capability separation**, **enhanced security boundaries**, **SOP rigor**, and **tool tiering**.

---

### **7. User Feedback Summary**

💬 **Real User Pain Points**:
- **Data Loss Risk**: Users fear losing their `config.toml` due to silent overwrites (#10495).
- **Unpredictable Behavior**: `zerocode` ignoring the current working directory breaks expected shell workflows (#11387).
- **Security Blind Spots**: Delegated tools lose principal scope (#11198), and owned sessions leak to shared memory plane (#11239).
- **UX Gaps**: Missing "copy" functionality (#11418), broken Slack status indicators (#11416), and missing `plugin update` command (#10995).
- **Debugging Difficulty**: Long-running daemons spinning CPUs (#9799) make troubleshooting hard.

✅ **Positive Signals**:
- High engagement in issue tracking shows strong community investment.
- Detailed bug reports (e.g., `lsof` output in #9799) indicate experienced users actively debugging.

---

### **8. Backlog Watch**

⚠️ **Critical Issues Needing Maintainer Attention**:

| Issue | Priority | Comments | Status | Notes |
|------|----------|----------|--------|-------|
| [#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600) | P2 (High risk) | 16 comments | Accepted, no stale | **Architectural chaos**: Four teams touch same contract without ownership. Needs immediate resolution. |
| [#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) | P0 (S0) | 4 comments | Accepted | **Data loss risk**: Configuration overwrite could wipe user settings. Must be fixed before next release. |
| [#11369](https://github.com/zeroclaw-labs/zeroclaw/issues/11369) | P1 (S1) | 0 comments | Accepted | **Docker startup failure** blocks deployment. Urgent fix needed. |
| [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) | P0 (S0) | 4 comments | Accepted | **Security breach**: Delegate tools ignore principal scope. High-risk exposure. |
| [#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239) | P0 (S0) | 1 comment | Accepted | **Memory plane leakage**: Owned sessions hit shared memory. Critical security flaw. |

> ✅ **Action Required**: Prioritize **security-critical** and **data-loss-prone** issues. Assign owners and schedule reviews.

---

### ✅ **Summary Assessment**

**Project Health**: **High Activity, Moderate Risk**  
- ✅ **Strengths**: Strong community engagement, clear roadmap, deep technical focus on security and architecture.  
- ⚠️ **Risks**: Multiple high-severity bugs, regression issues, and lack of release cadence.  
- 📌 **Next Steps**: Stabilize v0.8.6 with urgent fixes for config corruption, Docker startup, and CPU spinning. Begin v0.9.0 planning around capability composition and security isolation.

> 🔗 **Full Dashboard**: [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*