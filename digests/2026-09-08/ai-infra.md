# AI 基础设施日报 2026-09-08

> 生成时间: 2026-09-08 00:39 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **1. 生态系统概览**  
2026年9月，AI推理基础设施格局由高性能服务引擎、底层运行时优化以及智能体工作流成熟度的融合所定义。vLLM 和 SGLang 等项目正在推动大规模确定性推理的边界，尤其在新一代 Blackwell GPU 和推测性解码场景中表现突出。与此同时，llama.cpp 与 Ollama 在边缘和本地部署领域持续主导，不断扩展对新型量化方法和硬件目标的支持。LiteLLM 与 Unsloth 正日益成为集成层，支持多提供商路由与开发体验的简化——尤其适用于以智能体为中心的应用。整个生态系统正从孤立工具向紧密耦合、可投入生产的堆栈演进，稳定性、可复现性与可观测性已成为首要考量。

---

### **2. 活动对比**

| 项目       | 开放问题数（↑/↓） | 合并的PR数（↑/↓） | 最近24小时发布 | 状态 |
|---------------|-------------------|------------------|------------------|--------|
| **vLLM**      | 578 (+3)          | 9 (+2)           | 无               | 持续开发；关键回归问题正在处理 |
| **SGLang**    | 642 (+5)          | 12 (+3)          | 无               | 高稳定性压力；CUDA核心崩溃问题受审查 |
| **llama.cpp** | 721 (+4)          | 8 (+1)           | 无               | 性能提升但 AMD/Vulkan 平台存在严重稳定性问题 |
| **Ollama**    | 987 (+6)          | 5 (+0)           | 无               | 回归问题密集；`0.33.x` 版本性能骤降已报告 |
| **LiteLLM**   | 813 (+2)          | 7 (+1)           | v1.100.1 即将发布 | 安全性与路由修复优先处理 |
| **Unsloth**   | 428 (+3)          | 6 (+2)           | 无               | 用户体验与跨平台修复正在进行 |

