# AI 基础设施日报 2026-09-24

> 生成时间: 2026-09-24 00:51 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **1. 生态系统概览**  
2026年9月，AI推理基础设施格局呈现出高性能服务引擎、轻量级本地运行时与生产级大模型网关之间的快速融合。vLLM 和 SGLang 等项目在内核级优化和推测解码方面持续突破，而 llama.cpp 与 Unsloth 则专注于跨平台可访问性与低延迟部署。Ollama 与 LiteLLM 正逐步成熟为统一的开发者平台，整合模型管理、成本控制与代理工具链——反映出向端到端应用赋能的转变趋势。混合架构（Mamba/GDN）、MoE 模型及多模态能力的兴起，凸显了对灵活、高效且安全的推理栈日益增长的需求。

---

### **2. 活动对比**

| 项目       | 问题（开放） | PR（开放） | 发布（过去24小时） | 状态 |
|---------------|---------------|------------|------------------------|--------|
| **vLLM**      | 87            | 132        | 无                   | 稳定版候选中进行 |
| **SGLang**    | 93            | 151        | 无                   | 候选版本高不稳定 |
| **llama.cpp** | 74            | 108        | ✅ `v0.5.0`            | 新稳定版本发布 |
| **Ollama**    | 105           | 127        | 🟡 `v0.34.4-rc1`       | 带破坏性变更的候选版 |
| **LiteLLM**   | 112           | 149        | 无                   | 仅开发构建 |

> *注：问题/PR数量基于截至2026-09-24的GitHub活动数据。LiteLLM 活动量最高，源于配置复杂度与安全审计需求。*

---

### **3. 模型支持竞赛**

| 模型 / 架构          | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|
| **Qwen3.8-2.4T-A95B (ROCm)** | ✅ | ✅ (追踪中) | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**             | ✅ (注意力后端) | ⚠️ (视觉功能损坏) | ✅ (通过GGUF) | ⚠️ (长序列解码问题) | ✅ (FP8降级支持) |
| **Qwen3-VL-Embedding-8B**     | ✅ | ❌ | ❌ | ❌ | ❌ |
| **HRM-Text (DFM Mimir 1B)**   | ❌ | ❌ | ✅ (GGUF) | ❌ | ❌ |
| **MiMo-V2.6 & HunyuanOCR**    | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Gemma4 DSpark Draft**       | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Qwen-Image-2.1 (GGUF)**     | ❌ | ❌ | ❌ | ❌ | ✅ (本地支持) |
| **Nemotron (MLX)**            | ❌ | ❌ | ❌ | ✅ | ❌ |
| **AMD Ryzen AI NPU (XDNA 2)** | ❌ | ❌ | ❌ | ❌ | ✅ (通过Lemonade) |

> **领先者**：**Unsloth** 在新型模型与硬件集成方面领先（尤其在NPU与图像模型领域）。  
> **通用模型支持最强**：**vLLM** 与 **llama.cpp** 主导主流模型覆盖。  
> **Ollama** 在基于MLX的模型支持上表现优异，但在更广泛架构采纳方面滞后。

---

### **4. 性能前沿**

| 优化重点         | vLLM                     | SGLang                  | llama.cpp               | Ollama              | LiteLLM             |
|-----------------------------|--------------------------|-------------------------|-------------------------|---------------------|---------------------|
| **KV缓存与推测解码** | ✅ 多步融合解码，前缀检查点 | ⚠️ `nvfp4`崩溃，HiCache问题 | ⚠️ 稀疏FA回归 | ⚠️ MLX卡顿 | ❌ |
| **批处理与吞吐量**   | ✅ 批处理分组预填充 (+7.58x) | ✅ 波形感知分段计数 | ✅ Vulkan RDNA3 int8内核 | ✅ CPU利用率修复 | ❌ |
| **量化与内存**   | ✅ HiSparse MLA，MXFP4 MoE | ✅ FP8 KV缓存，MXFP4内核 | ✅ A8 dp4a，SYCL IQ3_S MMVQ | ✅ VRAM压力处理 | ✅ 通过Rust实现成本准确性 |
| **内核级优化** | ✅ SM120 split-K自适应，Triton融合 | ✅ 融合Q/K预处理内核 | ✅ CUDA稀疏FA，Vulkan cm1 | ❌ | ❌ |
| **分布式服务**     | ✅ 有状态代理会话编排 | ⚠️ HiCache + SSM崩溃 | ❌ | ❌ | ✅ 预算强制、团队限制 |

> **vLLM** 在可扩展、有状态推理方面保持性能领先，具备先进的缓存机制与推测解码能力。  
> **llama.cpp** 在平台多样性与跨GPU/CPU/NPU的底层内核调优方面领先。  
> **LiteLLM** 通过成本准确性与安全加固，推动运营卓越性发展。

