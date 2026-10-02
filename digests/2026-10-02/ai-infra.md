# AI 基础设施日报 2026-10-02

> 生成时间: 2026-10-02 01:48 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-02**

---

### **1. 生态概览**  
AI推理与服务生态正进入高度专业化和以硬件驱动优化的新阶段，围绕下一代GPU（SM120/SM121 Blackwell）及混合架构（Mamba/GDN, MoE）快速收敛。各项目在定位上逐渐分化：vLLM与SGLang在底层内核创新与分布式服务扩展性方面领先，而llama.cpp与Ollama则主导边缘与本地推理场景。LiteLLM与Unsloth作为集成层，实现跨引擎兼容性与开发者生产力提升。对安全（Ollama中的CVE）、稳定性（各项目均出现严重回归）及工具成熟度的日益重视，标志着该领域已超越单纯的性能基准测试，迈向成熟。

---

### **2. 活动对比**

| 项目       | 开放问题（高/危） | 近24小时PR数 | 发布状态 | 核心活动驱动力 |
|------------|-------------------|---------------|-----------|----------------|
| **vLLM**   | 5（3个危急）      | ~15           | 无        | Blackwell GPU支持与推测性解码修复 |
| **SGLang** | 5（4个高）        | ~80           | v0.5.21   | HiCache/HiSparse + ROCm/AMD集成 |
| **llama.cpp** | 4（2个危急）    | ~10           | 无        | MTP稳定性与Vulkan/Adreno崩溃修复 |
| **Ollama** | 5（2个危急）      | ~5            | 无        | 代理绕过CVE与CPU飙升回归 |
| **LiteLLM** | 5（2个危急）     | ~7            | v1.103.2  | 安全补丁 + 流式传输可靠性 |
| **Unsloth** | 5（2个危急）     | ~12           | v0.1.902-beta | 用户体验优化 + LoRA训练性能 |

> *注：SGLang在社区贡献速度上领先；vLLM与Ollama表现出最高的严重问题密度。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构         | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-----------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash** | ✅ (SM12x) | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Qwen4Exp**          | ✅ (SM12x) | ❌ | ✅ (MTP) | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**     | ✅ (ROCm) | ✅ | ✅ (exp.) | ❌ | ❌ | ❌ |
| **MiMo-V2.6**         | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **GigaChat 3.5 (VLM)**| ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **System One (MLX)**  | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| **Clef**              | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |

> 🏆 **排行榜**：  
> - **SGLang** 在新模型多样性与视觉语言模型（VLM）支持方面领先。  
> - **vLLM** 在原生Blackwell GPU就绪性以及FlashInfer、推测性解码等高级功能上领先。  
> - **Unsloth** 是唯一提供完整MLX + 主机API集成的项目，专为Apple Silicon优化。

---

### **4. 性能前沿**

| 优化重点               | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|------------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存与前缀缓存**   | 🔥 高优先级（异步加载、数据损坏修复） | 🔥 HiCache/HiSparse，异步页管理 | ⚠️ 稀疏注意力，NVFP4问题 | ❌ | ⚠️ 提示词缓存断点 | ❌ |
| **内核融合与底层优化** | 🔥 Attention+RMSNorm+sigmoid_mul融合 | 🔥 AMD专属融合（MLA+RoPE+KV写入） | 🔥 BF16/NVFP4计算类型 | ❌ | ⚠️ 索引优化可选 | 🔥 Int8 GEMM融合 |
| **多GPU与分布式服务** | 🔥 CUDA图捕获，MTP扩展 | 🔥 统一混合-SWA池，HiSparse | ❌ | ❌ | 🔥 路由 + 备用机制 | ❌ |
| **量化与混合精度**     | 🔥 FP8，INT4/MXFP4保留 | 🔥 FP8，HiSparse | 🔥 Q2_K/Q3_K，NVFP4 | ❌ | 🔥 PII感知预处理 | 🔥 LoRA过程中4比特保留 |
| **边缘与本地运行时**   | ❌ | ❌ | ✅（OpenCL，Vulkan，Hexagon） | ✅（移动代理） | ❌ | ✅（GGUF，MLX，桌面UI） |

> 🔥 **顶级梯队**：vLLM与SGLang正在推动内核级优化与分布式服务效率的边界。  
> 💡 **新兴领导者**：Unsloth在混合精度训练与微调友好型用户体验方面表现突出。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 角色摘要 |
|------------|-------------------------------|----------|
| **vLLM**   | **服务引擎（GPU中心）**       | 高吞吐、低延迟推理引擎，针对SM120/SM121优化；适用于云规模大模型服务。 |
| **SGLang** | **服务引擎 + 推理框架**       | 下一代引擎，支持HiCache/HiSparse；专为长上下文与多GPU部署设计。 |
| **llama.cpp** | **本地运行时（CPU/GPU混合）** | 通用推理后端，支持GGUF模型；在边缘、移动端与离线场景中表现强劲。 |
| **Ollama** | **网关 + 本地运行时**          | 开发者友好的命令行网关，具备模型编排能力；连接本地与远程推理。 |
| **LiteLLM** | **API网关 / 抽象层**          | 多提供商路由、成本追踪与可观测性的统一API层。 |
| **Unsloth** | **微调与训练平台**             | 专注于高效LoRA训练、模型编辑与智能体开发，提供丰富用户界面。 |

