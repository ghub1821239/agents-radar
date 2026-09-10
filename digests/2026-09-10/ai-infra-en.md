# AI Infrastructure Digest 2026-09-10

> Generated: 2026-09-10 00:33 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-10**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of deep specialization and hardware convergence, with major projects advancing toward production-grade reliability across diverse backends—NVIDIA, AMD ROCm, Intel SYCL, and Apple Silicon. vLLM leads in high-performance GPU-serving innovation, while SGLang and llama.cpp push boundaries in multi-node orchestration and edge/local deployment. LiteLLM solidifies its role as the enterprise-grade gateway layer, emphasizing observability and routing resilience. Unsloth focuses on accelerating fine-tuning and local inference, particularly for MoE and diffusion models. Together, these tools reflect a maturing stack where performance, portability, and operational robustness are now prioritized over raw feature velocity.

---

### **2. Activity Comparison**  

| Project       | Issues (Open) | PRs (Open) | Release Status         |
|---------------|----------------|--------------|--------------------------|
| vLLM          | 47             | 38           | v0.29.0 (stable, default MRV2) |
| SGLang        | 52             | 41           | v0.5.14 (no new release)   |
| llama.cpp     | 68             | 55           | No formal release; active dev |
| Ollama        | 61             | 49           | v0.32.10+ (regression-prone) |
| LiteLLM       | 56             | 43           | v1.102.0-dev.1 (signed images) |
| Unsloth       | 72             | 58           | v0.1.808-beta (beta)      |

> ✅ *Trend*: High open-issue counts correlate with aggressive architectural changes (e.g., vLLM’s MRV2 rollout, SGLang’s DCP stability work), indicating active but risky innovation cycles.

---

### **3. Model Support Race**  

| New Model / Architecture       | Supported By                          | Key Differentiator |
|----------------------------------|----------------------------------------|--------------------|
| **Qwen3.8-Flash-Next (FP8 KV)** | vLLM ✅, llama.cpp ✅                  | vLLM: full QSA path + auto-sizing; llama.cpp: RDNA4 shader support |
| **GigaChat 3.5 Reasoning**     | vLLM ✅                                | Native tool-calling & reasoning support |
| **Kimi-K3 DSpark (AITER)**     | vLLM ✅, SGLang ✅                      | vLLM: gfx950 ROCm; SGLang: `aiter` backend on AMD |
| **MiniMax-M3 (FP8 indexing)**  | vLLM ✅                                | SM120+ + ROCm kernel fusion |
| **GLM-5.3-Flash (MoE + Vision)** | vLLM ✅, SGLang ✅, llama.cpp ✅, Ollama ❌ (in progress) | Most widely supported; vLLM/SGLang lead in MoE routing |
| **Gemma-4 (on AMD)**           | SGLang ✅, llama.cpp ✅                | SGLang: `aiter` backend; llama.cpp: Vulkan optimization |
| **Ornith / Jamba / Step 3.7**   | Ollama 🟡 (requested)                  | Demand-driven; no native support yet |

> 🏆 **Leader**: **vLLM** maintains the broadest and most advanced model support, especially for hybrid Mamba/GDN, MoE, and FP8-optimized architectures.  
> 🔥 **Emerging Contenders**: **SGLang** and **llama.cpp** show strong momentum in heterogeneous backend adoption (ROCm, Vulkan).

---

### **4. Performance Frontier**  

| Focus Area                 | Primary Drivers                                                                 | Notable Advances |
|----------------------------|-----------------------------------------------------------------------------------|------------------|
| **KV Cache Efficiency**    | vLLM (FP8 E4M3 on GB10), SGLang (weight cache daemon)                              | vLLM: 2x larger KV pools via CUDA graph profiling; SGLang: <1s load time |
| **Quantization & Kernels** | vLLM (FP8 indexing), llama.cpp (iq4_xs shaders), Unsloth (Vulkan ROCm)            | llama.cpp: +6–17% speed on RDNA4; Unsloth: 20% ROCm uplift |
| **Batching & Batching**    | vLLM (speculative decoding), SGLang (DCP), LiteLLM (auto-router fallbacks)       | vLLM: EAGLE3 CPU offset reuse; SGLang: DCP planner stability |
| **Distributed Serving**    | SGLang (multi-node, MoE routing), LiteLLM (auto-router resilience)               | SGLang: MTP/MoE GEMM unification; LiteLLM: tier health fallback |
| **Fine-Tuning Speed**      | Unsloth (2x faster updates), vLLM (MRV2 scheduling)                               | Unsloth: SAC/AV false positive fix; vLLM: async scheduling |

