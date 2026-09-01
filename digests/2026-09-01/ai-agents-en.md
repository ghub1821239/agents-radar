# OpenClaw Ecosystem Digest 2026-09-01

> Issues: 448 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-01 01:23 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-01**

---

### **1. Today's Overview**  
OpenClaw remains a highly active, rapidly evolving AI agent platform with intense community engagement. On September 1, 2026, the project saw **448 issues updated in the last 24 hours** (212 open/active) and **500 pull requests updated** (238 open), indicating robust development momentum. A new release—`v2026.8.1`—was published, but it introduced critical stability regressions that are now actively being diagnosed and mitigated by users and maintainers alike. The influx of high-severity bugs, particularly around memory leaks, session corruption, and config migration failures, signals ongoing challenges in production-grade reliability despite strong feature velocity.

---

### **2. Releases**  
**✅ v2026.8.1** – *Released: 2026-08-31*  
[Release Notes](https://docs.openclaw.ai/releases/2026.8.1)  

- **Key Changes**:  
  - Enhanced support for Telegram bot-to-bot and guest-bot modes (per #79077).  
  - Introduced improved model routing and runtime context handling for CLI and embedded agents.  
  - Added native `realtime` audio support for thin clients (see PR #134003).  
  - Updated plugin SDK surface and improved cross-channel auth consistency.  

- **Breaking Changes & Migration Notes**:  
  - **Critical Upgrade Blocker**: The `doctor --fix` command fails to apply config-key migrations non-interactively during upgrades from `2026.7.1-2 → 2026.8.1`, leaving gateways unstartable (#133984).  
  - **Secret Redaction Bug**: Config migrations now replace all inline secrets (e.g., Discord tokens, API keys) with `__OPENCLAW_REDACTED__`, rendering some channels unusable (#134169).  
  - **Cron Job Quarantine**: Valid legacy cron jobs are incorrectly marked as `invalid-schedule` and silently dropped post-migration (#133347).  
  - **Fix Guidance**: If automatic update fails, use a local coding harness to diagnose and verify Gateway startup. Always back up configuration before upgrading.

---

### **3. Project Progress**  
**✅ Merged/Closed PRs (Today)**  
- **PR #134586** – Test: Pin promotional provider pricing fixtures (prevents test drift post-September 1).  
- **PR #134253** – Fix installer: Recover npm installs blocked by stale launchers.  
- **PR #123535** – Fix UI: Avoid session catalog refresh storms on focus changes.  
- **PR #123975** – Fix scripts: Clean up `tsgo` process trees on timeout/signal.  
- **PR #126424** – Fix gateway: Keep conversation delivery within agent bindings (security boundary fix).  
- **PR #133358** – Fix agents: Retain grep matches with byte-form paths (improves tool search accuracy).  

These fixes address stability, resource cleanup, and UX polish—critical for maintaining performance under load.

---

### **4. Community Hot Topics**  
The most active and impactful issues reflect deep concerns about **system reliability and upgrade safety**:

- **#91588** – *Critical: Gateway Memory Leak (RSS grows from 350MB → 15.5GB)*  
  [GitHub Issue](https://github.com/openclaw/openclaw/issues/91588)  
  > 23 comments, P1 severity. This is a recurring crash-loop trigger affecting long-lived deployments. No fix PR yet; requires urgent maintainer review.

- **#133813** – *2026.8.1 upgrade crash-loops the Gateway; doctor --fix blocked by ExecApprovalsMigrationRequiredError*  
  [GitHub Issue](https://github.com/openclaw/openclaw/issues/133813)  
  > 7 comments, P1. A showstopper for macOS LaunchAgent users. Already in stable release—urgent need for patch or rollback guidance.

- **#134169** – *Config migrations redact ALL secrets as __OPENCLAW_REDACTED__*  
  [GitHub Issue](https://github.com/openclaw/openclaw/issues/134169)  
  > 4 comments, P0. High-severity security/operational risk—renders deployed services unusable. Requires immediate fix.

- **PR #134525** – *fix(cron): create jobs with configured Codex app-server auth*  
  [GitHub PR](https://github.com/openclaw/openclaw/pull/134525)  
  > Focuses on preserving authenticated identity across scheduled tasks—directly addresses user pain from #134169.

> 🔍 **Underlying Need**: Users demand **safe, predictable upgrades** with zero data loss or service disruption. Trust in OpenClaw’s stability hinges on consistent migration behavior.

---

### **5. Bugs & Stability**  
Top-tier stability issues reported today, ranked by impact:

| Severity | Issue ID | Summary | Status | Fix PR? |
|--------|--------|--------|--------|--------|
| 🦞 Diamond Lobster (P0/P1) | #91588 | Gateway memory leak → OOM crashes after 2–3 days | Open | ❌ |
| 🦞 Diamond Lobster | #133813 | 2026.8.1 upgrade bricks Gateway; `doctor --fix` blocked | Closed | ❌ |
| 🦞 Diamond Lobster | #134169 | All secrets redacted in config migration | Open | ❌ |
| 🐚 Platinum Hermit | #96834 | WhatsApp inbound image wedges main lane for 3 mins | Open | ❌ |
| 🦪 Silver Shellfish | #127229 | Telegram watchdog-released updates falsely tombstoned | Open | ❌ |

> ⚠️ **Note**: Multiple high-impact bugs stem from **migration logic flaws**, especially around config, workspace, and cron state. These indicate systemic gaps in upgrade testing and validation.

---

### **6. Feature Requests & Roadmap Signals**  
User demand is shifting toward **multi-agent orchestration, security hardening, and platform interoperability**:

- **#79077** – *Support for Telegram bot-to-bot and guest-bot modes*  
  [GitHub Issue](https://github.com/openclaw/openclaw/issues/79077)  
  > 13 comments, 8 👍. Now implemented via PR #134525 and released in v2026.8.1—signals roadmap alignment.

- **#53763** – *Built-in headless browser for reliable web access*  
  [GitHub Issue](https://github.com/openclaw/openclaw/issues/53763)  
  > 7 comments. Requested since March 2026. Indicates growing need for autonomous web interaction without external dependencies.

- **#134307** – *MCP servers missing from tool catalog on `claude-cli` runtime*  
  [GitHub Issue](https://github.com/openclaw/openclaw/issues/134307)  
  > 6 comments. Highlights inconsistency between native and MCP runtimes—likely to be addressed in next beta.

> ✅ **Prediction**: Next major version (likely `2026.9.x`) will include **built-in headless browser**, **enhanced multi-agent coordination**, and **robust migration tooling**.

---

### **7. User Feedback Summary**  
Real-world deployment pain points dominate feedback:

- **"I upgraded to 2026.8.1 and now my Discord bot won’t start—token is gone."**  
  → Confirms #134169. Users feel their credentials were lost due to poor migration design.

- **"After 3 days, my gateway crashes daily from memory bloat."**  
  → Direct evidence of #91588. Long-running sessions are unstable.

- **"I can't use `openclaw doctor --fix`—it just hangs or fails silently."**  
  → Reflects frustration with #133984 and #134445. Users lack trust in recovery tools.

- **"My cron jobs vanished after upgrade—no warning, no log."**  
  → Validates #133347. Loss of automation inventory is unacceptable for production use.

> 💬 **Sentiment**: High energy, strong engagement—but growing concern over **upgrade reliability** and **data integrity**. Users are willing to contribute but need confidence in the system.

---

### **8. Backlog Watch**  
Long-standing, high-impact issues requiring maintainer attention:

- **#91588** – *Critical memory leak* (created June 2026, 23 comments)  
  [Link](https://github.com/openclaw/openclaw/issues/91588)  
  > Needs live repro, maintainer review, and priority fix.

- **#65374** – *Built-in dreaming system contaminates agent identity*  
  [Link](https://github.com/openclaw/openclaw/issues/65374)  
  > 8 comments, 2 👍. Cross-agent memory pooling is a fundamental flaw in multi-agent setups.

- **#102175** – *Embedded prompt cache breaks across session boundaries*  
  [Link](https://github.com/openclaw/openclaw/issues/102175)  
  > 18 comments. Critical for long-lived agent sessions; no fix PR yet.

- **#115424** – *Gateway V8 heap OOM → crash loop after restart*  
  [Link](https://github.com/openclaw/openclaw/issues/115424)  
  > 6 comments. Reproducible in large-scale environments; indicates scaling limits.

> 📌 **Action Item**: Maintain a dedicated "Stability Emergency" triage channel. Prioritize these issues for next sprint.

---

### **Conclusion**  
OpenClaw is at a pivotal moment: **feature-rich and actively developed**, but **production stability is under stress** due to migration regressions and unresolved memory/resource issues. While the community drives innovation, the team must now prioritize **upgrade safety, migration rigor, and crash prevention** to maintain trust. The next 30 days will define whether OpenClaw becomes a trusted enterprise agent platform—or a cautionary tale of rapid growth without operational maturity.

👉 **Stay vigilant**: Monitor `#133813`, `#134169`, and `#91588` closely. Use local coding harnesses for upgrades until official patches are released.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Open-Source Ecosystem (2026-09-01)**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem is in a phase of rapid divergence, marked by aggressive feature velocity, architectural experimentation, and growing pains around stability and upgrade safety. Projects are increasingly differentiating through specialization—ranging from multi-agent orchestration (OpenClaw, QwenPaw Hub) to secure, composable runtime systems (ZeroClaw) and platform-agnostic UIs (IronClaw). While community engagement remains high across all projects, the gap between innovation speed and operational maturity is widening, with several teams now facing critical trust issues due to migration regressions and silent failures.

---

### **2. Activity Comparison**

| Project       | Issues (24h) | PRs (24h) | Releases (24h) | Health Score (1–5) |
|---------------|--------------|-----------|----------------|--------------------|
| **OpenClaw**  | 448          | 500       | ✅ v2026.8.1    | ⚠️ 2.5 (High Risk) |
| **Hermes Agent** | 50         | 50        | ✅ v0.21.0 ("Pantheon") | 🟡 3.0 (Moderate Risk) |
| **IronClaw**  | 12           | 20        | ❌ None         | 🟢 4.0 (Stable Focus) |
| **QwenPaw**   | 38           | 40        | ✅ v2.2.0-beta.5 | ⚠️ 2.0 (High Risk) |
| **ZeroClaw**  | 39           | 50        | ❌ None         | 🟡 3.0 (Moderate Risk) |

> *Health score reflects stability risk, upgrade safety, and fix velocity. Scores below 3 indicate active reliability concerns.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most **feature-rich and developer-engaged** project in the ecosystem, with the highest volume of activity and a clear focus on **multi-channel integration, real-time capabilities, and bot-to-bot interaction**. Its technical approach emphasizes **pluggable agents, dynamic model routing, and embedded client support**, enabling deep customization for enterprise and dev-centric use cases. However, it lags behind peers in **stability and upgrade predictability**, with multiple P0/P1 bugs stemming from flawed config migration logic—highlighting a key trade-off: rapid innovation at the cost of production readiness. Compared to Hermes (mature but fragmented), IronClaw (design-focused), QwenPaw (team-oriented), and ZeroClaw (secure architecture), OpenClaw has the largest contributor base and most diverse plugin ecosystem—but currently risks being seen as unstable despite its ambition.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, several cross-cutting technical needs are emerging:

- **Config & State Integrity**:  
  - *OpenClaw* (#134169): Secrets redacted during migration.  
  - *ZeroClaw* (#10495): `Config::save()` overwrites user configs.  
  - *QwenPaw* (#7408): Unexpected config loss in Feishu channel.  
  → **Need**: Immutable migration tooling, atomic config updates, and audit logs.

- **WASM Plugin Reliability**:  
  - *ZeroClaw* (#10505): WIT version skew breaks plugins.  
  - *QwenPaw* (#7445): Hub fails to connect to local models (WASM-dependent).  
  → **Need**: Versioned plugin interfaces, compatibility matrices, and sandboxed testing.

- **Memory & Resource Management**:  
  - *OpenClaw* (#91588): Memory leak (350MB → 15.5GB).  
  - *Hermes Agent* (#99882): Queued messages lost silently.  
  - *QwenPaw* (#7420): Doom-loop after `write_file`.  
  → **Need**: Leak detection, deterministic state management, and durable event queues.

- **Real-Time & Streaming UX**:  
  - *OpenClaw*: Realtime audio support.  
  - *IronClaw*: Progressive reply publication.  
  - *ZeroClaw*: Verbatim channel sends.  
  → **Need**: Low-latency transport, stream resilience, and UI sync guarantees.

---

### **5. Differentiation Analysis**

| Project       | Feature Focus                              | Target User                         | Technical Architecture                     |
|---------------|--------------------------------------------|-------------------------------------|---------------------------------------------|
| **OpenClaw**  | Multi-channel bots, CLI/embedded agents    | Devs, enterprises, integrators      | Modular plugins, dynamic routing, config-driven |
| **Hermes Agent** | Bot group chats, plugin-neutral APIs     | Power users, research teams         | Async-first, provider-agnostic, session-persistent |
| **IronClaw**  | WebUI design system, tool discovery        | Designers, frontend engineers       | React + Tailwind v4, Storybook governance, performance-optimized payloads |
| **QwenPaw**   | Team collaboration, Hub deployment         | Enterprises, teams                  | Multi-user context, role-based access, hybrid cloud/local |
| **ZeroClaw**  | Secure A2A, WASM extensibility, auditability | Security-sensitive, compliance teams | Memory lifecycle decoupling, Serde wire models, evaluation sandboxing |

> 🔍 **Key Insight**: The ecosystem is bifurcating into **tooling platforms** (OpenClaw, Hermes) and **specialized infrastructures** (IronClaw for UI, ZeroClaw for security, QwenPaw for team workflows).

---

### **6. Community Momentum & Maturity**

| Tier               | Projects                                  | Indicators |
|--------------------|-------------------------------------------|-----------|
| **Rapid Iteration** | OpenClaw, Hermes Agent, ZeroClaw          | >50 PRs/issue updates daily; RFCs, beta releases, high comment volumes |
| **Stabilization Phase** | IronClaw, QwenPaw (v2.2.0-beta)           | Focused on design system, performance tuning, and bug triage; fewer new features, more fixes |
| **Transitioning to Stability** | QwenPaw Hub (emerging)                   | High community input on roadmap direction (e.g., #7318); signals shift from personal to team use |

> ✅ **Maturity Signal**: IronClaw and QwenPaw are transitioning from “build fast” to “build reliable,” while OpenClaw and Hermes remain in high-growth mode—risking burnout if stability isn’t prioritized.

---

### **7. Trend Signals**  
Based on community feedback and PR trends, the following industry-wide shifts are evident:

1. **From Individual Assistants to Team-Centric Workflows**  
   - *Evidence*: QwenPaw Hub discussions (#7318), Hermes Bot Group Chats persistence (#97681).  
   - *Value for Developers*: Need for role-based access, shared skill libraries, and collaborative session history.

2. **Security-First Design Is No Longer Optional**  
   - *Evidence*: ZeroClaw’s A2A protocol, memory lifecycle RFCs, and pairing code TTLs.  
   - *Value for Developers*: Demand for auditable, isolated execution environments and secure inter-agent communication.

3. **Extensibility via WASM & Plugin Contracts**  
   - *Evidence*: ZeroClaw’s WASM layer, Hermes’ plugin-neutral API, QwenPaw’s plugin loading optimization.  
   - *Value for Developers*: Building modular, reusable tools without core code changes.

4. **Real-Time, Streaming UX Is Expected**  
   - *Evidence*: IronClaw’s progressive replies, OpenClaw’s realtime audio, ZeroClaw’s verbatim messaging.  
   - *Value for Developers*: Need for low-latency transports and resilient stream handling.

5. **Local-First, Hybrid Deployment Is Mainstream**  
   - *Evidence*: QwenPaw Hub connection failures (#7445), ZeroClaw’s local model mode demand (#5287).  
   - *Value for Developers*: Must support offline operation, private inference, and seamless cloud-local sync.

---

### **Conclusion**  
The open-source AI agent landscape is no longer about building "the next chatbot"—it's about constructing **scalable, secure, composable, and team-ready agent infrastructures**. While OpenClaw leads in feature breadth, stability and migration safety are now existential concerns. Projects like IronClaw and ZeroClaw are setting new standards in design and security, respectively. For developers, the takeaway is clear: **choose your stack not just by features, but by reliability, upgrade safety, and long-term maintainability**. The next 6 months will determine whether this ecosystem matures into a trusted foundation for AI-powered work—or becomes a cautionary tale of over-innovation without operational discipline.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-01**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a surge in developer engagement: **50 issues and 50 PRs updated in the last 24 hours**, indicating robust momentum. The recent release of **v0.21.0 (v2026.8.31)** — dubbed *The Pantheon Release* — marks a major milestone, closing over **2,100 issues** and incorporating ~5,800 commits across 760+ contributors. This reflects strong community collaboration and ongoing refinement of core infrastructure. However, a cluster of high-severity bugs related to session state, message delivery, and platform compatibility (especially Windows) suggests growing complexity in cross-platform stability.

---

### **2. Releases**  
**✅ v2026.8.31 – Hermes Agent v0.21.0 ("The Pantheon Release")**  
- **Release Date:** August 31, 2026  
- **Key Highlights:**  
  - Over **5,800 commits**, **~2,475 merged PRs**, and **~5,680 files changed** since v0.20.0  
  - **2,100+ issues closed**, including critical session management, compression, and authentication fixes  
  - Introduced foundational support for **Bot Group Chats**, **plugin-neutral runtime APIs**, and enhanced **cross-gateway transport**  
- **Migration Notes:**  
  - No breaking changes explicitly documented; however, new `provider-neutral AgentRuntime` plugin API may require adjustments for third-party plugins.  
  - Users on Windows should verify compatibility with `asyncio.start_unix_server` usage (see #99895).  
- 🔗 [Release Notes & Changelog](https://github.com/nousresearch/hermes-agent/releases/tag/v0.21.0)

---

### **3. Project Progress**  
Today saw **18 merged/closed PRs**, primarily focused on **stability, session integrity, and UX polish**:
- ✅ **PR #99890** – Fixes transcript restoration after rejected regenerate (supersedes #95848)  
- ✅ **PR #99891** – Prevents dead runtimes from stealing composer focus (addresses multiple prior issues)  
- ✅ **PR #99892** – Stops stale model pins from affecting new chats (supersedes #91482)  
- ✅ **PR #99894** – Ensures plugin platforms honor allowlists during DM resolution  
- ✅ **PR #99896** – Fixes `launchd` plist misclassification causing 4–6 minute startup stalls on macOS  
- ✅ **PR #99884** – Removes blocking filesystem reads from event loop via drain marker optimization  
- ✅ **PR #99880** – Ensures persisted response history remains linear post-repair  

These updates reflect a strong focus on **session reliability**, **runtime hygiene**, and **platform-specific edge cases**.

---

### **4. Community Hot Topics**  
Top 3 most-commented issues highlight **critical user pain points**:

| Issue | Comments | Severity | Link |
|------|----------|----------|------|
| [#66616](https://github.com/nousresearch/hermes-agent/issues/66616) | 132 | P3 (degraded) | Skills index stale (29.8h old) |
| [#88584](https://github.com/nousresearch/hermes-agent/issues/88584) | 48 | P3 (blocked) | Automated Nous integration fails due to merge conflicts |
| [#97948](https://github.com/nousresearch/hermes-agent/issues/97948) | 10 | P1 (critical) | Manual `/compress` times out while background worker succeeds |

**Analysis:**  
- **Skills Hub instability** (#66616) is a systemic issue impacting documentation and tool discovery.  
- **Integration blockers** (#88584) suggest friction in CI/CD pipelines between ecosystem projects.  
- **Compression race conditions** (#97948) reveal deeper architectural risks in async context handling — users are losing confidence in large-session reliability.

---

### **5. Bugs & Stability**  
Critical stability concerns reported today, ranked by severity:

| Bug | Severity | Platform | Summary | Fix PR? |
|-----|----------|----------|---------|--------|
| [#99895](https://github.com/nousresearch/hermes-agent/issues/99895) | P2 (critical) | Windows | `AttributeError: module 'asyncio' has no attribute 'start_unix_server'` in shutdown watchdog | ❌ |
| [#99882](https://github.com/nousresearch/hermes-agent/issues/99882) | P1 (critical) | All | Queued follow-ups lost silently during compression — **message loss without log trace** | ❌ |
| [#99864](https://github.com/nousresearch/hermes-agent/issues/99864) | P2 (high) | Desktop | Model selector shows paid model, but session runs free variant — **stale pinning** | ❌ |
| [#99854](https://github.com/nousresearch/hermes-agent/issues/99854) | P2 (high) | Slack | Second message in different thread silently dropped during long tool chains | ❌ |
| [#97315](https://github.com/nousresearch/hermes-agent/issues/97315) | P2 (high) | Windows/OpenAI | Sole credential pool spins on 429 error with no backoff or failover | ❌ |

> ⚠️ **High-risk pattern**: Multiple P1/P2 bugs involve **silent failures**, **state corruption**, and **inconsistent UI vs. backend behavior** — all threatening trust in the agent’s reliability.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging trends signal future development focus:

- **🤖 Bot Ecosystem Expansion**  
  - [#97681](https://github.com/nousresearch/hermes-agent/issues/97681): Bot Group Chats must persist after desktop close → **indicating demand for persistent, server-backed bot workflows**  
  - [#99159](https://github.com/nousresearch/hermes-agent/pull/99159): Allow bots to share real files in hosted group chats → **signals intent to enable collaborative AI agents**

- **🛠️ Plugin & Extensibility**  
  - [#99474](https://github.com/nousresearch/hermes-agent/pull/99474): Provider-neutral AgentRuntime plugin API → **core infrastructure for modular, extensible turn execution**  
  - [#99887](https://github.com/nousresearch/hermes-agent/pull/99887): Unofficial Grok Bot ConnectRPC transport → **user-driven need for non-OpenAI provider support**

- **📱 Mobile & Accessibility**  
  - [#98866](https://github.com/nousresearch/hermes-agent/pull/98866): Touch-first mobile PWA for iOS standalone → **strong push toward mobile-first access**

> 💡 **Prediction**: v0.22.0 (late Q4 2026) will likely include **bot persistence**, **plugin architecture**, and **mobile web support**, with **Grok Bot** as a candidate experimental provider.

---

### **7. User Feedback Summary**  
Real-world pain points emerge clearly from issue descriptions:

- **“I lose messages”** – Silent drop of incoming Slack/Discord messages during long tool calls (#99854, #99882) → **trust erosion in production use**  
- **“My model choice is wrong”** – Desktop shows one model, but session uses another (#99864) → **UI/UX misalignment causes confusion and cost surprises**  
- **“It doesn’t work on my OS”** – Windows-specific crashes and file system issues (#99895, #99861) → **fragmentation in cross-platform experience**  
- **“I can’t scroll”** – Chat view auto-scrolls up, losing latest message (#37811) → **basic UX broken in key workflows**

> 📊 **Satisfaction**: Mixed. Core functionality works well for power users, but **non-trivial bugs and inconsistent feedback** hinder adoption by casual or enterprise users.

---

### **8. Backlog Watch**  
Critical issues awaiting maintainer attention:

| Issue | Status | Reason for Delay | Link |
|------|--------|------------------|------|
| [#66616](https://github.com/nousresearch/hermes-agent/issues/66616) | Open (P3, 132 comments) | Skills index staleness undermines tool discoverability | [Link](https://github.com/nousresearch/hermes-agent/issues/66616) |
| [#97948](https://github.com/nousresearch/hermes-agent/issues/97948) | Open (P1, 10 comments) | Critical compression timeout + silent failure | [Link](https://github.com/nousresearch/hermes-agent/issues/97948) |
| [#99895](https://github.com/nousresearch/hermes-agent/issues/99895) | Open (P2, 1 comment) | Hard crash on Windows due to missing `start_unix_server` | [Link](https://github.com/nousresearch/hermes-agent/issues/99895) |
| [#97681](https://github.com/nousresearch/hermes-agent/issues/97681) | Open (P2, 9 comments) | Bot Group Chats stop working when desktop closes — **missing persistence layer** | [Link](https://github.com/nousresearch/hermes-agent/issues/97681) |

> 🔔 **Note**: Despite high visibility and impact, these issues remain open with minimal triage. Maintainers should prioritize **session state consistency** and **cross-platform parity** to prevent user attrition.

---

**📌 Final Assessment**:  
Hermes Agent is **technically mature and rapidly evolving**, with a vibrant contributor base. However, **stability and UX consistency are lagging behind feature velocity**. The next 3 months will determine whether it transitions from a cutting-edge research tool to a reliable personal AI assistant at scale. Prioritizing **crash prevention**, **transparent error signaling**, and **platform parity** is essential.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

---

### **1. Today's Overview**  
IronClaw (github.com/nearai/ironclaw) remains highly active as of 2026-09-01, with 12 open issues and 20 open pull requests updated in the past 24 hours—indicating robust momentum across design, performance, and core infrastructure. The project is focused on a major **WebUI redesign phase (M3 reskin)**, with significant progress in design system governance, token migration, and Storybook integration. Performance optimization and stability improvements are also central, particularly around tool discovery, GitHub API efficiency, and response handling. No new releases were published today, but multiple high-impact PRs are nearing integration.

---

### **2. Releases**  
❌ *No new releases published as of 2026-09-01.*  
The project maintains a stable main branch, with recent CI fixes (e.g., #7995) stabilizing coverage checks and notification pipelines. All feature work is tracked via ongoing PRs and epics, with no versioned release notes or breaking changes announced.

---

### **3. Project Progress**  
✅ **Key merged/closed PRs (2026-08-31):**  
- **#8002**: Fixed main branch CI failures — resolved blocking pipeline issues.  
- **#7992**: Unified bounded integration execution — improved CI reliability and test concurrency control.  
- **#7993**, **#7834**, **#8003**: Dependency updates across `everything-else` and `wasm` groups — modernization of Rust ecosystem dependencies.  
- **#7995**: Stabilized main branch coverage checks — fixed stale inbox notifications and transient test failures.  
- **#7988**: Refreshed codebase knowledge graph — improved agent context awareness via nightly snapshot update.  

🚀 **High-impact features advancing:**  
- **#8011**: M3 reskin (Epic #7781 Phase 3) — full palette shift to `#6b4eff`, `#00e5ff`, `#ff4e9e`, with computed dark mode and `--v2-*` token retirement.  
- **#7994**: `DESIGN.md` governance docs — formalizes design language source-of-truth for React + Tailwind v4 stack.  
- **#8005**: Preview-only integration of Epic #7781 phases 2–3 — enables end-to-end evaluation before merge.  
- **#8006 & #8010**: Progressive reply publication and session-event transport unification — foundational for real-time agent UIs and durable messaging.

---

### **4. Community Hot Topics**  
🔥 **Most Active Issues/PRs (by engagement & urgency):**  
- **#8008** – *Hosted-MCP discovery: a leak-blocked tools/list page discards the entire catalog*  
  [Issue #8008](https://github.com/nearai/ironclaw/issues/8008)  
  → **Critical flaw**: One blocked tool causes full catalog loss. High severity; impacts agent usability.  
- **#8009** – *MCP egress errors flatten to "response_error", making discovery failures undiagnosable*  
  [Issue #8009](https://github.com/nearai/ironclaw/issues/8009)  
  → Silent failure mode undermines debugging. Needs root cause visibility.  
- **#7986** – *perf(github): list_repos ships 81 raw fields per repo — 519 KB for one listing*  
  [Issue #7986](https://github.com/nearai/ironclaw/issues/7986)  
  → Massive payload inefficiency; directly affects agent latency and cost.  
- **#7987** – *tool schemas: flatten_top_level rebuilds from a whitelist, silently discarding constraints*  
  [Issue #7987](https://github.com/nearai/ironclaw/issues/7987)  
  → Subtle but dangerous: model constraints vanish without warning.  

📌 **Underlying Need**: Users demand **predictable, efficient, and debuggable agent behavior**—especially in tool discovery, schema validation, and network payloads. These issues reveal gaps in error handling, data minimization, and resilience.

---

### **5. Bugs & Stability**  
🚨 **High Severity (Critical Stability Risks):**  
1. **#8008** – Catalog loss due to single leak block → **agent-wide failure risk**.  
2. **#8009** – Egress errors collapse into `"response_error"` → **no diagnostic traceability**.  
3. **#7986** – 519KB per 98 repos → **network bandwidth and latency bottleneck**.  

🔧 **Fixes in Progress:**  
- **#7996** (PR #7996): Compacts `github.list_repos` responses — direct fix for #7986.  
- **#7999** (PR #7999): Fixes `flatten_top_level` to preserve valid schema constraints — resolves #7987.  
- **#7964** (PR #7964): Prevents zero-tool catalog on resource ceiling exceedance — addresses #8008’s root cause.  

⚠️ **Note**: While fixes exist, none are merged yet. Stability risks remain active in production.

---

### **6. Feature Requests & Roadmap Signals**  
🎯 **Emerging Priorities (from PRs & Epics):**  
- **Progressive Reply Publication** (#8006, #8010): Enables real-time, streaming agent outputs — signals move toward **interactive, live-agent UX**.  
- **M3 Reskin & Design System (Epic #7781)**: Full visual overhaul with governance (`DESIGN.md`) — indicates focus on **design consistency and scalability**.  
- **Model Capability Icons & Discovery (PR #7997, #7998)**: Enhances model selection clarity — shows growing need for **transparent, capability-aware inference surfaces**.  
- **Session Event Transport Unification (#8010)**: Foundational for multi-channel agent interaction — signals expansion beyond web UI to **Slack, CLI, and embedded agents**.

🔮 **Predicted Next Version (v1.4.0)**: Likely to include **M3 WebUI redesign**, **progressive replies**, **optimized GitHub tooling**, and **enhanced model discovery** — all tied to Epic #7781.

---

### **7. User Feedback Summary**  
💬 **Real Pain Points Observed (via Issue Reports):**  
- **Tool Discovery Failures**: Users report sudden loss of tool catalogs due to silent leaks (#8008), reducing trust in agent reliability.  
- **Schema Constraints Vanishing**: Developers find that their carefully defined tool constraints disappear during flattening (#7987), leading to unexpected model behavior.  
- **Excessive Payloads**: Agent users complain about slow responses from GitHub tools due to oversized JSON returns (#7986), increasing latency and cost.  
- **Lack of Debug Visibility**: Errors like MCP egress failures are reduced to generic tokens (#8009), making troubleshooting nearly impossible.

✅ **Positive Signals**:  
- High engagement in design system work (Storybook, `DESIGN.md`) suggests strong community investment in long-term maintainability and consistency.  
- Multiple contributors (new and experienced) submitting PRs on perf, docs, and safety — reflects healthy collaboration culture.

---

### **8. Backlog Watch**  
⏳ **Long-Unanswered Critical Items Requiring Attention:**  
- **#7038** – *Epic: Design System Phase 1 — Storybook integration & design-system catalog*  
  [Issue #7038](https://github.com/nearai/ironclaw/issues/7038)  
  → **Closed but superseded** by #7781 and #7782. Still relevant for tracking legacy scope.  
- **#7782** – *Epic: Design System Phases 4–5 — agentic interactions, components & information architecture*  
  [Issue #7782](https://github.com/nearai/ironclaw/issues/7782)  
  → Final phase of UI overhaul; only 1 comment. **High-priority roadmap item with low activity**.  
- **#8004** – *Daily ironclaw failure taxonomy — 2026-08-31*  
  [Issue #8004](https://github.com/nearai/ironclaw/issues/8004)  
  → Diagnostic log analysis reveals deepseek-v4-flash navigation issues — **needs triage for future model quality benchmarks**.

🔍 **Recommendation**: Maintain dedicated triage for failure taxonomies and roadmap epics (like #7782) to prevent drift and ensure strategic alignment.

---  
*Data compiled from GitHub repository activity (2026-09-01). Project health: ⚠️ High activity, moderate risk (critical bugs pending fixes), strong roadmap focus.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-01**

---

### **1. Today's Overview**  
QwenPaw continues its rapid evolution toward a team-oriented AI agent platform, evidenced by 38 issues and 40 pull requests updated in the past 24 hours. The project is in a high-velocity beta phase (v2.2.0-beta.5), with two new releases focused on stability, memory management, and channel contract robustness. Community engagement remains strong, particularly around multi-user capabilities and integration flexibility. Despite a surge in bug reports—especially related to desktop performance, TLS stack issues, and session persistence—the core team is actively addressing critical path issues, signaling strong momentum ahead of a potential v2.2.0 stable release.

---

### **2. Releases**  
Two new beta releases were published:  
- **[v2.2.0-beta.5](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.5)**  
  - *Fixes*:  
    - `fix(channels)`: Contract checks now fully portable and complete across platforms (closes #7264, PR #7267).  
    - `fix(memory)`: Embedding reindexing is now explicit and scoped—no longer auto-triggered on config change (PR #7133).  
  - *Chore*: Version bumped to `2.2.0-beta.5` (PR #7438).  
- **[v2.2.0-beta.4](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.4)**  
  - *Fixes*:  
    - `fix(context)`: Limits oversized single-line tool outputs to prevent UI overflow (PR #7331).  
    - `test(agent-stats)`: Aligns test case TC-AGT-06 with current agent scope (PR #7021).  
    - `fix(desktop)`: Resolves minor inconsistencies in desktop build (partial fix).  

> 🔗 **Migration Note**: Users upgrading from `2.1.x` should verify that embedding reindexing is manually triggered after changing vector settings (due to PR #7133). No breaking changes reported in these releases.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #7438**: Version bump to `2.2.0b5` — essential for release coordination.  
- ✅ **PR #7267**: Fixed portability of channel contract checks — prevents silent failures on Windows.  
- ✅ **PR #7133**: Refactored embedding reindexing logic; improves system safety and user control.  
- ✅ **PR #7383**: Optimized plugin loading by avoiding full `sys.modules` sweeps on Windows — reduces startup latency.  
- ✅ **PR #7422**: CI now skips tests on draft PRs until marked "ready", improving pipeline efficiency.  

**Key Advances:**  
- Memory subsystem stability improved via explicit reindexing and better error handling.  
- Desktop startup performance is being optimized through reduced module scanning and event loop hygiene.  
- CI/CD pipeline now more responsive and less wasteful.

---

### **4. Community Hot Topics**  
Top community discussions reflect strategic shifts in QwenPaw’s identity:

- **#7318 [OPEN]**: *[Question] QwenPaw Hub, the multi-tenant edition, is coming in 2.2.0: what should we build next?*  
  🔗 [GitHub Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)  
  > **Summary**: The community is eager for team-based deployment features. This issue has 15 comments and represents a pivotal moment—QwenPaw is transitioning from personal assistant to enterprise-ready agent orchestration. Expect future versions to prioritize admin controls, role-based access, and shared skill libraries.

- **#7396 [OPEN]**: *[Question] Claude Code as a third-party agent harness — status and roadmap?*  
  🔗 [GitHub Issue #7396](https://github.com/agentscope-ai/QwenPaw/issues/7396)  
  > **Summary**: Users are requesting official support for Claude Code as a first-class agent harness. The fact that it’s “Coming soon” but not yet implemented suggests delayed integration despite strong demand. High interest indicates users want seamless interoperability with top-tier agent frameworks.

- **#7445 [OPEN]**: *[Bug] QwenPaw Hub fails to connect to local model service*  
  🔗 [GitHub Issue #7445](https://github.com/agentscope-ai/QwenPaw/issues/7445)  
  > **Summary**: Early adopters of QwenPaw Hub report connection failures to local APIs (e.g., `http://127.0.0.1:8088/v1`). This signals instability in the hub’s networking layer—critical for hybrid cloud/local deployments.

---

### **5. Bugs & Stability**  
Critical stability issues reported today include:

| Severity | Issue | Summary | Fix PR? |
|--------|------|---------|--------|
| ⚠️ **High** | [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) | QwenPaw Hub fails to connect to local model services (e.g., `127.0.0.1:8088`) | ❌ No fix yet |
| ⚠️ **High** | [#7420](https://github.com/agentscope-ai/QwenPaw/issues/7420) | Tool results lost + doom-loop protection triggers after `write_file` | ❌ No fix yet |
| ⚠️ **High** | [#7417](https://github.com/agentscope-ai/QwenPaw/issues/7417) | Console stream shows duplicated text chunks mid-stream | ❌ No fix yet |
| ⚠️ **Medium** | [#7408](https://github.com/agentscope-ai/QwenPaw/issues/7408) | Feishu channel config cleared unexpectedly → `KeyError('channel not found: feishu')` | ❌ No fix yet |
| ⚠️ **Medium** | [#7402](https://github.com/agentscope-ai/QwenPaw/issues/7402) | Empty `output_text` blocks poison downstream API calls (Volcengine Ark provider) | ❌ No fix yet |

> 📌 **Note**: Several high-severity bugs involve **state corruption**, **streaming inconsistency**, and **configuration loss**, indicating deeper systemic issues in session/state management. These may impact early adopters of Hub and Docker deployments.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven feature requests point to the next phase of QwenPaw’s development:

- **#7398 [Feature]**: Add `/btw [question]` command (like Claude Code) for side questions without polluting chat history.  
  🔗 [GitHub Issue #7398](https://github.com/agentscope-ai/QwenPaw/issues/7398)  
  > *Signal*: Users value contextual lightweight interaction—this will likely be included in v2.2.0 or v2.3.0.

- **#7436 [Feature]**: Add `tool_call_format` config to customize tool call display in IM channels (Feishu, DingTalk).  
  🔗 [GitHub Issue #7436](https://github.com/agentscope-ai/QwenPaw/issues/7436)  
  > *Signal*: Integration with enterprise messaging platforms requires richer formatting control—this is a must-have for business adoption.

- **#7405 [Question]**: Request to restore **Plan Mode** visibility (was removed in favor of mission/goal mode).  
  🔗 [GitHub Issue #7405](https://github.com/agentscope-ai/QwenPaw/issues/7405)  
  > *Signal*: While newer modes offer automation, users still value transparency in planning—expect a compromise between visibility and abstraction.

---

### **7. User Feedback Summary**  
Real-world pain points revealed through issues:

- **Desktop Performance**: Users report startup times exceeding **4 minutes** (Issue #7360), especially on Windows. Synchronous calls freezing the event loop (Issue #7363) confirm this is a systemic bottleneck.
- **TLS Stack Issues**: Open issue #7298 highlights a fundamental problem: bundled OpenSSL 3.0.x in Python 3.11 causes handshake resets under carrier DPI filtering—impacting both desktop and Docker users.
- **Session Persistence Failures**: Loop mode reset (Issue #7377) and empty message poisoning (Issue #7402) suggest fragile state management in long-running conversations.
- **Integration Friction**: Users struggle to integrate Aider CLI (Issue #7224) and Claude Code (Issue #7396), indicating gaps in documentation and API clarity.

> 💬 **Sentiment**: Mixed. Enthusiasm for QwenPaw Hub is high, but frustration mounts over stability, configuration reliability, and missing integrations.

---

### **8. Backlog Watch**  
Critical unaddressed issues requiring maintainer attention:

- **#7318 [OPEN]**: *What should we build next?* — This community-driven discussion is pivotal for shaping QwenPaw Hub. **Needs official response from maintainers** to guide development focus.  
  🔗 [GitHub Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)

- **#7445 [OPEN]**: *Hub fails to connect to local model service* — A showstopper for hybrid deployment use cases. **No fix or workaround provided** despite being reported on latest beta.  
  🔗 [GitHub Issue #7445](https://github.com/agentscope-ai/QwenPaw/issues/7445)

- **#7364 [CLOSED]**: *Zero-downtime reload reuses closed memory_manager* — Though closed, this bug caused permanent memory search failure. Indicates a need for deeper review of lifecycle management.  
  🔗 [GitHub Issue #7364](https://github.com/agentscope-ai/QwenPaw/issues/7364)

> 🛠️ **Recommendation**: Prioritize Hub connectivity and memory manager lifecycle fixes before finalizing v2.2.0. These are gatekeepers to enterprise adoption.

---

✅ **Project Health Assessment**: **Strong Momentum, High Risk in Stability**  
QwenPaw is clearly evolving into a powerful, multi-tenant agent platform. However, several high-severity bugs and integration gaps threaten early adoption. With active community input and consistent PR velocity, the project is on track—but stability and documentation must catch up to ambition.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-09-01**

---

### **1. Today's Overview**  
ZeroClaw remains in a high-intensity development phase, with **39 open issues** and **50 active pull requests** updated in the last 24 hours—indicating sustained momentum across architecture, security, and core runtime improvements. The project is prioritizing deep structural refinements, particularly around memory lifecycle, WASM plugin extensibility, and secure agent-to-agent (A2A) communication. While no new releases have been issued, the volume of RFCs and critical bug fixes signals an imminent release candidate cycle focused on stability, security hardening, and architectural clarity.

---

### **2. Releases**  
**None**  
No new versions were released in the past 24 hours. The absence of releases suggests that the team is focusing on stabilizing core changes ahead of a major update, likely targeting v0.8 or v0.9 in the coming weeks.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- **PR #10497** ([closed](https://github.com/zeroclaw-labs/zeroclaw/pull/10497)): Added lifetime controls for startup pairing codes (TTL + dead `pairing_dashboard` fields), closing a long-standing security gap from earlier pairing policy work.  
- **PR #10521** ([opened](https://github.com/zeroclaw-labs/zeroclaw/pull/10521)): Fixes `Config::default()` to honor `ZEROCLAW_CONFIG_DIR`, improving configuration consistency across environments.  

**Key Advancements:**  
- **PR #9324** (*feat(a2a)*): First phase of A2A outbound client implementation — introduces a shared v1.0 Serde wire model and default-closed `[a2a.client]` config, laying foundation for secure inter-agent tooling.  
- **PR #9220–9214** (eval stack): Expanded evaluation framework with live execution mode, failure transcript dumps, and sandboxed tool surface validation — enabling reproducible, auditable testing.  
- **PR #10402**: Added **Serply** as a first-class web search provider, expanding ZeroClaw’s real-time information access capabilities.

---

### **4. Community Hot Topics**  
The most active discussions center on **architectural evolution**, **security boundaries**, and **AI-assisted workflows**:

- **[RFC #6850: Decouple memory lifecycle from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** *(24 comments)*  
  → *Core need:* Establish a clean separation between durable data storage and dynamic lifecycle policies (e.g., retention, consolidation). This reflects growing complexity in managing agent state across distributed systems.

- **[RFC #9103: Separate authoritative memory storage from enrichment connectors](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)** *(17 comments)*  
  → *Underlying need:* Prevent overloading storage layers with optional, non-essential logic (e.g., AI-driven metadata enrichment). Critical for auditability and performance isolation.

- **[RFC #9330: AI-assisted PR pre-review](https://github.com/zeroclaw-labs/zeroclaw/issues/9330)** *(11 comments)*  
  → *Signal:* Formalizing AI-powered code review pipelines (currently running in pilot) — indicates confidence in AI’s role in quality assurance and developer productivity.

- **[PR #9324: A2A outbound client config & wire model](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)** *(no comment count, but XL size & risk level)*  
  → *Strategic shift:* Moving toward a standardized, interoperable agent-to-agent protocol — foundational for future multi-agent collaboration.

---

### **5. Bugs & Stability**  
Critical bugs reported today highlight risks in **config persistence**, **WASM plugin instantiation**, and **runtime behavior under load**:

| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) | **S0 (Data Loss)** | `Config::save()` can overwrite user config with near-empty file | ❌ No fix yet |
| [#10505](https://github.com/zeroclaw-labs/zeroclaw/issues/10505) | High | WASM plugin fails due to WIT version skew (`registered: 0`) | ❌ No fix yet |
| [#10506](https://github.com/zeroclaw-labs/zeroclaw/issues/10506) | High | Sequential `wasi:http` calls fail intermittently (stale connection) | ❌ No fix yet |
| [#10513](https://github.com/zeroclaw-labs/zeroclaw/issues/10513) | S2 | `RPC sops.run` returns run ID without actual execution | ❌ No fix yet |
| [#10061](https://github.com/zeroclaw-labs/zeroclaw/issues/10061) | S1 | Rejected image remains in history, poisons later turns | ✅ Fix PR pending (in progress) |

> ⚠️ **Notable Risk:** Multiple high-severity bugs relate to **runtime safety under concurrency** and **WASM ecosystem fragility**, suggesting instability in the plugin host layer.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging themes point to next-phase priorities:

- **Composable WASM Architecture** ([RFC #10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076))  
  → Request for typed extension points and replaceable providers. Likely to be prioritized in v0.9 for extensibility and modularity.

- **Verbatim Channel Send Without Agent Turn** ([RFC #10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050))  
  → Indicates demand for low-latency, direct channel messaging — critical for automation and integration use cases.

- **Opt-in Single-Tool Provider Rounds** ([RFC #10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222))  
  → Reflects desire for fine-grained control in interactive sessions — users want to avoid "batched" tool execution delays.

- **Desktop Screen Interaction Support** ([RFC #6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909))  
  → Signal of interest in human-in-the-loop automation (e.g., UI interaction, form filling).

---

### **7. User Feedback Summary**  
Real-world pain points are emerging from **local-first usage**, **configuration reliability**, and **tool integration**:

- **Local Model Mode**: Users report prompt bloat and leakage of internal system instructions ([Issue #5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)), indicating strong demand for a compact, privacy-preserving local profile.
- **Configuration Corruption**: The `Config::save()` bug (#10495) reveals trust issues in persistent state management — users fear losing custom setups.
- **WASM Plugin Reliability**: Errors like “no matching implementation” (#10505) frustrate developers building extensions, signaling a need for better version compatibility tooling.
- **ZeroCode UX Gaps**: Issues like missing TTS support in Matrix ([#10488](https://github.com/zeroclaw-labs/zeroclaw/issues/10488)) and ignored transcription settings ([#10486](https://github.com/zeroclaw-labs/zeroclaw/issues/10486)) show inconsistent cross-channel behavior.

---

### **8. Backlog Watch**  
Critical, long-standing issues requiring maintainer attention:

- **[RFC #6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)**: Decouple memory lifecycle — high-risk, high-impact; must be resolved before scaling memory-heavy agents.  
- **[RFC #9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)**: Storage vs. enrichment separation — central to future scalability and compliance.  
- **[Bug #10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495)**: Config corruption — poses existential risk to user data; requires immediate triage.  
- **[Bug #10505](https://github.com/zeroclaw-labs/zeroclaw/issues/10505)**: WASM version skew failures — blocks plugin ecosystem growth.  
- **[PR #9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)**: Secure model picker for Telegram — blocked, but essential for secure agent selection in enterprise use cases.

> 🔔 **Note:** Several high-priority RFCs remain in `needs-maintainer-review` status, suggesting potential bottlenecks in governance despite high community engagement.

---

**Project Health Score:** 🟡 **Moderate to High Risk**  
While innovation and community engagement are strong, technical debt in configuration handling, WASM reliability, and architectural clarity poses significant stability risks. Immediate focus on **security hardening**, **config integrity**, and **WASM robustness** is critical ahead of the next release.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*