# AI Infrastructure Digest 2026-10-13

> Generated: 2026-10-13 03:09 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-13**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of hyper-specialization, with projects converging on high-performance execution, agent-native capabilities, and cross-platform consistency. vLLM leads in raw throughput and kernel-level optimization, while SGLang pushes the boundaries of speculative decoding and disaggregated serving. Ollama and llama.cpp remain dominant for local, edge-friendly deployment, especially on Apple Silicon and heterogeneous hardware. Unsloth is redefining agent workflows with browser automation and multimodal tooling, signaling a shift from pure model serving to *interactive system orchestration*. Meanwhile, LiteLLM continues to cement its role as the intelligent gateway layer, prioritizing billing fidelity and observability across hybrid cloud environments.

---

### **2. Activity Comparison**

| Project       | Issues (Open) | PRs (Open) | Release Status       |
|---------------|---------------|------------|-----------------------|
| **vLLM**      | 147           | 89         | None (breaking changes pending) |
| **SGLang**    | 112           | 76         | None (critical crashes in flight) |
| **llama.cpp** | 153           | 91         | None (critical CUDA/Metal regressions) |
| **Ollama**    | 198           | 114        | `v0.40.4-rc0` (high-severity regressions) |
| **LiteLLM**   | 103           | 68         | None (cost parity fixes underway) |
| **Unsloth**   | 121           | 73         | `v0.1.906-beta` (browser agent beta) |

> 🔍 **Insight**: Ollama shows the highest activity volume, reflecting both rapid innovation and growing instability in its recent release cycle. Unsloth stands out with a stable beta release focused on novel agent functionality.

---

### **3. Model Support Race**

| New Model / Architecture       | Supported By          | Notes |
|----------------------------------|------------------------|------|
| **Cloudflare/clef-flash**       | vLLM ✅                | Via `/v1/systemone`, Qwen3.5 backbone |
| **Qwen3.8-Flash-Next-FP8/Quark-MXFP4** | vLLM ✅, ROCm-focused | AMD MI355X/MI325X performance tracking |
| **GLM-5.3-Flash**               | SGLang ✅, vLLM 🟡     | SGLang enables colocated CP+TP; vLLM has ROCm issues |
| **pplx-decider (D3-series)**    | llama.cpp ✅           | Full support added via `model: support vllm d3 models` |
| **EmbeddingGemma 2**            | Ollama ✅ (experimental) | via updated llama.cpp |
| **Qwen-Image-2.1-Turbo**        | Unsloth ✅             | Native 8-step image gen; resolves prior misclassification |
| **LTX-2.5 FP8/INT8**            | Unsloth ✅             | Pre-quantized DiT loading avoids re-quantization |
| **K2 Horizon (k2-horizon)**     | Ollama 🟡 (request)    | MBZUAI IFM request; no implementation yet |

> 🏆 **Leader**: **vLLM** maintains an edge in cutting-edge model and hardware support, particularly for Qwen series and AMD ROCm. **Unsloth** leads in *multimodal agent-ready* models like Qwen-Image-2.1-Turbo.

---

### **4. Performance Frontier**

| Optimization Focus         | Key Projects & Highlights |
|----------------------------|----------------------------|
| **KV Cache & Speculative Decoding** | vLLM: Mamba block-table fusion (**7x speedup**), speculative warm-up kernels; SGLang: EAGLE spec-decode index optimizations; Unsloth: M-series speculative decoding enabled |
| **Kernel Fusion & Triton** | vLLM: Fused QK-norm+RoPE+gate on ROCm; llama.cpp: AMX Q4_K decode (+13% TG); SGLang: Monokernel RFC for persistent reuse |
| **Quantization Efficiency** | vLLM: Per-forward NVFP4 selection (W4A4/W4A16); SGLang: NVFP4 MoE LoRA on Marlin; Unsloth: Optimized MoE GGUF inference (+22%) |
| **Distributed Serving & Disaggregation** | SGLang: Prefill-decode disaggregation (PD), MTP/TP colocation; vLLM: MoE + LoRA CUDA graph stability fixes |
| **Edge & Local Runtime** | llama.cpp: Vulkan/FMA packing, Metal fixes; Unsloth: M-series CPU offload, Wayland support |

> 🚀 **Frontier Leader**: **vLLM** dominates in low-latency, high-throughput kernel optimization. **SGLang** leads in distributed agentic architectures. **Unsloth** excels in edge-localized, agent-capable performance.

---

### **5. Layer Positioning**

