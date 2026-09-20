# AI 基础设施日报 2026-09-20

> 生成时间: 2026-09-20 00:21 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-09-20**

---

### **1. 生态概览**  
2026年9月，AI 推理基础设施格局正迅速向混合式、多模态及推测性解码工作负载收敛，由 GLM-5.3-Flash、Qwen3-VL、Ling 3.0 及 FastMTP 变体等新一代模型驱动。各项目愈发聚焦于大规模性能表现——尤其是 MoE、长上下文与视觉语言模型场景——同时面临 CUDA 图、内存损坏及分布式协调等方面的系统性稳定性问题。一个清晰的分叉正在形成：高性能服务引擎（vLLM、SGLang）在优化上持续突破边界，而本地运行时（llama.cpp、Unsloth）则更强调跨硬件平台的可移植性与低延迟部署。

---

### **2. 活跃度对比**

| 项目       | 开放问题 | 今日合并的 PR | 最近发布？ | 备注 |
|---------------|-------------|---------------------|------------------|-------|
| **vLLM**      | 87          | 12                  | ✅ `v0.28.1rc1.dev580+g385dce36b` | 稳定版本；重点推进推测性解码与 CUDA 图稳定性 |
| **SGLang**    | 114         | 10                  | ✅ v0.5.20       | FlashInfer + MoE 存在高严重性回归；核心路由重构中 |
| **llama.cpp** | 109         | 9                   | ❌ 无新标签     | 关键 GPU 后端漏洞（ROCm、CUDA）；CPU/Metal/SYCL 支持强劲 |
| **Ollama**    | 167         | 7                   | ❌ 无新标签     | 高严重性 CUDA 崩溃；`0.34.2` 版本引入破坏性 API 变更 |
| **LiteLLM**   | 135         | 8                   | ❌ 无新标签     | 聚焦桥接完整性、成本追踪与流式处理修复 |
| **Unsloth**   | 122         | 6                   | ❌ 无新标签     | 多个模型加载回归；Windows/Linux 性能差距明显 |

> *注：问题数为截至 2026-09-20 UTC 的 GitHub 开放问题数量。PR 活动反映活跃开发，但未必代表稳定。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash (FP8 MoE, KDA)**     | ✅ 实验性 CPU 通过 KDA | ✅ 预览（DSA + Mamba） | ✅ 完整解析器 | ⚠️ MTP 回归 | ❌ | ⚠️ MTP 加载崩溃 |
| **Qwen3-VL / Kimi K2.5 (多模态)**    | 🟡 部分 ViT CUDA 图 | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Ling 3.0 (Bailing V3)**            | ❌ | ❌ | ✅ 完整解析器 | ❌ | ❌ | ❌ |
| **Qwen3.5/3.8 FastMTP (d2t 词汇表)**  | ❌ | ⚠️ 开发中 | ⚠️ d2t 崩溃 | ⚠️ 回归 | ❌ | ⚠️ 加载中止 |
| **EXL3 (ExLlamaV3) 后端**         | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ 开发中 |
| **ROCm + MI300X/MI355X 混合精度** | ✅ mxfp4 + fp8 | ⚠️ 性能损耗 | ⚠️ 受限 Delta Net Bug | ✅ 提出双运行时方案 | ❌ | ✅ Docker 镜像增强 |

> ✅ **领先者**：  
> - **llama.cpp** 在原始模型覆盖率上领先（尤其对 Ling 3.0）  
> - **Unsloth** 在实验性后端（EXL3）方面领先  
> - **vLLM** 在多模态就绪度与混合量化方面领先

---

### **4. 性能前沿**

| 优化重点               | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-----------------------------------|------|--------|-----------|--------|---------|---------|
| **KV 缓存管理**           | ✅ 全量 CUDA 图（ViT） | ✅ HiCache 阶段缓存 | ⚠️ 锁定内存问题 | ⚠️ MTP 回归 | ✅ 提示词缓存 UI | ❌ |
| **批处理与预填充优化**| ✅ 仅预填充批处理逻辑 | ✅ PD 流水线共享 | ❌ | ❌ | ❌ | ❌ |
| **量化效率**       | ✅ 混合精度（ROCm） | ✅ MLA 去重 | ✅ NEON 向量化 | ⚠️ MXFP4 崩溃 | ❌ | ✅ EXL3 后端 |
| **分布式服务**           | ✅ 推测性解码（PIECEWISE） | ✅ PD + 分离解码 | ❌ | ❌ | ❌ | ❌ |
| **内核级优化**     | ✅ FlashInfer 自调优 | ✅ TMA 阶段传输 | ✅ CUDA BF16 调优 | ❌ | ❌ | ❌ |

> 🔥 **前沿领导者**：  
> - **vLLM** 在全规模 CUDA 图集成与推测性解码效率上占据主导  
> - **SGLang** 在分布式系统设计（HiCache、阶段写入）方面领先  
> - **llama.cpp** 在底层内核优化（CPU NEON、Metal、SYCL）方面表现卓越

