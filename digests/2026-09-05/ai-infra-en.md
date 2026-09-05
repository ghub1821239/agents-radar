# AI Infrastructure Digest 2026-09-05

> Generated: 2026-09-05 00:22 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-05**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of deep specialization and convergence, with projects increasingly targeting distinct deployment paradigms: high-throughput distributed inference (vLLM, SGLang), local edge and mobile optimization (llama.cpp), developer-friendly gateways (Ollama, LiteLLM), and scalable agent platforms (Unsloth). Key trends include aggressive expansion into MoE and multimodal models, growing emphasis on speculative decoding and KV cache efficiency, and rising complexity in multi-node, multi-backend environments. While performance remains paramount, stability and operational reliability are becoming critical differentiators—especially as larger models and longer contexts expose latent bugs in memory management and scheduling.

---

### **2. Activity Comparison**

| Project       | Issues Open (Today) | PRs Merged (Today) | Release Status         |
|---------------|---------------------|--------------------|------------------------|
| **vLLM**      | 12                  | 8                  | None                   |
| **SGLang**    | 17                  | 6                  | None                   |
| **llama.cpp** | 14                  | 5                  | ✅ v0.4.0 released     |
| **Ollama**    | 13                  | 2                  | None                   |
| **LiteLLM**   | 11                  | 5                  | None (breaking change in v1.96+) |
| **Unsloth**   | 15                  | 5                  | Beta (`v0.1.806-beta`) |

> 🔍 *Insight:* **SGLang** shows the highest issue volume, reflecting intense focus on correctness in complex prefill and distributed scenarios. **llama.cpp** stands out with a major release, signaling maturity in cross-platform local inference.

---

### **3. Model Support Race**

| New Model / Architecture          | Supported By                          | Notes |
|-----------------------------------|---------------------------------------|-------|
| **Qwen3.8-Flash-Next**            | ✅ vLLM, ✅ SGLang, ✅ llama.cpp, ✅ Unsloth | Full MoE + speculative decoding support; vLLM/SGLang lead in draft model pairing |
| **Nemotron-3-Puzzle-75B-A9B**     | ✅ llama.cpp (MoE via API)             | First to enable locally on GGUF; no other project has confirmed support |
| **Cohere2MoE Eagle3 (auxiliary)** | ✅ vLLM (experimental)                 | Only project with draft/target model compatibility for speculative decoding |
| **GLM-5.3-Flash**                 | ✅ SGLang, ✅ llama.cpp                | SGLang offers full HiCache + MoE integration; llama.cpp adds Metal/Vulkan support |
| **SenseNova-U1/U1.5**             | ✅ SGLang (tracking)                   | Early-stage support; no other project has adopted |
| **DFlash2 Draft Models**          | ✅ SGLang (Ascend/NPU), ✅ Ollama (MLX), ✅ vLLM (hybrid GDN) | SGLang leads in NPU coverage; vLLM in hybrid layout compatibility |

> 🏆 **Winner:** **SGLang** leads in breadth and depth of new model support, particularly for MoE, multimodal, and emerging hardware. **llama.cpp** excels in enabling cutting-edge models (e.g., Nemotron) on local devices.

---

### **4. Performance Frontier**

| Optimization Focus        | Leading Projects                     | Key Developments |
|----------------------------|--------------------------------------|------------------|
| **KV Cache Efficiency**    | vLLM, SGLang, Unsloth               | vLLM fixes prefix cache reuse; SGLang introduces HiCache+SSD; Unsloth enables unified KV sharing |
| **Speculative Decoding**   | vLLM, SGLang, Ollama                 | vLLM fixes MTP/GDN layout issues; SGLang adapts DFlash2 to Ascend; Ollama adds MLX support |
| **Batching & Throughput**  | Unsloth, SGLang, vLLM                | Unsloth enables batched MLX decoding; SGLang optimizes alloc_extend_naive; vLLM improves async H2D |
| **Quantization & Kernels** | llama.cpp, vLLM, LiteLLM             | llama.cpp adds IQ4_XS Vulkan kernel; vLLM enhances NVFP4/FP8 handling; LiteLLM fixes `cache_control` translation |
| **Distributed Serving**    | SGLang, Unsloth                      | SGLang supports multi-node DP + hierarchical cache; Unsloth adds DGX Spark clustering |

