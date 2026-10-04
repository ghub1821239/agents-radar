# AI 基础设施日报 2026-10-04

> 生成时间: 2026-10-04 01:58 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-04**

---

### **1. 生态概览**

2026年第四季度的AI推理与服务生态呈现出快速专业化、对下一代模型效率的高度聚焦，以及硬件与部署范式之间日益加剧的碎片化趋势。各项目正集中于高性能内核优化、MoE/MTP推测性解码及安全可扩展网关，同时也暴露出生产级部署中的深层稳定性问题。向混合CPU/GPU工作负载、多模态支持和原生代理工作流的转变，标志着基础设施层正从追求功能迭代速度转向注重真实场景下的可靠性。

---

### **2. 活动对比**

| 项目       | 开放问题数 | 近24小时合并的PR数 | 发布版本 | 破坏性变更 |
|---------------|-------------|------------------------|----------|------------------|
| vLLM          | 87          | 12                     | 无     | 无             |
| SGLang        | 93          | 15                     | 无     | 无             |
| llama.cpp     | 108         | 10                     | b11382   | 有（轻微）      |
| Ollama        | 72          | 6                      | 无     | 无             |
| LiteLLM       | 104         | 11                     | v1.105.0-rc.1 | 有（安全） |
| Unsloth       | 115         | 8                      | v0.1.902-beta（不稳定） | 无 |

> 🔍 *洞察*：**Unsloth** 在问题数量上领先，但PR吞吐量较低；**SGLang** 展现出最高的工程产出速度。**LiteLLM** 推出以安全为核心的RC版本，表明其在生产信任度方面已趋于成熟。

---

### **3. 模型支持竞赛**

| 新模型 / 架构               | 支持项目                          | 备注 |
|--------------------------------|----------------------------------------|-------|
| **Qwen3.8-Flash-Next (Qwen4Exp)** | vLLM, SGLang, llama.cpp, Ollama (MLX) | 各引擎全面支持；重点用于MTP/草稿生成 |
| **DeepSeek-V4.1 Flash**         | vLLM, SGLang（进行中）                | SGLang 正积极优化 mHC/TP；vLLM 实现完整 MoE 路由 |
| **Nemotron-3.5-Lightning NVFP4**| vLLM                                  | 解码追踪改进；其他引擎暂未支持 |
| **Kolibri 1 / SystemOne**       | Ollama (MLX后端)                  | 独占MLX优势；对macOS/Windows集成良好 |
| **MiniMax-M3 / H3**             | SGLang, Unsloth                         | SGLang 在AMD ROCm + FP8 优化上领先；Unsloth 增加扩散支持 |
| **LTX-2.3 多模态**              | llama.cpp（实验性）              | 首个公开 `/v1/images/generations` API 的项目 |

> 🏆 **赢家**：**SGLang** 和 **Ollama** 在前沿模型覆盖上领先，尤其在多模态和Apple Silicon生态系统中表现突出。**vLLM** 在MoE与推测性解码就绪性方面仍具优势。

---

### **4. 性能前沿**

优化工作聚焦于：

- **KV缓存与前缀缓存**：vLLM 和 SGLang 均报告 `nvfp4` 重用及 EAGLE/MTP 最后一块丢失等关键缺陷——反映出对长上下文内存效率的极致关注。
- **推测性解码**：vLLM 与 llama.cpp 在动态 MTP/draft-mtp 场景下遭遇性能退化；vLLM 在 Qwen3.5-122B 上观察到最高达14%的吞吐损失。
- **量化与内核**：  
  - **AMD ROCm/FP8**：SGLang 与 llama.cpp 在 AITER、融合内核及 `__builtin_amdgcn_perm` 优化上领先。  
  - **Q2_K/Q1_0**：llama.cpp 通过减少 VGPR 溢出与优化解包实现可观提速。
- **分布式服务**：LiteLLM 在代理追踪与预算控制方面的改进，预示多提供商编排复杂度持续上升。
- **内核级创新**：SGLang 的 `cake_kernels`、`mla_decode_fwd` 与 Unsloth 的 **SageAttention 2** 反映出向领域专用加速的推进趋势。

> 🚀 **前沿领头者**：**SGLang**（内核级）、**llama.cpp**（量化GPU内核）、**vLLM**（推测性解码规模）。

---

### **5. 层位定位**

| 项目       | 主要层级                     | 核心差异化 |
|---------------|------------------------------------|---------------------|
| **vLLM**      | 高性能推理引擎    | MoE、MTP、CUDA图深度；云规模推理主导者 |
| **SGLang**    | 低延迟推理运行时      | 内核融合、SM120/ROCm支持、文件背靠的PLE表 |
| **llama.cpp** | 本地运行时 / 边缘执行     | WebGPU、Metal、SYCL；GGUF量化最佳实践 |
| **Ollama**    | 面向开发者的网关 + CLI    | MLX后端、结构化输出、以Windows优先的用户体验 |
| **LiteLLM**   | 多提供商LLM网关         | 安全加固（cosign）、代理追踪、预算控制 |
| **Unsloth**   | 代理优先运行时 + Studio UI | 自动跳步、SageAttention 2、工具生命周期体验 |

