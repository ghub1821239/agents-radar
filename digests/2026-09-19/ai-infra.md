# AI 基础设施日报 2026-09-19

> 生成时间: 2026-09-19 00:36 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-19**

---

### **1. 生态概览**  
2026年第三季度的AI推理与服务格局呈现出明显的两极分化：一端是**高性能、低层级引擎**（vLLM、llama.cpp），另一端则是**集成化、开发者友好型平台**（Ollama、SGLang、LiteLLM）。尽管vLLM和llama.cpp在内核级优化和硬件特定加速方面处于领先地位，但Ollama和SGLang正迅速成熟为全栈网关，具备代理感知功能和云原生工作流。Unsloth作为连接训练与推理的混合平台脱颖而出，而LiteLLM则整合了企业级编排能力——预算控制、安全机制与多提供商路由。MoE、FP8/INT8量化以及解耦式服务的融合，如今已成为性能与可扩展性的核心。

---

### **2. 活跃度对比**  

| 项目       | 近7日开放问题数 | 近7日合并的PR数 | 发布状态       |
|---------------|------------------|-------------------|----------------|
| vLLM          | 42               | 58                | `v0.28.1rc1` 稳定版   |
| SGLang        | 38               | 45                | `v0.5.20` 已发布    |
| llama.cpp     | 36               | 41                | `b11046–b11035`（增量更新） |
| Ollama        | 34               | 29                | `v0.34.3-rc0`（预发布） |
| LiteLLM       | 27               | 21                | `v1.103.0-dev.2`（开发版） |
| Unsloth       | 31               | 34                | `v0.1.811-beta`（测试版） |

> ✅ *洞察*：vLLM和SGLang展现出最高的工程迭代速度，反映出核心推理逻辑与生产就绪性的持续投入。Ollama的预发布周期表明其即将进入以功能迭代为主的新阶段。LiteLLM保持稳定，重点聚焦于安全加固。

---

### **3. 模型支持竞赛**  

| 新模型 / 架构              | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**        | ✅ (FP8/FP4, MTP) | ✅ (MTP) | ✅ (MTP) | ⚠️ (严重缺陷) | ❌ | ✅ (热修复带来2倍提速) |
| **GLM-5.3-Flash**             | ✅ (Blackwell/B200/B300, ROCm) | ✅ (自回归) | ❌ | ❌ | ❌ | ❌ |
| **Qwen4Exp**                  | ✅ (ROCm, CPU卸载) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Kimi K3**                   | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (初步支持) |
| **MiniMax-M3 (ROCm)**         | ❌ | ✅ (fp8 K-cache, Triton降级方案) | ❌ | ❌ | ❌ | ❌ |
| **DFlash2 / MTP / GDN**       | ✅ (异步卸载, 稳定性修复) | ✅ (MoE优化) | ✅ (分片模式修复) | ⚠️ (ROCm上状态泄露) | ❌ | ✅ (针对MTP的热修复) |

> 🏆 **排行榜**：  
> - **vLLM** 在**硬件覆盖范围与MoE鲁棒性**上领先。  
> - **SGLang** 在**ROCm生态深度与新模型集成**方面胜出。  
> - **Unsloth** 实现了**最快的现实性能提升**（如对Qwen3.8实现2倍提速）。  
> - **Ollama** 尽管早期尝试广泛接入，但在模型稳定性上仍显滞后。

---

### **4. 性能前沿**  

| 优化重点           | vLLM                            | SGLang                          | llama.cpp                       | Ollama                     | LiteLLM                    | Unsloth                   |
|------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------|----------------------------|----------------------------|
| **KV缓存效率**      | ✅ FlashInfer 分页更新（Ampere/Hopper），FP4 | ✅ HiCache 自动调节大小，动态池化 | ✅ MMQ内核（Vulkan），IM2COL | ⚠️ ROCm上存在状态泄露    | ❌ N/A                      | ✅ 卸载 + 检查点 |
| **批处理与调度**    | ✅ 异步卸载，部分预填充限制 | ✅ 预填充交错，引擎选择重构 | ❌ CUDA图开销问题 | ❌ 长上下文不稳定     | ✅ 预算速率限制    | ✅ API并发控制 |
| **量化**             | ✅ FP8/FP4，PLE CPU卸载（ROCm） | ✅ f16/fp8 K-cache，融合RMSNorm | ✅ IQ3_S/IQ3_XXS SYCL布局，int8 coopmat | ✅ 统一的MoE专家量化 | ✅ 成本感知定价 | ✅ UD-IQ4_XS，DFlash侧车 |
| **内核级优化**       | ✅ 融合QK-norm+RoPE+gate（ROCm），NGram推测器 | ✅ 融合mxfp8 + 排序（MoE） | ✅ 二进制flash_attn（OpenCL），Metal多列 | ❌ 静默EOS漏洞 | ❌ N/A | ✅ MTP热修复（2倍提速） |
| **分布式服务**       | ✅ 解耦式架构，NIXL KV连接器 | ✅ 引擎选择策略重构 | ❌ 无分布式模式 | ❌ 扩展能力有限 | ✅ 多提供商路由 | ❌ 无分布式训练 |

