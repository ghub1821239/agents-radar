# AI 基础设施日报 2026-09-03

> 生成时间: 2026-09-03 00:36 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-03**

---

### **1. 生态概览**  
AI推理与服务生态正进入高度专业化与硬件融合的新阶段，各项目迅速扩展对混合架构（GDN/Mamba）、多模态模型以及下一代加速器（Grace/B200、Strix Halo、T-Head PPU）的支持。尽管vLLM和SGLang在高吞吐分布式推理领域领先，llama.cpp和Unsloth则在本地/边缘性能上占据主导，LiteLLM作为网关层的核心，日益聚焦于路由效率与安全性。一个清晰的趋势正在浮现：**多后端抽象**、**跨平台稳定性**与**代理级可靠性**——这由生产环境中对确定性、低延迟、可扩展的LLM工作流的需求所驱动。

---

### **2. 活动对比**

| 项目       | 问题（开放中） | PR（活跃中） | 发布状态                     |
|---------------|----------------|----------------|--------------------------------------|
| **vLLM**      | 147            | 89             | 稳定版：`v0.28.0`；无新发布   |
| **SGLang**    | 162            | 74             | 稳定版：`v0.5.18`；无新发布   |
| **llama.cpp** | 132            | 68             | 开发构建（`b10771`、`b10767`）     |
| **Ollama**    | 128            | 59             | 稳定版：未变更；无新发布  |
| **LiteLLM**   | 155            | 91             | 仅Docker版：`v1.99.1` / `v1.97.1`   |
| **Unsloth**   | 141            | 85             | 测试版：`v0.1.806-beta`（无破坏性变更） |

> ✅ **关键洞察**：SGLang与LiteLLM展现出最高的*PR/问题比*（约0.45），表明其集成速度极快。vLLM与Unsloth在缺陷修复与功能交付方面最为活跃，而Ollama与llama.cpp则更注重稳定性而非快速迭代。

---

### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **K2-Horizon**            | ✅   | ❌     | ❌        | ❌     | ❌      | ❌      |
| **DeepSeek-V4-Flash**   | ✅ (SM8x) | ❌     | ✅ (MTMD) | ❌     | ❌      | ✅ (MTP) |
| **Qwen4Exp / Qwen3.8-Flash-Next** | ✅ (ROCm FP8 PLE, MLA) | ✅ (FP8崩溃风险) | ✅ (直接PLE读取, MTP) | ✅ (BF16保留) | ❌ | ✅ (2倍提速) |
| **GraniteMoE**            | ❌     | ✅ (分权重加载) | ❌        | ❌     | ❌      | ❌      |
| **GLM-5.3-Flash**         | ✅ (稀疏GQA, DSA) | ✅ (CP禁用) | ✅ (超过262k token时崩溃) | ✅ (云环路) | ❌ | ✅ (MTP) |
| **Spark2_5**              | ❌     | 🟡 (已跟踪) | ✅ (GGUF转换) | 🟡 (已请求) | ❌ | ❌      |
| **T-Head PPU**            | ❌     | ✅ (路线图) | ❌        | ❌     | ❌      | ❌      |

> 🏆 **胜出者**：**Unsloth** 在 *实际模型加速* 方面领先，尤其通过MTP实现Qwen3.8-Flash-Next与GLM-5.3-Flash的显著提速。  
> 🥈 **亚军**：**vLLM** 在 *分布式多模态支持* 上占优，尤其在ROCm与ARM平台上表现突出。  
> 🥉 **新星**：**SGLang** 正在构建深度的MoE与上下文并行能力，有望成为未来代理级推理的领导者。

---

### **4. 性能前沿**

| 优化方向          | vLLM                     | SGLang                   | llama.cpp               | Ollama                 | LiteLLM                | Unsloth               |
|-----------------------------|--------------------------|--------------------------|--------------------------|------------------------|------------------------|------------------------|
| **KV缓存与缓存机制**     | 稀疏GQA，前缀复用 | HiCache + radix统一化 | 持久化磁盘缓存 | 预测性VRAM估算 | 同步Redis批处理   | 内存报告修复   |
| **批处理与并行** | 分布式解码，MLA  | 上下文并行（CP） | 动态分块         | —                      | 自动路由推理 | MTP（多张量）     |
| **量化**           | FP8 PLE（ROCm）           | FP8，MoE分加载    | Q6_K，BF16保留     | MXFP8                  | —                     | MTP（共享模块）   |
| **内核级速度**     | 行级瓦片拆分      | FastH3 VSA融合         | FA-vec，稀疏注意力 | —                      | Rust迁移（<1ms）| 2倍推理速度    |
| **分布式服务**    | Grace/B200上TP=4       | 多节点HiCache备份 | —                        | —                      | 代理安全与路由 | —                      |

> 🔥 **顶尖表现者**：  
> - **vLLM** 在 **分布式推理稳定性** 与 **内核级优化**（MLA，FP8 PLE）方面表现卓越。  
> - **Unsloth** 凭借MTP在 **本地推理吞吐量** 上遥遥领先。  
> - **SGLang** 正在引领 **分层缓存** 与 **上下文并行** 技术，专为代理类负载设计。

---

### **5. 层级定位**

