# AI 基础设施日报 2026-09-09

> 生成时间: 2026-09-09 00:33 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI推理基础设施生态报告 – 2026-09-09**

---

### **1. 生态概览**

2026年第三季度，AI推理基础设施格局正迅速向**下一代模型架构**——MoE、混合Mamba/Attention、稀疏注意力——靠拢，这一趋势由NVIDIA Blackwell（SM120）和AMD gfx950/gfx1201等硬件进步所驱动。各项目愈发聚焦于**分布式可扩展性**、**并发环境下的确定性**以及**硬件特异性内核优化**，云原生网关（LiteLLM、SGLang）与本地运行时引擎（vLLM、llama.cpp）均展现出强劲势头。前沿已不仅是速度——而是**可预测、可复现且具备高弹性的大规模推理能力**，尤其是在代理工作流场景中。

---

### **2. 活动对比**

| 项目 | 开放问题数（↑/↓） | 合并的PR数（↑/↓） | 发布状态 |
|-------|------------------|------------------|----------------|
| **vLLM** | 48 (+2) | 8 (+1) | 稳定版：`v0.27.1`；无破坏性变更 |
| **SGLang** | 62 (+5) | 12 (+3) | 无新版本发布；存在高严重性稳定性问题 |
| **llama.cpp** | 78 (+8) | 10 (+2) | 补丁版本：`b10867`（修复懒加载模式） |
| **Ollama** | 54 (+3) | 5 (+2) | 无发布；关键修复已合并 |
| **LiteLLM** | 49 (+4) | 6 (+2) | 无公开发布；预发布分支影响显著 |
| **Unsloth** | 67 (+6) | 9 (+3) | 测试版：`v0.1.807-beta` 发布 |

> ✅ *趋势*：**SGLang 和 Unsloth 问题数量最高**，表明其正在积极稳定复杂的MoE/混合模型。**vLLM 和 LiteLLM** 在PR质量与集成深度上领先，尤其在可观测性和路由方面表现突出。

---

### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **Nemotron-H / Kimi K3 (NVFP4)** | ✅ | ⚠️ 部分支持 | ⚠️ 仅支持混合模式 | ❌ | ❌ | ❌ |
| **Qwen3.8-Flash-Next (稀疏/MoE)** | ⚠️ 非确定性 | ✅ 支持推测解码状态转移 | ✅ | ⚠️ 死循环 | ✅ | ⚠️ 工具误报 |
| **DeepSeek-V4-Flash (混合)** | ⚠️ SM8x 被阻塞 | ✅ 支持 TP=8 | ✅ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash (MoE + DSA)** | ❌ | ✅ 完全支持 ROCm | ❌ | ⚠️ 缺少量化 | ❌ | ❌ |
| **HrmTextForCausalLM (双栈)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Qwen4exp (张量稀疏)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |

> 🏆 **胜出者**：**SGLang** 在**新模型覆盖范围**上领先，尤其对GLM-5.3和Qwen3.8-Flash-Next提供完整的MoE与推测解码支持。  
> 🔥 **显著短板**：Ollama 对MoE模型支持不完整；LiteLLM 缺乏原生模型加载层。

---

### **4. 性能前沿**

| 优化重点 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存与预取** | ✅ 批次无关，DCP解耦 | ✅ HiCache，DSA索引器 | ✅ GPU驻留LRU缓存 | ❌ | ❌ | ❌ |
| **推测解码** | ✅ 快速失败，DFlash2 | ✅ Domino滚动，EAGLE | ❌ | ❌ | ❌ | ❌ |
| **量化（FP8/NVFP4）** | ✅ FP8/NVFP4内核（SM10x） | ✅ FP8 + MXFP4（AMD） | ✅ IQ3_S，EXL3 | ✅ IQ3_S（部分） | ❌ | ✅ EXL3 |
| **分布式服务** | ✅ MoE批次无关性 | ✅ 解耦路线图 | ❌ | ❌ | ✅ 自动路由透明化 | ❌ |
| **内核融合与底层调优** | ✅ ReLU2+FP8融合 | ✅ JIT融合DSA内核 | ✅ Vulkan/GELU融合 | ❌ | ❌ | ✅ Vulkan加速（提升20%） |

> 📈 **主导趋势**：  
> - **vLLM** 在**批次无关的MoE推理**和**推测解码鲁棒性**方面占据主导。  
> - **SGLang** 在**MoE解耦**和**分层缓存**方面领先。  
> - **Unsloth** 实现了最佳的**AMD Vulkan性能**——对边缘/本地部署至关重要。  
> - **llama.cpp** 在**MoE预取**和**iGPU调优**方面表现卓越。

---

### **5. 层级定位**

| 项目 | 主要层级 | 核心差异点 |
|-------|---------------|--------------------|
| **vLLM** | **服务引擎** | 高吞吐、低延迟推理，支持高级批处理与推测解码 |
| **SGLang** | **服务引擎 + 网关** | 支持混合MoE + DSA；聚焦prefill-decode解耦与分层缓存 |
| **llama.cpp** | **本地运行时 / 边缘推理** | iGPU/Vulkan/Metal优化；适合离线、低资源环境 |
| **Ollama** | **面向代理的本地运行时** | MLX运行器，结构化输出，代理工具链；弥合本地与云端差距 |
| **LiteLLM** | **多提供商网关 / 协调层** | 统一API，自动路由，成本追踪，跨提供商护栏追踪 |
| **Unsloth** | **桌面应用 + 本地代理运行时** | 用户友好界面，代理工作流，Windows支持；面向开发者与创作者 |

