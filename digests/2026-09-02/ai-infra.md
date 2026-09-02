# AI 基础设施日报 2026-09-02

> 生成时间: 2026-09-02 00:30 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-02**

---

### **1. 生态概览**  
2026年第三季度，AI推理基础设施领域正迅速向高性能、支持智能体（agent-ready）的系统演进，呈现出深度硬件定制化与多模态能力成熟化的趋势。各项目愈发聚焦于分布式环境（多节点TP、MTP）下的可扩展性、低延迟缓存管理以及端到端可观测性。尽管vLLM和SGLang在高级调度与推测性解码方面领先，但轻量级运行时如llama.cpp和Ollama仍主导边缘与本地部署场景。原生视频输入、TTS流水线及安全容器化部署的兴起，标志着行业正从单纯的模型服务转向全栈式智能体基础设施。

---

### **2. 活跃度对比**

| 项目       | 开放问题数（↑） | 开放PR数（↑） | 最近发布？ | 状态 |
|---------------|------------------|----------------|------------------|--------|
| **vLLM**      | 1,427 (+5)       | 187 (+3)       | 否               | 稳定，关键修复正在进行 |
| **SGLang**    | 1,156 (+8)       | 142 (+6)       | 否               | 内核与缓存层活跃度高 |
| **llama.cpp** | 1,672 (+12)      | 215 (+9)       | 否               | 主要聚焦Metal/SYCL稳定性 |
| **Ollama**    | 1,023 (+7)       | 98 (+4)        | v0.33.3-rc0      | RC版本，后端更新 |
| **LiteLLM**   | 1,344 (+11)      | 167 (+5)       | v1.101.0-dev.1   | 安全重点开发版 |
| **Unsloth**   | 1,218 (+6)       | 128 (+4)       | 否               | 用户体验与稳定性问题为主 |

> *注：“↑”表示近期趋势；所有统计截至2026-09-02，反映当前活跃的问题/PR数量。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash (glm5next)**         | ✅   | ❌     | ✅        | ❌     | ❌      | ❌      |
| **Qwen4exp (稀疏注意力)**            | ❌   | ❌     | ✅        | ❌     | ❌      | ❌      |
| **Idefics3**                         | ✅ (LoRA) | ❌   | ❌        | ❌     | ❌      | ⚠️ 已请求 |
| **Qwen3-TTS**                        | ❌   | ❌     | ❌        | ❌     | ❌      | ⚠️ 已请求 |
| **Mistral TTS (Voxtral)**            | ❌   | ❌     | ❌        | ❌     | ✅      | ❌      |
| **Volcanic Ark (Doubao视觉嵌入)**     | ❌ | ❌     | ❌        | ❌     | ✅ (功能请求) | ❌ |
| **Kimi K3 / MiniMax-M3 工具解析**    | ✅   | ❌     | ❌        | ❌     | ❌      | ❌      |

✅ **领先者**：**llama.cpp** 在新型架构支持（GLM-5.3、Qwen4exp）方面领先，而**LiteLLM** 在与新兴模态（TTS、嵌入）集成方面快速追赶。  
⚠️ **差距**：Unsloth 在模型兼容性上落后，尤其对新视觉语言模型和TTS支持不足。

---

### **4. 性能前沿**

| 优化重点           | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存效率**       | ✅ (融合烘焙、PIECEWISE CUDA) | ✅ (HiCache, IPC数据平面) | ✅ (扫描、懒惰PLE) | ✅ (BF16量化) | ⚠️ (流式成本追踪) | ✅ (智能卸载规划器) |
| **批处理与吞吐量**     | ✅ (推测性解码、上下文感知调度) | ✅ (GDN展开、HiSparse) | ✅ (MoE专家融合) | ⚠️ (多GPU降级策略) | ✅ (按键速率限制) | ❌ |
| **量化与内存**     | ✅ (LoRA、MoE存储) | ✅ (Ascend上的W8A8/MXFP8) | ✅ (MXFP8、VNNI融合点积) | ✅ (BF16+MXFP8) | ✅ (OCR负载保留) | ❌ |
| **分布式服务**       | ✅ (多节点TP、NCCL调试) | ✅ (预填充-解码解耦) | ❌ (SYCL/MTP不稳定) | ❌ (负载下GPU崩溃) | ✅ (路由评分启发式) | ❌ |
| **内核级调优**       | ✅ (Triton、FlashInfer) | ✅ (CUDA/ROCm、GDN) | ✅ (Metal、fa-vec性能分析) | ❌ | ⚠️ (传输容错性) | ❌ |

> 🔥 **顶尖表现者**：  
> - **vLLM** 在具备先进推测性解码与KV缓存优化的可扩展生产级推理中占据主导。  
> - **SGLang** 在低延迟、进程外缓存（HiCache）及通过解耦实现长上下文高效性方面领先。  
> - **llama.cpp** 在硬件特化调优方面表现出色（Apple Silicon、CUDA MoE融合）。

---

### **5. 层级定位**

