# AI 基础设施日报 2026-10-11

> 生成时间: 2026-10-11 01:13 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **跨项目AI基础设施生态报告 – 2026-10-11**

---

#### **1. 生态概览**  
2026年第四季度的AI推理与服务格局，由高性能内核的快速融合、多硬件支持的扩展以及以代理为中心的工作流日益成熟所定义。各项目正愈发聚焦于生产负载的稳定性——尤其是在推测解码、前缀缓存和确定性推理方面——同时在模型效率（MoE、GDN、MXFP4）和硬件多样性（AMD ROCm、Blackwell、Intel Arc）上持续突破。混合模型（如 Mamba2 + Transformer）、高级量化（FP8、Q1_0）以及分布式推理模式的兴起，标志着向边缘到云端环境的可扩展、实时大语言模型编排转变。

---

#### **2. 活动对比**

| 项目       | 近7日开放问题数 | 近7日合并的PR数 | 发布状态         |
|------------|------------------|------------------|------------------|
| vLLM       | 28               | 34               | 稳定版：v0.31.0   |
| SGLang     | 32               | 29               | 无新版本发布     |
| llama.cpp  | 25               | 31               | 补丁版本（b11552+） |
| Ollama     | 37               | 19               | `0.40.x` 处于变动中 |
| LiteLLM    | 29               | 22               | 回滚至稳定版     |
| Unsloth    | 22               | 18               | 测试版：v0.1.903-beta |

> ✅ **洞察**：*SGLang* 和 *Ollama* 的问题数量最高，反映出用户驱动的活跃测试和早期部署中的挑战。*vLLM* 在PR提交速度上领先，背后是强劲的工程推进力，专注于性能与稳定性修复。

---

#### **3. 模型支持竞赛**

| 新模型 / 架构                | 支持项目                          | 说明 |
|------------------------------|------------------------------------|------|
| **Qwen3.8-27B (DFlash2/DSpark)** | vLLM（部分支持）、llama.cpp（b11552+） | vLLM 存在严重数据损坏漏洞；建议使用 v0.29.0 |
| **DeepSeek-V4.1 (Flash 版本)**   | vLLM、SGLang、llama.cpp             | 三者均已支持；vLLM 优化了解码路径 |
| **MiniCPM-V 4.7 (MoE + MROPE)** | llama.cpp（b11552+）、Ollama（通过 llama.cpp） | llama.cpp 中实现首屈一指的支持 |
| **Qwen3-TTS**                | Unsloth（功能请求 #3951）           | 尚未支持 —— 语音AI栈存在缺口 |
| **K2 Horizon (MoE)**         | Ollama（请求 #18698）               | 待官方提供 GGUF 格式支持 |
| **GatedDeltaNet (GDN)**      | vLLM、SGLang（ROCm 可选）          | vLLM 在内核级优化上领先 |
| **MXFP4 MoE**                | vLLM、SGLang、llama.cpp（SYCL）     | 通过 vLLM 与 SGLang 针对 AMD Mi355X |

> 🏆 **胜出者**：*vLLM* 在前沿模型架构支持（GDN、Flash Attention、MoE）方面领先，尤其在面向GPU优化的推理场景。*SGLang* 在多模态与扩散模型集成（SANA-Video 2.0、Cosmos3）方面表现卓越。

---

#### **4. 性能前沿**

| 优化重点                 | 关键项目及亮点 |
|--------------------------|----------------|
| **KV缓存效率**           | vLLM（前缀缓存修复）、SGLang（FFN 启动路径）、llama.cpp（`--reclaim-mmap-source`） |
| **批处理不变性与确定性** | vLLM（#61035–61038）、SGLang（混合 Mamba2 崩溃）、LiteLLM（成本追踪问题） |
| **推测解码**             | vLLM（混合模型回归）、SGLang（torch.compile 不稳定）、llama.cpp（修复竞争条件） |
| **量化与内核融合**       | vLLM（Blackwell 上的 BF16 KV 缓存）、SGLang（通过 TileLang 实现 FP8）、llama.cpp（Q1_0/HVX、SYCL-MXFP4） |
| **分布式服务**           | vLLM（流水线并行）、SGLang（DSpark CUDA Graphs）、Ollama（MLX 崩溃风险） |

> 🔥 **前沿焦点**：*vLLM* 在大规模推理的低延迟、高吞吐优化上占据主导地位。*SGLang* 推动动态图编译与多模态调度的创新。*llama.cpp* 在边缘与跨后端移植性方面仍无可替代。

---

#### **5. 层级定位**

