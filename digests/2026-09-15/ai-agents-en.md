# OpenClaw Ecosystem Digest 2026-09-15

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-15 00:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest**  
**Date:** 2026-09-15  
**Source:** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)  

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with **500 issues and 500 PRs updated in the last 24 hours**, indicating sustained developer engagement and rapid iteration. Despite no new releases, the momentum suggests a critical phase of stabilization ahead of an upcoming version. The high volume of open issues—especially those marked P1/P0 and with security or crash implications—signals ongoing pressure on core stability, UX consistency, and release readiness. Community contributions are robust, with numerous PRs targeting performance, reliability, and cross-platform fixes.

---

### **2. Releases**  
**None.** No new releases have been published as of 2026-09-15. The latest stable version remains **2026.9.4**, with ongoing work focused on resolving post-release regressions (e.g., #145510, #145252). Users are advised to monitor the [release tracking issue #145252](https://github.com/openclaw/openclaw/issues/145252) for update reliability updates.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ [#148640](https://github.com/openclaw/openclaw/pull/148640): Fixed slow sidebar hover scrolling in web UI — improves readability.  
- ✅ [#148635](https://github.com/openclaw/openclaw/pull/148635): Prevents Gateway unresponsiveness after plugin retirement — critical for session integrity.  
- ✅ [#148655](https://github.com/openclaw/openclaw/pull/148655): Moved chat task progress to upper-right corner — enhances UX during writing.  
- ✅ [#148539](https://github.com/openclaw/openclaw/pull/148539): Refactored session transcript parent return — improves persistence logic.  
- ✅ [#148537](https://github.com/openclaw/openclaw/pull/148537): Preserves client attribution in unloaded replies — maintains context clarity.  
- ✅ [#148619](https://github.com/openclaw/openclaw/pull/148619): Fixes private continuation timeout recording — ensures correct status reporting.  

**Key Advances:**  
- Performance optimizations in fleet registry operations (#148290), SQLite worker usage, and cron task handling (#148478).  
- Critical fixes to CLI runner behavior (#148250) and tool schema normalization (#138439) to prevent stack overflow.  
- Security tightening via proxy alias fencing (#140609) and reduced metadata reads in logbook revisions (#148551).

---

### **4. Community Hot Topics**  
Top Issues by comment count and severity:  
| Issue | Summary | Comments | Severity | Link |
|------|--------|---------|----------|------|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | Internal agent text leaks into messaging channels | 40 | 🦞 Diamond Lobster (Security/UX) | [Issue #25592](https://github.com/openclaw/openclaw/issues/25592) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Zombie process leakage from hooks/tools | 30 | 🦪 Silver Shellfish (Stability) | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Synchronous persistence blocks event loop at scale | 20 | 🦞 Diamond Lobster (Performance) | [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP init timeout crashes Gateway via unhandled rejection | 16 | 🦞 Diamond Lobster (Crash) | [Issue #144911](https://github.com/openclaw/openclaw/issues/144911) |

**Underlying Needs:**  
- **Security & Privacy:** Leakage of internal processing output (#25592) and silent data loss (#125570) suggest urgent need for stricter message isolation and audit trails.  
- **System Stability:** Persistent process leaks (#97616) and crash loops (#123326, #144911) indicate deep-rooted resource management flaws requiring architectural review.  
- **Scalability:** Event loop blocking under load (#119720) reveals bottlenecks in async execution patterns.

---

### **5. Bugs & Stability**  
**Critical Bugs (P0/P1) Reported Today:**  
| Issue | Type | Impact | Fix PR? | Link |
|------|------|--------|--------|------|
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | Windows Update Handoff Failure | UX Release Blocker | ❌ | [Issue #146860](https://github.com/openclaw/openclaw/issues/146860) |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | Runtime Verification Failed During Update | UX Release Blocker | ❌ | [Issue #145510](https://github.com/openclaw/openclaw/issues/145510) |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP Init Timeout Crashes Gateway | Crash Loop | ❌ | [Issue #144911](https://github.com/openclaw/openclaw/issues/144911) |
| [#146004](https://github.com/openclaw/openclaw/issues/146004) | Subagent Completion Triggers Silent Heartbeat | Message Loss | ❌ | [Issue #146004](https://github.com/openclaw/openclaw/issues/146004) |
| [#145152](https://github.com/openclaw/openclaw/issues/145152) | Stuck Session Recovery Reports Abort Incorrectly | Session State Corruption | ❌ | [Issue #145152](https://github.com/openclaw/openclaw/issues/145152) |

**Regrettable Regressions:**  
- #88312 (Codex turn completion stall) and #144809 (Claude CLI reply loss) confirm recurring instability in core inference paths.  
- #135776 shows version skew issues persisting post-update — indicates fragile dependency resolution.

---

### **6. Feature Requests & Roadmap Signals**  
High-impact user requests shaping future development:  
- **Persistent Task Status Surface** ([#52640](https://github.com/openclaw/openclaw/issues/52640)): Long-running turns need visible progress — likely to be prioritized in next UI overhaul.  
- **Slash Command for Streaming Mode** ([#74077](https://github.com/openclaw/openclaw/issues/74077)): User demand for real-time control over streaming behavior signals UX maturity needs.  
- **Skill Graph – On-Demand Loading** ([#74100](https://github.com/openclaw/openclaw/issues/74100)): Reducing token overhead via lazy skill loading is a strong candidate for v2026.10.  
- **Multiple Bot Accounts (MS Teams)** ([#112811](https://github.com/openclaw/openclaw/issues/112811)): High priority for enterprise users; may be included in next major channel expansion.

---

### **7. User Feedback Summary**  
**Pain Points:**  
- **Silent Failures:** Users report lost messages (#125764), failed sends (#146004), and broken sessions without error feedback — erodes trust.  
- **Update Reliability:** Multiple reports of failed updates (#145510, #145252) and version skew (#135776) hinder adoption in production.  
- **Resource Hogging:** CPU spikes, zombie processes (#97616), and memory bloat (#125333) degrade performance on low-end systems.  
- **UX Friction:** Misleading indicators (e.g., heartbeat noise displacing real activity in sessions panel — [#51028](https://github.com/openclaw/openclaw/issues/51028)) reduce usability.

**Satisfaction Signals:**  
- Positive reception to recent UI refinements (e.g., [#148655](https://github.com/openclaw/openclaw/pull/148655), [#148640](https://github.com/openclaw/openclaw/pull/148640)).  
- Appreciation for proactive maintainership in fixing long-standing bugs like #76038 and #77443.

---

### **8. Backlog Watch**  
**High-Impact Issues Requiring Maintainer Attention:**  
- 🔴 **[#25592](https://github.com/openclaw/openclaw/issues/25592)**: Text between tool calls leaking to channels — security-critical, yet no fix PR exists.  
- 🔴 **[#119720](https://github.com/openclaw/openclaw/issues/119720)**: Synchronous persistence blocks event loop — scalability bottleneck, no fix PR.  
- 🔴 **[#125570](https://github.com/openclaw/openclaw/issues/125570)**: Skill Workshop silently overwrites live skill descriptions — routing breaks, no fix PR.  
- 🔴 **[#144809](https://github.com/openclaw/openclaw/issues/144809)**: Claude CLI loses entire reply after long turns — affects high-value workflows.  
- 🔴 **[#48788](https://github.com/openclaw/openclaw/issues/48788)**: Centralized filename encoding utility — needed for global compatibility, stalled due to product decision.

> ⚠️ **Note**: Several issues marked `clawsweeper:needs-maintainer-review` or `needs-product-decision` remain unresolved despite community effort — risk of stagnation.

---

**Summary:** OpenClaw is in a high-intensity stabilization phase. While innovation and contribution remain strong, critical stability and security issues are not being resolved fast enough. Immediate focus should be on **crash prevention**, **message integrity**, and **update reliability** before the next release. The backlog reflects a growing tension between feature ambition and system robustness.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-15**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem in Q3 2026 is characterized by rapid iteration, growing technical maturity, and increasing focus on **systemic reliability**, **security hardening**, and **enterprise readiness**. Projects are diverging in strategy: some (e.g., OpenClaw) prioritize feature velocity amid stability challenges, while others (e.g., ZeroClaw, Hermes Agent) are entering a stabilization phase with emphasis on governance, observability, and compliance. The landscape reflects a maturing community where user trust hinges less on novelty and more on **predictable performance**, **data integrity**, and **transparent error handling**.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Release Status | Health Score |
|--------|------------------|----------------|----------------|--------------|
| **OpenClaw** | 500 | 500 | None | 🔴 **High Risk / High Activity** |
| **Hermes Agent** | 50 | 50 | ✅ v0.21.3 (Patch) | 🟡 **Moderate–High Activity, Core Risk** |
| **IronClaw** | 1 | 1 | None | ✅ **Stable, Low Activity** |
| **QwenPaw** | 45 | 50 | None | 🟡 **High Activity, Elevated Risk** |
| **ZeroClaw** | 22 | 50 | None | 🟢 **Healthy & Active** |

> *Health scores reflect risk of instability, security exposure, and release readiness. OpenClaw and QwenPaw show high activity but critical unresolved bugs; ZeroClaw and Hermes Agent are stabilizing with strong engineering discipline.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most **feature-forward and contributor-driven** project in the ecosystem, with unmatched momentum in issue and PR volume. Its technical approach emphasizes **deep integration across UI, gateway, and tooling layers**, enabling rich agent orchestration but at the cost of systemic fragility. Compared to peers:
- **Community size**: Significantly larger than IronClaw or ZeroClaw; second only to QwenPaw in contribution volume.
- **Technical ambition**: Pushes boundaries in real-time UX (e.g., live progress indicators), session persistence, and plugin lifecycle management—features not yet matured in other projects.
- **Differentiator**: Aggressive innovation despite known regressions, positioning it as a **development ground for next-gen agent behavior** rather than production-ready deployment.

However, this comes with trade-offs: **crash loops**, **silent data loss**, and **update failures** remain unresolved at scale—indicating that its growth is outpacing maintainability.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, recurring technical needs reveal emerging industry priorities:

| Requirement | Projects Involved | Specific Needs |
|------------|-------------------|----------------|
| **Memory & Resource Management** | OpenClaw, QwenPaw, ZeroClaw | Unbounded stream buffers (#7722), OOM risks, zombie processes (#97616), keep-alive stacking |
| **Session Persistence & State Integrity** | OpenClaw, QwenPaw, Hermes Agent | Session loss after agent switch (#7745), state.db corruption (#100896), silent recovery aborts |
| **Security & Data Isolation** | OpenClaw, ZeroClaw, QwenPaw | Internal text leaks (#25592), malformed headers (#10863), authentication gaps in file previews |
| **Plugin & Tool Reliability** | OpenClaw, QwenPaw, ZeroClaw | Plugin catalog timeouts (#7730), model misrouting (`shell` vs `terminal`), silent failures |
| **Cross-Platform & CLI Stability** | OpenClaw, QwenPaw, Hermes Agent | Windows process leakage (#97616), CLI reply loss (#144809), missing delete key support |

These shared pain points signal a **collective need for robust runtime hygiene**, **predictable failure modes**, and **stronger contract enforcement** between components.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Feature Focus** | Real-time UX, multi-agent orchestration, visual feedback | Voice streaming, session repair, billing transparency | Benchmark diagnostics, failure taxonomy | Cross-platform consistency, plugin integrations | Security-first architecture, enterprise compliance |
| **Target Users** | Developers, power users, experimental deployments | Enterprise teams, hosted agents, developers | Research/eval teams, benchmarkers | Automation builders, workflow designers | Self-hosters, privacy-focused users |
| **Architecture** | Centralized gateway + fleet registry + client-side UI | Modular TUI + remote gateways + SQLite WAL | MCP-centric, diagnostic-heavy | Desktop-native + Docker + SDKs | Proxy-secured, config-driven, channel-agnostic |
| **Key Differentiator** | Most aggressive UX innovation | Strongest developer tooling and diagnostics | Deep observability and root-cause analysis | Rapid cross-platform iteration | Security-by-default design |

> *ZeroClaw and Hermes Agent are converging toward enterprise-grade reliability; OpenClaw and QwenPaw lead in experimentation; IronClaw serves niche evaluation needs.*

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Characteristics |
|------|--------|-----------------|
| **Rapid Iteration** | OpenClaw, QwenPaw | >50 issues/PRs daily; high churn, urgent bug fixes, active RFCs |
| **Stabilization Phase** | Hermes Agent, ZeroClaw | Patch releases issued; focus on core reliability, CI/CD improvements, governance |
| **Low Activity / Maintenance Mode** | IronClaw | Minimal contributions; focused on diagnostics refinement, not feature expansion |

> **Maturity Signal**: Projects like ZeroClaw and Hermes Agent are shifting from "build fast" to "run safely"—evidenced by RFCs on governance, security audits, and session repair tools. OpenClaw and QwenPaw remain in **high-growth mode**, but their instability threatens long-term adoption.

---

### **7. Trend Signals**  
Based on community feedback and project trajectories, the following industry trends are emerging:

1. **From Feature Velocity to System Resilience**  
   > Users increasingly demand **predictable uptime**, **session durability**, and **error visibility**—not just new capabilities. Silent failures and OOM crashes are now primary blockers (QwenPaw, OpenClaw).

2. **Security as a First-Class Concern**  
   > Projects are prioritizing **authentication layering**, **header validation**, **proxy routing**, and **input sanitization**—reflecting real-world deployment risks (ZeroClaw, OpenClaw, Hermes Agent).

3. **Enterprise-Grade Tooling Demand**  
   > Features like **per-session budgets**, **channel-specific skill routing**, **audit trails**, and **real-time voice contracts** are no longer niche—they’re table stakes for production use (QwenPaw, ZeroClaw, Hermes Agent).

4. **Governance & Process Maturation**  
   > RFCs on voting, review signals, and ownership clarity indicate a shift toward **collaborative engineering norms**—a sign of scaling projects beyond solo contributors.

5. **Observability Over Configuration**  
   > The rise of failure taxonomies (IronClaw), diagnostic PRs (ZeroClaw), and session repair tools (Hermes Agent) shows a move from “config-and-forget” to **self-diagnosing systems**.

---

### ✅ **Strategic Takeaway for Developers & Decision-Makers**  
- **For innovation labs**: OpenClaw and QwenPaw offer cutting-edge agent behavior but require significant operational overhead and risk mitigation.
- **For production systems**: ZeroClaw and Hermes Agent are better bets—prioritize security, stability, and auditability.
- **For research & evaluation**: IronClaw’s diagnostic depth provides unique value in failure analysis and model evaluation.
- **Future-proofing**: Invest in projects building **observability pipelines**, **resource quotas**, and **modular contracts**—these will define the next generation of trusted AI agents.

> **Bottom Line**: The ecosystem is moving beyond “can it do X?” to “can it run reliably, securely, and transparently at scale?” The winners will be those who balance innovation with system integrity.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-15**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 pull requests updated in the past 24 hours—indicating robust community engagement and ongoing development momentum. A stable patch release, `v0.21.3`, was issued on September 14, rolling up ~338 merged PRs since `v0.21.2`, primarily focused on stabilizing remote gateway sign-in flows and resolving session-state inconsistencies. The backlog is dense but well-tracked, with a strong focus on core stability (especially SQLite WAL corruption), security hardening, and cross-platform compatibility. High-priority bugs related to state database integrity and voice streaming are actively being addressed.

---

### **2. Releases**  
- **[v0.21.3 (v2026.9.14)](https://github.com/nousresearch/hermes-agent/releases/tag/v0.21.3)**  
  - **Type:** Patch release  
  - **Summary:** This release consolidates ~338 merged PRs since `v0.21.2` into a stable tag for downstream consumers (Docker images, Hermes Cloud, hosted deployments).  
  - **Key Fixes:** Resolves critical remote-gateway sign-in issues reported in prior versions. No breaking changes.  
  - **Migration Note:** Users on `v0.21.2` or earlier should update to `v0.21.3` to benefit from stability improvements and security fixes. No migration steps required.

---

### **3. Project Progress**  
Today saw **15 PRs merged/closed**, including:  
- ✅ **[PR #111337](https://github.com/nousresearch/hermes-agent/pull/111337):** Fixed managed `llama-server` startup on current `llama.cpp` builds by replacing deprecated `-dio` flag with `--load-mode dio`.  
- ✅ **[PR #111336](https://github.com/nousresearch/hermes-agent/pull/111336):** Slack adapter now respects the 4,000-character edit limit, preventing `msg_too_long` errors during message updates.  
- ✅ **[PR #111332](https://github.com/nousresearch/hermes-agent/pull/111332):** Preserves provider-reported actual costs in auxiliary and Codex usage paths—critical for billing accuracy.  
- ✅ **[PR #111331](https://github.com/nousresearch/hermes-agent/pull/111331):** Corrected tool-name mismatch between model output (`shell`) and registry (`terminal`), reducing silent failures.  
- ✅ **[PR #111330](https://github.com/nousresearch/hermes-agent/pull/111330):** Improved drag-and-drop UX: links now attach as `@url:` chips instead of failing silently.  
- ✅ **[PR #111329](https://github.com/nousresearch/hermes-agent/pull/111329):** Auto-formatted JavaScript via `npm run fix`, part of CI-driven cleanup automation.  

These merges reflect a strong emphasis on **UX polish, reliability, and cost transparency**.

---

### **4. Community Hot Topics**  
Top issues by comment count reveal key pain points:  

- **[Issue #77111](https://github.com/nousresearch/hermes-agent/issues/77111):** *RFC: RealtimeVoiceProvider ABC* (25 comments)  
  > **Need:** Unify four competing duplex voice implementations under a single ABC interface. The community is pushing for a standardized, extensible voice provider contract—critical for future real-time AI interaction.  
  > **Signal:** High demand for modular, plugin-friendly voice infrastructure. Likely to influence next major TUI/voice feature roadmap.

- **[Issue #100896](https://github.com/nousresearch/hermes-agent/issues/100896):** *state.db corruption x4 in 5 weeks (multi-writer WAL)* (13 comments)  
  > **Need:** Resolve persistent SQLite WAL corruption when multiple processes (gateway + dashboard) write simultaneously. This is a high-severity, recurring production issue affecting stability.  
  > **Signal:** Urgent need for better concurrency control and journaling safeguards in session storage.

- **[Issue #109966](https://github.com/nousresearch/hermes-agent/issues/109966):** *WAL generation handed off during fleet restart leaves long-lived holders blocked* (13 comments)  
  > **Need:** Prevent stale file locks from blocking new sessions after restarts. Reporter confirmed mitigation in latest commit—suggests this may be resolved soon.  
  > **Signal:** Infrastructure resilience under dynamic deployment conditions is a growing concern.

---

### **5. Bugs & Stability**  
High-severity bugs reported today:  

| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| [**#100896**](https://github.com/nousresearch/hermes-agent/issues/100896) | **P1** | Repeated `state.db` corruption in multi-writer WAL mode | ❌ No PR yet |
| [**#103339**](https://github.com/nousresearch/hermes-agent/issues/103339) | **P1** | `doctor --fix` corrupts live-WAL state.db due to fail-open guards | ✅ **[PR #103339](https://github.com/nousresearch/hermes-agent/pull/103339)** |
| [**#110769**](https://github.com/nousresearch/hermes-agent/issues/110769) | **P1** | Streaming hangs after upstream main update (5eb99eb2) | ❌ No fix yet |
| [**#111294**](https://github.com/nousresearch/hermes-agent/issues/111294) | **P2** | Desktop stuck on spinner after tool call (silent compression gap) | ❌ No fix yet |
| [**#109982**](https://github.com/nousresearch/hermes-agent/issues/109982) | **P2** | Wake word crashes entire gateway on Windows (access violation) | ❌ No fix yet |

> 🔥 **Critical Risk:** Multiple P1 bugs around **SQLite session state integrity** and **Windows compatibility** suggest instability in core persistence and platform support.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging themes in feature requests:  

- **Real-Time Voice & Session Contracts**  
  - [**#77111**](https://github.com/nousresearch/hermes-agent/issues/77111): RFC for `RealtimeVoiceProvider ABC` — signals intent to build a unified, extensible voice stack.  
  - [**#101034**](https://github.com/nousresearch/hermes-agent/pull/101034): Native `/voice` session lifecycle in TUI — likely to be prioritized post-ABC design.  

- **Enhanced Developer & Admin Tooling**  
  - [**#111324**](https://github.com/nousresearch/hermes-agent/pull/111324): `hermes cleanse` — auto-repair lint/formatting issues via VCS-aware checkers.  
  - [**#111272**](https://github.com/nousresearch/hermes-agent/issues/111272): Fix false "did not restart" warning after update — reflects need for cleaner upgrade feedback.

- **User Experience & UX Polishing**  
  - [**#48375**](https://github.com/nousresearch/hermes-agent/issues/48375): Spellcheck in prompt input (Hermes Desktop) — popular request (7 👍) indicating UX maturity expectations.

> 📌 **Prediction:** Next version (`v0.22.x`) will likely include **real-time voice support**, **enhanced session repair tools**, and **better error messaging**.

---

### **7. User Feedback Summary**  
Users report:  
- **Frustration with unrecoverable session states** (e.g., `state.db` corruption, stuck spinners).  
- **Confusion over inconsistent tool behavior** (e.g., `shell` vs `terminal`, `computer_use` approval prompts despite `approvals.mode: off`).  
- **Positive sentiment toward CLI improvements** like `hermes doctor` fixes and clearer warnings.  
- **Demand for stronger developer tooling** — particularly auto-fixing and project hygiene checks (`cleanse`, `lint`, `format`).  
- **Concern about security false positives** blocking legitimate skills (e.g., `skills_guard` rejecting documentation).

> 💬 *"I’ve lost 3 days debugging a corrupted state.db — I just want my agent to stay alive."* — User on #100896

---

### **8. Backlog Watch**  
Long-standing, high-impact issues needing maintainer attention:  

- **[Issue #77111](https://github.com/nousresearch/hermes-agent/issues/77111):** *RFC: RealtimeVoiceProvider ABC*  
  > 25 comments, 2 months old, critical for future voice features. Needs decision on ABC design.  
  > ⚠️ **Blocker:** Without resolution, voice integrations will remain fragmented.

- **[Issue #37036](https://github.com/nousresearch/hermes-agent/issues/37036):** *skills_guard false-positive: blocks mksglu/context-mode*  
  > 6 comments, 3+ months unresolved. Blocks community skill adoption.  
  > ✅ **Fix exists:** [PR #37040](https://github.com/nousresearch/hermes-agent/pull/37040) already submitted—needs review.

- **[Issue #91713](https://github.com/nousresearch/hermes-agent/issues/91713):** *Per-session token budget (abort/warn on breach)*  
  > 3 comments, 1 month old. Critical for cost control in large-scale deployments.  
  > ⚠️ **Urgent:** One user burned 18.7M tokens in 5 hours—this must be addressed.

> 📌 **Recommendation:** Prioritize triage and decisions on these three issues to maintain trust and scalability.

---  
**Project Health Score:** 🟡 **Moderate–High Activity, High Risk in Core Stability**  
**Next Steps:** Stabilize session storage, finalize voice provider contract, and merge pending security/tooling fixes.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-15**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable but low-activity state as of 2026-09-15, with no new releases and minimal recent contributions. Only one issue and one pull request were updated within the past 24 hours, indicating a lull in development momentum. The primary activity centers on diagnostics refinement—specifically around response leak detection in the MCP (Model Control Plane) layer—suggesting ongoing focus on system reliability and error visibility rather than feature expansion. Overall project health appears solid, though engagement from contributors and maintainers is subdued.

---

### **2. Releases**  
No new releases were published in the last 24 hours or during the current cycle. There are currently no release notes, breaking changes, or migration guides to report. The project continues to operate under its existing versioning scheme without recent updates to the public artifact.

---

### **3. Project Progress**  
*No PRs were merged or closed today.*  
However, **PR #8077** (*fix(mcp): classify response leak diagnostics*) remains open and has been actively updated since its creation on 2026-09-06. This PR aims to improve the clarity and safety of diagnostics for response leakage in the MCP egress path by centralizing the `response_leak_blocked` sentinel and ensuring that the host-level leak-blocking mechanism remains secure while providing distinct diagnostic signals visible to the MCP. While not yet merged, this work represents progress toward more robust error isolation and debugging capabilities.

---

### **4. Community Hot Topics**  
- **Issue #8100**: [Daily ironclaw failure taxonomy — 2026-09-14](https://github.com/nearai/ironclaw/issues/8100)  
  - *Status*: Open (created 2026-09-14)  
  - *Summary*: A post-mortem-style analysis of failures in the `officeqa` benchmark suite, identifying 43 non-passing tasks—almost entirely due to genuine model-quality issues (e.g., DeepSeek-V4-Flash navigation errors).  
  - *Analysis*: This issue highlights growing interest in failure classification and root-cause analysis at scale. It reflects a community need for systematic tracking of model performance degradation across benchmarks, particularly when failures stem from underlying model behavior rather than agent logic. The lack of comments suggests it may be used internally or as a reference point for future triage.

- **PR #8077**: [fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)  
  - *Status*: Open (last updated 2026-09-14)  
  - *Summary*: Addresses a critical edge case in MCP-host communication where response leaks could be masked or misclassified.  
  - *Analysis*: High relevance to system stability and observability. The fact that this PR has persisted for nearly a week with no comments indicates either complexity or a deliberate review process. It signals a deeper concern about diagnostic fidelity in production-grade AI agent deployments.

---

### **5. Bugs & Stability**  
- **Critical Issue**: None reported today.  
- **Stability Concerns**:  
  - **Issue #8100** identifies recurring model-level failures in the `officeqa` benchmark, which may indicate systemic instability in how certain models (e.g., DeepSeek-V4-Flash) handle complex task navigation. Though not a software bug per se, it reveals a pattern of "genuine model-quality errors" that could affect agent reliability in real-world use.  
  - No crash reports, regressions, or runtime errors have surfaced recently. The absence of high-severity alerts suggests strong runtime stability, but also potential blind spots in failure reporting.

---

### **6. Feature Requests & Roadmap Signals**  
- **Failure Taxonomy System**: Issue #8100 implicitly requests a structured failure categorization framework (e.g., “model quality”, “planning error”, “API misuse”) for benchmark runs. This signals a roadmap shift toward enhanced observability and analytics.  
- **Improved Diagnostics Visibility**: PR #8077 suggests demand for granular, actionable feedback in multi-agent systems—especially around security-sensitive operations like egress filtering.  
- *Predicted Inclusion in Next Version*: Enhanced failure classification engine, improved MCP diagnostic logging, and automated root-cause tagging for benchmark results are likely candidates for v0.6+.

---

### **7. User Feedback Summary**  
- Users are increasingly focused on **diagnosing model-level failures**, especially in benchmark environments like `officeqa`.  
- There is clear frustration with opaque error messages when agents fail—particularly when the cause lies in the model’s behavior rather than the agent’s code.  
- Positive sentiment is evident in the use of detailed benchmark dashboards (e.g., [nearai.github.io/benchmarks](https://nearai.github.io/benchmarks)), suggesting users value transparency and reproducibility.  
- Dissatisfaction is not explicitly voiced but implied through the need for deeper diagnostics—indicating a gap between available data and actionable insights.

---

### **8. Backlog Watch**  
- **Issue #8100**: [Daily ironclaw failure taxonomy — 2026-09-14](https://github.com/nearai/ironclaw/issues/8100)  
  - *Age*: 1 day  
  - *Priority*: High (impacts benchmark trust and model evaluation)  
  - *Note*: This issue is critical for long-term model comparison and agent improvement but remains unaddressed. Needs follow-up from maintainers to define taxonomy schema and integrate into CI/CD pipelines.

- **PR #8077**: [fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)  
  - *Age*: 9 days  
  - *Priority*: Medium-High (security and observability impact)  
  - *Note*: Despite being open for over a week, it has seen no comments or approvals. Requires active review to prevent drift and ensure timely deployment.

---

> ✅ **Overall Project Health**: Stable with low activity. Strong foundation in diagnostics and benchmarking, but delayed responsiveness to emerging needs. Prioritizing maintenance over innovation at present.  
> 🔗 *GitHub: [github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-15**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active with a strong influx of community contributions and issue reports, reflecting ongoing development momentum. Over the past 24 hours, 45 new issues were opened or updated (31 open, 14 closed), alongside 50 pull requests (39 open, 11 merged/closed), indicating robust developer engagement. No new releases were published, suggesting the team is focused on stabilizing v2.2.x before a formal update. The high volume of bug reports—particularly around memory exhaustion, session persistence, model configuration loss, and plugin reliability—signals that stability and user experience are top concerns in the current release cycle.

---

### **2. Releases**  
❌ **No new releases** were published in the last 24 hours.  
- The latest stable version remains **v2.2.1**, with **v2.2.1-beta.2** used by some users for testing.  
- No breaking changes or migration notes were announced.  
- Users are advised to avoid beta versions for production use until further validation.

> 🔗 [GitHub Releases](https://github.com/agentscope-ai/QwenPaw/releases)

---

### **3. Project Progress**  
✅ **11 Pull Requests merged or closed** today, primarily focused on:
- **UI/UX Improvements**:  
  - PR #7704: Moves chat files drawer to the right side (user-requested layout change).  
  - PR #7750: Makes `send_file_to_user` outputs visible in response artifact grid.
- **Bug Fixes**:  
  - PR #7729: Resolves Java MCP SDK `jsonRpcError` envelope handling (fixes #7728).  
  - PR #7763: Handles incomplete plugin catalog responses (fixes #7730).  
  - PR #7766: Adds authentication to native file preview requests.  
  - PR #7748: Corrects loop warning delivery and budget recovery logic.  
- **Tooling & Security**:  
  - PR #7769: Authenticates local API requests in desktop app (security hardening).  
  - PR #7751: Aligns Docker Python runtime with desktop (improves consistency).

These updates reflect a focus on **stability, security, and usability**, especially in cross-platform and plugin integration scenarios.

---

### **4. Community Hot Topics**  
🔥 **Top 3 Most Active Issues (by comment count)**:

| Issue | Summary | Link |
|------|--------|------|
| [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | Timer tasks frequently produce no output; results often hidden in `thinking` or dropped entirely. | [Issue #7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | `spawn subAgent` consistently fails with timeouts—even with extended timeouts. | [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) |
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | Severe memory exhaustion due to unbounded stream buffers, keep-alive stacking, and doom-loop evasion — cumulative effect leading to OOM. | [Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) |

💡 **Underlying Needs**:  
- Users report **critical workflow interruptions** due to silent failures and missing outputs.  
- There’s growing concern about **long-running agent stability**, especially in automation and sub-agent workflows.  
- Memory management appears to be a systemic pain point, not just isolated to one component.

---

### **5. Bugs & Stability**  
⚠️ **Critical Stability Issues Reported Today** (Ranked by Severity):

| Issue | Description | Status | Fix PR? |
|------|-------------|--------|--------|
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | Memory grows unbounded (~1MB/s), causing OOM after 2 days. Affects long-running backends. | Open | ❌ No fix yet |
| [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | Timer tasks silently fail — no output despite expected result. | Open | ❌ No fix yet |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | `spawn subAgent` fails universally with timeout errors. | Open | ❌ No fix yet |
| [#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) | Switching agents deletes last session (`lastChatIdByAgent`) → historical sessions become unclickable. | Open | ❌ No fix yet |
| [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | Model settings disappear mid-session, requiring re-selection. | Open | ❌ No fix yet |

📌 **Note**: While several related PRs exist (e.g., #7729, #7748), none address the core memory growth or session persistence issues. These remain high-risk, potentially affecting production deployments.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Feature Trends from User Feedback**:

| Request | Description | Potential Priority |
|-------|------------|-------------------|
| [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) | Move history panel to the **right side** of UI (for better UX on small screens). | High – already in PR (#7704) |
| [#7746](https://github.com/agentscope-ai/QwenPaw/issues/7746) | Restrict skills to specific **channels** (e.g., only run on Discord). | Medium – growing demand for granular access control |
| [#7749](https://github.com/agentscope-ai/QwenPaw/issues/7749) | Clarify **model fault-tolerance switching** config location. | Medium – indicates confusion in advanced features |
| [#7772](https://github.com/agentscope-ai/QwenPaw/issues/7772) | Support connecting to **newapi proxy** models (e.g., `new-api:v1.0.0-rc.26`). | High – reflects adoption of third-party inference stacks |

🔮 **Predicted Next Version (v2.3.0)**:  
Likely to include:  
- **Memory management overhaul** (auto-archive, vector index sync).  
- **Session persistence fixes** (including agent-switch behavior).  
- **Enhanced channel-based skill routing**.  
- **Improved error visibility** for network and plugin failures.

---

### **7. User Feedback Summary**  
💬 **Real User Pain Points (from Issues #7571, #7708, #7724, #7705)**:  
- **"I forget to set paths, and the agent keeps writing files everywhere."** – Confusion over workspace boundaries and persistent state.  
- **"I lose my model config and entire conversation without warning."** – Deep frustration with data integrity and session resilience.  
- **"It runs code in the wrong directory and overwrites my work."** – Fears of accidental data corruption due to unclear execution context.  
- **"I can’t see where to set the project folder — it’s not intuitive."** – Onboarding friction for non-technical users.

🎯 **Overall Sentiment**:  
Mixed. Enthusiasm for AI agent capabilities is tempered by **growing anxiety about reliability, data safety, and predictability**. Users feel they are “fighting the system” rather than being empowered.

---

### **8. Backlog Watch**  
🚨 **High-Impact Issues Waiting for Maintainer Attention**:

| Issue | Reason for Urgency | Link |
|------|--------------------|------|
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | Memory leak leads to OOM in production environments. Affects long-running agents. | [Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | `spawn subAgent` is broken — undermines core agent orchestration capability. | [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) |
| [#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) | Agent switching breaks session history — major UX regression. | [Issue #7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) |
| [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | Daily Paper plugin fails silently when arXiv is unreachable — hides real cause. | [Issue #7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) |

📌 **Recommendation**: Prioritize triage of these four issues in the next sprint. They represent **core functionality breakdowns** that directly impact user trust and adoption.

---

**📊 Project Health Snapshot (2026-09-15)**  
🟢 **Activity Level**: High (45 issues, 50 PRs)  
🟡 **Stability**: Moderate (critical memory/session bugs persist)  
🟢 **Community Engagement**: Strong (active contributors, clear feedback loops)  
🔴 **Risk Level**: Elevated (unresolved OOM, session loss, sub-agent failure)

> ✅ **Next Step**: Focus on **memory management**, **session durability**, and **plugin reliability** ahead of v2.3.0.  
> 🔗 [QwenPaw GitHub Repository](https://github.com/agentscope-ai/QwenPaw)

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-15  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active with strong momentum in both issue resolution and feature development. Over the past 24 hours, 22 issues were updated (11 open, 11 closed), and 50 pull requests (PRs) were touched — including 12 merged or closed — indicating robust engineering throughput. The focus is clearly on **security hardening**, **workflow stability**, and **API consistency**, especially around authentication, session management, and channel integration. No new releases have been issued, suggesting the team is prioritizing internal quality and stabilization ahead of a potential v0.8.5 release.

---

### **2. Releases**

❌ **No new releases** in the last 24 hours.  
The latest stable version remains unchanged. Given the high volume of security-related PRs and bug fixes (e.g., #10603, #10863), it is likely that a **v0.8.5 stabilization cut** is imminent, as tracked in [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459). No breaking changes are known to be introduced in current PRs, but users should monitor changelogs post-release for updates to `x-opencode-session` handling and image size limits.

---

### **3. Project Progress**

✅ **Merged/Closed PRs (Last 24h):**
- **[PR #10307](https://github.com/zeroclaw-labs/zeroclaw/pull/10307)**: Enforces one shared pairing-code policy with stronger defaults (now defaulting to longer codes); resolves inconsistency between config and implementation.
- **[PR #10589](https://github.com/zeroclaw-labs/zeroclaw/pull/10589)**: Raises default `multimodal.max_image_size_mb` from 5 to 20 MiB, aligning with API ceilings and improving usability for mobile images.
- **[PR #10748](https://github.com/zeroclaw-labs/zeroclaw/pull/10748)**: Ensures all outbound HTTP clients route through the runtime proxy — critical for enterprise compliance.
- **[PR #10747](https://github.com/zeroclaw-labs/zeroclaw/pull/10747)**: Refactors transcription manager logic across 8 channels; eliminates drift-induced bugs and improves maintainability.
- **[PR #10745](https://github.com/zeroclaw-labs/zeroclaw/pull/10745)**: Makes Docker sandbox image configurable via `sandbox.image`, fixing misleading documentation.

These PRs collectively strengthen **security posture**, **config consistency**, and **cross-channel reliability**.

---

### **4. Community Hot Topics**

🔥 **Top Issues by Engagement:**

- **[Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** – *RFC: Simplify RFC voting by removing mandatory discussion windows*  
  **Status:** Accepted, In Progress | **Comments:** 10 | **Needs:** Streamlining governance to reduce friction. This signals growing demand for faster decision-making in core processes.

- **[Issue #10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)** – *RFC: Clarify PR review evidence and author-action boundaries*  
  **Status:** Accepted, In Progress | **Comments:** 8 | **Needs:** Clearer signal of code ownership and reviewer intent — crucial for auditability and trust in large-scale contributions.

🔥 **Top PRs by Impact & Activity:**

- **[PR #10864](https://github.com/zeroclaw-labs/zeroclaw/pull/10864)** – *Fix OpenCode session header follow-ups (from #10603)*  
  Addresses a critical security regression where malformed headers suppressed affinity, risking account flagging. Immediate fix for a high-risk flow.

- **[PR #10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)** – *Coordinate agent lifecycle mutations*  
  A major architectural shift enabling unified config authority across daemon, gateway, and CLI — foundational for future extensibility.

🔍 **Underlying Needs:**  
The community is increasingly focused on **process maturity** (RFCs), **security rigor** (headers, proxies, auth), and **systemic reliability** (session state, image handling). These reflect a maturing project moving beyond MVP features toward production-grade stability.

---

### **5. Bugs & Stability**

🚨 **Critical Bugs (S1 - Workflow Blocked):**
- **[Bug #10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863)** – Telegram retries rejected voice updates indefinitely, blocking later messages.  
  **Impact:** Production incident reported. **Fix pending.**
- **[Bug #10858](https://github.com/zeroclaw-labs/zeroclaw/issues/10858)** – `DateTimeSection` invalidates cached prompt prefix at midnight, causing performance degradation.  
  **Impact:** Every open session suffers forced re-prompting daily. **Fix PR under review.**
- **[Bug #10857](https://github.com/zeroclaw-labs/zeroclaw/issues/10857)** – ZeroCode sends images to text-only models, leading to provider 400 errors.  
  **Impact:** Breaks multimodal workflows. **Fix PR exists (#10854).**

🟡 **High-Risk Bugs (S2/S3):**
- **[Bug #10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)** – New log sink regresses migration tests due to lock contention.  
  **Impact:** CI instability. **Fix PR merged.**
- **[Bug #10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842)** – Telegram reaction tool silently no-ops due to missing trait override.  
  **Impact:** UX broken for feedback mechanisms.

📌 **Stability Note:** While several S1 bugs exist, the team has responded rapidly with targeted fixes, indicating strong confidence in recovery and continuous integration practices.

---

### **6. Feature Requests & Roadmap Signals**

🚀 **Emerging Features (Likely in v0.8.5 or v0.9.0):**
- **Native XMPP / Prosody Channel** ([#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814)) – Requested by self-hosters; signals interest in lightweight, decentralized chat integration.
- **AnySearch as Built-in Web Search Provider** ([#10336](https://github.com/zeroclaw-labs/zeroclaw/issues/10336)) – Low-friction addition with clear use case; may be fast-tracked if testing proves stable.
- **Mattermost Approval Prompts** ([#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358)) – High-value integration for enterprise teams using Mattermost.

💡 **Predictions:**  
The next release will likely include:
- Security hardening (OpenCode headers, proxy routing)
- Image size default update
- Improved channel resilience (Telegram, Discord)
- Possibly native XMPP support if tested

---

### **7. User Feedback Summary**

💬 **Pain Points Reported:**
- **Voice Message Blocking** (Telegram): Users report being unable to receive messages after a failed voice update — a real workflow blocker.
- **Image Handling Confusion**: Users expect ZeroCode to validate model vision capability before sending images; current behavior leads to silent failures.
- **Delete Key Not Working** (CLI): Simple TUI UX issue — user input ignored — highlights need for polished terminal experience.
- **Session Header Misbehavior**: Developers report inconsistent session affinity with OpenCode, risking rate-limiting or account flags.

✅ **Positive Signals:**
- High engagement in RFCs and design discussions indicates **strong contributor trust** in governance.
- Multiple PRs addressing security and observability suggest **enterprise adoption trends**.
- Detailed error logging improvements (e.g., #10232) show attention to debugging clarity.

---

### **8. Backlog Watch**

⚠️ **Long-Unanswered Critical Items:**

- **[Issue #9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814)** – Native XMPP/Prosody channel: **Opened 2026-08-07**, still accepted, no assigned maintainer. High priority for home-lab/self-hosted users.
- **[Issue #9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)** – v0.8.5 stabilization tracker: **Intake frozen since Aug 4**, yet still active. Requires final sign-off and coordination for cut.
- **[PR #10351](https://github.com/zeroclaw-labs/zeroclaw/pull/10351)** – Enforce execution-tree iteration budgets: **High risk, needs maintainer review**. Could prevent runaway loops in complex agents.

🔔 **Action Needed:** Maintainers should prioritize triaging these items to avoid stagnation in the stabilization pipeline.

---

### ✅ **Overall Health Assessment:**

**🟢 Healthy & Active**  
ZeroClaw demonstrates strong technical discipline, rapid response to security issues, and growing community engagement. The project is clearly transitioning from feature velocity to **stability, security, and governance maturity**. With no new releases yet, the next 1–2 weeks are critical for finalizing v0.8.5. Contributors are aligned on core principles, and the backlog reflects meaningful, high-impact work.  

**Next Focus:** Finalize stabilization line, address S1 bugs, and accelerate roadmap integrations (XMPP, AnySearch, Mattermost).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*