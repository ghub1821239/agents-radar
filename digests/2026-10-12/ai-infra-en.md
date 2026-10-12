# AI Infrastructure Digest 2026-10-12

> Generated: 2026-10-12 01:44 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

---

### **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-12**

---

#### **1. Ecosystem Overview**  
The AI infrastructure landscape in Q4 2026 is defined by the convergence of next-gen hardware (Blackwell SM120), MoE and hybrid model proliferation, and growing demand for production-grade inference stability. Projects are increasingly focused on end-to-end performance at scale—particularly around speculative decoding, KV cache efficiency, and kernel-level optimizations—while maintaining backward compatibility across diverse backends. The emergence of first-class support for multimodal models (Qwen3-Omni, Gemma-4 MM), diffusion workflows, and decision-making agents signals a shift toward full-stack generative applications. Critical stability issues persist, especially in distributed environments and edge deployments, underscoring that performance gains must be matched with robustness.

---

#### **2. Activity Comparison**

| Project       | Open Issues | Open PRs | Release Status       | Key Notes |
|---------------|-------------|----------|------------------------|---------|
| **vLLM**      | 87          | 142      | No new releases        | High focus on Blackwell GPU stability; critical CUDA graph and prefix cache bugs |
| **SGLang**    | 93          | 105      | No new releases        | Heavy emphasis on SM120 validation; high-severity crashes in diffusion & Mamba |
| **llama.cpp** | 96          | 134      | No tagged release      | Strong OpenCL/Vulkan expansion; multiple backend regressions on AMD/RDNA1 |
| **Ollama**    | 102         | 88       | No new releases        | Stability-focused; top-tier tool call and streaming issues on macOS/Windows |
| **LiteLLM**   | 78          | 111      | v1.106.0-rc.1 released | Stable API; strong Rust integration and cost routing improvements |
| **Unsloth**   | 84          | 120      | No new releases        | Training optimization push; Apple Silicon and Windows memory leaks |

> ✅ *LiteLLM leads in release velocity; vLLM and SGLang dominate in issue volume due to low-level hardware stress testing.*

---

#### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------------------|------|--------|-----------|--------|---------|---------|
| **Glm4MoeLitePlusPlus** (ZCE) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **DeepSeek-V4.1-Flash** | ✅ | ✅ (prod on 8× RTX PRO 6000) | ❌ | ❌ | ❌ | ❌ |
| **Qwen3-Omni** (audio+vision) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **H2O-Lightning-4B** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Prism Bonsai 2 27B** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Gemma-4 E2B/E4B (OpenCL)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1 (GGUF)** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **DeepSeek-OCR & DeepSeek-OCR-2** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **ai& provider** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

> 🏆 **Winner: llama.cpp** — leads in raw model diversity and cross-platform runtime support, especially in GGUF-based multimodal and decision models.  
> 🥈 **Runner-up: Unsloth** — strongest in vision-language and diffusion model classification and training support.  
> 🥉 **Third: LiteLLM** — fastest adopter of new providers (`ai&`) and improved translation fidelity.

---

#### **4. Performance Frontier**

| Focus Area               | vLLM                          | SGLang                        | llama.cpp                     | Ollama                | LiteLLM                    | Unsloth                      |
|--------------------------|-------------------------------|-------------------------------|-------------------------------|-----------------------|----------------------------|------------------------------|
| **KV Cache Efficiency**  | ✅ Pooled bytes per request   | ⚠️ Mamba cache eviction       | ❌ (OOM on Vulkan)            | ⚠️ Hybrid pinning     | ⚠️ Cost-routing affinity   | ✅ Unified preemption pool   |
| **Batching & Throughput**| ⚠️ Low decode on SM120        | ✅ Prefill optimization       | ✅ GDN fusion                 | ⚠️ Streaming hangs    | ✅ Session-affinity yield  | ✅ Batched grad copy (DDP)   |
| **Quantization**         | ✅ FP8 only (no INT8)         | ❌ FA4 crash on GLM-5.3        | ✅ Mixed precision support    | ❌ MLX panic          | ✅ Native Rust caching     | ✅ LoRA-GA block-wise layout |
| **Distributed Serving**  | ⚠️ CUDA graph deadlocks       | ✅ Diffusion warmup control   | ⚠️ RPC crashes (MoE)          | ❌ Multi-GPU misaligned | ✅ Cost-based routing      | ✅ DDP batched gradient sync |
| **Kernel Optimization**  | ✅ ROCm MLA normalization     | ✅ Triton + mHC SP fusion     | ✅ OpenCL GDN write-back      | ❌ SDPA thread overflow | ✅ Async hook offloading   | ✅ Metal core pinning        |

