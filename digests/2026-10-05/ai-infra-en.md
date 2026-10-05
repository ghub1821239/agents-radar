# AI Infrastructure Digest 2026-10-05

> Generated: 2026-10-05 01:14 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-05**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q4 2026 is defined by a sharp bifurcation between **high-performance, low-level serving engines** (vLLM, SGLang, llama.cpp) and **developer-friendly, agent-native platforms** (Ollama, LiteLLM, Unsloth). While vLLM and SGLang lead in hybrid/distributed inference optimizations—especially for MoE, GDN, and MTP workflows—Ollama and LiteLLM are accelerating adoption through simplified developer experiences, model portability, and proxy-layer abstractions. The convergence of speculative decoding, hierarchical caching, and multi-modal support signals a maturing ecosystem ready for real-world deployment at scale.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑) | PRs Merged (↑) | Release Status       |
|---------------|------------------|------------------|------------------------|
| **vLLM**      | 87 (+3)          | 19 (+5)          | Stable: `v0.28.0`      |
| **SGLang**    | 112 (+6)         | 23 (+8)          | No release; RC pending |
| **llama.cpp** | 124 (+4)         | 17 (+6)          | `b11401` (patch)       |
| **Ollama**    | 98 (+2)          | 14 (+3)          | No new release         |
| **LiteLLM**   | 67 (+1)          | 11 (+4)          | `v1.105.0-rc.1`        |
| **Unsloth**   | 69 (+5)          | 12 (+4)          | No release             |

> 🔍 *Trend*: SGLang and llama.cpp show the highest momentum in issue volume and PR activity, reflecting active development on core stability and performance bottlenecks. vLLM remains stable with focused optimization work, while Ollama and LiteLLM prioritize feature delivery over breaking changes.

---

### **3. Model Support Race**

| New Model / Architecture       | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen4Exp (FP8 QSA)**        | ✅   | —      | —         | —      | —       | —       |
| **GDN + Qwen3.8-Flash-Next** | ✅   | —      | —         | —      | —       | —       |
| **NIXL KV Connector**         | ✅   | —      | —         | —      | —       | —       |
| **Mooncake Store (Hetero TP)**| ✅   | —      | —         | —      | —       | —       |
| **Clef (Multimodal)**         | —    | —      | ✅ (exp.) | —      | —       | ✅ (PR) |
| **SeaweedFS L3 Cache**        | —    | ✅     | —         | —      | —       | —       |
| **K2 Horizon (MoE)**          | —    | —      | —         | 🟡 (req.)| —       | —       |
| **Qwen3-TTS Fast Fine-tune**  | —    | —      | —         | —      | —       | ✅ (PR) |
| **ROCm FLUX.1 & Qwen-Image-2.1**| — | —      | —         | —      | —       | ✅ (PR) |
| **Intel SYCL (Arc B70)**      | —    | —      | —         | ✅     | —       | —       |

> 🏆 **Leaderboard**:  
> - **vLLM** leads in **advanced inference architectures** (GDN, MTP, FP8 on pre-CC8.9).  
> - **SGLang** dominates in **distributed storage & agent-native tooling** (HiCache, SeaweedFS, DCP).  
> - **Unsloth** is ahead in **multimodal image generation** (FLUX.1, Qwen-Image-2.1) and **fine-tuning pipelines**.  
> - **Ollama** gains ground via **hardware-specific backends** (SYCL) and growing open-model demand.

---

### **4. Performance Frontier**

| Focus Area                  | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache Management**    | ✅🔥 (MTP, prefix, sleep/wake) | ✅ (HiCache, write-through deadlock) | ⚠️ (MoE offload, strided ops) | — | — | — |
| **Batching & Parallelism** | ✅ (Projection fusion, GEMM) | ✅ (DCP, Cake kernels, SP all-gather) | ✅ (Mixed embd+raw batching) | ✅ (Parallel reqs for qwen35) | — | ⚠️ (Tensor-split regression) |
| **Quantization**           | ✅ (FP8 QSA below CC8.9) | ✅ (FP8 Grouped MoE) | ✅ (PTQ1_0, 1.75 b/w) | — | — | — |
| **Distributed Serving**    | ✅ (Disaggregated, NIXL, Mooncake) | ✅ (HiCache, SeaweedFS) | — | — | — | — |
| **Kernel Optimization**    | ✅ (QKVG fusion, SM103/100) | ✅ (Cake routes, Matmul fusion) | ✅ (TinyBLAS, FlashAttention) | — | — | ✅ (Fused RoPE, CUDA graphs) |