| 项目       | 主要层级                     | 角色摘要 |
|------------|-------------------------------|----------|
| **vLLM**   | **推理引擎**                  | 高性能 GPU 服务核心；针对 TP/PP、推测解码与 KV 缓存优化 |
| **SGLang** | **推理引擎 + 网关**           | 全栈运行时，内置流式传输、工具调用与调度逻辑 |
| **llama.cpp** | **本地运行时 / 边缘引擎**     | 跨平台、兼容 CPU/GPU 的推理引擎，适用于嵌入式、桌面与边缘场景 |
| **Ollama** | **网关 / 开发者 CLI**         | 用户接口网关，具备模型管理、工具调用与本地优先的用户体验 |
| **LiteLLM** | **API 网关 / 编排层**         | 多提供商路由、成本控制、安全防护 —— 代理系统的核心枢纽 |
| **Unsloth** | **微调 + 本地 UI 运行时**      | 面向桌面的训练/推理套件，含图形界面，专为开发者与研究人员设计 |

> 💡 **定位洞察**：  
> - **引擎层**：vLLM（性能）、SGLang（灵活性）、llama.cpp（可移植性）  
> - **编排层**：LiteLLM（多供应商）、Ollama（本地开发）  
> - **微调层**：Unsloth（UI + 训练）、vLLM/SGLang（通过下游工具）

---

#### **6. 趋势信号**

🔍 **从当前活动提取的关键行业趋势**：
1. **硬件多样化加速**：AMD ROCm（gfx950/Mi355X）、Intel Arc B70 以及 Blackwell SM120/SM121 已成为主流目标——项目必须针对每种架构进行优化。
2. **混合模型需严格测试**：GDN、Mamba2、SWA 与 MoE 架构引入非确定性与回归风险——确定性推理不再是可选项。
3. **代理工作流推动稳定性压力**：工具调用、流式传输保真度、提示缓存等问题普遍存在——表明代理管道已成为主要用例。
4. **量化与内核融合趋于成熟**：FP8、MXFP4、Q1_0 以及融合 LoRA 已从概念验证迈向生产级支持。
5. **边缘与本地推理仍滞后**：尽管云引擎日趋成熟，本地/边缘平台（llama.cpp、Unsloth）仍面临内存与后端一致性问题。

> 📌 **对应用开发者的可操作建议**：
> - **避免在 Qwen3.8-27B (DFlash2) 上使用 `v0.30+/0.31`** —— 请锁定至 v0.29.0，直至 #60174 修复。
> - **在 SGLang 中谨慎启用 `--enable-torch-compile`** —— 必须先验证模型兼容性。
> - **在 Linux 环境下部署大型模型时，利用 `--reclaim-mmap-source` in llama.cpp**。
> - **全面验证所有工具调用流程**——Qwen3 系列存在多个已知解析错误。
> - **监控 LiteLLM 的成本核算**——缓存响应虽消耗 token，却错误报告为零成本。

> ✅ **总结**：基础设施层正逐步走向**生产就绪**，但唯有通过谨慎的版本选择、硬件感知调优，以及对代理特定工作流的严格测试，方可实现稳定落地。

---  
*生成时间：2026-10-11 | 供技术决策者与基础设施工程师参考*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-11**

---

### **1. 今日亮点**  
vLLM 项目持续聚焦于新兴硬件上的稳定性与性能，针对 **Qwen3.8-27B (DFlash2/DSpark)** 的前缀缓存损坏问题以及 **流水线并行下的推测解码异常** 进行了关键修复。新提交的 PR 主要集中在优化 **DeepSeek-V4.1 的解码效率** 和改进 **混合模型的 KV 缓存管理**，同时正在进行的工作包括提升 **AMD ROCm gfx950/Mi355X 性能** 以及确保 **批处理不变性合规性**。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告新的发布或破坏性变更。*  
最新稳定版本仍为 **v0.31.0**，无显著 API 或配置变动。用户应关注 #60174（前缀缓存损坏）和 #60838（`--mamba-block-size` 无效）以评估潜在运行时影响。

---

