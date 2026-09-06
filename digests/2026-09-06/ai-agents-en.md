# OpenClaw Ecosystem Digest 2026-09-06

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-06 00:12 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-09-06**

---

### **1. Today's Overview**  
OpenClaw remains highly active with a robust momentum in development and community engagement: **500 issues and 500 pull requests updated in the last 24 hours**, indicating sustained contributor activity across bug fixes, feature enhancements, and infrastructure improvements. The project is clearly in a high-intensity phase of stabilization and performance refinement ahead of upcoming releases. A new release—**v2026.9.2**—has been issued, focusing on responsiveness and session stability. The ecosystem shows strong health, with significant PRs addressing core reliability concerns, while top-tier issues continue to highlight deep systemic challenges in session state, message integrity, and model interaction consistency.

---

### **2. Releases**  
**✅ v2026.9.2** – *Released 2026-09-05*  
[GitHub Release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.2)  

#### **Highlights**
- **Faster, more responsive chat:** Enhanced chat, dashboards, and session interactions by:
  - Moving direct dashboard lookups outside the Gateway event loop.
  - Reducing cold-load work during long transcript processing.
  - Enabling durable history reads independent of real-time event handling.
- Addresses critical latency and blocking issues in multi-agent workflows and long-running sessions.

> 📌 **Migration Note**: No breaking changes reported. Users should upgrade to benefit from improved UX stability and reduced UI lag under heavy load.

---

### **3. Project Progress**  
**✅ 220 Pull Requests merged or closed today**, reflecting rapid progress on stability and performance. Key advances include:

