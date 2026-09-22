# AI 基础设施日报 2026-09-22

> 生成时间: 2026-09-22 01:06 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **跨项目对比报告：AI基础设施生态 – 2026-09-22**

#### **1. 生态概览**  
2026年第三季度，AI推理与服务领域正快速向**分布式、代理感知、硬件无关执行**演进，**推测解码**、**分离式服务（P/D）** 和 **多后端支持** 方面势头强劲。各项目正致力于通过提升稳定性、结构化输出可靠性以及跨平台可移植性，推动生产级大语言模型应用——尤其是智能体——的落地。以GLM-5.3-Flash和Qwen3.8-Flash为代表的MoE模型兴起，加剧了优化与模型专用内核调优的竞争，而安全与成本治理已成为企业采纳的必备条件。

---

#### **2. 活跃度对比**

| 项目       | 开放问题数 | 最近24小时合并的PR数 | 发布版本 | 破坏性变更 |
|---------------|-------------|-------------------------|----------|------------------|
| **vLLM**      | 87          | 12                      | 无     | 无             |
| **SGLang**    | 121         | 9                       | 无     | 无             |
| **llama.cpp** | 134         | 10                      | 1 (`b11094`) | 3（新增标志/环境变量） |
| **Ollama**    | 153         | 5                       | 无     | 无             |
| **LiteLLM**   | 148         | 6                       | 无     | 无             |
| **Unsloth**   | 129         | 7                       | 无     | 3（配置/行为修复） |

> ✅ *观察*：**llama.cpp** 在发布速度上领先，而**SGLang**与**Unsloth**的问题数量最高——反映出其在稳定性和复杂硬件集成方面仍处于活跃攻坚阶段。

---

#### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash**         | ✅ (DFlash2 draft) | ✅ (SM120 + ROCm) | 🟡 (实验性) | ⚠️ (崩溃风险) | ✅ (通过Fal AI) | ✅ (IFM协议) |
| **Qwen3.8-Flash-Next**    | ✅ (ROCm, DFlash) | ✅ (MTP, SM120) | ❌ (Vulkan崩溃) | ⚠️ (工具调用崩溃) | ✅ (通过Fal AI) | ❌ (MTP中止) |
| **Ling-3.0-flash-VL**     | ❌ | ❌ | ✅ (实验性) | ❌ | ❌ | ❌ |
| **Prism Ternary GGUFs**   | ❌ | ❌ | ❌ | ✅ (进行中) | ❌ | ❌ |
| **Apple MLX (Gemma 4 MTP)** | ❌ | ✅ (进行中) | ✅ (MTP推测) | ✅ (MLX加速) | ❌ | ✅ (IFM) |
| **AMD Strix Halo (gfx1151)** | ⚠️ (性能下降) | ❌ | ⚠️ (Vulkan崩溃) | ⚠️ (ROCm崩溃) | ❌ | ❌ |

> 🏆 **领先者**：**SGLang**与**llama.cpp**在NVIDIA、AMD、Apple和Intel后端上均展现出广泛且深入的模型支持能力。  
> 🔥 **新兴优势**：**Unsloth**与**Ollama**正在**原生代理工作流**（IFM、工具调用）中崭露头角，而**vLLM**则在**ROCm平台兼容性**方面占据主导地位。

---

#### **4. 性能前沿**

| 优化方向        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存与缓存逻辑** | ✅ (缓存感知准入) | ✅ (代理感知KV缓存RFC) | ❌ | ❌ | ❌ | ❌ |
| **推测解码**   | ✅ (DFlash2, MXFP8融合) | ✅ (HiCache, MTP草稿) | ⚠️ (Vulkan越界错误) | ✅ (MLX加速) | ❌ | ✅ (IFM/K2-Horizon) |
| **批处理与图计算** | ✅ (可中断CUDA图) | ✅ (流水线、PD分离) | ✅ (SYCL图重放) | ❌ | ❌ | ❌ |
| **量化与MMVQ**    | ❌ | ✅ (IQ3_S/IQ3_XXS) | ✅ (Hexagon GATED_DELTA_NET) | ✅ (QAT内存峰值) | ❌ | ✅ (T4训练崩溃) |
| **分布式服务（P/D）** | ✅ (PD分离) | ✅ (流水线并行) | ❌ | ❌ | ❌ | ❌ |
| **内核级调优**    | ✅ (MXFP8 + reduce-scatter) | ✅ (DSA, 统一RadixCache) | ✅ (Adreno 830融合) | ❌ | ❌ | ❌ |

> 🔍 **关键洞察**：**vLLM**与**SGLang**在**分布式推理与推测解码**方面领先，**llama.cpp**则在**底层后端效率**（Hexagon、Vulkan、SYCL）上表现卓越。**Unsloth**正推动**代理感知内核**的边界，但面临稳定性权衡。

---

#### **5. 层级定位**

