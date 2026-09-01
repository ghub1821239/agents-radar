# AI 基础设施日报 2026-09-01

> 生成时间: 2026-09-01 01:23 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-01**

---

### **1. 生态概览**  
2026年第三季度的AI推理与服务生态正快速向**高性能、多模型、跨硬件部署**收敛，对推测解码、结构化输出和原生代理工作流的关注度持续提升。各项目日益聚焦于**硬件多样性**——涵盖Intel XPU、AMD ROCm、Apple Silicon及华为NPU，同时积极应对MoE、视觉模型与长上下文模型中的深层稳定性问题。**分布式可扩展性**、**安全优先设计**以及**可观测性先行架构**的明显趋势，标志着生产级大语言模型基础设施的日趋成熟。

---

### **2. 活动对比**

| 项目       | 开放问题（高严重性） | 近24小时合并的PR | 发布状态 |
|------------|----------------------|------------------|----------|
| **vLLM**   | 18（4个关键）        | 7                | 稳定版（`v0.27.1`） |
| **SGLang** | 25（5个高严重性）     | 12               | 稳定版 |
| **llama.cpp** | 12（5个高严重性）   | 8                | 无新版本发布 |
| **Ollama** | 13（2个高严重性）     | 3                | 稳定版 |
| **LiteLLM** | 14（4个高严重性）    | 6                | 即将发布 `v1.99.0` |
| **Unsloth** | 12（3个高严重性）    | 5                | 稳定版 |

> ✅ *观察：* SGLang在活动量上领先，反映出其对分布式系统和新兴硬件的专注。vLLM保持最高稳定性且变更极少，而LiteLLM正为一次重大破坏性更新周期做准备。

---

### **3. 模型支持竞赛**

| 新模型 / 架构             | 支持项目                         | 备注 |
|----------------------------|----------------------------------|------|
| **Qwen3.8-Flash-Next**    | SGLang、llama.cpp、Unsloth（部分） | SGLang正在积极修复；llama.cpp通过`qwen4exp`支持；Unsloth尚未识别`qwen4exp` |
| **DeepSeek-V4-Pro (DSA/MLA)** | vLLM（Intel XPU）、SGLang         | vLLM在硬件特化支持方面领先（XPU + FP8卸载） |
| **GLM-5.3-Flash (glm5next)** | llama.cpp（文本/视觉）、SGLang    | llama.cpp实现完整集成；SGLang处于重基线后的稳定阶段 |
| **Kimi-K3/K2.6**          | vLLM                             | 唯一具备文档化工具调用修复的项目 |
| **Granite 4.1 (MLX)**     | Ollama                           | 仅实验性支持MLX后端 |
| **MXFP8/MXFP4 量化模型**  | vLLM、SGLang、llama.cpp、Ollama   | vLLM与SGLang在内核级优化上领先（如FlashInfer SM90、ROCm融合） |

> 🏆 **领先者：** **vLLM** 在模型种类与硬件覆盖上占优，尤其在Intel与NVIDIA平台表现突出。**SGLang** 在下一代解码图与分布式扩展的采纳速度上最快。

---

### **4. 性能前沿**

| 优化方向                 | 关键项目与亮点 |
|--------------------------|----------------|
| **KV缓存与前缀缓存**      | vLLM（混合GDN + MTP）、SGLang（HiCache L3）、llama.cpp（批处理scatter、O(log n)索引） |
| **推测解码**              | vLLM（DP同步重叠）、SGLang（窗口注意力）、llama.cpp（MOE融合） |
| **量化与融合内核**        | vLLM（FlashInfer SM90 MXFP4 x FP8）、SGLang（ROCm融合内核）、llama.cpp（radix TOP_K、FA-vec） |
| **分布式服务**            | SGLang（PD解耦、HiCache）、LiteLLM（团队级路由） |
| **内核级效率**            | vLLM（PTX 9.4 `ldmatrix.s8.s4`）、SGLang（813 GB/s ROCm带宽）、llama.cpp（XOR swizzle、Metal FA-vec） |

> 🔥 **前沿领头羊：** **vLLM** 在**内核级优化**与**推测解码成熟度**上占据主导地位，而**SGLang** 则在**分布式推理**与**硬件抽象**方面领先。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 核心差异化 |
|------------|------------------------------|------------|
| **vLLM**   | **服务引擎（推理）**         | 高吞吐、低延迟、GPU优化；适用于大规模部署 |
| **SGLang** | **分布式服务网关**           | 专为PD解耦、HiCache与多节点可扩展性设计 |
| **llama.cpp** | **本地运行时 / 边缘推理**  | 与CPU/GPU无关、轻量级，适合Apple Silicon与嵌入式设备 |
| **Ollama** | **开发者网关 / CLI工具**     | 用户友好、以GGUF为中心，本地开发体验优秀 |
| **LiteLLM** | **API网关 / 路由层**        | 多提供方路由、可观测性、企业级日志记录 |
| **Unsloth** | **代理平台 / 训练工具包**   | 安全沙箱、工具执行、面向用户体验的代理工作流 |

