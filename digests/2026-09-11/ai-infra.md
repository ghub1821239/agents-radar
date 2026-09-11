# AI 基础设施日报 2026-09-11

> 生成时间: 2026-09-11 00:30 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-11**

---

### **1. 生态概览**  
2026年第三季度，AI推理基础设施格局正迅速向高吞吐、低延迟的下一代MoE与混合注意力模型（如DeepSeek-V4、GLM-5.3-Flash）服务收敛，背后驱动力来自Blackwell（sm_121）和MI350X等新型硬件。尽管vLLM与SGLang在生产级引擎成熟度上领先，llama.cpp与Unsloth等项目仍在本地推理与边缘优化领域持续突破边界。对稳定性、正确性与安全性的日益重视——体现在FP8解码中的严重回归、CUDA内存损坏以及CVE漏洞中——表明该生态正从“功能迭代速度”转向“生产就绪性”。多模态代理与工具链的兴起，也进一步推动了对健壮模型路由、防护机制及OCR集成的需求。

---

### **2. 活跃度对比**

| 项目        | 开放问题 | 开放PR | 最近24小时发布 | 关键状态 |
|----------------|-------------|----------|----------------------|------------|
| **vLLM**       | 127         | 89       | 无                 | 活跃开发；待定破坏性变更 |
| **SGLang**     | 142         | 104      | 无                 | 高度不稳定；处于CI维护模式 |
| **llama.cpp**  | 118         | 92       | 3个修复（轻微）      | 稳定但存在关键缺陷 |
| **Ollama**     | 121         | 76       | 无                 | 云环境与量化模型存在稳定性问题 |
| **LiteLLM**    | 134         | 112      | v1.100.1 / rc.2      | 安全加固版本 |
| **Unsloth**    | 108         | 87       | 无                 | 实验性功能正在进行中 |

> ✅ *洞察*：**SGLang**与**LiteLLM**活跃度最高，反映出它们作为集成层正在经历高强度开发。尽管vLLM PR数量较低，但其核心引擎稳定性仍是最主要关注点。

---

### **3. 模型支持竞赛**