> 💡 **定位洞察**：该栈正在分化：**工程师**使用 vLLM/SGLang/llama.cpp 获取原始性能；**开发者**依赖 Ollama/LiteLLM 实现抽象与工具链；**代理应用**则构建在 Unsloth 的运行时与 LiteLLM 的编排之上。

---

### **6. 趋势信号**

**从当前活动提取的关键行业趋势：**

1. **硬件特定优化已成为必备项**  
   → SGLang 与 llama.cpp 等项目正深度投入 ROCm、SM120 与 AMD FP8 内核。开发者必须根据**具体GPU架构**选择工具。

2. **推测性解码正迈向生产可用——但仍脆弱**  
   → 多个项目（vLLM、llama.cpp）报告高负载下出现灾难性性能下降。这表明推测性解码正从实验室实验走向实际系统部署，但需严格验证。

3. **安全与可信度正向上游迁移**  
   → LiteLLM 的 cosign签名Docker镜像与 Ollama 的严格JSON解析显示，**可信卫生**（镜像签名、输入校验）在企业部署中已成不可妥协要求。

4. **代理工作流需要内置可观测性**  
   → LiteLLM 的 Lens集成与 Unsloth 的上下文计量表明，调试代理需要第一类遥测能力，而非仅依赖日志。

5. **多模态与扩散流水线已主流化**  
   → SGLang、Unsloth 与 llama.cpp 均已支持图像/音频生成或预量化扩散模型——表明视觉与音频不再小众。

---

### ✅ **对应用开发者的建议**

- **避免使用不稳定版本**（如 Unsloth v0.1.902-beta、SGLang 的 `nvfp4` 在 SM120 上）。
- **严格验证输入负载**——JSON解析漏洞普遍存在。
- **在生产前大规模测试推测性解码**。
- **在金融或合规敏感场景中，务必使用安全加固网关**（LiteLLM v1.105.0-rc.1）。
- **根据目标硬件选择技术栈**：  
  - **AMD/ROCm**：SGLang > llama.cpp > vLLM  
  - **Apple Silicon**：Ollama (MLX) > Unsloth > vLLM  
  - **边缘/本地**：llama.cpp > vLLM  
  - **多提供商编排**：LiteLLM > Ollama

> 基础设施已准备就绪——但前提是你的选型需与硬件、工作负载及信任需求相匹配。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-04

---

### **1. 今日亮点**

vLLM 项目持续推进推测解码与 MoE 基础设施的优化，修复了 Marlin int8-activation 的数据损坏问题（PR #59895），并提交关键补丁以恢复在 MTP 推测解码下混合 GDN 前缀缓存命中率（PR #52244）。针对 Qwen3.5-122B 在动态推测解码中出现的重大性能下降（最高达 14% 吞吐量损失）的问题正在积极排查（Issue #49548），同时优先级抢占支持功能也正在推进中（Issue #40004）。

---

### **2. 发布与破坏性变更**

无。

---

### **3. 新模型与硬件支持**

- **ROCm 支持**：ROCm 构建现已通过 PR #59794 集成更新版 AITER（v0.1.24.post1），提升兼容性。
- **Intel GPU (XPU)**：多模态模型的融合输入归一化核已修复（PR #59865），改善了 CPU/GPU 协同能力。
- **模型架构**：
  - DeepSeek-V4.1 Flash 现已支持完整的 MoE 路由模拟（PR #52780）。
  - Qwen3.8-Flash-Next（Qwen4Exp）模型加载功能因 `indexed_attention` 层类型错误修复后恢复正常（Issue #59756）。
  - Nemotron-3.5-Lightning NVFP4 现已改进解码性能追踪能力（Issue #59770）。

---

### **4. 性能与优化**

- **推测解码**：在 Qwen3.5-122B 上，动态推测解码（`num_speculative_tokens_per_batch_size`）在批量大小阈值处引发灾难性吞吐量崩溃（约 14% 单流损失）（Issue #49548）。根本原因在于 cudagraph 从 FULL_AND_PIECEWISE 降级为 PIECEWISE。
- **前缀缓存**：混合 GDN + MoE 工作负载因 EAGLE/MTP 前缀缓存最后一块丢失，导致批量吞吐量下降约 30–40%（Issue #53670）。该问题已在 PR #52244 中修复。
- **内存效率**：CUDA graph 性能分析现已扩展至 V2 模型运行器（PR #54061）；分析期间预留的内存现在会在 KV 缓存大小计算前被计入（PR #57865）。
- **KV 缓存优化**：对于携带自身滑动窗口的请求，现在跳过 SWA 有界重放（PR #59197），避免对滑动窗口标记的重复计算。

