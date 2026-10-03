# AI 基础设施日报 2026-10-03

> 生成时间: 2026-10-03 01:24 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-03**

---

### **1. 生态概览**  
AI推理与服务生态正进入高性能专业化阶段，由下一代硬件（Blackwell SM120、AMD RDNA GPU、Apple M5）和以智能体为中心的工作负载共同驱动。各项目在方向上逐渐分化：vLLM 和 SGLang 在推测解码与 MoE 优化支持下，引领低延迟、高吞吐推理；llama.cpp 作为边缘与异构部署的主流本地运行时持续巩固地位；Ollama 虽然仍保持用户友好入口，但稳定性问题日益突出；LiteLLM 演变为关键的多提供商编排器，成本控制能力显著增强；Unsloth 在微调效率与智能体工具链方面不断突破，但伴随回归缺陷。模型架构（Flash Attention、混合 MoE）、硬件专用内核与分布式推理需求，正推动各层之间更紧密的集成。

---

### **2. 活跃度对比**

| 项目       | 开放问题数 | 近24小时合并的PR | 近24小时发布数 | 状态 |
|------------|------------|------------------|----------------|------|
| **vLLM**   | 18         | 7                | 无             | 稳定 |
| **SGLang** | 23         | 9                | 无             | 稳定 |
| **llama.cpp** | 28      | 10               | 3（b11364, b11362, b11355） | 活跃 |
| **Ollama** | 25         | 6                | 无             | 存在回归 |
| **LiteLLM** | 22       | 6                | 1（v1.105.0-dev.2） | 安全导向 |
| **Unsloth** | 27       | 5                | 无             | 易出现回归 |

> ✅ *洞察*：**llama.cpp** 在发布速度上领先，凸显其作为基础运行时的核心角色。**SGLang** 与 **Unsloth** 问题数量最高，表明在高压下仍持续进行功能开发。

---

### **3. 模型支持竞赛**

| 新模型 / 架构              | 首个支持者           | 备注 |
|----------------------------|----------------------|------|
| **GLM-5.3-Flash**          | vLLM, SGLang         | 两者均报告在 SM120 上存在推测解码问题；vLLM 存在 0% MTP 接受率的缺陷 |
| **DeepSeek-V4.1-Flash**    | vLLM, SGLang         | vLLM 在启用 `--enforce-eager` 后解码吞吐量下降 |
| **Kimi K3**                | vLLM                 | 仅追踪状态；尚未提交 PR |
| **Qwen3.8-2.4T-A95B**       | SGLang               | ROCm 优化正在进行中 |
| **Nimble Decision Model**   | **llama.cpp**        | 首个原生支持结构化智能体推理的项目 |
| **Clef Decision Model**     | **llama.cpp**        | 通过运行时支持添加 |
| **Prism Bonsai 2 27B**      | **llama.cpp**        | 在 `b11364` 中新增模型 |
| **Reka / QuickSilver Pro**  | **LiteLLM**          | 增加原生 OpenAI 兼容提供者 |
| **Gemma 3 (Vision)**        | Unsloth              | 部分支持；仅文本变体无法保存/加载 |
| **Qwen3-TTS**               | Unsloth              | 已请求 LoRA 微调，但尚未实现 |

> 🏆 **胜出者**：**llama.cpp** 在决策模型与视觉语言支持上占据早期优势；**LiteLLM** 在提供者多样性与新模型集成方面遥遥领先。

---

### **4. 性能前沿**

| 优化重点                   | 领先项目                          | 关键进展 |
|----------------------------|-----------------------------------|----------|
| **KV 缓存与卸载**         | vLLM, SGLang                      | 异步 KV 清零、睡眠模式 CUDA 图卸载、MoE 的驻留于 GPU 的 LRU 缓存 |
| **推测解码**              | vLLM, SGLang, llama.cpp           | MTP 接受率修复、基数缓存对齐、每步宽度选择 |
| **内核效率（Flash/MLA）** | vLLM, SGLang, llama.cpp, LiteLLM   | FlashInfer 内核预下载（`download-kernels`）、Metal FA（F16 KV）、Triton + Tencent hpc-ops 后端 |
| **量化与内存管理**        | Unsloth, llama.cpp                | Hexagon 上的 Q2_K/Q3_K 支持、FP8/FP4 导出（安全顾虑）、显存膨胀缺陷 |
| **分布式服务**            | SGLang, LiteLLM                   | UnifiedRadixCache、多 GPU 路由、云成本跟踪 |
| **底层硬件调优**          | llama.cpp, vLLM                   | Metal Flash Attention（Apple Silicon）、Vulkan/Rocm 优化、SYCL 图重播 |

> 🔥 **前沿洞察**：**vLLM** 与 **SGLang** 在推测解码正确性与硬件专属内核调优方面处于领先地位。**llama.cpp** 在跨平台底层性能表现优异，尤其在 Apple Silicon 与 Vulkan 平台。

---

### **5. 层级定位**

