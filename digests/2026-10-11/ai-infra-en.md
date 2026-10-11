# AI Infrastructure Digest 2026-10-11

> Generated: 2026-10-11 01:13 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

---

### **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-11**

---

#### **1. Ecosystem Overview**  
The AI inference and serving landscape in Q4 2026 is defined by rapid convergence of high-performance kernels, multi-hardware support, and growing maturity in agent-centric workflows. Projects are increasingly focused on stability for production workloads—especially around speculative decoding, prefix caching, and deterministic inference—while pushing boundaries in model efficiency (MoE, GDN, MXFP4) and hardware diversity (AMD ROCm, Blackwell, Intel Arc). The rise of hybrid models (e.g., Mamba2 + Transformer), advanced quantizations (FP8, Q1_0), and distributed inference patterns signals a shift toward scalable, real-time LLM orchestration across edge-to-cloud environments.

---

#### **2. Activity Comparison**

| Project       | Issues Open (Last 7 Days) | PRs Merged (Last 7 Days) | Release Status         |
|---------------|----------------------------|----------------------------|------------------------|
| vLLM          | 28                         | 34                         | Stable: v0.31.0        |
| SGLang        | 32                         | 29                         | No new release         |
| llama.cpp     | 25                         | 31                         | Patch releases (b11552+) |
| Ollama        | 37                         | 19                         | `0.40.x` in flux       |
| LiteLLM       | 29                         | 22                         | Backporting to stable  |
| Unsloth       | 22                         | 18                         | Beta: v0.1.903-beta    |

> ✅ **Insight**: *SGLang* and *Ollama* show the highest issue volume, reflecting active user-driven testing and early-stage deployment challenges. *vLLM* leads in PR velocity with strong engineering momentum behind performance and stability fixes.

---

#### **3. Model Support Race**