> *注：问题数量为截至2026-09-08的开放工单数据。趋势显示，对GPU内核稳定性和模型正确性的关注已超越功能迭代速度。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构                   | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next-FP8**     | ✅ | ⚠️ (HiCache 问题) | ✅ (实验性) | ✅ (回归风险) | ⚠️ (尚未列出) | ❌ |
| **DeepSeek-V4-Flash**          | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **GLM-5.3-Flash**              | ✅ | 🔴 (HiCache 恢复错误) | ✅ | ✅ | ✅ | ❌ |
| **Spark-X2.5 (4B/1.7B)**       | ❌ | ❌ | ❌ | ✅ (PR #18279) | ❌ | ❌ |
| **Hy4-preview (Tencent)**      | ❌ | ❌ | ❌ | 📌 (社区请求) | ❌ | ❌ |
| **Wan2.2 TI2V (AMD 视频生成)**| ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ (缺少融合内核) |
| **TwelveLabs Marengo Embed 3.0**| ❌ | ❌ | ❌ | ❌ | ✅ (PR #40180) | ❌ |

> **胜出者**：**Ollama** 在**新架构采纳**方面领先，尤其是通过与 `llama.cpp` 的集成支持 Spark-X2.5。**SGLang** 与 **vLLM** 在**高保真模型支持**方面领先，尤其针对前沿的 FP8 与 Flash 变体，尽管面临稳定性风险。**LiteLLM** 在**面向企业级的模型路由**方面占据主导地位，具备嵌入器支持与供应商一致性优势。

---

### **4. 性能前沿**

| 优化重点             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存效率**         | ✅✅✅ | ✅✅ | ✅ | ✅ | ✅ | ✅ |
| **推测性解码 (MTP/EAGLE)** | ✅✅✅ | ✅✅ | ✅✅ | ✅ | ✅ | ✅✅ |
| **量化与内核融合**      | ✅✅✅ | ✅✅ | ✅✅✅ | ✅ | ✅ | ✅ |
| **批处理与调度**        | ✅✅✅ | ✅✅ | ✅ | ✅ | ✅✅ | ✅ |
| **分布式服务 / 异步卸载** | ✅✅ | ✅✅✅ | ✅ | ✅ | ✅✅ | ✅✅ |
| **内存管理 (VRAM/RAM)** | ✅✅ | ✅✅✅ | ✅✅ | ✅ | ✅ | ✅✅ |

> **关键洞察**：当前前沿已是**多层级演进**——vLLM 与 SGLang 在**内核级优化**（FlashInfer、Triton 融合）上领先，而 **Unsloth** 与 **Ollama** 则聚焦于**智能卸载与内存规划**。**LiteLLM** 强调**编排层效率**（分流模式、异步签名）。所有项目均大力投入**上下文长度可扩展性**，借助 NVFP4 与混合 GDN 技术实现约 245K token 的推理能力。

---

### **5. 层级定位**

| 项目       | 主要层级                  | 核心差异点 |
|---------------|-------------------------------|--------------------|
| **vLLM**      | **推理引擎**          | 在 NVIDIA 上对大模型提供业界顶级吞吐量；FlashInfer 后端主导 |
| **SGLang**    | **推理引擎 + 运行时** | 强大的上下文并行能力、HiCache 与 MoE 支持；专为高并发优化 |
| **llama.cpp** | **本地运行时 / 独立部署** | 跨平台、CPU/GPU/加速器无关；适合边缘与本地使用 |
| **Ollama**    | **模型网关 + CLI 运行时** | 开发者优先体验；统一模型服务；强大的智能体工作流集成 |
| **LiteLLM**   | **API 网关 / 聚合器**  | 多提供商路由、成本控制、OpenAI 兼容性；云 API 的关键组件 |
| **Unsloth**   | **开发者工具 / 编排** | 简化用户界面、智能卸载、模型生命周期管理；专注可用性 |

> **战略启示**：基础设施工程师现在必须**战略性地组合这些工具**——例如，使用 **vLLM/SGLang** 实现高吞吐推理，**liteLLM** 实现 API 抽象，**Ollama/Unsloth** 支持开发流程，**llama.cpp** 用于可移植部署。

---

### **6. 趋势信号**

- **确定性不可妥协**：多个项目报告在 `temperature=0` 时出现**非确定性输出**（vLLM、SGLang），表明可复现性已成为顶级需求——尤其对智能体与评估系统而言。
- **Blackwell (SM120/SM121) 不稳定是系统性问题**：在 vLLM、SGLang 与 llama.cpp 中，推测性解码期间崩溃及 Mamba-2 内核失败普遍存在，暗示存在**底层 GPU 运行时问题**，可能需固件或驱动补丁修复。
- **原生智能体特性日趋成熟**：`agent_message`、`thinking_token_budget` 与 `x-opencode-session` 等头信息表明，**工具调用、状态管理与会话一致性**已成为核心关切。
- **安全暴露面持续上升**：LiteLLM 中的 `wrong-key 401` 泄露事件与 Ollama 的静默崩溃表明，**可观测性与安全加固**已落后于功能迭代速度。
- **用户体验即生产力**：Unsloth 的下载流程优化与 Ollama 模型名称校验改进等举措揭示，**开发者体验**已成为关键差异化因素。

> **给开发者的可操作建议**：
> - 在修复落地前，避免对 Qwen3.8-Flash-Next-FP8 与 DeepSeek-V4-Flash 使用 `temperature=0`。
> - 为确保确定性工作流，使用 **`--enforce-eager`** 或禁用推测性解码。
> - 密切监控**GPU 内存使用率**——部分分配（如 5090 上低于 40%）可能直接导致吞吐量暴跌。
> - 在 Ollama 中优先使用 **`0.32.13` 而非 `0.33.x`** 以获得稳定推理。
> - 实施**会话 ID 跟踪**与**请求日志卫生规范**，防止泄露。

---

**最后说明**：当前的 AI 基础设施栈已不再仅关乎速度——而是关于**正确性、一致性与可信度**。今日的开发者必须优先考虑**稳定性而非新颖性**，选择工具应基于**生产就绪程度**，而非仅看基准测试标题。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-08**

---

### **1. 今日亮点**  
vLLM 项目在下一代硬件的生产级推理方面持续快速推进，针对高并发场景下 `Qwen3.8-Flash-Next-FP8` 与 `DeepSeek-V4-Flash` 的确定性行为问题完成了关键修复。新提交的 PR 解决了 SM120/SM121 GPU（Blackwell 架构）上的稳定性问题，包括推测解码期间的非法内存访问崩溃以及 Mamba-2 内核失败——这些是大规模部署大模型的关键障碍。

---

### **2. 发布与破坏性变更**  
*无*  
过去 24 小时内未发布新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen3VL/Qwen3.5/Qwen4Next**：通过 #51289 扩展了设备端多模态归一化，提升了 EPD 分离流水线中的编码器效率。  
- ✅ **CohereCompassForConditionalGeneration**：已加入文档支持模型列表中 (#55777)。  
- ✅ **ROCm 支持**：现在可在 ROCm 上启用 HY-V4 模型初始化 (#54405)；为 AITER 稀疏 MLA 添加了 attention-sink 支持 (#54404)。  
- 🔧 **NVIDIA SM120/SM121**：FlashInfer 后端现通过 #55778 拒绝不支持的 NoPE 头大小（如 GLM-5.3-Flash）；Mamba-2 的 Triton 内核在 CPU/macOS 上现在可优雅降级 (#55480)。

---

### **4. 性能与优化**  
- ⚡ **批处理不变性优化**：正在 #27433 中积极追踪，旨在消除批处理推理中的非确定性，确保运行结果一致——这对智能体工作流至关重要。  
- 📈 **KV Cache 效率**：PR #52244 恢复了在 MTP 推测解码下混合 GDN 前缀缓存命中，解决了 #53670 中观察到的约 30–40% 吞吐量损失。  
- 💾 **SM120 上的 NVFP4**：基于 FlashInfer 的 nvfp4 内核的原型已实现 24.5 万上下文长度（RTX 5090），展示了超长上下文推理的巨大潜力 (#49011)。  
- 🔄 **长度感知调度**：RFC #55265 提出一种批处理-窗口配对策略，以提升混合长度任务下的公平性与资源利用率。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|---------|------|--------|------------|
| 严重 | `Qwen3.8-Flash-Next-FP8`：当提示接近 `indexer_budget` 时，贪婪解码出现非确定性行为 (#54521) | 五个完全相同的请求返回不同输出；影响智能体与评估的正确性 | 开放 — 尚无修复 |
| 严重 | `DeepSeek-V4-Flash`：在 `temperature=0` 下输出非确定性，且并发越高越严重 (#53257) | 复现风险高；影响基准测试与部署 | 开放 — 尚无修复 |
| 严重 | 混合 GDN + MTP k=3 + 异步调度（RTX 3090）下发生无声 CUDA IMA（`exit 0`）(#53726) | 类似活锁行为；难以调试的崩溃 | 开放 — 即使已有修复仍持续存在 |
| 严重 | `FlashInfer + MTP` 在 SM121 上使用 GQA=16 模型时崩溃 (#37754) | 阻碍 DGX Spark 上高级推测解码的使用 | 开放 — 临时方案：切换至 Triton 后端 |
| 中等 | `nvfp4` KV Cache 在 SM120 上：未与 FlashInfer 内核集成 (#49011) | 导致 5090 上无法达到最优性能 | 原型可用；等待集成 |

---

### **6. 对应用开发者的启示**  
- 若需保证确定性，请避免在 `temperature=0` 下使用 `Qwen3.8-Flash-Next-FP8` 与 `DeepSeek-V4-Flash` —— 负载下预期输出不一致。可临时采用 `--enforce-eager` 或禁用推测解码作为缓解措施。  
- 一旦 FlashInfer 集成落地（#49011），请立即利用 RTX 5090 上的 NVFP4 —— 可在极小开销下实现前所未有的上下文长度（约 24.5 万 token）。  
- 在 PR #55778 与 #52244 合并前，预计在 SM120/SM121 GPU 上使用推测解码存在不稳定风险 —— 除非用于测试，否则请避免在 Blackwell 架构上对 GQA > 8 使用 `MTP`/`EAGLE`。  
- 在高吞吐系统中使用长度感知批处理（RFC #55265），以防止饥饿并提升资源利用率。  
- 监控 `thinking_token_budget` 行为 —— 它可能在 RL 回放中静默截断推理过程（#54864）；建议考虑截断模式提案。

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [PRs](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 摘要 – 2026-09-08**

---

### **1. 今日重点**  
SGLang 生态系统持续成熟，对大规模推理的稳定性与性能关注度持续提升，尤其集中在上下文并行（CP）、推测解码以及 HiCache 可靠性方面。已识别出因未完全恢复 HiCache 导致的 GLM-5.3-Flash 关键回归问题，正在通过 PR #38212 进行修复。与此同时，针对 CUDA 核心转储（coredump）的高优先级修复（#26340）仍处于活跃状态，评论超过 290 条，反映出底层 GPU 运行时仍存在持续挑战。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告新发布或破坏性变更。*  
不过，已合并若干配置弃用项：`get_global_server_args` 已被弃用（#38375），且 MiniCPM5-2B 配置中 `--cuda-graph-max-bs` 现已被 `--cuda-graph-max-bs-decode` 取代（#38379, #38378）。开发者应相应更新启动脚本。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 支持**：通过 PR #37465 扩展了 gfx950（MI355X）上 EAGLE 推测解码的支持。  
- **ROCm MoE 融合**：统一的 Triton 路由器现已支持 ROCm 与单组路由（#38328），可在 AMD GPU 上高效执行 MoE。  
- **Intel XPU 集成**：新增 BGE、NomicBERT、ModernBERT、InternVL3_5、Hunyuan-A13B 与 Step3-VL 的编码器嵌入支持（#35304）。  
- **Blackwell（B300/B200）**：FP8 MoE + 对称内存配置现明确使用 `flashinfer_trtllm` 后端（#38374）。

---

### **4. 性能与优化**  
- **引擎恢复加速**：权重缓存守护进程将 Qwen3-235B FP8 的加载时间从约 306–327 秒降至 <1 秒（#33522）。  
- **CUDA Graph 优化**：引入 HRRN 调度器显著降低 TTFT（#32911）；早期结果对短延迟负载表现良好。  
- **内存效率**：SWA 混合页释放逻辑现可高效处理 `page_size > 1` 场景（#38159），减少碎片。  
- **内核融合**：针对 AMD 的特定融合（MLA q 吸收进 RoPE+KV 写入、topk=1 draft softmax 移除）减少内核调用，提升解码吞吐量（#38340）。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|---------|-------|--------|-----------|
| 🔴 高 | [Bug] GLM-5.3-Flash HiCache 恢复损坏（无推测解码） | 主机层级加载回退导致生成损坏；丢失工具调用，引发重复循环 (#38031) | ✅ PR #38212 正在进行 |
| 🔴 高 | [Bug] QSA 扩展中 CUDA 非法内存访问（8 个并发请求） | 在 Qwen3.8-Flash-Next-FP8/H20 TP8 上高负载下崩溃 (#37633) | ⚠️ 尚无修复 |
| 🔴 高 | [Bug] DFLASH/DSPARK draft KV 池预算使用 `tp_size` 而非 `attn_tp_size` | 导致 Kimi-K3 中 DP 注意力场景下 OOM (#38202) | ⚠️ 尚无修复 |
| 🟡 中 | [Bug] `fp8e4nv` 不支持 A100（SM80）上的 Qwen3.8-Flash-Next-FP8 | 阻碍在旧硬件上部署 (#38291) | ⚠️ 尚无修复 |
| 🟡 中 | [Bug] `/v1/responses`: `created_at` 类型不一致（浮点数 vs 整数） | 流式与非流式响应格式不一致 (#34716) | ⚠️ 待评审 |

> *注：庞大的 CUDA 核心转储追踪器 (#26340) 反映出 GPU 内核存在系统性不稳定，尤其在 SM10x（B300）上更为明显。*

---

### **6. 对应用开发者的启示**  
- **所有新部署请使用 `--cuda-graph-max-bs-decode` 替代已弃用的 `--cuda-graph-max-bs`**（PRs #38379/#38378）。  
- 若服务 **GLM-5.3-Flash**，请在 PR #38212 合并前避免使用 HiCache 主机层级卸载——否则可能导致无声的正确性失败。  
- 对于 **高并发工作负载**（≥8 个请求），在 H20 上使用 Qwen3.8-Flash-Next-FP8 时需谨慎——可能因 QSA 内核问题导致崩溃。  
- 在 **AMD GPU** 上，近期 ROCm 补丁将带来更优的 MoE 与推测解码性能。  
- 若使用 Qwen3.8-Flash-Next-FP8，**请勿在 A100 上使用 `fp8e4nv`**，建议改用 `fp8_e4m3` 或切换至更新架构。  

> ✅ **建议**：实时监控 CI 状态 [#17050](https://github.com/sgl-project/sglang/issues/17050)，避免在不稳定运行期间部署。

---  
*摘要生成时间：2026-09-08 | 来源：[github.com/sgl-project/sglang](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-08**

---

### **1. 今日重点**  
最新更新聚焦于高端推理负载的关键性能提升，特别是通过针对 DeepSeek-V4 与 Qwen 系列模型的 Vulkan 与 CUDA 优化。关键改进包括无分支量化矩阵乘法（Q4_K/Q5_K）、DeepSeek-V4 超连接的新融合操作，以及 Metal 与 Vulkan 后端的内存管理增强——显著提升了大上下文场景下的解码吞吐量与稳定性。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未标记任何破坏性变更或新版本发布。但多个 PR 引入了行为变化：
- `--lazy-mode auto` 在 AMD iGPU 的 Vulkan 上运行 `qwen4exp` 时，**预填充吞吐量下降约 50%**，这是由于改进了 TENSOR_READ_LAZY 处理所致 ([#28160](https://github.com/ggml-org/llama.cpp/pull/28160))。
- `ggml_gallocr` 中存在一个回归问题，当在节点身份变更后复用分配计划时，可能无声地损坏稀疏 MoE 图结构 ([#28448](https://github.com/ggml-org/llama.cpp/pull/28448))。

> 🔧 **迁移提示**：依赖 `--lazy-mode auto` 且在 AMD Vulkan 上使用 Qwen4exp 的用户，建议锁定到早期提交版本，或调整 `GGML_VK_SUBALLOCATION_BLOCK_SIZE` 以避免性能骤降。

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 在 Vulkan（MM、MAT-VEC、DEQUANT、GET_ROWS）中新增对 **TQ1_0** 量化格式的支持 ([#27765](https://github.com/ggml-org/llama.cpp/pull/27765))。  
  - 通过 GGUF 转换工具实验性支持 **Qwen3.8-Flash-Next**、**Qwen3.5-hybrid** 与 **K2-Horizon** 模型 ([#28361](https://github.com/ggml-org/llama.cpp/issues/28361), [#28522](https://github.com/ggml-org/llama.cpp/issues/28522))。  
- **硬件与后端增强**：  
  - 为 ROCm 平台 GPU 新增 **gfx90c HIP 支持** ([#26454](https://github.com/ggml-org/llama.cpp/pull/26454))。  
  - 针对 M5 Max（D512 解码）优化 **Metal 后端**，采用 NE2 内核融合技术 ([#28534](https://github.com/ggml-org/llama.cpp/pull/28534))。  
  - Vulkan 后端完整加入 **DeepSeek-V4 超连接融合操作（DSV4_HC_COMB/PRE/POST）** ([#26578](https://github.com/ggml-org/llama.cpp/pull/26578))。

---

### **4. 性能与优化**  
- **CUDA**：无分支 Q4_K/Q5_K 解包在批处理大小 > 1 时提升 mmvq 性能；DGX Spark 系统启用 L2 预取 ([#26705](https://github.com/ggml-org/llama.cpp/pull/26705))。  
- **Vulkan**：RMS_NORM 融合机会带来 Gemma4 上约 4% 的性能提升 ([#28024](https://github.com/ggml-org/llama.cpp/pull/28024))；TQ1_0 打包降低常量开销 ([#27765](https://github.com/ggml-org/llama.cpp/pull/27765))。  
- **内存管理**：子分配碎片导致 131,072 上下文时解码吞吐量下降约 78%，通过设置 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` 已解决 ([#27734](https://github.com/ggml-org/llama.cpp/issues/27734))。  
- **推测解码**：引入自适应 MTP 草稿深度（`draft-mtp-adaptive`），根据模型状态动态调整草稿大小 ([#27210](https://github.com/ggml-org/llama.cpp/pull/27210))。

---

### **5. 稳定性与回归问题**  
今日报告的顶级稳定性问题：
1. **在 AMD RADV/Vulkan 上进行推测解码时发生 DeviceLost 崩溃**（`llama_decode(ctx_dft)` 在提示中间失败）——使用 `--spec-type draft-mtp` 可复现 ([#27306](https://github.com/ggml-org/llama.cpp/issues/27306))。  
2. **Qwen3.5-hybrid（64 层）模型在超过 ~130k 上下文时无声产生 EOS**，与 DeltaNet 循环状态深度 × 层数退化相关 ([#27756](https://github.com/ggml-org/llama.cpp/issues/27756))。  
3. **在 Mac x86 Vulkan 与 AMD GPU 上，提交 b8143 后出现垃圾输出** ([#20029](https://github.com/ggml-org/llama.cpp/issues/20029))。  
4. **gfx1151 上的 HIP/ROCm 对长提示（> n_ubatch）报告错误 logits** ([#28211](https://github.com/ggml-org/llama.cpp/issues/28211))。  

> ⚠️ **注意**：以上回归问题尚未有修复合并的 PR。开发者应密切监控问题追踪器。

---

### **6. 对应用开发者的启示**  
- **优化大上下文场景**：若在 Vulkan 上运行 >130k 上下文窗口，请使用 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`。  
- **避免在 AMD iGPU 上使用 `--lazy-mode auto`** 与 Qwen4exp，直至 [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) 修复。  
- **合理利用推测解码**：使用 `draft-mtp-adaptive` 实现动态草稿大小，但需测试在 AMD/Radeon 硬件上的设备丢失问题。  
- **警惕新量化格式的不稳定性**：TQ1_0 与 Qwen3.8-Flash-Next 模型可能出现无声损坏或崩溃——务必严格验证输出。  
- **关注 UI/服务稳定性**：近期 PR 改进了模型发现与下载体验，但在高负载下仍可能发生死锁与 OOM 问题 ([#28406](https://github.com/ggml-org/llama.cpp/pull/28406), [#27309](https://github.com/ggml-org/llama.cpp/issues/27309))。

👉 **可操作建议**：在回归问题修复前，生产环境请锁定至已知稳定的提交版本（如 `b10833` 或更早）。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-08**

---

### **1. 今日亮点**  
Ollama 生态系统持续快速发展，代理与云集成方面势头强劲，尤其在 OpenAI 兼容端点对齐和模型服务稳定性方面表现突出。关键进展包括支持 `agent_message` 输入的 PR 合并至 OpenAI API 层，以及生成模板中对原生思考逻辑的处理——这对代理工作流至关重要。与此同时，现有问题仍反映出 GPU 内存利用率、上下文处理及模型下载完整性方面的持续挑战。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告新版本或破坏性变更。*  
无新发布或破坏性变更。用户应警惕近期版本（如 `0.33.x`）引入的回归问题（例如 CUDA 上性能下降），相关问题详见 #18225。

---

### **3. 新模型与硬件支持**  
- ✅ **Spark-X2.5 架构（4B / 1.7B）**：  
  PR #18279 将 `llama.cpp` 升级至 `b10829`，以支持 SparkLLM 的 Spark-X2.5 模型所使用的新型 `spark2_5` 架构。该更新解决了问题 #18195，目前正通过 PR #18287 与 #18290 持续跟进。  
  🔗 [PR #18279](https://github.com/ollama/ollama/pull/18279) | [Issue #18195](https://github.com/ollama/ollama/issues/18195)

- 📌 **Hy4 模型（腾讯）**：  
  社区请求 #18287 呼吁官方支持 Hugging Face 上的 Hy4-preview 模型。目前尚无对应 PR，但需求日益增长。  
  🔗 [Issue #18287](https://github.com/ollama/ollama/issues/18287)

- 🚧 **AMD ROCm/Vulkan（gfx1201/gfx1151）**：  
  问题 #17782 与 #17870 报告了在 `TensileLibrary_lazy_gfx1200.dat` 及 Vulkan 计算环超时方面存在特定于 GPU 的失败问题。这对使用新款显卡（如 RX 9060 XT 与 Strix Halo）的 AMD 用户至关重要。  
  🔗 [Issue #17782](https://github.com/ollama/ollama/issues/17782) | [Issue #17870](https://github.com/ollama/ollama/issues/17870)

---

### **4. 性能与优化**  
- ⚠️ **`0.33.x` 版本性能回归**：  
  多个报告确认在 RTX 3090 上令牌生成速度下降约 5 倍（问题 #18225），而 `0.32.13` 版本表现正常。此回归影响 CPU 与 GPU 推理，可能与调度器或运行器逻辑变更有关。  
  🔗 [Issue #18225](https://github.com/ollama/ollama/issues/18225)

- 💡 **上下文处理改进**：  
  PR #18285 引入显式上下文尊重机制，在 MLX 运行器中不覆盖软大小设定，提升了高上下文场景下的可预测性。类似地，PR #16825 确保 `num_ctx` 在 OpenAI 兼容端点中正确传递。  
  🔗 [PR #16825](https://github.com/ollama/ollama/pull/16825) | [PR #18285](https://github.com/ollama/ollama/pull/18285)

- 🔁 **内存效率**：  
  问题 #17971 指出 GPU 内存仅部分利用（低于 40%），迫使系统依赖主内存，导致吞吐量下降。这表明负载下内存分配策略存在不足。  
  🔗 [Issue #17971](https://github.com/ollama/ollama/issues/17971)

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 摘要 | 状态 |
|--------|-------|---------|--------|
| 🔴 高 | [#8484](https://github.com/ollama/ollama/issues/8484) | 模型下载进度中途回退；总大小不可预测地减少。影响所有网络环境。 | 已关闭 |
| 🔴 高 | [#17841](https://github.com/ollama/ollama/issues/17841) | Ollama 在 sm_86 GPU（RTX 30/A40/A6000）上静默降级至 CPU，尽管支持 CUDA 13。对高端推理至关重要。 | 已关闭 |
| 🔴 高 | [#18186](https://github.com/ollama/ollama/issues/18186) | MTP 设置导致在 5090 上对 QWEN3.8:27b 推理时卸载至 CPU，性能显著下降。 | 已关闭 |
| 🟡 中等 | [#18286](https://github.com/ollama/ollama/issues/18286) | `/v1/responses` 拒绝 `agent_message` 输入项。阻碍 Codex 代理集成。 | 开放 |
| 🟡 中等 | [#18274](https://github.com/ollama/ollama/issues/18274) | 模型名称验证限制为 80 字符，阻塞长 HF 模型名称。 | 开放 |
| 🟡 中等 | [#18282](https://github.com/ollama/ollama/issues/18282) | 当模型超出可用内存时调度器进入驱逐循环——应快速失败而非循环。 | 已关闭 |

> ✅ **正在修复中**：  
> - PR #18298 为 OpenAI API (`/v1/responses`) 添加 `agent_message` 支持。  
> - PR #18290 修复模型名称长度限制。  
> - PR #18296 更新工具调用 ID 前缀为 `tsc_` 以兼容 OpenAI。

---

### **6. 对应用开发者的启示**  
- **代理构建者**：通过 PR #18298 新增的 `agent_message` 支持，以及 PR #18300 改进的思考解析，意味着与 Codex 及其他代理框架的兼容性更好。预计多步推理流程的集成将更加顺畅。
- **云与 API 用户**：在 OpenAI 兼容端点中使用 `num_ctx` 时需谨慎——除非显式通过 `options` 传入，否则仍不完全生效。建议使用 `OLLAMA_CONTEXT_LENGTH` 或 Modelfile 中的 `num_ctx` 作为后备。
- **模型作者**：若部署自定义模型（尤其是 Spark-X2.5 或 Hy4），请确保其基于兼容的 `llama.cpp` 版本（b10829+）。尽早在目标硬件上进行测试。
- **性能敏感应用**：在回归修复落地前，请避免使用 `0.33.x`。密切监控 GPU 内存使用情况——部分利用会严重影响延迟。若稳定性为首要目标，可考虑锁定至 `0.32.13`。
- **安全提示**：生产环境中避免启用 `OLLAMA_DEBUG_LOG_REQUESTS`——完整提示会被记录且无脱敏处理（问题 #18210）。

👉 **可操作建议**：  
- 跟踪 PR #18298、#18300 与 #18279，这些将带来近期内代理与模型支持的关键改进。  
- 验证您的流水线中上下文与内存行为——特别是涉及 MTP 与大模型时。  
- 谨慎使用 `keep_alive=-1`——长时间运行的运行器可能导致输出损坏（问题 #18208）。

---  
*摘要源自 GitHub 活动：ollama/ollama (2026-09-08)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM Digest — 2026-09-08**

#### **1. 今日亮点**
LiteLLM 生态系统持续演进，针对模型路由、认证安全及代理稳定性进行了关键修复——尤其聚焦于 Claude Code 代理工作流与 OpenCode Go 集成。重要 PR 包括为影子模式 PR 引入高风险 CI 分层机制、增强预算预留处理逻辑，以及改进 Bedrock 错误追踪的日志记录。新增 `x-opencode-session` 头部要求（问题 #39503）凸显了在托管推理环境中保持稳定会话上下文的迫切需求。

#### **2. 发布与破坏性变更**
*过去 24 小时内无新发布。*  
然而，**v1.100.1** 即将推出（PR #40176），用于回滚双哈希消费行的问题，并提升日志中使用元数据的可见性——这对生产环境中的计费准确性与可观测性至关重要。

#### **3. 新模型与硬件支持**
- ✅ 通过 PR #40180 新增 **TwelveLabs Marengo Embed 3.0**：支持嵌套输入类型（`text_image`、`multi_input`），现已正确通过 AWS Bedrock 路由嵌入。
- 📌 **Z.AI（智谱 AI）** 提供商已出现在 UI 下拉菜单中，但表单渲染不完整（问题 #39310）——这是已知的前端缺陷，阻碍立即使用。
- ⚠️ **OpenRouter 的 `gpt-5.6-sol` 模型缺失于定价目录**（问题 #40102），需更新 `model_prices_and_context_window.json` 后方可配置。

#### **4. 性能与优化**
- **异步签名卸载**：PR #40178 引入基于线程的异步请求签名机制，减少事件循环争用——尤其对 Bedrock SigV4 凭证解析延迟有显著改善。
- **自动路由中的“分流”模式**：PR #40158 允许大文件读取跳过昂贵模型，将代码生成任务委派给更低成本替代方案——在高吞吐工作流中可减少高达约 70% 的令牌浪费。
- **复杂度路由启发式扩展**：PR #40156 支持声明式自定义维度（如提示长度、令牌密度），无需手动调优即可实现更智能的路由决策。

#### **5. 稳定性与回归问题**
| 严重性 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|-----------|
| 🔴 高 | [错误] `wrong-key 401` 泄露内部信息（问题 #39757） | 响应暴露后端名称、数据库表名及无效密钥的 SHA-256 哈希值——存在安全隐患 | 尚未修复；优先级极高 |
| 🔴 高 | [错误] vLLM/Kimi K2.7 多轮工具调用功能损坏（问题 #32214） | `sanitize_tool_use_ids_in_anthropic_messages` 导致跨轮次工具调用状态丢失 | 已提交补丁，适用于 v1.91.0+ |
| 🔴 高 | [错误] OpenAI → Anthropic 桥接中提示缓存未保留（问题 #39339） | 在 `/v1/messages` → 响应 API 转换过程中加密内容被丢弃 | 修复正在评审中（PR #39759 不足） |
| 🟡 中 | [错误] 模型别名创建后无法编辑（问题 #28164） | 虚拟密钥模型别名创建后不可修改 | 已知前端限制 |
| 🟡 中 | [错误] Ollama 模板因缺少 `initial_prompt_value` 导致崩溃（问题 #39759） | 若缺少必填字段，自定义模板会失败 | 已提交 PR（修复待定） |

#### **6. 对应用开发者的启示**
- **强制使用会话 ID**：调用 OpenCode Go 时，请更新客户端逻辑，添加 `x-opencode-session` 头部（问题 #39503）。
- **避免易引发回归的配置**：若使用 vLLM 后端的多轮 Claude Code 工作流，请避免使用 `v1.91.0` 版本——建议升级或手动打补丁。
- **审计认证安全性**：暴露的 401 响应（问题 #39757）可能泄露基础设施细节——在修复前请勿公开暴露 LiteLLM 代理。
- **合理使用分流模式**：利用 PR #40158 的“分流”选项，在 Auto Router 中避免大型数据摄入任务中使用高成本模型。
- **监控内存增长**：若运行长期存活的代理，请留意内存缓慢增长（问题 #38193）——这可能表明垃圾回收异常或状态残留。

> 🔗 *查看活跃问题*：[GitHub Issues](https://github.com/BerriAI/litellm/issues) | [PRs](https://github.com/BerriAI/litellm/pulls)  
> 🔧 *贡献者指引*：在 CI 中使用 `risk-gate`（PR #40171）评估合并前的 PR 影响范围。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-08**

---

### **1. 今日亮点**  
Unsloth 项目持续扩展其跨平台与多模型支持能力，针对 AMD/ROCm 及 Intel Arc GPU 兼容性进行了关键修复，包括解决 Intel Arc B580 上 `torch.xpu.memory.mem_get_info()` 不兼容问题（问题 #3533）。一项重大性能优化已合并，通过复用预先获取的发布元数据，减少 llama.cpp 版本检查时的冗余 GitHub API 调用（PR #10461），直接解决了问题 #10449 中报告的高频 API 请求问题。此外，新功能正陆续引入模型上下文处理、工具集成及聊天标题演化等方面的用户体验改进。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未发布新版本或破坏性变更。

---

### **3. 新模型与硬件支持**  
- **Intel Arc B580**：通过修复 `torch.xpu.memory.mem_get_info()` 失败问题（问题 #3533）实现支持 —— 此前因不支持 XPU 内存 API 导致导入失败。
- **AMD ROCm (W7900/W7500)**：正在处理 Wan2.2 TI2V 视频生成中缺失融合注意力核的问题（问题 #10415），并解决尽管勾选了“无内存卸载”仍出现模型卸载异常的情况（问题 #10341）。
- **Qwen 3 AVL 2B 与 0.6B**：已提交功能请求（问题 #10459），希望实现统一的多模态模型支持，整合视觉语言（VL）与语音识别（ASR）组件。
- **Windows-on-ARM NVIDIA 主机**：安装程序现已可检测并安装原生 ARM64 CUDA 堆栈（PR #10282），解决了此前在 GB10/N1X 设备上的安装失败问题。

---

### **4. 性能与优化**  
- **API 效率**：PR #10461 通过复用预取的发布元数据，消除冗余的 GitHub API 调用，将每次发布请求的 API 调用次数从约 N 次降至 1 次，直接解决 #10449 问题。
- **推测解码指标**：PR #10416 引入推测解码接受率测量功能，支持精细化调优（关闭 #10401）。
- **卸载规划**：PR #9872 通过集成 llama.cpp 内部适配器与溢出成本建模逻辑，增强智能卸载规划器算法，提升显存利用率（`UNSLOTH_SMART_OFFLOAD` 标志背后的机制）。
- **模型加载速度**：PR #10453 防止在 `unsloth start` 过程中长耗时模型下载被提前终止，避免带宽浪费与重复尝试。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|------|-------------|------------|
| 高 | #3533 | 在 Intel Arc B580 上因不支持 `torch.xpu.memory.mem_get_info()` 调用导致 `unsloth` 无法导入 | ✅ *修复待定（尚未提交 PR）* |
| 高 | #10415 | AMD RX 9060 XT 上运行 Wan2.2 TI2V 时因缺少融合注意力核导致内存溢出（OOM） | ⚠️ *临时方案：回退至 PyTorch SDPA；尚未提供内核补丁* |
| 中 | #10341 | 在 ROCm 上即使勾选“无内存卸载”，模型仍驻留于内存中 | 🔧 *调查中；PR #10453 修复相关竞态条件* |
| 中 | #10437 | 切换下载目录后，GGUF 量化版本消失 | ✅ *PR #10438 已合并，确保缓存变更时保留量化变体* |
| 低 | #10449 | `unsloth studio update` 过度调用 GitHub API | ✅ *PR #10461 已合并 — 解决过度轮询问题* |

---

### **6. 对应用开发者的影响**  
- **多 GPU 环境**：在混合 NVIDIA + AMD 系统上，务必显式选择 Vulkan 后端进行推理，并确认训练配置正确指向目标 GPU（问题 #10450）。
- **远程模型完整性**：使用远程 Ollama 模型时，注意“告知模型今日日期”功能可能覆盖自定义 `SYSTEM` 提示（问题 #10436）；可使用 PR #10463 保留 model file 上下文。
- **离线部署**：对于隔离环境，可参考 KoboldCpp 等独立打包方案（问题 #10356）；目前 unsloth 尚不支持离线安装包。
- **工具链与状态管理**：避免在聊天过程中中途切换含工具支持与不含工具支持的模型（问题 #10454）；请显式保存或清除工具历史记录。
- **模型配置鲁棒性**：谨慎使用 `--config` 标志 —— 未知键值将被静默忽略（问题 #10452）；建议在训练前使用配置验证工具。

> 🔗 [GitHub Issues](https://github.com/unslothai/unsloth/issues) | [Pull Requests](https://github.com/unslothai/unsloth/pulls)

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*