| 项目       | 主要层级                  | 次要角色                             | 核心差异 |
|------------|---------------------------|--------------------------------------|----------|
| **vLLM**   | 推理引擎                  | 模型服务（通过 OpenAI API）           | 高吞吐、支持 Blackwell、推测解码 |
| **SGLang** | 推理引擎 + 网关           | 多模型编排、智能体工作流              | 对 EAGLE/DSpark 支持强，扩展 ROCm |
| **llama.cpp** | 本地运行时 / 边缘引擎   | 离线推理工具                         | 跨后端（Metal/Vulkan/SYCL）、决策模型支持 |
| **Ollama** | 网关 / 开发者体验         | 自托管推理编排                        | 简单 CLI、支持 MLX/ROCm/CUDA，但不稳定 |
| **LiteLLM** | API 网关 / 编排          | 成本监控、追踪、多提供者路由         | 预算强制执行、OTLP 可观测性、支持 Reka/QuickSilver |
| **Unsloth** | 微调框架                 | 智能体工作室、训练数据管理            | 快速训练、UI 改进，但存在回归问题 |

> 💡 **层级总结**：  
> - **引擎层**：vLLM、SGLang  
> - **本地运行时**：llama.cpp  
> - **网关层**：Ollama、LiteLLM  
> - **微调层**：Unsloth  

---

### **6. 趋势信号**

#### **从今日活动提取的关键趋势**：
1. **硬件专属性加速演进**：  
   - Blackwell（SM120）与 AMD RDNA/GFX1151 正推动针对性内核优化（如 SM120 上的 FA4 崩溃、ROCm MoE 支持）。  
   - **信号**：开发者必须考虑针对特定 GPU 架构的配置——“通用适配”已不再可行。

2. **智能体工作负载主导功能优先级**：  
   - llama.cpp 中的 Nimble/Clef 决策模型、SGLang 中的 EAGLE/DSpark 推测、Ollama/LiteLLM 中的工具调用保真度，均指向智能体成为新的核心用例。  
   - **信号**：未来更多工具将优先保障确定性输出、有状态会话与结构化推理，而非单纯追求速度。

3. **安全与可观测性不可妥协**：  
   - LiteLLM 现已通过 cosign 对 Docker 镜像签名；Ollama 因工具调用处理故障引发信任危机。  
   - **信号**：生产级部署要求可验证构建与端到端可追溯性。

4. **优化中的遗憾权衡**：  
   - Unsloth 在 `b10715` 后出现 2.9 倍性能下降，Ollama 的内存解除映射延迟，vLLM 的 MTP 失败，均表明激进优化可能引入不稳定性。  
   - **信号**：稳定性测试必须与性能提升同步加强——尤其在智能体流水线中。

#### **应用开发者应关注事项**：
- 在 #59724 与 #42012 合并前，避免在 SM120 上使用 vLLM 与 SGLang 的夜间版本。
- 若使用 `tool_calls`，建议锁定 Ollama 版本至 v0.35.0 或更早。
- 在 vLLM 中使用 `download-kernels` 以避免启动延迟。
- 监控 LiteLLM 预算强制执行缺陷——勿依赖 v1.82.3–v1.90.2 版本中的 `max_budget`。
- 预期 Unsloth 与 Ollama 将实施更严格的模型固定策略——设计时需围绕受管状态连续性展开。

> ✅ **最终建议**：随着基础设施日趋成熟，**分层韧性**（硬件感知、安全、可观测、稳定）将比原始吞吐量更重要。选择工具不仅看速度，更要关注其在智能体工作负载下的**可预测性**。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-03**

---

### **1. 今日亮点**  
vLLM 项目持续聚焦下一代硬件的稳定性与性能优化，重点修复了 Blackwell（SM120）GPU 支持及推测解码正确性问题。今日关键 PR 包括：在原生 FLASHINFER_MLA_SPARSE_SM120 后端下，GLM-5.3-Flash 模型的 MTP 接受率降至 0% 的问题修复，以及对异步 KV 加载和睡眠模式下的 CUDA graph 卸载的改进。

---

