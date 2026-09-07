# AI 基础设施日报 2026-09-07

> 生成时间: 2026-09-07 00:19 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-07**

---

### **1. 生态概览**  
AI推理与服务生态正进入高度专业化与硬件融合的新阶段，各项目日益聚焦下一代加速器，如NVIDIA Blackwell（SM120/SM121）、Apple Silicon M系列及AMD RDNA4。关键关注点包括推测解码的稳定性、多模态缓存机制以及跨平台一致性——尤其在ROCm和Apple MLX后端表现突出。尽管vLLM与SGLang在底层内核优化与分布式推理方面领先，llama.cpp仍是边缘计算与以CPU为主的部署场景中的主流本地运行时。与此同时，LiteLLM与Ollama作为网关层，实现了对不同厂商的抽象，但两者在云原生代理工作流中均面临可观测性与可靠性方面的成长阵痛。

---

### **2. 活动对比**

| 项目        | 开放问题（高/中） | 最近24小时合并的PR | 发布状态         |
|-------------|------------------|--------------------|------------------|
| **vLLM**    | 5（3高，2中）     | 12                 | 无               |
| **SGLang**  | 5（4高，1中）     | 8                  | 无               |
| **llama.cpp** | 5（2高，3中）     | 7                  | `b10826` 稳定版   |
| **Ollama**  | 6（2高，4中）     | 2                  | 无               |
| **LiteLLM** | 5（2高，3中）     | 5                  | `v1.101.0-rc.1` RC |
| **Unsloth** | 4（2高，2中）     | 6                  | 无               |

> 🔍 *观察：* vLLM在开发活跃度上遥遥领先；尽管存在严重问题，Ollama的PR提交量仍明显偏低。LiteLLM正积极发布RC版本，并通过cosign签名实现安全加固。

---

### **3. 模型支持竞赛**

| 新模型 / 架构              | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**    | ✅（稳定修复进行中） | ❌ | ❌ | ❌ | ❌ | ❌ |
| **DeepSeek-V4-Flash**     | ✅（修复进行中） | ✅（负载下崩溃） | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**         | ✅（SM120/SM121 原生支持） | ⚠️（启动崩溃，HiCache损坏） | ❌ | ❌ | ❌ | ❌ |
| **Gemma 3/4 (NVFP4)**     | ✅（完整支持SM120/SM121） | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Spark2_5ForCausalLM**   | ❌ | ❌ | ✅（完整GGUF支持） | ⚠️（未识别） | ❌ | ❌ |
| **ExLlamaV3 (MoE)**       | ❌ | ❌ | ❌ | ❌ | ❌ | ✅（PR #7115） |
| **Apple Silicon (MLX)**   | ❌ | ✅（路线图） | ✅（M2 Max FA-vec） | ⚠️（卡在“Stopping...”） | ❌ | ❌ |

> 🏆 **领先者：** **vLLM** 在前沿GPU（Blackwell, GB10）上对新模型的生产就绪支持方面占据明显优势。**llama.cpp** 在模型转换保真度与本地运行时灵活性方面处于主导地位。**Unsloth** 正在引领MoE与大规模微调基础设施的创新。

---

### **4. 性能前沿**

| 关注领域                | vLLM                              | SGLang                            | llama.cpp                        | Ollama                    | LiteLLM                  | Unsloth                     |
|-------------------------|-----------------------------------|-----------------------------------|----------------------------------|----------------------------|--------------------------|------------------------------|
| **KV缓存优化**           | ✅ 混合GDN+attention MTP，基于UUID的媒体缓存 | ✅ 网络感知的KV广播（DSA） | ⚠️ flash-attn中统一-KV限制 | ❌ 前缀缓存截断至8K token | ⚠️ 跨团队缓存污染风险 | ✅ 共享KV抢占（异步副本） |
| **批处理与吞吐量**       | ✅ 稀疏注意力 + persistent_topk 修复 | ✅ DSA效率（节点间传输减少） | ✅ 懒加载模式重构（AMD iGPU） | ❌ Vulkan回归（iGPU） | ✅ AdaptiveRouter（测试版） | ✅ 两火花异步副本路由 |
| **量化与压缩**           | ✅ NVFP4，FA2支持的FP8 | ✅ SM120默认FP4 GEMM | ✅ Q6_K/Q2_K/MMVQ warp（RDNA4） | ❌ MiniMax-W4A16输出为NUL | ✅ Qwen3.7-Max（Anthropic API） | ✅ 显式同意导出FP8/FP4 |
| **分布式服务**            | ✅ 多GPU，ROCm CI扩展 | ✅ 流水线并行（待解决议题） | ❌ 无分布式支持 | ❌ 仅有限DP/TP感知能力 | ✅ AdaptiveRouter（多提供商） | ✅ 两火花DGX集群（开发中） |
| **内核级调优**            | ✅ FlashInfer，FA2，稀疏索引 | ✅ FlashInfer b12x NVFP4，MLA内核 | ✅ RDNA4 gfx1201 CUDA/HIP，Metal FA-vec | ❌ Blackwell下Flash Attention崩溃 | ❌ 无内核工作 | ❌ Triton指针错误（CPU张量） |