| Project       | Primary Layer              | Role Summary |
|---------------|------------------------------|--------------|
| **vLLM**      | **Serving Engine**           | High-performance inference engine; optimized for GPU kernels, MoE, and speculative decoding |
| **SGLang**    | **Serving Engine + Gateway** | Advanced inference orchestration with PD, multi-stage spec-decode, and backend abstraction |
| **llama.cpp** | **Local Runtime**            | Cross-platform, lightweight runtime for CPU/GPU/MLX/NPU; ideal for edge and offline use |
| **Ollama**    | **Gateway + Local Runtime**  | Unified CLI/toolchain that wraps llama.cpp; focuses on ease-of-use and model management |
| **LiteLLM**   | **LLM Gateway / Proxy**      | Intelligent routing layer with cost control, billing parity, and OpenTelemetry integration |
| **Unsloth**   | **Agent Platform / Training Tool** | Full-stack agent framework with browser interaction, training modes, and multimodal support |

> ⚖️ **Positioning Insight**: The stack is now clearly layered — **engine (vLLM/SGLang)** → **runtime (llama.cpp)** → **gateway (LiteLLM/Ollama)** → **agent platform (Unsloth)**.

---

### **6. Trend Signals**

#### 🔥 **Emerging Industry Trends**:
1. **Agent-Centric Execution**: Browser automation (Unsloth), programmatic cache control (SGLang), and tool call robustness (Ollama/LiteLLM) indicate a shift toward *interactive, stateful agents* over static inference.
2. **Hardware Specialization**: AMD ROCm gains momentum (vLLM, SGLang, Unsloth), but stability gaps persist. Apple Silicon (Ollama, Unsloth) remains critical for edge/local workloads.
3. **Cost & Billing Integrity**: LiteLLM’s focus on cost parity testing and Redis SSL fixes reflects growing need for auditability and financial control in production deployments.
4. **Speculative Decoding Maturation**: Now integrated into multiple stacks (vLLM, SGLang, Unsloth), with emphasis on startup latency and long-context performance.
5. **Multimodal Agent Readiness**: Qwen-Image-2.1-Turbo support and diffusion training modes signal that vision-language and text-diffusion pipelines are moving from research to production.

#### 📌 **What Application Developers Should Watch**:
- **Avoid `v0.40.4-rc0` (Ollama)** until MLX/RTX 5090 issues are resolved.
- **Monitor vLLM’s CUDA graph deadlock** under MoE + LoRA — critical for large-scale agents.
- **Leverage Unsloth’s browser agent** for dynamic web interaction in research or automation tools.
- **Validate cost parity** if using LiteLLM with Gemini or Claude — ensure billing accuracy.
- **Prepare for Qwen3.8-Flash-Next and LTX-2.5** — expect faster, more efficient multimodal inference.

---

> ✅ **Final Takeaway**: The infrastructure landscape is no longer about raw inference speed alone. It’s about **intelligent, reliable, agent-aware execution across diverse hardware** — where performance, stability, and developer experience converge. The future belongs to platforms that unify these dimensions.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-13

---

