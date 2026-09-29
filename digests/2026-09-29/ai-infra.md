# AI 基础设施日报 2026-09-29

> 生成时间: 2026-09-29 02:16 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-09-29**

---

### **1. 生态概览**  
AI 推理与服务生态正进入 *深度专业化与硬件多样化* 阶段，各项目日益聚焦于特定工作负载：代理推理、多模态处理、低延迟决策以及主权化/边缘部署。关键趋势包括 **解耦式服务架构**、**多模态支持** 和 **CPU-GPU 混合卸载**，由对异构硬件（从 NVIDIA RTX 5090 到 AMD MI355X 以及平头哥国产 PPU）上可扩展、高效推理的需求驱动。关键稳定性问题依然存在，尤其在推测性解码和内存管理方面，表明生产就绪状态仍处于动态演进中。

---

### **2. 活跃度对比**

| 项目       | 开启的问题（高/严重） | 近 24 小时合并的 PR | 发布版本 | 备注 |
|------------|------------------------|----------------------|----------|------|
| **vLLM**   | 8 (3 严重)             | ~12                  | 无       | 重点聚焦 KV 缓存、CUDA Graph、FlashInfer 调优 |
| **SGLang** | 7 (3 高/严重)          | ~9                   | 无       | HiCache、HiSparse 及平头哥 PPU 支持进展迅速 |
| **llama.cpp** | 7 (3 严重)           | ~6                   | 破坏性变更 | 主要 API 重构；Vulkan/AMD 稳定性存疑 |
| **Ollama** | 6 (2 严重)             | ~3                   | v0.35.0  | 新增 System One API；计费及 GPU 崩溃缺陷 |
| **LiteLLM** | 5 (2 高)              | ~5                   | v1.104.0-rc.1 | 安全加固，支持实时模型代理 |
| **Unsloth** | 8 (2 高)              | ~7                   | v0.1.900-beta | Laya 决策模型，Apple Silicon 加速 |

> ✅ **观察**：vLLM 与 SGLang 在技术推进上领先，而 Ollama 与 Unsloth 尽管存在稳定性挑战，却正在推动新的应用范式。

---

### **3. 模型支持竞赛**

| 新模型 / 架构 | 支持项目 | 备注 |
|---------------|----------|------|
| **DeepSeek-V4.1 (DSv4.1)** | ✅ vLLM, SGLang | gfx950 上完整支持 ROCm + MXFP4/MXFP8 |
| **GLM-5.3 / GLM-5.3-Flash** | ✅ vLLM, SGLang | vLLM 优化分片，SGLang 支持 AMD FP8/MXFP4 |
| **Qwen3-VL / Qwen3.8 Flash Next** | ✅ vLLM, SGLang, llama.cpp, Unsloth | vLLM RFC #38175 中完整 ViT CUDA Graph 支持，llama.cpp 支持混合批处理 |
| **Kimi K2.5** | ✅ vLLM, SGLang | vLLM 中正在进行 ViT CUDA Graph 开发 |
| **Inkling (975B MoE, 1M 上下文)** | ✅ SGLang | 多模态音频/图像/文本的首日支持 |
| **GraniteSpeech5ForCTC** | ✅ llama.cpp | 非自回归 CTC 模型，用于语音转文字 |
| **K2 Horizon (MBZUAI IFM)** | ✅ Ollama | 实验性支持 3.7B–36B MoE 模型 |
| **Laya 决策模型** | ✅ Unsloth | 通过 Skills Library 实现本地推理；集成 Jev |
| **平头哥 PPU (Zw810/Zw-M890P)** | ✅ SGLang | 路线图已启动；正在上游引入原生支持 |

> 🏆 **领先者**：**SGLang** 在新模型支持广度上领先，尤其在大规模多模态与长上下文架构方面。  
> 🚀 **差异化亮点**：**Unsloth** 正通过 Laya 与 Skills Editor 独特推进本地代理能力。

---

### **4. 性能前沿**

| 关注领域                | 领先项目                          | 关键进展 |
|-------------------------|-----------------------------------|----------|
| **KV 缓存管理**         | vLLM, SGLang                      | 分层卸载（vLLM）、池级分片（SGLang）、`BlockRemoved` 修复（vLLM） |
| **推测性解码**          | vLLM, SGLang, llama.cpp           | MTP 修复（vLLM #58921）、DFlash 崩溃（SGLang #40843）、`--cpu-mtp`（llama.cpp） |
| **分布式服务**          | vLLM, SGLang                      | 解耦式服务（`capture_model_ops`）、HiCache、HiSparse |
| **量化与内核优化**      | vLLM, SGLang, llama.cpp, Unsloth  | MXFP4/MXFP8（vLLM）、GDN 内核（llama.cpp）、fp16 MLX（Unsloth） |
| **批处理与预填充**      | SGLang, vLLM                      | 预填充 CP 扩展（SGLang）、PCP 分片（vLLM） |
| **边缘与 CPU 优化**     | llama.cpp, Unsloth                | CPU 卸载的 MTP 草稿生成器，Apple Silicon Metal 内核 |

> 🔥 **最活跃前沿**：**解耦与分布式服务**，vLLM 与 SGLang 在可扩展性与内存效率方面持续突破。

---

### **5. 层级定位**

