# AI 基础设施日报 2026-09-30

> 生成时间: 2026-09-30 01:30 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-09-30**

---

### **1. 生态概览**  
AI 推理与服务生态正进入 *深度专业化与跨层融合* 的阶段。vLLM 和 SGLang 在高级推测解码与可编程内存管理的推动下，持续拓展高吞吐、低延迟推理的边界。LiteLLM 与 Ollama 作为关键抽象层，实现了安全、多提供商路由以及面向代理的工具支持。与此同时，unsloth 显著提升了训练效率与模型部署速度，尤其在压缩与混合架构方面表现突出。这些项目共同体现了技术栈的成熟：性能、稳定性与开发者体验日益紧密交织——尤其是在需要持久状态、多模态输入和确定性行为的代理级工作负载中。

---

### **2. 活动对比**

| 项目         | 今日开放问题数 (Issues Open) | 今日合并 PR 数 (PRs Merged) | 发布状态       |
|-------------|-----------------------------|----------------------------|----------------|
| **vLLM**    | 8                           | 15                         | 稳定版 (`v0.30.0`)   |
| **SGLang**  | 12                          | 11                         | 预发布           |
| **llama.cpp** | 7                         | 6                          | 预发布 (`b11269`) |
| **Ollama**  | 10                          | 5                          | RC 版 (`v0.35.1-rc0`) |
| **LiteLLM** | 6                           | 9                          | 多个 RC 版 (`v1.104.0-rc.2`) |
| **Unsloth** | 5                           | 6                          | 无新版本发布     |

> ✅ *vLLM 在稳定性和活跃开发方面领先；LiteLLM 展现出最高的发布速度，且以安全为重点的 RC 版本密集推出。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构               | 支持项目                             | 核心差异点 |
|---------------------------|--------------------------------------|------------|
| **Qwen3.8-Flash-Next**    | vLLM, SGLang, llama.cpp              | vLLM 在内核融合与 AMD 支持方面领先 |
| **GLM-5.3-Flash-NVFP4**   | vLLM, SGLang                         | 两者均报告 logprob 偏移与崩溃问题 |
| **Kimi K2.5**, **DeepSeek-V4.1-Flash** | vLLM, Ollama                   | vLLM 具有更深入的稳定性修复 |
| **GraniteSpeech5ForCTC**  | llama.cpp                            | 唯一支持仅编码器的 CTC 架构项目 |
| **System One (decision-only)** | Ollama                         | 仅限 Ollama 支持；支持轻量级代理 |
| **GDN + Mamba 混合架构**  | SGLang (ROCm), vLLM                  | SGLang 在 ROCm 预填充优化方面领先 |
| **FP8 Sparse MLA (SM90+)** | SGLang (路线图), vLLM (进行中)        | SGLang 对硬件特定内核路径规划更清晰 |

> 🏆 **胜出者：vLLM** — 在 Flash、多模态及混合架构上覆盖最广，后端能力匹配度高。

---

### **4. 性能前沿**

| 优化重点                 | 领先项目                     | 关键进展 |
|--------------------------|------------------------------|----------|
| **KV 缓存管理**           | vLLM (可编程 KV 缓存 RFC)，SGLang (HiSparse) | vLLM 的可组合策略支持代理级内存控制 |
| **推测解码**              | vLLM, SGLang, llama.cpp      | vLLM 修复前缀复用问题；SGLang 优化 MoE 处理 |
| **内核融合与融合**        | vLLM (`PR #57097`)，SGLang (`PR #27220`) | vLLM 将 QK-norm/RoPE/gate 融合为单次 Triton 启动 |
| **量化与 FP8**            | vLLM (FP8 索引)，SGLang (FP8 稀疏)，llama.cpp (F32 GELU_ERF) | vLLM 在生产级 FP8 支持方面领先 |
| **分布式服务**            | LiteLLM (自动路由)，SGLang (P2P 下载) | LiteLLM 提升成本感知路由；SGLang 增加 P2P 缓存 |
| **批处理与吞吐量**        | SGLang (trace replay)，vLLM (MTP) | SGLang 支持确定性请求重放，用于基准测试 |

> 🔥 **趋势**：内核级融合与可组合内存已成为竞争性推理性能的基石——不再是可选项。

---

### **5. 层级定位**

| 项目         | 层级定位                     | 核心功能 |
|-------------|------------------------------|----------|
| **vLLM**    | **推理引擎**                 | 高吞吐、低延迟服务；内核优化 |
| **SGLang**  | **推理引擎 + 代理运行时**     | 支持混合 Mamba/GDN；trace 重放；线性重放 |
| **llama.cpp** | **本地运行时 / 边缘推理**     | 跨平台，支持 CPU/GPU/Vulkan/Hexagon；适用于边缘设备 |
| **Ollama**  | **网关 / 本地服务器**         | 统一 CLI/UI；模型管理；网页搜索集成 |
| **LiteLLM** | **LLM 网关 / 企业代理**       | 多提供商路由；成本追踪；OIDC 认证；计费支持 |
| **Unsloth** | **训练与微调框架**             | 快速微调；打包 INT4；梯度检查点；UI 监控 |

