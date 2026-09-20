# AI Infrastructure Digest 2026-09-20

> Generated: 2026-09-20 00:21 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-20**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in September 2026 is characterized by rapid convergence toward hybrid, multi-modal, and speculative decoding workloads, driven by next-generation models like GLM-5.3-Flash, Qwen3-VL, Ling 3.0, and FastMTP variants. Projects are increasingly focused on performance at scale—especially for MoE, long-context, and vision-language models—while grappling with systemic stability issues around CUDA graphs, memory corruption, and distributed coordination. A clear bifurcation is emerging: high-performance serving engines (vLLM, SGLang) push the envelope in optimization, while local runtimes (llama.cpp, Unsloth) prioritize portability and low-latency deployment across diverse hardware.

---

### **2. Activity Comparison**

| Project       | Open Issues | PRs Merged (Today) | Recent Release? | Notes |
|---------------|-------------|---------------------|------------------|-------|
| **vLLM**      | 87          | 12                  | ✅ `v0.28.1rc1.dev580+g385dce36b` | Stable release; heavy focus on speculative decoding & CUDA graph stability |
| **SGLang**    | 114         | 10                  | ✅ v0.5.20       | High severity regressions in FlashInfer + MoE; core router refactoring underway |
| **llama.cpp** | 109         | 9                   | ❌ No new tag     | Critical GPU backend bugs (ROCm, CUDA); strong CPU/Metal/SYCL support |
| **Ollama**    | 167         | 7                   | ❌ No new tag     | High-severity CUDA crashes; breaking API changes in `0.34.2` |
| **LiteLLM**   | 135         | 8                   | ❌ No new tag     | Focus on bridge integrity, cost tracking, and streaming fixes |
| **Unsloth**   | 122         | 6                   | ❌ No new tag     | Multiple model loading regressions; Windows/Linux performance gap |

> *Note: Issue counts reflect open GitHub issues as of 2026-09-20 UTC. PR activity indicates active development but not necessarily stabilization.*

---

### **3. Model Support Race**

| New Model / Architecture             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash (FP8 MoE, KDA)**     | ✅ Exp. CPU via KDA | ✅ Preview (DSA + Mamba) | ✅ Full parser | ⚠️ MTP regression | ❌ | ⚠️ MTP load crash |
| **Qwen3-VL / Kimi K2.5 (Multimodal)**| 🟡 Partial ViT CUDA graphs | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Ling 3.0 (Bailing V3)**            | ❌ | ❌ | ✅ Full parser | ❌ | ❌ | ❌ |
| **Qwen3.5/3.8 FastMTP (d2t vocab)**  | ❌ | ⚠️ Work in progress | ⚠️ d2t crash | ⚠️ Regression | ❌ | ⚠️ Load abort |
| **EXL3 (ExLlamaV3) Backend**         | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ In progress |
| **ROCm + MI300X/MI355X Mixed Precision** | ✅ mxfp4 + fp8 | ⚠️ Performance penalty | ⚠️ Gated Delta Net bug | ✅ Dual runtime proposed | ❌ | ✅ Docker image enhanced |

> ✅ **Leader**: **llama.cpp** leads in raw model coverage (especially Ling 3.0), **Unsloth** in experimental backends (EXL3), **vLLM** in multimodal readiness and hybrid quantization.

---

### **4. Performance Frontier**

| Optimization Focus               | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-----------------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache Management**           | ✅ Full CUDA graphs (ViT) | ✅ HiCache staging | ⚠️ Pinned memory issues | ⚠️ MTP regression | ✅ Prompt caching UI | ❌ |
| **Batching & Prefill Optimization**| ✅ Prefill-only batch logic | ✅ PD pipeline sharing | ❌ | ❌ | ❌ | ❌ |
| **Quantization Efficiency**       | ✅ Mixed precision (ROCm) | ✅ MLA deduplication | ✅ NEON vectorization | ⚠️ MXFP4 crash | ❌ | ✅ EXL3 backend |
| **Distributed Serving**           | ✅ Speculative decoding (PIECEWISE) | ✅ PD + disaggregation | ❌ | ❌ | ❌ | ❌ |
| **Kernel-Level Optimization**     | ✅ FlashInfer autotune | ✅ TMA-staged transfers | ✅ CUDA BF16 tuning | ❌ | ❌ | ❌ |