| 项目       | 主要层级              | 差异化角色 |
|------------|------------------------|------------|
| **vLLM**   | 推理引擎               | 高性能，优化的 CUDA/ROCm 后端；云规模部署主导者 |
| **SGLang** | 分布式服务框架         | 代理流水线编排；专注长上下文、稀疏与解耦系统 |
| **llama.cpp** | 本地运行时 / 嵌入式 | CPU/GPU 可移植性；适合边缘、移动端与离线推理 |
| **Ollama** | 网关 / 开发者平台     | 简化本地推理；通过 System One API 向代理编排拓展 |
| **LiteLLM** | LLM 网关 / 代理       | 企业级路由、成本控制、安全防护及多提供商抽象 |
| **Unsloth** | 代理运行时 / 微调     | 通过 Skills Library 实现本地代理执行；加速视觉语言推理 |

> 🧩 **战略洞察**：技术栈正在分化——**工程师** 使用 vLLM/SGLang 追求性能，**开发者** 依赖 Ollama/LiteLLM 追求简洁，而**代理系统** 正基于 Unsloth 与 SGLang 构建。

---

### **6. 趋势信号**

1. **多模态已不再是可选项**  
   vLLM 的完整 ViT CUDA Graph 支持、SGLang 的 Inkling、llama.cpp 的 Qwen3-VL 嵌入，均表明多模态输入已成为基础设施设计的核心。

2. **硬件主权正在加速**  
   平头哥 PPU（SGLang）、AMD gfx950（vLLM/SGLang）、Apple Silicon 上的 MLX（Unsloth），反映出对非 NVIDIA 芯片的强劲需求——这对主权化与边缘部署至关重要。

3. **代理正在驱动基础设施创新**  
   Ollama 的 System One、Unsloth 的 Laya、SGLang 的 HiCache/HiSparse，以及推测性解码优化，均旨在实现可扩展、低延迟的代理工作流。

4. **安全与可信成为核心特性**  
   LiteLLM 的 cosign 签名镜像、Ollama 的计费循环漏洞，凸显供应链完整性与运营可靠性已不再只是附加项。

5. **稳定性仍落后于功能迭代速度**  
   多起高危崩溃（如推测性解码、flash attention、GPU 卸载）表明，多数项目仍处于“功能优先”阶段——生产环境需谨慎评估。

> ✅ **开发者行动建议**：  
> - 高吞吐、分布式代理系统优先选择 **vLLM** 或 **SGLang**。  
> - 边缘/本地代理执行使用 **llama.cpp** 或 **Unsloth**。  
> - 安全、多提供商网关选用 **LiteLLM**。  
> - 暂避 `prompt_embeds + penalty`（vLLM）、`--enable-dflash`（SGLang）、`gemma4` 图像处理（Ollama）直至修复上线。  
> - 密切关注 **System One**、**Laya** 与 **HiSparse**——这些是下一代代理基础设施的早期信号。

---  
*生成时间：2026-09-29 | 数据来源：GitHub 项目摘要*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-09-29**

#### **1. 今日亮点**  
vLLM 项目持续深化对 **解耦推理（disaggregated serving）** 和 **多模态支持** 的能力，关键 PR 推进了 `derender`/`render` 流水线，并实现了多模态模型中 ViT 编码器的完整 CUDA graph 支持。针对 **KV 缓存卸载**、**FlashInfer 自动调优** 和 **MRV2 上的推测性解码** 的关键稳定性修复已合并，解决了影响生产部署的崩溃与资源泄漏问题。

#### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未报告新版本发布或破坏性 API/配置变更。

#### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1 (DSv4.1)**：PR #58671、#57523、#57463 已在 gfx950（MI355X）上实现 MXFP4/MXFP8 KV 缓存及稀疏索引器的完整 ROCm 支持，使 AMD GPU 上高性能推理成为可能。  
- ✅ **GLM-5.3**：通过 PR #54951 优化了跨 TP rank 的预填充分片策略，通过负载均衡减少延迟并避免冗余评分。  
- ✅ **Qwen3-VL 与 Kimi K2.5**：RFC #38175 跟踪 ViT 编码器的完整 CUDA graph 支持，对低延迟多模态推理至关重要。  
- ✅ **Intel GPU (XPU)**：正在调试 B70（Battlemage）相关问题（#41663），修复重点集中在 TP=2 场景下 BCS 引擎重置的问题。

#### **4. 性能与优化**  
- 🚀 **解耦推理**：PR #59019 引入 `capture_model_ops(device="meta")`，用于元设备算子性能分析，可在无需实际硬件分配的情况下实现跨平台性能建模。  
- ⚙️ **KV 缓存管理**：PR #55092 确保仅在 *所有* 物理副本被逐出后才触发 `BlockRemoved` 事件，防止前缀缓存场景下的过早清理。  
- 🔥 **推测性解码**：PR #58921 修复了 MRV2 多层 MTP 中错误的 LM 头采样问题；PR #58165 解决了因 MXFP8 内核中 M 值取整不当导致的 FlashInfer 预热崩溃。  
- 💡 **内存效率**：PR #52162 在 PCP rank 间分片解码请求，消除仅使用 PCP 的部署中冗余计算——对大规模推理集群至关重要。

#### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR | 说明 |
|------|----------|--------|--------|-------|
| `prompt_embeds` + 惩罚 → 设备端断言 (`scatter gather kernel index out of bounds`) | 严重 | 开放 | ❌ | 影响使用提示嵌入的代理工作流；导致引擎崩溃。 |
| FlashInfer 自动调优配置缓存仅在 rank 0 命中 → 死锁 | 高 | 开放 | ❌ | 在多 GPU 环境下阻塞启动流程；影响性能调优。 |
| 分层卸载崩溃 | 高 | 开放 | ❌ | 报告于 #58804；影响混合内存卸载场景。 |
| 前缀缓存 + MTP 在混合 Mamba/GDN 模型中导致输出损坏 | 中等 | 开放 | ❌ | v0.28.0 中的回归问题；影响代理推理流水线。 |
| NVFP4 MoE 后端不支持（无 NvFp4 MoE 后端支持部署） | 高 | 开放 | ❌ | 阻止在新架构上部署高级量化 MoE 模型。 |

#### **6. 对应用开发者的启示**  
- 若你在构建 **代理系统** 或 **多轮对话应用**，请优先升级至最新 vLLM main（#58921 之后），以规避推测性解码缺陷并确保正确的 token 采样。  
- 对于 **多模态应用**（如 LLaVA、Qwen-VL），请密切关注 RFC #38175 —— ViT 完整 CUDA graph 支持将显著降低图像+文本流水线的延迟。  
- 使用 `capture_model_ops(device="meta")`（PR #59019）可在不申请真实硬件的情况下跨平台基准测试模型行为，非常适合 CI/CD 和部署规划。  
- 在 #57719 修复前，请避免使用 `prompt_embeds` 搭配惩罚项；生产环境可考虑回退至标准提示输入方式。  
- 若使用 **AMD GPU**，建议测试 `--kv-cache-dtype mxfp4` 或 `nvfp4_ds_mla` —— 由于近期 ROCm PR 修复，这些选项已在 gfx950（MI355X）上稳定可用。

