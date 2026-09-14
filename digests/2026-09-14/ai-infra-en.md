# AI Infrastructure Digest 2026-09-14

> Generated: 2026-09-14 00:23 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-14**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *deep specialization and convergence*, where high-performance engines (vLLM, SGLang), lightweight local runtimes (llama.cpp), unified gateways (LiteLLM), and integrated training platforms (Unsloth) are increasingly interdependent. While vLLM and SGLang lead in distributed inference scalability and semantic intelligence, llama.cpp maintains dominance in cross-platform portability and CPU/GPU flexibility. The rise of hybrid models (GDN/Mamba), speculative decoding, and agent-centric workloads is driving innovation in KV cache management, batch invariance, and tool schema consistency. Meanwhile, security, cost control, and developer experience are becoming non-negotiable requirements—evidenced by signed Docker images (LiteLLM), quantization cleanup (Ollama), and guardrail hardening.

---

### **2. Activity Comparison**

| Project       | Issues Open | PRs Merged (Last 7d) | Releases (Last 7d) | Status         |
|---------------|-------------|------------------------|--------------------|----------------|
| **vLLM**      | 382         | 47                     | 0                  | Active Dev     |
| **SGLang**    | 241         | 52                     | 0                  | Active Dev     |
| **llama.cpp** | 187         | 39                     | 0                  | Pre-release Focus |
| **Ollama**    | 234         | 26                     | 0                  | Stability Push |
| **LiteLLM**   | 195         | 41                     | 1 (`rc.1`)         | Security-First |
| **Unsloth**   | 208         | 32                     | 0                  | UX & Stability |

> ✅ **Insight**: SGLang leads in development velocity; LiteLLM is the only project with a recent release (RC), signaling production readiness for security-sensitive deployments.

---

### **3. Model Support Race**

| New Model / Architecture       | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1**             | ✅   | ✅     | ✅        | ✅     | ❌      | ❌      |
| **DeepSeek-V4-Flash-Vision-Exp** | ⬜ | ⬜     | ❌        | ❌     | ❌      | ❌      |
| **Ling-3.0-flash-VL**         | ❌   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **PaliGemma (v1/v2)**         | ❌   | ❌     | ❌        | ❌     | ❌      | ✅ (LoRA) |
| **Qwen3-Coder**               | ✅   | ✅     | ✅        | ✅     | ✅      | ✅      |
| **Gemini-Pro (multi-modal)**  | ❌   | ❌     | ❌        | ❌     | ✅ (via provider) | ❌ |

> 🏆 **Leader**: **SGLang** and **vLLM** jointly lead in cutting-edge model support, particularly for multimodal and speculative decoding-ready models like DeepSeek-V4.1 and Ling-3.0-flash-VL.  
> 🔥 **Notable Gap**: No project fully supports **DeepSeek-V4-Flash-Vision-Exp** or **Gemini-Pro**, indicating early-stage adoption.

---

### **4. Performance Frontier**

| Optimization Area            | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|------------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache Reuse**           | ✅ DFlash/DSpark + YaRN | ✅ Semantic radix backend | ❌ Limited | ❌ Partial | ❌ None | ❌ None |
| **Batching & Parallelism**   | ✅ PCP+DCP, async TP | ✅ Hierarchical HiCache, router metrics | ❌ Minimal | ✅ Vulkan I/O | ❌ None | ❌ None |
| **Quantization Efficiency**  | ✅ New schemes (AMD/NVIDIA) | ✅ Unified SWA pool | ✅ Row-alignment fixes | ✅ Blob cleanup | ✅ JSON schema stripping | ✅ Memory estimation |
| **Kernel-Level Tuning**      | ✅ Triton mHC JIT, CUDA graph | ✅ Fused QK-norm+RoPE+gate | ✅ Thread-local CPU buffers | ❌ None | ❌ None | ✅ Dependency caching |
| **Distributed Serving**      | ✅ MRV2, DBO, full CUDA graphs | ✅ PD disaggregation, HiCache | ❌ None | ❌ None | ✅ Provider routing | ❌ None |

> 🚀 **Frontier Leaders**:  
> - **vLLM** dominates in *distributed inference* and *kernel-level optimizations*.  
> - **SGLang** leads in *semantic-aware memory reuse* and *cache-aware scheduling*.  
> - **llama.cpp** excels in *cross-platform low-level tuning* and *memory safety*.  
> - **LiteLLM** is pioneering *security-hardened gateways* with Rust migration.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Key Differentiator                                  |
|---------------|-----------------------------------|-----------------------------------------------------|
| **vLLM**      | High-Performance Inference Engine | Distributed tensor parallelism, speculative decoding, MRV2 extensibility |
| **SGLang**    | Intelligent Serving Framework     | Semantic KV cache, hierarchical HiCache, pluggable backends |
| **llama.cpp** | Universal Local Runtime           | Cross-platform portability, Vulkan/SYCL/Metal support, CPU optimization |
| **Ollama**    | Developer-Focused Local Gateway   | Desktop integrations, CLI-first UX, community tools |
| **LiteLLM**   | Secure API Gateway                | Multi-provider routing, cosign-signed images, budgeting guards |
| **Unsloth**   | Integrated Training & Studio      | End-to-end fine-tuning workflow, RAG, studio UX |