> 🧩 **战略洞察**：技术栈正在分化——**工程师**使用 vLLM/SGLang 追求性能，**运维人员**依赖 Ollama/LiteLLM 实现可管理性，**研究人员**则依靠 Unsloth 实现快速迭代。

---

### **6. 趋势信号**

#### 🔍 **从今日活动提炼的关键行业趋势**：
1. **代理内存已成为首要关注点**  
   → vLLM 的 *可编程 KV 缓存* RFC 与 SGLang 的 HiSparse 前缀处理表明，会话状态管理已不再只是附加功能，而是智能体系统的核心。

2. **硬件多样性催生后端专业化**  
   → SGLang（FlyDSL）与 vLLM（gfx950/MI355X）在 AMD ROCm 上的进展显示，GPU 异构性正推动 *针对后端的专门优化*，而不仅是可移植性。

3. **安全与身份认证已嵌入网关层级**  
   → LiteLLM 的签名 Docker 镜像、OIDC 支持与 Entra 集成表明，企业级 LLM 网关必须默认包含身份联邦、审计日志与加密验证。

4. **稳定性不再是可选配置，而是生产必备**  
   → `GLM-5.3-Flash`、`DeepSeek-V4.1-Flash` 与 `Qwen3.8 DFlash` 在 vLLM、SGLang 与 llama.cpp 中出现的严重崩溃问题，凸显即使顶级模型也需严格的运行时验证。

5. **微调效率成为下一战场**  
   → Unsloth 对打包 INT4、不可重入检查点与上下文并行的聚焦，表明训练吞吐量——而不仅仅是推理——正被内核级别优化。

#### 📌 **应用开发者应重点关注**：
- 在稳定性补丁发布前，避免对 `Qwen3.8`、`GLM-5.3-Flash` 或 `DeepSeek-V4.1` 使用推测解码。
- 在 LiteLLM 部署中使用 `x-litellm-call-id` 以实现可观测性——如今这是追踪代理工作流的必要手段。
- 利用 `X-Unsloth-Monitor-ID` 构建长预填充任务中的实时用户体验反馈。
- 使用 TorchDynamo 或混合硬件（AMD/CUDA）时，务必锁定稳定提交版本。
- 监控 Ollama Cloud 的计费循环与 MLX 停顿——它们是生产流水线中的系统性风险。

> ✅ **最终结论**：基础设施层已不再只关乎速度——它关乎 **可靠性、可组合性与可信度**。选择工具时，不仅要考量原始性能，更要评估其在复杂代理逻辑与企业需求下的安全扩展能力。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-30**

---

### **1. 今日亮点**  
vLLM 项目持续深化对多模态及推测解码工作负载的支持，修复了在 MTP（多标记预测）场景下前缀缓存损坏的关键问题，以及 GLM-5.3-Flash 在高并发部署中的稳定性缺陷。关键进展包括：提出 *可编程 KV 缓存策略* 的新 RFC，以支持可组合、面向智能体的服务工作流；并在 NVIDIA 与 AMD 硬件上对 Qwen3.8-Flash-Next 实现性能优化。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未观察到新版本发布或 API/config 的破坏性更改。最新稳定版本仍为 `v0.30.0`。

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - **Qwen3.8-Flash-Next** 正在积极开发中，包含针对 QK-norm/RoPE/gate 的内核融合优化（`PR #57097`）。  
  - **GLM-5.3-Flash** 在多个后端（Ada SM89、B200 TP4+EP）持续优化中，正在进行稀疏-MLA 注意力路径改进（`#54059`）和 FP8 自动调优（`#58864`）。  
  - **Kimi K2.5**、**DeepSeek-V4.1-Flash** 以及 **NVIDIA Qwen3.6-35B-A3B-NVFP4** 正在进行针对性的稳定性与正确性修复。

- **硬件与后端**：  
  - **ROCm / AMD**：通过 `PR #57149` 对 `gfx950`/`MI355X`（Qwen3.8-2.4T-A95B）进行性能追踪。  
  - **NVIDIA**：针对 H20、B200、GB300 及 RTX 4090（SM89）平台的修复正在推进。  
  - **Intel XPU**：模型加载期间内存减少问题（`#50269`）仍开放但已跟踪。

---

### **4. 性能与优化**  
- **内核与内存优化**：  
  - **Qwen3.8-Flash-Next**：将 QK-norm/RoPE/gate 与 KV 缓存写入合并为单次 Triton 启动（`PR #57097`），降低内核开销。  
  - **FP8 加速**：Triton 索引器中实现 MiniMax-M3 的原生 FP8 点积（`PR #59331`），提升吞吐量；精度评估待完成。  
  - **ROCm**：为 Qwen3-Next 启用融合的 QK-norm+RoPE+gate 内核（`PR #51406`）。

- **KV 缓存与卸载**：  
  - **HiSparse**：修复请求完成后主机前缀发布丢失的问题（`PR #59007`）。  
  - **P2P KV 卸载**：通过从本轮停放供应中丢弃超时存储任务块，改进超时处理（`PR #59329`）。  
  - **可编程 KV 缓存（RFC）**：`#57103` 提出可组合的保留、迁移与配额策略——为智能体级内存管理奠定基础。

