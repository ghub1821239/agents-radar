# AI Infrastructure Digest 2026-09-25

> Generated: 2026-09-25 00:46 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-25**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q3 2026 is defined by a sharp bifurcation between **high-performance, production-grade serving engines** (vLLM, SGLang) and **integrated local runtime platforms** (Ollama, llama.cpp, Unsloth) that prioritize accessibility and cross-hardware support. While vLLM and SGLang lead in distributed optimization and speculative decoding maturity, Ollama and llama.cpp remain dominant for edge and developer-first deployments. The emergence of **AMD ROCm 10**, **RTX 50-series (sm120)**, and **Ryzen AI NPUs** signals a growing demand for heterogeneous hardware abstraction. Meanwhile, LiteLLM consolidates as the de facto enterprise gateway layer with enhanced observability and cost governance—critical for regulated, multi-tenant environments.

---

### **2. Activity Comparison**

| Project       | Issues Open (High/Critical) | PRs Merged (Last 24h) | Release Status     |
|---------------|-----------------------------|------------------------|--------------------|
| **vLLM**      | 15 (4 High, 3 Critical)     | 8                      | None (stabilizing v0.29.0+) |
| **SGLang**    | 17 (5 High, 2 Critical)     | 6                      | None (config updates only) |
| **llama.cpp** | 12 (4 High, 3 Critical)     | 6                      | `ggml v0.25.3` (patch) |
| **Ollama**    | 13 (4 High, 1 Critical)     | 5                      | None (deprecation warning) |
| **LiteLLM**   | 11 (4 High, 4 Critical)     | 4                      | None (behavioral changes) |
| **Unsloth**   | 11 (2 Critical, 3 High)     | 5                      | None (integration work) |

> ✅ *vLLM leads in engineering velocity and stability focus; LiteLLM shows highest critical issue density due to financial compliance risks.*

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**   | ✅ (TP tuning) | ⚠️ (roadmap) | ❌ | ✅ (experimental) | ✅ (pricing) | ✅ (GGUF support) |
| **DeepSeek-V4.1-Flash**  | ✅ (PP + spec-dec) | ✅ (decode graph) | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**        | ⚠️ (degeneration) | ⚠️ (DFlash regression) | ❌ | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1 (diffusion)** | ❌ | ✅ (TP=1 fix) | ❌ | ❌ | ✅ (image edits) | ✅ (FP8/INT8 GGUF) |
| **Granite 4.1/4.2**      | ❌ | ❌ | ❌ | ✅ (mlxrunner) | ❌ | ❌ |
| **Ryzen AI NPU (XDNA 2)**| ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (Lemonade + FastFlowLM) |
| **AMD ROCm 10**          | ❌ | ❌ | ❌ | ✅ (docs) | ❌ | ✅ (tracking) |

> 🏆 **Winner: Unsloth** — leads in novel hardware and model format support (NPU, GGUF, vision).  
> 🥈 **Runner-up: vLLM** — best-in-class support for large MoE models and pipeline parallelism.  
> 🥉 **Ollama** — strongest community-driven model integration (e.g., Granite, MLX runners).

---

### **4. Performance Frontier**

| Optimization Focus           | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Prefill**        | ✅✅ (Mamba2, deduplication, FP8) | ⚠️ (sparse MLA, DFlash layout issues) | 🔴 (silent hangs on long context) | ⚠️ (memory overestimation) | ✅ (cached_tokens accuracy) | ✅ (VAE compile budgeting) |
| **Batching & Parallelism**    | ✅✅ (PP + speculative decoding) | ✅ (DCP/Helix default) | ❌ (no TP support) | ❌ (nvfp4 stall) | ✅ (fallback routing) | ✅ (multi-engine) |
| **Quantization & Precision**  | ✅ (INT8 KV, sm120 FP8) | ⚠️ (precision drift in MoE) | ✅ (AVX-512 VNNI, k-quants) | ❌ (MLX leak) | ✅ (cost-aware tagging) | ✅ (auto-precision, NVFP4) |
| **Kernel & Hardware Tuning**  | ✅✅ (sm120, gfx950, DeepGEMM) | ⚠️ (Triton latency, ROCm FlyDSL) | ✅ (Metal, Vulkan FA) | ❌ (Blackwell detection) | ❌ | ✅ (flashinfer, ccache parallelization) |

> 🔥 **Top Performers**: vLLM (distributed kernels), Unsloth (NVFP4/NPU), llama.cpp (CPU/GPU fusion).  
> 🛑 **Critical Gaps**: SGLang’s DFlash draft validation, Ollama’s memory estimation, llama.cpp’s speculative decoding divergence.

---

### **5. Layer Positioning**

