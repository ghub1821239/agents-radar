# AI Infrastructure Digest 2026-09-11

> Generated: 2026-09-11 00:30 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-11**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q3 2026 is defined by rapid convergence toward high-throughput, low-latency serving of next-generation MoE and hybrid-attention models (e.g., DeepSeek-V4, GLM-5.3-Flash), driven by new hardware like Blackwell (sm_121) and MI350X. While vLLM and SGLang lead in production-grade engine maturity, projects like llama.cpp and Unsloth are pushing boundaries in local inference and edge optimization. A growing emphasis on stability, correctness, and security—evidenced by critical regressions in FP8 decoding, CUDA memory corruption, and CVEs—signals that the ecosystem is transitioning from "feature velocity" to "production readiness." The rise of multimodal agents and tooling has also intensified demand for robust model routing, guardrails, and OCR integrations.

---

### **2. Activity Comparison**

| Project        | Open Issues | Open PRs | Releases (Last 24h) | Key Status |
|----------------|-------------|----------|----------------------|------------|
| **vLLM**       | 127         | 89       | None                 | Active dev; breaking changes pending |
| **SGLang**     | 142         | 104      | None                 | High instability; CI maintenance mode |
| **llama.cpp**  | 118         | 92       | 3 fixes (minor)      | Stable but with critical bugs |
| **Ollama**     | 121         | 76       | None                 | Stability issues in cloud & quantized models |
| **LiteLLM**    | 134         | 112      | v1.100.1 / rc.2      | Security-hardened release |
| **Unsloth**    | 108         | 87       | None                 | Experimental features in flight |

> ✅ *Insight*: **SGLang** and **LiteLLM** show the highest activity levels, reflecting their roles as integration layers under heavy development. **vLLM** remains most focused on core engine stability despite lower PR volume.

---

### **3. Model Support Race**

