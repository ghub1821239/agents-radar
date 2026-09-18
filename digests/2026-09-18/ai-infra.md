# AI 基础设施日报 2026-09-18

> 生成时间: 2026-09-18 00:45 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-18**

---

### **1. 生态概览**

2026年第三季度，AI基础设施领域呈现出**高性能推理引擎**与**应用层编排平台**之间的显著分化，同时在模型服务、微调和智能体执行的边缘地带，二者正加速融合。NVIDIA的Blackwell（SM120）与AMD的CDNA2已成为硬件特化优化的核心，推动vLLM、SGLang和llama.cpp在内核层面展开深度优化。与此同时，LiteLLM等网关与Ollama等部署框架则更注重安全性、可观测性及开发者体验——体现出企业级成熟度。MoE模型、多模态与推测解码的兴起，进一步加剧了对KV缓存效率、内存安全性和确定性输出保障的压力。

---

### **2. 活动对比**

| 项目       | 近24小时开放问题数 | 近24小时合并的PR数 | 发布状态        |
|---------------|------------------------|------------------------|------------------------|
| **vLLM**      | 7                      | 5                      | 无                   |
| **SGLang**    | 12                     | 6                      | 无                   |
| **llama.cpp** | 6                      | 5                      | b11028–b11017 (补丁)  |
| **Ollama**    | 8                      | 4                      | 无                   |
| **LiteLLM**   | 5                      | 3                      | 无                   |
| **Unsloth**   | 6                      | 4                      | **v0.1.810-beta** (新) |

> 🔍 *洞察：* Unsloth在发布速度上领先，推出新版本beta；而SGLang的问题数量最高，表明其在下一代硬件与推测解码路径上的开发仍处于活跃但不稳定的阶段。

---

### **3. 模型支持竞赛**

| 新模型 / 架构                       | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next MTP**     | ✅   | ❌     | ✅        | ❌     | ❌      | ✅      |
| **GLM-5.3-Flash (ROCm/SM120)** | ✅   | ✅     | ✅        | ⚠️     | ❌      | ✅      |
| **LLaVA-OneVision (CUDA graphs)** | ✅   | ❌     | ❌        | ❌     | ❌      | ❌      |
| **T-Head PPU (ZW810/ZW-M890P)** | ❌   | ✅ (路线图) | ❌      | ❌     | ❌      | ❌      |
| **SenseNova-U1/U1.5**          | ❌   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **Gemma3-4B, Nemotron 30B**   | ❌   | ❌     | ❌        | ❌     | ❌      | ✅      |

> 🏆 **领先者：** **Unsloth** 在采用新兴架构（如T-Head PPU、SenseNova）方面最快；**vLLM** 在多模态与高吞吐量模型支持方面领先（如LLaVA-OneVision CUDA graphs、GLM-5.3-Flash）；**llama.cpp** 保持强大的跨平台兼容性，尤其适用于边缘计算与Intel GPU场景。

---

### **4. 性能前沿**

| 优化重点         | vLLM                          | SGLang                         | llama.cpp                    | Ollama               | LiteLLM                 | Unsloth                  |
|----------------------------|-------------------------------|--------------------------------|------------------------------|----------------------|-------------------------|--------------------------|
| **KV缓存效率**     | ✅ 高（稀疏MLA，FP8）     | ✅ 关键（HiCache，基数缓存）   | ✅ Flash attention内核   | ✅ 结构化输出| ✅ 成本追踪（Azure） | ❌ （上下文长度缺陷） |
| **推测解码**    | ✅ 稳定（存在限制）      | ⚠️ 高风险（崩溃，缺陷）   | ❌ 不支持             | ✅ 正在修复   | ✅ 安全护栏机制 | ❌ GRPO视觉问题    |
| **量化与内核**  | ✅ FP32路由，MXFP8          | ✅ MXFP8，Quark量化    | ✅ MFMA，DP4A，SYCL修复    | ✅ Bonsai（1比特）    | ✅ 移除 `top_p` 参数   | ✅ FP8/INT8扩散    |
| **分布式服务**     | ✅ 异步TP，序列并行       | ⚠️ 层级缓存缺陷    | ❌ 无分布式支持    | ❌ 无多节点支持     | ✅ MCP工具路由     | ✅ 多用户Docker     |
| **边缘与异构支持**    | ❌ 有限                    | ✅ T-Head，AMD，WebGPU          | ✅ Vulkan，Hexagon NPU，ARM64| ✅ Vulkan ARM64      | ❌ 无边缘聚焦        | ✅ ROCm，ARM64 CUDA      |

> 🔥 **前沿领导者：**  
> - **vLLM**：在SM120上实现峰值性能，支持稀疏注意力与多GPU可扩展性。  
> - **SGLang**：在层级缓存与推测正确性边界上持续突破（尽管稳定性不足）。  
> - **llama.cpp**：跨平台内核优化表现卓越（Intel、AMD、Vulkan）。  
> - **Unsloth**：对新型硬件与量化格式（FP8/INT8扩散）的采纳速度最快。

---

### **5. 层级定位**

