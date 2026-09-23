# AI 基础设施日报 2026-09-23

> 生成时间: 2026-09-23 00:54 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-23**

---

### **1. 生态概览**  
AI推理与服务生态正进入一个专业化和硬件感知优化的新阶段，由NVIDIA SM100/Blackwell（SM120）、AMD ROCm gfx950/gfx942以及Intel XPU等下一代架构驱动。各项目日益分化：高性能推理引擎（vLLM、SGLang）聚焦吞吐量与分布式扩展能力的极限突破，而本地运行时（llama.cpp、Ollama）则更注重可移植性与开发者体验。与此同时，网关（LiteLLM）与微调平台（Unsloth）正演变为全栈代理赋能者，支持多模态并具备生产级可靠性特性。

---

### **2. 活动对比**

| 项目       | 开放问题数（↑） | 合并的PR数（↑） | 发布状态       | 备注 |
|---------------|------------------|------------------|------------------------|-------|
| **vLLM**      | 874 (+12)        | 762 (+315)       | v0.30.0 已上线           | 贡献者活跃度高；稳定性问题仍存 |
| **SGLang**    | 789 (+9)         | 408 (+14)        | 无新发布         | 工程推进强劲；关键回归问题正在审查 |
| **llama.cpp** | 1,415 (+6)       | 293 (+14)        | b11115-b11113 系列   | 聚焦稳定性修复；新功能较少 |
| **Ollama**    | 2,342 (+11)      | 187 (+6)         | v0.34.1 已发布       | 用户端缺陷数量高；macOS GUI 修复完成 |
| **LiteLLM**   | 1,028 (+5)       | 426 (+8)         | v1.102.0 已发布      | 安全性与成本追踪升级；审计性为重点 |
| **Unsloth**   | 1,253 (+8)       | 1,160 (+23)      | v0.1.814-beta 已发布 | 快速开发周期；测试模型支持激增 |

> *数据反映2026-09-22至2026-09-23期间活动情况。“↑”表示近期趋势。

---

### **3. 模型支持竞赛**

| 新模型 / 架构     | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash**       | ✅ (MXFP8 + FlashMLA V4.1) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**             | ✅ (SM120, rope-free MLA) | ✅ (ROCm MXFP4) | ❌ | ✅ (动态图像分辨率) | ❌ | ❌ |
| **Kimi-K3**                   | ⚠️ (跟踪中) | ✅ (ROCm MXFP4) | ❌ | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1**            | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (本地 GGUF/原生) |
| **NVIDIA Blackwell (SM120)**  | ✅ (GLM-5.3-Flash) | ❌ | ❌ | ✅ (待修复) | ✅ (新模型) | ❌ |
| **AMD ROCm (gfx950/gfx942)**  | ✅ (Qwen3.8-2.4T-A95B 路线图) | ✅ (Kimi-K3, GLM-5.2) | ✅ (A8 Q4_K DP4A) | ❌ | ❌ | ✅ (RDNA1 训练) |
| **Intel XPU**                 | ✅ (MoE 全连接 EP) | ❌ | ✅ (SYCL IQ3 布局) | ❌ | ❌ | ✅ (训练不稳定) |

**胜出者**：**SGLang** 在**多硬件模型一致性**方面领先，尤其在**ROCm**与**NPU CANN**支持上表现突出。  
**视觉语言领域领导者**：**Unsloth** 支持 **Qwen-Image-2.1** 实现本地全功能运行——目前唯一实现该能力的项目。  
**最全面的硬件覆盖**：**vLLM** 在 **NVIDIA Hopper+ 和 Blackwell** 上占据主导地位，广泛集成 MXFP8 与 FlashMLA。

---

### **4. 性能前沿**

| 优化方向         | vLLM                     | SGLang                    | llama.cpp               | Ollama                  | LiteLLM                | Unsloth               |
|-----------------------------|--------------------------|---------------------------|--------------------------|-------------------------|------------------------|------------------------|
| **KV缓存与状态管理** | MXFP8/4、前缀缓存、异步预取 | 统一 Radix 缓存、LMCache 可扩展性 | L1 分割、MTMD 安全性检查 | Qwen 3.8 MLX 中保持 BF16 | Rust 基础成本引擎 | 离线 top-k logprobs |
| **批处理与并行**  | CUDA 图、可拆分配置、MTP | DCP + Helix（fi_a2a 默认） | MTMD 稳定性、分组专家 | 动态提示预算 | 速率限制处理 | 多卡 LoRA（实验性） |
| **量化**            | MXFP8/4 → FP8 专家反量化、AWQ 融合 | MXFP4 密集-MoE、拆分推测性归约 | A8 Q4_K DP4A、IQ3_S/IQ4_NL | BF16 保持、MXFP8 | Cosign 签名图像 | FP8 检查点、打包 INT4/INT8 |
| **内核级优化** | 融合 AWQ-GEMM、Triton 注意力瓦片 | 保留占用率的 JIT 内核 | Vulkan/Xe Flash Attention、SYCL GEMM | MLX 特有 TPS 提升 | 端到端测试鲁棒性 | VAE 内核编译 |
| **分布式服务**     | 异步 Engram 预取 | DCP + Helix（fi_a2a 默认） | ❌ | ❌ | ❌ | ❌ |

