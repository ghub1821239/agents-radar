# AI 基础设施日报 2026-09-21

> 生成时间: 2026-09-21 00:28 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-09-21**

---

### **1. 生态概览**  
2026年第三季度，AI 推理基础设施格局呈现出在性能、可扩展性与开发者体验边界快速专业化与融合的特征。各项目正沿着架构方向日益分化：高吞吐引擎（vLLM、SGLang）聚焦分布式服务与内核级优化；轻量级运行时（llama.cpp、Unsloth）优先考虑可移植性与低延迟本地执行；而网关类项目（Ollama、LiteLLM）则强调易用性、工具链与成本可视性。对*有状态代理工作负载*的明显需求正在推动对细粒度缓存控制、多模型路由与恢复韧性功能的追求——这在新引入的 `KvHints`、权重缓存守护进程以及会话感知路由中已有体现。

---

### **2. 活动对比**

| 项目       | 开放问题 | 开放 PR | 最近发布？ | 状态备注 |
|---------------|-------------|----------|------------------|--------------|
| **vLLM**      | 48          | 72       | 否 (v0.28.1rc1) | 高稳定性风险；GLM-5.3-Flash 与推测解码存在严重缺陷 |
| **SGLang**    | 61          | 89       | 否               | 工程投入密集；319 个核心转储报告表明运行时不稳定 |
| **llama.cpp** | 54          | 68       | 是 (b11065+)   | 持续进行 CUDA/ROCm 调优；MoE 流式支持使边缘部署成为可能 |
| **Ollama**    | 76          | 41       | 否               | 专注硬件兼容性；Vulkan/MLX 稳定性修复正在进行中 |
| **LiteLLM**   | 82          | 57       | 是 (v1.103.0-rc.1)| 通过 cosign 实现安全加固；预算追踪仍是主要关切点 |
| **Unsloth**   | 49          | 34       | 否 (v0.1.811-beta)| 关键 GGUF 吞吐回归；Windows沙箱化开发中 |

> 🔍 *洞察：* SGLang 与 LiteLLM 在工程速度（PR 数量）上领先，但 vLLM 与 Ollama 因存在开放的严重级别1问题而面临更高的稳定性压力。

---

### **3. 模型支持竞赛**

| 新模型 / 架构         | 支持项目                          | 核心差异点 |
|----------------------------------|----------------------------------------|--------------------|
| **DeepSeek-V4.1**                | vLLM、SGLang                           | vLLM 在 ROCm 上实现特定融合（mHC + all-reduce）；SGLang 引入 Dynamo 路由 |
| **MiniMax-M3**                   | vLLM（ROCm 上上下文并行稀疏索引） | 唯一在 gfx950 上支持 opt-in TP>1 的项目 |
| **Qwen3.8-MoE (UD-Q6_K)**        | llama.cpp (`--load-mode streaming`)   | 在 24GB VRAM 上实现 96K 上下文 —— 边缘场景无出其右 |
| **GLM-5.3-Flash**                | vLLM、SGLang、Ollama                    | 三者均存在退化缺陷；vLLM 通过 `KvHints` 提供最佳 KV 缓存控制 |
| **Kimi-K3**                      | SGLang（原生 Dynamo 路由）         | 首个支持令牌级缓存转发的项目 |
| **Snapdragon X Elite NPU**       | Ollama（功能请求）               | 唯一积极推进 ARM 原生加速的项目 |
| **RTX 5070 Ti (sm_120)**         | Unsloth（问题报告）               | 与官方 llama.cpp 相比性能差距凸显生态碎片化 |

> 🏆 **赢家：** **llama.cpp** 在*实际模型可用性*（MoE 流式、跨 GPU 可移植性）上领先，而 **vLLM** 在*顶级模型的高性能优化推理*方面占据主导地位。

---

### **4. 性能前沿**

| 优化重点             | 领先项目                        | 关键进展 |
|-------------------------------|-----------------------------------------|--------------|
| **KV 缓存管理**       | vLLM（KvHintsEnvelope）、SGLang（HiCache） | vLLM 的类型化 `KvHints` 实现代理状态控制；SGLang 优化分阶段写回 |
| **分布式服务**       | SGLang（DCP、PD 解耦）         | 解码上下文并行化取得进展；权重缓存守护进程将重载时间从 327 秒降至 <1 秒 |
| **量化与内存**     | vLLM、llama.cpp                         | vLLM 增加 FP8 KV 检查；llama.cpp 实现 MoE 流式加载 |
| **内核融合与启动**  | vLLM、SGLang                            | vLLM 融合 mHC 系数与归一化；SGLang 重叠 KDA 与元数据处理 |
| **本地运行时效率**  | llama.cpp、Unsloth                      | llama.cpp 为 Gemma 4 优化 FlashAttention；Unsloth 修复 GPU 内存溢出 |

