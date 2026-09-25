# AI 基础设施日报 2026-09-25

> 生成时间: 2026-09-25 00:46 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-25**

---

### **1. 生态概览**  
2026年第三季度，AI推理基础设施领域呈现出明显的两极分化：**高性能、生产级服务引擎**（vLLM、SGLang）与**集成式本地运行时平台**（Ollama、llama.cpp、Unsloth）之间形成鲜明对比。前者在分布式优化和推测解码成熟度上领先，后者则在边缘部署和开发者优先场景中占据主导地位。随着**AMD ROCm 10**、**RTX 50系列（sm120）** 和 **Ryzen AI NPU** 的推出，对异构硬件抽象的需求日益增长。与此同时，LiteLLM 凭借增强的可观测性和成本治理能力，已确立为企业的事实标准网关层，这对受监管、多租户环境至关重要。

---

### **2. 活跃度对比**

| 项目       | 开放问题（高/严重） | 最近24小时合并的PR | 发布状态     |
|------------|---------------------|--------------------|--------------|
| **vLLM**   | 15（4个高，3个严重） | 8                  | 无（稳定v0.29.0+） |
| **SGLang** | 17（5个高，2个严重） | 6                  | 无（仅配置更新） |
| **llama.cpp** | 12（4个高，3个严重） | 6                  | `ggml v0.25.3`（补丁） |
| **Ollama** | 13（4个高，1个严重） | 5                  | 无（弃用警告） |
| **LiteLLM** | 11（4个高，4个严重） | 4                  | 无（行为变更） |
| **Unsloth** | 11（2个严重，3个高） | 5                  | 无（集成工作） |

> ✅ *vLLM 在工程迭代速度和稳定性方面领先；LiteLLM 因金融合规风险导致严重问题密度最高。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next** | ✅（TP调优） | ⚠️（路线图） | ❌ | ✅（实验性） | ✅（定价支持） | ✅（GGUF支持） |
| **DeepSeek-V4.1-Flash** | ✅（PP + 推测解码） | ✅（解码图） | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash** | ⚠️（退化问题） | ⚠️（DFlash回归） | ❌ | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1（扩散模型）** | ❌ | ✅（TP=1修复） | ❌ | ❌ | ✅（图像编辑） | ✅（FP8/INT8 GGUF） |
| **Granite 4.1/4.2** | ❌ | ❌ | ❌ | ✅（mlxrunner） | ❌ | ❌ |
| **Ryzen AI NPU（XDNA 2）** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅（Lemonade + FastFlowLM） |
| **AMD ROCm 10** | ❌ | ❌ | ❌ | ✅（文档） | ❌ | ✅（跟踪） |

> 🏆 **胜者：Unsloth** — 在新型硬件与模型格式支持方面领先（NPU、GGUF、视觉模型）。  
> 🥈 **亚军：vLLM** — 大型MoE模型与流水线并行支持最佳。  
> 🥉 **第三名：Ollama** — 社区驱动的模型集成最强（如Granite、MLX运行器）。

---

### **4. 性能前沿**

| 优化重点           | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存与预填充** | ✅✅（Mamba2、去重、FP8） | ⚠️（稀疏MLA、DFlash布局问题） | 🔴（长上下文静默挂起） | ⚠️（内存估算过高） | ✅（cached_tokens精度） | ✅（VAE编译预算） |
| **批处理与并行**   | ✅✅（PP + 推测解码） | ✅（DCP/Helix默认） | ❌（无TP支持） | ❌（nvfp4卡顿） | ✅（降级路由） | ✅（多引擎） |
| **量化与精度**     | ✅（INT8 KV、sm120 FP8） | ⚠️（MoE精度漂移） | ✅（AVX-512 VNNI、k-quants） | ❌（MLX内存泄漏） | ✅（成本感知标签） | ✅（自动精度、NVFP4） |
| **内核与硬件调优** | ✅✅（sm120、gfx950、DeepGEMM） | ⚠️（Triton延迟、ROCm FlyDSL） | ✅（Metal、Vulkan FA） | ❌（Blackwell检测） | ❌ | ✅（flashinfer、ccache并行化） |

> 🔥 **表现最佳者**：vLLM（分布式内核）、Unsloth（NVFP4/NPU）、llama.cpp（CPU/GPU融合）。  
> 🛑 **关键短板**：SGLang的DFlash草稿验证、Ollama的内存估算、llama.cpp的推测解码偏差。

---

### **5. 层级定位**

| 项目       | 主要层级               | 核心差异点 |
|------------|------------------------|------------|
| **vLLM**   | **推理引擎**            | 高吞吐、可扩展的LLM服务行业标准，支持流水线并行与推测解码 |
| **SGLang** | **推理引擎**            | 专注于解码上下文并行（DCP）、混合MLA及大规模推测解码 |
| **llama.cpp** | **本地运行时 / SDK**    | CPU/GPU/边缘优先；适用于离线推理、量化控制与底层内核调优 |
| **Ollama** | **本地运行时 / CLI平台** | 开发者友好体验、模型仓库、MLX集成；适合原型开发与代理工具构建 |
| **LiteLLM** | **LLM网关 / 代理层**    | 企业级路由、成本控制、审计追踪与多供应商编排 |
| **Unsloth** | **集成代理平台**        | 集成UI、微调与引擎插件（vLLM/SGLang）；面向全栈本地代理开发 |

