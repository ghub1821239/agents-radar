# AI 基础设施日报 2026-09-28

> 生成时间: 2026-09-28 01:09 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-09-28**

---

### **1. 生态概览**  
AI 推理与服务生态正进入 *高度专业化与硬件融合* 阶段，各项目日益聚焦下一代架构（GB10、SM120/121、Apple Silicon MLX），同时深化对混合模型（Mamba/GDN、视觉-语言）、高级量化技术（NVFP4、IQ2_NL/IQ3_NL、block-FP8）以及以智能体为中心的工作流支持。稳定性仍是关键瓶颈——尤其在 RTX 5090 与 DGX Spark 等前沿硬件上表现突出，凸显创新速度与生产就绪性之间的张力。与此同时，Rust 集成与原生性能模块正成为网关与运行时层的关键差异化因素。

---

### **2. 活动对比**  

| 项目         | 开放问题（高/中） | 最近 24 小时合并的 PR | 版本发布 / 破坏性变更 |
|----------------|------------------------|------------------------|------------------------------|
| **vLLM**       | 7 (3 高，4 中)   | 8                      | 无                         |
| **SGLang**     | 5 (全部高)           | 5                      | 无                         |
| **llama.cpp**  | 5 (2 严重)         | 6                      | 4 个新构建（b11221–b11223） |
| **Ollama**     | 6 (2 高，4 中)   | 3                      | 无                         |
| **LiteLLM**    | 3 (2 高，1 中)   | 5                      | 2 次成本地图更新           |
| **Unsloth**    | 4 (1 严重)         | 6                      | 1 次主要 wheel 发布        |

> ✅ *洞察：* **vLLM** 与 **Unsloth** 在技术深度与推进势头上领先，而 **Ollama** 与 **SGLang** 尽管功能扩展强劲，但面临严峻的稳定性挑战。

---

### **3. 模型支持竞赛**  

| 新模型 / 架构      | 支持项目                          | 状态与核心差异 |
|-------------------------------|---------------------------------------|------------------------------|
| **Qwen3.8-Flash-Next-NVFP4** | vLLM ✅, Unsloth ✅                   | 通过打包的 NVFP4 PLE 嵌入在 GB10 上实现全驻留运行 — **vLLM 在生产就绪性上领先** |
| **KimiViT (Kimi-K3)**         | vLLM 🚧, SGLang ⚠️                    | vLLM 的融合 QK RoPE 内核使 GB300 上解码速度提升 29 倍；SGLang 缺乏优化 |
| **GLM-5.3-Flash (视觉)**    | llama.cpp ✅, vLLM ✅                 | vLLM 修复了长序列解码退化问题；llama.cpp 添加实验性支持 |
| **DeepSeek-V4.1 (AMD gfx950)**| SGLang ✅                             | 首次实现超越 CUDA 的跨平台部署 — **SGLang 在硬件多样性上领先** |
| **SANA-Video 2.0 (T2V/TI2V)** | SGLang ✅                             | 原生扩散支持 — **唯一具备完整多模态视频生成路径的项目** |
| **Block-FP8 模型（如 Qwen3-FP8）** | Unsloth ✅, vLLM ✅, llama.cpp ✅ | Unsloth 支持 4 位 NF4 加载；vLLM 提供融合内核 — **在 FP8 使用体验上无可匹敌** |

> 🏆 **胜者**：**vLLM** 在模型级优化上领先，**SGLang** 在跨架构覆盖上领先，**Unsloth** 在量化灵活性上领先。

---

### **4. 性能前沿**  

| 优化重点          | 领先项目                     | 关键进展 |
|------------------------------|--------------------------------------|--------------|
| **KV Cache 效率**      | vLLM, SGLang, Unsloth                | HiSparse 分层可观测性（vLLM），TurboQuant（Unsloth），HiCache 预取调优（SGLang） |
| **批处理与吞吐量**    | vLLM, llama.cpp                      | 批处理不变性修复（vLLM），RANK 池化批拆分（llama.cpp），融合 MoE 内核（SGLang） |
| **内核融合与底层调优** | vLLM, Unsloth, llama.cpp         | GDN/融合 Conv1D/RMSNorm（vLLM），FP8 立即执行（Unsloth），FlashAttention tile 调优（llama.cpp） |
| **分布式与解耦服务** | vLLM, SGLang                  | HiSparse 分层卸载（vLLM），图捕获灵活性（SGLang） |
| **内存安全与 OOM 预防** | llama.cpp, Ollama, LiteLLM       | 静默 OOM 修复（llama.cpp），`max_budget=0` 问题（LiteLLM），VRAM 过度使用（Unsloth） |

> 🔍 **趋势**：前沿已从原始吞吐量转向 *在高并发与复杂负载下可预测的资源利用*。

---

### **5. 层级定位**  

| 项目         | 主要层级                        | 角色摘要 |
|----------------|--------------------------------------|--------------|
| **vLLM**       | **推理引擎**                 | 高吞吐、低延迟服务的核心引擎；针对现代 GPU 与大规模部署优化 |
| **SGLang**     | **推理网关 + 运行时**      | 用于推测解码、语法约束与多模态任务的统一接口；连接模型与智能体 |
| **llama.cpp**  | **本地运行时 / 嵌入式推理** | 跨平台，专注 CPU/Metal/Vulkan；适用于边缘、移动端及隐私敏感场景 |
| **Ollama**     | **开发者网关 / CLI 运行时**  | 开发者优先抽象层；简化本地模型管理，但在大规模下稳定性不足 |
| **LiteLLM**    | **多提供商网关**           | 成本感知路由、降级机制与预算追踪的聚合层，支持多提供商 |
| **Unsloth**    | **训练/微调 + 运行时**   | 全栈工具包，聚焦 LoRA 训练加速、工具调用可靠性与 Apple Silicon 效率 |

