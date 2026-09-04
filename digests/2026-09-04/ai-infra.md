# AI 基础设施日报 2026-09-04

> 生成时间: 2026-09-04 00:22 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-04**

---

### **1. 生态概览**

2026年9月的AI基础设施格局呈现出高度专业化与推理服务层的快速融合。项目之间的竞争已不再仅局限于原始性能——而是通过架构创新（如推测解码、混合Mamba模型）、硬件特化优化（ROCm、AMD XPU、Apple Silicon）以及运营成熟度（安全、可观测性、稳定性）实现差异化。一个清晰的分化趋势已然形成：高吞吐引擎如vLLM和SGLang正通过先进的调度机制与内核级调优，推动低延迟推理的边界；而网关类项目如LiteLLM以及本地运行时如llama.cpp则更注重安全性、可移植性与开发者体验。对代理可靠性日益增长的关注——尤其是推理循环与流式传输保真度方面——标志着行业重心已从单纯的模型基准测试，转向真实应用场景下的系统鲁棒性。

---

### **2. 活动对比**

| 项目       | 开放问题（高/严重） | 最近24小时合并的PR | 发布状态         |
|------------|---------------------|--------------------|------------------|
| **vLLM**   | 8 (3 高)            | 5                  | 稳定版 (v0.27.1) |
| **SGLang** | 10 (3 高)           | 6                  | 稳定版 (无发布)  |
| **llama.cpp** | 11 (5 高)        | 5                  | 修补版 (`b10793`) |
| **Ollama** | 7 (3 高)            | 2                  | 稳定版 (v0.33.3) |
| **LiteLLM** | 6 (4 高)          | 3                  | 开发版 (v1.101.0-dev.2) |
| **Unsloth** | 5 (2 高)          | 5                  | 无新发布         |

> ✅ *观察：* 所有项目在生产版本中均保持稳定，但**SGLang与llama.cpp**开放问题数量最高——表明其在真实负载下正经历高强度的压力测试与功能集成。

---

### **3. 模型支持竞赛**

