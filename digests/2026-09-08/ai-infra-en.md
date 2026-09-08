# AI Infrastructure Digest 2026-09-08

> Generated: 2026-09-08 00:39 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in September 2026 is defined by a convergence of high-performance serving engines, low-level runtime optimizations, and agentic workflow maturity. Projects like vLLM and SGLang are pushing the envelope on deterministic inference at scale, particularly for next-gen Blackwell GPUs and speculative decoding. Meanwhile, llama.cpp and Ollama continue to dominate edge and local deployment with growing support for new quantizations and hardware targets. LiteLLM and Unsloth are increasingly acting as integrative layers, enabling multi-provider routing and streamlined developer experience—especially for agent-centric applications. The ecosystem is shifting from isolated tooling toward tightly coupled, production-grade stacks where stability, reproducibility, and observability are now paramount.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑/↓) | PRs Merged (↑/↓) | Releases (Last 24h) | Status |
|---------------|-------------------|------------------|----------------------|--------|
| **vLLM**      | 578 (+3)          | 9 (+2)           | None                 | Active development; critical regressions in progress |
| **SGLang**    | 642 (+5)          | 12 (+3)          | None                 | High stability pressure; CUDA core dumps under scrutiny |
| **llama.cpp** | 721 (+4)          | 8 (+1)           | None                 | Performance gains but major stability issues on AMD/Vulkan |
| **Ollama**    | 987 (+6)          | 5 (+0)           | None                 | Regression-heavy; `0.33.x` performance cliff reported |
| **LiteLLM**   | 813 (+2)          | 7 (+1)           | v1.100.1 imminent    | Security and routing fixes prioritized |
| **Unsloth**   | 428 (+3)          | 6 (+2)           | None                 | UX and cross-platform fixes in motion |

> *Note: Issue counts reflect open tickets as of 2026-09-08. Trends indicate increasing focus on GPU kernel stability and model correctness over feature velocity.*

---

### **3. Model Support Race**

