# OpenClaw Ecosystem Digest 2026-09-20

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-20 00:21 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-20**

---

### **1. Today's Overview**  
OpenClaw shows intense community engagement with **500 issues and 500 pull requests updated in the last 24 hours**, indicating a high-pressure development cycle amid active user adoption. The release of **v2026.9.5** has triggered a surge in stability, upgrade, and migration-related bugs, suggesting growing pains during a major version transition. While core functionality remains robust, critical regressions—particularly around memory management, session state integrity, and update reliability—are emerging as systemic concerns. The project is clearly in a "post-release triage" phase, balancing feature delivery with urgent stability fixes.

---

### **2. Releases**  
**New Release: v2026.9.5**  
- **Release Notes**: [https://docs.openclaw.ai/release/v2026.9.5](https://docs.openclaw.ai/release/v2026.9.5)  
- **Platform Packages**:  
  - AppImage: [Download](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.AppImage)  
  - Debian: [Download](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.deb)  
- **Linux Companion Update**: `linux-stable` channel now includes v2026.9.5.  
- **Migration Note**: Users upgrading from 2026.9.4 are experiencing widespread upgrade failures (see #152759, #153230). No breaking changes documented in release notes, but real-world impact suggests implicit API or runtime shifts.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today)**:  
- **PR #153276** ([fix(state): reuse unmutated SQLite state snapshots in steady state](https://github.com/openclaw/openclaw/pull/153276)) – Directly addresses #153067, fixing excessive disk I/O from repeated DB reads (~5.9 TB/day).  
- **PR #153285** ([fix(workshop): clarify foreground repair authority](https://github.com/openclaw/openclaw/pull/153285)) – Resolves ambiguity in skill workshop contract.  
- **PR #153273** ([fix(macos): hide Inspect Element when debug is disabled](https://github.com/openclaw/openclaw/pull/153273)) – Improves UI hygiene on macOS.  
- **PR #153267** ([fix: repair restart, chat positioning, and CI cleanup races](https://github.com/openclaw/openclaw/pull/153267)) – Fixes race conditions affecting Gateway restarts and UI state.  

These merges indicate strong focus on **state consistency**, **update resilience**, and **UI stability** in response to recent critical feedback.

---

### **4. Community Hot Topics**  
Top Issues by comment count highlight **user frustration with upgrades and core stability**:

| Issue | Comments | Severity | Link |
|------|----------|----------|------|
| [#149361](https://github.com/openclaw/openclaw/issues/149361) | 50 | 🦞 Diamond Lobster (P1) | Umbrella for WebUI performance/stability |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 30 | 🦪 Silver Shellfish (P1) | Zombie process leak from hooks/tools |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 30 | 🦞 Diamond Lobster (P1) | MCP server init timeout crashes Gateway |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 27 | 🦪 Silver Shellfish (P1) | Memory leak (350MB → 15.5GB RSS) |
| [#152744](https://github.com/openclaw/openclaw/issues/152744) | 19 | 🦪 Silver Shellfish (P0) | Codex migration stuck in cold state |

**Analysis**: The top five issues all relate to **systemic stability under load**, **memory/resource exhaustion**, and **upgrade failure recovery**—indicating that users are encountering **unstable environments post-upgrade** and are unable to maintain reliable long-running sessions.

---

### **5. Bugs & Stability**  
Critical stability issues reported today:

| Bug | Severity | Affected Area | Fix PR? | Link |
|-----|----------|---------------|--------|------|
| **Update fails silently (`doctor-failed`) on macOS** | P0 / 🦪 Silver Shellfish | Upgrade path | ❌ No | [#152759](https://github.com/openclaw/openclaw/issues/152759) |
| **Codex catalog retry loop fills `os.tmpdir()`** | P0 / 🦪 Silver Shellfish | Plugin state | ❌ No | [#152689](https://github.com/openclaw/openclaw/issues/152689) |
| **Gateway startup hangs for ~17 min, times out** | P0 / 🦪 Silver Shellfish | Startup lifecycle | ❌ No | [#152981](https://github.com/openclaw/openclaw/issues/152981) |
| **Memory leak: RSS grows to 15.5GB over days** | P1 / 🦪 Silver Shellfish | Session state | ❌ No | [#91588](https://github.com/openclaw/openclaw/issues/91588) |
| **SQLite DB re-copied every 5 seconds (~5.9 TB/day)** | P2 / 🦞 Diamond Lobster | State persistence | ✅ Yes (#153276) | [#153067](https://github.com/openclaw/openclaw/issues/153067) |

> ⚠️ **Note**: Despite a fix for #153067, multiple other P0/P1 issues remain unresolved, suggesting a **stability bottleneck** in the 2026.9.x series.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven features gaining traction:

| Request | Priority | Link | Signal |
|--------|----------|------|--------|
| **Human-readable Telegram topic names** | P2 / 🐚 Platinum Hermit | [#7406](https://github.com/openclaw/openclaw/issues/7406) | UX friction in multi-topic channels |
| **Separate `llm_intercept_input/output` hooks** | P2 / 🦞 Diamond Lobster | [#115988](https://github.com/openclaw/openclaw/issues/115988) | Need for content filtering/redaction |
| **Improve upgrade experience with Node.js version change** | P0 / 🌊 Off-meta Tidepool | [#107930](https://github.com/openclaw/openclaw/issues/107930) | Critical pain point for devops users |
| **LaTeX rendering in Control UI markdown** | P2 / 🦐 Gold Shrimp | [#144324](https://github.com/openclaw/openclaw/pull/144324) | High demand for academic/scientific use |

> 🔮 **Prediction**: These will likely be prioritized in **v2026.10.0**, especially **Node.js upgrade UX** and **Telegram topic display**, given their recurring presence and impact.

---

### **7. User Feedback Summary**  
Real user pain points revealed through issue reports:

- **"I upgraded to 2026.9.5 and spent 8 hours recovering my environment."** – [#153257](https://github.com/openclaw/openclaw/issues/153257)  
- **"My gateway keeps crashing due to OOM after 2 days."** – [#91588](https://github.com/openclaw/openclaw/issues/91588)  
- **"The update fails silently and doesn’t report why."** – [#152759](https://github.com/openclaw/openclaw/issues/152759)  
- **"Sessions show empty lists after upgrade."** – [#152744](https://github.com/openclaw/openclaw/issues/152744)  

**Satisfaction**: Low. Users report **high frustration with upgrade reliability, memory leaks, and silent failures**. However, satisfaction is preserved for **core AI agent functionality** and **WebUI design**, which remain stable despite underlying infra issues.

---

### **8. Backlog Watch**  
High-impact, long-standing issues needing maintainer attention:

| Issue | Age | Status | Priority | Link |
|------|-----|--------|----------|------|
| **[#149361](https://github.com/openclaw/openclaw/issues/149361)** | 5 days old | Open | 🦞 Diamond Lobster | Umbrella for WebUI perf/stability |
| **[#114612](https://github.com/openclaw/openclaw/issues/114612)** | 2 months | Open | 🦞 Diamond Lobster | Unbounded SQLite growth (disk fill risk) |
| **[#152961](https://github.com/openclaw/openclaw/issues/152961)** | 1 day | Open | 🦐 Gold Shrimp | CPU spike in WorkerThread |
| **[#104992](https://github.com/openclaw/openclaw/issues/104992)** | 3 months | Open | 🦞 Diamond Lobster | Redacted data leaked into model context |
| **[#152632](https://github.com/openclaw/openclaw/issues/152632)** | 1 day | Closed | 🌊 Off-meta Tidepool | Docs backfill for past releases |

> 🔔 **Urgent**: Maintain a clear triage path for **#149361** and **#114612**, both of which threaten long-term system health. Also monitor **#152961**—a CPU hog could trigger cascading failures.

---

**Final Assessment**:  
OpenClaw is at a **critical inflection point**. The project is highly active and well-supported, but **v2026.9.5 has exposed deep infrastructure instability**. Immediate focus must shift to **upgrade reliability, memory management, and state consistency**. Without intervention, user trust may erode rapidly. Next steps should include a **patch release (v2026.9.6)** targeting the top 5 P0/P1 issues.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-20**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem is entering a phase of rapid maturation, marked by increasing technical complexity, cross-platform integration demands, and growing emphasis on stability, security, and production readiness. Projects are diverging in focus—some prioritizing core agent reliability (OpenClaw), others expanding into multi-channel orchestration (ZeroClaw), identity abstraction (IronClaw), or UX resilience (QwenPaw). Despite strong community engagement across most projects, systemic challenges around upgrade reliability, memory management, session persistence, and silent failures are emerging as common pain points, signaling that the ecosystem is transitioning from experimentation to real-world deployment.

---

### **2. Activity Comparison**

| Project | Issues (24h) | PRs (24h) | Release Status | Health Score |
|--------|--------------|-----------|----------------|---------------|
| **OpenClaw** | 500 | 500 | v2026.9.5 (patched) | ⚠️ Critical (stability bottleneck) |
| **Hermes Agent** | 50 | 50 | No new release (v0.21.3) | ✅ Healthy (active refinement) |
| **IronClaw** | 0 | 1 | No new release | ⚠️ Stable but stagnant |
| **QwenPaw** | 10 | 7 | No new release (v2.2.1) | ⚠️ Moderate–High Risk (UI fragility) |
| **ZeroClaw** | 32 | 50 | No new release (v0.8.6/v0.9.0 pending) | ⚠️ High Risk (S0/S1 bugs unpatched) |

> *Note: OpenClaw’s volume reflects post-release triage; ZeroClaw and Hermes show sustained development momentum despite no releases.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the **most active and largest-scale project**, with the highest volume of issues and PRs—indicating both massive user adoption and significant infrastructure strain. Its technical approach emphasizes **deep state consistency, robust update mechanics, and platform-wide compatibility**, particularly through its SQLite-based persistent state model and multi-OS packaging. Compared to peers, OpenClaw has a larger, more diverse contributor base and higher visibility, but this comes at the cost of increased instability in major version transitions. While QwenPaw focuses on UI resilience and ZeroClaw on channel parity, OpenClaw is uniquely positioned as a **full-stack agent framework**—making it a de facto reference implementation for enterprise-grade agent systems.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, several recurring technical themes emerge:

- **Session & State Persistence**:  
  - *OpenClaw* (#153067): Preventing redundant DB I/O.  
  - *Hermes Agent* (#97681, #53004): Cross-device continuity and folder → session flow integrity.  
  - *QwenPaw* (#7815): Console recovery after lazy load failure.  
  > *Need: Predictable, durable session state across reboots, devices, and upgrades.*

- **Upgrade & Update Reliability**:  
  - *OpenClaw* (#152759): Silent `doctor-failed` on macOS.  
  - *Hermes Agent* (#116497): Post-update cleanup failure.  
  - *QwenPaw* (no release cadence): Delayed stability fixes.  
  > *Need: Transparent, idempotent, rollback-capable update pipelines.*

- **Memory & Resource Management**:  
  - *OpenClaw* (#91588): 15.5GB RSS growth.  
  - *Hermes Agent* (#116446): LSP servers inherit Node heap → OOM risk.  
  - *ZeroClaw* (#10968): Unattended agents bypass approval → resource abuse.  
  > *Need: Memory leak detection, bounded resource allocation, and lifecycle hygiene.*

- **Security & Authorization Transparency**:  
  - *ZeroClaw* (#10968, #10966): ApprovalManager bypass, Git command hiding.  
  - *Hermes Agent* (#116467): Silent context ceiling loss.  
  - *IronClaw* (#7499): Host-mediated identity for processless agents.  
  > *Need: Explicit policy enforcement, audit trails, and delegation visibility.*

---

### **5. Differentiation Analysis**

| Project | Feature Focus | Target Users | Technical Architecture |
|-------|---------------|--------------|------------------------|
| **OpenClaw** | Full-stack agent platform, upgrade resilience, cross-platform | DevOps, power users, enterprise teams | SQLite-backed state, modular plugins, CLI + WebUI |
| **Hermes Agent** | Multi-device session continuity, desktop reliability | Remote workers, hybrid workflows | Config-driven, desktop-first, skill-based agents |
| **IronClaw** | Identity mediation, headless agent access | Developers, embedded systems, decentralized AI | Hosted Passport layer (`idcp`), minimal footprint |
| **QwenPaw** | UI/UX resilience, plugin safety, media handling | Creative professionals, experimental developers | React-heavy frontend, SDK app control plane |
| **ZeroClaw** | Multi-channel orchestration, real-time delivery | Social automation, customer-facing bots | WhatsApp/Telegram native integrations, webhook support |

> *Key Differentiator*: OpenClaw and ZeroClaw lead in **channel depth and runtime observability**, while IronClaw and QwenPaw focus on **security and usability barriers** respectively.

---

### **6. Community Momentum & Maturity**  

- **Rapid Iteration Tier (High Velocity)**:  
  - *OpenClaw*: 500 issues/PRs/day — high friction, high engagement.  
  - *ZeroClaw*: 50 PRs/day — architectural refinements in progress.  
  - *Hermes Agent*: Steady 50/50 — focused on polish and config integrity.

- **Stabilizing/Consolidation Tier**:  
  - *QwenPaw*: Active PRs on error boundaries and media handling — fixing foundational UX.  
  - *IronClaw*: One long-running PR (#7499) — low activity but high-value work in progress.

- **Maturity Signal**:  
  Projects like OpenClaw and ZeroClaw are demonstrating **production-readiness signals** (e.g., configurable caching, webhook support, identity layers), while QwenPaw and Hermes are refining **user experience and trust**—key indicators of ecosystem maturity.

---

### **7. Trend Signals**  
Based on community feedback and development patterns, the following industry trends are emerging:

1. **Agent Observability is Non-Negotiable**:  
   Users demand visibility into sub-agent progress (*ZeroClaw #10531*), execution logs (*Hermes #116499*), and delivery receipts (*ZeroClaw #10929*)—indicating a shift toward **debuggable, auditable agent systems**.

2. **Identity & Access Control Are Foundational**:  
   The rise of host-mediated identity (*IronClaw #7499*) and approval enforcement (*ZeroClaw #10968*) shows that **secure, policy-driven access** is now a core requirement—not an add-on.

3. **Frontend Resilience = User Trust**:  
   Persistent UI crashes (*QwenPaw #7815*, *OpenClaw #149361*) highlight that **frontend stability is critical for adoption**, even if backend logic is sound.

4. **Enterprise-Grade Requirements Are Rising**:  
   Demand for longer chat history (*QwenPaw #7884*), custom model injection (*Hermes #50715*), and OAuth integration (*QwenPaw #7879*) reveals that **organizational use cases** are driving feature priorities.

5. **Update Experience is a Key Differentiator**:  
   Silent failures during upgrades (*OpenClaw #152759*, *Hermes #116497*) suggest that **upgrade reliability will become a competitive differentiator** in the next wave of agent platforms.

---

> **Strategic Recommendation for Developers & Decision-Makers**:  
> Prioritize **observability, identity governance, and update resilience** in your agent stack. Projects that address these areas early—like OpenClaw (stability), IronClaw (identity), and ZeroClaw (observability)—are best positioned for long-term adoption. Watch for v2026.9.6 (OpenClaw) and v0.8.6/v0.9.0 (ZeroClaw) as potential turning points in ecosystem stability.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

---

### **Hermes Agent Project Digest — 2026-09-20**

---

#### **1. Today's Overview**  
The Hermes Agent project remains highly active with 50 issues and 50 pull requests updated in the last 24 hours, indicating strong community engagement and ongoing development momentum. Activity is concentrated around session management, messaging reliability, desktop stability, and configuration robustness—key pillars for a multi-device, multi-agent AI assistant. Despite no new releases, multiple critical bug fixes were merged or proposed, suggesting imminent patch-level updates. The project continues to evolve rapidly, balancing feature innovation with deep technical refinements.

---

#### **2. Releases**  
*No new releases published.*  
There are currently **no version updates** (v0.21.3 remains current). No breaking changes, migration notes, or release announcements have been issued in the past day.

---

#### **3. Project Progress**  
**Merged/Completed PRs (Today):**  
- ✅ **PR #116488**: Fixes `tools.tool_search.defer` missing from `DEFAULT_CONFIG`, resolving drift-mode config inconsistency ([#116488](https://github.com/nousresearch/hermes-agent/pull/116488)).  
- ✅ **PR #116499**: Adds validation at review-lane skill claim time and anchors crash-output extraction to correct run context ([#116499](https://github.com/nousresearch/hermes-agent/pull/116499)).  
- ✅ **PR #116496**: Addresses Windows process hang after window close via bounded finalization fallback ([#116496](https://github.com/nousresearch/hermes-agent/pull/116496)).  
- ✅ **PR #112679**: Sanitizes real-time installer logs by removing terminal control sequences ([#112679](https://github.com/nousresearch/hermes-agent/pull/112679)).  

These fixes improve **configuration integrity**, **desktop reliability on Windows**, and **install-time UX clarity**.

---

#### **4. Community Hot Topics**  
Top-tier engagement centers on **cross-device continuity**, **session resilience**, and **user experience polish**:

- 🔥 **Issue #97681** – *Bot Group Chats should keep working after Desktop closes*  
  [Link](https://github.com/nousresearch/hermes-agent/issues/97681) | **28 comments** | P2 | `area/sessions`  
  > Users demand persistent group chat state across devices without requiring the Desktop app to stay open—critical for workflow continuity.

- 🔥 **Issue #107307** – *Codex provider errors interrupt Hermes work*  
  [Link](https://github.com/nousresearch/hermes-agent/issues/107307) | **19 comments** | P2 | `provider/openai`  
  > Frequent failures post-light conservation window suggest instability in provider handling during low-usage intervals—urgent for Pro-tier users.

- 🔥 **Issue #53004** – *Projects paradigm broke folder → session flow*  
  [Link](https://github.com/nousresearch/hermes-agent/issues/53004) | **16 comments** | P2 | `comp/desktop`, `area/sessions`  
  > A regression from the "first-class projects" update has disrupted a core user workflow—high impact on productivity.

> 📌 **Underlying Need**: Users expect seamless, reliable, and intuitive cross-session/project state persistence—especially when switching devices or managing long-running agent teams.

---

#### **5. Bugs & Stability**  
Critical stability issues reported today include:

| Issue | Severity | Description | Fix PR? |
|------|----------|-------------|--------|
| [#116497](https://github.com/nousresearch/hermes-agent/issues/116497) | P2 | Post-update cleanup fails with `unexpected keyword argument scope_home` | ❌ |
| [#116416](https://github.com/nousresearch/hermes-agent/issues/116416) | P2 | Gateway status false-negative when running inside dashboard | ❌ |
| [#116467](https://github.com/nousresearch/hermes-agent/issues/116467) | P2 | Model changes silently discard context ceiling | ❌ |
| [#116458](https://github.com/nousresearch/hermes-agent/issues/116458) | P3 | Group chat member errors all show as “hit an error” (no distinction) | ❌ |
| [#116446](https://github.com/nousresearch/hermes-agent/issues/116446) | P3 | LSP servers inherit Node’s default heap, risking OOM of whole fleet | ❌ |

> ⚠️ **High Risk**: Multiple issues involve **session state corruption**, **resource exhaustion**, and **silent failure modes** that degrade trust in system reliability.

---

#### **6. Feature Requests & Roadmap Signals**  
Emerging trends in user requests point toward deeper customization and integration:

- 🛠 **Issue #33638** – *Project-scoped memory*  
  [Link](https://github.com/nousresearch/hermes-agent/issues/33638) | P3 | Filter MEMORY.md by project context  
  > Requested to avoid noise from unrelated agent memories—signals growing need for **contextual isolation**.

- 🛠 **Issue #50715** – *User-defined supplemental model list for /model picker*  
  [Link](https://github.com/nousresearch/hermes-agent/issues/50715) | P3 | Allow custom models not in public catalog  
  > Indicates desire for **extensible provider ecosystems** beyond official manifests.

- 🛠 **PR #116500** – *Install skill from GitHub folder URL*  
  [Link](https://github.com/nousresearch/hermes-agent/pull/116500) | P3 | Direct paste → install  
  > Already implemented; reflects user demand for **frictionless skill deployment**.

> 🎯 **Prediction**: Next version likely includes **project-scoped memory**, **custom model injection**, and **enhanced skill discovery**—prioritizing user autonomy and environment-specific tuning.

---

#### **7. User Feedback Summary**  
Real-world pain points reflect mature usage patterns:

- **Cross-device continuity** is a top priority: users want bots to persist in group chats even after closing Desktop.
- **Session state fragility** is a recurring theme: broken flows (e.g., folder → session), silent config loss, and stalled async completions erode confidence.
- **Error messages lack granularity**: users can’t distinguish between network timeouts, auth failures, and model crashes—leading to confusion and debugging overhead.
- **Desktop stability issues** persist on macOS (SIGSEGV on printing) and Windows (hangs, relaunch failures), affecting daily productivity.

> ✅ **Satisfaction signals**: Positive reception to recent improvements in plugin integration, model picker flexibility, and security hardening.

---

#### **8. Backlog Watch**  
Several high-impact, long-standing issues require maintainer attention:

- 🔴 **Issue #97681** – Bot group chats failing after Desktop exit (28 comments, 2 weeks old)  
  [Link](https://github.com/nousresearch/hermes-agent/issues/97681)  
  > Core use case for multi-agent collaboration—must be prioritized.

- 🔴 **Issue #53004** – Projects paradigm broke folder → session flow (16 comments, 3 months old)  
  [Link](https://github.com/nousresearch/hermes-agent/issues/53004)  
  > Regression from a major feature rollout—needs urgent fix to restore usability.

- 🔴 **Issue #116497** – Post-update traceback due to `scope_home` arg error (1 comment, 1 hour old)  
  [Link](https://github.com/nousresearch/hermes-agent/issues/116497)  
  > New issue introduced in latest update cycle—may indicate flawed cleanup logic.

> 📌 **Action Required**: These issues represent **critical gaps in user trust and workflow continuity**—should be triaged immediately.

---

*Generated: 2026-09-20 | Source: GitHub Analytics (nousresearch/hermes-agent)*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-20**

---

### **1. Today's Overview**  
The IronClaw project remains in a low-activity phase as of 2026-09-20, with no new issues or releases reported in the past 24 hours. One pull request is open and actively being developed, indicating ongoing feature work but limited community engagement. The absence of merged PRs or closed issues suggests a pause in immediate development momentum. Overall project health appears stable but stagnant, with minimal external contribution flow.

---

### **2. Releases**  
*No new releases have been published.*  
There are no release notes, breaking changes, or migration guides to report for this period. The last version remains current without updates.

---

### **3. Project Progress**  
*One active pull request* has advanced in the pipeline:  
- **PR #7499**: [`feat(identyclaw): host-mediated Passport for practitioners`](https://github.com/nearai/ironclaw/pull/7499)  
  - **Status**: Open (updated 2026-09-19)  
  - **Scope**: Documentation, dependencies, new feature implementation  
  - **Contributor**: `discernible-io` (new contributor)  
  - **Summary**: Implements a lightweight host interface (`builtin.idcp`) enabling processless IronClaw agents to interact with IdentyClaw Passport via policy grants and "AskAlways" exemptions—eliminating the need for shell access or installable extensions. Includes a practitioner host kit under `deploy/identyclaw/`, featuring a Node CLI and optional loopback helper on port `:3921`.  
  This represents a significant step toward frictionless identity integration for headless agents.

---

### **4. Community Hot Topics**  
*Only one open PR exists*, which is also the most prominent item in the community feed:  
- **PR #7499**: [host-mediated Passport for practitioners](https://github.com/nearai/ironclaw/pull/7499)  
  - **Engagement**: 0 reactions, 0 comments (as of update), though it was opened on 2026-08-11 and recently updated—indicating sustained developer interest.  
  - **Analysis**: The focus on *processless agent identity mediation* reveals a growing need for secure, lightweight identity management in serverless or embedded AI agent environments. The inclusion of a dedicated `practitioner host kit` signals a shift toward usability for non-developer adopters—suggesting that real-world deployment readiness is a rising priority.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions were reported in the last 24 hours.*  
No issue tickets reference runtime errors, memory leaks, or security vulnerabilities. The lack of stability-related activity reflects strong current codebase stability, though it may also indicate underreported edge cases due to low user interaction.

---

### **6. Feature Requests & Roadmap Signals**  
The dominant signal from the latest PR points to two emerging roadmap themes:  
- **Agent Identity Orchestration**: Enabling processless agents to authenticate securely via a host-managed identity layer (e.g., `idcp`).  
- **Practitioner-Focused Tooling**: Development of pre-packaged deployment kits (Node CLI + loopback helper) implies a move toward lowering the barrier to entry for non-technical users.  
These suggest that upcoming versions may prioritize *identity abstraction*, *deployment simplicity*, and *interoperability with external identity systems*—particularly relevant for decentralized AI agent ecosystems.

---

### **7. User Feedback Summary**  
While direct user feedback is absent in recent issues, the nature of PR #7499 offers indirect insight:  
- Users (especially practitioners) desire seamless, extension-free access to identity services.  
- There’s a clear demand for *lightweight, embeddable identity infrastructure* that doesn’t require complex setup or persistent processes.  
- The emphasis on a “loopback helper” on port `:3921` indicates a preference for local, testable, and debuggable workflows—critical for early-stage experimentation.

---

### **8. Backlog Watch**  
*No open issues exist at this time*, but several high-priority PRs remain unaddressed:  
- **PR #7499** is the only active item, and its long lifespan (opened Aug 11, updated Sep 19) suggests it may be awaiting review or design alignment.  
- No other issues are visible in the tracker, but given the project’s niche focus, this could reflect either excellent issue triage or potential under-reporting by users.  
- **Recommendation**: Maintain visibility for long-running PRs like #7499; consider adding labels such as `awaiting-review`, `design-discussion`, or `needs-maintainer-input` to improve transparency.

--- 

> ✅ **Project Health Score**: ⚠️ *Stable but stagnant* — Minimal activity suggests either deep focus on a single feature or reduced community involvement. High-value work in progress (PR #7499) demands attention to avoid stagnation.  
> 🔗 **Main Repository**: [github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-20**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active with a strong focus on stability, UI resilience, and plugin extensibility. Over the past 24 hours, 10 new issues and 7 open pull requests were created or updated—indicating sustained community engagement and rapid iteration. Notably, no releases were published, suggesting that current efforts are concentrated on fixing critical bugs and refining core functionality ahead of a potential v2.3 release. The surge in frontend-related errors (e.g., DOM mutation failures, audio handling) reflects ongoing challenges in React rendering robustness under dynamic state changes.

---

### **2. Releases**  
No new releases were published as of 2026-09-20. The latest stable version remains **v2.2.1**, which is currently experiencing several unresolved regressions related to media handling, session recovery, and plugin governance. No migration notes or breaking change announcements are applicable at this time.

---

### **3. Project Progress**  
Seven pull requests were opened today, signaling focused development on:
- **UI/UX Resilience**: PR #7889 (`fix(console): recover from transient DOM-mutation render errors`) addresses persistent error states after failed renders.
- **Media Handling Robustness**: PRs #7886, #7885, and #7887 (by `axelray-dev` and `lorenzozanee`) implement retry logic for `input_audio` rejections and unsupported file payloads—critical for audio and file-based workflows.
- **Plugin & App Architecture**: PR #7880 introduces *escalation-only tool policy hooks* for safer external plugin integration; PR #7874 redesigns the SDK/app control plane for durable task management and idempotency.

These PRs represent significant architectural and usability improvements, particularly around agent reliability and extensibility.

---

### **4. Community Hot Topics**  
Top community concerns center on **crash-prone UI behavior** and **inconsistent model support**:

- **Issue #7888** ([Chat page stuck on "Something went wrong"](https://github.com/agentscope-ai/QwenPaw/issues/7888)) — 2 comments, reported by user on Edge 153.0. Highly visible due to its impact on core chat functionality.  
- **Issue #7815** ([Console fails to recover from lazy chunk load failure](https://github.com/agentscope-ai/QwenPaw/issues/7815)) — 5 comments, now a recurring pain point affecting navigation flow.  
- **PR #7889** — Directly addresses #7888, showing immediate developer response.  
- **Issue #7883** ([PDF serialization issue with DeepSeek](https://github.com/agentscope-ai/QwenPaw/issues/7883)) — Highlights deep provider-specific compatibility gaps despite prior fixes.

These indicate a growing demand for **predictable fallback mechanisms** and **frontend error boundary resilience**, especially in complex, dynamically loaded components.

---

### **5. Bugs & Stability**  
Critical stability issues dominate today’s activity list, ranked by severity:

| Severity | Issue | Description | Fix PR? |
|---------|-------|-------------|--------|
| 🔴 High | [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) | Console freezes permanently after lazy load failure; no recovery without full reload | ❌ Pending |
| 🔴 High | [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888) | Chat UI stuck on "Something went wrong" due to React `commitPlacement` error | ✅ [PR #7889](https://github.com/agentscope-ai/QwenPaw/pull/7889) |
| 🔴 High | [#7886](https://github.com/agentscope-ai/QwenPaw/issues/7886), [#7887](https://github.com/agentscope-ai/QwenPaw/issues/7887) | Audio input rejected with “unknown variant” → conversation killed permanently | ✅ [PR #7886](https://github.com/agentscope-ai/QwenPaw/pull/7886), [PR #7887](https://github.com/agentscope-ai/QwenPaw/pull/7887) |
| 🟡 Medium | [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883) | PDFs serialized incorrectly for DeepSeek → 400 error | ✅ [PR #7885](https://github.com/agentscope-ai/QwenPaw/pull/7885) |
| 🟡 Medium | [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882) | OpenCode free models fail API calls despite UI marking them as free | ❌ Pending |

All high-severity issues have associated PRs except #7815, which remains a blocker for usability.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging signals suggest the next release will prioritize **plugin flexibility**, **long-term session persistence**, and **enterprise-grade security**:

- **Feature Request: Pre-tool-call policy hook** ([#7878](https://github.com/agentscope-ai/QwenPaw/issues/7878)) — A clear signal for **governance pipeline extensibility**, enabling org-specific checks via plugins.
- **User Demand: Longer chat history** ([#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)) — Highlights dissatisfaction with data retention limits; likely to be addressed in v2.3.
- **Architecture Work: App Control Plane Redesign** ([PR #7874](https://github.com/agentscope-ai/QwenPaw/pull/7874), [PR #7875](https://github.com/agentscope-ai/QwenPaw/pull/7875)) — Indicates roadmap shift toward **durable, auditable, and composable AI apps** (PawApps).

These features align with a move toward **production-ready agent systems** rather than experimental tools.

---

### **7. User Feedback Summary**  
Users are expressing frustration with:
- **Fragile UI state recovery** (e.g., chat crashes, console locks).
- **Misleading UI indicators** (e.g., free models marked as available but inaccessible).
- **Inadequate historical context** — users report losing access to past conversations, impacting workflow continuity.
- **Inconsistent model support** — even minor media format mismatches (like audio or PDFs) cause permanent breakdowns.

Despite these pains, there is strong engagement: users are filing detailed reports with logs, reproductions, and even AI-assisted documentation. This reflects **high user investment** and trust in the platform’s potential.

---

### **8. Backlog Watch**  
Several long-standing or high-impact issues remain unaddressed and require maintainer attention:

- **[#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)** — Critical UI freeze bug with no fix yet. Despite being reported earlier, it remains unresolved and affects all navigation.
- **[#7879](https://github.com/agentscope-ai/QwenPaw/issues/7879)** — OAuth failure when using static Bearer Key MCP servers (e.g., QCC). Currently blocks enterprise integrations.
- **[#7877](https://github.com/agentscope-ai/QwenPaw/issues/7877)** — Session-level work directory panel broken: limited visibility, empty “Recent Projects,” disabled “Apply” button. Impacts local file workflow.

These issues, while not currently trending, represent **major friction points** for power users and enterprise adoption. Prioritization should be considered for the upcoming v2.3 cycle.

---

> **Project Health Score**: ⚠️ **Moderate–High Risk**  
> *Strengths*: Active dev momentum, strong community reporting, solid PR quality.  
> *Risks*: Persistent UI crashes, lack of release cadence, delayed responses to critical UX issues.  
> *Recommendation*: Prioritize merging PRs addressing #7815, #7888, and #7879 to stabilize user experience before feature expansion.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-09-20**

---

### **1. Today's Overview**  
ZeroClaw remains highly active with a robust momentum in development, evidenced by **50 open pull requests** and **32 new issues** updated in the past 24 hours. The project is in a critical phase of architectural refinement and channel expansion, particularly around WhatsApp Web and Telegram. High-severity bugs (S0/S1) related to security, device linking, and agent execution persist, indicating ongoing stability challenges. Meanwhile, significant progress is being made on runtime observability, delegation visibility, and provider configuration—key enablers for production-grade AI agents.

---

### **2. Releases**  
❌ **No new releases** were published today. There are currently **no tagged versions or changelogs** available for v0.8.6 or v0.9.0, despite multiple tracker issues (e.g., [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)) signaling imminent milestones. This suggests the team is prioritizing feature completeness and stability over release cadence.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- **[PR #9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724)**: Fixed `always_ask` behavior surviving full autonomy — a critical security safeguard now properly enforced.  
- **[PR #10084](https://github.com/zeroclaw-labs/zeroclaw/pull/10084)**: Resolved WhatsApp Web device linking failure due to SHORTCAKE passkey gate — a long-standing S1 blocker now addressed.  
- **[PR #9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428)**: Enforced sender authorization for Bluesky and Reddit channels — enhancing security across social integrations.  

🔧 **Key advancements:**  
- **[PR #10724](https://github.com/zeroclaw-labs/zeroclaw/pull/10724)**: Added configurable `cache_ttl` for Anthropic prompt caching — enabling fine-grained control over cost and performance.  
- **[PR #10982](https://github.com/zeroclaw-labs/zeroclaw/pull/10982)**: Enabled inline image previews in WhatsApp Web via `jpegThumbnail` — resolving degraded UX for visual content delivery.  
- **[PR #10984](https://github.com/zeroclaw-labs/zeroclaw/pull/10984)**: Implemented native polls on WhatsApp Web — improving user interaction fidelity.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement:**  
- **[#8046](https://github.com/zeroclaw-labs/zeroclaw/issues/8046)**: *Optional Telegram webhook mode* — 5 comments, high priority. Users demand reduced latency and better scalability beyond long-polling.  
- **[#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)**: *Expose delegate sub-agent progress* — 4 comments, critical for debugging and monitoring complex agent workflows.  
- **[#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952)**: *Seam sanitizers rewrite reasoning inside tool envelope* — 2 comments, high risk. Affects Anthropic model replay accuracy and trustworthiness.  

🔍 **Underlying Needs:**  
- **Real-time feedback** from delegated agents and tool chains.  
- **Reduced latency** in message ingress (webhooks vs polling).  
- **Predictable, debuggable behavior** in multi-agent systems and model input sanitization.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs Reported (Severity S0–S2):**  
| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|-------|
| [#8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) | S1 | WhatsApp Web device linking broken by passkey gate | ✅ Yes ([PR #10084](https://github.com/zeroclaw-labs/zeroclaw/pull/10084)) |
| [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) | S0 | Unattended agents run without ApprovalManager → silent approval bypass | ❌ No |
| [#10966](https://github.com/zeroclaw-labs/zeroclaw/issues/10966) | S0 | Git `--attr-source` hides mutating commands from risk classifier | ❌ No |
| [#10972](https://github.com/zeroclaw-labs/zeroclaw/issues/10972) | S2 | Inbound WhatsApp images delivered as literal `[Image]` text | ❌ No |
| [#10973](https://github.com/zeroclaw-labs/zeroclaw/issues/10973) | S3 | Mentions broken inbound/outbound on WhatsApp Web | ❌ No |

📌 **Note:** Despite fixes for some S1/S0 bugs, several remain unresolved, raising concerns about production readiness for autonomous agents.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **High-Potential Features for Next Release (v0.8.6/v0.9.0):**  
- **Webhook support for Telegram** ([#8046](https://github.com/zeroclaw-labs/zeroclaw/issues/8046)) — likely to be prioritized given traffic patterns.  
- **Native WhatsApp poll support** ([#10983](https://github.com/zeroclaw-labs/zeroclaw/issues/10983)) — already partially implemented in PR.  
- **Agent-to-human question durability** ([#10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930)) — signals intent to formalize human-in-the-loop flows.  
- **Delivery receipts for outbound messages** ([#10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929)) — essential for audit trails and reliability.  
- **Jitter window for cron/heartbeat dispatch** ([#10969](https://github.com/zeroclaw-labs/zeroclaw/issues/10969)) — indicates scaling concerns in multi-agent environments.

💡 **Roadmap Clarity:** The project is clearly moving toward **decentralized, observable, and secure agent orchestration**, with strong focus on runtime integrity, channel parity, and developer experience.

---

### **7. User Feedback Summary**  
🗣️ **Pain Points Expressed:**  
- **"I can't see what my sub-agents are doing mid-run."** — [Issue #10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531) reflects frustration with opaque delegation.  
- **"My WhatsApp images just show an empty card."** — [Issue #10981](https://github.com/zeroclaw-labs/zeroclaw/issues/10981) highlights UX degradation affecting real-world use.  
- **"Git commands are slipping through the cracks."** — [Issue #9627](https://github.com/zeroclaw-labs/zeroclaw/issues/9627) and [#10966](https://github.com/zeroclaw-labs/zeroclaw/issues/10966) signal deep concern over security policy bypasses.  
- **"I don’t know if my messages even reached the user."** — [Issue #10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) reveals a lack of confidence in delivery assurance.

✅ **Satisfaction Indicators:**  
- Positive traction on **configurable cache TTL** ([#10724](https://github.com/zeroclaw-labs/zeroclaw/pull/10724)) shows users appreciate granular control.  
- Active community contributions (e.g., [PR #10984](https://github.com/zeroclaw-labs/zeroclaw/pull/10984)) suggest growing engagement and trust.

---

### **8. Backlog Watch**  
⏳ **Long-Standing Issues Needing Maintainer Attention:**  
- **[#8046](https://github.com/zeroclaw-labs/zeroclaw/issues/8046)**: Optional Telegram webhook mode — accepted, P2, but no assigned milestone. High impact, low visibility.  
- **[#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)**: Sub-agent progress exposure — accepted, P2, but no movement in 1 month. Critical for observability.  
- **[#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968)**: Unattended agents run without `ApprovalManager` — S0 risk, but still open. Indicates a systemic gap in non-interactive mode safety.  
- **[#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952)**: Reasoning sanitization breaks model replay — high risk, no fix yet. Impacts AI reliability.  

🔔 **Action Required:** These issues represent **critical gaps in security, observability, and usability** that could deter enterprise adoption if left unaddressed.

---

> ✅ **Final Assessment:** ZeroClaw is a rapidly evolving, ambitious AI agent platform with strong technical depth and community momentum. However, **stability and security hygiene remain uneven**, with several S0/S1 bugs unpatched. The next release must prioritize **runtime integrity, agent visibility, and delivery reliability** to solidify trust and enable broader deployment.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*