> 💡 **Frontier Summary**:  
> - **vLLM** focuses on **low-latency, high-throughput kernel fusion and cache coherence** in complex hybrid setups.  
> - **SGLang** pushes **distributed scalability** with hierarchical caching and decode context parallelism.  
> - **Unsloth** excels in **specialized GPU kernel tuning**, especially on AMD ROCm/Vulkan for generative models.  
> - **llama.cpp** maintains strong **CPU and cross-backend efficiency** with innovative quantization and memory management.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Key Differentiator |
|---------------|------------------------------------|--------------------|
| **vLLM**      | **Inference Engine**               | Industry-leading throughput for MoE/GDN/MTP; optimized for large-scale cloud deployments |
| **SGLang**    | **High-Performance Inference Stack** | Agent-native design with DCP, HiCache, and TRTLLM integration; ideal for long-horizon agents |
| **llama.cpp** | **Local Runtime / Embedded Engine** | Cross-platform CPU/GPU support; best-in-class for edge and offline inference |
| **Ollama**    | **Model Gateway / Developer Platform** | Simplified CLI, auto-model pulling, enterprise proxy support; lowers entry barrier |
| **LiteLLM**   | **API Gateway / Observability Layer** | Unified API surface, cost tracking, security (Cosign), and vector store integration |
| **Unsloth**   | **Fine-Tuning & Specialized Inference** | Accelerated training, multimodal image gen, and GPU-specific optimizations |

> 📌 **Strategic Implication**: Developers should select based on deployment profile:
> - **Cloud-scale inference**: vLLM or SGLang
> - **Edge/offline inference**: llama.cpp
> - **Agent systems**: SGLang + LiteLLM
> - **Developer-first workflow**: Ollama
> - **Fast fine-tuning**: Unsloth

---

### **6. Trend Signals**

#### **Emerging Industry Trends from Today’s Activity:**
1. **Hybrid & Disaggregated Inference is Maturing**  
   vLLM’s NIXL and Mooncake integrations, plus SGLang’s HiCache with SeaweedFS, signal a shift toward **heterogeneous, scalable inference pools**—critical for reducing costs in large-scale LLM serving.

2. **Speculative Decoding is Still Risky**  
   Multiple high-severity crashes in vLLM and SGLang linked to MTP/speculative decoding highlight that **this technique remains fragile under mixed-mode workloads** (e.g., GDN + prefix caching). Avoid in production until fixes land.

3. **Multi-Modal is Now Core**  
   Unsloth’s FLUX.1/ROCm improvements, SGLang’s LoRA support for NemotronH_VL, and llama.cpp’s Clef experimental support indicate **vision-language models are no longer niche**—expect full stack maturity in early 2027.

4. **Security & Trust Are Non-Negotiable**  
   LiteLLM’s Cosign-signed images and Ollama’s proxy retry bounds reflect a growing focus on **supply chain integrity and resilience**—key for regulated environments.

5. **Hardware Diversity Is Driving Innovation**  
   Intel SYCL (Ollama), ROCm/Vulkan (Unsloth), and SeaweedFS (SGLang) show that **non-NVIDIA hardware is gaining traction**, forcing frameworks to adopt modular, backend-agnostic designs.

---

### **Recommendation for Application Developers**  
- **Avoid speculative decoding** on hybrid GDN/Qwen3.8-Flash-Next models until vLLM issues #53670 and #59642 are resolved.
- **Use `--enable-sleep-mode --enable-nccl-comm-suspend`** in vLLM for idle memory savings—now safe with recent PRs.
- **Pin to stable versions** (e.g., v0.28.0, Ollama `b11401`) if running mixed MoE/hybrid models.
- **Leverage LiteLLM’s signed images** and observability features for secure, auditable production deployments.
- **Monitor Unsloth’s `b10687-mix-*` builds** for tensor-split inference until #12468 is fixed.

> ✅ **Bottom Line**: The infrastructure layer is evolving rapidly—but stability still lags behind innovation. Prioritize **verified releases**, **comprehensive testing**, and **layered resilience** in your stack.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-05

---

### **1. Today's Highlights**  
The vLLM project continues to deepen its support for hybrid and disaggregated inference with critical fixes to KV cache management in MTP (Multi-Token Prediction) and prefix caching workflows—especially for Qwen3.8-Flash-Next and GDN models. Key progress includes enabling FP8 QSA KV cache reads below CC 8.9, resolving sleep/wake correctness issues in NIXL-based offload systems, and addressing speculative decoding performance degradation due to last-block drops.

---