| 项目       | 主要层级                  | 角色摘要 |
|---------------|-------------------------------|--------------|
| **vLLM**      | **服务引擎**            | 高性能、分布式推理引擎；适用于具备完整注意力与内核优化的云规模LLM服务。 |
| **SGLang**    | **服务引擎 + 代理运行时** | 混合模型支持，HiCache，CP，MoE；专为长上下文代理与结构化输出工作流设计。 |
| **llama.cpp** | **本地运行时 / 边缘推理** | 跨平台、轻量级推理引擎；适用于CPU/GPU/Apple Silicon边缘部署，支持细粒度控制。 |
| **Ollama**    | **本地运行时 + 开发者CLI** | 开发友好接口，集成MLX；优化用于多模态本地代理与实验场景。 |
| **LiteLLM**   | **网关 / 编排层** | 统一API代理，支持路由、成本控制与提供方抽象；对多LMM与代理编排至关重要。 |
| **Unsloth**   | **训练/微调 + 本地推理** | 全栈工具链：训练、微调与推理加速；在快速迭代与模型调优方面最强。 |

> 📌 **战略提示**：当前技术栈已形成清晰分层：**Unsloth**（训练/微调）→ **vLLM/SGLang**（高吞吐服务）→ **LiteLLM**（网关编排）→ **llama.cpp/Ollama**（边缘/本地执行）。

---

### **6. 趋势信号与开发者建议**

#### **从今日活动提炼的行业趋势**：
1. **硬件多样性加速演进**：各项目正积极支持T-Head PPU、Intel XPU、AMD Strix Halo与Grace/B200，标志着对NVIDIA垄断的突破。
2. **代理工作流要求更高稳定性**：工具解析严重崩溃（`SGLang`）、无限循环（`Ollama`）、流式数据损坏（`LiteLLM`）等问题凸显，*可靠性*已成为瓶颈，不再仅仅是延迟问题。
3. **多模型优化是核心竞争力**：MTP（Unsloth）、稀疏注意力（vLLM）、分层缓存（SGLang）反映出向**高效处理复杂混合模型**的范式转变。
4. **Rust迁移具有战略意义**：LiteLLM追求亚毫秒级开销，意味着对网关性能的根本性重构——未来的网关将面向微秒级精度打造。
5. **云与本地权衡日趋尖锐**：云模型（`glm-5.3:cloud`、`deepseek-v4-flash:0731`）出现严重退化，迫使开发者回退至本地推理或稳定开源版本。

#### **应用开发者可操作建议**：
- ✅ **避免在多节点环境下使用`v0.28.0`运行DeepSeek-V4-Pro**（vLLM）。
- ✅ **切勿在生产环境部署`glm-5.3:cloud`或`deepseek-v4-flash:0731`**（Ollama）——已知无限循环漏洞。
- ✅ **在llama.cpp中使用`--cache-disk`** 以支持长时间运行的代理与大上下文任务。
- ✅ **若使用pip安装LiteLLM，应固定版本至`1.99.0`/`1.97.0`** —— 避免`1.99.1`/`1.97.1`（仅支持Docker）。
- ✅ **默认启用Unsloth中的MTP**，用于Qwen3.8-Flash-Next与GLM-5.3-Flash——预计获得2倍性能提升。
- ✅ **监控各设备的VRAM使用情况**（通过Ollama `/api/ps` 接口），防止GPU资源超分配。

> 🔮 **长期信号**：未来属于**统一、可靠且硬件无关**的全栈体系——训练（Unsloth）、服务（vLLM/SGLang）、网关（LiteLLM）、边缘（llama.cpp）各层无缝协同，以**基于Rust的网关**与**支持MTP的推理**为发展主轴。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-03**

---

### **1. 今日亮点**  
vLLM 项目在多模态与混合模型支持方面持续保持快速进展，针对 ARM（Grace/B200）和 Intel XPU 平台的分布式推理稳定性问题已发布关键修复。重要进展包括新增支持 Qwen4Exp 在 ROCm 上的 FP8 PLE n-gram 功能，以及优化 Kimi-K3 MLA 解码延迟——这两项均对高吞吐量生产级服务至关重要。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本或破坏性变更。*  
最新稳定版本仍为 `v0.28.0`，当前工作重点集中在多个后端的缺陷修复与功能增强。

---

