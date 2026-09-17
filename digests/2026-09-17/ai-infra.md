# AI 基础设施日报 2026-09-17

> 生成时间: 2026-09-17 00:51 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-17**

---

### **1. 生态概览**  
2026年9月，AI推理基础设施领域呈现出高性能服务引擎、轻量级本地运行时与智能网关之间的快速融合趋势——这由边缘、云及混合环境中对可扩展、低延迟大语言模型（LLM）部署的迫切需求所驱动。vLLM和SGLang等项目正推动推测性解码与内核级优化的边界，而llama.cpp和Ollama则更注重跨平台兼容性与开发者体验。LiteLLM作为核心编排器崭露头角，支持多提供商路由与成本控制，反映出生产环境中可观测性与预算管控日益增长的需求。与此同时，Unsloth对桌面端易用性与安全性的关注，预示着该生态正在成熟，终端用户可访问性与信任度已成为不可妥协的标准。

---

### **2. 活跃度对比**

| 项目       | 问题（开放） | PR（开放/活跃） | 发布（最近24小时） | 备注 |
|---------------|---------------|-------------------|----------------------|-------|
| **vLLM**      | 87            | 32                | 无                 | 高严重性回归问题主导；SM120/ROCm稳定性存疑 |
| **SGLang**    | 94            | 28                | 无                 | 关键CUDA核心转储追踪 #26340；ROCm势头强劲 |
| **llama.cpp** | 112           | 25                | **b11010–b11000**    | 多次稳定发布；优先修复Vulkan/CUDA问题 |
| **Ollama**    | 101           | 21                | 无                 | 重大变更：移除CLI代理；工具调用错误突出 |
| **LiteLLM**   | 78            | 19                | **v1.103.0-dev.1**, **v1.102.0-rc.2** | 通过cosign签名镜像强化安全；存在预算绕过风险 |
| **Unsloth**   | 67            | 17                | **Windows-ARM64二进制包** | 聚焦桌面端；修复SSRF漏洞 |

> ✅ *观察：* **llama.cpp** 在发布速度上领先，实现四次增量更新；**Ollama** 与 **LiteLLM** 推动API/用户体验迭代；**vLLM/SGLang** 仍聚焦于深层稳定性修复。

---

### **3. 模型支持竞赛**

| 新模型 / 架构         | vLLM        | SGLang       | llama.cpp     | Ollama       | LiteLLM     | Unsloth       |
|----------------------------------|-------------|--------------|---------------|--------------|-------------|---------------|
| **DeepSeek-V4.1-Flash**         | ✅ 完全支持     | ✅ 完全支持      | ✅ GGUF        | ✅           | ❌          | ✅ Qwen3.5/6支持 |
| **Qwen3.8-Flash-Next-FP8**      | ⚠️ 非确定性 | ✅ | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**               | ✅ （问题 #56868） | ✅ 融合内核 | ❌ | ❌ | ❌ | ❌ |
| **Hybrid Mamba/GDN**            | ⚠️ 严重缺陷（SM120） | ⚠️ 缓存损坏 | ✅ （MTP草案） | ❌ | ❌ | ❌ |
| **Hexagon K-Quants (Q4_K/Q6_K)**| ❌          | ❌           | ✅ **新增**      | ❌ | ❌ | ❌ |
| **Nemotron-H 视觉模型**    | ❌          | ❌           | ❌            | ✅ MLX支持 | ❌ | ❌ |
| **AMD ROCm 7.14 + gfx950**      | ⚠️ 优化 | ✅ 融合内核 | ⚠️ 回退机制 | ❌ | ❌ | ✅ 安装程序支持 |

> 🏆 **胜者：SGLang** — 在架构创新方面领先，实现完整的DeepSeek-V4.1集成与AMD ROCm融合。  
> 🥈 **亚军：llama.cpp** — 对新硬件（Hexagon）与量化格式的支持最快。  
> 🥉 **并列：vLLM 与 Ollama** — 模型覆盖广泛，但受稳定性问题困扰。

---

### **4. 性能前沿**

| 优化方向             | vLLM                        | SGLang                     | llama.cpp                  | Ollama                     | LiteLLM                   | Unsloth                  |
|-------------------------------|-----------------------------|----------------------------|----------------------------|----------------------------|---------------------------|--------------------------|
| **KV缓存效率**       | ✅ 每请求独立暂存空间（PR #57261） | ⚠️ HiCache写通缺陷 | ⚠️ 静默回退（PR #28633） | ✅ GPU内存预算管理 | ⚠️ 流式使用损耗 | ❌                         |
| **批处理与吞吐量**     | ✅ 上下文并行，MegamoE | ✅ 预填充-解码解耦路线图 | ✅ CUDA图支持MTP | ✅ 预热预填充缓存 | ✅ 速率限制器修复（PR #34140） | ❌                         |
| **量化与内存**     | ✅ FP8，MoE CPU卸载（PR #57215） | ✅ Zero-RoPE，融合内核 | ✅ Hexagon K-Quants（Q4_K/Q6_K） | ✅ `--load-mode dio`调优 | ❌ 模式验证失败 | ❌                         |
| **内核级优化**     | ✅ FlashInfer MegaMoE，K缓存收集 | ✅ 四内核融合（ROCm） | ✅ GEMM流水线，Adreno内核 | ❌                          | ❌                         | ❌                         |
| **分布式服务**       | ✅ Hybrid Mamba/GDN上下文并行 | ⚠️ 异步TP，序列并行 | ❌                          | ❌                          | ✅ 多提供商透传 | ❌                         |