| New Model / Architecture        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next-FP8**     | ✅ | ⚠️ (HiCache issue) | ✅ (experimental) | ✅ (regression risk) | ⚠️ (not yet listed) | ❌ |
| **DeepSeek-V4-Flash**          | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **GLM-5.3-Flash**              | ✅ | 🔴 (HiCache restore bug) | ✅ | ✅ | ✅ | ❌ |
| **Spark-X2.5 (4B/1.7B)**       | ❌ | ❌ | ❌ | ✅ (PR #18279) | ❌ | ❌ |
| **Hy4-preview (Tencent)**      | ❌ | ❌ | ❌ | 📌 (community request) | ❌ | ❌ |
| **Wan2.2 TI2V (AMD video gen)**| ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ (missing fused kernel) |
| **TwelveLabs Marengo Embed 3.0**| ❌ | ❌ | ❌ | ❌ | ✅ (PR #40180) | ❌ |

> **Winner**: **Ollama** leads in **new architecture adoption**, especially Spark-X2.5 via integration with `llama.cpp`. **SGLang** and **vLLM** lead in **high-fidelity model support** for cutting-edge FP8 and Flash variants, though plagued by stability risks. **LiteLLM** dominates in **enterprise-facing model routing** with embedders and provider parity.

---

### **4. Performance Frontier**

| Optimization Focus             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache Efficiency**         | ✅✅✅ | ✅✅ | ✅ | ✅ | ✅ | ✅ |
| **Speculative Decoding (MTP/EAGLE)** | ✅✅✅ | ✅✅ | ✅✅ | ✅ | ✅ | ✅✅ |
| **Quantization & Kernel Fusion**| ✅✅✅ | ✅✅ | ✅✅✅ | ✅ | ✅ | ✅ |
| **Batching & Scheduling**       | ✅✅✅ | ✅✅ | ✅ | ✅ | ✅✅ | ✅ |
| **Distributed Serving / Offload**| ✅✅ | ✅✅✅ | ✅ | ✅ | ✅✅ | ✅✅ |
| **Memory Management (VRAM/RAM)**| ✅✅ | ✅✅✅ | ✅✅ | ✅ | ✅ | ✅✅ |

> **Key Insight**: The frontier is now **multi-layered**—vLLM and SGLang lead in **kernel-level optimizations** (FlashInfer, Triton fusions), while **Unsloth** and **Ollama** focus on **smart offloading and memory planning**. **LiteLLM** emphasizes **efficiency at the orchestration layer** (shunt mode, async signing). All projects are investing heavily in **context length scalability**, with NVFP4 and hybrid GDN techniques enabling ~245K-token inference.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Key Differentiator |
|---------------|-------------------------------|--------------------|
| **vLLM**      | **Inference Engine**          | Best-in-class throughput for large models on NVIDIA; FlashInfer backend dominance |
| **SGLang**    | **Inference Engine + Runtime** | Strong context parallelism, HiCache, and MoE support; optimized for high-concurrency |
| **llama.cpp** | **Local Runtime / Standalone** | Cross-platform, CPU/GPU/accelerator agnostic; ideal for edge/local use |
| **Ollama**    | **Model Gateway + CLI Runtime** | Developer-first UX; unified model serving; strong agent workflow integration |
| **LiteLLM**   | **API Gateway / Aggregator**  | Multi-provider routing, cost control, OpenAI compatibility; mission-critical for cloud APIs |
| **Unsloth**   | **Developer Tooling / Orchestration** | Simplified UI, smart offloading, model lifecycle management; focused on usability |

> **Strategic Implication**: Infrastructure engineers must now **stack these tools strategically**—e.g., use **vLLM/SGLang** for high-throughput inference, **liteLLM** for API abstraction, **Ollama/Unsloth** for dev workflows, and **llama.cpp** for portable deployments.

---

### **6. Trend Signals**

- **Determinism is non-negotiable**: Multiple projects report **non-deterministic outputs at `temperature=0`** (vLLM, SGLang), signaling that reproducibility is now a top-tier requirement—especially for agents and evaluation systems.
- **Blackwell (SM120/SM121) instability is systemic**: Crashes during speculative decoding and Mamba-2 kernel failures across vLLM, SGLang, and llama.cpp suggest **low-level GPU runtime issues** that may require firmware or driver patches.
- **Agent-native features are maturing**: `agent_message`, `thinking_token_budget`, and `x-opencode-session` headers indicate that **tool calling, state management, and session fidelity** are now first-class concerns.
- **Security exposure is rising**: The `wrong-key 401` leak in LiteLLM and silent crashes in Ollama show that **observability and security hardening** are lagging behind feature velocity.
- **UX = productivity**: Tools like Unsloth’s improved download handling and Ollama’s model name validation improvements reveal that **developer experience** is now a key differentiator.

> **Actionable Guidance for Developers**:
> - Avoid `temperature=0` with Qwen3.8-Flash-Next-FP8 and DeepSeek-V4-Flash until fixes land.
> - Use **`--enforce-eager`** or disable speculative decoding for deterministic workflows.
> - Monitor **GPU memory utilization** closely—partial allocation (e.g., <40% on 5090) can kill throughput.
> - Prefer **`0.32.13` over `0.33.x`** in Ollama for stable inference.
> - Implement **session ID tracking** and **request logging hygiene** to prevent leaks.

---

**Final Note**: The AI infrastructure stack is no longer just about speed—it's about **correctness, consistency, and trust**. Today’s developers must prioritize **stability over novelty**, and choose tools based on **production readiness**, not just benchmark headlines.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-08**

---

### **1. Today's Highlights**  
The vLLM project continues rapid progress toward production-grade inference on next-gen hardware, with critical fixes for deterministic behavior in `Qwen3.8-Flash-Next-FP8` and `DeepSeek-V4-Flash` under high-concurrency scenarios. New PRs address stability issues on SM120/SM121 GPUs (Blackwell), including illegal memory access crashes during speculative decoding and Mamba-2 kernel failures—key hurdles for deploying large models at scale.

---

### **2. Releases & Breaking Changes**  
*None*  
No new releases or breaking API/config changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen3VL/Qwen3.5/Qwen4Next**: Device-side multimodal normalization extended via #51289, improving encoder efficiency in EPD disaggregation pipelines.  
- ✅ **CohereCompassForConditionalGeneration**: Added to supported models list in documentation (#55777).  
- ✅ **ROCm Support**: HY-V4 model initialization now enabled on ROCm (#54405); attention-sink support added for AITER sparse MLA (#54404).  
- 🔧 **NVIDIA SM120/SM121**: FlashInfer backend now rejects unsupported NoPE head sizes (e.g., GLM-5.3-Flash) via #55778; Triton kernels for Mamba-2 now fall back gracefully on CPU/macOS (#55480).

---

### **4. Performance & Optimization**  
- ⚡ **Batch Invariant Optimization**: Active tracking in #27433 to eliminate non-determinism in batched inference, enabling consistent results across runs—critical for agent workflows.  
- 📈 **KV Cache Efficiency**: PR #52244 restores hybrid GDN prefix-cache hits under MTP speculative decoding, addressing ~30–40% throughput loss observed in #53670.  
- 💾 **NVFP4 on SM120**: Working prototype achieves 245K context on RTX 5090 using FlashInfer’s nvfp4 kernels (#49011), demonstrating potential for ultra-long-context inference.  
- 🔄 **Length-Aware Scheduling**: RFC #55265 proposes a batch-window pairing policy to improve fairness and utilization in mixed-length workloads.

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| Critical | `Qwen3.8-Flash-Next-FP8`: Non-deterministic greedy decoding when prompt nears `indexer_budget` (#54521) | Five identical requests return different outputs; affects correctness in agents and evals | Open — no fix yet |
| Critical | `DeepSeek-V4-Flash`: Non-deterministic output at `temperature=0`, worsens with concurrency (#53257) | High-risk for reproducibility; impacts benchmarking and deployment | Open — no fix yet |
| Severe | Silent CUDA IMA (`exit 0`) in hybrid GDN + MTP k=3 + async scheduling (RTX 3090) (#53726) | Livelock-like behavior; hard-to-debug crash | Open — persists despite prior fixes |
| Severe | `FlashInfer + MTP` crashes on SM121 with GQA=16 models (#37754) | Blocks use of advanced speculative decoding on DGX Spark | Open — workaround: switch to Triton backend |
| Moderate | `nvfp4` KV cache on SM120: Missing integration with FlashInfer kernels (#49011) | Prevents optimal performance on 5090 | Prototype available; pending integration |

---

### **6. What This Means for Application Developers**  
- **Avoid `Qwen3.8-Flash-Next-FP8` and `DeepSeek-V4-Flash` at `temperature=0`** if determinism is required—expect inconsistent outputs under load. Use `--enforce-eager` or disable speculative decoding as temporary mitigations.  
- **Leverage NVFP4 on RTX 5090** once FlashInfer integration lands (#49011)—this enables unprecedented context lengths (~245K tokens) with minimal overhead.  
- **Expect instability with speculative decoding on SM120/SM121 GPUs** until PRs like #55778 and #52244 are merged—avoid `MTP`/`EAGLE` with GQA > 8 on Blackwell unless you're testing.  
- **Use length-aware batching (RFC #55265)** in high-throughput systems to prevent starvation and improve resource utilization.  
- **Monitor `thinking_token_budget` behavior**—it may silently truncate reasoning in RL rollouts (#54864); consider truncation mode proposals.

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [PRs](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-08**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with significant focus on stability and performance for large-scale inference, particularly around context parallelism (CP), speculative decoding, and HiCache reliability. A critical regression in GLM-5.3-Flash due to incomplete HiCache restores has been identified and is being addressed via PR #38212. Meanwhile, a high-priority fix for CUDA coredumps (#26340) remains active with over 290 comments, signaling ongoing low-level GPU runtime challenges.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, several configuration deprecations were landed: `get_global_server_args` has been retired (#38375), and `--cuda-graph-max-bs` is now superseded by `--cuda-graph-max-bs-decode` in MiniCPM5-2B configs (#38379, #38378). Developers should update their launch scripts accordingly.

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Support**: Expanded support for EAGLE speculative decoding on gfx950 (MI355X) via PR #37465.  
- **ROCm MoE Fusion**: Unified Triton router now supports ROCm and single-group routing (#38328), enabling efficient MoE execution on AMD GPUs.  
- **Intel XPU Integration**: Added encoder embedding support for BGE, NomicBERT, ModernBERT, InternVL3_5, Hunyuan-A13B, and Step3-VL (#35304).  
- **Blackwell (B300/B200)**: FP8 MoE + symm memory configurations now explicitly use `flashinfer_trtllm` backend (#38374).

---

### **4. Performance & Optimization**  
- **Engine Recovery Speedup**: Weight cache daemon reduces load time from ~306–327s to <1s on Qwen3-235B FP8 (#33522).  
- **CUDA Graph Optimization**: HRRN scheduler introduced to reduce TTFT significantly (#32911); early results show promise for short-latency workloads.  
- **Memory Efficiency**: SWA hybrid page freeing logic now handles `page_size > 1` efficiently (#38159), reducing fragmentation.  
- **Kernel Fusions**: AMD-specific fusions (MLA q absorb into RoPE+KV-write, topk=1 draft softmax removal) reduce kernel launches and improve decode throughput (#38340).

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|-------|--------|-----------|
| 🔴 High | [Bug] GLM-5.3-Flash HiCache restore corruption (no spec decoding) | Host-tier load-back corrupts generation; drops tool calls, causes repetition loops (#38031) | ✅ PR #38212 in progress |
| 🔴 High | [Bug] CUDA illegal memory access in QSA extend (8 concurrent requests) | Crashes under heavy load on Qwen3.8-Flash-Next-FP8/H20 TP8 (#37633) | ⚠️ No fix yet |
| 🔴 High | [Bug] DFLASH/DSPARK draft KV pool budget uses `tp_size` instead of `attn_tp_size` | Causes OOM under DP attention in Kimi-K3 (#38202) | ⚠️ No fix yet |
| 🟡 Medium | [Bug] `fp8e4nv` not supported on A100 (SM80) for Qwen3.8-Flash-Next-FP8 | Blocks deployment on older hardware (#38291) | ⚠️ No fix yet |
| 🟡 Medium | [Bug] `/v1/responses`: `created_at` type inconsistency (float vs int) | Inconsistent streaming/non-streaming response format (#34716) | ⚠️ Pending review |

> *Note: The massive CUDA coredump tracker (#26340) reflects systemic instability in GPU kernels, especially on SM10x (B300).*

---

### **6. What This Means for Application Developers**  
- **Use `--cuda-graph-max-bs-decode` instead of deprecated `--cuda-graph-max-bs`** in all new deployments (PRs #38379/#38378).  
- If serving **GLM-5.3-Flash**, avoid HiCache host-tier offloading until PR #38212 lands—this can cause silent correctness failures.  
- For **high-concurrency workloads** (≥8 requests), be cautious with Qwen3.8-Flash-Next-FP8 on H20—it may crash due to QSA kernel issues.  
- On **AMD GPUs**, expect improved MoE and speculative decoding performance with recent ROCm patches.  
- **Avoid `fp8e4nv` on A100** if using Qwen3.8-Flash-Next-FP8—use `fp8_e4m3` or switch to newer architectures.  

> ✅ **Recommendation**: Monitor CI status at [#17050](https://github.com/sgl-project/sglang/issues/17050) for real-time test health and avoid deploying during flaky runs.

---  
*Digest generated: 2026-09-08 | Source: [github.com/sgl-project/sglang](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-08**

---

### **1. Today’s Highlights**  
The latest updates focus on critical performance gains for high-end inference workloads, particularly through Vulkan and CUDA optimizations targeting DeepSeek-V4 and Qwen series models. Key improvements include branchless quantized matrix multiplication (Q4_K/Q5_K), new fused ops for DeepSeek-V4 hyper-connections, and enhanced memory management in Metal and Vulkan backends—significantly boosting decode throughput and stability on large-context scenarios.

---

### **2. Releases & Breaking Changes**  
No breaking changes or new releases were tagged in the last 24 hours. However, several PRs introduce behavioral shifts:
- `--lazy-mode auto` now exhibits a **~50% drop in prefill throughput** for `qwen4exp` on Vulkan (AMD iGPU) due to improved TENSOR_READ_LAZY handling ([#28160](https://github.com/ggml-org/llama.cpp/pull/28160)).
- A regression in `ggml_gallocr` may silently corrupt sparse MoE graphs when reusing allocation plans across identity-changed nodes ([#28448](https://github.com/ggml-org/llama.cpp/pull/28448)).

> 🔧 **Migration Note**: Users relying on `--lazy-mode auto` with Qwen4exp on AMD Vulkan should consider pinning to a prior commit or adjusting `GGML_VK_SUBALLOCATION_BLOCK_SIZE` to avoid performance cliffs.

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Added support for **TQ1_0** quantization across Vulkan (MM, MAT-VEC, DEQUANT, GET_ROWS) ([#27765](https://github.com/ggml-org/llama.cpp/pull/27765)).  
  - Experimental support for **Qwen3.8-Flash-Next**, **Qwen3.5-hybrid**, and **K2-Horizon** models via GGUF conversion tools ([#28361](https://github.com/ggml-org/llama.cpp/issues/28361), [#28522](https://github.com/ggml-org/llama.cpp/issues/28522)).
- **Hardware & Backend Enhancements**:  
  - Added **gfx90c HIP support** for ROCm-based GPUs ([#26454](https://github.com/ggml-org/llama.cpp/pull/26454)).  
  - Enhanced **Metal backend** optimization for M5 Max (D512 decode) using NE2 kernel fusion ([#28534](https://github.com/ggml-org/llama.cpp/pull/28534)).  
  - Full **DeepSeek-V4 hyper-connection fused ops (DSV4_HC_COMB/PRE/POST)** added to Vulkan backend ([#26578](https://github.com/ggml-org/llama.cpp/pull/26578)).

---

### **4. Performance & Optimization**  
- **CUDA**: Branchless Q4_K/Q5_K unpacking improves mmvq performance at batch sizes > 1; L2 prefetching enabled on DGX Spark systems ([#26705](https://github.com/ggml-org/llama.cpp/pull/26705)).  
- **Vulkan**: RMS_NORM fusion opportunities yield ~4% improvement on Gemma4 ([#28024](https://github.com/ggml-org/llama.cpp/pull/28024)); TQ1_0 packing reduces constant overhead ([#27765](https://github.com/ggml-org/llama.cpp/pull/27765)).  
- **Memory Management**: Suballocation fragmentation causing ~78% decode throughput cliff at 131,072 context resolved via `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` ([#27734](https://github.com/ggml-org/llama.cpp/issues/27734)).  
- **Speculative Decoding**: Adaptive MTP draft depth (`draft-mtp-adaptive`) introduced to dynamically adjust draft size based on model state ([#27210](https://github.com/ggml-org/llama.cpp/pull/27210)).

---

### **5. Stability & Regressions**  
Top stability issues reported today:
1. **DeviceLost crash during speculative decoding on AMD RADV/Vulkan** (`llama_decode(ctx_dft)` fails mid-prompt) — reproducible with `--spec-type draft-mtp` ([#27306](https://github.com/ggml-org/llama.cpp/issues/27306)).  
2. **Silent EOS beyond ~130k context** on Qwen3.5-hybrid (64-layer) models, linked to DeltaNet recurrent-state depth × layer-count degradation ([#27756](https://github.com/ggml-org/llama.cpp/issues/27756)).  
3. **Garbage output on Mac x86 Vulkan with AMD GPU** after commit b8143 ([#20029](https://github.com/ggml-org/llama.cpp/issues/20029)).  
4. **HIP/ROCm on gfx1151 reports wrong logits** for long prompts (> n_ubatch) ([#28211](https://github.com/ggml-org/llama.cpp/issues/28211)).  

> ⚠️ **Note**: No fix PRs are yet merged for these regressions. Developers should monitor issue trackers closely.

---

### **6. What This Means for Application Developers**  
- **Optimize for large contexts**: Use `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` if running Vulkan with >130k context windows.  
- **Avoid `--lazy-mode auto`** with Qwen4exp on AMD iGPUs until [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) is patched.  
- **Leverage speculative decoding wisely**: Use `draft-mtp-adaptive` for dynamic draft sizing, but test for device loss on AMD/Radeon hardware.  
- **Expect instability with new quant formats**: TQ1_0 and Qwen3.8-Flash-Next models may exhibit silent corruption or crashes—validate outputs rigorously.  
- **Monitor UI/Server stability**: Recent PRs improve model discovery and download UX, but deadlocks and OOMs remain possible under load ([#28406](https://github.com/ggml-org/llama.cpp/pull/28406), [#27309](https://github.com/ggml-org/llama.cpp/issues/27309)).

👉 **Actionable Tip**: Pin your build to known-stable commits (e.g., `b10833` or earlier) for production use until regressions are addressed.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-08**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with strong momentum in agent and cloud integration, particularly around OpenAI-compatible endpoint parity and model serving stability. Key developments include PRs enabling `agent_message` input support in the OpenAI API layer and native thinking handling in generate templates—critical for agentic workflows. Meanwhile, ongoing issues highlight persistent challenges with GPU memory utilization, context handling, and model download integrity.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking changes were published. Users should remain cautious about regressions introduced in recent versions (e.g., `0.33.x` performance degradation on CUDA), as noted in issue #18225.

---

### **3. New Model & Hardware Support**  
- ✅ **Spark-X2.5 Architecture (4B / 1.7B)**:  
  PR #18279 bumps `llama.cpp` to `b10829` to enable support for the new `spark2_5` architecture used by SparkLLM’s Spark-X2.5 models. This resolves issue #18195 and is now actively being tracked via PRs #18287 and #18290.  
  🔗 [PR #18279](https://github.com/ollama/ollama/pull/18279) | [Issue #18195](https://github.com/ollama/ollama/issues/18195)

- 📌 **Hy4 Model (Tencent)**:  
  Community request #18287 calls for official Ollama compatibility with the Hy4-preview model from Hugging Face. No PR yet, but demand is growing.  
  🔗 [Issue #18287](https://github.com/ollama/ollama/issues/18287)

- 🚧 **AMD ROCm/Vulkan (gfx1201/gfx1151)**:  
  Issues #17782 and #17870 report GPU-specific failures with `TensileLibrary_lazy_gfx1200.dat` and Vulkan compute-ring timeouts. These are critical for AMD users on newer GPUs like RX 9060 XT and Strix Halo.  
  🔗 [Issue #17782](https://github.com/ollama/ollama/issues/17782) | [Issue #17870](https://github.com/ollama/ollama/issues/17870)

---

### **4. Performance & Optimization**  
- ⚠️ **Regression in `0.33.x`**:  
  Multiple reports confirm a ~5x slowdown in token generation on RTX 3090 (issue #18225), with `0.32.13` performing normally. This regression affects both CPU and GPU inference, likely tied to scheduler or runner logic changes.  
  🔗 [Issue #18225](https://github.com/ollama/ollama/issues/18225)

- 💡 **Context Handling Improvements**:  
  PR #18285 introduces explicit context honoring without overriding soft sizing in MLX runner, improving predictability in high-context scenarios. Similarly, PR #16825 ensures `num_ctx` is properly forwarded in OpenAI-compatible endpoints.  
  🔗 [PR #16825](https://github.com/ollama/ollama/pull/16825) | [PR #18285](https://github.com/ollama/ollama/pull/18285)

- 🔁 **Memory Efficiency**:  
  Issue #17971 highlights partial GPU memory utilization (under 40%), forcing reliance on system RAM and degrading throughput. This suggests suboptimal memory allocation strategies under load.  
  🔗 [Issue #17971](https://github.com/ollama/ollama/issues/17971)

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Status |
|--------|-------|---------|--------|
| 🔴 High | [#8484](https://github.com/ollama/ollama/issues/8484) | Model download progress reverts mid-transfer; total size decreases unpredictably. Affects all networks. | Closed |
| 🔴 High | [#17841](https://github.com/ollama/ollama/issues/17841) | Ollama silently falls back to CPU on sm_86 GPUs (RTX 30/A40/A6000), despite CUDA 13 support. Critical for high-end inference. | Closed |
| 🔴 High | [#18186](https://github.com/ollama/ollama/issues/18186) | MTP settings cause offloading to CPU during QWEN3.8:27b inference on 5090. Performance drops significantly. | Closed |
| 🟡 Medium | [#18286](https://github.com/ollama/ollama/issues/18286) | `/v1/responses` rejects `agent_message` input items. Blocks Codex agent integrations. | Open |
| 🟡 Medium | [#18274](https://github.com/ollama/ollama/issues/18274) | Model name validation limited to 80 characters, blocking long HF model names. | Open |
| 🟡 Medium | [#18282](https://github.com/ollama/ollama/issues/18282) | Scheduler enters eviction loop when model exceeds available memory — fails fast instead of looping. | Closed |

> ✅ **Fixes in Progress**:  
> - PR #18298 adds `agent_message` support to OpenAI API (`/v1/responses`).  
> - PR #18290 fixes model name length limits.  
> - PR #18296 updates tool call ID prefix to `tsc_` for OpenAI compatibility.

---

### **6. What This Means for Application Developers**  
- **Agent Builders**: The addition of `agent_message` support (via PR #18298) and improved thinking parsing (PR #18300) means better compatibility with Codex and other agent frameworks. Expect smoother integration with multi-step reasoning flows.
- **Cloud & API Users**: Be cautious with `num_ctx` in OpenAI-compatible endpoints—this is still not fully respected unless explicitly passed through `options`. Use `OLLAMA_CONTEXT_LENGTH` or Modelfile `num_ctx` as fallbacks.
- **Model Authors**: If deploying custom models (especially Spark-X2.5 or Hy4), ensure they’re built with compatible llama.cpp versions (b10829+). Test on target hardware early.
- **Performance-Critical Apps**: Avoid `0.33.x` until regression fixes land. Monitor GPU memory usage closely—partial utilization can severely impact latency. Consider pinning to `0.32.13` if stability is paramount.
- **Security Note**: Avoid `OLLAMA_DEBUG_LOG_REQUESTS` in production—full prompts are logged without redaction (issue #18210).

👉 **Actionable Takeaways**:  
- Track PRs #18298, #18300, and #18279 for near-term agent and model support improvements.  
- Verify context and memory behavior in your pipelines—especially with MTP and large models.  
- Use `keep_alive=-1` cautiously—long-lived runners may emit corrupted output (issue #18208).

---  
*Digest generated from GitHub activity: ollama/ollama (2026-09-08)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-08**

#### **1. Today's Highlights**
The LiteLLM ecosystem continues to evolve with critical fixes for model routing, authentication security, and proxy stability—especially around Claude Code agentic workflows and OpenCode Go integration. Key PRs include a high-risk CI tiering system for shadow-mode PRs, enhanced budget reservation handling, and improved logging for Bedrock error tracing. A new `x-opencode-session` header requirement (Issue #39503) underscores growing need for stable session context in managed inference environments.

#### **2. Releases & Breaking Changes**
*No new releases in the last 24 hours.*  
However, **v1.100.1** is imminent (PR #40176) to backport fixes for double-hashing spend rows and improve visibility of usage metadata in logs—critical for billing accuracy and observability in production deployments.

#### **3. New Model & Hardware Support**
- ✅ **TwelveLabs Marengo Embed 3.0** added via PR #40180: Supports nested input types (`text_image`, `multi_input`) and now correctly routes embeddings through AWS Bedrock.
- 📌 **Z.AI (Zhipu AI)** provider now appears in UI dropdowns but has incomplete form rendering (Issue #39310)—a known frontend gap blocking immediate use.
- ⚠️ **OpenRouter’s `gpt-5.6-sol` model missing** from pricing catalog (Issue #40102), preventing configuration until updated in `model_prices_and_context_window.json`.

#### **4. Performance & Optimization**
- **Async signing offload**: PR #40178 introduces thread-based signing for async requests, reducing event loop contention—especially impactful for Bedrock SigV4 credential resolution delays.
- **Shunt mode in Auto Router**: PR #40158 enables large file reads to bypass expensive models by delegating codegen to cheaper alternatives—reduces token waste by up to ~70% in high-throughput workflows.
- **Complexity Router Heuristic Expansion**: PR #40156 allows declarative custom dimensions (e.g., prompt length, token density), enabling smarter routing decisions without manual tuning.

#### **5. Stability & Regressions**
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| 🔴 High | [Bug] `wrong-key 401` leaks internal details (Issue #39757) | Response exposes backend name, DB table, and SHA-256 hash of invalid key—security risk | No fix yet; high priority |
| 🔴 High | [Bug] vLLM/Kimi K2.7 multi-turn tool use broken (Issue #32214) | `sanitize_tool_use_ids_in_anthropic_messages` regresses tool call state across turns | Patch pending in v1.91.0+ |
| 🔴 High | [Bug] Prompt cache not preserved in OpenAI → Anthropic bridge (Issue #39339) | Encrypted content dropped during `/v1/messages` → Responses API translation | Fix under review (PR #39759 not sufficient) |
| 🟡 Medium | [Bug] Model alias uneditable post-creation (Issue #28164) | Virtual key model aliases can’t be modified after creation | Known UI limitation |
| 🟡 Medium | [Bug] Ollama template crash on missing `initial_prompt_value` (Issue #39759) | Custom templates failing if required fields omitted | PR submitted (fix pending) |

#### **6. What This Means for Application Developers**
- **Enforce session IDs**: Update your client-side logic to include `x-opencode-session` header when calling OpenCode Go (Issue #39503).
- **Avoid regression-prone configs**: Avoid `v1.91.0` if using multi-turn Claude Code workflows with vLLM backends—upgrade or patch manually.
- **Audit auth safety**: The exposed 401 response (Issue #39757) could leak infrastructure details—avoid exposing LiteLLM proxies publicly until patched.
- **Use shunt mode wisely**: Leverage PR #40158’s "Shunt" option in Auto Router to avoid costly model usage for large data ingestion tasks.
- **Monitor memory growth**: If running long-lived proxies, watch for memory creep (Issue #38193)—this may indicate GC issues or retained state.

> 🔗 *Explore active issues*: [GitHub Issues](https://github.com/BerriAI/litellm/issues) | [PRs](https://github.com/BerriAI/litellm/pulls)  
> 🔧 *Contributor guidance*: Use `risk-gate` in CI (PR #40171) to assess PR impact before merging.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-08**

---

### **1. Today's Highlights**  
The Unsloth project continues to expand its cross-platform and multi-model support, with critical fixes for AMD/ROCm and Intel Arc GPU compatibility, including a fix for `torch.xpu.memory.mem_get_info()` incompatibility on Intel Arc B580 (Issue #3533). A major performance optimization has been merged to reduce redundant GitHub API calls during llama.cpp release checks (PR #10461), directly addressing high-frequency API hits reported in Issue #10449. Additionally, new UX improvements are being introduced for model context handling, tool integration, and chat title evolution.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **Intel Arc B580**: Added support via fix for `torch.xpu.memory.mem_get_info()` failure (Issue #3533) — previously blocked import due to unsupported XPU memory API.
- **AMD ROCm (W7900/W7500)**: Ongoing work to resolve missing fused attention kernels for Wan2.2 TI2V video generation (Issue #10415), and address model offload issues despite "No RAM Offload" checkbox (Issue #10341).
- **Qwen 3 AVL 2B & 0.6B**: Feature request submitted (Issue #10459) for unified multimodal model support combining VL + ASR components.
- **Windows-on-ARM NVIDIA hosts**: Installer now detects and installs native ARM64 CUDA stack (PR #10282), resolving prior failures on GB10/N1X devices.

---

### **4. Performance & Optimization**  
- **API Efficiency**: PR #10461 eliminates redundant GitHub API calls by reusing pre-fetched release metadata, reducing API load from ~N requests per release to one — directly resolving Issue #10449.
- **Speculative Decoding Metrics**: PR #10416 introduces measurement of speculative-decoding acceptance rate, enabling fine-grained tuning (closes #10401).
- **Offload Planning**: PR #9872 enhances smart offload planner logic by integrating llama.cpp’s internal fitter and spill cost modeling, improving VRAM utilization (behaviour behind `UNSLOTH_SMART_OFFLOAD` flag).
- **Model Loading Speed**: PR #10453 prevents premature termination of long-running model downloads during `unsloth start`, avoiding wasted bandwidth and retries.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| High | #3533 | `unsloth` fails to import on Intel Arc B580 due to unsupported `torch.xpu.memory.mem_get_info()` call | ✅ *Fix pending (PR not yet opened)* |
| High | #10415 | Wan2.2 TI2V OOM on AMD RX 9060 XT due to missing fused attention kernel | ⚠️ *Workaround: fallback to PyTorch SDPA; no kernel patch yet* |
| Medium | #10341 | Model remains in RAM despite "No RAM Offload" setting on ROCm | 🔧 *Investigation ongoing; PR #10453 addresses related race conditions* |
| Medium | #10437 | GGUF quantizations disappear after switching download folder | ✅ *PR #10438 merged to preserve variants across cache changes* |
| Low | #10449 | `unsloth studio update` overloads GitHub API | ✅ *PR #10461 merged — resolves excessive API polling* |

---

### **6. What This Means for Application Developers**  
- **Multi-GPU Environments**: On mixed NVIDIA+AMD systems, ensure you explicitly select Vulkan backend for inference and verify training is configured to target the correct GPU (Issue #10450).
- **Remote Model Integrity**: When using remote Ollama models, be cautious of the “Tell the model today’s date” feature overriding custom `SYSTEM` prompts (Issue #10436); use PR #10463 to retain modelfile context.
- **Offline Deployment**: For air-gapped environments, consider standalone packages like KoboldCpp as reference (Issue #10356); unsloth currently lacks offline installer support.
- **Tooling & State Management**: Avoid switching between models with and without tool support mid-chat (Issue #10454); ensure tool history is preserved or cleared explicitly.
- **Model Configuration Robustness**: Use `--config` flags cautiously — unrecognized keys are silently ignored (Issue #10452); prefer config validation tools before training runs.

> 🔗 [GitHub Issues](https://github.com/unslothai/unsloth/issues) | [Pull Requests](https://github.com/unslothai/unsloth/pulls)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*