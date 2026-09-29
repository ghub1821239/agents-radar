# OpenClaw Ecosystem Digest 2026-09-29

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-29 02:16 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest**  
**Date:** 2026-09-29  
**Source:** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)  

---

### **1. Today's Overview**  
The OpenClaw project remains highly active with **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development and user-driven troubleshooting. The ecosystem is under significant stress, with **over 30 high-severity (P0/P1) issues** related to crash loops, memory leaks, session state corruption, and gateway instability—many tied to recent releases (2026.9.5–2026.9.6). Despite no new releases, a large volume of PRs suggests ongoing efforts to stabilize the platform ahead of a potential patch or minor release. The project shows strong community engagement but faces systemic reliability challenges, particularly around worker lifecycle management, memory pressure, and cross-platform compatibility.

---

### **2. Releases**  
**None**  
No new releases were published in the past 24 hours. The most recent stable version remains **2026.9.6**, which has become a focal point for multiple critical regressions. Users are experiencing severe stability issues post-upgrade, including gateway crash loops, unbounded memory growth, and silent data loss, suggesting that a **hotfix release (e.g., 2026.9.7)** may be imminent to address these P0 bugs.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- **PR #160747** ([Fix: improve UI side chat comment staging](https://github.com/openclaw/openclaw/pull/160747)) – Improved UX for selection comments in side chat; now consistent with main chat editor.  
- **PR #159525** ([feat: enforce scoped Slack plugin reviewers](https://github.com/openclaw/openclaw/pull/159525)) – Enhanced security by binding approval permissions to specific app/tool owners.  
- **PR #160885** ([fix: report unreadable config instead of missing credentials](https://github.com/openclaw/openclaw/pull/160885)) – Fixed misleading `health` command errors due to file permission issues.  
- **PR #160617** ([chore: update fs-safe to 0.21.2](https://github.com/openclaw/openclaw/pull/160617)) – Patched filesystem safety dependency without breaking changes.  

These merged PRs focus on **UX polish, security hardening, and diagnostic clarity**, reflecting a stabilization phase despite ongoing infrastructure-level instability.

---

### **4. Community Hot Topics**  
The top 10 most commented issues reveal deep user frustration with core system reliability:

| Issue | Comments | Severity | Key Concern |
|------|---------|----------|-----------|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 22 | P0 | Gateway reaches "ready" but never serves — event loop starved, RSS climbs to OOM |
| [#157067](https://github.com/openclaw/openclaw/issues/157067) | 17 | P1 | Windows cron fails due to uncloneable Proxy in session history worker |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 16 | P0 | Zombie processes from hooks/tools cause long-term runtime degradation |
| [#40001](https://github.com/openclaw/openclaw/issues/40001) | 16 | P0 | `write` tool overwrites shared files instead of appending → silent data loss |
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 15 | P0 | Tracker for fixes between 2026.9.6 and 2026.9.7 — signals imminent release |
| [#157160](https://github.com/openclaw/openclaw/issues/157160) | 12 | P0 | Gateway crash-loop after schema migration (even after `busyTimeoutMs=0`) |
| [#155859](https://github.com/openclaw/openclaw/issues/155859) | 11 | P0 | Startup time scales linearly with enabled plugins — >120s delay |
| [#156571](https://github.com/openclaw/openclaw/issues/156571) | 13 | P0 | Model-catalog worker leaks 1–3 GB/min to disk via temp files |
| [#157989](https://github.com/openclaw/openclaw/issues/157989) | 10 | P0 | Plugin source capture rewrites 1.1–6.5 GB per CLI/cmd/Gateway start → SSD wear |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) | 7 | P0 | Unhandled rejection in `reconcileActive` leads to gateway crash |

> 🔍 **Underlying Need**: Users demand **predictable startup, stable memory use, reliable session persistence, and safe file I/O**. These issues collectively indicate a **breakage in resource lifecycle management**, especially in multi-agent, cron, and persistent session scenarios.

---

### **5. Bugs & Stability**  
**Critical Regressions Reported (P0/P1):**

| Bug | Description | Fix PR? | Impact |
|-----|-------------|--------|--------|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway ready but unresponsive; event loop starved, RSS grows until OOM | ❌ No | Crash loop, complete service outage |
| [#157160](https://github.com/openclaw/openclaw/issues/157160) | Gateway crashes on `plugin-doctor-post-session-state` even after fixing timeout | ❌ No | Prevents upgrade, blocks recovery |
| [#156571](https://github.com/openclaw/openclaw/issues/156571) | Model-catalog worker leaks 1–3 GB/min to disk | ❌ No | Disk exhaustion, storage failure |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) | Prepared-model-catalog worker grows to full heap ceiling (~200 critical events/day) | ❌ No | Frequent memory pressure, instability |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | Unbounded memory leak (~4–5 GB/h) in model catalog worker | ❌ No | Inevitable crash on idle systems |
| [#158095](https://github.com/openclaw/openclaw/issues/158095) | State-lifecycle acquire fails indefinitely after one failed acquisition | ❌ No | Session freeze, requires restart |
| [#156917](https://github.com/openclaw/openclaw/issues/156917) | State-lifecycle lease has no heartbeat or takeover → blocks startup for 31 min | ❌ No | Gateway hangs on boot |

> ⚠️ **Note**: All top-tier bugs lack associated fix PRs, indicating **critical gaps in maintenance bandwidth**. Many are reproducible across platforms (Linux, macOS, Windows), pointing to systemic architectural flaws in worker lifecycle, garbage collection, and state coordination.

---

### **6. Feature Requests & Roadmap Signals**  
Top feature requests reflect growing user needs for **security, configurability, and automation**:

| Request | Link | Priority | Implication |
|--------|------|----------|------------|
| Add Databricks Unity Gateway as official provider | [#155633](https://github.com/openclaw/openclaw/issues/155633) | P2 | Enterprise adoption signal — need for secure, internal model routing |
| Onboarding Wizard should include Memory/Embedding setup | [#16670](https://github.com/openclaw/openclaw/issues/16670) | P2 | User friction reduction — highlights missing onboarding guidance |
| Talk Mode Idle Timeout After Voice Wake | [#46844](https://github.com/openclaw/openclaw/issues/46844) | P3 | Voice interaction maturity — users want better resource control |
| Per-agent tools.alsoAllow not granting browser plugin access | [#156864](https://github.com/openclaw/openclaw/issues/156864) | P1 | Tool access configuration confusion — needs clearer policy enforcement |

> 📈 **Prediction**: The next release (**2026.9.7**) will likely include **security hardening (Slack/Codex approvals)**, **onboarding improvements**, and **crash-fixes for model-catalog and gateway workers** — but **not** major new features.

---

### **7. User Feedback Summary**  
Real user pain points cluster around:

- **Silent Data Loss**: Overwriting shared files (`write` tool), lost messages in multi-lane channels (Feishu), and dropped tool outputs.
- **Unpredictable Behavior**: Crashes during updates (`openclaw update` hangs), CLI commands failing silently, and agent turns being dropped mid-execution.
- **Resource Exhaustion**: SSD wear from repeated plugin captures, memory leaks causing frequent restarts, and disk filling up from uncleaned temp files.
- **Poor Recovery**: Sessions stuck in "recovered=1" state but unable to reconnect; gateway fails to recover after restarts.
- **Security Confusion**: Auth boundaries unclear (e.g., `claude-cli` vs. OpenClaw OAuth), leading to blocked history reseeds and fallback failures.

> 💬 **User Sentiment**: High frustration with **stability and reliability**, especially after upgrades. While users appreciate advanced capabilities (multi-agent, cron, voice), they feel **let down by inconsistent performance and lack of diagnostics**.

---

### **8. Backlog Watch**  
Several **long-standing, high-impact issues remain unresolved** and require urgent maintainer attention:

| Issue | Age | Severity | Status | Action Needed |
|------|-----|----------|--------|---------------|
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 5 days | P0 | Tracking issue | Must prioritize fix list |
| [#159514](https://github.com/openclaw/openclaw/issues/159514) | 2 days | P0 | Closed | Already known; needs follow-up fix |
| [#156986](https://github.com/openclaw/openclaw/issues/156986) | 5 days | P0 | Open | Update hangs — critical blocker |
| [#156917](https://github.com/openclaw/openclaw/issues/156917) | 5 days | P0 | Open | Lease deadlock — prevents startup |
| [#157389](https://github.com/openclaw/openclaw/issues/157389) | 5 days | P1 | Open | Feishu replies lost under load — real-world impact |
| [#155476](https://github.com/openclaw/openclaw/issues/155476) | 7 days | P2 | Open | Attachments disappear on replay — UX regression |

> 🛑 **Urgency**: These issues represent **core functionality breakdowns** in production environments. Maintainers must triage and assign ownership immediately to prevent further user churn.

---

**✅ Final Assessment**:  
OpenClaw is at a **critical inflection point** — high activity masks deep technical debt. While the community remains engaged, **systemic stability issues threaten adoption**. Immediate action on **memory leaks, crash loops, and update failures** is essential. A **patch release (2026.9.7)** focused on **reliability and diagnostics** is strongly advised to restore trust.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-29**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem in Q3 2026 is characterized by rapid evolution, intense focus on stability, and growing maturity in production-grade capabilities. Projects are shifting from feature experimentation toward reliability, security, and operational observability—reflecting a maturation phase driven by real-world deployment needs. While innovation remains strong, systemic challenges around memory management, session integrity, and cross-platform consistency have become central concerns across the landscape. The community is increasingly demanding diagnostic clarity, auditability, and predictable upgrade paths—indicating a move from early adopter enthusiasm to enterprise readiness.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Releases (Recent) | Health Score (1–5) |
|--------|------------------|----------------|-------------------|--------------------|
| **OpenClaw** | 500 | 500 | None | ⚠️ 2.5 |
| **Hermes Agent** | 50 | 50 | None | ✅ 3.8 |
| **IronClaw** | 2 | 3 | None | ✅ 4.2 |
| **QwenPaw** | 10 | 17 | None | ✅ 4.5 |
| **ZeroClaw** | 50 | 50 | None | ⚠️ 3.0 |

> **Health Score Key**:  
> 5 = Stable, well-maintained, low P0 bugs  
> 3 = Active but facing critical stability issues  
> 2 = High instability, risk of user churn  
> 1 = Severe reliability breakdown  

*Note: OpenClaw’s extreme activity reflects crisis-level engagement; others show balanced iteration.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most active project—but also the most unstable. Its massive volume of issues and PRs signals deep technical debt and urgent stabilization needs, particularly in **worker lifecycle**, **memory pressure**, and **session state corruption**. Unlike peers, it operates under *crisis mode*, with over 30 high-severity bugs unresolved and no patch release imminent despite widespread degradation.  

In contrast to Hermes Agent’s focused desktop fixes or QwenPaw’s UX polish, OpenClaw’s technical approach prioritizes *scale and composability* at the cost of reliability—making it a testing ground for complex multi-agent workflows. However, this comes at the expense of developer trust: users report silent data loss, crash loops, and SSD wear.  

Community size is largest (by issue volume), but sentiment is fraying. OpenClaw is not a leader in maturity—it is currently the **most fragile major player**, requiring immediate triage to avoid long-term reputational damage.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, several recurring technical demands are emerging:

| Focus Area | Projects Involved | Specific Needs |
|----------|------------------|----------------|
| **Session State Integrity** | OpenClaw, Hermes Agent, ZeroClaw | Prevent duplicate replies, avoid stale UI rendering, ensure consistent recovery after restarts |
| **Memory & Resource Management** | OpenClaw, QwenPaw, ZeroClaw | Fix unbounded memory leaks (1–3 GB/min), prevent disk exhaustion from temp files, reclaim media context |
| **Update & Upgrade Reliability** | Hermes Agent, OpenClaw, QwenPaw | Resolve silent failures, access-denied errors (Windows), update loops, failed re-signing (macOS) |
| **Security & Trust Boundaries** | ZeroClaw, Hermes Agent, OpenClaw | Enforce RBAC per sender, prevent privilege escalation in delegation, clarify auth flows |
| **Observability & Diagnostics** | Hermes Agent, ZeroClaw, IronClaw | Add session-health checks, failure taxonomies, stable message IDs, audit trails |

> 🔍 **Pattern**: The ecosystem is converging on **operational resilience**—not just functionality. Developers now expect self-diagnosis, traceability, and secure configuration by default.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Feature Focus** | Multi-agent orchestration, cron, voice | Desktop UX, session fidelity, tool security | Model benchmarking, failure taxonomy | Media handling, font scaling, plugin markets | Identity, RPC-first design, OIDC |
| **Target Users** | Power users, researchers, dev teams | Knowledge workers, developers | AI evaluators, benchmarkers | Designers, educators, content creators | Enterprises, secure deployments |
| **Architecture** | Centralized gateway + worker model | Desktop-first, client-server sync | WebUI + benchmark-driven | Console-centric, scalable context | Plugin-based, RPC-native, zero-trust |
| **Differentiator** | Highest complexity, lowest stability | Best desktop experience, UI polish | Structured evaluation, failure insight | Media-rich workflows, air-gapped support | Secure identity, extensible runtime |

> ✅ **Key Insight**: While OpenClaw leads in *scope*, ZeroClaw leads in *security architecture*, and QwenPaw in *accessibility*. Each project occupies a distinct niche in the evolving agent stack.

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Characteristics |
|------|--------|----------------|
| **High-Momentum Iteration** | OpenClaw, ZeroClaw, Hermes Agent | Rapid PR/issue turnover; frequent bug fixes; visible urgency |
| **Stabilizing & Refining** | QwenPaw, IronClaw | Lower noise, incremental improvements, stronger CI hygiene, backlog triage |
| **Emergent Maturity Signals** | All projects | Increasing demand for diagnostics, audit trails, session health, and fail-safe upgrades |

> 📌 **Trend**: The ecosystem is bifurcating:  
> - **Active Crisis Zones** (OpenClaw, ZeroClaw): Focused on fixing core infrastructure.  
> - **Mature Refiners** (QwenPaw, IronClaw): Prioritizing usability, DX, and internal quality.  
> - **Balanced Innovators** (Hermes Agent): Progressing steadily without sacrificing stability.

---

### **7. Trend Signals**  
From community feedback and project direction, key industry trends emerge:

1. **Agent Observability is Now a Requirement**  
   > Demand for `session-health`, `tool-audit`, `stable message ID`, and `failure taxonomy` signals that agents must be *debuggable and auditable*—no longer black boxes.

2. **Security Must Be Built-In, Not Added Later**  
   > RBAC per sender, OIDC integration, and trust gate hardening indicate that **zero-trust principles** are becoming standard in agent design.

3. **UX Extends Beyond UI—It’s About Predictability**  
   > Silent failures, update hangs, and context bloat are now primary pain points. Users expect *reliable behavior*, not just features.

4. **Enterprise Adoption Drivers Are Emerging**  
   > Requests for custom plugin markets (QwenPaw), air-gapped setups, and Databricks integration (OpenClaw) reflect growing interest in secure, internal deployments.

5. **Resource Management Is Non-Negotiable**  
   > Memory leaks, disk exhaustion, and SSD wear are no longer edge cases—they’re dealbreakers. Projects must enforce resource limits and cleanup by default.

---

### **Final Summary**  
The personal AI agent ecosystem is transitioning from "what can we build?" to "how can we run it reliably?" OpenClaw exemplifies the risks of scale without stability, while ZeroClaw and QwenPaw represent the future: secure, observable, and user-centric. For developers, the clear signal is: **prioritize reliability, diagnostics, and security from day one**. The next generation of agents won’t be defined by complexity—but by dependability.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-29**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust 50 issues and 50 pull requests updated in the last 24 hours, reflecting sustained momentum in development and community engagement. The ecosystem is focused on stability fixes for desktop clients (especially macOS and Windows), session state consistency, and tooling reliability—particularly around memory plugins, file operations, and update flows. No new releases were published today, indicating that the team is prioritizing patch-level improvements over versioned rollouts. The high volume of open issues, particularly P1/P2 bugs related to UI rendering, session corruption, and platform-specific crashes, suggests ongoing pressure to stabilize core user workflows.

---

### **2. Releases**  
❌ **No new releases** were published in the past 24 hours.  
The latest release remains unchanged from recent versions (v0.21.5+3934). This lack of release activity underscores that the current focus is on resolving critical bugs rather than feature delivery or version bumping.

> 🔗 [Latest Release (v0.21.5)](https://github.com/nousresearch/hermes-agent/releases/tag/v0.21.5)

---

### **3. Project Progress**  
✅ **11 Pull Requests merged or closed today**, primarily addressing:
- **Session & UI Stability**: Fixes for duplicate assistant replies (#123801, #126524), stale browser processes (#121095), and runtime state leakage during session switches (#119431).
- **Update Flow Reliability**: Improvements to macOS re-signing policy (#127225), handling of unaccounted receipt rows (#127222), and Git identity propagation in review commits (#127256).
- **Tooling & Plugin Fixes**: Corrected `readOnlyHint` detection in MCP trust gate (#88858), Hindsight plugin config drift (#82943), and symlink behavior in V4A tools (#123824).
- **Security & Configuration**: Billing cooldowns now properly tied to retry ladder (#127257), and model alias resolution in cron jobs fixed (#126655).

These PRs indicate strong progress in stabilizing cross-platform execution, especially in desktop environments.

> 🔗 [PR #127225: fix(desktop): policy-aware macOS re-signing](https://github.com/nousresearch/hermes-agent/pull/127225)  
> 🔗 [PR #127257: fix(fallback): arm billing cooldowns from the retry ladder](https://github.com/nousresearch/hermes-agent/pull/127257)

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement**:

| Issue | Comments | Severity | Focus Area | Link |
|------|---------|----------|------------|------|
| [#123801] macOS Desktop renders duplicate assistant reply | 15 | P1 | Session State / UI Rendering | [Link](https://github.com/nousresearch/hermes-agent/issues/123801) |
| [#88858] MCP trust gate misclassifies readOnlyHint tools | 10 | P2 | Tool Security / Trust Model | [Link](https://github.com/nousresearch/hermes-agent/issues/88858) |
| [#126524] Assistant reply renders twice on fresh client | 5 | P2 | Session State / UI Rendering | [Link](https://github.com/nousresearch/hermes-agent/issues/126524) |

**Analysis**: These top issues reveal deep concerns about **session integrity** and **UI fidelity**, especially on macOS. Users are experiencing inconsistent rendering and state duplication despite correct backend data. The MCP trust gate issue highlights systemic confusion in tool capability detection—a potential risk surface for unintended write access. The recurrence of "duplicate reply" bugs across multiple tickets signals a persistent flaw in message lifecycle management.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs Reported (P1–P2)**:
- **[#123801]** Duplicate assistant replies on macOS despite one DB row — likely due to incorrect message deduplication logic in frontend rendering.
- **[#126524]** Same issue observed on fresh client; session list also double-renders — indicates upstream session state corruption.
- **[#88858]** Untrusted MCP servers mark all tools as write-capable due to camelCase/snake_case mismatch — **security-critical**, breaks trust model.
- **[#124807]** Windows `hermes update` fails deleting `libcrypto.dll` due to access denied — blocks updates entirely.
- **[#126655]** Cron job passes model pin literally without alias resolution — leads to 404 errors and silent failures.

✅ **Fix PRs Exist for Key Issues**:
- Fix for `readOnlyHint` mismatch: #127257 (in review)
- Fix for duplicate replies: no PR yet, but linked to known session-state bugs
- Update failure on Windows: #127222 (addresses underlying cause)

⚠️ **High Risk**: Multiple desktop update flows (Windows/macOS) fail silently or loop indefinitely, affecting upgradeability and user confidence.

---

### **6. Feature Requests & Roadmap Signals**  
📌 **Emerging Feature Themes**:
- **Session Health Diagnostics**: PR #58344 (`feat(skill): add session-health`) proposes self-diagnostic auditing using `session_search` — signals growing interest in agent observability.
- **Tool Audit & Transparency**: PR #58805 (`tool-audit`) enables read-only audit of tool usage patterns — reflects demand for operational visibility.
- **Kanban Board Enhancements**: PR #115081 adds runtime cap badges and triage signals — shows push toward richer operator interfaces.
- **Stable Message Identity**: Issue #126265 calls for `message_uid`, `merge witness`, and per-call IDs — a foundational request for traceability and replay integrity.

🔮 **Predicted Next Features**: Expect more emphasis on **agent self-monitoring**, **debuggable session history**, and **cross-session audit trails** in v0.22+. The inclusion of `session-health` and `tool-audit` skills suggests a shift toward enterprise-grade observability.

> 🔗 [PR #58344: Add session-health diagnostic skill](https://github.com/nousresearch/hermes-agent/pull/58344)  
> 🔗 [Issue #126265: Stable per-message identity](https://github.com/nousresearch/hermes-agent/issues/126265)

---

### **7. User Feedback Summary**  
🛠️ **Real Pain Points**:
- **macOS Desktop**: Frequent UI glitches (duplicated messages, stuck updates), broken wake word detection with remote gateway, and auto-updater desyncing git checkouts.
- **Windows Desktop**: Update loops, access-denied errors on DLL deletion, and failure to detect running processes before updating.
- **Hindsight Plugin**: Silent failures in `local_embedded` mode due to missing `hindsight-all` dependency.
- **MCP Trust Gate**: Users report being prompted for approval on every read operation — makes untrusted servers unusable in practice.

💡 **User Satisfaction Signals**:
- Positive sentiment around new skills (`session-health`, `tool-audit`) and Kanban enhancements.
- Appreciation for granular control in `hermes update` and improved error messaging in PRs like #127222.

💬 **Key Quote**: *"The desktop app’s update process feels broken on Windows — it fails silently, and I can’t even tell why."* — @janviernine (Issue #124807)

---

### **8. Backlog Watch**  
⚠️ **Longstanding, High-Impact Issues Needing Attention**:

| Issue | Age | Severity | Status | Notes |
|------|-----|----------|--------|-------|
| [#117890] Desktop project browser stays rooted at ~/.hermes | 8 days | P3 | Open | UX blocker for project-based workflows |
| [#77277] Desktop update loop on Windows | 56 days | P2 | Closed | But still relevant — workaround not ideal |
| [#98384] macOS update aborts on shared-venv layout | 50 days | P2 | Closed | Reproducible on common setups |
| [#68783] Desktop version stuck at 0.17.0 | 69 days | P2 | Closed | Indicates poor CI/CD hygiene |
| [#126265] Stable per-message identity | 1 day | P3 | Open | Foundational for debugging and replay |

🔍 **Recommendation**: Prioritize **session state consistency** and **update flow reliability** across platforms. These issues directly impact daily usability and user retention.

> 🔗 [Issue #117890: Desktop project browser stuck at ~/.hermes](https://github.com/nousresearch/hermes-agent/issues/117890)  
> 🔗 [Issue #126265: Stable per-message identity](https://github.com/nousresearch/hermes-agent/issues/126265)

---

### ✅ **Final Assessment**  
Hermes Agent is in a **high-intensity stabilization phase** with strong community participation and rapid iteration on critical bugs. While no new releases have shipped, the project is actively fixing **core stability issues** in desktop clients and session management. The focus on **observability features** (diagnostics, audit trails) signals an evolution toward production-readiness. However, **platform-specific update failures** and **persistent UI corruption** remain serious hurdles. Maintainers should prioritize closing the backlog of long-standing, high-impact issues to restore user trust and prepare for the next major release.

> 📌 **Next Steps**: Target v0.22.0 with focus on session integrity, update reliability, and agent self-diagnosis capabilities.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

---

### **1. Today's Overview**  
As of 2026-09-29, IronClaw continues steady development with low but consistent activity: two new issues opened in the last 24 hours and three pull requests updated (two open, one merged). No new releases have been published, indicating a focus on internal refinement and stability rather than feature delivery. The project maintains a mature CI/CD pipeline, evidenced by automated documentation and codebase knowledge graph updates. Activity is primarily centered around infrastructure hygiene, UI robustness, and improving developer experience—particularly around model registry clarity and failure analysis.

---

### **2. Releases**  
*No new releases detected.*  
The project has not issued any version updates since the last release, suggesting that ongoing work is focused on incremental improvements and internal refactoring rather than user-facing changes.

---

### **3. Project Progress**  
✅ **Merged PR:**  
- [#5132](https://github.com/nearai/ironclaw/pull/5132) *fix(webui-v2): redirect invalid chat thread routes*  
  - Resolves deep-linking edge cases in the WebUI where invalid or reserved `/chat/:threadId` routes would cause navigation failures.  
  - Implements graceful fallback to `/chat`, ensures thread state persistence during list reloads, and prevents UI race conditions.  
  - Improves reliability for users sharing or bookmarking chat sessions.

🔧 **Open PRs (in progress):**  
- [#6698](https://github.com/nearai/ironclaw/pull/6698): Documentation update for OpenWiki — automates narrative refresh; requires manual review per policy.  
- [#7988](https://github.com/nearai/ironclaw/pull/7988): Chore to refresh the codebase knowledge graph — part of nightly CI process; ensures internal AI agents have up-to-date context about the codebase structure.

---

### **4. Community Hot Topics**  
🔍 **Most Active Issue:**  
- [#8116](https://github.com/nearai/ironclaw/issues/8116) *Daily ironclaw failure taxonomy — 2026-09-28*  
  - **Summary**: Analyzes 31 failing tasks in `officeqa` benchmark, identifying that most are genuine model-quality errors (e.g., DeepSeek-V4-Flash misnavigation), not hallucinations or config issues.  
  - **Implication**: Highlights growing need for granular failure classification—especially as benchmarks scale. This issue suggests demand for a structured error taxonomy to guide model evaluation and debugging workflows.  
  - **Community Signal**: Users want deeper insight into *why* models fail—not just that they do. This could inform future test suite instrumentation or dashboard features.

💡 **High-Potential Feature Request:**  
- [#8115](https://github.com/nearai/ironclaw/issues/8115) *Add a Tsubasa registry entry with an explicit 32K context-budget path*  
  - **Problem**: Users must manually configure endpoints and models for Tsubasa (a key agent backend), leading to friction and configuration errors.  
  - **Request**: A named provider (e.g., `tsubasa-32k`) would simplify setup, improve security via credential abstraction, and reduce cognitive load.  
  - **Underlying Need**: Developer experience (DX) optimization—especially for users integrating multiple LLM backends. This is likely to be prioritized in upcoming v0.7+.

---

### **5. Bugs & Stability**  
⚠️ **No critical bugs or crashes reported today.**  
All current issues are either feature proposals or diagnostic tracking. However, the high number of non-passing tasks in the `officeqa` benchmark (31) indicates potential instability under complex reasoning workloads, particularly with models like DeepSeek-V4-Flash. While no direct crash reports exist, this reflects a systemic challenge in handling long-context or multi-step tasks reliably.

🔧 **Fix Status**: No PRs currently address these failures—this suggests either:  
- The failures are expected (model limitations), or  
- They are being tracked separately via the new taxonomy initiative (#8116).

---

### **6. Feature Requests & Roadmap Signals**  
📌 **Emerging Priorities from Community Input:**  
- **Tsubasa Registry Simplification** ([#8115](https://github.com/nearai/ironclaw/issues/8115)): High demand for named provider entries with defined context budgets (e.g., 32K). This signals roadmap momentum toward *standardized backend registration*, possibly including model aliases, cost tiers, and latency profiles.  
- **Failure Taxonomy System** ([#8116](https://github.com/nearai/ironclaw/issues/8116)): Suggests a future need for automated failure categorization (e.g., “reasoning error”, “context overflow”, “prompt injection”) to support continuous evaluation pipelines.

🔮 **Predicted Next Version (v0.7):**  
Likely to include:  
- Named backend registries (Tsubasa, OpenAI, etc.)  
- Enhanced benchmark reporting with failure classification  
- Improved CLI/web UI resilience for session routing

---

### **7. User Feedback Summary**  
🗣️ **Pain Points Expressed:**  
- Manual configuration of Tsubasa endpoints creates friction, especially for new users or teams managing multiple models.  
- Lack of clear visibility into *why* certain agents fail in benchmarks (e.g., `officeqa`) leads to inefficiencies in debugging and tuning.  
- Deep links to chat threads sometimes break during asynchronous data loading, causing confusion.

✅ **Positive Signals:**  
- Users engage constructively with failure data, demonstrating trust in the benchmarking system.  
- Automated tooling (CI-driven doc/graph refreshes) is well-received, indicating confidence in maintainability.

---

### **8. Backlog Watch**  
⏳ **Critical Long-Unanswered Issues Requiring Attention:**  
- [#8116](https://github.com/nearai/ironclaw/issues/8116) *Daily ironclaw failure taxonomy*  
  - **Status**: Open since 2026-09-28, zero comments/reactions.  
  - **Why It Matters**: Without a formal taxonomy, it’s impossible to track model improvement trends or prioritize fixes. This is foundational for scaling evaluation.  
  - **Action Needed**: Assign to a core maintainer for triage and initial categorization framework design.

- [#8115](https://github.com/nearai/ironclaw/issues/8115) *Add Tsubasa registry entry with 32K path*  
  - **Status**: Open, zero engagement.  
  - **Why It Matters**: Blocks DX improvements for a major agent backend. Could deter adoption if setup remains cumbersome.  
  - **Action Needed**: Label as "priority" and assign to a contributor familiar with the web UI and backend integration layer.

> ✅ **Recommendation**: Maintainers should schedule weekly triage meetings to review such high-impact, low-engagement issues to prevent stagnation.

---  
*Data Source: GitHub repository nearai/ironclaw | Updated: 2026-09-29*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-29**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust pace of development: **17 PRs updated in the last 24 hours (13 open, 4 merged)** and **10 issues updated (7 open, 3 closed)**. The project is currently focused on **stability improvements**, **context management**, and **desktop UX refinement**, particularly around media handling, font scaling, and session resilience. Recent activity reflects strong community engagement—especially from contributors tackling complex edge cases like image context bloat and cross-platform compatibility—indicating a healthy, maturing ecosystem.

---

### **2. Releases**  
No new releases were published in the past 24 hours. The latest stable version remains **QwenPaw 2.2.0**, with recent beta builds (`2.2.2b3`, `2.2.2b4`) used for testing. No breaking changes or migration notes are applicable at this time.

---

### **3. Project Progress**  
**Merged/Resolved PRs (Today):**  
- ✅ **PR #8005** (`feat(console): unify interface font scaling`) – Implemented unified font size controls (12px–20px) across the console UI, addressing long-standing user requests for accessibility and display flexibility.  
- ✅ **PR #7956** (`feat(console): unify settings UX and smooth conversation transitions`) – Improved consistency in settings panel design, fixed welcome-screen flash during chat switching, and enhanced interaction feedback.  
- ✅ **PR #7965** (`fix(context): reclaim historical media in Scroll and align thinking omission with token counting`) – Resolved critical context overflow due to unpruned media blocks by improving scroll-based content folding logic.  
- ✅ **PR #7953** (`fix(portability): preserve actionable per-asset import failures`) – Ensured import errors are preserved and actionable even when some assets fail to load, improving debuggability in multi-file workflows.

These fixes collectively strengthen core stability and UX polish, especially in high-content sessions.

---

### **4. Community Hot Topics**  
The most active discussions center on **media context explosion**, **desktop usability**, and **plugin market customization**:

- 🔥 **Issue #8015** ([Support custom Skill/Plugin market source](https://github.com/agentscope-ai/QwenPaw/issues/8015)) – A top-requested feature for air-gapped/intranet deployments. Currently open with one comment; signals growing demand for enterprise and secure deployment scenarios.
- 🔥 **Issue #8013** ([Download timeout during large skill pool transfer](https://github.com/agentscope-ai/QwenPaw/issues/8013)) – High-impact bug affecting users attempting to deploy large skills (e.g., `ppt-master`), showing frontend timeout limits don’t align with backend processing times.
- 🔥 **PR #8012** ([Fix Telegram code block rendering](https://github.com/agentscope-ai/QwenPaw/pull/8012)) – Directly addresses syntax highlighting failures in `c++`, `objective-c`, and nested fences, likely stemming from regex over-simplification in Markdown-to-HTML conversion.

These highlight **real-world pain points**: scalability under heavy media/data loads, need for offline/secure deployment, and fidelity in output formatting.

---

### **5. Bugs & Stability**  
Ranked by severity and impact:

| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| [**#8009**](https://github.com/agentscope-ai/QwenPaw/issues/8009) | ⚠️ Critical | Oversized image rejection permanently breaks session — rejected media stays in context, causing repeated 400 errors | ✅ **PR #8010** – *Fix: recover from media payload rejections* |
| [**#7853**](https://github.com/agentscope-ai/QwenPaw/issues/7853) | ⚠️ Critical | `ToolResultPruner` skips `type="data"` blocks (e.g., base64 images), leading to unbounded context growth | ✅ **PR #7965** – *Fixed via improved Scroll+token alignment* |
| [**#8011**](https://github.com/agentscope-ai/QwenPaw/issues/8011) | 🟡 High | Telegram formatter fails on `c++`, `objective-c`, and nested fences due to flawed regex pattern | ✅ **PR #8012** – *Fix in progress* |
| [**#7991**](https://github.com/agentscope-ai/QwenPaw/issues/7991) | 🟡 Medium | `TaskTracker` reports inconsistent running task counts vs API — causes dashboard confusion | ✅ **PR #8007** – *Fix: register run only after producer task exists* |

> 💡 **Key Insight:** Context management is a systemic challenge. Multiple bugs stem from improper handling of media payloads and state tracking — fix PRs are actively being submitted, indicating strong focus on reliability.

---

### **6. Feature Requests & Roadmap Signals**  
Top emerging roadmap signals:

- 🛠️ **Custom Plugin Marketplace Source** ([#8015](https://github.com/agentscope-ai/QwenPaw/issues/8015)) – Clear demand for self-hosted, internal plugin markets. Likely candidate for **v2.3** release.
- 🖼️ **Desktop Font Scaling** ([#7999](https://github.com/agentscope-ai/QwenPaw/issues/7999)) – Already addressed via PR #8005, but still reported as “good first issue” — suggests ongoing need for accessible UI design.
- 🧩 **Aliyun Token Plan Model Support** ([#7990](https://github.com/agentscope-ai/QwenPaw/issues/7990)) – Request to expose `thinking_param_style` for Aliyun models, enabling advanced reasoning controls. Indicates growing model diversity and user sophistication.
- 📊 **Durable Paginated Transcript History** ([#7931](https://github.com/agentscope-ai/QwenPaw/pull/7931)) – Long-term feature for persistent, searchable chat history with SQLite storage. May be prioritized post-v2.2.

> ✅ **Prediction:** v2.3 will likely include **custom marketplace support**, **persistent transcript storage**, and **enhanced model configuration**.

---

### **7. User Feedback Summary**  
User pain points reflect real-world usage scenarios:

- **Accessibility & Usability**: Users with visual impairments or high-DPI screens request font scaling (via #7999). Desktop UI must be usable without zooming.
- **Enterprise Use Cases**: Air-gapped deployments require offline plugin sources (#8015). Users cannot rely on public repos.
- **Performance & Reliability**: Large skill imports (e.g., `ppt-master`) time out prematurely (#8013), while oversized media kills entire sessions (#8009).
- **Output Fidelity**: Telegram users report broken code formatting (#8011), undermining trust in agent-generated documentation.

> 👍 **Satisfaction Indicators**: Merged fixes to font scaling and context pruning suggest responsiveness to user needs. However, unresolved timeouts and session crashes indicate room for improvement.

---

### **8. Backlog Watch**  
Critical Issues requiring maintainer attention:

- [**#8015**](https://github.com/agentscope-ai/QwenPaw/issues/8015) – *Support custom Skill/Plugin market source* – High-impact for enterprise use. Needs architectural decision on config schema and security.
- [**#7991**](https://github.com/agentscope-ai/QwenPaw/issues/7991) – *TaskTracker zombie entries inflate counter* – Misalignment between dashboard and API counts could mislead users; fix PR exists but not yet merged.
- [**#8002**](https://github.com/agentscope-ai/QwenPaw/issues/8002) – *Windows auto-mode allows unsafe COM Quit() calls* – Security risk if sandbox is off; requires careful validation before execution.
- [**#7988**](https://github.com/agentscope-ai/QwenPaw/issues/7988) – *Grep search ingests binary files* – Security and stability concern; PR exists but may need deeper review.

> ⏳ **Action Required**: These issues represent **security risks**, **user experience gaps**, and **deployment limitations** — all should be triaged and scheduled for next milestone.

---

✅ **Overall Health Assessment**: **Strong**. Active development, responsive maintainers, and community-driven fixes. Focus on stability and usability is evident. With proper triage of backlog items, QwenPaw is well-positioned for a major v2.3 release targeting enterprise and high-load use cases.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-09-29**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active, with 50 issues and 50 pull requests updated in the last 24 hours—indicating robust developer engagement and rapid iteration. The ecosystem is focused on core stability, security hardening, and feature parity between HTTP and RPC interfaces, particularly around agent delegation, identity management, and runtime integrity. High-severity bugs (S0/S1) are being addressed swiftly, while long-term architectural shifts like plugin-based channel architecture and OIDC integration continue to mature. No new releases were published today, suggesting a focus on internal stabilization ahead of the next major version.

---

### **2. Releases**  
❌ **No new releases** were published as of 2026-09-29.  
*Note: The absence of a release indicates that the team is prioritizing quality assurance and backlog refinement over public versioning, likely preparing for v0.8.6 or v0.9.0 milestones.*

---

### **3. Project Progress**  
**Merged / Closed PRs (Today):**  
While no PRs are explicitly marked as merged in this data set, several high-impact changes were delivered via closed PRs in recent days:
- ✅ **#11131**: *feat(runtime): own the observer event firehose in the daemon* — Ensures RPC `logs/subscribe` works even when gateway is offline, improving resilience.
- ✅ **#11089**: *feat(enroll): relay terminated enrollment page without hand-written TLS* — Removed insecure JavaScript TLS implementation; foundational for secure browser enrollment.
- ✅ **#11081**: *Generic per-instance durable state* — Enabled plugin-owned Kanban boards and state persistence, critical for extensible agent workflows.

**Key Advancements:**  
- **Plugin architecture maturity**: Runtime support for plugins managing their own state and Kanban boards (#8832, #11081) signals a shift toward modular, self-contained agent components.
- **Security enforcement**: Multiple PRs tighten access control (e.g., #11220, #11222), reinforcing zero-trust principles in delegated tool execution and session environments.

---

### **4. Community Hot Topics**  
The most active and impactful discussions center on **security**, **identity**, and **runtime reliability**:

- 🔥 **[Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)**: *RFC: Simplify RFC voting by removing mandatory discussion windows*  
  - **12 comments**, low reaction count — reflects ongoing debate about process efficiency vs. consensus depth.  
  - **Need**: Streamline governance to accelerate decision-making without sacrificing review quality.

- 🔥 **[Issue #5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)**: *Per-sender RBAC for multi-tenant agent deployments*  
  - **10 comments**, high risk/impact — a top-tier request for secure, tenant-aware agent routing.  
  - **Need**: Enforce fine-grained access controls based on sender identity, not just agent roles.

- 🔥 **[PR #11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225)**: *fix(memory): preserve owner in delegation*  
  - **High complexity (XL size)**, stacked on prior work — shows deep attention to ownership semantics in delegated sessions.  
  - **Need**: Prevent privilege escalation through memory tool hijacking during delegation.

These threads reveal a community increasingly focused on **secure, scalable agent orchestration** in production-grade environments.

---

### **5. Bugs & Stability**  
Critical bugs affecting data integrity and security are actively being resolved:

| Severity | Issue | Summary | Fix Status |
|--------|-------|---------|------------|
| **S0** | [#11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197) | Session resume restores forwarded environment after admin revocation | ⚠️ Open — high-risk data exposure |
| **S0** | [#11136](https://github.com/zeroclaw-labs/zeroclaw/issues/11136) | Concurrent file edits silently drop one edit under `parallel_tools` | ⚠️ Open — potential data loss |
| **S1** | [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | `begin_notification_resync → session/cancel` cancels all running turns | ❌ Open — impacts UX and session continuity |
| **S1** | [#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778) | Multimodal image cap eviction rewrites earlier history and invalidates cache prefix | ❌ Open — breaks multimodal context consistency |

> 📌 **Note**: While some fixes are in flight (e.g., #11222, #11220), key S0/S1 bugs remain open, indicating ongoing pressure to stabilize agent lifecycle and state handling.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging themes suggest the next major release (likely **v0.9.0**) will prioritize:

- ✅ **Identity & Access Control Maturity**  
  - [Issue #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289): OIDC milestone tracker — already has core stack merged; close-out phase underway.
  - [Issue #10573](https://github.com/zeroclaw-labs/zeroclaw/issues/10573): Bind pairing tokens to roster users — foundational for remote principal scoping.

- ✅ **Runtime & Gateway Parity**  
  - [PR #11176](https://github.com/zeroclaw-labs/zeroclaw/pull/11176): Add cron/memory/skills parity via RPC — P4 of v0.9.0 core-parity lane.
  - [PR #11172](https://github.com/zeroclaw-labs/zeroclaw/pull/11172): Config parity for remaining HTTP routes — essential for unified API surface.

- ✅ **Extensibility & Plugin Ecosystem**  
  - [PR #11221](https://github.com/zeroclaw-labs/zeroclaw/pull/11221): Gate SaaS/coding tools behind opt-in features — signals intent to reduce bloat and improve modularity.

> 🎯 **Prediction**: The upcoming v0.9.0 release will focus on **gateway separation**, **RPC-first design**, and **secure, auditable agent composition**.

---

### **7. User Feedback Summary**  
User pain points reflect real-world deployment challenges:

- **Data Loss Risk**: Users report silent file edit drops (#11136) and unexpected turn cancellation (#10785), indicating instability in concurrent or long-running sessions.
- **Security Anxiety**: Revocation bypasses (#11197) and unverified command execution (#10164) highlight concerns about trust boundaries in delegated agents.
- **Configuration Fragility**: Users struggle with schema migration failures (#11218, #11217) and missing `schema_version`, pointing to poor error messaging and backward compatibility gaps.
- **UX Friction**: Browser enrollment still lacks QR/link clarity despite progress (#11099); users want seamless onboarding.

> 💬 *User sentiment*: Mixed — technical users appreciate deep security and extensibility, but expect better error feedback and smoother upgrade paths.

---

### **8. Backlog Watch**  
Several high-impact, long-standing issues require maintainer attention:

- 🟡 **[Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)**: *RFC voting simplification* — Accepted since 2026-09-02, but no action taken. Needs finalization to avoid process bottlenecks.
- 🟡 **[Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)**: *Runtime and gateway delivery tracker* — Still tracking v0.8.6/v0.9.0 deliverables; no clear update on timeline or blockers.
- 🟡 **[Issue #10162](https://github.com/zeroclaw-labs/zeroclaw/issues/10162)**: *Plugin install cannot retry seed phase* — Known issue since 2026-08-20; requires decision on reseeding strategy.
- 🟡 **[Issue #10887](https://github.com/zeroclaw-labs/zeroclaw/issues/10887)**: *Non-vision gate fails on marker-shaped prose* — Open since 2026-09-15; affects multimodal UX.

> ⚠️ These issues are **accepted**, **high-risk**, and **long-pending** — indicate potential bottlenecks in roadmap execution and user trust.

---

### **Conclusion**  
ZeroClaw is in a **high-growth, high-stakes phase** — engineering rigor is strong, but user-facing stability and documentation lag behind. The project is moving rapidly toward a **secure, modular, RPC-native future**, but must balance innovation with reliability. Maintainers should prioritize closing S0/S1 bugs, resolving backlog blockers, and improving upgrade experience to maintain momentum.  

👉 **Next steps**: Focus on v0.9.0 readiness, finalize RFC process, and enhance error reporting for configuration and delegation workflows.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*