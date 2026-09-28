# AI Infrastructure Digest 2026-09-28

> Generated: 2026-09-28 01:09 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-28**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *high specialization and hardware convergence*, with projects increasingly targeting next-gen architectures (GB10, SM120/121, Apple Silicon MLX) while deepening support for hybrid models (Mamba/GDN, vision-language), advanced quantization (NVFP4, IQ2_NL/IQ3_NL, block-FP8), and agent-centric workflows. Stability remains a critical bottleneck—especially on cutting-edge hardware like RTX 5090 and DGX Spark—highlighting the growing tension between innovation velocity and production readiness. Meanwhile, Rust integration and native performance modules are emerging as key differentiators in gateway and runtime layers.

---

### **2. Activity Comparison**  

| Project         | Issues Open (High/Med) | PRs Merged (Last 24h) | Releases / Breaking Changes |
|----------------|------------------------|------------------------|------------------------------|
| **vLLM**       | 7 (3 High, 4 Medium)   | 8                      | None                         |
| **SGLang**     | 5 (All High)           | 5                      | None                         |
| **llama.cpp**  | 5 (2 Critical)         | 6                      | 4 new builds (b11221–b11223) |
| **Ollama**     | 6 (2 High, 4 Medium)   | 3                      | None                         |
| **LiteLLM**    | 3 (2 High, 1 Medium)   | 5                      | 2 cost map updates           |
| **Unsloth**    | 4 (1 Critical)         | 6                      | 1 major wheel release        |

> ✅ *Insight:* **vLLM** and **Unsloth** lead in technical depth and momentum, while **Ollama** and **SGLang** face acute stability challenges despite strong feature expansion.

---

### **3. Model Support Race**  

| New Model / Architecture      | Supported By                          | Status & Key Differentiation |
|-------------------------------|---------------------------------------|------------------------------|
| **Qwen3.8-Flash-Next-NVFP4** | vLLM ✅, Unsloth ✅                   | Full resident operation on GB10 via packed NVFP4 PLE embeddings — **vLLM leads in production readiness** |
| **KimiViT (Kimi-K3)**         | vLLM 🚧, SGLang ⚠️                    | Fused QK RoPE kernel in vLLM enables 29× decode speedup on GB300; SGLang lacks optimization |
| **GLM-5.3-Flash (vision)**    | llama.cpp ✅, vLLM ✅                 | vLLM fixes long-decode degeneration; llama.cpp adds experimental support |
| **DeepSeek-V4.1 (AMD gfx950)**| SGLang ✅                             | First cross-platform deployment beyond CUDA — **SGLang leads in hardware diversity** |
| **SANA-Video 2.0 (T2V/TI2V)** | SGLang ✅                             | Native diffusion support — **only project with full multimodal video generation path** |
| **Block-FP8 Models (e.g., Qwen3-FP8)** | Unsloth ✅, vLLM ✅, llama.cpp ✅ | Unsloth enables 4-bit NF4 loading; vLLM offers fused kernels — **unsurpassed in FP8 usability** |

> 🏆 **Winner**: **vLLM** in model-specific optimization, **SGLang** in cross-architecture reach, **Unsloth** in quantization flexibility.

---

### **4. Performance Frontier**  

| Optimization Focus          | Leading Projects                     | Key Advances |
|------------------------------|--------------------------------------|--------------|
| **KV Cache Efficiency**      | vLLM, SGLang, Unsloth                | HiSparse tiering observability (vLLM), TurboQuant (Unsloth), HiCache prefetch tuning (SGLang) |
| **Batching & Throughput**    | vLLM, llama.cpp                      | Batch invariance fixes (vLLM), RANK pooling batch splitting (llama.cpp), fused MoE kernels (SGLang) |
| **Kernel Fusion & Low-Level Tuning** | vLLM, Unsloth, llama.cpp         | GDN/fused Conv1D/RMSNorm (vLLM), FP8 eager execution (Unsloth), FlashAttention tile tuning (llama.cpp) |
| **Distributed & Disaggregated Serving** | vLLM, SGLang                  | HiSparse tiered offloading (vLLM), graph capture flexibility (SGLang) |
| **Memory Safety & OOM Prevention** | llama.cpp, Ollama, LiteLLM       | Silent OOM fixes (llama.cpp), `max_budget=0` bug (LiteLLM), VRAM overuse (Unsloth) |

> 🔍 **Trend**: The frontier is shifting from raw throughput to *predictable resource utilization* under high concurrency and complex workloads.

---

### **5. Layer Positioning**  

| Project         | Primary Layer                        | Role Summary |
|----------------|--------------------------------------|--------------|
| **vLLM**       | **Inference Engine**                 | Core engine for high-throughput, low-latency serving; optimized for modern GPUs and large-scale deployments |
| **SGLang**     | **Inference Gateway + Runtime**      | Unified interface for speculative decoding, grammar constraints, and multimodal tasks; bridges models and agents |
| **llama.cpp**  | **Local Runtime / Embedded Inference** | Cross-platform, CPU/Metal/Vulkan-focused; ideal for edge, mobile, and privacy-sensitive applications |
| **Ollama**     | **Developer Gateway / CLI Runtime**  | Developer-first abstraction layer; simplifies local model management but struggles with stability at scale |
| **LiteLLM**    | **Multi-Provider Gateway**           | Aggregation layer for cost-aware routing, fallbacks, and budget tracking across providers |
| **Unsloth**    | **Training/Fine-Tuning + Runtime**   | Full-stack toolkit with focus on LoRA training acceleration, tool call reliability, and Apple Silicon efficiency |

