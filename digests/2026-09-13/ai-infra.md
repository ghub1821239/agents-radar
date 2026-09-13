# AI 基础设施日报 2026-09-13

> 生成时间: 2026-09-13 00:16 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-13**

---

### **1. 生态概览**  
AI推理与服务生态正进入**高度专业化与硬件收敛**阶段，对下一代GPU架构（SM120/Blackwell、SM90/H20、AMD MI355X/gfx1201）和模型系列（DeepSeek-V4.1、Qwen3.5/Gemmas）的关注持续深化。尽管vLLM和SGLang在底层内核优化与推测性解码鲁棒性方面处于领先地位，LiteLLM和Ollama也逐步成熟为多提供商互操作性及智能体工作流的关键入口。Unsloth与llama.cpp则持续推动本地推理效率与微调敏捷性的边界。当前趋势清晰指向**硬件感知推理**、**结构化输出可靠性**以及**跨平台稳定性**。

---

### **2. 活动对比**

| 项目       | 今日开放问题数 (Issues Open) | 今日合并的PR数 (PRs Merged) | 近24小时发布数 (Releases) | 状态 |
|---------------|---------------------|--------------------|---------------------|--------|
| **vLLM**      | 8                   | 7                  | 无                  | 持续开发，工程速度极快 |
| **SGLang**    | 6                   | 5                  | 无                  | 聚焦Blackwell与ROCm稳定性 |
| **llama.cpp** | 5                   | 4                  | `b10934`, `b10933`  | 频繁小版本发布；快速修复 |
| **Ollama**    | 10                  | 4                  | 无                  | 回归问题量大；聚焦稳定性 |
| **LiteLLM**   | 4                   | 4                  | 无                  | 战略更新（定价、安全） |
| **Unsloth**   | 7                   | 5                  | 无                  | Docker中断后优先处理关键修复 |

> ✅ *vLLM与Unsloth展现出最高的工程吞吐量；Ollama与SGLang面临更多与稳定性相关的活动。*

---

### **3. 模型支持竞赛**

| 模型 / 架构             | vLLM         | SGLang       | llama.cpp     | Ollama        | LiteLLM           | Unsloth          |
|----------------------------------|--------------|--------------|---------------|---------------|-------------------|------------------|
| **DeepSeek-V4.1-Flash**         | ✅ 完整支持   | ✅ 部分支持    | ❌ 实验性       | ⚠️ Beta         | ✅ 已添加（PR #40919)| ⚠️ 请求中（#10838) |
| **Qwen3.5 Hybrid GDN**          | ✅ 支持      | ✅ 支持      | ⚠️ 性能问题     | ⚠️ 推测解码丢失 | ✅ 支持 | ✅ 支持 |
| **Gemma 4 Multimodal (GGUF)**   | ❌            | ❌            | ❌            | ✅ 统一视觉支持 | ❌ | ❌ |
| **AMD MI355X / gfx1201**        | ✅ ROCm优化   | ✅ gfx950+    | ✅ GCN HIP配置 | ⚠️ Strix Halo渗漏 | ❌ | ✅ ROCm Docker镜像 |
| **Blackwell (sm_120/sm_121)**   | ✅ H20/GB10   | ✅ VibeCUDA MSA | ✅ cuBLAS回退 | ❌ RTX 5090卡死 | ❌ | ❌ |
| **EXL3 量化后端**               | ❌            | ❌            | ❌            | ❌            | ❌               | ✅ 实验性（PR #7115） |

> 🏆 **胜者：vLLM** – 在新模型与硬件支持上最全面，尤其在Flash/MoE及ROCm/CUDA融合方面表现突出。  
> 🥈 **亚军：SGLang** – Blackwell集成最强，新兴ROCm覆盖能力显著。  
> 🥉 **新锐：Unsloth** – 快速拓展至ROCm与EXL3，有望在未来量化领域占据领导地位。

---

### **4. 性能前沿**

| 关注领域                     | 领先项目                              | 关键进展 |
|-------------------------------|---------------------------------------|----------|
| **KV缓存效率**       | vLLM, SGLang                                  | MoE路由修复（vLLM），统一缓存验证（SGLang），稀疏索引（vLLM） |
| **批处理与并行**    | vLLM                                          | 序列并行下的批处理不变性修复，异步TP稳定性优化 |
| **推测性解码**      | vLLM, SGLang                                  | DFlash2预热迁移（vLLM），草稿复用与拒绝修复（SGLang） |
| **量化与内存**     | llama.cpp, Unsloth                            | FP8正确性（SGLang），IQ3_S MMQ（Vulkan），EXL3后端（Unsloth） |
| **内核级优化**     | vLLM, SGLang                                  | DeepSelect TopK（vLLM），融合FP8 KV预处理（SGLang），mHC融合（vLLM） |
| **分布式推理**       | vLLM                                          | 低SM reduce-scatter（SM100/103），PCP+DCP分片（ROCm） |

> 🔥 *vLLM在内核优化与分布式推理方面仍是性能标杆。*  
> 💡 *SGLang在支持新后端（VibeCUDA MSA）和降低推测开销方面领先。*

---

### **5. 层级定位**

