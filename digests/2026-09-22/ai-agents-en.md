# OpenClaw Ecosystem Digest 2026-09-22

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-22 01:06 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-22**

---

### **1. Today's Overview**
OpenClaw remains highly active with a surge in community engagement: **500 issues and 500 pull requests updated in the last 24 hours**, indicating robust development momentum. The project is in a high-intensity phase of stability hardening, particularly around session reliability, memory management, and gateway resilience. Critical bugs affecting production environments—especially on Windows and Linux—are dominating the issue tracker, signaling that release quality and backward compatibility are under intense scrutiny. Despite ongoing feature work, the focus is clearly shifting toward fixing systemic regressions ahead of future stable releases.

---

### **2. Releases**
**New Release:** `v2026.7.35` – *Gateway-only extended-stable (LTS-equivalent) release*  
- **Release Type**: Extended-stable (equivalent to LTS), targeting long-term deployment stability.  
- **Scope**: Based on OpenClaw from end-of-July 2026, with critical security patches, performance improvements, and reliability fixes.  
- **Key Additions**: New model support (including Codex-native integrations), enhanced SQLite WAL checkpointing, and improved crash recovery mechanisms.  
- **Migration Note**: No breaking changes expected; users upgrading from `2026.7.x` should experience seamless transition.  
🔗 [GitHub Release v2026.7.35](https://github.com/openclaw/openclaw/releases/tag/v2026.7.35)

> ⚠️ **Note**: The current latest version is `2026.9.5`, which has triggered several post-release regressions (e.g., #153257, #154114). Users on `2026.9.5` are advised to monitor for known instability until next patch.

---

### **3. Project Progress**
**Merged/Resolved PRs (Today):**  
- ✅ **PR #154991** (`fix(gateway): keep session access and Stop bound to original caller`) – Resolves authority drift during session lifecycle, preventing unauthorized access or premature cancellation.  
- ✅ **PR #155323** (`fix: provider discovery fails or overruns its budget after clock changes`) – Fixes timing-sensitive provider catalog fetching, improving reliability during DST or NTP adjustments.  
- ✅ **PR #154727** (`perf: prepare subagent facts for session and task reads`) – Optimizes registry scanning, reducing event loop load during multi-agent operations.  
- ✅ **PR #155326** (`fix(ui): keep task progress collapsed when sending messages`) – Improves UX consistency in chat UI after message input.  

These fixes reflect a strong push toward **runtime integrity, session ownership, and performance optimization** across core workflows.

---

### **4. Community Hot Topics**
The most active issues today center on **critical stability failures**, particularly those causing crashes, memory leaks, or data loss:

| Issue | Comments | Severity | Key Insight |
|------|----------|----------|-----------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 50 | 🦐 Gold Shrimp (UX Release Blocker) | SQLite WAL grows unchecked (up to 2.8GB), blocking gateway startup on Windows. Immediate impact on deployment. |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 31 | 🦪 Silver Shellfish (Critical Memory Leak) | Gateway RSS grows from 350MB → 15.5GB, triggering OOM kills. Affects all platforms. |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 26 | 🦪 Silver Shellfish (CPU Spike) | Codex PreToolUse hooks spawn CPU-hogging processes, stalling RPCs. |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 19 | 🦐 Gold Shrimp (UX Release Blocker) | `2026.9.5` turned stable env into 8-hour recovery session. User trust eroded. |

👉 **Underlying Need**: Users demand **predictable, resilient runtime behavior**—especially in production deployments. The influx of "crash-loop" and "memory leak" reports indicates deep concern about operational reliability beyond feature novelty.

---

### **5. Bugs & Stability**
**Top Stability Issues (Ranked by Severity & Impact):**

| Issue | Severity | Impact | Fix PR? |
|------|----------|--------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | P0 / 🦐 Gold Shrimp | UX Release Blocker, disk exhaustion | ❌ No fix PR yet |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | P1 / 🦪 Silver Shellfish | OOM crashes, process restart loops | ❌ No fix PR yet |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | P0 / 🦪 Silver Shellfish | CPU starvation, RPC stalls | ❌ No fix PR yet |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | P0 / 🦐 Gold Shrimp | Regression in stable release | ❌ No fix PR yet |
| [#154114](https://github.com/openclaw/openclaw/issues/154114) | P0 / 🦪 Silver Shellfish | Update failure due to auth route misreporting | ❌ No fix PR yet |

> 🔥 **Critical Trend**: Multiple **P0/P1 bugs** are tied to `2026.9.5`, suggesting a regression wave from recent updates. The absence of PRs addressing these issues raises concerns about triage capacity.

---

### **6. Feature Requests & Roadmap Signals**
Users are requesting **fine-grained control, better diagnostics, and richer integrations**:

| Request | Priority | Key Signal |
|--------|----------|------------|
| [#67413](https://github.com/openclaw/openclaw/issues/67413) – Per-agent dreaming config | P2 | Demand for granular resource control to avoid OOMs in multi-agent setups. |
| [#88154](https://github.com/openclaw/openclaw/issues/88154) – Slack Modal Support | P2 | Push for native, structured UI in enterprise workflows. |
| [#66252](https://github.com/openclaw/openclaw/issues/66252) – Per-Agent TTS/STT Overrides | P3 | Multi-language support needed for global teams. |
| [#73537](https://github.com/openclaw/openclaw/issues/73537) – Production-readiness stability label | P3 | Users want clear distinction between “stable” and “beta” releases. |

👉 **Prediction**: These features—especially per-agent controls and Slack modals—will likely be prioritized in the **next extended-stable release (v2026.10.0)**, following stabilization of `2026.9.5`.

---

### **7. User Feedback Summary**
Real-world pain points reveal strong user adoption but growing frustration:
- **Production Use Cases**: Families and businesses rely on OpenClaw for Telegram automation, Home Assistant integration, and cron-driven tasks.
- **Satisfaction**: High praise for extensibility and open-source transparency (e.g., #73537).
- **Dissatisfaction**: 
  - **Regret over upgrades** (#153257): “I genuinely regret upgrading to 2026.9.5.”
  - **Silent data loss** (#40001): Cron sessions overwrite shared files instead of appending.
  - **Unreliable delivery** (#87744): Telegram turns time out despite successful execution.
- **Trust Erosion**: Repeated OOM crashes, unexplained hangs, and silent failures are undermining confidence in production use.

> 💬 *"We've been running it as a family and business assistant... it has genuinely become part of our daily workflow."* – @Reneb-cafe

---

### **8. Backlog Watch**
Several high-impact, long-standing issues remain unresolved and require maintainer attention:

| Issue | Age | Status | Why It Matters |
|------|-----|--------|----------------|
| [#48003](https://github.com/openclaw/openclaw/issues/48003) – Steer mode doesn't inject mid-turn | 6+ months | P1, no fix PR | Breaks core agent orchestration logic; affects multi-turn workflows. |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) – Codex Telegram turns timeout silently | 4 months | P1, no fix PR | Prevents final output delivery despite working model. |
| [#85251](https://github.com/openclaw/openclaw/issues/85251) – Codex app-server goes silent after `turn/started` | 4 months | P1, no fix PR | Blocks entire session flow; requires manual recovery. |
| [#153246](https://github.com/openclaw/openclaw/issues/153246) – Plugin build dirs grow ~7.5GB/day | 3 days | Closed (but duplicate) | Indicates persistent cleanup flaw in plugin system. |

> 🛑 **Urgent Call**: These issues represent **systemic gaps in error handling, state persistence, and cleanup mechanisms**. Without resolution, they will continue to undermine user trust and scalability.

---

**Summary**: OpenClaw is at a pivotal moment—high activity, strong community investment, but significant stability debt. The path forward must prioritize **crisis triage, consistent release hygiene, and clearer stability signals** before advancing new features. The next extended-stable release should focus on **"stability first"** to rebuild user confidence.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-22**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem is entering a pivotal maturity phase in Q3 2026, marked by a clear bifurcation between **feature velocity** and **stability triage**. Projects are shifting from rapid innovation toward operational robustness, with strong community engagement across all major players. While OpenClaw leads in activity volume, ZeroClaw and Hermes Agent are advancing deeper architectural refinements, signaling a move toward enterprise-grade reliability. The landscape reflects growing real-world adoption—especially in home automation, workflow orchestration, and multi-agent coordination—driving demand for predictable runtime behavior, security hardening, and cross-platform consistency.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Release Status | Health Score¹ |
|--------|-------------------|----------------|----------------|---------------|
| **OpenClaw** | 500 | 500 | `v2026.7.35` (LTS), `2026.9.5` unstable | ⚠️⚠️⚠️ (High risk due to regressions) |
| **Hermes Agent** | 50 | 50 | `v0.21.4` (patch release) | ✅✅✅ (Stable, well-tuned) |
| **IronClaw** | 1 | 1 | `1.4.1-rc.1` pending | ✅✅ (Pre-release stability) |
| **QwenPaw** | 17 | 33 | `v2.2.1` stable, `2.2.2b3` testing | ✅✅✅ (Strong test coverage, focused fixes) |
| **ZeroClaw** | 50 | 50 | None; high-severity bugs unpatched | ⚠️⚠️ (Critical S0/S1 issues blocking use) |

> **¹ Health Score**: Based on stability, security posture, release hygiene, and backlog triage urgency (5 = optimal, 1 = critical risk).

---

### **3. OpenClaw's Position**  
OpenClaw stands as the **most active and highest-volume project** in the ecosystem, with unparalleled momentum in issue and PR throughput. Its technical approach emphasizes **deep session lifecycle control**, **gateway resilience**, and **model integration depth**, particularly with Codex-native support. Compared to peers:  
- It has the **largest community size** (evidenced by 500+ daily interactions), but also faces the **highest user frustration** due to recent regression waves.  
- Unlike ZeroClaw’s security-first architecture or IronClaw’s benchmarking rigor, OpenClaw prioritizes **production deployment readiness**—even at the cost of short-term instability.  
- Its **extended-stable release model** (`v2026.7.35`) offers long-term predictability, making it a preferred choice for teams needing LTS-like guarantees despite current `2026.9.5` volatility.

---

### **4. Shared Technical Focus Areas**  
Across projects, several systemic challenges are emerging:

| Focus Area | Projects Involved | Key Requirements |
|-----------|------------------|------------------|
| **Session State Integrity** | OpenClaw, Hermes Agent, ZeroClaw | Prevent silent hangs, lost async completions, state corruption during restarts |
| **Security Hardening** | OpenClaw, QwenPaw, ZeroClaw | Mitigate prompt injection, sandbox escapes, and unauthorized access via tool/agent chains |
| **Cross-Platform Reliability** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Fix Windows shell crashes, macOS path resolution errors, and NTP/DST timing issues |
| **Runtime Stability & Resource Control** | OpenClaw, QwenPaw, ZeroClaw | Address OOM kills, CPU spikes, memory leaks, and unbounded WAL growth |
| **Diagnostic Clarity & Observability** | IronClaw, ZeroClaw, Hermes Agent | Implement failure taxonomies, telemetry, and cost tracking for auditability |

These signals indicate a **unified industry shift toward production-readiness**, where trust in system behavior now outweighs novelty.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Feature Focus** | Model integrations, session control, UI polish | Multi-profile workflows, background mode, localization | Benchmarking rigor, failure analysis | Prompt safety, SDK redesign, UI refinement | Host-scoped policies, agent-to-agent messaging |
| **Target Users** | Enterprise, dev teams, power users | Home automation, productivity apps, global teams | Research, AI evaluation, academic labs | Developers, open-code contributors | Secure deployments, regulated environments |
| **Architecture** | Gateway-centric, multi-agent orchestration | Profile-driven, task-routing abstraction | Evaluation-focused, modular benchmark engine | AgentScope-based, SDK-integrated | Sandboxed, policy-enforced, channel-agnostic |
| **Deployment Model** | Self-hosted, Docker, cloud | Docker, hosted, CLI | Benchmarks only | Desktop, web, CI/CD | NixOS, containers, desktop agents |

This divergence reveals distinct product-market fits: **OpenClaw = production agent platform**, **ZeroClaw = secure multi-agent infrastructure**, **IronClaw = research evaluation framework**, and **Hermes/QwenPaw = developer-friendly agent builders**.

---

### **6. Community Momentum & Maturity**  

| Tier | Projects | Characteristics |
|------|--------|-----------------|
| **Rapid Iteration / High Velocity** | OpenClaw, ZeroClaw, QwenPaw | >50 new issues/PRs/day; first-time contributor surge; frequent breaking changes |
| **Stabilization Phase** | Hermes Agent, IronClaw | Patch releases; focus on dependency hygiene, security, and backward compatibility |
| **Mature Maintenance** | IronClaw (pending RC) | Low activity, high process rigor; preparation for next release |

Notably, **OpenClaw and ZeroClaw are in "crisis triage" mode**—high activity driven by urgent bug fixing rather than feature development. In contrast, **Hermes Agent and QwenPaw show signs of healthy maturity**, balancing innovation with stability and test coverage.

---

### **7. Trend Signals**  
Based on community feedback and project direction, key industry trends emerge:

1. **Trust Over Novelty**: Users prioritize **predictable runtime behavior** over new features. Regressions in `2026.9.5` (OpenClaw) and silent failures (ZeroClaw) erode confidence—users want **“stable” vs “beta” clarity** (per #73537).
2. **Security-by-Design Expectations**: Prompt injection (#7859), sandbox escapes (#10536), and tool misbehavior are no longer edge cases—they’re core concerns requiring **proactive enforcement**.
3. **Enterprise-Grade Features Demand**: Per-task routing (#103965), billing transparency (#118595), and host-level resource bounds (#10970) signal that developers are building **scalable, auditable systems**.
4. **UX as a Safety Layer**: Unresponsive cancel buttons (#10379), blank UI panels (#7841), and broken media previews (#10975) are not just annoyances—they expose **runaway AI risks**.
5. **Benchmarking as Foundation**: IronClaw’s failure taxonomy request (#8106) shows that **diagnosing agent flaws is now central to development**, not just performance tuning.

> 🔍 **Value for Developers**: The ecosystem is evolving from *toolkits* to *platforms*. Success hinges on **stability, observability, and security—not just capability**.

---

### ✅ **Conclusion**  
The personal AI agent ecosystem is transitioning from experimentation to production. **OpenClaw leads in scale but faces stability debt**; **ZeroClaw and QwenPaw are strengthening security and UX foundations**; **Hermes Agent demonstrates mature release discipline**; and **IronClaw sets the bar for evaluation rigor**. For developers and decision-makers: prioritize projects with **strong test coverage, transparent release hygiene, and active triage of P0/P1 bugs**—the future belongs to **reliable, observable, and secure agent platforms**.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-22**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 updated pull requests in the past 24 hours—indicating sustained momentum in development and community engagement. A new patch release, **v0.21.4 (v2026.9.21)**, was issued to consolidate ~1,800 merged PRs since v0.21.3 into a stable, production-ready tag for downstream consumers like Docker images and hosted deployments. The ecosystem is clearly in a stabilization phase post-major refactors, with focus shifting toward reliability, session integrity, and cross-platform compatibility—especially on Windows and macOS desktops.

---

### **2. Releases**  
- **[v0.21.4 (v2026.9.21)](https://github.com/nousresearch/hermes-agent/releases/tag/v0.21.4)**  
  - *Type*: Patch release  
  - *Summary*: Rolls up approximately 1,800 merged PRs since v0.21.3 into a stable release.  
  - *Notes*: No breaking changes reported. Full changelog deferred; users should expect improved stability, especially around session state, tooling, and gateway behavior. Recommended for all downstream consumers (Docker, Cloud, hosted instances).

---

### **3. Project Progress**  
**Merged / Closed PRs (Today):**  
- **[PR #118655](https://github.com/nousresearch/hermes-agent/pull/118655)**: Fixed SQL `DELETE` rule false-positive by requiring actual `WHERE` clause (security fix).  
- **[PR #118651](https://github.com/nousresearch/hermes-agent/pull/118651)**: Remediated critical/high Python security advisories (`anyio`, `httpx`, `httpcore`) without behavioral change.  
- **[PR #118652](https://github.com/nousresearch/hermes-agent/pull/118652)**: Added support for Anthropic 1.x HTTP clients (resolves compatibility with newer SDKs).  
- **[PR #118647](https://github.com/nousresearch/hermes-agent/pull/118647)**: Ensured background review tasks are drained during gateway restart/shutdown (improves reliability).  

These PRs reflect a strong focus on **security hardening**, **dependency hygiene**, and **gateway lifecycle robustness**.

---

### **4. Community Hot Topics**  
Top 5 most commented Issues/PRs today reveal key pain points:

| Issue/PR | Comments | Link | Analysis |
|--------|---------|------|--------|
| [#118643](https://github.com/nousresearch/hermes-agent/issues/118643) | 1 | [GitHub](https://github.com/nousresearch/hermes-agent/issues/118643) | Desktop update leaves stale `sys.modules` when `--no-gateway-restart` used — highlights instability in update workflows on macOS. |
| [#118650](https://github.com/nousresearch/hermes-agent/pull/118650) | 0 | [GitHub](https://github.com/nousresearch/hermes-agent/pull/118650) | Feature request to pass gateway route metadata to `pre_llm_call` hooks — signals demand for context-aware plugin logic. |
| [#118657](https://github.com/nousresearch/hermes-agent/pull/118657) | 0 | [GitHub](https://github.com/nousresearch/hermes-agent/pull/118657) | Fix to retain detached delegation completions — addresses user frustration when async responses are lost. |
| [#118390](https://github.com/nousresearch/hermes-agent/pull/118390) | 0 | [GitHub](https://github.com/nousresearch/hermes-agent/pull/118390) | Improves lean summary sampling by preserving full message records — directly impacts readability in long sessions. |
| [#118299](https://github.com/nousresearch/hermes-agent/pull/118299) | 0 | [GitHub](https://github.com/nousresearch/hermes-agent/pull/118299) | Adds `hermes-lcm` memory plugin to catalog — shows growing interest in lossless context management. |

> 🔍 **Underlying Need**: Users are increasingly demanding **predictable session state**, **plugin extensibility**, and **robust asynchronous handling**—especially in multi-profile, multiplexed environments.

---

### **5. Bugs & Stability**  
Critical bugs reported today highlight systemic risks:

| Issue | Severity | Status | Fix PR? | Notes |
|------|----------|--------|--------|------|
| [#118538](https://github.com/nousresearch/hermes-agent/issues/118538) | P3 | Open | ❌ | OMH pre-tool-call blocks *all* tools on multiplex gateways due to missing profile scope — breaks agent automation entirely. |
| [#118628](https://github.com/nousresearch/hermes-agent/issues/118628) | P2 | Open | ❌ | Closing session tile force-interrupts mid-flight turns even when user expects background execution — UX regression. |
| [#118618](https://github.com/nousresearch/hermes-agent/issues/118618) | P2 | Open | ❌ | `get_default_hermes_root()` lets `OSError` escape from `Path.resolve()` — potential crash risk if paths are malformed. |
| [#118643](https://github.com/nousresearch/hermes-agent/issues/118643) | P2 | Open | ❌ | Stale `sys.modules` after update causes `ImportError` — affects macOS Desktop users using `--external-supervisor`. |
| [#118595](https://github.com/nousresearch/hermes-agent/issues/118595) | P3 | Open | ❌ | `kanban_decomposer` task costs not tracked — leads to unattributed billing, impacting cost visibility. |

> ⚠️ **Risk Assessment**: Several open P2/P3 bugs involve **session state corruption**, **billing inaccuracies**, and **multi-profile race conditions**—urgent attention needed before next major release.

---

### **6. Feature Requests & Roadmap Signals**  
Top feature signals suggest evolving user expectations:

| Request | Link | Implication |
|-------|------|-----------|
| [Feature: Configurable `deliver` target for Home Assistant](https://github.com/nousresearch/hermes-agent/issues/35060) | [Issue #35060](https://github.com/nousresearch/hermes-agent/issues/35060) | Users want to redirect state-change events from HA to other platforms (WhatsApp, Telegram)—signals expansion beyond home automation. |
| [Feature: Background/Daemon Mode for Desktop](https://github.com/nousresearch/hermes-agent/issues/47246) | [Issue #47246](https://github.com/nousresearch/hermes-agent/issues/47246) | High demand for silent, persistent operation on Windows/macOS — critical for productivity use cases. |
| [Feature: Per-task Hermes profile routing](https://github.com/nousresearch/hermes-agent/pull/103965) | [PR #103965](https://github.com/nousresearch/hermes-agent/pull/103965) | Enables fine-grained control over subagent resources (model, memory, state) — suggests advanced persona usage is growing. |
| [Feature: Simplified Chinese localization plugin](https://github.com/nousresearch/hermes-agent/pull/118322) | [PR #118322](https://github.com/nousresearch/hermes-agent/pull/118322) | Indicates expanding global adoption; non-English user base is actively contributing. |

> 📌 **Prediction**: Next version (v0.22.0) will likely include **per-task routing**, **enhanced localization**, and **background mode support**—key for enterprise and international users.

---

### **7. User Feedback Summary**  
Real user pain points emerging from issue discussions:

- **Windows users report frequent crashes** due to `fcntl.F_RDLCK` errors (see [Issue #118026](https://github.com/nousresearch/hermes-agent/issues/118026)) — indicates platform-specific code path fragility.
- **Desktop app feels "unstable"** — duplicate replies ([#70108](https://github.com/nousresearch/hermes-agent/issues/70108)), interrupted turns ([#118628](https://github.com/nousresearch/hermes-agent/issues/118628)), and broken updates ([#118643](https://github.com/nousresearch/hermes-agent/issues/118643)).
- **Billing transparency is lacking** — users can’t track costs of auxiliary tasks like `kanban_decomposer` ([#118595](https://github.com/nousresearch/hermes-agent/issues/118595)) or custom providers ([#118594](https://github.com/nousresearch/hermes-agent/issues/118594)).
- **Multi-profile setups are fragile** — configuration drift across profiles ([#118431](https://github.com/nousresearch/hermes-agent/issues/118431)), tool vetoing ([#118538](https://github.com/nousresearch/hermes-agent/issues/118538)), and avatar rendering failures ([#118566](https://github.com/nousresearch/hermes-agent/issues/118566)).

> 💬 **Sentiment**: High engagement but rising frustration with stability, especially on desktop and multi-user setups.

---

### **8. Backlog Watch**  
Long-standing, high-impact issues needing maintainer attention:

| Issue | Link | Priority | Status | Notes |
|------|------|--------|--------|------|
| [#110126](https://github.com/nousresearch/hermes-agent/issues/110126) | [Output truncation failure class](https://github.com/nousresearch/hermes-agent/issues/110126) | P2 | Open (35+ related issues) | Systemic issue across 4 subsystems — root cause tied to DeepSeek V4. Requires architectural review. |
| [#107516](https://github.com/nousresearch/hermes-agent/issues/107516) | [Context compression retries indefinitely](https://github.com/nousresearch/hermes-agent/issues/107516) | P2 | Open | No backoff or cap on retries — can exhaust system resources under load. |
| [#118619](https://github.com/nousresearch/hermes-agent/issues/118619) | [Camofox VNC link never discovered](https://github.com/nousresearch/hermes-agent/issues/118619) | P3 | Open | Blocks usability of browser toolchain — needs API alignment. |
| [#118594](https://github.com/nousresearch/hermes-agent/issues/118594) | [Custom provider prices $0](https://github.com/nousresearch/hermes-agent/issues/118594) | P2 | Open | Misleading cost reporting — impacts trust in pricing models. |
| [#118580](https://github.com/nousresearch/hermes-agent/issues/118580) | [Compression telemetry missing fields](https://github.com/nousresearch/hermes-agent/issues/118580) | P3 | Open | Hinders observability and performance tuning. |

> ✅ **Recommendation**: Prioritize triage of [#110126](https://github.com/nousresearch/hermes-agent/issues/110126) and [#107516](https://github.com/nousresearch/hermes-agent/issues/107516) — they represent systemic risks affecting core functionality.

---

**✅ Final Assessment**: Hermes Agent is in a mature, high-velocity phase with strong community involvement. While the latest release stabilizes recent work, underlying issues in **session state**, **billing accuracy**, and **cross-platform reliability** remain pressing. The project is well-positioned for a major v0.22.0 release focused on **robustness**, **user experience**, and **enterprise-grade features**—but only if current stability gaps are addressed swiftly.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-22**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable, maintenance-focused state as of 2026-09-22. No new releases were published, indicating the team is likely preparing for an upcoming release cycle. Activity is minimal but meaningful: one pull request was merged to prepare for a release candidate (v1.4.1-rc.1), and one new issue was opened detailing a daily failure taxonomy from benchmark runs. The low volume of activity suggests either a mature codebase with few urgent changes or a temporary pause in development cycles.

---

### **2. Releases**  
No new releases were published today. However, **PR #8105** (`chore(release): cut 1.4.1-rc.1`) was successfully merged, marking a key step toward the next release candidate. This change versions the `ironclaw` package to **1.4.1-rc.1**, enabling automated tagging via the `cut_ironclaw_release.py` workflow. This is a preparatory step—no breaking changes or migration notes are expected at this stage. The actual stable release will follow after testing and validation of the RC.

🔗 [PR #8105: chore(release): cut 1.4.1-rc.1](https://github.com/nearai/ironclaw/pull/8105)

---

### **3. Project Progress**  
- ✅ **Merged PR**: [#8105](https://github.com/nearai/ironclaw/pull/8105) — *chore(release): cut 1.4.1-rc.1*  
  This PR advances the release pipeline by bumping the version to `1.4.1-rc.1`, ensuring alignment between the manifest and tag generation logic. It enables the automated release workflow to proceed without version mismatches, improving CI/CD reliability.

No other PRs were merged or updated today, suggesting no functional updates or bug fixes were integrated.

---

### **4. Community Hot Topics**  
- 🔥 **Issue #8106**: [Daily ironclaw failure taxonomy — 2026-09-21](https://github.com/nearai/ironclaw/issues/8106)  
  - **Author**: pranavraja99  
  - **Status**: Open (created 2026-09-21)  
  - **Comments**: 0 | 👍: 0  
  - **Summary**: A detailed analysis of 47 non-passing tasks in the `officeqa` benchmark suite, primarily attributed to genuine model-quality issues (e.g., DeepSeek-V4-Flash struggles with navigation).  

This issue reflects growing interest in **failure mode transparency** and **benchmark reproducibility**. While not highly reactive yet, it signals a community need for systematic logging and categorization of AI agent failures—especially for debugging model behavior under real-world constraints.

---

### **5. Bugs & Stability**  
- ⚠️ **Issue #8106** highlights **stability concerns in real-world QA tasks**, particularly around model reasoning and task execution.  
  - **Severity**: Medium (systemic, impacts evaluation integrity)  
  - **Root Cause**: Model-level errors (e.g., DeepSeek-V4-Flash failing on navigation) rather than framework bugs.  
  - **Fix Status**: No associated PRs; currently unaddressed.  
  - **Impact**: Affects benchmark trustworthiness and may hinder progress tracking across agents.

No crash reports or runtime regressions were reported today. The stability of the core framework appears intact.

---

### **6. Feature Requests & Roadmap Signals**  
While no formal feature requests were submitted today, **Issue #8106** serves as a strong roadmap signal:  
- **Predicted near-term addition**: A standardized **failure taxonomy system** for benchmark runs, including categorization (e.g., "model reasoning", "tool misuse", "state mismanagement").  
- **Future direction**: Enhanced diagnostic dashboards or reporting tools within the IronClaw benchmarking suite to visualize failure patterns across models and tasks.  
- **Implied need**: Better observability into agent decision-making paths during evaluation.

These features align with IronClaw’s mission to enable rigorous, transparent evaluation of AI agents.

---

### **7. User Feedback Summary**  
- **Pain Points**:  
  - Users are observing recurring model-specific failures (e.g., DeepSeek-V4-Flash) in complex, multi-step tasks like officeQA.  
  - Lack of structured failure classification makes it difficult to distinguish between agent design flaws and model limitations.  
- **Use Cases**:  
  - Evaluating agent robustness across diverse environments.  
  - Comparing model performance under real-world constraints.  
- **Satisfaction**: High confidence in the framework’s infrastructure, but moderate frustration with opaque failure analysis.

Feedback indicates that users value depth over speed—accuracy in diagnostics is prioritized over rapid iteration.

---

### **8. Backlog Watch**  
- 📌 **Issue #8106**: [Daily ironclaw failure taxonomy — 2026-09-21](https://github.com/nearai/ironclaw/issues/8106)  
  - **Age**: 1 day old  
  - **Priority**: High (impacts evaluation quality and research reproducibility)  
  - **Action Needed**: Assign maintainer(s) to define failure categories and integrate a tagging system into benchmark pipelines.  
  - **Risk**: Without structured failure tracking, future benchmark improvements may lack actionable insights.

This issue is critical for long-term project maturity and should be addressed promptly ahead of the v1.4.1 release.

--- 

**Conclusion**: IronClaw is in a stable, preparatory phase ahead of a potential release. The most pressing need is the implementation of a failure taxonomy system to enhance diagnostic clarity. Minimal activity suggests focus on process refinement rather than feature expansion. Maintainers should prioritize Issue #8106 to strengthen evaluation rigor and user trust.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-22**

---

### **1. Today's Overview**  
QwenPaw (v2.2.x) remains highly active with robust community engagement: 17 issues and 33 pull requests updated in the last 24 hours. The project is experiencing a surge in stability-focused development, particularly around prompt injection risks, context management, and Windows-specific shell behavior. While no new releases were published, significant progress was made in fixing critical bugs related to agent loop termination, model provider integration, and UI rendering consistency. The high volume of PRs—especially from first-time contributors—indicates strong developer momentum and growing ecosystem maturity.

---

### **2. Releases**  
**No new releases** were published today. The latest stable version remains `v2.2.1` (desktop), with `2.2.2b3` used in testing environments. No breaking changes or migration notes are currently pending. Maintainers are likely preparing for a patch release addressing recent security and stability fixes (e.g., #7859, #7908).

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **[PR #7919]** Fix: Prevent stale doom-loop escalation — resolves #7905 by requiring *new* tool-call evidence before escalating to TERMINATE.  
- ✅ **[PR #7915]** Fix: Default Responses API tools to non-strict mode — prevents optional parameters from being incorrectly required after schema sanitization.  
- ✅ **[PR #7913]** Chore: Bump AgentScope to v2.0.8 — improves dependency alignment and future-proofing.  
- ✅ **[PR #7918]** Docs: Remove accidentally committed design documents — cleans up repo hygiene.  
- ✅ **[PR #7911]** Test: Coverage sprint batch 3 — increases unit test coverage in `src/qwenpaw` to **73.79% (+3.28pp)**.  
- ✅ **[PR #7906]** Fix: Prevent stale doom-loop escalation — closely tied to #7905; enhances loop detection logic.  
- ✅ **[PR #7846]** Feature: Improve session list details and grouping — removes redundant indicators and enables hover-truncation.  

These merges reflect a strong focus on **agent reliability**, **API robustness**, and **test quality assurance**.

---

### **4. Community Hot Topics**  
The most active discussions center on **security vulnerabilities**, **UI/UX polish**, and **third-party integration pain points**:  

- 🔥 **[Issue #7859]** Persistent prompt injection in system-reminders — *critical severity*: An injected instruction repeatedly appends to skill lists, instructing agents to delete all skills. Despite being open since Sept 18, it has attracted 5 comments and is now under scrutiny.  
  → [GitHub Issue #7859](https://github.com/agentscope-ai/QwenPaw/issues/7859)  
  *Underlying need:* Hardening prompt integrity and preventing adversarial manipulation in long-running sessions.

- 🔥 **[PR #7874]** Redesign SDK and app control plane — proposed overhaul of PawApp architecture to support secure, idempotent task dispatch and public/private action boundaries.  
  → [GitHub PR #7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)  
  *Underlying need:* Enabling production-grade deployment of custom AI agents with controlled access and durability.

- 📌 **[Issue #7912]** Request for authenticated web-research example using Baizhi Toolkit — users want practical, secure examples for real-world MCP workflows.  
  → [GitHub Issue #7912](https://github.com/agentscope-ai/QwenPaw/issues/7912)  
  *Underlying need:* Better documentation for advanced use cases involving authentication and data sharing.

---

### **5. Bugs & Stability**  
**Critical Issues Reported:**  
1. **[Bug #7859]** Persistent prompt injection — *high risk* of agent self-destruction via malicious system reminders.  
   → *Fix PR:* None yet. High priority.  
   → [Link](https://github.com/agentscope-ai/QwenPaw/issues/7859)

2. **[Bug #7908]** Windows: Child console Ctrl events terminate QwenPaw host — *crash risk* on Windows when running shell commands.  
   → *Fix PR:* **[PR #7910]** isolates Windows consoles via `CREATE_NO_WINDOW`. Merged.  
   → [Link](https://github.com/agentscope-ai/QwenPaw/pull/7910)

3. **[Bug #7905]** DoomLoopGate escalates without new tool evidence — causes false terminations during text-only rounds.  
   → *Fix PR:* **[PR #7919]** and **[PR #7906]** both address this; merged.  
   → [Link](https://github.com/agentscope-ai/QwenPaw/issues/7905)

4. **[Bug #7841]** Console UI loads before backend ready — leads to blank panels until refresh.  
   → *Impact:* UX disruption, especially for desktop users.  
   → [Link](https://github.com/agentscope-ai/QwenPaw/issues/7841)

---

### **6. Feature Requests & Roadmap Signals**  
Top user-driven feature signals:  

- 🎨 **Agent avatars** ([Issue #4974](https://github.com/agentscope-ai/QwenPaw/issues/4974)) — requested since June 2026, now with 2 👍s. Indicates demand for visual identity in multi-agent environments.  
- 🖼️ **LaTeX math rendering with KaTeX** ([Issue #5921](https://github.com/agentscope-ai/QwenPaw/issues/5921)) — already designed, awaiting implementation. Suggests growing academic/research use.  
- 🗃️ **Age out tool_result blocks after retention days** ([PR #7923](https://github.com/agentscope-ai/QwenPaw/pull/7923)) — addresses storage bloat in busy installations. Signals scalability concerns.  
- 🔐 **Support per-session model overrides** ([PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)) — enables dynamic model switching per task. Likely to be included in next minor release.

> **Prediction:** Next version (`2.2.3`) will likely include:  
> - Prompt injection mitigation (from #7859)  
> - Per-session model override  
> - Tool-result retention policy  
> - Improved Windows shell isolation

---

### **7. User Feedback Summary**  
Real-world pain points emerging:  
- **Enterprise/Cloud Users (JD Cloud):** Session interruptions during tool execution ([Issue #3419](https://github.com/agentscope-ai/QwenPaw/issues/3419)) — suggests environment-specific instability or timeout handling issues.  
- **OpenCode Users:** Free-tier models fail despite UI labeling them as free ([Issue #7882](https://github.com/agentscope-ai/QwenPaw/issues/7882)) — highlights misalignment between UI and backend state.  
- **Developers:** Missing YAML frontmatter in `omp-roles` skill renders it silently unusable ([Issue #7921](https://github.com/agentscope-ai/QwenPaw/issues/7921)) — shows friction in plugin distribution and validation.  
- **Desktop Users:** UI loading delays and blank panels ([Issue #7841](https://github.com/agentscope-ai/QwenPaw/issues/7841)) — impacts usability and trust in stability.

Users express satisfaction with recent improvements in testing and documentation but remain concerned about **security**, **reliability**, and **visual clarity**.

---

### **8. Backlog Watch**  
**Long-standing, high-impact issues needing maintainer attention:**  
- **[Issue #7859]** Persistent prompt injection — *open for 4 days*, critical risk, no fix PR yet. Requires urgent triage.  
  → [Link](https://github.com/agentscope-ai/QwenPaw/issues/7859)  
- **[Issue #7628]** Context compaction exceeding budget — affects performance and cost predictability. Still open since Sept 8.  
  → [Link](https://github.com/agentscope-ai/QwenPaw/issues/7628)  
- **[Issue #7916]** AgentScope Platform validator not recognizing new memory plugins — blocks adoption of new features.  
  → [Link](https://github.com/agentscope-ai/QwenPaw/issues/7916)  
- **[Issue #7912]** Missing authenticated web-research example — user-requested but unaddressed. Could become a roadmap gap.  
  → [Link](https://github.com/agentscope-ai/QwenPaw/issues/7912)

> **Recommendation:** Prioritize #7859 and #7628 in upcoming patch cycle due to security and cost implications.

---

**Summary Status:** ✅ **High activity, strong health, focused on stability and security.**  
Project is maturing rapidly with strong contributor engagement and clear prioritization of critical bugs. Ready for next minor release with enhanced safety, scalability, and UX polish.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-22  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **50 new issues and 50 updated pull requests** in the last 24 hours—indicating strong community engagement and ongoing development momentum. Despite no new releases, the pipeline is densely populated with high-severity bugs (P1/P2), security vulnerabilities, and architectural RFCs, suggesting a focus on stability, safety, and long-term design coherence. The surge in activity centers around **agent runtime reliability**, **channel integration robustness (especially WhatsApp/Web)**, and **security hardening of sandboxing and policy enforcement**. This reflects a mature project under active refinement, prioritizing operational integrity ahead of feature velocity.

---

### **2. Releases**

> ✅ **No new releases** were published today.

There are currently **no release notes or version updates** visible in the repository. The latest stable release remains unchanged from recent weeks. Maintainers appear to be prioritizing bug fixes and architectural decisions over packaging new versions.

---

### **3. Project Progress**

#### 🔧 **Merged/Closed PRs (Today)**
- **PR #11038** ([fix(security): ignore RUSTSEC-2026-0292](https://github.com/zeroclaw-labs/zeroclaw/pull/11038))  
  ➤ *Security CI bypass for `imbl-sized-chunks` double-free advisory — accepted as safe due to dependency path.*  
  → Resolves `cargo deny check` failures blocking CI.

- **PR #11040** ([fix(nix): build zerocode with its own feature set](https://github.com/zeroclaw-labs/zeroclaw/pull/11040))  
  ➤ *NixOS integration improvements: allows per-package feature control.*  
  → Enables more flexible deployment configurations.

- **PR #11042** ([docs(developing): record replacement-first policy](https://github.com/zeroclaw-labs/zeroclaw/pull/11042))  
  ➤ *Documents RFC #6165’s "replacement-first" integration rule.*  
  → Improves governance transparency.

#### 🚀 **Key Advancements**
- **Security Policy Refinement**: PR #11038 confirms proactive risk triage; maintainers are willing to waive low-impact advisories when dependencies are isolated.
- **Nix Integration Maturation**: Multiple PRs (e.g., #11041, #11040) signal growing support for declarative, reproducible builds via Nix.
- **Documentation Discipline**: Consistent use of `docs/` PRs shows commitment to knowledge preservation and contributor onboarding.

---

### **4. Community Hot Topics**

| Issue / PR | Link | Comments | Status | Core Theme |
|-----------|------|----------|--------|------------|
| **Issue #10970** ([RFC: Host-scoped admission control](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | 4 | Open, needs maintainer review | Scaling multi-agent systems safely |
| **Issue #10929** ([RFC: Delivery receipts for outbound messages](https://github.com/zeroclaw-labs/zeroclaw/issues/10929)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) | 4 | Open, needs author action | Message delivery assurance |
| **PR #11025** ([fix(parser): normalize tool aliases](https://github.com/zeroclaw-labs/zeroclaw/pull/11025)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/11025) | 0 | Open | Cross-format consistency |
| **PR #10982** ([fix(whatsapp-web): attach previews](https://github.com/zeroclaw-labs/zeroclaw/pull/10982)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10982) | 0 | Open | User experience on mobile |

🔍 **Analysis of Underlying Needs**:
- **Operational Visibility & Trust**: High interest in message delivery receipts (#10929) and host-level resource limits (#10970) signals a shift toward production-grade reliability.
- **Cross-Platform Consistency**: Tool alias normalization (#11025) and WhatsApp preview fixes (#10982) reflect user demand for seamless, predictable behavior across channels and formats.
- **Governance Clarity**: RFCs like #10970 suggest the team is preparing for enterprise-scale adoption where isolation and control are non-negotiable.

---

### **5. Bugs & Stability**

| Severity | Issue | Link | Description | Fix PR? |
|---------|-------|------|-------------|--------|
| ⚠️ **S1 (Workflow Blocked)** | #9191 ([Cron job timeout](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron jobs have no wall-clock timeout; locks only cleared at process start | ❌ No fix yet |
| ⚠️ **S1 (Workflow Blocked)** | #10230 ([Daemon stack overflow](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | Quickstart config can crash Tokio runtime with stack overflow | ❌ No fix yet |
| ⚠️ **S1 (Workflow Blocked)** | #10231 ([Channels supervisor retries stale config](https://github.com/zeroclaw-labs/zeroclaw/issues/10231)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10231) | Supervisor keeps retrying invalid agent configs | ❌ No fix yet |
| ⚠️ **S0 (Security Risk)** | #10379 ([Cancel button unclickable in desktop UI](https://github.com/zeroclaw-labs/zeroclaw/issues/10379)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10379) | Can’t stop AI processing — potential data exposure | ❌ No fix yet |
| ⚠️ **S0 (Security Risk)** | #10536 ([macOS Seatbelt ignores allowed_roots](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) | Shell commands escape sandbox restrictions | ❌ No fix yet |

🚨 **Critical Stability Concerns**:
- Multiple **S1/S0 bugs** affect core workflows and security boundaries.
- **Daemon instability** (stack overflow, config loops) threatens uptime.
- **Security policy bypasses** on macOS and in shell execution indicate critical gaps in sandbox enforcement.

---

### **6. Feature Requests & Roadmap Signals**

| Feature Request | Link | Priority | Notes |
|----------------|------|----------|-------|
| **Agent-to-Agent Messaging (Receiver Discretion)** | [#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) | P2 | A capability boundary RFC signaling intent to enable decentralized agent collaboration |
| **Host-Level Resource Bounds (Concurrent Turns, Memory)** | [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | P2 | Clear signal that scaling many agents is a near-term goal |
| **WhatsApp Web Image & Mention Fixes** | [#10975](https://github.com/zeroclaw-labs/zeroclaw/issues/10975), [#10976](https://github.com/zeroclaw-labs/zeroclaw/issues/10976) | P1/P2 | Urgent UX fixes showing channel-specific maturity needs |
| **Multi-Agent Sidebar (ZeroCode)** | [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) | P2 | Already accepted; likely next sprint target |

🔮 **Predicted Next Version Inclusions**:
- **Agent-to-agent messaging** (if #11027 progresses).
- **WhatsApp Web image handling and mention resolution** (high priority due to active PRs).
- **Improved ZeroCode sidebar** for multi-agent monitoring.
- **Enhanced host-level resource controls** for scalability.

---

### **7. User Feedback Summary**

Users are reporting:
- **Frustration with unrecoverable crashes** during configuration changes (Quickstart → daemon restart).
- **Invisible context truncation** (`AGENTS.md` cut at 6k chars) leading to lost agent state.
- **Broken image handling on WhatsApp** — users receive `[Image]` text instead of media.
- **Unresponsive cancel buttons** in ZeroClaw Desktop, creating anxiety about runaway processes.
- **Confusion over locale translation gaps** in ZeroCode UI (config labels remain English).

💡 **User Use Cases**:
- Running multiple agents simultaneously on a single machine.
- Using ZeroClaw for real-time coordination between agents and humans.
- Deploying in environments requiring strict access control and audit trails.

👎 **Dissatisfaction Signals**:
- Lack of feedback on complex operations (e.g., SOPs failing mid-step with no log).
- Hidden system behaviors (e.g., context caps, truncations) undermine trust.

✅ **Satisfaction Signals**:
- Positive reception of RFCs focused on **security**, **auditability**, and **scalability**.
- Appreciation for **Nix support** and **cross-format tool consistency**.

---

### **8. Backlog Watch**

| Issue | Link | Age | Status | Why It Matters |
|------|------|-----|--------|----------------|
| **Issue #8692** ([Maintainer decision queue for RFCs](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 2026-07-04 (~80 days) | Accepted, no stale | Critical for governance hygiene — delays RFC progress |
| **Issue #9899** ([Remove matrix-sdk -> imbl waivers](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | 2026-08-10 (~43 days) | Accepted, needs maintainer review | Security CI failure persists — blocks merges |
| **PR #10263** ([feat(security): principal tool selectors](https://github.com/zeroclaw-labs/zeroclaw/pull/10263)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10263) | 2026-08-22 (~30 days) | Accepted, but not merged | Key security enhancement pending merge |
| **Issue #10918** ([Empty chunk falsely marks HTTP response as truncated](https://github.com/zeroclaw-labs/zeroclaw/issues/10918)) | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10918) | 2026-09-17 (~5 days) | Accepted, no PR | Minor but persistent bug affecting web fetch reliability |

📌 **Action Required**: These items are **blocking or delaying major improvements**. Maintainers should prioritize reviewing and merging:
- **PR #10263** (security tool selection)
- **Issue #9899** (dependency security waiver)
- **Issue #8692** (decision tracking)

---

### ✅ **Final Assessment**

ZeroClaw is in a **high-intensity phase of stabilization and architectural refinement**. While no new releases are out, the project is making deep progress in **security hardening, runtime reliability, and governance clarity**. The backlog is rich with high-value, accepted RFCs and fixes, indicating a healthy pipeline. However, **critical S1/S0 bugs remain unresolved**, posing real risks to usability and safety. With strong community contributions and clear roadmap signals, ZeroClaw is positioning itself for a **major stability and scale milestone in Q4 2026**.

👉 **Recommendation**: Prioritize merging security and stability fixes (e.g., #10263, #9899, #10230) before advancing new features.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*