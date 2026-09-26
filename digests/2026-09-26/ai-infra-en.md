# AI Infrastructure Digest 2026-09-26

> Generated: 2026-09-26 00:51 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-26**

---

### **1. Ecosystem Overview**

The AI infrastructure landscape in Q3 2026 is defined by a sharp bifurcation between **high-performance, low-latency serving engines** and **developer-friendly, cross-platform runtime gateways**, with strong momentum toward hardware diversity and agent-native design. vLLM and SGLang lead in kernel-level optimization and speculative decoding maturity, targeting large-scale inference at sub-millisecond latencies. Meanwhile, Ollama and LiteLLM are rapidly evolving into unified application platforms—blending local execution, cloud APIs, and structured output support for agentic workflows. Unsloth and llama.cpp continue to push boundaries on non-CUDA hardware (AMD, Apple Silicon), enabling broader deployment across edge and heterogeneous environments.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑) | PRs Merged (↑) | Releases (↑) | Key Status |
|---------------|------------------|------------------|----------------|------------|
| **vLLM**      | 87               | 45               | None           | Stable, high-velocity optimization |
| **SGLang**    | 112              | 38               | None           | High instability; CI health concerns |
| **llama.cpp** | 142              | 31               | 4 (b11192+)    | Active stability fixes, backend expansion |
| **Ollama**    | 108              | 29               | v0.40.0-rc0    | Major feature release; critical regressions |
| **LiteLLM**   | 96               | 41               | 4 (dev/stable) | High security & cost accuracy focus |
| **Unsloth**   | 131              | 27               | None           | Strong AMD/Vulkan focus, training instability |

> ✅ *Note: All projects show sustained activity, but only Ollama and llama.cpp released updates recently.*

---

### **3. Model Support Race**

