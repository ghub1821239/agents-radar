# AI 基础设施日报 2026-10-12

> 生成时间: 2026-10-12 01:44 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **跨项目AI基础设施生态报告 – 2026-10-12**

---

#### **1. 生态概览**  
2026年第四季度的AI基础设施格局由下一代硬件（Blackwell SM120）、MoE与混合模型的普及，以及对生产级推理稳定性日益增长的需求所定义。各项目正愈发聚焦于规模化端到端性能——尤其在推测解码、KV缓存效率和内核级优化方面——同时保持对多样化后端的向后兼容性。多模态模型（Qwen3-Omni、Gemma-4 MM）、扩散工作流及决策代理的一流支持能力出现，标志着向全栈生成式应用的转变。关键稳定性问题依然存在，特别是在分布式环境和边缘部署中，凸显性能提升必须与鲁棒性并重。

---

#### **2. 活动对比**

| 项目       | 开放问题 | 开放PR | 发布状态       | 关键备注 |
|------------|----------|--------|----------------|---------|
| **vLLM**   | 87       | 142    | 无新版本发布    | 高度关注Blackwell GPU稳定性；存在严重CUDA图与前缀缓存缺陷 |
| **SGLang** | 93       | 105    | 无新版本发布    | 重点投入SM120验证；扩散与Mamba模块存在高危崩溃 |
| **llama.cpp** | 96     | 134    | 无标签版本发布 | 强化OpenCL/Vulkan扩展；AMD/RDNA1后端出现多个回归问题 |
| **Ollama** | 102      | 88     | 无新版本发布    | 以稳定性为核心；macOS/Windows上工具调用与流式输出问题突出 |
| **LiteLLM** | 78      | 111    | v1.106.0-rc.1 已发布 | API稳定；强Rust集成与成本路由改进 |
| **Unsloth** | 84      | 120    | 无新版本发布    | 推进训练优化；Apple Silicon与Windows内存泄漏问题 |

> ✅ *LiteLLM在发布速度上领先；vLLM与SGLang因底层硬件压力测试导致问题数量居高。*

---

#### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------|------|--------|-----------|--------|---------|---------|
| **Glm4MoeLitePlusPlus** (ZCE) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **DeepSeek-V4.1-Flash** | ✅ | ✅ (生产环境 8× RTX PRO 6000) | ❌ | ❌ | ❌ | ❌ |
| **Qwen3-Omni** (音频+视觉) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **H2O-Lightning-4B** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Prism Bonsai 2 27B** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Gemma-4 E2B/E4B (OpenCL)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1 (GGUF)** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **DeepSeek-OCR & DeepSeek-OCR-2** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **ai& provider** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

> 🏆 **胜者：llama.cpp** — 在原始模型多样性与跨平台运行时支持方面领先，尤其在基于GGUF的多模态与决策模型上表现突出。  
> 🥈 **亚军：Unsloth** — 在视觉语言与扩散模型分类及训练支持方面最强。  
> 🥉 **第三名：LiteLLM** — 对新厂商（`ai&`）采纳最快，翻译保真度显著提升。

---

#### **4. 性能前沿**

| 关注领域               | vLLM                          | SGLang                        | llama.cpp                     | Ollama                | LiteLLM                    | Unsloth                      |
|--------------------------|-------------------------------|-------------------------------|-------------------------------|-----------------------|----------------------------|------------------------------|
| **KV缓存效率**  | ✅ 每请求池化字节数   | ⚠️ Mamba缓存驱逐       | ❌ (Vulkan下OOM)            | ⚠️ 混合固定       | ⚠️ 成本路由亲和性   | ✅ 统一抢占池   |
| **批处理与吞吐量** | ⚠️ SM120解码低        | ✅ 预填充优化       | ✅ GDN融合                 | ⚠️ 流式阻塞    | ✅ 会话亲和性产出   | ✅ 批量梯度拷贝（DDP）   |
| **量化**         | ✅ 仅支持FP8（无INT8） | ❌ GLM-5.3 FA4崩溃        | ✅ 混合精度支持    | ❌ MLX崩溃          | ✅ 原生Rust缓存     | ✅ LoRA-GA分块布局   |
| **分布式服务**   | ⚠️ CUDA图死锁       | ✅ 扩散预热控制       | ⚠️ RPC崩溃（MoE）          | ❌ 多GPU错位    | ✅ 基于成本路由      | ✅ DDP批量梯度同步   |
| **内核优化**     | ✅ ROCm MLA归一化     | ✅ Triton + mHC SP融合     | ✅ OpenCL GDN写回      | ❌ SDPA线程溢出   | ✅ 异步钩子卸载     | ✅ Metal核心绑定        |

> 🔥 **顶尖表现者**：  
> - **vLLM** 在内核级注意力优化方面占据主导（ROCm、SM120）。  
> - **Unsloth** 凭借 `batched_grad_copy` 在分布式训练效率上领先。  
> - **LiteLLM** 在异步编排与会话感知负载均衡方面表现出色。

---

#### **5. 层级定位**