---

### **5. 层级定位**

| 项目       | 主要层级                 | 角色摘要 |
|---------------|-------------------------------|--------------|
| **vLLM**      | **服务引擎**            | 高吞吐、可扩展推理，深度内核优化；适用于云规模大模型API。 |
| **SGLang**    | **服务引擎 / 框架** | 实验性、高度模块化引擎，专注ROCm/H200；适合研究与早期采用者。 |
| **llama.cpp** | **本地运行时 / 边缘推理** | 轻量、可移植、多后端运行时；专为边缘设备、桌面与离线场景优化。 |
| **Ollama**    | **开发者平台 / 网关** | 统一CLI/工具层，支持模型生命周期管理、结构化输出与导入导出工作流。 |
| **LiteLLM**   | **大模型网关 / 运维层** | 生产级API网关，支持预算强制、成本追踪与可审计性——在受监管环境中至关重要。 |

> **战略差异化**：  
> - **vLLM/SGLang** = 高规模部署的基础设施核心。  
> - **llama.cpp** = 可移植性与边缘计算的基础运行时。  
> - **Ollama** = 快速原型开发的开发者体验层。  
> - **LiteLLM** = 成本、合规与可观测性的运维控制平面。

---

### **6. 趋势信号**

#### 🔍 **从当前活动看关键行业趋势**
1. **混合架构已成为主流**  
   混合Mamba/GDN模型已成vLLM与SGLang开发的核心——表明超越纯Transformer主导地位的趋势。

2. **推测解码现已成为稳定性挑战**  
   多个项目报告推测解码存在崩溃或退化问题（尤其`nvfp4`、`GLM-5.3-Flash`）——凸显速度提升以牺牲鲁棒性为代价。

3. **ROCm势头加速**  
   AMD ROCm生态迅速成熟：vLLM、SGLang与llama.cpp均针对MI350/MI355X及gfx950/gfx1151推出专用优化，表明其已成为NVIDIA的可行替代方案。

4. **代理中心优化正在崛起**  
   会话为中心的KV缓存协调（vLLM RFC #48501）、前缀检查点、代理技能（Unsloth）等，反映向长周期、有状态代理工作流的演进。

5. **安全与合规不可妥协**  
   LiteLLM 关键预算绕过问题（#26672）与Ollama 结构化输出修复，凸显生产系统需严格验证、成本控制与敏感信息保护。