> ⚙️ **Key Insight**: The performance frontier has shifted from raw throughput to **memory efficiency**, **cold-start latency**, and **resilience under failure**—especially in multi-GPU and agent-driven workflows.

---

### **5. Layer Positioning**  

| Project       | Core Layer                    | Role Summary |
|---------------|-------------------------------|-------------|
| **vLLM**      | **Inference Engine**          | Low-level, high-throughput GPU serving engine with advanced scheduling and memory management |
| **SGLang**    | **Multi-Backend Orchestrator**| Distributed inference framework enabling cross-backend execution (NVIDIA/AMD/Intel) with DCP and speculative decoding |
| **llama.cpp** | **Local Runtime / Edge Inference** | Lightweight, cross-platform inference runtime focused on CPU/GPU offloading and low-footprint deployment |
| **Ollama**    | **User-Facing Gateway**       | Developer-friendly CLI/API layer with model lifecycle management; evolving into a cloud-native gateway |
| **LiteLLM**   | **Production Gateway / Router**| Enterprise-grade API gateway with routing, cost control, observability, and multi-provider integration |
| **Unsloth**   | **Fine-Tuning & Local Training Accelerator** | Optimized training pipeline for LoRA, QLoRA, and diffusion models with focus on Windows and local UX |

> 💡 **Architectural Insight**: A clear **layered stack** is emerging:  
> - **Engine** (vLLM) → **Orchestrator** (SGLang) → **Gateway** (LiteLLM/Ollama) → **Training** (Unsloth)  
> This enables composability: e.g., use vLLM as backend for LiteLLM or SGLang.

---

### **6. Trend Signals**  

#### 🔍 **Industry Trends Extracted from Today’s Activity**:
1. **Hardware Convergence**: AMD ROCm and Intel SYCL are no longer niche—they’re central to next-gen deployments (SGLang, vLLM, Ollama). Projects are investing heavily in kernel fusion, sparse attention, and unified memory abstractions.
2. **FP8 & Quantization at Scale**: FP8 E4M3 is becoming standard for large models (Qwen3.8-Flash-Next, MiniMax-M3), enabling higher context lengths without precision loss.
3. **Cold-Start Optimization**: Weight caching (SGLang) and image signing (LiteLLM) signal growing importance of **startup latency** and **supply chain security** in production systems.
4. **Agent Reliability Over Speed**: High-severity bugs in speculative decoding (vLLM, SGLang) and tool call handling (Ollama) highlight that **determinism and correctness** are now critical differentiators.
5. **Heterogeneous Deployment is Now Standard**: With support spanning NVIDIA, AMD, Intel, Apple, and even mobile GPUs (Adreno), developers must design for backend diversity from day one.