### **2. Releases & Breaking Changes**  
*None reported in the past 24 hours.*  
No new releases or breaking API/config changes were published. The latest stable release remains `v0.28.0`, with ongoing work focused on stability and optimization rather than versioned updates.

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen4Exp (FP8 QSA)**: Added support for reading FP8 QSA KV caches on compute capabilities below 8.9 via PR [#59943](https://github.com/vllm-project/vllm/pull/59943), extending compatibility to older architectures like RTX 6000 Ada/B300.  
- ✅ **NIXL KV Connector**: Enhanced sleep mode support with PRs [#59635](https://github.com/vllm-project/vllm/pull/59635) and [#59624](https://github.com/vllm-project/vllm/pull/59624), enabling reliable state preservation during engine suspension in disaggregated setups.  
- ✅ **Mooncake Store**: Progress toward heterogeneous TP sharing in hybrid KV caches via PR [#54307](https://github.com/vllm-project/vllm/pull/54307), improving scalability across diverse hardware pools.

---

### **4. Performance & Optimization**  
- 🔥 **Speculative Decoding Throughput Loss**: Issue [#53670](https://github.com/vllm-project/vllm/issues/53670) reports up to **30–40% batch throughput loss** on prefix-reusing workloads when using EAGLE/MTP with Qwen3.8-Flash-Next due to unnecessary re-computation from last-block drop in prefix cache.  
- 🚀 **Projection Fusion**: PR [#59533](https://github.com/vllm-project/vllm/pull/59533) merges QKVG and indexer Q/K projections into a single GEMM for Qwen4Exp, reducing kernel overhead and improving utilization on SM103 (GB300) and SM100 (B200).  
- 💾 **Memory Efficiency**: PRs [#59994](https://github.com/vllm-project/vllm/pull/59994) and [#59360](https://github.com/vllm-project/vllm/pull/59360) optimize memory retention during sleep/wake cycles by offloading model runner buffers and releasing FlashInfer allreduce workspaces under NCCL suspend mode.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| 🔴 High | [#54173](https://github.com/vllm-project/vllm/issues/54173) | `CUBLAS_STATUS_INTERNAL_ERROR` / illegal memory access in GDN path with prefix caching on GB10 (sm_121) | ❌ No fix yet; occurs with `--no-async-scheduling` |
| 🔴 High | [#59642](https://github.com/vllm-project/vllm/issues/59642) | 0% MTP acceptance rate in disaggregated PD serving for Qwen3.8-flash-next | ❌ No fix; likely tied to connector state handling |
| 🟡 Medium | [#53912](https://github.com/vllm-project/vllm/issues/53912) | Prefix caching + MTP corrupts output on hybrid Mamba/GDN models in v0.28.0 | ⚠️ Closed but unfixed; ongoing investigation |
| 🟡 Medium | [#37035](https://github.com/vllm-project/vllm/issues/37035) | `cudaErrorIllegalAddress` in `gdn_attn.py` during speculative decoding under load | ❌ No fix; reproducible with `num_speculative_tokens=5` |

> Note: Several high-severity crashes are linked to recent MTP and GDN integration work—particularly around GPU memory layout and async scheduling.

---

### **6. What This Means for Application Developers**  
- **Avoid speculative decoding on hybrid GDN/Qwen3.8-Flash-Next models** until [#53670](https://github.com/vllm-project/vllm/issues/53670) is resolved—expect significant throughput degradation.
- **Use `--enable-sleep-mode --enable-nccl-comm-suspend`** in distributed deployments to reduce memory footprint during idle periods; this is now safer thanks to PRs [#59994](https://github.com/vllm-project/vllm/pull/59994) and [#59360](https://github.com/vllm-project/vllm/pull/59360).
- **Monitor prefix cache behavior carefully** when combining it with MTP—especially on non-standard models like Qwen3.8-Flash-Next and Mamba hybrids.
- **Expect limited support for FP8 on pre-CC8.9 GPUs** unless explicitly patched via PR [#59943](https://github.com/vllm-project/vllm/pull/59943)—validate your deployment stack accordingly.
- **Do not rely on `/health` endpoint alone** for GPU health checks—consider adding custom probes for CUDA errors (see #36960).

👉 *Recommendation:* Pin to `v0.28.0` or earlier if running mixed-mode inference with MoE/hybrid models until stability improvements land.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-05

---

### **1. Today's Highlights**  
The SGLang project continues to advance its high-performance inference stack with critical fixes for CUDA coredumps (#26340), ongoing work on decode context parallelism (DCP) and Helix parallelism (#29736), and new support for SeaweedFS as an L3 storage backend in HiCache (#42399). A surge in PRs focused on speculative decoding, kernel optimizations, and multi-modal model integration signals strong momentum toward agent-native deployment readiness.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes were issued.

---

### **3. New Model & Hardware Support**  
- **SeaweedFS L3 Storage Backend**: Added via #42399, enabling shared KV cache across nodes in HiCache deployments using existing SeaweedFS S3 gateways.  
  [PR #42399](https://github.com/sgl-project/sglang/pull/42399)  
- **Moore Threads (MUSA) GPU Support**: Active roadmap tracking in #16565; first-class support is planned but not yet implemented.  
  [Issue #16565](https://github.com/sgl-project/sglang/issues/16565)  
- **NemotronH_Nano_VL_V2 LoRA Support**: Work underway in #39798 to enable LoRA fine-tuning for this multimodal VL model family.  
  [PR #39798](https://github.com/sgl-project/sglang/pull/39798)  
- **AWS EFA Runtime Support**: Added `runtime-efa` build target to include EFA user-space libraries and `mooncake-transfer-engine-efa`, improving out-of-box experience on AWS GPU clusters.  
  [PR #41006](https://github.com/sgl-project/sglang/pull/41006)

---

### **4. Performance & Optimization**  
- **HiCache File-backed PLE Table**: Concurrent host reads for cold rows reduce cold-prefill TTFT by **6.8x on GB10** (tracked in #42392).  
  [Issue #42392](https://github.com/sgl-project/sglang/issues/42392)  
- **Cake Kernels – SP All-Gather Matmul**: Enabled via opt-in route (`SGLANG_CAKE_ROUTES=sp_all_gather_matmul`) for sequence-parallel execution, targeting capacity-bound launchers.  
  [PR #42532](https://github.com/sgl-project/sglang/pull/42532)  
- **Qwen3.5 GDN + FP8 Grouped MoE**: Opt-in Cake routes now wire FlashInfer kernels end-to-end for performance-critical paths.  
  [PR #42406](https://github.com/sgl-project/sglang/pull/42406)  
- **DeepSeek-V4 Pro Load Time Reduction**: Prefetching reduces load time from **95 minutes to 3.3 minutes** when limiting tensor-copy workers.  
  [Issue #42361](https://github.com/sgl-project/sglang/issues/42361)  
- **Speculative Decoding Enhancement**: Block verification (opt-in) enables longer accepted draft prefixes, accelerating speculative decoding per Algorithm 2 of [arXiv:2403.10444](https://arxiv.org/abs/2403.10444).  
  [PR #42297](https://github.com/sgl-project/sglang/pull/42297)

---

### **5. Stability & Regressions**  
- **CUDA Coredump Tracker (#26340)**: Auto-collected coredumps from CI indicate recurring crashes under stress; currently at **323 comments**, indicating widespread impact.  
  [Issue #26340](https://github.com/sgl-project/sglang/issues/26340)  
- **TRTLLM_MHA on H200 (SM90)**: Misbehaves with `gpt-oss-120b`—accepts config but returns incorrect completions despite correct speed.  
  [Issue #40921](https://github.com/sgl-project/sglang/issues/40921)  
- **HiCache Write_Through Deadlock**: DeepSeek-V4 + `--hicache-write-policy write_through` causes TP rank deadlock under concurrent long prefills.  
  [Issue #42465](https://github.com/sgl-project/sglang/issues/42465)  
- **Qwen3 Streaming Infinite Loop**: Cross-chunk tag truncation splits `<thinking>` tags across chunks, causing infinite thinking loops.  
  [Issue #31118](https://github.com/sgl-project/sglang/issues/31118)  
- **Deterministic Sampling Crash**: Rejects `min_p` requests with a seed due to internal assertion failure.  
  [Issue #33695](https://github.com/sgl-project/sglang/issues/33695)  

> 🔴 **Critical**: Multiple issues affect core inference stability (especially DCP, HiCache, and TRTLLM_MHA), with no immediate fix PRs linked.

---

### **6. What This Means for Application Developers**  
Developers should **exercise caution with speculative decoding and HiCache configurations** until #42465 and #42392 are resolved. Use `--enable-hierarchical-cache --hicache-write-policy write_through` only if you can tolerate potential deadlocks. For agents requiring deterministic output, avoid combining `min_p` with sampling seeds until #33695 is patched. The addition of SeaweedFS and EFA support unlocks scalable, distributed deployments—ideal for large-scale agent systems. Expect faster model loading and better throughput with Qwen3.5 and DeepSeek-V4 optimizations, especially when leveraging opt-in Cake kernels and block verification. Monitor CI health via #17050 and #21065 (currently in maintenance mode) for stable builds.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-05**

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes in CUDA and Vulkan backends, particularly for MoE models and long-context inference. Key improvements include a fix for a memory fault in MMQ (MoE) when `n_expert >> n_ubatch`, and resolution of a prefill regression on Intel Arc GPUs caused by prior optimizations. Additionally, new support for mixed embedding + raw token batching enables advanced use cases like PaliGemma.

---

### **2. Releases & Breaking Changes**  
- **`b11401`**: Fixed color handling in router mode logs to prevent terminal corruption; child command logs now carry their own colors (#29895).  
- **`b11400`**: Added experimental support for mixing `embd` (embedded tokens) and raw text tokens in the same batch via `llama_batch_ext` — crucial for non-causal models like PaliGemma (#29622).  
- **`b11398`**: Enabled vectorized BF16/FP16/FP32 K-tail processing in tinyBLAS on x86 CPUs, improving CPU inference throughput.  
- **Migration Note**: The `llama_batch_ext` API change requires updating code that passes both embedded and raw tokens in one batch — ensure your application handles `mixed_batch = true` paths correctly.

> 🔗 [GitHub Release b11401](https://github.com/ggml-org/llama.cpp/releases/tag/b11401) | [PR #29622](https://github.com/ggml-org/llama.cpp/pull/29622)

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Vision-enabled models now supported in server mode with `/slots/3?action=save` (though issue #19466 notes this is still broken for vision models).  
  - Experimental support for `Clef` multimodal inputs via PR #29969 (vision + text in same batch).  
- **Hardware & Backends**:  
  - **CUDA**: Full support for arbitrary striding in unary ops (F16/F32/BF16) across all tensor layouts (#29781).  
  - **Vulkan**: Extended FWHT kernels to block widths up to 8192 (#29772); improved MoE performance on RDNA4 and Intel Arc GPUs.  
  - **SYCL**: Fixes for memory errors in `mul_mat` and host pool management (#29889).  
- **Quantization**: PTQ1_0 with group size 128 added (1.75 bits per weight), enabling lossless ternary quantization (#29672).

> 🔗 [PR #29969 (Clef)](https://github.com/ggml-org/llama.cpp/pull/29969) | [PR #29781 (strided ops)](https://github.com/ggml-org/llama.cpp/pull/29781) | [PR #29672 (PTQ1_0)](https://github.com/ggml-org/llama.cpp/pull/29672)

---

### **4. Performance & Optimization**  
- **CUDA FlashAttention**: Improved prefill efficiency by preferentially selecting whole-tile scheduling over Stream-K when applicable, reducing kernel launch overhead (#29435).  
- **Intel Arc Preload Fix**: Addressed ~12% prefill regression on Arc B70 due to earlier MoE-aware tile selection changes (#29936).  
- **Memory Efficiency**: Chunking of BF16/FP16 → FP32 conversion reduces peak VRAM usage by up to 512MB per chunk (#29442).  
- **MoE Offloading**: PR #29887 introduces GPU cache for MoE experts kept in host memory, reducing host-GPU transfers for small batches (<32 tokens).  

> 🔗 [PR #29936 (Intel Arc perf)](https://github.com/ggml-org/llama.cpp/pull/29936) | [PR #29435 (FlashAttention)](https://github.com/ggml-org/llama.cpp/pull/29435) | [PR #29887 (MoE cache)](https://github.com/ggml-org/llama.cpp/pull/29887)

---

### **5. Stability & Regressions**  
- **Critical**:  
  - **CUDA MMQ Memory Fault** (`b11390`) — crash when `n_expert >> n_ubatch` due to incorrect buffer indexing. Fixed in #29941.  
  - **Vulkan MoE Preload Regression** on Intel Arc Pro B70: ~12% slower prefill after #29182. Fixed in #29936.  
- **High Severity**:  
  - **GPU Memory Corruption** on AMD gfx1151 (Strix Halo APU): ROCm backend produces corrupted output while Vulkan does not (#27579).  
  - **Race Condition in Router Scheduler** under concurrent cold-starts with `--models-max 1` (#28774).  
- **Medium Severity**:  
  - **Use-after-free** in chat parser when `pending_tool_call` is reset mid-parsing (#29942).  
  - **Blank log lines in router mode** due to improper color reset handling (#29878).  

> 🔗 [Issue #29941 (MMQ crash)](https://github.com/ggml-org/llama.cpp/issues/29941) | [Issue #27579 (ROCm corruption)](https://github.com/ggml-org/llama.cpp/issues/27579) | [PR #29936 (fix)](https://github.com/ggml-org/llama.cpp/pull/29936)

---

### **6. What This Means for Application Developers**  
- **Builds for Arm64 Windows with CUDA remain unavailable** (#25030), so cross-platform deployment on Windows ARM64 requires workarounds or custom builds.  
- **Multi-modal agents using vision models must avoid `slot-save` until #19466 is resolved**, as KV cache saving fails for vision-enabled models.  
- **Enable `--spec-type draft-mtp` cautiously** — it may silently fail under `-np N` with multi-ubatch due to async `t_h_nextn` race (#27572).  
- **Leverage mixed token batching** (`embd + raw`) for models like PaliGemma or other non-causal architectures using `llama_batch_ext`.  
- **For high-throughput MoE deployments**, consider the new GPU-cached expert offload path (#29887) to reduce latency in small-batch scenarios.  

> 📌 Pro Tip: Use `--log-level debug` + router mode logging fixes to debug complex multi-child server setups. Monitor for `illegal memory access` in CUDA logs — especially with MoE models.

---  
*Data source: [ggml-org/llama.cpp GitHub](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-05**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its support for emerging models and hardware, with key progress on Intel SYCL backend integration and enhanced proxy handling for enterprise environments. Critical stability fixes were merged for Qwen3.8 streaming and `clef-flash` decision model failures, while new feature requests highlight growing demand for K2 Horizon and MLX-based model workflows.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, a critical fix was merged via [PR #18790](https://github.com/ollama/ollama/pull/18790): pre-release (RC) versions can now pull matching `min_version` models, enabling smoother testing of upcoming features. This change improves developer workflow for CI/CD pipelines involving preview builds.

---

### **3. New Model & Hardware Support**  
- ✅ **Intel SYCL (oneAPI)**: Native support added for Intel discrete GPUs (e.g., Arc B70 32GB) under Linux via [PR #18333](https://github.com/ollama/ollama/pull/18333), including device discovery and opt-in compilation pipeline.  
- 🟡 **K2 Horizon Models**: A feature request ([#18698](https://github.com/ollama/ollama/issues/18698)) calls for support of MBZUAI’s new Apache-licensed K2-Horizon series (0.9B–36B MoE), signaling rising interest in open-source LLMs from leading research labs.  
- 🔧 **MLX Engine Expansion**: PRs [#18780](https://github.com/ollama/ollama/pull/18780) and [#15530](https://github.com/ollama/ollama/pull/15530) aim to extend MLX compatibility with Kolibri 1 and enable repeatable model porting workflows, targeting macOS-native performance gains.

---

### **4. Performance & Optimization**  
- ⚙️ **Parallel Request Enablement**: [PR #17144](https://github.com/ollama/ollama/pull/17144) lifts the hard block on parallel requests for `qwen35` and `qwen35moe`, now safe after upstream llama.cpp crash resolution (March 2026). This unlocks better throughput for multi-user inference workloads.  
- 📉 **Embedding Efficiency**: [PR #18610](https://github.com/ollama/ollama/pull/18610) eliminates redundant JSON round-trip serialization in OpenAI-compatible embeddings, reducing memory pressure and latency during batch processing—critical for RAG applications.  
- 🔄 **Proxy & Retry Bounds**: Multiple PRs ([#18452](https://github.com/ollama/ollama/pull/18452), [#18437](https://github.com/ollama/ollama/pull/18437)) enforce retry limits and bound URL resolution attempts to prevent deadlocks during network instability—improving reliability behind firewalls.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🔴 High | [#17778](https://github.com/ollama/ollama/issues/17778) | `qwen3.8`: Streaming fails with "no user query found" (500 error) during tool-calling loops | *In progress; no fix PR yet* |
| 🔴 High | [#18769](https://github.com/ollama/ollama/issues/18769) | `clef-flash` (Q8_0) fails on `/v1/systemone` with "non-finite logit" (CUDA) / "cannot open model" (CPU) — first forward pass failure | *In progress; no fix PR yet* |
| 🟡 Medium | [#18785](https://github.com/ollama/ollama/issues/18785) | `lfm2:24b`: `"python"` token without space decodes as empty string, silently dropping text | *Reported today; no fix PR* |
| 🟡 Medium | [#18775](https://github.com/ollama/ollama/issues/18775) | `/api/generate` accepts invalid non-JSON trailing data despite `Content-Type: application/json` | *Security risk; no fix PR* |
| 🟢 Low | [#18784](https://github.com/ollama/ollama/issues/18784) | Missing CLI mode for decision models | Feature request only |

> **Note**: Several regressions affect core inference paths (`systemone`, streaming) and are actively being investigated. The `clef-flash` issue suggests potential quantization or kernel misalignment problems.

---

### **6. What This Means for Application Developers**  
- **Avoid `qwen3.8` streaming until #17778 is resolved**, especially in agent/tool-loop scenarios. Use `qwen3.5` or fallback to `chat/completions` endpoint temporarily.  
- **Enable Intel SYCL backend** if using Intel Arc GPUs on Linux—this unlocks high-bandwidth, low-latency inference with full GPU utilization.  
- **Update your client logic** to handle edge cases like trailing non-JSON data in `/api/generate` (per [#18775](https://github.com/ollama/ollama/issues/18775))—validate payloads strictly.  
- **Prepare for MLX improvements**: With ongoing work on Kolibri 1 and mixed-precision loading ([#18789](https://github.com/ollama/ollama/issues/18789)), expect better performance on Apple Silicon—but watch for shape mismatches in custom quantized models.  
- **Use proxy settings** via environment variables ([#18730](https://github.com/ollama/ollama/pull/18730), [#18731](https://github.com/ollama/ollama/pull/18731)) when deploying Ollama behind corporate firewalls—now officially supported.

> 👉 *Pro Tip*: Monitor PRs #18786 (Qwen3.8 renderer auto-detection) and #18790 (RC version support) for immediate upgrades to tooling and testing workflows.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **1. Today's Highlights**  
LiteLLM v1.105.0-rc.1 introduces enhanced security with signed Docker images via Cosign, reinforcing trust in production deployments. Key improvements include critical fixes for cost tracking accuracy (e.g., `audio_speech` input cost handling), vector store API route support, and robustness in streaming responses for models like Claude and Vertex AI. The release also advances observability with ECS logging and real-time Lens trace monitoring.

---

### **2. Releases & Breaking Changes**  
- **v1.105.0-rc.1**: First release candidate of the 1.105 series with **Cosign-signed Docker images** — all releases are now cryptographically verifiable using the key from [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
- **Security Note**: Ensure your CI/CD pipelines verify image signatures before deployment. No breaking config changes reported in this release.

---

### **3. New Model & Hardware Support**  
- **Vector Store API Routes** added:  
  - `/vector_store_files`, `/vector_store_files/{id}`, and `/vector_stores/{id}` endpoints now supported via [Issue #15861](https://github.com/BerriAI/litellm/issues/15861) (PRs pending). Enables full lifecycle management of vector store files in LiteLLM proxy.
- **Vertex AI Agent Engine Streaming Fix**:  
  - Resolves silent dropping of image/audio/file content parts ([Issue #44336](https://github.com/BerriAI/litellm/issues/44336)) via PR [#44530](https://github.com/BerriAI/litellm/pull/44530), restoring multi-modal fidelity.
- **OpenRouter Price Sync**:  
  - Updated pricing for `openrouter/deepseek/deepseek-v4-flash` and others via [PR #44533](https://github.com/BerriAI/litellm/pull/44533), aligning with OpenRouter’s official API.

---

### **4. Performance & Optimization**  
- **Streaming Efficiency**:  
  - Fixed JSON array parsing across stream chunks in Vertex AI responses ([PR #31879](https://github.com/BerriAI/litellm/pull/31879)), eliminating `json.JSONDecodeError` on partial payloads.
  - Improved token counting for audio inputs (`input_audio`) instead of raising errors ([PR #40188](https://github.com/BerriAI/litellm/pull/40188)), enabling reliable cost estimation.
- **Rate Limiting Robustness**:  
  - Redis Lua script blocking proxies (Codis, Twemproxy) no longer silently degrade to per-pod limits ([PR #32232](https://github.com/BerriAI/litellm/pull/32232)).
- **Spend Tracking Optimization**:  
  - Added timeouts to auth registry loads ([PR #44530](https://github.com/BerriAI/litellm/pull/44530)) to prevent request stalls during cache misses.

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| 🔴 High | `vertex_ai/agent_engine` silently drops non-text content ([#44336](https://github.com/BerriAI/litellm/issues/44336)) | Incorrect agent outputs; hallucination risk | ✅ Fixed in PR [#44530](https://github.com/BerriAI/litellm/pull/44530) |
| 🔴 High | `audio_speech` deployment-level `input_cost_per_character` ignored ([#44200](https://github.com/BerriAI/litellm/issues/44200)) | Zero spend reporting despite usage | ✅ Fix in progress (PR #44530) |
| 🟡 Medium | WebRTC cost tracking broken in v1.82.3 ([#25738](https://github.com/BerriAI/litellm/issues/25738)) | Inaccurate billing for Azure gpt-realtime | ❌ Closed but unresolved; likely requires reversion |
| 🟡 Medium | MCP tools list capped at 100 with no pagination ([#32229](https://github.com/BerriAI/litellm/issues/32229)) | Tool discovery failure for large fleets | ⏳ Feature request; no fix yet |

---

### **6. What This Means for Application Developers**  
- **Adopt Signed Images**: Enforce image integrity in production by verifying Cosign signatures — critical for compliance and supply chain security.  
- **Multi-Modal Apps**: Use updated Vertex AI and Claude integrations to reliably pass image/audio data through the proxy without silent loss.  
- **Cost Accuracy**: Ensure `input_cost_per_character` is respected for TTS workloads (e.g., `audio_speech`) to avoid underbilling.  
- **Scalable Auth**: If using Redis behind a SCRIPT-blocking proxy, upgrade to avoid rate-limiting failures due to fallback to local memory.  
- **Future-Proofing**: Monitor `v1.105.0-rc.1` for early adoption — expect stable release soon with improved stability, security, and telemetry.  

> 💡 **Pro Tip**: Enable `LITELLM_ECS_LOGS=1` for seamless integration with Elastic Stack or Datadog ECS mode ([PR #29689](https://github.com/BerriAI/litellm/pull/29689)).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-10-05**

---

### **1. Today's Highlights**  
Critical performance regressions have been reported in `b10715-mix-*` and later builds, with tensor-split inference on dual GPUs dropping to ~48 tokens/sec (vs. 115–130 t/s in earlier versions), likely due to changes in CUDA graph handling. Meanwhile, new optimizations for FLUX.1 and Qwen-Image-2.1 on ROCm and Vulkan are being introduced to improve image generation speed and fix visual artifacts like thin lines in output.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen3-TTS Fast Fine-Tuning**: Added via PR #12646, enabling efficient fine-tuning of speech synthesis models using Unsloth’s fast training pipeline.
- ✅ **Anthropic Studio Tools Integration**: PR #12497 enables full support for MCP, file-based chat, and deep research via Anthropic connections in Studio.
- ✅ **ROCm Support for FLUX.1 & Qwen-Image-2.1**: PR #12701 introduces fused RoPE kernels for AMD GPUs (ROCm), improving per-image generation speed by up to 8%.
- ⚠️ **Vulkan GGUF on Radeon 780M**: Issue #12695 reports `ErrorOutOfDeviceMemory`, indicating incomplete Vulkan backend support on certain AMD mobile GPUs.

---

### **4. Performance & Optimization**  
- 🔥 **Tensor-Split Inference Regression**: Since `b10715-mix-86bd2d3`, tensor split decoding on dual RTX 5070 Ti is **~2.9x slower** (48 t/s vs. 115–130 t/s). Root cause suspected to be excessive CUDA graph usage (`max_cuda_graphs = 64`) introduced in #144. [Issue #12468](https://github.com/unslothai/unsloth/issues/12468)
- 🚀 **FLUX.1 Speedup on ROCm**: Fused RoPE kernel improves performance by **8% per image** (pixel-identical output) on AMD GPUs. [PR #12701](https://github.com/unslothai/unsloth/pull/12701)
- 📈 **Whole-Step CUDA Graphs on Offload**: PR #12707 extends offload optimization by stacking whole-step graphs, reducing host overhead and increasing throughput (L4 FLUX.1: **10% faster**, HunyuanVideo-1.5: **1 GiB lighter**).
- 🖼️ **VAE Tile Fix for Qwen-Image-2.1**: PR #12696 resolves visible horizontal/vertical line artifacts in generated images on low-VRAM cards (12GB/16GB). [PR #12696](https://github.com/unslothai/unsloth/pull/12696)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Status |
|---------|-------|-------------|--------|
| 🔴 High | [#12468](https://github.com/unslothai/unsloth/issues/12468) | Tensor-split inference **2.9x slower** since `b10715-mix-*` on dual GPUs; possibly due to CUDA graph limit. | Open |
| 🔴 High | [#12372](https://github.com/unslothai/unsloth/issues/12372) | Studio pages `mmproj-F16.gguf` from disk during generation → severe t/s drop; `--mlock` rejected, args stripped. | Open |
| 🟡 Medium | [#12552](https://github.com/unslothai/unsloth/issues/12552) | Long-context chat lags after recent update. | Open |
| 🟡 Medium | [#12695](https://github.com/unslothai/unsloth/issues/12695) | Vulkan GGUF fails on Radeon 780M with `ErrorOutOfDeviceMemory`. | Open |
| 🟡 Medium | [#12673](https://github.com/unslothai/unsloth/issues/12673) | Chat context bar never populates for custom llama.cpp connections due to missing `usage.prompt_tokens`. | Open |

> ✅ **Fixes in Progress**: PRs #12707, #12701, #12696, #12646 address key performance and correctness issues.

---

### **6. What This Means for Application Developers**  
- **Avoid `b10715-mix-*` builds** if using multi-GPU tensor split mode — use `b10687-mix-*` or official ggml builds until #12468 is resolved.
- **Leverage new optimizations** in PRs #12707 and #12701 for improved inference latency on ROCm and offloaded models.
- **Be cautious with `--mlock` and extra args** in Studio — they may be stripped or ignored post-update (see #12372).
- **Monitor context tracking** when connecting to custom llama.cpp endpoints — `contextUsage` may not reflect prompt tokens unless fixed (see #12673).
- **Prepare for future ARM64 Linux support** — current download links mislabel ARM64 as macOS (see #12680); verify binaries before deployment.

> 💡 *Recommendation*: Pin your environment to stable releases and monitor GitHub closely for fixes related to CUDA graph behavior and Vulkan compatibility.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*