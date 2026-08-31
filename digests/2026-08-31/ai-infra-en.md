# AI Infrastructure Digest 2026-08-31

> Generated: 2026-08-31 15:48 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-08-31**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q3 2026 is defined by rapid convergence toward next-generation hardware (Blackwell SM120, AMD MI308X, Intel Arc B70) and model architectures (Qwen3.8-Flash-Next, GLM-5.3-Flash, Hy4-preview). While serving engines like vLLM and SGLang lead in kernel-level optimization and speculative decoding, lightweight runtimes such as llama.cpp and Ollama dominate local deployment and developer accessibility. The emergence of Rust-based gateways (LiteLLM) and security-hardened agent platforms (Unsloth) signals a maturing ecosystem focused on production reliability, low-latency routing, and safe agentic execution.

---

### **2. Activity Comparison**

| Project | Issues Open (High/Critical) | PRs Merged (Last 24h) | Releases | Status |
|--------|-------------------------------|--------------------------|----------|--------|
| **vLLM** | 6 (3 Critical) | 12 | None | Active development; stability challenges on Blackwell |
| **SGLang** | 8 (3 High) | 9 | None | Aggressive feature rollout; CI instability concerns |
| **llama.cpp** | 5 (4 High) | 8 | `b10713`–`b10720` | Frequent minor releases; backend-specific bugs |
| **Ollama** | 5 (2 High) | 3 | None | Stability issues on RTX 5060 Ti/Orin AGX; tooling gaps |
| **LiteLLM** | 4 (1 Critical) | 4 | None | Strategic focus on Rust migration and cost modeling |
| **Unsloth** | 6 (2 Critical) | 4 | None | Security fixes prioritized; UI/state management flaws |

> ✅ *Note: All projects show no new releases in the last 24 hours, but ongoing PR activity indicates high momentum in core development.*

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next** | ✅ (PLE CPU offload) | ✅ (MLA, iHC, MoE) | ✅ (top-k radix, DFlash) | ❌ (GGUF validation error) | ✅ (Gemini-3.5-transcribe-preview support) | ❌ (unrecognized `qwen4exp`) |
| **GLM-5.3-Flash** | ✅ (FlashInfer v0.6.18) | ✅ (crashes under load) | ✅ (320B hybrid) | ⚠️ (video input blocked) | ✅ (WebM audio via Vertex AI) | ⚠️ (ROCm memory spikes) |
| **Hy4-Preview** | ✅ (ROCm gfx950) | ✅ (full MLA + speculative drafting) | ❌ | ❌ | ❌ | ❌ |
| **DeepSeek-V4-Flash** | ⚠️ (kernel gaps on SM12.x) | ✅ (ROCm optimized) | ❌ | ❌ | ❌ | ❌ |
| **Apple Silicon (MPS)** | ❌ | ✅ (native Torch runner) | ✅ (Metal FA-vec) | ❌ | ❌ | ❌ |

> 🏆 **Winner**: **SGLang** leads in architectural innovation with full support for Hy4-preview, including advanced features like gated MLA, learned attention sinks, and MTP/NextN speculation.  
> 🥈 **Runner-up**: **vLLM** excels in GPU-optimized inference for mainstream models (Qwen/GLM), especially on Blackwell.  
> 🥉 **Edge Case Leader**: **llama.cpp** offers broadest hardware coverage (Vulkan, Metal, SYCL) despite performance trade-offs.

---

### **4. Performance Frontier**

| Optimization Focus | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Prefix Reuse** | 🔥 DSV3 GEMM, MRoPE fusion, tiling independence | 🔥 Semantic reuse (fuzzy-match radix), HiCache | ⚠️ Top-k radix sort (Vulkan) | ❌ Context ignored on MLX | ❌ Streaming metadata loss | ⚠️ Prompt cache inefficiency |
| **Batching & Tiling** | 🔥 Row-strided tensor support | 🔥 Graph mode inference (MI308X) | 🔥 Static mat-vec tuning (RDNA3) | ❌ No batching control | ❌ No per-request batching | ❌ Inference latency non-determinism |
| **Quantization & Kernels** | 🔥 PTX 9.4 ldmatrix.s8.s4, W4A8-INT8 | 🔥 FLUX.2 NVFP4 fusion, FP8 block-scale | 🔥 CUDA MOE fusion (specdec), Vulkan shaders | ⚠️ GGUF parsing errors | ✅ Adaptive cost modeling | ⚠️ Intel XPU optimizer crash |
| **Distributed Serving** | 🔥 Speculative decoding, MoE offloading | 🔥 PD disaggregation, HiCache | ❌ | ❌ | 🔥 Adaptive routing (MDP proposal) | ❌ |
| **Latency Reduction** | 🔥 Reduced GPU launches (MRoPE) | 🔥 Weight Cache Daemon (<1s load) | ⚠️ FA-vec tuning (M1/M2) | ❌ | 🔥 Rust migration (sub-1ms target) | ⚠️ SQLite I/O overhead |