> 🔗 **关键链接**：  
> - [RFC: ViT 完整 CUDA Graph](https://github.com/vllm-project/vllm/issues/38175)  
> - [PR: 修复 FlashInfer 预热崩溃](https://github.com/vllm-project/vllm/pull/58165)  
> - [PR: 元设备算子捕获](https://github.com/vllm-project/vllm/pull/59019)  
> - [Issue: Prompt Embeds + Penalty 崩溃](https://github.com/vllm-project/vllm/issues/57719)

---  
*摘要生成时间：2026-09-29 | 来源：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 消息简报 – 2026-09-29

---

### **1. 今日重点**

SGLang 项目持续推进针对智能体工作负载的高吞吐、低延迟推理，分布式 KV 缓存系统与长上下文稀疏服务方面取得关键进展。**HiCache 解耦**、**长上下文模型专用的 HiSparse** 以及 **T-Head PPU 支持** 等核心基础设施改进正在加速推进，标志着硬件适配范围的进一步扩展。与此同时，多项稳定性修复正在解决影响模型服务（如 GLM-5.3 logprob 偏移、DFlash 采样崩溃）和系统韧性（工作进程 SIGQUIT 处理）的关键缺陷。

---

### **2. 发布与破坏性变更**

*无*  
过去 24 小时内未发布新版本。当前无破坏性变更或迁移说明。

---

### **3. 新模型与硬件支持**

- **T-Head PPU 支持（Zw810/Zw810E/Zw-M890P）**：  
  新增路线图问题 #37519，启动对 T-Head 最新 PPU 的上游支持，使部署可运行于国产芯片平台。此举标志着项目已从 NVIDIA/AMD/Metal 后端战略扩展至更多硬件生态。  
  🔗 [问题 #37519](https://github.com/sgl-project/sglang/issues/37519)

- **AMD gfx950 (MI355X) 对 GLM-5.3-Flash 的支持**：  
  PRs #39273 与 #41615 通过 Triton 稀疏注意力实现 gfx950 上的完整 FP8/MXFP4 服务，为 ROCm 平台上的 GLM-5.3-Flash 解锁高性能推理能力。  
  🔗 [PR #39273](https://github.com/sgl-project/sglang/pull/39273)，[PR #41615](https://github.com/sgl-project/sglang/pull/41615)

- **Inkling 多模态模型（首日支持）**：  
  问题 #31359 确认初始 Inkling 支持已上线，涵盖 975B 参数的 MoE 模型，支持 100 万标记上下文长度，并原生支持多模态输入（文本、图像、音频）。  
  🔗 [问题 #31359](https://github.com/sgl-project/sglang/issues/31359)

---

### **4. 性能与优化**

- **预填充阶段并行化（CP）**：  
  #21788 进展持续，正推动将预填充并行化扩展至 MHA/GQA 后端（FlashInfer/TRTLLM-MHA），在已有 MLA（Dpsk v3/Kimi-K2.5）和 SWA 支持基础上进一步提升大规模场景下的预填充吞吐。  
  🔗 [问题 #21788](https://github.com/sgl-project/sglang/issues/21788)

- **长上下文服务专用 HiSparse**：  
  HiSparse 路线图 (#28874) 目标是通过仅在 HBM 中保留热数据集形式的 KV 历史记录，显著降低解码过程中的 GPU 内存占用——这对拥有 100 万+ 上下文窗口的模型至关重要。  
  🔗 [问题 #28874](https://github.com/sgl-project/sglang/issues/28874)

- **KV 缓存分片（MTP 与 DSA Indexer）**：  
  PRs #40929 与 #40925 新增池级别 KV 分片支持，通过跨多个设备分布缓存，提升大规模部署的可扩展性。  
  🔗 [PR #40929](https://github.com/sgl-project/sglang/pull/40929)，[PR #40925](https://github.com/sgl-project/sglang/pull/40925)

- **PTX KDA 预填充修复（NaN 与工作区增长）**：  
  PR #41572 修复了 B200 上基于 PTX 的 KDA 预填充核函数中出现的 NaN 输出及无界工作区增长问题，确保高负载下的稳定运行。  
  🔗 [PR #41572](https://github.com/sgl-project/sglang/pull/41572)

---

### **5. 稳定性与回归问题**

| 严重程度 | 问题 | 描述 | 状态 |
|--------|------|-------------|--------|
| 🚨 高 | #41609 | `GLM-5.3-Flash-NVFP4` 在 2026-09-18 后与 v0.5.20 出现比特级输出漂移；疑似由 KDA 融合门变更引起（#39688） | 开放 |
| 🚨 高 | #40843 | 使用 DFLASH 试探性解码时，推理/输出出现严重重复或退化循环现象，影响 GLM-5.3 | 开放 |
| 🛑 严重 | #41539 | 当启动器失败时，工作进程向 PID 1 发送 SIGQUIT，可能导致监督器崩溃 | 开放 |
| ⚠️ 中等 | #41466 / #41467 / #41482 | `/generate` 接口在 `session_params` 格式错误、`top_k` 无效或 `n` 值过大时崩溃——存在潜在拒绝服务风险 | 开放 |
| ⚠️ 中等 | #41372 | `Req.decoded_text` 从未被写入，导致死停字符串回退，且在淘汰时返回空的 DecodeStatus | 开放 |
| ⚠️ 中等 | #41569 | MiMo-V2 在 SM100 上为打包的 MXFP4 专家选择 FP8 MoE 执行器，引发行为异常 | 开放 |

> ✅ **修复进行中**：多个 PR 正在解决根本原因（如 #41572 修复 KDA NaN，#37531 修复 DFlash 图表回退），但尚未有合并修复。

---

### **6. 对应用开发者的影响**

- **智能体工作负载现具备更强可扩展性**：随着 HiCache 解耦（#21846）与 HiSparse（#28874）快速推进，开发者现在可设计出能处理更长上下文、内存开销更低、分布效率更高的智能体。
- **期待更高硬件灵活性**：新增对 T-Head PPU 与 AMD gfx950 支持，为自主云与边缘部署打开新路径。在目标平台时使用 `--enable-ppu` 或 `--gpu=mi355x`。
- **谨慎使用试探性解码**：在 #40843 与 #41609 修复前，请避免对 GLM-5.3 使用 `--enable-dflash` —— 输出质量可能存在不稳定性。
- **严格验证输入类型**：由于 `/generate` 存在开放缺陷，务必在客户端对 `top_k`、`n` 与 `session_params` 进行充分校验，防止服务端崩溃。
- **关注 CI 健康状态**：追踪问题 #17050 显示当前有 2 个测试失败、9 个测试不稳定——开发人员在主干分支测试时应预期偶发的 CI 波动。

➡️ **行动项**：若在 SM100 或 MI355X 上部署，请使用近期夜间构建版本进行测试，并通过 GitHub 尽早报告问题。

---  
*简报生成自 sgl-project/sglang — 2026-09-29*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-29**

---

### **1. 今日亮点**  
最新更新聚焦于推测解码的稳定性与多模态输入处理，修复了 GCC 15 CI 问题及 Vulkan/AMD 性能瓶颈。关键进展包括：支持将 MTP 草稿器卸载至 CPU，减轻显存压力；增强对混合（文本 + 嵌入）输入的批量处理能力——推动新用例发展，例如类 Paligemma 的提示处理。

---

### **2. 发布与破坏性变更**  
今日未发布正式版本。但多个 PR 引入行为上的破坏性变更：  
- `--cpu-mtp` 现在为显存受限系统启用 CPU 卸载的 MTP 草稿器 ([PR #29620](https://github.com/ggml-org/llama.cpp/pull/29620)) —— 可能需要重新配置现有部署脚本。  
- `/v1/embeddings` 端点现在接受 OpenAI 风格的嵌套内容数组，用于视觉/音频/视频输入（支持 Qwen3-VL-Embedding）([PR #29556](https://github.com/ggml-org/llama.cpp/pull/29556))。  
- `llama_batch_ext` 现在支持混合嵌入 + 原始标记输入，废弃旧版 `llama_batch` API ([PR #29622](https://github.com/ggml-org/llama.cpp/pull/29622), [PR #29601](https://github.com/ggml-org/llama.cpp/pull/29601))。

---

### **3. 新模型与硬件支持**  
- **模型支持**：新增对 `GraniteSpeech5ForCTC`（Turbo CTC）的实验性支持——一种非自回归的仅编码器语音转文本模型 ([PR #29446](https://github.com/ggml-org/llama.cpp/pull/29446))。  
- **硬件后端**：  
  - Vulkan 后端现包含优化的 GDN 内核，并提升 Intel Arc A770 性能 ([PR #29476](https://github.com/ggml-org/llama.cpp/pull/29476))。  
  - Hexagon 后端获得更精细的追踪粒度（最小切片 <100ns），适用于 Android 性能分析 ([PR #29614](https://github.com/ggml-org/llama.cpp/pull/29614))。  
- **量化**：未引入新格式；针对 Qwen3 系列的 DFlash2 与 MTP 草稿的持续开发仍在进行中。

---

### **4. 性能与优化**  
- **推测解码**：  
  - `--cpu-mtp` 通过将 MTP 草稿器状态卸载至 CPU，减少显存占用（27B 模型约节省 1GB），使 8–12GB 显卡可部署高吞吐推测解码 ([PR #29620](https://github.com/ggml-org/llama.cpp/pull/29620))。  
  - Vulkan：GDN 内核调优在 ubatch=4096 时，RTX 3090 上吞吐量提升 **~6.3%** ([PR #29476](https://github.com/ggml-org/llama.cpp/pull/29476))。  
- **CPU 后端**：分块 Flash Attention 现在通过 AVX2 支持 x86 上非向量倍数头维度，提升异构硬件效率 ([PR #29423](https://github.com/ggml-org/llama.cpp/pull/29423))。  
- **批处理**：`mtmd`、`speculative` 与 `server` 组件迁移至 `batch_ext`，实现跨组件统一且可扩展的批处理 ([PR #29385](https://github.com/ggml-org/llama.cpp/pull/29385))。

---

### **5. 稳定性与回归问题**  
今日报告若干关键稳定性问题：  
- **Vulkan 性能下降**：Intel Arc A770 上长时间解码会话（>7小时）因 GPU fence 损坏导致返回空 EOS 回复 ([Issue #29526](https://github.com/ggml-org/llama.cpp/issues/29526))。  
- **MTP 草稿崩溃**：Qwen3.8 DFlash/MTP 草稿在 Vulkan AMD gfx1150 上输出越界 token ID（n_vocab = 248320），引发解码失败 ([Issue #28158](https://github.com/ggml-org/llama.cpp/issues/28158))。  
- **状态循环泄漏**：HIP/ROCm 报告在 Qwen3.5 MoE 模型中，请求间存在循环状态泄漏，导致早期提示文本被原样输出 ([Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092))。  
- **大 JSON Schema 导致崩溃**：`json_schema` 过大时，语法构建时间呈超线性增长，可能通过核心锁定造成拒绝服务 ([Issue #29457](https://github.com/ggml-org/llama.cpp/issues/29457))。  

*注：部分回归问题已有修复补丁（如 GCC 15 stringop 溢出问题于 `decode_embd_batch` — [PR #29607](https://github.com/ggml-org/llama.cpp/pull/29607)），但其他仍处于开放状态。*

---

### **6. 对应用开发者的影响**  
- **用例拓展**：得益于对多模态嵌入（`/v1/embeddings`）和混合文本+嵌入批量的支持，你现在可使用 Qwen3-VL 或 Paligemma 等模型，在单个请求中处理图像、音频与文本，构建智能代理。  
- **资源优化**：利用 `--cpu-mtp`，可在低显存设备（如笔记本、边缘节点）上运行高吞吐推测解码。  
- **部署提醒**：在 #29526 修复前，请避免在 Intel Arc GPU 上长期运行 Vulkan 服务。同时监控 MTP 草稿的内存使用情况——若启用卸载，需确保足够的 CPU 内存。  
- **API 准备就绪**：建议在自定义工具与框架中，开始从 `llama_batch` 迁移至 `llama_batch_ext`（参考 [PR #29601](https://github.com/ggml-org/llama.cpp/pull/29601)），以保障代码库的长期兼容性。  

> 🔗 **下一步行动**：在升级前，请审查上述链接中的 [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues) 与 [PRs](https://github.com/ggml-org/llama.cpp/pulls)，以确保生产环境的稳定性。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-29**

---

### **1. 今日亮点**  
Ollama v0.35.0 推出 **System One**，新增 `/v1/systemone` API，支持使用本地 Nimble 与 Tev 模型进行结构化决策，可实现高性能、低延迟的分类、路由和评分任务。这标志着 Ollama 战略重心从文本生成扩展至 AI 编排，目前 MLX 支持与文档已进入收尾阶段。

---

### **2. 发布与破坏性变更**  
- **v0.35.0**：正式推出 **System One API**（`/v1/systemone`），通过 TypeSafe 的 Jev 集成支持决策模型。  
  - *API 行为变更*：当 `/v1/chat/completions` 中省略 `top_p` 时，现默认为 `1.0`，且静默覆盖 Modelfile 中的 `PARAMETER top_p`。[Issue #18690](https://github.com/ollama/ollama/issues/18690)  
  - *迁移提示*：依赖自定义 `top_p` 默认值的现有应用需显式传参。  
- **严重计费缺陷**：因自动化计费逻辑故障，账户陷入 Stripe 重试循环，用户无法降级或切换套餐。[Issue #18683](https://github.com/ollama/ollama/issues/18683)  

---

### **3. 新模型与硬件支持**  
- **新架构支持**：  
  - 实验性支持 **K2 Horizon 模型**（架构：`"k2-horizon"`），来自 MBZUAI IFM（3.7B、7B、32B、36B MoE）。[Issue #18698](https://github.com/ollama/ollama/issues/18698)  
  - MLX 后端新增对 **GraniteForCausalLM** 的支持（适用于 IBM Granite 4.1/4.2 系列）。[PR #17972](https://github.com/ollama/ollama/pull/17972)  
- **后端增强**：  
  - MLX 现已支持 System One 决策模型。[PR #18701](https://github.com/ollama/ollama/pull/18701)  
  - RTX 5090 的 CUDA 兼容性已确认（尽管存在回归问题）。[Issue #18642](https://github.com/ollama/ollama/issues/18642)

---

### **4. 性能与优化**  
- **内存管理**：  
  - `OLLAMA_GPU_OVERHEAD` 现已被 `llama-server` 后端忽略——显存预留失败且无警告。[Issue #18679](https://github.com/ollama/ollama/issues/18679)  
  - 已修复：MLX 运行器现可报告 **实际内存占用**，包含 KV 缓存与计算图开销。[PR #14382](https://github.com/ollama/ollama/pull/14382)  
- **吞吐量与效率**：  
  - MTP 模型现在可在非思考轮次间复用缓存。[PR #17496](https://github.com/ollama/ollama/pull/17496)  
  - 在支持且安全的前提下自动启用 Flash Attention。[PR #13448](https://github.com/ollama/ollama/pull/13448)  
- **CPU 限制容器**：  
  - 默认 `n_threads` 忽略 cgroup CPU 配额与 cpuset，导致在资源限制下吞吐量下降约 45 倍。[Issue #17916](https://github.com/ollama/ollama/issues/17916)  

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 状态 |
|---------|-------|-------------|--------|
| 🔴 严重 | [Issue #18642](https://github.com/ollama/ollama/issues/18642) | 在 Windows 上使用 Cohere MoE 模型时，RTX 5090 出现 CUDA 非法内存访问崩溃。 | 开放 |
| 🔴 严重 | [Issue #18683](https://github.com/ollama/ollama/issues/18683) | 计费循环阻止订阅变更；支持响应迟缓。 | 开放 |
| 🟡 高 | [Issue #16532](https://github.com/ollama/ollama/issues/16532) | Windows 上 `gemma4` 无法处理图像（OCR 提示卡住）。 | 开放 |
| 🟡 中 | [Issue #18690](https://github.com/ollama/ollama/issues/18690) | OpenAI 兼容 API 中 `top_p` 被静默覆盖。 | 开放 |
| 🟡 中 | [Issue #12638](https://github.com/ollama/ollama/issues/12638) | Windows 11 上调用 API 时 GUI 弹出（在无头模式下不便）。 | 开放 |

> ✅ **修复中**：已提交 PR 修复 MLX System One 支持 ([#18701](https://github.com/ollama/ollama/pull/18701)) 与文档 ([#18702](https://github.com/ollama/ollama/pull/18702))。严重崩溃与计费循环尚未有修复。

---

### **6. 对应用开发者的意义**  
- **构建决策引擎**：使用 `/v1/systemone` 构建可扩展、低延迟的推理服务，适用于需要分类、路由或评分的智能体（如工单分派、模型选择）。  
- **避免隐式默认值**：在请求中显式设置 `top_p`，不要依赖 Modelfile 中的默认值。  
- **警惕 GPU 显存**：`OLLAMA_GPU_OVERHEAD` 在 `llama-server` 中无效——请手动通过 `--layers` 或 `--fit` 管理显存。  
- **容器化需谨慎**：在 cgroups 环境中，手动设置 `n_threads` 以避免性能灾难性下降。  
- **注意回归风险**：在修复前避免在 Windows 上使用 `gemma4` 图像处理；使用 RTX 5090 测试 `cohere2moe` 时需谨慎。  
- **尽早集成 MLX**：利用 MLX 对决策模型与 K2 Horizon 的日益增强支持，实现高效的本地推理。

> 💡 *实用技巧*：使用 `ollama ps` 监控 CPU/GPU 溢出情况——当模型完全运行在 CPU 时不会发出警告。[PR #17542](https://github.com/ollama/ollama/pull/17542) 已添加此警告。

---  
*数据来源：[github.com/ollama/ollama](https://github.com/ollama/ollama)*  
*生成时间：2026-09-29*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 摘要 — 2026-09-29**

---

#### **1. 今日亮点**  
LiteLLM v1.104.0-rc.1 引入了关键的安全强化功能，采用 **cosign 签名的 Docker 镜像**，进一步增强供应链信任。代理生态系统迎来重大升级：新增 **模型排行榜 UI**（PR #43649）、支持 **Airia 守卫规则**（PR #43657），并通过 `/v1/live/sessions` 接口扩展对 OpenAI Live 模型的 **实时 WebSocket 路由**（PR #43621）。这些更新体现了企业级大模型编排能力的持续成熟。

---

#### **2. 发布与破坏性变更**  
- **v1.104.0-rc.1**：首个引入 **cosign 镜像签名** 的版本，使用与 [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中相同的密钥。所有用户在升级前必须验证签名。  
- **v1.103.0**：与 RC 版本一同发布，未报告破坏性变更。  
- **迁移提示**：`max_batch_file_records`、`max_batch_daily_uploads` 和 `max_batch_file_download_size` 限制现已通过 PR #43632 强制执行，以防止批处理工作流中的滥用行为。

> 🔐 [验证 Docker 镜像签名](https://docs.sigstore.dev/cosign/overview/)  
> 📦 [v1.104.0-rc.1 发布说明](https://github.com/BerriAI/litellm/releases/tag/v1.104.0-rc.1)

---

#### **3. 新模型与硬件支持**  
- ✅ **OpenAI Live 模型**：通过新接口 `/v1/live/sessions`（PR #43621）实现完整代理支持，可为 `gpt-live-1` 等模型提供实时流式传输。  
- ✅ **Databricks 基础模型**：新增对 `system.ai.claude-opus-5` 与 `sonnet-5` 的支持，并正确处理 `reasoning` 块（PR #36931 已解决）。  
- ✅ **Bedrock Mantle 成本行**：为 Bedrock Mantle 上的 `claude-opus-5.5` 与 `sonnet-5.5` 添加成本条目（PR #43647），支持在 GovCloud 及区域部署中实现精准计费。  
- ✅ **llmman 提供商**：作为兼容 OpenAI 的本地推理后端添加（PR #38925），模型可通过 `http://localhost:17434/v1` 提供服务。

> 🛠️ [PR #43621: 代理实时会话](https://github.com/BerriAI/litellm/pull/43621)  
> 💡 [PR #38925: 添加 llmman 提供商](https://github.com/BerriAI/litellm/pull/38925)

---

#### **4. 性能与优化**  
- **按秒计价**：成本计算器新增 `cost_per_second` 字段（PR #43614），修复了 `input_cost_per_second` 与 `output_cost_per_second` 同时设为全费率导致的重复计费问题。  
- **批处理文件限制**：按文件大小（`max_batch_file_records`）和每日上传上限（PR #43632）强制执行，防止通过大规模批量上传发起拒绝服务攻击。  
- **守卫规则超时**：每次守卫规则检查现在均受 `litellm_params.timeout` 限制（PR #43648），避免策略评估过程中出现无限挂起。

> ⚙️ [PR #43614: 聊天按秒计价修复](https://github.com/BerriAI/litellm/pull/43614)  
> ⏱️ [PR #43648: 守卫规则超时边界控制](https://github.com/BerriAI/litellm/pull/43648)

---

#### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |  
|--------|------|--------|--------|  
| 高 | `sanitize_input_schema_for_anthropic` 丢弃根级 `anyOf`/`$ref` → 导致 `properties` 为空（Issue #43157） | 开放 | ❌ |  
| 高 | Redis 缓存因 `AbstractConnection.__init__()` 中的 `ssl_check_hostname` 失败（Issue #34614） | 开放 | ❌ |  
| 中 | `max_end_user_budget_id` 未持久化至数据库 → 预算重置跳过自动创建的用户（Issue #25386） | 开放 | ❌ |  
| 中 | 当 `reasoning.summary` 存在时，`/v1/responses` 使 Ollama 崩溃报错 `unhashable type: 'dict'`（Issue #37452） | 开放 | ❌ |  
| 低 | Azure GPT-4.1 同时拒绝 `max_tokens` 与 `max_completion_tokens`（Issue #31614） | 开放 | ❌ |  

> 🔍 [Issue #43157: Anthropic Schema 清理漏洞](https://github.com/BerriAI/litellm/issues/43157)  
> 🔒 [Issue #34614: Redis SSL 主机名检查崩溃](https://github.com/BerriAI/litellm/issues/34614)

---

#### **6. 对应用开发者的意义**  
- **安全优先部署**：在所有 LiteLLM Docker 镜像上使用 `cosign verify` 验证完整性——对生产网关至关重要。  
- **企业成本管控**：利用新的项目级预算（Issue #28750）与团队级 PTU 上限（PR #43043），在跨团队间实施财务治理。  
- **代理可靠性**：通过确保备用模型具备足够上下文窗口，避免回退链中的静默失败（Issue #31557）。  
- **守卫规则健壮性**：启用受 `timeout` 限制的守卫规则（PR #43648），防止长时间检查阻塞应用。  
- **实时应用构建**：通过 `/v1/live/sessions`（PR #43621）使用 OpenAI Live 模型构建低延迟代理——适用于语音、实时聊天或交互式智能体。

> 🧩 [指南：使用 LiteLLM 构建可靠智能体](https://docs.litellm.ai/docs/proxy/agents)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-29**

---

### **1. 今日亮点**  
Unsloth v0.1.900-beta 引入了 **Laya 决策模型** 和统一的 **技能库**，支持本地运行 Jev（开源 Laya）等高级推理智能体。本次发布在 Apple Silicon 上实现了图像与视频生成速度 **约 4.5 倍提升**，同时大幅改进了技能编辑器和文档处理能力。此外，关键稳定性修复解决了 GPU 卸载、工具调用卡死以及杀毒软件误报等问题。

---

### **2. 发布与破坏性变更**  
- **v0.1.900-beta**：正式发布，新增 **决策模型支持** 和 **技能编辑器**，可本地创建与管理智能体行为。  
  🔗 [GitHub Release v0.1.900-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.900-beta)  
- **破坏性变更说明**：`unsloth start opencode` 现在无论 `max_tokens` 设置如何，输出上限均为 8192 个 token —— 此为已知问题 ([#12009](https://github.com/unslothai/unsloth/issues/12009))，将在后续补丁中修复。

---

### **3. 新模型与硬件支持**  
- ✅ **Laya 决策模型** 已通过 `unsloth_zoo` 支持本地推理与微调。  
- ✅ 已请求支持 **Idefics3 架构** ([#4079](https://github.com/unslothai/unsloth/issues/4079))，包括 Granite Docling VLM（258M），目前正等待原生优化。  
- ✅ **MLX on Apple Silicon**：已为 Laya 检查点添加 fp16 支持 ([#12256](https://github.com/unslothai/unsloth/pull/12256))。  
- ✅ **AMD ROCm + NVIDIA CUDA 混合系统**：多个 PR ([#12248](https://github.com/unslothai/unsloth/issues/12248), [#12246](https://github.com/unslothai/unsloth/issues/12246), [#12245](https://github.com/unslothai/unsloth/issues/12245)) 实现跨 GPU 的选择性后端分配；但当前可见性与路由仍部分失效。  
- ⚠️ **Qwen 3.8 Flash Next (MLX)** 在 M5 Ultra 上无法加载 ([#12257](https://github.com/unslothai/unsloth/issues/12257)) —— 可能由模型格式或内存布局不兼容导致。

---

### **4. 性能与优化**  
- 🚀 **图像/视频生成**：通过优化的 Metal 内核与改进的卸载规划，在 Apple Silicon 上实现 **约 4.5 倍加速** ([#12256](https://github.com/unslothai/unsloth/pull/12256), [#12043](https://github.com/unslothai/unsloth/pull/12043))。  
- 🚀 **Laya 推理**：通过仅标记头与 CUDA 图实现更快决策，无需依赖 `torch.compile` ([#12224](https://github.com/unslothai/unsloth/pull/12224))。  
- 📈 **内存规划**：自动卸载现使用实测激活大小，而非固定 8 GiB/每百万像素预算 —— 避免小显存显卡出现 VRAM 资源耗尽问题 ([#12043](https://github.com/unslothai/unsloth/pull/12043))。  
- 📊 **工具调用效率**：修复防止终端/Python 工具调用期间无限挂起的问题 ([#12234](https://github.com/unslothai/unsloth/pull/12234))，提升高负载下的可靠性。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|---------|------|--------|--------|
| 🔴 高 | 工具调用超过 `max_tool_call_duration` 后无限挂起 | 开放 ([#12048](https://github.com/unslothai/unsloth/issues/12048)) | [#12234](https://github.com/unslothai/unsloth/pull/12234) |
| 🔴 高 | 无效 base64 错误即使图像返回有效也会破坏聊天上下文 | 开放 ([#12058](https://github.com/unslothai/unsloth/issues/12058)) | [#12236](https://github.com/unslothai/unsloth/pull/12236) |
| 🟡 中 | Unsloth Desktop 安装程序被 Bitdefender/Windows AV 误报 | 已关闭 ([#12140](https://github.com/unslothai/unsloth/issues/12140), [#11397](https://github.com/unslothai/unsloth/issues/11397)) | N/A（外部检测） |
| 🟡 中 | AMD 图像/视频生成在 RX 7600/Radeon 8060S 上失败 | 开放 ([#9897](https://github.com/unslothai/unsloth/issues/9897)) | 待定 |
| 🟡 中 | `CUDA_VISIBLE_DEVICES=""` 即使 ROCm 激活也隐藏 AMD 显卡 | 开放 ([#12245](https://github.com/unslothai/unsloth/issues/12245)) | [#12251](https://github.com/unslothai/unsloth/pull/12251) |

> *注：多个回归问题源于混合 GPU 环境与杀毒软件干扰——常见于开发者工作站。*

---

### **6. 对应用开发者的意义**  
- **构建智能体**：利用 Laya 决策模型与新推出的 **技能编辑器**，实现模块化、可复用的智能体逻辑。  
- **优化 Apple Silicon**：借助 MLX + fp16 + CUDA 图，在视觉语言与决策工作流中实现低延迟推理。  
- **避免瓶颈**：在多对话场景中谨慎使用 GGUF 模型 —— 图像请求可能因 base64 解析问题阻塞其他会话 ([#12236](https://github.com/unslothai/unsloth/pull/12236))。  
- **混合 GPU 配置**：在完整跨 GPU 路由稳定前，建议在设置中显式指定后端（ROCm/CUDA）；避免依赖混合系统上的自动检测。  
- **导出工作流**：使用 `export_metadata.json` 时需谨慎 —— 在 Mac 推送时可能泄露本地路径 ([#12239](https://github.com/unslothai/unsloth/pull/12239))；共享前建议清理敏感信息。  

👉 **最佳实践**：始终在高负载下测试工具调用，并监控是否存在卡死进程。使用 **系统标签页** 验证模型实际运行的 GPU —— 尤其在混合硬件上使用 CUDA/ROCm 时 ([#12251](https://github.com/unslothai/unsloth/pull/12251))。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*