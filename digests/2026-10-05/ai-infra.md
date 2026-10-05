# AI 基础设施日报 2026-10-05

> 生成时间: 2026-10-05 01:14 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI推理基础设施生态报告 – 2026-10-05**

---

### **1. 生态概览**  
2026年第四季度，AI推理基础设施格局呈现出明显的两极分化：一端是**高性能、底层的推理引擎**（vLLM、SGLang、llama.cpp），另一端则是**开发者友好、原生支持智能体的平台**（Ollama、LiteLLM、Unsloth）。尽管vLLM和SGLang在混合/分布式推理优化方面领先，尤其在MoE、GDN和MTP工作流中表现突出，但Ollama与LiteLLM正通过简化开发体验、提升模型可移植性以及代理层抽象加速普及。推测解码、分层缓存与多模态支持的融合，标志着该生态已趋于成熟，具备规模化真实部署的能力。

---

### **2. 活跃度对比**

| 项目       | 开放问题数（↑） | 合并的PR数（↑） | 发布状态       |
|------------|------------------|------------------|----------------|
| **vLLM**   | 87 (+3)          | 19 (+5)          | 稳定版：`v0.28.0`      |
| **SGLang** | 112 (+6)         | 23 (+8)          | 无发布；候选版本待定 |
| **llama.cpp** | 124 (+4)        | 17 (+6)          | `b11401`（补丁版）       |
| **Ollama** | 98 (+2)          | 14 (+3)          | 无新版本发布         |
| **LiteLLM** | 67 (+1)         | 11 (+4)          | `v1.105.0-rc.1`        |
| **Unsloth** | 69 (+5)         | 12 (+4)          | 无发布               |

> 🔍 *趋势*：SGLang与llama.cpp在问题数量和PR活跃度上均表现最强，反映出对核心稳定性与性能瓶颈的积极投入。vLLM保持稳定，聚焦于优化工作；而Ollama与LiteLLM则更侧重功能交付而非破坏性变更。

---

### **3. 模型支持竞赛**

| 新模型 / 架构              | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen4Exp (FP8 QSA)**     | ✅   | —      | —         | —      | —       | —       |
| **GDN + Qwen3.8-Flash-Next** | ✅ | —      | —         | —      | —       | —       |
| **NIXL KV 连接器**         | ✅   | —      | —         | —      | —       | —       |
| **Mooncake Store (异构TP)** | ✅   | —      | —         | —      | —       | —       |
| **Clef (多模态)**          | —    | —      | ✅ (实验)  | —      | —       | ✅ (PR) |
| **SeaweedFS L3 缓存**      | —    | ✅     | —         | —      | —       | —       |
| **K2 Horizon (MoE)**       | —    | —      | —         | 🟡 (需求) | —       | —       |
| **Qwen3-TTS 快速微调**     | —    | —      | —         | —      | —       | ✅ (PR) |
| **ROCm FLUX.1 & Qwen-Image-2.1** | — | —      | —         | —      | —       | ✅ (PR) |
| **Intel SYCL (Arc B70)**   | —    | —      | —         | ✅     | —       | —       |

> 🏆 **排行榜**：  
> - **vLLM** 在 **先进推理架构**（GDN、MTP、CC8.9以下的FP8）方面领先。  
> - **SGLang** 在 **分布式存储与原生智能体工具链**（HiCache、SeaweedFS、DCP）方面占据主导。  
> - **Unsloth** 在 **多模态图像生成**（FLUX.1、Qwen-Image-2.1）与 **微调流水线** 方面处于前沿。  
> - **Ollama** 凭借 **硬件特定后端**（SYCL）及不断增长的开源模型需求稳步提升。

---

### **4. 性能前沿**

| 关注领域                  | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存管理**             | ✅🔥（MTP、前缀缓存、休眠唤醒） | ✅（HiCache、写入穿透死锁） | ⚠️（MoE卸载、步进操作） | — | — | — |
| **批处理与并行**           | ✅（投影融合、GEMM） | ✅（DCP、Cake内核、SP all-gather） | ✅（混合嵌入+原始批处理） | ✅（qwen35并行请求） | — | ⚠️（张量拆分回归） |
| **量化**                   | ✅（低于CC8.9的FP8 QSA） | ✅（FP8 分组MoE） | ✅（PTQ1_0, 1.75 b/w） | — | — | — |
| **分布式服务**             | ✅（解耦式、NIXL、Mooncake） | ✅（HiCache、SeaweedFS） | — | — | — | — |
| **内核优化**               | ✅（QKVG融合、SM103/100） | ✅（Cake路由、矩阵乘融合） | ✅（TinyBLAS、FlashAttention） | — | — | ✅（融合RoPE、CUDA图） |