> 💡 **Key Insight**: The frontier has shifted from pure throughput to **predictable, deterministic, and observable performance**, particularly in long-context and agentic workloads — where caching, streaming fidelity, and state consistency are now critical differentiators.

---

### **5. Layer Positioning**

| Project | Primary Layer | Key Differentiator |
|-------|---------------|--------------------|
| **vLLM** | **Serving Engine** | Industry-standard for high-throughput, GPU-optimized inference; best-in-class for Blackwell kernels and MoE offloading |
| **SGLang** | **Serving Engine + Agent Runtime** | Full-stack agentic support: speculative decoding, tool calling, semantic cache reuse; designed for real-time agents |
| **llama.cpp** | **Local Runtime / Embedded Inference** | Cross-platform, minimal dependencies; ideal for edge devices, Apple Silicon, and Vulkan/SYCL deployments |
| **Ollama** | **Developer Gateway + Local Runtime** | Simplified UX for developers; bridges model hosting and CLI interaction, but lacks enterprise-grade observability |
| **LiteLLM** | **Gateway / Orchestration Layer** | Multi-provider routing, cost-aware scheduling, and API abstraction; future-facing with Rust migration |
| **Unsloth** | **Fine-Tuning & Studio Platform** | Focused on training stability, secure agent workflows, and studio UX — less about serving, more about safety and integration |

> 📌 **Strategic Implication**: vLLM and SGLang are becoming the de facto backbones for scalable inference; LiteLLM and Unsloth are evolving into **critical middleware layers** enabling multi-provider orchestration and secure agent execution.

---

### **6. Trend Signals**