- **Performance & Responsiveness (PR #139532):** Optimized role-tree root detection in browser CDP snapshots, eliminating redundant storage overhead.
- **Memory & Session Efficiency (PR #139541):** Fixed batch rejection for Zhipu embedding models by splitting inputs within 64-item limits.
- **Session Sharing (PR #139489):** Introduced public read-only session sharing via a new “Share Publicly” option in the Control UI — a major step toward collaboration and transparency.
- **Tooling Stability (PR #139542, #139534):** Prevented stale `response.output_item.done.arguments` from overwriting streaming tool call arguments, fixing silent data corruption risks.
- **Security & Cleanup (PR #139517):** Ensured owned work is not released until cleanup evidence is confirmed, mitigating race conditions in supervised commands.

These fixes collectively improve system reliability, reduce resource contention, and enhance user experience in complex agent workflows.

---

### **4. Community Hot Topics**  
Top 10 most commented issues reveal intense focus on **session integrity, message loss, and model interaction bugs**:

| Issue | Comments | Severity | Summary |
|------|----------|----------|--------|
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | 14 | 🦞 Diamond Lobster | Umbrella issue: duplicate transcripts/replays across channels (MSTeams, Telegram, etc.) — impacts all agents |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) | 13 | 🦞 Diamond Lobster | Overflow retry completes successfully without final delivery → message loss |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | 12 | 🌊 Off-Meta Tidepool | Request for built-in headless Chromium for reliable JS-rendered web access |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) | 12 | 🦞 Diamond Lobster | `sessions_send` back-and-forth causes duplicate messages |
| [#96975](https://github.com/openclaw/openclaw/issues/96975) | 12 | 🌊 Off-Meta Tidepool | Subagent completion injects too much context into parent; needs isolation |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 10 | 🦞 Diamond Lobster | Synchronous persistence blocks Gateway event loop at scale |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | 10 | 🐚 Platinum Hermit | Intermittent "malformed JSON arguments" error post-v2026.8.1 |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | 9 | 🦪 Silver Shellfish | SSH spawns hang due to banner exchange failure (regression in 2026.8.1) |
| [#112259](https://github.com/openclaw/openclaw/issues/112259) | 9 | 🦪 Silver Shellfish | Visible inbound turns silently dropped with zero payload |
| [#132781](https://github.com/openclaw/openclaw/issues/132781) | 7 | 🌊 Off-Meta Tidepool | Use latest commentary as progress draft label when narration missing |

> 🔍 **Analysis**: The community is deeply concerned about **message fidelity, session state consistency, and inter-agent communication correctness**. Top issues are not isolated but represent systemic flaws in how OpenClaw handles message lifecycle, context injection, and cross-channel synchronization.

---

### **5. Bugs & Stability**  
Critical bugs impacting **message loss, session starvation, and crash loops** dominate today’s reports. Ranked by severity:

| Issue | Severity | Status | Fix PR? |
|------|----------|--------|--------|
| [#132762](https://github.com/openclaw/openclaw/issues/132762) | 🦞 Diamond Lobster | Open | ❌ |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | 🦞 Diamond Lobster | Open | ❌ |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 🦪 Silver Shellfish | Open | ❌ |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | 🐚 Platinum Hermit | Open | ❌ |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | 🦪 Silver Shellfish | Open | ❌ |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 🦞 Diamond Lobster | Open | ❌ |
| [#112259](https://github.com/openclaw/openclaw/issues/112259) | 🦪 Silver Shellfish | Open | ❌ |

> ⚠️ **Key Risks**: 
> - **Message loss** is recurring across multiple channels and flows.
> - **Zombie process leaks** (#97616) threaten long-term runtime stability.
> - **Regression in v2026.8.1 → 2026.9.1** indicates instability in recent updates.
> - **SSH hangs** and **malformed JSON** errors point to low-level integration fragility.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven innovation continues to shape the roadmap. High-potential features include:

- ✅ **Built-in Headless Browser** ([#53763](https://github.com/openclaw/openclaw/issues/53763)): Critical for reliable web access without external dependencies. Already marked P3, likely to be prioritized.
- ✅ **Public Read-Only Session Sharing** ([#139489](https://github.com/openclaw/openclaw/pull/139489)): Merged! Indicates growing demand for social collaboration and demo-sharing.
- ✅ **Intelligent Auto-Titling** ([#99583](https://github.com/openclaw/openclaw/issues/99583)): Proposes lazy, topic-aware session renaming — could become default UX.
- ✅ **Multi-index Embedding Memory** ([#63990](https://github.com/openclaw/openclaw/issues/63990)): For resilient model failover without vector space corruption — essential for production-grade systems.
- ✅ **MathJax/LaTeX Support** ([#42840](https://github.com/openclaw/openclaw/issues/42840)): Closed with 10 👍 — shows strong user demand for scientific communication.

> 📈 **Prediction**: Next version (v2026.9.3+) will likely include **public session sharing**, **auto-titling**, and **headless browser support**, based on merged PRs and user sentiment.

---

### **7. User Feedback Summary**  
Users report consistent pain points around **reliability and predictability**:

- **“My messages disappear after 15+ turns.”** – Multiple users confirm silent parameter drops in `write/exec` tools after long conversations ([#53408](https://github.com/openclaw/openclaw/issues/53408)).
- **“The bot becomes unresponsive for 10+ minutes.”** – Memory compaction (`memoryFlush`) blocking main lane ([#53008](https://github.com/openclaw/openclaw/issues/53008)).
- **“I get two replies from one message.”** – Duplicate responses in Feishu and other channels ([#49381](https://github.com/openclaw/openclaw/issues/49381)).
- **“The TUI scrolls me out of view every time I send a message.”** – Disruptive auto-scroll behavior ([#44130](https://github.com/openclaw/openclaw/issues/44130)).
- **“It breaks after an upgrade.”** – Several users report unrecoverable states post-upgrade requiring Time Machine restore ([#85027](https://github.com/openclaw/openclaw/issues/85027)).

> 💬 **Sentiment**: High frustration with **systemic instability**, despite strong enthusiasm for AI capabilities. Users want **predictable, reliable behavior** before advanced features.

---

### **8. Backlog Watch**  
Critical issues still awaiting maintainer review or resolution:

| Issue | Priority | Status | Notes |
|------|----------|--------|------|
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | P1 | Open | Umbrella issue — duplicate replay across channels; needs product decision |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) | P1 | Open | Overflow retry ends success without delivery — high-risk message loss |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | P1 | Open | Synchronous persistence blocks Gateway — scalability killer |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | P1 | Open | Malformed JSON after v2026.8.1 — regression affecting Claude providers |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | P1 | Open | SSH hangs — regression in 2026.8.1 |
| [#132781](https://github.com/openclaw/openclaw/issues/132781) | P3 | Open | Progress draft labeling — simple UX win, blocked on product decision |

> 🛠️ **Call to Action**: Maintainers must prioritize **P1 issues related to message loss and session state corruption**, especially those tied to recent regressions. These are the biggest barriers to adoption beyond early adopters.

---

**📌 Final Assessment**: OpenClaw is **technically vibrant and rapidly evolving**, but **stability and reliability remain critical bottlenecks**. The project is poised for growth if core UX and system integrity issues are addressed swiftly. With 500+ daily contributions, it’s clear that OpenClaw has strong community momentum — now it must deliver on its promise of a trustworthy, scalable AI assistant platform.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Assistant Open-Source Ecosystem – 2026-09-06**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem is entering a pivotal phase of maturation, marked by intense technical refinement, growing community engagement, and strategic divergence in architectural direction. Projects are transitioning from rapid feature iteration toward stability, reliability, and production readiness—particularly around session integrity, model compatibility, and cross-channel consistency. While innovation remains robust, user feedback consistently highlights systemic pain points in message fidelity, error visibility, and workflow predictability. This indicates a shift from "what can we build?" to "how reliably can it work?"

---

### **2. Activity Comparison**

| Project         | Issues (24h) | PRs (24h) | Release Status       | Health Score | Notes |
|------------------|--------------|-----------|------------------------|--------------|-------|
| **OpenClaw**     | 500          | 500       | ✅ v2026.9.2 (hotfix)   | ⭐⭐⭐⭐☆      | Highest activity; core stability focus |
| **Hermes Agent** | 50           | 50        | ❌ No new release        | ⭐⭐⭐☆☆      | High activity, delayed release |
| **IronClaw**     | 3            | 5         | ❌ No new release        | ⭐⭐⭐☆☆      | Steady, low-volume stabilization |
| **QwenPaw**      | 10           | 4         | ❌ No new release        | ⭐⭐⭐⭐☆      | Feature-driven, pre-Hub rollout |
| **ZeroClaw**     | 42           | 50        | ✅ v0.8.5 (security-focused)| ⭐⭐⭐⭐☆ | High contributor volume, RFC-heavy |

> 🔍 *Insight*: OpenClaw leads in velocity and scale; ZeroClaw matches it in contributor depth. Others are either stabilizing (IronClaw), preparing for major releases (QwenPaw), or delaying due to unresolved P0 bugs (Hermes Agent).

---

### **3. OpenClaw's Position**  
OpenClaw stands as the most technically mature and operationally active project in the ecosystem, with **500+ daily contributions** signaling deep community investment. Its advantage lies in **systemic performance optimization**, demonstrated by recent fixes to event-loop blocking, memory efficiency, and session state management. Unlike peers focused on niche UX or tooling, OpenClaw prioritizes **end-to-end reliability**, especially under load—evidenced by its v2026.9.2 release targeting chat responsiveness and long-session stability.

Compared to Hermes Agent (Python/GIL-bound), IronClaw (Telegram-specific), QwenPaw (multi-user Hub transition), and ZeroClaw (architectural RFCs), OpenClaw’s approach is more **general-purpose and infrastructure-first**, emphasizing scalability across channels and agents. Its community size appears larger than peers based on issue/PR volume and engagement depth—indicating stronger momentum and broader adoption potential.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, recurring technical demands reveal emerging industry-wide challenges:

| Need | Projects Affected | Specific Requirements |
|------|-------------------|------------------------|
| **Message Fidelity & Session Integrity** | OpenClaw, Hermes Agent, ZeroClaw | Prevent duplicate messages, silent drops, replay corruption, and context injection leaks |
| **Model Compatibility & Context Handling** | OpenClaw, QwenPaw, Hermes Agent | Fix hardcoded context limits, handle model-specific constraints (e.g., GPT-3.5-turbo), avoid fallback failures |
| **Error Visibility & Debugging** | QwenPaw, Hermes Agent, ZeroClaw | Avoid swallowed exceptions (`except Exception`), expose full stack traces, improve logging |
| **Security Boundary Enforcement** | ZeroClaw, OpenClaw, QwenPaw | Prevent sandbox escapes (macOS Seatbelt), secure credential handling, enforce policy validation |
| **Cross-Channel Consistency** | OpenClaw, ZeroClaw | Ensure unified behavior across Telegram, Feishu, Matrix, MSTeams — avoid channel-specific drift |

> 📌 *Pattern*: The ecosystem is converging on **core reliability requirements**—not just features—driven by real-world usage at scale.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Target User** | Enterprise & power users | Dev teams, automation engineers | Teams using Telegram | Teams & organizations | Operators, security-conscious deployers |
| **Feature Focus** | Performance, stability, multi-agent workflows | Tooling, cron scheduling, desktop UX | Onboarding, identity routing | Multi-tenant hub, skill governance | Security, runtime ownership, extensibility |
| **Architecture** | Gateway-centric, event-loop optimized | Python-based, GIL-dependent | Telegram-native, identity-first | Skill-driven, modular pipeline | Plugin-composable, WASM-enabled |
| **Deployment Model** | Self-hosted, scalable | Desktop + cloud | Telegram bot integration | Web UI + CLI, Hub-ready | Operator-managed, zero-trust design |

> 💡 *Key Insight*: OpenClaw and ZeroClaw represent the **two poles of maturity**: one focused on **performance at scale**, the other on **security-by-design**. The others are evolving toward specific niches—QwenPaw into team orchestration, Hermes Agent into automation, IronClaw into messaging platform integration.

---

### **6. Community Momentum & Maturity**

| Tier | Project(s) | Characteristics |
|------|------------|----------------|
| **High Velocity / Rapid Iteration** | OpenClaw, ZeroClaw | >500 PRs/issues/day; active RFCs, frequent releases, large contributor base |
| **Stabilization Phase** | QwenPaw, Hermes Agent | Pre-release focus; no new versions despite high PR volume; bug backlog growing |
| **Incremental Polish** | IronClaw | Low noise, small fixes, steady but quiet progress; UX refinements dominate |

> ⚠️ *Warning*: Hermes Agent and QwenPaw risk **release delays** due to unresolved P0/P1 bugs and lack of versioning, despite strong community interest. OpenClaw and ZeroClaw are leading in **delivery cadence**.

---

### **7. Trend Signals**  
From community feedback and PR activity, three key trends emerge for AI agent developers:

1. **Reliability > Features**: Users are demanding predictable behavior over flashy capabilities. Silent message loss, broken tools, and unexplained freezes are now top blockers—even when models are powerful.
   
2. **Observability is Non-Negotiable**: Suppressed exceptions (QwenPaw), missing logs (Hermes Agent), and generic errors (IronClaw) are eroding trust. Developers expect full debug visibility and structured error reporting.

3. **Multi-Agent System Complexity Demands Infrastructure**: Projects like OpenClaw and ZeroClaw are investing heavily in **session ownership models**, **append-only event histories**, and **secure routing**—indicating that future agent platforms must be built with **auditability, reproducibility, and isolation** as first-class concerns.

> 📈 **Developer Value**: The next generation of successful AI agent platforms will be defined not by model choice, but by **systemic resilience, traceability, and operational clarity**—not just intelligence.

---

✅ **Final Takeaway**: The ecosystem is moving beyond “can it think?” to “can it be trusted?” OpenClaw leads in execution, ZeroClaw in vision, and QwenPaw in ambition—but all must prioritize **stability and observability** to achieve mainstream adoption. For developers, the path forward is clear: build systems that fail gracefully, log transparently, and behave consistently.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-06**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 pull requests updated in the past 24 hours—indicating robust community engagement and ongoing development momentum. No new releases were published, suggesting a focus on stabilization and feature refinement ahead of a potential upcoming version. The core activity centers on critical path stability (cron, session state, message delivery), desktop UX improvements, and tooling reliability. A significant number of high-severity bugs (P1/P0) related to session persistence, job scheduling, and model compatibility have emerged, signaling that release readiness may be under pressure.

---

### **2. Releases**  
❌ **No new releases** detected in the last 24 hours.  
There are no release notes or changelogs available for 2026-09-06. This absence suggests either a planned delay or that the team is prioritizing internal fixes over public versioning.

---

### **3. Project Progress**  
✅ **Merged PRs (Today):**  
- [#86031](https://github.com/NousResearch/hermes-agent/pull/86031): Fixes silent shadowing of MCP servers by built-in toolsets — restores visibility of colliding MCP tools.  
- [#37887](https://github.com/NousResearch/hermes-agent/pull/37887): Resolves alias resolution failure when merging registry tools into static toolsets.  
- [#31788](https://github.com/NousResearch/hermes-agent/pull/31788): Adds warnings when MCP server names collide with built-in toolsets — improves developer feedback.  
- [#19793](https://github.com/NousResearch/hermes-agent/pull/19793): Cherrypicked fix for MCP tool invisibility due to name collisions (salvaged from prior work).  
- [#103943](https://github.com/NousResearch/hermes-agent/pull/103943): Finalizes the fix for MCP server name collision issue, ensuring tools remain accessible.

These merged PRs represent **critical tooling stability improvements**, particularly around MCP integration and naming conflicts. They resolve long-standing usability issues that could silently break agent functionality.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement:**

| Issue | Summary | Comments | Severity | Link |
|------|--------|---------|----------|------|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | Automated Nous-to-Enterkey merge blocked by `cron/jobs.py` conflicts | 68 | P3 (comp/cron) | [Link](https://github.com/NousResearch/hermes-agent/issues/88584) |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Bot Group Chats should persist after Desktop closes | 23 | P2 (comp/gateway, area/sessions) | [Link](https://github.com/NousResearch/hermes-agent/issues/97681) |
| [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) | Web server event loop stalls up to 51s under heavy load (GIL pressure) | 9 | P1 (comp/tui, comp/desktop) | [Link](https://github.com/NousResearch/hermes-agent/issues/58576) |

💡 **Analysis:**  
- **Automated integration blocking** (#88584) reflects growing pains in cross-project CI/CD pipelines. The conflict in `cron/jobs.py` indicates coordination challenges between major forks (Nouso vs Enterkey).  
- **Persistent bot group chats** (#97681) is a top-tier UX demand — users want bots to survive desktop restarts, suggesting a strong need for decentralized, gateway-owned state management.  
- **UI freezing under load** (#58576) highlights a fundamental performance bottleneck tied to Python’s GIL and synchronous I/O in the web server — a systemic risk for real-time agent use.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs Reported (P0–P1):**

| Bug | Description | Severity | Fix PR? | Link |
|-----|-------------|----------|--------|------|
| [#103901](https://github.com/NousResearch/hermes-agent/issues/100401) | Cron fire-claim heartbeat deadlocks on its own run, killing jobs >60s | P1 | ❌ | [Link](https://github.com/NousResearch/hermes-agent/issues/100401) |
| [#103904](https://github.com/NousResearch/hermes-agent/issues/103904) | Recurring cron jobs drift to UTC after run, firing 2h late (e.g., Europe/Warsaw) | P2 | ❌ | [Link](https://github.com/NousResearch/hermes-agent/issues/103904) |
| [#103946](https://github.com/NousResearch/hermes-agent/issues/103946) | 32K-model startup fails despite 64K context support due to hard-coded 64K minimum | P2 | ❌ | [Link](https://github.com/NousResearch/hermes-agent/issues/103946) |
| [#103579](https://github.com/NousResearch/hermes-agent/issues/103579) | Background review fork drops external memory-provider tools → cache parity broken | P0 (caching risk) | ❌ | [Link](https://github.com/NousResearch/hermes-agent/issues/103579) |
| [#96925](https://github.com/NousResearch/hermes-agent/issues/96925) | GitHub Copilot duplicates tool calls post-v0.20.6 update | P1 | ❌ | [Link](https://github.com/NousResearch/hermes-agent/issues/96925) |

⚠️ **Stability Risk Summary:**  
Multiple **critical path failures** exist in cron scheduling, session state handling, and model compatibility. These affect production workflows and could prevent reliable automation. Notably, **no PRs yet address these high-severity bugs**, indicating potential delays in patching.

---

### **6. Feature Requests & Roadmap Signals**  
📌 **Emerging High-Priority Features:**

| Request | Description | Priority | Link |
|-------|-------------|----------|------|
| [#103917](https://github.com/NousResearch/hermes-agent/issues/103917) | Simplified structured-output contract for `delegate_task` (avoid inline JSON Schema) | P3 | [Link](https://github.com/NousResearch/hermes-agent/issues/103917) |
| [#58799](https://github.com/NousResearch/hermes-agent/issues/58799) | Standalone Desktop installer (lite client without bundled agent) | P2 | [Link](https://github.com/NousResearch/hermes-agent/issues/58799) |
| [#103940](https://github.com/NousResearch/hermes-agent/issues/103940) | Global hotkey to summon HUD chat from anywhere (like ChatGPT Quick Chat) | P3 | [Link](https://github.com/NousResearch/hermes-agent/issues/103940) |
| [#103942](https://github.com/NousResearch/hermes-agent/pull/103942) | Implements global HUD summon shortcut (`Cmd/Ctrl+Shift+U`) | P3 | [PR Link](https://github.com/NousResearch/hermes-agent/pull/103942) |

🚀 **Roadmap Prediction:**  
The **next release (likely v0.22.0)** will likely include:
- **Desktop UX enhancements**: Global HUD shortcuts, file path linking, and tray minimization.
- **Tooling simplification**: Structured output contracts for delegation.
- **Lightweight installer** as a separate package or optional build variant.

---

### **7. User Feedback Summary**  
👥 **User Pain Points Identified:**
- **Desktop instability**: UI freezes during heavy agent sessions (GIL pressure), making it unusable for prolonged tasks.
- **Invisible state issues**: Sticky "Stop" holds in bot chats go silent and invisible — users lose control.
- **Model compatibility gaps**: Users report 32K models failing to start despite adequate context window support.
- **Cron misbehavior**: Jobs scheduled from Desktop fail to deliver results back to chat; timezone drift causes timing errors.
- **Tooling confusion**: MCP servers with conflicting names vanish silently — no warnings, no recovery path.

✅ **Positive Signals:**  
- High engagement on UX-focused features (HUD, global hotkeys, file links).
- Users appreciate proactive fixes (e.g., #86031) and are vocal about missing warnings.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered Critical Issues Needing Attention:**

| Issue | Age | Status | Reason for Delay | Link |
|------|-----|--------|------------------|------|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | 20 days old | Open | Cross-repo merge conflict; requires coordination between Nous and Enterkey teams | [Link](https://github.com/NousResearch/hermes-agent/issues/88584) |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 10 days old | Open | Complex integration across gateway, desktop, and session layers; needs design consensus | [Link](https://github.com/NousResearch/hermes-agent/issues/97681) |
| [#103904](https://github.com/NousResearch/hermes-agent/issues/103904) | 5 days old | Open | Timezone logic bug affecting recurring jobs — urgent for production users | [Link](https://github.com/NousResearch/hermes-agent/issues/103904) |
| [#103579](https://github.com/NousResearch/hermes-agent/issues/103579) | 1 day old | Open | P0-level cache inconsistency in background review — risks data loss | [Link](https://github.com/NousResearch/hermes-agent/issues/103579) |

📌 **Recommendation:**  
Maintainers should prioritize **timezone-aware cron scheduling**, **session state persistence**, and **tooling visibility** in the next sprint. The backlog contains several P0/P1 items that are actively blocking user workflows.

---

**Final Assessment:**  
Hermes Agent is in a **high-activity, high-risk phase**. While innovation and UX improvements are accelerating, **stability and reliability concerns are mounting**. The lack of recent releases despite intense PR/issue volume suggests a potential release delay. Immediate attention to **cron job correctness, session continuity, and model compatibility** is critical to maintain user trust.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

---

### **1. Today's Overview**  
As of 2026-09-06, IronClaw maintains steady development momentum with active engagement in bug fixes and feature enhancements. The project saw moderate activity over the past 24 hours: 3 new issues (1 open, 2 closed), and 5 pull requests (3 open, 2 merged). There were no new releases, indicating a focus on stabilization and incremental improvements rather than versioned deployments. Recent PRs highlight progress in core agent infrastructure (e.g., sandbox defaults) and user experience refinements for Telegram integrations.

---

### **2. Releases**  
*No new releases detected.*  
There are no recent version updates or changelogs published as of this digest. Development remains in pre-release iteration phase, prioritizing internal stability and UX polish ahead of next formal release.

---

### **3. Project Progress**  
The following pull requests were merged/closed today, reflecting key advances:

- **[PR #8073](https://github.com/nearai/ironclaw/pull/8073)** – *Fixes error messaging for unconfigured Telegram personal accounts*: Now clearly states “not configured by administrator” instead of blaming the user, improving clarity and reducing confusion.
- **[PR #8054](https://github.com/nearai/ironclaw/pull/8054)** – *Ensures first `/start` message triggers connect notice*: Fixes a workflow regression where unpaired users received command inventory before pairing guidance — now aligns with expected onboarding flow.

These merges reflect ongoing refinement of identity management and onboarding logic across platforms, particularly for Telegram.

---

### **4. Community Hot Topics**  
The most discussed items involve critical usability edge cases in user onboarding and channel access:

- **[Issue #8074](https://github.com/nearai/ironclaw/issues/8074)** – *Paired user in disconnected shared channel gets wrong error copy*: Currently open, this is a high-impact UX issue affecting paired users who attempt actions in non-connected channels. The symptom suggests a misclassification of user state during routing, potentially leading to frustration when users expect context-specific feedback. This may indicate deeper issues in channel binding state handling.

- **[PR #8075](https://github.com/nearai/ironclaw/pull/8075)** – *Make embedded Pi sandbox loop default*: Though not yet merged, this large-scale change (XL size) signals strategic direction toward performance benchmarking and developer tooling. It’s stacked on another feature branch and requires coordination — likely targeting future dev-focused builds.

These represent top community concerns: **correctness of error messaging**, **onboarding consistency**, and **infrastructure readiness for advanced use cases**.

---

### **5. Bugs & Stability**  
Two notable bugs were resolved today, both related to Telegram integration:

- **[Issue #7956](https://github.com/nearai/ironclaw/issues/7956)** – *Unpaired user receives command inventory instead of connect notice*: Fixed via [PR #8054](https://github.com/nearai/ironclaw/pull/8054), which reorders command admission logic to check pairing status upfront. This was a functional regression impacting first-time user experience.

- **[Issue #7955](https://github.com/nearai/ironclaw/issues/7955)** – *Generic "Something went wrong" for unconfigured Telegram API keys*: Resolved in [PR #8073](https://github.com/nearai/ironclaw/pull/8073), which now surfaces admin-level configuration errors explicitly.

Both were classified as *low-risk*, *medium severity* due to impact on user onboarding and trust. No crashes or regressions reported.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging signals from PRs and issues suggest the following roadmap priorities:

- **Enhanced Telegram UX**: [PR #8072](https://github.com/nearai/ironclaw/pull/8072) adds Bot API command menu registration at activation — a clear move toward richer native bot interaction (e.g., hamburger menu visibility). This indicates growing emphasis on platform-native features.

- **Sandbox Performance Optimization**: [PR #8075](https://github.com/nearai/ironclaw/pull/8075) proposes making the Pi sandbox loop the default startup mode — likely targeting benchmarking and local agent execution efficiency. This could signal a future release focused on developer performance testing.

These features point toward a near-term focus on **platform-native UX polish** and **developer-facing performance tools**.

---

### **7. User Feedback Summary**  
User pain points center around **onboarding clarity** and **error transparency**:

- Users are confused when they receive generic or misleading messages (e.g., “Something went wrong” vs. “Admin hasn’t set up Telegram”).
- First-time users face friction if they don’t immediately get pairing instructions — especially after sending `/start`.
- Paired users in disconnected channels are misled by incorrect notices, suggesting mismatched state logic.

Feedback implies strong demand for **context-aware messaging**, **consistent user journey**, and **clear ownership attribution** (admin vs. user) — all critical for enterprise adoption.

---

### **8. Backlog Watch**  
Several important issues remain open and require maintainer attention:

- **[Issue #8074](https://github.com/nearai/ironclaw/issues/8074)** – *Paired user in disconnected shared channel gets wrong notice*: High-impact UX issue affecting paired users; currently unresolved despite being reported and updated recently. Needs immediate triage.

- **[PR #8075](https://github.com/nearai/ironclaw/pull/8075)** – *Set Pi sandbox loop as default*: Large, impactful change but blocked on base PR (`feat/7903-native-loop-sandbox-spike`). Requires coordination between teams to unblock and merge.

These items represent strategic bottlenecks in both user experience and technical infrastructure — prioritization will shape the next major milestone.

--- 

*Digest generated: 2026-09-06 | Source: GitHub repo `nearai/ironclaw`*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-06**

---

### **1. Today's Overview**  
QwenPaw shows strong community engagement with 10 issues and 4 pull requests updated in the past 24 hours, indicating active development and user-driven iteration. The project is transitioning from a personal AI assistant toward a multi-user, team-oriented platform, as evidenced by the upcoming *Hub* release in v2.2.0. While no new releases have been published, recent PRs focus on core improvements in skill management, model handling, and UI/UX—particularly around stability, error visibility, and workflow control. The absence of merged PRs suggests that feature reviews and integration are still pending.

---

### **2. Releases**  
❌ **No new releases** were published as of 2026-09-06.  
The next version, **v2.2.0**, is anticipated to include the launch of **QwenPaw Hub (multi-tenant edition)**, marking a major shift toward enterprise and team use cases. No migration notes or breaking changes have been documented yet, but community input is actively being solicited via [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318).

---

### **3. Project Progress**  
✅ **Merged/Closed PRs**: None today.  
📌 **Key PRs in progress**:
- **[PR #7569: Add Advisor Mode](https://github.com/agentscope-ai/QwenPaw/pull/7569)** – Introduces a dual-model loop mode where a high-capacity "advisor" assists a cost-efficient worker agent. This signals a strategic move toward performance optimization and hybrid reasoning architectures.
- **[PR #7509: Update `make-skill` to v2](https://github.com/agentscope-ai/QwenPaw/pull/7509)** – Implements an approval-driven, draft-to-publish workflow for skill creation, enhancing governance and reusability in collaborative environments.
- **[PR #7486: Creator App Plugin v1.1.2](https://github.com/agentscope-ai/QwenPaw/pull/7486)** – Brings advanced features including async delegation, media scheduling (T2V/I2V/S2V), professional prompts, and Windows/Docker hardening—indicating growing maturity in production-grade deployment.

---

### **4. Community Hot Topics**  
🔥 **Most Active Issue**:  
- **[Issue #7318: QwenPaw Hub Multi-Tenant Edition Roadmap Discussion](https://github.com/agentscope-ai/QwenPaw/issues/7318)**  
  - **23 comments**, **3 upvotes**  
  - Core topic: Community demand for team-based deployment. Users want role-based access, admin-managed skills, and centralized configuration—highlighting a clear pivot from solo use to organizational workflows.  
  - **Underlying Need**: Scalable, secure, and maintainable AI agent orchestration for teams—likely driving the v2.2.0 Hub rollout.

🔥 **Most Engaged PR**:  
- **[PR #7569: Add Advisor Mode](https://github.com/agentscope-ai/QwenPaw/pull/7569)**  
  - Though not yet merged, it’s drawing attention due to its innovative approach to cost-performance trade-offs.  
  - **User Need**: Efficient use of expensive models without sacrificing quality—especially relevant for long-form reasoning tasks.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs Reported Today**:

| Bug | Severity | Description | Fix Status |
|------|----------|-------------|------------|
| **[Issue #7576: Hardcoded 32768 context fallback causes CONTEXT_UNFIT >31130 tokens](https://github.com/agentscope-ai/QwenPaw/issues/7576)** | ⚠️ High | All models forced into a 32768-token context window, exceeding limits for many models (e.g., GPT-3.5-turbo). Causes immediate rejection during inference. | ❌ No fix PR yet. Critical for model compatibility. |
| **[Issue #7572: Tool coordinator swallows exceptions, hides stack traces](https://github.com/agentscope-ai/QwenPaw/issues/7572)** | ⚠️ High | `except Exception` in `_drain()` suppresses full error logs; only `str(exc)` returned. Makes debugging impossible. | ❌ No fix PR. Blocks observability and incident response. |
| **[Issue #7574: `img-gen` omits `model` field → HTTP 503 fallback to dall-e-2](https://github.com/agentscope-ai/QwenPaw/issues/7574)** | ⚠️ Medium | Missing `model` in request body forces fallback to outdated DALL-E 2, breaking intended behavior. | ✅ **Fix PR exists?** Not yet. But reproducible and well-documented. |
| **[Issue #7575: `edit()` sends `response_format` unconditionally → HTTP 400](https://github.com/agentscope-ai/QwenPaw/issues/7575)** | ⚠️ Medium | Unconditional inclusion of `response_format` fails on gpt-image-2 edit endpoint. | ✅ **Fix PR exists?** Not yet. Impact: image editing broken. |

> 💡 **Note**: Multiple critical bugs related to model handling and error logging suggest instability in the core inference pipeline—urgent attention needed before v2.2.0 release.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Top User-Requested Features**:
- **Version & dependency metadata for skills** ([#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)): Needed for large-scale agent fleets to track skill revisions and avoid drift.
- **"Edit last message" and "Rewind" buttons in Web UI** ([#7573](https://github.com/agentscope-ai/QwenPaw/issues/7573)): Direct UX improvement for iterative prompting—highly requested by power users.
- **Auto-collapse thinking cards in Feishu output** ([#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)): Enhances readability and usability in collaboration tools like Feishu.

📌 **Predicted Next Version (v2.2.0) Inclusions**:
- QwenPaw Hub (multi-tenant edition)
- Advisor Mode (from PR #7569)
- Skill versioning and metadata support
- Enhanced Web UI controls (edit/rewind)

---

### **7. User Feedback Summary**  
🛠️ **Real Pain Points Expressed**:
- **Memory & Workflow Confusion**: User [@xiaohushi512](https://github.com/agentscope-ai/QwenPaw/issues/7571) reports recurring confusion between source (`A`) and runtime (`C`) directories, leading to accidental overwrites. Suggests poor mental model clarity and lack of path isolation in deployment workflows.
- **Lack of Error Visibility**: Developers struggle to debug failures due to suppressed exception traces ([#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572)), indicating a need for better observability.
- **UI/UX Friction**: Long thinking outputs remain visible post-generation ([#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)), reducing usability in real-time collaboration tools.

💡 **Satisfaction Indicators**:
- Positive feedback on Feishu CardKit streaming ([#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)) suggests successful implementation of rich output formats.
- Strong community interest in Hub and Advisor Mode reflects trust in the project’s direction.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered Critical Issues Requiring Attention**:
- **[Issue #7318: QwenPaw Hub Roadmap Discussion](https://github.com/agentscope-ai/QwenPaw/issues/7318)** – 23 comments, 3 upvotes, opened Aug 26, 2026. **Needs maintainer summary and roadmap commitment.**
- **[Issue #7572: Tool coordinator swallows exceptions](https://github.com/agentscope-ai/QwenPaw/issues/7572)** – Open since Sep 5, 2026. **High-severity bug affecting debugging and reliability. Must be prioritized.**
- **[Issue #7576: Hardcoded context_size fallback](https://github.com/agentscope-ai/QwenPaw/issues/7576)** – Affects all models in v2.1.0–v2.2.0. **Blocks adoption of many models. Requires urgent fix.**

> 📌 **Recommendation**: Maintain a dedicated “Stability & Observability” sprint ahead of v2.2.0 to resolve these top-tier bugs and prepare for team adoption.

---  
*Digest generated on 2026-09-06 based on GitHub activity from agentscope-ai/QwenPaw.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-09-06**

---

### **1. Today's Overview**  
ZeroClaw (github.com/zeroclaw-labs/zeroclaw) is experiencing robust activity with **42 new issues** and **50 PRs updated in the last 24 hours**, indicating strong momentum in both development and community engagement. The project is actively stabilizing for its **v0.8.5 release**, which rolled out today with 454 commits from 73 contributors—focused on security hardening, runtime architecture improvements, and operator experience. High-severity RFCs and bug fixes dominate the backlog, signaling a strategic push toward production-grade reliability and extensibility. With over 100 open issues at high risk or priority level, the project remains in an intense phase of architectural refinement.

---

### **2. Releases**  
#### ✅ **v0.8.5** ([Release Notes](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5))  
- **Scope**: Security, connectivity, and operator-experience focused update.  
- **Key Additions**:  
  - Introduction of **ZeroRelay** and **ZeroRouter** for enhanced inter-agent communication and routing flexibility.  
  - Expanded live chat and provider capabilities with improved session lifecycle control.  
  - Hardened boundaries across plugins, sandboxes, webhooks, credentials, and file systems.  
- **Migration Notes**: No breaking changes reported. Users should ensure their `model_routing_config` and `security.policy` schemas align with updated validation rules (see #10533).  
- **Contributor Impact**: 73 contributors involved—reflecting growing community investment in core infrastructure.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today)**:  
- **PR #10064** ([fix(channels/telegram): self-destruct approval cards after an operator tap](https://github.com/zeroclaw-labs/zeroclaw/pull/10064)) – Enhanced Telegram UX by auto-closing approval prompts post-action.  
- **PR #10435** ([fix(providers): preserve model context when anchoring Gemini requests](https://github.com/zeroclaw-labs/zeroclaw/pull/10435)) – Fixed misrouting of context during model calls, improving response fidelity.  
- **PR #10649** ([fix(ci): allow PR size label updates](https://github.com/zeroclaw-labs/zeroclaw/pull/10649)) – Enabled automated CI labeling, streamlining workflow hygiene.  

**Features Advanced**:  
- **Persistent prompt attachments** (#10407) now in review—enabling reusable session-level prompts via SQLite.  
- **Telegram group context passivity** (#10640) adds opt-in silent room-scoped message handling, reducing noise in collaborative spaces.  
- **MSC3245 voice notes delivery** (#10489) expands Matrix TTS support to native voice note format.

---

### **4. Community Hot Topics**  
Top 3 most discussed items reflect deep architectural debates and user-driven needs:

| Issue | Comments | Link | Analysis |
|------|--------|------|---------|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | 33 | [RFC: Runtime-owned conversation sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | Central to session semantics—aims to unify ownership and transport surfaces. High-risk, high-impact decision affecting agent lifecycle and multi-channel consistency. |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | 26 | [RFC: Unified file and attachment architecture](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | Critical for file integrity and sandbox enforcement. Suggests users demand better handling of media across agents and channels. |
| [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | 3 | [RFC: Append-only session event history](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | Emerging need for deterministic replay and auditability—key for compliance and debugging in production deployments. |

These RFCs signal a shift from feature velocity to **architectural maturity**, prioritizing correctness, traceability, and cross-platform consistency.

---

### **5. Bugs & Stability**  
**High-Priority Bugs Reported (Today)**:  
| Issue | Severity | Link | Status | Fix PR? |
|------|----------|------|--------|--------|
| [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) | S1 (Workflow Blocked) | [Bounded delegates silently strip delegate tool](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) | In-progress | ❌ |
| [#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) | S1 | [macOS Seatbelt ignores allowed_roots for shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) | In-progress | ❌ |
| [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | S2 | [Internal `[media attachment]` placeholder delivered to text-only models](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | Accepted | ❌ |
| [#10626](https://github.com/zeroclaw-labs/zeroclaw/issues/10626) | S2 | [TTS synthesizes Markdown/emoji verbatim](https://github.com/zeroclaw-labs/zeroclaw/issues/10626) | Accepted | ❌ |

> 🔴 **Critical Risk**: macOS sandbox bypass via Seatbelt and silent delegate stripping undermine core security assumptions. These must be resolved before v0.8.6.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging themes from open RFCs suggest the next major version will focus on:  
- **Deterministic state replay** (#10526): A foundational step toward audit trails and reproducible AI behavior.  
- **Composable WASM plugin runtime** (#10076): Indicates demand for modular, pluggable AI tooling.  
- **Opt-in single-tool provider rounds** (#10222): User desire for real-time feedback during multi-tool execution.  
- **Per-field cron input UI** (#10641): Reflects usability pain in automation workflows—expected in v0.8.6.  

👉 *Predicted in v0.8.6*: Enhanced TTS sanitization, improved cron UX, and first-wave implementation of append-only session history.

---

### **7. User Feedback Summary**  
Real-world pain points emerging from issues and PRs include:  
- **UX friction**: Freeform cron inputs (#10641), unformatted TTS output (#10626), and literal `[media attachment]` placeholders degrade user trust.  
- **Security confusion**: Operators struggle with `allowed_roots`, `delegate` tool stripping, and inconsistent policy enforcement across platforms (especially macOS).  
- **Tooling gaps**: Lack of per-agent workspace access controls (#10308) and inability to use custom provider slots (#10533) limit deployment flexibility.  
- **Automation failures**: Cron jobs failing silently due to missing wall-clock timeouts (#9320) disrupt scheduled tasks.

> 💬 *User sentiment*: High engagement but frustration with edge-case stability and configuration complexity—especially in self-hosted environments.

---

### **8. Backlog Watch**  
**Critical Issues Requiring Maintainer Attention**:  
| Issue | Priority | Status | Link | Notes |
|------|----------|--------|------|-------|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | P2 (High) | Proposed | [RFC: Runtime-owned conversation sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | Needs final voting window—impacts all channel and agent flows. |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | P2 (High) | Proposed | [Unified file and attachment architecture](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | Requires resolution to prevent future policy drift. |
| [#10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) | P1 (High) | In-progress | [model_routing_config rejects custom.* slots](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) | Blocks advanced routing patterns; urgent fix needed. |
| [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | P2 | Accepted | [Simplify RFC voting process](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | Low-effort improvement that could accelerate decision-making. |

> ⏳ **Maintenance Note**: Despite active contributions, several high-impact RFCs remain stalled due to lack of maintainer-led voting windows. This risks slowing down long-term architectural decisions.

--- 

✅ **Project Health Score**: **Strong** — Active development, high contributor volume, clear roadmap focus.  
⚠️ **Risks**: Security boundary regressions on macOS, delayed RFC decisions, and UX polish lagging behind feature depth.  

*Data as of 2026-09-06 | Source: [GitHub – zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*