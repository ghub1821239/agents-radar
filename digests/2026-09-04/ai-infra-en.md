# AI Infrastructure Digest 2026-09-04

> Generated: 2026-09-04 00:22 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-04**

---

### **1. Ecosystem Overview**

The AI infrastructure landscape in September 2026 is characterized by intense specialization and rapid convergence at the inference serving layer. Projects are no longer just competing on raw performance—they are differentiating through architectural innovation (e.g., speculative decoding, hybrid Mamba models), hardware-specific optimizations (ROCm, AMD XPU, Apple Silicon), and operational maturity (security, observability, stability). A clear bifurcation has emerged: high-throughput engines like vLLM and SGLang are pushing the boundaries of low-latency inference with advanced scheduling and kernel-level tuning, while gateways like LiteLLM and local runtimes like llama.cpp are prioritizing security, portability, and developer experience. The growing emphasis on agent reliability—especially around reasoning loops and streaming fidelity—signals a shift from pure model benchmarking to real-world application robustness.

---

### **2. Activity Comparison**

| Project       | Issues Open (High/Critical) | PRs Merged (Last 24h) | Release Status         |
|---------------|-----------------------------|------------------------|------------------------|
| **vLLM**      | 8 (3 High)                  | 5                      | Stable (v0.27.1)       |
| **SGLang**    | 10 (3 High)                 | 6                      | Stable (no release)    |
| **llama.cpp** | 11 (5 High)                 | 5                      | Patched (`b10793`)     |
| **Ollama**    | 7 (3 High)                  | 2                      | Stable (v0.33.3)       |
| **LiteLLM**   | 6 (4 High)                  | 3                      | Dev release (v1.101.0-dev.2) |
| **Unsloth**   | 5 (2 High)                  | 5                      | No new release         |

> ✅ *Observation:* All projects remain stable in production releases, but **SGLang and llama.cpp** show the highest volume of open issues—indicating active pressure testing and feature integration under real-world workloads.

---

### **3. Model Support Race**