#### 📌 **应用开发者应关注事项**
- **在vLLM PR #52244发布前，避免对混合Mamba模型使用 `--block-size`**。  
- **未经过挂起/重复测试前，不要在GLM-5.3-Flash或`nvfp4`上部署推测解码**。  
- **在隔离环境或安全场景中使用 `ollama export/import`**——该功能对合规性具有颠覆性意义。  
- **在CI/CD中启用 LiteLLM 的 `--validate_config`**，防止静默配置失败。  
- **监控Vulkan上的内存碎片**（建议设置 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4GiB`）。  
- **若使用路由器模式或多设备部署，优先选择 llama.cpp v0.5.0**。

> ✅ **结论**：技术栈演进迅速——但稳定性、成本控制与跨平台一致性仍是关键差异点。请根据**部署规模**、**硬件目标**与**运维严谨性**选择合适工具。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-24**

---

### **1. 今日亮点**  
vLLM 项目持续推进对混合 Mamba/GDN 模型及推测解码优化的支持，关键 PR 已落地前缀缓存与多步融合解码执行功能。针对 ROCm（MI355X）KV 缓存 OOM 问题和 CUDA 图内存计数的稳定性修复已合并，同时新的 RFC 正推动通过以会话为中心的 KV 协调机制实现更深层次的状态化智能体服务能力。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
- **待定**：vLLM 0.28.1rc1.dev580+g385dce36b（Issue #56868 中提及）在 GLM-5.3-Flash 长序列解码负载下仍不稳定。  
- **迁移提示**：前缀缓存恢复逻辑中的 `--block-size` 参数行为正在修复中（PR #53142）；使用混合 Mamba 模型的用户应暂避免显式指定块大小，直至问题解决。

---

### **3. 新模型与硬件支持**  
- **ROCm（AMD）**：  
  - 通过专用性能优化追踪（Issue #57149），已全面支持 `Qwen3.8-2.4T-A95B` 在 gfx950 / MI355X 上运行。  
  - 在 ROCm 上启用 HiSparse 稀疏 MLA 热缓冲（PR #57602），显著提升大 MoE 模型的内存效率。  
  - 修复了 `Kimi-K3` 在 HIP 700 上的 TP8 崩溃问题（PR #50347）。  
- **Intel GPU（XPU）**：  
  - 改进非连续张量步长在 UVA 视图创建过程中的处理方式（PR #54874）。  
  - 多卡推理与主机内存缩减方面仍存在持续问题（Issues #53119, #50269）。  
- **模型架构**：  
  - GLM-5.3-Flash 现已支持 `Glm5NextTextLinearAttention` 注意力后端（PR #54062）。  
  - Qwen3-VL-Embedding-8B 已具备稳定的多模态缓存处理能力（Issue #33865）。

---

### **4. 性能与优化**  
- **混合 GDN/Mamba 前缀缓存**：  
  - PR #55876 引入批处理两阶段分组预填充执行（共享前缀场景下吞吐量提升 7.58 倍），适用于代理工作流等场景。  
  - 通过调度器状态机协调生产者/消费者间的检查点同步（PR #55875）。  
- **推测解码**：  
  - PR #58463 移除了在 MTP 融合多步解码过程中冗余的元数据重建——对 DeepSeek V4 及未来模型至关重要。  
  - PR #53175 重新提交 Gemma4 FP8 KV FA4 内核，头维度设为 512；解决了因特殊标记输出导致的性能下降问题。  
- **内核级优化**：  
  - PR #58482 为 SM120（Blackwell）实现基于占用率自适应的 split-K 分段数量调整，动态从 16 调整至 64 段，最大化流多处理器利用率。  
  - PR #51406 启用 Qwen3-Next/Qwen3.5 的融合 QK-norm+RoPE+gate Triton 内核，降低内核启动开销。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|------|-------------|------------|
| ⚠️ 高 | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash 长序列解码在累积推理解码后出现退化 | 开放；已在 RC 构建中跟踪 |
| ⚠️ 高 | [#58031](https://github.com/vllm-project/vllm/issues/58031) | FlashInfer 自动调优在 SM103（GB300）上因 cubin 缺失 PTX 而永久挂起 | 根本原因已撤回；仍在调查中 |
| ⚠️ 中 | [#53142](https://github.com/vllm-project/vllm/issues/53142) | 使用显式 `--block-size` 时前缀缓存恢复引发非法内存访问 | PR #52244 修复了混合 GDN 情况；待更广泛验证 |
| ⚠️ 中 | [#53130](https://github.com/vllm-project/vllm/issues/53130) | 达到 `max_num_seqs` 后调度器永久停止接纳请求 | 开放；症状指向内部状态损坏 |
| ⚠️ 低 | [#58029](https://github.com/vllm-project/vllm/issues/58029) | Whisper `verbose_json` 在分块边界静默丢失词语 | 开放；影响长音频转录准确性 |

---

### **6. 对应用开发者的启示**  
- **智能体工作流**：预计通过即将推出的以会话为中心的 KV 缓存协调（RFC #48501）和前缀检查点（PRs #55875–#55876）实现显著的提示复用与上下文共享改进。使用 `--enable-prefill-checkpointing` 时请谨慎，待稳定后再启用。  
- **工具调用与流式输出**：建议启用解析器缓存以稳定流式重渲染中的工具调用 ID（Issue #57571）。  
- **生产部署**：使用混合 Mamba 模型时，请避免设置 `--block-size`，直到 PR #52244 发布。密切监控 GLM-5.3-Flash 长序列解码任务（Issue #56868）。  
- **跨平台兼容性**：ROCm 支持快速成熟——建议使用 `MXFP4` 量化测试 AMD MI355X 部署下的 MoE 模型（PR #58483）。Intel GPU 支持仍脆弱，预期存在内存膨胀和多卡不稳定性问题。  

> 🔗 *直接探索 PR 与问题：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-09-24**

---

### **1. 今日重点**  
SGLang 项目持续推进其 dLLM 服务路线图，新工作涵盖推测解码、分层缓存以及跨后端兼容性。关键进展包括统一 MoE 路由逻辑的重大合并请求，以及针对 FP8 KV 缓存和 DFLASH/DSPARK 内存管理的多项关键修复——尤其影响 H200（SM90）及 AMD MI350/MI355X 部署。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未发布新版本或破坏性 API/配置更改。但当前工作重点在于将内部事件模式与 vLLM 对齐（`#39991`），并稳定 `--incremental-streaming-output` 的行为（`#40901`）。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 支持**：正在为 ROCm 7.x 上的 GLM-5.3-Flash 开发，适配 MI350/MI355X；近期合并请求优化了索引内核（`#34394`, `#40878`）。  
- **新模型路线图**：  
  - *Qwen3.8-Flash-Next*：推进内核优化与 FP8 索引器支持（`#38731`）。  
  - *SenseNova-U1/U1.5*：通过官方 OpenSenseNova 仓库跟踪集成进度（`#37742`）。  
  - *Kimi-K3 EP32*：发现 MegaMoE 推理中的问题（`#40751`）。  
