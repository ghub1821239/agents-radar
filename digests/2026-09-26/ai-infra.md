# AI 基础设施日报 2026-09-26

> 生成时间: 2026-09-26 00:51 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-26**

---

### **1. 生态概览**

2026年第三季度，AI基础设施领域呈现出明显的两极分化：**高性能、低延迟的推理引擎**与**开发者友好、跨平台的运行时网关**并行发展，硬件多样性与原生代理设计成为显著趋势。vLLM和SGLang在内核级优化和推测性解码成熟度方面领先，致力于实现亚毫秒级延迟的大规模推理。与此同时，Ollama和LiteLLM正迅速演变为统一的应用平台——融合本地执行、云端API以及结构化输出支持，为智能体工作流提供一体化能力。Unsloth和llama.cpp持续拓展非CUDA硬件（如AMD、Apple Silicon）的边界，推动模型部署在边缘与异构环境中的广泛普及。

---

### **2. 活跃度对比**

| 项目       | 开放问题 (↑) | 合并的PR (↑) | 发布版本 (↑) | 关键状态 |
|---------------|------------------|------------------|----------------|------------|
| **vLLM**      | 87               | 45               | 无             | 稳定，高速优化中 |
| **SGLang**    | 112              | 38               | 无             | 高度不稳定；CI健康状况堪忧 |
| **llama.cpp** | 142              | 31               | 4 (b11192+)    | 持续修复稳定性问题，后端扩展中 |
| **Ollama**    | 108              | 29               | v0.40.0-rc0    | 重大功能发布；存在关键回归问题 |
| **LiteLLM**   | 96               | 41               | 4 (dev/stable) | 高度关注安全性和成本准确性 |
| **Unsloth**   | 131              | 27               | 无             | 强调AMD/Vulkan支持，训练稳定性待提升 |