| New Model / Architecture             | Supported By                          | Notes |
|--------------------------------------|---------------------------------------|-------|
| **Qwen3-Next series (MTP)**          | vLLM ✅, SGLang ⚠️, Ollama ✅           | vLLM leads in speculative decoding support; SGLang has FP8 crashes |
| **PARD-2 parallel draft models**     | vLLM ✅ (PR #55257)                   | First project to enable target-aligned parallel speculation |
| **Hy4-preview (MLA, DSA, MoE)**     | SGLang ✅ (PR #36805)                 | Full support for advanced sparse attention and MXFP8 |
| **GLM-5.3-Flash (hybrid vision)**    | llama.cpp ✅, vLLM ✅, SGLang ✅        | All three lead here—gluon-like support across engines |
| **DeepSeek-v4-Flash-0731**           | vLLM ✅ (DSML leak fix), SGLang ⚠️     | vLLM resolves critical memory leak; SGLang lacks full compatibility |
| **GraniteForCausalLM (IBM)**         | Ollama ✅ (PR #17972)                 | First major enterprise model added via MLX runner |
| **T-Head PPU / SenseNova-U1**        | SGLang 📌 (roadmap)                   | Emerging Chinese AI accelerator support in progress |

> 🏆 **Winner:** **vLLM** leads in *advanced speculative decoding* and *multi-model integration*, while **SGLang** dominates in *architectural diversity* (e.g., Hy4-preview, DCP). **Ollama** gains ground in *enterprise model access* via Granite.

---

### **4. Performance Frontier**

| Optimization Focus               | Leading Projects                     | Key Developments |
|----------------------------------|--------------------------------------|------------------|
| **KV Cache & Memory Efficiency** | vLLM, SGLang, llama.cpp              | vLLM: GDN + MTP caching (+15–25% throughput); SGLang: Weight cache daemon (<1s load time); llama.cpp: `q8_0` lazy KV quantization |
| **Batching & Throughput**        | vLLM, SGLang                         | vLLM: fused index prep, packed QKV; SGLang: DCP relayouts for context parallelism |
| **Quantization & Kernel Tuning** | vLLM, llama.cpp, LiteLLM             | vLLM: CuteDSL MoE API supports mxfp8/mxfp4; llama.cpp: MMVQ warps derived from runtime bounds; LiteLLM: MXFP8 in non-expert MTP paths |
| **Distributed Serving**          | SGLang, LiteLLM                      | SGLang: Pipeline & Decode Context Parallelism (DCP); LiteLLM: In-container PgBouncer for DB pooling |
| **Hardware-Specific Kernels**    | vLLM, llama.cpp, Unsloth             | vLLM: NVFP4 GEMM ref impl (SM120); llama.cpp: Sparse Flash Attention on Metal; Unsloth: AOTriton for ROCm |

> 🔥 **Frontier Insight:** The performance race is now **kernel- and hardware-aware**, not just model-size driven. Projects leveraging **low-level backend integrations (AITER, AOTriton, sparse FA)** are achieving the most meaningful gains.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Role Summary |
|---------------|-------------------------------|--------------|
| **vLLM**      | **Inference Engine**          | High-performance, GPU-optimized engine with advanced speculative decoding and MoE support. Targets large-scale cloud deployments. |
| **SGLang**    | **Inference Engine + Orchestrator** | Combines engine capabilities with pipeline/DCP parallelism and agent-friendly scheduling. Positioned as a next-gen serving stack for agentic workflows. |
| **llama.cpp** | **Local Runtime / Embedded**  | Lightweight, cross-platform inference engine focused on CPU/GPU portability. Ideal for edge devices and Apple Silicon. |
| **Ollama**    | **Local Runtime + Agent Gateway** | Developer-centric runtime with agent tooling and model management. Bridges local inference and agent logic. |
| **LiteLLM**   | **AI Gateway / Orchestration Layer** | Universal API gateway with routing, cost control, and multi-provider support. Evolving into a secure, scalable orchestration platform. |
| **Unsloth**   | **Agent Studio + Local Runtime** | Full-stack agent environment with UI, RAG, audio, and image generation. Focuses on usability and workflow automation. |

> 🎯 **Strategic Differentiation:**  
> - **Engines** (vLLM/SGLang): Performance-first, scale-ready.  
> - **Runtimes** (llama.cpp/Ollama/Unsloth): Developer- and deployment-friendly.  
> - **Gateways** (LiteLLM): Enterprise-grade orchestration and security.

---

### **6. Trend Signals**

#### 🔹 **Emerging Trends Extracted from Today’s Activity**
1. **Speculative Decoding Maturation**: vLLM and SGLang are moving beyond basic draft token generation into **parallel draft models (PARD-2)** and **batch-invariant dispatching**, signaling readiness for production agent pipelines.
2. **Security-by-Design in Distribution**: LiteLLM’s adoption of **Cosign-signed Docker images** reflects a broader industry shift toward supply chain integrity—critical for regulated environments.
3. **Hardware Specialization is Non-Negotiable**: AMD (ROCm), Apple (Metal), and Chinese accelerators (T-Head) are no longer afterthoughts. Projects that fail to integrate native backends (e.g., Unsloth’s AOTriton, llama.cpp’s sparse FA) risk obsolescence.
4. **Agent Reliability > Raw Speed**: Multiple high-severity bugs in Ollama/SGLang around **reasoning loops, zombie requests, and streaming failures** indicate that the focus has shifted from "can it run?" to "does it behave reliably?"
5. **Rust Migration as Infrastructure Future**: LiteLLM’s **Rust migration initiative** (sub-1ms overhead goal) sets a new benchmark for gateway performance—expect more projects to follow suit in 2027.

#### ✅ **What Application Developers Should Watch**
- **Avoid speculative decoding configurations** where `prompt_length == num_speculative_tokens × uniform_decode_query_len` (known misdispatch bug in vLLM/SGLang).
- **Monitor Intel Arc B70 and AMD gfx1151 (Strix Halo)**—both show silent corruption or segfaults in multiple stacks.
- **Leverage emerging Rust-based gateways** (LiteLLM beta) for ultra-low-latency agent systems.
- **Use `--portable` installs (Unsloth)** and **Cosigned images (LiteLLM)** for secure, auditable deployments.
- **Validate model behavior post-upgrade**—Gemma 4, glm-5.3, and DeepSeek-V4 all exhibit reasoning loops in recent versions.

---

> **Final Takeaway:** The AI infrastructure ecosystem is no longer about choosing a single "best" tool—it’s about **composing layers strategically**. For agents: pair **vLLM or SGLang** (engine) + **LiteLLM** (gateway) + **Ollama or Unsloth** (local runtime/studio). For edge: **llama.cpp + Unsloth**. For compliance-heavy apps: **LiteLLM + Cosigned images + Rust proxy**. The future is layered, secure, and hardware-aware.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-04**

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its support for advanced speculative decoding and hybrid Mamba models, with critical fixes landing for **Qwen3-Next series** under multi-token speculative decoding (MTP) and **GDN prefix caching consistency**. New PRs focus on ROCm/AMD platform stability, including updated AITER integration and CI staging, while a key bugfix ensures `--enable-prompt-embeds` is rejected gracefully for encoder-only models.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes in the last 24 hours.*  
The project remains stable at v0.27.1, with ongoing refinement of Model Runner V2 and Rust frontend features. No migration warnings issued.

---

### **3. New Model & Hardware Support**  
- **New Model Support**:  
  - Added experimental support for **PARD-2 parallel draft models** via speculative decoding (`PR #55257`).  
  - Enhanced compatibility with **DeepSeek-v4-Flash-0731** through DSML leak fixes (`PR #54686`).  
- **Hardware & Backend Updates**:  
  - **ROCm 10.0** now used in nightly builds via `docker/Dockerfile.rock_base` (`PR #55246`).  
  - **AITER 0.1.21.post1** integrated for improved sparse MoE dispatch and kernel tuning (`PR #55246`, `#51563`).  
  - **Intel Arc Pro B70 (XPU)**: Ongoing investigation into silent output corruption during sustained decode (`Issue #53480`).  
  - **NVIDIA B200** performance optimizations targeted for Qwen3-Next-80B-A3B-Instruct-NVFP4 (`PR #55260`).

---

### **4. Performance & Optimization**  
- **Model Runner V2 (MRV2)**:  
  - **+15–25% decode throughput** on Qwen3-Next-80B-A3B-Instruct-NVFP4 with MTP + GDN all-mode caching via packed QKV, fused index prep, and weight de-interleave (`PR #55260`).  
  - Optimized W4A16 MoE kernels using AITER API for lower latency (`PR #51563`).  
- **Quantization & Kernel Efficiency**:  
  - Updated CuteDSL fused MoE API now supports mxfp8/mxfp4 dtypes and improves low-latency decode (`PR #55015`).  
  - **Triton-based NVFP4 GEMM reference implementation** under development for SM120 support (`Issue #21014`).  
- **Batch Invariance**:  
  - Progress on batch-invariant inference tracking (`Issue #27433`) to eliminate nondeterminism in LLM serving.

---

### **5. Stability & Regressions**  
- **Critical Issues Reported**:  
  1. **Deadlock in CPU offload mode** (`VLLM_PLE_CPU_OFFLOAD=1`) on single GPU with Qwen3.8-Flash-Next (`Issue #53960`).  
  2. **Silent output corruption** on Intel Arc B70 (W4A16), emitting only token "!" under load (`Issue #53480`).  
  3. **Prefill misdispatched into spec-decode cudagraph** when prompt length = `uniform_decode_query_len * num_reqs`, causing garbage output (`Issue #53051`).  
- **Fixes in Progress**:  
  - `PR #52244` restores hybrid GDN prefix-cache hits under MTP spec decoding.  
  - `PR #55243` fixes incorrect sin cache padding in FoPE (`#55204`).  
  - `PR #55239` resolves ROCm dispatch issue for GLM-5.3-Flash MTP (`#55050`).

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding** on hybrid GDN/Qwen3-Next models — avoid configurations where `prompt_length == num_speculative_tokens * uniform_decode_query_len` due to known misdispatch bugs.  
- **Enable PARD-2 draft models** (`PR #55257`) for faster speculative decoding if your use case allows target-aligned parallel drafts.  
- **Avoid `--enable-prompt-embeds` on encoder-only models** — will fail silently unless explicitly handled (fix incoming).  
- **Monitor Intel Arc B70 deployments** closely; reported silent corruption may affect production reliability.  
- **Leverage ROCm 10.0 + AITER 0.1.21.post1** for better AMD hardware support and reduced memory overhead in MoE workloads.  

👉 *Stay tuned for v0.28.0, expected to include MRV2 performance gains and enhanced multi-Lora classification support (`Issue #19623`, `#12829`).*

---  
**Sources**: [GitHub vLLM Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-04

---

### **1. Today's Highlights**  
SGLang continues to advance its support for high-throughput, low-latency inference across diverse hardware and model architectures. Key developments include progress on **Decode Context Parallelism (DCP)** and **Pipeline Parallelism**, with new PRs focused on DCP relayouts and engine initialization timeouts. Critical stability issues—particularly CUDA `illegal_address` crashes in Qwen3.8-Flash-Next and GLM-5.3-Flash under FP8 KV cache—are actively being triaged, highlighting ongoing challenges in mixed-precision and sparse attention paths.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking API/config changes detected in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- **T-Head PPU**: A new roadmap ([#37519](https://github.com/sgl-project/sglang/issues/37519)) has been opened to upstream first-class support for T-Head ZW810/ZW810E/ZW-M890P PPUs, enabling broader deployment on Chinese AI accelerators.
- **SenseNova-U1/U1.5**: Tracking issue [#37742](https://github.com/sgl-project/sglang/issues/37742) outlines integration efforts based on the OpenSenseNova/SenseNova-U1 reference implementation.
- **Hy4-preview (Hy4-preview)**: Full support added via PR [#36805](https://github.com/sgl-project/sglang/pull/36805), including MLA with DSA sparse attention, iHC, learned sinks, sigmoid-gated MoE, and MXFP8 quantization.

---

### **4. Performance & Optimization**  
- **Weight Cache Daemon**: Phase 1 of fast engine recovery landed in [#27139](https://github.com/sgl-project/sglang/pull/27139), reducing weight load time from **~306–327s to <1s** on Qwen3-235B FP8 ([blog](https://www.lmsys.org/blog/2026-08-21-sglang-quantized-inference/)).
- **DCP Relayouts**: PR [#37709](https://github.com/sgl-project/sglang/pull/37709) enables efficient transfer of DSpark draft KV during DCP1→DCP-N relayouts, improving decode efficiency in context-parallel setups.
- **ROCm Optimizations**: PR [#37124](https://github.com/sgl-project/sglang/pull/37124) reduces redundant work in the absorb path for GLM-5.2-MXFP4 on MI355X, improving decode throughput.
- **AMD/Kimi-K3**: PR [#37601](https://github.com/sgl-project/sglang/pull/37601) adds `qlen>1` support for aiter gluon path, expanding use cases for Kimi K3 on ROCm.

---

### **5. Stability & Regressions**  
Critical stability issues reported today:

| Severity | Issue | Description | Status |
|--------|------|-------------|--------|
| 🔴 High | [#37519](https://github.com/sgl-project/sglang/issues/37519) | **Qwen3.8-Flash-Next**: Crashes with `CUDA_ERROR_ILLEGAL_ADDRESS` under QSA extend forward at 8 concurrent requests (`--disable-overlap-schedule`, H20 TP8). | Open |
| 🔴 High | [#36545](https://github.com/sgl-project/sglang/issues/36545) | **Qwen3.8-Flash-Next**: Fails during warmup with FP8 KV cache due to dtype mismatch (BF16 query vs FP8 K/V). | Open |
| 🔴 High | [#37579](https://github.com/sgl-project/sglang/issues/37579) | **GLM-V**: Stray multimodal placeholders (`<|image|>`) trigger 500 error "Mismatch: More IMAGE tokens found than corresponding data provided". | Open |
| 🟡 Medium | [#36140](https://github.com/sgl-project/sglang/issues/36140) | **DFLASH speculative decoding**: Crashes under PD disaggregation mode (`--disaggregation-mode decode`) due to `spec_info None` crash. | Open |
| 🟡 Medium | [#36333](https://github.com/sgl-project/sglang/issues/36333) | **Zombie request leak**: Disconnected streaming clients leave stuck requests that decode to max_tokens. Regression from #34160 revert. | Open |

> ✅ *Note:* Several related PRs are in flight (e.g., #37874 for timeout-bound init), but no fixes have been merged yet.

---

### **6. What This Means for Application Developers**  
- **Expect instability when using Qwen3.8-Flash-Next with FP8 KV cache or speculative decoding**—avoid these configurations until patches land.
- **Use `--disable-overlap-schedule` or `CUDA_LAUNCH_BLOCKING=1` as temporary workarounds** for QSA-related crashes.
- **For high-concurrency agentic workloads**, monitor for zombie request leaks and ensure client-side stream cleanup.
- **Leverage emerging DCP and pipeline parallelism features** for long-context inference (1M+ tokens), though expect some rough edges.
- **Track PRs like #37709 and #37876** for improvements in multi-node, high-throughput serving performance.

👉 *Recommendation:* Join the [SGLang Slack](https://slack.sglang.ai) for real-time updates and debugging help on active issues.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-04**

---

### **1. Today's Highlights**  
The latest development cycle centers on critical performance and stability improvements across GPU backends, particularly for AMD (ROCm/Vulkan) and Apple Silicon (Metal). Key advancements include sparse Flash Attention support on Metal, optimized speculative decoding paths for OpenCL and CUDA, and a fix to prevent full source rebuilds on every commit—improving CI/CD efficiency. A growing number of high-severity correctness bugs are being reported on gfx1151 (Strix Halo) systems, especially with MoE models and Vulkan.

---

### **2. Releases & Breaking Changes**  
- **`b10793`**: Fixed whole-source rebuild on new commits via `llama-version.h` generation ([PR #28278](https://github.com/ggml-org/llama.cpp/pull/28278)).  
- **`b10791`**: Added medium-batch GEMM optimizations and `q4_K/q6_K` tiled kernel guards for non-Adreno OpenCL builds ([PR #26477](https://github.com/ggml-org/llama.cpp/pull/26477)).  
- **`b10785`**: Introduced sparse Flash Attention in Metal backend with support for `n_kv_max` mask hints ([PR #28098](https://github.com/ggml-org/llama.cpp/pull/28098)).

> 🔧 *Migration Note*: Users upgrading from `b10784` or earlier should verify `--spec-type draft-mtp` behavior under `-np N`, as async device→host races may cause draft acceptance collapse ([Issue #27572](https://github.com/ggml-org/llama.cpp/issues/27572)).

---

### **3. New Model & Hardware Support**  
- ✅ **New Model Support**:  
  - GLM-5.3-Flash (GLM5-Next), a 320B hybrid text+vision model ([PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773)).  
  - Qwen3.8 DFlash/MTP speculative decoding now supported with `--spec-type draft-mtp` ([PR #28349](https://github.com/ggml-org/llama.cpp/pull/28349)).  
- ✅ **Hardware Backend Additions**:  
  - **Metal**: Sparse Flash Attention (`#28098`) enables efficient KV caching on M-series chips.  
  - **OpenCL**: Extended elementwise op coverage (e.g., `sgn`, `elu`, `hardswish`) for improved flexibility ([PR #27633](https://github.com/ggml-org/llama.cpp/pull/27633)).  
- ✅ **Quantization**: `q8_0` lazy KV cache quantization proposal introduced ([PR #28267](https://github.com/ggml-org/llama.cpp/pull/28267)), enabling dynamic memory management.

---

### **4. Performance & Optimization**  
- **Metal**: Sparse FA reduces memory bandwidth pressure; benchmarks show ~15–20% improvement in decode throughput on M2 Ultra for DSv4 ([PR #28098](https://github.com/ggml-org/llama.cpp/pull/28098)).  
- **CUDA/HIP**: `MMVQ` kernel now derives `nwarps` from runtime launch bounds, fixing incorrect warps on generic RDNA3.5 targets (gfx1151) ([PR #28339](https://github.com/ggml-org/llama.cpp/pull/28339)).  
- **OpenCL**: Medium-batch GEMM and `quant lm_head / decode GEMV` optimizations improve speculative decoding efficiency ([PR #26477](https://github.com/ggml-org/llama.cpp/pull/26477)).  
- **Vulkan**: Optimized `coopmat1 f16b` dispatch logic improves compatibility with Strix Halo’s compute limits ([PR #28348](https://github.com/ggml-org/llama.cpp/pull/28348)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix PR? |
|---------|------|--------|--------|
| ⚠️ Critical | [#10528](https://github.com/ggml-org/llama.cpp/issues/10528) | Vulkan segfault on Linux (strace: inconsistent access) | ❌ No fix yet |
| ⚠️ High | [#28247](https://github.com/ggml-org/llama.cpp/issues/28247) | Vulkan `GGML_ASSERT(wg0 <= ctx->device->properties.limits.maxComputeWorkGroupCount)` on Intel Arc A770 | ❌ Pending |
| ⚠️ High | [#27579](https://github.com/ggml-org/llama.cpp/issues/27579) | ROCm corrupts output on gfx1151 despite identical flags vs. Vulkan | ❌ Regression post-#27621 |
| ⚠️ High | [#28290](https://github.com/ggml-org/llama.cpp/issues/28290) | `unpack8()` corrupts MAT_MUL + CPY on Snapdragon X Elite (Vulkan) | ❌ No fix yet |
| ⚠️ High | [#28158](https://github.com/ggml-org/llama.cpp/issues/28158) | Qwen3.8 DFlash emits OOB token id = `n_vocab` on Vulkan (gfx1150) | ❌ No fix yet |

> 💡 *Note*: These issues affect production deployments on modern AMD and ARM hardware—users should avoid `b10785`+ on gfx1151 until resolved.

---

### **6. What This Means for Application Developers**  
- 🛠 **Use `--spec-type draft-mtp-adaptive`** (via [PR #27210](https://github.com/ggml-org/llama.cpp/pull/27210)) for more stable speculative decoding under multi-slot workloads.  
- 📦 **Leverage `mmproj-evict-draft`** (`--mmproj-evict-draft`) to dynamically swap multimedia projectors and draft models on VRAM-constrained devices ([PR #28346](https://github.com/ggml-org/llama.cpp/pull/28346)).  
- 🚩 **Avoid `b10785`+ on AMD Strix Halo (gfx1151)** if using MoE or flash attention models—Vulkan and ROCm outputs are currently unreliable.  
- 🔄 **Update build scripts** to use `llama-version.h`-based versioning (from `b10793`) to reduce unnecessary rebuilds.  
- 🎯 **Target Metal + sparse FA** for Apple Silicon inference with large models (e.g., Qwen3, GLM5-Next).

> 🔗 **Developer Resources**:  
> - [Model Support Matrix](https://github.com/ggml-org/llama.cpp#supported-models)  
> - [Performance Tuning Guide](https://github.com/ggml-org/llama.cpp/wiki/Performance-Tuning)  
> - [Backend Compatibility Table](https://github.com/ggml-org/llama.cpp#backends)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-04**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with a strong focus on agent reliability and performance stability, particularly around reasoning loops and GPU scheduling. Critical regressions in `Gemma 4 26B A4B` and `glm-5.3:cloud` have been reported post-update, indicating potential model-specific behavioral drift. Meanwhile, new PRs are advancing speculative decoding support for MLX and refining memory efficiency in Qwen3.8 Flash Next, signaling progress toward more efficient inference on Apple Silicon.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking changes observed. The latest stable version remains **0.33.3**, which has triggered several regressions (e.g., #18220, #18193) related to model behavior and reasoning control.

---

### **3. New Model & Hardware Support**  
- ✅ **GraniteForCausalLM** architecture now supported in experimental models and `mlxrunner` via [PR #17972](https://github.com/ollama/ollama/pull/17972). Enables use of IBM’s Granite 4.1 series on Apple Silicon.
- ✅ **Talos** added as an official `ollama launch` integration ([PR #18093](https://github.com/ollama/ollama/pull/18093)), enabling permission-gated personal agent workflows.
- ✅ **Non-root Linux install** now documented with manual extraction and PATH export steps ([PR #18207](https://github.com/ollama/ollama/pull/18207)), improving deployment flexibility on shared environments.

---

### **4. Performance & Optimization**  
- 🔧 **Memory Efficiency**: [PR #18078](https://github.com/ollama/ollama/pull/18078) introduces MXFP8 quantization for non-expert MTP paths in `Qwen3.8-flash-next`, while preserving BF16 for critical projections—reducing VRAM pressure without sacrificing generation quality.
- ⚙️ **Speculative Decoding**: Enabled under structured output in `mlxrunner` via [PR #18105](https://github.com/ollama/ollama/pull/18105), restoring near-optimal throughput for dense 27B models during draft verification.
- 📉 **CPU Utilization**: Users report **~560% CPU usage** on Mac Studio M4 Max during token generation ([Issue #18038](https://github.com/ollama/ollama/issues/18038)), suggesting a regression in llama-cpp performance that may impact real-time applications.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| 🔴 High | [#18220](https://github.com/ollama/ollama/issues/18220) | `Gemma 4 26B A4B` enters reasoning loop instead of issuing tool calls after update to 0.33.3 | Open |
| 🔴 High | [#18193](https://github.com/ollama/ollama/issues/18193) | `glm-5.3:cloud` exhibits endless reasoning blocks in OpenCode/ZCode, aborting tasks | Open |
| 🔴 High | [#17892](https://github.com/ollama/ollama/issues/17892) | `deepseek-v4-flash:0731` loops indefinitely without `</think>` marker | Open |
| 🟡 Medium | [#16506](https://github.com/ollama/ollama/issues/16506) | `gemma4:e2b` crashes on WSL with `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS)` | Open |
| 🟡 Medium | [#18213](https://github.com/ollama/ollama/issues/18213) | macOS GPU reset leaves runner in broken Metal state — returns empty responses until restart | Open |
| 🟡 Medium | [#18208](https://github.com/ollama/ollama/issues/18208) | Long-lived `keep_alive=-1` runner emits corrupted `<unused49>` tokens after coexistence with second model | Open |

> **Note**: Several issues point to recent changes in scheduler logic, reasoning budget handling, and GPU driver detection (especially on Windows and Apple Silicon).

---

### **6. What This Means for Application Developers**  
- **Agent builders must validate model behavior post-upgrade**, especially for reasoning-heavy workflows using `Gemma 4`, `glm-5.3`, or `deepseek-v4-flash`. Expect potential hallucinations or infinite loops if not explicitly bounded.
- **Use `--hidethinking` cautiously**: It’s currently ineffective for some models like `maternion/ling-3.0-tiny:8b-Q4_K_M` ([#18221](https://github.com/ollama/ollama/issues/18221)) — consider alternative TUI/CLI wrappers for production logging.
- **Enable `OLLAMA_DEBUG_LOG_REQUESTS` at your own risk**: It logs full prompts and tool definitions without redaction or retention controls ([#18210](https://github.com/ollama/ollama/issues/18210)), posing serious security risks in enterprise settings.
- **Optimize for Apple Silicon**: Use `Q3_K_M` quantizations where available (e.g., request official Q3_K_M for Qwen3.8-35B-A3B via [#17869](https://github.com/ollama/ollama/issues/17869)) to run larger models on 16GB/24GB Macs.
- **Leverage `mlxrunner` improvements**: Speculative decoding and better memory management in `Qwen3.8 Flash Next` can improve agent throughput—ideal for high-latency, high-throughput agent pipelines.

---  
*Data source: github.com/ollama/ollama | Updated: 2026-09-04*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest – 2026-09-04

---

### **1. Today's Highlights**

LiteLLM continues its strategic pivot toward high-performance, production-grade inference infrastructure with the launch of a major **Rust migration initiative** (Issue #31263), targeting sub-1ms overheads and enabling the fastest AI gateway yet. Concurrently, critical fixes in the proxy layer address long-standing issues around budget resets, token counting, and streaming failure logging—ensuring more reliable cost control and observability.

Security remains a top priority: all Docker images are now cryptographically signed via Cosign (key established in commit `0112e53`), reinforcing trust in distribution channels.

---

### **2. Releases & Breaking Changes**

- **v1.101.0-dev.2** released today with security-focused updates:
  - ✅ All Docker images signed using [Cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) for verifiable integrity.
  - 🔐 No breaking changes reported in this release; intended for early adopters testing Rust integration and enhanced security posture.

> 📌 *Verify image signatures:*  
> https://docs.sigstore.dev/cosign/overview/

---

### **3. New Model & Hardware Support**

- **AWS External ID support added for Bedrock embeddings** (Issue #27835): Enables secure, granular access control for enterprise embedding workloads.
- **Fine-tuned Gemini endpoints now supported in Vertex AI managed batches** (PR #39668): Allows batch processing of custom models without manual model deployment steps.
- **SGLang rerank endpoint now correctly handles array responses** (Issue #29156): Fixes parsing of non-standard JSON output formats from SGLang’s reranking service.

> 🔗 Issue: [#27835](https://github.com/BerriAI/litellm/issues/27835)  
> 🔗 PR: [#39668](https://github.com/BerriAI/litellm/pull/39668)

---

### **4. Performance & Optimization**

- **Rust Migration Initiative launched** (Issue #31263): A foundational rewrite aiming to reduce gateway overhead to **sub-1ms latency**, significantly improving throughput and reducing CPU pressure in high-scale deployments.
  - Target: Replace Python-based routing and proxy logic with zero-cost abstractions in Rust.
  - Beta sign-up available: [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...)

- **Auto-router zero-setup configuration introduced** (PR #39658): Reduces configuration friction by allowing automatic tier and prompt generation based on quality and optimization goals (e.g., cost vs. speed).

- **Database connection pooling via in-container PgBouncer** (PR #39683): Eliminates per-worker DB connection overhead, preventing database exhaustion during scale-out. Ideal for transaction-pooled environments like Neon or Prisma with pgbouncer.

> 🔗 Issue: [#31263](https://github.com/BerriAI/litellm/issues/31263)  
> 🔗 PR: [#39683](https://github.com/BerriAI/litellm/pull/39683), [#39658](https://github.com/BerriAI/litellm/pull/39658)

---

### **5. Stability & Regressions**

| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| ⚠️ High | [#31447](https://github.com/BerriAI/litellm/issues/31447) | Setting `team_member_budget` overwrites entire team metadata object | Open |
| ⚠️ High | [#29715](https://github.com/BerriAI/litellm/issues/29715) | OpenAPI MCP `build_input_schema` drops `items`, `enum` from inline parameter schemas | Open |
| ⚠️ High | [#29766](https://github.com/BerriAI/litellm/issues/29766) | `/v1/audio/transcriptions` collapses multiple `known_speaker_references` into just the last one | Open |
| ⚠️ Medium | [#27300](https://github.com/BerriAI/litellm/issues/27300) | `max_budget` ignored after monthly reset | Open |
| ⚠️ Medium | [#27171](https://github.com/BerriAI/litellm/issues/27171) | `ResetBudgetJob` crashes due to unserializable `budget_limits` list | Open |
| ❌ Critical | [#39564](https://github.com/BerriAI/litellm/issues/39564) | `/user/update` rejects valid `blocked` param — breaks Terraform provider | Open |

> 💡 Note: Several regressions involve misbehavior in **multi-step tool calling**, **streaming error handling**, and **metadata mutation**, which may affect agent workflows relying on accurate request/response fidelity.

---

### **6. What This Means for Application Developers**

- **Adopt early**: If you're building scalable LLM gateways or agents, consider joining the **Rust migration beta** (sign up via [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...)) for sub-1ms latency and future-proof architecture.
- **Avoid instability**: Be cautious when using `team_member_budget`, `known_speaker_references`, or `max_budget` features until fix PRs land—these may corrupt data or silently fail.
- **Use secure, auditable deployments**: Leverage **Cosigned Docker images** for production environments where supply chain integrity is critical.
- **Expect improved observability**: With new OTel v2 trace routing (PR #39654) and better session-level metrics, your traces will now be fully preserved at both operator and team levels—ideal for debugging complex agent flows.
- **Optimize scaling**: Use the new **PgBouncer-in-container** pattern (PR #39683) to avoid hitting database connection limits under load.

> ✅ Pro tip: Monitor PRs #39683, #39654, and #39675 for immediate performance gains in large-scale deployments.

--- 

*Digest generated: 2026-09-04 | Source: [GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-04**

#### **1. Today's Highlights**  
The Unsloth ecosystem continues to prioritize stability and cross-platform compatibility, with critical fixes for AMD ROCm performance and memory leaks in image generation workflows. New PRs enhance audio model handling, deep research output length control, and desktop app usability—particularly around modal UI freezing and log accessibility. A major focus on secure API token boundaries and portable installations signals growing enterprise readiness.

#### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, ongoing changes in `main` may affect behavior:
- **API Key Security (PR #10142)**: Explicit HF token requirement now enforced on Hub write paths for API-key callers, closing a potential credential leakage vector.
- **Portable Install (PR #10189)**: Introduces `--portable` and `--root` flags for single-directory Studio installs—ideal for locked environments or containerized deployments.

> 🔗 [PR #10142](https://github.com/unslothai/unsloth/pull/10142) | [PR #10189](https://github.com/unslothai/unsloth/pull/10189)

#### **3. New Model & Hardware Support**  
- **AMD ROCm + AOTriton Attention (PRs #8323, #8821)**: Unlocks high-performance attention kernels on AMD GPUs by explicitly enabling `TORCH_ROCM_AOTRITON_ENABLE_EXPERIMENTAL`. This resolves severe VRAM over-allocation issues on cards like RX 7900 XTX and iGPUs.
- **MLX Model Transcription (Issue #10272)**: Still unresolved; users report inability to transcribe audio using MLX models on macOS M-series chips—a gap in audio pipeline support.
- **Docker Support Expansion (PR #5748)**: Adds full NVIDIA GPU support from Ampere (sm_80) through Blackwell (sm_120), including native aarch64 builds for Grace/GPU-based systems.

> 🔗 [PR #8323](https://github.com/unslothai/unsloth/pull/8323) | [PR #5748](https://github.com/unslothai/unsloth/pull/5748)

#### **4. Performance & Optimization**  
- **Memory Leak Fix (PR #10267)**: Addresses update banner test failures due to improper class-based comparison—improves CI reliability and reduces false positives.
- **Audio Pipeline Enhancements (PRs #10217, #10255)**: Now supports model-specific audio requests via `input_audio` content part and dynamic model loading during speech synthesis.
- **Deep Research Output Length Control (PR #10254)**: Removes hard-coded 16k-token cap on report generation—now respects model context window when saving connections.
- **Model Reload Avoidance (PR #10257)**: Prevents unnecessary model reloads when running `unsloth chat` while Studio is active, preserving warm state and reducing latency.

> 🔗 [PR #10254](https://github.com/unslothai/unsloth/pull/10254) | [PR #10257](https://github.com/unslothai/unsloth/pull/10257)

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| ⚠️ High | **Qwen3.8-27B V3 GGUF crashes on AMD** (Issue #9792) | Open | No fix yet; rolling back to v2 (`408fcc1807ab`) mitigates |
| ⚠️ High | **Z-Image-Turbo memory leak** (Issue #10156) | Closed | Fixed in recent patch; SIGKILL risk reduced |
| ⚠️ Medium | **Gemma-4 26B A4B MOE LoRA has low trainable params** (Issue #4907) | Closed | Patched in latest `unsloth_zoo` release |
| 🟡 Low | **Deep Research incomplete reports / reasoning leakage** (Issue #10245) | Open | In progress; tied to prompt routing logic |
| 🟡 Low | **Windows toolbar hidden by tooltips** (Issue #10226) | Open | UX/UI visual layering issue |

> 🔗 [Issue #9792](https://github.com/unslothai/unsloth/issues/9792) | [Issue #10156](https://github.com/unslothai/unsloth/issues/10156)

#### **6. What This Means for Application Developers**  
- **Build robust RAG agents**: The unresolved RAG file listing bug (#8854) indicates current limitations in project/knowledge base introspection—avoid relying on auto-discovery until resolved.
- **Secure your API integrations**: With stricter token enforcement (PR #10142), ensure downstream services pass explicit HF tokens on Hub writes—no ambient credential borrowing allowed.
- **Optimize for edge devices**: Use the new `--portable` install (`#10189`) and Docker images (`#5748`) to deploy consistent, isolated inference stacks across cloud, local, and embedded systems.
- **Leverage audio pipelines**: Enable dynamic model switching in `/audio/speech` and `/audio/generate` endpoints via PR #10217 and #10255—critical for voice-agent apps.
- **Avoid memory bloat**: Monitor long-running tasks (especially image/audio gen); use `--max-seq-length` cautiously and avoid redundant model loads via `unsloth chat`.

> ✅ Pro tip: For AMD users, ensure `TORCH_ROCM_AOTRITON_ENABLE_EXPERIMENTAL=1` is set early in your environment to unlock performance.

---  
*Digest generated from GitHub data — unslothai/unsloth | 2026-09-04*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*