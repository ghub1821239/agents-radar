# AI Infrastructure Digest 2026-09-19

> Generated: 2026-09-19 00:36 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-19**

---

### **1. Ecosystem Overview**  
The AI inference and serving landscape in Q3 2026 is defined by a sharp bifurcation between **high-performance, low-level engines** (vLLM, llama.cpp) and **integrated, developer-friendly platforms** (Ollama, SGLang, LiteLLM). While vLLM and llama.cpp lead in kernel-level optimizations and hardware-specific accelerations, Ollama and SGLang are rapidly maturing as full-stack gateways with agent-aware features and cloud-native workflows. Unsloth stands out as a hybrid platform bridging training and inference, while LiteLLM consolidates enterprise-grade orchestration—budgeting, security, and multi-provider routing. The convergence of MoE, FP8/INT8 quantization, and disaggregated serving is now central to performance and scalability.

---

### **2. Activity Comparison**  

| Project       | Issues Open (Last 7 Days) | PRs Merged (Last 7 Days) | Release Status       |
|---------------|----------------------------|-----------------------------|-----------------------|
| vLLM          | 42                         | 58                          | `v0.28.1rc1` stable   |
| SGLang        | 38                         | 45                          | `v0.5.20` released    |
| llama.cpp     | 36                         | 41                          | `b11046–b11035` (incremental) |
| Ollama        | 34                         | 29                          | `v0.34.3-rc0` (pre-release) |
| LiteLLM       | 27                         | 21                          | `v1.103.0-dev.2` (dev) |
| Unsloth       | 31                         | 34                          | `v0.1.811-beta` (beta) |

> ✅ *Insight:* vLLM and SGLang show the highest engineering velocity, reflecting active development in core inference logic and production readiness. Ollama’s pre-release cycle indicates feature-heavy iteration ahead of GA. LiteLLM maintains stability with focused security hardening.

---

### **3. Model Support Race**  

| New Model / Architecture      | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**        | ✅ (FP8/FP4, MTP) | ✅ (MTP) | ✅ (MTP) | ⚠️ (critical bugs) | ❌ | ✅ (2x speedup via hotfix) |
| **GLM-5.3-Flash**             | ✅ (Blackwell/B200/B300, ROCm) | ✅ (autoregressive) | ❌ | ❌ | ❌ | ❌ |
| **Qwen4Exp**                  | ✅ (ROCm, CPU offload) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Kimi K3**                   | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (initial support) |
| **MiniMax-M3 (ROCm)**         | ❌ | ✅ (fp8 K-cache, Triton fallback) | ❌ | ❌ | ❌ | ❌ |
| **DFlash2 / MTP / GDN**       | ✅ (async offloading, stability fixes) | ✅ (MoE optimization) | ✅ (split-mode fix) | ⚠️ (state leakage on ROCm) | ❌ | ✅ (hotfix for MTP) |

> 🏆 **Leaderboard**:  
> - **vLLM** leads in **hardware coverage and MoE robustness**.  
> - **SGLang** wins in **ROCm ecosystem depth and new model integration**.  
> - **Unsloth** delivers **fastest real-world performance gains** (e.g., 2x speedup on Qwen3.8).  
> - **Ollama** lags in model stability despite early adoption attempts.

---

### **4. Performance Frontier**  

| Optimization Focus           | vLLM                            | SGLang                          | llama.cpp                       | Ollama                     | LiteLLM                    | Unsloth                   |
|------------------------------|----------------------------------|----------------------------------|----------------------------------|----------------------------|----------------------------|----------------------------|
| **KV Cache Efficiency**      | ✅ FlashInfer paged updates (Ampere/Hopper), FP4 | ✅ HiCache auto-sizing, dynamic pooling | ✅ MMQ kernels (Vulkan), IM2COL | ⚠️ State leakage on ROCm    | ❌ N/A                      | ✅ Offload + checkpoints |
| **Batching & Scheduling**    | ✅ Async offloading, partial prefill limits | ✅ Prefill interleaving, engine selection redesign | ❌ CUDA graph overhead issues | ❌ Unstable long-context     | ✅ Budgeted rate limiting    | ✅ API concurrency control |
| **Quantization**             | ✅ FP8/FP4, PLE CPU offload (ROCm) | ✅ f16/fp8 K-cache, fused RMSNorm | ✅ IQ3_S/IQ3_XXS SYCL layout, int8 coopmat | ✅ Uniform MoE expert quant | ✅ Cost-aware pricing | ✅ UD-IQ4_XS, DFlash sidecars |
| **Kernel-Level Optimizations** | ✅ Fused QK-norm+RoPE+gate (ROCm), NGram speculators | ✅ Fused mxfp8 + sorting (MoE) | ✅ Binary flash_attn (OpenCL), Metal multi-column | ❌ Silent EOS bug | ❌ N/A | ✅ MTP hotfix (2x speed) |
| **Distributed Serving**      | ✅ Disaggregated, NIXL KV connector | ✅ Engine selection policy rearchitecture | ❌ No distributed mode | ❌ Limited scaling | ✅ Multi-provider routing | ❌ No distributed training |