| 项目       | 主要层级             | 角色摘要 |
|------------|----------------------|--------|
| **vLLM**   | **推理引擎**         | 面向现代GPU优化的高吞吐、低延迟服务引擎；深度内核集成。 |
| **SGLang** | **推理引擎 + 网关**   | 全栈推理平台，内置推测解码、扩散支持与面向客户端的API。 |
| **llama.cpp** | **本地运行时 / 边缘引擎** | 跨平台、自包含推理运行时，适用于嵌入式、移动端与异构设备。 |
| **Ollama** | **网关 / 本地开发平台** | 开发者优先的网关，提供CLI、REST API与代理脚手架；抽象后端复杂性。 |
| **LiteLLM** | **LLM网关 / 编排层**   | 通用API代理，支持多厂商路由、成本控制与标准化响应处理。 |
| **Unsloth** | **微调与训练框架**     | 支持高级LoRA、MoE与视觉语言模型的端到端训练加速器。 |

> 💡 **战略洞察**：  
> - **引擎层**：vLLM、SGLang（适用于云规模）。  
> - **运行时层**：llama.cpp（适用于边缘/低功耗场景）。  
> - **网关层**：Ollama、LiteLLM（用于抽象与可移植性）。  
> - **训练层**：Unsloth（适用于快速微调）。

---

#### **6. 趋势信号**

- **以硬件为先的开发模式**：所有项目均优先保障 **SM120（Blackwell）就绪性**——尤其是vLLM、SGLang与llama.cpp——表明新一代GPU已不再是生产推理的可选项。

- **MoE与混合模型已成为主流**：对MoE变体（如Glm4MoeLitePlusPlus、DeepSeek-V4.1-Flash）的支持正在加速，但伴随而来的是稳定性风险（如CUDA图死锁、错误的LoRA布局）。开发者必须仔细验证MoE工作流。

- **边缘与异构后端至关重要**：OpenCL（高通）、Vulkan（AMD）、SYCL（英特尔）、Metal（苹果）正获得广泛采用——凸显部署栈中**跨后端可移植性**的重要性。

- **原生Rust集成初现端倪**：LiteLLM使用Rust桥接、Unsloth的异步优化，预示着向**更低延迟、更高可靠性推理流水线**的演进——这对实时代理系统尤为关键。

- **稳定性胜过功能**：尽管功能快速迭代，但**崩溃率与无声数据丢失**仍是首要关切（如工具调用精度、流式挂起、OOM）。这表明生态正进入成熟阶段，可靠性超越新颖性。

> ✅ **应用开发者应重点关注**：
> - 若使用DFlash/DSpark + Qwen3.8 并启用前缀缓存，请避免 `v0.30+`（vLLM）。
> - 在SM120上使用GLM-5.3-Flash时，请启用 `--attention-backend triton`（SGLang）。
> - AMD RDNA1 GPU上建议使用 `--load-mode mmap`（llama.cpp）。
> - 监控 `OLLAMA_NUM_PARALLEL` 行为——混合模型可能忽略该参数（Ollama）。
> - 升级至 `liteLLM v1.105+` 以获得更佳工具调用保真度与成本追踪。
> - 大规模训练时请设置 `UNSLOTH_DDP_BATCHED_GRAD_COPY=1` 以提升吞吐。

---

> **最终结论**：AI基础设施栈正迅速成熟——但并非均匀发展。尽管性能边界被持续突破，**稳定性、可移植性与开发者体验**才是真正的差异化因素。请根据目标部署环境、模型复杂度及对边缘案例风险的容忍度来选择技术栈。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-10-12**

#### **1. 今日亮点**  
vLLM 项目持续聚焦于下一代 Blackwell（SM120）硬件上的稳定性与性能，针对 DFlash/DSpark 工作流中推测解码的损坏问题进行了关键修复，并正在解决张量并行下 CUDA graph 死锁的问题。一项重大的架构调整正在进行：由于使用率低且维护成本高，级联注意力（cascade attention）将从代码库中彻底移除。

#### **2. 发布与破坏性变更**  
过去 24 小时内未报告新发布或破坏性 API/配置变更。暂无新版本发布。

