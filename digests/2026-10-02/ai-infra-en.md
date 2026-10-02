# AI Infrastructure Digest 2026-10-02

> Generated: 2026-10-02 01:48 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-02**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of high specialization and hardware-driven optimization, with rapid convergence around next-generation GPUs (SM120/SM121 Blackwell) and hybrid architectures (Mamba/GDN, MoE). Projects are diverging in focus: vLLM and SGLang lead in low-level kernel innovation and distributed serving scalability, while llama.cpp and Ollama dominate edge and local inference. LiteLLM and Unsloth act as integrative layers, enabling cross-engine compatibility and developer productivity. A growing emphasis on security (CVEs in Ollama), stability (critical regressions across all projects), and tooling maturity signals maturation beyond pure performance benchmarks.

---

### **2. Activity Comparison**  

| Project       | Issues Open (High/Crit) | PRs (Last 24h) | Release Status | Key Activity Driver |
|---------------|--------------------------|----------------|----------------|----------------------|
| **vLLM**      | 5 (3 Critical)           | ~15            | None           | Blackwell GPU support & speculative decoding fixes |
| **SGLang**    | 5 (4 High)               | ~80            | v0.5.21        | HiCache/HiSparse + ROCm/AMD integration |
| **llama.cpp** | 4 (2 Critical)           | ~10            | None           | MTP stability & Vulkan/Adreno crash fixes |
| **Ollama**    | 5 (2 Critical)           | ~5             | None           | Proxy bypass CVE & CPU spike regression |
| **LiteLLM**   | 5 (2 Critical)           | ~7             | v1.103.2       | Security patch + streaming reliability |
| **Unsloth**   | 5 (2 Critical)           | ~12            | v0.1.902-beta  | UX polish + LoRA training performance |

> *Note: SGLang leads in community contribution velocity; vLLM and Ollama show highest severity issue density.*

---

### **3. Model Support Race**  

| New Model / Architecture     | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash**       | ✅ (SM12x) | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Qwen4Exp**                  | ✅ (SM12x) | ❌ | ✅ (MTP) | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**             | ✅ (ROCm) | ✅ | ✅ (exp.) | ❌ | ❌ | ❌ |
| **MiMo-V2.6**                 | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **GigaChat 3.5 (VLM)**        | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **System One (MLX)**          | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| **Clef**                      | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |

> 🏆 **Leaderboard**:  
> - **SGLang** leads in new model diversity and VLM support.  
> - **vLLM** leads in native Blackwell GPU readiness and advanced features like FlashInfer + speculative decoding.  
> - **Unsloth** is the only project offering full MLX + hosted API integration for Apple Silicon.

---

### **4. Performance Frontier**  

| Optimization Focus         | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Prefix Caching** | 🔥 High priority (async load, corruption fixes) | 🔥 HiCache/HiSparse, async page management | ⚠️ Sparse attention, NVFP4 issues | ❌ | ⚠️ Prompt cache breakpoints | ❌ |
| **Kernel Fusion & Low-Level Optimizations** | 🔥 Attention+RMSNorm+sigmoid_mul fusion | 🔥 AMD-specific fusions (MLA+RoPE+KV-write) | 🔥 BF16/NVFP4 compute types | ❌ | ⚠️ Indexing opt-in | 🔥 Int8 GEMM fusion |
| **Multi-GPU & Distributed Serving** | 🔥 CUDA graph capture, MTP scaling | 🔥 Unified hybrid-SWA pools, HiSparse | ❌ | ❌ | 🔥 Routing + fallback | ❌ |
| **Quantization & Mixed Precision** | 🔥 FP8, INT4/MXFP4 retention | 🔥 FP8, HiSparse | 🔥 Q2_K/Q3_K, NVFP4 | ❌ | 🔥 PII-aware presidio | 🔥 4-bit retention during LoRA |
| **Edge & Local Runtime**    | ❌ | ❌ | ✅ (OpenCL, Vulkan, Hexagon) | ✅ (mobile proxy) | ❌ | ✅ (GGUF, MLX, desktop UI) |

> 🔥 **Top Tier**: vLLM and SGLang are pushing the boundaries of kernel-level optimizations and distributed serving efficiency.  
> 💡 **Emerging Leader**: Unsloth excels in mixed-precision training and edge-friendly UX for fine-tuning.

---

### **5. Layer Positioning**  

