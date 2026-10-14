# AI 基础设施日报 2026-10-14

> 生成时间: 2026-10-14 01:22 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **1. 生态系统概览**  
2026年10月的AI基础设施格局呈现出向大规模、高吞吐、低延迟推理快速融合的趋势，对异构硬件支持（AMD ROCm、Intel XPU、ARM NPU）、先进模型架构（MoE、混合SSM/GDN）以及智能体工作流的重视程度持续提升。项目正日益聚焦于全栈性能优化——从内核级调优到分布式服务模式——同时面临生产级部署中的稳定性退化问题。推测解码、预填充解耦推理以及原生工具调用流式的兴起，标志着技术已超越基础大语言模型服务，迈向智能、有状态的智能体执行阶段。

---

### **2. 活动对比**

| 项目       | 近24小时开启的问题数 | 近24小时合并的PR数 | 发布状态       |
|------------|----------------------|--------------------|----------------|
| **vLLM**   | 7                    | 8                  | 稳定版：`v0.29.0` |
| **SGLang** | 5                    | 6                  | 稳定版：`v0.5.20` |
| **llama.cpp** | 4                 | 6                  | 无新版本发布     |
| **Ollama** | 6                    | 3                  | 无新版本发布     |
| **LiteLLM** | 6                   | 3                  | 预发布版：`v1.106.0-rc.2` |
| **Unsloth** | 3                   | 5                  | 测试版：`v0.1.907-beta` |

> ✅ *观察：* vLLM和SGLang在开发活跃度上领先；LiteLLM通过预发布候选版本推进安全与可观测性功能，而Ollama尽管活动量适中，却面临严重稳定性问题。

---

### **3. 模型支持竞赛**

| 新模型 / 架构              | 支持方                     | 关键进展                                                                 |
|----------------------------|----------------------------|--------------------------------------------------------------------------|
| **DeepSeek-V4.1-Flash**    | vLLM, SGLang, Ollama       | SGLang确认支持多GPU PCIe；Ollama存在云端回归问题                         |
| **Kimi K3 (MiniMax-M3) MegaMoE** | vLLM (MRV2)           | 首个在Model Runner V2上实现异构词汇草稿模型的项目                       |
| **Qwen3.8-Flash-Next**     | vLLM, SGLang               | 两项目均在进行ROCm/AMD MI355X优化；Triton FP8调优正在进行                   |
| **T-Head SAIL (Zhenwu)**   | SGLang (路线图)            | 已启动一级上游支持——早期采用者优势明显                                   |
| **K2 Horizon (MBZUAI IFM)** | Ollama (需求)              | 高需求的MoE架构正在讨论中；尚未实现                                     |
| **Qwen4Exp**               | llama.cpp                  | 增加多模态MTP与填充处理——本地运行时的独特优势                            |
| **Gemini-4-Argon**         | LiteLLM                    | 通过`continuationToken`实现自动续传，将流式输出长度扩展至约64K token     |
| **OpenRouter Responses API** | LiteLLM                   | 原生集成支持多轮推理，无需聊天桥接开销                                  |

> 🏆 **领先者：*vLLM* 在前沿模型与后端支持方面领先（尤其在MoE + 异构草稿方面），而*LiteLLM* 在网关层级创新上表现突出（如Responses API、自动续传）。

---

### **4. 性能前沿**

| 优化方向               | 领先项目                     | 关键进展                                                                 |
|------------------------|------------------------------|--------------------------------------------------------------------------|
| **KV缓存与内存管理**   | vLLM, SGLang                 | vLLM RFC #44276 提出按模型规划KV缓存；SGLang新增HiCache + PD解耦        |
| **批处理与吞吐量**     | SGLang, Unsloth              | SGLang权重缓存守护进程将加载时间从~300秒降至<1秒；Unsloth实现UI速度提升10倍 |
| **量化（FP8/NVFP4）**  | vLLM, SGLang, llama.cpp      | vLLM指出FP8 vs NVFP4存在1.7–1.8倍性能下降；SGLang新增BCG自动启用功能      |
| **分布式服务**         | SGLang, vLLM                 | SGLang推进预填充-解码解耦（PD）；vLLM优化MoE分片逻辑                      |
| **内核级调优**         | vLLM, SGLang, llama.cpp      | vLLM的MonoKernel抽象；SGLang的FlashInfer PCP；llama.cpp Vulkan `pool_2d`优化 |

> 🔥 **热点：*ROCm/AMD MI355X调优* 现已成为跨项目优先事项（vLLM、SGLang、llama.cpp），表明非NVIDIA生态系统的增长势头显著。

---