- **多模态**：Inkling 现在对无效图像输入正确返回 HTTP 400 错误，而非 500（`#40897`）。

---

### **4. 性能与优化**  
- **AMD ROCm**：  
  - 将 Q/K 准备操作融合进单个 aiter 内核，每层减少约 11 个内核调用，降低解码开销（`#34394`）。  
  - 波浪感知的 split count 优化提升了 MI355X 上 fp8 unified_kv 解码的可扩展性（`#40878`）。  
- **NVIDIA**：  
  - 更新 CUDA 13.4 镜像，集成最新 deepgemm、deep-ep 与 sgl-kernel 版本（`#40987`）。  
  - MXFP4 MoE 内核针对 gfx950 小批量（1–40 个 token/排名）场景进行了优化（`#40204`）。  
- **CPU**：修复了 CPU 上 VLA 模型的 RoPE 处理问题（`#40139`）。  
- **通用优化**：  
  - 新增 `--gsp-input-ids` 标志，可在基准测试中跳过分词步骤（`#40900`）。  
  - 统一 MoE 路由 GEMM 层以减少精度漂移（`#38695`）。

---

### **5. 稳定性与回归问题**  
今日报告高严重性稳定性问题：  
- **严重**：在 H200（SM90）上使用 `--attention-backend trtllm_mha` 时，尽管表面正常，但生成结果错误（`#40921`）。  
- **严重**：HiCache + 混合 SSM/Mamba 配置触发 `cudaHostRegister` 错误，导致整个实例终止（`#40926`）。  
- **回归问题**：  
  - 由于锁定的 `transformers==5.12.1` 不支持 `glm5_next`，GLM-5.3-Flash 视觉功能已损坏（`#39831`）。  
  - 推测解码因 `extend_prefix_lens_cpu is None` 在 `nvfp4` KV 缓存下崩溃（`#36010`）。  
  - DeepSeek 分块前缀预填充因 base-2 与自然对数 LSE 不匹配而无声丢失精度（`#40903`）。  
  - GLM-5.3 在使用 DFLASH 推测解码时出现严重重复问题（`#40843`）。  

*注：上述回归问题目前尚未有修复合并请求被合并。*

---

### **6. 对应用开发者的启示**  
- **在 `#36010` 和 `#40843` 修复前，请谨慎使用 `nvfp4` 和 `GLM-5.3-Flash` 上的推测解码**。  
- **在 H200（SM90）上避免使用 `trtllm_mha` 后端运行大模型（如 `gpt-oss-120b`）**，建议改用 `flashinfer` 或 `pytorch` 后端。  
- **在基准测试中使用 `--gsp-input-ids`** 可隔离服务器性能，排除分词开销影响。  
- **在 `#40926` 修复前，使用 HiCache 与混合 SSM/Mamba 配置可能引发不稳定**。  
- **关注 CI 状态**（`#17050`），排查可能导致部署可靠性的间歇性测试与基础设施问题。  