> 🔥 **重点方向：**  
> - **vLLM**：在SM120/ROCm上实现可扩展的推测性解码与MoE/Mamba支持。  
> - **SGLang**：通过内核融合与PD解耦为未来可扩展性铺路。  
> - **llama.cpp**：通过Hexagon/K-Quants与CUDA图加速提升边缘性能。

---

### **5. 层级定位**

| 项目       | 主要层级              | 次要角色                              | 核心差异点 |
|---------------|----------------------------|------------------------------------------------|--------------------|
| **vLLM**      | **高性能服务引擎** | 分布式推理，推测性解码 | 大规模推理行业标准；GPU内核优化领导者 |
| **SGLang**    | **服务引擎 + 运行时** | 工具感知推理，缓存，异步调度 | 强调可组合性与有状态推理流水线 |
| **llama.cpp** | **本地运行时 / 边缘推理** | 量化，跨后端移植性 | 硬件多样性无出其右（Vulkan, OpenCL, Hexagon） |
| **Ollama**    | **开发者网关 / 本地运行器** | 模型管理，CLI用户体验，工具调用 | 本地开发到生产流程无缝衔接；极致用户体验导向 |
| **LiteLLM**   | **API网关 / 编排层** | 成本控制，可观测性，多提供商路由 | 计费、限流与提供商抽象的中央枢纽 |
| **Unsloth**   | **桌面工作室 / 开发环境** | 模型可视化，安全镜像处理 | 搭建本地开发与生产部署之间的桥梁 |

> 📊 *层级地图：*  
> - **基础设施栈（底层）：** llama.cpp, vLLM, SGLang  
> - **编排层（中层）：** LiteLLM, Ollama  
> - **前端/开发体验（顶层）：** Unsloth

---

### **6. 趋势信号**

#### 🔍 **从当前活动提取的关键行业趋势：**
1. **稳定性优先于速度**：尽管功能开发激进，但**关键稳定性问题占据主导地位**（如vLLM的非确定性贪婪输出、SGLang的CUDA核心转储）。这表明**生产就绪性已超越原始性能提升，成为更高优先级目标**。
2. **硬件多样化加速演进**：**Hexagon K-Quants（llama.cpp）、AMD ROCm 7.14（Unsloth）、Intel Arc Vulkan（llama.cpp）** 表明，**边缘与异构计算不再是小众场景**——基础设施必须覆盖GPU、APU及移动SoC。
3. **推测性解码趋于成熟但仍脆弱**：尽管vLLM与SGLang在混合Mamba/GDN与MTP草稿优化上持续推进，但**在SM120与ROCm上的回归问题凸显推测路径逻辑的脆弱性**——对关键任务部署构成警示。
4. **安全与信任已成为核心要求**：**Unsloth的SSRF修复、LiteLLM的cosign签名、Ollama的内存预算管理** 反映出向**设计即安全**的转变，尤其适用于面向消费者或企业级应用。
5. **代理工作流需要一致性**：工具调用解析失败（Ollama、SGLang）、静默数据丢失（HiCache）、推理层级断裂等问题表明，**代理可靠性依赖于可预测的输入输出与确定性行为**，而不仅仅是模型准确性。

#### 🛠️ **应用开发者行动建议：**
- 在混合模型（Mamba/GDN）或SM120上**避免使用推测性解码**，直到回归问题修复。
- **严格验证工具输出**——尤其是MiniCPM5-2B、Gemma4与Qwen3CoderDetector。
- 使用 `--cpu-offload-gb uva` 时**谨慎对待MoE模型**；务必验证内存缩减行为。
- 仅在禁用序列并行时启用 `VLLM_BATCH_INVARIANT=1`。
- 部署至Vulkan/SYCL时，**监控GPU驱动日志**并启用 `--verbose` 模式。
- **审计LiteLLM中的预算配置**——零成本模型可能绕过降级控制。
- 在Vulkan AMD GPU上**测试多模型加载**——崩溃风险依然较高。

> ✅ **最终结论：** AI基础设施栈正从“最快”转向“最可靠且最安全”。选择工具不仅要看性能，更要考量**可预测性、可维护性与安全性**——尤其是在代理与实时系统上线之际。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-09-17**

#### **1. Today's Highlights**  
在 SM120（GB10/B300）平台上的推测解码（speculative-decoding）和量化 MoE 模型中暴露出关键的正确性与稳定性问题，包括非确定性的贪心输出和非法内存访问错误，尤其影响 DeepSeek-V4.1-Flash 与 Qwen3.8-Flash-Next。与此同时，针对 ROCm 和混合 Mamba/GDN 模型的关键性能优化正在优先推进，相关 PR 正在聚焦于推测解码临时空间的内存效率及上下文并行化。

#### **2. Releases & Breaking Changes**  
*过去 24 小时内无报告。*  
未发布新版本或破坏性 API/配置变更。v0.29.0 预编译内核仍被使用；用户应关注与 `VLLM_USE_PRECOMPILED=1` 相关的潜在回归问题。