> 📌 **战略启示**：技术栈正变得模块化——开发者根据部署场景（云 vs 边缘）选择引擎，再在其上叠加网关（LiteLLM）与训练工具（Unsloth）。

---

### **6. 趋势信号**

#### **从今日活动提炼的关键行业趋势**：
1. **Blackwell（SM120/SM121）已成为性能新基准**  
   vLLM与SGLang正全力优化以适配Blackwell的新特性（如FP8、稀疏注意力、FlashInfer），表明未来基础设施必须具备对特定GPU架构的认知能力。

2. **混合架构正引发稳定性挑战**  
   多个关键缺陷涉及混合模型（Mamba/GDN, MoE），说明复杂模型设计已超越工具链成熟度——在组合性改善前，预计将持续出现回归问题。

3. **安全与可观测性不再是可选项**  
   Ollama Go二进制中的CVE事件与LiteLLM供应链漏洞凸显信任是基础设施的核心要求。签名发布与依赖审计现已成为基本门槛。

4. **工具链正超越核心推理范畴**  
   Unsloth（命令面板、可共享运行）与LiteLLM（支出日志、链路追踪）等项目正从单纯追求速度转向开发者体验——这对规模化智能体开发至关重要。

5. **分布式服务正趋于“平凡但必要”**  
   异步KV加载、统一内存池、智能块管理（vLLM、SGLang）表明，下一阶段的前沿不再只是原始吞吐量，而是可靠、可观测、容错的分布式推理。

---

### **面向应用开发者的建议**  
- **用于生产级推理**：在Blackwell GPU上使用**vLLM**或**SGLang**时需谨慎——在关键缺陷（#37754, #53912）修复前避免启用推测性解码。  
- **用于边缘/本地智能体**：优先选择**llama.cpp**（搭配`q2_K`/`q3_K`）或**Unsloth**用于微调后的GGUF模型；避免在Adreno上使用Vulkan。  
- **用于多提供商工作流**：**LiteLLM**仍是路由与成本控制最安全的选择——请立即升级至v1.103.2。  
- **用于智能体开发**：使用**Unsloth**进行训练，**Ollama/SGLang**进行部署，但需监控CPU飙升与代理问题。  
- **始终用长上下文、高并发与混合精度进行验证**——这些场景最易暴露不稳定性短板。

> ✅ **最终提示**： “一刀切”推理的时代已经结束。应根据工作负载选择技术栈，而非仅看性能指标。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-02

---

