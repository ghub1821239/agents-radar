# AI 基础设施日报 2026-10-13

> 生成时间: 2026-10-13 03:09 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-13**

---

### **1. 生态概览**  
AI推理与服务生态正进入高度专业化阶段，各项目聚焦于高性能执行、原生代理能力以及跨平台一致性。vLLM 在原始吞吐量和内核级优化方面处于领先地位，而 SGLang 则在推测性解码与解耦式服务方面不断突破边界。Ollama 与 llama.cpp 在本地化、边缘友好部署中仍占主导地位，尤其适用于 Apple Silicon 和异构硬件。Unsloth 通过浏览器自动化与多模态工具链重新定义了代理工作流，标志着从纯模型服务向 *交互式系统编排* 的转变。与此同时，LiteLLM 持续巩固其作为智能网关层的地位，优先保障混合云环境中的计费准确性与可观测性。

---

### **2. 活跃度对比**

| 项目       | 问题（开放） | PR（开放） | 发布状态       |
|------------|--------------|------------|----------------|
| **vLLM**   | 147          | 89         | 无（重大变更待定） |
| **SGLang** | 112          | 76         | 无（关键崩溃正在飞行中） |
| **llama.cpp** | 153       | 91         | 无（严重 CUDA/Metal 回退） |
| **Ollama** | 198          | 114        | `v0.40.4-rc0`（高危回退） |
| **LiteLLM** | 103        | 68         | 无（成本对齐修复进行中） |
| **Unsloth** | 121        | 73         | `v0.1.906-beta`（浏览器代理测试版） |

> 🔍 **洞察**：Ollama 展现出最高的活跃度，反映出其快速创新的同时，近期发布周期中稳定性持续下降。Unsloth 凭借专注于新型代理功能的稳定测试版脱颖而出。

---

### **3. 模型支持竞赛**

| 新模型 / 架构               | 支持项目             | 备注 |
|------------------------------|----------------------|------|
| **Cloudflare/clef-flash**   | vLLM ✅              | 通过 `/v1/systemone`，基于 Qwen3.5 内核 |
| **Qwen3.8-Flash-Next-FP8/Quark-MXFP4** | vLLM ✅, ROCm 专注 | 关注 AMD MI355X/MI325X 性能表现 |
| **GLM-5.3-Flash**           | SGLang ✅, vLLM 🟡   | SGLang 支持 CP+TP 共置；vLLM 存在 ROCm 问题 |
| **pplx-decider (D3系列)**    | llama.cpp ✅         | 通过 `model: support vllm d3 models` 完整支持 |
| **EmbeddingGemma 2**        | Ollama ✅（实验性）  | 依赖更新后的 llama.cpp |
| **Qwen-Image-2.1-Turbo**    | Unsloth ✅           | 原生 8 步图像生成；解决此前误分类问题 |
| **LTX-2.5 FP8/INT8**        | Unsloth ✅           | 预量化 DiT 加载避免重复量化 |
| **K2 Horizon (k2-horizon)** | Ollama 🟡（请求中）  | MBZUAI IFM 请求；尚未实现 |

> 🏆 **领先者**：**vLLM** 在前沿模型与硬件支持上保持优势，尤其在 Qwen 系列及 AMD ROCm 方面。**Unsloth** 在 *多模态代理就绪* 模型如 Qwen-Image-2.1-Turbo 上领先。

---

### **4. 性能前沿**

| 优化重点                 | 核心项目与亮点 |
|--------------------------|----------------|
| **KV Cache 与推测性解码** | vLLM：Mamba block-table 融合（**7倍加速**），推测预热内核；SGLang：EAGLE 推测解码索引优化；Unsloth：M 系列支持推测性解码 |
| **内核融合与 Triton**    | vLLM：ROCm 上 QK-norm+RoPE+gate 融合；llama.cpp：AMX Q4_K 解码（+13% TG）；SGLang：Monokernel RFC 实现持久复用 |
| **量化效率**             | vLLM：前向过程中选择 NVFP4（W4A4/W4A16）；SGLang：Marlin 上 NVFP4 MoE LoRA；Unsloth：优化的 MoE GGUF 推理（+22%） |
| **分布式服务与解耦**     | SGLang：Prefill-decode 解耦（PD）、MTP/TP 共置；vLLM：MoE + LoRA CUDA graph 稳定性修复 |
| **边缘与本地运行时**     | llama.cpp：Vulkan/FMA 打包、Metal 修复；Unsloth：M 系列 CPU 卸载、Wayland 支持 |

> 🚀 **前沿领导者**：**vLLM** 在低延迟、高吞吐的内核优化方面占据主导。**SGLang** 在分布式代理架构方面领先。**Unsloth** 在边缘本地化、代理能力性能方面表现卓越。

---

### **5. 层级定位**

