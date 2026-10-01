# OpenClaw Ecosystem Digest 2026-10-01

> Issues: 490 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-01 01:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-10-01**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with **490 open issues** and **500 open pull requests** updated in the past 24 hours—indicating robust community engagement and ongoing development pressure. A new release, **v2026.9.7**, was published today, addressing critical stability and performance concerns across gateway, agent, and plugin subsystems. The volume of high-severity P0/P1 issues (notably memory leaks, SQLite WAL bloat, and crash loops) underscores that core runtime reliability is under significant strain. Despite this, the PR pipeline shows strong momentum in fixing foundational infrastructure, particularly around state management, worker lifecycle, and database integrity.

---

### **2. Releases**  
**✅ v2026.9.7** – *Released October 1, 2026*  
[Release Notes](https://docs.openclaw.ai/rel) | [GitHub Release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.7)

#### Key Changes:
- **Critical fixes for SQLite WAL growth** (Issue #143524): Addresses unbounded WAL file expansion on Windows, now checkpointed at `wal_autocheckpoint=1000`.
- **Stability improvements**: Resolves multiple crash-loop scenarios involving gateway workers (`prepared-model-catalog.worker.js`, `state-lifecycle` contention).
- **Memory leak mitigation**: Fixes runaway RSS growth from `prepared-model-catalog` and `worker environment inventory` mismanagement.
- **Plugin & config resilience**: Prevents permanent plugin unavailability after failed hot-reload and improves recovery from transient package locks (Windows).

> ⚠️ **Migration Note**: Upgrade recommended for all users on `2026.9.5–9.6` experiencing crashes or OOM conditions. No breaking changes reported in release notes.

---

### **3. Project Progress**  
Today’s merged/closed PRs reflect a strong focus on **runtime stability**, **database integrity**, and **cross-platform compatibility**:

- ✅ **PR #162233** (`fix(crabbox)`): Resolves macOS cloud worker rejection due to CPU starvation during enrollment.
- ✅ **PR #162258** (`fix(update)`): Avoids schema inspection aborts when WAL databases become active mid-update.
- ✅ **PR #162246** (`fix(update)`): Excludes historical package backups to prevent symlink collisions during npm updates.
- ✅ **PR #162231** (`fix(update)`): Recovers from transient Windows backup locks (EPERM/EBUSY/EACCES), improving update success rate.
- ✅ **PR #162254** (`fix(plugins)`): Stops repeated native validation during Doctor runs, reducing overhead by ~39 minutes per pass.

These merges signal an urgent push to stabilize the update and deployment lifecycle, especially for Windows and macOS environments.

---

### **4. Community Hot Topics**  
Top Issues by comment count highlight systemic pain points in **agent persistence**, **session state consistency**, and **plugin reliability**:

| Issue | Comments | Severity | Link |
|------|--------|---------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 98 | 🦐 P0 / UX-blocker | SQLite WAL grows to 2.8 GB despite checkpoints |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 40 | 🦐 P0 / Beta-blocker | 2026.9.5 caused 8-hour recovery session |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 30 | 🦞 P1 / Diamond Lobster | Subagent completion lost silently |
| [#157067](https://github.com/openclaw/openclaw/issues/157067) | 20 | 🦞 P1 / Diamond Lobster | Windows cron setup fails due to uncloneable Proxy |

> 🔍 **Underlying Need**: Users demand **predictable, resilient state handling** and **transparent failure recovery**—especially for long-running agents and scheduled jobs. Silent data loss and unexplained restarts are major trust erosion factors.

---

### **5. Bugs & Stability**  
High-severity bugs dominate today’s issue list, indicating instability in core systems:

| Bug | Severity | Impact | Fix PR? |
|-----|----------|--------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 🦐 P0 | Gateway startup blocked; 2.8GB WAL | ❌ Not yet fixed |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | 🦪 P0 | `prepared-model-catalog.worker.js` leaks 4–5 GB/hour | ❌ No fix PR |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) | 🦪 P0 | Memory sawtooth pattern → 200+ critical events/day | ❌ No fix PR |
| [#157160](https://github.com/openclaw/openclaw/issues/157160) | 🐚 P0 | Gateway crash-loop post-migration | ❌ No fix PR |
| [#158126](https://github.com/openclaw/openclaw/issues/158126) | 🐚 P0 | Shutdown fails: "Worker environment inventory has closed" | ❌ No fix PR |

> ⚠️ **Critical Trend**: Multiple **P0 memory and state contention bugs** suggest deeper architectural flaws in **worker lifecycle coordination**, **shared-state locking**, and **SQLite transaction management**—particularly on Windows and macOS.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven feature signals point toward **better cost control**, **multiplatform support**, and **transparency**:

- **Daily Spending Allowances** ([#121729](https://github.com/openclaw/openclaw/issues/121729)): High-priority request for background agents to avoid surprise costs.
- **Dynamic Model Catalog Refresh** ([#74481](https://github.com/openclaw/openclaw/issues/74481)): Request to auto-refresh provider `/v1/models` instead of relying on hardcoded bundles.
- **Android Proxy Login UI** ([#162247](https://github.com/openclaw/openclaw/issues/162247)): Signal for production-ready Android onboarding for multiplayer Gateways.
- **Proactive Billing Recovery** ([#115642](https://github.com/openclaw/openclaw/issues/115642)): User demands shorter cooldown TTL and manual reset after billing recovery.

> 📌 **Prediction**: These features are likely to be prioritized in **v2026.10.0**, especially spending controls and dynamic cataloging—key for enterprise adoption.

---

### **7. User Feedback Summary**  
Real user experiences reveal deep frustration with **silent failures**, **unreliable upgrades**, and **opaque error messages**:

- “I upgraded to 2026.9.5 and spent 8 hours recovering from a broken state.” — @abuegab1-spec (#153257)
- “My agent DB grew to 2.8 GB overnight and blocked everything—no warning, no auto-recovery.” — @desksk (#143524)
- “After a restart, my model picker vanished because `available: false` even though models worked.” — @LachieFREEDOM (#158922)
- “Subagent completions vanish without retry or notification—this is catastrophic for workflows.” — @IIIyban (#44925)

> 💬 **Sentiment**: High dissatisfaction with **reliability** and **debuggability**, but strong commitment to using OpenClaw for complex orchestration tasks. Trust hinges on predictable behavior.

---

### **8. Backlog Watch**  
Several high-impact, long-standing issues remain unresolved and require maintainer attention:

| Issue | Age | Severity | Status | Link |
|------|-----|---------|--------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 22 days | 🦐 P0 | Open, 98 comments | SQLite WAL not checkpointing |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | 4 days | 🦪 P0 | Open, 13 comments | Unbounded memory leak in worker |
| [#157067](https://github.com/openclaw/openclaw/issues/157067) | 7 days | 🦞 P1 | Closed, pending fix | Windows Proxy clone failure |
| [#108395](https://github.com/openclaw/openclaw/issues/108395) | 9 months | 🦪 P1 | Open, 7 comments | Fake "Human: [timestamp]" messages enable self-authorization |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | 5 months | 🦞 P0 | Open, 10 comments | Billing cooldown persists across restarts |

> 🔎 **Urgent Action Needed**: The team must prioritize **memory safety**, **SQLite durability**, and **security hardening**—especially for Windows and embedded deployments—before next major release.

--- 

**📊 Project Health Score**: **⚠️ Moderate to High Risk**  
While innovation and activity are strong, **core stability is compromised** by recurring P0/P1 bugs. Immediate focus on **memory, state, and I/O hygiene** is critical to maintain user trust.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Open-Source Ecosystem (2026-10-01)**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem is entering a pivotal phase of maturation, marked by increasing specialization, security prioritization, and infrastructure hardening. Projects are diverging in focus—ranging from foundational runtime stability (OpenClaw) to secure multi-tenant orchestration (ZeroClaw), mobile-first UX (Hermes Agent), and rapid feature iteration with beta testing (QwenPaw). While innovation remains robust, user feedback reveals growing demand for reliability, transparency, and cost control—indicating a shift from experimentation toward production-grade deployment readiness.

---

### **2. Activity Comparison**

| Project | Issues (Open) | PRs (Updated) | Release Status | Health Score |
|--------|---------------|----------------|----------------|--------------|
| **OpenClaw** | 490 | 500 | ✅ v2026.9.7 (critical fixes) | ⚠️ Moderate to High Risk |
| **Hermes Agent** | 50 | 50 | ❌ None (v0.21.5+4977 current) | ✅ Active, Healthy, Growing |
| **IronClaw** | 1 | 1 | ❌ No new releases | 🟡 Low Activity / Maintenance Phase |
| **QwenPaw** | 19 | 41 | 🆗 v2.2.2-beta.4 (beta) | ✅ Active & Healthy |
| **ZeroClaw** | 50 | 50 | ❌ v0.9.0 pending | ⚠️ High Activity, Critical Bugs |

> *Note: High PR/issue counts correlate with active development; IronClaw’s minimal activity suggests either stability or stagnation.*

---

### **3. OpenClaw's Position**  
OpenClaw stands as the **most technically ambitious and high-pressure project** in the ecosystem, leading in both community engagement and severity of core runtime issues. With **over 490 open issues and 500 active PRs**, it reflects the largest contributor base and most intense development velocity—yet this comes at the cost of systemic instability. Its technical approach emphasizes **deep integration across agents, plugins, and gateways**, leveraging SQLite with WAL management and complex worker lifecycle coordination. Compared to peers:
- **vs Hermes Agent**: More aggressive infrastructure layering, less polished UX.
- **vs QwenPaw**: Prioritizes long-term state durability over rapid UI iteration.
- **vs ZeroClaw**: Focused on monolithic runtime resilience rather than identity-based access control.
- **vs IronClaw**: Far more active, but also significantly more unstable.

OpenClaw’s community size appears largest, driven by enterprise and developer-heavy use cases demanding full-stack control—but trust is eroding due to silent failures and unexplained crashes.

---

### **4. Shared Technical Focus Areas**  
Multiple projects are converging on critical technical requirements:

| Requirement | Projects Involved | Specific Needs |
|-----------|-------------------|----------------|
| **Memory & State Stability** | OpenClaw, QwenPaw, ZeroClaw | Fix runaway RSS growth, prevent memory leaks (e.g., `prepared-model-catalog`), avoid session corruption during restarts |
| **SQLite & I/O Integrity** | OpenClaw, QwenPaw | Prevent WAL bloat, ensure checkpointing, handle schema changes safely during updates |
| **Security Hardening** | Hermes Agent, ZeroClaw, QwenPaw | Patch sandbox bypasses (Windows), protect credential exposure in logs, enforce RBAC |
| **Session Persistence & Recovery** | OpenClaw, Hermes Agent, QwenPaw | Avoid silent data loss, improve restore fidelity, retain configuration across restarts |
| **File & Attachment Handling** | QwenPaw, ZeroClaw | Safely manage PDFs, images, and tool outputs without breaking sessions |
| **Transparent Error Reporting** | All five projects | Standardize denial codes, reduce "silent failure" patterns, improve debuggability |

These shared pain points indicate a **common infrastructure layer challenge** across the ecosystem—especially around **stateful execution, resource accounting, and safe I/O**.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Target Users** | Enterprise devs, system integrators | Power users, productivity-focused teams | Core contributors, internal tools | Beta testers, early adopters | DevOps, multi-tenant infra |
| **Feature Focus** | Runtime stability, plugin resilience | Voice UX, deep linking, CLI/tui polish | Codebase context accuracy | File safety, prompt caching, UI controls | Identity, access control, RPC security |
| **Architecture** | Monolithic gateway + agent + plugin stack | Modular desktop + CLI + gateway | Lightweight codebase memory agent | Feature-rich, modular UI layers | Decoupled gateway, OIDC-ready, role-based |
| **Release Model** | Frequent patch releases (v2026.x.x) | Stable release train with occasional patches | Minimalist, automation-driven | Beta-heavy, iterative testing | Pre-release stabilization (v0.9.0) |
| **Key Differentiator** | Scale and depth of runtime complexity | Mobile-first UX and workflow integration | Autonomous knowledge graph maintenance | Rapid UI/UX iteration in beta | Foundational security enforcement |

> **Strategic Implication**: The ecosystem is bifurcating between **infrastructure platforms** (OpenClaw, ZeroClaw) and **user experience platforms** (Hermes, QwenPaw), with IronClaw occupying a niche in automated context maintenance.

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Indicators |
|------|--------|------------|
| **Rapid Iteration (Beta/Stable Push)** | QwenPaw, OpenClaw, ZeroClaw | High PR volume, frequent beta releases, urgent bug triage |
| **Stabilizing & Polishing** | Hermes Agent | Consistent PRs, focused on UX, no major breaks |
| **Low-Touch / Maintenance Phase** | IronClaw | One open PR, no recent issues, low engagement |

- **QwenPaw** and **OpenClaw** represent **high-momentum, high-risk** phases—ideal for developers seeking cutting-edge features but requiring careful risk assessment.
- **Hermes Agent** shows signs of **mature productization**: stable, well-documented, and user-centric.
- **ZeroClaw** is nearing a **production milestone** with v0.9.0; its S0 bugs must be resolved before launch.
- **IronClaw** may be **stagnating**—lack of user feedback and activity raises concerns about long-term viability unless revitalized.

---

### **7. Trend Signals**  
Extracted from community feedback and project trajectories:

1. **Reliability Over Features**: Users consistently prioritize **predictable behavior** over new capabilities. Silent crashes, lost sessions, and unreported errors are top trust-killers (OpenClaw, QwenPaw, Hermes).
2. **Cost Control Demands**: “Daily spending allowances” and “billing cooldown resets” signal that **enterprise adoption hinges on financial predictability**—a key barrier for large-scale deployment.
3. **Mobile Access Is Non-Negotiable**: Native Android/iOS support is now a **must-have**, not a nice-to-have (Hermes Agent, ZeroClaw signals).
4. **Security-by-Design Expectations**: Credential leakage via logs, sandbox breaches, and cross-agent data access are **no longer edge cases**—they’re central to trust (Hermes, QwenPaw, ZeroClaw).
5. **Transparency in Failure Modes**: Users demand **clear error messages**, standardized denial codes, and audit trails—especially in multi-agent workflows (ZeroClaw, QwenPaw).
6. **Automated Context Management**: Projects like IronClaw and ZeroClaw highlight growing interest in **self-updating agent memory**, suggesting future AI agents will need autonomous knowledge grounding.

> 💡 **Value for Developers**: Build with **fail-safe defaults, observable state, and auditability**—not just functionality. The next wave of adoption will favor **resilient, secure, and predictable systems** over flashy features.

---

**Final Assessment**:  
The open-source AI agent landscape is evolving from **prototype experimentation** to **production-grade infrastructure**. While innovation is strong, **technical debt and reliability gaps** threaten user trust. Projects that prioritize **stability, security, and transparency**—especially those addressing shared concerns like memory leaks, session integrity, and file handling—are best positioned for long-term success. Developers should choose based on their need: **OpenClaw for deep customization**, **Hermes Agent for UX excellence**, **ZeroClaw for secure multi-tenancy**, and **QwenPaw for rapid prototyping with modern UI**—while avoiding IronClaw until community engagement revives.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-10-01**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 issues and 50 pull requests updated in the last 24 hours—indicating robust developer engagement and ongoing feature development. The ecosystem is focused on stability improvements, session state integrity, security hardening, and TUI/UX refinements. While no new releases were issued, multiple high-priority bug fixes and feature enhancements were merged or proposed, signaling a mature but rapidly evolving codebase. Activity spans CLI, desktop, gateway, and plugin integration layers, reflecting broad platform coverage.

---

### **2. Releases**  
No new releases were published as of 2026-10-01. The latest stable version remains `v0.21.5+4977` (from 2026-09-30), with no breaking changes reported in recent updates. Users should expect future patch releases to address critical bugs related to session consistency, voice handling, and authentication flows.

> 🔗 [Latest Release](https://github.com/nousresearch/hermes-agent/releases)  
> 📦 [GitHub Package Registry](https://github.com/nousresearch/hermes-agent/packages)

---

### **3. Project Progress**  
Today saw **10 merged/closed PRs**, primarily addressing stability, security, and UX concerns:

- ✅ **PR #129848**: Adds user-configurable URL scheme allowlist for external links (closes #129813), enabling deep linking to Obsidian, Linear, and VS Code.
- ✅ **PR #129846**: Defers barge-in interruption until speech-to-text confirms a real utterance, improving voice interaction reliability.
- ✅ **PR #129847**: Fixes approval gate logic for kanban dispatcher workers by failing closed, preventing silent task execution.
- ✅ **PR #129844**: Unifies terminal environment variable mapping across CLI, gateway, and bridges—resolving `terminal.home_mode` misconfiguration.
- ✅ **PR #129842**: Enhances `hermes profile list` with a `Scope` column showing systemd scope ownership (Linux only).
- ✅ **PR #129845**: Implements `/models` slash command to list provider-specific models, improving discoverability.
- ✅ **PR #129841**: Exposes live MCP tools in API toolset registry, enabling client-side validation.
- ✅ **PR #129839**: Improves bounded session recall fallback when FTS is unavailable.
- ✅ **PR #129838**: Retains terminal spill files by durable session ownership instead of age-based deletion.
- ✅ **PR #129741**: Fixes stale-send guard by comparing durable row identities first—preventing false diffs.

These PRs collectively improve **session persistence, voice interaction safety, configuration consistency, and plugin extensibility**.

---

### **4. Community Hot Topics**  
Top community-driven discussions center around **security, session integrity, and mobile access**:

- 🔥 **Issue #62336** ([Security] Terminal snapshots capture credential-bearing env vars):  
  *9 comments, critical risk* — Environment variables including Bitwarden secrets are being saved to disk via `export -p`. This poses a serious data leakage risk if logs or caches are exposed.  
  🔗 [Issue #62336](https://github.com/nousresearch/hermes-agent/issues/62336)  
  → *Underlying need: Secure transient state management and audit logging.*

- 🔥 **Issue #129813** (User-configurable URL scheme allowlist):  
  *3 comments, resolved via PR #129848* — Users cannot click generated deep links (e.g., `obsidian://`) due to strict filtering. A growing demand for integrations with note-taking and IDE ecosystems.  
  🔗 [Issue #129813](https://github.com/nousresearch/hermes-agent/issues/129813)  
  → *Use case: Seamless agent-to-app workflows (Obsidian, VS Code, etc.).*

- 🔥 **Issue #126292** (Native Android & iOS apps):  
  *2 comments, innovation tag* — Strong desire for a true mobile-first agent experience with real-time voice, location consent, and approvals.  
  🔗 [Issue #126292](https://github.com/nousresearch/hermes-agent/issues/126292)  
  → *Signal: Mobile presence is a key roadmap priority for user adoption.*

---

### **5. Bugs & Stability**  
Critical stability and regression issues were reported today, ranked by severity:

| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| **#129819** [Bug][Desktop]: Wake word starts voice in leftmost tab regardless of selection | P3 | Voice activation ignores active chat tab; breaks multi-tab workflow | ❌ No fix yet |
| **#129757** [Bug]: `desktop_preview.open(http URL)` silently fails | P2 | Preview pane stays on `about:blank`; broken link handling | ❌ No fix yet |
| **#129254** [Bug]: Cron agent-mode worker dies silently before agent starts | P1 | Execution stuck with no error, no delivery — high-risk for automation | ❌ No fix yet |
| **#127313** [Bug]: Pane-body zone menu hijacks right-click → blocks app menu | P2 | Regression from recent commit; disrupts UI flow | ❌ No fix yet |
| **#122016** [Bug]: Desktop restores stale model over explicit config | P2 | Config override ignored during session restore | ⚠️ Partial fix in PR #129844 |

> ⚠️ **Note**: Multiple regressions point to fragile session state and UI event handling in the desktop client. The lack of immediate PRs for these suggests urgent triage needed.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging signals indicate strong interest in:

- 🔄 **Mobile First Access**: Native Android/iOS apps with real-time voice and location consent (#126292) — likely to be prioritized post-v0.22.
- 🧩 **Plugin Ecosystem Growth**: Two new plugins added to catalog today: `hermes-beads` (work-graph backend) and `hermes-workflows` (automation). Suggests growing community-driven plugin adoption.
- 🎯 **Advanced Session Control**: Features like `session.activate`, `session.attach`, and bounded recall (PRs #128148, #129839) signal deeper focus on persistent agent memory and replay fidelity.
- 🛡️ **Security Hardening**: Persistent focus on credential exposure (#62336), session isolation, and secure auth boundaries.

> 💡 **Prediction**: v0.22 will emphasize **mobile integration**, **session durability**, and **plugin ecosystem maturity**.

---

### **7. User Feedback Summary**  
Real user pain points reflect advanced usage patterns and expectations:

- **Deep Linking Is Broken**: Users report that agents can’t hand clickable `obsidian://` or `vscode://` links — a major friction point for productivity workflows.  
  > *"I created a note in Obsidian via agent — why can't I just click it?"* — User feedback, Issue #129813

- **Voice Behavior Is Confusing**: Wake words trigger in the wrong tab, disrupting multi-chat workflows.  
  > *"It always jumps to the first tab — I have to switch manually every time."* — User feedback, Issue #129819

- **Session Restore Is Unreliable**: Users report model configurations being overwritten by stale sessions, especially after switching profiles.  
  > *"I set my default model to GPT-5.6 — why does it keep reverting to an old one?"* — User feedback, Issue #122016

- **CLI Installer Fails on Windows**: Installer crashes during `npm install` stage — blocking entry for Windows users.  
  > *"Install fails at 'desktop' step — no clear error message."* — User feedback, Issue #46260

---

### **8. Backlog Watch**  
Long-standing, high-impact issues requiring maintainer attention:

- 🔴 **Issue #109552** [Label Audit]: Misuse of `duplicate`/`invalid` labels leads to invalid issue closures. Needs triage policy clarification.  
  🔗 [Issue #109552](https://github.com/nousresearch/hermes-agent/issues/109552)

- 🔴 **Issue #512** [Feature]: Doom Loop Detection — Pause on repeated identical tool calls (inspired by Kilocode). High-value for agent reliability.  
  🔗 [Issue #512](https://github.com/nousresearch/hermes-agent/issues/512)

- 🔴 **Issue #94978** [Bug]: HTTP 429 kills turn without auto-resume/backoff — common during peak load.  
  🔗 [Issue #94978](https://github.com/nousresearch/hermes-agent/issues/94978)

- 🔴 **Issue #116085** [Feature]: Vault credential matching by registrable domain (eTLD+1) — essential for subdomain login support.  
  🔗 [Issue #116085](https://github.com/nousresearch/hermes-agent/issues/116085)

> ⏳ These issues represent core trust, reliability, and usability barriers that could impact long-term user retention.

---

✅ **Project Health Snapshot**: **Active, Healthy, Growing**  
With consistent contributor engagement, strong security focus, and clear roadmap signals, Hermes Agent continues to evolve into a production-grade AI assistant platform. However, desktop stability and mobile readiness remain critical bottlenecks.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-10-01**

---

### **1. Today's Overview**  
The IronClaw project exhibits low activity as of October 1, 2026, with no new issues or releases in the past 24 hours. Only one pull request is currently open, indicating a lull in development momentum. The absence of recent PR merges or issue updates suggests either a stable codebase phase or reduced contributor engagement. The sole active PR relates to internal infrastructure—refreshing the codebase knowledge graph—pointing to ongoing maintenance of foundational systems rather than feature delivery.

---

### **2. Releases**  
*No new releases detected.*  
There are no version updates or changelogs published in the last 7 days. No breaking changes, migration notes, or security patches have been issued. The project remains on its current release train without incremental improvements or stability fixes being released publicly.

---

### **3. Project Progress**  
*Only one PR is active:*  
- **PR #7988** ([Link](https://github.com/nearai/ironclaw/pull/7988)) – *chore(agents): refresh codebase knowledge graph*  
  - Status: Open (merged/closed: 0)  
  - Author: ironclaw-ci[bot]  
  - Summary: Refreshes the committed codebase-memory bootstrap snapshot from the default branch via the nightly `Codebase Graph Refresh` workflow.  
  - Impact: This is an infrastructural update ensuring the AI agent’s internal understanding of the codebase stays aligned with the latest source state. It does not introduce new features but supports long-term agent accuracy and context fidelity.

---

### **4. Community Hot Topics**  
*No active issues or high-engagement PRs were observed.*  
The only open contribution is a low-risk, automated chore PR (#7988), which has received no comments or reactions (👍: 0). This lack of community interaction may indicate:  
- Limited user-facing impact of the change  
- A small or quiet contributor base  
- Potential stagnation in user-driven feedback loops  

No trending discussions, urgent bug reports, or feature debates are visible in the current data set.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions reported today.*  
With zero new issues opened and no closed PRs referencing stability fixes, the system appears stable from a surface-level monitoring perspective. However, the absence of reported issues should be interpreted cautiously—low visibility could reflect underreporting or a lack of testing in production environments.

---

### **6. Feature Requests & Roadmap Signals**  
*No user-reported feature requests appear in the current dataset.*  
However, the presence of a recurring CI job for refreshing the codebase knowledge graph (as seen in PR #7988) implies that **contextual accuracy and up-to-date codebase awareness** are critical for IronClaw’s agent functionality. This signals a likely roadmap priority:  
- Enhanced auto-updating mechanisms for agent memory  
- Improved diff detection between code snapshots  
- Integration of more granular change tracking (e.g., per-file or per-commit)

These capabilities may be prioritized in upcoming versions if user demand grows.

---

### **7. User Feedback Summary**  
*No direct user feedback captured in issues or PRs.*  
Given the lack of open issues or community engagement, there is no observable sentiment data (positive or negative) from end users. This may suggest:  
- High satisfaction due to stable performance  
- Low adoption or usage beyond core contributors  
- Insufficient channels for user reporting (e.g., no dedicated support forums or feedback forms)

Without user input, it is difficult to assess real-world usability or pain points.

---

### **8. Backlog Watch**  
*No high-priority, unresolved issues currently visible.*  
While there are no open issues listed, the existence of an automated workflow for codebase graph refresh (triggered by PR #7988) raises concerns about dependency on automation without human oversight.  
- **Risk**: If the `Codebase Graph Refresh` workflow fails silently, agents may operate on outdated or incorrect context.  
- **Recommendation**: Add alerting or manual validation steps to the workflow to prevent silent degradation of agent intelligence.

This latent risk warrants attention even in the absence of explicit issues.

---

**Conclusion:** IronClaw is in a maintenance phase with minimal external activity. The project is stable but shows signs of low community engagement and potential over-reliance on automated pipelines. Future growth may depend on increasing transparency, encouraging user feedback, and improving observability of internal workflows.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-10-01**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active, with 41 pull requests and 19 issues updated in the past 24 hours — a strong sign of ongoing development momentum. The release of **v2.2.2-beta.4** marks a critical step in stabilizing new features and addressing core stability concerns. High engagement from both contributors and users indicates robust community involvement, particularly around security, memory handling, and UI/UX polish. While progress is rapid, several high-severity bugs (especially in Windows sandboxing and session management) suggest that the beta phase requires careful validation before wider adoption.

---

### **2. Releases**  
**🆕 v2.2.2-beta.4** *(Released: 2026-09-30)*  
- **Key Changes:**  
  - Added **reranker UI config panel** to `ReMeLightMemoryCard` via #6399 ([PR #6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)).  
  - Bumped version to `2.2.2b4` for internal tracking ([PR #7892](https://github.com/agentscope-ai/QwenPaw/pull/7892)).  
  - Performance improvement: split chat dependencies for better load isolation ([PR #7892](https://github.com/agentscope-ai/QwenPaw/pull/7892)).  

- **Migration Notes:**  
  This is a **beta release** intended for testing. Users should expect breaking changes or instability. No major breaking changes are documented yet, but be cautious when upgrading from `2.2.1` or earlier.  
  🔗 [Release Page](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.4)

---

### **3. Project Progress**  
**✅ Merged/Closed PRs (Today):**  
- **#8049** ([PR #8049](https://github.com/agentscope-ai/QwenPaw/pull/8049)): Fixes timezone drift during DST transitions by resolving per-timestamp local time correctly — critical for transcript accuracy.  
- **#8058**, **#8057**, **#8060**, **#8062**: All related to **prompt caching**, **token counting**, and **embedding chunking** issues — fixes now available in `v2.2.2-beta.4`. These address underreporting in context meters and silent batch failures due to token limits.  
- **#7011**, **#7604**, **#7443**, **#7672**: Closed bug reports indicating resolution of session cancellation race conditions, hardcoded stream timeouts, and security sandbox bypasses on Windows.

> ✅ These merged fixes show strong focus on **stability**, **security**, and **resource accounting** — key pillars for production use.

---

### **4. Community Hot Topics**  
**🔥 Most Active Issues (by comments/reactions):**  
| Issue | Summary | Link | Comments | Severity |
|------|--------|------|---------|----------|
| [#8040](https://github.com/agentscope-ai/QwenPaw/issues/8040) | Embedding reindex fails silently due to CJK chunk over token limit | 2 | ⚠️ Critical (recurring) |
| [#8042](https://github.com/agentscope-ai/QwenPaw/issues/8042) | Tool output files auto-fed into model → Internal error | 2 | ⚠️ Critical (model compatibility) |
| [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) | DeepSeek provider breaks session after `send_file_to_user` with PDF | 1 | ⚠️ Critical (user workflow disruption) |
| [#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059) | Background task results lost after completion (404 + empty response) | 1 | ⚠️ High (multi-agent reliability) |

**🔍 Underlying Needs:**  
- Users demand **robust file handling** (PDFs, large outputs) without session crashes.  
- There’s growing concern about **silent failures** in embedding/indexing pipelines — especially with non-Latin text (CJK).  
- **Background agent reliability** is a top pain point in multi-agent workflows.

---

### **5. Bugs & Stability**  
**🚨 High-Priority Bugs Reported (2026-09-30):**  
1. **[#8042]** Tool output files auto-fed back to models cause `Internal error` if format unsupported (e.g., PDF).  
   - *Fix PR:* #8063 (in progress) — adds guard against auto-feed.  
2. **[#8064]** `send_file_to_user` with PDF permanently breaks DeepSeek sessions.  
   - *Impact:* Entire conversation unusable post-file send.  
3. **[#8040]** ReMe embedding reindex fails silently due to CJK chunk exceeding provider limit.  
   - *Fix PR:* #8062 — keeps healthy vectors even when one chunk fails.  
4. **[#8059]** Background task records lost after completion; final response empty.  
   - *Fix PR:* #8063 — wakes parent agent upon task finish.  

> 💡 **Note:** Several critical bugs have **fix PRs open or merged**, suggesting strong triage effort. However, some remain unpatched (e.g., #8064).

---

### **6. Feature Requests & Roadmap Signals**  
**📌 Top User-Requested Features:**  
- **[#7945]** Add `@everyone`/`@ALL` filtering in IM integrations (Feishu/DingTalk).  
  - *Use Case:* Prevent agents from responding to broadcast messages.  
  - *Likely Inclusion:* High — already flagged as “common noise” in enterprise environments.  
- **[#7997]** Support message retraction/editing and workspace rollback in WebUI.  
  - *Use Case:* Correct mistakes mid-conversation without starting over.  
  - *Roadmap Signal:* Strong — aligns with "AI agent accountability" trend.  
- **[#7569]** Add **Advisor Mode** (stronger model guides cheaper worker).  
  - *Status:* Open, size/XXXL — likely a major feature for cost-performance optimization.  
- **[#8053]** Release duty check for `v2.2.2-beta.4` — implies formal pre-release verification process is now standard.

> 📈 **Predicted Next Version (v2.3.0):** Will likely include **Advisor Mode**, **message editing**, and **enhanced file safety guards**.

---

### **7. User Feedback Summary**  
Real user pain points are emerging clearly:  
- **File handling** is a recurring source of frustration (PDFs, large uploads).  
- **Session corruption** after tool calls (`send_file_to_user`) is seen as a dealbreaker.  
- **Security sandboxes** are being tested aggressively — **Windows sandbox breach (#7672)** highlights trust concerns.  
- **Multi-agent workflows** suffer from silent task loss and lack of feedback mechanisms.  
- **Transcription settings** are broken or unconfigurable (#8035), impacting voice-to-text workflows.

> ✅ **Satisfaction signals:** New UI controls (reranker panel), improved logging, and prompt caching fixes indicate users appreciate granular control and transparency.

---

### **8. Backlog Watch**  
**⚠️ Long-Unanswered Critical Issues Needing Attention:**  
| Issue | Status | Why It Matters | Link |
|------|--------|----------------|------|
| [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) | Open (2 months) | Security sandbox bypass on Windows — serious risk. | [Issue #7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) |
| [#8013](https://github.com/agentscope-ai/QwenPaw/issues/8013) | Open (1 day) | Skill pool download times out at 30s despite backend still working. | [Issue #8013](https://github.com/agentscope-ai/QwenPaw/issues/8013) |
| [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) | Closed but not fixed in stable — session identity cross-talk issue persists in practice. | [Issue #7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) |

> 📌 **Recommendation:** Prioritize **#7672** and **#8013** — they represent fundamental risks to usability and security. Even closed issues like #7011 may need follow-up if users report recurrence.

---

### ✅ **Overall Project Health: Active & Healthy**  
Despite numerous high-severity bugs, the project shows strong engineering discipline:  
- Rapid PR turnaround (41 updates in 24h).  
- Fixes for core issues are being delivered fast.  
- Clear roadmap signals (Advisor Mode, editing, sandbox hardening).  

**Next Steps:**  
- Finalize `v2.2.2-beta.4` testing and collect feedback.  
- Prioritize fixing Windows sandbox breach and long-running skill downloads.  
- Begin planning **v2.3.0** with Advisor Mode and message editing as flagship features.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-10-01**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active with a robust pipeline of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across architecture, security, and core runtime improvements. Activity is concentrated in **security hardening (S0/S1 bugs)**, **v0.9.0 feature completion**, and **gateway/runtime integration**—particularly around identity access control, RPC authorization, and multi-tenant agent isolation. Despite no new releases, the project is clearly in a **final stabilization phase for v0.9.0**, with critical fixes and architectural refinements being prioritized ahead of an upcoming release.

---

### **2. Releases**  
❌ **No new releases** have been published as of 2026-10-01. The project continues to build toward **v0.9.0**, which remains the target for Phase 3 gateway separation, OIDC integration, and foundational security enhancements. No breaking changes or migration notes are currently available.

> 🔗 [GitHub Release Page](https://github.com/zeroclaw-labs/zeroclaw/releases)

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #11293** (`fix(ci): ignore unread labels in the PR risk report's stale-metadata check`) — improves CI stability by fixing false positives in risk labeling.
- ✅ **PR #11284** (`docs(book): correct stale plugin name-conflict and lean-build guidance`) — resolves documentation inaccuracies affecting plugin developers.
- ✅ **PR #11290** (`fix(zerocode): preserve undo history when adding chat context`) — enhances UX in the ZeroCode TUI by preserving edit history during transcript manipulation.

These merges reflect ongoing efforts to **improve tooling reliability, developer experience, and CI accuracy**, especially around plugin management and user-facing workflows.

> 🔗 [PR #11293](https://github.com/zeroclaw-labs/zeroclaw/pull/11293) | 🔗 [PR #11284](https://github.com/zeroclaw-labs/zeroclaw/pull/11284) | 🔗 [PR #11290](https://github.com/zeroclaw-labs/zeroclaw/pull/11290)

---

### **4. Community Hot Topics**  
Top issues and PRs show strong engagement around **security enforcement**, **identity access**, and **multi-tenant agent isolation**:

- 📌 **Issue #8692** ([Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) – *15 comments*  
  → High-level governance need: A formalized process for tracking RFCs and design decisions to prevent stagnation. This signals demand for **transparent roadmap execution**.

- 📌 **Issue #5982** ([Per-sender RBAC for multi-tenant deployments](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)) – *11 comments*  
  → Critical for enterprise use: Users are pushing for granular access control per sender in shared agent environments. Already accepted; awaiting implementation.

- 📌 **PR #11289** ([feat(rpc): stable denial reason identifiers and localized selector denials](https://github.com/zeroclaw-labs/zeroclaw/pull/11289)) – *15+ comments expected soon*  
  → Addresses a key pain point: inconsistent error messaging. Stable denial codes improve debugging and auditability.

> 🔗 [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 🔗 [Issue #5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) | 🔗 [PR #11289](https://github.com/zeroclaw-labs/zeroclaw/pull/11289)

---

### **5. Bugs & Stability**  
Critical stability and security bugs remain front-and-center, with **7 S0/S1 severity issues open today**:

| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) | S0 | Delegated memory tools lose principal scope | ❌ Open, high-risk |
| [#11127](https://github.com/zeroclaw-labs/zeroclaw/issues/11127) | S0 | Session-data tools bypass ownership checks | ❌ Open |
| [#11123](https://github.com/zeroclaw-labs/zeroclaw/issues/11123) | S0 | SOP execution accepts wildcard selectors without `tools:execute` | ❌ Open |
| [#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647) | S0 | Knowledge graph has no per-agent attribution | ❌ Open |
| [#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646) | S0 | Session/channel tools lack per-agent ownership scoping | ❌ Open |
| [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | S1 | Daemon startup overflow during agent init | ❌ Open |
| [#11237](https://github.com/zeroclaw-labs/zeroclaw/issues/11237) | S1 | Config editor cannot write declarative cron schedule | ❌ Open |

> ⚠️ All S0/S1 bugs involve **principal scope violations**, indicating systemic risks in **agent isolation and data confidentiality**. These must be resolved before v0.9.0 launch.

---

### **6. Feature Requests & Roadmap Signals**  
Key feature directions emerging from community input:

- 🎯 **Per-sender RBAC (#5982)** – Explicitly requested for multi-tenant deployments. Likely to ship in **v0.9.0**.
- 🎯 **Knowledge corpus RAG (#11235)** – RFC proposes document retrieval via RAG. High interest (2 comments), likely to be scoped for v0.9.1 or v1.0.
- 🎯 **WhatsApp image handling (#11255)** – Request to save inbound images like Telegram. Functional gap; low-severity but UX-critical.
- 🎯 **Plugin update with rollback (#10995)** – Missing CLI command. High priority for plugin ecosystem maturity.

> 📌 **Prediction**: v0.9.0 will focus on **security, identity, and gateway separation**, while v0.9.1 will prioritize **RAG, plugin lifecycle, and channel enhancements**.

---

### **7. User Feedback Summary**  
Real-world pain points reported include:

- 💬 *"I can't trust agents not to read/write each other’s knowledge"*, echoing issue #9647.
- 💬 *"My delegated agent runs high-risk commands even when blocked locally"*, referencing #10165.
- 💬 *"Config cron schedules don’t persist in the UI"*, highlighting UX friction in #11237.
- 💬 *"Images from WhatsApp arrive as `[Image]`, not usable by vision models"*, impacting multimodal workflows (#10975).

Users value **security guarantees**, **predictable behavior**, and **smooth config editing**. Satisfaction hinges on resolving **cross-agent data leaks** and **consistent policy enforcement**.

---

### **8. Backlog Watch**  
Critical long-standing issues needing maintainer attention:

- 🔴 **Issue #8692** – Maintainer decision queue still lacks automation. Without this, RFCs risk stalling.
- 🔴 **Issue #7432** – Runtime/gateway delivery tracker for v0.8.6/v0.9.0. Still open despite progress; needs final closure.
- 🔴 **Issue #8289** – OIDC milestone tracker. Though core stack merged, final cleanup remains pending.
- 🔴 **Issue #11001** – Complete local IPC coverage for external gateway. Blocked on contract alignment.

> ⏳ These are **high-priority backlog items** that could delay v0.9.0 if not actively managed. They represent **architectural debt** that must be resolved before production readiness.

> 🔗 [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 🔗 [Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | 🔗 [Issue #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) | 🔗 [Issue #11001](https://github.com/zeroclaw-labs/zeroclaw/issues/11001)

---

✅ **Project Health Assessment**: **High activity, strong security focus, critical bugs in flight, v0.9.0 nearing completion.**  
⚠️ **Risk**: Delayed resolution of S0 bugs may block release.  
🎯 **Next Step**: Prioritize **S0 bug triage**, finalize **v0.9.0 release candidate**, and close **tracking issues** to enable stable release.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*