| 项目       | 主要层级                | 核心差异化                                                                 |
|---------------|-------------------------------|-------------------------------------------------------------------------------------|
| **vLLM**      | **推理引擎**          | 高吞吐、低延迟服务；专为NVIDIA GPU上的大规模生产级大模型优化。 |
| **SGLang**    | **推理引擎 + 网关**| 混合架构，具备先进缓存（HiCache）、推测解码与标准化事件——适合智能体流水线。 |
| **llama.cpp** | **本地运行时 / 边缘推理** | 纯C++运行时，依赖极小；最适合离线、资源受限或异构部署场景。 |
| **Ollama**    | **本地运行时 + 智能体网关** | 开发者友好的命令行界面；连接本地推理与智能体工作流；正向安全、可审计推理演进。 |
| **LiteLLM**   | **推理网关 / 编排** | 企业级代理，支持认证、成本日志与多提供商路由——监管环境核心组件。 |
| **Unsloth**   | **训练/微调 + 本地运行时** | 全栈解决方案：训练（LoRA SFT）、推理与UI一体化，单个Docker镜像支持多用户。 |

> 🎯 **战略洞察：** 生态正向**专业化分层**演进：  
> - *引擎*（vLLM、SGLang）→ 高吞吐、低延迟  
> - *运行时*（llama.cpp、Ollama）→ 可移植性、边缘就绪  
> - *网关*（LiteLLM）→ 合规性、可观测性、成本控制  
> - *全栈*（Unsloth）→ 快速迭代、端到端流程

---

### **6. 趋势信号**

#### **今日活动揭示的新兴趋势：**
1. **硬件特化优化已成为必需**  
   —— SM120（Blackwell）与AMD RDNA2/CDNA2不再是“未来防护”功能，而是当前刚需。vLLM与SGLang等项目正竞相修复这些芯片上的崩溃与回归问题。

2. **推测解码正成为负担**  
   —— 尽管前景诱人，推测解码在多个项目中（SGLang、Ollama、vLLM）仍不稳定，存在崩溃、内存泄漏与正确性缺陷。开发者应**在调试与审计关键任务中禁用推测解码（`--nodraft`）**。

3. **KV缓存一致性已成为基础关切**  
   —— 错误报告、静默覆盖（ROCm）、错误命中处理（SGLang）表明，缓存完整性已升至顶级可靠性要求，而非仅是性能调节项。

4. **企业合规正在驱动设计选择**  
   —— Ollama移除默认CLI智能体，LiteLLM新增团队级访问控制，Unsloth启用多用户Docker，均指向向**隔离、可审计、策略强制的AI系统**转型。

5. **模型与硬件多样性正在加速**  
   —— 从T-Head PPUs到SenseNova-U1，再到Bonsai的1比特权重，开发者必须将**非NVIDIA生态**视为首要目标，而非备选方案。

#### **应用开发者应关注的内容：**
- ✅ **关注 PR #57458 (vLLM)** 与 **PR #41711 (LiteLLM)** —— 两者对稳定性至关重要。
- ✅ **在SGLang与Ollama修复前避免使用推测解码**。
- ✅ **使用 `v0.1.810-beta` (Unsloth)** 与 **b11028+ (llama.cpp)** 以获得稳定推理。
- ✅ **启用 `--nodraft` 与 `OLLAMA_METRICS=1`** 以提升可复现性与可观测性。
- ✅ **尽早规划ROCm/AMD支持**——vLLM与Unsloth已领先布局。

> 📌 **最终结论：** AI堆栈正快速成熟，但复杂度日益增加。务必明智选择层级：**引擎用于规模，网关用于控制，运行时用于可移植性，全栈用于速度**。上线前请务必基于真实硬件与工作负载模式进行验证。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-09-18**

#### **1. 今日亮点**
vLLM 项目持续加速推进 **多模态支持**、**针对 SM120（Blackwell）硬件的优化** 以及 **推测解码稳定性**。重点工作包括为 LLaVA-OneVision 的 ViT 编码器添加 CUDA graph 支持，以及在 NVIDIA 和 ROCm 平台上对 GLM-5.3-Flash 的关键修复。此外，一项重大性能优化已落地：显著降低了 GLM 稀疏 MLA 注意力路径的准备开销。

#### **2. 发布与破坏性变更**
过去 24 小时内未报告任何发布或破坏性变更。未观察到新版本发布或 API/config 的破坏性更改。

