# AI 基础设施日报 2026-09-12

> 生成时间: 2026-09-12 00:35 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-12**

---

### **1. 生态概览**  
AI推理与服务生态正进入高度专业化与硬件融合的新阶段，各项目加速向生产级代理工作负载演进。尽管vLLM与SGLang在下一代GPU（SM90/B200）上以高吞吐、低延迟推理领先，LiteLLM与Ollama则逐步发展为支持多提供商编排的安全、策略感知网关。Unsloth与llama.cpp持续突破本地运行时效率与跨平台部署的边界。一个清晰趋势浮现：随着模型日益复杂、代理对确定性行为的要求提升，稳定性与正确性已超越功能迭代速度，成为首要考量。

---

### **2. 活跃度对比**

| 项目       | 开放问题数（↑） | 合并的PR数（↑） | 发布版本（最新） | 状态 |
|---------------|------------------|------------------|--------------------|--------|
| **vLLM**      | 387 (+12)        | 47 (+8)          | `v0.27.1` (稳定版) | ⚠️ `0.28.0/0.29.0` 存在回归问题 |
| **SGLang**    | 415 (+18)        | 39 (+11)         | 无                 | 🔥 高度不稳定（核心崩溃、宕机） |
| **llama.cpp** | 621 (+21)        | 42 (+9)          | 无                 | 🛑 严重内核损坏与竞争条件 |
| **Ollama**    | 258 (+15)        | 12 (+5)          | `0.34.0`           | 📉 性能下降；云端模型不稳定 |
| **LiteLLM**   | 497 (+14)        | 38 (+7)          | `v1.102.0-dev.2`   | ✅ 安全加固；护栏集成 |

> *注：问题数量反映活跃的开放问题（不含关闭/重复项）。PR数量体现近期进展。发布状态反映当前稳定性与用户风险等级。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构       | 支持项目                     | 状态与说明 |
|-------------------------------|----------------------------------|----------------|
| **DeepSeek-V4.1-Flash**       | vLLM, SGLang                     | vLLM 在优化方面领先（DFlash2, Marlin MXFP4）；SGLang 增加 FP8 KV 缓存 |
| **Qwen3-VL / Qwen3.8-Flash-Next** | SGLang, Ollama, vLLM            | SGLang 优化独特图像服务；Ollama 存在流式传输/工具调用缺陷 |
| **GLM-5.3**                   | SGLang, Ollama, vLLM             | SGLang 恢复 Flash decode CP；Ollama 存在无限推理循环漏洞 |
| **AMD RDNA3/RDNA4 / gfx1100/gfx1201** | SGLang, Unsloth, llama.cpp     | Unsloth 提供官方 ROCm Docker 镜像；其余处于追踪/早期支持阶段 |
| **Intel Arc B70 Vulkan**      | llama.cpp                        | MoE 模型下崩溃 —— 未解决 |
| **ARM64 CPU-only**            | Unsloth（开发中）                 | 补齐边缘/嵌入式场景空白；尚未发布 |
| **B200 / SM120 / Blackwell**   | vLLM, SGLang, Unsloth, llama.cpp | vLLM 在 Marlin MXFP4/MoE 优化上领先；SGLang 实现 NVFP4 缓存 |

> **胜出者**：**vLLM** 在前沿模型与硬件对齐方面占据领先地位，尤其在 DeepSeek-V4.1 和 SM90/B200 场景。**Unsloth** 则凭借 Docker 化方案最快实现对 AMD/ARM 的普及。

---

### **4. 性能前沿**

| 优化重点          | 核心项目                          | 关键亮点 |
|------------------------------|---------------------------------------|-----------|
| **KV 缓存与上下文管理** | vLLM, SGLang, LiteLLM              | vLLM：DFlash2 规范解码修复；SGLang：Flash Attention 3 调优；LiteLLM：TTL 对齐提示缓存 |
| **推测性解码**     | vLLM, SGLang, llama.cpp               | vLLM：Qwen3 DFlash2 融合分组卷积；SGLang：关键崩溃修复；llama.cpp：性能下降 |
| **量化与内核调优** | vLLM, llama.cpp, Unsloth           | vLLM：Marlin MXFP4 MoE；llama.cpp：Blackwell IQ 内核修复；Unsloth：FLUX.2 VAE CUDA 错误仍存在 |
| **分布式服务与扩展** | SGLang, LiteLLM                    | SGLang：PD 分离稳定性问题；LiteLLM：通过头部暴露路由指标 |
| **内存效率与卸载** | vLLM, llama.cpp, Unsloth           | vLLM：弹性 EP 复用；llama.cpp：SYCL 图重播；Unsloth：Windows mmap 修复 |

> **趋势**：前沿重心正从原始吞吐量转向**高负载下的正确性**，尤其是在分布式与推测性解码场景中。

---

### **5. 层级定位**

