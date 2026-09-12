# OpenClaw Ecosystem Digest 2026-09-12

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-12 00:35 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-12**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with over **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development momentum. The ecosystem is experiencing significant strain around **upgrade stability, session state integrity, and agent runtime reliability**, particularly following the recent `v2026.9.4` release. Critical bugs related to **crash loops, message loss, and upgrade failures** are dominating discussion, suggesting ongoing challenges in backward compatibility and system resilience. Despite this, a strong wave of PRs focused on UI refinements, performance optimization, and security hardening reflects continued commitment to polish and user experience.

---

### **2. Releases**  
**🆕 v2026.9.4** – Released today (2026-09-12)  
#### Highlights:
- **Recover from compatible failed updates:** Retains previous package and restores it with prior configuration and service state if schema/config checks confirm rollback safety. *Note: Database migrations still require verified pre-update backup.*
- **Fixes critical upgrade path regressions** affecting session reconciliation and handoff lease compatibility.
- Addresses silent plugin failures (e.g., Feishu tools) and `claude-cli` mid-turn reply loss.

> 🔗 [Release Notes: v2026.9.4](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4)

---

### **3. Project Progress**  
**✅ Merged/Completed PRs (Today):**
- `#145376`: Fixes `doctor --fix` stopping prematurely during legacy audit-log recovery. *(Stability)*
- `#145441`: Resolves core typecheck shard limit overflow blocking unrelated PRs. *(CI/Build Health)*
- `#145447`: Rebalances test shard ownership to prevent CI bottlenecks. *(Infrastructure)*
- `#145382`: Adds support for public `gpt-live-1` voice sessions via OpenAI. *(Feature Enablement)*

**🔧 Key Advances:**
- **UI/UX Improvements**: Session pinning restored, Labs moved to System settings, startup bundle size reduced.
- **Performance**: Model catalog indexing now faster; plugin surface fallback paths built lazily.
- **Security & Stability**: macOS launcher permission preservation during updates; stale browser import handling fixed.

---

### **4. Community Hot Topics**  
Top Issues by comment count and severity:

| Issue | Summary | Severity | Link |
|------|--------|---------|------|
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Synchronous agent persistence blocks Gateway event loop at scale | 🦞 Diamond Lobster (P0) | [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool child processes leak → zombie accumulation → runtime degradation | 🦪 Silver Shellfish (P1) | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) |
| [#140620](https://github.com/openclaw/openclaw/issues/140620) | In-place upgrade stalls after importing only 27/1500 sessions; pre-upgrade sessions lost | 🦪 Silver Shellfish (P0) | [Issue #140620](https://github.com/openclaw/openclaw/issues/140620) |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server init timeout crashes Gateway due to unhandled rejection | 🦞 Diamond Lobster (P0) | [Issue #144911](https://github.com/openclaw/openclaw/issues/144911) |

> ✅ **PRs Addressing Top Issues**:  
> - `#145378` fixes `claude-cli` reply loss during hot reload (closes #144809).  
> - `#145444` improves stuck-session recovery logic (refs #145152).

---

### **5. Bugs & Stability**  
Critical stability concerns reported today:

| Bug | Impact | Status | Fix PR? |
|-----|--------|--------|--------|
| `#144742` – `v2026.9.4` ships without `#144208` fix (handoff lease crash) | Release blocker; causes config write failure | ❌ Open | ❌ No |
| `#145192` – Managed update fails on live v1 handoff lease → rollback onto migrated state | UX release blocker | ❌ Open | ❌ No |
| `#144712` – `npm update` fails at "global install swap"; rollback reported as "unverified" | Beta release blocker | ✅ Closed | ✅ Yes (`#145321`) |
| `#140908` – `doctor --fix` fails with EACCES on systemd `is-enabled` check | Post-upgrade migration blocked | ❌ Open | ❌ No |
| `#144581` – Windows `openclaw update` fails at candidate snapshot with malformed canary path | Upgrade failure | ❌ Open | ❌ No |

> ⚠️ **High-Risk Pattern**: Multiple P0/P1 issues tied to **upgrade paths**, **session state corruption**, and **race conditions** suggest systemic fragility in the migration pipeline.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven feature signals:

| Request | Priority | Rationale |
|--------|----------|---------|
| [#40786](https://github.com/openclaw/openclaw/issues/40786) – `.gitignore`-like exclude patterns in `backup create` | P2 | High demand to reduce backup size/sensitive data exposure |
| [#9016](https://github.com/openclaw/openclaw/issues/9016) – Expose OpenRouter usage cost to agent runtime | P3 | Users want cost-aware agents for budget control |
| [#136687](https://github.com/openclaw/openclaw/issues/136687) – Saved gateway account switching | P2 | Needed for multi-Gateway users |
| [#145377](https://github.com/openclaw/openclaw/issues/145377) – Support Radius models with native streaming | P2 | Emerging model provider integration |

> 📌 **Prediction**: `v2026.10.0` likely to include **backup exclusions**, **cost tracking**, and **multi-account switching** based on community traction.

---

### **7. User Feedback Summary**  
Real-world pain points from issue reports:
- **Trust & Safety**: Cron sessions hallucinate output instead of failing cleanly (#49876).
- **Reliability**: WhatsApp image uploads wedge message lanes for ~3 minutes before processing (#96834).
- **Usability**: iOS app lags badly when “show reasoning” is enabled (#124759).
- **Developer Experience**: Manual `sessions.compact` can trigger app-server conflicts (#127148).
- **Platform Friction**: `claude-cli` turns > `RUN_STALE_TAKEOVER_MS` lose entire replies silently (#144809).

> 💬 **Sentiment**: High frustration with **upgrade reliability**, **session persistence**, and **unexpected behavior**—especially post-`2026.9.x` releases.

---

### **8. Backlog Watch**  
Long-standing, high-impact issues needing maintainer attention:

| Issue | Age | Severity | Status | Action Required |
|------|-----|----------|--------|----------------|
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 2026-08-05 (38 days) | 🦞 Diamond Lobster | Open | Needs deep architectural review |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 (75 days) | 🦪 Silver Shellfish | Open | Critical for long-running agents |
| [#140620](https://github.com/openclaw/openclaw/issues/140620) | 2026-09-07 (5 days) | 🦪 Silver Shellfish | Open | Blocks upgrade path for large deployments |
| [#144742](https://github.com/openclaw/openclaw/issues/144742) | 2026-09-11 (1 day) | 🦪 Silver Shellfish | Open | **Release blocker** — missing fix in `v2026.9.4` |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026-09-11 (1 day) | 🦪 Silver Shellfish | Open | Confirmed regression in managed update flow |

> 🛑 **Urgent**: Maintainers must prioritize `#144742` and `#145192`—both are **release blockers** that undermine trust in upgrades.

---

**📌 Final Note**: OpenClaw is in a **critical phase of stabilization post-`2026.9.4`**. While innovation continues, **systemic upgrade and session integrity bugs are undermining user confidence**. Immediate focus should shift to fixing P0 regressions and ensuring all published releases include all merged fixes.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Open-Source Ecosystem (2026-09-12)**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem in Q3 2026 is characterized by rapid innovation, increasing architectural complexity, and growing focus on multi-agent orchestration, session integrity, and cross-platform reliability. Projects are diverging in maturity: some (e.g., OpenClaw, QwenPaw) are pushing feature velocity with stable releases, while others (e.g., IronClaw, ZeroClaw) are in maintenance or stabilization phases. A clear trend toward **enterprise-grade collaboration**, **identity-aware workflows**, and **provider diversity** is emerging, driven by user demand for secure, scalable, and composable agent systems.

---

### **2. Activity Comparison**

| Project | Issues (24h) | PRs (24h) | Release Status | Health Score (5★) |
|--------|--------------|-----------|----------------|-------------------|
| **OpenClaw** | 500+ | 500+ | ✅ v2026.9.4 (Patch) | ⭐⭐⭐⭐☆ (4.5) |
| **Hermes Agent** | 50 | 50 | ✅ v0.21.2 (Patch) | ⭐⭐⭐⭐☆ (4.5) |
| **IronClaw** | 0 | 1 | ❌ None | ⭐⭐☆☆☆ (2.5) |
| **QwenPaw** | 21 | 41 | ✅ v2.2.1 (Stable) | ⭐⭐⭐⭐⭐ (5.0) |
| **ZeroClaw** | 50 | 50 | ❌ None | ⭐⭐⭐☆☆ (3.5) |

> *Note: High activity ≠ high health. OpenClaw and ZeroClaw show intense development but face critical stability risks.*

---

### **3. OpenClaw's Position**  
OpenClaw stands as the most **feature-rich and actively developed** project in the ecosystem, with the highest volume of issues and PRs—indicating deep community engagement and aggressive iteration. Its technical approach emphasizes **backward compatibility during upgrades**, **session state resilience**, and **plugin-level fault tolerance**, reflected in its `v2026.9.4` release’s rollback safety and `claude-cli` mid-turn recovery. Compared to peers:
- **vs Hermes Agent**: OpenClaw has broader UI/UX polish and stronger platform coverage (macOS, Windows, iOS), but faces deeper systemic upgrade fragility.
- **vs QwenPaw**: OpenClaw leads in ecosystem maturity and integration breadth (e.g., Feishu, OpenAI voice), but lags in granular model routing per agent.
- **vs ZeroClaw**: OpenClaw’s community is significantly larger (500+ PRs/day vs 50), indicating higher adoption and contributor base.

Despite its momentum, OpenClaw’s **high instability in upgrade paths and session persistence** poses a credibility risk that could hinder enterprise adoption.

---

### **4. Shared Technical Focus Areas**  
Multiple projects are converging on core challenges related to **systemic reliability under complex workflows**:

| Requirement | Projects Involved | Specific Needs |
|------------|------------------|---------------|
| **Session State Integrity** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Prevent data loss during crashes, upgrades, or failed turns; ensure consistent history persistence |
| **Upgrade & Rollback Reliability** | OpenClaw, Hermes Agent, QwenPaw | Safe migration without config/state corruption; verified pre-backup checks; rollback safety |
| **Multi-Agent Profile Isolation** | Hermes Agent, QwenPaw, ZeroClaw | Clear identity binding; prevent credential/tool leakage between profiles; enforce sandboxing |
| **Context Management & Memory Safety** | ZeroClaw, QwenPaw, OpenClaw | Proactive compaction; avoid stack overflow (Windows); prevent cache invalidation from multimodal input |
| **Cross-Platform Stability** | OpenClaw, ZeroClaw, QwenPaw | Fix Windows-specific crashes (stack overflow), macOS permission handling, and mobile UX lag |

These shared pain points signal a **maturing ecosystem where edge-case reliability is now a competitive differentiator**, not just a developer nicety.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Feature Focus** | Full-stack agent platform, plugin ecosystem, voice support | Multi-profile isolation, skills integrity, gateway multiplexing | Collaborative channel logic, identity-aware agents | Hub-first team management, model-per-agent routing | Identity governance, RFC process, security hardening |
| **Target Users** | Power users, developers, early adopters | Enterprise teams, multi-user environments | Teams using Slack-based workflows | Teams building AI agent platforms | Advanced developers, security-focused orgs |
| **Architecture** | Monolithic + modular plugins | Profile-isolated processes, WAL-based DB | Channel-pairing state machine | Hub-administrated multi-agent system | OIDC-driven principal isolation, stack-safe runtime |
| **Differentiator** | Ecosystem depth, cross-provider tooling | Profile consistency, multiplexer reliability | Shared-channel state clarity | Team-scale governance, model routing | Security-by-design, RFC process maturity |

> 📌 **Key Insight**: While OpenClaw and QwenPaw aim to be **platforms**, Hermes Agent and ZeroClaw focus on **identity and trust at scale**, and IronClaw targets **collaborative workflow precision**.

---

### **6. Community Momentum & Maturity**

| Tier | Project(s) | Indicators |
|------|------------|----------|
| **Rapid Iteration (High Velocity)** | OpenClaw, ZeroClaw, QwenPaw | >40 PRs/issue count in 24h; frequent patch releases; active RFC/design discussions |
| **Stabilizing (Focus on Quality)** | Hermes Agent | Patch release post-major regression; strong security fixes; focused bug triage |
| **Maintenance Phase (Low Activity)** | IronClaw | One open PR, no recent releases; low issue volume despite high-impact fix pending |

> 🔍 **Trend**: The ecosystem is bifurcating—**platforms are iterating fast**, while **security and governance layers are being hardened**. IronClaw’s stagnation suggests a risk of attrition if not revitalized.

---

### **7. Trend Signals**  
Based on community feedback and PR/issue patterns, the following industry trends are emerging:

1. **Agent-to-Agent Collaboration is Now a Priority**  
   - QwenPaw Hub’s top-requested feature (#7318) and ZeroClaw’s “loop context compression” signals demand for **multi-session coordination** and **long-running task persistence**.

2. **Cost-Aware Agents Are Coming**  
   - Demand for OpenRouter cost visibility (Hermes Agent #9016) and per-task model selection (QwenPaw #4901) shows users want **budget control** baked into agent logic—not just backend tracking.

3. **Identity & Access Governance Is Maturing**  
   - OIDC, principal isolation (ZeroClaw), profile scoping (Hermes), and admin-controlled skills (QwenPaw) reflect a shift from **personal assistants to managed agent workloads**.

4. **UX Must Match Backend Complexity**  
   - Silent failures (OpenClaw), unresponsive UI (QwenPaw), and invisible cron kills (Hermes) reveal that **observability and feedback loops are now critical**—not optional.

5. **Security & Reliability Are Non-Negotiable**  
   - All projects report memory corruption, state leaks, and upgrade failures. This confirms that **trust is the new battleground**—not just performance or features.

---

### ✅ **Recommendations for Developers & Decision-Makers**
- **Choose OpenClaw** for maximum feature depth and plugin ecosystem—but expect upgrade friction.
- **Pick Hermes Agent** for robust multi-profile use cases requiring isolation and stability.
- **Adopt QwenPaw** if building a team-scale AI platform with granular model control.
- **Monitor ZeroClaw** closely—the upcoming v0.8.6 could redefine secure agent governance.
- **Avoid IronClaw for production** until PR #8076 is merged—its collaborative features are currently unreliable.

> **Final Note**: The ecosystem is moving beyond individual tools. Success will go to those who deliver **reliability, identity, and observability**—not just intelligence.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-12**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 issues and 50 pull requests updated in the past 24 hours—indicating robust developer engagement and ongoing stabilization efforts. The release of **v0.21.2 (v2026.9.11)** addresses critical session state corruption risks introduced in v0.21.0, particularly around `state.db` locking and multiplexed profile handling. Multiple high-severity bugs related to profile isolation, session state integrity, and concurrent access are dominating the issue tracker, suggesting that multi-profile deployments remain a focal point for stability and security. Community contributions are strong, especially in PRs focused on security hardening, timeout handling, and cross-platform compatibility.

---

### **2. Releases**  
✅ **New Release: [v2026.9.11 – Hermes Agent v0.21.2](https://github.com/nousresearch/hermes-agent/releases/tag/v2026.9.11)**  
- **Type:** Patch release  
- **Summary:** Addresses severe instability in `state.db` caused by the connection handling rewrite in v0.21.0.  
- **Key Fixes:**  
  - Prevents second writers from corrupting live WAL state.db during concurrent operations (e.g., `doctor --fix`, hosted_rooms).  
  - Mitigates race conditions in multiplexed gateway environments where multiple profiles share one process.  
  - Implements lazy flock single-writer gate to prevent fail-open scenarios.  
- **Migration Note:** Users upgrading from v0.21.0 should ensure no simultaneous state modifications occur during update. No breaking changes beyond improved resilience.  

> 🔗 [Release Notes](https://github.com/nousresearch/hermes-agent/releases/tag/v2026.9.11)

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- [#108675](https://github.com/nousresearch/hermes-agent/pull/108675): *Fix(skills)* – Preserves full instructional results through both budgets; avoids model pagination traps.  
- [#94081](https://github.com/nousresearch/hermes-agent/pull/94081): *Fix(skills)* – Ignores generated `.pyc` and `__pycache__` files in drift checks, preventing false diffs.  
- [#108683](https://github.com/nousresearch/hermes-agent/pull/108683): *Fix(gateway)* – Aligns dashboard and CLI behavior: multiplexer-served profiles now correctly reported as "running via multiplexer".  
- [#108693](https://github.com/nousresearch/hermes-agent/pull/108693): *Fix(agent)* – Reconciles key-scoped credential endpoints at pool load (Z.AI, Kimi Coding), fixing endpoint misrouting.  

These PRs reflect targeted improvements in **skills integrity**, **credential scoping**, and **profile visibility consistency**, all critical for reliable multi-profile workflows.

---

### **4. Community Hot Topics**  
Top Issues by engagement:

| Issue | Comments | Severity | Link |
|------|----------|----------|------|
| [#66616](https://github.com/nousresearch/hermes-agent/issues/66616) | 199 | P3 (degraded) | [Skills index stale] |
| [#103339](https://github.com/nousresearch/hermes-agent/issues/103339) | 8 | P1 (critical) | [Second writer corrupts state.db] |
| [#107485](https://github.com/nousresearch/hermes-agent/issues/107485) | 5 | P2 | [Cron scheduler killed mid-run] |

🔍 **Analysis of Underlying Needs:**  
- **Persistent session state fragility** is a top concern, especially under multiplexing (`GATEWAY_MULTIPLEX_PROFILES=true`).  
- Users demand **predictable, isolated profile behavior** — current hybrid identity resolution leads to broken toolsets, incorrect secrets, and silent failures.  
- There’s growing frustration with **non-deterministic cron execution** and **invisible state corruption**, indicating a need for stronger runtime guards and observability.

---

### **5. Bugs & Stability**  
Ranked by severity and impact:

1. **[P1] #103339 – Second writer corrupts live-WAL state.db**  
   - **Status:** Open, field-verified.  
   - **Impact:** 7 corruptions in 4 days across 3 profiles.  
   - **Fix PRs:** Pending. This is a core systemic risk requiring immediate attention.  
   - 🔗 [Issue](https://github.com/nousresearch/hermes-agent/issues/103339)

2. **[P2] #66616 – Skills index is stale (29.8h old)**  
   - **Status:** Open, degraded.  
   - **Impact:** Breaks Skills Hub functionality (`/docs/skills-index.json`).  
   - **Fix PRs:** None yet. Requires fix to cron or deployment workflow.  
   - 🔗 [Issue](https://github.com/nousresearch/hermes-agent/issues/66616)

3. **[P2] #107485 – Cron scheduler killed mid-run by idle-exit watchdog**  
   - **Status:** Open.  
   - **Impact:** Scheduled jobs skipped silently.  
   - **Fix PRs:** [#107932](https://github.com/nousresearch/hermes-agent/pull/107932) submitted — closes admission race.  
   - 🔗 [Issue](https://github.com/nousresearch/hermes-agent/issues/107485)

4. **[P2] #108656 – Gemini quota handling loses retry timing & scope**  
   - **Status:** Open.  
   - **Impact:** Exhausts API keys globally even when fallback models are healthy.  
   - **Fix PRs:** None yet. High priority for AI provider reliability.  
   - 🔗 [Issue](https://github.com/nousresearch/hermes-agent/issues/108656)

---

### **6. Feature Requests & Roadmap Signals**  
High-potential features based on user demand and community signals:

| Feature | Request Count | Status | Predicted In Next Version? |
|--------|----------------|--------|----------------------------|
| German (de) locale support | 7 comments | Open | ✅ Yes – low-effort, high-impact |
| Multi-Session Collaboration (S→A loops) | 2 comments | Open | ✅ Likely – aligns with agent orchestration trend |
| Desktop notifications on clarify prompts | 1 comment + PR | Open | ✅ Yes – PR #108692 already in progress |
| Cloudflare Workers AI provider | 1 PR | Open | ✅ Yes – first-class provider integration requested |

📌 **Signal:** Users increasingly want **cross-session coordination**, **better UX feedback**, and **expanded provider diversity**. Expect future versions to emphasize collaboration, transparency, and ecosystem extensibility.

---

### **7. User Feedback Summary**  
Real-world pain points revealed through issues and PRs:

- **Profile confusion:** Users report hybrid behavior after switching profiles—tools not loading, secrets from wrong profile.  
  > _“Selecting a profile doesn’t give you that profile—it gives you a hybrid.”_ – @SuperDodge (#67605)  
- **Silent failures:** Cron jobs fail without logs; sessions hang or crash unexpectedly.  
  > _“Job skipped silently—no indication it was killed.”_ – @GJMcClintock (#107485)  
- **API key leakage:** Credential headers exposed in test output despite redaction attempts.  
  > _“Bearer values still visible as `first4***last4`.”_ – @686f6c61 (#97466)  
- **UX friction:** CLI blocks silently during clarify prompts—users unaware of waiting input.  
  > _“No way to know the agent is waiting.”_ – @forge-witt3rd (#47403)

💡 **Sentiment:** Strong trust in Hermes’ capabilities but growing concern over **stability under multiplexing**, **lack of observability**, and **inconsistent profile boundaries**.

---

### **8. Backlog Watch**  
Critical long-standing issues needing maintainer attention:

| Issue | Age | Severity | Status | Link |
|------|-----|----------|--------|------|
| [#66616](https://github.com/nousresearch/hermes-agent/issues/66616) | 2 months | P3 (degraded) | Open | [Skills index staleness] |
| [#89412](https://github.com/nousresearch/hermes-agent/issues/89412) | 1 month | P2 | Open | [MCP OAuth never triggers for non-challenging servers] |
| [#88715](https://github.com/nousresearch/hermes-agent/issues/88715) | 1 month | P2 | Open | [Profile identity not canonical early] |
| [#76221](https://github.com/nousresearch/hermes-agent/issues/76221) | 1.5 months | P3 | Open | [Multi-Session Collaboration roadmap proposal] |

⚠️ **Note:** These issues represent **fundamental architectural gaps** in profile isolation, identity binding, and provider interoperability. Addressing them will be essential for Hermes to scale into enterprise-grade, multi-user environments.

---

**📊 Project Health Score:** ⭐⭐⭐⭐☆ (4.5/5)  
*Strong momentum, excellent contributor activity, but stability under multiplexing remains a critical risk.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-12**

---

### **1. Today's Overview**  
The IronClaw project shows low activity on GitHub as of 2026-09-12, with no new issues or releases in the past 24 hours. Only one pull request is currently open, indicating minimal ongoing development momentum. The absence of merged PRs or closed issues suggests a pause in active integration or stabilization efforts. With no recent releases, the project appears to be in a maintenance phase, possibly awaiting strategic direction or deeper community engagement.

---

### **2. Releases**  
*No new releases were published in the last 24 hours.*  
There are no release notes or changelogs available for this period. The project remains at its latest stable version prior to 2026-09-12, with no indication of breaking changes or migration requirements.

---

### **3. Project Progress**  
*One pull request is currently open:*  
- **PR #8076**: [fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)  
  - **Status**: Open (last updated: 2026-09-11)  
  - **Author**: be-student  
  - **Summary**: This PR aims to improve the assistant’s handling of shared channels by differentiating between disconnected paired users and unpaired accounts. It introduces channel-specific guidance for both user messages and bot commands while ensuring consistent rejection classification across product surfaces, including adapters and OpenAI-compatible endpoints. The change also updates Slack capabilities to reflect these distinctions.  
  - **Impact**: This fix addresses a nuanced UX and system logic issue related to multi-user channel sharing—critical for enterprise or collaborative use cases.

---

### **4. Community Hot Topics**  
*Only one active PR exists today, but it reflects a high-priority usability concern:*  
- **PR #8076**: [Distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)  
  - Despite having zero comments or reactions, this PR is significant due to its focus on edge-case behavior in shared-channel workflows.  
  - **Underlying Need**: Users likely experience confusion when an assistant fails to correctly interpret whether a shared channel is disconnected (due to pairing loss) versus simply unpaired. Misclassification can lead to incorrect rejections or misleading feedback, especially in regulated or team-based environments where channel integrity matters.  
  - **Implication**: This issue may stem from real-world deployment challenges involving identity synchronization across platforms (e.g., Slack + IronClaw), suggesting growing complexity in cross-platform AI agent orchestration.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions were reported in the last 24 hours.*  
- No open issues reference stability problems, performance degradation, or crashes.  
- **Note**: While no immediate stability risks are evident, the lack of issue activity could signal either excellent stability—or a lack of visibility/user reporting. PR #8076 hints at potential hidden state mismanagement in channel pairing logic, which may warrant proactive monitoring.

---

### **6. Feature Requests & Roadmap Signals**  
*No explicit feature requests were opened recently.*  
However, PR #8076 reveals a strong underlying demand for *context-aware channel state management*, particularly around:  
- Clearer disambiguation between paired and unpaired accounts  
- Granular, channel-specific guidance for bot interactions  
- Consistent error handling across API surfaces  

These signals suggest that future roadmap priorities should include:  
- Enhanced channel lifecycle tracking (connected/disconnected/paired states)  
- Configurable fallback behaviors for shared channels  
- Improved developer-facing diagnostics for shared context failures

---

### **7. User Feedback Summary**  
*Direct user feedback is limited in the current data set.*  
Nevertheless, the existence and nature of PR #8076 imply that users are encountering real pain points in:  
- Collaborative environments where shared channels are used across multiple agents or teams  
- Scenarios requiring precise identity validation before message routing or command execution  
- Ensuring consistent behavior between UI, adapter, and OpenAI-compatible interfaces  

Users likely value reliability and clarity in shared-channel interactions—especially when trust in AI decisions depends on accurate state awareness.

---

### **8. Backlog Watch**  
*No open issues exist currently, but attention should be paid to:*  
- **PR #8076**: [fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)  
  - **Age**: Created 2026-09-06, last updated 2026-09-11  
  - **Risk**: High impact if unresolved—could affect user trust and workflow integrity in shared-agent scenarios  
  - **Action Required**: Maintainers should review, test, and prioritize merging this fix to prevent downstream confusion in production deployments.  
  - **Follow-up**: If not addressed soon, consider adding a label like `priority: critical` or `needs-maintainer-review`.

---

**Conclusion**: IronClaw is in a quiet but potentially fragile state—low activity masks the importance of a critical pending fix. PR #8076 represents a key stability and UX improvement that must be prioritized to maintain confidence in the platform’s reliability for collaborative AI workflows. Proactive maintenance and clearer communication about backlog status will be essential for long-term project health.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-12**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust development pulse: **41 pull requests and 21 issues updated in the last 24 hours**, indicating strong momentum in both feature delivery and community engagement. The release of **v2.2.1 (Stable)** marks a significant milestone, resolving critical stability concerns and introducing granular model routing per agent. Community contributions are accelerating, especially around multi-agent orchestration, UI/UX refinements, and external provider integrations. Overall project health is strong, with a balanced mix of bug fixes, new features, and forward-looking roadmap signals.

---

### **2. Releases**  
🔹 **v2.2.1 (Stable)** – Released on 2026-09-11  
✅ **What’s Changed**:  
- ✨ **Model Routing Per Agent**: Agents now support independent model configuration (provider preferences, fallback behavior) via `model_routing` settings ([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)).  
- 🧠 **Auto Fin Proactive Memory Review & ReMe Upgrade**: Enhances memory lifecycle management with automated review and improved recall performance.  

🔧 **No breaking changes reported**. Migration from v2.2.0 to v2.2.1 is seamless for most users. Users on desktop should verify their local session integrity post-update due to ongoing file sync issues (see #7698).  
🔗 [Release Page](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1)

---

### **3. Project Progress**  
**Merged/Closed PRs (Today)**:  
- [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677): Fixes invalid input validation by returning structured `422` errors instead of silent failures.  
- [#7688](https://github.com/agentscope-ai/QwenPaw/pull/7688): Simplifies grouped session pagination—replaces "Collapse List" with "Load More" to prevent state loss.  
- [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696): Adds `--init-admin` CLI flow for Hub bootstrap (critical for team deployments).  
- [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652): Preserves correct context window sizes from providers (prevents premature compaction).  
- [#7699](https://github.com/agentscope-ai/QwenPaw/pull/7699): Hardens `.master_key` file permissions on read; warns on insecure access.  

📌 **Key Advancements**:  
- **Multi-agent governance** (Hub admin init) now supports headless deployment.  
- **Model-aware context handling** improves long-running task efficiency.  
- **UI/UX polish** continues with session list and file drawer reorganization.

---

### **4. Community Hot Topics**  
🔥 **Most Active Issue**:  
[#7318 — QwenPaw Hub: What Should We Build Next?](https://github.com/agentscope-ai/QwenPaw/issues/7318)  
- **26 comments**, **4 upvotes**  
- Community demand for **multi-user access, team management, and admin-controlled skills** is clear. This issue reflects a strategic pivot from personal AI assistant to **team-scale AI agent platform**.  
- High engagement suggests QwenPaw Hub (multi-tenant edition) is a top priority for adoption beyond individual use.

🔥 **Top Contributing PR**:  
[#7712 — Add Serply as web_search provider](https://github.com/agentscope-ai/QwenPaw/pull/7712)  
- Requested by user (#7711), now implemented by first-time contributor.  
- Supports **BYOK (Bring Your Own Key)**, no default change—ideal for privacy-focused teams.  
- Signals growing demand for **diverse, reliable search backends** beyond Tavily/AnySearch.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs Reported**:  
1. **[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698)**: *Ghost sessions* — Session index shows 9/10, but loads 9/9 content; disk file missing.  
   - **Severity**: High (data loss risk).  
   - **Fix PR**: Not yet merged. Requires deep sync logic audit.  

2. **[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)**: *Stop button ineffective* — UI shows task stopped, but execution continues.  
   - **Severity**: High (misleading UX, potential cost abuse).  
   - **Fix PR**: [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) (in progress) aims to diagnose dropped `subagent_model` overrides.  

3. **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)**: *spawn_subagent fails consistently* — All subagents time out even with extended timeouts.  
   - **Root Cause**: Likely `subagent_model` override not respected (see #7676).  
   - **Fix PR**: [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) under review.  

⚠️ **Regression**:  
- [#7687](https://github.com/agentscope-ai/QwenPaw/issues/7687): Switching agents silently routes messages to new conversation (regression in v2.2.1-beta.2).

---

### **6. Feature Requests & Roadmap Signals**  
🔮 **Emerging Themes for v2.3 / QwenPaw Hub**:  
- **Per-task model selection** (#4901, #7676): Demand for low-cost models (e.g., Haiku) for simple tasks, high-capacity models for reasoning.  
- **Loop context compression** (#7679): Critical for long-running tasks — users want `/compact` command triggered at threshold.  
- **Default Loop mode customization** (#7714): Users want to set "Target" or "Task" mode as default — reducing repetitive UI interaction.  
- **Right-side chat files drawer** (#7704): Suggests shift toward **right-aligned UI workflow** (like VS Code), improving workspace layout.  
- **Telegram rich message support** (#7713, #7590): Enhanced formatting (tables, markdown) expected for bot communication.

💡 **Prediction**: v2.3 will likely include **multi-model task dispatch**, **advanced loop control**, and **hub-first UI redesign**.

---

### **7. User Feedback Summary**  
🗣️ **User Pain Points**:  
- **Mobile UX**: Android users struggle with **no line break support** in input (Issue #7707).  
- **Session corruption**: Multiple reports of **missing session files** and **ghost conversations** (#7698).  
- **Model persistence**: Users lose model settings unexpectedly (#7708).  
- **Workflow friction**: Setting work directories fails persistently (#7705); “default” mode naming confuses users (#7714).  

🌟 **Satisfaction Signals**:  
- Positive feedback on **v2.2.1 stability** and **Hub announcement** (#7318).  
- Appreciation for **Serply integration** (privacy-conscious users).  
- High engagement in **console UI improvements** (file drawer, pagination).

---

### **8. Backlog Watch**  
👀 **Longstanding Issues Needing Attention**:  
- [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901): *spawn_subagent support for per-task model selection* — **3 years old**, critical for cost optimization.  
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676): *subagent_model has no effect* — **duplicate of #4901**, blocker for advanced workflows.  
- [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709): *Timed tasks often hide output* — affects reliability of scheduled automation.  
- [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705): *Work directory not respected* — core UX issue for developers.  

📌 **Action Needed**: Prioritize PRs addressing `subagent_model` inheritance and session sync bugs to unlock advanced multi-agent use cases.

---  
**Next Update**: 2026-09-13 | Source: GitHub Activity (2026-09-11–12)  
📊 Data collected from: [QwenPaw GitHub](https://github.com/agentscope-ai/QwenPaw)

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-12  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **50 new issues and 50 PRs updated in the last 24 hours**, indicating strong ongoing development momentum. The activity is concentrated in critical areas: **security hardening (OIDC, principal isolation), runtime stability (stack overflow, memory corruption), and multimodal agent behavior (image handling, cache invalidation)**. Despite no new releases, the project shows signs of a mature, rapidly evolving architecture—particularly around identity governance, context management, and cross-platform reliability.

---

### **2. Releases**

> ❌ **No new releases** were published in the past 24 hours or at all during this reporting period.

- **Latest release:** v0.8.5 (as of 2026-09-07)  
- **Status:** No breaking changes or migration notes announced.  
- **Note:** The absence of new releases suggests that the team is prioritizing internal stabilization and feature refinement ahead of a next major version.

---

### **3. Project Progress**

**Merged/Closed PRs (Today):**  
None merged today. However, several high-impact PRs were closed or marked as resolved via linked issues:

- **PR #10786** – *Anthropic thinking block rewrites cached history* → Closed after root cause identified.
- **PR #10690** – *Integrations page slugifies display name instead of family key* → Fixed.
- **PR #10532** – *Degraded-config remediation invokes wrong binary* → Resolved.
- **PR #9092** – *ZeroCode keystroke lag in long sessions* → Closed; tracked under performance optimization.

> ✅ These closures indicate progress in **user experience consistency, config reliability, and rendering performance**.

---

### **4. Community Hot Topics**

Top 5 most discussed items (by comment count):

| Issue | Comments | Link | Summary |
|------|--------|------|--------|
| [#8692] Maintainer decision queue for RFCs & design issues | 15 | [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | **Core process bottleneck**: Maintainers are overwhelmed by RFCs needing decisions. Signals need for clearer ownership and triage workflow. |
| [#10549] Simplify RFC voting (remove discussion windows) | 9 | [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | **Process friction**: Users argue fixed waiting periods (48–72h) don’t improve quality. Suggesting immediate voting post-review to accelerate innovation. |
| [#10753] Stack overflow on Windows in `process_line_session_new_creates_session_on_two_megabyte_stack` | 3 | [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) | **Critical platform-specific crash**: Aborts with `0xc00000fd` on Windows due to stack exhaustion. Requires urgent fix. |
| [#10788] Failed Code/ACP turn discards durable history | 1 | [Issue #10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | **Data loss risk**: When a turn fails, even completed tool exchanges are lost from persistent storage. High severity. |
| [#10778] Multimodal image cap eviction rewrites earlier history | 1 | [Issue #10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778) | **Cache corruption**: Image attachment triggers full history rewrite, invalidating prior caching. Impacts performance and consistency. |

🔍 **Analysis**: The community is focused on **developer experience (RFC speed), platform stability (Windows crashes), and data integrity (history loss)**. There’s growing pressure to streamline governance and reduce friction in core workflows.

---

### **5. Bugs & Stability**

| Severity | Issue | Description | Fix Status |
|--------|------|------------|-----------|
| 🔴 **S1 - Workflow Blocked** | [#10609] `zerocode` ignores launch directory | Forces workspace to default path, breaking local dev flow | Open |
| 🔴 **S2 - Degraded Behavior** | [#10734] `RpcDispatcher::process_line` near 2MB stack guard | Causes genuine Windows stack overflow (`0xc00000fd`) | Open — **critical** |
| 🔴 **S2 - Degraded Behavior** | [#10753] Session/new overflows 2MB stack on Windows | Same root cause as above; test was green 3 days ago | Open — **regression** |
| 🔴 **S2 - Degraded Behavior** | [#10788] Failed turn discards durable history | Loss of accepted prompt and tool results | Open — **high-risk data loss** |
| 🟡 **S3 - Minor Issue** | [#10782] Channel reply-intent precheck discards LLM usage | Classifier cost not recorded despite billable call | Open — **cost tracking flaw** |

⚠️ **Critical Risk**: Two separate **Windows stack overflow bugs** (#10734, #10753) suggest **platform-specific memory safety issues** in the runtime. These must be addressed before any stable release.

---

### **6. Feature Requests & Roadmap Signals**

| Request | Key Components | Likely Inclusion? |
|-------|----------------|------------------|
| [#10549] Remove mandatory RFC discussion windows | Faster RFC cycle, immediate voting | ✅ High probability — aligns with process maturity push |
| [#10780] Restore proactive token-budget context compaction | Context trimming based on token count, not just message count | ✅ Strong signal — v0.8.5 lacks this; users report memory bloat |
| [#10781] Implement inert config keys (`context_compression.*`, `keep_recent`, etc.) | Make config knobs functional | ✅ Likely — user frustration is documented |
| [#10640] Passive Telegram group context | Silent room-scoped context for group chats | ⚠️ Possible — low-risk enhancement |
| [#9809] Multiple models per provider profile | Allow one credential to serve multiple models | ✅ High value — supports multi-model workflows |

🚀 **Roadmap Trend**: **User-centric flexibility (config, providers)** and **performance-aware context management** are emerging as top priorities.

---

### **7. User Feedback Summary**

Real pain points reported by users:

- **"I lose my entire ACP session history if a single turn fails."** → [#10788]  
  > *"This happens frequently when using slow providers. I’ve lost work twice this week."*

- **"My ZeroCode keystrokes lag after 100+ messages."** → [#9092]  
  > *"It feels like the UI is rendering the whole history every time I type."*

- **"Image attachments break my cache prefix and make everything slower."** → [#10778], [#10701]  
  > *"Every screenshot resets the history cache. It’s unusable for debugging."*

- **"The `zerocode` command starts in the wrong folder."** → [#10609]  
  > *"I launch it from my project dir, but it runs in `/agents/default/workspace`. This breaks `git` commands."*

✅ **Positive signals**: Users appreciate **modular provider support** and **security improvements**, especially OIDC and principal isolation.

---

### **8. Backlog Watch**

| Issue | Priority | Age | Notes |
|------|---------|-----|------|
| [#8692] Maintainer decision queue for RFCs & design issues | P2 | 2 months | **High-priority backlog blocker**: No clear process for RFC triage. Needs maintainer action. |
| [#9967] Establish harness evaluation framework | P2 | 1.5 months | **Long-term health indicator**: Without measurable benchmarks, development direction is unclear. |
| [#8289] OIDC milestone: canonical principals & inbound auth | P2 | 3 months | **Core security roadmap**. Currently blocked on coordination across multiple PRs. |
| [#10780] Restore proactive token-budget compaction | P1 | 1 day | **Urgent fix**: v0.8.5 has no proactive trimming. Must be addressed in next release. |
| [#10781] Implement inert config keys | P2 | 1 day | **Low-hanging fruit**: Simple fixes can significantly improve user trust. |

📌 **Maintainer Attention Needed**: The **RFC decision queue (#8692)** and **OIDC implementation (#8289)** are stalled despite being foundational. Clear ownership and timeline commitment are required.

---

### ✅ **Overall Project Health Assessment**

- **Strengths**: High contributor engagement, robust issue triage, focus on security and performance.
- **Risks**: Critical Windows stack overflow bugs, lack of release cadence, RFC process bottlenecks.
- **Recommendation**: Prioritize **fixing stack overflow issues**, **launching a formal RFC triage process**, and **releasing v0.8.6 with context compaction and history durability fixes**.

👉 **Next Steps**:  
- Merge #10734 / #10753 fix PRs immediately.  
- Schedule RFC triage meeting to address #8692.  
- Plan v0.8.6 release with context management and history integrity patches.

---  
*Digest generated: 2026-09-12 | Source: GitHub API (zeroclaw-labs/zeroclaw)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*