> 📈 **趋势：** 性能前沿正转向**针对硬件的内核调优**（RDNA4、Blackwell、M2 Max）、**大规模分布式推理**以及**高效的内存管理**（KV缓存共享、量化卸载）。

---

### **5. 层级定位**

| 项目        | 主要层级                     | 核心差异化优势 |
|-------------|-------------------------------|----------------|
| **vLLM**    | **推理引擎**                  | 高吞吐、GPU优化的LLM服务行业标准，深度集成内核 |
| **SGLang**  | **推理引擎 + 分布式运行时**    | 支持高级DSA/MLA，专注多节点与流水线并行 |
| **llama.cpp** | **本地运行时 / 边缘推理**     | 无与伦比的可移植性，支持CPU/GPU混合执行，模型转换保真度高 |
| **Ollama**  | **LLM网关 / 开发者体验**      | 简化本地部署，但在云环境与MLX路径中存在稳定性退化 |
| **LiteLLM** | **LLM网关 / 抽象层**          | 供应商无关路由、成本追踪、OAuth2集成——多云代理的关键组件 |
| **Unsloth** | **微调与可扩展训练基础设施**  | 在MoE训练、异步副本路由与大规模集群编排方面领先 |

> 🧩 **定位洞察：** vLLM与SGLang在核心推理层竞争；llama.cpp掌控边缘/本地领域；Ollama与LiteLLM占据面向应用的网关层——此处稳定性与可观测性已成为关键区分因素。

---

### **6. 趋势信号**

#### 🔥 **关键趋势提炼：**
1. **硬件融合加速：** 项目正竞相实现对**Blackwell（SM120/SM121）**、**Apple M系列**及**AMD RDNA4**的原生支持，表明下一代芯片已成为高性能推理的默认基准。
2. **推测解码稳定性危机：** 多个项目报告在推测解码下出现非确定性输出或崩溃——凸显在量化与混合模型中保障确定行为的系统性挑战。
3. **可观测性缺口：** 尽管需求增长，**尚无项目发布完整的Prometheus `/metrics` 端点**（Ollama、LiteLLM仍在等待）。这导致代理工作流监控存在盲区。
4. **安全与可信设计：** LiteLLM采用**cosign签名的Docker镜像**，标志着生产级AI基础设施正向可验证软件供应链演进。
5. **代理工作负载压力：** 持续存在的问题如**前缀缓存截断（Ollama）**、**语法解析限制（llama.cpp）** 及**JSON拆分失败（Ollama）** 表明，以代理为中心的用例正在暴露更深层的架构缺陷。

#### 🛠️ **开发者应重点关注：**
- ✅ **锁定稳定版本**（如 `vLLM v0.27`、`llama.cpp b10826`），直至关键回归被修复。
- ✅ **避免在Ollama中使用 `:cloud` 标签**，直到JSON解析漏洞修复。
- ✅ **在生产环境中启用 `cosign verify`** 以保障LiteLLM安全性。
- ✅ **关注PR #55563（vLLM）**、**#38143（SGLang）** 及 **#16998（Ollama）**——这些是保障代理可靠性的关键。
- ✅ **为通过Unsloth导出FP8/FP4做好准备**，并在CI/CD中考虑依赖许可流程。

> 💡 **最终观点：** AI推理栈正在快速成熟——但代价是复杂性持续上升。开发者如今必须优先考虑**稳定性、可观测性与可信度**，而非单纯追求速度。真正的赢家将是那些能在这一碎片化且高速演进的生态中构建稳健、可审计、可互操作管线的团队。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-09-07**

#### **1. 今日亮点**  
已合并针对 **Qwen3.8-Flash-Next** 和 **DeepSeek-V4-Flash** 的关键稳定性修复，解决了因稀疏注意力（sparse attention）和 persistent_topk 问题导致在 `temperature=0` 时出现非确定性输出的问题。新提交的 PR 增强了 **基于 UUID 的多模态媒体缓存**，改进了 **KV 缓存错误提示信息**，并填补了 **ROCm CI 测试覆盖盲区**——预示着 v0.28 版本前更强的跨平台可靠性。

#### **2. 发布与破坏性变更**  
无。过去 24 小时内未报告新版本发布或破坏性 API/配置变更。