> 📊 **定位洞察**：vLLM 主导核心推理；LiteLLM 与 SGLang 定义“智能网关”的未来；Unsloth 与 llama.cpp 锚定本地/边缘部署。

---

### **6. 趋势信号**  

#### **新兴行业趋势（基于 2026-09-28 活动）：**
1. **硬件特异性优化已成为必然要求**  
   - 项目不再“一招通用”。成功取决于对 SM120/SM121、GB10、MI350X 与 Apple Silicon 的显式支持。  
   - *开发者行动建议*：尽早验证目标硬件上的模型表现——避免依赖通用基准。

2. **Rust 集成是下一阶段性能竞争焦点**  
   - LiteLLM 与 Unsloth 正向原生 Rust 模块迁移，以绕过 Python GIL 并降低延迟。  
   - *开发者行动建议*：准备迁移路径；预期基于 Rust 的推理与 Python 工具链将更紧密集成。

3. **智能体工作流正在推动稳定性需求升级**  
   - 工具调用挂起、解码器状态丢失、静默图像丢弃等问题反复出现——均影响智能体可靠性。  
   - *开发者行动建议*：永远不要假设结构化输出完整性；实施端到端验证与重试逻辑。

4. **成本问责已超越价格表范畴**  
   - LiteLLM 的 `metadata.completion_window` 计费修复，以及 Ollama 的预算限制漏洞，表明财务控制已成为核心工程需求。  
   - *开发者行动建议*：审计堆栈中的成本追踪机制——尤其是 WebSocket 与智能体 API 场景。

5. **模型级稳定性不再是可选项**  
   - GLM-5.3-Flash、Qwen4Exp 与 Cohere MoE 模型即使在高端硬件上也引发崩溃。  
   - *开发者行动建议*：使用 `--max-model-len`，监控内存使用，避免在修复前使用未经测试的模型变体。

---

### ✅ **面向应用开发者的最终建议**  
- **用于生产推理**：选择 **vLLM**，以获得最佳优化的 GPU 原生、可扩展服务。  
- **用于智能体系统**：优先考虑 **SGLang** 或 **LiteLLM**，以确保稳健的语法处理与多提供商降级能力。  
- **用于边缘/本地部署**：使用 **llama.cpp**（Vulkan/Metal）或 **Unsloth**（Apple Silicon）。  
- **避免不稳定的版本**（如 Ollama 0.34.4、Jetson 上的 llama.cpp b9016+），直到回归问题修复。  
- **始终验证模型行为**——若未明确测试，切勿信任 `vision` 功能或 `response_format`。  

> 🛠️ **专业提示**：部署时监控 `collect_env.py` 输出，并启用调试标志（`GGML_RPC_DEBUG=1`、`VLLM_BATCH_INVARIANT=1`）——许多问题具有环境相关性。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-28

---

