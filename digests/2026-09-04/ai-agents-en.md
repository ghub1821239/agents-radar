# OpenClaw Ecosystem Digest 2026-09-04

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-04 00:22 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-04**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with over **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development momentum across core infrastructure, UI/UX, and agent runtime stability. The release of **v2026.9.1** marks a significant milestone, introducing native diagram rendering in chat and streamlining installation-to-chat workflows. While community engagement is robust—evidenced by high comment counts on critical issues—the volume of open bugs (especially P0/P1 severity) suggests ongoing challenges in session state integrity, memory management, and cross-platform reliability.

---

### **2. Releases**  
#### **v2026.9.1: openclaw 2026.9.1**  
**Highlights:**  
- ✅ **Diagrams in every chat**: Mermaid blocks now render as interactive diagrams directly in Control UI and native iOS, macOS, and Android apps. Users can enlarge previews and retry failed renders on mobile devices.  
- ✅ **From install to chat**: Streamlined setup path reduces friction for new users, enabling immediate agent interaction post-installation.  

> 🔗 [Release Notes](https://github.com/openclaw/openclaw/releases/tag/v2026.9.1)  
> ⚠️ **Migration Note**: No breaking changes reported; upgrade recommended for all users. Minor performance improvements in WebSocket handling and media loading are included.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- `#137637` – **Fix release flow**: Implements early failure detection in publish pipeline, reducing release time loss from ~6 hours to seconds.  
- `#137614` – **Performance fix**: Resolves heartbeat enrollment redundancy, cutting 45–57s freeze cycles during health checks on large deployments.  
- `#137670` – **Code Mode optimization**: Reuses result encoding during budget fitting, improving response latency in tool-heavy workflows.  
- `#137703` – **Agent catalog reuse**: Avoids unnecessary rebuilds of unchanged tool entries, boosting startup efficiency.  
- `#137677` – **Discord presence safety**: Prevents prototype-based activity type injection (security hardening).  

These fixes reflect a strong focus on **performance, reliability, and security hardening** in the latest stable release.

---

### **4. Community Hot Topics**  
Top Issues by comment count reveal deep user concerns around **session stability, memory corruption, and agent ownership logic**:

| Issue | Comments | Severity | Key Concern |
|------|----------|----------|-------------|
| [#125626](https://github.com/openclaw/openclaw/issues/125626) | 24 | P2 | Feedback loop for v2026.8.1-beta; testing phase for upcoming release |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | 12 | P1 | `AgentSelectionRequiredError` floods logs under explicit multi-agent mode |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) | 12 | P1 | Overflow retry ends successfully without final delivery → message loss risk |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | 11 | P1 | SQLite tables grow unbounded → disk exhaustion risk |
| [#125344](https://github.com/openclaw/openclaw/issues/125344) | 8 | P1 | Memory-core workers leak → cgroup strangulation |

> 📌 **Underlying Need**: Users demand **predictable session lifecycle behavior**, **resource accountability**, and **transparent error signaling**—especially in production multi-agent environments.

---

### **5. Bugs & Stability**  
Critical stability issues persist, with multiple **P0/P1 regressions** reported post-v2026.8.1:

| Bug | Severity | Description | Fix PR? |
|-----|----------|-------------|--------|
| [#126821](https://github.com/openclaw/openclaw/issues/126821) | P0 | SQLite corruption recurs after pristine rebuild (15–24h), causes "paralyzed gateway" state | ❌ No fix yet |
| [#136113](https://github.com/openclaw/openclaw/issues/136113) | P1 | `claude-cli` returns empty response when stdout >50KB → 11/25 turns lost | ❌ No fix yet |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | P1 | SSH command executor hangs indefinitely after SIGTERM | ❌ No fix yet |
| [#136452](https://github.com/openclaw/openclaw/issues/136452) | P0 | `compaction.maxActiveTranscriptBytes` ignored for heartbeat-driven sessions → V8 OOM | ❌ No fix yet |
| [#136311](https://github.com/openclaw/openclaw/issues/136311) | P0 | Reindex lock never released → 19GB orphaned temp DBs accumulate | ❌ No fix yet |

> ⚠️ **Risk Summary**: Multiple **data loss**, **crash-loop**, and **memory exhaustion** scenarios are actively affecting users. Critical path for v2026.9.2.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven feature requests indicate growing demand for **operational control, auditability, and autonomy**:

| Request | Priority | Trend Signal |
|--------|----------|--------------|
| [#39406](https://github.com/openclaw/openclaw/issues/39406) | P3 | Configurable suppression of transient tool warnings → reduce UX noise |
| [#121729](https://github.com/openclaw/openclaw/issues/121729) | P3 | Daily spending allowances for background agents → cost control |
| [#72741](https://github.com/openclaw/openclaw/issues/72741) | P1 | Standard interface for external security/guardrail checks → compliance integration |
| [#126781](https://github.com/openclaw/openclaw/issues/126781) | P3 | Durable Lobster workflows from `/loop` and Automations → long-running task resilience |

> 🧭 **Prediction**: These features are likely candidates for **v2026.10.0** or **v2026.11.0**, especially if security and cost governance become focal points in enterprise adoption.

---

### **7. User Feedback Summary**  
Real-world usage reveals key pain points:
- **Multi-agent complexity**: Users report confusion with `explicit` ownership and frequent `AgentSelectionRequiredError` floods, especially in Slack/Matrix integrations.
- **Unreliable diagnostics**: Many users struggle with `doctor` commands failing silently or blocking upgrades due to legacy locks.
- **Memory/index instability**: Persistent complaints about `memory status` reporting inconsistent states (`Dirty: no` but index lags behind disk).
- **Platform-specific failures**: Windows, WSL2, and macOS show divergent behaviors in SSH, file locking, and process cleanup.
- **Positive sentiment**: High praise for **diagram rendering** in v2026.9.1 and improved **mobile preview support**.

> 💬 *"I finally get visual context in my chats — this is game-changing."* – @Patrick-Erichsen

---

### **8. Backlog Watch**  
High-impact, long-standing issues requiring maintainer attention:

| Issue | Status | Why It Matters |
|------|--------|----------------|
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | Open (P1) | Unbounded SQLite growth → guaranteed disk exhaustion on long-running instances |
| [#123799](https://github.com/openclaw/openclaw/issues/123799) | Open (P1) | Production teams stuck on outdated Codex version need safe upgrade guidance |
| [#136175](https://github.com/openclaw/openclaw/issues/136175) | Open (P1) | Full reindex saturates CPU → blocks diagnostics; needs mitigation |
| [#135970](https://github.com/openclaw/openclaw/issues/135970) | Closed (but regression) | Missing `node_modules` in `dist/extensions/codex` → broken inference in fresh installs |
| [#137612](https://github.com/openclaw/openclaw/pull/137612) | Open (P3) | CI inefficiency — repeated setup slows contributor experience |

> 🛠️ **Call to Maintainers**: Prioritize **disk retention policies**, **release validation automation**, and **diagnostic clarity** to stabilize production-grade deployments.

---

✅ **Project Health Assessment**: **High activity, moderate stability**. Strong innovation velocity in UI/UX and core perf, but persistent critical bugs threaten reliability in production. Immediate focus should be on **session persistence, memory safety, and upgrade path clarity**.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Open-Source AI Agent Ecosystem – 2026-09-04**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem is entering a pivotal phase of maturation, marked by rapid convergence on core infrastructure needs: session reliability, security hardening, cross-platform consistency, and operational observability. Projects are shifting from individual tool experimentation toward building scalable, team-ready agent platforms with enterprise-grade governance. While innovation remains strong—particularly in UI/UX, workflow automation, and multi-agent orchestration—critical stability issues across multiple projects signal that production readiness hinges on resolving deep-rooted memory, state, and error-handling challenges.

---

### **2. Activity Comparison**

| Project       | Issues (24h) | PRs (24h) | Release Status         | Health Score (Out of 10) |
|---------------|--------------|-----------|------------------------|----------------------------|
| **OpenClaw**  | 500          | 500       | v2026.9.1 (Stable)     | 7.0                        |
| **Hermes Agent** | 50         | 50        | v0.21.0 (No new release) | 6.8                        |
| **IronClaw**  | 6            | 10        | No new release         | 8.5                        |
| **QwenPaw**   | 30           | 27        | v2.2.0 (Stable)        | 8.0                        |
| **ZeroClaw**  | 50           | 50        | No new release         | 7.5                        |

> ✅ *Note: High issue/PR volume correlates with active development cycles; stable releases indicate readiness for adoption.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most **velocity-driven project** in the ecosystem, with unprecedented activity levels (500+ issues/PRs daily), reflecting its role as a **core reference implementation** for agent frameworks. Its technical approach emphasizes **rapid iteration**, **user-centric UX enhancements** (e.g., native diagram rendering), and **streamlined onboarding**, making it ideal for early adopters and developers seeking immediate functionality. Compared to peers, OpenClaw has the largest community footprint and highest engagement density, though this comes with trade-offs: persistent P0/P1 bugs around session integrity and memory safety suggest growing pains in scaling complex workflows.

---

### **4. Shared Technical Focus Areas**  
Multiple projects converge on several high-priority technical requirements:

- **Session & State Integrity**:  
  - *OpenClaw* (#114612, #125344): Unbounded SQLite growth, memory leaks  
  - *Hermes Agent* (#99956, #102526): Session locks blocking cron jobs, profile misrouting  
  - *ZeroClaw* (#10068): Context limits ignored despite config override  

- **Error Visibility & Debugging**:  
  - *IronClaw* (#8009): MCP egress errors collapsed into generic `response_error`  
  - *QwenPaw* (#7532): Langfuse output blank after enablement  
  - *ZeroClaw* (#10202): Missing tracing bridges in dependencies  

- **Security & Sandbox Hardening**:  
  - *ZeroClaw* RFCs (#6996, #9328): Granular filesystem sandboxing, verifiable intent chain validation  
  - *QwenPaw* (#7511): Security sandbox breach reported post-v2.2.0  
  - *OpenClaw* (#137677): Prototype-based activity injection prevention  

> 📌 These recurring themes indicate a systemic need for **predictable lifecycle management**, **rich telemetry**, and **defense-in-depth architecture** across all projects.

---

### **5. Differentiation Analysis**

| Project       | Feature Focus                              | Target Users                          | Technical Architecture                     |
|---------------|--------------------------------------------|----------------------------------------|--------------------------------------------|
| **OpenClaw**  | Rapid UX innovation, mobile-first chat    | Individual users, dev teams            | Monorepo with integrated CLI/UI, WebSocket-heavy |
| **Hermes Agent** | Automation resilience, TUI/CLI robustness | DevOps, CI/CD pipelines                | Modular plugin system, systemd/cron integration |
| **IronClaw**  | Type safety, subagent governance, budgeting | Enterprise, high-assurance workflows   | Strong typing (TS), model-aware resource control |
| **QwenPaw**   | Multi-tenant Hub, team collaboration       | Organizations, remote teams            | Dockerized multi-user runtime, reverse proxy support |
| **ZeroClaw**  | Security-first design, verifiable trust    | Privacy-conscious users, regulated sectors | WASM + OS-level sandboxing (Bubblewrap/Landlock), RFC-driven governance |

> 🔍 **Key Differentiator**: IronClaw and ZeroClaw lead in **security and architectural rigor**, while QwenPaw and OpenClaw prioritize **adoption velocity and usability**.

---

### **6. Community Momentum & Maturity**

| Tier               | Projects                                | Characteristics |
|--------------------|------------------------------------------|----------------|
| **Rapid Iteration** | OpenClaw, ZeroClaw, QwenPaw              | >50 issues/PRs/day; frequent feature drops; high user feedback volume |
| **Stabilization Phase** | Hermes Agent, IronClaw                   | Lower PR volume but higher quality; focus on refactoring, type safety, dependency hygiene |

> 💡 **Maturity Signal**: IronClaw’s 35.6% LOC reduction via refactor (#102117) and removal of `@ts-nocheck` directives reflect long-term sustainability efforts. In contrast, OpenClaw’s high churn suggests ongoing scalability challenges.

---

### **7. Trend Signals**  
From community feedback and PR activity, three dominant industry trends emerge:

1. **Shift to Team-Centric Platforms**  
   - QwenPaw’s v2.2.0 Hub launch, IronClaw’s subagent approval gates, and ZeroClaw’s RFC governance show demand for **multi-user, auditable, policy-controlled agent systems**—moving beyond solo assistants.

2. **Need for Operational Observability**  
   - Repeated complaints about silent failures, missing logs, and unactionable error messages (e.g., #8009, #7532) highlight a critical gap: **debuggable, traceable agent behavior** is now essential for real-world deployment.

3. **Security as Core Infrastructure**  
   - ZeroClaw’s RFCs on verifiable intent, IronClaw’s dynamic budgeting, and QwenPaw’s sandbox breach report underscore that **trust and isolation are no longer optional**—they must be baked into the stack from day one.

> ✅ **Value for Developers**: The ecosystem is evolving from “AI assistant” to “AI workforce platform.” Success will go to those who deliver **reliability, auditability, and security-by-design**—not just novelty or speed.

---

**Prepared for:** Technical Decision-Makers, Open-Source Maintainers, AI Platform Architects  
**Date:** 2026-09-04  
**Sources:** GitHub API data, project digests (openclaw/openclaw, nousresearch/hermes-agent, nearai/ironclaw, agentscope-ai/QwenPaw, zeroclaw-labs/zeroclaw)

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-04**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 pull requests updated in the past 24 hours—indicating strong community engagement and ongoing development momentum. A surge of high-severity bugs (P1/P2) related to session state, message delivery, and platform-specific stability has emerged, particularly around desktop, cron jobs, and TUI behavior. Despite no new releases, a significant wave of PRs focuses on refactoring, security hardening, and usability improvements. The ecosystem is clearly prioritizing robustness and cross-platform consistency ahead of upcoming feature integrations.

---

### **2. Releases**  
No new releases were published as of 2026-09-04. The last stable version remains v0.21.0 (2026.8.19), with recent updates focused on `main` branch stabilization rather than formal packaging. Users are advised to expect potential breaking changes if upgrading from older versions, especially regarding cron job handling and session state management.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #102442** – Closed: Protected-instruction gate never fired for `SOUL.md`/`AGENTS.md` due to path resolution logic; fix confirms default install safety.  
- ✅ **PR #47320** – Closed: Added portable handoff workflow via markdown context bundles, enabling seamless CLI-to-gateway continuity.  

**Key Advances:**  
- **PR #102117** (*refactor: whole-codebase simplification*) — Reduced source LOC by **35.6%**, decomposed large "god files", and improved maintainability without behavioral change. This foundational cleanup signals long-term architectural health.  
- **PR #102553** – Fixes Cloudflare 524 timeout handling for Deepseek Flash v4, improving resilience during infrastructure outages.  
- **PR #102529** – Introduces prebuilt Desktop artifacts in `hermes update`, reducing build times on macOS/Linux and improving UX for frequent updaters.

---

### **4. Community Hot Topics**  
Top issues reflect urgent pain points across platforms:

- 🔥 **Issue #88584**: [Automated Nous integration blocked](https://github.com/NousResearch/hermes-agent/issues/88584) — 60 comments, P3, comp/cron. *High friction in CI/CD pipeline due to merge conflicts in `cron/jobs.py`. Suggests automation fragility in core workflows.*  
- 🔥 **Issue #90663**: [TUI lowercases Shift+letter input on Ghostty (macOS)](https://github.com/NousResearch/hermes-agent/issues/90663) — 10 comments, P1, comp/tui. *Critical UX regression for power users typing code or commands.*  
- 🔥 **Issue #99956**: [Cron bot-chat delivery fails with active session lock](https://github.com/NousResearch/hermes-agent/issues/99956) — 5 comments, P1, comp/cron. *Blocks scheduled automation when interactive sessions are open — common in production environments.*  
- 🔥 **Issue #102526**: [Desktop opens wrong profile chat due to HERMES_HOME race](https://github.com/NousResearch/hermes-agent/issues/102526) — 1 comment, P1, comp/desktop. *Security-sensitive data exposure risk; misrouting of user conversations.*  

> **Underlying Need**: Users demand **predictable, secure, and resilient automation** across all interfaces—especially when integrating into real-world workflows involving multiple profiles, scheduled tasks, and concurrent access.

---

### **5. Bugs & Stability**  
| Severity | Issue | Description | Fix PR? |
|--------|------|-------------|--------|
| **P1** | [#99956](https://github.com/NousResearch/hermes-agent/issues/99956) | Cron delivery fails if target profile has active session | ❌ No fix yet |
| **P1** | [#102526](https://github.com/NousResearch/hermes-agent/issues/102526) | Desktop launches wrong profile’s chat due to env override race | ❌ No fix yet |
| **P1** | [#102486](https://github.com/NousResearch/hermes-agent/issues/102486) | Cron worker dispatch fails on systemd 249 (`OOMPolicy=kill`) | ❌ No fix yet |
| **P2** | [#102511](https://github.com/NousResearch/hermes-agent/issues/102511) | `hermes cron run` leaves executions in `unknown` state after timeout | ❌ No fix yet |
| **P2** | [#88621](https://github.com/NousResearch/hermes-agent/issues/88621) | Incoming messages interrupt active typing in desktop | ❌ No fix yet |
| **P2** | [#96743](https://github.com/NousResearch/hermes-agent/issues/96743) | SSH remote mode stuck on "Connecting…" despite healthy backend | ❌ No fix yet |

> **Stability Concern**: Multiple critical bugs affect **session integrity**, **message delivery**, and **platform compatibility**—particularly on Windows, macOS, and Linux systems using systemd. These issues suggest deeper instability in state management and process lifecycle control.

---

### **6. Feature Requests & Roadmap Signals**  
Top-requested features indicate growing maturity and enterprise use cases:

- ✅ **System Tray Support (P1)** – [Issue #38007](https://github.com/NousResearch/hermes-agent/issues/38007): 13 👍, needs-decision. *Users want background operation without full app launch—critical for productivity tools.*  
- ✅ **Per-Goal Cost Attribution (P2)** – [Issue #39250](https://github.com/NousResearch/hermes-agent/issues/39250): 1 👍, telemetry. *Users need visibility into cost breakdown per agent goal—key for budgeting in AI workloads.*  
- ✅ **Cross-Profile Delegation Controls (P3)** – [Issue #53309](https://github.com/NousResearch/hermes-agent/issues/53309): 1 👍. *Trust-level segregation between profiles requires fine-grained access control.*  
- ✅ **Custom OpenAI-Compatible Provider UI (P3)** – [Issue #102552](https://github.com/NousResearch/hermes-agent/issues/102552): Duplicated models in picker, no hiding option. *Signals growing demand for self-hosted providers and better UI polish.*  

> **Prediction**: Next major release (likely v0.22.0) will prioritize **session reliability**, **system tray functionality**, and **cost transparency**—with possible inclusion of **structured media delivery** (PR #102547) and **rate-limit retry policies** (PR #102551).

---

### **7. User Feedback Summary**  
Real user pain points reveal deep usage patterns:
- **Desktop App**: Users report frustration with **non-responsive input fields**, **wrong session loading**, and **lack of background persistence**.  
- **CLI & Cron**: Frequent complaints about **silent failures**, **exit status loss**, and **unreliable task scheduling**—impacting CI/CD and automation pipelines.  
- **TUI (Ink)**: Mac-specific keyboard input bugs break developer workflows.  
- **Security & Trust**: Users are concerned about **data provenance loss** (`sessions.source` overwritten), **unprotected file access**, and **insecure model delegation**.  
- **Satisfaction**: Positive feedback on **refactoring efforts** (e.g., PR #102117) and **new model speed indicators** (PR #102490), showing appreciation for technical depth.

---

### **8. Backlog Watch**  
Several high-impact, long-standing issues remain unresolved:

- ⚠️ **[Issue #38007](https://github.com/NousResearch/hermes-agent/issues/38007)** – System tray support (Windows/Linux). *Still pending decision after 3 months. High user demand (13 👍).*  
- ⚠️ **[Issue #40470](https://github.com/NousResearch/hermes-agent/issues/40470)** – Prompt & response sanitization layer. *Critical for enterprise/data privacy use cases. Only 1 👍 but high risk.*  
- ⚠️ **[Issue #40555](https://github.com/NousResearch/hermes-agent/issues/40555)** – Pluggable publisher verification for skills. *Enables trust tiering beyond hardcoded repos—essential for community growth.*  
- ⚠️ **[Issue #98107](https://github.com/NousResearch/hermes-agent/issues/98107)** – Worker exit guard incorrectly nudges kanban workers. *Persistent logic flaw affecting workflow completion.*  

> **Action Needed**: Maintainers should triage these issues—especially those with **high severity**, **security implications**, or **long user wait times**—to prevent erosion of trust.

---

*Data sourced from GitHub: [NoussResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) – 2026-09-04*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

---

### **1. Today's Overview**  
As of 2026-09-04, IronClaw continues its steady momentum with active development and strong engineering discipline. The project shows high engagement: 18 pull requests updated in the last 24 hours (10 merged), and 6 new issues opened—indicating a healthy pace of bug reporting and feature refinement. Notably, there are no new releases, suggesting the team is prioritizing internal stability and quality over versioning churn. Core contributors remain focused on type safety, prompt budgeting, and subagent workflow improvements, with significant work underway to eliminate `@ts-nocheck` directives across WebUI components—a sign of long-term maintainability efforts.

---

### **2. Releases**  
No new releases were published as of 2026-09-04. The latest release remains unchanged from prior weeks. No breaking changes or migration notes are applicable at this time.

> 🔗 [GitHub Releases Page](https://github.com/nearai/ironclaw/releases)

---

### **3. Project Progress**  
The following PRs were merged today, representing key advancements in stability, performance, and type safety:

- **PR #8051** ([fix(reply): answer is current model call’s text](https://github.com/nearai/ironclaw/pull/8051)) – Corrected a semantic error where previous model call outputs were incorrectly included in live replies, ensuring only the *current* call’s output is surfaced. This improves clarity in real-time agent interactions.
- **PR #8043** ([perf(loop-host): coalesce streamed text updates](https://github.com/nearai/ironclaw/pull/8043)) – Reduced redundant sanitization and cloning during streaming, cutting CPU overhead by ~1,000x in edge cases (measured at 16 KiB in 1,000 deltas). A major win for responsiveness.
- **PR #8046** ([feat(subagent): child approval gate reaches owner inbox](https://github.com/nearai/ironclaw/pull/8046)) – Enabled visibility of blocked subagent children via parent inbox, resolving a critical UX gap in workflow governance.
- **PR #8037**, **#8038**, **#8039**, **#8040**, **#8035**, **#8036** – Part of an extensive refactoring wave removing `@ts-nocheck` directives across WebUI v2. These PRs collectively improve code quality, enforce typing at API boundaries, and prevent future suppression abuse.

These merges reflect a concerted focus on **type safety**, **performance optimization**, and **workflow transparency**.

---

### **4. Community Hot Topics**  
The most active discussion centers around two high-impact issues:

- **Issue #8057** – *[enhancement] Prompt budget should account for non-transcript material*  
  🔗 [View Issue](https://github.com/nearai/ironclaw/issues/8057)  
  **Summary**: Currently, the prompt budget only accounts for transcript content. Identity, skills, tool schemas, and memory snippets are added on top without reducing the budget, risking overflow. This is a systemic risk that could break agent behavior under load.  
  **Analysis**: This highlights growing maturity in agent design—users are now building complex, persistent agents with rich context. The need for accurate budget accounting suggests the system is approaching production readiness.

- **Issue #8009** – *[bug] MCP egress errors flatten to "response_error"*  
  🔗 [View Issue](https://github.com/nearai/ironclaw/issues/8009)  
  **Summary**: All `RuntimeHttpEgressError`s collapse into a single `"response_error"` token, losing granular details like byte counts and underlying causes. This makes debugging discovery failures nearly impossible.  
  **Analysis**: A symptom of deep integration complexity. As IronClaw expands its MCP (Model Control Protocol) ecosystem, observability becomes paramount. This issue signals a need for richer error telemetry in distributed agent systems.

Both issues are open but have zero reactions—suggesting they’re recognized as important but not yet escalated.

---

### **5. Bugs & Stability**  
Critical bugs reported today include:

| Severity | Issue | Description | Fix PR? |
|--------|-------|-------------|--------|
| ⚠️ High | [#8009](https://github.com/nearai/ironclaw/issues/8009) | MCP egress errors lose all diagnostic detail; failure modes indistinguishable | ❌ No fix PR yet |
| ⚠️ Medium | [#8056](https://github.com/nearai/ironclaw/issues/8056) | Malformed embedded tool-result text can cause panic during JSON parsing | ✅ PR #8056 is open and addresses it |
| ⚠️ Low | [#8059](https://github.com/nearai/ironclaw/issues/8059) | Cancel request returns 400 despite being sent mid-run | ✅ PR #8059 open; aims to align cancel reason parsing with surface API |

> 🔗 [Bug Dashboard](https://github.com/nearai/ironclaw/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

The absence of crashes in the latest runs suggests core execution is stable, but **observability gaps** (like #8009) pose latent risks.

---

### **6. Feature Requests & Roadmap Signals**  
Key roadmap indicators emerging from recent activity:

- **Dynamic Prompt Budgeting** (PR #8053):  
  🔗 [PR #8053](https://github.com/nearai/ironclaw/pull/8053)  
  Now derives budget from model’s advertised window (e.g., 128k → 90% = 115k limit). This signals a shift toward **model-aware resource management**, likely a prelude to multi-model agent orchestration.

- **Subagent Concurrency Limits & Approval Gates** (PR #8061):  
  🔗 [PR #8061](https://github.com/nearai/ironclaw/pull/8061)  
  Introduces concurrency caps and verifies child-gate replay logic—this is foundational for **enterprise-grade agent hierarchies** with access control and rate limiting.

- **Tool Search Reply Sizing** (PR #7984):  
  🔗 [PR #7984](https://github.com/nearai/ironclaw/pull/7984)  
  Tools now size responses to the *first-look envelope*, preventing data loss. This indicates a move toward **predictable, bounded tool interaction patterns**.

These features point to IronClaw’s next phase: **scalable, auditable, and secure agent ecosystems**—not just individual assistants.

---

### **7. User Feedback Summary**  
User pain points evident from issues and PRs:

- **Debugging difficulty**: Users cannot diagnose why MCP discovery fails due to flattened error messages (#8009).
- **Budget surprises**: Agents unexpectedly exceed context limits when identity/skills grow—users expect predictable behavior (#8057).
- **Missing feedback loops**: Subagents blocked on approval don’t notify owners until completion (#8046 was a fix for this).
- **Streaming inefficiency**: Performance bottlenecks observed during real-time response rendering (#8043).

Overall satisfaction appears high—no major complaints, but users are pushing the system to its limits. This reflects **early adopter maturity**: they’re not just testing features but building real workflows.

---

### **8. Backlog Watch**  
Several high-value issues remain unaddressed:

- **[Issue #8052]** – *Daily ironclaw failure taxonomy — 2026-09-03*  
  🔗 [View Issue](https://github.com/nearai/ironclaw/issues/8052)  
  **Status**: Open, no comments. Contains analysis of 63 failing OfficeQA tests—all due to model-quality issues, not code. Yet no action taken.  
  **Risk**: Without systematic failure classification, root causes may be missed. This is a **critical observability gap**.

- **[Issue #8057]** – *Prompt budget should account for non-transcript material*  
  🔗 [View Issue](https://github.com/nearai/ironclaw/issues/8057)  
  **Status**: Open, zero reactions. Despite being a known risk, no PR has been proposed.  
  **Risk**: Could lead to silent failures in complex agent scenarios.

- **[PR #7988]** – *chore(agents): refresh codebase knowledge graph*  
  🔗 [View PR](https://github.com/nearai/ironclaw/pull/7988)  
  **Status**: Open, auto-generated by CI bot. Requires manual review.  
  **Risk**: If not merged, the knowledge graph will become stale, hurting AI-assisted navigation and code understanding.

> 📌 **Recommendation**: Maintainers should prioritize reviewing #8052 and #8057—these represent strategic blind spots in system reliability.

--- 

✅ **Project Health Score: 8.5/10**  
IronClaw is in a strong state—engineers are addressing technical debt, improving observability, and laying groundwork for scalable agent systems. With minor fixes to error handling and budgeting, the project is poised for a major milestone release in Q4 2026.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-04**

---

### **1. Today's Overview**  
QwenPaw is experiencing a high-velocity development phase with strong community engagement, as evidenced by 30 new issues and 27 updated pull requests in the past 24 hours. The release of **v2.2.0 (Stable)** on September 3 marks a major milestone, signaling the project’s readiness for broader adoption. Active PRs focus on stability improvements, security hardening, and foundational architecture unification. A surge in user-reported bugs—particularly around multi-user access, streaming performance, and session management—suggests growing real-world usage and early feedback from advanced users.

---

### **2. Releases**  
✅ **v2.2.0 (Stable)** – Released on 2026-09-03  
[Release Page](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0)  

#### ✨ What’s Changed  
**QwenPaw Hub (Multi-Tenant Edition)**  
- Introduced self-hosted multi-user Hub with local-process or Docker runtime support  
- Added workspace-level access controls and credential management  
- Supports reverse-proxy integration for secure remote access  
> 🔗 Related: [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112)  

**QwenPaw Data**  
- Partial change log; details not fully visible in summary but likely includes schema updates related to model configuration and session persistence  

> ⚠️ **Migration Note**: Users upgrading from `2.1.0` should verify custom provider configurations due to deprecation of `max_tokens` in favor of `max_output_length` ([#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474)).  

---

### **3. Project Progress**  
#### ✅ Merged/Closed PRs (Today):  
- **#7522**: Version bumped to `2.2.1b1` — preparatory step for next beta cycle  
- **#7520**: Finalized “protected execution contract” feature — enhances agent safety and policy enforcement  
- **#7523**: Fixed session sync during streaming — enables seamless switching between active conversations  
- **#7487**: Theme token unification — improves UI consistency across platforms  
- **#7441**: Upgraded ReMe to v0.4.1.11 + added Auto Fin long-term memory source  
- **#7486**: Creator plugin enhancements (media scheduling, Windows hardening, Docker support)  
- **#7536**: Fixed OpenCode API requirement for `x-opencode-session` header  

These PRs reflect a focus on **security**, **stability**, and **user experience polish** ahead of stable adoption.

---

### **4. Community Hot Topics**  
Top 5 most active items (based on comments, urgency, and impact):

1. **#7318 [OPEN]** – *“What should we build next?”* – QwenPaw Hub multi-tenant roadmap discussion  
   > 📌 Community demand: Team collaboration, admin-managed skills, role-based access  
   > 🔗 [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 16 comments | 3 👍  
   > 💡 Insight: The project is shifting from personal AI assistant to team-ready platform — signals maturity.

2. **#7534 [OPEN]** – *Feishu session queue consumer stuck → silent unresponsiveness*  
   > 📌 High-severity UX blocker for enterprise users relying on Feishu integration  
   > 🔗 [Issue #7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) | 2 comments | 0 👍  
   > 💡 Need: Robust error handling and consumer lifecycle management in channel backends.

3. **#7511 [CLOSED]** – *Security sandbox breach reported*  
   > 🔗 [Issue #7511](https://github.com/agentscope-ai/QwenPaw/issues/7511) | 9 comments | 0 👍  
   > 💡 Critical: Despite closure, this highlights ongoing need for rigorous security audits post-v2.2.0.

4. **#7532 [OPEN]** – *Langfuse tool output blank after enablement*  
   > 🔗 [PR #7532](https://github.com/agentscope-ai/QwenPaw/pull/7532) | 1 comment | 0 👍  
   > 💡 Key pain point: Observability tools fail when enabled — undermines debugging and monitoring.

5. **#7516 [OPEN]** – *WeCom cannot send base64-encoded images*  
   > 🔗 [Issue #7516](https://github.com/agentscope-ai/QwenPaw/issues/7516) | 1 comment | 0 👍  
   > 💡 Platform-specific bug affecting mobile-first teams using WeCom.

---

### **5. Bugs & Stability**  
Ranked by severity and impact:

| Issue | Severity | Status | Summary | Fix PR? |
|------|----------|--------|---------|--------|
| **#7534** – Feishu session consumer stuck | 🔴 Critical | OPEN | Session becomes unresponsive after high-priority message processing | ❌ No fix yet |
| **#7511** – Security sandbox breach | 🔴 Critical | CLOSED | Indicates potential vulnerability in execution isolation | ⚠️ Patch applied but no public audit |
| **#7505** – LAN LLM server disconnects frequently | 🟡 High | OPEN | Causes retry loops and timeouts in local deployments | ❌ |
| **#7510** – `/memory/status` returns 500 on v2.2.0-beta.7 | 🟡 High | OPEN | Desktop app crashes under diagnostics | ❌ |
| **#7531** – OpenCode API requires missing header | 🟡 Medium | OPEN | Breaks third-party integration | ✅ [PR #7536](https://github.com/agentscope-ai/QwenPaw/pull/7536) |
| **#7474** – Custom provider fails after migration | 🟡 Medium | CLOSED | Due to `max_tokens` deprecation | ✅ Fixed via PR #7337 |

> ⚠️ **Pattern**: Post-v2.2.0 stability issues are largely tied to **multi-user**, **streaming**, and **channel-specific edge cases**.

---

### **6. Feature Requests & Roadmap Signals**  
Top user-requested features indicate future direction:

- **Mobile Remote Access** – #7519: "Add phone remote connection to desktop"  
  > 🔗 [Issue #7519](https://github.com/agentscope-ai/QwenPaw/issues/7519) | 2 comments  
  > 💡 Signal: Mobile-first access is becoming a priority — may drive native Expo/React Native client work.

- **Message Buttons & Interactive UI** – #7533: Support for action buttons in messages  
  > 🔗 [Issue #7533](https://github.com/agentscope-ai/QwenPaw/issues/7533) | 1 comment  
  > 💡 Suggests demand for richer, interactive conversational flows.

- **Session Architecture Unification** – #7541: "Sessions should not be split by channel"  
  > 🔗 [Issue #7541](https://github.com/agentscope-ai/QwenPaw/issues/7541) | 1 comment  
  > 💡 Core UX flaw: Users expect consistent session state regardless of interface used.

- **Persona Preservation During Context Compaction** – #7527  
  > 🔗 [Issue #7527](https://github.com/agentscope-ai/QwenPaw/issues/7527) | 1 comment  
  > 💡 Highlights need for deeper personality retention in long-running agents.

> 🚀 **Predicted Next Release Features**: Mobile remote access, unified session state, enhanced interactive UI, improved context compaction.

---

### **7. User Feedback Summary**  
Real-world pain points from recent issues:

- **Enterprise Teams**: Demand for **multi-user access**, **admin controls**, and **workspace-level permissions** (e.g., #7318).  
- **Remote Workers**: Frustration with **slow remote WebUI load times** (especially on mobile) — #7514, #7518.  
- **Developers & DevOps**: Struggles with **local LLM connectivity** (LAN timeout issues), **custom provider setup complexity**, and **tool observability gaps**.  
- **Integrators**: Pushback on **missing headers** (OpenCode), **inconsistent image handling** (WeCom), and **broken streaming** (WeCom).  
- **Satisfaction**: Positive reception to **Hub launch**, **security improvements**, and **cleaner UI** in v2.2.0.

> ✅ **Overall Sentiment**: High enthusiasm for v2.2.0’s capabilities, but urgent need for polish in stability, scalability, and cross-channel consistency.

---

### **8. Backlog Watch**  
Long-standing or high-impact issues needing attention:

- **#4036 [OPEN]** – *Adding a model requires too many steps and clicks*  
  > 🔗 [Issue #4036](https://github.com/agentscope-ai/QwenPaw/issues/4036) | 6 comments | 0 👍  
  > 📌 Pain point: UX friction in core workflow — critical for onboarding new users.

- **#1775 [OPEN]** – *Add Codex-style “steer mode” for mid-task guidance*  
  > 🔗 [Issue #1775](https://github.com/agentscope-ai/QwenPaw/issues/1775) | 3 comments | 0 👍  
  > 📌 Strategic feature: Enables dynamic agent correction — essential for complex workflows.

- **#7541 [OPEN]** – *Sessions must not be split by channel*  
  > 🔗 [Issue #7541](https://github.com/agentscope-ai/QwenPaw/issues/7541) | 1 comment | 0 👍  
  > 📌 Architectural flaw undermining user trust — should be prioritized in v2.3.

- **#7535 [OPEN]** – *Matrix channel lacks Element compatibility*  
  > 🔗 [Issue #7535](https://github.com/agentscope-ai/QwenPaw/issues/7535) | 1 comment | 0 👍  
  > 📌 Misses key ecosystem integration — affects privacy-focused users.

> ⏳ **Recommendation**: Assign dedicated maintainers to address these backlog items before v2.3 release.

---

**📌 Summary**: QwenPaw has crossed a critical threshold with v2.2.0’s stable release and multi-user Hub launch. While technical foundation is robust, **user-facing stability, UX polish, and cross-platform consistency** remain top priorities. The community is vocal, engaged, and shaping the next evolution — positioning QwenPaw as a leading open-source AI agent platform for both individuals and teams.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-04  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **50 new issues and 50 open pull requests updated in the last 24 hours**, indicating strong momentum across development, security, and architectural planning. The ecosystem is focused on **security hardening**, **sandboxing granularity**, and **multi-session UX improvements**, particularly around agent runtime behavior, gateway routing, and web UI continuity. While no new releases have been published, a surge in RFCs and implementation trackers signals an upcoming phase of coordinated feature delivery. High-priority bugs (P1/P2) related to security verification, session context limits, and provider misconfigurations are actively being addressed.

---

### **2. Releases**

> ❌ **No new releases** were published in the last 24 hours.

*There are currently no release notes or version updates to report.*

---

### **3. Project Progress**

#### ✅ **Merged / Closed PRs (Today)**  
While **no PRs were merged** in the past 24 hours, several critical fixes were closed:

- **PR #10486**: Fixed Matrix channel ignoring `providers.transcription.*` config — now respects agent-level transcription providers.
- **PR #9983**: Corrected error messaging for fallback models without vision support, improving clarity during model switching.
- **PR #9811**: Resolved `/health` endpoint falsely reporting healthy Telegram channels despite connection failures.
- **PR #9654**: Patched semantic leakage in operator denial responses, preventing model hallucination of causes.
- **PR #9387**: Secured interactive approval flows across Slack, Telegram, Lark, and Matrix by enforcing identity binding.

These closures reflect progress in **security validation**, **channel reliability**, and **error fidelity**.

---

### **4. Community Hot Topics**

The most active community discussions center on **security policy enforcement**, **agent session control**, and **cross-channel consistency**:

| Issue | Comments | Link | Key Focus |
|------|----------|------|---------|
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | 23 | [RFC: Granular sandbox policy - filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | Unifying application-layer path admission with OS-level sandboxes (Bubblewrap/Landlock) |
| [#9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328) | 14 | [Bug]: verifiable-intent evaluates constraints without verifying credential chain | Critical flaw in trust model — constraints evaluated without prior chain validation |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 14 | [Tracker]: Maintainer decision queue for RFCs | Systematic governance for RFC intake and architectural decisions |
| [#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050) | 13 | RFC: Verbatim channel send over the gateway | Enabling direct message injection via gateway without agent mediation |
| [#9975](https://github.com/zeroclaw-labs/zeroclaw/issues/9975) | 12 | RFC: define Web bundle/daemon compatibility for web_dist_dir | Establishing contract between web dashboard and daemon deployment |

🔍 **Underlying Needs**:  
- **Security-first architecture**: Users demand tighter integration between policy layers (app vs. OS sandbox).
- **Trust integrity**: Verifiable Intent must enforce cryptographic chain validation before constraint evaluation.
- **Governance transparency**: Maintainers need a visible, tracked decision pipeline for RFCs and design trade-offs.

---

### **5. Bugs & Stability**

High-severity bugs continue to surface, primarily affecting **runtime behavior**, **security checks**, and **session state management**:

| Bug | Severity | Link | Status | Fix PR? |
|-----|----------|------|--------|--------|
| [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | S1 (Workflow Blocked) | [OpenCode providers never send x-opencode-session](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | Open | ❌ No fix yet |
| [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | S1 | [Triage and remove bitmaps unmaintained advisory waiver](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | Blocked | ❌ Pending action |
| [#9231](https://github.com/zeroclaw-labs/zeroclaw/issues/9231) | S1 | [Docker runtime commands nested inside second Docker sandbox](https://github.com/zeroclaw-labs/zeroclaw/issues/9231) | In-progress | ❌ Not resolved |
| [#10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) | S2 | [Interactive agent caps context at 32k, ignoring max_context_tokens=131072](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) | In-progress | ❌ No fix |
| [#9387](https://github.com/zeroclaw-labs/zeroclaw/issues/9387) | S1 | [Approval responses accepted from any chat member](https://github.com/zeroclaw-labs/zeroclaw/issues/9387) | In-progress | ❌ Fix pending |

⚠️ **Critical Risk Areas**:  
- **Security vulnerabilities** in credential verification and approval flow.
- **Runtime misbehavior** due to improper sandbox nesting and context limits.
- **Dependency hygiene**: RUSTSEC-2026-0247 (bitmaps) still unresolved.

---

### **6. Feature Requests & Roadmap Signals**

Emerging features suggest a shift toward **agent autonomy**, **multi-modal interaction**, and **cross-platform consistency**:

| Request | Priority | Link | Significance |
|--------|----------|------|------------|
| [#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050) | P2 | [Verbatim channel send over gateway](https://github.com/zeroclaw-labs/zeroclaw/issues/10050) | Enables real-time command injection — likely for automation workflows |
| [#10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222) | P2 | [Opt-in single-tool provider rounds](https://github.com/zeroclaw-labs/zeroclaw/issues/10222) | Improves UX for tool-heavy agents; allows more natural turn-based control |
| [#10529](https://github.com/zeroclaw-labs/zeroclaw/issues/10529) | P2 | [Support Anthropic thinking.display progress updates](https://github.com/zeroclaw-labs/zeroclaw/issues/10529) | Addresses declining user feedback in Claude Fable 5.1 — signals intent to enhance user experience |
| [#10406](https://github.com/zeroclaw-labs/zeroclaw/issues/10406) | P2 | [Implement Gemini speech-to-speech broker channel](https://github.com/zeroclaw-labs/zeroclaw/issues/10406) | Expands voice-enabled agent capabilities across platforms |
| [#10405](https://github.com/zeroclaw-labs/zeroclaw/issues/10405) | P2 | [Implement session-scoped prompt attachments](https://github.com/zeroclaw-labs/zeroclaw/issues/10405) | Core for durable, contextual agent memory |

📌 **Prediction**: These features will likely be included in **ZeroClaw v0.9.0**, expected Q4 2026, as part of a major update focused on **agent persistence**, **voice interaction**, and **enterprise-grade security controls**.

---

### **7. User Feedback Summary**

Users are expressing frustration with:

- **Context limits**: Despite setting `max_context_tokens = 131072`, interactive sessions cap at 32k tokens (#10068), leading to unexpected truncation.
- **Session instability**: ZeroCode shows stale "Connected" status after daemon exit (#10238), causing confusion and lost work.
- **Missing telemetry**: Log-based dependencies (e.g., whatsapp-rust) fail to emit traces due to missing `log` → `tracing` bridge (#10202).
- **Tool feedback gaps**: Tools return short errors but lose detailed output, making debugging difficult (#10364).

✅ **Positive Notes**:
- Users appreciate **transparent RFC processes** and **active maintainership**.
- Many praise the **modular plugin system** and **WASM capability** (#7822), especially for custom agent extensions.

---

### **8. Backlog Watch**

Several high-impact issues remain unattended or blocked, requiring maintainer intervention:

| Issue | Status | Priority | Reason |
|------|--------|----------|--------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Accepted, no-stale | P2 | Maintainer decision queue needs formalization — **critical for roadmap clarity** |
| [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | Blocked | P1 | Security CI fails due to unmaintained `bitmaps` dependency — **urgent cleanup needed** |
| [#10570](https://github.com/zeroclaw-labs/zeroclaw/issues/10570) | Open, no-stale | P2 | Staged implementation tracker for ACP session memory continuity — **needs coordination** |
| [#10330](https://github.com/zeroclaw-labs/zeroclaw/issues/10330) | Open, no-stale | P2 | Index of accepted RFCs — **essential for contributor onboarding** |

➡️ **Action Required**: Maintainers should prioritize **dependency triage**, **RFC tracking**, and **implementation coordination** to prevent stagnation in core architectural initiatives.

---

> 📊 **Overall Project Health**: **High activity, strong security focus, growing maturity in governance**.  
> ⚠️ **Risks**: Dependency debt, unresolved S1 bugs, and lack of visibility in decision pipelines may slow forward progress if not addressed.

---  
*Generated: 2026-09-04 | Source: GitHub API data from `zeroclaw-labs/zeroclaw`*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*