> 🔥 **Top Performers**:  
> - **vLLM** dominates in kernel-level attention optimizations (ROCm, SM120).  
> - **Unsloth** leads in distributed training efficiency via `batched_grad_copy`.  
> - **liteLLM** excels in async orchestration and session-aware load balancing.

---

#### **5. Layer Positioning**

| Project       | Primary Layer             | Role Summary |
|---------------|----------------------------|------------|
| **vLLM**      | **Inference Engine**       | High-throughput, low-latency serving engine optimized for modern GPUs; deep kernel integration. |
| **SGLang**    | **Inference Engine + Gateway** | Full-stack inference platform with built-in spec-decoding, diffusion support, and client-facing APIs. |
| **llama.cpp** | **Local Runtime / Edge Engine** | Cross-platform, self-contained inference runtime ideal for embedded, mobile, and heterogeneous devices. |
| **Ollama**    | **Gateway / Local Dev Platform** | Developer-first gateway with CLI, REST API, and agent scaffolding; abstracts backend complexity. |
| **LiteLLM**   | **LLM Gateway / Orchestration Layer** | Universal API proxy enabling multi-provider routing, cost control, and standardized response handling. |
| **Unsloth**   | **Fine-tuning & Training Framework** | End-to-end training accelerator with advanced LoRA, MoE, and vision-language support. |

> 💡 **Strategic Insight**:  
> - **Engine layer**: vLLM, SGLang (for cloud-scale).  
> - **Runtime layer**: llama.cpp (for edge/low-power).  
> - **Gateway layer**: Ollama, LiteLLM (for abstraction and portability).  
> - **Training layer**: Unsloth (for rapid fine-tuning).

---

#### **6. Trend Signals**

- **Hardware-First Development**: All projects now prioritize **SM120 (Blackwell)** readiness—especially vLLM, SGLang, and llama.cpp—indicating that next-gen GPUs are no longer optional for production inference.
  
- **MoE & Hybrid Models Are Mainstream**: Support for MoE variants (e.g., Glm4MoeLitePlusPlus, DeepSeek-V4.1-Flash) is accelerating, but so are stability risks (e.g., CUDA graph deadlocks, incorrect LoRA layouts). Developers must validate MoE workflows carefully.

- **Edge and Heterogeneous Backends Matter**: OpenCL (Qualcomm), Vulkan (AMD), SYCL (Intel), and Metal (Apple) are gaining traction—highlighting the need for **cross-backend portability** in deployment stacks.

- **Rust-Native Integration Is Emerging**: LiteLLM’s use of Rust bridges and unsloth’s async refinements signal a move toward **lower-latency, higher-reliability inference pipelines**—critical for real-time agent systems.

- **Stability Over Features**: Despite rapid feature growth, **crash rates and silent data loss** remain top concerns (e.g., tool call precision, streaming hangs, OOMs). This suggests a maturity phase where reliability trumps novelty.

> ✅ **What Application Developers Should Watch**:
> - Avoid `v0.30+` if using DFlash/DSpark + Qwen3.8 with prefix caching (vLLM).
> - Use `--attention-backend triton` for GLM-5.3-Flash on SM120 (SGLang).
> - Prefer `--load-mode mmap` on AMD RDNA1 GPUs (llama.cpp).
> - Monitor `OLLAMA_NUM_PARALLEL` behavior—hybrid models may ignore it (Ollama).
> - Upgrade to `liteLLM v1.105+` for better tool call fidelity and cost tracking.
> - Use `UNSLOTH_DDP_BATCHED_GRAD_COPY=1` for large-scale training throughput.

---

> **Final Takeaway**: The AI infrastructure stack is maturing rapidly—but not uniformly. While performance frontiers are being pushed aggressively, **stability, portability, and developer experience** remain the true differentiators. Choose your stack based on your target deployment environment, model complexity, and tolerance for edge-case risk.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-12**

#### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance on next-gen Blackwell (SM120) hardware, with critical fixes for speculative decoding corruption in DFlash/DSpark workflows and ongoing work to resolve CUDA graph deadlocks under tensor parallelism. A major architectural shift is underway: cascade attention is being removed entirely from the codebase due to low usage and maintenance overhead.

#### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes announced.

