# AI Infrastructure Digest 2026-09-03

> Generated: 2026-09-03 00:36 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-03**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of intense specialization and hardware convergence, with projects rapidly expanding support for hybrid architectures (GDN/Mamba), multi-modal models, and next-gen accelerators (Grace/B200, Strix Halo, T-Head PPU). While vLLM and SGLang lead in high-throughput distributed inference, llama.cpp and Unsloth dominate local/edge performance, and LiteLLM anchors the gateway layer with growing focus on routing efficiency and security. A clear trend toward **multi-backend abstraction**, **cross-platform stability**, and **agent-grade reliability** is emerging—driven by production demands for deterministic, low-latency, and scalable LLM workflows.

---

### **2. Activity Comparison**

| Project       | Issues (Open) | PRs (Active) | Release Status                     |
|---------------|----------------|----------------|--------------------------------------|
| **vLLM**      | 147            | 89             | Stable: `v0.28.0`; no new releases   |
| **SGLang**    | 162            | 74             | Stable: `v0.5.18`; no new releases   |
| **llama.cpp** | 132            | 68             | Dev builds (`b10771`, `b10767`)     |
| **Ollama**    | 128            | 59             | Stable: unchanged; no new releases  |
| **LiteLLM**   | 155            | 91             | Docker-only: `v1.99.1` / `v1.97.1`   |
| **Unsloth**   | 141            | 85             | Beta: `v0.1.806-beta` (no breaking changes) |

> ✅ **Key Insight**: SGLang and LiteLLM show the highest *PR-to-issue* ratio (~0.45), indicating strong integration velocity. vLLM and Unsloth are most active in bug fixes and feature delivery, while Ollama and llama.cpp prioritize stability over rapid change.

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **K2-Horizon**            | ✅   | ❌     | ❌        | ❌     | ❌      | ❌      |
| **DeepSeek-V4-Flash**   | ✅ (SM8x) | ❌     | ✅ (MTMD) | ❌     | ❌      | ✅ (MTP) |
| **Qwen4Exp / Qwen3.8-Flash-Next** | ✅ (ROCm FP8 PLE, MLA) | ✅ (FP8 crash risk) | ✅ (Direct PLE read, MTP) | ✅ (BF16 retention) | ❌ | ✅ (2x speedup) |
| **GraniteMoE**            | ❌     | ✅ (split-weight load) | ❌        | ❌     | ❌      | ❌      |
| **GLM-5.3-Flash**         | ✅ (sparse GQA, DSA) | ✅ (CP disabled) | ✅ (crash at >262k tokens) | ✅ (cloud loop) | ❌ | ✅ (MTP) |
| **Spark2_5**              | ❌     | 🟡 (tracked) | ✅ (GGUF conversion) | 🟡 (requested) | ❌ | ❌      |
| **T-Head PPU**            | ❌     | ✅ (roadmap) | ❌        | ❌     | ❌      | ❌      |

> 🏆 **Winner**: **Unsloth** leads in *practical model acceleration*, especially for Qwen3.8-Flash-Next and GLM-5.3-Flash via MTP.  
> 🥈 **Runner-up**: **vLLM** dominates in *distributed multi-modal support*, particularly for ROCm and ARM.  
> 🥉 **Emerging**: **SGLang** is building deep MoE and context parallelism capabilities, positioning itself as a future leader in agent-scale inference.

---

### **4. Performance Frontier**

| Optimization Focus          | vLLM                     | SGLang                   | llama.cpp               | Ollama                 | LiteLLM                | Unsloth               |
|-----------------------------|--------------------------|--------------------------|--------------------------|------------------------|------------------------|------------------------|
| **KV Cache & Caching**     | Sparse GQA, prefix reuse | HiCache + radix unification | Persistent disk cache | Predictive VRAM estimate | Sync Redis batching   | Memory reporting fix   |
| **Batching & Parallelism** | Distributed decode, MLA  | Context Parallelism (CP) | Dynamic chunking         | —                      | Auto-router reasoning | MTP (multi-tensor)     |
| **Quantization**           | FP8 PLE (ROCm)           | FP8, MoE split loading    | Q6_K, BF16 retention     | MXFP8                  | —                     | MTP (shared modules)   |
| **Kernel-Level Speed**     | Warps-per-row split      | FastH3 VSA fusion         | FA-vec, sparse attention | —                      | Rust migration (sub-1ms)| 2x faster inference    |
| **Distributed Serving**    | TP=4 on Grace/B200       | Multi-node HiCache backup | —                        | —                      | Proxy security, routing | —                      |

