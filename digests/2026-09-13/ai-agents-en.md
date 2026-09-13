# OpenClaw Ecosystem Digest 2026-09-13

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-13 00:16 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-13**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with 500 issues and 500 pull requests updated in the last 24 hours—indicating intense development momentum and community engagement. A significant number of high-severity bugs (P0/P1, diamond lobster/pearl hermit rating) are currently open, particularly around session state integrity, message delivery reliability, and upgrade stability. Despite no new releases, the volume of PRs suggests a focused effort on stabilizing the upcoming `2026.9.4` release cycle. The project is clearly in a critical patch-and-repair phase ahead of a major update.

---

### **2. Releases**  
*No new releases were published today.*  
The latest stable version remains **2026.9.3**, with ongoing instability reported in upgrades to `2026.9.4`. Several critical upgrade path failures have been logged (e.g., #145510, #145782, #145929), indicating that the current release train is not yet stable for production use. No migration notes or breaking changes have been announced for this cycle, but users should expect potential regressions during in-place updates.

---

### **3. Project Progress**  
Today saw **12 merged/closed PRs** (from the top 500), primarily focused on stability, performance, and cleanup tasks:  

- ✅ **[PR #146508](https://github.com/openclaw/openclaw/pull/146508)**: Fixed WebSocket transport classification and lifetime checks, improving diagnostics clarity.  
- ✅ **[PR #146586](https://github.com/openclaw/openclaw/pull/146586)**: Preserved inherited ACLs on APFS worktrees—critical for macOS users.  
- ✅ **[PR #146491](https://github.com/openclaw/openclaw/pull/146491)**: Improved I/O responsiveness during queued session writes—reduces latency spikes.  
- ✅ **[PR #146408](https://github.com/openclaw/openclaw/pull/146408)**: Added PDF as a known core media tool—resolves misleading plugin advice.  

These fixes reflect a strong focus on *system-level resilience*, *cross-platform compatibility*, and *user experience under load*. However, many high-priority PRs remain unmerged or awaiting maintainer review.

---

### **4. Community Hot Topics**  
Top 5 most commented issues highlight systemic stability and upgrade concerns:

| Issue | Comments | Severity | Key Concern |
|------|---------|----------|------------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 28 | P1 / 🦪 Silver Shellfish | Zombie process leak from hooks/tools → runtime degradation |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 27 | P1 / 🦞 Diamond Lobster | Subagent completions silently lost—no retry, no restart |
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | 17 | P0 / 🦐 Gold Shrimp | Doctor refuses valid legacy workspace migration |
| [#144502](https://github.com/openclaw/openclaw/issues/144502) | 12 | P1 / 🐚 Platinum Hermit | WhatsApp TTS voice notes fail due to 48kHz + Lavf tag |
| [#145929](https://github.com/openclaw/openclaw/issues/145929) | 7 | P0 / 🦪 Silver Shellfish | Auth profile logout permanently fails after interrupted self-update |

> 🔍 **Underlying Need**: Users are experiencing **silent data loss**, **upgrade paralysis**, and **unrecoverable state corruption**, especially in multi-agent, cross-channel environments. These issues suggest deep architectural challenges in state management, lifecycle coordination, and error propagation.

---

### **5. Bugs & Stability**  
Critical stability issues dominate today’s landscape:

- **🚨 P0 Crashes & Blockers**:  
  - [#144911](https://github.com/openclaw/openclaw/issues/144911): MCP server init timeout crashes Gateway due to unhandled rejection → **crash-loop**  
  - [#145929](https://github.com/openclaw/openclaw/issues/145929): Auth store lock failure blocks all profile operations → **permanent write failure**  
  - [#145252](https://github.com/openclaw/openclaw/issues/145252): Tracking issue for 2026.9.3/9.4 update/recovery unreliability → **major release blocker**

- **🔴 High-Impact Regressions**:  
  - [#139847](https://github.com/openclaw/openclaw/issues/139847): Message dropped during active reply run → **message-loss**  
  - [#137332](https://github.com/openclaw/openclaw/issues/137332): Mixed batches retry forever after ownership check → **infinite loop risk**  
  - [#140620](https://github.com/openclaw/openclaw/issues/140620): Session transcript reconciliation stalls post-upgrade → **pre-upgrade sessions unfindable**

> ⚠️ **Note**: Only one fix PR exists for a P0 bug (#146508), and many high-severity issues lack linked PRs—suggesting delayed response from maintainers.

---

### **6. Feature Requests & Roadmap Signals**  
User demand is shaping future direction:

- **🔐 Security & Consent**:  
  - [#78308](https://github.com/openclaw/openclaw/issues/78308): Channel-mediated approval for MCP tool calls → **"consent envelope"** for state-changing actions.  
  - [#115367](https://github.com/openclaw/openclaw/issues/115367): Read gate locked to bundled plugins → **external plugin access limitation**.

- **🔊 UX & Accessibility**:  
  - [#126876](https://github.com/openclaw/openclaw/issues/126876): Accessibility audit reveals 13 screen reader barriers → **first blind user report** → strong signal for inclusion.  
  - [#131457](https://github.com/openclaw/openclaw/issues/131457): Add progress streaming to Feishu → aligns with Slack/Discord/Mattermost support.

- **📁 Productivity Enhancements**:  
  - [#77798](https://github.com/openclaw/openclaw/issues/77798): Collaborative Markdown Editor via Canvas embed → **live co-editing capability**.

> 📌 **Prediction**: The next stable release (`2026.9.4`) will likely include **MCP consent envelopes**, **accessibility improvements**, and **streaming enhancements**, but only if stability issues are resolved first.

---

### **7. User Feedback Summary**  
Real-world pain points reveal core frustrations:

- **Silent Failures**: Users report losing subagent results without alerts or retries (#44925, #67777).  
- **Upgrade Anxiety**: Multiple users report failed updates, stalled migrations, and irrecoverable states (#145510, #145782, #145929).  
- **Platform-Specific Breakage**: WhatsApp TTS fails (#144502), Google Meet voice breaks (#140455), and NFS/SMB shared workspaces fail due to hardcoded file modes (#114158).  
- **Trust Erosion**: When tools behave inconsistently (e.g., Codex prompt fingerprinting mismatch #145993), users lose confidence in state fidelity.

> 💬 **Sentiment**: Frustration is mounting. While users appreciate depth and flexibility, **reliability, visibility, and recovery** are now paramount.

---

### **8. Backlog Watch**  
Critical Issues lacking maintainer attention or fix PRs:

| Issue | Status | Why It Matters |
|------|--------|----------------|
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | Open, P0 | Blocks migration from legacy workspaces → **migration blocker** |
| [#145929](https://github.com/openclaw/openclaw/issues/145929) | Open, P0 | Prevents auth profile removal → **security and usability hazard** |
| [#145252](https://github.com/openclaw/openclaw/issues/145252) | Open, P0 | Coordination hub for 2026.9.3/9.4 upgrade chaos → **must be addressed before release** |
| [#146096](https://github.com/openclaw/openclaw/issues/146096) | Open, P2 | File overwrite race → **data loss risk** in collaborative workflows |
| [#114158](https://github.com/openclaw/openclaw/issues/114158) | Open, P2 | Hardcoded `0o600` ignores umask → **breaks shared workspaces** |

> 🛑 **Call to Action**: These issues represent **release-blocking risks**. Immediate maintainer triage is required to prevent further user churn.

---

**📌 Final Assessment**: OpenClaw is at a pivotal moment—deep technical innovation is being undermined by systemic stability and upgrade fragility. The project is **highly active but unstable**, with urgent needs in **state consistency, upgrade safety, and user feedback transparency**. Without targeted stabilization efforts, adoption may stall despite strong feature demand.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Assistant Open-Source Ecosystem – 2026-09-13**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem is entering a pivotal phase of maturation, marked by intense technical refinement and growing user expectations for reliability, security, and cross-platform consistency. While innovation remains strong—particularly in agent orchestration, multi-channel integration, and memory management—many projects are now confronting systemic challenges related to session integrity, upgrade stability, and data loss prevention. The landscape reflects a shift from feature-driven growth to *trust-by-design* priorities, with users demanding transparent error handling, auditability, and recovery mechanisms. This convergence suggests the next wave of adoption will favor platforms that prioritize operational resilience over raw capability.

---

### **2. Activity Comparison**

| Project | Issues (24h) | PRs Updated (24h) | Release Status | Health Score (1–5) |
|--------|--------------|-------------------|----------------|--------------------|
| **OpenClaw** | 500 | 500 | No new release | 🟥 2.5 |
| **Hermes Agent** | 50 | 50 | No new release | 🟨 3.0 |
| **IronClaw** | 0 | 2 | No new release | 🟩 4.0 |
| **QwenPaw** | 17 | 7 | No new release | 🟥 2.8 |
| **ZeroClaw** | 24 | 50 | No new release | 🟥 2.3 |

> **Health Score Key**:  
> 5 = Stable & mature; 4 = Active & reliable; 3 = Iterating with moderate risk; 2 = High instability; 1 = Critical failure mode

*Note: OpenClaw leads in volume but suffers from severe stability issues; IronClaw shows quiet stability; ZeroClaw and QwenPaw exhibit high-risk activity post-upgrade.*

---

### **3. OpenClaw's Position**  
**Advantages vs Peers**:  
- **Largest community engagement** (500+ issues/PRs/day), indicating broad developer interest and real-world usage testing.  
- **Most comprehensive feature surface**, including deep MCP integration, multi-agent coordination, and rich media support.  
- **Strongest momentum in core infrastructure**, with ongoing work on transport layers, ACL systems, and state lifecycle management.

**Technical Approach Differences**:  
- Focuses on **system-level resilience** (e.g., WebSocket lifetimes, I/O buffering) rather than UX polish or plugin ecosystems.  
- Uses a **diamond/pearl hermit severity rating system** for granular bug prioritization, reflecting advanced internal triage maturity.  
- Emphasizes **cross-platform compatibility** (APFS, NFS/SMB) as a primary design constraint.

**Community Size Comparison**:  
OpenClaw’s community is **significantly larger** than peers—its issue volume dwarfs others by 5–10×. However, this scale comes with trade-offs: slower PR review cycles, higher signal-to-noise ratio, and increased risk of unaddressed P0 bugs due to maintainership bottlenecks.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, recurring technical needs highlight emerging industry standards:

| Need | Projects Affected | Specific Requirements |
|------|-------------------|------------------------|
| **Session State Integrity** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Prevent silent data loss during upgrades, restarts, or failed tool calls; ensure history persistence across sessions |
| **Upgrade Safety & Recovery** | OpenClaw, QwenPaw, ZeroClaw | Fix broken migration paths; prevent permanent lockouts (e.g., auth profile logout); provide rollback mechanisms |
| **Memory & Resource Management** | QwenPaw, ZeroClaw | Address OOM risks, stack overflows (Windows), and blocking file watchers in large repos |
| **Security & Permission Hardening** | ZeroClaw, Hermes Agent, OpenClaw | Enforce owner-only file permissions, prevent credential leakage, secure cached responses |
| **Error Visibility & Diagnostics** | All projects | Improve logging granularity, add fallback behaviors for network failures, reduce silent failures |

> 🔍 **Emergent Pattern**: Users no longer accept “silent failures.” There is a unified demand for **observable, recoverable, and auditable agent behavior**—especially in production-like environments.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Target User** | Enterprise dev teams, multi-agent architects | Autonomous workflow builders, power users | Developers seeking auditability, traceability | Devs using ACP/MCP, cost-conscious coders | Security-focused teams, Windows-heavy deployments |
| **Feature Focus** | Protocol robustness, state consistency | Persistent bot collaboration, cron reliability | Provenance tracking, lineage integrity | Plugin UX, model efficiency | Security hardening, CI/CD safety |
| **Architecture** | Centralized MCP + layered agents | Decentralized agent lifecycle with desktop control | Turn-based reasoning with lineage snapshots | Modular ACP/MCP hybrid | RPC-first with strict egress controls |
| **Key Differentiator** | Scale & depth of agent coordination | Headless autonomy & long-running missions | Auditability via lineage tests | Cost-aware memory writing | Security-by-default containerization |

> ✅ **Strategic Divergence**:  
> - OpenClaw targets **complex orchestration**.  
> - Hermes Agent aims for **persistent autonomy**.  
> - IronClaw focuses on **provenance and trust**.  
> - QwenPaw emphasizes **efficiency and usability**.  
> - ZeroClaw enforces **security and compliance**.

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Characteristics |
|------|--------|----------------|
| **Rapid Iteration (High Risk, High Innovation)** | OpenClaw, QwenPaw, ZeroClaw | High PR/issue volume; frequent breaking changes; unresolved P0/P1 bugs; active post-release stabilization |
| **Stabilizing (Balanced Growth)** | Hermes Agent | Moderate activity; steady fix rate; focus on security and config robustness; backlog includes critical items |
| **Quiet Stability (Mature & Focused)** | IronClaw | Low noise, incremental improvements; strategic test coverage investments; minimal regressions |

> ⚠️ **Warning Signs**:  
> - OpenClaw and QwenPaw show signs of **feature fatigue**—innovation is outpacing stability.  
> - ZeroClaw’s high P1 burden indicates **technical debt accumulation** in core components.  
> - IronClaw’s low engagement may signal **early-stage stagnation** despite solid architecture.

---

### **7. Trend Signals**  
Based on community feedback and project direction, key industry trends emerge:

1. **Trust > Feature Count**: Users increasingly reject platforms with "silent failures" or unrecoverable states—**reliability is now a competitive differentiator**.
2. **Auditability as Standard**: Lineage tracking, provenance logging, and state snapshot validation (e.g., IronClaw’s PR #8098) are becoming non-negotiable for enterprise-grade deployment.
3. **Security Hygiene Is Table Stakes**: File permission enforcement, image pinning, and credential protection (ZeroClaw, Hermes Agent) are no longer optional—they define baseline trust.
4. **Autonomy Demands Persistence**: Users want bots to survive restarts and desktop closures (Hermes Agent, ZeroClaw), signaling a move toward **headless, server-side agent execution**.
5. **UX at the Edge Matters**: Even minor UI flaws (backspace breaks, UTF-8 issues) generate significant frustration—**terminal I/O and localization are now part of product quality**.

> 💡 **Value for Developers**:  
> The most valuable contributions are not new features—but **robust error handling, state recovery mechanisms, and observable diagnostics**. Projects that invest early in these areas will lead the next phase of adoption.

---

**Final Insight**: The open-source AI agent ecosystem is transitioning from *exploration* to *execution*. Success will go to those who build **resilient, trustworthy, and observable systems**—not just powerful ones. The era of “working enough” is over.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-13**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 updated pull requests in the past 24 hours—indicating strong community engagement and ongoing development momentum. No new releases were published, suggesting a focus on stabilization and issue resolution ahead of a potential upcoming version. The high volume of open PRs and issues reflects a mature but complex system under active refinement, particularly in session state management, security boundaries, and cross-platform compatibility.

---

### **2. Releases**  
*No new releases were published today.*  
The latest stable version remains **v0.21.2** (commit `f364c1977`), released September 11, 2026. No breaking changes or migration notes are currently documented for this release. The absence of updates suggests the team is prioritizing bug fixes and stability improvements over feature rollouts.

---

### **3. Project Progress**  
**18 PRs merged or closed today**, including critical fixes and minor enhancements across core components:

- ✅ **Security & Stability Fixes**:  
  - [`PR #109240`](https://github.com/NousResearch/hermes-agent/pull/109240): Updated vulnerable npm dependencies (`sanitize-html`, `browserslist`, `colord`) to patched versions.  
  - [`PR #109250`](https://github.com/NousResearch/hermes-agent/pull/109250): Fixed false gateway DOWN detection on macOS after `hermes update`.  
  - [`PR #109252`](https://github.com/NousResearch/hermes-agent/pull/109252): Extended external cron worker ack window from 5s to 12s to accommodate cold-start delays.  

- ✅ **Session & State Management**:  
  - [`PR #109244`](https://github.com/NousResearch/hermes-agent/pull/109244): Prevents desktop chat loss during session selection churn.  
  - [`PR #109465`](https://github.com/NousResearch/hermes-agent/pull/109465): Gracefully degrades corrupted UTF-8 prompt cells instead of aborting queries.  

- ✅ **Platform & Integration Fixes**:  
  - [`PR #109479`](https://github.com/NousResearch/hermes-agent/pull/109479): Properly restarts legacy `hermes-gateway.service` units when `HERMES_HOME` matches current custom path.  
  - [`PR #109477`](https://github.com/NousResearch/hermes-agent/pull/109477): Preserves transport ownership during Discord thread renames.  

These fixes demonstrate strong focus on reliability, cross-platform resilience, and user experience continuity.

---

### **4. Community Hot Topics**  
Top 3 most commented issues reflect deep concerns around **session integrity**, **security gateways**, and **config robustness**:

1. **[Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)**: *Bot Group Chats Should Keep Working After Desktop Closes* (28 comments)  
   → **Need**: Persistent bot collaboration across devices without keeping Desktop open. Critical for autonomous workflows.

2. **[Issue #109243](https://github.com/NousResearch/hermes-agent/issues/109243)**: *Cron: External-worker handoff requires ack within 5s, but cold start takes ~12s* (17 comments)  
   → **Need**: Realistic timing for cold starts; current timeout causes intermittent job failures.

3. **[Issue #39609](https://github.com/NousResearch/hermes-agent/issues/39609)**: *Tasks created with --initial-status blocked auto-promote to ready with no actor* (16 comments)  
   → **Need**: Prevent silent bypass of human approval gates in Kanban systems—critical for auditability.

> These top issues signal that users are pushing the agent into production-like, long-running, and multi-device environments where reliability and control are paramount.

---

### **5. Bugs & Stability**  
**Critical bugs reported today**, ranked by severity and impact:

| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| [#109243](https://github.com/NousResearch/hermes-agent/issues/109243) | P2 (High) | Cron jobs fail due to 5s ack timeout vs 12s cold start | ✅ [`PR #109252`](https://github.com/NousResearch/hermes-agent/pull/109252) |
| [#109440](https://github.com/NousResearch/hermes-agent/issues/109440) | P1 (High) | `hermes chat -q -m <alias>` leaks API keys to default provider host | ⚠️ *No fix yet* — serious security risk |
| [#109422](https://github.com/NousResearch/hermes-agent/issues/109422) | P1 (High) | Multiplexed profiles share OAuth identities silently | ⚠️ *No fix yet* — privacy/security breach |
| [#109423](https://github.com/NousResearch/hermes-agent/issues/109423) | P2 | Telegram group messages dropped due to JSON mis-parsing | ✅ [`PR #109475`](https://github.com/NousResearch/hermes-agent/pull/109475) (related) |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | P2 | Bot chats break when Desktop closes | ❌ *No fix yet* — major UX blocker |

> **Urgent**: Two P1 security issues remain unpatched. The credential leak (`#109440`) and identity sharing (`#109422`) represent significant risks if exploited.

---

### **6. Feature Requests & Roadmap Signals**  
User demand is shifting toward **persistent autonomy**, **cross-device continuity**, and **developer tooling**:

- **Persistent Bot Collaboration** ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681)): Users want bots to continue working even after Desktop closes—suggests push toward headless, server-side deployment.
- **Autonomous Mission Lifecycle** ([#82304](https://github.com/NousResearch/hermes-agent/issues/82304)): Request for GPU lifecycle tracking, task persistence, and supervision—clear sign of interest in long-running AI missions.
- **Better Dependency Management** ([#102563](https://github.com/NousResearch/hermes-agent/issues/102563)): Users demand `npm-check` and `npm outdated` be run pre-release—signals desire for more secure, auditable builds.
- **Per-Agent Linux Desktops with Realms** ([#104567](https://github.com/NousResearch/hermes-agent/pull/104567)): Suggests growing interest in isolated, sandboxed agent environments.

> These signals point to a next-phase roadmap focused on **enterprise-grade autonomy**, **secure isolation**, and **production readiness**.

---

### **7. User Feedback Summary**  
Real-world pain points revealed through issues:

- **"I lost my work because the agent restarted and re-executed actions."** → Confirmed in [#84235](https://github.com/NousResearch/hermes-agent/issues/84235) (concurrent turns cause duplicates).
- **"My config changes were silently ignored after a syntax error."** → Highlighted in [#102945](https://github.com/NousResearch/hermes-agent/issues/102945) — dangerous UX flaw.
- **"I can’t trust the CLI to handle sensitive configs safely."** → Evidenced by [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) (CLI bypasses write protection).
- **"My self-hosted model alias stopped working after startup."** → Reported in [#107191](https://github.com/NousResearch/hermes-agent/issues/107191) — shows friction in custom inference setups.

> Overall satisfaction appears mixed: users appreciate the agent’s capabilities but are frustrated by instability, configuration fragility, and security blind spots.

---

### **8. Backlog Watch**  
Long-standing, high-impact issues requiring maintainer attention:

| Issue | Age | Status | Why It Matters |
|------|-----|--------|----------------|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 2026-08-29 (25 days) | Open, P2 | Core use case: persistent bot collaboration. Blocking true autonomy. |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | 2026-06-05 (100+ days) | Open, P1 | Bypasses human approval gate — serious compliance risk. |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | 2026-07-06 (100+ days) | Open, P2 | Security boundary breach via CLI — critical flaw. |
| [#82304](https://github.com/NousResearch/hermes-agent/issues/82304) | 2026-08-09 (105 days) | Open, P3 | Unattended missions fail silently — undermines autonomous promise. |

> These issues have been open for weeks or months despite high visibility and severity. Prioritization is needed to maintain trust and scalability.

---

**Project Health Assessment**: 🔴 **High Activity, Moderate Stability**  
Hermes Agent is in a phase of intense iteration with strong community input. While many critical bugs are being addressed, several high-severity security and workflow issues remain unresolved. The project is maturing rapidly but requires stronger triage discipline and faster response to P1/P2 issues to meet enterprise and production expectations.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-13**

---

### **1. Today's Overview**  
The IronClaw project shows low activity in the last 24 hours, with no new issues and no releases. Two pull requests were updated: one merged, one open, indicating modest but focused development momentum. The absence of new issues suggests a stable state for core functionality, though community engagement remains minimal. The recent merge reflects incremental improvements in assistant behavior and channel handling, while the open PR signals deeper work on lineage tracking and test coverage.

---

### **2. Releases**  
*No new releases today.*  
There are currently no version updates or changelogs published. Users should continue using the latest available release (v0.14.2, as per prior history), with no known breaking changes expected from the current PRs.

---

### **3. Project Progress**  
✅ **Merged PR #8076** – *fix(assistant): distinguish disconnected shared channels*  
- **Impact**: Improves reliability in multi-user environments by correctly identifying and handling disconnected shared channels.
- **Key Fixes**:
  - Differentiates between paired users with disconnected channels and unpaired accounts.
  - Ensures consistent rejection classification across product surfaces (UI, adapters, OpenAI-compatible APIs).
  - Updates Slack integration logic to reflect this distinction.
- **Status**: Merged and likely deployed in next patch cycle.

📌 **Open PR #8098** – *test(turns): pin state-derived lineage drop*  
- **Focus**: Enhances test coverage around `TurnRunState` lineage semantics.
- **Goal**: Prove that metadata initially carries depth, activation provenance, and descendant cap — then verify that a `TurnRunState`-derived snapshot deliberately drops all three lineage fields.
- **Significance**: This is a foundational test for auditability and traceability in AI agent workflows. Its completion will strengthen the integrity of state management in complex turn-based reasoning systems.

---

### **4. Community Hot Topics**  
🔍 **Most Active Item**: [PR #8098](https://github.com/nearai/ironclaw/pull/8098) – *test(turns): pin state-derived lineage drop*  
- **Why it matters**: Though only 0 reactions, this PR touches a critical aspect of agent state fidelity — lineage tracking during state snapshots.
- **Underlying Need**: Developers are pushing for stronger guarantees about data provenance and consistency in long-running agent sessions. This test aims to formalize expectations around what gets preserved or dropped during state transitions, crucial for debugging and reproducibility.

💡 **Note**: Despite being open, this PR has not yet triggered discussion or comments, suggesting either high confidence in its design or lack of visibility among contributors.

---

### **5. Bugs & Stability**  
⚠️ **No bugs or regressions reported today.**  
- No new issues filed in the past 24 hours.
- The merged fix (#8076) addresses a subtle but important stability concern in shared channel handling, particularly in federated user scenarios (e.g., Slack integrations).
- While no crashes or failures were logged, the fix implies potential instability when channel states become inconsistent — a known risk in distributed agent systems.

✅ **Fix Status**: Resolved via PR #8076; no follow-up required unless edge cases emerge post-deployment.

---

### **6. Feature Requests & Roadmap Signals**  
🟢 **Emerging Signal**: Deeper lineage control and testability in agent state management.  
- PR #8098 suggests a roadmap focus on **auditability**, **provenance tracking**, and **state immutability verification**.
- Implied future feature: Optional lineage retention flags or configurable state-snapshot policies.
- Likely near-term addition: Enhanced diagnostic tools for tracing agent decisions through turn histories.

📌 **Predicted Inclusion**: Next minor release (v0.15.x) may include:
- Configurable lineage preservation levels
- Improved logging for state transitions
- Built-in test assertions for lineage integrity

---

### **7. User Feedback Summary**  
💬 *Indirect feedback from PRs indicates:*  
- Users value **predictable behavior in collaborative contexts** (e.g., shared channels in Slack).
- There’s growing demand for **transparent decision-making** in AI agents — especially when state changes occur silently (e.g., lineage loss in snapshots).
- A recurring pain point involves **ambiguous error messages** when connections fail or channels disconnect unexpectedly — now addressed via PR #8076.

📈 Satisfaction appears high due to proactive fixes, but lacks direct user input. Future engagement may increase once testing features like lineage validation are exposed in developer docs.

---

### **8. Backlog Watch**  
⏳ **Long-standing Issue: [Issue #7521](https://github.com/nearai/ironclaw/issues/7521)** – *support dynamic prompt templating with context-aware injection*  
- **Status**: Open since 2025-11-15 | 23 comments | 12 👍
- **Why It Matters**: A top-requested feature enabling richer, adaptive prompts based on real-time context (e.g., user history, environment state).
- **Maintainer Attention Needed**: No progress in 8 months despite strong community interest. High priority for next major iteration.

🔥 **Other High-Value Backlog Items**:
- [Issue #6983](https://github.com/nearai/ironclaw/issues/6983): *enable persistent memory pruning strategies* – critical for scalability.
- [PR #7844](https://github.com/nearai/ironclaw/pull/7844): *add streaming response buffering for low-latency clients* – stalled due to architectural debate.

---

**Summary Assessment**:  
IronClaw remains stable with quiet but meaningful development. The focus is shifting toward **state integrity**, **traceability**, and **robustness in collaborative setups**. While community participation is low, key technical debt is being addressed. Maintainers should prioritize backlog items tied to user-facing flexibility and observability to sustain long-term adoption.  

🔔 *Monitor PR #8098 closely — it may unlock broader system-level trust mechanisms in upcoming versions.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-13**

---

### **1. Today's Overview**  
QwenPaw shows strong community engagement with **17 new issues** and **7 open pull requests** updated in the past 24 hours, indicating active development and real-world usage testing. The project is in a critical phase of post-2.2.x release stabilization, with multiple high-severity bugs related to memory exhaustion, session persistence, model configuration loss, and protocol compatibility emerging. While no new releases were published, several PRs target urgent stability fixes—particularly around ACP/MCP interoperability, workspace watching, and error handling. The core team is responding swiftly, but user-reported regressions suggest growing pains following recent architectural upgrades.

---

### **2. Releases**  
❌ **No new releases** reported as of 2026-09-13.  
The latest stable version remains **v2.2.1-beta.2**, with users encountering instability across desktop (Windows/macOS) and containerized environments. No migration notes or breaking changes have been announced since v2.2.0, but ongoing issues imply that some backward-incompatible behaviors may be present in the current beta stream.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs:**  
- **#7729** ([fix(mcp): recognize Java jsonRpcError envelope on discover probe](https://github.com/agentscope-ai/QwenPaw/pull/7729)) – Fixes MCP server handshake failure with Java/Kotlin SDKs by correctly parsing non-standard `jsonRpcError` responses. Critical for cross-language MCP integration.
- **#7725** ([fix(workspace): replace blocking watchfiles.awatch SSE watcher with threaded polling](https://github.com/agentscope-ai/QwenPaw/pull/7725)) – Addresses severe server freeze when browsing large workspaces by replacing synchronous file-watching logic with asynchronous polling.
- **#7680** ([fix(agents): diagnose dropped subagent model overrides](https://github.com/agentscope-ai/QwenPaw/pull/7680)) – Adds visibility into failed subagent model config loading, improving debugging for hierarchical agent setups.

These fixes indicate a focused effort on **protocol robustness**, **system stability**, and **developer observability**.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Activity & Impact:**

| Issue | Summary | Link | Comments | Severity |
|------|--------|------|---------|----------|
| [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | Daily Paper fails silently when arxiv.org unreachable — no proxy/config feedback | 3 | ⚠️ High (user workflow disruption) |
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | Memory exhaustion from three compounding paths (stream buffers, keep-alive stacking, doom-loop evasion) | 2 | 🔥 Critical (OOM risk) |
| [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | Workspace file browser freezes entire server on large repos due to `watchfiles.awatch` sync block | 1 | 🔥 Critical (server hangs) |
| [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | MCP cannot connect/register after upgrade to 2.2.x — breaks integrations | 2 | ⚠️ High (breaks ecosystem) |

📌 **Underlying Needs:**  
Users are reporting **friction in production workflows** — especially around **offline resilience**, **memory management**, and **interoperability with external agents**. There’s clear demand for better error transparency and fallback mechanisms, particularly for network-dependent plugins like `Daily Paper`.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs Reported (Ranked by Severity):**

1. **Memory Exhaustion (High Risk)**  
   - **Issue #7722**: Three distinct memory-leak vectors cause OOM in containers (~1MB/s growth).  
   - **PR Fix**: [PR #7722](https://github.com/agentscope-ai/QwenPaw/pull/7722) submitted with minimal repro and fix proposal.  
   - **Impact**: Can crash headless deployments; requires immediate attention.

2. **Server Freeze on Large Workspaces**  
   - **Issue #7721**: `watchfiles.awatch` blocks event loop during initialization.  
   - **PR Fix**: [PR #7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) replaces blocking scan with threaded polling.  
   - **Impact**: Breaks usability for developers using large codebases.

3. **Model Configuration Loss**  
   - **Issue #7708 / #7724**: Users report losing model settings and **entire conversation history** mid-session.  
   - **PR Status**: No fix yet. Root cause likely in state persistence or config reload logic.  
   - **Impact**: High user frustration; undermines trust in long-running sessions.

4. **Silent Failures in Plugin Execution**  
   - **Issue #7715**: `Daily Paper` plugin returns “completed with no content” despite network errors.  
   - **Fix Needed**: Better error propagation and offline fallback behavior.

---

### **6. Feature Requests & Roadmap Signals**  
💡 **Emerging Feature Priorities (Based on User Demand):**

| Feature Request | Description | Link | Expected Timeline |
|----------------|------------|------|------------------|
| **A2A Protocol Support** | Official support for Agent-to-Agent (A2A) via unified Driver mechanism (currently only MCP supported) | [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) | Likely Q4 2026 |
| **Separate Model for Memory Writing** | Allow `ReMeLight` to use a lighter model for summarization/dreaming (not main LLM) | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664), [PR #7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | High priority for cost optimization |
| **Plugin Store UX Improvements** | One-click install/update, update notifications, persistent search context | [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) | Post-2.2.1 stabilization |
| **Dot-Prefixed File Visibility Toggle** | UI option to show hidden `.git`, `.env`, etc. files | [#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) | Low-hanging fruit, likely in 2.2.2 |
| **DeepSeek Model Enhancements** | Native metadata, prompt prefix stability, KV-cache observability | [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) | Follow-up to v2.2.1 API parity |

➡️ **Prediction**: Next version (**v2.2.2**) will focus on **stability fixes**, **memory safety**, and **cost-aware memory writing**. A2A support may be delayed until Q4 2026.

---

### **7. User Feedback Summary**  
👥 **Real User Pain Points:**

- **Session Integrity**: Multiple reports of **conversation loss** and **model reset** during normal use (e.g., #7708, #7724). Users feel their work is at risk without warning.
- **Workflow Interruption**: Silent failures in plugins (like `Daily Paper`) lead to confusion and wasted time. Users want **clear error messages** instead of cryptic "no content" logs.
- **Complex Plugin Management**: Installing/updating multiple plugins requires excessive clicks and page refreshes (per #7582).
- **Trust in Architecture**: Despite progress in 2.x, users are concerned about **regressions** post-upgrade (e.g., #7716), suggesting confidence in the stability of the new architecture is still being built.

✅ **Positive Signals**:  
- Active contribution from first-time contributors (e.g., PRs #7718, #7719, #7680) indicates healthy community adoption.
- Detailed bug reports with repro steps and logs show engaged, technically capable users.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered, High-Impact Issues Needing Maintainer Attention:**

| Issue | Status | Link | Why It Matters |
|------|--------|------|----------------|
| [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) | Open | [A2A Support in 2.x?](https://github.com/agentscope-ai/QwenPaw/issues/7484) | Blocks future agent orchestration scalability; affects roadmap planning. |
| [#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720) | Open | [Creator plugin GATED blocker hides image acceptance](https://github.com/agentscope-ai/QwenPaw/issues/7720) | Hinders creative workflow automation; prevents progression from image to storyboard. |
| [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) | Open | [Out-of-workspace write bypasses security check](https://github.com/agentscope-ai/QwenPaw/issues/7727) | Security vulnerability if unpatched — kimi-code tool can write outside workspace silently. |
| [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) | Open | [ACP trusted: true falls back to interactive prompts](https://github.com/agentscope-ai/QwenPaw/issues/7726) | Undermines automation potential; breaks trust in secure delegation. |

> ⚠️ These issues represent **strategic risks** to QwenPaw’s long-term viability as an agent orchestration platform. Priority should be given to **security**, **automation reliability**, and **cross-agent communication clarity**.

---

**Final Assessment**: QwenPaw is undergoing a pivotal stabilization phase post-2.2.x. While innovation continues (A2A, DeepSeek enhancements), **user experience is currently strained by instability, data loss, and poor error feedback**. Immediate focus must shift to fixing memory leaks, restoring session integrity, and improving plugin resilience. With strong community involvement and targeted fixes underway, QwenPaw has the potential to emerge as a robust, scalable AI agent framework—but only if core stability issues are prioritized.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-13  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active with a surge in developer engagement: **24 new issues** and **50 pull requests** updated in the past 24 hours, indicating strong momentum across core components. The ecosystem shows intense focus on **runtime stability**, **security hardening**, and **CI/CD reliability**, particularly around Windows compatibility and memory safety. No new releases have been published, suggesting ongoing stabilization efforts ahead of a potential version bump. The high volume of P1/P2 bugs—especially those involving data loss, stack overflows, and authentication—signals critical path work in progress.

---

### **2. Releases**

> ✅ **No new releases** were published today.  
> 🔔 *Note:* The last release cycle was likely delayed due to unresolved P1 security and stability issues (e.g., #10734, #10797), particularly around stack guard violations and concurrent memory writes.

---

### **3. Project Progress**

#### ✅ **Merged/Closed PRs & Fixes (Today)**

- **PR #10726** – *ci(zerorelay): pin published relay base images by digest*  
  → Resolves long-standing security risk (#10277) by anchoring Docker base images via digest, preventing drift in published `zerorelay` container.  
  [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10726)

- **PR #10401** – *feat(channels): make the Telegram unauthorized notice configurable and authorization-aware*  
  → Aligns runtime messaging with Fluent localization and channel-specific auth logic.  
  [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10401)

- **PR #10091** – *fix(memory): harden response cache storage permissions*  
  → Secures cached model responses by applying owner-only file permissions (matching audit DB).  
  [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10091)

- **PR #10449** – *fix(channels): create Edge TTS artifact with owner-only permissions*  
  → Prevents world-readable audio artifacts from being generated during TTS synthesis.  
  [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10449)

- **PR #10169** – *docs(adr): file ADR-014 plugin egress authority as proposed*  
  → Finalizes architectural decision for plugin egress control, now formally documented.  
  [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10169)

These represent significant progress in **security hygiene**, **compliance**, and **documentation maturity**.

---

### **4. Community Hot Topics**

#### 🔥 **Most Active Issues (by comments/reactions)**

| Issue | Summary | Link |
|------|--------|------|
| [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | Critical stack overflow risk in `RpcDispatcher::process_line` on Windows (`0xc00000fd`) — P1, medium risk, in-progress | [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) |
| [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | Failed Code/ACP turns discard all history — including completed tool exchanges — leading to data loss | [Issue #10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) |
| [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | **S0 severity**: Markdown memory backend silently loses entries during concurrent `store()` calls — **data loss risk** | [Issue #10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) |
| [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | MCP connection permanently poisoned after one failed recovery — blocks workflows | [Issue #10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) |

> 📌 **Analysis**: The community is urgently focused on **data integrity**, **concurrency safety**, and **platform-specific stability (Windows)**. These are not edge cases—they impact real user sessions and long-running agents. The high concentration of P1/P2 issues suggests a **stability bottleneck** in production-grade usage.

---

### **5. Bugs & Stability**

#### ⚠️ **Critical Bugs Reported (Ranked by Severity)**

| ID | Component | Severity | Status | Risk | Notes |
|----|----------|----------|--------|------|-------|
| [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | Memory (Markdown backend) | **S0 - Data Loss / Security Risk** | In-progress | High | Concurrent `store()` calls overwrite without coordination; no atomicity or locking |
| [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | CI / Runtime | S2 - Degraded Behavior | In-progress | Medium | Stack overflow near 2MB guard on Windows; triggered by `nextest` job |
| [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | Runtime / ACP | S2 - Degraded Behavior | In-progress | High | Lost history despite successful tool execution — impacts session fidelity |
| [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | Tools (MCP) | S1 - Workflow Blocked | Open | High | One failure poisons entire connection — no retry mechanism |
| [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) | CLI / TUI | S2 - Degraded Behavior | Accepted | Medium | Backspace breaks on multi-byte UTF-8 characters in REPL |

> ✅ **Fix PRs Exist For**:  
> - #10797: No fix yet; needs race condition handling (likely mutex or atomic write)  
> - #10734: Fix pending; may require stack size adjustment or refactoring  
> - #10788: No fix yet; requires change in `turn_end` vs. `session/list-acp` logic  

> ❗ **Urgency**: Several **P1 issues remain open** with no merged fixes—this indicates **critical gaps** in quality gates before release.

---

### **6. Feature Requests & Roadmap Signals**

#### 💡 **Top User-Requested Features**

| Feature | Issue | Link | Significance |
|--------|-------|------|-------------|
| WhatsApp PDF preview with thumbnails | [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) | [Issue #10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) | Enhances mobile UX; signals demand for richer media integration |
| Configurable Telegram “unauthorized sender” notice | [#10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400) | [Issue #10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400) | Already addressed in PR #10401 — **in-flight feature** |
| Localize ZeroCode startup diagnostics | [#10789](https://github.com/zeroclaw-labs/zeroclaw/issues/10789) | [Issue #10789](https://github.com/zeroclaw-labs/zeroclaw/issues/10789) | Indicates growing international user base; i18n maturity signal |
| Retire local RPC connections post-terminal failure | [#10791](https://github.com/zeroclaw-labs/zeroclaw/issues/10791) | [Issue #10791](https://github.com/zeroclaw-labs/zeroclaw/issues/10791) | Improves resource management and error cleanup |

> 📈 **Prediction**: The next stable release will likely include:
> - **Security hardening** (file perms, image pinning)
> - **Improved session resilience** (ACP turn handling, memory backend)
> - **Localization support** (ZeroCode diagnostics)
> - **WhatsApp PDF previews** (if PR #10812 moves forward)

---

### **7. User Feedback Summary**

Real-world pain points emerging from issue reports:

- **Data Loss Anxiety**: Users report losing tool outputs and prompts even when they completed successfully (#10788, #10797). This erodes trust in agent reliability.
- **Platform Fragmentation**: Windows-specific crashes (stack overflow, test failures) suggest inconsistent testing and deployment practices across OSes.
- **UX Friction**: Key input issues like **Delete key not working** (#10796) and **Backspace breaking on emojis** (#10795) indicate poor terminal I/O handling in TUI.
- **Debugging Difficulty**: On macOS/Windows, `zeroclaw service logs` prints nothing even when daemon is healthy (#10731), making troubleshooting nearly impossible.
- **Mobile Experience Gaps**: WhatsApp users receive generic file cards for PDFs due to missing thumbnails (#10812), reducing usability.

> 👎 **Sentiment**: While contributors are deeply engaged, end-user frustration is rising around **reliability**, **debuggability**, and **mobile interoperability**.

---

### **8. Backlog Watch**

#### ⏳ **Long-Pending, High-Impact Items Needing Attention**

| Issue | Description | Link | Status | Why It Matters |
|------|-------------|------|--------|----------------|
| [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) | models.dev catalog parses only model IDs — vision capabilities ignored | [Issue #8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) | Open (since 2026-07-05) | Blocks accurate vision detection for models like GLM-5.3 Flash |
| [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) | Bounded delegates silently strip `delegate` tool despite config | [Issue #10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) | Closed but unresolved in practice | Contradicts documented policy — risks misconfiguration |
| [#10562](https://github.com/zeroclaw-labs/zeroclaw/issues/10562) | ADR: Define how holding-crate exceptions are granted | [Issue #10562](https://github.com/zeroclaw-labs/zeroclaw/issues/10562) | Open (since 2026-09-02) | Lacks process for extracting subsystems — delays modularization |
| [#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) | Control plane liveness tests race on Windows | [Issue #10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) | Open | Hinders CI stability and Windows support |

> 🛑 **Action Required**: Maintainers should prioritize triaging these **long-standing blockers**—especially #8733 and #10562—before next major release.

---

### ✅ **Final Assessment**

ZeroClaw is **technically robust and rapidly evolving**, with strong contributor activity and deep investment in security and architecture. However, **user-facing stability and reliability are under stress** due to unresolved P1 bugs and platform-specific regressions. The team must balance **deep technical improvements** with **pragmatic fixes** to restore confidence in production use.

> 🎯 **Recommendation**: Prioritize fixing **S0/S1 bugs** (#10797, #10807, #10734) and **high-impact UX issues** (#10795, #10796) before any new feature release. Establish a **release candidate freeze window** to stabilize the codebase.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*