#### **3. New Model & Hardware Support**  
- **Model Support**:  
  - **Qwen3.8-Flash-Next-FP8** 在接近 `indexer_budget` 时，贪心解码的确定性行为正受到积极审查（问题 #54521）。  
  - **DeepSeek-V4.1-Flash + DSpark** 在多个后端（SM120、ROCm）的支持正持续增强，当前正在修复稀疏 MLA 预填充和草稿预热崩溃问题（问题 #56443、#56771）。  
  - **GLM-5.3-Flash** 在累积推理后出现长序列解码退化现象（问题 #56868），表明可能需要模型特定调优。

- **Hardware & Backend**:  
  - **ROCm (MI355X)**：针对 DeepSeek-V4.1-Flash 的性能优化正在进行中（问题 #56506），PR #56720 改进了 K-cache 收集网格尺寸。  
  - **Intel XPU / UVA Offloading**：MoE 专家权重在 CPU 卸载后处理过程中已保持完整（PR #57215），解决了加载阶段的 OOM 问题。  
  - **SM120 (GB10/B300)**：在统一内存系统上确认多个关键缺陷，尤其在混合 Mamba/GDN 和 MoE 模型中（问题 #56457、#52225）。

#### **4. Performance & Optimization**  
- **Speculative Decoding Efficiency**:  
  - PR #57261 通过按请求分配而非按并发槽位分配推测解码临时内存，显著降低内存占用，对混合 Mamba 模型至关重要。  
  - PR #57048 优化了 Kimi-K3 合成验证器后缀，将目标行数从 7 减至 4，同时保留接受逻辑。

- **Kernel & Memory Optimizations**:  
  - PR #56720 通过将网格大小与实际前缀长度对齐，提升了 ROCm 平台 K-cache 收集内核效率，减少不必要的内存操作。  
  - PR #57258 将 DeepGEMM 预热顺序调整至 KV-cache 性能分析之前，防止启动阶段发生 OOM。  
  - PR #54049 集成 FlashInfer 的 CuteDSL MegaMoE 内核，实现大批次预填充加速（目标 >10k tokens）。

- **Throughput Metrics (ROCm)**:  
  - 在 8x MI355X（TP4）上测量：DeepSeek-V4.1-Flash 在并发度为 1 时达到约 35.89 输出词元/秒，但仍有较大提升空间（问题 #56506）。

#### **5. Stability & Regressions**  
**高严重性**:  
- **Qwen/Qwen3.8-Flash-Next-FP8 中的非确定性贪心解码**，由预填充阶段的 `persistent_topk` 引起（问题 #54521，48 条评论）。相同提示可复现不同输出。*尚未提交修复 PR。*  
- **SM120 上 DeepSeek-V4.1-Flash + DSpark 的稀疏 MLA 预填充中非法内存访问**（问题 #56771，6 条评论）。*PR #57028 部分解决此问题。*  
- **H200（SM90）上 draft warmup 期间 `map_draft_to_target` 的 CUDA 设备端断言失败**（问题 #56443，8 条评论）。*修复待定。*

**中等严重性**:  
- **当启用序列并行 + 异步 TP 时，批处理不变性被破坏**（`VLLM_BATCH_INVARIANT=1`）（问题 #56370，17 条评论）。  
- **vllm0.19.1 在 Qwen3.6-27B-FP8 上无法转换 KV cache 规范**（问题 #42911，11 条评论）。  
- **tool choice='none' 会静默删除工具调用格式内容**（问题 #55080，6 条评论）。

#### **6. What This Means for Application Developers**  
- **在 Issue #57002 解决前，避免对 ModernBert 等仅编码器模型使用 `--enable-lora`。**  
- **若提示长度接近 `indexer_budget`，请勿依赖 Qwen3.8-Flash-Next 的确定性贪心输出；预期结果可能非幂等。**  
- **在启用了 WNA16 压缩的 MoE 模型上谨慎使用 `--cpu-offload-gb uva`——预期的内存缩减可能不会发生**（问题 #57008）。  
- **密切监控 SM120 与 ROCm 平台上的推测解码稳定性，尤其是 DeepSeek-V4.1-Flash 与混合模型。**  
- **如使用序列并行或异步 TP，启用 `VLLM_BATCH_INVARIANT=1` 须格外小心**（问题 #56370）。  
- **考虑对 Qwen3 XML 工具解析使用 `--reasoning-parser qwen3`，但需注意内容合并的特殊行为**（问题 #51679）。