| Model / Architecture       | vLLM       | SGLang     | llama.cpp   | Ollama       | LiteLLM       | Unsloth         |
|----------------------------|------------|------------|-------------|--------------|---------------|-----------------|
| **DeepSeek-V4.1-Flash**    | ⚠️ In progress (#50576) | ✅ In PRs (#38963) | ✅ Added (#28696) | 🔶 Feature request (#18360) | —             | —               |
| **GLM-5.3-Flash**          | ❌ ROCm/DFlash issues | ⚠️ SM120/TP8 support | ✅ Added (#27773) | 🔶 Cloud support pending | —             | —               |
| **Qwen3.8-Flash-Next-FP8** | 🔴 Non-determinism | —          | ⚠️ Speculative decoding divergence | 🟡 0% task success (q2_K/q3_K) | —             | —               |
| **Wan2.2-TI2V-5B (Video)** | —          | —          | —           | —            | —             | ✅ NVFP4 support |
| **Azure Document Intelligence** | —          | —          | —           | —            | ✅ Native adapter | —               |
| **Reducto OCR**            | —          | —          | —           | —            | ✅ Integrated | —               |

> 🏆 **Winner**: **llama.cpp** leads in *early adoption* of new models (especially vision + Flash variants), while **SGLang** is fastest in *engineering integration* of DSV4.1 with shared-experts fusion. **vLLM** lags behind in feature delivery but maintains better long-term stability.

---

### **4. Performance Frontier**

| Focus Area               | Leading Projects                          | Key Developments                                                                 |
|--------------------------|-------------------------------------------|----------------------------------------------------------------------------------|
| **KV Cache Optimization**| vLLM, SGLang, llama.cpp                   | Engram I/O prefetching (vLLM), unified KV pools (SGLang), incremental indexer cache (llama.cpp) |
| **Batching & Parallelism**| vLLM (MTP+GDN), SGLang (DCA/HiCache)     | Critical throughput loss in MTP+hybrid GDN (vLLM); decode retraction crashes (SGLang) |
| **Quantization**         | Unsloth (NVFP4), vLLM (FP8), llama.cpp (Q4_K_M) | NVFP4 for video models (Unsloth); Q4_K_M speculative divergence (llama.cpp) |
| **Distributed Serving**  | vLLM, SGLang                              | Tensor-parallel reduction ordering (`VLLM_TP_FIXED_ORDER_ALLREDUCE`), DCP >1 risks |
| **Kernel-Level**         | vLLM (CUTLASS Lamport), llama.cpp (Vulkan) | Fused GEMM+AllReduce (vLLM), small-M optimizations (llama.cpp)                  |

> 🔥 **Trend**: The frontier is shifting from pure speed to *correctness under complexity*—especially in FP8, MoE, and multi-GPU configurations.

---

### **5. Layer Positioning**

| Project        | Primary Layer                     | Role Summary                                                                 |
|----------------|-----------------------------------|------------------------------------------------------------------------------|
| **vLLM**       | **Inference Engine**              | Core GPU-accelerated serving engine; benchmark for performance and scalability |
| **SGLang**     | **Inference Engine + Gateway**    | Extends engine with agent-aware routing, HiCache, and speculative workers     |
| **llama.cpp**  | **Local Runtime / Edge Inference**| Cross-platform, CPU/GPU-optimized runtime; ideal for offline/embedded use     |
| **Ollama**     | **Gateway / Local Runtime**       | Developer-friendly CLI/API gateway with model hub and agent tooling            |
| **LiteLLM**    | **LLM Gateway / Orchestration**   | Enterprise proxy layer with cost tracking, guardrails, and multi-provider routing |
| **Unsloth**    | **Fine-tuning + Local Runtime**   | Specializes in fast training/fine-tuning and optimized local inference (esp. Apple Silicon) |

> 💡 **Strategic Insight**: The stack is becoming modular—engine (vLLM/SGLang), runtime (llama.cpp/Unsloth), gateway (Ollama/LiteLLM)—with developers choosing based on deployment context.

---

### **6. Trend Signals**

1. **Stability Over Speed**: Critical regressions in FP8 decoding, silent memory corruption, and CVEs (Ollama) signal a shift from “build fast” to “run safely.” Production users must now vet every patch.
   
2. **MoE & Hybrid Attention Dominance**: Projects are racing to support DFlash, shared-experts fusion, and hybrid GDN architectures—indicating these are now de facto standards for large models.

3. **Multimodal Agent Infrastructure Is Maturing**: New OCR adapters (Azure Doc AI, Reducto), tool schema validation, and structured output enforcement (LiteLLM, SGLang) show that agent pipelines are no longer experimental.

4. **Security & Supply Chain Integrity**: LiteLLM’s cosign-signed images and Ollama’s open CVEs highlight growing scrutiny over binary trust—expect stricter verification requirements in production.

5. **Edge & Desktop Optimization**: Unsloth’s NVFP4 video support and llama.cpp’s Windows ARM64 build capability indicate strong momentum in local, low-resource inference.

> ✅ **Actionable Advice for Developers**:
> - Avoid `q2_K/q3_K` quantizations until fixed (Ollama).
> - Use `--flash-attn off` or patched builds for Qwen MoE (llama.cpp).
> - Prefer stable v0.26.1 (vLLM) or `main` (SGLang) for production unless tracking specific PRs.
> - Validate all FP8 outputs—non-determinism is widespread.
> - Leverage LiteLLM’s guardrails and OCR integrations for secure, multimodal agent workflows.

---

> **Final Note**: The AI infrastructure stack is no longer just about speed—it's about **reliability, correctness, and operational safety**. Choose your tools not just for performance, but for resilience at scale.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-11**

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate support for next-generation models and hardware, with critical fixes for speculative decoding on hybrid GDN architectures and ongoing work to stabilize performance on Blackwell (sm_121) and ROCm platforms. A major focus is enabling DeepSeek-V4-Flash on SM8x (Ampere) GPUs and resolving persistent top-k non-determinism in Qwen3.8-Flash-Next — both key hurdles for production inference.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, several **breaking changes are pending** in PRs:  
- `PR #56250` enforces runtime validation that disallows `MRV1 + PP>1 + async sched + structured output`, which previously caused HTTP 500 errors due to FSM failure ([#45014](https://github.com/vllm-project/vllm/issues/45014)).  
- `PR #56358` introduces an opt-in `VLLM_TP_FIXED_ORDER_ALLREDUCE=1` flag for tensor-parallel reduction ordering — a potential behavioral shift for multi-node deployments.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4-Flash / -0731**: Active feature request (#50576) to enable SM8x (A100/A800/RTX 30xx) support; currently blocked by kernel compatibility.  
- **GLM-5.3-Flash**: Multiple issues highlight incomplete ROCm/DFlash support: missing `SupportsEagle3`, lack of non-causal sparse attention path ([#54451](https://github.com/vllm-project/vllm/issues/54451)), and crashes on 4xB200 ([#54317](https://github.com/vllm-project/vllm/issues/54317)).  
- **Blackwell (sm_121)**: Still lacks full aarch64 support ([#36821](https://github.com/vllm-project/vllm/issues/36821)) and faces silent corruption risks from stale Triton cache ([#41871](https://github.com/vllm-project/vllm/issues/41871)).  
- **ROCm (MI350X, gfx950)**: Ongoing efforts to enable shared-expert overlap at TP>1 ([#56167](https://github.com/vllm-project/vllm/pull/56167)) and add TheRock build opt-ins ([#56351](https://github.com/vllm-project/vllm/pull/56351)).

---

### **4. Performance & Optimization**  
- **Speculative Decoding**: Critical throughput loss (~30–40%) reported when using MTP with hybrid GDN models due to unnecessary recompute after prefix-cache drop ([#53670](https://github.com/vllm-project/vllm/issues/53670)). Fixed in `PR #52244` (pending merge).  
- **Engram I/O**: `PR #56357` adds asynchronous prefetch and mmap sharing for DeepSeek V4.1 engram tables — reduces CPU overhead and improves latency under `cpu_offload`.  
- **Kernel Optimization**: `PR #55261` proposes integrating CUTLASS Lamport GEMM+AllReduce for Blackwell — potentially boosting collective efficiency via fused kernels.  
- **MoE & TP**: `PR #29139` targets optimizing collectives in MoE + TP cases via `torch.compile` pass to avoid redundant computation.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| 🔴 High | [#54521](https://github.com/vllm-project/vllm/issues/54521) | Non-deterministic greedy decoding in `Qwen3.8-Flash-Next-FP8` when context nears `indexer_budget` | Open — affects correctness |
| 🔴 High | [#54317](https://github.com/vllm-project/vllm/issues/54317) | Recurring CUDA illegal memory access on 4xB200 (KDA linear-attention, MHC TileLang, TRT-LLM fused MoE) | Open — crash risk |
| 🔴 High | [#54300](https://github.com/vllm-project/vllm/issues/54300) | Silent token corruption or crash on `GlmMoeDsa` + decode-context-parallel after v0.28 → v0.29 | Open — regression |
| 🟡 Medium | [#55533](https://github.com/vllm-project/vllm/issues/55533) | Scheduler throttles to ~3 concurrent sequences with MTP + hybrid GDN — severe throughput collapse | Open — high impact |
| 🟡 Medium | [#49546](https://github.com/vllm-project/vllm/issues/49546) | Marlin W4A8-FP8 silently corrupts output on GB10/sm_121a, causing repeated `</think>` loops | Open — correctness bug |

---

### **6. What This Means for Application Developers**  
- **Avoid MTP + hybrid GDN** until `PR #52244` lands — it causes severe throughput degradation and recomputation.  
- **Validate FP8 outputs carefully** on Qwen3.8-Flash-Next and GLM-5.3-Flash: non-determinism and silent corruption are active risks.  
- **Use `VLLM_TP_FIXED_ORDER_ALLREDUCE=1` only if you need deterministic reduction order** — this may affect scalability in large-scale TP setups.  
- **Monitor ROCm builds closely** — multiple DFlash and MoE issues remain unresolved, especially on MI350X and CDNA3.  
- **Prefer nightly builds** for latest fixes (e.g., `glm53-flash` Docker images), but expect instability on newer hardware like DGX Spark (GB10).

> ✅ *Recommendation*: For production, stick to stable v0.26.1 or earlier unless you’re tracking specific PRs and can tolerate known regressions. Always test with `--disable-async-scheduling` and `--disable-multiprocessing` during debugging.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-11

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to prioritize stability and performance for next-generation LLM serving, with critical work on DeepSeek-V4.1 integration and GPU infrastructure hardening. Key PRs focus on enabling shared-experts fusion in DSV4.1, fixing HiCache compatibility with encoder replay, and resolving CUDA coredumps from CI testing. The project remains active in addressing regressions affecting multi-GPU inference, particularly on Hopper (H20) and Blackwell (SM120) architectures.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours.  
*Note:* Ongoing efforts to sync with upstream main (see [#38818](https://github.com/sgl-project/sglang/issues/38818)) are prerequisite for landing DeepSeek-V4.1 — this may trigger future breaking changes in model routing and memory management.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1 (FP8, TP8, DSpark)**: Active development underway via PRs like [#38963](https://github.com/sgl-project/sglang/pull/38963), which aims to enable `num_fused_shared_experts` in VL routing.  
- **GLM-5.3-Flash (SM120)**: Tracking progress in [#37813](https://github.com/sgl-project/sglang/issues/37813); required fixes include MoE weight loading and KV cache handling on dual 96GB RTX PRO 6000 Blackwell GPUs.  
- **SenseNova-U1/U1.5**: Feature tracking ongoing in [#37742](https://github.com/sgl-project/sglang/issues/37742) based on official OpenSenseNova/SenseNova-U1 reference implementation.  
- **AMD ROCm Support**: Enhanced for MiniMax-M3 (`gfx942+`) with FP8 K-cache allocation ([#36549](https://github.com/sgl-project/sglang/pull/36549)) and shared-experts fusion enabled ([#36576](https://github.com/sgl-project/sglang/pull/36576)).  
- **NPU & NVSHMEM**: Bumping bundled NVSHMEM to 3.7.2 ([#38769](https://github.com/sgl-project/sglang/issues/38769)) to support InfiniBand GID indexing in production fabrics.

---

### **4. Performance & Optimization**  
- **Shared Experts Fusion**: Optimizing DSV4.1 via unified indexer execution ([#38962](https://github.com/sgl-project/sglang/pull/38962)) and passing `num_fused_shared_experts` through VL routing ([#38963](https://github.com/sgl-project/sglang/pull/38963)).  
- **Kernel Fusing**: AMD-specific optimizations reduce decode overhead: fused Q/K prep into single kernel ([#34394](https://github.com/sgl-project/sglang/pull/34394)), and fusing quantized `in_proj` layers in Qwen3.5 ([#33068](https://github.com/sgl-project/sglang/pull/33068)).  
- **Memory Efficiency**: Unified KV pool management for DeepSeek V4 ([#38954](https://github.com/sgl-project/sglang/pull/38954)) and improved state reuse across attention paths.  
- **Speculative Decoding**: Enabling speculative workers to stage prefill reads before target replay ([#38554](https://github.com/sgl-project/sglang/pull/38554)).

---

### **5. Stability & Regressions**  
Critical issues reported today:  
1. **CUDA Coredump Tracker (#26340)**: 296 comments; auto-collected core dumps from `pr-test.yml`. High severity due to potential instability in CI and runtime crashes. No fix PR yet.  
2. **Decode Retraction Crash on PD Disaggregation (#38645)**: CUDA device-side assert during retraction when backing up KV cache to host memory. Impacts high-concurrency decode servers with DCP > 1.  
3. **H20 8-card Launch Failure (#38793)**: Qwen3.8-Flash-Next-FP8 fails to launch on 8x H20 configuration. Likely related to memory layout or distributed scheduling.  
4. **Kimi-K3 Strict Tool Grammar Bug (#38587)**: Named property constraints diluted by `additionalProperties`, leading to invalid tool calls. Affects strict schema validation in agent workflows.  
5. **HiCache + Encoder Replay Failure (#38957)**: HiCache rejects bounded replay used in DSV4.1 encoders; requires structural changes to prefix tree handling.  

*Note:* Several PRs address underlying causes (e.g., #38957, #38645), but none are merged as of 2026-09-11.

---

### **6. What This Means for Application Developers**  
- **Expect instability in experimental models** (DSV4.1, GLM-5.3-Flash, SenseNova-U1): Use stable branches until formal release.  
- **Avoid `--dcp-size > 1` with decode retraction** until [#38645](https://github.com/sgl-project/sglang/issues/38645) is resolved — risk of crashes under load.  
- **Use `--enforce-shared-experts-fusion` cautiously** on DSV4.1; current behavior leads to garbage outputs ([#38963](https://github.com/sgl-project/sglang/pull/38963)).  
- **LoRA and HiCache users**: Enable salt isolation via `extra_key` ([#38577](https://github.com/sgl-project/sglang/pull/38577)) to prevent cross-adaptor KV cache pollution.  
- **For multi-GPU deployments**: Monitor H20 and SM120 configurations closely — multiple launch and correctness bugs remain open.  
- **CI health is a priority**: The team has entered maintenance mode ([#21065](https://github.com/sgl-project/sglang/issues/21065)) to stabilize test pipelines; expect delayed PR merges.

> ✅ **Recommendation**: Pin your SGLang version to `main` only if you’re actively contributing or testing bleeding-edge features. For production use, wait for official releases post-DeepSeek-V4.1 sync.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-11**

---

### **1. Today’s Highlights**  
The latest updates focus on Vulkan backend stability and performance for Qwen models, with critical fixes to speculative decoding and memory management. Key improvements include optimized small-M matrix operations, better DFlash support after vision inputs, and enhanced GPU memory handling across multiple backends.

---

### **2. Releases & Breaking Changes**  
- **vulkan: use CPU writes in `ggml_backend_vk_cpy_tensor_async` if context is idle** (#28618)  
  Ensures safe async tensor copying when Vulkan context is inactive, reducing risk of race conditions.
- **vulkan: fall back to shared-memory reduction for dmmv on PowerVR** (#28341)  
  Fixes crashes on older PowerVR GPUs due to unsupported subgroup reductions in proprietary Vulkan compilers.
- **memory: avoid allocating V cache for indexer (not used)** (#28330)  
  Reduces unnecessary GPU memory usage; co-authored by Stanisław Szymczyk.

> 🔗 [PR #28618](https://github.com/ggml-org/llama.cpp/pull/28618), [PR #28341](https://github.com/ggml-org/llama.cpp/pull/28341), [PR #28330](https://github.com/ggml-org/llama.cpp/pull/28330)

---

### **3. New Model & Hardware Support**  
- **Added support for DeepSeek-V4.1-Flash (`deepseek41` architecture)** (#28696)  
  Enables conversion and inference for the latest DeepSeek model variant via `convert` tool.
- **Added support for GLM-5.3-Flash (GLM5-Next)** (#27773)  
  Full support for 320B hybrid text+vision model with DSA/MHC layers; includes vision preprocessing pipeline.
- **Windows ARM64 builds now supported with MSVC cl.exe** (#28362)  
  Removes dependency on LLVM/Clang for Windows ARM64 development; enables native build via CMake.

> 🔗 [PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696), [PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773), [PR #28362](https://github.com/ggml-org/llama.cpp/pull/28362)

---

### **4. Performance & Optimization**  
- **Vulkan: small M matrix optimizations for Qwen** (#28457)  
  - Optimized `m=1` `mul_mat` by swapping A/B operands  
  - Improved tile selection logic based on M vs N dimensions  
  - Enabled `split_k` for small M matrices → reduces latency in attention kernels
- **CPU: tiled mul_mat for k-quants using VNNI** (#27851)  
  - Achieves **3–7x speedup** on compatible CPUs (e.g., Intel Xeon, Core i-series)  
  - Uses 256×256 int8 tiles with vectorized unpacking; minimal complexity overhead
- **QSA indexer: incremental pooled-key cache** (#28699)  
  - Caches block summary keys across tokens → eliminates recomputation every step  
  - Addresses dominant decode cost in `qwen4exp` at depth; significant latency reduction

> 🔗 [PR #28457](https://github.com/ggml-org/llama.cpp/pull/28457), [PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851), [PR #28699](https://github.com/ggml-org/llama.cpp/pull/28699)

---

### **5. Stability & Regressions**  
- **Speculative decoding divergence on quantized targets (Q4_K_M)** (#25618)  
  - **Severity**: High — produces different outputs under greedy sampling (`temperature=0`)  
  - Reproducible only on quantized models; matches on BF16  
  - No fix PR yet; reported by Ankk98 (23 comments)
- **DFlash + vision models: drafter memory fails to allocate new tokens** (#28587)  
  - Fixed in #28587: stops copying image offsets that break drafter state  
  - Follow-up PR #28715 extends fix to all drafters post-image input
- **CUDA illegal memory access in flash-attn path (Qwen3.6-35B MoE + partial offload)** (#26609)  
  - Deterministic crash during second request in sequence  
  - Disappears when `--flash-attn off` — likely a kernel synchronization issue
- **SYCL scratchpad pool breaks LIFO order** (#28660)  
  - Crash in `ggml_sycl_pool_vmm::free` due to oneDNN scratchpad misuse  
  - Critical for production deployments using SYCL

> 🔗 [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618), [Issue #26609](https://github.com/ggml-org/llama.cpp/issues/26609), [Issue #28660](https://github.com/ggml-org/llama.cpp/issues/28660)

---

### **6. What This Means for Application Developers**  
- **Use `--flash-attn off` or patch `b10897+`** if running Qwen MoE models on CUDA — current flash attention has unpatched memory corruption risks.
- **Avoid speculative decoding with Q4_K_M quantizations** until #25618 is resolved; expect non-deterministic output.
- **Leverage `qwen4exp` improvements** (PR #28699) for faster generation on Qwen3.8-Flash-Next — especially beneficial for long-context reasoning.
- **Build for Windows ARM64 with MSVC** now possible without external toolchain — ideal for edge devices.
- **Sanitize UTF-8 output** (PR #28724): Add client-side validation if generating raw text from BPE vocabularies.

> 📌 Pro tip: Monitor `--cache-disk` feature request (#20697) — disk-based context offloading could soon enable large-model inference on low-RAM systems.

---  
*Data source: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*  
*Digest generated: 2026-09-11*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-11**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its cloud and local inference capabilities, with critical progress on context window support (up to 1M tokens) and improved tooling for agents. High-priority stability fixes are underway, including a fix for `glm-5.3:cloud`’s infinite reasoning loop (#18193), while new PRs address memory leaks in `/api/generate` and GPU-specific crashes in Vulkan backend.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, **PR #18364** introduces UI-level support for 512K and 1M context windows in settings — a major change that will enable full utilization of models like `glm-5.3:flash` and `gemma4:12b`. This is expected to be included in an upcoming release.  
🔗 [PR #18364 – Allow 1M context in settings](https://github.com/ollama/ollama/pull/18364)

---

### **3. New Model & Hardware Support**  
- **New model request**: `DeepSeek-V4.1-Flash` now has two active feature requests (#18360, #18178) for inclusion in Ollama Cloud. The model is currently available via Hugging Face but not yet natively supported.  
  🔗 [Issue #18360 – Add DeepSeek-V4.1-Flash to Cloud](https://github.com/ollama/ollama/issues/18360)  
- **Hardware/backend updates**:  
  - **Vulkan ggml backend** reports severe hangs on AMD UMA APUs (issue #18370), indicating instability in GPU offload path.  
  - **MLX backend improvements**: PRs #18376 (keep Gemma3n projector off CPU) and #18327 (scope array lifetimes) improve memory safety and avoid silent corruption on CPU.  
  - **Gemma3n tool models** now correctly handle `tool_calls` via `/v1/chat/completions` after recent parser fixes (#18366).

---

### **4. Performance & Optimization**  
- **Memory leak fix**: PR #18344 identifies a file descriptor leak in `ollama serve`, where each successful `/api/generate` request retains one FD indefinitely — a known cause of long-term process degradation.  
  🔗 [Issue #18344 – FD leak in /api/generate](https://github.com/ollama/ollama/issues/18344)  
- **Model loading regression**: Users report significant slowdowns in model load times after upgrading from 0.23.4 → 0.30.0 (issue #18373). Affected models include `GPT-OSS:120b`.  
- **Streaming efficiency**: PR #18374 increases token repeat limit to 100 and returns early errors instead of incomplete responses, improving reliability for OCR and text generation tasks.  
  🔗 [PR #18374 – Raise token repeat limit](https://github.com/ollama/ollama/pull/18374)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|--------|
| **Critical** | CVE vulnerabilities in Go binary (`/usr/local/bin/ollama`) – 1 CRITICAL, 11 HIGH | Open (#16033) | No fix yet; urgent patch required |
| **High** | `glm-5.3:cloud` enters endless reasoning, aborting tasks in OpenCode/ZCode | Open (#18193) | Fixed via PR #18351 (propagate stream failures) |
| **High** | `qwen2.5-coder:3b-instruct` quantized variants (q2_K/q3_K_S/M/L) fail all code tasks (0% success) | Open (#18252) | No fix; affects production use |
| **Medium** | macOS GUI fails silently after ~6k tokens; no error notification | Open (#18368) | No fix; impacts long-document workflows |
| **Medium** | `gemma4:12b` emits repeated `<unused50>` frames + EOF without `done: true` | Open (#18359) | No fix; disrupts streaming clients |
| **Low** | `qwen2.5vl:3b` crashes deterministically on one JPEG image when running on GPU | Open (#18369) | No fix; reproducible under specific conditions |

---

### **6. What This Means for Application Developers**  
- **Use caution with `glm-5.3:cloud`**: Avoid it in production until #18193 is resolved — it may hang or crash during reasoning-heavy tasks.  
- **Expect context window limits**: While 1M contexts are now exposed in settings (via #18364), ensure your agent/tooling supports dynamic context adjustment — e.g., Claude Desktop still defaults to 200K unless `supports_1m` is detected.  
  🔗 [PR #18365 – Let Claude Desktop use full context](https://github.com/ollama/ollama/pull/18365)  
- **Avoid low-bit quantized `qwen2.5-coder` models**: The q2_K/q3_K series are non-functional (0% task success); stick to higher-precision versions until #18252 is patched.  
- **Monitor for memory leaks**: If using high-throughput APIs, restart `ollama serve` regularly until #18344 is merged.  
- **Handle malformed tool calls**: Tools using complex schemas (e.g., `anthropic/v1/messages`) may emit literal text instead of structured `tool_use` blocks — validate output carefully.  
  🔗 [Issue #18346 – Complex tool schemas break parsing](https://github.com/ollama/ollama/issues/18346)

> ✅ **Pro tip**: Use `ollama show <model>` and `GET /api/tags` to verify `tools`, `thinking`, and `completion` capabilities — discrepancies exist across endpoints (e.g., #16969).

---  
*Digest generated: 2026-09-11 | Source: [github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-11**

#### **1. Today's Highlights**  
The LiteLLM project continues to strengthen its enterprise-grade infrastructure with critical fixes for stability and observability, particularly around health checks, cost tracking, and session management. New PRs introduce foundational support for Azure Document Intelligence and Reducto OCR adapters, while ongoing work improves guardrail integration and proxy performance via sidecar offloading.

#### **2. Releases & Breaking Changes**  
- **v1.100.1** and **v1.101.0-rc.2** released with verified Docker image signatures via [cosign](https://docs.sigstore.dev/cosign/overview/), using the same key introduced in commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
- No breaking API changes reported; focus remains on internal reliability and security hardening.

#### **3. New Model & Hardware Support**  
- ✅ **Azure Document Intelligence**: Added as a native OCR adapter via PR [#40534](https://github.com/BerriAI/litellm/pull/40534), supporting authenticated submission and bounded polling.  
- ✅ **Reducto v3 & legacy**: Integrated via PR [#40535](https://github.com/BerriAI/litellm/pull/40535), enabling document fetching and processing.  
- ✅ **Azure Mistral**: Added via PR [#40533](https://github.com/BerriAI/litellm/pull/40533), including inline document handling and facade routing.  
- ✅ **Vertex AI Mistral**: Introduced via PR [#40507](https://github.com/BerriAI/litellm/pull/40507).  
- ✅ **ConductGuard**: First-class guardrail integration added via PR [#38143](https://github.com/BerriAI/litellm/pull/38143), enabling pre-call policy enforcement.

#### **4. Performance & Optimization**  
- **Proxy-side cost tracking offloaded to pod-local collector sidecar** (PR [#40545](https://github.com/BerriAI/litellm/pull/40545)): Reduces tail latency by decoupling spend logging from inference worker event loops.  
- **Streaming mock response now emits admission-time usage chunk** (PR [#40637](https://github.com/BerriAI/litellm/pull/40637)): Prevents redundant tokenization post-stream, saving ~100–200ms per 50k–100k-token request.  
- **HTTP/2 support for Vertex AI Search vector store** (PR [#40631](https://github.com/BerriAI/litellm/pull/40631)): Enables concurrent multi-datastore searches without connection queueing overhead.

#### **5. Stability & Regressions**  
- 🔴 **Critical**: `Background health checks load entire LiteLLM_HealthCheckTable into every worker` → OOM risk at scale (Issue [#37611](https://github.com/BerriAI/litellm/issues/37611)). Fix pending; currently affects multi-worker deployments.  
- 🔴 **Critical**: `Claude Code → vLLM path unstable` due to streaming corruption (`hosted_vllm`) and incomplete fallbacks (`anthropic`) (Issue [#30043](https://github.com/BerriAI/litellm/issues/30043)). High priority for production users.  
- 🟡 **Regression**: `/metrics` endpoint returns empty data after upgrading to v1.88.0 (Issue [#30079](https://github.com/BerriAI/litellm/issues/30079)) — likely due to 307 redirect misrouting.  
- 🟡 **Bug**: Reused `x-litellm-call-id` silently drops spend-log rows (Issue [#35563](https://github.com/BerriAI/litellm/issues/35563)) — impacts cost auditing integrity.  
- 🟡 **Bug**: Streaming fallback inconsistent with non-streaming fallback (Issue [#25843](https://github.com/BerriAI/litellm/issues/25843)) — breaks failover logic.

#### **6. What This Means for Application Developers**  
- **Use caution with v1.88.0+ if relying on Prometheus metrics** — upgrade to v1.100.1 or later and verify `/metrics` behavior.  
- **Avoid `Claude Code → vLLM` routing paths until #30043 is resolved** — consider switching to `anthropic` provider or direct API calls.  
- **Leverage new guardrails (ConductGuard)** and **OCR integrations (Azure Doc AI, Reducto, Mistral)** to build secure, multimodal agents with reduced vendor lock-in.  
- **Enable pod-local spend tracking (opt-in)** via PR [#40545](https://github.com/BerriAI/litellm/pull/40545) to reduce inference latency in high-throughput environments.  
- **Monitor for health check memory bloat** in clustered setups — disable shared health checks or patch with fix from ongoing work.

> 💡 *Pro tip: Use `cosign verify` on all Docker images to ensure supply chain integrity.*  
> 🔗 [Verify Docker Image Signatures](https://docs.sigstore.dev/cosign/overview/) | [GitHub Issues](https://github.com/BerriAI/litellm/issues) | [Pull Requests](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-11**

---

### **1. Today's Highlights**  
The Unsloth project continues its aggressive optimization push, with key advancements in model serving performance and Studio UX improvements. Critical fixes address GPU compatibility issues (e.g., `GGML_CUDA_P2P` misconfiguration on non-NVLink GPUs), while new PRs introduce NVFP4 quantization for video models and per-layer image policy support. A major focus remains on reducing startup latency and improving stability across desktop and web clients.

---

### **2. Releases & Breaking Changes**  
*No new releases posted in the last 24 hours.*  
However, several breaking changes are in flight:
- **PR #10745**: Refactors bitsandbytes native calls to use live PyTorch streams — this may affect custom kernels relying on cached stream references.
- **PR #10730 / #10731**: Introduces experimental per-layer NVFP4 policies and flashinfer backend enhancements; these will alter how image diffusion models are loaded and executed unless disabled via `UNSLOTH_SMART_OFFLOAD`.

> 🔗 [PR #10745](https://github.com/unslothai/unsloth/pull/10745) | [PR #10730](https://github.com/unslothai/unsloth/pull/10730)

---

### **3. New Model & Hardware Support**  
- **NVFP4 for Video Models**: Whole-model NVFP4 support added for *Wan2.2-TI2V-5B*, *Wan2.2-T2V-A14B*, and *HunyuanVideo-1.5* (480p/720p) via hosted pre-quantized denoisers. Reduces on-the-fly quantization overhead from 5–28 GB of dense weights.  
- **MLX MoE Optimizations**: Optional integration of MLX’s MoE gate/up fusion and recurrent decode fusion for improved inference efficiency on Apple Silicon hardware.  
- **Windows Installer Fix**: PR #10765 resolves installation failure when user profiles contain spaces (closes #10722).

> 🔗 [PR #10729](https://github.com/unslothai/unsloth/pull/10729) | [PR #10765](https://github.com/unslothai/unsloth/pull/10765) | [PR #10733](https://github.com/unslothai/unsloth/pull/10733)

---

### **4. Performance & Optimization**  
- **Qwen3.5-9B LoRA SFT Speedup**: Experimental training on B200 shows **1.28x faster step time** after 8 optimizations (PR #10744). Includes kernel-level fixes and memory layout tuning.  
- **FlashInfer FP4 Backend**: New `mm_fp4` kernel path enables faster execution of NVFP4 linear layers in image DiTs.  
- **Cache Efficiency Gains**: PRs #10647 and #10659 improve reuse of shared UV caches and prevent redundant downloads during `studio update`.  
- **Model Load Time Reduction**: PR #10728 removes blocking catalog scans during agent startup, preventing 30-second timeouts.

> 🔗 [PR #10744](https://github.com/unslothai/unsloth/pull/10744) | [PR #10731](https://github.com/unslothai/unsloth/pull/10731) | [PR #10728](https://github.com/unslothai/unsloth/pull/10728)

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| `GGML_CUDA_P2P=1` corrupts output on RTX 6000 Ada (non-NVLink) | Critical | Open | ❌ Not yet resolved |
| Full context reprocessing after every tool call (30k+ tokens) | High | Open | ❌ No fix yet |
| Long GGUF chats lose prompt state after reload (~11 min prefill) | High | Open | ❌ Pending investigation |
| Studio CLI fails on Windows: `stdout is not a terminal` | Medium | Open | ❌ Only workaround: run in TTY |
| Diffusion models unload after generation, don’t release RAM | Medium | Open | ❌ Reported by Reddit user |

> 🔗 [Issue #10613](https://github.com/unslothai/unsloth/issues/10613) | [Issue #10698](https://github.com/unslothai/unsloth/issues/10698) | [Issue #9037](https://github.com/unslothai/unsloth/issues/9037) | [Issue #10699](https://github.com/unslothai/unsloth/issues/10699)

---

### **6. What This Means for Application Developers**  
- **Expect faster inference** for video and image diffusion models using NVFP4 — leverage `UNSLOTH_SMART_OFFLOAD` to enable auto-quantization paths.  
- **Avoid context bloat**: The lack of rolling context windows (see #7472) means long conversations risk OOM or excessive reprocessing. Implement client-side truncation logic until compaction is supported.  
- **Validate your workflows on multi-GPU systems**: Misconfigured `GGML_CUDA_P2P` can silently corrupt outputs — verify environment variables in production.  
- **Use Studio CLI carefully on Windows**: Avoid piping stdout into scripts; use interactive terminals or adjust shell setup.  
- **Design robust data pipelines**: Issues like #10738 and #10739 highlight fragility in dataset processing — validate schema integrity early.

> 📌 Pro Tip: Monitor `UNSLOTH_SMART_OFFLOAD` behavior in staging environments before enabling advanced quantization features.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*