| Project       | Primary Layer               | Key Differentiator |
|---------------|-----------------------------|--------------------|
| **vLLM**      | **Inference Engine**         | Industry standard for high-throughput, scalable LLM serving with pipeline parallelism and speculative decoding |
| **SGLang**    | **Inference Engine**         | Specialized in decode context parallelism (DCP), hybrid-MLA, and speculative decoding at scale |
| **llama.cpp** | **Local Runtime / SDK**      | CPU/GPU/Edge-first; ideal for offline inference, quantization control, and low-level kernel tuning |
| **Ollama**    | **Local Runtime / CLI Platform** | Developer-friendly UX, model hub, MLX integration; best for prototyping and agent tooling |
| **LiteLLM**   | **LLM Gateway / Proxy Layer** | Enterprise-grade routing, cost control, audit trails, and multi-provider orchestration |
| **Unsloth**   | **Integrated Agent Platform** | Combines UI, fine-tuning, and engine plug-ins (vLLM/SGLang); targets full-stack local agent development |

> 💡 *This reflects a clear trend: engines (vLLM/SGLang) are becoming modular backends, while platforms (Ollama, Unsloth) provide end-to-end agent experiences.*

---

### **6. Trend Signals**

#### **Emerging Industry Trends (from 2026-09-25 activity):**
1. **Hardware Heterogeneity Is Now Mainstream**  
   - AMD ROCm 10, Ryzen AI NPU, RTX 50-series (sm120), Hexagon NPU — all now actively supported or tracked.  
   - Developers must adopt **hardware-agnostic deployment strategies**.

2. **Speculative Decoding Is Still Fragile**  
   - Multiple projects report **divergence, silent corruption, and layout validation failures** (especially in quantized and hybrid models).  
   - **Do not use speculative decoding in production** until these bugs are resolved.

3. **Cost & Compliance Are Non-Negotiable**  
   - LiteLLM’s critical budget enforcement bypasses highlight the need for **tamper-evident spend logging** in regulated environments.  
   - Future agents will require **audit-ready telemetry** from day one.

4. **Model Formats Are Fragmenting**  
   - GGUF (Unsloth), .safetensors (Ollama), .bin (vLLM), FlyDSL (SGLang), Ternary-Bonsai (llama.cpp) — each with unique performance and compatibility profiles.  
   - **Toolchain portability is a growing challenge.**

5. **Agent Systems Demand Resilience**  
   - Long-running sessions degrade (GLM-5.3-Flash), memory leaks accumulate (Ollama/MLX), and state can be lost (LiteLLM encrypted affinity).  
   - **Checkpointing, session isolation, and resource monitoring are now essential.**

#### **Actionable Guidance for Application Developers:**
- ✅ **Use vLLM or SGLang for high-throughput, distributed inference** — but avoid speculative decoding on quantized models.
- ✅ **Leverage Unsloth or Ollama for local agent development** — especially if targeting AMD/Ryzen AI or Apple Silicon.
- ✅ **Validate cost tracking in LiteLLM** before deploying in regulated or billing-sensitive systems.
- ✅ **Monitor memory usage and GPU visibility** — regressions in Ollama and llama.cpp can cause silent fallbacks.
- ✅ **Prepare for hardware diversity** — expect different performance profiles across ROCm, CUDA, and NPU backends.

> 📌 **Bottom Line**: The ecosystem is maturing rapidly—but reliability still depends on **platform-specific hardening**, **quantization awareness**, and **observability-first design**. Choose your stack based on **deployment constraints**, not just raw speed.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-25**

---

### **1. Today's Highlights**  
The vLLM project continues its aggressive optimization push for next-generation LLM serving, with key progress in speculative decoding support for pipeline-parallel models and deeper ROCm/Metal backend tuning. Critical fixes were merged for Mamba2 prefix caching corruption and KV transfer stability in hybrid Mamba/GDN models, while new PRs target RTX 5090/Blackwell (sm120) kernel coverage and FP8 quantization robustness.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were introduced. The project remains focused on pre-release stabilization ahead of v0.29.0+.

---

### **3. New Model & Hardware Support**  
- ✅ **Pipeline Parallelism + Speculative Decoding**: DSpark now supports aggregated serving on pipeline-parallel targets (`#56956`, `#56957`) — critical for scaling large MoE models like DeepSeek-V4-Flash across multiple GPUs.  
- ✅ **ROCm / AMD GPU Optimization**: Active work on gfx950 / MI355X performance tuning for `Qwen3.8-2.4T-A95B` (`#57149`) and enhanced AITER MoE dispatch testing (`#58393`).  
- ✅ **SM 12.x (RTX 50 Series) Kernel Coverage**: Targeted improvements to `DeepGEMM` and batch-invariant matmul tables for `sm120` devices (`#58495`, `#41063`).  
- ✅ **Quantization**: Work ongoing to enable INT8 KV cache quantization (`#33480`) and fix FP8 block-scaled weight issues on sm120 (`#51884`).

---

