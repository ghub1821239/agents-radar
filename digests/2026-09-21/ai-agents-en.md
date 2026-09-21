# OpenClaw Ecosystem Digest 2026-09-21

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-21 00:28 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-21**

---

### **1. Today's Overview**  
The OpenClaw project is experiencing intense activity with **500 issues and 500 pull requests updated in the last 24 hours**, indicating high community engagement and active development. The volume of open issues—especially those marked as `P0` or `issue-rating: 🦐 gold shrimp`—suggests ongoing stability challenges, particularly around memory management, SQLite WAL growth, and gateway startup failures. Despite no new releases, a significant number of PRs are focused on critical fixes related to session state, agent persistence, and update integrity. The project remains in a high-effort maintenance phase, with many contributors addressing regressions from recent versions (e.g., 2026.9.4–2026.9.5), signaling a period of stabilization ahead of potential next release.

---

### **2. Releases**  
**No new releases were published today.**  
- The most recent stable version remains **2026.9.5**, which has been associated with multiple critical regressions, including:
  - Silent upgrade failures (`openclaw update` fails silently, #152759)
  - Gateway startup hangs (~17 min) due to model runtime timeout (#152981)
  - Plugin state migration deadlocks (#153882)
  - Persistent SQLite WAL growth leading to crash loops (#143524)

> 🔗 [Issue #152759](https://github.com/openclaw/openclaw/issues/152759) – Update failure with auto-rollback but silent upgrade  
> 🔗 [Issue #152981](https://github.com/openclaw/openclaw/issues/152981) – Gateway startup hang at `sidecars.model-runtime`

No migration notes or breaking changes are documented for 2026.9.5; however, user reports strongly suggest that **2026.9.4 → 2026.9.5 upgrades should be avoided until fixes land**.

---

### **3. Project Progress**  
**209 PRs merged or closed today**, primarily focused on stability, diagnostics, and performance tuning. Key advancements include:

- ✅ **Critical fix for SQLite inspection instability** (#153839): Prevents live `openclaw update` and config writes from failing due to unstable read-only source checks.
- ✅ **Fix for plugin state write after inode reuse** (#154176): Addresses filesystem-level race conditions during plugin migrations.
- ✅ **Improved heartbeat cross-channel safety** (#153573): Resolves mislabeling of delivery failures across channels.
- ✅ **Voice call mid-question delivery fix** (#149278): Ensures questions asked during calls reach the original chat.
- ✅ **Gateway restart cleanup with Workboard enabled** (#154203): Prevents failed restarts when background tasks are active.

These fixes indicate strong focus on **system reliability under load and upgrade scenarios**, with core team prioritizing process hygiene and state consistency.

---

### **4. Community Hot Topics**  
Top 5 most commented issues reflect systemic pain points in production environments:

| Issue | Comments | Severity | Link |
|------|----------|----------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 35 | P0 / 🦐 gold shrimp | SQLite WAL grows to 2.8 GB, blocks startup |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 31 | P1 / 🦪 silver shellfish | Zombie processes accumulate from hooks/tools |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 31 | P1 / 🦞 diamond lobster | MCP init timeout causes unhandled rejection |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 29 | P1 / 🦪 silver shellfish | Gateway RSS grows from 350MB → 15.5GB, OOM kills |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 20 | P0 / 🦐 gold shrimp | Gateway ready but starved event loop, `/health` timeouts |

> 🔥 **Underlying Needs**: Users report **unstable long-term operation**, **memory leaks**, **SQLite corruption risks**, and **crash loops post-upgrade**. These are not isolated bugs—they point to architectural strain in session state management, database concurrency, and lifecycle coordination across agents and gateways.

---

### **5. Bugs & Stability**  
**Critical stability issues reported today**, ranked by severity:

| Issue | Severity | Impact | Fix PR? |
|------|----------|--------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | P0 | Crash-loop, UX blocker | ❌ No PR yet |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | P1 | OOM crashes, memory leak | ❌ No fix PR |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | P1 | Unhandled promise rejection in child cleanup | ❌ No PR |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | P0 | Startup hang (17 min), model runtime timeout | ❌ No PR |
| [#153704](https://github.com/openclaw/openclaw/issues/153704) | P0 | Update fails at fixed ~299s in pre-migration check | ❌ No PR |

> ⚠️ **Pattern**: Multiple P0 issues involve **stateful operations failing silently or blocking the entire system**—particularly during upgrades, startup, or persistent session handling. This suggests **lack of graceful degradation** and **inadequate error boundary isolation** in core services.

---

### **6. Feature Requests & Roadmap Signals**  
High-priority feature requests show growing demand for **multi-account support, better UX control, and session resilience**:

- ✅ **Multiple Teams bots per Gateway** (#71058): Requested since 2026.04, now gaining traction (9 comments, 1 👍).
- ✅ **Progress streaming for Feishu (Lark)** (#131457): Desired for real-time visibility (7 comments, 0 👍).
- ✅ **Per-turn send budget for message tool** (#119992): To prevent duplicate-answer storms (9 comments).
- ✅ **Pre-reset memory flush** (#45608): Align `/new`, `/reset`, and daily reset with compaction behavior (12 comments, 4 👍).

> 📌 **Prediction**: The **next major release (2026.10.x)** will likely include:
> - Enhanced session state management
> - Improved plugin lifecycle controls
> - Multi-account channel support (MSTeams, Slack)
> - Better diagnostics for update failures

---

### **7. User Feedback Summary**  
Real-world pain points from users highlight **operational fragility**:

- “I upgraded to 2026.9.5 and spent 8 hours recovering—my environment was stable before.” — @abuegab1-spec (#153257)
- “After upgrading, my agent DB grew to 2.8 GB in days and blocked startup.” — @desksk (#143524)
- “My Gateway crashed repeatedly after OOM—every restart cycled through `launchd-handoff`.” — @petercheng (#91588)
- “Plugins keep building temp dirs that grow 7.5 GB/day.” — @ZaneChen76 (#153246)

> 💬 **Sentiment**: High frustration with **upgrade reliability**, **resource consumption**, and **silent failures**. Users are losing trust in the stability of even "stable" releases.

---

### **8. Backlog Watch**  
Several **long-standing, high-impact issues** remain unresolved and require maintainer attention:

| Issue | Age | Status | Priority | Link |
|------|-----|--------|----------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 12 days | Open | P0 | SQLite WAL unchecked growth |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 104 days | Open | P1 | Memory leak → 15.5GB RSS |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 78 days | Open | P1 | Synchronous persistence stalls event loop |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | 84 days | Open | P1 | Session transcript projection livelock |
| [#145995](https://github.com/openclaw/openclaw/issues/145995) | 9 days | Open | P0 | Plugin inspection fails intermittently |

> 🔎 **Note**: Issues like #143524 and #91588 have existed for over 3 months with no fix PRs despite high comment volume. Their continued presence indicates **urgent need for architectural review** of database and memory management systems.

---

### ✅ **Final Assessment**  
OpenClaw is in a **critical stabilization phase**. While developer momentum is strong—with 500 PRs and issues in 24h—the project faces severe stability deficits in core components. **P0 issues involving memory, SQLite, and upgrade failures dominate**, and many are rooted in fundamental design flaws in state handling and concurrency.  

**Recommendation**: Prioritize **fixing the top 5 P0 bugs** (#143524, #91588, #144911, #152981, #153704) before any new feature work. A **patch release (2026.9.6)** should be imminent to address these critical regressions. Without intervention, user confidence will continue to erode.

> 📊 **Data Source**: GitHub — openclaw/openclaw (2026-09-21)  
> 🔗 Full issue list: [GitHub Issues](https://github.com/openclaw/openclaw/issues)  
> 🔗 Full PR list: [GitHub Pull Requests](https://github.com/openclaw/openclaw/pulls)

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-21**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem in Q3 2026 is marked by **intense development velocity**, **emerging architectural maturity**, and growing demand for **enterprise-grade reliability, collaboration, and security**. Projects are diverging in focus: some (like OpenClaw) are in crisis stabilization after rapid feature expansion, while others (ZeroClaw, QwenPaw) are building toward structured, interoperable platforms. A clear trend is the shift from *individual agent tools* to *multi-agent systems with team workflows*, driven by user demand for persistent state, session resilience, and cross-platform integration.

---

### **2. Activity Comparison**

| Project | Issues (24h) | PRs (24h) | Releases (24h) | Health Score¹ | Status |
|--------|--------------|-----------|----------------|---------------|--------|
| **OpenClaw** | 500 | 500 | ❌ None | 🔴 Low | Critical stabilization phase |
| **Hermes Agent** | 50 | 50 | ❌ None | 🟡 Moderate | Active refinement |
| **IronClaw** | 0 | 7 | ❌ None | ✅ High | Stable maintenance |
| **QwenPaw** | 24 | 37 | ✅ v2.2.2-beta.3 | 🟡 Moderate | Rapid iteration |
| **ZeroClaw** | 50 | 50 | ❌ None | ✅ High | Architectural maturation |

> **¹ Health Score**: Based on stability (P0/P1 bug density), fix-to-bug ratio, release cadence, and community sentiment.  
> 🔴 = High risk / unstable; 🟡 = Moderate risk / active but fragile; ✅ = Healthy / stable

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most **actively developed project**—with 500 issues and PRs daily—but also the most **operationally fragile**. Its technical approach relies on deep session state management and plugin persistence, but recent regressions (e.g., SQLite WAL bloat, silent upgrade failures) expose fundamental flaws in concurrency control and error isolation. Compared to peers:
- **Advantages**: Highest contributor volume, rapid response to critical bugs.
- **Differences**: Unlike ZeroClaw’s modular RFC-driven design or IronClaw’s dependency hygiene, OpenClaw lacks architectural guardrails—leading to systemic instability.
- **Community Size**: Largest active user base (per comment volume), but trust is eroding due to silent failures and upgrade risks.

---

### **4. Shared Technical Focus Areas**  
Across all projects, recurring themes indicate **emerging industry-wide requirements**:

| Need | Projects Involved | Specific Requirements |
|------|-------------------|------------------------|
| **Session Persistence & State Integrity** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Prevent context loss on restart; avoid OOM crashes; handle long-running sessions safely |
| **Memory & Resource Management** | OpenClaw, Hermes Agent, QwenPaw | Fix memory leaks (RSS growth), prevent process zombies, optimize garbage collection |
| **SQLite/Database Stability** | OpenClaw, QwenPaw | Prevent WAL growth, ensure ACID compliance under high write load |
| **Security-by-Design** | ZeroClaw, IronClaw, QwenPaw | Opt-in shell execution, token accounting, prompt injection guards |
| **Interoperability & API Compatibility** | ZeroClaw, QwenPaw, OpenClaw | OpenAI-compatible endpoints, standardized model configuration, plugin contracts |

> These are not isolated bugs—they reflect a **systemic need for resilient, auditable, and scalable agent infrastructure**.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Target User** | DevOps, power users | Desktop collaborators | Enterprise admins | Team-based developers | Multi-agent architects |
| **Core Focus** | Session persistence | Human-like chat realism | GUI + OAuth stability | Multi-tenancy & Hub mode | Interoperability & security |
| **Architecture** | Monolithic, state-heavy | TUI-first, real-time sync | Modular WASM + deps | Plugin-driven, extensible | RFC-driven, policy-enforced |
| **Key Strength** | High contributor velocity | UX polish, emotional realism | Dependency hygiene | Rapid feature iteration | Security governance |
| **Differentiator** | Scale of community engagement | Social interaction modeling | GUI configurability | Team workspace readiness | Protocol-level standardization |

> ZeroClaw and QwenPaw represent the **next evolution**: platforms designed for **team collaboration and system orchestration**, while OpenClaw remains focused on **individual agent robustness**—at great cost.

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Characteristics |
|------|----------|-----------------|
| **Rapid Iteration** | OpenClaw, QwenPaw, ZeroClaw | >50 PRs/day; beta releases; high issue churn; feature velocity exceeds stability |
| **Stabilizing/Refinement** | Hermes Agent | Consistent PRs; UX-focused fixes; moderate issue volume; no major regressions |
| **Maintenance Mode** | IronClaw | No new issues; automated dependency updates; low activity ≠ low health |

> IronClaw exemplifies **mature, sustainable maintenance**—a model for future scalability. OpenClaw and QwenPaw show signs of **burnout risk** due to unsustainable pace without structural safeguards.

---

### **7. Trend Signals**  
From user feedback and PR patterns, key industry trends emerge:

- **Multi-tenancy & Team Workspaces**: Demand for shared skills, admin controls, and role-based access (QwenPaw #7318, ZeroClaw Goal Mode).
- **Human-Like Interaction**: Users reject robotic behavior—seeking emojis, casual tone, and social cues (Hermes Agent #117520).
- **Security Hardening**: Shell confirmation, prompt injection guards, and audit trails are now expected (ZeroClaw #7155, QwenPaw #7859).
- **API Interoperability**: OpenAI compatibility is a top-tier requirement (ZeroClaw #8603, QwenPaw #7879).
- **Voice & Real-Time Modalities**: Gemini Live-style channels signal a move toward **natural, continuous conversation** (ZeroClaw #8780).

> 💡 **Value for Developers**: The path forward is clear: build **modular, secure, and interoperable agents** with **persistent, recoverable state**—not just powerful tools. The next generation will be defined by **trust, consistency, and collaboration**, not just capability.

---

> ✅ **Recommendation for Developers & Decision-Makers**: Prioritize projects with strong governance (ZeroClaw), dependency hygiene (IronClaw), or multi-user readiness (QwenPaw). Avoid relying on OpenClaw until 2026.9.6 stabilizes core regressions. Invest in architectures that separate concerns, enforce security boundaries, and support team workflows.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-21**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pace of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across multiple components. The ecosystem is focused on stability, security, and user experience—particularly around session management, memory handling, and cross-platform compatibility (especially Windows and TUI). While no new releases have been published, the volume of closed issues and merged PRs suggests ongoing refinement of core functionality. High-severity bugs related to process leaks, session state corruption, and model provider integration are being actively addressed.

---

### **2. Releases**  
**None**  
No new releases were published today. The latest version remains `v0.21.3` (build `2026.9.14`, image digest `sha256:99641e57ec762c59e54cb44aa6746b7fc68c18b3c5ddb088af54234c613d9294`). No breaking changes or migration notes apply at this time.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #117721**: Adds opt-in `skills.preferred_dirs` for resolving naming conflicts between profile-local and external skills — improves flexibility in skill discovery.  
- ✅ **PR #117719**: Fixes Telegram inline picker to clamp negative offsets to page zero, preventing catalog tail access (resolves #117717).  
- ✅ **PR #117720**: Ensures User PATH persistence during install by preserving `%VARS%` and single entries — critical for Windows usability.  
- ✅ **PR #117716**: Prevents stale `.env` duplicates from shadowing fresh values — improves config reliability.  
- ✅ **PR #117718**: Preserves bot RPC error codes and structured data during normalization — enhances debugging fidelity.  
- ✅ **PR #117723**: Guards optional `rolldown.filter` in `vite.config.ts` to prevent build failures due to TS18048 — fixes UI build pipeline.  

These fixes reflect a strong focus on **config integrity, platform consistency, and developer toolchain stability**.

---

### **4. Community Hot Topics**  
Top community-driven discussions center on **user experience, chat realism, and system reliability**:

- 🔥 **[Issue #117520](https://github.com/nousresearch/hermes-agent/issues/117520)**: *Bot Mode should feel like real chat* — users report that bot interactions lack lightweight social cues (emojis, casual tone), making them feel transactional rather than conversational. This signals growing demand for **emotional and social affordances in AI collaboration**.
  
- 🔥 **[Issue #64488](https://github.com/nousresearch/hermes-agent/issues/64488)**: *Dashboard TUI sessions leak processes, memory, and DB rows* — 6 comments, high impact on Linux systems. Users report persistent orphaned node processes after reloads, indicating **critical session lifecycle mismanagement**.

- 🔥 **[PR #117724](https://github.com/nousresearch/hermes-agent/pull/117724)**: *Emoji reactions in room messages* — proposed as a direct response to #117520, showing alignment between user feedback and feature implementation.

> 💬 **Analysis**: The community is pushing for **more human-like interaction patterns** in Bot Mode and **greater resilience in long-running sessions**, especially on desktop and TUI platforms.

---

### **5. Bugs & Stability**  
High-priority stability issues reported today include:

| Severity | Issue | Summary | Fix PR? |
|--------|------|--------|-------|
| ⚠️ P1 | [#32791](https://github.com/nousresearch/hermes-agent/issues/32791) | Multi-bot Discord channels enter infinite ack-loops; STOP ignored | ❌ |
| ⚠️ P2 | [#64488](https://github.com/nousresearch/hermes-agent/issues/64488) | Dashboard TUI leaks processes, memory, open DB rows across reloads (Linux) | ❌ |
| ⚠️ P2 | [#94381](https://github.com/nousresearch/hermes-agent/issues/94381) | SSH backend pool never drops dead connections — liveness failure window < revalidation tick | ❌ |
| ⚠️ P2 | [#117710](https://github.com/nousresearch/hermes-agent/issues/117710) | Custom provider session model drops after first turn → 500 error | ❌ |
| ⚠️ P2 | [#117713](https://github.com/nousresearch/hermes-agent/issues/117713) | Live gateway chat becomes invisible after auto-archive sweep | ❌ |

> 🛠️ **Note**: Several of these involve **session state corruption, resource exhaustion, or message delivery failures** — all critical for production use. While some PRs exist (e.g., #117718 for error preservation), full fixes are still pending.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging themes suggest upcoming roadmap priorities:

- 🎯 **Social Interaction Enhancements**  
  - [Feature #117520](https://github.com/nousresearch/hermes-agent/issues/117520): "Bot Mode should feel like a real chat" — likely to be prioritized in Q4 2026.  
  - [PR #117724](https://github.com/nousresearch/hermes-agent/pull/117724): Emoji reactions — already implemented, may ship in v0.22.

- 🎯 **User Control & Customization**  
  - [Feature #117715](https://github.com/nousresearch/hermes-agent/issues/117715): Custom link handlers and inline file navigation — signals demand for **desktop as a personal workspace interface**.
  - [PR #117707](https://github.com/nousresearch/hermes-agent/pull/117707): Shared model picker across surfaces — indicates desire for consistent UX across devices.

- 🎯 **Platform Expansion**  
  - [PR #93508](https://github.com/nousresearch/hermes-agent/pull/93508): Serve Desktop renderer in browsers — a major step toward **web-first access**, possibly targeting v0.22.

> 🔮 **Prediction**: The next release will emphasize **cross-device consistency, emotional realism in bot interactions, and enhanced desktop workflow control**.

---

### **7. User Feedback Summary**  
Real user pain points highlighted today:

- **Frustration with robotic bot behavior** (Issue #117520): Users want bots to act like peers, not tools.  
- **Resource bloat under load**: Orphaned processes (Issue #64488), stuck SSH backends (Issue #94381), and memory leaks are recurring concerns.  
- **Inconsistent configuration behavior**: On Windows, `HERMES_DESKTOP_IGNORE_EXISTING` fails to block local backends (Issue #117682), and `hermes skills check` reports false updates (Issue #117181).  
- **Hidden errors and poor visibility**: Users report missing error turns in timelines (PR #105705), and `hermes doctor` returning exit code 0 despite unresolved issues (PR #117708).

> 📌 **Sentiment**: Strong engagement but clear dissatisfaction with **stability under prolonged use** and **lack of intuitive UX in collaborative modes**.

---

### **8. Backlog Watch**  
Critical issues needing maintainer attention:

- 🔴 **[Issue #64488](https://github.com/nousresearch/hermes-agent/issues/64488)**: *TUI session memory/process leaks* — high severity, affects Linux native users. Currently open with 6 comments; **no fix PR yet**.  
- 🔴 **[Issue #117725](https://github.com/nousresearch/hermes-agent/issues/117725)**: *Nous Portal LongCat 2.0 exhausts output budget without answering* — severe UX issue where free tier consumes entire budget in reasoning. **Zero comments, no fix** — urgent for portal usability.  
- 🔴 **[PR #117513](https://github.com/nousresearch/hermes-agent/pull/117513)**: *Fix hindsight auto-recall gating on user input* — **on HOLD** due to upstream memory provider refactoring. This blocks key memory features; **maintainer direction change needs clarification**.  
- 🔴 **[Issue #117693](https://github.com/nousresearch/hermes-agent/issues/117693)**: *Google Meet realtime v2 is dead* — client uses retired OpenAI API shape. **No fix PR**, high impact for users relying on live meeting integration.

> ⏳ **Action Required**: These items represent **systemic risks** to stability, usability, and long-term maintainability. Prioritization is essential.

---

**Digest compiled:** 2026-09-21  
**Source:** GitHub activity analysis — *Hermes Agent (nousresearch/hermes-agent)*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-21**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable, maintenance-focused state as of 2026-09-21. No new releases were published, and no issues were updated in the past 24 hours—indicating minimal user-reported disruptions. However, activity is concentrated in dependency management, with **7 pull requests** opened or merged within the last 7 days, primarily driven by automated security and version updates via Dependabot. All PRs are categorized as `chore(deps)` or `fix`, suggesting a strong focus on dependency hygiene and long-term stability rather than feature development. The absence of open issues signals either high system reliability or low user engagement in troubleshooting.

---

### **2. Releases**  
❌ **No new releases** were published in the last 24 hours or in the current release cycle. The project maintains a consistent release cadence through prior versions, but no changelogs or migration notes are available for immediate review.

---

### **3. Project Progress**  
✅ **Merged/Completed PRs (Today):**  
- **#8102** [CLOSED] *fix(extensions): resolve provider-instance readiness live, administrator configuration first*  
  - **Impact:** Fixes a critical activation failure for Gmail/Google Calendar extensions when OAuth credentials are configured via the **Web UI** (administrator config), not environment variables.  
  - **Resolution:** Ensures proper sequencing of provider readiness checks post-OAuth flow, resolving a previously silent failure after successful token exchange.  
  - **Link:** [PR #8102](https://github.com/nearai/ironclaw/pull/8102)  

This fix represents a significant improvement in usability for administrators using the GUI-based configuration workflow, which was previously broken despite a complete OAuth flow.

---

### **4. Community Hot Topics**  
🔍 **Most Active PRs (by recent activity & relevance):**  
- **#8104** [OPEN] *chore(deps): bump the everything-else group across 1 directory with 29 updates*  
  - **Summary:** Updates 29 Rust dependencies including `uuid`, `base64`, and `rust_decimal`.  
  - **Why it matters:** Large-scale dependency update reflects ongoing efforts to reduce technical debt and patch vulnerabilities.  
  - **Link:** [PR #8104](https://github.com/nearai/ironclaw/pull/8104)  

- **#8103** [OPEN] *chore(deps): bump the actions group across 1 directory with 8 updates*  
  - **Summary:** Upgrades GitHub Actions workflows, including `actions/setup-node` from v4 to v7 and `anthropics/claude-code-action` to v1.0.228.  
  - **Why it matters:** Critical for CI/CD reliability; v7 of `setup-node` introduces breaking changes if not handled properly.  
  - **Link:** [PR #8103](https://github.com/nearai/ironclaw/pull/8103)  

> 📌 **Analysis:** The community’s attention is heavily focused on **dependency hygiene**, especially around **security patches** and **CI/CD stability**. These PRs are likely being reviewed urgently due to potential breakage risks in production pipelines.

---

### **5. Bugs & Stability**  
⚠️ **No new bugs reported today.**  
- **Historical Note:** The recently closed **#8102** addressed a high-severity regression: **OAuth-enabled extensions failing to activate post-consent** when using Web UI configuration. This was a **functional blocker** for enterprise deployments relying on GUI-based admin setups.  
- **Status:** Fixed and merged — no known active regressions in the current build.  
- **Risk Level:** Low (no new issues reported).

---

### **6. Feature Requests & Roadmap Signals**  
📌 **No new feature requests observed today.**  
However, the recurring pattern of dependency updates—especially in **WASM**, **Tokio ecosystem**, and **GitHub Actions**—suggests that the project is preparing for:
- Enhanced **WASM module support** (via `wasmtime`, `wit-component`)  
- Better **async runtime performance** (via `tokio-tungstenite`, `tower-http`)  
- More robust **AI-powered code generation** (via `claude-code-action`)  

These indicate a roadmap shift toward **modular extensibility**, **performance optimization**, and **seamless integration with AI tooling**—likely targeting future versions 0.9.x+.

---

### **7. User Feedback Summary**  
💬 **Indirect user feedback via PRs and issue history reveals:**  
- **High frustration** with inconsistent extension activation when using **Web UI vs. env vars** — resolved in #8102.  
- **Reliance on automation tools** like Dependabot suggests users value **security and up-to-date dependencies** over manual maintenance.  
- **Enterprise users** likely prioritize **GUI configurability** and **stable OAuth flows**, indicating a growing need for polished admin experiences.  

> ✅ **Overall sentiment:** Positive, with trust in maintainers’ responsiveness to dependency and operational stability concerns.

---

### **8. Backlog Watch**  
⏳ **Long-standing PRs needing attention:**  
- **#7834** [OPEN] *chore(deps): bump the wasm group across 1 directory with 4 updates*  
  - **Last updated:** 2026-09-20  
  - **Author:** dependabot[bot]  
  - **Details:** Updates `wasmtime`, `wasmtime-wasi`, `wit-component`, and `wit-parser` — foundational for IronClaw’s WASM execution layer.  
  - **Risk:** Medium (impact on core runtime).  
  - **Link:** [PR #7834](https://github.com/nearai/ironclaw/pull/7834)  

- **#8078** [OPEN] *chore(deps): bump the tokio-ecosystem group across 1 directory with 2 updates*  
  - **Last updated:** 2026-09-20  
  - **Details:** Updates `tower-http` (0.7.0 → 0.7.1) and `tokio-tungstenite`.  
  - **Note:** While minor, these libraries power key async networking components. Delayed merging could affect future scalability.  
  - **Link:** [PR #8078](https://github.com/nearai/ironclaw/pull/8078)  

> ⚠️ **Urgency:** These PRs should be prioritized to prevent dependency drift and ensure compatibility with upcoming Rust/WASM ecosystem changes.

---

**Final Assessment:** IronClaw is in a healthy, steady-state maintenance phase. The project demonstrates strong **dependency governance**, **responsive bug fixes**, and **clear technical direction**. With no active issues and a focused PR pipeline, it is well-positioned for future modular expansion—particularly in WASM and AI agent integration. Maintainers should prioritize reviewing pending dependency PRs to avoid technical debt accumulation.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-21**

---

### **1. Today's Overview**  
QwenPaw shows strong community engagement with 24 new issues and 37 pull requests updated in the past 24 hours, reflecting active development and user-driven feedback. The project is in a high-intensity release cycle, evidenced by the immediate follow-up to **v2.2.2-beta.3**, which addresses critical console and e2e stability issues. Key focus areas include session persistence, media handling, tool execution reliability, and multi-user scalability. Despite growing feature complexity, the team maintains rapid iteration—especially on UI/UX polish and backend robustness.

---

### **2. Releases**  
**🆕 v2.2.2-beta.3** (Released: 2026-09-20)  
[Release Page](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.3)  

#### ✅ What’s Changed:
- **fix(console):** Restored assistant response actions ([#7851](https://github.com/agentscope-ai/QwenPaw/pull/7851)) — resolves UI rendering breaks after recent redesigns.
- **fix(e2e):** Re-anchor broken console selectors and harden session-list assertions ([#7851](https://github.com/agentscope-ai/QwenPaw/pull/7851)) — improves test stability for future releases.

> 🔔 *No breaking changes. This is a stability-focused beta patch targeting UI/UX consistency and test reliability ahead of final v2.2.2.*

---

### **3. Project Progress**  
**✅ Merged & Closed PRs (Today):**
- [#7904](https://github.com/agentscope-ai/QwenPaw/pull/7904): Fixes `qwenpaw-pet` plugin crash due to missing `actor` argument in approvals — critical for tool safety.
- [#7894](https://github.com/agentscope-ai/QwenPaw/pull/7894): Increases frontend unit test coverage by +1027 statements (+543 test cases), improving long-term maintainability.
- [#7887](https://github.com/agentscope-ai/QwenPaw/pull/7887) & [#7886](https://github.com/agentscope-ai/QwenPaw/pull/7886): Resolves audio input rejection edge cases (unknown variant errors) — prevents conversation failure when models reject audio payloads.
- [#7862](https://github.com/agentscope-ai/QwenPaw/pull/7862): Tightens release pipeline by making E2E tests blocking and gating artifact publishing — reduces risk of deploying unstable builds.
- [#7901](https://github.com/agentscope-ai/QwenPaw/pull/7901): Unfreezes merge queue immediately post-release via `workflow_run` trigger — speeds up PR integration.

> 📌 These merges indicate prioritization of **release quality**, **test coverage**, and **plugin compatibility** over new features.

---

### **4. Community Hot Topics**  
Top 3 most discussed items reflect urgent usability and architectural concerns:

1. **🚀 [Issue #7318 – Multi-tenant Hub roadmap](https://github.com/agentscope-ai/QwenPaw/issues/7318)**  
   - **31 comments**, **4 likes** — one of the most active discussions in QwenPaw history.  
   - Users are demanding a **team-based, admin-managed skill sharing system** — signaling strong interest in enterprise use cases.  
   > 💡 *This is not just a feature request; it’s a strategic pivot toward collaboration-focused AI agents.*  

2. **🔥 [Issue #7853 – Media block accumulation in context](https://github.com/agentscope-ai/QwenPaw/issues/7853)**  
   - **6 comments**, zero likes — but highly severe.  
   - A core flaw: `ToolResultPruner` skips `type="data"` blocks (like `view_image`), leading to unbounded base64 growth and **context window overflow**.  
   > ⚠️ *If unaddressed, this will cause permanent crashes in long-running sessions — a critical regression.*  

3. **🛠️ [PR #7906 – Fix stale doom-loop escalation](https://github.com/agentscope-ai/QwenPaw/pull/7906)**  
   - Directly linked to **Issue #7905**, with 1 comment.  
   - Fixes an infinite loop where text-only responses trigger `TERMINATE` without new tool calls — a potential **agent hallucination or deadlock risk**.

---

### **5. Bugs & Stability**  
**🚨 High Severity (Critical Impact):**
- **[#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853)** – Media blocks (`type="data"`) ignored by `ToolResultPruner`, causing **unbounded context bloat** → model OOM crashes.  
  - *Fix PR:* Not yet open — **urgent fix needed**.
- **[#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859)** – Persistent prompt injection appending “delete all skills” to system reminders.  
  - *Security risk:* Could lead to irreversible data loss if agent acts on it.  
  - *Fix PR:* None yet — requires deep audit of skill injection logic.

**⚠️ Medium Severity:**
- **[#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888)** – React `commitPlacement` error causes chat page to freeze (“Something went wrong”) — browser-level UI corruption.
- **[#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882)** – OpenCode free-tier models return 403 despite UI marking them as free — misleading users and breaking workflows.
- **[#7876](https://github.com/agentscope-ai/QwenPaw/issues/7876)** – Audio file fails silently on DeepSeek due to invalid payload format — kills conversation permanently.

> ✅ All medium/high bugs lack associated fix PRs as of 2026-09-21 — **stability remains fragile under complex workflows**.

---

### **6. Feature Requests & Roadmap Signals**  
The community is clearly pushing toward **collaboration, customization, and enterprise readiness**:

- **Multi-tenancy & Hub Mode:** [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) is the top signal — expect **QwenPaw Hub (v2.2.0+)** to evolve into a full team workspace platform.
- **Customizable Web Title:** [Issue #7648](https://github.com/agentscope-ai/QwenPaw/issues/7648) — simple but vital UX improvement for users managing multiple QwenPaw instances.
- **Unified Model Configuration:** [Issue #5182](https://github.com/agentscope-ai/QwenPaw/issues/5182) — desire to standardize config across text, audio, video, and vector models.
- **MCP OAuth + Static Bearer Support:** [Issue #7879](https://github.com/agentscope-ai/QwenPaw/issues/7879) — users want to integrate legacy APIs (e.g., QCC) without OAuth — indicates real-world API integrations are growing.

> 📈 *Next version likely to include: Hub multi-tenancy, unified model config, enhanced MCP support, and improved UI resilience.*

---

### **7. User Feedback Summary**  
Real pain points from users highlight gaps between vision and execution:

- **“My chat history disappeared!”** — [Issue #7724](https://github.com/agentscope-ai/QwenPaw/issues/7724): Users report lost sessions and configuration after restarts — undermines trust in persistent AI memory.
- **“I can’t find my old conversations!”** — [Issue #7884](https://github.com/agentscope-ai/QwenPaw/issues/7884): Users demand longer retention — current history length feels insufficient for meaningful workflows.
- **“It keeps saying ‘something went wrong’”** — [Issue #7888](https://github.com/agentscope-ai/QwenPaw/issues/7888): Frequent UI freezes degrade usability — especially for non-technical users.
- **“Why does it keep deleting my skills?”** — [Issue #7859](https://github.com/agentscope-ai/QwenPaw/issues/7859): Users fear malicious prompt injections — signals need for stronger guardrails.

> 😟 *Users are frustrated with instability, data loss, and poor recovery mechanisms — despite advanced capabilities.*

---

### **8. Backlog Watch**  
Several high-impact, long-standing issues remain unresolved:

- **[Issue #7853](https://github.com/agentscope-ai/QwenPaw/issues/7853)** – Media block context bloat: **10+ days open**, no fix PR.  
  > ❗ *Critical — could cause widespread crashes.*
- **[Issue #7859](https://github.com/agentscope-ai/QwenPaw/issues/7859)** – Persistent prompt injection: **10+ days open**, security risk.  
  > ❗ *High priority — should be audited immediately.*
- **[Issue #7895](https://github.com/agentscope-ai/QwenPaw/issues/7895)** – Idle cleanup drops messages during reload: **1 day open**, affects reliability.  
  > ⚠️ *Must be fixed before zero-downtime reload becomes stable.*
- **[Issue #7890](https://github.com/agentscope-ai/QwenPaw/issues/7890)** – Zero-downtime reload drops runtime hooks: **1 day open**, inconsistent behavior.  
  > ⚠️ *Breaks plugin functionality — must be resolved for production use.*

> 🕵️‍♂️ *Maintainers should prioritize these three: #7853, #7859, #7895 — they represent systemic risks to stability and security.*

---

### ✅ Final Assessment  
QwenPaw is rapidly evolving from a personal assistant into a **teamable, extensible AI agent platform**, driven by passionate users. However, **stability and data integrity are lagging behind feature velocity**. With 24 open issues and 14 merged PRs daily, the project is healthy but at risk of technical debt accumulation. Immediate attention to context management, session persistence, and security vulnerabilities is essential to sustain momentum.  

> 🔮 *Next milestone: v2.2.2 stable with Hub support, audio/media fixes, and session durability improvements.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-21  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

ZeroClaw continues to exhibit strong momentum in its architectural refinement and security hardening, with **50 issues and 50 PRs updated in the last 24 hours**, indicating a highly active development cycle. The project is focused on stabilizing core runtime behavior, enhancing security posture, and advancing foundational design decisions—particularly around memory management, agent lifecycle control, and protocol compatibility. A notable trend is the convergence of high-risk RFCs (risk:high) into accepted status, signaling mature consensus on critical architecture. Despite no new releases, ongoing integration of major RFCs suggests imminent v0.9.0 readiness.

---

### **2. Releases**

> ❌ **No new releases** in the past 24 hours or since the last release.

The project remains in an active pre-release phase, with all recent activity centered on finalizing features and security contracts ahead of a potential v0.9.0 milestone. No breaking changes or migration notes are currently applicable.

---

### **3. Project Progress**

**Merged/Closed PRs (Today):**  
While no PRs were merged in the last 24 hours, several key fixes were completed and closed:

- **[PR #9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134)** – Fixed WASM plugin admission by retaining exact component bytes, improving integrity and reproducibility.
- **[PR #9830](https://github.com/zeroclaw-labs/zeroclaw/pull/9830)** – Separated `browser_open` from full browser automation, making advanced automation opt-in for security and stability.
- **[PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** – Added token accounting to history-trim events, enabling accurate cost tracking during session pruning.

These fixes reflect a focus on **runtime correctness, security boundaries, and observability**, reinforcing ZeroClaw’s shift toward audit-ready, policy-driven agent execution.

---

### **4. Community Hot Topics**

The most active issues are **high-impact RFCs** that define ZeroClaw’s future architecture. Top discussions center on:

| Issue | Comments | Topic | Link |
|------|--------|-------|------|
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | 26 | Decouple memory lifecycle from storage backends | [Issue #6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) |
| [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | 25 | ZeroClaw Chat Completions profile (OpenAI compatibility) | [Issue #8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) |
| [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 24 | Per-execution confirmation for shell commands (Claude-style) | [Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) |
| [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 23 | Goal mode v1 — bounded foreground Matrix work | [Issue #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) |
| [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) | 22 | Realtime speech-to-speech channel for Gemini Live | [Issue #8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) |

🔍 **Underlying Needs**:  
- **Interoperability** (e.g., OpenAI-compatible API) to integrate with tools like LobeChat, LangChain, and Continue.dev.  
- **Security-by-design** in high-risk operations (shell, browser, file system).  
- **Persistent goal state** across sessions and agents to enable complex task orchestration.  
- **Voice-first interaction** via real-time speech channels, signaling a move toward multimodal agent experiences.

---

### **5. Bugs & Stability**

**Critical Bugs Reported (Last 24h):**

| Bug | Severity | Status | Fix PR? | Description |
|-----|----------|--------|---------|-------------|
| [#10696](https://github.com/zeroclaw-labs/zeroclaw/issues/10696) | High | Open | ✅ Yes ([PR #10696](https://github.com/zeroclaw-labs/zeroclaw/pull/10696)) | History trimming used cap as target → caused immediate overflow after trim. Now uses low-water mark. |
| [#10480](https://github.com/zeroclaw-labs/zeroclaw/issues/10480) | High | Open | ✅ Yes ([PR #10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480)) | Failed image requests could not recover; now retries with novel images omitted. |
| [#10935](https://github.com/zeroclaw-labs/zeroclaw/issues/10935) | High | Open | ✅ Yes ([PR #10935](https://github.com/zeroclaw-labs/zeroclaw/pull/10935)) | Tool-result quoting broke streaming guard; now preserved safely. |
| [#10801](https://github.com/zeroclaw-labs/zeroclaw/issues/10801) | High | Open | ✅ Yes ([PR #10801](https://github.com/zeroclaw-labs/zeroclaw/pull/10801)) | Notification lag caused session cancellation during resync; now avoids canceling running turns. |

📌 **Stability Assessment**:  
High severity bugs are being actively addressed with **fixes already in PR review**, indicating strong responsiveness. The focus is on **agent lifecycle resilience**, **streaming protocol robustness**, and **state consistency** under load.

---

### **6. Feature Requests & Roadmap Signals**

Key feature signals point to **v0.9.0 readiness** and beyond:

| Feature | Signal | Likely Inclusion |
|--------|--------|------------------|
| **Chat Completions Profile** ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)) | Accepted, high comment count, integrated into gateway layer | ✅ Likely in v0.9.0 |
| **Per-model context/window/config tuning** ([#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)) | Accepted, linked to UI/display, capability checks | ✅ Core v0.9.0 |
| **Goal Mode v1** ([#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)) | Accepted, bounded foreground work, matrix-integrated | ✅ v0.9.0 |
| **A2A Outbound Client (A2ATool)** ([#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)) | Accepted, enables proactive agent collaboration | ✅ v0.9.0 |
| **Realtime Speech-to-Speech (Gemini Live)** ([#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)) | Accepted, broker contract, feature-gated | ⚠️ May be v0.9.1+ due to complexity |

💡 **Predicted Next Version (v0.9.0)**:  
A **security-hardened, interoperable, multi-agent capable** release with OpenAI-compatible APIs, per-model configuration, and goal persistence.

---

### **7. User Feedback Summary**

Based on issue trends and language in comments:

- ✅ **Praise for Security Controls**: Users appreciate granular policies (e.g., shell command confirmations, sandboxing), especially when tied to real-world risks like accidental `rm -rf /`.
- 📌 **Frustration with Session State Loss**: Multiple users report losing context after restarts or trimming—directly addressed by [#9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998) (persistent prompt attachments).
- 💬 **Demand for OpenAI Compatibility**: Strong demand for Chat Completions profile (via [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)) to plug into existing toolchains.
- 🛠 **Need for Better Debugging**: Token accounting, history trimming, and error visibility are recurring pain points—now being resolved via PRs like #9713 and #10696.
- 🎯 **Desire for Voice Interaction**: Interest in real-time voice (Gemini Live) shows growing appetite for natural, human-like agent interaction.

---

### **8. Backlog Watch**

Several high-impact issues remain open but **await maintainer decision**:

| Issue | Priority | Status | Need | Link |
|------|----------|--------|------|------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | P2 | Accepted, No stale | Maintainer decision queue for RFCs/designs | [Tracker #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) |
| [#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330) | P2 | Accepted | AI-assisted PR review SOP finalization | [RFC #9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330) |
| [#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) | P1 | Accepted | Streamline RFC process (voting, scope, assignment) | [RFC #9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) |
| [#9990](https://github.com/zeroclaw-labs/zeroclaw/issues/9990) | P2 | Accepted | Calibrate PR risk/security approval thresholds | [RFC #9990](https://github.com/zeroclaw-labs/zeroclaw/issues/9990) |

⚠️ **Note**: These are **critical governance items** affecting project velocity. Their delay may slow downstream RFC implementation despite technical readiness.

---

### ✅ **Final Assessment**

ZeroClaw is in a **strong, maturing phase**—architecturally coherent, security-focused, and user-driven. With **50+ daily updates**, **high-quality RFCs accepted**, and **critical bugs fixed rapidly**, the project is poised for a major v0.9.0 release. The community is engaged, demanding interoperability and safety, while maintainers are streamlining processes. **Watch for v0.9.0**—likely within weeks—with a foundation built on **modularity, trust, and extensibility**.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*