### **5. 层级定位**

| 项目       | 主要层级               | 角色概述                                                                 |
|------------|------------------------|--------------------------------------------------------------------------|
| **vLLM**   | **推理引擎**           | 低层高性能GPU内核引擎；作为众多网关的基础                                  |
| **SGLang** | **推理引擎 + 网关**    | 结合引擎能力与高级调度（PCP、PD）及统一API表面                              |
| **llama.cpp** | **本地运行时 / 边缘推理** | 轻量级、可移植的C++引擎，适用于CPU/NPU/边缘部署；依赖极低                |
| **Ollama** | **模型运行时 + CLI网关** | 面向开发者的接口，内置模型管理；连接本地与云端                             |
| **LiteLLM** | **通用大语言模型网关**  | 跨服务商抽象层；支持路由、成本追踪、结构化流式传输                          |
| **Unsloth** | **智能体导向运行时**    | 针对实时交互、UI响应速度与微调工作流进行优化                                |

> 🧩 **战略洞察：*vLLM* 和 *SGLang* 构成核心推理栈；*LiteLLM* 与 *Ollama* 扮演集成者角色；*llama.cpp* 与 *Unsloth* 则服务于日益增长的边缘/本地细分场景。

---

### **6. 趋势信号**

| 趋势                                  | 来自摘要的证据                                                                 | 开发者行动建议 |
|----------------------------------------|--------------------------------------------------------------------------------|----------------|
| **智能体推理日趋成熟**      | vLLM MRV2异构草稿、SGLang PD解耦、LiteLLM JSON模式流式传输                     | 优先选择具备强大工具调用与有状态生成支持的平台 |
| **异构硬件主导地位确立**   | AMD/ROCm、Intel XPU、Hexagon、Snapdragon X Elite、T-Head SAIL均受关注          | 避免厂商锁定；尽早测试跨平台兼容性 |
| **安全与可观测性成为核心** | LiteLLM的cosign签名镜像、数据库错误掩码、可观测性重构                           | 使用预发布版本时进行供应链完整性检查 |
| **性能退化 = 风险**        | Ollama吞吐量下降25–30%、vLLM CUDA死锁、SGLang KV缓存竞争过期                    | 严格基准测试升级；生产环境避免使用不稳定版本 |
| **微调与训练集成**         | Unsloth计划工作流、随机LoRA种子、未来Spark集群支持                              | 选用可统一推理+训练流水线的智能体平台 |

> ✅ **开发者关注清单：**  
> - 监控 **Ollama的`glm-5.3-flash:cloud`** 稳定性——待Issue #18980解决前避免用于生产。  
> - 评估 **vLLM的推测解码与异构草稿** 在下一代智能体系统中的适用性。  
> - 采用 **LiteLLM的OpenRouter Responses API** 实现高效、有状态的智能体对话。  
> - 准备基于 **SGLang和vLLM等支持ROCm/XPU的项目** 的跨硬件部署方案。

---

