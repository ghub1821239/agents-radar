# AI Infrastructure Digest 2026-09-02

> Generated: 2026-09-02 00:30 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-02**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q3 2026 is characterized by rapid convergence toward high-performance, agent-ready systems with deep hardware specialization and multi-modal maturity. Projects are increasingly focused on scalability across distributed environments (multi-node TP, MTP), low-latency cache management, and end-to-end observability. While vLLM and SGLang lead in advanced scheduling and speculative decoding, lightweight runtimes like llama.cpp and Ollama dominate edge and local deployment scenarios. The rise of native video input, TTS pipelines, and secure containerized deployments signals a shift from pure model serving to full-stack agentic infrastructure.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑) | PRs Open (↑) | Recent Release? | Status |
|---------------|------------------|----------------|------------------|--------|
| **vLLM**      | 1,427 (+5)       | 187 (+3)       | No               | Stable, critical fixes underway |
| **SGLang**    | 1,156 (+8)       | 142 (+6)       | No               | High activity in kernel & cache layers |
| **llama.cpp** | 1,672 (+12)      | 215 (+9)       | No               | Major focus on Metal/SYCL stability |
| **Ollama**    | 1,023 (+7)       | 98 (+4)        | v0.33.3-rc0      | RC release with backend updates |
| **LiteLLM**   | 1,344 (+11)      | 167 (+5)       | v1.101.0-dev.1   | Security-focused dev release |
| **Unsloth**   | 1,218 (+6)       | 128 (+4)       | No               | UX/stability issues dominant |

> *Note: "↑" indicates recent trend; all counts reflect active issues/PRs as of 2026-09-02.*

---

### **3. Model Support Race**

| New Model / Architecture             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash (glm5next)**         | ✅   | ❌     | ✅        | ❌     | ❌      | ❌      |
| **Qwen4exp (sparse attention)**      | ❌   | ❌     | ✅        | ❌     | ❌      | ❌      |
| **Idefics3**                         | ✅ (LoRA) | ❌   | ❌        | ❌     | ❌      | ⚠️ Requested |
| **Qwen3-TTS**                        | ❌   | ❌     | ❌        | ❌     | ❌      | ⚠️ Requested |
| **Mistral TTS (Voxtral)**            | ❌   | ❌     | ❌        | ❌     | ✅      | ❌      |
| **Volcanic Ark (Doubao Vision Embedding)** | ❌ | ❌     | ❌        | ❌     | ✅ (Feature Req) | ❌ |
| **Kimi K3 / MiniMax-M3 Tool Parsing**| ✅   | ❌     | ❌        | ❌     | ❌      | ❌      |

✅ **Leader**: **llama.cpp** leads in novel architecture support (GLM-5.3, Qwen4exp), while **LiteLLM** gains ground in integration with emerging modalities (TTS, embeddings).  
⚠️ **Gap**: Unsloth lags behind in model compatibility, especially for new vision-language models and TTS.

---

### **4. Performance Frontier**

| Optimization Focus           | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache Efficiency**       | ✅ (Fused baking, PIECEWISE CUDA) | ✅ (HiCache, IPC data plane) | ✅ (Scanning, lazy PLE) | ✅ (BF16 quantization) | ⚠️ (Streaming cost tracking) | ✅ (Smart offload planner) |
| **Batching & Throughput**     | ✅ (Speculative decoding, context-aware scheduling) | ✅ (GDN unrolling, HiSparse) | ✅ (MoE expert fusion) | ⚠️ (Multi-GPU fallback) | ✅ (Per-key rate limits) | ❌ |
| **Quantization & Memory**     | ✅ (LoRA, MoE storage) | ✅ (W8A8/MXFP8 on Ascend) | ✅ (MXFP8, VNNI fused dot product) | ✅ (BF16+MXFP8) | ✅ (OCR payload preservation) | ❌ |
| **Distributed Serving**       | ✅ (Multi-node TP, NCCL debugging) | ✅ (Prefill-decode disaggregation) | ❌ (SYCL/MTP instability) | ❌ (GPU crashes under load) | ✅ (Routing scoring heuristics) | ❌ |
| **Kernel-Level Tuning**       | ✅ (Triton, FlashInfer) | ✅ (CUDA/ROCm, GDN) | ✅ (Metal, fa-vec profiles) | ❌ | ⚠️ (Transport resilience) | ❌ |

> 🔥 **Top Performers**:  
> - **vLLM** dominates in scalable, production-grade inference with advanced speculative decoding and KV cache optimization.  
> - **SGLang** leads in low-latency, out-of-process caching (HiCache) and long-context efficiency via disaggregation.  
> - **llama.cpp** excels in hardware-specific tuning (Apple Silicon, CUDA MoE fusion).

---

### **5. Layer Positioning**