| 项目       | 主要层级                        | 核心差异化 |
|---------------|----------------------------------|------------|
| **vLLM**      | 推理引擎（GPU原生）              | 吞吐最高，内核优化，支持SM120/H20、MoE、DFlash2 |
| **SGLang**    | 推理引擎 + 运行时                | 与FlashInfer/VibeCUDA深度集成，推测性解码与内存池能力强 |
| **llama.cpp** | 本地运行时（CPU/GPU混合）         | 轻量级，跨平台，适合边缘/本地智能体，支持工具调用 |
| **Ollama**    | LLM网关 + 智能体平台             | 统一CLI/UI，多模态支持，智能体生命周期管理 |
| **LiteLLM**   | LLM网关 + 代理                  | 多提供商抽象，成本追踪，MCP安全，兼容OpenAI的代理 |
| **Unsloth**   | 微调 + 训练框架                 | 快速LoRA训练，GPU内存优化，集成Docker Studio |

> 📊 **层级地图**：  
> - **引擎层**：vLLM、SGLang  
> - **运行时层**：llama.cpp  
> - **网关/代理层**：LiteLLM、Ollama  
> - **训练/微调层**：Unsloth

---

### **6. 趋势信号**

#### **提炼出的关键行业趋势：**
1. **硬件专业化已成为必然要求**  
   —— 项目不再“一招通吃”。vLLM、SGLang与Unsloth已明确针对SM120（Blackwell）、SM90（H20）和AMD gfx1201。开发者必须根据自身GPU栈进行选型。

2. **结构化输出可靠性不容妥协**  
   —— 多个项目出现JSON模式解析错误（Ollama、llama.cpp）、确定性失败（vLLM）以及静默草稿拒绝（SGLang），表明智能体系统无法容忍沉默错误。预计将采用更严格的校验机制与“以模式为先”的设计。

3. **推测性解码正迈向生产就绪（但仍脆弱）**  
   —— DFlash2在vLLM与SGLang中被积极优化，但在185k上下文长度下（llama.cpp）性能下降，以及静默拒绝（SGLang）现象表明其在大规模场景下仍不稳定。使用需谨慎。

4. **量化与内存管理是部署成败关键**  
   —— FP8正确性漏洞（SGLang）、CUDA图崩溃（llama.cpp）、Jetson/ROCm上OOM（Ollama）凸显：量化不仅是体积问题，更是正确性与稳定性的核心。

5. **开源网关正成为安全关键组件**  
   —— LiteLLM的准入控制（PR #40923）与Ollama的Windows卸载器修复，标志着企业级部署规范日趋成熟。

#### **应用开发者应重点关注：**
- ✅ **锁定稳定版本**（尤其是Ollama `0.34.0`、SGLang开发提交），待重大回归问题修复后再升级。
- ✅ **长上下文模型（>185k）避免使用推测性解码**，除非已充分测试用例。
- ✅ **验证工具调用模式**——键名空格、嵌套对象、流式顺序等问题可能无声失败。
- ✅ **使用nightly或固定标签**（如vLLM/Unsloth）以获取最新内核优化与ROCm支持。
- ✅ **监控CI健康度**——SGLang与Ollama存在明显不稳定性；生产环境请优先选择带标签的发布版本。

---

> **最终结论**：AI基础设施层已不再是通用商品。它已成为战略差异化的核心。选择技术栈不仅要看性能，更要考量**稳定性、正确性与硬件契合度**。本报告揭示：**工程师正在为明天的GPU构建系统——而非今天基准测试的产物**。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-09-13

---