> 🔥 **Trend**: **Disaggregation and hybrid quantization** are now central to competitive advantage. vLLM and SGLang lead in scalable architecture; llama.cpp and Unsloth excel in embedded/edge efficiency.

---

### **5. Layer Positioning**  

| Project       | Primary Layer              | Key Differentiators                                                                 |
|---------------|----------------------------|-------------------------------------------------------------------------------------|
| **vLLM**      | **Serving Engine**         | High-throughput, low-latency inference; optimal for cloud-scale LLM APIs and RAG. |
| **SGLang**    | **Serving Gateway + Runtime** | Agent-first design, hierarchical caching, load-aware routing. Ideal for complex workflows. |
| **llama.cpp** | **Local Runtime / Edge Inference** | Cross-platform, minimal dependencies; best for on-device or resource-constrained deployments. |
| **Ollama**    | **Developer Gateway / CLI Tool** | Unified local experience, model hub, easy CLI access. Strong for prototyping and devops. |
| **LiteLLM**   | **Enterprise Proxy / Orchestration Layer** | Multi-provider routing, budgeting, auth, encryption. Critical for production AI APIs. |
| **Unsloth**   | **Full-Stack Platform**    | Blends inference, fine-tuning, training, and deployment. Targets developers needing end-to-end control. |

> 💡 *Strategic Insight:* The most resilient architectures now span multiple layers—e.g., **vLLM + LiteLLM + SGLang** form a powerful stack for scalable, secure, and high-performance AI services.

---

### **6. Trend Signals & Developer Guidance**  