| New Model / Architecture         | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1 (Flash)**        | ✅ (PRs #58132, #58678) | ✅ (Issue #40877) | ❌ | ⚠️ (cloud-only) | ❌ | ❌ |
| **Qwen3.8-2.4T-A95B-Quark-MXFP4** | ✅ (Issue #57149) | ⚠️ (in progress) | ❌ | ✅ (MLX native) | ❌ | ❌ |
| **Gemma3n**                      | ❌ | ✅ (PR #41295) | ❌ | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1 GGUF**          | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (fixes underway) |
| **Gemini Live Avatar**           | ❌ | ❌ | ❌ | ❌ | ✅ (PR #43166) | ❌ |
| **MXFP4 MoE / LoRA**             | ✅ (PR #58634) | ✅ (PR #41292) | ❌ | ❌ | ❌ | ✅ (PR #11929) |

**Leader**: **vLLM** leads in cutting-edge model support, particularly for DeepSeek-V4.1 and MXFP4 quantization.  
**Differentiator**: **LiteLLM** is uniquely ahead in multimodal API integration (Gemini Live Avatar).  
**Emerging Edge**: **Unsloth** is building strong support for GGUF-based vision models and AMD-specific variants.

---

### **4. Performance Frontier**

Optimization efforts are now hyper-specialized:

| Focus Area                | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------------------|------|--------|-----------|--------|---------|---------|
| **Kernel Fusion**         | ✅✅ (SM120, Mamba, DSv4.1) | ✅ (Gemma3n, DSV4.1) | ✅ (VNNI, A8 OpenCL) | ✅ (CUDA porting) | ❌ | ❌ |
| **KV Cache Optimization** | ✅✅ (KVPP proposal, GDN metadata) | ✅ (HiCache, PD admission) | ❌ | ❌ | ❌ | ✅ (memory planning fix) |
| **Speculative Decoding**  | ✅✅ (MRV2 stabilization, draft verification) | ✅ (DCP, logical token tracking) | ❌ | ❌ | ❌ | ✅ (benchmarks page) |
| **Distributed Serving**   | ✅ (Multi-group MLA, SP fusions) | ✅ (DCP, interleave CP) | ❌ | ❌ | ❌ | ❌ |
| **Quantization & Precision** | ✅ (MXFP8, FP8, SWA replay) | ✅ (FP4 indexer, num_warps tuning) | ✅ (BF16→FP32 chunking) | ✅ (MLX prefix cache) | ✅ (cost accuracy) | ✅ (Hadamard rotation) |

**Dominant Trends**:  
- **vLLM** dominates kernel-level fusion and speculative decoding robustness.  
- **SGLang** focuses on scalable context parallelism and hybrid model pipelines.  
- **Unsloth** emphasizes memory-aware planning and dynamic compilation efficiency.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Role Summary |
|---------------|------------------------------------|-------------|
| **vLLM**      | **Inference Engine**               | Low-level, GPU-optimized engine for high-throughput, low-latency serving. Targets datacenter-scale LLM deployments. |
| **SGLang**    | **Inference Engine + Runtime**     | Combines engine capabilities with advanced scheduling (DCP, hybrid SSM/Mamba), ideal for complex agent workflows. |
| **llama.cpp** | **Local Runtime / Portable Backend** | CPU/GPU-accelerated inference with broad hardware support (Metal, Vulkan, HIP); targets edge and offline use cases. |
| **Ollama**    | **Gateway + Local Runtime**        | Developer-first platform combining CLI, GUI, MLX/CUDA backends, and OpenAI-compatible API — bridges local and cloud. |
| **LiteLLM**   | **API Gateway / Orchestrator**     | Aggregates providers, enforces cost/rate limits, enables routing, encryption, and observability — central to multi-provider production systems. |
| **Unsloth**   | **Fine-tuning + Multi-Engine Runtime** | Focused on training (QLoRA), model loading, and runtime flexibility (vLLM/SGLang integration), with strong AMD/ROCm focus. |

> 🔍 **Strategic Insight**: The ecosystem is maturing into **specialized layers**: engines (vLLM/SGLang), runtimes (llama.cpp), gateways (LiteLLM/Ollama), and training tools (Unsloth).

---

### **6. Trend Signals**

**Key Industry Trends Extracted from Today’s Activity**:

1. **Hardware Diversification is Now Mainstream**  
   - AMD ROCm (MI300X/MI355X), Apple Silicon (MLX), Intel SYCL, and Vulkan are no longer experimental. Projects like Unsloth, Ollama, and llama.cpp are actively shipping fixes and optimizations for these backends—signaling that CUDA is no longer the sole path.

2. **Agent-Native Features Are Becoming Standard**  
   - Structured outputs (tool calling), streaming logprobs, deterministic inference (`batch_invariant`), and reasoning budgets are now core concerns. vLLM, SGLang, and Ollama all prioritize reliability in stateful, multi-step agent flows.

3. **Cost Accuracy and Security Are Non-Negotiable**  
   - LiteLLM’s focus on encrypted secrets at rest, accurate pricing, and fallback logic reflects growing pressure for compliance and financial accountability in production AI systems.

4. **Performance Is No Longer Just About Speed — It’s About Predictability**  
   - Kernel fusions, memory planning, and JIT warmup gaps (e.g., `TRITON_CACHE_DIR`) are now first-class concerns. Developers must manage not just latency, but variance and startup overhead.

5. **Open Source Is Driving Innovation in Multimodality and Vision**  
   - Gemini Live Avatar (LiteLLM), Qwen-Image-2.1 (Unsloth), and vision-capable cloud models (Ollama) indicate rapid adoption of image/audio agents — pushing infrastructure to handle richer modalities.

---

### **Recommendations for Application Developers**

- **For high-performance agents**: Use **vLLM** with `batch_invariant=1` and `VLLM_ROCM_USE_AITER=1` for reproducible, low-latency inference on NVIDIA/AMD.
- **For cross-hardware apps**: Leverage **Unsloth**’s vLLM/SGLang integration or **llama.cpp**’s Metal/Vulkan support to deploy on Apple Silicon or AMD GPUs.
- **For production APIs**: Choose **LiteLLM** as your gateway layer to ensure cost tracking, security, and provider routing.
- **For agent workflows**: Avoid `deepseek-v4.1-flash:cloud` (image loss) and `max_tokens` bugs in Ollama v0.40.0-rc0 until stable. Pin to `v0.39.2` if needed.
- **Monitor emerging patterns**: Watch for **context parallelism (DCP)** and **structured output stability** — they’re key to scaling real-world agents.

> 📌 **Bottom Line**: The infrastructure stack is no longer monolithic. Choose your layer wisely — performance, portability, and agent readiness are now distinct axes of engineering excellence.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-26

---

### **1. Today's Highlights**

The vLLM project continues to advance speculative decoding and structured output robustness, with critical PRs stabilizing MRV2’s draft verification logic and fixing logprobs handling across streaming continuations. Key performance work on DeepSeek-V4.1 (DSv4.1) includes kernel fusion optimizations reducing decode latency by up to 7× and improved offloading for multi-group MLA models. Meanwhile, the Rust frontend reaches feature parity milestone tracking is underway, signaling growing maturity of non-Python integrations.

---

### **2. Releases & Breaking Changes**

No new releases in the past 24 hours.  
**Notable configuration changes:**  
- `VLLM_BATCH_INVARIANT=1` now correctly disables sequence parallelism and communication fusions (PR #56377), resolving a long-standing correctness issue in deterministic inference workflows.  
- The `--tool-call-parser qwen3_coder` behavior changed between v0.22 and v0.23 (Issue #46493), requiring users to validate tool-calling outputs when upgrading.

> 🔗 [PR #56377](https://github.com/vllm-project/vllm/pull/56377) | 🔗 [Issue #46493](https://github.com/vllm-project/vllm/issues/46493)

---

### **3. New Model & Hardware Support**

- **New model support**:  
  - **DeepSeek-V4.1 (Flash)**: Decoder-side SWA bounded replay (PR #58132) enables efficient prefill reuse; Engram wkv projection sharding (PR #58678) improves TP scalability.
  - **Qwen3.8-2.4T-A95B-Quark-MXFP4 (AMD)**: Performance optimization tracker initiated for gfx950 / MI355X (Issue #57149).

- **Hardware & backend**:
  - **ROCm (AMD)**: Active tuning for CDNA-based GPUs (MI300X/MI355X); `ROCM_AITER_FA` selection now respects `VLLM_ROCM_USE_AITER=1` (Issue #46596).
  - **NVIDIA Blackwell (SM120)**: FP8 issues resolved for Kimi K2.7 (Issue #46721).
  - **Multi-modality**: Thread pool improvements proposed to bypass GIL bottleneck in preprocessing (Issue #58266).

> 🔗 [PR #58132](https://github.com/vllm-project/vllm/pull/58132) | 🔗 [Issue #57149](https://github.com/vllm-project/vllm/issues/57149) | 🔗 [Issue #46596](https://github.com/vllm-project/vllm/issues/46596)

---

### **4. Performance & Optimization**

- **Kernel-level speedups**:
  - Mamba `align` block-table gather fused into one Triton kernel → **6× faster** across all shapes (PR #58737).
  - DeepSeek-V4.1: WO-A + inverse RoPE + MXFP8 quant fused on SM100/SM103 → **~11–12 µs saved per decode step** (PR #58634).
  - GDN metadata build optimized: **~11 µs/step removed from host dispatch** (PR #58732).

- **System-level optimizations**:
  - KV pipeline parallel (KVPP) proposal introduced for layer-wise KV cache ownership (Issue #58329), promising better scaling for large MoE models.
  - Structured output parsing stability enhanced via parser caching and stable tool call IDs (Issue #57571).

> 🔗 [PR #58737](https://github.com/vllm-project/vllm/pull/58737) | 🔗 [PR #58634](https://github.com/vllm-project/vllm/pull/58634) | 🔗 [Issue #58329](https://github.com/vllm-project/vllm/issues/58329)

---

### **5. Stability & Regressions**

| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| High | #58784 | MRV2 rejects draft slots never proposed — can lead to invalid speculation | ✅ PR submitted |
| High | #57447 / #57790 | Logprobs lost or stale during streaming input continuations | ✅ PRs merged |
| Medium | #58485 | V1 thinking budget corrupts reasoning_end_str under speculative decoding | ❌ Open |
| Medium | #55005 | CPU spec-decode consumes uninitialized memory due to type mismatch | ❌ Open |
| Low | #57839 | Watermarking detector doesn’t support dual_key_gumbel; alpha mismatch | ⚠️ Minor |

> 🔗 [PR #58784](https://github.com/vllm-project/vllm/pull/58784) | 🔗 [PR #57447](https://github.com/vllm-project/vllm/pull/57447) | 🔗 [Issue #58485](https://github.com/vllm-project/vllm/issues/58485)

---

### **6. What This Means for Application Developers**

- **Use `batch_invariant` safely**: With `VLLM_BATCH_INVARIANT=1`, you can now rely on deterministic inference without hidden SP/comm fusions causing drift — crucial for agent evaluation and reproducibility.
- **Streaming agents**: Fixes to logprobs and tool call ID stability (PRs #57447, #57790) ensure reliable stateful streaming responses — essential for multi-step reasoning and tool calling.
- **Performance-sensitive apps**: Leverage DSv4.1 kernel fusions and Mamba optimizations for sub-millisecond decode latencies. Consider enabling `VLLM_ROCM_USE_AITER=1` on CDNA hardware for better attention performance.
- **Rust integration**: The experimental Rust frontend (Issue #44280) is nearing parity — ideal for low-latency, high-throughput services where Python overhead is prohibitive.

> 📌 Pro Tip: Monitor `TRITON_CACHE_DIR` for JIT warmup gaps (PR #58559) in production deployments — first-request latency may be higher than expected.

---  
*Digest generated: 2026-09-26 | Source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-26

---

### **1. Today's Highlights**  
SGLang continues its aggressive optimization for next-gen models and hardware, with major progress on DeepSeek-V4.1 performance tuning and context parallelism (DCP) infrastructure. Critical stability fixes were merged for Qwen3.8-Flash-Next and GLM-5.3-Flash, while new PRs target kernel-level optimizations for Gemma3n and Hopper-based inference. CI health remains a focus, with ongoing efforts to stabilize test pipelines.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours.  
No breaking changes or migration notes introduced.  
*Note: v0.5.19 remains the latest stable release; users should monitor #17050 for ongoing CI reliability.*

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1-Flash**: Active development and field testing on 8× RTX PRO 6000 (SM120, PCIe-only) — see [Issue #40877](https://github.com/sgl-project/sglang/issues/40877) for validated configurations and throughput data.  
- **Apple Silicon (MPS/Metal)**: Ongoing work to fix memory detection (`get_device_memory_capacity()` missing MPS path), leading to prefill OOMs — see [Issue #39675](https://github.com/sgl-project/sglang/issues/39675).  
- **AMD ROCm**: Progress on DSV4.1 AMD kernels including KV cache layouts, FP4 indexer, and compressor/router logic — see [PR #41019](https://github.com/sgl-project/sglang/pull/41019).  
- **MLX Backend**: Continued support for Hunyuan and Qwen3 VL, though issues persist around adapter loading and auto-mapping — see [Issue #32521](https://github.com/sgl-project/sglang/issues/32521).

---

### **4. Performance & Optimization**  
- **Gemma3n**: Optimized shared-KV attention by skipping unused K/V computation; avoids dummy key allocation on supported CUDA RoPE kernels — see [PR #41295](https://github.com/sgl-project/sglang/pull/41295).  
- **DeepSeek-V4.1**: Kernel fusion improvements for ratio-2 decode pooling + RMSNorm on SM90; targets 2–3x decode speedups — see [PR #41294](https://github.com/sgl-project/sglang/pull/41294).  
- **MXFP4 MoE**: Tuned `num_warps` in Triton kernels for better utilization on SM89 (RTX 4090), resolving ~6x decode slowdown — see [PR #41292](https://github.com/sgl-project/sglang/pull/41292).  
- **Context Parallelism (DCP)**: Enhanced logical token capacity tracking for PD admission and load reporting — see [PR #39731](https://github.com/sgl-project/sglang/pull/39731).  
- **Hybrid Mamba/SSM**: HiCache dynamic storage backend now supports hierarchical caching; earlier crash due to `cudaHostRegister` failure has been flagged — see [Issue #40926](https://github.com/sgl-project/sglang/issues/40926).

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| 🔴 High | [Issue #36537](https://github.com/sgl-project/sglang/issues/36537) | Qwen3.8-Flash-Next thinking + tool parser loops on token ID 0 | Closed — patch applied |
| 🔴 High | [Issue #36531](https://github.com/sgl-project/sglang/issues/36531) | QSA fallback selects incompatible FA4 path on SM120 | Closed — resolved |
| 🟡 Medium | [Issue #37712](https://github.com/sgl-project/sglang/issues/37712) | GLM-5.3-Flash: CUDA OOM in fp8_mqa_logits during long-context prefill | Open — affects TP ranks |
| 🟡 Medium | [Issue #40926](https://github.com/sgl-project/sglang/issues/40926) | HiCache + hybrid SSM/Mamba fails on secondary host pool, kills instance | Open — critical for production use |
| 🟡 Medium | [Issue #36532](https://github.com/sgl-project/sglang/issues/36532) | FlashInfer GDN state dtype conflict on SM120 | Closed — fixed |
| 🟡 Low | [Issue #41211](https://github.com/sgl-project/sglang/issues/41211) | MLX: `return_logprob` returns empty logprobs without sampling enabled → 500 error | Open — impacts scoring APIs |

---

### **6. What This Means for Application Developers**  
- **For high-throughput agents**: Use `--enable-prefill-cp --cp-strategy interleave` cautiously — known crashes on DeepSeek-V4-Flash-FP8 (v0.5.16); upgrade to latest version.  
- **For long-context apps**: Avoid `--page-size > 1` until #32475 is fixed — KV metrics misreport block capacity as token capacity.  
- **For Apple Silicon developers**: Expect instability in memory management; avoid `mem_fraction_static` defaults that default to 0.95 if no device memory detected — see #39675.  
- **For model-specific workflows**: Ensure `--kv-cache-dtype fp8_e4m3` is used with compatible backends — inconsistent checks are being tracked in #31774.  
- **For speculative decoding**: Verify draft model shard selection via RunAI — #32507 shows current loader downloads all shards unnecessarily.  

> 💡 **Pro Tip**: Monitor CI status via [Issue #17050](https://github.com/sgl-project/sglang/issues/17050) before merging into production — 1 broken, 7 flaky tests reported as of 2026-09-26.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-26**

---

### **1. Today's Highlights**  
The latest release cycle focuses on robustness and performance across diverse backends, with critical fixes for Metal, Vulkan, and HIP platforms. Notably, a high-severity bug affecting Japanese transcript accuracy in LFM2 audio has been resolved via improved numerical stability in the mel preprocessor. Additionally, new OpenCL kernels for A8 Q5_K quantization and enhanced SYCL support improve low-level hardware utilization.

---

### **2. Releases & Breaking Changes**  
- **`b11192`**: Updated `cpp-httplib` to v0.58.0 (#29407) — minor dependency update with no breaking changes.  
- **`b11191`**: Fixed `fs_create_directory_with_parents()` on Windows for Unicode paths; now correctly handles trailing separators (#29432).  
- **`b11188`**: Resolved Vulkan build failure on legacy glslc versions lacking `cooperativeMatrix` support via `GGML_VULKAN_COOPMAT_GLSLC_SUPPORT` macro check (#29409).  
- **`b11185`**: Extracted shared Unicode path/string helpers into common utilities (#29415), improving maintainability.

> 🔗 [GitHub Releases](https://github.com/ggml-org/llama.cpp/releases)

---

### **3. New Model & Hardware Support**  
- **New model support**: Added initial support for **Limite 1B - Violetto** (#29433) and **GraniteSpeech5ForCTC (Turbo CTC)** — an encoder-only non-autoregressive model for speech processing (#29446).  
- **Hardware/backend enhancements**:  
  - Added **OpenCL binary kernels** for A8 Q5_K non-MoE and dp4a variants (`kernel_gemm_noshuffle_q5_k_f32_32b_trans_ila_a8_bin`, etc.) (#29401).  
  - Enhanced **Metal FWHT** support for block widths >512, enabling wider FFT operations (#29095).  
  - **SYCL**: Improved oneAPI toolkit version in CI (2026.1) and fixed DNNL flag reporting (#29447, #29273).  
  - **HIP**: Bumped required `HIP_VERSION` for FP8 support to avoid missing `__hip_fp8_e4m3` symbol (#29231).

> 🔗 [PR #29433](https://github.com/ggml-org/llama.cpp/pull/29433) | [PR #29446](https://github.com/ggml-org/llama.cpp/pull/29446) | [PR #29401](https://github.com/ggml-org/llama.cpp/pull/29401)

---

### **4. Performance & Optimization**  
- **CPU**: Tiled `mul_mat` for k-quants using VNNI shows **3–7x speedup** on compatible CPUs (#27851).  
- **Metal**: Split FA kernels into per-dtype libraries to reduce binary size and improve runtime dispatch efficiency (#29329).  
- **Vulkan**: Intel prefill FA kernel added for improved performance on Intel GPUs (#29357).  
- **Memory**: Introduced `--repack` option in `llama-bench` to align tooling with `llama-cli`, enabling better cross-backend benchmarking (#28968).  
- **Precision**: Experimental BF16/FP16 → FP32 chunking reduces VRAM usage while maintaining performance gains on gfx906 (Radeon VII) (#29442).

> 🔗 [PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851) | [PR #29357](https://github.com/ggml-org/llama.cpp/pull/29357) | [PR #29442](https://github.com/ggml-org/llama.cpp/pull/29442)

---

### **5. Stability & Regressions**  
- **Critical**: Fixed **incorrect greedy transcripts in LFM2 audio** due to improper log floor clamping — affected **4.5% English**, **6.5% Japanese** utterances (#29403).  
- **High severity**: Multiple **HIP/ROCm regressions** reported:  
  - Wrong logits on long prompts (`n_ubatch`) — bisected to recent flash attention changes (#28211).  
  - Response corruption under parallel load (`-np 4 --kv-unified`) on integrated gfx1151 GPU (#25992).  
  - Silent server stoppage when `/metrics` is scraped by VictoriaMetrics (#29104).  
- **CUDA**: Persistent OOM issues with MTP draft contexts on ROCm, reducing fitted context size unnecessarily (#26038).  
- **Build**: Vulkan fails on older glslc without `GL_KHR_cooperative_matrix` — workaround added via macro check (#29373).

> 🔗 [Issue #29403](https://github.com/ggml-org/llama.cpp/issues/29403) | [Issue #28211](https://github.com/ggml-org/llama.cpp/issues/28211) | [Issue #25992](https://github.com/ggml-org/llama.cpp/issues/25992)

---

### **6. What This Means for Application Developers**  
- **Use `b11192+`** to avoid known crashes and correctness bugs, especially if deploying on **HIP/Metal/Vulkan** or handling **long audio inputs** (LFM2).  
- Leverage **new OpenCL kernels** for A8 Q5_K models on GPU-accelerated inference — expect improved throughput on supported hardware.  
- For **low-latency CPU inference**, enable tiled `mul_mat` via `GGML_CPU_TILED=1` (if available in your build).  
- If using **SYCL**, ensure you're on oneAPI 2026.1 or later; verify `GGML_SYCL_DNNL` behavior via updated build banners.  
- Avoid `-np 4 --kv-unified` on AMD integrated GPUs until #25992 is patched — current behavior risks data leakage between requests.  

> ✅ Recommended: Always test model-specific behaviors (e.g., `--kv-unified`, `--n_ubatch`) under realistic load conditions.  
> 🔗 [Stability Issues](https://github.com/ggml-org/llama.cpp/issues?q=is%3Aissue+is%3Aopen+label%3Abug-unconfirmed) | [Feature Requests](https://github.com/ggml-org/llama.cpp/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-26**

---

### **1. Today's Highlights**  
Ollama v0.40.0-rc0 introduces automatic MLX runtime usage on Apple Silicon, marking a major step toward native performance for models like `qwen3.8` and `gemma4`. This release also addresses critical stability issues in macOS GUI streaming and cloud model behavior, while ongoing work focuses on expanding hardware support and fixing OpenAI-compatible API limitations.

---

### **2. Releases & Breaking Changes**  
- **v0.40.0-rc0**: Now defaults to **MLX backend on Apple Silicon** for supported models (e.g., `qwen3.8`, `gemma4`). No configuration change required — models automatically leverage Metal-accelerated inference.
  - [GitHub Release](https://github.com/ollama/ollama/releases/tag/v0.40.0-rc0)
- **OpenAI-Compatible Endpoint Fixes**:  
  - PR #18656 (merged) resolves the `rand.Intn(999)` ID collision issue in `/v1/chat/completions` responses by switching to UUIDs.  
    [PR #18656](https://github.com/ollama/ollama/pull/18656)  
  - PR #18648 ensures disk-full errors during `ollama pull` are properly propagated instead of being masked as network timeouts.  
    [PR #18648](https://github.com/ollama/ollama/pull/18648)

---

### **3. New Model & Hardware Support**  
- **Apple Silicon (MLX)**: Full integration now enabled by default for MLX-supported models (`qwen3.8`, `gemma4`, etc.) on M-series chips.  
  - MLX runtime now handles CUDA fallback logic via shared payloads (PR #17956).  
- **Intel GPU (SYCL/oneAPI)**: Proposal (#16930) and implementation effort (#17621) continue to advance; opt-in support is under development for Arc/Battlemage GPUs.  
  - [Feature Request #16930](https://github.com/ollama/ollama/issues/16930), [PR #17621](https://github.com/ollama/ollama/pull/17621)  
- **Cloud Models**: `deepseek-v4.1-flash:cloud` still exhibits silent image input discard despite claiming `vision` capability (regression of #18527).  
  - [Issue #18637](https://github.com/ollama/ollama/issues/18637)  

---

### **4. Performance & Optimization**  
- **MLX Prefix Cache Memory Overhead**: Fixed 8 GiB hard cap causes heavy swap on 32 GB Macs during agent workflows (PR #18131).  
  - Current workaround: manual tuning via `MLX_PREFIX_CACHE_SIZE` environment variable.  
  - [Issue #18131](https://github.com/ollama/ollama/issues/18131)  
- **CUDA Kernel Porting**: PR #18657 ports Metal custom kernels (e.g., `mamba2_scan`, `depthwise_conv_silu`) to CUDA for improved performance on NVIDIA cards.  
  - Addresses suboptimal graph-based fallbacks.  
  - [PR #18657](https://github.com/ollama/ollama/pull/18657)  
- **Model Parsing Efficiency**: PR #18649 fixes parser rejection of valid tool calls due to trailing tokens after `}`.  
  - Critical for agent workflows using structured outputs.  
  - [PR #18649](https://github.com/ollama/ollama/pull/18649)  

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Status | Fix PR |
|--------|------|--------|--------|--------|
| 🔴 High | `deepseek-v4.1-flash:cloud` silently discards images despite reporting `vision` support | Breaks multimodal agents | Open (Regression) | [Issue #18637](https://github.com/ollama/ollama/issues/18637) |
| 🔴 High | macOS GUI chat fails silently after 60s prefill (no stream notification) | Agent workflows stall | Open | [PR #18654](https://github.com/ollama/ollama/pull/18654) |
| 🟡 Medium | `/v1/chat/completions` ignores `max_tokens` and overrides `num_predict` | Unbounded generation risk | Open | [Issue #18575](https://github.com/ollama/ollama/issues/18575) |
| 🟡 Medium | `qwen3.8`'s `think: "high"`/`"max"` ignored — runs default `medium` | Incorrect reasoning level | Open | [Issue #18632](https://github.com/ollama/ollama/issues/18632) |
| 🔴 High | CUDA illegal memory access on RTX 5090 with Cohere MoE models | Crashes server | Open | [Issue #18642](https://github.com/ollama/ollama/issues/18642) |
| 🔴 High | Windows CUDA discovery fails on Blackwell (RTX 50-series) with driver 616.92 | Falls back to CPU | Open | [Issue #18581](https://github.com/ollama/ollama/issues/18581) |

---

### **6. What This Means for Application Developers**  
- **Apple Silicon Users**: Expect significantly faster inference for `qwen3.8`, `gemma4`, and other MLX-compatible models without config changes. Monitor memory usage—prefix cache can trigger swap on 32GB systems.  
- **Agent Builders**: Be cautious with `tool` calls—valid JSON tool responses may be rejected if they contain trailing noise (fix pending in #18649). Also verify that `think: "high"`/`"max"` values are respected (currently ignored).  
- **Cloud/API Developers**: Avoid `deepseek-v4.1-flash:cloud` for vision tasks until fix is released. Use UUID-based response IDs in proxies (enable via #18656).  
- **Infrastructure Teams**: Watch for unbounded generation (`max_tokens` ignored) and consider patching with local Modelfile edits or middleware layer.  
- **Future-Proofing**: Track Intel SYCL support (PR #17621) and System 1 model proposals (Issue #18594) for next-gen agentic flexibility.

> ✅ **Recommendation**: For production agents, pin to `v0.39.2` or earlier until `v0.40.0` stabilizes, especially on macOS or cloud deployments.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-26**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem saw a flurry of critical fixes and feature enhancements, particularly around cost accuracy, security, and observability. Key updates include: **fixes for incorrect pricing in Fireworks AI and Azure AI models**, **enhanced encryption of guardrail and router secrets at rest**, and **improved handling of streaming errors and rate-limiting fallbacks**. A major PR introduces support for **Gemini Live Avatar (avatar_config)** in real-time Gemini/Vertex integrations, expanding multimodal capabilities.

---

### **2. Releases & Breaking Changes**  
- **v1.104.0-dev.2**, **v1.100.3**, **v1.99.4**, **v1.98.1** released in the last 24h.  
- All Docker images are now signed with [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) using a consistent key — verify via `cosign verify` for security compliance.  
- No breaking API changes reported; upgrades are backward-compatible.  

> 🔗 [GitHub Release Notes](https://github.com/BerriAI/litellm/releases)

---

### **3. New Model & Hardware Support**  
- ✅ **Gemini Live Avatar (avatar_config / customized_avatar)** added via PR [#43166](https://github.com/BerriAI/litellm/pull/43166) — enables lip-synced talking-head video avatars in real-time sessions.  
- ✅ **Sail** added as a supported provider with `completion_window` mapping via PR [#42840](https://github.com/BerriAI/litellm/pull/42840).  
- ✅ **OpenRouter’s `typesafe/jev-router`** now listed in cost map via PR [#43248](https://github.com/BerriAI/litellm/pull/43248), enabling cache-aware routing.  
- ✅ **Jev and Laya** added to Decision Model auto-router via PR [#43234](https://github.com/BerriAI/litellm/pull/43234).  

> 🔗 [Gemini Live Avatar PR](https://github.com/BerriAI/litellm/pull/43166) | [Sail Provider PR](https://github.com/BerriAI/litellm/pull/42840)

---

### **4. Performance & Optimization**  
- **Streaming performance improved**: PR [#43056](https://github.com/BerriAI/litellm/pull/43056) prevents upstream error stream buffering, reducing client stall time from ~12 seconds to immediate relay.  
- **Cost calculation precision restored**: PRs [#43253](https://github.com/BerriAI/litellm/pull/43253) and [#43254](https://github.com/BerriAI/litellm/pull/43254) correct underbilling for **Fireworks AI DeepSeek V4.1 Flash** and **Azure MAI-Image-2.5-Flash**, aligning spend logs with retail rates.  
- **HTTP client pooling refactored** via PR [#43245](https://github.com/BerriAI/litellm/pull/43245): all providers now use a shared `HttpClientPool`, improving connection reuse and config consistency across TLS, proxies, and timeouts.

---

### **5. Stability & Regressions**  
- **Critical Bug**: Router fallback returns `null` body on non-streaming timeout → fixed by PR [#43165](https://github.com/BerriAI/litellm/pull/43165).  
- **High Severity**: Redis cache fails with `ssl_check_hostname` error in v1.93.0 → tracked in issue [#34614](https://github.com/BerriAI/litellm/issues/34614); no fix yet.  
- **Regression**: Spend logs silently dropped since v1.99.0 due to `request_id="None"` collision → issue [#39749](https://github.com/BerriAI/litellm/issues/39749) confirmed; PR pending.  
- **Security Risk**: Guardrail API keys stored plaintext in Postgres → resolved by PR [#43255](https://github.com/BerriAI/litellm/pull/43255) (encrypt secrets at rest).  

> 🔗 [Failing Fallback PR](https://github.com/BerriAI/litellm/pull/43165) | [Redis SSL Bug](https://github.com/BerriAI/litellm/issues/34614)

---

### **6. What This Means for Application Developers**  
- **Use `v1.104.0-dev.2` or later** to ensure accurate cost tracking — especially if using Fireworks AI, Azure, or Databricks backends.  
- **Enable encrypted secrets at rest** via new `run-ci` PRs to meet compliance standards (e.g., SOC2, HIPAA).  
- **Leverage Gemini Live Avatar** in production workflows via `avatar_config` — ideal for interactive agents and customer-facing bots.  
- **Avoid `stream_chunk_size` input like `"sixty-four"`** — now validated early via PR [#43223](https://github.com/BerriAI/litellm/pull/43223).  
- **Monitor spending carefully** — `max_budget` enforcement is now stricter, especially for zero-cost models (issue [#29912](https://github.com/BerriAI/litellm/issues/29912)).

> 🔗 [Developer Guide: Cost Accuracy](https://docs.litellm.ai/docs/proxy/cost_tracking) | [Security Best Practices](https://docs.litellm.ai/docs/security)

---  
*Digest generated automatically from GitHub activity (2026-09-26).*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-26**

---

#### **1. Today's Highlights**  
The Unsloth team continues to expand AMD ROCm and Vulkan support with critical fixes for model loading, training stability, and GPU memory management on RDNA 1/2/3 cards. Key PRs include a new **Benchmarks page** in Studio for tuning speculative decoding and KV cache settings, and enhanced **multi-engine inference support (vLLM/SGLang)** via opt-in integration. Meanwhile, active issues highlight persistent problems with VRAM usage on AMD systems and crashes during QLoRA training.

---

#### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
- **PR #11808**: Introducing a **Benchmarks page** in Unsloth Studio to sweep speculative decoding, KV cache types, and RAM offload settings on loaded GGUF models. This enables users to empirically tune performance across configurations. [View PR](https://github.com/unslothai/unsloth/pull/11808)  
- **PR #11491**: Adding opt-in support for **vLLM and SGLang** as alternative inference engines in Studio, enabling multi-GPU serving, quantization, and vision model handling. No default installation; user-controlled. [View PR](https://github.com/unslothai/unsloth/pull/11491)

---

#### **3. New Model & Hardware Support**  
- **AMD ROCm 7.14 / 10**: Users request support for newer ROCm versions beyond 7.2 (e.g., ROCm 10), with issue #9932 calling for explicit version selection in installers. [Issue #9932](https://github.com/unslothai/unsloth/issues/9932)  
- **Vulkan Training**: Issue #11184 tracks demand for training/fine-tuning support via Vulkan backend, following community experiments. [Issue #11184](https://github.com/unslothai/unsloth/issues/11184)  
- **ModelScope Integration**: Studio now supports pulling models/datasets from **ModelScope** as an alternative to Hugging Face, useful in restricted networks. [PR #11761](https://github.com/unslothai/unsloth/pull/11761)  
- **Qwen-Image-2.1 GGUF**: Fixes underway for FP8 encoder load failures and incorrect model detection in Docker. [Issue #11638](https://github.com/unslothai/unsloth/issues/11638), [Issue #11890](https://github.com/unslothai/unsloth/issues/11890)

---

#### **4. Performance & Optimization**  
- **Memory Planning Fix**: PR #11922 improves image memory planning by sizing allocations based on *runtime dtype*, not disk size—critical for SDXL models that fit in 24GB VRAM when loaded in `bf16` but appear oversized in `fp32`. [PR #11922](https://github.com/unslothai/unsloth/pull/11922)  
- **Denoising Efficiency**: PR #11843 ensures image/video denoises run on a single render thread to preserve **cuDNN benchmark and SDPA execution caches**, reducing recompilation overhead. [PR #11843](https://github.com/unslothai/unsloth/pull/11843)  
- **Dynamic Compilation Optimization**: Multiple PRs (e.g., #11842, #11880) eliminate redundant recompilation of Qwen-Image and MiniMax-H3 pipelines on second prompt renders, cutting latency from 15–50 seconds. [PR #11842](https://github.com/unslothai/unsloth/pull/11842), [PR #11880](https://github.com/unslothai/unsloth/pull/11880)  
- **Hadamard Rotation for Accuracy**: PR #11835 applies Hadamard rotation to Qwen-Image-2.1’s int8 transformer, improving LPIPS score from 0.066 to match bf16 baseline (11 of 48 seed pairs >0.10 improved). [PR #11835](https://github.com/unslothai/unsloth/pull/11835)

---

#### **5. Stability & Regressions**  
Top severity issues reported today:  
1. **GPU Crashes During Training (AMD)**:  
   - Issue #11498: QLoRA training on RX 7900 XTX triggers **AMDGPU VM faults** and GPU resets. Reproducible even after updates. [Issue #11498](https://github.com/unslothai/unsloth/issues/11498)  
   - Issue #10563: 4-bit dequantize uses cached GPU stream, causing instability under dynamic stream changes. [Issue #10563](https://github.com/unslothai/unsloth/issues/10563)  
2. **Model Loading Failures on AMD**:  
   - Issue #9792: `Qwen3.8-27B V3 GGUF` crashes post-prefill on R9700 (Vulkan); V2 works. [Issue #9792](https://github.com/unslothai/unsloth/issues/9792)  
   - Issue #7449: Strix Halo (AMD APU) loads models into system RAM despite VRAM availability. GPU compute used, but no VRAM utilization. [Issue #7449](https://github.com/unslothai/unsloth/issues/7449)  
3. **Studio Server Crash on Image Gen**:  
   - Issue #9130: GPU kernel failure (`hipErrorLaunchFailure`) leads to uncaught C++ `terminate`, killing entire Studio server process. [Issue #9130](https://github.com/unslothai/unsloth/issues/9130)  

> ✅ **Fixes in Progress**: PR #11808 (benchmarks), #11984 (model pinning), and #11929 (MXFP4 LoRA) are being reviewed.

---

#### **6. What This Means for Application Developers**  
- **Build robust, cross-backend apps**: With vLLM/SGLang support and growing ROCm/Vulkan adoption, your app can now target **non-CUDA hardware** with minimal config changes. Use the new `--engine=vllm` or `--engine=sglang` flags.  
- **Tune inference dynamically**: The upcoming Benchmarks page will allow you to auto-sweep speculative decoding, KV cache type, and offload strategies—ideal for production deployment optimization.  
- **Avoid GPU instability**: If deploying on AMD (especially RDNA 1/2), avoid `4-bit dequantize` flows until PR #10563 is merged. Prefer `bnb-4bit` with `load_in_8bit` fallback.  
- **Handle large models carefully**: For image/video models like Qwen-Image-2.1, verify dtype alignment (e.g., `int8` vs `bf16`) to prevent memory overallocation and crashes.  
- **Leverage caching**: Design workflows to reuse denoising threads (via single-threaded rendering) to benefit from cuDNN and SDPA cache reuse—critical for real-time apps.

> 🔗 **Recommended Workflow**: Test all custom pipelines on AMD using ROCm 7.14+ and monitor for `VM fault` errors. Use `unsloth-zoo`'s packed experts for MXFP4 LoRA training only if `load_in_16bit` is unset. [PR #11929](https://github.com/unslothai/unsloth/pull/11929)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*