- **推测解码**：  
  - 修复 drafter KV 组误识别问题，防止 Mamba 组中前缀复用被禁用（`#57032`）。  
  - 在 MTP 推测解码下恢复混合 GDN 前缀缓存命中（`PR #52244`）。

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - **GLM-5.3-Flash**：在 B200（TP4+EP，MTP）环境下，长上下文分块预填充阶段仍存在非法内存访问问题，即使在 `v0.30.0` 版本中也持续发生——多位用户确认（`#59115`）。  
  - **DeepSeek-V4.1-Flash**：在 H20 GPU 上，高并发（>256 `max_num_seqs`）下 `dsv4_topk` MoE 内核出现 CUDA 非法内存访问（`#56389`）。通过将 `max_num_seqs` 降低至 256 已缓解。

- **正确性缺陷**：  
  - **工具调用**：在 `/v1/chat/completions` 上 `tool_choice: "required"` 强制执行失效，表现为静默失败（`#54808`）。  
  - **流式工具解析器**：在并发负载下，Kimi K2 解析器间歇性出现空 `tool_calls` delta（`#54701`）。  
  - **提示词 logprobs 损坏**：当启用 MTP 推测解码时，会无声损坏（`#53488`）。

- **修复进行中**：  
  多个 PR 正直接修复上述问题：  
  - `PR #59331`（FP8 索引）  
  - `PR #57097`（内核融合）  
  - `PR #52244`（GDN 前缀缓存）  
  - `PR #59007`（HiSparse 前缀发布）

---

### **6. 对应用开发者的意义**  
- **智能体与智能体工作流**：使用 `#57103`（可编程 KV 缓存）实现对会话状态与内存压力的细粒度控制——对长时间运行的智能体至关重要。  
- **生产稳定性**：在 H20 上使用 `DeepSeek-V4.1-Flash` 时，避免设置 `max_num_seqs > 256`，直到 `#56389` 修复。监控 `#59115` 中关于高吞吐环境下的 GLM-5.3-Flash 崩溃风险。  
- **多模态与混合模型**：使用 `--tool-call-parser kimi_k2` 或 `qwen3_coder` 时需谨慎——流式工具调用可能静默失败（`#54701`, `#54808`）。  
- **性能调优**：启用融合内核（`#57097`, `#51406`），并通过 `KVEvents`（`#57789`）监控 KV 缓存指标，以增强分布式架构下的可观测性。