> **趋势**：**分布式推理**（SGLang）与**硬件感知量化**（vLLM、Unsloth）已成为核心差异化因素。**内核级调优**仍是实现子10%延迟提升的主要手段。

---

### **5. 层次定位**

| 项目       | 主要层级                  | 角色摘要 |
|---------------|----------------------------------|--------------|
| **vLLM**      | **推理引擎**             | 在 NVIDIA/AMD 上提供高吞吐、低延迟服务；专为大规模部署优化 |
| **SGLang**    | **分布式推理框架** | 先进并行机制（DCP、Helix）、PD 解耦、通信后端抽象 |
| **llama.cpp** | **本地运行时 / 嵌入式后端** | 通过 GPU 后端（Vulkan、OpenCL、SYCL）实现跨平台推理；适合边缘与嵌入式系统 |
| **Ollama**    | **开发者友好网关**   | 简化命令行/API；聚焦易用性、多模态输入与代理工作流 |
| **LiteLLM**   | **多提供商网关**        | 统一 API 层，支持跨云服务商的成本追踪、速率限制与安全控制 |
| **Unsloth**   | **微调 + 代理运行时**  | 本地训练（QLoRA）、推理加速与多模态代理部署的一体化平台 |

> **关键洞察**：技术栈正出现两极分化：**工程师**使用 vLLM/SGLang 实现规模化；**开发者**依赖 Ollama/LiteLLM 快速原型验证；**研究人员**则转向 Unsloth 进行以代理为中心的训练。

---

### **6. 趋势信号**

#### 🔍 **新兴行业趋势**：
1. **硬件原生优化已成为标配**  
   - MXFP8/4、FlashMLA 以及针对 SM100/SM120 的专用内核已不再是实验性功能——它们是实现竞争力性能的必要条件。  
   - *信号*：预计未来6个月内，所有主流推理栈都将采用硬件感知量化与内核融合。

2. **多模态代理正走向本地化**  
   - Unsloth 对 Qwen-Image-2.1 的支持标志着一个转折点：**视觉语言代理如今可完全离线运行，无需依赖云端**。  
   - *信号*：本地多模态推理将成为代理应用的基本要求。

3. **分布式服务已超越简单流水线并行**  
   - SGLang 将 `fi_a2a` 设为默认通信后端，表明向**低延迟、可扩展的节点间协调**转变。  
   - *信号*：未来的代理后端必须集成 DCP/Helix 支持，以避免性能瓶颈。

4. **企业级网关的安全与可审计性不可妥协**  
   - LiteLLM 的 cosign 签名、需认证访问的 `/metrics` 接口及调用后收据中间件，反映了日益增长的合规需求。  
   - *信号*：生产级 AI 系统必须包含 **供应链验证** 与 **防篡改日志记录**。