> 💡 *这反映出明确趋势：引擎（vLLM/SGLang）正演变为模块化后端，而平台（Ollama、Unsloth）则提供端到端的代理体验。*

---

### **6. 趋势信号**

#### **新兴行业趋势（基于2026-09-25活跃度）：**
1. **硬件异构性已成为主流**  
   - AMD ROCm 10、Ryzen AI NPU、RTX 50系列（sm120）、Hexagon NPU 均已获得积极支持或跟踪。  
   - 开发者必须采用**硬件无关的部署策略**。

2. **推测解码仍不稳定**  
   - 多个项目报告存在**解码偏差、静默数据损坏和布局验证失败**（尤其在量化与混合模型中）。  
   - **在问题修复前，切勿在生产环境中使用推测解码**。

3. **成本与合规不可妥协**  
   - LiteLLM的关键预算强制绕过事件凸显了在受监管环境中需要**防篡改的支出日志**。  
   - 未来的代理系统从第一天起就必须具备**可审计的遥测能力**。

4. **模型格式正在碎片化**  
   - GGUF（Unsloth）、.safetensors（Ollama）、.bin（vLLM）、FlyDSL（SGLang）、Ternary-Bonsai（llama.cpp）——每种格式均有独特的性能与兼容性特征。  
   - **工具链可移植性正成为日益严峻的挑战**。

5. **代理系统需具备韧性**  
   - 长时间运行会退化（GLM-5.3-Flash），内存泄漏持续累积（Ollama/MLX），状态可能丢失（LiteLLM加密亲和性）。  
   - **检查点、会话隔离与资源监控如今已成为必备要素**。

#### **对应用开发者的可操作建议：**
- ✅ **高吞吐分布式推理使用vLLM或SGLang** —— 但避免在量化模型上启用推测解码。
- ✅ **本地代理开发优先选择Unsloth或Ollama** —— 尤其是目标为AMD/Ryzen AI或Apple Silicon的场景。
- ✅ **在受监管或计费敏感系统部署前，验证LiteLLM的成本追踪功能**。
- ✅ **监控内存使用与GPU可见性** —— Ollama与llama.cpp的回归可能导致静默降级。
- ✅ **为硬件多样性做好准备** —— 不同后端（ROCm、CUDA、NPU）将呈现不同性能表现。

> 📌 **总结**：生态正在快速成熟——但可靠性仍依赖于**平台特定加固**、**量化意识**与**可观测性优先设计**。选型应基于**部署约束**，而非仅追求峰值速度。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-25**

---

### **1. 今日亮点**  
vLLM 项目持续推动下一代大模型服务的激进优化，重点进展包括支持流水线并行模型的推测解码，以及对 ROCm/Metal 后端的深度调优。针对 Mamba2 前缀缓存损坏和混合 Mamba/GDN 模型中 KV 数据传输稳定性的问题，关键修复已合并；同时，新提交的 PR 正在推进 RTX 5090/Blackwell（sm120）内核覆盖与 FP8 量化鲁棒性提升。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
未发布新版本，也无破坏性 API/配置变更。项目仍聚焦于 v0.29.0+ 发布前的稳定性强化。

---

### **3. 新模型与硬件支持**  
- ✅ **流水线并行 + 推测解码**：DSpark 现已支持在流水线并行目标上进行聚合服务（`#56956`, `#56957`）——对跨多 GPU 扩展 DeepSeek-V4-Flash 等大型 MoE 模型至关重要。  
- ✅ **ROCm / AMD GPU 优化**：正在针对 gfx950 / MI355X 对 `Qwen3.8-2.4T-A95B` 进行性能调优（`#57149`），并增强 AITER MoE 调度测试（`#58393`）。  
- ✅ **SM 12.x（RTX 50 系列）内核覆盖**：针对 `sm120` 设备优化 `DeepGEMM` 和批量不变矩阵乘法表（`#58495`, `#41063`）。  
- ✅ **量化**：正在进行 INT8 KV 缓存量化支持（`#33480`）的工作，并修复 sm120 上 FP8 块缩放权重问题（`#51884`）。

---