---

### **5. 稳定性与回归**

| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|------|----------|
| 🚨 高 | [Bug] Marlin int8-activation 会损坏具有负尺度的组 (#59403) | 将 `int16` 组尺度读取为 `uint16_t`，导致所有负尺度组数据损坏。 | ✅ 已在 PR #59895 修复（依赖 #48926） |
| 🚨 高 | [Bug] EAGLE/MTP 前缀缓存最后一块丢失导致 1,648 标记重新计算 (#53670) | 在使用前缀复用的工作负载中结合推测解码时，造成约 30–40% 批量吞吐量损失。 | ✅ 已在 PR #52244 修复 |
| ⚠️ 中 | [Bug] `prompt_logprobs` 在 MTP 推测解码下静默损坏 (#53488) | 出现在使用分块预填充的 Qwen3.5 系列模型中。 | 进行中 |
| ⚠️ 中 | [Bug] 使用 `rank_pattern`/`alpha_pattern` 的 LoRA Adapter 采用错误缩放 (#59799) | 导致微调模型输出行为不正确。 | 开放中 |
| ⚠️ 中 | [Bug] Responses API 流式传输重复生成 `item_id`/`call_id` (Issue #59834) | 破坏依赖稳定 ID 的严格客户端在流事件间的标识一致性。 | ✅ 已在 PR #59859 修复 |

---

### **6. 对应用开发者的启示**

- **在问题 #49548 修复前，请避免在 Qwen3.5-122B 上使用推测解码**——这可能导致吞吐量严重下降。
- **若使用 Marlin int8-activation**，请验证量化模型中是否存在负组尺度：如存在，应立即应用来自 PR #59895 的修复。
- **可安全使用混合 GDN + MoE 模型**——在 MTP 推测解码下，前缀缓存命中率现已恢复（PR #52244）。
- **谨慎使用复杂 `rank_pattern` 或 `alpha_pattern` 配置的 LoRA Adapter**：当前行为可能导致输出不一致（Issue #59799）。
- **确保客户端与 `/v1/responses` 流式接口兼容**：除非你使用的是已应用 PR #59859 版本，否则不应依赖稳定的 `item_id`/`call_id`。

> 🔗 **关键链接**：
> - Marlin 修复：[#59895](https://github.com/vllm-project/vllm/pull/59895)
> - 前缀缓存修复：[#52244](https://github.com/vllm-project/vllm/pull/52244)
> - Responses API 修复：[#59859](https://github.com/vllm-project/vllm/pull/59859)
> - 推测解码性能回归：[#49548](https://github.com/vllm-project/vllm/issues/49548)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **SGLang Digest — 2026-10-04**

#### **1. 今日亮点**  
SGLang 项目持续推进下一代大模型与多模态模型的高性能推理，重点聚焦于 **DeepSeek V4.1 优化**、**NVFP4 KV 缓存正确性修复** 以及 **SM120/GB10 硬件支持**。针对 `nvfp4` KV 重用导致的数据损坏和 `fa4` 注意力在 SM120 上崩溃的问题，已推出关键稳定性修复；同时新提交的 PR 实现了 AMD FP8 优化以及基于文件的 PLE 表以提升冷行性能。

#### **2. 发布与破坏性变更**  
过去 24 小时内无报告。未观察到新版本发布或破坏性 API/配置变更。

#### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1**：通过 #42170 持续跟踪优化进展；正在进行 mHC 代码重构及 TP 性能改进。  
- **AMD ROCm (gfx950/gfx951)**：  
  - 启用 `unified_kv` FP8 预填充（含 CP）#39923  
  - 为 MiniMax-M3 添加 AITER FP8 块选择功能 #41708  
  - 通过 AITER 实现稀疏 QK 归一化 + RoPE + 缓存写入融合 #35357  
- **NVIDIA SM120 (RTX PRO 6000 / DGX Spark)**：  
  - `--kv-cache-dtype nvfp4` 全面支持目前正因严重数据损坏漏洞（#42369）被重新评估  
  - `fa4` 注意力后端在 CUDA Graph 捕获阶段崩溃——当前仅 Triton 为稳定路径 #42012  
- **扩散模型**：  
  - ComfyUI 模式下修复 H3 INT8 ConvRot 检查点加载问题 #42121  
  - 临时支持 MiniMax-H3 在 Ascend NPU 上运行（未合并，附临时指南）#33357

#### **4. 性能与优化**  
- **基于文件的 PLE 表**：冷行并发主机读取 → 在 GB10 上实现 **冷预填充 TTFT 降低 6.8 倍** #42392  
- **AMD 优化**：  
  - 为 MiniMax-M3 HD128 注意力启用 AITER ASM 预填充 → 改善前缀处理效率 #41707  
  - 小批量 MoE 专家计数门与 FP8 内核融合 → 低并发场景下提升吞吐量 #41982  
- **内核级优化**：  
  - 当设置 `SGLANG_AITER_MLA_DCP_DECODE_BACKEND=asm` 时，SM120 上 DCP 验证前缀使用 `mla_decode_fwd` #42439  
  - DeepSeek-V4 稀疏 MLA 解码、Mamba2 SSD/SSU、SP 全归约矩阵乘法的 `cake_kernels` 可选路由支持 #42416  

#### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|------|----------|
| 🚨 严重 | [#42369](https://github.com/sgl-project/sglang/issues/42369) | `nvfp4` KV 缓存静默重用 fp8 校准尺度 → 在 sm_120 上导致确定性长上下文数据损坏 | 开放 |
| 🚨 严重 | [#42012](https://github.com/sgl-project/sglang/issues/42012) | `fa4` 注意力后端在 GLM-5.3-Flash（SM120）上进行 CUDA 图捕获时崩溃 | 开放 |
| ⚠️ 高 | [#39684](https://github.com/sgl-project/sglang/issues/39684) | `sgl-deep-gemm 0.2.0`：权重缩放变换返回非拥有别名 | 开放 |
| ⚠️ 中 | [#42085](https://github.com/sgl-project/sglang/issues/42085) | `--bf16-gemm-backend gemv` 被接受但被忽略 | 开放 |
| ⚠️ 中 | [#41743](https://github.com/sgl-project/sglang/issues/41743) | `--enable-return-routed-experts` 在 triton/flashinfer 路径上返回全零路由 | 开放 |

> 🔥 **注意**：`nvfp4` 数据损坏问题尤为严重——在 #42369 修复前，使用 SM120 运行长上下文模型的用户应避免使用 `--kv-cache-dtype nvfp4`，建议改用 `fp8` 或 `bf16`。

#### **6. 对应用开发者的启示**  
- 若使用长上下文模型且部署于 SM120，**请避免使用 `--kv-cache-dtype nvfp4`**，直到 #42369 修复；推荐改用 `fp8` 或 `bf16`。  
- **利用 `SGLANG_CAKE_ROUTES`** 显式启用稀疏 MLA 解码、Mamba2 SSD/SSU 等性能增强内核。  
- 在支持的 AMD/NVIDIA GPU 上，**启用 `SGLANG_AITER_MLA_DCP_DECODE_BACKEND=asm`** 以加速 DCP 验证。  
- **对于扩散类应用**：使用 `--enable-comfyui-integration` 并确保通过更新后的加载器正确加载 `INT8` 检查点 (#42121)。  
- **关注 CI 健康状况**，参见 #17050 —— 8 个不稳定的测试表明夜间构建可能存在潜在不稳；建议谨慎使用 `main` 分支。  

👉 [GitHub Issues Dashboard](https://github.com/sgl-project/sglang/issues) | [PRs Summary](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-04**

---

### **1. 今日重点**  
最新开发周期聚焦于稳定推测解码（MTP/draft-mtp）并提升 WebGPU、CUDA 和 SYCL 后端在多平台上的鲁棒性。关键修复解决了 Qwen4Exp 与 GLM-5.3-Flash 模型在长上下文推理中的崩溃问题，同时新优化提升了 MoE 专家缓存效率和量化内核性能——尤其针对 AMD GPU 上的 Q2_K 与 Q1_0 格式。

---

### **2. 发布与破坏性变更**  
今日未发布正式版本；最新构建为 `b11382`。但已合并若干关键错误修复：  
- **WebGPU**：为 `fill/set_rows` 操作新增 `f16` 支持 (#29897)，解决启用 Fast Attention (FA) 时 `glm5-next` 的 CI 失败问题。  
- **服务端**：通过将 `n_batch` 限制为 `n_ubatch` 修复了 `laya abort` 问题 (#29903)，防止高并发下崩溃。  
- **Windows**：修复了 Windows 平台上的废弃 `strdup` 警告 (#29863)。  
- **通用模块**：新增 `common_is_tty()` 辅助函数，并修复了 Windows 平台的弃用警告 (#29860)。  
*注意：这些变更具有向后兼容性，但在涉及推测解码或批处理限制的边缘情况下可能影响行为。*

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 通过 PR #29928 与 #29761，为 **GLM5Next** 与 **Qwen3.8-Flash-Next (Qwen4Exp)** 新增 MTP（多标记预测）支持。  
  - 通过 PR #28540 引入对 **LTX-2.3** 多模态生成（`/v1/images/generations`）的实验性支持。  
- **硬件与后端**：  
  - **WebGPU**：扩展了 `fill/set_rows` 中对 `f16` 张量的支持，增强与基于 FP16 模型的兼容性。  
  - **SYCL**：修复了 `mul_mat`、`split buffer` 及主机内存池处理中的内存错误 (#29889)。  
  - **CUDA**：对 Q2_K 内核进行优化，采用更温和的循环展开策略并减少 VGPR 溢出 (#29910)。  
  - **HIP/ROCm**：在 OpenVINO 后端更新至 v2026.4.1 时，改进设备列表、扩展算子支持并完成性能调优 (#29852)。

---

### **4. 性能与优化**  
- **MoE 专家缓存**：PR #29887 引入一种驻留在主机内存中的 GPU 缓存机制，用于存储 MoE 专家数据，显著降低小批量（≤32 个 token）场景下的卸载开销。  
- **量化优化**：  
  - Q2_K：通过调整循环展开策略，减少 AMD GCN5（MI50）上的 VGPR 溢出 → 显著降低延迟。  
  - Q1_0：HIP 后端现使用 `__builtin_amdgcn_perm` 替代 `__byte_perm` 实现更快的解包操作 (#29927)。  
- **MMVQ 支持**：WebGPU 现已支持 Q1_0/Q5_0/Q5_1/Q3_K/Q5_K/Q6_K/MXFP4（PR #29483）——在 Tesla V100 上实测吞吐最高提升 **+1.8x**。  
- **内存效率**：Qwen4Exp 现已将索引器分数内存占用减半 (#29825)，对长上下文推理至关重要。

---

### **5. 稳定性与回归问题**  
今日报告的主要稳定性问题如下：  
1. **严重崩溃**：`Qwen3.8-Flash-Next` + MTP + `-np N` 导致异步 `t_h_nextn` 竞态条件引发无声草稿接受失败 (#27572)。*修复待定。*  
2. **严重数据损坏**：ROCm 后端在 gfx1151（Strix Halo APU）上产生损坏输出，而 Vulkan 正常运行 (#27579)。*调查中。*  
3. **确定性崩溃**：`qwen4exp` 在多 GPU 层拆分（FA 开关、图结构开关）条件下，固定 token 位置发生崩溃 (#29562)。  
4. **推测解码回归**：使用 draft-mtp 时，贪婪采样在**量化目标模型（如 Q4_K_M）** 上偏离原始输出结果 (#25618)。*已有修复提交，尚未合并。*  
5. **Metal 停滞**：GLM-5.3-Flash 解码因融合 Lightning Indexer 回退至 CPU 而停滞 (#29867)。

---

### **6. 对应用开发者的意义**  
- 在修复落地前，对 `Qwen3.8-Flash-Next` 与 `GLM5Next` 使用 MTP 时需谨慎——尤其是多槽位（`-np N`）工作负载场景。  
- 生产环境应避免在 gfx1151 上使用 ROCm，直至问题 #27579 解决。  
- 在低批量场景（如聊天代理）中，建议启用 MoE 缓存（通过 PR #29887）以提升吞吐。  
- 若使用 WebGPU 或 MTP，务必升级至 `b11382+`——此版本修复了 `f16` 张量处理及服务端稳定性关键问题。  
- 量化模型时，请密切监控推测解码行为；贪婪输出在 Q4_K_M 及类似格式下可能出现偏差。  
- 建议为视觉模型预加载模型元数据（如 `mmproj` 文件）——目前对量化 `mmproj` 的支持仍在开发中 (#18881)。  

> 🔗 [GitHub 问题](https://github.com/ggml-org/llama.cpp/issues) | [拉取请求](https://github.com/ggml-org/llama.cpp/pulls) | [最新构建](https://github.com/ggml-org/llama.cpp/releases)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-04**

---

### **1. 今日亮点**  
Ollama 生态系统持续强化对多模态与结构化推理工作流的支持，关键 PR 推进了 MLX 后端的精度与系统级健壮性。针对 `clef-flash` 在 Windows 上的稳定性修复以及 `/api/generate` JSON 解析问题已合并，同时在结构化输出和工具处理方面的新进展提升了代理的可靠性。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
未观察到新版本发布或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- ✅ **MLX 后端扩展**：  
  - 通过 MLX 新增对 **Kolibri 1** 的支持（PR #18780）。  
  - 改进 MLX 模型的分词器对齐（PR #18779），减少因预分词器/归一化差异导致的 token-ID 不匹配问题。  
  - 现已在 MLX 上完整支持 **SystemOne 模型**（PR #18701）。  
- ✅ **Windows 与 GPU 发现优化**：  
  - 修复跳过零内存伪设备时设备索引错位的问题（PR #18773），确保跨架构下 GPU 分配正确。

> 🔗 [PR #18780](https://github.com/ollama/ollama/pull/18780) | [PR #18779](https://github.com/ollama/ollama/pull/18779) | [PR #18701](https://github.com/ollama/ollama/pull/18701)

---

### **4. 性能与优化**  
- 📈 **决策模型延迟降低**：  
  - `clef-flash` 路由流程调优使 M5 芯片上的预热延迟降低了约 5ms（PR #18776）。  
- ⚙️ **高效 Blob 处理**：  
  - `transfer: 直接消费 blob 响应，无需重新获取`（PR #18781）消除冗余下载——对小尺寸 blob 可将带宽使用量减少高达 50%。  
- 💾 **磁盘与内存效率提升**：  
  - 改进磁盘满错误传播机制（PR #18648），防止大模型拉取过程中出现无声失败。  
  - 主机名冒号现在在清单路径中进行编码（PR #18771），解决 Windows 路径问题。

> 🔗 [PR #18781](https://github.com/ollama/ollama/pull/18781) | [PR #18776](https://github.com/ollama/ollama/pull/18776)

---

### **5. 稳定性与回归问题**  
- 🔴 **严重：`clef-flash` 在 `/v1/systemone` 上于 Windows 失败**  
  - 问题：首次前向传播时出现 `Clef: 非有限 logit`（CUDA） / `无法打开模型`（CPU）。  
  - 修复：PR #18777 修复了 `llama/clef/clef.cpp` 中头部权重读取越界问题——已在 Linux/macOS 上验证有效，现已修复 Windows 版本。  
  > 🔗 [Issue #18769](https://github.com/ollama/ollama/issues/18769) | [PR #18777](https://github.com/ollama/ollama/pull/18777)  

- 🔴 **`/api/generate` 中的 JSON 解析漏洞**  
  - 问题：接受合法 JSON 后跟随尾部垃圾数据，可能导致负载格式错误。  
  - 修复：PR #18778 强制执行严格 JSON 解析；非法请求体返回 HTTP 400 错误。  
  > 🔗 [Issue #18775](https://github.com/ollama/ollama/issues/18775) | [PR #18778](https://github.com/ollama/ollama/pull/18778)  

- 🟡 **结构化输出顺序回归**  
  - 问题：通过原生 `llama-server` 会话路径生成的 JSON Schema 输出中属性顺序丢失（字母序覆盖）。  
  - 影响：破坏依赖步骤的 schema 在代理中的使用。  
  > 🔗 [Issue #18717](https://github.com/ollama/ollama/issues/18717)  

- 🟡 **Gemma4：当 `think:true` 时绕过模式校验**  
  - 问题：模型在直接回答而无推理步骤时返回不符合规范的 JSON。  
  > 🔗 [Issue #18774](https://github.com/ollama/ollama/issues/18774)

---

### **6. 对应用开发者的启示**  
- **构建更可靠的代理**：仅当使用具备正确 `reasoning_effort` 模板支持的模型时，才可可靠地使用 `think: "high"`（注意防范 Qwen3.8 GGUF 问题，#18766）。  
- **避免输入污染**：确保客户端向 `/api/generate` 发送干净的 JSON；在修复发布前，建议使用中间件验证请求负载。  
- **充分利用 MLX 支持 macOS/Windows**：Kolibri 1 与增强版 SystemOne 支持，使 Apple Silicon 平台上的决策逻辑更快。  
- **期待更好的 Windows 稳定性**：`clef-flash` 崩溃问题已修复——升级至最新构建版本以获得完整 Windows 兼容性。  
- **安全使用结构化输出**：在 #18717 修复前，请勿依赖 `llama-server` 输出的 JSON Schema 中的属性顺序。

> 👉 关注后续：预计 Ollama v0.36 将包含这些修复与 MLX 增强功能。请关注 [GitHub](https://github.com/ollama/ollama) 获取发布说明。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-10-04**

---

### **1. 今日亮点**  
LiteLLM 持续快速演进，重点聚焦于**安全加固**、**遥测精度提升**以及**智能体编排成熟度**。`v1.105.0-rc.1` 版本引入了通过 cosign 验证的 Docker 镜像签名，强化了生产环境部署的信任机制。今日关键 PR 提升了智能体工作流的可追溯性（如 Lens 集成），并修复了预算计算和缓存行为中的关键问题——尤其针对零成本模型和高负载下的虚拟密钥场景。

---

### **2. 发布与破坏性变更**  
- **`v1.105.0-rc.1`**（发布候选版）：  
  - 所有 Docker 镜像现均使用 [cosign](https://docs.sigstore.dev/cosign/overview/) 签名，密钥与 [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入的一致。  
  - *需操作*：部署前请验证签名（`cosign verify --certificate-oidc-issuer=...`）。  
  - [GitHub 发布页](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-rc.1)

- **`v1.104.0`, `v1.103.3`**：稳定更新，无破坏性变更；聚焦内部稳定性与遥测修复。

---

### **3. 新模型与硬件支持**  
- ✅ **Anthropic 工作负载身份联合（OIDC JWT bearer）**：通过 [#28607](https://github.com/BerriAI/litellm/issues/28607) 加入支持，可在云原生环境（如 GCP/AWS 工作负载身份）中实现基于身份的安全访问 Claude 模型。  
- ✅ **OpenRouter TTS 支持**：通过 [#42111](https://github.com/BerriAI/litellm/issues/42111) 修复，解决了调用 `/v1/audio/speech` 时出现的“无法映射自定义提供者”错误。  
- 🔧 **Vertex AI Agent Engine（图像/音频/文件内容）**：仍在调查中 ([#44336](https://github.com/BerriAI/litellm/issues/44336)) — 当前行为会静默丢弃非文本部分；尚未支持。

> 今日未新增任何硬件后端（CUDA/ROCm/Metal/CPU）或量化格式。

---

### **4. 性能与优化**  
- 📈 **追踪与分页改进**：  
  - 跨追踪列表/详情读取共享已签名分页 ([#44452](https://github.com/BerriAI/litellm/pull/44452))，消除滚动时的偏移问题，并防止游标篡改。  
  - 存储无关的追踪读取与类型化失败处理 ([#44422](https://github.com/BerriAI/litellm/pull/44422))，为未来多存储支持（如 ClickHouse → Postgres）铺路。  
- ⏱️ **延迟降低**：  
  - 优化 `SlackAlerting.periodic_flush` 任务泄漏问题 ([#41357](https://github.com/BerriAI/litellm/issues/41357))，确保长运行代理不会累积后台任务。

> 未报告直接的吞吐量或每秒令牌数提升，但基础设施稳定性提升了运维效率。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR | 描述 |
|------|----------|--------|--------|-----------|
| [#39057](https://github.com/BerriAI/litellm/issues/39057) | 高 | 开放 | ❌ | 缓存命中花费 = 0，但仍记录令牌用量 — 成本报告中存在语义混淆。 |
| [#27735](https://github.com/BerriAI/litellm/issues/27735) | 严重 | 开放 | ❌ | 虚拟密钥在花费 < max_budget 时仍拒绝请求 — 与过期的 Redis 状态相关。 |
| [#43732](https://github.com/BerriAI/litellm/issues/43732) | 高 | 开放 | ❌ | 密钥空闲 60 秒后重新允许，直到批量写入器刷新 — 违反预算强制策略。 |
| [#44336](https://github.com/BerriAI/litellm/issues/44336) | 严重 | 开放 | ❌ | Vertex AI 智能体引擎静默丢弃图像/音频内容，返回伪造答案（HTTP 200）。 |
| [#32226](https://github.com/BerriAI/litellm/issues/32226) | 中等 | 已关闭 | ✅ | 大型 MCP 负载中 UTF-8 截断导致 500 错误（已在 v1.103.3 修复）。 |

> **重要提示**：多个预算强制漏洞表明高吞吐网关在财务核算方面存在风险。

---

### **6. 对应用开发者的意义**  
- 🔐 **安全优先**：始终验证 Docker 镜像签名（`cosign verify`）——此操作现为生产环境强制要求。  
- 💰 **预算使用需谨慎**：若系统使用虚拟密钥，避免依赖 `max_budget` 来管理零成本模型。当前逻辑可能在预算耗尽后因残留认证检查而阻塞请求 ([#38515](https://github.com/BerriAI/litellm/issues/38515))。  
- 🤖 **智能体工作流**：新推出的 Lens 集成 ([#44475](https://github.com/BerriAI/litellm/pull/44475), [#44472](https://github.com/BerriAI/litellm/pull/44472)) 支持实时追踪与调查审查，非常适合调试复杂智能体。  
- 🛠️ **SDK 增强**：使用 `litellm.run_tool_loop()` 与 `arun_tool_loop()` ([#44381](https://github.com/BerriAI/litellm/pull/44381)) 可避免工具执行循环中的样板代码。  
- ⚠️ **规避陷阱**：不要假设预算超限后模型仍可用 — 即使零成本模型也可能因缓存或旧状态而被阻塞。

> **建议**：升级至 `v1.105.0-rc.1` 以获得更好的安全性和遥测能力，但在预发环境彻底测试预算逻辑。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-10-04**

#### **1. 今日亮点**  
近期在用户界面/用户体验及后端稳定性方面出现明显问题，尤其集中在 **模型加载、音频工作流和上下文管理**，v0.1.902-beta 版本报告了多项严重回归。与此同时，**SageAttention 2 集成**、**自动步骤跳过** 和 **多模型支持** 方面取得显著进展，预示着下一代推理优化前的底层架构深度优化正在进行中。

#### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，由于多个回归问题，**v0.1.902-beta**（及更早版本）现已标记为不稳定：  
- Studio 中 `--mlock` 被拒绝以及 `mmproj-F16.gguf` 磁盘缓存问题 ([#12372](https://github.com/unslothai/unsloth/issues/12372))  
- 通过 `primp h2_client connection reset` 导致的 Web 搜索失败 ([#12638](https://github.com/unslothai/unsloth/issues/12638))  
- `tool_choice="none"` 下工具调用生命周期缺陷 ([#12626](https://github.com/unslothai/unsloth/issues/12626))  

> ⚠️ **迁移提示**：在上述问题解决前，请避免升级至 v0.1.902-beta。对于性能敏感的工作负载，建议使用稳定版本如 `b10687-mix-67dfc8b`。

#### **3. 新模型与硬件支持**  
- **SageAttention 2** 已集成至 Studio 内核库，支持自动探测与降级逻辑 ([PR #12654](https://github.com/unslothai/unsloth/pull/12654))。  
- **FlashAttention 4** 依赖项现在在全新安装时可自动加载 ([PR #12654](https://github.com/unslothai/unsloth/pull/12654))。  
- **Vulkan 多 GPU 绑定** 优化：在混合配置中，独立显卡优先于共享 iGPU ([PR #12650](https://github.com/unslothai/unsloth/pull/12650))。  
- **预量化扩散模型**（如 HTDemucs、Mel-Band RoFormer GGUF）现可在 torchao 0.17–0.18 上从 `safetensors` 加载 ([PR #12645](https://github.com/unslothai/unsloth/pull/12645))。

#### **4. 性能与优化**  
- **自动步骤跳过** 功能上线：默认情况下在五个模型上实现 1.44x–1.81x 加速；在 MiniMax-H3 上最高可达 2.1x ([PR #12652](https://github.com/unslothai/unsloth/pull/12652))。  
- **张量拆分解码性能下降**：自 `b10715-mix-86bd2d3` 起，双 RTX 5070 Ti 上的张量拆分推理速度降至约 48 t/s（较旧版本的 115+ t/s 明显下降），可能与 `max_cuda_graphs = 64` 限制有关 ([#12468](https://github.com/unslothai/unsloth/issues/12468))。  
- **上下文长度计量器增强** 提议：追踪压缩事件与工具调用交接情况，以提升实时可见性 ([#12625](https://github.com/unslothai/unsloth/issues/12625)、[#12624](https://github.com/unslothai/unsloth/issues/12624))。

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 状态 |
|---------|------|--------|--------|
| 🔴 高 | 张量拆分解码速度下降（慢 2.9 倍） | 对多 GPU 用户至关重要 | 开放 ([#12468](https://github.com/unslothai/unsloth/issues/12468)) |
| 🔴 高 | Studio 页面从磁盘加载 `mmproj-F16.gguf` | 严重吞吐量下降，内存膨胀 | 已关闭 ([#12372](https://github.com/unslothai/unsloth/issues/12372)) |
| 🟡 中 | Xet 健康探针导致 diffusers/xformers 失效 | 阻碍图像/视频生成 | 开放 ([#12466](https://github.com/unslothai/unsloth/issues/12466)) |
| 🟡 中 | "nul" 文件阻塞 Windows 终端工具 | 沙箱内静默失败 | 开放 ([#12473](https://github.com/unslothai/unsloth/issues/12473)) |
| 🟡 中 | 实时监控器与弹出框重叠 | Studio 中用户体验下降 | 开放 ([#12623](https://github.com/unslothai/unsloth/issues/12623)) |

> ✅ **修复进行中**：已合并解决 `tool_choice="none"` 生命周期问题 ([#12627](https://github.com/unslothai/unsloth/pull/12627)) 与通知样式问题 ([#12655](https://github.com/unslothai/unsloth/pull/12655)) 的 PR。

#### **6. 对应用开发者的启示**  
- 若在多 GPU 环境中使用张量拆分推理，请避开 `b10715-mix-86bd2d3` 及之后版本——请使用 `b10687-mix-67dfc8b` 或官方 ggml 构建以获得最佳吞吐量。  
- 充分利用 **自动步骤跳过** 与 **SageAttention 2**，无需手动调优即可实现更快的图像/视频生成。  
- 使用 `tool_choice="none"` 时需谨慎：流式工具调用可能不会触发终端事件——建议在客户端实施验证逻辑。  
- 对于 **扩散模型流水线**，可通过基于 `safetensors` 的预量化检查点与优化的内核探测机制期待更好支持。  
- **为代理类应用未来化设计**：关注上下文追踪改进（压缩、工具交接）以提升有状态推理的准确性。

> 💡 *技巧提示*：谨慎使用 `--spec-type draft-mtp` + `--split-mode tensor` 组合——该组合在新版本中目前存在不稳定性。建议在 [#12468](https://github.com/unslothai/unsloth/issues/12468) 解决前，使用旧版进行测试。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*