> 🔥 **趋势**：**解耦与混合量化**已成为竞争壁垒的核心。vLLM和SGLang在可扩展架构上领先；llama.cpp和Unsloth在嵌入式/边缘效率方面表现卓越。

---

### **5. 层级定位**  

| 项目       | 主要层级              | 核心差异化                                                                 |
|---------------|----------------------------|-------------------------------------------------------------------------------------|
| **vLLM**      | **服务引擎**         | 高吞吐、低延迟推理；适用于云规模大语言模型API与RAG场景。 |
| **SGLang**    | **服务网关 + 运行时** | 代理优先设计，分层缓存，负载感知路由。适合复杂工作流。 |
| **llama.cpp** | **本地运行时 / 边缘推理** | 跨平台、依赖极少；最适合设备端或资源受限部署。 |
| **Ollama**    | **开发者网关 / CLI工具** | 统一本地体验，模型仓库，便捷CLI访问。适用于原型开发与DevOps。 |
| **LiteLLM**   | **企业代理 / 编排层** | 多提供商路由、预算控制、认证、加密。生产环境AI API的关键组件。 |
| **Unsloth**   | **全栈平台**    | 融合推理、微调、训练与部署。面向需要端到端控制的开发者。 |

> 💡 *战略洞察*：最具韧性的架构如今已跨越多个层级——例如，**vLLM + LiteLLM + SGLang** 构成一套强大组合，适用于可扩展、安全且高性能的AI服务。

---

### **6. 趋势信号与开发者指引**  

#### **提炼出的关键行业趋势：**  
1. **硬件普惠化**：AMD ROCm与Intel GPU支持已不再是实验性功能——vLLM、SGLang与Unsloth现已在FP8、MTP与MoE任务上实现与NVIDIA的并行支持。  
2. **代理中心化设计**：SGLang与Ollama正引入**思维深度控制**、**工具调用验证**与**会话状态隔离**，标志着从“提示驱动”向“行为控制”代理的转变。  
3. **安全优先的编排**：LiteLLM的虚拟密钥绕过漏洞（#41810）以及Ollama在ROCm上的状态泄露，凸显**信任边界正面临威胁**——开发者必须审计查询参数与后端隔离机制。  
4. **抽象层中的性能突破**：Unsloth通过MTP热修复实现2倍提速，证明即使在高层框架中，**底层内核调优依然能带来真实收益**。  
5. **量化与内存权衡**：所有项目均推进至**混合精度MoE**、**CPU卸载**与**动态池化**，但因CUDA图、静默EOS等问题引发回归，表明这些优化尚未成熟。

#### **应用开发者应重点关注：**  
- ✅ **采用vLLM或SGLang** 构建高吞吐RAG与代理系统——尤其配合 `--max-num-partial-prefills` 与 `--enable-prefill-interleaving`。  
- ✅ **避免在LiteLLM中使用 `?model=` 覆盖**，直至 #41810 修复完成——应使用带严格白名单的虚拟密钥。  
- ✅ **仅在验证模型行为后使用Ollama**——`qwen3.8`、`deepseek-v4.1-flash`、`qwen3-coder` 存在已知输出损坏风险。  
- ✅ **若使用 `Qwen3.8-Flash-Next`，立即升级至 `v0.1.811-beta`**——v0.1.810之后性能损失不可接受。  
- ✅ **密切监控Vulkan/ROCm后端**——崩溃与内存泄漏仍普遍存在；尽可能优先选用CUDA或Metal。

> 🔚 **结语**： “即插即用”推理的时代已然结束。未来属于**理解抽象、性能与安全之间权衡的工程师**——以及能够驾驭这个碎片化但高速演进的AI基础设施前沿的人。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-19**

---

### **1. 今日亮点**  
vLLM 项目持续推进对 **解耦服务（disaggregated serving）** 的支持，关键进展包括 NIXL KV 连接器的可靠性提升以及 MoE 模型异步卸载功能。针对 DiffusionGemma 和混合 GDN/MTP 工作负载的关键稳定性修复已合并，同时新增 ROCm 优化使 AMD GPU 上的 FP8 模型服务成为可能。一项重要 RFC 提议在 V1 调度器中恢复并发部分预填充（partial prefill）限制——这对高吞吐长上下文 RAG 任务至关重要。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
未观察到新版本发布或破坏性 API/配置变更。`v0.28.1rc1` 版本保持稳定，推测性解码和调度行为仍在持续优化中。

---

