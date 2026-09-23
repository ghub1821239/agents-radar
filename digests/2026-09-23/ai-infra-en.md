# AI Infrastructure Digest 2026-09-23

> Generated: 2026-09-23 00:54 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-23**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a new phase of specialization and hardware-aware optimization, driven by next-generation architectures like NVIDIA SM100/Blackwell (SM120), AMD ROCm gfx950/gfx942, and Intel XPU. Projects are increasingly diverging in focus: high-performance inference engines (vLLM, SGLang) push the envelope on throughput and distributed scalability, while local runtimes (llama.cpp, Ollama) prioritize portability and developer experience. Meanwhile, gateways (LiteLLM) and fine-tuning platforms (Unsloth) are evolving into full-stack agent enablers with multimodal support and production-grade reliability features.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑) | PRs Merged (↑) | Release Status       | Notes |
|---------------|------------------|------------------|------------------------|-------|
| **vLLM**      | 874 (+12)        | 762 (+315)       | v0.30.0 live           | High contributor velocity; stability concerns persist |
| **SGLang**    | 789 (+9)         | 408 (+14)        | No new release         | Strong engineering momentum; critical regressions under review |
| **llama.cpp** | 1,415 (+6)       | 293 (+14)        | b11115-b11113 series   | Focused on stability fixes; fewer new features |
| **Ollama**    | 2,342 (+11)      | 187 (+6)         | v0.34.1 released       | High user-facing bug count; macOS GUI fix resolved |
| **LiteLLM**   | 1,028 (+5)       | 426 (+8)         | v1.102.0 released      | Security and cost tracking upgrades; auditability focus |
| **Unsloth**   | 1,253 (+8)       | 1,160 (+23)      | v0.1.814-beta launched | Rapid development cycle; beta model support surge |

> *Data reflects activity from 2026-09-22 to 2026-09-23. "↑" indicates recent trend.*

---

### **3. Model Support Race**

| New Model / Architecture     | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash**       | ✅ (MXFP8 + FlashMLA V4.1) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**             | ✅ (SM120, rope-free MLA) | ✅ (ROCm MXFP4) | ❌ | ✅ (dynamic image res) | ❌ | ❌ |
| **Kimi-K3**                   | ⚠️ (tracking) | ✅ (ROCm MXFP4) | ❌ | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1**            | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (local GGUF/native) |
| **NVIDIA Blackwell (SM120)**  | ✅ (GLM-5.3-Flash) | ❌ | ❌ | ✅ (fix pending) | ✅ (new models) | ❌ |
| **AMD ROCm (gfx950/gfx942)**  | ✅ (Qwen3.8-2.4T-A95B roadmap) | ✅ (Kimi-K3, GLM-5.2) | ✅ (A8 Q4_K DP4A) | ❌ | ❌ | ✅ (RDNA1 training) |
| **Intel XPU**                 | ✅ (All-to-all EP for MoE) | ❌ | ✅ (SYCL IQ3 layout) | ❌ | ❌ | ✅ (training unstable) |

**Winner**: **SGLang** leads in **multi-hardware model parity**, especially for **ROCm** and **NPU CANN** support.  
**Leader in vision-language**: **Unsloth** with **Qwen-Image-2.1** now fully supported locally — unmatched elsewhere.  
**Most comprehensive hardware coverage**: **vLLM** dominates on **NVIDIA Hopper+ and Blackwell**, with broad MXFP8 and FlashMLA integration.

---

### **4. Performance Frontier**

| Optimization Focus         | vLLM                     | SGLang                    | llama.cpp               | Ollama                  | LiteLLM                | Unsloth               |
|-----------------------------|--------------------------|---------------------------|--------------------------|-------------------------|------------------------|------------------------|
| **KV Cache & State Management** | MXFP8/4, prefix caching, async prefetching | Unified Radix Cache, LMCache extensibility | L1 carveout, MTMD sanity checks | BF16 retention in Qwen 3.8 MLX | Rust-based cost engine | Offline top-k logprobs |
| **Batching & Parallelism**  | CUDA graphs, breakable configs, MTP | DCP + Helix (fi_a2a default) | MTMD robustness, grouped experts | Dynamic prompt budgeting | Rate limit handling | Multi-card LoRA (experimental) |
| **Quantization**            | MXFP8/4 → FP8 expert dequant, AWQ fusion | MXFP4 dense-MoE, split speculative reductions | A8 Q4_K DP4A, IQ3_S/IQ4_NL | BF16 retention, MXFP8 | Cosign-signed images | FP8 checkpoints, packed INT4/INT8 |
| **Kernel-Level Optimization** | Fused AWQ-GEMM, Triton attention tiles | Occupancy-preserving JIT kernels | Vulkan/Xe Flash Attention, SYCL GEMM | MLX-specific TPS gains | E2E test resilience | VAE kernel compilation |
| **Distributed Serving**     | Async Engram prefetching | DCP + Helix (fi_a2a default) | ❌ | ❌ | ❌ | ❌ |

