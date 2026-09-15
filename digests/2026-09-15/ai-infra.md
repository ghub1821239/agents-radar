# AI 基础设施日报 2026-09-15

> 生成时间: 2026-09-15 00:52 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-15**

---

### **1. 生态概览**  
2026年第三季度，AI推理基础设施领域正迅速向高吞吐、原生代理执行及深度硬件特化方向收敛。各项目愈发聚焦于通过分布式KV缓存、推测解码和多模态支持，实现可扩展的智能体工作流——尤其针对新兴的MoE与混合GDN架构。所有主要参与者均以关键稳定性修复为主导，反映出大语言模型生产级服务的日益成熟。与此同时，一个清晰的分化正在形成：*分布式推理引擎*（vLLM、SGLang）与*本地优先运行时平台*（llama.cpp、Ollama）各自优化于不同的部署模式。

---

### **2. 活动对比**

| 项目       | 开放问题 | 最近24小时合并的PR | 最近24小时发布 | 备注 |
|---------------|-------------|------------------------|----------------------|-------|
| **vLLM**      | 128         | 14                     | 无                 | 重点聚焦DeepSeek-V4.1与MoE稳定性；H20/MoE路径下出现严重崩溃 |
| **SGLang**    | 135         | 9                      | 无                 | B300/H20上出现高危回归；CI稳定性问题已报告 |
| **llama.cpp** | 97          | 12                     | v0.4.1               | 新增模型支持（Maple、Hy 4、Spark2.5）；GPU后端改进 |
| **Ollama**    | 142         | 6                      | v0.34.1-rc1          | RC版本含MLX内存修复；边缘平台稳定性存疑 |
| **LiteLLM**   | 89          | 5                      | 无                 | 关注成本准确性与代理稳定性；存在严重计费漏洞 |
| **Unsloth**   | 103         | 8                      | 无                 | 用户体验打磨及Docker/模型发现增强 |

> ✅ *观察*：尽管多数项目未发布新版本，**vLLM和llama.cpp** 技术推进速度最快，由模型特定优化与后端调优驱动。

---

### **3. 模型支持竞赛**

| 项目       | 新增模型 / 架构 | 核心差异化 |
|---------------|----------------------------------|---------------------|
| **llama.cpp** | Maple 20B-A1B、腾讯 Hy 4、Spark2.5、SenseNova U1（多模态） | 在*设备端多模态支持*方面领先；具备强大的CPU/GPU可移植性 |
| **SGLang**    | SenseNova-U1/U1.5、DeepSeek V4.1（FP4 KV缓存提案）、Qwen3.8-Flash-Next-FP8 | 早期采用*压缩FP4 KV存储*与*分布式智能体工作负载* |
| **vLLM**      | DeepSeek-V4.1-Flash（完整FlashMLA支持）、MoE内核修复 | 最先进的*MoE路由与推测解码集成* |
| **Ollama**    | 无新增模型；聚焦MLX/Jetson稳定性 | 优先保障*边缘与Apple Silicon可靠性*，而非新模型接入 |
| **LiteLLM**   | Gemma 4（通过Mantle）、Microsoft Agent 365 MCP防护机制 | 扩展*企业级安全与工具调用治理*能力 |
| **Unsloth**   | AMD ROCm特性分支、Docker内本地模型检测 | 通过Docker + 外部模型挂载推动*开放生态访问* |

> 🏆 **胜出者**：**llama.cpp** 在*新模型支持广度与多样性*上领先，尤其在多模态及非NVIDIA环境表现突出。  
> 🚀 **新锐领导者**：**vLLM** 在*架构创新*方面领先——尤其在MoE与FlashMLA优化方面。

---

### **4. 性能前沿**

| 优化方向           | 主要驱动力 | 关键证据 |
|------------------------------|-----------------|--------------|
| **KV缓存管理**      | vLLM、SGLang、Unsloth | vLLM中185k上下文时DFlash性能下降，SGLang HiCache分层风险，Ollama前缀缓存驱逐 |
| **推测解码**     | vLLM、SGLang    | vLLM #54691中DFlash减速，SGLang默认启用`fi_a2a` |
| **量化与内存**    | llama.cpp、Ollama、LiteLLM | Ollama修复Q2_0 GGUF，llama.cpp引入SYCL radix-select，SGLang支持FP4 KV |
| **分布式服务**      | SGLang、vLLM    | Helix DCP、共享读屏障、分片RDT配置 |
| **内核级优化**| vLLM、llama.cpp | FlashMLA内核、FA swizzle重构、MKL-FA合并 |

> 🔥 **趋势**：性能前沿已从原始吞吐转向*上下文可扩展性*与*内存效率*。长上下文推理（>100k token）现已成为核心竞争战场，尤其在MoE与混合GDN模型场景中。

---

### **5. 层级定位**