#### **3. 新模型与硬件支持**  
- **模型支持**：新增对 `Glm4MoeLitePlusPlus`（ZEDA-GLM-4.7-Flash-Dynamic）的支持，该模型为 MoE 变体，采用零计算专家（ZCE）。PR [#57274](https://github.com/vllm-project/vllm/pull/57274)。  
- **硬件后端**：  
  - ROCm：Qwen3-Next/Qwen3.5 的新融合内核 `fused_qk_rmsnorm_rope_gate` 现可通过 `VLLM_ROCM_ENABLE_FUSED_QK_NORM=1` 启用。PR [#51406](https://github.com/vllm-project/vllm/pull/51406)。  
  - Intel GPU：更新 UMD 至版本 26.35。PR [#60980](https://github.com/vllm-project/vllm/pull/60980)。  
- **量化**：目前仅支持 FP8 作为 KV 缓存量化格式；INT8 请求 (#33480) 仍处于开放状态但尚未实现。

#### **4. 性能与优化**  
- **吞吐量**：在 SM120 上启用 `--enforce-eager` 时，DeepSeek-V4.1-Flash 的解码吞吐量极低，且 CUDA graph 完全不可用——亟需修复。问题 #56892。  
- **内存效率**：PR [#60996](https://github.com/vllm-project/vllm/pull/60996) 重构了打包 KV 缓存组的大小计算方式，改用“每请求池化字节数”而非层填充，显著提升了多模型场景下的内存利用率。  
- **内核优化**：ROCm MLA 现已将 FlashAttention LSE 布局规范化为 `[num_heads, num_query_tokens]`，修复了分块预填充失败的问题。PR [#60822](https://github.com/vllm-project/vllm/pull/60822)。  
- **MoE 融合**：AMD 为 DeepSeek-V4 添加可选融合功能，将共享专家合并至 AITER MegaMoE。PR [#61004](https://github.com/vllm-project/vllm/pull/61004)。

#### **5. 稳定性与回归问题**  
- **严重**：[Bug #60174](https://github.com/vllm-project/vllm/issues/60174)：在 v0.30/0.31 版本中，使用 DFlash2/DSpark + TP=1 的 Qwen3.8-27B 模型在前缀缓存命中后输出被破坏。虽已在 v0.29 修复，但在后续版本中仍存在回归。  
- **高严重性**：[Bug #60845](https://github.com/vllm-project/vllm/issues/60845)：在 TP=2/4 下，使用完全分片 LoRA 的 Qwen3.5 兼容 MoE 模型时，出现 CUDA graph 死锁。可复现且间歇性发生。  
- **中等**：[Bug #57032](https://github.com/vllm-project/vllm/issues/57032)：在 `dflash` 模式下，未正确识别 Drafter KV 组 → 导致 Mamba 组的前缀缓存复用被静默禁用。  
- **低/内存**：[Bug #61045](https://github.com/vllm-project/vllm/issues/61045)：Gemma 4 编码器在 `--max-num-batched-tokens 4096` 时，CUDA graph 捕获阶段分配高达 38.5 GiB 内存，导致 OOM。

> ✅ **正在修复中的问题**：多个关键问题已有对应修复 PR，包括 PR [#60569](https://github.com/vllm-project/vllm/pull/60569)（PP 阶段空 KV 分配）、PR [#60770](https://github.com/vllm-project/vllm/pull/60770)（工具调用换行符解析）以及 PR [#60822](https://github.com/vllm-project/vllm/pull/60822)（ROCm LSE 布局）。

#### **6. 对应用开发者的启示**  
- 若使用 DFlash/DSpark 与 Qwen3.8-27B 并启用了前缀缓存，请避免 v0.30+ 版本，应暂时使用 v0.29，直到 #60174 修复完成。  
- 在 ROCm 平台提升 DeepSeek-V4 MoE 性能时，请启用 `VLLM_ROCM_AITER_MEGA_MOE_FUSE_SHARED_EXPERTS=1`。  
- 在 Blackwell GPU 上密切监控 CUDA graph 行为，特别是使用 `--enforce-eager` 或复杂 MoE/Lora 配置时。  
- 使用长上下文模型（如 Gemma 4 编码器）时，谨慎设置 `--max-num-batched-tokens`，防止内存爆炸风险。  
- 请为级联注意力移除做好准备：任何依赖该功能的自定义逻辑需及时更新（当前默认已硬关闭）。详见 PR [#61126](https://github.com/vllm-project/vllm/pull/61126)。

---  
*数据来源：[vllm-project/vllm GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 简报 – 2026-10-12**

---

### **1. 今日重点**  
SGLang 生态系统在支持 **Blackwell 架构硬件（SM120）** 方面持续成熟，关键现场报告确认 *DeepSeek-V4.1-Flash* 在 8× RTX PRO 6000（仅 PCIe）上已具备生产就绪能力。性能优化仍是核心焦点，尤其集中在推测解码及针对 SM120 的内核级崩溃修复。扩散服务与 Mamba 缓存淘汰逻辑的重大稳定性工作正在进行中，已报告多个高影响缺陷。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告新版本或破坏性 API/配置变更。无新版本发布。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1-Flash**：已在 **8× RTX PRO 6000（SM120，仅 PCIe）** 上确认可投入生产 —— 目前唯一验证可行的拓扑结构（问题 #40877）。  
- ✅ **GLM-5.3-Flash**：已在 SM120 上验证可用，但 **FA4 注意力后端在 CUDA 图捕获阶段失败**；**目前仅 Triton 路径稳定**（问题 #42012）。  
- 🔧 **AMD/ROCm 支持**：HIP/ROCm 集成持续推进，包括 DeepSeek-V4 的 SWA 前缀复用（问题 #34562），以及 Triton 内核调度改进（PR #35685）。

---

### **4. 性能与优化**  
- 🚀 **SM120 性能优化计划** (#19637)：高优先级项目，旨在全面提升 DeepSeek V4、V4 Flash 及 DeepGEMM MQA Indexer 等模型的整体性能。  
- ⚙️ **预填充优化重点**：正在对 DeepSeek-V4.1 进行重构，包括 mHC SP + engram 融合 (#43065)，以及将 `q_rope_store` 合并至 `fused_q_norm_rope` (#41657)。  
- 💾 **内存效率**：PR #38086 以自适应工作区替代固定大小的 FP4 索引器 logits slab，有效减少 AMD 设备上的空闲内存浪费。  
- 📈 **扩散服务**：PR #43414 引入可配置的预热预加载裕量与组件选择，支持 ComfyUI 工作流的精细化内存预算管理。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|------|----------|
| 🔴 严重 | [Bug] `AssertionError: Can not alloc mamba cache` 导致引擎崩溃 (#43204) | 锁定状态下缓存分配失败，触发调度器崩溃和请求丢失。 | ❌ 开放 |
| 🔴 严重 | [Bug] Gemma-4 MM：非 RGB 图像导致视觉塔崩溃 (#26751) | 灰度/RGBA JPEG 引发容器重启与批次丢弃，源于通道保护中的双重缺陷。 | ❌ 开放 |
| 🟡 高 | [Bug] GLM-5.3-Flash FA4 在 CUDA 图捕获阶段崩溃 (#42012) | 混合扩展重塑失败，强制回退至较慢的 Triton 后端。 | ❌ 开放 |
| 🟡 高 | [Bug] DeepSeek-V4.1-Flash + DSPARK：SparsePrefillWorkspace 内存无限制增长导致 OOM (#41076) | 内存失控增长引发 TP 组崩溃。 | ❌ 开放 |
| 🟡 中 | [Bug] FluxAdapter 静默丢弃 Kontext ref_latents 与 ControlNet (#43488) | ComfyUI 传入的命名参数在打包过程中丢失，破坏高级控制流程。 | ❌ 已关闭（但未解决） |

---

### **6. 对应用开发者的启示**  
- **在 SM120（RTX PRO 6000）上部署**：使用 **Triton 后端** 处理 GLM-5.3-Flash，避免使用 FA4，直至问题 #42012 修复。务必彻底测试配置——仅有特定拓扑结构稳定。  
- **多模态应用**：在 #26751 修复前，请避免使用非 RGB 格式的图像与 Gemma-4 MM；建议在上游进行预处理。  
- **扩散工作流**：通过 `--warmup-preload-margin` 和组件选择（参考 PR #43414）配置预热预加载，防止无声的 OOM 问题。  
- **Mamba 模型**：长期运行任务需谨慎——若缓存槽位被完全锁定，缓存淘汰可能触发硬崩溃（#43204）。注意监控 `cached_token` 失败。  
- **推测解码**：确保目标概率 > 0，以避免无效草稿被接受（已在 PR #35788 修复）。  

> 💡 **实用提示**：在 Blackwell GPU 上进行生产推理时，请将部署版本固定在 `v0.5.21` 或更高，并使用 `--attention-backend triton`，除非另有验证。关注 #19637 和 #40877 获取真实场景下 SM120 的调优指引。

🔗 [GitHub Issues](https://github.com/sgl-project/sglang/issues) | [PRs](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-12**

---

### **1. 今日亮点**  
最新更新聚焦于扩展 **OpenCL 与 Vulkan 后端功能**，尤其针对 **Gemma-4 E2B/E4B 模型** 和 **Prism Bonsai 2 27B**，并在 GDN（门控差分网络）处理方面进行了性能优化。关键修复涵盖 GPU 内存限制、内核启动稳定性以及 RPC 调试问题，同时新增模型支持使 Qwen3-Omni 与 H2O-Lightning-4B 可实现高级多模态推理。

---

### **2. 发布与破坏性变更**  
今日无新标签发布。但：  
- `GGML_RPC_DEBUG` 现已作为日志详细程度标志（0–3），支持远程推理工作流的细粒度调试日志记录 ([PR #29544](https://github.com/ggml-org/llama.cpp/pull/29544))。  
- `--n-cpu-mode` 中 FFN 带宽选择现可通过 `--n-cpu-ffn` 配置，提升 CPU 卸载灵活性 ([Issue #27987](https://github.com/ggml-org/llama.cpp/issues/27987))。

---

### **3. 新模型与硬件支持**  
- ✅ **Prism Bonsai 2 27B**：已添加完整运行时支持，包括哈达玛张量折叠和权重转换修复 ([PR #29600](https://github.com/ggml-org/llama.cpp/pull/29600))。  
- ✅ **Qwen3-Omni（音频 + 视觉）**：新增音频帧计数、末块填充、深度堆栈及 mmproj 张量命名支持 ([PRs #30352–#30356](https://github.com/ggml-org/llama.cpp/pulls?query=author%3AWestWaters+is%3Aclosed))。  
- ✅ **H2O-Lightning-4B**：决策类模型现可直接通过 `/v1/systemone` 接口调用，无需 Python 代理层 ([PR #30361](https://github.com/ggml-org/llama.cpp/pull/30361))。  
- ✅ **SenseNova U1**：新增文本到文本、图像到文本及多模态生成支持 ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))。  
- ✅ **Ouro（循环语言模型）**：支持字节跳动的 1.4B/2.6B 循环语言模型，并共享权重 ([PR #29823](https://github.com/ggml-org/llama.cpp/pull/29823))。

**硬件后端**：  
- OpenCL：在高通 Adreno 设备上启用 Gemma-4 E2B/E4B GPU 解码功能 ([PR #30266](https://github.com/ggml-org/llama.cpp/pull/30266))。  
- Vulkan：优化 `mul_mat_id` 中行 ID 提前提升，适用于专家模型 ([PR #29998](https://github.com/ggml-org/llama.cpp/pull/29998))。  
- SYCL：新增 `set_tensor_2d`，实现更快的张量分片加载 ([PR #30358](https://github.com/ggml-org/llama.cpp/pull/30358))。

---

### **4. 性能与优化**  
- **OpenCL GDN 优化**：将 gated_delta_net 状态直接写入循环缓存，减少解码过程中的冗余拷贝 —— 显著提升长序列吞吐量 ([PRs #30359](https://github.com/ggml-org/llama.cpp/pull/30359), [#30360](https://github.com/ggml-org/llama.cpp/pull/30360))。  
- **Vulkan 预遍历优化**：通过提前提升重复的 `mul_mat_id` 条目，消除循环遍历开销 —— 对具有重复专家 ID 的 MoE 模型至关重要 ([PR #29998](https://github.com/ggml-org/llama.cpp/pull/29998))。  
- **SYCL 张量加载**：`set_tensor_2d` 实现通过批量上传降低张量分片模式 (`-sm tensor`) 的开销 ([PR #30358](https://github.com/ggml-org/llama.cpp/pull/30358))。  
- **RPC 调试日志**：通过详细级别增强调用链追踪能力，有助于诊断分布式部署中的延迟与通信问题 ([PR #29544](https://github.com/ggml-org/llama.cpp/pull/29544))。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 备注 |
|------|----------|--------|-------|
| [Issue #30091](https://github.com/ggml-org/llama.cpp/issues/30091) | 高 | 未确认缺陷 | 在 HIP 后端长时间对话中因“非法分配”导致崩溃。使用 Qwen3.8-27B-IQ3_S 可复现。 |
| [Issue #30039](https://github.com/ggml-org/llama.cpp/issues/30039) | 高 | 未确认缺陷 | RDNA1 (gfx1010) 上从 b10455 到 b11429 出现约 45% 的提示处理性能下降。受影响模型为 GDN 混合型。 |
| [Issue #30052](https://github.com/ggml-org/llama.cpp/issues/30052) | 关键 | 未确认缺陷 | 在多个 GB10 节点上，大型 MoE 模型（如 DeepSeek-R1-671B）预热解码阶段，RPC 服务器崩溃。 |
| [Issue #27360](https://github.com/ggml-org/llama.cpp/issues/27360) | 中等 | 未确认缺陷 | AMD RDNA1 GPU（如 RX 5700 XT）在 `--load-mode auto` 下使用大 Gemma 模型时出现内存溢出或设备丢失；`mmap` 可规避此问题。 |
| [Issue #30256](https://github.com/ggml-org/llama.cpp/issues/30256) | 中等 | 未确认缺陷 | Gemma 4 JSON 模式允许 `thought` 通道，即使 `enable_thinking=false` 也生效。 |

> 🔍 *注意：目前尚无 PR 合并修复上述问题。若遇到性能退化，请优先测试 `--load-mode mmap`，或降级至 b11429 版本。*

---

### **6. 对应用开发者的启示**  
- **对智能体开发者**：Prism Bonsai 2 27B 与 H2O-Lightning-4B 可在 `llama-server` 内原生实现复杂决策流程，减少对外部代理的依赖。建议通过 `/v1/systemone` 获取校准概率输出。  
- **对推理工程师**：OpenCL 与 Vulkan 中的 GDN 优化显著提升长上下文表现 —— 尤其适用于 Qwen3-Omni 及 GDN 混合微调模型。  
- **对分布式系统开发者**：使用 `GGML_RPC_DEBUG=3` 追踪 RPC 调用路径，排查多节点部署（如 DGX Spark）中的故障。在 #30052 修复前，需警惕大 MoE 模型引发的崩溃风险。  
- **对部署团队**：避免在 AMD RDNA1 GPU（如 RX 5700 XT）上使用 `--load-mode auto` —— 请改用 `--load-mode mmap` 作为临时规避方案。  
- **对 CI/CD 流水线**：启用 `--n-cpu-ffn` 并显式指定带宽，防止不可预测的 CPU 卸载行为。

👉 **推荐操作**：若使用 Gemma-4、Qwen3-Omni 或 OpenCL/Vulkan 后端上的 MoE 模型，请务必在最新 `b11559` 版本上测试您的模型服务栈。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-12**

---

### **1. 今日亮点**  
Ollama 生态系统持续围绕核心推理与代理服务功能趋于稳定，重点修复工具调用、流式传输及模型加载中的关键问题，尤其针对 Qwen3.8 与混合架构。主要进展包括修复工具调用参数中数值精度丢失的 PR，Apple Silicon（M2 Max）上的内核崩溃问题，以及在 macOS 上使用 MLX 时的持续崩溃。社区在 Windows、Linux 及 macOS 环境中仍积极报告并解决各类边缘情况。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布或破坏性变更。*  
所有近期活动集中于漏洞修复与性能优化，而非版本更新。开发者应继续关注 `v0.40.2` 及更高版本的稳定性，特别是使用 MLX、Vulkan 或混合模型时。

---

### **3. 新模型与硬件支持**  
- **新模型请求**：  
  - 通过 #18890 提交了 [d1-3B](https://huggingface.co/LiquidAI/d1-3B-GGUF) 与 [d1-omni-600M](https://huggingface.co/LiquidAI/d1-omni-600M-GGUF) 的请求；当前因不支持的决策编码（`lfm2-d1`）而受阻。  
  - 通过 PR #18917（b11521）更新 `llama.cpp`，已添加 EmbeddingGemma 2 支持。  

- **硬件/后端修复**：  
  - **Apple Silicon（M2 Max）**：PR #18940 报告因 threadgroup 大小超过硬件限制（960 > 896）导致的 SDPA 内核崩溃。  
  - **Vulkan（AMD RX 6800 XT）**：#18557 报告访问违规崩溃（`0xc0000005`）——仍在调查中。  
  - **MLX（macOS/Metal）**：报告多个崩溃问题，包括 `panic: mlx`（#18885）及旧版 glibc 上的 `libdl` 链接错误（#17567）。

---

### **4. 性能与优化**  
- **延迟与吞吐量**：  
  - 在 Cloud API 上使用 `glm-5.3-flash` 时观察到流式挂起问题（#18926），完成之后流始终无法终止。  
  - `prompt_per_second` 计算不准确：由于时间逻辑错误，将总提示时间除以仅缓存外的时间，导致速率被夸大（#18948）。  
- **内存与调度**：  
  - 混合模型如 `qwen35moe` 即使设置 `OLLAMA_NUM_PARALLEL` 也始终绑定至一个槽位，限制并行度（#18938）。已在 PR #18939 中修复。  
  - 多 GPU 系统中因设备名与日志名不匹配导致的显存（VRAM）统计错位（#18349）。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|--------|------|--------|-----------|
| 🔴 高 | `qwen3.8`：聊天流式过程中“未找到用户查询”错误（#17778） | 所有客户端流式接口中断；影响使用工具调用的代理 | 开放，52 条评论 |
| 🔴 高 | `glm-5.3-flash` 云流式永不终止（#18926） | 客户端进程无限挂起 | 开放，2 条评论 |
| 🔴 高 | MLX 运行器在 M2 Max 上崩溃：SDPA threadgroup 超载（#18940） | 大注意力头场景（如 qwen3.8:27b）直接崩溃 | 开放 |
| 🟡 中 | `embeddinggemma-2:740m` 在无 MLX 运行时环境下无法拉取（#18825） | 非 Mac 系统上受阻 | 开放，14 个赞 |
| 🟡 中 | `ollama list` 在 NTFS 挂载点返回空结果（#18921） | 模型实际存在但不可见 | 已提交 PR #18949 |
| 🟡 中 | Go API 中工具调用参数精度丢失（#18942） | 数值如 `9007199254740993` 变为 `9007199254740992` | 已合并 PR #18941 |

---

### **6. 对应用开发者的启示**  
- **在 #18943 修复前，请勿对 Qwen3.8 使用 `reasoning_effort: "xhigh"`** —— 该值会被重写为 `max`，导致模板失效。建议直接使用 `max`。  
- **不要依赖 `OLLAMA_NUM_PARALLEL` 来控制混合模型**（如 `qwen35moe`、`qwen3vl` 等）——它们已被硬绑定至单个槽位（#18938）。即使在多 GPU 环境下，也预期为单线程执行。  
- **谨慎处理工具调用的精度问题** —— 建议采用 PR #18941 的修复方案，或将数值解码为字符串以避免舍入误差。  
- **在多种后端上进行测试** —— MLX on macOS、Vulkan on AMD、Windows junctions 均存在路径遍历漏洞。建议使用绝对路径或避免卷挂载。  
- **密切监控流式响应** —— 特别是 `glm-5.3-flash` 与 `qwen3.8`，流可能挂起或无声失败。

> 🔗 [查看问题](https://github.com/ollama/ollama/issues) | [PR 摘要](https://github.com/ollama/ollama/pulls)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-10-12**

---

### **1. 今日亮点**  
LiteLLM 生态系统持续成熟，重点聚焦于 **大模型翻译保真度**、**原生 Rust 集成** 和 **多租户成本控制**。关键进展包括对 Anthropic/OpenAI/Gemini 的 `response_format` 处理的修复，流式传输与工具调用一致性的提升，以及新增对 `ai&` 作为一级提供商的支持。代理现在在边缘情况（如 `no-log: true`）下对预算预留和日志记录的处理更加稳健。

---

### **2. 发布与破坏性变更**  
- 过去 24 小时内发布 **v1.106.0-rc.1**、**v1.105.0** 与 **v1.104.3**。  
- 所有 Docker 镜像均通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 进行加密签名，确保供应链完整性。  
- 此次发布未报告任何破坏性 API 变更；向后兼容性得以保留。

> 🔗 [GitHub 发布说明](https://github.com/BerriAI/litellm/releases)

---

### **3. 新模型与硬件支持**  
- ✅ **新增 `ai&` 提供商**，通过 PR [#43607](https://github.com/BerriAI/litellm/pull/43607) 实现一级集成，支持 Chat Completions 与 Responses API。  
- ✅ **Gemini 3 模型** 现已正确处理 `temperature=1.0` 默认值（此前由 LiteLLM 强制设定，导致未来模型拒绝），已在 [#45333](https://github.com/BerriAI/litellm/issues/45333) 中修复。  
- ✅ **原生 Rust 推理** 现在可保留 Python 缓存键，并通过近期合并的 PR ([#45956](https://github.com/BerriAI/litellm/pull/45956), [#45985](https://github.com/BerriAI/litellm/pull/45985)) 支持 `streaming`、`tool calls` 与 `body hooks`。

---

### **4. 性能与优化**  
- **Rust 桥接优化** 显著降低原生调用的开销：  
  - PR [#45962](https://github.com/BerriAI/litellm/pull/45962)：重构钩子执行逻辑，异步在调用方任务中运行，消除延续机复杂性。  
  - PR [#45957](https://github.com/BerriAI/litellm/pull/45957)：将宿主延续操作移至 Python 驱动器，提升响应速度与调试清晰度。  
- **流式传输性能**：修复 Gemini 流重启逻辑 ([#45750](https://github.com/BerriAI/litellm/pull/45750))，确保在早期断连时可重试。  
- **成本路由效率**：PR [#45889](https://github.com/BerriAI/litellm/pull/45889) 实现会话亲缘性绑定在饱和时自动释放——在高吞吐场景下改善负载分布。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 修复状态 | 链接 |
|--------|------|-----------|------|
| ⚠️ 高 | `cost-based-routing` 即使部署健康也会崩溃同步 Router 方法 | 开放 | [#45718](https://github.com/BerriAI/litellm/issues/45718) |
| ⚠️ 高 | `output_config` 在 Xiaomi MiMo 模型（`MiMo-V2-Pro/Omni`）上失败 | 开放 | [#24549](https://github.com/BerriAI/litellm/issues/24549) |
| ⚠️ 中 | `stop_sequences` 原样传递给 OpenAI 提供商 → 400 错误 | 开放 | [#33075](https://github.com/BerriAI/litellm/issues/33075) |
| ⚠️ 中 | 工具结果 `is_error` 标志在 Anthropic→OpenAI 转换过程中丢失 | 开放 | [#44979](https://github.com/BerriAI/litellm/issues/44979) |
| 🛠️ 已修复 | `no-log: true` 尽管请求成功仍跳过支出追踪 | 已在 PR [#44514](https://github.com/BerriAI/litellm/pull/44514) 中修复 |

> 注意：多个问题涉及静默数据丢失或参数转发错误——尤其集中在 `tool_calls`、`response_format` 与 `stop_sequences`。

---

### **6. 对应用开发者的意义**  
- **直接使用 `ai&`** 通过 `aiand/<model>` 进行模型路由——无需绕行方案。  
- **仅在确认部署健康后启用 `cost-based-routing`** —— 它可能在某些条件下静默禁用路由。  
- **若依赖支出追踪，请避免使用 `no-log: true`** —— 改用 `proxy_spend_tracking=True` 以保留账务记录。  
- **升级至 v1.105.0+** 以获得改进的工具调用保真度与原生 Rust 性能提升。  
- **监控 `output_config` 与 Xiaomi MiMo 模型的使用** —— 此问题将持续存在，直至 [#24549](https://github.com/BerriAI/litellm/issues/24549) 修复。  
- **合理利用会话亲缘性绑定** —— 当前在饱和时会自动释放（PR [#45889](https://github.com/BerriAI/litellm/pull/45889)），实现更健壮的负载均衡。

> 🔗 [开发者指南：多租户预算管理](https://github.com/BerriAI/litellm/issues/44555)  
> 🔗 [GitHub 问题仪表板](https://github.com/BerriAI/litellm/issues?q=is%3Aopen+sort%3Aupdated-desc)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-12**

---

### **1. 今日亮点**  
Unsloth 团队在稳定多用户推理及优化模型训练工作流方面取得显著进展，重点 PR 包括提升分布式训练效率（`UNSLOTH_DDP_BATCHED_GRAD_COPY=1`）、更好处理 MoE-LoRA 检查点，以及增强 Studio 对 Qwen-Image-2.1 等视觉语言模型的支持。关键稳定性修复解决了 GPU 内存泄漏、CPU 备用回退问题，以及工具调用过程中的崩溃——尤其影响 M 系列 Mac 及 Windows 用户。

---

### **2. 发布与破坏性变更**  
*无*  
过去 24 小时内未发布新版本。最新版本仍为 `v0.1.808-beta`（Studio）和 `2026.9.4`（核心包）。当前无活跃的破坏性 API 或配置变更。

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen-Image-2.1 GGUF**：通过 [PR #13333](https://github.com/unslothai/unsloth/pull/13333) 正确分类为 *文本到图像* 扩散模型，解决此前误分类问题。
- ✅ **DeepSeek-OCR 与 DeepSeek-OCR-2**：通过 [PR #13310](https://github.com/unslothai/unsloth/pull/13310) 添加对 Studio 的支持，修复缺失依赖项（`addict`, `easydict`），并实现完整模型加载。
- ✅ **OpenVINO 支持 Intel Arc / Core Ultra**：[PR #12168](https://github.com/unslothai/unsloth/pull/12168) 持续推进，支持转换、推荐与聊天功能的托管 sidecar —— 预计未来集成至 Studio。
- ✅ **所有文本扩散类模型家族**：通过 [PR #13342](https://github.com/unslothai/unsloth/pull/13342)，Studio 现已支持 LLaDA、LLaDA-MoE、Dream、Nemotron-Labs-Diffusion、LLaDA2、SDAR 与 DiffusionGemma 的训练与对话。

---

### **4. 性能与优化**  
- 🚀 **分布式训练提速**：[PR #13350](https://github.com/unslothai/unsloth/pull/13350) 引入可选配置 `UNSLOTH_DDP_BATCHED_GRAD_COPY=1`，利用 PyTorch 2.13 的 `batched_grad_copy` 降低梯度同步开销——预计在多 GPU 环境下大幅提升大规模训练吞吐量，最高可达 15–20%。
- ⚙️ **KV 缓存共享**：[PR #10301](https://github.com/unslothai/unsloth/pull/10301) 实现统一的 KV 预占机制，使并行对话共享同一缓存池而非耗尽资源——对高并发推理负载至关重要。
- 📈 **macOS 上的 CPU 线程管理**：[PR #13349](https://github.com/unslothai/unsloth/pull/13349) 确保 `sd.cpp` 仅在性能核心上运行（而非全部逻辑线程），改善 Apple Silicon Mac 上实时音视频生成的延迟表现。

---

### **5. 稳定性与回归问题**  
- 🔥 **M3/M5 Mac 上的严重崩溃**：用户报告加载量化版 Qwen 3.8 27B 模型时出现系统级闪烁与 UI 冻结（[Issue #9279](https://github.com/unslothai/unsloth/issues/9279)）。疑似与 Metal 后端不稳有关；暂无修复方案。
- 🔥 **Windows 上的 GPU 回退问题**：RTX 3090/4090 用户报告即使有 GPU 也强制使用 CPU 运行模型（[Issue #4644](https://github.com/unslothai/unsloth/issues/4644)）。根本原因可能为驱动/运行时版本不匹配；临时方案：通过 `CUDA_VISIBLE_DEVICES` 强制指定 CUDA 上下文。
- 🛑 **工具调用卡死**：模型在工具调用中途停止生成响应，需重新提交消息（[Issue #7125](https://github.com/unslothai/unsloth/issues/7125), [#7045](https://github.com/unslothai/unsloth/issues/7045)）——正在通过改进异步编排修复中。
- 🧱 **Jetson AGX Orin 上的内存溢出**：Gemma-3n 推理过程中因内存压力失败（[Issue #3113](https://github.com/unslothai/unsloth/issues/3113)）；可能需要自定义内存池或采用更低精度配置。
- 💣 **下载停滞与验证失败**：预量化检查点在完整下载后因后期验证失败而中断（[PR #13339](https://github.com/unslothai/unsloth/pull/13339)）——缓解措施：提前进行指纹校验。

---

### **6. 对应用开发者的启示**  
- 在生产训练任务中启用 `UNSLOTH_DDP_BATCHED_GRAD_COPY=1`，以减少跨节点同步开销——尤其适用于多 GPU 集群环境。
- 对于**视觉语言类应用**，请确保使用正确的模型分类（如 Qwen-Image-2.1），若使用自定义 GGUF 模型，避免依赖自动识别。
- 若部署于**Apple Silicon Mac**，应预期大模型可能导致 UI 冻结；建议固定 `UNSLOTH_CPU_THREADS` 值或减小上下文长度。
- 导出适配器时避免仅调用 `save_lora()` 而不执行 `merge_and_unload()` —— 已知 LoRA-GA 权重无法正确重新加载（[PR #13322](https://github.com/unslothai/unsloth/pull/13322)）。
- 使用 **MoE-LoRA 检查点** 时需谨慎——其 `lora_B` 布局按专家分块，与标准 PEFT 加载器不兼容（[Issue #6930](https://github.com/unslothai/unsloth/issues/6930)）。

> **技巧提示**：验证微调模型时设置 `UNSLOTH_RETURN_LOGITS=1`，以防止损失计算中出现静默失败（[Issue #5230](https://github.com/unslothai/unsloth/issues/5230)）。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*