#### **3. New Model & Hardware Support**  
- **Model Support**: Added support for `Glm4MoeLitePlusPlus` (ZEDA-GLM-4.7-Flash-Dynamic), a MoE variant with Zero-Compute Experts (ZCE). PR [#57274](https://github.com/vllm-project/vllm/pull/57274).  
- **Hardware Backends**:  
  - ROCm: New fused kernel for Qwen3-Next/Qwen3.5 (`fused_qk_rmsnorm_rope_gate`) now enabled via `VLLM_ROCM_ENABLE_FUSED_QK_NORM=1`. PR [#51406](https://github.com/vllm-project/vllm/pull/51406).  
  - Intel GPU: Updated UMD to version 26.35. PR [#60980](https://github.com/vllm-project/vllm/pull/60980).  
- **Quantization**: FP8 remains the only supported KV cache quant format; INT8 request (#33480) remains open but unimplemented.

#### **4. Performance & Optimization**  
- **Throughput**: DeepSeek-V4.1-Flash shows extremely low decode throughput on SM120 with `--enforce-eager`, and CUDA graphs are unusable—urgent fix needed. Issue #56892.  
- **Memory Efficiency**: PR [#60996](https://github.com/vllm-project/vllm/pull/60996) reworks packed KV cache group sizing to use *pooled bytes per request* instead of layer padding, improving memory utilization in multi-model scenarios.  
- **Kernel Optimization**: ROCm MLA now normalizes FlashAttention LSE layout to `[num_heads, num_query_tokens]`, fixing chunked-prefill failures. PR [#60822](https://github.com/vllm-project/vllm/pull/60822).  
- **MoE Fusion**: AMD adds opt-in fusion of shared experts into AITER MegaMoE for DeepSeek-V4. PR [#61004](https://github.com/vllm-project/vllm/pull/61004).

#### **5. Stability & Regressions**  
- **Critical**: [Bug #60174](https://github.com/vllm-project/vllm/issues/60174): Prefix caching corrupts output after cache hit on Qwen3.8-27B with DFlash2/DSpark + TP=1 on v0.30/0.31. Fixed in v0.29, but regression persists in newer versions.  
- **High Severity**: [Bug #60845](https://github.com/vllm-project/vllm/issues/60845): CUDA graph deadlock occurs with fully-sharded LoRA on Qwen3.5-compatible MoE models under TP=2/4. Reproducible and intermittent.  
- **Medium**: [Bug #57032](https://github.com/vllm-project/vllm/issues/57032): Drafter KV group not identified in `dflash` mode → prefix-cache reuse silently disabled for Mamba groups.  
- **Low/Memory**: [Bug #61045](https://github.com/vllm-project/vllm/issues/61045): Gemma 4 encoder CUDA graph capture allocates 38.5 GiB at `--max-num-batched-tokens 4096`, causing OOM.  

> ✅ **Fixes in Progress**: PRs exist for key issues including PR [#60569](https://github.com/vllm-project/vllm/pull/60569) (PP stage empty KV allocation), PR [#60770](https://github.com/vllm-project/vllm/pull/60770) (tool call newline parsing), and PR [#60822](https://github.com/vllm-project/vllm/pull/60822) (ROCm LSE layout).

#### **6. What This Means for Application Developers**  
- **Avoid v0.30+** if using DFlash/DSpark with Qwen3.8-27B and prefix caching—use v0.29 until #60174 is resolved.  
- **Enable `VLLM_ROCM_AITER_MEGA_MOE_FUSE_SHARED_EXPERTS=1`** for better DeepSeek-V4 MoE performance on ROCm.  
- **Monitor CUDA graph behavior** closely on Blackwell GPUs—especially with `--enforce-eager` or complex MoE/Lora setups.  
- **Use `--max-num-batched-tokens` cautiously** with long-context models (e.g., Gemma 4 encoder) due to memory explosion risks.  
- **Prepare for cascade attention removal**: update any custom logic relying on it (now hard-disabled by default). See PR [#61126](https://github.com/vllm-project/vllm/pull/61126).

---  
*Data source: [vllm-project/vllm GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-12**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature in support for **Blackwell-era hardware (SM120)**, with critical field reports confirming production readiness of *DeepSeek-V4.1-Flash* on 8× RTX PRO 6000 (PCIe-only). Performance optimization remains front-and-center, particularly around speculative decoding and kernel-level fixes for SM120-specific crashes. Major stability work is underway for diffusion serving and Mamba cache eviction logic, with several high-impact bugs reported.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking API/config changes were released.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash**: Confirmed working in production on **8× RTX PRO 6000 (SM120, PCIe-only)** — only viable topology identified so far (Issue #40877).  
- ✅ **GLM-5.3-Flash**: Verified functional on SM120, though **FA4 attention backend fails during CUDA graph capture**; **Triton is currently the only stable path** (Issue #42012).  
- 🔧 **AMD/ROCm Support**: Continued progress on HIP/ROCm integration, including SWA prefix reuse for DeepSeek-V4 (Issue #34562), and improved Triton kernel dispatching (PR #35685).

---

### **4. Performance & Optimization**  
- 🚀 **SM120 Performance Optimization Plan** (#19637): High-priority initiative targeting end-to-end performance uplift across models like DeepSeek V4, V4 Flash, and DeepGEMM MQA Indexer.  
- ⚙️ **Prefill Optimization Focus**: Active refactoring for DeepSeek-V4.1 includes mHC SP + engram fusion (#43065) and `q_rope_store` folding into `fused_q_norm_rope` (#41657).  
- 💾 **Memory Efficiency**: PR #38086 replaces fixed FP4 indexer logits slab with adaptive workspace to reduce idle memory waste on AMD devices.  
- 📈 **Diffusion Serving**: PR #43414 introduces configurable warmup preload margin and components, enabling fine-tuned memory budgeting for ComfyUI workflows.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🔴 Critical | [Bug] `AssertionError: Can not alloc mamba cache` kills engine (#43204) | Cache allocation failure under locked state triggers scheduler crash and request loss. | ❌ Open |
| 🔴 Critical | [Bug] Gemma-4 MM: non-RGB image crashes vision tower (#26751) | Grayscale/RGBA JPEGs cause pod restart and batch drop due to two stacked bugs in channel guard. | ❌ Open |
| 🟡 High | [Bug] GLM-5.3-Flash FA4 crashes at CUDA-graph capture (#42012) | Hybrid extend reshape failure forces fallback to slower Triton backend. | ❌ Open |
| 🟡 High | [Bug] DeepSeek-V4.1-Flash + DSPARK: unbounded SparsePrefillWorkspace OOM (#41076) | Uncontrolled memory growth leads to TP group crash. | ❌ Open |
| 🟡 Medium | [Bug] FluxAdapter silently drops Kontext ref_latents and ControlNet (#43488) | Named kwargs from ComfyUI lost during packing, breaking advanced control flow. | ❌ Closed (but not resolved) |

---

### **6. What This Means for Application Developers**  
- **Deployments on SM120 (RTX PRO 6000)**: Use **Triton backend** for GLM-5.3-Flash and avoid FA4 until issue #42012 is resolved. Test configurations thoroughly — only specific topologies are stable.  
- **Multimodal Apps**: Avoid non-RGB images with Gemma-4 MM until #26751 is patched; consider preprocessing upstream.  
- **Diffusion Workflows**: Configure warmup preload via `--warmup-preload-margin` and component selection (via PR #43414) to avoid silent OOMs.  
- **Mamba Models**: Be cautious with long-running sessions — cache eviction may trigger hard crashes if slots are fully locked (#43204). Monitor for `cached_token` failures.  
- **Speculative Decoding**: Ensure target probability > 0 to prevent invalid draft acceptance (fixed in PR #35788).  

> 💡 **Pro Tip**: For production inference on Blackwell GPUs, pin your deployment to `v0.5.21` or later and use `--attention-backend triton` unless otherwise validated. Track #19637 and #40877 for real-world SM120 tuning guidance.

🔗 [GitHub Issues](https://github.com/sgl-project/sglang/issues) | [PRs](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-12**

---

### **1. Today's Highlights**  
The latest updates focus on expanding **OpenCL and Vulkan backend capabilities**, particularly for **Gemma-4 E2B/E4B models** and **Prism Bonsai 2 27B**, with performance optimizations in GDN (gated delta-net) handling. Critical fixes address GPU memory limits, kernel launch stability, and RPC debugging, while new model support enables advanced multimodal inference via Qwen3-Omni and H2O-Lightning-4B.

---

### **2. Releases & Breaking Changes**  
No new tagged releases today. However:  
- `GGML_RPC_DEBUG` is now a verbosity-level flag (0–3), enabling granular debug logging for remote inference workflows ([PR #29544](https://github.com/ggml-org/llama.cpp/pull/29544)).  
- `--n-cpu-mode` FFN band selection is now configurable via `--n-cpu-ffn`, improving CPU offload flexibility ([Issue #27987](https://github.com/ggml-org/llama.cpp/issues/27987)).

---

### **3. New Model & Hardware Support**  
- ✅ **Prism Bonsai 2 27B**: Full runtime support added, including Hadamard tensor folding and weight conversion fixes ([PR #29600](https://github.com/ggml-org/llama.cpp/pull/29600)).  
- ✅ **Qwen3-Omni (audio + vision)**: Added support for audio frame counting, last-chunk padding, deepstack, and mmproj tensor naming ([PRs #30352–#30356](https://github.com/ggml-org/llama.cpp/pulls?query=author%3AWestWaters+is%3Aclosed)).  
- ✅ **H2O-Lightning-4B**: Decision-type model now served directly via `/v1/systemone` without Python shim ([PR #30361](https://github.com/ggml-org/llama.cpp/pull/30361)).  
- ✅ **SenseNova U1**: Text-to-text, image-to-text, and multimodal generation support added ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919)).  
- ✅ **Ouro (Looped LM)**: Supports ByteDance’s 1.4B/2.6B looped language models with shared weights ([PR #29823](https://github.com/ggml-org/llama.cpp/pull/29823)).

**Hardware Backends**:  
- OpenCL: Gemma-4 E2B/E4B GPU decode enabled on Qualcomm Adreno devices ([PR #30266](https://github.com/ggml-org/llama.cpp/pull/30266)).  
- Vulkan: Optimized row ID hoisting in `mul_mat_id` for expert models ([PR #29998](https://github.com/ggml-org/llama.cpp/pull/29998)).  
- SYCL: Added `set_tensor_2d` for faster tensor-split loading ([PR #30358](https://github.com/ggml-org/llama.cpp/pull/30358)).

---

### **4. Performance & Optimization**  
- **OpenCL GDN Optimization**: Direct writing of gated_delta_net states into recurrent cache reduces redundant copies during decode — improves throughput on long sequences ([PRs #30359](https://github.com/ggml-org/llama.cpp/pull/30359), [#30360](https://github.com/ggml-org/llama.cpp/pull/30360)).  
- **Vulkan Prepass Optimization**: Eliminates looping over duplicate `mul_mat_id` entries by hoisting them early — critical for MoE models with repeated expert IDs ([PR #29998](https://github.com/ggml-org/llama.cpp/pull/29998)).  
- **SYCL Tensor Loading**: `set_tensor_2d` implementation cuts overhead in tensor-split mode (`-sm tensor`) by batching uploads ([PR #30358](https://github.com/ggml-org/llama.cpp/pull/30358)).  
- **RPC Debug Logging**: Enhanced traceability via verbosity levels aids in diagnosing latency and communication issues in distributed setups ([PR #29544](https://github.com/ggml-org/llama.cpp/pull/29544)).

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Notes |
|------|----------|--------|-------|
| [Issue #30091](https://github.com/ggml-org/llama.cpp/issues/30091) | High | Bug-unconfirmed | Crashes due to "bad allocation" during long conversations on HIP backend. Reproducible with Qwen3.8-27B-IQ3_S. |
| [Issue #30039](https://github.com/ggml-org/llama.cpp/issues/30039) | High | Bug-unconfirmed | ~45% prompt processing regression on RDNA1 (gfx1010) between b10455 and b11429. Affected GDN-hybrid model. |
| [Issue #30052](https://github.com/ggml-org/llama.cpp/issues/30052) | Critical | Bug-unconfirmed | RPC server crashes during warmup decode with large MoE models (e.g., DeepSeek-R1-671B) across GB10 nodes. |
| [Issue #27360](https://github.com/ggml-org/llama.cpp/issues/27360) | Medium | Bug-unconfirmed | Vulkan/RADV Radeon 680M OOM/device loss with `--load-mode auto` on large Gemma models; `mmap` avoids it. |
| [Issue #30256](https://github.com/ggml-org/llama.cpp/issues/30256) | Medium | Bug-unconfirmed | Gemma 4 JSON schema allows `thought` channel even when `enable_thinking=false`. |

> 🔍 *Note: No PRs have been merged to fix these yet. Prioritize testing with `--load-mode mmap` or downgrade to b11429 if experiencing regressions.*

---

### **6. What This Means for Application Developers**  
- **For agent developers**: Prism Bonsai 2 27B and H2O-Lightning-4B enable complex decision-making pipelines natively within `llama-server`, reducing dependency on external shims. Use `/v1/systemone` for calibrated probability outputs.  
- **For inference engineers**: The GDN optimization in OpenCL and Vulkan significantly improves long-context performance — especially relevant for models like Qwen3-Omni and GDN-hybrid fine-tunes.  
- **For distributed systems**: Use `GGML_RPC_DEBUG=3` to trace RPC call flow and diagnose failures in multi-node deployments (e.g., DGX Spark). Monitor for crashes with large MoE models until #30052 is resolved.  
- **For deployment teams**: Avoid `--load-mode auto` on AMD RDNA1 GPUs (RX 5700 XT, etc.) — use `--load-mode mmap` as a workaround for device loss/OOM.  
- **For CI/CD pipelines**: Enable `--n-cpu-ffn` with explicit band selection to avoid unpredictable CPU offloading behavior.

👉 **Recommended action**: Test your model-serving stack against the latest `b11559` release, especially if using Gemma-4, Qwen3-Omni, or MoE models on OpenCL/Vulkan backends.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-12**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to stabilize around its core inference and agent-serving capabilities, with a strong focus on fixing critical issues in tool calling, streaming, and model loading—especially for Qwen3.8 and hybrid architectures. Key developments include PRs addressing numeric precision loss in tool call arguments, kernel panics on Apple Silicon (M2 Max), and persistent crashes when using MLX on macOS. The community remains active in reporting and resolving edge cases across Windows, Linux, and macOS environments.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the past 24 hours.*  
All recent activity centers on bug fixes and performance improvements rather than versioned updates. Developers should continue monitoring `v0.40.2` and later for stability, particularly if using MLX, Vulkan, or hybrid models.

---

### **3. New Model & Hardware Support**  
- **New Model Requests**:  
  - [d1-3B](https://huggingface.co/LiquidAI/d1-3B-GGUF) and [d1-omni-600M](https://huggingface.co/LiquidAI/d1-omni-600M-GGUF) requested via #18890; currently blocked by unsupported decision encoding (`lfm2-d1`).  
  - EmbeddingGemma 2 support added via updated `llama.cpp` in PR #18917 (b11521).  

- **Hardware/Backend Fixes**:  
  - **Apple Silicon (M2 Max)**: PR #18940 reports SDPA kernel panic due to threadgroup size exceeding hardware limits (960 > 896).  
  - **Vulkan (AMD RX 6800 XT)**: Access violation crash (`0xc0000005`) reported in #18557 — ongoing investigation.  
  - **MLX (macOS/Metal)**: Multiple crashes reported including `panic: mlx` (#18885) and `libdl` linking errors on older glibc (#17567).

---

### **4. Performance & Optimization**  
- **Latency & Throughput**:  
  - Streaming hangs observed with `glm-5.3-flash` on Cloud API (#18926), where stream never terminates after completion.  
  - Inaccurate `prompt_per_second` calculation due to incorrect timing logic: divides total prompt by uncached-only time, inflating rates (#18948).  
- **Memory & Scheduling**:  
  - Hybrid models like `qwen35moe` are pinned to one slot regardless of `OLLAMA_NUM_PARALLEL`, limiting parallelism (#18938). Fixed in PR #18939.  
  - VRAM accounting misalignment on multi-GPU systems due to device name vs. log name mismatch (#18349).

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|--------|------|--------|-----------|
| 🔴 High | `qwen3.8`: "no user query found in messages" during chat streaming (#17778) | Breaks all client-side streaming APIs; affects agents using tool calls | Open, 52 comments |
| 🔴 High | `glm-5.3-flash` cloud streaming never terminates (#18926) | Client process hangs indefinitely | Open, 2 comments |
| 🔴 High | MLX runner panic on M2 Max: SDPA threadgroup overflow (#18940) | Crashes on large attention heads (e.g., qwen3.8:27b) | Open |
| 🟡 Medium | `embeddinggemma-2:740m` fails to pull without MLX runtime (#18825) | Blocked on non-Mac systems | Open, 14 upvotes |
| 🟡 Medium | `ollama list` returns empty on NTFS mount points (#18921) | Models invisible despite being present | PR #18949 submitted |
| 🟡 Medium | Tool-call argument precision lost in Go API (#18942) | Numeric values like `9007199254740993` become `9007199254740992` | PR #18941 merged |

---

### **6. What This Means for Application Developers**  
- **Avoid `reasoning_effort: "xhigh"` with Qwen3.8** until #18943 is resolved — it gets rewritten to `max`, which breaks templates. Use `max` directly instead.  
- **Do not rely on `OLLAMA_NUM_PARALLEL` for hybrid models** (`qwen35moe`, `qwen3vl`, etc.) — they’re hard-pinned to one slot (#18938). Expect single-threaded execution even on multi-GPU setups.  
- **Handle tool-call precision carefully** — use PR #18941’s fix or decode numerics as strings to avoid rounding errors.  
- **Test on multiple backends** — MLX on macOS, Vulkan on AMD, and Windows junctions are all known to have path traversal bugs. Use absolute paths or avoid volume mounts.  
- **Monitor streaming responses closely** — especially for `glm-5.3-flash` and `qwen3.8` — streams may hang or fail silently.

> 🔗 [View Issues](https://github.com/ollama/ollama/issues) | [PRs Summary](https://github.com/ollama/ollama/pulls)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-12**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to mature with a strong focus on **LLM translation fidelity**, **native Rust integration**, and **multi-tenant cost control**. Key developments include critical fixes for `response_format` handling across Anthropic/OpenAI/Gemini, improvements in streaming and tool call consistency, and new support for `ai&` as a first-class provider. The proxy now better handles budget reservations and logging under edge cases like `no-log: true`.

---

### **2. Releases & Breaking Changes**  
- **v1.106.0-rc.1**, **v1.105.0**, and **v1.104.3** released within the last 24 hours.  
- All Docker images are cryptographically signed via [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0), ensuring supply-chain integrity.  
- **No breaking API changes** reported in these releases; backward compatibility preserved.

> 🔗 [GitHub Release Notes](https://github.com/BerriAI/litellm/releases)

---

### **3. New Model & Hardware Support**  
- ✅ **`ai&` provider added** as first-class integration via PR [#43607](https://github.com/BerriAI/litellm/pull/43607). Supports Chat Completions and Responses API.
- ✅ **Gemini 3 models** now correctly handle `temperature=1.0` defaults (previously forced by LiteLLM, causing rejection on future models) — addressed in [#45333](https://github.com/BerriAI/litellm/issues/45333).
- ✅ **Rust-native inference** now preserves Python cache keys and supports `streaming`, `tool calls`, and `body hooks` via recent PRs ([#45956](https://github.com/BerriAI/litellm/pull/45956), [#45985](https://github.com/BerriAI/litellm/pull/45985)).

---

### **4. Performance & Optimization**  
- **Rust bridge optimizations** significantly reduce overhead for native calls:
  - PR [#45962](https://github.com/BerriAI/litellm/pull/45962): Refactored hook execution to run async on caller’s task, eliminating continuation machine complexity.
  - PR [#45957](https://github.com/BerriAI/litellm/pull/45957): Offloads host continuations to Python driver, improving responsiveness and debugging clarity.
- **Streaming performance**: Fixes to Gemini stream restart logic ([#45750](https://github.com/BerriAI/litellm/pull/45750)) ensure retries on early disconnections.
- **Cost routing efficiency**: PR [#45889](https://github.com/BerriAI/litellm/pull/45889) enables session-affinity pins to yield when saturated — improves load distribution in high-throughput scenarios.

---

### **5. Stability & Regressions**  
| Severity | Issue | Fix Status | Link |
|--------|------|-----------|------|
| ⚠️ High | `cost-based-routing` crashes sync Router methods even with healthy deployments | Open | [#45718](https://github.com/BerriAI/litellm/issues/45718) |
| ⚠️ High | `output_config` fails with Xiaomi MiMo models (`MiMo-V2-Pro/Omni`) | Open | [#24549](https://github.com/BerriAI/litellm/issues/24549) |
| ⚠️ Medium | `stop_sequences` passed verbatim to OpenAI providers → 400 error | Open | [#33075](https://github.com/BerriAI/litellm/issues/33075) |
| ⚠️ Medium | Tool result `is_error` flag lost during Anthropic→OpenAI translation | Open | [#44979](https://github.com/BerriAI/litellm/issues/44979) |
| 🛠️ Fixed | `no-log: true` skips spend tracking despite successful request | Fixed in PR [#44514](https://github.com/BerriAI/litellm/pull/44514) |

> Note: Several issues involve silent data loss or incorrect parameter forwarding — particularly around `tool_calls`, `response_format`, and `stop_sequences`.

---

### **6. What This Means for Application Developers**  
- **Use `ai&` directly** in your model routing via `aiand/<model>` — no need for workarounds.
- **Enable `cost-based-routing` only if you’ve verified deployment health** — it may silently disable routes under certain conditions.
- **Avoid `no-log: true` if you rely on spend tracking** — use `proxy_spend_tracking=True` instead to preserve accounting.
- **Upgrade to v1.105.0+** to benefit from improved tool call fidelity and Rust-native performance gains.
- **Monitor `output_config` usage with Xiaomi MiMo models** — this remains broken until [#24549](https://github.com/BerriAI/litellm/issues/24549) is resolved.
- **Leverage session-affinity pinning wisely** — it now yields on saturation (PR [#45889](https://github.com/BerriAI/litellm/pull/45889)), enabling more resilient load balancing.

> 🔗 [Developer Guide: Multi-Tenant Budgeting](https://github.com/BerriAI/litellm/issues/44555)  
> 🔗 [GitHub Issues Dashboard](https://github.com/BerriAI/litellm/issues?q=is%3Aopen+sort%3Aupdated-desc)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-12**

---

### **1. Today's Highlights**  
The Unsloth team has made significant progress in stabilizing multi-user inference and improving model training workflows, with key PRs focused on distributed training efficiency (`UNSLOTH_DDP_BATCHED_GRAD_COPY=1`), better handling of MoE-LoRA checkpoints, and enhanced support for vision-language models like Qwen-Image-2.1 in Studio. Critical stability fixes address GPU memory leaks, CPU fallback issues, and crashes during tool calling — particularly affecting users on M-series Macs and Windows systems.

---

### **2. Releases & Breaking Changes**  
*None*  
No new releases were published in the past 24 hours. The latest version remains `v0.1.808-beta` (Studio) and `2026.9.4` (core package). No breaking API or config changes are active at this time.

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen-Image-2.1 GGUF**: Now properly classified as a *text-to-image* diffusion model in Studio via [PR #13333](https://github.com/unslothai/unsloth/pull/13333), resolving prior misclassification.
- ✅ **DeepSeek-OCR & DeepSeek-OCR-2**: Added support in Studio through [PR #13310](https://github.com/unslothai/unsloth/pull/13310), fixing missing dependencies (`addict`, `easydict`) and enabling full model loading.
- ✅ **OpenVINO for Intel Arc / Core Ultra**: Progress continues on [PR #12168](https://github.com/unslothai/unsloth/pull/12168), enabling conversion, recommendation, and chat via managed sidecar — targeted for future Studio integration.
- ✅ **All text-diffusion families**: Studio now supports training and chatting with LLaDA, LLaDA-MoE, Dream, Nemotron-Labs-Diffusion, LLaDA2, SDAR, and DiffusionGemma via [PR #13342](https://github.com/unslothai/unsloth/pull/13342).

---

### **4. Performance & Optimization**  
- 🚀 **Distributed Training Speedup**: [PR #13350](https://github.com/unslothai/unsloth/pull/13350) introduces opt-in `UNSLOTH_DDP_BATCHED_GRAD_COPY=1`, leveraging PyTorch 2.13’s `batched_grad_copy` to reduce gradient synchronization overhead — expected to improve large-scale training throughput by up to 15–20% on multi-GPU setups.
- ⚙️ **KV Cache Sharing**: [PR #10301](https://github.com/unslothai/unsloth/pull/10301) implements unified KV preemption so parallel chats share one cache pool instead of exhausting it — critical for high-concurrency inference workloads.
- 📈 **CPU Thread Management on macOS**: [PR #13349](https://github.com/unslothai/unsloth/pull/13349) ensures `sd.cpp` runs on performance cores only (not all logical threads), improving real-time audio/video generation latency on Apple Silicon Macs.

---

### **5. Stability & Regressions**  
- 🔥 **Critical Crash on M3/M5 Macs**: Users report system-wide flickering and UI freeze when loading Qwen 3.8 27B quantized models ([Issue #9279](https://github.com/unslothai/unsloth/issues/9279)). Appears linked to Metal backend instability; no fix yet.
- 🔥 **GPU Fallback on Windows**: RTX 3090/4090 users report models running on CPU despite GPU availability ([Issue #4644](https://github.com/unslothai/unsloth/issues/4644)). Root cause likely driver/runtime mismatch; workaround: force CUDA context via `CUDA_VISIBLE_DEVICES`.
- 🛑 **Tool Calling Hangs**: Models stop generating responses mid-tool call, requiring message resubmission ([Issue #7125](https://github.com/unslothai/unsloth/issues/7125), [#7045](https://github.com/unslothai/unsloth/issues/7045)). Fix in progress via improved async orchestration.
- 🧱 **OOM on Jetson AGX Orin**: Gemma-3n fails during inference due to memory pressure ([Issue #3113](https://github.com/unslothai/unsloth/issues/3113)); may require custom memory pooling or lower precision configs.
- 💣 **Stalled Downloads & Validation Failures**: Pre-quant checkpoints fail after full download due to late-stage validation ([PR #13339](https://github.com/unslothai/unsloth/pull/13339)) — mitigation: early fingerprint checks.

---

### **6. What This Means for Application Developers**  
- Use `UNSLOTH_DDP_BATCHED_GRAD_COPY=1` in production training jobs to reduce inter-node sync overhead — especially relevant for multi-GPU clusters.
- For **vision-language apps**, ensure you're using the correct model classification (e.g., Qwen-Image-2.1) and avoid relying on auto-detection if using custom GGUFs.
- If deploying on **Apple Silicon Macs**, expect potential UI freezes with large models; consider pinning to `UNSLOTH_CPU_THREADS` or reducing context size.
- Avoid `save_lora()` without `merge_and_unload()` when exporting adapters — known issue with LoRA-GA weights not reloading correctly ([PR #13322](https://github.com/unslothai/unsloth/pull/13322)).
- Be cautious with **MoE-LoRA checkpoints** — their `lora_B` layout is block-wise per expert and incompatible with standard PEFT loaders ([Issue #6930](https://github.com/unslothai/unsloth/issues/6930)).

> **Pro Tip**: Set `UNSLOTH_RETURN_LOGITS=1` when validating fine-tuned models to prevent silent failures in loss computation ([Issue #5230](https://github.com/unslothai/unsloth/issues/5230)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*