| 项目       | 层级角色                     | 核心差异化 |
|---------------|--------------------------------|---------------------|
| **vLLM**      | **推理引擎**           | 高吞吐、CUDA优化的标准工业级服务；云规模部署主导者 |
| **SGLang**    | **以智能体为核心的推理引擎** | 专为智能体工作流设计：支持DCP、分布式KV、结构化输出处理 |
| **llama.cpp** | **本地运行时 / 设备端推理** | 跨平台、轻量级，适用于边缘设备与个人使用 |
| **Ollama**    | **本地网关 / 开发者CLI** | 简化用户体验；连接本地推理与智能体工具 |
| **LiteLLM**   | **多提供商API网关** | 整合多家服务商，强制实施防护机制，支持成本感知路由 |
| **Unsloth**   | **智能体工作室 / UX平台** | 聚焦开发者体验、沙箱隔离与工具调用保真度 |

> 📌 *战略洞察*：不存在单一“最佳”技术栈——团队需根据部署模式选择：
- **云/规模化**：vLLM 或 SGLang
- **边缘/本地**：llama.cpp 或 Ollama
- **企业/API抽象**：LiteLLM
- **智能体开发**：Unsloth

---

### **6. 趋势信号**

#### 🔍 **从当前活动提炼的关键行业趋势**
1. **MoE与混合GDN模型成为新战场**  
   - vLLM与SGLang正竞相优化MoE路由、专家卸载与KV缓存分区。  
   - **开发者关注点**：留意增量式MoE卸载（RFC #38256）与压缩FP4存储——这些将决定大型模型（如Nemotron-3-Super-120B）在资源受限硬件上的可行性。

2. **长上下文推理已成为生产关键**  
   - vLLM中185k上下文时DFlash性能下降，Ollama在Jetson Orin上发生OOM，vLLM中GLM-5.3出现语义混乱，表明严重的可扩展性挑战。  
   - **开发者关注点**：在长上下文场景中，除非支持按序列长度禁用钩子，否则避免使用推测解码。

3. **硬件可移植性不再是可选项**  
   - AMD ROCm进展（vLLM、Unsloth）、Ascend NPU调优（SGLang）、Apple MLX优化（Ollama、Unsloth）、Intel Arc/SYCL改进（llama.cpp）表明对跨GPU兼容性的强烈需求。  
   - **开发者关注点**：始终使用`--gpu-memory-utilization`并尽早测试目标硬件。

4. **智能体工作流要求确定性状态与回放保真度**  
   - Unsloth的回放身份、SGLang的HiCache、Ollama的`OLLAMA_PREFILL_CACHE=1`均指向对可重现、可审计智能体行为的需求上升。  
   - **开发者关注点**：验证工具调用顺序与推理轨迹持久性——静默数据丢失仍是风险。

5. **企业级场景中成本准确性与安全性不容妥协**  
   - LiteLLM修复Gemini嵌入的双重计费问题，Unsloth引入权限提示，反映对支出审计与沙箱控制的压力持续增长。  
   - **开发者关注点**：启用防护机制，动态验证元数据，避免使用`previous_response_id`直至修复。

---

### ✅ **应用开发者建议**
- **优先稳定性而非功能**：在相关PR合并前，避免使用`--enable-mixed-chunk`、DFlash推测解码与`previous_response_id`。
- **未来兼容性设计**：使用动态模型能力探测（Unsloth、LiteLLM），避免硬编码假设。
- **跨硬件测试**：在AMD、Apple Silicon、Jetson等平台验证性能，不仅限于NVIDIA。
- **监控代理行为**：对于LiteLLM与Ollama，确保成本追踪与流式逻辑能应对已知的状态丢失问题。
- **采用模块化设计**：利用LiteLLM进行抽象，使用vLLM/SGLang实现扩展，通过llama.cpp/Ollama完成本地执行。

> 🛠️ *最后提醒*：单体推理堆栈的时代已结束。当今最优秀系统均为**模块化、多层级且硬件感知型**——请据此设计。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-15**

---

### **1. 今日亮点**  
vLLM 项目持续加速对 DeepSeek-V4.1 与 MoE 架构的支持，多个 PR 已合并，实现了 FlashMLA KV 记录、SWA 限定重放以及改进的推测解码功能。针对 ROCm（RDNA3）和 CUDA（T4）的关键稳定性修复已合并，同时报告了一个高严重性问题：在长上下文场景下，DFlash 推测解码出现崩溃，目前正积极调查中。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布或破坏性变更。*  
然而，针对 **DeepSeek-V4.1** 的集成工作正在进行，预示未来版本可能引入与 MoE 路由和 KV 缓存相关的模型特定优化及行为变更。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1-Flash**：通过 PR #56227（编码器侧 SWA 限定重放）和 #56752（解码器侧完成逻辑）扩展原生支持，实现完整 FlashMLA V4.1 KV 记录使用及融合注意力核函数（#56893）。  
- **ROCm（AMD）**：已合并 RDNA3 MoE 内核兼容性修复（#56790）、MiniMax-M3 的 AITER QK-norm 融合（#54535），以及分片 RDT 环境下 Ray NIXL 代理初始化问题修复（#56687）。  
- **CPU 与多模态**：新增 `--cpu-memory-utilization` CLI 别名以明确 GPU 内存配置意图（#56547）；CI 现在对多模态测试文件夹进行分片处理（#56910）。  
- **Intel GPU**：CI 改进包含在 #56910 中，强化 Intel GPU 测试支持。

