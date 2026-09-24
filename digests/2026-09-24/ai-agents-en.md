# OpenClaw Ecosystem Digest 2026-09-24

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-24 00:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-09-24**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with over **500 issues and PRs updated in the last 24 hours**, indicating intense development and user engagement. The ecosystem is experiencing a surge in stability-related concerns, particularly around macOS app updates and gateway crashes, alongside growing friction in session management, memory handling, and update reliability. While progress continues on core features and UI improvements, a cluster of high-severity bugs—especially those impacting startup, crash loops, and message integrity—are raising release-blocking risks. Community contributions are robust, but several critical fixes remain pending maintainer review.

---

### **2. Releases**  
**🆕 New Release: `v2026.9.6`**  
- **Release Notes**: [openclaw/openclaw v2026.9.6](https://github.com/openclaw/openclaw/releases/tag/v2026.9.6)  
- **⚠️ Critical Warning for macOS Users**: The macOS app build for `2026.9.6` has been **withdrawn from Sparkle update feed** due to a severe crash-on-launch bug (#156861). It causes the app to become completely unlaunchable after update.  
- **Hotfix in Progress**: A `2026.9.7` Mac-specific hotfix is under development.  
- **Recovery Instructions**: If your macOS app fails to launch, **reinstall version `2026.9.5` manually** from https://github.com/openclaw/openclaw/releases/tag/v2026.9.5.  
- **Other Platforms**: Linux and Windows builds are unaffected as of now.

---

### **3. Project Progress**  
**✅ Merged/Closed PRs (Today)**  
- **#155743** ([fix(ci): limit security review source checkout](https://github.com/openclaw/openclaw/pull/155743)): Reduced CI overhead by skipping unnecessary dependency installs during no-op lockfile changes. Improves pipeline efficiency.  
- **#156815** ([refactor: use one TCP port parser across CLI entry points](https://github.com/openclaw/openclaw/pull/156815)): Consolidated redundant port validation logic, reducing code duplication.  
- **#132769** ([fix(line): apply mention requirement to every message](https://github.com/openclaw/openclaw/pull/132769)): Ensures LINE group `requireMention` applies to all message types (media, files, stickers), not just text.  
- **#119686** ([fix(media): retry against original file when Wikimedia rejects thumbnail width](https://github.com/openclaw/openclaw/pull/119686)): Prevents image requests from failing silently when thumbnails are unavailable.

> ✅ These fixes improve consistency, reduce technical debt, and enhance reliability in core workflows.

---

### **4. Community Hot Topics**  
The most active issues reflect deep user frustration with **session stability, update failures, and UI/UX inconsistencies**:

| Issue | Comments | Severity | Link |
|------|---------|----------|------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 39 | 🦪 P0 / Crash Loop | **Critical Memory Leak** — Gateway RSS grows from 350MB → 15.5GB over days, triggering OOM kills and restart loops. |
| [#156861](https://github.com/openclaw/openclaw/issues/156861) | 6 | 🦪 P0 / UX-Release Blocker | **macOS App Unlaunchable** — Update to `2026.9.6` crashes on launch; users report total loss of access. |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | 16 | 🦪 P1 / Message Loss | Reply lost when second run displaces an in-flight turn (`2026.9.4` regression). |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | 15 | 🦪 P0 / Crash Loop | Gateway hangs 17+ minutes at startup due to model runtime timeout. |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | 19 | 🦪 P1 / Session State | `AgentSelectionRequiredError` floods logs in explicit ownership mode. |

> 🔍 **Underlying Needs**: Users demand **predictable session lifecycles**, **zero-data-loss guarantees**, and **stable, non-disruptive updates**. The recurring theme is *systemic resilience* under load and edge cases.

---

### **5. Bugs & Stability**  
High-priority stability issues dominate today’s activity, with multiple regressions and crash loops reported:

| Bug | Severity | Impact | Fix PR? | Status |
|-----|----------|--------|--------|--------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 🦪 P0 | Memory leak → OOM crashes | ❌ No fix yet | Open, high comment volume |
| [#156861](https://github.com/openclaw/openclaw/issues/156861) | 🦪 P0 | macOS app unlaunchable | ❌ Not fixed | Critical blocker |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | 🦪 P0 | Startup hang → timeout | ❌ No fix | Blocking release |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | 🦪 P1 | Reply lost on turn displacement | ❌ No fix | Regression |
| [#146887](https://github.com/openclaw/openclaw/issues/146887) | 🦪 P0 | Update failure across 4 stages | ❌ No fix | Multiple platforms affected |
| [#148681](https://github.com/openclaw/openclaw/issues/148681) | 🦪 P0 | Finalize:doctor update failure | ❌ No fix | Confirmed across Linux/macOS |

> ⚠️ **Trend**: Update pipelines and gateway lifecycle management are systemic weak points. Several P0 bugs are **update-related**, suggesting instability in deployment mechanics.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven feature requests highlight emerging needs around **agent autonomy, multi-platform support, and workflow control**:

| Feature Request | Comments | Priority | Link |
|------------------|--------|----------|------|
| [#44309](https://github.com/openclaw/openclaw/issues/44309) | One-way dispatch without reply ping-pong | P2 | [Add A2A handoff mode](https://github.com/openclaw/openclaw/issues/44309) |
| [#138279](https://github.com/openclaw/openclaw/issues/138279) | Ship Linux ARM64 builds (deb + AppImage) | P1 | [Linux companion for aarch64](https://github.com/openclaw/openclaw/issues/138279) |
| [#141973](https://github.com/openclaw/openclaw/issues/141973) | Add failure-only mode for `tools.exec.notifyOnExit` | P2 | [Refine exit notification semantics](https://github.com/openclaw/openclaw/issues/141973) |
| [#156838](https://github.com/openclaw/openclaw/pull/156838) | Post human discussion without waiting for agent | ✅ In PR | [Post discussion pre-agent](https://github.com/openclaw/openclaw/pull/156838) |

> 📌 **Predicted Next Version Focus**: Likely to include **improved agent-to-agent communication**, **ARM64 Linux support**, and **enhanced UI flow controls** for asynchronous collaboration.

---

### **7. User Feedback Summary**  
Real user pain points reveal strong dissatisfaction with:
- **Update reliability**: Multiple reports of failed or broken updates (e.g., `2026.9.6` on macOS).
- **Session data loss**: Replies lost during turn displacement, phantom messages, and untracked user inputs.
- **UI/UX friction**: Duplicate replies in WebChat, inability to drop images into Side chat, confusing error messages.
- **Platform gaps**: Lack of official ARM64 Linux builds limits adoption on modern hardware.

> 💬 **Satisfaction Signal**: Positive feedback on recent CLI and plugin fixes (e.g., LINE, Discord), showing that targeted improvements resonate with power users.

---

### **8. Backlog Watch**  
Several high-impact issues remain unresolved and require urgent maintainer attention:

| Issue | Status | Why It Matters |
|------|--------|----------------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Open, 39 comments, P0 | Severe memory leak causing repeated OOM crashes. Critical for production use. |
| [#156861](https://github.com/openclaw/openclaw/issues/156861) | Open, 6 comments, P0 | Blocks macOS users entirely. Requires immediate patch. |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | Open, 19 comments, P1 | Floods logs under common config — undermines observability. |
| [#138279](https://github.com/openclaw/openclaw/issues/138279) | Open, 7 comments, P1 | Missing Linux ARM64 support limits accessibility. |
| [#141973](https://github.com/openclaw/openclaw/issues/141973) | Open, 6 comments, P2 | Misleading `notifyOnExit` behavior frustrates automation developers. |

> 🛠️ **Call to Action**: Maintainers should prioritize triage of these issues. The **P0 bugs must be addressed before next stable release** to prevent further user attrition.

---  
*Digest generated: 2026-09-24 | Source: GitHub Data (openclaw/openclaw)*

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-24**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem is entering a maturity phase marked by convergence on core reliability, security, and scalability concerns. Projects are shifting from rapid feature experimentation toward production-grade stability, with growing emphasis on session integrity, update resilience, and cross-platform consistency. While fragmentation persists in tooling and deployment models, shared technical challenges—particularly around memory management, context handling, and secure automation—are driving coordinated innovation across projects. The landscape reflects increasing enterprise readiness, with multi-user support, auditability, and role-based access becoming strategic priorities.

---

### **2. Activity Comparison**

| Project         | Issues (Last 24h) | PRs (Last 24h) | Release Status       | Health Score (1–5) |
|------------------|--------------------|------------------|------------------------|--------------------|
| **OpenClaw**     | 500+               | 500+             | `v2026.9.6` withdrawn (macOS); hotfix in progress | ⭐⭐⭐☆☆ (3.0) |
| **Hermes Agent** | 50                 | 50               | None (v0.20.0 stable) | ⭐⭐⭐⭐☆ (4.0) |
| **IronClaw**     | 0                  | 2                | `1.4.1-rc.1` → `1.4.1-rc.2` prep | ⭐⭐⭐⭐☆ (4.2) |
| **QwenPaw**      | 37                 | 24               | Beta builds active (`2.2.2b2/3`) | ⭐⭐⭐⭐☆ (4.1) |
| **ZeroClaw**     | 11                 | 50               | v0.8.5 (no new release) | ⭐⭐⭐⭐☆ (4.3) |

> 📊 *Health Score*: Based on stability, release reliability, community engagement, and risk exposure (lower = higher risk).

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most **active and highest-volume project**, but also the most **operationally fragile**. With over 500 issues and PRs updated daily, it exhibits the largest community footprint and fastest iteration cycle—indicative of both high adoption and systemic instability. Its **technical approach** emphasizes broad channel integrations (LINE, Discord, etc.) and deep CLI/tooling customization, but this comes at the cost of consistent update pipelines and crash-resistant session management. Compared to peers:
- **Advantages**: Deepest platform coverage, strongest CLI plugin ecosystem, fastest contributor velocity.
- **Differentiators**: Heavy focus on gateway lifecycle robustness and distributed agent orchestration, though currently hampered by unresolved P0 bugs.
- **Community Size**: Likely the largest among peers based on issue volume and comment density.

However, OpenClaw’s **high activity masks underlying fragility**—its health score is lowest due to critical release blockers and recurring crash loops, making it less suitable for mission-critical deployments despite its scale.

---

### **4. Shared Technical Focus Areas**  

| Requirement                          | Projects Affected                         | Specific Needs |
|--------------------------------------|-------------------------------------------|----------------|
| **Session & Context Integrity**      | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Prevent data loss during pruning, handle concurrent writes, avoid silent state corruption |
| **Update Reliability & Rollback**    | OpenClaw, Hermes Agent, IronClaw          | Avoid unlaunchable builds; ensure atomic upgrades; provide recovery paths |
| **Memory & Resource Management**     | OpenClaw, QwenPaw, ZeroClaw              | Fix memory leaks (e.g., RSS growth), prevent OOM crashes, optimize media handling |
| **Security Hardening**               | Hermes Agent, ZeroClaw, OpenClaw          | Enforce approval gates, block dangerous commands, prevent silent bypasses |
| **Multi-User / Multi-Tenant Scalability** | QwenPaw, Hermes Agent, ZeroClaw        | Role-based access, shared skill libraries, admin dashboards, team workflows |

> 🔍 **Emergent Pattern**: Across all projects, **predictability under load and edge cases** is now the top non-functional requirement—more critical than new features.

---

### **5. Differentiation Analysis**

| Dimension               | **OpenClaw**                              | **Hermes Agent**                          | **IronClaw**                     | **QwenPaw**                        | **ZeroClaw**                       |
|--------------------------|--------------------------------------------|--------------------------------------------|-----------------------------------|-------------------------------------|-------------------------------------|
| **Target Users**         | Power users, developers, DIY agents        | Enterprise, regulated environments         | Developers, embedded systems      | Teams, research groups              | Automation engineers, ops teams     |
| **Core Strength**        | Channel diversity, CLI extensibility       | Session durability, localization           | Security-first architecture       | Hub-based collaboration             | WhatsApp/Web integration depth      |
| **Technical Architecture**| Gateway + agent model, multi-channel hub   | Fleet-based agent orchestration            | Virtual skill roots, WASM sandbox | A2A protocol, modular hubs        | SOP-driven workflow engine          |
| **Feature Focus**        | Update resilience, UI polish               | Approval auditing, i18n                    | Dependency hygiene, docs          | Team workflows, memory persistence  | Voice/poll fidelity, routing logic  |
| **Platform Maturity**    | High (but unstable)                        | Medium-high (Windows issues persist)       | Stable (RC phase)                 | Beta (multi-user ready)             | Active development (SOP focus)      |

> 🎯 **Key Insight**: While OpenClaw leads in breadth, **ZeroClaw and QwenPaw are converging on agent-centric, workflow-aware design patterns** that signal the next generation of AI assistants—focused not just on autonomy, but on **resilient, auditable, and collaborative execution**.

---

### **6. Community Momentum & Maturity**

| Tier                     | Projects                                  | Characteristics |
|--------------------------|-------------------------------------------|-----------------|
| **Rapid Iteration (High Velocity)** | OpenClaw, ZeroClaw, QwenPaw              | Daily PR/issue spikes, frequent beta testing, strong user feedback loops |
| **Stabilizing (Pre-Release)**       | Hermes Agent, IronClaw                    | Focused on security, documentation, RC validation; lower issue churn |
| **Low Activity (Preparation Phase)**| IronClaw (only)                           | No new bugs, small PRs focused on hygiene and dependency updates |

> ✅ **Trend**: The ecosystem is bifurcating: **high-velocity projects are refining core infrastructure**, while **stable ones are preparing for enterprise adoption**. IronClaw’s quiet phase signals confidence in current stability, whereas OpenClaw’s chaos reflects early-stage scaling pains.

---

### **7. Trend Signals**  
Based on community feedback and engineering priorities, the following industry trends are emerging:

1. **Agent-to-Agent (A2A) Orchestration Is Now a Priority**  
   - QwenPaw (#7484), ZeroClaw (#11074), and OpenClaw (#44309) all show growing demand for standardized A2A protocols—indicating the shift from single-agent tools to **collaborative agent ecosystems**.

2. **Persistent, Durable Memory Is Non-Negotiable**  
   - QwenPaw’s OpenViking plugin (PR #7613), durable transcript history (PR #7931), and Hermes’ snapshot fixes reveal that **long-running tasks require external, recoverable memory**—not ephemeral in-memory state.

3. **Security Must Be Embedded, Not Optional**  
   - Multiple S0/P0 issues (ZeroClaw #10968, Hermes #59293, OpenClaw #156861) show that **security bypasses and silent data loss are unacceptable**—even if “allowed” in config. Trust is now tied to default behavior.

4. **UX Complexity Demands Better Navigation**  
   - QwenPaw (#7956), ZeroClaw (#10985), and OpenClaw’s UI friction highlight that **as capabilities grow, discoverability becomes a usability bottleneck**—requiring smarter settings, tool discovery, and workflow visualization.

5. **Production Readiness > Feature Novelty**  
   - The prioritization of **atomic writes, rollback mechanisms, and update safety** across projects indicates a clear pivot: **developers now value stability and observability over flashy new features**.

---

### **Conclusion**  
The open-source AI agent ecosystem is transitioning from **exploratory innovation** to **production-focused maturity**. While OpenClaw remains the most active, its instability underscores the risks of scaling too fast without foundational rigor. In contrast, **Hermes Agent, QwenPaw, and ZeroClaw are leading in architectural discipline**, focusing on security, session integrity, and team collaboration—key enablers for real-world adoption. For developers and decision-makers: prioritize projects with **strong release hygiene, proven session durability, and transparent error handling**. The future belongs not to the most features, but to the most resilient.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-24**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pace of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across multiple components. The ecosystem is particularly focused on **security hardening, session stability, localization expansion, and platform-specific reliability fixes**, especially for Windows and desktop clients. No new releases were issued, suggesting that the team is prioritizing internal quality improvements ahead of a potential v0.21.0 rollout. Overall health is strong, though several high-severity bugs (P1/P2) point to ongoing challenges in session state management and cross-platform compatibility.

---

### **2. Releases**  
**None**  
No new releases were published today. The latest stable version remains **v0.20.0** (released August 2026), with no release notes or migration guidance shared for this period.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #120836** – *fix(api): restore GET /v1/skills listing*  
  Fixes critical API endpoint failure (`TypeError`) blocking skill discovery. Resolves Issue #120831.  
  🔗 [PR #120836](https://github.com/NousResearch/hermes-agent/pull/120836)  

- ✅ **PR #120821** – *fix(compression): fence snapshot rewrites atomically*  
  Addresses data loss risk in session compression by ensuring atomic writes during proactive pruning. Critical for fleet integrity.  
  🔗 [PR #120821](https://github.com/NousResearch/hermes-agent/pull/120821)  

- ✅ **PR #120835** – *fix(agent): retain user message for Ollama tool follow-ups*  
  Prevents loss of `user` role in tool continuation payloads, fixing issue #120828 where Ollama rejected malformed requests.  
  🔗 [PR #120835](https://github.com/NousResearch/hermes-agent/pull/120835)  

- ✅ **PR #119630** – *feat(desktop): add Spanish locale*  
  Finalized Spanish (es) UI support after multiple prior attempts, closing long-standing i18n gap.  
  🔗 [PR #119630](https://github.com/NousResearch/hermes-agent/pull/119630)  

- ✅ **PR #108324 & #106287** – German (de) locale materialization efforts completed via trusted rebasing.  
  Unblocks German language support, which had been stalled due to external fork CI limitations.  
  🔗 [PR #108324](https://github.com/NousResearch/hermes-agent/pull/108324), [PR #106287](https://github.com/NousResearch/hermes-agent/pull/106287)

> ✅ **Summary**: High-impact fixes in session integrity, API stability, and internationalization have advanced rapidly. Localization now includes **Spanish (es)** and **German (de)** officially.

---

### **4. Community Hot Topics**  
Top community concerns reflect deep engagement with core agent behavior and security:

- 🔥 **Issue #59293** – *CLI bypasses system-config write protection*  
  **16 comments**, P2 severity. Users report that `hermes config set` can disable security layers unilaterally, undermining the approval gate. This is a **critical security regression** flagged by users and developers alike.  
  🔗 [Issue #59293](https://github.com/NousResearch/hermes-agent/issues/59293)  

- 🔥 **Issue #120582** – *Real-world data loss from proactive prune + compression*  
  **4 comments**, P1 severity. A production incident where script content was silently corrupted mid-session due to argument truncation and pruning logic. Evidence in `state.db` confirms impact.  
  🔗 [Issue #120582](https://github.com/NousResearch/hermes-agent/issues/120582)  

- 🔥 **Issue #56004** – *Thinking models lose reasoning between tool calls on OpenAI-compatible endpoints*  
  **14 comments**, P2 severity. Core agentic logic breaks when using Qwen/OpenRouter backends—reasoning is stripped on replay, undermining model consistency.  
  🔗 [Issue #56004](https://github.com/NousResearch/hermes-agent/issues/56004)  

> 📌 **Underlying Need**: Users are demanding **predictable, secure, and reliable agent behavior**, especially in long-running sessions and multi-tool workflows. Security gaps and silent data corruption are top concerns.

---

### **5. Bugs & Stability**  
**Critical (P1/P2) Issues Reported Today:**

| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| #120582 | P1 | Real-world data loss: tool results truncated, args lost mid-session | ✅ PR #120821 (atomic snapshots) |
| #120828 | Bug | Custom Ollama provider sends empty `user` message → rejection | ✅ PR #120835 (retain user message) |
| #120334 | P2 | Queued heartbeat runs after process exits → stale state | ❌ Pending |
| #118742 | P2 | Desktop-only host stuck in `fleet_restart_pending` loop | ❌ Pending |
| #120831 | Bug | `GET /v1/skills` fails with `unexpected keyword argument` | ✅ PR #120836 (fixed signature) |

> ⚠️ **Stability Note**: Multiple session-state bugs (pruning, compression, heartbeats) suggest systemic fragility in long-lived agent sessions. While some fixes exist, others remain open.

---

### **6. Feature Requests & Roadmap Signals**  
User demand is shifting toward **enhanced control, transparency, and customization**:

- ✅ **Localization Expansion**:  
  - **Spanish (es)** and **German (de)** now merged — signal for broader language support (French already in progress).  
  - Future: Arabic, Japanese, Korean likely next.

- ✅ **Desktop GUI Control**:  
  - Repeated feature requests (#69162, #41431, #78314) for **custom model naming and provider routing** (especially OpenRouter).  
  - Indicates growing use of third-party LLM providers outside default backend lists.

- ✅ **Approval Flow Transparency**:  
  - Issue #117815 highlights **reviewer vs. runtime divergence** in approvals — signals demand for auditability and granular redaction controls.

> 🎯 **Predicted Next Version (v0.21.0)**: Likely to include:
> - **Enhanced session durability** (atomic compression, prune safeguards)
> - **Full Spanish/German support**
> - **Custom model editing in GUI**
> - **Improved approval visibility and audit trails**

---

### **7. User Feedback Summary**  
Real user pain points reveal key friction areas:

- **Windows Reliability**:  
  - Frequent crashes on cold start (Issue #96177), timezone encoding failures (Issue #102910), and `FAST_FAIL_FATAL_APP_EXIT` (Issue #112961) indicate **poor desktop stability** on Windows 11.
  - Users report **silent failures** and **no error feedback** — reducing trust in the desktop app.

- **Localization Gaps**:  
  - French, German, and Spanish support long delayed despite infrastructure ready. Users express frustration at being locked in English.
  - Issue #88264 shows indentation corruption on CRLF files — real-world impact for Windows devs.

- **Tooling Gaps**:  
  - Skills approval queue accumulates silently (Issue #98330); no UI surface to review pending changes.
  - TTS speaks hardcoded English placeholders (Issue #86602), breaking non-English UX.

> 💬 **Satisfaction Signal**: Users appreciate ongoing localization work but are **losing patience with unresolved stability and security issues**.

---

### **8. Backlog Watch**  
High-priority, long-standing items needing maintainer attention:

| Issue | Status | Why It Matters | Link |
|------|--------|----------------|------|
| #59293 | Open (P2, security) | CLI bypasses approval layer — **serious security flaw**; needs immediate design decision. | [Issue #59293](https://github.com/NousResearch/hermes-agent/issues/59293) |
| #118029 | Open (P3, feature) | One pinned, verified rollout control plane for managed SSH — **enterprise-grade deployment need**. | [Issue #118029](https://github.com/NousResearch/hermes-agent/issues/118029) |
| #117815 | Open (P3, security hardening) | Four places where reviewer view ≠ what runs — **auditability gap**. | [Issue #117815](https://github.com/NousResearch/hermes-agent/issues/117815) |
| #66025 | Open (P3, feature) | Memory prompt gets stale in long desktop sessions — impacts **context accuracy**. | [Issue #66025](https://github.com/NousResearch/hermes-agent/issues/66025) |
| #120582 | Open (P1, bug) | Data loss confirmed in production — **urgent fix required**. | [Issue #120582](https://github.com/NousResearch/hermes-agent/issues/120582) |

> 🛑 **Critical**: Several P1/P2 issues remain open despite evidence of real-world impact. Maintainer triage is essential to prevent further incidents.

---

**📊 Project Health Snapshot (2026-09-24):**  
- ✅ **Strengths**: Active community, rapid PR resolution, strong localization push, responsive maintainers.  
- ⚠️ **Risks**: Session data loss, security bypasses, Windows instability, unresolved P1 bugs.  
- 🚀 **Outlook**: High velocity suggests imminent release. Focus should shift toward **stability, security, and auditability** before next major version.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-24**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable, low-activity state as of 2026-09-24, with no new issues or releases reported. Two pull requests were opened within the past 24 hours, both focused on release management and documentation improvements—indicating preparatory work ahead of a potential 1.4.1 release candidate. The absence of merged PRs or closed issues suggests a pause in active development cycles, possibly due to internal stabilization or pre-release validation phases. Overall project health is neutral-to-positive, with no critical stability concerns observed.

---

### **2. Releases**  
*No new releases were published today.*  
The most recent release candidate remains `1.4.1-rc.1`. The upcoming `1.4.1-rc.2` is being prepared via PR #8110, which includes:  
- Promotion of the release branch from `1.4.1-rc.1` to `1.4.1-rc.2`  
- Lockfile updates to patched versions of `wasmtime@47.0.4` and `rustls@0.23.45` for security compliance  
- Retention of the Google extension OAuth readiness fix already present in RC1  

> 🔗 [PR #8110 – chore(release): cut 1.4.1-rc.2](https://github.com/nearai/ironclaw/pull/8110)

---

### **3. Project Progress**  
*No PRs were merged or closed today.*  
However, two open PRs represent meaningful progress toward release readiness:  
- **PR #8110**: Finalizing release candidate infrastructure with updated dependencies and version promotion. This ensures the next RC is aligned with current security advisories.  
- **PR #8109**: Enhancing documentation clarity around virtual skill roots (`/skills`, `/system/skills`, `/tenant-shared/skills`). This improves user understanding of runtime behavior and trust boundaries without altering functionality.  

These contributions indicate a focus on *release hygiene* and *user guidance*, signaling that the team is prioritizing stability and clarity ahead of broader adoption.

> 🔗 [PR #8109 – docs(skills): clarify scoped virtual skill roots](https://github.com/nearai/ironclaw/pull/8109)

---

### **4. Community Hot Topics**  
No issues are currently active, but the two newly opened PRs reflect emerging community needs:  
- **PR #8109** addresses confusion around legacy vs. modern skill discovery paths. Users may be struggling with inconsistent expectations about where skills are loaded from, particularly when migrating from disk-based imports to virtualized environments.  
- **PR #8110** highlights dependency hygiene—maintainers are proactively updating `wasmtime` and `rustls` to patch known vulnerabilities, suggesting that users may have raised concerns about security posture in production deployments.

While no direct community feedback appears in comments, the nature of these PRs implies growing demand for clearer architecture documentation and stronger security assurances.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions were reported today.*  
The project shows no signs of instability. The inclusion of patched `wasmtime` and `rustls` in the upcoming RC2 (via PR #8110) suggests proactive mitigation of known vulnerabilities—though no specific CVEs were cited. No fix PRs exist for existing issues, as none are currently open.

---

### **6. Feature Requests & Roadmap Signals**  
No feature requests were filed today. However, the emphasis on *virtual skill root scoping* in PR #8109 signals a strategic shift toward modular, secure, and scalable skill composition—likely reflecting roadmap priorities for 1.4.x.  
Predicted features in the next release:  
- Enhanced support for tenant-specific skill isolation  
- Improved tooling for skill deployment and verification  
- More granular permission models tied to virtual skill roots  

This aligns with IronClaw’s long-term vision of a secure, composable AI agent framework.

---

### **7. User Feedback Summary**  
Though no user-reported issues exist today, the content of PR #8109 reveals a recurring pain point: **ambiguity in skill discovery mechanisms**. Users likely experience confusion when transitioning from legacy file-system-based skill loading to the newer virtualized model. The need to clarify "trust assignment" without changing runtime behavior indicates that users value transparency and control over how code is executed and trusted.

This suggests strong interest in **predictable, auditable, and secure skill execution**, especially in multi-tenant or enterprise contexts.

---

### **8. Backlog Watch**  
*No high-priority issues are currently open*, but the following items warrant attention:  
- **PR #8109 (docs(skills))**: While labeled as a documentation update, it touches on core architectural concepts. If left unmerged, it could lead to misconfigurations and support overhead.  
- **PR #8110 (release chore)**: Delaying this release candidate may impact downstream testing and integration efforts. Timely progression through RC stages is crucial for community confidence.

Both PRs are small but foundational—priority should be given to merging them soon to maintain momentum.

> 🔗 [PR #8109 – docs(skills): clarify scoped virtual skill roots](https://github.com/nearai/ironclaw/pull/8109)  
> 🔗 [PR #8110 – chore(release): cut 1.4.1-rc.2](https://github.com/nearai/ironclaw/pull/8110)

---

**Conclusion**: IronClaw is in a preparatory phase ahead of a minor release. Activity is low but purposeful—focused on documentation clarity and dependency safety. With no bugs or urgent fixes, the project is stable and well-positioned for incremental improvement. Maintainers should prioritize merging the two open PRs to sustain community engagement and release velocity.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-24**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust pace of development: **37 issues updated in the last 24 hours** (17 open, 20 closed), and **24 pull requests** (15 open, 9 merged or closed). The project shows strong momentum in both bug resolution and feature evolution, particularly around context management, multi-user support, and UI/UX refinement. While no new releases were published, the recent merge activity suggests an imminent update cycle. Community engagement is high, especially on architectural upgrades like Hub and A2A protocol integration.

---

### **2. Releases**  
**No new releases** were published today. The latest stable version remains `v2.2.0`, with beta builds (`2.2.2b2`, `2.2.2b3`) under active testing. No breaking changes have been announced in the past 7 days, though several fixes target backward compatibility (e.g., #7856, which breaks tool approvals in `qwenpaw-pet 0.1.1`).

> 🔗 [GitHub Release History](https://github.com/agentscope-ai/QwenPaw/releases)

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**
- ✅ **PR #7955**: Added download provenance and usage policy to website — improves transparency and licensing clarity.
- ✅ **PR #7952**: Improved error messaging for invitation redemption — now distinguishes between revoked, expired, and malformed invites.
- ✅ **PR #7941**: Expanded unit test coverage by +3.28pp (to 73.79%) across core modules; adds 2,720 new test cases.
- ✅ **PR #7409**: Fixes empty assistant text blocks from persisting in session history — resolves upstream provider errors (e.g., Ark API 400).
- ✅ **PR #7563**: Distinguishes model errors from transport failures — prevents misleading “no model configured” prompts during network glitches.
- ✅ **PR #7927**: Replaced GPL-licensed `html2text` with MIT-licensed `markdownify` — improves license compliance in `web_fetch`.

These merges indicate a focus on **stability, security, and maintainability**, with significant improvements in testing and error handling.

---

### **4. Community Hot Topics**  
The most discussed items reflect deep user needs around **multi-user scalability**, **context integrity**, and **UI usability**:

- 🔥 **Issue #7318** – *“What should we build next?”* (32 comments)  
  > 📌 **Summary**: QwenPaw Hub (multi-tenant edition) launched in v2.2.0; community wants direction on future features.  
  > 💬 **Underlying Need**: Users are eager to scale QwenPaw beyond personal use into team/enterprise workflows. This signals demand for role-based access, shared skill libraries, and admin dashboards.  
  > 🔗 [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)

- 🔥 **Issue #7853** – *ToolResultPruner skips media blocks, causing base64 bloat* (8 comments)  
  > 📌 **Summary**: `view_image` stores images as unpruned base64 payloads → context overflow.  
  > 💬 **Underlying Need**: Real-world image-heavy agents are hitting hard limits. Users expect intelligent media pruning without manual config.  
  > 🔗 [Issue #7853](https://github.com/agentscope-ai/QwenPaw/issues/7853)

- 🔥 **PR #7956** – *Optimize settings workflows and sidebar interactions* (in review)  
  > 📌 **Summary**: Redesigns Console UX for better discoverability of tools, configs, and tasks.  
  > 💬 **Underlying Need**: Users struggle to find tools, create cron jobs, and understand plugin purposes — clear sign of growing complexity needing intuitive navigation.  
  > 🔗 [PR #7956](https://github.com/agentscope-ai/QwenPaw/pull/7956)

---

### **5. Bugs & Stability**  
Critical stability issues reported today include:

| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) | ⚠️ High | Base64 image data never pruned → context explosion | ❌ Not fixed yet |
| [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | ⚠️ Medium | Daily Paper fails silently when arXiv unreachable | ❌ No fix PR |
| [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) | ⚠️ High | Feishu queue consumer deadlocks → silent session freeze | ❌ No fix PR |
| [#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836) | ⚠️ High | Scroll eviction drops live user turns inside tool spans | ❌ Partial fix in PR #7872 (under review) |
| [#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857) | ⚠️ Medium | ACP shutdown fallback leaks event loops | ❌ No fix PR |

> 🛠️ **Note**: Multiple high-severity bugs relate to **context management**, **long-running sessions**, and **channel-specific edge cases** (Feishu, WeChat, DingTalk), suggesting a need for more rigorous end-to-end testing in production-like environments.

---

### **6. Feature Requests & Roadmap Signals**  
User demand is clearly shifting toward **team collaboration**, **modular agent design**, and **advanced memory systems**:

- 🎯 **A2A Protocol Support** (Issue #7484):  
  > "A2A will be supported via unified Driver mechanism — when?" — 5 comments.  
  > 🔍 **Signal**: After MCP is implemented, users expect A2A (Agent-to-Agent) protocol support next. Likely candidate for v2.3.

- 🎯 **Per-Agent Reasoning Effort Override** (Issue #7062):  
  > Allow `reasoning_effort` at agent/session level, not just model-wide.  
  > 🔍 **Signal**: Users want fine-grained control over AI behavior — essential for hybrid agent teams (e.g., fast responder vs. research agent).

- 🎯 **OpenViking Memory Plugin** (PR #7613):  
  > Adds persistent recall, search tools, and automatic turn saving via OpenViking REST API.  
  > 🔍 **Signal**: Demand for **external, durable memory backends** is rising — could become a core feature in upcoming versions.

- 🎯 **Durable Paginated Transcript History** (PR #7931):  
  > SQLite-backed, paginated chat history with deduplication and deletion cleanup.  
  > 🔍 **Signal**: Long-term task tracking is becoming critical — users want audit trails and session recovery.

---

### **7. User Feedback Summary**  
Real user pain points reveal key adoption barriers:

- **UX Friction**:  
  - Tools are hard to find; configuration is buried (Issue #7956).  
  - No download button for generated audio (Issue #2948).  
  - File cards don’t render in Console (Issue #7947).  

- **Reliability Issues**:  
  - Daily Paper job fails silently (Issue #7715) — users can’t debug without logs.  
  - Feishu bot freezes after hours (Issue #7534) — disrupts real-time workflows.  
  - Session state resets after loop mode change (Issue #7377) — frustrates iterative work.

- **Desire for Control**:  
  - Want per-agent LLM routing (Issue #1010) to optimize cost/performance.  
  - Request customizable themes and colors (Issue #2869) — indicates emotional investment in daily use.

---

### **8. Backlog Watch**  
Several long-standing, high-impact issues remain unresolved despite traction:

| Issue | Age | Comments | Status | Notes |
|------|-----|---------|--------|-------|
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 28 days | 32 | Open | Multi-tenant roadmap request — **critical for enterprise adoption** |
| [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) | 22 days | 5 | Open | A2A support — **blocker for agent orchestration ecosystem** |
| [#7733](https://github.com/agentscope-ai/QwenPaw/issues/7733) | 21 days | 4 | Open | Autonomous context handover — **key to long-running agent tasks** |
| [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | 19 days | 8 | Closed | Hardcoded context_size = 32768 broke all models — **regression in v2.1–2.2** |
| [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) | 16 days | 8 | Open | Media block pruning failure — **high-risk for image-heavy agents** |

> ⚠️ **Action Needed**: Maintainers should prioritize **context integrity**, **media handling**, and **multi-user scalability** in the next release cycle. These are foundational for production-grade deployment.

---

**Final Assessment**: QwenPaw is maturing rapidly from a personal assistant into a collaborative, scalable agent platform. The community is vocal, technically sophisticated, and driving meaningful architectural direction. With strong engineering activity and clear roadmap signals, **v2.3 is poised to deliver major advances in team collaboration, context resilience, and extensibility**.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-09-24**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active with a surge in developer engagement: **11 open issues** and **50 open pull requests** updated in the past 24 hours, indicating strong momentum in both bug triage and feature development. The activity is concentrated in core areas—security hardening, channel integration (especially WhatsApp Web), runtime stability, and agent tooling—reflecting a focus on production readiness and user-facing reliability. No new releases were published today, suggesting that the team is prioritizing code quality and issue resolution ahead of a potential v0.8.6 or v0.9.0 milestone.

---

### **2. Releases**  
*No new releases were published as of 2026-09-24.*  
The last release was v0.8.5 (circa August 2026). Maintainers are actively working on improving release efficiency via [Issue #10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814), which tracks workflow optimization for repeatable, low-overhead deployments.

---

### **3. Project Progress**  
**Merged/Closed PRs:** 3  
While no PRs were merged today, three were closed, likely due to stale status or incomplete review cycles.  

**Key progress observed in open PRs:**  
- **Security & Runtime Stability**: PRs like [#11061](https://github.com/zeroclaw-labs/zeroclaw/pull/11061) (blocking high-risk shell commands even when allowlisted) and [#10813](https://github.com/zeroclaw-labs/zeroclaw/pull/10813) (preventing headless SOP turns from spawning independent runs) address critical security and state consistency risks.  
- **WhatsApp Web Enhancements**: Multiple PRs (e.g., [#11057](https://github.com/zeroclaw-labs/zeroclaw/pull/11057), [#10988](https://github.com/zeroclaw-labs/zeroclaw/pull/10988)) improve voice note handling and poll response parsing, signaling deeper investment in WhatsApp UX.  
- **Tooling Expansion**: PR [#11076](https://github.com/zeroclaw-labs/zeroclaw/pull/11076) adds `agy_cli` support for Google’s Antigravity CLI, reflecting ongoing adaptation to shifting provider ecosystems.

---

### **4. Community Hot Topics**  
The most active community discussions center around **WhatsApp Web limitations**, **security policy enforcement**, and **agent autonomy controls**:

- **[Issue #10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968)**: *Unattended agent turns run without ApprovalManager → silent approval bypass (S0 risk)*  
  - **Comments**: 3 | **Severity**: S0 (data loss/security risk)  
  - **Need**: Ensuring automated agents cannot bypass security policies without explicit approval, especially in headless/SOP contexts.

- **[Issue #10985](https://github.com/zeroclaw-labs/zeroclaw/issues/10985)**: *Dashboard-started turns fail to reach session-bound channels*  
  - **Comments**: 3 | **Severity**: S2 (degraded behavior)  
  - **Need**: Fixing channel instance lifecycle management so dashboard-initiated interactions work reliably across all channel types.

- **[PR #11074](https://github.com/zeroclaw-labs/zeroclaw/pull/11074)**: *RFC: search_routes — hint-based routing for web_search_tool*  
  - **Comments**: 0 | **Significance**: Proposes intelligent query routing (e.g., primary sources vs. corroboration), a powerful signal for next-gen agent reasoning capabilities.

These topics reveal growing demand for **predictable agent behavior**, **secure automation**, and **context-aware tool orchestration**.

---

### **5. Bugs & Stability**  
Critical bugs remain unresolved, with several high-severity issues in active discussion:

| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) | **S0** (Data Loss / Security Risk) | Unattended agent turns skip ApprovalManager, making security policies inert | ✅ **PR #11061** addresses related command execution bypass |
| [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | **S0** (Data Loss / Security Risk) | Concurrent `store()` calls in markdown memory backend cause silent data loss | ❌ No fix PR yet; requires atomic write coordination |
| [#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) | Medium | Daemon fails to register channel-map factory → tools unusable outside two entry points | ⚠️ Partial fix in PR #10986 (channel instance injection) |

> 🔴 **Top Priority**: Immediate attention needed on **memory backend concurrency** and **approval enforcement in unattended modes**.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging features suggest a shift toward **intelligent routing**, **enhanced channel fidelity**, and **multi-provider flexibility**:

- **[Feature #11052](https://github.com/zeroclaw-labs/zeroclaw/issues/11052)**: Render thematic breaks (`***`, `---`) in WhatsApp Markdown → improves readability of structured outputs.
- **[Feature #11050](https://github.com/zeroclaw-labs/zeroclaw/issues/11050)**: Pace native polls with other outbound messages → prevents message flooding and respects recipient pacing.
- **[RFC #11074](https://github.com/zeroclaw-labs/zeroclaw/issues/11074)**: `search_routes` for `web_search_tool` → enables multi-source validation, a hallmark of advanced agent reasoning.
- **[Feature #11075](https://github.com/zeroclaw-labs/zeroclaw/issues/11075)**: Add `agy_cli` → reflects real-time adaptation to provider changes (Google’s shift from `gemini-cli` to `agy`).

👉 **Prediction**: These features are likely candidates for inclusion in **v0.9.0**, expected within Q4 2026, alongside improved SOP workflows and better webhook/channel binding.

---

### **7. User Feedback Summary**  
User pain points reflect real-world deployment challenges:

- **Voice mode inconsistency**: Users report that `force_voice` and `suppress_voice` flags are ignored by WhatsApp Web, undermining control over communication modality ([#11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059), [#10922](https://github.com/zeroclaw-labs/zeroclaw/issues/10922)).
- **Polls not actionable**: Native WhatsApp polls are sent but not parsed back, rendering them useless for decision-making ([#10988](https://github.com/zeroclaw-labs/zeroclaw/issues/10988)).
- **Dashboard misbehavior**: Turns started from the web UI fail to access session-bound channels, breaking end-to-end workflows ([#10985](https://github.com/zeroclaw-labs/zeroclaw/issues/10985)).
- **Security fatigue**: Users want stronger safeguards against accidental destructive actions (e.g., `rm -rf`), even if allowed in config ([#11061](https://github.com/zeroclaw-labs/zeroclaw/pull/11061)).

Overall, users value **predictability**, **control**, and **resilience**—they are pushing the system beyond basic automation into reliable, secure, and context-sensitive assistant roles.

---

### **8. Backlog Watch**  
Several high-impact, long-standing issues require maintainer attention:

- **[Issue #10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814)**: *Release efficiency and repeatable publication*  
  - **Status**: Open since 2026-09-13 | **Needs**: Coordinated effort to streamline CI/CD, reduce build redundancy, and enable faster, more reliable releases.

- **[Issue #10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797)**: *Markdown memory backend loses entries under concurrent store() calls*  
  - **Status**: Open since 2026-09-12 | **Risk**: S0 (data loss); **no fix PR submitted yet** despite clear reproduction steps.

- **[Issue #10985](https://github.com/zeroclaw-labs/zeroclaw/issues/10985)**: *Dashboard turns can’t reach session-bound channels*  
  - **Status**: Open since 2026-09-20 | **Impact**: High — breaks core use case for persistent, interactive agents.

> 🛠️ **Recommendation**: Prioritize fixing memory backend race conditions and channel instance wiring before v0.9.0 release.

---

✅ **Project Health Assessment**: **High Activity, Critical Risks Present**  
ZeroClaw is in a phase of intense development with strong community input and technical depth. However, **unresolved S0-level bugs in memory and security** pose serious risks to production use. With strategic focus on release stability and foundational reliability, ZeroClaw is well-positioned to emerge as a leading open-source AI agent framework by late 2026.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*