#### **3. 新模型与硬件支持**  
- ✅ **GLM-5.3-Flash**：通过 #55563，在 SM120/SM121（GB10/DGX Spark）上启用原生支持，无需手动配置修改。  
- ✅ **Gemma 3/4 (NVFP4)**：通过 #46329，实现对消费级 Blackwell（sm120/sm121）的完整支持，结合 FA2 NVFP4 KV 缓存。  
- ✅ **ROCm**：扩展了对 `ROCM_AITER_FA` 与 `FLASH_ATTN MLA` 预填充后端的 CI 测试覆盖范围（#55611）。  
- ✅ **多模态 UUID 缓存**：媒体标识默认使用 UUID，支持更快的缓存命中率和与 URL 无关的查找（#55616, #55583）。

#### **4. 性能与优化**  
- 🔧 **稀疏注意力优化**：针对统一内存 GPU（如 GB10），降低默认索引器 logits 预算，防止长序列预填充阶段发生 OOM（#55572）。  
- 🚀 **KV 缓存效率**：PR #55617 与 #55603 解决了混合 GDN+attention MTP 伪采样解码的边缘情况，并提升了 `gpu_memory_utilization` 错误的诊断清晰度。  
- ⚙️ **工具调用与确定性**：新增 `thinking_token_budget` 截断模式以支持 RL 回放（#54864），并在批处理不变性测试中增加分块预填充覆盖（#55612）。  
- 📊 **Mypy 强制检查**：测试套件类型检查的最终阶段完成（#55485），提升代码质量与可维护性。

#### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR |  
|------|----------|--------|--------|  
| #55571: 在持续负载下，RTX PRO 5000（SM120）上出现 CUDA 内存访问非法（Xid 13） | 严重 | 开放 | [PR #55571](https://github.com/vllm-project/vllm/issues/55571) |  
| #54521: Qwen3.8-Flash-Next 在 `indexer_budget` 附近出现非确定性贪婪解码 | 高 | 开放 | [PR #55563](https://github.com/vllm-project/vllm/pull/55563) |  
| #53257: DeepSeek-V4-Flash 在 `temperature=0` 时输出非确定，且与并发相关 | 高 | 开放 | [PR #55571](https://github.com/vllm-project/vllm/issues/55571) |  
| #53504: 混合 Mamba/GDN 模型中首次重复项未能命中前缀缓存 | 中等 | 开放 | N/A |  
| #53180: TurboQuant k8v4 + MTP 伪采样解码导致退化输出 | 中等 | 开放 | N/A |

> 💡 **注意**：该 Xid 13 崩溃在持续负载下可复现，可通过设置 `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` 或 `--enforce-eager` 进行临时缓解。

#### **6. 对应用开发者的意义**  
- **避免生产环境中的确定性故障**：在 #55563 与 #55571 修复前，请勿在 `Qwen3.8-Flash-Next` 或 `DeepSeek-V4-Flash` 上使用 `temperature=0`。可临时使用 `--enforce-eager` 作为规避方案。  
- **利用基于 UUID 的媒体缓存**（`VLLM_EARLY_UUID_LOOKUPS`）以降低多模态应用延迟——尤其适用于视频密集型智能体。  
- **预期更佳的 ROCm 平台一致性**：#55611 后，确保设置 `VLLM_ROCM_USE_AITER=1` 以获得完整功能覆盖。  
- **使用混合模型（如 Mamba + GDN）搭配伪采样解码时**，需密切监控 KV 缓存行为——首次重复可能完全错过前缀缓存。  
- **若使用 vLLM 测试套件**，请在 CI 中启用 MyPy 强制检查；这将提升长期可维护性及类型错误的早期发现能力。