> 🔥 **Frontier Leaders**:  
> - **vLLM** dominates in full-scale CUDA graph integration and speculative decoding efficiency.  
> - **SGLang** leads in distributed system design (HiCache, staged writes).  
> - **llama.cpp** excels in low-level kernel optimizations (CPU NEON, Metal, SYCL).

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Key Differentiator |
|---------------|------------------------------------|--------------------|
| **vLLM**      | **High-Performance Serving Engine** | Optimized for cloud-scale inference, MoE, speculative decoding, and multimodal pipelines |
| **SGLang**    | **Distributed Inference Framework** | Advanced routing, session-aware admission, cache-aware scheduling, and disaggregated decode |
| **llama.cpp** | **Local Runtime / Edge Inference** | Cross-platform, lightweight, supports CPU/GPU/Metal/SYCL — ideal for edge and agent systems |
| **Ollama**    | **Developer-Focused Gateway & CLI** | Simplified model management, OpenAI-compatible API, MLX/ROCm dual support |
| **LiteLLM**   | **API Gateway & Orchestration Layer** | Unified interface across providers, cost tracking, prompt caching, MCP security |
| **Unsloth**   | **Agent-Centric Local Runtime** | Studio UI, multiple resident GGUF models, WSL2/ROCm tooling — tailored for dev teams |

> 📊 **Strategic Insight**: The stack is maturing into a layered architecture:  
> - **Engine** (vLLM/SGLang) → **Gateway** (LiteLLM/Ollama) → **Runtime** (llama.cpp/Unsloth) → **Agent Platform** (Unsloth Studio)

---

### **6. Trend Signals**

#### **Key Industry Trends Observed**:
1. **Speculative Decoding is Maturing but Unstable**  
   - vLLM and SGLang are pushing forward with distributed speculative decoding, but multiple critical crashes (DFlash2, MoE expert parallelism) suggest it remains fragile in production.
   - Developers should **limit speculative decoding to short contexts** and monitor for state corruption.

2. **Hybrid Quantization & MoE Models Are Now Mainstream**  
   - All major projects now support FP8/MXFP4, MoE, and DSA/KDA hybrids. However, **ROCm users face 3.7x latency penalties** unless using `AITER`, indicating ongoing hardware-specific bottlenecks.

3. **Local Runtimes Are Becoming Agent Platforms**  
   - Unsloth’s Studio and llama.cpp’s Ling 3.0 support signal a shift from “inference engine” to “agent execution environment.”  
   - Expect **multi-model concurrency**, **on-device reasoning**, and **UI-driven orchestration** to dominate edge inference.

4. **API Gateways Are Becoming Security & Observability Hubs**  
   - LiteLLM’s JWT validation, audit logging, and real-time prompt cache visibility show gateways are evolving into **compliance and observability layers**, not just proxies.

5. **Breaking Changes Are Increasingly Silent**  
   - Ollama removed `typical_p` without warning; LiteLLM changed Azure AI routing behavior silently.  
   - **Application developers must adopt version pinning and strict client-side validation.**

#### **Actionable Advice for Developers**:
- **For Production Deployments**: Use **vLLM or SGLang** with pinned versions; avoid speculative decoding in long-context RAG until `full_graph` support matures.
- **For Edge/Agent Systems**: Leverage **llama.cpp + Unsloth Studio** for low-latency, multi-model inference with on-device tool use.
- **For Multi-Provider Workflows**: Use **LiteLLM** with `/metrics` and prompt caching visibility for observability and cost control.
- **Monitor Releases Closely**: Many projects are shipping silent breaking changes—verify client compatibility before upgrading.

> 🛠️ **Final Note**: The ecosystem is no longer about choosing one engine—it’s about **orchestrating layers**. Choose your stack based on **deployment context, hardware, and workflow complexity**.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-20**

---