> 🔥 **Top Performers**:  
> - **vLLM** excels in **distributed inference stability** and **kernel-level optimizations** (MLA, FP8 PLE).  
> - **Unsloth** leads in **local inference throughput** via MTP.  
> - **SGLang** is pioneering **hierarchical caching** and **context parallelism** for agent workloads.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Role Summary |
|---------------|-------------------------------|--------------|
| **vLLM**      | **Serving Engine**            | High-performance, distributed inference engine; ideal for cloud-scale LLM serving with full attention and kernel optimizations. |
| **SGLang**    | **Serving Engine + Agent Runtime** | Hybrid model support, HiCache, CP, and MoE; designed for long-context agents and structured output workflows. |
| **llama.cpp** | **Local Runtime / Edge Inference** | Cross-platform, lightweight inference engine; best for CPU/GPU/Apple Silicon edge deployment with fine-grained control. |
| **Ollama**    | **Local Runtime + Developer CLI** | Developer-friendly interface with MLX integration; optimized for multimodal local agents and experimentation. |
| **LiteLLM**   | **Gateway / Orchestration Layer** | Unified API proxy with routing, cost control, and provider abstraction; critical for multi-LMM and agent orchestration. |
| **Unsloth**   | **Training/Fine-Tuning + Local Inference** | Full-stack toolchain: training, fine-tuning, and inference acceleration; strongest for rapid iteration and model tuning. |

> 📌 **Strategic Note**: The stack is now layered: **Unsloth** (training/tuning) → **vLLM/SGLang** (high-throughput serving) → **LiteLLM** (gateway orchestration) → **llama.cpp/Ollama** (edge/local execution).

---

### **6. Trend Signals & Developer Guidance**

#### **Industry Trends Extracted from Today’s Activity**:
1. **Hardware Diversity is Accelerating**: Projects are actively supporting T-Head PPU, Intel XPU, AMD Strix Halo, and Grace/B200 — signaling a move beyond NVIDIA dominance.
2. **Agent Workflows Demand Stability**: High-severity crashes in tool parsing (`SGLang`), infinite loops (`Ollama`), and streaming corruption (`LiteLLM`) highlight that *reliability* is now a bottleneck, not just latency.
3. **Multi-Model Optimization is Key**: MTP (Unsloth), sparse attention (vLLM), and hierarchical caching (SGLang) reflect a shift toward **efficient handling of complex, hybrid models**.
4. **Rust Migration is Strategic**: LiteLLM’s sub-1ms overhead goal indicates a fundamental rethinking of gateway performance — future gateways will be built for microsecond precision.
5. **Cloud vs. Local Trade-offs Are Sharpening**: Cloud models (`glm-5.3:cloud`, `deepseek-v4-flash:0731`) have severe regressions, pushing developers back to local inference or stable open-source variants.

#### **Actionable Advice for Application Developers**:
- ✅ **Avoid `v0.28.0`** with DeepSeek-V4-Pro on multi-node setups (vLLM).
- ✅ **Do not deploy `glm-5.3:cloud` or `deepseek-v4-flash:0731`** in production (Ollama) — known infinite loop bugs.
- ✅ **Use `--cache-disk` in llama.cpp** for long-running agents and large contexts.
- ✅ **Pin LiteLLM to `1.99.0`/`1.97.0`** if using pip — avoid `1.99.1`/`1.97.1` (Docker-only).
- ✅ **Leverage MTP in Unsloth** by default for Qwen3.8-Flash-Next and GLM-5.3-Flash — expect 2x speedup.
- ✅ **Monitor per-device VRAM usage** (Ollama `/api/ps`) to prevent GPU overcommitment.

> 🔮 **Long-term Signal**: The future belongs to **unified, reliable, and hardware-agnostic stacks** where training (Unsloth), serving (vLLM/SGLang), gateway (LiteLLM), and edge (llama.cpp) layers interoperate seamlessly — with **Rust-based gateways** and **MTP-enabled inference** setting the pace.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-03**

---