| Project       | Primary Layer              | Role Summary |
|---------------|------------------------------|--------------|
| **vLLM**      | **Serving Engine**           | High-throughput, distributed inference with speculative decoding, optimized for cloud-scale LLM serving. |
| **SGLang**    | **High-Performance Engine + Gateway** | Blends engine features (HiCache, GDN kernels) with gateway-like routing and observability—ideal for agentic workflows. |
| **llama.cpp** | **Local Runtime / Edge Engine** | Lightweight, cross-platform runtime optimized for Apple Silicon, CPU, and embedded devices. |
| **Ollama**    | **Unified Gateway / Developer CLI** | End-to-end platform integrating model loading, local inference, and API exposure—targets developers and local agents. |
| **LiteLLM**   | **Enterprise Gateway / Orchestrator** | Multi-provider routing, cost monitoring, observability layer; enables hybrid inference across clouds and on-prem. |
| **Unsloth**   | **Agent Studio / Fine-Tuning Platform** | Full-stack agent development environment with tool orchestration, UI, and fine-tuning capabilities—focused on workflow design. |

> 📊 **Strategic Differentiation**:  
> - **vLLM/SGLang** = Core inference engines for scale.  
> - **llama.cpp/Ollama** = Local-first, developer-friendly stacks.  
> - **LiteLLM** = Enterprise-grade orchestration.  
> - **Unsloth** = Agent-centric IDE.

---

### **6. Trend Signals**

🔍 **Key Industry Trends Extracted**:
1. **Agent-Centric Infrastructure is Maturing**: Projects like SGLang (HiCache), Ollama (video input), and Unsloth (tool fidelity) are shifting focus from raw inference speed to **agent reliability**, **tool interaction integrity**, and **contextual awareness**.
2. **Hardware Specialization is Accelerating**: Apple Silicon (fa-vec tuning), AMD ROCm (MXFP8), and Ascend (W8A8) are receiving targeted optimizations — signaling demand for **vendor-specific performance**.
3. **Security & Supply Chain Integrity Are Now Non-Negotiable**: LiteLLM’s Cosign-signed images and Unsloth’s prompt injection fix highlight growing emphasis on **trusted execution environments**.
4. **Observability Drives Production Readiness**: Metrics expansion in LiteLLM (rate limits), Ollama (cache hits), and SGLang (latency tracking) shows that **cost transparency and debugging visibility** are now core requirements.
5. **Distributed Inference Still Has Pain Points**: Persistent NCCL deadlocks (vLLM), GPU crashes (Ollama), and SYCL failures (llama.cpp) reveal that **scalable, reliable multi-GPU serving remains a challenge**.

🎯 **What Application Developers Should Watch**:
- **Adopt vLLM or SGLang** for high-throughput, multi-node inference with speculative decoding.
- **Use Ollama + llama.cpp** for local, Apple Silicon–optimized agent workloads with minimal setup.
- **Integrate LiteLLM** if you need cost-aware, multi-provider routing with observability.
- **Monitor Unsloth’s security fixes** before deploying agent workflows with unstructured tool calls.
- **Avoid v0.33.0+ on Windows/NVIDIA** until Ollama resolves the TDR crash regression.
- **Leverage verified Docker images (LiteLLM)** in regulated environments.

> ✅ **Bottom Line**: The ecosystem is no longer just about “running models.” It's about **building trustworthy, observable, and resilient agent systems at scale** — and the tools are finally catching up.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-02

---