#### **3. 新模型与硬件支持**
- ✅ **LLaVA-OneVision 编码器现已通过 PR [#57379](https://github.com/vllm-project/vllm/pull/57379) 支持 CUDA graphs**，提升多模态预填充效率。
- ✅ **SM120（NVIDIA Blackwell）支持扩展**：PR [#56152](https://github.com/vllm-project/vllm/pull/56152) 为 MiniMax-M3 和 GLM-5.3-Flash 在 SM120 上启用了 FP32 路由功能。
- ✅ **ROCm（gfx950/gfx951）改进**：多个 PR 解决了 GLM-5.3-Flash 的内核兼容性问题（`SparseAttnIndexerKpool` 前向缺失、`kpool indexer` 覆盖 KV cache）——详见 [#57424](https://github.com/vllm-project/vllm/issues/57424)、[#54359](https://github.com/vllm-project/vllm/issues/54359)。
- 🔧 **Intel GPU 性能分析支持** 正在统一至平台感知的 torch profiler；相关 PR 包括 [#57460](https://github.com/vllm-project/vllm/pull/57460)、[#56542](https://github.com/vllm-project/vllm/pull/56542)。

#### **4. 性能与优化**
- 🚀 **GLM-5.3-Flash 稀疏 MLA 开销降低**：当旋转尾部为空时，重用连续的 NoPE 查询，避免冗余的 `torch.cat` 操作（[#57458](https://github.com/vllm-project/vllm/pull/57458)）。
- ⚙️ **MiniMax-M3 优化已合并**：小查询拆分 K-loop、融合 top-k 合并、优化路由策略——全部聚焦于 SM120 效率提升（[#56150](https://github.com/vllm-project/vllm/pull/56150)、[#56149](https://github.com/vllm-project/vllm/pull/56149)、[#56151](https://github.com/vllm-project/vllm/pull/56151)）。
- 💡 **Qwen3.8-Flash-Next**：补丁启用 QSA 路径上的 `fp8_e4m3` KV cache，使有效 KV 池大小翻倍——在 GB10 上实测吞吐量提升约 2 倍（[#54426](https://github.com/vllm-project/vllm/issues/54426)）。

#### **5. 稳定性与回归问题**
- 🔥 **ROCm 上严重崩溃**：GLM-5.3-Flash 因 `SparseAttnIndexerKpool` 的 `forward_cuda` 中出现 `NotImplementedError` 导致无法启动——影响夜间构建（[#57424](https://github.com/vllm-project/vllm/issues/57424)）。
- 🐛 **ROCm 上 GLM-5.3-Flash 静默覆盖 KV cache**：由于 kpool indexer 的块大小不匹配，导致长上下文召回性能下降（[#54359](https://github.com/vllm-project/vllm/issues/54359)）。
- 🐛 **DeepSeek-V4.1-Flash + DSpark 推测解码在 SM120 上崩溃**：长提示预填充阶段因非法内存访问导致崩溃（[#56771](https://github.com/vllm-project/vllm/issues/56771)）。
- 🐛 **序列并行 + 异步 TP 启用时批处理不变性被破坏**（`VLLM_BATCH_INVARIANT=1`）——影响多 GPU 推理正确性（[#56370](https://github.com/vllm-project/vllm/issues/56370)）。
- ⚠️ **v0.28.0/v0.29.0 启动时主机内存耗尽**：已被报告为从 v0.27.1 回退的回归问题（[#54237](https://github.com/vllm-project/vllm/issues/54237)）。

#### **6. 对应用开发者的影响**
- 若部署 GLM-5.3-Flash 或 DeepSeek-V4.1，**务必优先测试 ROCm 与 SM120**，已知回归可能导致无声数据损坏或崩溃。
- 对 **多模态模型**（如 LLaVA-OneVision）使用 **CUDA graphs** 可降低预填充延迟——当前已通过 PR [#57379](https://github.com/vllm-project/vllm/pull/57379) 支持。
- 对于 **高吞吐量 MoE 推理**，可考虑增量专家卸载（RFC #38256），以在较小显存的 GPU 上运行大型模型。
- 在修复前，请避免在启用 `enable_sp` 时使用 `VLLM_BATCH_INVARIANT=1`，否则会破坏确定性输出保证。
- 启用 **会话级性能分析控制**（PRs #56542, #57460），以在生产环境中获得更好的可观测性。

> *为实时监控，建议关注问题 #57424（ROCm 上 GLM-5.3-Flash 崩溃）和 PR #57458（GLM MLA 性能优化），二者具有即时影响。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-18**

---

### **1. 今日亮点**  
SGLang 项目持续推进对下一代硬件和推理优化的支持，目前对 **T-Head PPU**、**SenseNova-U1/U1.5** 以及 **AMD GPU 兼容性** 的关键工作已进入积极跟踪阶段。主要进展包括引入 **乐观预填充 + HiCache 写透机制**，提升 **推测解码正确性**，并大力推动在不同服务框架间统一 KV 缓存事件模式。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
未发布新版本或破坏性 API/配置变更。项目仍聚焦于内部稳定性及功能集成，为即将到来的里程碑做准备。

---

### **3. 新模型与硬件支持**  
- **T-Head PPU (ZW810/810E/ZW-M890P)**：已开启正式路线图 ([#37519](https://github.com/sgl-project/sglang/issues/37519))，旨在为 T-Head 最新 AI 加速器提供原生级支持，目标是在国产设计硬件上实现高性能推理。
- **SenseNova-U1/U1.5**：追踪问题 [#37742](https://github.com/sgl-project/sglang/issues/37742) 概述了基于 OpenSenseNova/SenseNova-U1 的集成工作，使 SGLang 能够服务这些新兴的大语言模型。
- **AMD GLM-5.3-Flash**：PR [#39317](https://github.com/sgl-project/sglang/pull/39317) 确保在 Quark 量化中正确处理融合与专家级名称，提升了 ROCm 平台上的模型保真度。

---

### **4. 性能与优化**  
- **乐观预填充 + HiCache 写透**：PR [#40043](https://github.com/sgl-project/sglang/pull/40043) 实现仅缓冲区的 L3 写透式 HiCache，降低乐观预填充期间主机内存压力，同时保持前缀缓存效率。
- **HiCache 内存效率优化**：PRs [#39395](https://github.com/sgl-project/sglang/pull/39395) 与 [#38426](https://github.com/sgl-project/sglang/pull/38426) 通过压缩 DSA 索引器并改进写回行为，优化 HiCache 存储——对多节点部署至关重要。
- **推测解码改进**：多个 PR 解决采样边界情况 ([#35798](https://github.com/sgl-project/sglang/pull/35798), [#40001](https://github.com/sgl-project/sglang/pull/40001)) 及 CDF 边界逻辑，提升草案准确性，并在流水线并行下增强混合递归状态一致性。
- **DeepEP v2 MXFP8 支持**：PR [#40030](https://github.com/sgl-project/sglang/pull/40030) 添加对 MXFP8 和延迟路由权重的实验性支持，扩展了大型 MoE 模型的量化灵活性。

---

### **5. 稳定性与回归问题**  
- **严重 CUDA 核心转储追踪** ([#26340](https://github.com/sgl-project/sglang/issues/26340))：自动化核心转储收集产生超过 **310 条评论**，表明在 SM120（Blackwell）设备上存在广泛不稳定性。高优先级；可能与内核调度或内存管理相关。
- **分层缓存输出错误** ([#39830](https://github.com/sgl-project/sglang/issues/39830))：混合 GDN/Mamba 模型因主机层级缓存命中处理错误，返回了错误生成周期的输出——严重影响推测推理正确性的严重缺陷。
- **KV 缓存误报** ([#39900](https://github.com/sgl-project/sglang/issues/39900), [#39922](https://github.com/sgl-project/sglang/issues/39922))：Anthropic 兼容的 `/v1/messages` 接口未返回 `cache_creation_input_tokens`，导致计费不准确。已在 [PR #40044](https://github.com/sgl-project/sglang/pull/40044) 中修复（待合并）。
- **禁用 Radix 缓存时 FlashKDA 崩溃** ([#39925](https://github.com/sgl-project/sglang/issues/39925))：元组返回类型不匹配导致 GLM-5.3-Flash 崩溃；修复正在进行中，由 PR #39925 推进。
- **OpenAI SSE 流式传输不一致** ([#39864](https://github.com/sgl-project/sglang/issues/39864))：流式数据块中 `id` 与 `created` 字段值变化不一致——影响客户端状态管理。

---

### **6. 对应用开发者的影响**  
- **预期部署调优复杂度上升**：随着对新硬件（PPU、SenseNova）及高级缓存（HiCache、统一 Radix）支持逐步成熟，需密切关注 CI 稳定性，并尽早在目标后端进行测试。
- **使用推测解码与混合模型（GDN/Mamba）时需谨慎**：分层缓存与递归状态提交的已知问题可能影响输出质量与延迟。
- **确保代理工作流能处理流式传输不一致**：当前 `/v1/messages` 端点在流式响应中报告的 `id` 与 `created` 值不稳定。
- **一旦模式对齐完成（[#39991](https://github.com/sgl-project/sglang/issues/39991)），请采用标准化的 KV 缓存事件**——这将实现与 vLLM 等可观测性工具的互操作性。
- **监控 Blackwell 特定回归问题（SM120）**：若使用 RTX PRO 6000 等设备，请预期潜在崩溃，直至解决 CUDA 核心转储的 PR 合并为止。

> 🔗 *跟踪关键问题与 PR：*  
> - [CUDA 核心转储 (#26340)](https://github.com/sgl-project/sglang/issues/26340)  
> - [T-Head PPU 路线图 (#37519)](https://github.com/sgl-project/sglang/issues/37519)  
> - [KV 缓存模式对齐 (#39991)](https://github.com/sgl-project/sglang/issues/39991)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-18**

---

### **1. 今日亮点**  
最新发布周期（b11028–b11017）聚焦于 Vulkan 与 SYCL 的关键稳定性修复，包括防止 MoE 模型中的内存损坏，以及修复 SYCL 下过度分配临时存储空间的问题。新增对 Qwen3.8-Flash-Next MTP 层及 Intel Xe 快速注意力内核的支持，推动现代 GPU 架构上的高性能推理。

---

### **2. 发布与破坏性变更**  
- **b11028**：修复 CI 中缺失的文件驱逐问题（`#29041`）——无功能影响，但提升构建卫生水平。  
- **b11027**：在 RPC 中跳过 ACCEL 设备以避免兼容性问题（`#29020`）。  
- **b11026**：在跳过 Qwen3.5-MoE 模型中的 gate_up_exps 时尊重 `TENSOR_SKIP` 标志（`#29014`）。  
- **b11025**：扩展 Nemotron MTP 支持，清理冗余声明（`#29018`）。  
- **b11024**：更新 OpenVINO 至 **2026.4**，解决 clangd/MSVC 警告及内部链接问题（`#29009`）。  

> 📌 *未检测到破坏性 API 变更；所有更新均为非破坏性修复或功能新增。*

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen3.8-Flash-Next MTP** 现通过 PR #28243 完全支持 —— 支持共享 MTP 模块，推理速度最高提升 **1.3–2 倍**。  
- ✅ **Intel Xe-LPG Plus/Xe2/Xe3** 已获得专用快速注意力优化内核（`#24406`，草案系列）。  
- ✅ **Hexagon NPU** 后端现已可在 Windows Arm64 上构建（`#29052`），支持高通平台边缘部署。  
- ✅ **OpenCL**：为 Q4_0/Q4_K/Q6_K GEMM 添加优化后的 DP4A 二进制内核（`#29055`、`#29056`、`#29057`）。  
- ✅ **WebGPU**：强制保证推测解码过程中的内核执行顺序（`#29019`）。

---

### **4. 性能与优化**  
- **Vulkan**：优化 `mul_mm coopmat1` 路径中 MoE 计算跳过的逻辑（`#25483`）——减少冗余计算。  
- **SYCL**：修复 B70 内存分配错误（>19.3GB）（`#28953`）——支持大模型稳定卸载。  
- **CUDA/HIP**：为 CDNA2 (gfx90a) 增加 MFMA（矩阵核心）闪电索引器（`#29050`、`#29047`）——实现 CDNA2 全性能释放。  
- **OpenCL**：新增快速注意力二进制内核（`#29046`）——提升长序列吞吐量。  
- **OpenVINO**：更新至 **2026.4**，性能提升并减少编译期噪声（`#29009`）。  

> 🔥 *预期收益：在 Intel Arc B70/Xe2 上使用 MoE 模型时，解码速度提升约 20–30%；在 CDNA2 上运行 DeepSeek-V3.2/V4 可实现 2 倍加速。*

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 状态 | PR / 修复 |
|--------|------|-------------|--------|---------|
| 严重 | #29028 | 在 Vulkan（RADV gfx1151）上首次解码时 `qwen4exp` / `deepseek-v4` 崩溃 | 开放 | 尚无修复 |
| 高 | #28933 | 在 128GB 统一内存系统上聊天时内存持续增长（RSS+swap） | 开放 | 尚无修复 |
| 高 | #28860 | SYCL 在启用 ngram-mod 时要求 2GB+ 临时存储空间 | 开放 | 尚无修复 |
| 中 | #25664 | Linux 7.x 内核下（RADV_STRIXHALO）出现 `vk::DeviceLostError` | 开放 | 尚无修复 |
| 中 | #27046 | 因 `resolve_fused_ops` 误报导致 Intel Lunar Lake iGPU 上发生 SIGSEGV | 开放 | 尚无修复 |

> ⚠️ **注意**：多个回归问题报告集中在 **Intel Arc B70**、**AMD RADV** 与 **SYCL** 路径——用户应暂时避免使用 `--split-mode tensor` 和 `ngram-mod`，直至修复完成。

---

### **6. 对应用开发者的意义**  
- **使用 b11028 及以上版本**，以在 Apple Silicon、Vulkan 与 SYCL 上获得稳定推理体验——尤其是使用 Qwen3.6-35B-A3B-MTP 等 MoE 模型时。  
- **充分利用 Qwen3.8-Flash-Next 的新 MTP 支持**，降低显存占用并加快生成速度。  
- **在 #28860 修复前避免使用 `--split-mode tensor` 与 SYCL**——预计会引发高内存压力。  
- **谨慎启用 `--swa-full` + `-sm tensor`**——已知与 Gemma4-31B 存在崩溃风险（`#26122`）。  
- **对于 WebUI 与智能体应用**：请等待 PR #29019 合并后再依赖推测解码的顺序一致性。  
- **若需支持 Hexagon NPU 或 Intel Xe 优化**：建议从源码构建——预编译二进制包可能滞后。

> 💡 *实用提示：在 CI 中使用 `--errors-only`（`#29040`）可减少测试噪音，加速调试。*

🔗 [GitHub 发布说明](https://github.com/ggml-org/llama.cpp/releases/tag/b11028) | [问题追踪](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-18**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展对新兴模型和硬件后端的支持，重点推进 MLX 对低比特量化权重（Bonsai）的集成以及 ARM64 上的 Vulkan 支持。关键稳定性修复解决了 MLX nvfp4 上推测性解码的阻塞问题，以及草稿模型中的内存测量异常；新功能请求反映出对可自定义角色（如 `tool`）及调试时可选禁用推测性解码的强烈需求。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新发布或破坏性变更。*  
但正在进行的 PR 表明未来可能的变化：  
- **PR #18393** 默认移除了内置 CLI Agent —— 用户需通过标志或启动器选项显式启用（*Issue #18490*）。此举体现了减少隐式云依赖、提升企业合规性的整体趋势。  
- **PR #18517** 提议增加 `--nodraft` 标志以完全禁用推测性解码，未来可能成为永久性的 CLI 选项，用于支持确定性输出测试。

---

### **3. 新模型与硬件支持**  
- **模型架构**：用户请求原生支持 `spark2_5`（Spark-X2.5-4B / 1.7B）——目前因 Ollama 运行时无法识别其架构而暂不支持（*Issue #18195*）。  
- **硬件后端**：  
  - **ARM64 上的 Vulkan**：已合并修复 *PR #18502*，恢复了 Linux ARM64 系统（如 Apple Silicon M1）上的 Vulkan 推理支持，此前曾回退至仅 CPU 模式。  
  - **MLX 后端**：  
    - *提案*：通过新版 0.19 MLX 后端添加对 Bonsai 1-bit/2-bit 量化权重的支持（*Issue #18515*）。  
    - *进展*：MLX 运行器现已包含加载进度报告和阻塞检测功能（*PR #17834*），在高负载下显著提升可靠性。

---

### **4. 性能与优化**  
- **推测性解码**：  
  - **PR #18517** 引入 `--nodraft` 以禁用推测性解码——对需要可复现输出或性能对比的开发者至关重要。  
  - **PR #18510** 修复了推测性解码期间 KV 缓冲区释放时机问题，防止内存膨胀并提升吞吐一致性。  
- **冷启动延迟**：  
  - **PR #16085** 在模型加载时实现预热编译路径，通过预先填充 MLX 编译缓存，显著降低冷模型的 TTFT（首个词元时间）。  
- **内存效率**：  
  - **PR #18479** 通过对思维类模型应用语法约束的一次性处理，优化结构化输出，消除冗余预填充循环，在基准测试中降低约 30% 延迟。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 链接 |
|--------|------|------|------|
| 严重 | MLX nvfp4：在持续单槽负载下，请求在 `processed=total-1` 处无限期卡住；仅通过 SIGTERM 可恢复 | 开放 | [Issue #18505](https://github.com/ollama/ollama/issues/18505) |
| 高 | `glm-ocr` 在文本识别过程中陷入无限循环（即使简单提示如 "hi" 也如此） | 开放 | [Issue #16892](https://github.com/ollama/ollama/issues/16892) |
| 高 | `minicpm5-2b`：原生工具调用解析失败，返回畸形的 XML 片段（`name="get_weather"> name="city...`） | 开放 | [Issue #18483](https://github.com/ollama/ollama/issues/18483) |
| 中等 | `qwen3-vl:8b-instruct`：在 Windows Vulkan AMD RX 6750 XT 上多模型加载后崩溃 | 开放 | [Issue #18494](https://github.com/ollama/ollama/issues/18494) |
| 中等 | `glm-5.3-flash`：间歇性输出格式错误的字符串编码工具调用，而非 JSON 数组 | 开放 | [Issue #18506](https://github.com/ollama/ollama/issues/18506) |
| 低 | `deepseek-v4.1-flash:cloud`：`default_reasoning_level: "high"` 不在 `supported_reasoning_levels` 列表中 | 已关闭 | [Issue #18484](https://github.com/ollama/ollama/issues/18484) |

> ✅ **进行中的修复**：  
> - **PR #18510** 修复推测性解码中的 KV 缓冲区释放问题。  
> - **PR #17834** 为 MLX 运行器添加阻塞检测与加载进度报告。  
> - **PR #18502** 解决 ARM64 Linux 上的 Vulkan 支持问题。

---

### **6. 对应用开发者的意义**  
- **代理构建者**：默认移除 CLI Agent（*PR #18393*）意味着你必须显式通过标志或自定义启动器启用——适用于安全、隔离环境，但需更新工作流。  
- **工具调用用户**：使用 `tool` 角色时需谨慎——当前 Ollama 仅强制支持 `system`、`user`、`assistant`（*Issue #6322*, *#18509*）。预计不久将支持自定义角色。  
- **调试与可复现性**：若可用，请使用 `--nodraft` 禁用推测性解码，获取精确、非推测性输出——对精度敏感任务至关重要。  
- **企业部署**：利用 `OLLAMA_METRICS=1` 暴露 Prometheus 指标（*PR #18508*），监控容器内 GPU 使用率。对于共享 GPU 环境，建议考虑外部资源锁（*Issue #18487*）以避免争用。  
- **模型验证**：使用 `/api/chat` 响应元数据（*Issue #18394*）追踪具体哪个版本模型响应了请求——对审计与评估流水线极为关键。

> 🔗 **关键链接**：  
> - [Issue #18517 – `--nodraft` 提案](https://github.com/ollama/ollama/issues/18517)  
> - [PR #18502 – Vulkan ARM64 修复](https://github.com/ollama/ollama/pull/18502)  
> - [Issue #18483 – MiniCPM5 工具调用解析](https://github.com/ollama/ollama/issues/18483)  
> - [Issue #18505 – MLX nvfp4 阻塞问题](https://github.com/ollama/ollama/issues/18505)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-09-18**

---

### **1. 今日重点**  
LiteLLM 代理持续成熟，针对认证、日志记录和成本追踪的关键修复不断推进，尤其在 JWT 处理、MCP 工具链以及流式传输防护机制方面。关键的 PR 修复了 OAuth 流程中的安全门控问题，确保 Azure AI Foundry 与 Amazon Transcribe 的支出日志准确无误，并通过标准化错误聚类提升了可观测性。这些更新进一步巩固了 LiteLLM 作为企业级 AI 应用可靠推理网关的地位。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
但多项破坏性变更正在推进中：
- **PR #41709**：基于密钥白名单引入预判式 OAuth 401 挑战 —— 可能影响依赖后挑战访问控制的客户端。
- **PR #41715**：在错误元数据中新增 `normalized_error` 聚类键 —— 改变了仪表盘（如 Langfuse）中错误的分组方式，现有告警逻辑可能需要调整。
- **PR #36741**：将 Langfuse SDK 回调迁移至 v4 版本，与旧版不兼容（`langfuse<4`）。使用自定义集成的开发者需升级依赖。

> 🔗 [PR #41709](https://github.com/BerriAI/litellm/pull/41709) | [PR #41715](https://github.com/BerriAI/litellm/pull/41715) | [PR #36741](https://github.com/BerriAI/litellm/pull/36741)

---

### **3. 新模型与硬件支持**  
*今日未新增模型或硬件支持。*  
但持续开发中包括：
- **PR #41511**：通过 A2A 中继为 Microsoft Foundry 代理添加 Entra ID（Azure AD）认证支持 —— 实现与企业级身份提供商的集成。
- **PR #41515**：引入 **Amazon Transcribe 批处理任务透传**并支持按完成时间计价 —— 现已支持语音转文字工作流的成本感知路由。
- **PR #41710**：对 JWT 认证用户尊重团队/用户级别的 MCP 工具搜索设置 —— 提升对 AI 代理能力的细粒度控制。

> 🔗 [PR #41511](https://github.com/BerriAI/litellm/pull/41511) | [PR #41515](https://github.com/BerriAI/litellm/pull/41515) | [PR #41710](https://github.com/BerriAI/litellm/pull/41710)

---

### **4. 性能与优化**  
*今日未报告直接的吞吐量或延迟改进。*  
但重大优化正在进行中：
- **PR #41469**：当启用 `drop_params: true` 时，从 GPT-5 推理模型中移除 `top_p` 参数 —— 避免被 Bedrock/Mantle 拒绝，并减少不必要的 API 开销。
- **PR #41443**：在单元测试中移除固定成本映射价格与弃用日期 —— 提升测试可靠性，加速 CI/CD 流水线。
- **PR #41448**：在透传路由（如 Vertex AI）中保留上游查询参数 —— 确保流式传输过程中的分词与计费行为正确。

> 🔗 [PR #41469](https://github.com/BerriAI/litellm/pull/41469) | [PR #41443](https://github.com/BerriAI/litellm/pull/41443) | [PR #41448](https://github.com/BerriAI/litellm/pull/41448)

---

### **5. 稳定性与回归问题**  
*今日发现若干严重稳定性问题：*
1. **流式防护机制失效** ([#41611](https://github.com/BerriAI/litellm/issues/41611))  
   - *严重程度：高*  
   - 敏感值跨 SSE 数据块拆分可能导致绕过逐块防护检查，造成流式响应中的潜在数据泄露。
   - ✅ **修复 PR：** [41711](https://github.com/BerriAI/litellm/pull/41711)（进行中）—— 保留父会话上下文以拦截搜索。

2. **Azure AI Foundry 成本日志缺陷** ([#41605](https://github.com/BerriAI/litellm/issues/41605))  
   - *严重程度：中高*  
   - 对 `azure_ai/gpt-5.6-luna` 的同步请求间歇性记录 `$0.00` 成本，尽管提示词实际有费用。
   - ✅ **修复 PR：** [41706](https://github.com/BerriAI/litellm/pull/41706)（待评审）—— 确保成本正确传播。

3. **Prisma 连接失败** ([#26886](https://github.com/BerriAI/litellm/issues/26886))  
   - *严重程度：中*  
   - LiteLLM 代理 Pod 因 Prisma 查询引擎不稳定导致周期性崩溃。
   - ⚠️ 尚无修复 PR；需深入调查连接池与生命周期管理问题。

> 🔗 [Issue #41611](https://github.com/BerriAI/litellm/issues/41611) | [Issue #41605](https://github.com/BerriAI/litellm/issues/41605) | [Issue #26886](https://github.com/BerriAI/litellm/issues/26886)

---

### **6. 对应用开发者的启示**  
- **流式传输 + 防护机制需谨慎使用**：若构建处理敏感数据的智能体，请勿仅依赖逐块防护检查，直至 PR #41711 上线。
- **确保成本追踪准确**：对于使用 Azure AI Foundry 或 Amazon Transcribe 的生产负载，务必验证支出日志与实际用量一致，尤其是同步调用场景。
- **更新 Langfuse 集成**：迁移到 `langfuse>=4`，并确认回调配置与 PR #36741 兼容。
- **利用增强的认证控制**：借助 #41710 和 #41709 等 PR，团队现在可在用户/团队级别强制执行细粒度访问策略，无需虚拟密钥。
- **监控 CI/CD 健康状态**：近期多个 PR（#41553、#41443）凸显测试稳定性优化工作 —— 未来合并将减少红色构建。

> 📌 小贴士：使用 `/version` 或 `/info` 端点（请求于 [#24109](https://github.com/BerriAI/litellm/issues/24109)）审计部署在预发/生产环境中的 LiteLLM 版本。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-18**

---

### **1. 今日亮点**  
Unsloth 发布 **v0.1.810-beta**，新增完整 **多用户 Docker 支持**，扩展了 **AMD（RDNA1/2）和 ARM64 CUDA on Windows** 的兼容性，并增强了 **FP8/INT8 扩散模型推理**。此次发布还包含对 GRPO 与视觉模型处理的关键稳定性修复，以及对 Studio UI 和基础设施的持续现代化改进。

---

### **2. 发布与破坏性变更**  
- **v0.1.810-beta**：新 Docker 镜像支持多用户账户、AMD RDNA1+2、FP8/INT8 扩散推理、Windows 上的 ARM64 CUDA，以及训练与推理性能提升。  
  🔗 [发布说明](https://unsloth.ai/docs/get-started/insta)

> ⚠️ **迁移提示**：依赖过时 Docker 镜像（如 2026 年 5 月的 `unsloth/unsloth:latest`）的用户应立即升级——多个问题源于陈旧二进制文件与缺失更新。

---

### **3. 新模型与硬件支持**  
- ✅ **AMD 支持**：通过 ROCm 在 Docker 中实现完整的 RDNA1/2 GPU 支持（`unsloth/unsloth-rocm`）。  
  🔗 [PR #11218](https://github.com/unslothai/unsloth/pull/11218) — 现已随 ROCm 镜像发布 Unsloth Studio。
- ✅ **Windows 上的 ARM64 CUDA**：为使用 NVIDIA CUDA 的 ARM64 系统添加实验性支持。
- ✅ **新量化格式**：启用 FP8 与 INT8 扩散模型推理支持。
- 📌 **模型特定支持**：Qwen3.8-Flash-Next MTP (UD-IQ4_XS)、Gemma3-4B、GPT-OSS-120b-K4-KM、Nemotron 30B（通过 `NemotronHTopkRouter`）正处于积极支持或测试中。
- 🔁 **模型下载源**：关于 **ModelScope 集成** 的功能请求（#2969、#9117）正在讨论中；尚未实现。

---

### **4. 性能与优化**  
- **LoRA SFT 加速**：在 B200 上，`Qwen3.5-9B` 的 LoRA 微调耗时从 **0.83秒/步 → 0.66秒/步**（减少 CPU 侧开销）。  
  🔗 [PR #10744](https://github.com/unslothai/unsloth/pull/10744)
- **进一步优化**：额外减少 CPU 内核启动次数，将单步时间降至 **0.77秒**（模型无关半数）。  
  🔗 [PR #11238](https://github.com/unslothai/unsloth/pull/11238)
- **推理效率**：对 llama.cpp 运行时的优化（如缓存恢复、二进制探测）降低了 macOS 与 Windows 上的启动延迟。  
  🔗 [PR #11237](https://github.com/unslothai/unsloth/pull/11237)，[PR #10494](https://github.com/unslothai/unsloth/pull/10494)

---

### **5. 稳定性与回归问题**  
| 问题 | 严重程度 | 状态 | 修复 PR / 临时方案 |
|------|----------|--------|---------------------|
| `Qwen3Attention` 缺少 `apply_qkv` 属性 | 严重 | 已关闭 | 升级至最新版 `unsloth_zoo` |
| RTX 5060Ti 上 NVFP4 加载失败 | 高 | 已关闭 | 确认驱动版本 + 使用 `--force-fp4` |
| MTP 草稿崩溃：`GGML_ASSERT(ggml_can_repeat(b, a))` | 严重 | 开放 | [#11219](https://github.com/unslothai/unsloth/issues/11219) — 影响 RTX 5080 用户 |
| Studio 在 `0.0.0.0` 上无法启动 | 中等 | 开放 | [#11187](https://github.com/unslothai/unsloth/issues/11187) — 网络绑定问题 |
| KV 缓存量化未反映在上下文长度中（启用 TP） | 中等 | 已关闭 | 在 v0.1.810-beta 中已修复 |
| 带令牌的请求在无认证安全策略下跟随重定向 | 安全 | 开放 | [#11103](https://github.com/unslothai/unsloth/issues/11103) — 存在泄露风险 |

> ❗ **注意**：多个回归问题源于陈旧的 Docker 镜像——请确保使用 `v0.1.810-beta` 或更高版本。

---

### **6. 对应用开发者的意义**  
- **多用户与多主机部署**：借助新 Docker 与多用户支持，**Unsloth 现已适用于共享环境**（如企业级 LLM 平台、研究团队）。
- **AMD 一级支持**：ROCm 启用的 Docker 镜像实现了 NVIDIA 与 AMD 之间的真正跨 GPU 平等——对异构基础设施至关重要。
- **微调性能**：在 B200 上达到 **0.66秒/步** 的 LoRA SFT 速度，接近实时——非常适合代理训练流水线中的快速迭代。
- **视觉与多模态就绪**：GRPO 现在支持完整的视觉参数与图像列表输入——构建**基于代理的多模态系统**的关键。
- **安全与可靠性**：解决重定向泄露与沙箱化问题（通过 #11209、#11172）表明其逐步成熟，适合生产级部署。

> 💡 **行动项**：立即将所有 Docker 镜像（`unsloth/unsloth`、`unsloth/unsloth-rocm`）更新至 `v0.1.810-beta`。避免使用旧标签（`latest`、`0.1.43`）——这些版本已损坏或过时。

---  
*摘要源自 GitHub 活动（2026-09-17–18）*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*