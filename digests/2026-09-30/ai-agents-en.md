# OpenClaw Ecosystem Digest 2026-09-30

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-30 01:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-09-30**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with 500 issues and 500 pull requests updated in the last 24 hours — a clear sign of sustained community engagement and rapid development momentum. The ecosystem is experiencing intense focus on stability, particularly around memory management, database integrity, and worker lifecycle control. A new release (`v2026.8.33`) was issued as a *gateway-only extended-stable* update, indicating a strategic pause in feature delivery to prioritize reliability. Despite this, the volume of open issues (436 active) and high-priority bugs suggests ongoing challenges in core system resilience, especially under load or across platforms.

---

### **2. Releases**  
- **New Release**: `v2026.8.33` (extended-stable)  
  - **Release Type**: Gateway-only, equivalent to LTS.  
  - **Summary**: Based on end-of-August 2026 codebase, includes critical security patches, performance optimizations, and reliability fixes. Adds support for new models.  
  - **Migration Note**: No breaking changes expected; intended for stable deployments. Users should upgrade to avoid known regressions in `2026.9.x`.  
  - **Current Latest Version**: `2026.9.6` (see issue #157531 for upcoming fixes).  
  - 🔗 [Release Notes](https://github.com/openclaw/openclaw/releases/tag/v2026.8.33)

---

### **3. Project Progress**  
- **Merged/Resolved PRs**: 150 PRs closed/merged today (out of 500 total), primarily focused on:
  - **UI/UX Fixes**: Improved progress card rendering (PR #161472), permission icon clarity (PR #161484), and activity summary filtering (PR #161060).
  - **Stability & Recovery**: Fix for failed idle DB cleanup blocking all agents (PR #157693); improved error reporting for config updates (PR #155427).
  - **Code Refactoring**: Major provider plugin cleanup (PR #161471), gateway core desloping (PR #159999), and test reduction (PR #161041).
  - **CI/CD Improvements**: Balanced Windows process tests (PR #154606), validation of extended-stable upgrades (PR #161450).

---

### **4. Community Hot Topics**  
The most discussed items center on **system stability**, **memory leaks**, and **critical UX blockers**:

| Issue | Comments | Severity | Link |
|------|----------|----------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 94 | P0 (UX Release Blocker) | Agent SQLite WAL grows to 2.8GB, blocks startup on Windows |
| [#157325](https://github.com/openclaw/openclaw/issues/157325) | 15 | P0 (UX Release Blocker) | Stuck agent-DB resource causes *all* replies to fail until restart |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) | 9 | P0 (Critical Memory Pressure) | Prepared-model-catalog worker hits full heap ceiling (~200 critical events/day) |
| [#159612](https://github.com/openclaw/openclaw/issues/159612) | 12 | P0 (Endless Retry Loop) | Subagent completion retries forever due to "owner changed" re-injection |
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 16 | P0 (Fixes Tracker) | Tracking pre-2026.9.7 fixes; currently has 18 P1 candidates |

> 🔍 **Underlying Need**: Users are reporting cascading failures from single points of failure in database, memory, and state coordination. This indicates a systemic stress point in the agent-gateway lifecycle that demands architectural-level attention.

---

### **5. Bugs & Stability**  
High-severity bugs dominate today’s landscape, with multiple P0 crashes and regressions reported across platforms:

| Bug | Impact | Status | Related PR? |
|-----|--------|--------|-------------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | Crash-loop on Windows, 2.8GB WAL growth | Open | ❌ |
| [#157325](https://github.com/openclaw/openclaw/issues/157325) | All agents fail after DB lock stall | Open | ❌ |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) | Sawtooth memory growth, OOM risk | Open | ❌ |
| [#159612](https://github.com/openclaw/openclaw/issues/159612) | Infinite retry loop in subagent settlement | Open | ❌ |
| [#158095](https://github.com/openclaw/openclaw/issues/158095) | Worker state-lifecycle fails permanently after acquire | Open | ❌ |
| [#155859](https://github.com/openclaw/openclaw/issues/155859) | Startup time scales with plugin count (120s+) | Open | ❌ |

> ⚠️ **Note**: No fix PRs exist for any of these top 5 P0 issues. The lack of immediate resolution signals either complexity or prioritization elsewhere.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven enhancements reflect growing demand for **control**, **transparency**, and **flexibility**:

| Request | Priority | Key Insight | Link |
|--------|----------|-------------|------|
| [#16670](https://github.com/openclaw/openclaw/issues/16670) | P2 | Onboarding wizard must include memory/embedding setup — otherwise core features break silently | 🟡 |
| [#156341](https://github.com/openclaw/openclaw/issues/156341) | P3 | Task-scoped decision models with inspectable evaluation — desired for auditability and fine-grained control | 🟡 |
| [#122256](https://github.com/openclaw/openclaw/issues/122256) | P3 | Repeat provider auth setup: users want to avoid reconfiguring entire flow for second model | 🟢 |
| [#157989](https://github.com/openclaw/openclaw/issues/157989) | P0 | Plugin source capture rewrites large binaries per CLI command → SSD wear | 🔴 |

> 📌 **Prediction**: The **task-scoped decision model RFC (#156341)** and **plugin source deduplication (#157989)** are strong candidates for inclusion in **2026.9.7**, given their severity and user impact.

---

### **7. User Feedback Summary**  
Real-world use cases reveal deep frustration with:
- **Unpredictable crashes**: Users report “every reply fails” after minor DB or worker states, requiring restarts.
- **Hidden dependencies**: Memory/Embedding setup is not mandatory during onboarding — leading to silent failures (Issue #16670).
- **Resource exhaustion**: Native executables being copied on every start cause SSD wear (Issue #157989).
- **Poor error messaging**: Many errors lack context (e.g., “another OpenClaw process owns state-lifecycle”) — users cannot self-diagnose (Issue #159094).

> ✅ **Satisfaction**: UI polish (e.g., icons in sidebar previews) and diagnostic improvements (e.g., port occupancy warnings) are well-received.

---

### **8. Backlog Watch**  
Critical long-standing issues requiring maintainer attention:

| Issue | Age | Severity | Status | Why It Matters |
|------|-----|----------|--------|----------------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 21 days | P0 | Open | Blocks Windows deployment at scale |
| [#157325](https://github.com/openclaw/openclaw/issues/157325) | 6 days | P0 | Open | Single point of failure affects all agents |
| [#159612](https://github.com/openclaw/openclaw/issues/159612) | 3 days | P0 | Open | Infinite retry loops degrade usability |
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 6 days | P0 | Open | Centralized tracker for 2026.9.7 fixes |
| [#152839](https://github.com/openclaw/openclaw/issues/152839) | 11 days | P0 | Open | Graceful handling of `openat2 ENOSYS` on Docker/Synology |

> 🔎 **Action Required**: These issues represent systemic risks. Immediate triage and fix planning are needed to prevent further degradation in production environments.

---  
✅ **Final Assessment**: OpenClaw is in a **high-velocity but unstable phase**. While technical depth and community engagement are strong, the backlog of unaddressed P0 bugs threatens long-term adoption. Prioritization of **core stability** over feature velocity is essential for trust and scalability.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Open-Source AI Agent Ecosystem – 2026-09-30**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem is entering a pivotal phase of maturation, marked by divergent strategies between high-velocity innovation and stability-driven refinement. Projects are increasingly focused on core system resilience—particularly around memory management, session integrity, and security isolation—reflecting growing real-world deployment in production environments. While some projects (e.g., OpenClaw, ZeroClaw) prioritize architectural depth and distributed execution, others (e.g., IronClaw, QwenPaw) emphasize UX polish and enterprise readiness. The convergence of RAG, multi-agent orchestration, and identity-aware access control signals a shift from basic automation to intelligent, trustworthy agent systems.

---

### **2. Activity Comparison**

| Project | Issues (24h) | PRs (24h) | Release Status | Health Score |
|--------|--------------|-----------|----------------|--------------|
| **OpenClaw** | 500 | 500 | `v2026.8.33` (extended-stable) | ✅ **7.2 / 10** |
| **Hermes Agent** | 50 | 50 | ❌ No new release | 🟡 **6.8 / 10** |
| **IronClaw** | 2 | 5 | `v1.4.1` (stable) | ✅ **8.5 / 10** |
| **QwenPaw** | 11 | 36 | ❌ No new release | 🟡 **7.0 / 10** |
| **ZeroClaw** | 27 | 50 | ❌ No new release | ✅ **7.8 / 10** |

> 🔍 *Note:* High PR/issue volume correlates with instability (OpenClaw, ZeroClaw), while low-volume, stable releases (IronClaw) indicate mature development cycles.

---

### **3. OpenClaw's Position**  
OpenClaw stands as the most active project in the ecosystem, with unparalleled velocity in issue and pull request volume—indicating either rapid innovation or systemic instability. Its **gateway-centric architecture**, combined with aggressive feature delivery and extended-stable release strategy (`v2026.8.33`), positions it as a foundational platform for large-scale agent deployments. Unlike peers, OpenClaw exhibits **no formal roadmap discipline**, relying instead on reactive triage of P0 bugs—highlighting a trade-off between speed and reliability. Its community size appears largest, but this comes with higher churn due to frequent regressions and poor error messaging. In contrast, IronClaw and ZeroClaw demonstrate stronger engineering rigor, while Hermes Agent and QwenPaw focus more on usability and enterprise adaptability.

---

### **4. Shared Technical Focus Areas**  
Multiple projects are converging on critical technical needs:

| Need | Projects Involved | Specific Requirements |
|------|-------------------|------------------------|
| **Session & State Integrity** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Persistent state across restarts; prevention of silent session loss; proper reconnection handling |
| **Memory & Resource Management** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Prevention of OOM crashes; heap exhaustion mitigation; efficient DB/WAL cleanup |
| **Plugin & Dependency Lifecycle** | ZeroClaw, QwenPaw, Hermes Agent | Reliable plugin updates; avoidance of repeated downloads; secure configuration propagation |
| **Security Isolation & Access Control** | ZeroClaw, OpenClaw, QwenPaw | Principal scope enforcement; role-based access; protection against privilege escalation |
| **RAG & Knowledge Integration** | ZeroClaw, OpenClaw, IronClaw | Document retrieval; private knowledge base indexing; persistent memory layers |

> ⚠️ **Pattern**: Security and stability concerns dominate over feature innovation—especially in projects with broad user bases or production use cases.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Target Users** | DevOps, scale-focused teams | Power users, remote developers | Enterprise, self-hosters | Intranet, air-gapped environments | Security-first orgs, compliance-sensitive |
| **Feature Focus** | Gateway scalability, model diversity | Session continuity, TUI robustness | Tool intelligence, config clarity | Plugin flexibility, monitoring fidelity | Security, RAG, structured memory |
| **Architecture** | Centralized gateway + worker pool | Desktop-first with WSL/remote support | Local loop host + opt-in tools | Modular skill engine + CLI focus | Schema V4 + principal isolation |
| **Deployment Model** | Cloud/VPS-heavy | Hybrid desktop/remote | Self-hosted, local-first | Air-gapped/intranet | OIDC-integrated, policy-enforced |

> 🔑 **Key Differentiator**: ZeroClaw and IronClaw represent the most architecturally distinct approaches—ZeroClaw with its **security-first design**, IronClaw with **semantic tool ranking**—while OpenClaw remains the most widely adopted but least reliable.

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Characteristics |
|------|----------|-----------------|
| **High-Velocity Innovation** | OpenClaw, ZeroClaw, QwenPaw | >50 issues/PRs/day; rapid PR turnover; strong user-driven feedback loops |
| **Stabilization Phase** | IronClaw | Low activity, stable release cycle, disciplined CI/CD, clear RFC process |
| **Enterprise-Ready Refinement** | Hermes Agent | Focused on UX polish, cross-platform reliability, update resilience |

> 📈 **Trend**: Projects transitioning from "build" to "ship" mode are stabilizing (e.g., IronClaw), while others remain in **high-risk, high-reward** development phases. IronClaw’s health score reflects maturity; OpenClaw’s indicates early-stage turbulence despite scale.

---

### **7. Trend Signals**  
From community feedback and PR patterns, several industry trends emerge:

1. **Agent Systems Are Becoming Production-Grade**:  
   - Demand for **auditability** (QwenPaw #156341), **crash recovery** (OpenClaw #157325), and **enterprise identity** (Hermes #84483, ZeroClaw #8289) shows agents are no longer experimental.

2. **RAG and Structured Memory Are Foundational**:  
   - ZeroClaw (#11053, #11235), OpenClaw (planned), and IronClaw (in-flight) all signal move toward **persistent, queryable agent memory**—beyond simple tool calls.

3. **Security Must Be Built-In, Not Bolted On**:  
   - Five S0/S1 bugs in ZeroClaw alone reflect a shift: **access control, data leakage, and policy enforcement** are now primary concerns—not afterthoughts.

4. **User Experience Is the New Competitive Edge**:  
   - Even small fixes (e.g., focus restoration, timezone validation, UI consistency) are heavily discussed—proving that **UX quality directly impacts adoption**.

5. **Decentralized Execution Is the Next Frontier**:  
   - ZeroClaw’s edge worker RFC (#7889), OpenClaw’s worker lifecycle issues, and QwenPaw’s custom plugin sources all point to demand for **distributed, scalable agent networks**.

> 💡 **Value for Developers**: Prioritize **observability, security hardening, and session resilience**—not just new features. The next wave of agent platforms will be defined by trust, not just capability.

---

✅ **Final Insight**: The ecosystem is bifurcating—between **feature-rich but unstable platforms** (OpenClaw, ZeroClaw) and **mature, secure, and predictable systems** (IronClaw, QwenPaw). For developers choosing a foundation, **stability and security should outweigh raw innovation velocity**—especially for mission-critical applications.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-30**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 pull requests updated in the past 24 hours—indicating strong community engagement and ongoing development momentum. No new releases were published, suggesting a focus on stability fixes and feature refinement ahead of the next version. The majority of activity centers on desktop client reliability, session management, Windows-specific regressions, and plugin/update system robustness. While no critical breaking changes are evident, several high-severity bugs affecting core user workflows (e.g., session loss, memory leaks, crashes) remain open, signaling continued pressure on quality assurance.

---

### **2. Releases**  
❌ **No new releases** were published as of 2026-09-30.  
- The latest stable version remains `v0.21.5+4743.gd23cc6b`, with recent updates focused on internal tooling and configuration handling.
- Users should expect a patch release soon to address known stability issues, particularly around Windows desktop behavior and update failures.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today)**:  
- [PR #127011](https://github.com/NousResearch/hermes-agent/pull/127011): Fixes lazy session row creation in git-enriched views, preventing missing metadata.  
- [PR #124805](https://github.com/NousResearch/hermes-agent/pull/124805): Resolves live session record corruption during history retrieval in TUI gateway.  
- [PR #85190](https://github.com/NousResearch/hermes-agent/pull/85190): Ensures SSH backend persistence after idle cleanup, fixing profile drift in remote sessions.

🔧 **Key Advances**:  
- Improved resilience in session state handling across desktop and TUI interfaces.  
- Better error messaging for misconfigured flat model schemas (via [PR #128486](https://github.com/NousResearch/hermes-agent/pull/128486)).  
- Fix for OpenRouter cost reporting now shows actual billed amounts instead of estimates ([PR #128755](https://github.com/NousResearch/hermes-agent/pull/128755)).

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Comment Count & Impact**:

| Issue | Summary | Link |
|------|--------|------|
| [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) | Desktop `MEDIA:` links fail silently due to regex + URL construction bug | [Issue #84361](https://github.com/NousResearch/hermes-agent/issues/84361) |
| [#95189](https://github.com/NousResearch/hermes-agent/issues/95189) | Gateway exits every ~2 minutes on WSL2, causing renderer OOM via reconnect churn | [Issue #95189](https://github.com/NousResearch/hermes-agent/issues/95189) |
| [#69940](https://github.com/NousResearch/hermes-agent/issues/69940) | WebSocket disconnects every ~17 min (code 1012), losing chats on restart | [Issue #69940](https://github.com/NousResearch/hermes-agent/issues/69940) |
| [#103748](https://github.com/NousResearch/hermes-agent/issues/103748) | Request for official message delivery into live sessions — critical for multi-agent orchestration | [Issue #103748](https://github.com/NousResearch/hermes-agent/issues/103748) |

🔍 **Analysis of Needs**:  
- Users demand **reliable session continuity**, especially in remote/VPS and WSL environments.  
- There is growing interest in **inter-agent communication patterns**, reflected in the request for message injection into live sessions.  
- The frequency of Windows/WSL-specific crashes suggests **platform-specific testing gaps** and urgent need for deeper integration testing on these systems.

---

### **5. Bugs & Stability**  
🚨 **High-Priority Bugs Reported (P2/P1)**:

| Issue | Severity | Platform | Status | Fix PR? |
|------|----------|----------|--------|---------|
| [#95189](https://github.com/NousResearch/hermes-agent/issues/95189) | P2 | WSL2 / Windows | Open | ❌ No fix yet |
| [#121735](https://github.com/NousResearch/hermes-agent/issues/121735) | P2 | Windows | Open | ❌ No fix yet |
| [#112961](https://github.com/NousResearch/hermes-agent/issues/112961) | P2 | Windows | Open | ❌ No fix yet |
| [#128720](https://github.com/NousResearch/hermes-agent/issues/128720) | P0 | Slack Integration | Open | ❌ No fix yet |
| [#127621](https://github.com/NousResearch/hermes-agent/issues/127621) | P2 | Desktop | Open | ❌ No fix yet |

⚠️ **Critical Patterns Observed**:  
- **Windows desktop instability** dominates: crashes (`FAST_FAIL_FATAL_APP_EXIT`), memory bloat (~3.6 GB), and unclean shutdowns.  
- **Session loss and reconnection failures** are recurring, especially under load or after idle periods.  
- **Plugin publishing intermittently fails** due to dependency conflicts ([#128697](https://github.com/NousResearch/hermes-agent/issues/128697)), hampering ecosystem growth.

📌 **Fix PRs in Flight**:  
- [PR #128755](https://github.com/NousResearch/hermes-agent/pull/128755): Addresses cost estimation inaccuracies (non-critical but important for transparency).  
- [PR #128506](https://github.com/NousResearch/hermes-agent/pull/128506): Fix for race condition during instance relaunch post-update — directly relevant to crash reproducibility.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging User-Centric Features**:

| Request | Use Case | Priority | Predicted Inclusion |
|-------|---------|----------|---------------------|
| [#103748](https://github.com/NousResearch/hermes-agent/issues/103748) | Deliver messages to existing live sessions | P3 | Likely in v0.22 |
| [#119678](https://github.com/NousResearch/hermes-agent/issues/119678) | Support OpenRouter Decisions-API models for aux tasks | P3 | Possible in v0.22 |
| [#84483](https://github.com/NousResearch/hermes-agent/issues/84483) | Connect desktop to self-hosted OIDC auth provider | P3 | High demand; likely v0.22 |
| [#127290](https://github.com/NousResearch/hermes-agent/pull/127290) | Improve update failure diagnostics | P2 | Already being addressed |

💡 **Roadmap Signals**:  
- The **multi-agent orchestration use case** is clearly emerging as a top-tier scenario (manager agent coordinating workers).  
- **Self-hosted identity providers** and **remote backend access** are becoming standard expectations, indicating a shift toward enterprise-grade deployment.  
- **Better configurability and observability** (costs, session state, message routing) will likely define the next major release.

---

### **7. User Feedback Summary**  
🗣️ **Real User Pain Points**:
- **"Sessions disappear after closing the app"** — users report losing long conversations due to WebSocket disconnects and orphaned sessions ([#69940](https://github.com/NousResearch/hermes-agent/issues/69940)).
- **"It takes 5+ minutes to load sessions after upgrade"** — severe UX friction, especially for remote users ([#71168](https://github.com/NousResearch/hermes-agent/issues/71168)).
- **"Clicking file links does nothing"** — basic functionality broken in desktop app ([#84361](https://github.com/NousResearch/hermes-agent/issues/84361)).
- **"Memory grows to 3.6GB on Windows"** — hardware strain reported by power users ([#121735](https://github.com/NousResearch/hermes-agent/issues/121735)).

✅ **Satisfaction Indicators**:  
- Positive feedback on improved cost visibility via OpenRouter billing integration ([PR #128755](https://github.com/NousResearch/hermes-agent/pull/128755)).  
- Appreciation for granular config control (e.g., `display.busy_input_mode`) in PRs like [#125983](https://github.com/NousResearch/hermes-agent/pull/125983).

---

### **8. Backlog Watch**  
⏳ **Longstanding Critical Issues Needing Attention**:

| Issue | Age | Status | Why It Matters |
|------|-----|--------|----------------|
| [#69940](https://github.com/NousResearch/hermes-agent/issues/69940) | 2026-07-23 | Open (7 comments) | Session loss every ~17 min breaks trust in core functionality |
| [#95189](https://github.com/NousResearch/hermes-agent/issues/95189) | 2026-08-26 | Open (9 comments) | Gateway churn causes OOM — critical for WSL/VPS users |
| [#121735](https://github.com/NousResearch/hermes-agent/issues/121735) | 2026-09-24 | Open (3 comments) | 3.6 GB memory usage is unsustainable for most laptops |
| [#128697](https://github.com/NousResearch/hermes-agent/issues/128697) | 2026-09-30 | Open (2 comments) | Plugin publishing failure undermines community contribution |
| [#127469](https://github.com/NousResearch/hermes-agent/issues/127469) | 2026-09-29 | Open (2 comments) | UI inconsistency in approval card dropdown labels |

🔔 **Call to Maintainers**:  
These issues represent **systemic risks to user retention and adoption**, particularly in remote, multi-user, and enterprise scenarios. Immediate triage and dedicated fix efforts are recommended, especially for session stability and platform-specific performance.

---

**Final Assessment**:  
Hermes Agent is in a **high-growth, high-stress phase**—user demand is outpacing infrastructure stability. While innovation continues (e.g., OpenRouter support, multi-agent flows), **core reliability must be prioritized**. The next release must focus on **session integrity, cross-platform stability (especially Windows/WSL), and update resilience** to maintain credibility.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

---

### **1. Today's Overview**  
IronClaw (v1.4.1) is in active stabilization mode as of 2026-09-30, with a new stable release promoting the `1.4.1-rc.2` build. The project shows moderate but focused activity: two open issues and five PRs updated in the last 24 hours, including one merged release chore and three new feature proposals. Most contributions are from new contributors, indicating growing community engagement. Core maintainers remain active in CI/infrastructure and documentation updates, suggesting continued emphasis on reliability and usability.

---

### **2. Releases**  
🔹 **`ironclaw-v1.4.1`** – Released on **2026-09-29**  
[GitHub Release](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1)  

#### ✅ Key Changes:
- **Stable promotion** of `1.4.1-rc.2`, now fully released.
- **Fixed**: Google OAuth integration for Gmail and Google Calendar extensions — now supports operator-provided client credentials via the Web UI (previously required manual config).
- **Security update**: Wasmtime dependency upgraded to patch known vulnerabilities.

#### ⚠️ Migration Notes:
- No breaking changes reported.
- Users relying on Google extension activation should verify their deployment’s Web UI OAuth configuration aligns with the new flow.
- Ensure `config.toml` is updated if using custom profile overrides.

---

### **3. Project Progress**  
✅ **Merged / Closed PR (Today)**  
- [#8120](https://github.com/nearai/ironclaw/pull/8120): *chore(release): promote 1.4.1-rc.2 to 1.4.1*  
  - Finalized stable release pipeline; promoted tested RC2 build to production-ready version `1.4.1`.
  - Updated changelogs, package locks, and release metadata.

🚀 **Key Feature Advancements (Open PRs)**  
- [#8119](https://github.com/nearai/ironclaw/pull/8119): *feat(loop-host): opt-in tool selection with embeddings*  
  - Introduces early tool ranking before first model call using BM25F + embeddings.
  - Enables direct tool invocation without initial `tool_search` round trip (opt-in by default).
  - High-impact UX improvement for conversation efficiency.

- [#8117](https://github.com/nearai/ironclaw/pull/8117): *fix(webui): restore focus after closing command palette*  
  - Fixes regression where typing resumed in `<body>` instead of original input field after Cmd/Ctrl+K dismissal.
  - Improves keyboard-centric workflow consistency.

- [#8118](https://github.com/nearai/ironclaw/pull/8118): *fix(cli): report effective config profile*  
  - Ensures `ironclaw config path`, `doctor`, and `status` correctly reflect resolved profile when `IRONCLAW_REBORN_PROFILE` is unset.
  - Prevents confusion in multi-profile environments.

---

### **4. Community Hot Topics**  
🔥 **Top Issue: #7889** – [RFC: extend scheduler/orchestrator with opt-in remote edge workers](https://github.com/nearai/ironclaw/issues/7889)  
- Created: 2026-08-25 | Updated: 2026-09-29 | 1 comment | 0 likes  
- **Summary**: Operators want to leverage idle compute across multiple hosts (e.g., home servers, cloud VMs) to scale worker pools beyond a single host.  
- **Need Analysis**: This reflects demand for decentralized, scalable agent execution — a key step toward true distributed AI orchestration. While current architecture supports parallel jobs and Docker/WASM sandboxing, it remains constrained to local resources. This RFC signals interest in expanding IronClaw’s operational footprint beyond monolithic deployments.

🔥 **Top PR: #8119** – [feat(loop-host): opt-in tool selection with embeddings](https://github.com/nearai/ironclaw/pull/8119)  
- Created: 2026-09-29 | Open | 0 comments | 0 likes  
- **Significance**: Addresses a core performance bottleneck in agent conversations — unnecessary round trips due to `tool_search`. By pre-ranking tools based on semantic relevance (BM25F + embeddings), this reduces latency and improves model autonomy.  
- **Trend Indicator**: Early-stage adoption of advanced NLP techniques (embeddings) suggests roadmap shift toward intelligent, context-aware agent behavior rather than rule-based triggers.

---

### **5. Bugs & Stability**  
⚠️ **No critical bugs or crashes reported today.**  
- All recent PRs address minor UX fixes or infrastructure improvements.
- **PR #8117** resolves a regression in Web UI focus behavior — previously caused user frustration during rapid interaction workflows.
- **PR #8118** corrects misreported config profiles, which could lead to unintended runtime behavior in complex setups.
- No high-severity issues filed in the past 24h. System stability appears strong post-release.

---

### **6. Feature Requests & Roadmap Signals**  
🔍 **Emerging Themes:**  
- **Distributed Execution**: #7889 indicates growing interest in federated worker pools — likely a candidate for v1.5 or v1.6.
- **Intelligent Tool Selection**: #8119 (and related issue #8113) suggest a push toward smarter, proactive agent decision-making. Combining BM25F with embeddings implies deeper integration with vector databases and LLM-driven inference.
- **User-Centric UX**: Focus on CLI/config clarity (#8118) and Web UI polish (#8117) signals maturity in product design — moving beyond raw functionality to seamless user experience.

🎯 **Predicted Inclusion in Next Major Version (v1.5):**  
- Opt-in remote edge workers (via RPC/worker registration protocol)
- Semantic tool ranking at turn-zero (with configurable thresholds)
- Enhanced config introspection and error messaging

---

### **7. User Feedback Summary**  
💬 **Observed Pain Points (from Issues & PRs):**  
- **Google OAuth setup friction**: Previously required manual JSON file injection; now fixed via Web UI (positive signal).
- **Tool discovery inefficiency**: Users frustrated by extra round trips (`tool_search`) before actual tool use — addressed by proposed embedding-based ranking.
- **Focus loss in Web UI**: A subtle but frequent annoyance impacting productivity during fast-paced interactions.
- **Config ambiguity**: Unclear which profile is active in CLI tools, leading to debugging delays.

✅ **Satisfaction Indicators:**  
- Stable release cycle (RC → stable) shows confidence in quality assurance.
- Rapid response to UX issues (e.g., focus restoration) demonstrates responsiveness.
- Growing contributor base (new names in PRs) suggests healthy ecosystem expansion.

---

### **8. Backlog Watch**  
📌 **Long-Pending Critical Issues Needing Attention:**  
- [#7889](https://github.com/nearai/ironclaw/issues/7889): *RFC: extend scheduler/orchestrator with opt-in remote edge workers*  
  - **Age**: 35 days old | **Status**: Open | **Priority**: High  
  - **Why**: Represents a foundational scalability challenge. Without remote worker support, IronClaw cannot effectively serve large-scale or geographically distributed agent networks.  
  - **Action Needed**: Maintain visibility; consider drafting a formal spec or MVP proposal.

- [#8113](https://github.com/nearai/ironclaw/issues/8113): *Proposal: opt-in turn-0 tool selection (BM25F + embeddings)*  
  - **Age**: 3 days | **Status**: Open | **Priority**: Medium-High  
  - **Note**: Already has a matching PR (#8119). Should be reviewed promptly to avoid drift between issue and implementation.

> 🔍 **Recommendation**: Prioritize reviewing #7889 and #8119 to accelerate innovation momentum. These represent both technical evolution and user-driven value.

--- 

**Project Health Score**: ✅ **Healthy & Scaling**  
IronClaw continues its trajectory toward a mature, distributed AI agent platform — balancing stability with forward-looking features. With strong community participation and disciplined release practices, the project is well-positioned for broader adoption in 2026–2027.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-30**

---

### **1. Today's Overview**  
QwenPaw (v2.2.1 stable) remains highly active with robust contributor engagement: 36 pull requests and 11 new issues reported in the past 24 hours. The project shows strong momentum in stability fixes, particularly around task tracking, media handling, and desktop platform reliability. While no new releases have been published, a surge in PRs—especially those addressing core runtime behavior, security hardening, and UI/UX consistency—indicates imminent patch-level updates. Community-driven feature requests are increasingly focused on deployment flexibility and customization, signaling maturity in user adoption beyond basic use cases.

---

### **2. Releases**  
*No new releases were published in the last 24 hours.*  
The latest stable version remains **QwenPaw v2.2.1 (PyPI)**, released earlier this year. No breaking changes or migration notes apply at this time. Users are advised to monitor upcoming patch releases for critical fixes related to task tracking (`#7991`), transcription model configuration (`#8035`), and large skill downloads (`#8013`).

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #8025**: *fix(desktop): disable NSIS solid compression* – Improves Windows installer reliability by preventing silent corruption during decompression.  
- ✅ **PR #8026**: *fix(ci): address cross-platform paths, sandbox cleanup, and Windows terminal interrupts* – Resolves intermittent CI failures across OS platforms, especially on Windows.  
- ✅ **PR #8024**: *fix(portability): reject invalid qoder timezones* – Prevents crashes due to malformed timezone inputs on Windows systems.  
- ✅ **PR #8023**: *fix(terminal): support high posix descriptors* – Fixes terminal session instability when file descriptor counts exceed `FD_SETSIZE` (common in high-concurrency environments).  
- ✅ **PR #7773, #7765, #7718**: Telegram channel improvements – Ensures `/start` handshake is consumed, corrects command targeting logic, and renders approval cards using proper HTML parsing mode.  

These closed PRs collectively strengthen cross-platform compatibility, improve system resilience, and enhance messaging fidelity in bot integrations.

---

### **4. Community Hot Topics**  
**Top Issues by Activity & Impact:**  
- 🔥 **Issue #7991** ([Open](https://github.com/agentscope-ai/QwenPaw/issues/7991)): *TaskTracker reports inconsistent running task count* — A critical inconsistency between dashboard UI and API response (2 vs 1 running tasks). This affects monitoring and debugging workflows. **Fix pending**; currently under discussion.  
- 🔥 **Issue #8036** ([Open](https://github.com/agentscope-ai/QwenPaw/issues/8036)): *OpenAI integration fails despite successful connection test* — Users report generation failures even after passing connectivity checks, with vague error messages replacing actionable logs. High priority due to widespread OpenAI usage.  
- 🔥 **Issue #8013** ([Open](https://github.com/agentscope-ai/QwenPaw/issues/8013)): *Large skill download times out prematurely* — Frontend aborts after 30 seconds despite backend still processing. Affects users deploying complex skills like `ppt-master`.  
- 🔥 **PR #8027** ([Open](https://github.com/agentscope-ai/QwenPaw/pull/8027)): *Offload skill pool download to worker thread* — Directly addresses `#8013`; proposes threading to prevent UI blocking. Already flagged as a high-priority fix.  

> 💡 **Underlying Needs**: Users demand greater **transparency in state reporting**, **resilience under heavy load**, and **better control over long-running operations**—especially in enterprise/intranet deployments.

---

### **5. Bugs & Stability**  
**Ranked by Severity & Impact:**  
| Issue | Description | Status | Fix PR? |
|------|-------------|--------|--------|
| 🛑 **#7991** | TaskTracker inflates `running_task_count` — dashboard shows 2, API shows 1 | Open | ❌ |
| 🛑 **#8036** | OpenAI image/text model generation fails post-connection test | Open | ❌ |
| ⚠️ **#8035** | Transcription settings silently break model switching | Open | ❌ |
| ⚠️ **#8022** | Empty assistant message + file block pollutes context → 400 errors | Open | ❌ |
| ⚠️ **#8013** | 30-second timeout kills large skill downloads mid-process | Open | ✅ (PR #8027 proposed) |

> ⚠️ **Critical Risk**: Inconsistent task status reporting (`#7991`) undermines trust in system health metrics and could mislead automated monitoring tools.

---

### **6. Feature Requests & Roadmap Signals**  
**Emerging Priorities for Next Release:**  
- 🎯 **#8015** ([Open](https://github.com/agentscope-ai/QwenPaw/issues/8015)): *Support custom Skill/Plugin market sources* — Requested for intranet/air-gapped deployments. Strong signal for **enterprise-grade customization**.  
- 🎯 **#2359** ([Open](https://github.com/agentscope-ai/QwenPaw/issues/2359)): *Add HEARTBEAT_OK / CRON_OK control flags* — Enables fine-grained model output control in scheduled agents. Suggests growing interest in **orchestration precision**.  
- 🎯 **#7999** ([Closed](https://github.com/agentscope-ai/QwenPaw/issues/7999)): *Desktop font size adjustment* — Though resolved, it highlights UX accessibility needs. Likely to be re-opened if future versions lack scalable UI.  
- 🎯 **PR #7903** ([WIP](https://github.com/agentscope-ai/QwenPaw/pull/7903)): *Integrate QwenPaw community feed & inbox* — Indicates move toward **user-generated content ecosystems** and embedded collaboration features.

> 🔮 **Prediction**: Next minor release (likely v2.2.2) will include **custom plugin sources**, **HEARTBEAT/CRON control**, and **worker-threaded skill downloads**.

---

### **7. User Feedback Summary**  
Real-world pain points reflect advanced usage patterns:  
- **Enterprise users** struggle with air-gapped deployments (`#8015`) and unreliable OpenAI image generation (`#8036`).  
- **Power users** report frustration with unresponsive UIs during large skill transfers (`#8013`) and silent transcription failures (`#8035`).  
- **Accessibility needs** surfaced via font scaling request (`#7999`), indicating diverse user base including elderly and high-DPI display users.  
- **Trust issues** arise from mismatched task counts (`#7991`), where dashboards don’t align with API data — eroding confidence in system integrity.  
- **Security concerns** are rising: COM automation bypasses (`#8028`) and unhandled code blocks (`#8012`) suggest need for stricter input sanitization.

---

### **8. Backlog Watch**  
**Long-standing or high-impact items needing attention:**  
- 🔹 **Issue #7991** — *TaskTracker zombie entries inflate counter* (Created: 2026-09-26, updated: 2026-09-30)  
  - **Why**: Impacts all monitoring and dashboard logic. Still open with no assigned maintainer.  
- 🔹 **Issue #2359** — *HEARTBEAT_OK / CRON_OK for model message control* (Created: 2026-03-26, updated: 2026-09-29)  
  - **Why**: Long-lived feature request with clear design precedent (OpenClaw). Needed for advanced agent orchestration.  
- 🔹 **PR #7903** — *Community & inbox integration* (Created: 2026-09-20, WIP)  
  - **Why**: Major architectural shift. Requires review and prioritization to avoid stagnation.  

> ⏳ **Recommendation**: Assign maintainers to **#7991** and **#2359** immediately. Review **PR #7903** for roadmap alignment.

---

**Project Health Score**: 🟡 **Moderate-to-High**  
Despite growing pains in stability and feature parity, QwenPaw demonstrates strong community involvement, rapid PR turnover, and strategic focus on production-readiness. Continued investment in observability, error transparency, and deployment flexibility will determine its trajectory into 2027.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-30  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **27 new issues and 50 pull requests updated in the last 24 hours**, indicating strong momentum in both feature development and issue triage. Activity is concentrated in core areas: **security hardening, agent memory architecture, plugin lifecycle management, and identity/access control**. The absence of new releases suggests a focus on stabilizing internal changes ahead of a potential v1.0 or schema V4 rollout. Despite high-volume contributions, many critical issues remain open—especially those marked as S0 (security risk)—highlighting ongoing tension between rapid innovation and robustness.

---

### **2. Releases**

> ❌ **No new releases** were published in the past 24 hours.  
> No release notes, breaking changes, or migration guidance are currently available.

*Note:* The lack of releases may reflect preparatory work for a major update, particularly around Schema V4 (`#8310`, `#8754`) and OIDC integration (`#8289`), which could signal an upcoming stable milestone.

---

### **3. Project Progress**

#### ✅ **Merged / Closed PRs (Today)**  
While no PRs were officially merged today, several **critical fixes were closed in the last 24h**:

- **[PR #11260](https://github.com/zeroclaw-labs/zeroclaw/pull/11260)** – Fixed context budget clamping to 32k fallback despite configured `max_context_tokens = 131072`. This resolves a key usability bug affecting large-context agents.
- **[Issue #10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068)** – Closed after fix implementation; interactive sessions now respect user-defined context limits.
- **[Issue #11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197)** – Session resume now properly respects admin revocation, mitigating a severe security risk.

These closures indicate progress in **context handling and access control**, especially around session lifecycle integrity.

---

### **4. Community Hot Topics**

| Issue / PR | Comments | Link | Analysis |
|-----------|---------|------|--------|
| **[RFC #11235: Knowledge corpus — RAG for agent](https://github.com/zeroclaw-labs/zeroclaw/issues/11235)** | 1 | [Issue #11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) | Early-stage RFC signaling growing demand for **document retrieval (RAG)** capabilities. Indicates users want agents to leverage private knowledge bases beyond tool calls. |
| **[PR #11218: Migrate retired keys at Schema V4](https://github.com/zeroclaw-labs/zeroclaw/pull/11218)** | 0 | [PR #11218](https://github.com/zeroclaw-labs/zeroclaw/pull/11218) | Part of the larger **Schema V4 refactor**. High-impact change; carries forward prior work from `#8754`. Shows team prioritizing config cleanup and long-term maintainability. |
| **[PR #11262: Plugin update with verified replacement](https://github.com/zeroclaw-labs/zeroclaw/pull/11262)** | 0 | [PR #11262](https://github.com/zeroclaw-labs/zeroclaw/pull/11262) | Addresses **missing `plugin update` CLI command** (`#10995`). Critical for plugin lifecycle hygiene. Stacked with `#11261`, showing focused effort on plugin reliability. |

🔍 *Underlying Need:* Users are demanding **more reliable, secure, and predictable plugin and configuration management**, especially as the system scales toward production use.

---

### **5. Bugs & Stability**

| Severity | Issue | Summary | Fix PR? | Status |
|--------|------|--------|--------|--------|
| 🔴 **S0** | [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) | Delegated memory tools lose principal scope | ❌ No PR yet | Open — **high-risk data leakage** |
| 🔴 **S0** | [#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239) | Owned sessions reach shared memory plane via `spawn_subagent` | ❌ No PR yet | Open — **principal isolation breach** |
| 🔴 **S0** | [#11123](https://github.com/zeroclaw-labs/zeroclaw/issues/11123) | SOP execution accepts wildcard tool selectors without `tools:execute` | ❌ No PR yet | Open — **policy bypass vulnerability** |
| 🟡 **S1** | [#11237](https://github.com/zeroclaw-labs/zeroclaw/issues/11237) | Config editor cannot write declarative cron schedules | ✅ [PR #11238](https://github.com/zeroclaw-labs/zeroclaw/pull/11238) | In review — workflow blocker |
| 🟡 **S2** | [#11257](https://github.com/zeroclaw-labs/zeroclaw/issues/11257) | WhatsApp Web drops inbound media captions | ❌ No fix yet | Degraded UX |
| 🟡 **S2** | [#11256](https://github.com/zeroclaw-labs/zeroclaw/issues/11256) | `initial_prompt` not sent to transcription providers | ❌ No fix yet | Minor but noticeable gap |
| 🟡 **S2** | [#11215](https://github.com/zeroclaw-labs/zeroclaw/issues/11215) | Tool calling fails on OpenCode Go due to `"name"` field rejection | ❌ No fix yet | Compatibility issue |

⚠️ **Critical Note:** Five **S0 bugs** remain open, all related to **security policy enforcement and principal isolation**. These represent serious risks to trust and compliance, especially in enterprise deployments.

---

### **6. Feature Requests & Roadmap Signals**

| Feature Request | Issue | Priority | Signal |
|----------------|------|----------|--------|
| **Knowledge graph as first-class memory layer** | [#11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) | P2, Risk: High | Strong architectural shift — moving from tool-based to **persistent, structured memory**. Likely a foundational component for future AI agents. |
| **Plugin-owned Kanban board for agent work** | [#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) | P2, Risk: High | Suggests growing need for **agent task orchestration and visibility** — possibly indicating move toward autonomous agent teams. |
| **Save inbound WhatsApp images to workspace** | [#11255](https://github.com/zeroclaw-labs/zeroclaw/issues/11255) | P2 | User-driven request reflecting real-world use case: **media preservation and agent awareness**. |
| **Standard text editing in ZeroCode composer** | [#10909](https://github.com/zeroclaw-labs/zeroclaw/issues/10909) | P2 | Highlights UX maturity needs — current editor lacks basic functionality like undo/redo. |

🔮 **Prediction:** Features around **memory, task tracking, and media handling** are likely to be prioritized in the next 3–6 months, especially as the project moves toward **autonomous agent systems**.

---

### **7. User Feedback Summary**

- **Pain Points:**
  - Agents fail to retain context from cron jobs (`#6105`) → undermines automation reliability.
  - `initial_prompt` is ignored by transcription services (`#11256`) → affects voice-to-text accuracy.
  - Media captions lost on WhatsApp (`#11257`) → breaks user expectations for rich content.
  - Cron schedule editing broken (`#11237`) → blocks config authoring workflows.

- **Satisfaction Signals:**
  - Users appreciate **structured RFC processes** (`#11053`, `#11235`) and **transparent issue tracking**.
  - The **OIDC milestone completion** (`#8289`) was celebrated as a major step toward enterprise-grade identity.

- **Use Case Insight:** Users are increasingly deploying ZeroClaw in **production-like environments** (e.g., cron-driven reminders, multi-channel messaging), demanding **reliability, security, and UX polish**.

---

### **8. Backlog Watch**

| Issue | Age | Status | Why It Matters |
|------|-----|--------|----------------|
| **[#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126)** | Open since 2026-09-25 | P1, S1 | Queued session operations bypass revoked admin ownership — **critical access control flaw**. Partial fix exists (`#10412`), but full resolution pending. Needs urgent attention. |
| **[#11229](https://github.com/zeroclaw-labs/zeroclaw/issues/11229)** | Open since 2026-09-29 | P2 | Session ownership migration recreates deleted metadata — **race condition risk**. Low comment count but high impact if triggered. |
| **[#11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053)** | Open since 2026-09-22 | P2, RFC | **Knowledge graph as memory layer** — foundational for future agent intelligence. Should be fast-tracked given its strategic importance. |

🚨 **Urgent Attention Needed:** Several high-severity issues remain unresolved despite being flagged for weeks. Maintainers should prioritize **S0 security bugs** and **core architectural RFCs** to prevent technical debt accumulation.

---

## ✅ **Final Assessment: Health Score — 7.8 / 10**

ZeroClaw shows strong engineering discipline and community engagement, with a clear vision for advanced agent systems. However, **security vulnerabilities and UX gaps** threaten adoption beyond early adopters. With careful prioritization of S0 issues and acceleration of memory/RAG features, ZeroClaw is poised to become a leading open-source AI agent platform by Q1 2027.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*