| 新模型 / 架构             | 支持项目                          | 备注 |
|----------------------------|-----------------------------------|------|
| **Qwen3-Next系列 (MTP)**   | vLLM ✅, SGLang ⚠️, Ollama ✅       | vLLM在推测解码支持上领先；SGLang存在FP8崩溃问题 |
| **PARD-2 并行草稿模型**    | vLLM ✅ (PR #55257)               | 首个实现目标对齐并行推测的项目 |
| **Hy4-preview (MLA, DSA, MoE)** | SGLang ✅ (PR #36805)         | 完全支持高级稀疏注意力与MXFP8 |
| **GLM-5.3-Flash (混合视觉)** | llama.cpp ✅, vLLM ✅, SGLang ✅ | 三者在此领域领先——各引擎实现类gluon支持 |
| **DeepSeek-v4-Flash-0731** | vLLM ✅ (DSML泄漏修复), SGLang ⚠️ | vLLM解决关键内存泄漏；SGLang尚不完全兼容 |
| **GraniteForCausalLM (IBM)** | Ollama ✅ (PR #17972)           | 首个通过MLX运行器接入的企业级大模型 |
| **T-Head PPU / SenseNova-U1** | SGLang 📌 (路线图)              | 中国新兴AI加速器支持正在推进 |

> 🏆 **胜出者：** **vLLM** 在**高级推测解码**与**多模型集成**方面领先；**SGLang** 在**架构多样性**（如Hy4-preview、DCP）上占据主导。**Ollama** 通过Granite模型在**企业模型接入**方面取得进展。

---

### **4. 性能前沿**

| 优化重点               | 领先项目                     | 关键进展 |
|------------------------|------------------------------|----------|
| **KV缓存与内存效率**   | vLLM, SGLang, llama.cpp      | vLLM: GDN + MTP缓存 (+15–25% 吞吐量); SGLang: 权重缓存守护进程 (<1秒加载时间); llama.cpp: `q8_0` 懒加载KV量化 |
| **批处理与吞吐量**     | vLLM, SGLang                 | vLLM: 融合索引预处理、打包QKV; SGLang: DCP重排以支持上下文并行 |
| **量化与内核调优**     | vLLM, llama.cpp, LiteLLM     | vLLM: CuteDSL MoE API 支持 mxfp8/mxfp4; llama.cpp: MMVQ warp 基于运行时边界推导; LiteLLM: 非专家路径中的MXFP8支持 |
| **分布式服务**         | SGLang, LiteLLM              | SGLang: 流水线与解码上下文并行 (DCP); LiteLLM: 容器内PgBouncer用于数据库连接池 |
| **硬件特化内核**       | vLLM, llama.cpp, Unsloth     | vLLM: NVFP4 GEMM 参考实现 (SM120); llama.cpp: Metal上的稀疏Flash Attention; Unsloth: AOTriton用于ROCm |

> 🔥 **前沿洞察：** 性能竞赛现已进入**内核级与硬件感知**阶段，不再仅由模型规模驱动。那些利用**底层后端集成（AITER、AOTriton、稀疏FA）** 的项目，正获得最显著的性能提升。

---

### **5. 层级定位**

| 项目       | 主要层级                  | 角色摘要 |
|------------|---------------------------|----------|
| **vLLM**   | **推理引擎**              | 高性能、GPU优化引擎，支持高级推测解码与MoE。面向大规模云部署。 |
| **SGLang** | **推理引擎 + 编排器**     | 结合引擎能力与流水线/DCP并行及代理友好调度。定位为下一代代理工作流服务栈。 |
| **llama.cpp** | **本地运行时 / 嵌入式** | 轻量级、跨平台推理引擎，聚焦CPU/GPU可移植性。适用于边缘设备与Apple Silicon。 |
| **Ollama** | **本地运行时 + 代理网关** | 以开发者为中心的运行时，集成代理工具与模型管理。连接本地推理与代理逻辑。 |
| **LiteLLM** | **AI网关 / 编排层**      | 全局API网关，支持路由、成本控制与多提供商。正演变为安全、可扩展的编排平台。 |
| **Unsloth** | **代理工作室 + 本地运行时** | 全栈代理环境，含UI、RAG、音频与图像生成。聚焦可用性与工作流自动化。 |

> 🎯 **战略差异化：**  
> - **引擎**（vLLM/SGLang）：性能优先，具备规模化能力。  
> - **运行时**（llama.cpp/Ollama/Unsloth）：开发者与部署友好。  
> - **网关**（LiteLLM）：企业级编排与安全。

---

### **6. 趋势信号**

#### 🔹 **从今日活动提取的新兴趋势**
1. **推测解码趋于成熟**：vLLM与SGLang已从基础草稿令牌生成，迈向**并行草稿模型（PARD-2）** 与**批处理无关分发**，预示着生产级代理流水线的就绪。
2. **分发环节的安全设计**：LiteLLM采用**Cosign签名的Docker镜像**，反映了整个行业向供应链完整性演进的趋势——这对受监管环境至关重要。
3. **硬件特化不容忽视**：AMD（ROCm）、Apple（Metal）与中国加速器（T-Head）已不再是次要考虑。未能集成原生后端（如Unsloth的AOTriton、llama.cpp的稀疏FA）的项目将面临过时风险。
4. **代理可靠性 > 原始速度**：Ollama/SGLang中多个高严重性缺陷集中在**推理循环、僵尸请求、流式失败**等问题上，表明关注点已从“能否运行”转向“是否可靠运行”。
5. **Rust迁移是基础设施未来**：LiteLLM的**Rust迁移计划**（目标子毫秒开销）为网关性能设立了新标杆——预计2027年将有更多项目跟进。

#### ✅ **应用开发者应重点关注**
- **避免使用推测解码配置**，当 `prompt_length == num_speculative_tokens × uniform_decode_query_len` 时（vLLM/SGLang中已知的误分发漏洞）。
- **监控Intel Arc B70 与 AMD gfx1151 (Strix Halo)** —— 多个堆栈中出现静默损坏或段错误。
- **利用新兴的基于Rust的网关**（LiteLLM beta）构建超低延迟代理系统。
- **使用 `--portable` 安装（Unsloth）** 与 **Cosigned镜像（LiteLLM）** 实现安全、可审计的部署。
- **升级后验证模型行为**——Gemma 4、glm-5.3、DeepSeek-V4近期版本均表现出推理循环问题。

---

> **最终结论：** AI基础设施生态已不再关乎选择单一“最佳”工具，而是关于**分层策略性组合**。对于代理场景：搭配 **vLLM 或 SGLang**（引擎）+ **LiteLLM**（网关）+ **Ollama 或 Unsloth**（本地运行时/工作室）。对于边缘场景：**llama.cpp + Unsloth**。对于合规要求高的应用：**LiteLLM + Cosigned镜像 + Rust代理**。未来是分层、安全且硬件感知的。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-04**

---

### **1. 今日亮点**  
vLLM 项目持续加速对高级推测解码和混合 Mamba 模型的支持，针对多标记推测解码（MTP）下的 **Qwen3-Next 系列** 和 **GDN 前缀缓存一致性** 实现了关键修复。新提交聚焦 ROCm/AMD 平台稳定性，包括更新的 AITER 集成与 CI 阶段配置，同时一项关键补丁确保在仅编码器模型上优雅拒绝 `--enable-prompt-embeds` 参数。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布或破坏性变更。*  
项目当前稳定版本为 v0.27.1，Model Runner V2 与 Rust 前端功能仍在持续优化中。未发出任何迁移警告。

---

### **3. 新模型与硬件支持**  
- **新增模型支持**：  
  - 通过推测解码（`PR #55257`）新增对 **PARD-2 并行草稿模型** 的实验性支持。  
  - 通过修复 DSML 泄露问题，增强与 **DeepSeek-v4-Flash-0731** 的兼容性（`PR #54686`）。  
- **硬件与后端更新**：  
  - **ROCm 10.0** 已通过 `docker/Dockerfile.rock_base` 纳入夜间构建（`PR #55246`）。  
  - **AITER 0.1.21.post1** 集成，提升稀疏 MoE 调度与内核调优性能（`PR #55246`, `#51563`）。  
  - **Intel Arc Pro B70 (XPU)**：正在调查持续解码过程中出现无声输出损坏的问题（`Issue #53480`）。  
  - **NVIDIA B200** 性能优化正针对 Qwen3-Next-80B-A3B-Instruct-NVFP4 展开（`PR #55260`）。

---

### **4. 性能与优化**  
- **Model Runner V2 (MRV2)**：  
  - 在启用 MTP + GDN 全模式缓存的情况下，对 Qwen3-Next-80B-A3B-Instruct-NVFP4 实现 **15–25% 的解码吞吐量提升**，得益于打包 QKV、融合索引预处理与权重去交错（`PR #55260`）。  
  - 利用 AITER API 优化 W4A16 MoE 内核，降低延迟（`PR #51563`）。  
- **量化与内核效率**：  
  - 更新的 CuteDSL 融合 MoE API 现已支持 mxfp8/mxfp4 数据类型，并提升低延迟解码表现（`PR #55015`）。  
  - 正开发基于 Triton 的 NVFP4 GEMM 参考实现，以支持 SM120（`Issue #21014`）。  
- **批处理不变性**：  
  - 推进批处理无关推理追踪（`Issue #27433`），以消除大语言模型服务中的非确定性行为。

---

### **5. 稳定性与回归问题**  
- **报告的关键问题**：  
  1. 在单 GPU 上使用 `VLLM_PLE_CPU_OFFLOAD=1` 时，Qwen3.8-Flash-Next 出现死锁（`Issue #53960`）。  
  2. Intel Arc B70（W4A16）在负载下出现无声输出损坏，仅输出符号 "!"（`Issue #53480`）。  
  3. 当提示长度 = `uniform_decode_query_len * num_reqs` 时，预填充阶段错误调度至推测解码 CUDA 图，导致垃圾输出（`Issue #53051`）。  
- **正在进行的修复**：  
  - `PR #52244` 恢复在 MTP 推测解码下混合 GDN 前缀缓存命中。  
  - `PR #55243` 修复 FoPE 中错误的 sin 缓存填充（`#55204`）。  
  - `PR #55239` 解决 GLM-5.3-Flash MTP 的 ROCm 调度问题（`#55050`）。

---

### **6. 对应用开发者的意义**  
- **在混合 GDN/Qwen3-Next 模型上使用推测解码时需谨慎** —— 避免配置 `prompt_length == num_speculative_tokens * uniform_decode_query_len`，因存在已知的调度错误。  
- **如适用，可启用 PARD-2 草稿模型**（`PR #55257`），以实现更快的推测解码，前提是目标对齐并行草稿。  
- **避免在仅编码器模型上使用 `--enable-prompt-embeds`** —— 该参数将静默失败，除非显式处理（修复即将发布）。  
- **密切监控 Intel Arc B70 部署情况**；报告的无声损坏可能影响生产可靠性。  
- **建议采用 ROCm 10.0 + AITER 0.1.21.post1**，以获得更好的 AMD 硬件支持，并降低 MoE 工作负载下的内存开销。  

👉 *敬请关注 v0.28.0 版本，预计将包含 MRV2 性能提升及增强的多 LoRA 分类支持（`Issue #19623`, `#12829`）。*

---  
**来源**：[GitHub vLLM Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-04

---

### **1. 今日亮点**  
SGLang 持续推进在多种硬件和模型架构上的高吞吐、低延迟推理支持。关键进展包括 **解码上下文并行（DCP）** 和 **流水线并行** 的优化，新增的 PR 集中于 DCP 重布局及引擎初始化超时问题。针对 Qwen3.8-Flash-Next 与 GLM-5.3-Flash 在 FP8 KV 缓存下的 CUDA `illegal_address` 崩溃等关键稳定性问题正在积极排查，凸显混合精度与稀疏注意力路径中的持续挑战。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布或破坏性 API/配置变更。*

---

### **3. 新模型与硬件支持**  
- **T-Head PPU**：已开启新路线图 ([#37519](https://github.com/sgl-project/sglang/issues/37519))，旨在上游原生支持 T-Head ZW810/ZW810E/ZW-M890P PPUs，助力中国 AI 加速器的更广泛部署。  
- **SenseNova-U1/U1.5**：跟踪问题 [#37742](https://github.com/sgl-project/sglang/issues/37742) 概述了基于 OpenSenseNova/SenseNova-U1 参考实现的集成工作。  
- **Hy4-preview (Hy4-preview)**：通过 PR [#36805](https://github.com/sgl-project/sglang/pull/36805) 实现完整支持，涵盖 MLA 结合 DSA 稀疏注意力、iHC、学习型 sink、sigmoid 门控 MoE 以及 MXFP8 量化。

---

### **4. 性能与优化**  
- **权重缓存守护进程**：快速引擎恢复的第一阶段已合并至 [#27139](https://github.com/sgl-project/sglang/pull/27139)，将 Qwen3-235B FP8 的权重加载时间从 **~306–327 秒降至 <1 秒**（[博客](https://www.lmsys.org/blog/2026-08-21-sglang-quantized-inference/)）。  
- **DCP 重布局**：PR [#37709](https://github.com/sgl-project/sglang/pull/37709) 实现了 DSpark 草稿 KV 在 DCP1→DCP-N 重布局过程中的高效传输，提升了上下文并行场景下的解码效率。  
- **ROCm 优化**：PR [#37124](https://github.com/sgl-project/sglang/pull/37124) 减少了 MI355X 上 GLM-5.2-MXFP4 吸收路径中的冗余计算，提升解码吞吐量。  
- **AMD/Kimi-K3**：PR [#37601](https://github.com/sgl-project/sglang/pull/37601) 为 aiter gluon 路径新增 `qlen>1` 支持，扩展了 Kimi K3 在 ROCm 上的应用场景。

---

### **5. 稳定性与回归问题**  
今日报告的关键稳定性问题：

| 严重性 | 问题 | 描述 | 状态 |
|--------|------|-------------|--------|
| 🔴 高 | [#37519](https://github.com/sgl-project/sglang/issues/37519) | **Qwen3.8-Flash-Next**：在 8 个并发请求下启用 QSA 扩展前向传播时，触发 `CUDA_ERROR_ILLEGAL_ADDRESS` 崩溃（`--disable-overlap-schedule`，H20 TP8）。 | 开放 |
| 🔴 高 | [#36545](https://github.com/sgl-project/sglang/issues/36545) | **Qwen3.8-Flash-Next**：预热阶段因数据类型不匹配（BF16 查询 vs FP8 K/V）导致使用 FP8 KV 缓存失败。 | 开放 |
| 🔴 高 | [#37579](https://github.com/sgl-project/sglang/issues/37579) | **GLM-V**：残留的多模态占位符（`<|image|>`）触发 500 错误“不匹配：发现的 IMAGE token 数量超过提供的对应数据”。 | 开放 |
| 🟡 中 | [#36140](https://github.com/sgl-project/sglang/issues/36140) | **DFLASH 规划解码**：在 PD 分离模式下（`--disaggregation-mode decode`）因 `spec_info None` 崩溃。 | 开放 |
| 🟡 中 | [#36333](https://github.com/sgl-project/sglang/issues/36333) | **僵尸请求泄漏**：断开连接的流式客户端遗留卡住的请求，持续解码至 max_tokens。此为 #34160 回滚引入的回归问题。 | 开放 |

> ✅ *备注：* 多个相关 PR 正在进行中（例如 #37874 用于超时限制的初始化），但尚未合并任何修复。

---

### **6. 对应用开发者的影响**  
- **使用 Qwen3.8-Flash-Next 搭配 FP8 KV 缓存或规划解码时，请预期存在不稳定性**——建议在补丁发布前避免此类配置。  
- **对于 QSA 相关崩溃**，可临时使用 `--disable-overlap-schedule` 或 `CUDA_LAUNCH_BLOCKING=1` 作为规避方案。  
- **针对高并发智能体工作负载**，需监控僵尸请求泄漏问题，并确保客户端侧完成流式清理。  
- **充分利用新兴的 DCP 与流水线并行功能** 进行长上下文推理（100万+ token），尽管可能存在部分粗糙之处。  
- **关注如 #37709 与 #37876 等 PR**，以获取多节点、高吞吐服务性能的改进。

👉 *建议：* 加入 [SGLang Slack](https://slack.sglang.ai) 获取实时更新与活跃问题的调试支持。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-04**

---

### **1. 今日亮点**  
最新开发周期聚焦于 GPU 后端的关键性能与稳定性改进，尤其针对 AMD（ROCm/Vulkan）和 Apple Silicon（Metal）。主要进展包括 Metal 后端对稀疏 Flash Attention 的支持、OpenCL 与 CUDA 的推测解码路径优化，以及修复每次提交都触发完整源码重建的问题——显著提升了 CI/CD 效率。目前在 gfx1151（Strix Halo）系统上报告的高严重性正确性缺陷数量持续增加，尤其是在使用 MoE 模型和 Vulkan 时。

---

### **2. 发布与破坏性变更**  
- **`b10793`**：通过 `llama-version.h` 生成机制解决新提交时的全量源码重建问题 ([PR #28278](https://github.com/ggml-org/llama.cpp/pull/28278))。  
- **`b10791`**：新增中等批次 GEMM 优化及非 Adreno OpenCL 构建下的 `q4_K/q6_K` 瓷砖内核防护机制 ([PR #26477](https://github.com/ggml-org/llama.cpp/pull/26477))。  
- **`b10785`**：在 Metal 后端引入稀疏 Flash Attention，支持 `n_kv_max` 掩码提示 ([PR #28098](https://github.com/ggml-org/llama.cpp/pull/28098))。

> 🔧 *迁移提示*：从 `b10784` 或更早版本升级的用户应验证 `-np N` 下 `--spec-type draft-mtp` 的行为，因异步设备→主机竞争可能导致草稿接受失败 ([Issue #27572](https://github.com/ggml-org/llama.cpp/issues/27572))。

---

### **3. 新模型与硬件支持**  
- ✅ **新模型支持**：  
  - GLM-5.3-Flash（GLM5-Next），一款 320B 规模的混合文本+视觉模型 ([PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773))。  
  - Qwen3.8 DFlash/MTP 推测解码现可通过 `--spec-type draft-mtp` 支持 ([PR #28349](https://github.com/ggml-org/llama.cpp/pull/28349))。  
- ✅ **硬件后端新增**：  
  - **Metal**：稀疏 Flash Attention（#28098）可在 M 系列芯片上实现高效的 KV 缓存。  
  - **OpenCL**：扩展逐元素操作覆盖范围（如 `sgn`、`elu`、`hardswish`），提升灵活性 ([PR #27633](https://github.com/ggml-org/llama.cpp/pull/27633))。  
- ✅ **量化支持**：引入 `q8_0` 延迟 KV 缓存量化方案 ([PR #28267](https://github.com/ggml-org/llama.cpp/pull/28267))，支持动态内存管理。

---

### **4. 性能与优化**  
- **Metal**：稀疏 FA 降低内存带宽压力；基准测试显示在 M2 Ultra 上对 DSv4 的解码吞吐量提升约 15–20% ([PR #28098](https://github.com/ggml-org/llama.cpp/pull/28098))。  
- **CUDA/HIP**：`MMVQ` 内核现在从运行时启动边界推导 `nwarps`，修复通用 RDNA3.5 目标（gfx1151）上的错误线程块数问题 ([PR #28339](https://github.com/ggml-org/llama.cpp/pull/28339))。  
- **OpenCL**：中等批次 GEMM 与 `quant lm_head / decode GEMV` 优化提升推测解码效率 ([PR #26477](https://github.com/ggml-org/llama.cpp/pull/26477))。  
- **Vulkan**：优化 `coopmat1 f16b` 分发逻辑，改善与 Strix Halo 计算限制的兼容性 ([PR #28348](https://github.com/ggml-org/llama.cpp/pull/28348))。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 摘要 | 修复 PR？ |
|--------|------|------|----------|
| ⚠️ 严重 | [#10528](https://github.com/ggml-org/llama.cpp/issues/10528) | Linux 上 Vulkan 崩溃（strace 显示访问不一致） | ❌ 尚未修复 |
| ⚠️ 高 | [#28247](https://github.com/ggml-org/llama.cpp/issues/28247) | Intel Arc A770 上 Vulkan `GGML_ASSERT(wg0 <= ctx->device->properties.limits.maxComputeWorkGroupCount)` | ❌ 待处理 |
| ⚠️ 高 | [#27579](https://github.com/ggml-org/llama.cpp/issues/27579) | ROCm 在 gfx1151 上输出损坏，尽管与 Vulkan 使用相同标志 | ❌ #27621 之后的回归 |
| ⚠️ 高 | [#28290](https://github.com/ggml-org/llama.cpp/issues/28290) | Snapdragon X Elite（Vulkan）上 `unpack8()` 损坏 MAT_MUL + CPY | ❌ 尚未修复 |
| ⚠️ 高 | [#28158](https://github.com/ggml-org/llama.cpp/issues/28158) | Qwen3.8 DFlash 在 Vulkan（gfx1150）上输出越界 token id = `n_vocab` | ❌ 尚未修复 |

> 💡 *注意*：这些问题影响现代 AMD 与 ARM 硬件上的生产部署——建议在 gfx1151 上使用 MoE 或 flash attention 模型时避免使用 `b10785` 及更高版本，直到修复完成。

---

### **6. 对应用开发者的影响**  
- 🛠 **使用 `--spec-type draft-mtp-adaptive`**（通过 [PR #27210](https://github.com/ggml-org/llama.cpp/pull/27210)）以在多槽工作负载下获得更稳定的推测解码。  
- 📦 **利用 `mmproj-evict-draft`**（`--mmproj-evict-draft`）在显存受限设备上动态交换多媒体投影器与草稿模型 ([PR #28346](https://github.com/ggml-org/llama.cpp/pull/28346))。  
- 🚩 **若使用 MoE 或 flash attention 模型，请避免在 AMD Strix Halo（gfx1151）上使用 `b10785` 及以上版本**——当前 Vulkan 与 ROCm 输出不可靠。  
- 🔄 **更新构建脚本**，采用基于 `llama-version.h` 的版本控制（自 `b10793` 起），减少不必要的重建。  
- 🎯 **在大模型推理（如 Qwen3、GLM5-Next）中优先选择 Metal + 稀疏 FA**。

> 🔗 **开发者资源**：  
> - [模型支持矩阵](https://github.com/ggml-org/llama.cpp#supported-models)  
> - [性能调优指南](https://github.com/ggml-org/llama.cpp/wiki/Performance-Tuning)  
> - [后端兼容性表格](https://github.com/ggml-org/llama.cpp#backends)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-04**

---

### **1. 今日亮点**  
Ollama 生态系统持续演进，重点聚焦于代理可靠性与推理循环及 GPU 调度的性能稳定性。在更新后，`Gemma 4 26B A4B` 与 `glm-5.3:cloud` 出现关键回归问题，表明可能存在特定模型的行为漂移。与此同时，多项新 PR 正在推进 MLX 的推测解码支持，并优化 Qwen3.8 Flash Next 的内存效率，标志着在 Apple Silicon 上实现更高效推理的进展。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
无新发布或破坏性变更。最新稳定版本仍为 **0.33.3**，该版本已引发多个回归问题（如 #18220、#18193），涉及模型行为与推理控制。

---

### **3. 新模型与硬件支持**  
- ✅ 通过 [PR #17972](https://github.com/ollama/ollama/pull/17972)，实验性模型与 `mlxrunner` 已支持 **GraniteForCausalLM** 架构，可于 Apple Silicon 上使用 IBM 的 Granite 4.1 系列。
- ✅ **Talos** 已作为官方 `ollama launch` 集成加入 ([PR #18093](https://github.com/ollama/ollama/pull/18093))，支持权限管控的个人代理工作流。
- ✅ 非 root 用户在 Linux 上的安装方式现已文档化，包含手动解压与 PATH 导出步骤 ([PR #18207](https://github.com/ollama/ollama/pull/18207))，提升了在共享环境中的部署灵活性。

---

### **4. 性能与优化**  
- 🔧 **内存效率**：[PR #18078](https://github.com/ollama/ollama/pull/18078) 为 `Qwen3.8-flash-next` 的非专家 MTP 路径引入 MXFP8 量化，同时保留关键投影的 BF16 精度——在不牺牲生成质量的前提下降低显存压力。
- ⚙️ **推测解码**：通过 [PR #18105](https://github.com/ollama/ollama/pull/18105)，在 `mlxrunner` 中启用结构化输出下的推测解码，恢复了密集型 27B 模型在草稿验证阶段的近最优吞吐量。
- 📉 **CPU 使用率**：用户报告在 Mac Studio M4 Max 上进行词元生成时出现 **约 560% 的 CPU 使用率** ([Issue #18038](https://github.com/ollama/ollama/issues/18038))，表明 llama-cpp 性能可能存在回归，可能影响实时应用表现。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|------|----------|
| 🔴 高 | [#18220](https://github.com/ollama/ollama/issues/18220) | `Gemma 4 26B A4B` 在升级至 0.33.3 后进入推理循环，而非发出工具调用 | 开放 |
| 🔴 高 | [#18193](https://github.com/ollama/ollama/issues/18193) | `glm-5.3:cloud` 在 OpenCode/ZCode 中出现无限推理块，导致任务中断 | 开放 |
| 🔴 高 | [#17892](https://github.com/ollama/ollama/issues/17892) | `deepseek-v4-flash:0731` 在缺少 `</think>` 标记时无限循环 | 开放 |
| 🟡 中等 | [#16506](https://github.com/ollama/ollama/issues/16506) | `gemma4:e2b` 在 WSL 上因 `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS)` 报错崩溃 | 开放 |
| 🟡 中等 | [#18213](https://github.com/ollama/ollama/issues/18213) | macOS GPU 重置后，runner 处于损坏的 Metal 状态，返回空响应直至重启 | 开放 |
| 🟡 中等 | [#18208](https://github.com/ollama/ollama/issues/18208) | 长期存活的 `keep_alive=-1` runner 在与第二个模型共存后，发出损坏的 `<unused49>` 词元 | 开放 |

> **注意**：多个问题指向近期调度逻辑、推理预算处理以及 GPU 驱动检测（尤其在 Windows 与 Apple Silicon 平台）的变更。

---

### **6. 对应用开发者的启示**  
- **代理构建者必须在升级后验证模型行为**，尤其是使用 `Gemma 4`、`glm-5.3` 或 `deepseek-v4-flash` 等高推理负载场景的工作流。若未显式限制，可能出现幻觉或无限循环。
- **谨慎使用 `--hidethinking`**：当前对部分模型（如 `maternion/ling-3.0-tiny:8b-Q4_K_M`）无效 ([#18221](https://github.com/ollama/ollama/issues/18221)) —— 生产环境中建议采用替代的 TUI/CLI 包装器用于日志记录。
- **启用 `OLLAMA_DEBUG_LOG_REQUESTS` 请自担风险**：该选项会记录完整提示与工具定义，且无脱敏或保留控制机制 ([#18210](https://github.com/ollama/ollama/issues/18210))，在企业环境中存在严重安全风险。
- **针对 Apple Silicon 优化**：尽可能使用 `Q3_K_M` 量化（例如通过 [#17869](https://github.com/ollama/ollama/issues/17869) 请求官方 Qwen3.8-35B-A3B 的 Q3_K_M 版本），以便在 16GB/24GB Mac 上运行更大模型。
- **利用 `mlxrunner` 改进**：`Qwen3.8 Flash Next` 中的推测解码与更优内存管理可提升代理吞吐量——特别适用于高延迟、高吞吐的代理流水线。

---  
*数据来源：github.com/ollama/ollama | 更新时间：2026-09-04*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 消息简报 – 2026-09-04

---

### **1. 今日亮点**

LiteLLM 继续推进向高性能、生产级推理基础设施的战略转型，正式发布重大 **Rust 迁移计划**（问题 #31263），目标实现亚毫秒级延迟开销，打造迄今最快的 AI 网关。与此同时，代理层的关键修复解决了预算重置、令牌计数和流式传输失败日志记录等长期存在的问题，显著提升成本控制与可观测性可靠性。

安全始终是首要任务：所有 Docker 镜像现已通过 Cosign 实现加密签名（密钥于提交 `0112e53` 中确立），强化了分发渠道的信任保障。

---

### **2. 发布与破坏性变更**

- 今日发布 **v1.101.0-dev.2**，聚焦安全更新：
  - ✅ 所有 Docker 镜像均使用 [Cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 签名，确保可验证完整性。
  - 🔐 本版本未报告任何破坏性变更；面向早期采用者，用于测试 Rust 集成及增强的安全态势。

> 📌 *验证镜像签名：*  
> https://docs.sigstore.dev/cosign/overview/

---

### **3. 新模型与硬件支持**

- **为 Bedrock 嵌入添加 AWS 外部 ID 支持**（问题 #27835）：为企业嵌入工作负载提供安全且细粒度的访问控制。
- **Vertex AI 管理批处理中现已支持微调后的 Gemini 端点**（PR #39668）：无需手动部署模型即可批量处理自定义模型。
- **SGLang 重排序端点现在正确处理数组响应**（问题 #29156）：修复 SGLang 重排序服务返回非标准 JSON 格式时的解析问题。

> 🔗 问题：[#27835](https://github.com/BerriAI/litellm/issues/27835)  
> 🔗 PR：[#39668](https://github.com/BerriAI/litellm/pull/39668)

---

### **4. 性能与优化**

- **启动 Rust 迁移计划**（问题 #31263）：一项基础重构项目，旨在将网关开销降低至 **亚毫秒级延迟**，显著提升吞吐量并减轻大规模部署中的 CPU 压力。
  - 目标：用 Rust 的零成本抽象替代基于 Python 的路由与代理逻辑。
  - 测试版报名通道开放：[Google 表单](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...)

- **引入自动路由器零配置模式**（PR #39658）：通过根据质量与优化目标（如成本与速度权衡）自动推导层级与提示模板，降低配置复杂度。

- **通过容器内 PgBouncer 实现数据库连接池**（PR #39683）：消除每个工作进程的数据库连接开销，防止扩容时数据库资源耗尽。适用于 Neon 或 Prisma 等配备 pgbouncer 的事务型环境。

> 🔗 问题：[#31263](https://github.com/BerriAI/litellm/issues/31263)  
> 🔗 PR：[#39683](https://github.com/BerriAI/litellm/pull/39683)，[#39658](https://github.com/BerriAI/litellm/pull/39658)

---

### **5. 稳定性与回归问题**

| 严重程度 | 问题 | 概要 | 修复状态 |
|--------|------|--------|-----------|
| ⚠️ 高 | [#31447](https://github.com/BerriAI/litellm/issues/31447) | 设置 `team_member_budget` 会覆盖整个团队元数据对象 | 待处理 |
| ⚠️ 高 | [#29715](https://github.com/BerriAI/litellm/issues/29715) | OpenAPI MCP `build_input_schema` 丢失内联参数模式中的 `items`、`enum` | 待处理 |
| ⚠️ 高 | [#29766](https://github.com/BerriAI/litellm/issues/29766) | `/v1/audio/transcriptions` 将多个 `known_speaker_references` 合并为仅最后一个 | 待处理 |
| ⚠️ 中 | [#27300](https://github.com/BerriAI/litellm/issues/27300) | 月度重置后 `max_budget` 被忽略 | 待处理 |
| ⚠️ 中 | [#27171](https://github.com/BerriAI/litellm/issues/27171) | `ResetBudgetJob` 因不可序列化的 `budget_limits` 列表崩溃 | 待处理 |
| ❌ 致命 | [#39564](https://github.com/BerriAI/litellm/issues/39564) | `/user/update` 拒绝有效的 `blocked` 参数 — 导致 Terraform provider 失效 | 待处理 |

> 💡 注意：多个回归问题涉及 **多步工具调用**、**流式错误处理** 和 **元数据变异** 的异常行为，可能影响依赖准确请求/响应一致性的智能体工作流。

---

### **6. 对应用开发者的影响**

- **尽早采用**：若您正在构建可扩展的 LLM 网关或智能体系统，建议加入 **Rust 迁移测试版**（通过 [Google 表单](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...) 注册），以获得亚毫秒级延迟与未来兼容的架构。
- **避免不稳定**：在相关修复合并前，请谨慎使用 `team_member_budget`、`known_speaker_references` 或 `max_budget` 功能——这些可能造成数据损坏或静默失败。
- **使用安全可审计的部署方式**：在供应链完整性至关重要的生产环境中，务必使用 **经签名的 Docker 镜像**。
- **期待更优可观测性**：随着新版 OTel v2 跟踪路由（PR #39654）及更完善的会话级指标支持，您的追踪数据将在操作员与团队层级完整保留——非常适合调试复杂的智能体流程。
- **优化扩展能力**：采用新的 **容器内 PgBouncer 模式**（PR #39683），避免高负载下触达数据库连接上限。

> ✅ 实用建议：关注 PR #39683、#39654 与 #39675，可在大规模部署中立即获得性能提升。

--- 

*简报生成时间：2026-09-04 | 来源：[GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-04**

#### **1. 今日亮点**  
Unsloth 生态系统持续聚焦稳定性与跨平台兼容性，针对 AMD ROCm 性能问题和图像生成工作流中的内存泄漏进行了关键修复。新增的 PR 提升了音频模型处理能力、深度研究输出长度控制以及桌面应用可用性——尤其在模态 UI 冻结和日志可访问性方面。对安全 API Token 边界和可移植安装的支持成为重点，标志着企业级部署能力的逐步成熟。

#### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，`main` 分支上的持续变更可能影响行为：
- **API 密钥安全（PR #10142）**：对使用 API Key 的调用者，在 Hub 写入路径上强制要求显式 Hugging Face Token，关闭潜在凭证泄露漏洞。
- **可移植安装（PR #10189）**：引入 `--portable` 与 `--root` 标志，支持单目录 Studio 安装——适用于受限环境或容器化部署。

> 🔗 [PR #10142](https://github.com/unslothai/unsloth/pull/10142) | [PR #10189](https://github.com/unslothai/unsloth/pull/10189)

#### **3. 新模型与硬件支持**  
- **AMD ROCm + AOTriton Attention（PRs #8323, #8821）**：通过显式启用 `TORCH_ROCM_AOTRITON_ENABLE_EXPERIMENTAL`，在 AMD GPU 上解锁高性能注意力核函数，解决 RX 7900 XTX 和集成显卡等设备严重的 VRAM 过度分配问题。
- **MLX 模型语音转录（Issue #10272）**：仍未解决；用户报告无法在 macOS M 系列芯片上使用 MLX 模型进行音频转录——音频流水线支持存在缺口。
- **Docker 支持扩展（PR #5748）**：从 Ampere（sm_80）到 Blackwell（sm_120）完整支持 NVIDIA GPU，包含 Grace/GPU 系统的原生 aarch64 构建。

> 🔗 [PR #8323](https://github.com/unslothai/unsloth/pull/8323) | [PR #5748](https://github.com/unslothai/unsloth/pull/5748)

#### **4. 性能与优化**  
- **内存泄漏修复（PR #10267）**：修复因类比较不当导致的更新横幅测试失败问题——提升 CI 可靠性并减少误报。
- **音频流水线增强（PRs #10217, #10255）**：现可通过 `input_audio` 内容部分实现模型特定音频请求，并在语音合成过程中动态加载模型。
- **深度研究输出长度控制（PR #10254）**：移除报告生成中硬编码的 16k token 限制——现在保存连接时将尊重模型上下文窗口。
- **避免模型重载（PR #10257）**：当 Studio 处于活动状态时运行 `unsloth chat`，防止不必要的模型重载，保持预热状态并降低延迟。

> 🔗 [PR #10254](https://github.com/unslothai/unsloth/pull/10254) | [PR #10257](https://github.com/unslothai/unsloth/pull/10257)

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|---------|------|--------|--------|
| ⚠️ 高 | **Qwen3.8-27B V3 GGUF 在 AMD 上崩溃**（Issue #9792） | 开放 | 尚无修复；回滚至 v2（`408fcc1807ab`）可缓解 |
| ⚠️ 高 | **Z-Image-Turbo 内存泄漏**（Issue #10156） | 已关闭 | 最近补丁已修复；SIGKILL 风险降低 |
| ⚠️ 中 | **Gemma-4 26B A4B MOE LoRA 可训练参数过少**（Issue #4907） | 已关闭 | 最新版 `unsloth_zoo` 已打补丁 |
| 🟡 低 | **深度研究报告不完整 / 推理信息泄露**（Issue #10245） | 开放 | 正在处理；与提示路由逻辑相关 |
| 🟡 低 | **Windows 工具栏被工具提示遮挡**（Issue #10226） | 开放 | UX/UI 视觉层级问题 |

> 🔗 [Issue #9792](https://github.com/unslothai/unsloth/issues/9792) | [Issue #10156](https://github.com/unslothai/unsloth/issues/10156)

#### **6. 对应用开发者的启示**  
- **构建健壮的 RAG 代理**：未解决的 RAG 文件列表问题（#8854）表明当前项目/知识库探查能力存在局限——请勿依赖自动发现功能，直至修复完成。
- **确保 API 集成安全**：随着更严格的 Token 强制策略（PR #10142），下游服务在执行 Hub 写入操作时必须显式传递 HF Token——禁止隐式借用凭证。
- **优化边缘设备部署**：使用新推出的 `--portable` 安装方式（#10189）及 Docker 镜像（#5748），在云、本地与嵌入式系统间部署一致且隔离的推理堆栈。
- **充分利用音频流水线**：通过 PR #10217 与 #10255，在 `/audio/speech` 与 `/audio/generate` 接口启用动态模型切换——对语音代理类应用至关重要。
- **避免内存膨胀**：监控长时间运行任务（尤其是图像/音频生成）；谨慎使用 `--max-seq-length`，并通过 `unsloth chat` 避免重复模型加载。

> ✅ 实用提示：对于 AMD 用户，请确保在环境初始化阶段设置 `TORCH_ROCM_AOTRITON_ENABLE_EXPERIMENTAL=1`，以激活性能优势。

---  
*本摘要由 GitHub 数据生成 — unslothai/unsloth | 2026-09-04*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*