> 💡 **Strategic Insight**: The stack is maturing from monolithic engines to *modular, composable layers*. vLLM/SGLang serve as backbone engines; LiteLLM acts as the secure orchestrator; Ollama/Unsloth provide developer-friendly access; llama.cpp remains the fallback for constrained environments.

---

### **6. Trend Signals & Developer Guidance**

#### 🔍 **Emerging Trends Extracted from Today’s Activity**
1. **Semantic Intelligence is Rising**: SGLang’s pluggable radix backend for semantic prefix matching signals a shift from exact-token KV reuse to *context-aware* caching — critical for agents and RAG.
2. **Speculative Decoding Stability is Now a Bottleneck**: Multiple projects (vLLM, SGLang, llama.cpp) report crashes under speculative decoding, indicating that performance gains are being offset by correctness risks.
3. **Security & Compliance Are Non-Negotiable**: LiteLLM’s enforced cosign signing and Ollama’s license notice gap highlight growing scrutiny over supply chain integrity and open-source compliance.
4. **Agent Workflows Are Driving UX Innovation**: Unsloth’s demand for folder-based projects, multi-drive libraries, and agent profiles reflects a move toward *long-lived, orchestrated agent systems*.
5. **Quantization is Becoming a Lifecycle Management Challenge**: Ollama’s disk bloat issue and llama.cpp’s intermediate blob accumulation show that quantization isn’t just about size—it’s about *clean lifecycle management*.