### **4. 性能与优化**  
- 🔥 **Mamba2 预填充优化**：通过批量预填充处理移除 SSM 状态保存中的 GPU-CPU 同步（`#49371`），显著降低长上下文 Mamba 推理延迟。  
- 🔥 **ROCm 内存减少**：在瘦型 GEMM 路径中每解码步骤减少 69 次不必要的连续拷贝（`#58566`），直接提升 AMD GPU 吞吐量。  
- 🔥 **批量不变矩阵乘法调优**：将 `sm120` 的 TP=2/4/8 配置扩展至避免降级内核（`#58495`），实现多 GPU Blackwell 系统的完全利用率。  
- 🔥 **KV 传输效率**：在 `DecodeBenchConnector` 中去重 KV 填充操作（`#57884`），并对稀疏 MLA 块步长对齐（`#55528`），减少冗余内存操作。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 摘要 | 修复状态 |
|--------|------|------|----------|
| ⚠️ 高 | [#57562](https://github.com/vllm-project/vllm/issues/57562) | `AsyncScheduler num_output_placeholders` 在分块预填充 + 并发场景下发生下溢（自 v0.24.0 起的回归） | 开放 |
| ⚠️ 高 | [#55506](https://github.com/vllm-project/vllm/issues/55506) | MTP + PP + 前缀缓存导致约 33% 请求退化为令牌循环（如 `ductductduct...`） | 开放 |
| ⚠️ 高 | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash 在累积推理步骤后出现长解码退化 | 开放 |
| ⚠️ 中 | [#56389](https://github.com/vllm-project/vllm/issues/56389) | H20 上高并发下 `dsv4_topk` Triton 内核非法内存访问 | 通过 `max_num_seqs=256` 临时缓解 |
| ⚠️ 中 | [#52109](https://github.com/vllm-project/vllm/issues/52109) | ROCm/gfx942 上 DeepSeek-V4-Flash ≥4k token 时静默检索损坏 | 可复现；已应用回滚补丁 |

---

### **6. 对应用开发者的启示**  
- **构建健壮的智能体**：在 H20 上使用 `DeepSeek-V4.1-Flash` 时，除非 #56389 修复，否则请避免设置 `max_num_seqs > 256`。  
- **利用推测解码**：随着 DSpark 现已支持流水线并行目标，可跨多个阶段扩展高吞吐推测解码流水线。  
- **使用稳定工具解析**：启用解析器缓存（`#57571`），以在重试过程中保持工具调用 ID 一致——这对确定性智能体工作流至关重要。  
- **监控长时间会话**：对于 `GLM-5.3-Flash` 及其他具有推理链的模型，长期生成后可能出现输出退化；建议考虑检查点或提前终止策略。  
- **为未来部署做好准备**：从现在起开始为 `sm120`（RTX 50 系列）做准备，测试时启用 `VLLM_BATCH_INVARIANT=1`，并关注 `#58495` 对吞吐量的影响。

> 📌 **推荐操作**：审查 [PR #58495](https://github.com/vllm-project/vllm/pull/58495) 了解 sm120 调优细节，若部署含 MTP 与前缀缓存的 Mamba2 模型，请关注 [Issue #55506](https://github.com/vllm-project/vllm/issues/55506)。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-09-25**

---

### **1. 今日重点**  
SGLang 项目在核心推理基础设施方面持续进展，**解码上下文并行（DCP）** 和 **Helix 并行** 已稳定为所有模型的默认 `--dcp-comm-backend`。正在进行大规模重构，以统一 MoE 路由 GEMM 逻辑，并优化 DeepSeek-V4.1 的解码图处理；同时新增对 **AMD ROCm FlyDSL GDN 预填充后端** 的支持，扩展了硬件覆盖范围。针对推测性解码和 KV 缓存管理的关键性缺陷已被报告，凸显出当前稳定性工作的紧迫性。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未发布新版本。但以下配置变更正在被积极采纳：
- `fi_a2a` / `a2a` 现已成为所有模型的默认 `--dcp-comm-backend` (#39165, #37767)。
- 通过 PR #41188，`--enable-mis` 标志现已支持因果语言模型（CausalLM）的集合评分。
- 在使用统一注意力路径时，若在 AMD ROCm 上进行批处理生成，必须启用 `SGLANG_USE_AITER_UNIFIED_ATTN=1`。

> 🔗 [PR #41188](https://github.com/sgl-project/sglang/pull/41188) | [PR #39165](https://github.com/sgl-project/sglang/pull/39165)

---

### **3. 新模型与硬件支持**  
- **AMD ROCm**：为 Qwen3.5-397B（gfx950）添加实验性 **FlyDSL GDN 预填充后端**，相比基线预填充吞吐提升 1.4–1.5 倍。  
- **DeepSeek-V4.1**：正在进行内核优化与布局修复，以提升高上下文长度下的解码效率。  
- **Qwen3.8-Flash-Next**：路线图追踪内核优化、CPU 开销降低及 MTP 调优工作 (#38731)。  
- **扩散模型**：在块扩散服务与图像生成保真度方面持续改进（例如，Qwen-Image-2.1 TP=2 的数据损坏问题待修复）。

> 🔗 [PR #39595](https://github.com/sgl-project/sglang/pull/39595) | [Issue #38731](https://github.com/sgl-project/sglang/issues/38731) | [Issue #41192](https://github.com/sgl-project/sglang/issues/41192)

---

### **4. 性能与优化**  
- **DeepSeek-V4 dsv4 预填充性能** 仍不理想（在 4× RTX PRO 6000 SM120 上约 2–7K tok/s），远低于 vLLM/Marlin 的 ~12.5K；正寻求调优建议 (#33422)。  
- **Triton 后端**：填充解码的 CUDA 图槽位在长上下文下延迟逐渐增加（bs=5 时，30K → 35.9 ms/token）(#41151)。  
- **MoE 路由 GEMM 统一**（PR #38695）旨在减少精度漂移，提升路由层间的一致性。  
- **Hybrid-MLA DFlash 草稿传输** 在 GLM-5.3-Flash 上的非对称 P/D TP 场景下失败——属于关键路径回归问题 (#41038)。  
- **HiCache**：现强制保留完整 MTP KV 及循环状态，以避免草稿头恢复异常的问题 (#40223)。

> 🔗 [Issue #33422](https://github.com/sgl-project/sglang/issues/33422) | [PR #38695](https://github.com/sgl-project/sglang/pull/38695) | [PR #40223](https://github.com/sgl-project/sglang/pull/40223)

---

### **5. 稳定性与回归问题**  
今日最高严重性问题如下：
1. **严重**：`DFLASH` 草稿布局假设成立但未验证——静默的锚点优先检查点偏移导致输出错误 (#40144)。  
2. **严重**：LMCache 会话中断时因 `cache_finished_req` 关联的不当终止导致资源泄漏 (#40360)。  
3. **高**：Qwen3.8 聊天模板在 Anthropic `/v1/messages` 接口下失效——前一轮思考内容被拼接到内容中，导致 `</think>` 作为可见文本输出 (#40959)。  
4. **高**：Gemma 2/3 在 ROCm 上启用 `aiter 统一注意力` 时批量生成失控，因不支持滑动窗口层 (#41152)。  
5. **中等**：Qwen-Image-2.1 TP=2 输出出现色度斑点噪声；TP=1 时正常 (#41192)。

> 🔗 [Issue #40144](https://github.com/sgl-project/sglang/issues/40144) | [Issue #40360](https://github.com/sgl-project/sglang/issues/40360) | [Issue #40959](https://github.com/sgl-project/sglang/issues/40959) | [Issue #41152](https://github.com/sgl-project/sglang/issues/41152) | [Issue #41192](https://github.com/sgl-project/sglang/issues/41192)

---

### **6. 对应用开发者的启示**  
- **使用 `--dcp-comm-backend fi_a2a`** 以获得更稳定的 DCP/Helix 并行表现——它已是默认值。  
- **在 #41192 修复前，避免对 Qwen-Image-2.1 等扩散模型使用 `--tp-size 2`**；生产环境请坚持使用 TP=1。  
- **在因果语言模型任务中启用 `--enable-mis`** 以支持高级集合评分功能（通过 #41188）。  
- **关注 `DFLASH` 草稿的推测性解码问题**：确保检查点兼容性，并手动验证布局。  
- **对于 AMD 用户**，仅在避免滑动窗口注意力时使用 `SGLANG_USE_AITER_UNIFIED_ATTN=1`；否则可能引发崩溃。  
- **尽早实现请求日志保留策略**：`--log-requests` 可能迅速占满磁盘空间 (#41129)。

> 🔗 [Issue #41129](https://github.com/sgl-project/sglang/issues/41129) | [PR #41188](https://github.com/sgl-project/sglang/pull/41188)

---  
*本简报基于 GitHub 数据生成（2026-09-25 UTC)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-25**

---

### **1. 今日重点**  
最新更新聚焦于 Apple Metal 与 Vulkan 后端的关键稳定性修复，尤其针对图捕获及稀疏 Flash Attention 性能问题。在推测解码正确性（特别是量化模型方面）以及 CUDA、Metal 和 Hexagon 平台的 GPU 内核优化上也取得了显著进展。

---

### **2. 发布与破坏性变更**  
- **`ggml v0.25.2` → `v0.25.3`**：小版本升级以修复 `ggml_graph_nbytes` 中的 UBSAN 错误 ([#29396](https://github.com/ggml-org/llama.cpp/pull/29396))。预计无破坏性变更。  
- **Metal 图捕获修复**：空图现在会提前返回，不再触发命令缓冲区捕获，提升了可靠性 ([#29390](https://github.com/ggml-org/llama.cpp/pull/29390))。

> 📌 *今日未报告任何 API 破坏性变更。*

---

### **3. 新模型与硬件支持**  
- **Hexagon NPU**：新增对 Hexagon 后端的 Windows Arm64 CI 构建支持 ([#29052](https://github.com/ggml-org/llama.cpp/pull/29052))，为未来在高通 AI 芯片上的部署铺路。  
- **Intel Vulkan FA 内核**：新增面向 Intel GPU 的预填充 Flash Attention 内核 ([#29357](https://github.com/ggml-org/llama.cpp/pull/29357))，在支持平台上显著提升性能。  
- **模型格式支持**：正在审查的 PR 将增加对 Ternary-Bonsai 的 PQ2_0（类型 142）和 PTQ1_0（类型 143）量化格式的支持 ([#29058](https://github.com/ggml-org/llama.cpp/pull/29058))。

---

### **4. 性能与优化**  
- **Metal 稀疏 FA 优化**：将稀疏注意力索引移入共享内存，降低延迟并提升带宽利用率 ([#29377](https://github.com/ggml-org/llama.cpp/pull/29377))。在 `DeepSeek-V4-Flash-Vision-Exp` 上以 70k 上下文进行基准测试。  
- **CUDA 融合内核**：合并 `RMS_NORM + SCALE` 为单个内核，修复了此前 PR 引入的约 4% 预填充性能退化问题 ([#29393](https://github.com/ggml-org/llama.cpp/pull/29393))。  
- **CPU GEMM 优化**：  
  - 为使用 `vpdpbusd` 指令的 Q4_K 重排 GEMM 增加了 AVX-512 VNNI+VBMI 路径 ([#29397](https://github.com/ggml-org/llama.cpp/pull/29397))。  
  - 对 k-量化采用分块矩阵乘法配合 VNNI，使 CPU 性能提升 3–7 倍 ([#27851](https://github.com/ggml-org/llama.cpp/pull/27851))。  
- **Vulkan**：当绑定不变时复用描述符集，减少驱动开销 ([#29280](https://github.com/ggml-org/llama.cpp/pull/29280))。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | PR / 修复 |
|--------|------|--------|---------|
| 🔴 高 | 在贪婪采样下，量化目标（`Q4_K_M`）出现推测解码偏差 | 开放，已确认 | [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) |
| 🔴 高 | Qwen3.8-27B 在 CUDA 上 >80K 上下文解码吞吐量崩溃 | 开放，可复现 | [#27623](https://github.com/ggml-org/llama.cpp/issues/27623) |
| 🔴 高 | VictoriaMetrics 抓取 `/metrics` 时服务器无声挂起 | 开放 | [#29104](https://github.com/ggml-org/llama.cpp/issues/29104) |
| 🟡 中 | CUDA 稀疏 FA 解码在 b11047 后变慢 1.6 倍 | 已关闭 | [#29281](https://github.com/ggml-org/llama.cpp/issues/29281) |
| 🟡 中 | Unified-KV 限制导致使用 `-np 2` 时提示处理下降 | 开放 | [#28495](https://github.com/ggml-org/llama.cpp/issues/28495) |

> ⚠️ 推测解码、KV 缓存处理及多 GPU 设置中仍存在多个高严重性正确性问题——尤其在 AMD ROCm 与 Vulkan 平台上。

---

### **6. 对应用开发者的启示**  
- **若部署 4 位 KV 缓存，请默认启用 `GGML_CUDA_FA_ALL_QUANTS=ON`**；否则可能遭遇无声的 CPU 回退，导致性能下降高达 30 倍 ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633))。  
- **在 [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) 修复前，避免对量化模型使用推测解码**；结果可能与基线产生偏差。  
- **在 CUDA 上使用 Qwen3.8 系列时，注意长上下文（>80K）的不稳定性**——建议降低 `n_ctx` 或禁用推测。  
- **充分利用新内核**：在支持场景下，使用 Intel Vulkan FA 内核以获得更好的预填充性能，并开启 AVX-512 VNNI 路径以加速 CPU 推理。  
- **密切监控服务健康状态**——`/metrics` 抓取可能导致无声挂起；生产环境中建议限速或禁用指标收集。

> 💡 *对于需要一致性的代理/应用：在推测解码问题修复前，优先选择 bf16 目标而非量化模型。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-25**

---

### **1. 今日亮点**  
Ollama 生态系统持续成熟，MLX 后端在稳定性与模型兼容性方面取得重点进展，尤其针对 MoE（专家混合）和 Qwen3 系列模型。然而，近期报告了影响 Apple M 系列及 NVIDIA Blackwell 硬件上内存估算与 GPU 检测的严重回归问题，凸显底层推理引擎集成仍面临挑战。与此同时，多项新 PR 正在推进对 Granite 模型、System 1 AI 框架的支持，以及 CLI/终端集成的优化。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本或破坏性变更。*  
但 **PR #18627**（`api: deprecate typical_p`）引入了对 `typical_p` 的软弃用，将原本的硬报错改为警告日志输出——依赖该参数的开发者应提前准备未来移除。[PR #18627](https://github.com/ollama/ollama/pull/18627)

---

### **3. 新模型与硬件支持**  
- ✅ **GraniteForCausalLM**：通过 `mlxrunner` 添加对 IBM Granite 4.1 与 4.2 模型的实验性支持。[PR #17972](https://github.com/ollama/ollama/pull/17972)  
- ✅ **System 1 模型**：社区提出对 Kev 与 Laya 模型的支持请求。[Issue #18594](https://github.com/ollama/ollama/issues/18594)  
- ✅ **AMD ROCm on Windows**：文档中扩展了支持的 GPU 列表，新增 gfx1150、gfx1151、gfx1200 与 gfx1201（Radeon RX 7000 Pro 系列）。[PR #18623](https://github.com/ollama/ollama/pull/18623)  
- ✅ **MLX Runner 增强**：修复 Nemotron 层命名问题、全局缩放支持，以及 MoE 专家加载（如 `gemma-4-26B-A4B-it-qat-4bit`）。[PR #18631](https://github.com/ollama/ollama/pull/18631)，[PR #18614](https://github.com/ollama/ollama/pull/18614)

---

### **4. 性能与优化**  
- 📉 **内存估算回归**：v0.31.2 版本中存在严重回归，导致 `gemma4:31b` 内存使用量虚高约 1.2 GiB，生成速度从 33.8 → 4.7 tok/s，严重影响显存受限设备上的高上下文工作流。[Issue #17099](https://github.com/ollama/ollama/issues/17099)  
- 🔥 **MLX 内存泄漏**：在 `qwen3.6:27b-mlx` 上每次工具调用会泄漏约 0.43 GiB 内存，超出前缀缓存预算，长期负载下累积明显。[Issue #18620](https://github.com/ollama/ollama/issues/18620)  
- ⏳ **nvfp4 预填充停滞**：在单槽负载下（`OLLAMA_NUM_PARALLEL=1`），请求在预填充阶段停滞且无任何 token 进度，需发送 SIGTERM 才能恢复。[Issue #18505](https://github.com/ollama/ollama/issues/18505)  
- 🚀 **Web 搜索限制提升**：响应与 Anthropic 兼容模型的每响应 Web 搜索上限已从 3 提升至 10。[PR #18602](https://github.com/ollama/ollama/pull/18602)

---

### **5. 稳定性与回归**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|-------|-------------|------------|
| 高 | [Issue #18505](https://github.com/ollama/ollama/issues/18505) | MLX `nvfp4` 在持续负载下预填充阶段停滞；无进度推进，需发送 SIGTERM 恢复 | 尚无修复 PR |
| 高 | [Issue #18581](https://github.com/ollama/ollama/issues/18581) | Windows CUDA 无法检测 NVIDIA Blackwell（RTX 50 系列）GPU —— 显示为 0 B VRAM，自动降级至 CPU | 尚无修复 PR |
| 高 | [Issue #17099](https://github.com/ollama/ollama/issues/17099) | v0.31.2 中内存估算膨胀导致 `gemma4:31b` 出现 7 倍性能下降 | 尚无修复 PR |
| 中 | [Issue #18620](https://github.com/ollama/ollama/issues/18620) | MLX runner 在工具调用中存在持续内存泄漏（约 0.43 GiB/请求） | 尚无修复 PR |
| 低 | [Issue #18632](https://github.com/ollama/ollama/issues/18632) | `think: "high"` / `"max"` 无声默认为 `medium` 而非 `xhigh` | 尚无修复 PR |
| 低 | [Issue #18368](https://github.com/ollama/ollama/issues/18368) | macOS GUI 在聊天处理超过 60 秒后静默失败 | 尚无修复 PR |

---

### **6. 对应用开发者的启示**  
- 若使用 `gemma4:31b` 并搭配大上下文窗口，请避免使用 v0.31.2 及以上版本——此版本因内存过度估算引发严重性能退化。建议锁定至 v0.31.1 直至问题解决。  
- 在构建带工具调用的智能体时，需密切监控 MLX 内存使用情况；`qwen3.6:27b-mlx` 存在持续内存泄漏，长期运行可能导致内存耗尽崩溃。  
- 新硬件可能存在不稳定性：NVIDIA Blackwell（Windows）与 Apple M 系列（macOS）用户可能遭遇静默降级至 CPU 或推理卡死——请在部署流程中验证 GPU 可见性。  
- 更新工具链集成以应对提升后的网页搜索限制（现每响应最高达 10 次），并为即将到来的 `typical_p` 参数弃用做好准备。  
- 可考虑采用社区集成方案，如 Termalime ([PR #18630](https://github.com/ollama/ollama/pull/18630)) 或 AGNT ([PR #18618](https://github.com/ollama/ollama/pull/18618))，以增强本地智能体的用户体验。

---  
*本摘要由 GitHub 活动整理（2026-09-25）。*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-09-25**

---

### **1. 今日重点**  
LiteLLM 项目持续强化企业级可观测性与成本控制能力，针对预算执行、流式遥测及审计日志完整性等关键问题进行了修复。今日重点的 PR 主要提升支出日志准确性——特别是缓存令牌和流式响应的计费精度——并优化代理层速率限制与标签策略。这些更新对受监管部署及多租户推理网关至关重要。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
然而，通过多个 PR 引入了若干**非破坏性但影响显著的配置与行为变更**：  
- `max_daily_tag_spend_retention_period` 现在支持清理历史标签支出数据 (#39221)。  
- 邮件告警可按团队成员预算阈值（如 80%、90%）配置——此前仅支持 API Key (#42665)。  
- `service_tier` 现在在流式分块间保持一致，并写入支出日志，提升账单精确度 (#43070)。  
👉 [PR #43070](https://github.com/BerriAI/litellm/pull/43070)，[PR #42665](https://github.com/BerriAI/litellm/pull/42665)

---

### **3. 新模型与硬件支持**  
- **Sail** 已正式作为 OpenAI 兼容服务商加入，支持完整窗口层级定价。可通过标准 `/chat/completions`、流式接口及 Responses API 路由至 Sail 的 12 个模型。  
  👉 [PR #42840](https://github.com/BerriAI/litellm/pull/42840)  
- **Fireworks AI** 现已为 `deepseek-v4p1-flash-us`（含短键与路由键形式）添加显式成本映射条目，与美国定价对齐。  
  👉 [PR #43097](https://github.com/BerriAI/litellm/pull/43097)  
- **Azure AI FLUX.2-flex** 图像编辑现在按每张参考图 1 兆像素计费，与 Azure 实际定价模型一致。  
  👉 [PR #43094](https://github.com/BerriAI/litellm/pull/43094)

---

### **4. 性能与优化**  
- **流式效率提升**：`service_tier` 字段现可在所有流式响应分块中保留，确保成本归属准确，降低误计费风险。  
  👉 [PR #43070](https://github.com/BerriAI/litellm/pull/43070)  
- **成本精度增强**：修复确保 `cached_tokens` 在流式使用中被正确计入，防止以全输入费率重复计费。  
  👉 [PR #39088](https://github.com/BerriAI/litellm/pull/39088)，[PR #43056](https://github.com/BerriAI/litellm/pull/43056)  
- **路由优化**：新增 `order_fallback_status_codes` 策略，支持基于细粒度 HTTP 状态码的模型组回退逻辑。  
  👉 [PR #43095](https://github.com/BerriAI/litellm/pull/43095)

---

### **5. 稳定性与回归问题**  
**报告的关键问题（按严重性排序）：**  
1. **预算执行绕过**（v1.82.3）：当支出超过限额时，`max_budget` 检查对密钥和用户预算均被忽略。  
   🔴 *修复 PR 待提交* —— 影响财务合规与成本治理。  
   👉 [问题 #26672](https://github.com/BerriAI/litellm/issues/26672)  

2. **虚拟密钥缓存后 RPM 限制失效**：一旦虚拟密钥被缓存，客户级 RPM 限制即不再生效。  
   🔴 *严重影响速率限制一致性*。  
   👉 [问题 #39713](https://github.com/BerriAI/litellm/issues/39713)  

3. **零成本模型预算阻塞**：即使设置了 `skip_budget_checks`，内部用户仍无法调用零成本模型。  
   🔴 *影响内部工具与调试流程*。  
   👉 [问题 #29912](https://github.com/BerriAI/litellm/issues/29912)  

4. **加密内容亲和性中断**：若固定部署失败或被移除，对话状态将永久丢失。  
   🔴 *可能导致多轮对话完全失效*。  
   👉 [问题 #43000](https://github.com/BerriAI/litellm/issues/43000)  

> ✅ *注：其中多项问题已有待提交的修复 PR（如 #43056、#43075），表明正在积极应对。*

---

### **6. 对应用开发者的意义**  
- **审计与合规就绪**：通过增强的支出日志（`metadata.used_anthropic_oauth_token`、`service_tier` 保留），你的 LLM 调用日志现具备防篡改痕迹，满足欧盟《人工智能法案》第 12 条要求。  
- **成本准确性现已至关重要**：请确保使用 `v1.99+` 版本，避免依赖 `max_budget` 而不验证其有效性——旧版本中的漏洞可能导致无声漏收。  
- **流式负载更可靠**：对 `usage.prompt_tokens_details` 与 `cached_tokens` 的修复意味着，在流式过程中不会再因缓存提示而超额付费。  
- **路由逻辑更灵活**：使用 `order_fallback_status_codes` 可定义超出 5xx 错误之外的自定义故障条件——非常适合构建高韧性智能体系统。  
- **避免遗留配置**：仪表板界面仍存在未解决的缺陷（如 `user_header_name` 无法创建客户），建议手动验证终端用户追踪逻辑，直至修复。

➡️ **可操作建议**：检查代理配置中是否存在 `budget_duration=null` + 过期 `budget_reset_at` 组合——此组合可能无声地将支出归零且永久有效。  
👉 [问题 #39370](https://github.com/BerriAI/litellm/issues/39370)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-25**

---

### **1. 今日亮点**  
Unsloth 持续快速拓展多引擎推理与跨架构支持，vLLM/SGLang 集成及 AMD ROCm 10 准备工作取得重大进展。关键修复解决了 AMD iGPU 上的 GPU 内存误报问题，以及影响 Windows 平台 AMD 用户的 `torch._grouped_mm` 高严重性崩溃问题。项目现已开始构建模型配置扫描的基准测试，并引入用于图像扩散的 NVFP4 优化。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无更新。*  
但持续工作中包括：  
- **PR #11874**：优化 Studio 的扩散编译缓存机制，避免热启动时重复写入并限制磁盘使用。  
- **PR #11872**：消除 API 请求期间冗余的模型文件夹重新扫描，提升高负载下的响应速度。  
- **PR #11831**：修复自动精度行为错误，即即使 BF16 可容纳也仍不必要地加载 INT8 DiTs —— 提升精度且无性能损失。  

> 🔗 [PR #11874](https://github.com/unslothai/unsloth/pull/11874) | [PR #11872](https://github.com/unslothai/unsloth/pull/11872) | [PR #11831](https://github.com/unslothai/unsloth/pull/11831)

---

### **3. 新模型与硬件支持**  
- ✅ **vLLM 与 SGLang 集成 (PR #11491)**：通过外部引擎提供可选的多 GPU 推理、视觉模型和量化支持。默认不安装；支持在云与边缘灵活部署。  
- ✅ **AMD Ryzen AI NPU (PR #11743)**：通过 Lemonade + FastFlowLM 实验性支持 XDNA 2 NPUs 上的聊天功能。运行模型私有副本；启用前不会下载。  
- ✅ **ROCm 10 就绪 (Issue #9932)**：正在追踪 ROCm 10 的实现与版本选择器，上游发布现已可用。  
- ✅ **Qwen-Image-2.1 GGUF 支持 (多个 PR)**：完整流水线改进，包括 FP8/INT8 处理、模型分片逻辑及精度对齐（`#11835`, `#11829`）。  

> 🔗 [PR #11491](https://github.com/unslothai/unsloth/pull/11491) | [PR #11743](https://github.com/unslothai/unsloth/pull/11743) | [Issue #9932](https://github.com/unslothai/unsloth/issues/9932) | [PR #11835](https://github.com/unslothai/unsloth/pull/11835)

---

### **4. 性能与优化**  
- ⚡ **NVFP4 FlashInfer 后端 (PR #10730, #10731, #11730)**：引入逐层 NVFP4 策略及基于 flashinfer 的内核，加速图像生成。按需安装避免回退至较慢的 torchao 路径。  
- ⚡ **VAE 编译优化 (PR #10889)**：根据实测时间预算编译 VAE 解码步骤，在测试中将渲染延迟降低最高约 15%。  
- ⚡ **FlashAttention 预编译 Wheel 并行化 (PR #11812)**：将 `flash-attn` wheel 构建拆分至并行 ccache 任务，将 CI 时间从约 8 小时缩短至不足 2 小时 —— 对加快发布至关重要。  
- 📈 **基准测试页面 (PR #11808)**：为配置扫描基准测试奠定基础：推测解码、KV 缓存类型、内存卸载、上下文长度调优等。  

> 🔗 [PR #10730](https://github.com/unslothai/unsloth/pull/10730) | [PR #10889](https://github.com/unslothai/unsloth/pull/10889) | [PR #11812](https://github.com/unslothai/unsloth/pull/11812) | [PR #11808](https://github.com/unslothai/unsloth/pull/11808)

---

### **5. 稳定性与回归问题**  
- **严重级**：在搭载 gfx103X/gfx110X/gfx908/gfx90a 显卡的 Windows AMD 主机上，`torch._grouped_mm` 访问违规导致崩溃（Issue #11814）。受影响的虚拟环境仍需锁定在 `torch 2.10.0+rocm7.13.0`。  
  > 🔗 [Issue #11814](https://github.com/unslothai/unsloth/issues/11814) — *修复待完成；临时方案：强制升级 PyTorch 至 2.11.0+rocm7.14.1。*  
- **高严重性**：因模型分片至不受支持的 iGPU 导致 GGUF 导出期间出现无效内核文件错误（Issue #11870）。  
  > 🔗 [Issue #11870](https://github.com/unslothai/unsloth/issues/11870) — *需修复：确保导出过程尊重实际 GPU 可用性。*  
- **中等**：Qwen-Image-2.1 在最后一步后挂起，因未报告的 VAE 解码调优问题（Issue #11636）。  
  > 🔗 [Issue #11636](https://github.com/unslothai/unsloth/issues/11636) — *可能已在 PR #11835（Hadamard 旋转）中解决。*  
- **UI/UX**：最大化窗口时底部条带点击穿透失效（Issue #11734）。  
  > 🔗 [Issue #11734](https://github.com/unslothai/unsloth/issues/11734)

---

### **6. 对应用开发者的意义**  
- **多引擎灵活性**：借助 vLLM/SGLang 集成，开发者现在可接入高吞吐、生产级推理后端，同时保留 Unsloth 的 UI/代理层。适用于可扩展的智能体系统。  
- **硬件多样性**：AMD ROCm 10 与 Ryzen AI NPU 支持使部署覆盖多样硬件——包括 RDNA1 GPU 与嵌入式 NPU——几乎无需代码变更。  
- **精度控制**：新增的 NVFP4 与自动精度功能允许在速度与保真度之间精细权衡，尤其对图像生成流水线至关重要。  
- **稳定性提醒**：避免在 AMD 上使用旧版 PyTorch 构建（如 `2.10.0+rocm7.13.0`）——会触发崩溃。请确保环境使用 `2.11.0+rocm7.14.1` 或更高版本。  
- **未来兼容性**：新基准测试页面将帮助调优模型以获得最佳吞吐量——预计后续版本将支持推测解码、KV 缓存与卸载策略的可配置设置。

> 💡 **可操作建议**：若在 AMD GPU 上部署，请验证 PyTorch 版本兼容性，并考虑启用 vLLM 以支持大规模推理。使用 `--model` 路径检查时需谨慎，避免误导性的“切换”警告。

---  
*数据来源：[unslothai/unsloth GitHub repo](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*