> 📊 **Positioning Insight**: vLLM dominates core inference; LiteLLM and SGLang define the future of *smart gateways*; Unsloth and llama.cpp anchor local/edge deployment.

---

### **6. Trend Signals**  

#### **Emerging Industry Trends (from 2026-09-28 activity):**
1. **Hardware-Specific Optimization Is Now Mandatory**  
   - Projects are no longer “one-size-fits-all.” Success depends on explicit support for SM120/SM121, GB10, MI350X, and Apple Silicon.
   - *Developer Action*: Validate models on target hardware early — avoid relying on generic benchmarks.

2. **Rust Integration Is the Next Performance Battleground**  
   - LiteLLM and Unsloth are moving toward native Rust modules to bypass Python GIL and improve latency.
   - *Developer Action*: Prepare for migration paths; expect tighter integration between Rust-based inference and Python tooling.

3. **Agent Workflows Are Driving Stability Demands**  
   - Tool-call hangs, detokenizer state loss, and silent image discards are recurring themes — all impact agent reliability.
   - *Developer Action*: Never assume structured output integrity; implement end-to-end validation and retry logic.

4. **Cost Accountability Is Maturing Beyond Pricing Tables**  
   - LiteLLM’s `metadata.completion_window` billing fix and Ollama’s budget limit bugs show that financial control is now a core engineering requirement.
   - *Developer Action*: Audit cost tracking in your stack — especially for WebSockets and agent APIs.

5. **Model-Centric Stability Is No Longer Optional**  
   - GLM-5.3-Flash, Qwen4Exp, and Cohere MoE models are causing crashes even on high-end hardware.
   - *Developer Action*: Use `--max-model-len`, monitor memory usage, and avoid untested model variants until fixes land.

---

### ✅ **Final Recommendation for Application Developers**  
- **For production inference**: Choose **vLLM** for GPU-native, scalable serving with best-in-class optimizations.  
- **For agent systems**: Prioritize **SGLang** or **LiteLLM** for robust grammar handling and multi-provider fallbacks.  
- **For edge/local deployment**: Use **llama.cpp** (Vulkan/Metal) or **Unsloth** (Apple Silicon).  
- **Avoid unstable versions** (e.g., Ollama 0.34.4, llama.cpp b9016+ on Jetson) until regressions are resolved.  
- **Always validate model behavior** — don’t trust `vision` capabilities or `response_format` if they’re not explicitly tested.  

> 🛠️ **Pro Tip**: Monitor `collect_env.py` outputs and enable debug flags (`GGML_RPC_DEBUG=1`, `VLLM_BATCH_INVARIANT=1`) during deployment — many issues are environment-specific.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-28

---