| 项目       | 主要层级                  | 角色摘要 |
|---------------|-------------------------------|--------------|
| **vLLM**      | **推理引擎**           | 针对 NVIDIA Hopper/B200 的 GPU 内核执行、MoE、推测性解码与调度优化 |
| **SGLang**    | **代理推理平台** | 支持端到端代理工作流，具备分布式服务、结构化输出与工具调用能力 |
| **llama.cpp** | **本地运行时 / 嵌入式**   | 跨平台推理引擎，聚焦于 CPU/GPU 可移植性、轻量部署与底层内核正确性 |
| **Ollama**    | **网关 / 本地 CLI 运行时** | 面向开发者的模型接口；日益扮演云/本地推理代理角色 |
| **LiteLLM**   | **LLM 网关 / 编排** | 多提供商路由、成本追踪、护栏机制与安全优先的 API 抽象 |

> **洞察**：技术栈正趋向模块化——开发者如今可组合使用 vLLM（引擎）、SGLang（代理平台）、LiteLLM（网关），以及 Ollama/llama.cpp（本地运行时）构建解决方案。

---

### **6. 趋势信号**

1. **稳定性优于速度**：经历数月快速功能发布后，所有主要项目均报告**严重回归问题**（内存泄漏、崩溃、静默失败）。这预示着行业正转向**生产就绪**与**设计即正确性**。

2. **硬件趋同**：项目正积极优化针对**SM90（H20/H200）** 与**B200**，同时**ROCm 支持**迅速成熟——Unsloth 与 SGLang 已实现完整的 AMD 平等支持。预计到 2027 年末，混合 GPU 生态将主导市场。

3. **以代理为中心的优化**：SGLang 对**结构化输出**、**工具调用去重**与**分布式上下文管理**的关注，反映出对自主代理的需求激增——远超普通 LLM 响应。

4. **安全与合规集成**：LiteLLM 采用**ConductGuard**与**cosign 签名镜像**，表明**供应链完整性**与**网关层策略强制**已成为基本门槛。

5. **边缘与跨平台需求**：Unsloth 的 ARM64 CPU-only 构建及 llama.cpp 对 Vulkan/Intel 的支持，凸显对**轻量、可移植推理**的需求——这对嵌入式系统、移动应用与边缘 AI 至关重要。

---

### ✅ **面向应用开发者的可操作建议**
- **避免在生产环境使用 `v0.28.0/v0.29.0`**（vLLM）、`qwen3.8` 或 `glm-5.3:cloud`（Ollama），直至修复落地。
- **使用 LiteLLM 并结合 cosign 验证**，确保可审计、安全的 LLM 调用。
- **在构建代理流水线时选用 SGLang**——但务必充分测试分离架构。
- **优先考虑模型与硬件匹配**：在 H200 上运行 DeepSeek-V4.1 请使用 vLLM；在 AMD/ARM 边缘部署请选择 Unsloth。
- **监控 PR 活动**——大量修复正在审核中；切勿假设预发布版本具备稳定性。