---

### **5. 层级定位**

| 项目       | 主要层级                     | 核心差异化 |
|---------------|------------------------------------|--------------------|
| **vLLM**      | **高性能服务引擎** | 针对云规模推理、MoE、推测性解码及多模态流水线优化 |
| **SGLang**    | **分布式推理框架** | 先进路由、会话感知准入、缓存感知调度、分离解码 |
| **llama.cpp** | **本地运行时 / 边缘推理** | 跨平台、轻量、支持 CPU/GPU/Metal/SYCL —— 适合边缘与代理系统 |
| **Ollama**    | **开发者导向网关与 CLI** | 简化模型管理、兼容 OpenAI API、支持 MLX/ROCm 双后端 |
| **LiteLLM**   | **API 网关与编排层** | 跨供应商统一接口、成本追踪、提示词缓存、MCP 安全性 |
| **Unsloth**   | **以代理为中心的本地运行时** | Studio UI、多模型常驻、WSL2/ROCm 工具链 —— 专为开发团队打造 |

> 📊 **战略洞察**：该技术栈正演变为分层架构：  
> - **引擎**（vLLM/SGLang）→ **网关**（LiteLLM/Ollama）→ **运行时**（llama.cpp/Unsloth）→ **代理平台**（Unsloth Studio）

---

### **6. 趋势信号**

#### **观察到的关键行业趋势**：
1. **推测性解码趋于成熟但仍不稳定**  
   - vLLM 与 SGLang 正推进分布式推测性解码，但多个关键崩溃（DFlash2、MoE 专家并行）表明其在生产环境仍脆弱。  
   - 开发者应**将推测性解码限制在短上下文场景**，并密切监控状态损坏风险。

2. **混合量化与 MoE 模型已成为主流**  
   - 所有主要项目均已支持 FP8/MXFP4、MoE 与 DSA/KDA 混合架构。然而，**使用 ROCm 的用户除非启用 `AITER`，否则面临 3.7 倍延迟惩罚**，反映出持续存在的硬件特异性瓶颈。

3. **本地运行时正演变为代理平台**  
   - Unsloth Studio 与 llama.cpp 对 Ling 3.0 的支持，标志着从“推理引擎”向“代理执行环境”的转变。  
   - 未来将主导边缘推理的将是**多模型并发**、**设备端推理**与**基于 UI 的编排**。

4. **API 网关正演变为安全与可观测性中枢**  
   - LiteLLM 的 JWT 验证、审计日志与实时提示词缓存可见性，表明网关已进化为**合规与可观测性层**，而不仅是代理。

5. **破坏性变更正变得越来越静默**  
   - Ollama 无声移除了 `typical_p`；LiteLLM 默默改变了 Azure AI 路由行为。  
   - **应用开发者必须采用版本锁定与严格的客户端验证机制。**

#### **对开发者的可操作建议**：
- **生产部署**：使用 **vLLM 或 SGLang** 并锁定版本；在 `full_graph` 支持成熟前，避免在长上下文 RAG 中启用推测性解码。
- **边缘/代理系统**：利用 **llama.cpp + Unsloth Studio** 实现低延迟、多模型推理，并支持设备端工具调用。
- **多供应商工作流**：使用 **LiteLLM** 搭配 `/metrics` 与提示词缓存可见性，实现可观测性与成本控制。
- **密切监控发布**：许多项目存在无声破坏性变更——升级前务必验证客户端兼容性。

> 🛠️ **最终提醒**：生态系统已不再只是选择单一引擎的问题——而是关于**分层编排**。请根据**部署场景、硬件条件与工作流复杂度**来构建你的技术栈。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-20**

---

### **1. 今日亮点**  
vLLM 项目持续深化对多模态与混合模型的支持，当前正积极开发 ViT 编码器的完整 CUDA graph 集成（Issue #38175），并修复在 MoE 和长上下文负载下推测解码的关键稳定性问题。今日重点 PR 包括使 Elastic EP 操作具备取消安全性的改进（#57710）、优化 ROCm 混合精度检查点处理（#57048），以及提升 DiffusionGemma 模型结构化输出的可靠性（#57250）。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
无新版本发布或破坏性 API/配置变更。截至本日，最新稳定版本仍为 `v0.28.1rc1.dev580+g385dce36b`。

---

### **3. 新模型与硬件支持**  
- **GLM-5.3-Flash (glm5next)**：通过 KDA（Kimi Delta Attention）新增实验性 CPU 后端支持（#57346）——这是实现非 GPU 系统推理的重要一步。  
- **ROCm 支持**：扩展至支持 MI300X/MI355X 上的混合 mxfp4 + fp8 检查点（#57048），并针对 gfx950/GFX1151 目标进行性能追踪（#57149）。  
- **Intel GPU (XPU)**：MRV2 采样器现已支持 XPU 融合 top-k/top-p 采样内核（#57277）。  
- **多模态模型**：持续推进 Qwen3-VL、GLM-V 与 Kimi K2.5 的 ViT 完整 CUDA graph 支持（#38175）。

