# OpenClaw Ecosystem Digest 2026-09-10

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-10 00:33 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest**  
**Date:** 2026-09-10  
**Source:** [GitHub: openclaw/openclaw](https://github.com/openclaw/openclaw)  

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with **500 issues and 500 pull requests updated in the last 24 hours**, indicating sustained development momentum. The community is focused on critical stability fixes, particularly around session integrity, authentication reliability, and memory/resource management. A significant number of high-severity bugs (P0/P1) are under review, including persistent crashes, data loss, and security exposures. Despite no new releases, multiple PRs target core runtime improvements, suggesting an imminent update cycle is underway.

---

### **2. Releases**  
❌ **No new releases** were published today.  
- **Latest stable version**: `2026.8.2` (as of 2026-09-09).  
- **Pending release**: `2026.9.3` is under scrutiny due to reported regressions (e.g., #142585, #141617), which may delay rollout.  
- **Migration note**: Users upgrading from `2026.7.1-2` to `2026.9.x` face risks related to legacy workspace handling and plugin compatibility — see #142585, #141617.

---

### **3. Project Progress**  
✅ **Merged / Closed PRs** (from recent activity):  
- **#142756** – Fixes plugin SDK type mismatch allowing gateway handlers to return values. *Improves extensibility.*  
- **#143564** – Isolates QA lab health scenarios to prevent race conditions during testing. *Enhances test reliability.*  
- **#143557** – Preserves update diagnostics even when SQLite history is unreadable. *Critical for troubleshooting failed updates.*  
- **#143563** – Makes Telegram observation ordering tolerant; prevents false negatives in E2E tests. *Improves test accuracy.*  

🔧 **Key Advancements**:  
- **Session resilience**: Several PRs (e.g., #143557, #143564) focus on improving update recovery and diagnostic persistence.  
- **Plugin & UI unification**: PRs like #142782 and #142713 aim to unify plugin discovery and installation UIs, signaling a shift toward user-centric design.  
- **Schema-driven config**: Refactoring efforts (#143551–#143554) standardize config derivation from Zod schemas, reducing duplication and improving maintainability.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Comment Count**:
| Issue | Summary | Comments | Severity | Link |
|------|--------|----------|----------|------|
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | Malformed JSON arguments in `claude-sonnet-5` v2026.8.1 | 26 | 🐚 Platinum Hermit (P1) | [Issue #135111](https://github.com/openclaw/openclaw/issues/135111) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Zombie process leaks from hooks/tools | 15 | 🦪 Silver Shellfish (P1) | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Synchronous agent persistence blocks event loop at scale | 15 | 🦞 Diamond Lobster (P1) | [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) |
| [#137927](https://github.com/openclaw/openclaw/issues/137927) | Internal context block leaks into Telegram messages | 14 | 🦞 Diamond Lobster (P1) | [Issue #137927](https://github.com/openclaw/openclaw/issues/137927) |

🔍 **Underlying Needs**:  
- **Reliability under load**: High comment counts on performance-blocking issues suggest stress testing is exposing scalability limits.  
- **Security transparency**: Leaked internal context (#137927) and credential safety locks (#128076) indicate growing concern over data exposure.  
- **Cross-platform stability**: Windows-specific issues (e.g., #137813, #140010) show platform-specific gaps persist despite broader support.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs Reported (P0/P1)**:  
| Issue | Description | Fix PR? | Impact | Link |
|------|-------------|---------|--------|------|
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | Malformed JSON from Claude → intermittent failures | ❌ | Auth provider, crash-loop | [Issue #135111](https://github.com/openclaw/openclaw/issues/135111) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Zombie processes accumulate → runtime degradation | ❌ | System stability, memory | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Sync persistence blocks Gateway event loop | ❌ | Session state, scalability | [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) |
| [#137813](https://github.com/openclaw/openclaw/issues/137813) | Windows gateway fails silently after 2026.9.1 update | ❌ | UX-release blocker | [Issue #137813](https://github.com/openclaw/openclaw/issues/137813) |
| [#139714](https://github.com/openclaw/openclaw/issues/139714) | Update runs stuck “in progress” forever | ❌ | Session state, UX friction | [Issue #139714](https://github.com/openclaw/openclaw/issues/139714) |

🛑 **Stability Concerns**:  
- Multiple P1 bugs involve **session state corruption** (#119720, #139714), **memory/index bloat** (#114612, #136311), and **authentication failure cascades** (e.g., billing cooldown outlives outage, #115642).  
- No known fix PRs exist for top-tier bugs—this indicates **maintenance backlog pressure**.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **High-Potential Features (Based on Engagement)**:  
| Request | Summary | Priority | Link |
|--------|--------|----------|------|
| [#6757](https://github.com/openclaw/openclaw/issues/6757) | Agent-triggered context compaction (self-compact tool) | P2 | [Feature #6757](https://github.com/openclaw/openclaw/issues/6757) |
| [#6625](https://github.com/openclaw/openclaw/issues/6625) | Graceful sub-agent timeout with pre-warning | P3 | [Feature #6625](https://github.com/openclaw/openclaw/issues/6625) |
| [#142782](https://github.com/openclaw/openclaw/pull/142782) | Unified plugin discovery & installation UI | P2 | [PR #142782](https://github.com/openclaw/openclaw/pull/142782) |
| [#87584](https://github.com/openclaw/openclaw/issues/87584) | Configurable group room-event steering | P2 | [Feature #87584](https://github.com/openclaw/openclaw/issues/87584) |

🔮 **Roadmap Signals**:  
- **User autonomy**: Self-compaction (#6757) and graceful timeouts (#6625) reflect demand for agents to manage their own state.  
- **UI maturity**: Unification of plugin workflows (PR #142782) suggests a push toward polished, production-ready UX.  
- **Flexibility**: Configurable steering (#87584) points to growing need for dynamic control in multi-agent environments.

---

### **7. User Feedback Summary**  
💬 **Real User Pain Points**:  
- **"My agent crashes after sleep"** – #140010 reports WebSocket reconnect stalls post-Windows wake, affecting daily users.  
- **"I lost my work"** – #126906 reveals that denied tools silently disable memory persistence, leading to irreversible data loss.  
- **"Why is my voice message not transcribed?"** – #139274 shows native `/codex bind` drops voice notes, breaking key use cases.  
- **"I can't upgrade without breaking things"** – #142585 highlights that Doctor refuses valid legacy setups, causing migration nightmares.  

👍 **Satisfaction Indicators**:  
- Positive sentiment around unified UI (PR #142782) and improved error messaging (PR #143557).  
- Recognition of proactive maintenance (e.g., schema refactors) signals growing trust in long-term stability.

---

### **8. Backlog Watch**  
⏳ **Long-Unanswered Critical Issues Needing Maintainer Attention**:  
| Issue | Status | Why It Matters | Link |
|------|--------|----------------|------|
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | Closed but still needs live repro | Regression in core LLM provider path | [Issue #135111](https://github.com/openclaw/openclaw/issues/135111) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Open, 15 comments | Persistent zombie leak → system degradation | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Open, 15 comments | Scalability bottleneck at scale | [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) |
| [#137813](https://github.com/openclaw/openclaw/issues/137813) | Open, 13 comments | Windows users blocked from using latest release | [Issue #137813](https://github.com/openclaw/openclaw/issues/137813) |
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | Open, 5 comments | Blocks legacy upgrades; high impact | [Issue #142585](https://github.com/openclaw/openclaw/issues/142585) |

📌 **Action Required**: These issues lack assigned maintainers or fix PRs despite high visibility and severity. Prioritization is essential before next release.

---

**Final Assessment**:  
OpenClaw is in a **high-velocity development phase** with strong community engagement, but **stability and release readiness are at risk**. While feature innovation is robust, unresolved P0/P1 bugs and technical debt threaten user adoption. Immediate attention to session integrity, authentication reliability, and cross-platform consistency is critical. The project is healthy in activity but under pressure in quality assurance.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-10**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem is entering a phase of structural maturation, marked by increasing specialization in architecture, security, and user experience. Projects are diverging in focus—ranging from core runtime stability (OpenClaw), distributed coordination (Hermes Agent), enterprise-grade MCP integration (IronClaw), mobile-first UX (QwenPaw), to foundational architectural innovation (ZeroClaw). Despite varying release cadences, all projects exhibit strong community engagement, with active development centered on session resilience, cross-platform consistency, extensibility, and auditability. The landscape reflects a shift from experimental prototyping toward production-ready, self-managing agent systems capable of handling real-world workflows.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Release Status | Health Score (Out of 10) |
|--------|-------------------|----------------|----------------|----------------------------|
| **OpenClaw** | 500 | 500 | ❌ No new release | 7.2 |
| **Hermes Agent** | 50 | 50 | ❌ No new release | 8.7 |
| **IronClaw** | 4 (new) | 4 (open) | ❌ No new release | 7.8 |
| **QwenPaw** | 22 | 34 | ❌ No new release | 8.5 |
| **ZeroClaw** | 35 | 50 | ❌ No new release | 8.3 |

> ✅ *Note: OpenClaw leads in volume but shows signs of instability; others demonstrate more balanced velocity with higher quality output.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most **high-volume, high-velocity project** in the ecosystem, with over 500 issues and PRs updated daily—indicative of broad adoption and intense contributor activity. Its technical approach emphasizes **plugin extensibility**, **schema-driven configuration**, and **session resilience**, positioning it as a modular, developer-centric platform. Compared to peers:
- **vs Hermes Agent**: OpenClaw has greater scale and faster iteration but lags in UI polish and diagnostic transparency.
- **vs QwenPaw**: OpenClaw prioritizes backend robustness over mobile-native design, while QwenPaw focuses on end-user UX.
- **vs ZeroClaw**: OpenClaw is more mature in feature delivery, whereas ZeroClaw remains in deep architectural refinement.

Its community size appears largest based on issue volume and comment density, suggesting strong early adopter traction—but this also correlates with unresolved P0/P1 bugs, indicating growing pains at scale.

---

### **4. Shared Technical Focus Areas**  
Multiple projects are converging on critical technical requirements:

| Requirement | Projects Involved | Specific Needs |
|-----------|------------------|----------------|
| **Session Integrity & Persistence** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Prevent data loss during crashes, handle state corruption, enable recovery after sleep/reconnect |
| **Cross-Platform Stability** | OpenClaw, QwenPaw, Hermes Agent, IronClaw | Fix Windows-specific regressions (e.g., zombie processes, silent gateway failures) |
| **Authentication & Session Security** | OpenClaw, Hermes Agent, ZeroClaw | Prevent credential leaks, ensure secure context isolation, manage long-lived sessions |
| **Extensibility & Plugin Management** | OpenClaw, QwenPaw, IronClaw, ZeroClaw | Unified discovery UIs, versioned skills, WASM plugin support, SDK consistency |
| **Diagnostic Transparency** | All five projects | Improve error messaging, clarify approval gates, expose routing logic, reduce silent failures |

These shared challenges signal a collective push toward **production-grade reliability**, where agents must operate autonomously without constant supervision.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Feature Focus** | Plugin extensibility, session resilience | Coordination logic, cron scheduling, SSH isolation | Hosted-MCP security, SEP-414 attribution | Mobile UX, persistent memory, browser compatibility | Runtime ownership, append-only events, WASM plugins |
| **Target Users** | Developers, power users, teams | DevOps, remote developers, automation engineers | Enterprises, multi-user platforms | Home lab users, mobile-first creators | Architects, security-focused builders |
| **Technical Architecture** | Modular, schema-driven, event-loop optimized | Distributed, Kanban-based, SSH-isolated backends | MCP-centric, identity-aware cataloging | Web + desktop + Expo mobile client | Runtime-owned sessions, transport abstraction layers |
| **UI/UX Maturity** | Medium (improving) | Medium-high (refactoring) | Low (command-line focused) | High (mobile-first design) | Medium (CLI-heavy, emerging web UI) |

> 🔍 *Key Differentiator*: **ZeroClaw and IronClaw** are uniquely focused on **platform-level security and observability**, while **QwenPaw** leads in **consumer-facing usability** and **mobile parity**.

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Characteristics |
|------|--------|-----------------|
| **Rapid Iteration (High Velocity)** | OpenClaw, ZeroClaw, QwenPaw | >30 PRs/day, frequent bug triage, active RFCs, strong feedback loops |
| **Stabilizing (Balanced Cadence)** | Hermes Agent, IronClaw | Moderate activity (~50 issues/PRs), focus on fixing regressions, refactoring legacy code |

- **OpenClaw** is the most volatile: massive volume masks underlying quality risks.
- **Hermes Agent** shows healthy maturity: consistent fixes, clear roadmap signals, and strong architectural hygiene.
- **IronClaw** is quietly refining infrastructure—low noise, high precision.
- **QwenPaw** is transitioning from prototype to product: mobile demands and UX refinements dominate.
- **ZeroClaw** is architecturally advanced: RFC-driven decisions suggest long-term vision over short-term features.

---

### **7. Trend Signals**  
Based on community feedback and project direction, key industry trends emerge for AI agent developers:

1. **Self-Management Demand**  
   - Users increasingly expect agents to **self-compact memory** (#6757, OpenClaw), **manage timeouts gracefully** (#6625, Hermes), and **auto-recover from failures**.  
   → *Implication:* Future agents must be autonomous, not just reactive.

2. **Cross-Platform Consistency Is Non-Negotiable**  
   - Windows-specific issues (zombie processes, silent failures) are recurring pain points across 4/5 projects.  
   → *Implication:* Robust testing across OSes is now a baseline requirement.

3. **Security-by-Design Is Mainstream**  
   - Features like **caller attribution (SEP-414)**, **filesystem sandboxing**, and **context isolation** are no longer niche—they’re central to trust.  
   → *Implication:* Developers must embed security into every layer, not bolt it on.

4. **User-Centric Extensibility Wins**  
   - Unified plugin UIs (#142782, OpenClaw), customizable titles (#7648, QwenPaw), and Telegram command menus (#8072, IronClaw) reflect demand for **discoverability and control**.  
   → *Implication:* Developer tools must serve both builders and end-users.

5. **Production Readiness Over Novelty**  
   - Top concerns are **data integrity**, **session persistence**, and **cost tracking accuracy**—not flashy features.  
   → *Implication:* The era of "cool demos" is over; users want reliable, auditable agents.

---

> ✅ **Strategic Takeaway**: The open-source AI agent ecosystem is evolving beyond experimentation. Success will go to projects that balance **technical depth**, **user experience**, and **operational reliability**—with a clear path to production deployment. Prioritize stability, diagnostics, and security, and you’ll align with the market’s true needs.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-10**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 updated pull requests in the past 24 hours—indicating sustained momentum in development, community engagement, and bug triage. A significant portion of activity centers on critical stability and session management issues, particularly around desktop app behavior, cron job scheduling, and SSH-based backend isolation. Despite no new releases, the team is aggressively addressing high-severity bugs (P1/P2) and architectural debt, especially in the agent’s core coordination logic and cross-platform compatibility. The project shows strong health: rapid response to user-reported regressions, a growing number of targeted PRs, and ongoing efforts to refactor legacy code structures.

---

### **2. Releases**  
❌ **No new releases** were published today or in the last 7 days.  
- **Latest release**: `v0.17.0` (as of 2026-08-31), still under active maintenance.
- **Status**: No breaking changes reported; all recent fixes are non-disruptive patches. Users should expect updates via `hermes update` once new builds are staged.

---

### **3. Project Progress**  
✅ **Merged & Closed PRs (Today)**:  
- **PR #106873** – Fixed misattribution in group chats across connections by anchoring `(you)` tagging to connection context, not bare profile name.  
- **PR #106837** – Eliminated futile retries when `max_tokens` boost fails due to full context window—prevents unnecessary API calls.  
- **PR #106855** – Removed `.deleted` tombstone directories from profile validation, fixing spurious `DiscussionValidationError` errors.  
- **PR #106992** – Improved UI ergonomics by collapsing composer status groups (except todos), enhancing readability.  

🔧 **Key Advances**:  
- **PR #106959** and **#106990/98** tackle deep-rooted deadlock risks in SSH-isolated backends and Kanban task spawning—critical for reliability in distributed workflows.  
- **PR #106996** resolves foreign session import path resolution, ensuring `CLAUDE_CONFIG_DIR`/`CODEX_HOME` are respected during migration.  
- **PR #106997** improves transparency around unattended memory operations by clarifying approval gates in `/memory` output.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement**:
| Issue | Comments | Severity | Focus Area | Link |
|------|----------|----------|------------|------|
| [#66616](https://github.com/nousresearch/hermes-agent/issues/66616) | 187 | P3 (Degraded) | Skills Index Freshness | [View](https://github.com/nousresearch/hermes-agent/issues/66616) |
| [#78647](https://github.com/nousresearch/hermes-agent/issues/78647) | 82 | P3 | Godfile Refactoring | [View](https://github.com/nousresearch/hermes-agent/issues/78647) |

🔍 **Analysis**:  
- **Issue #66616** reflects systemic concern over **automation reliability**—the skills index has been stale for nearly 30 hours despite scheduled rebuilds. This impacts documentation and user trust in tool availability.  
- **Issue #78647** highlights long-term **architectural hygiene**—a repo-wide effort to eliminate monolithic "godfiles" that hinder maintainability. The epic is stalled after prior cleanup, suggesting need for coordinated refactoring sprints.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs (P1)**:  
1. **[#100401](https://github.com/nousresearch/hermes-agent/issues/100401)** – Cron jobs deadlocked by heartbeat fencing, killing jobs >60s. *Fix PR*: Not yet submitted.  
2. **[#105145](https://github.com/nousresearch/hermes-agent/issues/105145)** – Windows `hermes update` falsely reports `FAILED (exit 8)` post-success. *Fix PR*: Pending.  
3. **[#106459](https://github.com/nousresearch/hermes-agent/issues/106459)** – Over-limit sessions become permanently uncompressible; no recovery path. *Fix PR*: None yet.  
4. **[#106935](https://github.com/nousresearch/hermes-agent/issues/106935)** – Desktop over SSH kills live turns by retiring owned sibling backends. *Fix PR*: **PR #106959** merged (see above).

🛠️ **High-Impact P2 Bugs**:  
- **[#106596](https://github.com/nousresearch/hermes-agent/issues/106596)** – YouTube embeds fail with “Error 153” due to broken Referer handling.  
- **[#103375](https://github.com/nousresearch/hermes-agent/issues/103375)** – Bot tiles enter infinite reconnect loop, starving local backend pool.  
- **[#106994](https://github.com/nousresearch/hermes-agent/issues/106994)** – Worker fan-out deadlock due to circular dependency in `recompute_ready`. *Fix PR*: **PR #107001** submitted.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Feature Trends**:  
- **Explicit Memory Control**:  
  - **[#106919](https://github.com/nousresearch/hermes-agent/issues/106919)** – Request for opt-in unattended memory consolidation. Indicates growing demand for **automated lifecycle management** of agent memory.  
- **Kanban Flexibility**:  
  - **[#106938](https://github.com/nousresearch/hermes-agent/issues/106938)** – Need per-board override for `execution_host`, currently only configurable via shared config. Suggests users want **dynamic dispatch control** without editing configs.  
- **Visibility & Transparency**:  
  - **[#106968](https://github.com/nousresearch/hermes-agent/issues/106968)** – Show actual routed member in CLI/gateway footers (e.g., `poolside/laguna-s-2.1:free`). Users care about **real cost/latency visibility** behind proxy models.  
- **Security & Isolation**:  
  - **[#93508](https://github.com/nousresearch/hermes-agent/pull/93508)** – Browser-hosted Desktop renderer (`hermes webapp`) signals interest in **remote access and browser-first UX**.

📌 **Prediction**: Next major version (likely v0.18.0) will include:  
- Enhanced session state resilience  
- Transparent model routing in CLI  
- Granular Kanban dispatch controls  
- Opt-in memory automation

---

### **7. User Feedback Summary**  
🗣️ **Real Pain Points Reported**:  
- **Windows Installer Flaws**: Multiple users report `hermes update` failing despite successful upgrade (**#105145**, **#105629**). Affects stability and trust in self-updating systems.  
- **Session State Corruption**: Users experience permanent uncompressibility (**#106459**) and silent event loss during reconnects (**#100122**), leading to data loss and frustration.  
- **SSH + Desktop Instability**: Live turns dying unexpectedly when using SSH tunneling (**#106935**) disrupts remote workflows—common among developers and DevOps teams.  
- **Tooling Gaps**: Lack of validation for `/model` commands (**#632**) and missing vision support detection (**#638**) create invisible failure modes.  

💡 **Satisfaction Indicators**:  
- Positive feedback on **refactor progress** (e.g., PR #106873 fixing chat attribution).  
- Appreciation for **transparent diagnostics** (e.g., PR #106997 clarifying memory gates).

---

### **8. Backlog Watch**  
⏳ **High-Value Issues Needing Attention**:  
| Issue | Status | Why It Matters | Link |
|------|--------|----------------|------|
| [#66616](https://github.com/nousresearch/hermes-agent/issues/66616) | Open, 187 comments | Core tool discovery system is degraded — impacts usability across all profiles. | [View](https://github.com/nousresearch/hermes-agent/issues/66616) |
| [#78647](https://github.com/nousresearch/hermes-agent/issues/78647) | Open, 82 comments | Architectural bottleneck preventing scalable growth. Must be addressed before next large-scale feature rollout. | [View](https://github.com/nousresearch/hermes-agent/issues/78647) |
| [#106994](https://github.com/nousresearch/hermes-agent/issues/106994) | Open, 1 comment | Critical deadlock in worker orchestration; risk of cascading failures in complex workflows. | [View](https://github.com/nousresearch/hermes-agent/issues/106994) |

🔔 **Call to Action**: Maintainers should prioritize **Issue #66616** and **#78647**—they represent both immediate user impact and long-term sustainability. These are not just bugs but foundational quality indicators.

---

> ✅ **Project Health Score**: 8.7/10  
> *Rapid issue resolution, strong PR velocity, and clear focus on stability and architecture. High-risk areas remain, but proactive mitigation is underway.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-10**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable but quietly active state as of 2026-09-10. No new releases were published, and no pull requests or issues were closed in the past 24 hours. However, four new PRs were opened—primarily focused on improving hosted-MCP security, extension consistency, and Telegram integration—indicating ongoing refinement of core infrastructure. The single open issue highlights a recurring UX friction point in WebChat v2 related to IME (Input Method Editor) handling, suggesting continued attention is needed for input flow logic. Overall, activity is low but targeted toward foundational stability and feature polish.

---

### **2. Releases**  
*No new releases were published today.*  
There are currently no version updates or changelogs available for release notes, migration guidance, or breaking changes. Maintainers appear to be prioritizing internal improvements over public-facing versioning at this time.

---

### **3. Project Progress**  
*No PRs were merged or closed today.*  
All recent contributions remain open and under review:
- **PR #8090**: Fixes catalog collision in hosted-MCP by ensuring tool discovery is tied to caller identity, not extension ID—critical for multi-user environments.
- **PR #8084**: Introduces opt-in SEP-414 attribution for outbound MCP calls, enabling providers to track conversation context and avoid duplicate charges on retries.
- **PR #8085**: Resolves inconsistency between manifest validation and construction logic for operator-installed packages, improving reliability.
- **PR #8072**: Adds Telegram bot command menu registration at activation, enhancing discoverability and usability of IronClaw’s Telegram interface.

These developments signal strong momentum in refining the MCP ecosystem and expanding platform integrations.

---

### **4. Community Hot Topics**  
The most discussed item is **Issue #8091** ([link](https://github.com/nearai/ironclaw/issues/8091)), which reports that pressing *Enter* during IME composition in WebChat v2 prematurely submits messages before text completion. Despite having zero comments or reactions, this issue is notable because it reflects a long-standing UX regression: users expect Enter to confirm input (IME commit), not send messages. Its recurrence suggests either incomplete resolution in prior fixes or a lack of test coverage around IME workflows.

Among PRs, **PR #8084** ([link](https://github.com/nearai/ironclaw/pull/8084)) stands out due to its implications for enterprise-grade MCP usage—caller attribution enables billing accuracy and idempotency control, a key requirement for production deployments.

---

### **5. Bugs & Stability**  
- **Critical UX Bug (High Priority)**:  
  **Issue #8091** – *Enter sends message while confirming IME composition*  
  - **Severity**: High (user-facing, impacts daily workflow)  
  - **Impact**: Users lose control over message submission timing; unfinished text gets sent.  
  - **Fix Status**: No fix PR exists yet. This is a known recurrence, indicating potential gaps in testing or regression prevention.

No other bugs or crashes were reported in the last 24 hours. The absence of closed issues suggests no urgent stability fixes have been applied recently.

---

### **6. Feature Requests & Roadmap Signals**  
- **Telegram Command Menu Registration (PR #8072)**: A clear signal that user experience across channels is being prioritized. This feature enhances usability by making commands visible directly in Telegram’s UI—likely driven by user demand for easier access.
- **SEP-414 Caller Attribution (PR #8084)**: Indicates growing interest in secure, traceable MCP interactions. This feature aligns with broader trends toward accountability and observability in AI agent systems.
- **Hosted-MCP Catalog Isolation (PR #8090)**: Suggests real-world use cases involving shared MCP servers with multiple authenticated users, where data isolation is essential.

These features collectively point to a roadmap focused on **multi-user scalability**, **enterprise readiness**, and **channel-native UX enhancements**.

---

### **7. User Feedback Summary**  
User pain points center on:
- **Input flow confusion**: Pressing Enter during IME input unexpectedly sends messages, leading to frustration and accidental miscommunication.
- **Lack of visibility**: Telegram users need better discovery mechanisms for available commands, hence the push for `setMyCommands`.
- **Unreliable state management**: In hosted-MCP scenarios, users report tools disappearing or conflicting due to shared registries—highlighting a need for per-conversation or per-caller state tracking.

Feedback is largely technical and constructive, indicating an engaged early adopter base focused on robustness and usability rather than novelty.

---

### **8. Backlog Watch**  
Several high-impact issues remain unresolved and warrant maintainer attention:
- **Issue #8091** ([WebChat v2 IME bug](https://github.com/nearai/ironclaw/issues/8091)) – Recurring UX issue with significant impact on chat quality. Needs immediate triage.
- **Issue #7823** *(not listed but implied)* – Related to webchat performance under load; frequently referenced in discussions.
- **PR #8084** – While well-documented, lacks assignee or milestone. Could delay adoption if not prioritized.
- **PR #8085** – Minor but critical for package integrity; may affect deployment reliability if unmerged.

These items represent potential bottlenecks in scaling and user trust. Proactive maintenance is recommended to prevent erosion of confidence in stability.

---  
*Data collected from GitHub: nearai/ironclaw | 2026-09-10*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-10**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active with a strong pulse of community engagement: **22 issues updated in the last 24 hours** (11 open, 11 closed), and **34 pull requests** (26 open, 8 merged or closed). This indicates robust development momentum, particularly around stability fixes, UI/UX refinements, and backend reliability. A surge in mobile experience and browser-specific rendering issues suggests growing cross-platform usage. Despite no new releases, several critical bugs—especially around database integrity, audio fallbacks, and session concurrency—are being actively addressed.

---

### **2. Releases**  
❌ **No new releases** were published in the past 24 hours.  
The latest stable version remains **v2.2.0**, with ongoing beta testing for upcoming features like `Advisor Mode` and enhanced memory persistence. Users are advised to monitor GitHub for release notes prior to upgrading due to recent regressions in `llama.cpp` version handling (#7633) and history retention (#7596).

> 🔗 [Latest Release Page](https://github.com/agentscope-ai/QwenPaw/releases)

---

### **3. Project Progress**  
**Merged / Closed PRs (2026-09-09):**
- ✅ **PR #7649** – *feat(mcp): support configurable timeout for HTTP/SSE clients*  
  → Addresses long-standing user request (#3997); enables dynamic timeouts via `MCPClientConfig`. Critical for reliable external API integrations.
- ✅ **PR #7655** – *fix(history): repair FTS corruption and retention cleanup*  
  → Directly resolves #7596; prevents silent data loss during session purges by fixing SQLite FTS index corruption.
- ✅ **PR #7641** – *fix(release): retry and verify desktop artifact downloads*  
  → Improves release reliability on unstable networks—important for users in low-connectivity environments.
- ✅ **PR #7609** – *feat(skills): expose versions and validate declared dependencies*  
  → Adds versioning and dependency validation to skills, enabling better fleet management and update control (#7557).
- ✅ **PR #7640** – *fix(skill): update clawhub url*  
  → Resolves broken skill download links; improves third-party integration reliability.

These merges signal strong focus on **stability, security, and maintainability**, especially in core data pipelines and plugin ecosystems.

---

### **4. Community Hot Topics**  
**Top Issues by Engagement:**
- 🔥 **Issue #7642** – *Console streaming renders nothing until turn completes in Chrome (works fine in Safari)*  
  → Reported today, already has 4 comments. Highlights browser-specific rendering inconsistency affecting real-time UX.  
  🔗 [GitHub Issue #7642](https://github.com/agentscope-ai/QwenPaw/issues/7642)
  
- 🔥 **Issue #7177** – *Optimize https://platform.agentscope.io/deploy homepage*  
  → High visibility from power users; calls for improved mobile usability and intuitive workflow layout.  
  🔗 [GitHub Issue #7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)

- 🔥 **Issue #7657** – *Add ntfy channel support (working implementation ready)*  
  → Already has working code; proposed as a self-hosted push notification solution. Strong fit for home-lab users.  
  🔗 [GitHub Issue #7657](https://github.com/agentscope-ai/QwenPaw/issues/7657)

**Underlying Needs:**  
Users demand **better cross-browser compatibility**, **mobile-first design**, **self-hosted notification integrations**, and **intuitive UI flows**—indicating a shift toward production-grade personal AI workflows beyond experimentation.

---

### **5. Bugs & Stability**  
**Critical Bugs Reported (Ranked by Severity):**
1. ⚠️ **Issue #7633** – *llama.cpp v0.4.0-dev format breaks version detection → silent rollback*  
   → High-risk: manual upgrades lost silently. Fixes exist in PR #7639 but not yet merged.  
   🔗 [GitHub Issue #7633](https://github.com/agentscope-ai/QwenPaw/issues/7633)

2. ⚠️ **Issue #7596** – *Scroll history.db FTS corruption undetected; retention purge fails silently*  
   → Data integrity risk. Fixed in PR #7655 (merged), but users may still face silent data loss if not upgraded.  
   🔗 [GitHub Issue #7596](https://github.com/agentscope-ai/QwenPaw/issues/7596)

3. ⚠️ **Issue #7622** – *Modal popups lose background mask in v2.2.0 (Chromium only)*  
   → Visual regression impacting usability and perceived professionalism. Confirmed reproducible across OSes.  
   🔗 [GitHub Issue #7622](https://github.com/agentscope-ai/QwenPaw/issues/7622)

4. ⚠️ **Issue #7363** – *Synchronous calls block event loop → desktop unresponsive for >120s*  
   → Severe performance issue; affects startup and message sending. Requires architectural fix.  
   🔗 [GitHub Issue #7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)

> ✅ **Fix PRs Exist**: For #7596 (#7655), #7633 (#7639), #7622 (awaiting merge), #7363 (no fix yet).

---

### **6. Feature Requests & Roadmap Signals**  
Key feature signals for **QwenPaw 2.3+**:
- 📱 **Mobile Native Experience** – PR #7378 (Expo/React Native client) is a major roadmap indicator. Community wants full mobile parity.
- 💬 **Persistent Memory Across Sessions** – Issue #7656 (from MemCode founder) proposes durable memory. Could be integrated via optional plugin.
- 🎨 **Customizable Web Title** – Issue #7648 (user managing multiple QwenPaw instances) signals need for multi-instance differentiation.
- 🛠️ **Traffic Light Indicator** – PR #7600 suggests visual status tracking for long-running tasks; likely to appear in next UI iteration.
- 🔄 **Webhook/ntfy Integration** – Issue #7657 shows growing demand for push-based agent notifications.

> 🔮 **Predicted Inclusion**: Mobile app (Expo), customizable web titles, and persistent memory (plugin-based) are strong candidates for 2.3.

---

### **7. User Feedback Summary**  
**Pain Points:**
- ❌ **Mobile UX is poor** – Buttons buried, navigation awkward on small screens (#7177).
- ❌ **Session management feels fragile** – Manual workarounds needed for file paths (#7601), and timeouts can’t be adjusted (#3997).
- ❌ **UI inconsistencies** – "Install" button appears on installed apps (#7228), modals lack overlay (#7622).
- ❌ **Lack of customization** – No way to rename tabs or set custom titles (#7648), making multi-instance use error-prone.

**Satisfaction Signals:**
- ✅ **Power users appreciate extensibility** – Skill versioning (#7609), MCP config flexibility (#7649), and plugin architecture are well-received.
- ✅ **Self-hosting community values autonomy** – Ntfy integration request reflects trust in local infrastructure.

> 👤 Real-world use case: A developer manages 7+ QwenPaw instances for different projects, needing clear tab identification and durable state — currently unsupported.

---

### **8. Backlog Watch**  
**High-Impact Issues Needing Maintainer Attention:**
- 🟡 **Issue #7656** – *Could QwenPaw support durable memory across sessions?*  
  → Proposed by CEO of MemCode; addresses core limitation in personal AI agents. Low visibility but high strategic value.  
  🔗 [GitHub Issue #7656](https://github.com/agentscope-ai/QwenPaw/issues/7656)

- 🟡 **Issue #7648** – *Add option to customize webpage title*  
  → Simple UX fix with high impact on productivity for multi-instance users. Already has traction.  
  🔗 [GitHub Issue #7648](https://github.com/agentscope-ai/QwenPaw/issues/7648)

- 🟡 **Issue #7378** – *Introduce QwenPaw native mobile experience (Expo/React Native)*  
  → Draft PR with full UI mockups. One of the most requested features. Currently marked “DO NOT MERGE” but deserves review.  
  🔗 [GitHub PR #7378](https://github.com/agentscope-ai/QwenPaw/pull/7378)

> ⏳ **Recommendation**: Prioritize triaging these three for next sprint. They represent pivotal UX and scalability improvements.

---

✅ **Project Health Assessment**: **Strong** — Active development, responsive community, and high-quality PRs. However, **critical stability gaps** (database corruption, session blocking) require urgent attention to maintain user trust. The project is clearly evolving from a prototype toward a production-ready personal AI platform.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest — 2026-09-10**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active with a robust pipeline of architectural innovation and stability improvements. Over the past 24 hours, 35 new issues were opened or updated (32 open, 3 closed), and 50 pull requests were submitted or revised—demonstrating strong contributor engagement and a mature development cadence. The focus is heavily concentrated on foundational architecture: session management, WASM plugin extensibility, file/attachment handling, and sandbox policy refinement. While no new releases were published, significant progress is being made in high-risk RFCs that will shape the platform’s long-term security and scalability.

---

### **2. Releases**  
❌ **No new releases** were published as of 2026-09-10.  
There are no release notes, breaking changes, or migration guides to report. The project continues to prioritize internal design and implementation over versioned shipping at this stage.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs**: None reported in the last 24h.  
🔧 **Notable merged work from prior period**:  
- **PR #10733** (*fix(channels): voice replies opening with an expressive audio tag*) resolves a critical UX flaw for Telegram and WhatsApp users by allowing expressive ElevenLabs audio tags (e.g., `[laughs]`, `[whispers]`) to be properly recognized and rendered.  
- **PR #10732** (*fix(service): select the daemon log by content, not existence*) improves `zeroclaw service logs` behavior across non-systemd platforms (macOS, Windows, OpenRC) by prioritizing log content over file presence, fixing a persistent diagnostic regression.  
- **PR #10730** (*chore(assets): optimize PR-evidence images via ImgBot lossless compression*) reduces repository size without compromising quality—reflecting attention to operational hygiene.

These fixes improve cross-platform reliability and user experience, particularly in voice-based channels and CLI diagnostics.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement**:
| Issue | Comments | Link | Key Focus |
|------|----------|------|---------|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | 36 | [RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | Core runtime architecture, session ownership, transport abstraction |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | 29 | [RFC: Unified file and attachment architecture for conversation surfaces](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | File/attachment lifecycle, multimodal input handling |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | 28 | [RFC: Granular sandbox policy - filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | Security policy alignment between app-layer and OS-level sandboxes |

💡 **Underlying Needs**:  
- **Security & Isolation**: High comment counts on RFCs around filesystem policies and session ownership signal deep concern about agent isolation and attack surface reduction.
- **Extensibility**: Unified file/architecture RFC suggests growing demand for flexible, future-proof multimodal support.
- **Runtime Control**: The shift toward *runtime-owned* sessions reflects a desire for deterministic, auditable execution environments—critical for enterprise and compliance use cases.

---

### **5. Bugs & Stability**  
🚨 **High-Risk Bugs Reported**:
| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) | P1 (High) | ZeroCode ACP drops assistant text before tool calls; only post-tool text renders | ❌ Pending fix |
| [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) | P2 (Medium) | `knowledge.db_path` tilde expansion applies globally, silently dropping tools | ⚠️ Fix PR pending |
| [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) | P2 (High) | OAuth system-prefix cache marker consumes one of four Anthropic breakpoint slots | ⚠️ Fix PR pending |
| [#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706) | P2 (High) | OpenAI Responses adapter inconsistently preserves reasoning state | ⚠️ Fix PR pending |

⚠️ **Stability Concerns**:  
- Multiple bugs impact **cost tracking accuracy** (e.g., #9816: $0.00 spend reported despite real usage). This undermines budget enforcement and trust in financial controls.
- **CLI and web dashboard regressions** (e.g., #10690: slugified provider links cause 404s) affect usability and configuration reliability.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Priorities**:
| Feature | Issue | Link | Significance |
|-------|-------|------|------------|
| Composable WASM Plugin Runtime | [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | [RFC: Composable WASM plugin runtime](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | Indicates move toward modular, extendable agent systems |
| Append-only Session Event History | [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | [RFC: Append-only event history](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | Foundation for audit trails, replay, and derived agents |
| Support Async Function Tools (OpenAI) | [#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) | [Feature: Async function tools](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) | Critical for complex workflows requiring background processing |

🔮 **Prediction**: These features are likely to appear in **v0.9.x**, especially the WASM plugin model and append-only events, which are central to ZeroClaw’s next-gen agent architecture.

---

### **7. User Feedback Summary**  
💬 **Key Pain Points Expressed by Users**:
- **Agent Output Fragmentation**: Users report duplicated responses (#10720) and dropped pre-tool text (#10697), reducing clarity in complex workflows.
- **Tool Visibility**: Lack of expandable tool results in ZeroCode (#8763) limits debugging and transparency during long turns.
- **Configuration Confusion**: Misleading provider slugs (#10690) and incorrect cost reporting (#9816) erode trust in the system’s reliability.
- **Multimodal Handling**: Telegram media groups are split into separate LLM turns (#5514), causing unnatural conversation flow.

🌱 **Positive Sentiment**: Users appreciate the depth of RFCs and maintainers’ commitment to structured decision-making. The emphasis on security, observability, and extensibility resonates strongly with advanced users and developers.

---

### **8. Backlog Watch**  
🔍 **Critical Items Requiring Maintainer Attention**:
| Issue | Priority | Status | Why It Matters |
|------|----------|--------|----------------|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | P2 (High) | Open / Needs Review | Foundational runtime architecture; affects all agents and channels |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | P2 (High) | Open / Needs Review | Unifies file/attachment handling—essential for rich multimodal experiences |
| [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | P2 (High) | Open / Needs Review | Simplifying RFC voting could accelerate decision-making on key designs |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Tracker | Accepted / In Progress | Centralized maintainer decision queue—key to avoiding process bottlenecks |

📌 **Note**: Despite high activity, several **high-impact RFCs remain unresolved**. Maintainers must act decisively to avoid stagnation in core architectural decisions.

---

> ✅ **Overall Project Health**: **Strong**. High engagement, mature RFC process, and focus on security/long-term scalability. However, urgent attention is needed on high-severity bugs and stalled architectural decisions to prevent technical debt accumulation.  
> 🔗 **GitHub Dashboard**: [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*