### **1. 今日亮点**  
vLLM 在 DeepSeek-V4.1/Flash 支持方面持续快速推进，针对 SM90（H20）和 SM120（GB10）上的高并发部署，已实现关键性能与稳定性修复。关于推测解码（DFlash2）、MoE 路由以及序列并行性下的批处理不变性等核心问题被重点标注，表明大规模推理负载的成熟度正在提升。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何内容。未观察到新版本发布或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1-Flash**：当前正积极优化多个后端的完整支持 —— 包括 ROCm（MI355X）和 CUDA（H20、GB10）。  
  - [Issue #56506](https://github.com/vllm-project/vllm/issues/56506)：性能分析显示在 AMD MI355X 上存在显著资源利用率不足；优化工作正在进行中。  
  - [PR #56633](https://github.com/vllm-project/vllm/pull/56633)：通过将 mHC 后块融合至延迟前投影，实现性能提升。  

- ✅ **SM8x（Ampere A100/A800, RTX 30xx）**：已加入路线图，用于 **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731**，详见 [Issue #50576](https://github.com/vllm-project/vllm/issues/50576)，目前因缺少内核支持而受阻。

- ✅ **ROCm（AMD）**：CI 改进与基础设施升级持续推进：  
  - [PR #56157](https://github.com/vllm-project/vllm/pull/56157)：在稀疏-MLA 模型上启用 PCP+DCP 分片。  
  - [PR #56645](https://github.com/vllm-project/vllm/pull/56645)：将 PCP 生产者 KV 分片暴露为传输秩，以提升可扩展性。  
  - [PR #56162](https://github.com/vllm-project/vllm/pull/56162)：弃用 MI250 测试组中的 DinD；提升 CI 稳定性。

---

### **4. 性能与优化**  
- 🔥 **推测解码（DFlash2）**：  
  - [PR #56323](https://github.com/vllm-project/vllm/pull/56323)：将采样与 DFlash JIT 内核迁移至共享预热基础设施 —— 对降低跨模型家族的冷启动延迟至关重要。  
  - [PR #56621](https://github.com/vllm-project/vllm/pull/56621)：修复卸载路径中 CPU 存储提交时机问题 —— 防止请求完成时出现无声数据丢失。

- 🚀 **内核级优化**：  
  - [PR #56464](https://github.com/vllm-project/vllm/pull/56464)：将 **DeepSelect TopK**（MIT 许可）集成至 DSA 稀疏索引器 —— 实现高性能、可选的 top-k 路由。  
  - [PR #55072](https://github.com/vllm-project/vllm/pull/55072)：为 SM100/SM103 提供低 SM 多内存 reduce-scatter 后端 —— 提升新架构上的分布式训练效率。  
  - [PR #56633](https://github.com/vllm-project/vllm/pull/56633)：通过融合 mHC 后块与延迟前投影，减少冗余内核调用 —— 直接提升解码吞吐量。

- ⚙️ **批处理不变性与并行性**：  
  - [Issue #27433](https://github.com/vllm-project/vllm/issues/27433)：正在进行的工作，旨在稳定异步 TP 与序列并行性下的批处理不变行为。  
  - [Issue #56370](https://github.com/vllm-project/vllm/issues/56370)：当 `enable_sp` 激活时，批处理不变性被破坏 —— 已知回归问题，需修复。

---

### **5. 稳定性与回归**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|------|----------|
| 🛑 高 | [#56389](https://github.com/vllm-project/vllm/issues/56389) | H20（SM90）上高并发下 `dsv4_topk` MoE 内核发生非法内存访问 | 通过 `max_num_seqs=256` 临时缓解；暂无 PR |
| 🛑 高 | [#56605](https://github.com/vllm-project/vllm/issues/56605) | GLM-5.3-Flash 在智能体工作流中退化为重复“词乱”输出 | 本地复现成功；根本原因未知 |
| 🟡 中 | [#54094](https://github.com/vllm-project/vllm/issues/54094) | DFlash2 + YaRN：1.04M prompt 时前缀缓存零重用，而目标仅模式下约 1.039M 重用 | 正在开发的 PR #54381 探究草稿组/块哈希问题 |
| 🟡 中 | [#54691](https://github.com/vllm-project/vllm/issues/54691) | DFlash 推测解码在 Qwen3.5 混合 GDN 模型上达到 185k 上下文时变为净损失 | 草稿器每轮重新扫描全部累积 KV；缺乏按序列长度禁用钩子 |
| 🟡 中 | [#55927](https://github.com/vllm-project/vllm/issues/55927) | DeepSeek-V4-Flash-0731 在 1/4 的提示长度（模 4）时出现确定性错误 token | 多个托管服务商复现；确切原因尚不明确 |

---

### **6. 对应用开发者的意义**  
- **在 H20（SM90）上部署高并发的 DeepSeek-V4.1-Flash 时务必谨慎** —— 在 [#56389](https://github.com/vllm-project/vllm/issues/56389) 修复前，建议将 `max_num_seqs` 限制在 256。  
- **仅在未使用序列并行性时才启用 `VLLM_BATCH_INVARIANT=1`** —— [#56370](https://github.com/vllm-project/vllm/issues/56370) 表明，当 `enable_sp` 启用时该选项会破坏正确性。  
- **使用推测解码时，长上下文（≥185k）混合 GDN 模型的预填充时间可能显著延长** —— 除非对上下文长度分布有充分信心，否则建议禁用 DFlash2。  
- **对于结构化输出场景**，请留意 [正在进行的 DFlash2 + xgrammar bug](https://github.com/vllm-project/vllm/issues/53777) 导致确定性 FSM 失败的问题 —— 修复前避免使用 `response_format: json_object`。  
- **在 GB10（SM121）上需密切监控 GPU 内存使用情况** —— [#56457](https://github.com/vllm-project/vllm/issues/56457) 报告，在长时间预填充过程中因 Qwen4Exp QSA 索引器中日志缓冲区无限增长导致设备 OOM/卡死。

> **专业提示**：使用夜间构建版（`vllm/vllm-openai:nightly`）可获取最新修复与优化，尤其适用于 DeepSeek-V4.1 及 ROCm 支持。关注如 #56633 和 #56464 等 PR，以预判未来性能提升。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **1. 今日亮点**  
SGLang 继续推进其底层推理基础设施，修复了针对 Blackwell 时代 GPU 的支持问题以及推测解码的鲁棒性缺陷。关键进展包括：修复 SM121 上 DeepSeek-V4.1 FP8 正确性问题、验证 VibeCUDA MSA 在 Blackwell 上的集成，以及持续优化跨多种硬件后端的统一缓存与 MoE 路由稳定性。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
未发布新版本或破坏性 API/配置变更。用户应警惕尚未合并的 PR 对行为的影响（例如 `--moe-runner-backend deep_gemm` 失败 — 参见 #39226）。

---

### **3. 新模型与硬件支持**  
- ✅ **Blackwell 上的 VibeCUDA MSA**：通过 [PR #39233](https://github.com/sgl-project/sglang/pull/39233) 合并集成，支持使用 FlashInfer 的 `vibecuda` 后端，并具备故障关闭的提供者选择机制和 CUDA graph 安全的元数据处理。
- ✅ **AMD gfx950**：通过 [PR #37413](https://github.com/sgl-project/sglang/pull/37413) 在 DSV4 中新增对 `fp8 two-pool unified_kv` 的支持，扩展了 ROCm 兼容性。
- ✅ **Apple Silicon (MLX)**：修复 VL 系列模型的无头 trunk 检测问题 ([PR #39242](https://github.com/sgl-project/sglang/pull/39242))，并在辅助状态中初始化 Mamba 网格属性 ([PR #39238](https://github.com/sgl-project/sglang/pull/39238))，提升了 MLX 后端的稳定性。
- 🚧 **NPU 支持**：[PR #37382](https://github.com/sgl-project/sglang/pull/37382) 为 NPU 上的 DeepSeek-V4 引入主机内存缓存管理 —— 仍在 CI 验证中。

---

### **4. 性能与优化**  
- 🔥 **推测解码效率**：[PR #39232](https://github.com/sgl-project/sglang/pull/39232) 在 TRTLLM MLA 目标验证中复用融合的 FP8 KV/Q 准备过程，消除冗余内核启动，降低草稿生成的开销。
- ⚙️ **内存池化与缓冲**：[PR #39223](https://github.com/sgl-project/sglang/pull/39223) 根据有效 SM 预算调整 MegaMoE 缓冲区分配，防止高并发场景下的过度分配。
- 📈 **扩散管道**：[PR #34122](https://github.com/sgl-project/sglang/pull/34122) 在 CUDA 上启用向量化 JointThreshold 解码，替代逐行的 Python 路径，减少高并发下的序列化开销。
- 🛠️ **CI 强制执行**：[PR #39206](https://github.com/sgl-project/sglang/pull/39206) 将扩散端到端性能指标设为 CI 中强制且终止项 —— 即使 `run_perf_check=False` 也强制要求有效延迟报告。

---

### **5. 稳定性与回归问题**  
- 🔴 **严重 FP8 正确性缺陷**：在 SM121 上，当 `DEEPGEMM_SCALE_UE8M0=false` 时，`deep_gemm.fp8_einsum` 返回结果约错误 25%，且不抛出错误 ([#39193](https://github.com/sgl-project/sglang/issues/39193))。*修复待定。*
- 🔴 **DeepGEMM 图捕获失败**：在 DeepSeek-V4.1 MXFP4 上使用 `--moe-runner-backend deep_gemm` 时，因 sm_121 上的布局断言（`layout.hpp:108`）导致 CUDA 图捕获失败 ([#39226](https://github.com/sgl-project/sglang/issues/39226))。*严重程度高；阻碍生产部署。*
- 🔴 **静默草稿拒绝**：量化后的 DFlash2 草稿 100% 静默被拒绝 —— 成功加载但无警告或错误提示 ([#39087](https://github.com/sgl-project/sglang/issues/39087))。*对推测解码可靠性至关重要。*
- 🟡 **客户端断连崩溃**：活跃请求期间客户端断连会导致完整引擎崩溃，因未捕获的 `asyncio.CancelledError` 跳过了 `except Exception` 处理 ([#39216](https://github.com/sgl-project/sglang/issues/39216))。*存在安全与可用性风险。*
- 🟡 **缓存不一致**：HiCacheFile 在所需辅助池无法恢复时仍报告混合前缀命中 ([#39147](https://github.com/sgl-project/sglang/issues/39147))。*可能导致输出错误。*

---

### **6. 对应用开发者的影响**  
- **避免使用 `--moe-runner-backend deep_gemm`**，直到 [#39226](https://github.com/sgl-project/sglang/issues/39226) 修复完成 —— 该选项将在 Blackwell GPU 上导致服务器崩溃。
- **若在 SM121 上使用 DeepSeek-V4.1，务必验证 FP8 量化正确性**；当前行为可能无声降低输出质量 ([#39193](https://github.com/sgl-project/sglang/issues/39193))。
- **仅在显式启用时使用 `vibecuda` 提供者** —— 当前虽已支持但非默认；请确保部署具备故障关闭的回退机制。
- **推测解码中使用量化 DFlash2 草稿时预期不稳定** —— 建议禁用或密切监控接受率。
- **更新客户端代码以优雅处理 `CancelledError` 异常**，因连接丢失时可能发生崩溃 ([#39216](https://github.com/sgl-project/sglang/issues/39216))。
- **监控 CI 测试状态** —— 多个回归（如 #36131、#39103）表明核心推理路径仍不稳定；生产环境建议使用稳定版本标签而非 `dev` 构建。

> 💡 *建议：在重大回归修复前，锁定到一个已知稳定的提交。实时关注 [问题 #17050](https://github.com/sgl-project/sglang/issues/17050) 获取 CI 健康状态更新。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-13**

---

### **1. 今日重点**  
最新更新聚焦于 GPU 后端（CUDA、Vulkan、ROCm）的关键稳定性修复，以及工具调用工作流中 JSON Schema 处理的改进。显著进展包括在 Jinja 模板中支持点号表示法的整数字面量（dot-notation integer literals），并完成了内部 JSON Schema 表示的大幅重构，以支持更健壮的语法生成。

---

### **2. 发布与破坏性变更**  
- **`b10934`**：引入 `common_schema` 作为 JSON Schema 的内部表示形式（#28736），替代原有的临时解析逻辑，提升类型解析能力。此为非破坏性变更，但可能影响依赖于 schema-to-grammar 转换的下游工具。  
  🔗 [PR #28736](https://github.com/ggml-org/llama.cpp/pull/28736)  
- **`b10933`**：在 Jinja 模板中新增对 `dot.property.integer` 语法的支持（例如 `{% set x = [1,2].0 %}`），修复了 Qwen3-Coder 等模型在工具调用解析中的不一致问题。  
  🔗 [PR #28817](https://github.com/ggml-org/llama.cpp/pull/28817)  
- **`b10931`**：UI 现已通过 `--cache` 标志添加缓存层，显著提升本地推理环境中重复请求的性能表现。  
  🔗 [PR #28802](https://github.com/ggml-org/llama.cpp/pull/28802)

---

### **3. 新模型与硬件支持**  
- **模型支持**：新增对 **ELMOD 2.7b** 的实验性支持，该模型为基于 GPTNeoX 架构的德语研究型模型，使用自定义分词器。  
  🔗 [PR #28818](https://github.com/ggml-org/llama.cpp/pull/28818)  
- **后端增强**：  
  - 为 `ggml-cuda` 后端添加 AMD GCN 特定的 HIP 配置（#27841）。  
  - Vulkan：为 Intel Arc GPU 添加 IQ3_S MMQ 矩阵乘核，避免在启用 `VK_KHR_cooperative_matrix` 时出现性能下降。  
    🔗 [PR #28822](https://github.com/ggml-org/llama.cpp/pull/28822)  
- **硬件特定优化**：  
  - Blackwell（sm_120）现强制对 IQ1_S/IQ2_XXS/XS/S/IQ3_XXS/S 量化版本回退至 cuBLAS，因原生内核存在正确性问题。  
    🔗 [PR #28823](https://github.com/ggml-org/llama.cpp/pull/28823)

---

### **4. 性能与优化**  
- **CUDA/Blackwell**：在 RDNA4（gfx1201）上，原生 MMA FA 内核导致提示处理速度下降高达 2 倍；建议禁用 `rocWMMA` 路径，直至稳定替代方案推出。  
  🔗 [Issue #26220](https://github.com/ggml-org/llama.cpp/issues/26220)  
- **RTX 5090 (sm_120)**：在 Linux 下，令牌生成仅达到约 28% 的内存带宽上限，远低于 RTX 4090 的 ~86% 水平；CUDA Graph 导致 GPU 假死（Xid 8，RC watchdog），可通过设置 `GGML_CUDA_DISABLE_GRAPHS=1` 解决。  
  🔗 [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)  
- **Vulkan**：在 RDNA3 平台，自 `b10780` 版本后提示处理速度明显下降，相关调查正在进行中。  
  🔗 [Issue #28752](https://github.com/ggml-org/llama.cpp/issues/28752)  
- **稀疏注意力**：通过 PR #28770 已在 Qwen4 中启用 —— 在采用全 KV 重评分机制的混合模型中，显著提升注意力效率。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|---------|------|-------------|------------|
| 严重 | [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) | CUDA Graph 导致 RTX 5090 假死（Xid 8，RC watchdog） | ✅ 临时解决方案：`GGML_CUDA_DISABLE_GRAPHS=1` |
| 高 | [#26220](https://github.com/ggml-org/llama.cpp/issues/26220) | 原生 MMA FA 内核导致 RDNA4 上提示处理速度下降 2 倍 | ⚠️ 回归问题；已移除 rocWMMA |
| 高 | [#28404](https://github.com/ggml-org/llama.cpp/issues/28404) | Windows 下两个共存的 `llama-server` 进程在重用 CUDA Graph 后崩溃 | ✅ 通过禁用 Graph 已修复 |
| 中 | [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) | Vulkan/RDNA3 平台在 `b10780` 之后提示处理速度下降 | 🔍 正在排查 |
| 中 | [#28813](https://github.com/ggml-org/llama.cpp/issues/28813) | 使用 `-np 3`（3 个并发请求）时持续出现 OOM 崩溃 | 🔍 正在排查内存泄漏 |

---

### **6. 对应用开发者的意义**  
- **工具调用可靠性**：在基于 Jinja 的工具接口（如 Qwen3-Coder）中，请使用 `b10933+` 版本以确保一致的 JSON Schema 解析；避免 `anyOf` 对象序列化缺陷。  
- **GPU 部署注意事项**：在 **RTX 5090 (sm_120)** 或 **RDNA4 (gfx1201)** 上部署时，务必禁用 CUDA Graph（`GGML_CUDA_DISABLE_GRAPHS=1`）以防止假死与崩溃。  
- **内存管理**：高并发场景（`-np > 2`）需谨慎对待——近期版本在重负载下存在 OOM 风险；请监控 `--cache` 使用情况。  
- **未来兼容性**：随着 `common_schema` 已正式引入，预计大模型网关与结构化输出验证之间的集成将更加紧密。若构建依赖 JSON Schema 驱动工具链的智能体，建议尽早升级。  

> 💡 **实用建议**：对于新显卡上的生产部署，推荐使用 `GGML_CUDA_DISABLE_GRAPHS=1` + `--cache`，直至后续优化落地。密切关注 `b10934+` 版本在智能体工作流中的 schema 相关改进。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-13**

---

### **1. 今日亮点**  
Ollama 生态系统在核心模型服务工作流方面持续趋于稳定，工程团队正集中精力修复工具调用、流式响应和上下文处理中的关键正确性与稳定性问题——尤其针对多模态及高上下文模型（如 Gemma 4 和 Qwen 3.8）。值得注意的是，多个 PR 已合并或提出，以解决在不同硬件（Jetson、ROCm、混合 GPU）上出现的静默截断、流式顺序错误和内存泄漏问题，表明对生产级部署鲁棒性的高度重视。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未发布新版本。但 **PR #18393**（[撤销内置代理](https://github.com/ollama/ollama/pull/18393)）已关闭，CLI 聊天界面已回退至此前状态。这可能影响依赖新代理驱动流程的用户；迁移说明待更新。此外，**PR #18409** 与 **#18386** 解决了一个长期存在的 Windows 卸载器漏洞：现在卸载时将从 `PATH` 中移除 Ollama 安装路径，防止残留环境变量。

---

### **3. 新模型与硬件支持**  
- **Gemma 4 多模态支持**：PR #16879（[统一视觉支持](https://github.com/ollama/ollama/pull/16879)）改进了基于 GGUF 的 Gemma 4 模型在独立多模态项目中元数据检测与能力报告。
- **ROCm 支持 gfx1151 集成显卡（Strix Halo）**：Issue #17847 指出 AMD 最新款集成显卡存在严重的 KV 缓存溢出问题。尽管尚未提交修复，但反映出社区对低端 ROCm 部署的兴趣日益增长。
- **Windows 桌面集成**：PR #18410 增加了 **AI Arena Lite** 到官方集成列表（[链接](https://github.com/ollama/ollama/pull/18410)），支持通过原生 Windows UI 实现多代理对话。

---

### **4. 性能与优化**  
- **上下文处理**：PR #17894（[保留最近用户消息](https://github.com/ollama/ollama/pull/17894)）解决了 Qwen 3.8 在工具循环中因上下文截断导致“未找到用户查询”错误的根本原因——提升了大上下文负载下的韧性。
- **工具调用解析**：PRs #18400 与 #18398（[解析含空格的键名](https://github.com/ollama/ollama/pull/18400) 及 [保留裸对象键名](https://github.com/ollama/ollama/pull/18398)）修复了 Gemma 4 工具模式中显示名称含空格时的 JSON 解析失败问题——对可靠代理工具使用至关重要。
- **内存效率**：PR #18407（[保留导入的 GGUF blob](https://github.com/ollama/ollama/pull/18407)）避免量化过程中的重复写入，降低 I/O 开销与磁盘占用。此外，PR #18416 报告 `--quantize` 后遗留 50GB 未追踪 blob，提示存在存储泄漏风险。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|--------|------|--------|--------|
| 严重 🔴 | **Qwen 3.8 在工具循环中因上下文截断缺失用户查询而崩溃** | 开放 (#17778) | ✅ [PR #17894](https://github.com/ollama/ollama/pull/17894) |
| 高 🔴 | **ROCm GPU 在请求间泄露 KV 状态（Strix Halo gfx1151）** | 开放 (#17847) | ❌ 尚无修复 |
| 高 🔴 | **Gemma 3:12b 结构化输出在双引号处过早截断** | 开放 (#18094) | ❌ 尚无修复 |
| 高 🔴 | **Jetson Orin Nano 在多模态投影器加载时发生 OOM** | 开放 (#18396) | ❌ 尚无修复 |
| 中等 🟡 | **Linux 混合显卡（Intel + RTX 4080）触发 SIGABRT 崩溃** | 开放 (#18412) | ❌ 尚无修复 |
| 中等 🟡 | **`web_search` 在推理完成前发出 function_call** | 开放 (#18411) | ✅ [PR #18413](https://github.com/ollama/ollama/pull/18413) |
| 中等 🟡 | **持续 `/api/embed` 负载下环回端口耗尽** | 开放 (#18392) | ❌ 尚无修复 |

> ⚠️ 多个回归问题涉及流式语义、内存管理与跨平台 GPU 驱动——凸显边缘场景下的脆弱性。

---

### **6. 对应用开发者的启示**  
- **避免在未验证的情况下于 Qwen 3.8 与 Gemma 4 上运行工具密集型代理**：这些模型在长上下文下易发生静默失败。建议使用 `OLLAMA_CONTEXT_SHIFT`（通过 PR #18399）主动拒绝过长提示。
- **验证工具调用格式**：确保模式键名不含空格，除非使用更新后的解析器（即 PR #18400/#18398 之后版本）。
- **警惕内存泄漏**：`--quantize` 命令会遗留未链接的 F16 blob（约 50GB）；如需手动清理，请检查 `~/.ollama/models/blobs`。
- **预期在 Jetson、ROCm 与混合 GPU 平台上的不稳定性**：这些平台仍属实验性质。建议在解决 OOM 与崩溃问题的 PR 落地前避免用于生产。
- **使用稳定的 API 模式**：流式响应可能提前发出 `function_call`（修复已在 PR #18413）。客户端应缓冲并逻辑重排序事件。

> 💡 **建议**：当前请锁定至 `0.34.0` 版本，关注上述链接中修复进展，并在存储问题解决前避免使用 `create --quantize`。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **1. 今日亮点**  
LiteLLM 持续演进，作为关键的推理与大模型网关基础设施，重点聚焦于 **API 兼容性**、**计费准确性** 和 **多智能体安全性**。主要进展包括修复 Anthropic `vector_store_ids` 验证错误、流式推理状态持久化，以及代理部署中增强 OpenTelemetry 跟踪功能。一项重大价格同步 PR（40919）更新了 5 家供应商共 278 个模型的价格，确保与上游厂商定价一致。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但有几项高影响变更待合并：
- **PR #40919** ([chore(prices)](https://github.com/BerriAI/litellm/pull/40919)) – 同步 5 家供应商共 278 个模型的价格；新增 34 个模型并更新源链接。将影响成本追踪与模型路由逻辑。
- **PR #40924** ([fix(ui)](https://github.com/BerriAI/litellm/pull/40924)) – 在“添加模型”提供商下拉菜单中新增腾讯 TokenHub，支持通过 UI 直接集成。
- **PR #40923** ([fix(mcp)](https://github.com/BerriAI/litellm/pull/40923)) – 强制对委派 OAuth 访问实施准入控制，提升基于 MCP 的智能体工作流安全性。

> ⚠️ *使用自托管 OpenAI 兼容后端或自定义模型计费的开发者应在部署前审查这些更新。*

---

### **3. 新模型与硬件支持**  
- **新增模型**：  
  - `deepseek-v4-flash`、`deepseek-vr-p4o`（通过 [Issue #30430](https://github.com/BerriAI/litellm/issues/30430)）  
  - GPT-Live API (`gpt-live-1`) 支持正在积极开发中（[Issue #40888](https://github.com/BerriAI/litellm/issues/40888)，[PR #40915](https://github.com/BerriAI/litellm/pull/40915)）  
  - OpenRouter 视频生成模型（待定 [Issue #27724](https://github.com/BerriAI/litellm/issues/27724)）

- **硬件/后端说明**：  
  今日未报告新增 GPU/CPU/Metal/ROCm 量化支持。但针对 **Bedrock 端到端测试可复现性** 的持续工作（[PR #40899](https://github.com/BerriAI/litellm/pull/40899)）提升了 AWS 优化推理路径的可靠性。

---

### **4. 性能与优化**  
- **延迟降低**：  
  - **PR #23544** ([Issue #23544](https://github.com/BerriAI/litellm/issues/23544))：缓存 HTTP MCP 服务器的 `list_tools` 响应，消除每次工具调用的冗余往返 —— 在多工具场景中降低约 50% 延迟。
- **计费准确性改进**：  
  - **PR #40627** ([fix(cost)](https://github.com/BerriAI/litellm/pull/40627))：修正缓存音频令牌的过度计费问题，应用正确的缓存读取费率（此前按 $32/M 全价计费）。
  - **PR #40915** ([fix(vertex-live)](https://github.com/BerriAI/litellm/pull/40915))：确保 Gemini Live 会话的端到端计费，修复每轮/每会话成本偏差问题。

> ✅ *这些变更显著提升成本可预测性，并减少长周期智能体工作流中的开销。*

---

### **5. 稳定性与回归问题**  
今日报告的顶级稳定性问题：

| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| [#23741](https://github.com/BerriAI/litellm/issues/23741): `AnthropicException 400` 由 `vector_store_ids` 导致 | 严重 | 开放 | [PR #23742](https://github.com/BerriAI/litellm/pull/23742)，[PR #30086](https://github.com/BerriAI/litellm/pull/30086) |
| [#40887](https://github.com/BerriAI/litellm/issues/40887): Responses-to-Chat 桥接中流式推理进度丢失 | 高 | 开放 | 无 |
| [#40851](https://github.com/BerriAI/litellm/issues/40851): spend 日志中 `session_id` 不匹配导致会话分组失败 | 中等 | 开放 | 无 |
| [#40651](https://github.com/BerriAI/litellm/issues/40651): `lite codex` 在子命令后传入 `-c` 参数时绕过代理 | 中等 | 开放 | 无 |

> 🔴 **严重回归**：`vector_store_ids` 验证失败导致 Anthropic 向量存储集成中断。依赖此功能的用户必须应用所列 PR 之一，或避免传递 `vector_store_ids`。

---

### **6. 对应用开发者的意义**  
- **对于智能体与多轮应用**：请确保未触发 `vector_store_ids` 问题（参见 #23741）；使用已合并修复的最新代理版本。谨慎启用 `enable_anthropic_prompt_caching` —— 可能干扰向量存储预调用（#40908）。
- **对于成本敏感部署**：近期价格同步（PR #40919）确保计费准确。请验证自定义定价是否被静默忽略（例如 OCR 模型默认为 $0 —— 参见 #36608）。
- **对于安全与可观测性**：通过 `@client` 包装器启用 OTel span（PR #30402）；旧版 MCP 路由现需准入控制（PR #40923）。
- **对于 UI 开发者**：预计新增提供商选项（腾讯）和增强日志记录（GCS 刷新失败现在会被记录 —— PR #40922）。建议考虑在日志中增加图像渲染支持（功能请求 #29877）。

> 💡 **行动项**：若使用 `/v1/responses`、`/v1/messages` 或自托管 OpenAI 兼容端点，请审查您的模型路由逻辑 —— 近期漏洞显示静默模式退化（如 #40780 中多模态丢失，#40854 中推理丢失）。

---  
*摘要生成时间：2026-09-13 | 来源：GitHub @ BerriAI/litellm*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **1. 今日亮点**  
Unsloth 持续强化其核心推理与训练栈，针对 GPU 内存管理、模型加载稳定性以及对新版 TRL 和 Hugging Face 库的兼容性进行了关键修复。主要进展包括修复了导致在 GPU 主机上训练失败的 Docker Studio 镜像重大回归问题，以及解决了模型卡片上传时命名不正确这一长期存在的问题。团队还在推进对 AMD ROCm 及新型量化后端（如 EXL3）的支持。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
然而，**PR #10825** ([fix: 停止在 GPU 主机上禁用 Unsloth 的 TRL 补丁](https://github.com/unslothai/unsloth/pull/10825)) 修复了 `unsloth/unsloth:latest` 中引入的一个破坏性变更，该问题因 `ENV UNSLOTH_ALLOW_CPU=1` 导致在配备 GPU 的机器上无法运行训练流程。此修复已恢复功能，使用 Docker Studio 运行训练任务的用户应立即应用该补丁。

此外，**PR #10836** ([fix: 停止在种子列导出时误报 ALL_COLUMNS_DROPPED](https://github.com/unslothai/unsloth/pull/10836)) 修正了数据配方中一个误导性的错误提示——即使保留了种子列，系统仍错误声称所有列均被丢弃。此举提升了微调流水线的用户体验清晰度。

---

### **3. 新模型与硬件支持**  
- ✅ **AMD ROCm 支持**：PR #10820 ([为 RDNA2–CDNA 添加 AMD ROCm 镜像](https://github.com/unslothai/unsloth/pull/10820)) 引入了官方 Docker 镜像以支持 AMD GPU（ROCm），使训练与推理可在 RDNA2 至 CDNA 架构上运行。这扩展了硬件覆盖范围，不再局限于仅支持 CUDA 的环境。
- 🔮 **EXL3 量化后端**：PR #7115 ([添加 EXL3 后端：2/3/4/6/8 位 + MoE 支持](https://github.com/unslothai/unsloth/pull/7115)) 引入实验性 ExLlamaV3 (EXL3) 作为量化选项，支持分数比特率及混合专家模型（如 Qwen、DeepSeek），而这些目前尚未被 bitsandbytes 支持。
- 📌 **Deepseek v4.1 Flash GGUF**：Issue #10838 ([请求：添加 Deepseek v4.1 flash GGUF](https://github.com/unslothai/unsloth/issues/10838)) 反映出对下一代模型支持的日益增长的需求。尽管尚未实现，但表明未来路线图将重点关注此方向。

---

### **4. 性能与优化**  
- ⚡ **Qwen3.5-9B LoRA SFT 加速**：PR #10744 ([性能优化：NVIDIA B200 上 Qwen3.5-9B LoRA SFT 从 0.85 秒降至 0.66 秒](https://github.com/unslothai/unsloth/pull/10744)) 报告在 NVIDIA B200 上通过 CPU 侧开销优化，每步训练时间减少约 **22%**（从 0.85 秒降至 0.66 秒）。识别出的瓶颈包括数据加载和预处理延迟，是后续调优的关键目标。
- 🔄 **提示处理进度可见性**：PR #10834 ([在 API 监控器中显示提示处理进度](https://github.com/unslothai/unsloth/pull/10834)) 通过在 GGUF 推理过程中实时更新状态（`提示处理 · N%`），增强了可观测性，有助于排查长延迟提示的问题。
- 💾 **图像模型资产下载控制**：PR #10789 ([在不加载的情况下下载图像模型资产](https://github.com/unslothai/unsloth/pull/10789)) 允许用户将模型依赖项单独下载，而不立即加载，从而在资源受限环境中更好地控制带宽与内存使用。

---

### **5. 稳定性与回归问题**  
⚠️ **高严重性**：  
- **GPU 主机上训练中断**：问题 #10825 由 `UNSLOTH_ALLOW_CPU=1` 引起，导致 Docker Studio 中关键 TRL 补丁被禁用。已在 PR #10825 中修复 —— *强烈建议立即更新*。  
- **模型加载崩溃**：问题 #10817 ([运行设置侧边栏静默冲突](https://github.com/unslothai/unsloth/issues/10817)) 报告两个编辑运行设置的面板之间存在 UI 不一致，导致静默数据丢失。影响桌面应用用户；在 Windows 11 + GGUF 通过 llama-server 上可复现。  
- **新建聊天时崩溃**：问题 #10288 ([tapClientLookup: 索引 1 超出范围](https://github.com/unslothai/unsloth/issues/10288)) 在点击“新建聊天”时引发随机崩溃——可能由于客户端查找逻辑中的状态处理不当所致。  

⚠️ **中等严重性**：  
- **MCP 截断 / 去重缺陷**：问题 #10839 ([MCP 调用系统性截断](https://github.com/unslothai/unsloth/issues/10839)) 与 #10379 ([禁用工具调用去重](https://github.com/unslothai/unsloth/issues/10379)) 指出工具执行保真度的重复问题，尤其在需要重复调用时（如编译命令）更为明显。  
- **AppImage 缺少依赖包**：问题 #10840 ([AppImage 缺少 hf_xet 包](https://github.com/unslothai/unsloth/issues/10840)) 导致无法下载大型模型（如 Qwen 3.8 Flash Next at Q5_K_XL）。需手动执行 `pip install hf_xet` 作为临时解决方案。

---

### **6. 对应用开发者的启示**  
- **若使用 Docker Studio，请立即升级**：若您在 GPU 主机上使用 `unsloth/unsloth:latest` 进行模型训练，请应用 **PR #10825** 的修复，否则训练将无声失败并抛出 `TypeError`。  
- **谨慎使用手动 GPU 内存模式**：`--fit` 日志错误（问题 #10821，已在 PR #10831 修复）可能误导开发者对实际内存分配的判断。请仔细监控实时日志。  
- **设计工具调用的幂等性**：由于去重机制过于激进（问题 #10379），除非显式关闭，否则不应依赖重复的相同工具调用。建议实现自定义重试逻辑或绕过前端去重层。  
- **规划多硬件部署方案**：随着 ROCm 镜像支持现已可用，开发者可构建跨平台代理系统，同时支持 NVIDIA 与 AMD GPU。使用 `docker pull unsloth/unsloth:rocm` 以启用 AMD 工作流。  
- **利用新图像模型控制功能**：使用“仅下载”选项（PR #10789）可在不占用 GPU 内存的前提下预先获取资产——非常适合 CI/CD 流水线与远程部署场景。

> 🔗 **关键链接**：  
> - [GPU 训练中断修复](https://github.com/unslothai/unsloth/pull/10825)  
> - [AMD ROCm 镜像](https://github.com/unslothai/unsloth/pull/10820)  
> - [EXL3 量化后端（实验性）](https://github.com/unslothai/unsloth/pull/7115)  
> - [数据配方修复](https://github.com/unslothai/unsloth/pull/10836)

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*