| 项目       | 主要层级                  | 核心差异化 |
|---------------|--------------------------------|--------------------|
| **vLLM**      | **推理引擎**           | 行业标准GPU加速服务，具备ROCm兼容性与推测解码能力 |
| **SGLang**    | **推理引擎 + 网关**    | 端到端代理感知运行时，支持流水线并行与HiCache |
| **llama.cpp** | **本地运行时 / 嵌入式**   | 跨平台、原生支持CPU/GPU/Metal/SYCL；适用于边缘与移动端 |
| **Ollama**    | **网关 + 本地运行时**    | 开发者友好的命令行界面，支持MLX加速及离线模型导出 |
| **LiteLLM**   | **API网关 / 编排层**     | 企业级路由、成本追踪、PII防护机制与多提供商抽象 |
| **Unsloth**   | **微调 + 运行时**      | 高性能微调引擎，正逐步支持IFM/代理功能 |

> 🧩 **战略启示**：  
> - **构建高吞吐系统的技术团队**：优先选用**vLLM**或**SGLang**。  
> - **边缘/移动端开发者**：推荐选择**llama.cpp**。  
> - **企业级应用团队**：使用**LiteLLM**作为任何后端之上的安全网关。  
> - **智能体与代理类应用**：**Unsloth**与**SGLang**在状态保持执行与推理协议方面具有独特优势。

---

#### **6. 趋势信号**

1. **原生代理基础设施日趋成熟**  
   - **SGLang的代理感知KV缓存RFC**、**Unsloth的IFM支持**以及**Ollama的结构化输出修复**表明，基础设施正从单纯的LLM服务转向**有状态、内存感知的智能体执行**。

2. **硬件兼容性不再是可选项**  
   - 随着**vLLM/SGLang支持ROCm**、**llama.cpp支持Intel Arc**、**Ollama集成Apple MLX**，开发者必须将**跨架构可移植性**视为基础要求。

3. **安全与治理已成为核心特性**  
   - **LiteLLM的Presidio PII掩码**、**预算控制**与**成本预测**功能反映了行业向**可审计、合规的推理栈**转变的趋势。

4. **推测解码正成为标配**  
   - 通过DFlash2（vLLM）、MTP草稿（SGLang）与门控-增量内核（Ollama）实现，这已不再是实验性功能，而是低延迟智能体的必要组件。

5. **性能与稳定性之间的权衡日益突出**  
   - **Unsloth的AMD Strix Halo性能下降**、**vLLM的ROCm CUDA图崩溃**、**llama.cpp的Vulkan越界漏洞**凸显激进优化带来的新故障模式——开发者必须进行充分测试。

> ✅ **对应用开发者的可操作建议**：  
> - **避免在 `/v1/chat/completions` 中使用 `max_tokens`**（Ollama）；应在客户端强制限制。  
> - **调试时禁用推测解码（`--nodraft`）**（Ollama）。  
> - **使用 `export/import` 实现离线部署**（Ollama）。  
> - **部署生产级智能体前，请关注关键问题（#57064, #40232, #11143）**。  
> - **在需要审计日志与安全防护的受监管环境中，优先选择LiteLLM或SGLang**。

---  
*生成时间：2026-09-22 | 数据来源：vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth GitHub活动摘要*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-09-22**

#### **1. 今日亮点**  
vLLM 项目持续推进对下一代硬件和推理模式的支持，重点在 **ROCm（AMD）平台功能对齐**、**解耦服务（P/D）** 以及 **推测性解码集成** 方面取得显著进展。今日关键 PR 主要聚焦于在 ROCm 上稳定运行 **DeepSeek-V4/5.3-Flash**，优化分布式引擎中的 **KV 缓存管理**，并支持 **DFlash2 草稿模型** 用于 GLM-5.3-Flash。

#### **2. 版本发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
无新版本发布或破坏性 API/配置变更。最新稳定版本仍为 `v0.28.1rc1.dev580+g385dce36b`（截至问题 #56868）。开发者应关注 `main` 分支以获取即将推出的特性和稳定性改进。

#### **3. 新模型与硬件支持**  
- ✅ **ROCm（AMD）平台扩展**：  
  - 通过 PR #58012 新增针对 **MI355X / gfx950** 的专用单元测试组，目标模型包括 Qwen3.8-2.4T-A95B 和 Kimi-K3。  
  - PR #57428 引入了在序列并行下针对 DeepSeek-V4.1 的融合 **MXFP8 GEMM + reduce-scatter** 内核——对 AMD GPU 性能至关重要。  
- ✅ **模型特定支持**：  
  - PR #56983 使 **DFlash2 草稿模型**（`incoai/GLM-5.3-Flash-DFlash2`）与 `GLM-5.3-Flash` 兼容，解锁该模型家族的推测性解码能力。  
  - PR #58040 修复了在图捕获下 Qwen 模型中的 **QSA 元数据填充问题**，提升了长上下文工作负载的可靠性。