> **Trend**: **distributed inference** (SGLang) and **hardware-aware quantization** (vLLM, Unsloth) are now core differentiators. **Kernel-level tuning** remains the primary lever for sub-10% latency improvements.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Role Summary |
|---------------|----------------------------------|--------------|
| **vLLM**      | **Inference Engine**             | High-throughput, low-latency serving on NVIDIA/AMD; optimized for large-scale deployments |
| **SGLang**    | **Distributed Inference Framework** | Advanced parallelism (DCP, Helix), PD disaggregation, and communication backend abstraction |
| **llama.cpp** | **Local Runtime / Embedded Backend** | Cross-platform inference via GPU backends (Vulkan, OpenCL, SYCL); ideal for edge and embedded systems |
| **Ollama**    | **Developer-Friendly Gateway**   | Simplified CLI/API; focuses on usability, multimodal input, and agent workflows |
| **LiteLLM**   | **Multi-Provider Gateway**        | Unified API layer with cost tracking, rate limiting, and security controls across cloud providers |
| **Unsloth**   | **Fine-Tuning + Agent Runtime**  | End-to-end platform for local training (QLoRA), reasoning acceleration, and multimodal agent deployment |

> **Key Insight**: The stack is bifurcating: **engineers** use vLLM/SGLang for scale; **developers** rely on Ollama/LiteLLM for rapid prototyping; **researchers** turn to Unsloth for agent-driven training.

---

### **6. Trend Signals**

#### 🔍 **Emerging Industry Trends**:
1. **Hardware-Native Optimization Is Now Standard**  
   - MXFP8/4, FlashMLA, and SM100/SM120-specific kernels are no longer experimental — they’re required for competitive performance.
   - *Signal*: Expect all major inference stacks to adopt hardware-aware quantization and kernel fusion within 6 months.

2. **Multimodal Agents Are Going Local**  
   - Unsloth’s Qwen-Image-2.1 support marks a turning point: **vision-language agents can now run entirely offline** without cloud dependencies.
   - *Signal*: Local multimodal inference will become a baseline requirement for agent applications.

3. **Distributed Serving Is Maturing Beyond Simple Pipeline Parallelism**  
   - SGLang’s adoption of `fi_a2a` as default communication backend shows a shift toward **low-latency, scalable inter-node coordination**.
   - *Signal*: Future agent backends will require integrated DCP/Helix support to avoid bottlenecks.

4. **Security & Auditability Are Non-Negotiable in Enterprise Gateways**  
   - LiteLLM’s cosign signing, auth-required `/metrics`, and post-call receipt middleware reflect growing compliance demands.
   - *Signal*: Production-grade AI systems must include **supply chain verification** and **tamper-evident logging**.