> 💡 **前沿总结**：  
> - **vLLM** 聚焦于复杂混合环境下的**低延迟、高吞吐内核融合与缓存一致性**。  
> - **SGLang** 推动**分布式可扩展性**，通过分层缓存与解码上下文并行实现突破。  
> - **Unsloth** 在**专用GPU内核调优**方面表现卓越，尤其在AMD ROCm/Vulkan上用于生成模型。  
> - **llama.cpp** 维持强大的**CPU与跨后端效率**，其创新量化与内存管理能力尤为突出。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 核心差异化优势 |
|------------|------------------------------------|--------------------|
| **vLLM**   | **推理引擎**               | MoE/GDN/MTP场景下行业领先的吞吐量；专为大规模云部署优化 |
| **SGLang** | **高性能推理栈**           | 原生智能体设计，集成DCP、HiCache与TRTLLM；适合长周期智能体系统 |
| **llama.cpp** | **本地运行时 / 嵌入式引擎** | 支持跨平台CPU/GPU；边缘与离线推理领域的佼佼者 |
| **Ollama** | **模型网关 / 开发者平台**   | 简化命令行、自动拉取模型、企业级代理支持；显著降低入门门槛 |
| **LiteLLM** | **API网关 / 可观测性层**   | 统一API接口、成本追踪、安全（Cosign）、向量库集成 |
| **Unsloth** | **微调与专用推理**         | 加速训练、多模态图像生成、针对GPU的优化 |

> 📌 **战略启示**：开发者应根据部署场景选择合适方案：
> - **云规模推理**：vLLM 或 SGLang
> - **边缘/离线推理**：llama.cpp
> - **智能体系统**：SGLang + LiteLLM
> - **开发者优先流程**：Ollama
> - **快速微调**：Unsloth

---

### **6. 趋势信号**

#### **从当前活动看新兴产业趋势：**
1. **混合与解耦推理日趋成熟**  
   vLLM的NIXL与Mooncake集成，以及SGLang的HiCache结合SeaweedFS，预示着向**异构、可扩展推理池**的转变——这对降低大规模大模型服务成本至关重要。

2. **推测解码仍具风险**  
   多个严重崩溃事件与vLLM、SGLang中的MTP/推测解码相关，表明**该技术在混合模式工作负载（如GDN+前缀缓存）下依然脆弱**。生产环境应暂缓使用，待修复后方可启用。

3. **多模态已成为核心能力**  
   Unsloth对FLUX.1/ROCm的改进、SGLang对NemotronH_VL的LoRA支持、llama.cpp对Clef的实验性支持，说明**视觉-语言模型已非小众**，预计2027年初将实现全栈成熟。

4. **安全与可信不容妥协**  
   LiteLLM的Cosign签名镜像、Ollama的代理重试限制，反映出对**供应链完整性与韧性**的关注日益增强——在受监管环境中尤为关键。

5. **硬件多样性驱动创新**  
   Intel SYCL（Ollama）、ROCm/Vulkan（Unsloth）、SeaweedFS（SGLang）表明**非NVIDIA硬件正在获得关注**，迫使框架采用模块化、后端无关的设计。

---

### **给应用开发者的建议**  
- **在修复vLLM #53670与#59642之前，避免在混合GDN/Qwen3.8-Flash-Next模型上使用推测解码。**  
- **在vLLM中启用 `--enable-sleep-mode --enable-nccl-comm-suspend` 以节省空闲内存——近期合并的PR已使其安全可用。**  
- **运行混合MoE/混合模型时，建议锁定稳定版本（如v0.28.0、Ollama `b11401`）。**  
- **生产环境部署时，利用LiteLLM的签名镜像与可观测性功能，确保安全可审计。**  
- **持续监控Unsloth的 `b10687-mix-*` 构建版本，直至 #12468 修复完成。**

> ✅ **结论**：基础设施层演进迅速——但稳定性仍落后于创新速度。请优先选择**已验证的发布版**、进行**全面测试**，并在架构中建立**分层容错机制**。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-05

---