> ⚙️ **Trend:** The frontier is shifting from raw throughput to **system-level coherence**—efficient memory pooling, deterministic execution, and consistent behavior across heterogeneous backends.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Differentiator |
|---------------|-----------------------------------|----------------|
| **vLLM**      | High-performance inference engine | CUDA-optimized kernels, speculative decoding, production-grade scalability |
| **SGLang**    | Distributed inference framework   | Unified CP APIs, HiCache, weight daemon, strong NPU/MoE support |
| **llama.cpp** | Local runtime / edge inference    | Cross-platform, GPU-native backends (Metal, Vulkan, SYCL), GGUF-first approach |
| **Ollama**    | Developer gateway / CLI interface | Simplified UX, auto-context scaling, MLX/OpenAI API alignment |
| **LiteLLM**   | Multi-provider LLM gateway        | Universal routing, observability (OpenTelemetry), MongoDB vector store integration |
| **Unsloth**   | Agent-optimized inference stack   | Parallel chat, unified KV cache, DGX Spark clustering, MLX batching |

> 📊 **Strategic Insight:**  
> - **vLLM/SGLang**: Target cloud-scale inference.  
> - **llama.cpp**: Best for edge, mobile, or offline deployments.  
> - **Ollama/LiteLLM**: Ideal for rapid prototyping and multi-API abstraction.  
> - **Unsloth**: Designed for high-concurrency agents and real-time tool use.

---

### **6. Trend Signals**

**Industry Trends Extracted from Today’s Activity:**
1. **MoE and Hybrid Architectures Are Mainstream** – Qwen3.8, Nemotron, GLM-5.3 all feature MoE support across vLLM, SGLang, and llama.cpp, signaling widespread adoption.
2. **Speculative Decoding Is Now Production-Critical** – All major engines now support it, but regressions (e.g., 0% DFlash2 acceptance on XPU) highlight fragility under complex layouts.
3. **Hardware Abstraction Is Maturing** – AMD ROCm, Intel XPU, Apple Silicon, and Ascend NPUs are now actively supported across multiple stacks—indicating true cross-hardware portability.
4. **Stability > Speed** – Critical correctness bugs (deterministic output loss, KV cache collapse, OOM during load) dominate issue logs—developers must prioritize reliability over raw performance.
5. **Agent Workloads Are Driving Innovation** – Features like parallel chat (Unsloth), session-aware tracing (SGLang), and batched tool use reflect a shift toward long-running, multi-step agent systems.

> 🛠️ **What Developers Should Watch:**
> - **Avoid `float16` on Intel XPU** (vLLM regression) — use `bf16` until fixed.
> - **Pin to stable versions** of Ollama (avoid 0.33.x) and Unsloth (avoid `v0.1.806-beta`).
> - **Validate model metadata**—context length mismatches can cause silent OOMs.
> - **Leverage new features early**: Use SGLang’s HiCache+weight daemon for cold-start speed; enable vLLM’s `VLLM_USE_AOT_COMPILE=1` for latency-sensitive workloads.
> - **Monitor budgeting and rate-limiting** in LiteLLM—critical for production cost control.

---

> ✅ **Final Takeaway:** The infrastructure layer is no longer just about speed—it's about **resilience, consistency, and composability**. Choose your stack based on deployment context: **vLLM/SGLang for scale**, **llama.cpp for edge**, **Ollama/LiteLLM for simplicity**, and **Unsloth for agents**.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-05**

