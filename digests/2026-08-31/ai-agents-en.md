# OpenClaw Ecosystem Digest 2026-08-31

> Issues: 460 | PRs: 500 | Projects covered: 5 | Generated: 2026-08-31 15:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-08-31**

---

### **1. Today's Overview**  
OpenClaw remains highly active with a surge in developer engagement: **460 issues** and **500 pull requests** updated in the last 24 hours, indicating robust community participation and ongoing development momentum. The project is currently navigating a critical release cycle—**v2026.8.1**—which has triggered a wave of migration-related bugs, stability concerns, and urgent fix PRs. While core functionality continues to evolve, several high-severity regressions have emerged post-update, particularly around session state integrity, memory management, and config migration. This suggests that the current sprint prioritizes stabilization over feature delivery.

---

### **2. Releases**  
**✅ v2026.8.1** – Released today.  
[Release Notes](https://docs.openclaw.ai/releases/2026.8.1)  
**Key changes:**  
- Fixed critical `exec` tool abortion hang (PR #102006).  
- Resolved `agentSelectionRequiredError` flooding under explicit ownership.  
- Improved `doctor --fix` diagnostics for legacy exec approvals.  
- Added support for Telegram guest bots and bot-to-bot communication (per Issue #79077).  

**⚠️ Breaking Changes & Migration Notes:**  
- **Migration risks are high**: Multiple users report failed upgrades due to incomplete session migrations (#133347, #134055, #133984).  
- **Config key migrations skipped non-interactively**, leaving gateways unstartable after upgrade (#133984).  
- **Secrets redaction misbehavior**: Inline secrets replaced with `__OPENCLAW_REDACTED__` in runtime config (#134169).  
> 🔧 **Update Guidance**: If auto-updates fail, use a local coding harness to verify Gateway startup and diagnose migration errors. Back up config before upgrading.

---

### **3. Project Progress**  
**✅ Merged / Closed PRs (Today):**  
- **PR #134232** (`ci: remove redundant image readiness queue hops`) – Optimized CI pipeline performance.  
- **PR #123535** (`fix(ui): avoid session catalog refresh storms`) – Prevented UI flickering during focus events.  
- **PR #123975** (`fix(scripts): clean up tsgo process trees`) – Improved process cleanup on timeouts/signal.  
- **PR #125471** (`fix(models): keep Claude CLI OAuth available in Control UI`) – Restored OAuth persistence after restarts.  

**🛠️ Key Fixes Advanced:**  
- Session state consistency: PRs like #134111 (model fallback availability) and #130563 (subagent finalization) address long-standing workflow issues.  
- CLI usability: PRs #134212 (remove inert flag) and #128223 (alias resolution) improve command clarity and reliability.

---

### **4. Community Hot Topics**  
Top 5 most discussed Issues (by comments/reactions):  

| Issue | Severity | Summary | Link |
|------|----------|--------|------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 🦞 Diamond Lobster (P1) | Gateway memory leak: RSS grows from 350MB → 15.5GB, causing OOM crashes | [Issue #91588](https://github.com/openclaw/openclaw/issues/91588) |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | 🐚 Platinum Hermit (P1) | Embedded prompt cache breaks across session boundaries, leading to model confusion | [Issue #102175](https://github.com/openclaw/openclaw/issues/102175) |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | 🐚 Platinum Hermit (P1) | WhatsApp inbound images wedge main lane for ~3 minutes before processing | [Issue #96834](https://github.com/openclaw/openclaw/issues/96834) |
| [#133347](https://github.com/openclaw/openclaw/issues/133347) | 🦞 Diamond Lobster (P1) | 2026.8.1 migration quarantines valid cron jobs as invalid-schedule | [Issue #133347](https://github.com/openclaw/openclaw/issues/133347) |
| [#134169](https://github.com/openclaw/openclaw/issues/134169) | 🦐 Gold Shrimp (P1) | Secrets replaced with `__OPENCLAW_REDACTED__` in runtime config post-migration | [Issue #134169](https://github.com/openclaw/openclaw/issues/134169) |

**Underlying Needs:**  
- **Stability at scale**: Users demand reliable long-running sessions without memory leaks or message loss.  
- **Migration safety**: The v2026.8.1 rollout exposed deep flaws in config/state migration logic—users expect zero-downtime updates.  
- **Consistent UX**: Inconsistent behavior across channels (e.g., WhatsApp vs Telegram media allowlists) frustrates multi-platform deployments.

---

### **5. Bugs & Stability**  
**🚨 Critical Bugs Reported Today (Rank by Severity):**  

| Bug | Impact | Fix PR? | Link |
|-----|--------|--------|------|
| Memory leak: RSS → 15.5GB (Issue #91588) | Crash-loop, OOM | ❌ No | [Issue #91588](https://github.com/openclaw/openclaw/issues/91588) |
| Secret redaction corrupts runtime config (Issue #134169) | Auth failure, security risk | ❌ No | [Issue #134169](https://github.com/openclaw/openclaw/issues/134169) |
| Cron job migration drops inventory (Issue #133347) | Data loss, automation failure | ❌ No | [Issue #133347](https://github.com/openclaw/openclaw/issues/133347) |
| Agent session DB migration lacks ANALYZE (Issue #119884) | 15–57s event-loop starvation | ❌ No | [Issue #119884](https://github.com/openclaw/openclaw/issues/119884) |
| WhatsApp image wedging (Issue #96834) | Message delay, user frustration | ❌ No | [Issue #96834](https://github.com/openclaw/openclaw/issues/96834) |

> ⚠️ **Note**: Despite high activity, **no fix PRs exist** for the top 5 critical issues. This indicates a gap between bug reporting and actionable fixes.

---

### **6. Feature Requests & Roadmap Signals**  
Top emerging signals for future releases:  

| Feature | User Demand | Status | Link |
|-------|-------------|--------|------|
| Built-in headless browser (Issue #53763) | Reliable web access without external deps | ✅ High demand (8 👍) | [Issue #53763](https://github.com/openclaw/openclaw/issues/53763) |
| Telegram guest bot & bot-to-bot mode (Issue #79077) | Native support for new Telegram features | ✅ Already in 2026.8.1 | [Issue #79077](https://github.com/openclaw/openclaw/issues/79077) |
| Topic-session families (Issue #90916) | Isolated context lanes per assistant | ✅ Stable request | [Issue #90916](https://github.com/openclaw/openclaw/issues/90916) |
| i18n support for slash commands (Issue #79458) | Non-English user experience | ✅ Low friction, high impact | [Issue #79458](https://github.com/openclaw/openclaw/issues/79458) |
| Session-level process events (Issue #52826) | Structured progress tracking | ✅ Needed for real-time systems | [Issue #52826](https://github.com/openclaw/openclaw/issues/52826) |

> 📌 **Prediction**: v2026.9.0 will likely include **headless browser**, **topic-session families**, and **i18n improvements**, based on user volume and maintainers’ recent PR activity.

---

### **7. User Feedback Summary**  
Real pain points from issue descriptions:  
- **"My gateway crashes daily due to memory growth"** (#91588) – Indicates poor resource management in long-lived agents.  
- **"After update, my automation jobs vanished"** (#133347) – Reflects distrust in migration tools; users fear data loss.  
- **"I can’t send images on WhatsApp anymore"** (#96834) – Direct UX impact affecting core use case.  
- **"My Discord bot token disappeared after upgrade"** (#134169) – Highlights security configuration fragility.  
- **"Sessions mix up across threads"** (#134055) – Undermines trust in agent isolation.  

> 💬 **Sentiment**: High frustration with **migration reliability** and **post-update stability**, despite strong feature adoption. Users value robustness over novelty.

---

### **8. Backlog Watch**  
Critical, long-unanswered Issues needing maintainer attention:  

| Issue | Severity | Age | Status | Link |
|------|----------|-----|--------|------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 🦞 Diamond Lobster | 10 weeks | Open, no fix PR | [Issue #91588](https://github.com/openclaw/openclaw/issues/91588) |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | 🐚 Platinum Hermit | 8 weeks | Open, needs live repro | [Issue #102175](https://github.com/openclaw/openclaw/issues/102175) |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | 🐚 Platinum Hermit | 7 weeks | Open, needs live repro | [Issue #96834](https://github.com/openclaw/openclaw/issues/96834) |
| [#134169](https://github.com/openclaw/openclaw/issues/134169) | 🦐 Gold Shrimp | 1 day | Open, high impact | [Issue #134169](https://github.com/openclaw/openclaw/issues/134169) |
| [#133984](https://github.com/openclaw/openclaw/issues/133984) | 🦞 Diamond Lobster | 1 day | Open, unstartable after upgrade | [Issue #133984](https://github.com/openclaw/openclaw/issues/133984) |

> ⏳ **Urgency**: These issues represent systemic risks to production deployments. Immediate triage recommended.

---

**🔍 Final Assessment**: OpenClaw is **highly active but under pressure**. The 2026.8.1 release introduced significant improvements but also revealed deep architectural fragilities in migration, memory, and session state. While community engagement is strong, **stability and trust are eroding**. The next 2–4 weeks will determine whether OpenClaw can pivot from “feature-rich” to “production-ready.”

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Open-Source Ecosystem – 2026-08-31**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem is entering a pivotal phase of maturation, marked by rapid architectural evolution, increasing focus on production-grade reliability, and growing divergence in technical specialization. Projects are moving beyond feature velocity toward foundational stability, with strong community engagement driving demand for secure, scalable, and predictable agent behavior. While OpenClaw leads in feature breadth and user adoption, emerging players like ZeroClaw and IronClaw are redefining core abstractions around modularity, security, and UX consistency. The landscape reflects a clear shift from experimentation to deployment readiness—especially in enterprise and multi-channel environments.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Release Status | Health Score |
|--------|------------------|----------------|----------------|--------------|
| **OpenClaw** | 460 | 500 | ✅ v2026.8.1 released | ⚠️ **Under Pressure** |
| **Hermes Agent** | 50 | 50 | ❌ No release since v0.20.5 | ✅ **Healthy & Active** |
| **IronClaw** | 16 | 16 | ❌ No release | ✅ **Healthy & Growing** |
| **QwenPaw** | 34 | 39 | ✅ v2.2.0-beta.5 released | ⚠️ **Stable but Under Pressure** |
| **ZeroClaw** | 46 | 50 | ❌ No release | ✅ **Strong but Under Pressure** |

> *Health Score based on stability, fix velocity, security hygiene, and community trust signals.*

---

### **3. OpenClaw's Position**  
OpenClaw stands as the most active and widely adopted project in the ecosystem, with **~90% of total issue/PR volume across all five projects**, reflecting its dominant community size and feature-rich roadmap. Its technical approach emphasizes **broad channel support, deep integration with external tools (e.g., Telegram bots), and aggressive versioning cycles**—making it ideal for developers seeking plug-and-play functionality. However, this comes at the cost of higher instability risk, particularly during migrations (e.g., v2026.8.1). Compared to peers:
- **vs. Hermes Agent**: OpenClaw has larger scale but weaker post-update stability.
- **vs. IronClaw**: OpenClaw prioritizes usability over design system maturity; IronClaw excels in UI/UX governance.
- **vs. QwenPaw**: OpenClaw offers more enterprise-grade tooling but lags in desktop startup performance and TLS hygiene.
- **vs. ZeroClaw**: OpenClaw lacks ZeroClaw’s focus on zero-trust runtime architecture and WASM plugin extensibility.

Despite high activity, OpenClaw’s leadership is under strain due to unresolved critical bugs and migration fragility—highlighting a trade-off between speed and reliability.

---

### **4. Shared Technical Focus Areas**  
Across all projects, several systemic challenges are emerging as cross-cutting concerns:

| Requirement | Affected Projects | Specific Needs |
|-----------|-------------------|----------------|
| **Session State Integrity** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Prevent data loss across restarts, ensure consistent context isolation, avoid silent corruption |
| **Memory & Resource Management** | OpenClaw, Hermes Agent, QwenPaw | Mitigate memory leaks (RSS → 15.5GB), prevent event-loop blocking, reduce startup latency |
| **Migration & Upgrade Safety** | OpenClaw, QwenPaw, ZeroClaw | Ensure zero-downtime upgrades, preserve config state, avoid data loss (e.g., cron jobs, secrets) |
| **Security & Trust Boundaries** | ZeroClaw, Hermes Agent, QwenPaw | Fix TLS stack vulnerabilities, align plugin trust models, prevent silent failures in auth |
| **Configuration Persistence & UX Consistency** | QwenPaw, OpenClaw, ZeroClaw | Persist loop mode, theme, channel settings; avoid reset after restart or upgrade |

These patterns indicate a **universal need for resilience in long-running, multi-user, multi-platform agent systems**—a signal that the next generation of agents must be built with production-grade guarantees from day one.

---

### **5. Differentiation Analysis**

| Aspect | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|------|----------|--------------|----------|---------|----------|
| **Primary Focus** | Feature completeness, multi-channel integration | Stability, long-lived process resilience | Design system maturity, DX, schema fidelity | Cross-platform usability, memory safety | Runtime modularity, security, extensibility |
| **Target Users** | Enterprise teams, integrators, power users | Developers, DevOps, CI/CD pipelines | Designers, frontend engineers, product teams | Desktop users, early adopters | Security-conscious devs, compliance-driven orgs |
| **Technical Architecture** | Monolithic gateway + modular executors | Lightweight CLI + session persistence | Component-driven UI + Storybook governance | Tauri-based desktop bundles + plugin system | WASM-first runtime + sandboxed plugins |
| **Innovation Edge** | Bot-to-bot communication, Telegram guest bots | Silent failure diagnostics, auto-compaction | Model capability icons, schema validation | ReMe Auto Fin, third-party harnesses | SD-JWT verification, lifetime-controlled pairing codes |

This divergence shows a **fragmentation into specialized niches**: OpenClaw dominates integration, ZeroClaw leads in security, IronClaw in design, Hermes in stability, and QwenPaw in desktop experience.

---

### **6. Community Momentum & Maturity**  

| Tier | Projects | Characteristics |
|------|----------|-----------------|
| **Rapid Iteration** | OpenClaw, QwenPaw, ZeroClaw | High PR/issue volume; frequent beta releases; experimental features (e.g., WASM, headless browser) |
| **Stabilization Phase** | Hermes Agent, IronClaw | No new releases, but high-quality fixes via salvage chains; focus on reliability, diagnostics, and dependency hygiene |
| **Pre-Release Architectural Shift** | ZeroClaw, IronClaw | Heavy RFC activity, design system phases, and foundational refactoring—indicating mature planning ahead of shipping |

> 🔍 **Key Insight**: OpenClaw and QwenPaw are in **feature-expansion mode**, while Hermes Agent and IronClaw are transitioning into **production-hardening mode**. ZeroClaw is uniquely positioned at the **design-implementation inflection point**, shaping the future of agent runtime architecture.

---

### **7. Trend Signals**  
Based on community feedback and PR trends, the following industry-wide shifts are emerging:

1. **From "Feature-Rich" to "Trust-First" Development**  
   - Users increasingly prioritize **migration safety**, **session integrity**, and **config persistence** over new features.  
   - Example: OpenClaw’s v2026.8.1 rollout caused widespread distrust despite improvements.

2. **Demand for Zero-Trust, Pluggable Runtimes**  
   - ZeroClaw’s RFCs on WASM plugins, filesystem restrictions, and sandbox policies signal a move toward **composable, auditable agent platforms**—critical for enterprise adoption.

3. **UX Consistency Across Channels**  
   - Multiple projects report frustration with inconsistent behavior (e.g., WhatsApp vs Telegram media handling, Feishu tool rendering).  
   - This drives demand for **unified attachment architectures** and **cross-channel UX frameworks**.

4. **Developer Experience (DX) as a Competitive Lever**  
   - IronClaw’s Storybook governance, QwenPaw’s theming requests, and Hermes Agent’s diagnostic clarity show that **tooling quality** now rivals functional capabilities.

5. **Security Hygiene as Non-Negotiable**  
   - OpenSSL 3.0.x issues, GPL license risks, and certificate trust gaps are being reported across projects—indicating that **security must be baked into the build pipeline**, not bolted on.

> 💡 **Value for Developers**: The next wave of successful AI agents will be defined not by model access or tool count, but by **predictability, auditability, and operational resilience**—especially in long-running, distributed workflows.

---

### **Conclusion**  
The personal AI agent ecosystem is no longer just about innovation—it’s about **trust at scale**. OpenClaw remains the de facto standard for feature depth, but its recent instability highlights a critical inflection point: **technical ambition must be matched by operational rigor**. Meanwhile, ZeroClaw, IronClaw, and Hermes Agent are laying the groundwork for a new era of secure, composable, and resilient agents. For developers, the choice is evolving: **choose OpenClaw for speed, ZeroClaw for security, IronClaw for design, Hermes for stability, and QwenPaw for desktop polish**—but always with an eye on long-term maintainability.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-08-31**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pipeline of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across stability, security, and feature refinement. A notable surge in critical bugs—particularly around Linux desktop launch failures, session state corruption, and gateway crashes—suggests ongoing focus on reliability in production environments. Despite no new releases, multiple high-priority fixes are being rapidly integrated via salvage PRs, signaling strong triage discipline. The community is actively engaged, especially in addressing compatibility, cross-platform usability, and long-running process resilience.

---

### **2. Releases**  
❌ **No new releases** were published today.  
There has been **no release since v0.20.5 (2026.8.19)**, and no version announcements or changelogs have been issued. This implies that recent fixes are being prioritized for inclusion in an upcoming stable release, likely v0.20.6 or v0.21.0, pending integration of key PRs.

---

### **3. Project Progress**  
✅ **10 merged/closed PRs** today, primarily focused on **crisis mitigation and stability fixes**:

- **PR #99514**: Fixes hygiene retry livelock after commit-fence cancel — critical for context compression integrity.
- **PR #99522**: Resolves stale cron ticker issue by yielding tick to fresh gateway — prevents silent job failures.
- **PR #99506**: Bounds `env.execute` wait time to prevent event-loop thread wedging — avoids 4k+ second hangs.
- **PR #99512**: Improves TUI feedback during auto-compaction — resolves silent blocking UX.
- **PR #99509**: Adds self-healing for SessionDB writes post-close() race — stabilizes concurrent subagent workflows.
- **PR #99513**: Consolidates state.db corruption detection & healing logic — addresses persistent data integrity concerns.
- **PR #99481**: Preinstalls `libatomic1` and reports failed Node.js startup — improves install robustness on Debian/Ubuntu.
- **PR #99505**: Prevents adoption of pre-release Node.js builds — enhances dependency safety.
- **PR #99482**: Stops CLI from building `node-pty` — reduces unnecessary build overhead.
- **PR #99520**: Fixes dashboard loopback backend gating — resolves WebSocket token rejection boot loops.

These PRs reflect a **strong focus on system resilience**, particularly in **long-lived processes, cron jobs, and session persistence**.

---

### **4. Community Hot Topics**  
🔥 **Top 3 Most Active Issues** (by comments, severity, and impact):

1. **[Issue #51327]** – *Linux Desktop silently fails due to missing `chrome-sandbox` setuid*  
   🔗 [GitHub #51327](https://github.com/nousresearch/hermes-agent/issues/51327)  
   - **16 comments**, P1, security boundary risk.  
   - **Core need**: Reliable desktop launch on Linux; users expect visible error if app fails. Silent failure undermines trust.

2. **[Issue #94248]** – *Gateway SIGSEGV on macOS arm64 after delegate deadline (600s)*  
   🔗 [GitHub #94248](https://github.com/nousresearch/hermes-agent/issues/94248)  
   - **11 comments**, P1, crash risk.  
   - **Underlying need**: Stability in long-running gateways on Apple Silicon; user reports 12 crashes in 5 days.

3. **[Issue #94058]** – *Desktop launcher broken after upgrade due to symlinked Python in venv*  
   🔗 [GitHub #94058](https://github.com/nousresearch/hermes-agent/issues/94058)  
   - **11 comments**, P1, compatibility risk.  
   - **Pattern**: Repeated issues with `uv`-managed venvs — highlights growing dependency on modern tooling.

💡 **Trend**: Users are reporting **silent failures, crashes under load, and installer breakage** — all pointing to deeper needs in **user-facing diagnostics, robustness in non-standard environments (macOS arm64, uv venvs), and transparent error handling**.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs Reported (P1 Severity)**:

| Issue | Description | Fix PR? | Notes |
|------|-------------|--------|-------|
| [#51327](https://github.com/nousresearch/hermes-agent/issues/51327) | Linux `.desktop` launch fails silently if `chrome-sandbox` lacks `setuid(4755)` | ❌ | High visibility, affects all Linux users launching via GUI |
| [#94248](https://github.com/nousresearch/hermes-agent/issues/94248) | SIGSEGV in gateway after 600s delegate deadline (macOS arm64) | ❌ | Crash in production; 12 reports in 5 days |
| [#94058](https://github.com/nousresearch/hermes-agent/issues/94058) | Broken `Exec=` in `.desktop` file due to venv symlink | ❌ | Affects `uv` users; breaks KDE taskbar pinning |
| [#97905](https://github.com/nousresearch/hermes-agent/issues/97905) | Cron jobs fire at wrong times due to timezone drift | ❌ | Persistent config bug impacting automation |
| [#99477](https://github.com/nousresearch/hermes-agent/issues/99477) | Exponential message duplication during compression + drain | ✅ **PR #99513** | Already addressed in fix PRs |

⚠️ **High-Risk Patterns**:
- **Session state corruption** (`state.db`): Multiple reports (#98077, #97568, #98924) indicate systemic SQLite WAL mode risks.
- **File descriptor leaks**: `hermes serve` leaking FDs until `EMFILE` (issue #88033).
- **Memory corruption**: `SessionDB` reads from shared write connection without lock (issue #86516).

---

### **6. Feature Requests & Roadmap Signals**  
📌 **Emerging Priorities Based on User Demand**:

- **[Feature Request #52137]** – Add Russian (ru-RU) UI localization  
  🔗 [GitHub #52137](https://github.com/nousresearch/hermes-agent/issues/52137)  
  - **10 comments**, P3, i18n demand.  
  - Indicates growing global user base; French, Chinese, Portuguese already requested.

- **[Feature Request #97681]** – Bot Group Chats should persist after Desktop closes  
  🔗 [GitHub #97681](https://github.com/nousresearch/hermes-agent/issues/97681)  
  - **8 comments**, P2, innovation.  
  - Strong signal: users want **persistent bot collaboration** across devices — foundational for enterprise use.

- **[Feature Request #98307]** – Complete Group Chat continuity (files, control, handoffs)  
  🔗 [GitHub #98307](https://github.com/nousresearch/hermes-agent/pull/98307)  
  - **Open**, P3, needs-decision.  
  - Likely to be prioritized in next major release as it enables **multi-device workflow continuity**.

👉 **Prediction**: The next version (v0.21.0) will likely include **i18n support (ru-RU, fr-FR)**, **persistent group chat features**, and **enhanced session resilience**.

---

### **7. User Feedback Summary**  
💬 **Key Pain Points Expressed by Users**:

- **Silent failures**: Launching via `.desktop` icon does nothing — no error, no log. Users feel helpless (issues #51327, #94058, #94110).
- **Crashes in long-running gateways**: Especially on macOS arm64 — users lose work mid-session (issue #94248).
- **Broken upgrades**: After `hermes update`, launcher stops working — common with `uv` venvs (issue #94058).
- **Poor diagnostics**: Errors like `returned NULL without setting an exception` are cryptic and hard to debug (issue #85079).
- **Inconsistent behavior**: Same config works via CLI but fails via gateway (issue #90835).

✅ **Positive Signals**:
- Users appreciate **rapid response to bugs** (e.g., multiple PRs salvaged within 24h).
- Strong engagement in **feature design discussions** (e.g., #97681, #98307).

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered Critical Issues Needing Attention**:

| Issue | Status | Priority | Why It Matters |
|------|--------|----------|----------------|
| [#57275](https://github.com/nousresearch/hermes-agent/issues/57275) | Open | P1 | Always exceeds context limits → model crashes. Core AI agent stability issue. |
| [#79742](https://github.com/nousresearch/hermes-agent/issues/79742) | Closed | P1 | Long-lived SessionDB leaks read connections → EMFILE exhaustion. High-risk in production. |
| [#86516](https://github.com/nousresearch/hermes-agent/issues/86516) | Open | P2 | Four read paths bypass locks → dirty reads. Security/consistency risk. |
| [#97648](https://github.com/nousresearch/hermes-agent/issues/97648) | Closed | P1 | Lean compression has no call budget → 877 LLM calls per attempt. Resource abuse risk. |
| [#99477](https://github.com/nousresearch/hermes-agent/issues/99477) | Open | P1 | Exponential message duplication — data loss risk. |

📌 **Recommendation**: Maintain dedicated triage effort for **session state, memory safety, and context management** — these are recurring themes across multiple P1 issues.

---

### ✅ **Final Assessment**  
Hermes Agent is **healthy and active**, with strong engineering responsiveness and deep community engagement. While **no new releases** were issued, the **quality of PRs and speed of fixes** (especially via salvage chains) demonstrates mature incident response. The project is navigating a **critical phase** where stability in long-running systems, session integrity, and cross-platform compatibility are paramount. The next release should prioritize **crash prevention, diagnostic clarity, and multi-device continuity** to meet evolving user demands.

> 📌 **Track All Issues & PRs**: [Hermes Agent GitHub](https://github.com/nousresearch/hermes-agent)

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# **IronClaw Project Digest — 2026-08-31**

---

### **1. Today's Overview**  
The IronClaw project remains highly active with a robust pipeline of development work, particularly in UI/UX design system evolution and core LLM tooling improvements. A flurry of PRs (16 updated in the last 24 hours) signals strong momentum, especially around the **Design System Phase 2–3 integration**, with multiple foundational changes to tokenization, Storybook governance, and visual regression testing. Despite no new releases, CI stability is being actively addressed—particularly in coverage checks and notification handling. The community continues to focus on performance optimization (e.g., GitHub repo response bloat) and schema integrity, indicating growing maturity in production-grade agent deployment.

---

### **2. Releases**  
❌ **No new releases** were published as of 2026-08-31.  
*Note: The absence of a release suggests that recent PRs are still in review or preview stages—likely preparing for v1.4.0, which aligns with Epic #7781’s scope.*

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- **PR #7995** ([fix(ci): stabilize main branch coverage checks](https://github.com/nearai/ironclaw/pull/7995)) – Resolved stale inbox notifications and isolated sandbox tests from transient network overrides, improving CI reliability.  
- **PR #7993** ([chore(deps): bump everything-else group](https://github.com/nearai/ironclaw/pull/7993)) – Updated 16 dependencies including `uuid`, `base64`, and `toml`.  
- **PR #7959** ([chore(deps): bump everything-else group](https://github.com/nearai/ironclaw/pull/7959)) – Another dependency update batch (15 packages), maintaining ecosystem hygiene.  

🔹 **Key Advancements:**  
- **Epic #7781 (Design System Phases 2–3)** is now progressing through integrated preview via **PR #8005** ([PREVIEW ONLY — Integration branch](https://github.com/nearai/ironclaw/pull/8005)), combining three sub-PRs into a unified testable app state.  
- **PR #7997** adds model capability icons across inference surfaces, enhancing UX clarity.  
- **PR #7998** introduces `list_model_catalog()` API, enabling provider-neutral model discovery while preserving legacy behavior.

---

### **4. Community Hot Topics**  
🔥 **Most Active Issue:**  
- **Issue #7038** ([CLOSED] Design System Phase 1 — Storybook integration & catalog) – *Re-scoped and closed after phase completion*. Though resolved, it set the foundation for ongoing work in Phases 2–5. [Link](https://github.com/nearai/ironclaw/issues/7038)

🔥 **Most Active PRs (by engagement potential):**  
- **PR #8005** ([PREVIEW ONLY — Epic #7781 phases 2–3 integrated](https://github.com/nearai/ironclaw/pull/8005)) – High visibility; serves as a staging ground for major UI/UX changes. Currently marked "do not merge" but critical for evaluation.  
- **PR #7996** ([perf(github): compact repository list responses](https://github.com/nearai/ironclaw/pull/7996)) – Addresses a high-impact performance issue reported in **Issue #7986**. Directly tackles data bloat in GitHub tooling.  
- **PR #7999** ([fix(llm): preserve flattened schema constraints](https://github.com/nearai/ironclaw/pull/7999)) – Fixes a silent data loss bug in `flatten_top_level` logic, directly responding to **Issue #7987**.

🔍 **Underlying Needs:**  
- **Performance at scale**: Users are increasingly sensitive to payload size and latency (e.g., GitHub repos returning 519KB for 98 items).  
- **Schema fidelity**: Developers demand predictable, transparent tool schema transformations—especially when constraints vanish silently.  
- **Visual consistency**: The Design System rollout reflects a strategic push toward brand coherence and developer experience (DX) maturity.

---

### **5. Bugs & Stability**  
🚨 **High Severity (Critical Impact):**  
- **Issue #7987** ([tool schemas: flatten_top_level rebuilds from a whitelist, silently discarding non-forbidden keys](https://github.com/nearai/ironclaw/issues/7987)) – **Silent data loss** in tool schema processing. Constraints like `title`, `$defs`, and `minProperties` are dropped without warning.  
  - ✅ **Fix in progress**: PR #7999 addresses this by removing only forbidden keywords instead of rebuilding from a whitelist.  
  - ⚠️ Risk: Could break agent logic if unpatched.

🚨 **Medium Severity (Performance Regressions):**  
- **Issue #7986** ([perf(github): list_repos ships 81 raw fields per repo — 519 KB for one listing](https://github.com/nearai/ironclaw/issues/7986)) – Excessive data transfer impacts agent efficiency and cost.  
  - ✅ **Fix in progress**: PR #7996 implements field projection to reduce payload to only model-relevant data.  
  - 📌 Context: This affects real-world use cases like “list my GitHub repos” — a common user task.

📌 **Stability Note:**  
- **Issue #8004** ([Daily ironclaw failure taxonomy — 2026-08-31](https://github.com/nearai/ironclaw/issues/8004)) reveals 44 failures in `officeqa` benchmark, primarily due to **model quality issues** (e.g., DeepSeek-V4-Flash navigation errors). Indicates that some failures lie beyond code control—highlighting need for better model monitoring and fallback strategies.

---

### **6. Feature Requests & Roadmap Signals**  
🎯 **Emerging Themes:**  
- **Enhanced model discoverability**: `list_model_catalog()` (PR #7998) signals a shift toward **provider-agnostic model metadata**—a key enabler for multi-provider agent orchestration.  
- **Visual-first DX**: The entire Design System initiative (Phases 1–5) reflects a strategic pivot toward **design system maturity**, with Storybook integration, token axes, and Chromatic lane support (PR #7831).  
- **Agent interaction modeling**: Epic #7782 (Design System Phases 4–5) hints at **agentic UI patterns**, suggesting future work on dynamic workflows, stateful interactions, and information architecture.

🔮 **Predicted Next Version (v1.4.0):**  
Likely to include:  
- Full **Design System Phase 3** (Gemini palette reskin, token alignment)  
- **Model catalog API** with full discovery capabilities  
- **Optimized tool payloads** (GitHub, etc.)  
- **Improved schema validation and diagnostics**

---

### **7. User Feedback Summary**  
💬 **Pain Points Reported:**  
- **Unpredictable schema behavior**: Users report that constraints vanish silently during tool schema flattening (Issue #7987), leading to hard-to-debug agent failures.  
- **Excessive data transfer**: Tools like `github.list_repos` return 81 unused fields, bloating memory and bandwidth usage—especially problematic in constrained environments.  
- **UI inconsistency**: Before the Design System rollout, developers faced fragmented styling and component reuse challenges.

💡 **Positive Signals:**  
- Strong engagement with **Storybook and DESIGN.md governance** (PR #7994, #7831) indicates growing appreciation for **structured, maintainable UI development practices**.  
- The emergence of **performance-focused PRs** (e.g., #7996) shows users are pushing for **production-ready efficiency**, not just feature velocity.

---

### **8. Backlog Watch**  
⚠️ **Longstanding Issues Needing Attention:**  
- **Issue #7042** ([Design System — Phase 2: DESIGN.md governance & guidelines](https://github.com/nearai/ironclaw/issues/7042)) – Part of Epic #7781, but lacks updates since August 3. Now tracked under #7781, but its governance documentation is critical for team alignment.  
- **Issue #7782** ([Epic: Design System Phases 4–5 — agentic interactions, components & IA](https://github.com/nearai/ironclaw/issues/7782)) – Split off from earlier epics, yet remains open with only 1 comment. Suggests delayed planning or prioritization for advanced UI patterns.  
- **Issue #8004** ([Daily failure taxonomy](https://github.com/nearai/ironclaw/issues/8004)) – While not a bug, it highlights recurring model-level failures. Requires triage and possibly integration with **agent health dashboards** or **failure alerting systems**.

🔧 **Action Items for Maintainers:**  
- Prioritize documentation for **DESIGN.md governance** (Issue #7042).  
- Schedule roadmap sync for **Phases 4–5** (Issue #7782) to avoid stagnation.  
- Consider auto-alerting on model QA failures (e.g., via `officeqa` runs).

---

> ✅ **Project Health Status**: **Healthy & Growing**  
> - High activity in both UI/UX and core infrastructure  
> - Strong focus on DX, performance, and correctness  
> - Clear roadmap progression with phased epics  
> - Minor risks mitigated via proactive PRs

📌 **Next Steps**: Prepare for v1.4.0 release candidate by stabilizing Epic #7781 integrations and resolving schema/data bloat issues.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-08-31**

---

### **1. Today's Overview**  
QwenPaw shows strong development momentum with 39 PRs and 34 issues updated in the last 24 hours, indicating active iteration across core components. The project is rapidly stabilizing around **v2.2.0-beta.5**, with recent releases focused on memory management, channel contract robustness, and TLS/dependency hygiene. High engagement in both bug reports and feature proposals suggests growing user adoption and deepening use cases. However, several critical stability issues—especially related to desktop startup latency, event loop blocking, and dependency vulnerabilities—are emerging as significant pain points.

---

### **2. Releases**  
Two new beta releases were published:  
- **[v2.2.0-beta.5](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.5)**  
  - ✅ **Fixed**: Portable and complete contract checks (`fix(channels)`)  
  - ✅ **Fixed**: Explicit and scoped embedding reindexing (`fix(memory)`)  
  - 🛠️ **Chore**: Version bump  

- **[v2.2.0-beta.4](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.4)**  
  - ✅ **Fixed**: Oversized tool results bounded in context (`fix(context)`)  
  - ✅ **Fixed**: Test case alignment with current agent scope (`test(agent-stats)`)  
  - ✅ **Fixed**: Desktop UI unification (`fix(desktop)`)  

> 🔗 *No breaking changes reported; migration path remains smooth for users upgrading from v2.1.x.*

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- [#7267](https://github.com/agentscope-ai/QwenPaw/pull/7267): Fixed channel contract checks to be portable and complete — resolves a key regression risk on Windows.  
- [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133): Made embedding reindexing explicit and scoped — improves memory safety and avoids silent failures during config changes.  
- [#7421](https://github.com/agentscope-ai/QwenPaw/pull/7421): Restored protobuf decoding compatibility with v6+ — fixes a silent failure in Yuanbao backend.  
- [#7383](https://github.com/agentscope-ai/QwenPaw/pull/7383): Optimized plugin loading by avoiding full `sys.modules` sweep — reduces Windows startup overhead.  
- [#7422](https://github.com/agentscope-ai/QwenPaw/pull/7422): Skips test runs on draft PRs until marked ready — improves CI efficiency.  

These merges reflect a focus on **stability, performance, and developer experience**, particularly around cross-platform reliability and runtime health.

---

### **4. Community Hot Topics**  
Top community discussions highlight real-world usability challenges:  
- **[#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298)**: *Desktop & Docker bundles ship OpenSSL 3.0.x-era TLS stack* (9 comments)  
  → Critical issue affecting carrier DPI environments; users report handshake resets. No fix yet.  
- **[#7420](https://github.com/agentscope-ai/QwenPaw/issues/7420)**: *Tool results lost + command re-dispatched after `write_file` triggers doom-loop protection* (7 comments)  
  → Reproducible stall post-upgrade (v2.1 → v2.2.0b1); likely due to state mismanagement in task lifecycle.  
- **[#7377](https://github.com/agentscope-ai/QwenPaw/issues/7377)**: *Loop mode not persisted in console UI* (5 comments)  
  → Users expect configuration persistence across sessions; currently resets to default.  
- **[#7431](https://github.com/agentscope-ai/QwenPaw/issues/7431)**: *Codex harness returns empty responses when backend doesn’t stream* (1 comment)  
  → Affects third-party agent integration; indicates need for better fallback handling in non-streaming providers.

> 💡 **Underlying Need**: Users demand **predictable, persistent behavior** in UI and agent execution, especially during upgrades and complex workflows.

---

### **5. Bugs & Stability**  
**Critical Stability Issues (High Severity):**  
1. **[#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298)**: OpenSSL 3.0.x TLS stack in bundled runtime → handshake failures under carrier DPI.  
   - ❌ *No fix PR yet.*  
   - Impact: Blocks deployment in enterprise or mobile networks.  
2. **[#7420](https://github.com/agentscope-ai/QwenPaw/issues/7420)**: Doom-loop triggered after `write_file`, causing stalls.  
   - ❌ *No fix PR yet.*  
   - Impact: Renders agent unusable post-upgrade; high friction for early adopters.  
3. **[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)**: Synchronous calls freeze event loop and timeout fails.  
   - ⚠️ *Reported in v2.1.1b1; no fix PR yet.*  
   - Impact: Desktop becomes unresponsive for over 2 minutes on startup/message send.  

**Moderate/Recurring Bugs:**  
- [#7408](https://github.com/agentscope-ai/QwenPaw/issues/7408): Feishu channel config cleared unexpectedly → `KeyError('channel not found: feishu')`.  
- [#7417](https://github.com/agentscope-ai/QwenPaw/issues/7417): Console streams duplicate text chunks mid-output.  
- [#7402](https://github.com/agentscope-ai/QwenPaw/issues/7402): Empty `output_text` blocks poison session history → upstream API errors.

> ⚠️ **Trend**: Multiple issues point to **state management flaws**, **event loop misuse**, and **incomplete configuration persistence**.

---

### **6. Feature Requests & Roadmap Signals**  
Top requested features indicate user desire for **enhanced UX, workflow control, and extensibility**:  
- **[#7398](https://github.com/agentscope-ai/QwenPaw/issues/7398)**: Add `/btw [question]` side-question command (like Claude Code).  
  → High signal: mimics popular AI tools; enables private thinking without cluttering chat.  
- **[#7436](https://github.com/agentscope-ai/QwenPaw/issues/7436)**: Add `tool_call_format` config for compact IM display.  
  → Direct feedback on channel UX; users want cleaner tool call rendering in Feishu/DingTalk.  
- **[#7406](https://github.com/agentscope-ai/QwenPaw/issues/7406)**: Add official theming support (accent color, font, spacing).  
  → Long-standing UI lock-in complaint; users resort to manual bundle edits.  
- **[#7396](https://github.com/agentscope-ai/QwenPaw/issues/7396)**: Status update on Claude Code third-party agent harness.  
  → Indicates strong interest in integrating top-tier agents beyond built-in ones.

> 📌 **Prediction**: These features are likely to appear in **v2.3.0** or **v2.2.1** as part of a broader UX polish wave.

---

### **7. User Feedback Summary**  
Users are highly engaged but frustrated by:  
- **Unpredictable agent behavior** after upgrades (e.g., v2.2.0b1 stalling).  
- **Poor configurability**: Loop mode, theme, and workspace settings don’t persist.  
- **Lack of control** over output formatting (e.g., verbose tool calls in Feishu).  
- **Hidden technical debt**: Users report cryptic errors like “empty response” or “no model available” with no diagnostic clarity.  
- **High customization effort**: Workarounds like editing `.app` bundles or manually patching `agent.json` suggest a lack of accessible configuration APIs.

> ✅ **Satisfaction**: Positive sentiment toward new features like ReMe Auto Fin, third-party agent harnesses, and improved memory management.  
> ❌ **Dissatisfaction**: Core stability, startup time, and UX consistency remain major hurdles.

---

### **8. Backlog Watch**  
**Longstanding Issues Needing Maintainer Attention:**  
- **[#7360](https://github.com/agentscope-ai/QwenPaw/issues/7360)**: QwenPaw Desktop startup takes ~4 minutes (247s).  
  → Still open; logs show massive sync-blocking in `bootstrap_plugins()` on Windows.  
- **[#7430](https://github.com/agentscope-ai/QwenPaw/issues/7430)**: Linux Tauri uses vulnerable `glib 0.18.5` (GHSA-wrw7-89jp-8q8g).  
  → Security risk; only affects Linux builds. Needs urgent upgrade.  
- **[#7428](https://github.com/agentscope-ai/QwenPaw/issues/7428)**: GPL Pylint provider bundled despite being disabled by default.  
  → Legal/compliance concern; avoidable if excluded from runtime deps.  
- **[#7426](https://github.com/agentscope-ai/QwenPaw/issues/7426)**: Creator UI has 5 known vulnerabilities (3 high).  
  → Risky for production use; needs immediate audit and patching.  
- **[#7424](https://github.com/agentscope-ai/QwenPaw/issues/7424)**: Website lockfile resolves 86 vulnerable dependencies (18 high).  
  → Public-facing site at risk; requires urgent remediation.

> 🔔 **Action Required**: These should be prioritized in the next sprint to prevent security incidents and maintain trust.

---

**Project Health Score**: ⚠️ **Stable but Under Pressure**  
While QwenPaw is advancing quickly with new features and robust fixes, unresolved stability issues and growing dependency risks threaten long-term adoption. Immediate attention to startup performance, TLS stack, and security hygiene is critical.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest — 2026-08-31**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active with a robust momentum in design and implementation. Over the past 24 hours, **46 new issues** and **50 pull requests** were opened or updated, indicating intense focus on architectural refinement, security hardening, and user-facing improvements. The ecosystem is undergoing significant evolution in core runtime architecture, particularly around memory management, plugin extensibility, and secure session handling. Despite no new releases, the high volume of RFCs (11 in progress) and critical bug fixes signals that the project is in a pre-release stabilization phase, prioritizing foundational integrity ahead of versioned shipping.

---

### **2. Releases**  
🔹 *No new releases detected.*  
The project maintains an ongoing development cadence without formal versioning updates. This aligns with the current focus on deep architectural changes—particularly around WASM plugins, memory lifecycle, and sandbox policies—that would require careful coordination and backward compatibility planning before release.

---

### **3. Project Progress**  
✅ **Merged/Completed PRs (Today):**  
- **[PR #9963](https://github.com/zeroclaw-labs/zeroclaw/pull/9963)** – Added `resolve_disclosures` functionality for SD-JWT verification, enhancing identity proofing in secure workflows.  
- **[PR #10497](https://github.com/zeroclaw-labs/zeroclaw/pull/10497)** – Closed: Implemented lifetime controls for pairing codes (TTL, dead dashboard fields), completing prior security policy work.  

🔧 **Key Advances:**  
- **[PR #10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468)** – Fixed ACP session visibility in tools by exposing owned sessions via `AcpSessionStore`, resolving a long-standing usability gap.  
- **[PR #10491](https://github.com/zeroclaw-labs/zeroclaw/pull/10491)** – Security fix: Plugin HTTPS now trusts OS-level certificate stores (aligned with provider behavior), closing a critical trust boundary gap.  
- **[PR #10518](https://github.com/zeroclaw-labs/zeroclaw/pull/10518)** – Fixed Rust 1.98 lint (`drain_collect`) to unblock toolchain upgrades.  
- **[PR #10517](https://github.com/zeroclaw-labs/zeroclaw/pull/10517)** – Docs: pinned mdBook 0.5.4 for consistent rendering and image zoom support.  

These efforts reflect strong engineering discipline in maintaining stability while pushing forward complex security and UX enhancements.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement (Comments >10):**  
| Issue | Summary | Comments | Link |
|------|--------|----------|------|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | **RFC: Runtime-owned conversation sessions & transport adapters** | 28 | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | **RFC: Decouple memory lifecycle from storage backends** | 23 | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | **RFC: Unified attachment architecture for web/chat channels** | 22 | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) |

📌 **Underlying Needs:**  
- **Modularization of runtime state** (e.g., sessions, memory, transport) to enable pluggable, secure, and composable architectures.  
- **Clear separation between data persistence and policy enforcement**, especially as ZeroClaw scales across agents, providers, and channels.  
- **Unified UX layer for attachments and media**, crucial for expanding cross-channel consistency (web, Discord, Telegram).

💡 These RFCs are shaping the future of ZeroClaw’s **core abstraction boundaries**, signaling a shift toward a more resilient, maintainable, and extensible system.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs (Severity S0–S1):**  
| Issue | Severity | Summary | Fix Status | Link |
|------|----------|--------|------------|------|
| [#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) | **S0 (Data Loss / Security Risk)** | `Config::save()` overwrites populated `config.toml` with near-empty file | ✅ **Fix PR open**: #10513 (RPC issue) | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) |
| [#10513](https://github.com/zeroclaw-labs/zeroclaw/issues/10513) | **S2 (Degraded Behavior)** | `sops.run` returns run ID for non-executing step | 🔧 **PR pending**: #10513 (fixes RPC logic) | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/10513) |
| [#10061](https://github.com/zeroclaw-labs/zeroclaw/issues/10061) | **S1 (Workflow Blocked)** | Rejected vision images poison later text-only turns | 🛠️ **PR in review**: #10468 (session tool exposure) | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/10061) |

⚠️ **Other Notable Bugs:**  
- [#9905](https://github.com/zeroclaw-labs/zeroclaw/issues/9905): Discord audio manager not bound to agent provider → silent failure.  
- [#9654](https://github.com/zeroclaw-labs/zeroclaw/issues/9654): Operator denial message misinterpreted by model → hallucination risk.

👉 **Stability Note:** While no crashes reported today, multiple high-risk bugs affect **data integrity**, **security assumptions**, and **user workflow continuity**—indicating a need for tighter validation gates and end-to-end testing.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **High-Priority Feature Trends:**  
- **WASM Plugin Ecosystem Expansion**:  
  - [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) – Composable WASM runtime with typed extension points.  
  - [#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822) – Plugin lifecycle observers.  
  → *Signals imminent move toward a fully plug-in-driven agent platform.*

- **Secure, Granular Sandboxing**:  
  - [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) – Filesystem/network restrictions per agent.  
  - [#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653) – Plugin HTTPS trust store alignment.  
  → *Indicates focus on zero-trust execution environments, likely for enterprise adoption.*

- **User Experience & Control**:  
  - [#10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222) – Opt-in single-tool rounds for interactive agents.  
  - [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) – Clarify PR review evidence and merge lanes.  
  → *Reflects growing emphasis on transparency, control, and developer experience.*

📌 **Predicted Next Version Inclusions:**  
- WASM plugin runtime overhaul  
- Granular sandbox policies (filesystem/network)  
- Improved config persistence and error handling  
- Enhanced ZeroCode CLI UX (clickable URLs, localization)

---

### **7. User Feedback Summary**  
💬 **Real Pain Points Identified:**  
- **"My config gets wiped out unexpectedly"** → Direct feedback from #10495; users report losing custom agent setups after minor operations.  
- **"Vision images I rejected still appear in history"** → Reported in #10061; breaks trust in AI output reliability.  
- **"I can’t see my own ACP sessions in tools"** → From #10292 and #10468; limits self-service debugging.  
- **"Agent messages sometimes make up reasons for rejections"** → Highlighted in #9654; undermines confidence in operator intent.  

🎯 **Use Cases & Satisfaction:**  
- Users appreciate **local-first mode** (per #5287), especially for privacy-sensitive tasks.  
- Growing demand for **cross-platform consistency** (web, desktop, mobile) evident in unified attachment RFCs.  
- High engagement in **security-focused RFCs** suggests strong interest in deployable, auditable systems.

---

### **8. Backlog Watch**  
⏳ **Critical Unanswered Issues Needing Maintainer Attention:**  
| Issue | Status | Priority | Reason | Link |
|------|--------|----------|--------|------|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | Open, needs-maintainer-review | P2 | Core runtime ownership boundary; impacts all agents/channels | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | Open, needs-maintainer-review | P2 | Memory lifecycle vs storage backend split essential for scalability | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | Open, needs-maintainer-review | P2 | Unified attachment layer required for multi-channel parity | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | Open, needs-maintainer-review | P2 | Critical for secure agent isolation and compliance | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) |

🛑 **Note:** All top-tier RFCs are currently blocked by maintainer triage. Without timely decisions, architectural drift and duplicated effort may occur.

---

> ✅ **Overall Project Health:** **Strong but under pressure**.  
> The project is in a **critical design phase** with high-quality contributions, but backlog congestion and unresolved architectural decisions pose risks to sprint velocity. Immediate maintainer engagement on RFCs is recommended to sustain momentum.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*