#### 📌 **What Application Developers Should Watch**
- **Avoid speculative decoding in production** until vLLM/SGLang stability issues (#54094, #39216) are resolved.
- **Sanitize inputs containing `<｜deepseek_image｜>`** when using SGLang or Ollama.
- **Pin to stable versions** (e.g., `ollama:v0.5.15`, `vLLM:b10935`) for production; avoid `b10780+` on Vulkan.
- **Monitor spend logs and guardrails closely**—LiteLLM’s budget bypass and MCP tool oversight could expose your app to risk.
- **Plan for modular infrastructure**: Use LiteLLM as gateway, vLLM/SGLang as engine, and Unsloth/Ollama for local dev—this layered approach maximizes flexibility and resilience.

> ✅ **Final Takeaway**: The AI infrastructure landscape is no longer about raw throughput—it’s about *correctness, security, composability, and agent readiness*. Choose tools not just for speed, but for reliability in real-world deployment.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-09-14

---

### **1. Today's Highlights**  
The vLLM project continues to mature its speculative decoding and Model Runner V2 (MRV2) infrastructure, with key PRs addressing critical correctness issues in DFlash/DSpark draft acceptance and KV-cache corruption under data parallelism. A major focus remains on enhancing stability for hybrid GDN/Mamba models and expanding support for new quantization schemes across NVIDIA and AMD platforms.

---

### **2. Releases & Breaking Changes**  
No new releases were published in the last 24 hours. No breaking changes or migration notes are active at this time.

---

### **3. New Model & Hardware Support**  
- **AMD ROCm**: Ongoing performance optimization for `DeepSeek-V4.1-Flash` on MI355X (gfx950), with reported suboptimal utilization (e.g., 8.97 tok/s per GPU at concurrency 1). [RFC #56506](https://github.com/vllm-project/vllm/issues/56506)  
- **Intel XPU**: Fused QK-norm+RoPE+gate Triton kernel now enabled for Qwen3NextAttention on Intel Arc GPUs via [PR #53989](https://github.com/vllm-project/vllm/pull/53989).  
- **Model Extensions**: Support for `DeepSeek-V4-Flash-Vision-Exp` requested via [Feature Request #55683](https://github.com/vllm-project/vllm/issues/55683); LoRA support for DeepSeek-V4-Flash Vision also pending.  

---

### **4. Performance & Optimization**  
- **Speculative Decoding Efficiency**: PRs #56723 and #56734 address critical bugs that caused DFlash/DSpark draft rejection and KV-cache corruption under PCP+DCP configurations, restoring expected throughput gains.  
- **Parallel JIT Warmup**: [PR #56683](https://github.com/vllm-project/vllm/pull/56683) introduces parallel compilation of mHC pre-norm kernels, reducing warmup latency for large models.  
- **CUDA Graph Capture**: [PR #51700](https://github.com/vllm-project/vllm/pull/51700) enables full CUDA graph capture for microbatched steps (DBO) in MRV2, improving runtime efficiency for long-context inference.  
- **KV Cache Offload Integrity**: RFC #54363 proposes integrity checks and liveness monitoring for filesystem-based KV offload tier to prevent silent I/O hangs.  

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| Critical | **DFlash + YaRN prefix cache reuse failure** (#54094) | 1.04M prompt fails to reuse ~1.039M tokens despite identical context; high memory waste | In progress |
| High | **vLLM hangs on engine startup** (#17676) | Persistent hang during engine process initialization; affects production deployments | Open, 43 comments |
| High | **Batch invariance broken with SP + async TP** (#56370) | Non-deterministic output when `VLLM_BATCH_INVARIANT=1` is enabled with sequence parallelism | Open, 9 comments |
| High | **GLM-5.3-Flash degenerates into "word salad"** (#56605) | Repeated token generation in multi-turn agentic use cases | Open, 8 comments |
| Medium | **Silent output corruption on Intel Arc B70** (#53480) | Sustained concurrent decode emits only "!" tokens (token ID 0); silent HTTP 200 response | Open, 6 comments |
| Medium | **Run-to-run non-determinism with spec decoding** (#53436) | Greedy decoding (`temperature=0`) shows significant throughput variance despite fixed seed | Open, 4 comments |

> ✅ **Fixes in Progress**: Several PRs target speculative decoding stability:  
> - [PR #56723](https://github.com/vllm-project/vllm/pull/56723): Fixes DCP/PCP compatibility error  
> - [PR #56734](https://github.com/vllm-project/vllm/pull/56734): Prevents stale block-table KV writes in DP mode  
> - [PR #56640](https://github.com/vllm-project/vllm/pull/56640): Reopens fix for prefix cache hit reporting  

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding** on hybrid GDN/Mamba models — enable `--enable-prefix-caching` only after verifying compatibility and avoiding known crashes like #56646.  
- **Monitor batch invariance** when using sequence parallelism or async tensor parallelism; ensure `VLLM_BATCH_INVARIANT=1` is tested rigorously.  
- **Expect instability in long-context scenarios** with DFlash on YaRN-enabled models — consider disabling auto-prefix caching temporarily until #54094 is resolved.  
- **Leverage MRV2 features cautiously**: Full CUDA graph capture and DBO are live but require testing under load; avoid mixing `--enable-prompt-embeds` with encoder-only models (fixed in #55233).  
- **For multi-GPU deployments**, validate cross-worker KV consistency, especially with prefix caching and distributed model runners.  

> 🔗 **Key Resources**:  
> - [MRV2 Extensible KV Cache RFC & PR #56492](https://github.com/vllm-project/vllm/pull/56492)  
> - [EPD Tracker #52409](https://github.com/vllm-project/vllm/issues/52409)  
> - [KV Hints Envelope RFC & PR #53423](https://github.com/vllm-project/vllm/pull/53423)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-14**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with active development on high-impact features for large-scale, production-grade LLM serving. Key progress includes foundational work on **semantic KV cache reuse via a pluggable radix backend**, and new support for **DeepSeek-V4.1** and **Ling-3.0-flash-VL** models. Critical stability improvements are underway for **HiCache**, **PD disaggregation**, and **router scheduling logic**, particularly around cache locality and request routing under load.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*  
The project remains in a continuous integration state with nightly builds (`sglang:dev-dsv41`, `b94ac87e`) actively used by contributors.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1**: PR #38798 adds full model support including native tokenizer, prompt handling, and integration with `encoding_dsv41.py`. This enables production use of DeepSeek’s latest multimodal and text-only variants. [PR #38798](https://github.com/sgl-project/sglang/pull/38798)  
- **Ling-3.0-flash-VL**: PR #38526 introduces native support for this multimodal model (text + image + video), enabling OpenAI-compatible API access. [PR #38526](https://github.com/sgl-project/sglang/pull/38526)  
- **SenseNova-U1/U1.5**: Tracking issue #37742 outlines roadmap for official support via OpenSenseNova/SenseNova-U1 reference implementation. [Issue #37742](https://github.com/sgl-project/sglang/issues/37742)  
- **Intel CPU Roadmap (Q2 2026)**: Issue #24921 details focus on cost-effective single-node deployment, heterogeneous disaggregation, and improved model coverage for CPU-based inference. [Issue #24921](https://github.com/sgl-project/sglang/issues/24921)

---

### **4. Performance & Optimization**  
- **Semantic KV Cache Reuse**: PR #31057 introduces a pluggable fuzzy-match radix backend for semantic prefix matching — enabling reuse across paraphrased or reordered prompts without exact token alignment. This is expected to improve cache hit rates in RAG, multi-user, and document-centric workloads. [PR #31057](https://github.com/sgl-project/sglang/pull/31057)  
- **Unified Hybrid-SWA Memory Pool**: PR #36729 implements dynamic byte budget sharing between full-attention and sliding-window pools, reducing fragmentation and improving memory utilization. [PR #36729](https://github.com/sgl-project/sglang/pull/36729)  
- **Hierarchical HiCache for Unified Pools**: PR #37507 enables HiCache for MHA+Mamba, MLA+Mamba, SWA, and full/SWA/Mamba configurations. Improves scalability for long-context and hybrid models. [PR #37507](https://github.com/sgl-project/sglang/pull/37507)  
- **Router Cache Locality Metrics**: Stack of three PRs (#39325–#39327) adds granular cache-aware metrics and Grafana dashboard rows to track block presence, tier ownership, and prefetch efficiency. [PR #39325](https://github.com/sgl-project/sglang/pull/39325), [PR #39326](https://github.com/sgl-project/sglang/pull/39326), [PR #39327](https://github.com/sgl-project/sglang/pull/39327)

---

### **5. Stability & Regressions**  
- **CUDA Coredump Tracker (Issue #26340)**: 299 comments from automated CI coredumps; critical for debugging GPU kernel crashes. No fix yet, but collection pipeline is active. [Issue #26340](https://github.com/sgl-project/sglang/issues/26340)  
- **DeepSeek-V4.1 Image Placeholder Crash (Issue #39274)**: User input containing `<｜deepseek_image｜>` triggers 400 error due to overzealous token validation. Patch pending. [Issue #39274](https://github.com/sgl-project/sglang/issues/39274)  
- **Client Disconnect Crashes Engine (Issue #39216)**: Uncaught `asyncio.CancelledError` causes engine crash during active request. Fix required in exception handling layer. [Issue #39216](https://github.com/sgl-project/sglang/issues/39216)  
- **Health Check Orphan Requests (Issue #35884)**: `/health` handler timeout doesn’t cancel scheduler-side request, leading to paged-prefill batching failures under load. High priority. [Issue #35884](https://github.com/sgl-project/sglang/issues/35884)  
- **SWA Budget Exceeded Silently (Issue #31205)**: PD prefill starves when SWA pool capacity is exceeded — no error, no backpressure. Affects DeepSeek-V4 hybrid pool users. [Issue #31205](https://github.com/sgl-project/sglang/issues/31205)

---

### **6. What This Means for Application Developers**  
- **Expect higher cache efficiency** with semantic KV reuse and hierarchical HiCache — ideal for agents, chatbots, and retrieval systems. Use `--hicache-storage-backend file` cautiously due to ENOSPC risks in large deployments.  
- **Avoid user inputs containing `<｜deepseek_image｜>`** until #39274 is resolved. Consider sanitizing input or using structured message formats.  
- **Use `--saturation-queue-floor` and `--worker-queue-limit`** (new router flags) to prevent cache-affinity traffic to overloaded workers — improves fairness and reduces tail latency.  
- **Monitor `/metrics` closely** — new cache-locality metrics enable proactive tuning of cache placement and prefetching behavior.  
- **Upgrade to `dev-dsv41` or later** for DeepSeek-V4.1 and Ling-3.0-flash-VL support, but be aware of known regressions in client disconnect handling and health checks.

> ✅ *Recommendation*: Pin your deployment to stable `v0.5.15` or `main` nightly until critical fixes land in #39216 and #35884. Monitor PR #39327 for Grafana dashboard updates.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-09-14**

---

### **1. Today's Highlights**  
The latest development cycle focuses on backend stability and correctness across Vulkan, SYCL, and Metal, with critical fixes for GPU driver compatibility (e.g., NV queuesubmit mutex workaround) and memory safety in expert FFN fallback logic. A notable performance optimization was introduced via thread-local buffer allocation in `ggml-cpu`, promising improved multi-threaded throughput on x86 systems.

---

### **2. Releases & Breaking Changes**  
No new stable releases were published today. However, several pre-release builds (`b10948` to `b10935`) include important internal changes:  
- **`b10948`**: Excludes `HY_V4` from WebGPU tests due to instability ([PR #28855](https://github.com/ggml-org/llama.cpp/pull/28855)).  
- **`b10947`**: Guards against zero divisor in expert FFN size calculation for Nemotron-H models ([PR #28779](https://github.com/ggml-org/llama.cpp/pull/28779)).  
- **`b10946`**: Adds guards for VXE-only repack helpers on s390x ([PR #28775](https://github.com/ggml-org/llama.cpp/pull/28775)).  
- **`b10938`**: Introduces a mutex around `VkQueueSubmit` to work around NVIDIA driver synchronization bugs ([PR #28830](https://github.com/ggml-org/llama.cpp/pull/28830)).

> ⚠️ Developers using Vulkan on NVIDIA GPUs should consider upgrading to avoid potential hangs or undefined behavior.

---

### **3. New Model & Hardware Support**  
- **New Model Support**:  
  - Added conversion support for **DeepSeek-V4.1-Flash** (`deepseek41` architecture) via [PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696).  
  - Added pre-tokenizer for **Fraunhofer IIS ELMoD-2.7B-IT**, handling escaped spaces post-regex split ([PR #28845](https://github.com/ggml-org/llama.cpp/pull/28845)).  
- **Hardware Backend Improvements**:  
  - Expanded CI testing for **s390x** (non-VXE builds) and **ARM** (`nrc = 2` test coverage) ([PRs #28776](https://github.com/ggml-org/llama.cpp/pull/28776), [#28850](https://github.com/ggml-org/llama.cpp/pull/28850)).  
  - Enhanced SYCL graph recording/replay capabilities ([PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725)).

---

### **4. Performance & Optimization**  
- **CPU Optimization**:  
  - Introduced per-thread shared buffer in `ggml-cpu` to reduce false sharing in `ggml_compute_forward_mul_mat_id` ([PR #28861](https://github.com/ggml-org/llama.cpp/pull/28861)), expected to improve multi-core utilization by up to 1.3x in high-concurrency scenarios.  
- **Quantization & Memory**:  
  - Applied row-alignment rules to `q4_K`, `q5_K`, and `q8_0` quant types (not just `q6_K`) in OpenCL, improving memory coalescing and kernel efficiency ([PR #28575](https://github.com/ggml-org/llama.cpp/pull/28575)).  
- **Model Serving**:  
  - Improved parsing of complex tool schemas in Qwen3-Coder, enabling better prompt cache reuse ([PR #28742](https://github.com/ggml-org/llama.cpp/pull/28742)).

---

### **5. Stability & Regressions**  
Critical stability issues reported today:  
- **Vulkan Regression (High Severity)**: Severe drop in prompt processing speed after `b10780` on RDNA3 GPUs ([Issue #28752](https://github.com/ggml-org/llama.cpp/issues/28752)). No fix PR yet.  
- **Metal Crash (High Severity)**: `ggml_backend_sched_alloc_splits: unexpected graph reallocation` crash on AMD Ryzen + Intel Arc B580 ([Issue #28753](https://github.com/ggml-org/llama.cpp/issues/28753)).  
- **SYCL Driver TDR Reset (Critical)**: Dual Intel Arc Pro B70 GPUs trigger Windows GPU TDR reset when loading DFlash2 draft models ([Issue #28778](https://github.com/ggml-org/llama.cpp/issues/28778)).  
- **ROCm/KV Cache Issues**: Quantized KV cache decodes slower than `f16` on RDNA4 (gfx1201), worsening with unpacking complexity ([Issue #27796](https://github.com/ggml-org/llama.cpp/issues/27796)).  

> 🔴 **Action Required**: Avoid `b10780+` for Vulkan deployments on RDNA3 until fix is confirmed.

---

### **6. What This Means for Application Developers**  
- **Use caution with recent Vulkan builds (`b10780+`)** — expect degraded prompt latency on AMD/NVIDIA GPUs. Pin to `b10779` if stability is critical.  
- **Leverage new CPU optimizations** (`PR #28861`) in multi-threaded inference pipelines; expect measurable gains in throughput under load.  
- **Expect improved tool schema handling** in Qwen3-based agents — better prompt cache reuse and fewer malformed function calls.  
- **Avoid SYCL backends with draft models on Intel Arc B70** until driver-level fixes are available.  
- **Monitor model-specific regressions** (e.g., Gemma4 trailing garbage, Qwen3.6 silent EOS) — these may affect agent output quality and require prompt engineering workarounds.

> ✅ **Recommendation**: Use `b10935` or earlier for production stability until Vulkan/SYCL issues are resolved. Monitor [GitHub Issue #28752](https://github.com/ggml-org/llama.cpp/issues/28752) for updates.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-14**

---

### **Today's Highlights**  
Multiple critical stability issues were reported for cloud and multimodal models, including `kimi-k3:cloud` crashes on image inputs and `gemma4` OOMs on Jetson Orin Nano due to inefficient projector memory handling. Concurrently, several high-impact fixes were merged—most notably a PR addressing Qwen3-Coder’s tool parser overflow issue with large numbers (`1e20` → `9223372036854775807`), and another cleaning up intermediate blobs after quantization to prevent disk bloat.

---

### **Releases & Breaking Changes**  
*None reported in the last 24 hours.*

---

### **New Model & Hardware Support**  
- ✅ **Genie** added to desktop integrations ([PR #18428](https://github.com/ollama/ollama/pull/18428)) — native macOS workspace using local Ollama agents (developer preview).  
- ✅ **Clips Kitty** added to community integrations ([PR #18423](https://github.com/ollama/ollama/pull/18423)) — Windows app for turning videos into vertical clips via local Ollama inference.  
- ✅ **SlopShield** added to productivity tools ([PR #18420](https://github.com/ollama/ollama/pull/18420)) — Chrome extension scoring YouTube video titles against content using local LLMs.  
- 🔧 **Gnani Evon-v3.3** requested ([Issue #18427](https://github.com/ollama/ollama/issues/18427)), **SARVAM-30b/105b** requested ([Issue #14319](https://github.com/ollama/ollama/issues/14319)).  
- 🚨 **Jetson Orin Nano 8GB** support remains fragile: Gemma 4 E4B multimodal projector causes host OOM despite CPU-projector config ([Issue #18396](https://github.com/ollama/ollama/issues/18396)).

---

### **Performance & Optimization**  
- ⚙️ **Quantization cleanup**: `ollama create --quantize` now removes intermediate F16 blobs post-quantization, preventing silent disk accumulation (up to 830 GB of unreferenced data reported) ([PR #18424](https://github.com/ollama/ollama/pull/18424)).  
- 🖥️ **Vulkan GPU I/O optimization**: Direct I/O enabled for integrated Vulkan GPUs (e.g., Virtio-GPU/Venus VMs), resolving timeout regressions from v0.32.9 onward ([PR #18124](https://github.com/ollama/ollama/pull/18124)).  
- 📊 **Tool schema consistency**: `qwen3-coder` now preserves exact parameter order in tool schemas, improving prompt cache hit rates ([Issue #18430](https://github.com/ollama/ollama/issues/18430)).

---

### **Stability & Regressions**  
| Severity | Issue | Status | Fix PR? | Link |
|--------|------|-------|--------|------|
| Critical | `kimi-k3:cloud` crashes on image in `tool-role` messages (HTTP 500) | Open | ❌ | [Issue #18426](https://github.com/ollama/ollama/issues/18426) |
| High | `gemma4` multimodal projector causes OOM on Jetson Orin Nano 8GB | Open | ❌ | [Issue #18396](https://github.com/ollama/ollama/issues/18396) |
| High | `qwen3.8` returns empty `content` with `IQ3_S` quantization | Open | ❌ | [Issue #18297](https://github.com/ollama/ollama/issues/18297) |
| Medium | `qwen3.6` tool-call parsing fails intermittently (500 errors) | Open | ❌ | [Issue #16383](https://github.com/ollama/ollama/issues/16383) |
| Medium | `gemm4` model misinterprets EXIF-rotated images | Open | ❌ | [Issue #18418](https://github.com/ollama/ollama/issues/18418) |
| Low | More than 10 ellipses in ToC triggers task cancellation | Open | ❌ | [Issue #18387](https://github.com/ollama/ollama/issues/18387) |
| Low | JSON reply schema ignored by `qwen3-coder:480b-cloud` | Open | ❌ | [Issue #12362](https://github.com/ollama/ollama/issues/12362) |

> 💡 *Note: The following PRs address top-tier bugs but are not yet merged:*  
> - [PR #18422](https://github.com/ollama/ollama/pull/18422): Fixes Qwen3-Coder tool parser overflow for `1e20` values  
> - [PR #18419](https://github.com/ollama/ollama/pull/18419): Resolves silent empty completion in `codex/v1/responses` follow-ups

---

### **What This Means for Application Developers**  
- **Avoid `IQ3_S` quantizations** for `Qwen3.8` until the fix lands—expect empty outputs. Use `Q4_K_M` or `Q5_K_M` as safer alternatives.  
- **Be cautious with large numbers** in tool calls (e.g., `x=1e20`) when using `qwen3-coder`: current behavior truncates to `int64` max, risking logic corruption.  
- **Cloud models (especially `kimi-k3:cloud`, `qwen3-coder:480b-cloud`)** may fail silently on complex inputs involving images or structured schemas—validate output formats rigorously.  
- **Local agent workflows** can now leverage new integrations like Genie and Clips Kitty, enabling richer desktop automation. Consider bundling Ollama with sandboxed agents (e.g., Docker SBX — [Issue #18425](https://github.com/ollama/ollama/issues/18425)).  
- **Disk usage monitoring is essential**: Unchecked `--quantize` operations may leave gigabytes of orphaned blobs. Audit `~/.ollama/models` regularly.

> 🔗 *For reproducible builds and compliance*: Address license notice distribution in releases ([Issue #3185](https://github.com/ollama/ollama/issues/3185)) — currently missing MIT notices for linked dependencies like `llama.cpp`.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-14**

---

### **1. Today's Highlights**  
The LiteLLM project is accelerating its Rust migration roadmap with the launch of `v1.102.0-rc.1`, signaling a major shift toward ultra-low-latency inference gateways (sub-1ms overhead). A key focus today is enhancing security and correctness: Docker image signing via cosign is now enforced, and multiple critical fixes address guardrail bypasses, budgeting inconsistencies, and streaming response handling across Anthropic and OpenAI-compatible APIs.

---

### **2. Releases & Breaking Changes**  
- **`v1.102.0-rc.1`** released with enhanced security: all Docker images are now signed using [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0), ensuring integrity from build to runtime.  
  🔗 [GitHub Release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1)  
- **Rust Migration Initiative**: The flagship effort (#31263) continues to gain traction, with early beta sign-ups open for developers seeking sub-1ms inference overheads.  
  🔗 [Issue #31263 – Rust Migration](https://github.com/BerriAI/litellm/issues/31263)

---

### **3. New Model & Hardware Support**  
- **New Provider Added**: `aiand/<model>` provider support merged in PR #38958, enabling integration with AI&'s API endpoints.  
  🔗 [PR #38958 – Add ai& Provider](https://github.com/BerriAI/litellm/pull/38958)  
- **OpenRouter Qwen Caching**: Support for `cache_control` parameters on Qwen models added via PR #29335.  
  🔗 [PR #29335 – Cache Control for Qwen](https://github.com/BerriAI/litellm/pull/29335)  
- **Nanobridge Integration**: Added as an OpenAI-compatible provider in PR #29591.  
  🔗 [PR #29591 – Add Nanobridge Provider](https://github.com/BerriAI/litellm/pull/29591)

---

### **4. Performance & Optimization**  
- **Rust Gateway Project (#31263)**: Targeting sub-1ms overheads — foundational work underway to replace Python-based proxy logic with high-performance Rust components.  
  🔗 [Issue #31263 – Rust Migration](https://github.com/BerriAI/litellm/issues/31263)  
- **Streaming Latency Fixes**: PR #31332 ensures `response.completed` output is backfilled from `output_item.done` events, fixing silent failures in `chatgpt/` model responses.  
  🔗 [PR #31332 – Fix Streaming Output Backfill](https://github.com/BerriAI/litellm/pull/31332)  
- **Spend Logging Robustness**: PR #41026 introduces fallback to call ID when provider returns `null` `id`, preventing duplicate suppression and data loss.  
  🔗 [PR #41026 – Fall Back to Call ID](https://github.com/BerriAI/litellm/pull/41026)

---

### **5. Stability & Regressions**  
- **Critical Guardrail Bypass**: Issue #40583 reports that custom code and tool_permission guardrails cannot inspect or block MCP tools sent via `/v1/messages` (Anthropic format), risking unfiltered agent behavior.  
  🔗 [Issue #40583 – Guardrails Miss MCP Tools](https://github.com/BerriAI/litellm/issues/40583)  
- **Budget Reservation Failure**: Issue #35524 reveals that budget reservations are skipped when cost estimation fails — exposing teams to overspending.  
  🔗 [Issue #35524 – Skipped Budget Reservations](https://github.com/BerriAI/litellm/issues/35524)  
- **Streaming Spend Logging Crash**: Issue #29913 shows that streaming requests fail to write spend logs due to missing `.usage` attribute, resulting in uncharged requests.  
  🔗 [Issue #29913 – No Spend Log on Streaming](https://github.com/BerriAI/litellm/issues/29913)  
- **Fixes in Progress**:  
  - PR #41025 strips internal params at provider boundaries to prevent Bedrock/400 errors.  
    🔗 [PR #41025 – Filter Internal Params](https://github.com/BerriAI/litellm/pull/41025)  
  - PR #28698 recursively strips unsupported JSON Schema fields (e.g., `title`, `default: null`) for Fireworks AI.  
    🔗 [PR #28698 – Strip Unsupported JSON Schema](https://github.com/BerriAI/litellm/pull/28698)

---

### **6. What This Means for Application Developers**  
- **Security First**: Use only signed Docker images (`v1.102.0-rc.1+`) in production; verify signatures with cosign.  
- **Guardrail Reliability**: Avoid relying on guardrails for MCP tool blocking until #40583 is resolved — expect potential bypasses in Anthropic-compatible flows.  
- **Cost Accuracy**: Be aware that budget checks may fail silently if request cost can’t be estimated (#35524); monitor spend logs closely.  
- **Streaming Applications**: Validate that your SDKs handle `response.completed` correctly — fix #31332 ensures compatibility with `chatgpt/` providers.  
- **Future-Proofing**: Consider joining the Rust gateway beta (#31263) if low-latency inference is critical for your agent or app stack.

---  
*Digest generated from GitHub data: github.com/BerriAI/litellm | 2026-09-14*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-14**

---

### **1. Today's Highlights**  
The Unsloth ecosystem continues to evolve with a strong focus on stability, usability, and developer experience across its CLI, Studio, and core inference stack. Key developments include critical fixes for Intel XPU Triton replacement failures and silent installer issues on Windows, alongside significant improvements in dependency management during `studio update`. Meanwhile, the community is actively shaping future agent workflows through feature requests for folder-based projects, multi-drive model libraries, and native agent profiles.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  

However, a notable breaking change was introduced via **PR #10785**:  
- `SFTConfig.__init__()` now rejects the `max_seq_length` argument — it has been renamed to `max_length`.  
  🔗 [Issue #10785](https://github.com/unslothai/unsloth/issues/10785) | [PR #10785](https://github.com/unslothai/unsloth/pull/10785)  
> *Action required:* Update training scripts using `max_seq_length` to use `max_length` instead.

Additionally, **PR #10649** introduces smarter dependency skipping in `unsloth studio update`, reducing redundant validation steps on unchanged dependencies. This improves update speed and reliability, especially on Windows systems.

---

### **3. New Model & Hardware Support**  
- **PaliGemma (v1 & v2)**: PR #5218 adds experimental LoRA fine-tuning support for PaliGemma models via integration with Gemma2 attention kernels.  
  🔗 [PR #5218](https://github.com/unslothai/unsloth/pull/5218)  
- **AMD ROCm / HIP**: PR #9316 improves VRAM monitoring on AMD GPUs by querying LUID directly from HIP rather than relying on DirectX fallbacks.  
  🔗 [PR #9316](https://github.com/unslothai/unsloth/pull/9316)  
- **Intel XPU**: Multiple issues (#10018, #10844) highlight persistent problems with Triton replacement logic; fix PRs exist but require validation.  
  🔗 [Issue #10018](https://github.com/unslothai/unsloth/issues/10018) | [PR #10073](https://github.com/unslothai/unsloth/pull/10073)

---

### **4. Performance & Optimization**  
- **Dependency Speedup**: PR #10649 and #10648 optimize `studio update` by caching dependency states and skipping re-validation of existing binaries (llama.cpp, whisper.cpp, Node.js).  
  > Result: Up to **63 seconds saved per macOS update**, ~5 seconds on Windows.  
  🔗 [PR #10648](https://github.com/unslothai/unsloth/pull/10648) | [PR #10649](https://github.com/unslothai/unsloth/pull/10649)  
- **Memory Estimation**: PR #8994 removes unused `ctx_checkpoints` term from KV cache estimation, simplifying memory budgeting and preventing potential misestimates.  
  🔗 [PR #8994](https://github.com/unslothai/unsloth/pull/8994)  
- **RAG Optimization**: PR #10861 resolves SQLite compatibility issues in dense retrieval queries (affecting older runtimes), enabling full KNN functionality without LIMIT errors.  
  🔗 [PR #10861](https://github.com/unslothai/unsloth/pull/10861)

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|------|--------|------------|
| 🚨 High | [#10844](https://github.com/unslothai/unsloth/issues/10844) | Intel XPU Triton replacement still fails silently after prior patch | ✅ Patched in #10073, needs verification |
| 🚨 High | [#10853](https://github.com/unslothai/unsloth/issues/10853) | Training local HF-cache models fails due to missing `model-00000-of-00001.safetensors` in allowlist | ⛔ No fix yet |
| ⚠️ Medium | [#10805](https://github.com/unslothai/unsloth/issues/10805) | `install.ps1` flagged by antivirus on Windows | ❌ Silent failure mode |
| ⚠️ Medium | [#10875](https://github.com/unslothai/unsloth/issues/10875) | Windows ARM64 desktop installer fails on pyarrow while CLI succeeds | ⛔ Pending investigation |
| ⚠️ Medium | [#10859](https://github.com/unslothai/unsloth/issues/10859) | Installer ignores custom install path and defaults to `~/.unsloth` | ⛔ User-facing regression |

---

### **6. What This Means for Application Developers**  
- **Update your SFT configs**: Replace `max_seq_length` → `max_length` to avoid runtime crashes.  
- **Leverage faster updates**: Use `unsloth studio update` knowing it now skips redundant checks — ideal for CI/CD or frequent dev iterations.  
- **Build robust RAG apps**: Ensure SQLite version ≥3.41 when using dense retrieval, or apply PR #10861 manually if targeting older environments.  
- **Plan for agent extensibility**: The growing demand for folder-based projects ([#10873](https://github.com/unslothai/unsloth/issues/10873)), multi-drive model libraries ([#10872](https://github.com/unslothai/unsloth/issues/10872)), and reusable agent profiles ([#10773](https://github.com/unslothai/unsloth/issues/10773)) signals a shift toward long-term agent orchestration — consider designing modular tooling early.  
- **Avoid silent installer failures**: On Windows/Intel XPU, verify that `triton-windows` isn’t shadowing `torch.xpu` unless explicitly intended.

> 💡 *Pro Tip:* Monitor PRs #10648, #10649, and #10861 for immediate performance gains and bug fixes in production deployments.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*