| New Model / Architecture      | Supported By                          | Notes |
|-------------------------------|----------------------------------------|-------|
| **Qwen3.8-27B (DFlash2/DSpark)** | vLLM (partial), llama.cpp (b11552+)   | vLLM has critical corruption bug; use v0.29.0 |
| **DeepSeek-V4.1 (Flash variant)** | vLLM, SGLang, llama.cpp               | All three now support it; vLLM optimizes decode path |
| **MiniCPM-V 4.7 (MoE + MROPE)** | llama.cpp (b11552+), Ollama (via llama.cpp) | First-class support in llama.cpp |
| **Qwen3-TTS**                 | Unsloth (feature request #3951)       | Not yet supported — gap in voice AI stack |
| **K2 Horizon (MoE)**          | Ollama (request #18698)               | Pending official GGUF availability |
| **GatedDeltaNet (GDN)**       | vLLM, SGLang (ROCm opt-in)            | vLLM leads in kernel-level optimization |
| **MXFP4 MoE**                 | vLLM, SGLang, llama.cpp (SYCL)        | AMD Mi355X targeting via vLLM & SGLang |

> 🏆 **Winner**: *vLLM* holds the lead in cutting-edge model architecture support (GDN, Flash Attention, MoE), especially for GPU-optimized inference. *SGLang* excels in multimodal and diffusion integration (SANA-Video 2.0, Cosmos3).

---

#### **4. Performance Frontier**

| Optimization Focus         | Key Projects & Highlights |
|----------------------------|----------------------------|
| **KV Cache Efficiency**    | vLLM (prefix cache fixes), SGLang (FFN launch path), llama.cpp (`--reclaim-mmap-source`) |
| **Batch Invariance & Determinism** | vLLM (#61035–61038), SGLang (hybrid Mamba2 hangs), LiteLLM (cost tracking issues) |
| **Speculative Decoding**   | vLLM (regression in hybrid models), SGLang (torch.compile instability), llama.cpp (fixed race condition) |
| **Quantization & Kernels** | vLLM (BF16 KV caches on Blackwell), SGLang (FP8 via TileLang), llama.cpp (Q1_0/HVX, SYCL-MXFP4) |
| **Distributed Serving**    | vLLM (pipeline parallelism), SGLang (DSpark CUDA Graphs), Ollama (MLX crash risks) |

> 🔥 **Frontier Focus**: *vLLM* dominates in low-latency, high-throughput optimizations for large-scale inference. *SGLang* pushes innovation in dynamic graph compilation and multimodal scheduling. *llama.cpp* remains unmatched in edge and cross-backend portability.

---

#### **5. Layer Positioning**

| Project       | Primary Layer                     | Role Summary |
|---------------|------------------------------------|--------------|
| **vLLM**      | **Inference Engine**               | High-performance GPU-serving core; optimized for TP/PP, spec-decoding, and KV cache |
| **SGLang**    | **Inference Engine + Gateway**     | Full-stack runtime with built-in streaming, tool calling, and scheduler logic |
| **llama.cpp** | **Local Runtime / Edge Engine**    | Cross-platform, CPU/GPU-friendly inference engine ideal for embedded, desktop, and edge |
| **Ollama**    | **Gateway / Developer CLI**        | User-facing API gateway with model management, tool calling, and local-first UX |
| **LiteLLM**   | **API Gateway / Orchestration Layer** | Multi-provider routing, cost control, guardrails — central for agent systems |
| **Unsloth**   | **Fine-tuning + Local UI Runtime** | Desktop-focused training/inference suite with UI, tailored for developers and researchers |

> 💡 **Positioning Insight**:  
> - **Engine Layer**: vLLM (performance), SGLang (flexibility), llama.cpp (portability)  
> - **Orchestration Layer**: LiteLLM (multi-provider), Ollama (local dev)  
> - **Fine-tuning Layer**: Unsloth (UI + training), vLLM/SGLang (via downstream tools)

---

#### **6. Trend Signals**

🔍 **Key Industry Trends Extracted from Today’s Activity**:
1. **Hardware Diversification Accelerates**: AMD ROCm (gfx950/Mi355X), Intel Arc B70, and Blackwell SM120/SM121 are now mainstream targets—projects must optimize per-architecture.
2. **Hybrid Models Demand Rigorous Testing**: GDN, Mamba2, SWA, and MoE architectures introduce non-determinism and regression risks—deterministic inference is no longer optional.
3. **Agent Workflows Drive Stability Pressure**: Tool calling, streaming fidelity, and prompt caching bugs are pervasive—indicating that agent pipelines are now primary use cases.
4. **Quantization & Kernel Fusion Are Maturing**: FP8, MXFP4, Q1_0, and fused LoRA are moving beyond proof-of-concept into production-grade support.
5. **Edge & Local Inference Still Lag**: While cloud engines mature, local/edge platforms (llama.cpp, Unsloth) face memory and backend consistency issues.

> 📌 **Actionable Guidance for Application Developers**:
> - **Avoid `v0.30+/0.31` for Qwen3.8-27B (DFlash2)** — pin to v0.29.0 until #60174 is fixed.
> - **Use `--enable-torch-compile` cautiously in SGLang** — only after validating model compatibility.
> - **Leverage `--reclaim-mmap-source` in llama.cpp** for Linux-based large-model deployments.
> - **Validate all tool calling flows**—Qwen3 series has multiple known parsing bugs.
> - **Monitor LiteLLM’s cost accounting**—cached responses incorrectly report zero spend despite token usage.

> ✅ **Bottom Line**: The infrastructure layer is becoming *production-ready*, but only with careful version selection, hardware-aware tuning, and rigorous testing of agent-specific workflows.

---  
*Generated: 2026-10-11 | For technical decision-makers and infrastructure engineers*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance across emerging hardware, with critical bugfixes for **prefix caching corruption on Qwen3.8-27B (DFlash2/DSpark)** and **speculative decoding issues under pipeline parallelism**. New PRs focus on optimizing **DeepSeek-V4.1 decode efficiency** and improving **KV cache management for hybrid models**, while ongoing work targets **AMD ROCm gfx950/Mi355X performance** and **batch invariance compliance**.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes reported in the last 24 hours.*  
Latest stable version remains **v0.31.0**, with no notable API or config shifts. Users should monitor #60174 (prefix cache corruption) and #60838 (`--mamba-block-size` no-op) for potential runtime impacts.

---

### **3. New Model & Hardware Support**  
- ✅ **AMD ROCm gfx950 / MI355X**: Dedicated optimization tracks launched for `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` (#57149) and `amd/Qwen3.8-Flash-Next-Quark-MXFP4` (#59575), targeting GatedDeltaNet + QuerySparse Attention models.  
- ✅ **NVIDIA Blackwell (SM120/SM121)**: FA4 sparse MQA decode enabled via #55866; now supports BF16 KV caches on GB10/GB300 GPUs.  
- ✅ **Intel Arc B70 (Battlemage)**: Initial support for `qwen38` model serving via `vllm 0.27.2rc1.dev77+gac7509e2b`, though engine hangs under concurrent load remain a known issue (#54698).

---

### **4. Performance & Optimization**  
- 🔥 **DeepSeek-V4.1**: PR #61039 introduces *length-aware candidate block selection*, reducing unnecessary indexing overhead in decode paths—expected to improve throughput by ~5–10% on long-context workloads.  
- 🚀 **GDN Mixed Steps**: PR #61034 cuts host-side PyTorch op calls in eager prefill path—no kernel change, bit-identical output, but reduces latency per step.  
- ⚙️ **ROCm Performance**: Ongoing optimizations for Qwen3.8-2.4T-A95B and Qwen3.8-Flash-Next on Mi355X, with planned PRs stacking toward full utilization of MXFP4 MoE and GatedDeltaNet.  
- 💡 **Batch Invariance Fixes**: Multiple PRs (e.g., #61038, #61036, #61035) address non-invariant behavior in WNA16 MoE dispatch, DeepSeek fused A GEMM, and all-reduce padding—critical for deterministic inference in distributed settings.

---

### **5. Stability & Regressions**  
| Issue | Severity | Impact | Fix Status |
|------|----------|--------|------------|
| [#60174](https://github.com/vllm-project/vllm/issues/60174) | Critical | Corrupt output after prefix cache hit on Qwen3.8-27B (NVFP4, DFlash2/DSpark) | ❌ No fix yet; reproducible on v0.30/0.31, resolved in v0.29 |
| [#54360](https://github.com/vllm-project/vllm/issues/54360) | High | Speculative decoding silently disables prefix cache hits on hybrid GDN models | ❌ No fix; affects nightly builds post-v0.24.0 |
| [#59770](https://github.com/vllm-project/vllm/issues/59770) | Medium | ~16% decode slowdown on Nemotron-3.5-Lightning (DGX Spark, NVFP4) since v0.29.0 | ❌ Regression persists in v0.30.0/nightly |
| [#57838](https://github.com/vllm-project/vllm/issues/57838) | Medium | RowWiseTorchFP8ScaledMMLinearKernel selected on RDNA4 (gfx1201), costing 5–24% decode time | ❌ No fix; active investigation |

> ⚠️ **Note**: Several regressions are tied to recent GPU architecture-specific kernels (Blackwell, RDNA4) and speculative decoding logic—users deploying these workloads should consider pinning to v0.29.0 or earlier.

---

### **6. What This Means for Application Developers**  
- **Avoid `v0.30.0`/`v0.31.0` for production Qwen3.8-27B (DFlash2/DSpark) or hybrid GDN models**—use `v0.29.0` until #60174 and #54360 are resolved.  
- **Enable `VLLM_BATCH_INVARIANT=1` only if you’ve verified model determinism**—recent PRs show it breaks several models (MiniMax-M2.5, DeepSeek-V4.1) under TP=4.  
- **Leverage prefix caching for RAG/agent workloads**, but monitor #60044 (per-request miss attribution) and #60947 (pooling + prefix cache reuse) for better observability.  
- **For AMD users**: Track #57149 and #59575 for upcoming performance gains on Mi355X—early adoption may require tuning.  
- **Use `--stream-interval` cautiously**—PR #55226 fixes crashes when combined with pooling tasks.

> 📌 **Actionable Tip**: Use `python collect_env.py` to validate your environment before reporting bugs—many issues stem from mismatched FlashInfer, CUDA, or Triton versions.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature in high-performance inference for LLMs and diffusion models, with critical fixes to DSpark CUDA Graph correctness on TP8 systems and ongoing refinement of torch.compile integration. Key PRs today focus on stabilizing dynamic graph compilation (e.g., `--enable-torch-compile`) for Qwen-Image-2.1, Cosmos3, and SANA-Video 2.0, while addressing memory safety issues in multimodal transport and prefill admission logic.

---

### **2. Releases & Breaking Changes**  
None. No new releases were published in the past 24 hours.

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Support**: Added opt-in mono-decode FFN launch path for *DeepSeek-V4.1-Flash* on gfx950 (MI355X), enabled via `SGLANG_ROCM_MONO_DECODE=1`. Requires TP=2/4 without DP or EP. [PR #43497](https://github.com/sgl-project/sglang/pull/43497)  
- **Moore Threads (MUSA)**: Feature request remains open for first-class support. [Issue #16565](https://github.com/sgl-project/sglang/issues/16565)  
- **Diffusion Models**: Enhanced support for *SANA-Video 2.0*, including breakable CUDA graphs and caching of negative prompts and TI2V masks. [PR #43630](https://github.com/sgl-project/sglang/pull/43630), [PR #41501](https://github.com/sgl-project/sglang/pull/41501)

---

### **4. Performance & Optimization**  
- **torch.compile Improvements**: Several PRs aim to improve compile-time performance by keeping key model graphs whole during compilation:  
  - Prevent graph breaks in Qwen-Image-2.1 and Ulysses DiTs. [PR #43586](https://github.com/sgl-project/sglang/pull/43586)  
  - Preserve fused kernels in Cosmos3. [PR #43577](https://github.com/sgl-project/sglang/pull/43577)  
  - Skip problematic multi-kernel pick in Inductor cache to avoid crashes. [PR #43601](https://github.com/sgl-project/sglang/pull/43601)  
- **Memory & Scheduler Efficiency**:  
  - Throttle waiting-prefix refresh by forward count instead of wall time to prevent radix-tree divergence. [PR #43512](https://github.com/sgl-project/sglang/pull/43512)  
  - Cache SANA-Video 2.0 conditioning data to reduce redundant computation. [PR #43630](https://github.com/sgl-project/sglang/pull/43630)  
- **Quantization & Kernel Fusion**:  
  - Added FP8 KV cache support on CUDA via TileLang. [PR #42957](https://github.com/sgl-project/sglang/pull/42957)  
  - Move dynamic LoRA delta inside second GEMM for better fusion. [PR #43501](https://github.com/sgl-project/sglang/pull/43501)

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:
- **CUDA Illegal Memory Access**: Multiple regressions tied to DSpark’s compact ragged target-verify CUDA Graph capture on TP8 (B300/B30Z). Caused by cross-TP planning inconsistency and timing-sensitive races. [Issue #31023](https://github.com/sgl-project/sglang/issues/31023), [Issue #33356](https://github.com/sgl-project/sglang/issues/33356)  
- **Multimodal Transport Leak**: Aborted requests with `--mm-feature-transport cuda_vmm` leak VMM memory slices due to unacknowledged transport allocation. [Issue #43402](https://github.com/sgl-project/sglang/issues/43402)  
- **Deterministic Inference Hangs**: Hybrid Mamba2 models (`granite-4.0-h`) fail to be batch-invariant under `--enable-deterministic-inference` when chunked prefill < alignment. [Issue #43413](https://github.com/sgl-project/sglang/issues/43413)  
- **Unified Memory Crash**: Enabling `--enable-unified-memory` on hybrid-SWA models causes scheduler OOM via `alloc_token_slots`. [Issue #42653](https://github.com/sgl-project/sglang/issues/42653)  
- **Degraded Quality in Compressed Tensors**: Qwen3.8-27B W4A16 (group 128) shows PPL 9.98 vs vLLM’s 6.05 on same checkpoint. [Issue #42917](https://github.com/sgl-project/sglang/issues/42917)  

> ✅ **Fixes in progress**: PRs exist for several DSpark issues (e.g., #31023 fixed by #31195), but full resolution requires further validation.

---

### **6. What This Means for Application Developers**  
- **Avoid `--enable-torch-compile`** until you’ve verified model compatibility — especially for Qwen-Image-2.1, Cosmos3, and Z-Image — as it can introduce slowdowns or crashes. Use `TORCH_LOGS=graph_breaks` to debug.  
- **Use `--enable-deterministic-inference` cautiously** with hybrid Mamba2 models; expect non-determinism in certain prefill configurations.  
- **Monitor unified memory usage** carefully — enabling it on complex models may trigger scheduler OOMs.  
- **For multimodal apps**, ensure `--mm-feature-transport cuda_vmm` is used with proper client-side timeout handling to avoid memory leaks.  
- **Leverage caching improvements** for SANA-Video 2.0 and diffusion workflows to reduce warmup overhead and improve throughput.  

> 🔗 Stay updated: Track CI health at [Issue #17050](https://github.com/sgl-project/sglang/issues/17050) and follow DSpark roadmap at [Issue #30344](https://github.com/sgl-project/sglang/issues/30344).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The latest updates focus on stabilizing speculative decoding workflows and improving model compatibility, with critical fixes for prompt cache handling in `llama-server` and support for MiniCPM-V 4.7. Notably, a regression in RAM-backed prompt caching under concurrent load has been addressed, preventing data leakage between unrelated conversations.

---

### **2. Releases & Breaking Changes**  
- **b11552**: Fixed incorrect prompt cache update behavior when a slot is busy — now preserves ongoing generation state if another request attempts to pin it ([PR #30295](https://github.com/ggml-org/llama.cpp/pull/30295)). This prevents race conditions where a better cache match overwrites an active generation.
- **b11551**: Added full runtime support for **MiniCPM-V 4.7**, including MoE architecture and time-position embeddings via `mrope` ([PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416)).
- **b11550**: Disabled z17 target for s390x builds on unsupported compilers to avoid build failures ([PR #30297](https://github.com/ggml-org/llama.cpp/pull/30297)).

> ⚠️ **Migration Note**: Users relying on `--cache-ram` with high concurrency should upgrade to b11552 to avoid potential cross-conversation data corruption.

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - ✅ **MiniCPM-V 4.7** (MoE + MROPE) added as first-class support ([PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416)).  
  - ✅ **DeepSeek V4.1** (Flash variant) added via `deepseek41` architecture ([PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696)).  
  - ✅ **Prism Bonsai 2 27B** supported at runtime ([PR #29600](https://github.com/ggml-org/llama.cpp/pull/29600)).  
  - ✅ **GLM5-next** now supports input layer embeddings for speculative decoding ([PR #30268](https://github.com/ggml-org/llama.cpp/pull/30268)).

- **Backends & Quantizations**:  
  - ✅ **Hexagon (Q1_0)**: Added native Q1_0 support via HVX for edge devices ([PR #30122](https://github.com/ggml-org/llama.cpp/pull/30122)).  
  - ✅ **OpenCL**: Improved Flash Attention (`dk=512`) for Gemma-4 and enhanced `dk=64` performance for GPT-OSS-20B ([PR #30266](https://github.com/ggml-org/llama.cpp/pull/30266)).  
  - ✅ **SYCL**: Accelerated MXFP4 MoE using arithmetic decoding and weight reordering ([PR #29809](https://github.com/ggml-org/llama.cpp/pull/29809)).

---

### **4. Performance & Optimization**  
- **Memory Efficiency**:  
  - PR #24156 introduces `--reclaim-mmap-source`, reducing RSS by up to **37%** (e.g., 13 GiB saved on Qwen3-30B-A3B) by dropping dormant mmap pages — Linux-only, default-off flag ([PR #24156](https://github.com/ggml-org/llama.cpp/pull/24156)).  
- **Kernel Improvements**:  
  - OpenCL: Refactored bin kernel fallback logic to prevent crashes on large weights ([PR #30310](https://github.com/ggml-org/llama.cpp/pull/30310)).  
  - Vulkan: Clamped A prefetch in `coopmat1` int8 matmul to prevent out-of-bounds reads ([PR #30283](https://github.com/ggml-org/llama.cpp/pull/30283)).  
- **Pipeline Parallelism**: MoE experts can now be offloaded to host RAM with pipeline parallelism enabled ([PR #29963](https://github.com/ggml-org/llama.cpp/pull/29963)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| 🔴 High | `llama-server` crashes due to "bad allocation" during long conversations ([#30091](https://github.com/ggml-org/llama.cpp/issues/30091)) | HIP backend, Windows | No fix yet |
| 🔴 High | Non-deterministic Flash Attention prefill on RDNA3 (ROCm/HIP) since b10905 ([#30175](https://github.com/ggml-org/llama.cpp/issues/30175)) | Multimodal inference | Regression identified; no patch |
| 🟡 Medium | Prompt cache restores unrelated conversation content under concurrent load ([#27148](https://github.com/ggml-org/llama.cpp/issues/27148)) | RAM-backed cache (`--cache-ram`) | Fixed in b11552 |
| 🟡 Medium | GPU memory overflow in Q8_1 dequantization causing NaN PPL ([#21652](https://github.com/ggml-org/llama.cpp/pull/21652)) | Mistral 4 small quantized models | PR open — pending review |
| 🟡 Medium | Flash Attention crash in Gemma4-assistant: head dim mismatch ([#29419](https://github.com/ggml-org/llama.cpp/issues/29419)) | SYCL backend | No fix yet |

> ⚠️ **Critical Note**: Several regressions affect production-grade speculative decoding pipelines, particularly on AMD GPUs and ROCm/HIP. Developers should test against b11552+.

---

### **6. What This Means for Application Developers**  
- **Use b11552+** immediately if you use `--cache-ram` or speculative decoding with concurrent requests — the prompt cache bug can corrupt outputs across sessions.
- **Leverage new model support** for MiniCPM-V 4.7, DeepSeek V4.1, and Prism Bonsai 2 in your agents — especially useful for multimodal and reasoning-heavy workloads.
- **Optimize memory usage** with `--reclaim-mmap-source` on Linux systems running large models (>10B parameters).
- **Avoid speculative decoding with `logprobs`** until PR #27196 is merged — currently broken in current master.
- **Monitor GPU backends carefully**: AMD ROCm/HIP shows growing instability in Flash Attention and MoE paths; consider CUDA or SYCL alternatives for stable inference.

> 📌 **Pro Tip**: For production deployments, pin to `b11552` or later and validate all speculative decoding workflows with real-world load testing.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with active development around model compatibility, streaming fidelity, and backend robustness. Key issues today center on **Qwen3 series stability**, particularly with tool calling (`#17778`, `#14601`, `#18916`) and MLX-specific crashes (`#18856`, `#18885`), while new PRs aim to improve prompt handling for decision models and OpenAI-compatible streaming (`#18917`, `#18914`). A critical regression in `ollama run` behavior on second invocations (`#18796`) highlights lingering lifecycle management concerns.

---

### **2. Releases & Breaking Changes**  
*No new releases detected in the last 24 hours.*  
However, ongoing changes in `0.40.x` include:
- **API consistency improvements**: Streaming `/v1/completions` now matches OpenAI’s wire format (`#18914`).
- **Model tag display cleanup**: `:latest` is no longer shown in `ollama list` and `/api/tags` (`#18915`).
- **Backward-compatible updates**: `openai` API now accepts empty tool call arguments (`#18913`) and custom tool call history (`#18911`).

> 🔗 [PR #18915](https://github.com/ollama/ollama/pull/18915) | [PR #18914](https://github.com/ollama/ollama/pull/18914)

---

### **3. New Model & Hardware Support**  
- **K2 Horizon models (k2-horizon architecture)**: Requested support for 0.9B–36B MoE variants from MBZUAI IFM (`#18698`), with official GGUF available.
- **KailA (kail) architecture**: Proposal to add support for KailA GGUF models, which currently fail due to unrecognized `general.architecture = kail` (`#18922`).
- **Decision models & EmbeddingGemma 2**: `llama.cpp` updated to b11521, enabling native `/v1/systemone` support and embedding model inference (`#18917`).

> 🔗 [Issue #18698](https://github.com/ollama/ollama/issues/18698) | [Issue #18922](https://github.com/ollama/ollama/issues/18922) | [PR #18917](https://github.com/ollama/ollama/pull/18917)

---

### **4. Performance & Optimization**  
- **MLX performance issue**: Quantized models (e.g., mxfp8) are slower than bf16 during prefill on M5 Pro Macs (`#18833`), indicating potential optimization gaps in quantization kernels.
- **Streaming efficiency**: Fixes applied to ensure proper flush of tool parsers even on empty final chunks (`#18872`) and preservation of partial tool call tags (`#18759`), improving correctness in long-running agent workflows.
- **Device probing**: Fallback to native GGML probe when `llama-server --list-devices` returns empty output improves reliability on edge cases (`#18923`).

> 🔗 [Issue #18833](https://github.com/ollama/ollama/issues/18833) | [PR #18872](https://github.com/ollama/ollama/pull/18872)

---

### **5. Stability & Regressions**  
**High severity**:
- `qwen3.6:35b-mlx` crashes on MLX runner in `0.40.x`, confirmed regression from `0.35.0` (`#18856`) — *no fix yet*.  
- `ollama run` hangs indefinitely on second invocation after initial boot (`#18796`) — likely a process lifecycle or state corruption issue.
- `gemma4:12b` fails with `Gemma4Assistant requires ctx_other to be set` (`#18898`) — model-specific config mismatch.

**Medium severity**:
- `qwen3.5:4b` returns only `thinking` content with no response or tool calls after long conversations (`#18916`).
- `rnj-1` fails with `GGML_ASSERT(hparams.is_swa_any()) failed` — indicates missing SWA (Sparse Weight Activation) support in model config (`#18924`).
- `clef-flash` fails on Windows with unclear error (`#18858`), possibly path or backend resolution issue.

> 🔗 [Issue #18856](https://github.com/ollama/ollama/issues/18856) | [Issue #18796](https://github.com/ollama/ollama/issues/18796) | [Issue #18916](https://github.com/ollama/ollama/issues/18916)

---

### **6. What This Means for Application Developers**  
- **Avoid `qwen3.6:35b-mlx` in production** until `#18856` is resolved — it’s unstable in `0.40.x`.
- **Validate tool calling flows** carefully: Qwen3 tool parsing has known bugs (`#17778`, `#14601`), especially in streaming mode. Use `tools` parameter cautiously.
- **Handle context length and `ctx_other` explicitly** for Gemma4 and other specialized models (`#18898`).
- **Expect inconsistent model visibility on Windows** if using NTFS mount points (`#18921`) — use absolute paths or avoid mounted drives.
- **Leverage new `/v1/systemone` support** via `llama.cpp` b11521 for real-time decision-making agents (`#18917`).
- **Use `ollama.bat`/`ollama.sh` wrappers** (proposed in `#18925`) to manage environment variables like `OLLAMA_FLASH_ATTENTION` without polluting global shell state.

> 🔗 [Feature Proposal #18925](https://github.com/ollama/ollama/issues/18925) | [PR #18917](https://github.com/ollama/ollama/pull/18917)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-11**

#### **1. Today's Highlights**
The LiteLLM ecosystem continues to expand its support for advanced AI workflows, with critical updates to the Decisions API and guardrail systems now being backported to stable release branches. Key fixes address streaming OpenTelemetry tracing issues, incorrect cost accounting in response caching, and long-standing compatibility problems with `openai>=3.0.0`, which had blocked integration with modern SDKs.

#### **2. Releases & Breaking Changes**
No new releases were published in the last 24 hours. However, multiple PRs are preparing for upcoming patch releases:
- **v1.104.3** and **rc/1.105.0** are receiving backports of Decisions API enhancements (#45905, #45906), including cost tracking and model mode support.
- A major dependency fix is pending: removal of `openai<3.0.0` pinning (see #40317, #37907) is actively discussed; developers should expect a breaking change in future versions if this is implemented without backward compatibility layers.

> 🔗 [PR #45905](https://github.com/BerriAI/litellm/pull/45905) | [PR #45906](https://github.com/BerriAI/litellm/pull/45906)

#### **3. New Model & Hardware Support**
- **Microsoft Decision 1** model added via feature request (#45807), now in active development for native integration.
- **MiniMax Messages API** support merged directly into `main` (#45896), enabling direct routing for MiniMax’s structured chat interface.
- **Tencent Messages API** support also landed (#45899), extending LiteLLM’s reach across Chinese LLM providers.
- **DeepSeek V4 Flash Responses API** support remains on track for inclusion (#35648).

> 🔗 [PR #45896](https://github.com/BerriAI/litellm/pull/45896) | [PR #45899](https://github.com/BerriAI/litellm/pull/45899) | [Issue #45807](https://github.com/BerriAI/litellm/issues/45807)

#### **4. Performance & Optimization**
- **Cost-based routing** is under scrutiny due to a regression causing sync methods to fail entirely even with healthy deployments (#45718). This impacts load balancing reliability and may lead to cascading failures in high-throughput setups.
- **Response cache efficiency** is being audited: when a cached prompt is reused, `spend = 0` but token counts replay original usage — raising questions about accurate telemetry aggregation (#39057).
- **Streaming performance** is affected by incomplete OpenTelemetry spans when clients stop reading early (#45736), leading to lost observability data unless streams are consumed fully.

> 🔗 [Issue #45718](https://github.com/BerriAI/litellm/issues/45718) | [Issue #39057](https://github.com/BerriAI/litellm/issues/39057) | [Issue #45736](https://github.com/BerriAI/litellm/issues/45736)

#### **5. Stability & Regressions**
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| Router’s `.acompletion()` skips `CustomLogger` callbacks (#8842) | High | Open | ❌ |
| Cost calculation broken for ElevenLabs model (#18058) | High | Open | ❌ |
| `output_config` fails with Xiaomi MiMo models on Claude Code (#24549) | High | Open | ❌ |
| OpenTelemetry records empty tool-call messages (`parts: []`) (#45796) | Medium | Open | ❌ |
| `/v1/messages` ignores deployment-level TPM limits (#45702) | Medium | Open | ❌ |
| Pass-through URLs with `predict` substring misrouted to Vertex AI (#45787) | Critical | Open | ❌ |

These issues collectively impact billing accuracy, logging fidelity, and routing correctness—particularly in multi-provider proxy environments.

> 🔗 [Issue #8842](https://github.com/BerriAI/litellm/issues/8842) | [Issue #18058](https://github.com/BerriAI/litellm/issues/18058) | [Issue #24549](https://github.com/BerriAI/litellm/issues/24549) | [Issue #45796](https://github.com/BerriAI/litellm/issues/45796)

#### **6. What This Means for Application Developers**
- **Avoid using `openai>=3.0.0`** in current projects until the dependency constraint is lifted — otherwise, installation will fail due to pinned `openai<3.0.0`.
- If you use **response caching**, be aware that spend logs show zero cost on hits, but token usage reflects prior calls — audit your telemetry pipelines accordingly.
- For **realtime or streaming applications**, ensure full stream consumption to avoid silent OpenTelemetry span loss (#45736).
- Use **custom auth with `max_budget`** only with a database (`prisma_client`) — otherwise, budget reservations are never reconciled on success (#45895).
- **Guardrails and decision models** are now more robustly supported in stable branches — leverage these for enhanced security in agent systems.

> ✅ Pro Tip: Monitor the `stable/1.104.x` branch for upcoming patches addressing Decisions, guardrails, and cost tracking — they’re critical for production-grade agent orchestration.

---  
*Digest generated: 2026-10-11 | Source: [BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-11**

#### **1. Today's Highlights**  
The Unsloth ecosystem continues to expand its support for multi-GPU inference and advanced model serving, with key PRs improving tensor splitting behavior and enabling finer control over GPU placement. Critical stability fixes address high CPU usage in idle desktop mode and long-context chat lag, while ongoing work enhances compatibility with AMD ROCm, GGUF models, and external tool orchestration.

#### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. Users should continue using v0.1.903-beta (released Oct 7, 2026) for desktop, with no immediate migration required.

#### **3. New Model & Hardware Support**  
- ✅ **AMD ROCm Support**: Active development continues on resolving fine-tuning failures on dual R9700 GPUs under ROCm 7.14+ (`#10657`).  
- ✅ **GGUF Model Enhancements**: The `qwen4exp` architecture is now flagged as unsupported in Desktop (`#10015`), but the team is working on broader GGUF integration via `#13240` (Recommended Hub filter).  
- ✅ **Intel GPU Pinning Guidance**: A documentation request (`#12836`) highlights the need for explicit Intel GPU pinning instructions in the Studio install guide due to missing auto-detection post-PR #9084.  
- 🚧 **Qwen3-TTS FT Support**: Feature request `#3951` seeks full fine-tuning support for Qwen3-TTS, a growing model in voice AI workflows.

#### **4. Performance & Optimization**  
- ⚡ **Tensor Splitting Regression Fix**: A performance regression introduced in `b10715-mix-86bd2d3` caused up to **2.9x slower decode speeds** on dual RTX 5070 Ti setups (`#12468`). The fix is being prioritized.  
- 📈 **Long-Context Latency Improvements**: Long chat lag has been reported on Windows 10 (`#12552`), and UI scroll performance degradation in long conversations is under investigation (`#13255`).  
- 🔍 **Memory Efficiency**: OOM issues persist with GPT-OSS-120B on B200 (183GB VRAM), despite theoretical fit at 4k context (`#3411`). KV cache overhead remains a bottleneck.  
- 💡 **Fused LoRA Optimization**: PR `#13254` skips fused LoRA kernels when DoRA adapters are active—preventing silent magnitude loss during training.

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Link |
|------|----------|--------|------|
| `RuntimeError: illegal memory access` on RTX PRO 6000 (96GB) | Critical | Closed | [Issue #3921](https://github.com/unslothai/unsloth/issues/3921) |
| Idle desktop CPU spike (~95%) across all cores | High | Closed | [Issue #12942](https://github.com/unslothai/unsloth/issues/12942) |
| Long GGUF chats block queued requests despite free slots | Medium | Open | [Issue #10671](https://github.com/unslothai/unsloth/issues/10671) |
| Model weights loaded into system RAM instead of VRAM on AMD Strix Halo | High | Closed | [Issue #7449](https://github.com/unslothai/unsloth/issues/7449) |
| Unstable training on Qwen2.5VL with text-only data | Medium | Closed | [Issue #3271](https://github.com/unslothai/unsloth/issues/3271) |

> ✅ **Fixes in Progress**: Multiple PRs address core stability:
> - `#13256`: Honor padding masks in cached Llama/Qwen3 attention → prevents output divergence.
> - `#13255`: Scroll/performance fix for long convos.
> - `#13249`: Prevents steering follow-ups from disappearing on response cancellation.

#### **6. What This Means for Application Developers**  
- Use `--split-mode layer` explicitly when manually assigning layers across GPUs (`#10770`) to avoid ambiguous behavior.  
- Avoid fused LoRA kernels if using DoRA; verify adapter magnitude integrity during training (`#13254`).  
- Be cautious with long-context sessions: prefill redundancy after reloads may impact UX (`#9037`).  
- For production deployments, monitor VRAM usage closely—even with large GPUs (e.g., B200)—as KV cache can exceed expectations (`#3411`).  
- External model users should expect limited tool settings visibility (`#13251`) until the UI exposes them.  

> 🔗 **Key PRs to Watch**:  
> - [PR #13256](https://github.com/unslothai/unsloth/pull/13256): Fixes left-padded prompt inconsistency  
> - [PR #13255](https://github.com/unslothai/unsloth/pull/13255): Resolves UI sluggishness in long chats  
> - [PR #13240](https://github.com/unslothai/unsloth/pull/13240): Improves model discovery via "Recommended" Hub filter  

---  
*Digest generated: 2026-10-11 | Source: [unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*