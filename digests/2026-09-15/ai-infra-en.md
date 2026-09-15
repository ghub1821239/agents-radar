# AI Infrastructure Digest 2026-09-15

> Generated: 2026-09-15 00:52 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-15**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q3 2026 is defined by rapid convergence toward high-throughput, agent-native execution with deep hardware specialization. Projects are increasingly focused on enabling scalable agentic workflows through distributed KV caching, speculative decoding, and multi-modal support—especially for emerging MoE and hybrid GDN architectures. Critical stability fixes dominate activity across all major players, reflecting the growing maturity of production-grade LLM serving. Meanwhile, a clear bifurcation is emerging between *distributed inference engines* (vLLM, SGLang) and *local-first runtime platforms* (llama.cpp, Ollama), each optimizing for distinct deployment models.

---

### **2. Activity Comparison**

| Project       | Open Issues | PRs Merged (Last 24h) | Releases (Last 24h) | Notes |
|---------------|-------------|------------------------|----------------------|-------|
| **vLLM**      | 128         | 14                     | None                 | Heavy focus on DeepSeek-V4.1 & MoE stability; critical crashes under H20/MoE paths |
| **SGLang**    | 135         | 9                      | None                 | High severity regressions on B300/H20; CI instability reported |
| **llama.cpp** | 97          | 12                     | v0.4.1               | New model support (Maple, Hy 4, Spark2.5); GPU backend improvements |
| **Ollama**    | 142         | 6                      | v0.34.1-rc1          | RC release with MLX memory fixes; edge platform stability concerns |
| **LiteLLM**   | 89          | 5                      | None                 | Focus on cost accuracy and proxy stability; critical billing bugs |
| **Unsloth**   | 103         | 8                      | None                 | UX polish and Docker/model discovery enhancements |

> ✅ *Observation:* Despite no new releases in most projects, **vLLM and llama.cpp** show the highest technical velocity, driven by model-specific optimizations and backend refinements.

---

### **3. Model Support Race**

| Project       | New Models / Architectures Added | Key Differentiators |
|---------------|----------------------------------|---------------------|
| **llama.cpp** | Maple 20B-A1B, Tencent Hy 4, Spark2.5, SenseNova U1 (multimodal) | Leading in *on-device multimodal support*; strong CPU/GPU portability |
| **SGLang**    | SenseNova-U1/U1.5, DeepSeek V4.1 (FP4 KV cache proposal), Qwen3.8-Flash-Next-FP8 | Early adopter of *packed FP4 KV storage* and *distributed agent workloads* |
| **vLLM**      | DeepSeek-V4.1-Flash (full FlashMLA support), MoE kernel fixes | Most advanced *MoE routing and speculative decoding integration* |
| **Ollama**    | No new models; focus on MLX/Jetson stability | Prioritizing *edge and Apple Silicon reliability* over new model intake |
| **LiteLLM**   | Gemma 4 (via Mantle), Microsoft Agent 365 MCP guardrails | Expanding *enterprise security and tool-call governance* |
| **Unsloth**   | AMD ROCm feature branch, local model detection in Docker | Driving *open ecosystem access* via Docker + external model mounting |

> 🏆 **Winner**: **llama.cpp** leads in breadth and diversity of *new model support*, particularly in multimodal and non-NVIDIA environments.  
> 🚀 **Emerging Leader**: **vLLM** is ahead in *architectural innovation*—especially with MoE and FlashMLA optimizations.

---

### **4. Performance Frontier**