### **1. Today's Highlights**  
The vLLM project continues to mature its support for next-generation hardware and advanced inference patterns, with significant progress on **batch invariance correctness**, **HiSparse tiered offloading observability**, and **Rust frontend parity**. Critical fixes landed for **GLM-5.3-Flash long-decode stability**, **Qwen4Exp NVFP4 memory management**, and **GDN/MTP prefix cache corruption**, while new PRs enhance debugging (watchdog) and performance (fused kernels).

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes announced.

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen3.8-Flash-Next-NVFP4** now supports packed NVFP4 PLE embeddings via [PR #56273](https://github.com/vllm-project/vllm/pull/56273), enabling full resident operation on a single DGX Spark (GB10) without disk offloading.  
- 🚧 **KimiViT (Kimi-K3)** gains fused QK RoPE kernel ([PR #58651](https://github.com/vllm-project/vllm/pull/58651)), improving decode latency by up to **29× on GB300** (256 tokens).  
- ⚙️ **Vulkan support** remains a high-priority feature request ([Issue #21182](https://github.com/vllm-project/vllm/issues/21182))—not yet implemented but actively discussed.  
- 🔧 **ROCm support** is advancing: fused QK-norm+RoPE+gate kernel enabled for Qwen3-Next/Qwen3.5 ([PR #51406](https://github.com/vllm-project/vllm/pull/51406)).

---

### **4. Performance & Optimization**  
- 📈 **HiSparse Tiering**: New observability features ([PR #58949](https://github.com/vllm-project/vllm/pull/58949)) log steady-state max concurrency and expose host-tier utilization gauges—critical for tuning large-scale offload systems.  
- ⚡ **Fused Kernels**:  
  - GDN non-speculative decode now routes through fused CUDA kernel ([PR #53463](https://github.com/vllm-project/vllm/pull/53463)), eliminating separate launches of Conv1D, recurrent kernel, and RMSNorm.  
  - Qwen3.5 GDN `in_proj` fused into 6-way MergedColumnParallelLinear ([PR #41457](https://github.com/vllm-project/vllm/pull/41457)), reducing operator count and improving fusion opportunities.  
- 🎯 **MiniMax-M3-NVFP4 on 8x B200**: Post-correctness fix benchmark shows **EAGLE3 2.1–2.3× decode speedup** ([Issue #51494](https://github.com/vllm-project/vllm/issues/51494)).  
- 🛠️ **Dynamic PDL Enablement**: Undocumented flags (`TRTLLM_ENABLE_PDL`, `TORCHINDUCTOR_ENABLE_PDL`) now under RFC ([Issue #40543](https://github.com/vllm-project/vllm/issues/40543))—potential low-latency boost on Hopper/Blackwell.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| 🔴 High | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash long-decode degeneration after accumulated reasoning decode | In progress |
| 🔴 High | [#56457](https://github.com/vllm-project/vllm/issues/56457) | Qwen4Exp QSA indexer grows per-chunk logits buffer → OOM/hang on unified-memory GB10 (SM121) during prefill | In progress |
| 🔴 High | [#56824](https://github.com/vllm-project/vllm/issues/56824) | Engine startup collapses host memory (~22 GiB free) on DGX Spark (GB10, unified memory) | In progress |
| 🟡 Medium | [#56370](https://github.com/vllm-project/vllm/issues/56370) | Batch invariance broken when sequence parallelism + async TP enabled (`VLLM_BATCH_INVARIANT=1`) | Closed with fix pending |
| 🟡 Medium | [#53912](https://github.com/vllm-project/vllm/issues/53912) | Prefix caching + MTP corrupts output on hybrid Mamba/GDN models | Open; regression from v0.28.0 |
| 🟡 Medium | [#48312](https://github.com/vllm-project/vllm/issues/48312) | Weight reload correctness for RL training — potential data loss risk | RFC under review |

---

### **6. What This Means for Application Developers**  
- **Use `VLLM_BATCH_INVARIANT=1` cautiously**—it’s broken with SP/async TP; avoid until [PR #56370](https://github.com/vllm-project/vllm/pull/56370) lands.  
- **Leverage HiSparse observability** ([PR #58949](https://github.com/vllm-project/vllm/pull/58949)) to monitor host-tier utilization and prevent over-provisioning in disaggregated deployments.  
- **Avoid `response_format` + `tool_choice: "auto"`** if using structured outputs—this can suppress tool calls ([Issue #39929](https://github.com/vllm-project/vllm/issues/39929)).  
- **Expect crashes on DGX Spark (GB10)** with large models like Qwen4Exp or GLM-5.3-Flash—check for unified memory exhaustion and use `--max-model-len` aggressively.  
- **Prepare for Rust frontend adoption**—feature parity roadmap underway ([Issue #44280](https://github.com/vllm-project/vllm/issues/44280)); expect improved low-latency, resource-efficient serving.  

> ✅ **Pro Tip**: Use `collect_env.py` and report all details when opening issues—many regressions are tied to specific GPU (e.g., SM121) and model combinations.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **1. Today's Highlights**  
The SGLang project continues to deepen its support for next-generation hardware and inference patterns, with key progress in AMD GPU (gfx950) integration for DeepSeek-V4.1 and the introduction of native SANA-Video 2.0 diffusion support. Critical stability fixes were merged to prevent crashes during speculative decoding and grammar-constrained request handling, while performance tuning efforts focus on KV cache efficiency and prefill throughput bottlenecks on Blackwell-era GPUs.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes reported in the last 24 hours.*  
However, several PRs are preparing for future compatibility:  
- [PR #41492](https://github.com/sgl-project/sglang/pull/41492): Adds native SANA-Video 2.0 (T2V/TI2V) support — a major step toward unified multimodal serving.  
- [PR #41493](https://github.com/sgl-project/sglang/pull/41493): Fixes GLM47 streaming parser to avoid dropping buffered tool calls — critical for agent workflows relying on structured output.

---

### **3. New Model & Hardware Support**  
- **AMD (gfx950 / MI350X)**: [PR #41308](https://github.com/sgl-project/sglang/pull/41308) enables full DeepSeek-V4.1 serving on AMD GPUs via DSpark, expanding SGLang’s cross-architecture reach beyond CUDA.  
- **Cambricon MLU**: [PR #26898](https://github.com/sgl-project/sglang/pull/26898) introduces an in-tree prototype backend for Cambricon MLU devices, validated with Qwen3-8B.  
- **SANA-Video 2.0**: Native support added for text-to-video (T2V) and text-image-to-video (TI2V), closing [#41490](https://github.com/sgl-project/sglang/issues/41490).  
- **Intel XPU**: Continued improvements with W4A16 compressed tensors via int4pack path ([PR #40828](https://github.com/sgl-project/sglang/pull/40828)), enabling efficient low-bit quantization.

---

### **4. Performance & Optimization**  
- **Prefill Throughput on SM120 (Blackwell)**: Users report ~2–7K tok/s for DeepSeek-V4.1 on 4× RTX PRO 6000 (PCIe-only), significantly below vLLM/Marlin’s ~12.5K — sparking investigation into kernel coverage and config optimization ([Issue #33422](https://github.com/sgl-project/sglang/issues/33422)).  
- **HiCache Prefetch Delay**: A known perf regression causes long TTFT under load due to delayed HiCache storage prefetch finalization ([Issue #32724](https://github.com/sgl-project/sglang/issues/32724)).  
- **Kernel-Level Gains**: Fused MoE Triton configs for Qwen3.8-Flash-Next FP8 on H200 NVL now include down-projection kernels ([PR #39153](https://github.com/sgl-project/sglang/pull/39153)), improving end-to-end throughput.  
- **Graph Capture Flexibility**: [RFC #33852](https://github.com/sgl-project/sglang/issues/33852) proposes relaxing prefill CUDA graph capture constraints to allow smaller batch sizes under post-capture KV sizing — potentially boosting utilization.

---

### **5. Stability & Regressions**  
Top stability concerns today:  
1. **Crash on Grammar-Constrained Request Abort**: Aborting a constrained request during grammar compilation returns HTTP 400 instead of proper error — impacts agent logic reliability ([Issue #41465](https://github.com/sgl-project/sglang/issues/41465)).  
2. **Request ID Overlap Bug**: `/abort_request` with a partial rid aborts all requests whose IDs start with it — a serious security risk in multi-user environments ([Issue #41474](https://github.com/sgl-project/sglang/issues/41474)).  
3. **Speculative Decoding Crash with GLM-5.3**: Severe repetition and degenerate loops observed when using DFLASH speculative decoding with GLM-5.3 ([Issue #40843](https://github.com/sgl-project/sglang/issues/40843)).  
4. **Detokenizer State Eviction Loss**: Streaming silently drops up to 5 tokens when detokenizer state is evicted mid-request ([Issue #41236](https://github.com/sgl-project/sglang/issues/41236)).  
5. **Client Disconnect Crashes Engine**: Uncaught `asyncio.CancelledError` causes entire engine shutdown during client disconnection ([Issue #39216](https://github.com/sgl-project/sglang/issues/39216)).

> ✅ *Fixes in progress*: Several PRs target these issues (e.g., [PR #41493](https://github.com/sgl-project/sglang/pull/41493) for streaming, [PR #41449](https://github.com/sgl-project/sglang/pull/41449) for deadlock detection).

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding and grammar constraints**: Avoid relying on `abort_request` with partial RIDs; expect potential ID collision risks.  
- **Monitor token loss in streaming responses**: If using high-concurrency workloads, be aware of detokenizer eviction risks — consider increasing `SGLANG_DETOKENIZER_MAX_STATES`.  
- **Leverage emerging hardware support**: For cost-sensitive deployments, evaluate AMD gfx950 and Intel XPU backends via recent PRs — especially for video generation (SANA-Video 2.0) and low-bit inference.  
- **Prepare for configuration tuning**: With reported prefill throughput gaps on Blackwell GPUs, developers should validate model configs and consider custom kernel tuning via RFCs like #33852.  
- **Expect tighter control over admin endpoints**: The addition of optional auth for `/flush_cache` ([#32772](https://github.com/sgl-project/sglang/issues/32772)) signals growing focus on secure production deployment.

---  
*Digest generated: 2026-09-28 | Source: [sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-28**

---

### **1. Today's Highlights**  
The latest updates focus on enhancing support for modern reranking models, particularly causal LLM-based rerankers like Qwen3 and Qwen3-VL, with the introduction of RANK pooling batch splitting in the server (`#28876`). This enables efficient handling of large input sets without requiring full token alignment. Concurrently, performance tuning continues across backends—Vulkan (Intel), CUDA (FP16 FlashAttention), and SYCL—with notable improvements in kernel efficiency and memory safety.

---

### **2. Releases & Breaking Changes**  
- **`b11223`**: Added support for **RANK pooling batch splitting** in the server for causal LLM rerankers (e.g., Qwen3, Qwen3-VL) via `#28876`. This allows partial batching of rerank inputs, critical for high-throughput retrieval systems.  
  🔗 [PR #28876](https://github.com/ggml-org/llama.cpp/pull/28876)  
- **`b11222`**: Fixed parameter parsing side effects; now unconditionally registers `--rpc` and defers `llama_supports_rpc()` call to handler only. Improves server initialization robustness.  
  🔗 [PR #29537](https://github.com/ggml-org/llama.cpp/pull/29537)  
- **`b11221`**: Enforced strict validation in `string_split<T>` — now throws instead of undefined behavior on invalid input. Enhances safety in config parsing.  
  🔗 [PR #29518](https://github.com/ggml-org/llama.cpp/pull/29518)  
- **`b11212`**: Changed grammar handling: throws error instead of aborting when `llguidance` is missing. Avoids silent crashes during prompt generation.  
  🔗 [PR #29516](https://github.com/ggml-org/llama.cpp/pull/29516)

---

### **3. New Model & Hardware Support**  
- **New model support**:  
  - Added experimental support for **GLM-5.3-Flash (GLM5-Next)**, a 320B hybrid text+vision model, via `#27773`.  
    🔗 [PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773)  
- **New quantization types**:  
  - Introduced **IQ2_NL** and **IQ3_NL** quantization formats across CPU, Metal, CUDA, and Vulkan backends (`#27983`, `#27325`, `#27324`, `#27322`). These are designed for better precision at low bit-widths, especially on non-multiples of 256 tensor dimensions.  
    🔗 [PR #27983](https://github.com/ggml-org/llama.cpp/pull/27983)  
- **Hardware backends**:  
  - Added CI build for **IBM zDNN backend** (no tests yet), enabling future support on mainframe platforms.  
    🔗 [PR #29541](https://github.com/ggml-org/llama.cpp/pull/29541)  
  - Continued optimization for **XDNA**, requested in `#21725` (feature request).  

---

### **4. Performance & Optimization**  
- **CUDA**: Tuned FP16 tile FlashAttention configs for head sizes 40–112 (`#26289`) — improves throughput on dense attention patterns.  
  🔗 [PR #26289](https://github.com/ggml-org/llama.cpp/pull/26289)  
- **SYCL**: Extended FWHT kernels to support block widths up to 1280 using Kronecker/Paley construction (`#29243`). Enables larger FFTs on AMD devices.  
  🔗 [PR #29243](https://github.com/ggml-org/llama.cpp/pull/29243)  
- **HIP**: Enabled `fattn-mma` kernel on cdna for `dkq > 256` in large batch scenarios (`#28907`) — reduces latency in multi-GPU MoE inference.  
  🔗 [PR #28907](https://github.com/ggml-org/llama.cpp/pull/28907)  
- **Vulkan**: Improved GDN kernel performance and fixed Intel GPU regression (`#29476`). Benchmarks show **~6.3% faster** on RTX 3090 for ubatch=2048/4096.  
  🔗 [PR #29476](https://github.com/ggml-org/llama.cpp/pull/29476)  
- **AVX512-FP16**: Accumulating dot products in `f32` prevents overflow (`#29545`) — maintains numerical accuracy while enabling higher throughput.  
  🔗 [PR #29545](https://github.com/ggml-org/llama.cpp/pull/29545)  

---

### **5. Stability & Regressions**  
- **Critical crash**: `#29499` reports `llama-server` hangs on **Jetson Orin NX (aarch64, L4T 36.4.7)** after `b8638` → `b9016` server rewrite. Affects edge deployment.  
  🔗 [Issue #29499](https://github.com/ggml-org/llama.cpp/issues/29499)  
- **Crash on vision models**: `#28954` — `ggml_assert` triggered when processing images > ~1.2 Mpx with Gemma4 models due to non-causal attention limitations.  
  🔗 [Issue #28954](https://github.com/ggml-org/llama.cpp/issues/28954)  
- **Silent OOM**: `#29494` — `repeat_last_n` and `dry_penalty_last_n` not bounded; can allocate multi-GB zero-filled buffers leading to server OOM.  
  🔗 [Issue #29494](https://github.com/ggml-org/llama.cpp/issues/29494)  
- **RPC buffer overflow**: `#26912` — `SET_ROWS` can write past output buffer in release builds (ASan-triggered). Security-sensitive.  
  🔗 [Issue #26912](https://github.com/ggml-org/llama.cpp/issues/26912)  
- **Fixes in progress**:  
  - `#29543` addresses image chunk overflow crash in non-causal attention paths.  
    🔗 [PR #29543](https://github.com/ggml-org/llama.cpp/pull/29543)  

---

### **6. What This Means for Application Developers**  
- **For agents/retrieval systems**: Use `b11223`+ to efficiently run **Qwen3/Qwen3-VL rerankers** with partial batching — ideal for high-volume search pipelines.  
- **For edge/MoE deployment**: Leverage `IQ2_NL/IQ3_NL` quantizations to run large MoE models (e.g., Qwen3-235B) on constrained VRAM via PCIe DMA streaming (`#26448`).  
- **For production servers**: Avoid `--split-mode tensor` with `iq4_nl` kv-cache (`#27116`) until fix lands. Monitor for OOMs with long context or DRY sampling.  
- **For cross-platform apps**: Expect improved Vulkan (Intel) and Jetson (Orin NX) stability soon — but avoid `b9016+` on Jetson until `#29499` is resolved.  
- **Best practice**: Enable `GGML_RPC_DEBUG=1` (`#29544`) for deeper debugging of RPC communication issues in distributed setups.

---  
*Data source: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-28**

---

### **1. Today's Highlights**  
Critical stability issues have emerged across multiple backends, including CUDA crashes on RTX 5090 with Cohere MoE models and a persistent `llama-server` wedge in 0.34.4 after full cache hits. Concurrently, users report severe billing loop bugs blocking access to Ollama Cloud — a high-priority concern for enterprise and paid users. These issues highlight growing strain on inference reliability under heavy workloads and complex model architectures.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, ongoing changes affect client compatibility:  
- `typical_p` is no longer supported (Issue [#18542](https://github.com/ollama/ollama/issues/18542)), breaking clients that rely on its presence. This change may impact tooling like SillyTavern.  
- The Cloud API still returns legacy subscription data post-pay-as-you-go migration (Issue [#18653](https://github.com/ollama/ollama/issues/18653)), indicating incomplete backend alignment.

---

### **3. New Model & Hardware Support**  
- **Model**: `deepseek-v4.1-flash:cloud` now advertises `vision` capabilities but silently discards image inputs (Issue [#18527](https://github.com/ollama/ollama/issues/18527)) — a critical misalignment between interface and behavior.  
- **Hardware**: Intel UHD 0x4626 iGPU not detected via Vulkan on Windows (Issue [#18672](https://github.com/ollama/ollama/issues/18672)).  
- **Backend**: MLX support continues to be refined on Apple Silicon, with discussion around shared model weights for concurrent inference (Issue [#18669](https://github.com/ollama/ollama/issues/18669)).

---

### **4. Performance & Optimization**  
- **MLX on macOS**: NVFP4 models suffer extreme slowdowns under memory pressure (Issue [#16030](https://github.com/ollama/ollama/issues/16030)) — performance degradation observed even on high-end Macs.  
- **CUDA Memory Management**: `OLLAMA_GPU_OVERHEAD` is ignored by `llama-server`, failing to reserve VRAM as intended (Issue [#18679](https://github.com/ollama/ollama/issues/18679)).  
- **Parser Efficiency**: Several PRs (e.g., [#18687](https://github.com/ollama/ollama/pull/18687), [#18624](https://github.com/ollama/ollama/pull/18624)) target chunk boundary handling in tool-call parsers, aiming to prevent tag loss and improve streaming fidelity.

---

### **5. Stability & Regressions**  
**High Severity**:  
- **CUDA crash on RTX 5090** with Cohere MoE models (Issue [#18642](https://github.com/ollama/ollama/issues/18642)): Consistent `illegal memory access` error leading to server crash (`exit status 0xc0000409`). No fix PR yet.  
- **`llama-server` wedging** on full-cache-hit tasks (Issue [#18685](https://github.com/ollama/ollama/issues/18685)): Subsequent requests hang indefinitely — affects Linux/CUDA deployments. Critical for long-running inference services.  

**Medium Severity**:  
- Core dump when serving GPT-OSS with `Ollama_KV_CACHE_TYPE=q8_0` (Issue [#16946](https://github.com/ollama/ollama/issues/16946)): Fixed in PR #11685 but reverted — currently unresolved.  
- Silent image discard despite `vision` capability (Issue [#18527](https://github.com/ollama/ollama/issues/18527)): Affects agent workflows relying on multimodal input.  

---

### **6. What This Means for Application Developers**  
- **Avoid `typical_p`** in API calls — expect errors from older clients (e.g., SillyTavern). Update integrations promptly.  
- **Do not trust `vision` capability claims** for cloud models like `deepseek-v4.1-flash:cloud`; validate image ingestion behavior explicitly.  
- **Expect instability on cutting-edge hardware**: RTX 5090 and Apple Silicon MLX are showing significant regressions; test thoroughly under load.  
- **Monitor for hanging requests** on 0.34.4 — particularly under repeated caching scenarios. Consider rolling back or upgrading once fixes land.  
- **Design robust error handling** for tool-call parsing — chunk boundary issues (e.g., [#18681](https://github.com/ollama/ollama/issues/18681), [#18676](https://github.com/ollama/ollama/issues/18676)) can corrupt structured outputs.  
- **Billing integration risks**: If using Ollama Cloud, verify payment flow — accounts stuck in Stripe loops may require manual intervention (Issue [#18683](https://github.com/ollama/ollama/issues/18683)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-28**

---

### **1. Today's Highlights**  
The LiteLLM project is advancing its core infrastructure with a series of critical fixes and new Rust-based module integrations, particularly around authentication, routing, and cost tracking. High-severity issues related to budget limiting, model fallbacks, and token usage logging have been highlighted, indicating ongoing refinement in multi-provider reliability and financial accountability. Notably, the team has initiated a major shift toward native Rust integration for inference paths, signaling long-term performance and security ambitions.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, two significant PRs were merged to update cost map data:  
- [PR #43509](https://github.com/BerriAI/litellm/pull/43509): Deprecation date for `gpt-oss-20b` and `gemma-4-31B-it` on Together AI updated to **2026-09-15**, aligning with official deprecation history.  
- [PR #43507](https://github.com/BerriAI/litellm/pull/43507): Added `deprecation_date` for `Salesforce/Llama-Rank-V1` in Together AI catalog.  

These changes may impact users relying on deprecated models or automated price sync pipelines.

---

### **3. New Model & Hardware Support**  
- **Tsubasa**: Added native routing and dashboard discovery support via [PR #43502](https://github.com/BerriAI/litellm/pull/43502), enabling direct integration into LiteLLM’s provider ecosystem.  
- **Azure**: Support added for **Mistral Document AI OCR** and **Mistral 3.5 Medium** (via [PR #32637](https://github.com/BerriAI/litellm/pull/32637)) — important for enterprise document processing workloads.  
- **OCI GenAI**: Fixed realm resolution logic to support government cloud regions (e.g., `us-luke-1`) by resolving endpoints from compartment OCID instead of hardcoding `oraclecloud.com` ([PR #43180](https://github.com/BerriAI/litellm/pull/43180)).  

> ✅ *Note: No new quantization formats or CPU/Metal/CUDA kernel-level hardware optimizations reported today.*

---

### **4. Performance & Optimization**  
- **Rust Integration Initiative**: A suite of new Rust modules is being introduced to improve performance and reduce Python GIL contention:  
  - [PR #43465](https://github.com/BerriAI/litellm/pull/43465): Opt-in native Python inference path via `python-bridge` routes.  
  - [PR #43466](https://github.com/BerriAI/litellm/pull/43466): Structured route lifecycle tracing across audio transcription, chat, responses, and websockets.  
  - [PR #43467](https://github.com/BerriAI/litellm/pull/43467): Separated authentication and authorization layers for improved scalability and auditability.  
- **Cost Tracking Precision**: [PR #43477](https://github.com/BerriAI/litellm/pull/43477) ensures chat requests are billed according to caller-specified `metadata.completion_window` (`asap`, `balanced`, `flex`), preventing misbilling due to dropped metadata.

> 📈 *Expected outcomes:* Lower latency per request, better observability, and more granular cost attribution — especially for agent workflows and real-time systems.

---

### **5. Stability & Regressions**  
Top stability concerns reported today:

1. **Critical: Router Fallback Returns Null Response Body**  
   - [Issue #43165](https://github.com/BerriAI/litellm/issues/43165): After timeout fallback to a healthy deployment, non-streaming completions return HTTP 200 with `null` body.  
   - **Impact**: Breaks client-side error handling; could lead to silent failures in agents or UIs.  
   - **Status**: Open, high severity. No fix PR yet.

2. **High: Budget Limiting Treats `max_budget=0` as Unlimited**  
   - [Issue #43214](https://github.com/BerriAI/litellm/issues/43214): Setting `max_budget=0` does not block spend — instead treated as "no limit."  
   - **Impact**: Can cause unintended cost overruns in production environments.  
   - **Status**: Open. Fix PR pending.

3. **Medium: Token Usage Logged as Zero for Responses API WebSocket Mode**  
   - [Issue #38674](https://github.com/BerriAI/litellm/issues/38674): Agent CLI traffic using `/v1/responses` WebSocket reports `prompt_tokens=0`, breaking cost tracking.  
   - **Impact**: Inaccurate spend logs for developer tools and autonomous agents.  
   - **Status**: Open.

> 🔧 *Fixes in progress:* Several PRs address streaming failure logging ([#43505](https://github.com/BerriAI/litellm/pull/43505)) and duplicate reasoning text ([#40673](https://github.com/BerriAI/litellm/pull/40673)).

---

### **6. What This Means for Application Developers**  
- **Use caution with budget limits and fallbacks**: Until [issue #43214](https://github.com/BerriAI/litellm/issues/43214) is resolved, avoid relying on `max_budget=0` to enforce spending caps — use `max_budget=0.01` as a workaround.  
- **Monitor cost tracking for WebSockets and agent APIs**: If you're using `/v1/responses` or agent CLIs (e.g., Cursor, Codex), be aware that token usage may be incorrectly logged as zero ([#38674](https://github.com/BerriAI/litellm/issues/38674)).  
- **Leverage new Rust modules for high-throughput apps**: The new `python-bridge` and `gateway-auth` splits signal future improvements in concurrency and security — prepare for upcoming migration paths.  
- **Validate model aliases and deprecations**: With recent updates to Together AI’s cost map, ensure your deployments don’t rely on now-deprecated models like `gpt-oss-20b`.  

> ✅ *Actionable tip:* Audit your proxy configuration for `model_list` entries with slugs missing from the price map — they can silently result in zero-cost logging ([#42161](https://github.com/BerriAI/litellm/issues/42161)).

---  
*Digest compiled from GitHub activity at 2026-09-28 | Source: [BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-28**

#### **1. Today's Highlights**  
The Unsloth ecosystem saw a major push in infrastructure readiness with the release of prebuilt CUDA 13 wheels for `flash-attn 2.8.4`, `causal-conv1d 1.7.0`, and `mamba-ssm 2.3.2.post1` on PyTorch 2.13/2.14 and Python 3.13—critical for high-performance inference on modern GPU stacks. Simultaneously, core stability improvements were merged to fix critical tool-call hangs (`#12048`) and Pinyin input issues on macOS (`#12137`), while new features like multi-model serving and auto-scroll during generation advanced UI polish.

#### **2. Releases & Breaking Changes**  
- **New Prebuilt Wheels (cu13)**:  
  Released today: `prebuilt-wheels-cu13` for Linux x86_64 with CUDA 13, supporting:
  - `flash-attn 2.8.4`
  - `causal-conv1d 1.7.0`
  - `mamba-ssm 2.3.2.post1`  
  Built for **PyTorch 2.13 and 2.14**, **Python 3.13**, enabling faster LLM inference on supported hardware.  
  🔗 [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/prebuilt-wheels-cu13)  

- **PyTorch Version Upgrade**:  
  The torch ceiling has been raised from `<2.13.0` to `<2.15.0` in `pyproject.toml` (`#12152`), allowing newer versions to be used with `prebuilt-wheels-cu13`. New Studio installs on Linux cu130+Python3.13 now default to **torch 2.13**, while existing installations remain unchanged.  
  🔗 [PR #12152](https://github.com/unslothai/unsloth/pull/12152) | 🔗 [PR #12150](https://github.com/unslothai/unsloth/pull/12150)

#### **3. New Model & Hardware Support**  
- **MLX Inference Enhancements**:  
  Added **TurboQuant KV cache quantization** support for MLX on Apple Silicon (`#11170`). Offers 4-bit, 3.5-bit, 3-bit, and 2-bit options with no equivalent in `mx.quantize`. Also introduced **MLX memory estimation** in the Load Model panel via `/api/inference/estimate-memory` (`#10287`).  
  🔗 [PR #11170](https://github.com/unslothai/unsloth/pull/11170) | 🔗 [PR #10287](https://github.com/unslothai/unsloth/pull/10287)  

- **Multi-GPU & Manual Layer Splits**:  
  PR `#10770` enables explicit `--split-mode layer` emission for manual multi-GPU loading, resolving ambiguity in tensor splitting behavior. This improves predictability when using custom GPU ratios.  
  🔗 [PR #10770](https://github.com/unslothai/unsloth/pull/10770)

- **Block-FP8 Quantization Support**:  
  Now supports loading block-FP8 checkpoints (e.g., Qwen3-FP8, GLM-5.3-Flash) in 4-bit NF4 mode when `load_in_4bit=True` is passed (`#12146`). Fixes prior silent failure during model load.  
  🔗 [PR #12146](https://github.com/unslothai/unsloth/pull/12146)

#### **4. Performance & Optimization**  
- **LoRA Training Speedup (Block-FP8)**:  
  PR `#12027` accelerates block-FP8 LoRA training by **running FP8 linears eagerly** and using **8 warps per 128-row GEMM tile**, reducing latency by **4–15x** on RTX PRO 6000, L4, H100, and B200 GPUs. This targets DeepSeek-style FP8 models.  
  🔗 [PR #12027](https://github.com/unslothai/unsloth/pull/12027)

- **FP8 Scale Axis Fix**:  
  PR `#11799` fixes incorrect rowwise FP8 scale application in fused LoRA backward pass for square weights—previously causing silent correctness issues.  
  🔗 [PR #11799](https://github.com/unslothai/unsloth/pull/11799)

- **Memory Efficiency**:  
  PR `#12119` ensures checkpoint compaction remains active even under `--disable-tools`, preventing loss of searchability in long chats.  
  🔗 [PR #12119](https://github.com/unslothai/unsloth/pull/12119)

#### **5. Stability & Regressions**  
- **Critical Tool Call Hangs**:  
  Issue `#12048` reported: terminal tool calls can hang indefinitely due to unbounded recursion in shell variable expansion (`VAR=$VAR` in quotes). Fixed in `#12087` via synchronous credential guard hardening.  
  🔗 [Issue #12048](https://github.com/unslothai/unsloth/issues/12048) | 🔗 [PR #12087](https://github.com/unslothai/unsloth/pull/12087)

- **macOS Pinyin Input Blockage**:  
  Issue `#12137`: Enter key fails to send messages when using macOS Pinyin IME. Fixed in `#12138` by properly handling idle composition state.  
  🔗 [Issue #12137](https://github.com/unslothai/unsloth/issues/12137) | 🔗 [PR #12138](https://github.com/unslothai/unsloth/pull/12138)

- **Fine-Tuning VRAM Overuse**:  
  Issue `#4504` reports severe VRAM overconsumption during fine-tuning, causing OOMs even with advertised low memory profiles. No fix yet; still open.  
  🔗 [Issue #4504](https://github.com/unslothai/unsloth/issues/4504)

- **Antivirus False Positive**:  
  Bitdefender flagged `Unsloth-Desktop-Windows.exe` as malicious (`CMD:Heur.BZC.PZQ.Boxter.791.181E0B21`). Reported but not resolved.  
  🔗 [Issue #12140](https://github.com/unslothai/unsloth/issues/12140)

#### **6. What This Means for Application Developers**  
- **Deployments on CUDA 13 + Python 3.13**: Use the new `prebuilt-wheels-cu13` for immediate performance gains in FlashAttention2, Mamba, and Causal Conv1D workloads—ideal for production inference stacks.  
- **Build Efficient Agents**: Leverage TurboQuant KV cache (`#11170`) and block-FP8 4-bit loading (`#12146`) to reduce memory pressure and enable faster agent reasoning on Apple Silicon and NVIDIA GPUs.  
- **Avoid Tool Call Deadlocks**: Ensure your tool commands avoid nested self-referential assignments (`VAR=$VAR`) in quoted strings until `#12087` is deployed.  
- **Handle Long Chats**: With `--disable-tools`, use `#12119` to maintain checkpoint compaction and preserve chat history integrity.  
- **Monitor Fine-Tuning Memory**: Be cautious with large model fine-tuning—VRAM usage may exceed expectations per `#4504`. Consider gradient checkpointing or lower batch sizes.  

> ✅ **Recommendation**: Pin dependencies to `unsloth>=2026.09.28` and ensure `torch==2.13` or `2.14` when using cu130/Python3.13 environments.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*