*报告生成于2026-10-14 | 数据来源：GitHub问题/PR元数据及官方发布信息*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **1. 今日亮点**  
vLLM 项目持续推进对前沿模型和硬件的支持，修复了推测解码、ROCm/AMD 性能以及 MoE 扩展性等关键问题。值得注意的是，PR #61538 与 #61536 统一了 DeepSeek V4/V4.1 与 Kimi K3 的 MegaMoE 后端，并在 Model Runner V2 上启用了异构词汇草稿模型支持——这是实现高效智能体推理的关键一步。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本。最新稳定版仍为 `v0.29.0`，当前工作重点集中在 `main` 分支的改进上。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731**：Issue #50576 跟踪 SM8x（Ampere: A100/A800, RTX 30xx）支持；目前因缺少内核兼容性而受阻。
- ✅ **Kimi K3 (MiniMax-M3)**：PR #60990 增加了对 ROCm 上 AITER 索引器中不支持的 index-head 数量的健壮错误处理。PR #61370 引入了针对 DSpark 部署在 TP/EP、P/D 以及图像输入场景下的 CI 测试。
- ✅ **ROCm / AMD MI355X**：持续优化 `Qwen3.8-2.4T-A95B` (#57149) 与 `Qwen3.8-Flash-Next` (#59575)，包括原生 FP8 Triton 调优 (#61091)。
- ✅ **Intel XPU (MLA)**：PR #58297 将 XPU MLA 支持集成至现有 `FLASH_ATTN_MLA` 后端，实现跨平台注意力加速。

> 🔗 [Issue #50576](https://github.com/vllm-project/vllm/issues/50576) | [PR #60990](https://github.com/vllm-project/vllm/pull/61538)

---

### **4. 性能与优化**  
- 📈 **NVFP4 与 FP8 KV Cache 性能对比**：在 SM120（Blackwell）上，NVFP4 因因果预填充比 FP8 慢 **1.7–1.8 倍**（Issue #50416）。这表明存在回归问题，需进行内核级调优。
- ⚙️ **MonoKernel 抽象层**：PR #61311 提出统一的 mono-kernel 抽象层，旨在减少模型族间的代码重复并提升可维护性。
- 🛠️ **ROCm 调优**：PR #61091 增加了针对 Radeon AI PRO R9700（gfx1201）RDNA4 调优的原生逐令牌 FP8 Triton 线性后端，有望实现更优的动态激活扩展。
- 🧩 **KV Cache 规划灵活性**：RFC #44276 提议按模型自定义 KVCache 规划，摆脱全局默认值，以实现更上下文感知的内存管理。

> 🔗 [Issue #50416](https://github.com/vllm-project/vllm/issues/50416) | [PR #61091](https://github.com/vllm-project/vllm/pull/61091)

---

### **5. 稳定性与回归问题**  
- 🔥 **CUDA Graph 死锁**：PR #60845 报告在完全分片的融合式 MoE LoRA 中，跨 TP rank（TP=2/4）出现间歇性死锁——严重级别高，尚未有修复方案。
- ❌ **前缀缓存损坏**：Issue #53912 确认在使用前缀缓存 + MTP 时，混合 Mamba/GDN 模型输出持续损坏（v0.28.0 版本）；已关闭的 Issue #43559 仍未修复。
- ⚠️ **GLM-5.2-FP8 + 前缀缓存**：重复提示返回乱码内容（Issue #60494），可能源于缓存状态过期或 FP8 处理错误。
- 🛑 **DFlash2 接受率下降**：当滑动窗口草稿变为真实 SWA 组时，推测解码准确率下降约 5.5 个百分点（Issue #60560），影响 P/D 拓扑结构。

> 🔗 [Issue #60845](https://github.com/vllm-project/vllm/issues/60845) | [Issue #60494](https://github.com/vllm-project/vllm/issues/60494)

---

### **6. 对应用开发者的影响**  
- **避免在 H20（SM90）上使用 `max_num_seqs > 256`**，直到 #56389 修复完成——高并发可能导致非法内存访问。
- **谨慎使用 `--fully-sharded-loras`**：该选项可能在启用张量并行的 MoE 模型中引发死锁（参见 #60845）。
- **仅在安全前提下启用前缀缓存**：混合 SSM/GDN 模型（如 Qwen3.5-397B-A17B-W8A8）在前缀缓存 + MTP 下可能出现输出损坏（#53912）。
- **关注 ROCm 性能表现**：尽管 AMD 支持不断增强，但仍需预期调优开销——特别是 Qwen3.8 变体及 NVFP4 量化场景。
- **规划推测解码稳定性**：MRV2 已支持草稿模型词汇异构性（#61536），但缺乏预热时早期验证步骤依然缓慢（#59260）。

> ✅ **建议**：仅在使用 CUDA 12.9 时使用 `vllm-openai:v0.31.0-cu129`；否则请避免，因存在 `torchcodec` 链接问题（#60406）。建议等待官方发布或从源码构建。

---  
*摘要生成于 2026-10-14 | 来源：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-10-14**

---

### **1. 今日重点**  
SGLang 生态系统在支持大规模、高吞吐推理方面持续成熟，关键进展包括 **Prefill-Decode 分离（PD）** 与 **HiCache 优化**，尤其针对 SM120（Blackwell）硬件。针对 PCIe 单独多 GPU 部署的 GLM-5.3-Flash 与 DeepSeek-V4.1 已合并关键稳定性修复，同时新提交的 PR 推进了 **单核插件支持** 和 **Rust 前端端到端测试**。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
未发布新版本或破坏性 API/配置变更。最新稳定版本仍为 `v0.5.20`（截至 2026-09-18）。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1-Flash**：已在 **8× RTX PRO 6000（SM120，仅 PCIe，无 NVLink）** 上确认运行，并通过 #40877 分享性能数据。  
- ✅ **通义 T-Head SAIL（Zhenwu 810/810E/M890P）**：已启动路线图 (#37519)，推进首流上游支持。  
- ✅ **AMD ROCm 支持**：DCP（解码上下文并行）现已在 ROCm 上启用 **GLM-5 / DeepSeek-V3.2** (#42618)。  
- ✅ **单核插件框架**：引入 RFC (#43949)，支持动态内核切换与持久化层执行。

> 🔗 [T-Head SAIL 支持](https://github.com/sgl-project/sglang/issues/37519) | [ROCm DCP 支持](https://github.com/sgl-project/sglang/pull/42618) | [单核 RFC](https://github.com/sgl-project/sglang/issues/43949)

---

### **4. 性能与优化**  
- 🚀 **权重缓存守护进程**：第一阶段已合并 (#27139)，将 Qwen3-235B FP8 的权重加载时间从 **~306–327 秒降至 <1 秒**。  
- ⚙️ **Prefill 上下文并行（PCP）**：FlashInfer 后端集成取得进展 (#33226)，目前已支持 GLM5.3-Flash (#42044)，并正在积极开发 Qwen3.8-Flash-Next (#39724) 的支持。  
- 🧠 **BCG 自动启用**：PR #44022 实现了对受支持的 Prefill CP 配置自动启用 BCG（可中断 CUDA Graph），暂不支持 DSV4（因哈希路由不一致）。  
- 💾 **HiCache 优化**：PR #43978 启用基于 THP 的并行主机池分配（可选），在高负载下显著提升内存分配吞吐。

> 🔗 [权重缓存守护进程博客](https://www.lmsys.org/blog/2026-08-21-sglang-weights-cache-daemon/) | [BCG 自动启用 PR](https://github.com/sgl-project/sglang/pull/44022)

---

### **5. 稳定性与回归问题**  
- ❌ **SM120 上的 GLM-5.3-Flash**：FA4 注意力后端在 CUDA Graph 捕获期间崩溃（混合扩展重塑）；仅 Triton 可用 (#42012)。  
- ❌ **DeepSeek-V4.1 + NVFP4 W4A4**：`--fp4-gemm-backend marlin` 在 SM100 上崩溃，因 `mm_fp4` 中缺少 'marlin' 后端 (#43988)。  
- ❌ **PD Prefill 提前发送竞争**：若缓存前缀在 HiCache 加载完成前发送，解码可能接收到过期的 KV (#44070)。  
- ❌ **原生 gRPC 生成**：当 `max_new_tokens` 未设置时，输出被限制在 128 个 token (#44121)。  

*修复中：*  
- PR #42760 修复了 PyTorch 检查点加载中的不安全 pickle 回退（存在安全风险）。  
- PR #44003 在融合归一化/旋转位置编码内核中增加 SWA 环写，用于 FP8 验证（对 DSV4 正确性至关重要）。

> 🔗 [GLM-5.3-Flash 崩溃](https://github.com/sgl-project/sglang/issues/42012) | [NVFP4 Marlin 崩溃](https://github.com/sgl-project/sglang/issues/43988) | [过期 KV 竞争](https://github.com/sgl-project/sglang/issues/44070)

---

### **6. 对应用开发者的影响**  
- **对于横向扩展部署**：优先使用 **HiCache + PD 分离** 的最新构建版本——尤其在 Blackwell（SM120）系统上。监控早期缓存前缀发送行为，避免静默正确性问题。  
- **对于模型特定调优**：在 #42012 修复前，仅将 FA4 作为备用方案用于 GLM-5.3-Flash。在修复落地前，避免在 SM100 上使用 `--fp4-gemm-backend marlin`。  
- **对于智能体构建者**：可通过近期 PR（如 #31176 和 #44152）期待增强的 **多输出生成** 与 **扩散服务** 能力。  
- **对于基础设施团队**：启用 **单核插件** 与 **BCG 自动启用** 可降低启动延迟并提升吞吐。注意 CI 不稳定问题 (#42752) 对发布节奏的影响。

> 🔗 [智能体开发建议](https://github.com/sgl-project/sglang/discussions) | [生产部署指南](https://github.com/sgl-project/sglang/wiki/Deployment-Scenarios)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-14**

---

### **1. 今日重点**  
最新更新聚焦于服务器和 WebGPU 后端的关键稳定性修复，特别是解决了由特殊标记转义（`<|name|>`）中递归正则表达式处理引发的栈溢出崩溃问题。针对 Vulkan 的 `pool_2d` 内核引入了一项关键优化：当池化窗口尺寸超过子组大小时，可完整处理整个子组，显著提升大上下文推理效率。此外，新增对 SME2 Q4_K 与 Q6_K 矩阵乘法操作的支持，扩展了高性能推理的量化选项。

---

### **2. 发布与破坏性变更**  
今日未发布新版本。但若干合并请求引入了需关注的行为变更：  
- **服务器**：`server : escape the special tokens without std::regex` ([#30243](https://github.com/ggml-org/llama.cpp/pull/30243)) 使用安全的基于字符串的转义方式替代 `std::regex_replace`，防止在处理 HTTP 请求时发生栈溢出——这可能影响依赖正则行为的自定义提示处理器。  
- **聊天输出格式**：聊天响应现在以部分数组形式返回，而非单一字符串 ([#30389](https://github.com/ggml-org/llama.cpp/pull/30389))，为未来支持细粒度的令牌解析（如工具调用或流式传输）奠定基础。使用 `chat` 输出作为扁平字符串的应用程序必须更新逻辑。

---

### **3. 新模型与硬件支持**  
- **模型**：新增对 **Qwen4Exp** 的支持，包括填充处理、64位数组元数据以及通过 [#30316](https://github.com/ggml-org/llama.cpp/pull/30316) 实现的多目标提示（MTP）功能。  
- **硬件/后端**：  
  - **Hexagon**：通过 `--hex-power-mode` 标志支持配置 HTP DCVS/HMX 电源模式 ([#30423](https://github.com/ggml-org/llama.cpp/pull/30423))。  
  - **WebGPU**：修复重复专家 ID 的 `mul_mat_id` 处理问题 ([#30451](https://github.com/ggml-org/llama.cpp/pull/30451))——对具有重复专家路由的 MoE 模型至关重要。  
  - **Vulkan**：新增 Intel Flash Attention 预填充内核，提升 Intel GPU 上的性能表现 ([#29357](https://github.com/ggml-org/llama.cpp/pull/29357))。

---

### **4. 性能与优化**  
- **Vulkan**：优化 `pool_2d` 内核，在窗口尺寸超过子组大小时可完整处理整个子组，减少线程发散，显著提升大上下文输入的吞吐量 ([#30119](https://github.com/ggml-org/llama.cpp/pull/30119))。  
- **SYCL**：修复 `mul_mat`、缓冲区拆分及主机内存池操作中的内存错误 ([#29889](https://github.com/ggml-org/llama.cpp/pull/29889))；同时修复构建过程中的编译警告 ([#30271](https://github.com/ggml-org/llama.cpp/pull/30271))。  
- **Meta 后端**：在内存池重新分配时重建所有子图，避免残留图状态问题 ([#30453](https://github.com/ggml-org/llama.cpp/pull/30453))，提升动态内存使用下的可靠性。  
- **内存效率**：为提示缓存引入严格的 RAM 限制强制执行机制 ([#25070](https://github.com/ggml-org/llama.cpp/pull/25070))，防止临时超分配。

---

### **5. 稳定性与回归问题**  
今日报告的顶级问题揭示了潜在稳定性风险：  
- **严重崩溃（Vulkan）**：在 AMD Strix Halo (gfx1151) 上处理长上下文（>128 ubatch）时触发 `decode() failed: vk::Queue::submit: ErrorDeviceLost`，导致 GPU 设备丢失 ([#30364](https://github.com/ggml-org/llama.cpp/issues/30364))。*暂无修复合并请求。*  
- **栈溢出（服务器）**：对长 `<|name|>` 字符串（如 d1-omni/kev 提示）调用 `std::regex_replace` 会引发递归崩溃；已在 [#30243](https://github.com/ggml-org/llama.cpp/pull/30243) 中修复。  
- **Metal 崩溃**：服务器报告“模型已加载”，但在初始化阶段因 Metal 内存不足（OOM）而崩溃，导致所有请求返回 500 错误 ([#27309](https://github.com/ggml-org/llama.cpp/issues/27309))。*修复待定。*  
- **Flash Attention 回退**：在 Intel Arc B580 上，FA 回退至 SCALAR 路径导致预填充（PP）性能降为 O(N²) 并引发设备丢失 ([#27638](https://github.com/ggml-org/llama.cpp/issues/27638))。

---

### **6. 对应用开发者的启示**  
- **更新提示处理逻辑**：避免对特殊标记转义依赖 `std::regex`，改用服务器代码中新的安全字符串方法。  
- **采用结构化聊天输出**：若使用 `chat` API，应从 `output_string` 切换至 `parts` 数组格式；这将为未来功能（如选择性令牌解析）提供支持。  
- **监控长上下文负载**：若部署在 AMD RDNA3/Vulkan 或搭载大上下文的 Intel Arc 平台，请测试 `ErrorDeviceLost` 风险，并考虑降低 `ubatch` 值。  
- **充分利用新硬件支持**：在 Hexagon NPU 上使用 `--hex-power-mode` 实现低延迟推理；在支持平台启用 Intel FA 内核以获得更优性能。  
- **谨慎管理模型缓存**：随着 `--cache-ram` 限制更加严格，确保应用程序能应对高吞吐场景下的缓存淘汰。

> 🔗 [GitHub 仓库](https://github.com/ggml-org/llama.cpp) | [官网](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-14**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展其代理与云集成能力，新增 *Wirken* 作为 `ollama launch` 的启动提供商（PR #18989）。多个平台出现关键性能与稳定性问题：所有模型的令牌吞吐量下降 25–30%（问题 #18968），Blackwell GPU 上间歇性发生 CUDA 崩溃（问题 #18232），自 10 月 12 日起 *glm-5.3-flash:cloud* 出现广泛生成失败（问题 #18980）。与此同时，核心基础设施工作包括重构云文档（PR #18972）以及改进结构化输出中的工具调用支持（PR #18975）。

---

### **2. 版本发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布或破坏性变更。*

---

### **3. 新模型与硬件支持**  
- 请求支持 *K2 Horizon* 模型（架构 `"k2-horizon"`）（问题 #18698），包含 MBZUAI IFM 提供的 0.9B、3.7B、7B、32B 及 36B MoE 变体。
- 针对基于 ARM 的 Windows 设备，寻求对 Snapdragon X Elite NPU 与 GPU 的支持（问题 #5360），凸显现代 AIPC 硬件上原生 NPU 加速的日益增长需求。
- MLX 后端正在积极开发，版本已升级（PR #18993），但更新后小型 Qwen 3.5 模型中出现更多思考循环，引发担忧。

---

### **4. 性能与优化**  
- **吞吐量下降 25–30%**：用户报告所有模型相较 v0.40.1 出现显著性能下降（问题 #18968）。基准日志表明推理内核或调度逻辑存在系统性退化。
- **CUDA 内核优化**：已定位 RTX 5060 Ti/5070 Ti（Blackwell）崩溃的根本原因——`num_ctx` 影响 Flash Attention MMA 内核的共享内存分配（问题 #18232）。
- **容器内 CPU 降频**：默认 `n_threads` 忽略 cgroup CPU 配额，在受限环境中导致吞吐量最高下降 45 倍（问题 #17916）。
- **MLX 运行时效率**：PR #17956 通过去重 CUDA 负载减少二进制体积并提升加载速度。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|---------|------|--------|-----------|
| ⚠️ 高 | #18980 | 大规模生成退化（`glm-5.3-flash:cloud`）——重复输出“the = the = the”；极可能是数据损坏或状态重置问题 | 开放 |
| ⚠️ 高 | #18968 | 所有模型相较 v0.40.1 出现系统性 25–30% 性能下降 | 开放 |
| ⚠️ 中 | #18983 | `openbmb/minicpm-v4.7:35b-a3b` 在 Windows 上因“未知投影器类型: minicpmv4_7”而失败 | 开放 |
| ⚠️ 中 | #18944 | 使用 `/api/chat` 接口时，若设置 `format: "json"`，工具调用会失败 | 开放 |
| ⚠️ 低 | #18796 | 在 RPi5/Debian 13 上，`ollama run` 第一次调用后静默挂起 | 开放 |
| 🔴 严重 | #18232 | Blackwell RTX 5060 Ti 上发生 CUDA 崩溃（`0xc0000409`，共享对象初始化失败） | 已部分诊断；暂无修复 |

---

### **6. 对应用开发者的影响**  
- **避免使用 `glm-5.3-flash:cloud`**，直至问题 #18980 解决——生产流程中预期输出不可靠。
- **若升级至 v0.40.1 以上版本，请预期性能下降**；部署前务必对关键模型进行基准测试。
- **在 Modelfile 中显式使用 `SYSTEM ""`** 以覆盖基础系统提示（PR #18990），尤其适用于代理或零样本应用场景。
- **使用 `format: "json"` 时工具调用可靠性受损**——建议改用基于模式的工具调用，或仅在必要时使用原始 JSON 格式。
- **代理开发者应关注 Wirken 集成**（PR #18989）：现已可通过 `ollama launch` 使用，支持安全、可审计的代理执行，配备加密凭据库与沙盒化工具。

> 🔗 **关键资源**：  
> - [问题 #18980 – glm-5.3-flash 回归](https://github.com/ollama/ollama/issues/18980)  
> - [PR #18975 – 结构化输出中的工具调用](https://github.com/ollama/ollama/pull/18975)  
> - [PR #18989 – Wirken 集成](https://github.com/ollama/ollama/pull/18989)  
> - [问题 #18232 – Blackwell CUDA 崩溃](https://github.com/ollama/ollama/issues/18232)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM Digest — 2026-10-14**

---

#### **1. 今日亮点**
最新进展聚焦于对 **OpenRouter 原生 Responses API** 和 **Claude JSON schema 流式传输** 的增强支持，解决了工具处理和多模态推理中的长期短板。关键修复包括 **安全加固（数据库错误屏蔽）**、**遥测稳定性** 以及在混合部署（如 vLLM、Bedrock Mantle）中 **模型路由一致性** 的提升。这些更新增强了生产环境推理流水线的可靠性，使 LiteLLM 作为通用 LLM 网关更加稳定。

---

#### **2. 发布与破坏性变更**
- **v1.106.0-rc.2** 已发布，重点优化安全性：
  - 所有 Docker 镜像现通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 签名，确保供应链完整性。
  - API 或配置无破坏性变更；此版本为预发布候选版，旨在正式发布前进行验证。

> 🔗 [GitHub Release v1.106.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.106.0-rc.2)

---

#### **3. 新模型与硬件支持**
- ✅ **OpenRouter Responses API** 通过 `feat(rust): add native OpenRouter Responses` ([#46000](https://github.com/BerriAI/litellm/pull/46000)) 实现原生支持 – 可实现多轮推理，无需经过聊天桥接开销。
- ✅ **MiniMax-H3/H3-Max 视频生成** 现通过 `/v1/videos` 接口支持 ([#43705](https://github.com/BerriAI/litellm/pull/43705))。
- ✅ **Gemini-4-Argon 自动续写** 功能已启用，使用 `continuationToken` 将单流输出上限从 32K 提升至约 64K ([#46240](https://github.com/BerriAI/litellm/pull/46240))。
- ✅ **Laya 与 Bespoke Nimble** 模型现已可在 UI 模型创建表单中使用 ([#45260](https://github.com/BerriAI/litellm/pull/45260))。

---

#### **4. 性能与优化**
- 🚀 **遥测系统重构** 引入 `AggregatingSink`、固定桶直方图及持久化实例 ID ([#45487](https://github.com/BerriAI/litellm/pull/45487), [#45490](https://github.com/BerriAI/litellm/pull/45490))，在保留可操作指标的同时将遥测数据量降低高达 90%。
- ⏱️ **Prometheus 指标标签优化**：避免重复标签，防止部分指标丢失 ([#46267](https://github.com/BerriAI/litellm/pull/46267))。
- 🔄 **vLLM 透传支出日志** 现已正确追踪路由器-模型调用的成本 ([#45733](https://github.com/BerriAI/litellm/pull/45733))。

---

#### **5. 稳定性与回归问题**
| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| [`#17475`](https://github.com/BerriAI/litellm/issues/17475) – 代理隐藏非管理员用户可见的模型 | 高 | 开放 | — |
| [`#46095`](https://github.com/BerriAI/litellm/issues/46095) – OpenRouter 流式返回错误的模型名称 | 中 | 开放 | — |
| [`#46052`](https://github.com/BerriAI/litellm/issues/46052) – `token_counter` 在数组 schema 缺少 `items` 时崩溃 | 高 | 开放 | — |
| [`#46209`](https://github.com/BerriAI/litellm/issues/46209) – Mistral 工具结果 + 流 → TypeError | 高 | 开放 | — |
| [`#46247`](https://github.com/BerriAI/litellm/issues/46247) – Bedrock Mantle 地理配置返回空响应 | 高 | 开放 | — |
| [`#46198`](https://github.com/BerriAI/litellm/issues/46198) – 仪表板对非管理员用户频繁记录堆栈跟踪日志 | 中 | 开放 | — |

> ✅ **已修复：**  
> - [`#46331`](https://github.com/BerriAI/litellm/pull/46331)：修复 Claude（Bedrock 与 Platform）上流式 `json_schema` 分块问题  
> - [`#46330`](https://github.com/BerriAI/litellm/pull/46330)：在项目创建期间隐藏原始数据库错误（安全加固）  
> - [`#46187`](https://github.com/BerriAI/litellm/pull/46187)：当 userinfo 失败时，SSO 回退使用 `id_token` 声明  

---

#### **6. 对应用开发者的意义**
- **构建更健壮的智能体**：利用原生 OpenRouter Responses 与 Gemini 自动续写功能，实现更长、带状态的交互，无需手动重试逻辑。
- **避免静默失败**：升级至 `v1.106.0-rc.2`，享受更好的错误处理（如不再暴露原始数据库异常）和更强的 token 统计容错能力。
- **增强可观测性**：借助新遥测功能，实时监控使用情况、成本漂移与路由行为——尤其适用于管理多团队部署的团队。
- **确保兼容性**：若使用 MCP 工具或 JSON schema 输出，请测试最新补丁，避免因缺少 `items` 或流合并不当导致崩溃。

> 💡 技巧提示：在隔离环境中，可通过本地报表表使用 `litellm.telemetry` sink 配合 `AggregatingSink` 进行遥测上报 ([#45490](https://github.com/BerriAI/litellm/pull/45490))。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-10-14**

#### **1. 今日亮点**  
Unsloth v0.1.907-beta 在 UI、推理引擎和模型服务栈方面实现了显著性能提升，得益于优化的缓存命中率（95%）和类 MoE 优化，多轮对话交互速度最高提升 **10倍**，推理速度提升 **5倍**。此次发布还改进了压缩逻辑，进一步提升了 API 处理能力和 UI 响应性。

#### **2. 发布与破坏性变更**  
- **v0.1.907-beta**（GitHub: [unslothai/unsloth/releases/tag/v0.1.907-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.907-beta))  
  - UI/UX 和推理速度获得重大性能提升。  
  - 所有 API 的压缩逻辑得到优化，桌面端与网页端 UI 稳定性增强。  
  - 未报告破坏性变更；向后兼容性已保留。

#### **3. 新模型与硬件支持**  
- **AMD RX 5700XT GPU 识别修复**：已在问题 #8529 ([已关闭](https://github.com/unslothai/unsloth/issues/8529)) 中解决，现可在 Unsloth Desktop 正常识别。  
- **旧版 NVIDIA 驱动下 Windows GGUF 支持**：PR #13671 在检测到 CUDA < 12 时，自动回退至 Vulkan/CPU `llama.cpp` 套件，显著提升对老旧显卡（如 GT 650M）的兼容性。  
- **请求添加 Flatpak 支持**：社区驱动功能请求 (#4380) 希望为 Unsloth Studio 提供 Linux Flatpak 打包版本。  
- **请求添加 NPU 支持**：功能请求 #1794 呼吁未来集成 NPU 后端。

#### **4. 性能与优化**  
- **多轮对话场景下 UI/UX 最高提速 10 倍**，得益于优化的状态管理与渲染机制。  
- **推理速度提升 5 倍**，实现方式包括：  
  - 关键值存储缓存命中率提升至 **95%**。  
  - 类 Strata 的 MoE 内核优化及性能下降缓解。  
  - 微批次溢出开销降低（PR #13674）。  
- **H100 特定 xformers 修复**：PR #13619 在缺失 `sm_90a` 内核时跳过 FA3，防止 H100 上发生崩溃（修复 #3963）。  
- **Apple Silicon 优化**：PR #13349 确保 sd.cpp 在 macOS 上使用全部 CPU 核心，而非仅启用一半核心。

#### **5. 稳定性与回归问题**  
- **关键 UI 竞态条件**：PR #13672 修复了聊天界面中因作曲器未稳定即触发验证导致的间歇性测试失败问题，提升了 CI 可靠性。  
- **TTS 截断错误**：PR #13648 通过允许更长音频生成并添加警告，解决了读屏在 2048 个 token 处截断的问题。  
- **Claude 会话持久化问题**：PR #13652 修复了在仅文本模式的 GGUF 会话中拒绝后错误重新发送图像的问题。  
- **浏览器面板 API 调用失败**：PR #13664 解决了浏览器面板内内部站点 API 调用失败的类似 CORS 问题（例如 HF 模型搜索）。  
- **MoE 缓存保护回归问题**：PR #13674 在遗漏 Codex 审查发现后，恢复了正确的微批次溢出处理机制。

#### **6. 对应用开发者的意义**  
开发者现在可期待**显著更快的推理速度与 UI 响应性**，尤其适用于多用户或长上下文场景。95% 的缓存命中率与类 MoE 优化，使系统在更低延迟下实现更高吞吐量，非常适合实时智能体系统。  

随着**Windows/GPU 兼容性改善**以及**更好的 TTS/音频处理能力**，部署灵活性在边缘设备与云环境之间均得到提升。对于智能体开发者：  
- 使用 **带有随机种子的 LoRA 训练**（PR #13637），以实现可复现的微调。  
- 利用 **计划工作流**（PR #13539），实现自动化数据管道与周期性模型更新。  
- 为 **未来的多节点 Spark 集群**（PR #10280）做好准备，支持在配对的 DGX 系统上进行分布式训练与推理。

> ✅ **建议**：立即升级至 v0.1.907-beta 以获得性能收益。若在多用户或浏览器集成环境中部署，请关注 PR #13674 与 #13664。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*