### **1. Today's Highlights**  
The vLLM project continues rapid momentum in multi-modal and hybrid model support, with critical fixes for distributed inference stability on ARM (Grace/B200) and Intel XPU platforms. Key progress includes new PRs enabling FP8 PLE n-gram support on ROCm for Qwen4Exp and optimizing Kimi-K3 MLA decode latency—both crucial for high-throughput production serving.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the past 24 hours.*  
The latest stable version remains `v0.28.0`, with ongoing work focused on bug fixes and feature enhancements across multiple backends.

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - ✅ Added support for **K2-Horizon** model architecture via PR [#53806](https://github.com/vllm-project/vllm/pull/53806).  
  - ✅ Ongoing efforts to enable **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731** on SM8x (Ampere: A100/A800, RTX 30xx) — tracked in Issue [#50576](https://github.com/vllm-project/vllm/issues/50576), now at 102 comments.
- **Hardware & Backend**:  
  - 🚀 **ROCm (gfx942/gfx950)**: Active development for **Kimi-K3**, **Qwen4Exp**, and **MiniMax-M3**; PRs include FP8 PLE support ([#55040](https://github.com/vllm-project/vllm/pull/55040)) and sparse GQA optimization ([#52963](https://github.com/vllm-project/vllm/pull/52963)).  
  - 💻 **Intel XPU**: Progress on custom all-reduce ([#54766](https://github.com/vllm-project/vllm/issues/54766)) and offloading connector stability ([#52735](https://github.com/vllm-project/vllm/issues/52735)), though performance still lags (~61% of single-card throughput).
  - 🖥️ **aarch64/Grace (B200)**: Critical fix landed for engine stalling after idle ([#51921](https://github.com/vllm-project/vllm/issues/51921)) — a known blocker for large-scale deployments.

---

### **4. Performance & Optimization**  
- 🔥 **Kimi-K3 MLA Decode Latency**: PR [#54896](https://github.com/vllm-project/vllm/pull/54896) reduces fused decode + cache insert kernel latency by splitting warps-per-row and reordering operations — directly improving TPS on full-attention layers.  
- ⚡ **Qwen4Exp FP8 PLE on ROCm**: PR [#55040](https://github.com/vllm-project/vllm/pull/55040) enables runtime handling of FP8 PLE n-gram tables, eliminating prior AMD path limitations.  
- 📈 **Sparse GQA Prefill**: PR [#52963](https://github.com/vllm-project/vllm/pull/52963) optimizes loading patterns for MiniMax-M3, reducing memory bandwidth pressure by avoiding redundant block loads.  
- 🧠 **FlashInfer GDN Prefill on SM12x**: PR [#50862](https://github.com/vllm-project/vllm/pull/50862) enables FlashInfer backend for SM12x when conditions are met (e.g., `linear_key_head_dim == 128`), unlocking faster prefill on newer GPUs.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| 🔴 High | [#51921](https://github.com/vllm-project/vllm/issues/51921) | v0.27.0 engine stalls after ~1 min idle on 4-node TP=4 (GB10/aarch64), due to shm_broadcast writer starvation | ✅ **Fix merged** in PR [#54994](https://github.com/vllm-project/vllm/pull/54994) |
| 🔴 High | [#53894](https://github.com/vllm-project/vllm/issues/53894) | v0.28.0 hangs during startup with DeepSeek-V4-Pro on 2×16 H100 nodes | ❌ No fix yet; regression from v0.25.0 |
| 🟡 Medium | [#54317](https://github.com/vllm-project/vllm/issues/54317) | CUDA illegal memory access on GLM-5.3-Flash (4xB200) across multiple kernels | ❌ Unresolved; affects hybrid Mamba/GDN models |
| 🟡 Medium | [#54094](https://github.com/vllm-project/vllm/issues/54094) | DFlash2 + YaRN fails to reuse prefix cache despite identical prompt (1.04M tokens) | ❌ No fix; impacts caching efficiency |

---

### **6. What This Means for Application Developers**  
- **Multi-modal apps**: Expect improved reliability with ViT encoder support (PRs like [#54994](https://github.com/vllm-project/vllm/pull/54994)) and pending LoRA support for more MM models (Issue [#31479](https://github.com/vllm-project/vllm/issues/31479)).  
- **Hybrid models (GDN/Mamba)**: Use `--block-size` carefully — recent issues (#53142, #53912) show prefix-cache resume bugs can corrupt output if mismatched with state column size.  
- **Production-grade inference**: Avoid `v0.28.0` with DeepSeek-V4-Pro on multi-node setups until [#53894](https://github.com/vllm-project/vllm/issues/53894) is resolved. Stick to `v0.25.0` for stability.  
- **ROCm users**: You're ahead — FP8 PLE, MLA optimizations, and sparse attention support are actively being added. Test early on gfx942/gfx950 hardware.  
- **Tool calling & structured output**: Still fragile on Gemma4 and Qwen3.5 (Issues [#39072](https://github.com/vllm-project/vllm/issues/39072), [#35700](https://github.com/vllm-project/vllm/issues/35700)); validate responses rigorously in production.

---  
*Stay tuned: vLLM’s Q3 2026 roadmap (#48193) signals deeper investment in cold-start optimization and speculative decoding improvements.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-03**

---

### **1. Today’s Highlights**  
The SGLang ecosystem continues to advance in high-performance inference infrastructure, with major progress on **context parallelism (CP)** and **HiCache architecture refinements**, alongside critical stability fixes for MoE and Flash attention models. Notably, a new PR introduces **GraniteMoE weight loading support** and ongoing work aims to unify radix cache logic across hybrid and hierarchical caching paths.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The latest stable version remains `v0.5.18`, with active development focused on feature integration and stability improvements.

---

### **3. New Model & Hardware Support**  
- ✅ **GraniteMoE**: PR [#37679](https://github.com/sgl-project/sglang/pull/37679) adds support for loading split-per-expert quantized MoE weights from compressed checkpoints (e.g., `llmcompressor` format), enabling efficient deployment of large MoE models.
- ✅ **Intel XPU**: PR [#35304](https://github.com/sgl-project/sglang/pull/35304) enables XPU inference for five embedding models: `bge-base-en-v1.5`, `nomic-embed-text-v1.5`, `granite-embedding-english-r2`, `InternVL3_5-30B-A3B`, and `Hunyuan-A13B-Instruct`.
- ✅ **T-Head PPU**: Issue [#37519](https://github.com/sgl-project/sglang/issues/37519) formally tracks roadmap efforts to add first-class support for T-Head ZW810/ZW810E/ZW-M890P accelerators, signaling expansion beyond NVIDIA/AMD.
- ✅ **GLM-5.3-Flash**: PR [#36507](https://github.com/sgl-project/sglang/pull/36507) adds initial model support; however, decode CP has been temporarily disabled via [#37487](https://github.com/sgl-project/sglang/pull/37487) pending full DSA+DCP integration.

---

### **4. Performance & Optimization**  
- 🔧 **HiCache & Radix Cache Unification**: Multiple PRs ([#37278](https://github.com/sgl-project/sglang/pull/37278), [#36415](https://github.com/sgl-project/sglang/pull/36415)) address internal consistency in write-through and marker handling, improving reliability under multi-node HiCache backup scenarios.
- 🚀 **FastH3 VSA Backend**: PR [#37662](https://github.com/sgl-project/sglang/pull/37662) optimizes FastH3 VSA gate fusion and qk-norm+RoPE fusing, enabling **4x B300 throughput at 24 fps** for 1344×768 video generation with audio.
- ⚙️ **Dynamic Chunking Improvements**: PRs [#37674](https://github.com/sgl-project/sglang/pull/37674) and [#37675](https://github.com/sgl-project/sglang/pull/37675) restructure PP dynamic-chunk profiling and improve failure propagation, reducing overhead in distributed prefill scheduling.
- 💡 **JIT & CUDA Graph Optimization**: PR [#37329](https://github.com/sgl-project/sglang/pull/37329) enhances CUDA graph capture by preserving custom tensor outputs and reducing decode state size; PR [#37330](https://github.com/sgl-project/sglang/pull/37330) offloads CUDA VMM publication to dedicated streams, cutting tokenizer latency.

---

### **5. Stability & Regressions**  
Critical crashes and correctness bugs dominate today’s issue tracker:

| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| 🔴 High | [#37633](https://github.com/sgl-project/sglang/issues/37633) | Qwen3.8-Flash-Next-FP8 crashes under ~22 concurrent requests on H20 TP8 due to **QSA prefill kernel illegal memory access** | Open — urgent |
| 🔴 High | [#36537](https://github.com/sgl-project/sglang/issues/36537) | Qwen3.8-Flash-Next tool parser loops on token ID 0 in thinking mode | Open — affects agent tool use |
| 🔴 High | [#37559](https://github.com/sgl-project/sglang/issues/37559) | CUDA_ERROR_ILLEGAL_ADDRESS crash on B300 (SM100) after `sgl-deep-gemm` bump with `--moe-a2a-backend megamoe` | Open — hardware-specific |
| 🔴 High | [#36550](https://github.com/sgl-project/sglang/issues/36550) | GLM-5.3-Flash worker aborts at first decode token after cold prefill > 262k tokens | Closed — likely regression from recent DSA/Graph changes |
| 🟡 Medium | [#33397](https://github.com/sgl-project/sglang/issues/33397) | DeepSeek-V4 progressive output corruption under concurrency (DP attention) | Open — persistent in main |

> **Note**: Several regressions are tied to **FP8, MoE, and context parallelism**—key areas under active optimization.

---

### **6. What This Means for Application Developers**  
- **Use caution with FP8 and MoE models** (especially Qwen3.8-Flash-Next and GraniteMoE): While new support is landing, known crashes and parsing issues may affect production agents using tool calling or long-context reasoning.
- **Leverage HiCache for large-scale LLM serving**: The unified radix cache refactoring and out-of-process data plane RFC ([#37372](https://github.com/sgl-project/sglang/issues/37372)) signal upcoming scalability gains for low-latency, high-throughput deployments.
- **Monitor CI health closely**: With 1 broken + 3 flaky tests reported in [#17050](https://github.com/sgl-project/sglang/issues/17050), consider pinning to a known-good commit when deploying on CI-heavy pipelines.
- **Prepare for hardware diversity**: With Intel XPU and T-Head PPU support entering the roadmap, expect broader deployment flexibility—but test early in non-NVIDIA environments.

👉 *For agents relying on reliable tool parsing and streaming: avoid `qwen3_coder` and `thinking-mode` traffic until [#36537](https://github.com/sgl-project/sglang/issues/36537) is resolved.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-09-03**

---

### **1. Today's Highlights**  
The latest development cycle focuses on enhancing vision model support for DeepSeek-V4-Flash and Qwen series, with key improvements to Metal (Apple Silicon) performance and memory management. Critical fixes address Vulkan/ROCm stability under low-memory conditions and a persistent crash in Flash Attention on AMD Strix Halo systems.

---

### **2. Releases & Breaking Changes**  
- **`b10771`**: Added `mtmd_tokenize_from_parts()` for improved tokenization control in MTMD CLI; moved `add_special` logic to call level. [PR #28250](https://github.com/ggml-org/llama.cpp/pull/28250)  
- **`b10767`**: Updated ROCm to version 10.0.0 release. [PR #27803](https://github.com/ggml-org/llama.cpp/pull/27803)  
- **`b10763`**: Enabled `preserve_reasoning` by default in server mode and added logging of its effective state. [PR #28174](https://github.com/ggml-org/llama.cpp/pull/28174)

> 🔔 *Note:* No breaking API changes reported today; all updates are additive or behavioral enhancements.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4-Flash-Vision-Exp** now fully supported via `mtmd`. [PR #28133](https://github.com/ggml-org/llama.cpp/pull/28133)  
- ✅ **Qwen3-TTS-0.6B** model now loads correctly with optional projection handling. [PR #28231](https://github.com/ggml-org/llama.cpp/pull/28231)  
- ✅ **Spark2_5** model architecture added: full GGUF conversion, tokenizer, tensor mapping, and inference graph. [PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868)  
- ✅ **Metal (M3/M4)**: Tuned FA-vec kernels for improved throughput. [PR #28236](https://github.com/ggml-org/llama.cpp/pull/28236)  
- ✅ **WebGPU**: Backward kernels added — enabling browser-based fine-tuning experiments. [PR #28269](https://github.com/ggml-org/llama.cpp/pull/28269)  
- ✅ **Hexagon** backend now documented in `ops.md`. [PR #28263](https://github.com/ggml-org/llama.cpp/pull/28263)

---

### **4. Performance & Optimization**  
- 🚀 **Qwen3.8-Flash-Next**: Direct reads for PLE table improve prefill speed >2x on GB10 (sm_121). [PR #28136](https://github.com/ggml-org/llama.cpp/pull/28136)  
- ⚙️ **MTP Optimization**: MTP support for Qwen3.8-Flash-Next enables 1.3–2x faster processing with shared modules and reduced VRAM usage. [PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243)  
- 💾 **Sparse Flash Attention (Metal)**: Initial implementation shows promising gains on M2 Ultra (results pending full benchmark). [PR #28098](https://github.com/ggml-org/llama.cpp/pull/28098)  
- 🔄 **IMatrix Parallelization**: OpenMP-enabled `collect_imatrix()` improves matrix computation efficiency. [PR #28283](https://github.com/ggml-org/llama.cpp/pull/28283)  
- 📈 **Memory Efficiency**: `--cache-disk` now supports persistent prompt cache with LRU eviction and corruption recovery. [PRs #26408, #28092](https://github.com/ggml-org/llama.cpp/pull/26408)  

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Impact | Fix PR |
|--------|------|-------|--------|-------|
| 🔴 High | **Vulkan Flash Attention crash** on AMD Strix Halo (`gfx1151`) under low memory. [Issue #25207](https://github.com/ggml-org/llama.cpp/issues/25207) | Open | System-wide instability | ❌ None yet |
| 🔴 High | **SYCL device memory query failure** on Lunar Lake iGPU (Arc 140V). [Issue #28134](https://github.com/ggml-org/llama.cpp/issues/28134) | Open | Model load failure | ❌ None yet |
| 🔴 High | **RTX 5090 display loss & GSP reset** during CUDA inference on Qwen3.8-27B Q6_K. [Issue #27910](https://github.com/ggml-org/llama.cpp/issues/27910) | Open | Hardware-level crash | ❌ None yet |
| 🟡 Medium | **Deterministic output corruption** in DeepSeek-V4-Flash on GB10 (sm_121), reproducible across builds. [Issue #28132](https://github.com/ggml-org/llama.cpp/issues/28132) | Open | Model correctness risk | ❌ None yet |
| 🟡 Medium | **Vulkan crashes on model load** (AMD Strix Halo, RX 6900 XT). [Issue #27189](https://github.com/ggml-org/llama.cpp/issues/27189) | Open | Inference failure | ❌ None yet |

> ⚠️ Multiple high-severity regressions affecting GPU backends (Vulkan, ROCm, CUDA) indicate ongoing stress testing of new hardware and kernel paths.

---

### **6. What This Means for Application Developers**  
- ✅ **Vision models** like DeepSeek-V4-Flash-Vision-Exp and Qwen3-TTS are now production-ready in llama.cpp, enabling rich multimodal agents.
- 🛠️ Use `--cache-disk` to offload large context checkpoints to disk — essential for long-running agents or multi-session workflows.
- 📉 Avoid `--ctx-size > 131072` with DeepSeek-V4-Flash on ROCm until issue #27021 is resolved (bitonic kernel overflow).
- 🧩 Leverage **MTP optimizations** and **sparse attention** for faster, lower-memory inference on Apple Silicon and future GPUs.
- 🔒 Do **not deploy** on RTX 5090 with Qwen3.8-27B Q6_K until #27910 is patched — risk of full system freeze.
- 🧪 For WebGPU-based apps: experiment with browser-side fine-tuning using PR #28269 (requires upstream merge).

> 👉 **Actionable Tip:** If using Metal on M3/M4, ensure you’re on `b10770+` for optimal FA-vec performance and memory safety.

---  
*Source: [llama.cpp GitHub](https://github.com/ggml-org/llama.cpp)*  
*Digest generated: 2026-09-03*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-03**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its MLX engine capabilities, with critical fixes for vision and audio input in Gemma4 and Qwen3.5 models now merged into the main branch. Meanwhile, performance monitoring improvements are underway, including per-device VRAM reporting and predictive GPU memory estimation — key enablers for efficient local inference on multi-GPU systems. Two high-severity cloud issues affecting `glm-5.3:cloud` and `deepseek-v4-flash:0731` remain open, indicating potential instability in agent workflows.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking configuration changes were published. The latest stable version remains unchanged.

---

### **3. New Model & Hardware Support**  
- ✅ **Gemma4 Vision & Audio Support (MLX)**: PRs [#17650](https://github.com/ollama/ollama/pull/17650) and [#18079](https://github.com/ollama/ollama/pull/18079) add full image and audio input support for `gemma4:12b-mlx`, covering both transformer-based and encoder-free vision towers.  
- ✅ **Qwen3.8 Flash Next Memory Efficiency (MLX)**: PR [#18078](https://github.com/ollama/ollama/pull/18078) introduces BF16 retention for key projections and MXFP8 quantization elsewhere, improving long-generation stability without sacrificing speed.  
- 🟡 **Spark2_5 Architecture Request**: Issue [#18195](https://github.com/ollama/ollama/issues/18195) requests native support for Spark-X2.5-4B and -1.7B models using the `spark2_5` architecture — currently blocked by runtime recognition gaps.  
- 🟡 **GLM 5.3-Flash Cloud Model**: Issue [#18190](https://github.com/ollama/ollama/issues/18190) reports recurring "model took too long" timeouts despite active processing, suggesting a backend timeout misconfiguration.

---

### **4. Performance & Optimization**  
- 🔧 **Per-Device VRAM Reporting**: PR [#18197](https://github.com/ollama/ollama/pull/18197) adds accurate VRAM usage breakdown by device in `/api/ps`, enabling better resource allocation on multi-GPU hosts.  
- 🔧 **Predictive Single-GPU VRAM Estimation**: PR [#18198](https://github.com/ollama/ollama/pull/18198) proposes estimating required VRAM from head dimensions and historical load patterns — crucial for pre-deployment planning.  
- 🔧 **Offline Model Diff Tool**: PR [#18202](https://github.com/ollama/ollama/pull/18202) introduces a standalone `cmd/model diff` tool for comparing safetensors, GGUF, and directory-based models — useful for auditing model integrity.  
- ⚠️ **High CPU Usage Regression**: Issue [#18038](https://github.com/ollama/ollama/issues/18038) reports ~560% CPU utilization on Mac Studio M4 Max during token generation — likely due to recent llama-cpp updates; no fix yet.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| 🔴 High | [#18193](https://github.com/ollama/ollama/issues/18193) | `glm-5.3:cloud` enters endless reasoning loops, aborting tasks in OpenCode/ZCode | ❌ Open |
| 🔴 High | [#17892](https://github.com/ollama/ollama/issues/17892) | `deepseek-v4-flash:0731` repeats thinking blocks indefinitely (>200x), no `</think>` output | ❌ Open |
| 🟡 Medium | [#18194](https://github.com/ollama/ollama/issues/18194) | `gemma3:12b` truncates structured JSON output when input contains double quotes | ❌ Open |
| 🟡 Medium | [#18038](https://github.com/ollama/ollama/issues/18038) | Llama-server consumes excessive CPU (~560%) during generation on M4 Max | ❌ Open |
| 🟡 Low | [#18188](https://github.com/ollama/ollama/issues/18188) | "Restart Claude Desktop" toggle silently reverts and fails to write config | ❌ Open |

> Note: Several regressions are tied to cloud inference and agent-specific behaviors, signaling risks for production workflows.

---

### **6. What This Means for Application Developers**  
- **Use MLX for multimodal apps**: With vision/audio support now live for Gemma4 and Qwen3.5 via MLX, developers can safely build image-aware agents locally.  
- **Avoid cloud models with known loops**: Do not rely on `glm-5.3:cloud` or `deepseek-v4-flash:0731` for long-running agent tasks — expect infinite loops and premature terminations.  
- **Monitor VRAM closely**: Use `/api/ps` + upcoming per-device metrics to avoid overloading GPUs, especially in multi-model deployments.  
- **Plan for structured output edge cases**: When using `gemma3:12b` with JSON schema, escape double quotes in inputs or consider alternative models.  
- **Expect CLI UX polish**: Tab completion (`ollama run <tab>`) is now available via PR [#18205](https://github.com/ollama/ollama/pull/18205), improving developer productivity.  

👉 *Pro Tip*: For local inference, prefer `--num-parallel=2` on supported models (e.g., Qwen3.5) now that upstream crashes are resolved (PR [#17144](https://github.com/ollama/ollama/pull/17144)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-03**

---

#### **1. Today's Highlights**  
LiteLLM continues its momentum toward a high-performance, production-grade AI inference stack with critical fixes to streaming reliability, proxy security, and Python compatibility. The most significant development is the ongoing **Rust migration initiative**, now actively being tracked in Issue #31263 — signaling a strategic shift toward sub-millisecond overheads for the next-generation gateway. Meanwhile, urgent PRs address high-risk issues around credential handling, token leakage, and model routing correctness.

---

#### **2. Releases & Breaking Changes**  
- **v1.99.1** and **v1.97.1** are **Docker-only releases** with no PyPI packages available.  
  → `pip install litellm==1.99.1` or `==1.97.1` will fail. Users must use container images only.  
  🔗 [GitHub Release v1.99.1](https://github.com/BerriAI/litellm/releases/tag/v1.99.1) | [GitHub Release v1.97.1](https://github.com/BerriAI/litellm/releases/tag/v1.97.1)  
- These releases exist solely to tag traceable container images; stay on `1.99.0`/`1.97.0` via PyPI if you need pip installs.

---

#### **3. New Model & Hardware Support**  
- **Gemini 3.1 Flash TTS** support added via PR #31915 (Vertex AI).  
  🔗 [PR #31915: feat(vertex-ai): support gemini 3.1 flash tts](https://github.com/BerriAI/litellm/pull/31915)  
- **OpenAPI YAML spec support** now enabled for MCP providers (PR #38951), improving integration flexibility.  
  🔗 [PR #38951: [bug, proxy] OpenAPI MCP cannot read YAML specs](https://github.com/BerriAI/litellm/pull/38951)

---

#### **4. Performance & Optimization**  
- **Rust Migration Initiative** (#31263) launched to achieve sub-1ms overheads — foundational for low-latency inference gateways.  
  🔗 [Issue #31263: LiteLLM Rust Migration - the fastest and litest AI Gateway](https://github.com/BerriAI/litellm/issues/31263)  
- **Sync Redis cache reads** improved via blocking client usage (PR #39358), preventing async connection pool corruption during routing cooldowns.  
  🔗 [PR #39358: fix(cache): use sync Redis batch reads](https://github.com/BerriAI/litellm/pull/39358)  
- **Auto-router reasoning effort** support (PR #39372) enables fine-grained cost control for classification models.  
  🔗 [PR #39372: feat(auto-router): support classifier reasoning effort](https://github.com/BerriAI/litellm/pull/39372)

---

#### **5. Stability & Regressions**  
**High Severity**:  
- **Python 3.10 Compatibility Breakage** — `litellm` fails to import due to `typing.NotRequired` and `assert_never` imports from 3.11-only modules.  
  🔗 [Issue #38202: LiteLLM is not compat with Python 3.10](https://github.com/BerriAI/litellm/issues/38202)  
  ✅ Fix in progress: [PR #39448](https://github.com/BerriAI/litellm/pull/39448) (risk:high, blocks CI/CD).

**Medium Severity**:  
- **Streaming tool call corruption** in Ollama → Anthropic bridge: malformed indices, spurious `finish_reason=stop`, and missing `tool_use` payloads.  
  🔗 [PR #39012: fix(ollama): reconstruct streaming tool calls...](https://github.com/BerriAI/litellm/pull/39012)  
- **Intermittent ~16.7s TTFB** on Anthropic `/v1/messages` streaming requests — reproducible only via LiteLLM proxy, not direct Bedrock.  
  🔗 [Issue #38689: Intermittent ~16.7s time-to-first-byte (TTFB)](https://github.com/BerriAI/litellm/issues/38689)  
- **ChatGPT/gpt-5.4 returns empty output=[] despite status='completed'** — SSE stream received but payload dropped.  
  🔗 [Issue #25429: chatgpt/gpt-5.4 returns empty final Responses output](https://github.com/BerriAI/litellm/issues/25429)

---

#### **6. What This Means for Application Developers**  
- **Avoid `pip install litellm==1.99.1` or `1.97.1`** — use Docker images instead. Stay on `1.99.0`/`1.97.0` for pip-based deployments.  
- **Upgrade immediately if using Python 3.10** — current versions (`1.98.0`–`1.100.0-rc.1`) are broken. Wait for `#39448` merge.  
- **Be cautious with gpt-5.4, ollama, and Claude Code integrations** — known bugs in tool calling, streaming, and agent-side tool execution. Monitor PRs for fixes.  
- **Prepare for future Rust-based LiteLLM** — expect lower latency and higher throughput in upcoming releases.  
- **Use `forward_traceparent_to_llm_provider: true` carefully** — currently creates sibling spans, not child spans (Issue #39067).  

> 💡 **Pro Tip**: For production systems, pin to stable releases (`1.97.0`, `1.99.0`) until Rust migration stabilizes and CI/CD pipelines pass on all Python versions.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-03**

---

### **1. Today's Highlights**  
Unsloth releases v0.1.806-beta with up to **2x faster inference** for Qwen3.8-Flash-Next and GLM-5.3-Flash using MTP (Multi-Tensor Packing), now enabled by default. The release includes over 170 improvements across training, chat, hardware compatibility, and performance. Critical stability fixes address GPU detection issues on AMD Strix Halo (gfx1151) and ROCm runtime crashes, while UI refinements improve model loading and memory reporting.

---

### **2. Releases & Breaking Changes**  
- **v0.1.806-beta** (GitHub: [unslothai/unsloth#3526](https://github.com/unslothai/unsloth/issues/3526))  
  - MTP enabled by default — disables via `UNSLOTH_MTP=0` if needed.  
  - Smoother model loading across local servers and cloud environments.  
  - Includes 170+ bug fixes, performance patches, and UX enhancements.  
  - *No breaking API changes reported.*  

---

### **3. New Model & Hardware Support**  
- **AMD Strix Halo (Radeon 8060S, gfx1151)**: Partial support restored after earlier prebuilt segfaults; bundled ROCm runtime in `rocm-gfx1151` now known to crash. Users should use system ROCm instead.  
  - Issue: [#6276](https://github.com/unslothai/unsloth/issues/6276) | PR: [#10200](https://github.com/unslothai/unsloth/pull/10200) (Hangul search fix).  
- **ROCm on Windows**: Known instability with `libhsa-runtime64.so.1.21.0` segfaults; workaround: use system ROCm.  
  - Issue: [#3526](https://github.com/unslothai/unsloth/issues/3526) | PR: [#7102](https://github.com/unslothai/unsloth/pull/7102) (Windows ROCm torchao export disable).  
- **Apple Silicon (M4 Mac)**: Deep research fails with MLx models due to HTTP 400 errors; root cause under investigation.  
  - Issue: [#10215](https://github.com/unslothai/unsloth/issues/10215)  

---

### **4. Performance & Optimization**  
- **2x Faster Inference**: Qwen3.8-Flash-Next and GLM-5.3-Flash now run up to twice as fast with MTP enabled.  
  - MTP is default; can be disabled via env var.  
  - PR: [PR #10217](https://github.com/unslothai/unsloth/pull/10217) (audio model auto-load support).  
- **Memory Reporting Fix**: On Apple Silicon, free GPU memory now correctly reflects actual available RAM (previously overestimated).  
  - PR: [PR #10224](https://github.com/unslothai/unsloth/pull/10224)  
- **Deep Research Optimization**: Now sizes runs based on the actual model being used (not local fallback), improving accuracy and resource planning.  
  - PR: [PR #10220](https://github.com/unslothai/unsloth/pull/10220)  

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Status | PR/Link |
|---------|------|-------------|--------|--------|
| ⚠️ High | [#7449](https://github.com/unslothai/unsloth/issues/7449) | Unsloth Studio uses system RAM instead of VRAM despite GPU usage visible. | Open | No fix yet |
| ⚠️ High | [#7371](https://github.com/unslothai/unsloth/issues/7371) | Performance regression on Strix Halo + ROCm after `b10079` update | Open | Investigation ongoing |
| ⚠️ High | [#6276](https://github.com/unslothai/unsloth/issues/6276) | `rocm-gfx1151` prebuilt segfaults on bare-metal Strix Halo | Open | Use system ROCm as workaround |
| ⚠️ Medium | [#7485](https://github.com/unslothai/unsloth/issues/7485) | Latest llama.cpp build breaks AMD GPU detection | Open | No fix yet |
| ✅ Low | [#10173](https://github.com/unslothai/unsloth/issues/10173) | Non-English Windows: `nvidia-smi` decoding fails → installer exits 2 | Closed | Fixed in recent patch |

---

### **6. What This Means for Application Developers**  
- **Leverage MTP by default**: Expect 2x speedups for supported models (Qwen3.8-Flash-Next, GLM-5.3-Flash); no config change needed.  
- **Avoid bundled ROCm on AMD Strix Halo**: Use system ROCm to prevent crashes. Future updates may resolve this.  
- **Be cautious with model auto-loading**: Custom settings (context length, KV cache quantization) are ignored when models load via API — use `Save settings` button (PR #10216) to persist them.  
- **Handle audio models carefully**: Audio support is still experimental — use PR #10217 to enable dynamic loading via API.  
- **Monitor memory reporting**: On M4 Macs, free memory is now accurate; avoid relying on outdated estimates.  
- **For local deployments**: Consider disabling authentication (`UNSLOTH_STUDIO_NO_AUTH`) for trusted LAN setups (feature request: #5031).

> 🔗 [View full GitHub repo](https://github.com/unslothai/unsloth) | [Latest Release Notes](https://github.com/unslothai/unsloth/releases/tag/v0.1.806-beta)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*