| Optimization Focus           | Primary Drivers | Key Evidence |
|------------------------------|-----------------|--------------|
| **KV Cache Management**      | vLLM, SGLang, Unsloth | DFlash degradation at 185k context (vLLM), HiCache tiering risks (SGLang), prefix cache eviction (Ollama) |
| **Speculative Decoding**     | vLLM, SGLang    | DFlash slowdown (vLLM #54691), `fi_a2a` default in SGLang |
| **Quantization & Memory**    | llama.cpp, Ollama, LiteLLM | Q2_0 GGUF fix (Ollama), SYCL radix-select (llama.cpp), FP4 KV (SGLang) |
| **Distributed Serving**      | SGLang, vLLM    | Helix DCP, shared-read barriers, sharded RDT setups |
| **Kernel-Level Optimization**| vLLM, llama.cpp | FlashMLA kernels, FA swizzle refactoring, MKL-FA coalescing |

> 🔥 **Trend**: The performance frontier has shifted from raw throughput to *context scalability* and *memory efficiency*. Long-context inference (>100k tokens) is now a primary battleground, especially with MoE and hybrid GDN models.

---

### **5. Layer Positioning**

| Project       | Layer Role                     | Core Differentiator |
|---------------|--------------------------------|---------------------|
| **vLLM**      | **Inference Engine**           | Industry-standard for high-throughput, CUDA-optimized serving; dominant in cloud-scale deployments |
| **SGLang**    | **Agent-First Inference Engine** | Built for agentic workflows: DCP, distributed KV, structured output handling |
| **llama.cpp** | **Local Runtime / On-Device Inference** | Cross-platform, lightweight, ideal for edge devices and personal use |
| **Ollama**    | **Local Gateway / Developer CLI** | Simplified user experience; bridges local inference with agent tools |
| **LiteLLM**   | **Multi-Provider API Gateway** | Aggregates providers, enforces guardrails, enables cost-aware routing |
| **Unsloth**   | **Agent Studio / UX Platform** | Focuses on developer experience, sandboxing, and tool call fidelity |

> 📌 *Strategic Insight*: There is no single "best" stack—teams must choose based on deployment model:
- **Cloud/Scale**: vLLM or SGLang
- **Edge/Local**: llama.cpp or Ollama
- **Enterprise/API Abstraction**: LiteLLM
- **Agent Development**: Unsloth

---

### **6. Trend Signals**

#### 🔍 **Key Industry Trends Extracted from Today’s Activity**
1. **MoE and Hybrid GDN Models Are the New Battleground**  
   - vLLM and SGLang are racing to optimize MoE routing, expert offloading, and KV cache partitioning.  
   - **Developer Watch**: Monitor incremental MoE offloading (RFC #38256) and packed FP4 storage—these will determine viability of large models (e.g., Nemotron-3-Super-120B) on limited hardware.

2. **Long-Context Inference Is Now Production-Critical**  
   - DFlash slowdown at 185k context (vLLM), OOM on Jetson Orin (Ollama), and GLM-5.3 word salad (vLLM) indicate severe scalability challenges.  
   - **Developer Watch**: Avoid speculative decoding in long-context scenarios until per-sequence-length disable hooks are available.

3. **Hardware Portability Is No Longer Optional**  
   - AMD ROCm progress (vLLM, Unsloth), Ascend NPU tuning (SGLang), Apple MLX refinement (Ollama, Unsloth), and Intel Arc/SYCL improvements (llama.cpp) signal demand for cross-GPU compatibility.  
   - **Developer Watch**: Use `--gpu-memory-utilization` consistently and test on target hardware early.

4. **Agent Workflows Demand Deterministic State & Replay Fidelity**  
   - Unsloth’s replay identity, SGLang’s HiCache, and Ollama’s `OLLAMA_PREFILL_CACHE=1` all point to rising need for reproducible, auditable agent behavior.  
   - **Developer Watch**: Validate tool call ordering and reasoning trace persistence—silent data loss remains a risk.

5. **Cost Accuracy and Security Are Non-Negotiable in Enterprise**  
   - LiteLLM’s double-billing fix for Gemini embeddings and Unsloth’s permission prompts reflect growing pressure to audit spend and enforce sandboxing.  
   - **Developer Watch**: Enable guardrails, validate metadata dynamically, and avoid `previous_response_id` until fixed.

---

### ✅ **Recommendations for Application Developers**
- **Prioritize Stability Over Features**: Avoid `--enable-mixed-chunk`, DFlash speculative decoding, and `previous_response_id` until PRs are merged.
- **Future-Proof Your Stack**: Use dynamic model capability detection (Unsloth, LiteLLM) instead of hardcoded assumptions.
- **Test Across Hardware**: Validate performance on AMD, Apple Silicon, and Jetson—not just NVIDIA.
- **Monitor Proxy Behavior**: For LiteLLM and Ollama, ensure your cost tracking and streaming logic account for known state-loss issues.
- **Adopt Modular Design**: Leverage LiteLLM for abstraction, vLLM/SGLang for scale, and llama.cpp/Ollama for local execution.

> 🛠️ *Final Note:* The era of monolithic inference stacks is ending. Today’s best-in-class systems are **modular, multi-layered, and hardware-aware**—design accordingly.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-15**

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its support for DeepSeek-V4.1 and MoE architectures, with multiple PRs landing to enable FlashMLA KV records, SWA-bounded replay, and improved speculative decoding. Critical stability fixes were merged for ROCm (RDNA3) and CUDA (T4), while a high-severity crash in DFlash speculative decoding under long context was reported and is under active investigation.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*  
However, ongoing work on **DeepSeek-V4.1** integration suggests that future versions may introduce model-specific optimizations and behavioral changes related to MoE routing and KV caching.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1-Flash**: Native support expanded via PRs #56227 (encoder-side SWA bounded replay) and #56752 (decoder-side completion), enabling full FlashMLA V4.1 KV record usage and fused attention kernels (#56893).  
- **ROCm (AMD)**: Fixes landed for RDNA3 MoE kernel compatibility (#56790), AITER QK-norm fusion for MiniMax-M3 (#54535), and Ray NIXL agent initialization in sharded RDT setups (#56687).  
- **CPU & Multi-Modality**: Added `--cpu-memory-utilization` CLI alias to clarify GPU memory config intent (#56547); CI now sharding multimodal test folders (#56910).  
- **Intel GPU**: CI improvements for Intel GPU testing included in #56910.

---

### **4. Performance & Optimization**  
- **Speculative Decoding**: DFlash performance degrades significantly at 185k context length (~16 tok/s vs ~71 tok/s without spec), attributed to drafter re-scanning full accumulated KV cache per cycle (#54691). This highlights a need for per-sequence-length disable hooks.  
- **MoE Efficiency**: Incremental MoE expert offloading RFC (#38256) proposes LFRU eviction with cross-layer prediction to minimize cache misses — key for running large MoE models (e.g., Nemotron-3-Super-120B) on smaller hardware.  
- **KV Offload Tiering**: Data integrity and I/O liveness concerns raised for filesystem tiering (#54363), indicating risk of silent corruption or hang during I/O operations.  
- **Profiling**: CUDA graph capture profiling extended to V2 model runner and encoder path (#54061).

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR? | Link |
|------|----------|--------|---------|------|
| `illegal memory access` in `dsv4_topk` MoE kernel under high concurrency (H20, max_num_seqs > 256) | Critical | Open | No | [#56389](https://github.com/vllm-project/vllm/issues/56389) |
| DFlash speculative decoding slowdown at 185k context (Qwen3.5 hybrid GDN) | High | Open | No | [#54691](https://github.com/vllm-project/vllm/issues/54691) |
| GLM-5.3-Flash degenerates into "word salad" in agentic use | High | Open | No | [#56605](https://github.com/vllm-project/vllm/issues/56605) |
| FlashInfer + MTP speculative decoding crashes on SM121 (DGX Spark) with GQA=16 | Critical | Open | No | [#37754](https://github.com/vllm-project/vllm/issues/37754) |
| OTLP traces initialized but never sent due to missing manual instrumentation | Medium | Closed | Yes | [#56696](https://github.com/vllm-project/vllm/issues/56696) |

---

### **6. What This Means for Application Developers**  
- **Use caution with DeepSeek-V4.1** on AMD ROCm or high-concurrency H20 deployments until #56389 and #56790 are resolved.  
- **Avoid DFlash speculative decoding** for long-context (≥185k) inference on hybrid GDN models like Qwen3.5 — consider disabling or switching to alternative methods.  
- **Monitor MoE offloading behavior** closely when deploying large models on limited VRAM; incremental expert offloading (RFC #38256) may soon offer better control.  
- **Ensure proper configuration of `max_num_seqs`** when using DeepSeek-V4.1 on H20 GPUs to avoid crashes.  
- **Enable `VLLM_BATCH_INVARIANT=1` only after verifying sequence parallelism compatibility**, as batch invariance is broken when SP/async TP is enabled (#56370).  

> 📌 *Pro Tip:* Use `--gpu-memory-utilization` consistently across CPU/GPU contexts; the new `--cpu-memory-utilization` alias improves clarity but maps to the same underlying field.

---  
*Digest generated from GitHub data: [vllm-project/vllm](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-15

---

### **1. Today's Highlights**  
SGLang continues to advance its support for high-throughput agentic workloads with critical progress on distributed KV cache systems and decode context parallelism (DCP). Key stability fixes address CUDA illegal memory access issues on NVIDIA B300 and H20 hardware, particularly affecting FP8/MoE paths in Qwen3.8-Flash-Next-FP8 and DeepSeek-V4. The community is actively tracking performance regressions and CI test failures, indicating a strong focus on reliability ahead of major feature rollouts.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
- **Note:** Several PRs target configuration and backend behavior changes:
  - `--enable-mixed-chunk` now requires careful handling due to a reported corruption bug in Mamba radix cache checkpoints (#39342).
  - `SGLANG_FORCE_PREFILL_COARSE_WAR_BARRIER` is being introduced as a per-batch opt-out for shared-read completion, with defaults shifting toward stricter consistency (#37958).

---

### **3. New Model & Hardware Support**  
- **Model Support:**
  - **SenseNova-U1/U1.5**: Tracking support via #37742; reference implementation from OpenSenseNova/SenseNova-U1.
  - **DeepSeek V4.1**: Proposal to store main KV cache in packed FP4 on Hopper (#38902), targeting improved memory efficiency.
  - **Qwen3.8-Flash-Next-FP8**: Active performance and stability tracking on H20 TP8 (#37633).
- **Hardware & Backends:**
  - **AMD MI35x**: Added CI sweep for AgentX Qwen3.5 MXFP4 + MTP tp2 benchmarking (#38812).
  - **Ascend NPU**: Optimizations for PTPC FP8 KDA projections on gfx950 (#38764); sampling now avoids device sync (#39404).
  - **Apple Silicon**: Fixes applied for hybrid-SSM DP attention at low concurrency (#34535).
  - **NVIDIA Confidential Computing (CC)**: Performance patches for Blackwell CC environments to avoid scheduler stalls (#36810, #31447).

---

### **4. Performance & Optimization**  
- **Decode Context Parallelism (DCP):** Progress on Helix parallelism and fused A2A + FlashInfer-MNNVL communication backends; `fi_a2a` is now default (`--dcp-comm-backend`) (#29736).
- **Memory Efficiency:** 
  - HiCache DSA indexer storage optimized by compacting host-side index-K allocation only for producer layers (#38426).
  - Unified radix cache now downgrades MAMBA nodes instead of pruning them during eviction (#33713).
- **Kernel & Memory Pool:**
  - Fixed CPU backup/restore for widened KV IDs in MLA retraction (#39487).
  - Avoided unnecessary diffusion runtime loading during backend auto-detection (#39407).
- **Quantization & GEMM:**
  - Fixed Llama4 NVFP4 router input weight compatibility on SM120 (#35504).
  - TRT-LLM DSv4 attention integration planned for SM100/SM103 (#33636).

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|------------|-----------|
| 🔴 High | #37633 | Hard crash in QSA prefill path at ~22 concurrent requests (Qwen3.8-Flash-Next-FP8, H20 TP8) | [PR #39487](https://github.com/sgl-project/sglang/pull/39487) pending review |
| 🔴 High | #37559 | CUDA_ERROR_ILLEGAL_ADDRESS in MXFP8FP4/W4A8 MegaMoE path on B300 | No fix yet |
| 🔴 High | #39342 | `--enable-mixed-chunk` corrupts Mamba radix cache checkpoints on hybrid GDN models | [PR #39342](https://github.com/sgl-project/sglang/pull/39342) submitted |
| 🟡 Medium | #39147 | HiCacheFile reports unrecoverable prefix due to incorrect hybrid pool logic | [PR #39147](https://github.com/sgl-project/sglang/pull/39147) in progress |
| 🟡 Medium | #39072 | GLM-5.3 crashes under disagg decode + dp-attention + spec decode | No fix yet |

> ⚠️ **CI Pipeline Health**: 1 broken, 17 flaky, 1000 recently fixed tests tracked in #17050 — ongoing effort to stabilize infrastructure.

---

### **6. What This Means for Application Developers**  
- **Agentic Workloads:** Expect better scalability and lower latency with the rollout of distributed KV cache systems and DCP improvements. Ensure your deployments are prepared for PD disaggregation and HiCache’s evolving hybrid model support (#21846).
- **Hardware Portability:** If you're deploying on AMD MI35x or Ascend NPUs, recent CI updates mean stronger validation and performance tuning—leverage the new benchmarks and optimizations.
- **Stability Caution:** Avoid `--enable-mixed-chunk` until #39342 is merged if using Mamba-based hybrid models. Similarly, avoid `--disable-overlap-schedule` on H20/B300 unless strictly necessary.
- **Future-Proofing:** Monitor `SGLANG_FORCE_PREFILL_COARSE_WAR_BARRIER` and `--dcp-size > 1` configurations—these will likely become default behaviors in upcoming versions.

👉 **Action Items:**  
- Review PRs #39487, #39342, and #39147 for immediate impact on production stability.  
- Update CI pipelines to reflect new test status from #17050.  
- Test your models on B300/H20 with FP8/MoE configurations using latest `v0.5.13+` builds.  

[GitHub Repository](https://github.com/sgl-project/sglang) | [Issue Tracker](https://github.com/sgl-project/sglang/issues)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-15**

---

### **1. Today's Highlights**  
The `v0.4.1` release introduces support for **Maple 20B-A1B**, **Tencent Hy 4**, and **Spark2.5**, expanding the model ecosystem for on-device inference. Critical stability fixes address GPU memory corruption (Metal/CPU), SYCL scratchpad order issues, and Vulkan performance regressions, while API changes improve type safety and JSON schema handling.

---

### **2. Releases & Breaking Changes**  
- **v0.4.1**: Released with key improvements in logging, chat parsing, and child-process management.  
  - 📌 **API Change**: `llama_sampler_chain_n()` now returns `int32_t` instead of `int`.  
  - 🔗 [Release Notes](https://github.com/ggml-org/llama.cpp/releases/tag/v0.4.1) | [Attestation](https://github.com/ggml-org/llama.cpp/attestations/47450174)

---

### **3. New Model & Hardware Support**  
- ✅ **New Models**:  
  - **Maple 20B-A1B** ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - **Tencent Hy 4** ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - **Spark2.5** ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - **SenseNova U1** ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919)) – supports text, image, and multimodal generation.
- ✅ **Backend & Hardware**:  
  - HIP: Enabled `fp32` accumulation on CDNA devices via `fattn-mma` (#28576).  
  - SYCL: Added radix-select-based `TOP_K` for large `k`, enabling GPU-resident top-k (#28670).  
  - Vulkan: Ongoing fixes for performance drops and Flash Attention fallbacks (#24066, #28752).

---

### **4. Performance & Optimization**  
- ⚙️ **SYCL**:  
  - Coalesced MKL-FA softmax loads to reduce work-item overhead (#28918).  
  - Implemented radix select for `TOP_K` to avoid CPU round-trips (#28670).  
- ⚙️ **CUDA**:  
  - Refactored FA shared SMEM swizzle logic; WIP to optimize per-hardware behavior (#28536).  
  - Added support for contiguous unary kernels on CUDA (#28821).  
- ⚙️ **Memory**:  
  - Fixed double-addition of `mmproj` memory margin on sleep/resume (#28233).  
  - Improved `kv-cache` state handling with `LLAMA_STATE_SEQ_FLAGS_PARTIAL_ONLY` (#28873).

---

### **5. Stability & Regressions**  
- 🔴 **Critical Crashes / Regressions**:  
  - **SYCL multi-GPU crash** on Intel Arc Pro B50 + A770 (#27888) — *no fix PR yet*.  
  - **Vulkan performance drop** post-b10780 on RDNA3 GPUs (#28752) — *ongoing investigation*.  
  - **Metal heap corruption** due to PCH interference on macOS arm64 (#28858) — *fixed in b10955* (#28882).  
- 🟡 **Other Notable Issues**:  
  - Silent audio corruption on Metal under load (#28441).  
  - Garbled output when combining Vulkan + Hexagon backends (#28891).  
  - High SYCL scratchpad allocation (>2GB) with `ngram-mod` enabled (#28860).  

---

### **6. What This Means for Application Developers**  
- **Model Flexibility**: With new support for **Maple**, **Hy 4**, **Spark2.5**, and **SenseNova U1**, developers can now deploy diverse LLMs locally across modalities (text, image, audio) using a single stack.  
- **GPU Efficiency**: The SYCL and Vulkan optimizations enable better utilization of modern GPUs (Intel Arc, AMD RDNA3), especially for speculative decoding and high-k top-k sampling.  
- **Production Readiness**: Fixes to `mmproj`, `kv-cache`, and `state_read/write` ensure more reliable long-running inference sessions and agent workflows.  
- **API Caution**: Update code using `llama_sampler_chain_n()` to expect `int32_t` return value.  
- **Monitoring**: Use `/metrics` endpoint safely—fixes now exempt it from API-key checks (#28915).  

👉 **Action Items**:  
- Test latest `v0.4.1` builds with your models, especially if using SYCL/Vulkan.  
- Avoid `--device Vulkan0,HTP0` until #28891 is resolved.  
- Consider upgrading to `b10955+` to prevent Metal heap corruption on Apple Silicon.

🔗 [GitHub Repository](https://github.com/ggml-org/llama.cpp) | [Official Website](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-15**

---

### **1. Today's Highlights**  
The latest release, `v0.34.1-rc1`, introduces critical stability fixes for MLX-based inference on Apple Silicon and Jetson platforms, including prefix cache eviction improvements and OOM handling. Key bug reports highlight persistent crashes in long-context workflows and silent tool-call parsing failures—many of which are now being addressed via PRs targeting the core server and MLX runner logic.

---

### **2. Releases & Breaking Changes**  
- **`v0.34.1-rc1`**:  
  - ✅ *Fixed*: ChatGPT model selector UI spacing issue (app).  
  - ⚠️ *Behavioral change*: Token repeat limit increased to 100; invalid inputs now return an error instead of silently truncating.  
  - 🔧 *MLX runner*: Now checks system memory before loading models and evicts prefix cache snapshots proactively to prevent OOM during high-load scenarios.  
  - 🔗 [GitHub Release v0.34.1-rc1](https://github.com/ollama/ollama/releases/tag/v0.34.1-rc1)

---

### **3. New Model & Hardware Support**  
- 📌 **New Feature Request**: Add support for **Qualcomm IQ-9075 NPU/GPU** (Dragonwing™ IQ9 series) — used in devices like Raxda Fogwise Airb.  
  - 🔗 [Issue #18445](https://github.com/ollama/ollama/issues/18445)  
- 📌 **Feature Request**: Add support for **Rockchip NPU** (RK3588/RK3576).  
  - 🔗 [Issue #9268](https://github.com/ollama/ollama/issues/9268)  
- 📌 **ROCm 10 for Windows** support requested — critical for AMD Ryzen AI Max+ users.  
  - 🔗 [Issue #18435](https://github.com/ollama/ollama/issues/18435)  

> *Note: No new quantization formats or model backends were added in this cycle.*

---

### **4. Performance & Optimization**  
- 🚀 **MLX Runner Load Progress & Stall Detection** (PR #17834):  
  - Implements pre-0.30-style progress tracking to avoid premature timeouts during slow model loads.  
  - Addresses intermittent load hangs on Apple Silicon (M-series).  
  - 🔗 [PR #17834](https://github.com/ollama/ollama/pull/17834)  
- 💾 **Prefill Cache Persistence (Experimental)** (PR #17953):  
  - Enables KV cache retention across runner reloads (`OLLAMA_PREFILL_CACHE=1`).  
  - Reduces redundant prefill computation in multi-request workflows.  
  - 🔗 [PR #17953](https://github.com/ollama/ollama/pull/17953)  
- 🧱 **Q2_0 GGUF Tensor Support** (PR #18443):  
  - Fixes metadata import failure when reading Q2_0 quantized tensors from GGUF files.  
  - Expands compatibility with newer quantization schemes.  
  - 🔗 [PR #18443](https://github.com/ollama/ollama/pull/18443)  

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| 🔴 High | **#18396** | Gemma 4 E4B multimodal projector causes host OOM on Jetson Orin Nano 8GB despite CPU-projector config. | ❌ Open — impacts edge deployment |
| 🔴 High | **#18231** | MLX runner dies mid-request due to OOM when long-context requests overlap with paged-out prefix cache snapshots. | ⚠️ Partial fix in `v0.34.1-rc1`; full solution pending |
| 🔴 High | **#18269** | `muse-glimmer:30b-mlx` model stuck in "Stopping..." state on M4 Air (32GB RAM). | ❌ Open — likely tied to MLX runner lifecycle |
| 🟡 Medium | **#18442** | `gemma4:26b` loses EOS token during concurrent decode; `qwen3.8-27b` works cleanly. | ❌ Open — potential decoder regression |
| 🟡 Medium | **#18441** | MLX structured output prepends a stray `.` to JSON response when thinking is enabled. | ❌ Open — breaks downstream parsers |
| 🟡 Medium | **#18447** | Intermittent “model not found” errors due to case-sensitive canonicalization in `getExistingName`. | ✅ Fixed in PR #18438 — awaiting merge |

> ✅ **Fix PRs**: #18438 (model not found), #18440 (MLX Docker patch), #18439 (reject `previous_response_id`), #18434 (support continuation), #18437 (URL timeout bound).

---

### **6. What This Means for Application Developers**  
- **Avoid `previous_response_id` until fixed**: Current behavior returns empty responses silently — use only if you can validate context integrity manually.  
  - 🔗 [PR #18439](https://github.com/ollama/ollama/pull/18439)  
- **Use `OLLAMA_PREFILL_CACHE=1` experimentally** for agent workloads with long context — reduces latency on repeated queries.  
- **Be cautious with Gemma 4 tool calls**: Keys with spaces cause silent rejection (see #18390); sanitize input or upgrade to a patched version.  
- **Monitor MLX memory usage on Apple Silicon**: The 8 GiB prefix cache budget can trigger heavy swap under agent workloads (see #18131). Consider tuning or upgrading hardware.  
- **Watch for `v0.34.1` release**: It includes key stability fixes for MLX and memory management — essential for production-grade agents.

> ✅ Recommended: Test your agent pipelines against `v0.34.1-rc1` before production rollout, especially on Apple Silicon and embedded devices.

---  
*Digest generated from GitHub data: ollama/ollama — 2026-09-15*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-15**

---

### **1. Today's Highlights**  
The latest PRs focus on critical cost accuracy fixes for **Gemini embedding models** and **Vertex AI audio inputs**, resolving double-billing issues that were impacting spend tracking. Significant progress was made in stabilizing the proxy’s **usage aggregation logic**, with a fix preventing OOM crashes on large deployments due to unbounded API key rollups. Additionally, foundational work was merged to improve **Rust bridge lifecycle management**, setting the stage for future performance gains.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, several **critical bug fixes** are pending merge and may be included in an upcoming v1.87.2 patch release:
- **PR #41157** – Fixes double-charging of `gemini-embedding-2` audio input (causing billing inaccuracies) → [Link](https://github.com/BerriAI/litellm/pull/41157)
- **PR #41155** – Addresses OOM risk in admin usage dashboard by limiting API key grouping → [Link](https://github.com/BerriAI/litellm/pull/41155)

> 🔔 *Developers using large-scale deployments with high API key counts should monitor for this update to avoid potential query engine crashes.*

---

### **3. New Model & Hardware Support**  
- **Gemma 4** added via the Mantle endpoint (previously unsupported) → [Issue #30657](https://github.com/BerriAI/litellm/issues/30657)
- **Microsoft Agent 365 MCP tool-call guardrail** now supported in LiteLLM’s guardrails system → [PR #38241](https://github.com/BerriAI/litellm/pull/38241)
- **Fireworks serverless catalog** fields backfilled with missing metadata (context window, vision/tool support) → [PR #41152](https://github.com/BerriAI/litellm/pull/41152)

> ✅ *These additions enhance multi-provider agent security and expand model availability across enterprise backends.*

---

### **4. Performance & Optimization**  
- **Rust bridge lifecycle foundation** established with shared route contracts and token counter rollout at public boundaries → [PR #41153](https://github.com/BerriAI/litellm/pull/41153)  
  *→ Expected to reduce latency in routing and improve memory safety in high-throughput environments.*
- **Stateless replay identity** introduced for stricter test replay fidelity → [PR #41149](https://github.com/BerriAI/litellm/pull/41149)  
  *→ Reduces flaky tests and improves confidence in integration stability.*

> 📈 *While no direct throughput metrics are available yet, these changes lay groundwork for sub-millisecond routing improvements in future versions.*

---

### **5. Stability & Regressions**  
Top stability concerns reported today:

1. **Critical**: `BudgetExceededError` triggered despite valid spend below budget (virtual keys) → [Issue #27735](https://github.com/BerriAI/litellm/issues/27735)  
   *– No fix PR yet; impacts team-level spending control.*

2. **High**: `/v1/chat/completions` streaming drops `reasoning_text` from provider responses → [Issue #40654](https://github.com/BerriAI/litellm/issues/40654)  
   *– Affects agents relying on reasoning traceability; fix PR pending.*

3. **High**: Admin UI triggers full page reloads and 404 prefetch storms on navigation → [Issue #41029](https://github.com/BerriAI/litellm/issues/41029)  
   *– Impacts UX and increases server load; fixed in PR #41029 (closed).*

4. **Medium**: Health checks fail hard when upstream hosts are offline → [Issue #34281](https://github.com/BerriAI/litellm/issues/34281)  
   *– Requested graceful failure mode for ad-hoc or intermittent hosts.*

---

### **6. What This Means for Application Developers**  
- **Billing accuracy is now prioritized**: Ensure you’re using updated pricing data (via recent PRs) if running financial audits or cost-aware agents.
- **Guardrails are more powerful**: Use `llm_as_a_judge` in `pre_call`/`during_call` modes for real-time policy enforcement during tool execution.
- **Avoid deployment crashes**: If your proxy serves >1k API keys, upgrade soon to benefit from the `api_key` rollup fix (PR #41155).
- **Monitor for stateful behavior**: The `responses-to-chat` bridge still loses reasoning state during streaming — use fallbacks or caching layers for audit-critical workflows.
- **Plan for UI improvements**: The admin dashboard will soon be more responsive post-UI routing fix (PR #41029).

> 💡 *For production-grade agents: enable `cache_control` breakpoints and validate that reasoning traces survive bridging between `responses` and `chat/completions` endpoints.*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-15**

---

### **1. Today's Highlights**  
The Unsloth ecosystem continues to evolve with a focus on stability, UX polish, and broader model accessibility. Key developments include critical fixes for memory leaks in `llama-server` and robust improvements to tool call replay fidelity, enabling more reliable agent workflows. New PRs introduce configurable chat width and enhanced sandbox security, while ongoing work expands support for external model sources via Docker.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several important changes are imminent:
- **PR #10959**: Docker build caches will be dropped from `unsloth/unsloth` images to reduce registry storage usage (68.9 GB saved). This may affect CI/CD pipelines relying on cached builds.
- **PR #10933 + #10957**: Studio now dynamically fetches reasoning effort and image capabilities per API model (e.g., OpenRouter, Claude), replacing static assumptions. This is a breaking change for tools that rely on outdated model metadata — users must update their integrations accordingly.  
🔗 [PR #10933](https://github.com/unslothai/unsloth/pull/10933) | 🔗 [PR #10957](https://github.com/unslothai/unsloth/pull/10957)

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Support (in progress)**: Feature branch `feature/docker-rocm-support` (Issue #6230) enables full ROCm compatibility for RDNA2/3/4 and CDNA GPUs, mirroring NVIDIA’s CUDA setup.  
  🔗 [Issue #6230](https://github.com/unslothai/unsloth/issues/6230)
- **Local Models in Docker**: PR #10936 adds detection and mounting of LM Studio, Ollama, and Hermes models when running Studio in Docker, improving local model discoverability.  
  🔗 [PR #10936](https://github.com/unslothai/unsloth/pull/10936)
- **MLX Native Support**: Continued refinement of Apple MLX backend behavior, including fix for duplicated `<|channel>` splicing in replies (PR #10905).  
  🔗 [PR #10905](https://github.com/unslothai/unsloth/pull/10905)

---

### **4. Performance & Optimization**  
- **Memory Leak Fix**: PR #10911 addresses frequent `Error: terminated` crashes during `unsloth start pi` on slow CPU hosts by keeping SSE streams alive during `llama-server` prefill phases.  
  🔗 [PR #10911](https://github.com/unslothai/unsloth/pull/10911)
- **Reduced Redundant Processing**: PR #10927 optimizes blocked command checks by pre-compiling regex alternation once instead of rebuilding it per call, reducing CPU overhead.  
  🔗 [PR #10927](https://github.com/unslothai/unsloth/pull/10927)
- **Improved Tool Call Handling**: PR #10935 ensures nested tool call fields (e.g., `page_size`, `start_cursor`) are preserved in correct order, preventing silent data loss due to `llama.cpp` grammar restrictions.  
  🔗 [PR #10935](https://github.com/unslothai/unsloth/pull/10935)

---

### **5. Stability & Regressions**  
Critical issues reported today:
1. **Gemma 4 Crash on Image Input** (`#10559`): `llama-server` crashes with `GGML_ASSERT` due to default `ubatch` being too small for image inputs. Affects Linux users with GPU-backed inference.  
   🔗 [Issue #10559](https://github.com/unslothai/unsloth/issues/10559)
2. **Model Auto-Switch Failure (MLX)** (`#10951`): Installed MLX models fail auto-switching with 404 errors unless manually preloaded — impacts macOS users.  
   🔗 [Issue #10951](https://github.com/unslothai/unsloth/issues/10951)
3. **Tool Call Truncation** (`#10839`): MCP calls are systematically truncated, likely due to deduplication logic — affects long-form outputs.  
   🔗 [Issue #10839](https://github.com/unslothai/unsloth/issues/10839)
4. **Memory Growth Post-llama.cpp Update** (`#10921`): Users report unbounded memory growth after recent `llama.cpp` updates.  
   🔗 [Issue #10921](https://github.com/unslothai/unsloth/issues/10921)

> ✅ *Fix PRs exist for most regressions*:  
> - `#10911` (fixes `unsloth start pi` crash)  
> - `#10905` (fixes MLX channel duplication)  
> - `#10927` (optimizes blocked command check)

---

### **6. What This Means for Application Developers**  
- **Agent Workflows Are More Reliable**: With faithful replay of durable runs (PR #10910) and improved tool call handling, your agents can now maintain state consistency across sessions — crucial for debugging and auditing.
- **Security First**: PR #10907 introduces explicit permission prompts before any tool accesses files outside the sandbox. This enables safer deployment of autonomous agents in production.
- **Model Integration Flexibility**: The shift to dynamic model capability detection (PR #10933) means your apps should no longer assume fixed features like “reasoning effort” or “image support” — always query the backend at runtime.
- **Docker Deployments Need Attention**: Avoid storing models in ephemeral containers. Use volume mounts (`/workspace/work`) and consider PR #10936 to expose local models. Also expect reduced cache size post-PR #10959.

> ⚠️ **Action Items**:  
> - Audit tool call handling logic for field ordering (especially nested objects).  
> - Test against `llama.cpp`-specific schema constraints.  
> - Update SDKs to handle dynamic model capabilities.  
> - Monitor memory usage after `llama.cpp` upgrades.

---  
*Digest generated: 2026-09-15 | Source: [unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*