#### **Key Industry Trends Extracted:**  
1. **Hardware Democratization**: AMD ROCm and Intel GPU support are no longer experimental—vLLM, SGLang, and Unsloth now offer parity with NVIDIA across FP8, MTP, and MoE workloads.  
2. **Agent-Centric Design**: SGLang and Ollama are introducing **thinking depth controls**, **tool-call validation**, and **session state isolation**, signaling a shift from prompt-based to behavior-controlled agents.  
3. **Security-First Orchestration**: LiteLLM’s virtual-key bypass issue (#41810) and Ollama’s state leakage on ROCm highlight that **trust boundaries are under siege**—developers must audit query parameters and backend isolation.  
4. **Performance Through Abstraction**: Unsloth’s 2x speedup via MTP hotfix proves that **low-level kernel tuning still drives real gains**, even in high-level frameworks.  
5. **Quantization + Memory Trade-offs**: All projects are pushing into **mixed-precision MoE**, **CPU offload**, and **dynamic pooling**—but regressions (e.g., CUDA graphs, silent EOS) suggest these optimizations are not yet mature.

#### **What Application Developers Should Watch:**  
- ✅ **Adopt vLLM or SGLang** for high-throughput RAG and agent systems—especially with `--max-num-partial-prefills` and `--enable-prefill-interleaving`.  
- ✅ **Avoid `?model=` overrides in LiteLLM** until #41810 is patched—use virtual keys with strict allowlists instead.  
- ✅ **Use Ollama only after validating model behavior**—`qwen3.8`, `deepseek-v4.1-flash`, and `qwen3-coder` have known output corruption risks.  
- ✅ **Upgrade Unsloth to `v0.1.811-beta` immediately** if using `Qwen3.8-Flash-Next`—performance loss is unacceptable post-v0.1.810.  
- ✅ **Monitor Vulkan/ROCm backends closely**—crashes and memory leaks remain widespread; prefer CUDA or Metal where possible.

> 🔚 **Final Note**: The era of “plug-and-play” inference is over. The future belongs to **engineers who understand the trade-offs between abstraction, performance, and security**—and who can navigate the fragmented but accelerating frontier of AI infrastructure.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-19**

---

### **1. Today's Highlights**  
The vLLM project continues to advance its support for **disaggregated serving**, with key progress on NIXL KV connector reliability and async offloading for MoE models. Critical stability fixes were merged for DiffusionGemma and hybrid GDN/MTP workloads, while new ROCm optimizations enable FP8 model serving on AMD GPUs. A major RFC proposes restoring concurrent partial prefill limits in the V1 scheduler—essential for high-throughput long-context RAG workloads.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes observed. The `v0.28.1rc1` release remains stable, with ongoing refinements to speculative decoding and scheduling behavior.

---

### **3. New Model & Hardware Support**  
- ✅ **ROCm Support**: Expanded FP8/FP4 support for Qwen4Exp and GLM-5.3-Flash on AMD GPUs (gfx950), including CPU offload of n-gram tables via `VLLM_PLE_CPU_OFFLOAD` ([PR #57497](https://github.com/vllm-project/vllm/pull/57497)).  
- ✅ **Hardware Expansion**: Full support for **NVIDIA Blackwell B300/B200** (SM120) now includes fixed attention paths for GLM-5.3-Flash (`qk_rope_head_dim=0`) after prior crashes ([Issue #53963](https://github.com/vllm-project/vllm/issues/53963)).  
- ✅ **Intel GPU**: Active development on Intel GPU integration with mixed-precision quantization and MTP support ([Issue #53119](https://github.com/vllm-project/vllm/issues/53119)).

---

### **4. Performance & Optimization**  
- 🔥 **Speculative Decoding**: PRs #40704 and #57416 introduce NGram GPU speculators and optimize prefill-only batch handling—reducing unnecessary logit computations in diffusion models ([PR #57416](https://github.com/vllm-project/vllm/pull/57416)).  
- 📈 **Memory Efficiency**: ROCm PRs #57497 and #51406 enable **~100 GiB VRAM savings** by offloading Qwen4Exp PLE tables to pinned host memory.  
- ⚡ **Kernel Fusion**: Fused `QK-norm+RoPE+gate` kernel for Qwen3-Next/Qwen3.5 lands on ROCm ([PR #51406](https://github.com/vllm-project/vllm/pull/51406)), reducing kernel launches and improving throughput.  
- 💾 **KV Cache Optimization**: FlashInfer now supports NVFP4 paged KV updates on pre-SM100 architectures (Ampere/Hopper), enabling smaller cache footprint without performance loss ([PR #46963](https://github.com/vllm-project/vllm/pull/46963)).

---

### **5. Stability & Regressions**  
- 🛑 **Critical Crash**: `DiffusionGemma` crashes due to dtype mismatch in self-conditioning embed buffer when Dynamo falls back to eager mode ([PR #57462](https://github.com/vllm-project/vllm/pull/57462)) — fix merged.  
- 🛑 **Long-Context Degradation**: GLM-5.3-Flash shows output quality decay after extended reasoning decode cycles; likely due to silent KV cache overwrites in kpool indexer on ROCm ([Issue #54359](https://github.com/vllm-project/vllm/issues/54359)).  
- 🐞 **Silent CUDA IMA**: Persistent illegal memory access (Xid 31) under sampling load with DFlash2 on SM80 (RTX 3090) after ~11k decode steps ([Issue #55279](https://github.com/vllm-project/vllm/issues/55279)) — no fix yet.  
- 🐞 **Async Scheduling Bug**: `assert request.num_output_placeholders >= 0` can fail during async scheduling ([Issue #30142](https://github.com/vllm-project/vllm/issues/30142)) — pending fix.

---

### **6. What This Means for Application Developers**  
- **For RAG/long-context apps**: Use `--max-num-partial-prefills` in V1 scheduler to handle 100k+ token prompts efficiently—this is now a production-critical feature ([RFC #57413](https://github.com/vllm-project/vllm/issues/57413)).  
- **For multi-modal agents**: Be cautious with multimodal placeholder expansion—recent bug (#57223) causes `assistant_tokens_mask` misalignment; use latest vLLM builds.  
- **For developers using LoRA/RL workflows**: Avoid `enable_lora=True` with sleep/wake modes until [#48297](https://github.com/vllm-project/vllm/issues/48297) is resolved.  
- **For deployment on AMD**: Leverage `VLLM_PLE_CPU_OFFLOAD` to serve large FP8 models like Qwen3.8-Flash-Next-FP8 on single MIG-enabled cards.  

> 🔗 *Stay updated: [vLLM GitHub Issues](https://github.com/vllm-project/vllm/issues), [PRs](https://github.com/vllm-project/vllm/pulls)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-19**

---

### **1. Today's Highlights**  
The latest release, **v0.5.20**, brings significant improvements in model support and infrastructure stability, including the addition of **GLM-5.3-Flash** as a new autoregressive model. Key engineering efforts are underway to enhance **HiCache auto-sizing**, **CUDA graph memory management**, and **engine selection policy rearchitecture**, signaling a strong push toward production-grade scalability and resource efficiency.

---

### **2. Releases & Breaking Changes**  
- **v0.5.20**: Released with 713 PRs from 237 contributors. No breaking API changes reported, but users should review updated documentation for new features like `--enable-prefill-interleaving` and improved prefill scheduling controls.  
  🔗 [Release v0.5.20 on GitHub](https://github.com/sgl-project/sglang/releases/tag/v0.5.20)

---

### **3. New Model & Hardware Support**  
- **GLM-5.3-Flash**: Added as a supported autoregressive model; optimized for high-throughput inference with flash attention.  
  🔗 [Cookbook: GLM-5.3-Flash](https://docs.sglang.io/cookbook#glm-53-flash)  
- **MiniMax-M3 (ROCm)**: Experimental support for fp8 K-cache allocation, fused RMSNorm + per-token FP8 quantization, and Gluon paged attention via Triton fallback.  
  🔗 PRs: [#36549](https://github.com/sgl-project/sglang/pull/36549), [#36575](https://github.com/sgl-project/sglang/pull/36575), [#36546](https://github.com/sgl-project/sglang/pull/36546)  
- **NVIDIA Hopper (H20)**: Verified compatibility with GLM-5.3-Flash vision model, though a bug was reported around JPEG misclassification.  
  🔗 Issue #38821

---

### **4. Performance & Optimization**  
- **Prefill CUDA Graph Memory Overhead**: A newly reported issue shows ~1.8 GB reserved by prefill CUDA graphs, starving long-context quantized-KV prefill on small GPUs (e.g., 24GB cards). No auto-disable rule currently considers free VRAM.  
  🔗 Issue #40094  
- **HiCache Auto-Sizing**: PR #40135 introduces dynamic host pool sizing based on available memory, preventing failures due to over-allocation in constrained environments.  
  🔗 PR #40135  
- **MoE Optimization**: Fused mxfp8 quantization and sorting path for small-batch MoE decoding reduces launch overhead (~7μs/layer), improving decode throughput.  
  🔗 PRs: [#36559](https://github.com/sgl-project/sglang/pull/36559), [#36575](https://github.com/sgl-project/sglang/pull/36575)  
- **Engine Selection Redesign**: A multi-PR effort (e.g., #40241, #40271) is restructuring the `sgl-router` to support load-based admission policies and shared state management — foundational for scalable multi-engine routing.  
  🔗 POLICY_DESIGN.md

---

### **5. Stability & Regressions**  
- **Critical**: `DFLASH draft layout not validated` → anchor-first checkpoints silently shift positions, risking incorrect token generation.  
  🔗 Issue #40144 *(No fix PR yet)*  
- **High Severity**: `Qwen3CoderDetector` duplicates `<parameter=NAME>` tags, truncating arguments and overwriting earlier matches.  
  🔗 Issue #39836 *(No fix PR yet)*  
- **Medium**: OpenAI-compatible API generates different prompts in Python vs Rust (177 vs 167 tokens) due to inconsistent rendering.  
  🔗 Issue #39843 *(No fix PR yet)*  
- **Low**: `DeepSeek V4/V3.2` tool calls returned as content without `tool_calls` field (malformed output).  
  🔗 Issue #40236 *(No fix PR yet)*  
- **Resolved**: `is_musa()` now breaks TorchDynamo tracing — fixed via PR #40007 (merged), but remains a dependency risk.  
  🔗 PR #40007

---

### **6. What This Means for Application Developers**  
- **Adopt `--enable-prefill-interleaving`** for better fairness in mixed-latency workloads; use `--prefill-interleaving-min-continuation-tokens` to tune trade-offs.  
- **Monitor GPU memory usage carefully** when using prefill CUDA graphs — consider disabling them or tuning thresholds if running on low-VRAM hardware.  
- **Avoid relying on Python/Rust parity in OpenAI-compatible APIs** until #39843 is resolved; test prompt fidelity across runtimes.  
- **Prepare for engine-selection upgrades** — the upcoming `sgl-router` redesign enables smarter, load-aware routing across heterogeneous engines, crucial for agent systems and multi-model gateways.  
- **Validate tool-calling outputs** for Qwen3CoderDetector and DeepSeek models due to known serialization bugs.  

📌 **Actionable Tip**: Use `--enable-hierarchical-cache` with auto-sizing enabled (`#40135`) to avoid crashes in containerized or memory-constrained deployments.

---  
*Digest generated: 2026-09-19 | Source: github.com/sgl-project/sglang*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-09-19**

---

### **1. Today's Highlights**  
The latest round of updates centers on **enhanced hardware acceleration across multiple backends**, with critical improvements to OpenCL and Hexagon support, including new binary kernels for flash attention and expanded IM2COL/ROLL operations. Significant progress is also underway in **SYCL graph recording**, enabling performance optimizations for Intel Arc GPUs, while Vulkan continues to gain robustness with new MMQ kernels for RDNA3/RDNA4.

---

### **2. Releases & Breaking Changes**  
No breaking changes or major API shifts were introduced in the latest releases. All recent versions (b11046–b11035) are incremental updates focused on backend stability and feature expansion. Developers should ensure compatibility with `--split-mode tensor` when using DFlash2 or MTP models, as a fix was merged recently ([PR #27858](https://github.com/ggml-org/llama.cpp/pull/27858)).

---

### **3. New Model & Hardware Support**  
- **Hexagon (Qualcomm AI Engine)**: Added ROLL op support ([PR #29105](https://github.com/ggml-org/llama.cpp/pull/29105)), improved IM2COL handling for 1D/padded inputs ([PR #29103](https://github.com/ggml-org/llama.cpp/pull/29103)), and BF16↔F16 conversion support ([PR #29106](https://github.com/ggml-org/llama.cpp/pull/29106)).  
- **OpenCL**: Added binary kernel `flash_attn_f32_f16_bin` for faster attention computation ([PR #29046](https://github.com/ggml-org/llama.cpp/pull/29046)).  
- **Vulkan**: Added IQ3_S MMQ matmul kernels for AMD RDNA3/RDNA4 GPUs ([PR #28822](https://github.com/ggml-org/llama.cpp/pull/28822)), enhancing low-precision inference efficiency.  
- **New Model Support**: Qwen3.8-Flash-Next MTP now supported with shared module optimization ([PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243)).

---

### **4. Performance & Optimization**  
- **SYCL**: PR #29107 introduces persistent reordered layouts for IQ3_S/IQ3_XXS, improving decode speed on Intel Arc B70 by up to **~15%** in early benchmarks.  
- **Metal**: PR #29110 adds multi-column mat-vec kernels for small batches (Q4_0/Q8_0), reducing per-column cost from ~1 full matvec to sub-linear scaling — expected **~20–30% improvement** at batch sizes 2–8.  
- **Vulkan**: PR #27952 delivers int8 coopmat1 MMQ kernels for AMD RDNA3/RDNA4, achieving **~1.5x faster prompt processing** over previous implementations.  
- **CUDA**: PR #28634 enables `GGML_CUDA_FA_ALL_QUANTS` by default, eliminating silent fallbacks to generic dequant paths — restores prefill throughput from **~34 t/s to ~1147 t/s** on RTX 3090 with flash attention.  

---

### **5. Stability & Regressions**  
Critical stability issues remain active across backends:
- **CUDA**: GPU hangs and XID 8 errors reported on RTX 5090 with CUDA graphs enabled ([Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)). A workaround (`GGML_CUDA_DISABLE_GRAPHS=1`) is available.  
- **Vulkan**: Crashes during decode on qwen4exp models with RADV driver on gfx1151 ([Issue #29028](https://github.com/ggml-org/llama.cpp/issues/29028)).  
- **Metal**: Silent EOS emission after 1 token at long context lengths ([Issue #28805](https://github.com/ggml-org/llama.cpp/issues/28805)) — stochastic behavior tied to quantization and KV cache.  
- **SYCL**: Device loss crashes on dual Arc Pro B70 setups ([Issue #27198](https://github.com/ggml-org/llama.cpp/issues/27198)) and extreme scratchpad allocation (>2GB) with ngram-mod enabled ([Issue #28860](https://github.com/ggml-org/llama.cpp/issues/28860)).  

*Note:* Several fixes are in flight (e.g., [PR #27858](https://github.com/ggml-org/llama.cpp/pull/27858) for DFlash2 + split-mode), but no stable release yet addresses these.

---

### **6. What This Means for Application Developers**  
- **For edge/AI-on-device apps**: Hexagon and Metal gains unlock better performance on Qualcomm SoCs and Apple Silicon, especially for lightweight models with sliding window attention (SWA). Use `--split-mode tensor` cautiously with MTP/DFlash2 until fix lands.  
- **For high-throughput inference**: Enable `GGML_CUDA_FA_ALL_QUANTS` (now default) to avoid performance cliffs on non-standard quants. Avoid CUDA graphs on RTX 5090 until issue #27330 is resolved.  
- **For cross-backend deployment**: Expect instability on SYCL (Intel Arc) and Vulkan (AMD Strix Halo) — test with `--no-mmap`, disable `ngram-mod`, and monitor device memory usage.  
- **For model serving**: Consider upgrading to `b11046+` for improved OpenCL flash-attention and better fallback handling via `ggml-hexagon` enhancements. Monitor [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues) for real-time stability updates before production rollout.

> 📌 **Actionable Tip**: Use `--list-devices` to validate backend availability, especially on ROCm/HIP and Windows builds where DLLs may be missing ([Issue #26996](https://github.com/ggml-org/llama.cpp/issues/26996)).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **Ollama Digest — 2026-09-19**

#### **1. Today's Highlights**  
The latest release, `v0.34.3-rc0`, introduces explicit model-level thinking control exposure via `/api/show`, enabling clients to dynamically configure reasoning depth (low/high/max) based on model capabilities—critical for agent and tooling workflows. Simultaneously, a wave of stability issues has emerged around Qwen3-family models, particularly regarding tool call parsing, image handling in cloud models, and state leakage across requests on ROCm, highlighting ongoing challenges with hybrid MoE and GPU backend compatibility.

#### **2. Releases & Breaking Changes**  
- **`v0.34.3-rc0`**: Now exposes `thinking` configuration per model through `GET /api/show`:  
  ```json
  {
    "thinking": {
      "values": ["low", "high", "max"],
      "default": "max"
    }
  }
  ```
  [PR #18473](https://github.com/ollama/ollama/pull/18473) | [Issue #18529](https://github.com/ollama/ollama/issues/18529)  
- **CLI Agent Removal**: The built-in CLI agent was removed in favor of improved standalone launcher options due to security and UX concerns ([#18393](https://github.com/ollama/ollama/pull/18393)). Users must now opt into agent functionality explicitly via external tools or future CLI flags.

#### **3. New Model & Hardware Support**  
- **New Models Requested**:  
  - *Mistral Small 4* (open-source successor to Mistral Small 3.2) is actively requested ([#15142](https://github.com/ollama/ollama/issues/15142)).  
  - *Prism Ternary GGUFs (PQ2_0/PTQ1_0)* are blocked by unsupported tensor size overflow in Ollama’s parser ([#18521](https://github.com/ollama/ollama/issues/18521)).  
- **Hardware Backends**:  
  - **ROCm**: Hybrid GDN models show cross-request state leakage on gfx1151 (Radeon 8060S), tracked at [ggml-org/llama.cpp#29092](https://github.com/ggml-org/llama.cpp/issues/29092).  
  - **MLX**: 1-bit/2-bit quantized Bonsai models require upstream MLX support ([#18515](https://github.com/ollama/ollama/issues/18515)).  
  - **Vulkan**: Intel Iris Xe iGPU fails to detect VRAM at startup ([#18482](https://github.com/ollama/ollama/issues/18482)) and crashes during KV cache allocation ([#18531](https://github.com/ollama/ollama/issues/18531)) on recent versions.

#### **4. Performance & Optimization**  
- **Memory Management**:  
  - Users request granular memory split controls for multi-GPU setups ([#18525](https://github.com/ollama/ollama/issues/18525)), especially for slow PCIe3 slots used as overflow targets.  
  - Dynamic offloading and RAM-aware loading strategies proposed for low-RAM systems (<16GB) running 7B+ models ([#13601](https://github.com/ollama/ollama/issues/13601)).  
- **Inference Efficiency**:  
  - Benchmarks updated to use **HumanEval patch prompts** instead of synthetic inputs, improving speculative draft performance calibration ([#17480](https://github.com/ollama/ollama/pull/17480)).  
  - Quantization improvements: Uniform quantization of sparse-MoE expert banks now avoids mixed precision bloat ([#17976](https://github.com/ollama/ollama/pull/17976)).

#### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| 🔴 High | `qwen3.8` fails on streaming chat: `no user query found in messages` (500) | Breaks client-side tool loops; reproducible with 205k context | [Issue #17778](https://github.com/ollama/ollama/issues/17778) |
| 🔴 High | `deepseek-v4.1-flash:cloud` silently discards images despite `vision` in capabilities | Misleading API contract; breaks multimodal apps | [Issue #18527](https://github.com/ollama/ollama/issues/18527) |
| 🔴 High | ROCm hybrid GDN models leak prior prompt text across requests | Security risk; corrupts outputs in multi-user scenarios | [Issue #18528](https://github.com/ollama/ollama/issues/18528) |
| 🟡 Medium | MLX nvfp4 stalls indefinitely under sustained load | Can hang entire inference server; requires SIGTERM | [Issue #18505](https://github.com/ollama/ollama/issues/18505) |
| 🟡 Medium | Vulkan iGPU runner wedges after cancelled prefill | Silent hangs; requires full restart | [Issue #18477](https://github.com/ollama/ollama/issues/18477) |
| 🟡 Medium | `qwen3-coder` loses tool calls when reasoning precedes `<function=...>` | Tooling broken if model uses natural language preamble | [Issue #18530](https://github.com/ollama/ollama/issues/18530) |

#### **6. What This Means for Application Developers**  
- **Tooling Workflows**: Be cautious with `qwen3.8`, `qwen3-coder`, and `deepseek-v4.1-flash`—these models may silently discard input or misparse tool calls. Implement fallback logic and validate responses before relying on structured output.  
- **Cloud vs. Local**: Use `ollama show` or `/api/show` to check `capabilities` and `thinking` support before deploying agents. Filter local-only models via CLI or UI enhancements ([#16833](https://github.com/ollama/ollama/issues/16833)) to avoid unintended cloud dependencies.  
- **Deployment Hardening**: Avoid `OLLAMA_NUM_PARALLEL=1` on MLX/nvfp4 until the stall bug is resolved. Monitor for silent hangs on Vulkan/ROCm backends—consider fallback to CPU or CUDA where possible.  
- **Future-Proofing**: Expect more granular control over memory, quantization, and model behavior. Leverage the new `thinking` metadata to expose configurable reasoning depth in your app’s UI.

---  
*Data sourced from GitHub: ollama/ollama • Updated: 2026-09-19*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-09-19**

---

### **1. Today's Highlights**  
The LiteLLM project continues to deepen its enterprise-grade infrastructure capabilities, with critical updates to budgeting, authentication, and proxy security. Key developments include the introduction of *budget rollover* for unused allowances, enhanced support for private repository skill integration via SSH/GitHub tokens, and a major refactor of MCP (Model Control Protocol) integration to maintain backward compatibility while enabling future protocol evolution.

---

### **2. Releases & Breaking Changes**  
- **v1.103.0-dev.2** released with improved Docker image signing via [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). All images are now signed using Sigstore, ensuring integrity across deployments.  
  🔗 [GitHub Release v1.103.0-dev.2](https://github.com/BerriAI/litellm/releases/tag/v1.103.0-dev.2)

> **Note**: No breaking changes in API or config were introduced in this release; the focus remains on security hardening and internal stability.

---

### **3. New Model & Hardware Support**  
- **OpenRouter**: Added support for two newly listed models (`gpt-5.6-sol`, `kimi-k2.6`) in `model_prices_and_context_window.json` via PR [#41833](https://github.com/BerriAI/litellm/pull/41833).  
- **Azure AI Foundry**: Fixed handling of `flux.2-pro` image edit requests that previously ignored `width`/`height` due to incorrect parameter forwarding ([#36644](https://github.com/BerriAI/litellm/issues/36644)).  
- **GitGot**: Now supported as a JSON-configured OpenAI-compatible provider ([#40810](https://github.com/BerriAI/litellm/pull/40810)).

---

### **4. Performance & Optimization**  
- **Streaming Guardrails**: A fix has been merged to prevent false positives when sensitive values are split across SSE chunks ([#41611](https://github.com/BerriAI/litellm/issues/41611)), improving reliability during real-time content filtering.  
- **Cost Calculation CI**: Introduced a new test shard to validate cost calculations across multiple usage types (cache, reasoning, audio, web-search), reducing risk of undetected pricing drift ([#41328](https://github.com/BerriAI/litellm/pull/41328)).  
- **HTTP/2 Support**: While not yet implemented, a feature request exists to enable HTTP/2 for outbound requests to upstream providers ([#30362](https://github.com/BerriAI/litellm/issues/30362)) — expected to improve latency under high concurrency.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix/PR | Description |
|------|----------|--------|--------|-------------|
| [#24677](https://github.com/BerriAI/litellm/issues/24677) | High | Closed | N/A | TPM limiting fails for virtual keys despite correct configuration — re-emerged after prior fix. |
| [#39713](https://github.com/BerriAI/litellm/issues/39713) | Critical | Open | N/A | Per-customer RPM limits ignored once virtual key is cached — impacts billing accuracy. |
| [#41810](https://github.com/BerriAI/litellm/issues/41810) | Critical | Open | N/A | Virtual-key model allowlist bypass via `?model=` query string — potential security exposure. |
| [#41792](https://github.com/BerriAI/litellm/issues/41792) | High | Open | N/A | Bedrock rejects encrypted reasoning after intentional model switch due to affinity mismanagement. |
| [#41793](https://github.com/BerriAI/litellm/issues/41793) | High | Closed | N/A | Encrypted-content affinity incorrectly treats different Bedrock models as compatible. |

> ⚠️ **Critical Security Note**: The `virtual-key model allowlist bypass` issue (#41810) suggests a potential path for unauthorized model access — teams should avoid exposing `/v1/chat/completions` with untrusted query parameters until resolved.

---

### **6. What This Means for Application Developers**  
- **Use caution with query-string model overrides** — the `?model=` parameter can currently bypass virtual key restrictions. Avoid relying on it in production environments until #41810 is fixed.  
- **Enable budget rollover** via `rollover_max_budget` (PR #41693) to reduce waste in variable-usage scenarios like personal or team budgets.  
- **Integrate with private repos** using GitHub tokens or SSH keys (feature request #26071) to extend agent capabilities securely.  
- **Monitor encrypted reasoning behavior** carefully when switching between Bedrock models — current affinity logic may cause silent failures ([#41792](https://github.com/BerriAI/litellm/issues/41792)).  
- **Upgrade your dashboard** — PR #40429 introduces an upgrade banner showing latest changelog stats, helping admins stay informed about improvements and fixes.

👉 **Recommended Actions**: Audit virtual key policies, verify budget enforcement, and monitor for unexpected model switches in long-running sessions.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-19**

#### **1. Today's Highlights**  
The v0.1.811-beta release delivers major advances in multi-user support, AMD ROCm and ARM64 CUDA Windows compatibility, and a critical 2x speedup for `Qwen3.8-Flash-Next` via MTP hotfix. This update strengthens Unsloth’s position as a full-stack AI inference and training platform across diverse hardware.

#### **2. Releases & Breaking Changes**  
- **v0.1.811-beta**: Released with Docker multi-user support, RDNA1+/RDNA2 GPU acceleration, FP8/INT8 diffusion support, ARM64 CUDA on Windows, and enhanced training/inference performance.  
  🔗 [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.811-beta)  
- **MTP Hotfix**: `Qwen3.8-Flash-Next` now runs **2x faster** due to optimized MTP kernel handling. Users should upgrade to avoid degraded performance.  
  🔗 [Issue #11143](https://github.com/unslothai/unsloth/issues/11143)

#### **3. New Model & Hardware Support**  
- **AMD ROCm**: Full support for RDNA1+ (e.g., RX 7900 XTX, Radeon Pro W7900) with new Docker image (`studio:rocm`).  
  🔗 [PR #11286](https://github.com/unslothai/unsloth/pull/11286)  
- **ARM64 CUDA on Windows**: Experimental support for ARM64-based GPUs under Windows via CUDA.  
- **GGUF Quantization**: Expanded support for `UD-IQ4_XS`, `UD-Q4_K_XL`, and `DFlash` sidecars with `--split-mode tensor` (ROCm fixes pending upstream).  
- **New Model Architectures**: Initial support for **Kimi K3** (via Issue #11078), though fine-tuning remains unconfirmed.  

#### **4. Performance & Optimization**  
- **2x Speedup**: `Qwen3.8-Flash-Next` MTP inference is now **2x faster** post-hotfix (issue #11143).  
- **Inference Throughput Regression**: Users report **slower GGUF inference after v0.1.810-beta**, particularly on Studio (issue #11221).  
  🔗 [Issue #11221](https://github.com/unslothai/unsloth/issues/11221)  
- **Memory Efficiency**: Offloading to CPU/GPU with `Q8` KV cache and `--ctx-checkpoints 64` shows stable memory use on RTX 5090 (issue #11278).  
- **API Concurrency Control**: New `UNSLOTH_API_MAX_CONCURRENCY` config added to limit parallel requests (PR #5482).

#### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|------------|
| 🔴 Critical | [#11143](https://github.com/unslothai/unsloth/issues/11143) | `Qwen3.8-Flash-Next` MTP aborts at load due to `nextn.hc_head_norm` rebase bug | ✅ In progress (hotfix in v0.1.811-beta) |
| 🔴 Critical | [#11219](https://github.com/unslothai/unsloth/issues/11219) | MTP drafter crashes on RTX 5080 with `ggml_can_repeat(b, a)` assertion | ⚠️ Reproduced; no fix yet |
| 🟡 High | [#11308](https://github.com/unslothai/unsloth/issues/11308) | DFlash sidecar + `--split-mode tensor` asserts on ROCm (gfx1201) | ✅ Upstream fix exists (#27858); waiting for merge |
| 🟡 Medium | [#11221](https://github.com/unslothai/unsloth/issues/11221) | Post-v0.1.810-beta GGUF throughput regression | ❌ No PR yet |
| 🟡 Medium | [#11184](https://github.com/unslothai/unsloth/issues/11184) | Vulkan training/fine-tuning not supported | ❌ Feature request open |

#### **6. What This Means for Application Developers**  
- **Optimize for MTP**: Upgrade to v0.1.811-beta immediately if using `Qwen3.8-Flash-Next`—expect **~2x inference speedup** with minimal code changes.  
- **Avoid v0.1.810-beta for GGUF**: If latency is critical, hold off on updating until the regression in #11221 is resolved.  
- **Cross-Platform Deployment**: Use the new Docker images (`:rocm`, `:cuda`) for consistent AMD/NVIDIA deployments—especially valuable for cloud or edge inference.  
- **Security & Isolation**: The updated host allowlist enforcement (PR #11172) ensures Python tools can’t bypass network restrictions—critical for sandboxed agent environments.  
- **Future-Proofing**: Monitor PRs like #5933 (Muon optimizer) and #11286 (JupyterLab in ROCm image) for advanced training and debugging workflows.

> 💬 *Pro Tip:* For Windows users, avoid App Execution Aliases (PR #5959) and ensure `python.exe` resolution isn’t blocked by system stubs—common cause of silent failures.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*