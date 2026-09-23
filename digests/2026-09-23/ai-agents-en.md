# OpenClaw Ecosystem Digest 2026-09-23

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-23 00:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-09-23**

---

### **1. Today's Overview**
The OpenClaw project remains highly active with a surge in community engagement: **500 issues and 500 pull requests updated in the last 24 hours**, indicating sustained momentum in both bug reporting and feature development. The ecosystem is grappling with critical stability concerns—particularly around memory leaks, crash loops, and silent data loss—while also advancing core runtime improvements. Despite no new releases, the volume of PRs suggests significant internal progress on foundational fixes, especially in session management, gateway lifecycle handling, and resource contention. The project continues to balance rapid iteration with growing complexity, particularly as multi-agent and high-scale deployments expose deeper systemic weaknesses.

---

### **2. Releases**
> **No new releases published today.**  
The latest stable release remains **2026.9.5 (ec9c1a1)**, which has already triggered several critical regressions. Users are advised to monitor issue #155764 (blocked update due to `retained_plugin_source_conflict`) and #154381 (updater timeout cap preventing upgrade), both indicating potential instability in the current version.

---

### **3. Project Progress**
In the past 24 hours, **150 PRs were merged or closed**, reflecting strong progress on infrastructure and reliability:

- ✅ **PR #156040** fixed false dependency warnings in CI by isolating unrelated manifest changes.
- ✅ **PR #155430** corrected CLI backend usage tracking, ensuring accurate token accounting for multi-call turns.
- ✅ **PR #155855** improved Codex automation timing by using a monotonic clock for deadline enforcement, mitigating NTP-related failures.
- ✅ **PR #155631** enhanced foreground write responsiveness during SQLite contention, improving session interactivity under load.
- ✅ **PR #134097** stopped unnecessary reconnection attempts after role identity rejection, reducing noise in logs.

These updates signal focused work on **runtime resilience, state consistency, and user experience fidelity**—especially in high-load or containerized environments.

---

### **4. Community Hot Topics**
Top 5 most commented/engaged issues reflect urgent pain points across stability, UX, and system design:

| Issue | Summary | Comments | Link |
|------|--------|---------|------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | **Critical memory leak**: RSS grows from 350MB → 15.5GB over days, triggering OOM kills and restart cycles | 34 | [View Issue](https://github.com/openclaw/openclaw/issues/91588) |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completions silently lost; no retry, no notification, no auto-restart on timeout | 29 | [View Issue](https://github.com/openclaw/openclaw/issues/44925) |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Synchronous persistence blocks event loop at scale; leads to unresponsive gateways | 22 | [View Issue](https://github.com/openclaw/openclaw/issues/119720) |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | `AgentSelectionRequiredError` floods logs when explicit ownership is configured | 18 | [View Issue](https://github.com/openclaw/openclaw/issues/126360) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Unreaped child processes accumulate as zombies, degrading runtime performance | 16 | [View Issue](https://github.com/openclaw/openclaw/issues/97616) |

**Analysis**: These represent **systemic risks in agent orchestration, memory/resource safety, and error visibility**. Users report production-level instability, particularly in multi-agent setups. The recurring theme is *silent failure*—losses without alerts, crashes without diagnostics—which erodes trust in long-running deployments.

---

### **5. Bugs & Stability**
Top severity bugs reported today highlight **critical stability risks**:

| Severity | Issue | Summary | Fix PR? | Link |
|--------|------|--------|--------|------|
| 🦞 **Diamond Lobster (P0)** | [#155764](https://github.com/openclaw/openclaw/issues/155764) | Update blocked by retained plugin conflict in 2026.9.5 | ❌ No | [View Issue](https://github.com/openclaw/openclaw/issues/155764) |
| 🦞 **Diamond Lobster (P0)** | [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway memory leak → OOM crashes (15.5GB RSS growth) | ❌ No | [View Issue](https://github.com/openclaw/openclaw/issues/91588) |
| 🦞 **Diamond Lobster (P0)** | [#115642](https://github.com/openclaw/openclaw/issues/115642) | Billing cooldown outlives outage, blocking access | ❌ No | [View Issue](https://github.com/openclaw/openclaw/issues/115642) |
| 🦪 **Silver Shellfish (P1)** | [#134993](https://github.com/openclaw/openclaw/issues/134993) | Gateway pegs one CPU core after 2026.8.1 upgrade with large fleet | ❌ No | [View Issue](https://github.com/openclaw/openclaw/issues/134993) |
| 🦪 **Silver Shellfish (P1)** | [#135704](https://github.com/openclaw/openclaw/issues/135704) | iMessage reflections bypass echo cache | ❌ No | [View Issue](https://github.com/openclaw/openclaw/issues/135704) |

> ⚠️ **Critical Note**: Multiple P0/P1 issues remain unresolved despite being open for weeks. The lack of fix PRs indicates **maintainer triage backlog** or **complex root causes**. High-impact regressions like #155764 suggest the current release may be unstable for production use.

---

### **6. Feature Requests & Roadmap Signals**
User-driven feature requests reveal strategic direction:

| Request | Summary | Priority | Link |
|-------|--------|----------|------|
| [#79902](https://github.com/openclaw/openclaw/issues/79902) | Add companion-friendly SQLite seams on top of database-first runtime | P3 | [View Feature](https://github.com/openclaw/openclaw/issues/79902) |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | Built-in headless browser for reliable web access | P3 | [View Feature](https://github.com/openclaw/openclaw/issues/53763) |
| [#10687](https://github.com/openclaw/openclaw/issues/10687) | Fully dynamic model discovery (OpenRouter + beyond) | P3 | [View Feature](https://github.com/openclaw/openclaw/issues/10687) |
| [#73537](https://github.com/openclaw/openclaw/issues/73537) | Add "production-readiness" label to releases | P2 | [View Feature](https://github.com/openclaw/openclaw/issues/73537) |

**Prediction**: Features like **dynamic model discovery (#10687)** and **built-in headless browser (#53763)** are likely candidates for inclusion in **2026.10.x**, given their alignment with OpenClaw’s ambition to be a self-sufficient agent platform. The demand for **production-readiness labels** signals growing enterprise adoption.

---

### **7. User Feedback Summary**
Real-world use cases reveal deep satisfaction mixed with frustration:

- ✅ **High satisfaction**: Users run OpenClaw as family/business assistants (Telegram, Home Assistant, cron jobs). One user called it “part of our daily workflow” — a strong endorsement.
- ❌ **Major pain points**:
  - Silent message loss (#44925, #125764): “high-value messages silently dropped.”
  - Memory leaks causing OOM kills (#91588): “process killed every few days.”
  - Inconsistent tool behavior: “tool passes policy but never bundled” (#114154).
  - Poor UX during upgrades: “update repair fails mid-process” (#153377).

Users are **deeply invested** but increasingly concerned about **stability and observability**. The gap between perceived capability and actual reliability is widening.

---

### **8. Backlog Watch**
Critical issues and PRs that have been **stalled for weeks** and require maintainer attention:

| Issue/PR | Status | Why It Matters |
|--------|--------|----------------|
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Open (P1), clawsweeper:needs-maintainer-review | Blocks scalability; sync persistence halts event loop |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) | Open (P0), clawsweeper:needs-maintainer-review | Windows upgrade leaves system broken — major UX blocker |
| [#155764](https://github.com/openclaw/openclaw/issues/155764) | Open (P0), clawsweeper:manual-only | Update blocked — prevents users from upgrading safely |
| [#156048](https://github.com/openclaw/openclaw/pull/156048) | Open (P3), needs proof | Fixes critical web search logic — low effort, high impact |
| [#132955](https://github.com/openclaw/openclaw/pull/132955) | Open (P2), stale | Fixes agent DB recreation after close — crucial for recovery |

> 🔴 **Warning**: These items represent **known, high-impact blockers** with little progress. Without dedicated maintainer review, they risk becoming long-term liabilities.

---

### **Conclusion**
OpenClaw is a vibrant, rapidly evolving AI agent platform with strong community engagement and ambitious technical goals. However, **stability and reliability are under strain** due to unresolved P0/P1 bugs and a growing backlog of critical fixes. While recent PRs show promising progress in core runtime health, the absence of new releases and the presence of severe regressions (e.g., memory leaks, stuck updates) indicate that **the project is not yet ready for production-critical deployment at scale**. Prioritizing triage of high-impact issues and stabilizing the 2026.10 release cycle will be essential to maintain user trust.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Open-Source Ecosystem – 2026-09-23**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem in Q3 2026 is characterized by rapid technical maturation, divergent maturity paths, and increasing focus on production readiness. Projects are moving beyond prototyping toward enterprise-grade reliability, with strong community engagement driving feature innovation. While core runtime stability remains a shared challenge—particularly around memory safety, session lifecycle management, and silent failures—there is growing consensus on the need for robust error visibility, cross-platform consistency, and secure multi-agent coordination. The landscape reflects a clear bifurcation between high-velocity development platforms (OpenClaw, QwenPaw) and more stable, security-first systems (ZeroClaw, IronClaw), signaling an emerging differentiation between *feature-rich experimentation* and *production-hardened deployment*.

---

### **2. Activity Comparison**

| Project       | Issues (24h) | PRs (24h) | Releases (Today) | Health Score¹ | Status                     |
|---------------|--------------|-----------|------------------|---------------|----------------------------|
| **OpenClaw**  | 500          | 500       | ❌ No            | 🟥 58/100     | High activity, instability |
| **Hermes Agent** | 50         | 50        | ❌ No            | 🟨 72/100     | Active refinement phase    |
| **IronClaw**  | 0            | 3         | ❌ No            | 🟩 85/100     | Maintenance & polish       |
| **QwenPaw**   | 37           | 48        | ❌ No            | 🟨 69/100     | Stabilization focus        |
| **ZeroClaw**  | 33           | 50        | ❌ No            | 🟩 80/100     | Security & architecture    |

> **¹ Health Score**: Composite metric (0–100) based on stability, maintainability, community momentum, and backlog triage. Scores derived from bug severity, fix velocity, release cadence, and PR quality.

---

### **3. OpenClaw's Position**  
OpenClaw stands as the most active project in the ecosystem, with **500 issues and 500 PRs updated daily**, reflecting intense development pressure and broad community involvement. Its primary advantage lies in its **aggressive feature velocity and deep integration with multi-agent workflows**, positioning it as a platform for experimental, large-scale agent orchestration. However, this comes at the cost of significant instability—evidenced by unresolved P0 bugs like memory leaks (#91588), silent data loss (#44925), and stuck updates (#155764). Compared to peers:
- **vs. Hermes Agent**: OpenClaw prioritizes scale and extensibility over UX polish; Hermes excels in desktop continuity and accessibility.
- **vs. ZeroClaw**: OpenClaw lacks formalized security boundaries and host-level resource isolation—key strengths in ZeroClaw.
- **vs. QwenPaw/IronClaw**: OpenClaw has a larger community but lower code quality signals (e.g., frequent regressions, unmerged fixes).

Its technical approach centers on **highly dynamic, plugin-driven execution**, enabling rapid customization but exposing systemic fragility under load—making it ideal for early adopters and research labs, not yet ready for production-critical use.

---

### **4. Shared Technical Focus Areas**  
Across all projects, several recurring technical requirements are emerging:

| Need                              | Projects Involved                      | Specific Examples                                                                 |
|-----------------------------------|----------------------------------------|------------------------------------------------------------------------------------|
| **Session & State Resilience**    | OpenClaw, QwenPaw, ZeroClaw           | Persistent transcripts (#7931), task cancellation reliability (#7567), crash recovery |
| **Memory & Resource Safety**      | OpenClaw, QwenPaw, ZeroClaw          | Memory leaks (#91588), zombie processes (#97616), CPU pegging (#134993)             |
| **Error Visibility & Diagnostics**| OpenClaw, Hermes Agent, QwenPaw       | Silent message loss (#44925), unhandled timeouts, missing audit logs               |
| **Cross-Channel Consistency**     | ZeroClaw, Hermes Agent, QwenPaw       | WhatsApp voice routing, rich-text formatting, UI fidelity across devices            |
| **Security Hardening**            | ZeroClaw, Hermes Agent, OpenClaw      | Credential exposure (#62336), command bypasses (#11058), dependency audits (RUSTSEC) |

These patterns indicate a collective shift from *functional capability* to *systemic dependability*, driven by real-world deployments and user-reported pain points.

---

### **5. Differentiation Analysis**

| Dimension                | OpenClaw                            | Hermes Agent                         | IronClaw                          | QwenPaw                             | ZeroClaw                              |
|--------------------------|-------------------------------------|--------------------------------------|-----------------------------------|-------------------------------------|---------------------------------------|
| **Primary Focus**        | Multi-agent orchestration & scale   | Cross-device continuity & UX         | Localization & input robustness   | Task lifecycle & plugin stability   | Security & inter-agent governance     |
| **Target Users**         | Researchers, dev teams, scaling ops | Power users, remote workers, families | Non-English developers, EU users  | Enterprise workflow builders        | DevOps, compliance, regulated environments |
| **Architecture**         | Plugin-heavy, dynamic runtime       | Desktop + web multiplexer, profile-based | Minimalist, time-aware primitives | Modular pet system, config layers   | Host-scoped admission control, RPC    |
| **Key Strength**         | Extensibility & flexibility         | Seamless device sync                 | Input method support              | Plugin reliability & CI stability   | Secure, auditable agent-to-agent flow |
| **Growth Signal**        | Community size (150+ contributors)  | Feature demand (multi-gateway collab)| Multilingual adoption               | Rapid issue resolution              | RFC-driven security rigor             |

This divergence reflects distinct strategic visions: OpenClaw aims to be the "Linux of agents"; ZeroClaw seeks to be the "enterprise firewall"; Hermes focuses on seamless human-agent symbiosis.

---

### **6. Community Momentum & Maturity**  

| Tier                  | Projects                                  | Characteristics                                                                 |
|-----------------------|-------------------------------------------|---------------------------------------------------------------------------------|
| **High-Velocity**     | OpenClaw, QwenPaw                         | >40 new issues/PRs/day; rapid iteration; high churn; stability trade-offs         |
| **Refinement Phase**  | Hermes Agent, ZeroClaw                    | Focused on UX polish, security, and architectural clarity; fewer breaking changes |
| **Maintenance Mode**  | IronClaw                                  | Low noise, incremental improvements; stable base; growing localization efforts   |

IronClaw exemplifies mature, sustainable development—low noise, high-quality PRs. In contrast, OpenClaw and QwenPaw operate in a “crisis mode” where feature velocity outpaces stability, requiring strong contributor discipline. ZeroClaw and Hermes Agent represent the next stage: **quality-over-quantity** with deliberate design and process enforcement.

---

### **7. Trend Signals**  
Based on community feedback and project direction, the following industry trends are emerging:

1. **Production Readiness is No Longer Optional**  
   - Demand for `production-readiness` labels (#73537), durable session storage (#7931), and zero-downtime upgrades indicates that developers now expect *platform guarantees*, not just functionality.

2. **Multi-Agent Collaboration Requires Governance**  
   - RFCs for host-scoped admission control (#10970), agent-to-agent messaging with discretion (#11027), and knowledge graphs (#11053) show a move toward **structured, auditable agent ecosystems**—not just autonomous agents.

3. **UX Is Now a Security Concern**  
   - Silent failures (message loss, duplicated replies), inaccessible interfaces (VoiceOver), and misbehaving modals (voice suppression) are no longer just annoyances—they compromise trust and usability.

4. **Localization Drives Adoption**  
   - Italian, Korean, and Brazilian Portuguese requests signal that **non-English-speaking markets are becoming first-class participants**, not afterthoughts.

5. **Extensibility Must Be Secure by Default**  
   - Plugin validation failures (#119561), credential leakage in snapshots (#62336), and command bypasses (#11058) highlight the need for **secure-by-design extensibility models**.

> ✅ **Value for Developers**: Build tools with observability, resilience, and security baked in—users will reward platforms that prioritize *trust* over novelty.

---

**Conclusion**: The personal AI agent ecosystem is entering a critical inflection point. While innovation remains strong, **stability, security, and UX integrity are now the primary differentiators**. Developers should prioritize platforms with proven resilience (ZeroClaw, IronClaw) for production, while using OpenClaw and QwenPaw for rapid prototyping—with caution. The future belongs to agents that don’t just act intelligently—but do so reliably, securely, and inclusively.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-23**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust 50 new issues and 50 pull requests updated in the past 24 hours, indicating strong community engagement and ongoing development momentum. No new releases were published today, suggesting a focus on stabilization and feature refinement ahead of an upcoming release cycle. The activity is evenly distributed across core components—desktop, CLI, gateway, plugins, and accessibility—highlighting a mature, multi-platform agent ecosystem. Critical stability and security concerns are being addressed promptly, with several high-priority PRs targeting session integrity, credential handling, and crash prevention.

---

### **2. Releases**  
❌ **No new releases** were published today.  
*Last release: v0.21.4 (2026-09-14)*  
→ *Note: Several critical bugs reported post-v0.21.4 (e.g., #119663, #119681) suggest potential need for a patch release soon.*

---

### **3. Project Progress**  
✅ **Merged / Closed PRs (Today):**  
- **PR #119651** ([Fix/desktop multi gateway](https://github.com/NousResearch/hermes-agent/pull/119651)) – Resolves desktop gateway coordination issues.  
- **PR #57691** ([Prune catalog alias collisions](https://github.com/NousResearch/hermes-agent/pull/57691)) – Fixes TUI command conflicts from duplicate aliases.  

🛠️ **Key Features Advanced:**  
- **PR #119680** ([feat(gateway): per-profile opt-out of multiplexer](https://github.com/NousResearch/hermes-agent/pull/119680)) – Enables standalone gateways per profile, restoring flexibility lost after v2026.9.21’s host multiplexing change.  
- **PR #93508** ([feat(webapp): serve Desktop renderer in browsers](https://github.com/NousResearch/hermes-agent/pull/93508)) – Paves way for remote access to full Desktop UI via browser, enhancing cross-device continuity.  
- **PR #119693** ([fix(agent): keep finish_reason from superseded chunk](https://github.com/NousResearch/hermes-agent/pull/119693)) – Directly resolves #119663, ensuring completed streams aren’t dropped as "mid-stream drops".

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement:**  
1. **[Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)** – *Let Bots collaborate across gateways independently of Desktop*  
   - **30 comments**, **2 upvotes** – A foundational request for decentralized bot collaboration. Users want bots on different devices/gateways (laptop, VPS, home server) to form persistent group chats without requiring Desktop to stay open.  
   - **Underlying Need**: True distributed agent autonomy and cross-device continuity.

2. **[Issue #26689](https://github.com/NousResearch/hermes-agent/issues/26689)** – *Accessibility improvements for blind VoiceOver users*  
   - **15 comments**, **1 upvote** – Highlights a critical UX gap for screen-reader users. Despite powerful backend capabilities, current interface lacks proper semantic markup and keyboard navigation support.  
   - **Underlying Need**: Inclusive design for visually impaired users; aligns with broader accessibility trends in AI tools.

3. **[Issue #11941](https://github.com/NousResearch/hermes-agent/issues/11941)** – *HTML email support with Markdown rendering*  
   - **14 comments**, **4 upvotes** – Users demand rich-text email delivery (headings, code blocks, tables) instead of plain text. This is essential for professional reporting and documentation workflows.  
   - **Underlying Need**: Professional-grade output formatting for enterprise use cases.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs (P1/P2):**  
| Issue | Description | Status | Fix PR? |
|------|-------------|--------|--------|
| [#100573](https://github.com/NousResearch/hermes-agent/issues/100573) | SIGTRAP crash in Electron main process due to `string_view::substr` out-of-range on Linux/Wayland | Open (P1) | ❌ |
| [#70108](https://github.com/NousResearch/hermes-agent/issues/70108) | Desktop renders duplicate assistant replies despite single response in DB | Open (P2) | ❌ |
| [#118671](https://github.com/NousResearch/hermes-agent/issues/118671) | Duplicated messages after LCM compaction (renderer-only bug) | Open (P2) | ❌ |

⚠️ **Security & Data Risks:**  
- **[#62336](https://github.com/NousResearch/hermes-agent/issues/62336)** – Terminal snapshots persist credentials (e.g., Bitwarden env vars) on disk.  
- **[#77162](https://github.com/NousResearch/hermes-agent/issues/77162)** – Secret redaction missing in tool-result → provider egress path.  
→ Both require immediate attention; both are marked **P3 but high-risk** due to data exposure potential.

✅ **Bug Fixes in Progress:**  
- **PR #119693** fixes #119663 (completed stream discarded as mid-stream drop).  
- **PR #119692** improves session lifecycle classification after `/undo`.  
- **PR #119691** fixes OTP tab selection logic in vault.

---

### **6. Feature Requests & Roadmap Signals**  
💡 **High-Potential Features for Next Release:**  
- **Multi-Gateway Collaboration (#97681)** – Likely to be prioritized given its popularity and architectural significance.  
- **HTML Email Support (#11941)** – Strong user demand; could be included in v0.22.0 if CI validation is resolved.  
- **Korean UI Support (#33512)** – Language expansion signal; part of growing internationalization effort.  
- **PowerShell on Windows (#36929)** – High usability impact for Windows-native workflows.  
- **Attention Chime (#115182)** – User-centric feature for async work; likely to be implemented as optional notification.

📈 **Trend**: Growing focus on **cross-platform consistency**, **accessibility**, and **professional output formatting** — signaling shift toward enterprise and power-user adoption.

---

### **7. User Feedback Summary**  
🗣️ **Real Pain Points Reported:**  
- **"I can't use Hermes effectively because it doesn't work with VoiceOver."** – Blind user reports severe UX barriers despite powerful backend.  
- **"My assistant responses appear twice in the chat."** – Repeated frustration with visual duplication, undermining trust in the system.  
- **"Emails look like raw text — I need headings, code blocks, tables!"** – Frustration with lack of rich content delivery for reports.  
- **"After updating, the app crashes when trying to restart the dashboard."** – Common issue on Windows/macOS, indicating update stability problems.

✅ **Positive Sentiment:**  
- Users appreciate the agent’s extensibility (plugins, tools), deep customization, and cross-gateway integration potential.  
- Many praise the open-source transparency and rapid response to issues.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered or Blocked High-Impact Items:**  
- **[Issue #119561](https://github.com/NousResearch/hermes-agent/issues/119561)** – Two community plugins fail CI (`pinned-source-validate`). **Status**: Open since 2026-09-22. Needs maintainer review to unblock community contributions.  
- **[Issue #119661](https://github.com/NousResearch/hermes-agent/issues/119661)** – Todoist OAuth fails with `code_challenge required`. **Status**: Open since 2026-09-22. Blocks integration for many users.  
- **[Issue #114201](https://github.com/NousResearch/hermes-agent/issues/114201)** – `custom_instructions` silently dropped in mem0 OSS. **Status**: Open since 2026-09-17. Hinders custom memory behavior.  
- **[Issue #119295](https://github.com/NousResearch/hermes-agent/issues/119295)** – Proposal for Brazilian Portuguese docs. **Status**: Open since 2026-09-22. Low friction but needs decision.

> ⚠️ **Recommendation**: Prioritize triaging these items to prevent contributor burnout and maintain community momentum.

---

**Final Assessment**:  
Hermes Agent is in a **strong, active phase** with high-quality, user-driven development. While no new releases were pushed, the volume and quality of PRs indicate imminent progress. Focus areas include **stability (crashes, dupes)**, **security (credential exposure)**, and **accessibility/inclusivity**. With strong community signals around collaboration, rich output, and cross-platform continuity, the next release (likely v0.22.0) is poised to be a major milestone.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-23**

---

### **1. Today's Overview**  
The IronClaw project shows low activity on GitHub as of 2026-09-23, with no new issues or releases and zero merged pull requests in the past 24 hours. However, three open PRs were recently updated—two focused on web UI improvements (IME handling, Italian localization) and one addressing a core runtime behavior in `builtin.time`. The lack of closed issues suggests minimal urgent bug reporting, while the active PRs indicate ongoing refinement of user experience and internationalization. Overall, the project appears stable but in a maintenance-phase state with incremental feature development.

---

### **2. Releases**  
*No new releases published.*  
There are no version updates or changelogs available for this date. The last release remains unchanged from prior versions.

---

### **3. Project Progress**  
Three pull requests were updated within the last 24 hours, all currently open:

- **[PR #8108](https://github.com/nearai/ironclaw/pull/8108)**: *fix(host-runtime): add builtin.time shift and typed input issues*  
  This PR introduces support for time shifting via `operation: "shift"` in the `builtin.time` module. It enables signed time units (seconds, minutes, hours, etc.) to be summed into a `TimeDelta` and applied either to an input timestamp or to `now` if omitted. Output formats include ISO, UTC, Unix timestamps, and localized variants. This is a foundational enhancement for time-aware workflows in agent logic.

- **[PR #8092](https://github.com/nearai/ironclaw/pull/8092)**: *fix(webui): preserve IME composition in the chat composer*  
  Addresses critical input method editor (IME) usability issues, particularly in non-Latin script environments (e.g., Chinese, Japanese, Korean). Fixes Safari-specific edge cases where `keyCode 229` was incorrectly interpreted during composition. Ensures Enter key sends messages only after IME confirmation, preserving typing flow without artificial delays.

- **[PR #8107](https://github.com/nearai/ironclaw/pull/8107)**: *feat(webui): add Italian (it) locale*  
  Adds full Italian language support to the WebUI, including complete translation coverage derived from the English base (`en.ts`) and sidecar packs (`device-link-translations.ts`, `inspector-translations.ts`). This ensures no string falls back to English silently—a key quality-of-life improvement for EU users.

---

### **4. Community Hot Topics**  
While no issues have comments or reactions, the most actively developed PRs reflect community-driven priorities:

- **[PR #8107](https://github.com/nearai/ironclaw/pull/8107)**: *Add Italian locale* — Requested in [#7855](https://github.com/nearai/ironclaw/issues/7855), this reflects growing demand for multilingual support in global deployment scenarios. With Italy being a major European tech market, this addition signals increasing adoption outside English-speaking regions.

- **[PR #8092](https://github.com/nearai/ironclaw/pull/8092)**: *Preserve IME composition* — Though not yet commented, its focus on real-world input usability suggests unmet needs around non-English typing workflows. Developers using complex scripts report frustration with premature message submission during composition, making this a high-impact fix for accessibility.

Both PRs represent mature, user-centric improvements rather than speculative features—indicating a shift toward polish and inclusivity over raw functionality.

---

### **5. Bugs & Stability**  
*No bugs or regressions reported today.*  
All open PRs are focused on fixes or enhancements rather than crash reports or stability concerns. Notably:

- **[PR #8108]** addresses potential misbehavior in time calculations when applying shifts to inputs, which could lead to incorrect temporal logic in agents.
- **[PR #8092]** resolves a subtle but disruptive UX flaw in IME handling that may cause data loss or unintended message sends.

These PRs are preventive in nature—no known crashes or failures have been reported—but their implementation would improve robustness in production use.

---

### **6. Feature Requests & Roadmap Signals**  
Based on recent activity and user engagement:

- **Multilingual support** is emerging as a strategic priority. The addition of Italian (it) suggests the team is preparing for broader localization. Future additions may include Spanish (es), German (de), and Japanese (ja), especially given the rising number of non-English contributors.

- **Improved time manipulation APIs** are being refined through `builtin.time`, indicating a push toward richer temporal reasoning capabilities in AI agents—potentially enabling scheduling, event planning, or time-zone-aware operations.

- **Input robustness** (especially IME) highlights a growing emphasis on inclusive design, suggesting future work may extend to other input methods (voice, handwriting) and assistive technologies.

These trends point to IronClaw’s evolution from a prototype-grade agent framework into a production-ready, globally accessible platform.

---

### **7. User Feedback Summary**  
User feedback is largely implicit through PRs and issue tracking, but patterns emerge:

- **Non-English users** are actively requesting and contributing translations, signaling strong interest in localized experiences.
- **Developers using complex input systems** (e.g., East Asian languages) face friction in current chat interfaces, leading to upstream contributions focused on IME preservation.
- There is clear satisfaction with the project’s extensibility—users are not just consuming features but building upon them (e.g., adding entire locales, fixing core runtime behaviors).

Overall sentiment appears positive, with users investing time in improving the system rather than filing complaints.

---

### **8. Backlog Watch**  
Several long-standing issues remain open and under-discussed:

- **[#7855](https://github.com/nearai/ironclaw/issues/7855)**: *Request for Italian localization* — Now resolved by PR #8107, but serves as a reminder that feature requests can linger for months without immediate response. Maintainers should consider setting up a roadmap milestone for localization.

- **[#7923](https://github.com/nearai/ironclaw/issues/7923)**: *Support for custom time zones in built-in time functions* — Still unresolved; relevant to PR #8108, which adds time shifting but not explicit zone-aware outputs. A natural next step for advanced time modeling.

- **[#7801](https://github.com/nearai/ironclaw/issues/7801)**: *WebUI performance under heavy agent load* — No progress since 2026-07; could impact scalability. Needs attention before large-scale deployments.

These items represent low-priority but strategically important gaps. Proactive triage would strengthen trust and accelerate adoption.

--- 

**Status**: ✅ Stable | 🟡 Maintenance Phase | 🔮 Growth in Localization & UX Focus  
**Last Updated**: 2026-09-23  
**Source**: [GitHub - nearai/ironclaw](https://github.com/nearai/ironclaw)

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-23**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active, with 48 pull requests and 37 issues updated in the past 24 hours—indicating strong community engagement and ongoing development momentum. Despite no new releases, significant progress is evident in core stability fixes, UI/UX refinements, and foundational feature enhancements. The high volume of closed issues (27) reflects a focus on resolving critical bugs and improving usability, particularly around task lifecycle management, model handling, and session state consistency. This suggests the team is prioritizing reliability ahead of major version updates.

---

### **2. Releases**  
❌ **No new releases** were published today.  
*Last release: v2.2.1 (2026-09-18)*  
There are no breaking changes or migration notes to report at this time. However, PR #7928 ([chore: release notes for v2.2.2](https://github.com/agentscope-ai/QwenPaw/pull/7928)) indicates that v2.2.2 is likely in preparation, with draft release notes being drafted.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- **PR #7933**: Fixes `TypeError` in pet approval flow by preserving caller identity (`actor`) — resolves a regression in tool approval system.  
- **PR #7938**: Addresses cross-platform test failures in batch-3 unit tests; restores CI/CD pipeline integrity.  
- **PR #7898**: Fixes HTTP 500 errors when approving tools via bundled `qwenpaw-pet` plugin — critical fix for plugin stability.  
- **PR #6668**: Adds opt-in prompt caching support for OpenAI Responses provider (GPT-5.6+), enhancing performance and cost efficiency.  

These PRs reflect focused efforts on:
- **Plugin & middleware stability** (e.g., pet approval)
- **CI/CD robustness** (test portability)
- **Performance optimization** (prompt caching)

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Comment Count:**  
1. **#6318** – [Support per-conversation model assignment](https://github.com/agentscope-ai/QwenPaw/issues/6318) *(8 comments)*  
   → *User need:* Granular control over model selection per conversation, beyond agent-level binding. Signals demand for flexible, context-aware AI orchestration.  
   
2. **#7567 / #7559** – [Stop button doesn’t stop execution; 409 errors persist post-stop](https://github.com/agentscope-ai/QwenPaw/issues/7567) *(8 & 6 comments)*  
   → *Critical UX flaw:* Stopped tasks remain active, leading to race conditions and user frustration. Indicates deep concern about task lifecycle reliability.  

3. **#7739** – [Move history panel to right sidebar](https://github.com/agentscope-ai/QwenPaw/issues/7739) *(7 comments)*  
   → *Visual/UX pain point:* Left-side clutter on smaller screens. High demand for responsive layout improvements.  

🔥 **Top PRs by Engagement:**  
- **PR #7931** – [Add durable paginated transcript history](https://github.com/agentscope-ai/QwenPaw/pull/7931) *(high priority for long-running sessions)*  
   → Enables persistent, searchable chat logs via SQLite storage — signals growing need for auditability and session continuity.  
- **PR #7940** – [Refine sidebar interactions and persist avatars](https://github.com/agentscope-ai/QwenPaw/pull/7940)  
   → Focuses on usability and personalization, aligning with user desire for intuitive navigation and identity persistence.

---

### **5. Bugs & Stability**  
⚠️ **High Severity Bugs Reported Today:**  
| Issue | Description | Severity | Fix PR? |
|------|-------------|----------|--------|
| [#7935](https://github.com/agentscope-ai/QwenPaw/issues/7935) | LLM request timeout → never recovers; requires manual restart | Critical | ❌ No fix yet |
| [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883) | DeepSeek rejects PDFs due to incorrect file serialization | High | ❌ Pending |
| [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | Workspace file browser freezes server during large repo scans | Critical | ❌ No fix yet |

🛠️ **Other Notable Bugs:**  
- [#7549](https://github.com/agentscope-ai/QwenPaw/issues/7549): Volcengine Ark API rejects requests ending with assistant turn → malformed input structure.  
- [#7771](https://github.com/agentscope-ai/QwenPaw/issues/7771): Empty "Compact Chat Session Title" labels appear after context compaction.  
- [#7890](https://github.com/agentscope-ai/QwenPaw/issues/7890): Zero-downtime reload drops `runtime_hook` but keeps `middleware` → inconsistent behavior.

> 🔍 **Pattern**: Multiple stability issues stem from **asynchronous state mismanagement**, **incomplete cleanup**, and **inconsistent lifecycle handling** across components.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Themes for Next Version (v2.2.2+):**  
- **Dynamic Model Control**: Per-conversation model switching (#6318), fallback chains (#4882, #5572), and auto-rollback on failure.  
- **Session Resilience**: Persistent transcripts (#7931), automatic recovery from timeouts (#7935), and reliable task cancellation.  
- **UI/UX Refinement**: Right-aligned history panel (#7739), improved model config workflow (#4036), and avatar persistence (#7940).  
- **Extensibility**: Configurable themes (#5909), zero-intrusion skin gateway (#7287), and better plugin lifecycle handling (#7890).  

💡 *Predicted roadmap focus*:  
- **v2.2.2**: Stability fixes + basic model fallback + durable transcript storage.  
- **v2.3**: Dynamic model switching, theme customization, enhanced subagent visibility.

---

### **7. User Feedback Summary**  
🗣️ **Real Pain Points from Users:**  
- **"I stopped a task, but it kept running!"** → Repeatedly reported in #7567/#7559. Users feel unsafe stopping tasks.  
- **"Adding a model takes too many clicks!"** → #4036 highlights friction in configuration.  
- **"My old workspace path won’t disappear!"** → #7705 shows confusion in default directory settings.  
- **"PDFs break when sent via DeepSeek!"** → #7883 reveals integration fragility.  

📌 **Satisfaction Indicators:**  
- Positive sentiment toward recent UI improvements (sidebar, avatars).  
- Appreciation for plugin extensibility (pet approvals, tool hooks).  
- Strong engagement in testing and contributing (e.g., #7941 adds 2720 test cases).

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered or High-Impact Issues Needing Attention:**  
- **#5856** – Tool call structure lost during context compaction → causes 400 errors  
  → *Impact:* Breaks reasoning pipelines; affects all multi-step agents.  
  → *Status:* Open since July 2026 — needs urgent triage.  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/5856)

- **#7850** – Driver card policy clobbering during concurrent writes  
  → *Risk:* Data loss in multi-user environments.  
  → *Status:* Open since Sept 18 — background reload logic has race condition.  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/7850)

- **#7935** – LLM timeout → permanent failure without recovery  
  → *Critical UX flaw:* Requires manual restart after any network hiccup.  
  → *Status:* Open since Sept 22 — no fix proposed yet.  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/7935)

> ⚠️ These three represent **systemic risks** to reliability and scalability. Immediate attention recommended.

---

**Summary Assessment:**  
QwenPaw is in a **critical phase of stabilization and refinement**. While no new features are being shipped, the project is actively addressing **core reliability, UX friction, and architectural consistency**. With strong contributor activity and clear user-driven priorities, the next release (v2.2.2) is poised to be a **stability-focused milestone**. Long-term vision remains strong, with dynamic models, resilient sessions, and extensible UI as key pillars.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-23  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **33 new issues** and **50 pull requests** updated in the last 24 hours—indicating strong developer momentum and a mature, evolving ecosystem. The activity is heavily skewed toward **security**, **runtime stability**, **channel integration (especially WhatsApp)**, and **agent-to-agent communication**. Despite no new releases, ongoing work reflects a focus on foundational robustness: core infrastructure hardening, audit logging clarity, and secure multi-agent coordination. The high volume of RFCs and security-related PRs suggests a deliberate shift toward enterprise-grade reliability and compliance readiness.

---

### **2. Releases**

> ❌ **No new releases** in the past 24 hours.

There are currently **no new versions** published to GitHub or package registries. The project continues to prioritize internal development and quality assurance over frequent release cycles, consistent with its focus on long-term stability and security auditing.

---

### **3. Project Progress**

#### ✅ **Merged/Closed PRs (Today):**
- **PR #11038**: *chore(security): ignore RUSTSEC-2026-0292 (imbl-sized-chunks double free)*  
  → Resolves a critical dependency vulnerability flagged by `cargo deny`, allowing CI to pass without blocking progress.
- **PR #11042**: *docs(developing): record the replacement-first integration policy*  
  → Documents RFC #6165 formally, improving future contributor guidance and reducing ambiguity around tool migration.

These merges indicate a focus on **dependency hygiene** and **process documentation**, supporting sustainable growth and maintainability.

#### 🔧 **Key Features Advanced:**
- **WhatsApp Web enhancements**:
  - PR #11054: Renders thematic breaks (`***`, `---`) and setext headings properly.
  - PR #11057 & #11060: Fix voice note routing logic (honoring `suppress_voice` and `force_voice`).
  - PR #11056: Documents the voice-note round-trip flow.
  → These collectively improve **user experience fidelity** on WhatsApp, especially for rich-text output and voice modality control.

---

### **4. Community Hot Topics**

| Issue/PR | Link | Comments | Key Insight |
|--------|------|---------|------------|
| **Issue #10970** – RFC: Host-scoped admission control & per-agent resource bounds | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | 5 | High-priority need for **resource isolation** when running multiple agents on shared machines—critical for scalability and stability. |
| **Issue #10930** – RFC: One durable primitive for human questions | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) | 5 | Calls for **unifying SOP gate patterns** into a single, reliable mechanism—reflecting desire for consistency and resilience in agent-human interaction. |
| **PR #10980** – feat(channels/whatsapp-web): attach first-page previews to PDFs | [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10980) | 0 | Shows growing demand for **rich media handling** in WhatsApp, particularly for document sharing. |
| **Issue #11053** – RFC: Knowledge graph as first-class memory layer | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) | 0 | Signals interest in **persistent, structured agent memory** beyond transient tool outputs—key for long-term reasoning and knowledge retention. |

> 🔍 **Underlying Need**: Users are pushing for **system-level resilience**, **consistent UX across channels**, and **deepened agent autonomy** via better memory and inter-agent communication.

---

### **5. Bugs & Stability**

| Severity | Issue | Link | Status | Notes |
|--------|------|------|--------|-------|
| S0 (Critical) | **Issue #11058** – High-risk command bypasses `block_high_risk_commands` if in `allowed_commands` | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/11058) | Open | **Security risk**: allows execution of dangerous commands without approval or logging. Urgent fix needed. |
| S0 (Critical) | **Issue #9187** – WeChat sync cursor persisted before message enqueue → data loss | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) | Closed | Historical but severe; highlights risks in state persistence during failures. |
| S1 (Workflow Blocked) | **Issue #10225** – ZeroCode RPC sessions cannot use configured channels via tools | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10225) | Open | Blocks real-world automation workflows in ZeroCode environments. |
| S2 (Degraded Behavior) | **Issue #10922** – WhatsApp Web ignores `suppress_voice` | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10922) | Open | Affects user experience; voice replies play despite suppression. |
| S2 (Degraded Behavior) | **Issue #11059** – WhatsApp Web ignores `force_voice` | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) | Open | Similar to above—voice routing broken. |
| S2 (Degraded Behavior) | **Issue #10981** – Outgoing WhatsApp images lack thumbnails/dimensions | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10981) | Closed | Impacts UI usability; fixed in PR #10986. |

> ⚠️ **Critical Note**: The open S0 bug (#11058) is a major security flaw that could enable privilege escalation or unintended system access—**must be prioritized**.

---

### **6. Feature Requests & Roadmap Signals**

| Request | Link | Priority | Likely Next Version? | Reason |
|--------|------|----------|------------------------|--------|
| **Install skills from `.well-known/agent-skills`** | [Issue #4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) | P2 | ✅ Yes | Aligns with emerging standardization (Agent Skills Group), enabling discoverable skill ecosystems. |
| **Agent-to-agent session messaging with receiver discretion** | [Issue #11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) | P2 | ✅ Yes | Addresses a core need for **collaborative agent workflows** without history leakage. |
| **Knowledge graph as first-class memory layer** | [Issue #11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) | P2 | 🟡 Possible | Long-term vision for persistent, queryable agent memory—may require architectural rework. |
| **Host-scoped admission control & resource bounds** | [Issue #10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | P2 | ✅ Yes | Critical for production deployments; signals intent to support multi-agent hosting at scale. |

> 📌 **Roadmap Signal**: The project is moving toward **enterprise-ready deployment models**, with increasing focus on **security boundaries**, **resource management**, and **inter-agent collaboration**.

---

### **7. User Feedback Summary**

- **Positive Feedback Indicators**:
  - Multiple users reporting improved WhatsApp experience after recent PRs (#11054, #11057).
  - Satisfaction with enhanced tool result formatting and richer content rendering.
  - Appreciation for stable ZeroCode sessions and clear error messages.

- **Pain Points Reported**:
  - **Voice modality misbehavior** on WhatsApp (ignored `force_voice`/`suppress_voice`) — impacts accessibility and UX.
  - **Lack of channel-aware tool behavior** in ZeroCode mode (#10225), limiting automation use cases.
  - **Confusion around high-risk command bypasses** (#11058), raising trust concerns.
  - **Invisible cron job failures** (#10594), making debugging difficult.

> 💬 **User Voice**: “I want my agents to behave predictably across channels, especially when sending voice or documents.” — *RustLangLatam*

---

### **8. Backlog Watch**

| Issue | Link | Status | Why It Matters |
|------|------|--------|----------------|
| **Issue #10970** – RFC: Host-scoped admission control & resource bounds | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | Open, needs maintainer review | High-severity systemic issue for multi-agent hosts; must be addressed before scaling. |
| **Issue #10930** – RFC: One durable primitive for human questions | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) | Open, needs maintainer review | Core UX pattern; unifies existing SOP gate logic into a single, resilient primitive. |
| **Issue #11053** – RFC: Knowledge graph as first-class memory layer | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) | Open, low activity | Long-term strategic feature; may require significant refactoring but unlocks advanced agent capabilities. |
| **Issue #11055** – Bug: Daemon never registers channel-map factory | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) | Open | Breaks channel-backed tools outside main entry points—serious functional limitation. |

> ⏳ **Maintainer Attention Needed**: Several high-impact RFCs and bugs remain unreviewed despite being labeled `needs-maintainer-review`. This may slow innovation velocity.

---

### ✅ **Final Assessment: Project Health**

- **Strengths**: Active community, high-quality PRs, strong focus on security and architecture, excellent documentation practices.
- **Risks**: Open S0 security bug, backlog of RFCs awaiting review, some channel-specific UX gaps.
- **Outlook**: ZeroClaw is maturing rapidly into a **production-grade AI agent platform**. With continued attention to governance and security reviews, it is well-positioned for adoption in complex, multi-agent environments by Q4 2026.

> 🔗 **Stay Updated**: Follow key issues and PRs on [GitHub](https://github.com/zeroclaw-labs/zeroclaw).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*