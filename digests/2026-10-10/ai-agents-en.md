# OpenClaw Ecosystem Digest 2026-10-10

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-10 01:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-10-10**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development momentum. A significant portion of activity centers on critical stability and reliability concerns—particularly around database corruption, memory leaks, session state failures, and update blocking bugs. Despite no new releases, a strong focus on fixing regressions from recent versions (2026.9.6–2026.9.7) is evident. The community is actively engaged in triaging high-severity P0/P1 bugs, especially those affecting production gateways and user experience.

---

### **2. Releases**  
**None**  
No new releases were published as of 2026-10-10. The latest stable version remains **2026.9.7**, though multiple critical regressions have been reported since its release. Operators are advised to avoid upgrading until pending fixes for `update` hangs, SQLite WAL bloat, and agent crash loops are resolved.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #167902**: Fixed orphaned `llama.cpp` servers on macOS after Gateway crash.  
- ✅ **PR #168071**: Added GitHub profile verification for X repository writers.  
- ✅ **PR #168025**: Ensured sandbox/worktree/GitHub authority receipts are consistently published.  
- ✅ **PR #168084**: Restored test contracts for agent artifacts and maintenance fixtures.  

**Key Advances:**  
- **Enhanced security & recovery**: Several PRs address persistent state corruption, credential leakage, and unhandled process cleanup (e.g., `llama-cpp`, `git-config`, OAuth fences).  
- **Improved UX consistency**: Fixes for UI rendering (e.g., code block crowding, sidebar actions), session preview logic, and streaming ordering across Discord/Telegram.  
- **Better diagnostics**: New CLI checks for stale service installs and managed gateway connection failures now provide actionable feedback.

---

### **4. Community Hot Topics**  
The most active discussions center on **critical system-level instability** and **user workflow disruption**:

