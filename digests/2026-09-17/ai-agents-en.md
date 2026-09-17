# OpenClaw Ecosystem Digest 2026-09-17

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-17 00:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-17**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with 500 new issues and 500 new pull requests reported in the past 24 hours—indicating intense community engagement and rapid iteration. A surge of critical stability and regression issues (P0/P1) highlights growing pressure on core system reliability, particularly around memory management, session state integrity, and update workflows. While no new releases have been published, a significant number of PRs are focused on performance tuning, refactoring, and fixing long-standing bugs, suggesting an imminent release cycle is underway. The ecosystem shows strong momentum but faces mounting technical debt in key subsystems.

---

### **2. Releases**  
❌ **No new releases** were published today.  
*Note:* The latest stable version remains **2026.9.4**, which has triggered multiple update failures and regressions across platforms (Windows, Linux, macOS). Maintainers are actively coordinating recovery efforts via [Issue #145252](https://github.com/openclaw/openclaw/issues/145252), tracking update, upgrade, and rollback reliability for 2026.9.3–9.4.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs:** *Not available in data* — all PRs listed are open.  
🛠️ **Key Advancements:**  
- **Performance & Stability Refactors:** Multiple high-impact refactor PRs (e.g., [#150414](https://github.com/openclaw/openclaw/pull/150414), [#150412](https://github.com/openclaw/openclaw/pull/150412)) aim to unify config contracts and reduce drift between runtime logic and schema definitions. These are foundational fixes for maintainability.
- **Update Recovery Fixes:** PRs like [#145169](https://github.com/openclaw/openclaw/pull/145169) address failed update rollbacks and preserve newer user data during Doctor repair—a critical path for production users.
- **Plugin & Session Optimization:** [#150274](https://github.com/openclaw/openclaw/pull/150274) reduces plugin reload overhead; [#150196](https://github.com/openclaw/openclaw/pull/150196) ensures session lists stay current without blocking Gateway thread.
- **UX Improvements:** PRs like [#150172](https://github.com/openclaw/openclaw/pull/150172) add title/URL filtering for browser tabs, improving discoverability.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Comment Count & Severity:**  
| Issue | Comments | Severity | Link |
|------|----------|----------|------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 30 | 🦞 Diamond Lobster (P1, crash-loop, message-loss) | Zombie process leak from hooks/tools |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 25 | 🦞 Diamond Lobster (P1, OOM crashes) | Gateway RSS grows from 350MB → 15.5GB |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 24 | 🦞 Diamond Lobster (P1, crash-loop) | MCP server init timeout triggers unhandled rejection |
| [#111897](https://github.com/openclaw/openclaw/issues/111897) | 19 | 🦪 Silver Shellfish (P1, message-loss) | Duplicate replies under load due to concurrent lane runs |

🔍 **Underlying Needs:**  
- **Stability at scale:** Users report catastrophic memory leaks and crashes in large fleets (632+ agents).
- **Deterministic session handling:** Concurrent execution, duplicate replies, and stale completion delivery indicate race condition risks in agent lifecycle management.
- **Update resilience:** Multiple P0 update failures suggest fragile migration paths and insufficient recovery mechanisms.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs Reported (P0/P1):**  
| Bug | Description | Fix PR? | Link |
|-----|-------------|--------|------|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | `main` branch: Gateway reaches ready but never serves; `/health` times out; event loop starved | ❌ No | [P0 UX Release Blocker] |
| [#148529](https://github.com/openclaw/openclaw/issues/148529) | 2026.9.4 takes ~12 minutes to start (vs. 2s in 2026.7.1-2) on 632-agent fleet | ❌ No | [P1 Regression] |
| [#150201](https://github.com/openclaw/openclaw/issues/150201) | Windows update fails: SQLite check times out on snapshot creation | ❌ No | [P0 UX Release Blocker] |
| [#146265](https://github.com/openclaw/openclaw/issues/146265) | After restart, shared `AsyncWorkScope` stays closed → all tools fail | ❌ No | [P1 Regression] |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | Reply lost when second run displaces in-flight turn | ❌ No | [P1 Message Loss] |

⚠️ **Regression Trends:**  
- 2026.9.3–9.4 updates are introducing **multiple regressions** (e.g., #144739, #146004, #148681), including silent fallbacks (#87407), heartbeat leaks (#143278), and orphaned sessions (#111897).

---

### **6. Feature Requests & Roadmap Signals**  
💡 **High-Priority User-Requested Features:**  
| Feature | Use Case | Link |
|-------|----------|------|
| One-way dispatch mode (no reply ping-pong) | Agent-to-agent handoffs without feedback loop | [#44309](https://github.com/openclaw/openclaw/issues/44309) |
| Persistent file-based provider cooldown fix | Prevent hours-long lockouts after billing recovery | [#70903](https://github.com/openclaw/openclaw/issues/70903) |
| Prune stale orphaned sessions | Clean up dashboard clutter from deleted channels | [#49259](https://github.com/openclaw/openclaw/issues/49259) |
| Native PowerShell smoke coverage | Improve contributor experience on Windows | [#44291](https://github.com/openclaw/openclaw/issues/44291) |

🔮 **Roadmap Prediction:**  
Given the volume of PRs around **refactoring contracts**, **plugin lifecycle**, and **update recovery**, the next stable release (likely **2026.10**) will likely focus on:
- **System stability & update resilience**
- **Improved plugin and session management**
- **Better developer tooling and cross-platform parity**

---

### **7. User Feedback Summary**  
👥 **Real User Pain Points:**  
- **“My gateway crashes daily due to OOM”** – Users report 15.5GB RSS growth over days ([#91588](https://github.com/openclaw/openclaw/issues/91588)).
- **“Updates keep failing”** – Multiple P0 reports confirm update blockers on Windows (`mkdir` fails with unexpanded env vars) and Linux (`schema-17 migration error`) ([#146719](https://github.com/openclaw/openclaw/issues/146719), [#148681](https://github.com/openclaw/openclaw/issues/148681)).
- **“I lose replies when two runs happen at once”** – Critical message-loss issue impacting productivity ([#111897](https://github.com/openclaw/openclaw/issues/111897)).
- **“WebChat starts blind — no context”** – New sessions lack prior conversation history, breaking continuity ([#99925](https://github.com/openclaw/openclaw/issues/99925)).

✅ **Satisfaction Signals:**  
- Positive sentiment around **CLI improvements** (e.g., `--title`, `--url-contains` filters in browser commands).
- Appreciation for **maintainer-led refactoring** (e.g., contract derivation from Zod schema), seen as long-term quality investment.

---

### **8. Backlog Watch**  
⏳ **Long-Unanswered or High-Impact Issues Needing Attention:**  
| Issue | Age | Status | Priority | Link |
|------|-----|--------|----------|------|
| [#86881](https://github.com/openclaw/openclaw/issues/86881) | 3 months | Closed (stale) | P2 | Gateway-lite mode without AI harness |
| [#31331](https://github.com/openclaw/openclaw/issues/31331) | 6 months | Closed (stale) | P1 | Docker + sandbox workspace access failure |
| [#94147](https://github.com/openclaw/openclaw/issues/94147) | 3 months | Closed (stale) | P2 | macOS CLLocationManager TCC permission spam |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | 4 months | Open | P0 | Persistent auth cooldown blocks users post-billing |
| [#111985](https://github.com/openclaw/openclaw/issues/111985) | 4 months | Closed | P1 | Memory-core sends OAuth token to OpenAI API |

🔧 **Action Required:**  
Maintainers should **re-open and triage** these high-severity, long-standing issues—especially those affecting **security**, **user experience**, and **cross-platform usability**—to prevent further erosion of trust.

---

> ✅ **Final Assessment:** OpenClaw is in a **high-stress, high-velocity phase**—technical debt is visible, but community-driven fixes are accelerating. Immediate focus must be on **stability, update reliability, and session integrity** to avoid mass user churn. The next release must prioritize **bugfixes over features**.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-17**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem is entering a pivotal maturity phase in mid-2026, marked by rapid iteration, growing production adoption, and increasing convergence on core reliability and operational resilience. Projects are shifting from feature experimentation to stability-focused development, with strong emphasis on session integrity, update recovery, memory management, and cross-platform consistency. While fragmentation persists in tooling and architecture, shared pain points across projects signal emerging industry standards for agent lifecycle control, state fidelity, and real-time communication. The landscape is now bifurcating into **personal productivity tools** (e.g., QwenPaw) and **enterprise-grade orchestration platforms** (e.g., OpenClaw, Hermes), with ZeroClaw positioning as a foundational security-hardened runtime.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Releases (Today) | Health Score* |
|--------|-------------------|----------------|------------------|---------------|
| **OpenClaw** | 500 | 500 | ❌ None | 🔴 **Low** |
| **Hermes Agent** | 50 | 50 | ❌ None | 🟡 **Medium** |
| **QwenPaw** | 25 | 37 | ❌ None | 🟢 **High** |
| **ZeroClaw** | 36 | 50 | ❌ None | 🟡 **Medium** |
| **IronClaw** | 0 | 0 | — | 🔴 **Inactive** |

> *Health Score: Based on stability risks, regression volume, fix velocity, community engagement, and release cadence. Ranges: 🔴 Low (<30%), 🟡 Medium (30–60%), 🟢 High (>60%)*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the **most technically ambitious and high-velocity project**, but also the most unstable. Its massive 500-issue/500-PR daily activity reflects deep internal refactoring and systemic instability—particularly around memory management, update workflows, and session state corruption. Compared to peers:
- **Advantages**: Strongest focus on foundational contracts (Zod schema derivation), plugin lifecycle optimization, and cross-platform UX polish.
- **Technical Approach**: Prioritizes architectural debt reduction via refactor-first strategy; less feature-driven than others.
- **Community Size**: Largest active contributor base among all projects, evidenced by comment volume and PR density. However, this scale amplifies risk of regressions due to lack of coordinated release discipline.

While OpenClaw leads in innovation potential, its current instability poses significant adoption barriers—making it more suitable for early adopters and developers than production teams.

---

### **4. Shared Technical Focus Areas**  
Multiple projects are converging on critical technical needs:

| Need | Projects Affected | Specific Requirements |
|------|-------------------|------------------------|
| **Session State Integrity** | OpenClaw, Hermes, QwenPaw, ZeroClaw | Prevent race conditions, duplicate replies, stale completion delivery; ensure thread-safe session persistence |
| **Update & Rollback Resilience** | OpenClaw, Hermes, QwenPaw | Fix failed updates, preserve user data during repair, avoid silent fallbacks or migration errors |
| **Memory & Resource Management** | OpenClaw, QwenPaw, ZeroClaw | Prevent OOM crashes, limit unbounded stream buffers, enforce automatic cleanup |
| **Real-Time Communication Stability** | QwenPaw, ZeroClaw, OpenClaw | Fix SSE null payloads, streaming freezes, and client-side error handling |
| **Security Hardening** | ZeroClaw, Hermes, QwenPaw | Patch vulnerable dependencies (e.g., `body-parser`), enforce authenticated RPC, prevent credential leakage |
| **Config & State Visibility** | ZeroClaw, OpenClaw, Hermes | Enable live config tracking, rollback readiness, and observability of applied changes |

These shared challenges indicate a maturing ecosystem where **operational reliability** is now a primary differentiator over novelty.

---

### **5. Differentiation Analysis**

| Project | Feature Focus | Target Users | Core Architecture |
|--------|---------------|--------------|-------------------|
| **OpenClaw** | Foundational system stability, plugin/session management | Developers, advanced users, platform integrators | Modular, contract-driven, Zod-based schema validation |
| **Hermes Agent** | Multi-agent coordination (MoA), session isolation, workflow transparency | Teams, developers, enterprise users | MoA-centric, Telegram/Discord bridge-heavy, GUI-first |
| **QwenPaw** | Team-scale collaboration, Hub multi-tenancy, real-time interactivity | Enterprises, distributed teams, DevOps | Desktop/server dual-mode, rich UI/UX, WebAssembly plugin support |
| **ZeroClaw** | Security hardening, runtime safety, policy enforcement | Infrastructure teams, secure deployments | Rust-based, OIDC+peercred auth, atomic config propagation |
| **IronClaw** | N/A (inactive) | — | — |

> ✅ **Key Differentiation**:  
> - **OpenClaw** = Architectural ambition at cost of stability  
> - **Hermes** = Advanced multi-agent UX with operational friction  
> - **QwenPaw** = Enterprise-ready team platform in active evolution  
> - **ZeroClaw** = Secure, auditable foundation for mission-critical systems  

---

### **6. Community Momentum & Maturity**

| Maturity Tier | Projects | Indicators |
|--------------|----------|-----------|
| **Rapid Iteration / High Stress** | OpenClaw | 500 issues/PRs/day, P0/P1 crash loops, urgent bugfix backlog |
| **Active Stabilization** | QwenPaw, ZeroClaw | High PR merge rate, focused on memory/streaming fixes, governance backlog |
| **Sustained Development** | Hermes Agent | Consistent 50-issue/PR rhythm, effective triage, stable release history |
| **Stagnant / Inactive** | IronClaw | No activity for >7 days, no visible progress |

> 📈 **Trend**: The ecosystem is **decentralizing into specialized roles**:
> - **OpenClaw** and **QwenPaw** are scaling toward **platform-level infrastructure**.
> - **Hermes** and **ZeroClaw** are refining **operational excellence** and **security posture**.
> - **IronClaw** has stalled—likely due to resource constraints or strategic pivot.

---

### **7. Trend Signals**  
Based on community feedback and PR trends, the following industry-wide shifts are emerging:

1. **From Novelty to Operational Maturity**  
   > Users now prioritize **stability, predictability, and auditability** over new features. Pain points like "I lose replies" or "updates fail" dominate discourse—indicating a shift from experimental use to real-world deployment.

2. **Team-Centric Workflows Are the New Norm**  
   > Demand for **multi-tenant hubs**, **role-based access**, **audit trails**, and **shared skill libraries** (QwenPaw #7318, Hermes #113625) shows that personal agents are evolving into **collaborative team systems**.

3. **Real-Time Interactivity Is Non-Negotiable**  
   > Streaming failures, image loss, and UI hangs are recurring issues across QwenPaw, ZeroClaw, and OpenClaw—highlighting the need for robust, resilient real-time protocols (SSE, WebSocket) with proper error boundaries.

4. **Security & Governance Must Scale Proactively**  
   > Projects are investing heavily in **authenticated RPC**, **dependency hygiene**, and **decision tracking** (ZeroClaw #8692, #10118). This signals a move toward **compliance-ready** agent systems.

5. **Developer Tooling Is a Competitive Advantage**  
   > CLI improvements (OpenClaw), HUD teaching plugins (Hermes), and i18n support (QwenPaw) show that **onboarding experience** directly impacts adoption and retention.

---

### ✅ **Strategic Recommendation for AI Agent Developers**  
Prioritize **stability and operational resilience** over feature velocity. Select projects based on maturity tier:
- For **production systems**: Choose **Hermes Agent** (v0.21.3+) or **QwenPaw** (v2.2.1+) with caution on bleeding-edge builds.
- For **infrastructure layering**: Evaluate **ZeroClaw** for secure, auditable execution environments.
- For **innovation labs**: Engage with **OpenClaw** only if equipped for patching and debugging.

> ⚠️ **Warning**: Avoid any project with unresolved P0 bugs and no recent release cadence unless you're prepared to contribute fixes.

---  
**Prepared by:** Senior Analyst, AI Agent & Personal Assistant Ecosystem  
**Date:** 2026-09-17

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-17**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pace of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across multiple components. Despite no new releases, significant engineering efforts are focused on **session isolation, message delivery reliability, fallback behavior, and security hardening**, particularly around MoA (Model-of-Agents) workflows and gateway stability. The high volume of closed PRs and issues reflects strong triage and resolution capacity, while open items suggest deep technical challenges in state management, concurrency, and cross-platform consistency.

---

### **2. Releases**  
**No new releases** were published today. The latest version remains **v0.16.0 (2026.6.5)**, with v0.21.3 (2026.9.14) being the most recent stable release referenced in recent bug reports. No breaking changes or migration notes are currently documented, though several fixes address critical behavioral inconsistencies in fallback logic and session persistence.

> 🔗 [GitHub Releases](https://github.com/nousresearch/hermes-agent/releases)

---

### **3. Project Progress**  
**19 Pull Requests merged/closed today**, primarily focused on:
- **Session & state integrity**: Fixes for `hermes update` lockfile desync (`#112378`), `cli` session persistence (`#113211`), and `HERMES_HOME` warning spam (`#113216`).
- **MoA UX improvements**: Clarifying billing attribution (`#112359`) and resolving model slug loss during fallback (`#112525`, `#112359`).
- **Security hardening**: Patching vulnerable `body-parser` in WhatsApp bridge (`#112382`), fixing file write guards under profile-home deployments (`#113628`).
- **Gateway reliability**: Addressing Telegram stall watchdog failure (`#113618`), Discord backfill loops (`#113631`), and persistent connection handling (`#113553`).

These merges signal strong focus on **operational resilience** and **user trust** in multi-session and distributed environments.

> 🔗 [PR #113213](https://github.com/nousresearch/hermes-agent/pull/113213) | [PR #113169](https://github.com/nousresearch/hermes-agent/pull/113169) | [PR #113553](https://github.com/nousresearch/hermes-agent/pull/113553)

---

### **4. Community Hot Topics**  
Top community concerns center on **state corruption**, **message delivery failures**, and **MoA usability gaps**:

- **Concurrent Session Isolation Failure** (`#46303`): 8 comments; users report shared memory injection and git worktree contamination between sessions — a **P2 critical issue** affecting desktop GUI stability.  
  > 🔗 [Issue #46303](https://github.com/nousresearch/hermes-agent/issues/46303)

- **Telegram Gateway Stall Without Recovery** (`#113618`): 2 comments; gateway becomes "deaf" after update, requiring process restart — a **P1 severity** risk to real-time communication.  
  > 🔗 [Issue #113618](https://github.com/nousresearch/hermes-agent/issues/113618)

- **Discord Missed-Message Backfill Loop** (`#113631`): 0 comments but high impact; same message re-dispatched 24 times over 12 hours due to missing reply anchor.  
  > 🔗 [Issue #113631](https://github.com/nousresearch/hermes-agent/issues/113631)

These reflect growing demand for **robust session isolation**, **persistent messaging**, and **predictable agent state transitions** — especially in production or team-use scenarios.

---

### **5. Bugs & Stability**  
Critical stability issues reported today include:

| Severity | Issue | Summary | Fix PR? |
|--------|------|--------|--------|
| **P1** | `#113618` | Telegram gateway stalls after update; never recovers without restart | ✅ *PR #113618 pending* |
| **P1** | `#113031` | `NO_REPLY` silence marker triggers false warnings on heartbeat | ❌ *Closed but not resolved* |
| **P2** | `#46303` | Concurrent sessions share memory/git worktree → data leakage | ❌ *Open, high priority* |
| **P2** | `#112525` | Fallback to MoA discards resolved aggregator model slug | ✅ *PR #112525 merged* |
| **P2** | `#112909` | Codex watchdog kills long reasoning on small prompts | ✅ *PR #113169 merged* |

Several P1/P2 bugs affect **core user experience** (e.g., UI feedback, message delivery, session continuity). While some have fix PRs, others remain unresolved, posing risks for enterprise or continuous-use deployments.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging feature signals point toward **enhanced visibility**, **agent-to-agent coordination**, and **workflow control**:

- **Agent-to-Agent Turn Tagging** (`#113625`): Proposes tagging bot-authored turns to exclude from user recall — a sign of growing interest in **multi-agent collaboration**.
- **Tool Approval Streaming** (`#113606`): Surface tool approvals in live chat stream — indicates demand for **real-time transparency** in guarded actions.
- **Per-Turn Tool Budgets** (`#113607`): Limiting tool calls per room turn to prevent congestion — shows awareness of **resource governance** in group workflows.
- **HUD Teaching Plugin** (`#113635`): Adds interactive how-to overlays in Mac app — signals desire for **onboarding and discoverability tools**.

These features suggest Hermes is maturing beyond solo agents into **cooperative, team-oriented AI workflows**, likely targeting advanced users and developers.

> 🔗 [PR #113625](https://github.com/nousresearch/hermes-agent/pull/113625) | [PR #113606](https://github.com/nousresearch/hermes-agent/pull/113606) | [PR #113635](https://github.com/nousresearch/hermes-agent/pull/113635)

---

### **7. User Feedback Summary**  
User pain points cluster around three themes:

1. **Unreliable Session State**: Users report sessions turning green mid-turn (`#113029`), or disappearing after completion despite ongoing processing — eroding trust in progress tracking.
2. **Frustrating Fallback Behavior**: Billing confusion (`#112359`) and model name misrepresentation (`#112525`) indicate poor UX in MoA fallback chains — users feel they're paying for one model while another runs.
3. **Hidden Failures**: Silent STT errors (`#112582`), unreported worker crashes (`#113610`), and ghost messages (`#113631`) make debugging difficult, especially in automated cron jobs.

Users value **transparency**, **predictability**, and **auditability** — suggesting a shift from novelty to operational maturity.

---

### **8. Backlog Watch**  
High-priority, long-standing issues needing maintainer attention:

- **`#46303` Concurrent Sessions Cross-Contaminate** – Open since June 2026, 8 comments; **P2, critical for GUI/desktop use**. No fix PR yet.  
  > 🔗 [Issue #46303](https://github.com/nousresearch/hermes-agent/issues/46303)

- **`#112382` WhatsApp Bridge Vulnerability** – Fixed in PR but still present in `main`; requires urgent audit.  
  > 🔗 [Issue #112382](https://github.com/nousresearch/hermes-agent/issues/112382)

- **`#113611` Kanban Respawn Guard Incomplete** – 16 consecutive respawns on one card; root cause known but no fix PR.  
  > 🔗 [Issue #113611](https://github.com/nousresearch/hermes-agent/issues/113611)

- **`#113628` File Write Guards Under Profile-Home Deployments** – Security risk: credential checks anchored to process HOME, not profile HOME.  
  > 🔗 [Issue #113628](https://github.com/nousresearch/hermes-agent/issues/113628)

These represent **technical debt** that could escalate into larger outages if unaddressed.

---

**Final Assessment**: Hermes Agent is in a **high-growth, high-intensity phase** — mature enough for real-world use but still wrestling with concurrency, state management, and UX clarity. The project is **healthy and well-maintained**, with strong community engagement and rapid response to critical issues. Future releases will likely prioritize **stability, isolation, and transparency** over new features.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-17**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust development momentum: **25 new issues and 37 pull requests updated in the last 24 hours**, indicating strong community engagement and ongoing feature development. While no new releases were published, the project is clearly preparing for a major update—likely **v2.2.1 or v2.3.0**—with multiple stability fixes, UI/UX improvements, and foundational work on **multi-tenant Hub capabilities**. The influx of bug reports around memory exhaustion, streaming failures, and channel-specific edge cases suggests growing adoption in production environments, especially for team-based workflows.

---

### **2. Releases**  
❌ **No new releases** were published today.  
The latest stable version remains **v2.2.0**, with several hotfixes pending in PRs (e.g., #7811, #7816). Users are likely running bleeding-edge builds via `main` or pre-release tags (e.g., `v2.2.1b1`), as evidenced by frequent issue reports tied to recent changes. No breaking changes have been announced, but users should expect potential runtime updates in upcoming patches.

> 🔗 [GitHub Release History](https://github.com/agentscope-ai/QwenPaw/releases)

---

### **3. Project Progress**  
✅ **12 PRs merged/closed** today, including critical stability and UX fixes:
- **#7811** (`fix(token-usage)`): Now shows accurate context size in the chat ring — addresses a long-standing misrepresentation of token usage.
- **#7805** (`fix: match settings menu font weight`): Minor but important visual consistency fix improving UI polish.
- **#7783** (`fix(ACP)`): Resolves duplicate/fragmented ACP replies during delegation — improves reliability in agent orchestration.
- **#6569** (`fix(console)`: Suppresses EIO/EPIPE errors after terminal detachment — enhances background service resilience.
- **#7760** (`fix(cli)`): Ensures memory jobs drain cleanly on shutdown — prevents data loss in long-running processes.

These fixes reflect a focus on **stability, user experience, and production readiness**, particularly for desktop and server deployments.

---

### **4. Community Hot Topics**  
🔥 **Top 3 Most Active Issues (by comments/reactions)**:

1. **#7318 [OPEN] QwenPaw Hub: Multi-tenant edition coming in 2.2.0 — What should we build next?**  
   - 📌 **29 comments**, **4 upvotes**  
   - **Summary**: The community is eager for enterprise-grade collaboration features. This is a direct response to repeated demand (#2324) for multi-user access and admin-managed skills.  
   - 🔗 [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)  
   - 💡 **Need**: Team-level role management, model governance, audit trails, and shared skill libraries.

2. **#7722 [OPEN] Memory exhaustion from three compounding paths**  
   - 📌 **5 comments**, **0 upvotes**  
   - **Summary**: Critical performance regression causing OOM crashes at ~1MB/s due to unbounded stream buffers, keep-alive stacking, and doom-loop evasion.  
   - 🔗 [Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)  
   - 💡 **Need**: System-level resource limits, automatic cleanup, and monitoring hooks — urgent for cloud/server deployments.

3. **#7815 [OPEN] Console fails to recover from lazy page load failure**  
   - 📌 **4 comments**, **0 upvotes**  
   - **Summary**: UI hangs permanently after failed lazy load; only full reload resolves it. Despite retry logic, error boundary fails.  
   - 🔗 [Issue #7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)  
   - 💡 **Need**: Robust error recovery, fallback rendering, and better client-side resilience.

👉 These issues signal that **team use cases, scalability, and UI reliability** are now top priorities for the community.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs Reported (Ranked by Severity)**:

| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| **#7722** ([Memory exhaustion](https://github.com/agentscope-ai/QwenPaw/issues/7722)) | ⚠️ High | Three compounding paths cause rapid memory growth → OOM → service hang. Affects all deployments. | ❌ Not yet fixed |
| **#7813** ([SSE null payload freezes stream](https://github.com/agentscope-ai/QwenPaw/issues/7813)) | ⚠️ High | Malformed `null` SSE frame halts entire streaming turn. Silent failure. | ❌ No PR yet |
| **#7814** ([SSE emits bare `null` payload](https://github.com/agentscope-ai/QwenPaw/issues/7814)) | ⚠️ Medium | Invalid SSE event format breaks client parsing. | ❌ No PR yet |
| **#7815** ([Console stuck on error screen](https://github.com/agentscope-ai/QwenPaw/issues/7815)) | ⚠️ Medium | UI doesn’t recover after failed lazy load — poor UX. | ❌ No PR yet |
| **#7799** ([Images disappear after send_file_to_user](https://github.com/agentscope-ai/QwenPaw/issues/7799)) | ⚠️ Medium | Images briefly appear then vanish post-stream. Recurring bug (#5320). | ✅ Fix PR in progress (PR #7811) |

> 🔥 **Note**: Multiple streaming/SSE-related bugs suggest deep issues in the real-time communication layer. A coordinated patch may be needed.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Themes for Next Version (v2.3.0?)**:

- **Multi-tenant Hub (v2.2.0+)**: With **#7318** driving discussion, expect official support for:
  - Organization-wide model gateways
  - Member governance and access control
  - Usage dashboards (as seen in PR #7779)
- **Realtime Voice Chat** ([#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785)): First-class voice input/output integration — signals shift toward multimodal interaction.
- **i18n Support for Tool Cards** ([#7809](https://github.com/agentscope-ai/QwenPaw/issues/7809)): Demand for global usability — indicates international expansion plans.
- **Task Completion Alerts** ([#7800](https://github.com/agentscope-ai/QwenPaw/issues/7800)): Visual status cues (orange alerts) in system tray — desired for large-screen workflows.
- **Cleaner Output Artifacts** ([#7797](https://github.com/agentscope-ai/QwenPaw/issues/7797)): Request to suppress intermediate/temporary files — reflects need for polished deliverables.

📌 **Prediction**: **v2.3.0** will likely focus on **enterprise scalability, real-time interactivity, and output refinement**.

---

### **7. User Feedback Summary**  
👥 **User Pain Points & Use Cases**:

- **Enterprise Adoption**: Teams want centralized model access, admin controls, and audit logs (via Hub).
- **Desktop Reliability**: Users report crashes after startup (`#7812`), freezing during file operations (`#7725`), and broken state after session resets.
- **Visual Clarity**: Frustration with missing images (`#7799`), confusing context sizes (`#7810`), and cluttered outputs (`#7797`).
- **Channel Integration**: Issues with WeChat video/audio links (`#7792`), Feishu p2p messaging (`#7817`), and Discord message handling — indicate need for deeper platform testing.
- **LLM Safety Concerns**: Users request better tool approval mechanisms and protection against shell injection (`#7120`).

💡 **Sentiment**: Overall positive — users are deeply invested and provide detailed repro steps. However, **stability and clarity** remain key barriers to broader adoption.

---

### **8. Backlog Watch**  
🔍 **Longstanding Issues Needing Maintainer Attention**:

- **#7722** ([Memory exhaustion](https://github.com/agentscope-ai/QwenPaw/issues/7722))  
  > *Three compounding root causes. No fix yet despite high severity. Should be prioritized.*
- **#7318** ([QwenPaw Hub roadmap](https://github.com/agentscope-ai/QwenPaw/issues/7318))  
  > *Community-driven vision for Hub. Needs official response to guide development.*
- **#7730** ([Plugin catalog offline fallback](https://github.com/agentscope-ai/QwenPaw/issues/7730))  
  > *Fails silently when disconnected — violates documented offline behavior.*
- **#7406** ([Theming support](https://github.com/agentscope-ai/QwenPaw/issues/7406))  
  > *Users manually edit `.app` bundles — not sustainable. Clear UX improvement need.*
- **#7650** ([Passing channel params to MCP tools](https://github.com/agentscope-ai/QwenPaw/issues/7650))  
  > *Security-sensitive parameter passing — crucial for enterprise integrations.*

> 🛠️ **Recommendation**: Assign dedicated maintainers to triage these high-impact, low-hanging-fruit issues.

---

### ✅ **Final Assessment**  
QwenPaw is **healthy, evolving rapidly, and maturing into an enterprise-ready AI agent platform**. The project is transitioning from personal assistant to **team-scale workflow orchestrator**, driven by community demand. While technical debt and stability risks persist (especially around memory and streaming), the pace of PRs and quality of contributions indicate strong project health. **Next 6–8 weeks will be pivotal** — expect a major release focused on **Hub, stability, and real-time interactivity**.

🔔 *Stay tuned for v2.2.1 (or v2.3.0) — likely to include Hub MVP, memory fixes, and i18n.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-17  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active with 50 open pull requests and 36 open issues updated in the last 24 hours, indicating strong ongoing development momentum. The activity is concentrated in security hardening, runtime stability, agent lifecycle coordination, and support for new provider integrations—particularly around OpenAI-compatible backends and asynchronous tooling. Despite no new releases, multiple high-severity fixes and architectural refinements are being advanced through PRs, suggesting a pre-release stabilization phase focused on reliability and policy enforcement.

---

### **2. Releases**

❌ **No new releases** were published today or in the past 7 days.  
The project continues to operate on `master` without formal versioned releases, consistent with its current focus on internal infrastructure improvements and security hardening ahead of future v0.9.0+ milestones.

> 🔗 *No release notes available.*

---

### **3. Project Progress**

✅ **Merged / Closed PRs (Today):**  
- **PR #10134** – [`fix(runtime): keep agent dispatch panic-free`](https://github.com/zeroclaw-labs/zeroclaw/pull/10134)  
  - Converted 17 potential panic sites across runtime, turn, and skills paths into safe error returns or fail-closed fallbacks. Critical for stability in production environments.
- **PR #10885** – [`bug: tool-returned images disappear after unrelated tool call`](https://github.com/zeroclaw-labs/zeroclaw/pull/10885)  
  - Fixed image state leakage in multi-tool turns; now properly preserved during model context switching.

✅ **Notable Merged Features & Fixes:**  
- **PR #10525** – Reintroduced relay-terminated browser enrollment frontdoor (phase 1), removing hand-rolled TLS and improving trust transparency.  
- **PR #9283** – Decompressed gzip/brotli/deflate responses in `web_fetch`, fixing content corruption and performance issues.  
- **PR #10259** – Enforced authenticated principals on RPC using native+peercred, advancing OIDC-based access control (supersedes partial #8672).  

These updates reflect a strategic push toward secure, auditable, and reliable execution environments.

---

### **4. Community Hot Topics**

🔥 **Top Issues by Comment Count & Activity:**

| Issue | Summary | Link | Key Insight |
|------|--------|------|-----------|
| [#10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) | Rust anti-slop policy debt remediation (307 candidates flagged) | [Issue #10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) | Indicates systemic code hygiene challenges; requires cross-team coordination. High-risk cleanup effort underway. |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Maintainer decision queue for RFCs/designs | [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Signals growing governance complexity; need for formalized decision tracking as feature scope expands. |
| [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | Remove unmaintained `bitmaps` advisory waiver (RUSTSEC-2026-0247) | [Issue #9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | Security CI failure due to outdated dependency; urgent fix needed to avoid build breaks. |

🔥 **Top PRs by Engagement:**
- **PR #10621** – [`feat(runtime): coordinate agent lifecycle mutations`](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)  
  - XL-sized change unifying config management across daemon, gateway, and channels. Likely to be foundational for future zero-downtime upgrades.
- **PR #10911** – [`feat(config): publish atomic live revisions`](https://github.com/zeroclaw-labs/zeroclaw/pull/10911)  
  - Stacked on #10621; introduces live config publication and per-target apply tracking—key for observability and rollback readiness.

💡 **Underlying Need:** As ZeroClaw scales toward enterprise-grade deployment, community attention is shifting from feature innovation to **operational resilience**, **secure configuration propagation**, and **governance clarity**.

---

### **5. Bugs & Stability**

⚠️ **High-Risk Bugs Reported (Severity S2–S3):**

| Issue | Description | Status | Fix PR? |
|------|-------------|--------|--------|
| [#10885](https://github.com/zeroclaw-labs/zeroclaw/issues/10885) | Tool-returned images vanish after unrelated tool calls | Open | ✅ Yes — merged in PR #10885 |
| [#10887](https://github.com/zeroclaw-labs/zeroclaw/issues/10887) | Non-vision capability gate fails on marker-shaped prose | Open | ❌ No |
| [#10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912) | Streaming text guard suppresses replies when quoting tool results | Open | ❌ No |
| [#10883](https://github.com/zeroclaw-labs/zeroclaw/issues/10883) | Telegram media-group test times out under parallel CI runs | Open | ❌ No |

📌 **Stability Focus:** Multiple concurrency and state-handling bugs suggest stress points in the agent turn engine and async tool orchestration. These require deeper testing and possibly refactorings to ensure deterministic behavior in high-load scenarios.

---

### **6. Feature Requests & Roadmap Signals**

🚀 **Emerging Roadmap Themes (Next 1–2 Quarters):**

| Feature Request | Priority | Status | Predicted Inclusion |
|------------------|----------|--------|---------------------|
| [#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) | Async function tools with OpenAI responses | P2 | Likely in v0.9.0 |
| [#10634](https://github.com/zeroclaw-labs/zeroclaw/issues/10634) | Recover network-interrupted provider turns safely | P1 | High probability in next release |
| [#9687](https://github.com/zeroclaw-labs/zeroclaw/issues/9687) | SOP operator pause/resume at step boundaries | P2 | MVP candidate post-v0.8.5 |
| [#7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) | OCI-compliant registries for WASM plugins | P3 | Long-term vision; likely delayed until v1.0 |
| [#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) | Restore proactive token-budget context compaction | P1 | Critical for cost control and scaling |

🔍 **Prediction:** The next major update will prioritize **resilience**, **asynchronous workflows**, and **config observability**, with minimal breaking changes—aligning with a matured, production-ready posture.

---

### **7. User Feedback Summary**

🗣️ **Real User Pain Points Observed:**

- **Image Handling Flaws**: Users report losing visual outputs mid-turn when calling unrelated tools (#10885), disrupting workflows involving image analysis or reporting.
- **Tool Result Parsing Errors**: Prose containing JSON-like syntax triggers false positives in streaming guards (#10912), leading to partial or missing responses.
- **Lack of Config Visibility**: Operators cannot tell which running agents adopted a config change (#10892), creating operational blind spots in team deployments.
- **Security Anxiety**: Dependency warnings like RUSTSEC-2026-0247 (#9899) raise concerns about long-term maintainability and auditability.

🎯 **User Satisfaction Indicators:**  
Positive sentiment around recent security and RPC improvements (e.g., #10259, #10525), but frustration persists over **unpredictable state loss** and **lack of visibility into system health**.

---

### **8. Backlog Watch**

⚠️ **Long-Pending, High-Impact Items Needing Attention:**

| Issue | Age | Risk | Why It Matters |
|------|-----|------|---------------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) – Maintainer decision queue | 2 months | High | Without this, RFCs and design proposals stall; threatens long-term governance scalability. |
| [#10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) – Rust anti-slop debt cleanup | 2 weeks | High | 307 flagged files indicate systemic quality decay; blocks future refactoring. |
| [#9511](https://github.com/zeroclaw-labs/zeroclaw/issues/9511) – Surface Semgrep findings in PR comments | 2 months | Medium | Currently only visible in SARIF tab; low adoption rate among contributors. |
| [#10579](https://github.com/zeroclaw-labs/zeroclaw/issues/10579) – Broken Reference docs links | 1 week | Low | Minor UX issue but damages credibility of documentation ecosystem. |

🔔 **Recommendation:** Assign dedicated owners to track and resolve these backlog items—especially governance and code hygiene issues—to prevent technical debt accumulation.

---

## ✅ **Final Assessment: Project Health – Strong, But Scaling Challenges Loom**

ZeroClaw is in a **high-growth, stability-focused phase** with robust developer engagement and a clear path toward production readiness. The team is proactively addressing security, state consistency, and configurability—hallmarks of mature systems. However, the increasing number of high-severity issues and complex dependencies signal that **governance, automation, and documentation must scale in tandem**.

> 📊 **Trend Indicator:** 36 open issues + 50 PRs = **active development pipeline**; 10+ high-risk bugs = **stabilization priority**.

**Next Step:** Prioritize merging and triaging the top 5 backlog items, especially those blocking governance and security hygiene, before launching next major iteration.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*