### **1. 今日亮点**  
vLLM 项目在支持下一代硬件方面持续保持强劲势头，针对 **SM120/SM121（Blackwell）** GPU 的关键修复已上线，同时 **Rust 前端** 正在积极开发中。主要进展包括 DeepSeek-V4.1-Flash 的推测解码稳定性提升，以及 Qwen4Exp 在 Blackwell 平台上的性能优化；与此同时，多个高严重性问题——特别是前缀缓存、KV 缓存损坏和工具调用解析相关的问题——正在紧急排查中。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布或破坏性变更。*

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1-Flash** 现已针对 **SM120/SM121（RTX PRO 6000 Blackwell, DGX Spark）** 提供专项支持，多个 PR 解决了图捕获、稀疏注意力及推测解码崩溃问题 ([#59689](https://github.com/vllm-project/vllm/pull/59689), [#59632](https://github.com/vllm-project/vllm/pull/59632))。  
- ✅ **Qwen4Exp** 已新增 SM12x 专用内核方案，避免回退至较慢的 cuBLAS WMMA 内核 ([#59632](https://github.com/vllm-project/vllm/pull/59632))。  
- ✅ **GLM-5.3-Flash** 针对低并发场景下的乱码问题，增加了 ROCm 特定修复 ([#59413](https://github.com/vllm-project/vllm/issues/59413), [#59704](https://github.com/vllm-project/vllm/pull/59704))。  
- 🚧 **Rust 前端** 正朝着与 Python API 功能对齐的目标推进；实验性启用 `VLLM_USE_RUST_FRONTEND=1` 目前可支持核心推理，但尚不完整，缺少完整的工具链和接口完备性 ([#44280](https://github.com/vllm-project/vllm/issues/44280))。

---

### **4. 性能与优化**  
- 🔥 **SM120/SM121**：针对 Qwen4Exp 和 DeepSeek-V4.1-Flash 的高优先级优化正在进行，旨在彻底消除对旧版内核的回退，并启用 CUDA 图捕获功能 ([#59632](https://github.com/vllm-project/vllm/pull/59632), [#59689](https://github.com/vllm-project/vllm/pull/59689))。  
- ⚙️ **内核融合**：正积极推进将注意力 + RMSNorm + sigmoid_mul + conv 操作进行融合，以提升吞吐量 ([#52968](https://github.com/vllm-project/vllm/pull/52968))。  
- 💡 **异步 KV 加载**：PR #59504 与 #57418 引入更智能的块管理机制，减少零值竞争，并实现跨请求共享正在传输的外部前缀加载，显著提升长上下文模型的解码效率。  
- 📊 **指标可见性**：新增用于追踪异步 KV 获取阶段的度量指标，便于在分布式部署场景下实现更好的可观测性 ([#58874](https://github.com/vllm-project/vllm/pull/58874))。

---

### **5. 稳定性与回归问题**  
今日报告多个高严重性问题：

| 问题 | 严重性 | 状态 | 修复合并请求？ | 链接 |
|------|---------|--------|--------|------|
| `prefix caching + MTP` 在混合 Mamba/GDN 模型上导致输出损坏（`v0.28.0`） | 严重 | 开放 | ❌ | [Issue #53912](https://github.com/vllm-project/vllm/issues/53912) |
| FlashInfer + MTP 推测解码在 SM121（GQA=16）上崩溃 | 严重 | 开放 | ❌ | [Issue #37754](https://github.com/vllm-project/vllm/issues/37754) |
| Confidential Computing 模式（TDX 客户机）下静默垃圾输出 | 严重 | 开放 | ❌ | [Issue #57224](https://github.com/vllm-project/vllm/issues/57224) |
| FP8 KV 缓存 + 前缀缓存导致 Qwen3.5-NVFP4 生成截断 | 高 | 开放 | ❌ | [Issue #47349](https://github.com/vllm-project/vllm/issues/47349) |
| 工具调用解析器将模型引用误识别为真实工具调用（Qwen3） | 高 | 开放 | ❌ | [Issue #58147](https://github.com/vllm-project/vllm/issues/58147) |

> 注：上述多项问题为特定平台或模型相关的回归，影响生产级推理稳定性。

---

### **6. 对应用开发者的影响**  
- **对于智能体与工具调用类应用**：请谨慎使用 `--reasoning-parser qwen3` 与 `tool_call_parser qwen3_coder` — 已知缺陷可能导致解析错误或工具调用重复 ([#58147](https://github.com/vllm-project/vllm/issues/58147))。在修复前，请小心使用 `--enable-auto-tool-choice`。  
- **对于多 GPU 部署**：若在 **Blackwell（SM120/SM121）** 上使用 **推测解码**，请暂时避免使用 `FlashInfer` 后端，直至 #37754 修复完成；当前推荐使用 Triton。  
- **对于长上下文或内存密集型模型**：使用混合架构（如 Mamba/GDN）时，请密切关注前缀缓存行为；当前状态可能导致输出截断或损坏。  
- **对于 Rust 集成**：Rust 前端已具备初步测试稳定性，但尚未达到生产就绪水平；预计存在缺失功能和潜在边缘案例错误 ([#44280](https://github.com/vllm-project/vllm/issues/44280))。  
- **对于性能调优**：建议利用新引入的异步 KV 加载指标 ([#58874](https://github.com/vllm-project/vllm/pull/58874))，识别去中心化服务管道中的性能瓶颈。

> ✅ **可操作建议**：仅当路径为展开的 YAML 路径时，才使用 `vllm serve --config=...` — 此 bug 仍存在 ([#43252](https://github.com/vllm-project/vllm/issues/43252))。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **1. 今日亮点**  
SGLang v0.5.21 版本共合并了来自 227 位贡献者的 779 个 PR，标志着社区驱动开发的重要里程碑。本次发布新增对 **DeepSeek-V4.1 Flash** 和 **GigaChat 3.5** 的支持，两者均为具备优化推理路径的 LLM/VLM 模型。在基础设施方面，**HiCache**、**HiSparse** 和 **AMD ROCm** 集成取得显著进展，今日已落地多项底层 kernel 修复与内存管理优化。

---

### **2. 发布与破坏性变更**  
- **v0.5.21** 已发布（GitHub: [v0.5.21](https://github.com/sgl-project/sglang/releases/tag/v0.5.21)) — 包含超 779 项贡献、新模型支持及基础稳定性改进。  
- 未报告任何破坏性 API 或配置变更；主要组件保持向后兼容。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1 Flash**：已加入 SGLang 官方食谱，支持完整自回归推理 ([链接](https://docs.sglang.io/cookbook/autoregressive/DeepSeek/DeepSeek-V4_1))。  
- ✅ **GigaChat 3.5**：现可通过 SGLang 生态系统作为 LLM/VLM 模型使用 ([链接](https://docs.sglang.io/cookbook/autoregressive/GigaChat/GigaChat-3_5))。  
- 🚀 **AMD ROCm (gfx950/gfx955)**：开发持续进行，多个 PR 针对 HiCache、HiSparse 及融合 kernel（如 `fused_fp8_bmm_rope_cat_and_cache_mla`）推进。  
- 💡 **SM120 (RTX PRO 6000)**：针对 GLM-5.3-Flash 与 MiMo-V2.6 的测试与调试正在进行中，尤其关注 FA4 attention 后端崩溃问题。  
- 🔧 **Intel XPU**：一项新功能提案旨在复用 Intel 注意力后端中的共享 Triton 解码元数据 kernel ([PR #42112](https://github.com/sgl-project/sglang/pull/42112))。

---

### **4. 性能与优化**  
- **HiCache 与 HiSparse**：多项 PR 聚焦于页面布局与内存访问模式优化：  
  - 在 ROCm 上将页面优先的直接页面与 gather kernel 进行移动处理 ([PR #42169](https://github.com/sgl-project/sglang/pull/42169))。  
  - 根据逻辑 KV 池大小限制 PD HiSparse 解码请求数量 ([PR #42168](https://github.com/sgl-project/sglang/pull/42168))。  
- **Kernel 融合**：针对 AMD 的优化降低启动开销：  
  - 融合 MLA + RoPE + KV 写入以支持解码尺寸前向模式 ([PR #41533](https://github.com/sgl-project/sglang/pull/41533))。  
  - 将逐 token 激活量化融合进 RMSNorm，用于逐通道 FP8 注意力 ([PR #34502](https://github.com/sgl-project/sglang/pull/34502))。  
- **内存池化**：捕获后的 KV 大小现在支持统一混合 SWA 池 ([PR #41961](https://github.com/sgl-project/sglang/pull/41961))，提升动态内存分配效率。

---

### **5. 稳定性与回归问题**  
今日报告多个关键问题需紧急处理：

| 问题 | 严重程度 | 状态 | 说明 |
|------|----------|--------|-------|
| [#26340](https://github.com/sgl-project/sglang/issues/26340) CUDA Coredump Tracker | ⚠️ 高 | 开放（321 条评论） | 自动从 CI 收集；影响多个 GPU 配置。根本原因未知。 |
| [#42162](https://github.com/sgl-project/sglang/issues/42162) MiMo-V2.6 在 SM90（H200）上崩溃 | ⚠️ 高 | 开放（0 条评论） | 自动 MoE 运行器选择导致 Triton FP8 运行器误用；可在 H200/B200/B300 上复现。 |
| [#42012](https://github.com/sgl-project/sglang/issues/42012) GLM-5.3-Flash FA4 在 SM120 上崩溃 | ⚠️ 高 | 开放（1 条评论） | 混合扩展重塑导致 CUDA 图捕获失败；仅 Triton 后端可用。 |
| [#37633](https://github.com/sgl-project/sglang/issues/37633) 并发场景下 CUDA 非法内存访问 | ⚠️ 高 | 开放（9 条评论） | 在 8 个并发请求时可复现；存在临时解决方案但不安全。 |
| [#41939](https://github.com/sgl-project/sglang/issues/41939) GLM-5.3-Flash NVFP4 在 B200/B300 上无限循环 | ⚠️ 中等 | 开放（1 条评论） | 模型陷入无限推理循环，无最终答案输出。 |

> 🔍 **注意**：尽管已有若干修复正在推进中（例如 PR #42166 修复 MiniMax-M3 崩溃），但关键回归问题仍处于开放状态，影响生产级部署。

---

### **6. 对应用开发者的影响**  
- **谨慎使用推测解码与 DFLASH** —— 当启用 FlashInfer 自动调优时，贪婪模式在重启后不可重现 ([#39597](https://github.com/sgl-project/sglang/issues/39597))。生产环境请禁用自动调优或使用确定性设置。  
- **避免在启用捕获后 KV 大小调整时使用 `--enable-unified-memory`**，直到 PR #41961 稳定为止 —— 高吞吐场景下可能导致内存损坏。  
- **对于 AMD 用户**：在 ROCm 上启用 HiSparse 与 HiCache 功能时可能遇到不稳定情况 —— 生产环境请避免使用实验性后端，直至进一步验证。  
- **模型开发者**：请确保模型配置（如 `forget_gate.f_{a,b}_proj`）符合 SGLang 的张量命名规范 —— 若命名不匹配，GLM-5.3-Flash 会静默失败 ([#41836](https://github.com/sgl-project/sglang/issues/41836))。  
- **智能体构建者**：留意工具调用解析缺陷 —— 例如 `trinity detector` 会剥离参数内部的 `<think>` 标签 ([#42140](https://github.com/sgl-project/sglang/issues/42140))，且流式输出在对接 Ollama 端点时可能发生乱序 ([#42141](https://github.com/sgl-project/sglang/issues/42141))。

👉 **可操作建议**：优先在 **长上下文**、**高并发** 以及 **混合精度**（FP8/MXFP4）工作流中进行测试 —— 这些场景最易暴露稳定性短板。密切监控问题追踪器，重点关注 H200/H20/B200/B300 硬件相关的修复进展。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 摘要 – 2026-10-02**

---

### **1. 今日亮点**  
最新一轮更新聚焦于 **MTP（多标记预测）的稳定性与性能**，修复了 `llama.cpp` 中递归内存处理的关键问题，并增强了对 Qwen4Exp 模型的支持。后端优化方面也取得显著进展：CUDA 现已正确支持 NVFP4 计算类型及 BF16 量化模型，OpenCL 则初步支持 `q2_K` 和 `q3_K` 量化。然而，已在高通 Adreno 驱动的 Vulkan 上报告严重回归问题，导致无声崩溃且无任何诊断输出。

---

### **2. 发布与破坏性变更**  
今日未发布新稳定版本。但以下提交代表重要变更：

- **[b11332]** 修复递归内存（`llama.c`）中的无效断言 —— 解决长期运行 MTP 会话时的崩溃问题。  
  🔗 [PR #29799](https://github.com/ggml-org/llama.cpp/pull/29799)

- **[b11331]** 改进 CUDA 计算类型处理，支持 NVFP4 并在硬件允许时启用 BF16。  
  🔗 [PR #29173](https://github.com/ggml-org/llama.cpp/pull/29173)

- **[b11330]** 通过 PR #29761 为 Qwen4Exp 模型添加 MTP 支持，使下一代 Qwen 变体可启用推测解码。  
  🔗 [PR #29761](https://github.com/ggml-org/llama.cpp/pull/29761)

> ⚠️ **迁移提示**：从旧版本升级的用户应重新验证使用 Qwen3.8/4Exp 模型时的 MTP 行为，因内部状态清理和命名一致性改进可能影响表现。

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen4Exp 模型**：通过 PR #29761 实现完整 MTP 支持，可在 Qwen3.8-Flash-Next IQ4_XS GGUF 上启用推测解码。  
  🔗 [PR #29761](https://github.com/ggml-org/llama.cpp/pull/29761)

- ✅ **GLM-5.3-Flash**：通过 PR #27773 合并实验性支持；包含视觉+文本混合模型兼容性。  
  🔗 [PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773)

- ✅ **OpenCL 后端**：通过 PR #28577 初步引入 `q2_K` 与 `q3_K` 矩阵乘法支持。  
  🔗 [PR #28577](https://github.com/ggml-org/llama.cpp/pull/28577)

- ✅ **Hexagon（高通 AI 引擎）**：通过 PR #29828 更新骨架安装流程，确保重建的内层骨架被正确签名并安装。  
  🔗 [PR #29828](https://github.com/ggml-org/llama.cpp/pull/29828)

---

### **4. 性能与优化**  
- **CUDA**：若硬件支持，对量化模型启用 BF16 计算类型，提升低精度推理吞吐量。  
  🔗 [PR #29173](https://github.com/ggml-org/llama.cpp/pull/29173)

- **CUDA**：在统一 KV 解码中减少稳定图重播期间的冗余预热调用，降低延迟开销。  
  🔗 [PR #29768](https://github.com/ggml-org/llama.cpp/pull/29768)

- **Vulkan**：对量化 K/V 缓存（如 Qwen3.8-Flash-Next）启用稀疏 Flash Attention，避免对完整上下文进行密集计算。  
  🔗 [PR #29639](https://github.com/ggml-org/llama.cpp/pull/29639)

- **CPU/GPU**：`ggml-cpu` 现在支持非 2 的幂次维度的克罗内克积（PR #28490），实现更灵活的张量操作。

---

### **5. 稳定性与回归问题**  
今日报告的主要问题：

| 严重程度 | 问题 | 影响 | 修复状态 |
|---------|------|--------|------------|
| 🟡 高 | **高通 Adreno 驱动上的 Vulkan**：无错误输出的静默 `SIGABRT`（`-ngl >= 1`） | 阻碍移动端部署 | ❌ 尚无修复；已在真实设备上复现 |
| 🔴 严重 | **Qwen3.6-27B-MTP 在长时间会话后重复输出 `////`** | 延长推理任务中输出损坏 | ❌ 未确认；待提交 PR |
| 🔴 严重 | **CUDA：Qwen3.5-122B-A10B 在 sm_70 上首次请求即崩溃** | 导致 V100 集群无法使用 | ❌ 未确认；可能与 Gated DeltaNet 内核启动有关 |
| 🟡 中等 | **SYCL `--split-mode tensor` 在使用量化 KV 缓存时挂起** | 破坏多 GPU 部署 | ❌ 尚无修复 |

> 🔍 **严重警示**：Adreno 平台上的 Vulkan 崩溃问题（问题 #29786）尤为令人担忧——**完全无日志输出**，几乎无法调试。该问题影响使用 Vulkan 后端的移动与边缘部署。

---

### **6. 对应用开发者的影响**  
- **谨慎使用 MTP** 于 Qwen4Exp 与 Qwen3.6-27B 模型——在修复落地前，长时间会话中可能出现输出污染。
- **生产环境推理优先选择 ROCm 或 CUDA** 而非 Vulkan，尤其在 AMD/NVIDIA 显卡上；Vulkan 在 Adreno 及部分老旧 AMD iGPU 上仍不稳定。
- **在可用时利用 BF16 计算**（特别是新款 NVIDIA 显卡），以加速量化模型的推理速度。
- **若使用量化 KV 缓存，避免在 SYCL 或 CUDA 中使用 `--split-mode tensor`** —— 已知会导致挂起或性能下降。
- **密切关注 PR #29786 与 #29783** —— 分别是移动端与高端 GPU 工作负载的致命阻塞点。
- **嵌入式系统可考虑使用 OpenCL** 搭配 `q2_K`/`q3_K` 模型——虽为早期支持，但已具备潜力。

> 💡 **实用建议**：依赖结构化输出（如 JSON）的代理应用，避免在 `response_format.json_schema` 下使用 `peg-native` —— 已知会在对象中间失败并返回 HTTP 500（问题 #27279）。

---  
*数据来源：[github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)，2026年10月2日*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-02**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展，代理支持与模型集成方面取得关键改进，解决了近期版本中报告的安全性和网络限制问题。值得注意的是，多个 PR 已合并或开启以修复 `0.35.0` 版本中的 HTTPS 代理绕过问题，同时新贡献已实现对 System One 及 MLX 模型的支持。此外，一次高危 CVE 审计也引发了对 Go 二进制依赖项的紧急关注。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，**问题 #18729** ([已关闭](https://github.com/ollama/ollama/issues/18729)) 确认了 **v0.35.0** 中存在回归问题：从 Cloudflare R2 下载模型时，模型拉取过程会绕过 `HTTPS_PROXY`，导致企业防火墙策略失效。该问题正通过 **PR #18733**、**#18730** 与 **#18731**（均处于开放状态）修复，目标是将基于环境变量的代理配置注入到 HTTP 客户端层。

---

### **3. 新模型与硬件支持**  
- ✅ **System One 模型** 已通过 **PR #18701** ([开放](https://github.com/ollama/ollama/pull/18701)) 实现对 MLX 的支持，使 Apple Silicon 上决策类模型的原生推理成为可能。
- 🚀 通过 **PR #18741** ([已关闭](https://github.com/ollama/ollama/pull/18741)) 在 `llama-server` 中新增 **Clef 支持**，拓展了对下一代推理模型的兼容性。
- 🔧 **M5 Mac 上的 MLX 错误** ([#14118](https://github.com/ollama/ollama/issues/14118)) 在 v0.15.5 中依然存在；用户报告尽管显存分配成功（约 11.9 GB），Metal 内核仍加载失败。
- ⚠️ **RTX 5090（Blackwell）上出现 CUDA 非法内存访问**，使用 Cohere MoE 模型时在 Windows 11 下提示崩溃，问题尚未解决 ([#18642](https://github.com/ollama/ollama/issues/18642))。

---

### **4. 性能与优化**  
- 🔥 **Mac Studio M4 Max 上的 CPU 使用率飙升**：`llama-server` 在生成令牌期间占用 **约 560% CPU** ([#18038](https://github.com/ollama/ollama/issues/18038))。该问题被追溯至 v0.32.14 版本，根源在于即使 GPU 利用率达 100%，仍存在低效轮询行为。
- 💡 **修复进行中**：**PR #18613** 提出当检测到 GPU 时，向 `llama-server` 传入 `--poll 0` 参数，据此前基准测试，可减少高达 **90%** 的空闲 CPU 自旋等待。
- 📉 **容器吞吐量崩溃**：`n_threads` 默认值为宿主机核心数，而非 cgroup CPU 配额，导致在 CPU 受限容器中性能下降约 **45 倍** ([#17916](https://github.com/ollama/ollama/issues/17916))。修复待定。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 说明 |
|--------|------|--------|-------|
| 关键 | Go 二进制文件（`/usr/local/bin/ollama`）中的 CVE | 开放 [#16033](https://github.com/ollama/ollama/issues/16033) | 在供应商依赖项中检测到 1 个严重级、11 个高危级漏洞（例如 `buger/juli`） |
| 高 | RTX 5090（Blackwell）上发生 CUDA 崩溃 | 开放 [#18642](https://github.com/ollama/ollama/issues/18642) | 在 Windows 上使用 Cohere MoE 模型可复现 |
| 高 | macOS 上 MLX 内核加载失败 | 已关闭 [#14118](https://github.com/ollama/ollama/issues/14118) | v0.15.5 之后仍影响 M5 Mac |
| 中等 | 孤立的 blob 未被清理（发现 21GB） | 已关闭 [#18595](https://github.com/ollama/ollama/issues/18595) | 需手动清理；无自动回收机制 |
| 低 | 重定向目标不允许（Cloudflare R2） | 开放 [#18716](https://github.com/ollama/ollama/issues/18716) | 网络策略强制执行问题 |

---

### **6. 对应用开发者的启示**  
- **需感知代理的部署** 必须手动打补丁或降级，直至 **PRs #18730–#18733** 合并。在 CI/企业环境中显式设置 `HTTP_PROXY` / `HTTPS_PROXY` 环境变量。
- 若依赖 `HTTPS_PROXY`，请避免在生产环境使用 v0.35.0 —— 该版本会通过 Cloudflare R2 导致模型拉取流程中断。
- **在新型硬件（如 RTX 5090、M5 Mac）上运行高 GPU 负载任务** 可能面临不稳定性；建议监控崩溃情况，并临时回退至 v0.34.4。
- **容器化应用** 应显式覆盖 `n_threads` 并验证 cgroup 限制 —— 当前行为忽略 `cpu.max` 与 `cpuset`。
- **客户端集成**（如 SillyTavern）必须处理可选参数（如 `typical_p`，现已移除）—— 预期后续版本将引入向后不兼容变更。

> 🔗 *实时追踪请访问：[GitHub Ollama Issues](https://github.com/ollama/ollama/issues) | [Pull Requests](https://github.com/ollama/ollama/pulls)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 简报 – 2026-10-02**

---

### **1. 今日亮点**  
LiteLLM 生态系统持续快速演进，关键的安全与稳定性改进已落实，包括修复了影响 v1.82.7–v1.82.8 的高危供应链入侵问题（#24518），目前已完全受控。近期新增的 PR 主要聚焦于提升 MCP 可靠性、修复 OpenAI/Vertex AI 的流式处理行为，并增强 Lens 和请求日志中的追踪可见性。

---

### **2. 发布与破坏性变更**  
- **v1.103.2** 与 **v1.101.4** 已发布，通过 Cosign 验证了 Docker 镜像签名（密钥来自 [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)）。  
- **安全提醒**：所有此前被入侵的 PyPI 包（v1.82.7/v1.82.8）均已移除；当前版本均为干净版本。完整时间线详见：[Security Townhall](https://docs.litellm.ai/blog/security-townhall-updates)。  
- **迁移影响**：`LITELLM_BUILD_SPEND_LOGS_INDEXES` 环境变量现控制 SpendLogs 索引创建是在启动时还是迁移阶段执行（PR #44124）。

---

### **3. 新模型与硬件支持**  
- **Gemini Live Avatar（正式版）**：在实时 Gemini/Vertex 集成中新增对 `avatar_config` 的支持（PR #43166）。  
- **Anthropic Workload Identity Federation**：新增功能请求（#28607），旨在启用 OIDC JWT bearer token 交换以实现安全认证。  
- **Bedrock Mantle 认证修复**：修正 SigV4 签名服务名称（应为 `bedrock-mantle` 而非 `bedrock`）（PR #44112）。

---

### **4. 性能与优化**  
- **流式回退续传**：PR #41127 实现了聊天补全过程中的中途流式回退重试，降低模型不可用时的失败损失。  
- **提示缓存效率**：PR #44119 在桥接聊天 → 响应过程中保留 `prompt_cache_breakpoint` 标记，防止工具调用流程中的缓存未命中。  
- **索引优化**：PR #44124 将 SpendLogs 索引构建设为可选，减少大表或分区表的启动开销。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |
|--------|------|--------|-------|
| 严重 | 部分通用流式数据块因缺少字段（text, is_finished）导致 `KeyError` | 未解决 | [PR #43487](https://github.com/BerriAI/litellm/issues/43487) |
| 高 | `max_budget` 键在空闲 60 秒后重新出现，直至批量刷新 | 未解决 | [PR #43732](https://github.com/BerriAI/litellm/issues/43732) |
| 高 | 标准输入输出 MCP 服务配置正确但无法在 UI 中运行 | 未解决 | [PR #15560](https://github.com/BerriAI/litellm/issues/15560) |
| 中 | `previous_models` 因共享路由器状态导致跨请求数据泄露 | 已关闭 | [PR #24965](https://github.com/BerriAI/litellm/issues/24965) |
| 中 | `service_tier` 对所有值均被 Vertex AI 拒绝并返回 400 错误 | 未解决 | [PR #34914](https://github.com/BerriAI/litellm/issues/34914) |

---

### **6. 对应用开发者的启示**  
- **安全**：请立即升级至 v1.103.2 或更高版本。避免使用 v1.82.7/v1.82.8。使用 Cosign 验证镜像签名。  
- **可靠性**：若使用流式回退或长时间运行的代理工作流，请启用 `mid-stream fallback continuation`（通过 PR #41127 开启）。  
- **可观测性**：仅在必要时设置 `LITELLM_BUILD_SPEND_LOGS_INDEXES=1`，否则禁用自动索引以避免启动延迟。  
- **工具链**：使用 Presidio 时需注意重叠的 PII 范围（PR #42130），并确保工具调用链中 `prompt_cache_breakpoint` 被正确保留（PR #44119）。  
- **认证**：企业部署建议启用 `GENERIC_AUTHORIZATION_PARAMS`（PR #44108），以支持 AD FS 资源声明。

👉 完整问题列表：[GitHub Issues](https://github.com/BerriAI/litellm/issues)  
👉 最新 PR 列表：[GitHub Pull Requests](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-02**

---

### **1. 今日亮点**  
Unsloth v0.1.902-beta 引入了全新的 **命令面板**（通过 `Cmd` 访问），支持更快的导航、可共享的运行设置，以及 Unsloth Desktop 中更清晰的错误报告。性能改进包括 **Laya 决策速度提升 4 倍**，扩展了托管 Decision API 支持，并在 LoRA 训练过程中持续保留 NVFP4、INT4 和 MXFP4 检查点的 4 位精度。

---

### **2. 发布与破坏性变更**  
- **v0.1.902-beta** ([GitHub](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta))  
  - 新增命令面板（`Cmd`）、UI/UX 改进及错误可见性增强。  
  - Laya 决策速度提升 4 倍；扩展托管 Decision API 支持。  
  - 在 LoRA 微调过程中全程保持 4 位精度（NVFP4、INT4、MXFP4）。  
- **v0.1.901-beta** ([GitHub](https://github.com/unslothai/unsloth/releases/tag/v0.1.901-beta))  
  - 引入与 v0.1.902-beta 相同的核心用户体验优化和性能提升。  

> ✅ *未报告任何对 API 或配置格式的破坏性变更。*

---

### **3. 新模型与硬件支持**  
- **Qwen-Image-2.1 GGUF**：通过 UI 改进文本编码器处理与模型选择，实现增强支持 ([Issue #12470](https://github.com/unslothai/unsloth/issues/12470))。  
- **AMD ROCm on Windows**：仍处于积极调试阶段，因 fp8 编码器下载失败导致问题 ([Issue #11638](https://github.com/unslothai/unsloth/issues/11638))。  
- **vLLM 与 SGLang 集成**：实验性可选支持多 GPU 推理、量化及视觉模型 ([PR #11491](https://github.com/unslothai/unsloth/pull/11491))。  
- **MLX 后端**：按请求启用融合专家路由与归一化传递融合 ([PR #12422](https://github.com/unslothai/unsloth/pull/12422))。

---

### **4. 性能与优化**  
- **Laya 决策**：最新 beta 版本中加速 **4 倍** ([v0.1.902-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta))。  
- **Qwen-Image-2.1 Int8 推理**：融合 int8 GEMM 与反量化后处理，在 L4/A100 上实现每步 **14–17% 更快** ([PR #12448](https://github.com/unslothai/unsloth/pull/12448))。  
- **卸载优化**：对 5 位及以下的 GGUF 模型缓存 int8 检查点，使 12GB/8GB GPU 上的卸载延迟降低 **约 2 倍** ([PR #12455](https://github.com/unslothai/unsloth/pull/12455))。  
- **张量分片解码**：检测到回归问题 —— 双 RTX 5070 Ti 上解码吞吐量降至 **48 t/s**（此前为 115–118 t/s，b10715-mix-86bd2d3 之前）([Issue #12468](https://github.com/unslothai/unsloth/issues/12468))。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 状态 | PR / 修复 |
|--------|------|------------|--------|---------|
| 关键 | [Issue #12468](https://github.com/unslothai/unsloth/issues/12468) | 自 b10715-mix-86bd2d3 起，张量分片解码最慢达 **2.9 倍** | 开放 | 待调查 |
| 高 | [Issue #12445](https://github.com/unslothai/unsloth/issues/12445) | Qwen-Image-2.1：无转换加载路径中 1-D 归一化权重未反量化 | 开放 | 已在 [PR #12449](https://github.com/unslothai/unsloth/pull/12449) 修复 |
| 高 | [Issue #12415](https://github.com/unslothai/unsloth/issues/12415) | HF 量化发现阻塞离线设备模型加载 | 开放 | 已在 [PR #12451](https://github.com/unslothai/unsloth/pull/12451) 修复 |
| 中 | [Issue #11498](https://github.com/unslothai/unsloth/issues/11498) | Linux 下 AMD RX 7900 XTX GPU 在 QLoRA 训练期间重置 | 开放 | 尚无修复 |
| 中 | [Issue #12466](https://github.com/unslothai/unsloth/issues/12466) | Xet 健康探测因 Triton 模拟导致 diffusers/xformers 崩溃 | 开放 | 正在审查 |

---

### **6. 对应用开发者的意义**  
- **构建更快、更智能的代理**：新命令面板与可共享的运行设置简化工作流迭代，尤其适用于团队协作环境。  
- **优化混合精度推理**：使用 `block_swap_layers=N` 在显存不足时训练超大规模模型 ([PR #11832](https://github.com/unslothai/unsloth/pull/11832))。  
- **避免延迟陷阱**：在多 GPU 环境中谨慎使用 `--split-mode tensor` —— 近期版本显示显著解码减速 ([Issue #12468](https://github.com/unslothai/unsloth/issues/12468))。  
- **利用新引擎**：通过 Studio 的可选后端试用 **vLLM/SGLang** 集成，实现可扩展的多 GPU 服务 ([PR #11491](https://github.com/unslothai/unsloth/pull/11491))。  
- **确保离线鲁棒性**：部署于隔离环境时，使用仅本地 GGUF 发现模式 ([PR #12451](https://github.com/unslothai/unsloth/pull/12451))。  

> 🔧 *生产环境建议：锁定稳定版本，直至回归问题修复并验证完毕。*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*