| Project       | Primary Layer                     | Role Summary |
|---------------|------------------------------------|--------------|
| **vLLM**      | **Serving Engine (GPU-centric)**   | High-throughput, low-latency inference engine optimized for SM120/SM121; ideal for cloud-scale LLM serving. |
| **SGLang**    | **Serving Engine + Inference Framework** | Next-gen engine with HiCache/HiSparse; designed for efficient long-context and multi-GPU deployments. |
| **llama.cpp** | **Local Runtime (CPU/GPU Hybrid)** | Universal inference backend for GGUF models; strong in edge, mobile, and offline use cases. |
| **Ollama**    | **Gateway + Local Runtime**        | Developer-friendly CLI gateway with model orchestration; bridges local and remote inference. |
| **LiteLLM**   | **API Gateway / Abstraction Layer** | Unified API layer for multi-provider routing, cost tracking, and observability. |
| **Unsloth**   | **Fine-Tuning & Training Platform** | Specialized for efficient LoRA training, model editing, and agent development with rich UI. |

> 📌 **Strategic Implication**: The stack is becoming modular — developers choose engines based on deployment profile (cloud vs. edge), then layer gateways (LiteLLM) and training tools (Unsloth) atop them.

---

### **6. Trend Signals**  

#### **Key Industry Trends Extracted from Today’s Activity**:
1. **Blackwell (SM120/SM121) Is Now the Performance Benchmark**  
   vLLM and SGLang are racing to optimize for Blackwell's new capabilities (e.g., FP8, sparse attention, FlashInfer), signaling that future infrastructure must be GPU-architecture-aware.

2. **Hybrid Architectures Are Driving Stability Challenges**  
   Multiple critical bugs involve hybrid models (Mamba/GDN, MoE), indicating that complex model designs are outpacing tooling maturity — expect more regressions until composability improves.

3. **Security & Observability Are No Longer Optional**  
   The CVE in Ollama’s Go binary and LiteLLM’s supply-chain breach underscore that trust is a core infrastructure requirement. Signed releases and dependency audits are now table stakes.

4. **Tooling Is Maturing Beyond Core Inference**  
   Projects like Unsloth (Command Palette, shareable runs) and LiteLLM (spend logging, tracing) are shifting focus from raw speed to developer experience — essential for scalable agent development.

5. **Distributed Serving Is Becoming "Boring" but Essential**  
   Async KV loading, unified memory pools, and smart block management (vLLM, SGLang) suggest that the next frontier isn’t raw throughput, but reliable, observable, and fault-tolerant distributed inference.

---