---

### **4. 性能与优化**  
- **推测解码**：在 185k 上下文长度下，DFlash 性能显著下降（约 16 tok/s vs 无推测时的 ~71 tok/s），归因于每轮迭代中绘图器需重新扫描整个累积的 KV 缓存（#54691）。这凸显了为不同序列长度提供禁用钩子的必要性。  
- **MoE 效率**：增量 MoE 专家卸载提案 RFC (#38256) 提出采用 LFRU 淘汰策略并结合跨层预测，以最小化缓存缺失——这对在较小显存设备上运行大型 MoE 模型（如 Nemotron-3-Super-120B）至关重要。  
- **KV 卸载分层**：关于文件系统分层的完整性与 I/O 活跃性问题被提出（#54363），提示在 I/O 操作期间存在静默损坏或挂起的风险。  
- **性能分析**：CUDA 图捕获分析已扩展至 V2 模型运行器和编码器路径（#54061）。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR？ | 链接 |
|------|----------|--------|---------|------|
| 在高并发场景（H20，max_num_seqs > 256）下，`dsv4_topk` MoE 内核出现 `illegal memory access` | 严重 | 开放 | 否 | [#56389](https://github.com/vllm-project/vllm/issues/56389) |
| DFlash 推测解码在 185k 上下文长度下性能下降（Qwen3.5 混合 GDN） | 高 | 开放 | 否 | [#54691](https://github.com/vllm-project/vllm/issues/54691) |
| GLM-5.3-Flash 在代理式使用中退化为“乱语” | 高 | 开放 | 否 | [#56605](https://github.com/vllm-project/vllm/issues/56605) |
| FlashInfer + MTP 推测解码在 SM121（DGX Spark）上，当 GQA=16 时崩溃 | 严重 | 开放 | 否 | [#37754](https://github.com/vllm-project/vllm/issues/37754) |
| OTLP 追踪已初始化但从未发送，因缺少手动注入 | 中等 | 已关闭 | 是 | [#56696](https://github.com/vllm-project/vllm/issues/56696) |

---

### **6. 对应用开发者的启示**  
- **在 AMD ROCm 或高并发 H20 部署中使用 DeepSeek-V4.1 时需谨慎**，直至 #56389 和 #56790 修复完成。  
- **在混合 GDN 模型（如 Qwen3.5）上进行长上下文（≥185k）推理时，避免使用 DFlash 推测解码**，可考虑禁用或切换至替代方案。  
- **在显存有限设备上部署大模型时，密切监控 MoE 卸载行为**；增量专家卸载（RFC #38256）将很快提供更精细的控制能力。  
- **在 H20 GPU 上使用 DeepSeek-V4.1 时，确保正确配置 `max_num_seqs`**，以避免崩溃。  
- **仅在确认序列并行兼容性后启用 `VLLM_BATCH_INVARIANT=1`**，因为当开启 SP/异步 TP 时，批处理不变性会被破坏（#56370）。  

> 📌 *小贴士：* 在 CPU/GPU 环境中统一使用 `--gpu-memory-utilization`；新别名 `--cpu-memory-utilization` 提升了清晰度，但映射至同一底层字段。

---  
*摘要源自 GitHub 数据：[vllm-project/vllm](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-15

---

### **1. 今日亮点**  
SGLang 在支持高吞吐代理工作负载方面持续取得进展，分布式 KV 缓存系统和解码上下文并行（DCP）实现关键突破。针对 NVIDIA B300 与 H20 硬件上出现的 CUDA 非法内存访问问题，已修复多项关键稳定性缺陷，尤其影响 Qwen3.8-Flash-Next-FP8 与 DeepSeek-V4 的 FP8/MoE 路径。社区正积极追踪性能退化与 CI 测试失败情况，表明在重大功能发布前对可靠性有高度关注。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
- **注意：** 多项 PR 涉及配置与后端行为变更：
  - `--enable-mixed-chunk` 现需谨慎使用，因报告存在 Mamba 基数缓存检查点损坏问题（#39342）。
  - 引入 `SGLANG_FORCE_PREFILL_COARSE_WAR_BARRIER` 作为每批次可选关闭共享读完成机制的开关，默认将转向更严格的一致性策略（#37958）。

---

### **3. 新模型与硬件支持**  
- **模型支持：**
  - **SenseNova-U1/U1.5**：通过 #37742 追踪支持；参考实现来自 OpenSenseNova/SenseNova-U1。
  - **DeepSeek V4.1**：提议将主 KV 缓存存储为压缩后的 FP4 格式以适配 Hopper（#38902），旨在提升内存效率。
  - **Qwen3.8-Flash-Next-FP8**：在 H20 TP8 上对性能与稳定性进行持续跟踪（#37633）。
- **硬件与后端：**
  - **AMD MI35x**：新增 CI 扫描用于 AgentX Qwen3.5 MXFP4 + MTP tp2 基准测试（#38812）。
  - **Ascend NPU**：针对 gfx950 上 PTPC FP8 KDA 投影优化（#38764）；采样操作现已避免设备同步（#39404）。
  - **Apple Silicon**：已修复低并发下混合 SSM DP 注意力的问题（#34535）。
  - **NVIDIA 机密计算（CC）**：为 Blackwell CC 环境提供性能补丁，防止调度器阻塞（#36810, #31447）。

---

### **4. 性能与优化**  
- **解码上下文并行（DCP）：** Helix 并行进展顺利，融合 A2A 与 FlashInfer-MNNVL 通信后端；`fi_a2a` 已成为默认通信后端（`--dcp-comm-backend`）（#29736）。
- **内存效率：**
  - HiCache DSA 索引器存储经优化，仅对生产者层进行主机侧索引-K 分配压缩（#38426）。
  - 统一基数缓存现改为在淘汰时降级 MAMBA 节点而非直接剔除（#33713）。
- **内核与内存池：**
  - 修复 MLA 回缩过程中宽 KV ID 的 CPU 备份/恢复问题（#39487）。
  - 避免在后端自动探测期间加载不必要的扩散运行时（#39407）。
- **量化与 GEMM：**
  - 修复 Llama4 NVFP4 路由器输入权重在 SM120 上的兼容性问题（#35504）。
  - TRT-LLM DSv4 注意力集成计划支持 SM100/SM103（#33636）。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|------------|-----------|
| 🔴 高 | #37633 | QSA 预填充路径在约 22 个并发请求时发生硬崩溃（Qwen3.8-Flash-Next-FP8，H20 TP8） | [PR #39487](https://github.com/sgl-project/sglang/pull/39487) 待评审 |
| 🔴 高 | #37559 | B300 上 MXFP8FP4/W4A8 MegaMoE 路径出现 CUDA_ERROR_ILLEGAL_ADDRESS | 尚无修复 |
| 🔴 高 | #39342 | `--enable-mixed-chunk` 在混合 GDN 模型中导致 Mamba 基数缓存检查点损坏 | [PR #39342](https://github.com/sgl-project/sglang/pull/39342) 已提交 |
| 🟡 中 | #39147 | HiCacheFile 因错误的混合池逻辑报告不可恢复前缀 | [PR #39147](https://github.com/sgl-project/sglang/pull/39147) 正在处理 |
| 🟡 中 | #39072 | GLM-5.3 在去耦解码 + dp-attention + 特殊解码组合下崩溃 | 尚无修复 |

> ⚠️ **CI 流水线健康状况**：1 个失败，17 个不稳定，1000 个近期修复测试记录于 #17050 —— 正持续努力稳定基础设施。

---

### **6. 对应用开发者的意义**  
- **代理类工作负载：** 随着分布式 KV 缓存系统与 DCP 优化的逐步上线，预期将获得更好的可扩展性与更低延迟。请确保部署环境已准备好应对 PD 去耦合以及 HiCache 演进中的混合模型支持（#21846）。
- **硬件可移植性：** 若部署于 AMD MI35x 或 Ascend NPUs，近期的 CI 更新意味着更强的验证与性能调优能力——请充分利用新基准测试与优化特性。
- **稳定性提醒：** 使用基于 Mamba 的混合模型时，请暂勿启用 `--enable-mixed-chunk`，直至 #39342 合并。同样，除非绝对必要，否则不要在 H20/B300 上禁用 `--disable-overlap-schedule`。
- **面向未来：** 监控 `SGLANG_FORCE_PREFILL_COARSE_WAR_BARRIER` 与 `--dcp-size > 1` 配置——这些将在后续版本中很可能成为默认行为。

👉 **行动事项：**  
- 立即审查 PR #39487、#39342 与 #39147，其对生产环境稳定性有直接影响。  
- 更新 CI 流水线，反映 #17050 中的新测试状态。  
- 使用最新 `v0.5.13+` 构建版本，在 B300/H20 上使用 FP8/MoE 配置测试您的模型。  

[GitHub Repository](https://github.com/sgl-project/sglang) | [Issue Tracker](https://github.com/sgl-project/sglang/issues)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-15**

---

### **1. 今日亮点**  
`v0.4.1` 版本新增对 **Maple 20B-A1B**、**Tencent Hy 4** 和 **Spark2.5** 的支持，扩展了本地推理的模型生态。关键稳定性修复解决了 GPU 内存损坏（Metal/CPU）、SYCL 临时存储顺序问题以及 Vulkan 性能下降问题，同时 API 改动提升了类型安全性和 JSON 模式处理能力。

---

### **2. 发布与破坏性变更**  
- **v0.4.1**：发布版本，重点改进日志记录、聊天解析和子进程管理。  
  - 📌 **API 变更**：`llama_sampler_chain_n()` 现在返回 `int32_t` 而非 `int`。  
  - 🔗 [发布说明](https://github.com/ggml-org/llama.cpp/releases/tag/v0.4.1) | [验证文件](https://github.com/ggml-org/llama.cpp/attestations/47450174)

---

### **3. 新模型与硬件支持**  
- ✅ **新模型**：  
  - **Maple 20B-A1B** ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - **Tencent Hy 4** ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - **Spark2.5** ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - **SenseNova U1** ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919)) – 支持文本、图像及多模态生成。
- ✅ **后端与硬件**：  
  - HIP：通过 `fattn-mma` 在 CDNA 设备上启用 `fp32` 累加 (#28576)。  
  - SYCL：为大 `k` 值引入基于基数选择的 `TOP_K`，实现 GPU 居住式 top-k (#28670)。  
  - Vulkan：持续修复性能下降及 Flash Attention 回退问题 (#24066, #28752)。

---

### **4. 性能与优化**  
- ⚙️ **SYCL**：  
  - 合并 MKL-FA softmax 加载以减少工作项开销 (#28918)。  
  - 实现基数选择用于 `TOP_K`，避免往返 CPU (#28670)。  
- ⚙️ **CUDA**：  
  - 重构 FA 共享 SMEM 重排逻辑；正在优化各硬件行为 (#28536)。  
  - 添加对 CUDA 上连续一元核的支持 (#28821)。  
- ⚙️ **内存**：  
  - 修复睡眠/恢复时 `mmproj` 内存边际重复累加的问题 (#28233)。  
  - 通过 `LLAMA_STATE_SEQ_FLAGS_PARTIAL_ONLY` 优化 `kv-cache` 状态处理 (#28873)。

---

### **5. 稳定性与回归问题**  
- 🔴 **严重崩溃 / 回归**：  
  - **SYCL 多 GPU 崩溃** 出现在 Intel Arc Pro B50 + A770 组合上 (#27888) — *尚未提交修复 PR*。  
  - **Vulkan 性能下降** 在 RDNA3 GPU 上出现于 b10780 之后 (#28752) — *正在调查中*。  
  - **Metal 堆损坏** 由 macOS arm64 上 PCH 干扰引起 (#28858) — *已在 b10955 修复* (#28882)。  
- 🟡 **其他显著问题**：  
  - Metal 下高负载时无声音频损坏 (#28441)。  
  - Vulkan + Hexagon 后端组合使用时输出乱码 (#28891)。  
  - 启用 `ngram-mod` 时 SYCL 临时存储分配过高（>2GB）(#28860)。

---

### **6. 对应用开发者的意义**  
- **模型灵活性**：新增对 **Maple**、**Hy 4**、**Spark2.5** 以及 **SenseNova U1** 的支持，开发者可借助单一技术栈，在本地部署跨模态（文本、图像、音频）的多样化 LLM。  
- **GPU 效率**：SYCL 与 Vulkan 优化使现代 GPU（Intel Arc、AMD RDNA3）利用率更高，尤其适用于推测解码和高 k 值 top-k 采样。  
- **生产就绪**：对 `mmproj`、`kv-cache` 及 `state_read/write` 的修复确保长时间推理会话与智能体工作流更加可靠。  
- **API 注意事项**：更新使用 `llama_sampler_chain_n()` 的代码，预期其返回值为 `int32_t`。  
- **监控建议**：可安全使用 `/metrics` 端点——修复已使其免于 API 密钥校验 (#28915)。  

👉 **行动项**：  
- 使用最新 `v0.4.1` 构建版本测试您的模型，特别是若使用 SYCL/Vulkan。  
- 目前避免使用 `--device Vulkan0,HTP0`，直至 #28891 解决。  
- 建议升级至 `b10955+` 以防止 Apple Silicon 平台上的 Metal 堆损坏。

🔗 [GitHub 仓库](https://github.com/ggml-org/llama.cpp) | [官网](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-15**

---

### **1. 今日亮点**  
最新发布的 `v0.34.1-rc1` 版本为基于 MLX 的 Apple Silicon 与 Jetson 平台推理引入了关键的稳定性修复，包括前缀缓存淘汰优化和内存溢出（OOM）处理机制。核心问题报告指出长上下文工作流中持续崩溃以及工具调用解析失败等问题——目前已有多个针对核心服务器与 MLX 运行器逻辑的 PR 正在解决这些问题。

---

### **2. 发布与破坏性变更**  
- **`v0.34.1-rc1`**:  
  - ✅ *已修复*：ChatGPT 模型选择器界面间距问题（App 端）。  
  - ⚠️ *行为变更*：令牌重复限制提升至 100；无效输入现在将返回错误，而非静默截断。  
  - 🔧 *MLX 运行器*：加载模型前会检查系统内存，并主动淘汰前缀缓存快照以防止高负载场景下的内存溢出。  
  - 🔗 [GitHub Release v0.34.1-rc1](https://github.com/ollama/ollama/releases/tag/v0.34.1-rc1)

---

### **3. 新模型与硬件支持**  
- 📌 **新功能请求**：增加对 **高通 IQ-9075 NPU/GPU**（Dragonwing™ IQ9 系列）的支持 —— 用于 Raxda Fogwise Air 等设备。  
  - 🔗 [Issue #18445](https://github.com/ollama/ollama/issues/18445)  
- 📌 **功能请求**：增加对 **瑞芯微 NPU**（RK3588/RK3576）的支持。  
  - 🔗 [Issue #9268](https://github.com/ollama/ollama/issues/9268)  
- 📌 **请求支持 ROCm 10 for Windows** —— 对 AMD Ryzen AI Max+ 用户至关重要。  
  - 🔗 [Issue #18435](https://github.com/ollama/ollama/issues/18435)  

> *注：本周期未新增量化格式或模型后端。*

---

### **4. 性能与优化**  
- 🚀 **MLX 运行器加载进度与卡顿检测**（PR #17834）：  
  - 实现类似 pre-0.30 版本的进度追踪机制，避免慢速模型加载时提前超时。  
  - 解决 Apple Silicon（M 系列）上间歇性加载卡死问题。  
  - 🔗 [PR #17834](https://github.com/ollama/ollama/pull/17834)  
- 💾 **预填充缓存持久化（实验性）**（PR #17953）：  
  - 启用 `OLLAMA_PREFILL_CACHE=1` 后，KV 缓存在运行器重启时仍可保留。  
  - 减少多请求工作流中的冗余预填充计算。  
  - 🔗 [PR #17953](https://github.com/ollama/ollama/pull/17953)  
- 🧱 **Q2_0 GGUF 张量支持**（PR #18443）：  
  - 修复从 GGUF 文件读取 Q2_0 量化张量时的元数据导入失败问题。  
  - 扩展对新型量化方案的兼容性。  
  - 🔗 [PR #18443](https://github.com/ollama/ollama/pull/18443)  

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 🔴 高 | **#18396** | Gemma 4 E4B 多模态投影器在 Jetson Orin Nano 8GB 上即使使用 CPU 投影配置仍导致主机内存溢出。 | ❌ 开放 — 影响边缘部署 |
| 🔴 高 | **#18231** | 当长上下文请求与分页出的前缀缓存快照重叠时，MLX 运行器因内存溢出在请求中途崩溃。 | ⚠️ `v0.34.1-rc1` 中已有部分修复；完整解决方案待定 |
| 🔴 高 | **#18269** | `muse-glimmer:30b-mlx` 模型在 M4 Air（32GB 内存）上卡在“停止中...”状态。 | ❌ 开放 — 可能与 MLX 运行器生命周期相关 |
| 🟡 中 | **#18442** | `gemma4:26b` 在并发解码过程中丢失 EOS 标记；`qwen3.8-27b` 表现正常。 | ❌ 开放 — 可能为解码器回归问题 |
| 🟡 中 | **#18441** | 启用思考模式时，MLX 结构化输出会在 JSON 响应前附加一个多余的 `.`。 | ❌ 开放 — 破坏下游解析器 |
| 🟡 中 | **#18447** | 因 `getExistingName` 中大小写敏感的规范化导致间歇性“模型未找到”错误。 | ✅ 已在 PR #18438 修复 — 待合并 |

> ✅ **已修复的 PR**：#18438（模型未找到）、#18440（MLX Docker 补丁）、#18439（拒绝 `previous_response_id`）、#18434（支持续接）、#18437（URL 超时限制）。

---

### **6. 对应用开发者的启示**  
- **在修复前避免使用 `previous_response_id`**：当前行为会静默返回空响应 —— 若无法手动验证上下文完整性，请勿使用。  
  - 🔗 [PR #18439](https://github.com/ollama/ollama/pull/18439)  
- **实验性启用 `OLLAMA_PREFILL_CACHE=1`**：适用于长上下文的代理工作负载，可降低重复查询延迟。  
- **谨慎处理 Gemma 4 工具调用**：含空格的键名会导致静默拒绝（参见 #18390）；请清理输入或升级至打补丁版本。  
- **监控 Apple Silicon 上的 MLX 内存使用情况**：8 GiB 的前缀缓存预算在代理工作负载下可能触发大量交换（参见 #18131）；建议调优或升级硬件。  
- **关注 `v0.34.1` 发布**：包含关键的 MLX 与内存管理稳定性修复 —— 对生产级代理至关重要。

> ✅ 推荐：在正式上线前，尤其在 Apple Silicon 和嵌入式设备上，务必使用 `v0.34.1-rc1` 测试您的代理流水线。

---  
*摘要生成自 GitHub 数据：ollama/ollama — 2026-09-15*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-09-15**

---

### **1. 今日重点**  
最新提交集中修复了 **Gemini 嵌入模型** 和 **Vertex AI 音频输入** 的关键计费准确性问题，解决了影响支出追踪的重复计费缺陷。在稳定代理端的 **使用量聚合逻辑** 方面取得显著进展，已修复因未限制 API 密钥汇总导致大规模部署中发生 OOM 崩溃的问题。此外，已合并基础性工作以改进 **Rust 桥接生命周期管理**，为未来的性能提升奠定基础。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
然而，多个 **关键错误修复** 正待合并，可能包含于即将推出的 v1.87.2 补丁版本中：
- **PR #41157** – 修复 `gemini-embedding-2` 音频输入的双重收费问题（导致计费不准确） → [链接](https://github.com/BerriAI/litellm/pull/41157)
- **PR #41155** – 通过限制 API 密钥分组缓解管理员使用量仪表板中的 OOM 风险 → [链接](https://github.com/BerriAI/litellm/pull/41155)

> 🔔 *使用高数量 API 密钥的大规模部署开发者应关注此更新，以避免潜在查询引擎崩溃。*

---

### **3. 新模型与硬件支持**  
- 通过 Mantle 端点新增支持 **Gemma 4**（此前不支持）→ [问题 #30657](https://github.com/BerriAI/litellm/issues/30657)
- LiteLLM 的防护系统现已支持 **Microsoft Agent 365 MCP 工具调用护栏** → [PR #38241](https://github.com/BerriAI/litellm/pull/38241)
- **Fireworks 无服务器目录** 字段已补全缺失元数据（上下文窗口、视觉/工具支持）→ [PR #41152](https://github.com/BerriAI/litellm/pull/41152)

> ✅ *这些新增功能增强了多提供商代理的安全性，并扩展了企业后端的模型可用范围。*

---

### **4. 性能与优化**  
- **Rust 桥接生命周期基础** 已建立，包括共享路由契约和在公共边界上线的令牌计数器 → [PR #41153](https://github.com/BerriAI/litellm/pull/41153)  
  *→ 预期将降低路由延迟，并在高吞吐环境下提升内存安全性。*
- **无状态重播身份** 引入，实现更严格的测试重播保真度 → [PR #41149](https://github.com/BerriAI/litellm/pull/41149)  
  *→ 减少不稳定测试，增强集成稳定性信心。*

> 📈 *尽管目前尚无直接吞吐量指标，但这些改动为未来版本实现亚毫秒级路由优化奠定了基础。*

---

### **5. 稳定性与回归问题**  
今日报告的最高优先级稳定性问题：

1. **严重**：即使实际支出低于预算（虚拟密钥），仍触发 `BudgetExceededError` → [问题 #27735](https://github.com/BerriAI/litellm/issues/27735)  
   *– 尚无修复提交；影响团队级支出控制。*

2. **高**：`/v1/chat/completions` 流式响应中丢失提供方返回的 `reasoning_text` → [问题 #40654](https://github.com/BerriAI/litellm/issues/40654)  
   *– 影响依赖推理可追溯性的代理；修复提交待处理。*

3. **高**：管理员 UI 在导航时触发完整页面刷新及 404 预加载风暴 → [问题 #41029](https://github.com/BerriAI/litellm/issues/41029)  
   *– 影响用户体验并增加服务器负载；已在 PR #41029（已关闭）中修复。*

4. **中等**：上游主机离线时健康检查强制失败 → [问题 #34281](https://github.com/BerriAI/litellm/issues/34281)  
   *– 请求对临时或间歇性主机采用更优雅的失败模式。*

---

### **6. 对应用开发者的启示**  
- **计费准确性已列为首要任务**：若运行财务审计或成本感知型代理，请确保使用近期提交更新的定价数据。
- **防护机制更强大**：在 `pre_call` / `during_call` 模式中使用 `llm_as_a_judge` 可实现在工具执行期间的实时策略强制。
- **避免部署崩溃**：若您的代理服务超过 1000 个 API 密钥，请尽快升级以受益于 `api_key` 汇总修复（PR #41155）。
- **监控有状态行为**：`responses-to-chat` 桥接在流式传输中仍会丢失推理状态——对于审计关键工作流，请使用备选方案或缓存层。
- **规划界面优化**：管理员仪表板将在 UI 路由修复后（PR #41029）变得更具响应性。

> 💡 *对于生产级代理：启用 `cache_control` 断点，并验证推理痕迹是否能在 `responses` 与 `chat/completions` 端点之间桥接时保持完整。*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-15**

---

### **1. 今日亮点**  
Unsloth 生态系统持续演进，重点聚焦于稳定性、用户体验优化以及更广泛的模型可访问性。关键进展包括修复 `llama-server` 中的内存泄漏问题，以及显著提升工具调用回放的保真度，从而实现更可靠的智能体工作流。新增的 PR 引入了可配置的聊天宽度和增强的沙箱安全机制，同时正在进行的工作也扩展了通过 Docker 支持外部模型源的能力。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但多项重要变更即将生效：
- **PR #10959**：将从 `unsloth/unsloth` 镜像中移除 Docker 构建缓存，以减少注册表存储占用（节省 68.9 GB）。这可能会影响依赖缓存构建的 CI/CD 流水线。
- **PR #10933 + #10957**：Studio 现在会动态获取每个 API 模型（如 OpenRouter、Claude）的推理耗时和图像处理能力，取代原有的静态假设。这对依赖过时模型元数据的工具是破坏性变更——用户必须相应更新集成逻辑。  
🔗 [PR #10933](https://github.com/unslothai/unsloth/pull/10933) | 🔗 [PR #10957](https://github.com/unslothai/unsloth/pull/10957)

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 支持（进行中）**：功能分支 `feature/docker-rocm-support`（Issue #6230）已启用 RDNA2/3/4 及 CDNA GPU 的完整 ROCm 兼容性，与 NVIDIA CUDA 配置对齐。  
  🔗 [Issue #6230](https://github.com/unslothai/unsloth/issues/6230)
- **Docker 中的本地模型支持**：PR #10936 在以 Docker 运行 Studio 时，可自动检测并挂载 LM Studio、Ollama 与 Hermes 模型，显著提升本地模型的发现能力。  
  🔗 [PR #10936](https://github.com/unslothai/unsloth/pull/10936)
- **MLX 原生支持**：持续优化 Apple MLX 后端行为，包括修复回复中 `<|channel>` 重复拼接的问题（PR #10905）。  
  🔗 [PR #10905](https://github.com/unslothai/unsloth/pull/10905)

---

### **4. 性能与优化**  
- **内存泄漏修复**：PR #10911 通过在 `llama-server` 预填充阶段保持 SSE 流活跃，解决了慢速 CPU 主机上执行 `unsloth start pi` 时常出现的 `Error: terminated` 崩溃问题。  
  🔗 [PR #10911](https://github.com/unslothai/unsloth/pull/10911)
- **减少冗余处理**：PR #10927 通过仅编译一次正则交替表达式，而非每次调用都重建，优化了阻塞命令检查逻辑，降低 CPU 开销。  
  🔗 [PR #10927](https://github.com/unslothai/unsloth/pull/10927)
- **改进工具调用处理**：PR #10935 确保嵌套工具调用字段（如 `page_size`、`start_cursor`）按正确顺序保留，防止因 `llama.cpp` 语法限制导致静默数据丢失。  
  🔗 [PR #10935](https://github.com/unslothai/unsloth/pull/10935)

---

### **5. 稳定性与回归问题**  
今日报告的关键问题：
1. **Gemma 4 在图像输入下崩溃** (`#10559`)：`llama-server` 因默认 `ubatch` 太小而触发 `GGML_ASSERT`，影响使用 GPU 推理的 Linux 用户。  
   🔗 [Issue #10559](https://github.com/unslothai/unsloth/issues/10559)
2. **MLX 模型自动切换失败** (`#10951`)：安装的 MLX 模型若未手动预加载，将无法自动切换，返回 404 错误——影响 macOS 用户。  
   🔗 [Issue #10951](https://github.com/unslothai/unsloth/issues/10951)
3. **工具调用截断** (`#10839`)：MCP 调用被系统性截断，疑似由去重逻辑导致——影响长文本输出。  
   🔗 [Issue #10839](https://github.com/unslothai/unsloth/issues/10839)
4. **`llama.cpp` 更新后内存持续增长** (`#10921`)：用户报告在最近 `llama.cpp` 更新后出现内存无限制增长现象。  
   🔗 [Issue #10921](https://github.com/unslothai/unsloth/issues/10921)

> ✅ *大多数回归问题已有修复方案*：  
> - `#10911`（修复 `unsloth start pi` 崩溃）  
> - `#10905`（修复 MLX 通道重复）  
> - `#10927`（优化阻塞命令检查）

---

### **6. 对应用开发者的意义**  
- **智能体工作流更可靠**：得益于对持久运行的忠实回放（PR #10910）和工具调用处理的改进，你的智能体现在可在不同会话间保持状态一致性——这对调试与审计至关重要。
- **安全优先**：PR #10907 在任何工具访问沙箱外文件前引入显式权限提示。这使得在生产环境中部署自主智能体更加安全。
- **模型集成更具灵活性**：转向动态模型能力检测（PR #10933）意味着你的应用不应再假设“推理耗时”或“图像支持”等固定特性——始终应在运行时查询后端。
- **Docker 部署需特别注意**：避免将模型存储在临时容器中。应使用卷挂载（`/workspace/work`），并考虑采用 PR #10936 暴露本地模型。同时，请预期在 PR #10959 后缓存体积将减小。

> ⚠️ **行动建议**：  
> - 审查工具调用处理逻辑中的字段顺序（尤其嵌套对象）。  
> - 针对 `llama.cpp` 特定的模式约束进行测试。  
> - 更新 SDK 以支持动态模型能力。  
> - 在升级 `llama.cpp` 后监控内存使用情况。

---  
*摘要生成时间：2026-09-15 | 来源：[unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*