### **4. Performance & Optimization**  
- 🔥 **Mamba2 Prefill Optimization**: Removed GPU-CPU syncs in SSM state saving via batched prefill handling (`#49371`), reducing latency in long-context Mamba inference.  
- 🔥 **ROCm Memory Reduction**: Cut 69 unnecessary contiguous copies per decode step in skinny GEMM path (`#58566`), directly improving throughput on AMD GPUs.  
- 🔥 **Batch Invariant Matmul Tuning**: Expanded `sm120` TP=2/4/8 configurations to avoid fallback kernels (`#58495`), enabling full utilization on multi-GPU Blackwell systems.  
- 🔥 **KV Transfer Efficiency**: Deduplication of KV fills in `DecodeBenchConnector` (`#57884`) and alignment of sparse MLA block strides (`#55528`) reduce redundant memory operations.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|------|--------|-----------|
| ⚠️ High | [#57562](https://github.com/vllm-project/vllm/issues/57562) | `AsyncScheduler num_output_placeholders` underflow with chunked prefill + concurrency (regression from v0.24.0) | Open |
| ⚠️ High | [#55506](https://github.com/vllm-project/vllm/issues/55506) | MTP + PP + prefix caching causes ~33% request degeneration into token loops (e.g., `ductductduct...`) | Open |
| ⚠️ High | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash long-decode degeneration after accumulated reasoning steps | Open |
| ⚠️ Medium | [#56389](https://github.com/vllm-project/vllm/issues/56389) | `dsv4_topk` Triton kernel illegal memory access under high concurrency on H20 | Mitigated by `max_num_seqs=256` |
| ⚠️ Medium | [#52109](https://github.com/vllm-project/vllm/issues/52109) | Silent retrieval corruption on DeepSeek-V4-Flash ≥4k tokens on ROCm/gfx942 | Reproducible; backports applied |

---

### **6. What This Means for Application Developers**  
- **Build resilient agents**: Avoid `max_num_seqs > 256` when using `DeepSeek-V4.1-Flash` on H20 until #56389 is resolved.  
- **Leverage speculative decoding**: With DSpark now supporting PP targets, you can scale high-throughput spec-decoding pipelines across multiple stages.  
- **Use stable tool parsing**: Enable parser caching (`#57571`) to maintain consistent tool call IDs during retries—critical for deterministic agent workflows.  
- **Monitor long-running sessions**: For `GLM-5.3-Flash` and other models with reasoning chains, expect potential output degradation after extended generation; consider checkpointing or early stopping.  
- **Future-proof your deployment**: Begin preparing for `sm120` (RTX 50 series) by testing with `VLLM_BATCH_INVARIANT=1` and monitoring `#58495`’s impact on throughput.

> 📌 **Recommended Actions**: Review [PR #58495](https://github.com/vllm-project/vllm/pull/58495) for sm120 tuning, and [Issue #55506](https://github.com/vllm-project/vllm/issues/55506) if deploying Mamba2 models with MTP and prefix caching.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-25**

---

### **1. Today's Highlights**  
The SGLang project continues advancing its core inference infrastructure with significant progress on **Decode Context Parallelism (DCP)** and **Helix Parallelism**, now stabilized as the default `--dcp-comm-backend` across all models. A major refactoring effort is underway to unify MoE router GEMM logic and optimize DeepSeek-V4.1’s decode graph handling, while new support for **AMD ROCm FlyDSL GDN prefill backends** expands hardware coverage. Critical bugs in speculative decoding and KV cache management have been reported, highlighting ongoing stability work.

---

### **2. Releases & Breaking Changes**  
No new releases were published in the last 24 hours. However, the following configuration changes are actively being adopted:
- `fi_a2a` / `a2a` is now the default `--dcp-comm-backend` for all models (#39165, #37767).
- The `--enable-mis` flag is now supported in setwise scoring for CausalLM models via PR #41188.
- `SGLANG_USE_AITER_UNIFIED_ATTN=1` is required for batched generation on AMD ROCm when using unified attention paths.

> 🔗 [PR #41188](https://github.com/sgl-project/sglang/pull/41188) | [PR #39165](https://github.com/sgl-project/sglang/pull/39165)

---

### **3. New Model & Hardware Support**  
- **AMD ROCm**: Added experimental **FlyDSL GDN prefill backend** for Qwen3.5-397B (gfx950), improving prefill throughput by 1.4–1.5x vs. baseline.  
- **DeepSeek-V4.1**: Ongoing kernel optimizations and layout fixes to improve decode efficiency under high context lengths.
- **Qwen3.8-Flash-Next**: Roadmap tracking kernel optimization, CPU overhead reduction, and MTP tuning (#38731).
- **Diffusion Models**: Continued improvements in block-diffusion serving and image generation fidelity (e.g., Qwen-Image-2.1 TP=2 corruption fix pending).

> 🔗 [PR #39595](https://github.com/sgl-project/sglang/pull/39595) | [Issue #38731](https://github.com/sgl-project/sglang/issues/38731) | [Issue #41192](https://github.com/sgl-project/sglang/issues/41192)

---

### **4. Performance & Optimization**  
- **DeepSeek-V4 dsv4 prefill performance** remains suboptimal (~2–7K tok/s on 4× RTX PRO 6000 SM120) vs. vLLM/Marlin’s ~12.5K; tuning guidance sought (#33422).  
- **Triton backend**: Padded decode CUDA-graph slots incur increasing latency with longer contexts (30K → 35.9 ms/token at bs=5) (#41151).  
- **MoE Router GEMM unification** (PR #38695) aims to reduce precision drift and improve consistency across routing layers.  
- **Hybrid-MLA DFlash draft transfer** fails under asymmetric P/D TP on GLM-5.3-Flash — a critical path regression (#41038).  
- **HiCache**: Full preservation of MTP KV and recurrent state now enforced to avoid draft head restoration issues (#40223).

> 🔗 [Issue #33422](https://github.com/sgl-project/sglang/issues/33422) | [PR #38695](https://github.com/sgl-project/sglang/pull/38695) | [PR #40223](https://github.com/sgl-project/sglang/pull/40223)

---

### **5. Stability & Regressions**  
Top severity issues today:
1. **Critical**: `DFLASH` draft layout assumed but not validated — silent anchor-first checkpoint shifts cause incorrect outputs (#40144).  
2. **Critical**: Aborted LMCache sessions leak due to improper finalization tied to `cache_finished_req` (#40360).  
3. **High**: Qwen3.8 chat template breaks with Anthropic `/v1/messages` — prior-turn thinking spliced into content, emitting `</think>` as visible text (#40959).  
4. **High**: Gemma 2/3 batched generations run away on ROCm with `aiter unified attention` due to unsupported sliding-window layers (#41152).  
5. **Medium**: Qwen-Image-2.1 TP=2 output corrupted with chroma speckle noise; clean at TP=1 (#41192).

> 🔗 [Issue #40144](https://github.com/sgl-project/sglang/issues/40144) | [Issue #40360](https://github.com/sgl-project/sglang/issues/40360) | [Issue #40959](https://github.com/sgl-project/sglang/issues/40959) | [Issue #41152](https://github.com/sgl-project/sglang/issues/41152) | [Issue #41192](https://github.com/sgl-project/sglang/issues/41192)

---

### **6. What This Means for Application Developers**  
- **Use `--dcp-comm-backend fi_a2a`** for better DCP/Helix parallelism stability — it’s now default.  
- **Avoid `--tp-size 2` for diffusion models** like Qwen-Image-2.1 until #41192 is resolved; stick to TP=1 for production.  
- **Enable `--enable-mis`** for advanced setwise scoring in CausalLM tasks (via #41188).  
- **Watch for speculative decoding issues** with `DFLASH` drafts — ensure checkpoint compatibility and validate layouts manually.  
- **For AMD users**, use `SGLANG_USE_AITER_UNIFIED_ATTN=1` only if avoiding sliding-window attention; otherwise, expect crashes.  
- **Implement request log retention policies** early: `--log-requests` can fill disk quickly (#41129).

> 🔗 [Issue #41129](https://github.com/sgl-project/sglang/issues/41129) | [PR #41188](https://github.com/sgl-project/sglang/pull/41188)

---  
*Digest generated from GitHub data (2026-09-25 UTC).*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-25**

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes for Apple Metal and Vulkan backends, particularly around graph capture and sparse flash attention performance. Significant progress is also underway in speculative decoding correctness (notably with quantized models) and GPU kernel optimizations across CUDA, Metal, and Hexagon platforms.

---

### **2. Releases & Breaking Changes**  
- **`ggml v0.25.2` → `v0.25.3`**: Minor version bump to fix UBSAN errors in `ggml_graph_nbytes` ([#29396](https://github.com/ggml-org/llama.cpp/pull/29396)). No breaking changes expected.  
- **Metal Graph Capture Fix**: Empty graphs now return early without triggering command buffer capture, improving reliability ([#29390](https://github.com/ggml-org/llama.cpp/pull/29390)).

> 📌 *No API-breaking changes reported today.*

---

### **3. New Model & Hardware Support**  
- **Hexagon NPU**: Added Windows Arm64 CI build support for Hexagon backend ([#29052](https://github.com/ggml-org/llama.cpp/pull/29052)), enabling future deployment on Qualcomm AI chips.
- **Intel Vulkan FA Kernel**: New prefill flash attention kernel targeting Intel GPUs ([#29357](https://github.com/ggml-org/llama.cpp/pull/29357)) improves performance on supported platforms.
- **Model Format Support**: PRs under review to add support for Ternary-Bonsai’s PQ2_0 (type 142) and PTQ1_0 (type 143) quantizations ([#29058](https://github.com/ggml-org/llama.cpp/pull/29058)).

---

### **4. Performance & Optimization**  
- **Metal Sparse FA Optimization**: Moved sparse attention indices into shared memory, reducing latency and improving bandwidth utilization ([#29377](https://github.com/ggml-org/llama.cpp/pull/29377)). Benchmarked on `DeepSeek-V4-Flash-Vision-Exp` at 70k context.
- **CUDA Fused Kernels**: Merged fusion of `RMS_NORM + SCALE` into single kernel, fixing ~4% prefill regression from prior PRs ([#29393](https://github.com/ggml-org/llama.cpp/pull/29393)).
- **CPU GEMM Optimizations**: 
  - AVX-512 VNNI+VBMI path added for Q4_K repack GEMM using `vpdpbusd` ([#29397](https://github.com/ggml-org/llama.cpp/pull/29397)).
  - Tiled mul_mat with VNNI for k-quants yields 3–7x speedup on CPU ([#27851](https://github.com/ggml-org/llama.cpp/pull/27851)).
- **Vulkan**: Reuse descriptor sets when bindings are constant, reducing driver overhead ([#29280](https://github.com/ggml-org/llama.cpp/pull/29280)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | PR / Fix |
|--------|------|--------|---------|
| 🔴 High | Speculative decoding divergence on quantized targets (`Q4_K_M`) under greedy sampling | Open, confirmed | [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) |
| 🔴 High | Qwen3.8-27B decode throughput collapse >80K context on CUDA | Open, reproducible | [#27623](https://github.com/ggml-org/llama.cpp/issues/27623) |
| 🔴 High | Silent server hang during `/metrics` scrape by VictoriaMetrics | Open | [#29104](https://github.com/ggml-org/llama.cpp/issues/29104) |
| 🟡 Medium | CUDA sparse FA decode 1.6x slower post-b11047 | Closed | [#29281](https://github.com/ggml-org/llama.cpp/issues/29281) |
| 🟡 Medium | Unified-KV limitation causing prompt processing drop with `-np 2` | Open | [#28495](https://github.com/ggml-org/llama.cpp/issues/28495) |

> ⚠️ Multiple high-severity correctness issues persist in speculative decoding, KV cache handling, and multi-GPU setups — especially on AMD ROCm and Vulkan.

---

### **6. What This Means for Application Developers**  
- **Use `GGML_CUDA_FA_ALL_QUANTS=ON` by default** if deploying 4-bit KV caches — otherwise, expect silent CPU fallbacks and 30x slowdowns ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633)).
- **Avoid speculative decoding with quantized models** until [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) is resolved; results may diverge from baseline.
- **Expect instability on long contexts (>80K)** with Qwen3.8 series on CUDA — consider lower `n_ctx` or disable speculation.
- **Leverage new kernels** where available: use Intel Vulkan FA kernel for better prefill performance, and enable AVX-512 VNNI paths for faster CPU inference.
- **Monitor server health closely** — `/metrics` scraping can cause silent hangs; consider rate-limiting or disabling metrics collection in production.

> 💡 *For agents/apps requiring consistency: prefer bf16 targets over quantized ones until speculative decoding bugs are fixed.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-25**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to mature with focused improvements in MLX backend stability and model compatibility, particularly for MoE (Mixture of Experts) and Qwen3 series models. Critical regressions affecting memory estimation and GPU detection on Apple M-series and NVIDIA Blackwell hardware have been reported, highlighting ongoing challenges in low-level inference engine integration. Meanwhile, new PRs are advancing support for Granite models, System 1 AI frameworks, and improved CLI/terminal integrations.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes were published in the last 24 hours.*  
However, **PR #18627** (`api: deprecate typical_p`) introduces a soft deprecation of `typical_p` by switching from hard failure to warning logging—developers relying on this parameter should prepare for future removal. [PR #18627](https://github.com/ollama/ollama/pull/18627)

---

### **3. New Model & Hardware Support**  
- ✅ **GraniteForCausalLM**: Experimental support added for IBM’s Granite 4.1 and 4.2 models via `mlxrunner`. [PR #17972](https://github.com/ollama/ollama/pull/17972)  
- ✅ **System 1 Models**: Community request raised for support of Kev and Laya models. [Issue #18594](https://github.com/ollama/ollama/issues/18594)  
- ✅ **AMD ROCm on Windows**: Expanded GPU list in documentation to include gfx1150, gfx1151, gfx1200, and gfx1201 (Radeon RX 7000 Pro series). [PR #18623](https://github.com/ollama/ollama/pull/18623)  
- ✅ **MLX Runner Enhancements**: Fixes for Nemotron layer naming, global scale support, and MoE expert loading (e.g., `gemma-4-26B-A4B-it-qat-4bit`). [PR #18631](https://github.com/ollama/ollama/pull/18631), [PR #18614](https://github.com/ollama/ollama/pull/18614)

---

### **4. Performance & Optimization**  
- 📉 **Memory Estimation Regression**: A critical regression in v0.31.2 inflated memory usage for `gemma4:31b` by ~1.2 GiB, causing generation speed to drop from 33.8 → 4.7 tok/s. This impacts high-context workflows on VRAM-constrained devices. [Issue #17099](https://github.com/ollama/ollama/issues/17099)  
- 🔥 **MLX Memory Leak**: Each tool call on `qwen3.6:27b-mlx` leaks ~0.43 GiB across recurrent snapshots, outside prefix-cache budget. This accumulates under sustained load. [Issue #18620](https://github.com/ollama/ollama/issues/18620)  
- ⏳ **Prefill Stall on nvfp4**: Under single-slot load (`OLLAMA_NUM_PARALLEL=1`), requests stall during prefill with zero token progress, requiring SIGTERM to recover. [Issue #18505](https://github.com/ollama/ollama/issues/18505)  
- 🚀 **Web Search Limit Increase**: The per-response web search limit has been raised from 3 to 10 for Responses and Anthropic-compatible models. [PR #18602](https://github.com/ollama/ollama/pull/18602)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| High | [Issue #18505](https://github.com/ollama/ollama/issues/18505) | MLX `nvfp4` stalls during prefill under sustained load; no progress, requires SIGTERM recovery | No fix PR yet |
| High | [Issue #18581](https://github.com/ollama/ollama/issues/18581) | Windows CUDA fails to detect NVIDIA Blackwell (RTX 50-Series) GPUs — reports 0 B VRAM, falls back to CPU | No fix PR yet |
| High | [Issue #17099](https://github.com/ollama/ollama/issues/17099) | Memory estimate inflation in v0.31.2 causes 7x slowdown in `gemma4:31b` | No fix PR yet |
| Medium | [Issue #18620](https://github.com/ollama/ollama/issues/18620) | Persistent memory leak (~0.43 GiB/request) in MLX runner with tool calls | No fix PR yet |
| Low | [Issue #18632](https://github.com/ollama/ollama/issues/18632) | `think: "high"`/`"max"` silently defaults to `medium` instead of `xhigh` | No fix PR yet |
| Low | [Issue #18368](https://github.com/ollama/ollama/issues/18368) | Chat processing fails silently after 60 seconds on macOS GUI | No fix PR yet |

---

### **6. What This Means for Application Developers**  
- **Avoid v0.31.2+** if using `gemma4:31b` with large context windows—this version introduces severe performance regressions due to memory overestimation. Pin to v0.31.1 until resolved.  
- **Monitor MLX memory usage** closely when building agents with tool calling; the persistent leak in `qwen3.6:27b-mlx` can lead to out-of-memory crashes under long-running sessions.  
- **Expect instability on newer hardware**: NVIDIA Blackwell (Windows) and Apple M-series (macOS) users may face silent fallback to CPU or stalled inference—validate GPU visibility in your deployment pipeline.  
- **Update tooling integrations** to handle increased web search limits (now up to 10 per response) and prepare for upcoming deprecation of `typical_p`.  
- **Consider adopting community integrations** like Termalime ([PR #18630](https://github.com/ollama/ollama/pull/18630)) or AGNT ([PR #18618](https://github.com/ollama/ollama/pull/18618)) for enhanced local agent UX.

---  
*Digest compiled from GitHub activity (2026-09-25).*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-25**

---

### **1. Today's Highlights**  
The LiteLLM project continues to strengthen its enterprise-grade observability and cost control capabilities, with critical fixes to budget enforcement, streaming telemetry, and audit trail integrity. Key PRs today focus on improving spend logging accuracy—particularly for cached tokens and streamed responses—and enhancing proxy-level rate limiting and tagging policies. These updates are vital for regulated deployments and multi-tenant inference gateways.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, several **non-breaking but impactful configuration and behavioral changes** were introduced via PRs:  
- `max_daily_tag_spend_retention_period` now supports cleanup of historical tag spend data (#39221).  
- Email alerts can be configured per team member budget threshold (e.g., 80%, 90%) — previously only available for API keys (#42665).  
- `service_tier` is now preserved across streamed chunks and spend logs, improving billing fidelity (#43070).  
👉 [PR #43070](https://github.com/BerriAI/litellm/pull/43070), [PR #42665](https://github.com/BerriAI/litellm/pull/42665)

---

### **3. New Model & Hardware Support**  
- **Sail** has been officially added as an OpenAI-compatible provider with completion window tier pricing support. This enables routing to Sail’s 12 models via standard `/chat/completions`, streaming, and Responses API endpoints.  
  👉 [PR #42840](https://github.com/BerriAI/litellm/pull/42840)  
- **Fireworks AI** now includes explicit cost map entries for `deepseek-v4p1-flash-us` (both short and router key forms), aligning with US pricing.  
  👉 [PR #43097](https://github.com/BerriAI/litellm/pull/43097)  
- **Azure AI FLUX.2-flex** image edits now bill reference images at 1 megapixel each, matching Azure’s actual pricing model.  
  👉 [PR #43094](https://github.com/BerriAI/litellm/pull/43094)

---

### **4. Performance & Optimization**  
- **Streaming efficiency improvements**: The `service_tier` field is now retained through all streamed response chunks, ensuring accurate cost attribution and reducing misbilling risks.  
  👉 [PR #43070](https://github.com/BerriAI/litellm/pull/43070)  
- **Cost precision enhancement**: Fixes ensure `cached_tokens` are properly accounted for in streaming usage, preventing double-billing at full input rates.  
  👉 [PR #39088](https://github.com/BerriAI/litellm/pull/39088), [PR #43056](https://github.com/BerriAI/litellm/pull/43056)  
- **Router optimization**: Added `order_fallback_status_codes` policy to enable fine-grained HTTP status-based fallbacks within model groups.  
  👉 [PR #43095](https://github.com/BerriAI/litellm/pull/43095)

---

### **5. Stability & Regressions**  
**Critical Issues Reported (Ranked by Severity):**  
1. **Budget Enforcement Bypass** in v1.82.3: `max_budget` checks ignored for both key and user budgets when spend exceeds limit.  
   🔴 *Fix PR pending* — affects financial compliance and cost governance.  
   👉 [Issue #26672](https://github.com/BerriAI/litellm/issues/26672)  

2. **RPM Limits Fail After Virtual Key Caching**: Per-customer RPM limits stop applying once a virtual key is cached.  
   🔴 *High impact on rate-limiting consistency*.  
   👉 [Issue #39713](https://github.com/BerriAI/litellm/issues/39713)  

3. **Zero-Cost Model Budget Blocks**: Internal users are blocked from calling zero-cost models even when `skip_budget_checks` is set.  
   🔴 *Impacts internal tooling and debugging workflows*.  
   👉 [Issue #29912](https://github.com/BerriAI/litellm/issues/29912)  

4. **Encrypted Content Affinity Breakage**: Conversation state permanently lost if pinned deployment fails or is removed.  
   🔴 *Can brick multi-turn conversations*.  
   👉 [Issue #43000](https://github.com/BerriAI/litellm/issues/43000)  

> ✅ *Note: Several of these issues have associated fix PRs in flight (e.g., #43056, #43075), indicating active mitigation.*

---

### **6. What This Means for Application Developers**  
- **Audit & Compliance Ready**: With enhanced spend logging (`metadata.used_anthropic_oauth_token`, `service_tier` retention), your LLM call logs now provide tamper-evident trails suitable for EU AI Act Article 12 compliance.  
- **Cost Accuracy Is Now Critical**: Ensure you’re using `v1.99+` and avoid relying on `max_budget` without validating it—bugs in older versions may silently undercharge.  
- **Streamed Workloads Are More Reliable**: Fixes to `usage.prompt_tokens_details` and `cached_tokens` mean you’ll no longer overpay for cached prompts during streaming.  
- **Routing Logic Is More Flexible**: Use `order_fallback_status_codes` to define custom failure conditions beyond just 5xx errors—ideal for building resilient agent systems.  
- **Avoid Legacy Configurations**: The UI dashboard still has unresolved bugs (e.g., `user_header_name` not creating customers), so validate end-user tracking logic manually until fixed.

➡️ **Actionable Tip**: Audit your proxy configuration for `budget_duration=null` + stale `budget_reset_at` — this combo can silently zero out spend forever.  
👉 [Issue #39370](https://github.com/BerriAI/litellm/issues/39370)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-25**

---

### **1. Today's Highlights**  
Unsloth continues rapid expansion into multi-engine inference and cross-architecture support, with major progress on vLLM/SGLang integration and AMD ROCm 10 readiness. Critical fixes address GPU memory misreporting on AMD iGPUs and a high-severity crash in `torch._grouped_mm` that affects Windows AMD users. The project is now actively building benchmarks for model configuration sweeps and introducing NVFP4 optimizations for image diffusion.

---

### **2. Releases & Breaking Changes**  
*None in the last 24h.*  
However, ongoing work includes:  
- **PR #11874**: Optimizes Studio’s diffusion compile-cache to avoid rewriting on warm start and bounds disk usage.  
- **PR #11872**: Eliminates redundant model folder rescanning during API requests, improving responsiveness under heavy load.  
- **PR #11831**: Fixes incorrect auto-precision behavior where INT8 DiTs are loaded unnecessarily even when BF16 fits — improves accuracy without performance cost.  

> 🔗 [PR #11874](https://github.com/unslothai/unsloth/pull/11874) | [PR #11872](https://github.com/unslothai/unsloth/pull/11872) | [PR #11831](https://github.com/unslothai/unsloth/pull/11831)

---

### **3. New Model & Hardware Support**  
- ✅ **vLLM & SGLang Integration (PR #11491)**: Adds opt-in support for multi-GPU inference, vision models, and quantization via external engines. Not installed by default; enables flexible deployment across cloud and edge.  
- ✅ **AMD Ryzen AI NPU (PR #11743)**: Experimental support for chat on XDNA 2 NPUs via Lemonade + FastFlowLM. Runs private copy of model; no download until enabled.  
- ✅ **ROCm 10 Ready (Issue #9932)**: Tracking implementation and version selector for ROCm 10, with upstream release now available.  
- ✅ **Qwen-Image-2.1 GGUF Support (Multiple PRs)**: Full pipeline improvements including FP8/INT8 handling, model splitting logic, and precision alignment (`#11835`, `#11829`).  

> 🔗 [PR #11491](https://github.com/unslothai/unsloth/pull/11491) | [PR #11743](https://github.com/unslothai/unsloth/pull/11743) | [Issue #9932](https://github.com/unslothai/unsloth/issues/9932) | [PR #11835](https://github.com/unslothai/unsloth/pull/11835)

---

### **4. Performance & Optimization**  
- ⚡ **NVFP4 FlashInfer Backend (PR #10730, #10731, #11730)**: Introduces per-layer NVFP4 policies and flashinfer-based kernels for faster image generation. On-demand installation avoids fallback to slower torchao path.  
- ⚡ **VAE Compile Optimization (PR #10889)**: Compiles VAE decode step based on measured time budget, reducing render latency by up to ~15% in testing.  
- ⚡ **FlashAttention Prebuilt Wheel Parallelization (PR #11812)**: Splitting `flash-attn` wheel build across parallel ccache jobs cuts CI time from ~8 hours to under 2 hours — critical for faster releases.  
- 📈 **Benchmarks Page (PR #11808)**: Laying foundation for config sweep benchmarking: speculative decoding, KV cache types, RAM offload, and context length tuning.  

> 🔗 [PR #10730](https://github.com/unslothai/unsloth/pull/10730) | [PR #10889](https://github.com/unslothai/unsloth/pull/10889) | [PR #11812](https://github.com/unslothai/unsloth/pull/11812) | [PR #11808](https://github.com/unslothai/unsloth/pull/11808)

---

### **5. Stability & Regressions**  
- **Critical**: `torch._grouped_mm` access violation crashes on Windows AMD hosts with gfx103X/gfx110X/gfx908/gfx90a (Issue #11814). Affected venvs remain pinned to `torch 2.10.0+rocm7.13.0`.  
  > 🔗 [Issue #11814](https://github.com/unslothai/unsloth/issues/11814) — *Fix pending; workaround: force update PyTorch to 2.11.0+rocm7.14.1.*  
- **High Severity**: Invalid kernel file error during GGUF export due to model split onto unsupported iGPU (Issue #11870).  
  > 🔗 [Issue #11870](https://github.com/unslothai/unsloth/issues/11870) — *Fix needed: ensure export respects GPU availability.*  
- **Medium**: Qwen-Image-2.1 hangs after final step due to unreported VAE decode tuning (Issue #11636).  
  > 🔗 [Issue #11636](https://github.com/unslothai/unsloth/issues/11636) — *Likely resolved in PR #11835 (Hadamard rotation).*  
- **UI/UX**: Bottom strip click-through broken on maximized Windows window (Issue #11734).  
  > 🔗 [Issue #11734](https://github.com/unslothai/unsloth/issues/11734)

---

### **6. What This Means for Application Developers**  
- **Multi-Engine Flexibility**: With vLLM/SGLang integration, developers can now plug in high-throughput, production-grade inference backends while retaining Unsloth’s UI/agent layer. Ideal for scalable agent systems.  
- **Hardware Diversity**: AMD ROCm 10 and Ryzen AI NPU support enable deployment across diverse hardware — including RDNA1 GPUs and embedded NPUs — with minimal code changes.  
- **Precision Control**: New NVFP4 and auto-precision features allow fine-tuned trade-offs between speed and fidelity, especially important for image-generation pipelines.  
- **Stability Caution**: Avoid using older PyTorch builds on AMD (e.g., `2.10.0+rocm7.13.0`) — they trigger crashes. Ensure environment uses `2.11.0+rocm7.14.1` or newer.  
- **Future-Proofing**: The new Benchmarks page will help tune models for optimal throughput — expect configurable settings for speculative decoding, KV cache, and offload strategies in upcoming releases.

> 💡 **Actionable Takeaway**: If deploying on AMD GPUs, verify PyTorch version compatibility and consider opting into vLLM for large-scale inference. Use `--model` path checks carefully to avoid misleading “switch” warnings.

---  
*Data source: [unslothai/unsloth GitHub repo](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*