| 项目       | 主要层级              | 角色摘要 |
|---------------|------------------------------|--------------|
| **vLLM**      | **服务引擎**           | 高吞吐、分布式推理，支持推测性解码，专为云规模大模型服务优化。 |
| **SGLang**    | **高性能引擎 + 网关** | 融合引擎特性（HiCache、GDN内核）与网关式路由与可观测性——适用于智能体工作流。 |
| **llama.cpp** | **本地运行时 / 边缘引擎** | 轻量级、跨平台运行时，针对Apple Silicon、CPU及嵌入式设备优化。 |
| **Ollama**    | **统一网关 / 开发者CLI** | 端到端平台，集成模型加载、本地推理与API暴露——面向开发者与本地智能体。 |
| **LiteLLM**   | **企业级网关 / 编排器** | 多供应商路由、成本监控、可观测性层；支持跨公有云与本地混合推理。 |
| **Unsloth**   | **智能体工作室 / 微调平台** | 全栈智能体开发环境，具备工具编排、UI与微调能力——聚焦工作流设计。 |

> 📊 **战略差异化**：  
> - **vLLM/SGLang** = 规模化推理核心引擎。  
> - **llama.cpp/Ollama** = 本地优先、开发者友好的技术栈。  
> - **LiteLLM** = 企业级编排能力。  
> - **Unsloth** = 以智能体为中心的IDE。

---

### **6. 趋势信号**

🔍 **行业关键趋势提取**：
1. **智能体中心基础设施日趋成熟**：SGLang（HiCache）、Ollama（视频输入）、Unsloth（工具保真度）等项目正从单纯追求推理速度，转向关注**智能体可靠性**、**工具交互完整性**与**上下文感知能力**。
2. **硬件专业化加速推进**：Apple Silicon（fa-vec调优）、AMD ROCm（MXFP8）、Ascend（W8A8）均获得针对性优化，反映出对**厂商特定性能**的强烈需求。
3. **安全与供应链完整性已成为不可妥协标准**：LiteLLM的Cosign签名镜像与Unsloth的提示注入修复，凸显对**可信执行环境**日益增长的重视。
4. **可观测性驱动生产就绪**：LiteLLM（速率限制）、Ollama（缓存命中率）、SGLang（延迟追踪）的指标扩展表明，**成本透明度与调试可见性**已成为核心要求。
5. **分布式推理仍存痛点**：持续存在的NCCL死锁（vLLM）、GPU崩溃（Ollama）、SYCL失败（llama.cpp）揭示，**可扩展、可靠的多GPU服务仍是挑战**。

🎯 **应用开发者应重点关注**：
- **采用vLLM或SGLang** 用于需要推测性解码的高吞吐、多节点推理。
- **使用Ollama + llama.cpp** 实现本地、Apple Silicon优化的智能体任务，配置极简。
- **集成LiteLLM** 若需具备成本感知、多供应商路由与可观测性的方案。
- **部署含非结构化工具调用的智能体工作流前，务必关注Unsloth的安全修复进展**。
- **避免在Windows/NVIDIA环境下使用v0.33.0+版本，直到Ollama解决TDR崩溃回归问题**。
- **在受监管环境中，优先使用经验证的Docker镜像（LiteLLM）**。

> ✅ **总结**：生态系统已不再仅关乎“运行模型”。而是关于**构建可信赖、可观测、可弹性伸缩的智能体系统**——而相关工具也终于跟上了步伐。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-02

---

### **1. 今日亮点**  
vLLM 项目持续完善多模态与推测解码功能，针对使用 PIECEWISE CUDA 图在多节点张量并行下运行 DSA（DeepSeek-V3.2/GLM-5.x）模型的关键修复已上线。一项高严重性问题（#54851）解决了因捕获的 Triton 内核中 KV 缓存处理不当导致的静默输出损坏问题。与此同时，Rust 前端正逐步实现功能对齐，多模态塔中的 LoRA 支持也已扩展至 Qwen VL 和 Idefics3 之外的更多模型。

---