#### 🛠️ **应用开发者应关注事项**：
- **避免在多轮对话代理中使用 `GLM-5.3-Flash`** —— 已知重复性缺陷（vLLM Issue #56605）。  
- **不要在 sm_107 GPU 上同时使用 `flashinfer_megamoe` 与 EAGLE 推测** —— 存在崩溃风险（SGLang #40623）。  
- **监控 `/metrics` 抓取行为** —— llama.cpp (#29104) 中存在无声挂起问题，LiteLLM 存在 PII 风险。  
- **谨慎使用 `--cache-disk`** —— 长上下文应用可能很快需要该选项（llama.cpp #20697）。  
- **升级 Ollama 前务必验证稳定性** —— v0.34.1 存在多个 UI/代理回归问题。

> ✅ **建议**：对于生产级代理，**组合使用 vLLM（推理）+ SGLang（分布式）+ LiteLLM（网关）+ Unsloth（微调）**——此组合提供最大控制力、可扩展性与安全性。

---  
*报告由高级AI基础设施分析师编制 | 2026-09-23*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-23**

---

### **1. 今日亮点**  
vLLM v0.30.0 版本正式发布，全面支持 **DeepSeek-V4.1-Flash**，利用 MXFP8 存储与 FlashMLA V4.1 技术在 SM100 GPU 上实现显著的预填充吞吐量提升。关键进展包括异步 Engram 预取机制，以及针对 NVIDIA（SM90/SM100）和 AMD ROCm（gfx950/gfx942）平台的 DeepSeek-V4 新优化。

---

### **2. 发布与破坏性变更**  
- **v0.30.0** 已上线，共包含 762 次提交，来自 315 名贡献者（其中 104 人为新贡献者）。未报告重大 API 破坏性变更；重点仍聚焦于性能与稳定性改进。  
  🔗 [GitHub Release v0.30.0](https://github.com/vllm-project/vllm/releases/tag/v0.30.0)

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1-Flash**：通过 PR #56214、#56228、#56208 实现与 SM100（Hopper+）上 MXFP8 KV 缓存及 FlashMLA V4.1 的完整集成。  
- ✅ **GLM-5.3-Flash**：新增对 SM120（Blackwell）的支持，采用无 rope 的稀疏 MLA 路径——对 RTX PRO 6000 至关重要（PR #53963）。  
- ✅ **Kimi K3**：模型支持已开启追踪问题（Issue #50001）；ROCm CI 测试组已添加（PR #58012）。  
- ✅ **AMD ROCm (gfx950 / MI355X)**：Qwen3.8-2.4T-A95B 的性能优化路线图已启动（Issue #57149）。  
- ✅ **Intel XPU**：批处理 MoE 的 all-to-all EP 后端正在开发中（PR #46871）。

---

### **4. 性能与优化**  
- **预填充加速（NVIDIA）**：在 `VLLM_BATCH_INVARIANT=1` 条件下，为 SM89 引入融合 AWQ 反量化 + GEMM 内核（`awq_gemm_fused_fp32`）（PR #57047），降低内存带宽压力。  
- **解码优化（ROCm）**：将 RDNA3/RDNA4 上的 Triton 预填充注意力 tile 缩小，以提升占用率（PR #58225）。  
- **DiffusionGemma**：单遍采样器统计内核在高并发场景下有效降低解码延迟（PR #58226）。  
- **MoE 优化**：针对 Hopper 平台的 DeepSeek-V4，可选启用 MXFP4 → 块 FP8 专家反量化（无损），显著提升预填充速度（PR #53709）。  
- **CUDA Graphs**：在 `VLLM_BATCH_INVARIANT` 下默认使用可中断的 CUDA Graphs，改善矩阵乘法配置调优（PR #57586）。

---

### **5. 稳定性与回归问题**  
- ⚠️ **严重回归**：GLM-5.3-Flash 在多轮代理使用中出现“乱语”重复现象（Issue #56605，19 条评论）。*暂无修复 PR*。  
- ⚠️ **退化输出**：长时间推理解码后出现解码退化（Issue #56868，22 条评论）。与前缀缓存及状态管理相关。  
- ⚠️ **ROCm 解码损坏**：在 AMD MI325X 上，提示长度 ≥4k token 时发生静默检索损坏（Issue #52109，11 条评论）。可在夜间构建中复现。  
- ⚠️ **GPU 崩溃**：Intel Arc B70（Battlemage）在运行时触发 GP fault 并导致 BCS 引擎重置（Issue #41663，40 条评论）。影响 `intel/vllm:0.17.0-xpu`。  
- ✅ **已合并修复**：  
  - 跳过子模型视图的 `VllmConfig` 重新验证（PR #58212）。  
  - 修复 P/D 分离中的误路由竞争条件（PR #51681）。  

---

### **6. 对应用开发者的影响**  
- **推荐使用 v0.30.0** 以获得 **DeepSeek-V4.1-Flash** 的最佳性能，以及在 Blackwell GPU 上更稳定的 **GLM-5.3-Flash** 支持。  
- 若需动态批处理，请避免在 `VLLM_BATCH_INVARIANT=1` 时使用 `torch.compile`；建议通过 PR #57586 切换至可中断图以实现更好的运行时自适应。  
- 若部署 **多轮代理系统**，请谨慎对待 **GLM-5.3-Flash**，因其存在已知重复缺陷；请密切关注 Issue #56605。  
- 针对 **AMD ROCm 部署**，请预期持续调优：使用 `MI355X` 特定基准测试（Issue #57149），并仔细测试大提示负载。  
- 在验证 Issue #53912（混合 Mamba/GDN 模型中的损坏问题）前，勿轻易启用 **前缀缓存 + MTP**。  
- 利用 **新解析器缓存功能**（Issue #57571），确保流式重试过程中工具调用 ID 的稳定性。

🔗 [vLLM GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-23

---

### **1. 今日亮点**  
SGLang 在高级推理优化方面持续发力，**解码上下文并行（DCP）** 和 **Helix 并行** 取得关键进展，现已将 `fi_a2a`/`a2a` 设为所有模型的默认通信后端。针对 **基于 NIXL 的 PD 分离架构**、**EAGLE 伪编码稳定性** 以及 **AMD ROCm 对 MXFP4 量化模型的支持** 的关键修复已合并或正在评审中，标志着向生产级分布式服务迈进的强劲势头。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。暂无新版本或破坏性 API/config 变更公告。

---

### **3. 新模型与硬件支持**  
- ✅ **Kimi-K3 (MXFP4)**：通过 PR #40811 添加完整 ROCm 支持，实现对 Quark 量化检查点的 AMD GPU 推理。  
- ✅ **SenseNova-U1/U1.5**：跟踪问题 #37742 确认正基于官方 OpenSenseNova 仓库推进集成工作。  
- ✅ **NPU CANN 9.1.0**：在 PR #40524 中更新以匹配当前 Ascend 工具链版本，支持 Python 3.12。  
- ✅ **ROCm GLM-5.2 解码路径**：PR #40358 引入 MXFP4 密集 MoE 专家、解码形状的 tile 划分以及 AMD 上的分离伪编码归约。

> 🔗 [PR #40811](https://github.com/sgl-project/sglang/pull/40811) | [PR #40358](https://github.com/sgl-project/sglang/pull/40358) | [PR #40524](https://github.com/sgl-project/sglang/pull/40524)

---

### **4. 性能与优化**  
- 🚀 **DCP + Helix 并行**：`fi_a2a`/`a2a` 后端现已成为所有模型的默认配置 (#39165)，显著提升跨节点通信效率。融合 `fi_a2a` + LSE 的组合仍待实现，但属于高优先级任务 (#29736)。  
- ⚙️ **内存池与分离架构**：PRs #39731 和 #40794 统一了逻辑 token 容量报告机制，并优化了 PD+DCP 工作流中的 DFlash 草稿 KV 传输逻辑。  
- 🔧 **内核优化**：  
  - PR #40767 为 JIT 内核新增保留占用率的 L1 切割偏好。  
  - PR #40800 与 #40799 修复 Nemotron MTP 与 LongCat MoE 快捷路径中的冗余残差累加问题，降低计算开销。  
- 💡 **统一基数缓存**：PR #38652 实现 LMCache 作为外部后端；PR #40807 移除不可达的 `RadixCache` 路径，精简代码库。

> 🔗 [Issue #29736](https://github.com/sgl-project/sglang/issues/29736) | [PR #40767](https://github.com/sgl-project/sglang/pull/40767) | [PR #38652](https://github.com/sgl-project/sglang/pull/38652)

---

### **5. 稳定性与回归问题**  
今日报告关键稳定性问题：

| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|----------|
| 🔴 高 | [#40623](https://github.com/sgl-project/sglang/issues/40623) | 在结合 `flashinfer_megamoe` 与 EAGLE 伪编码解码时，Triton 融合 MoE 内核出现非法内存访问（GLM-5.2-NVFP4, sm_107） | ❌ 待处理 |
| 🔴 高 | [#33397](https://github.com/sgl-project/sglang/issues/33397) | 2× H200 环境下并发场景中输出损坏（DeepSeek-V4-Flash + DP attention） | ❌ 待处理 |
| 🟡 中 | [#36333](https://github.com/sgl-project/sglang/issues/36333) | 流式客户端断连后产生僵尸请求，导致 max_tokens 解码及 "state was deleted" 日志 | ❌ 来自 #34160 回滚的回归问题 |
| 🟡 中 | [#39831](https://github.com/sgl-project/sglang/issues/39831) | GLM-5.3-Flash 视觉功能因固定 `transformers==5.12.1` 缺少 `glm5_next` 而损坏，降级至 `TokenizersBackend` | ❌ 待处理 |

> 注意：其中多项回归问题影响生产规模部署，尤其涉及 EAGLE 伪编码和多 GPU 并发场景。

---

### **6. 对应用开发者的影响**  
- **默认使用 `--dcp-comm-backend fi_a2a`**，以在多节点环境中获得更好可扩展性——除非调试，否则无需手动覆盖。  
- **在 sm_107 GPU 上避免使用 `flashinfer_megamoe` + EAGLE 伪编码**，直到 PR #40623 修复前，可能引发崩溃。  
- **期待更强的 AMD 支持** —— Kimi-K3 MXFP4 与 GLM-5.2 ROCm 路径现已稳定，可投入测试。  
- **注意长时流式会话风险** —— 断连可能导致僵尸请求残留；请监控日志中 `state was deleted` 提示。  
- **未来兼容性布局**：统一基数缓存重构 (#20415) 与 LMCache 集成 (#38652) 表明，代理与缓存层将获得更深层的 KV 缓存可扩展能力。

> 🔗 [RFC #20415](https://github.com/sgl-project/sglang/issues/20415) | [PR #38652](https://github.com/sgl-project/sglang/pull/38652)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 摘要 – 2026-09-23**

---

### **1. 今日亮点**  
最新更新聚焦于服务器与后端层的关键稳定性修复，特别是模型加载竞争条件和 GPU 上下文管理问题。针对 Intel Xe Flash Attention（Vulkan）的新内核优化，以及 OpenCL 上 A8 Q4_K DP4A 支持的增强，显著提升了现代硬件上的性能表现。值得注意的是，已合并一项修复，防止在 `/metrics` 数据采集过程中出现无声挂起——这对可观测性流水线至关重要。

---

### **2. 发布与破坏性变更**  
- **b11115**：为 OpenCL（A8 量化）新增 `kernel_gemm_noshuffle_q4_k_q8_1_dp4a_ila_a8_bin`，提升兼容设备上的推理效率。  
  🔗 [PR #29056](https://github.com/ggml-org/llama.cpp/pull/29056)  
- **b11113**：通过队列路由所有模型加载（`server: fix router eviction races`），修复了模型加载的竞争条件，防止快速路径加载的模型被过早淘汰。  
  🔗 [PR #29217](https://github.com/ggml-org/llama.cpp/pull/29217)  
- **b11110**：在 MTMD（多标记模型调度器）中引入健全性检查，增强了高并发场景下的鲁棒性。  
  🔗 [PR #29276](https://github.com/ggml-org/llama.cpp/pull/29276)

> ✅ *今日未报告任何破坏性 API 变更。*

---

### **3. 新模型与硬件支持**  
- **OpenCL**：新增对 **A8 量化 Q4_K** 内核的支持，启用 DP4A 指令，可在具备较新计算能力的 AMD GPU 上实现更快的推理速度。  
  🔗 [PR #29056](https://github.com/ggml-org/llama.cpp/pull/29056)  
- **Vulkan**：扩展 **Intel Xe Flash Attention (FA)** 优化，覆盖 **Xe-LPG Plus/Xe2/Xe3** 架构，包括 split-k 路径改进和主机代码更新。  
  🔗 [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406)  
- **SYCL**：持续推进 Intel Arc Pro B70 的优化工作，包括 IQ3 布局重排及持久化 MMVQ 布局支持。  
  🔗 [PR #29107](https://github.com/ggml-org/llama.cpp/pull/29107)

---

### **4. 性能与优化**  
- **Flash Attention（Vulkan）**：优化 Intel Xe GPU 的 FA 内核路径，在长上下文场景中降低延迟；修复此前在 A770 Linux 平台观察到的测试失败问题。  
  🔗 [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406)  
- **CUDA**：在 flash attention KV 缓存中加入 `IQ4_NL` 支持，并修复反量化内核；同时引入 **分组专家 top-k 融合**，恢复因专家分组导致约 80% 以上的性能损失。  
  🔗 [PR #29181](https://github.com/ggml-org/llama.cpp/pull/29181), [PR #29292](https://github.com/ggml-org/llama.cpp/pull/29292)  
- **SYCL**：针对使用 XMX 瓦片的分组 MoE 模型优化 GEMM 调度，提升 Intel Arc 计算单元的利用率。  
  🔗 [PR #29245](https://github.com/ggml-org/llama.cpp/pull/29245)

---

### **5. 稳定性与回归问题**  
- **严重**：当被 VictoriaMetrics 抓取时，`llama-server` 会无声停止处理请求（`/metrics` 端点）。  
  🔗 [Issue #29104](https://github.com/ggml-org/llama.cpp/issues/29104) *(暂无修复 PR)*  
- **高危**：服务器从睡眠状态唤醒时，令牌计数路由发生 SIGSEGV，由陈旧的词表/mctx 捕获引起。  
  🔗 [Issue #29188](https://github.com/ggml-org/llama.cpp/issues/29188) *(暂无修复 PR)*  
- **中等**：在 #20087 之后，Qwen3.5 检查点出现崩溃，可能源于上下文检查点损坏。  
  🔗 [Issue #20176](https://github.com/ggml-org/llama.cpp/issues/20176) *(修复待定)*  
- **回归**：自 `b10780` 以来，Vulkan/RDNA3 上提示速度显著下降——与近期 FA 或内存管理变更相关。  
  🔗 [Issue #28752](https://github.com/ggml-org/llama.cpp/issues/28752)

> ⚠️ *多个稳定性问题仍未解决；请密切监控 CI 与发布说明。*

---

### **6. 对应用开发者的启示**  
- **谨慎使用 `--cache-disk`**：尽管尚未实现，但对基于磁盘的上下文卸载（#20697）的强烈需求预示未来对可扩展长上下文应用的需求，敬请关注后续功能。
- **避免无差别抓取 `/metrics`**：若使用 Prometheus/VictoriaMetrics，建议禁用 `/metrics` 或临时修补服务器，直至 #29104 修复。
- **针对 Intel Arc 与 AMD RDNA3 优化**：利用 b11115+ 中的新内核，提升受支持硬件上的吞吐量。在可用情况下优先选用 `IQ3_S`、`IQ4_NL` 与 `Q4_K_A8` 量化方案。
- **推测解码需谨慎**：注意贪婪推测解码在量化模型（如 Q4_K_M）上可能与全精度模型产生偏差——务必仔细校验输出。  
  🔗 [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618)

> 🛠️ *最佳实践：始终将推测解码输出与非推测基准进行对比测试，尤其在量化目标上。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# **Ollama Digest – 2026-09-23**

---

### **1. 今日亮点**  
Ollama 团队在多模态推理方面取得显著进展，为 Gemma 4 引入了动态图像分辨率支持，并对 Qwen 3.8 在 MLX 上的性能进行了优化。针对 macOS GUI 响应性以及 NVIDIA Blackwell GPU 上的 CUDA 检测问题，关键稳定性修复已合并；同时，新功能如提升网页搜索限制（每响应最高达 10 次）和结构化输出改进也已进入评审阶段。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何发布或破坏性变更。*  
然而，**v0.34.1**（本周早些时候发布）引入了一个严重的 macOS GUI 回归问题，原因是 `osascript` 阻塞主线程 —— 该问题已通过 PR [#18601](https://github.com/ollama/ollama/pull/18601) 解决，该提交将 System Events 轮询替换为直接进程检查。

---

### **3. 新模型与硬件支持**  
- ✅ **Gemma 4**：根据输入分辨率，在 70–1120 个图像标记之间动态选择标记预算 ([PR #18603](https://github.com/ollama/ollama/pull/18603))，解决了高分辨率图像下的 OCR 问题。  
- 🚀 **Qwen 3.8 Flash Next**：通过在关键层保留 BF16 并在其他位置采用 MXFP8 量化，实现 MLX 特定的内存效率优化 ([PR #18078](https://github.com/ollama/ollama/pull/18078))。  
- 🔧 **NVIDIA Blackwell (RTX 50 系列)**：修复了在驱动程序 616.92 下 Windows 上的 CUDA VRAM 检测失败问题 ([Issue #18581](https://github.com/ollama/ollama/issues/18581)，相关 PR 待提交）。  
- 💻 **Docker + MLX/Vulkan**：为容器中的 Nvidia GPU 支持添加了缺失的库和配置 ([PR #18592](https://github.com/ollama/ollama/pull/18592))。

---

### **4. 性能与优化**  
- **Qwen 3.8 提示处理（MLX）**：在 M5 Max 上处理 8k 标记时，提示吞吐量（TPS）最高提升 **+19.1%** ([PR #18550](https://github.com/ollama/ollama/pull/18550))。  
- **Gemma 4 图像分辨率选择**：消除对高分辨率输入的不必要的下采样，保留细节的同时不牺牲效率。  
- **内存效率（Qwen 3.8 MLX）**：通过将非专家路径和 QSA 投影保持在 BF16 而非 NVFP4，减轻了内存压力。  
- **网页搜索限制提升**：从 3 次提升至 **每响应 10 次** ([PR #18602](https://github.com/ollama/ollama/pull/18602))。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|--------|------|--------|--------|
| ⚠️ 高 | v0.34.1 更新后，macOS 应用因主线程中 `osascript` 导致冻结 | 已关闭 | [PR #18601](https://github.com/ollama/ollama/pull/18601) |
| ⚠️ 高 | 长文档处理超过 60 秒后静默失败（无 UI 反馈） | 开放 | — |
| ⚠️ 高 | `top_logprobs` 被限制在 20，尽管后端支持更高值 | 开放 | [PR #18590](https://github.com/ollama/ollama/pull/18590) |
| ⚠️ 高 | `homebrew` 安装的 ollama 无法对 mlx 模型提供结构化输出 | 开放 | [PR #18597](https://github.com/ollama/ollama/pull/18597) |
| ❌ 严重 | `qwen3.8:27b` 在 `/v1/chat/completions` 上挂起，但可通过 CLI/API 正常工作 | 开放 | [Issue #17790](https://github.com/ollama/ollama/issues/17790) |
| ⚠️ 中 | Ollama Cloud：在代理工作流中频繁出现“模型不可用”错误 | 开放 | [Issue #18293](https://github.com/ollama/ollama/issues/18293) |

> 注：多个回归问题源于近期对 `thinking`、`format` 和 `structured output` 处理逻辑的改动——尤其影响 `qwen3` 系列模型。

---

### **6. 对应用开发者的启示**  
- **在使用 Gemma 4 进行视觉任务时动态使用 `max_soft_tokens`**，避免硬编码 280 标记预算的假设。  
- **预计旧版 Ollama（0.33.x）性能下降**：用户可能在 RTX 3090 上看到比 0.32.13 版本慢约 5 倍的标记生成速度（[Issue #18225](https://github.com/ollama/ollama/issues/18225)）；建议在修复发布前锁定稳定版本。  
- **除非使用自定义后端，否则避免设置 `top_logprobs > 20`**：Ollama 强制实施硬性上限，而 llama.cpp 或原生运行器并不强制此限制。  
- **谨慎处理结构化输出**：当 `/api/generate` 中设置了 `format` 时，`think: true` 会被忽略，但在 `/api/chat` 中有效——请保持端点一致性。  
- **注意长周期代理中的静默失败**：超时时间超过 60 秒时无任何 UI 反馈（[Issue #18368](https://github.com/ollama/ollama/issues/18368)）。  
- **生产部署时**，推荐使用 `ollama export/import` 进行模型迁移（[PR #18578](https://github.com/ollama/ollama/pull/18578)），而非手动复制 blob。

> 🔗 *查看完整问题追踪列表：* [github.com/ollama/ollama/issues](https://github.com/ollama/ollama/issues)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 摘要 — 2026-09-23**

#### **1. 今日亮点**  
最新版本 **v1.102.0** 引入了通过 **cosign 签名的 Docker 镜像** 增强的安全性，进一步强化了供应链信任。关键修复解决了本地部署模型的预算控制失效问题（#14004）、速率限制重复计数问题（#34140），以及流式请求中成本追踪的缺陷（#42161）。新提交（#42587）确保评估支出正确归因于管理员，提升了企业部署中的可审计性。

#### **2. 发布与破坏性变更**  
- **v1.102.0** 已发布，采用 **基于 cosign 的镜像签名**（[提交 `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)）——所有官方镜像现可通过 `cosign verify` 验证。  
- **回滚提交 PR #42618** 已合并至 `stable/1.102.x`：正确处理上游握手拒绝情况（防止出现 1006 关闭码），并改进 OTEL 元数据传播。  
- **安全更新**：`/metrics` 端点现在需要显式认证（`require_auth_for_metrics_endpoint: true`），以防止多租户环境下敏感信息泄露（[#24530](https://github.com/BerriAI/litellm/issues/24530)）。

#### **3. 新模型与硬件支持**  
今日未新增模型或硬件后端。但：  
- **Azure** 现支持 **20 个新增模型**，包括 `gpt-5.x` 对话模型及 Grok 变体，通过更新定价同步实现（[#42594](https://github.com/BerriAI/litellm/pull/42594)）。  
- **OpenRouter** 已更新 **19 个模型** 的价格，包含此前缺失的 9 项条目（[#42592](https://github.com/BerriAI/litellm/pull/42592)）。  
- **Fireworks AI** 新增 **2 个模型**，并完成完整定价目录集成（[#42590](https://github.com/BerriAI/litellm/pull/42590)）。

#### **4. 性能与优化**  
- **基于 Rust 的成本引擎扩展**（[#42620](https://github.com/BerriAI/litellm/pull/42620)）：独立的 Rust 定价模块现已支持图像、OCR、视频、批量、防护墙、分级及 Gemini 基座成本计算——实现跨提供商更快、更一致的成本核算。  
- **端到端测试容错能力提升**（[#42628](https://github.com/BerriAI/litellm/pull/42628)）：CI 现在可容忍提供方侧的临时异常（如 Mistral 返回 429、Vertex 缓存拒绝），减少测试套件中的误报。  
- **CI 效率优化**：移除了无效测试分片，并为无界 SQL `IN` 列表添加警告（[#42603](https://github.com/BerriAI/litellm/pull/42603)、[#42629](https://github.com/BerriAI/litellm/pull/42629)），防止未来性能退化。

#### **5. 稳定性与回归问题**  
- **严重**：当预算超限时，免费本地模型的预算控制失效（[#14004](https://github.com/BerriAI/litellm/issues/14004)）——修复中，通过 PR #32618 进行。  
- **高严重性**：速率限制器对团队每模型限额重复计数 → 实际 RPM/TPM 仅为配置值的一半（[#34140](https://github.com/BerriAI/litellm/issues/34140)）——修复 PR 待审查。  
- **中等**：当 `model_name` 为别名时，流式请求显示成本为 $0（[#42161](https://github.com/BerriAI/litellm/issues/42161)）——已在 PR #42630 中确认。  
- **低**：管理员仪表板因非管理员用户触发大量堆栈跟踪日志而泛滥（[#30442](https://github.com/BerriAI/litellm/issues/30442)）——已知过时问题。

#### **6. 对应用开发者的意义**  
- **审计就绪部署**：使用 `require_auth_for_metrics_endpoint: true` 并确保 `project_spend` 跟踪已启用——当前项目预算控制仍存在缺口（[#33871](https://github.com/BerriAI/litellm/issues/33871)），可能导致无声成本超支。  
- **避免成本误差**：若在流式调用中使用模型别名，请预期记录成本为零；建议改用直接模型名称，或关注 PR #42630 获取修复进展。  
- **企业合规**：利用新提出的调用后收据中间件方案（[#29895](https://github.com/BerriAI/litellm/issues/29895)），满足欧盟《人工智能法案》第 12 条对防篡改审计轨迹的要求。  
- **CI 可靠性提升**：因提供方侧不稳定导致的测试失败将减少；生产环境推荐使用 `stable/1.102.x` 版本，其已集成回滚修复。

---  
*数据来源：[BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-23**

#### **1. 今日亮点**  
Unsloth 已发布 **v0.1.814-beta**，全面支持本地推理 **Qwen-Image-2.1**，包含自定义 Agent 技能、改进的聊天/项目管理功能，以及**推理模块性能提升 2 倍（60 FPS 对比 30 FPS）**。本次发布还解决了跨 Linux 安装和 AMD GPU 兼容性中的关键稳定性问题，标志着迈向生产级多模态 Agent 部署的重要一步。

#### **2. 发布与破坏性变更**  
- **v0.1.814-beta**：正式加入对 Qwen-Image-2.1 的支持，推理性能增强，项目工作流更流畅。  
  🔗 [发布说明](https://unsloth.ai/docs/models/qwen-image-2.1)  
- **v0.1.813–812-beta**：同一功能集的早期测试版本；从旧版本升级的用户应确保清除模型缓存，以避免与新 `mmproj` 及 MTP 头部要求产生冲突。  
  🔗 [Qwen Image 2.1 指南](https://unsloth.ai/docs/models/qwen-image-2.1)

> ⚠️ **迁移提示**：若在 `mmproj` 或 MTP 头部可用前下载了如 `Qwen3.8-Flash-Next-GGUF` 等模型，可能无法加载——请删除并重新下载以解决。

#### **3. 新模型与硬件支持**  
- **新模型**：通过 GGUF 与原生后端，实现对 **Qwen-Image-2.1** 的完整本地推理支持。  
  🔗 [模型文档](https://unsloth.ai/docs/models/qwen-image-2.1)  
- **硬件/后端**：  
  - **AMD ROCm**：持续优化 RDNA1 (gfx1010) 训练，通过 PR #11615（禁用 Triton buffer ops）。  
  - **Intel XPU**：确认支持训练，但因 `adamw_8bit` 优化器崩溃（问题 #10021）导致不稳定。  
  - **NVIDIA**：NVFP4 图像策略支持现已扩展至视频扩散模型（Wan2.2-TI2V-5B, HunyuanVideo-1.5），通过 flashinfer FP4 后端实现（PR #10730）。  
- **量化**：通过 transformers 的 fp8 量化器支持 **NVIDIA ModelOpt FP8 检查点**（PR #11592），并支持将 **压缩张量打包的 INT4/INT8** 直接集成到 bitsandbytes 4-bit（PR #11537）。

#### **4. 性能与优化**  
- **推理速度**：推理模块性能提升 2 倍——**近期基准测试中达到 60 FPS，对比此前的 30 FPS**。  
- **VAE 优化**：Studio 现在按渲染编译 VAE 解码内核，降低基于 DiT 的图像生成延迟（PR #10889）。  
- **内存效率**：  
  - **离线 top-k logprobs** 支持从超大教师模型（如 Deepseek-V3、Kimi-K2）蒸馏知识，无需将它们载入训练内存（问题 #11556）。  
  - **分组卸载** 现已考虑用于大型模型（如 A100 上的 Qwen-Image-2.1），避免整模块分页（问题 #11547）。  
- **多 GPU 扩展**：实验性支持通过 Unsloth Studio 进行多卡 LoRA 微调（功能请求 #5764），但当前行为默认仍为单卡。

#### **5. 稳定性与回归问题**  
| 问题 | 严重程度 | 状态 | 修复/临时方案 |
|------|----------|--------|----------------|
| [最新 llama.cpp 构建中 AMD GPU 检测失效](https://github.com/unslothai/unsloth/issues/7485) | 高 | 已关闭 | 通过 `pip install --upgrade unsloth unsloth_zoo` 重新安装 |
| [Qwen-Image-2.1 运行需手动操作](https://github.com/unslothai/unsloth/issues/11567) | 中 | 开放 | 需手动清理缓存 |
| [AMDGPU 在 QLoRA 训练期间发生虚拟机故障/重置（RX 7900 XTX）](https://github.com/unslothai/unsloth/issues/11498) | 严重 | 开放 | 尚无修复；临时方案：避免在 RX 7900 XTX 上使用 QLoRA |
| [Firefox/Brave 浏览器中 API 密钥复制失败](https://github.com/unslothai/unsloth/issues/11387) | 中 | 已关闭 | 浏览器特定问题；建议改用 Chrome 或 Edge |
| [Studio 会移除 `--tensor-split` 标志，导致 MoE 模型出现 OOM](https://github.com/unslothai/unsloth/issues/11330) | 高 | 已关闭 | 已在 v0.1.814-beta 中修复 |

#### **6. 对应用开发者的意义**  
- **更快构建多模态代理**：随着 Qwen-Image-2.1 现在可在本地完全支持，开发者可无需依赖云服务部署视觉语言代理。利用 **自定义 Agent 技能** 实现动态任务路由。  
- **优化推理成本**：借助 **60 FPS 推理块** 和 **NVFP4 量化**，实现实时、低延迟的代理响应。  
- **安全扩展训练**：使用 **离线 top-k logprobs** 从大型模型蒸馏知识，避免显存溢出。AMD 用户应暂避 RDNA1 显卡进行 QLoRA 训练，直至 PR #11615 落地。  
- **提升用户体验**：启用 **多模型服务**（PR #11591）和 **持久化聊天回放**（PR #10910），实现持久、状态化的代理交互。  
- **关注回归问题**：若使用 AMD GPU，需留意训练期间的虚拟机故障；建议选择 Intel XPU 或 NVIDIA 以获得稳定微调体验。

🔗 **关键资源**：  
- [Qwen-Image-2.1 指南](https://unsloth.ai/docs/models/qwen-image-2.1)  
- [GitHub 问题仪表板](https://github.com/unslothai/unsloth/issues)  
- [拉取请求（最新）](https://github.com/unslothai/unsloth/pulls)

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*