| 模型 / 架构       | vLLM       | SGLang     | llama.cpp   | Ollama       | LiteLLM       | Unsloth         |
|----------------------------|------------|------------|-------------|--------------|---------------|-----------------|
| **DeepSeek-V4.1-Flash**    | ⚠️ 进行中 (#50576) | ✅ 正在PR (#38963) | ✅ 已添加 (#28696) | 🔶 功能请求 (#18360) | —             | —               |
| **GLM-5.3-Flash**          | ❌ ROCm/DFlash 问题 | ⚠️ SM120/TP8 支持 | ✅ 已添加 (#27773) | 🔶 云支持待定 | —             | —               |
| **Qwen3.8-Flash-Next-FP8** | 🔴 非确定性 | —          | ⚠️ 推测解码偏差 | 🟡 任务成功率 0% (q2_K/q3_K) | —             | —               |
| **Wan2.2-TI2V-5B (视频)** | —          | —          | —           | —            | —             | ✅ NVFP4 支持 |
| **Azure Document Intelligence** | —          | —          | —           | —            | ✅ 原生适配器 | —               |
| **Reducto OCR**            | —          | —          | —           | —            | ✅ 已集成 | —               |

> 🏆 **胜出者**：**llama.cpp** 在新模型（尤其是视觉+Flash变体）的早期采纳上领先，而**SGLang**在DSV4.1与共享专家融合的工程整合速度最快。**vLLM** 虽然在功能交付上落后，但长期稳定性更优。

---

### **4. 性能前沿**

| 关注领域               | 领先项目                          | 关键进展                                                                 |
|--------------------------|-------------------------------------------|----------------------------------------------------------------------------------|
| **KV缓存优化**| vLLM, SGLang, llama.cpp                   | Engram I/O预取（vLLM）、统一KV池（SGLang）、增量索引缓存（llama.cpp） |
| **批处理与并行**| vLLM (MTP+GDN), SGLang (DCA/HiCache)     | MTP+混合GDN中出现严重吞吐损失（vLLM）；解码回退崩溃（SGLang） |
| **量化**         | Unsloth (NVFP4), vLLM (FP8), llama.cpp (Q4_K_M) | NVFP4用于视频模型（Unsloth）；Q4_K_M推测解码偏差（llama.cpp） |
| **分布式服务**  | vLLM, SGLang                              | 张量并行归约顺序（`VLLM_TP_FIXED_ORDER_ALLREDUCE`），DCP >1 风险 |
| **内核级优化**         | vLLM (CUTLASS Lamport), llama.cpp (Vulkan) | 融合GEMM+AllReduce（vLLM），小矩阵优化（llama.cpp）                  |

> 🔥 **趋势**：前沿已从单纯追求速度转向“复杂场景下的正确性”——尤其是在FP8、MoE与多GPU配置中。

---

### **5. 层级定位**

| 项目        | 主要层级                     | 角色摘要                                                                 |
|----------------|-----------------------------------|------------------------------------------------------------------------------|
| **vLLM**       | **推理引擎**              | 核心GPU加速服务引擎；性能与可扩展性的基准参考 |
| **SGLang**     | **推理引擎 + 网关**    | 在引擎基础上扩展代理感知路由、HiCache与推测工作线程 |
| **llama.cpp**  | **本地运行时 / 边缘推理**| 跨平台、CPU/GPU优化运行时；适用于离线/嵌入式场景的理想选择 |
| **Ollama**     | **网关 / 本地运行时**       | 开发友好型命令行/API网关，集成模型库与代理工具链            |
| **LiteLLM**    | **LLM网关 / 编排层**   | 企业级代理层，支持成本追踪、防护机制与多提供商路由 |
| **Unsloth**    | **微调 + 本地运行时**   | 专精于快速训练/微调与优化的本地推理（尤其适用于Apple Silicon） |

> 💡 **战略洞察**：技术栈正变得模块化——引擎（vLLM/SGLang）、运行时（llama.cpp/Unsloth）、网关（Ollama/LiteLLM）——开发者可根据部署场景灵活选型。

---

### **6. 趋势信号**

1. **稳定性优先于速度**：FP8解码中的严重回归、无声内存损坏以及CVE（Ollama）等问题，标志着从“快速构建”向“安全运行”的转变。生产用户现在必须逐项审查每个补丁。

2. **MoE与混合注意力主导**：各项目正竞相支持DFlash、共享专家融合与混合GDN架构——表明这些已成为大模型的默认标准。

3. **多模态代理基础设施日趋成熟**：新OCR适配器（Azure Doc AI、Reducto）、工具模式校验及结构化输出强制执行（LiteLLM、SGLang）显示，代理流程已不再是实验性方案。

4. **安全性与供应链完整性受重视**：LiteLLM的cosign签名镜像与Ollama的公开漏洞披露，凸显对二进制可信度的日益关注——生产环境将面临更严格的验证要求。

5. **边缘与桌面优化加速**：Unsloth的NVFP4视频支持与llama.cpp的Windows ARM64构建能力，显示出本地、低资源推理的强大发展势头。

> ✅ **开发者实用建议**：
> - 在修复前避免使用`q2_K/q3_K`量化（Ollama）。
> - Qwen MoE使用时请启用`--flash-attn off`或使用打补丁版本（llama.cpp）。
> - 生产环境除非追踪特定PR，否则优先选择稳定版v0.26.1（vLLM）或`main`分支（SGLang）。
> - 所有FP8输出务必验证——非确定性问题普遍存在。
> - 利用LiteLLM的防护机制与OCR集成，构建安全、多模态的代理工作流。

---

> **结语**：AI基础设施栈已不再仅关乎速度——而是关于**可靠性、正确性与运营安全**。选择工具时，不仅要考虑性能，更要考量其在大规模场景下的韧性。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-11**

---

### **1. 今日亮点**  
vLLM 项目持续加速对下一代模型与硬件的支持，针对混合 GDN 架构上的推测解码修复了关键问题，并持续推进 Blackwell（sm_121）和 ROCm 平台的性能稳定性优化。当前重点包括在 SM8x（Ampere）GPU 上启用 DeepSeek-V4-Flash 支持，以及解决 Qwen3.8-Flash-Next 中长期存在的 top-k 非确定性问题——这两项均为生产推理中的关键障碍。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
然而，多个 **破坏性变更** 正在待合并的 PR 中：  
- `PR #56250` 引入运行时校验，禁止 `MRV1 + PP>1 + async sched + structured output` 组合，此前该配置因状态机失败导致 HTTP 500 错误 ([#45014](https://github.com/vllm-project/vllm/issues/45014))。  
- `PR #56358` 引入可选标志 `VLLM_TP_FIXED_ORDER_ALLREDUCE=1`，用于控制张量并行归约顺序——可能影响多节点部署的行为。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4-Flash / -0731**：活跃功能请求 (#50576) 要求启用 SM8x（A100/A800/RTX 30xx）支持；目前受限于内核兼容性。  
- **GLM-5.3-Flash**：多个问题暴露其在 ROCm/DFlash 支持上的不完整：缺失 `SupportsEagle3`、缺乏非因果稀疏注意力路径 ([#54451](https://github.com/vllm-project/vllm/issues/54451))，以及在 4xB200 上崩溃 ([#54317](https://github.com/vllm-project/vllm/issues/54317))。  
- **Blackwell (sm_121)**：仍缺乏完整的 aarch64 支持 ([#36821](https://github.com/vllm-project/vllm/issues/36821))，且存在因旧 Triton 缓存导致的静默数据损坏风险 ([#41871](https://github.com/vllm-project/vllm/issues/41871))。  
- **ROCm (MI350X, gfx950)**：持续推进高阶专家共享在 TP>1 时的实现 ([#56167](https://github.com/vllm-project/vllm/pull/56167))，并增加 TheRock 构建选项 ([#56351](https://github.com/vllm-project/vllm/pull/56351))。

---

### **4. 性能与优化**  
- **推测解码**：使用 MTP 与混合 GDN 模型时，报告出现严重吞吐损失（约 30–40%），原因是前缀缓存失效后发生不必要的重新计算 ([#53670](https://github.com/vllm-project/vllm/issues/53670))。已在 `PR #52244` 中修复（待合并）。  
- **Engram I/O**：`PR #56357` 为 DeepSeek V4.1 engram 表添加异步预取与 mmap 共享机制——降低 CPU 开销，在 `cpu_offload` 场景下提升延迟表现。  
- **内核优化**：`PR #55261` 提议集成 CUTLASS Lamport GEMM+AllReduce 以适配 Blackwell——通过融合内核有望提升集体通信效率。  
- **MoE 与 TP**：`PR #29139` 通过 `torch.compile` 优化通信用途，减少 MoE + TP 场景下的冗余计算。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|------|-------------|------------|
| 🔴 高 | [#54521](https://github.com/vllm-project/vllm/issues/54521) | `Qwen3.8-Flash-Next-FP8` 在上下文接近 `indexer_budget` 时出现非确定性贪婪解码 | 开放 — 影响正确性 |
| 🔴 高 | [#54317](https://github.com/vllm-project/vllm/issues/54317) | 4xB200 上反复出现 CUDA 非法内存访问（KDA 线性注意力、MHC TileLang、TRT-LLM 融合 MoE） | 开放 — 存在崩溃风险 |
| 🔴 高 | [#54300](https://github.com/vllm-project/vllm/issues/54300) | 从 v0.28 升级至 v0.29 后，`GlmMoeDsa` + decode-context-parallel 出现静默 token 损坏或崩溃 | 开放 — 回归问题 |
| 🟡 中 | [#55533](https://github.com/vllm-project/vllm/issues/55533) | MTP + 混合 GDN 下调度器退化至约 3 个并发序列，吞吐严重下降 | 开放 — 高影响 |
| 🟡 中 | [#49546](https://github.com/vllm-project/vllm/issues/49546) | Marlin W4A8-FP8 在 GB10/sm_121a 上静默输出污染，引发重复 `</think>` 循环 | 开放 — 正确性缺陷 |

---

### **6. 对应用开发者的启示**  
- **在 `PR #52244` 合并前避免使用 MTP + 混合 GDN** —— 会导致严重吞吐下降与冗余重计算。  
- **在 Qwen3.8-Flash-Next 与 GLM-5.3-Flash 上需谨慎验证 FP8 输出**：非确定性与静默数据损坏仍是活跃风险。  
- **仅在需要确定性归约顺序时使用 `VLLM_TP_FIXED_ORDER_ALLREDUCE=1`** —— 可能影响大规模张量并行部署的可扩展性。  
- **密切监控 ROCm 构建** —— 多个 DFlash 与 MoE 问题仍未解决，尤其在 MI350X 与 CDNA3 平台上。  
- **优先使用 nightly 构建** 获取最新修复（如 `glm53-flash` Docker 镜像），但需注意在 DGX Spark（GB10）等新硬件上可能存在不稳定现象。

> ✅ *建议*：生产环境请坚持使用稳定版 v0.26.1 或更早版本，除非您正跟踪特定 PR 且能容忍已知回归。调试时务必配合 `--disable-async-scheduling` 与 `--disable-multiprocessing` 使用。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 消息简报 – 2026-09-11

---

### **1. 今日重点**  
SGLang 生态系统持续聚焦下一代 LLM 服务的稳定性与性能，核心工作包括 DeepSeek-V4.1 的集成以及 GPU 基础设施加固。关键 PR 主要围绕在 DSV4.1 中启用共享专家融合、修复 HiCache 与编码器重放的兼容性问题，以及解决 CI 测试中引发的 CUDA 核心转储（core dump）。项目仍在积极处理影响多 GPU 推理的回归问题，特别是在 Hopper（H20）和 Blackwell（SM120）架构上。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告新发布或破坏性变更。  
*注：* 正在推进与上游 main 分支的同步（参见 [#38818](https://github.com/sgl-project/sglang/issues/38818)），这是合并 DeepSeek-V4.1 的前提条件——未来可能引发模型路由和内存管理方面的破坏性变更。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1（FP8, TP8, DSpark）**：通过 [#38963](https://github.com/sgl-project/sglang/pull/38963) 等 PR 正在积极开发，目标是实现 VL 路由中的 `num_fused_shared_experts`。  
- **GLM-5.3-Flash（SM120）**：进展追踪于 [#37813](https://github.com/sgl-project/sglang/issues/37813)；需修复内容包括 MoE 权重加载及双 96GB RTX PRO 6000 Blackwell GPU 上的 KV 缓存处理。  
- **SenseNova-U1/U1.5**：功能追踪在 [#37742](https://github.com/sgl-project/sglang/issues/37742)，基于官方 OpenSenseNova/SenseNova-U1 参考实现。  
- **AMD ROCm 支持**：针对 MiniMax-M3（`gfx942+`）进行了增强，支持 FP8 K-cache 分配 ([#36549](https://github.com/sgl-project/sglang/pull/36549)) 并启用了共享专家融合 ([#36576](https://github.com/sgl-project/sglang/pull/36576))。  
- **NPU 与 NVSHMEM**：将捆绑的 NVSHMEM 升级至 3.7.2 ([#38769](https://github.com/sgl-project/sglang/issues/38769))，以支持生产环境网络中 InfiniBand GID 索引。

---

### **4. 性能与优化**  
- **共享专家融合**：通过统一索引器执行优化 DSV4.1 ([#38962](https://github.com/sgl-project/sglang/pull/38962))，并使 `num_fused_shared_experts` 经由 VL 路由传递 ([#38963](https://github.com/sgl-project/sglang/pull/38963))。  
- **内核融合**：针对 AMD 的优化降低了解码开销：将 Q/K 预处理融合为单个内核 ([#34394](https://github.com/sgl-project/sglang/pull/34394))，并融合 Qwen3.5 中量化后的 `in_proj` 层 ([#33068](https://github.com/sgl-project/sglang/pull/33068))。  
- **内存效率**：为 DeepSeek V4 实现统一的 KV 池管理 ([#38954](https://github.com/sgl-project/sglang/pull/38954))，并改进注意力路径间的状态复用。  
- **推测解码**：允许推测工作线程在目标重放前预加载 prefilled 读取操作 ([#38554](https://github.com/sgl-project/sglang/pull/38554))。

---

### **5. 稳定性与回归问题**  
今日报告的关键问题：  
1. **CUDA 核心转储追踪 (#26340)**：296 条评论；由 `pr-test.yml` 自动收集核心转储。因可能引发 CI 和运行时崩溃，严重性较高。尚未有修复 PR。  
2. **PD 分离模式下的解码回退崩溃 (#38645)**：在将 KV 缓存回退至主机内存时，CUDA 设备端触发断言。影响高并发解码服务器且 DCP > 1 场景。  
3. **H20 八卡启动失败 (#38793)**：Qwen3.8-Flash-Next-FP8 在 8x H20 配置下无法启动。可能与内存布局或分布式调度有关。  
4. **Kimi-K3 严格工具语法漏洞 (#38587)**：`additionalProperties` 导致命名属性约束被稀释，引发无效工具调用。影响代理工作流中的严格模式校验。  
5. **HiCache + 编码器重放失败 (#38957)**：HiCache 拒绝在 DSV4.1 编码器中使用的有界重放；需对前缀树处理结构进行重构。  

*注：* 多个 PR 已着手解决根本原因（如 #38957、#38645），但截至 2026-09-11 尚未合并。

---

### **6. 对应用开发者的影响**  
- **实验性模型存在不稳定性**（DSV4.1、GLM-5.3-Flash、SenseNova-U1）：请使用稳定分支，待正式发布后再升级。  
- **避免在解码回退场景中使用 `--dcp-size > 1`**，直至 [#38645](https://github.com/sgl-project/sglang/issues/38645) 修复——高负载下存在崩溃风险。  
- **在 DSV4.1 上谨慎使用 `--enforce-shared-experts-fusion`**：当前行为会导致垃圾输出 ([#38963](https://github.com/sgl-project/sglang/pull/38963))。  
- **LoRA 与 HiCache 用户**：通过 `extra_key` 启用盐隔离 ([#38577](https://github.com/sgl-project/sglang/pull/38577))，防止跨适配器 KV 缓存污染。  
- **多 GPU 部署用户**：密切监控 H20 与 SM120 配置——多个启动与正确性缺陷仍处于开放状态。  
- **CI 健康状况为首要任务**：团队已进入维护模式 ([#21065](https://github.com/sgl-project/sglang/issues/21065))，以稳定测试流水线；预计 PR 合并将延迟。

> ✅ **建议**：仅在积极贡献或测试前沿功能时才锁定到 `main` 版本。生产环境请等待 DeepSeek-V4.1 同步后的正式发布。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-11**

---

### **1. 今日重点**  
最新更新聚焦于 Qwen 模型在 Vulkan 后端的稳定性与性能优化，修复了推测解码和内存管理中的关键问题。主要改进包括优化小规模矩阵（small-M）运算、视觉输入后对 DFlash 支持的增强，以及跨多个后端的 GPU 内存处理能力提升。

---

### **2. 发布与破坏性变更**  
- **vulkan: 若上下文空闲，则在 `ggml_backend_vk_cpy_tensor_async` 中使用 CPU 写入** (#28618)  
  确保在 Vulkan 上下文处于空闲状态时仍能安全执行异步张量复制，降低竞争条件风险。
- **vulkan: PowerVR 上对 dmmv 使用共享内存归约作为回退方案** (#28341)  
  修复因专有 Vulkan 编译器不支持子组归约而导致的老款 PowerVR GPU 崩溃问题。
- **memory: 避免为索引器分配 V 缓存（未使用）** (#28330)  
  减少不必要的 GPU 内存占用；联合作者：Stanisław Szymczyk。

> 🔗 [PR #28618](https://github.com/ggml-org/llama.cpp/pull/28618), [PR #28341](https://github.com/ggml-org/llama.cpp/pull/28341), [PR #28330](https://github.com/ggml-org/llama.cpp/pull/28330)

---

### **3. 新模型与硬件支持**  
- **新增对 DeepSeek-V4.1-Flash（`deepseek41` 架构）的支持** (#28696)  
  通过 `convert` 工具实现最新 DeepSeek 模型变体的转换与推理。
- **新增对 GLM-5.3-Flash（GLM5-Next）的支持** (#27773)  
  完全支持 320B 混合文本+视觉模型，包含 DSA/MHC 层；集成视觉预处理流水线。
- **Windows ARM64 构建现支持 MSVC cl.exe** (#28362)  
  移除对 LLVM/Clang 的依赖；可通过 CMake 实现原生构建。

> 🔗 [PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696), [PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773), [PR #28362](https://github.com/ggml-org/llama.cpp/pull/28362)

---

### **4. 性能与优化**  
- **Vulkan: 针对 Qwen 的小 M 矩阵优化** (#28457)  
  - 通过交换 A/B 操作数优化 `m=1` 的 `mul_mat`  
  - 基于 M 与 N 维度改进分块选择逻辑  
  - 为小 M 矩阵启用 `split_k` → 降低注意力核函数延迟
- **CPU: 使用 VNNI 的分块 mul_mat 用于 k-quants** (#27851)  
  - 在兼容 CPU（如 Intel Xeon、Core i 系列）上实现 **3–7 倍加速**  
  - 采用 256×256 int8 分块，结合向量化展开；复杂度开销极低
- **QSA 索引器：增量池化键缓存** (#28699)  
  - 跨 token 缓存块摘要键 → 消除每步重复计算  
  - 解决 `qwen4exp` 在深度推理中占主导地位的解码成本；显著降低延迟

> 🔗 [PR #28457](https://github.com/ggml-org/llama.cpp/pull/28457), [PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851), [PR #28699](https://github.com/ggml-org/llama.cpp/pull/28699)

---

### **5. 稳定性与回归问题**  
- **量化目标上的推测解码偏差（Q4_K_M）** (#25618)  
  - **严重程度**：高 — 在贪婪采样（`temperature=0`）下产生不同输出  
  - 仅在量化模型上可复现；在 BF16 下结果一致  
  - 尚无修复 PR；由 Ankk98 报告（23 条评论）
- **DFlash + 视觉模型：drafters 无法分配新标记** (#28587)  
  - 已在 #28587 中修复：停止复制破坏 drafter 状态的图像偏移量  
  - 后续 PR #28715 将该修复扩展至所有视觉输入后的 drafter
- **CUDA 在 flash-attn 路径中出现非法内存访问（Qwen3.6-35B MoE + 部分卸载）** (#26609)  
  - 序列中第二请求时发生确定性崩溃  
  - 关闭 `--flash-attn off` 后消失 — 可能为内核同步问题
- **SYCL scratchpad 池破坏 LIFO 顺序** (#28660)  
  - 因 oneDNN scratchpad 使用不当导致 `ggml_sycl_pool_vmm::free` 崩溃  
  - 对使用 SYCL 的生产部署至关重要

> 🔗 [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618), [Issue #26609](https://github.com/ggml-org/llama.cpp/issues/26609), [Issue #28660](https://github.com/ggml-org/llama.cpp/issues/28660)

---

### **6. 对应用开发者的启示**  
- **若在 CUDA 上运行 Qwen MoE 模型，请使用 `--flash-attn off` 或打上 `b10897+` 补丁** — 当前 flash attention 存在未修复的内存损坏风险。
- **在 #25618 修复前，请避免对 Q4_K_M 量化模型使用推测解码** — 预期输出非确定性。
- **充分利用 `qwen4exp` 优化**（PR #28699）以加速 Qwen3.8-Flash-Next 的生成速度 — 特别适用于长上下文推理场景。
- **现在无需外部工具链即可使用 MSVC 编译 Windows ARM64 版本** — 非常适合边缘设备部署。
- **对 UTF-8 输出进行客户端校验**（PR #28724）：若从 BPE 词汇表生成原始文本，请添加客户端验证逻辑。

> 📌 小贴士：关注 `--cache-disk` 功能请求 (#20697) — 基于磁盘的上下文卸载功能即将上线，有望让低内存系统运行大模型推理。

---  
*数据来源：[github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*  
*简报生成时间：2026-09-11*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-11**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展其云端与本地推理能力，关键进展包括支持长达 100 万 token 的上下文窗口（context window）以及针对代理（agents）的工具链优化。高优先级的稳定性修复正在进行中，包括修复 `glm-5.3:cloud` 的无限推理循环问题（#18193），同时新提交的 PR 也解决了 `/api/generate` 中的内存泄漏及 Vulkan 后端的 GPU 特定崩溃问题。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何发布或破坏性变更。*  
然而，**PR #18364** 在设置界面中引入了对 512K 与 1M 上下文窗口的支持——这是一个重大变更，将使 `glm-5.3:flash` 与 `gemma4:12b` 等模型实现完整利用。预计将在后续版本中包含。  
🔗 [PR #18364 – 允许在设置中使用 1M 上下文](https://github.com/ollama/ollama/pull/18364)

---

### **3. 新模型与硬件支持**  
- **新模型请求**：`DeepSeek-V4.1-Flash` 目前已有两个活跃的功能请求（#18360、#18178）希望加入 Ollama Cloud。该模型当前可通过 Hugging Face 使用，但尚未原生支持。  
  🔗 [问题 #18360 – 将 DeepSeek-V4.1-Flash 加入 Cloud](https://github.com/ollama/ollama/issues/18360)  
- **硬件/后端更新**：  
  - **Vulkan ggml 后端** 报告在 AMD UMA APU 上出现严重卡死（问题 #18370），表明 GPU 卸载路径存在不稳定性。  
  - **MLX 后端改进**：PR #18376（保持 Gemma3n 投影器在 GPU 而非 CPU）与 #18327（作用域数组生命周期管理）提升了内存安全性，避免了在 CPU 上的无声数据损坏。  
  - **Gemma3n 工具模型** 在近期解析器修复后（#18366），现已正确通过 `/v1/chat/completions` 处理 `tool_calls`。

---

### **4. 性能与优化**  
- **内存泄漏修复**：PR #18344 识别出 `ollama serve` 中存在文件描述符泄漏问题，每次成功的 `/api/generate` 请求都会永久保留一个文件描述符——这是导致长期进程性能退化的已知原因。  
  🔗 [问题 #18344 – /api/generate 中的文件描述符泄漏](https://github.com/ollama/ollama/issues/18344)  
- **模型加载回归**：用户报告从 0.23.4 升级至 0.30.0 后，模型加载时间显著变慢（问题 #18373）。受影响的模型包括 `GPT-OSS:120b`。  
- **流式传输效率**：PR #18374 将重复令牌限制提高至 100，并在出错时提前返回错误而非不完整的响应，提升了 OCR 与文本生成任务的可靠性。  
  🔗 [PR #18374 – 提高令牌重复限制](https://github.com/ollama/ollama/pull/18374)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|--------|------|--------|--------|
| **严重** | Go 二进制文件（`/usr/local/bin/ollama`）存在漏洞 —— 1 个严重，11 个高危 | 开放（#16033） | 尚无修复；需紧急补丁 |
| **高** | `glm-5.3:cloud` 进入无限推理循环，导致 OpenCode/ZCode 任务中断 | 开放（#18193） | 通过 PR #18351 修复（传播流失败） |
| **高** | `qwen2.5-coder:3b-instruct` 的量化版本（q2_K/q3_K_S/M/L）全部代码任务失败（成功率 0%） | 开放（#18252） | 尚无修复；影响生产环境 |
| **中等** | macOS GUI 在处理约 6000 个 token 后静默失败；无错误提示 | 开放（#18368） | 尚无修复；影响长文档工作流 |
| **中等** | `gemma4:12b` 输出重复的 `<unused50>` 帧并发送 EOF，但未附带 `done: true` | 开放（#18359） | 尚无修复；干扰流式客户端 |
| **低** | `qwen2.5vl:3b` 在 GPU 上运行时，对特定一张 JPEG 图像会确定性崩溃 | 开放（#18369） | 尚无修复；可在特定条件下复现 |

---

### **6. 对应用开发者的影响**  
- **谨慎使用 `glm-5.3:cloud`**：在 #18193 修复前，请勿将其用于生产环境——在推理密集型任务中可能卡死或崩溃。  
- **预期上下文窗口限制**：尽管通过 #18364 已在设置中暴露 1M 上下文支持，但请确保你的代理/工具链支持动态上下文调整——例如，Claude Desktop 仍默认使用 200K，除非检测到 `supports_1m`。  
  🔗 [PR #18365 – 允许 Claude Desktop 使用完整上下文](https://github.com/ollama/ollama/pull/18365)  
- **避免低比特量化的 `qwen2.5-coder` 模型**：q2_K/q3_K 系列模型功能失效（任务成功率为 0%）；请使用更高精度版本，直至 #18252 修复。  
- **监控内存泄漏**：若使用高吞吐量 API，建议定期重启 `ollama serve`，直到 #18344 合并。  
- **处理格式错误的工具调用**：使用复杂模式（如 `anthropic/v1/messages`）的工具可能输出原始文本而非结构化 `tool_use` 块——务必仔细验证输出。  
  🔗 [问题 #18346 – 复杂工具模式破坏解析](https://github.com/ollama/ollama/issues/18346)

> ✅ **实用技巧**：使用 `ollama show <model>` 和 `GET /api/tags` 验证 `tools`、`thinking` 与 `completion` 能力——不同端点间存在差异（例如 #16969）。

---  
*摘要生成时间：2026-09-11 | 来源：[github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM Digest — 2026-09-11**

#### **1. 今日亮点**  
LiteLLM 项目持续强化企业级基础设施，针对健康检查、成本追踪和会话管理等关键环节修复稳定性与可观测性问题。新提交的 PR 引入了对 Azure Document Intelligence 和 Reducto OCR 适配器的基础支持，同时正在进行的工作包括提升防护机制集成度以及通过边车（sidecar）卸载优化代理性能。

#### **2. 发布与破坏性变更**  
- 已发布 **v1.100.1** 与 **v1.101.0-rc.2**，使用 [cosign](https://docs.sigstore.dev/cosign/overview/) 验证的 Docker 镜像签名，采用与提交 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入相同的密钥。  
- 未报告破坏性 API 变更；重点仍聚焦于内部可靠性与安全加固。

#### **3. 新模型与硬件支持**  
- ✅ **Azure Document Intelligence**：通过 PR [#40534](https://github.com/BerriAI/litellm/pull/40534) 原生集成为 OCR 适配器，支持认证提交与有界轮询。  
- ✅ **Reducto v3 与旧版**：通过 PR [#40535](https://github.com/BerriAI/litellm/pull/40535) 集成，实现文档获取与处理。  
- ✅ **Azure Mistral**：通过 PR [#40533](https://github.com/BerriAI/litellm/pull/40533) 加入，包含内联文档处理与门面路由功能。  
- ✅ **Vertex AI Mistral**：通过 PR [#40507](https://github.com/BerriAI/litellm/pull/40507) 引入。  
- ✅ **ConductGuard**：通过 PR [#38143](https://github.com/BerriAI/litellm/pull/38143) 实现一级防护机制集成，支持调用前策略强制执行。

#### **4. 性能与优化**  
- **代理端成本追踪已卸载至 Pod 本地收集边车**（PR [#40545](https://github.com/BerriAI/litellm/pull/40545)）：通过解耦支出日志与推理工作线程事件循环，降低尾延迟。  
- **流式模拟响应现在在准入时输出用量数据块**（PR [#40637](https://github.com/BerriAI/litellm/pull/40637)）：避免流式后重复分词，每 5 万至 10 万 token 请求节省约 100–200 毫秒。  
- **Vertex AI Search 向量存储支持 HTTP/2**（PR [#40631](https://github.com/BerriAI/litellm/pull/40631)）：实现多数据存储并发搜索，无需连接队列开销。

#### **5. 稳定性与回归问题**  
- 🔴 **严重**：`后台健康检查将整个 LiteLLM_HealthCheckTable 加载到每个工作进程` → 大规模部署下存在内存溢出风险（问题 [#37611](https://github.com/BerriAI/litellm/issues/37611)）。修复待完成；目前影响多工作进程部署。  
- 🔴 **严重**：`Claude Code → vLLM 路径不稳定`，因流式传输损坏（`hosted_vllm`）及回退不完整（`anthropic`）（问题 [#30043](https://github.com/BerriAI/litellm/issues/30043)）。对生产用户为高优先级。  
- 🟡 **回归**：升级至 v1.88.0 后，`/metrics` 端点返回空数据（问题 [#30079](https://github.com/BerriAI/litellm/issues/30079)）——可能由 307 重定向错误路由导致。  
- 🟡 **缺陷**：复用 `x-litellm-call-id` 会静默丢弃支出日志行（问题 [#35563](https://github.com/BerriAI/litellm/issues/35563)）——影响成本审计完整性。  
- 🟡 **缺陷**：流式回退与非流式回退行为不一致（问题 [#25843](https://github.com/BerriAI/litellm/issues/25843)）——破坏故障转移逻辑。

#### **6. 对应用开发者的启示**  
- **若依赖 Prometheus 指标，请谨慎使用 v1.88.0+** —— 升级至 v1.100.1 或更高版本，并验证 `/metrics` 行为。  
- **在 #30043 修复前，避免使用 `Claude Code → vLLM` 路由路径** —— 可考虑切换至 `anthropic` 提供商或直接调用 API。  
- **充分利用新防护机制（ConductGuard）与 OCR 集成（Azure Doc AI、Reducto、Mistral）**，构建安全、多模态智能体，减少厂商锁定。  
- **通过 PR [#40545](https://github.com/BerriAI/litellm/pull/40545) 启用 Pod 本地支出追踪（可选）**，以在高吞吐环境中降低推理延迟。  
- **在集群部署中监控健康检查内存膨胀** —— 可禁用共享健康检查，或应用正在进行中的修复补丁。

> 💡 *实用提示：对所有 Docker 镜像使用 `cosign verify` 以确保供应链完整性。*  
> 🔗 [验证 Docker 镜像签名](https://docs.sigstore.dev/cosign/overview/) | [GitHub 问题](https://github.com/BerriAI/litellm/issues) | [Pull Requests](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-11**

---

### **1. 今日亮点**  
Unsloth 项目持续推进激进的优化工作，关键进展包括模型服务性能提升和 Studio 用户体验改进。重要修复解决了 GPU 兼容性问题（例如非 NVLink GPU 上的 `GGML_CUDA_P2P` 配置错误），新提交引入了视频模型的 NVFP4 量化支持以及逐层图像策略功能。核心重点仍在于降低启动延迟，并提升桌面与网页客户端的整体稳定性。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但多项破坏性变更正在推进中：
- **PR #10745**：重构 bitsandbytes 原生调用，改用实时 PyTorch 流 —— 可能影响依赖缓存流引用的自定义内核。
- **PR #10730 / #10731**：引入实验性的逐层 NVFP4 策略及 flashinfer 后端增强；除非通过 `UNSLOTH_SMART_OFFLOAD` 禁用，否则将改变图像扩散模型的加载与执行方式。

> 🔗 [PR #10745](https://github.com/unslothai/unsloth/pull/10745) | [PR #10730](https://github.com/unslothai/unsloth/pull/10730)

---

### **3. 新模型与硬件支持**  
- **视频模型的 NVFP4 支持**：通过托管预量化去噪器，为 *Wan2.2-TI2V-5B*、*Wan2.2-T2V-A14B* 与 *HunyuanVideo-1.5*（480p/720p）新增全模型 NVFP4 支持。将实时量化开销从 5–28 GB 的密集权重降至极低水平。  
- **MLX MoE 优化**：可选集成 MLX 的 MoE 门控/上融合与递归解码融合，显著提升苹果硅芯片上的推理效率。  
- **Windows 安装程序修复**：PR #10765 解决了用户配置文件含空格时的安装失败问题（关闭 #10722）。

> 🔗 [PR #10729](https://github.com/unslothai/unsloth/pull/10729) | [PR #10765](https://github.com/unslothai/unsloth/pull/10765) | [PR #10733](https://github.com/unslothai/unsloth/pull/10733)

---

### **4. 性能与优化**  
- **Qwen3.5-9B LoRA SFT 加速**：在 B200 上的实验训练显示，经过 8 次优化后，单步时间提速 **1.28x**（PR #10744）。包含内核级修复与内存布局调优。  
- **FlashInfer FP4 后端**：新增 `mm_fp4` 内核路径，加速图像 DiTs 中 NVFP4 线性层的执行。  
- **缓存效率提升**：PR #10647 与 #10659 提升共享 UV 缓存复用率，并防止 `studio update` 过程中冗余下载。  
- **模型加载时间缩短**：PR #10728 移除了代理启动期间的阻塞目录扫描，避免 30 秒超时问题。

> 🔗 [PR #10744](https://github.com/unslothai/unsloth/pull/10744) | [PR #10731](https://github.com/unslothai/unsloth/pull/10731) | [PR #10728](https://github.com/unslothai/unsloth/pull/10728)

---

### **5. 稳定性与回归问题**  
| 问题 | 严重程度 | 状态 | 修复 PR |
|------|----------|--------|--------|
| `GGML_CUDA_P2P=1` 在 RTX 6000 Ada（非 NVLink）上导致输出损坏 | 严重 | 开放 | ❌ 尚未解决 |
| 每次工具调用后需重新处理完整上下文（超 30k token） | 高 | 开放 | ❌ 尚无修复方案 |
| 长期 GGUF 聊天在重载后丢失提示状态（约 11 分钟预填充） | 高 | 开放 | ❌ 正在调查中 |
| Studio CLI 在 Windows 上报错：`stdout is not a terminal` | 中等 | 开放 | ❌ 仅临时解决方案：在 TTY 中运行 |
| 扩散模型生成后卸载，不释放显存 | 中等 | 开放 | ❌ 由 Reddit 用户报告 |

> 🔗 [Issue #10613](https://github.com/unslothai/unsloth/issues/10613) | [Issue #10698](https://github.com/unslothai/unsloth/issues/10698) | [Issue #9037](https://github.com/unslothai/unsloth/issues/9037) | [Issue #10699](https://github.com/unslothai/unsloth/issues/10699)

---

### **6. 对应用开发者的影响**  
- **预期视频与图像扩散模型推理速度提升**：使用 NVFP4 时，请启用 `UNSLOTH_SMART_OFFLOAD` 以激活自动量化路径。  
- **避免上下文膨胀**：由于缺乏滚动上下文窗口（参见 #7472），长时间对话可能引发 OOM 或过度重处理。请在支持压缩前于客户端实现截断逻辑。  
- **在多 GPU 系统上验证工作流**：错误配置的 `GGML_CUDA_P2P` 可能无声导致输出损坏 —— 生产环境务必验证环境变量设置。  
- **谨慎使用 Studio CLI on Windows**：避免将 stdout 重定向至脚本；建议使用交互式终端或调整 shell 配置。  
- **设计健壮的数据流水线**：#10738 与 #10739 等问题凸显数据集处理的脆弱性 —— 请尽早验证模式完整性。

> 📌 技巧提示：在启用高级量化功能前，务必在预发环境中监控 `UNSLOTH_SMART_OFFLOAD` 的行为。

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*