> ⚙️ **趋势：** 前沿已从纯粹速度转向*可预测、可恢复、状态感知的推理*。引擎级别的弹性（恢复、缓存、序列化）如今与原始 FLOPs 同等重要。

---

### **5. 层级定位**

| 项目       | 主要层级                  | 角色概述 |
|---------------|-------------------------------|--------------|
| **vLLM**      | 推理引擎              | 高吞吐、多 GPU、多模型引擎；面向云规模大模型服务 |
| **SGLang**    | 分布式推理引擎  | 专为大型模型（如 Qwen3-235B）设计；聚焦快速恢复与分布式执行 |
| **llama.cpp** | 本地运行时 / 嵌入式      | 跨平台，支持 CPU/GPU/NPU 推理；适用于边缘、移动端与本地开发 |
| **Ollama**    | LLM 网关 / CLI 工具        | 开发者友好的接口，具备模型管理与 API 暴露能力；连接本地与云端 |
| **LiteLLM**   | LLM 网关 / 协调层   | 统一 API 层，用于成本追踪、防护机制与多提供商路由 |
| **Unsloth**   | 代理导向桌面运行时 | 混合客户端-引擎架构，带安全沙箱；强调用户工作流集成 |

> 💡 **定位洞察：**  
> - **vLLM/SGLang**：生产集群的核心推理层  
> - **llama.cpp/Ollama**：以本地为中心、面向开发者的运行时  
> - **LiteLLM/Unsloth**：代理与工具的应用层赋能者

---

### **6. 趋势信号**

#### 🔮 **新兴行业趋势（基于 2026-09-21 活动）：**
1. **代理中心化基础设施**  
   - `KvHints`（vLLM）、`HiCache` 与 `stream-idle-timeout`（SGLang）表明，*有状态推理*已不再是附加项——而是驱动核心引擎设计的关键。
2. **恢复与弹性作为功能**  
   - SGLang 的权重缓存守护进程将加载时间从约 327 秒降至 <1 秒，标志着范式转变：重启延迟已成为关键 SLA 指标。
3. **硬件碎片化与可移植性鸿沟**  
   - RTX 5070 Ti 在 Unsloth 中表现不佳，Snapdragon X Elite 在 Ollama 中未被充分使用——凸显跨架构优化日益严峻的挑战。
4. **安全优先部署**  
   - LiteLLM 的 cosign 签名镜像与 Unsloth 的 MXC ProcessContainer 表明，*可信执行*正成为必需，尤其在托管或企业级工作流中。
5. **量化 ≠ 总是更快**  
   - Hopper 上 FP8 KV 缓存失效（vLLM），GLM-5.3-Flash 在量化下退化（SGLang/Ollama）——说明量化必须针对具体模型与硬件组合进行验证。

#### ✅ **应用开发者应关注事项：**
- **避免对某些 MoE 模型使用 `torch.compile`**（vLLM Issue #56900），直到上游修复落地。
- **不要依赖 Hopper 上的 `fp8` KV 缓存**，直到 vLLM 修复 Issue #57713。
- **长上下文代理系统需自定义缓存策略时，请使用 `KvHints`（vLLM）或 `HiCache`（SGLang）**。
- **若使用 GGUF 模型，建议锁定 Unsloth `v0.1.809-beta`** ——最新 beta 存在严重吞吐回归。
- **在部署虚拟密钥或模型别名前，请验证 LiteLLM 的支出日志功能**——当前计费逻辑存在已知缺口。

> 📌 **总结：** “直接运行”的时代已经结束。今日的基础设施要求具备*架构意识*、*硬件验证*与*韧性设计*——尤其对于代理型与生产级应用而言。  

---  
*生成时间：2026-09-21 | 供人工智能基础设施与代理开发领域的技术决策者参考*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-21**

---

### **1. 今日亮点**  
vLLM 项目持续推进多模型与多架构支持，新增针对 DeepSeek-V4.1 和 MiniMax-M3 模型的 ROCm 专属优化。关键稳定性修复已合并：推测解码（PR #56734）和 KV 缓存管理（PRs #57775–#57777），解决了 Model Runner V2 中长期存在的数据损坏与最终化问题。与此同时，一项重要新功能——原生 `KvHints` 请求封装（PR #53423）现已可用，支持程序化管理 KV 缓存。

---

### **2. 发布与破坏性变更**  
*无*  
过去 24 小时内未报告新版本发布或破坏性 API/配置变更。最新稳定版本仍为 `v0.28.1rc1`。

---