### **3. 新模型与硬件支持**  
- ✅ **ROCm 支持**：扩展对 AMD GPU（gfx950）上 Qwen4Exp 与 GLM-5.3-Flash 的 FP8/FP4 支持，通过 `VLLM_PLE_CPU_OFFLOAD` 实现 n-gram 表的 CPU 卸载 ([PR #57497](https://github.com/vllm-project/vllm/pull/57497))。  
- ✅ **硬件扩展**：全面支持 **NVIDIA Blackwell B300/B200**（SM120），在先前崩溃问题修复后，现已启用 GLM-5.3-Flash（`qk_rope_head_dim=0`）的固定注意力路径 ([Issue #53963](https://github.com/vllm-project/vllm/issues/53963))。  
- ✅ **Intel GPU**：正积极开发 Intel GPU 集成，支持混合精度量化与 MTP 功能 ([Issue #53119](https://github.com/vllm-project/vllm/issues/53119))。

---

### **4. 性能与优化**  
- 🔥 **推测性解码**：PRs #40704 与 #57416 引入 NGram GPU 推测器并优化仅预填充批次处理逻辑，减少扩散模型中不必要的 logits 计算 ([PR #57416](https://github.com/vllm-project/vllm/pull/57416))。  
- 📈 **内存效率**：ROCm PRs #57497 与 #51406 通过将 Qwen4Exp PLE 表卸载至固定主机内存，实现 **约 100 GiB VRAM 节省**。  
- ⚡ **核函数融合**：Qwen3-Next/Qwen3.5 的 `QK-norm+RoPE+gate` 融合核函数已在 ROCm 上落地 ([PR #51406](https://github.com/vllm-project/vllm/pull/51406))，减少核函数调用次数，提升吞吐量。  
- 💾 **KV 缓存优化**：FlashInfer 现已支持 SM100 之前的架构（Ampere/Hopper）上的 NVFP4 分页 KV 更新，可在不损失性能的前提下减小缓存占用 ([PR #46963](https://github.com/vllm-project/vllm/pull/46963))。

---

### **5. 稳定性与回归问题**  
- 🛑 **严重崩溃**：当 Dynamo 回退至急切模式时，`DiffusionGemma` 因自条件嵌入缓冲区数据类型不匹配而崩溃 ([PR #57462](https://github.com/vllm-project/vllm/pull/57462)) —— 修复已合并。  
- 🛑 **长上下文质量下降**：GLM-5.3-Flash 在长时间推理解码循环后出现输出质量退化；疑似因 ROCm 上 kpool 索引器的静默 KV 缓存覆盖所致 ([Issue #54359](https://github.com/vllm-project/vllm/issues/54359))。  
- 🐞 **静默 CUDA IMA**：在 SM80（RTX 3090）上使用 DFlash2 采样负载时，经过约 11,000 次解码步骤后持续出现非法内存访问（Xid 31）([Issue #55279](https://github.com/vllm-project/vllm/issues/55279)) —— 目前尚未修复。  
- 🐞 **异步调度缺陷**：异步调度期间可能出现 `assert request.num_output_placeholders >= 0` 失败情况 ([Issue #30142](https://github.com/vllm-project/vllm/issues/30142)) —— 修复待处理。

---

### **6. 对应用开发者的意义**  
- **对于 RAG / 长上下文应用**：请在 V1 调度器中使用 `--max-num-partial-prefills` 来高效处理 10 万+ token 的提示，该功能现已成为生产环境关键特性 ([RFC #57413](https://github.com/vllm-project/vllm/issues/57413))。  
- **对于多模态代理**：注意多模态占位符扩展的潜在风险——近期漏洞 (#57223) 导致 `assistant_tokens_mask` 对齐错误；建议使用最新 vLLM 构建版本。  
- **对于使用 LoRA/RL 工作流的开发者**：在 [#48297](https://github.com/vllm-project/vllm/issues/48297) 修复前，请避免在睡眠/唤醒模式下启用 `enable_lora=True`。  
- **对于部署在 AMD 平台的用户**：可利用 `VLLM_PLE_CPU_OFFLOAD` 在单张 MIG 启用卡上运行大型 FP8 模型（如 Qwen3.8-Flash-Next-FP8）。  

> 🔗 *持续关注：[vLLM GitHub Issues](https://github.com/vllm-project/vllm/issues)，[PRs](https://github.com/vllm-project/vllm/pulls)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-09-19**

---

### **1. 今日亮点**  
最新发布的 **v0.5.20** 在模型支持与基础设施稳定性方面带来显著提升，新增了 **GLM-5.3-Flash** 作为自回归模型。关键工程工作正在推进，包括优化 **HiCache 自动调节大小**、**CUDA graph 内存管理** 以及 **引擎选择策略重构**，表明项目正全力向生产级可扩展性与资源效率迈进。

---

### **2. 发布与破坏性变更**  
- **v0.5.20**：由 237 名贡献者提交的 713 个 PR 构成。未报告破坏性 API 变更，但用户应查阅更新后的文档，了解新功能如 `--enable-prefill-interleaving` 以及改进的预填充调度控制。  
  🔗 [GitHub 上的 v0.5.20 发布](https://github.com/sgl-project/sglang/releases/tag/v0.5.20)

---

### **3. 新模型与硬件支持**  
- **GLM-5.3-Flash**：新增为受支持的自回归模型；针对高吞吐推理进行了优化，采用 flash attention 技术。  
  🔗 [教程：GLM-5.3-Flash](https://docs.sglang.io/cookbook#glm-53-flash)  
- **MiniMax-M3 (ROCm)**：实验性支持 fp8 K-cache 分配、融合 RMSNorm + 每 token FP8 量化，以及通过 Triton 回退实现的 Gluon 分页注意力。  
  🔗 PRs: [#36549](https://github.com/sgl-project/sglang/pull/36549), [#36575](https://github.com/sgl-project/sglang/pull/36575), [#36546](https://github.com/sgl-project/sglang/pull/36546)  
- **NVIDIA Hopper (H20)**：已验证与 GLM-5.3-Flash 视觉模型的兼容性，但报告存在 JPEG 误分类的缺陷。  
  🔗 问题 #38821

---

### **4. 性能与优化**  
- **预填充 CUDA Graph 内存开销**：新报告的问题显示，预填充 CUDA graphs 占用约 1.8 GB 内存，导致小显存 GPU（如 24GB 显卡）上长上下文量化 KV 预填充资源耗尽。目前尚无自动禁用规则考虑空闲显存。  
  🔗 问题 #40094  
- **HiCache 自动调节大小**：PR #40135 引入基于可用内存动态调整主机池大小的机制，防止在资源受限环境中因过度分配导致失败。  
  🔗 PR #40135  
- **MoE 优化**：对小批量 MoE 解码采用融合 mxfp8 量化与排序路径，将启动开销降低至约 7μs/层，提升解码吞吐量。  
  🔗 PRs: [#36559](https://github.com/sgl-project/sglang/pull/36559), [#36575](https://github.com/sgl-project/sglang/pull/36575)  
- **引擎选择策略重构**：多 PR 工作（如 #40241, #40271）正在重构 `sgl-router`，以支持基于负载的准入策略和共享状态管理——为可扩展的多引擎路由奠定基础。  
  🔗 POLICY_DESIGN.md

---

### **5. 稳定性与回归问题**  
- **严重**：`DFLASH draft 布局未验证` → 锚点优先检查点会无声地移动位置，可能导致生成错误的 token。  
  🔗 问题 #40144 *(尚未提交修复 PR)*  
- **高严重度**：`Qwen3CoderDetector` 重复生成 `<parameter=NAME>` 标签，截断参数并覆盖早期匹配项。  
  🔗 问题 #39836 *(尚未提交修复 PR)*  
- **中等**：OpenAI 兼容 API 在 Python 与 Rust 中生成不同提示（177 vs 167 tokens），因渲染不一致所致。  
  🔗 问题 #39843 *(尚未提交修复 PR)*  
- **低**：`DeepSeek V4/V3.2` 的工具调用返回内容中缺少 `tool_calls` 字段（输出格式错误）。  
  🔗 问题 #40236 *(尚未提交修复 PR)*  
- **已解决**：`is_musa()` 现在会破坏 TorchDynamo 跟踪 —— 通过 PR #40007（已合并）修复，但仍存在依赖风险。  
  🔗 PR #40007

---

### **6. 对应用开发者的启示**  
- **启用 `--enable-prefill-interleaving`** 以在混合延迟工作负载中实现更好公平性；使用 `--prefill-interleaving-min-continuation-tokens` 调整权衡。  
- **使用预填充 CUDA graphs 时需密切监控 GPU 内存使用情况** —— 若运行在低显存硬件上，建议禁用或调整阈值。  
- **在 #39843 修复前，避免依赖 OpenAI 兼容 API 的 Python/Rust 行为一致性**；跨运行时测试提示保真度。  
- **为引擎选择升级做好准备** —— 即将推出的 `sgl-router` 重构将支持更智能、负载感知的跨异构引擎路由，对代理系统和多模型网关至关重要。  
- **针对 Qwen3CoderDetector 与 DeepSeek 模型，验证工具调用输出**，因已知序列化缺陷。  

📌 **可操作提示**：在容器化或内存受限部署中，启用 `--enable-hierarchical-cache` 并配合自动调节大小（`#40135`）以避免崩溃。  

*简报生成时间：2026-09-19 | 来源：github.com/sgl-project/sglang*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 消息简报 – 2026-09-19**

---

### **1. 今日重点**  
最新一轮更新聚焦于**多后端硬件加速的增强**，关键改进包括 OpenCL 与 Hexagon 支持的优化，新增用于 flash attention 的二进制内核，并扩展了 IM2COL/ROLL 操作。在 **SYCL 图记录**方面也取得显著进展，为 Intel Arc GPU 实现性能优化，同时 Vulkan 后端通过新增 RDNA3/RDNA4 的 MMQ 内核进一步提升稳定性。

---

### **2. 发布与破坏性变更**  
最新版本未引入破坏性变更或重大 API 变更。所有近期版本（b11046–b11035）均为增量更新，重点在于后端稳定性和功能扩展。开发者在使用 DFlash2 或 MTP 模型时，应确保兼容 `--split-mode tensor`，因最近已合并修复（[PR #27858](https://github.com/ggml-org/llama.cpp/pull/27858)）。

---

### **3. 新模型与硬件支持**  
- **Hexagon（高通 AI 引擎）**：新增 ROLL 操作支持（[PR #29105](https://github.com/ggml-org/llama.cpp/pull/29105)），改进对 1D/填充输入的 IM2COL 处理（[PR #29103](https://github.com/ggml-org/llama.cpp/pull/29103)），并支持 BF16↔F16 转换（[PR #29106](https://github.com/ggml-org/llama.cpp/pull/29106)）。  
- **OpenCL**：新增二进制内核 `flash_attn_f32_f16_bin`，实现更快的注意力计算（[PR #29046](https://github.com/ggml-org/llama.cpp/pull/29046)）。  
- **Vulkan**：为 AMD RDNA3/RDNA4 GPU 新增 IQ3_S MMQ 矩阵乘内核（[PR #28822](https://github.com/ggml-org/llama.cpp/pull/28822)），显著提升低精度推理效率。  
- **新模型支持**：现已支持 Qwen3.8-Flash-Next MTP 模型，并启用共享模块优化（[PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243)）。

---

### **4. 性能与优化**  
- **SYCL**：PR #29107 引入 IQ3_S/IQ3_XXS 的持久重排布局，在 Intel Arc B70 上早期基准测试中解码速度提升最高达 **~15%**。  
- **Metal**：PR #29110 为小批量（Q4_0/Q8_0）新增多列矩阵-向量内核，将每列开销从约 1 次完整矩阵向量运算降低至亚线性增长 —— 预期在批量大小 2–8 时带来 **~20–30% 提升**。  
- **Vulkan**：PR #27952 为 AMD RDNA3/RDNA4 推出 int8 coopmat1 MMQ 内核，相比旧实现提示处理速度提升 **~1.5 倍**。  
- **CUDA**：PR #28634 默认启用 `GGML_CUDA_FA_ALL_QUANTS`，彻底消除对通用反量化路径的静默降级 —— 在启用 flash attention 的 RTX 3090 上，预填充吞吐量从 **~34 t/s 恢复至 ~1147 t/s**。

---

### **5. 稳定性与回归问题**  
多个后端仍存在关键稳定性问题：
- **CUDA**：在启用 CUDA graphs 时，RTX 5090 出现 GPU 假死和 XID 8 错误（[Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)）。可临时使用 `GGML_CUDA_DISABLE_GRAPHS=1` 作为规避方案。  
- **Vulkan**：在 gfx1151 上使用 RADV 驱动运行 qwen4exp 模型时解码阶段崩溃（[Issue #29028](https://github.com/ggml-org/llama.cpp/issues/29028)）。  
- **Metal**：长上下文长度下，单个 token 后静默输出 EOS（[Issue #28805](https://github.com/ggml-org/llama.cpp/issues/28805)）—— 此行为具有随机性，与量化方式及 KV 缓存相关。  
- **SYCL**：双 Arc Pro B70 设备配置下出现设备丢失崩溃（[Issue #27198](https://github.com/ggml-org/llama.cpp/issues/27198)），以及启用 ngram-mod 时极端显存分配（>2GB）（[Issue #28860](https://github.com/ggml-org/llama.cpp/issues/28860)）。  

*注：* 多项修复正在推进中（如 [PR #27858](https://github.com/ggml-org/llama.cpp/pull/27858) 修复 DFlash2 + split-mode），但目前尚无稳定版本解决上述问题。

---

### **6. 对应用开发者的意义**  
- **面向边缘/AI on device 应用**：Hexagon 与 Metal 的性能提升使高通 SoC 与苹果硅芯片表现更佳，尤其适用于滑动窗口注意力（SWA）类轻量模型。在修复落地前，请谨慎使用 `--split-mode tensor` 与 MTP/DFlash2。  
- **面向高吞吐推理**：启用 `GGML_CUDA_FA_ALL_QUANTS`（现为默认值）以避免非标准量化导致的性能断崖。在问题 #27330 解决前，避免在 RTX 5090 上使用 CUDA graphs。  
- **面向跨后端部署**：预期在 SYCL（Intel Arc）与 Vulkan（AMD Strix Halo）上存在不稳定性 —— 建议使用 `--no-mmap`、禁用 `ngram-mod`，并监控设备内存使用情况。  
- **面向模型服务**：建议升级至 `b11046+` 以获得改进后的 OpenCL flash-attention 支持，以及通过 `ggml-hexagon` 优化带来的更好降级处理机制。生产部署前请密切关注 [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues) 获取实时稳定性更新。

> 📌 **可操作建议**：使用 `--list-devices` 验证后端可用性，尤其在 ROCm/HIP 与 Windows 构建中，可能存在 DLL 缺失问题（[Issue #26996](https://github.com/ggml-org/llama.cpp/issues/26996)）。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### **Ollama Digest — 2026-09-19**

#### **1. 今日亮点**  
最新发布的 `v0.34.3-rc0` 通过 `/api/show` 接口显式暴露模型级别的思维控制配置，使客户端可根据模型能力动态设置推理深度（低/高/最大），这对代理和工具链工作流至关重要。与此同时，围绕 Qwen3 系列模型的一波稳定性问题浮现，尤其集中在工具调用解析、云模型中的图像处理以及 ROCm 平台跨请求状态泄露，凸显了混合 MoE 与 GPU 后端兼容性方面的持续挑战。

#### **2. 发布与破坏性变更**  
- **`v0.34.3-rc0`**：现可通过 `GET /api/show` 暴露每个模型的 `thinking` 配置：  
  ```json
  {
    "thinking": {
      "values": ["low", "high", "max"],
      "default": "max"
    }
  }
  ```
  [PR #18473](https://github.com/ollama/ollama/pull/18473) | [Issue #18529](https://github.com/ollama/ollama/issues/18529)  
- **CLI Agent 移除**：由于安全与用户体验顾虑，内置 CLI 代理已被移除，转而支持更优的独立启动选项 ([#18393](https://github.com/ollama/ollama/pull/18393))。用户需通过外部工具或未来 CLI 标志显式启用代理功能。

#### **3. 新模型与硬件支持**  
- **新模型请求**：  
  - *Mistral Small 4*（Mistral Small 3.2 的开源继任者）正被积极请求 ([#15142](https://github.com/ollama/ollama/issues/15142))。  
  - *Prism Ternary GGUFs (PQ2_0/PTQ1_0)* 因 Ollama 解析器不支持张量大小溢出而受阻 ([#18521](https://github.com/ollama/ollama/issues/18521))。  
- **硬件后端**：  
  - **ROCm**：混合 GDN 模型在 gfx1151（Radeon 8060S）上出现跨请求状态泄露，问题已追踪至 [ggml-org/llama.cpp#29092](https://github.com/ggml-org/llama.cpp/issues/29092)。  
  - **MLX**：1-bit/2-bit 量化 Bonsai 模型需要上游 MLX 支持 ([#18515](https://github.com/ollama/ollama/issues/18515))。  
  - **Vulkan**：Intel Iris Xe iGPU 在启动时无法检测到显存 ([#18482](https://github.com/ollama/ollama/issues/18482))，并在近期版本中于 KV 缓存分配阶段崩溃 ([#18531](https://github.com/ollama/ollama/issues/18531))。

#### **4. 性能与优化**  
- **内存管理**：  
  - 用户请求对多 GPU 配置提供更细粒度的内存拆分控制 ([#18525](https://github.com/ollama/ollama/issues/18525))，特别是用于慢速 PCIe3 插槽作为溢出目标的情况。  
  - 针对 <16GB 内存系统运行 7B+ 模型，提出动态卸载与基于内存感知的加载策略 ([#13601](https://github.com/ollama/ollama/issues/13601))。  
- **推理效率**：  
  - 基准测试已改用 **HumanEval 补丁提示**，替代合成输入，以提升推测性草稿性能校准精度 ([#17480](https://github.com/ollama/ollama/pull/17480))。  
  - 量化改进：稀疏 MoE 专家库的统一量化现已避免混合精度膨胀问题 ([#17976](https://github.com/ollama/ollama/pull/17976))。

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|---------|------|--------|------------|
| 🔴 高 | `qwen3.8` 在流式聊天中失败：`no user query found in messages`（500） | 破坏客户端工具循环；使用 205k 上下文可复现 | [Issue #17778](https://github.com/ollama/ollama/issues/17778) |
| 🔴 高 | `deepseek-v4.1-flash:cloud` 尽管具备 `vision` 能力却静默丢弃图像 | 误导性 API 合约；破坏多模态应用 | [Issue #18527](https://github.com/ollama/ollama/issues/18527) |
| 🔴 高 | ROCm 混合 GDN 模型在请求间泄露前一个提示文本 | 安全风险；在多用户场景中污染输出 | [Issue #18528](https://github.com/ollama/ollama/issues/18528) |
| 🟡 中 | MLX nvfp4 在持续负载下无限期卡死 | 可导致整个推理服务挂起；需发送 SIGTERM 终止 | [Issue #18505](https://github.com/ollama/ollama/issues/18505) |
| 🟡 中 | Vulkan iGPU 运行器在取消预填充后陷入僵死 | 静默挂起；需完整重启 | [Issue #18477](https://github.com/ollama/ollama/issues/18477) |
| 🟡 中 | `qwen3-coder` 在 `<function=...>` 之前进行推理时丢失工具调用 | 若模型使用自然语言前缀，则工具链失效 | [Issue #18530](https://github.com/ollama/ollama/issues/18530) |

#### **6. 对应用开发者的影响**  
- **工具链工作流**：谨慎使用 `qwen3.8`、`qwen3-coder` 与 `deepseek-v4.1-flash`——这些模型可能静默丢弃输入或错误解析工具调用。请实现降级逻辑，并在依赖结构化输出前验证响应。  
- **云端与本地对比**：部署代理前，使用 `ollama show` 或 `/api/show` 检查 `capabilities` 与 `thinking` 支持情况。通过 CLI 或 UI 增强功能过滤仅本地模型 ([#16833](https://github.com/ollama/ollama/issues/16833))，避免意外的云端依赖。  
- **部署加固**：在解决卡死问题前，避免在 MLX/nvfp4 上使用 `OLLAMA_NUM_PARALLEL=1`。监控 Vulkan/ROCm 后端的静默挂起现象——尽可能考虑回退至 CPU 或 CUDA。  
- **前瞻性准备**：预计未来将获得对内存、量化及模型行为的更细粒度控制。利用新的 `thinking` 元数据，在应用界面中暴露可配置的推理深度。

---  
*数据来源：GitHub: ollama/ollama • 更新时间：2026-09-19*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-09-19**

---

### **1. 今日亮点**  
LiteLLM 项目持续强化企业级基础设施能力，关键更新涵盖预算管理、认证机制与代理安全。核心进展包括引入 *预算结转* 功能以利用未使用额度，增强通过 SSH/GitHub Token 集成私有仓库技能的支持，并对 MCP（模型控制协议）集成进行重大重构，在保持向后兼容性的同时为未来协议演进铺路。

---

### **2. 发布与破坏性变更**  
- **v1.103.0-dev.2** 已发布，通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 实现 Docker 镜像签名优化。所有镜像现均采用 Sigstore 签名，确保部署环境中的完整性。  
  🔗 [GitHub Release v1.103.0-dev.2](https://github.com/BerriAI/litellm/releases/tag/v1.103.0-dev.2)

> **注意**：本次发布未引入任何 API 或配置的破坏性变更；重点仍聚焦于安全加固与内部稳定性提升。

---

### **3. 新模型与硬件支持**  
- **OpenRouter**：通过 PR [#41833](https://github.com/BerriAI/litellm/pull/41833) 在 `model_prices_and_context_window.json` 中新增对两个新上线模型（`gpt-5.6-sol`、`kimi-k2.6`）的支持。  
- **Azure AI Foundry**：修复了此前因参数转发错误导致 `flux.2-pro` 图像编辑请求忽略 `width`/`height` 的问题 ([#36644](https://github.com/BerriAI/litellm/issues/36644))。  
- **GitGot**：现已作为 JSON 配置的 OpenAI 兼容服务商支持 ([#40810](https://github.com/BerriAI/litellm/pull/40810))。

---

### **4. 性能与优化**  
- **流式防护机制**：已合并修复，防止敏感值被拆分至多个 SSE 数据块时产生误报 ([#41611](https://github.com/BerriAI/litellm/issues/41611))，显著提升实时内容过滤的可靠性。  
- **成本计算 CI**：新增测试分片以验证多种使用类型（缓存、推理、音频、网络搜索）下的成本计算准确性，降低未被发现的价格漂移风险 ([#41328](https://github.com/BerriAI/litellm/pull/41328))。  
- **HTTP/2 支持**：虽尚未实现，但已有功能请求提出，计划为上游服务的出站请求启用 HTTP/2 ([#30362](https://github.com/BerriAI/litellm/issues/30362)) —— 预期在高并发场景下可改善延迟表现。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复/PR | 描述 |
|------|----------|--------|--------|-------------|
| [#24677](https://github.com/BerriAI/litellm/issues/24677) | 高 | 已关闭 | N/A | 虚拟密钥配置正确但 TPM 限制失效 —— 在先前修复后再次出现。 |
| [#39713](https://github.com/BerriAI/litellm/issues/39713) | 严重 | 开放 | N/A | 一旦虚拟密钥被缓存，客户级 RPM 限制即被忽略 —— 影响计费准确性。 |
| [#41810](https://github.com/BerriAI/litellm/issues/41810) | 严重 | 开放 | N/A | 通过 `?model=` 查询字符串绕过虚拟密钥模型白名单 —— 存在潜在安全风险。 |
| [#41792](https://github.com/BerriAI/litellm/issues/41792) | 高 | 开放 | N/A | Bedrock 在主动切换模型后拒绝加密推理请求，源于亲和性管理不当。 |
| [#41793](https://github.com/BerriAI/litellm/issues/41793) | 高 | 已关闭 | N/A | 加密内容亲和性错误地将不同 Bedrock 模型视为兼容。 |

> ⚠️ **严重安全提示**：`虚拟密钥模型白名单绕过` 问题 (#41810) 表明存在未经授权访问模型的潜在路径 —— 团队应避免在未修复前暴露 `/v1/chat/completions` 接口并接受不可信查询参数。

---

### **6. 对应用开发者的启示**  
- **谨慎使用查询字符串模型覆盖** —— 当前 `?model=` 参数可绕过虚拟密钥限制。在 #41810 修复前，请勿在生产环境中依赖此功能。  
- **启用预算结转**：通过 `rollover_max_budget`（PR #41693）减少个人或团队等变动使用场景下的资源浪费。  
- **通过 GitHub Token 或 SSH 密钥集成私有仓库**（功能请求 #26071），以安全方式扩展代理能力。  
- **切换 Bedrock 模型时需仔细监控加密推理行为** —— 当前亲和性逻辑可能导致静默失败 ([#41792](https://github.com/BerriAI/litellm/issues/41792))。  
- **升级仪表盘** —— PR #40429 引入升级提示栏，展示最新变更日志统计，帮助管理员及时掌握改进与修复信息。

👉 **建议操作**：审计虚拟密钥策略，验证预算强制执行情况，并监控长时间运行会话中意外的模型切换。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-19**

#### **1. 今日亮点**  
v0.1.811-beta 版本在多用户支持、AMD ROCm 和 ARM64 CUDA Windows 兼容性方面取得重大进展，并通过 MTP 热修复实现了 `Qwen3.8-Flash-Next` 的关键 2 倍性能提升。此次更新进一步巩固了 Unsloth 在多样化硬件上作为全栈 AI 推理与训练平台的地位。

#### **2. 发布与破坏性变更**  
- **v0.1.811-beta**：发布包含 Docker 多用户支持、RDNA1+/RDNA2 GPU 加速、FP8/INT8 扩散支持、ARM64 CUDA on Windows，以及增强的训练/推理性能。  
  🔗 [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.811-beta)  
- **MTP 热修复**：`Qwen3.8-Flash-Next` 因优化的 MTP 内核处理，现运行速度**提升 2 倍**。建议升级以避免性能下降。  
  🔗 [Issue #11143](https://github.com/unslothai/unsloth/issues/11143)

#### **3. 新模型与硬件支持**  
- **AMD ROCm**：全面支持 RDNA1+（如 RX 7900 XTX、Radeon Pro W7900），新增 Docker 镜像（`studio:rocm`）。  
  🔗 [PR #11286](https://github.com/unslothai/unsloth/pull/11286)  
- **ARM64 CUDA on Windows**：实验性支持基于 ARM64 架构的 GPU 在 Windows 下通过 CUDA 运行。  
- **GGUF 量化**：扩展支持 `UD-IQ4_XS`、`UD-Q4_K_XL` 与 `DFlash` 边车模型，配合 `--split-mode tensor`（ROCm 上游修复待合并）。  
- **新模型架构**：初步支持 **Kimi K3**（via Issue #11078），但微调功能尚未确认。

#### **4. 性能与优化**  
- **2 倍加速**：`Qwen3.8-Flash-Next` MTP 推理在热修复后**速度提升 2 倍**（问题 #11143）。  
- **推理吞吐量回归**：用户报告**在 v0.1.810-beta 之后 GGUF 推理变慢**，尤其在 Studio 上表现明显（问题 #11221）。  
  🔗 [Issue #11221](https://github.com/unslothai/unsloth/issues/11221)  
- **内存效率**：使用 `Q8` KV 缓存并启用 `--ctx-checkpoints 64` 时，RTX 5090 上显存占用稳定（问题 #11278）。  
- **API 并发控制**：新增 `UNSLOTH_API_MAX_CONCURRENCY` 配置项，用于限制并行请求数量（PR #5482）。

#### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|------------|
| 🔴 严重 | [#11143](https://github.com/unslothai/unsloth/issues/11143) | `Qwen3.8-Flash-Next` MTP 加载时因 `nextn.hc_head_norm` 重基错误导致崩溃 | ✅ 正在处理（v0.1.811-beta 中已含热修复） |
| 🔴 严重 | [#11219](https://github.com/unslothai/unsloth/issues/11219) | RTX 5080 上 MTP drafter 因 `ggml_can_repeat(b, a)` 断言失败而崩溃 | ⚠️ 已复现；暂无修复方案 |
| 🟡 高 | [#11308](https://github.com/unslothai/unsloth/issues/11308) | DFlash 边车 + `--split-mode tensor` 在 ROCm（gfx1201）上断言失败 | ✅ 上游已有修复 (#27858)；等待合并 |
| 🟡 中 | [#11221](https://github.com/unslothai/unsloth/issues/11221) | v0.1.810-beta 之后 GGUF 吞吐量下降 | ❌ 尚无 PR |
| 🟡 中 | [#11184](https://github.com/unslothai/unsloth/issues/11184) | Vulkan 训练/微调不支持 | ❌ 功能请求开放 |

#### **6. 对应用开发者的意义**  
- **针对 MTP 优化**：若使用 `Qwen3.8-Flash-Next`，请立即升级至 v0.1.811-beta——仅需极少代码修改即可获得**约 2 倍推理速度提升**。  
- **避免 v0.1.810-beta 用于 GGUF**：若延迟敏感，请暂缓更新，直至 #11221 中的回归问题解决。  
- **跨平台部署**：使用新 Docker 镜像（`:rocm`、`:cuda`）实现一致的 AMD/NVIDIA 部署——对云或边缘推理尤为关键。  
- **安全与隔离**：更新后的主机白名单强制机制（PR #11172）确保 Python 工具无法绕过网络限制——对沙盒代理环境至关重要。  
- **面向未来**：关注如 #5933（Muon 优化器）和 #11286（ROCm 镜像中的 JupyterLab）等 PR，以获取高级训练与调试工作流支持。

> 💬 *技巧提示*：对于 Windows 用户，请避免使用应用程序执行别名（PR #5959），并确保 `python.exe` 解析未被系统桩文件阻塞——这通常是静默失败的常见原因。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*