---  
*源自 [vLLM GitHub](https://github.com/vllm-project/vllm) — 2026-09-07*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-09-07**

---

### **1. 今日重点**  
SGLang 持续推进对下一代硬件的支持，关键工作包括 Apple Silicon 集成和 Blackwell GPU 优化。值得注意的是，PR #38170 为 SM120（RTX PRO 6000/5090）默认启用了 FP4 GEMM 选择；同时，新提交的 PR 正在修复影响 GLM-5.3-Flash 与 DeepSeek-V4 长上下文推理的高严重性 DSA 后端问题。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未报告新版本发布或破坏性变更。

---

### **3. 新模型与硬件支持**  
- **Apple Silicon（M 系列）**：通过 [Issue #19137](https://github.com/sgl-project/sglang/issues/19137) 和 [RFC #32321](https://github.com/sgl-project/sglang/issues/32321) 推进路线图，聚焦于由 Torch 管理的 SRT 路径及导出的 MLX 模型区域。  
- **平头哥 PPU**：新增功能请求 [Issue #37519](https://github.com/sgl-project/sglang/issues/37519) 提议对 ZW810/810E 与 ZW-M890P 卡片提供原生支持。  
- **DGX Spark（GB10, SM121, aarch64）**：持续解决缺失 `sgl_kernel` wheel 的问题 ([Issue #29317](https://github.com/sgl-project/sglang/issues/29317))，并推动对 bfloat16 VLM（如 `baidu/Unlimited-OCR`）的完整支持。

---

### **4. 性能与优化**  
- **Blackwell 优化**：PR #37926 针对 Blackwell 上统一内存解码性能差距进行优化，将静态池延迟差异从 **1.96%** 降低至近乎一致。  
- **FP4 GEMM 调优**：PR #38170 在 SM120 上默认启用 FlashInfer 的 `b12x` NVFP4 GEMM，提升冷权重 GEMM 吞吐量。  
- **DSA 效率**：PR #37950 引入面向网络感知的 KV 广播机制用于 MLA 模型，消除 Prefill CP → Decode TP 配置中的冗余跨节点传输。  
- **AMD ROCm 改进**：多个 PR 优化稀疏 MLA 内核（`#30575`, `#37465`）以及 HiCache IO 后端（`#37152`），显著提升 MI355X 上的性能表现。

---

### **5. 稳定性与回归问题**  
今日报告了若干高优先级回归问题：
- **GLM-5.3-Flash 在流水线并行模式下启动崩溃** ([Issue #36906](https://github.com/sgl-project/sglang/issues/36906)) – *KeyError: 'residual'*。  
- **GLM-5.3-Flash HiCache 主机层加载回写在无推测解码时导致生成数据损坏** ([Issue #38031](https://github.com/sgl-project/sglang/issues/38031)) – 导致工具调用丢失及退化循环。  
- **DeepSeek-V4 长上下文预填充因非法内存访问失败** ([Issue #37892](https://github.com/sgl-project/sglang/issues/37892)) – `topk_v1.cuh` 中 top-k 内核崩溃。  
- **MiniMax-M3 W4A16 压缩张量输出全为 NUL** ([Issue #38143](https://github.com/sgl-project/sglang/issues/38143)) – Triton MiniMaxSparse 路径缺陷；vLLM 上正常。

*注：上述高严重性问题尚未提交对应修复 PR。*

---

### **6. 对应用开发者的启示**  
- **使用 `v0.5.19.dev410+` 及以上版本**，可在 RTX PRO 6000/5090（SM120）上体验默认 FP4 GEMM 调优带来的性能提升。  
- 在 [Issue #38236](https://github.com/sgl-project/sglang/issues/38236) 解决前，避免对 `DeepseekV4ForCausalLM` 使用 `--speculative-algorithm NEXTN`。  
- 若部署于 **ROCm** 环境，请验证 HiCache IO 后端是否正常运行——当前默认值（`kernel`）在 ROCm 上存在故障（[PR #37152](https://github.com/sgl-project/sglang/pull/37152) 正在处理中）。  
- **多卡部署** 时需关注 KV 池预算分配——[Issue #38202](https://github.com/sgl-project/sglang/issues/38202) 揭示 `tp_size` 与 `attn_tp_size` 不匹配问题，导致 Kimi-K3 在 DP 注意力场景下触发 OOM。

敬请关注即将到来的 Apple Silicon 支持进展，以及 GLM-5.3-Flash 稳定性追踪的最终确认，详见 [Issue #37524](https://github.com/sgl-project/sglang/issues/37524)。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 消息简报 – 2026-09-07**

---

### **1. 今日亮点**  
最新更新聚焦于**模型转换精度**、**GPU内核优化**以及**推测解码与KV缓存处理的关键稳定性修复**。显著改进包括对 Spark2_5 模型架构的支持、flash-linear-attention 中 GDN 归一化问题的修复，以及针对 RDNA4（AMD）和 M2 Max（Apple Silicon）GPU 后端的增强调优。这些改动共同提升了在多种硬件上的推理可靠性和性能表现。

---

### **2. 发布与破坏性变更**  
- **新增 `--fuse-qkv` 标志**用于 HF 转 GGUF (#22780)：在模型转换过程中将 Q/K/V 投影融合为单个 QKV 矩阵，提升兼容后端的运行时效率。[PR #22780](https://github.com/ggml-org/llama.cpp/pull/22780)  
- **引入 `--log-jsonl` 选项** (#28437)：提供结构化 JSONL 日志输出，便于生产环境中可观测性监控。[PR #28437](https://github.com/ggml-org/llama.cpp/pull/28437)  
- **UI 资源现通过 CMake 嵌入** (#28445)：移除外部 gzip 依赖及构建时的 C++ 辅助脚本，简化跨平台编译流程。[PR #28445](https://github.com/ggml-org/llama.cpp/pull/28445)

> 🔔 *注意：本周期未报告任何破坏性 API 变更。*

---

### **3. 新模型与硬件支持**  
- **新增 Spark2_5ForCausalLM 模型支持** (#27868)：实现从 GGUF 转换、分词器预分词逻辑、张量映射到加载流水线的完整端到端集成。[PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868)  
- **启用 Kimi-K3 的递归状态回滚** (#28466)：在推测解码中支持有限状态回滚，提升 Kimi-K3 模型的可靠代理行为。[PR #28466](https://github.com/ggml-org/llama.cpp/pull/28466)  
- **RDNA4 (gfx1201) CUDA/HIP 内核优化持续进行**：针对 `Q6_K`、`Q2_K` 和 MMVQ 线程束的 PR 正在测试中；初步结果显示在 AMD RX 9070 XT 上解码吞吐量显著提升。[PR #25940](https://github.com/ggml-org/llama.cpp/pull/25940), [PR #28102](https://github.com/ggml-org/llama.cpp/pull/28102)  
- **新增 M2 Max Metal FA-vec 优化** (#28458)：为 Apple Silicon M2 Max GPU 优化了 flash-attention 向量内核。[PR #28458](https://github.com/ggml-org/llama.cpp/pull/28458)

---

### **4. 性能与优化**  
- **gfx1201 (RDNA4) 的 Flash Attention 调优**：初步基准测试显示，在 RX 9070 XT 上相比当前 Vulkan 路径，**令牌生成速度提升约 5–7 倍**，有效带宽接近 ~100 GB/s。[PR #28102](https://github.com/ggml-org/llama.cpp/pull/28102)  
- **Qwen4exp PLE 表直接读取** (PR #28136)：直接内存访问使 GB10 平台上的预填充性能**提升超过 2 倍**，解决了此前观察到的不一致预填充速率问题。  
- **懒加载模式重构** (#28326)：重新设计 `auto` 模式，根据系统配置智能选择加载策略；修复了 `--lazy-mode auto` 在 AMD iGPU 上导致 pp512 性能减半的回归问题。[PR #28326](https://github.com/ggml-org/llama.cpp/pull/28326)  
- **OpenCL Q4_K/M mul_mat 优化** (#28402)：正确选择 Q4_K 与 Q5_K 的权重打包方式，降低多 GPU OpenCL 配置下的计算瓶颈。

---

### **5. 稳定性与回归问题**  
- **量化目标上的推测解码偏差** (#25618)：当目标模型被量化（如 Q4_K_M）时，贪婪采样在推测解码与普通运行之间产生不同输出，但在 BF16 下保持一致。*暂无修复方案。*  
- **第二条长请求后提示处理耗时下降 42–54%** (#28495)：由 CUDA/HIP flash-attention 内核中的统一 KV 限制引起，仅跳过尾部 INF 块而忽略中间块。*已知根本原因；待补丁发布。*  
- **在 Qwen3.5-hybrid 上静默触发即时 EOS（超 13万上下文）** (#27756)：递归状态深度 × 层数退化导致提前终止。影响 CPU 与 CUDA。*暂无修复方案。*  
- **在精确 2000 字符处数组长度测试失败** (#27859)：由 `maxLength=2000` 的 JSON Schema 生成无效 GBNF。*预计近期修复。*  
- **下载时 SVG 图像渲染不完整** (#28336)：界面显示正常，但下载的 SVG 缺失部分内容——可能源于异步渲染竞争。*临时解决方案：从浏览器复制粘贴。*

---

### **6. 对应用开发者的启示**  
- ✅ **在 GGUF 转换中使用 `--fuse-qkv`**，以在支持的模型上获得更好的预填充性能。  
- 🚨 **若在 AMD iGPU 或旧版 Intel Arc 设备上运行，请避免使用 `--lazy-mode auto`** —— 请显式指定 `large` 或 `all`，直到 PR #28326 上线。  
- ⚠️ **在量化模型（尤其是 Q4_K_M）上谨慎使用推测解码**；贪婪采样下可能出现输出偏差。  
- 🛠️ **利用 `--log-jsonl`** 实现代理流水线与监控栈的集中日志记录。  
- 💡 **预期在 RDNA4 GPU 上实现更快推理**：一旦优化内核合并，非常适合高吞吐量 LLM 代理场景。  
- 📌 **关注语法解析限制**：在 #27859 修复前，避免使用 `maxLength >= 2000` 的模式定义。

> 生产部署建议：使用推测解码或长上下文模型时，固定版本至 `b10826` 或更高以确保稳定。[最新发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10826) | [GitHub Attestations](https://github.com/ggml-org/llama.cpp/attestations/45586039)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-07**

---

### **1. 今日亮点**  
Ollama Cloud 和 MLX 后端工作流中出现关键稳定性问题，包括 `minimax-m3:cloud` 的间歇性 JSON 输出拆分、macOS 上 `muse-glimmer:30b-mlx` 持续卡在“停止中…”状态，以及 AMD 集成显卡上大模型 Vulkan 内存处理的回归问题。与此同时，社区持续推动可观测性改进，多个开放请求呼吁增加 Prometheus `/metrics` 接口。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*

---

### **3. 新模型与硬件支持**  
- ✅ **新架构支持请求**：尽管已成功下载模型，`spark2_5`（Spark-X2.5-4B / 1.7B）仍不被 Ollama 运行时识别 ([#18195](https://github.com/ollama/ollama/issues/18195))。  
- ✅ **社区集成新增**：[deel](https://github.com/jysvai/deel-local-cli) 与 [INVAR](https://github.com/rybruscoe/invar) 已分别列入 README，作为本地代理与带凭证的 Ollama 网关工具 ([#18270](https://github.com/ollama/ollama/pull/18270), [#18268](https://github.com/ollama/ollama/pull/18268))。

---

### **4. 性能与优化**  
- ⚠️ **MLX 运行器性能损耗**：前缀缓存恢复被截断为 8192 的倍数，导致每次冷提示后强制重新填充 17–27 秒——对智能体工作负载造成显著延迟 ([#18267](https://github.com/ollama/ollama/issues/18267))。  
- ⚠️ **Blackwell 上 Flash Attention 崩溃**：`qwen3-coder:30b` 使用 `sm_120`（RTX 5070 Ti 笔记本版）在预热阶段因 CUDA 共享对象初始化失败而崩溃，尽管内存占用正常 ([#18276](https://github.com/ollama/ollama/issues/18276))。  
- 🔧 **待合并指标接口**：PR [#16998](https://github.com/ollama/ollama/pull/16998) 提出一个可选的 `/metrics` 接口，支持细粒度度量（排队请求数、模型加载状态、各模型词元计数），用于 Prometheus 监控。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | GitHub 链接 |
|---------|------|------------|
| 🔴 高 | `glm-5.3:cloud` 进入无限推理循环，导致 OpenCode/ZCode 中任务中断；官方 Z.AI 正常运行 | [#18193](https://github.com/ollama/ollama/issues/18193) |
| 🔴 高 | `minimax-m3:cloud` 间歇性将 JSON 输出拆分至 `reasoning` 与 `content`，导致 `content` 变为无效 JSON | [#17987](https://github.com/ollama/ollama/issues/17987) |
| 🟡 中 | Vulkan 后端无法加载 66GB 模型于 AMD iGPU（自 v0.32.12 起的回归） | [#18272](https://github.com/ollama/ollama/issues/18272) |
| 🟡 中 | `muse-glimmer:30b-mlx` 在 macOS 上无限期卡在“停止中…”状态（与重启同步发生） | [#18269](https://github.com/ollama/ollama/issues/18269) |
| 🟡 中 | `gemma4:12b` 工具调用解析器对 `BEGIN_ARG/END_ARG` 失败，触发退化 `<|channel>thought` 循环 | [#18275](https://github.com/ollama/ollama/issues/18275) |
| 🟡 中 | 模型名称验证长度限制过短（80 字符），阻碍长路径 Hugging Face 模型名称 | [#18274](https://github.com/ollama/ollama/issues/18274) |

> *注意：今日未提交针对这些关键回归问题的修复 PR。*

---

### **6. 对应用开发者的启示**  
- **生产环境中的智能体应避免使用 `:cloud` 标签**，若依赖结构化 JSON 输出——`minimax-m3:cloud` 与 `glm-5.3:cloud` 存在不可靠解析行为。  
- **在 macOS 上使用 `muse-glimmer:30b-mlx` 时，请设置 `OLLAMA_KEEP_ALIVE=30` 或更高值**，以缓解“停止中…”挂起问题，但此为临时对策，非根本修复。  
- **关注指标缺口**——当前尚无 `/metrics` 接口，需借助外部工具监控 GPU/CPU 利用率、队列深度或请求速率。  
- **谨慎校验模型名称**——在 80 字符限制放宽前，避免使用长路径的 Hugging Face 模型。  
- **考虑 Flash Attention 的降级方案**——`qwen3-coder:30b` 在 Blackwell 显卡上高负载下可能无声失败；如遇不稳定，建议禁用 `flash-attn`。

> 👉 主动开发者应密切关注问题 #18267（MLX 前缀缓存）与 PR #16998（/metrics）——两者对优化智能体推理流水线至关重要。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-09-07**

---

### **1. 今日重点**  
最新发布的 `v1.101.0-rc.1` 引入了通过 cosign 签名的 Docker 镜像以增强安全性——自提交 `0112e53` 起均使用相同密钥验证。关键稳定性修复解决了 AdaptiveRouter 中持续崩溃的问题（`gammavariate: alpha and beta must be > 0.0`）以及流式支出日志记录失败问题。已报告一个关于 OAuth2 流程行为的重大回归：管理型 OAuth2 流程现在重定向至 LiteLLM UI 而非供应商认证页面，正在积极调查中。

---

### **2. 发布与破坏性变更**  
- **`v1.101.0-rc.1`**：候选版本，所有 Docker 镜像均已通过 cosign 签名验证。[验证签名](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)。  
- **`v1.100.0`**：稳定版本，未记录破坏性变更。  
- **破坏性变更提醒**：从 `1.95.1` 升级至 `1.99.0+` 会触发回归问题，即管理型 OAuth2 流程将打开 LiteLLM UI 而非供应商授权页面 ([#39665](https://github.com/BerriAI/litellm/issues/39665))。

---

### **3. 新模型与硬件支持**  
- 通过 DashScope 的 Anthropic 兼容 API 新增对 **Qwen3.7-Max** 的支持（`qwen3.7-max`）。已在 `model_prices_and_context_window.json` 中添加模型条目，并正确映射 `litellm_provider: "anthropic"`。([#29920](https://github.com/BerriAI/litellm/pull/29920))  
- **Foundry Local** 作为首个原生兼容 OpenAI 的提供商正式加入，附带 SDK 1.2 使用指南和官方标识。([#29449](https://github.com/BerriAI/litellm/pull/29449))  

---

### **4. 性能与优化**  
今日未引入直接性能提升或内核优化。但针对 **按团队作用域的响应缓存** 的持续工作 ([#29955](https://github.com/BerriAI/litellm/issues/29955)) 旨在防止跨租户缓存污染，提升多租户部署中的隔离性。

---

### **5. 稳定性与回归问题**  
**严重崩溃与缺陷（按影响排序）：**  
1. **AdaptiveRouter 重启后崩溃**：因无效状态重新加载导致 `gammavariate: alpha and beta must be > 0.0`。已在 PR [#29398](https://github.com/BerriAI/litellm/pull/29398) 中修复。  
2. **流式 `/v1/responses` 日志静默失败**：`dict` 对象无属性 'usage' → 无支出日志写入，请求未计费。已在 PR [#29943](https://github.com/BerriAI/litellm/pull/29943) 中修复。  
3. **OAuth2 重定向错误**：管理型 OAuth2 流程打开 LiteLLM UI 而非供应商认证页面。已在 [#39665](https://github.com/BerriAI/litellm/issues/39665) 中报告；修复待处理。  
4. **守卫规则错误以 500 返回而非 400**：CustomCodeExecutionError 未转换为 HTTP 400。([#29436](https://github.com/BerriAI/litellm/issues/29436))  
5. **缓存注入无操作 + Claude 工具调用循环**：`cache_control_injection_points` 在 `/v1/responses` 上被忽略 → 无限工具调用。([#29810](https://github.com/BerriAI/litellm/issues/29810))

---

### **6. 对应用开发者的影响**  
- **若使用管理型 OAuth2，避免升级至 `1.99.0+`**，直到 [#39665](https://github.com/BerriAI/litellm/issues/39665) 修复——否则认证流程可能意外中断。  
- **在生产环境中启用 `cosign` 验证**：所有镜像均已签名；请使用 `cosign verify` 并配合 `0112e53` 提交中的稳定密钥。  
- **密切监控支出追踪**：若配置中使用自定义模型且无成本映射，对 `/v1/responses` 的流式请求可能未被计费——修复即将发布。  
- **可放心使用 `qwen3.7-max` 通过 Anthropic 协议**：官方支持已包含在定价与路由体系中。  
- **多租户环境可能存在不稳定性**：团队间缓存共享仍存在风险，直至 [#29955](https://github.com/BerriAI/litellm/issues/29955) 实现前应保持警惕。  

> ✅ **建议**：在关键回归修复前，请锁定至 `v1.100.0` 或 `v1.101.0-rc.1`。立即审计守卫规则、OAuth2 及成本追踪配置。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-07**

---

### **1. 今日亮点**  
Unsloth 继续积极推进多节点推理与高性能微调基础设施建设，两个重要 PR 引入了 **两节点 Spark DGX 集群** 和 **异步副本路由**，为可扩展的模型服务提供支持。与此同时，团队正在优化 **FP8/FP4 压缩工作流**，引入显式用户授权机制和更完善的错误处理，标志着模型导出流程正向更安全、更透明的方向演进。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
然而，`llm-compressor` 集成的持续变更（通过 #9405, #9554）将要求在安装依赖项前获取显式用户同意——这对自动化工作流而言属于破坏性变更。开发者应更新脚本以显式处理 `install_missing_dependencies=True`。

> 🔗 [PR #9405](https://github.com/unslothai/unsloth/pull/9405) | [PR #9554](https://github.com/unslothai/unsloth/pull/9554)

---

### **3. 新模型与硬件支持**  
- **新增 ExLlamaV3 (EXL3) 后端** (#7115)：支持 2/3/4/6/8 位量化及 MoE 模型——对混合专家（MoE）训练与低内存部署是一次重大飞跃。  
- **请求 aarch64 容器镜像** (#4198)：社区对 Apple Silicon 与 ARM 集群原生支持的需求持续增长。  
- **DGX Spark 两节点集群** 正在开发中 (#10280)：通过 ConnectX-7 200GbE 链路实现双 DGX Spark 系统间的流水线训练。  
- **请求支持 Flux 扩散变换器** (#876)：图像生成工作负载的高优先级功能。

> 🔗 [PR #7115](https://github.com/unslothai/unsloth/pull/7115) | [Issue #876](https://github.com/unslothai/unsloth/issues/876) | [PR #10280](https://github.com/unslothai/unsloth/pull/10280)

---

### **4. 性能与优化**  
- **两节点 Spark 异步副本路由** (#10323)：通过允许配对的 DGX Spark 间并行执行任务，避免事件循环阻塞，显著提升吞吐量。  
- **共享缓存的 KV 预占机制** (#10301)：允许多个并行对话共享统一的 KV 缓存，降低内存压力，提升并发能力。  
- **FP8/FP4 压缩效率**：现需显式授权，但可带来显著内存节省——适用于大规模 LLM 导出场景。  
- **WebKitGTK 门限耗尽修复** (#10214)：通过修复 WebKit 合成描述符泄漏问题，解决了 NVIDIA X11 Linux AppImage 上的渐进式延迟问题。

> 🔗 [PR #10323](https://github.com/unslothai/unsloth/pull/10323) | [PR #10301](https://github.com/unslothai/unsloth/pull/10301) | [PR #10214](https://github.com/unslothai/unsloth/pull/10214)

---

### **5. 稳定性与回归问题**  
- **DGX Spark 上 GPU 检测失败** (#3553)：用户按官方手册操作时出现 `NotImplementedError`；可能由缺失 CUDA 驱动或内核版本不匹配导致。*待修复。*  
- **Triton 指针访问错误（CPU 张量）** (#4137)：在使用 `load_in_4bit` 进行 Qwen3-235B 训练时发生；可能源于 Triton 内核中张量处理不当。*暂无修复方案。*  
- **Gemma3 微调崩溃** (#3996)：报错 `ConstantVariable(str: 'Missing required positional argument: x')` —— 可能与过旧的 TRL 或 Hugging Face Transformers 版本有关。  
- **Ollama 集成模式崩溃** (#9986)：从 Ollama 导入的模型被错误标记为 "source=unknown"，导致库存数据损坏。*高优先级。*  

> 🔗 [Issue #3553](https://github.com/unslothai/unsloth/issues/3553) | [Issue #4137](https://github.com/unslothai/unsloth/issues/4137) | [Issue #9986](https://github.com/unslothai/unsloth/issues/9986)

---

### **6. 对应用开发者的影响**  
- **利用新双节点 Spark 拓扑构建健壮、可扩展的智能体**——适用于具备故障转移与负载均衡能力的企业级推理场景。  
- **提前准备 FP8/FP4 导出**：更新你的工作流以处理显式依赖安装（`install_missing_dependencies=True`）。  
- **避免 GPU 检测问题**：确保 CUDA 驱动与 `torch` 版本完全匹配——使用 `install.sh` 中的固定约束。  
- **关注 EXL3 后端采用情况**：它支持 MoE 与超低比特量化，为边缘与本地部署解锁更小、更快的模型。  
- **迁移废弃的 `evaluation_strategy`**（#1941 警告）至 Transformers 4.46+ 中的 `eval_strategy`，避免弃用警告。

> ✅ 技巧提示：对于超出 GPU 显存的模型，可临时启用 `UNSLOTH_ALLOW_HOST_OFFLOAD=1`（参见 #9482），但应计划采用支持卸载的部署架构。

---  
*数据来源：github.com/unslothai/unsloth | 更新时间：2026-09-07*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*