> 🔍 *关注清单*：  
> - vLLM 的 `Marlin MXFP4 MoE` → 将定义下一代 MoE 效率标准  
> - SGLang 的 **PD 分离稳定性** → 可扩展代理集群的关键  
> - LiteLLM 的 **ReDoS 修复 (#32353)** → 高吞吐代理系统的可用性核心  

*报告生成时间：2026-09-12 | 数据来源：GitHub 项目摘要*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **1. 今日亮点**  
vLLM 项目持续深化对 **DeepSeek-V4.1-Flash 优化** 的投入，多个 PR 针对性能、推测解码稳定性以及在 SM90（H20/H200）和 ROCm 平台上的流水线并行性展开改进。关键修复包括解决 **DFlash2 推测解码崩溃**、**混合 Mamba/GDN 模型中的前缀缓存缺失** 以及 **0.28.0/0.29.0 版本的内存耗尽问题**——所有这些问题目前均已在合并或审查中的 PR 中积极修复。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
**注意**：近期 `v0.28.0` 和 `v0.29.0` 版本出现的回归问题导致 **主机内存耗尽并冻结**（问题 #54237），截至今日仍未解决；建议用户暂时锁定至 `v0.27.1` 以确保稳定性，直至修复版本发布。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1-Flash** 获得针对性优化：  
  - 增加序列并行阶段边界（PR #56438）  
  - DSpark 支持仅 KV 上下文插入（PR #56441）  
  - Engram 查找重叠现在可配置（PR #56436）  
  - 完全支持 **Marlin MXFP4 MoE 后端** 在 SM90（H20/H200）上，同时正在积极修复非法内存访问问题（问题 #56389，PR #56443）  
- **ROCm 支持扩展**：  
  - 显式指定 W4A16 MoE 在 gfx942/gfx950 上的 Triton 后端（PR #56543）  
  - GLM-5.3 在 ROCm 上出现精度崩溃（问题 #54924），调查正在进行中  
- **Rust 前端**：新增对预处理多模态 gRPC 特征的支持（PR #55047）

---

### **4. 性能与优化**  
- **推测解码（DFlash2）**：  
  - 为 Qwen3 DFlash2 添加融合分组卷积核（PR #55960），通过减少内核启动开销提升吞吐量。  
  - 修复 MTP 推测解码问题：在混合 GDN 模型中恢复前缀缓存命中（PR #52244），且 DFlash2 现已避免在第 30 个 token 出现贪婪输出漂移（问题 #54928）。  
- **MoE 与专家卸载**：  
  - 基于 GPU 缓存 + 异步流水线的增量式 MoE 专家卸载（问题 #38256）正逐步接近生产可用状态。  
  - MOE oracle/linear 内核迁移工作进行中（问题 #54959，PR #56543）。  
- **内存与吞吐量**：  
  - Elastic EP 现可在重新配置时复用 CUDA graph（PR #54985），降低预热延迟。  
  - AWQ GEMM 内核在 RTX 3070 Ti 上被分析为 L1/内存受限（问题 #55462）；优化工作已启动。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|--------|------|--------|--------|
| 🔴 高 | `v0.28.0`/`v0.29.0` 消耗全部主机内存并导致系统冻结 | 开放 | [PR #56404](https://github.com/vllm-project/vllm/pull/56404)（临时方案：避免使用 `SimpleCPUOffloadScheduler`） |
| 🔴 高 | H200（SM90）上 `map_draft_to_target` 中 DFlash2 推测解码崩溃 | 开放 | [PR #56443](https://github.com/vllm-project/vllm/pull/56443) |
| 🟡 中 | DFlash2 + YaRN：尽管提示相同（1.04M），仍零前缀缓存复用 | 开放 | 待定 |
| 🟡 中 | `qwen3_coder` 解析器中工具选择强制机制失效（问题 #54808） | 开放 | [PR #54257](https://github.com/vllm-project/vllm/pull/54257) |
| 🟡 中 | Qwen3.8-Flash-Next 长前缀填充导致解码饥饿数分钟（问题 #54919） | 开放 | 待定 |

---

### **6. 对应用开发者的意义**  
- 若运行高并发或长提示负载，请**避免使用 v0.28.0/v0.29.0**，建议暂用 `v0.27.1` 直至内存泄漏修复。  
- **部署 DeepSeek-V4.1-Flash** 时，预计在即将推出的 MRV2+DFlash2 优化下，SM90（H20/H200）平台将获得更高吞吐与更稳定表现。使用 `--enable-sleep-mode` 时需谨慎——`mm-encoder-tp-mode` 中仍存在已知的 HBM 泄漏问题（问题 #47654）。  
- **结构化输出**（如 JSON）可能因 `apply_grammar_bitmask` 重构而性能下降（问题 #49013）；请密切监控端到端延迟。  
- **多模态应用** 应为 Rust 前端改进（PR #55047）做好准备，并确保视频解码错误能正确暴露（PR #52759）。  
- **ROCm 用户** 必须手动为 gfx942/gfx950 上的 W4A16 MoE 选择 Triton 后端（PR #56543），并关注 GLM-5.3 的精度下降问题（问题 #54924）。

> 💡 *实用提示*：关注 [vLLM 的 RFC 列表](https://github.com/vllm-project/vllm/issues?q=is%3Aissue+is%3Aopen+label%3ARFC)，了解未来调度、量化及 EPLB 变更——尤其关注 MoE 与跨架构优化相关更新。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-09-12**

---

### **1. 今日亮点**  
SGLang 生态系统持续加速向生产级智能体推理迈进，关键进展集中在分布式 KV 缓存的可扩展性与深度硬件集成。主要成果包括恢复 GLM-5.3 Flash 解码上下文并行（CP）功能、新增对 DeepSeek-V4.1 的支持，以及在 Hopper 平台上对多模态服务的持续优化。当前重点仍聚焦于高负载场景下 CUDA 核心转储（coredump）及 PD 分离架构稳定性问题的解决。

---

### **2. 发布与破坏性变更**  
*无*。过去 24 小时内未发布新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1**：PR #38798 添加完整模型支持，包含 FP8 KV 缓存与优化路由。[PR #38798](https://github.com/sgl-project/sglang/pull/38798)  
- **SenseNova-U1/U1.5**：追踪问题 #37742 列出官方支持路线图，包括用于图像生成的 8 步蒸馏 LoRA。[Issue #37742](https://github.com/sgl-project/sglang/issues/37742)  
- **AMD RDNA3/RDNA4 (gfx1100/gfx1201)**：通过 ROCm 支持消费级 Radeon GPU 已成为正式追踪任务。[Issue #30599](https://github.com/sgl-project/sglang/issues/30599)  
- **NVFP4 KV 缓存**：SM120/B200 支持进展顺利；初始实现已合并。[Issue #29913](https://github.com/sgl-project/sglang/issues/29913)

---

### **4. 性能与优化**  
- **Qwen3-VL 独特图像服务**：通过消除冗余缓存预留，优化内存使用——将预填充开销从 16 GiB 降低至接近零。[PR #36411](https://github.com/sgl-project/sglang/pull/36411)  
- **Mamba2 SSD 内核**：新增 Triton 自动调优，恢复因默认 `BLOCK_SIZE=16` 导致的高达 10 倍以上的预填充性能损失。[PR #39130](https://github.com/sgl-project/sglang/pull/39130)  
- **Qwen-Image-Edit 注意力**：通过共享尾部重用，减少 Hopper 上重复的 QK 归一化与 SDPA 调用。[PR #38584](https://github.com/sgl-project/sglang/pull/38584)  
- **DeepGEMM MegaMoE**：融合共享 → 稀疏专家，提升 DSV4 中的吞吐量。[PR #38700](https://github.com/sgl-project/sglang/pull/38700)

---

### **5. 稳定性与回归问题**  
- **CUDA 核心转储追踪 (#26340)**：24 小时内新增 298 条评论——CI 测试中正进行自动崩溃收集。亟需高优先级修复。[Issue #26340](https://github.com/sgl-project/sglang/issues/26340)  
- **GLM-5.3 在分离解码 + DP 注意力 + 预测解码组合下的崩溃 (#39072)**：在分离架构下进行预测解码时发生严重崩溃。[Issue #39072](https://github.com/sgl-project/sglang/issues/39072)  
- **H20 八卡启动失败（Qwen3.8-Flash-Next-FP8）(#38793)**：报告硬件特定故障；可能由驱动或内存布局问题引起。[Issue #38793](https://github.com/sgl-project/sglang/issues/38793)  
- **编码器-解码器 KV 缓存双重释放 (#38840)**：当 `page_size > 1` 时出现内存损坏漏洞——需立即打补丁。[Issue #38840](https://github.com/sgl-project/sglang/issues/38840)  
- **Flash Attention 3 (FA3) sm_89 兼容性问题 (#38980)**：`is_fa3_supported()` 接受 sm_89，但未随附对应 cubin——导致无声 CUDA 错误。[Issue #38980](https://github.com/sgl-project/sglang/issues/38980)

---

### **6. 对应用开发者的影响**  
构建智能体系统的开发者应预期分布式服务配置复杂度将持续上升。建议优先在混合 TP/WP 路由与预测解码的分离架构上进行测试，此类场景易暴露细微正确性缺陷（如 #39072、#38840）。对于多模态应用，近期优化（如 #36411、#38584）已实现更低延迟、更高吞吐的流式处理能力。仅在确认稳定后才使用 `--attn-cp-size` >8（参见 #30991），若响应中仍出现推理字段，请避免设置 `include_reasoning=false`（参见 bug #39103）。密切监控 CI 健康状态——多个核心转储与不稳定测试表明生产部署可能存在潜在不稳定性。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-12**

---

### **1. 今日重点**  
最新更新聚焦于后端稳定性与性能调优，尤其针对 Metal、Vulkan 及 CUDA/HIP 后端。关键修复包括解决 GPU 内核正确性问题（如 Blackwell 平台上的 IQ1_S/IQ2_S/IQ3_S），Vulkan `argsort` 中的数据竞争，以及推测解码行为。值得注意的是，一项 PR 引入了 SYCL 图记录/重放支持，并重构了 JSON Schema 处理逻辑以提升服务器可靠性。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未发布新的标记版本。但有若干破坏性变更正在推进中：  
- **`--cache-disk` 功能请求 (#20697)** 正在积极讨论；希望使用磁盘级上下文卸载的用户应持续关注进展。  
- **提议将 `GGML_CUDA_FA_ALL_QUANTS=ON` 设为默认值 (#28633)**：此设置将在无 4 位 KV 缓存时静默回退至 CPU 而不发出警告——这是一次重大行为变更，需谨慎规划迁移。[议题 #28633](https://github.com/ggml-org/llama.cpp/issues/28633)  
- **服务器响应格式修复**：`json_schema` 现已正确解析顶层 schema，而非仅解析嵌套的 `json_schema.schema`。[PR #28697](https://github.com/ggml-org/llama.cpp/pull/28697)

---

### **3. 新模型与硬件支持**  
- **Intel Arc B70 Vulkan 支持**：多个问题报告指出，通过 Vulkan 在 Intel B70 上运行 MoE 模型（如 Qwen3.6-35B-A3B-MTP）时发生崩溃。修复待定。[议题 #23769](https://github.com/ggml-org/llama.cpp/issues/23769)  
- **AMD RDNA4 Flash Attention 调优**：HIP 后端现已启用头尺寸为 256 时的完整 MMA FA，且优先使用整块网格而非 stream-k。[PR #28102](https://github.com/ggml-org/llama.cpp/pull/28102)  
- **Metal 融合逻辑重构**：统一融合表提升了 Metal 内核间的优化一致性。[PR #28164](https://github.com/ggml-org/llama.cpp/pull/28164)  
- **OpenVINO 在 AVX-512 上崩溃**：在 Core Ultra 7 系统上报告严重缺陷，触发 `STATUS_ILLEGAL_INSTRUCTION`。[议题 #28726](https://github.com/ggml-org/llama.cpp/issues/28726)

---

### **4. 性能与优化**  
- **新增 SYCL 图记录/重放功能**：支持计算图的性能分析与重放，显著提升调试与基准测试工作流效率。[PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725)  
- **CUDA：缓冲区填充使用每线程流**：通过切换至异步 memset + 同步方式，避免在图捕获期间出现潜在竞争条件。[PR #28782](https://github.com/ggml-org/llama.cpp/pull/28782)  
- **CPU：无 CPU 计算图跳过线程池**：当所有计算均已卸载至 GPU（常见于全 GPU 推理场景）时，减少开销。[PR #28785](https://github.com/ggml-org/llama.cpp/pull/28785)  
- **Metal：小 NE00 的空闲线程修复**：优化了小张量维度（<1024）下 IQ 内核的线程利用率。[PR #28692](https://github.com/ggml-org/llama.cpp/pull/28692)

---

### **5. 稳定性与回归问题**  
- **Vulkan `argsort_large` 中严重崩溃**：VVL 检测到内层循环中的数据竞争；越界访问可能导致 CI 失败。尚未修复。[议题 #28705](https://github.com/ggml-org/llama.cpp/issues/28705)  
- **GPU 内核损坏（Blackwell sm_120）**：由于遗漏字节掩码，编译错误的 IQ1_S/IQ2_S/IQ3_S 内核产生垃圾输出。[PR #28784](https://github.com/ggml-org/llama.cpp/pull/28784) – *正在审查中*  
- **推测解码性能下降**：`ngram-cache` 推测因错误缓存复用导致性能恶化（接受率从 86% 降至 11%）。[议题 #27852](https://github.com/ggml-org/llama.cpp/issues/27852)  
- **SYCL 池顺序破坏**：OneDNN 临时存储违反 LIFO 顺序，引发崩溃。[议题 #28660](https://github.com/ggml-org/llama.cpp/issues/28660)  
- **Windows/MSVC 链接失败**：PCH + export 变更导致 `llama-server` 链接中断。[议题 #28758](https://github.com/ggml-org/llama.cpp/issues/28758) – *修复待定*

---

### **6. 对应用开发者的启示**  
- **暂勿使用 `--cache-disk`**：该功能仍在讨论中，尚未达到生产可用状态。请持续关注 [#20697](https://github.com/ggml-org/llama.cpp/issues/20697)。  
- **为 AMD 调优 Flash Attention**：在 RDNA4 上启用 `hip:enable_mma_fa`，并优先选择整块网格以获得最佳吞吐量。  
- **使用 4 位 KV 缓存时需谨慎**：若在 CUDA 上使用 `q4_0/q4_1`，除非显式设置 `GGML_CUDA_FA_ALL_QUANTS=ON`，否则将静默回退至 CPU。  
- **验证 JSON Schema 解析逻辑**：确保 schema 直接传入（`response_format.schema`）或正确封装——旧版本处理不一致。  
- **在 Intel Arc B70/Vulkan 上测试时避开 MoE 模型**：直至 [议题 #23769](https://github.com/ggml-org/llama.cpp/issues/23769) 解决前，请避免使用。  
- **使用 SYCL 图进行可复现基准测试**：新引入的记录/重放功能可实现一致的性能分析。

> ✅ **实用建议**：对于高吞吐推理，结合 `--n-cpu-ffn` 与 `--n-cpu-mode`（提议于 #27987）可在多核 CPU 上优化 FFN 执行效率。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-12**

---

### **1. 今日亮点**  
`qwen3.8` 与 `glm-5.3:cloud` 模型报告多个关键稳定性问题，包括无限推理循环、静默丢弃工具调用以及因消息处理错误导致的流式传输错误。在升级至 `0.30.0` 后，模型加载性能出现显著退化，同时 Windows 用户在持续嵌入负载下遭遇端口耗尽问题。与此同时，多项新 PR 正在推进云代理超时优化，并改进 Anthropic 兼容性下的工具模式解析。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新发布或破坏性变更。*

---

### **3. 新模型与硬件支持**  
- **新模型请求**:  
  - `Hy4-preview` (腾讯) — [Issue #18287](https://github.com/ollama/ollama/issues/18287)  
  - `deepseek-v4.1-flash` — [Issue #18379](https://github.com/ollama/ollama/issues/18379)  
- **硬件支持**:  
  - `ppc64le` 架构 — [Issue #796](https://github.com/ollama/ollama/issues/796)（自 2023 年起持续请求）  
- **量化支持**:  
  - `Qwen3.8-27B-GSQ-RCO-GGUF` 对 `IQ3_S` 量化支持 — [Issue #18297](https://github.com/ollama/ollama/issues/18297)（当前返回空内容）

---

### **4. 性能与优化**  
- **模型加载性能下降**: 升级至 `0.30.0` 后，用户反映大型模型如 `gpt-oss:120b` 与 `qwen3.5:122b` 的加载速度显著变慢。有用户指出加载时间从 **61秒 → 116秒**，表明存在潜在性能回归 ([Issue #18373](https://github.com/ollama/ollama/issues/18373))。  
- **嵌入吞吐量问题**: 在 Windows 上持续调用 `/api/embed` 会因 `llama-server` HTTP 客户端禁用保活机制而导致回环端口耗尽 ([Issue #18392](https://github.com/ollama/ollama/issues/18392))。  
- **云代理超时修复**: 已合并一项 PR，为云代理的首字节时间（TTFB）和连接超时设置上限，防止无限挂起 ([PR #18382](https://github.com/ollama/ollama/pull/18382))。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | GitHub 链接 |
|--------|------|------------|
| 🔴 高 | `qwen3.8`: 处理工具后流式输出失败，提示“消息中未找到用户查询”（500 错误），影响工具调用工作流 | [#17778](https://github.com/ollama/ollama/issues/17778) |
| 🔴 高 | `glm-5.3:cloud`: 进入无限推理循环，在 OpenCode/ZCode 中强制终止任务，尽管官方 API 正常运行 | [#18193](https://github.com/ollama/ollama/issues/18193) |
| 🟡 中 | `qwen3.8:27b`: 因缺少 `TensileLibrary_lazy_gfx1200.dat` 文件，导致在 RX 9060 XT ROCm GPU 上运行失败 | [#17782](https://github.com/ollama/ollama/issues/17782) |
| 🟡 中 | `qwen2.5-coder:3b-instruct` 在 q2_K/q3_K_S/M/L 量化级别下，代码任务得分全为 0%；虽输出流畅但功能已失效 | [#18252](https://github.com/ollama/ollama/issues/18252) |
| 🟡 中 | `gemma4`: 工具调用参数键含空格时，整个调用被静默丢弃 | [#18390](https://github.com/ollama/ollama/issues/18390) |
| 🟡 中 | 云模型（`deepseek-v4-pro:cloud`）在 `0.34.0` 版本运行约 45 分钟后卡死，但在 `0.33.1` 版本下运行正常 | [#18381](https://github.com/ollama/ollama/issues/18381) |

> ✅ *正在进行修复*:  
> - PR [#18382](https://github.com/ollama/ollama/pull/18382): 为云代理连接添加超时控制  
> - PR [#18388](https://github.com/ollama/ollama/pull/18388): 增强 JSON 工具参数解析（支持 `args` 字段）  
> - PR [#18391](https://github.com/ollama/ollama/pull/18391): 在模板中以 JSON 格式渲染工具函数

---

### **6. 对应用开发者的启示**  
- **生产环境避免使用 `qwen3.8` 与 `glm-5.3:cloud`**，直至修复上线——两者均存在严重正确性与稳定性问题。若可选，请优先使用 `qwen3.5` 或 `glm-5.1` 替代版本。  
- **严格验证工具模式定义**：如 `gemma4` 与 `anthropic` 等模型，若工具参数键含空格或使用非标准字段（如 `args`），可能导致调用静默失败。请确保工具定义遵循严格的 `parameters`/`arguments` 结构。  
- **监控嵌入系统资源**：在 Windows 上，高并发嵌入任务可能引发端口耗尽——建议采用分批处理或连接池机制。  
- **谨慎使用 `:cloud` 模型**：近期版本（`0.34.0`）在持续负载下表现出不稳定性——如可靠性至关重要，请降级至 `0.33.1`。  
- **追踪清单摘要**：随着 PR [#18394](https://github.com/ollama/ollama/pull/18394) 的引入，本地推理客户端现在可将响应与精确的构件摘要关联——对评估流水线中的可复现性至关重要。

---  
*数据来源: github.com/ollama/ollama | 更新时间: 2026-09-12*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 摘要 — 2026-09-12**

#### **1. 今日亮点**  
在成功遏制 Trivy 供应链漏洞（问题 #24518）后，LiteLLM 项目持续强化其安全策略，所有当前版本发布均通过 cosign 签名验证。关键进展包括与 ConductGuard 的增强型护栏集成（PR #38143, #40785）、提示词缓存亲和性对齐优化（PR #40776），以及针对流式错误处理、模型路由和成本追踪中的关键缺陷的持续修复工作。

#### **2. 发布与破坏性变更**  
- **v1.102.0-dev.2** 今日发布：包含安全加固及代理内部更新。  
- **Docker 镜像验证**：所有镜像现使用 [cosign](https://docs.sigstore.dev/cosign/overview/) 进行签名，密钥来自提交 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)。  
  🔗 [验证 Docker 镜像签名](https://docs.litellm.ai/docs/security#verifying-image-signatures)

> ⚠️ **迁移提示**：依赖 `lite codex` 或自定义 CLI 配置的用户应查阅 PR #40447 与 #40476，了解模型发现与配置管理行为的更新。

#### **3. 新模型与硬件支持**  
- **Prism** 作为原生 OpenAI 兼容提供者加入（PR #40782），已验证定价与端点元数据。  
- **GitGot** 以 JSON 配置方式引入为提供者（`gitgot`），支持通过 `https://inference.gitgot.ai/v1` 进行推理（PR #40810）。  
- **ConductGuard** 已集成为第一类护栏（PR #38143, #40785），可在所有经代理路由的 LLM 调用中执行策略强制。  
- **Gemini 3.5 Transcribe Live Preview** 现支持动态音频采样率检测（PR #40563）。

#### **4. 性能与优化**  
- **提示词缓存优化**：PR #40776 将缓存亲和性 TTL 与 `cache_control.ttl` 对齐，减少跨部署不必要的缓存未命中——对一小时周期的 Anthropic 缓存尤为关键。  
- **成本估算**：PR #40804 引入新接口 `/estimate_prompt_cache_switch_cost`，用于对比不同 TTL（如 5 分钟 vs 1 小时）下的写入成本，支持更智能的缓存决策。  
- **基于延迟的路由**：PR #40788 / #40792 通过 HTTP 头部暴露详细路由指标（层级、原因、得分、努力度），无需自定义回调即可实现可观测性。

#### **5. 稳定性与回归问题**  
今日报告多个高严重性问题：

| 问题 | 严重性 | 概述 | 修复状态 |
|------|----------|--------|------------|
| [#40735](https://github.com/BerriAI/litellm/issues/40735) | 严重 | Bedrock Converse 在未重新声明 `tools` 数组的情况下拒绝后续工具调用 | ❌ 待处理 |
| [#32353](https://github.com/BerriAI/litellm/issues/32353) | 严重 | `secret_redaction.redact_string()` 中的 ReDoS 导致正则表达式灾难性回溯，引发代理崩溃循环 | ❌ 待处理 |
| [#40575](https://github.com/BerriAI/litellm/issues/40575) | 高 | Qwen3.8 工具结果虽在 OpenAI 兼容模式下正常，但通过原生 Ollama 提供者时未被消费 | ❌ 待处理 |
| [#40582](https://github.com/BerriAI/litellm/issues/40582) | 高 | `parse_tool_call_arguments` 会静默丢弃拼接的 JSON 工具参数 | ❌ 待处理 |
| [#40761](https://github.com/BerriAI/litellm/issues/40761) | 中等 | 当 `litellm_params` 变化时（且 `store_model_in_db=true`），配置文件中的模型会被逐出 | ❌ 待处理 |

> 💡 **注意**：其中多项回归影响生产稳定性——特别是 ReDoS 漏洞（#32353），可能导致存活探针失效并触发 Pod 崩溃。

#### **6. 对应用开发者的意义**  
- **安全优先部署**：仅使用签名的 Docker 镜像（`ghcr.io/berriai/litellm:main-latest` + cosign 验证），避免使用未经验证的 PyPI 包。  
- **护栏已成为核心功能**：将 **ConductGuard** 集成至您的代理配置中，可在边缘强制执行合规策略，无需自定义中间件。  
- **流式可靠性**：对上游提供者在流式传输中发出带内错误的情况需保持警惕；目前 LiteLLM 会**静默丢弃**这些错误（参见 #40578），建议添加降级逻辑。  
- **模型路由精度**：利用公开的复杂度路由头信息（PR #40788）调试请求为何路由至特定层级。  
- **避开已知陷阱**：不要假设 Bedrock Converse 的后续调用可省略 `tools`（#40735）；谨慎使用 `cache_control_injection_points`——客户端的 `cache_control` 可能导致注入点被丢弃（#40675）。

👉 **行动项**：审计部署中是否使用 `store_model_in_db`（问题 #40761），通过 `lite configure codex` 更新 CLI 工具（PR #40447），并监控日志脱敏路径中的 ReDoS 风险。

---  
*摘要生成时间：2026-09-12 | 来源：[GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-12**

---

### **1. 今日亮点**  
Unsloth 项目持续扩展其跨平台与多 GPU 支持能力，重点推进了 AMD ROCm Docker 镜像集成，并修复了 Windows 平台上的关键 GPU 内存管理问题。Studio 中实现了重大 UI/UX 改进，包括在标签页重新加载后仍能持久化智能体对话轮次，以及更优的工具调用去重处理，显著提升了自治智能体的可靠性。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未发布新版本。但因正在进行的 PR，数项破坏性变更即将生效：

- `SFTConfig.__init__()` 现在要求使用 `max_length` 而非 `max_seq_length`，可能破坏现有训练脚本（参见 [Issue #10785](https://github.com/unslothai/unsloth/issues/10785)）。
- Windows 平台上将限制 `accelerate` 库版本低于 1.15，以避免与 ROCm 相关的崩溃问题（参见 [PR #10819](https://github.com/unslothai/unsloth/pull/10819)）。

> ✅ *操作建议：若目标为 AMD/Windows 平台，请更新配置参数并锁定 `accelerate` 版本。*

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 支持（已进入生产就绪状态）**：新增官方 Docker 镜像 `unsloth/unsloth:rocm`，通过 ROCm 支持 RDNA2/3/4 及 CDNA/Instinct GPU，与基于 CUDA 的 Blackwell 镜像对齐，实现 AMD 硬件上的完整部署兼容性（[PR #10820](https://github.com/unslothai/unsloth/pull/10820)）。
- **ARM64 CPU 专用 Docker 镜像**：针对 ARM64 系统（如 Apple Silicon、嵌入式设备）正在开发官方轻量级纯 CPU 构建版本，填补非 GPU 部署场景的空白（[PR #10766](https://github.com/unslothai/unsloth/pull/10766)）。
- **多 GPU 与 FLUX.2 Klein VAE**：持续优化多 GPU 推理稳定性；然而，在部分配置下，VAE 解码期间仍存在 `CUBLAS_STATUS_NOT_INITIALIZED` 的 CUDA 错误（[Issue #10768](https://github.com/unslothai/unsloth/issues/10768)）。

---

### **4. 性能与优化**  
- **内存效率（Windows）**：修复使用 `--no-mmap` 时在 Windows 上驻留的 GGUF 映射问题——此前因操作系统限制，未映射文件会持续占用内存（[PR #10618](https://github.com/unslothai/unsloth/pull/10618)）。
- **训练吞吐量**：在 B200 GPU 上，`fla` 自动调优每次启动都会重新初始化，导致 LoRA 训练期间产生不必要的开销——这是一个已知性能下降问题（[Issue #10806](https://github.com/unslothai/unsloth/issues/10806)）。
- **微批次调优**：为图像处理投影器增加微批次大小，防止大尺寸图像（如 1400x1400）触发 llama-server 崩溃（[PR #10683](https://github.com/unslothai/unsloth/pull/10683)）。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | PR/备注 |
|--------|------|--------|---------|
| 高 | 长时间的 GGUF 对话等待工具审批，即使有空闲槽位也会阻塞队列任务 | 开放 | [Issue #10671](https://github.com/unslothai/unsloth/issues/10671) |
| 高 | FLUX.2 Klein VAE 解码期间出现 CUDA 错误 `CUBLAS_STATUS_NOT_INITIALIZED` | 开放 | [Issue #10768](https://github.com/unslothai/unsloth/issues/10768) |
| 中 | `clean_text` 会删除所有非 ASCII 字符，导致多语言输入损坏 | 开放 | [PR #10741](https://github.com/unslothai/unsloth/pull/10741) |
| 中 | 文件编辑后跳过重复工具调用，因去重逻辑过于激进 | 开放 | [PR #10810](https://github.com/unslothai/unsloth/pull/10810) |
| 低 | X11 + NVIDIA：WebKitWebProcess 泄露 DMA-BUF sync_file fd 导致界面冻结 | 开放 | [Issue #10795](https://github.com/unslothai/unsloth/issues/10795) |

> ⚠️ *重要提示*：在某些上下文中，`--tensor-split` 标志被忽略，导致意外行为（[Issue #10355](https://github.com/unslothai/unsloth/issues/10355)）。

---

### **6. 对应用开发者的意义**  
- **构建多硬件兼容应用**：随着 AMD ROCm 与 ARM64 CPU Docker 支持正式上线，开发者可将 unsloth 应用部署于从数据中心到边缘设备的多样化基础设施上。
- **提升智能体可靠性**：新引入的智能体对话轮次持久化功能确保长周期智能体工作流在浏览器重启后仍能继续运行，支撑更稳健的自主流程。
- **谨慎处理工具调用去重**：文件修改不会自动触发工具调用重执行，除非显式处理（[PR #10810](https://github.com/unslothai/unsloth/pull/10810)）。
- **导出模型需小心**：当前将完整微调模型导出为 16 位时，默认仍保存为 4 位模型——请务必仔细检查导出设置（[PR #10808](https://github.com/unslothai/unsloth/pull/10808)）。
- **避免破坏性变更**：请将 SFT 配置中的 `max_seq_length` 更新为 `max_length`，并在 Windows 上锁定 `accelerate` 版本 < 1.15 以保证 ROCm 兼容性。

> 🔗 *推荐操作*：  
> - 使用 [Docker Compose](https://github.com/unslothai/unsloth/pull/10600) 实现运行时数据持久化。  
> - 关注 [Plugin Store](https://github.com/unslothai/unsloth/issues/10801) 与 [MCP Hub](https://github.com/unslothai/unsloth/issues/10822) 提案，了解未来扩展生态规划。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*