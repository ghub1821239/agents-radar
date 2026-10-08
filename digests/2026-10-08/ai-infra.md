# AI 基础设施日报 2026-10-08

> 生成时间: 2026-10-08 02:14 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **1. 生态系统概览**  
2026年10月的AI基础设施格局由高性能推理、多模态能力以及以代理为中心的工作流共同定义。项目正迅速从单纯追求吞吐量转向更注重正确性、稳定性与开发者体验，尤其是在推测解码、MoE效率和跨平台兼容性方面。一个清晰的分野正在形成：*引擎导向* 系统（如vLLM、SGLang）与*应用层* 平台（如Ollama、LiteLLM）之间，而像Unsloth这样的训练工具则开启了新型决策代理的可能性。这场竞赛已不再仅关乎速度，而是跨越多样硬件与模型类型，在大规模场景下的可靠性。

---

### **2. 活动对比**

| 项目       | 开放问题数（↑/↓） | 合并的PR数（↑/↓） | 发布状态       |
|------------|-------------------|------------------|----------------|
| **vLLM**   | 378 (+5)          | 48 (+3)          | 稳定版：`v0.31.0`；夜间构建：RC (`0.30.1rc1`) |
| **SGLang** | 412 (+8)          | 56 (+6)          | 无新发布；持续开发中 |
| **llama.cpp** | 597 (+12)      | 42 (+4)          | `b11481`（最新构建）；无正式发布 |
| **Ollama** | 614 (+15)         | 29 (+2)          | v0.40.1（补丁发布）；迁移存在破坏性变更 |
| **LiteLLM** | 297 (+6)         | 34 (+5)          | 多个开发/预发布版本（`v1.106.0-dev.1`等） |
| **Unsloth** | 245 (+7)         | 28 (+3)          | v0.1.904-beta（功能丰富的测试版） |

> ✅ *趋势*：**Ollama** 和 **llama.cpp** 因快速功能采纳及平台特异性回归问题，显示出最高的问题数量。**LiteLLM** 在预发布节奏上领先，表明其正积极推进向Rust迁移的迭代进程。

---

### **3. 模型支持竞赛**