| 项目       | 主要层级              | 角色摘要 |
|------------|------------------------|----------|
| **vLLM**   | **服务引擎**           | 高性能推理引擎；针对 GPU 内核、MoE 与推测性解码优化 |
| **SGLang** | **服务引擎 + 网关**    | 高级推理编排，支持 PD、多阶段推测解码与后端抽象 |
| **llama.cpp** | **本地运行时**       | 跨平台、轻量级运行时，支持 CPU/GPU/MLX/NPU；适用于边缘与离线场景 |
| **Ollama** | **网关 + 本地运行时**  | 统一 CLI/工具链，封装 llama.cpp；聚焦易用性与模型管理 |
| **LiteLLM** | **LLM 网关 / 代理**   | 智能路由层，支持成本控制、计费对齐与 OpenTelemetry 集成 |
| **Unsloth** | **代理平台 / 训练工具** | 全栈代理框架，支持浏览器交互、训练模式与多模态支持 |

> ⚖️ **定位洞察**：技术栈已形成清晰分层——**引擎（vLLM/SGLang）** → **运行时（llama.cpp）** → **网关（LiteLLM/Ollama）** → **代理平台（Unsloth）**。

---

### **6. 趋势信号**

#### 🔥 **新兴行业趋势**：
1. **以代理为中心的执行**：浏览器自动化（Unsloth）、程序化缓存控制（SGLang）、工具调用鲁棒性（Ollama/LiteLLM）表明，系统正从静态推理转向 *交互式、有状态代理*。
2. **硬件专业化**：AMD ROCm 受益于 vLLM、SGLang、Unsloth 的支持而加速发展，但稳定性短板依然存在。Apple Silicon（Ollama、Unsloth）仍是边缘/本地任务的关键。
3. **成本与计费完整性**：LiteLLM 对成本对齐测试与 Redis SSL 修复的关注，反映了生产环境中对可审计性与财务控制的需求日益增长。
4. **推测性解码成熟化**：现已集成至多个技术栈（vLLM、SGLang、Unsloth），重点聚焦启动延迟与长上下文性能。
5. **多模态代理就绪**：对 Qwen-Image-2.1-Turbo 的支持及扩散训练模式的出现，表明视觉语言与文本扩散流水线正从研究走向生产。

#### 📌 **应用开发者应关注事项**：
- **避免使用 `v0.40.4-rc0`（Ollama）**，直至 MLX/RTX 5090 问题解决。
- **监控 vLLM 在 MoE + LoRA 场景下的 CUDA graph 死锁**——对大规模代理至关重要。
- **利用 Unsloth 的浏览器代理**，用于研究或自动化工具中的动态网页交互。
- **若使用 LiteLLM 搭配 Gemini 或 Claude，务必验证成本对齐**，确保计费准确。
- **为 Qwen3.8-Flash-Next 与 LTX-2.5 做好准备**——预计将带来更快、更高效的多模态推理。

---

> ✅ **最终结论**：基础设施格局已不再仅关注原始推理速度。核心在于 **在多样化硬件上实现智能、可靠、代理感知的执行** ——性能、稳定性与开发者体验在此交汇。未来属于能够统一这些维度的平台。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-13

---