#### 🛠️ **What Application Developers Should Watch**:
- **Avoid speculative decoding on GB10 (sm_121)** until vLLM fixes land (Issue #54173).
- **Validate tool call logic** when using `gemma4:cloud`—silent failures due to placeholder collisions are confirmed (PR #18355).
- **Use weight cache daemons** (SGLang) and **cosign-signed images** (LiteLLM) for production stability.
- **Prepare for multi-backend deployments**—design your app to handle differences in quantization, memory layout, and error semantics.
- **Monitor VRAM leaks** in MoE/DSPARK scenarios (llama.cpp, vLLM, Unsloth)—critical for long-running agents.

> ✅ **Final Takeaway**: The infrastructure layer is no longer just about speed—it’s about **predictability, portability, and operational integrity**. Choose tools not just for performance, but for their ability to fail safely and recover quickly.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-10**

---

#### **1. Today's Highlights**  
The vLLM team shipped **v0.29.0**, marking the full rollout of **Model Runner V2 (MRV2)** as the default for all models, completing a major architectural transition initiated with pooling support in v0.27. This release includes critical improvements to CUDA graph memory profiling for KV cache auto-sizing and resolves several high-severity bugs affecting Qwen3.8-Flash-Next and speculative decoding on GB10 (sm_121) hardware.  

---

#### **2. Releases & Breaking Changes**  
- **v0.29.0** is now live: [GitHub Release](https://github.com/vllm-project/vllm/releases/tag/v0.29.0)  
- **Model Runner V2 is now the default engine for all models**, including hybrid Mamba/GDN and MoE configurations.  
  - *Migration Note:* Users relying on legacy behavior (e.g., `--no-async-scheduling`, custom scheduling logic) should verify compatibility.  
  - *Key Change:* MRV2 enables automatic KV cache auto-sizing via CUDA graph memory profiling — improves resource utilization under variable load.  
  - *Breaking:* The `--block-size` parameter may behave differently in prefix-caching scenarios due to tighter alignment requirements.

---

#### **3. New Model & Hardware Support**  
- **Qwen3.8-Flash-Next**: Full support for FP8 E4M3 KV cache on the QSA path (via PR #54426), enabling ~2x larger KV pools on GB10 GPUs.  
- **Kimi-K3 DSpark**: Added AITER mask0 decode support on gfx950 ROCm devices ([PR #56051](https://github.com/vllm-project/vllm/pull/56051)).  
- **MiniMax-M3**: Expanded support for FP8 indexing on SM120+ devices ([PR #56151](https://github.com/vllm-project/vllm/pull/56151)), and ROCm kernel fusion for packed LBHNC AITER QK-norm ([PR #54535](https://github.com/vllm-project/vllm/pull/54535)).  
- **GigaChat 3.5 Reasoning**: Added native tool-calling and reasoning support ([PR #56173](https://github.com/vllm-project/vllm/pull/56173)).  
- **ROCm**: Continued convergence with AMD’s roadmap (see [Issue #44091](https://github.com/vllm-project/vllm/issues/44091)) — focus on sparse attention, fused kernels, and DFlash2 integration.

---

#### **4. Performance & Optimization**  
- **KV Cache Efficiency**: FP8 E4M3 support on Qwen3.8-Flash-Next increases effective KV pool size by ~2x on GB10 (sm_121) without sacrificing precision ([PR #54426](https://github.com/vllm-project/vllm/pull/54426)).  
- **Triton Kernel Improvements**:  
  - Fixed memory misalignment in per-head scale packing (128B boundary issue) for int8 KV caches ([PR #56164](https://github.com/vllm-project/vllm/pull/56164)).  
  - Enabled FP32 router on SM120 for small-batch linear ops ([PR #56152](https://github.com/vllm-project/vllm/pull/56152)).  
- **Speculative Decoding**:  
  - Reused CPU query offsets across drafts in EAGLE3 to reduce overhead ([PR #56147](https://github.com/vllm-project/vllm/pull/56147)).  
  - Consolidated MTP/DSpark PCP support and added foundational work for replicated drafters ([PR #56107](https://github.com/vllm-project/vllm/pull/56107)).  
- **Build Pipeline**: Default CUDA build updated from 13.0 to 13.2 to match PyTorch 2.13.0’s cu132 wheels ([PR #55387](https://github.com/vllm-project/vllm/pull/55387)).

---

#### **5. Stability & Regressions**  
- **Critical Bug (High Severity)**: `Qwen3.8-Flash-Next` exhibits non-deterministic greedy decoding when prompt length nears `indexer_budget`, due to persistent_topk instability in sparse attention path ([Issue #54521](https://github.com/vllm-project/vllm/issues/54521)) — affects deterministic inference at scale.  
- **GPU Crash**: `CUBLAS_STATUS_INTERNAL_ERROR` / illegal memory access on GB10 (sm_121) during prefix caching in GDN path ([Issue #54173](https://github.com/vllm-project/vllm/issues/54173)) — blocks use of hybrid Mamba models on next-gen NVIDIA GPUs.  
- **Memory Leak**: v0.28.0/v0.29.0 consume all host memory at startup on some systems ([Issue #54237](https://github.com/vllm-project/vllm/issues/54237)) — confirmed reproducible on Ubuntu 26.04.1 + WSL2.  
- **Model Load Failure**: GLM5.3-Flash fails to load checkpoints in v0.29.0 due to worker process crash ([Issue #56007](https://github.com/vllm-project/vllm/issues/56007)).  
- **Fixes in Progress**:  
  - PR #56164 addresses memory alignment in Triton attention (`fix(triton_attn)`).  
  - PR #55977 fixes FlexAttention OOMs caused by block-mask memory scaling with KV cache size.

---

#### **6. What This Means for Application Developers**  
- **Adopt MRV2 early**: It’s now the default — expect better memory efficiency and auto-sizing, but validate your workflows (especially with `--block-size`, prefix caching, and spec decode).  
- **Use FP8 KV cache aggressively** on Qwen3.8-Flash-Next and future models: Enables higher context throughput and reduced memory footprint.  
- **Avoid speculative decoding on GB10 (sm_121) until fixes land**: Known crashes in GDN path and non-determinism in QSA path can break agent reliability.  
- **Monitor for host memory leaks**: If upgrading to v0.28+/v0.29.0, ensure system has sufficient RAM and consider rolling back if memory exhaustion occurs.  
- **Leverage new model support**: GigaChat 3.5 and Kimi-K3 DSpark are ready for production inference pipelines — prioritize these for agentic or multilingual applications.  
- **Prepare for heterogeneous deployments**: With expanding ROCm and Intel XPU support, design your orchestration layers to handle backend-specific behaviors (e.g., quantization, memory layout).

> 🔗 **Stay Updated**: Follow [vLLM GitHub Issues](https://github.com/vllm-project/vllm/issues) and [PRs](https://github.com/vllm-project/vllm/pulls) for real-time fixes and feature progress.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-10**

---

### **1. Today's Highlights**  
The SGLang project continues to advance multi-node, multi-backend inference with significant progress in AMD/ROCm support and DCP (Decoding Compute Partitioning) stability. Key developments include the introduction of `aiter` backend support for AMD, improvements to MTP/MoE routing efficiency, and ongoing work on fast engine recovery via a weight cache daemon—reducing load times from ~300s to under 1s on Qwen3-235B FP8.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The latest stable version remains `0.5.14`, though several PRs aim to improve CI reliability and configuration handling (e.g., #38753, #38736).

---

### **3. New Model & Hardware Support**  
- ✅ **AMD ROCm Support**: Expanded DCP and `aiter` backend support for AMD GPUs (PR #34432).  
- ✅ **Gemma-4 on AMD**: Added `aiter` attention backend support (PR #38758), enabling efficient inference on ROCm.  
- ✅ **GLM-5.3-Flash on SM120**: Tracking required fixes for deployment on two 96GB RTX PRO 6000 Blackwell GPUs (Issue #37813).  
- ✅ **SenseNova-U1/U1.5**: Active feature tracking for integration (Issue #37742), using OpenSenseNova/SenseNova-U1 as reference.  
- ✅ **Diffusion Models**: Ongoing work to support new models like *omni-dreams* and implement image number limits (Issues #27214, #8540).

---

### **4. Performance & Optimization**  
- 🔥 **Weight Cache Daemon (Phase 1)**: Weight load time reduced from **~306–327s → <1s** on Qwen3-235B FP8 via per-rank CUDA IPC daemon (Issue #33522, blog [here](https://www.lmsys.org/blog/2026-08-21-sglang...)).  
- ⚙️ **MoE Router GEMM Unification**: Proposal to unify MoE router GEMM under one gate layer for better precision control (Issue #38695).  
- 📈 **Tiny GEMM Regression**: A recent change (`tiny_gemm`) caused a **~4% decode regression** on DeepSeek-R1 NVFP4 on Blackwell (Issue #38628); fix pending.  
- 💡 **Sparse Expert Fusion (DSV4)**: Work underway to fuse shared-to-sparse experts in MegaMoE (Issue #38700), targeting higher throughput.  
- 🧠 **MTP Draft Quantization**: Online MXFP4 quantization of draft experts for Qwen3.5 on AMD (PR #38748) improves memory efficiency.

---

### **5. Stability & Regressions**  
High-severity issues impacting production readiness:

| Issue | Description | Severity | Fix Status |
|------|-------------|----------|------------|
| [#33549](https://github.com/sgl-project/sglang/issues/33549) | DeepSeek-V4 TP=8 on 8×H20 hangs at ~245K context; GPUs spin at 100%, watchdog kills server | Critical | ❌ No fix yet |
| [#30209](https://github.com/sgl-project/sglang/issues/30209) | GLM-5.2 FP4 + EAGLE crashes with illegal memory access in flashinfer_trtllm BF16 batched-GEMM | Critical | ❌ No fix yet |
| [#34920](https://github.com/sgl-project/sglang/issues/34920) | Kimi-K3 decode crash in DCP planner due to `cumsum(extend_prefix_lens=None)` | High | ❌ No fix yet |
| [#38645](https://github.com/sgl-project/sglang/issues/38645) | Decode retraction crashes during CPU KV cache backup in PD-disaggregation setup | High | ❌ No fix yet |
| [#37606](https://github.com/sgl-project/sglang/issues/37606) | Prefill BCG reuses weak-ref'd inputs → wrong greedy output / IMA | Medium | ❌ No fix yet |

> Note: Several regressions are tied to speculative decoding (EAGLE/MTP/NEXTN) and MoE/DSPARK workflows.

---

### **6. What This Means for Application Developers**  
- **Use Case**: If you're building agents requiring low-latency restarts or high-throughput multi-node serving, **enable the weight cache daemon** (via `--use-weight-cache-daemon`) — it cuts cold-start time dramatically.
- **Avoid Pitfalls**: Be cautious with `--speculative-algorithm EAGLE/MTP/NEXTN` on complex models like GLM-5.2 or DeepSeek-V4 until fixes land (issues #30209, #33549).
- **Multi-Backend Flexibility**: With growing ROCm support (PRs #34432, #38758), consider migrating to AMD-based inference if cost/performance is a priority.
- **Model Agnosticism**: Use `session_id` metadata (PR #37482) for agent session persistence across multiple requests in DP deployments.
- **CI Reliability**: For internal tooling, expect occasional test flakiness (see #17050)—but the team is actively fixing them.

👉 **Actionable Tip**: Monitor PRs #38695 (MoE unification) and #38700 (DSV4 expert fusion) for upcoming performance boosts in large MoE models.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-10**

---

### **1. Today's Highlights**  
The latest updates focus on Vulkan and CUDA backend stability, with critical fixes for Intel GPU compute workgroup limits and MoE model support. Significant performance gains were introduced for RDNA4 GPUs via dedicated `iq4_xs` mat-vec shaders (~+6–17% token generation), while new support for GLM-5.3-Flash (GLM-5-Next) expands the model ecosystem.

---

### **2. Releases & Breaking Changes**  
- **Deprecation of legacy flags**: `--mmap`, `--mlock`, and `--dio` are officially deprecated (`#28334`) — users must migrate to modern memory management approaches.  
- **CUDA quantization control**: `GGML_FA_ALL_QUANTS` has been replaced by `GGML_FA_QUANTS`, enabling per-quantization compilation and runtime fallbacks (`#28079`).  
- **Return type fix**: `llama_sampler_chain_n` now returns `int32_t` consistently (`#28631`).

> 🔗 [GitHub PR #28334](https://github.com/ggml-org/llama.cpp/pull/28334) | [PR #28079](https://github.com/ggml-org/llama.cpp/pull/28079)

---

### **3. New Model & Hardware Support**  
- **New model support**: Added full support for **GLM-5.3-Flash (GLM-5-Next)** — a 321.3B hybrid linear/sparse-attention MoE with vision capabilities (`#27754`).  
- **Hardware optimizations**:  
  - RDNA4-specific `mul_mat_vec_iq4_xs` shader added for Vulkan (`#28426`)  
  - CUDA MMQ tile sizing tuned for RDNA3 architectures (`#28552`)  
  - OpenCL kernel added for `q4_0_f32_32b_trans_ila_a8_bin` on Adreno GPUs (`#28268`)  

> 🔗 [PR #27754](https://github.com/ggml-org/llama.cpp/pull/27754) | [PR #28426](https://github.com/ggml-org/llama.cpp/pull/28426)

---

### **4. Performance & Optimization**  
- **Vulkan (RDNA4)**: Dedicated `iq4_xs` mat-vec shader yields **+6–17% token generation speed** depending on model (`#28426`).  
- **CUDA**: MMQ tile size now dynamically adapts to expert width on RDNA3 (`#28552`), improving utilization.  
- **Top-K optimization**: CUB fallback now uses radix-select for wide rows (e.g., Qwen3.8 Flash), reducing overhead in speculative decoding (`#28671`).  
- **CPU (ARM I8MM)**: Optimized `q4_K vec_dot` for batch=1 reduces activation memory traffic by 256B/block and increases GFLOPS by **+34.3%** (`#28673`).  

> 🔗 [PR #28426](https://github.com/ggml-org/llama.cpp/pull/28426) | [PR #28671](https://github.com/ggml-org/llama.cpp/pull/28671)

---

### **5. Stability & Regressions**  
- **Critical crash fix**: `vulkan: FILL exceeding maxComputeWorkGroupCount` on Intel Arc GPUs (affects Qwen 3.8 Flash Next) resolved via 2D workload distribution (`#28592`).  
- **MoE KV cache allocation bug**: Fixed incorrect KV cache sizing for MTP draft contexts in DeepSeek2, GLM4_MOE, and Cohere2MOE (`#28630`).  
- **Model-specific issues**:  
  - `granite3 moe` parameter count parsing fixed (`#28632`)  
  - `qwen-next-flash` compute buffer overflow in multi-GPU setups reported (`#27953`)  
  - **Adreno 830**: `vkCreateComputePipelines` fails due to SPIR-V differences from NDK shaderc (`#28635`) — workaround pending.  

> 🔗 [PR #28592](https://github.com/ggml-org/llama.cpp/pull/28592) | [PR #28630](https://github.com/ggml-org/llama.cpp/pull/28630)

---

### **6. What This Means for Application Developers**  
- **Upgrade now**: Deprecation of `--mmap|mlock|dio` means legacy workflows will break in future releases — update configuration early.  
- **Leverage new backends**: Use `--gpu-ctx-size` + `--mtp` with MoE models (e.g., GLM-5.3-Flash) for efficient offloading; ensure Vulkan drivers are updated to r615 or later (`#28659`).  
- **Performance tuning**: Enable `GGML_FA_QUANTS` for finer-grained CUDA quant control; consider `iq4_xs` for RDNA4 deployments.  
- **Watch out for regressions**: If using Qwen3.8 Flash Next on Intel GPUs, avoid `FILL` kernels unless patched (`b10881`); monitor VRAM leaks in DSpark + MoE scenarios (`#27155`).  

> 🔗 [Issue #28635](https://github.com/ggml-org/llama.cpp/issues/28635) | [Issue #27155](https://github.com/ggml-org/llama.cpp/issues/27155)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-10**

---

### **1. Today's Highlights**  
A critical regression in the Vulkan backend for AMD GPUs (including Radeon 780M) has been reported, causing model loading failures on systems running Ollama ≥v0.32.10. Concurrently, a new bug in `gemma4:cloud` silently drops valid tool calls due to string placeholder collisions—fixes are already under review in PR #18355. On the positive side, Intel SYCL (oneAPI) support is now actively being implemented, expanding hardware compatibility for discrete Intel GPUs.

---

### **2. Releases & Breaking Changes**  
*None*  
No new releases or breaking API/config changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **Intel GPU Support (in progress):** PR #18333 introduces native Intel SYCL (oneAPI) runner pipeline and device discovery, enabling support for discrete Intel Arc GPUs (e.g., B70 32GB) under Linux. This marks a major expansion beyond CUDA, ROCm, and Metal.
- **Model Requests for Cloud:** Issue #17100 highlights demand for frontier models like *Ornith*, *Longcat 2.0*, *Jamba*, and *Step 3.7* to be available on Ollama Cloud by Q4 2026.

---

### **4. Performance & Optimization**  
- **VRAM Accounting Fix:** PR #18350 addresses a multi-GPU VRAM accounting bug where device names from discovery (`CUDA1`) did not match child process log names (`CUDA0`), leading to incorrect scheduling decisions. Fixes misallocation in complex setups.
- **Memory Leak in Serve:** Issue #18344 reports a persistent file descriptor leak per `/api/generate` request, accumulating over time and requiring server restarts—a high-priority fix needed for production stability.
- **MLX Compile Cache Noise:** PR #18335 resolves excessive error spam from MLX compile-cache checks on non-MLX hardware (Windows, no Apple Silicon/CUDA), improving logging clarity.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|-------|--------|------------|
| 🔴 High | [#18272](https://github.com/ollama/ollama/issues/18272) / [#17748](https://github.com/ollama/ollama/issues/17748) | Vulkan backend fails with "Not enough memory for command submission" on AMD iGPU (Radeon 780M) since v0.32.10; regression confirmed. | Open |
| 🔴 High | [#16506](https://github.com/ollama/ollama/issues/16506) | `gemma4:e2b` crashes at startup: `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS) failed`. | Open |
| 🟡 Medium | [#18354](https://github.com/ollama/ollama/issues/18354) | `gemma4:cloud` silently drops valid tool calls due to string placeholder collision (`NUL + comma + NUL` matches array boundary). | Fixed in PR #18355 (merged pending review) |
| 🟡 Medium | [#17878](https://github.com/ollama/ollama/issues/17878) | Embeddings return all-zero vectors under sustained load despite HTTP 200 and valid usage metrics—no diagnostic logs. | Open |
| 🟡 Medium | [#18352](https://github.com/ollama/ollama/issues/18352) | Context window slider capped at 256K despite availability of 1M-context models (e.g., GLM 5.3 Flash). | Open |

---

### **6. What This Means for Application Developers**  
- **Avoid AMD Vulkan on v0.32.10+** if using large models (>66 GB); use CPU or CUDA backends until #18272/#17748 are resolved.
- **Tool call reliability is at risk with Gemma4**: If your agent relies on structured tool calling via `gemma4`, validate outputs carefully—expect silent failures due to placeholder collisions. Use `gemma4:main` or wait for PR #18355.
- **Prepare for Intel GPU adoption**: With PR #18333, developers targeting high-end Intel Arc cards should test early using `--backend=sycl`.
- **Monitor context window limits**: The UI slider limitation (256K cap) prevents full utilization of 1M-context models—workarounds may require direct API use or config override.
- **Log hygiene matters**: Excessive MLX errors on Windows/non-Apple Silicon systems can obscure real issues—PR #18335 will clean up noise.

> ✅ **Actionable Takeaway:** Audit tool call handling logic for `gemma4`, avoid AMD Vulkan for now, and monitor PR #18355 for immediate fixes.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-10**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to mature with focused improvements in observability, routing resilience, and integration robustness. Key developments include enhanced support for `fal.ai` video models via a new feature request (#16073), critical fixes for auto-router health fallbacks (#40486), and improved debugging in MCP OAuth flows (#40454). These advances strengthen LiteLLM’s role as a production-grade inference orchestration layer.

---

### **2. Releases & Breaking Changes**  
- **v1.102.0-dev.1**: Released today with cryptographic verification via [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) — all Docker images are now signed using Sigstore. This is a foundational security enhancement; users should verify image signatures before deployment.  
  🔗 [GitHub Release v1.102.0-dev.1](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.1)

---

### **3. New Model & Hardware Support**  
- **New Feature Request**: Add support for **fal.ai video models** (Sora 2, Veo 3.1 Fast) via #16073. This would extend LiteLLM’s multimodal capabilities beyond text to high-fidelity generative video.  
  🔗 [Issue #16073: Request fal.ai Models Support](https://github.com/BerriAI/litellm/issues/16073)  
- **Ongoing Work**: Native **Vertex AI OCR** support added in PR #40466, enabling secure, isolated integrations with Google’s vision models.  
  🔗 [PR #40466: feat(ocr): add Vertex support](https://github.com/BerriAI/litellm/pull/40466)

---

### **4. Performance & Optimization**  
- **Auto-Router Resilience**: PR #40486 introduces fallback logic when an auto-router tier becomes unhealthy, preventing silent failures by defaulting to a healthy model. This improves availability under partial outages.  
  🔗 [PR #40486: fix(router): fall back from unhealthy auto-router tier](https://github.com/BerriAI/litellm/pull/40486)  
- **Memory Efficiency**: PR #40483 excludes large request context from parameter dumps during rerank operations, reducing proxy memory pressure and avoiding OOM crashes.  
  🔗 [PR #40483: fix(rerank): exclude proxy request from parameter dumps](https://github.com/BerriAI/litellm/pull/40483)  
- **Observability**: PR #40330 enables real-time visibility into auto-router decisions and session savings in Claude Code/Codex, aiding cost-aware agent development.  
  🔗 [PR #40330: feat(auto-router): show routed model and session savings](https://github.com/BerriAI/litellm/pull/40330)

---

### **5. Stability & Regressions**  
- **Critical Bug**: Per-customer RPM limits fail to apply once virtual keys are cached (#39713). This breaks budget enforcement in multi-tenant setups.  
  🔗 [Issue #39713: Per-customer RPM limits stop applying](https://github.com/BerriAI/litellm/issues/39713)  
- **High Severity**: `count_tokens` endpoint ignores `api_base` for Anthropic-compatible backends, breaking self-hosted vLLM deployments (#29764, #30217).  
  🔗 [Issue #29764](https://github.com/BerriAI/litellm/issues/29764) | 🔗 [Issue #30217](https://github.com/BerriAI/litellm/issues/30217)  
- **Regression**: Spend log cleanup fails silently on Kubernetes clusters with multiple replicas (#16582). No fix PR yet.  
  🔗 [Issue #16582: Spendlog Cleanup not working](https://github.com/BerriAI/litellm/issues/16582)  
- **Minor but Notable**: Prompt cache key does not update correctly when translating between Claude and OpenAI formats (#39145), risking stale caching.  
  🔗 [Issue #39145: prompt_cache_key derived from user_id never changes](https://github.com/BerriAI/litellm/issues/39145)

---

### **6. What This Means for Application Developers**  
Developers building agents or SaaS platforms on LiteLLM should:  
- **Verify image integrity** using cosign for v1.102.0-dev.1 and future releases to prevent supply chain risks.  
- **Avoid relying on per-customer rate limits** until #39713 is resolved — consider temporary workarounds like key rotation or custom middleware.  
- **Use the latest proxy version** to benefit from auto-router health fallbacks (#40486) and better memory management (#40483), especially in high-throughput environments.  
- **Monitor spend logs closely** — the current cleanup bug may lead to unbounded storage growth in Kubernetes deployments.  
- **Prepare for upcoming fal.ai and Vertex OCR support**, which will expand your ability to integrate cutting-edge multimodal services through a unified API surface.

> ✅ **Pro Tip**: Use `GET /auto_router/session` (via #40330) to instrument agent cost tracking directly in Claude Code/Codex workflows.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-10**

#### **1. Today's Highlights**  
The v0.1.808-beta release delivers substantial performance improvements across diffusion models (1.2–1.7x faster) and fine-tuning workflows, with a notable 20% AMD ROCm performance uplift via Vulkan acceleration. Critical fixes address Windows-specific issues including SAC/AV false positives and memory management in GGUF model loading, while ongoing UI/UX refinements enhance reliability in Studio.

#### **2. Releases & Breaking Changes**  
- **v0.1.808-beta**: Major performance and stability update for Unsloth. Includes kernel optimizations, bug fixes, and improved handling of multi-GPU and Windows environments.  
  🔗 [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta)

#### **3. New Model & Hardware Support**  
- **AMD Strix Halo APU (gfx1151)**: Partial support now available after fixing incorrect system RAM restrictions during model loading.  
  🔗 Issue #6834  
- **Intel Arc B580**: Identified issue resolved—`torch.xpu.memory.mem_get_info()` was unsupported; patch pending upstream or via workaround.  
  🔗 Issue #3533  
- **Apple Silicon (M-series)**: Still on roadmap; high demand (118 comments, 644 likes). No progress reported yet.  
  🔗 Issue #4  

#### **4. Performance & Optimization**  
- **Diffusion Inference**: 1.2–1.7x speedup across the board.  
- **AMD ROCm + Vulkan**: 20% performance gain over standard ROCm paths.  
- **Fine-tuning Update Speed**: 2x faster parameter updating, with removal of SAC/AV false positives on Windows.  
- **GGUF Export & Load**: Optimized memory mapping logic to prevent resident file mappings on Windows (`unmap_fragment` no-op fix).  
  🔗 PR #10618  

#### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| High | **OOM on Qwen3-Coder-Next-Base (2xA100)** | Training fails due to VRAM exhaustion despite sufficient GPU capacity. | 🔗 Issue #4040 |
| High | **Gemma 3n: Recursion depth exceeded** | Runtime crash during training on local setup. | 🔗 Issue #3650 |
| High | **System RAM not released in Unsloth Desktop (Windows)** | Even when model fits in GPU VRAM, large amounts of system RAM remain allocated post-load. | 🔗 Issue #9033 |
| Medium | **GGUF export failure (unsloth studio)** | Export process fails after successful training. | 🔗 Issue #4845 |
| Medium | **"min_p and logit_bias not supported" with vLLM** | Client-side error when connecting to external vLLM server. | 🔗 Issue #10573 |
| Low | **ZeroDivisionError: All labels are -100** | Training loss is zero due to invalid label distribution. | 🔗 Issue #2364 |

> ✅ *Fixes in progress*: Multiple PRs targeting memory leaks, caching inefficiencies, and dependency resolution (e.g., PR #10650, #10651).

#### **6. What This Means for Application Developers**  
- **Optimize for AMD GPUs**: Use `vulkan` backend for best performance on ROCm systems—expect ~20% gains.  
- **Avoid OOM on QLoRA**: Monitor VRAM usage carefully with large models like Qwen3-Coder-Next-Base; consider smaller batch sizes or gradient checkpointing.  
- **Use Studio’s Background Prefetch**: The new `prefetch-update` feature ensures smoother updates even under network constraints.  
- **Handle GGUF Memory Mapping**: On Windows, avoid "Don’t reserve system RAM" if you're using large models—current behavior may cause persistent memory bloat.  
- **Validate Export Pipelines**: Exporting trained models to GGUF remains fragile; test with small models before production use.  

🔧 *Best Practice*: Always run `studio update` in offline mode (`UV_OFFLINE=1`) if PyPI access is unreliable—this preserves verified installs.  
🔗 [PR #10651](https://github.com/unslothai/unsloth/pull/10651) | [PR #10653](https://github.com/unslothai/unsloth/pull/10653)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*