### **2. 发布与破坏性变更**  
过去 24 小时内无报告。未发布新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **Blackwell（SM120）**：针对 RTX PRO 6000 Blackwell（8xTP）和 RTX 5080 的开发与漏洞修复正在进行；正在解决 `--enforce-eager`、CUDA graph 捕获及推测解码接受率相关的关键问题 ([#56892](https://github.com/vllm-project/vllm/issues/56892), [#59724](https://github.com/vllm-project/vllm/issues/59724))。  
- **ROCm（gfx950 / MI355X）**：持续优化 Qwen3.8-2.4T-A95B 与 GLM-5.3-Flash；新增 MoE 模型中填充正确性的测试覆盖 ([#57149](https://github.com/vllm-project/vllm/issues/57149), [#59333](https://github.com/vllm-project/vllm/pr/59333))。  
- **新模型**：追踪 Kimi K3 支持 ([#50001](https://github.com/vllm-project/vllm/issues/50001)) 与 DeepSeek-V4.1-Flash 支持 ([#56892](https://github.com/vllm-project/vllm/issues/56892))。

---

### **4. 性能与优化**  
- **推测解码**：已合并 SM120 上使用 GLM-5.3-Flash 时 MTP 接受率下降问题的修复 ([#59724](https://github.com/vllm-project/vllm/issues/59724))，并持续推进正确性测试的统一工作 ([#59566](https://github.com/vllm-project/vllm/issues/59566))。  
- **KV 缓存与卸载**：改进异步 KV 加载零化竞争条件的预防机制 ([#59504](https://github.com/vllm-project/vllm/pr/59504))，并按层级暴露缓存的提示词 token ([#56318](https://github.com/vllm-project/vllm/pr/56318))。  
- **内核与内存效率**：新增 `vllm download-kernels` 命令，用于预下载 FlashInfer 内核，避免运行时编译 ([#58765](https://github.com/vllm-project/vllm/pr/58765))。  
- **睡眠模式**：通过启用 `sleep_mode_offload_cudagraph` 选项，主动释放 CUDA graph 池，降低大规模 MoE 部署中的内存压力 ([#59160](https://github.com/vllm-project/vllm/pr/59160), [#59523](https://github.com/vllm-project/vllm/pr/59523))。

---

### **5. 稳定性与回归问题**  
- **严重**：在夜间构建版本中，使用 `FLASHINFER_MLA_SPARSE_SM120` 后端时，GLM-5.3-Flash 出现 0% 的 MTP 接受率问题 ([#59724](https://github.com/vllm-project/vllm/issues/59724)) — **PR #59724 已开放**。  
- **高严重性**：使用 `--enforce-eager` 并在 SM120 上运行时，DeepSeek-V4.1-Flash 解码吞吐量极低，且 CUDA graph 无法使用 ([#56892](https://github.com/vllm-project/vllm/issues/56892))。  
- **中等**：在 RTX 5080（SM120）上，尽管引擎初始化成功，Qwen3-VL-8B-FP8 在生成过程中无声卡死 ([#46625](https://github.com/vllm-project/vllm/issues/46625))。  
- **低**：GLM-5.3-Flash 的 kpool 索引器在 ROCm 上会覆盖自身 KV 缓存 ([#54359](https://github.com/vllm-project/vllm/issues/54359))；模型仍可运行，但长上下文召回性能下降。

---

### **6. 对应用开发者的影响**  
- **避免在 SM120 上使用夜间构建**：若在 Blackwell GPU 上部署 DeepSeek-V4.1-Flash 或 GLM-5.3-Flash，建议使用稳定版本，直至 [#59724](https://github.com/vllm-project/vllm/issues/59724) 合并。  
- **启用 `download-kernels`**：安装后使用 `vllm download-kernels`，避免因内核编译带来的启动延迟，尤其适用于 Hopper+ GPU。  
- **监控睡眠模式内存使用**：对于大型 MoE 模型，启用 `sleep_mode_offload_cudagraph` 以防止空闲期间内存膨胀。  
- **前缀缓存与推测解码**：使用混合注意力模型（如 DeepSeek-V4-Flash + DSpark）时需谨慎——在 MTP 推测解码下，前缀缓存复用可能被禁用，直到 [#52244](https://github.com/vllm-project/vllm/pr/52244) 合并。  
- **使用稳定镜像标签**：若使用 Transformers 5.15.0，避免使用 `vllm/vllm-openai:latest` —— 已知其与 Gemma4 不兼容 ([#51744](https://github.com/vllm-project/vllm/issues/51744))。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-03

---

### **1. 今日亮点**

SGLang 持续推进对推测解码和多模型服务的支持，修复了影响实际推理负载的 EAGLE 与 DSpark 性能问题。新提交（PR）聚焦于分布式和流式场景下的鲁棒性——尤其在 radix 缓存行为、GPU 内存管理以及跨平台兼容性方面；社区也在积极推进 AMD ROCm 集成及 MoE/Flash attention 优化工作。

---

### **2. 发布与破坏性变更**

*过去 24 小时内未发布新版本。*

> ✅ *注：最新稳定版本仍为 `v0.5.21`（截至 2026-09-18）。用户应验证与 `main` 分支即将更新内容的兼容性，特别是 `--enable-streaming-session` 和 `UnifiedRadixCache` 的使用。*

---

### **3. 新模型与硬件支持**

- **AMD ROCm 支持扩展**：  
  - PR #41389 在 RDNA GPU（gfx1151）上通过 Triton 内核启用 W4A16 MoE 推理，对在 Radeon 8060S / Strix Halo 上运行 Quark MXFP4 模型（如 `amd/Qwen3.5-35B-A3B-MXFP4`）至关重要。  
  - Issue #35003 列出了更广泛的 AMD 发展路线图，涵盖 MI45x（gfx1250）、Helios 机架系统以及 Ryzen AI Halo（gfx1151/1152）平台。  
  🔗 [PR #41389](https://github.com/sgl-project/sglang/pull/41389) | 🔗 [Issue #35003](https://github.com/sgl-project/sglang/issues/35003)

- **NPU（Ascend）MoE 修复**：  
  PR #39351 修复了 AscendTPDispatcher 中关键的 FP32 → 隐式数据类型下采样错误，该问题会破坏 MoE 路由精度。  
  🔗 [PR #39351](https://github.com/sgl-project/sglang/pull/39351)

- **模型特定优化**：  
  - PR #42203 为 DeepSeek-V4 添加保护机制，防止不兼容的 LoRA + NVFP4 共享专家融合导致无声失败。  
  - Issue #42170 跟踪 DeepSeek V4.1 的持续优化，包括 mHC 清理和 TP 改进。  
  🔗 [PR #42203](https://github.com/sgl-project/sglang/pull/42203) | 🔗 [Issue #42170](https://github.com/sgl-project/sglang/issues/42170)

---

### **4. 性能与优化**

- **推测解码增强**：  
  - PR #42281 在 DSpark 中引入每步静态验证宽度选择，提升批处理大小 >64 时的效率。  
  - PR #42178 通过将 k-pool 页面逻辑与逻辑 token 边界对齐，解决了 GLM-5.3-Flash 在 EAGLE 推测下前缀复用崩溃的问题。  
  🔗 [PR #42281](https://github.com/sgl-project/sglang/pull/42281) | 🔗 [PR #42178](https://github.com/sgl-project/sglang/pull/42178)

- **内核与内存效率**：  
  - PR #42264 修复 HiCache 中写回 SWA 断言失败问题，使滑动窗口模型可稳定运行。  
  - PR #42295 强制将 `UnifiedRadixCache` 设为流式会话默认值，防止无效树缓存使用。  
  - PR #42254 增加 Foundry Adapter 文档，扩展工具链集成能力。  
  🔗 [PR #42264](https://github.com/sgl-project/sglang/pull/42264) | 🔗 [PR #42295](https://github.com/sgl-project/sglang/pull/42295) | 🔗 [PR #42254](https://github.com/sgl-project/sglang/pull/42254)

- **硬件加速**：  
  - PR #29839 集成腾讯 hpc-ops attention 与 MoE 后端，支持 Hopper GPU（H20/H200），有望在生产规模推理中实现业界领先性能。  
  🔗 [PR #29839](https://github.com/sgl-project/sglang/pull/29839)

---

### **5. 稳定性与回归问题**

| 严重性 | 问题 | 影响 | 状态 |
|--------|------|--------|--------|
| ⚠️ 高 | #42012 – FA4 attention 后端在 SM120（RTX PRO 6000）上混合扩展时崩溃 | GLM-5.3-Flash 在 CUDA graph 捕获阶段失败；仅 Triton 可用 | 开放，暂无修复 |
| ⚠️ 高 | #32459 – EAGLE 推测解码导致 radix 前缀复用崩溃（97% → 40–53%） | 多轮代理流量出现严重延迟波动 | 已关闭（无崩溃），但仍是活跃问题 |
| ⚠️ 中 | #34974 – DSPARK 在 `on_select_experts scatter_add_` 维度不匹配时崩溃 | 草稿 CUDA graph 捕获阶段失败 | 开放，暂无修复 |
| ⚠️ 中 | #37633 – QSA 扩展中出现 CUDA 非法内存访问（8 并发请求） | H20 TP8 在高负载下崩溃 | 开放，已有临时方案（`CUDA_LAUNCH_BLOCKING=1`） |
| ⚠️ 低 | #42143 – HarmonyParser 将工具参数误作为推理内容输出 | 流式输出分类错误 | 开放，轻微用户体验影响 |

> 🔗 [Issue #42012](https://github.com/sgl-project/sglang/issues/42012) | 🔗 [Issue #32459](https://github.com/sgl-project/sglang/issues/32459) | 🔗 [Issue #34974](https://github.com/sgl-project/sglang/issues/34974) | 🔗 [Issue #37633](https://github.com/sgl-project/sglang/issues/37633) | 🔗 [Issue #42143](https://github.com/sgl-project/sglang/issues/42143)

---

### **6. 对应用开发者的启示**

- 在 #32459 修复前，请避免在 GLM-DSA NVFP4 模型上使用 EAGLE 推测——预计前缀复用率下降高达 60%，长期运行的代理吞吐量显著降低。
- 在 SM120（RTX PRO 6000）上运行 GLM-5.3-Flash 时，请使用 Triton 而非 FA4，以规避已知的 CUDA graph 崩溃问题。
- 若使用流式会话，请显式启用 `UnifiedRadixCache`——避免在纯 SWA 或 FlexKV 模型中使用不支持的树缓存。
- 部署 LoRA adapter 至 DeepSeek-V4 或 LFM2 前，请验证模型特定配置；确保融合路径与量化及 LoRA 设置兼容。
- 请通过 #17050 监控 CI 稳定性：今日报告 2 个失败、5 个不稳定测试——可能影响夜间构建与部署流水线。

> 💡 *最佳实践*：对于高并发或低延迟应用，若遇到意外缓存缺失或崩溃，可临时禁用推测解码。可使用 `--disable-overlap-schedule` 或 `CUDA_LAUNCH_BLOCKING=1` 作为临时解决方案。

---

*本摘要基于 2026-10-03 的 GitHub 活动整理。如需实时更新，请加入 [SGLang Slack](https://slack.sglang.io)。*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-03**

---

### **1. 今日亮点**  
最新版本（`b11364`）引入了对 *Nimble Decision Model* 的支持，进一步拓展了 llama.cpp 在代理驱动工作流中的能力。性能方面，Metal 后端新增了针对 F16 KV 的 flash attention 内核，全面支持 attention sinks、ALiBi 和 logit softcap——这对在 Apple Silicon 上实现高吞吐推理至关重要。与此同时，Vulkan 与 SYCL 后端也针对 GLM、Intel Arc 和 MoE 模型进行了针对性优化。

---

### **2. 发布与破坏性变更**  
- `b11364`：通过 `model: support nimble decision model` 添加运行时对 **Nimble Decision Model** 的支持 ([#29844](https://github.com/ggml-org/llama.cpp/pull/29844))。  
- `b11362`：引入 **Metal tensor API flash attention 内核（F16 KV）**，支持 attention sinks、ALiBi 与 logit softcap ([#29570](https://github.com/ggml-org/llama.cpp/pull/29570))。  
- `b11355`：为共享内存为 32KB 的三星 GPU 禁用大尺寸 matmul tile，以避免崩溃 ([#28531](https://github.com/ggml-org/llama.cpp/pull/28531))。  
- `b11351`：向 `ggml_backend_buffer_type_i` 接口添加 `alloc_buffer_n`，以提升缓冲区管理能力 ([#23671](https://github.com/ggml-org/llama.cpp/pull/23671))。

> ✅ **迁移提示**：新的 Metal FA 内核可能需要重新配置 `--flash-attn` 与 `--logit-softcap` 参数以获得最佳行为。

---

### **3. 新模型与硬件支持**  
- **模型**：  
  - 通过 `model: add support for clef decision model` 添加对 **Clef Decision Model（仅文本）** 的支持 ([#29831](https://github.com/ggml-org/llama.cpp/pull/29831))。  
  - 在运行时添加对 **Prism Bonsai 2 27B** 的支持 ([#29600](https://github.com/ggml-org/llama.cpp/pull/29600))。  
  - 更新 `convert_hf_to_gguf.py` 以支持 **Qwen3.5 嵌入模型** ([#27920](https://github.com/ggml-org/llama.cpp/pull/27920))。  

- **硬件与后端**：  
  - **Hexagon**：新增 `q2_k` 与 `q3_k` 量化支持 ([#29717](https://github.com/ggml-org/llama.cpp/pull/29717))。  
  - **Vulkan**：改进管线编译期间的日志输出 ([#29794](https://github.com/ggml-org/llama.cpp/pull/29794))。  
  - **SYCL**：新增图记录与回放功能 ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725))。  
  - **OpenVINO**：升级至 2026.4.1，增强 MoE 融合能力与设备列表显示 ([#29852](https://github.com/ggml-org/llama.cpp/pull/29852))。

---

### **4. 性能与优化**  
- **Metal**：flash attention 内核（F16 KV）支持高效推测解码，配合 attention sinks 与 ALiBi。  
- **Vulkan**：通过 subgroup reductions 优化 RMS norm，显著提升 Intel Arc B70 与 RTX 4060 Ti 的吞吐量 ([#29882](https://github.com/ggml-org/llama.cpp/pull/29882))。  
- **CUDA**：采用分段基数排序优化多行 TOP_K，降低解码延迟 ([#29883](https://github.com/ggml-org/llama.cpp/pull/29883))。  
- **SYCL**：通过 MKL flash attention 加速 GLM MLA 预填充，并优化 IQ3_S/MMVQ 布局 ([#29171](https://github.com/ggml-org/llama.cpp/pull/29171), [#29696](https://github.com/ggml-org/llama.cpp/pull/29696))。  
- **MoE**：GPU 居住的 LRU 缓存用于主机卸载专家，减少解码停顿，缓解 RAM 带宽压力 ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861))。

---

### **5. 稳定性与回归问题**  
今日报告的关键稳定性问题包括：  
- **Vulkan Flash Attention 崩溃**：在使用 Vulkan 后端的 AMD GPU 上出现严重性能下降或崩溃 ([#25207](https://github.com/ggml-org/llama.cpp/issues/25207))。  
- **Metal Gemma 4 31B OOM**：Apple M5 Max 上因默认 `n_ctx` 过大导致内存错误 ([#29521](https://github.com/ggml-org/llama.cpp/issues/29521))。  
- **Adreno 驱动中止**：在 Qualcomm Adreno 驱动上启用 `-ngl >= 1` 时 `llama.cpp` 无声崩溃 ([#29786](https://github.com/ggml-org/llama.cpp/issues/29786))。  
- **Draft-MTP 提示损坏**：在 AMD RADV/Vulkan 上处理提示时触发 `DeviceLost` 错误 ([#27306](https://github.com/ggml-org/llama.cpp/issues/27306))。  
- **推测解码崩溃**：`gemma4-assistant` 在 MTP + flash attention 下查询头维度不匹配 ([#29419](https://github.com/ggml-org/llama.cpp/issues/29419))。  

> ⚠️ **注意**：目前尚无 PR 解决上述回归问题；用户应避免在 Vulkan 与 AMD 平台上使用 `--spec-type draft-mtp` 搭配 Flash Attention，直至修复完成。

---

### **6. 对应用开发者的意义**  
- **代理与决策引擎**：随着 Nimble 与 Clef 模型的支持，你可直接在 llama.cpp 内部署结构化推理流水线，无需外部协调。  
- **高吞吐推理**：利用 Metal 新版 flash attention 内核，在 Apple Silicon 设备上实现更快的推测解码——非常适合实时聊天代理。  
- **多 GPU 与 MoE 优化**：借助 GPU 居住的 LRU 缓存处理 MoE 模型，当专家卸载至 CPU 内存时可有效降低延迟。  
- **推测解码需谨慎**：在 Vulkan 与 AMD 平台，使用 Flash Attention 时请避免 `draft-mtp`，待稳定性修复后再启用。  
- **构建健壮性**：建议使用 `--log-level debug` 并密切监控日志——如 Adreno 的无声崩溃等问题仍待解决。

> 🔗 [官方发布页](https://github.com/ggml-org/llama.cpp/releases/tag/b11364) | [GitHub 问题](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-03**

---

### **1. 今日亮点**  
Ollama Cloud Pro 出现严重回归问题，导致所有云托管模型的失败率高达95%，付费客户无法正常使用该服务——这是今日最高优先级问题。本地端方面，自 v0.35.1 以来出现多个稳定性与性能下降问题，尤其影响 macOS（M4 Pro）上的 MLX、Windows 上的 Vulkan GPU 检测以及 ROCm 的 VRAM 利用率。与此同时，PR 活动显示在工具调用解析正确性、模型运行时支持（MLX/ROCm/CUDA）以及与代理框架集成方面进展强劲。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未发布新版本。然而，**Ollama v0.35.1** 因多项破坏性问题正受到密切关注：
- **Windows 安装程序签名失败**（`HashMismatch`），见 [#18765](https://github.com/ollama/ollama/issues/18765) — 可能阻碍企业部署。
- `/v1/chat/completions` 端点现在错误地按位置关联工具结果，而非 `tool_call_id` ([#18762](https://github.com/ollama/ollama/issues/18762))，破坏了代理中确定性工具执行。

> 🔔 *正在生产环境中使用 `tool_calls` 的开发者应验证 v0.35.1 行为，直至修复 PR 上线。*

---

### **3. 新模型与硬件支持**  
- **MLX 引擎**：通过 PR [#17972](https://github.com/ollama/ollama/pull/17972) 增加对 `GraniteForCausalLM` 架构的支持，使 Apple Silicon 上可使用 IBM Granite 4.1/4.2 模型。
- **ROCm + CUDA 双运行时支持**：在 [#18545](https://github.com/ollama/ollama/issues/18545) 中提出；目前尚未实现，但已被确认为多 GPU 系统的高优先级功能。
- **Intel UHD Vulkan 检测**：问题 [#18672](https://github.com/ollama/ollama/issues/18672) 报告，在 v0.34.4 版本中 Windows 上的 Intel iGPU 无法通过 Vulkan 后端被识别 — 存在硬件兼容性缺口。

---

### **4. 性能与优化**  
- **M4 Pro 上 MLX 引擎效率低下**：问题 [#18754](https://github.com/ollama/ollama/issues/18754) 显示，v0.40.0 中 Qwen 3.8（27B）并未充分利用 48GB 的可用 GPU 内存。回退至 v0.35.1-rc2 可恢复正常内存使用。
- **空闲后 MLX 权重未映射**：PR [#18744](https://github.com/ollama/ollama/issues/18744) 揭示，每次请求后约 2 秒，MLX 会解除模型权重映射，导致在内存压力下后续查询触发页加载 — 严重影响长周期服务延迟。
- **淘汰过程中忽略 ROCm VRAM**：[#18756](https://github.com/ollama/ollama/issues/18756) 确认，即使统一 VRAM 可用，旧模型仍因错误的 VRAM 计算被提前淘汰。

> ✅ *修复进行中：PR [#18755](https://github.com/ollama/ollama/pull/18755) 旨在将决策准备与前向传播解耦，提升 Strands Decider 及未来推理流水线的效率。*

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 链接 | 状态 |
|--------|------|------|--------|
| 🔴 严重 | Ollama Cloud Pro：所有云模型失败率达 95% | [#15453](https://github.com/ollama/ollama/issues/15453) | 已打开 |
| 🔴 高 | Llama3.2-vision 在最新更新后损坏 | [#16490](https://github.com/ollama/ollama/issues/16490) | 已打开 |
| 🟡 中等 | 工具调用标签在分块边界处丢失 | [#18681](https://github.com/ollama/ollama/issues/18681) | 已打开 |
| 🟡 中等 | `/v1/chat/completions` 错误按索引关联工具结果 | [#18762](https://github.com/ollama/ollama/issues/18762) | 已打开 — 修复 PR 已提交：[#18763](https://github.com/ollama/ollama/pull/18763) |
| 🟡 中等 | MLX 权重在空闲后未映射（约 2 秒延迟） | [#18744](https://github.com/ollama/ollama/issues/18744) | 已打开 |
| 🟡 中等 | ROCm VRAM 在模型淘汰期间未正确计算 | [#18756](https://github.com/ollama/ollama/issues/18756) | 已打开 |

> ⚠️ **值得注意**：多个回归源于近期对流式解析器、工具调用处理和运行时调度逻辑的修改。这些问题同时影响本地与云端工作流。

---

### **6. 对应用开发者的启示**  
- 若使用 `tool_calls` 或 `systemone` 端点，请避免 v0.35.1+ 版本 — 预期会出现结果错误关联及潜在崩溃。请使用 v0.35.0 或更早版本，直至修复上线。
- **云用户**：若依赖 Ollama Cloud Pro，需为中断做好准备 — 考虑临时迁移到自托管实例或评估替代方案。
- **macOS/M4 开发者**：请注意，MLX 可能无法完全利用 GPU 内存；在负载下注意页面加载延迟。必要时可降级。
- **多 GPU 用户（NVIDIA + AMD）**：目前无法同时运行 CUDA 与 ROCm 后端 — 此需求已在 [#18545](https://github.com/ollama/ollama/issues/18545) 中提出。
- **代理集成者**：确保解析逻辑能处理部分工具标签 — [#18759](https://github.com/ollama/ollama/pull/18759) 已解决此问题，但下游应用必须验证输入完整性。

> 💡 *建议*：在 CI/CD 流水线中锁定 Ollama 版本，并密切监控 GitHub 问题。考虑仅在确认 blob 清理行为后使用 `ollama create --quantize` — 量化后未引用的 F16 blob 仍会残留 ([#18416](https://github.com/ollama/ollama/issues/18416))。

---  
*摘要生成时间：2026-10-03 | 来源：[github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-10-03**

---

### **1. 今日亮点**  
LiteLLM 项目持续快速演进，关键修复涵盖预算控制、追踪可靠性以及模型兼容性问题，尤其针对 Anthropic Sonnet 5.5 及 Bedrock 定价机制。重点 PR 解决了高严重性问题，如静默绕过预算限制（`#26672`）、自定义模型成本跟踪错误（`#35691`），以及 Azure GPT-5 上 `reasoning_effort='none'` 处理不当（`#31243`）。新增对 Reka 与 QuickSilver Pro 的支持，进一步拓展了与 OpenAI 兼容的推理选项。

---

### **2. 发布与破坏性变更**  
- **v1.105.0-dev.2** 今日发布，重点强化安全性：所有 Docker 镜像现通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 签名。  
  🔐 使用 `cosign verify` 并以提交 `0112e53` 中提供的公钥验证签名。  
  → [GitHub 发布说明](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-dev.2)  

本版本周期内未报告任何破坏性 API 变更。

---

### **3. 新模型与硬件支持**  
- ✅ **Reka** 作为首类原生兼容 OpenAI 的服务提供商加入（`reka/`），通过 [PR #44278](https://github.com/BerriAI/litellm/pull/44278)。  
- ✅ **QuickSilver Pro** 现可通过 `quicksilverpro/` 提供商实现原生支持（[PR #44303](https://github.com/BerriAI/litellm/pull/44303)）。  
- ✅ **CoralBricks**（GLM 5.3、DeepSeek V4.1 Flash）已集成，支持完整成本追踪与配置管理（[PR #35957](https://github.com/BerriAI/litellm/pull/35957)）。  
- ✅ **Amazon Nova 2 Pro（预览版）** 现已在 Bedrock 目录中正确按标准层级定价（[PR #44302](https://github.com/BerriAI/litellm/pull/44302)）。

---

### **4. 性能与优化**  
- 🚀 **提示缓存资格优化**：PR [#44221](https://github.com/BerriAI/litellm/pull/44221) 移除了缓存资格检查中的完整对话分词，显著降低长上下文路由延迟。  
- 📊 **OTEL Span 效率优化**：PRs [#44240](https://github.com/BerriAI/litellm/pull/44240) 与 [#44148](https://github.com/BerriAI/litellm/pull/44148) 优化了 PostgreSQL span 命名并减少不必要的 DB I/O，提升可观测性性能。  
- ⏱️ **流式重试逻辑修复**：PR [#44276](https://github.com/BerriAI/litellm/pull/44276) 确保 `/v1/messages` 流在首个内容块前中断时可正常重试——对 Databricks AI 后端稳定性至关重要。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |
|--------|------|------|--------|
| 🔴 高 | 尽管支出超过限额，`key/max_budget` 仍被绕过（`#26672`） | 开放 | ❌ 尚无修复 |
| 🔴 高 | `reasoning_effort='none'` 在 Azure GPT-5 上因忽略基础模型而失败（`#31243`） | 已关闭 | ✅ [PR #44299](https://github.com/BerriAI/litellm/pull/44299)（修复推理映射） |
| 🔴 高 | `model_max_budget` 未对最终用户生效（`#31842`） | 开放 | ❌ 尚无修复 |
| 🟡 中 | Ollama 模型的 MCP 工具自动执行被静默跳过（`#31911`） | 开放 | ❌ 尚无修复 |
| 🟡 中 | OTLP span 事件在存入 ClickHouse 前丢失（`#44274`） | 开放 | ❌ 尚无修复 |
| 🟡 中 | `REDIS_CLUSTER_NODES` 下 Redis 集群关闭失败（`#31206`） | 开放 | ❌ 尚无修复 |

> 💡 注意：尽管近期有活跃开发，多个高严重性缺陷仍处于开放状态——依赖预算控制或代理工具链的用户应密切监控。

---

### **6. 对应用开发者的影响**  
- **预算与成本控制**：若依赖 `max_budget` 强制执行，请避免使用 v1.82.3–v1.90.2 版本——存在导致无限支出的风险。建议升级至最新稳定版，或使用经签名验证的 `v1.105.0-dev.2`。  
- **代理开发**：确保工具链使用 `openai/` 路由调用 Ollama 模型，以避免静默的 MCP 执行失败（`#31911`）。考虑切换至 Reka 或 QuickSilver Pro 等原生提供方，以获得更优的成本可见性。  
- **可观测性**：启用 OTEL v2 并配置 `litellm_otel_postgres_span_operation_table` 与 `cache_token_counts` 属性（通过 #43992），深入洞察提示缓存与调用链路。  
- **安全性**：始终使用 `cosign` 验证 Docker 镜像签名——现已为生产部署强制要求。  
- **未来兼容性**：关注 `#361`（愿望清单）中即将推出的特性，如共享钱包回退（`#43652`）与增强标签功能（`#44289`），将显著提升团队级成本治理能力。

👉 保持领先：关注 [Discord](https://discord.gg/berriai) 并追踪上述链接的 PR 以获取实时更新。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-10-03**

#### **1. 今日亮点**  
Unsloth 生态系统持续扩展以代理为中心的工具链，Studio 在多模型管理、工具调用保真度和训练数据完整性方面迎来重大 UI/UX 改进。近期版本中发现关键性能退化——自 `b10715-mix-86bd2d3` 起，**张量拆分解码速度下降了 2.9 倍**，对双 GPU 配置用户造成显著影响。与此同时，微调过程中持续存在的显存（VRAM）过度占用问题仍是首要关切，即便模型被宣传为内存高效，仍有多起报告称出现内存溢出（OOM）。

#### **2. 版本发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
但多个 PR 显示即将发生变更：  
- **PR #12573**：修复 `unsloth start openclaw` 中硬性 8,192 标记符截断问题——这对长上下文生成是重大限制。  
- **PR #12569**：回滚 10 个已合并的 PR，待 Codex 审核收敛后执行，表明内部质量控制正在收紧。  
- **PR #12588**：通过固定 `dynamic_scale_rblock`，解决跨服务器图像生成不一致问题，提升 FLUX.1-schnell 推理的可复现性。

> 🔗 [PR #12573](https://github.com/unslothai/unsloth/pull/12573) | [PR #12569](https://github.com/unslothai/unsloth/pull/12569) | [PR #12588](https://github.com/unslothai/unsloth/pull/12588)

#### **3. 新模型与硬件支持**  
- **Qwen3-TTS**：功能请求 (#3951) 指出对 LoRA 微调支持的需求，目前等待实现。  
- **Gemma 3 (Vision)**：问题 #12554 指出保存/加载仅文本变体的视觉语言模型（VLM）存在问题，暗示模型变体处理尚不完整。  
- **多卡训练**：通过 #5764 提出需求；尽管脚本支持 `device_map`，当前仍仅限单卡使用。  
- **Windows 后端路径自定义**：PR #11327 允许配置后端安装路径，便于在受限环境中部署。

> 🔗 [Issue #3951](https://github.com/unslothai/unsloth/issues/3951) | [Issue #12554](https://github.com/unslothai/unsloth/issues/12554) | [Issue #5764](https://github.com/unslothai/unsloth/issues/5764) | [PR #11327](https://github.com/unslothai/unsloth/pull/11327)

#### **4. 性能与优化**  
- **严重性能退化**：张量拆分解码（`--split-mode tensor`）自 `b10715-mix-86bd2d3` 后**速度下降 2.9 倍**，从之前的 **115–118 t/s** 降至 RTX 5070 Ti 上的 **约 48 t/s**。根本原因可能与 CUDA 图限制（`max_cuda_graphs = 64`）或内核启动开销有关。  
- **API 延迟开销**：兼容 OpenAI 的 API 每次请求增加 **约 1.2 秒固定延迟**（问题 #12364），严重拖累短文本任务性能。  
- **FP8/FP4 导出**：未经同意自动安装 `llm-compressor` 引发安全担忧（问题 #8904）。

> 🔗 [Issue #12468](https://github.com/unslothai/unsloth/issues/12468) | [Issue #12364](https://github.com/unslothai/unsloth/issues/12364) | [Issue #8904](https://github.com/unslothai/unsloth/issues/8904)

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|-------|-------------|------------|
| ⚠️ 高 | #4504 | 微调实际消耗的 VRAM **远超宣传水平**，即使量化声称高效，大模型仍频繁触发 OOM。 | ❌ 尚无修复；影响所有尝试大模型微调的用户 |
| ⚠️ 高 | #9867 / #10017 | `Qwen3.8-27B-bnb-4bit` 在前向传播中因 `quant_state` 加载不当导致形状不匹配而崩溃。 | ✅ 补丁正在审核中（参见 #10276） |
| ⚠️ 中 | #12518 | “生成进度停滞” + `chat_generation_run_lease_expired` 错误干扰长时间运行的代理任务。 | ❌ 尚无已知解决方案 |
| ⚠️ 中 | #12467 | 若模型保存了 `gpu_ids`，则拒绝 `--mmproj-device CUDA1`，破坏视觉模型路由逻辑。 | ❌ 未解决 |

> 🔗 [Issue #4504](https://github.com/unslothai/unsloth/issues/4504) | [Issue #9867](https://github.com/unslothai/unsloth/issues/9867) | [Issue #12518](https://github.com/unslothai/unsloth/issues/12518) | [Issue #12467](https://github.com/unslothai/unsloth/issues/12467)

#### **6. 对应用开发者的影响**  
- 若依赖 **多卡张量拆分**，请避免使用近期构建版本（`b10715-mix-86bd2d3+`）——预计吞吐量严重下降。建议使用 `b10687-mix-67dfc8b` 或官方 `ggml-org` 构建以保证性能稳定。  
- **微调需谨慎**：VRAM 膨胀漏洞（#4504）使宣传的内存效率失效——务必密切监控实际显存使用，尤其针对 27B+ 规模模型。  
- **代理工作流可能中断**：导出时工具调用被丢弃（#12574），且 API 延迟可能主导响应时间。对于低延迟应用，建议绕过 Studio 的 OpenAI 端点。  
- **未来兼容性设计**：预期将加强模型锁定与状态持久化（如 #12549），因此应围绕托管账户状态连续性进行架构设计。

> 🔗 [所有追踪问题在此处](https://github.com/unslothai/unsloth/issues?q=is%3Aopen+sort%3Aupdated-desc)

---  
*摘要生成时间：2026-10-03 | 来源：github.com/unslothai/unsloth*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*