#### 🛠️ **What Application Developers Should Watch**:
- **Avoid `GLM-5.3-Flash` in multi-turn agents** — known repetition bugs (vLLM Issue #56605).
- **Do not use `flashinfer_megamoe` + EAGLE speculation on sm_107 GPUs** — crash risk (SGLang #40623).
- **Monitor `/metrics` scraping behavior** — silent hangs in llama.cpp (#29104) and LiteLLM PII risks.
- **Use `--cache-disk` cautiously** — long-context apps may need it soon (llama.cpp #20697).
- **Upgrade Ollama only after verifying stability** — v0.34.1 has multiple UI/agent regressions.

> ✅ **Recommendation**: For production agents, **combine vLLM (inference) + SGLang (distributed) + LiteLLM (gateway) + Unsloth (fine-tuning)** — this stack offers maximum control, scalability, and safety.

---  
*Report compiled by Senior AI Infrastructure Analyst | 2026-09-23*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-23**

---

### **1. Today's Highlights**  
The vLLM v0.30.0 release introduces full support for **DeepSeek-V4.1-Flash**, leveraging MXFP8 storage and FlashMLA V4.1 on SM100 GPUs, significantly improving prefill throughput. Key advancements include async Engram prefetching and new optimizations for DeepSeek-V4 on both NVIDIA (SM90/SM100) and AMD ROCm (gfx950/gfx942) platforms.

---

### **2. Releases & Breaking Changes**  
- **v0.30.0** is now live with 762 commits from 315 contributors (104 new). No major API-breaking changes reported; focus remains on performance and stability improvements.  
  🔗 [GitHub Release v0.30.0](https://github.com/vllm-project/vllm/releases/tag/v0.30.0)

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash**: Full integration with MXFP8 KV cache and FlashMLA V4.1 on SM100 (Hopper+), via PR #56214, #56228, #56208.  
- ✅ **GLM-5.3-Flash**: Added support for SM120 (Blackwell) with rope-free sparse MLA path — critical for RTX PRO 6000 (PR #53963).  
- ✅ **Kimi K3**: Tracking issue open for model support (Issue #50001); ROCm CI test group added (PR #58012).  
- ✅ **AMD ROCm (gfx950 / MI355X)**: Performance optimization roadmap initiated for Qwen3.8-2.4T-A95B (Issue #57149).  
- ✅ **Intel XPU**: All-to-all EP backend for batched MoE under development (PR #46871).

---

### **4. Performance & Optimization**  
- **Prefill Speedup (NVIDIA)**: Fused AWQ dequant + GEMM kernel (`awq_gemm_fused_fp32`) introduced for SM89 under `VLLM_BATCH_INVARIANT=1` (PR #57047). Reduces memory bandwidth pressure.  
- **Decode Optimization (ROCm)**: Narrowed Triton prefill attention tile on RDNA3/RDNA4 to improve occupancy (PR #58225).  
- **DiffusionGemma**: One-pass sampler statistics kernel reduces decode latency in high-concurrency scenarios (PR #58226).  
- **MoE Optimization**: Opt-in lossless MXFP4 → block-FP8 expert dequant for DeepSeek-V4 on Hopper (PR #53709), enabling faster prefill.  
- **CUDA Graphs**: Default use of breakable CUDA graphs under `VLLM_BATCH_INVARIANT` improves matmul config tuning (PR #57586).

---

### **5. Stability & Regressions**  
- ⚠️ **Critical Regression**: GLM-5.3-Flash exhibits "word salad" repetition in multi-turn agentic use (Issue #56605, 19 comments). *No fix PR yet*.  
- ⚠️ **Degenerate Output**: Long-decode degeneration observed after accumulated reasoning decode (Issue #56868, 22 comments). Related to prefix caching and state management.  
- ⚠️ **ROCm Decode Corruption**: Silent retrieval corruption for prompts ≥4k tokens on AMD MI325X (Issue #52109, 11 comments). Reproducible in nightly builds.  
- ⚠️ **GPU Hangs**: Intel Arc B70 (Battlemage) crashes with GP fault + BCS engine reset (Issue #41663, 40 comments). Affects `intel/vllm:0.17.0-xpu`.  
- ✅ **Fixes Merged**:  
  - Skipped `VllmConfig` re-validation for submodel views (PR #58212).  
  - Fixed misrouting race condition in P/D disaggregation (PR #51681).  

---

### **6. What This Means for Application Developers**  
- **Use v0.30.0** for best performance with **DeepSeek-V4.1-Flash** and improved **GLM-5.3-Flash** stability on Blackwell GPUs.  
- Avoid using `torch.compile` with `VLLM_BATCH_INVARIANT=1` if you need dynamic batching — switch to breakable graphs via PR #57586 for better runtime adaptation.  
- If deploying **multi-turn agents**, be cautious with **GLM-5.3-Flash** due to known repetition bugs; monitor Issue #56605 closely.  
- For **AMD ROCm deployments**, expect ongoing tuning: use `MI355X`-specific benchmarks (Issue #57149) and test large-prompt workloads carefully.  
- Consider **prefix caching + MTP** only after validating against Issue #53912 (corruption in hybrid Mamba/GDN models).  
- Leverage **new parser cache features** (Issue #57571) for stable tool call IDs during streaming retries.

🔗 [vLLM GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-23

---

### **1. Today's Highlights**  
SGLang continues its momentum in advanced inference optimizations, with key progress on **Decode Context Parallelism (DCP)** and **Helix Parallelism**, now using `fi_a2a`/`a2a` as the default communication backend across all models. Critical fixes for **NIXL-based PD disaggregation**, **EAGLE speculative decoding stability**, and **AMD ROCm support for MXFP4 quantized models** were merged or are under review, signaling strong momentum toward production-grade distributed serving.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes announced.

---

### **3. New Model & Hardware Support**  
- ✅ **Kimi-K3 (MXFP4)**: Full ROCm support added via PR #40811, enabling AMD GPU inference for Quark-quantized checkpoints.  
- ✅ **SenseNova-U1/U1.5**: Tracking issue #37742 confirms ongoing integration efforts based on official OpenSenseNova repo.  
- ✅ **NPU CANN 9.1.0**: Updated in PR #40524 to align with current Ascend toolkit release, supporting Python 3.12.  
- ✅ **ROCm GLM-5.2 decode path**: PR #40358 introduces MXFP4 dense-MoE experts, decode-shaped tiles, and split speculative reductions for AMD.  

> 🔗 [PR #40811](https://github.com/sgl-project/sglang/pull/40811) | [PR #40358](https://github.com/sgl-project/sglang/pull/40358) | [PR #40524](https://github.com/sgl-project/sglang/pull/40524)

---

### **4. Performance & Optimization**  
- 🚀 **DCP + Helix Parallelism**: The `fi_a2a`/`a2a` backend is now default for every model (#39165), improving inter-node communication efficiency. Fused `fi_a2a` + LSE combine remains pending but is a high-priority item (#29736).  
- ⚙️ **Memory Pool & Disaggregation**: PRs #39731 and #40794 standardize logical token capacity reporting and improve DFlash draft KV transfer logic in PD+DCP workflows.  
- 🔧 **Kernel Optimizations**:  
  - PR #40767 adds occupancy-preserving L1 carveout preference for JIT kernels.  
  - PR #40800 and #40799 fix redundant residual accumulation in Nemotron MTP and LongCat MoE shortcuts, reducing compute overhead.  
- 💡 **Unified Radix Cache**: PR #38652 enables LMCache as an external backend; PR #40807 removes unreachable `RadixCache` paths, streamlining the codebase.

> 🔗 [Issue #29736](https://github.com/sgl-project/sglang/issues/29736) | [PR #40767](https://github.com/sgl-project/sglang/pull/40767) | [PR #38652](https://github.com/sgl-project/sglang/pull/38652)

---

### **5. Stability & Regressions**  
Critical stability issues reported today:

| Severity | Issue | Summary | Fix Status |
|--------|------|--------|----------|
| 🔴 High | [#40623](https://github.com/sgl-project/sglang/issues/40623) | Illegal memory access in Triton fused-MoE kernel when combining `flashinfer_megamoe` with EAGLE speculative decoding (GLM-5.2-NVFP4, sm_107) | ❌ Pending |
| 🔴 High | [#33397](https://github.com/sgl-project/sglang/issues/33397) | Output corruption under concurrency on 2× H200 (DeepSeek-V4-Flash + DP attention) | ❌ Pending |
| 🟡 Medium | [#36333](https://github.com/sgl-project/sglang/issues/36333) | Zombie request after disconnected streaming client, leading to max_tokens decode and "state was deleted" logs | ❌ Regression from #34160 revert |
| 🟡 Medium | [#39831](https://github.com/sgl-project/sglang/issues/39831) | GLM-5.3-Flash vision broken due to pinned `transformers==5.12.1` lacking `glm5_next`, degrading to `TokenizersBackend` | ❌ Pending |

> Note: Several of these regressions impact production-scale deployments, particularly around EAGLE speculation and multi-GPU concurrency.

---

### **6. What This Means for Application Developers**  
- **Use `--dcp-comm-backend fi_a2a` by default** for improved scalability in multi-node setups — no need to override unless debugging.  
- **Avoid `flashinfer_megamoe` + EAGLE speculation on sm_107 GPUs** until PR #40623 is resolved; expect crashes.  
- **Expect better AMD support** — Kimi-K3 MXFP4 and GLM-5.2 ROCm paths are now stable for testing.  
- **Be cautious with long-running streaming sessions** — disconnects may leave zombie requests; monitor logs for `state was deleted`.  
- **Future-proof your deployment**: The unified radix cache refactor (#20415) and LMCache integration (#38652) signal deeper KV-cache extensibility for agents and caching layers.

> 🔗 [RFC #20415](https://github.com/sgl-project/sglang/issues/20415) | [PR #38652](https://github.com/sgl-project/sglang/pull/38652)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-23**

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes in the server and backend layers, particularly around model loading races and GPU context management. New kernel optimizations for Intel Xe Flash Attention (Vulkan) and A8 Q4_K DP4A support on OpenCL enhance performance on modern hardware. Notably, a fix was merged to prevent silent hangs during `/metrics` scraping — a key issue for observability pipelines.

---

### **2. Releases & Breaking Changes**  
- **b11115**: Added `kernel_gemm_noshuffle_q4_k_q8_1_dp4a_ila_a8_bin` for OpenCL (A8 quantization), improving inference efficiency on compatible devices.  
  🔗 [PR #29056](https://github.com/ggml-org/llama.cpp/pull/29056)  
- **b11113**: Fixed model load race conditions by routing all model loads through the queue (`server: fix router eviction races`). This prevents premature eviction of models loaded via fast path.  
  🔗 [PR #29217](https://github.com/ggml-org/llama.cpp/pull/29217)  
- **b11110**: Introduced sanity checks in MTMD (Multi-Token Model Dispatcher), enhancing robustness under high concurrency.  
  🔗 [PR #29276](https://github.com/ggml-org/llama.cpp/pull/29276)

> ✅ *No breaking API changes reported today.*

---

### **3. New Model & Hardware Support**  
- **OpenCL**: Added support for **A8 quantized Q4_K** kernels with DP4A instructions, enabling faster inference on AMD GPUs with newer compute capabilities.  
  🔗 [PR #29056](https://github.com/ggml-org/llama.cpp/pull/29056)  
- **Vulkan**: Expanded **Intel Xe Flash Attention (FA)** optimization for **Xe-LPG Plus/Xe2/Xe3** architectures, including split-k path improvements and host code updates.  
  🔗 [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406)  
- **SYCL**: Continued progress on Intel Arc Pro B70 optimizations, including IQ3 layout reordering and persistent MMVQ layouts.  
  🔗 [PR #29107](https://github.com/ggml-org/llama.cpp/pull/29107)

---

### **4. Performance & Optimization**  
- **Flash Attention (Vulkan)**: Optimized FA kernel paths for Intel Xe GPUs, reducing latency in long-context scenarios. Fixes previously observed test failures on A770 Linux.  
  🔗 [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406)  
- **CUDA**: Added `IQ4_NL` support in flash attention KV cache and fixed dequantization kernels. Also introduced **grouped experts top-k fusion**, recovering ~80%+ of performance lost due to expert grouping.  
  🔗 [PR #29181](https://github.com/ggml-org/llama.cpp/pull/29181), [PR #29292](https://github.com/ggml-org/llama.cpp/pull/29292)  
- **SYCL**: Enhanced GEMM scheduling for grouped MoE models using XMX tiles; enables better utilization of Intel Arc’s compute units.  
  🔗 [PR #29245](https://github.com/ggml-org/llama.cpp/pull/29245)

---

### **5. Stability & Regressions**  
- **Critical**: `llama-server` silently stops processing when scraped by VictoriaMetrics (`/metrics` endpoint).  
  🔗 [Issue #29104](https://github.com/ggml-org/llama.cpp/issues/29104) *(No fix PR yet)*  
- **High Severity**: SIGSEGV in token-counting routes during server wake-up from sleep state. Caused by stale vocab/mctx capture.  
  🔗 [Issue #29188](https://github.com/ggml-org/llama.cpp/issues/29188) *(No fix PR yet)*  
- **Moderate**: Crashes on Qwen3.5 checkpoints post-#20087, likely due to context checkpoint corruption.  
  🔗 [Issue #20176](https://github.com/ggml-org/llama.cpp/issues/20176) *(Fix pending)*  
- **Regression**: Severe prompt speed drop after `b10780` on Vulkan/RDNA3 — linked to recent FA or memory management changes.  
  🔗 [Issue #28752](https://github.com/ggml-org/llama.cpp/issues/28752)

> ⚠️ *Several stability issues remain unresolved; monitor CI and release notes closely.*

---

### **6. What This Means for Application Developers**  
- **Use `--cache-disk` cautiously**: While not yet implemented, the high demand for disk-based context offloading (#20697) signals future need for scalable long-context apps. Watch for upcoming features.
- **Avoid `/metrics` scraping without care**: If using Prometheus/VictoriaMetrics, consider disabling `/metrics` or patching the server until #29104 is resolved.
- **Optimize for Intel Arc & AMD RDNA3**: Leverage new kernels in b11115+ for improved throughput on supported hardware. Prioritize `IQ3_S`, `IQ4_NL`, and `Q4_K_A8` quantizations where available.
- **Speculative decoding caution**: Be aware that greedy speculative decoding may diverge on quantized models (e.g., Q4_K_M) vs. full precision — check outputs carefully.  
  🔗 [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618)

> 🛠️ *Best practice: Always test speculative decoding output against non-speculative baselines, especially on quantized targets.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# **Ollama Digest – 2026-09-23**

---

### **1. Today's Highlights**  
The Ollama team made significant progress in multimodal inference with dynamic image resolution support for Gemma 4 and performance optimizations for Qwen 3.8 on MLX. Critical stability fixes were merged for macOS GUI responsiveness and CUDA detection on NVIDIA Blackwell GPUs, while new features like increased web search limits (up to 10 per response) and structured output improvements are now under review.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, **v0.34.1** (released earlier this week) introduced a critical regression in the macOS GUI due to `osascript` blocking the main thread — resolved via PR [#18601](https://github.com/ollama/ollama/pull/18601), which replaced System Events polling with direct process inspection.

---

### **3. New Model & Hardware Support**  
- ✅ **Gemma 4**: Dynamic image token budget selection across 70–1120 tokens based on input resolution ([PR #18603](https://github.com/ollama/ollama/pull/18603)), resolving OCR issues with high-res images.
- 🚀 **Qwen 3.8 Flash Next**: MLX-specific memory efficiency improvements via BF16 retention in key layers and MXFP8 quantization elsewhere ([PR #18078](https://github.com/ollama/ollama/pull/18078)).
- 🔧 **NVIDIA Blackwell (RTX 50-series)**: Fixed CUDA VRAM detection failure on Windows with driver 616.92 ([Issue #18581](https://github.com/ollama/ollama/issues/18581), PRs pending).
- 💻 **Docker + MLX/Vulkan**: Added missing libraries/configs for Nvidia GPU support in containers ([PR #18592](https://github.com/ollama/ollama/pull/18592)).

---

### **4. Performance & Optimization**  
- **Qwen 3.8 Prompt Processing (MLX)**: Up to **+19.1% prompt TPS** on M5 Max at 8k tokens ([PR #18550](https://github.com/ollama/ollama/pull/18550)).
- **Gemma 4 Image Resolution Selection**: Eliminates unnecessary downsampling of high-res inputs, preserving detail without sacrificing efficiency.
- **Memory Efficiency (Qwen 3.8 MLX)**: Reduced memory pressure by keeping non-expert MTP path and QSA projections in BF16 instead of NVFP4.
- **Web Search Limit Increase**: Raised from 3 to **10 searches per response** ([PR #18602](https://github.com/ollama/ollama/pull/18602)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|--------|
| ⚠️ High | macOS app freezes after v0.34.1 update due to `osascript` on main thread | Closed | [PR #18601](https://github.com/ollama/ollama/pull/18601) |
| ⚠️ High | Long document processing fails silently after 60 seconds (no UI feedback) | Open | — |
| ⚠️ High | `top_logprobs` capped at 20 despite backend support for higher values | Open | [PR #18590](https://github.com/ollama/ollama/pull/18590) |
| ⚠️ High | `homebrew` ollama cannot provide structured output with mlx models | Open | [PR #18597](https://github.com/ollama/ollama/pull/18597) |
| ❌ Critical | `qwen3.8:27b` hangs on `/v1/chat/completions` but works via CLI/API | Open | [Issue #17790](https://github.com/ollama/ollama/issues/17790) |
| ⚠️ Medium | Ollama Cloud: Frequent "model unavailable" errors during agentic workflows | Open | [Issue #18293](https://github.com/ollama/ollama/issues/18293) |

> Note: Several regressions stem from recent changes in `thinking`, `format`, and `structured output` handling — particularly affecting `qwen3` models.

---

### **6. What This Means for Application Developers**  
- **Use `max_soft_tokens` dynamically** for vision tasks with Gemma 4; avoid hardcoded 280-budget assumptions.
- **Expect slower performance on older Ollama versions (0.33.x)** — users may see ~5x slower token generation on RTX 3090 vs 0.32.13 ([Issue #18225](https://github.com/ollama/ollama/issues/18225)); recommend pinning to stable releases until fix lands.
- **Avoid `top_logprobs > 20`** unless you're using custom backends — Ollama enforces a hard cap not required by llama.cpp or native runners.
- **Structure outputs carefully**: `think: true` is ignored when `format` is set in `/api/generate`, but works in `/api/chat` — use consistent endpoints.
- **Monitor for silent failures** in long-running agents: timeouts >60s yield no UI feedback ([Issue #18368](https://github.com/ollama/ollama/issues/18368)).
- **For production deployments**, prefer `ollama export/import` for model migration ([PR #18578](https://github.com/ollama/ollama/pull/18578)) over manual blob copying.

> 🔗 *See full issue tracker:* [github.com/ollama/ollama/issues](https://github.com/ollama/ollama/issues)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-23**

#### **1. Today's Highlights**  
The latest release, **v1.102.0**, introduces enhanced security through **cosign-signed Docker images**, reinforcing trust in the supply chain. Critical fixes address budget enforcement failures for on-prem models (#14004), double-counting rate limits (#34140), and cost tracking bugs in streaming requests (#42161). A new PR (#42587) ensures evaluation spend is correctly attributed to admins, improving auditability in enterprise deployments.

#### **2. Releases & Breaking Changes**  
- **v1.102.0** released with **cosign-based image signing** (via [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)) — all official images now verifiable via `cosign verify`.  
- **Backport PR #42618** brings critical fixes to `stable/1.102.x`: proper handling of upstream handshake refusal (preventing 1006 close codes) and improved OTEL metadata propagation.  
- **Security**: `/metrics` endpoint now requires explicit auth (`require_auth_for_metrics_endpoint: true`) to prevent PII leaks in multi-tenant setups ([#24530](https://github.com/BerriAI/litellm/issues/24530)).

#### **3. New Model & Hardware Support**  
No new model or hardware backends added today. However:  
- **Azure** now supports **20 additional models** including `gpt-5.x` chat and Grok variants via updated pricing sync ([#42594](https://github.com/BerriAI/litellm/pull/42594)).  
- **OpenRouter** prices updated for **19 models**, including 9 previously missing entries ([#42592](https://github.com/BerriAI/litellm/pull/42592)).  
- **Fireworks AI** adds **2 new models** with full pricing catalog integration ([#42590](https://github.com/BerriAI/litellm/pull/42590)).

#### **4. Performance & Optimization**  
- **Rust-based cost engine expansion** ([#42620](https://github.com/BerriAI/litellm/pull/42620)): Standalone Rust pricing now handles image, OCR, video, batch, guardrail, tiered, and Gemini grounding costs — enabling faster, more consistent cost calculation across providers.  
- **E2E test resilience** ([#42628](https://github.com/BerriAI/litellm/pull/42628)): CI now tolerates provider-side flakes (e.g., Mistral 429s, Vertex cache rejects), reducing false positives in test suites.  
- **CI efficiency**: Removed dead test shards and added warnings for unbounded SQL `IN` lists ([#42603](https://github.com/BerriAI/litellm/pull/42603), [#42629](https://github.com/BerriAI/litellm/pull/42629)), preventing future performance regressions.

#### **5. Stability & Regressions**  
- **Critical**: Budget enforcement fails for free on-prem models when budget is exceeded ([#14004](https://github.com/BerriAI/litellm/issues/14004)) — fix in progress via PR #32618.  
- **High severity**: Rate limiter double-counts team per-model limits → effective RPM/TPM is half configured ([#34140](https://github.com/BerriAI/litellm/issues/34140)) — fix PR pending review.  
- **Medium**: Streaming requests cost as $0 when `model_name` is an alias ([#42161](https://github.com/BerriAI/litellm/issues/42161)) — confirmed in PR #42630.  
- **Low**: Admin dashboard logs flood with stacktraces for non-admin users ([#30442](https://github.com/BerriAI/litellm/issues/30442)) — known stale issue.

#### **6. What This Means for Application Developers**  
- **Audit-ready deployments**: Use `require_auth_for_metrics_endpoint: true` and ensure `project_spend` tracking is enabled — current gaps in project budget enforcement ([#33871](https://github.com/BerriAI/litellm/issues/33871)) may lead to silent cost overruns.  
- **Avoid cost inaccuracies**: If using model aliases in streaming calls, expect zero-cost logging — apply direct model names or monitor PR #42630 for resolution.  
- **Enterprise compliance**: Leverage new post-call receipt middleware proposal ([#29895](https://github.com/BerriAI/litellm/issues/29895)) for tamper-evident audit trails under EU AI Act Article 12.  
- **CI reliability**: Expect fewer flaky test failures due to provider-side instability; use `stable/1.102.x` for production stability with backported fixes.

---  
*Data source: [BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-23**

#### **1. Today's Highlights**  
Unsloth has launched **v0.1.814-beta** with full local inference support for **Qwen-Image-2.1**, including custom Agent Skills, improved chat/project management, and a **2x speedup in reasoning blocks (60 FPS vs 30 FPS)**. The release also addresses critical stability issues across Linux installations and AMD GPU compatibility, marking a major step toward production-grade multimodal agent deployment.

#### **2. Releases & Breaking Changes**  
- **v0.1.814-beta**: Officially adds Qwen-Image-2.1 support with enhanced reasoning performance and streamlined project workflows.  
  🔗 [Release Notes](https://unsloth.ai/docs/models/qwen-image-2.1)  
- **v0.1.813–812-beta**: Early beta versions of the same feature set; users upgrading from older versions should ensure they clear model caches to avoid conflicts with new `mmproj` and MTP head requirements.  
  🔗 [Qwen Image 2.1 Guide](https://unsloth.ai/docs/models/qwen-image-2.1)

> ⚠️ **Migration Note**: Models like `Qwen3.8-Flash-Next-GGUF` may fail to load if downloaded before their `mmproj` or MTP head was available—**delete and re-download** to resolve.

#### **3. New Model & Hardware Support**  
- **New Model**: Full local inference support for **Qwen-Image-2.1** via GGUF and native backend.  
  🔗 [Model Docs](https://unsloth.ai/docs/models/qwen-image-2.1)  
- **Hardware/Backend**:  
  - **AMD ROCm**: Ongoing improvements for RDNA1 (gfx1010) training via PR #11615 (Triton buffer ops disable).  
  - **Intel XPU**: Training support confirmed but unstable due to `adamw_8bit` optimizer crashes (Issue #10021).  
  - **NVIDIA**: NVFP4 image policy support now extends to video diffusion models (Wan2.2-TI2V-5B, HunyuanVideo-1.5) via flashinfer FP4 backend (PR #10730).  
- **Quantization**: Support for **NVIDIA ModelOpt FP8 checkpoints** via transformers' fp8 quantizer (PR #11592), and **compressed-tensors packed INT4/INT8** directly into bitsandbytes 4-bit (PR #11537).

#### **4. Performance & Optimization**  
- **Reasoning Speed**: 2x improvement in reasoning blocks — **60 FPS vs 30 FPS** on recent benchmarks.  
- **VAE Optimization**: Studio now compiles VAE decode kernels per render, reducing latency in DiT-based image generation (PR #10889).  
- **Memory Efficiency**:  
  - **Offline top-k logprobs** enable distillation from massive teachers (e.g., Deepseek-V3, Kimi-K2) without loading them into training memory (Issue #11556).  
  - **Group offload** is now considered for large models (e.g., Qwen-Image-2.1 on A100), avoiding whole-module paging (Issue #11547).  
- **Multi-GPU Scaling**: Experimental support for multi-card LoRA fine-tuning via Unsloth Studio (Feature Request #5764), though current behavior defaults to single GPU.

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix/Workaround |
|------|----------|--------|----------------|
| [AMD GPU detection broken in latest llama.cpp build](https://github.com/unslothai/unsloth/issues/7485) | High | Closed | Reinstall via `pip install --upgrade unsloth unsloth_zoo` |
| [Qwen-Image-2.1 requires manual steps to run](https://github.com/unslothai/unsloth/issues/11567) | Medium | Open | Manual cache cleanup needed |
| [AMDGPU VM fault/reset during QLoRA training (RX 7900 XTX)](https://github.com/unslothai/unsloth/issues/11498) | Critical | Open | No fix yet; workaround: avoid QLoRA on RX 7900 XTX |
| [API key copy fails in Firefox/Brave](https://github.com/unslothai/unsloth/issues/11387) | Medium | Closed | Browser-specific issue; try Chrome or Edge |
| [Studio strips `--tensor-split` flag, causing OOM on MoE models](https://github.com/unslothai/unsloth/issues/11330) | High | Closed | Fixed in v0.1.814-beta |

#### **6. What This Means for Application Developers**  
- **Build multimodal agents faster**: With Qwen-Image-2.1 now fully supported locally, developers can deploy vision-language agents without cloud dependencies. Use **custom Agent Skills** for dynamic task routing.  
- **Optimize inference cost**: Leverage **60 FPS reasoning blocks** and **NVFP4 quantization** for real-time, low-latency agent responses.  
- **Scale training safely**: Use **offline top-k logprobs** to distill from large models without VRAM overflow. For AMD users, **avoid RDNA1 cards for QLoRA training** until PR #11615 lands.  
- **Enhance UX**: Enable **multi-model serving** (PR #11591) and **durable chat replay** (PR #10910) for persistent, stateful agent interactions.  
- **Watch for regressions**: If using AMD GPUs, monitor for VM faults during training; consider using Intel XPU or NVIDIA for stable fine-tuning.

🔗 **Key Resources**:  
- [Qwen-Image-2.1 Guide](https://unsloth.ai/docs/models/qwen-image-2.1)  
- [GitHub Issues Dashboard](https://github.com/unslothai/unsloth/issues)  
- [Pull Requests (Latest)](https://github.com/unslothai/unsloth/pulls)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*