### **1. Today's Highlights**  
vLLM continues its aggressive optimization momentum with key PRs improving speculative decoding startup latency and Mamba kernel efficiency, while AMD ROCm support sees targeted performance enhancements for Qwen3.8 series models on MI355X/MI325X. Critical stability fixes were merged to address CUDA graph deadlocks under MoE + LoRA workloads and NaN detection in logits.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, notable changes are underway:  
- `--mamba-cache-mode` is now deprecated and has no effect (#60043).  
- The `VLLM_COMPUTE_NANS_IN_LOGITS` environment variable is being replaced by a CLI flag (`--enable-detect-nans-in-logits`) for better configuration clarity (#50283).

---

### **3. New Model & Hardware Support**  
- ✅ **New Model**: Added native support for **Cloudflare/clef-flash** via `/v1/systemone`, leveraging the Qwen3.5 backbone and joint schema head (#61308).  
- 📌 **ROCm (AMD)**:  
  - Performance optimization tracking launched for **Qwen3.8-Flash-Next-Quark-MXFP4** on gfx950 / MI355X (#59575).  
  - Fused QK-norm+RoPE+gate Triton kernel enabled for Qwen3-Next/Qwen3.5 on ROCm (#51406).  
- 🔧 **Hardware/Backend**:  
  - SM8x (Ampere: A100/A800, RTX 30xx) support requested for **DeepSeek-V4-Flash-0731** (#50576).  
  - Continued focus on **MI325X (gfx942)** stability and performance for GLM-5.3 and Qwen3.8 models (#57429, #58688).

---

### **4. Performance & Optimization**  
- ⚡ **Speculative Decoding**: Warm-up of top-k/top-p and greedy rejection kernels now supported on CUDA, reducing first-request latency (#59260).  
- 🔥 **Kernel Fusion**:  
  - Mamba block-table gather fused into a single Triton kernel — **7x speedup** across all shapes (#58737).  
  - DFlash draft-input padding parallelized — saves up to **35.8μs/step** per workgroup (#58633).  
- 📈 **Quantization**:  
  - Per-forward NVFP4 precision selection (W4A4/W4A16) introduced for routed experts on SM120/SM121, optimizing for decode throughput vs. memory bandwidth (#54617).  
  - FlashInfer NVFP4 KV cache causal prefill ~1.7–1.8x slower than FP8 on SM120 — flagged as a regression (#50416).  
- 🛠️ **Build & Tooling**:  
  - DeepGEMM vendored version updated to latest public release (26/09/30), including paged sparse MQA relaxations (#61149).  

---

### **5. Stability & Regressions**  
- ❌ **Critical**:  
  - **CUDA Graph deadlock** when using fully-sharded LoRA with MoE models under tensor parallelism (TP=2/4) — reproducible with Qwen3.5-compatible 35B-A3B MoE (#60845). *Fix pending*.  
- ⚠️ **High Severity**:  
  - **DeepSeek-V4.1-Flash** crashes with illegal memory access in `dsv4_topk` MoE kernel under high concurrency on H20 (SM90); mitigated by `max_num_seqs=256` (#56389).  
  - **GLM-5.3-Flash** engine hangs silently on MI325X during aiter fused MoE step; no error logs — likely hardware-specific hang (#57429).  
- ⚠️ **Medium**:  
  - `HIT_PENDING` lacks deadline, leading to stalled writes blocking requests until client timeout (#49829).  
  - `--mamba-block-size` ignored after removal of `mamba_cache_mode="all"` (#60838).  
  - `Qwen3.8-Flash-Next-FP8` fails to load on ROCm due to missing `weight_scale` in AMD’s embedding layer (#58688).

---

### **6. What This Means for Application Developers**  
- **Use `--enable-detect-nans-in-logits`** to proactively detect and abort bad inference requests — critical for production agents relying on deterministic outputs.  
- **Avoid `--mamba-cache-mode`**; it’s deprecated and has no effect. Use newer caching strategies instead.  
- **For high-concurrency deployments**, monitor `max_num_seqs` limits — especially with DeepSeek-V4.1 or MoE models on H20/MI325X.  
- **Expect improved speculative decoding startup times** with recent PRs — ideal for low-latency agent workflows.  
- **Validate model compatibility early** — new models like Clef-Flash or Qwen3.8-Flash-Next may require specific ROCm or CUDA configurations.  
- **Monitor nightly CI results** — AMD GPU regressions are actively tracked, but some issues (e.g., Qwen3.8-Flash-Next-FP8 load failure) remain unresolved.

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [PRs](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-13**

---

### **1. Today's Highlights**  
The SGLang project continues rapid momentum in **prefill-decode disaggregation (PD)** and **DeepSeek V4.1/Flash support**, with key PRs enabling colocated prefill CP + decode TP for GLM-5.3-Flash and advancing multi-stage speculative decoding optimizations. Critical stability fixes were merged for DSpark and FlashInfer JIT crashes, while new RFCs lay the groundwork for monokernels and improved diffusion serving.

---

### **2. Releases & Breaking Changes**  
*None.* No new releases or breaking API/config changes reported in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash**: Added support for colocated prefill context parallelism (CP) and decode attention tensor parallelism (TP) via `#43972` (draft), targeting MTP and DFlash2 backends.  
- ✅ **MiniCPM-V 4.7**: Cookbook added (`#43829`) to guide deployment of this emerging vision-language model.  
- ✅ **NPU Support**: Expanded `prefill-complete` functionality on Ascend NPU (`#43970`) and full prefill graph support on XPU (`#30980`).  
- 🚧 **AMD ROCm**: Ongoing work on HiCache performance (`#34611`) and FP8 GEMM accuracy issues (`#43526`), with recent fixes for DSV4.1 sparse decode (`#43765`).

---

### **4. Performance & Optimization**  
- 🔥 **Speculative Decoding**: Optimizations underway for EAGLE spec-decode KV index building (`#42803`) to reduce latency at long contexts (90k–170k tokens).  
- ⚙️ **DeepSeek V4.1**: Fused small-batch decode kernels now enabled at TP2 (`#43838`), improving efficiency without requiring TP4.  
- 📈 **LoRA Stack Completion**: Final phase of the LoRA runtime stack landed (`#42888`, `#42887`, `#42885`, `#42884`, `#42883`), adding NVFP4 MoE LoRA on Marlin, FP8 tile tables for B200/GB300/H200, and CuTeDSL BF16/GEMMs — critical for low-bit inference on Blackwell.  
- 🔄 **Monokernel Framework**: RFC introduced (`#43949`) to unify kernel execution across layers, aiming for persistent kernel reuse and reduced launch overhead.

---

### **5. Stability & Regressions**  
- ❌ **Critical Crash**: Speculative decoding crashes server on first non-greedy request due to FlashInfer JIT failure in pip-installed bundles (`#43412`). *Fix pending.*  
- ❌ **Memory Corruption**: DSpark compact ragged CUDA Graph uses incompatible request-slot geometry (`#34384`).  
- ❌ **Runtime Error**: `--bf16-gemm-backend gemv` is accepted but unused for unquantized linear layers (`#42085`).  
- ❌ **Model-Specific Crash**: DeepSeekV4TokenToKVPool lacks `get_cpu_copy()` → decode-mode retract fails (`#33385`).  
- ⚠️ **Flaky CI**: Persistent test failures observed in NVIDIA `PR Test Base/Extra` runs (`#42752`) — impacting PR validation velocity.

---

### **6. What This Means for Application Developers**  
- **Agentic Workloads**: Expect better KV cache reuse and predictability with programmatic cache control (`#27574`) and position-independent reuse (`#30928`) as they mature.  
- **High-Throughput Serving**: Use `--disaggregation-mode decode` with confidence — PD is now stable across most models, including SWA, HiCache, and speculative decoding.  
- **Multi-Modal & Diffusion**: Watch for Q4 roadmap updates (`#43313`) — MiniMax-H3 will be a stress test for lossless/lossy diffusion serving.  
- **Production Readiness**: Avoid `--speculative-algorithm DSPARK` with non-greedy sampling until `#43412` is resolved; prefer greedy paths in staging.  
- **New Models**: Deploy GLM-5.3-Flash with CP+TP colocation (`#43972`) and MiniCPM-V 4.7 using the new cookbook (`#43829`).

👉 [View Top Issues](https://github.com/sgl-project/sglang/issues?q=is%3Aissue+sort%3Aupdated-desc) | [Latest PRs](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+sort%3Aupdated-desc)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-13**

---

### **1. Today's Highlights**  
The `llama.cpp` project has seen significant progress in **VLLM D3 model support** and **multi-sequence speculative decoding fixes**, enabling better compatibility with next-generation decision models like `pplx-decider`. Critical stability improvements were merged for Metal, Vulkan, and CUDA backends—particularly around tensor kernel correctness, memory allocation, and compute graph re-allocation during inference.

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published in the last 24 hours. However, several **critical bugfixes** have been merged into mainline:

- **Fix for VLLM D3 multi-sequence case** (`#30408`) resolves incorrect behavior when combining non-causal attention with hybrid decoding and multiple sequences.
- **KV cache padding fix for no-cache attention** (`#30416`) ensures proper alignment for flash attention kernels on large head sizes (e.g., 512), preventing crashes on CUDA.
- **Compute graph reallocation reporting** (`#30329`) adds optional callback support via `ggml_backend_sched_realloc_callback`, allowing users to monitor buffer growth during long-running inference sessions.

> 🔗 [PR #30408](https://github.com/ggml-org/llama.cpp/pull/30408) | [PR #30416](https://github.com/ggml-org/llama.cpp/pull/30416) | [PR #30329](https://github.com/ggml-org/llama.cpp/pull/30329)

---

### **3. New Model & Hardware Support**  
- ✅ **VLLM D3 Models**: Full support added for `pplx-decider` and other D3-series models via `model: support vllm d3 models` (`#30383`). This enables integration with advanced reasoning pipelines using draft models.
- ✅ **Metal Backend Fixes**: Resolved `kernel_mul_mm` errors on large tensors (`#28748`) and duplicate ID handling in `mul_mat_id` (`#30373`), improving reliability on Apple Silicon.
- ✅ **Vulkan Optimization**: Introduced FMA packing for f16 accumulation without dot product ops (`#29877`), enhancing performance on supported devices.
- ✅ **Hexagon Backend Enhancements**: Added support for Q1_0 quantization (`#30122`), optimized CPY/CONCAT operations (`#30341`), and configurable HTP power modes (`#30423`).

> 🔗 [PR #30383](https://github.com/ggml-org/llama.cpp/pull/30383) | [PR #28748](https://github.com/ggml-org/llama.cpp/pull/28748) | [PR #29877](https://github.com/ggml-org/llama.cpp/pull/29877) | [PR #30122](https://github.com/ggml-org/llama.cpp/pull/30122)

---

### **4. Performance & Optimization**  
- 🚀 **Q2_K GPU Spill Fix** (`#29910`): Reduced VGPR spills on AMD GPUs by optimizing unrolling strategy, improving throughput for low-bit quantizations.
- ⚡ **AMX Q4_K Decode Speedup (+13% TG)** (`#30429`): Rewrote column-walking logic in Q4_K kernel to broadcast activation dwords directly across columns, boosting decode speed on AMX-capable CPUs.
- 🔍 **Vulkan RMS Norm Optimization** (`#29882`): Replaced workgroup reduction with two-stage subgroup reductions, showing measurable gains on Intel Arc B70, RTX 4060 Ti, and AMD 7900 XT.
- 💡 **OpenVINO Release Improvements** (`#30324`, `#30401`): CI now builds OpenVINO variants with `GGML_NATIVE=OFF` and correct download links, ensuring CPU-compatible binaries and stable release distribution.

> 🔗 [PR #29910](https://github.com/ggml-org/llama.cpp/pull/29910) | [PR #30429](https://github.com/ggml-org/llama.cpp/pull/30429) | [PR #29882](https://github.com/ggml-org/llama.cpp/pull/29882) | [PR #30324](https://github.com/ggml-org/llama.cpp/pull/30324)

---

### **5. Stability & Regressions**  
Critical issues reported today include:

| Issue | Severity | Status | Fix PR? | Link |
|------|----------|--------|---------|------|
| **Flash Attention crash on Vulkan** due to O(N²) fallback (`#27638`) | ⚠️ High | Open | ❌ | [Issue #27638](https://github.com/ggml-org/llama.cpp/issues/27638) |
| **CUDA graphs hang GPU channel (RTX 5090 Laptop)** (`#27330`) | 🔥 Critical | Open | ✅ Workaround: `GGML_CUDA_DISABLE_GRAPHS=1` | [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) |
| **Vulkan `ErrorDeviceLost` on submission failure** (`#30010`) | ⚠️ High | Open | ❌ | [Issue #30010](https://github.com/ggml-org/llama.cpp/issues/30010) |
| **Metal `mul_mat_id` fails with duplicate expert IDs** (`#30373`) | ⚠️ Medium | Fixed | ✅ Merged | [PR #30373](https://github.com/ggml-org/llama.cpp/pull/30373) |
| **Multi-GPU MTP prompt processing halved** (`#27428`) | ⚠️ Medium | Open | ❌ | [Issue #27428](https://github.com/ggml-org/llama.cpp/issues/27428) |

> Note: Several high-impact bugs are still open but have known workarounds or partial fixes.

---

### **6. What This Means for Application Developers**  
- **Use `--spec-type mtp` safely with D3 models**: With recent merges, you can now run speculative decoding with `pplx-decider` and other D3 models without correctness issues in multi-sequence scenarios.
- **Monitor memory usage via `realloc_callback`**: Enable `ggml_backend_sched_set_realloc_callback()` to detect buffer overflows early—essential for long-running agents or batched inference servers.
- **Avoid CUDA graph hangs on RTX 5090 laptops**: Until a permanent fix lands, use `GGML_CUDA_DISABLE_GRAPHS=1` to prevent GPU lockups.
- **Optimize for AMX/Q4_K and AMD Q2_K**: The latest kernel optimizations deliver tangible gains—especially for embedding/reranking pipelines where logits are unused.
- **Expect improved cross-backend consistency**: Vulkan, Metal, and OpenVINO are converging on robustness, making it easier to deploy unified inference stacks across platforms.

> ✅ **Recommendation**: Update to latest mainline (b11577+) for stability and new model support. Use `--cache-ram` cautiously—known race conditions persist under concurrent load (`#27148`).

---  
📌 **Project Home**: [https://llama.app](https://llama.app)  
📌 **Latest Attestations**: [GitHub Attestations](https://github.com/ggml-org/llama.cpp/attestations/)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-13**

---

### **1. Today's Highlights**  
The latest release, `v0.40.4-rc0`, brings critical updates to llama.cpp (b11521), enhancing decision model and EmbeddingGemma 2 support, while improving inference route efficiency via manifest reuse. Multiple high-severity stability issues—particularly MLX kernel panics on Apple Silicon and CUDA memory access errors on RTX 5090—are actively being addressed in PRs and issue reports.

---

### **2. Releases & Breaking Changes**  
- **`v0.40.4-rc0`**:  
  - Upgrades `llama.cpp` to commit `b11521`, enabling improved support for **decision models** and **EmbeddingGemma 2**.  
  - Introduces **manifest reuse optimization** in inference routes (`server: reuse verified manifests and loaded models`), reducing redundant model loading overhead.  
  - *Migration Note*: Users of large-scale MLX or cloud models should test compatibility with `qwen3.6:35b-mlx` and `gemma4` variants due to active regressions (see Stability).  
  🔗 [Release Notes](https://github.com/ollama/ollama/releases/tag/v0.40.4-rc0)

---

### **3. New Model & Hardware Support**  
- **New Models**:  
  - Added experimental support for **EmbeddingGemma 2** via updated `llama.cpp`.  
  - PR #18967 introduces **Prism ternary GGUF** support (PQ2_0/PTQ1_0 types), resolving import failures for models like `Ternary-Bonsai-2-27B-gguf`.  
- **Hardware & Backend**:  
  - Ongoing work to support **K2 Horizon** models (architecture `k2-horizon`) via Issue #18698 — requested by MBZUAI IFM.  
  - Cloud backend now includes new **Clef** and **Clef Flash** models (PR #18969).  
  - MLX runner continues to expand support for Apple Silicon (M-series) and hybrid architectures.

---

### **4. Performance & Optimization**  
- **Performance Regression Alert**:  
  Issue #18968 reports a **25–30% drop in throughput** across all models post `v0.40.1`, with lower tokens/sec observed in benchmarks. This is under investigation.  
- **Kernel-Level Optimizations**:  
  - PR #18964 improves prompt timing accuracy by rate-limiting based on *evaluated* tokens, fixing inflated `prompt_per_second` values during warm cache scenarios.  
  - PR #18973 fixes multimodal embedding load errors with small `num_ctx` values (e.g., 30), preventing 500 errors by adjusting batch sizing from actual model context (≥2048).  
- **Memory Efficiency**:  
  PR #18975 explores structured output improvements for tool calls, aiming to reduce unnecessary state bloat in grammar-based responses.

---

### **5. Stability & Regressions**  
**Critical Regressions (High Severity)**:  
1. **MLX Kernel Panic on Apple Silicon (M-series)**:  
   - `panic: mlx: Maximum threads per threadgroup is 896 but requested 960` (Issue #18966, #18940).  
   - Affects `qwen3.8:27b`, `gemma4:31b`, and other large-head models on M2 Max/M3 Ultra.  
   - **Fix in Progress**: PR #18974 targets JSON state prompt alignment; PR #18967 may resolve underlying kernel limits.  
   🔗 [Issue #18966](https://github.com/ollama/ollama/issues/18966) | 🔗 [PR #18974](https://github.com/ollama/ollama/pull/18974)  

2. **CUDA Illegal Memory Access on RTX 5090 (Windows)**:  
   - Consistent crash during prompt evaluation with Cohere MoE models (Issue #18642).  
   - No fix yet; likely tied to new GPU driver/CUDA stack interaction.  
   🔗 [Issue #18642](https://github.com/ollama/ollama/issues/18642)  

3. **MLX Runner Crash with `qwen3.6:35b-mlx` (Regression)**:  
   - Fails in `v0.40.x` but works in `v0.35.0` (Issue #18856).  
   - Suggests recent MLX runtime changes introduced breaking behavior.  
   🔗 [Issue #18856](https://github.com/ollama/ollama/issues/18856)  

**Other Notable Issues**:  
- Windows `ollama list` fails on NTFS mount points (Issue #18921); fixed in PR #18949.  
- Cloud model JSON schema ignored (Issue #12362); affecting `qwen3-coder:480b-cloud`.  
- Tool calls fail when `format: json` is set (Issue #18944).

---

### **6. What This Means for Application Developers**  
- **Avoid `v0.40.4-rc0` if using MLX on Apple Silicon** — expect crashes with large models (`qwen3`, `gemma4`). Downgrade to `v0.35.1` temporarily if needed.  
- **Validate tool call workflows** — `format: json` currently breaks tool usage (Issue #18944); use `tool_calls` without `format` until fixed.  
- **Monitor performance degradation** — if your app relies on high-throughput inference, benchmark against `v0.40.1` and avoid `v0.40.4-rc0` until regression is resolved.  
- **Prepare for cloud model schema compliance** — ensure client-side validation for `qwen3-coder:480b-cloud` and similar, as schema enforcement is inconsistent.  
- **Use `OLLAMA_KEEP_ALIVE=-1` + pre-warming** — consider feature request #18952 for instant first-response latency in production agents.

> ✅ **Action Item**: Check PRs #18975 (tool calls), #18974 (MLX JSON), and #18964 (timing) for upcoming fixes. Follow issue #18968 for performance updates.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-13**

---

### **1. Today's Highlights**  
The LiteLLM project continues to strengthen its core inference and cost management capabilities with critical fixes to billing accuracy, particularly around Gemini context caching and Azure Claude web search pricing. New PRs introduce robust cost parity testing across gpt-6 and Claude 5 bridge paths, ensuring consistent billing between proxy and native API calls. Additionally, a key fix addresses the silent failure of non-standard SSE error codes in streaming responses, improving reliability for downstream agent systems.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, ongoing work includes:  
- **Cost parity testing expansion**: New `BridgeCostParityTestCase` pairs added for gpt-6, Claude 5, and Bedrock Converse models via PRs [#46139](https://github.com/BerriAI/litellm/pull/46139), [#46140](https://github.com/BerriAI/litellm/pull/46140), [#46141](https://github.com/BerriAI/litellm/pull/46141), and [#46137](https://github.com/BerriAI/litellm/pull/46137). These ensure that bridged `/v1/messages` → `/v1/responses` routes bill identically to native endpoints.  
- **Billing correction**: PR [#46144](https://github.com/BerriAI/litellm/pull/46144) ensures context cache creation tokens are now billed from cachedContents responses, fixing underbilling in Gemini/Vertex AI workflows.

---

### **3. New Model & Hardware Support**  
*No new model or hardware support was introduced today.*  
But notable progress:  
- **AWS Bedrock autodiscovery** is under active development (Issue #43568), aiming to auto-discover available Bedrock models without manual configuration.  
- **Claude Code per-turn control support** is being refined; PRs like [#46047](https://github.com/BerriAI/litellm/pull/46047) address streaming errors when backend chunks omit `choices[].index`, enabling more reliable tool use in agentic flows.

---

### **4. Performance & Optimization**  
*No direct throughput or latency improvements were landed today.*  
However, significant optimization work is underway:  
- **Cost tracking precision**: The addition of `store_batch_line_items_in_callbacks` (PR #41691) enables retention of per-request JSONL data even after provider-side batch file expiration, improving auditability and cost attribution.  
- **Tracing fidelity**: PR [#42079](https://github.com/BerriAI/litellm/pull/42079) adds W3C `traceresponse` headers to traced responses, allowing developers to correlate request spans with gateway-level traces via standard OpenTelemetry tools.

---

### **5. Stability & Regressions**  
Top stability concerns reported today:  

1. **Gemini 3 temperature injection bug** (Issue #45333):  
   - `VertexGeminiConfig` forces `temperature=1.0` on all Gemini 3 models even when omitted, which Google will reject on future models.  
   - ✅ **Fix in progress**: PR #38663 already addressed this for some cases; further refinements expected.  
   [GitHub Issue](https://github.com/BerriAI/litellm/issues/45333)

2. **Redis SSL check_hostname crash** (Issue #34614):  
   - v1.93.0 fails with `TypeError: AbstractConnection.__init__() got an unexpected keyword argument 'ssl_check_hostname'`.  
   - ❗ **High severity**: Blocks Redis-based caching and budgeting.  
   - 🔧 **Workaround**: Downgrade to v1.92.0 or patch manually until fix lands.  
   [GitHub Issue](https://github.com/BerriAI/litellm/issues/34614)

3. **Streaming 500s due to NoneType + int** (Issue #46047):  
   - Occurs when backend chunk omits `choices[].index`, leading to runtime crashes during stream termination.  
   - ✅ **Fix PR pending**: PR #46047 aims to handle missing indices gracefully.  
   [GitHub Issue](https://github.com/BerriAI/litellm/issues/46047)

---

### **6. What This Means for Application Developers**  
- **Ensure cost accuracy**: If using Gemini context caching or Azure Claude web searches, update to the latest version to avoid underbilling (see PR #46144, #46135).  
- **Avoid Redis failures**: If using Redis for caching or budgeting, avoid v1.93.0 until the `ssl_check_hostname` issue is resolved (track PR #34614).  
- **Build resilient agents**: Use the new `BridgeCostParityTestCase` suite as a reference to validate your own deployment’s billing consistency—especially for gpt-6 and Claude 5 models.  
- **Improve observability**: Leverage the new W3C `traceresponse` header (PR #42079) to trace requests end-to-end across proxy and provider layers.  
- **Watch for agent-specific regressions**: If using Claude Code or MCP tools, monitor issues like #46093 (websearch_interception leaking parallel slots) and #46134 (progress loss on cancellation).

> 💡 *Pro tip*: Enable `budget_fallbacks` and test with `max_parallel_requests` limits early—issues like #33074 and #46093 highlight how resource exhaustion can silently break workflows.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-13**

---

#### **1. Today's Highlights**  
The latest v0.1.906-beta release introduces **browser agent capabilities** enabling models to interact with web pages via clicks, typing, scrolling, and script execution—unlocking real-time automation and tool use. Qwen-Image-2.1-Turbo is now natively supported with **8-step image generation**, while performance gains include faster MoE GGUF inference and speculative decoding on M-series hardware.

---

#### **2. Releases & Breaking Changes**  
- **v0.1.906-beta**:  
  - ✅ **Browser Agent (beta)**: Models can now perform mouse actions (click, drag), type, scroll, and run JavaScript via `browser_click(x, y)` and `run_script()`. [PR #13505](https://github.com/unslothai/unsloth/pull/13505)  
  - 📌 **Qwen-Image-2.1-Turbo**: Native support with 8-step image generation; resolves prior misclassification issues. [Issue #13328](https://github.com/unslothai/unsloth/issues/13328)  
  - 🔧 **Speculative Decoding**: Enabled on M-series chips for faster token generation.  
  - ⚙️ **Faster MoE GGUFs**: Optimized kernel scheduling improves throughput by ~22% on high-MoE models.  

> *No breaking API changes in this release.*

---

#### **3. New Model & Hardware Support**  
- **Models**:  
  - ✅ **Qwen-Image-2.1-Turbo** (GGUF): Fully integrated into image generation pipeline.  
  - ✅ **LTX-2.5 FP8/INT8**: Loads from pre-quantized DiTs (`unsloth/LTX-2.5-FP8`) instead of re-quantizing at load. [PR #13516](https://github.com/unslothai/unsloth/pull/13516)  
  - ✅ **Ling 3.0**: Feature request open ([#8532](https://github.com/unslothai/unsloth/issues/8532)) — expected in upcoming Studio update.  
- **Hardware & Backends**:  
  - ✅ **ROCm (AMD)**: Improved VRAM management; fixes model unloading issues ([#10341](https://github.com/unslothai/unsloth/issues/10341)).  
  - ✅ **M-series (Apple Silicon)**: Speculative decoding enabled; enhanced CPU offload handling.  
  - ✅ **Wayland (Linux)**: AppImage window resize fixed ([#13485](https://github.com/unslothai/unsloth/issues/13485)).  

---

#### **4. Performance & Optimization**  
- **MoE GGUF Inference**: Up to **22% faster** through optimized kernel dispatch and memory coalescing.  
- **Speculative Decoding**: Now available on M-series CPUs; reduces latency by **~30%** during high-throughput generation.  
- **Text-Diffusion Training**: New training mode enables fine-tuning diffusion models with text prompts; supports hybrid latent-text loss.  
- **Memory Management**: vLLM cache release now correctly triggered on NPU/XPU devices ([PR #13438](https://github.com/unslothai/unsloth/pull/13438)).  

---

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |  
|---------|------|--------|--------|  
| 🔴 High | **OOM on Qwen2.5 72B 4bit (32K context)** | Closed | [Issue #2937](https://github.com/unslothai/unsloth/issues/2937) – workaround: reduce context or use gradient checkpointing. |  
| 🔴 High | **`UNSLOTH_RETURN_LOGITS` reset to "0" during training** | Closed | [Issue #3071](https://github.com/unslothai/unsloth/issues/3071) – fix pending confirmation. |  
| 🟡 Medium | **Desktop App crashes on "New Chat" (Index out of bounds)** | Closed | [Issue #10288](https://github.com/unslothai/unsloth/issues/10288) – likely race condition in state sync. |  
| 🟡 Medium | **Drag & Drop broken in Desktop App** | Open | [Issue #13473](https://github.com/unslothai/unsloth/issues/13473) – no fix yet. |  
| 🟡 Medium | **Audio.cpp partial downloads fail silently** | Fixed | [PR #13515](https://github.com/unslothai/unsloth/pull/13515) – now handles cancellations and fallbacks. |  

---

#### **6. What This Means for Application Developers**  
- **Build AI Agents with Web Interaction**: Use the new browser agent to create agents that automate form filling, navigation, and dynamic content extraction—ideal for research, customer service bots, or data harvesting tools.  
- **Optimize for Edge Devices**: Leverage M-series speculative decoding and ROCm optimizations for low-latency inference on Apple Silicon and AMD GPUs.  
- **Avoid Hidden Pitfalls**: Be cautious with `UNSLOTH_RETURN_LOGITS`—it may be reset during training; validate environment setup early.  
- **Future-Proof Your Stack**: Monitor Ling 3.0 and LTX-2.5 integrations—these will expand multimodal agent capabilities in next-gen apps.  
- **Use Local Model Folders**: With `--models-dir` support ([PR #13435](https://github.com/unslothai/unsloth/pull/13435)), deploy custom model repos without Hugging Face dependency.  

> 💡 *Pro Tip*: For high-context tasks (>20K tokens), prefer Qwen3 over Qwen2.5 due to improved memory management and reduced OOM risk.  

---  
*Digest generated from GitHub data: [unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*