> 🔗 [GitHub Issues](https://github.com/sgl-project/sglang/issues) | [Pull Requests](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 摘要 – 2026-09-24**

---

### **1. 今日亮点**  
`v0.5.0` 版本在后端稳定性与模型覆盖范围上实现重大飞跃，显著优化了 CUDA、Vulkan 及 Metal 的性能。关键修复解决了睡眠/唤醒周期及分词计数期间的服务器崩溃风险，新增对 HRM-Text（DFM Mimir 1B）、MiMo-V2.6、HunyuanOCR 以及 Gemma4 DSpark 草稿的支持，进一步拓展了项目在多模态与低延迟推理方面的能力。

---

### **2. 发布与破坏性变更**  
- **`v0.5.0` 已发布** ([GitHub](https://github.com/ggml-org/llama.cpp/releases/tag/v0.5.0))  
  - 服务器路由逻辑与 HTTP 绑定行为引入破坏性变更；请参阅 [变更日志](https://github.com/ggml-org/llama.cpp/blob/main/CHANGELOG.md) 获取迁移指引。  
  - 现支持通过 `--host` 列表语法配置多地址绑定（例如 `--host 0.0.0.0,127.0.0.1`）。  
  - `server: fix token counting API crash on sleep` (#29309) 解决了路由器模式部署中的关键稳定性问题。

---

### **3. 新增模型与硬件支持**  
- ✅ **HRM-Text (DFM Mimir 1B)**：已添加 GGUF 转换与运行时支持。  
  [PR #27372](https://github.com/ggml-org/llama.cpp/pull/27372)  
- ✅ **MiMo-V2.6 与 HunyuanOCR**：为视觉语言模型新增转换支持。  
  [PR #29339](https://github.com/ggml-org/llama.cpp/pull/29339)  
- ✅ **Gemma4 DSpark 草稿主干**：完整支持 SWA 与全注意力变体，并启用权重共享输出。  
  [PR #29226](https://github.com/ggml-org/llama.cpp/pull/29226)  
- ✅ **Hexagon NPU**：CI 现可构建适用于 Hexagon NPU（面向边缘 AI 设备）的 Windows Arm64 二进制包。  
  [PR #29052](https://github.com/ggml-org/llama.cpp/pull/29052)  
- ✅ **OpenCL**：新增 A8 Q6_K 非 MoE dp4a 二进制内核，提升 AMD GPU 上的执行效率。  
  [PR #29057](https://github.com/ggml-org/llama.cpp/pull/29057)

---

### **4. 性能与优化**  
- 🔥 **CUDA 稀疏 Flash Attention**：重新启用 `sparse-fa` 支持 dsv4 预填充，循环展开优化提升吞吐量。  
  [PR #29298](https://github.com/ggml-org/llama.cpp/pull/29298)  
- 🚀 **SYCL (Intel Arc)**：IQ3_S/IQ3_XXS MMVQ 重排序感知反量化在 B70 上将延迟降低约 18%。  
  [PR #29107](https://github.com/ggml-org/llama.cpp/pull/29107)  
- ⚙️ **Vulkan RDNA3/RDNA4**：Int8 coopmat1 矩阵乘法实现（cm1 shader）支持更快速的 q4_0/q5_1/q8_0 推理。  
  [PR #27952](https://github.com/ggml-org/llama.cpp/pull/27952)  
- 💡 **Qwen4exp**：直接读取（`-lzm on-direct`）在 Strix Halo 平台上将惰性张量开销降低最高达 40%。  
  [PR #29030](https://github.com/ggml-org/llama.cpp/pull/29030)

---

### **5. 稳定性与回归问题**  
- ⚠️ **严重崩溃**：服务器在休眠状态下处理请求时因过期词汇表/mctx 捕获导致崩溃。  
  已在 [#29309](https://github.com/ggml-org/llama.cpp/pull/29309) 中修复（合并至 v0.5.0）。  
- ⚠️ **性能回归**：自 b11047 → b11062 后，CUDA 稀疏 Flash Attention 解码速度**下降 1.6 倍**。  
  [问题 #29281](https://github.com/ggml-org/llama.cpp/issues/29281) — 正在调查中。  
- ⚠️ **Metal**：在批量处理多个长序列时（M3 Ultra），解码吞吐量骤降。  
  [问题 #29335](https://github.com/ggml-org/llama.cpp/issues/29335) — 可在预编译二进制包中复现。  
- ⚠️ **Vulkan**：上下文长度达 131072 时，解码吞吐量出现约 78% 的断崖式下降，由子分配碎片化引起。  
  通过设置 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` 解决。  
  [问题 #27734](https://github.com/ggml-org/llama.cpp/issues/27734)  
- ⚠️ **ROCm/HIP**：在 gfx1151（RDNA3）上，当提示词长度超过 `n_ubatch` 时返回错误的 logits。  
  [问题 #28211](https://github.com/ggml-org/llama.cpp/issues/28211)

---

### **6. 对应用开发者的意义**  
- 若使用路由器模式或多设备部署，请立即升级至 `v0.5.0`——关键崩溃修复已包含在内。  
- 对于大上下文的 Vulkan 工作负载（≥131k tokens），请使用 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4GiB`。  
- 在 Intel Arc 或 AMD RDNA3/4 上进行高吞吐推理时，通过 `--backend vulkan` 或 `--backend sycl` 启用 SYCL 或 Vulkan Int8 内核。  
- 避免在默认 CUDA 构建中使用 `q4_0/q4_1` KV 缓存——请启用 `GGML_CUDA_FA_ALL_QUANTS=ON` 以防止无声回退至 CPU。  
  [问题 #28633](https://github.com/ggml-org/llama.cpp/issues/28633)  
- 监控多 GPU 系统上的 `--n-cpu-moe` 行为：释放的内存可能无法在各设备间均衡分布。  
  [PR #29343](https://github.com/ggml-org/llama.cpp/pull/29343) 提供了明确说明。  

> ✅ **最佳实践**：在生产环境中部署时，始终启用 `--log-file` 进行测试，以便尽早发现隐性回归问题。  
> 📌 详见 [文档](https://github.com/ggml-org/llama.cpp#running-the-server) 获取更新后的配置模式。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### **1. 今日亮点**  
Ollama 最新发布的 `v0.34.4-rc1` 版本修复了关键的稳定性问题，包括间歇性“模型未找到”错误以及基于 MLX 引擎模型长期存在的结构化输出问题。主要改进包括提升 MLX 运行器的卡顿检测能力、优化 GPU 内存压力处理，并新增 `export/import` 命令以支持模型离线迁移——标志着在可靠性与开发者工作流方面均展现出强劲势头。

---

### **2. 发布与破坏性变更**  
- **`v0.34.4-rc1`（发布候选版）**：  
  - 修复间歇性“模型未找到”错误 ([#18438](https://github.com/ollama/ollama/pull/18438))。  
  - 对思考类模型实现单次遍历的结构化输出应用 ([#18479](https://github.com/ollama/ollama/pull/18479))。  
  - 新增 `ollama export <model> <target-dir>` 与 `import` 命令，支持离线模型传输 ([#18578](https://github.com/ollama/ollama/pull/18578))。  
  > ⚠️ 注意：此版本对模型存储格式进行了破坏性变更；升级前请务必备份模型。

---

### **3. 新模型与硬件支持**  
- **MLX 引擎**：  
  - 增强对 **Nemotron** 模型的支持，包含全局缩放参数及固定层数推理功能 ([#18614](https://github.com/ollama/ollama/pull/18614))。  
  - 通过升级至 `xgrammar` v0.2.7 提升集成效果，修复类型字典和短数组的模式处理问题 ([#18615](https://github.com/ollama/ollama/pull/18615))。  
- **新模型请求**：  
  - 社区强烈呼吁支持 **MIMO v2.5** 与 **MIMO v2.6-Pro/Flash**（百万级上下文窗口模型）([#15887](https://github.com/ollama/ollama/issues/15887), [#18616](https://github.com/ollama/ollama/issues/18616))。

---

### **4. 性能与优化**  
- **CPU 使用率修复**：  
  - `v0.32.14` 版本中的回归问题导致即使模型已完全加载至显存，仍出现极高 CPU 占用（约 100% 空闲核心）([#17833](https://github.com/ollama/ollama/issues/17833))。  
  - 通过在 GPU 可用时向 `llama-server` 传递 `--poll 0` 参数予以修复 ([#18613](https://github.com/ollama/ollama/pull/18613))，后台 CPU 负载降低约 90%。  
- **内存效率**：  
  - 如 [#18612](https://github.com/ollama/ollama/issues/18612) 所示，提出在 GPU 显存压力下尝试释放显存的策略——对多任务环境（如游戏 + LLM 推理）尤为关键。  
- **嵌入吞吐优化**：  
  - 优化 `/api/embed` 接口路径，避免不必要的 JSON 序列化往返操作 ([#18610](https://github.com/ollama/ollama/pull/18610))，显著提升大输入批量处理性能。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重程度 | 状态 | 修复提交 |  
|------|----------|--------|--------|  
| MLX `nvfp4`：预填充阶段请求无限卡顿（processed=total-1） | 严重 | 开放 | [PR #17834](https://github.com/ollama/ollama/pull/17834)（进行中） |  
| MLX 上结构化输出永不终止（持续输出空格） | 高 | 已关闭 | [PR #18569](https://github.com/ollama/ollama/pull/18569) |  
| Homebrew 安装的 Ollama 无法对 MLX 模型提供结构化输出 | 中等 | 开放 | [Issue #18597](https://github.com/ollama/ollama/issues/18597) |  
| `glm-ocr` 在 `v0.34.1` 后返回 HTTP 500 错误，因令牌重复限制 | 高 | 开放 | [PR #17195](https://github.com/ollama/ollama/pull/17195)（审核中） |  
| Gemma 4 在字符串值超过 45 个时工具调用丢失，因参数解析冲突 | 中等 | 已关闭 | [Issue #18605](https://github.com/ollama/ollama/issues/18605) |  

> ✅ **注意**：多个 MLX 引擎相关回归问题正在积极修复中，表明底层推理路径仍在持续优化。

---

### **6. 对应用开发者的意义**  
- **构建健壮智能体**：对 MLX 结构化输出终止问题的修复 ([#18569](https://github.com/ollama/ollama/pull/18569)) 实现了可靠的 JSON 模式校验——这对工具调用智能体至关重要。  
- **避免 CPU 膨胀**：若使用基于 GPU 的推理，请确保版本不低于 `v0.34.4`，以防止失控的 CPU 占用。  
- **规划离线工作流**：使用 `ollama export/import` ([#18578](https://github.com/ollama/ollama/pull/18578)) 实现安全、隔离环境下的模型部署。  
- **关注 MLX 限制**：在卡顿检测与内存压力处理机制成熟前，避免在无监控的情况下运行高吞吐量的 MLX 任务。  
- **未来兼容性布局**：随着 OpenAI 兼容性演进，建议考虑采用自定义工具 ([#17673](https://github.com/ollama/ollama/issues/17673))。

> 🔗 *关注开发进展：* [github.com/ollama/ollama](https://github.com/ollama/ollama)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 简报 – 2026-09-24**

---

### **1. 今日重点**  
LiteLLM 项目持续快速迭代，聚焦成本准确性、安全加固与运维健壮性。主要更新包括修复预算强制机制绕过问题（问题 #26672）、改进 Vertex AI 与 OpenRouter 模型的成本映射（PRs #42837, #42832），以及通过 `--validate_config` 干运行支持增强可审计性（PR #41705）。这些变更进一步巩固了 LiteLLM 在受监管及高流量生产环境中的大模型网关地位。

---

### **2. 发布与破坏性变更**  
今日未发布新稳定版本。最新版本为 **v1.104.0-dev.1**，一个开发构建版本，包含对 Docker 镜像签名通过 **cosign** 的持续改进（使用 [提交 `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中的密钥验证）。本周期内未报告任何破坏性 API 或配置变更。

---

### **3. 新模型与硬件支持**  
- 通过 PR [#42837](https://github.com/BerriAI/litellm/pull/42837) 新增对 **Vertex AI 的 Llama 3.3 70B MaaS**、**Veo 2/3**、**虚拟试穿** 及 **GA 2.5 TTS 模型** 的支持。  
- 通过 PR [#42833](https://github.com/BerriAI/litellm/pull/42833) 在成本映射中新增 **Gemini 预览别名** 与 **Deep Research 04-2026** 模型条目。  
- 通过 PR [#42832](https://github.com/BerriAI/litellm/pull/42832) 更新 OpenRouter 定价以反映实时模型 API 数据，包含上下文窗口超过 32k/128k/256k 时的分层 Qwen 定价。  
- 修复 Azure FLUX.2 图像编辑计费问题，正确计入 **参考图像像素数量**（PR [#42829](https://github.com/BerriAI/litellm/pull/42829)）。

---

### **4. 性能与优化**  
- **成本追踪现已原生支持 Vertex AI 的批量 JSONL 输入**（PR [#42810](https://github.com/BerriAI/litellm/pull/42810)），在批量处理中无需格式转换即可保持完整精度。  
- 引入基于 **Rust** 的独立成本计算模块（PR [#42620](https://github.com/BerriAI/litellm/pull/42620)），提升跨语言一致性，并加速 CI/CD 流水线中成本逻辑的验证速度。  
- 优化 **提示词缓存 UI 分页**，每页仅加载 10 个请求（PR [#42638](https://github.com/BerriAI/litellm/pull/42638)），降低前端加载时间并改善用户体验。

---

### **5. 稳定性与回归问题**  
- **严重**：v1.82.3 版本中预算强制机制被绕过（问题 #26672）——用户报告即使支出已超阈值，`max_budget` 限制仍被忽略。影响所有使用速率限制的密钥与团队。*修复待定。*  
- **高**：速率限制器重复计算团队-模型级限制（问题 #34140）——实际 RPM/TPM 仅为配置值的一半。已在 v1.100.x–v1.104.x 中确认。*修复 PR 正在评审中。*  
- **中等**：流式防护规则可能遗漏跨 SSE 数据块分割的敏感值（问题 #41611）——存在未检测到的个人身份信息（PII）泄露风险。  
- **低**：缓存会丢失 `provider_specific_fields`（如 Anthropic 引用）因响应存储不完整（问题 #13048）。  
- **低**：启动阶段竞争条件导致多 Pod 部署中 Redis 协调失败（问题 #42653）——各 Pod 间预算可能错位。

---

### **6. 对应用开发者的影响**  
- 若预算控制至关重要，请**避免使用 v1.82.3**，立即升级至 v1.100+，并关注回归修复进展。  
- 在 CI/CD 流程中启用 `--validate_config`，提前发现配置错误（PR #41705）。  
- 使用更新后的成本映射（适用于 **Vertex AI、OpenRouter、Gemini 模型**），避免出现 $0 消耗日志并确保计费准确。  
- 对需 **PII 保护** 的代理系统，务必验证防护规则在流式与非流式路径中的一致性（问题 #41265、#41611）。  
- 在多语言环境中，可考虑采用 **基于 Rust 的成本校验**（通过 `litellm-cost`）以实现端到端一致性。

> 🔗 详细信息：[GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-24**

---

### **1. 今日亮点**  
Unsloth v0.1.815-beta 正式发布，全面支持本地运行 **Qwen-Image-2.1**，包含自定义 Agent Skills 及改进的聊天/项目管理功能。关键性能提升包括 **推理模块速度提升 2 倍（60 FPS vs 30 FPS）**，同时多个 PR 修复了关键的 AMD/ROCm 稳定性问题——尤其针对 VAE 解码卡死和 GPU 驱动冲突。

---

### **2. 发布与破坏性变更**  
- **v0.1.815-beta**：新增对 Qwen-Image-2.1 GGUF 的支持、Agent Skills 功能及 60 FPS 推理能力。  
  [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.815-beta)  
- *注意*：未报告破坏性 API 变更；向后兼容性已保持。

---

### **3. 新模型与硬件支持**  
- **模型**：  
  - `unsloth/Qwen-Image-2.1-GGUF` 现已在本地完全支持，文本编码器启用 FP8 备用模式。  
    [Issue #11567](https://github.com/unslothai/unsloth/issues/11567)  
  - 新增 `unsloth/Qwen3.8-27B-NVFP4` safetensors 模型（仅 NVIDIA 平台）。  
    [Issue #11728](https://github.com/unslothai/unsloth/issues/11728)  

- **硬件与后端**：  
  - **AMD Ryzen AI NPU (XDNA 2)**：通过 Lemonade + FastFlowLM 实现原生级支持，用于设备端推理。  
    [PR #11743](https://github.com/unslothai/unsloth/pull/11743)  
  - **Adreno GPU (Qualcomm)**：已开启功能请求，以通过 GenieX/llama.cpp 实现 GGUF 执行支持。  
    [Issue #11674](https://github.com/unslothai/unsloth/issues/11674)  
  - **ROCm 10 与 7.14**：安装程序修复确保正确检测 PyTorch 版本。  
    [Issue #10657](https://github.com/unslothai/unsloth/issues/10657)，[PR #11736](https://github.com/unslothai/unsloth/pull/11736)

---

### **4. 性能与优化**  
- **推理速度**：推理模块性能提升 2 倍 → **60 FPS**（由 30 FPS 提升）。  
- **图像生成**：  
  - 引入静态步跳缓存（PR #11737, #11748），实现 CUDA graph 兼容的跳步机制，降低启动开销。  
  - VAE 解码进度现可在 UI 进度条中显示（PR #11740）。  
- **NVFP4 后端**：FlashInfer 现为 NVFP4 模型按需安装（PR #11730），避免使用较慢的 torchao 回退方案。  
- **速度层级优化**：防止每次提示长度变化时重复编译（PR #11731）。

---

### **5. 稳定性与回归问题**  
- **严重（高危）**：  
  - **AMD ROCm VAE 解码崩溃**，因 `cudnn.benchmark=True` 触发全面的 MIOpen 调优。  
    已通过 PR #11732 修复。  
  - **图像生成期间 GPU 内核失败导致整个服务进程崩溃**（PR #9130）。  
  - **Qwen-Image-2.1 在 Windows ROCm 上无法加载**，因缺失 FP8 仓库（`404` 错误）。  
    [Issue #11638](https://github.com/unslothai/unsloth/issues/11638)  
- **中等**：  
  - **桌面应用持续占用 CPU**（Issue #10390）。  
  - **Unsloth 桌面安装程序在 Snapdragon X2 Elite 上失败**，原因在于 `pyarrow` 依赖项。  
    [Issue #8495](https://github.com/unslothai/unsloth/issues/8495)  
- **UI/UX**：  
  - 窗口最大化时底部标签栏无响应（PR #11734）。  
  - 图像生成最后一步后显示“卡住”状态（PR #11740 已修复）。

---

### **6. 对应用开发者的意义**  
- **构建更智能的 Agent**：借助 **自定义 Agent Skills** 与 **工具调用禁用选项**，开发者可强化安全性和行为可预测性——尤其适用于敏感数据工作流。  
  [Issue #11671](https://github.com/unslothai/unsloth/issues/11671)  
- **优化多后端部署**：新支持的 **ROCm 10**、**AMD NPU 集成** 及 **vLLM/SGLang 可选集成**（PR #11491） enables 跨平台推理策略。  
- **提升用户体验**：利用 **静态步跳缓存**（#11737, #11748）与 **VAE 进度报告**（#11740）降低图像/视频流水线中的感知延迟。  
- **避免静默失败**：谨慎使用 `save_pretrained_gguf` 于 LoRA 模型——当前行为会导出基础模型而非合并权重。  
  [Issue #11698](https://github.com/unslothai/unsloth/issues/11698)  
- **充分利用原生 llama.cpp API**：未来将支持切换原始 `llama.cpp` 端点与 OpenAI 兼容接口并行，助力高级工具链集成。  
  [Issue #11705](https://github.com/unslothai/unsloth/issues/11705)

---  
*本摘要基于 GitHub 活动（2026-09-24）整理。*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*