#### **Emergent Trends Extracted from Today’s Activity:**
1. **Hardware-First Optimization**: Blackwell (SM120) is driving kernel-level changes across vLLM, SGLang, and llama.cpp — indicating that **GPU architecture readiness is now a primary deployment criterion**.
2. **Speculative Decoding Maturation**: vLLM and SGLang have moved beyond single-token drafts to **multi-token, MoE-aware speculative decoding**, signaling readiness for complex agent pipelines.
3. **Security-Centric Design**: Unsloth’s prompt injection fix (#6967) and LiteLLM’s streaming redaction highlight that **agent safety is now a non-negotiable requirement**, not an afterthought.
4. **Observability Gaps Are Expanding**: Despite performance gains, tools like Ollama and LiteLLM suffer from missing telemetry (e.g., prompt cache stats, AWS request IDs), revealing a **growing need for standardized instrumentation**.
5. **Rust Migration as Competitive Edge**: LiteLLM’s sub-1ms goal via Rust reflects a broader shift toward **ultra-low-latency gateways** required for real-time LLM agents.

#### **What Application Developers Should Watch:**
- ✅ **Pin to stable commits** for vLLM (`v0.26.1rc1.dev608+g99a10304d`) and SGLang until regression fixes land.
- ✅ **Avoid Qwen3.8-Flash-Next GGUF in Ollama** due to validation issues — use official or tested variants.
- ✅ **Monitor LiteLLM’s Rust migration** — early access will unlock sub-1ms gateway performance for agent systems.
- ✅ **Enforce context limits at app level** — Ollama and Unsloth fail to respect `num_ctx` on MLX and may trigger watchdog panics.
- ✅ **Use proxies explicitly** — Ollama’s proxy fix (PR #18145) is essential for corporate environments.

---

> 🔚 **Final Takeaway**: The AI infrastructure stack is no longer just about speed — it's about **reliability, security, observability, and composability**. Projects that integrate these dimensions seamlessly (e.g., SGLang, LiteLLM, Unsloth) are positioning themselves as the backbone of next-gen agentic applications.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-08-31

---

### **1. Today's Highlights**  
vLLM continues its aggressive push toward full Blackwell (SM120) support, with critical fixes and optimizations for Qwen3.8-Flash-Next and GLM-5.3-Flash on RTX 5090/PRO 6000. Key developments include: a fix for FlashInfer autotuning before CUDA graph capture (#54507), improved DSV3 GEMM performance on inner-contiguous tensors (+12%–81%), and new PRs enabling speculative decoding and MoE offloading for next-gen models.

---

### **2. Releases & Breaking Changes**  
None in the last 24 hours. No new releases or breaking API/config changes reported.

---

### **3. New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash** added via PR #53906 (requires FlashInfer v0.6.18).  
- ✅ **Qwen3.8-Flash-Next** now supports PLE CPU offload with UVA (#54371), enabling larger context inference on limited GPU memory.  
- ✅ **Hy4-Preview** enabled on ROCm gfx950 (#54432), expanding AMD support for newer model variants.  
- 🚧 **DeepSeek-V4-Flash** kernel coverage gaps on SM12.x remain open (#41063); DeepGEMM still missing key paths.  
- ⚠️ **Intel GPU quantization roadmap** active but not yet merged — W4A16 INT is done; MXFP4/MXF4 pending (#37979).

---

### **4. Performance & Optimization**  
- 🔥 **DSV3 GEMM**: Enabled for inner-contiguous and row-strided tensors → **+12% to +81% kernel performance** on Qwen3.8-Flash-Next (#54565).  
- 🔥 **QK-norm/RoPE/KV-cache fusion extended to MRoPE** (Qwen3-VL 3D) → **3 fewer GPU launches per layer**, improving decode throughput (#50212).  
- 🔥 **Prefix-prefill tiling independence from KV page size** → better compatibility with hybrid Mamba/attention models (#54194).  
- 📈 **Graph mode TTFT regression**: 25% worse than eager mode on Qwen3-30B-A3B (TP4) — under investigation (#45709).  
- 💡 **PTX 9.4 ldmatrix.s8.s4** adopted in W4A8-INT8 kernels → hardware sign extension of packed INT4 → INT8 during load (#49529).

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|------|--------|------------|
| ❌ Critical | [#54521](https://github.com/vllm-project/vllm/issues/54521) | Greedy decoding non-deterministic on `Qwen3.8-Flash-Next` when prompt nears `indexer_budget` due to sparse attention switching | Open |
| ❌ Critical | [#53960](https://github.com/vllm-project/vllm/issues/53960) | `VLLM_PLE_CPU_OFFLOAD=1` deadlocks at startup on single-GPU (TP=1) for `Qwen3.8-Flash-Next` on GB10/sm_121 | Open |
| ⚠️ High | [#54094](https://github.com/vllm-project/vllm/issues/54094) | DFlash2 + YaRN fails to reuse prefix cache despite identical prompts (~1M tokens) | Open |
| ⚠️ High | [#49922](https://github.com/vllm-project/vllm/issues/49922) | Regression in v0.26.0: `Assertion res == CUresult::CUDA_SUCCESS` in FlashMLA for DeepSeek-V4-Pro | Open |
| ⚠️ High | [#51884](https://github.com/vllm-project/vllm/issues/51884) | FP8 block-scaled weights fail on sm120 (RTX 5090): “Unknown SF transformation” during `process_weights_after_loading` | Open |

> **Note**: Several regressions are tied to Blackwell-specific kernels (SM120), indicating ongoing stability challenges during early adoption.

---

### **6. What This Means for Application Developers**  
- **Use `VLLM_PLE_CPU_OFFLOAD=1` cautiously**: While it enables running large models like Qwen3.8-Flash-Next on smaller GPUs, **deadlocks on TP=1 are known and unresolved** (#53960). Use only with multi-GPU setups until fixed.  
- **Expect non-determinism in greedy decoding** if your prompts approach `indexer_budget` on Qwen3.8-Flash-Next — avoid this threshold or use sampling (`temperature > 0`) for consistent output.  
- **Leverage DSV3 GEMM and PTX 9.4 optimizations** for best performance on Blackwell GPUs — these are now live in mainline.  
- **Monitor FlashInfer autotune behavior**: Recent fix (#54507) ensures correct MLA decode path selection — ensure you’re on latest dev builds.  
- **Multi-modal developers**: Expect incremental support for LoRA on MM tower/connectors beyond Qwen VL/Idefics3 (#31479), and consider async sidecar architecture for image preprocessing (#49288).

> 👉 **Actionable Tip**: For production deployment on Blackwell, pin to `v0.26.1rc1.dev608+g99a10304d` or later and test with `collect_env.py` + minimal reproducers for any crashes.

---  
*Data source: [vllm-project/vllm GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# **SGLang Digest – 2026-08-31**

---

### **1. Today's Highlights**  
The SGLang project continues to advance its support for next-generation LLM architectures and distributed inference, with key developments in **Hy4-preview** and **ROCm (AMD MI308X)** performance optimization. Critical stability fixes are underway for **HiCache deadlock**, **CUDA coredumps**, and **prefix cache invalidation** under agentic workloads — particularly affecting Qwen3.8-Flash-Next and GLM-5.3-Flash models.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking API/config changes reported in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **Hy4-preview (text-only)**: Added full support via PR [#36805](https://github.com/sgl-project/sglang/pull/36805), including MLA with DSA sparse attention, iHC, gated MLA, learned attention sinks, sigmoid-gated MoE, and MTP/NextN speculative drafting.
- ✅ **AMD MI308X (gfx942/gfx950)**: PRs [#37267](https://github.com/sgl-project/sglang/pull/37267) and [#36144](https://github.com/sgl-project/sglang/pull/36144) enable optimized graph inference and `tc_piecewise` prefill CUDA graphs for DeepSeek-V4 on ROCm.
- ✅ **Apple Silicon (MPS)**: PR [#36780](https://github.com/sgl-project/sglang/pull/36780) adds native Torch-based runner support for macOS, enabling consistent cross-platform development.

---

### **4. Performance & Optimization**  
- 🚀 **Weight Cache Daemon**: Phase 1 landed in #27139; reduces weight load time from ~306–327s to **<1s** on Qwen3-235B FP8 ([blog](https://www.lmsys.org/blog/2026-08-21-sglang-weight-cache-daemon)).
- ⚙️ **Semantic KV Cache Reuse**: PR [#31057](https://github.com/sgl-project/sglang/pull/31057) introduces pluggable fuzzy-match radix backend for reuse across paraphrased prompts and RAG contexts.
- 🔥 **FLUX.2 NVFP4 Fusion**: PR [#37096](https://github.com/sgl-project/sglang/pull/37096) fuses FC1 → SwiGLU → FC2 quantization for high-quality diffusion generation, reducing intermediate memory overhead.
- 💡 **MiniMax-H3 AdaLN Optimization**: PR [#37266](https://github.com/sgl-project/sglang/pull/37266) implements tiered plan caching (pinned-host + per-plan LRU), cutting GPU idle time from 5.8–6.7s per request.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| 🔴 High | [#26340](https://github.com/sgl-project/sglang/issues/26340) | Auto-collected CUDA coredumps from `pr-test.yml`; widespread instability in CI | Ongoing investigation |
| 🔴 High | [#36537](https://github.com/sgl-project/sglang/issues/36537) | Qwen3.8-Flash-Next tool parser loops indefinitely on token ID 0 | Open; reproducible in official image |
| 🔴 High | [#36550](https://github.com/sgl-project/sglang/issues/36550) | GLM-5.3-Flash crashes at first decode token after cold prefill >262K tokens | Open; CUDA error in graph-replay context |
| 🟡 Medium | [#30760](https://github.com/sgl-project/sglang/issues/30760) | HiCache prefetch deadlock with TP=4, no PP | Open; mismatched `all_reduce` call count |
| 🟡 Medium | [#37183](https://github.com/sgl-project/sglang/issues/37183) | GLM-5.3-Flash fails on AMD MI308X due to unrecognized `glm5_next` model type | Open; Transformers compatibility issue |
| 🟡 Medium | [#37160](https://github.com/sgl-project/sglang/issues/37160) | LMCache ignores `cache_salt`, breaking tenant isolation | Open; keys based only on tokens |

> **Note**: Multiple regressions tied to **PD disaggregation**, **HiCache**, and **speculative decoding** under high concurrency.

---

### **6. What This Means for Application Developers**  
- **Agentic Workloads**: Be cautious with long-context sessions on Qwen3.8-Flash-Next and GLM-5.3-Flash — expect potential crashes post-prefill. Use `--disable-cuda-graph` as a workaround until [#36550](https://github.com/sgl-project/sglang/issues/36550) is resolved.
- **Multi-Tenant Deployments**: Avoid relying on `cache_salt` for isolation when using LMCache — PR [#37160](https://github.com/sgl-project/sglang/issues/37160) reveals a critical gap.
- **High-Throughput Inference**: Leverage the **Weight Cache Daemon** (Phase 1) for massive models like Qwen3-235B FP8 — it cuts cold-start latency by over 99%.
- **Cross-Platform Development**: With MPS and ROCm support now in progress, developers can build and test on Apple Silicon and AMD GPUs using the same Torch path as CUDA — no need for MLX-specific runners anymore.

> **Action Item**: Monitor [CI Health Tracker](https://github.com/sgl-project/sglang/issues/17050) — 1 broken, 18 flaky tests today; consider pinning to stable commits if deploying in production.

---  
*Digest generated: 2026-08-31 | Source: [sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-08-31**

---

### **1. Today's Highlights**  
The latest releases focus on critical performance and stability improvements across GPU backends, particularly for **ROCm (HIP)**, **Metal (Apple Silicon)**, and **Vulkan (AMD)**. Key advances include extended MOE fusion support in CUDA, optimized top-k radix sorting for Qwen 3.8 Flash Next on Vulkan, and new Metal FA-vec tunings for M1/M2 chips—boosting inference efficiency on Apple’s latest silicon.

---

### **2. Releases & Breaking Changes**  
- **`b10720`**: Added `radix TOP_K` support for long rows in ROCm backend (#27466) — improves large-context handling for models like Qwen.  
- **`b10719`**: Enhanced Metal FA-vec tuning for M1 processors (#28078), improving vectorized kernel throughput.  
- **`b10718`**: Extended CUDA MOE fusion to speculative decoding (`specdec`), removing prior 1-token restriction (#27621).  
- **`b10717`**: Improved SYCL memory querying for Intel GPUs via L0 and SYCL API (#27968).  
- **`b10714`**: Tuned mat-vec kernel rows for batched inference on RDNA3 (Strix Halo) via Vulkan (#27909).  
- **`b10713`**: Updated WebGPU memory tracking for `MUL_MAT` operations (#28071).  

> 🔗 [GitHub Releases](https://github.com/ggml-org/llama.cpp/releases)

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen 3.8 Flash Next**: Full support added with new `top_k radix sort` shader and `top-k qsa fusion` on Vulkan (#28032).  
- ✅ **GLM-5.3-Flash (320B hybrid)**: Added model architecture support via PR #27773, enabling vision + text inference.  
- ✅ **XDNA Backend**: Feature request opened (#21725) — community interest growing for edge AI deployment.  
- ✅ **Laguna S 2.1 DFlash**: Requested support (#26669) — targeted at high-throughput speculative decoding workflows.  
- ✅ **Intel Arc Pro B70/B60**: Active debugging and optimization efforts underway (see issue #27198, #27595).

> 🔗 [Issue #21725 – XDNA Backend](https://github.com/ggml-org/llama.cpp/issues/21725)  
> 🔗 [PR #27773 – GLM-5.3-Flash](https://github.com/ggml-org/llama.cpp/pull/27773)

---

### **4. Performance & Optimization**  
- **CUDA MOE Fusion Expansion**: Now supports `specdec`, enabling faster speculative decoding for MoE models beyond single-token limits (#27621).  
- **Metal FA-vec Tunings**: New optimizations for M1/M2 CPUs improve matrix-vector throughput by ~15–20% in benchmarks (internal testing).  
- **Vulkan Mat-Vec Tuning**: Static 4-row configuration on RDNA3 boosts batched inference speed up to 12% vs dynamic fallback (#27909).  
- **WebGPU Memory Tracking**: Added `MUL_MAT` to ops requiring extra memory allocation — prevents silent overflows (#28071).  
- **Speculative Decoding Improvements**: PR #28097 adds draft-head-only GGUF support for unsloth layout, resolving load regressions.

> 🔗 [PR #27621 – CUDA MOE Fusion](https://github.com/ggml-org/llama.cpp/pull/27621)  
> 🔗 [PR #28097 – Qwen4Exp Draft Support](https://github.com/ggml-org/llama.cpp/pull/28097)

---

### **5. Stability & Regressions**  
⚠️ **Critical Issues Reported (High Severity)**:
- **SYCL Crashes on Dual Intel Arc GPUs** (A770/B70): `DEVICE_LOST` errors during `dev2dev_memcpy` (#27198), affecting multi-GPU inference.  
- **SYCL Multi-GPU Hangs with Flash Attention** on Arc Pro B70 under sustained load; triggers GPU engine reset (#25692).  
- **Vulkan Pipeline Compile Hang** on gfx1103 (Radeon 780M) — server never reaches listening state (#27998).  
- **Memory Leaks in Vulkan Engine** reported multiple times (#27725, #28008), impacting long-running servers.  
- **SIGSEGV on SYCL DS4F** due to missing f16 conversion on Intel B70 (#26462).  

🛠️ **Fixes in Progress**:  
- PR #28075 addresses scheduler bug causing WebGPU failures (#28075).  
- PR #28098 introduces WIP sparse attention on Metal — may resolve some M2 decode stalls.

> 🔗 [Issue #27198 – SYCL DEVICE_LOST](https://github.com/ggml-org/llama.cpp/issues/27198)  
> 🔗 [Issue #25692 – GPU Hang on Flash Attention](https://github.com/ggml-org/llama.cpp/issues/25692)

---

### **6. What This Means for Application Developers**  
- **Use `--split-mode layer` cautiously on SYCL** — dual-GPU setups are unstable on Intel Arc (A770/B70); avoid unless using `--fit` or `--no-split`.  
- **Leverage `b10718+` for MoE models** — extended CUDA MOE fusion enables faster speculative decoding with larger drafts.  
- **For Apple M2/M1 users**: Upgrade to `b10719+` for improved FA-vec performance; expect ~15–20% better decode speed.  
- **Monitor Vulkan builds** if targeting AMD Strix Halo — recent issues with `top_k` and `dflash` may impact context length scalability.  
- **Expect upcoming UI enhancements** — PRs #27959–#27945 introduce Hugging Face Hub integration, model compatibility estimation, and download pipelines in `llama-ui`.

> 🔗 [UI Development PRs](https://github.com/ggml-org/llama.cpp/pulls?query=is%3Aopen+label%3Aserver%2Fui+)  
> 🔗 [Latest Stable Builds](https://github.com/ggml-org/llama.cpp/releases/latest)

---  
*Digest generated: 2026-08-31 | Source: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-08-31**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its support for advanced multimodal and agentic models, with critical issues reported around Qwen3-series tool calling, video model integration, and GPU driver stability on newer hardware (RTX 5060 Ti, Jetpack 7.2). Key PRs focus on improving GGUF parsing correctness, proxy handling, and API extensibility—particularly for model evaluation metrics and prompt caching telemetry.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, ongoing work in PRs suggests potential future changes:  
- **PR #18153**: Improves template selection logic by validating delimiter markers before falling back to Levenshtein distance—critical for models with complex tool-calling syntax. [GitHub](https://github.com/ollama/ollama/pull/18153)  
- **PR #18145**: Adds HTTP proxy support to `x/transfer`, fixing issue #15358 where proxies were ignored during model manifest downloads. [GitHub](https://github.com/ollama/ollama/pull/18145)

> ⚠️ *Note: Users behind corporate firewalls should expect download failures unless using a configured proxy or waiting for this fix to land.*

---

### **3. New Model & Hardware Support**  
- **Qwen3.8-Flash-Next (GGUF)**: Reported as incompatible with `ollama create` due to validation errors in `llama-quantize`—a known regression tied to unsloth’s UD-Q4_K_XL quantization. [Issue #18146](https://github.com/ollama/ollama/issues/18146)  
- **Gemma 4 Vision Models**: Feature request #15626 calls for exposing `max_soft_tokens` as a runtime parameter—currently hardcoded to 280. This would enable variable-resolution image token budgets. [GitHub](https://github.com/ollama/ollama/issues/15626)  
- **Video Model Limitation**: qwen3-vl and similar models cannot accept video input via Ollama, despite having native frame sampling capabilities. Users must manually extract frames. [Issue #18151](https://github.com/ollama/ollama/issues/18151)  
- **NVIDIA Orin AGX (Jetpack 7.2 R39)**: GPU not detected due to CUDA error `cudaSetDevice err: 801`. [Issue #18067](https://github.com/ollama/ollama/issues/18067)  
- **MLX Support**: Persistent crashes (`panic: index out of range`) observed when loading plain Qwen3-8B-MLX-4bit safetensors via `ollama create`. [Issue #17569](https://github.com/ollama/ollama/issues/17569)

---

### **4. Performance & Optimization**  
- **Prompt Caching Telemetry**: Feature request #8008 proposes adding `cached_tokens` to OpenAI-compatible responses—mirroring OpenAI’s prompt cache usage reporting. [GitHub](https://github.com/ollama/ollama/issues/8008)  
- **Model Evaluation Metrics**: PR #11159 adds `/metrics` endpoint with `ollama_eval_duration_total` and `ollama_eval_total` counters—enabling fine-grained inference performance monitoring. [GitHub](https://github.com/ollama/ollama/pull/11159)  
- **Context Window Enforcement**: Issue #18125 reports that `num_ctx` from Modelfile is ignored on MLX, leading to Metal watchdog panics on long prompts. [GitHub](https://github.com/ollama/ollama/issues/18125)  
- **Reduced Package Size**: Request #14228 asks for smaller release packages without CUDA for CPU/Vulkan-only users. [GitHub](https://github.com/ollama/ollama/issues/14228)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Link |
|---------|------|-------------|------|
| 🔴 High | **GPU Driver Crash (VIDEO_TDR_TIMEOUT_DETECTED)** | NVIDIA driver crashes transitioning from single-turn to multi-turn requests post-0.32.15 update. Affects Windows + RTX 5060 Ti. | [Issue #18152](https://github.com/ollama/ollama/issues/18152) |
| 🔴 High | **RTX 5060 Ti GPU Reset (Xid 62/154)** | Reproducible GPU reset after inference on Ollama 0.33.1/0.33.2. Caused by `llama-server`. | [Issue #18144](https://github.com/ollama/ollama/issues/18144) |
| 🟡 Medium | **Tool Calling Broken in Qwen3.5-27B** | Tool calling non-functional; repetition penalties silently ignored. | [Issue #14493](https://github.com/ollama/ollama/issues/14493) |
| 🟡 Medium | **Qwen3.8 Chat Streaming Error** | `ResponseError: no user query found in messages (500)` during streaming. | [Issue #17778](https://github.com/ollama/ollama/issues/17778) |
| 🟡 Medium | **Digest Mismatch During Pull** | Rare but persistent issue causing failed model downloads. | [Issue #941](https://github.com/ollama/ollama/issues/941) |

> ✅ *Fixes in progress:*  
> - PR #18145 (proxy)  
> - PR #18153 (template matching)  
> - PR #11159 (metrics)  

---

### **6. What This Means for Application Developers**  
- **Avoid Qwen3.8-Flash-Next GGUF** until validation is patched (issue #18146). Use official or tested variants.  
- **Validate context settings**—the scheduler may restart `llama-server` with default context (4096), forcing redundant reloads. [Issue #18129](https://github.com/ollama/ollama/issues/18129)  
- **Expect GPU instability** on RTX 5060 Ti and Orin AGX systems; downgrade to Ollama <0.33.0 if needed.  
- **Monitor for prompt cache and eval metrics**—new `/metrics` data enables better observability and cost tracking.  
- **Do not rely on `num_ctx` enforcement on MLX**—long prompts can trigger Metal watchdog panics. Enforce limits at application level.  
- **Use proxies carefully**: Without explicit proxy config, model downloads fail on restricted networks. Wait for PR #18145.

> 💡 *Pro Tip:* For agents relying on tool calling (especially Qwen3 series), test with `--no-stream` and validate output structure. Use `ollama run --json` to debug malformed JSON responses.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-08-31**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues its momentum toward high-performance, production-grade inference orchestration with key progress on the long-awaited **Rust migration**, now in active development under Issue #31263. This initiative aims to reduce overhead to sub-1ms levels and enable ultra-low-latency routing—critical for real-time agent systems. Simultaneously, several critical stability fixes have landed around streaming behavior, cost tracking, and model routing logic, addressing high-impact bugs reported by enterprise users.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, ongoing work on the **Rust migration (Issue #31263)** is expected to introduce breaking changes in future versions. Early adopters are encouraged to join the [Beta Tester Group](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...) to prepare for upcoming performance improvements and API refinements.

---

### **3. New Model & Hardware Support**  
*No new models or hardware backends were added today.*  
Notable progress includes:  
- **Gemini-3.5-transcribe-preview** now supports `.webm` audio input via Vertex AI (Issue #38963), though it currently fails silently due to MIME-type misclassification.  
- **Claude Code** now enables `ENABLE_TOOL_SEARCH=true` by default when routed through `lite claude`, improving tool discovery for agents (PR #38942).

---

### **4. Performance & Optimization**  
Significant architectural strides are underway:  
- **Rust Migration (Issue #31263)**: Aims to achieve **sub-1ms overheads** in the gateway layer, targeting a 5–10x reduction in latency vs. current Python-based proxy.  
- **Adaptive Routing via Markov Decision Process (Issue #31555)**: Proposal for dynamic provider selection based on real-time metrics like token cost, latency, and error rate—potentially enabling automated arbitrage across providers.  
- **Time-Based Off-Peak Pricing (PR #31725)**: Now supports dynamic cost modeling during discounted windows (e.g., nightly rates), preventing overbilling during low-cost periods.

---

### **5. Stability & Regressions**  
Critical issues reported today include:  
- **Streaming Tool Call Fragmentation (Issue #38926)**: When `stream_options.include_usage=true`, tool-call arguments are collapsed into a single burst at stream end, breaking granular client-side parsing. *Fix PR pending*.  
- **Bedrock Header Loss (Issue #38357)**: AWS request IDs (`x-amzn-RequestId`) and other headers missing from `_hidden_params.additional_headers`. *Impact: observability loss in production tracing*.  
- **Background Health Checks Fail (Issue #38941)**: Sending `supports_max_reasoning_effort` to Bedrock models that don’t support it causes 400 errors. *Currently breaks auto-health checks for Claude deployments*.  
- **Model Cost Map Propagation Failure (Issue #37188)**: `POST /reload/model_cost_map` not reliably synced across replicas in multi-instance setups—risking inconsistent pricing decisions.

> ✅ **Fixed in PRs**:  
> - PR #38966: Resolves alias resolution failure in `/utils/supported_openai_params`  
> - PR #38962: Fixes prompt security redaction in streaming responses  
> - PR #38964: Upgrades Langfuse SDK to v4 with improved observation ingestion  

---

### **6. What This Means for Application Developers**  
- **For latency-sensitive apps**: Monitor the Rust migration (Issue #31263) closely—early access will unlock sub-1ms inference gateways ideal for real-time agents and interactive UIs.  
- **For cost-aware systems**: Use `off_peak_pricing` blocks in your model cost maps (PR #31725) to accurately reflect time-based discounts from providers like AWS Bedrock.  
- **For agent developers**: Be cautious with `gemini-3.5-transcribe-preview` and `.webm` inputs until PR #38963 is resolved. Also, ensure `ENABLE_TOOL_SEARCH=true` is set explicitly if using `lite claude`.  
- **For observability**: Expect gaps in AWS request tracing (due to #38357) and streaming metadata accuracy (due to #38926) until patches land. Use custom logging or alternative tracing tools in production.  
- **For scaling**: Avoid relying on `/reload/model_cost_map` in clustered environments until #37188 is fixed—consider manual sync or config reload via sidecar services.

---  
*Source: GitHub @ BerriAI/litellm — Data as of 2026-08-31*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-08-31**

---

### **1. Today's Highlights**  
The Unsloth project continues to prioritize stability and security, with critical fixes for prompt injection vulnerabilities and model loading regressions across multiple platforms. Notably, ongoing work on the Studio backend includes sandbox hardening, improved GPU detection (especially on Windows), and better handling of Ollama-integrated models — all aimed at improving reliability in agent-driven workflows.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*  
However, several high-priority PRs address long-standing issues:
- **PR #9961** resolves incorrect KV cache allocation when `max_tokens` is omitted, preventing over-allocation in inference.
- **PR #9858** improves GPU visibility in Studio settings by reporting OS-level device detection instead of relying solely on PyTorch’s view — crucial for multi-GPU systems like RTX A4000 setups.
- **PR #10082** introduces configurable LAN access ports, allowing users to set a fixed port or fall back gracefully if unavailable.

> 🔗 [PR #9961](https://github.com/unslothai/unsloth/pull/9961) | [PR #9858](https://github.com/unslothai/unsloth/pull/9858) | [PR #10082](https://github.com/unslothai/unsloth/pull/10082)

---

### **3. New Model & Hardware Support**  
- **Qwen3.8-Flash-Next-GGUF**: Currently unsupported due to unrecognized architecture (`qwen4exp`) — a known limitation in `llama.cpp`. Users are advised to try alternative variants until support is added.  
  > 🔗 [Issue #10015](https://github.com/unslothai/unsloth/issues/10015)
- **Intel XPU Support**: The default `adamw_8bit` optimizer fails during `optimizer.step()` due to Vulkan compatibility issues. This blocks training on Intel hardware unless manually switched.  
  > 🔗 [Issue #10021](https://github.com/unslothai/unsloth/issues/10021)
- **AMD ROCm gfx1200/gfx1201**: Flash attention fallback to math kernel causes massive memory spikes (e.g., 66.5 GiB for a 3.4 GB video model). No efficient SDPA path yet available.  
  > 🔗 [Issue #8225](https://github.com/unslothai/unsloth/issues/8225)

---

### **4. Performance & Optimization**  
- **MLX Prompt Cache Inefficiency**: For Qwen3.8-27B, the prompt cache is not reused due to `ArraysCache` layout mismatch, leading to redundant computation.  
  > 🔗 [Issue #10031](https://github.com/unslothai/unsloth/issues/10031)
- **Ollama Integration Overhead**: Multiple small writes to `studio.db` cause up to 10% disk I/O on NVMe drives during inference — likely due to unbatched SQLite operations.  
  > 🔗 [Issue #9934](https://github.com/unslothai/unsloth/issues/9934)
- **Inference Latency**: Multi-turn determinism smoke tests fail intermittently on merge base, indicating non-deterministic behavior under `temperature=0.0`, which impacts reproducibility in testing pipelines.  
  > 🔗 [Issue #10004](https://github.com/unslothai/unsloth/issues/10004)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🚨 Critical | [Issue #9807](https://github.com/unslothai/unsloth/issues/9807) | Parallel tool-call arguments are concatenated into malformed JSON, causing HTTP 400 errors upon replay. | ✅ *High-risk; no fix PR yet* |
| 🚨 Critical | [Issue #6967](https://github.com/unslothai/unsloth/issues/6967) | Markerless tool-call parsing enables prompt injection → RCE. Validated as HIGH-severity vulnerability. | ✅ *Fix PR #6967 merged* |
| ⚠️ High | [Issue #7877](https://github.com/unslothai/unsloth/issues/7877) | Ollama models vanish from UI after v1.50+; context size halved without user input. | ❌ *No fix PR; affects workflow* |
| ⚠️ High | [Issue #9986](https://github.com/unslothai/unsloth/issues/9986) | Ollama models mislabeled with wrong `source`, crash schema, and are hidden from inventory. | ❌ *No fix PR; stacked failures* |
| ⚠️ Medium | [Issue #10022](https://github.com/unslothai/unsloth/issues/10022) | SQLite mutex deadlock under concurrent DB access leads to permanent freeze. | ❌ *No fix PR; high impact on multi-user use cases* |

---

### **6. What This Means for Application Developers**  
- **Avoid relying on markerless tool calls** — they are now explicitly blocked via PR #6967. Use structured `tool_call` payloads only.
- **Validate Ollama integration carefully**: Models may be incorrectly categorized or invisible in the UI. Use `ollama list` + manual inspection until PR #10051 stabilizes dual-stack scanning.
- **Handle context size carefully**: Recent regressions reduced effective context by ~50%. If you’re building agents requiring large contexts, verify current runtime behavior.
- **Expect instability with newer hardware**: AMD ROCm gfx1200 and Intel XPU support remain fragile. Avoid production use until optimizer and attention kernels are stabilized.
- **Plan for local state management**: Frequent SQLite writes and potential deadlocks mean your app should avoid shared database access patterns or implement retry logic.

> ✅ **Recommended Actions**:  
> - Audit any tooling using raw text-based function invocation.  
> - Test model loading and context handling post-v1.50.  
> - Monitor `studio.db` I/O if deploying in high-throughput environments.

---  
*Digest compiled from GitHub activity: unslothai/unsloth (2026-08-31)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*