---

### **4. 性能与优化**  
- **仅预填充批处理优化**：现在仅预填充批次将获得由模型状态定义的精确数量的 logit 行，避免扩散模型中不必要的全遍历（#57416）。  
- **FlashInfer 自动调优**：修复了仅在 rank 0 上命中配置缓存导致死锁的问题（#57423）。  
- **推测解码效率**：仍在推进草稿链步骤的完整 CUDA graph 支持（目前仅 PIECEWISE；解码开销约 15–18%）（#45258）。  
- **ROCm 性能**：当前基准测试显示，使用默认 `ROCM_ATTN` 相较于 `AITER` + `ROCM_AITER_UNIFIED_ATTN`，短提示慢 1.7 倍，12k token 提示慢 3.7 倍（#56945）。

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：`DFlash2` 推测解码配合 `xgrammar` 使用时，在约 11,000 次解码步后触发确定性“无法推进 FSM”错误，导致引擎崩溃（#55279）。  
- **CUDA 内存损坏**：在 4xB200 GPU 上，对 GLM-5.3-Flash 进行无关内核操作（如 KDA 线性注意力、MHC TileLang、TRT-LLM 融合 MoE）时反复出现非法内存访问（#54317）。  
- **死锁**：FlashInfer 自动调优配置缓存因仅允许 rank 0 访问而引发死锁（#57423）。  
- **取消缩放导致状态损坏**：在 `_commit_scale_down_elastic_ep` 期间任务取消会留下不一致集群状态且无回滚机制（#57691）——已在 PR #57710 中修复。  
- **结构化输出失败**：当启用 MTP 且设置 `response_format` 时，Qwen3.6-27B 工具调用失败（#46249）。  

> ✅ *#57691（#57710）、#57423 已有修复，#55279 正在排查中。*

---

### **6. 对应用开发者的意义**  
- **生产部署**：在使用推测解码和长上下文 RAG 流水线（如 10 万+ token）时需谨慎——建议设置 `max_num_partial_prefills` 限制（#57413），并监控 DFlash2 不稳定性。  
- **多模态系统**：若使用 Qwen3-VL 或 Kimi K2.5，应预期 ViT CUDA graph 支持不完整；在 Issue #38175 解决前避免使用 `full_graph` 模式。  
- **混合量化**：ROCm 用户请确保设置 `VLLM_ROCM_USE_AITER=1`，以避免长提示场景下 3.7 倍延迟惩罚（#56945）。  
- **结构化输出**：若使用 Qwen3.5/3.6，避免在 `tool_choice: "auto"` 下使用 `response_format`——此为已知回归问题（#39929, #46249）。  
- **内存安全**：建议使用最新的 vLLM 夜间构建版本，以获取最近关于 KV 卸载与弹性扩展的修复（#57710, #57652）。  