### **1. 今日亮点**  
vLLM 项目持续深化对下一代硬件及先进推理模式的支持，近期在 **批处理不变性正确性**、**HiSparse 分层卸载可观测性** 和 **Rust 前端功能对齐** 方面取得显著进展。关键修复已落地于 **GLM-5.3-Flash 长推理稳定性**、**Qwen4Exp NVFP4 内存管理** 以及 **GDN/MTP 前缀缓存损坏** 问题，同时新提交的 PR 进一步增强了调试（看门狗）和性能（融合内核）能力。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。暂无新版本发布或 API/config 的破坏性调整。

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen3.8-Flash-Next-NVFP4** 现已通过 [PR #56273](https://github.com/vllm-project/vllm/pull/56273) 支持打包的 NVFP4 PLE 嵌入，可在单台 DGX Spark (GB10) 上实现完全驻留运行，无需磁盘卸载。  
- 🚧 **KimiViT (Kimi-K3)** 已集成融合的 QK RoPE 内核 ([PR #58651](https://github.com/vllm-project/vllm/pull/58651))，在 GB300 上将解码延迟降低最高达 **29×**（256 个 token）。  
- ⚙️ **Vulkan 支持** 仍为高优先级功能请求 ([Issue #21182](https://github.com/vllm-project/vllm/issues/21182))——尚未实现，但正在积极讨论中。  
- 🔧 **ROCm 支持** 正在推进：Qwen3-Next/Qwen3.5 已启用融合的 QK-norm+RoPE+gate 内核 ([PR #51406](https://github.com/vllm-project/vllm/pull/51406))。

---

### **4. 性能与优化**  
- 📈 **HiSparse 分层**：新增可观测性功能 ([PR #58949](https://github.com/vllm-project/vllm/pull/58949)) 可记录稳态最大并发数，并暴露主机层级利用率指标——对大规模卸载系统调优至关重要。  
- ⚡ **融合内核**：  
  - GDN 非推测解码现已通过融合 CUDA 内核路由 ([PR #53463](https://github.com/vllm-project/vllm/pull/53463))，消除 Conv1D、递归内核和 RMSNorm 的独立启动。  
  - Qwen3.5 GDN `in_proj` 已融合进 6 路合并的 ColumnParallelLinear ([PR #41457](https://github.com/vllm-project/vllm/pull/41457))，减少算子数量并提升融合机会。  
- 🎯 **MiniMax-M3-NVFP4 在 8x B200 上**：修复后基准测试显示 **EAGLE3 解码速度提升 2.1–2.3×** ([Issue #51494](https://github.com/vllm-project/vllm/issues/51494))。  
- 🛠️ **动态 PDL 启用**：未公开标志位（`TRTLLM_ENABLE_PDL`, `TORCHINDUCTOR_ENABLE_PDL`）现进入 RFC 讨论阶段 ([Issue #40543](https://github.com/vllm-project/vllm/issues/40543))——有望在 Hopper/Blackwell 架构上带来低延迟提升。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|------|-------------|------------|
| 🔴 高 | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash 长推理在累积推理后出现退化 | 进行中 |
| 🔴 高 | [#56457](https://github.com/vllm-project/vllm/issues/56457) | Qwen4Exp QSA 索引器每块增长 logits 缓冲区 → 在统一内存的 GB10 (SM121) 上预填充时触发 OOM/卡死 | 进行中 |
| 🔴 高 | [#56824](https://github.com/vllm-project/vllm/issues/56824) | DGX Spark (GB10, 统一内存) 上引擎启动崩溃，主机内存约 22 GiB 可用 | 进行中 |
| 🟡 中等 | [#56370](https://github.com/vllm-project/vllm/issues/56370) | 启用序列并行 + 异步 TP 时，批处理不变性被破坏（`VLLM_BATCH_INVARIANT=1`） | 已关闭，修复待合并 |
| 🟡 中等 | [#53912](https://github.com/vllm-project/vllm/issues/53912) | 前缀缓存 + MTP 导致混合 Mamba/GDN 模型输出损坏 | 开放；自 v0.28.0 版本起的回归 |
| 🟡 中等 | [#48312](https://github.com/vllm-project/vllm/issues/48312) | RL 训练场景下的权重重载正确性问题 —— 存在潜在数据丢失风险 | RFC 正在审查 |

---

### **6. 对应用开发者的启示**  
- **谨慎使用 `VLLM_BATCH_INVARIANT=1`** —— 当前与 SP/异步 TP 兼容性存在问题；请等待 [PR #56370](https://github.com/vllm-project/vllm/pull/56370) 合并后再启用。  
- **利用 HiSparse 可观测性** ([PR #58949](https://github.com/vllm-project/vllm/pull/58949)) 监控主机层级利用率，防止在去中心化部署中过度分配资源。  
- **若使用结构化输出，请避免同时设置 `response_format` + `tool_choice: "auto"`** —— 这可能导致工具调用被抑制 ([Issue #39929](https://github.com/vllm-project/vllm/issues/39929))。  
- **在 DGX Spark (GB10) 上运行大模型（如 Qwen4Exp 或 GLM-5.3-Flash）时，预计可能崩溃** —— 请检查统一内存是否耗尽，并积极使用 `--max-model-len` 限制模型长度。  
- **准备迎接 Rust 前端的采用** —— 功能对齐路线图已在推进 ([Issue #44280](https://github.com/vllm-project/vllm/issues/44280))；未来将提供更低延迟、更高效资源利用的推理服务。  

> ✅ **实用提示**：开 issue 时请务必使用 `collect_env.py` 收集环境信息并完整提交——许多回归问题与特定 GPU（如 SM121）和模型组合密切相关。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **1. 今日亮点**  
SGLang 项目持续深化对下一代硬件和推理模式的支持，关键进展包括针对 DeepSeek-V4.1 的 AMD GPU（gfx950）集成，以及原生 SANA-Video 2.0 扩散模型支持的引入。已合并多项关键稳定性修复，防止推测性解码及语法约束请求处理过程中的崩溃问题；性能调优工作则聚焦于黑曜石（Blackwell）架构 GPU 上的 KV 缓存效率与预填充吞吐瓶颈。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告新版本发布或破坏性变更。*  
然而，已有多个 PR 正在为未来兼容性做准备：  
- [PR #41492](https://github.com/sgl-project/sglang/pull/41492)：新增原生 SANA-Video 2.0（T2V/TI2V）支持 —— 向统一多模态服务迈出关键一步。  
- [PR #41493](https://github.com/sgl-project/sglang/pull/41493)：修复 GLM47 流式解析器，避免缓冲工具调用丢失 —— 对依赖结构化输出的智能体工作流至关重要。

---

### **3. 新模型与硬件支持**  
- **AMD（gfx950 / MI350X）**：[PR #41308](https://github.com/sgl-project/sglang/pull/41308) 通过 DSpark 实现了在 AMD GPU 上完整运行 DeepSeek-V4.1，拓展了 SGLang 跨架构支持范围，不再局限于 CUDA。  
- **寒武纪 MLU**：[PR #26898](https://github.com/sgl-project/sglang/pull/26898) 引入寒武纪 MLU 设备的树内原型后端，并使用 Qwen3-8B 完成验证。  
- **SANA-Video 2.0**：原生支持文本到视频（T2V）与文本图像到视频（TI2V），关闭 [#41490](https://github.com/sgl-project/sglang/issues/41490)。  
- **Intel XPU**：持续优化，通过 int4pack 路径实现 W4A16 压缩张量（[PR #40828](https://github.com/sgl-project/sglang/pull/40828)），支持高效的低比特量化。

---

### **4. 性能与优化**  
- **SM120（黑曜石）上的预填充吞吐**：用户报告在 4× RTX PRO 6000（仅 PCIe）上运行 DeepSeek-V4.1 时吞吐约为 2–7K tok/s，显著低于 vLLM/Marlin 的 ~12.5K，引发对内核覆盖度与配置优化的调查（[Issue #33422](https://github.com/sgl-project/sglang/issues/33422)）。  
- **HiCache 预取延迟**：已知性能退化导致高负载下首字节时间（TTFT）过长，原因是 HiCache 存储预取最终化延迟（[Issue #32724](https://github.com/sgl-project/sglang/issues/32724)）。  
- **内核级提升**：H200 NVL 上 Qwen3.8-Flash-Next FP8 的融合 MoE Triton 配置现已包含下投影内核（[PR #39153](https://github.com/sgl-project/sglang/pull/39153)），提升端到端吞吐。  
- **图捕获灵活性**：[RFC #33852](https://github.com/sgl-project/sglang/issues/33852) 提议放宽预填充阶段 CUDA 图捕获的约束，允许在图捕获后采用更小批大小的 KV 尺寸 —— 或可提升资源利用率。

---

### **5. 稳定性与回归问题**  
今日主要稳定性关注点：  
1. **语法约束请求中止时崩溃**：在语法编译过程中中止约束请求返回 HTTP 400 而非正确错误码 —— 影响智能体逻辑可靠性（[Issue #41465](https://github.com/sgl-project/sglang/issues/41465)）。  
2. **请求 ID 重叠漏洞**：`/abort_request` 使用部分 RID 会中止所有以该前缀开头的请求 —— 在多用户环境中存在严重安全风险（[Issue #41474](https://github.com/sgl-project/sglang/issues/41474)）。  
3. **GLM-5.3 与 DFLASH 推测解码崩溃**：使用 DFLASH 推测解码时，观察到严重重复与退化循环（[Issue #40843](https://github.com/sgl-project/sglang/issues/40843)）。  
4. **解码器状态驱逐导致令牌丢失**：流式响应中，当解码器状态被驱逐时，无声丢失最多 5 个令牌（[Issue #41236](https://github.com/sgl-project/sglang/issues/41236)）。  
5. **客户端断开导致引擎崩溃**：未捕获的 `asyncio.CancelledError` 在客户端断开时引发整个引擎关闭（[Issue #39216](https://github.com/sgl-project/sglang/issues/39216)）。

> ✅ *修复进行中*：多个 PR 正在解决这些问题（例如，[PR #41493](https://github.com/sgl-project/sglang/pull/41493) 用于流式处理，[PR #41449](https://github.com/sgl-project/sglang/pull/41449) 用于死锁检测）。

---

### **6. 对应用开发者的启示**  
- **谨慎使用推测解码与语法约束**：避免对部分请求 ID（RID）使用 `abort_request`；需警惕潜在的 ID 冲突风险。  
- **监控流式响应中的令牌丢失**：若使用高并发负载，请注意解码器状态驱逐风险 —— 可考虑增加 `SGLANG_DETOKENIZER_MAX_STATES`。  
- **利用新兴硬件支持**：对于成本敏感部署，建议评估近期 PR 中的 AMD gfx950 与 Intel XPU 后端 —— 特别适用于视频生成（SANA-Video 2.0）与低比特推理场景。  
- **准备配置调优**：鉴于黑曜石 GPU 上预填充吞吐差距明显，开发者应验证模型配置，并可通过类似 RFC #33852 的提案进行自定义内核调优。  
- **预期管理端点控制更加严格**：`/flush_cache` 增加可选认证功能（[#32772](https://github.com/sgl-project/sglang/issues/32772)）表明项目正加强对生产环境的安全部署关注。

---  
*摘要生成时间：2026-09-28 | 来源：[sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-28**

---

### **1. 今日亮点**  
最新更新聚焦于提升对现代重排序模型的支持，特别是基于因果 LLM 的重排序器（如 Qwen3 和 Qwen3-VL），通过在服务器中引入 **RANK 池化批处理拆分**（`#28876`），实现了无需完整分词对齐即可高效处理大规模输入集。同时，各后端的性能调优持续进行——包括 Vulkan（Intel）、CUDA（FP16 FlashAttention）和 SYCL——在内核效率与内存安全性方面均有显著提升。

---

### **2. 发布与破坏性变更**  
- **`b11223`**：为因果 LLM 重排序器（如 Qwen3、Qwen3-VL）在服务器中新增 **RANK 池化批处理拆分** 支持，通过 `#28876` 实现。该功能允许对重排序输入进行部分批处理，对高吞吐检索系统至关重要。  
  🔗 [PR #28876](https://github.com/ggml-org/llama.cpp/pull/28876)  
- **`b11222`**：修复参数解析的副作用；现在无条件注册 `--rpc`，并将 `llama_supports_rpc()` 调用延迟至处理器内部。提升了服务器初始化的鲁棒性。  
  🔗 [PR #29537](https://github.com/ggml-org/llama.cpp/pull/29537)  
- **`b11221`**：在 `string_split<T>` 中强制执行严格校验——遇到无效输入时抛出异常而非未定义行为。增强了配置解析的安全性。  
  🔗 [PR #29518](https://github.com/ggml-org/llama.cpp/pull/29518)  
- **`b11212`**：修改语法处理逻辑：当 `llguidance` 缺失时抛出错误而非终止程序。避免提示生成过程中的静默崩溃。  
  🔗 [PR #29516](https://github.com/ggml-org/llama.cpp/pull/29516)

---

### **3. 新模型与硬件支持**  
- **新模型支持**：  
  - 通过 `#27773` 新增对 **GLM-5.3-Flash (GLM5-Next)** 的实验性支持，这是一个 320B 的混合文本+视觉模型。  
    🔗 [PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773)  
- **新量化格式**：  
  - 在 CPU、Metal、CUDA 与 Vulkan 后端中引入 **IQ2_NL** 与 **IQ3_NL** 量化格式（`#27983`, `#27325`, `#27324`, `#27322`）。这些格式专为低比特宽度下的更高精度设计，尤其适用于非 256 倍数张量维度的场景。  
    🔗 [PR #27983](https://github.com/ggml-org/llama.cpp/pull/27983)  
- **硬件后端**：  
  - 新增 **IBM zDNN 后端** 的 CI 构建（暂无测试），为未来在大型机平台上的支持铺路。  
    🔗 [PR #29541](https://github.com/ggml-org/llama.cpp/pull/29541)  
  - 继续优化 **XDNA**，响应 `#21725` 中的功能请求。

---

### **4. 性能与优化**  
- **CUDA**：针对头尺寸 40–112 的 FP16 tile FlashAttention 配置进行了调优（`#26289`）——在密集注意力模式下提升吞吐量。  
  🔗 [PR #26289](https://github.com/ggml-org/llama.cpp/pull/26289)  
- **SYCL**：将 FWHT 内核扩展至支持最大块宽 1280，采用 Kronecker/Paley 构造（`#29243`）——使 AMD 设备支持更大规模 FFT。  
  🔗 [PR #29243](https://github.com/ggml-org/llama.cpp/pull/29243)  
- **HIP**：在 cdna 平台上启用 `fattn-mma` 内核，当 `dkq > 256` 且批量较大时（`#28907`）——降低多 GPU MoE 推理的延迟。  
  🔗 [PR #28907](https://github.com/ggml-org/llama.cpp/pull/28907)  
- **Vulkan**：优化 GDN 内核性能并修复 Intel GPU 回归问题（`#29476`）。基准测试显示，在 RTX 3090 上 ubatch=2048/4096 时提速约 **6.3%**。  
  🔗 [PR #29476](https://github.com/ggml-org/llama.cpp/pull/29476)  
- **AVX512-FP16**：在 `f32` 中累积点积可防止溢出（`#29545`）——在保持数值精度的同时实现更高吞吐。  
  🔗 [PR #29545](https://github.com/ggml-org/llama.cpp/pull/29545)  

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：`#29499` 报告 `llama-server` 在 **Jetson Orin NX（aarch64, L4T 36.4.7）** 上从 `b8638` → `b9016` 服务器重构后出现挂起问题。影响边缘部署。  
  🔗 [Issue #29499](https://github.com/ggml-org/llama.cpp/issues/29499)  
- **视觉模型崩溃**：`#28954` —— 使用 Gemma4 模型处理超过 ~120 万像素图像时，因非因果注意力限制触发 `ggml_assert`。  
  🔗 [Issue #28954](https://github.com/ggml-org/llama.cpp/issues/28954)  
- **静默内存溢出**：`#29494` —— `repeat_last_n` 与 `dry_penalty_last_n` 未做边界限制；可能导致分配多 GB 的零填充缓冲区，引发服务器内存溢出。  
  🔗 [Issue #29494](https://github.com/ggml-org/llama.cpp/issues/29494)  
- **RPC 缓冲区溢出**：`#26912` —— `SET_ROWS` 在发布版本中可能写入输出缓冲区之外（ASan 触发）。存在安全风险。  
  🔗 [Issue #26912](https://github.com/ggml-org/llama.cpp/issues/26912)  
- **正在进行的修复**：  
  - `#29543` 解决了非因果注意力路径中图像分块溢出导致的崩溃问题。  
    🔗 [PR #29543](https://github.com/ggml-org/llama.cpp/pull/29543)  

---

### **6. 对应用开发者的影响**  
- **对于智能体/检索系统**：使用 `b11223` 及以上版本，可高效运行 **Qwen3/Qwen3-VL 重排序器**，支持部分批处理——非常适合高负载搜索流水线。  
- **对于边缘/MoE 部署**：利用 `IQ2_NL/IQ3_NL` 量化格式，通过 PCIe DMA 流式传输，在受限显存环境下运行大型 MoE 模型（如 Qwen3-235B）（`#26448`）。  
- **对于生产级服务器**：在修复 `#27116` 前，请避免对 `iq4_nl` KV 缓存使用 `--split-mode tensor`。注意长上下文或 DRY 采样场景下的内存溢出风险。  
- **对于跨平台应用**：预计近日将改善 Vulkan（Intel）与 Jetson（Orin NX）的稳定性——但请避免在 Jetson 上使用 `b9016+`，直到 `#29499` 修复。  
- **最佳实践**：在分布式部署中，启用 `GGML_RPC_DEBUG=1`（`#29544`）以深入调试 RPC 通信问题。

---  
*数据来源：[github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-28**

---

### **1. 今日亮点**  
多个后端出现严重稳定性问题，包括在 RTX 5090 上使用 Cohere MoE 模型时的 CUDA 崩溃，以及在 0.34.4 版本中全缓存命中后 `llama-server` 长时间无响应。同时，用户报告严重的计费循环错误，导致无法访问 Ollama Cloud —— 对企业及付费用户而言属于高优先级问题。这些问题凸显了在高负载和复杂模型架构下推理可靠性正面临日益增长的压力。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
但客户端兼容性仍受持续变更影响：  
- `typical_p` 已不再支持（问题 [#18542](https://github.com/ollama/ollama/issues/18542)），依赖该参数的客户端将出现故障。此变更可能影响 SillyTavern 等工具链。  
- 云 API 在完成按需付费迁移后，仍返回旧版订阅数据（问题 [#18653](https://github.com/ollama/ollama/issues/18653)），表明后端尚未完全对齐。

---

### **3. 新模型与硬件支持**  
- **模型**：`deepseek-v4.1-flash:cloud` 现已声明支持 `vision` 功能，但会静默丢弃图像输入（问题 [#18527](https://github.com/ollama/ollama/issues/18527)）——接口与行为存在严重不一致。  
- **硬件**：Windows 下 Intel UHD 0x4626 iGPU 通过 Vulkan 无法被识别（问题 [#18672](https://github.com/ollama/ollama/issues/18672)）。  
- **后端**：Apple Silicon 平台上的 MLX 支持仍在持续优化，关于并发推理共享模型权重的讨论正在进行（问题 [#18669](https://github.com/ollama/ollama/issues/18669)）。

---

### **4. 性能与优化**  
- **MLX on macOS**：在内存压力下，NVFP4 模型遭遇极端性能下降（问题 [#16030](https://github.com/ollama/ollama/issues/16030)）——即使在高端 Mac 上也观察到性能退化。  
- **CUDA 内存管理**：`OLLAMA_GPU_OVERHEAD` 被 `llama-server` 忽略，未能按预期保留显存（问题 [#18679](https://github.com/ollama/ollama/issues/18679)）。  
- **解析器效率**：多个 PR（如 [#18687](https://github.com/ollama/ollama/pull/18687)、[#18624](https://github.com/ollama/ollama/pull/18624)）聚焦于工具调用解析器中的分块边界处理，旨在防止标签丢失并提升流式输出的准确性。

---

### **5. 稳定性与回归问题**  
**高严重性**：  
- **RTX 5090 上 Cohere MoE 模型的 CUDA 崩溃**（问题 [#18642](https://github.com/ollama/ollama/issues/18642)）：持续出现 `非法内存访问` 错误，导致服务器崩溃（`exit status 0xc0000409`）。目前尚无修复提交。  
- **全缓存命中任务中 `llama-server` 无响应**（问题 [#18685](https://github.com/ollama/ollama/issues/18685)）：后续请求无限挂起 —— 影响 Linux/CUDA 部署。对长期运行的推理服务至关重要。  

**中等严重性**：  
- 使用 `Ollama_KV_CACHE_TYPE=q8_0` 服务 GPT-OSS 时触发核心转储（问题 [#16946](https://github.com/ollama/ollama/issues/16946)）：虽已在 PR #11685 修复，但已被回滚 —— 当前仍未解决。  
- 尽管声明支持 `vision` 功能，仍静默丢弃图像输入（问题 [#18527](https://github.com/ollama/ollama/issues/18527)）：影响依赖多模态输入的代理工作流。

---

### **6. 对应用开发者的影响**  
- **避免在 API 调用中使用 `typical_p`** —— 旧客户端（如 SillyTavern）可能抛出错误。请尽快更新集成。  
- **不要信任 `deepseek-v4.1-flash:cloud` 等云模型的 `vision` 能力声明**；必须显式验证图像输入是否被正确处理。  
- **预期在前沿硬件上出现不稳定**：RTX 5090 与 Apple Silicon MLX 均表现出显著回归；务必在高负载下充分测试。  
- **注意 0.34.4 版本的请求挂起风险** —— 特别是在重复缓存场景下。建议在修复上线前考虑回滚或升级。  
- **为工具调用解析设计健壮的错误处理机制**：分块边界问题（如 [#18681](https://github.com/ollama/ollama/issues/18681)、[#18676](https://github.com/ollama/ollama/issues/18676)）可能导致结构化输出损坏。  
- **计费集成存在风险**：若使用 Ollama Cloud，务必验证支付流程 —— 被困于 Stripe 循环的账户可能需要手动干预（问题 [#18683](https://github.com/ollama/ollama/issues/18683)）。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-09-28**

---

### **1. 今日重点**  
LiteLLM 项目正在推进核心基础设施的升级，一系列关键修复与基于 Rust 的新模块集成正在落地，尤其集中在认证、路由和成本追踪方面。关于预算限制、模型降级回退及令牌使用日志的高严重性问题已被重点关注，反映出在多提供商可靠性与财务可追溯性方面的持续优化。值得注意的是，团队已启动向推理路径原生 Rust 集成的重大转变，彰显了长期性能与安全性的战略目标。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但有两项重要 PR 合并，用于更新成本映射数据：  
- [PR #43509](https://github.com/BerriAI/litellm/pull/43509)：将 Together AI 上 `gpt-oss-20b` 与 `gemma-4-31B-it` 的弃用日期更新为 **2026-09-15**，与官方弃用历史保持一致。  
- [PR #43507](https://github.com/BerriAI/litellm/pull/43507)：在 Together AI 目录中为 `Salesforce/Llama-Rank-V1` 添加 `deprecation_date`。  

这些变更可能影响依赖已弃用模型或自动化价格同步管道的用户。

---

### **3. 新模型与硬件支持**  
- **Tsubasa**：通过 [PR #43502](https://github.com/BerriAI/litellm/pull/43502) 增加原生路由与仪表盘发现支持，实现直接集成至 LiteLLM 的提供商生态。  
- **Azure**：新增对 **Mistral Document AI OCR** 和 **Mistral 3.5 Medium** 的支持（通过 [PR #32637](https://github.com/BerriAI/litellm/pull/32637)）——对企事业单位文档处理工作负载至关重要。  
- **OCI GenAI**：修复领域解析逻辑，支持政府云区域（如 `us-luke-1`），通过从分组 OCID 解析端点而非硬编码 `oraclecloud.com` 实现（[PR #43180](https://github.com/BerriAI/litellm/pull/43180)）。  

> ✅ *注：今日未报告新的量化格式或 CPU/Metal/CUDA 级别硬件优化。*

---

### **4. 性能与优化**  
- **Rust 集成计划**：一系列新 Rust 模块正被引入以提升性能并减少 Python GIL 竞争：  
  - [PR #43465](https://github.com/BerriAI/litellm/pull/43465)：通过 `python-bridge` 路由启用可选的原生 Python 推理路径。  
  - [PR #43466](https://github.com/BerriAI/litellm/pull/43466)：跨音频转录、聊天、响应与 WebSocket 的结构化路由生命周期追踪。  
  - [PR #43467](https://github.com/BerriAI/litellm/pull/43467)：分离认证与授权层，提升可扩展性与审计能力。  
- **成本追踪精度**：[PR #43477](https://github.com/BerriAI/litellm/pull/43477) 确保聊天请求按调用方指定的 `metadata.completion_window`（`asap`、`balanced`、`flex`）计费，防止因元数据丢失导致误计费。

> 📈 *预期效果：单请求延迟降低，可观测性增强，成本归属更精细——尤其适用于代理工作流与实时系统。*

---

### **5. 稳定性与回归问题**  
今日报告的顶级稳定性问题：

1. **严重：路由器降级后返回空响应体**  
   - [Issue #43165](https://github.com/BerriAI/litellm/issues/43165)：超时后降级至健康部署，非流式完成请求返回 HTTP 200 且响应体为 `null`。  
   - **影响**：破坏客户端错误处理逻辑，可能导致代理或前端界面出现静默失败。  
   - **状态**：开放，高严重性。尚未提交修复 PR。

2. **高：预算限制将 `max_budget=0` 视为无限制**  
   - [Issue #43214](https://github.com/BerriAI/litellm/issues/43214)：设置 `max_budget=0` 不会阻止支出，反而被视作“无上限”。  
   - **影响**：可能在生产环境中引发意外成本超支。  
   - **状态**：开放。修复 PR 待提交。

3. **中等：响应 API WebSocket 模式下令牌用量记录为零**  
   - [Issue #38674](https://github.com/BerriAI/litellm/issues/38674)：使用 `/v1/responses` WebSocket 的代理 CLI 流量报告 `prompt_tokens=0`，导致成本追踪失效。  
   - **影响**：开发者工具与自主代理的成本日志不准确。  
   - **状态**：开放。

> 🔧 *正在进行中的修复*：多个 PR 正在处理流式失败日志（[#43505](https://github.com/BerriAI/litellm/pull/43505)）与重复推理文本（[#40673](https://github.com/BerriAI/litellm/pull/40673)）。

---

### **6. 对应用开发者的启示**  
- **谨慎使用预算限制与降级机制**：在 [issue #43214](https://github.com/BerriAI/litellm/issues/43214) 修复前，请避免依赖 `max_budget=0` 来强制执行支出上限——建议使用 `max_budget=0.01` 作为临时替代方案。  
- **监控 WebSocket 与代理 API 的成本追踪**：若您使用 `/v1/responses` 或代理 CLI（如 Cursor、Codex），请注意令牌用量可能被错误记录为零（[#38674](https://github.com/BerriAI/litellm/issues/38674)）。  
- **为高吞吐应用利用新 Rust 模块**：新推出的 `python-bridge` 与 `gateway-auth` 分离设计预示未来在并发性与安全性上的改进——请提前规划后续迁移路径。  
- **验证模型别名与弃用信息**：随着 Together AI 成本映射的最新更新，请确保您的部署不再依赖已弃用的模型，例如 `gpt-oss-20b`。  

> ✅ *可操作建议*：检查代理配置中 `model_list` 条目是否存在未包含在价格映射中的别名——这可能导致无声的零成本日志记录（[#42161](https://github.com/BerriAI/litellm/issues/42161)）。

---  
*简报数据源自 GitHub 活动时间 2026-09-28 | 来源：[BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-28**

#### **1. 今日亮点**  
Unsloth 生态系统在基础设施就绪方面取得重大进展，发布了针对 PyTorch 2.13/2.14 与 Python 3.13 的预构建 CUDA 13 轮子（wheels），支持 `flash-attn 2.8.4`、`causal-conv1d 1.7.0` 与 `mamba-ssm 2.3.2.post1`，对现代 GPU 堆栈上的高性能推理至关重要。同时，核心稳定性改进已合并，修复了关键的工具调用卡死问题（`#12048`）和 macOS 上的拼音输入问题（`#12137`），而多模型服务与生成过程中的自动滚动等新功能则进一步提升了 UI 精度。

#### **2. 发布与破坏性变更**  
- **新预构建轮子（cu13）**：  
  今日发布：适用于 Linux x86_64 且搭载 CUDA 13 的 `prebuilt-wheels-cu13`，支持：  
  - `flash-attn 2.8.4`  
  - `causal-conv1d 1.7.0`  
  - `mamba-ssm 2.3.2.post1`  
  针对 **PyTorch 2.13 与 2.14**、**Python 3.13** 构建，可在受支持硬件上实现更快的 LLM 推理。  
  🔗 [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/prebuilt-wheels-cu13)  

- **PyTorch 版本升级**：  
  在 `pyproject.toml` 中将 torch 限制从 `<2.13.0` 提升至 `<2.15.0`（`#12152`），允许在 `prebuilt-wheels-cu13` 中使用更新版本。当前在 Linux cu130+Python3.13 上的新版 Studio 安装默认采用 **torch 2.13**，而现有安装保持不变。  
  🔗 [PR #12152](https://github.com/unslothai/unsloth/pull/12152) | 🔗 [PR #12150](https://github.com/unslothai/unsloth/pull/12150)

#### **3. 新模型与硬件支持**  
- **MLX 推理增强**：  
  为 Apple Silicon 上的 MLX 添加了 **TurboQuant KV 缓存量化** 支持（`#11170`）。提供 4 位、3.5 位、3 位和 2 位选项，无等效于 `mx.quantize`。同时在“加载模型”面板中引入 **MLX 内存估算** 功能，通过 `/api/inference/estimate-memory` 接口实现（`#10287`）。  
  🔗 [PR #11170](https://github.com/unslothai/unsloth/pull/11170) | 🔗 [PR #10287](https://github.com/unslothai/unsloth/pull/10287)  

- **多 GPU 与手动层拆分**：  
  PR `#10770` 支持显式指定 `--split-mode layer` 用于手动多 GPU 加载，解决了张量拆分行为的歧义问题。提升在自定义 GPU 比例下的可预测性。  
  🔗 [PR #10770](https://github.com/unslothai/unsloth/pull/10770)

- **块级 FP8 量化支持**：  
  现在在传递 `load_in_4bit=True` 时，可加载块级 FP8 检查点（如 Qwen3-FP8、GLM-5.3-Flash）的 4 位 NF4 模式（`#12146`）。修复此前模型加载时的无声失败问题。  
  🔗 [PR #12146](https://github.com/unslothai/unsloth/pull/12146)

#### **4. 性能与优化**  
- **LoRA 训练加速（块级 FP8）**：  
  PR `#12027` 通过 **提前执行 FP8 线性层** 与 **每 128 行 GEMM tile 使用 8 个 warp**，显著加速块级 FP8 LoRA 训练，在 RTX PRO 6000、L4、H100 与 B200 GPU 上降低延迟达 **4–15 倍**。专为 DeepSeek 风格的 FP8 模型设计。  
  🔗 [PR #12027](https://github.com/unslothai/unsloth/pull/12027)

- **FP8 Scale 轴修正**：  
  PR `#11799` 修复了融合 LoRA 反向传播中正方形权重的逐行 FP8 scale 应用错误——此前导致无声正确性问题。  
  🔗 [PR #11799](https://github.com/unslothai/unsloth/pull/11799)

- **内存效率优化**：  
  PR `#12119` 确保即使在启用 `--disable-tools` 时，检查点压缩仍保持激活状态，防止长时间对话中搜索能力丢失。  
  🔗 [PR #12119](https://github.com/unslothai/unsloth/pull/12119)

#### **5. 稳定性与回归问题**  
- **关键工具调用卡死**：  
  问题 `#12048` 报告：终端工具调用可能因 shell 变量展开中的无限递归（如 `VAR=$VAR` 出现在引号内）而永久挂起。已在 `#12087` 中通过同步凭证保护强化修复。  
  🔗 [Issue #12048](https://github.com/unslothai/unsloth/issues/12048) | 🔗 [PR #12087](https://github.com/unslothai/unsloth/pull/12087)

- **macOS 拼音输入阻塞**：  
  问题 `#12137`：使用 macOS 拼音输入法时，回车键无法发送消息。已在 `#12138` 中通过正确处理空闲组合状态修复。  
  🔗 [Issue #12137](https://github.com/unslothai/unsloth/issues/12137) | 🔗 [PR #12138](https://github.com/unslothai/unsloth/pull/12138)

- **微调阶段显存过度占用**：  
  问题 `#4504` 报告：微调过程中出现严重显存超用，即便在宣传的低内存配置下仍引发 OOM。暂无修复方案；仍开放中。  
  🔗 [Issue #4504](https://github.com/unslothai/unsloth/issues/4504)

- **杀毒软件误报**：  
  Bitdefender 将 `Unsloth-Desktop-Windows.exe` 标记为恶意程序（`CMD:Heur.BZC.PZQ.Boxter.791.181E0B21`）。已报告但尚未解决。  
  🔗 [Issue #12140](https://github.com/unslothai/unsloth/issues/12140)

#### **6. 对应用开发者的意义**  
- **在 CUDA 13 + Python 3.13 上部署**：使用新的 `prebuilt-wheels-cu13` 可立即获得 FlashAttention2、Mamba 与 Causal Conv1D 工作负载的性能提升——非常适合生产环境推理架构。  
- **构建高效智能体**：利用 TurboQuant KV 缓存（`#11170`）与块级 FP8 4 位加载（`#12146`），降低内存压力，并在 Apple Silicon 与 NVIDIA GPU 上实现更快的智能体推理。  
- **避免工具调用死锁**：确保你的工具命令避免在引号字符串中嵌套自引用赋值（如 `VAR=$VAR`），直至 `#12087` 部署完成。  
- **处理长对话**：在启用 `--disable-tools` 时，使用 `#12119` 以维持检查点压缩，保障聊天历史完整性。  
- **监控微调内存**：谨慎对待大模型微调——根据 `#4504`，显存使用量可能超出预期。建议考虑梯度检查点或降低批量大小。  

> ✅ **建议**：将依赖项锁定至 `unsloth>=2026.09.28`，并在使用 cu130/Python3.13 环境时确保 `torch==2.13` 或 `2.14`。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*