### **3. 新模型与硬件支持**  
- ✅ **AMD ROCm gfx950 / MI355X**：已启动针对 `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` (#57149) 与 `amd/Qwen3.8-Flash-Next-Quark-MXFP4` (#59575) 的专项优化，目标为 GatedDeltaNet + QuerySparse Attention 模型。  
- ✅ **NVIDIA Blackwell (SM120/SM121)**：通过 #55866 启用 FA4 稀疏 MQA 解码；现已支持 GB10/GB300 GPU 上的 BF16 KV 缓存。  
- ✅ **Intel Arc B70 (Battlemage)**：通过 `vllm 0.27.2rc1.dev77+gac7509e2b` 实现对 `qwen38` 模型服务的初步支持，但并发负载下引擎挂起的问题仍是已知缺陷 (#54698)。

---

### **4. 性能与优化**  
- 🔥 **DeepSeek-V4.1**：PR #61039 引入 *长度感知候选块选择*，减少解码路径中的冗余索引开销——预计在长上下文任务中可提升吞吐量约 5–10%。  
- 🚀 **GDN 混合步优化**：PR #61034 在急切预填充路径中减少主机侧 PyTorch 操作调用——无需内核变更，输出位级一致，但可降低每步延迟。  
- ⚙️ **ROCm 性能优化**：针对 Mi355X 上的 Qwen3.8-2.4T-A95B 与 Qwen3.8-Flash-Next 的持续优化，计划中的 PR 将逐步实现 MXFP4 MoE 与 GatedDeltaNet 的全利用率。  
- 💡 **批处理不变性修复**：多个 PR（如 #61038、#61036、#61035）修复了 WNA16 MoE 分发、DeepSeek 融合 A GEMM 及 all-reduce 填充中的非不变行为——这对分布式环境下的确定性推理至关重要。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 影响 | 修复状态 |
|------|----------|--------|------------|
| [#60174](https://github.com/vllm-project/vllm/issues/60174) | 严重 | 在 Qwen3.8-27B (NVFP4, DFlash2/DSpark) 上前缀缓存命中后导致输出损坏 | ❌ 尚无修复；v0.30/0.31 可复现，v0.29 中已解决 |
| [#54360](https://github.com/vllm-project/vllm/issues/54360) | 高 | 推测解码在混合 GDN 模型上静默禁用前缀缓存命中 | ❌ 尚无修复；影响 v0.24.0 之后的每日构建 |
| [#59770](https://github.com/vllm-project/vllm/issues/59770) | 中等 | 自 v0.29.0 起，Nemotron-3.5-Lightning (DGX Spark, NVFP4) 解码速度下降约 16% | ❌ 回归问题仍在 v0.30.0/nightly 版本中存在 |
| [#57838](https://github.com/vllm-project/vllm/issues/57838) | 中等 | 在 RDNA4 (gfx1201) 上选用了 RowWiseTorchFP8ScaledMMLinearKernel，导致解码耗时增加 5–24% | ❌ 尚无修复；正在调查中 |

> ⚠️ **注意**：多个回归问题与近期特定 GPU 架构（Blackwell、RDNA4）的内核及推测解码逻辑相关——部署此类工作负载的用户应考虑锁定至 v0.29.0 或更早版本。

---

### **6. 对应用开发者的启示**  
- **生产环境中避免使用 `v0.30.0` / `v0.31.0` 用于 Qwen3.8-27B (DFlash2/DSpark) 或混合 GDN 模型**——建议使用 `v0.29.0` 直至 #60174 与 #54360 修复。  
- **仅在验证过模型确定性后启用 `VLLM_BATCH_INVARIANT=1`**——近期 PR 显示该选项在 TP=4 条件下会破坏 MiniMax-M2.5、DeepSeek-V4.1 等多个模型。  
- **在 RAG/代理类工作负载中利用前缀缓存**，但需关注 #60044（按请求缺失归因不清）与 #60947（池化 + 前缀缓存复用）以获得更好可观测性。  
- **对于 AMD 用户**：请跟踪 #57149 与 #59575，了解 Mi355X 上即将带来的性能提升——早期采用可能需要调参适配。  
- **谨慎使用 `--stream-interval`**——PR #55226 修复了其与池化任务结合时引发的崩溃问题。

> 📌 **实用提示**：在报告问题前，请使用 `python collect_env.py` 验证环境配置——许多问题源于 FlashInfer、CUDA 或 Triton 版本不匹配。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-10-11**

---

### **1. 今日重点**  
SGLang 生态系统在大语言模型（LLM）与扩散模型的高性能推理方面持续成熟，针对 TP8 系统上 DSpark CUDA Graph 正确性问题进行了关键修复，并持续推进 torch.compile 集成优化。今日重点 PR 主要围绕稳定 Qwen-Image-2.1、Cosmos3 与 SANA-Video 2.0 的动态图编译（如 `--enable-torch-compile`），同时解决多模态传输及预填充准入逻辑中的内存安全问题。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 支持**：为 gfx950（MI355X）上的 *DeepSeek-V4.1-Flash* 添加可选的单解码 FFN 启动路径，通过设置 `SGLANG_ROCM_MONO_DECODE=1` 启用。要求 TP=2/4 且不使用 DP 或 EP。[PR #43497](https://github.com/sgl-project/sglang/pull/43497)  
- **摩尔线程（MUSA）**：仍开放功能请求以实现原生支持。[Issue #16565](https://github.com/sgl-project/sglang/issues/16565)  
- **扩散模型**：增强对 *SANA-Video 2.0* 的支持，包括可中断的 CUDA Graph 和负向提示词、TI2V mask 的缓存机制。[PR #43630](https://github.com/sgl-project/sglang/pull/43630)，[PR #41501](https://github.com/sgl-project/sglang/pull/41501)

---

### **4. 性能与优化**  
- **torch.compile 优化**：多个 PR 致力于通过编译期间保持关键模型图完整性来提升编译性能：  
  - 防止 Qwen-Image-2.1 与 Ulysses DiTs 中的图断裂。[PR #43586](https://github.com/sgl-project/sglang/pull/43586)  
  - 保留 Cosmos3 中融合内核的完整性。[PR #43577](https://github.com/sgl-project/sglang/pull/43577)  
  - 跳过 Inductor 缓存中存在风险的多内核选择，避免崩溃。[PR #43601](https://github.com/sgl-project/sglang/pull/43601)  
- **内存与调度效率**：  
  - 改用前向次数而非墙时间控制等待前缀刷新，防止 radix 树发散。[PR #43512](https://github.com/sgl-project/sglang/pull/43512)  
  - 缓存 SANA-Video 2.0 的条件数据，减少重复计算。[PR #43630](https://github.com/sgl-project/sglang/pull/43630)  
- **量化与内核融合**：  
  - 通过 TileLang 在 CUDA 上新增 FP8 KV 缓存支持。[PR #42957](https://github.com/sgl-project/sglang/pull/42957)  
  - 将动态 LoRA delta 移至第二个 GEMM 内部，以获得更好融合效果。[PR #43501](https://github.com/sgl-project/sglang/pull/43501)

---

### **5. 稳定性与回归问题**  
今日报告的关键稳定性问题包括：
- **CUDA 非法内存访问**：多个回归问题与 DSpark 在 TP8（B300/B30Z）上紧凑的 ragged target-verify CUDA Graph 捕获相关，根源为跨 TP 计划不一致与时序敏感的竞争条件。[Issue #31023](https://github.com/sgl-project/sglang/issues/31023)，[Issue #33356](https://github.com/sgl-project/sglang/issues/33356)  
- **多模态传输内存泄漏**：使用 `--mm-feature-transport cuda_vmm` 的中断请求会因未确认的传输分配导致 VMM 内存片泄漏。[Issue #43402](https://github.com/sgl-project/sglang/issues/43402)  
- **确定性推理卡死**：混合 Mamba2 模型（`granite-4.0-h`）在 `--enable-deterministic-inference` 下，当分块预填充 < 对齐长度时无法保证批处理不变性。[Issue #43413](https://github.com/sgl-project/sglang/issues/43413)  
- **统一内存崩溃**：在混合 SWA 模型上启用 `--enable-unified-memory` 会导致调度器因 `alloc_token_slots` 出现 OOM。[Issue #42653](https://github.com/sgl-project/sglang/issues/42653)  
- **压缩张量质量下降**：Qwen3.8-27B W4A16（分组 128）在相同检查点下，PPL 达 9.98，而 vLLM 仅为 6.05。[Issue #42917](https://github.com/sgl-project/sglang/issues/42917)  

> ✅ **修复进行中**：多个 DSpark 问题已有对应 PR（如 #31023 已由 #31195 修复），但完整解决仍需进一步验证。

---

### **6. 对应用开发者的启示**  
- **暂勿使用 `--enable-torch-compile`**，除非已验证模型兼容性——特别是 Qwen-Image-2.1、Cosmos3 与 Z-Image，否则可能引发性能下降或崩溃。建议使用 `TORCH_LOGS=graph_breaks` 进行调试。  
- **谨慎使用 `--enable-deterministic-inference`** 于混合 Mamba2 模型；在特定预填充配置下预期会出现非确定性行为。  
- **密切监控统一内存使用情况**——在复杂模型上启用可能导致调度器 OOM。  
- **对于多模态应用**，确保配合 `--mm-feature-transport cuda_vmm` 使用客户端超时处理，避免内存泄漏。  
- **充分利用 SANA-Video 2.0 与扩散工作流的缓存优化**，降低预热开销并提升吞吐量。  

> 🔗 保持更新：关注 CI 健康状态 [Issue #17050](https://github.com/sgl-project/sglang/issues/17050)，并追踪 DSpark 路线图 [Issue #30344](https://github.com/sgl-project/sglang/issues/30344)。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-11**

---

### **1. 今日亮点**  
最新更新聚焦于稳定推测解码工作流并提升模型兼容性，修复了 `llama-server` 中提示缓存处理的关键问题，并新增对 MiniCPM-V 4.7 的支持。值得注意的是，已解决高并发负载下基于内存的提示缓存出现的回归问题，防止不同对话间数据泄露。

---

### **2. 发布与破坏性变更**  
- **b11552**: 修复当槽位繁忙时错误的提示缓存更新行为 —— 当其他请求尝试锁定该槽位时，现在会保留正在进行的生成状态 ([PR #30295](https://github.com/ggml-org/llama.cpp/pull/30295))。此修复可防止因更优缓存匹配覆盖活跃生成而引发的竞争条件。
- **b11551**: 完全添加对 **MiniCPM-V 4.7** 的运行时支持，包括 MoE 架构及通过 `mrope` 实现的时间位置嵌入 ([PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416))。
- **b11550**: 在不受支持的编译器上禁用 s390x 构建中的 z17 目标，以避免构建失败 ([PR #30297](https://github.com/ggml-org/llama.cpp/pull/30297))。

> ⚠️ **迁移提示**：依赖 `--cache-ram` 并在高并发场景下运行的用户应升级至 b11552，以避免潜在的跨对话数据损坏。

---

### **3. 新模型与硬件支持**  
- **模型**：  
  - ✅ **MiniCPM-V 4.7**（MoE + MROPE）作为一级支持加入 ([PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416))。  
  - ✅ **DeepSeek V4.1**（Flash 版本）通过 `deepseek41` 架构新增支持 ([PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696))。  
  - ✅ **Prism Bonsai 2 27B** 已实现在运行时的支持 ([PR #29600](https://github.com/ggml-org/llama.cpp/pull/29600))。  
  - ✅ **GLM5-next** 现在支持输入层嵌入以用于推测解码 ([PR #30268](https://github.com/ggml-org/llama.cpp/pull/30268))。

- **后端与量化**：  
  - ✅ **Hexagon (Q1_0)**：通过 HVX 为边缘设备新增原生 Q1_0 支持 ([PR #30122](https://github.com/ggml-org/llama.cpp/pull/30122))。  
  - ✅ **OpenCL**：优化 Gemma-4 的 Flash Attention（`dk=512`），并提升 GPT-OSS-20B 在 `dk=64` 下的性能 ([PR #30266](https://github.com/ggml-org/llama.cpp/pull/30266))。  
  - ✅ **SYCL**：通过算术解码与权重重排加速 MXFP4 MoE ([PR #29809](https://github.com/ggml-org/llama.cpp/pull/29809))。

---

### **4. 性能与优化**  
- **内存效率**：  
  - PR #24156 引入 `--reclaim-mmap-source`，可在 Linux 上将 RSS 降低高达 **37%**（例如在 Qwen3-30B-A3B 上节省 13 GiB），通过丢弃闲置的 mmap 页面实现 —— 仅限 Linux，默认关闭 ([PR #24156](https://github.com/ggml-org/llama.cpp/pull/24156))。  
- **内核改进**：  
  - OpenCL：重构 bin 内核降级逻辑，防止大权重导致崩溃 ([PR #30310](https://github.com/ggml-org/llama.cpp/pull/30310))。  
  - Vulkan：在 `coopmat1` int8 矩阵乘法中限制 A 预取，防止越界读取 ([PR #30283](https://github.com/ggml-org/llama.cpp/pull/30283))。  
- **流水线并行**：启用流水线并行后，MoE 专家现在可卸载至主机内存 ([PR #29963](https://github.com/ggml-org/llama.cpp/pull/29963))。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|---------|------|--------|------------|
| 🔴 高 | `llama-server` 在长对话中因“非法分配”崩溃 ([#30091](https://github.com/ggml-org/llama.cpp/issues/30091)) | HIP 后端，Windows | 尚无修复 |
| 🔴 高 | 自 b10905 起，RDNA3 上 Flash Attention 预填充结果非确定性（ROCm/HIP）([#30175](https://github.com/ggml-org/llama.cpp/issues/30175)) | 多模态推理 | 已识别回归；暂无补丁 |
| 🟡 中 | 高并发下提示缓存恢复无关对话内容 ([#27148](https://github.com/ggml-org/llama.cpp/issues/27148)) | 基于内存缓存（`--cache-ram`） | 已在 b11552 修复 |
| 🟡 中 | Q8_1 反量化导致 GPU 内存溢出，引发 NaN PPL ([#21652](https://github.com/ggml-org/llama.cpp/pull/21652)) | Mistral 4 小型量化模型 | PR 已提交 —— 待评审 |
| 🟡 中 | Gemma4-assistant 中 Flash Attention 因头维度不匹配崩溃 ([#29419](https://github.com/ggml-org/llama.cpp/issues/29419)) | SYCL 后端 | 尚无修复 |

> ⚠️ **重要提醒**：多个回归问题影响生产级别的推测解码流水线，尤其在 AMD GPU 和 ROCm/HIP 平台上。开发者应使用 b11552+ 进行测试。

---

### **6. 对应用开发者的意义**  
- 若使用 `--cache-ram` 或在并发请求中进行推测解码，请立即使用 b11552+ —— 提示缓存缺陷可能导致跨会话输出污染。
- 充分利用对 MiniCPM-V 4.7、DeepSeek V4.1 及 Prism Bonsai 2 的新支持，在你的智能体中集成多模态和强推理任务。
- 在运行大型模型（>100亿参数）的 Linux 系统上，通过 `--reclaim-mmap-source` 优化内存使用。
- 在 PR #27196 合并前，避免在推测解码中使用 `logprobs` —— 当前主干版本存在缺陷。
- 重点关注 GPU 后端表现：AMD ROCm/HIP 在 Flash Attention 与 MoE 路径上的稳定性持续下降；建议在需要稳定推理时优先考虑 CUDA 或 SYCL 替代方案。

> 📌 **实用技巧**：对于生产部署，建议锁定至 `b11552` 或更高版本，并通过真实负载测试验证所有推测解码流程。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-11**

---

### **1. 今日亮点**  
Ollama 生态系统持续演进，模型兼容性、流式传输保真度及后端鲁棒性方面均有积极开发进展。今日重点问题集中在 **Qwen3 系列的稳定性**，尤其是工具调用功能（`#17778`, `#14601`, `#18916`）以及 MLX 特定崩溃问题（`#18856`, `#18885`），同时新提交的 PR 旨在改进决策类模型的提示词处理与 OpenAI 兼容的流式传输（`#18917`, `#18914`）。`ollama run` 在第二次调用时行为出现严重回归（`#18796`），凸显生命周期管理仍存在遗留问题。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布。*  
但 `0.40.x` 版本中正在进行以下更新：
- **API 一致性优化**：流式 `/v1/completions` 现在与 OpenAI 的数据格式保持一致（`#18914`）。
- **模型标签显示清理**：`ollama list` 和 `/api/tags` 中不再显示 `:latest` 标签（`#18915`）。
- **向后兼容更新**：`openai` API 现已支持空的工具调用参数（`#18913`）和自定义工具调用历史记录（`#18911`）。

> 🔗 [PR #18915](https://github.com/ollama/ollama/pull/18915) | [PR #18914](https://github.com/ollama/ollama/pull/18914)

---

### **3. 新模型与硬件支持**  
- **K2 Horizon 模型（k2-horizon 架构）**：请求对 MBZUAI IFM 提供的 0.9B–36B MoE 变体支持（`#18698`），官方已提供 GGUF 格式。
- **KailA（kail）架构**：提议增加对 KailA GGUF 模型的支持，当前因无法识别 `general.architecture = kail` 而失败（`#18922`）。
- **决策模型与 EmbeddingGemma 2**：`llama.cpp` 更新至 b11521，原生支持 `/v1/systemone` 并实现嵌入模型推理（`#18917`）。

> 🔗 [Issue #18698](https://github.com/ollama/ollama/issues/18698) | [Issue #18922](https://github.com/ollama/ollama/issues/18922) | [PR #18917](https://github.com/ollama/ollama/pull/18917)

---

### **4. 性能与优化**  
- **MLX 性能问题**：在 M5 Pro Mac 上，量化模型（如 mxfp8）在预填充阶段速度慢于 bf16，表明量化核函数可能存在优化缺失（`#18833`）。
- **流式传输效率**：已修复即使最终块为空也能正确刷新工具解析器的问题（`#18872`），并保留部分工具调用标签（`#18759`），提升了长周期代理工作流的正确性。
- **设备探测机制**：当 `llama-server --list-devices` 返回空输出时，自动回退至原生 GGML 探测，提升了边缘情况下的可靠性（`#18923`）。

> 🔗 [Issue #18833](https://github.com/ollama/ollama/issues/18833) | [PR #18872](https://github.com/ollama/ollama/pull/18872)

---

### **5. 稳定性与回归问题**  
**高严重性**：
- `qwen3.6:35b-mlx` 在 `0.40.x` 版本中于 MLX 运行器上崩溃，确认为从 `0.35.0` 回归的问题（`#18856`）——*目前尚无修复方案*。  
- `ollama run` 在首次启动后第二次调用会无限挂起（`#18796`）——疑似进程生命周期或状态损坏问题。
- `gemma4:12b` 报错 `Gemma4Assistant requires ctx_other to be set`（`#18898`）——模型配置不匹配所致。

**中等严重性**：
- `qwen3.5:4b` 在长时间对话后仅返回 `thinking` 内容，无响应或工具调用（`#18916`）。
- `rnj-1` 报错 `GGML_ASSERT(hparams.is_swa_any()) failed` —— 表明模型配置中缺少 SWA（稀疏权重激活）支持（`#18924`）。
- `clef-flash` 在 Windows 上运行失败且报错信息模糊（`#18858`），可能为路径或后端解析问题。

> 🔗 [Issue #18856](https://github.com/ollama/ollama/issues/18856) | [Issue #18796](https://github.com/ollama/ollama/issues/18796) | [Issue #18916](https://github.com/ollama/ollama/issues/18916)

---

### **6. 对应用开发者的影响**  
- **避免在生产环境使用 `qwen3.6:35b-mlx`**，直到 `#18856` 修复完成——该模型在 `0.40.x` 中不稳定。
- **谨慎验证工具调用流程**：Qwen3 工具解析存在已知缺陷（`#17778`, `#14601`），尤其在流式模式下。使用 `tools` 参数需格外小心。
- **显式处理上下文长度与 `ctx_other`**：Gemma4 等专用模型需明确设置（`#18898`）。
- **注意在使用 NTFS 挂载点的 Windows 系统上模型可见性不一致问题**（`#18921`）——建议使用绝对路径或避免挂载磁盘。
- **利用 `llama.cpp` b11521 提供的 `/v1/systemone` 支持**，构建实时决策代理（`#18917`）。
- **使用 `ollama.bat`/`ollama.sh` 包装脚本**（提案 `#18925`）来管理 `OLLAMA_FLASH_ATTENTION` 等环境变量，避免污染全局 shell 状态。

> 🔗 [功能提案 #18925](https://github.com/ollama/ollama/issues/18925) | [PR #18917](https://github.com/ollama/ollama/pull/18917)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 摘要 — 2026-10-11**

#### **1. 今日重点**
LiteLLM 生态系统持续扩展对高级 AI 工作流的支持，关键更新已回滚至稳定发布分支：决策 API 与防护机制（guardrail）系统。主要修复包括流式 OpenTelemetry 跟踪问题、响应缓存中的成本计算错误，以及长期存在的与 `openai>=3.0.0` 的兼容性问题——该问题曾阻碍与现代 SDK 的集成。

#### **2. 发布与破坏性变更**
过去 24 小时内未发布新版本。但多个 PR 正在为即将到来的补丁版本做准备：
- **v1.104.3** 与 **rc/1.105.0** 正在回滚决策 API 增强功能（#45905, #45906），包括成本追踪与模型模式支持。
- 一项重大依赖修复待定：移除 `openai<3.0.0` 的版本锁定（参见 #40317, #37907）正在积极讨论中；若未引入向后兼容层，未来版本中将出现破坏性变更。

> 🔗 [PR #45905](https://github.com/BerriAI/litellm/pull/45905) | [PR #45906](https://github.com/BerriAI/litellm/pull/45906)

#### **3. 新模型与硬件支持**
- 通过功能请求（#45807）新增 **Microsoft Decision 1** 模型，目前正进行原生集成开发。
- **MiniMax Messages API** 支持已直接合并至 `main`（#45896），支持 MiniMax 结构化聊天接口的直连路由。
- **Tencent Messages API** 支持也已落地（#45899），进一步拓展 LiteLLM 在中国大模型服务商中的覆盖范围。
- **DeepSeek V4 Flash Responses API** 支持仍在计划中，预计如期纳入（#35648）。

> 🔗 [PR #45896](https://github.com/BerriAI/litellm/pull/45896) | [PR #45899](https://github.com/BerriAI/litellm/pull/45899) | [Issue #45807](https://github.com/BerriAI/litellm/issues/45807)

#### **4. 性能与优化**
- **基于成本的路由** 正受到审查，因回归问题导致即使部署健康，同步方法也会完全失败（#45718）。这影响负载均衡可靠性，可能在高吞吐场景引发级联故障。
- **响应缓存效率** 正在审计中：当复用缓存提示时，`spend = 0`，但令牌计数仍反映原始调用——引发关于遥测聚合准确性的疑问（#39057）。
- **流式性能** 受到影响：当客户端提前停止读取时，OpenTelemetry 事件跨度不完整（#45736），除非完整消费流，否则会丢失可观测性数据。

> 🔗 [Issue #45718](https://github.com/BerriAI/litellm/issues/45718) | [Issue #39057](https://github.com/BerriAI/litellm/issues/39057) | [Issue #45736](https://github.com/BerriAI/litellm/issues/45736)

#### **5. 稳定性与回归问题**
| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| Router 的 `.acompletion()` 忽略 `CustomLogger` 回调 (#8842) | 高 | 开放 | ❌ |
| ElevenLabs 模型成本计算错误 (#18058) | 高 | 开放 | ❌ |
| `output_config` 在 Claude Code 上与 Xiaomi MiMo 模型不兼容 (#24549) | 高 | 开放 | ❌ |
| OpenTelemetry 记录空工具调用消息（`parts: []`）(#45796) | 中 | 开放 | ❌ |
| `/v1/messages` 忽略部署级 TPM 限制 (#45702) | 中 | 开放 | ❌ |
| 包含 `predict` 子串的透传 URL 错误路由至 Vertex AI (#45787) | 严重 | 开放 | ❌ |

这些问题共同影响计费准确性、日志完整性与路由正确性——尤其在多供应商代理环境中影响显著。

> 🔗 [Issue #8842](https://github.com/BerriAI/litellm/issues/8842) | [Issue #18058](https://github.com/BerriAI/litellm/issues/18058) | [Issue #24549](https://github.com/BerriAI/litellm/issues/24549) | [Issue #45796](https://github.com/BerriAI/litellm/issues/45796)

#### **6. 对应用开发者的启示**
- **避免在当前项目中使用 `openai>=3.0.0`**，直到依赖约束解除——否则因 `openai<3.0.0` 的锁定会导致安装失败。
- 若使用 **响应缓存**，请留意命中时花费日志显示为零成本，但令牌用量仍反映先前调用——需相应审计遥测管道。
- 对于 **实时或流式应用**，确保完整消费流以避免无声的 OpenTelemetry 事件跨度丢失（#45736）。
- 使用 **自定义认证配合 `max_budget`** 时，仅在启用数据库（`prisma_client`）的情况下有效——否则成功后预算预留永不结算（#45895）。
- **防护机制与决策模型** 现已在稳定分支中得到更稳健支持——建议用于增强代理系统的安全性。

> ✅ 实用提示：关注 `stable/1.104.x` 分支的后续补丁，其将解决决策、防护机制与成本追踪问题——这对生产级代理编排至关重要。

---  
*摘要生成时间：2026-10-11 | 来源：[BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth 简报 — 2026-10-11**

#### **1. 今日亮点**  
Unsloth 生态系统持续扩展对多 GPU 推理和高级模型服务的支持，关键 PR 改进了张量拆分行为，并实现了对 GPU 位置的更精细控制。关键稳定性修复解决了桌面空闲模式下的高 CPU 占用问题及长上下文聊天延迟，同时正在进行的工作进一步提升了对 AMD ROCm、GGUF 模型以及外部工具编排的兼容性。

#### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
未发布新版本或破坏性 API/配置变更。用户应继续使用 v0.1.903-beta（2026 年 10 月 7 日发布）桌面版，无需立即迁移。

#### **3. 新模型与硬件支持**  
- ✅ **AMD ROCm 支持**：针对双 R9700 GPU 在 ROCm 7.14+ 下微调失败问题的开发仍在进行中（`#10657`）。  
- ✅ **GGUF 模型增强**：`qwen4exp` 架构已在桌面端标记为不支持（`#10015`），但团队正通过 `#13240`（推荐中心筛选器）推进更广泛的 GGUF 集成。  
- ✅ **Intel GPU 固定指引**：文档请求 `#12836` 指出，由于 PR #9084 后缺少自动检测功能，需在 Studio 安装指南中明确添加 Intel GPU 固定说明。  
- 🚧 **Qwen3-TTS 微调支持**：功能请求 `#3951` 希望实现对 Qwen3-TTS 的完整微调支持，该模型在语音 AI 工作流中日益重要。

#### **4. 性能与优化**  
- ⚡ **张量拆分性能回归修复**：`b10715-mix-86bd2d3` 引入的性能回归导致双 RTX 5070 Ti 系统解码速度最慢达 **2.9 倍**（`#12468`），修复正在优先处理。  
- 📈 **长上下文延迟优化**：已在 Windows 10 上报告长对话延迟问题（`#12552`），长会话中的 UI 滚动性能下降也正在调查中（`#13255`）。  
- 🔍 **内存效率**：尽管在 4k 上下文理论容量下可容纳，但在 B200（183GB VRAM）上运行 GPT-OSS-120B 仍存在 OOM 问题（`#3411`），KV 缓存开销仍是瓶颈。  
- 💡 **融合 LoRA 优化**：PR `#13254` 在启用 DoRA 适配器时跳过融合 LoRA 内核——防止训练期间出现无声幅度损失。

#### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 链接 |
|------|----------|--------|------|
| RTX PRO 6000（96GB）上出现 `RuntimeError: illegal memory access` | 严重 | 已关闭 | [问题 #3921](https://github.com/unslothai/unsloth/issues/3921) |
| 所有核心在桌面空闲模式下 CPU 突增至约 95% | 高 | 已关闭 | [问题 #12942](https://github.com/unslothai/unsloth/issues/12942) |
| 长 GGUF 对话阻塞已排队请求，即使有空槽位 | 中等 | 开放 | [问题 #10671](https://github.com/unslothai/unsloth/issues/10671) |
| AMD Strix Halo 上模型权重加载至系统内存而非显存 | 高 | 已关闭 | [问题 #7449](https://github.com/unslothai/unsloth/issues/7449) |
| Qwen2.5VL 仅文本数据训练不稳定 | 中等 | 已关闭 | [问题 #3271](https://github.com/unslothai/unsloth/issues/3271) |

> ✅ **进行中的修复**：多个 PR 正在解决核心稳定性问题：  
> - `#13256`：在缓存的 Llama/Qwen3 注意力中尊重填充掩码 → 防止输出偏差。  
> - `#13255`：长对话滚动/性能修复。  
> - `#13249`：防止响应取消后引导后续项消失。

#### **6. 对应用开发者的影响**  
- 手动跨 GPU 分配层时，请显式使用 `--split-mode layer`（`#10770`），以避免行为歧义。  
- 若使用 DoRA，应避免融合 LoRA 内核；训练期间请验证适配器幅度完整性（`#13254`）。  
- 使用长上下文会话时需谨慎：重载后预填充冗余可能影响用户体验（`#9037`）。  
- 生产部署中，务必密切监控 VRAM 使用情况——即使使用大显卡（如 B200），KV 缓存也可能超出预期（`#3411`）。  
- 外部模型用户应预期工具设置可见性受限（`#13251`），直到界面暴露相关选项。

> 🔗 **值得关注的关键 PR**：  
> - [PR #13256](https://github.com/unslothai/unsloth/pull/13256)：修复左填充提示不一致问题  
> - [PR #13255](https://github.com/unslothai/unsloth/pull/13255)：解决长对话中界面卡顿问题  
> - [PR #13240](https://github.com/unslothai/unsloth/pull/13240)：通过“推荐”中心筛选器提升模型发现能力  

---  
*简报生成时间：2026-10-11 | 来源：[unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*