### **3. 新模型与硬件支持**  
- **ROCm 支持**：在 gfx950 上为 **MiniMax-M3** 新增上下文并行稀疏索引（PR #57832, #57840），支持 fp8 索引缓存及 TP > 1（需手动启用）。  
- **DeepSeek-V4.1 优化**：融合解码元数据 + 最终归一化（PR #57756）、重叠 mHC 系数（PR #57603）、将 TP all-reduce 与 mHC 输入准备融合（PR #57643）——均面向 ROCm 与 NVIDIA 平台。  
- **Intel GPU (XPU)**：为 MoE 模型新增 `VLLM_BATCH_INVARIANT=1` 支持（PR #55881），在 Intel Arc GPU 上实现确定性归约行为。  
- **量化**：现显式检查 Hopper 平台对 FP8 KV 缓存的支持（PR #57713）；但当前 GLM-5.3-Flash 在 Hopper 上尚不支持 FP8 KV 缓存数据类型（Issue #57713）。

---

### **4. 性能与优化**  
- **推测解码**：PR #56734 在数据并行下防止假草稿步骤中出现 KV 缓存损坏，提升可靠性且无性能损耗。  
- **MoE 与注意力融合**：多个 PR（如 #57603, #57643）通过融合 mHC 系数生成、all-reduce 与归一化，减少内核启动次数——对大模型高吞吐推理至关重要。  
- **KV 管理**：PR #53423 引入 `KvHintsEnvelope`，通过类型安全、与编排器无关的接口，实现对 KV 缓存放置与驱逐的细粒度控制——对具有状态推理能力的代理系统尤为关键。  
- **内存效率**：PR #57775–#57777 修复 `KVConnector` 中延迟保存处理，降低内存泄漏风险，并确保各步骤间一致清理。

---

### **5. 稳定性与退化问题**  
- **严重崩溃**：  
  - Issue #57719：`prompt_embeds` + 惩罚触发设备端 `scatter gather kernel index out of bounds` 断言（H100, Blackwell）。*待修复*。  
  - Issue #57713：GLM-5.3-Flash 虽具备硬件能力，却无法在 Hopper 上使用 `fp8` KV 缓存。*临时方案：禁用 `--kv-cache-dtype fp8` 直至修复*。  
- **退化问题**：  
  - Issue #56605：GLM-5.3-Flash 在多轮代理场景中输出“词序混乱”。*高优先级；影响代理可靠性*。  
  - Issue #56868：量化版 GLM-5.3-Flash 在累积推理后出现长解码退化。*已在 B300 上使用 W4A16 量化复现*。  
- **CUDA IMA/Xid 31**：Issue #55279 报告在 sm_80（H100）上使用 DFlash2 进行采样负载时，运行约 11k 解码步骤后引擎崩溃。*可能为驱动层或内存泄漏问题*。  
- **已修复**：PR #56734 修复推测解码中的 KV 损坏问题（高危）。PR #57775–#57777 修复最终化竞争条件。

---

### **6. 对应用开发者的启示**  
- **代理与推理类应用**：使用 `KvHints`（PR #53423）为有状态代理实现自定义缓存策略。若使用 `torch.compile`，请避免结合 `prompt_embeds` 与惩罚（Issue #57719）。  
- **多模型工作负载**：因退化问题（Issues #56605, #56868），在长上下文或多轮场景中谨慎使用 `GLM-5.3-Flash`。建议在 #57713 修复前禁用 Hopper 上的 `fp8` KV 缓存。  
- **硬件特定调优**：ROCm 用户可启用 MiniMax-M3 与 DeepSeek-V4.1 的上下文并行稀疏索引（需手动开启）以提升吞吐量。Intel GPU 用户应确保设置 `VLLM_BATCH_INVARIANT=1` 以保证 MoE 行为一致性。  
- **稳定性注意事项**：在上游修复落地前，避免对 Qwen1.5-MoE-A2.7B-Chat 使用 `torch.compile`（Issue #56900）。在高负载解码场景下监控 Xid 31 崩溃（Issue #55279）。

🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | 🔗 [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **SGLang Digest — 2026-09-21**

#### **1. 今日亮点**  
SGLang 项目持续推进高性能推理基础设施建设，在 **引擎恢复**、**分布式服务** 和 **多模型支持** 方面取得重大进展。关键成果包括：权重缓存守护进程的稳定化，实现快速引擎重启（Qwen3-235B FP8：加载时间从约 327 秒降至 <1 秒），以及对 **解码上下文并行 (DCP)** 和 **PD 分离** 的积极开发。新提交也实现了 Kimi-K3 的原生 Dynamo 支持，并通过空闲流超时机制提升路由容错能力。

#### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未发布新版本或破坏性 API/配置更改。

#### **3. 新模型与硬件支持**  
- ✅ **Kimi-K3**：通过 `sgl-router` (#40390, #40391) 现已启用原生 Dynamo 集成，支持令牌级缓存路由与输入转发。  
- ✅ **SenseNova-U1/U1.5**：已开启追踪问题以对齐官方仓库的功能与性能 (#37742)。  
- ✅ **AMD ROCm 支持**：修复 MI355X (gfx950) 上 GLM-5.2 的解码路径，包括 MXFP4 专家处理与启动几何修正 (#40189)。  
- ✅ **InstantTensor 加载器**：作为可选的高性能 Safetensors 加载器（`--load-format instanttensor`）加入，支持分布式、流水线式权重加载 (#40453)。

#### **4. 性能与优化**  
- 🚀 **权重缓存守护进程（快速引擎恢复）**：第 1 阶段已在 #27139 中上线；每秩守护进程通过 CUDA IPC 提供量化后权重，将 Qwen3-235B FP8 权重加载时间从 **~306–327 秒降至 <1 秒** ([博客](https://www.lmsys.org/blog/2026-08-21-sglang-quick-recovery))。  
- ⚙️ **内核与内存优化**：  
  - 对 GLM-5.3-Flash 融合 KDA 投影与预填充元数据，重叠键准备过程并减少同步 (#39688)。  
  - 减少 KPool 规划同步并重叠索引器预处理 (#39695)。  
  - 优化 MoE 运行器调优逻辑，避免在 EP 模式下出现形状膨胀问题 (#40417)。  
- 🔍 **多模态与扩散模型**：  
  - 对量化版 MiniMax-H3 MLP 融合四舍五入的 SwiGLU，消除冗余内核 (#40378)。  
  - 在原生流水线中（如 Qwen-Image 2.1）支持 `--vae-slicing`，降低内存压力 (#40493)。

#### **5. 稳定性与回归问题**  
⚠️ **严重崩溃与缺陷（高严重性）**：  
1. **CUDA 非法内存访问**：在 8 个并发请求下，QSA 扩展前向传播过程中发生崩溃（H20 TP8, Qwen3.8-Flash-Next-FP8）——即使使用 `CUDA_LAUNCH_BLOCKING=1` 仍无法解决 (#37633)。*根本原因尚未确认。*  
2. **CUDA 核心转储追踪器** (#26340)：在 CI 运行期间自动收集到 319 条核心转储评论；正在调查多个测试任务中 GPU 运行时不稳定的问题。  
3. **权重加载崩溃**：在 `humming` 量化中，DeepSeek/GLM MLA 检查点缺失 `BlockQuantScaleParameter` 的 `format_ue8m0` 属性 (#40393)。  
4. **HiCache 分阶段写回故障**：128 KiB 批次路径将注册的主机虚拟地址传递给 `cudaMemcpyBatchAsync`，但 `CanUseHostPointerForRegisteredMem == 0`，导致故障 (#40232)。  

🔧 **其他重要问题**：  
- 当 PLE 表超出显存时，`--ple-offload-embedding` 不可达（嵌入在卸载前已物化）(#39841)。  
- 在 GLM-5.3-Flash 上进行长上下文预填充时，`fp8_mqa_logits` 内存溢出，导致所有 TP 秩被终止 (#37712)。  
- EAGLE 规范解码在草稿批次中因 `num_token_non_padded` 为零而破坏 MoE 调度 (#40156)。

#### **6. 对应用开发者的影响**  
- **更快的重启与恢复**：使用 `--weight-cache-daemon`（近期构建默认启用）可实现近乎即时的引擎重载——对需要持续运行的生产级 LLM 网关和智能体系统至关重要。  
- **路由容错增强**：新参数 `--stream-idle-timeout-secs`（默认 180 秒）可防止空闲 SSE 流造成的资源泄漏；建议结合会话感知与缓存感知准入策略使用 (#40366, #40271)。  
- **模型灵活性提升**：利用 `--load-format instanttensor` 实现更快、分布式的模型加载；预计大型模型（如 Qwen3-235B）的启动时间将显著改善。  
- **规避陷阱**：在 #40393 修复前，请避免在 DeepSeek/GLM MLA 模型上使用 `--quantization humming`。在大嵌入场景下使用 `--ple-offload-embedding` 时需谨慎。请密切关注 H20 部署中的 QSA 相关崩溃问题，直至 #37633 解决。

👉 [查看问题 #26340 – CUDA 核心转储追踪器](https://github.com/sgl-project/sglang/issues/26340)  
👉 [查看 PR #40390 – 在 sgl-router 中启用 Kimi-K3](https://github.com/sgl-project/sglang/pull/40390)  
👉 [查看 PR #40453 – 添加 InstantTensor 加载器支持](https://github.com/sgl-project/sglang/pull/40453)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-21**

---

### **1. 今日亮点**  
最新更新聚焦于在现代 NVIDIA GPU（Ampere+）上对 **Gemma 4** 的性能调优，包含针对 CUDA FlashAttention 的优化以及对 Apple Silicon 平台 Metal 支持的改进。关键进展包括为 Qwen4 启用稀疏 FlashAttention、通过 `--load-mode streaming` 提升 MoE 模型的多 GPU 扩展性，以及移除遗留的 SYCL 模拟层以增强系统可靠性。

---

### **2. 发布与破坏性变更**  
- **b11065**：针对 Ampere 及更新架构的 Gemma 4 优化了 CUDA FlashAttention；提升小模型提示处理延迟表现。[PR #29152](https://github.com/ggml-org/llama.cpp/pull/29152)  
- **b11062**：启用 Qwen4 的稀疏 FA（`--enable-sparse-fa`）。[PR #28770](https://github.com/ggml-org/llama.cpp/pull/28770)  
- **b11060**：修复 Mamba 时间步投影的内存连续性问题。[PR #28832](https://github.com/ggml-org/llama.cpp/pull/28832)  
- **b11059**：为 Metal FWHT 内核添加 F16 输入支持，消除不必要的类型转换开销。[PR #29094](https://github.com/ggml-org/llama.cpp/pull/29094)

> ✅ *今日无报告破坏性 API 变更。*

---

### **3. 新模型与硬件支持**  
- **Qwen3.8-MoE (UD-Q6_K)**：通过 `--load-mode streaming` + `--gpu-pill` 支持流式专家加载，使 85GB 以上模型可在仅 24GB VRAM 的设备上运行。[PR #29191](https://github.com/ggml-org/llama.cpp/pull/29191)  
- **Intel Xe-LPG Plus/Xe2/Xe3**：Vulkan 后端新增 Flash Attention 优化内核。[PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406)  
- **Apple Metal (macOS 27 SDK)**：移除已弃用的 `MTLDevice.location` 与 `MTLGPUFamilyCommon{1,2,3}` 调用。[PR #29136](https://github.com/ggml-org/llama.cpp/pull/29136)  
- **SYCL**：移除旧版 dpct 层；现使用原生乱序队列及 `sycl::event` 依赖机制。[PR #29190](https://github.com/ggml-org/llama.cpp/pull/29190)  

> 📌 *XDNA 后端仍被请求但尚未实现（问题 #21725）*

---

### **4. 性能与优化**  
- **Gemma 4 提示处理**：针对头大小 256/512 和批处理大小 1–4 优化了 CUDA FA；对批大小为 1 时优先使用更大的 CUDA block 及 MMA 内核。在小模型上提升吞吐量约 5–10%。[PR #29152](https://github.com/ggml-org/llama.cpp/pull/29152)  
- **Qwen3.8 MoE**：流式专家加载降低内存压力——模型按块加载，无需一次性占用全部 GPU VRAM。可在 24GB 显卡上支持最高达 96K 上下文窗口。[PR #29191](https://github.com/ggml-org/llama.cpp/pull/29191)  
- **Metal FWHT**：F16 输入避免高成本的 F32 转换；减少量化模型中的带宽消耗与延迟。[PR #29094](https://github.com/ggml-org/llama.cpp/pull/29094)  
- **SYCL**：移除 dpct 层降低运行时开销并简化错误路径。[PR #29190](https://github.com/ggml-org/llama.cpp/pull/29190)  
- **Mamba**：时间步投影现已高效处理非连续输入。[PR #28832](https://github.com/ggml-org/llama.cpp/pull/28832)

---

### **5. 稳定性与回归问题**  
- **严重**：在 HIP/ROCm 上复用服务槽位时，`qwen35 / qwen35moe` MoE 模型存在循环状态泄漏，导致早期提示被原样重复输出。[Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092) *(暂无修复 PR)*  
- **高严重性**：在 llama-server 中，系统提示在不同客户端/槽位间发生泄露，影响多用户推理环境。[Issue #27422](https://github.com/ggml-org/llama.cpp/issues/27422) *(暂无修复 PR)*  
- **中等**：无效 UTF-8 序列导致 PEG 聊天解析器返回 HTTP 500 错误（如 OCR 输出内容）。[Issue #27543](https://github.com/ggml-org/llama.cpp/issues/27543) *(修复已合并至 #29161)*  
- **低**：模型加载至 dGPU VRAM，但推理仍在 iGPU 上运行，因 KV 缓存压缩卸载所致。[Issue #29164](https://github.com/ggml-org/llama.cpp/issues/29164) *(暂无修复 PR)*

---

### **6. 对应用开发者的启示**  
- **使用 `--load-mode streaming` + `--gpu-pill`** 在资源受限硬件上部署大型 MoE 模型（如 Qwen3.8）——适用于云推理或边缘部署场景。  
- **升级至 b11065+** 以在 Ampere+ GPU 上获得更快的 Gemma 4 推理速度，尤其在小批量场景下优势明显。  
- **在解决并发乱码输出问题前（见 #26031），避免对 Qwen3.6-35B-A3B-Q8_0 使用 `--ngl > 1`**。  
- **近期 Metal 与 SYCL 清理工作将带来稳定性提升**——若目标平台为 Apple Silicon 或 Intel Arc GPU，建议重点关注。  
- **注意监控 MoE 模型在 HIP/ROCm 及混合系统中的状态泄漏问题**，直至修复上线。  
- **考虑使用 `--cache-disk`**（#20697 请求中）应对长上下文任务——虽尚未实现，但备受期待。

> 🔗 *关注开发进展：[GitHub 仓库](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-21**

---

### **1. 今日亮点**  
Ollama 项目持续聚焦硬件兼容性与推理正确性，多个关键 PR 解决了 AMD GPU 上的 Vulkan 崩溃问题（#18557）、MLX（Mac M1 Pro）上的内存膨胀问题（#18556），以及结构化响应中 JSON 输出损坏的问题（#18441）。值得注意的是，已合并一项修复，将 `/api/generate` 接口中“思考内容”与“响应输出”分离（#18561），解决了长期影响工具链工作流的问题。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告新版本或破坏性变更。*  
暂无新发布版本或破坏性 API/配置变更。但目前正在进行的工作包括对 `typical_p` 参数处理的弃用——现在在 API 请求中将发出警告而非直接拒绝，以维持向后兼容性（#18551）。

---

### **3. 新模型与硬件支持**  
- **高通骁龙 X Elite NPU/GPU**：针对基于 ARM 架构的 Windows 设备的活跃功能请求（#5360）；用户报告尽管上游 llama.cpp 已支持，但完整 NPU 仍未能被利用。  
- **Prism 三元 GGUF（PQ2_0/PTQ1_0）**：导入失败，原因在于不支持的张量大小溢出（#18521）；架构本身受支持，但量化类型尚未处理。  
- **Vulkan 后端**：现已通过 #18562 在 Docker 中正确暴露，修复了此前因 GPU 能力配置错误而阻止 NVIDIA 系统使用 Vulkan 的问题。

---

### **4. 性能与优化**  
- **MLX 内存管理**：新提交引入可配置的前缀缓存分页内存预算（#18556），对于防止在 16GB M1 Pro Mac 上持续推理时系统冻结至关重要。  
- **内核优化**：PR #18550（`mlx: add prefill-shaped gated delta kernel`）旨在通过避免回退到展开图，提升 Qwen3.8-27B 等大模型的提示处理效率。  
- **调度器鲁棒性**：修复在缺失 GPU 探测数据时出现 NaN/Inf 值的问题（#18552），提升了在多种硬件配置下的稳定性。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 相关 PR |
|--------|------|--------|---------------|
| 🔴 高 | **AMD RX 6800 XT 上的 Vulkan 访问违规（0xc0000005）** | 开放 | #18557 |
| 🔴 高 | **Python 客户端内存泄漏**（`ollama.Client`） | 已关闭 | #18558 |
| 🟡 中 | **Gemma4:e4b 视觉模型返回空白图像** | 已关闭 | #18560 |
| 🟡 中 | **Ollama 与 llama.cpp 在工具调用处理上存在差异** | 开放 | #18509 |
| 🟡 中 | **`think:true` 导致推理内容泄露至 `/api/generate` 的 `response`** | 已关闭 | #18554 |
| 🟡 中 | **聊天历史与嵌入向量无声截断** | 开放 | #14259 |

> ✅ **已合并修复**：  
> - #18554：在非流式 generate 调用中分离 `thinking` 与 `response` 字段。  
> - #18556：为 MLX 前缀缓存内存预算添加配置项。  
> - #18562：在 Docker 中暴露 `graphics` 能力以支持 Vulkan/NVIDIA。  
> - #18561：确保 `thinking` 内容始终与输出隔离。

---

### **6. 对应用开发者的意义**  
- **工具链与智能体**：谨慎使用 `tool` 角色——Ollama 可能以不同于 `llama.cpp` 的方式拒绝或误分类工具输出。建议使用 `/api/chat` 并配合 `format` 以获得更可预测的行为。  
- **结构化输出**：避免依赖 `/api/generate` 中 `thinking=true` 返回的原始 JSON；在 MLX 后端可能遇到开头带 `.` 字符的情况（#18441）。  
- **内存与部署**：在 Apple Silicon（MLX）环境下，需显式配置前缀缓存上限，防止系统冻结（#18556）。监控 Python 客户端内存使用——已知存在内存泄漏问题（#18558）。  
- **硬件感知**：若部署于骁龙 X Elite 或 AMD Vulkan GPU，预计在 #5360 和 #18557 修复前，加速能力有限或完全不可用。  
- **API 兼容性**：发送 `typical_p=1.0` 的客户端（如 SillyTavern）现在将收到警告而非 400 错误（#18551）——可安全升级，无需担心破坏性变更。

> 🔗 [GitHub Issues](https://github.com/ollama/ollama/issues) | [PRs](https://github.com/ollama/ollama/pulls)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 消息简报 – 2026-09-21

---

### **今日亮点**  
LiteLLM v1.103.0-rc.1 引入了通过 cosign 签名的 Docker 镜像来增强安全性，重点修复了关键的预算追踪与分词问题。主要修复包括：流式请求的支出日志记录更准确（PR #42176）、Gemini 中对话中途 `system` 消息处理正确（PR #42126），以及 PII 掩码防护机制行为改进（PR #42133）。这些更新显著提升了生产环境中代理部署的可靠性。

---

### **发布与破坏性变更**  
- **v1.103.0-rc.1** 已发布，使用 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 对 Docker 镜像进行了签名验证。自提交 `0112e53` 起，所有版本均使用同一密钥签名。  
  🔗 [验证 Docker 镜像签名](https://docs.sigstore.dev/cosign/overview/)  
- 本版本周期内未报告任何破坏性 API 变更。

---

### **新模型与硬件支持**  
- **DeepSeek V4 reasoning_effort**（`high`/`max`）现已通过 `reasoning_effort` 参数正确传递至 API（跟踪于 #27439）。  
  🔗 [问题 #27439](https://github.com/BerriAI/litellm/issues/27439)  
- **OpenRouter TTS 支持** 已修复提供方映射后，适用于 `openrouter/google/gemini-3.1-flash-tts-preview`（PR #42111）。  
  🔗 [问题 #42111](https://github.com/BerriAI/litellm/issues/42111)  
- **Vertex AI mREP（多区域端点）** 支持已通过功能请求 #23766 添加——对全球规模部署具有重要意义。

---

### **性能与优化**  
- **基于 Rust 的分词器重构** 正在进行中：PR #42174 将 Python 分词依赖替换为 Rust，提升性能并减少冗余。  
  🔗 [PR #42174](https://github.com/BerriAI/litellm/pull/42174)  
- **分词计数器后端拆分为模块化组件**（PR #42165）为未来优化及各后端（tiktoken、Hugging Face、fast）的可维护性奠定基础。  
  🔗 [PR #42165](https://github.com/BerriAI/litellm/pull/42165)  
- **流式成本核算修复**：防止在使用模型别名时出现零成本日志记录（PR #42176）。对高吞吐系统中的准确计费至关重要。  
  🔗 [PR #42176](https://github.com/BerriAI/litellm/pull/42176)

---

### **稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR | 备注 |
|------|----------|--------|--------|-------|
| 即使使用正常，仍因过期支出触发 `BudgetExceededError` (#27735) | 高 | 待处理 | ❌ | 影响团队级虚拟密钥；与 #27639 相关。 |
| 对话中途的 `system` 消息破坏 Gemini 提示缓存 (#42104) | 高 | 待处理 | ✅ [PR #42126](https://github.com/BerriAI/litellm/pull/42126) | 已修复：保持 system 消息内联而非上提。 |
| 流式请求在模型为别名时被计为 0 成本 (#42161) | 高 | 待处理 | ✅ [PR #42176](https://github.com/BerriAI/litellm/pull/42176) | 已解决：保留路由后的模型用于支出日志。 |
| Presidio PII 解掩码在 `tool_calls.arguments` 内失败 (#31950) | 中等 | 待处理 | ❌ | 工具参数中原始占位符仍可见。 |
| 防护机制无法通过 Anthropic `/v1/messages` 阻止 MCP 工具 (#40583) | 中等 | 待处理 | ❌ | 调用前防护机制遗漏 MCP 工具定义。 |

> ⚠️ **关键稳定性提醒**：多个高严重性缺陷影响预算控制、提示缓存和数据隐私——尤其对多代理系统和受监管环境至关重要。

---

### **对应用开发者的启示**  
- **谨慎使用 v1.103.0-rc.1** —— 虽含通过签名镜像实现的安全加固，但仍存在未解决的预算与防护问题。上线前务必验证支出逻辑。  
- **确保一致的模型路由**，避免在流式任务中仅使用别名模型名称——应使用真实模型 ID，或通过 `routed_model` 验证支出日志。  
- **利用新的防护机制改进**，如 `presidio.output_parse_pii` 结合重叠跨度解析（PR #42133），防止在敏感 PII 应用中发生数据泄露。  
- **期待即将到来的 Rust 分词器与模块化计数器带来的性能提升**——非常适合大规模推理流水线与成本分析场景。  
- **监控 OpenRouter 定价同步情况** —— 最近的定价更新（PRs #42178, #42175, #42169）可能影响成本计算，若依赖 2026-09-20 之前的定价值需特别注意。

🔧 *建议*：除非在预发环境充分测试，否则不要升级，特别是使用虚拟密钥、流式处理或代理内存持久化的场景。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-21**

#### **1. 今日亮点**  
多位用户报告，在更新至 `v0.1.810-beta` 后，GGUF 推理吞吐量出现严重性能退化，尽管硬件和配置均未更改，表明本地模型性能下降。与此同时，Windows 安全沙箱功能取得显著进展，通过合并 PR #11357 和 #11390 集成 Microsoft 的 MXC ProcessContainer，进一步提升了 Python 和终端工具的隔离能力。

#### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本。最新稳定版仍为 `v0.1.811-beta`，当前仍在进行以稳定性和功能优化为重点的 beta 测试。

#### **3. 新模型与硬件支持**  
- **RTX 5070 Ti (sm_120 / Blackwell)**：有用户报告，Unsloth 自带的 `llama.cpp` 构建版本（CUDA 13.4）比官方 `ggml-org` 的 CUDA 12 版本慢约 5–6 倍，暴露出针对新型架构的内核或编译效率问题。[Issue #11349](https://github.com/unslothai/unsloth/issues/11349)  
- **ARM64 Linux**：长期存在的空白依然存在；尽管核心应用已成功移植，但 Unsloth Desktop 仍未提供原生 aarch64 构建版本。[Issue #10332](https://github.com/unslothai/unsloth/issues/10332)  
- **SDXL 微调模型**：社区支持的 SDXL 微调模型（单文件 GGUF/safetensors）现正积极评估是否可直接通过“图片”页面加载。[特性请求 #11391](https://github.com/unslothai/unsloth/issues/11391)

#### **4. 性能与优化**  
- **GGUF 推理吞吐量退化**：用户报告在升级至 `v0.1.810-beta` 后，推理速度明显下降，且模型、硬件及配置均无变化。这表明最新版本中可能存在后端或加载器层面的性能回归。[Issue #11221](https://github.com/unslothai/unsloth/issues/11221)  
- **GPU 内存管理修复**：Windows 平台已修复 `cudaMalloc` 在超出显存限制时无声溢出至系统内存的问题，此前该行为会掩盖真实的内存压力。[PR #11368](https://github.com/unslothai/unsloth/pull/11368)  
- **分词处理开销**：长行中包含反斜杠会导致数秒级的渲染延迟，源于 Marked 内联分词器效率低下。[Issue #11376](https://github.com/unslothai/unsloth/issues/11376)

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 链接 |
|---------|------|--------|------|
| 高 | `v0.1.810-beta` 之后 GGUF 推理吞吐量显著下降 | 开放 | [Issue #11221](https://github.com/unslothai/unsloth/issues/11221) |
| 高 | 工具调用解析失败：MCP 图像数据以原始文本形式输出（150万字符），导致生成崩溃 | 开放 | [Issue #11358](https://github.com/unslothai/unsloth/issues/11358) |
| 中 | 在 Firefox/Brave（Linux）中复制 API 密钥失败 | 开放 | [Issue #11387](https://github.com/unslothai/unsloth/issues/11387) |
| 中 | 在 WSL 中绑定 `0.0.0.0` 时 Studio 无法启动 | 开放 | [Issue #11187](https://github.com/unslothai/unsloth/issues/11187) |
| 低 | RAG 中的文件扩展名列表为硬编码且不可配置 | 开放 | [Issue #11385](https://github.com/unslothai/unsloth/issues/11385) |

> ✅ *正在修复中：*  
> - PR #11367 通过在无效 JSON 包装时主动失败，解决 MCP 图像解析错误。  
> - PR #11375 修正了链接引用探测不匹配问题，解决了 Markdown 内容密集回复中的断链问题。

#### **6. 对应用开发者的影响**  
- **若使用本地 GGUF 推理，请避免使用 `v0.1.810-beta`**——预计吞吐量下降。建议锁定至 `v0.1.809-beta` 或更早版本，直至该问题修复。  
- **Windows 部署需密切监控 GPU 内存行为**：未经授权的主机内存溢出可能掩盖真实 OOM 情况。请使用 `--api-max-concurrency` 及队列策略（`wait`/`reject`）安全控制负载。[PR #5482](https://github.com/unslothai/unsloth/pull/5482)  
- **构建健壮的工具集成**：对传递给工具的文件格式需保持谨慎——目前许多常见类型（`.zip`、`.parquet`、`.heic`、`.m2ts`）除非由备用 Python 工具处理，否则会被拒绝。[PR #11379](https://github.com/unslothai/unsloth/pull/11379)  
- **采用安全优先设计**：随着即将推出的 MXC 沙箱功能（PR #11357），未来版本将强制执行更严格的隔离策略——请相应调整代理设计，尤其适用于远程或托管账户场景。  

> 🔒 *安全提示*：对于托管账户中的私有/本地提供者 URL，**请等待管理员切换功能支持**（[Issue #11382](https://github.com/unslothai/unsloth/issues/11382)）后再部署敏感工作流。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*