### **1. Today's Highlights**  
The vLLM project continues to deepen its support for multimodal and hybrid models, with active development on full CUDA graph integration for ViT encoders (Issue #38175) and critical stability fixes for speculative decoding under MoE and long-context workloads. Key PRs today focus on making Elastic EP operations cancellation-safe (#57710), improving ROCm mixed-precision checkpoint handling (#57048), and enhancing structured output reliability in DiffusionGemma models (#57250).

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were introduced. The latest stable release remains `v0.28.1rc1.dev580+g385dce36b` as of this date.

---

### **3. New Model & Hardware Support**  
- **GLM-5.3-Flash (glm5next)**: Added experimental CPU backend support via KDA (Kimi Delta Attention) for GLM-5.3-Flash (`#57346`) — a major step toward enabling inference on non-GPU systems.  
- **ROCm Support**: Expanded to handle mixed mxfp4 + fp8 checkpoints on MI300X/MI355X (`#57048`), with performance tracking for gfx950/GFX1151 targets (`#57149`).  
- **Intel GPU (XPU)**: MRV2 sampler now supports XPU fused top-k/top-p sampling kernel (`#57277`).  
- **Multimodal Models**: Ongoing work to support ViT full CUDA graphs for Qwen3-VL, GLM-V, and Kimi K2.5 (`#38175`).

---

### **4. Performance & Optimization**  
- **Prefill-Only Batch Optimization**: A prefill-only batch now receives exactly the number of logit rows defined by the model state, eliminating unnecessary full passes in diffusion models (`#57416`).  
- **FlashInfer Autotune**: Fixed deadlock issue where config cache only hit on rank 0 (`#57423`).  
- **Speculative Decoding Efficiency**: Work continues on full CUDA graph support for draft chain steps (currently PIECEWISE-only; ~15–18% decode overhead) (`#45258`).  
- **ROCm Performance**: Current benchmarks show 1.7x slower short prompts and 3.7x slower 12k-token prompts when using default `ROCM_ATTN` vs. `AITER` + `ROCM_AITER_UNIFIED_ATTN` (`#56945`).  

---

### **5. Stability & Regressions**  
- **Critical Crash**: `DFlash2` spec-decode with `xgrammar` causes deterministic "Failed to advance FSM" after ~11k decode steps, leading to engine death (`#55279`).  
- **CUDA Memory Corruption**: Recurring illegal memory access on 4xB200 GPUs for GLM-5.3-Flash across unrelated kernels (KDA linear-attention, MHC TileLang, TRT-LLM fused MoE) (`#54317`).  
- **Deadlock**: FlashInfer autotune config cache deadlocks due to rank-0-only access (`#57423`).  
- **Cancelling Scale Down Corrupts State**: Task cancellation during `_commit_scale_down_elastic_ep` leaves cluster in inconsistent state without rollback (`#57691`) — fixed in PR `#57710`.  
- **Structured Output Failure**: Qwen3.6-27B tool calls fail with MTP enabled and `response_format` set (`#46249`).  

> ✅ *Fixes exist for #57691 (#57710), #57423, and #55279 is being triaged.*

---

### **6. What This Means for Application Developers**  
- **Production Deployments**: Be cautious with speculative decoding and long-context RAG pipelines (e.g., 100k+ tokens) — use `max_num_partial_prefills` limits (`#57413`) and monitor for DFlash2 instability.  
- **Multimodal Systems**: If using Qwen3-VL or Kimi K2.5, expect incomplete ViT CUDA graph support; avoid `full_graph` mode until Issue #38175 is resolved.  
- **Hybrid Quantization**: For ROCm users, ensure `VLLM_ROCM_USE_AITER=1` is set to avoid 3.7x latency penalty on long prompts (`#56945`).  
- **Structured Outputs**: Avoid `response_format` with `tool_choice: "auto"` if using Qwen3.5/3.6 — known regression (`#39929`, `#46249`).  
- **Memory Safety**: Use latest vLLM nightly builds to benefit from recent fixes to KV offloading and elastic scaling (`#57710`, `#57652`).  

👉 *Monitor GitHub issues for real-time updates on stability fixes, especially around GLM-5.3-Flash and speculative decoding.*  
[View all open issues](https://github.com/vllm-project/vllm/issues) | [PRs merged today](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-20**

---

### **1. Today's Highlights**  
The SGLang project continues to advance its high-performance inference infrastructure with significant progress in **distributed speculative decoding (PD)** and **HiCache memory management**, including new optimizations for host-device KV transfer and staged write-back under memory pressure. Critical stability fixes are underway for `DeepSeek-V4.1`, GLM-5.3-Flash, and FlashInfer autotuning behavior—particularly around MoE expert parallelism and CUDA coredumps. The core routing system is undergoing a major refactoring to enable session-aware, cache-aware, and SLO-driven admission policies.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes were published in the last 24 hours.*  
However, ongoing work on `--enable-linker-mla-dedup` (PR #39565) and `--disaggregation-decode-enable-host-receive` (PR #40238) may introduce opt-in behavioral changes in future versions for large-scale deployments.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1**: Active development via PRs #40152 (tracking) and #39700 (roadmap). Early support now available in preview branches.
- **GLM-5.3-Flash (DSA + Mamba hybrid, FP8 MoE)**: Now supported in v0.5.20; however, several backend limitations persist:
  - No usable DSA attention backend on SM121 (DGX Spark) due to TRT-LLM/TileLang/FlashInfer constraints ([#40286](https://github.com/sgl-project/sglang/issues/40286)).
  - Missing `Glm5NextDecoderLayer` strategy and silent `--enable-dp-attention` reset ([#36840](https://github.com/sgl-project/sglang/issues/36840)).
- **Diffusion Models**: Experimental support for SANA-Video eager conv fusions enabled in PR #40388, reducing latency by 12.6% on video workloads.

---

### **4. Performance & Optimization**  
- **HiCache Host-Device Transfer**: TMA-staged transfers achieve ~2× bandwidth improvement (H2D: 97 → 192 GB/s; D2H: 93 → 183 GB/s) using 4 of 152 SMs ([PR #40278](https://github.com/sgl-project/sglang/pull/40278)).
- **Unified Cache Deduplication**: MLA load deduplication reduces cross-node data transfer overhead; up to 30% faster loading on 8× H20 setups ([PR #39565](https://github.com/sgl-project/sglang/pull/39565)).
- **Memory Pool Efficiency**: Pre-allocation of HiCache staging buffers before post-capture sizing prevents OOMs caused by workspace fragmentation ([PR #40256](https://github.com/sgl-project/sglang/pull/40256)).
- **Speculative Decoding**: Refactored PD pipeline enables better resource sharing between P/D stages and improved capacity utilization under stress ([PR #40238](https://github.com/sgl-project/sglang/pull/40238)).

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix/Workaround |
|------|----------|--------|----------------|
| [#40320](https://github.com/sgl-project/sglang/issues/40320): FlashInfer autotune cache discarded on every boot under MoE EP>1 | High | Open | Bug in `_drop_diverged_autotune_cache()` — impacts startup time and performance consistency |
| [#40364](https://github.com/sgl-project/sglang/issues/40364): DP scheduler SIGQUIT kills DataParallelController instead of notifying Engine | High | Open | Risk of silent termination during graceful shutdown |
| [#40360](https://github.com/sgl-project/sglang/issues/40360): LMCache MP session leaks on pre-load-back abort | Medium | Open | Abort hook cannot safely finalize sessions; potential memory leak |
| [#40370](https://github.com/sgl-project/sglang/issues/40370): Accidental issue submission (deleted) | Low | Closed | No action needed |
| [#39125](https://github.com/sgl-project/sglang/issues/39125): DFA state explosion in JSON Schema compilation | Critical | Open | Potential DoS vector from deeply nested schemas |

> ⚠️ **Note**: Multiple issues relate to **CUDA coredumps** ([#26340](https://github.com/sgl-project/sglang/issues/26340)), indicating systemic instability in GPU kernel execution paths—likely tied to recent JIT kernel changes.

---

### **6. What This Means for Application Developers**  
- **Use `--disaggregation-decode-enable-host-receive`** if you're running decode-heavy workloads on memory-constrained GPUs; it allows offloading prefill KV to host memory under pressure.
- **Avoid `--enable-dp-attention` on GLM-5.3-Flash** until [#36840](https://github.com/sgl-project/sglang/issues/36840) is resolved—this flag currently causes silent misbehavior.
- **Monitor FlashInfer autotuning behavior** when using MoE models with expert parallelism (EP > 1); expect slower cold starts due to repeated re-tuning ([#40320](https://github.com/sgl-project/sglang/issues/40320)).
- **Validate structured outputs carefully** if using JSON Schema with deep nesting—risk of CPU hang or infinite recursion ([#39125](https://github.com/sgl-project/sglang/issues/39125)).
- **Leverage the upcoming router refactor** (PRs #39867–#40379) for advanced request routing: prefer engines with cached prefixes, reuse sessions, and enforce SLOs via bucket selection.

> 🔗 *For production use: Pin to stable releases (v0.5.20) and avoid dev builds until critical regressions are addressed.*

---  
*Digest generated from GitHub activity (2026-09-20 UTC).*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-20**

---

### **1. Today's Highlights**  
The latest updates focus on robust support for **Ling 3.0 (Bailing V3)** and its vision-language variant, including dedicated parsers and model loading. Critical fixes address GPU backend stability—especially for **Metal (Apple Silicon)** and **SYCL (Intel Arc)**—and improve memory handling across multiple backends. Performance optimizations for **CUDA** and **CPU NEON** are also advancing.

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published today. However, several PRs landed that may affect behavior:
- **`chat: add dedicated Ling 3.0 (Bailing V3) parser`** ([#28682](https://github.com/ggml-org/llama.cpp/pull/28682)) — Required for correct tool call parsing in models using pre-opened `<think>` blocks.
- **`server: improve startup log messages`** ([#29125](https://github.com/ggml-org/llama.cpp/pull/29125)) — Now clearly shows model source (`[source]` tag), HF cache path, and cache directory via `hf_cache::get_cache_dir()`.

> 🔗 [GitHub Pull Request #28682](https://github.com/ggml-org/llama.cpp/pull/28682) | [PR #29125](https://github.com/ggml-org/llama.cpp/pull/29125)

---

### **3. New Model & Hardware Support**  
- ✅ **Ling 3.0 Flash (Bailing V3)**: Full parser support added for tool use cases where `<think>` is pre-opened.
- ✅ **Ling 3.0 VL (BailingMoeV3VL)**: First support for the vision-language variant of Ling 3.0 (124B total / 5.1B active, hybrid KDA + gated MLA, 512-expert MoE). ([#29151](https://github.com/ggml-org/llama.cpp/pull/29151))
- ✅ **Qwen4Exp HC Ops**: Added support for new DSV4 HC op variants (`hc_pre` with sigmoid gate, `hc_post` with identity mixing). ([#29000](https://github.com/ggml-org/llama.cpp/pull/29000))
- ✅ **Hexagon Backend**: Enabled `I32 GET_ROWS`, `TOP_K`, and `GEGLU_QUICK` ops. ([#29116](https://github.com/ggml-org/llama.cpp/pull/29116), [#29114](https://github.com/ggml-org/llama.cpp/pull/29114), [#29113](https://github.com/ggml-org/llama.cpp/pull/29113))

---

### **4. Performance & Optimization**  
- **CUDA**: `ggml-cuda : convert contiguous tensors four elements at a time` improves BF16 prefill performance significantly. Benchmarks show gains on AMD Radeon 8060S, R9700, and RTX 5060 Ti. ([#29155](https://github.com/ggml-org/llama.cpp/pull/29155))
- **CPU (NEON)**: Added vectorized `q8_K_4x4` and `q8_K_4x8` quantization kernels for ARM64, yielding measurable speedups without altering gemm results. ([#29153](https://github.com/ggml-org/llama.cpp/pull/29153))
- **Metal**: Fixed deprecation warnings from macOS 27 SDK; improved compatibility with future Apple OS versions. ([#29136](https://github.com/ggml-org/llama.cpp/pull/29136))
- **SYCL**: Pinned memory now uses correct device context (fixes OOM errors on multi-GPU systems). ([#28895](https://github.com/ggml-org/llama.cpp/pull/28895))

---

### **5. Stability & Regressions**  
Top issues reported today:
- **🔥 High Severity**: `HIP/ROCm — fused Gated Delta Net op carries recurrent state across requests` — leads to prior prompt content being emitted verbatim in later completions. Reproduced on Qwen3.5/MoE. ([#29092](https://github.com/ggml-org/llama.cpp/issues/29092))
- **🔥 High Severity**: `Eval bug: CUDA graphs hang GPU channel (RC watchdog + Xid 8)` on RTX 5090 Laptop (sm_120); workaround: `GGML_CUDA_DISABLE_GRAPHS=1`. ([#27330](https://github.com/ggml-org/llama.cpp/issues/27330))
- **⚠️ Medium**: `SYCL dual-GPU stuck during model load` — observed on Intel Arc B60 systems. ([#27547](https://github.com/ggml-org/llama.cpp/issues/27547))
- **⚠️ Medium**: `VRAM usage increased from b10680 (SYCL backend)` — noted on Qwen3.8-27B-Q4_K_M. ([#29063](https://github.com/ggml-org/llama.cpp/issues/29063))

> 🔗 [Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092) | [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) | [Issue #27547](https://github.com/ggml-org/llama.cpp/issues/27547)

---

### **6. What This Means for Application Developers**  
- If you’re building agents using **Ling 3.0 (Bailing V3)** or **Ling 3.0 VL**, update to `master` immediately to ensure correct tool call parsing and avoid silent failures.
- For **high-performance inference on Apple Silicon**, expect better Metal stability and future-proofing due to SDK deprecation fixes.
- On **Intel Arc GPUs**, prioritize SYCL builds but monitor VRAM usage spikes and consider disabling pinned memory if encountering OOMs.
- **CUDA users on RTX 5090 laptops** should disable CUDA graphs (`GGML_CUDA_DISABLE_GRAPHS=1`) until a fix lands.
- Leverage new `--threads -1` behavior: it now auto-detects math-core count instead of defaulting to hardware concurrency, improving CPU utilization.

> 💡 Pro Tip: Use `llama-server --models-preset` with `--log-level debug` to track model sources and cache paths more transparently.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# **Ollama Digest – 2026-09-20**

---

### **1. Today's Highlights**  
Critical stability issues emerged around MTP speculative decoding regressions and CUDA kernel crashes in `gpt-oss:20b` (MXFP4), affecting high-end NVIDIA GPUs. Concurrently, multiple model-specific tool call parsing bugs were reported—particularly for Qwen3-series models—impacting agent workflows that rely on structured function calls. A key fix was merged to support `reasoning_content` in OpenAI-compatible endpoints, aligning with DeepSeek’s API contract.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases were published in the last 24 hours. However, several breaking changes are imminent:
- **`typical_p` parameter removal**: Ollama 0.34.2 silently dropped support for `typical_p`, breaking clients like SillyTavern that cannot omit it ([Issue #18542](https://github.com/ollama/ollama/issues/18542)). This may require client-side updates.
- **API field deprecation risk**: The `reasoning` field is now prioritized over `reasoning_content` in assistant messages, which could break downstream clients relying on the latter ([PR #18543](https://github.com/ollama/ollama/pull/18543)).

---

### **3. New Model & Hardware Support**  
- **MLX support added**: GLiNER-small-v2.1 now has native MLX runner support via `POST /api/extract`, enabling on-device entity extraction ([PR #18535](https://github.com/ollama/ollama/pull/18535)).
- **ROCm + CUDA dual runtime support**: A feature request proposes allowing installation of both ROCm and CUDA runtimes simultaneously on multi-GPU systems (e.g., AMD 7800XT + NVIDIA 4060 Ti) ([Issue #18545](https://github.com/ollama/ollama/issues/18545)).
- **Qwen 3.5 MoE MTP FastMTP**: Work underway to support compact draft vocabularies (`d2t` mapping) for faster speculative decoding in Qwen 3.5 MoE models ([Issue #18546](https://github.com/ollama/ollama/issues/18546)).

---

### **4. Performance & Optimization**  
- **Benchmark improvements**: Benchmarks now use packed HumanEval prompts instead of synthetic word lists, better simulating real code generation workloads ([PR #17480](https://github.com/ollama/ollama/pull/17480)).
- **Memory prediction enhancements**: PRs #18197–#18201 introduce per-device VRAM reporting and improved VRAM estimation based on head dimensions and load measurements, enabling better resource allocation decisions ([PR #18197](https://github.com/ollama/ollama/pull/18197), [PR #18201](https://github.com/ollama/ollama/pull/18201)).
- **Prometheus metrics exposure**: Optional `/metrics` endpoint available when `OLLAMA_METRICS=1`, enabling observability in Kubernetes and cloud environments ([PR #18508](https://github.com/ollama/ollama/pull/18508)).

---

### **5. Stability & Regressions**  
**High Severity**  
- **CUDA crash in `gpt-oss:20b` (MXFP4)**: Deterministic `ADD_ID` failure during short chat requests on RTX 4000 Ada GPUs ([Issue #18522](https://github.com/ollama/ollama/issues/18522)). No fix PR yet; likely tied to kernel-level tensor ops.
- **MTP speculative decoding regression**: Qwen3.8 27B shows degraded performance or hangs after 0.34.2 update ([Issue #18541](https://github.com/ollama/ollama/issues/18541)). Fix pending.

**Medium Severity**  
- **Tool call parsing failures**: Multiple models (`qwen3-coder`, `minicpm5-2b`) fail to parse tool calls when reasoning precedes them due to missing `<function=` opener tags ([Issue #18530](https://github.com/ollama/ollama/issues/18530), [PR #18538](https://github.com/ollama/ollama/pull/18538)).
- **Intel QuickSync iGPU not utilized**: Docker container fails to offload inference to Intel iGPU despite proper configuration ([Issue #18548](https://github.com/ollama/ollama/issues/18548)).
- **Model download failures**: Some users report inability to pull models in 0.34.2, though 0.34.1 works fine ([Issue #18547](https://github.com/ollama/ollama/issues/18547)).

---

### **6. What This Means for Application Developers**  
- **Avoid `typical_p`**: If using Ollama 0.34.2+, ensure your client does not pass `typical_p`. This parameter is no longer supported and will cause silent failures.
- **Update tool call handling logic**: For Qwen3-series models, expect inconsistent behavior if reasoning appears before tool calls. Use PR #18538 as a workaround until official patch.
- **Align with DeepSeek’s API contract**: Enable `reasoning_content` support in your OpenAI-compatible clients. PR #18543 ensures backward compatibility by falling back to `reasoning` when `reasoning_content` is absent.
- **Monitor GPU memory usage**: With new per-device VRAM reporting in `/api/ps`, you can now detect model placement and avoid GPU oversubscription in multi-GPU setups.
- **Prepare for MTP regressions**: If using speculative decoding with Qwen3.8 or similar models, test thoroughly under 0.34.2+; consider downgrading temporarily if instability occurs.

> 🔗 *All links lead directly to GitHub issues and PRs for traceability.*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-20**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to mature with critical fixes for rate limiting, streaming integrity, and cost accounting—especially around Anthropic’s `/v1/messages` bridge and Responses API. New UI enhancements now provide visibility into prompt caching savings and routing forecasts, while security-focused PRs improve audit logging and JWT validation for MCP gateways.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, a notable **breaking change** was introduced via [PR #42041](https://github.com/BerriAI/litellm/pull/42041): `azure_ai/gpt-5.4+` function tools with `reasoning_effort` now require use of the **Foundry Responses API**, not the standard chat path. This affects users relying on `azure_ai/gpt-6-astra` with reasoning + tool calls—migration to `responses` endpoint is required.  

> 🔗 [PR #42041: Fix Azure AI reasoning/tool bridging](https://github.com/BerriAI/litellm/pull/42041)

---

### **3. New Model & Hardware Support**  
*No new models or hardware backends added today.*  
But ongoing work includes:  
- Support for `gpt-5.6-sol` on OpenRouter (tracked in [Issue #40102](https://github.com/BerriAI/litellm/issues/40102)) — missing from `model_prices_and_context_window.json`.  
- Proposed support for **Claude Gateway** via [Feature Request #34924](https://github.com/BerriAI/litellm/issues/34924), pending integration with Anthropic’s new Apps Gateway.

---

### **4. Performance & Optimization**  
Significant optimization work landed today:  
- **Headroom guardrail efficiency**: [PR #42017](https://github.com/BerriAI/litellm/pull/42017) introduces a `min_tokens` threshold to skip compression round trips on short requests—reducing latency for low-volume chats.  
- **Prompt caching visibility**: [PR #42055](https://github.com/BerriAI/litellm/pull/42055) adds real-time tracking of prompt cache injection, usage, and net token savings in the UI.  
- **Internal user analytics**: [PR #42026](https://github.com/BerriAI/litellm/pull/42026) enables savings and auto-router usage views for internal users via JWT attribution.

---

### **5. Stability & Regressions**  
Top stability issues reported today:  
1. **Rate limiter double-counting** ([Issue #34140](https://github.com/BerriAI/litellm/issues/34140)): Per-team per-model limits are enforced at half the configured RPM/TPM due to double counting. *Fix PR pending.*  
2. **Streaming null loss in Responses API** ([Issue #41972](https://github.com/BerriAI/litellm/issues/41972)): Null values are dropped during stream serialization, breaking downstream consumers expecting full frame fidelity. Fixed by [PR #41983](https://github.com/BerriAI/litellm/pull/41983).  
3. **Incorrect cost tracking for Bedrock cross-region models** ([Issue #30768](https://github.com/BerriAI/litellm/issues/30768)): Pricing data misaligned for regional inference profiles like `us.anthropic.claude-sonnet-4-6`.  
4. **Guardrails fail to block MCP tools in Anthropic `/v1/messages` format** ([Issue #40583](https://github.com/BerriAI/litellm/issues/40583)): Pre-call guardrails cannot inspect or block MCP tools sent via Anthropic-compatible endpoints.

---

### **6. What This Means for Application Developers**  
- **Avoid `sk-1234` as master key**: [PR #42011](https://github.com/BerriAI/litellm/pull/42011) removes hardcoded keys from examples—always load `LITELLM_MASTER_KEY` from environment.  
- **Verify cost tracking** if using Bedrock cross-region models or DeepSeek V4 Flash pricing—data may be stale ([Issue #37255](https://github.com/BerriAI/litellm/issues/37255)).  
- **Use Responses API for gpt-5.4+ with reasoning + tools** on Azure AI—standard `azure/` paths will fail.  
- **Monitor streaming output** if using `/v1/responses`—null fields may be silently stripped unless patched via [PR #41983](https://github.com/BerriAI/litellm/pull/41983).  
- **Enable fine-grained observability** with new UI features: track prompt caching savings ([#42055](https://github.com/BerriAI/litellm/pull/42055)) and routing forecasts ([#42057](https://github.com/BerriAI/litellm/pull/42057)).

> 🛠️ **Actionable Tip**: If you're running an MCP-enabled proxy, ensure your gateway JWTs are validated against live regression tests ([PR #42032](https://github.com/BerriAI/litellm/pull/42032), [#42050](https://github.com/BerriAI/litellm/pull/42050)).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-20**

---

### **1. Today's Highlights**  
The Unsloth ecosystem continues to expand its support for advanced inference backends and multi-GPU/MoE workflows, with key PRs enabling **multiple resident GGUF models** in Studio (PR #10876) and improvements to **Windows performance and stability** (PR #11336). Critical bugs around model loading (Qwen3.8-Flash-Next MTP aborts, PR #11143) and GGUF compatibility (Qwen 3.5 FastMTP d2t crash, PR #11335) were reported, highlighting ongoing challenges with cutting-edge quantized models.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
- **Note**: The `huggingface_hub` dependency was upgraded to version 1.32 in recent builds (via PR #11301), which may affect model revision attestation and resume behavior for older training runs.

---

### **3. New Model & Hardware Support**  
- ✅ **Multiple resident GGUF models** now supported in Studio (PR #10876): Each model runs in an isolated `LlamaCppBackend`, enabling concurrent inference without reloads.  
- 🚀 **ROCm Docker image enhancements**:  
  - PR #11218: Adds **Unsloth Studio UI** to `unsloth/unsloth-rocm` (previously training-only).  
  - PR #11286: Ships **JupyterLab + notebooks + sshd + supervisord**, matching CUDA image parity.  
  - PR #11212: Enables **WSL2 GPU access via DXG bridge** (`/dev/dxg`) — critical for AMD users on Windows.  
- 🔮 **EXL3 (ExLlamaV3) backend in progress**: PR #7115 adds support for 2/3/4/6/8-bit quantization and MoE models — a major step toward memory-efficient, high-performance inference.

---

### **4. Performance & Optimization**  
- **Throughput & Memory Efficiency**:  
  - EXL3 backend (PR #7115) promises lower memory footprint than bitsandbytes, especially for MoE models.  
  - Multiple resident models (PR #10876) reduce cold-start latency by avoiding repeated load cycles.  
- **Multi-GPU & CPU Offload**:  
  - PR #11330 reports a regression where `--tensor-split` flags are stripped during inference, causing OOM on MoE models with CPU offload — a critical issue for large-scale deployments.  
- **Windows vs Linux Performance**:  
  - PR #11336 highlights a **significant performance gap** between Windows and Linux desktop versions, likely due to driver or runtime differences.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| ⚠️ High | [Bug] Qwen3.8-Flash-Next MTP aborts at load | `nextn.hc_head_norm` dimension mismatch post-rebase (PR #11143) | Open |
| ⚠️ High | [Bug] Qwen 3.5 FastMTP d2t crashes llama.cpp | Vocabulary dim mismatch during GGUF load (PR #11335) | Open |
| ⚠️ Medium | [Bug] Studio strips `--tensor-split` flag | Causes OOM on multi-GPU MoE with CPU offload (PR #11330) | Open |
| ⚠️ Medium | [Bug] "Review plan" inert until reload | Deep Research UI freezes until refresh (PR #10676) | Open |
| ⚠️ Low | [Bug] Windows Desktop much slower than Linux | Performance regression observed on Windows (PR #11336) | Open |

> 🔗 *All issues linked in GitHub: [Issue #11143](https://github.com/unslothai/unsloth/issues/11143), [Issue #11335](https://github.com/unslothai/unsloth/issues/11335), etc.*

---

### **6. What This Means for Application Developers**  
- **Avoid `--tensor-split` in current Studio builds** if using MoE models with CPU offload — use command-line `unsloth run` or wait for fix (PR #11330).  
- **Use native CLI or direct API calls** for Qwen3.8/3.5 FastMTP models until `d2t` and MTP loading bugs are resolved.  
- **Leverage multiple resident GGUF models** (Studio v1.7+) for low-latency agent orchestration across different model variants.  
- **AMD/ROCm developers**: Use the updated `unsloth/unsloth-rocm` image with JupyterLab and WSL2 support for full-stack development.  
- **Plan for EXL3 integration**: Monitor PR #7115 for early access to 2–8-bit MoE quantization with better memory efficiency.

> 💡 Pro tip: For production inference, prefer `unsloth run` over Studio until regressions are patched.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*