> 🔗 [PR #58012](https://github.com/vllm-project/vllm/pull/58012), [PR #56983](https://github.com/vllm-project/vllm/pull/56983), [PR #57428](https://github.com/vllm-project/vllm/pull/57428)

#### **4. 性能与优化**  
- **推测性解码效率**：  
  - PR #57428 在 SM100 上融合 **MXFP8 GEMM + reduce-scatter**，减少 HBM 往返次数，提升序列并行场景下 DeepSeek-V4.1 的吞吐量。  
- **KV 缓存管理**：  
  - PR #54625 引入 **缓存感知的请求准入排序**，优先处理具有缓存前缀的请求——有效缓解长预填充工作负载下的解码饥饿问题（参见 #54919）。  
- **图与编译优化**：  
  - PR #57586 提议在 `VLLM_BATCH_INVARIANT=1` 下默认使用 **可中断的 CUDA 图**，使经过调优的 matmul 配置能够动态适应运行时的 M 维度变化。

> 🔗 [PR #57586](https://github.com/vllm-project/vllm/pull/57586), [PR #54625](https://github.com/vllm-project/vllm/pull/54625), [PR #57428](https://github.com/vllm-project/vllm/pull/57428)

#### **5. 稳定性与回归问题**  
- ⚠️ **严重稳定性问题**：  
  - **问题 #57064**：在 ROCm 上以 **CUDA 图模式运行于 PD 解耦模式** 时，**DeepSeek-V3.2/GLM-5.x** 出现退化输出（如 `locklocklock...`）。严重等级高；暂无修复方案。  
  - **问题 #56868**：在 **GLM-5.3-Flash** 中，经过累积推理步骤后出现长期解码退化（TP=1, B300）。可在 `v0.28.1rc1` 中复现。  
- ⚠️ **硬件相关缺陷**：  
  - **问题 #41663**：Intel Arc B70（Battlemage）GPU 在 `intel/vllm:0.17.0-xpu`（Ubuntu 24.04 HWE）环境下发生 **GP 故障 + BCS 引擎重置**，影响 XPU 后端稳定性。  
- 🛠 **正在进行修复**：  
  - PR #57914 修复了缺失的 `/dev/shm` 检查导致的共享 engram 表崩溃问题。  
  - PR #55390 为 MTP 草稿组添加位置标注——解决混合模型中静默误分类问题。

> 🔗 [问题 #57064](https://github.com/vllm-project/vllm/issues/57064), [问题 #56868](https://github.com/vllm-project/vllm/issues/56868), [PR #57914](https://github.com/vllm-project/vllm/pull/57914)

#### **6. 对应用开发者的启示**  
- **对于智能体与工具调用类应用**：启用 `--speculative-config` 并搭配 DFlash2 草稿模型（通过 #56983）以加快 GLM-5.3-Flash 的响应速度。注意监控回归 #46249（开启 MTP 后 Qwen3.6 工具调用失败）。  
- **对于多模态/Mamba 类应用**：避免在睡眠模式下使用 `mm-encoder-tp-mode data`（参见 #47654）；内存泄漏可能导致容器编排阻塞。如有需要，请使用 `--sleep-preserve-parameter-names`。  
- **对于高吞吐系统**：利用缓存感知准入（#54625）和可中断图（#57586），降低突发流量下的解码延迟峰值。  
- **对于 AMD 用户**：近期 CI/测试更新（#58012, #57428）将带来 MI355X/GFX950 的稳定性提升；在 #57064 修复前，请避免在 PD 解耦模式下使用 `CUDA graphs`。

> 💡 **行动项**：请对照 `v0.28.1rc1` 审查您的部署栈，并测试 GLM-5.3-Flash 与 DeepSeek-V4.1 在 ROCm + PD 解耦环境下的行为。密切关注 #57064 以获取关键修复进展。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 – 2026-09-22

---

### **1. 今日亮点**  
SGLang 继续积极推进可扩展、生产级 LLM 服务，重点在 **流水线并行**、**预填充-解码分离** 和 **面向智能体的 KV 缓存设计** 方面取得重大进展。今日关键 PR 主要聚焦于支持 **在 Blackwell GPU（SM120）上运行 GLM-5.3-Flash**，提升 **AMD ROCm 对稀疏注意力的支持**，并优化 **HiCache 阶段写回逻辑** 以增强内存安全性。社区正在积极稳定 CI 流水线，#17050 中报告了 3 个失败和 10 个不稳定测试。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布或破坏性变更。*

---

### **3. 新模型与硬件支持**  
- ✅ **在 SM120（Blackwell）上支持 GLM-5.3-Flash**：关键修复已落地，实现对 RTX PRO 6000（96GB）的完整支持，包括 DSA 后端兼容性和非 2048 宽度 top-k 处理 (#39340, #37813)。  
- ✅ **AMD ROCm**：通过 PR 实现 `aiter allreduce fusion` (#39790) 与统一页清零测试 (#40123)，进一步拓展支持。  
- ✅ **Apple Silicon（MLX）**：持续开发 Gemma 4 MTP 规划解码及冻结 KV 路径 (#32264, #32101)。  
- 🟡 **NPU（Ascend）**：CANN 9.1.0 更新已发布 (#40524)，与最新 Ascend 工具链对齐。

> 🔗 [PR #39340](https://github.com/sgl-project/sglang/pull/39340) – GLM-5.3-Flash 支持 2051 令牌宽度  
> 🔗 [PR #40524](https://github.com/sgl-project/sglang/pull/40524) – NPU 的 CANN 9.1.0 / Python 3.12 升级  

---

### **4. 性能与优化**  
- 🚀 **流水线并行路线图**（问题 #11857）：通过 PD 分离与流水线技术，显著降低长上下文输入（如 100 万令牌）的 TTFT，是高吞吐推理的关键推动力。  
- ⚙️ **UnifiedRadixCache + LMCache 集成**（PR #38652）：实现重启后持久化 KV 重用，对智能体工作流和低延迟重运行至关重要。  
- 🔥 **HiCache 阶段写回修复**（PR #40232）：解决批量异步拷贝过程中主机虚拟地址注册失败的问题，防止大批次负载下的崩溃。  
- 💡 **内核优化**：  
  - PR #40628 确保 BF16 共享专家不参与 NVFP4 融合，修复 TP1 权重加载失败问题。  
  - PR #40656 将 FlashInfer MTP 验证路由至公共分发路径，确保 SM100 上的状态正确处理。

> 🔗 [PR #38652](https://github.com/sgl-project/sglang/pull/38652) – LMCache 已集成至 UnifiedRadixCache  
> 🔗 [PR #40656](https://github.com/sgl-project/sglang/pull/40656) – SM100 上 MTP 验证路由修正  

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 状态 |
|--------|------|-------------|--------|
| ⚠️ 高 | #40232 | 由于向 `cudaMemcpyBatchAsync` 传递无效主机 VA 导致 HiCache 阶段写回故障 | 开放 |
| ⚠️ 高 | #40574 | DeepSeek-V4.1 缺失两级候选索引器追踪 | 开放 |
| ⚠️ 中 | #40144 | 未经验证即假设 DFLASH 草稿布局 → 静默锚点偏移 | 开放 |
| ❌ 低 | #39103 | `include_reasoning=false` 仍返回推理元数据 | 已关闭 |

> 🔗 [问题 #40232](https://github.com/sgl-project/sglang/issues/40232) – HiCache 批量路径中主机指针故障  
> 🔗 [问题 #40144](https://github.com/sgl-project/sglang/issues/40144) – 静默的 DFLASH 布局假设缺陷  

---

### **6. 对应用开发者的意义**  
- **智能体与智能体工作流**：即将推出的 **面向智能体的 KV 缓存（第一阶段，RFC #24656）** 将允许你在运行时传入工作流上下文（如步骤 ID、操作历史），实现更智能的缓存与有状态执行。  
- **长上下文应用**：流水线并行与 PD 分离正迅速成熟 —— 预计文档超过 10 万令牌时，TTFT 将显著降低。  
- **多 GPU 部署**：使用 `--disaggregation-decode-host-receive-threshold`（PR #40238）可优化高延迟网络下预填充 → 解码的交接效率。  
- **模型可移植性**：随着 **GLM-5.3-Flash** 与 **DeepSeek-V4.1** 支持持续推进，你的应用现在可在 NVIDIA、AMD 与 Apple Silicon 后端上利用前沿 MoE 模型。

👉 *实用提示*：关注 #39499（dLLM 服务）与 #21891（模拟器），两者将带来下一代块差分扩散与性能基准测试能力，对扩展智能体与微调流水线至关重要。

---  
*数据来源：GitHub，sgl-project/sglang | 2026-09-22*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-22**

---

### **1. 今日亮点**  
最新更新聚焦于后端稳定性与跨平台兼容性，修复了 Metal Flash Attention 的边界问题以及 CUDA Volta Tile 编译错误。新增 `--no-mmap-prefetch` 标志解决了大型模型加载时 macOS 的性能瓶颈，同时增强的 SYCL 支持提升了 Intel Arc GPU 上的推理效率。

---

### **2. 发布与破坏性变更**  
- **新版本发布**：`b11094`（最新版）包含 `cpp-httplib@0.57.1` 的供应商更新 ([#29239](https://github.com/ggml-org/llama.cpp/pull/29239))。  
- **可配置环境变量**：新增 `LLAMA_ARG_*` 环境变量，支持温度、top-p、min-p 及惩罚参数配置 ([#27380](https://github.com/ggml-org/llama.cpp/pull/27380)) — 可通过 `EnvironmentFile`（如 systemd）实现服务器级全控制。  
- **新标志**：`--no-mmap-prefetch` 禁用 Linux/macOS 上的 `MADV_WILLNEED`，避免加载超过半内存大小的模型时出现长时间阻塞等待 ([#29250](https://github.com/ggml-org/llama.cpp/pull/29250))。

---

### **3. 新模型与硬件支持**  
- **模型支持**：新增对 **Ling-3.0-flash-VL**（BailingMoeV3VL）的实验性支持，该模型为 1240 亿参数的混合 KDA + 门控 MLA 视觉语言模型 ([#29151](https://github.com/ggml-org/llama.cpp/pull/29151))。  
- **硬件后端**：  
  - **SYCL**：增强图记录/重放功能及 IQ3_S/IQ3_XXS MMVQ 的持久化重排布局 ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725), [#29107](https://github.com/ggml-org/llama.cpp/pull/29107))。  
  - **Hexagon**：新增针对 HMX 优化的 GATED_DELTA_NET 内核，在 Galaxy S26/S25/S24 与 VentunoQ 设备上实现 **1.5–3× 更快的提示处理速度** ([#29199](https://github.com/ggml-org/llama.cpp/pull/29199))。  
  - **Vulkan**：针对 Intel GPU 优化了对齐批次的 F32 A 矩阵加载 ([#29254](https://github.com/ggml-org/llama.cpp/pull/29254))。  
- **量化**：为 GGUF 模型（如 [Sophia](https://huggingface.co/Arain119/sophia)）新增 `sophia` 预分词类型（无需正则分割）支持 ([#29211](https://github.com/ggml-org/llama.cpp/pull/29211))。

---

### **4. 性能与优化**  
- **MoE 优化**：PR #27861 引入了驻留于 GPU 的 LRU 缓存以管理主机卸载的 MoE 专家权重 — 有效减少解码延迟，避免重复的 CPU 到 GPU 带宽瓶颈。  
- **SYCL**：IQ3 代码重排优化了 Intel Arc Pro B70 上的注意力/解码路径，并新增针对性后端测试 ([#29107](https://github.com/ggml-org/llama.cpp/pull/29107))。  
- **Vulkan**：2 对齐的 F32 矩阵加载减少了 Intel 平台上的 GPU 内存停顿 ([#29254](https://github.com/ggml-org/llama.cpp/pull/29254))。  
- **OpenCL**：融合 QK 归一化 + RoPE + V 材料化显著提升 Adreno 830 上的性能 ([#28446](https://github.com/ggml-org/llama.cpp/pull/28446))。

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：Qwen3.8 DFlash/MTP 在 Vulkan 上进行推测解码失败，因越界令牌 ID（`n_vocab`）—— 可能由无效批处理初始化引起 ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158))。  
- **Metal**：Flash Attention 块预遍历存在掩码边界错误 —— 已在 `b11093` 中修复 ([#29220](https://github.com/ggml-org/llama.cpp/pull/29220))。  
- **CUDA**：Volta SM70 tile 匹配错误源于缺失 `tile<8,4>` 定义 —— 已在 `b11090` 中解决 ([#29224](https://github.com/ggml-org/llama.cpp/pull/29224))。  
- **路由模式**：尽管独立加载成功，但模型仍无法加载 —— 问题已报告，暂无修复方案 ([#29225](https://github.com/ggml-org/llama.cpp/issues/29225))。  
- **Vulkan**：自 `b10780` 起，RDNA3 平台上生成令牌时 CPU 使用率过高，提示处理严重变慢 —— 正在调查中 ([#28752](https://github.com/ggml-org/llama.cpp/issues/28752))。

---

### **6. 对应用开发者的启示**  
- 使用 `LLAMA_ARG_*` 环境变量通过配置文件完全控制 llama-server 参数 —— 非常适合使用 systemd 或容器编排的生产部署场景。  
- 在 macOS/Linux 上加载大型模型时避免 `mmap` 频繁抖动：使用 `--no-mmap-prefetch` 防止模型加载阻塞。  
- 如需在 Intel Arc 或移动 SoC 上实现高吞吐推理，请充分利用 SYCL 与 Hexagon 优化 —— 有望实现 **最高 3× 的提示处理加速**。  
- 在 Vulkan 上使用 Qwen3.8 DFlash/MTP 时需谨慎 —— 当前构建可能输出无效令牌；请关注 [#28158](https://github.com/ggml-org/llama.cpp/issues/28158) 获取补丁信息。  
- 构建智能体时，可考虑 `/v1/completions` 中新增的 `echo=true` + `logprobs=N` 支持 ([#27537](https://github.com/ggml-org/llama.cpp/pull/27537))，以获得更优的输出追踪与调试能力。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-22**

---

### **1. 今日亮点**  
Ollama 生态系统持续演进，MLX 引擎性能与结构化输出可靠性均取得显著进展。关键 PR 提升了 M5 Max 硬件上 Qwen 3.8 的提示处理速度最高达 **+19%**，同时修复了导致确定性代理失败的 JSON 模式处理和工具调用解析中的关键问题。此外，Prism 的三值 GGUF 支持已进入专项修复流程。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未发布新版本或破坏性变更。

---

### **3. 新模型与硬件支持**  
- ✅ **Prism 三值 GGUF（PQ2_0/PTQ1_0）**：支持正在积极开发中。当前解析器因“不支持的张量大小溢出”而失败 —— 详见 [Issue #18521](https://github.com/ollama/ollama/issues/18521) 与 [PR #18573](https://github.com/ollama/ollama/pull/18573)。
- 🚧 **视频模型集成**：用户报告尽管 `qwen3-vl` 原生支持视频输入，但仍无法发送视频数据 —— 详见 [Issue #18151](https://github.com/ollama/ollama/issues/18151)。
- ⚠️ **AMD 混合 GPU 架构（gfx1200 + gfx1201）**：当 MoE 模型跨不同 AMD GPU 分片时，会因 “ROCm 错误：无可用内核镜像” 而崩溃 —— 详见 [Issue #18162](https://github.com/ollama/ollama/issues/18162)。

---

### **4. 性能与优化**  
- 🔥 **MLX 引擎加速**：新 PR ([#18550](https://github.com/ollama/ollama/pull/18550)) 引入门控-增量核与 MLP 优化，使 Qwen 3.8 提示吞吐量提升：
  - **2k token 时 +18.7%**
  - **8k token 时 +19.1%（M5 Max）**
- 📦 **模型导出/导入**：新增 CLI/服务器功能 ([#18578](https://github.com/ollama/ollama/pull/18578)) 支持通过 `ollama export` 与 `import` 实现离线模型传输，对隔离环境至关重要。
- 🛠️ **推测解码控制**：提议添加 `--nodraft` 标志 ([#18517](https://github.com/ollama/ollama/issues/18517))，允许禁用推测解码以用于调试及高精度敏感任务。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |
|--------|------|------|--------|
| 严重 | `qwen3coder` 工具调用解析器在长文件写入调用时崩溃，返回解析错误作为响应 | 开放 ([#18563](https://github.com/ollama/ollama/issues/18563)) | [PR #18571](https://github.com/ollama/ollama/pull/18571) |
| 高 | MLX 引擎在结构化输出（JSON 模式）中生成无限空格，永不终止 | 开放 ([#18567](https://github.com/ollama/ollama/issues/18567)) | [PR #18569](https://github.com/ollama/ollama/pull/18569) |
| 高 | `/v1/chat/completions` 忽略 `max_tokens`，并覆盖 Modelfile 中的 `num_predict` → 导致无限制生成 | 开放 ([#18575](https://github.com/ollama/ollama/issues/18575)) | 待定 |
| 中 | Windows 通配符 `FROM` 路径匹配失败，未降级处理 | 开放 ([#18568](https://github.com/ollama/ollama/issues/18568)) | [PR #18572](https://github.com/ollama/ollama/pull/18572) |
| 中 | `gemma4` 在 Windows 上图像处理失败 | 开放 ([#16532](https://github.com/ollama/ollama/issues/16532)) | 待定 |
| 低 | `qwen3.8` 流式输出返回 `no user query found` 错误 | 开放 ([#17778](https://github.com/ollama/ollama/issues/17778)) | 待定 |

---

### **6. 对应用开发者的影响**  
- **避免无限制生成**：不要依赖 `/v1/chat/completions` 中的 `max_tokens` —— 请在 Modelfile 中使用 `num_predict`，或在客户端强制设置上限，直至 [#18575](https://github.com/ollama/ollama/issues/18575) 修复。
- **谨慎处理结构化输出**：若使用 MLX 后端配合 JSON 模式，需警惕潜在无限挂起风险 —— 可考虑切换至 CPU/CUDA，或应用临时规避方案，直到 [#18569](https://github.com/ollama/ollama/pull/18569) 合并。
- **注意工具调用风险**：Qwen 3.8 编程代理在复杂工具调用下可能确定性失败 —— 请确保具备健壮的错误处理机制，并在 [#18571](https://github.com/ollama/ollama/pull/18571) 合并后尽快升级至修复版本。
- **利用 `export/import` 实现安全部署**：在受监管或隔离环境中，充分利用新功能 `ollama export` ([#18578](https://github.com/ollama/ollama/pull/18578)) 实现离线模型分发。

> 💡 *实用技巧*：对于高风险应用场景，可通过未来新增的 `--nodraft` 标志临时禁用推测解码，以验证输出的确定性。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-09-22**

---

### **1. 今日重点**  
LiteLLM 生态系统持续强化企业级能力，针对安全、成本追踪和护栏可靠性进行了关键修复。今日重点 PR 集中解决流式处理个人身份信息（PII）屏蔽（Presidio）中的高危问题、零成本预算绕过漏洞，以及 Databricks 理性推理负载验证问题。此外，新增的 UI 功能提升了团队使用情况和路由预测的可见性，进一步增强可审计性和运营控制力。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
未发布新版本或破坏性配置变更。项目当前稳定在 v1.86.2 版本，但多个补丁级别修复仍待合并。

---

### **3. 新模型与硬件支持**  
- ✅ **Fal AI**：新增对 `fal-ai/flux-lora-depth`（图像编辑）和 `fal-ai/moondream3-preview/query`（视觉问答）的支持。[PR #42334](https://github.com/BerriAI/litellm/pull/42334)  
- ✅ **OpenRouter**：新增 `openrouter/typesafe/jev-1.13` 的定价支持，并引入新的透传路由 `/openrouter/decisions`。[PR #42301](https://github.com/BerriAI/litellm/pull/42301)  
- ✅ **Meta Model API**：尽管此前遗漏，现已可在 UI 仪表板下拉菜单中正常访问。[Issue #36164](https://github.com/BerriAI/litellm/issues/36164)  

> *注意：未新增任何新硬件后端（如 ROCm/Metal/CPU-only）。*

---

### **4. 性能与优化**  
- 🔧 **优先级路由组策略**：引入按组定义的优先级路由，允许团队在不影响全局行为的前提下，自定义首选模型及有序回退链。[PR #42378](https://github.com/BerriAI/litellm/pull/42378)  
- 📊 **成本预测可视化**：UI 现已在请求卡片中直接显示能力（Capability）与 FUSE v2 路由预测。[PR #42057](https://github.com/BerriAI/litellm/pull/42057)  
- 📈 **团队使用导出增强**：导出数据现已包含 `User ID` 与 `User Email`，实现无需外部关联即可直接归因支出。[PR #42367](https://github.com/BerriAI/litellm/pull/42367)  
- ⚙️ **遥测功能开启选项**：通过设置 `LITELLM_TELEMETRY=true` 启用匿名使用遥测，助力保障开源部署的长期稳定性。[PR #42373](https://github.com/BerriAI/litellm/pull/42373)

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |
|--------|------|------|---------|
| 🔴 严重 | **当回退模型有价格时，零成本预算绕过导致支出无限制泄露** | 已关闭 | [PR #42170](https://github.com/BerriAI/litellm/pull/42170) |
| 🔴 严重 | **Responses→Chat 桥接在多轮重放后丢失原生工具调用，返回模型推理文本作为助手内容** | 已关闭 | [PR #42005](https://github.com/BerriAI/litellm/pull/42005) |
| 🔴 高 | **Presidio PII 护栏在分析器错误时出现“默认开放”状态，并跳过输入/流式字节** | 开放 | [Issue #30728](https://github.com/BerriAI/litellm/issues/30728) |
| 🔴 高 | **流式 `/v1/messages` 输出跳过 Presidio 屏蔽，导致卡号泄露** | 开放 | [PR #42351](https://github.com/BerriAI/litellm/pull/42351), [PR #42335](https://github.com/BerriAI/litellm/pull/42335) |
| 🟡 中等 | **Databricks 非 GPT 模型因 `reasoning_effort` 不是字符串而失败** | 开放 | [Issue #42347](https://github.com/BerriAI/litellm/issues/42347) |
| 🟡 中等 | **Nebius 服务商成本计算错误（偏差 10 倍）** | 开放 | [Issue #41782](https://github.com/BerriAI/litellm/issues/41782) |

> *所有严重级问题均已修复或有活跃的 PR 正在处理。*

---

### **6. 对应用开发者的意义**  
- **护栏现在更可靠**：请确保使用最新版本，避免因 Presidio 处理不当或回退逻辑错误导致敏感数据泄露。流式 PII 屏蔽修复尤其重要，对处理敏感数据的生产环境至关重要。  
- **预算管控更严格**：若存在回退路径，请勿依赖零成本预算——可能导致意外支出。建议使用显式的速率限制与监控机制。  
- **路由行为更可预测**：借助分组作用域的优先级路由，可设计健壮的回退链，且不会影响全局行为。  
- **审计能力提升**：团队使用导出现包含用户上下文，便于在共享环境中落实成本责任。  
- **谨慎使用自定义模型**：若使用 `/v1/responses` 或 `/v1/messages` 并对接非 OpenAI 后端，请确认 `response.id` 格式不会破坏下游工具（如 LangFuse、S3 日志）的兼容性。[Issue #31055](https://github.com/BerriAI/litellm/issues/31055)

👉 *建议：升级至最新构建版本，并在生产部署前验证所有护栏与成本追踪逻辑。*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-22**

#### **1. 今日亮点**  
Unsloth 生态系统持续成熟，重点聚焦于稳定性、用户界面优化以及更深层次的硬件集成。主要进展包括 Studio 中错误可见性的提升（通过 #8804, #11460）、ROCm 与 Vulkan 后端的关键修复（#11143, #11453），以及新增对 IFM 推理协议的支持。在 AMD Strix Halo GPU 上模型加载性能出现重大回归，表明 ROCm 兼容性仍存在持续挑战。

#### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
然而，多个 PR 解决了破坏性行为：
- **#11467**：修复加载 `Qwen3-Omni-30B-A3B-Instruct` 时因不识别配置类引发的 `ValueError`。
- **#11469**：恢复 Transformers 4.x 中图像处理器的重新导出，以支持加载 `microsoft/Phi-4-reasoning-vision-15B`。
- **#11468**：防止对无法处理的模型自动启用无填充批处理，避免运行时出现 `TypeError`。

> 🔗 [PR #11467](https://github.com/unslothai/unsloth/pull/11467) | [PR #11469](https://github.com/unslothai/unsloth/pull/11469) | [PR #11468](https://github.com/unslothai/unsloth/pull/11468)

#### **3. 新模型与硬件支持**  
- **新增 IFM 协议支持** 通过 #10948：原生处理 IFM/K2-Horizon 推理通道，包括 XML 工具调用解析和回合结束 EOS 检测。
- **请求 Vulkan 训练功能** (#11184)：社区对启用基于 Vulkan 的训练表现出兴趣，但目前尚无实现。
- **聚焦 ROCm 与 AMD GPU**：多个问题凸显在 AMD Strix Halo (gfx1151) 和 Intel Arc B60（Vulkan ErrorDeviceLost）上的不稳定性，凸显需要更强的 ROCm/Vulkan 验证机制。

> 🔗 [Issue #11184](https://github.com/unslothai/unsloth/issues/11184) | [Issue #11453](https://github.com/unslothai/unsloth/issues/11453)

#### **4. 性能与优化**  
- **RTX 5070 Ti (sm_120) 上严重性能下降**：捆绑的 `b11030-mix` 构建版本比官方 `ggml-org` CUDA 12 版本慢约 5–6 倍。可能与内核编译或内存布局效率低下有关。
- **量化模型内存开销过高**：`Gemma 4 26B A4B QAT` 在 16 GB 系统上占用超过 15 GB RAM，表明量化推理期间内存管理存在效率问题。
- **优化努力**：如 #11494 等 PR 力图跳过 TRL 中冗余的 kbit 准备步骤，减少微调设置过程中的不必要的内存峰值。

> 🔗 [Issue #11349](https://github.com/unslothai/unsloth/issues/11349) | [Issue #11435](https://github.com/unslothai/unsloth/issues/11435) | [PR #11494](https://github.com/unslothai/unsloth/pull/11494)

#### **5. 稳定性与回归问题**  
主要稳定性问题：
1. **Qwen3.8-Flash-Next MTP 中止** (#11143)：在 `b10995-mix` 版本加载时发生关键崩溃（`hc_head_norm still [hc_dim]`），影响较新构建版本的用户。
2. **AMD ROCm + Windows 崩溃** (#7371)：Strix Halo 在 `b10079` 更新后性能下降；可在裸金属 Windows 系统上复现。
3. **Intel Arc B60 Vulkan 死锁** (#11453)：生成过程中出现 `ErrorDeviceLost` 导致聊天冻结，需重新加载才能恢复。
4. **T4 Kaggle 训练崩溃** (#7506)：在 T4 上进行 BF16 训练时模型训练失败，日志输出无明确信息。

> 🔗 [Issue #11143](https://github.com/unslothai/unsloth/issues/11143) | [Issue #7371](https://github.com/unslothai/unsloth/issues/7371) | [Issue #11453](https://github.com/unslothai/unsloth/issues/11453) | [Issue #7506](https://github.com/unslothai/unsloth/issues/7506)

#### **6. 对应用开发者的启示**  
- **预期更可靠的错误报告**：团队正在积极改进诊断能力——未来将提供更清晰的日志，用于失败加载、训练崩溃及 API 错误（例如 #8804）。
- **避免在 AMD/ROCm 上使用 `b11000+` 构建**：若使用 AMD GPU，建议锁定至稳定版本 `b10079` 或更早，直至 #7371 和 #11453 修复。
- **谨慎使用 QAT 与大型模型**：注意内存占用情况，尤其是在低内存系统上运行 `Gemma 4 26B A4B QAT` 时。
- **设计容错机制**：由于 Vulkan 支持不一致且新兴格式（如 MiCA、IFM）仍在发展中，应用应能优雅处理功能缺失或后端故障。
- **利用即将推出的 UI 改进**：未来 Studio 更新将提供更好的 GPU 内存上限控制（#8178）、按 GPU 分配层（#11474）以及错误可见性增强（#11465）。

> ✅ 实用提示：关注 `unsloth_zoo`，及时获取更新的训练脚本与模型专属优化方案。

---  
*摘要生成时间：2026-09-22 | 来源：[github.com/unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*