> ✅ *注：所有项目均保持活跃，但仅Ollama和llama.cpp最近发布了更新。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构         | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1 (Flash)**        | ✅ (PRs #58132, #58678) | ✅ (Issue #40877) | ❌ | ⚠️ (仅云端) | ❌ | ❌ |
| **Qwen3.8-2.4T-A95B-Quark-MXFP4** | ✅ (Issue #57149) | ⚠️ (进行中) | ❌ | ✅ (MLX原生) | ❌ | ❌ |
| **Gemma3n**                      | ❌ | ✅ (PR #41295) | ❌ | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1 GGUF**          | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (修复中) |
| **Gemini Live Avatar**           | ❌ | ❌ | ❌ | ❌ | ✅ (PR #43166) | ❌ |
| **MXFP4 MoE / LoRA**             | ✅ (PR #58634) | ✅ (PR #41292) | ❌ | ❌ | ❌ | ✅ (PR #11929) |

**领跑者**：**vLLM** 在前沿模型支持上领先，尤其在 DeepSeek-V4.1 和 MXFP4 量化方面表现突出。  
**差异化优势**：**LiteLLM** 在多模态API集成（Gemini Live Avatar）方面独树一帜。  
**新兴亮点**：**Unsloth** 正在构建对基于GGUF的视觉模型及AMD专属变体的强大支持能力。

---

### **4. 性能前沿**

优化方向已高度专业化：

| 聚焦领域                | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------------------|------|--------|-----------|--------|---------|---------|
| **内核融合**         | ✅✅ (SM120, Mamba, DSv4.1) | ✅ (Gemma3n, DSV4.1) | ✅ (VNNI, A8 OpenCL) | ✅ (CUDA移植) | ❌ | ❌ |
| **KV缓存优化** | ✅✅ (KVPP提案，GDN元数据) | ✅ (HiCache, PD准入) | ❌ | ❌ | ❌ | ✅ (内存规划修复) |
| **推测性解码**  | ✅✅ (MRV2稳定化，草稿验证) | ✅ (DCP，逻辑令牌追踪) | ❌ | ❌ | ❌ | ✅ (基准测试页面) |
| **分布式服务**   | ✅ (多组MLA，SP融合) | ✅ (DCP，交错CP) | ❌ | ❌ | ❌ | ❌ |
| **量化与精度** | ✅ (MXFP8, FP8, SWA重放) | ✅ (FP4索引器，num_warps调优) | ✅ (BF16→FP32分块) | ✅ (MLX前缀缓存) | ✅ (成本准确性) | ✅ (Hadamard旋转) |

**主导趋势**：  
- **vLLM** 在内核级融合与推测性解码鲁棒性方面占据绝对优势。  
- **SGLang** 聚焦可扩展的上下文并行与混合模型流水线。  
- **Unsloth** 强调内存感知规划与动态编译效率。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 角色摘要 |
|---------------|------------------------------------|-------------|
| **vLLM**      | **推理引擎**               | 底层、GPU优化的引擎，适用于高吞吐、低延迟推理，面向数据中心级大模型部署。 |
| **SGLang**    | **推理引擎 + 运行时**     | 结合引擎能力与高级调度（DCP、混合SSM/Mamba），适合复杂智能体工作流。 |
| **llama.cpp** | **本地运行时 / 可移植后端** | 支持CPU/GPU加速推理，覆盖广泛硬件（Metal、Vulkan、HIP）；面向边缘与离线场景。 |
| **Ollama**    | **网关 + 本地运行时**        | 以开发者为中心的平台，整合CLI、GUI、MLX/CUDA后端及OpenAI兼容API，连接本地与云端。 |
| **LiteLLM**   | **API网关 / 编排器**     | 聚合多个服务商，强制执行成本/速率限制，支持路由、加密与可观测性——多提供商生产系统的核心。 |
| **Unsloth**   | **微调 + 多引擎运行时** | 聚焦训练（QLoRA）、模型加载与运行时灵活性（vLLM/SGLang集成），强攻AMD/ROCm支持。 |

> 🔍 **战略洞察**：生态系统正向**专业化层级**演进：引擎（vLLM/SGLang）、运行时（llama.cpp）、网关（LiteLLM/Ollama）、训练工具（Unsloth）。

---

### **6. 趋势信号**

**从当前活动提炼出的关键行业趋势**：

1. **硬件多样化已成为主流**  
   - AMD ROCm（MI300X/MI355X）、Apple Silicon（MLX）、Intel SYCL、Vulkan已不再属于实验范畴。Unsloth、Ollama、llama.cpp等项目正积极为这些后端交付修复与优化——表明CUDA不再是唯一路径。

2. **原生代理功能正成为标配**  
   - 结构化输出（工具调用）、流式logprobs、确定性推理（`batch_invariant`）、推理预算等已成为核心关注点。vLLM、SGLang、Ollama均优先保障有状态、多步智能体流程的可靠性。

3. **成本准确性与安全性不可妥协**  
   - LiteLLM对静态加密密钥、精确计价、降级逻辑的关注，反映出生产级AI系统对合规性与财务问责的日益重视。

4. **性能不再仅关乎速度——更关乎可预测性**  
   - 内核融合、内存规划、JIT预热间隙（如 `TRITON_CACHE_DIR`）已成为首要关切。开发者需管理的不仅是延迟，还包括波动性与启动开销。

5. **开源正在驱动多模态与视觉领域的创新**  
   - Gemini Live Avatar（LiteLLM）、Qwen-Image-2.1（Unsloth）、具备视觉能力的云模型（Ollama）表明图像/音频智能体快速普及——推动基础设施应对更丰富的模态。

---

### **面向应用开发者的建议**

- **对于高性能智能体**：使用 **vLLM** 并配置 `batch_invariant=1` 与 `VLLM_ROCM_USE_AITER=1`，在NVIDIA/AMD平台上实现可复现、低延迟推理。
- **对于跨硬件应用**：利用 **Unsloth** 的 vLLM/SGLang 集成，或 **llama.cpp** 的 Metal/Vulkan 支持，在Apple Silicon或AMD GPU上部署。
- **对于生产级API**：选择 **LiteLLM** 作为网关层，确保成本追踪、安全防护与服务商路由。
- **对于智能体工作流**：避免使用 `deepseek-v4.1-flash:cloud`（图像丢失）和 Ollama v0.40.0-rc0 中的 `max_tokens` 问题，若需稳定，可回退至 `v0.39.2`。
- **关注新兴模式**：留意 **上下文并行（DCP）** 与 **结构化输出稳定性** —— 这些是规模化真实世界智能体的关键。

> 📌 **核心结论**：基础设施栈已不再单一。明智选择你的层级——性能、可移植性与智能体就绪性，如今已是工程卓越的不同维度。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-26

---

### **1. 今日亮点**

vLLM 项目持续推进推测解码与结构化输出的鲁棒性优化，关键 PR 稳定了 MRV2 的草稿验证逻辑，并修复了流式续写中 logprobs 的处理问题。针对 DeepSeek-V4.1（DSv4.1）的关键性能工作包括：内核融合优化将解码延迟降低最高达 7 倍，以及对多组 MLA 模型的改进卸载策略。与此同时，Rust 前端已接近功能对齐里程碑，标志着非 Python 集成的成熟度持续提升。

---

### **2. 发布与破坏性变更**

过去 24 小时内无新发布。  
**重要配置变更：**  
- `VLLM_BATCH_INVARIANT=1` 现已正确禁用序列并行与通信融合（PR #56377），解决了确定性推理流程中长期存在的正确性问题。  
- `--tool-call-parser qwen3_coder` 在 v0.22 与 v0.23 之间行为发生变化（Issue #46493），升级时需验证工具调用输出。

> 🔗 [PR #56377](https://github.com/vllm-project/vllm/pull/56377) | 🔗 [Issue #46493](https://github.com/vllm-project/vllm/issues/46493)

---

### **3. 新模型与硬件支持**

- **新增模型支持**：  
  - **DeepSeek-V4.1 (Flash)**：解码侧 SWA 有界重放（PR #58132）实现高效预填充复用；Engram wkv 投影分片（PR #58678）提升 TP 扩展性。  
  - **Qwen3.8-2.4T-A95B-Quark-MXFP4 (AMD)**：针对 gfx950 / MI355X 的性能优化跟踪已启动（Issue #57149）。

- **硬件与后端**：
  - **ROCm (AMD)**：CDNA 架构 GPU（MI300X/MI355X）持续调优；`ROCM_AITER_FA` 选择现尊重 `VLLM_ROCM_USE_AITER=1`（Issue #46596）。  
  - **NVIDIA Blackwell (SM120)**：Kimi K2.7 的 FP8 问题已解决（Issue #46721）。  
  - **多模态**：提出线程池优化方案，以绕过预处理中的 GIL 瓶颈（Issue #58266）。

> 🔗 [PR #58132](https://github.com/vllm-project/vllm/pull/58132) | 🔗 [Issue #57149](https://github.com/vllm-project/vllm/issues/57149) | 🔗 [Issue #46596](https://github.com/vllm-project/vllm/issues/46596)

---

### **4. 性能与优化**

- **内核级加速**：
  - Mamba `align` 块表收集合并为单一 Triton 内核 → 所有形状下提速 **6×**（PR #58737）。  
  - DeepSeek-V4.1：WO-A + 反 RoPE + MXFP8 量化在 SM100/SM103 上融合 → 每解码步节省 **~11–12 µs**（PR #58634）。  
  - GDN 元数据构建优化：主机调度中每步减少 **~11 µs**（PR #58732）。

- **系统级优化**：
  - 提出 KV 管道并行（KVPP）方案，用于逐层 KV 缓存所有权管理（Issue #58329），有望显著提升大 MoE 模型的扩展性。  
  - 通过解析器缓存与稳定工具调用 ID 提升结构化输出解析稳定性（Issue #57571）。

> 🔗 [PR #58737](https://github.com/vllm-project/vllm/pull/58737) | 🔗 [PR #58634](https://github.com/vllm-project/vllm/pull/58634) | 🔗 [Issue #58329](https://github.com/vllm-project/vllm/issues/58329)

---

### **5. 稳定性与回归问题**

| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|-----------|
| 高 | #58784 | MRV2 拒绝从未被提议的草稿槽 — 可导致无效推测 | ✅ 已提交 PR |
| 高 | #57447 / #57790 | 流式输入续写期间 logprobs 丢失或过期 | ✅ 已合并 PR |
| 中 | #58485 | V1 思考预算在推测解码下损坏 reasoning_end_str | ❌ 未关闭 |
| 中 | #55005 | CPU 推测解码因类型不匹配消耗未初始化内存 | ❌ 未关闭 |
| 低 | #57839 | 水印检测器不支持 dual_key_gumbel；alpha 不匹配 | ⚠️ 轻微 |

> 🔗 [PR #58784](https://github.com/vllm-project/vllm/pull/58784) | 🔗 [PR #57447](https://github.com/vllm-project/vllm/pull/57447) | 🔗 [Issue #58485](https://github.com/vllm-project/vllm/issues/58485)

---

### **6. 对应用开发者的影响**

- **安全使用 `batch_invariant`**：启用 `VLLM_BATCH_INVARIANT=1` 后，可确保确定性推理不再受隐藏的 SP/通信融合影响，避免结果漂移——这对智能体评估与可复现性至关重要。  
- **流式智能体**：对 logprobs 与工具调用 ID 稳定性的修复（PRs #57447, #57790）保障了可靠的状态保持式流式响应——对于多步推理与工具调用不可或缺。  
- **性能敏感型应用**：充分利用 DSv4.1 内核融合与 Mamba 优化，实现亚毫秒级解码延迟。在 CDNA 硬件上考虑启用 `VLLM_ROCM_USE_AITER=1` 以获得更优注意力性能。  
- **Rust 集成**：实验性 Rust 前端（Issue #44280）即将达成功能对齐——适用于低延迟、高吞吐服务场景，尤其当 Python 开销难以接受时。

> 📌 实用提示：生产部署中请关注 `TRITON_CACHE_DIR` 的 JIT 热身间隙（PR #58559）——首次请求延迟可能高于预期。

---  
*摘要生成时间：2026-09-26 | 来源：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-26

---

### **1. 今日亮点**  
SGLang 持续对下一代模型和硬件进行激进优化，DeepSeek-V4.1 性能调优与上下文并行（DCP）基础设施取得重大进展。已合并 Qwen3.8-Flash-Next 和 GLM-5.3-Flash 的关键稳定性修复，新提交的 PR 针对 Gemma3n 及基于 Hopper 架构的推理进行内核级优化。持续关注 CI 健康状况，正努力稳定测试流水线。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告发布内容。  
未引入破坏性变更或迁移说明。  
*注意：v0.5.19 仍是最新稳定版本；用户应关注 #17050 以了解持续的 CI 可靠性情况。*

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1-Flash**：在 8× RTX PRO 6000（SM120，仅 PCIe）上进行积极开发与现场测试——请参见 [Issue #40877](https://github.com/sgl-project/sglang/issues/40877) 获取已验证配置及吞吐量数据。  
- **Apple Silicon（MPS/Metal）**：正在修复内存检测问题（`get_device_memory_capacity()` 缺失 MPS 路径），导致预填充阶段 OOM——请参见 [Issue #39675](https://github.com/sgl-project/sglang/issues/39675)。  
- **AMD ROCm**：DSV4.1 AMD 内核进展顺利，包括 KV 缓存布局、FP4 索引器及压缩器/路由器逻辑——请参见 [PR #41019](https://github.com/sgl-project/sglang/pull/41019)。  
- **MLX 后端**：继续支持 Hunyuan 与 Qwen3 VL，但适配器加载与自动映射仍存在问题——请参见 [Issue #32521](https://github.com/sgl-project/sglang/issues/32521)。

---

### **4. 性能与优化**  
- **Gemma3n**：通过跳过未使用的 K/V 计算优化共享 KV 注意力；避免在支持的 CUDA RoPE 内核上分配虚拟键——请参见 [PR #41295](https://github.com/sgl-project/sglang/pull/41295)。  
- **DeepSeek-V4.1**：针对 SM90 上的 ratio-2 解码池化 + RMSNorm 实现内核融合改进；目标实现 2–3 倍解码速度提升——请参见 [PR #41294](https://github.com/sgl-project/sglang/pull/41294)。  
- **MXFP4 MoE**：调整 Triton 内核中的 `num_warps` 以提升 SM89（RTX 4090）利用率，解决约 6 倍解码延迟问题——请参见 [PR #41292](https://github.com/sgl-project/sglang/pull/41292)。  
- **上下文并行（DCP）**：增强逻辑令牌容量跟踪，用于 PD 入驻与负载报告——请参见 [PR #39731](https://github.com/sgl-project/sglang/pull/39731)。  
- **混合 Mamba/SSM**：HiCache 动态存储后端现已支持分层缓存；此前因 `cudaHostRegister` 失败引发的崩溃问题已被标记——请参见 [Issue #40926](https://github.com/sgl-project/sglang/issues/40926)。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|-----------|
| 🔴 高 | [Issue #36537](https://github.com/sgl-project/sglang/issues/36537) | Qwen3.8-Flash-Next 在 token ID 0 出现思考 + 工具解析循环 | 已关闭 —— 补丁已应用 |
| 🔴 高 | [Issue #36531](https://github.com/sgl-project/sglang/issues/36531) | QSA 回退选择与 SM120 不兼容的 FA4 路径 | 已关闭 —— 已解决 |
| 🟡 中等 | [Issue #37712](https://github.com/sgl-project/sglang/issues/37712) | GLM-5.3-Flash：长上下文预填充期间 fp8_mqa_logits 导致 CUDA OOM | 开放 —— 影响 TP 分区 |
| 🟡 中等 | [Issue #40926](https://github.com/sgl-project/sglang/issues/40926) | HiCache + 混合 SSM/Mamba 在二级主机池失败，导致实例崩溃 | 开放 —— 对生产环境至关重要 |
| 🟡 中等 | [Issue #36532](https://github.com/sgl-project/sglang/issues/36532) | FlashInfer GDN 状态 dtype 冲突出现在 SM120 | 已关闭 —— 已修复 |
| 🟡 低 | [Issue #41211](https://github.com/sgl-project/sglang/issues/41211) | MLX：未启用采样时 `return_logprob` 返回空 logprobs → 500 错误 | 开放 —— 影响评分 API |

---

### **6. 对应用开发者的影响**  
- **对于高吞吐代理**：谨慎使用 `--enable-prefill-cp --cp-strategy interleave` —— 已知在 DeepSeek-V4-Flash-FP8（v0.5.16）上存在崩溃问题；请升级至最新版本。  
- **对于长上下文应用**：在 #32475 修复前，请避免设置 `--page-size > 1` —— KV 指标错误地将块容量报告为令牌容量。  
- **对于 Apple Silicon 开发者**：预期内存管理不稳定；避免使用默认的 `mem_fraction_static`（若未检测到设备内存则默认为 0.95）——详见 #39675。  
- **对于特定模型工作流**：确保搭配兼容后端使用 `--kv-cache-dtype fp8_e4m3` —— 不一致检查已在 #31774 中追踪。  
- **对于推测解码**：通过 RunAI 验证草稿模型分片选择 —— #32507 显示当前加载器会不必要地下载所有分片。

> 💡 **实用提示**：在合并至生产环境前，请通过 [Issue #17050](https://github.com/sgl-project/sglang/issues/17050) 监控 CI 状态——截至 2026-09-26，报告有 1 个失败、7 个不稳定的测试。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-26**

---

### **1. 今日亮点**  
最新发布周期聚焦于在多种后端上的稳定性与性能提升，关键修复了 Metal、Vulkan 及 HIP 平台的问题。特别地，针对 LFM2 音频中日文转录准确率的高危缺陷，通过改进 mel 前处理器的数值稳定性得以解决。此外，新增支持 A8 Q5_K 量化格式的 OpenCL 内核，并增强 SYCL 支持，进一步提升了底层硬件利用率。

---

### **2. 发布与破坏性变更**  
- **`b11192`**：将 `cpp-httplib` 升级至 v0.58.0 (#29407) — 仅依赖项小幅更新，无破坏性变更。  
- **`b11191`**：修复 Windows 上对 Unicode 路径使用 `fs_create_directory_with_parents()` 时尾部分隔符处理不当的问题 (#29432)。  
- **`b11188`**：通过 `GGML_VULKAN_COOPMAT_GLSLC_SUPPORT` 宏检测，解决旧版 glslc（缺少 `cooperativeMatrix` 支持）导致的 Vulkan 构建失败问题 (#29409)。  
- **`b11185`**：将共享的 Unicode 路径/字符串工具函数提取至通用工具集 (#29415)，提升可维护性。

> 🔗 [GitHub Releases](https://github.com/ggml-org/llama.cpp/releases)

---

### **3. 新模型与硬件支持**  
- **新模型支持**：新增对 **Limite 1B - Violetto** (#29433) 和 **GraniteSpeech5ForCTC (Turbo CTC)** — 一种仅编码器的非自回归语音处理模型 (#29446) 的初步支持。  
- **硬件/后端增强**：  
  - 添加 **A8 Q5_K 非 MoE 与 dp4a 变体**的 OpenCL 二进制内核（如 `kernel_gemm_noshuffle_q5_k_f32_32b_trans_ila_a8_bin` 等）(#29401)。  
  - 增强 **Metal FWHT** 支持，块宽 >512 时仍可用，实现更宽范围的 FFT 操作 (#29095)。  
  - **SYCL**：CI 中升级 oneAPI 工具链版本至 2026.1，并修复 DNNL 标志报告问题 (#29447, #29273)。  
  - **HIP**：为支持 FP8，将所需 `HIP_VERSION` 提升，避免缺失 `__hip_fp8_e4m3` 符号问题 (#29231)。

> 🔗 [PR #29433](https://github.com/ggml-org/llama.cpp/pull/29433) | [PR #29446](https://github.com/ggml-org/llama.cpp/pull/29446) | [PR #29401](https://github.com/ggml-org/llama.cpp/pull/29401)

---

### **4. 性能与优化**  
- **CPU**：对 k-量化使用 VNNI 的分块 `mul_mat` 实现 **3–7倍加速**，兼容 CPU 上表现显著 (#27851)。  
- **Metal**：将 FA 内核按数据类型拆分为独立库，减少二进制体积并提升运行时分发效率 (#29329)。  
- **Vulkan**：为 Intel GPU 添加预填充 FA 内核，改善 Intel 显卡性能 (#29357)。  
- **内存**：在 `llama-bench` 中引入 `--repack` 选项，使工具链与 `llama-cli` 对齐，支持更精准的跨后端基准测试 (#28968)。  
- **精度**：实验性支持 BF16/FP16 → FP32 分块，可在 gfx906（Radeon VII）上降低显存占用，同时保持性能优势 (#29442)。

> 🔗 [PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851) | [PR #29357](https://github.com/ggml-org/llama.cpp/pull/29357) | [PR #29442](https://github.com/ggml-org/llama.cpp/pull/29442)

---

### **5. 稳定性与回归问题**  
- **严重级别**：修复 **LFM2 音频中贪婪解码结果错误** 问题——源于日志下限钳位不当，影响 **4.5% 英文**、**6.5% 日文** 语句 (#29403)。  
- **高严重性**：多个 **HIP/ROCm 回归问题** 报告：  
  - 长提示（`n_ubatch`）时输出逻辑错误 —— 经排查确认由近期 flash attention 变更引起 (#28211)。  
  - 在集成型 gfx1151 GPU 上，高并发负载（`-np 4 --kv-unified`）导致响应数据损坏 (#25992)。  
  - 当 VictoriaMetrics 抓取 `/metrics` 时，服务无声终止 (#29104)。  
- **CUDA**：ROCm 上 MTP draft 上下文持续出现 OOM 问题，导致可容纳上下文尺寸被不必要缩减 (#26038)。  
- **构建**：旧版 glslc 缺少 `GL_KHR_cooperative_matrix` 时 Vulkan 构建失败 —— 通过宏检查提供临时解决方案 (#29373)。

> 🔗 [Issue #29403](https://github.com/ggml-org/llama.cpp/issues/29403) | [Issue #28211](https://github.com/ggml-org/llama.cpp/issues/28211) | [Issue #25992](https://github.com/ggml-org/llama.cpp/issues/25992)

---

### **6. 对应用开发者的意义**  
- **建议使用 `b11192+` 版本**，以规避已知崩溃与正确性缺陷，尤其在部署于 **HIP/Metal/Vulkan** 或处理 **长音频输入（LFM2）** 场景下。  
- 利用 **新 OpenCL 内核** 加速在支持硬件上对 A8 Q5_K 模型的 GPU 推理，预期获得更高的吞吐量。  
- 若需 **低延迟 CPU 推理**，请启用分块 `mul_mat`：设置 `GGML_CPU_TILED=1`（若您的构建支持）。  
- 使用 **SYCL** 时，请确保 oneAPI 版本不低于 2026.1；可通过更新后的构建标识验证 `GGML_SYCL_DNNL` 行为是否正常。  
- 在 AMD 集成显卡上，**请暂勿使用 `-np 4 --kv-unified`**，直至 #25992 修复完成——当前行为存在请求间数据泄露风险。

> ✅ 推荐：始终在真实负载条件下测试模型特定行为（如 `--kv-unified`、`--n_ubatch`）。  
> 🔗 [稳定性问题](https://github.com/ggml-org/llama.cpp/issues?q=is%3Aissue+is%3Aopen+label%3Abug-unconfirmed) | [功能请求](https://github.com/ggml-org/llama.cpp/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama 消息简报 – 2026-09-26**

---

### **1. 今日亮点**  
Ollama v0.40.0-rc0 在 Apple Silicon 上引入了自动 MLX 运行时支持，标志着 `qwen3.8` 和 `gemma4` 等模型向原生性能迈出关键一步。本版本还修复了 macOS GUI 流式传输和云模型行为中的关键稳定性问题，当前工作重点在于扩展硬件支持并解决 OpenAI 兼容 API 的限制。

---

### **2. 发布与破坏性变更**  
- **v0.40.0-rc0**：现在默认在 Apple Silicon 上为支持的模型（如 `qwen3.8`、`gemma4`）启用 **MLX 后端**。无需任何配置更改——模型将自动利用 Metal 加速推理。  
  - [GitHub 发布](https://github.com/ollama/ollama/releases/tag/v0.40.0-rc0)  
- **OpenAI 兼容端点修复**：  
  - PR #18656（已合并）通过改用 UUID 修复了 `/v1/chat/completions` 响应中 `rand.Intn(999)` 的 ID 冲突问题。  
    [PR #18656](https://github.com/ollama/ollama/pull/18656)  
  - PR #18648 确保 `ollama pull` 期间磁盘满错误能被正确传播，而非被伪装成网络超时。  
    [PR #18648](https://github.com/ollama/ollama/pull/18648)

---

### **3. 新模型与硬件支持**  
- **Apple Silicon (MLX)**：M 系列芯片上，对 MLX 支持的模型（`qwen3.8`、`gemma4` 等）现已默认启用完整集成。  
  - MLX 运行时现通过共享负载处理 CUDA 回退逻辑（PR #17956）。  
- **Intel GPU (SYCL/oneAPI)**：提案 (#16930) 与实现工作 (#17621) 持续推进；针对 Arc/Battlemage GPU 的可选支持正在开发中。  
  - [功能请求 #16930](https://github.com/ollama/ollama/issues/16930)，[PR #17621](https://github.com/ollama/ollama/pull/17621)  
- **云模型**：`deepseek-v4.1-flash:cloud` 尽管声称具备 `vision` 能力，仍存在静默丢弃图像输入的问题（#18527 的回归）。  
  - [问题 #18637](https://github.com/ollama/ollama/issues/18637)

---

### **4. 性能与优化**  
- **MLX 前缀缓存内存开销**：修复 8 GiB 硬上限导致 32 GB Mac 在代理工作流中严重交换的问题（PR #18131）。  
  - 当前临时解决方案：通过 `MLX_PREFIX_CACHE_SIZE` 环境变量手动调优。  
  - [问题 #18131](https://github.com/ollama/ollama/issues/18131)  
- **CUDA 内核移植**：PR #18657 将 Metal 自定义内核（如 `mamba2_scan`、`depthwise_conv_silu`）移植至 CUDA，以提升 NVIDIA 显卡性能。  
  - 解决次优的基于图的回退问题。  
  - [PR #18657](https://github.com/ollama/ollama/pull/18657)  
- **模型解析效率**：PR #18649 修复了解析器因 `}` 后存在尾随标记而拒绝有效工具调用的问题。  
  - 对使用结构化输出的代理工作流至关重要。  
  - [PR #18649](https://github.com/ollama/ollama/pull/18649)

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 影响 | 状态 | 修复 PR |
|--------|------|--------|--------|--------|
| 🔴 高 | `deepseek-v4.1-flash:cloud` 尽管报告支持 `vision`，仍静默丢弃图像输入 | 打破多模态代理 | 开放（回归） | [问题 #18637](https://github.com/ollama/ollama/issues/18637) |
| 🔴 高 | macOS GUI 聊天在 60 秒预填充后静默失败（无流式通知） | 代理工作流阻塞 | 开放 | [PR #18654](https://github.com/ollama/ollama/pull/18654) |
| 🟡 中 | `/v1/chat/completions` 忽略 `max_tokens` 并覆盖 `num_predict` | 生成无限风险 | 开放 | [问题 #18575](https://github.com/ollama/ollama/issues/18575) |
| 🟡 中 | `qwen3.8` 的 `think: "high"`/`"max"` 被忽略——运行默认 `medium` | 推理层级错误 | 开放 | [问题 #18632](https://github.com/ollama/ollama/issues/18632) |
| 🔴 高 | RTX 5090 上运行 Cohere MoE 模型时出现 CUDA 非法内存访问 | 服务器崩溃 | 开放 | [问题 #18642](https://github.com/ollama/ollama/issues/18642) |
| 🔴 高 | Windows 上驱动 616.92 下黑峡谷（RTX 50 系列）无法发现 CUDA | 回退至 CPU | 开放 | [问题 #18581](https://github.com/ollama/ollama/issues/18581) |

---

### **6. 对应用开发者的影响**  
- **Apple Silicon 用户**：无需修改配置即可显著提升 `qwen3.8`、`gemma4` 及其他 MLX 兼容模型的推理速度。请留意内存使用情况——前缀缓存可能在 32GB 系统上触发交换。  
- **代理构建者**：使用 `tool` 调用时需谨慎——若响应包含尾随噪声，即使为有效 JSON 也可能被拒绝（#18649 修复中）。同时确认 `think: "high"`/`"max"` 是否被正确识别（目前被忽略）。  
- **云/API 开发者**：在修复发布前，请避免在视觉任务中使用 `deepseek-v4.1-flash:cloud`。在代理中启用 UUID 响应 ID（通过 #18656）。  
- **基础设施团队**：注意未受控生成（`max_tokens` 被忽略）问题，建议通过本地 Modelfile 编辑或中间件层进行修补。  
- **未来规划**：关注 Intel SYCL 支持（PR #17621）和 System 1 模型提案（问题 #18594），以获得下一代代理灵活性。

> ✅ **建议**：对于生产级代理，建议暂定于 `v0.39.2` 或更早版本，直至 `v0.40.0` 稳定，尤其在 macOS 或云部署环境中。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-09-26**

---

### **1. 今日亮点**  
LiteLLM 生态系统在过去24小时内迎来一系列关键修复与功能增强，重点聚焦于成本准确性、安全性及可观测性。主要更新包括：**修复 Fireworks AI 与 Azure AI 模型的错误定价问题**，**增强网关规则与路由器密钥在静态存储时的加密保护**，以及**改进流式响应错误处理与速率限制降级机制**。一项重大 PR 引入了对实时 Gemini/Vertex 集成中 **Gemini Live Avatar（avatar_config）** 的支持，进一步扩展了多模态能力。

---

### **2. 发布与破坏性变更**  
- 过去24小时内发布了 **v1.104.0-dev.2**、**v1.100.3**、**v1.99.4**、**v1.98.1** 四个版本。  
- 所有 Docker 镜像现已使用统一密钥通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 签名 — 可通过 `cosign verify` 验证以确保符合安全合规要求。  
- 未报告任何破坏性 API 变更；升级均向后兼容。  

> 🔗 [GitHub 发布说明](https://github.com/BerriAI/litellm/releases)

---

### **3. 新模型与硬件支持**  
- ✅ 通过 PR [#43166](https://github.com/BerriAI/litellm/pull/43166) 新增 **Gemini Live Avatar（avatar_config / customized_avatar）** 支持 — 实现实时会话中唇同步的真人头像视频交互。  
- ✅ 通过 PR [#42840](https://github.com/BerriAI/litellm/pull/42840) 新增 **Sail** 作为受支持的服务提供商，并支持 `completion_window` 映射。  
- ✅ 通过 PR [#43248](https://github.com/BerriAI/litellm/pull/43248) 将 OpenRouter 的 `typesafe/jev-router` 列入成本映射表，实现缓存感知路由。  
- ✅ 通过 PR [#43234](https://github.com/BerriAI/litellm/pull/43234) 将 **Jev 与 Laya** 加入决策模型自动路由系统。  

> 🔗 [Gemini Live Avatar PR](https://github.com/BerriAI/litellm/pull/43166) | [Sail 提供商 PR](https://github.com/BerriAI/litellm/pull/42840)

---

### **4. 性能与优化**  
- **流式性能提升**：PR [#43056](https://github.com/BerriAI/litellm/pull/43056) 防止上游错误流缓冲，将客户端卡顿时间从约12秒降至即时转发。  
- **成本计算精度恢复**：PRs [#43253](https://github.com/BerriAI/litellm/pull/43253) 与 [#43254](https://github.com/BerriAI/litellm/pull/43254) 修正了 **Fireworks AI DeepSeek V4.1 Flash** 与 **Azure MAI-Image-2.5-Flash** 的计费低估问题，使支出日志与零售价格对齐。  
- **HTTP 客户端连接池重构**：通过 PR [#43245](https://github.com/BerriAI/litellm/pull/43245)，所有服务提供商现在共享一个 `HttpClientPool`，提升了连接复用率，并统一了 TLS、代理与超时配置的一致性。

---

### **5. 稳定性与回归问题**  
- **严重缺陷**：路由器降级在非流式超时时返回 `null` 响应体 → 已由 PR [#43165](https://github.com/BerriAI/litellm/pull/43165) 修复。  
- **高危问题**：v1.93.0 版本中 Redis 缓存因 `ssl_check_hostname` 错误失败 → 问题 [#34614](https://github.com/BerriAI/litellm/issues/34614) 已追踪，暂无修复方案。  
- **回归问题**：自 v1.99.0 起，因 `request_id="None"` 冲突导致支出日志无声丢失 → 问题 [#39749](https://github.com/BerriAI/litellm/issues/39749) 已确认，相关 PR 正在等待合并。  
- **安全风险**：网关规则 API 密钥以明文形式存储于 Postgres → 已由 PR [#43255](https://github.com/BerriAI/litellm/pull/43255) 解决（实现密钥静态加密）。  

> 🔗 [失效降级修复 PR](https://github.com/BerriAI/litellm/pull/43165) | [Redis SSL 问题](https://github.com/BerriAI/litellm/issues/34614)

---

### **6. 对应用开发者的意义**  
- **请使用 `v1.104.0-dev.2` 或更高版本**，以确保成本追踪准确 — 尤其适用于 Fireworks AI、Azure 或 Databricks 后端。  
- **启用静态密钥加密**，通过新的 `run-ci` PR 满足合规标准（如 SOC2、HIPAA）。  
- **在生产流程中利用 Gemini Live Avatar**，通过 `avatar_config` 实现交互式智能体与面向客户的聊天机器人。  
- **避免输入如 `"sixty-four"` 的 `stream_chunk_size` 参数** — 当前已通过 PR [#43223](https://github.com/BerriAI/litellm/pull/43223) 实现早期校验。  
- **谨慎监控支出** — `max_budget` 强制执行现已更严格，尤其针对零成本模型（问题 [#29912](https://github.com/BerriAI/litellm/issues/29912)）。

> 🔗 [开发者指南：成本准确性](https://docs.litellm.ai/docs/proxy/cost_tracking) | [安全最佳实践](https://docs.litellm.ai/docs/security)

---  
*本简报由 GitHub 活动自动生成（2026-09-26）*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-26**

---

#### **1. 今日亮点**  
Unsloth 团队持续扩展对 AMD ROCm 和 Vulkan 的支持，针对 RDNA 1/2/3 显卡在模型加载、训练稳定性以及 GPU 内存管理方面的关键问题进行了修复。重要更新包括在 Studio 中新增 **基准测试页面**，用于调优推测解码和 KV 缓存设置；同时通过可选集成方式增强了对 **多引擎推理（vLLM/SGLang）** 的支持。与此同时，活跃的问题反映出在 AMD 系统上显存使用异常以及 QLoRA 训练期间崩溃的持续性问题。

---

#### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
- **PR #11808**：在 Unsloth Studio 中引入 **基准测试页面**，可对已加载的 GGUF 模型进行推测解码、KV 缓存类型及内存卸载设置的全面扫描，帮助用户通过实测调优不同配置下的性能表现。[查看 PR](https://github.com/unslothai/unsloth/pull/11808)  
- **PR #11491**：新增可选支持 **vLLM 与 SGLang** 作为 Studio 中的替代推理引擎，实现多 GPU 服务、量化处理以及视觉模型支持。默认不安装，由用户自主控制。[查看 PR](https://github.com/unslothai/unsloth/pull/11491)

---

#### **3. 新模型与硬件支持**  
- **AMD ROCm 7.14 / 10**：用户请求支持超过 7.2 版本的 ROCm（如 ROCm 10），Issue #9932 呼吁安装器中增加显式版本选择功能。[Issue #9932](https://github.com/unslothai/unsloth/issues/9932)  
- **Vulkan 训练**：Issue #11184 跟踪社区实验后对通过 Vulkan 后端实现训练/微调的支持需求。[Issue #11184](https://github.com/unslothai/unsloth/issues/11184)  
- **ModelScope 集成**：Studio 现已支持从 **ModelScope** 拉取模型/数据集，作为 Hugging Face 的替代方案，适用于受限网络环境。[PR #11761](https://github.com/unslothai/unsloth/pull/11761)  
- **Qwen-Image-2.1 GGUF**：正在修复 Docker 环境中 FP8 编码器加载失败及模型检测错误的问题。[Issue #11638](https://github.com/unslothai/unsloth/issues/11638)，[Issue #11890](https://github.com/unslothai/unsloth/issues/11890)

---

#### **4. 性能与优化**  
- **内存规划修复**：PR #11922 改进了图像内存规划逻辑，根据 *运行时数据类型* 而非磁盘大小分配内存——这对 SDXL 模型至关重要，因其在 `bf16` 下加载仅需 24GB VRAM，但在 `fp32` 下却显示为超大尺寸。[PR #11922](https://github.com/unslothai/unsloth/pull/11922)  
- **去噪效率提升**：PR #11843 确保图像/视频去噪操作仅在一个渲染线程上运行，以保留 **cuDNN 基准与 SDPA 执行缓存**，降低重新编译开销。[PR #11843](https://github.com/unslothai/unsloth/pull/11843)  
- **动态编译优化**：多个 PR（如 #11842、#11880）消除了在第二次提示生成时对 Qwen-Image 与 MiniMax-H3 流水线的冗余重编译，将延迟从 15–50 秒显著降低。[PR #11842](https://github.com/unslothai/unsloth/pull/11842)，[PR #11880](https://github.com/unslothai/unsloth/pull/11880)  
- **Hadamard 旋转提升精度**：PR #11835 对 Qwen-Image-2.1 的 int8 变换器应用 Hadamard 旋转，使 LPIPS 分数从 0.066 提升至接近 `bf16` 基线水平（48 组种子中 11 组 >0.10 的指标得到改善）。[PR #11835](https://github.com/unslothai/unsloth/pull/11835)

---

#### **5. 稳定性与回归问题**  
今日报告的高严重性问题：  
1. **训练期间 GPU 崩溃（AMD）**：  
   - Issue #11498：在 RX 7900 XTX 上进行 QLoRA 训练时触发 **AMDGPU VM 故障** 并导致 GPU 重启，即使更新后仍可复现。[Issue #11498](https://github.com/unslothai/unsloth/issues/11498)  
   - Issue #10563：4-bit 反量化使用缓存的 GPU 流，在动态流变化下引发不稳定。[Issue #10563](https://github.com/unslothai/unsloth/issues/10563)  
2. **AMD 上模型加载失败**：  
   - Issue #9792：`Qwen3.8-27B V3 GGUF` 在 R9700（Vulkan）上预填充后崩溃；V2 版本正常工作。[Issue #9792](https://github.com/unslothai/unsloth/issues/9792)  
   - Issue #7449：Strix Halo（AMD APU）虽有可用显存，但模型仍被加载至系统内存。尽管启用 GPU 计算，但未使用显存。[Issue #7449](https://github.com/unslothai/unsloth/issues/7449)  
3. **Studio 服务器在图像生成时崩溃**：  
   - Issue #9130：GPU 内核失败（`hipErrorLaunchFailure`）导致未捕获的 C++ `terminate`，直接终止整个 Studio 服务器进程。[Issue #9130](https://github.com/unslothai/unsloth/issues/9130)  

> ✅ **正在进行修复**：PR #11808（基准测试）、#11984（模型固定）和 #11929（MXFP4 LoRA）正在评审中。

---

#### **6. 对应用开发者的意义**  
- **构建跨后端健壮应用**：随着 vLLM/SGLang 支持及 ROCm/Vulkan 采用率上升，您的应用现在可几乎无需配置变更地部署于 **非 CUDA 硬件**。使用新的 `--engine=vllm` 或 `--engine=sglang` 标志即可。  
- **动态调优推理性能**：即将推出的基准测试页面将支持自动扫描推测解码、KV 缓存类型与卸载策略——非常适合生产环境中的部署优化。  
- **避免 GPU 不稳定**：若在 AMD 平台（尤其是 RDNA 1/2）部署，请暂勿使用 `4-bit dequantize` 流程，直至 PR #10563 合并。建议优先使用 `bnb-4bit` 配合 `load_in_8bit` 回退机制。  
- **谨慎处理大模型**：对于如 Qwen-Image-2.1 的图像/视频模型，务必验证数据类型一致性（如 `int8` 与 `bf16`），防止内存过度分配与崩溃。  
- **善用缓存机制**：设计工作流时应尽量复用去噪线程（通过单线程渲染），以利用 cuDNN 与 SDPA 缓存重用——这对实时应用至关重要。

> 🔗 **推荐工作流**：使用 ROCm 7.14+ 在 AMD 平台上测试所有自定义流水线，并监控 `VM fault` 错误。仅当未设置 `load_in_16bit` 时，才使用 `unsloth-zoo` 的打包专家进行 MXFP4 LoRA 训练。[PR #11929](https://github.com/unslothai/unsloth/pull/11929)

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*