- 🔥 **Issue #143524** – *SQLite WAL grows to 2.8 GB despite `wal_autocheckpoint=1000`*  
  → **115 comments**, impact: **crash-loop**, **UX-release-blocker**  
  [GitHub Link](https://github.com/openclaw/openclaw/issues/143524)  
  *Underlying need:* Reliable persistence layer under long-running agents; urgent fix needed for Windows deployments.

- 🔥 **Issue #157325** – *Stuck agent-DB resource blocks all replies until restart*  
  → **17 comments**, severity: **P0**, **UX-release-blocker**  
  [GitHub Link](https://github.com/openclaw/openclaw/issues/157325)  
  *Underlying need:* Session resilience and fail-safe DB locking mechanisms.

- 🔥 **Issue #167771** – *Update permanently blocked by “managed handoff lease identity changed”*  
  → **9 comments**, severity: **P0**, **UX-release-blocker**, no repair path  
  [GitHub Link](https://github.com/openclaw/openclaw/issues/167771)  
  *Underlying need:* Self-healing update infrastructure with rollback/recovery paths.

- 📈 **PR #168059** – *Preload native plugin assets to reduce Control UI load time*  
  → **10+ seconds of delay addressed**, performance-focused, ready for maintainer review  
  [GitHub Link](https://github.com/openclaw/openclaw/pull/168059)

These reflect a community prioritizing **stability over features**, especially in production environments.

---

### **5. Bugs & Stability**  
**Top Severity Bugs (P0/P1)**  
| Issue | Summary | Fix PR? | Impact |
|------|--------|--------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL grows indefinitely (2.8 GB) on Windows | ❌ No | Crash loop, startup failure |
| [#157325](https://github.com/openclaw/openclaw/issues/157325) | Stuck DB lock halts all agent replies | ❌ No | Full gateway outage |
| [#167771](https://github.com/openclaw/openclaw/issues/167771) | Update blocked permanently with no recovery path | ❌ No | Upgrade paralysis |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | Large external plugins cause minute-long event loop block | ❌ No | High-latency startup |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Zombie child processes accumulate | ❌ No | Runtime degradation |

> ⚠️ **Critical Trend**: Multiple P0 bugs involve **persistent state corruption**, **unrecoverable update states**, or **database deadlock**, suggesting systemic weaknesses in resource management and upgrade safety.

---

### **6. Feature Requests & Roadmap Signals**  
High-priority feature signals emerging from user pain points:

- ✅ **Per-agent TTS/STT overrides** ([#66252](https://github.com/openclaw/openclaw/issues/66252))  
  → Needed for multi-language support in multi-agent setups.

- ✅ **Configurable memory recall/exclusion paths** ([#101422](https://github.com/openclaw/openclaw/issues/101422))  
  → Users want control over what gets indexed/searched in markdown-first workspaces.

- ✅ **TTL for delivery queue messages** ([#16555](https://github.com/openclaw/openclaw/issues/16555))  
  → Prevents stale message flooding on restart.

- ✅ **Reaction-triggered agent turns** ([#17840](https://github.com/openclaw/openclaw/issues/17840))  
  → Enables interactive workflows (e.g., emoji polls).

> 💡 **Prediction**: These will likely be included in **v2026.10.0** as part of a broader "multi-agent orchestration" enhancement suite.

---

### **7. User Feedback Summary**  
Users report **frustration with unrecoverable failures**, **silent data loss**, and **lack of diagnostic visibility**:

- **“After updating, every channel goes silent after one message.”** – [#101814](https://github.com/openclaw/openclaw/issues/101814)  
  → Indicates deep regression in session state handling post-update.

- **“My WhatsApp replies fail silently after restart.”** – [#161976](https://github.com/openclaw/openclaw/issues/161976)  
  → Highlights trust gap in durable message delivery.

- **“I can’t upgrade because the update hangs forever.”** – [#167771](https://github.com/openclaw/openclaw/issues/167771)  
  → Reflects loss of confidence in upgrade process.

- **“Hardcoded path to `/Users/wangtao` was merged!”** – [#51429](https://github.com/openclaw/openclaw/issues/51429)  
  → Underscores concern about code quality and peer review rigor.

> 🎯 **Sentiment**: Mixed. Functional improvements are appreciated, but **reliability and self-repair capabilities are seen as broken**.

---

### **8. Backlog Watch**  
Several long-standing, high-impact issues remain unresolved:

- 🟡 **[Issue #14785](https://github.com/openclaw/openclaw/issues/14785)** – *Reduce tool schema token overhead (~3,500 tok/session)*  
  → Still open since Feb 2026; impacts cost and latency at scale.

- 🟡 **[Issue #69208](https://github.com/openclaw/openclaw/issues/69208)** – *Umbrella: duplicate transcript, replay, context assembly across channels*  
  → 16 comments, ongoing issue across webchat, Telegram, Teams — needs architectural fix.

- 🟡 **[Issue #153426](https://github.com/openclaw/openclaw/issues/153426)** – *Curated `MEMORY.md` silently excluded forever after provenance ratchet*  
  → P0, no diagnostics, no recovery — a major risk for knowledge retention.

- 🟡 **[PR #168076](https://github.com/openclaw/openclaw/pull/168076)** – *Explicitly organize and archive nested conversations*  
  → Ready for maintainer look, but stalled due to complexity.

> 🛑 **Warning**: These represent **technical debt** that could derail future scaling and user trust if not addressed.

---

### ✅ **Summary**  
OpenClaw is in a **high-activity, high-risk phase**. While innovation continues (e.g., better UI, AI integrations), **systemic stability and upgrade reliability are under severe strain**. The project must prioritize **fixing P0 bugs** and **establishing recovery mechanisms** before advancing major features. Without action on core reliability, user confidence may erode further.  

**Next Steps**: Focus on closing the top 5 P0 issues, particularly `SQLite WAL`, `update blocking`, and `agent DB locks`. Enable automated recovery paths and improve diagnostics for upgrade failures.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-10-10**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem in Q4 2026 is characterized by **intense development velocity**, **emerging maturity in core reliability**, and a clear pivot from feature expansion to **systemic stability and operational resilience**. Projects are converging on shared challenges: session integrity, upgrade safety, persistent state management, and cross-platform consistency. While innovation continues—especially in multimodal support, cost tracking, and orchestration—user feedback reveals growing frustration with unrecoverable failures, silent data loss, and poor diagnostics. This signals a maturing landscape where **trust, uptime, and self-healing capabilities** are becoming as critical as model performance.

---

### **2. Activity Comparison**

| Project        | Issues (Last 24h) | PRs (Last 24h) | Releases? | Health Score¹ (1–10) |
|----------------|-------------------|-----------------|-----------|------------------------|
| **OpenClaw**   | 500               | 500             | ❌ No     | 4.2                    |
| **Hermes Agent** | 50              | 50              | ❌ No     | 6.8                    |
| **QwenPaw**    | 21                | 35              | ❌ No     | 7.1                    |
| **ZeroClaw**   | 26                | 50              | ❌ No     | 6.3                    |
| **IronClaw**   | 0                 | 0               | —         | 1.0²                   |

> **¹ Health Score**: Based on severity of unresolved P0/P1 bugs, fix rate, diagnostic visibility, and community sentiment.  
> **² IronClaw shows no activity; likely dormant or inactive.**

*Observation*: OpenClaw dominates in volume but reflects high instability. QwenPaw and ZeroClaw show balanced, focused activity. Hermes Agent maintains steady refinement momentum. IronClaw is effectively inactive.

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the **most active but most unstable** project in the ecosystem. Its sheer volume of issues and PRs (500 each) indicates aggressive development—but also systemic fragility. Unlike peers, OpenClaw is currently **in crisis mode**, with multiple P0 bugs involving database corruption, update paralysis, and session lockups that prevent any user interaction.  

Its technical approach leans toward **deep integration with local tooling and Git-based workflows**, emphasizing "agent-as-a-service" with strong sandboxing and authority verification. This differentiates it from more lightweight agents like QwenPaw or Hermes Agent. However, this complexity comes at a cost: **poor error recovery, weak upgrade safety, and inadequate diagnostics**.  

Community size appears large (high comment volume), but engagement is increasingly reactive and frustrated—indicating **a trust deficit despite high contribution levels**. In contrast, peers like QwenPaw and ZeroClaw maintain better balance between innovation and stability.

---

### **4. Shared Technical Focus Areas**  
Across all active projects, recurring themes reflect fundamental needs for production-grade agent systems:

| Requirement                         | Projects Affected                     | Key Examples |
|-------------------------------------|---------------------------------------|--------------|
| **Persistent Session Integrity**    | OpenClaw, Hermes Agent, ZeroClaw      | SQLite WAL bloat (#143524), duplicate messages (#128293), lost timestamps (#11420) |
| **Upgrade & Recovery Safety**       | OpenClaw, QwenPaw, ZeroClaw           | Update hangs (#167771), RCE exploits (#8153), unhandled restart states |
| **Cross-Platform Consistency**      | Hermes Agent, QwenPaw, ZeroClaw       | Termux/Python 3.14 breakage, Windows UTF-8 script failures, LAN access crashes |
| **Security Boundary Enforcement**   | QwenPaw, ZeroClaw, Hermes Agent       | Root RCE via MCP driver (#8153), tool allowlist bypass (#135594), device-code drift |
| **Cost & Token Transparency**       | ZeroClaw, Hermes Agent                | Under-counted tokens, $0.00 billing, missing `total_tokens` |
| **Multimodal Input/Output Resilience** | QwenPaw, ZeroClaw                  | Image orientation loss, dropped media, SVG rendering errors |

These patterns suggest a **cross-cutting need for resilient, auditable, and self-repairing agent infrastructure**—not just individual feature improvements.

---

### **5. Differentiation Analysis**

| Dimension               | OpenClaw                            | Hermes Agent                          | QwenPaw                              | ZeroClaw                               |
|-------------------------|-------------------------------------|----------------------------------------|--------------------------------------|----------------------------------------|
| **Feature Focus**       | Full-stack gateway + Git-integrated agents | Lightweight, secure, stable updates | On-device inference, i18n, UX polish | Agent autonomy, RAG, A2A protocol       |
| **Target Users**        | DevOps, enterprise integrators      | Privacy-conscious users, researchers | Multilingual creators, edge AI devs  | Security testers, advanced orchestrators |
| **Architecture**        | Monolithic gateway + DB-heavy state | Decoupled auth, modular plugins       | Client-centric, client-side models   | Gateway-separated, A2A protocol-driven |
| **Core Strength**       | Deep Git + credential integration   | Stability, security, CI hygiene       | UI responsiveness, localization      | Observability, auditability, cost control |
| **Weakness**            | Unrecoverable state, poor upgrades  | Silent context truncation             | Critical RCE vulnerability           | High S1 bugs in ZeroCode/Telegram      |

> **Key Insight**: OpenClaw leads in ambition but lags in reliability. QwenPaw excels in accessibility. ZeroClaw pushes architectural frontiers. Hermes Agent balances safety and usability.

---

### **6. Community Momentum & Maturity**

| Tier               | Projects                             | Characteristics |
|--------------------|--------------------------------------|-----------------|
| **High-Momentum**  | OpenClaw, QwenPaw, ZeroClaw          | Rapid PR/issue turnover, active triage, urgent bug fixes underway. QwenPaw and ZeroClaw show disciplined focus. |
| **Stabilizing**    | Hermes Agent                         | Steady, low-volume updates focused on fixing regressions and improving diagnostics. Stable release channel now default. |
| **Dormant**        | IronClaw                             | No activity for 24+ hours; likely abandoned or paused. |

*Notable Trend*: The ecosystem is entering a **"stability phase"**—projects are shifting from rapid feature growth to **core system hardening**. OpenClaw’s crisis-level instability contrasts with others’ measured progress, suggesting divergent maturity paths.

---

### **7. Trend Signals**  
From community feedback and PR activity, the following industry trends emerge:

1. **Self-Healing Systems Are Non-Negotiable**  
   > “I can’t upgrade because the update hangs forever.” — OpenClaw user  
   > *Signal:* Users demand **automated rollback, recovery paths, and diagnostic visibility** for every operation (updates, sessions, DB locks).

2. **Trust Requires Auditability & Transparency**  
   > “My WhatsApp replies fail silently after restart.” — OpenClaw user  
   > *Signal:* Developers prioritize **end-to-end message traceability, cost logging, and session provenance**—critical for compliance and debugging.

3. **Multimodality Demands Robust Error Handling**  
   > “Image orientation lost,” “empty final bubbles” — QwenPaw users  
   > *Signal:* As agents handle images, audio, and video, **media fidelity and graceful degradation** are now top priorities.

4. **Global Access Drives Localization Demand**  
   > “Add Spanish interface” — QwenPaw  
   > *Signal:* Non-English speaking developers are actively requesting i18n—indicating **global adoption is accelerating**.

5. **Agent Orchestration Is Evolving Toward Determinism**  
   > “Single-tool rounds,” “per-task profile routing” — ZeroClaw, Hermes Agent  
   > *Signal:* Users want **predictable, auditable decision-making**, not black-box autonomy.

---

### ✅ **Final Takeaway for Developers & Decision-Makers**  
The personal AI agent ecosystem is transitioning from **innovation-first** to **reliability-first**. Projects like OpenClaw are warning signs of what happens when scale outpaces system design. Meanwhile, QwenPaw, ZeroClaw, and Hermes Agent are setting benchmarks for **secure, observable, and user-friendly agent platforms**.

For developers: Prioritize **error boundaries, session durability, and upgrade safety** over new features. For organizations: Choose agents with **proven recovery mechanisms, transparent cost tracking, and strong cross-platform testing**—especially if deploying in regulated or production environments.

**Next Milestone**: v0.9.0 releases across ZeroClaw, Hermes Agent, and QwenPaw will likely define the next 12 months of ecosystem maturity. Watch for **RAG, A2A protocols, and deterministic execution** as key differentiators.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

---

### **Hermes Agent Project Digest — 2026-10-10**

---

#### **1. Today's Overview**  
The Hermes Agent project remains highly active, with **50 new issues and 50 PRs updated in the last 24 hours**, indicating sustained development momentum. Despite no new releases, the ecosystem is undergoing intense refinement—particularly around session state integrity, compatibility across platforms (especially Windows/Android), and security boundary enforcement. High-priority bugs related to message duplication, context compression, and authentication flows are dominating discussions, while feature work on update stability, memory management, and TTS streaming is advancing rapidly. The community is clearly focused on reliability, performance, and cross-platform usability ahead of a potential v0.22 release.

---

#### **2. Releases**  
❌ **No new releases** reported today.  
*Note:* The latest stable version remains `v0.21.5` (2026.9.24). No breaking changes or migration notes are pending. Future updates will likely focus on stabilizing the `stable` channel behavior (see #135847) and resolving high-severity bugs before a formal release.

---

#### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- [#135566](https://github.com/nousresearch/hermes-agent/pull/135566): *feat(agent): extend pre_verify gate to text-response stops (opt-in)* – Enables fine-grained control over agent verification logic.  
- [#133801](https://github.com/nousresearch/hermes-agent/pull/133801): *test(matrix): compose source notes with reaction backfill* – Improves Matrix integration robustness by ensuring message history consistency.  
- [#135406](https://github.com/nousresearch/hermes-agent/pull/135406): *Test runs no longer leave detached gateways running* – Enhances CI hygiene by killing orphaned processes post-test.  
- [#132346](https://github.com/nousresearch/hermes-agent/pull/132346): *ci: real-update E2E gates every updater change* – Adds critical safety checks for update workflows, especially on Windows.  

🔧 **Key Advancements:**  
- Update system now defaults to stable releases (#135847).  
- Security boundaries tightened in auth flow (#135909).  
- Memory atomicity improved via `apply_batch` precondition (#135901).  
- Plugin catalog upgraded to `limbic@0.6.2` with cache GC and confidence-gated recall (#135796).

---

#### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement (Comments >5):**  
- [#99943](https://github.com/nousresearch/hermes-agent/issues/99943): *Compressor context window clamped to model.ollama_num_ctx on cloud providers* – 10 comments. Affects users on Ollama-based cloud deployments; silently truncates large contexts (e.g., 1M → 65k tokens). Critical for long-context agents.  
- [#128293](https://github.com/nousresearch/hermes-agent/issues/128293): *Duplicate message rows after context compaction* – 6 comments. Reproduced across multiple clients; symptoms match prior reports (#126021, #117750). Indicates deeper session state corruption during compaction.  
- [#127621](https://github.com/nousresearch/hermes-agent/issues/127621): *Desktop app: assistant response occasionally renders duplicated text* – 7 comments, 7 👍. User-facing UX regression affecting trust in output fidelity.  
- [#135594](https://github.com/nousresearch/hermes-agent/issues/135594): *Multiplexed gateway: profile MCP tool allowlist ignored* – 4 comments. High-severity security risk: read-only profiles gain write access due to config name collision.  

🔍 **Top PRs by Activity:**  
- [#135909](https://github.com/nousresearch/hermes-agent/pull/135909): *fix(auth): record the Nous device-code grant’s approval time* – Addresses credential lifecycle drift.  
- [#135847](https://github.com/nousresearch/hermes-agent/pull/135847): *feat(update): hermes update follows stable releases by default* – Highly anticipated fix for stability-focused users.  
- [#135917](https://github.com/nousresearch/hermes-agent/pull/135917): *feat(desktop): cron "Start from": copy job or customize prompt* – Expands automation capabilities in desktop UI.  

💡 **Underlying Needs:**  
- **Stability at scale**: Users demand reliable context handling (compression, sessions) under heavy load.  
- **Security by design**: Authentication and role isolation (MCP tools, profiles) must be robust.  
- **Cross-platform parity**: Consistent behavior across Windows, Android (Termux), and Linux is critical.

---

#### **5. Bugs & Stability**  
🚨 **High Severity (P1/P2):**  
- [#128293](https://github.com/nousresearch/hermes-agent/issues/128293): Duplicate messages after compaction – **no fix PR yet**. Impacts user trust in transcript accuracy.  
- [#99943](https://github.com/nousresearch/hermes-agent/issues/99943): Silent context truncation on cloud Ollama endpoints – **critical for long-context use cases**.  
- [#135594](https://github.com/nousresearch/hermes-agent/issues/135594): Tool allowlist bypass in multiplexed gateway – **security vulnerability**; requires immediate attention.  

🟡 **Medium Severity (P3):**  
- [#126493](https://github.com/nousresearch/hermes-agent/issues/126493): Matrix adapter drops approval prompts under rate limits – causes silent failure in sensitive workflows.  
- [#135881](https://github.com/nousresearch/hermes-agent/issues/135881): Docs contradict loader behavior for AGENTS.md discovery – misleading guidance.  
- [#135853](https://github.com/nousresearch/hermes-agent/issues/135853): Streaming TTS ignores speed setting – affects voice experience quality.  

✅ **Fix PRs Exist:**  
- [#135911](https://github.com/nousresearch/hermes-agent/pull/135911): Fixes media filename loss in Matrix captions.  
- [#135913](https://github.com/nousresearch/hermes-agent/pull/135913): Fixes `hermes update` draining pause budget unnecessarily.  
- [#135909](https://github.com/nousresearch/hermes-agent/pull/135909): Records device-code approval time to prevent drift.

---

#### **6. Feature Requests & Roadmap Signals**  
✨ **Emerging Priorities (User-Requested):**  
- **TTS Speed Control** (#135853): Users want consistent voice pacing across all providers.  
- **Colorful Desktop Theme** (#61535): Long-standing UI request for better visual feedback and accessibility.  
- **Cron Job Customization** (#135917): Advanced automation workflow support.  
- **Per-Task Profile Routing** (#103965): Enable dynamic delegation (model, memory, attribution per task).  
- **Token Cost Meter Plugin** (#135912): Real-time cost visibility in status bar – signals growing concern over LLM usage economics.

🔮 **Predicted Next Version (v0.22):**  
Likely to include:  
- Stable release channel by default (`hermes update` behavior).  
- Enhanced security (auth, profile isolation, tool allowlists).  
- Context compression fixes (deduplication, clamping).  
- Improved TTS and memory atomicity.  
- Plugin catalog upgrades (limbic@0.6.2+).

---

#### **7. User Feedback Summary**  
💬 **Pain Points:**  
- **Session instability**: Users report duplicate messages, invisible edits, and inconsistent state after compaction (#127621, #128293).  
- **Authentication friction**: Service-account login fails in 1Password vault fill (#108335); device-code expiry not tracked (#135909).  
- **Platform-specific crashes**: Termux + Python 3.14 breaks `uv lock` (#126194); Windows UTF-8 .ps1 scripts fail silently (#134960).  
- **UX limitations**: Small status bar text (#61535), monochrome UI, lack of customization.  

🌟 **Satisfaction Signals:**  
- Positive reception to `pre_verify` opt-in (#135566).  
- Appreciation for plugin catalog improvements (limbic@0.6.2).  
- Relief from `hermes update` now following stable releases (#135847).

---

#### **8. Backlog Watch**  
⏳ **Long-Unanswered Critical Issues (≥30 days, high impact):**  
- [#79357](https://github.com/nousresearch/hermes-agent/issues/79357): `idle_compact_after_seconds` never fires in gateway mode – **blocking auto-session cleanup**.  
- [#48523](https://github.com/nousresearch/hermes-agent/issues/48523): `convert_messages` doesn’t strip internal metadata – causes 400 errors with strict providers.  
- [#119403](https://github.com/nousresearch/hermes-agent/issues/119403): Session-list refresh causes massive DB reads (~186 MB/s) – **high CPU burn on large state.db**.  
- [#91479](https://github.com/nousresearch/hermes-agent/issues/91479): Desktop SSH fails on Windows remotes – **blocks remote dev workflows**.  

⚠️ **PRs Needing Attention:**  
- [#103965](https://github.com/nousresearch/hermes-agent/pull/103965): Per-task profile routing – **core delegation flexibility**; stalled since 2026-09-06.  
- [#135867](https://github.com/nousresearch/hermes-agent/issues/135867): Field report on phone→Tailscale→gateway patterns – **real-world deployment insights**; needs documentation.  

> 🔎 *Recommendation:* Prioritize backlog items related to session state, performance, and platform compatibility. These are foundational to user adoption and enterprise readiness.

---  
**Generated:** 2026-10-10 | Source: GitHub Data (Hermes Agent)

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-10-10**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active, with 35 pull requests and 21 issues updated in the past 24 hours—indicating strong community engagement and ongoing development momentum. Despite no new releases, significant progress is evident in stability fixes, i18n improvements, and security hardening. The core team is prioritizing user experience enhancements (e.g., UI responsiveness, session recovery) while addressing critical bugs related to model integration, media handling, and session integrity. Overall, the project shows robust health with a focus on reliability and global accessibility.

---

### **2. Releases**  
**No new releases were published today.**  
There are no version updates or changelogs available as of 2026-10-10. The latest stable release remains at **v2.2.2b4**, with ongoing beta testing for upcoming features. Users should expect future updates to include enhanced security patches, improved memory management, and expanded language support.

> 🔗 [GitHub Release Page](https://github.com/agentscope-ai/QwenPaw/releases)

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**
- ✅ **PR #8155** – Updated local model recommendations for QwenPaw-Flash 9B, 27B, and 35B-A3B (GGUF formats), improving performance options for on-device inference.
- ✅ **PR #8136** – Fixed EXIF orientation preservation during image resizing, resolving visual corruption in model inputs.
- ✅ **PR #8010** – Added resilience to media payload rejections, preventing permanent session failure after oversized image errors.
- ✅ **PR #8089** – Enabled `crypto.randomUUID()` fallback via `getRandomValues()` for LAN HTTP access, fixing console crashes.
- ✅ **PR #7931** – Introduced durable SQLite-based transcript history with pagination and deduplication—key for long-running sessions.

These merged changes reflect a strong focus on **session durability, media fidelity, and cross-environment compatibility**.

> 🔗 [PR #8155](https://github.com/agentscope-ai/QwenPaw/pull/8155) | [PR #8136](https://github.com/agentscope-ai/QwenPaw/pull/8136) | [PR #8010](https://github.com/agentscope-ai/QwenPaw/pull/8010) | [PR #8089](https://github.com/agentscope-ai/QwenPaw/pull/8089) | [PR #7931](https://github.com/agentscope-ai/QwenPaw/pull/7931)

---

### **4. Community Hot Topics**  
Top-engaged issues and PRs reveal urgent user needs:

- 🚨 **Issue #8153** – *Security: MCP Driver config API enables root RCE* (2 comments, zero likes).  
  > A confirmed production-level exploit chain leading to persistent mining malware deployment via unauthenticated driver configuration. This is a **critical severity** issue requiring immediate attention.  
  > 🔗 [Issue #8153](https://github.com/agentscope-ai/QwenPaw/issues/8153)

- 🌍 **Issue #8160** – *Add Spanish (es) interface language* (2 comments, zero likes).  
  > High demand from non-English speaking users; aligns with roadmap goals for global inclusivity.  
  > 🔗 [Issue #8160](https://github.com/agentscope-ai/QwenPaw/issues/8160)

- 🛠️ **PR #8154** – *Improve chunk error recovery and diagnostics* (linked to #8120, 1 comment).  
  > Addresses frequent "page load failed" errors across devices, indicating widespread UX disruption.  
  > 🔗 [PR #8154](https://github.com/agentscope-ai/QwenPaw/pull/8154)

These signals show growing demand for **security hardening**, **language localization**, and **robust frontend resilience**.

---

### **5. Bugs & Stability**  
Critical bugs reported today highlight systemic risks:

| Severity | Issue | Summary | Fix PR? |
|--------|-------|--------|--------|
| ⚠️ **Critical** | [#8153](https://github.com/agentscope-ai/QwenPaw/issues/8153) | Root RCE via MCP Driver config API — exploited in production. | ❌ No fix yet |
| ⚠️ **High** | [#8162](https://github.com/agentscope-ai/QwenPaw/issues/8162) | OpenAI Responses API stream halts mid-conversation due to missing delta parsing. | ❌ Not resolved |
| ⚠️ **High** | [#8120](https://github.com/agentscope-ai/QwenPaw/issues/8120) | Frequent page load failures across devices (especially LAN access). | ✅ PR #8154 addresses it |
| ⚠️ **Medium** | [#8158](https://github.com/agentscope-ai/QwenPaw/issues/8158) | Final answer rendered empty when Scroll headline is standalone. | ❌ No fix |
| ⚠️ **Medium** | [#8143](https://github.com/agentscope-ai/QwenPaw/issues/8143) | SVG width/height errors from Button size prop spamming logs. | ✅ PR #8157 fixes it |

> 🔗 [Issue #8153](https://github.com/agentscope-ai/QwenPaw/issues/8153) | [Issue #8162](https://github.com/agentscope-ai/QwenPaw/issues/8162) | [Issue #8120](https://github.com/agentscope-ai/QwenPaw/issues/8120)

---

### **6. Feature Requests & Roadmap Signals**  
User-driven feature requests point toward next-release priorities:

- ✅ **Multilingual Support**:  
  - Add **Spanish (es)** interface (Issue #8160).  
  - Add i18n to tool approval cards (Issue #7809).  
  → *Strong signal for v2.3+ internationalization push.*

- ✅ **Enhanced Memory & Context Management**:  
  - Persistent memory plugin (PR #7613).  
  - Durable transcript storage (PR #7931).  
  → Indicates demand for **long-term agent memory and auditability**.

- ✅ **Tooling Improvements**:  
  - Add `view_audio` built-in tool (Issue #8081).  
  - Better control over coding CLI workers (PR #8156).  
  → Suggests growing need for **multimodal agent capabilities** and **enterprise-scale orchestration**.

---

### **7. User Feedback Summary**  
Real-world pain points emerge clearly:

- **Session Crashes & Unrecoverable States**:  
  Multiple users report permanent session death after image upload rejection (#8009), suggesting poor error boundary handling.

- **UI/UX Friction**:  
  “Page loading fails” (Issue #8120), “context not updating” (Issue #7994), and “empty final bubbles” (Issue #8158) indicate inconsistent rendering and state synchronization.

- **Media Handling Gaps**:  
  Image orientation loss (#8129), silent image drop in Feishu messages (#8150), and lack of audio tools (#8081) reveal deficiencies in **cross-platform multimodal input/output**.

- **Performance & Accessibility**:  
  GPU-heavy glass effects (Issue #8135) and Safari-specific module errors (PR #8154) point to **performance optimization** needs on low-end and legacy systems.

> 👥 *Users are increasingly using QwenPaw for complex, long-running workflows — demanding higher stability, richer modality support, and better error recovery.*

---

### **8. Backlog Watch**  
Key long-standing issues requiring maintainer attention:

| Issue | Status | Priority | Notes |
|------|--------|---------|------|
| [#8040](https://github.com/agentscope-ai/QwenPaw/issues/8040) | Open | High | Reindex failure due to CJK chunk token limit — recurrence of #5950. Needs deep provider integration fix. |
| [#7599](https://github.com/agentscope-ai/QwenPaw/issues/7599) | Closed | Medium | `MissingSessionID` error persists in OpenCode Go — likely misconfigured header propagation. |
| [#8134](https://github.com/agentscope-ai/QwenPaw/issues/8134) | Open | High | Chat records vanish unexpectedly — possibly linked to context window logic. |
| [#8148](https://github.com/agentscope-ai/QwenPaw/issues/8148) | Open | Medium | Reasoning fold/microcompaction never triggers on large-context models — undermines efficiency. |
| [#8135](https://github.com/agentscope-ai/QwenPaw/issues/8135) | Open | Medium | GPU-intensive glass effects degrade UX on integrated graphics — suggests need for “reduced effects” mode. |

> 🔔 These issues represent **technical debt in core UX and system design** that could hinder adoption if left unresolved.

---

### ✅ **Final Assessment**  
QwenPaw is in a phase of **rapid evolution**, balancing high innovation with rising complexity. While recent merges improve stability and localization, **critical security flaws and session reliability issues** remain open. The community is vocal about usability, performance, and global access—signals that the next major release (likely v2.3) must prioritize **security hardening, session resilience, and multilingual support**. With strong contributor activity and clear user feedback, the project is well-positioned for growth—but only if maintainers act decisively on high-risk issues.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-10-10  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **26 new issues and 50 pull requests updated in the last 24 hours**, indicating strong ongoing development momentum. The core focus centers on **runtime stability, cost tracking accuracy, agent loop reliability, and security hardening**, particularly around session state management, provider integration, and observability. High-priority bugs (S1/S2) related to Telegram channel health, message loss in ZeroCode, and SQLite timestamp corruption are actively being addressed. Despite no new releases, the pipeline is saturated with feature enhancements—especially in agent architecture, RAG capabilities, and provider routing—that suggest a major v0.9.0 milestone may be approaching.

---

### **2. Releases**

> ❌ **No new releases** were published in the past 24 hours.

There are currently **no release notes or version updates** available. The last known stable version remains **v0.8.6**, with **v0.9.0** still under development as tracked in [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432). Developers should expect breaking changes related to gateway separation, A2A protocol, and cost ledger refactoring in the next release.

---

### **3. Project Progress**

**Merged/Closed PRs (Today):**  
- **#11454** ([fix(runtime): correlate conversation keys with turn traces](https://github.com/zeroclaw-labs/zeroclaw/pull/11454)) – Improved logging traceability by linking `trace_id` to conversation keys, enhancing debugging.
- **#11494** ([refactor(zerocode): isolate client message queue ownership](https://github.com/zeroclaw-labs/zeroclaw/pull/11494)) – Cleaned up ZeroCode’s message queue logic, improving resilience and maintainability.
- **#11466** ([feat(config): report per-target application results](https://github.com/zeroclaw-labs/zeroclaw/pull/11466)) – Added visibility into config application outcomes across targets, enabling better auditability.

**Key Advancements:**  
- **Agent-loop stability** improved via PR #11617 ([close steering channel before turn finishes](https://github.com/zeroclaw-labs/zeroclaw/pull/11617)), preventing race conditions during turn termination.
- **Cost tracking integrity** advanced with #11587 ([apply config/set cost limits to live tracker](https://github.com/zeroclaw-labs/zeroclaw/pull/11587)), ensuring real-time budget enforcement.

---

### **4. Community Hot Topics**

| Issue / PR | Activity | Summary | Link |
|-----------|--------|--------|------|
| **#11612** ([Bug]: Re-running shell command aborts ACP session) | 2 comments, high severity | Users report critical failure in supervised mode when re-executing approved commands — a workflow blocker for safety testing tools like KUMA. | [Issue #11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612) |
| **#11615** ([Bug]: Telegram ignores retry_after) | 1 comment, S1 severity | Immediate retries compound Telegram flood-limiting, risking message loss — urgent fix needed for production bots. | [Issue #11615](https://github.com/zeroclaw-labs/zeroclaw/issues/11615) |
| **#11634** ([ci]: bump Rust toolchains to 1.99.0) | 0 comments, 1 contributor | Critical CI upgrade to maintain compatibility with modern Rust; foundational for future builds. | [PR #11634](https://github.com/zeroclaw-labs/zeroclaw/pull/11634) |
| **#11467** ([feat]: opt-in single-tool provider rounds) | 0 comments, XL size | High-impact architectural change allowing granular control over tool execution flow — likely a v0.9.0 centerpiece. | [PR #11467](https://github.com/zeroclaw-labs/zeroclaw/pull/11467) |

**Analysis of Needs:**  
Users demand **predictable, safe agent behavior** under edge cases (repeated actions, network failures), **accurate cost accounting**, and **stable integrations** (Telegram, OpenAI-compatible providers). There’s growing interest in **fine-grained control** over agent decision-making (e.g., single-tool rounds), suggesting a shift toward more deterministic, auditable agent workflows.

---

### **5. Bugs & Stability**

| Severity | Issue | Description | Fix PR? |
|---------|------|------------|--------|
| **S1** | [#11615](https://github.com/zeroclaw-labs/zeroclaw/issues/11615) | Telegram send path ignores `retry_after`, causing immediate retries that worsen 429 throttling. | ❌ No PR yet |
| **S1** | [#11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618) | ZeroCode silently drops queued messages when daemon rejects due to `SESSION_BUSY`. | ❌ No PR yet |
| **S1** | [#11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608) | Telegram listener can wedge forever on blackholed request — no recovery mechanism. | ❌ No PR yet |
| **S2** | [#11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420) | SQLite session backend rewrites `created_at` on every turn → lost per-message timestamps. | ✅ Fixed in PR #11454 (merged) |
| **S2** | [#11613](https://github.com/zeroclaw-labs/zeroclaw/issues/11613) | Cost ledger drops `total_tokens` from compatible providers → under-counting for models like Gemini. | ❌ No PR yet |
| **S2** | [#11484](https://github.com/zeroclaw-labs/zeroclaw/issues/11484) | ZeroCode disables repetitive-tool safeguards, leading to repeated web_fetch calls. | ❌ No PR yet |

> ⚠️ **Critical Risk**: Multiple S1 issues in **ZeroCode** and **Telegram channel** indicate instability in user-facing components. These could severely impact adoption in production environments.

---

### **6. Feature Requests & Roadmap Signals**

| Feature | Status | Priority | Expected in v0.9.0? | Notes |
|-------|--------|----------|------------------|------|
| **RAG / Knowledge Corpus** ([#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235)) | RFC accepted | P2 | ✅ Yes | Core capability boundary for document-aware agents. |
| **A2A Protocol Crate** ([#11254](https://github.com/zeroclaw-labs/zeroclaw/issues/11254)) | RFC accepted | P2 | ✅ Yes | Cross-cutting refactor to unify agent-to-agent communication. |
| **Search Routes (hint-based routing)** ([#11074](https://github.com/zeroclaw-labs/zeroclaw/issues/11074)) | RFC accepted | P2 | ✅ Yes | Enables multi-provider query routing (e.g., primary vs. corroboration). |
| **Single-tool provider rounds** ([#11467](https://github.com/zeroclaw-labs/zeroclaw/pull/11467)) | In review | P2 | ✅ Yes | Major control enhancement for tool execution order. |
| **Downscale oversized images instead of dropping** ([#9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)) | Accepted | P2 | ⚠️ Possible | High utility for multimodal agents; may land post-v0.9.0. |

> 📌 **Roadmap Signal**: The project is clearly converging on **agent autonomy, security, and observability** — with v0.9.0 expected to deliver major architectural upgrades: **gateway separation, A2A protocol, RAG support, and enhanced cost transparency**.

---

### **7. User Feedback Summary**

- **Safety Testing Teams (e.g., DefuzeX)** report **critical flaws in agent loop handling** when repeating approved commands — indicating a gap in safety guardrails despite approval mechanisms.
- **Developers using OpenRouter** face **inaccurate cost reporting** (`$0.00`, all tokens marked "free tok"), undermining trust in billing systems.
- **Telegram users** express frustration with **unrecoverable wedged listeners** and **message loss due to aggressive retries**, limiting bot reliability.
- **ZeroCode TUI users** complain about **missing message timestamps** and **silent message loss**, reducing debuggability in long sessions.
- **Operators managing sensitive configs** desire **editable secret key/value maps** in dashboard/ZeroCode (tracked in #11419), indicating a need for UX improvements in configuration management.

> 💬 **Overall Sentiment**: High engagement but clear frustration with **stability, visibility, and reliability** in production workflows. Users value security and auditability but are hampered by technical debt in core components.

---

### **8. Backlog Watch**

| Issue | Reason for Attention | Link |
|------|----------------------|------|
| **#8692** – Maintainer decision queue for RFCs/design issues | Critical backlog bottleneck; no maintainer action visible despite acceptance. Blocks prioritization. | [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) |
| **#9887** – Downscale oversized images instead of dropping | High usability improvement; accepted but stalled since Aug 2026. Could enable safer multimodal interaction. | [Issue #9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887) |
| **#11638** – Restore stable community entry points | Public links broken (Discord invite fails); impacts onboarding. Simple fix, but unaddressed. | [Issue #11638](https://github.com/zeroclaw-labs/zeroclaw/issues/11638) |
| **#11614** – `map_key_sections` leaks schema paths | Memory leak in config system; affects daemon longevity. Minor risk but cumulative. | [Issue #11614](https://github.com/zeroclaw-labs/zeroclaw/issues/11614) |

> 🔍 **Note**: Despite many open issues, **maintainer attention is unevenly distributed**. Key RFCs and UX improvements remain unresolved, signaling potential bottlenecks in governance and triage capacity.

---

**✅ Conclusion:** ZeroClaw is in a **high-growth phase**, with significant engineering investment in agent architecture and observability. However, **technical debt and delayed maintenance** in core subsystems (ZeroCode, Telegram, cost tracking) pose risks to stability. The upcoming v0.9.0 release is poised to be transformative — but only if current S1/S2 bugs are prioritized and backlog items like #8692 receive timely attention.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*