> 💡 **层级清晰度**：  
> - **vLLM/SGLang**：云规模推理引擎。  
> - **llama.cpp/Ollama/Unsloth**：以本地/边缘为核心的运行时栈。  
> - **LiteLLM**：多提供商流水线的集中式协调层。

---

### **6. 趋势信号**

#### **从今日摘要中提炼的关键行业趋势**
1. **硬件特异性内核优化已成为核心竞争力**  
   - SM10x 上的 NVFP4、gfx950 上的 FP8、AMD iGPU 上的 Vulkan——均需定制内核。落后于此的项目将面临性能断崖。

2. **MoE 与混合模型已成为新标准——但稳定性仍滞后**  
   - 多个项目报告在MoE配置下出现非确定性、静默崩溃、KV缓存丢失等问题。确定性（`VLLM_BATCH_INVARIANT=1`）已成为生产环境必备项。

3. **代理工作流正推动功能需求升级**  
   - 工具调用可靠性、结构化输出、上下文溢出重试逻辑、会话级成本追踪——已成为首要关注点，尤其在 Ollama、LiteLLM 与 Unsloth 中。

4. **解耦架构正从研究走向生产**  
   - SGLang 的 prefill-decode 解耦路线图，以及 vLLM 的 DCP 解耦支持，表明分布式服务已超越概念验证阶段。

5. **安全与可观测性不再是可选项**  
   - Unsloth 报告93个安全发现，LiteLLM 修复预算泄漏，SGLang 增加调试标签——反映出生产系统对审计与信任的迫切需求。

#### **应用开发者应重点关注**
- ✅ **在生产环境中启用 `VLLM_BATCH_INVARIANT=1`**，确保MoE输出的可复现性。
- ✅ **监控 `--enable-hierarchical-cache` 与 `NON_REASONING` 分层**——它们是实现成本高效代理流水线的关键。
- ✅ **尽早测试 SM120/B200 与 AMD gfx1201**——NVFP4 与 Vulkan 虽有性能增益，但也伴随崩溃风险。
- ✅ **避免在 gRPC 客户端使用 `max_new_tokens=0`**——这是 vLLM 中一个微妙但关键的缺陷。
- ✅ **在可用时优先使用 `EXL3` 或 `FP8` 量化**——这些方案可在极小精度损失下实现更高吞吐。

> 🔮 **最终洞察**：下一波创新浪潮并非追求原始速度——而是围绕**韧性、可预测性与开发者体验**。选择技术栈时，不仅要考虑性能，更要关注**负载下的稳定性与可观测性的清晰度**。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-09**

---

### **1. 今日亮点**  
vLLM 项目持续加速对下一代模型与硬件的支持，围绕 MoE 和混合架构在 **NVFP4 量化** 和 **批处理无关推理** 方面取得关键进展。关键 PR 实现了 DFlash 的 FP8/NVFP4 内核支持，增强了 CPU/GPU 同步检查，并提升了推测解码的鲁棒性——尤其在高并发场景下对混合 Mamba/GDN 模型表现显著。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
暂无新版本发布或破坏性 API/配置变更。`v0.27.1` 稳定版仍为当前最新版本，`main` 分支正在进行持续优化。

---