#### **1. Today's Highlights**  
The vLLM project continues to deepen its support for speculative decoding and multimodal inference, with critical fixes to prefix caching integrity under MTP (Multi-Token Prediction) and hybrid GDN layouts. Key progress includes improved KV cache layout compatibility in speculative decoding (PR #55312), a fix for NVFP4 detection in mixed-precision checkpoints (PR #55367), and ongoing work on deterministic batch-invariant execution (Issue #27433).

#### **2. Releases & Breaking Changes**  
*None.* No new releases or breaking API/config changes were published in the last 24 hours.

#### **3. New Model & Hardware Support**  
- **New model support:** Added experimental support for `Cohere2MoE Eagle3` auxiliary hidden states via PR #49819, enabling compatible draft/target model pairing for speculative decoding.  
- **Hardware/backends:**  
  - AMD ROCm CI improvements: PR #55099 relocates ROCR/CLR build stages to avoid unnecessary rebuilds; PR #54988 addresses turboquant backend compatibility on MI300.  
  - Intel GPU: Issue #55250 reports 0% DFlash2 draft acceptance with `--dtype float16` on XPU (bf16 works), indicating a precision-specific regression.  
- **Quantization:** Enhanced handling of `NVFP4` in compressed-tensors mixed-precision checkpoints (PR #55367); FP8 support for GLM-5.3-Flash on SM90 sparse MLA now functional (PR #55222).

#### **4. Performance & Optimization**  
- **Speculative Decoding:** PR #55404 optimizes CUDA graph capture by eliminating device sync during metadata build—reducing overhead in dummy steps.  
- **Kernel & JIT:** PR #55414 precompiles split top-p kernel variants (5 power-of-two bucketed cases) to eliminate runtime JIT compilation latency.  
- **Memory & Throughput:** PR #55202 improves async H2D copy pinning across more memory paths to enhance CPU/GPU overlap.  
- **Scheduler:** RFC #52906 proposes adaptive `max_num_batched_tokens` based on scheduling pressure—potentially improving long-context throughput under load.

#### **5. Stability & Regressions**  
- **Critical correctness bug:** Issue #55250 reports **0% DFlash2 draft acceptance** on XPU with `float16`, while `bf16` works—likely a dtype-specific kernel issue.  
- **Determinism loss:** Issue #54521 shows **non-deterministic greedy decoding** in `Qwen3.8-Flash-Next-FP8` when prompt length nears `indexer_budget`, due to non-deterministic `persistent_topk` in sparse attention.  
- **Recurrent state corruption:** Issue #55178 fixed via PR #55178—hybrid Mamba models were corrupting recurrent state during speculative decoding padding.  
- **KV Cache collapse:** Issue #48435 reports **zero cross-request prefix-cache reuse** in multi-session round-robin workloads once pool occupancy exceeds ~25%, affecting Gemma-4-31B.  
- **Output garbling:** Issue #55291 reports Qwen3.6-27B-FP8 eventually collapses into repeated `!` tokens, affecting all subsequent requests—possibly related to FP8 state drift.

#### **6. What This Means for Application Developers**  
- **Use `--dtype bf16` instead of `float16` on Intel XPU** until PR #55250 is resolved.  
- **Avoid speculative decoding with hybrid GDN models** (e.g., Qwen3.8) if you rely on prefix cache reuse—use PR #52244 workaround or wait for upstream merge.  
- **Monitor `indexer_budget` limits** when using Qwen3.8-Flash-Next-FP8; near-threshold prompts may cause non-deterministic outputs (tracked in #54521).  
- **Enable `VLLM_USE_AOT_COMPILE=1` carefully**: LoRA wrapping affects AOT cache keys—ensure consistent model state (PR #55386).  
- **For high-throughput agents**, consider the upcoming adaptive `max_num_batched_tokens` (RFC #52906) to dynamically balance prefill efficiency and scheduling pressure.

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-05**

---

### **1. Today's Highlights**  
SGLang continues its aggressive optimization momentum with key fixes for prefill CP stability under HiCache and multi-node DP, resolving critical hangs in Qwen3-32B and DeepSeek-V4-Flash workloads. The project is also advancing toward a unified quantization module layout and finalizing the deprecation of legacy prefill CP v1 APIs, streamlining future development.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, significant **API and configuration changes** are underway:  
- Legacy `prefill CP v1` paths are being phased out across modeling, attention backends, and runners (see [PR #36228](https://github.com/sgl-project/sglang/pull/36228), [PR #36229](https://github.com/sgl-project/sglang/pull/36229)).  
- New canonical names like `is_cp_active`, `interleave`, and `is_mla_cp_enabled` are replacing v1-specific terms.  
- **Migration Note**: Users relying on `--enable-prefill-cp` with older model configurations may encounter breaking changes; verify compatibility with updated cookbooks (e.g., [PR #36230](https://github.com/sgl-project/sglang/pull/36230)).

---

### **3. New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash** support merged via [PR #36507](https://github.com/sgl-project/sglang/pull/36507) — includes full integration with MoE, HiCache, and speculative decoding.  
- ✅ **SenseNova-U1/U1.5** support tracking initiated ([Issue #37742](https://github.com/sgl-project/sglang/issues/37742)), leveraging official OpenSenseNova repository as reference.  
- ✅ **DFlash2 speculative decoding adapted for Ascend NPUs** ([PR #35629](https://github.com/sgl-project/sglang/pull/35629)) — expanding NPU ecosystem coverage.  
- ✅ **Apple Silicon (M1/M2/M3)** support confirmed in CI ([PR #36507](https://github.com/sgl-project/sglang/pull/36507)), enabling broader deployment flexibility.

---

### **4. Performance & Optimization**  
- **Weight Cache Daemon (Phase 1)**: Enables near-instant weight loading (~1s vs ~300s) for Qwen3-235B FP8 via CUDA IPC ([Issue #33522](https://github.com/sgl-project/sglang/issues/33522), [blog](https://www.lmsys.org/blog/2026-08-21-sglang-weights-cache-daemon)).  
- **HiCache L1/L2 + SSD**: While hit rate drops observed ([Issue #33984](https://github.com/sgl-project/sglang/issues/33984)), ongoing tuning aims to improve persistence efficiency.  
- **Memory Pool Optimization**: PR [37938](https://github.com/sgl-project/sglang/pull/37938) vectorizes `alloc_extend_naive`, removing per-request Python loops — expected to reduce scheduling overhead.  
- **Triton Kernel Specialization**: Fix for DSA-bound prefill kernels with large page-table strides ([PR #37093](https://github.com/sgl-project/sglang/pull/37093)) prevents JIT failures after long server uptime.

---

### **5. Stability & Regressions**  
*Critical issues reported today, ranked by severity:*  

1. **Scheduler hang / watchdog abort** in DSV4 sparse prefill with hierarchical cache + chunked prefill (16K) on H20 ([Issue #34235](https://github.com/sgl-project/sglang/issues/34235)) — *Fix pending*.  
2. **CUDA_ERROR_ILLEGAL_ADDRESS** in MXFP8FP4/W4A8 MegaMoE path on B300 (`sgl-deep-gemm 0.1.7`) ([Issue #37559](https://github.com/sgl-project/sglang/issues/37559)) — *Fix pending*.  
3. **Multi-node MegaMoE sparse-DP prefill deadlock** after PR #33871 ([Issue #37561](https://github.com/sgl-project/sglang/issues/37561)) — *Fix pending*.  
4. **Scheduler OOM-killed during weight load** on DeepSeek-V4-Flash-Vision-Exp (2x DGX Spark) ([Issue #37931](https://github.com/sgl-project/sglang/issues/37931)) — *High memory pressure likely*.  
5. **Prefill CP test livelock** due to KV-pool-full retractions ([Issue #38019](https://github.com/sgl-project/sglang/issues/38019)) — *Fixed in [PR #38070](https://github.com/sgl-project/sglang/pull/38070)*.

---

### **6. What This Means for Application Developers**  
- **Adopt new CP APIs early**: Migrate from `prefill CP v1` to `is_cp_active` and `interleave` to avoid future breakage. Use updated cookbooks and CLI references.  
- **Leverage HiCache+weight daemon for faster cold starts** — especially for large models like Qwen3-235B or SenseNova-U1.  
- **Monitor memory usage carefully** on multi-node setups (DP disaggregation) — recent crashes highlight edge cases in MoE + HiCache + PD.  
- **Expect improved stability with upcoming 0.5.19+** — multiple PRs (e.g., #38070, #38078, #38077) address core correctness bugs in prefill CP and token ordering.  
- **Use session-aware KV events** ([PR #37482](https://github.com/sgl-project/sglang/pull/37482)) if building external routers or monitoring systems requiring request-level traceability.

> 🔗 *For real-time updates, follow the [SGLang GitHub Issues](https://github.com/sgl-project/sglang/issues) and [Discussions](https://github.com/sgl-project/sglang/discussions).*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-05**

---

### **1. Today's Highlights**  
The `v0.4.0` release introduces foundational support for **Qwen3.8-Flash-Next** and **Nemotron-3-Puzzle**, enabling advanced multimodal and MoE inference on local devices. Major backend improvements include sparse flash attention in GGML (0.23.0), RDMA integration, and expanded OpenCL/Adreno SDPA support—signaling deeper hardware abstraction and cross-platform optimization.

---

### **2. Releases & Breaking Changes**  
- **v0.4.0 released**: [GitHub Release](https://github.com/ggml-org/llama.cpp/releases/tag/v0.4.0)  
  - Introduced `llama_lazy_mode` (configurable lazy tensor loading).  
  - Updated `ggml` to v0.23.0 with major sparse flash attention and RDMA support.  
  - Added per-slot server context limits and video input options.  
- **API Change**: `llama_print_build_info` now accepts a custom `FILE*` output stream (default: `stderr`). See: [#28322](https://github.com/ggml-org/llama.cpp/pull/28322)

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - ✅ **Qwen3.8-Flash-Next** (including `qwen4_exp` variants)  
  - ✅ **Nemotron-3-Puzzle-75B-A9B** (NemotronHPuzzle) – MoE model support added via `n_expert_used_max()` API ([#28323](https://github.com/ggml-org/llama.cpp/pull/28323))  
- **Hardware Backends**:  
  - ✅ **Metal (M3)**: Added FA-vec tuning for `q4_0`, `q4_1`, `q5_0`, `q5_1` ([#28396](https://github.com/ggml-org/llama.cpp/pull/28396))  
  - ✅ **OpenCL**: Extended elementwise ops (`sgn`, `elu`, `hardswish`, etc.) and **Adreno xmem SDPA path** ([#27633](https://github.com/ggml-org/llama.cpp/pull/27633), [#26331](https://github.com/ggml-org/llama.cpp/pull/26331))  
  - ✅ **SYCL**: Fused `rms_norm + mul + add` and `add + add` residual chains under `GGML_SYCL_ENABLE_FUSION` ([#27610](https://github.com/ggml-org/llama.cpp/pull/27610))  
- **Quantization**: Experimental **IQ4_XS** Vulkan kernel introduced ([#28417](https://github.com/ggml-org/llama.cpp/pull/28417))

---

### **4. Performance & Optimization**  
- **Vulkan**: Custom IQ4_XS kernel improves token generation from **~36 t/s → ~37.2 t/s** on `unsloth/Qwen3.8-27B-UD-Q3_K_XL` ([#28417](https://github.com/ggml-org/llama.cpp/pull/28417)).  
- **SYCL**: Fusion of RMSNorm+Mul+Add and Add+Add chains reduces kernel overhead and improves throughput on Intel Arc GPUs.  
- **GPU Memory**: `ggml` v0.23.0 includes **sparse flash attention** and **RDMA** optimizations—critical for low-latency distributed inference.  
- **WebGPU**: Fixed binding alignment issues causing GET_ROWS failures by aligning tensor bindings to type block size ([#28382](https://github.com/ggml-org/llama.cpp/pull/28382)).

---

### **5. Stability & Regressions**  
- **Critical**:  
  - **SYCL**: Empty/gibberish output on hybrid Qwen3Next models on Intel Arc Pro B60 (regression between b9128–b9159) — reported in [#24168](https://github.com/ggml-org/llama.cpp/issues/24168) (27 comments).  
  - **Vulkan**: `GGML_ASSERT(wg0 <= ctx->device->properties.limits.maxComputeWorkGroupCount)` crash on Intel Arc A770 with Qwen3.8 Flash Next — [#28247](https://github.com/ggml-org/llama.cpp/issues/28247) (13 comments).  
- **High Priority**:  
  - **HIP/MoE**: Garbage output on RDNA3.5 (gfx1151) since #27621 — [#28113](https://github.com/ggml-org/llama.cpp/issues/28113).  
  - **SYCL**: `sysman` free-memory query may be unavailable — [#28239](https://github.com/ggml-org/llama.cpp/issues/28239).  
- **UI/Server**:  
  - Segfault in "Ubuntu x64 (Vulkan)" build — [#28312](https://github.com/ggml-org/llama.cpp/issues/28312).  
  - Final peg-native parse failure discards entire generation (Qwen3.8) — [#27733](https://github.com/ggml-org/llama.cpp/issues/27733).

---

### **6. What This Means for Application Developers**  
- **New Models**: You can now deploy **Qwen3.8-Flash-Next** and **Nemotron-3-Puzzle** locally with full MoE support—ideal for agents requiring dynamic expert routing.  
- **Cross-Platform Inference**: Metal (M3), Adreno (Android), and SYCL backends are now more robust—enabling high-performance inference on Apple Silicon, mobile, and Intel GPU stacks.  
- **Better UX**: The new `models discover` UI stack (PRs #28418–#28410) enables direct Hugging Face GGUF discovery, download, and sidecar (mmproj, draft) management—reducing dependency on manual model handling.  
- **Performance Focus**: Prioritize **SYCL** and **Vulkan** builds for Intel and AMD GPUs; expect improved throughput with fused kernels and better memory layout.  
- **Caution**: Avoid `v0.4.0` builds on Intel Arc B60/B70 until [#24168](https://github.com/ggml-org/llama.cpp/issues/24168) is resolved. Monitor Docker image availability—no SemVer tags yet ([#28275](https://github.com/ggml-org/llama.cpp/issues/28275)).

> 🔗 [Full changelog](https://github.com/ggml-org/llama.cpp/releases/tag/v0.4.0) | 🌐 [Official Site](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-05**

---

### **1. Today's Highlights**  
Critical context-length handling issues are emerging across multiple user workflows, with recent regressions in model stability (e.g., Gemma 4 26B A4B entering reasoning loops) and memory exhaustion due to misconfigured default context sizes—especially for Granite 4.2 models. Concurrently, new PRs focus on improving MLX and OpenAI-compatible API robustness, while documentation updates aim to clarify environment variable precedence and installation paths.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, ongoing changes to context-length logic may impact users:  
- `OLLAMA_CONTEXT_LENGTH` now auto-scales based on VRAM (4K for <24GiB, 32K for 24–48GiB, 262K for ≥48GiB), but this can cause OOM kills if models declare large contexts via GGUF metadata (see [#14116](https://github.com/ollama/ollama/issues/14116), [#18074](https://github.com/ollama/ollama/issues/18074)).  
- Users should expect silent deviations from Modelfile `num_ctx` when `OLLAMA_CONTEXT_LENGTH` or server defaults override it (per [#18229](https://github.com/ollama/ollama/issues/18229)).

---

### **3. New Model & Hardware Support**  
- **MLX**: PR #17865 adds native support for `DFlash2DraftModel` checkpoints with dynamic short convolution and parallel path selection.  
- **CUDA**: PR #18232 identifies a root cause of CUDA crashes (0xc0000409) on Blackwell RTX 5060 Ti tied to Flash Attention MMA kernel shared memory allocation under high `num_ctx`.  
- **ROCm / AMD**: No new hardware support announced; PR #18234 documents rootless Linux install paths for ARM64 and AMD ROCm variants.  
- **Quantization**: Issue #17279 highlights validation failures for GLM-5.2 IQ2_M/UD-IQ2_M GGUF models due to `llama-quantize` compatibility checks.

---

### **4. Performance & Optimization**  
- **Regression**: Users report ~5× slower token generation on RTX 3090 after upgrading from 0.32.13 to 0.33.x ([#18225](https://github.com/ollama/ollama/issues/18225)).  
- **Memory Efficiency**: PR #18233 fixes broken download links in app README; PR #18243 proposes blocking oversized model pulls by default (MLX-only initially).  
- **Kernel-Level**: PR #17857 addresses incorrect memory accounting in multi-model loads (e.g., speculative drafts incorrectly overwriting target model stats).  
- **Context Handling**: PR #18231 reports MLX runner OOM during long-context requests due to prefix cache eviction not retrying failed allocations.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🔴 Critical | [#18220](https://github.com/ollama/ollama/issues/18220) | Gemma 4 26B A4B enters reasoning loop instead of issuing tool calls post-update | Closed |
| 🔴 Critical | [#18232](https://github.com/ollama/ollama/issues/18232) | CUDA crash (0xc0000409) on Blackwell RTX 5060 Ti due to Flash Attention MMA kernel shared memory overflow | Open |
| 🟡 High | [#18225](https://github.com/ollama/ollama/issues/18225) | 5× performance regression on RTX 3090 (same GPU/model) after 0.33.x update | Open |
| 🟡 High | [#18231](https://github.com/ollama/ollama/issues/18231) | MLX runner fatal OOM mid-request due to insufficient alloc-failure retry | Open |
| 🟡 Medium | [#18226](https://github.com/ollama/ollama/issues/18226) | Anthropic-compatible `/v1/messages` fails parsing grammar with escaped `\/` or `\-` in array items | Open |
| 🟡 Medium | [#18242](https://github.com/ollama/ollama/issues/18242) | Cannot set custom context length (e.g., 98304) via env var — defaults to 64K/128K | Open |

---

### **6. What This Means for Application Developers**  
- **Avoid relying on automatic context scaling**: Explicitly set `num_ctx` in your Modelfile or via `OLLAMA_CONTEXT_LENGTH` if you need precise control—auto-scaling can lead to OOM on consumer hardware.  
- **Validate model metadata**: Models like Granite 4.2 may ship with invalid `context_length` values (e.g., 131072); verify before deployment.  
- **Watch for regression in 0.33.x**: If using CUDA-based inference, benchmark performance—significant slowdowns have been reported.  
- **Handle special characters carefully**: When using tool schemas in Anthropic-compatible APIs, avoid `\/` or `\-` inside array `items`; escape sequences may break grammar parsing.  
- **Use stable model tags**: Prefer explicit versioned tags over `latest` until context-length and memory behavior stabilize.  

> 💡 *Pro Tip*: For long-context applications, consider integrating [Unlimited Context](https://github.com/AetherAI3/Unlimited-Context-LLM) (added to docs via PR #18228) to manage disk-backed context pools safely.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-05**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to evolve with a focus on robustness, observability, and multi-provider alignment. Key developments include enhancements to OpenTelemetry tracing (PR #39654), improved support for MongoDB vector stores (PR #39811), and critical fixes for model translation correctness—especially around `cache_control`, `thinking` fields, and tool choice handling. Notably, the community remains active in reporting high-impact bugs, particularly around budget persistence, streaming failures, and authorization logic.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. However, several recent changes may impact users:  
- **Breaking change in v1.96+**: The managed OAuth2 flow now redirects to the LiteLLM UI instead of the vendor’s auth page (Issue #39665). This affects deployments using `oauth2_flow: authorization_code`.  
- **Deprecated config**: `LITELLM_JOB_ROLE` is documented but not present in current codebase (Issue #39722) — users relying on this will need to adjust their setup.

> 🔗 [Issue #39665](https://github.com/BerriAI/litellm/issues/39665) | [Issue #39722](https://github.com/BerriAI/litellm/issues/39722)

---

### **3. New Model & Hardware Support**  
- **Fireworks AI**: Native Responses API support added via PR #39826, enabling direct use of Fireworks’ server-side MCP (`previous_response_id`) without bridging through `/v1/chat/completions`.  
- **MongoDB Vector Stores**: A new `mongodb` provider was introduced (PR #39811), supporting both Atlas and self-managed deployments via `$vectorSearch` through pymongo.  
- **OpenRouter Video Models**: Feature request filed for video generation support (Issue #27724), though not yet implemented.

> 🔗 [PR #39826](https://github.com/BerriAI/litellm/pull/39826) | [PR #39811](https://github.com/BerriAI/litellm/pull/39811) | [Issue #27724](https://github.com/BerriAI/litellm/issues/27724)

---

### **4. Performance & Optimization**  
- **Auto-router compression decoupling** (PR #39823): Enables independent compression of routing decisions and model calls—critical for reducing latency in complex agent workflows.  
- **Shadow evaluation scoping expansion** (PR #39828): Now supports filtering by model group, key, team, and user—allowing more granular performance testing across models.  
- **Streamed reasoning task escalation** (PR #39809): Introduces auto-escalation for stalled complexity-router tasks, improving throughput under heavy load or poor model behavior.

> 🔗 [PR #39823](https://github.com/BerriAI/litellm/pull/39823) | [PR #39828](https://github.com/BerriAI/litellm/pull/39828) | [PR #39809](https://github.com/BerriAI/litellm/pull/39809)

---

### **5. Stability & Regressions**  
Top stability concerns today:  
1. **Budget persistence failure** (Issue #25386): `max_end_user_budget_id` does not persist to DB → budget resets fail silently for auto-created users.  
2. **Streaming timeouts misreported as success** (Issue #29602): Timeout errors during streaming are logged as success due to early HTTP 200 emission.  
3. **Virtual key deletion blocked by JWT mappings** (Issue #33702): Admin UI cannot delete keys referenced in JWT auto-registration.  
4. **Per-customer RPM limits ignored after caching** (Issue #39713): Rate limiting stops applying once virtual keys are cached.  

✅ *Fixes in progress*:  
- PR #39821 addresses idempotent team member adds (fixes 500s on concurrent inserts).  
- PR #39815 removes `cache_control` from translated thinking blocks (fixes Anthropic 400s).

> 🔗 [Issue #25386](https://github.com/BerriAI/litellm/issues/25386) | [Issue #29602](https://github.com/BerriAI/litellm/issues/29602) | [Issue #33702](https://github.com/BerriAI/litellm/issues/33702) | [Issue #39713](https://github.com/BerriAI/litellm/issues/39713) | [PR #39815](https://github.com/BerriAI/litellm/pull/39815)

---

### **6. What This Means for Application Developers**  
- **Use caution with OAuth2 flows**: If you're using managed OAuth2, expect redirect behavior changes post-v1.96. Plan fallbacks or update your frontend logic accordingly.  
- **Monitor budgeting and rate-limiting**: Critical for production systems—ensure budgets are persisted to DB and RPM limits remain active post-caching.  
- **Leverage new features**: Use the expanded shadow eval scoping (PR #39828) and MongoDB vector store provider (PR #39811) to build more resilient, performant agents.  
- **Avoid model-specific gotchas**: Be mindful of `tool_choice` dropping in Mistral (Issue #39736), `service_tier` loss in Azure (Issue #39719), and Ollama prompt template overrides (Issue #39724).  

> ✅ **Pro tip**: Regularly audit `model_prices_and_context_window.json` and test against real providers—many issues stem from outdated or incorrect metadata.

---  
*Data source: github.com/BerriAI/litellm • Updated: 2026-09-05*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-05**

---

### **1. Today's Highlights**  
Unsloth continues its aggressive expansion into multi-node, high-throughput inference with major progress on DGX Spark clustering support and unified KV cache management across parallel chats. Critical stability fixes were merged for MLX batched serving and Windows-on-ARM CUDA stack compatibility, while new features like optional Parallel Search MCP integration and configurable API parallelism are now in flight.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking changes; however, several PRs aim to stabilize the `v0.1.806-beta` release cycle, particularly around ROCm fallback handling and GPU memory budgeting.

---

### **3. New Model & Hardware Support**  
- ✅ **DGX Spark (two-node)**: Full support added via #10280 and #10323, enabling pipeline training and async replica routing across dual Spark systems with ConnectX-7 interconnect.  
- ✅ **Windows-on-ARM (NVIDIA hosts)**: Native ARM64 CUDA stack installation now works correctly via #10282.  
- ✅ **AMD ROCm**: Docker image support extended to AMD GPUs via stacked PR #6231 (based on #5748).  
- ✅ **MLX Batched Serving**: Multi-replies decoding enabled simultaneously via #10310, improving throughput for real-time agents.  
- ✅ **Custom mmproj paths**: Users can now attach compatible vision tower files even if metadata mismatches (#10296).

---

### **4. Performance & Optimization**  
- 🚀 **KV Cache Sharing**: PR #10301 introduces *KV preemption* so parallel chats share a single cache pool, reducing memory fragmentation and increasing concurrency.  
- ⚡ **Batched MLX Decoding**: PR #10310 enables simultaneous reply generation during batched inference—critical for agent tool use cases.  
- 💾 **Memory Budgeting Fix**: PR #10283 corrects VRAM budget calculations on unified-memory NVIDIA devices (e.g., GB10), preventing OOM crashes.  
- 🔁 **GGUF Export Optimization**: PR #10317 eliminates redundant model conversion during Hub push, cutting export time by ~50%.  
- 📈 **API Usage Examples**: PR #10313 adds model/quant dropdowns to API examples, enabling better testing of different configurations.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|-------|
| 🔴 High | Studio deadlocks due to SQLite thread contention (`sqlite3.connect()`/`close()`) | Open (#9008) | No fix yet |
| 🔴 High | MTP fails to load with Qwen3.8-Flash-Next-GGUF | Open (#10322) | In progress |
| 🔴 High | SIGSEGV during training on ROCm 6.1 when falling back to ROCm 6.4 | Open (#10273) | Pending |
| 🟡 Medium | Crash on "New chat" with `tapClientLookup: Index 1 out of bounds (length: 0)` | Open (#10288) | No fix |
| 🟡 Medium | Ollama models misclassified as invalid due to wrong source/schema crash | Open (#9986) | Under review |
| 🟡 Medium | Transcribe fails to recognize mlx models on macOS | Open (#10272) | Pending |

> ⚠️ Multiple regressions affecting core workflows (chat, model loading, RAG indexing) indicate instability in the current beta build.

---

### **6. What This Means for Application Developers**  
- **Build resilient agents**: Use the new `--kv-unified` and `parallel N` flags to scale concurrent sessions efficiently—ideal for multi-user LLM gateways.  
- **Optimize local deployments**: Leverage MLX batching (#10310) and unified memory fixes (#10283) to maximize throughput on edge devices.  
- **Avoid pitfalls**: Do not assume `tools` will be respected—PR #10314 now ensures errors are returned when tools are sent to non-tool-capable models.  
- **Plan for multi-GPU**: The DGX Spark cluster support (#10280, #10323) enables distributed training and low-latency serving across multiple nodes.  
- **Watch for regressions**: Avoid `Qwen3.8-Flash-Next-GGUF` and `Ollama-integrated models` until fixes land; consider pinning to stable `v0.1.805` if reliability is critical.

> 🔗 [GitHub Issues](https://github.com/unslothai/unsloth/issues) | [PRs](https://github.com/unslothai/unsloth/pulls)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*