> 🎯 **战略洞察：** 该技术栈已清晰分层：**vLLM/SGLang** 负责核心推理，**llama.cpp/Ollama** 用于边缘/本地场景，**LiteLLM** 承担编排角色，**Unsloth** 则专注于安全的代理执行。

---

### **6. 趋势信号**

**从当前活动提取的关键行业趋势：**
- **硬件多样化已成为主流**：Intel XPU、AMD ROCm、Apple Silicon及华为NPU已不再是小众选择，所有项目均在积极支持。
- **MoE与视觉模型已进入生产就绪阶段**：尽管仍存在稳定性缺陷，DeepSeek-V4、GLM-5.3、Qwen3.8-Flash-Next等模型正被投入真实应用场景。
- **安全与隔离不可妥协**：Unsloth的系统级沙箱机制与LiteLLM的凭证传播修复表明，信任边界已在运行时强制实施。
- **结构化输出仍是瓶颈**：vLLM、SGLang与Ollama中持续存在的工具调用解析失败问题，表明这仍是代理应用中的高风险领域。
- **分布式系统正成为标准配置**：SGLang的HiCache、PD解耦与权重缓存守护进程，反映出向可扩展、内存高效的代理基础设施演进的趋势。

> ✅ **开发者行动指南：**
> - 使用 **vLLM** 实现基于GPU的高吞吐推理，并启用推测解码。
> - 选择 **SGLang** 处理需要HiCache或PD解耦的长上下文、分布式代理任务。
> - 在Apple Silicon或资源受限设备上优先选用 **llama.cpp**。
> - 使用 **Ollama** 进行基于GGUF模型的本地实验。
> - 将 **LiteLLM** 作为支持多提供方回退的企业级API网关部署。
> - 构建需沙箱执行的安全工具增强型代理时，使用 **Unsloth**。

> ⚠️ **关注清单：** 请持续监控所有平台上的 **Qwen3.8-Flash-Next** 稳定性，直至以下PR落地：#37322（SGLang）、#54630（vLLM）、#10015（Unsloth）。修复前避免投入生产环境。

---  
*数据来源：GitHub仓库（vllm-project/vllm、sgl-project/sglang、ggml-org/llama.cpp、ollama/ollama、BerriAI/litellm、unslothai/unsloth）*  
*报告生成时间：2026-09-01*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-01**

---

### **1. 今日亮点**  
vLLM 项目持续加速推进推测解码、结构化输出鲁棒性以及多后端支持。主要进展包括修复长序列下 MTP 推测解码崩溃问题（PR #54630），在混合 MTP + GDN 模型中显著提升前缀缓存利用率（PR #52244），以及针对 Qwen3、Gemma4、Kimi-K3 等多样模型家族的工具调用解析稳定性优化工作持续推进。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
无新版本发布，也无破坏性 API/配置变更。项目当前保持稳定于 `v0.27.1`，后续工作聚焦于功能对齐与正确性修复，而非版本升级。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4-Pro (DSA/MLA)** 通过 PR #54460 实现对 Intel XPU 的支持，可在 CPU offload 下启用 FP8 块缩放权重。
- **Qwen3-Next (GDN)** 在 V1 引擎上实现完整 `mamba_cache_mode="all"` 前缀缓存支持，并兼容 MTP 推测解码（PR #50172）。
- **FlashInfer SM90 MXFP4 x FP8 融合 MoE 后端** 新增支持 DeepSeek-V4 系列模型（PR #54032），可优化 SM90 GPU 上的推理性能。
- **Intel GPU (XPU)** 支持扩展：MXFP8 模型支持序列并行（PR #49303）、激活路由至 SYCL 内核（PR #53734），以及跳过不支持模型的 gsm8k 检查（PR #54010）。