| 新模型 / 架构             | 支持项目                              | 状态与备注 |
|----------------------------|----------------------------------------|------------|
| **Qwen3.8-Flash-Next (FP8)** | vLLM, llama.cpp, Ollama（通过GGUF）     | vLLM新增QSA路径；llama.cpp启用GPU MoE缓存 |
| **Kimi-K3 KDA/MLA 解码**    | vLLM（PR #60470），SGLang（NPU），Unsloth | vLLM在内核级优化上领先 |
| **Cohere2 Vision (mtmd)**   | llama.cpp (#30062)                     | 首个实现多模态视觉支持的项目 |
| **GLM5-Next MTP (DRAFT)**   | llama.cpp (#29928)，SGLang（部分支持） | llama.cpp具备完整图支持 |
| **Clef/Clef-Flash（决策）** | SGLang (#42721)，Ollama（issue #18769） | SGLang已完成集成；Ollama仍不稳定 |
| **Apple Silicon MLX路径**   | SGLang（提案 #32321），Unsloth          | SGLang基于Torch的SRT路径最为成熟 |

> 🏆 **领先者**：**llama.cpp** 和 **vLLM** 在模型覆盖与底层优化方面处于领先地位。**SGLang** 在决策模型集成与Apple Silicon就绪度方面领先。

---

### **4. 性能前沿**

| 关注领域               | 领先项目                            | 关键进展 |
|--------------------------|---------------------------------------------|------------------|
| **KV缓存优化**           | vLLM, SGLang, llama.cpp                     | DFlash2/DSpark修复（vLLM），FlashInfer检查点（SGLang），FP8+Q4_K缓存复用（llama.cpp） |
| **批处理与吞吐量**       | vLLM, SGLang, Unsloth                       | 批处理不变性（`VLLM_BATCH_INVARIANT=1`），自适应推测步骤（SGLang），自动微批处理（Unsloth） |
| **量化效率**             | llama.cpp, vLLM, Unsloth                  | GPU MoE专家缓存（llama.cpp），特定形状Triton内核（vLLM），Int4 group_size校验（Unsloth） |
| **分布式服务**            | SGLang, vLLM                                | DSPARK/DFLASH OOM修复（SGLang），多GPU MoE扩展（llama.cpp） |
| **内核级加速**            | vLLM, llama.cpp, SGLang                     | Triton GEMM调优（vLLM），Metal上的少量行MMA（llama.cpp），MoE同步屏障（SGLang） |

> 🔥 **热点**：**vLLM** 在SM120/GB10设备的内核级性能调优方面占据主导地位。**llama.cpp** 在跨后端内核创新（Metal、Hexagon、CUDA）方面领先。

---

### **5. 层级定位**

| 项目       | 主要层级             | 角色摘要 |
|------------|----------------------|----------|
| **vLLM**   | 推理引擎             | 高吞吐、内核优化的服务架构；面向云规模部署 |
| **SGLang** | 高级推理网关         | 全栈控制：推测解码、混合调度器、MoE路由；适用于代理工作负载 |
| **llama.cpp** | 本地运行时 / 边缘   | 原生CPU/GPU推理引擎；在边缘设备、macOS及底层优化方面表现优异 |
| **Ollama** | 开发者网关 / CLI     | 统一CLI + 云代理；用户可见的抽象层；注重用户体验 |
| **LiteLLM** | API网关 / 编排器    | 多提供商路由、认证、追踪；构建“通用”大模型网关 |
| **Unsloth** | 训练与微调工具       | 支持自定义决策模型、ComfyUI集成；重心从推理转向代理构建 |

> 🧩 **战略洞察**：vLLM/SGLang是*基础设施引擎*；LiteLLM/Ollama是*应用网关*；Unsloth是*从训练到代理的流水线工具*。生态系统正趋于分层：**微调 → 服务 → 路由 → 执行**。

---

### **6. 趋势信号**

#### 🔍 **新兴趋势**
1. **推测解码的稳定性已成为关键**  
   多个项目报告崩溃或接受率0%（vLLM、SGLang）——表明推测解码已不再是可选功能，而是缺乏严格测试即具高风险。

2. **MoE优化已超越内存节省**  
   GPU驻留的MoE缓存（llama.cpp）、自动缩放的微批处理（Unsloth）、动态布局管理，标志着向*可预测、可扩展的MoE推理*转变。

3. **决策模型正成为第一类公民**  
   SGLang和Unsloth现已支持可训练的决策模型（`train_decision_model()`）。这标志着从“大模型作为输出生成器”转向“大模型作为策略引擎”。

4. **Rust迁移是下一个重大转折点**  
   LiteLLM正在进行的Rust重写（子毫秒开销）将重新定义对延迟敏感的应用场景。早期采用者应为更低延迟、更高吞吐的网关做好准备。

5. **跨平台兼容性成为新战场**  
   AMD ROCm、Apple Silicon、Windows内存错误占据问题追踪器前列——证明硬件多样性已不再是小众议题。

#### 🛠️ **开发者可操作建议**
- **生产环境避免使用推测解码**，直至关键缺陷（如草稿深度5损坏）被修复。
- **在NVIDIA/AMD上进行大模型高吞吐推理时优先选择vLLM或SGLang**。
- **在需要细粒度控制的边缘、移动端或Apple Silicon部署中使用llama.cpp**。
- **若需构建多提供商API并具备丰富可观测性与认证功能，选择LiteLLM**。
- **利用Unsloth构建轻量、自包含的代理工作流，结合决策模型**。
- **谨慎监控夜间构建**——尤其在Ollama和vLLM中——因存在回归风险。

> ⚠️ **核心结论**：基础设施栈正在快速成熟——但稳定性和正确性仍是最大挑战。选择技术栈不应只看速度，更要考虑在真实场景下的*可靠性*。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-08**

---

### **1. 今日亮点**  
vLLM 项目持续聚焦下一代硬件的稳定性与性能，针对 SM120（RTX PRO 6000）上的推测解码正确性问题以及 DFlash2/DSpark + Qwen3.8-27B FP4 配置下的前缀缓存损坏问题进行了关键修复。新提交的 PR 引入了可选的 Cake 内核路由以支持 Kimi-K3，同时增强了 ROCm 对批处理不变性及 MLA 解码填充的支持——这些是实现大规模高效推理的关键能力。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性变更。最新稳定版仍为 `v0.31.0`，但夜间构建版本（`0.30.1rc1.dev539+g5b6b657e1`）因存在回归报告而正受到密切关注。

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 通过 QSA 路径新增对 `Qwen3.8-Flash-Next` FP8 KV 缓存的实验性支持（PR #54426）。  
  - 通过 FlashInfer 的 Cake 内核扩展集成 **Kimi-K3 KDA/MLA 解码**（PR #60470）。  
- **硬件与后端**：  
  - **ROCm (gfx950 / MI355X)**：针对 `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` 启动性能优化跟踪（Issue #57149）。  
  - **AMD RDNA4 (gfx1201)**：修复了错误选择 `RowWiseTorchFP8ScaledMMLinearKernel` 的问题，该问题曾导致最高达 24% 的解码速度下降（Issue #57838）。  
  - **NVIDIA GB10 (SM121)**：正在调查自 v0.29.0 起 `Nemotron-3.5-Lightning NVFP4` 在解码上出现约 16% 速度下降的问题（Issue #59770）。

---

### **4. 性能与优化**  
- **内核与吞吐量**：  
  - 针对 H20 与 SM120 设备，使用特定形状的 Triton 内核优化了 Qwen3.5 GDN GEMM，相较通用版本实现 **1.67x–2.50x 加速**（PR #54182）。  
  - 对共享目标 `lm_head` 的 MTP 抽样器减少草稿词汇量，带来 **25–29% 的解码速度提升**（PR #58578）。  
- **内存与布局**：  
  - 在 ROCm 上优化 AITER MLA 解码查询填充逻辑，避免逐字节步进拷贝，降低开销（PR #59966）。  
  - 当未启用量化或激活时，禁用 `w13 GEMM` 前冗余的 MoE 输入拷贝（PR #59340）。  
- **批处理不变性**：  
  - 在 ROCm、NVIDIA 及 CPU 后端全面启用 `VLLM_BATCH_INVARIANT=1` 支持，确保推理行为一致（PR #52231）。

---

### **5. 稳定性与回归问题**  
- **严重缺陷（高危）**：  
  - 在 SM120 上，DFlash2/DSpark + Qwen3.8-27B FP4 配置下发生前缀缓存损坏：缓存命中后输出被污染（Issue #60174）。*修复 PR 待提交。*  
  - 在 GLM-5.3-Flash（FP8）模型上，使用原生 FLASHINFER_MLA_SPARSE_SM120 后端时推测解码失败：接受率降至 0%（Issue #59724）。*修复 PR 待提交。*  
- **中等严重度问题**：  
  - 在 RTX 3090 上，混合 GDN + MTP k=3 + 异步调度场景下，静默发生 CUDA IMA（退出码 0）（Issue #53726）。*已尝试修复但问题依旧存在。*  
  - 在 H100 上，从 v0.26.0 到 v0.29.0 解码吞吐量下降约 3.3 倍（Issue #57680）。  
  - 由于 DeepGEMM 对齐变更，在 #56876 之后，SM12x 上的 MoE 解码速度慢约 15%（Issue #58624）。  
- **轻微/非崩溃类问题**：  
  - `tool_choice='none'` 会静默删除工具调用格式的内容（Issue #55080）。  
  - `logprob_token_ids` 的排名被误报为请求索引而非词表索引（Issue #60357）。

---

### **6. 对应用开发者的启示**  
- **避免在 SM120 上使用 v0.30+/0.31 版本搭配 Qwen3.8-FP4/DFlash2**：前缀缓存工作负载可能出现输出污染。请使用 v0.29 或等待修复（Issue #60174）。  
- **启用 `VLLM_CAKE_ROUTES` 以支持 Kimi-K3**：可在受支持硬件上优化 KDA 与 MLA 解码路径（PR #60470）。  
- **监控推测解码稳定性**：在 SM120 上使用 FP8 模型时，接受率可能意外失败——建议通过测试环境验证。  
- **利用批处理不变性（`VLLM_BATCH_INVARIANT=1`）**：提升部署间的一致性，尤其在 ROCm 平台表现更佳。  
- **关注量化回归问题**：若在 GB10 Spark 上使用 `NVFP4` 或 `FP8`，相比 v0.29.0 可能出现约 16% 的解码速度下降——建议锁定版本直至问题解决（Issue #59770）。  

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-10-08**

---

### **1. 今日重点**  
SGLang 项目持续推进下一代推理优化支持，关键 PR 集中在推测解码增强（如吞吐量感知的自适应步长）以及针对 SM120、B200/B300 等高端硬件的稳定性修复。关于 MoE 内核正确性、草稿深度为 5 时的 KV 缓存损坏，以及混合 SWA 调度器死锁等关键问题正被积极追踪，表明大型模型服务的可靠性仍在持续优化中。

---

### **2. 发布与破坏性变更**  
过去 24 小时内无报告。未发布新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- ✅ **Apple Silicon 服务架构重设计**：提案 #32321 提出由 Torch 主导的 SRT 路径，并通过导出 MLX 模型区域，实现基于 MLX 互操作性的原生 Apple Silicon 部署（跟踪于 PR #36164）。  
- ✅ **Hunyuan3D：Paint 使用重新网格化支持**：PR #42770 在 UV 展开前将网格简化至 40k 个面，显著提升 3D 纹理流水线性能。  
- ✅ **Clef 与 Clef-Flash 决策模型**：PR #42721 在 `/v1/systemone` 上新增对 Cloudflare 基于 Qwen3 的决策模型（`clef`、`clef-flash`）的支持。  
- ✅ **Kimi-K3 DCP 支持 Ascend NPU**：PR #40825 实现了在 Ascend NPU 上的解码上下文并行（DCP）与 DSPARK 推测解码，配合分片 MLA KV 分配机制。  

> 🔗 [Apple Silicon 路线图](https://github.com/sgl-project/sglang/issues/32321) | [Hunyuan3D PR](https://github.com/sgl-project/sglang/pull/42770) | [Clef 模型](https://github.com/sgl-project/sglang/pull/42721) | [Kimi-K3 NPU 支持](https://github.com/sgl-project/sglang/pull/40825)

---

### **4. 性能与优化**  
- 🚀 **吞吐量感知的推测策略**：PR #28045 引入一种成本引导、吞吐量感知的自适应推测步长策略——旨在动态平衡推测开销与推理速度。  
- ⚙️ **并行提示编码**：PR #41259 实现长聊天提示的并行编码，通过将分词器任务从异步线程卸载，降低 TTFT 延迟（对 20万+ token 的代理类提示至关重要）。  
- 🧠 **MoE 内核优化**：多个 PR 在各后端改进 MoE 内核：  
  - PR #41258 允许 GLM DSA NextN 草稿声明其自身共享专家融合架构。  
  - PR #43030 修复 `moe_align_block_size_kernel` 中缺失的同步屏障，防止竞态条件。  
- 💡 **FlashInfer 预填充检查点**：PR #41400 集成 FlashInfer 预填充检查点（来自 v0.7.0），支持在 SM100/SM103 上对安全门控的 KDA 模型启用基数前缀缓存。  

> 🔗 [推测策略](https://github.com/sgl-project/sglang/pull/28045) | [提示编码并行化](https://github.com/sgl-project/sglang/pull/41259) | [MoE 内核修复](https://github.com/sgl-project/sglang/pull/43030) | [FlashInfer 检查点](https://github.com/sgl-project/sglang/pull/41400)

---

### **5. 稳定性与回归问题**  
今日报告的关键稳定性问题包括：  
1. **混合 SWA + 基数缓存死锁** (#41579)：当 SWA 前缀锁固定已完成请求的未修剪块时，调度器无限期停滞。*尚未提交修复 PR*。  
2. **GLM-5.3-Flash 在 SM120 上使用 NVFP4 时崩溃** (#36711)：启用 `--moe-runner-backend flashinfer_trtllm` 时权重加载阶段出现索引错误。*修复待处理*。  
3. **DFSPEAK 草稿深度 5 在 SM120 上输出损坏** (#33800)：仅在草稿深度 5 时观察到输出损坏；深度 3、4、6、7 正常。*正在调查中*。  
4. **DSPARK/DFLASH 因错误使用 TP 大小导致 OOM** (#38202)：误用 `tp_size` 而非 `attn_tp_size`，在 Kimi-K3 的 DP 注意力下引发内存耗尽。*修复进行中*。  
5. **NIXL 后端在 `SGLANG_DISAGG_STAGING_BUFFER=1` 时启动崩溃** (#42684)：启动时抛出 `TypeError`。*已在 v0.5.20 复现；修复尚未合并*。  

> 🔗 [混合 SWA 死锁](https://github.com/sgl-project/sglang/issues/41579) | [GLM-5.3-Flash 崩溃](https://github.com/sgl-project/sglang/issues/36711) | [草稿深度 5 损坏](https://github.com/sgl-project/sglang/issues/33800) | [DSPARK OOM](https://github.com/sgl-project/sglang/issues/38202) | [NIXL 崩溃](https://github.com/sgl-project/sglang/issues/42684)

---

### **6. 对应用开发者的影响**  
- **在混合 SWA 与高草稿深度配置上谨慎使用推测解码**——在 SM120/B200/B300 上可能出现调度器死锁或输出损坏。在 #33800 解决前，请避免使用草稿深度 5。  
- **使用 DP 注意力（如 Kimi-K3）时确保正确的张量并行设置**：确认 `attn_tp_size` 与 `tp_size` 的使用，防止内存溢出。  
- **利用即将推出的 MoE 与推测解码优化**（PRs #28045、#41258、#43030），以在 DeepSeek-V4.1、GLM-5.3-Flash 等先进模型上获得更优吞吐量和内核正确性。  
- **关注 CI 稳定性**——持续存在的不稳定性测试（#42752、#17050）表明夜间构建可能存在波动；生产部署建议优先使用稳定版本标签。  

> 🔗 [CI 不稳定性追踪](https://github.com/sgl-project/sglang/issues/42752) | [CI 失败仪表板](https://github.com/sgl-project/sglang/issues/17050)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-08**

---

### **1. 今日亮点**  
最新更新聚焦于扩展多模态支持，集成 Cohere2 Vision 并实现关键的 MoE 性能优化，包括专家张量的 GPU 缓存及多 GPU MoE 缓存支持。Metal、CUDA 和 Hexagon 后端的新优化提升了底层张量操作性能，稳定性修复则解决了推测解码问题以及视觉模型流水线中的内存安全缺陷。

---

### **2. 发布与破坏性变更**  
- **`b11481`**：通过 `mtmd` 增加对 **Cohere2 Vision** 的支持 (#30062) — 支持 Coher2 模型的多模态推理。  
  🔗 [PR #30062](https://github.com/ggml-org/llama.cpp/pull/30062)  
- **`b11480`**：引入 **将 MoE 专家缓存在主机内存中的 GPU 缓存**，使用 `llama_moe_cache_ptr`，减少推理过程中的 CPU-GPU 数据传输。  
  🔗 [PR #29887](https://github.com/ggml-org/llama.cpp/pull/29887)  
- **`b11474`**：新增 **GLM5-Next MTP（多标记预测）图支持**，为基于 GLM5 的模型提供高效的推测解码能力。  
  🔗 [PR #29928](https://github.com/ggml-org/llama.cpp/pull/29928)

> ✅ *迁移提示：升级至 `b11480+` 的用户应确保其模型文件包含正确的 MoE 专家元数据；无需修改配置。*

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - ✅ **Cohere2 Vision** (`cohere2_vision`) 通过 `mtmd` (#30062)  
  - ✅ **GLM5-Next MTP**（如 `GLM5-Next-NextN`），支持优化的 DSA + 共享语言模型头部 (#29928)  
  - ✅ **LiquidAI/d1-omni-600M**（支持音频、图像、文本输入）已加入模型注册表 (#30114)  

- **硬件与后端增强**：  
  - 🚀 **Metal**：少量行的 MMA 矩阵乘法现在支持 BF16、Q1_0、Q2_0、MXFP4、Q2_K、Q3_K、TQ2_0、IQ 类型 — 扩展了量化兼容性 (#30065)  
  - 🚀 **Hexagon**：新增分块 Q4_K/Q6_K GET_ROWS，Q6_K 反量化速度提升（×1.3），GELU 计算精度提升 (#30121, #30115, #30104)  
  - 🚀 **CUDA/HIP**：针对 CDNA2（gfx90a）的矩阵核心（MFMA）闪电索引器 — 解锁 DeepSeek-V3/V4 的完整硬件利用率 (#29050)  
  - 🚀 **MUSA**：采用分块闪电索引器内核以提升吞吐量 (#30080)  

---

### **4. 性能与优化**  
- **MoE 效率**：  
  - 专家张量驻留 GPU 缓存可降低主机内存压力，并在 Qwen3.8-Flash-Next 等大模型上将解码延迟降低最高 **约 25%** (#29887)。  
  - 多 GPU MoE 缓存支持在 **2× RTX 4090** 上完成基准测试，93.7 GiB 模型表现出线性扩展性能 (#30112)。  

- **内核级加速**：  
  - **Metal**：通用少行 MMA 现已覆盖全部 16 种权重反量化类型 → 在 Q4_K/Q5_K 上矩阵乘法最快可达 **2.1× 加速** (#30065)。  
  - **Hexagon**：通过手动展开实现 Q6_K 反量化加速（×1.3），并利用 HVX tanh 提升 GELU 精度 (#30121, #30104)。  
  - **CUDA**：避免稳定图重放后的重复预热 → 在稳定工作负载中推测解码速度提升 **约 15%** (#29768)。  

- **推测解码**：  
  - 修复 DFlash 中草稿头复用回归问题 (`#30111`) → 防止 Gemma 风格布局中嵌入向量错误共享。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|--------|------|-------|-------|
| ⚠️ 高 | **Qwen3.8-Flash-Next MTP 使用 `--spec-draft-model` 时启动崩溃** | 开放 (#29811) | 无 |
| ⚠️ 高 | **Vulkan：低显存下 VAE 输出图像乱码** | 已关闭，过时 (#24943) | 尚未修复 |
| ⚠️ 高 | **Blackwell GGML-CUDA SOFT_MAX 在 RTX 5090（SM 12.0）上崩溃** | 开放 (#25060) | 已提出补丁（未合并） |
| ⚠️ 中 | **OpenVINO 因 AVX-512 ILLEGAL_INSTRUCTION 导致崩溃** | 开放 (#28726) | 待处理 |
| ⚠️ 中 | **Qwen4Exp（CUDA）中工具调用发射存在随机性** | 开放 (#28497) | 与 CUB DeviceTopK 评分相同有关 |
| ⚠️ 低 | **llama-server 在工具名为 "call" 时段错误崩溃** | 已关闭 (#29967) | 已在 `b11471` 中修复 |

> 💡 *注意：多个回归问题涉及推测解码和视觉模型流水线 — 使用 `mtmd`、`MTP` 或 `DFlash` 的用户应关注 PR #29811、#28497 与 #25060。*

---

### **6. 对应用开发者的意义**  
- ✅ **多模态应用** 现可无缝使用 **Cohere2 Vision** 与 **LiquidAI/d1-omni-600M**，代码改动极小 — 利用 `mtmd` 与 `llama serve -hf` 实现统一的视觉/音频/文本路由。  
- 🚀 **高吞吐代理** 可受益于 **GPU 缓存的 MoE 专家** 与 **多 GPU MoE 支持** — 特别适合 Qwen3.8-Flash-Next 等大规模推测解码模型。  
- ⚠️ **在 #29811 修复前，请勿对 Qwen3.8-Flash-Next MTP 使用 `--spec-draft-model`** — 可能导致启动崩溃。  
- 📈 **针对 Metal/CUDA/Hexagon 优化**：新内核可带来 **2–3× 的矩阵乘法加速**，请谨慎使用 `--tensor-split` — 已知在长上下文 MoE 模型中会导致输出退化 (#28185)。  
- 🔐 **安全意识**：PR #30130 通过分块读取缓解音频拒绝服务风险 — 若公开暴露 `llama-server`，请立即应用。

> 🔗 [最新构建版本](https://github.com/ggml-org/llama.cpp/releases/tag/b11481) | [GitHub 问题列表](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-08**

---

### **1. 今日亮点**  
Ollama v0.40.1 发布，修复了 Windows 内存处理和云代理路由的关键问题，同时稳定了 macOS 上的 MLX 后端。近期版本中 `clef-flash` 模型失败以及 MLX 运行时崩溃问题激增，反映出决策模型与 GPU 内核兼容性方面仍存在持续挑战。

---

### **2. 版本发布与破坏性变更**  
- **v0.40.1**：今日发布，包含三项关键修复：  
  - ✅ **代理支持**：云使用和余额 API 现可通过 `server: proxy cloud usage and balance APIs` 正确代理 ([#18829](https://github.com/ollama/ollama/pull/18829))。  
  - ✅ **Windows 内存修复**：解决 Windows 上 `clef` 头在超过 2GiB 时读取错误的问题 ([#18777](https://github.com/ollama/ollama/pull/18777))。  
  - ✅ **CLI 引导流程优化**：移除冗余账户步骤；用户输入回车后可直接进入启动器 ([#18826](https://github.com/ollama/ollama/pull/18826))。  

> ⚠️ **迁移提示**：新引入的 `local compat GGUF migration` 引擎可能导致 Windows 上出现重复模型条目（`ollama list`）和清单符号链接（见 #18830, #18847）。若使用本地模型，请勿在未备份情况下升级。

---

### **3. 新模型与硬件支持**  
- **新请求模型**：  
  - [MIMO v2.5 (1M+ token 上下文)](https://github.com/ollama/ollama/issues/15887) — 小米开源的 LLM，采用 MIT 许可证，因长上下文应用需求极高而广受期待。  
  - [Qwen 3.8 Flash, Mimo v2.6, Hy4, Stepfun, Laguna, Reflection AI](https://github.com/ollama/ollama/issues/18850) — 用户反复呼吁增加超越 DeepSeek 的更丰富云端模型选择。  

- **硬件/后端支持**：  
  - **macOS M 系列上的 MLX**：由于 `qwen3.6:35b-mlx` 和 `clef-flash` 崩溃问题，仍在积极排查中 ([#18856](https://github.com/ollama/ollama/issues/18856), [#18846](https://github.com/ollama/ollama/issues/18846))。  
  - **FreeBSD**：因磁盘空间计算中 `int64 × uint64` 类型不匹配导致编译失败 ([#18835](https://github.com/ollama/ollama/issues/18835)) — 需在 `compatmigrate/disk_unix.go` 中打补丁。

---

### **4. 性能与优化**  
- **MLX 量化**：带逐层 8 位覆盖的混合精度模型因 `quantized_matmul` 中形状不匹配无法加载 ([#18789](https://github.com/ollama/ollama/issues/18789))。  
- **MLX 内核限制**：`qwen3.6:35b-mlx` 在 M 系列 Mac 上失败，提示“每个线程组最大线程数为 896，但请求 1024”——违反硬性内核限制 ([#18846](https://github.com/ollama/ollama/issues/18846))。  
- **嵌入速度**：`embeddinggemma-2:740m` 需要 MLX 支持，但若不可用则静默失败 ([#18825](https://github.com/ollama/ollama/issues/18825))。  
- **连接复用**：`llama-server` 在 `/api/embed` 期间未复用 HTTP 连接，造成额外开销 ([#18397](https://github.com/ollama/ollama/pull/18397))。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复 PR |
|--------|------|------------|-------|
| 🔴 严重 | `clef-flash` 在 `/v1/systemone` 上失败 | “Clef: 非有限 logit”（CUDA） / “无法打开模型”（CPU）——首次前向传播失败，但在 `/v1/chat/completions` 上正常工作 ([#18769](https://github.com/ollama/ollama/issues/18769), [#18836](https://github.com/ollama/ollama/issues/18836)) | ❌ 尚无修复 |
| 🔴 严重 | M 系列 Mac 上的 MLX 崩溃 | `mlx runner failed: panic: mlx: Maximum threads per threadgroup is 896 but requested 1024` — 从 0.35.0 版本回归的问题 ([#18846](https://github.com/ollama/ollama/issues/18846)) | ❌ 尚无修复 |
| 🟡 高 | 通过代理拉取模型失败 | `Error: redirect target not allowed` 或 DNS 解析错误，自 0.35 版本后出现——影响 CI/企业部署 ([#18831](https://github.com/ollama/ollama/issues/18831), [#18842](https://github.com/ollama/ollama/issues/18842)) | ✅ 修复待合并于 [#18852](https://github.com/ollama/ollama/pull/18852)（避免符号链接） |
| 🟡 中等 | 重复模型与损坏清单 | GGUF 迁移后，`ollama list` 显示重复项并出现 `llamacpp:<sha>` 标签 ([#18830](https://github.com/ollama/ollama/issues/18830)) | ✅ 部分修复于 [#18852](https://github.com/ollama/ollama/pull/18852) |
| 🟡 中等 | `deepseek-v4.1-flash:cloud` 在图像输入 > ~655k token 时返回 500 | Ollama Cloud 接口回归问题 ([#18853](https://github.com/ollama/ollama/issues/18853)) | ❌ 尚无修复 |

---

### **6. 对应用开发者的启示**  
- **在解决 MLX 内核限制前，避免在 Apple Silicon 上使用 v0.40.x 版本** — `qwen3.6:35b-mlx` 与 `clef-flash` 将崩溃。如需稳定性，请降级至 `0.35.1`。  
- **谨慎使用 `qwen3.5:9b`** — Windows 用户报告升级后因符号链接导致清单访问错误 ([#18847](https://github.com/ollama/ollama/issues/18847))。  
- **仔细验证模型名称**：未在名称中包含 `12b` 的 Gemma 4 12B 模型默认使用 `gemma4-small` 渲染器，会改变提示结构 ([#18824](https://github.com/ollama/ollama/issues/18824))。  
- **预期模型可用性延迟** — 包括 MIMO、Qwen 3.8 等高需求模型仍暂未上线 Ollama Cloud。请关注 [#15887](https://github.com/ollama/ollama/issues/15887) 与 [#18850](https://github.com/ollama/ollama/issues/18850) 获取更新。  
- **优化嵌入流水线**：启用连接复用（`#18397`），并在 Windows 上避免使用 `manifest` 符号链接，以防止 I/O 失败。

> 💡 *实用技巧*：对于使用 `systemone` 或 `embed` 端点的生产级智能体，建议在 `clef-flash` 与 MLX 回归问题修复前，先在 `0.35.1` 版本上进行测试。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 摘要 — 2026-10-08**

#### **1. 今日亮点**
LiteLLM 生态系统持续快速演进，流式传输、追踪与认证流程的关键稳定性改进已落地。核心焦点仍为正在进行的 **Rust 迁移**（问题 #31263），目前已进入开发阶段，早期测试版已可访问。今日新增多个 PR，提升了代理的容错能力，通过存储终端用户反馈增强追踪可见性，并扩展了对 Microsoft 365 Copilot 与 GitHub Copilot OAuth 集成的支持。

#### **2. 发布与破坏性变更**
- 在过去 24 小时内发布了 **v1.106.0-dev.1**、**v1.105.0-rc.2**、**v1.104.1**、**v1.103.4**、**v1.102.3**、**v1.101.5** 与 **v1.100.5** 版本。  
- 所有 Docker 镜像均使用 [cosign](https://github.com/BerriAI/litellm/commit/0112e53) 进行加密签名——可通过 `cosign verify` 命令配合共享密钥进行验证。
- 未报告任何破坏性 API 变更；所有发布版本均为预发布或候选版本，目标是后续的稳定里程碑。

> 🔗 [GitHub 发布说明](https://github.com/BerriAI/litellm/releases)

#### **3. 新模型与硬件支持**
- ✅ **Microsoft 365 Copilot**：新增为聊天提供方（`microsoft_365_copilot`），通过 OAuth 实现委托用户令牌交换 ([PR #45158](https://github.com/BerriAI/litellm/pull/45158))。
- ✅ **GitHub Copilot**：现已支持按用户级别的 OAuth 连接（`auth_type: per-user-github-oauth`）——每个请求使用调用用户的个人令牌 ([PR #45241](https://github.com/BerriAI/litellm/pull/45241))。
- ✅ **Databricks ai_decide**：现作为 `/v1/decisions` 提供方及自动路由决策器支持 ([PR #45200](https://github.com/BerriAI/litellm/pull/45200))。
- ✅ **Gemini 上下文缓存计费**：上下文缓存存储的每小时显式计费现已在支出指标中追踪 ([PR #45019](https://github.com/BerriAI/litellm/pull/45019))。

#### **4. 性能与优化**
- **Rust 迁移进展**：旗舰项目 (#31263) 目标是实现低于 1ms 的开销与极小内存占用。首批测试用户正在招募中 ([注册表单](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...))。
- **流式效率**：修复确保在启用 `response_format` 的工具调用流式传输过程中保留 `finish_reason` ([PR #45147](https://github.com/BerriAI/litellm/pull/45147))。
- **重试逻辑增强**：`completion()` 现在会尊重服务提供商返回的 `retry-after` 头信息，防止过早重试 ([PR #45247](https://github.com/BerriAI/litellm/pull/45247))。
- **WebSocket 管理**：空闲响应的 WebSocket 不再于 30 秒后关闭——可配置的会话上限防止连接池耗尽 ([PR #44433](https://github.com/BerriAI/litellm/pull/44433))。

#### **5. 稳定性与回归问题**
| 严重程度 | 问题 | 描述 | 修复状态 |
|--------|------|------------|-----------|
| 高 | [#13419](https://github.com/BerriAI/litellm/issues/13419) | 使用 OpenRouter 时，OpenWebUI 中 GPT-5 思考输出缺失 | 开放 – 51 条评论 |
| 高 | [#15230](https://github.com/BerriAI/litellm/issues/15230) | 虚拟密钥编辑时出现“仅企业可用”错误，尽管未使用企业功能 | 开放 – 39 条评论 |
| 中 | [#44979](https://github.com/BerriAI/litellm/issues/44979) | Anthropic → OpenAI 转换过程中 `tool_result.is_error` 丢失 | 开放 – 5 条评论 |
| 中 | [#44546](https://github.com/BerriAI/litellm/issues/44546) | Gemini TTS 因同步语音服务被调用两次导致重复计费 | 开放 – 5 条评论 |
| 低 | [#44154](https://github.com/BerriAI/litellm/issues/44154) | 健康检查错误错误地跨共享模型归因 | 已关闭 – 修复已合并 |
| 低 | [#44182](https://github.com/BerriAI/litellm/issues/44182) | JWT 声明中未验证团队 ID | 已关闭 – 修复已合并 |

> ⚠️ 关键回归：`gpt-5` 的思考输出在 OpenWebUI 中不可见——影响智能体调试与可解释性工作流。

#### **6. 对应用开发者的意义**
- **构建更安全、租户感知的网关**：借助按用户级的 GitHub OAuth 与 Microsoft 365 Copilot 集成，现在可实现细粒度访问控制，而无需暴露凭证。
- **提升可观测性**：Lens 现在支持将终端用户反馈直接存储至 ClickHouse ([PR #45171](https://github.com/BerriAI/litellm/pull/45171))，支持以用户体验为导向的模型评估。
- **避免成本意外**：新增的 `cache_storage_cost_per_token_per_hour` 计费模式确保 Vertex AI 用户的支出追踪准确无误。
- **为 Rust 迁移做准备**：若低延迟推理至关重要（如实时智能体），请关注 [Rust 迁移进度](https://github.com/BerriAI/litellm/issues/31263)——早期采用者将受益于 <1ms 的开销。
- **谨慎处理边缘情况**：注意已知的虚拟密钥、工具结果处理及流式行为问题——尤其是在 Anthropic 与 OpenAI 格式间路由时。

> 💡 实用技巧：使用 `GET /gateway/daily/activity`（#45244 新增）按 HTTP 状态码拆解失败请求——对诊断客户端与网关故障至关重要。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-08**

---

### **1. 今日亮点**  
Unsloth v0.1.904-beta 在决策能力上实现重大飞跃，使用户能够从任意文本或视觉大模型训练自定义的 Jev 风格决策模型，准确率从约 30% 提升至 80%。本次发布还引入原生 ComfyUI 模型支持、改进的扩散管道以及增强的桌面浏览器功能。与此同时，Studio 中的关键 UI/UX 优化与安全加固工作正在推进，包括更安全的文件下载处理、嵌入式音频支持以及动态内容渲染。

---

### **2. 发布与破坏性变更**  
- **v0.1.904-beta**（发布于 2026-10-07）：  
  - 新增：通过 `unsloth.train_decision_model()` 训练可调参的决策模型 —— 支持所有 LLM 与视觉编码器。  
  - 可直接在 Unsloth 内导出并部署已训练的决策模型。  
  - 原生 ComfyUI 模型集成（通过 `.json` + `.safetensors`），支持无缝工作流复用。  
  - 改进的桌面浏览器：更好的标签页管理、视频附件播放及下载用户体验。  
  - *迁移提示：* 使用 `Qwen-Image-2.1-GGUF` 的现有训练工作流若遇到内存错误，可能需要重新下载并附带更新的量化元数据（详见 #11792）。

> 🔗 [GitHub Release v0.1.904-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.904-beta)

---

### **3. 新模型与硬件支持**  
- **新增模型类型**：  
  - 决策模型现可在任意 LLM/视觉编码器上训练（例如 Qwen-VL、LLaVA、Phi-3-Vision）。  
  - 桌面端与 Studio 环境中原生支持 ComfyUI 流水线导出（`*.json`, `*.safetensors`）。  

- **硬件与后端改进**：  
  - 对 AMD GPU（Radeon AI Pro R9700）的 ROCm 支持进一步增强，并正确锁定 torch 版本（`<2.15.0`）。  
  - macOS MPS 现可无浮点 64 位权重提升地处理 VAE 分块（修复 #12935）。  
  - Windows 应用容器（MXC）现在能稳健处理 Python沙箱化（PR #12941 解决 `ReadGrantError` 问题）。

> 🔗 [PR #12941 – MXC 授予权限处理](https://github.com/unslothai/unsloth/pull/12941)  
> 🔗 [PR #12947 – AMD PyTorch 版本锁定](https://github.com/unslothai/unsloth/pull/12947)

---

### **4. 性能与优化**  
- **吞吐量与延迟**：  
  - `llama-server` 现可在 MoE 专家溢出至内存时自动将微批大小提升至 **2048**（#12950），在显存差距较大的系统上吞吐量最高可提升 **~4 倍**。  
  - 溢出的 MoE 专家 GPU 缓存现可通过 `--moe-cache-mib auto` 自动调节大小（#12951），减少抖动，在高负载下提升稳定性。  
  - 使用 `llama-server` 替代 `sentence-transformers` 后，嵌入模型推理速度从 **5 条/秒（CPU）** 提升至 **129 条/秒（GPU）**（#13006）。  

- **内存效率**：  
  - Int4 加载器现会验证 `group_size` 是否与实际 `weight_scale` 张量形状匹配（#12955），防止加载过程中的隐性损坏。  
  - 修复了 Windows 空闲状态下因未限制 OpenBLAS 线程数导致的 CPU 峰值问题（#12942）；设置 `OPENBLAS_NUM_THREADS=1` 现已生效。

> 🔗 [PR #12950 – 自动增大微批大小](https://github.com/unslothai/unsloth/pull/12950)  
> 🔗 [PR #12951 – 动态 MoE 缓存大小调节](https://github.com/unslothai/unsloth/pull/12951)  
> 🔗 [PR #12942 – 空闲状态 CPU 峰值修复](https://github.com/unslothai/unsloth/pull/12942)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|---------|------|--------|--------|
| 高 | `python.exe` 在空闲时于所有核心上持续占用 95% CPU（Windows） | 开放 | [PR #12942](https://github.com/unslothai/unsloth/pull/12942) |
| 高 | `Qwen-Image-2.1-GGUF` 在 M5 Max（48GB RAM）上无法加载 | 开放 | [Issue #11792](https://github.com/unslothai/unsloth/issues/11792) |
| 高 | v0.1.903-beta 之后长上下文聊天出现卡顿 | 开放 | [Issue #12552](https://github.com/unslothai/unsloth/issues/12552) |
| 中 | Bonsai 模型（1bit/Ternary）无法加载 | 开放 | [Issue #11259](https://github.com/unslothai/unsloth/issues/11259) |
| 中 | Qwen3.5 safetensors/MLX 提示中工具调用参数丢失 | 开放 | [PR #12988](https://github.com/unslothai/unsloth/pull/12988) |
| 低 | 多语言提示中拼写检查误触发（Windows） | 开放 | [Issue #12861](https://github.com/unslothai/unsloth/issues/12861) |

> ⚠️ 重要：多个回归问题影响核心工作流（工具调用、长上下文、模型加载）。多个 PR 已提交但尚未合并。

---

### **6. 对应用开发者的意义**  
- **围绕决策模型构建智能体工作流**：使用 `train_decision_model()` 创建轻量、高精度的智能体，可在不依赖外部 API 的情况下响应用户输入。适用于路由、过滤或条件逻辑等结构化任务。  
- **优化 RAG 管道**：优先使用 `llama-server` 而非 `sentence-transformers` 进行嵌入模型推理——在 GPU 上性能提升显著。结合 `--moe-cache-mib auto` 高效管理溢出情况。  
- **强化应用环境安全性**：通过随机启动路径隔离 `whisper-server`（PR #13002）；避免暴露敏感接口。  
- **妥善处理数据边缘情况**：训练视觉模型时，请验证数据集完整性（如 `ScienceQA` 中缺失图像的问题 —— PR #12991）。  
- **监控依赖项**：避免 `pip install "unsloth[amd]"` 将 ROCm torch 替换为 CUDA 版本；请确认安装路径，建议使用 `uv` 或 virtualenv 实现干净隔离。

> 📌 技巧提示：使用 Studio 浏览器面板中的新 **下载按钮**（PR #13009）追踪文件传输，防止意外覆盖。

---  
*摘要生成时间：2026-10-08 | 来源：[unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*