> 🔗 **关键链接**：  
> - [GLM-5.3-Flash 崩溃追踪](https://github.com/vllm-project/vllm/issues/59115)  
> - [可编程 KV 缓存 RFC](https://github.com/vllm-project/vllm/issues/57103)  
> - [Qwen3.8-Flash-Next 内核融合 PR](https://github.com/vllm-project/vllm/pull/57097)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-30

---

### **1. 今日亮点**  
SGLang 生态系统持续成熟，混合 Mamba/GDN 模型与 AMD ROCm 支持方面进展活跃，尤其集中在 GDN 预填充后端和 FP8 量化。关键稳定性修复已合并至 `--strip-thinking-cache` 与 `--enable-linear-replayssm`，新提交聚焦于提升追踪回放、内核正确性以及高吞吐场景下的内存效率。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
但正在进行的变更可能影响用户：
- `--enable-linear-replayssm` 现在强制启用 `no_buffer`，导致 Mamba 前缀缓存性能下降，并使 TTFT 最高增加 **4.7x**（参见 [Issue #37834](https://github.com/sgl-project/sglang/issues/37834)）。
- `is_musa()` 图形中断问题（PR #39054）自提交 `b6c31b155c` 起影响 TorchDynamo 追踪及 CUDA 图捕获的预填充路径。

---

### **3. 新模型与硬件支持**  
- ✅ **AMD ROCm 支持**：正在集成基于 FlyDSL 的 GDN 预填充内核以支持 AMD gfx95（如 Qwen3.5-397B），相较于基线性能提升 **1.4–1.74x**（参见 [PR #39595](https://github.com/sgl-project/sglang/pull/39595)）。
- ✅ **Quark 权重布局优化**：新提交 ([#41794](https://github.com/sgl-project/sglang/pull/41794)) 为 ROCm 解码引入 Quark 权重布局，以提升速度。
- ✅ **SM90 Q8KV8 FP8 稀疏 MLA 内核**：在向 SM90+ GPU 集成稀疏 MLA 预填充内核方面取得路线图进展（参见 [Issue #25746](https://github.com/sgl-project/sglang/issues/25746)）。
- ✅ **Apple Silicon (MLX)**：修复逻辑令牌容量变更后的 MLX 启动问题（参见 [PR #41314](https://github.com/sgl-project/sglang/pull/41314)）。

---

### **4. 性能与优化**  
- 🔧 **混合 Mamba/GDN 优化**：修复在混合模型（如 Qwen3.5-35B-A3B）上启用 radix 缓存时出现的严重 TTFT 退化问题（约慢 **17.8x**）（参见 [PR #27220](https://github.com/sgl-project/sglang/pull/27220)）。
- ⚙️ **内核级改进**：
  - 为 `merge_state_v2` 内核添加 64 位索引，防止大批次/长序列工作负载中的整数溢出（参见 [PR #29720](https://github.com/sgl-project/sglang/pull/29720)）。
  - 减少推测解码过程中的重复注意力设置（参见 [PR #38213](https://github.com/sgl-project/sglang/pull/38213)）。
- 📈 **追踪回放与分析**：新增 `trace_decode_token_ids` 支持，可强制解码输出序列（参见 [PR #39157](https://github.com/sgl-project/sglang/pull/39157)），支持请求回放与性能基准测试。

---

### **5. 稳定性与回归问题**  
今日报告的关键问题包括：
1. **`--strip-thinking-cache` 模式下双重释放崩溃**，由 KV slot 释放不当引起（参见 [Issue #41617](https://github.com/sgl-project/sglang/issues/41617)) — *暂无修复*。
2. **`GLM-5.3-Flash-NVFP4` 日志概率从 2026-09-18 后出现比特级漂移**，可能源于 KDA 融合门改动（参见 [Issue #41609](https://github.com/sgl-project/sglang/issues/41609)) — *从 2026-09-21 至 27 可每日复现*。
3. **FlashInfer TRTLLM MoE 批量 GEMM 在 `sm100f` 上因解耦预填充导致崩溃**（参见 [Issue #31864](https://github.com/sgl-project/sglang/issues/31864)) — *正在追踪中*。
4. **启用 DP-Attention 时概率张量出现 NaN/inf**（参见 [Issue #21460](https://github.com/sgl-project/sglang/issues/21460)) — *持续存在的缺陷*。

> 💡 *注意：当前 CI 流水线报告 1 个失败、10 个不稳定、1,108 个近期修复的测试（参见 [Issue #17050](https://github.com/sgl-project/sglang/issues/17050)）。*

---

### **6. 对应用开发者的影响**  
- 若使用 **混合 Mamba/GDN 模型**，请避免使用 `--strip-thinking-cache`，直到 #41617 修复；若启用 `--enable-linear-replayssm`，预计会带来更高的 TTFT。
- 对于 **AMD ROCm 部署**，建议通过 `--moe-a2a-backend flydsl`（PR #39595）测试新 FlyDSL GDN 后端，以提升预填充吞吐。
- 使用 `--max-total-tokens` 时需谨慎，混合模型曾报告模拟器崩溃（参见 [Issue #41654](https://github.com/sgl-project/sglang/issues/41654)）。
- 利用 `trace_decode_token_ids`（PR #39157）进行确定性代理行为测试与回放分析。
- 若使用 TorchDynamo 并搭配自定义预填充路径，请关注 `is_musa()` 相关 Dynamo 图中断问题。

👉 **推荐操作**：  
- 若使用 TorchDynamo，建议锁定至已知稳定提交（如 `b6c31b155c` 之前版本）。  
- 因近期回归问题频发，建议在 nightly 构建上测试关键模型服务流程。  
- 遇到 AMD/Moore Threads 问题，欢迎加入 Slack（`slack.sglang.io`）获取实时调试支持。

---  
*数据来源：github.com/sgl-project/sglang | 更新时间：2026-09-30*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-30**

---

### **1. 今日重点**  
最新开发周期聚焦于 Vulkan 后端在 Intel 与 AMD 显卡上的稳定性与性能调优，修复了 MoE 分发逻辑的关键问题以及 F32 加载对齐问题。在 Hexagon 平台上新增对 FP32 GELU_ERF/GEGLU_ERF 的支持，同时 CI 流水线更新（PR #29651）标志着跨架构成熟度持续提升。`ggml` 中的一项重要修复通过 `GGML_COMMON_DECL_CPP` 实现了正确的 ODR 兼容性，解决了 C++ 链接问题。

---

### **2. 发布与破坏性变更**  
今日未发布正式版本；最新构建为预发布版（`b11269`、`b11268` 等）。但已合并若干**非破坏性但影响显著的变更**：
- `ggml`：使用 `GGML_COMMON_DECL_CPP` 修复 C++ ODR 违规问题 ([#29504](https://github.com/ggml-org/llama.cpp/pull/29504))
- `ggml`：强制输入张量验证，要求必须为 `GGML_OP_NONE` ([#29647](https://github.com/ggml-org/llama.cpp/pull/29647))
- `vocab`：通过跳过对 `</s>` 标记为 `NORMAL` 的启发式判断，防止 PLaMo-2/3 出现错误的 EOG token 分类 ([#29580](https://github.com/ggml-org/llama.cpp/pull/29580))

> ✅ *注意：未报告破坏性 API 变更。若使用自定义后端或张量操作，开发者应自行验证行为。*

---

### **3. 新模型与硬件支持**  
- **Hexagon**：新增 `GELU_ERF` 与 `GEGLU_ERF` 内核的完整 FP32 支持 ([#29631](https://github.com/ggml-org/llama.cpp/pull/29631)) — 对高通 AI 芯片上的高精度推理至关重要。
- **Vulkan**：引入可选兼容性保护机制以应对 Adreno 750 驱动程序问题 ([#29165](https://github.com/ggml-org/llama.cpp/pull/29165))，缓解 Galaxy S24 上着色器编译段错误。
- **模型架构**：初步支持 `GraniteSpeech5ForCTC`（Turbo CTC），一种仅编码器的非自回归模型 ([#29446](https://github.com/ggml-org/llama.cpp/pull/29446)) — 支持语音转文本流程。
- **后端**：CI 现已包含 `models-check` 流水线，覆盖 `fusion` 测试，实现更广泛的后端验证 ([#29651](https://github.com/ggml-org/llama.cpp/pull/29651))。

---

### **4. 性能与优化**  
- **Vulkan**：优化 GDN 内核并调整 Intel 特定内存访问模式 ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476))。
- **Vulkan**：改进 `mat_mul_id` 中 MoE 友好的瓦片选择策略，避免低 token 数量时次优的工作组分配 ([#29182](https://github.com/ggml-org/llama.cpp/pull/29182))。
- **Vulkan**：当对齐（如 2 字节对齐）时启用一次加载两个 F32 矩阵，提升 Intel GPU 上的吞吐量 ([#29254](https://github.com/ggml-org/llama.cpp/pull/29254))。
- **AVX512-FP16**：将 f16 点积累加至 f32，以提高精度并改善收敛性 ([#29545](https://github.com/ggml-org/llama.cpp/pull/29545))。

> 🔍 *预计在高吞吐量 MoE 模型（如 Qwen3-Coder-Next 30B-A3B）和混合精度推理工作流中获得显著性能提升。*

---

### **5. 稳定性与回归问题**  
今日报告了若干关键问题：
- **Vulkan** 在多专家 MoE 模型上出现批量解码“悬崖效应”（B=9）（AMD Strix Halo gfx1151）—— 吞吐量从 122.5 → 82.9 t/s ([#25356](https://github.com/ggml-org/llama.cpp/issues/25356)) — *修复待处理*。
- **Qwen3.8 DFlash/MTP 试探性解码崩溃**，因 Vulkan 上越界 token ID（n_vocab = 248320）所致 ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158)) — *严重级别高，尚未修复*。
- **Vulkan 长时间运行解码性能退化**，在 A770 显卡上运行约 7–8 小时后导致空 EOS 回复 ([#29526](https://github.com/ggml-org/llama.cpp/issues/29526)) — *疑似 GPU fence 或内存泄漏*。
- **macOS Metal OOM**：在 Gemma 4 31B 模型上，即使统一内存充足，使用大默认 `n_ctx` 仍发生内存溢出 ([#29521](https://github.com/ggml-org/llama.cpp/issues/29521)) — *可能存在内存计数错误*。

> ⚠️ *这些问题对使用 MoE、DFlash 或长会话部署的服务器端应用构成高风险。*

---

### **6. 对应用开发者的启示**  
- **避免在 Qwen3.8 模型上使用 `--spec-type draft-mtp`**，直至 [#28158](https://github.com/ggml-org/llama.cpp/issues/28158) 修复完成 — 该选项会触发越界 token 错误。
- **谨慎使用 `--cache-ram -1`**：它不会禁用限制 — 每个短提示会导致内存增长约 640 MiB ([#29324](https://github.com/ggml-org/llama.cpp/issues/29324))。仅在必要时使用 `--cache-idle-slots`。
- **仅在必要时启用 `--no-kv-offload`**：该选项在某些 Qwen3.6 模型的 Vulkan 上会导致立即生成 EOS ([#24519](https://github.com/ggml-org/llama.cpp/issues/24519)) — 除非调试，否则避免使用。
- **监控 Vulkan/Arc A770 上的长时间任务**：运行 7–8 小时后预期输出质量下降 ([#29526](https://github.com/ggml-org/llama.cpp/issues/29526))。
- **利用新 `LLM-jp-4.1` 解析器**，通过 `--jinja` 支持日语 LLM — 提升工具调用解析准确性 ([#29681](https://github.com/ggml-org/llama.cpp/pull/29681))。
- **考虑路由器模式下的 `--ui-config-file` 设置**：现在首次访问即生效 ([#29668](https://github.com/ggml-org/llama.cpp/pull/29668))。

> 🛠️ *建议使用 `b11269+` 测试 Vulkan/Metal 稳定性及 `--no-kv-offload` 使用场景。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-30**

---

### **1. 今日亮点**  
Ollama v0.35.1-rc0 引入了增强的网页搜索支持（每条响应最多 10 次），并更新了 `llama.cpp`（b11232）和 MLX 后端版本，标志着在更广泛的多模态能力与推理效率提升方面取得进展。关键开发者相关变更包括新增 System One 模型功能以及改进的工具调用解析稳定性。

---

### **2. 发布与破坏性变更**  
- **v0.35.1-rc0** 已发布，包含：  
  - ✅ **网页搜索扩展**：通过 `web_search` 参数实现每条响应最多 10 次网页搜索 ([#18602](https://github.com/ollama/ollama/pull/18602))。  
  - 🔧 **MLX 版本升级**：更新至最新 MLX 构建版本，以优化 Apple Silicon 性能 ([#18651](https://github.com/ollama/ollama/pull/18651))。  
  - 🔧 **llama.cpp 版本升级**：更新至 `b11232`，以提升 CUDA 与 CPU 性能 ([#18652](https://github.com/ollama/ollama/pull/18652))。  
- ⚠️ **Bug 提示**：v0.35.0 被错误地标记为预发布版本而未附加 `-rc` 后缀——已确认为非预期行为 ([#18706](https://github.com/ollama/ollama/issues/18706))。

---

### **3. 新模型与硬件支持**  
- **System One 模型**：通过 Modelfiles 中的 `CAPABILITY` 声明，新增对仅决策类模型（如 Kev、Laya）的实验性支持 ([#18708](https://github.com/ollama/ollama/pull/18708), [#18701](https://github.com/ollama/ollama/pull/18701))。  
- **GraniteForCausalLM**：在 MLX 后端上新增对 IBM Granite 4.1/4.2 模型的实验性支持 ([#17972](https://github.com/ollama/ollama/pull/17972))。  
- **硬件**：持续聚焦 Apple Silicon（MLX）、Windows CUDA（GPU 发现问题仍在修复中）以及 Linux 兼容性（glibc 链接器修复：[#17567](https://github.com/ollama/ollama/pull/17567))。

---

### **4. 性能与优化**  
- **上下文长度自动调优**：基于显存的默认上下文窗口现在动态调整（≥47 GiB → 256k；≥23 GiB → 32k；否则为 4k）——已在 FAQ 文档中说明 ([#18710](https://github.com/ollama/ollama/pull/18710))。  
- **工具调用健壮性**：已合并多项修复，防止过早或格式错误的工具调用处理（例如缺少闭合大括号、部分标签重叠）——对代理可靠性至关重要 ([#17565](https://github.com/ollama/ollama/pull/17565), [#18289](https://github.com/ollama/ollama/pull/18289), [#18624](https://github.com/ollama/ollama/pull/18624))。  
- **思考预算机制**：提议为每个请求/模型设置令牌预算上限，以防止无限推理循环 ([#17566](https://github.com/ollama/ollama/pull/17566))。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 状态 |
|--------|------|--------|--------|
| 🟡 关键 | `llama-server` 在全缓存命中任务下卡死（CUDA/Linux） | 所有后续请求挂起直至卸载 ([#18685](https://github.com/ollama/ollama/issues/18685)) | 未解决 |
| 🟡 高 | MLX nvfp4 在持续负载下停滞（零令牌处理） | 请求无限挂起；仅可通过 SIGTERM 恢复 ([#18505](https://github.com/ollama/ollama/issues/18505)) | 未解决 |
| 🟡 高 | macOS GUI 在长时间文档处理后静默失败 | 无错误提示；用户无法察觉失败 ([#18368](https://github.com/ollama/ollama/issues/18368)) | 未解决 |
| 🔴 严重 | Ollama Cloud 计费循环（Stripe 重试泛滥） | 用户无法升级或降级订阅 ([#18683](https://github.com/ollama/ollama/issues/18683)) | 未解决 |

> *注：多个 PR 已针对底层解析逻辑（如思考标签、工具调用验证）进行修复，但上述回归问题尚未有直接修复方案。*

---

### **6. 对应用开发者的意义**  
- **代理与工具使用**：预计工具调用解析将更加可靠，并显著降低无限思考循环的风险。请谨慎使用 `thinking` 预算——未来 API 可能强制执行。  
- **模型选择**：随着 System One 支持逐步落地，建议在轻量级、高吞吐的“是/否”或评分任务中使用 `CAPABILITY=decision`。  
- **部署策略**：关注 MLX (`nvfp4`) 和 CUDA 平台上的 GPU 停滞问题（尤其在持续负载下）。若延迟敏感，避免在生产环境中使用 `OLLAMA_NUM_PARALLEL=1`。  
- **离线工作流**：新推出的 `ollama export/import` CLI 命令 ([#18578](https://github.com/ollama/ollama/pull/18578)) 可在隔离环境间安全传输模型。  
- **UI/UX 注意事项**：请注意桌面客户端中聊天历史现已设为只读（PR [#18700](https://github.com/ollama/ollama/pull/18700)），且 macOS 上侧边栏缩放功能已损坏（[#18709](https://github.com/ollama/ollama/issues/18709))。

---  
*数据来源：[github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-09-30**

---

### **1. 今日重点**  
LiteLLM 代理持续快速迭代，重点聚焦于安全强化、高并发场景下的稳定性提升，以及与企业身份系统更深层次的集成。关键进展包括：改进会话令牌处理机制，修复关键的成本追踪与响应流式传输缺陷，并增强代理授权控制。目前报告发现 OpenAI gpt-5.6 系列模型（如 `gpt-5.6-sol`）在函数工具调用方面存在显著回归问题，正在积极排查中。

---

### **2. 版本发布与破坏性变更**  
- 过去 24 小时内发布了 **v1.104.0-rc.2**、**v1.103.1**、**v1.102.2**、**v1.101.3** 和 **v1.100.4** 版本。  
- 所有 Docker 镜像均通过 [cosign](https://docs.sigstore.dev/cosign/overview/) 使用同一密钥进行加密签名，该密钥自 [提交 `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 引入。  
- **迁移提示**：在 PR #30178 ([#31222](https://github.com/BerriAI/litellm/issues/31222)) 中已移除 `/chat` 路由，可能影响依赖旧版聊天端点的 UI 集成。

---

### **3. 新模型与硬件支持**  
- **Anthropic 工作负载身份联合（OIDC JWT-bearer）**：通过 [问题 #28607](https://github.com/BerriAI/litellm/issues/28607) 新增支持 —— 在云原生环境中为 Anthropic 模型提供安全、联邦化的身份认证。  
- **Gemini Robotics ER-2 预览版**：现已支持模型定价配置（`gemini/gemini-robotics-er-2-preview`），但因推理令牌成本映射错误，计费逻辑需修正 ([#43575](https://github.com/BerriAI/litellm/issues/43575))。  
- **Bedrock Converse 路由**：区域别名现在可正确继承 Converse 路由元数据 ([PR #43785](https://github.com/BerriAI/litellm/pull/43785))。

---

### **4. 性能与优化**  
- **认证刷新优化**：PR [#43776](https://github.com/BerriAI/litellm/pull/43776) 通过管道化批量处理 Redis 操作，将每密钥认证刷新延迟降低 —— 之前每分钟最多触发 16 次串行 Redis 调用。  
- **OTel Span 过滤**：引入 `excluded_services` 选项以排除租户目标中的数据存储 Span（[PR #43278](https://github.com/BerriAI/litellm/pull/43278)），减少遥测噪声并提升数据摄入效率。  
- **批量明细项存储**：PR [#41691](https://github.com/BerriAI/litellm/pull/41691) 支持回调存储单个批量 JSONL 行项目，确保服务提供商过期后仍可追溯。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |
|--------|------|------|--------|
| 严重 | OpenAI gpt-5.6 系列模型（`gpt-5.6-sol`、`gpt-5.6-luna`）在使用 `reasoning_effort=xhigh` 时函数工具调用失败 | 开放 | [问题 #33221](https://github.com/BerriAI/litellm/issues/33221) |
| 高 | `PromptTokensDetailsWrapper` 在 `cache_creation_tokens`/`cache_write_tokens` 未设置时抛出 `AttributeError`（DashScope 首次请求） | 开放 | [问题 #43756](https://github.com/BerriAI/litellm/issues/43756) |
| 高 | 多个日志回调仅使用最后一个凭证集；导致遥测路由错误 | 已关闭 | [PR #30825](https://github.com/BerriAI/litellm/pull/30825) |
| 中 | 即使未配置自动路由，每次调用 `/v1/messages` 均记录 `auto-router baseline observation could not be initialized` 警告 | 开放 | [问题 #43658](https://github.com/BerriAI/litellm/issues/43658) |
| 中 | 用户/团队支出缓存丢失并发递增 | 开放 | [问题 #43491](https://github.com/BerriAI/litellm/issues/43491) |

> 🔴 **严重提醒**：gpt-5.6 系列问题影响函数调用流程 —— 请避免在修复前使用 `reasoning_effort=xhigh`。

---

### **6. 对应用开发者的意义**  
- **安全**：使用签名镜像（`cosign verify`），并确保您的 CI/CD 流水线验证镜像签名。  
- **代理开发**：若使用函数工具或结构化输出，请谨慎对待 `gpt-5.6` 模型 —— 可能存在不稳定性。  
- **成本追踪**：启用 `include_cost_in_streaming_usage` ([#31840](https://github.com/BerriAI/litellm/issues/31840)) 以在流式传输过程中实时查看成本。  
- **身份与权限**：利用新推出的 Entra 身份支持 ([PR #43722](https://github.com/BerriAI/litellm/pull/43722)) 与托管代理权限控制 ([PR #43721](https://github.com/BerriAI/litellm/pull/43721))，实现多团队部署中的细粒度访问控制。  
- **遥测**：使用 `x-litellm-call-id` 实现日志、OTel 跟踪与请求头之间的跨上下文关联 —— 当前已在搜索和日志 UI 中展示 ([PR #42436](https://github.com/BerriAI/litellm/pull/42436))。  

👉 **行动建议**：审查近期关于认证、成本与流式传输的 PR，尤其是涉及并发、日志与响应完整性的变更。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-30**

---

### **1. 今日亮点**  
Unsloth 项目持续推进激进优化，重点修复 vLLM 0.29 兼容性及 packed INT4 推理问题，包括 `marlin_gemm` 崩溃的修复。Studio 的关键 UI/UX 改进已上线——尤其在预填充进度可视性、HTML 预览保真度和模型更新安全性方面；同时通过为 DeepSeek-V4.1 加强梯度检查点机制，进一步提升了核心训练稳定性。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
但 **PR #12320** 解决了一个关键回归问题：packed INT4 推理现在能正确处理 vLLM 0.29 中的 `marlin_gemm` 调用，采用基于操作符模式的 GEMM 构建方式。此更改对依赖压缩张量检查点的用户至关重要。  
→ [PR #12320](https://github.com/unslothai/unsloth/pull/12320)

此外，**PR #12318** 为 `deepseek_v41` 强制启用非重入式梯度检查点，防止高吞吐训练场景下的数据损坏。  
→ [PR #12318](https://github.com/unslothai/unsloth/pull/12318)

---

### **3. 新模型与硬件支持**  
*今日未新增模型架构。*  
但针对 **多 GPU 与异构硬件支持** 的工作持续推进：  
- **AMD ROCm + CUDA 共存** 在各类流程中（如在 AMD 上训练，NVIDIA 上推理）正逐步稳定。  
- **PR #12248** 实现双卡并行用于不同任务（例如：在 NVIDIA 上运行图像生成，在 AMD 上进行聊天或训练）。  
- **PR #12247** 修复了当训练与推理后端不一致时，系统标签页中 GPU 报告错误的问题。  
→ [PR #12248](https://github.com/unslothai/unsloth/pull/12248), [PR #12247](https://github.com/unslothai/unsloth/pull/12247)  

此外，**PR #12310** 优化了视觉模型对透明图像的处理，确保 PNG/WebP/GIF 资源中的深色文字得以保留。  
→ [PR #12310](https://github.com/unslothai/unsloth/pull/12310)

---

### **4. 性能与优化**  
- **上下文并行（CP）**：PR #4257 引入 SDPA ring attention 用于 SFT，实现上下文长度随 GPU 数量线性扩展。适用于大规模多 GPU 集群上的微调任务。  
→ [PR #4257](https://github.com/unslothai/unsloth/pull/4257)  

- **内核级优化**：  
  - **PR #12317** 确保 `FP8Linear.block_size` 在前向传播中被正确遵循，对 32x32 块大小的 FP8 检查点至关重要。  
  - **PR #12319** 在 LoRA 训练期间冻结 BatchNorm 运行统计量，防止漂移并提升泛化能力。  
→ [PR #12317](https://github.com/unslothai/unsloth/pull/12317), [PR #12319](https://github.com/unslothai/unsloth/pull/12319)  

- **延迟降低**：  
  - **PR #11161** 通过 API 监控器（`X-Unsloth-Monitor-ID`）暴露实时预填充进度，使客户端可在长提示处理期间显示加载指示器。  
  → [PR #11161](https://github.com/unslothai/unsloth/pull/11161)  

---

### **5. 稳定性与回归问题**  
*今日报告的关键问题包括：*  
1. **vLLM 在 packed INT4 推理时崩溃**（`marlin_gemm` 类型不匹配）：  
   - 影响使用 `compressed-tensors` 模型且运行于 vLLM 0.29 的用户。  
   - **已有修复方案**：PR #12320 通过操作符模式构建 Marlin GEMM 调用，解决该问题。  
   → [Issue #4073](https://github.com/unslothai/unsloth/issues/4073), [PR #12320](https://github.com/unslothai/unsloth/pull/12320)  

2. **M5 Max（48GB RAM）内存耗尽**：  
   - 用户报告无法运行 `Qwen-Image-2.1-Q4_K_M`，因初始 GGUF 获取后需下载约 19 GB 的“所需资源”。  
   - 可能与 Studio 中冗余资源获取或缓存逻辑有关。  
   → [Issue #11792](https://github.com/unslothai/unsloth/issues/11792)  

3. **自引用 shell 赋值导致硬冻结**：  
   - 终端工具调用中包含 `VAR=$VAR` 的单引号字符串会导致应用级冻结，源于无限递归。  
   - **可复现**，需立即修复。  
   → [Issue #12084](https://github.com/unslothai/unsloth/issues/12084)  

4. **升级至 v0.1.806-beta 后，Gemma 4 31B 训练崩溃**：  
   - 错误信息：`"indices should be either on cpu or on the same device as the indexed tensor (cuda:0)"`。  
   - 可能与近期 CUDA/设备管理变更相关。  
   → [Issue #11952](https://github.com/unslothai/unsloth/issues/11952)  

---

### **6. 对应用开发者的启示**  
- **对于以推理为主的应用**：使用 `fast_inference=True` 时需谨慎——确保模型架构（如 LFM2.5）兼容 vLLM 状态字典提取。留意类似 #4073 的崩溃风险。  
- **对于使用 MCP 工具构建代理的开发者**：预期获得更优的 HTML 小部件渲染体验（#9301, #12310）以及预览中更好的错误可见性。若未沙箱化，请避免依赖 `ui://` 资源。  
- **对于训练流水线**：注意 `BatchNorm` 统计量可能漂移，除非显式冻结（参见 PR #12319）。DeepSeek-V4.1 建议使用 `non-reentrant` 检查点（参见 PR #12318）。  
- **对于低延迟用户体验**：利用新的 `X-Unsloth-Monitor-ID` 头部字段追踪预填充进度，在长提示处理期间提供实时反馈。  
- **对于混合硬件部署**：现在可安全地在 AMD ROCm 上训练，同时使用 CUDA 进行推理（通过 PRs #12248–#12246），但请务必在 设置 > 系统 中验证后端选择。  

> ✅ **可操作建议**：若使用 vLLM 0.29、packed INT4 或 DeepSeek-V4.1，立即更新至最新版 unsloth/unsloth_zoo。关注即将发布的补丁，以修复内存泄漏和冻结类漏洞。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*