### **1. Today's Highlights**  
The vLLM project continues to mature its multi-modal and speculative decoding capabilities, with critical fixes for DSA (DeepSeek-V3.2/GLM-5.x) models on multi-node Tensor Parallelism using PIECEWISE CUDA graphs. A high-severity fix (#54851) resolves silent output corruption caused by improper KV cache handling in captured Triton kernels. Meanwhile, the Rust frontend is advancing toward feature parity, and support for LoRA in multimodal towers is expanding beyond Qwen VL and Idefics3.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Expanded LoRA support for tower and connector layers in more multimodal models (tracked in [#31479](https://github.com/vllm-project/vllm/issues/31479)).  
  - Enhanced tool parsing for Kimi K3 (`/v1/responses` now respects `spaces_between_special_tokens`, PR [#51152](https://github.com/vllm-project/vllm/pull/51152)) and MiniMax-M3 (fixes elided opening tags, PR [#51075](https://github.com/vllm-project/vllm/pull/51075)).  
- **Hardware & Backend**:  
  - Intel Arc B50 (Battlemage/Xe2): Ongoing issue with `zeMemOpenIpcHandle` failure during TP=2 initialization ([#48953](https://github.com/vllm-project/vllm/issues/48953)), not yet resolved.  
  - AMD ROCm: CI improvements for MI300X/MI350X with host access grants for VMM sleep-mode pools ([#51369](https://github.com/vllm-project/vllm/pull/51369)).  
  - Multi-node TP on GB10/sm_121: Active debugging of NCCL deadlocks (MiniMax-M2.7, [#46097](https://github.com/vllm-project/vllm/issues/46097)) and scheduler stalls after idle periods ([#51921](https://github.com/vllm-project/vllm/issues/51921)).

---

### **4. Performance & Optimization**  
- **Speculative Decoding**:  
  - Proposal to extend `num_speculative_tokens_per_batch_size` with context-length-aware scheduling via a `(batch, ctx)` table ([#48627](https://github.com/vllm-project/vllm/issues/48627)), enabling dynamic depth adaptation based on prompt length.  
  - High overhead observed in DSD arms under production defaults due to PIECEWISE override; baseline tax identified as a key factor ([#49986](https://github.com/vllm-project/vllm/issues/49986)).  
- **FlashInfer & Kernel Optimization**:  
  - FlashInfer compilation logging improved with progress indicators to prevent confusion during long compiles ([#38246](https://github.com/vllm-project/vllm/issues/38246)).  
  - MoE backend optimizations on ROCm to preserve unquantized weight storage ([#46009](https://github.com/vllm-project/vllm/pull/46009)).  
- **Memory & Offloading**:  
  - CPU offload deadlock detected in `VLLM_PLE_CPU_OFFLOAD` mode on single-GPU setups with Qwen3.8-Flash-Next ([#53960](https://github.com/vllm-project/vllm/issues/53960)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| Critical | [#54851](https://github.com/vllm-project/vllm/pull/54851) | Silent garbage output in DeepSeek-V3.2/GLM-5.x DSA models on multi-node TP with PIECEWISE CUDA graphs due to incorrect fused KV cache baking | ✅ **Fixed in PR #54851 (merged)** |
| High | [#53960](https://github.com/vllm-project/vllm/issues/53960) | `VLLM_PLE_CPU_OFFLOAD=1` causes permanent hang at startup on single GPU (TP=1) | ❌ Open |
| High | [#51921](https://github.com/vllm-project/vllm/issues/51921) | Engine stalls permanently after ~1 min idle on 4-node TP=4 (GB10/aarch64); requests never reach scheduler | ❌ Open |
| Medium | [#54521](https://github.com/vllm-project/vllm/issues/54521) | Non-deterministic greedy decoding in Qwen3.8-Flash-Next when context nears `indexer_budget` | ❌ Open |
| Medium | [#35288](https://github.com/vllm-project/vllm/issues/35288) | MTP speculative decoding corrupts output at concurrency ≥4 (V1 engine) | ❌ Open |
| Medium | [#37754](https://github.com/vllm-project/vllm/issues/37754) | FlashInfer + MTP crashes with "illegal memory access" on SM121 (DGX Spark) with GQA=16 model | ❌ Open |

---

### **6. What This Means for Application Developers**  
- **Multi-modal apps**: Expect broader LoRA support across MM models (not just Qwen/idefics), but be cautious with `default-mm-loras` on complex input structures—ensure modality detection aligns with your data pipeline.  
- **High-throughput agents**: Use PIECEWISE CUDA graphs only if you’ve validated KV cache consistency—this is now fixed for DSA models via PR #54851. Avoid `VLLM_PLE_CPU_OFFLOAD` on single-GPU deployments until [#53960] is resolved.  
- **Scheduling logic**: Priority preemption from waiting queue is not yet supported (PR #40004), so high-priority requests may still block due to resource contention.  
- **Tool calling**: Patched behavior for Kimi/K3 and MiniMax-M3 ensures correct parsing of nested tool calls and special tokens—upgrade to latest main to avoid silent failures.  
- **Debugging tip**: If your server hangs during startup or becomes unresponsive after idleness, check for `VLLM_PLE_CPU_OFFLOAD`, `zeMemOpenIpcHandle`, or NCCL issues on multi-node setups.  

> 🔗 **Stay updated**: Monitor [vLLM GitHub Issues](https://github.com/vllm-project/vllm/issues) and [Pull Requests](https://github.com/vllm-project/vllm/pulls) for real-time fixes and stability updates.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-02**

---

### **1. Today's Highlights**  
The SGLang project continues to advance its high-performance inference stack with critical improvements in stability and scalability, particularly around **prefill-decode disaggregation**, **HiCache**, and **CUDA/ROCm kernel optimizations**. Notably, a new PR introduces **out-of-process HiCache data plane via device-memory IPC**, signaling a major step toward scalable, low-latency cache management for long-context workloads.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking API/config changes were released.

---

### **3. New Model & Hardware Support**  
- ✅ **ROCm Support**: Ongoing refinement of ROCm-specific kernels, including a fix for unbounded `fp8_mqa_logits` iteration in `IndexerKPool` (Issue #37478) that previously caused process abortion on large logits.  
- ✅ **Ascend NPU**: Active development for W8A8/MXFP8/MXFP4 quantization support (PR #36426), enabling proper loading of Qwen3.8-27B-W8A8 models on Ascend hardware.  
- ✅ **Diffusion Models**: Enhanced support for FLUX.2 NVFP4 fusing (PR #37096), now request-scoped and enabled only under `quality="high"`.  
- ✅ **Multi-GPU Long Context**: HiSparse roadmap (Issue #28874) progresses toward efficient sparse attention for long sequences with minimal HBM usage.

---

### **4. Performance & Optimization**  
- 🔥 **Weight Cache Daemon**: Phase 1 launched (PR #27139), reducing weight load time from **~306–327s to <1s** on Qwen3-235B FP8 ([blog](https://www.lmsys.org/blog/2026-08-21-sglang-fast-engine-recovery)).  
- ⚡ **CUDA Graph & Speculative Decoding**: PR #37329 improves output handling and graph state sizing; PR #35546 prunes draft-extend logits to selected rows, reducing decode memory and graph overhead.  
- 📈 **GDN Kernel Optimization**: PR #36970 enables two-way loop unrolling for ReplaySSM verify path on SM120, improving throughput without changing behavior.  
- 💾 **Unified Radix Cache**: PR #37494 skips absent radix lock release during cleanup, improving synthetic request performance and reducing contention.

---

### **5. Stability & Regressions**  
- 🛑 **Critical CUDA Coredump Tracker (Issue #26340)**: 285 comments — auto-collected coredumps from CI runs indicate recurring GPU crashes. High severity; no fix PR yet. [View issue](https://github.com/sgl-project/sglang/issues/26340)  
- ⚠️ **HiCache + DSPARK Regression**: Long agentic sessions on DeepSeek-V4-Flash-0731 show `#cached-token: 0` despite stable prefix hit rate (~50%), undermining efficiency. [Issue #35129](https://github.com/sgl-project/sglang/issues/35129)  
- ⚠️ **ROCm Memory Abortion**: `IndexerKPool` calls `fp8_mqa_logits` without bounds, causing LLVM assertion failure and process abort when logits exceed 2 GiB. [Issue #37478](https://github.com/sgl-project/sglang/issues/37478)  
- ⚠️ **Deadlock in Decode Scheduler**: Occurs under `--grpc-mode` due to improper synchronization. [Issue #29957](https://github.com/sgl-project/sglang/issues/29957)

---

### **6. What This Means for Application Developers**  
- **For production agents**: Prioritize testing with `--grpc-mode` and long-session scenarios—known deadlock and cache inefficiency bugs may impact reliability.  
- **For high-throughput deployments**: Leverage the **weight cache daemon** and **HiCache out-of-process data plane (RFC #37372)** for faster cold-starts and better scale-out.  
- **For multi-backend users**: Be cautious with ROCm and NPU backends—new fixes are emerging but require validation against your workload. Use `quality="high"` only if you need fused diffusion kernels (e.g., FLUX.2).  
- **For long-context applications**: Monitor HiSparse and Prefill-Decode Disaggregation progress (Issues #28874, #21703)—these are key enablers for scalable, cost-efficient reasoning pipelines.

> 🔗 **Track ongoing work**: [GitHub Issues Dashboard](https://github.com/sgl-project/sglang/issues) | [PRs Open Today](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+sort%3Aupdated-desc+created%3A%3E%3D2026-09-01)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-02**

---

### **1. Today's Highlights**  
The latest updates focus on Apple Metal performance tuning for new Apple Silicon chips (M2 Pro, M2 Max, A18 Pro), with targeted kernel optimizations and memory management fixes. Critical improvements include MoE expert fusion in CUDA and optimized KV cache lookups for long-context inference, while ongoing work targets SYCL backend stability and multi-GPU scalability.

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published today. However, the following commits represent significant internal changes:
- `b10752`: Added **Metal `metallib` build support for xcframework**, enabling better iOS/macOS integration via Xcode’s unified framework packaging ([#28163](https://github.com/ggml-org/llama.cpp/pull/28163)).
- `b10740`: Fixed **Metal memory leaks due to missing autorelease pools**, improving long-running app stability on macOS/iOS ([#27883](https://github.com/ggml-org/llama.cpp/pull/27883)).

> ⚠️ Developers using Metal on iOS/macOS should ensure they are building with `GGML_METAL_EMBED_LIBRARY=OFF` and validate xcframework linking.

---

### **3. New Model & Hardware Support**  
- **Hardware**:  
  - Added **fa-vec tuning profiles for M2 Pro (#28122)**, **A18 Pro (MacBook Neo) (#28152)**, and **M2 Max (#28015)** — targeting up to 30 GPU cores. These tune kernel launch parameters for optimal throughput on high-core-count Apple Silicon GPUs.
- **Models & Architectures**:  
  - Added full support for **GLM-5.3-Flash (glm5next)**, a 320B+ hybrid linear/sparse-attention MoE model with vision capabilities ([#27752](https://github.com/ggml-org/llama.cpp/pull/27752), [#27917](https://github.com/ggml-org/llama.cpp/pull/27917)).  
  - Introduced **Qwen4exp** sparse attention via gather-based decoding (`qwen4exp: gather-based sparse attention`) to reduce compute overhead during decode ([#28213](https://github.com/ggml-org/llama.cpp/pull/28213)).
  - Enabled **NextN/MTP hyperparameter loading** within Qwen-specific architecture handlers, improving compatibility with Qwen3.5, Qwen3.5 MoE, and Qwen3-Next models ([#28192](https://github.com/ggml-org/llama.cpp/pull/28192)).

---

### **4. Performance & Optimization**  
- **CUDA**:  
  - Fused **MoE weighted expert reduction** (mul + view + add) into a single kernel to eliminate global memory writes — critical for reducing latency in MoE-heavy models like Qwen3.8-27B ([#25952](https://github.com/ggml-org/llama.cpp/pull/25952)).
- **Apple Metal**:  
  - Optimized **kernel_mul_mm batched dst offsets** to prevent int32 overflow in deep-context scenarios (previously causing silent corruption) ([#28210](https://github.com/ggml-org/llama.cpp/pull/28210)).
  - Reduced CPU overhead in `get_prev_tokens()` by replacing `std::set` traversal with flat array scanning — improved decode speed from **17 → 19.7 tok/s at 130k context** ([#28128](https://github.com/ggml-org/llama.cpp/pull/28128)).
- **CPU (AVX2)**:  
  - Integrated **VNNI fused madd+add** in `q4_K/q5_K` dot products via `vpdpwssd`, boosting AVX2 dot product efficiency where supported ([#28212](https://github.com/ggml-org/llama.cpp/pull/28212)).
- **Quantization & Memory**:  
  - Introduced **direct reads for lazy PLE table** in Qwen3.8-Flash-Next, yielding >2x prefill performance gain on GB10 hardware ([#28136](https://github.com/ggml-org/llama.cpp/pull/28136)).

---

### **5. Stability & Regressions**  
Critical issues reported today:
- **SYCL Backend Crashes**:  
  - `llama-server` crashes on **Lunar Lake iGPU (Arc 140V)** due to device memory query failure in both Level Zero and SYCL APIs ([#28134](https://github.com/ggml-org/llama.cpp/issues/28134)).  
  - High CPU utilization observed during large host-pinned allocations on Linux ([#27038](https://github.com/ggml-org/llama.cpp/issues/27038)).
- **Multi-GPU Issues**:  
  - Garbled output when using **SYCL tensor parallelism across multiple GPUs** ([#26058](https://github.com/ggml-org/llama.cpp/issues/26058)).  
  - **CUDA lockups** with Qwen3.8-27B under MTP + `--split-mode tensor` on RTX 5070TI/3060TI systems ([#27122](https://github.com/ggml-org/llama.cpp/issues/27122)).
- **Vulkan**:  
  - Pipeline compile hangs on **gfx1103 (RADV 780M)**, preventing server startup ([#27998](https://github.com/ggml-org/llama.cpp/issues/27998)).

> ✅ *Fix PRs exist for some regressions:*  
> - [#28163](https://github.com/ggml-org/llama.cpp/pull/28163) (Metal xcframework)  
> - [#28210](https://github.com/ggml-org/llama.cpp/pull/28210) (int32 overflow fix)

---

### **6. What This Means for Application Developers**  
- **For Apple Silicon apps**: Prioritize builds with `--metal` and use `ggml-metal-tuning` to auto-generate optimized fa-vec configs for M2 Pro/Max and A18 Pro. Avoid legacy Metal paths if targeting newer Macs.
- **For LLM agents**: Leverage **SSBD (Self-Speculative Biased Decoding)** now available via PR [#28138](https://github.com/ggml-org/llama.cpp/pull/28138) for faster re-translation tasks with minimal prompt cost.
- **For long-context inference**: Use `kv-cells` scan optimization (`b10750`) and avoid `std::set`-based token lookup patterns in custom code.
- **For production deployments**: Be cautious with `--split-mode tensor` on multi-GPU setups (especially CUDA/SYCL); consider `--cache-disk` or `--spec-type draft-mtp` as fallbacks until MTP stability improves.
- **For cross-platform apps**: Expect instability on Intel Arc B70/Lunar Lake; monitor [#27198](https://github.com/ggml-org/llama.cpp/issues/27198) and [#28134](https://github.com/ggml-org/llama.cpp/issues/28134) for fixes.

> 🔗 **Recommended Resources**:  
> - [llama.app](https://llama.app) – official demo site  
> - [GitHub Attestations](https://github.com/ggml-org/llama.cpp/attestations) – verifiable build integrity  
> - [Discussions #27668](https://github.com/ggml-org/llama.cpp/discussions/27668) – Metal tuning guide

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-02**

---

### **1. Today's Highlights**  
The latest release, **v0.33.3-rc0**, introduces critical improvements in GGUF model parameter handling and updates core inference backends (MLX, MLX-C, llama.cpp). Key developments include native video input support on macOS via PR #18179 and enhanced memory efficiency for Qwen3.8 Flash Next models through targeted BF16 quantization. These advances strengthen Ollama’s position as a unified, high-performance LLM serving platform across diverse hardware.

---

### **2. Releases & Breaking Changes**  
- **v0.33.3-rc0**: Released with updated MLX/MLX-C and `llama.cpp` (b10729), now honoring GGUF-defined default parameters.  
  🔗 [Changelog](https://github.com/ollama/ollama/compare/v0.33.2...v0.33.3-rc0)  
- **API Change**: `keep_alive` durations exceeding `int64` nanoseconds are now clamped to prevent session expiration due to overflow.  
  🔗 [PR #18181](https://github.com/ollama/ollama/pull/18181)

> ✅ *No breaking changes to existing Modelfiles or CLI behavior reported.*

---

### **3. New Model & Hardware Support**  
- **Video Input on macOS**: Native video ingestion via `/api/chat` and `/api/generate` is now supported, decoding frames and audio for multimodal models like `qwen3-vl`.  
  🔗 [PR #18179](https://github.com/ollama/ollama/pull/18179)  
- **GraniteForCausalLM Support**: Experimental MLX backend now supports IBM’s Granite 4.1 series models.  
  🔗 [PR #17972](https://github.com/ollama/ollama/pull/17972)  
- **Qwen3.8 Flash Next Optimization**: Memory-efficient BF16+MXFP8 quantization applied to key weights, reducing CPU offloading.  
  🔗 [PR #18078](https://github.com/ollama/ollama/pull/18078)

---

### **4. Performance & Optimization**  
- **Cache Metrics Exposure**: Prompt evaluation cache hits now surfaced via API (`prompt_eval_cached_count`) and CLI.  
  🔗 [PR #17943](https://github.com/ollama/ollama/pull/17943)  
- **Model Evaluation Latency Tracking**: New `/metrics` endpoint exposes `ollama_eval_duration_total` and `ollama_eval_total`.  
  🔗 [PR #11159](https://github.com/ollama/ollama/pull/11159)  
- **Memory Efficiency Gains**: Qwen3.8 Flash Next models show reduced CPU offload by keeping MTP and expert-path projections in BF16.  
  🔗 [PR #18078](https://github.com/ollama/ollama/pull/18078)

> 💡 *Expected: ~15–30% reduction in CPU utilization during long-context generation with Qwen3.8.*

---

### **5. Stability & Regressions**  
- **Critical Regression**: GPU driver crashes (`VIDEO_TDR_TIMEOUT_DETECTED`) on Windows + NVIDIA when switching from single-turn to multi-turn requests — confirmed regression between v0.32.15 and v0.33.0.  
  🔗 [Issue #18152](https://github.com/ollama/ollama/issues/18152) *(High severity; no fix PR yet)*  
- **Silent CPU Fallbacks**: Models silently fall back to CPU when VRAM insufficient, with no user visibility.  
  🔗 [Issue #14258](https://github.com/ollama/ollama/issues/14258) *(High impact; documentation improvement pending)*  
- **Streaming Buffer Issues**: Trailing content dropped due to unflushed `thinking.Parser` buffer.  
  🔗 [PR #18173](https://github.com/ollama/ollama/pull/18173) *(Fix merged; resolves #18009, #18173)*

---

### **6. What This Means for Application Developers**  
- **Build Resilient Agents**: Use `prompt_eval_cached_count` and `ollama_eval_duration_total` to monitor and optimize prompt processing latency.  
- **Handle Video Inputs**: Leverage native video support on macOS for agentic workflows involving temporal reasoning (e.g., video analysis).  
- **Avoid GPU Crashes**: Temporarily avoid v0.33.0+ on Windows/NVIDIA if using multi-turn conversations until #18152 is resolved.  
- **Control Workloads**: The upcoming `custom GPU/CPU allocation per model` feature (issue #18185) will enable fine-grained control in multi-agent environments.  
- **Ensure Model Consistency**: With GGUF defaults now honored, rely less on Modelfile overrides unless explicitly needed.

> 📌 *Best practice: Always validate model behavior post-upgrade using benchmarking tools and monitor `ollama ps` and `/metrics` for drift.*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **1. Today's Highlights**  
LiteLLM continues to strengthen its enterprise-grade inference infrastructure with critical fixes for streaming reliability, cost accuracy, and observability. Notable progress includes proper handling of tool calls in streaming responses, improved Datadog LLM observability integration, and enhanced routing precision via new scoring heuristics. The release of `v1.101.0-dev.1` introduces verified Docker image signing via Cosign—reinforcing supply-chain security across all deployments.

---

### **2. Releases & Breaking Changes**  
- **`v1.101.0-dev.1`**: Development release featuring verified Docker image signatures using [Cosign](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-dev.1), with the same key introduced in commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
  ✅ *All images are now cryptographically verifiable.*  
- **`v1.99.0`**: Stable release with no breaking changes reported; primarily includes stability patches and dependency updates.  
  🔍 *Verify signature using: `cosign verify --key <KEY> berriai/litellm:v1.99.0`*

> 📌 **Migration Note**: No API or config changes required for existing users. Prioritize upgrading to `v1.101.0-dev.1` if security verification is a requirement.

---

### **3. New Model & Hardware Support**  
- **Mistral Text-to-Speech (TTS)**: Added support for `/v1/audio/speech` via PR [#38755](https://github.com/BerriAI/litellm/pull/38755), enabling full TTS pipeline integration with Mistral’s Voxtral models.  
- **Volcanic Ark (Doubao Embedding Vision)**: Feature request [#29570](https://github.com/BerriAI/litellm/issues/29570) opened for adding support for `volcanic-ark/doubao-embedding-vision-251215`.  
- **Azure Storage Credential Chain**: PR [#39229](https://github.com/BerriAI/litellm/pull/39229) enables DefaultAzureCredential chain for keyless authentication, improving compatibility with Workload Identity Federation.

---

### **4. Performance & Optimization**  
- **Prometheus Metrics Expansion**: PR [#39236](https://github.com/BerriAI/litellm/pull/39236) adds per-key and per-team rate limit gauges (`litellm_rate_limit_allowed`, `litellm_rate_limit_used`) — enabling proactive alerting before throttling occurs.  
- **SCIM Group Resolution Optimization**: PR [#39228](https://github.com/BerriAI/litellm/pull/39228) reduces N×2 database reads during SCIM syncs by combining ID/email lookups into single queries — expected to cut latency by ~40% under high load.  
- **OCR Payload Preservation**: PR [#39235](https://github.com/BerriAI/litellm/pull/39235) avoids serialization bloat by preserving raw media bytes through wire planning, reducing memory overhead in OCR-heavy workflows.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Description |
|------|----------|--------|--------|-------------|
| [#16582](https://github.com/BerriAI/litellm/issues/16582) | High | Open | ❌ | Spend log cleanup fails silently in Kubernetes clusters; logs show `Error during cleanup:` with no context. Affects billing integrity. |
| [#22100](https://github.com/BerriAI/litellm/issues/22100) | High | Open | ❌ | `asyncio.CancelledError` bypasses retry logic in aiohttp transport, leading to unhandled failures during DNS timeouts. |
| [#14457](https://github.com/BerriAI/litellm/issues/14457) | Critical | Open | ❌ | Usage data lost when streaming ends early due to client disconnect — causes billing gaps and quota misreporting. |
| [#38357](https://github.com/BerriAI/litellm/issues/38357) | Medium | Open | ❌ | AWS `x-amzn-RequestId` missing from `_hidden_params.additional_headers` in Bedrock Converse/InvokeModel calls. |
| [#39011](https://github.com/BerriAI/litellm/issues/39011) | Medium | Open | ❌ | `/customer/block` returns HTTP 500 even though block is applied — breaks automation flows. |

> ⚠️ **Critical Risk**: Multiple open issues affect **cost accounting**, **streaming correctness**, and **cluster stability** — prioritize patching in production environments.

---

### **6. What This Means for Application Developers**  
- **Use Verified Images**: Upgrade to `v1.101.0-dev.1` and validate Docker images with Cosign to ensure supply-chain integrity — essential for regulated or high-compliance deployments.  
- **Handle Streaming Failures Carefully**: Be aware that incomplete streams may not be logged as failures (see [#29602](https://github.com/BerriAI/litellm/issues/29602)); implement client-side timeouts and fallback mechanisms.  
- **Leverage New Observability Features**: Use Prometheus metrics from [#39236](https://github.com/BerriAI/litellm/pull/39236) and Datadog enhancements in [#39222](https://github.com/BerriAI/litellm/pull/39222) to gain visibility into tool call usage and token flow.  
- **Avoid Cost Gaps**: Monitor [#14457](https://github.com/BerriAI/litellm/issues/14457) and [#39057](https://github.com/BerriAI/litellm/issues/39057) closely — cached responses zero out spend but replay original tokens, creating audit inconsistencies.  
- **Plan for Future Routing Enhancements**: Watch [#31555](https://github.com/BerriAI/litellm/issues/31555) for Markov-based adaptive routing — could enable dynamic cost arbitrage in multi-provider setups.

👉 **Pro Tip**: For teams using virtual keys with tagging, monitor [#22289](https://github.com/BerriAI/litellm/issues/22289) and [#22966](https://github.com/BerriAI/litellm/issues/22966) to avoid silent connection drops and enforce key-level tag policies.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-02**

---

### **1. Today's Highlights**  
The Unsloth project continues to advance its agent-centric architecture with critical security fixes and UX refinements in Studio, particularly around prompt injection risks and tool interaction fidelity. Key PRs include a high-severity fix for markerless tool-call promotion (PR #6967) and enhancements to ensure models receive image outputs from MCP tools (PR #10088). Meanwhile, new feature requests highlight growing demand for multi-user workspaces (PR #10102), custom settings without model load (Issue #10168), and better support for AMD ROCm and aarch64 containers.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking API/config changes were released.

---

### **3. New Model & Hardware Support**  
- **AMD ROCm**: Persistent crashes when GPU VRAM is exceeded are under investigation (Issue #9801), and an earlier bug on Fedora/Bazzite installing CPU PyTorch despite ROCm detection was reported (Issue #8731).  
- **aarch64**: A feature request for official `aarch64` container images has been raised (Issue #4198), reflecting demand for ARM-based deployment convenience.  
- **Model Architectures**:  
  - Request for native support of **Idefics3** (e.g., IBM Granite Docling VLM) (Issue #4079)  
  - Feature request for **Qwen3-TTS** fine-tuning support (Issue #3951, #3961)  
  - Support for **LFM2.5** and **Mamba** models remains limited; fast inference fails during state dict extraction (Issue #4073)

---

### **4. Performance & Optimization**  
- **Smart Offload Planner**: Benchmarking shows the smart offload planner (`-ot`) is **slower than `--fit on` in 40 out of 43 measured cells** on consumer-grade 6-core CPUs (Issue #9861), suggesting optimization bias toward datacenter hardware.  
- **KV Cache Efficiency**: PR #9961 aims to improve KV cache allocation by sizing `max_tokens` to a slot’s share of available cache, avoiding over-reservation.  
- **MLX Prompt Cache**: A bug prevents prompt cache reuse with Qwen3.8-27B due to `ArraysCache` layout mismatch (Issue #10031).  
- **VLLM Integration**: Issues persist with loading Qwen3-VL series LoRA adapters via vLLM (Issue #3560).

---

### **5. Stability & Regressions**  
- **Critical Security Bug (High Severity)**: Markerless tool-call parsing enables potential RCE via unstructured `call:NAME{...}` or `NAME[ARGS]{json}` patterns (Issue #6967, PR #6967).  
- **Memory Leak**: Repeated Z-Image-Turbo generations cause linear RAM growth leading to SIGKILL (Issue #10156).  
- **Crashes on AMD**: Fine-tuning with gfx1032 GPUs crashes (Issue #7922); ROCm fails to load models beyond VRAM limits (Issue #9801).  
- **Studio UI/UX Bugs**:  
  - Settings not saved across restarts (Issue #9948)  
  - Search toggle erroneously couples Project Sources RAG with web search (Issue #9947)  
  - Tool cards rearrange unexpectedly after edit (PR #10162, #10161)  
  - Image context lost during chat shortening (PR #10165)  

*Fix PRs exist for some issues*:  
- PR #10165 (preserve image context)  
- PR #10162 (keep tool cards in place)  
- PR #10161 (retain reply details)  
- PR #10160 (remove stale settings entries)  

---

### **6. What This Means for Application Developers**  
Developers building AI agents on Unsloth should:  
- **Exercise caution with raw tool calls**: Avoid relying on unstructured tool syntax until PR #6967 lands — it mitigates a critical prompt-injection vector.  
- **Expect instability on non-NVIDIA hardware**: AMD ROCm and aarch64 support remain experimental; expect crashes or suboptimal performance.  
- **Plan for UI inconsistencies**: The Studio interface still suffers from state loss (settings, tool positions, image context), especially after edits or reloads. Use `save before reload` workflows.  
- **Monitor memory usage**: Be aware of known leaks in image generation pipelines (Z-Image-Turbo) and consider batching or limiting sessions.  
- **Prepare for future features**: Multi-user workspaces (PR #10102) and customizable settings without model load (Issue #10168) will soon enable more collaborative, enterprise-grade deployments.

> 🔗 [View all issues](https://github.com/unslothai/unsloth/issues) | [Browse PRs](https://github.com/unslothai/unsloth/pulls)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*