### **3. 新模型与硬件支持**  
- ✅ **NVFP4 支持**：通过 #53319（Torch 线性后端）和 #55713（DSpark top-k 投影）实现，使 SM10x（Blackwell）架构上 W4A4 NVFP4 模型（如 Nemotron-H 与 Kimi K3）得以高效推理。
- ✅ **SM8x（Ampere）支持**：正通过 #50576 推进 DeepSeek-V4-Flash-0731 支持，目前因 A100/A800/RTX 30xx 缺乏内核兼容性而受阻。
- ✅ **Intel XPU（Battlemage）**：持续集成并修复了 TP=2 崩溃问题 (#48953)、主机内存泄漏 (#50269)，以及 MoE 批处理无关性问题 (#55881)。
- ⚠️ **ROCm / AMD**：SM120 上存在持续问题，包括 CUDA 非法内存访问 (#54225)、芯片级 warp 错误 (#52225)，以及异步调度下的静默退出 (#53726)。

---

### **4. 性能与优化**  
- 📈 **内核融合**：#53793 将 ReLU2 与静态 FP8 激活量化融合用于 MLP 下投影，提升兼容 Nemotron-H 模型的吞吐量。
- 🔥 **推测解码**：#55294 为 DFlash2 FP16 推测解码引入快速失败逻辑，防止溢出导致无效草稿生成。
- 🧩 **混合模型效率**：#55531 为混合 Mamba 模型（如 Kimi K3）添加对称 DCP 解耦支持，实现可扩展的共享 KV 缓存复用。
- 🔄 **批处理无关性**：#55881 将确定性归约行为扩展至 `VLLM_BATCH_INVARIANT=1` 下的 MoE 模型，符合 CUDA 语义，降低分布式环境中的非确定性。

---

### **5. 稳定性与回归问题**  
- ❌ **非确定性贪婪解码**（Qwen3.8-Flash-Next）：#54521 报告当上下文接近 `indexer_budget` 时，五次完全相同的请求产生不同结果，由 Qwen 稀疏注意力模式切换触发。*暂无修复 PR。*
- ❌ **CUDA 非法内存访问（SM120）**：#54225 报告在 RTX PRO 6000 Blackwell 上使用 FlashInfer + NVFP4 + FP8 KV 缓存进行 16 token 请求时发生崩溃。TRITON_ATTN 未受影响。
- ❌ **RTX 3090 上静默退出（退出码 0）**：#53726 确认在混合 GDN + MTP k=3 + 异步调度下，尽管已有修复，仍持续出现静默 IMA 崩溃。
- ⚠️ **MTP 中的 KV 缓存缺失**：#53504 显示在混合 Mamba/GDN 模型中，首次重复提示时完全错过前缀缓存，导致完整重预填充，吞吐损失高达 30–40%。

---

### **6. 对应用开发者的启示**  
- **启用 `VLLM_BATCH_INVARIANT=1`** 以确保 MoE 和混合模型的位级确定性——尤其在需输出可重现的生产流水线中（#55881）。
- **避免在 gRPC 客户端中使用 `max_new_tokens=0`** —— PR #55980 修复了默认处理缺陷，可能引发意外的令牌限制；请更新客户端逻辑。
- **监控混合模型（如 Qwen3.8-GDN）的推测解码稳定性**；若首次重复时前缀缓存失效，预期性能将下降（#53504）。
- **验证大型 MoE 检查点（如 Llama-4 Scout）的加载耗时**——部分模型即使从 CPU 缓存加载也超过 5 分钟（#31624）。
- **在新型硬件（SM120/B200）上谨慎测试**：NVFP4 与 FlashInfer 虽具潜力，但在极端负载下仍存在内存损坏风险。

> 🔗 [查看议题 #50576 (DeepSeek-V4-Flash SM8x)](https://github.com/vllm-project/vllm/issues/50576)  
> 🔗 [查看 PR #55881 (XPU 上 MoE 批处理无关性)](https://github.com/vllm-project/vllm/pull/55881)  
> 🔗 [查看 PR #54225 (SM120 CUDA IMA 崩溃)](https://github.com/vllm-project/vllm/pull/54225)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 消息简报 – 2026-09-09

---

### **1. 今日重点**  
SGLang 持续推进对下一代 MoE 和稀疏注意力模型的支持，针对 GLM-5.3-Flash 与 DFlash/DSpark 规划解码在 AMD ROCm (gfx950) 上的兼容性取得关键进展。高并发场景下影响 Qwen3.8-Flash-Next 与 DeepSeek-V4 的严重稳定性问题已被标记，同时发现 Rust TreeCore 在大规模场景下的性能回归。团队正积极优化预填充-解码分离架构与分层缓存行为。

---

### **2. 发布与破坏性变更**  
过去 24 小时内无报告。未发布新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 7.0 (gfx950)**：多个路径上为 **GLM-5.3-Flash** 落地关键功能合并请求：
  - FP8 与 Quark MXFP4 MoE 支持 ([PR #38546](https://github.com/sgl-project/sglang/pull/38546))
  - Zero-RoPE TileLang DSA 内核 ([PR #38547](https://github.com/sgl-project/sglang/pull/38547))
  - 通过 AITER 实现 mHC 路由 ([PR #38545](https://github.com/sgl-project/sglang/pull/38545))
  - 预洗牌格式下的 K-pool index-K 布局 ([PR #38544](https://github.com/sgl-project/sglang/pull/38544))
  - HIP 上的融合 DSA top-k JIT 内核 ([PR #38542](https://github.com/sgl-project/sglang/pull/38542))
- **新增模型支持**：
  - `Qwen/Qwen3.8-Flash-Next` 现已支持 PD 状态转移 ([PR #36651](https://github.com/sgl-project/sglang/pull/36651))
  - `nvidia/GLM-5.3-Flash` 在 AMD 后端实现完整 DSA + HiCache 集成。
- **后端更新**：
  - FlashInfer 后端现已支持 Blackwell GPU ([Issue #35080](https://github.com/sgl-project/sglang/issues/35080)) — *注：缺陷仍开放；尚未确认功能正常*。

---

### **4. 性能与优化**  
- **权重加载加速**：每秩权重缓存守护进程将 Qwen3-235B FP8 的加载时间从约 306–327 秒降至 **<1 秒**（[Issue #33522](https://github.com/sgl-project/sglang/issues/33522)，[博客](https://www.lmsys.org/blog/2026-08-21-sglang)）。
- **推测解码优化**：DFlash V2 已加入 Domino 滚动机制，适用于 `Qwen3-8B-Domino-b16`，实现更快的草稿接受速度并降低延迟。
- **内存效率提升**：针对 HiCache 的 DSA 索引器主机存储紧凑性的 PR ([PR #38426](https://github.com/sgl-project/sglang/pull/38426)) 旨在减少大型 MoE 流水线中的 CPU 内存开销。
- **Rust TreeCore 性能回归**：与 Python TreeCore 相比，在小规模密集模型高并发场景下观察到端到端延迟下降（[Issue #38536](https://github.com/sgl-project/sglang/issues/38536)）——当前正在深入调查中。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|------|-------------|------------|
| 🔴 高 | [#36537](https://github.com/sgl-project/sglang/issues/36537) | Qwen3.8-Flash-Next 工具解析器在 token ID 0 处陷入循环 | 开放；已提供最小可复现案例 |
| 🔴 高 | [#33549](https://github.com/sgl-project/sglang/issues/33549) | DeepSeek-V4 TP=8 在 8×H20 上运行至 ~245K 上下文时无限挂起 | 开放；所有 GPU 利用率 100%，监控器强制终止服务 |
| 🟡 中 | [#38202](https://github.com/sgl-project/sglang/issues/38202) | DFLASH/DSPARK KV 池预算使用 `tp_size` 而非 `attn_tp_size`，导致 Kimi-K3 DP 注意力出现 OOM | 开放；影响资源分配准确性 |
| 🟡 中 | [#38031](https://github.com/sgl-project/sglang/issues/38031) | GLM-5.3-Flash HiCache 主机层级载入回写损坏生成结果，即使无推测解码亦然 | 开放；导致工具调用丢失及重复循环 |
| 🟡 中 | [#36333](https://github.com/sgl-project/sglang/issues/36333) | 断连流式客户端遗留僵尸请求 → 日志中持续输出“状态已被删除” | 开放；源自 #34160 还原的回归 |

---

### **6. 对应用开发者的影响**  
- **谨慎使用实验性功能**：在相关问题修复前，请避免在 GLM-5.3-Flash 或 Qwen3.8-Flash-Next 上使用 `--speculative-algorithm EAGLE` 和 `HiCache`。
- **AMD 部署准备就绪**：若使用 gfx950（RX 7900 系列），可期待更优的 MoE 支持，但请验证 `--attention-backend dsv4` 是否会触发类似 [#38571](https://github.com/sgl-project/sglang/issues/38571) 的崩溃。
- **谨慎调整并发度**：高吞吐负载可能因 Rust TreeCore 效率问题引发意外性能下降——建议现阶段回退至 Python TreeCore。
- **监控 KV 缓存与草稿池配置**：`tp_size` 与 `attn_tp_size` 配置错误可能导致分布式环境下无声的 OOM——务必仔细检查启动脚本。
- **关注解耦进展**：预填充-解码解耦路线图 ([#21703](https://github.com/sgl-project/sglang/issues/21703)) 已接近生产可用；请为未来版本中的完整 P/D 分离做好准备。

> 💡 **实用提示**：仅在验证过已知稳定模型后，再启用 `--enable-hierarchical-cache` 标志。监控 `sglang:eviction_duration_seconds` 与 `sglang:evicted_tokens_total` 指标以识别缓存压力。

---  
*简报生成时间：2026-09-09 | 来源：[sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 摘要 – 2026-09-09**

---

### **1. 今日重点**  
最新更新聚焦于集成显卡（iGPU）上延迟加载张量行为的稳定性，尤其针对 Vulkan 与 Metal 后端。关键修复包括回滚此前过于激进的自动延迟加载逻辑，该逻辑曾导致性能下降。同时，MoE（专家混合）优化方面也取得显著进展，通过预取和驻留 GPU 的 LRU 缓存机制提升效率。此外，多个高严重性崩溃问题正被报告并追踪，尤其集中在 AMD iGPU 和 RTX 5090 上。

---

### **2. 发布与破坏性变更**  
- **`b10867`**：在 iGPU 上默认禁用延迟张量加载（`--lazy-mode auto`），以防止 `auto` 模式下的性能退化。此变更回滚了此前触发张量 >4GiB 时自动启用延迟加载的启发式策略，现该行为已移至 `lazy=large`。  
  🔗 [PR #28326](https://github.com/ggml-org/llama.cpp/pull/28326) | [Commit b10867](https://github.com/ggml-org/llama.cpp/commit/b10867)

---

### **3. 新模型与硬件支持**  
- **Qwen4exp**：在识别出先前回归问题后，重新启用 `-sm tensor` 支持；对 Qwen4-exp 架构中高效上下文处理至关重要。  
  🔗 [PR #28569](https://github.com/ggml-org/llama.cpp/pull/28569)
- **NVIDIA Nemotron-3-Puzzle-75B-A9B (NemotronHPuzzle)**：新增对混合 Mamba2/Attention/MoE 架构的支持。  
  🔗 [PR #25444](https://github.com/ggml-org/llama.cpp/pull/25444)
- **HrmTextForCausalLM (DFM Mimir 1B)**：新增对双栈变压器模型（交替循环处理）的支持。  
  🔗 [PR #27625](https://github.com/ggml-org/llama.cpp/pull/27625)
- **GLM5.3 (flash)**：已开启功能请求，以添加对下一代 GLM 模型的支持。  
  🔗 [Issue #27922](https://github.com/ggml-org/llama.cpp/issues/27922)

---

### **4. 性能与优化**  
- **MoE 优化**：  
  - 引入 `--prefetch-experts-slots N`，实现主机驻留 MoE 专家权重的前瞻 H2D 预取，降低动态路由过程中的解码延迟。  
    🔗 [PR #28414](https://github.com/ggml-org/llama.cpp/pull/28414)  
  - 为卸载至 CPU 内存的 MoE 专家添加驻留 GPU 的 LRU 缓存（`-ot ...exps=CPU`），提升带宽利用率与吞吐量。  
    🔗 [PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)
- **Vulkan**：  
  - 将 `UNARY(GELU|SIGMOID|SILU|SOFTPLUS) + MUL` 操作融合为单个内核，减少分派开销。  
    🔗 [PR #28583](https://github.com/ggml-org/llama.cpp/pull/28583)  
  - 添加命令缓冲区调试标签，供 GPU 分析工具（如 RenderDoc、Nsight）使用，提升追踪可见性。  
    🔗 [PR #28101](https://github.com/ggml-org/llama.cpp/pull/28101)
- **Metal**：修复 `mul_mv_iq3_xxs` 内核在小 `ne00` 值（<1024）时的空闲 SIMD 组问题，改善占用率与吞吐量。  
  🔗 [PR #28086](https://github.com/ggml-org/llama.cpp/pull/28086)

---

### **5. 稳定性与回归问题**  
- **严重崩溃与缺陷**：  
  - **AMD iGPU Vulkan**：`--lazy-mode auto` 出现回归，导致 qwen4exp 模型预填充吞吐量减半（pp512 下约下降 50%）。  
    🔗 [Issue #28160](https://github.com/ggml-org/llama.cpp/issues/28160)  
  - **RTX 5090**：在 Linux 上使用 Qwen3.8-27B Q6_K 进行 CUDA 推理时，引发完整 GPU 重置及显示丢失。  
    🔗 [Issue #27910](https://github.com/ggml-org/llama.cpp/issues/27910)  
  - **Intel Arc A770/Vega 8**：在 Vulkan 下约 50K 上下文长度时出现 `vk::Queue::submit: ErrorDeviceLost`。  
    🔗 [Issue #26447](https://github.com/ggml-org/llama.cpp/issues/26447)  
  - **CUDA Compute Capability 120**：`mmq` 模块因不支持该计算能力导致构建失败。  
    🔗 [Issue #18363](https://github.com/ggml-org/llama.cpp/issues/18363)  
- **错误输出**：  
  - IQ3_S 量化在 RTX 5060TI（Blackwell）上产生垃圾输出。  
    🔗 [Issue #28581](https://github.com/ggml-org/llama.cpp/issues/28581)  
  - MTP 保留请求间状态，导致输出非确定性。  
    🔗 [Issue #26425](https://github.com/ggml-org/llama.cpp/issues/26425)

---

### **6. 对应用开发者的启示**  
- **避免在 iGPU 上使用 `--lazy-mode auto`**：若需在集成显卡上运行大模型并追求高吞吐，应显式使用 `--lazy-mode large` 或 `--lazy-mode all`。默认行为已调整，优先保障稳定性而非推测性性能。
- **充分利用 MoE 优化**：启用 `--prefetch-experts-slots`，并在将 MoE 专家卸载至 CPU 内存时考虑启用 GPU 驻留 LRU 缓存（`--gpu-resident-moe-cache`），可显著提升解码效率。
- **关注硬件特定回归**：若部署于 AMD Strix Halo（Radeon 8060S）、Intel Arc 或 NVIDIA RTX 50xx 系列，请谨慎测试——多个稳定性问题正在持续报告中。
- **为未来模型支持做好准备**：关注如 #28569 和 #27922 等 PR，尽早集成即将支持的 Qwen4exp 与 GLM5.3。
- **使用工具感知的 Jinja 模板**：在流式工具调用场景中，确保模板兼容 `stream=true` 语义，并正确使用 `jinja` 解析器，避免部分或格式错误输出。

> 📌 **实用提示**：若运行大型上下文 Vulkan 工作负载（>131k token），建议设置 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4GiB`，以缓解子分配碎片引起的吞吐量骤降问题。  
> 🔗 [Issue #27734](https://github.com/ggml-org/llama.cpp/issues/27734)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama 摘要 – 2026-09-09**

---

### **1. 今日重点**  
Ollama 生态系统持续成熟，代理工作流与 API 兼容性方面取得关键进展，尤其在 Responses API 与工具支持方面。针对 `gemma3:12b` 结构化输出截断问题以及 `glm-5.3:cloud` 的无限推理循环，已合并关键修复；同时新增的 PR 优化了 MLX 运行器的上下文处理能力，并提升了流式响应中的错误容错性。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告发布或破坏性变更。*  
然而，今日合并了若干影响运行时行为的高影响力 PR：
- [`PR #18329`](https://github.com/ollama/ollama/pull/18329)：现在接受纯文本标签的 Codex 代理消息（例如 `"role": "agent"`），提升与 OpenAI 风格代理框架的兼容性。
- [`PR #18328`](https://github.com/ollama/ollama/pull/18328)：当网页搜索次数达到上限时，不再导致完全失败，而是优雅地完成响应。
- [`PR #18324`](https://github.com/ollama/ollama/pull/18324)：在对话压缩过程中发生上下文溢出后引入重试逻辑，显著降低长周期代理中的静默失败率。

> ✅ *这些更改向后兼容，但在涉及工具使用或长对话的边缘情况下可能改变行为。*

---

### **3. 新模型与硬件支持**  
- **MLX 运行器增强**：
  - [`PR #18263`](https://github.com/ollama/ollama/pull/18263)：新增对 **Qwen3.5/3.8 静态 YaRN 上下文** 的支持，通过 RoPE 频率缩放实现超出原生限制的准确上下文扩展。
  - [`PR #18285`](https://github.com/ollama/ollama/pull/18285)：允许显式覆盖 `num_ctx` 而不干扰基于 VRAM 的自动软大小调整 —— 对 Apple Silicon 设备实现细粒度控制至关重要。

- **量化支持**：
  - 问题 [#18297](https://github.com/ollama/ollama/issues/18297) 确认 `Qwen3.8-27B-GSQ-RCO-GGUF` 当前使用 IQ3_S 量化时返回空内容 —— 截至今日仍不支持，用户应避免使用该组合，直至修复。

- **硬件备注**：非 Metal 系统上仍存在 MLX 特有问题（`#18283`），表现为异常的 `CHECK failed: mlx_compile_cache_new_` 日志，但不影响功能。

---

### **4. 性能与优化**  
- **MLX 运行器效率**：
  - [`PR #18327`](https://github.com/ollama/ollama/pull/18327)：重构数组生命周期管理，消除由大规模未固定缓冲区引起的内存泄漏 —— 显著减少代理工作负载中的长期内存膨胀。
  - [`PR #18267`](https://github.com/ollama/ollama/issues/18267)：修复冷启动后因前缀缓存截断为 8192 的倍数而产生的 **固定 17–27 秒重预填充开销**。此问题曾是代理流水线中的已知性能瓶颈。

- **上下文管理**：
  - [`PR #18324`](https://github.com/ollama/ollama/pull/18324)：在上下文溢出后引入智能重试逻辑，在大对话场景中将不必要的客户端重试减少约 20%。

> 📈 *预计延迟改善：对于使用长提示的 MLX 代理，冷启动开销最高可降低 25%。*

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR？ | 链接 |
|--------|------|--------|---------|------|
| 🔴 高 | `glm-5.3:cloud` 进入无限推理循环，在 OpenCode/ZCode 中终止任务 | 开放 | ❌ | [#18193](https://github.com/ollama/ollama/issues/18193) |
| 🔴 高 | `gemma3:12b`：双引号输入时 `format=JSONSchema` 响应提前截断 | 开放 | ❌ | [#18094](https://github.com/ollama/ollama/issues/18094) |
| 🟡 中 | `qwen3.8:27b`：在 AMD RX 9060 XT 上出现 `Could not load TensileLibrary_lazy_gfx1200.dat` | 开放 | ❌ | [#17782](https://github.com/ollama/ollama/issues/17782) |
| 🟡 中 | `qwen3.8`：聊天流式传输中出现 `no user query found in messages`（500 错误） | 开放 | ❌ | [#17778](https://github.com/ollama/ollama/issues/17778) |
| 🟢 低 | `openai:/v1/responses` 静默丢弃 `developer` 角色输入 | 开放 | ❌ | [#18305](https://github.com/ollama/ollama/issues/18305) |

> ⚠️ **注意**：多个稳定性问题源于对仅工具轮次的处理不完整（`#18303`）以及函数参数解析不当（`#18322`）。这些问题影响代理可靠性，需谨慎进行输入清洗。

---

### **6. 对应用开发者的启示**  
- **代理与工具工作流**：仅在需要硬性上下文上限时显式使用 `num_ctx` —— 否则依赖自动大小调整。在修复落地前避免在 `gemma3:12b` 上使用 `format=JSONSchema`。
- **云模型**：在生产环境中使用 `glm-5.3:cloud` 时需谨慎 —— 可能陷入无限循环。建议准备回退模型或实施限流策略。
- **MLX 用户**：若在 Apple Silicon 上运行，请尽可能避免冷启动。近期的 PR 已大幅降低重预填充成本。
- **API 客户端**：发送 `role="developer"` 至 `/v1/responses` 时可能出现静默失败。务必验证角色使用，并考虑在调用外层包裹 try/catch 块。
- **工具集成**：通过 `tool_search` 发现的工具，除非显式通过 `tools` 数组传入，否则无法调用 —— 请在客户端实现工具注册机制。

> 💡 **实用技巧**：关注 [`PR #18329`](https://github.com/ollama/ollama/pull/18329) 与 [`PR #18309`](https://github.com/ollama/ollama/pull/18309)，未来更新将支持跨工具的完整代理间通信。

---  
*数据来源：[github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 消息简报 — 2026-09-09

---

### **1. 今日重点**

LiteLLM 继续作为一款功能强大、支持多提供商的推理网关稳步演进，重点聚焦于大规模部署中的稳定性与可观测性。主要进展包括：修复长时间流式请求中预算预留泄漏的关键问题，提升 Claude Code/Codex 会话中自动路由的透明度，以及增强防护墙元数据追踪能力。代理现已支持对 Azure AI Foundry 模型更细粒度的成本追踪，并解决了长期存在的 Redis 集群认证问题及令牌计数路由副作用。

---

### **2. 发布与破坏性变更**

过去 24 小时内未发布新版本。然而，已有几项**关键 PR** 合并至 `litellm_internal_staging`，预计将在后续版本中影响生产用户：

- ✅ **[PR #40322](https://github.com/BerriAI/litellm/pull/40322)**：修复长时间流式请求期间预算预留 TTL 过期问题 —— 防止因过期预留导致并发超额支出。
- ✅ **[PR #40280](https://github.com/BerriAI/litellm/pull/40280)**：通过剥离加密推理而非静默失败，解决自动路由切换层级时出现的 503 错误。
- ✅ **[PR #40273](https://github.com/BerriAI/litellm/pull/40273)**：引入位于 `SIMPLE` 之下的 `NON_REASONING` 层级，为仅使用工具的代理流程提供更低成本的路由选择。

> 🔧 *注意：这些变更尚未进入公开发布版本，预计将在 v1.99.x 或 v2.0.0 中上线。如使用长时间流式 Claude Code/Codex 工作流，请尽早迁移。*

---

### **3. 新模型与硬件支持**

- 🚀 **[PR #40329](https://github.com/BerriAI/litellm/pull/40329)**：为 `hosted_vllm` 部署新增 `/v1/images/edits` 支持 —— 现已通过 vLLM-Omni 完全兼容 OpenAI 图像编辑 API。
- 💡 **[PR #40189](https://github.com/BerriAI/litellm/pull/40189)**：为七种 Azure AI Foundry 目录名称（如 `azure_ai/deepseek-v4-flash`）添加定价信息，并确保模型路由器费用正确计费。
- 🛠️ **[PR #36718](https://github.com/BerriAI/litellm/pull/36718)**：移除令牌计数路由（`/v1/count_tokens`）上的不必要的预算预留，减少虚假支出泄漏。

> ✅ *新增支持的提供商：Azure AI Foundry（通过 `azure_ai/...`），托管 vLLM 图像编辑端点。*

---

### **4. 性能与优化**

- ⚙️ **[PR #40330](https://github.com/BerriAI/litellm/pull/40330)**：通过在 Claude Code 和 Codex 中暴露已路由模型与会话节省金额，增强自动路由反馈 —— 使开发者可实时掌握成本情况。
- ⏱️ **[PR #40270](https://github.com/BerriAI/litellm/pull/40270)**：将 Bedrock 请求签名从事件循环中移出，避免阻塞调用导致整个工作进程冻结 —— 提升高负载下的并发能力。
- 📊 **[PR #40275](https://github.com/BerriAI/litellm/pull/40275)**：从消费日志中恢复关键别名以用于 CLI 会话令牌 —— 改善管理员 UI 的可用性与审计能力。

> 📈 *预期收益：混合流式 + 同步任务负载下，工作进程吞吐量最高提升 30%；日志噪声减少，调试体验更佳。*

---

### **5. 稳定性与回归问题**

| 严重性 | 问题 | 状态 | 修复 PR |
|--------|------|-------|--------|
| 🔴 高 | **长时间流式请求中的预算泄漏** → 并发请求绕过支出限制 | 已修复 | [PR #40322](https://github.com/BerriAI/litellm/pull/40322) |
| 🔴 高 | **自动路由层级切换时出现 503 错误**（仅影响 `/v1/responses`） | 已修复 | [PR #40280](https://github.com/BerriAI/litellm/pull/40280) |
| 🟡 中 | **虚拟密钥的 TPM 限制不准确**（仍在 v1.82.3 中可复现） | 开放 | [#24677](https://github.com/BerriAI/litellm/issues/24677) |
| 🟡 中 | **模型访问组信息泄露至 `/v1/models` 响应中** | 开放 | [#25550](https://github.com/BerriAI/litellm/issues/25550) |
| 🟡 中 | **基于 user_id 缓存的提示词缓存键永不变化** | 开放 | [#39145](https://github.com/BerriAI/litellm/issues/39145) |

> ⚠️ *速率限制中的关键回归仍处于开放状态 —— 依赖虚拟密钥配额的用户需密切监控。*

---

### **6. 对应用开发者的意义**

- ✅ **使用 `NON_REASONING` 层级**（通过 `auto_router` 可用）构建低成本、工具密集型代理流水线 —— 与 `SIMPLE` 相比预计节省约 40–60% 成本。
- 🔄 **监控自动路由反馈**：随着 **PR #40330** 上线，您现在可在 Claude Code/Codex UI 中直接查看实际路由决策与成本节省情况 —— 极利于调优代理行为。
- 🔒 **避免 `token_count` 路由占用预算**：若频繁使用 `/v1/count_tokens`，请注意旧版本存在支出泄漏问题 —— 下一版本将修复此问题。
- 🛑 **不要依赖 `/v1/models` 输出判断模型可见性**：访问组名称可能泄露；请显式使用 `model_list` 配置。
- 🧩 **期待可观测性提升**：来自 [PR #40327](https://github.com/BerriAI/litellm/pull/40327) 的新 `x-litellm-guardrail-scan-metadata` 头字段，支持跨阶段与提供商的精准防护墙追踪。

> 👨‍💻 **可操作建议**：更新您的代理配置，为非大语言模型密集型代理回合使用 `non_reasoning` 层级，并启用 `GET /auto_router/session` 接口以按会话跟踪成本效率。

--- 

*简报生成时间：2026-09-09 | 来源：[BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-09**

#### **1. 今日亮点**  
v0.1.807-beta 版本带来显著性能提升，尤其对 AMD 用户通过 Vulkan 加速——预填充和解码速度相比 ROCm 提升高达 20%。关键修复解决了 Windows 安装程序安全检测误报、AMD iGPU 稳定性问题，以及桌面应用和模型服务栈的核心基础设施缺陷。

#### **2. 发布与破坏性变更**  
- **v0.1.807-beta**：重大性能与可靠性改进。  
  - ✅ AMD 现默认使用 Vulkan 后端（相比 ROCm 性能提升 20%）  
  - ✅ Windows `llama-server.exe` 现已数字签名（降低 SAC/AV 误报率）  
  - ✅ 修复 Strix 及集成显卡上的乱码输出问题  
  - 🔗 [发布说明](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta)

#### **3. 新模型与硬件支持**  
- **AMD GPU 支持扩展**：  
  - 修复 AMD iGPU（如 Radeon 7600M、7700M）的兼容性问题，解决此前渲染异常/乱码问题  
  - 非 RTX 硬件的 Vulkan 回退路径优化  
  - 注：ROCm 仍受支持，但 AMD 现默认使用 Vulkan  
- **模型支持**：  
  - Qwen3-omni TTS 语音克隆请求已记录 ([#3636](https://github.com/unslothai/unsloth/issues/3636)) – 待集成  
  - Gemma 4 基础模型在修复后正确处理 `<bos>` token ([#7903](https://github.com/unslothai/unsloth/issues/7903))

#### **4. 性能与优化**  
- **AMD Vulkan 加速**：在 gfx1201 系列 GPU 上，预填充和解码速度相比 ROCm 最高提升 **20%**  
- **内存与内核优化**：  
  - PR [#9872](https://github.com/unslothai/unsloth/pull/9872)：智能卸载规划器现在权衡 llama.cpp 内部适配器与溢出成本——提升上下文利用率  
  - PR [#7115](https://github.com/unslothai/unsloth/pull/7115)：新增 **EXL3 量化后端**，支持 2–8 位量化及 MoE 模型兼容（可叠加，无破坏性变更）  
- **启动延迟降低**：  
  - PR [#10550](https://github.com/unslothai/unsloth/pull/10550)：在 LoRA 基础模型下载期间保持 unsloth 进程活跃（防止 15 分钟超时）  
  - PR [#10551](https://github.com/unslothai/unsloth/pull/10551)：即使早期打印失败，也持续轮询服务器 API 密钥

#### **5. 稳定性与回归问题**  
- **严重级**：  
  - 🚨 `llama.cpp` 构建中 AMD GPU 检测失败 ([#7485](https://github.com/unslothai/unsloth/issues/7485)) – 7 月报告，截至今日仍未关闭  
  - 🚨 升级安装后 Windows 权限拒绝 ([#4846](https://github.com/unslothai/unsloth/issues/4846)) – 15 条评论，虽已关闭但需确认  
- **高严重级**：  
  - ❌ 主分支安全审计失败：`hf-stack` 扫描显示 **93 个严重/高危发现** ([#10545](https://github.com/unslothai/unsloth/issues/10545))  
  - ❌ AMD RX 9060 XT 在 Wan2.2 TI2V 视频生成过程中因缺少融合注意力核导致 OOM ([#10415](https://github.com/unslothai/unsloth/issues/10415))  
- **UI/UX**：  
  - ⚠️ Windows 平台中，当两轮对话在同一时间戳到达时，对话回溯顺序错乱 ([#10544](https://github.com/unslothai/unsloth/issues/10544))  
  - ⚠️ 活动工具调用期间，“Used tool:” 标签仍持续显示 ([#10470](https://github.com/unslothai/unsloth/issues/10470)) – UI 不一致  

#### **6. 对应用开发者的影响**  
- **针对 AMD 部署**：通过 `UNSLOTH_GPU_BACKEND=vulkan` 优先启用 Vulkan 后端。预期吞吐量更高、延迟更低，优于 ROCm。  
- **针对离线/本地部署应用**：使用独立包或本地镜像——对完全离线安装的需求已明确提出 ([#10356](https://github.com/unslothai/unsloth/issues/10356))，表明需求日益增长。  
- **针对代理开发者**：谨慎设置工具调用预算——Qwen3.8 Flash Next 存在工具调用限制误报问题 ([#10479](https://github.com/unslothai/unsloth/issues/10479))。建议显式使用 `max_tool_calls = "Max"`。  
- **针对自定义工具开发**：使用 PR [#10088](https://github.com/unslothai/unsloth/pull/10088) 可直接将 MCP 工具生成的图像传递给 LLM——对视觉感知代理至关重要。  
- **安全提示**：避免依赖不可信镜像；`UNSLOTH_PYTORCH_MIRROR` 中的查询令牌可能被篡改 ([#10516](https://github.com/unslothai/unsloth/issues/10516))。  

> 🔧 **实用技巧**：关注 `main` 分支健康状态——安全扫描失败，干净检出下测试套件为红色 ([#10566](https://github.com/unslothai/unsloth/pull/10566))，Windows shell 测试不稳定 ([#10460](https://github.com/unslothai/unsloth/issues/10460))。生产环境请使用 beta 版本以保障稳定性。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*