> 🔗 [GitHub Issues Summary](https://github.com/vllm-project/vllm/issues?q=is%3Aopen+updated%3A2026-09-16..2026-09-17) | [PRs Active Today](https://github.com/vllm-project/vllm/pulls?q=is%3Aopen+updated%3A2026-09-16..2026-09-17)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-17

---

### **1. 今日亮点**  
SGLang 生态系统持续成熟，AMD ROCm 支持取得重大进展，包括 DeepSeek-V4.1 的完整集成，以及 GLM-5.3-Flash 的新融合内核。在 **HiCache 写穿透持久化逻辑** 和 **Qwen3Coder 检测器对转义引号的处理** 方面实现了关键稳定性改进，但一个高严重性 CUDA 核心转储追踪问题（#26340）仍处于活跃状态，拥有 312 条评论，表明底层 GPU 可靠性问题仍在持续。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未观察到新的版本发布或破坏性 API/配置更改。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1**：通过 PRs [#38798](https://github.com/sgl-project/sglang/pull/38798)、[#39666](https://github.com/sgl-project/sglang/pull/39666) 和 [#39665](https://github.com/sgl-project/sglang/pull/39665) 实现了完整的模型与运行时集成，涵盖视觉塔、图像预处理、聊天编码、工具解析及 Engram 模块支持。  
- **AMD ROCm (gfx950)**：为 GLM-5.2 提供融合 DSA 索引解码路径 ([PR #38583](https://github.com/sgl-project/sglang/pull/38583))，并为 GLM-5.3-Flash 提供零 RoPE MHA 预填充支持 ([PR #39338](https://github.com/sgl-project/sglang/pull/39338))。  
- **T-Head PPU**：已启动对 ZW810/810E/890P 显卡的一流支持路线图 ([Issue #37519](https://github.com/sgl-project/sglang/issues/37519))。  
- **SenseNova-U1/U1.5**：功能跟踪现已启动 ([Issue #37742](https://github.com/sgl-project/sglang/issues/37742))。

---

### **4. 性能与优化**  
- **权重缓存守护进程（第一阶段）**：使用 CUDA IPC 的每排名守护进程将 Qwen3-235B FP8 的权重加载时间从 **~306–327 秒降低至 <1 秒**（[Issue #33522](https://github.com/sgl-project/sglang/issues/33522)，合并于 #27139）。  
- **预填充-解码分离**：跨架构和并行策略的 PD 分离路线图正在推进中（[Issue #21703](https://github.com/sgl-project/sglang/issues/21703)）。  
- **内核融合**：  
  - AMD ROCm：为 GLM-5.2 DSA 索引解码实现四内核融合（[PR #38583](https://github.com/sgl-project/sglang/pull/38583)）。  
  - Qwen3-Next：将 GDN 预填充内核链融合为单一融合操作（[PR #39873](https://github.com/sgl-project/sglang/pull/39873)）。  
- **推测解码**：Triton 验证现在使用运行时标记宽度以提高准确性（[PR #39859](https://github.com/sgl-project/sglang/pull/39859)）。

---

### **5. 稳定性与回归问题**  
高严重性问题仍处于活跃状态，修复的 PR 尚未发布：  
1. **CUDA 核心转储追踪器** (#26340)：来自 CI 运行的自动收集崩溃（312 条评论）；根本原因未知。影响多个模型和后端。[GitHub Issue](https://github.com/sgl-project/sglang/issues/26340)  
2. **分层缓存逻辑缺陷** (#39830)：混合 GDN/Mamba 模型因缓存状态损坏返回错误输出——影响多轮推理。[GitHub Issue](https://github.com/sgl-project/sglang/issues/39830)  
3. **HiCache 写穿透持久化失败** (#39444)：首次出现的前缀在完整 KV 备份至存储前被驱逐——存在数据丢失风险。[GitHub Issue](https://github.com/sgl-project/sglang/issues/39444)  
4. **Qwen3CoderDetector 字符串解析缺陷** (#39836)：重复的 `<parameter=NAME>` 标签会无声截断 JSON 参数。[GitHub Issue](https://github.com/sgl-project/sglang/issues/39836)  

*注：今日已合并若干回归修复（如基准测试缓存状态日志、SafeUnpickler 限制），但尚未有针对核心崩溃的直接修复。*

---

### **6. 对应用开发者的启示**  
- **可放心使用 AMD ROCm** 处理 DeepSeek-V4.1 与 GLM-5.3-Flash 工作负载——性能优化正在快速落地。  
- **在 Mooncake Store 上避免使用 `--hicache-write-policy write_through`**，直到 #39444 修复，否则在驱逐过程中可能引发静默数据丢失。  
- **在混合模型（GDN/Mamba）和高并发场景（H20/H100）中谨慎使用推测解码**，因内存访问错误和调度器崩溃问题依然存在。  
- **使用 `Qwen3CoderDetector` 时务必仔细验证函数调用输出**，尤其是涉及希伯来语或带引号的参数值时——可能出现静默解析错误。  
- **基准测试工具（`bench_serving`）现在会记录缓存状态**，因此结果反映实际运行行为——请确保生产环境中的缓存设置一致。  

> 💡 *小贴士：在基准测试中始终使用 `SGLANG_IS_IN_CI=1`，以匹配 CI 行为，避免误导性的吞吐量数据。*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

### **1. 今日亮点**  
最新发布周期（b11010–b11000）为 MoE 和融合 QKV 模型带来了关键的 Vulkan 与 CUDA 稳定性修复，包括针对影响 `argsort_large.comp` 的 NVIDIA 驱动程序缺陷的临时解决方案。新增对 Hexagon K-Quants（Q4_K/Q6_K）的支持，使高通 AI 芯片上的设备端高效推理成为可能；同时，MTP 草稿解码和计算图缓存的改进，提升了各后端下的推测性执行性能。

---

### **2. 发布与破坏性变更**  
- **`b11010`**：修复了因 NV 驱动程序缺陷导致的 Vulkan 崩溃问题（`argsort_large.comp`）——对 Turing+ GPU 上的稳定推理至关重要 ([PR #28975](https://github.com/ggml-org/llama.cpp/pull/28975))。  
- **`b11007`**：启用 CUDA 图支持 MTP 草稿解码，降低推测生成过程中的开销 ([PR #28549](https://github.com/ggml-org/llama.cpp/pull/28549))。  
- **`b11006`**：完整支持 Hexagon Q6_K 与 Q4_K 内核——解锁高通骁龙平台上的低精度量化能力 ([PR #28994](https://github.com/ggml-org/llama.cpp/pull/28994))。  
- **`b11000`**：修复 Spacemt 后端中错误的转置函数（`rvv_transposed_s32_mn_to_nm` → `s16`），防止 int16 操作中的数据损坏 ([PR #25161](https://github.com/ggml-org/llama.cpp/pull/25161))。

> 🔔 *迁移提示*：使用 `--fuse-qkv` 且模型为 Gemma 4 或 Qwen3.5 的用户必须升级至 b11006 及以上版本，以避免状态分裂错误；旧版构建可能在注意力计算过程中无声失败或崩溃。

---

### **3. 新模型与硬件支持**  
- **模型**：  
  - 新增对 `HrmTextForCausalLM`（DFM Mimir 1B）的支持，通过交替低/高周期实现双栈变换器推理 ([PR #27625](https://github.com/ggml-org/llama.cpp/pull/27625))。  
  - 扩展兼容 Qwen3.6-35B-A3B-MTP、Qwen3.8-27B-Hybrid-DeltaNet 以及 DeepSeek-v4-flash-vision GGUF 变体。
- **硬件与后端**：  
  - **Hexagon**：高通 AI 加速器（如骁龙 X Elite）现已全面支持 K-Quant（Q4_K/Q6_K）。  
  - **Vulkan**：优化零值 rope 探针处理，防止 Gemma 4 模型中解码图分裂 ([PR #28995](https://github.com/ggml-org/llama.cpp/pull/28995))。  
  - **CUDA/HIP**：改进 `im2col` 中的访问模式，提升内存合并效率 ([PR #28013](https://github.com/ggml-org/llama.cpp/pull/28013))。

---

### **4. 性能与优化**  
- **推测性解码**：  
  - MTP 草稿使用 CUDA 图后，在高吞吐场景下重新计算延迟降低约 30% ([PR #28549](https://github.com/ggml-org/llama.cpp/pull/28549))。  
  - RPC 服务器现在在释放缓冲区时会失效缓存的计算图，避免旧内核重复使用 ([PR #24292](https://github.com/ggml-org/llama.cpp/pull/24292))。  
- **内存与内核效率**：  
  - 针对 RDNA 3.5 GPU 优化 `MMQ` 流水线，通过拆分 MMA/load tile 提升指令级延迟隐藏能力 ([PR #28714](https://github.com/ggml-org/llama.cpp/pull/28714))。  
  - 新增 `kernel_gemm_noshuffle_q6_k_f32_32b_trans_ila_a8_bin` 用于 Adreno OpenCL —— 改善 Q6_K 模型的 GEMM 吞吐量 ([PR #28678](https://github.com/ggml-org/llama.cpp/pull/28678))。  
- **工具链**：  
  - `llama-bench` 现在支持 `--repack`，使代码路径与 `llama-cli` 对齐，实现跨后端的一致基准测试 ([PR #28968](https://github.com/ggml-org/llama.cpp/pull/28968))。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 受影响后端 | 修复状态 | GitHub 链接 |
|---------|------|------------------|------------|-------------|
| 严重 | MoE 模型（Qwen3.6-35B-A3B-MTP）在 Intel Arc B70 Vulkan 上崩溃 | Vulkan | ❌ 未解决 | [#23769](https://github.com/ggml-org/llama.cpp/issues/23769) |
| 高 | SYCL：`ngram-mod` 导致 2GB+ 临时内存分配，双 Arc Pro B70 出现 TDR 重启 | SYCL | ❌ 未解决 | [#28860](https://github.com/ggml-org/llama.cpp/issues/28860), [#28778](https://github.com/ggml-org/llama.cpp/issues/28778) |
| 高 | Vulkan/RDNA3 上从 b10780 之后提示处理速度下降约 25 倍 | Vulkan | ⚠️ 部分缓解 | [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) |
| 中等 | RTX 5060TI 上使用 IQ3_S 量化时出现垃圾输出 | CUDA | ❌ 未解决 | [#28581](https://github.com/ggml-org/llama.cpp/issues/28581) |
| 中等 | numpy 1.* 下 Q8_0 量化存在数据损坏 | Python 工具链 | ❌ 未解决 | [#28438](https://github.com/ggml-org/llama.cpp/issues/28438) |

> 💡 *注意*：多个问题涉及静默降级（例如 4 位 KV 缓存卸载至 CPU）——建议显式设置 `GGML_CUDA_FA_ALL_QUANTS=ON` ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633))。

---

### **6. 对应用开发者的意义**  
- **部署 MoE 模型？** 立即升级至 `b11010+`——旧版本在 Intel Arc 与 Vulkan 上存在崩溃风险。谨慎使用 `--no-kv-offload`，某些模型可能提前触发 EOS ([#24519](https://github.com/ggml-org/llama.cpp/issues/24519))。  
- **构建基于推测性解码的智能体？** 利用 `b11007+` 的 CUDA 图支持加速 MTP 草稿生成。监控 `/metrics` 端点计数器（功能请求 [#26516](https://github.com/ggml-org/llama.cpp/issues/26516) 待实现）。  
- **面向移动端/边缘设备？** 新增 Hexagon K-Quants（Q4_K/Q6_K）支持，实现高效设备端推理——非常适合基于高通 SoC 的移动智能体。  
- **使用量化工具？** 通过 PR [#28474](https://github.com/ggml-org/llama.cpp/pull/28474) 在 `llama-quantize` 中启用 `--no-fallback`，尽早发现张量形状不匹配问题。  
- **避免静默失败？** 显式设置 `GGML_CUDA_FA_ALL_QUANTS=ON`，防止 4 位 KV 降级导致预填充速度降至 CPU 水平 ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633))。

> ✅ **最佳实践**：在多 GPU 或混合系统上部署时，始终使用 `--verbose` 并监控 GPU 驱动日志（尤其针对 SYCL/Vulkan）。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-17**

---

### **1. 今日亮点**  
Ollama 生态系统持续演进，重点聚焦稳定性、开发者体验以及跨平台可靠性。主要进展包括根据用户反馈移除内置 CLI 代理（PR #18393），同时新提交的 PR 解决了关键的工具调用解析问题（如 MiniCPM5-2B、Gemma4）以及 MLX 在 CUDA 上的 GPU 内存管理。针对 `qwen3-vl:8b-instruct` 在 Vulkan AMD 显卡上加载多个模型后崩溃的问题（Issue #18494），正在推进重大修复。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
- **破坏性变更：** 内置 CLI 代理已通过 [PR #18393](https://github.com/ollama/ollama/pull/18393) 移除，回退至旧版聊天界面。此变更影响依赖自动代理执行的工作流；用户需通过未来功能标志或外部启动器手动启用（[Issue #18490](https://github.com/ollama/ollama/issues/18490)）。  
- **API 更新：** `/api/show` 与 `ollama show` 命令现通过 [PR #18473](https://github.com/ollama/ollama/pull/18473) 暴露模型特定的 `supported_reasoning_levels` 与 `default_reasoning_level`，使客户端可验证推理层级兼容性。

---

### **3. 新模型与硬件支持**  
- **模型新增请求：** 社区对 Mistral AI 最新开源版本 **Mistral Small 4** 的需求持续增长（[Issue #15142](https://github.com/ollama/ollama/issues/15142)）。  
- **硬件/后端更新：**  
  - MLX 引擎现已支持 **Nemotron-H 视觉模型**，具备动态分辨率预处理和 MTP 偏移功能（[PR #17714](https://github.com/ollama/ollama/pull/17714)）。  
  - MLX 运行时通过延迟初始化 GPU 状态，避免在 Windows 启动阶段发生崩溃（[PR #16158](https://github.com/ollama/ollama/pull/16158)）。  
  - Vulkan 支持在 AMD iGPU（Intel Iris Xe）及 RX 6750 XT 上有所改进，但部分配置下长提示预填充仍不稳定（[Issue #17870](https://github.com/ollama/ollama/issues/17870)，[#18494](https://github.com/ollama/ollama/issues/18494)）。

---

### **4. 性能与优化**  
- **内存与加载效率：**  
  - MLX 现在在加载时应用 **GPU 内存预算（自由内存的 95%）**，以防止 CUDA 设备上的模型加载期间出现 OOM（[PR #18481](https://github.com/ollama/ollama/pull/18481)）。  
  - MLX 加载后的预热预填充会在不干扰真实请求的前提下填充编译缓存（[PR #16085](https://github.com/ollama/ollama/pull/16085)），降低冷加载时的 TTFT。
- **延迟降低：**  
  - 服务端结构化输出现在对思考型模型采用 **单次遍历** 处理，消除冗余的预填充与重渲染步骤（[PR #18479](https://github.com/ollama/ollama/pull/18479)），提升生成效率。

---

### **5. 稳定性与回归问题**  
*今日报告的关键稳定性问题：*  
1. **`qwen3-vl:8b-instruct` 在 Vulkan AMD RX 6750 XT 上加载多个视觉语言模型后崩溃**（`0xc0000005` 访问违规）——可在 Windows 0.34.1 版本复现（[Issue #18494](https://github.com/ollama/ollama/issues/18494)）。  
2. **Gemma 4 E4B 多模态投影器在使用 `--load-mode dio` 时导致 Jetson Orin Nano 8GB 主机 OOM**，尽管关闭 DIO 时可成功加载（[Issue #18396](https://github.com/ollama/ollama/issues/18396)）。  
3. **MiniCPM5-2B 原生工具调用无法解析**，因 detokenization 阶段 XML token 被剥离（[Issue #18483](https://github.com/ollama/ollama/issues/18483)），已在 [PR #18499](https://github.com/ollama/ollama/pull/18499) 中修复。  
4. **Gemma4 渲染器会丢弃名为 `description`、`type`、`properties` 等的工具参数**——导致工具调用不完整（[Issue #18468](https://github.com/ollama/ollama/issues/18468)）。

---

### **6. 对应用开发者的意义**  
- **工具调用可靠性：** 若你使用原生工具调用构建代理（尤其是 MiniCPM5-2B 或 Gemma4），在 PR #18499 上线前预计会出现解析失败。请仔细验证工具模式结构。  
- **云集成注意事项：** `deepseek-v4.1-flash:cloud` 默认推理层级为 `"high"`，该层级不受支持——可能导致客户端错误，除非显式覆盖（[Issue #18484](https://github.com/ollama/ollama/issues/18484)）。  
- **多模型环境：** 避免在 Vulkan AMD GPU 上并发加载多个视觉语言模型（VL）——崩溃风险极高。建议采用单模型隔离或在目标硬件上充分测试。  
- **代理工作流：** 内置 CLI 代理已被移除，意味着你的应用必须自行管理代理逻辑，或等待可选功能开启。建议将代理启动器设计为独立进程。  
- **性能调优：** 利用新的 `supported_reasoning_levels` 元数据动态控制模型行为。对于高吞吐推理，确保 MLX 已配置合适的 GPU 内存预算。

> ✅ *通过 GitHub 保持更新：[ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-09-17**

---

### **1. 今日亮点**  
LiteLLM 代理持续成熟，预算控制、可观测性及多供应商支持方面均有显著提升。关键进展包括：团队管理员控制能力增强（支持 RPM 与最大预算编辑）、对 Bedrock 与 Vertex AI 的成本追踪优化，以及新增 Amazon Transcribe 透传路由。关键修复解决了流式传输可靠性、速率限制逻辑错误及预算绕过漏洞问题。

---

### **2. 发布与破坏性变更**  
- 今日发布 **v1.103.0-dev.1** 与 **v1.102.0-rc.2**，通过 [cosign 签名的 Docker 镜像](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 提升安全性。  
- 未报告破坏性 API 变更；此为预发布候选版本，重点聚焦稳定性与安全加固，以迎接最终版 v1.103.0。

---

### **3. 新模型与硬件支持**  
- ✅ **Amazon Transcribe SigV4 透传**：通过 PR [#41515](https://github.com/BerriAI/litellm/pull/41515) 实现 —— 支持通过代理以虚拟密钥方式安全访问 AWS Transcribe 任务。  
- ✅ **Vertex AI GCS 文件流式传输**：PR [#41506](https://github.com/BerriAI/litellm/pull/41506) 现已支持从 Google Cloud Storage 直接流式传输大型批量输出文件，无需完全加载至内存。  
- ✅ **vLLM Realtime API 支持**：功能请求 [#23102](https://github.com/BerriAI/litellm/issues/23102) 仍开放中，但已有临时解决方案；尚未提供原生集成。

---

### **4. 性能与优化**  
- **速率限制器修复**：PR [#34140](https://github.com/BerriAI/litellm/issues/34140) 修复了关键缺陷——每团队每模型的限额被错误地按一半配置值执行（例如 N → 约 N/2）。现已确保 RPM/TPM 控制准确无误。  
- **流式传输效率提升**：PR [#41349](https://github.com/BerriAI/litellm/pull/41349) 在未分配预算时也能精确追踪成员支出，支持更细粒度的使用监控。  
- **日志优化**：PR [#40934](https://github.com/BerriAI/litellm/pull/40934) 通过仅扫描每条记录一次，并在敏感信息过滤前合并 base64 负载，显著降低日志处理开销 —— 对高吞吐量的 OCR 与 PDF 处理工作负载至关重要。

---

### **5. 稳定性与回归问题**  
- ⚠️ **零成本预算绕过漏洞** ([#41344](https://github.com/BerriAI/litellm/issues/41344))：在预算耗尽后，零成本模型仍可路由至付费回退路径，导致无限支出。**修复 PR 待提交。**  
- ⚠️ **多工作器环境下“幽灵模型”残留** ([#27852](https://github.com/BerriAI/litellm/issues/27852))：当 `--num_workers > 1` 时，因 Redis Pub/Sub 同步问题，删除的模型仍被各工作器缓存。**修复 PR 正在审核中。**  
- ⚠️ **流式传输使用量丢失** ([#36168](https://github.com/BerriAI/litellm/issues/36168))：当最终流块中 `choices` 非空时，上游 `usage` 数据丢失，导致计费错误。**修复 PR 正在开发中。**  
- ⚠️ **速率限制器重复计数** ([#34140](https://github.com/BerriAI/litellm/issues/34140))：根因已确认；修复正在进行中。  
- 🛑 **Gemini/Vertex 不接受工具输出中的 `$ref`/`$defs`** ([#38223](https://github.com/BerriAI/litellm/issues/38223))：JSON Schema 校验失败阻止工具结果返回。需进行模式清洗或提供商特定处理。

---

### **6. 对应用开发者的影响**  
- **预算与成本控制**：谨慎使用 `max_budget`、`rpm_limit` 与 `tpm_limit` —— 团队管理员现可编辑 RPM 与预算设置（PR [#41525](https://github.com/BerriAI/litellm/pull/41525)），实现更精细控制。但请验证零成本模型是否会导致回退成本被绕过。  
- **可观测性**：启用 OpenTelemetry + Langfuse 跟踪（PR [#41140](https://github.com/BerriAI/litellm/pull/41140)）以在跨度中捕获用户/会话上下文。如需用于 Prometheus 指标，请显式添加 `api_key_alias`。  
- **流式传输可靠性**：在 [#30053](https://github.com/BerriAI/litellm/issues/30053) 修复前，避免在工具调用流程中使用 `fast_path` 优化；否则可能导致 Claude 响应中出现 XML 格式异常。  
- **多供应商工作流**：利用新增的 Transcribe 与 Vertex AI 流式能力构建可扩展的音频与批量处理流水线。自托管后端用户需验证 `api_base` 路由行为（例如 Anthropic 的 `/count_tokens` 问题见 [#30217](https://github.com/BerriAI/litellm/issues/30217)）。

> 🔍 **行动项**：审计所有自定义认证配置及 `max_end_user_budget_id` 设置 —— 并发首请求可能绕过默认值 ([#40095](https://github.com/BerriAI/litellm/issues/40095))。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-17**

---

### **1. 今日亮点**  
Unsloth 项目持续快速演进，桌面端与 Studio 环境在稳定性和安全性方面取得关键改进。主要进展包括修复通过 PR #11160 漏洞的远程图像 SSRF 安全问题、增强 Windows 安装程序的健壮性（PR #11138, #11119），以及对多个系统进行大规模重构以消除 CI 不稳定性——凸显出对可靠性与开发者体验日益增长的关注。

---

### **2. 发布与破坏性变更**  
- 今日发布 Windows-ARM64 二进制版本（GitHub: [unslothai/unsloth#latest](https://github.com/unslothai/unsloth/releases/latest)），支持 Apple Silicon 及基于 ARM 的 Windows 设备原生推理。  
- 过去 24 小时内未报告破坏性 API 变更。但用户应关注即将更新的 `openai_api_auto_switch_model` 行为（Issue #11140）及模型重载逻辑（Issue #11092）。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 7.14** 已在安装逻辑中明确支持（PR #11068），若 ROCm 启动失败则自动回退至 Vulkan 构建——对 AMD GPU 用户而言是重要提升。  
- **Qwen3.5 / Qwen3.6 GGUF 导出流水线** 现已正确处理最终层中的 `ssm_conv1d.weight` 张量（已在 Issue #6071 修复）。  
- **Nixpkgs 打包** 已可用于 Unsloth Desktop（Issue #11135），为 Linux/NixOS 用户拓展部署选项。  
- **Apple M4 Pro** 对大上下文模型的性能追踪正在进行中（Issue #11141），计划通过 API 暴露预填充进度。

---

### **4. 性能与优化**  
- 在近期 `llama.cpp` 更新后观察到内存使用增长（Issue #10921），目前尚无即时解决方案——建议用户在长时间运行会话期间监控内存占用。  
- 大型 GGUF 文件（如 Qwen3.8-27B UD-Q4_K_S）的模型加载延迟依然较高；正通过 API 添加进度追踪以改善用户体验（Issue #11141）。  
- **vLLM 风格运行时指标** 正在积极开发中（PR #4238），计划支持可选遥测与 Prometheus 导出——为推理与训练工作负载提供深度可观测性。

---

### **5. 稳定性与回归问题**  
- **严重 SSRF 漏洞** 出现在远程图像处理中（PR #11160）：此前，Studio 会直接将未经验证的 URL 转发至 `llama-server`，存在任意文件访问风险。现已通过服务端获取图像的方式修复。  
- **Windows 安装程序失败** 由路径解析错误导致（Issue #10921, #11012, #10859）：安装程序忽略用户自定义路径，强制默认使用 `~/.unsloth`。修复方案正在通过 PR #11138 推进。  
- **ROCm 7.14 检测失败** 导致错误安装 PyTorch（Issue #10657）：安装器在使用 ROCm 7.2 时却安装了 PyTorch 2.11，而非对应版本 7.14 —— 已在 PR #11068 中解决。  
- **工具调用中的模型去重缺陷** 导致意外抑制（Issue #10379）：已提出新增功能以禁用去重，适用于需重复相同调用的场景。

---

### **6. 对应用开发者的启示**  
- **安全的模型服务**：谨慎使用 `openai_api_auto_switch_model` —— 冷启动时确保模型已预加载（Issue #11140）。  
- **跨平台一致性**：期待更好的 Windows 与 AMD GPU 支持，但在 PR #11138 上线前请手动验证安装路径。  
- **可观测性就绪**：为应对 vLLM 风格指标（PR #4238）做好准备——启用可选遥测，以获取推理吞吐量、令牌速率与内存压力等关键数据。  
- **避免竞态条件**：`studio: hardening follow-up` PR (#5406) 解决了刷新令牌竞态与沙箱绕过问题——请确保应用遵守认证契约，勿假设本地状态持久化。

> 🔗 *完整上下文查阅：*  
> - [PR #11160: 修复远程图像处理中的 SSRF 问题](https://github.com/unslothai/unsloth/pull/11160)  
> - [PR #11068: Studio 的 ROCm/Vulkan 回退机制](https://github.com/unslothai/unsloth/pull/11068)  
> - [PR #4238: vLLM 风格运行时指标](https://github.com/unslothai/unsloth/pull/4238)

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*