### **3. 新模型与硬件支持**  
- **模型支持**:  
  - ✅ 通过 PR [#53806](https://github.com/vllm-project/vllm/pull/53806) 新增对 **K2-Horizon** 模型架构的支持。  
  - ✅ 正在推进在 SM8x（Ampere: A100/A800, RTX 30xx）上启用 **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731** —— 相关进展跟踪于 Issue [#50576](https://github.com/vllm-project/vllm/issues/50576)，目前已达 102 条评论。
- **硬件与后端**:  
  - 🚀 **ROCm (gfx942/gfx950)**：针对 **Kimi-K3**、**Qwen4Exp** 和 **MiniMax-M3** 的开发活跃；相关 PR 包括支持 FP8 PLE ([#55040](https://github.com/vllm-project/vllm/pull/55040)) 与稀疏 GQA 优化 ([#52963](https://github.com/vllm-project/vllm/pull/52963))。  
  - 💻 **Intel XPU**：自定义 all-reduce 进展 ([#54766](https://github.com/vllm-project/vllm/issues/54766)) 与卸载连接器稳定性优化 ([#52735](https://github.com/vllm-project/vllm/issues/52735))，但性能仍落后于单卡水平约 61%。  
  - 🖥️ **aarch64/Grace (B200)**：针对引擎在空闲后停滞的问题已发布关键修复 ([#51921](https://github.com/vllm-project/vllm/issues/51921)) —— 此为大规模部署中的已知阻塞点。

---

### **4. 性能与优化**  
- 🔥 **Kimi-K3 MLA 解码延迟**：PR [#54896](https://github.com/vllm-project/vllm/pull/54896) 通过拆分每行的 warp 数并重新排序操作，降低融合解码 + 缓存插入内核延迟，直接提升全注意力层的 TPS。  
- ⚡ **Qwen4Exp 在 ROCm 上的 FP8 PLE**：PR [#55040](https://github.com/vllm-project/vllm/pull/55040) 实现运行时对 FP8 PLE n-gram 表的处理，消除此前 AMD 路径的限制。  
- 📈 **稀疏 GQA 预填充**：PR [#52963](https://github.com/vllm-project/vllm/pull/52963) 优化 MiniMax-M3 的加载模式，通过避免冗余块加载减轻内存带宽压力。  
- 🧠 **SM12x 上的 FlashInfer GDN 预填充**：PR [#50862](https://github.com/vllm-project/vllm/pull/50862) 在满足条件（如 `linear_key_head_dim == 128`）时启用 FlashInfer 后端，解锁新一代 GPU 上更快的预填充速度。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|-----------|
| 🔴 高 | [#51921](https://github.com/vllm-project/vllm/issues/51921) | v0.27.0 引擎在 4 节点 TP=4（GB10/aarch64）环境下空闲约 1 分钟后停滞，原因为 shm_broadcast 写入器饥饿 | ✅ **修复已合并** 于 PR [#54994](https://github.com/vllm-project/vllm/pull/54994) |
| 🔴 高 | [#53894](https://github.com/vllm-project/vllm/issues/53894) | v0.28.0 在 2×16 H100 节点上启动时因 DeepSeek-V4-Pro 崩溃挂起 | ❌ 尚无修复；自 v0.25.0 起引入的回归 |
| 🟡 中 | [#54317](https://github.com/vllm-project/vllm/issues/54317) | GLM-5.3-Flash（4xB200）跨多个内核出现 CUDA 非法内存访问 | ❌ 未解决；影响混合 Mamba/GDN 模型 |
| 🟡 中 | [#54094](https://github.com/vllm-project/vllm/issues/54094) | DFlash2 + YaRN 在提示完全相同（1.04M token）时无法重用前缀缓存 | ❌ 无修复；影响缓存效率 |

---

### **6. 对应用开发者的影响**  
- **多模态应用**：可期待更高可靠性，得益于 ViT 编码器支持（如 PR [#54994](https://github.com/vllm-project/vllm/pull/54994)），以及即将支持更多多模态模型的 LoRA（Issue [#31479](https://github.com/vllm-project/vllm/issues/31479)）。  
- **混合模型（GDN/Mamba）**：使用 `--block-size` 时需谨慎——近期问题（#53142, #53912）显示，若与状态列大小不匹配，前缀缓存恢复错误可能导致输出损坏。  
- **生产级推理**：在多节点环境下使用 DeepSeek-V4-Pro 时，请暂避 `v0.28.0`，直至 [#53894](https://github.com/vllm-project/vllm/issues/53894) 修复完成。建议维持 `v0.25.0` 以确保稳定性。  
- **ROCm 用户**：您已处于领先地位——FP8 PLE、MLA 优化及稀疏注意力支持正在积极集成中。请尽早测试 gfx942/gfx950 硬件。  
- **工具调用与结构化输出**：在 Gemma4 与 Qwen3.5 上仍不稳定（问题 [#39072](https://github.com/vllm-project/vllm/issues/39072), [#35700](https://github.com/vllm-project/vllm/issues/35700)）；生产环境中必须严格验证响应。

---  
*敬请关注：vLLM 2026 年第三季度路线图 (#48193) 显示将加大对冷启动优化与推测解码改进的投入。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-09-03**

---

### **1. 今日亮点**  
SGLang 生态系统在高性能推理基础设施方面持续推进，**上下文并行（CP）** 和 **HiCache 架构优化** 取得重大进展，同时对 MoE 和 Flash attention 模型的关键稳定性问题进行了修复。值得注意的是，新提交引入了 **GraniteMoE 权重加载支持**，且当前工作正致力于统一混合与分层缓存路径中的 radix cache 逻辑。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告。*  
未发布新版本或破坏性 API/配置变更。最新稳定版本仍为 `v0.5.18`，开发重点聚焦于功能集成与稳定性提升。

---

### **3. 新模型与硬件支持**  
- ✅ **GraniteMoE**：PR [#37679](https://github.com/sgl-project/sglang/pull/37679) 支持从压缩检查点（如 `llmcompressor` 格式）加载按专家拆分的量化 MoE 权重，实现大型 MoE 模型的高效部署。  
- ✅ **Intel XPU**：PR [#35304](https://github.com/sgl-project/sglang/pull/35304) 实现了五个嵌入模型在 XPU 上的推理支持：`bge-base-en-v1.5`、`nomic-embed-text-v1.5`、`granite-embedding-english-r2`、`InternVL3_5-30B-A3B` 与 `Hunyuan-A13B-Instruct`。  
- ✅ **T-Head PPU**：Issue [#37519](https://github.com/sgl-project/sglang/issues/37519) 正式跟踪对 T-Head ZW810/ZW810E/ZW-M890P 加速器的一等支持路线图，标志着生态扩展至 NVIDIA/AMD 之外。  
- ✅ **GLM-5.3-Flash**：PR [#36507](https://github.com/sgl-project/sglang/pull/36507) 添加初始模型支持；但因待完整 DSA+DCP 集成，解码 CP 已通过 [#37487](https://github.com/sgl-project/sglang/pull/37487) 临时禁用。

---

### **4. 性能与优化**  
- 🔧 **HiCache 与 Radix Cache 统一**：多个 PR ([#37278](https://github.com/sgl-project/sglang/pull/37278), [#36415](https://github.com/sgl-project/sglang/pull/36415)) 修复写通与标记处理中的内部一致性问题，提升了多节点 HiCache 备份场景下的可靠性。  
- 🚀 **FastH3 VSA 后端优化**：PR [#37662](https://github.com/sgl-project/sglang/pull/37662) 优化 FastH3 VSA 门融合及 qk-norm+RoPE 融合，使 1344×768 视频生成（带音频）在 24 fps 下实现 **4 倍 B300 吞吐量**。  
- ⚙️ **动态分块改进**：PRs [#37674](https://github.com/sgl-project/sglang/pull/37674) 与 [#37675](https://github.com/sgl-project/sglang/pull/37675) 重构 PP 动态分块性能分析逻辑，并改善失败传播机制，降低分布式预填充调度开销。  
- 💡 **JIT 与 CUDA Graph 优化**：PR [#37329](https://github.com/sgl-project/sglang/pull/37329) 通过保留自定义张量输出并减小解码状态体积，增强 CUDA Graph 捕获能力；PR [#37330](https://github.com/sgl-project/sglang/pull/37330) 将 CUDA VMM 发布移至专用流，降低分词器延迟。

---

### **5. 稳定性与回归问题**  
今日问题追踪器中，关键崩溃与正确性缺陷占据主导：

| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 🔴 高 | [#37633](https://github.com/sgl-project/sglang/issues/37633) | Qwen3.8-Flash-Next-FP8 在 H20 TP8 上运行约 22 个并发请求时崩溃，原因系 **QSA 预填充内核非法内存访问** | 开放 — 紧急 |
| 🔴 高 | [#36537](https://github.com/sgl-project/sglang/issues/36537) | Qwen3.8-Flash-Next 在思考模式下对 token ID 0 的工具解析陷入死循环 | 开放 — 影响代理工具调用 |
| 🔴 高 | [#37559](https://github.com/sgl-project/sglang/issues/37559) | B300（SM100）上因 `sgl-deep-gemm` 升级并启用 `--moe-a2a-backend megamoe` 后触发 `CUDA_ERROR_ILLEGAL_ADDRESS` 崩溃 | 开放 — 硬件相关 |
| 🔴 高 | [#36550](https://github.com/sgl-project/sglang/issues/36550) | GLM-5.3-Flash 工作进程在冷预填充 > 262k tokens 后首次解码时崩溃 | 已关闭 — 可能源于近期 DSA/Graph 变更的回归 |
| 🟡 中 | [#33397](https://github.com/sgl-project/sglang/issues/33397) | DeepSeek-V4 在高并发（DP attention）下出现渐进式输出损坏 | 开放 — 主分支中持续存在 |

> **注意**：多个回归问题与 **FP8、MoE 与上下文并行** 相关——这些正是当前重点优化领域。

---

### **6. 对应用开发者的意义**  
- **使用 FP8 与 MoE 模型需谨慎**（尤其是 Qwen3.8-Flash-Next 与 GraniteMoE）：尽管新支持已落地，但已知崩溃与解析问题可能影响依赖工具调用或长上下文推理的生产级代理。  
- **利用 HiCache 支持大规模 LLM 服务化**：统一 radix cache 重构及独立数据平面 RFC ([#37372](https://github.com/sgl-project/sglang/issues/37372)) 表明，低延迟、高吞吐部署即将迎来可扩展性提升。  
- **密切监控 CI 健康状态**：鉴于 [#17050](https://github.com/sgl-project/sglang/issues/17050) 报告 1 个失败 + 3 个不稳定测试，建议在高 CI 依赖流水线中部署时锁定已知良好提交。  
- **为硬件多样性做好准备**：随着 Intel XPU 与 T-Head PPU 支持进入路线图，部署灵活性将扩大——但请尽早测试非 NVIDIA 环境。

👉 *对于依赖可靠工具解析与流式输出的代理：在 [#36537](https://github.com/sgl-project/sglang/issues/36537) 修复前，请避免使用 `qwen3_coder` 与 `thinking-mode` 流量。*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 摘要 – 2026-09-03**

---

### **1. 今日亮点**  
最新开发周期聚焦于提升 DeepSeek-V4-Flash 与 Qwen 系列视觉模型的支持，关键优化包括 Apple Silicon（Metal）性能表现及内存管理。针对 Vulkan/ROCm 在低内存条件下的稳定性问题，以及 AMD Strix Halo 系统上 Flash Attention 的持续崩溃问题，均已修复。

---

### **2. 发布与破坏性变更**  
- **`b10771`**: 为 MTMD CLI 新增 `mtmd_tokenize_from_parts()`，实现更精细的分词控制；将 `add_special` 逻辑移至调用层级。[PR #28250](https://github.com/ggml-org/llama.cpp/pull/28250)  
- **`b10767`**: ROCm 升级至版本 10.0.0 发行版。[PR #27803](https://github.com/ggml-org/llama.cpp/pull/27803)  
- **`b10763`**: 服务器模式下默认启用 `preserve_reasoning`，并添加其实际状态的日志记录。[PR #28174](https://github.com/ggml-org/llama.cpp/pull/28174)

> 🔔 *注意：* 今日无破坏性 API 变更；所有更新均为功能增强或行为改进。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4-Flash-Vision-Exp** 现已通过 `mtmd` 完全支持。[PR #28133](https://github.com/ggml-org/llama.cpp/pull/28133)  
- ✅ **Qwen3-TTS-0.6B** 模型现可正确加载，并支持可选投影处理。[PR #28231](https://github.com/ggml-org/llama.cpp/pull/28231)  
- ✅ **Spark2_5** 模型架构新增：完成 GGUF 转换、分词器、张量映射及推理图构建。[PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868)  
- ✅ **Metal (M3/M4)**：对 FA-vec 内核进行调优，显著提升吞吐量。[PR #28236](https://github.com/ggml-org/llama.cpp/pull/28236)  
- ✅ **WebGPU**：新增反向内核支持——实现基于浏览器的微调实验。[PR #28269](https://github.com/ggml-org/llama.cpp/pull/28269)  
- ✅ **Hexagon** 后端现已在 `ops.md` 中完成文档说明。[PR #28263](https://github.com/ggml-org/llama.cpp/pull/28263)

---

### **4. 性能与优化**  
- 🚀 **Qwen3.8-Flash-Next**：对 PLE 表采用直接读取方式，在 GB10 (sm_121) 上使预填充速度提升超过 2 倍。[PR #28136](https://github.com/ggml-org/llama.cpp/pull/28136)  
- ⚙️ **MTP 优化**：为 Qwen3.8-Flash-Next 添加 MTP 支持，共享模块下实现 1.3–2 倍加速，同时降低显存占用。[PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243)  
- 💾 **稀疏 Flash Attention（Metal）**：初始实现已在 M2 Ultra 上展现良好收益（完整基准测试结果待定）。[PR #28098](https://github.com/ggml-org/llama.cpp/pull/28098)  
- 🔄 **IMatrix 并行化**：启用 OpenMP 的 `collect_imatrix()` 提升矩阵计算效率。[PR #28283](https://github.com/ggml-org/llama.cpp/pull/28283)  
- 📈 **内存效率**：`--cache-disk` 现支持持久化提示缓存，具备 LRU 淘汰机制与损坏恢复能力。[PRs #26408, #28092](https://github.com/ggml-org/llama.cpp/pull/26408)  

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 影响范围 | 修复 PR |
|--------|------|-------|--------|-------|
| 🔴 高 | **AMD Strix Halo (`gfx1151`) 上 Vulkan Flash Attention 在低内存环境下崩溃**。[Issue #25207](https://github.com/ggml-org/llama.cpp/issues/25207) | 已开放 | 全系统不稳定 | ❌ 尚未修复 |
| 🔴 高 | **Lunar Lake iGPU (Arc 140V) 上 SYCL 设备内存查询失败**。[Issue #28134](https://github.com/ggml-org/llama.cpp/issues/28134) | 已开放 | 模型加载失败 | ❌ 尚未修复 |
| 🔴 高 | **在 Qwen3.8-27B Q6_K 上进行 CUDA 推理时，RTX 5090 出现显示丢失与 GSP 重置**。[Issue #27910](https://github.com/ggml-org/llama.cpp/issues/27910) | 已开放 | 硬件级崩溃 | ❌ 尚未修复 |
| 🟡 中 | **GB10 (sm_121) 上 DeepSeek-V4-Flash 出现确定性输出损坏**，跨构建可复现。[Issue #28132](https://github.com/ggml-org/llama.cpp/issues/28132) | 已开放 | 模型正确性风险 | ❌ 尚未修复 |
| 🟡 中 | **模型加载阶段发生 Vulkan 崩溃**（AMD Strix Halo, RX 6900 XT）。[Issue #27189](https://github.com/ggml-org/llama.cpp/issues/27189) | 已开放 | 推理失败 | ❌ 尚未修复 |

> ⚠️ 多个高严重性回归问题影响 GPU 后端（Vulkan、ROCm、CUDA），表明新硬件与内核路径正处于持续压力测试中。

---

### **6. 对应用开发者的意义**  
- ✅ **视觉模型**如 DeepSeek-V4-Flash-Vision-Exp 与 Qwen3-TTS 现已可在 llama.cpp 中投入生产，支持丰富的多模态智能体。
- 🛠️ 使用 `--cache-disk` 将大上下文检查点卸载至磁盘——对长运行代理或多会话工作流至关重要。
- 📉 在解决 issue #27021（bitonic 内核溢出）前，请避免在 ROCm 上使用 `--ctx-size > 131072` 运行 DeepSeek-V4-Flash。
- 🧩 利用 **MTP 优化** 与 **稀疏注意力**，在 Apple Silicon 及未来 GPU 上实现更快、更低内存消耗的推理。
- 🔒 在 #27910 修复前，请勿在 RTX 5090 上部署 Qwen3.8-27B Q6_K —— 存在系统完全冻结风险。
- 🧪 对 WebGPU 应用：可通过 PR #28269 实验浏览器端微调（需上游合并）。

> 👉 **实用建议：** 若在 M3/M4 上使用 Metal，务必确保版本不低于 `b10770`，以获得最佳 FA-vec 性能与内存安全性。

---  
*来源：[llama.cpp GitHub](https://github.com/ggml-org/llama.cpp)*  
*摘要生成时间：2026-09-03*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-03**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展其 MLX 引擎功能，Gemma4 与 Qwen3.5 模型的视觉及音频输入关键修复现已合并至主分支。与此同时，性能监控改进工作正在推进，包括按设备报告 VRAM 使用情况以及预测性 GPU 内存估算——这些是实现多 GPU 系统上高效本地推理的关键支持能力。两个影响 `glm-5.3:cloud` 与 `deepseek-v4-flash:0731` 的高严重性云问题仍处于开放状态，表明代理工作流可能存在不稳定性。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
无新版本发布或破坏性配置变更。最新稳定版本保持不变。

---

### **3. 新模型与硬件支持**  
- ✅ **Gemma4 视觉与音频支持（MLX）**：PR [#17650](https://github.com/ollama/ollama/pull/17650) 与 [#18079](https://github.com/ollama/ollama/pull/18079) 为 `gemma4:12b-mlx` 添加完整的图像与音频输入支持，涵盖基于 Transformer 与无编码器的视觉架构。  
- ✅ **Qwen3.8 Flash 下一代内存效率（MLX）**：PR [#18078](https://github.com/ollama/ollama/pull/18078) 在关键投影中保留 BF16 格式，并在其他部分采用 MXFP8 量化，提升长文本生成稳定性的同时不牺牲速度。  
- 🟡 **Spark2_5 架构请求**：Issue [#18195](https://github.com/ollama/ollama/issues/18195) 请求原生支持使用 `spark2_5` 架构的 Spark-X2.5-4B 与 -1.7B 模型——目前因运行时识别缺陷而受阻。  
- 🟡 **GLM 5.3-Flash 云端模型**：Issue [#18190](https://github.com/ollama/ollama/issues/18190) 报告尽管处理仍在进行，却频繁出现“模型耗时过长”超时，暗示后端超时配置存在错误。

---

### **4. 性能与优化**  
- 🔧 **按设备报告 VRAM 使用情况**：PR [#18197](https://github.com/ollama/ollama/pull/18197) 在 `/api/ps` 中新增按设备细分的准确 VRAM 使用量统计，有助于在多 GPU 主机上更合理地分配资源。  
- 🔧 **单 GPU VRAM 预测性估算**：PR [#18198](https://github.com/ollama/ollama/pull/18198) 提出基于头部维度与历史负载模式估算所需 VRAM —— 对部署前规划至关重要。  
- 🔧 **离线模型差异对比工具**：PR [#18202](https://github.com/ollama/ollama/pull/18202) 引入独立的 `cmd/model diff` 工具，用于比较 safetensors、GGUF 与目录型模型——对审计模型完整性非常有用。  
- ⚠️ **高 CPU 使用率回归问题**：Issue [#18038](https://github.com/ollama/ollama/issues/18038) 报告在 Mac Studio M4 Max 上进行令牌生成时 CPU 使用率达约 560% —— 可能由近期 llama-cpp 更新引起；暂无修复方案。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 🔴 高 | [#18193](https://github.com/ollama/ollama/issues/18193) | `glm-5.3:cloud` 进入无限推理循环，在 OpenCode/ZCode 中中断任务 | ❌ 开放 |
| 🔴 高 | [#17892](https://github.com/ollama/ollama/issues/17892) | `deepseek-v4-flash:0731` 无限重复思考块（>200 次），无 `</think>` 输出 | ❌ 开放 |
| 🟡 中 | [#18194](https://github.com/ollama/ollama/issues/18194) | `gemma3:12b` 在输入包含双引号时截断结构化 JSON 输出 | ❌ 开放 |
| 🟡 中 | [#18038](https://github.com/ollama/ollama/issues/18038) | Llama-server 在 M4 Max 上生成过程中消耗过高 CPU（约 560%） | ❌ 开放 |
| 🟡 低 | [#18188](https://github.com/ollama/ollama/issues/18188) | “重启 Claude Desktop” 开关静默还原且无法写入配置 | ❌ 开放 |

> 注：多个回归问题与云端推理及代理特定行为相关，提示生产工作流存在风险。

---

### **6. 对应用开发者的启示**  
- **使用 MLX 构建多模态应用**：随着 Gemma4 与 Qwen3.5 通过 MLX 实现视觉/音频支持，开发者可安全地在本地构建具备图像感知能力的代理。  
- **避免使用已知循环的云端模型**：不要依赖 `glm-5.3:cloud` 或 `deepseek-v4-flash:0731` 执行长时间代理任务——预期会出现无限循环与提前终止。  
- **密切监控 VRAM 使用**：使用 `/api/ps` 加上即将推出的按设备指标，防止 GPU 超载，尤其是在多模型部署场景下。  
- **注意结构化输出边缘情况**：使用 `gemma3:12b` 配合 JSON Schema 时，应转义输入中的双引号，或考虑替换为其他模型。  
- **期待 CLI 体验优化**：通过 PR [#18205](https://github.com/ollama/ollama/pull/18205)，`ollama run <tab>` 的自动补全现已可用，显著提升开发效率。  

👉 *实用提示*：对于本地推理，现在推荐在支持的模型（如 Qwen3.5）上使用 `--num-parallel=2`，因为上游崩溃问题已解决（PR [#17144](https://github.com/ollama/ollama/pull/17144)）。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM Digest — 2026-09-03**

---

#### **1. 今日亮点**  
LiteLLM 持续推动高性能、生产就绪的 AI 推理栈发展，修复了流式传输可靠性、代理安全性和 Python 兼容性等关键问题。最重大的进展是正在进行的 **Rust 迁移计划**，目前正通过 Issue #31263 追踪——标志着向下一代网关实现亚毫秒级开销的战略转型。与此同时，多个紧急 PR 正在解决凭证处理、令牌泄露和模型路由正确性等高风险问题。

---

#### **2. 发布与破坏性变更**  
- **v1.99.1** 和 **v1.97.1** 为 **仅 Docker 发布版本**，PyPI 上无对应包。  
  → 执行 `pip install litellm==1.99.1` 或 `==1.97.1` 将失败。用户必须仅使用容器镜像。  
  🔗 [GitHub Release v1.99.1](https://github.com/BerriAI/litellm/releases/tag/v1.99.1) | [GitHub Release v1.97.1](https://github.com/BerriAI/litellm/releases/tag/v1.97.1)  
- 此类发布仅用于标记可追溯的容器镜像；如需 pip 安装，请继续使用 `1.99.0`/`1.97.0`。

---

#### **3. 新模型与硬件支持**  
- 通过 PR #31915（Vertex AI）新增对 **Gemini 3.1 Flash TTS** 的支持。  
  🔗 [PR #31915: feat(vertex-ai): support gemini 3.1 flash tts](https://github.com/BerriAI/litellm/pull/31915)  
- **OpenAPI YAML 规范支持**现已启用用于 MCP 提供商（PR #38951），显著提升集成灵活性。  
  🔗 [PR #38951: [bug, proxy] OpenAPI MCP cannot read YAML specs](https://github.com/BerriAI/litellm/pull/38951)

---

#### **4. 性能与优化**  
- **Rust 迁移计划** (#31263) 已启动，目标是实现亚 1 毫秒级开销——为低延迟推理网关奠定基础。  
  🔗 [Issue #31263: LiteLLM Rust Migration - the fastest and litest AI Gateway](https://github.com/BerriAI/litellm/issues/31263)  
- 通过阻塞客户端使用改进 **同步 Redis 缓存读取**（PR #39358），防止在路由冷却期间异步连接池损坏。  
  🔗 [PR #39358: fix(cache): use sync Redis batch reads](https://github.com/BerriAI/litellm/pull/39358)  
- 新增对 **自动路由推理开销** 的支持（PR #39372），实现对分类模型的细粒度成本控制。  
  🔗 [PR #39372: feat(auto-router): support classifier reasoning effort](https://github.com/BerriAI/litellm/pull/39372)

---

#### **5. 稳定性与回归问题**  
**高严重性**:  
- **Python 3.10 兼容性中断** — `litellm` 因导入 3.11 专属模块中的 `typing.NotRequired` 与 `assert_never` 而无法导入。  
  🔗 [Issue #38202: LiteLLM is not compat with Python 3.10](https://github.com/BerriAI/litellm/issues/38202)  
  ✅ 修复中：[PR #39448](https://github.com/BerriAI/litellm/pull/39448)（风险：高，阻断 CI/CD）

**中等严重性**:  
- **Ollama → Anthropic 桥接中的流式工具调用损坏**：索引错乱、多余 `finish_reason=stop`、缺失 `tool_use` 数据载荷。  
  🔗 [PR #39012: fix(ollama): reconstruct streaming tool calls...](https://github.com/BerriAI/litellm/pull/39012)  
- **Anthropic `/v1/messages` 流式请求间歇性出现约 16.7 秒的首字节时间（TTFB）** — 仅通过 LiteLLM 代理可复现，直接调用 Bedrock 不会出现。  
  🔗 [Issue #38689: Intermittent ~16.7s time-to-first-byte (TTFB)](https://github.com/BerriAI/litellm/issues/38689)  
- **ChatGPT/gpt-5.4 返回空输出 `[]`，尽管状态为 'completed'** — SSE 流已接收但载荷被丢弃。  
  🔗 [Issue #25429: chatgpt/gpt-5.4 returns empty final Responses output](https://github.com/BerriAI/litellm/issues/25429)

---

#### **6. 对应用开发者的影响**  
- **避免使用 `pip install litellm==1.99.1` 或 `1.97.1`** — 请改用 Docker 镜像。若需 pip 部署，请保持在 `1.99.0`/`1.97.0`。  
- **如使用 Python 3.10，立即升级** — 当前版本（`1.98.0` 至 `1.100.0-rc.1`）均存在故障。请等待 `#39448` 合并后更新。  
- **使用 gpt-5.4、ollama 及 Claude Code 集成时需谨慎** — 工具调用、流式传输及代理端工具执行存在已知缺陷。请关注相关 PR 获取修复。  
- **为未来基于 Rust 的 LiteLLM 做准备** — 未来版本预期将带来更低延迟与更高吞吐量。  
- **谨慎使用 `forward_traceparent_to_llm_provider: true`** — 目前会创建同级跨度而非子跨度（Issue #39067）。  

> 💡 **实用提示**：对于生产系统，建议锁定稳定版本（`1.97.0`、`1.99.0`），直至 Rust 迁移趋于稳定且所有 Python 版本的 CI/CD 流水线均通过。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-03**

---

### **1. 今日亮点**  
Unsloth 发布 v0.1.806-beta，通过 MTP（多张量打包）技术，使 Qwen3.8-Flash-Next 与 GLM-5.3-Flash 的推理速度最高提升 **2 倍**，现已默认启用。此次发布包含超过 170 项改进，涵盖训练、对话、硬件兼容性与性能优化。关键稳定性修复解决了 AMD Strix Halo (gfx1151) 的 GPU 检测问题及 ROCm 运行时崩溃，同时对 UI 进行了优化，提升了模型加载体验与内存报告准确性。

---

### **2. 发布与破坏性变更**  
- **v0.1.806-beta** (GitHub: [unslothai/unsloth#3526](https://github.com/unslothai/unsloth/issues/3526))  
  - MTP 默认启用 —— 如需禁用，请设置 `UNSLOTH_MTP=0`。  
  - 本地服务器与云环境中的模型加载更加流畅。  
  - 包含 170+ 个错误修复、性能补丁及用户体验优化。  
  - *未报告任何破坏性 API 变更。*  

---

### **3. 新模型与硬件支持**  
- **AMD Strix Halo (Radeon 8060S, gfx1151)**：此前因预编译版本段错误导致部分功能中断，现已恢复；但捆绑的 `rocm-gfx1151` 运行时已知存在崩溃问题。建议用户使用系统级 ROCm。  
  - 问题：[#6276](https://github.com/unslothai/unsloth/issues/6276) | PR：[#10200](https://github.com/unslothai/unsloth/pull/10200)（韩文搜索修复）。  
- **Windows 上的 ROCm**：已知 `libhsa-runtime64.so.1.21.0` 存在段错误，不稳定；临时解决方案：使用系统 ROCm。  
  - 问题：[#3526](https://github.com/unslothai/unsloth/issues/3526) | PR：[#7102](https://github.com/unslothai/unsloth/pull/7102)（禁用 Windows ROCm torchao 导出）。  
- **Apple Silicon (M4 Mac)**：使用 MLx 模型进行深度研究时出现 HTTP 400 错误；根本原因仍在调查中。  
  - 问题：[#10215](https://github.com/unslothai/unsloth/issues/10215)  

---

### **4. 性能与优化**  
- **推理速度提升 2 倍**：启用 MTP 后，Qwen3.8-Flash-Next 与 GLM-5.3-Flash 的推理速度最高可达之前的两倍。  
  - MTP 已设为默认选项；可通过环境变量禁用。  
  - PR：[PR #10217](https://github.com/unslothai/unsloth/pull/10217)（音频模型自动加载支持）。  
- **内存报告修复**：在 Apple Silicon 设备上，可用 GPU 内存现在准确反映实际可用的 RAM（此前存在高估问题）。  
  - PR：[PR #10224](https://github.com/unslothai/unsloth/pull/10224)  
- **深度研究优化**：运行规模现基于实际使用的模型（而非本地回退），提升准确性与资源规划效率。  
  - PR：[PR #10220](https://github.com/unslothai/unsloth/pull/10220)  

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 状态 | PR/链接 |
|--------|------|------|------|--------|
| ⚠️ 高 | [#7449](https://github.com/unslothai/unsloth/issues/7449) | Unsloth Studio 在可见使用 GPU 时仍使用系统内存而非显存。 | 开放 | 尚无修复方案 |
| ⚠️ 高 | [#7371](https://github.com/unslothai/unsloth/issues/7371) | Strix Halo + ROCm 在 `b10079` 版本更新后出现性能下降。 | 开放 | 正在调查中 |
| ⚠️ 高 | [#6276](https://github.com/unslothai/unsloth/issues/6276) | `rocm-gfx1151` 预编译版本在裸金属 Strix Halo 上发生段错误。 | 开放 | 建议使用系统 ROCm 作为临时方案 |
| ⚠️ 中 | [#7485](https://github.com/unslothai/unsloth/issues/7485) | 最新 llama.cpp 构建版本导致 AMD GPU 检测失败。 | 开放 | 尚无修复方案 |
| ✅ 低 | [#10173](https://github.com/unslothai/unsloth/issues/10173) | 非英文版 Windows：`nvidia-smi` 解码失败 → 安装程序退出码为 2 | 已关闭 | 最近补丁已修复 |

---

### **6. 对应用开发者的意义**  
- **默认启用 MTP**：对于受支持的模型（Qwen3.8-Flash-Next、GLM-5.3-Flash），可直接获得 2 倍加速，无需额外配置。  
- **避免在 AMD Strix Halo 上使用捆绑的 ROCm**：建议改用系统级 ROCm 以防止崩溃；未来版本可能解决该问题。  
- **谨慎处理模型自动加载**：通过 API 加载模型时，自定义设置（如上下文长度、KV 缓存量化）将被忽略；请使用 `保存设置` 按钮（PR #10216）持久化配置。  
- **小心使用音频模型**：音频支持仍属实验阶段 —— 请通过 PR #10217 启用动态加载功能。  
- **关注内存报告**：在 M4 Mac 上，可用内存现已准确显示；请勿依赖过时的估算值。  
- **本地部署场景**：在可信局域网环境中，可考虑禁用认证（`UNSLOTH_STUDIO_NO_AUTH`），以提升便利性（功能请求：#5031）。

> 🔗 [查看完整 GitHub 仓库](https://github.com/unslothai/unsloth) | [最新发布说明](https://github.com/unslothai/unsloth/releases/tag/v0.1.806-beta)

</details>

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*