### **2. 版本发布与破坏性变更**  
过去 24 小时内未报告新版本或破坏性变更。无新发布版本，亦未观察到任何影响 API/配置的破坏性更改。

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 扩展了更多多模态模型中塔层与连接层的 LoRA 支持（详见 [#31479](https://github.com/vllm-project/vllm/issues/31479)）。  
  - 改进 Kimi K3 的工具解析逻辑（`/v1/responses` 现在尊重 `spaces_between_special_tokens`，PR [#51152](https://github.com/vllm-project/vllm/pull/51152)），以及 MiniMax-M3（修复省略的开头标签，PR [#51075](https://github.com/vllm-project/vllm/pull/51075)）。  
- **硬件与后端**：  
  - Intel Arc B50（Battlemage/Xe2）：TP=2 初始化阶段存在 `zeMemOpenIpcHandle` 失败问题（[#48953](https://github.com/vllm-project/vllm/issues/48953)），尚未解决。  
  - AMD ROCm：MI300X/MI350X 的 CI 流水线优化，新增对 VMM 睡眠模式池的主机访问权限支持（[#51369](https://github.com/vllm-project/vllm/pull/51369)）。  
  - GB10/sm_121 上的多节点 TP：正在调试 NCCL 死锁问题（MiniMax-M2.7，[#46097](https://github.com/vllm-project/vllm/issues/46097)）及空闲期后调度器停滞问题（[#51921](https://github.com/vllm-project/vllm/issues/51921)）。

---

### **4. 性能与优化**  
- **推测解码**：  
  - 提议通过基于 `(batch, ctx)` 表的上下文长度感知调度，扩展 `num_speculative_tokens_per_batch_size`，以实现根据提示长度动态调整推测深度（[#48627](https://github.com/vllm-project/vllm/issues/48627)）。  
  - 在生产默认配置下，由于 PIECEWISE 覆盖导致 DSD 分支开销过高；已识别基线开销为关键因素（[#49986](https://github.com/vllm-project/vllm/issues/49986)）。  
- **FlashInfer 与内核优化**：  
  - 改进 FlashInfer 编译日志，加入进度指示，避免长时间编译时产生混淆（[#38246](https://github.com/vllm-project/vllm/issues/38246)）。  
  - 针对 ROCm 的 MoE 后端优化，旨在保留未量化权重存储（[#46009](https://github.com/vllm-project/vllm/pull/46009)）。  
- **内存与卸载**：  
  - 在单 GPU 部署下，Qwen3.8-Flash-Next 模型于 `VLLM_PLE_CPU_OFFLOAD` 模式中检测到 CPU 卸载死锁问题（[#53960](https://github.com/vllm-project/vllm/issues/53960)）。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 关键 | [#54851](https://github.com/vllm-project/vllm/pull/54851) | 多节点张量并行下，使用 PIECEWISE CUDA 图时，DeepSeek-V3.2/GLM-5.x DSA 模型出现静默垃圾输出，源于错误的融合 KV 缓存烘焙 | ✅ **已在 PR #54851 中修复（已合并）** |
| 高 | [#53960](https://github.com/vllm-project/vllm/issues/53960) | `VLLM_PLE_CPU_OFFLOAD=1` 在单 GPU（TP=1）环境下导致启动时永久挂起 | ❌ 开放 |
| 高 | [#51921](https://github.com/vllm-project/vllm/issues/51921) | 4 节点、TP=4（GB10/aarch64）环境中，引擎在约 1 分钟空闲后永久停滞，请求从未抵达调度器 | ❌ 开放 |
| 中等 | [#54521](https://github.com/vllm-project/vllm/issues/54521) | 当上下文接近 `indexer_budget` 时，Qwen3.8-Flash-Next 出现非确定性贪婪解码 | ❌ 开放 |
| 中等 | [#35288](https://github.com/vllm-project/vllm/issues/35288) | MTP 推测解码在并发 ≥4 时污染输出（V1 引擎） | ❌ 开放 |
| 中等 | [#37754](https://github.com/vllm-project/vllm/issues/37754) | FlashInfer + MTP 在 SM121（DGX Spark）上使用 GQA=16 模型时崩溃，报“非法内存访问” | ❌ 开放 |

---

### **6. 对应用开发者的启示**  
- **多模态应用**：预计将在更多多模态模型中获得广泛的 LoRA 支持（不仅限于 Qwen/idefics），但使用 `default-mm-loras` 时需谨慎应对复杂输入结构——确保模态检测与数据流水线一致。  
- **高吞吐代理**：仅在验证过 KV 缓存一致性后才使用 PIECEWISE CUDA 图——目前 DSA 模型已通过 PR #54851 修复。在 [#53960] 解决前，请避免在单 GPU 部署中使用 `VLLM_PLE_CPU_OFFLOAD`。  
- **调度逻辑**：等待队列中的优先级抢占尚未支持（PR #40004），因此高优先级请求仍可能因资源竞争而被阻塞。  
- **工具调用**：Kimi/K3 与 MiniMax-M3 的行为已修复，确保嵌套工具调用与特殊标记的正确解析——请升级至最新 main 分支以避免静默失败。  
- **调试提示**：若服务器在启动时挂起或空闲后变得无响应，请检查是否存在 `VLLM_PLE_CPU_OFFLOAD`、`zeMemOpenIpcHandle` 或多节点环境下的 NCCL 问题。  

> 🔗 **保持关注**：请实时监控 [vLLM GitHub Issues](https://github.com/vllm-project/vllm/issues) 与 [Pull Requests](https://github.com/vllm-project/vllm/pulls)，获取最新修复与稳定性更新。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 简报 – 2026-09-02**

---

### **1. 今日亮点**  
SGLang 项目持续推进高性能推理栈的演进，重点在稳定性与可扩展性方面取得关键进展，尤其体现在 **prefill-decode 分离架构**、**HiCache** 以及 **CUDA/ROCm 内核优化** 上。值得注意的是，新提交（PR）引入了通过设备内存进程间通信（IPC）实现的 **进程外 HiCache 数据平面**，标志着面向长上下文工作负载的可扩展、低延迟缓存管理迈出了重要一步。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未推出新版本，也无新的 API/配置破坏性更改。

---

### **3. 新模型与硬件支持**  
- ✅ **ROCm 支持**：持续优化 ROCm 特定内核，修复了 `IndexerKPool` 中 `fp8_mqa_logits` 无限循环的问题（问题 #37478），此前该问题在大尺寸 logits 场景下会导致进程崩溃。  
- ✅ **Ascend NPU**：W8A8/MXFP8/MXFP4 量化支持正在开发中（PR #36426），现已支持在 Ascend 硬件上正确加载 Qwen3.8-27B-W8A8 模型。  
- ✅ **扩散模型**：增强对 FLUX.2 NVFP4 融合的支持（PR #37096），现为请求范围生效，仅在 `quality="high"` 时启用。  
- ✅ **多 GPU 长上下文**：HiSparse 路线图（问题 #28874）持续推进，目标是实现长序列场景下的高效稀疏注意力，同时最大限度减少显存（HBM）占用。

---

### **4. 性能与优化**  
- 🔥 **权重缓存守护进程**：第一阶段已上线（PR #27139），将 Qwen3-235B FP8 模型的权重加载时间从 **约 306–327 秒缩短至 <1 秒**（[博客](https://www.lmsys.org/blog/2026-08-21-sglang-fast-engine-recovery)）。  
- ⚡ **CUDA Graph 与推测解码**：PR #37329 优化输出处理与图状态大小；PR #35546 剪枝草稿扩展的 logits，仅保留选中的行，降低解码内存与图开销。  
- 📈 **GDN 内核优化**：PR #36970 在 SM120 上启用 ReplaySSM 验证路径的双向循环展开，提升吞吐量且不改变行为。  
- 💾 **统一基数缓存**：PR #37494 在清理过程中跳过缺失的基数锁释放，提升合成请求性能并减少竞争。

---

### **5. 稳定性与回归问题**  
- 🛑 **严重 CUDA 核心转储追踪（问题 #26340）**：285 条评论 —— CI 运行自动收集的核心转储表明 GPU 崩溃反复出现。高严重性；尚未有修复 PR。[查看问题](https://github.com/sgl-project/sglang/issues/26340)  
- ⚠️ **HiCache + DSPARK 回归**：在 DeepSeek-V4-Flash-0731 上运行长时间智能体会话时，尽管前缀命中率稳定在 ~50%，但出现 `#cached-token: 0`，严重影响效率。[问题 #35129](https://github.com/sgl-project/sglang/issues/35129)  
- ⚠️ **ROCm 内存崩溃**：`IndexerKPool` 调用 `fp8_mqa_logits` 时未加边界检查，当 logits 超过 2 GiB 时触发 LLVM 断言失败并导致进程终止。[问题 #37478](https://github.com/sgl-project/sglang/issues/37478)  
- ⚠️ **解码调度器死锁**：在 `--grpc-mode` 下由于同步不当引发死锁。[问题 #29957](https://github.com/sgl-project/sglang/issues/29957)

---

### **6. 对应用开发者的意义**  
- **对于生产级智能体**：优先测试 `--grpc-mode` 和长时间会话场景——已知的死锁与缓存效率问题可能影响系统可靠性。  
- **对于高吞吐部署**：充分利用 **权重缓存守护进程** 与 **HiCache 进程外数据平面（RFC #37372）**，以实现更快的冷启动和更好的横向扩展能力。  
- **对于多后端用户**：使用 ROCm 与 NPU 后端需保持谨慎——新修复陆续推出，但需针对自身工作负载进行验证。仅在需要融合扩散内核（如 FLUX.2）时使用 `quality="high"`。  
- **对于长上下文应用**：密切关注 HiSparse 与 Prefill-Decode 分离进展（问题 #28874, #21703）——这些是实现可扩展、低成本推理流水线的关键组件。

> 🔗 **跟踪正在进行的工作**：[GitHub 问题仪表板](https://github.com/sgl-project/sglang/issues) | [今日开放的 PR](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+sort%3Aupdated-desc+created%3A%3E%3D2026-09-01)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-02**

---

### **1. 今日重点**  
最新更新聚焦于新款 Apple Silicon 芯片（M2 Pro、M2 Max、A18 Pro）的 Apple Metal 性能调优，包含针对性的内核优化与内存管理修复。关键改进包括 CUDA 上的 MoE 专家融合及长上下文推理中优化的 KV 缓存查找，同时正在进行 SYCL 后端稳定性与多 GPU 可扩展性方面的开发工作。

---

### **2. 发布与破坏性变更**  
今日未发布新的标记版本。但以下提交代表了重要的内部变更：
- `b10752`：新增 **Metal `metallib` 构建支持 xcframework**，通过 Xcode 统一框架打包实现更佳的 iOS/macOS 集成 ([#28163](https://github.com/ggml-org/llama.cpp/pull/28163))。
- `b10740`：修复 **因缺少自动释放池导致的 Metal 内存泄漏**，提升了 macOS/iOS 上长时间运行应用的稳定性 ([#27883](https://github.com/ggml-org/llama.cpp/pull/27883))。

> ⚠️ 使用 Metal 进行 iOS/macOS 开发的开发者应确保构建时设置 `GGML_METAL_EMBED_LIBRARY=OFF`，并验证 xcframework 的链接情况。

---

### **3. 新模型与硬件支持**  
- **硬件**：  
  - 新增 **fa-vec 调优配置文件支持 M2 Pro (#28122)**、**A18 Pro (MacBook Neo) (#28152)** 与 **M2 Max (#28015)** — 最高支持 30 个 GPU 核心。针对高核心数 Apple Silicon GPU 优化内核启动参数以实现最佳吞吐量。
- **模型与架构**：  
  - 全面支持 **GLM-5.3-Flash (glm5next)**，一款拥有 3200 亿以上参数的混合线性/稀疏注意力 MoE 模型，具备视觉能力 ([#27752](https://github.com/ggml-org/llama.cpp/pull/27752), [#27917](https://github.com/ggml-org/llama.cpp/pull/27917))。  
  - 引入 **Qwen4exp** 稀疏注意力机制，采用基于 gather 的解码方式（`qwen4exp: gather-based sparse attention`），降低解码阶段的计算开销 ([#28213](https://github.com/ggml-org/llama.cpp/pull/28213))。
  - 在 Qwen 特定架构处理器中启用 **NextN/MTP 超参数加载**，提升对 Qwen3.5、Qwen3.5 MoE 以及 Qwen3-Next 模型的兼容性 ([#28192](https://github.com/ggml-org/llama.cpp/pull/28192))。

---

### **4. 性能与优化**  
- **CUDA**：  
  - 将 **MoE 加权专家归约**（mul + view + add）融合为单个内核，消除全局内存写入——对 Qwen3.8-27B 等重度使用 MoE 的模型至关重要 ([#25952](https://github.com/ggml-org/llama.cpp/pull/25952))。
- **Apple Metal**：  
  - 优化 **kernel_mul_mm 批处理目标偏移量**，防止深度上下文场景中的 int32 溢出（此前导致无声数据损坏）([#28210](https://github.com/ggml-org/llama.cpp/pull/28210))。
  - 通过用扁平数组扫描替代 `std::set` 遍历，降低 `get_prev_tokens()` 中的 CPU 开销，使 13 万上下文下的解码速度从 **17 → 19.7 tok/s** ([#28128](https://github.com/ggml-org/llama.cpp/pull/28128))。
- **CPU (AVX2)**：  
  - 在 `q4_K/q5_K` 点积中通过 `vpdpwssd` 集成 **VNNI 融合 madd+add**，在支持环境下显著提升 AVX2 点积效率 ([#28212](https://github.com/ggml-org/llama.cpp/pull/28212))。
- **量化与内存**：  
  - 在 Qwen3.8-Flash-Next 中引入 **懒加载 PLE 表的直接读取**，在 GB10 硬件上实现 >2 倍预填充性能提升 ([#28136](https://github.com/ggml-org/llama.cpp/pull/28136))。

---

### **5. 稳定性与回归问题**  
今日报告的关键问题：
- **SYCL 后端崩溃**：  
  - `llama-server` 在 **Lunar Lake iGPU (Arc 140V)** 上崩溃，原因是 Level Zero 与 SYCL API 中设备内存查询失败 ([#28134](https://github.com/ggml-org/llama.cpp/issues/28134))。  
  - Linux 上大容量主机锁定分配期间观察到高 CPU 占用 ([#27038](https://github.com/ggml-org/llama.cpp/issues/27038))。
- **多 GPU 问题**：  
  - 使用 **跨多 GPU 的 SYCL 张量并行** 时出现输出乱码 ([#26058](https://github.com/ggml-org/llama.cpp/issues/26058))。  
  - 在 RTX 5070TI/3060TI 系统上，使用 MTP + `--split-mode tensor` 时出现 **CUDA 死锁**，影响 Qwen3.8-27B 模型 ([#27122](https://github.com/ggml-org/llama.cpp/issues/27122))。
- **Vulkan**：  
  - 在 **gfx1103 (RADV 780M)** 上管道编译卡死，导致服务器无法启动 ([#27998](https://github.com/ggml-org/llama.cpp/issues/27998))。

> ✅ *部分回归问题已有修复方案：*  
> - [#28163](https://github.com/ggml-org/llama.cpp/pull/28163) (Metal xcframework)  
> - [#28210](https://github.com/ggml-org/llama.cpp/pull/28210) (int32 溢出修复)

---

### **6. 对应用开发者的启示**  
- **针对 Apple Silicon 应用**：优先使用 `--metal` 构建，并结合 `ggml-metal-tuning` 自动生成 M2 Pro/Max 与 A18 Pro 的优化 fa-vec 配置；若面向新 Mac，避免使用旧版 Metal 路径。
- **针对 LLM 代理**：可利用现已通过 PR [#28138](https://github.com/ggml-org/llama.cpp/pull/28138) 提供的 **SSBD（自推测偏置解码）**，实现快速重翻译任务，且提示成本极低。
- **针对长上下文推理**：使用 `kv-cells` 扫描优化（`b10750`），并在自定义代码中避免使用基于 `std::set` 的标记查找模式。
- **针对生产部署**：在多 GPU 环境中使用 `--split-mode tensor` 时需谨慎（尤其在 CUDA/SYCL 上）；建议在 MTP 稳定性提升前，考虑使用 `--cache-disk` 或 `--spec-type draft-mtp` 作为备选方案。
- **针对跨平台应用**：预计在 Intel Arc B70/Lunar Lake 平台上存在不稳定性；请关注 [#27198](https://github.com/ggml-org/llama.cpp/issues/27198) 与 [#28134](https://github.com/ggml-org/llama.cpp/issues/28134) 获取修复进展。

> 🔗 **推荐资源**：  
> - [llama.app](https://llama.app) – 官方演示站点  
> - [GitHub Attestations](https://github.com/ggml-org/llama.cpp/attestations) – 可验证的构建完整性  
> - [Discussions #27668](https://github.com/ggml-org/llama.cpp/discussions/27668) – Metal 调优指南

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-02**

---

### **1. 今日亮点**  
最新发布的 **v0.33.3-rc0** 在 GGUF 模型参数处理方面实现关键改进，并更新了核心推理后端（MLX、MLX-C、llama.cpp）。主要进展包括通过 PR #18179 实现 macOS 上原生视频输入支持，以及通过针对性的 BF16 量化优化 Qwen3.8 Flash Next 模型的内存效率。这些升级进一步巩固了 Ollama 作为跨多种硬件平台统一、高性能大模型服务架构的地位。

---

### **2. 发布与破坏性变更**  
- **v0.33.3-rc0**：发布新版 MLX/MLX-C 与 `llama.cpp`（b10729），现已遵循 GGUF 定义的默认参数。  
  🔗 [更新日志](https://github.com/ollama/ollama/compare/v0.33.2...v0.33.3-rc0)  
- **API 变更**：`keep_alive` 持续时间超过 `int64` 纳秒的将被截断，防止因溢出导致会话过期。  
  🔗 [PR #18181](https://github.com/ollama/ollama/pull/18181)

> ✅ *未报告现有 Modelfile 或 CLI 行为的破坏性变更。*

---

### **3. 新模型与硬件支持**  
- **macOS 视频输入支持**：现可通过 `/api/chat` 与 `/api/generate` 原生摄入视频，自动解码帧与音频，适用于多模态模型如 `qwen3-vl`。  
  🔗 [PR #18179](https://github.com/ollama/ollama/pull/18179)  
- **GraniteForCausalLM 支持**：实验性 MLX 后端现已支持 IBM Granite 4.1 系列模型。  
  🔗 [PR #17972](https://github.com/ollama/ollama/pull/17972)  
- **Qwen3.8 Flash Next 优化**：对关键权重应用内存高效的 BF16+MXFP8 量化，减少 CPU 卸载负担。  
  🔗 [PR #18078](https://github.com/ollama/ollama/pull/18078)

---

### **4. 性能与优化**  
- **缓存指标暴露**：提示词评估缓存命中数现已通过 API（`prompt_eval_cached_count`）和 CLI 暴露。  
  🔗 [PR #17943](https://github.com/ollama/ollama/pull/17943)  
- **模型评估延迟追踪**：新增 `/metrics` 端点，暴露 `ollama_eval_duration_total` 与 `ollama_eval_total` 指标。  
  🔗 [PR #11159](https://github.com/ollama/ollama/pull/11159)  
- **内存效率提升**：Qwen3.8 Flash Next 模型通过保持 MTP 与专家路径投影在 BF16 格式，显著降低 CPU 卸载需求。  
  🔗 [PR #18078](https://github.com/ollama/ollama/pull/18078)

> 💡 *预期：在长上下文生成场景下，Qwen3.8 的 CPU 利用率可降低约 15–30%。*

---

### **5. 稳定性与回归问题**  
- **严重回归**：在 Windows + NVIDIA 环境下，从单轮切换至多轮请求时出现 GPU 驱动崩溃（`VIDEO_TDR_TIMEOUT_DETECTED`）——确认为 v0.32.15 至 v0.33.0 之间的回归问题。  
  🔗 [问题 #18152](https://github.com/ollama/ollama/issues/18152) *(高危；暂无修复 PR)*  
- **无声的 CPU 回退**：当显存不足时，模型会静默回退至 CPU，但用户无法感知。  
  🔗 [问题 #14258](https://github.com/ollama/ollama/issues/14258) *(高影响；文档改进待完成)*  
- **流式缓冲问题**：由于 `thinking.Parser` 缓冲区未刷新，导致尾部内容丢失。  
  🔗 [PR #18173](https://github.com/ollama/ollama/pull/18173) *(已合并；解决 #18009, #18173)*

---

### **6. 对应用开发者的启示**  
- **构建健壮代理**：使用 `prompt_eval_cached_count` 与 `ollama_eval_duration_total` 监控并优化提示词处理延迟。  
- **处理视频输入**：利用 macOS 原生视频支持，构建涉及时序推理的智能体工作流（如视频分析）。  
- **规避 GPU 崩溃**：若在 Windows/NVIDIA 平台使用多轮对话，建议暂时避免使用 v0.33.0+，直至 #18152 修复。  
- **控制工作负载**：即将推出的 `每模型自定义 GPU/CPU 分配` 功能（问题 #18185）将在多智能体环境中提供细粒度控制能力。  
- **确保模型一致性**：由于现在尊重 GGUF 默认值，应尽量减少对 Modelfile 的覆盖，除非明确需要。

> 📌 *最佳实践：每次升级后务必使用基准测试工具验证模型行为，并监控 `ollama ps` 与 `/metrics` 以识别异常漂移。*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **1. 今日亮点**  
LiteLLM 继续强化其企业级推理基础设施，针对流式传输可靠性、成本准确性及可观测性进行了关键修复。重要进展包括：正确处理流式响应中的工具调用、改进 Datadog LLM 可观测性集成、通过新的评分启发式方法提升路由精度。`v1.101.0-dev.1` 版本引入了经 Cosign 验证的 Docker 镜像签名——全面加强所有部署场景下的供应链安全性。

---

### **2. 发布与破坏性变更**  
- **`v1.101.0-dev.1`**：开发版本，使用 [Cosign](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-dev.1) 实现镜像签名验证，密钥与提交 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中一致。  
  ✅ *所有镜像现已可进行密码学验证。*  
- **`v1.99.0`**：稳定版本，未报告破坏性变更；主要包含稳定性补丁和依赖项更新。  
  🔍 *验证签名命令：`cosign verify --key <KEY> berriai/litellm:v1.99.0`*

> 📌 **迁移提示**：现有用户无需更改 API 或配置。若需安全验证，请优先升级至 `v1.101.0-dev.1`。

---

### **3. 新模型与硬件支持**  
- **Mistral 文本转语音（TTS）**：通过 PR [#38755](https://github.com/BerriAI/litellm/pull/38755) 支持 `/v1/audio/speech` 接口，实现与 Mistral Voxtral 模型的完整 TTS 流水线集成。  
- **火山苍穹（Doubao Embedding Vision）**：针对 `volcanic-ark/doubao-embedding-vision-251215` 的功能请求 [#29570](https://github.com/BerriAI/litellm/issues/29570) 已开启。  
- **Azure 存储凭证链**：PR [#39229](https://github.com/BerriAI/litellm/pull/39229) 支持 DefaultAzureCredential 链式认证，实现无密钥身份验证，提升与工作负载身份联合的兼容性。

---

### **4. 性能与优化**  
- **Prometheus 指标扩展**：PR [#39236](https://github.com/BerriAI/litellm/pull/39236) 新增按密钥和按团队的速率限制指标（`litellm_rate_limit_allowed`, `litellm_rate_limit_used`）——可在限流发生前主动告警。  
- **SCIM 组解析优化**：PR [#39228](https://github.com/BerriAI/litellm/pull/39228) 将 SCIM 同步过程中的 ID/email 查找合并为单次查询，减少 N×2 数据库读取，预计在高负载下降低约 40% 延迟。  
- **OCR 负载保留**：PR [#39235](https://github.com/BerriAI/litellm/pull/39235) 通过保留原始媒体字节并优化传输规划，避免序列化膨胀，显著降低 OCR 密集型工作流中的内存开销。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR | 描述 |
|------|----------|--------|--------|-------------|
| [#16582](https://github.com/BerriAI/litellm/issues/16582) | 高 | 待处理 | ❌ | Kubernetes 集群中花费日志清理失败且无声；日志显示 `Error during cleanup:` 但无上下文信息。影响计费完整性。 |
| [#22100](https://github.com/BerriAI/litellm/issues/22100) | 高 | 待处理 | ❌ | `asyncio.CancelledError` 绕过 aiohttp 传输中的重试逻辑，导致 DNS 超时期间出现未处理失败。 |
| [#14457](https://github.com/BerriAI/litellm/issues/14457) | 致命 | 待处理 | ❌ | 客户端断开导致流提前结束时，使用量数据丢失——造成计费缺口与配额误报。 |
| [#38357](https://github.com/BerriAI/litellm/issues/38357) | 中等 | 待处理 | ❌ | Bedrock Converse/InvokeModel 调用中，AWS `x-amzn-RequestId` 缺失于 `_hidden_params.additional_headers`。 |
| [#39011](https://github.com/BerriAI/litellm/issues/39011) | 中等 | 待处理 | ❌ | `/customer/block` 即使已执行阻断仍返回 HTTP 500 —— 打破自动化流程。 |

> ⚠️ **重大风险**：多个待处理问题影响**成本核算**、**流式正确性**及**集群稳定性**——请在生产环境中优先修复。

---

### **6. 对应用开发者的影响**  
- **使用经验证镜像**：升级至 `v1.101.0-dev.1` 并通过 Cosign 验证 Docker 镜像，确保供应链完整性——对受监管或高合规要求部署至关重要。  
- **谨慎处理流式失败**：注意不完整流可能不会被记录为失败（参见 [#29602](https://github.com/BerriAI/litellm/issues/29602)）；建议实现客户端超时与降级机制。  
- **充分利用新可观测性功能**：使用来自 [#39236](https://github.com/BerriAI/litellm/pull/39236) 的 Prometheus 指标，以及 [#39222](https://github.com/BerriAI/litellm/pull/39222) 的 Datadog 增强功能，洞察工具调用使用情况与令牌流转。  
- **避免成本缺口**：密切监控 [#14457](https://github.com/BerriAI/litellm/issues/14457) 与 [#39057](https://github.com/BerriAI/litellm/issues/39057)——缓存响应会将花费归零，但重放原始令牌，引发审计不一致。  
- **规划未来路由增强**：关注 [#31555](https://github.com/BerriAI/litellm/issues/31555) 中基于马尔可夫的自适应路由——可能在多提供商环境下实现动态成本套利。

👉 **实用提示**：使用带标签的虚拟密钥的团队，请关注 [#22289](https://github.com/BerriAI/litellm/issues/22289) 与 [#22966](https://github.com/BerriAI/litellm/issues/22966)，避免静默连接中断，并强制执行密钥级别标签策略。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-02**

---

### **1. 今日亮点**  
Unsloth 项目持续推进以代理为中心的架构，在 Studio 中针对提示注入风险和工具交互保真度进行了关键安全修复与用户体验优化。重要提交包括针对无标记工具调用提升的高危修复（PR #6967），以及确保模型能正确接收 MCP 工具生成的图像输出的改进（PR #10088）。与此同时，新功能请求反映出对多用户工作区（PR #10102）、无需加载模型即可自定义设置（Issue #10168）以及更好支持 AMD ROCm 与 aarch64 容器的需求日益增长。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未推出新版本，亦无新的 API/配置破坏性更改。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm**：GPU VRAM 超限时持续崩溃问题正在调查中（Issue #9801），另有一早期问题报告称在 Fedora/Bazzite 上即使检测到 ROCm 也错误安装了 CPU 版 PyTorch（Issue #8731）。  
- **aarch64**：已提出官方 `aarch64` 容器镜像的特性请求（Issue #4198），反映了对基于 ARM 部署便利性的需求。  
- **模型架构**：  
  - 请求原生支持 **Idefics3**（如 IBM Granite Docling VLM）（Issue #4079）  
  - 提出支持 **Qwen3-TTS** 微调的特性请求（Issue #3951, #3961）  
  - **LFM2.5** 与 **Mamba** 模型支持仍有限；快速推理在提取 state dict 时失败（Issue #4073）

---

### **4. 性能与优化**  
- **智能卸载规划器**：基准测试显示，在消费级 6 核 CPU 上，智能卸载规划器（`-ot`）在 43 个测试单元中有 40 个比 `--fit on` 更慢（Issue #9861），表明其优化偏向数据中心硬件。  
- **KV 缓存效率**：PR #9961 旨在通过将 `max_tokens` 按照缓存槽位的可用比例进行分配，避免过度预留，从而提升 KV 缓存分配效率。  
- **MLX 提示缓存**：因 `ArraysCache` 布局不匹配，导致 Qwen3.8-27B 无法重用提示缓存（Issue #10031）。  
- **VLLM 集成**：通过 vLLM 加载 Qwen3-VL 系列 LoRA 适配器的问题依然存在（Issue #3560）。

---

### **5. 稳定性与回归问题**  
- **严重安全漏洞（高危）**：无标记工具调用解析机制允许通过非结构化 `call:NAME{...}` 或 `NAME[ARGS]{json}` 模式实现潜在的远程代码执行（RCE）（Issue #6967, PR #6967）。  
- **内存泄漏**：重复生成 Z-Image-Turbo 图像会导致线性增长的内存占用，最终触发 SIGKILL（Issue #10156）。  
- **AMD 上的崩溃**：使用 gfx1032 GPU 进行微调时会崩溃（Issue #7922）；ROCm 在超出显存限制后无法加载模型（Issue #9801）。  
- **Studio UI/UX 问题**：  
  - 设置无法在重启后保存（Issue #9948）  
  - 搜索开关错误地将项目源 RAG 与网页搜索耦合（Issue #9947）  
  - 编辑后工具卡片意外重新排列（PR #10162, #10161）  
  - 聊天内容缩短时丢失图像上下文（PR #10165）  

*部分问题已有修复提交*：  
- PR #10165（保留图像上下文）  
- PR #10162（保持工具卡片位置）  
- PR #10161（保留回复详情）  
- PR #10160（移除过期设置条目）  

---

### **6. 对应用开发者的启示**  
在 Unsloth 上构建 AI 代理的应用开发者应：  
- **谨慎处理原始工具调用**：在 PR #6967 合并前，请勿依赖非结构化的工具语法——该修复可缓解关键的提示注入攻击向量。  
- **预期非 NVIDIA 硬件上的不稳定表现**：AMD ROCm 与 aarch64 支持仍属实验性质；请预期可能出现崩溃或性能不佳。  
- **规划界面不一致**：Studio 接口仍存在状态丢失问题（设置、工具位置、图像上下文），尤其在编辑或重新加载后。建议采用“保存前重载”工作流。  
- **监控内存使用情况**：注意图像生成流水线（Z-Image-Turbo）中存在的已知泄漏，考虑分批处理或限制会话数量。  
- **为未来功能做好准备**：多用户工作区（PR #10102）和无需加载模型即可自定义设置（Issue #10168）即将上线，将助力更协同、企业级的部署。

> 🔗 [查看所有问题](https://github.com/unslothai/unsloth/issues) | [浏览 PR](https://github.com/unslothai/unsloth/pulls)

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*