👉 *关注 GitHub 问题以获取稳定性修复的实时更新，尤其聚焦 GLM-5.3-Flash 与推测解码相关问题。*  
[查看所有开放问题](https://github.com/vllm-project/vllm/issues) | [今日合并的 PR](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-09-20**

---

### **1. 今日重点**  
SGLang 项目在高性能推理基础设施方面持续取得进展，特别是在**分布式推测解码（PD）**和**HiCache 内存管理**领域，包括主机-设备 KV 传输的新优化以及内存压力下的分阶段写回机制。针对 `DeepSeek-V4.1`、GLM-5.3-Flash 以及 FlashInfer 自动调优行为的若干关键稳定性修复正在推进中——尤其涉及 MoE 专家并行与 CUDA 核心崩溃问题。核心路由系统正在进行重大重构，以支持会话感知、缓存感知及基于 SLO 的准入策略。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本或破坏性变更。*  
然而，`--enable-linker-mla-dedup`（PR #39565）和 `--disaggregation-decode-enable-host-receive`（PR #40238）的持续开发可能在未来版本中为大规模部署引入可选的行为变更。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1**：通过 PRs #40152（跟踪）和 #39700（路线图）积极开发；预览分支现已提供早期支持。
- **GLM-5.3-Flash（DSA + Mamba 混合架构，FP8 MoE）**：已在 v0.5.20 中支持；但若干后端限制仍然存在：
  - 由于 TRT-LLM/TileLang/FlashInfer 限制，在 SM121（DGX Spark）上无法使用可用的 DSA 注意力后端（[#40286](https://github.com/sgl-project/sglang/issues/40286)）。
  - 缺失 `Glm5NextDecoderLayer` 策略，且 `--enable-dp-attention` 被静默重置（[#36840](https://github.com/sgl-project/sglang/issues/36840)）。
- **扩散模型**：实验性支持在 PR #40388 中启用 SANA-Video 紧急卷积融合，使视频工作负载延迟降低 12.6%。

---

### **4. 性能与优化**  
- **HiCache 主机-设备传输**：使用 4 个共 152 个 SM 的 TMA 分段传输，实现约 2 倍带宽提升（H2D：97 → 192 GB/s；D2H：93 → 183 GB/s）（[PR #40278](https://github.com/sgl-project/sglang/pull/40278)）。
- **统一缓存去重**：MLA 加载去重减少跨节点数据传输开销；在 8× H20 配置下加载速度最高提升 30%（[PR #39565](https://github.com/sgl-project/sglang/pull/39565)）。
- **内存池效率**：在捕获后尺寸确定前预先分配 HiCache 阶段缓冲区，防止因工作区碎片化导致的 OOM 问题（[PR #40256](https://github.com/sgl-project/sglang/pull/40256)）。
- **推测解码**：重构后的 PD 流水线提升了预演/解码阶段间的资源共享能力，并在高负载下改善了容量利用率（[PR #40238](https://github.com/sgl-project/sglang/pull/40238)）。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复/临时方案 |
|------|----------|--------|----------------|
| [#40320](https://github.com/sgl-project/sglang/issues/40320)：MoE EP>1 时每次启动都会丢弃 FlashInfer 自动调优缓存 | 高 | 开放 | `_drop_diverged_autotune_cache()` 存在缺陷 —— 影响启动时间与性能一致性 |
| [#40364](https://github.com/sgl-project/sglang/issues/40364)：DP 调度器 SIGQUIT 导致 DataParallelController 被终止而非通知 Engine | 高 | 开放 | 平滑关闭期间存在无声终止风险 |
| [#40360](https://github.com/sgl-project/sglang/issues/40360)：LMCache MP 会话在预加载回滚时泄漏 | 中等 | 开放 | 回滚钩子无法安全完成会话；存在潜在内存泄漏 |
| [#40370](https://github.com/sgl-project/sglang/issues/40370)：误提交问题（已删除） | 低 | 已关闭 | 无需操作 |
| [#39125](https://github.com/sgl-project/sglang/issues/39125)：JSON Schema 编译过程中 DFA 状态爆炸 | 严重 | 开放 | 深层嵌套模式可能导致拒绝服务攻击 |

> ⚠️ **注意**：多个问题与 **CUDA 核心崩溃** 相关（[#26340](https://github.com/sgl-project/sglang/issues/26340)），表明 GPU 内核执行路径存在系统性不稳定性——很可能与近期 JIT 内核变更有关。

---

### **6. 对应用开发者的影响**  
- 若在内存受限的 GPU 上运行解码密集型任务，请使用 `--disaggregation-decode-enable-host-receive`；该选项可在内存压力下将预填充 KV 退避至主机内存。
- 在 [#36840](https://github.com/sgl-project/sglang/issues/36840) 修复前，避免对 GLM-5.3-Flash 使用 `--enable-dp-attention` —— 当前该标志会导致静默异常行为。
- 使用带有专家并行（EP > 1）的 MoE 模型时，请密切监控 FlashInfer 自动调优行为；由于重复调优，预计冷启动速度变慢（[#40320](https://github.com/sgl-project/sglang/issues/40320)）。
- 若使用深度嵌套的 JSON Schema 结构输出，请仔细验证其结构安全性 —— 存在 CPU 卡死或无限递归的风险（[#39125](https://github.com/sgl-project/sglang/issues/39125)）。
- 可提前利用即将推出的路由器重构（PRs #39867–#40379）实现高级请求路由：优先选择带有缓存前缀的引擎，复用会话，并通过桶选择机制强制执行 SLO。

> 🔗 *生产环境建议：锁定至稳定版本（v0.5.20），并在关键回归问题修复前避免使用开发版构建。*

---  
*本简报基于 GitHub 活动生成（2026-09-20 UTC）。*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-20**

---

### **1. 今日亮点**  
最新更新聚焦于对 **Ling 3.0 (Bailing V3)** 及其视觉语言变体的稳健支持，包括专用解析器和模型加载功能。关键修复提升了 GPU 后端的稳定性——特别是针对 **Metal (Apple Silicon)** 和 **SYCL (Intel Arc)**——并优化了多个后端的内存管理。**CUDA** 与 **CPU NEON** 的性能优化也持续推进。

---

### **2. 发布与破坏性变更**  
今日未发布新的标记版本。但若干合并请求（PR）已合并，可能影响行为：
- **`chat: 为 Ling 3.0 (Bailing V3) 添加专用解析器`** ([#28682](https://github.com/ggml-org/llama.cpp/pull/28682)) — 在使用预打开 `\<think\>` 块的模型中，确保工具调用正确解析所必需。
- **`server: 改进启动日志消息`** ([#29125](https://github.com/ggml-org/llama.cpp/pull/29125)) — 现在清晰显示模型来源（`[source]` 标签）、HF 缓存路径及缓存目录，通过 `hf_cache::get_cache_dir()` 获取。

> 🔗 [GitHub Pull Request #28682](https://github.com/ggml-org/llama.cpp/pull/28682) | [PR #29125](https://github.com/ggml-org/llama.cpp/pull/29125)

---

### **3. 新模型与硬件支持**  
- ✅ **Ling 3.0 Flash (Bailing V3)**：为 `\<think\>` 预打开场景下的工具使用用例添加完整解析器支持。
- ✅ **Ling 3.0 VL (BailingMoeV3VL)**：首次支持 Ling 3.0 的视觉语言变体（总计 124B / 激活 5.1B，混合 KDA + 门控 MLA，512专家 MoE）。([#29151](https://github.com/ggml-org/llama.cpp/pull/29151))
- ✅ **Qwen4Exp HC Ops**：新增对 DSV4 HC 操作新变体的支持（`hc_pre` 使用 sigmoid 门控，`hc_post` 使用恒等混合）。([#29000](https://github.com/ggml-org/llama.cpp/pull/29000))
- ✅ **Hexagon 后端**：启用 `I32 GET_ROWS`、`TOP_K` 与 `GEGLU_QUICK` 操作。([#29116](https://github.com/ggml-org/llama.cpp/pull/29116), [#29114](https://github.com/ggml-org/llama.cpp/pull/29114), [#29113](https://github.com/ggml-org/llama.cpp/pull/29113))

---

### **4. 性能与优化**  
- **CUDA**：`ggml-cuda : 将连续张量每四元素一次转换` 显著提升 BF16 预填充性能。基准测试显示在 AMD Radeon 8060S、R9700 及 RTX 5060 Ti 上均有提升。([#29155](https://github.com/ggml-org/llama.cpp/pull/29155))
- **CPU (NEON)**：为 ARM64 添加向量化 `q8_K_4x4` 与 `q8_K_4x8` 量化内核，不改变 GEMM 结果的前提下带来可测量的速度提升。([#29153](https://github.com/ggml-org/llama.cpp/pull/29153))
- **Metal**：修复 macOS 27 SDK 的弃用警告；提升对未来 Apple 操作系统的兼容性。([#29136](https://github.com/ggml-org/llama.cpp/pull/29136))
- **SYCL**：固定内存现使用正确的设备上下文（修复多 GPU 系统中的 OOM 错误）。([#28895](https://github.com/ggml-org/llama.cpp/pull/28895))

---

### **5. 稳定性与回归问题**  
今日报告的顶级问题：
- **🔥 高严重性**：`HIP/ROCm — 融合门控 Delta Net 操作在请求间携带递归状态` — 导致后续补全中直接重复输出之前提示内容。已在 Qwen3.5/MoE 上复现。([#29092](https://github.com/ggml-org/llama.cpp/issues/29092))
- **🔥 高严重性**：`评估错误：CUDA 图导致 GPU 通道挂起（RC 监控器 + Xid 8）` 出现在 RTX 5090 笔记本（sm_120）；临时解决方案：`GGML_CUDA_DISABLE_GRAPHS=1`。([#27330](https://github.com/ggml-org/llama.cpp/issues/27330))
- **⚠️ 中等**：`SYCL 双 GPU 在模型加载时卡死` — 观察到于 Intel Arc B60 系统上出现。([#27547](https://github.com/ggml-org/llama.cpp/issues/27547))
- **⚠️ 中等**：`从 b10680 版本（SYCL 后端）开始显存占用增加` — 在 Qwen3.8-27B-Q4_K_M 上被注意到。([#29063](https://github.com/ggml-org/llama.cpp/issues/29063))

> 🔗 [Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092) | [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) | [Issue #27547](https://github.com/ggml-org/llama.cpp/issues/27547)

---

### **6. 对应用开发者的启示**  
- 若你基于 **Ling 3.0 (Bailing V3)** 或 **Ling 3.0 VL** 构建智能体，请立即升级至 `master` 分支，以确保工具调用解析正确，避免静默失败。
- 针对 **Apple Silicon 上的高性能推理**，可期待更好的 Metal 稳定性及面向未来的兼容性，得益于 SDK 弃用警告的修复。
- 在 **Intel Arc GPU** 上，建议优先使用 SYCL 构建，但需监控显存使用峰值，并在遇到 OOM 时考虑禁用固定内存。
- **搭载 RTX 5090 笔记本的 CUDA 用户** 应暂时禁用 CUDA 图（`GGML_CUDA_DISABLE_GRAPHS=1`），直至正式修复上线。
- 利用新 `--threads -1` 行为：现在将自动检测数学核心数，而非默认使用硬件并发数，从而提升 CPU 利用率。

> 💡 实用技巧：使用 `llama-server --models-preset` 配合 `--log-level debug`，可更透明地追踪模型来源与缓存路径。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# **Ollama Digest – 2026-09-20**

---

### **1. 今日亮点**  
在 MTP 伪编码推断退化以及 `gpt-oss:20b`（MXFP4）的 CUDA 内核崩溃问题上出现了关键稳定性问题，影响高端 NVIDIA GPU。同时，多个模型特定的工具调用解析错误被报告——尤其针对 Qwen3 系列模型——影响依赖结构化函数调用的代理工作流。一项关键修复已合并，以支持 OpenAI 兼容端点中的 `reasoning_content`，与 DeepSeek 的 API 合同保持一致。

---

### **2. 发布与破坏性变更**  
*无* —— 过去 24 小时内未发布新版本。但多项破坏性变更即将生效：
- **`typical_p` 参数移除**：Ollama 0.34.2 静默地停止了对 `typical_p` 的支持，导致无法忽略该参数的客户端（如 SillyTavern）出现兼容性问题 ([Issue #18542](https://github.com/ollama/ollama/issues/18542))。这可能需要客户端更新。
- **API 字段弃用风险**：助手消息中现在优先使用 `reasoning` 字段而非 `reasoning_content`，可能破坏依赖后者的下游客户端 ([PR #18543](https://github.com/ollama/ollama/pull/18543))。

---

### **3. 新模型与硬件支持**  
- **新增 MLX 支持**：通过 `POST /api/extract` 接口，GLiNER-small-v2.1 现已原生支持 MLX 运行器，实现设备端实体提取 ([PR #18535](https://github.com/ollama/ollama/pull/18535))。
- **ROCm + CUDA 双运行时支持**：一项功能请求提议允许在多 GPU 系统（例如 AMD 7800XT + NVIDIA 4060 Ti）上同时安装 ROCm 与 CUDA 运行时 ([Issue #18545](https://github.com/ollama/ollama/issues/18545))。
- **Qwen 3.5 MoE MTP FastMTP**：正在推进对 Qwen 3.5 MoE 模型的紧凑草稿词汇表（`d2t` 映射）支持，以加速伪编码推断过程 ([Issue #18546](https://github.com/ollama/ollama/issues/18546))。

---

### **4. 性能与优化**  
- **基准测试改进**：基准测试现已采用打包的 HumanEval 提示，取代合成词列表，更真实地模拟代码生成工作负载 ([PR #17480](https://github.com/ollama/ollama/pull/17480))。
- **内存预测增强**：PRs #18197–#18201 引入按设备报告 VRAM 使用情况，并基于注意力头维度和负载测量值改进 VRAM 估算，从而支持更优的资源分配决策 ([PR #18197](https://github.com/ollama/ollama/pull/18197), [PR #18201](https://github.com/ollama/ollama/pull/18201))。
- **Prometheus 指标暴露**：当设置 `OLLAMA_METRICS=1` 时，可启用可选的 `/metrics` 端点，便于在 Kubernetes 和云环境中实现可观测性 ([PR #18508](https://github.com/ollama/ollama/pull/18508))。

---

### **5. 稳定性与回归问题**  
**高严重性**  
- **`gpt-oss:20b`（MXFP4）中的 CUDA 崩溃**：在 RTX 4000 Ada GPU 上，短对话请求期间出现确定性的 `ADD_ID` 失败 ([Issue #18522](https://github.com/ollama/ollama/issues/18522))。目前尚无修复 PR；可能与内核级张量操作有关。
- **MTP 伪编码推断性能退化**：Qwen3.8 27B 在 0.34.2 更新后出现性能下降或卡死现象 ([Issue #18541](https://github.com/ollama/ollama/issues/18541))。修复待发布。

**中等严重性**  
- **工具调用解析失败**：多个模型（`qwen3-coder`, `minicpm5-2b`）在推理内容前置时无法正确解析工具调用，因缺少 `<function=` 开头标签 ([Issue #18530](https://github.com/ollama/ollama/issues/18530), [PR #18538](https://github.com/ollama/ollama/pull/18538))。
- **Intel QuickSync iGPU 未被利用**：尽管配置正确，Docker 容器仍未能将推理卸载至 Intel iGPU ([Issue #18548](https://github.com/ollama/ollama/issues/18548))。
- **模型下载失败**：部分用户报告在 0.34.2 版本中无法拉取模型，而 0.34.1 版本运行正常 ([Issue #18547](https://github.com/ollama/ollama/issues/18547))。

---

### **6. 对应用开发者的影响**  
- **避免使用 `typical_p`**：若使用 Ollama 0.34.2+，请确保客户端不再传递 `typical_p`。该参数已不再支持，会导致静默失败。
- **更新工具调用处理逻辑**：对于 Qwen3 系列模型，若推理内容出现在工具调用之前，可能出现不一致行为。可暂时使用 PR #18538 作为临时解决方案，直至官方补丁发布。
- **遵循 DeepSeek API 合同**：在您的 OpenAI 兼容客户端中启用 `reasoning_content` 支持。PR #18543 通过在 `reasoning_content` 缺失时回退至 `reasoning` 字段，确保向后兼容。
- **监控 GPU 内存使用**：随着 `/api/ps` 中新增按设备报告的 VRAM 信息，现在可以检测模型部署位置，避免多 GPU 环境下的显存超分配。
- **准备应对 MTP 回归问题**：若使用 Qwen3.8 等模型进行伪编码推断，请在 0.34.2+ 环境下充分测试；如出现不稳定，可考虑临时降级。

> 🔗 *所有链接均直接指向 GitHub 问题与 PR，便于追溯。*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-09-20**

---

### **1. 今日亮点**  
LiteLLM 生态系统持续成熟，针对速率限制、流式传输完整性以及成本核算的关键修复已落地，尤其在 Anthropic 的 `/v1/messages` 桥接和 Responses API 方面表现突出。新增的 UI 改进现已提供提示缓存节省与路由预测的可视化信息，而聚焦安全性的 PR 提升了审计日志记录和 MCP 网关的 JWT 验证能力。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告新发布或破坏性变更。*  
但通过 [PR #42041](https://github.com/BerriAI/litellm/pull/42041) 引入了一项显著的**破坏性变更**：使用 `reasoning_effort` 的 `azure_ai/gpt-5.4+` 函数工具现在必须调用 **Foundry Responses API**，而非标准聊天路径。这会影响依赖 `azure_ai/gpt-6-astra` 进行推理 + 工具调用的用户——必须迁移至 `responses` 接口。

> 🔗 [PR #42041: 修复 Azure AI 推理/工具桥接问题](https://github.com/BerriAI/litellm/pull/42041)

---

### **3. 新模型与硬件支持**  
*今日未新增模型或硬件后端支持。*  
但持续开发工作包括：  
- OpenRouter 上对 `gpt-5.6-sol` 的支持（[Issue #40102](https://github.com/BerriAI/litellm/issues/40102) 跟踪中）——尚未收录于 `model_prices_and_context_window.json`。  
- 建议通过 [Feature Request #34924](https://github.com/BerriAI/litellm/issues/34924) 实现 **Claude Gateway** 支持，待与 Anthropic 新版 Apps Gateway 集成。

---

### **4. 性能与优化**  
今日落地多项重要优化：  
- **预留容量防护效率提升**：[PR #42017](https://github.com/BerriAI/litellm/pull/42017) 引入 `min_tokens` 阈值，对短请求跳过压缩往返，降低低流量对话延迟。  
- **提示缓存可见性增强**：[PR #42055](https://github.com/BerriAI/litellm/pull/42055) 在 UI 中新增实时追踪提示缓存注入、使用情况及净节省令牌数。  
- **内部用户分析功能启用**：[PR #42026](https://github.com/BerriAI/litellm/pull/42026) 通过 JWT 归因机制，为内部用户提供节省数据与自动路由使用情况的视图。

---

### **5. 稳定性与回归问题**  
今日报告的主要稳定性问题：  
1. **速率限制器重复计数** ([Issue #34140](https://github.com/BerriAI/litellm/issues/34140))：按团队按模型配置的每分钟请求/令牌限额被错误地执行为原设定值的一半，因存在重复计数。*修复 PR 待提交。*  
2. **Responses API 流式传输中空值丢失** ([Issue #41972](https://github.com/BerriAI/litellm/issues/41972))：流式序列化过程中空值被丢弃，导致下游消费者无法获得完整帧保真度。已由 [PR #41983](https://github.com/BerriAI/litellm/pull/41983) 修复。  
3. **Bedrock 跨区域模型成本跟踪错误** ([Issue #30768](https://github.com/BerriAI/litellm/issues/30768))：区域推理配置（如 `us.anthropic.claude-sonnet-4-6`）的价格数据对齐异常。  
4. **防护规则无法拦截 Anthropic `/v1/messages` 格式中的 MCP 工具** ([Issue #40583](https://github.com/BerriAI/litellm/issues/40583))：预调用防护规则无法检查或阻止通过 Anthropic 兼容端点发送的 MCP 工具。

---

### **6. 对应用开发者的意义**  
- **避免使用 `sk-1234` 作为主密钥**：[PR #42011](https://github.com/BerriAI/litellm/pull/42011) 移除了示例中的硬编码密钥——始终从环境变量加载 `LITELLM_MASTER_KEY`。  
- **若使用 Bedrock 跨区域模型或 DeepSeek V4 Flash 定价，请验证成本跟踪**：数据可能存在延迟（[Issue #37255](https://github.com/BerriAI/litellm/issues/37255)）。  
- **在 Azure AI 上使用 gpt-5.4+ 且启用了推理 + 工具时，请务必使用 Responses API**——标准 `azure/` 路径将失效。  
- **若使用 `/v1/responses`，请监控流式输出**：除非通过 [PR #41983](https://github.com/BerriAI/litellm/pull/41983) 打补丁，否则空字段可能被静默剥离。  
- **启用细粒度可观测性**：利用新 UI 功能追踪提示缓存节省（[#42055](https://github.com/BerriAI/litellm/pull/42055)）与路由预测（[#42057](https://github.com/BerriAI/litellm/pull/42057)）。

> 🛠️ **可操作建议**：若您运行的是支持 MCP 的代理，请确保网关 JWT 经过实时回归测试验证（[PR #42032](https://github.com/BerriAI/litellm/pull/42032)，[#42050](https://github.com/BerriAI/litellm/pull/42050)）。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth 简报 – 2026-09-20**

---

### **1. 今日亮点**  
Unsloth 生态系统持续扩展对先进推理后端及多 GPU/MoE 工作流的支持，关键 PR 实现了 Studio 中 **多个常驻 GGUF 模型**（PR #10876）的功能，并优化了 **Windows 平台的性能与稳定性**（PR #11336）。针对模型加载的关键问题（Qwen3.8-Flash-Next MTP 中断，PR #11143）以及 GGUF 兼容性问题（Qwen 3.5 FastMTP d2t 崩溃，PR #11335）已报告，凸显出在前沿量化模型上仍存在的挑战。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
- **注意**：近期构建中 `huggingface_hub` 依赖已升级至版本 1.32（通过 PR #11301），可能影响旧训练任务的模型版本验证与续传行为。

---

### **3. 新模型与硬件支持**  
- ✅ **多个常驻 GGUF 模型**现已在 Studio 中支持（PR #10876）：每个模型运行于独立的 `LlamaCppBackend`，实现无需重新加载的并发推理。  
- 🚀 **ROCm Docker 镜像增强**：  
  - PR #11218：为 `unsloth/unsloth-rocm` 添加 **Unsloth Studio UI**（此前仅支持训练）。  
  - PR #11286：集成 **JupyterLab + notebooks + sshd + supervisord**，与 CUDA 镜像功能对齐。  
  - PR #11212：启用 **通过 DXG 桥接访问 WSL2 GPU**（`/dev/dxg`）——对使用 Windows 的 AMD 用户至关重要。  
- 🔮 **EXL3（ExLlamaV3）后端开发中**：PR #7115 支持 2/3/4/6/8 位量化及 MoE 模型——迈向内存高效、高性能推理的重要一步。

---

### **4. 性能与优化**  
- **吞吐量与内存效率**：  
  - EXL3 后端（PR #7115）相比 bitsandbytes 可显著降低内存占用，尤其适用于 MoE 模型。  
  - 多个常驻模型（PR #10876）避免重复加载循环，有效降低冷启动延迟。  
- **多 GPU 与 CPU Offload**：  
  - PR #11330 报告存在回归问题：推理过程中 `--tensor-split` 标志被移除，导致启用 CPU Offload 的 MoE 模型出现 OOM —— 对大规模部署构成严重威胁。  
- **Windows 与 Linux 性能对比**：  
  - PR #11336 指出桌面版 **Windows 与 Linux 之间存在显著性能差距**，可能源于驱动或运行时差异。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|------|----------|
| ⚠️ 高 | [错误] Qwen3.8-Flash-Next MTP 加载时中断 | 重基线后 `nextn.hc_head_norm` 维度不匹配（PR #11143） | 待处理 |
| ⚠️ 高 | [错误] Qwen 3.5 FastMTP d2t 导致 llama.cpp 崩溃 | GGUF 加载期间词汇表维度不匹配（PR #11335） | 待处理 |
| ⚠️ 中 | [错误] Studio 移除 `--tensor-split` 标志 | 导致启用 CPU Offload 的多 GPU MoE 出现 OOM（PR #11330） | 待处理 |
| ⚠️ 中 | [错误] “审查计划” 在刷新前无响应 | Deep Research UI 在刷新前冻结（PR #10676） | 待处理 |
| ⚠️ 低 | [错误] Windows 桌面版远慢于 Linux | Windows 上观察到性能下降（PR #11336） | 待处理 |

> 🔗 *所有问题均已在 GitHub 中关联：[Issue #11143](https://github.com/unslothai/unsloth/issues/11143), [Issue #11335](https://github.com/unslothai/unsloth/issues/11335)，等*

---

### **6. 对应用开发者的启示**  
- **当前 Studio 构建中若使用带 CPU Offload 的 MoE 模型，请避免使用 `--tensor-split`** —— 请改用命令行 `unsloth run` 或等待修复（PR #11330）。  
- **在 `d2t` 与 MTP 加载问题修复前，建议直接使用原生 CLI 或 API 调用** Qwen3.8/3.5 FastMTP 模型。  
- **利用多个常驻 GGUF 模型**（Studio v1.7+）实现跨不同模型变体的低延迟代理编排。  
- **AMD/ROCm 开发者**：请使用更新后的 `unsloth/unsloth-rocm` 镜像，其包含 JupyterLab 与 WSL2 支持，可实现全栈开发。  
- **规划 EXL3 集成**：关注 PR #7115，提前获取 2–8 位 MoE 量化能力，获得更优内存效率。

> 💡 小贴士：对于生产推理场景，建议优先使用 `unsloth run` 而非 Studio，直至相关回归问题修复完毕。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*