### **1. 今日亮点**  
vLLM 项目持续深化对混合与解耦推理的支持，针对 MTP（多标记预测）和前缀缓存工作流中的关键问题修复了 KV 缓存管理——尤其在 Qwen3.8-Flash-Next 与 GDN 模型上表现突出。主要进展包括：在计算能力低于 CC 8.9 的设备上启用 FP8 QSA KV 缓存读取，解决基于 NIXL 的卸载系统中睡眠/唤醒的正确性问题，并修复因最后块丢失导致的推测解码性能下降。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
无新版本发布或破坏性 API/配置变更。最新稳定版本仍为 `v0.28.0`，当前工作重点在于稳定性与优化，而非版本更新。

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen4Exp (FP8 QSA)**：通过 PR [#59943](https://github.com/vllm-project/vllm/pull/59943) 实现了在计算能力低于 8.9 的设备上读取 FP8 QSA KV 缓存，扩展了对 RTX 6000 Ada/B300 等旧架构的支持。  
- ✅ **NIXL KV 连接器**：通过 PRs [#59635](https://github.com/vllm-project/vllm/pull/59635) 与 [#59624](https://github.com/vllm-project/vllm/pull/59624) 增强睡眠模式支持，确保在解耦部署中引擎挂起期间状态可靠保留。  
- ✅ **Mooncake Store**：通过 PR [#54307](https://github.com/vllm-project/vllm/pull/54307) 推进异构 TP 共享在混合 KV 缓存中的实现，提升跨多样化硬件池的可扩展性。

---

### **4. 性能与优化**  
- 🔥 **推测解码吞吐量损失**：问题 [#53670](https://github.com/vllm-project/vllm/issues/53670) 报告，在使用 EAGLE/MTP 与 Qwen3.8-Flash-Next 时，由于前缀缓存中最后块丢失引发不必要的重计算，前缀复用工作负载的批处理吞吐量下降高达 **30–40%**。  
- 🚀 **投影融合**：PR [#59533](https://github.com/vllm-project/vllm/pull/59533) 将 Qwen4Exp 的 QKVG 与索引器 Q/K 投影合并为单个 GEMM，减少内核开销，提升在 SM103（GB300）与 SM100（B200）上的利用率。  
- 💾 **内存效率**：PRs [#59994](https://github.com/vllm-project/vllm/pull/59994) 与 [#59360](https://github.com/vllm-project/vllm/pull/59360) 通过在 NCCL 挂起模式下卸载模型运行器缓冲区并释放 FlashInfer allreduce 工作空间，优化了睡眠/唤醒周期中的内存保留。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 🔴 高 | [#54173](https://github.com/vllm-project/vllm/issues/54173) | 在 GB10（sm_121）上使用前缀缓存时，GDN 路径出现 `CUBLAS_STATUS_INTERNAL_ERROR` / 非法内存访问 | ❌ 尚无修复；在 `--no-async-scheduling` 下触发 |
| 🔴 高 | [#59642](https://github.com/vllm-project/vllm/issues/59642) | Qwen3.8-flash-next 在解耦 PD 服务中 MTP 接受率为 0% | ❌ 尚无修复；可能与连接器状态处理有关 |
| 🟡 中 | [#53912](https://github.com/vllm-project/vllm/issues/53912) | v0.28.0 中前缀缓存 + MTP 导致混合 Mamba/GDN 模型输出损坏 | ⚠️ 已关闭但未修复；仍在调查中 |
| 🟡 中 | [#37035](https://github.com/vllm-project/vllm/issues/37035) | 在负载下推测解码过程中 `gdn_attn.py` 出现 `cudaErrorIllegalAddress` | ❌ 尚无修复；可通过 `num_speculative_tokens=5` 复现 |

> 注：多个高严重性崩溃与近期 MTP 和 GDN 集成工作相关——尤其是围绕 GPU 内存布局与异步调度的问题。

---

### **6. 对应用开发者的影响**  
- **在 [#53670](https://github.com/vllm-project/vllm/issues/53670) 修复前，请避免在混合 GDN/Qwen3.8-Flash-Next 模型上使用推测解码**——否则将面临显著吞吐量下降。  
- **在分布式部署中使用 `--enable-sleep-mode --enable-nccl-comm-suspend`** 可在空闲期降低内存占用；得益于 PRs [#59994](https://github.com/vllm-project/vllm/pull/59994) 与 [#59360](https://github.com/vllm-project/vllm/pull/59360)，该机制现已更安全。  
- **在结合前缀缓存与 MTP 时，需谨慎监控行为**——尤其在 Qwen3.8-Flash-Next 与 Mamba 混合等非标准模型上。  
- **除非显式通过 PR [#59943](https://github.com/vllm-project/vllm/pull/59943) 打补丁，否则预 CC8.9 GPU 上对 FP8 的支持有限**——请相应验证您的部署栈。  
- **不要仅依赖 `/health` 端点进行 GPU 健康检查**——建议添加自定义探测以捕获 CUDA 错误（参见 #36960）。

👉 *建议：若运行 MoE/混合模型的混合模式推理，建议锁定至 `v0.28.0` 或更早版本，直至稳定性改进上线。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-05

---

### **1. 今日亮点**  
SGLang 项目持续推进高性能推理栈的演进，修复了关键的 CUDA 核心转储问题（#26340），并持续推进解码上下文并行（DCP）与 Helix 并行化（#29736）的工作。同时，HiCache 新增对 SeaweedFS 作为 L3 存储后端的支持（#42399）。近期大量 PR 集中在推测解码、内核优化以及多模态模型集成，显示出向原生代理部署就绪状态强劲推进的势头。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。无新版本发布，也未发布新的 API/配置破坏性变更。

---

### **3. 新模型与硬件支持**  
- **SeaweedFS L3 存储后端**：通过 #42399 添加，支持在使用现有 SeaweedFS S3 网关的 HiCache 部署中跨节点共享 KV 缓存。  
  [PR #42399](https://github.com/sgl-project/sglang/pull/42399)  
- **Moore Threads (MUSA) GPU 支持**：在 #16565 中已启动路线图跟踪；计划实现第一类支持，但尚未完成。  
  [Issue #16565](https://github.com/sgl-project/sglang/issues/16565)  
- **NemotronH_Nano_VL_V2 LoRA 支持**：正在 #39798 中推进，以支持该多模态视觉语言模型家族的 LoRA 微调。  
  [PR #39798](https://github.com/sgl-project/sglang/pull/39798)  
- **AWS EFA 运行时支持**：新增 `runtime-efa` 构建目标，包含 EFA 用户态库和 `mooncake-transfer-engine-efa`，显著提升在 AWS GPU 集群上的开箱即用体验。  
  [PR #41006](https://github.com/sgl-project/sglang/pull/41006)

---

### **4. 性能与优化**  
- **HiCache 基于文件的 PLE 表**：冷行并发主机读取将冷预填充 TTFT 降低 **6.8 倍（在 GB10 上）**（追踪于 #42392）。  
  [Issue #42392](https://github.com/sgl-project/sglang/issues/42392)  
- **Cake 内核 – SP All-Gather Matmul**：通过可选路径启用（`SGLANG_CAKE_ROUTES=sp_all_gather_matmul`），支持序列并行执行，面向容量受限的启动器。  
  [PR #42532](https://github.com/sgl-project/sglang/pull/42532)  
- **Qwen3.5 GDN + FP8 Grouped MoE**：可选的 Cake 路由现已端到端连接 FlashInfer 内核，用于性能敏感路径。  
  [PR #42406](https://github.com/sgl-project/sglang/pull/42406)  
- **DeepSeek-V4 Pro 加载时间优化**：预取机制在限制张量拷贝工作线程时，将加载时间从 **95 分钟降至 3.3 分钟**。  
  [Issue #42361](https://github.com/sgl-project/sglang/issues/42361)  
- **推测解码增强**：启用块验证（可选）可支持更长的接受草稿前缀，加速推测解码（依据 [arXiv:2403.10444](https://arxiv.org/abs/2403.10444) 算法 2）。  
  [PR #42297](https://github.com/sgl-project/sglang/pull/42297)

---

### **5. 稳定性与回归问题**  
- **CUDA 核心转储追踪 (#26340)**：CI 自动收集的核心转储表明，在高负载下存在重复崩溃；目前已有 **323 条评论**，显示影响范围广泛。  
  [Issue #26340](https://github.com/sgl-project/sglang/issues/26340)  
- **TRTLLM_MHA 在 H200 (SM90) 上异常**：对 `gpt-oss-120b` 配置接受但返回错误结果，尽管速度正确。  
  [Issue #40921](https://github.com/sgl-project/sglang/issues/40921)  
- **HiCache Write_Through 死锁**：在深度优先-V4 模型 + `--hicache-write-policy write_through` 下，多个并发长预填充会导致 TP rank 死锁。  
  [Issue #42465](https://github.com/sgl-project/sglang/issues/42465)  
- **Qwen3 流式输出无限循环**：跨块标签截断导致 `<thinking>` 标签被拆分至不同块，引发无限思考循环。  
  [Issue #31118](https://github.com/sgl-project/sglang/issues/31118)  
- **确定性采样崩溃**：因内部断言失败，拒绝带有 seed 的 `min_p` 请求。  
  [Issue #33695](https://github.com/sgl-project/sglang/issues/33695)  

> 🔴 **严重**：多个问题影响核心推理稳定性（尤其是 DCP、HiCache 与 TRTLLM_MHA），且暂无直接修复的 PR 关联。

---

### **6. 对应用开发者的影响**  
开发者应**谨慎使用推测解码与 HiCache 配置**，直至 #42465 和 #42392 修复。仅在可容忍潜在死锁的情况下才使用 `--enable-hierarchical-cache --hicache-write-policy write_through`。对于需要确定性输出的代理，避免在未修复 #33695 前将 `min_p` 与采样种子结合使用。SeaweedFS 与 EFA 支持的加入，为可扩展的分布式部署打开了可能——非常适合大规模代理系统。预计在启用可选 Cake 内核与块验证后，Qwen3.5 与 DeepSeek-V4 的模型加载速度更快、吞吐更高。请通过 #17050 和 #21065（当前处于维护模式）监控 CI 健康状况，以确保构建稳定。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 摘要 – 2026-10-05**

---

### **1. 今日亮点**  
最新更新聚焦于 CUDA 与 Vulkan 后端的关键稳定性修复，尤其针对 MoE 模型和长上下文推理。关键改进包括修复 `n_expert >> n_ubatch` 时 MMQ（MoE）中的内存错误，以及解决因先前优化导致 Intel Arc GPU 上的预填充回归问题。此外，新增对混合嵌入 + 原始标记批处理的支持，使 PaliGemma 等高级用例成为可能。

---

### **2. 发布与破坏性变更**  
- **`b11401`**：修复路由器模式日志中的颜色处理问题，防止终端污染；子命令日志现在自带颜色 (#29895)。  
- **`b11400`**：通过 `llama_batch_ext` 实验性支持在同一批中混合使用 `embd`（嵌入标记）和原始文本标记——对 PaliGemma 等非因果模型至关重要 (#29622)。  
- **`b11398`**：在 x86 CPU 的 tinyBLAS 中启用向量化 BF16/FP16/FP32 K 尾部处理，提升 CPU 推理吞吐量。  
- **迁移提示**：`llama_batch_ext` API 变更要求更新同时传递嵌入与原始标记的代码——请确保您的应用正确处理 `mixed_batch = true` 路径。

> 🔗 [GitHub 发布 b11401](https://github.com/ggml-org/llama.cpp/releases/tag/b11401) | [PR #29622](https://github.com/ggml-org/llama.cpp/pull/29622)

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 视觉模型现已支持服务器模式下的 `/slots/3?action=save`（尽管问题 #19466 指出视觉模型仍存在保存失败问题）。  
  - 通过 PR #29969 实验性支持 `Clef` 多模态输入（同一批次内包含视觉与文本）。  
- **硬件与后端**：  
  - **CUDA**：全面支持所有张量布局下的一元操作（F16/F32/BF16）任意步长（#29781）。  
  - **Vulkan**：扩展 FWHT 内核至最大块宽 8192（#29772）；提升 RDNA4 与 Intel Arc GPU 上的 MoE 性能。  
  - **SYCL**：修复 `mul_mat` 中的内存错误及主机内存池管理问题（#29889）。  
- **量化**：新增 PTQ1_0 量化方案，组大小为 128（每权重 1.75 位），支持无损三值量化（#29672）。

> 🔗 [PR #29969 (Clef)](https://github.com/ggml-org/llama.cpp/pull/29969) | [PR #29781 (步长操作)](https://github.com/ggml-org/llama.cpp/pull/29781) | [PR #29672 (PTQ1_0)](https://github.com/ggml-org/llama.cpp/pull/29672)

---

### **4. 性能与优化**  
- **CUDA FlashAttention**：通过优先选择完整块调度而非 Stream-K 来提升预填充效率，降低内核启动开销（#29435）。  
- **Intel Arc 预加载修复**：修复因早期 MoE 敏感的块选择更改导致的 Arc B70 上约 12% 的预填充性能下降（#29936）。  
- **内存效率**：将 BF16/FP16 → FP32 转换分块处理，每块可减少高达 512MB 的峰值 VRAM 使用（#29442）。  
- **MoE 卸载优化**：PR #29887 引入了驻留在主机内存中的 MoE 专家的 GPU 缓存机制，减少小批量（<32 标记）场景下的主机-设备传输。

> 🔗 [PR #29936 (Intel Arc 性能)](https://github.com/ggml-org/llama.cpp/pull/29936) | [PR #29435 (FlashAttention)](https://github.com/ggml-org/llama.cpp/pull/29435) | [PR #29887 (MoE 缓存)](https://github.com/ggml-org/llama.cpp/pull/29887)

---

### **5. 稳定性与回归问题**  
- **严重级别**：  
  - **CUDA MMQ 内存错误** (`b11390`) —— 当 `n_expert >> n_ubatch` 时因缓冲区索引错误导致崩溃。已在 #29941 中修复。  
  - **Vulkan MoE 预加载回归** 在 Intel Arc Pro B70：自 #29182 后预填充速度下降约 12%。已在 #29936 中修复。  
- **高严重级别**：  
  - **AMD gfx1151（Strix Halo APU）GPU 内存损坏**：ROCm 后端产生损坏输出，而 Vulkan 不受影响（#27579）。  
  - **路由器调度器在并发冷启动且 `--models-max 1` 时存在竞态条件**（#28774）。  
- **中等严重级别**：  
  - **聊天解析器中使用后释放**：当 `pending_tool_call` 在解析中途重置时发生（#29942）。  
  - **路由器模式下日志行空白**：由于颜色重置处理不当所致（#29878）。  

> 🔗 [问题 #29941 (MMQ 崩溃)](https://github.com/ggml-org/llama.cpp/issues/29941) | [问题 #27579 (ROCm 损坏)](https://github.com/ggml-org/llama.cpp/issues/27579) | [PR #29936 (修复)](https://github.com/ggml-org/llama.cpp/pull/29936)

---

### **6. 对应用开发者的意义**  
- **Arm64 Windows 上的 CUDA 构建仍不可用**（#25030），因此在 Windows ARM64 上进行跨平台部署需采用变通方案或自行构建。  
- **使用视觉模型的多模态代理应避免使用 `slot-save`**，直到 #19466 解决为止，因为视觉模型的 KV 缓存保存功能失效。  
- **谨慎启用 `--spec-type draft-mtp`** —— 在 `-np N` 且多 ubatch 场景下，可能因异步 `t_h_nextn` 竞态而无声失败（#27572）。  
- **利用混合标记批处理**（`embd + raw`）以支持 PaliGemma 等非因果架构模型，通过 `llama_batch_ext` 实现。  
- **对于高吞吐量 MoE 部署**，建议采用新的 GPU 缓存专家卸载路径（#29887），以降低小批量场景下的延迟。

> 📌 技巧提示：使用 `--log-level debug` + 路由器模式日志修复来调试复杂的多子进程服务器架构。注意监控 CUDA 日志中的 `illegal memory access` 错误——尤其是使用 MoE 模型时。

---  
*数据来源：[ggml-org/llama.cpp GitHub](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-05**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展对新兴模型和硬件的支持，重点推进了 Intel SYCL 后端集成，并增强了企业环境下的代理处理能力。针对 Qwen3.8 流式传输和 `clef-flash` 决策模型失败问题的关键稳定性修复已合并，同时新功能请求反映出对 K2 Horizon 及基于 MLX 的模型工作流日益增长的需求。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
然而，通过 [PR #18790](https://github.com/ollama/ollama/pull/18790) 合并了一项关键修复：预发布（RC）版本现在可拉取匹配 `min_version` 的模型，从而更顺畅地测试即将推出的功能。此变更改善了涉及预览构建的 CI/CD 流水线中的开发者工作流程。

---

### **3. 新模型与硬件支持**  
- ✅ **Intel SYCL (oneAPI)**：通过 [PR #18333](https://github.com/ollama/ollama/pull/18333)，已在 Linux 系统上原生支持 Intel 离散 GPU（如 Arc B70 32GB），包含设备发现及可选编译流水线。  
- 🟡 **K2 Horizon 模型**：一项功能请求 ([#18698](https://github.com/ollama/ollama/issues/18698)) 呼吁支持 MBZUAI 新发布的 Apache 许可的 K2-Horizon 系列（0.9B–36B MoE），表明来自领先研究机构的开源大模型兴趣正在上升。  
- 🔧 **MLX 引擎扩展**：PRs [#18780](https://github.com/ollama/ollama/pull/18780) 与 [#15530](https://github.com/ollama/ollama/pull/15530) 致力于扩展 MLX 对 Kolibri 1 的兼容性，并实现可重复的模型迁移工作流，目标是提升 macOS 原生性能表现。

---

### **4. 性能与优化**  
- ⚙️ **并行请求启用**：[PR #17144](https://github.com/ollama/ollama/pull/17144) 解除了对 `qwen35` 与 `qwen35moe` 的并行请求硬性限制，自 2026 年 3 月上游 llama.cpp 崩溃修复后已安全可用。此举显著提升多用户推理负载的吞吐量。  
- 📉 **嵌入效率优化**：[PR #18610](https://github.com/ollama/ollama/pull/18610) 移除了 OpenAI 兼容嵌入中的冗余 JSON 往返序列化，降低批处理过程中的内存压力与延迟——对 RAG 应用至关重要。  
- 🔄 **代理与重试限制**：多个 PR ([#18452](https://github.com/ollama/ollama/pull/18452), [#18437](https://github.com/ollama/ollama/pull/18437)) 强制实施重试上限，并限制 URL 解析尝试次数，防止网络不稳定期间出现死锁——提升了防火墙后部署的可靠性。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|--------|----------|
| 🔴 高 | [#17778](https://github.com/ollama/ollama/issues/17778) | `qwen3.8`：在工具调用循环中流式传输失败，提示“未找到用户查询”（500 错误） | *进行中；暂无修复 PR* |
| 🔴 高 | [#18769](https://github.com/ollama/ollama/issues/18769) | `clef-flash`（Q8_0）在 `/v1/systemone` 上报错“非有限 logit”（CUDA）或“无法打开模型”（CPU）——首次前向传播即失败 | *进行中；暂无修复 PR* |
| 🟡 中 | [#18785](https://github.com/ollama/ollama/issues/18785) | `lfm2:24b`：`"python"` token 无空格时解码为空字符串，静默丢失文本 | *今日报告；暂无修复 PR* |
| 🟡 中 | [#18775](https://github.com/ollama/ollama/issues/18775) | `/api/generate` 在 `Content-Type: application/json` 下仍接受无效的非 JSON 尾随数据 | *安全风险；暂无修复 PR* |
| 🟢 低 | [#18784](https://github.com/ollama/ollama/issues/18784) | 决策模型缺少 CLI 模式 | 仅功能请求 |

> **备注**：多项回归影响核心推理路径（`systemone`、流式传输），正积极调查中。`clef-flash` 问题可能指向量化或内核对齐异常。

---

### **6. 对应用开发者的启示**  
- **在 #17778 修复前避免使用 `qwen3.8` 流式传输**，尤其在代理/工具循环场景下。可临时改用 `qwen3.5` 或回退至 `chat/completions` 端点。  
- **若在 Linux 上使用 Intel Arc GPU，建议启用 Intel SYCL 后端**——可实现高带宽、低延迟的推理，充分发挥 GPU 利用率。  
- **更新客户端逻辑以处理边缘情况**，例如 `/api/generate` 中的尾随非 JSON 数据（参考 [#18775](https://github.com/ollama/ollama/issues/18775)）——需严格验证请求体。  
- **为即将到来的 MLX 优化做好准备**：随着 Kolibri 1 和混合精度加载工作推进（[#18789](https://github.com/ollama/ollama/issues/18789)），Apple Silicon 上的性能将得到提升——但需留意自定义量化模型中的形状不匹配问题。  
- **在企业防火墙后部署 Ollama 时，通过环境变量配置代理设置**（[#18730](https://github.com/ollama/ollama/pull/18730), [#18731](https://github.com/ollama/ollama/pull/18731)）——现已正式支持。

> 👉 *实用技巧*：关注 PR #18786（Qwen3.8 渲染器自动检测）与 #18790（RC 版本支持），以立即升级工具链与测试流程。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **1. 今日亮点**  
LiteLLM v1.105.0-rc.1 引入了通过 Cosign 签名的 Docker 镜像，显著增强安全性，强化生产环境部署的信任保障。关键改进包括：修复成本追踪准确性问题（如 `audio_speech` 输入成本处理）、新增向量存储 API 路由支持，以及对 Claude 和 Vertex AI 等模型流式响应的鲁棒性提升。本版本还通过 ECS 日志和实时 Lens 调用链监控，进一步提升可观测性。

---

### **2. 版本发布与破坏性变更**  
- **v1.105.0-rc.1**：1.105 系列首个候选版本，引入 **Cosign 签名的 Docker 镜像** — 所有发布版本均可通过 [提交 `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 提供的密钥进行密码学验证。  
- **安全提示**：请确保在部署前验证 CI/CD 流水线中的镜像签名。本版本未报告任何配置破坏性变更。

---

### **3. 新增模型与硬件支持**  
- **向量存储 API 路由新增**：  
  - 现已支持 `/vector_store_files`、`/vector_store_files/{id}` 及 `/vector_stores/{id}` 接口，基于 [Issue #15861](https://github.com/BerriAI/litellm/issues/15861)（PR 待合并），实现 LiteLLM 代理中向量存储文件的全生命周期管理。
- **Vertex AI Agent Engine 流式响应修复**：  
  - 通过 PR [#44530](https://github.com/BerriAI/litellm/pull/44530) 修复静默丢弃图像/音频/文件内容片段的问题（[Issue #44336](https://github.com/BerriAI/litellm/issues/44336)），恢复多模态数据保真度。
- **OpenRouter 定价同步**：  
  - 通过 [PR #44533](https://github.com/BerriAI/litellm/pull/44533) 更新 `openrouter/deepseek/deepseek-v4-flash` 等模型的定价，与 OpenRouter 官方 API 保持一致。

---

### **4. 性能与优化**  
- **流式传输效率**：  
  - 修复 Vertex AI 响应中跨流块的 JSON 数组解析问题（[PR #31879](https://github.com/BerriAI/litellm/pull/31879)），消除部分负载下的 `json.JSONDecodeError`。
  - 改进音频输入（`input_audio`）的令牌计数逻辑，避免抛出错误（[PR #40188](https://github.com/BerriAI/litellm/pull/40188)），实现可靠的费用估算。
- **限流机制鲁棒性**：  
  - Redis Lua 脚本被代理（如 Codis、Twemproxy）阻塞时，不再静默降级为单 Pod 限流（[PR #32232](https://github.com/BerriAI/litellm/pull/32232)）。
- **支出追踪优化**：  
  - 为认证注册表加载添加超时机制（[PR #44530](https://github.com/BerriAI/litellm/pull/44530)），防止缓存未命中导致请求阻塞。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|---------|------|--------|------------|
| 🔴 高 | `vertex_ai/agent_engine` 静默丢弃非文本内容 ([#44336](https://github.com/BerriAI/litellm/issues/44336)) | 代理输出错误；存在幻觉风险 | ✅ 已通过 PR [#44530](https://github.com/BerriAI/litellm/pull/44530) 修复 |
| 🔴 高 | `audio_speech` 部署级 `input_cost_per_character` 被忽略 ([#44200](https://github.com/BerriAI/litellm/issues/44200)) | 实际使用却显示零支出 | ✅ 修复中（PR #44530） |
| 🟡 中 | v1.82.3 中 WebRTC 成本追踪失效 ([#25738](https://github.com/BerriAI/litellm/issues/25738)) | Azure gpt-realtime 计费不准确 | ❌ 已关闭但未解决；可能需回退 |
| 🟡 中 | MCP 工具列表上限为 100 且无分页 ([#32229](https://github.com/BerriAI/litellm/issues/32229)) | 大规模工具集发现失败 | ⏳ 功能请求；暂无修复 |

---

### **6. 对应用开发者的意义**  
- **采用签名镜像**：在生产环境中强制验证 Cosign 签名以保障镜像完整性，对合规性及供应链安全至关重要。  
- **多模态应用**：使用更新后的 Vertex AI 与 Claude 集成，可可靠地通过代理传递图像/音频数据，避免静默丢失。  
- **成本准确性**：确保 `input_cost_per_character` 在 TTS 工作负载（如 `audio_speech`）中生效，防止欠费。  
- **可扩展认证**：若使用位于脚本阻塞代理后端的 Redis，建议升级以避免因降级至本地内存导致限流失败。  
- **未来就绪**：关注 `v1.105.0-rc.1` 的早期采用 —— 预计将很快发布稳定版，带来更优的稳定性、安全性和遥测能力。  

> 💡 **实用提示**：启用 `LITELLM_ECS_LOGS=1` 可无缝集成 Elastic Stack 或 Datadog ECS 模式（[PR #29689](https://github.com/BerriAI/litellm/pull/29689)）。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-10-05**

---

### **1. 今日亮点**  
在 `b10715-mix-*` 及后续版本中报告了严重的性能下降，双 GPU 的张量拆分推理速度降至约 48 tokens/sec（此前版本为 115–130 t/s），可能源于 CUDA graph 处理方式的变更。与此同时，针对 ROCm 和 Vulkan 平台的 FLUX.1 与 Qwen-Image-2.1 新增优化，旨在提升图像生成速度并修复输出中出现的细线等视觉伪影。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未发布新版本。

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen3-TTS 快速微调**：通过 PR #12646 加入，利用 Unsloth 的快速训练流水线实现语音合成模型的高效微调。
- ✅ **Anthropic Studio 工具集成**：PR #12497 实现对 MCP、基于文件的聊天以及通过 Anthropic 连接进行深度研究的完整支持。
- ✅ **FLUX.1 与 Qwen-Image-2.1 的 ROCm 支持**：PR #12701 引入 AMD GPU（ROCm）专用的融合 RoPE 内核，使单图生成速度提升最高达 8%。
- ⚠️ **Radeon 780M 上的 Vulkan GGUF**：问题 #12695 报告 `ErrorOutOfDeviceMemory`，表明部分 AMD 移动 GPU 对 Vulkan 后端支持不完整。

---

### **4. 性能与优化**  
- 🔥 **张量拆分推理性能下降**：自 `b10715-mix-86bd2d3` 起，双 RTX 5070 Ti 上的张量拆分解码速度**下降约 2.9 倍**（48 t/s vs. 115–130 t/s）。怀疑根源是 #144 中引入的过度使用 CUDA graph（`max_cuda_graphs = 64`）。[Issue #12468](https://github.com/unslothai/unsloth/issues/12468)
- 🚀 **ROCm 上 FLUX.1 的提速**：融合 RoPE 内核在 AMD GPU 上实现**每图提升 8%** 的性能（像素级输出一致）。[PR #12701](https://github.com/unslothai/unsloth/pull/12701)
- 📈 **卸载场景下的全步 CUDA Graph**：PR #12707 通过堆叠全步图扩展卸载优化，降低主机开销并提升吞吐量（L4 FLUX.1：**快 10%**，HunyuanVideo-1.5：**内存减少 1 GiB**）。
- 🖼️ **Qwen-Image-2.1 的 VAE Tile 修复**：PR #12696 解决低显存卡（12GB/16GB）上生成图像中可见的水平/垂直条纹伪影。[PR #12696](https://github.com/unslothai/unsloth/pull/12696)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 状态 |
|---------|-------|-------------|--------|
| 🔴 高 | [#12468](https://github.com/unslothai/unsloth/issues/12468) | 双 GPU 上从 `b10715-mix-*` 起张量拆分推理**慢 2.9 倍**；可能因 CUDA graph 限制。 | 开放 |
| 🔴 高 | [#12372](https://github.com/unslothai/unsloth/issues/12372) | Studio 在生成时从磁盘加载 `mmproj-F16.gguf` → 吞吐量严重下降；`--mlock` 被拒绝，参数被剥离。 | 开放 |
| 🟡 中 | [#12552](https://github.com/unslothai/unsloth/issues/12552) | 最近更新后长上下文聊天出现延迟。 | 开放 |
| 🟡 中 | [#12695](https://github.com/unslothai/unsloth/issues/12695) | Radeon 780M 上 Vulkan GGUF 出现 `ErrorOutOfDeviceMemory` 错误。 | 开放 |
| 🟡 中 | [#12673](https://github.com/unslothai/unsloth/issues/12673) | 使用自定义 llama.cpp 连接时，聊天上下文栏始终无法填充，因缺少 `usage.prompt_tokens`。 | 开放 |

> ✅ **正在修复中**：PRs #12707、#12701、#12696、#12646 正在解决关键性能与正确性问题。

---

### **6. 对应用开发者的启示**  
- **若使用多 GPU 张量拆分模式，请避免 `b10715-mix-*` 版本**，改用 `b10687-mix-*` 或官方 ggml 构建，直至 #12468 修复。
- **利用 PR #12707 与 #12701 中的新优化**，以在 ROCm 和卸载模型上获得更低的推理延迟。
- **谨慎使用 Studio 中的 `--mlock` 与额外参数**：更新后这些参数可能被剥离或忽略（参见 #12372）。
- **连接自定义 llama.cpp 端点时注意上下文追踪**：除非修复（参见 #12673），否则 `contextUsage` 可能不会反映提示词令牌数。
- **准备迎接未来 ARM64 Linux 支持**：当前下载链接错误地将 ARM64 标记为 macOS（参见 #12680）；部署前请验证二进制文件。

> 💡 *建议*：将环境锁定在稳定版本，并密切关注 GitHub 上有关 CUDA graph 行为和 Vulkan 兼容性的修复进展。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*