> 🔗 [PR #54460](https://github.com/vllm-project/vllm/pull/54460) | [PR #50172](https://github.com/vllm-project/vllm/pull/50172) | [PR #54032](https://github.com/vllm-project/vllm/pull/54032)

---

### **4. 性能与优化**  
- **Triton 内核优化**：新增 top-p 掩码的分块行流水线，移除批大小门限（`batch >= 8`），提升小批量场景下的执行效率（PR #54651）。
- **MTP 推测解码**：草稿续写 DP 同步现已与预填充处理重叠（PR #54656），在高并发场景下有效减少空闲时间。
- **内核级优化**：
  - 采用 PTX 9.4 `ldmatrix.s8.s4` 用于 W4A8-INT8 路径（PR #49529），加速共享内存加载时的 INT4→INT8 扩展。
  - 集成 DeepGEMM NVFP4 MegaMoE 与融合 BF16 共享专家（PR #54520），显著提升大型 MoE 模型吞吐量。
- **KV 缓存**：在 MTP 推测解码下，混合 GDN 前缀缓存命中率已恢复（PR #52244），大幅提高重复提示的复用率。

> 🔗 [PR #54651](https://github.com/vllm-project/vllm/pull/54651) | [PR #54656](https://github.com/vllm-project/vllm/pull/54656) | [PR #49529](https://github.com/vllm-project/vllm/pull/49529) | [PR #54520](https://github.com/vllm-project/vllm/pull/54520)

---

### **5. 稳定性与回归问题**  
当前主要稳定性问题集中在**工具调用解析失败**、**结构化输出损坏**以及**CUDA 内存访问崩溃**：

- **严重崩溃**：在 sm_120 上使用 FlashInfer 注意力后端，配合 NVFP4 + FP8 KV 缓存时出现非法内存访问（PR #54225）。16 token 请求可复现；TRITON_ATTN 无此问题。*修复待定。*
- **工具调用回归**：启用 MTP 时，Qwen3.6-27B 工具调用失败（Issue #46249）；根源为解析器状态错位。
- **结构化输出缺陷**：
  - Gemma4 在并发场景下生成 `<pad>` token（Issue #39392）。
  - Qwen3.5 `thinking_token_budget` 存在 `reasoning_end_str` 泄露至 `content` 字段的问题（Issue #39697）。
- **模型特异性问题**：Kimi-K2.6 间歇性仅输出 `"!!!!!!!!!!"`，内容为空（Issue #42426），影响推理流水线。

> 🔗 [Issue #42426](https://github.com/vllm-project/vllm/issues/42426) | [Issue #46249](https://github.com/vllm-project/vllm/issues/46249) | [Issue #39392](https://github.com/vllm-project/vllm/issues/39392) | [Issue #54225](https://github.com/vllm-project/vllm/issues/54225)

---

### **6. 对应用开发者的影响**  
- **谨慎使用 MTP 推测解码**于 Qwen3.6-27B 及更新模型——确保使用 `v0.27.1+` 版本，若使用 NVFP4 + FP8 KV 缓存，请避免启用 `--moe-backend flashinfer_cutlass_humming`，直至 PR #54225 合并。
- **谨慎启用结构化输出**：对于 Qwen3.5 与 Gemma4，务必验证 `response_format` 与 `strict=false` 配置是否正确（PR #50544 已修复），尤其在流式工作流中。
- **充分利用新硬件支持**：Intel XPU 用户现在可运行 DeepSeek-V4-Pro 与 MXFP8 模型，支持序列并行与正确激活路由——适用于低延迟代理推理。
- **监控 GDN 模型的前缀缓存命中率**，搭配 MTP 使用；近期修复（PR #52244）提升了复用率，但需正确配置 `mamba_cache_mode`。
- **避免依赖确定性贪婪解码**：使用 Qwen3.8-Flash-Next 且提示长度接近 `indexer_budget` 时，即使 `temperature=0` 也可能出现非确定性行为（Issue #54521）。

> ✅ **可操作建议**：若构建带工具调用的代理系统，建议优先使用 `--tool-call-parser qwen3_coder` 而非自动工具选择，直到 Issue #39056 解决。

---  
*数据来源：[vllm-project/vllm GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 简报 – 2026-09-01**

---

### **1. 今日亮点**  
SGLang 生态系统持续加速推进**分布式推理可扩展性**，在**PD 分离统一化**、**HiCache L3 存储规划**以及**多模态/智能体工作负载优化**方面取得显著进展。值得注意的是，多个 PR 已合并或提交，重点修复 Qwen3.8-Flash-Next 与 MiniMax-M3 工具解析的关键稳定性问题；同时，统一缓存系统与 AMD/NPU 支持的新工作，预示着硬件生态的日益多样化。

---

### **2. 发布与破坏性变更**  
*无*  
过去 24 小时内未发布新版本。截至本日，无活跃的破坏性 API 或配置变更。

---

### **3. 新模型与硬件支持**  
- **Qwen3.8-Flash-Next**：因 `NEXTN` 解码图中存在 token ID 0 循环及静默输出损坏问题，正进行主动缺陷追踪（#36537, #37111）；通过 PR #37322（FP4 草稿保留）持续修复。
- **MiniMax-M3**：针对 MXFP8 量化与 MoE 融合的内核优化持续推进（#36575, #36574），包括逐 token 的 FP8+RMSNorm 融合，以及 BF16 FP8-GEMM 后端支持。
- **GLM-5.3-Flash**：重基线后稳定性正在提升（#37298），已修复视觉配置处理与 MTP 索引共享问题。
- **AMD ROCm (gfx950)**：新增 rope_cache 分组内核优化（PR #37315），在 gpt-oss 模型上实现 **2.15–2.5倍** 性能提升。
- **Ascend NPU A5**：RFC #21584 跟踪 MXFP8/MXFP4 支持，表明正早期拓展至华为生态。
- **Intel XPU**：每周启用 PR #37193 为 Intel GPU 后端添加基础模型支持。

---

### **4. 性能与优化**  
- **权重缓存守护进程**：第一阶段已上线（#27139），将 Qwen3-235B FP8 权重加载时间从 **约 306–327 秒降至 <1 秒**（[博客](https://www.lmsys.org/blog/2026-08-21-sglang-weight-cache-daemon)）。
- **ROCm 优化**：在 gfx950 上融合 `qk-rope + cache` 内核实现 **813 GB/s 带宽**，通过按 KV 组程序分组实现 **2.15–2.5倍** 性能提升（PR #37315）。
- **MoE 内核改进**：采用融合 MXFP8 量化的小批量排序路径，将每层开销降低约 7μs（PR #36559）；MoE all-reduce 融入下一层，提升流水线效率。
- **推测解码**：PR #32673 引入窗口注意力机制，用于内置 EAGLE/MTP 草稿，有效降低长前缀场景下的 KV 读取开销。

---

### **5. 稳定性与回归问题**  
*今日报告高严重性问题：*
1. **CUDA 核心转储追踪器** (#26340)：CI 自动收集核心转储 —— 269 条评论，尚未定位根本原因。对生产崩溃调试至关重要。
2. **Qwen3.8-Flash-Next 静默损坏** (#37111)：在 GB10 TP2 上使用 `QSA + NEXTN` 解码图时输出静默损坏 —— 对智能体工作流风险极高。
3. **HiCache 预取死锁** (#30760)：当 TP=4 且未设置 PP 时，`check_prefetch_progress` 导致死锁，引发服务挂起。
4. **DFLASH 推测解码崩溃** (#36140)：在 PD 分离模式下解码运行（`--disaggregation-mode decode`）时崩溃，原因为缺失 spec_info 连接。
5. **统一缓存默认翻转回归** (#36131)：在 PR #34653 后，Spark 与 Thor 上长前缀解码吞吐量显著下降。

> ✅ *修复中*：PR #37322 修复 Deepseek NextN 模型草稿加载失败；PR #37316 修复请求状态泄漏与解码预分配超时问题。

---

### **6. 对应用开发者的启示**  
- **在 PR #37322 合并前，请避免使用 Qwen3.8-Flash-Next 的 `NEXTN` 解码** —— 存在静默损坏风险，危及数据完整性。
- **谨慎使用 `--disaggregation-mode decode`** —— DFLASH 推测解码仍不支持；仅建议搭配 DSPARK/EAGLE 后端使用。
- **利用 HiCache 与分布式 KV 缓存路线图** (#21846, #28874)，适用于需低内存占用的长上下文智能体应用。
- **关注 CI 健康状况** —— 近期存在 11 个不稳定测试，相关失败已在 #17050 中追踪，可能影响部署可靠性。
- **期待更快的启动速度**：得益于新推出的权重缓存守护进程，适合多模型、高可用部署场景。

👉 [加入 Slack](https://slack.sglang.ai/) 以获取实时进展更新。  
🔗 完整问题追踪：[sgl-project/sglang Issues](https://github.com/sgl-project/sglang/issues)  
🔗 最新 PR 列表：[sgl-project/sglang PRs](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 摘要 – 2026-09-01**

---

### **1. 今日亮点**  
最新更新聚焦于 Apple Silicon（M1/M1 Ultra）及 NVIDIA/AMD GPU 后端的深度性能优化，关键在 Flash Attention 和 KV 缓存处理的内核级改进。值得注意的是，Metal 现已为 M1 Ultra 增加专用 FA-vec 调优；CUDA 与 ROCm 则针对 MOE 融合和 TOP_K 可扩展性进行了定向修复——对 DeepSeek-V4-Flash 等大上下文模型影响尤为显著。

---

### **2. 发布与破坏性变更**  
今日无新标签发布。但以下 PR 引入了需关注的行为变更：  
- **PR #28130** (`qwen4exp`: 基于 gather 的稀疏注意力) — 重构 QSA 解码路径；若使用 `--cache-disk` 或 `--split-mode`，可能影响输出一致性。[GitHub](https://github.com/ggml-org/llama.cpp/pull/28130)  
- **PR #28129** (`cuda`: 通过 argsort 分派批量 top-k) — 以统一路径替代每行的 `DeviceTopK`；在高吞吐预填充场景中可能改变时序表现。[GitHub](https://github.com/ggml-org/llama.cpp/pull/28129)  

> ✅ *注：这些变更非破坏性，但可能需要重新测试推测解码与长上下文负载。*

---

### **3. 新模型与硬件支持**  
- **新增模型**:  
  - 通过 PR #28133 新增对 **DeepSeek-V4-Flash-Vision-Exp**（文本 + 视觉）的支持。[GitHub](https://github.com/ggml-org/llama.cpp/pull/28133)  
  - 新增 **GLM-5.3-Flash (glm5next)** — 321B 混合 MoE 模型，采用 KDA 线性 + DSA 稀疏注意力。多个 PR (#27754, #27752, #27773) 涵盖文本与视觉分支。[GitHub](https://github.com/ggml-org/llama.cpp/pull/27754)  
- **硬件后端**:  
  - **Metal**: 已添加对 **M1 Ultra** 的完整 FA-vec 调优（PR #28088）。  
  - **ROCm**: 为长行增加基于基数的 TOP_K 优化（PR #27466）。  
  - **OpenCL**: 针对 Intel Xe-LP GPU 优化量化路径（Q4_K/Q5_K），TG/PP 提升最高达 2 倍（PR #26438）。  
  - **WebGPU**: 修复偏移非 4 的倍数时的崩溃问题（PR #28045）。  

---

### **4. 性能与优化**  
- **Metal（Apple Silicon）**:  
  - M1 Ultra 的 FA-vec 内核在 Flash Attention 吞吐量上展现可测量提升（具体数值待基准测试）。  
  - M1 专属 FA-vec 调优已移入独立章节以增强清晰度。  
- **CUDA**:  
  - XOR swizzle flash attn K,V smem fp16 tile 改进内存合并（PR #25635）。  
  - 将 MOE 融合扩展至 specdec 与 topk-router，支持多标记并行（PR #27621）。  
- **ROCm**:  
  - 基数 TOP_K 降低长行（>1024 列）的开销；缓解了 #26399 中出现的回归问题。  
- **KV 缓存**:  
  - 非连续恢复期间批量散列读取（PR #27991）减少碎片化环形缓冲区延迟。  
  - 为 `get_prev_tokens()` 中 `(seq, pos)` 单元建立索引，实现 O(log n) 查找（PR #27992），专攻 qwen4exp 解码瓶颈。  

> 📈 *预期影响：在支持硬件上，对 Qwen3.8-Flash-Next 与 DeepSeek-V4-Flash 实现 100K+ 上下文时解码速度提升 1.5–3 倍。*

---

### **5. 稳定性与回归问题**  
今日报告多项关键稳定性问题：  
1. **SYCL 在 Intel Arc A770/B70 上崩溃**（PR #27063）：持续负载下完全运行时失败。可能与主机固定内存管理相关（参见 #27038）。  
2. **Vulkan GATED_DELTA_NET 管道挂起** 在 gfx1103（RADV 780M）上 — 服务无法启动（问题 #27998）。  
3. **ROCm TOP_K 崩溃** 当 `ncols > 1024` 时，由 bitonic 内核块大小溢出导致（问题 #27021）。  
4. **SYCL 多 GPU 崩溃** 使用 B50+B70 组合时（问题 #27888）。  
5. **CUDA Blackwell (sm_100) 解码挂起** 与 Qwen3.8-27B-NVFP4（问题 #27329）——CPU 自旋，无 GPU 活动。  

> 🔴 *严重性*：高 —— 全部影响生产部署可用性。目前尚无修复 PR，但已有多个正在积极调查。

---

### **6. 对应用开发者的意义**  
- **谨慎使用 SYCL 与多 GPU 配置** —— 当前构建在负载下于 Intel Arc 显卡上不稳定。生产环境请等待 #27063 与 #27888 修复后再启用。  
- **充分利用新模型支持**：在代理工作流中集成 GLM-5.3-Flash 与 DeepSeek-V4-Flash-Vision；确保使用 `NVIDIA_TF32_OVERRIDE=0` 以获得正确输出。  
- **优化大上下文场景**：新 `kv-cache` 索引（PR #27992）与批量恢复（PR #27991）将显著提升长运行 LLM 代理性能。  
- **关注即将变更的端口**：`llama-server` 默认端口将从 `8080` 迁移至 `9931`（GGML 的莱特语拼写）——请相应更新配置（PR #26508）。  
- **准备迎接 Web UI 升级**：Hugging Face Hub 集成与模型兼容性估算（PRs #27947, #27957）即将上线，助力更佳模型发现与部署规划。

> 💡 *实用提示*：在 Apple Silicon 上获取最佳性能，请配合 M1/M1 Ultra 使用 `--metal-fa-vec`。在 ROCm 平台，除非 #27021 修复，否则避免设置 `--ctx-size > 131072`。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-01**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展对高级多模态及 MoE（专家混合）模型的支持，目前正推进 MLX 与 ROCm 后端的关键稳定性修复。在 v0.32.15 至 v0.33.0 之间报告了一个高优先级回归问题，影响 Windows 系统上 NVIDIA GPU 驱动的稳定性（VIDEO_TDR_TIMEOUT_DETECTED），导致多轮推理工作流异常。与此同时，`mlxrunner` 与 GGUF 兼容性的持续优化旨在提升跨多种硬件配置下的可靠性。

---

### **2. 发布与破坏性变更**  
*无* — 近 24 小时内未发布新版本或破坏性变更。但建议用户关注 [PR #18156](https://github.com/ollama/ollama/pull/18156) 与 [PR #18157](https://github.com/ollama/ollama/pull/18157)，它们将解决 MLX runner 行为及依赖项卫生问题，为后续更新做好准备。

---

### **3. 新模型与硬件支持**  
- **新模型支持**：实验性 MLX 后端现通过 [PR #17972](https://github.com/ollama/ollama/pull/17972) 支持 `GraniteForCausalLM` 架构，可使用 IBM 的 Granite 4.1 系列模型。  
- **硬件/后端支持**：  
  - 由于在混合 GPU 架构（`gfx1200 + gfx1201`）上出现崩溃，AMD ROCm 对 MoE 模型的支持正在积极排查中 —— 参见 [Issue #18162](https://github.com/ollama/ollama/issues/18162)。  
  - MLX runner 在理论上已支持 `qwen3-vl` 及其他具备视频处理能力的模型，但尚无输入机制 —— [Issue #18151](https://github.com/ollama/ollama/issues/18151) 呼吁集成视频输入功能。  
- **量化**：分裂式 GGUF 量化（如 `UD-Q4_K_XL`）仍存在验证问题 —— 参见 [Issue #18146](https://github.com/ollama/ollama/issues/18146)。

---

### **4. 性能与优化**  
- **内存效率**：MLX runner 每请求约增加 0.147 GiB 常驻内存，最终趋于稳定在 ~28.5 GiB —— 此为已知内存泄漏，详见 [Issue #17924](https://github.com/ollama/ollama/issues/17924)。  
- **缓存指标**：服务器现已通过 `/api/generate`、`/api/chat` 及 OpenAI 兼容接口报告缓存提示词标记数（[PR #16916](https://github.com/ollama/ollama/pull/16916)、[PR #17943](https://github.com/ollama/ollama/pull/17943)）—— 提升成本感知推理的可观测性。  
- **构建优化**：如 [PR #18159](https://github.com/ollama/ollama/pull/18159) 等 PR 目标在于减少冗余许可证文件重复，有望缩小镜像体积。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|------|----------|
| 🔴 高 | [Issue #18152](https://github.com/ollama/ollama/issues/18152) | Windows + NVIDIA 环境下，从单轮切换至多轮请求时触发 GPU 驱动崩溃（VIDEO_TDR_TIMEOUT_DETECTED）——v0.32.15 至 v0.33.0 的回归问题 | ❌ 尚无修复 PR；紧急 |
| 🔴 高 | [Issue #18162](https://github.com/ollama/ollama/issues/18162) | 混合 AMD GPU 架构（gfx1200 + gfx1201）上 MoE 模型因 ROCm 内核镜像不匹配而崩溃 | ❌ 尚无修复 PR |
| 🟡 中 | [Issue #17778](https://github.com/ollama/ollama/issues/17778) | Qwen 3.8 在聊天流式输出中失败：“消息中未找到用户查询”（500 错误） | ⚠️ 已定位部分根本原因；工具调用上下文处理问题 |
| 🟡 中 | [Issue #14493](https://github.com/ollama/ollama/issues/14493) | Qwen 3.5 27B：工具调用功能失效，重复惩罚被忽略 | ⚠️ 正在调查中 |
| 🟡 中 | [Issue #17587](https://github.com/ollama/ollama/issues/17587) | Qwen2.5-3B GGUF 在中文输入时（仅 CPU）输出垃圾 ASCII 标记 | ⚠️ Windows 上分词器误识别 |

---

### **6. 对应用开发者的启示**  
- **若使用多轮或长上下文工作流，请避免在 Windows + NVIDIA 系统上使用 v0.33.0** —— 建议降级至 v0.32.15，直至 [Issue #18152](https://github.com/ollama/ollama/issues/18152) 解决。  
- **在生产环境中，请勿依赖 Qwen 3.5/3.8 的工具调用功能**，直到 [Issue #14493](https://github.com/ollama/ollama/issues/14493) 与 [Issue #17778](https://github.com/ollama/ollama/issues/17778) 修复。  
- **当 Gemma 4 视觉模型暴露 `max_soft_tokens` 参数后，请立即使用** —— 当前该参数为硬编码；请追踪 [Issue #15626](https://github.com/ollama/ollama/issues/15626)。  
- **通过新的 `/metrics` 接口及响应字段监控缓存指标** —— 对成本控制与性能调优至关重要。  
- **注意分裂式 GGUF 的限制**：在 [Issue #18146](https://github.com/ollama/ollama/issues/18146) 解决前，请避免导入 unsloth 量化后的 `Qwen3.8-Flash-Next` 模型。  
- **若带宽受限，可考虑使用纯 CPU 构建版本** —— [Issue #14228](https://github.com/ollama/ollama/issues/14228) 显现出对无 CUDA 包的需求。

> ✅ *建议*：在 ROCm/MoE 问题修复前，非 NVIDIA 系统上的稳定推理推荐使用 `--platform=cpu` 或 `--platform=mlx`。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-09-01**

---

### **1. 今日重点**  
LiteLLM 项目持续强化企业级可观测性与路由能力，关键 PR 实现了在透传端点上支持团队级别的日志回调，并修复了 `/v2/team/list` 中模型别名的可见性问题。稳定性方面，重点解决了 `request_timeout` 处理中的静默失败问题，并改进了向量存储和 MCP 集成中凭据的传播机制。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，即将推出的 `v1.99.0` 版本中将包含若干破坏性变更：  
- **Docker 镜像中固定 Python 3.13**（PR #39048）可能影响依赖预构建镜像的用户；请确保与 `uvloop` 及其他 C 扩展兼容。  
- **凭据处理优化**（PRs #39045, #39005）现在即使未选择凭据，也会在 UI 参数中保留 `litellm_credential_name` —— 这一行为变化可能影响下游工具对空值的预期。  
- **运行时注册的回调**将出现在 UI 日志页面中（PR #38974），提升自定义可观测性配置的透明度。

> 🔗 [PR #39048](https://github.com/BerriAI/litellm/pull/39048) | [PR #39045](https://github.com/BerriAI/litellm/pull/39045) | [PR #38974](https://github.com/BerriAI/litellm/pull/38974)

---

### **3. 新模型与硬件支持**  
- **通过 PR #39039 增加 Milvus gRPC 支持**，为仅支持 gRPC 的 Milvus 部署提供安全、高吞吐的向量搜索能力。  
- **OpenAI 工作负载身份联合（OIDC）支持** 正在开发中（Issue #31649），将实现云原生环境下的无缝认证，无需直接管理 API 密钥。

> 🔗 [PR #39039](https://github.com/BerriAI/litellm/pull/39039) | [Issue #31649](https://github.com/BerriAI/litellm/issues/31649)

---

### **4. 性能与优化**  
- **基于马尔可夫模型的动态令牌成本套利** 被提出（Issue #31555），旨在根据实时成本、延迟和成功率指标动态优化提供商选择——在多提供商场景下，有望降低高达 30% 的推理成本。  
- **UI 流程的端到端测试自动化**（PR #39025）将降低回归风险，提升发布速度，间接增强各环境间的性能一致性。  
- **Rust 互操作重构**（PR #39026）旨在减少 Python 到 Rust 的桥接开销，改善混合应用的启动时间。

> 🔗 [Issue #31555](https://github.com/BerriAI/litellm/issues/31555) | [PR #39025](https://github.com/BerriAI/litellm/pull/39025) | [PR #39026](https://github.com/BerriAI/litellm/pull/39026)

---

### **5. 稳定性与回归问题**  
今日主要稳定性问题：  
1. **`request_timeout` 在静默上游不触发**（Issue #38358）：向一个接受 TCP 但永不发送数据的上游发起流式请求将无限挂起。*修复待定*——这是生产代理的关键可靠性问题。  
2. **Bedrock 请求头缺失于 `_hidden_params.additional_headers`**（Issue #38357）：AWS `x-amzn-RequestId` 等元数据在调用过程中丢失，阻碍调试与审计追踪。*修复 PR 正在审查中*。  
3. **Gemini 推理内容泄露至 output_text**（Issue #36929）：当 `reasoning.effort=medium|high` 时，非 JSON 内容出现在 `output_text`，破坏严格 `json_schema` 解析。*对结构化输出应用为高严重性*。  
4. **模型访问组信息泄露至 `/v1/models`**（Issue #25550）：不存在的模型仍暴露访问组名称，导致内部策略信息外泄。*修复 PR 待定*。

> 🔗 [Issue #38358](https://github.com/BerriAI/litellm/issues/38358) | [Issue #38357](https://github.com/BerriAI/litellm/issues/38357) | [Issue #36929](https://github.com/BerriAI/litellm/issues/36929) | [Issue #25550](https://github.com/BerriAI/litellm/issues/25550)

---

### **6. 对应用开发者的影响**  
- **谨慎使用 `litellm_credential_name`**：最新 UI 变更意味着即使未选凭据，凭据名称也会被保留——请验证你的逻辑对回退行为的处理是否正确。  
- **监控超时与上游静默状态**：若使用长周期或流式请求，请确保 `request_timeout` 配置并测试到位，因其在静默后端可能不会触发。  
- **尽早启用团队级可观测性**：如今透传路由已支持团队级别日志回调（PR #38979），可在不重复配置的前提下，跨团队强制统一监控策略。  
- **避免使用不受信任的模型别名**：`/v1/models` 响应泄露（Issue #25550）暴露访问策略——生产环境中避免公开此端点。  
- **规划 OIDC 与 gRPC 迁移**：为未来做好准备，提前部署 OpenAI 工作负载身份（Issue #31649）和 Milvus gRPC（PR #39039）。

> ✅ 小贴士：在升级前，使用新的自动化 UI 测试（PR #39025）验证你自己的部署流程。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-01**

---

### **1. 今日亮点**  
Unsloth 项目持续快速演进，重点聚焦于 **安全强化**、**多模型兼容性** 和 **跨平台稳定性**。关键进展包括引入操作系统级别的沙箱机制用于工具执行（通过 bubblewrap/Seatbelt），对 AMD ROCm GPU 支持的关键修复（含 BF16 检测问题和训练崩溃），以及在 GGUF、MLX 和 Ollama 集成中持续优化模型加载稳定性。新提交的 PR 增加了瑞典语本地化支持，表明全球可用性扩展仍在持续推进。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
未发布新版本或破坏性 API/配置变更。代码库保持稳定，持续改进 CI/CD、安全性和用户体验。

---

### **3. 新模型与硬件支持**  
- **Qwen3.8-Flash-Next-GGUF**：尚未支持，因 `qwen4exp` 架构未被 `llama.cpp` 识别 —— 问题 #10015 仍开放。  
- **MLX 模型**：实际上下文长度现在基于模型配置获取（PR #8125），解决了硬编码的 4096 标记限制。  
- **AMD ROCm (gfx1032/gfx1200/gfx1201)**：关键修复已合并（#7682, #8791），解决 BF16 误报及训练期间 GPU 选择失败问题。  
- **Ollama 集成**：模式处理错误和 `source` 标签不正确问题依然存在（#9986）；多个 PR 正在推进统一库存栈（#10051）。  
- **Deepseek 与 Qwen**：桌面端与 Studio 上出现模型加载问题；回归追踪正在进行中。

---

### **4. 性能与优化**  
- **内存效率**：Studio 现在通过 `nvidia-smi` 报告实际可见的 GPU，而非仅依赖 PyTorch 检测到的设备（PR #9858）。  
- **内核优化**：在 AMD gfx1200 上，视频推理期间 SDPA 回退至数学内核导致内存飙升达 66.54 GiB（问题 #8225）。修复需依赖 flash attention 或内存高效内核。  
- **提示缓存**：由于 `ArraysCache` 布局不匹配，MLX 提示缓存无法在 Qwen3.8-27B 上重用（问题 #10031）。  
- **推理速度**：正在优化 `llama.cpp` 集成，实现对 `--fit-target` 的正确控制（PR #4882）。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 相关 PR |
|--------|------|--------|--------------|
| 🔴 高 | **Studio 在并发数据库访问下发生 SQLite 死锁** → 后端无响应 | 开放 (#10022) | N/A |
| 🔴 高 | **工具调用参数被拼接为格式错误的 JSON 字符串** → 线程回放中触发 400 错误 | 已关闭 (#9807) | 内部构建已修复 |
| 🔴 高 | **AMD gfx1032 训练崩溃**，由虚假的 `bf16` 支持引起 | 开放 (#7922) | 通过 PR #7682 修复 |
| 🟡 中 | **Ollama 模型被错误标记并从库存中排除** | 开放 (#9986) | 进行中 |
| 🟡 中 | **Deepseek 模型触发意外下载** | 开放 (#10047) | N/A |
| 🟡 中 | **CI 中间歇性出现多轮推理确定性失败** | 开放 (#10004) | N/A |

> *注：多个回归问题与平台特定行为（ROCm、Windows、macOS）相关，表明跨平台测试正在积极进行。*

---

### **6. 对应用开发者的影响**  
- **安全性**：使用 `bubblewrap`/`Seatbelt`（PR #7101）意味着基于 LLM 的工具现在运行在隔离沙箱中——非常适合生产环境代理。但请确认自定义工具脚本不依赖系统级访问权限。  
- **模型可移植性**：预计与 `llama.cpp` 及 Ollama 的集成将更紧密，但在 `qwen4exp` 和 `mlx` 上下文长度修复落地前，请手动验证模型兼容性。  
- **GPU 可靠性**：若在 AMD ROCm（特别是 gfx1032）上部署，请确保使用最新版 `unsloth` + `torch` 构建，并应用 PR #7682 以避免无声的 BF16 崩溃。  
- **开发者体验**：如 **聊天内搜索**（#10036）、**Markdown 格式支持**（#10067）、**VS Code 集成**（#10052）等特性请求，表明对更丰富用户界面的需求日益增长——若开发代理工作流，可考虑参与贡献。  
- **部署方案**：新加入的 `--lan-port` 设置（PR #10082）支持可预测的局域网访问；在无头部署中应优先使用该设置，而非依赖自动分配端口。

👉 [查看问题](https://github.com/unslothai/unsloth/issues) | [查看拉取请求](https://github.com/unslothai/unsloth/pulls)

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*