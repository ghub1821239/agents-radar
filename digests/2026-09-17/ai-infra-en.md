# AI Infrastructure Digest 2026-09-17

> Generated: 2026-09-17 00:51 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-17**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in September 2026 is marked by rapid convergence between high-performance serving engines, lightweight local runtimes, and intelligent gateways—driven by demand for scalable, low-latency LLM deployment across edge, cloud, and hybrid environments. Projects like vLLM and SGLang are pushing the boundaries of speculative decoding and kernel-level optimization, while llama.cpp and Ollama prioritize cross-platform portability and developer experience. LiteLLM emerges as a central orchestrator, enabling multi-provider routing and cost control, reflecting a growing need for observability and budget enforcement in production AI systems. Meanwhile, Unsloth’s focus on desktop usability and security signals a maturing ecosystem where end-user accessibility and trust are becoming non-negotiable.

---

### **2. Activity Comparison**

| Project       | Issues (Open) | PRs (Open/Active) | Releases (Last 24h) | Notes |
|---------------|---------------|-------------------|----------------------|-------|
| **vLLM**      | 87            | 32                | None                 | High severity regressions dominate; stability concerns on SM120/ROCm |
| **SGLang**    | 94            | 28                | None                 | Critical CUDA coredump tracker (#26340); ROCm momentum strong |
| **llama.cpp** | 112           | 25                | **b11010–b11000**    | Multiple stable releases; Vulkan/CUDA fixes prioritized |
| **Ollama**    | 101           | 21                | None                 | Major breaking change: CLI agent removed; tool call bugs prominent |
| **LiteLLM**   | 78            | 19                | **v1.103.0-dev.1**, **v1.102.0-rc.2** | Security hardening via cosign-signed images; budget bypass risk |
| **Unsloth**   | 67            | 17                | **Windows-ARM64 binaries** | Desktop-focused; security fix for SSRF vulnerability |

> ✅ *Observation:* **llama.cpp** leads in release velocity with four incremental updates; **Ollama** and **LiteLLM** drive API/UX changes; **vLLM/SGLang** remain focused on deep stability fixes.

---

### **3. Model Support Race**

| New Model / Architecture         | vLLM        | SGLang       | llama.cpp     | Ollama       | LiteLLM     | Unsloth       |
|----------------------------------|-------------|--------------|---------------|--------------|-------------|---------------|
| **DeepSeek-V4.1-Flash**         | ✅ Full     | ✅ Full      | ✅ GGUF        | ✅           | ❌          | ✅ Qwen3.5/6 support |
| **Qwen3.8-Flash-Next-FP8**      | ⚠️ Non-deterministic | ✅ | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**               | ✅ (Issue #56868) | ✅ Fused kernels | ❌ | ❌ | ❌ | ❌ |
| **Hybrid Mamba/GDN**            | ⚠️ Critical bugs (SM120) | ⚠️ Cache corruption | ✅ (MTP draft) | ❌ | ❌ | ❌ |
| **Hexagon K-Quants (Q4_K/Q6_K)**| ❌          | ❌           | ✅ **New**      | ❌ | ❌ | ❌ |
| **Nemotron-H Vision Models**    | ❌          | ❌           | ❌            | ✅ MLX support | ❌ | ❌ |
| **AMD ROCm 7.14 + gfx950**      | ⚠️ Optimization | ✅ Fused kernels | ⚠️ Fallback | ❌ | ❌ | ✅ Installer support |

> 🏆 **Winner: SGLang** — leads in architectural innovation with full DeepSeek-V4.1 integration and AMD ROCm fusion.  
> 🥈 **Runner-up: llama.cpp** — fastest to enable new hardware (Hexagon) and quantization formats.  
> 🥉 **Tie: vLLM & Ollama** — strong model coverage but burdened by stability issues.

---

### **4. Performance Frontier**

| Optimization Focus             | vLLM                        | SGLang                     | llama.cpp                  | Ollama                     | LiteLLM                   | Unsloth                  |
|-------------------------------|-----------------------------|----------------------------|----------------------------|----------------------------|---------------------------|--------------------------|
| **KV Cache Efficiency**       | ✅ Scratch space per-request (PR #57261) | ⚠️ HiCache write-through bug | ⚠️ Silent fallbacks (PR #28633) | ✅ GPU memory budgeting | ⚠️ Streaming usage loss | ❌                         |
| **Batching & Throughput**     | ✅ Context parallelism, MegamoE | ✅ Prefill-decode disaggregation roadmap | ✅ CUDA graphs for MTP | ✅ Warm-up prefill cache | ✅ Rate limiter fix (PR #34140) | ❌                         |
| **Quantization & Memory**     | ✅ FP8, MoE CPU offload (PR #57215) | ✅ Zero-RoPE, fused kernels | ✅ Hexagon K-Quants (Q4_K/Q6_K) | ✅ `--load-mode dio` tuning | ❌ Schema validation failures | ❌                         |
| **Kernel-Level Optimization** | ✅ FlashInfer MegaMoE, K-cache gather | ✅ Four-kernel fusion (ROCm) | ✅ GEMM pipelining, Adreno kernels | ❌                          | ❌                         | ❌                         |
| **Distributed Serving**       | ✅ Hybrid Mamba/GDN context parallelism | ⚠️ Async TP, sequence parallelism | ❌                          | ❌                          | ✅ Multi-provider pass-through | ❌                         |

> 🔥 **Top Focus Areas:**  
> - **vLLM**: Scalable speculative decoding and MoE/Mamba support on SM120/ROCm.  
> - **SGLang**: Kernel fusion and PD disaggregation for future scalability.  
> - **llama.cpp**: Edge performance via Hexagon/K-Quants and CUDA graph acceleration.

---

### **5. Layer Positioning**

| Project       | Primary Layer              | Secondary Role(s)                              | Key Differentiator |
|---------------|----------------------------|------------------------------------------------|--------------------|
| **vLLM**      | **High-Performance Serving Engine** | Distributed inference, speculative decode | Industry standard for large-scale inference; GPU kernel optimization leader |
| **SGLang**    | **Serving Engine + Runtime** | Tool-aware inference, caching, async scheduling | Emphasis on composability and stateful inference pipelines |
| **llama.cpp** | **Local Runtime / Edge Inference** | Quantization, cross-backend portability | Unmatched hardware diversity (Vulkan, OpenCL, Hexagon) |
| **Ollama**    | **Developer Gateway / Local Runner** | Model management, CLI UX, tool calling | Seamless local dev-to-production flow; strong UX focus |
| **LiteLLM**   | **API Gateway / Orchestration Layer** | Cost control, observability, multi-provider routing | Central hub for billing, rate limiting, and provider abstraction |
| **Unsloth**   | **Desktop Studio / Dev Environment** | Model visualization, secure image handling | Bridging the gap between local development and production deployment |

> 📊 *Layer Map:*  
> - **Infra Stack (Bottom):** llama.cpp, vLLM, SGLang  
> - **Orchestration (Middle):** LiteLLM, Ollama  
> - **Frontend/Dev Experience (Top):** Unsloth

---

### **6. Trend Signals**

#### 🔍 **Key Industry Trends Extracted from Today’s Activity:**
1. **Stability Over Speed**: Despite aggressive feature development, **critical stability issues dominate** (e.g., vLLM’s non-deterministic greedy output, SGLang’s CUDA coredumps). This signals that **production readiness is now a higher priority than raw performance gains**.
2. **Hardware Diversification Accelerates**: **Hexagon K-Quants (llama.cpp), AMD ROCm 7.14 (Unsloth), Intel Arc Vulkan (llama.cpp)** show that **edge and heterogeneous compute are no longer niche**—infrastructure must now span GPUs, APUs, and mobile SoCs.
3. **Speculative Decoding Is Maturing But Fragile**: While vLLM and SGLang push forward with hybrid Mamba/GDN and MTP draft optimizations, **regressions on SM120 and ROCm highlight fragility in speculative path logic**—a red flag for mission-critical deployments.
4. **Security & Trust Are Now Core Requirements**: The **SSRF fix in Unsloth**, **cosign signing in LiteLLM**, and **memory budgeting in Ollama** reflect a shift toward **secure-by-design infrastructure**, especially for consumer-facing or enterprise applications.
5. **Agent Workflows Demand Consistency**: Tool call parsing failures (Ollama, SGLang), silent data loss (HiCache), and broken reasoning levels signal that **agent reliability hinges on predictable I/O and deterministic behavior**—not just model accuracy.

#### 🛠️ **Action Items for Application Developers:**
- **Avoid speculative decoding** on hybrid models (Mamba/GDN) or SM120 until regressions are resolved.
- **Validate tool outputs rigorously**—especially with MiniCPM5-2B, Gemma4, and Qwen3CoderDetector.
- **Use `--cpu-offload-gb uva` cautiously** with MoE models; verify memory reduction behavior.
- **Enable `VLLM_BATCH_INVARIANT=1` only with sequence parallelism disabled**.
- **Monitor GPU driver logs** and use `--verbose` mode when deploying on Vulkan/SYCL.
- **Audit budget configurations** in LiteLLM—zero-cost models may bypass fallback controls.
- **Test multi-model loading** on Vulkan AMD GPUs—risk of crash remains high.

> ✅ **Final Takeaway:** The AI infrastructure stack is evolving from "fastest" to "most reliable and secure." Choose tools not just for performance, but for **predictability, maintainability, and safety**—especially as agents and real-time systems go live.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-17**

#### **1. Today's Highlights**  
Critical correctness and stability issues in speculative decoding (speculative-decoding) and quantized MoE models on SM120 (GB10/B300) have emerged, including non-deterministic greedy outputs and illegal memory access errors—particularly affecting DeepSeek-V4.1-Flash and Qwen3.8-Flash-Next. Meanwhile, key performance improvements for ROCm and hybrid Mamba/GDN models are being prioritized, with PRs targeting memory efficiency in speculative decode scratch space and context parallelism.

#### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were introduced. The v0.29.0 precompiled kernels remain in use; users should monitor for potential regressions tied to `VLLM_USE_PRECOMPILED=1`.

#### **3. New Model & Hardware Support**  
- **Model Support**:  
  - **Qwen3.8-Flash-Next-FP8** now under active scrutiny for deterministic behavior during greedy decoding when near `indexer_budget` (Issue #54521).  
  - **DeepSeek-V4.1-Flash + DSpark** support is being enhanced across multiple backends (SM120, ROCm), with ongoing fixes for sparse-MLA prefill and draft warmup crashes (Issues #56443, #56771).  
  - **GLM-5.3-Flash** shows long-decode degeneration after accumulated reasoning (Issue #56868), indicating potential need for model-specific tuning.  

- **Hardware & Backend**:  
  - **ROCm (MI355X)**: Performance optimization for DeepSeek-V4.1-Flash is underway (Issue #56506), with PR #56720 improving K-cache gather grid sizing.  
  - **Intel XPU / UVA Offloading**: MoE expert weights are now preserved during CPU offload post-processing (PR #57215), resolving OOMs during load.  
  - **SM120 (GB10/B300)**: Multiple critical bugs confirmed on unified-memory systems, particularly with hybrid Mamba/GDN and MoE models (Issues #56457, #52225).

#### **4. Performance & Optimization**  
- **Speculative Decoding Efficiency**:  
  - PR #57261 reduces speculative-decoding scratch memory by allocating per-request instead of per-concurrency slot, crucial for hybrid Mamba models.  
  - PR #57048 optimizes Kimi-K3 synthetic verifier suffixes, reducing target rows from 7 to 4 while preserving acceptance logic.  

- **Kernel & Memory Optimizations**:  
  - PR #56720 improves K-cache gather kernel efficiency on ROCm by aligning grid size to actual prefix length, reducing unnecessary memory operations.  
  - PR #57258 reorders DeepGEMM warmup before KV-cache profiling to prevent startup OOMs.  
  - PR #54049 integrates FlashInfer’s CuteDSL MegaMoE kernels for large-batch prefill acceleration (targeting >10k tokens).  

- **Throughput Metrics (ROCm)**:  
  - Measured on 8x MI355X (TP4): DeepSeek-V4.1-Flash achieves ~35.89 output tokens/sec at concurrency 1, but significant headroom remains (Issue #56506).

#### **5. Stability & Regressions**  
**High Severity**:  
- **Non-deterministic greedy decoding** in `Qwen/Qwen3.8-Flash-Next-FP8` due to `persistent_topk` in prefill (Issue #54521, 48 comments). Reproducible with identical prompts → different outputs. *No fix PR yet.*  
- **Illegal memory access in SM120 sparse-MLA prefill** with DeepSeek-V4.1-Flash + DSpark (Issue #56771, 6 comments). *PR #57028 partially addresses this.*  
- **CUDA device-side assert in `map_draft_to_target`** during draft warmup on H200 (SM90) (Issue #56443, 8 comments). *Fix pending.*  

**Medium Severity**:  
- **Batch invariance broken** when sequence parallelism + async TP enabled (`VLLM_BATCH_INVARIANT=1`) (Issue #56370, 17 comments).  
- **LLMCache fails to convert KV cache specs** on vllm0.19.1 with Qwen3.6-27B-FP8 (Issue #42911, 11 comments).  
- **Tool choice='none' silently deletes tool-call-shaped content** (Issue #55080, 6 comments).  

#### **6. What This Means for Application Developers**  
- **Avoid `--enable-lora` with encoder-only models** like ModernBert until Issue #57002 is resolved.  
- **Do not rely on deterministic greedy output** for Qwen3.8-Flash-Next if prompt length nears `indexer_budget`; expect non-idempotent results.  
- **Use `--cpu-offload-gb uva` cautiously on MoE models with WNA16 compression**—memory reduction may not occur as expected (Issue #57008).  
- **Monitor speculative decoding stability** on SM120 and ROCm platforms—especially with DeepSeek-V4.1-Flash and hybrid models.  
- **Enable `VLLM_BATCH_INVARIANT=1` only with caution** if using sequence parallelism or async TP (Issue #56370).  
- **Consider using `--reasoning-parser qwen3`** for Qwen3 XML tool parsing, but be aware of content merging quirks (Issue #51679).  

> 🔗 [GitHub Issues Summary](https://github.com/vllm-project/vllm/issues?q=is%3Aopen+updated%3A2026-09-16..2026-09-17) | [PRs Active Today](https://github.com/vllm-project/vllm/pulls?q=is%3Aopen+updated%3A2026-09-16..2026-09-17)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-17

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with major progress on **AMD ROCm support**, including full integration of DeepSeek-V4.1 and new fused kernels for GLM-5.3-Flash. Critical stability improvements were made in the **HiCache write-through persistence logic** and **Qwen3Coder detector handling of escaped quotes**, while a high-severity CUDA coredump tracker (#26340) remains active with 312 comments, indicating ongoing low-level GPU reliability concerns.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1**: Full model and runtime integration landed via PRs [#38798](https://github.com/sgl-project/sglang/pull/38798), [#39666](https://github.com/sgl-project/sglang/pull/39666), and [#39665](https://github.com/sgl-project/sglang/pull/39665), including vision tower, image preprocessing, chat encoding, tool parsing, and Engram module support.  
- **AMD ROCm (gfx950)**: Fused DSA indexer decode path for GLM-5.2 ([PR #38583](https://github.com/sgl-project/sglang/pull/38583)) and zero-RoPE MHA prefill support for GLM-5.3-Flash ([PR #39338](https://github.com/sgl-project/sglang/pull/39338)).  
- **T-Head PPU**: Roadmap initiated for first-class support of ZW810/810E/890P cards ([Issue #37519](https://github.com/sgl-project/sglang/issues/37519)).  
- **SenseNova-U1/U1.5**: Feature tracking now underway ([Issue #37742](https://github.com/sgl-project/sglang/issues/37742)).

---

### **4. Performance & Optimization**  
- **Weight Cache Daemon (Phase 1)**: Per-rank daemon using CUDA IPC reduces weight load time from **~306–327s to <1s** on Qwen3-235B FP8 ([Issue #33522](https://github.com/sgl-project/sglang/issues/33522), merged via #27139).  
- **Prefill-Decode Disaggregation**: Active roadmap for PD disaggregation across architectures and parallel strategies ([Issue #21703](https://github.com/sgl-project/sglang/issues/21703)).  
- **Kernel Fusion**:  
  - AMD ROCm: Four-kernel fusion for GLM-5.2 DSA indexer decode ([PR #38583](https://github.com/sgl-project/sglang/pull/38583)).  
  - Qwen3-Next: Fuse GDN prefill kernel chain into a single fused operation ([PR #39873](https://github.com/sgl-project/sglang/pull/39873)).  
- **Speculative Decoding**: Triton verification now uses runtime token width for accuracy ([PR #39859](https://github.com/sgl-project/sglang/pull/39859)).

---

### **5. Stability & Regressions**  
High-severity issues remain active; fix PRs not yet available:  
1. **CUDA Coredump Tracker** (#26340): Auto-collected crashes from CI runs (312 comments); root cause unknown. Affects multiple models and backends. [GitHub Issue](https://github.com/sgl-project/sglang/issues/26340)  
2. **Hierarchical Cache Logic Bug** (#39830): Hybrid GDN/Mamba model returns incorrect output due to cache state corruption — affects multi-pass inference. [GitHub Issue](https://github.com/sgl-project/sglang/issues/39830)  
3. **HiCache Write-Through Persistence Failure** (#39444): First-seen prefixes evicted before full KV backup to storage — risk of data loss. [GitHub Issue](https://github.com/sgl-project/sglang/issues/39444)  
4. **Qwen3CoderDetector String Parsing Bug** (#39836): Duplicate `<parameter=NAME>` tag truncates JSON arguments silently. [GitHub Issue](https://github.com/sgl-project/sglang/issues/39836)  

*Note: Several regression fixes were merged today (e.g., benchmark cache state logging, SafeUnpickler restrictions), but no direct fixes for core crashes yet.*

---

### **6. What This Means for Application Developers**  
- **Use AMD ROCm with confidence** for DeepSeek-V4.1 and GLM-5.3-Flash workloads — performance optimizations are landing fast.  
- **Avoid `--hicache-write-policy write_through`** with Mooncake Store until #39444 is resolved, as it risks silent data loss during eviction.  
- **Be cautious with speculative decoding** on hybrid models (GDN/Mamba) and high-concurrency setups (H20/H100), where memory access errors and scheduler crashes persist.  
- **Validate function call outputs** carefully when using `Qwen3CoderDetector`, especially with Hebrew or quoted parameter values — expect silent misparses.  
- **Benchmarking tools (`bench_serving`) now record cache state**, so results reflect actual runtime behavior — ensure consistent cache settings in production.  

> 💡 *Pro tip: Use `SGLANG_IS_IN_CI=1` consistently in benchmarks to match CI behavior and avoid misleading throughput numbers.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

---

### **1. Today's Highlights**  
The latest release cycle (b11010–b11000) delivers critical Vulkan and CUDA stability fixes for MoE and fused QKV models, including a workaround for an NVIDIA driver bug affecting `argsort_large.comp`. New support for Hexagon K-Quants (Q4_K/Q6_K) enables efficient on-device inference on Qualcomm AI chips, while improvements to MTP draft decoding and compute graph caching enhance speculative execution performance across backends.

---

### **2. Releases & Breaking Changes**  
- **`b11010`**: Fixed Vulkan crash due to NV driver bug in `argsort_large.comp` — essential for stable inference on Turing+ GPUs ([PR #28975](https://github.com/ggml-org/llama.cpp/pull/28975)).  
- **`b11007`**: Enabled CUDA graphs for MTP draft decoding, reducing overhead in speculative generation ([PR #28549](https://github.com/ggml-org/llama.cpp/pull/28549)).  
- **`b11006`**: Added full support for Hexagon Q6_K and Q4_K kernels — unlocks low-precision quantization on Snapdragon platforms ([PR #28994](https://github.com/ggml-org/llama.cpp/pull/28994)).  
- **`b11000`**: Fixed incorrect transpose function in Spacemt backend (`rvv_transposed_s32_mn_to_nm` → `s16`), preventing data corruption in int16 operations ([PR #25161](https://github.com/ggml-org/llama.cpp/pull/25161)).

> 🔔 *Migration Note*: Users of `--fuse-qkv` with Gemma 4 or Qwen3.5 must upgrade to b11006+ to avoid state-split errors; older builds may fail silently or crash during attention computation.

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - Added support for `HrmTextForCausalLM` (DFM Mimir 1B), enabling dual-stack transformer inference via alternating low/high cycles ([PR #27625](https://github.com/ggml-org/llama.cpp/pull/27625)).  
  - Expanded compatibility with Qwen3.6-35B-A3B-MTP, Qwen3.8-27B-Hybrid-DeltaNet, and DeepSeek-v4-flash-vision GGUF variants.
- **Hardware & Backends**:  
  - **Hexagon**: Full K-Quant support (Q4_K/Q6_K) now available for Qualcomm AI accelerators (e.g., Snapdragon X Elite).  
  - **Vulkan**: Improved handling of zeroed rope probes to prevent decode graph splits in Gemma 4 models ([PR #28995](https://github.com/ggml-org/llama.cpp/pull/28995)).  
  - **CUDA/HIP**: Enhanced access patterns in `im2col` for better memory coalescing ([PR #28013](https://github.com/ggml-org/llama.cpp/pull/28013)).

---

### **4. Performance & Optimization**  
- **Speculative Decoding**:  
  - CUDA graph usage for MTP drafts now reduces recompute latency by ~30% in high-throughput scenarios ([PR #28549](https://github.com/ggml-org/llama.cpp/pull/28549)).  
  - RPC server now invalidates cached compute graphs when buffers are freed, avoiding stale kernel reuse ([PR #24292](https://github.com/ggml-org/llama.cpp/pull/24292)).
- **Memory & Kernel Efficiency**:  
  - Optimized `MMQ` pipelining for RDNA 3.5 GPUs by splitting MMA/load tiles, improving instruction-level latency hiding ([PR #28714](https://github.com/ggml-org/llama.cpp/pull/28714)).  
  - Added `kernel_gemm_noshuffle_q6_k_f32_32b_trans_ila_a8_bin` for Adreno OpenCL — improves GEMM throughput for Q6_K models ([PR #28678](https://github.com/ggml-org/llama.cpp/pull/28678)).  
- **Tooling**:  
  - `llama-bench` now supports `--repack` to align code paths with `llama-cli`, enabling consistent benchmarking across backends ([PR #28968](https://github.com/ggml-org/llama.cpp/pull/28968)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Affected Backend | Fix Status | GitHub Link |
|---------|------|------------------|------------|-------------|
| Critical | Crash with MoE models (Qwen3.6-35B-A3B-MTP) on Intel Arc B70 Vulkan | Vulkan | ❌ Unresolved | [#23769](https://github.com/ggml-org/llama.cpp/issues/23769) |
| High | SYCL: 2GB+ scratchpad allocation with `ngram-mod`, TDR resets on dual Arc Pro B70 | SYCL | ❌ Unresolved | [#28860](https://github.com/ggml-org/llama.cpp/issues/28860), [#28778](https://github.com/ggml-org/llama.cpp/issues/28778) |
| High | Prompt processing speed drops ~25x after b10780 on Vulkan/RDNA3 | Vulkan | ⚠️ Partial mitigation | [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) |
| Medium | Garbage output on RTX 5060TI with IQ3_S quantization | CUDA | ❌ Unresolved | [#28581](https://github.com/ggml-org/llama.cpp/issues/28581) |
| Medium | Data corruption in Q8_0 quantization under numpy 1.* | Python tooling | ❌ Unresolved | [#28438](https://github.com/ggml-org/llama.cpp/issues/28438) |

> 💡 *Note*: Several issues involve silent fallbacks (e.g., 4-bit KV cache offloading to CPU) — consider setting `GGML_CUDA_FA_ALL_QUANTS=ON` explicitly ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633)).

---

### **6. What This Means for Application Developers**  
- **Deploying MoE Models?** Upgrade to `b11010+` immediately — older versions risk crashes on Intel Arc and Vulkan. Use `--no-kv-offload` cautiously; it may trigger early EOS on some models ([#24519](https://github.com/ggml-org/llama.cpp/issues/24519)).  
- **Building Agents with Speculative Decoding?** Leverage `b11007+`’s CUDA graph support for faster MTP drafting. Monitor `/metrics` endpoint for counters (feature request [#26516](https://github.com/ggml-org/llama.cpp/issues/26516) pending).  
- **Targeting Mobile/Edge Devices?** The new Hexagon K-Quants (Q4_K/Q6_K) enable efficient on-device inference — ideal for mobile agents using Qualcomm SoCs.  
- **Using Quantizers?** Opt-in to `--no-fallback` in `llama-quantize` via PR [#28474](https://github.com/ggml-org/llama.cpp/pull/28474) to catch shape mismatches early.  
- **Avoiding Silent Failures:** Explicitly set `GGML_CUDA_FA_ALL_QUANTS=ON` to prevent 4-bit KV fallbacks from dropping prefill speed to CPU levels ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633)).

> ✅ **Best Practice**: Always test with `--verbose` and monitor GPU driver logs (especially for SYCL/Vulkan) when deploying on multi-GPU or hybrid systems.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-17**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with a focus on stability, developer experience, and cross-platform reliability. Key developments include the removal of the built-in CLI agent (PR #18393) in response to user feedback around default cloud prompts, while new PRs address critical tool call parsing issues (e.g., MiniCPM5-2B, Gemma4) and GPU memory management for MLX on CUDA. A major fix is underway for `qwen3-vl:8b-instruct` crashes on Vulkan AMD GPUs after multi-model loading (Issue #18494).

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
- **Breaking Change:** The built-in CLI agent has been removed via [PR #18393](https://github.com/ollama/ollama/pull/18393), reverting to the older chat interface. This impacts workflows relying on automatic agent execution; users must now opt-in via a future feature flag or external launcher ([Issue #18490](https://github.com/ollama/ollama/issues/18490)).
- **API Update:** The `/api/show` and `ollama show` commands now expose model-specific `supported_reasoning_levels` and `default_reasoning_level` via [PR #18473](https://github.com/ollama/ollama/pull/18473), enabling clients to validate reasoning level compatibility.

---

### **3. New Model & Hardware Support**  
- **Model Addition Request:** Community demand grows for **Mistral Small 4**, the latest open-source variant from Mistral AI ([Issue #15142](https://github.com/ollama/ollama/issues/15142)).
- **Hardware/Backend Updates:**  
  - MLX engine now supports **Nemotron-H vision models** with dynamic-resolution preprocessing and MTP offsets ([PR #17714](https://github.com/ollama/ollama/pull/17714)).  
  - MLX runtime now avoids crashes during Windows initialization by lazy-initializing GPU state ([PR #16158](https://github.com/ollama/ollama/pull/16158)).  
  - Vulkan support sees improvements for AMD iGPUs (Intel Iris Xe) and RX 6750 XT, though long-prompt prefill remains unstable on some configurations ([Issue #17870](https://github.com/ollama/ollama/issues/17870), [#18494](https://github.com/ollama/ollama/issues/18494)).

---

### **4. Performance & Optimization**  
- **Memory & Load Efficiency:**  
  - MLX now applies a **GPU memory budget (95% of free memory)** at load time to prevent OOM during model loading on CUDA devices ([PR #18481](https://github.com/ollama/ollama/pull/18481)).  
  - MLX warm-up prefill after load populates compile caches without affecting real requests ([PR #16085](https://github.com/ollama/ollama/pull/16085)), reducing TTFT on cold loads.
- **Latency Reduction:**  
  - Server-side structured outputs are now applied in a **single pass** for thinking models, eliminating redundant prefill and re-rendering steps ([PR #18479](https://github.com/ollama/ollama/pull/18479)) — improving token generation efficiency.

---

### **5. Stability & Regressions**  
*Critical stability issues reported today:*  
1. **`qwen3-vl:8b-instruct` crashes on Vulkan AMD RX 6750 XT after loading multiple VL models** (`0xc0000005` access violation) — reproducible on Windows 0.34.1 ([Issue #18494](https://github.com/ollama/ollama/issues/18494)).  
2. **Gemma 4 E4B multimodal projector causes host OOM on Jetson Orin Nano 8GB** when using `--load-mode dio`, despite success without DIO ([Issue #18396](https://github.com/ollama/ollama/issues/18396)).  
3. **MiniCPM5-2B native tool calls fail to parse** due to XML tokens being stripped during detokenization ([Issue #18483](https://github.com/ollama/ollama/issues/18483)), fixed in [PR #18499](https://github.com/ollama/ollama/pull/18499).  
4. **Gemma4 renderer drops tool parameters named `description`, `type`, `properties`, etc.** — leading to incomplete tool calls ([Issue #18468](https://github.com/ollama/ollama/issues/18468)).

---

### **6. What This Means for Application Developers**  
- **Tool Call Reliability:** If you're building agents using native tool calling (especially with MiniCPM5-2B or Gemma4), expect parsing failures until PR #18499 lands. Validate tool schema structure carefully.
- **Cloud Integration Caution:** `deepseek-v4.1-flash:cloud` defaults to `"high"` reasoning level, which is not supported — this may cause client errors unless explicitly overridden ([Issue #18484](https://github.com/ollama/ollama/issues/18484)).
- **Multi-Model Environments:** Avoid concurrent loading of multiple vision-language models (VL) on Vulkan AMD GPUs — risk of crash is high. Use single-model isolation or test on target hardware.
- **Agent Workflows:** The removal of the built-in CLI agent means your app must either manage agent logic externally or wait for an opt-in feature. Consider designing agent launchers as standalone processes.
- **Performance Tuning:** Leverage the new `supported_reasoning_levels` metadata to dynamically control model behavior. For high-throughput inference, ensure MLX is configured with proper GPU memory budgets.

> ✅ *Stay updated via GitHub: [ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-17**

---

### **1. Today's Highlights**  
The LiteLLM proxy continues to mature with significant enhancements in budget enforcement, observability, and multi-provider support. Key developments include improved team admin controls (RPM and max budget editing), better cost tracking for Bedrock and Vertex AI, and new pass-through routes for Amazon Transcribe. Critical fixes address streaming reliability, rate limiter logic errors, and budget bypass vulnerabilities.

---

### **2. Releases & Breaking Changes**  
- **v1.103.0-dev.1** and **v1.102.0-rc.2** released today with enhanced security via [cosign-signed Docker images](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
- No breaking API changes reported; these are pre-release candidates focused on stability and security hardening ahead of v1.103.0 final.

---

### **3. New Model & Hardware Support**  
- ✅ **Amazon Transcribe SigV4 pass-through**: Added via PR [#41515](https://github.com/BerriAI/litellm/pull/41515) — enables secure, virtual-key-based access to AWS Transcribe jobs through the proxy.  
- ✅ **Vertex AI GCS file streaming**: PR [#41506](https://github.com/BerriAI/litellm/pull/41506) now streams large batch output files directly from Google Cloud Storage without full memory load.  
- ✅ **vLLM Realtime API support**: Feature request [#23102](https://github.com/BerriAI/litellm/issues/23102) remains open but workarounds exist; no native integration yet.

---

### **4. Performance & Optimization**  
- **Rate Limiter Fix**: PR [#34140](https://github.com/BerriAI/litellm/issues/34140) resolves a critical bug where per-team per-model limits were enforced at half their configured value (e.g., N → ~N/2). This ensures accurate RPM/TPM control.  
- **Streaming Efficiency**: PR [#41349](https://github.com/BerriAI/litellm/pull/41349) improves spend tracking for team members even when no budget is assigned, enabling more granular usage monitoring.  
- **Logging Optimization**: PR [#40934](https://github.com/BerriAI/litellm/pull/40934) reduces log processing overhead by scanning each record once and collapsing base64 payloads before secret filtering — critical for high-throughput OCR and PDF ingestion workloads.

---

### **5. Stability & Regressions**  
- ⚠️ **Zero-cost budget bypass leak** ([#41344](https://github.com/BerriAI/litellm/issues/41344)): A zero-cost model can be routed to a paid fallback after budget exhaustion, leading to unbounded spending. **Fix PR pending.**  
- ⚠️ **Ghost models in multi-worker setup** ([#27852](https://github.com/BerriAI/litellm/issues/27852)): Deleted models remain cached across workers due to Redis Pub/Sub sync issues when `--num_workers > 1`. **PRs in review.**  
- ⚠️ **Streaming usage loss** ([#36168](https://github.com/BerriAI/litellm/issues/36168)): Final streaming chunks with non-empty `choices` lose upstream `usage` data, causing incorrect billing. **Fix PR under development.**  
- ⚠️ **Rate limiter double-counting** ([#34140](https://github.com/BerriAI/litellm/issues/34140)): Confirmed root cause identified; fix in progress.  
- 🛑 **Gemini/Vertex rejects `$ref`/`$defs` in tool outputs** ([#38223](https://github.com/BerriAI/litellm/issues/38223)): JSON Schema validation failure blocks tool results. Requires schema sanitization or provider-specific handling.

---

### **6. What This Means for Application Developers**  
- **Budgeting & Cost Control**: Use `max_budget`, `rpm_limit`, and `tpm_limit` with care — team admins can now edit RPM and budget settings (PR [#41525](https://github.com/BerriAI/litellm/pull/41525)), enabling finer-grained control. However, verify that zero-cost models don’t bypass fallback costs.  
- **Observability**: Enable OpenTelemetry + Langfuse tracing (PR [#41140](https://github.com/BerriAI/litellm/pull/41140)) to capture user/session context in spans. Add `api_key_alias` explicitly if needed for Prometheus metrics.  
- **Streaming Reliability**: Avoid `fast_path` optimizations in tool-call flows until [#30053](https://github.com/BerriAI/litellm/issues/30053) is resolved; otherwise, expect XML format breaks in Claude responses.  
- **Multi-Provider Workflows**: Leverage new Transcribe and Vertex AI streaming capabilities for scalable audio and batch processing pipelines. For self-hosted backends, validate `api_base` routing behavior (e.g., Anthropic’s `/count_tokens` bug in [#30217](https://github.com/BerriAI/litellm/issues/30217)).  

> 🔍 **Action Item**: Audit all custom auth configurations and `max_end_user_budget_id` setups — concurrent first requests may bypass defaults ([#40095](https://github.com/BerriAI/litellm/issues/40095)).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-17**

---

### **1. Today's Highlights**  
The Unsloth project continues its rapid evolution with critical stability and security improvements, particularly in the desktop and Studio environments. Key developments include a fix for a remote image SSRF vulnerability via PR #11160, enhanced Windows installer robustness (PR #11138, #11119), and a major refactor to prevent CI flakiness across multiple systems—highlighting a growing focus on reliability and developer experience.

---

### **2. Releases & Breaking Changes**  
- **Windows-ARM64 Binaries** released today (GitHub: [unslothai/unsloth#latest](https://github.com/unslothai/unsloth/releases/latest)), enabling native inference support on Apple Silicon and ARM-based Windows devices.  
- **No breaking API changes** reported in the past 24 hours. However, users should monitor upcoming updates around `openai_api_auto_switch_model` behavior (Issue #11140) and model reloading logic (Issue #11092).

---

### **3. New Model & Hardware Support**  
- **AMD ROCm 7.14** now explicitly supported in installer logic (PR #11068), with fallback to Vulkan build if ROCm fails to run—a crucial improvement for AMD GPU users.  
- **Qwen3.5 / Qwen3.6 GGUF export pipeline** now properly handles `ssm_conv1d.weight` tensors in final layers (fixed in Issue #6071).  
- **Nixpkgs packaging** available for Unsloth Desktop (Issue #11135), expanding deployment options for Linux/NixOS users.  
- **Apple M4 Pro** performance tracking underway for large-context models (Issue #11141), with prefill progress exposure planned via API.

---

### **4. Performance & Optimization**  
- **Memory usage growth** observed after recent `llama.cpp` update (Issue #10921), with no immediate resolution yet—users advised to monitor memory footprint during long-running sessions.  
- **Model loading latency** remains high for large GGUF files (e.g., Qwen3.8-27B UD-Q4_K_S); progress tracking via API is being added to improve UX (Issue #11141).  
- **vLLM-style runtime metrics** are under active development (PR #4238), with opt-in telemetry and Prometheus export planned—enabling deep observability for inference and training workloads.

---

### **5. Stability & Regressions**  
- **Critical SSRF vulnerability** in remote image handling (PR #11160): previously, Studio forwarded unvalidated URLs directly to `llama-server`, risking arbitrary file access. Now fixed by fetching images server-side.  
- **Windows installer failures** due to incorrect path resolution (Issue #10921, #11012, #10859): installer ignores user-chosen paths and defaults to `~/.unsloth`. Fix in progress via PR #11138.  
- **ROCm 7.14 detection failure** causes incorrect PyTorch installation (Issue #10657): installer installs PyTorch 2.11 with ROCm 7.2 instead of 7.14—resolved in PR #11068.  
- **Model deduplication bug** in tool calls leads to unintended suppression (Issue #10379): proposed feature to disable deduplication for use cases requiring repeated identical calls.

---

### **6. What This Means for Application Developers**  
- **Secure model serving**: Use `openai_api_auto_switch_model` cautiously—ensure models are pre-loaded when cold-starting (Issue #11140).  
- **Cross-platform consistency**: Expect improved Windows and AMD GPU support, but validate installation paths manually until PR #11138 lands.  
- **Observability-ready**: Prepare for vLLM-style metrics (PR #4238)—enable opt-in telemetry to gain visibility into inference throughput, token rates, and memory pressure.  
- **Avoid race conditions**: The `studio: hardening follow-up` PR (#5406) addresses refresh-token races and sandbox bypasses—ensure your app respects auth contracts and does not assume local state persistence.

> 🔗 *Explore the full context:*  
> - [PR #11160: Fix SSRF in remote image handling](https://github.com/unslothai/unsloth/pull/11160)  
> - [PR #11068: ROCm/Vulkan fallback for Studio](https://github.com/unslothai/unsloth/pull/11068)  
> - [PR #4238: vLLM-style runtime metrics](https://github.com/unslothai/unsloth/pull/4238)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*