### **1. 今日亮点**  
vLLM 持续保持激进的优化势头，关键 PR 提升了推测解码的启动延迟和 Mamba 内核效率，同时针对 AMD ROCm 平台对 Qwen3.8 系列模型在 MI355X/MI325X 上进行了针对性性能优化。关键稳定性修复已合并，解决了 MoE + LoRA 工作负载下 CUDA graph 死锁问题以及 logits 中 NaN 检测缺陷。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告发布或破坏性变更。*  
但以下重要变更正在进行中：  
- `--mamba-cache-mode` 已弃用且不再生效 (#60043)。  
- 环境变量 `VLLM_COMPUTE_NANS_IN_LOGITS` 将被 CLI 标志 `--enable-detect-nans-in-logits` 取代，以提升配置清晰度 (#50283)。

---

### **3. 新模型与硬件支持**  
- ✅ **新模型**：通过 `/v1/systemone` 原生支持 **Cloudflare/clef-flash**，基于 Qwen3.5 骨干架构及联合模式头 (#61308)。  
- 📌 **ROCm (AMD)**：  
  - 针对 **Qwen3.8-Flash-Next-Quark-MXFP4** 在 gfx950 / MI355X 上启动性能优化追踪 (#59575)。  
  - 在 ROCm 上为 Qwen3-Next/Qwen3.5 启用融合的 QK-norm+RoPE+gate Triton 内核 (#51406)。  
- 🔧 **硬件/后端**：  
  - 请求为 **DeepSeek-V4-Flash-0731** 添加 SM8x（Ampere: A100/A800, RTX 30xx）支持 (#50576)。  
  - 继续聚焦 **MI325X (gfx942)** 平台对 GLM-5.3 和 Qwen3.8 模型的稳定性和性能优化 (#57429, #58688)。

---

### **4. 性能与优化**  
- ⚡ **推测解码**：现已支持在 CUDA 上预热 top-k/top-p 与贪婪拒绝内核，显著降低首次请求延迟 (#59260)。  
- 🔥 **内核融合**：  
  - Mamba block-table gather 已融合至单个 Triton 内核 —— 所有形状下实现 **7 倍加速** (#58737)。  
  - DFlash draft-input 填充操作实现并行化 —— 每个工作组节省高达 **35.8μs/步** (#58633)。  
- 📈 **量化**：  
  - 在 SM120/SM121 上为路由专家引入每前向传播级的 NVFP4 精度选择（W4A4/W4A16），优化解码吞吐量与内存带宽平衡 (#54617)。  
  - FlashInfer NVFP4 KV cache 因因果预填充在 SM120 上比 FP8 慢约 1.7–1.8 倍 —— 标记为回归问题 (#50416)。  
- 🛠️ **构建与工具链**：  
  - DeepGEMM 依赖版本更新至最新公开发布版（26/09/30），包含分页稀疏 MQA 松弛功能 (#61149)。

---

### **5. 稳定性与回归问题**  
- ❌ **严重级别**：  
  - 在张量并行（TP=2/4）下使用全分片 LoRA 的 MoE 模型时，出现 CUDA Graph 死锁 —— 使用兼容 Qwen3.5 的 35B-A3B MoE 模型可复现 (#60845)。*修复待处理*。  
- ⚠️ **高严重性**：  
  - **DeepSeek-V4.1-Flash** 在 H20（SM90）上高并发场景下因 `dsv4_topk` MoE 内核非法内存访问而崩溃；可通过设置 `max_num_seqs=256` 缓解 (#56389)。  
  - **GLM-5.3-Flash** 引擎在 MI325X 上执行 aiter 融合式 MoE 步骤时无声挂起；无错误日志 —— 可能为特定硬件问题 (#57429)。  
- ⚠️ **中等严重性**：  
  - `HIT_PENDING` 缺少超时机制，导致写入阻塞请求直至客户端超时 (#49829)。  
  - 移除 `mamba_cache_mode="all"` 后，`--mamba-block-size` 被忽略 (#60838)。  
  - `Qwen3.8-Flash-Next-FP8` 在 ROCm 上因 AMD 嵌入层缺失 `weight_scale` 而无法加载 (#58688)。

---

### **6. 对应用开发者的启示**  
- **使用 `--enable-detect-nans-in-logits`** 可主动检测并终止异常推理请求 —— 对依赖确定性输出的生产级代理至关重要。  
- **避免使用 `--mamba-cache-mode`**；该参数已弃用且无效。请改用更先进的缓存策略。  
- **对于高并发部署**，需监控 `max_num_seqs` 限制 —— 特别是使用 DeepSeek-V4.1 或 MoE 模型的 H20/MI325X 平台。  
- **近期 PR 已显著改善推测解码的启动时间** —— 非常适合低延迟代理工作流。  
- **尽早验证模型兼容性** —— 新模型如 Clef-Flash 或 Qwen3.8-Flash-Next 可能需要特定的 ROCm 或 CUDA 配置。  
- **持续关注夜间 CI 结果** —— AMD GPU 回归问题正在积极追踪，但部分问题（如 Qwen3.8-Flash-Next-FP8 加载失败）仍未解决。

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [PRs](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-13**

---

### **1. 今日亮点**  
SGLang 项目在 **预填充-解码分离（PD）** 和 **DeepSeek V4.1/Flash 支持** 方面持续保持强劲势头，关键 PR 实现了 GLM-5.3-Flash 的共置预填充 CP + 解码 TP，推进多阶段推测解码优化。关键稳定性修复已合并至 DSpark 与 FlashInfer JIT 崩溃问题，同时新提出的 RFC 为单核（monokernels）和改进的扩散服务奠定了基础。

---

### **2. 发布与破坏性变更**  
*无*。过去 24 小时内未报告新版本发布或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- ✅ **GLM-5.3-Flash**：通过 `#43972`（草案）新增对共置预填充上下文并行（CP）和解码注意力张量并行（TP）的支持，目标后端为 MTP 与 DFlash2。  
- ✅ **MiniCPM-V 4.7**：新增使用手册（`#43829`），指导该新兴视觉语言模型的部署。  
- ✅ **NPU 支持**：在 Ascend NPU 上扩展 `prefill-complete` 功能（`#43970`），并在 XPU 上实现完整的预填充图支持（`#30980`）。  
- 🚧 **AMD ROCm**：持续优化 HiCache 性能（`#34611`）和 FP8 GEMM 精度问题（`#43526`），近期已修复 DSV4.1 稀疏解码问题（`#43765`）。

---

### **4. 性能与优化**  
- 🔥 **推测解码**：针对 EAGLE 推测解码 KV 索引构建进行优化（`#42803`），以降低长上下文（90k–170k token）下的延迟。  
- ⚙️ **DeepSeek V4.1**：在 TP2 下启用融合小批量解码内核（`#43838`），无需依赖 TP4 即可提升效率。  
- 📈 **LoRA 栈完成**：LoRA 运行时栈最终阶段已落地（`#42888`, `#42887`, `#42885`, `#42884`, `#42883`），新增 Marlin 上的 NVFP4 MoE LoRA、B200/GB300/H200 的 FP8 tile 表，以及 CuTeDSL BF16/GEMMs —— 对 Blackwell 上低比特推理至关重要。  
- 🔄 **单核框架**：提出 RFC（`#43949`），旨在统一各层的内核执行，目标是实现持久化内核复用并减少启动开销。

---

### **5. 稳定性与回归问题**  
- ❌ **严重崩溃**：推测解码在首个非贪心请求时导致服务器崩溃，原因为 pip 安装包中 FlashInfer JIT 失败（`#43412`）。*修复待处理。*  
- ❌ **内存损坏**：DSpark 紧凑稀疏 CUDA Graph 使用不兼容的请求槽几何结构（`#34384`）。  
- ❌ **运行时错误**：`--bf16-gemm-backend gemv` 被接受但对未量化线性层无效（`#42085`）。  
- ❌ **模型特定崩溃**：DeepSeekV4TokenToKVPool 缺少 `get_cpu_copy()` → 解码模式回退失败（`#33385`）。  
- ⚠️ **不稳定的 CI**：在 NVIDIA `PR Test Base/Extra` 运行中持续出现测试失败（`#42752`）——影响 PR 验证速度。

---

### **6. 对应用开发者的影响**  
- **智能体工作负载**：随着程序化缓存控制（`#27574`）和位置无关重用（`#30928`）逐步成熟，可期待更优的 KV 缓存复用与可预测性。  
- **高吞吐服务**：可放心使用 `--disaggregation-mode decode` —— PD 已在多数模型上稳定，包括 SWA、HiCache 与推测解码。  
- **多模态与扩散**：关注 Q4 路线图更新（`#43313`）——MiniMax-H3 将成为无损/有损扩散服务的压力测试案例。  
- **生产就绪性**：在 `#43412` 修复前，请避免在非贪心采样中使用 `--speculative-algorithm DSPARK`；建议在预发环境优先采用贪心路径。  
- **新模型部署**：使用 CP+TP 共置部署 GLM-5.3-Flash（`#43972`），并借助新使用手册部署 MiniCPM-V 4.7（`#43829`）。

👉 [查看顶级问题](https://github.com/sgl-project/sglang/issues?q=is%3Aissue+sort%3Aupdated-desc) | [最新 PR](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+sort%3Aupdated-desc)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 消息简报 – 2026-10-13**

---

### **1. 今日亮点**  
`llama.cpp` 项目在 **VLLM D3 模型支持** 和 **多序列推测解码修复** 方面取得显著进展，提升了与下一代决策模型如 `pplx-decider` 的兼容性。针对 Metal、Vulkan 及 CUDA 后端的关键稳定性改进已合并，重点优化了张量核正确性、内存分配以及推理过程中的计算图重分配问题。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未发布新标签版本。但已有若干 **关键修复** 合并至主干：

- **修复 VLLM D3 多序列场景问题**（`#30408`）：解决了在非因果注意力与混合解码结合多个序列时的异常行为。
- **无缓存注意力的 KV 缓存填充修复**（`#30416`）：确保大头尺寸（如 512）下 flash attention 核心的正确对齐，防止 CUDA 上崩溃。
- **计算图重分配报告功能**（`#30329`）：通过 `ggml_backend_sched_realloc_callback` 添加可选回调支持，允许用户监控长时间推理会话中的缓冲区增长情况。

> 🔗 [PR #30408](https://github.com/ggml-org/llama.cpp/pull/30408) | [PR #30416](https://github.com/ggml-org/llama.cpp/pull/30416) | [PR #30329](https://github.com/ggml-org/llama.cpp/pull/30329)

---

### **3. 新模型与硬件支持**  
- ✅ **VLLM D3 模型**：通过 `model: support vllm d3 models`（`#30383`）新增对 `pplx-decider` 及其他 D3 系列模型的完整支持，使高级推理流水线可集成草稿模型。
- ✅ **Metal 后端修复**：解决大张量上的 `kernel_mul_mm` 错误（`#28748`）及 `mul_mat_id` 中重复 ID 处理问题（`#30373`），提升 Apple Silicon 平台可靠性。
- ✅ **Vulkan 优化**：引入 f16 累加的 FMA 打包机制，无需点积操作（`#29877`），在支持设备上显著提升性能。
- ✅ **Hexagon 后端增强**：新增 Q1_0 量化支持（`#30122`），优化 CPY/CONCAT 操作（`#30341`），并支持可配置的 HTP 电源模式（`#30423`）。

> 🔗 [PR #30383](https://github.com/ggml-org/llama.cpp/pull/30383) | [PR #28748](https://github.com/ggml-org/llama.cpp/pull/28748) | [PR #29877](https://github.com/ggml-org/llama.cpp/pull/29877) | [PR #30122](https://github.com/ggml-org/llama.cpp/pull/30122)

---

### **4. 性能与优化**  
- 🚀 **Q2_K GPU 溢出修复**（`#29910`）：通过优化展开策略，减少 AMD GPU 上的 VGPR 溢出，提升低比特量化下的吞吐量。
- ⚡ **AMX Q4_K 解码加速（+13% TG）**（`#30429`）：重构 Q4_K 内核中的列遍历逻辑，直接广播激活的双字节到各列，显著提升 AMX 兼容 CPU 上的解码速度。
- 🔍 **Vulkan RMS 归一化优化**（`#29882`）：以两级子组归约替代工作组归约，在 Intel Arc B70、RTX 4060 Ti 与 AMD 7900 XT 上实现可观性能提升。
- 💡 **OpenVINO 发布改进**（`#30324`, `#30401`）：CI 现在以 `GGML_NATIVE=OFF` 构建 OpenVINO 变体，并修正下载链接，确保生成兼容 CPU 的二进制文件及稳定发布分发。

> 🔗 [PR #29910](https://github.com/ggml-org/llama.cpp/pull/29910) | [PR #30429](https://github.com/ggml-org/llama.cpp/pull/30429) | [PR #29882](https://github.com/ggml-org/llama.cpp/pull/29882) | [PR #30324](https://github.com/ggml-org/llama.cpp/pull/30324)

---

### **5. 稳定性与回归问题**  
今日报告的严重问题包括：

| 问题 | 严重程度 | 状态 | 修复 PR？ | 链接 |
|------|----------|--------|---------|------|
| **Vulkan 上 Flash Attention 因 O(N²) 回退导致崩溃**（`#27638`） | ⚠️ 高 | 开放 | ❌ | [问题 #27638](https://github.com/ggml-org/llama.cpp/issues/27638) |
| **CUDA 图导致 GPU 通道挂起（RTX 5090 笔记本）**（`#27330`） | 🔥 严重 | 开放 | ✅ 临时方案：`GGML_CUDA_DISABLE_GRAPHS=1` | [问题 #27330](https://github.com/ggml-org/llama.cpp/issues/27330) |
| **Vulkan 提交失败引发 `ErrorDeviceLost`**（`#30010`） | ⚠️ 高 | 开放 | ❌ | [问题 #30010](https://github.com/ggml-org/llama.cpp/issues/30010) |
| **Metal `mul_mat_id` 在重复专家 ID 时报错**（`#30373`） | ⚠️ 中等 | 已修复 | ✅ 已合并 | [PR #30373](https://github.com/ggml-org/llama.cpp/pull/30373) |
| **多 GPU MTP 提示处理性能减半**（`#27428`） | ⚠️ 中等 | 开放 | ❌ | [问题 #27428](https://github.com/ggml-org/llama.cpp/issues/27428) |

> 注：多个高影响缺陷仍开放，但已有已知临时方案或部分修复。

---

### **6. 对应用开发者的启示**  
- **安全使用 `--spec-type mtp` 搭配 D3 模型**：经近期合并后，可在多序列场景中安全运行 `pplx-decider` 及其他 D3 模型的推测解码，不再出现正确性问题。
- **通过 `realloc_callback` 监控内存使用**：启用 `ggml_backend_sched_set_realloc_callback()` 可提前发现缓冲区溢出——对长时间运行的智能体或批处理推理服务器至关重要。
- **避免 RTX 5090 笔记本上的 CUDA 图挂起**：在永久修复前，请使用 `GGML_CUDA_DISABLE_GRAPHS=1` 防止 GPU 死锁。
- **针对 AMX/Q4_K 与 AMD Q2_K 进行优化**：最新内核优化带来实际收益，尤其适用于不使用 logits 的嵌入/重排序流水线。
- **期待跨后端一致性提升**：Vulkan、Metal 与 OpenVINO 正趋于稳健，更易于在多平台部署统一推理栈。

> ✅ **建议**：升级至最新主干（b11577+）以获得稳定性提升和新模型支持。谨慎使用 `--cache-ram`——并发负载下仍存在已知竞态条件（`#27148`）。

---  
📌 **项目主页**：[https://llama.app](https://llama.app)  
📌 **最新验证信息**：[GitHub Attestations](https://github.com/ggml-org/llama.cpp/attestations/)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-13**

---

### **1. 今日亮点**  
最新发布的 `v0.40.4-rc0` 版本对 llama.cpp（b11521）进行了关键更新，提升了决策模型与 EmbeddingGemma 2 的支持能力，同时通过重用清单文件优化推理路径效率。多个高严重性稳定性问题正在积极修复中，包括 Apple Silicon 上的 MLX 内核崩溃以及 RTX 5090 上的 CUDA 内存访问错误。

---

### **2. 发布与破坏性变更**  
- **`v0.40.4-rc0`**：  
  - 升级 `llama.cpp` 至提交 `b11521`，增强对 **决策模型** 和 **EmbeddingGemma 2** 的支持。  
  - 在推理路径中引入 **清单重用优化**（`server: reuse verified manifests and loaded models`），减少重复加载模型的开销。  
  - *迁移提示*：使用大规模 MLX 或云模型的用户应测试与 `qwen3.6:35b-mlx` 及 `gemma4` 变体的兼容性，因存在活跃回归问题（详见稳定性部分）。  
  🔗 [发布说明](https://github.com/ollama/ollama/releases/tag/v0.40.4-rc0)

---

### **3. 新模型与硬件支持**  
- **新模型**：  
  - 通过更新后的 `llama.cpp` 添加对 **EmbeddingGemma 2** 的实验性支持。  
  - PR #18967 引入 **Prism 三元 GGUF** 支持（PQ2_0/PTQ1_0 类型），解决如 `Ternary-Bonsai-2-27B-gguf` 等模型的导入失败问题。  
- **硬件与后端**：  
  - 正在推进对 **K2 Horizon** 模型（架构 `k2-horizon`）的支持（问题 #18698）——由 MBZUAI IFM 提出需求。  
  - 云后端新增 **Clef** 与 **Clef Flash** 模型（PR #18969）。  
  - MLX 运行时持续扩展对 Apple Silicon（M 系列）及混合架构的支持。

---

### **4. 性能与优化**  
- **性能下降警报**：  
  问题 #18968 报告自 `v0.40.1` 以来所有模型吞吐量下降 **25–30%**，基准测试中每秒生成令牌数显著降低，正在调查中。  
- **内核级优化**：  
  - PR #18964 通过基于 *已评估* 令牌的速率限制提升提示阶段计时准确性，修复了预热缓存场景下 `prompt_per_second` 值被高估的问题。  
  - PR #18973 修复小 `num_ctx` 值（如 30）时多模态嵌入加载错误，通过将批处理大小调整为实际模型上下文（≥2048）避免 500 错误。  
- **内存效率**：  
  PR #18975 探索工具调用的结构化输出改进，旨在减少基于语法响应中的冗余状态膨胀。

---

### **5. 稳定性与回归问题**  
**严重回归（高严重性）**：  
1. **Apple Silicon（M 系列）上 MLX 内核崩溃**：  
   - `panic: mlx: Maximum threads per threadgroup is 896 but requested 960`（问题 #18966, #18940）。  
   - 影响 M2 Max/M3 Ultra 上的 `qwen3.8:27b`、`gemma4:31b` 等大头模型。  
   - **修复进行中**：PR #18974 针对 JSON 状态提示对齐；PR #18967 可能解决底层内核限制。  
   🔗 [问题 #18966](https://github.com/ollama/ollama/issues/18966) | 🔗 [PR #18974](https://github.com/ollama/ollama/pull/18974)  

2. **RTX 5090（Windows）上 CUDA 非法内存访问**：  
   - 使用 Cohere MoE 模型进行提示评估时出现一致崩溃（问题 #18642）。  
   - 尚无修复方案；可能与新显卡驱动/CUDA 栈交互有关。  
   🔗 [问题 #18642](https://github.com/ollama/ollama/issues/18642)  

3. **MLX Runner 与 `qwen3.6:35b-mlx` 兼容性崩溃（回归）**：  
   - 在 `v0.40.x` 中失败，但在 `v0.35.0` 中正常运行（问题 #18856）。  
   - 表明近期 MLX 运行时更改引入了破坏性行为。  
   🔗 [问题 #18856](https://github.com/ollama/ollama/issues/18856)  

**其他重要问题**：  
- Windows 上 `ollama list` 在 NTFS 挂载点上失败（问题 #18921）；已在 PR #18949 中修复。  
- 云模型的 JSON Schema 被忽略（问题 #12362）；影响 `qwen3-coder:480b-cloud`。  
- 设置 `format: json` 时工具调用失败（问题 #18944）。

---

### **6. 对应用开发者的启示**  
- **若在 Apple Silicon 上使用 MLX**，请避免使用 `v0.40.4-rc0` —— 大模型（如 `qwen3`、`gemma4`）可能出现崩溃。必要时可临时降级至 `v0.35.1`。  
- **验证工具调用流程** —— 当前设置 `format: json` 会中断工具使用（问题 #18944）；请暂时使用 `tool_calls` 并不指定 `format` 直到修复。  
- **监控性能退化** —— 若应用依赖高吞吐推理，请以 `v0.40.1` 为基准进行性能测试，并避免使用 `v0.40.4-rc0`，直至回归问题解决。  
- **准备应对云模型模式合规性** —— 确保客户端对 `qwen3-coder:480b-cloud` 等模型进行校验，因模式强制执行存在不一致性。  
- **使用 `OLLAMA_KEEP_ALIVE=-1` + 预热机制** —— 可考虑功能请求 #18952，以在生产代理中实现首次响应的即时延迟。

> ✅ **行动项**：关注 PR #18975（工具调用）、#18974（MLX JSON）、#18964（计时）的修复进展。跟踪问题 #18968 获取性能更新。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-10-13**

---

### **1. 今日重点**  
LiteLLM 项目持续强化核心推理与成本管理能力，针对 Gemini 上下文缓存及 Azure Claude 网络搜索定价问题进行了关键修复。新提交的 PR 引入了对 gpt-6 与 Claude 5 桥接路径的稳健成本一致性测试，确保代理调用与原生 API 调用之间的计费一致。此外，一项关键修复解决了流式响应中非标准 SSE 错误码的静默失败问题，提升了下游代理系统可靠性。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但当前工作包括：  
- **成本一致性测试扩展**：通过 PR [#46139](https://github.com/BerriAI/litellm/pull/46139)、[#46140](https://github.com/BerriAI/litellm/pull/46140)、[#46141](https://github.com/BerriAI/litellm/pull/46141) 与 [#46137](https://github.com/BerriAI/litellm/pull/46137) 新增了针对 gpt-6、Claude 5 及 Bedrock Converse 模型的 `BridgeCostParityTestCase` 测试对，确保桥接 `/v1/messages` → `/v1/responses` 路由与原生端点计费完全一致。  
- **计费修正**：PR [#46144](https://github.com/BerriAI/litellm/pull/46144) 确保上下文缓存创建的 token 现在从 `cachedContents` 响应中计费，修复了 Gemini/Vertex AI 工作流中的计费不足问题。

---

### **3. 新模型与硬件支持**  
*今日未引入新的模型或硬件支持。*  
但有显著进展：  
- **AWS Bedrock 自动发现** 正在积极开发中（问题 #43568），目标是无需手动配置即可自动发现可用的 Bedrock 模型。  
- **Claude Code 每轮控制支持** 正在优化；如 PR [#46047](https://github.com/BerriAI/litellm/pull/46047) 所示，已解决后端分块缺失 `choices[].index` 时引发的流式错误，使代理流程中的工具调用更加可靠。

---

### **4. 性能与优化**  
*今日未落地直接的吞吐量或延迟改进。*  
但重大优化工作正在进行中：  
- **成本追踪精度提升**：新增 `store_batch_line_items_in_callbacks`（PR #41691）功能，即使在服务商侧批次文件过期后，仍可保留每请求的 JSONL 数据，显著提升审计能力和成本归因准确性。  
- **追踪完整性增强**：PR [#42079](https://github.com/BerriAI/litellm/pull/42079) 在追踪响应中添加 W3C `traceresponse` 头部，允许开发者通过标准 OpenTelemetry 工具将请求跨度与网关层级追踪关联。

---

### **5. 稳定性与回归问题**  
今日报告的主要稳定性问题：

1. **Gemini 3 temperature 注入漏洞**（问题 #45333）：  
   - `VertexGeminiConfig` 会强制所有 Gemini 3 模型设置 `temperature=1.0`，即使未显式指定，而谷歌未来模型将拒绝此类参数。  
   - ✅ **修复中**：PR #38663 已部分解决此问题，后续将进一步优化。  
   [GitHub 问题](https://github.com/BerriAI/litellm/issues/45333)

2. **Redis SSL check_hostname 崩溃**（问题 #34614）：  
   - v1.93.0 版本报错 `TypeError: AbstractConnection.__init__() got an unexpected keyword argument 'ssl_check_hostname'`。  
   - ❗ **高严重性**：阻塞基于 Redis 的缓存与预算功能。  
   - 🔧 **临时方案**：降级至 v1.92.0 或手动打补丁，直至修复上线。  
   [GitHub 问题](https://github.com/BerriAI/litellm/issues/34614)

3. **流式响应 500 错误源于 NoneType + int**（问题 #46047）：  
   - 当后端分块缺失 `choices[].index` 时，导致流式终止阶段运行时崩溃。  
   - ✅ **修复 PR 待合并**：PR #46047 旨在优雅处理缺失索引情况。  
   [GitHub 问题](https://github.com/BerriAI/litellm/issues/46047)

---

### **6. 对应用开发者的启示**  
- **确保计费准确**：若使用 Gemini 上下文缓存或 Azure Claude 网络搜索，请更新至最新版本以避免计费不足（参见 PR #46144, #46135）。  
- **避免 Redis 故障**：若使用 Redis 进行缓存或预算控制，请避免使用 v1.93.0，直至 `ssl_check_hostname` 问题修复（跟踪 PR #34614）。  
- **构建健壮代理**：将新的 `BridgeCostParityTestCase` 套件作为参考，验证自身部署的计费一致性——尤其适用于 gpt-6 与 Claude 5 模型。  
- **提升可观测性**：利用新推出的 W3C `traceresponse` 头部（PR #42079），实现跨代理与服务提供商层级的端到端请求追踪。  
- **关注代理特定回归**：若使用 Claude Code 或 MCP 工具，请留意问题如 #46093（websearch_interception 导致并行槽位泄漏）和 #46134（取消时进度丢失）。

> 💡 *实用提示*：启用 `budget_fallbacks` 并尽早测试 `max_parallel_requests` 限制——问题 #33074 与 #46093 表明，资源耗尽可能无声中断工作流。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-10-13**

---

#### **1. 今日亮点**  
最新发布的 v0.1.906-beta 版本引入了 **浏览器代理功能**，使模型能够通过点击、输入、滚动和脚本执行与网页进行交互——解锁实时自动化与工具调用能力。Qwen-Image-2.1-Turbo 现已原生支持 **8 步图像生成**，性能提升方面包括更快的 MoE GGUF 推理以及在 M 系列硬件上的推测解码。

---

#### **2. 发布与破坏性变更**  
- **v0.1.906-beta**：  
  - ✅ **浏览器代理（测试版）**：模型现在可执行鼠标操作（点击、拖拽）、输入文字、滚动页面，并通过 `browser_click(x, y)` 和 `run_script()` 运行 JavaScript。[PR #13505](https://github.com/unslothai/unsloth/pull/13505)  
  - 📌 **Qwen-Image-2.1-Turbo**：原生支持 8 步图像生成；修复了此前的误分类问题。[Issue #13328](https://github.com/unslothai/unsloth/issues/13328)  
  - 🔧 **推测解码**：已在 M 系列芯片上启用，实现更快的标记生成。  
  - ⚙️ **更快的 MoE GGUF**：优化内核调度，在高 MoE 模型上提升吞吐量约 22%。  

> *本次发布无破坏性 API 变更。*

---

#### **3. 新模型与硬件支持**  
- **模型**：  
  - ✅ **Qwen-Image-2.1-Turbo（GGUF）**：已完全集成至图像生成流水线。  
  - ✅ **LTX-2.5 FP8/INT8**：直接从预量化 DiTs 加载（`unsloth/LTX-2.5-FP8`），无需加载时重新量化。[PR #13516](https://github.com/unslothai/unsloth/pull/13516)  
  - ✅ **Ling 3.0**：功能请求已开启 ([#8532](https://github.com/unslothai/unsloth/issues/8532)) —— 预计将在后续 Studio 更新中上线。  
- **硬件与后端**：  
  - ✅ **ROCm（AMD）**：改进显存管理；修复模型卸载问题 ([#10341](https://github.com/unslothai/unsloth/issues/10341))。  
  - ✅ **M 系列（Apple Silicon）**：启用推测解码；增强 CPU 降载处理。  
  - ✅ **Wayland（Linux）**：AppImage 窗口缩放问题已修复 ([#13485](https://github.com/unslothai/unsloth/issues/13485))。  

---

#### **4. 性能与优化**  
- **MoE GGUF 推理**：通过优化内核分发与内存合并，最高提速 **22%**。  
- **推测解码**：现已支持 M 系列 CPU；在高吞吐生成期间降低延迟约 **30%**。  
- **Text-Diffusion 训练**：新增训练模式，支持使用文本提示微调扩散模型；兼容混合潜在-文本损失。  
- **内存管理**：vLLM 缓存释放现可在 NPU/XPU 设备上正确触发 ([PR #13438](https://github.com/unslothai/unsloth/pull/13438))。  

---

#### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |  
|--------|------|------|---------|  
| 🔴 高 | **Qwen2.5 72B 4bit（32K 上下文）出现 OOM** | 已关闭 | [Issue #2937](https://github.com/unslothai/unsloth/issues/2937) – 临时方案：减少上下文长度或使用梯度检查点。 |  
| 🔴 高 | **训练过程中 `UNSLOTH_RETURN_LOGITS` 被重置为 "0"** | 已关闭 | [Issue #3071](https://github.com/unslothai/unsloth/issues/3071) – 修复待确认。 |  
| 🟡 中 | **桌面应用在“新建聊天”时崩溃（索引越界）** | 已关闭 | [Issue #10288](https://github.com/unslothai/unsloth/issues/10288) – 可能是状态同步中的竞争条件。 |  
| 🟡 中 | **桌面应用中拖放功能失效** | 开放 | [Issue #13473](https://github.com/unslothai/unsloth/issues/13473) – 尚无修复方案。 |  
| 🟡 中 | **Audio.cpp 部分下载静默失败** | 已修复 | [PR #13515](https://github.com/unslothai/unsloth/pull/13515) – 现已正确处理取消与回退。 |  

---

#### **6. 对应用开发者的意义**  
- **构建具备网页交互能力的 AI 代理**：利用新浏览器代理功能，创建可自动填写表单、导航网页、提取动态内容的代理——适用于研究、客服机器人或数据采集工具。  
- **优化边缘设备表现**：借助 M 系列推测解码与 ROCm 优化，在 Apple Silicon 和 AMD GPU 上实现低延迟推理。  
- **规避隐藏陷阱**：注意 `UNSLOTH_RETURN_LOGITS` 可能在训练中被重置；尽早验证环境配置。  
- **为未来架构做好准备**：关注 Ling 3.0 与 LTX-2.5 的集成——这些将扩展下一代多模态代理的能力。  
- **使用本地模型目录**：通过 `--models-dir` 支持 ([PR #13435](https://github.com/unslothai/unsloth/pull/13435))，部署自定义模型仓库，无需依赖 Hugging Face。  

> 💡 *技巧提示*：对于高上下文任务（>20K 标记），优先选择 Qwen3 而非 Qwen2.5，因其内存管理更优，且更少出现 OOM 风险。  

---  
*本摘要基于 GitHub 数据生成：[unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*