### **Recommendations for Application Developers**  
- **For production-grade inference**: Use **vLLM** or **SGLang** on Blackwell GPUs with caution — avoid speculative decoding until critical bugs (#37754, #53912) are resolved.  
- **For edge/local agents**: Prefer **llama.cpp** (with `q2_K`/`q3_K`) or **Unsloth** for fine-tuned GGUFs. Avoid Vulkan on Adreno.  
- **For multi-provider workflows**: **LiteLLM** remains the safest choice for routing and cost control — upgrade immediately to v1.103.2.  
- **For agent development**: Use **Unsloth** for training and **Ollama/SGLang** for deployment, but monitor CPU spikes and proxy issues.  
- **Always validate with long contexts, high concurrency, and mixed precision** — these expose the most frequent instability gaps.

> ✅ **Final Note**: The era of “one-size-fits-all” inference is over. Choose your stack by workload, not just performance.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-02

---

### **1. Today's Highlights**  
The vLLM project continues rapid momentum in supporting next-generation hardware, with critical fixes for **SM120/SM121 (Blackwell)** GPUs and active development on the **Rust frontend**. Key progress includes stabilization of speculative decoding on DeepSeek-V4.1-Flash and performance improvements for Qwen4Exp on Blackwell, while several high-severity bugs—particularly around prefix caching, KV cache corruption, and tool call parsing—are under active investigation.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash** now has targeted support for **SM120/SM121 (RTX PRO 6000 Blackwell, DGX Spark)**, with multiple PRs addressing graph capture, sparse attention, and speculative decoding crashes ([#59689](https://github.com/vllm-project/vllm/pull/59689), [#59632](https://github.com/vllm-project/vllm/pull/59632)).  
- ✅ **Qwen4Exp** gains dedicated SM12x kernel plans to avoid fallback to slower cuBLAS WMMA kernels ([#59632](https://github.com/vllm-project/vllm/pull/59632)).  
- ✅ **GLM-5.3-Flash** receives ROCm-specific fixes for low-concurrency gibberish issues ([#59413](https://github.com/vllm-project/vllm/issues/59413), [#59704](https://github.com/vllm-project/vllm/pull/59704)).  
- 🚧 **Rust frontend** is progressing toward feature parity with Python API; experimental `VLLM_USE_RUST_FRONTEND=1` now supports core inference but lacks full tooling and API completeness ([#44280](https://github.com/vllm-project/vllm/issues/44280)).

---

### **4. Performance & Optimization**  
- 🔥 **SM120/SM121**: High-priority optimizations underway for Qwen4Exp and DeepSeek-V4.1-Flash to eliminate fallback to legacy kernels and enable CUDA graph capture ([#59632](https://github.com/vllm-project/vllm/pull/59632), [#59689](https://github.com/vllm-project/vllm/pull/59689)).  
- ⚙️ **Kernel fusion**: Active work on fusing attention + RMSNorm + sigmoid_mul + conv operations for improved throughput ([#52968](https://github.com/vllm-project/vllm/pull/52968)).  
- 💡 **Async KV loading**: PRs #59504 and #57418 introduce smarter block management to reduce zeroing races and share in-flight external-prefix loads across requests, improving decode efficiency for long-context models.  
- 📊 **Metrics visibility**: New gauges added to track async KV fetch stages, enabling better observability for distributed serving setups ([#58874](https://github.com/vllm-project/vllm/pull/58874)).

---

### **5. Stability & Regressions**  
High-severity issues reported today:  

| Issue | Severity | Status | Fix PR? | Link |
|------|---------|--------|--------|------|
| `prefix caching + MTP` corrupts output on hybrid Mamba/GDN models (`v0.28.0`) | Critical | Open | ❌ | [Issue #53912](https://github.com/vllm-project/vllm/issues/53912) |
| FlashInfer + MTP speculative decoding crashes on SM121 (GQA=16) | Critical | Open | ❌ | [Issue #37754](https://github.com/vllm-project/vllm/issues/37754) |
| Silent garbage output in Confidential Computing mode (TDX guest) | Critical | Open | ❌ | [Issue #57224](https://github.com/vllm-project/vllm/issues/57224) |
| FP8 KV cache + prefix caching truncates generation on Qwen3.5-NVFP4 | High | Open | ❌ | [Issue #47349](https://github.com/vllm-project/vllm/issues/47349) |
| Tool call parser misinterprets model quotes as real tool calls (Qwen3) | High | Open | ❌ | [Issue #58147](https://github.com/vllm-project/vllm/issues/58147) |

> Note: Several of these are platform- or model-specific regressions affecting production-grade inference stability.

---

### **6. What This Means for Application Developers**  
- **For agents & tool-calling apps**: Be cautious with `--reasoning-parser qwen3` and `tool_call_parser qwen3_coder` — known bugs may cause incorrect parsing or duplication of tool calls ([#58147](https://github.com/vllm-project/vllm/issues/58147)). Use `--enable-auto-tool-choice` carefully until fixed.  
- **For multi-GPU deployments**: If using **Blackwell (SM120/SM121)** with **speculative decoding**, avoid `FlashInfer` backend until #37754 is resolved. Prefer Triton for now.  
- **For long-context or memory-intensive models**: Monitor prefix caching behavior with hybrid architectures (e.g., Mamba/GDN); current state may truncate or corrupt outputs.  
- **For Rust integration**: The Rust frontend is stable enough for early testing but not yet production-ready; expect missing features and potential edge-case bugs ([#44280](https://github.com/vllm-project/vllm/issues/44280)).  
- **For performance tuning**: Leverage new async KV load metrics ([#58874](https://github.com/vllm-project/vllm/pull/58874)) to detect bottlenecks in disaggregated serving pipelines.

> ✅ **Actionable tip**: Use `vllm serve --config=...` only with expanded YAML paths — this bug persists ([#43252](https://github.com/vllm-project/vllm/issues/43252)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **1. Today's Highlights**  
SGLang v0.5.21 ships with 779 PRs from 227 contributors, marking a major milestone in community-driven development. The release introduces support for **DeepSeek-V4.1 Flash** and **GigaChat 3.5**, both LLM/VLM models with optimized inference paths. On the infrastructure front, significant progress is underway on **HiCache**, **HiSparse**, and **AMD ROCm** integration, with multiple low-level kernel fixes and memory management improvements landing today.

---

### **2. Releases & Breaking Changes**  
- **v0.5.21** released (GitHub: [v0.5.21](https://github.com/sgl-project/sglang/releases/tag/v0.5.21)) — includes over 779 contributions, new model support, and foundational stability work.
- No breaking API or config changes reported; backward compatibility preserved across major components.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1 Flash**: Added to SGLang’s cookbook with full autoregressive support ([link](https://docs.sglang.io/cookbook/autoregressive/DeepSeek/DeepSeek-V4_1)).
- ✅ **GigaChat 3.5**: Now supported as an LLM/VLM model via the SGLang ecosystem ([link](https://docs.sglang.io/cookbook/autoregressive/GigaChat/GigaChat-3_5)).
- 🚀 **AMD ROCm (gfx950/gfx955)**: Active development continues with multiple PRs targeting HiCache, HiSparse, and fused kernels (e.g., `fused_fp8_bmm_rope_cat_and_cache_mla`).
- 💡 **SM120 (RTX PRO 6000)**: Enhanced testing and debugging ongoing for GLM-5.3-Flash and MiMo-V2.6, particularly around FA4 attention backend crashes.
- 🔧 **Intel XPU**: A new feature proposal aims to reuse the shared Triton decode-metadata kernel in Intel’s attention backend ([PR #42112](https://github.com/sgl-project/sglang/pull/42112)).

---

### **4. Performance & Optimization**  
- **HiCache & HiSparse**: Multiple PRs focused on optimizing page layout and memory access patterns:
  - Move page-first direct pages with gather kernel on ROCm ([PR #42169](https://github.com/sgl-project/sglang/pull/42169)).
  - Bound PD HiSparse decode requests by logical KV pool size ([PR #42168](https://github.com/sgl-project/sglang/pull/42168)).
- **Kernel Fusion**: AMD-specific optimizations reduce launch overhead:
  - Fuse MLA + RoPE + KV-write for decode-sized forward modes ([PR #41533](https://github.com/sgl-project/sglang/pull/41533)).
  - Fuse per-token activation quant into RMSNorm for per-channel FP8 attention ([PR #34502](https://github.com/sgl-project/sglang/pull/34502)).
- **Memory Pooling**: Post-capture KV sizing now supports unified hybrid-SWA pools ([PR #41961](https://github.com/sgl-project/sglang/pull/41961)), improving dynamic memory allocation efficiency.

---

### **5. Stability & Regressions**  
Critical issues reported today require urgent attention:

| Issue | Severity | Status | Notes |
|------|----------|--------|-------|
| [#26340](https://github.com/sgl-project/sglang/issues/26340) CUDA Coredump Tracker | ⚠️ High | Open (321 comments) | Auto-collected from CI; affects multiple GPU configurations. Root cause unknown. |
| [#42162](https://github.com/sgl-project/sglang/issues/42162) MiMo-V2.6 crash on SM90 (H200) | ⚠️ High | Open (0 comments) | Automatic MoE runner selection leads to Triton FP8 runner misuse; reproducible on H200/B200/B300. |
| [#42012](https://github.com/sgl-project/sglang/issues/42012) GLM-5.3-Flash FA4 crash on SM120 | ⚠️ High | Open (1 comment) | Hybrid extend reshape causes CUDA-graph capture failure; only Triton backend works. |
| [#37633](https://github.com/sgl-project/sglang/issues/37633) CUDA illegal memory access under concurrency | ⚠️ High | Open (9 comments) | Reproducible at 8 concurrent requests; workaround exists but not safe. |
| [#41939](https://github.com/sgl-project/sglang/issues/41939) GLM-5.3-Flash NVFP4 loops indefinitely on B200/B300 | ⚠️ Medium | Open (1 comment) | Model enters infinite reasoning loop with no final answer output. |

> 🔍 **Note**: While several fixes are in flight (e.g., PR #42166 addresses MiniMax-M3 crashes), critical regressions remain open and impact production-grade deployments.

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding and DFLASH** — greedy mode is non-reproducible across restarts when FlashInfer autotune is enabled ([#39597](https://github.com/sgl-project/sglang/issues/39597)). Disable autotune or use deterministic settings in production.
- **Avoid `--enable-unified-memory` with post-capture KV sizing** until PR #41961 is stabilized — it may lead to memory corruption in high-throughput scenarios.
- **For AMD users**: Expect instability on ROCm with HiSparse and HiCache features — avoid experimental backends in production until further validation.
- **Model developers**: Ensure your model configs (e.g., `forget_gate.f_{a,b}_proj`) align with SGLang’s tensor naming expectations — GLM-5.3-Flash fails silently if names don’t match ([#41836](https://github.com/sgl-project/sglang/issues/41836)).
- **Agent builders**: Watch out for tool-call parsing bugs — e.g., `trinity detector` strips `<think>` tags inside arguments ([#42140](https://github.com/sgl-project/sglang/issues/42140)), and streaming outputs can be mangled with Ollama endpoints ([#42141](https://github.com/sgl-project/sglang/issues/42141)).

👉 **Actionable takeaway**: Prioritize testing with **long contexts**, **high concurrency**, and **mixed precision** (FP8/MXFP4) workflows — these expose the most frequent stability gaps. Monitor issue tracker closely for fixes related to H200/H20/B200/B300 hardware.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-02**

---

### **1. Today's Highlights**  
The latest round of updates centers on **MTP (Multi-Token Prediction) stability and performance**, with critical fixes for recurrent memory handling in `llama.cpp` and enhanced support for Qwen4Exp models. Significant progress is also visible in backend optimizations: CUDA now properly handles NVFP4 compute types and BF16 quantized models, while OpenCL gains initial support for `q2_K` and `q3_K` quantizations. A major regression in Vulkan on Qualcomm Adreno drivers has been reported, causing silent crashes with no diagnostic output.

---

### **2. Releases & Breaking Changes**  
No new stable releases were issued today. However, the following commits represent notable changes:

- **[b11332]** Fixed invalid assert in recurrent memory (`llama.c`) — addresses a crash trigger in long-running MTP sessions.  
  🔗 [PR #29799](https://github.com/ggml-org/llama.cpp/pull/29799)

- **[b11331]** Improved CUDA compute type handling for NVFP4 and enabled BF16 use when hardware supports it.  
  🔗 [PR #29173](https://github.com/ggml-org/llama.cpp/pull/29173)

- **[b11330]** Added MTP support to Qwen4Exp models via PR #29761, enabling speculative decoding on next-generation Qwen variants.  
  🔗 [PR #29761](https://github.com/ggml-org/llama.cpp/pull/29761)

> ⚠️ **Migration Note**: Users upgrading from prior versions should revalidate MTP behavior with Qwen3.8/4Exp models due to internal state cleanup and naming consistency improvements.

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen4Exp Models**: Full MTP support added via PR #29761. Enables speculative decoding on Qwen3.8-Flash-Next IQ4_XS GGUFs.  
  🔗 [PR #29761](https://github.com/ggml-org/llama.cpp/pull/29761)

- ✅ **GLM-5.3-Flash**: Experimental support merged via PR #27773; includes vision + text hybrid model compatibility.  
  🔗 [PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773)

- ✅ **OpenCL Backend**: Initial support for `q2_K` and `q3_K` matrix multiplication introduced in PR #28577.  
  🔗 [PR #28577](https://github.com/ggml-org/llama.cpp/pull/28577)

- ✅ **Hexagon (Qualcomm AI Engine)**: Skel installation pipeline updated in PR #29828 to ensure rebuilt inner skels are correctly signed and installed.  
  🔗 [PR #29828](https://github.com/ggml-org/llama.cpp/pull/29828)

---

### **4. Performance & Optimization**  
- **CUDA**: Now uses BF16 compute type for quantized models if supported by hardware, improving throughput for low-precision inference.  
  🔗 [PR #29173](https://github.com/ggml-org/llama.cpp/pull/29173)

- **CUDA**: Reduced redundant warmup calls during stable graph replay in unified-KV decode, lowering latency overhead.  
  🔗 [PR #29768](https://github.com/ggml-org/llama.cpp/pull/29768)

- **Vulkan**: Sparse flash attention now activated for quantized K/V caches (e.g., Qwen3.8-Flash-Next), avoiding dense computation over full context.  
  🔗 [PR #29639](https://github.com/ggml-org/llama.cpp/pull/29639)

- **CPU/GPU**: `ggml-cpu` now implements Kronecker product support for non-power-of-two dimensions (PR #28490), enabling more flexible tensor ops.

---

### **5. Stability & Regressions**  
Top issues reported today:

| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| 🟡 High | **Vulkan on Qualcomm Adreno driver**: Silent `SIGABRT` with no error output (`-ngl >= 1`) | Blocks deployment on mobile devices | ❌ No fix yet; reproducible on real hardware |
| 🔴 Critical | **Qwen3.6-27B-MTP outputs repeated `////` after long session** | Corrupts output in extended reasoning tasks | ❌ Unconfirmed; PR pending |
| 🔴 Critical | **CUDA: Qwen3.5-122B-A10B crashes at first request on sm_70** | Prevents usage on V100 clusters | ❌ Unconfirmed; may relate to Gated DeltaNet kernel launch |
| 🟡 Medium | **SYCL `--split-mode tensor` hangs with quantized KV cache** | Breaks multi-GPU setups | ❌ No fix yet |

> 🔍 **Critical Red Flag**: The Vulkan crash on Adreno (Issue #29786) is particularly concerning — it produces **zero logs**, making debugging nearly impossible. This affects mobile and edge deployments using Vulkan backends.

---

### **6. What This Means for Application Developers**  
- **Use MTP cautiously** with Qwen4Exp and Qwen3.6-27B models — expect potential output corruption in long sessions until fixes land.
- **Prioritize ROCm or CUDA** over Vulkan for production inference on AMD/NVIDIA GPUs; Vulkan remains unstable on Adreno and some older AMD iGPUs.
- **Leverage BF16 compute** where available (especially on newer NVIDIA cards) for faster inference with quantized models.
- **Avoid `--split-mode tensor` with SYCL or CUDA** if using quantized KV caches — known to hang or degrade performance.
- **Monitor PRs #29786 and #29783** closely — these represent showstoppers for mobile and high-end GPU workloads respectively.
- **Consider OpenCL** for embedded systems with `q2_K`/`q3_K` models — early but promising support now available.

> 💡 **Pro Tip**: For agents relying on structured output (e.g., JSON), avoid `peg-native` with `response_format.json_schema` — known to fail mid-object and return HTTP 500 (Issue #27279).

---  
*Data sourced from [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp), October 2, 2026.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-02**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand with key improvements in proxy support and model integration, addressing critical security and network constraints reported in recent releases. Notably, multiple PRs have been merged or opened to fix HTTPS proxy bypass issues in `0.35.0`, while new contributions enable System One and MLX model support. A high-severity CVE audit has also triggered urgent attention around Go binary dependencies.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, **Issue #18729** ([closed](https://github.com/ollama/ollama/issues/18729)) confirms a regression in **v0.35.0**: model pulls now bypass `HTTPS_PROXY` when downloading from Cloudflare R2, breaking enterprise firewall policies. This is being addressed via **PR #18733**, **#18730**, and **#18731** (all open), which aim to inject environment-based proxy configuration into the HTTP client layer.

---

### **3. New Model & Hardware Support**  
- ✅ **System One models** are now supported on MLX via **PR #18701** ([open](https://github.com/ollama/ollama/pull/18701)), enabling native inference for decision-only models on Apple Silicon.
- 🚀 **Clef support** added via `llama-server` through **PR #18741** ([closed](https://github.com/ollama/ollama/pull/18741)), expanding compatibility with next-gen reasoning models.
- 🔧 **MLX Error on M5 Macs** ([#14118](https://github.com/ollama/ollama/issues/14118)) persists in v0.15.5; users report Metal kernel load failure despite successful VRAM allocation (~11.9 GB).
- ⚠️ **CUDA illegal memory access** on **RTX 5090 (Blackwell)** with Cohere MoE models ([#18642](https://github.com/ollama/ollama/issues/18642)) remains unresolved — crashes during prompt evaluation under Windows 11.

---

### **4. Performance & Optimization**  
- 🔥 **CPU usage spike** on Mac Studio M4 Max: `llama-server` consuming **~560% CPU** during token generation ([#18038](https://github.com/ollama/ollama/issues/18038)). Regression traced to v0.32.14; linked to inefficient polling behavior even with GPU utilization at 100%.
- 💡 **Fix in progress**: **PR #18613** proposes passing `--poll 0` to `llama-server` when GPU is present, which could reduce idle CPU spin-waiting by up to **90%** based on prior benchmarks.
- 📉 **Container throughput collapse**: `n_threads` defaults to host core count instead of cgroup CPU quota, causing **~45x performance drop** in CPU-limited containers ([#17916](https://github.com/ollama/ollama/issues/17916)). Fix pending.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Notes |
|--------|------|--------|-------|
| Critical | CVEs in Go binary (`/usr/local/bin/ollama`) | Open [#16033](https://github.com/ollama/ollama/issues/16033) | 1 CRITICAL, 11 HIGH vulnerabilities detected in vendor deps (e.g., `buger/juli`) |
| High | CUDA crash on RTX 5090 (Blackwell) | Open [#18642](https://github.com/ollama/ollama/issues/18642) | Reproducible with Cohere MoE models on Windows |
| High | macOS MLX kernel load failure | Closed [#14118](https://github.com/ollama/ollama/issues/14118) | Still affects M5 Macs post-v0.15.5 |
| Medium | Orphaned blobs not GC’d (21GB found) | Closed [#18595](https://github.com/ollama/ollama/issues/18595) | Manual cleanup required; no automatic reclaim |
| Low | Redirect target not allowed (Cloudflare R2) | Open [#18716](https://github.com/ollama/ollama/issues/18716) | Network policy enforcement issue |

---

### **6. What This Means for Application Developers**  
- **Proxy-aware deployments** must now manually patch or downgrade until **PRs #18730–#18733** land. Use `HTTP_PROXY`/`HTTPS_PROXY` env vars explicitly in CI/enterprise setups.
- **Avoid v0.35.0** in production if you rely on `HTTPS_PROXY` — it breaks model pull workflows via Cloudflare R2.
- **GPU-heavy workloads** on newer hardware (RTX 5090, M5 Macs) may face instability; monitor for crashes and consider rolling back to v0.34.4 temporarily.
- **Containerized apps** should override `n_threads` explicitly and validate cgroup limits — current behavior ignores `cpu.max` and `cpuset`.
- **Client integrations** (e.g., SillyTavern) must handle optional parameters like `typical_p` (now removed) — expect backward-incompatible changes in upcoming releases.

> 🔗 *For real-time tracking: [GitHub Ollama Issues](https://github.com/ollama/ollama/issues) | [Pull Requests](https://github.com/ollama/ollama/pulls)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-02**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues rapid evolution with critical security and stability improvements, including the resolution of a high-severity supply-chain compromise (Issue #24518) that affected v1.82.7–v1.82.8—now fully contained. New PRs focus on enhancing MCP reliability, fixing streaming behavior across OpenAI/Vertex AI, and improving trace visibility in Lens and request logs.

---

### **2. Releases & Breaking Changes**  
- **v1.103.2** and **v1.101.4** released with verified Docker image signatures via Cosign (key from [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)).  
- **Security Note**: All prior compromised PyPI packages (v1.82.7/v1.82.8) have been removed; current releases are clean. See full timeline: [Security Townhall](https://docs.litellm.ai/blog/security-townhall-updates).  
- **Migration Impact**: The `LITELLM_BUILD_SPEND_LOGS_INDEXES` env var now controls whether SpendLogs index creation runs at boot or migration time (PR #44124).

---

### **3. New Model & Hardware Support**  
- **Gemini Live Avatar (GA)**: Added support for `avatar_config` in realtime Gemini/Vertex integration (PR #43166).  
- **Anthropic Workload Identity Federation**: New feature request (#28607) to enable OIDC JWT-bearer token exchange for secure auth.  
- **Bedrock Mantle Auth Fix**: Corrected SigV4 signing service name (`bedrock-mantle` instead of `bedrock`) (PR #44112).  

---

### **4. Performance & Optimization**  
- **Streaming Fallback Continuation**: PR #41127 enables mid-stream fallback retries for chat completions, reducing failure loss during model unavailability.  
- **Prompt Cache Efficiency**: PR #44119 preserves `prompt_cache_breakpoint` markers when bridging chat → responses, preventing cache misses in tool-calling flows.  
- **Indexing Optimization**: PR #44124 makes SpendLogs index build opt-in, reducing startup overhead on large or partitioned tables.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|-------|
| Critical | Partial generic streaming chunk causes `KeyError` due to missing fields (text, is_finished) | Open | [PR #43487](https://github.com/BerriAI/litellm/issues/43487) |
| High | `max_budget` key re-admitted after 60s idle until batch flush | Open | [PR #43732](https://github.com/BerriAI/litellm/issues/43732) |
| High | Stdio MCP services not working in UI despite correct config | Open | [PR #15560](https://github.com/BerriAI/litellm/issues/15560) |
| Medium | `previous_models` leaks cross-request data due to shared router state | Closed | [PR #24965](https://github.com/BerriAI/litellm/issues/24965) |
| Medium | `service_tier` rejected by Vertex AI with 400 for all values | Open | [PR #34914](https://github.com/BerriAI/litellm/issues/34914) |

---

### **6. What This Means for Application Developers**  
- **Security**: Upgrade immediately to v1.103.2 or later. Avoid any use of v1.82.7/v1.82.8. Verify signed images using Cosign.  
- **Reliability**: If using streaming fallbacks or long-running agent workflows, enable `mid-stream fallback continuation` (opt-in via PR #41127).  
- **Observability**: Use `LITELLM_BUILD_SPEND_LOGS_INDEXES=1` only if needed—otherwise, disable automatic indexing to avoid boot delays.  
- **Tooling**: Be cautious with overlapping PII spans in Presidio (PR #42130), and ensure `prompt_cache_breakpoint` is preserved in tool-using chains (PR #44119).  
- **Auth**: For enterprise deployments, consider enabling `GENERIC_AUTHORIZATION_PARAMS` (PR #44108) to support AD FS resource claims.

👉 Full issue list: [GitHub Issues](https://github.com/BerriAI/litellm/issues)  
👉 Latest PRs: [GitHub Pull Requests](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-02**

---

### **1. Today's Highlights**  
Unsloth v0.1.902-beta introduces a new **Command Palette** (accessible via `Cmd`) for faster navigation, shareable run settings, and clearer error reporting in Unsloth Desktop. Performance improvements include **4x faster Laya decision-making**, expanded hosted Decision API support, and continued 4-bit retention of NVFP4, INT4, and MXFP4 checkpoints during LoRA training.

---

### **2. Releases & Breaking Changes**  
- **v0.1.902-beta** ([GitHub](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta))  
  - Adds Command Palette (`Cmd`), improved UI/UX, and enhanced error visibility.  
  - 4x speedup in Laya decisions; expanded hosted Decision API support.  
  - Maintains 4-bit precision (NVFP4, INT4, MXFP4) throughout LoRA fine-tuning.  
- **v0.1.901-beta** ([GitHub](https://github.com/unslothai/unsloth/releases/tag/v0.1.901-beta))  
  - Introduced the same core UX enhancements and performance gains as v0.1.902-beta.  

> ✅ *No breaking changes to APIs or config formats reported.*

---

### **3. New Model & Hardware Support**  
- **Qwen-Image-2.1 GGUF**: Enhanced support with improved handling of text encoders and model selection via UI ([Issue #12470](https://github.com/unslothai/unsloth/issues/12470)).  
- **AMD ROCm on Windows**: Still under active debugging due to fp8 encoder download failures ([Issue #11638](https://github.com/unslothai/unsloth/issues/11638)).  
- **vLLM & SGLang Integration**: Experimental opt-in support added for multi-GPU inference, quantization, and vision models ([PR #11491](https://github.com/unslothai/unsloth/pull/11491)).  
- **MLX Backend**: Fused expert routing and norm-handoff fusions now enabled per request ([PR #12422](https://github.com/unslothai/unsloth/pull/12422)).

---

### **4. Performance & Optimization**  
- **Laya Decisions**: Accelerated by **4x** in latest beta releases ([v0.1.902-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta)).  
- **Qwen-Image-2.1 Int8 Inference**: Fused int8 GEMM with dequant epilogue yields **14–17% faster per step** on L4/A100 ([PR #12448](https://github.com/unslothai/unsloth/pull/12448)).  
- **Offload Optimization**: Caching of int8 checkpoints for 5-bit-or-below GGUF models reduces offload latency by **~2x** on 12GB/8GB GPUs ([PR #12455](https://github.com/unslothai/unsloth/pull/12455)).  
- **Tensor Split Decode**: Regression detected — decode throughput dropped to **48 t/s** (vs. 115–118 t/s pre-b10715-mix-86bd2d3) on dual RTX 5070 Ti ([Issue #12468](https://github.com/unslothai/unsloth/issues/12468)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Status | PR / Fix |
|--------|------|------------|--------|---------|
| Critical | [Issue #12468](https://github.com/unslothai/unsloth/issues/12468) | Tensor split decode up to **2.9x slower** since b10715-mix-86bd2d3 | Open | Pending investigation |
| High | [Issue #12445](https://github.com/unslothai/unsloth/issues/12445) | Qwen-Image-2.1: 1-D norm weights not dequantized in no-conversion load path | Open | Fixed in [PR #12449](https://github.com/unslothai/unsloth/pull/12449) |
| High | [Issue #12415](https://github.com/unslothai/unsloth/issues/12415) | HF quant discovery blocks offline On Device model loading | Open | Fixed in [PR #12451](https://github.com/unslothai/unsloth/pull/12451) |
| Medium | [Issue #11498](https://github.com/unslothai/unsloth/issues/11498) | AMD RX 7900 XTX GPU resets during QLoRA training on Linux | Open | No fix yet |
| Medium | [Issue #12466](https://github.com/unslothai/unsloth/issues/12466) | Xet health probe breaks diffusers/xformers via Triton stubbing | Open | Under review |

---

### **6. What This Means for Application Developers**  
- **Build faster, smarter agents**: The new Command Palette and shareable run settings streamline workflow iteration, especially in team environments.  
- **Optimize for mixed-precision inference**: Use `block_swap_layers=N` for training dense models beyond VRAM limits ([PR #11832](https://github.com/unslothai/unsloth/pull/11832)).  
- **Avoid latency traps**: Be cautious with `--split-mode tensor` on multi-GPU setups — recent builds show significant decode slowdowns ([Issue #12468](https://github.com/unslothai/unsloth/issues/12468)).  
- **Leverage new engines**: Experiment with **vLLM/SGLang** integration via Studio’s opt-in backend for scalable, multi-GPU serving ([PR #11491](https://github.com/unslothai/unsloth/pull/11491)).  
- **Ensure offline resilience**: Use local-only GGUF discovery mode when deploying in air-gapped environments ([PR #12451](https://github.com/unslothai/unsloth/pull/12451)).  

> 🔧 *For production use: Pin to stable versions until regression fixes are validated.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*