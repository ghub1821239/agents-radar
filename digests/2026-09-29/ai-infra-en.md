# AI Infrastructure Digest 2026-09-29

> Generated: 2026-09-29 02:16 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-29**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *deep specialization and hardware diversification*, with projects increasingly targeting distinct workloads: agentic reasoning, multimodal processing, low-latency decision-making, and sovereign/edge deployment. Key trends include the rise of **disaggregated serving**, **multi-modality**, and **hybrid CPU-GPU offloading**, driven by demand for scalable, efficient inference across heterogeneous hardware—from NVIDIA’s RTX 5090 to AMD’s MI355X and T-Head’s domestic PPUs. Critical stability issues persist, especially around speculative decoding and memory management, signaling that production readiness remains a moving target.

---

### **2. Activity Comparison**

| Project       | Open Issues (High/Crit) | PRs Merged (Last 24h) | Releases | Notes |
|---------------|--------------------------|------------------------|----------|-------|
| **vLLM**      | 8 (3 Critical)           | ~12                    | None     | Heavy focus on KV cache, CUDA graphs, FlashInfer tuning |
| **SGLang**    | 7 (3 High/Critical)      | ~9                     | None     | Rapid progress in HiCache, HiSparse, T-Head PPU support |
| **llama.cpp** | 7 (3 Critical)           | ~6                     | Breaking Changes | Major API shifts; Vulkan/AMD stability concerns |
| **Ollama**    | 6 (2 Critical)           | ~3                     | v0.35.0  | New System One API; billing & GPU crash bugs |
| **LiteLLM**   | 5 (2 High)               | ~5                     | v1.104.0-rc.1 | Security hardening, live model proxying |
| **Unsloth**   | 8 (2 High)               | ~7                     | v0.1.900-beta | Laya Decision Models, Apple Silicon acceleration |

> ✅ **Observation**: vLLM and SGLang lead in technical momentum, while Ollama and Unsloth are driving new application paradigms despite stability challenges.

---

### **3. Model Support Race**

| New Model / Architecture | Supported By | Notes |
|--------------------------|--------------|-------|
| **DeepSeek-V4.1 (DSv4.1)** | ✅ vLLM, SGLang | Full ROCm + MXFP4/MXFP8 support on gfx950 |
| **GLM-5.3 / GLM-5.3-Flash** | ✅ vLLM, SGLang | Optimized sharding (vLLM), FP8/MXFP4 on AMD (SGLang) |
| **Qwen3-VL / Qwen3.8 Flash Next** | ✅ vLLM, SGLang, llama.cpp, Unsloth | Full ViT CUDA graph (vLLM RFC #38175), hybrid batch support (llama.cpp) |
| **Kimi K2.5** | ✅ vLLM, SGLang | ViT CUDA graph in progress (vLLM) |
| **Inkling (975B MoE, 1M context)** | ✅ SGLang | Day-0 support for multimodal audio/image/text |
| **GraniteSpeech5ForCTC** | ✅ llama.cpp | Non-autoregressive CTC model for speech-to-text |
| **K2 Horizon (MBZUAI IFM)** | ✅ Ollama | Experimental support for 3.7B–36B MoE models |
| **Laya Decision Models** | ✅ Unsloth | Local inference via Skills Library; Jev integration |
| **T-Head PPU (Zw810/Zw-M890P)** | ✅ SGLang | Roadmap underway; upstreaming first-class support |

> 🏆 **Leader**: **SGLang** leads in breadth of new model support, particularly for large-scale multimodal and long-context architectures.  
> 🚀 **Differentiator**: **Unsloth** is uniquely advancing local agent capabilities with Laya and Skills Editor.

---

### **4. Performance Frontier**

| Focus Area                | Leading Projects                          | Key Developments |
|---------------------------|-------------------------------------------|------------------|
| **KV Cache Management**   | vLLM, SGLang                              | Tiered offloading (vLLM), pool-level sharding (SGLang), `BlockRemoved` fix (vLLM) |
| **Speculative Decoding**  | vLLM, SGLang, llama.cpp                   | MTP fixes (vLLM #58921), DFlash crashes (SGLang #40843), `--cpu-mtp` (llama.cpp) |
| **Distributed Serving**   | vLLM, SGLang                              | Disaggregated serving (`capture_model_ops`), HiCache, HiSparse |
| **Quantization & Kernels**| vLLM, SGLang, llama.cpp, Unsloth          | MXFP4/MXFP8 (vLLM), GDN kernels (llama.cpp), fp16 MLX (Unsloth) |
| **Batching & Prefill**    | SGLang, vLLM                              | Prefill CP extension (SGLang), PCP sharding (vLLM) |
| **Edge & CPU Optimization**| llama.cpp, Unsloth                        | CPU-offloaded MTP drafters, Apple Silicon Metal kernels |

> 🔥 **Most Active Frontier**: **Disaggregated and distributed serving**, with vLLM and SGLang pushing the envelope in scalability and memory efficiency.

---

### **5. Layer Positioning**

| Project       | Primary Layer              | Differentiating Role |
|---------------|----------------------------|------------------------|
| **vLLM**      | Inference Engine           | High-performance, optimized CUDA/ROCm backend; dominant in cloud-scale deployments |
| **SGLang**    | Distributed Serving Framework | Agentic pipeline orchestration; strong focus on long-context, sparse, and disaggregated systems |
| **llama.cpp** | Local Runtime / Embedded   | CPU/GPU portability; ideal for edge, mobile, and offline inference |
| **Ollama**    | Gateway / Developer Platform | Simplified local inference; expanding into agent orchestration via System One API |
| **LiteLLM**   | LLM Gateway / Proxy        | Enterprise-grade routing, cost control, guardrails, and multi-provider abstraction |
| **Unsloth**   | Agent Runtime / Fine-tuning | Local agent execution with Skills Library; accelerated vision-language inference |

> 🧩 **Strategic Insight**: The stack is bifurcating — **engineers** use vLLM/SGLang for performance, **developers** lean on Ollama/LiteLLM for simplicity, and **agents** are being built atop Unsloth and SGLang.

---

### **6. Trend Signals**

1. **Multimodality is No Longer Optional**  
   Full ViT CUDA graph support (vLLM), Inkling (SGLang), and Qwen3-VL embeddings (llama.cpp) signal that multimodal input is now central to infrastructure design.

2. **Hardware Sovereignty is Accelerating**  
   T-Head PPU (SGLang), AMD gfx950 (vLLM/SGLang), and MLX on Apple Silicon (Unsloth) reflect growing demand for non-NVIDIA silicon — critical for sovereign and edge deployments.

3. **Agents Are Driving Infrastructure Innovation**  
   System One (Ollama), Laya (Unsloth), HiCache/HiSparse (SGLang), and speculative decoding optimizations are all designed to enable scalable, low-latency agentic workflows.

4. **Security & Trust Are Now Core Features**  
   LiteLLM’s cosign-signed images and Ollama’s billing loop issue highlight that supply chain integrity and operational reliability are no longer afterthoughts.

5. **Stability Still Lags Behind Feature Velocity**  
   Multiple high-severity crashes (e.g., speculative decoding, flash attention, GPU offloading) indicate that most projects are still in "feature-first" mode — caution advised for production.

> ✅ **Developer Action Items**:  
> - Prioritize **vLLM** or **SGLang** for high-throughput, distributed agentic systems.  
> - Use **llama.cpp** or **Unsloth** for edge/local agent execution.  
> - Leverage **LiteLLM** for secure, multi-provider gateways.  
> - Avoid `prompt_embeds + penalty` (vLLM), `--enable-dflash` (SGLang), and `gemma4` image processing (Ollama) until fixes land.  
> - Monitor **System One**, **Laya**, and **HiSparse** — these are early indicators of next-gen agent infrastructure.

---  
*Generated: 2026-09-29 | Source: GitHub project digests*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-29**

#### **1. Today's Highlights**  
The vLLM project continues to deepen its support for **disaggregated serving** and **multi-modality**, with key PRs advancing the `derender`/`render` pipeline and enabling full CUDA graph support for ViT encoders in multimodal models. Critical stability fixes were merged for **KV offloading**, **FlashInfer autotuning**, and **speculative decoding on MRV2**, addressing crashes and resource leaks that impact production deployments.

#### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking API/config changes reported in the last 24 hours.

#### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1 (DSv4.1)**: Full ROCm support landed for MXFP4/MXFP8 KV cache and sparse indexer on gfx950 (MI355X). PRs #58671, #57523, #57463 enable high-performance inference on AMD GPUs.  
- ✅ **GLM-5.3**: Optimized prefill sharding across TP ranks via PR #54951, reducing latency by balancing workloads and avoiding redundant scoring.  
- ✅ **Qwen3-VL & Kimi K2.5**: RFC #38175 tracks full CUDA graph support for ViT encoders, critical for low-latency multimodal inference.  
- ✅ **Intel GPU (XPU)**: Ongoing debugging of B70 (Battlemage) issues (#41663), with fix efforts focused on BCS engine resets under TP=2.

#### **4. Performance & Optimization**  
- 🚀 **Disaggregated Serving**: PR #59019 introduces `capture_model_ops(device="meta")` for meta-device operator profiling, enabling cross-platform performance modeling without hardware allocation.  
- ⚙️ **KV Cache Management**: PR #55092 ensures `BlockRemoved` events are emitted only after *all* physical copies are evicted, preventing premature cleanup during prefix caching.  
- 🔥 **Speculative Decoding**: PR #58921 fixes incorrect LM head sampling in multi-layer MTP on MRV2; PR #58165 resolves FlashInfer warmup crash due to improper M rounding in MXFP8 kernels.  
- 💡 **Memory Efficiency**: PR #52162 shards decode requests across PCP ranks, eliminating redundant computation in PCP-only deployments — critical for large-scale inference clusters.

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Notes |
|------|----------|--------|--------|-------|
| `prompt_embeds` + penalty → device-side assert (`scatter gather kernel index out of bounds`) | Critical | Open | ❌ | Affects agent workflows using prompt embeddings; crashes engine. |
| FlashInfer autotune config cache hits only on rank 0 → deadlock | High | Open | ❌ | Blocks startup in multi-GPU setups; impacts performance tuning. |
| Tiered offloading crash | High | Open | ❌ | Reported in #58804; affects hybrid memory offloading scenarios. |
| Prefix caching + MTP corrupts output in hybrid Mamba/GDN models | Medium | Open | ❌ | Regression in v0.28.0; impacts agentic reasoning pipelines. |
| NVFP4 MoE backend not supported (No NvFp4 MoE backend supports deployment) | High | Open | ❌ | Prevents deployment of advanced quantized MoE models on newer architectures. |

#### **6. What This Means for Application Developers**  
- If you're building **agentic systems** or **multi-turn conversations**, prioritize upgrading to the latest vLLM main (post-#58921) to avoid speculative decoding bugs and ensure correct token sampling.  
- For **multimodal apps** (e.g., LLaVA, Qwen-VL), track RFC #38175 closely — full ViT CUDA graph support will dramatically reduce latency in image+text pipelines.  
- Use `capture_model_ops(device="meta")` (PR #59019) to benchmark model behavior across platforms without provisioning real hardware — ideal for CI/CD and deployment planning.  
- Avoid `prompt_embeds` with penalties until #57719 is resolved; consider fallback to standard prompt-based input in production.  
- If using **AMD GPUs**, test with `--kv-cache-dtype mxfp4` or `nvfp4_ds_mla` — these are now stable on gfx950 (MI355X) thanks to recent ROCm PRs.  

> 🔗 **Key Links**:  
> - [RFC: ViT Full CUDA Graph](https://github.com/vllm-project/vllm/issues/38175)  
> - [PR: Fix FlashInfer Warmup Crash](https://github.com/vllm-project/vllm/pull/58165)  
> - [PR: Meta-device Operator Capture](https://github.com/vllm-project/vllm/pull/59019)  
> - [Issue: Prompt Embeds + Penalty Crash](https://github.com/vllm-project/vllm/issues/57719)

---  
*Digest generated: 2026-09-29 | Source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-29

---

### **1. Today's Highlights**

The SGLang project continues its aggressive push toward high-throughput, low-latency inference for agentic workloads, with key momentum in distributed KV cache systems and long-context sparse serving. Critical infrastructure improvements are underway for **HiCache disaggregation**, **HiSparse** for long-context models, and **T-Head PPU support**, signaling expanded hardware readiness. Meanwhile, a growing number of stability fixes address critical bugs affecting model serving (e.g., GLM-5.3 logprob drift, DFlash sampling crashes) and system resilience (worker SIGQUIT handling).

---

### **2. Releases & Breaking Changes**

*None*  
No new releases were published in the last 24 hours. No breaking changes or migration notes are currently active.

---

### **3. New Model & Hardware Support**

- **T-Head PPU Support (Zw810/Zw810E/Zw-M890P)**:  
  A new roadmap issue (#37519) initiates upstreaming first-class support for T-Head’s latest PPUs, enabling deployment on Chinese domestic silicon. This marks a strategic expansion beyond NVIDIA/AMD/Metal backends.  
  🔗 [Issue #37519](https://github.com/sgl-project/sglang/issues/37519)

- **AMD gfx950 (MI355X) Support for GLM-5.3-Flash**:  
  PRs #39273 and #41615 enable full FP8/MXFP4 serving on gfx950 via Triton sparse attention, unlocking high-performance inference for GLM-5.3-Flash on ROCm.  
  🔗 [PR #39273](https://github.com/sgl-project/sglang/pull/39273), [PR #41615](https://github.com/sgl-project/sglang/pull/41615)

- **Inkling Multimodal Model (Day-0 Support)**:  
  Issue #31359 confirms initial Inkling support is now live, covering 975B-parameter MoE models with 1M-token context and native multimodal input (text, image, audio).  
  🔗 [Issue #31359](https://github.com/sgl-project/sglang/issues/31359)

---

### **4. Performance & Optimization**

- **Prefill Context Parallelism (CP)**:  
  Progress continues on #21788 with ongoing work to extend Prefill CP to MHA/GQA backends (FlashInfer/TRTLLM-MHA), building on existing support for MLA (Dpsk v3/Kimi-K2.5) and SWA. This will significantly improve prefill throughput at scale.  
  🔗 [Issue #21788](https://github.com/sgl-project/sglang/issues/21788)

- **HiSparse for Long-Context Serving**:  
  The HiSparse roadmap (#28874) aims to reduce GPU memory usage during decode by keeping only a hot working set of KV history in HBM—critical for models with 1M+ context windows.  
  🔗 [Issue #28874](https://github.com/sgl-project/sglang/issues/28874)

- **KV Cache Sharding (MTP & DSA Indexer)**:  
  PRs #40929 and #40925 add pool-level KV sharding support, improving scalability for large-scale deployments by distributing cache across multiple devices.  
  🔗 [PR #40929](https://github.com/sgl-project/sglang/pull/40929), [PR #40925](https://github.com/sgl-project/sglang/pull/40925)

- **PTX KDA Prefill Fix (NaN & Workspace Growth)**:  
  PR #41572 resolves NaN outputs and unbounded workspace growth in PTX-based KDA prefill kernels on B200, ensuring stable operation under high load.  
  🔗 [PR #41572](https://github.com/sgl-project/sglang/pull/41572)

---

### **5. Stability & Regressions**

| Severity | Issue | Description | Status |
|--------|------|-------------|--------|
| 🚨 High | #41609 | `GLM-5.3-Flash-NVFP4` shows bit-identical output drift vs v0.5.20 after 2026-09-18; suspected KDA fusion gate change (#39688) | Open |
| 🚨 High | #40843 | Severe repetition/degenerate loops in reasoning/output when using DFLASH speculative decoding with GLM-5.3 | Open |
| 🛑 Critical | #41539 | Worker process sends SIGQUIT to PID 1 upon launcher failure, potentially crashing supervisor | Open |
| ⚠️ Medium | #41466 / #41467 / #41482 | `/generate` endpoint crashes on malformed `session_params`, invalid `top_k`, or excessive `n` values — potential DoS vector | Open |
| ⚠️ Medium | #41372 | `Req.decoded_text` is never written, leading to dead stop-string fallback and empty DecodeStatus on eviction | Open |
| ⚠️ Medium | #41569 | MiMo-V2 selects FP8 MoE runner for packed MXFP4 experts on SM100, causing incorrect behavior | Open |

> ✅ **Fixes in progress**: Several PRs target underlying causes (e.g., #41572 for KDA NaN, #37531 for DFlash graph fallback), but no merged fixes yet.

---

### **6. What This Means for Application Developers**

- **Agentic Workloads Are Now More Scalable**: With HiCache disaggregation (#21846) and HiSparse (#28874) advancing rapidly, developers can now design agents that handle longer contexts with lower memory overhead and better distribution efficiency.
- **Expect Greater Hardware Flexibility**: Support for T-Head PPU and AMD gfx950 opens doors for sovereign cloud and edge deployments. Use `--enable-ppu` or `--gpu=mi355x` when targeting these platforms.
- **Be Cautious with Speculative Decoding**: Avoid `--enable-dflash` with GLM-5.3 until #40843 and #41609 are resolved—expect instability in output quality.
- **Validate Input Types Rigorously**: Due to open bugs in `/generate`, ensure client-side validation of `top_k`, `n`, and `session_params` to prevent server crashes.
- **Monitor CI Health**: The tracker issue #17050 shows 2 broken, 9 flaky tests—developers should expect occasional CI noise when testing against main.

➡️ **Action Item**: If you're deploying on SM100 or MI355X, test with recent nightly builds and report issues early via GitHub.

---  
*Digest generated from sgl-project/sglang — 2026-09-29*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-29**

---

### **1. Today's Highlights**  
The latest updates focus on stabilizing speculative decoding and multimodal input handling, with critical fixes for GCC 15 CI issues and Vulkan/AMD performance. Key advancements include support for CPU-offloaded MTP drafters to reduce VRAM pressure and enhanced batch processing for hybrid (text + embedding) inputs—enabling new use cases like Paligemma-style prompt processing.

---

### **2. Releases & Breaking Changes**  
No formal releases were issued today. However, several PRs introduce breaking changes in behavior:  
- `--cpu-mtp` now enables CPU-offloaded MTP drafters for VRAM-constrained systems ([PR #29620](https://github.com/ggml-org/llama.cpp/pull/29620)) — this may require reconfiguration of existing deployment scripts.  
- The `/v1/embeddings` endpoint now accepts OpenAI-style wrapped content arrays for vision/audio/video inputs (Qwen3-VL-Embedding support) ([PR #29556](https://github.com/ggml-org/llama.cpp/pull/29556)).  
- `llama_batch_ext` now supports mixed embd + raw token inputs, deprecating legacy `llama_batch` APIs ([PR #29622](https://github.com/ggml-org/llama.cpp/pull/29622), [PR #29601](https://github.com/ggml-org/llama.cpp/pull/29601)).

---

### **3. New Model & Hardware Support**  
- **Model Support**: Added experimental support for `GraniteSpeech5ForCTC` (Turbo CTC) — a non-autoregressive encoder-only model for speech-to-text ([PR #29446](https://github.com/ggml-org/llama.cpp/pull/29446)).  
- **Hardware Backends**:  
  - Vulkan backend now includes tuned GDN kernels and improved Intel Arc A770 performance ([PR #29476](https://github.com/ggml-org/llama.cpp/pull/29476)).  
  - Hexagon backend gains better trace granularity (min slice <100ns) for Android profiling ([PR #29614](https://github.com/ggml-org/llama.cpp/pull/29614)).  
- **Quantization**: No new formats introduced; ongoing work on DFlash2 and MTP drafts for Qwen3 series remains active.

---

### **4. Performance & Optimization**  
- **Speculative Decoding**:  
  - `--cpu-mtp` reduces VRAM footprint by offloading MTP drafter state to CPU (~1GB saved on 27B models), enabling deployment on 8–12GB cards ([PR #29620](https://github.com/ggml-org/llama.cpp/pull/29620)).  
  - Vulkan: GDN kernel tuning improves throughput by **~6.3%** on RTX 3090 at ubatch=4096 ([PR #29476](https://github.com/ggml-org/llama.cpp/pull/29476)).  
- **CPU Backend**: Tiled Flash Attention now supports non-vector-multiple head dims on x86 via AVX2 ([PR #29423](https://github.com/ggml-org/llama.cpp/pull/29423)), improving efficiency on heterogeneous hardware.  
- **Batching**: Migration of `mtmd`, `speculative`, and `server` to `batch_ext` enables unified, scalable batching across components ([PR #29385](https://github.com/ggml-org/llama.cpp/pull/29385)).

---

### **5. Stability & Regressions**  
Critical stability issues reported today:  
- **Vulkan Degradation**: Long-running decode sessions (>7h) on Intel Arc A770 result in empty EOS replies due to GPU fence corruption ([Issue #29526](https://github.com/ggml-org/llama.cpp/issues/29526)).  
- **MTP Draft Crash**: Qwen3.8 DFlash/MTP draft emits OOB token ID (n_vocab = 248320) on Vulkan AMD gfx1150, causing decode failure ([Issue #28158](https://github.com/ggml-org/llama.cpp/issues/28158)).  
- **Recurrent State Leak**: HIP/ROCm reports recurrent state leaking across requests in Qwen3.5 MoE models, leading to earlier prompt text being emitted verbatim ([Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092)).  
- **Crash on Large JSON Schema**: Grammar construction time grows superlinearly with large `json_schema`, potentially causing DoS via core pinning ([Issue #29457](https://github.com/ggml-org/llama.cpp/issues/29457)).  

*Note: Fix PRs exist for some regressions (e.g., GCC 15 stringop overflow in `decode_embd_batch` – [PR #29607](https://github.com/ggml-org/llama.cpp/pull/29607)), but others remain open.*

---

### **6. What This Means for Application Developers**  
- **Use Case Expansion**: With support for multimodal embeddings (`/v1/embeddings`) and hybrid text+embd batches, you can now build agents that process images, audio, and text in a single request using models like Qwen3-VL or Paligemma.  
- **Resource Optimization**: Leverage `--cpu-mtp` to run high-throughput speculative decoding on low-VRAM devices (e.g., laptops, edge nodes).  
- **Deployment Caution**: Avoid long-lived Vulkan servers on Intel Arc GPUs until #29526 is resolved. Also, monitor memory usage with MTP drafts—ensure sufficient CPU RAM if offloading.  
- **API Readiness**: Start migrating from `llama_batch` to `llama_batch_ext` in custom tools and frameworks (via [PR #29601](https://github.com/ggml-org/llama.cpp/pull/29601)) to future-proof your codebase.  

> 🔗 **Next Steps**: Review the [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues) and [PRs](https://github.com/ggml-org/llama.cpp/pulls) linked above for production-grade stability checks before upgrading.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-29**

---

### **1. Today's Highlights**  
Ollama v0.35.0 introduces **System One**, a new `/v1/systemone` API for structured decision-making using local Nimble and Tev models, enabling high-performance, low-latency classification, routing, and scoring tasks. This marks a strategic shift toward AI orchestration beyond text generation, with early support in MLX and documentation now being finalized.

---

### **2. Releases & Breaking Changes**  
- **v0.35.0**: Official launch of the **System One API** (`/v1/systemone`) for decision models via TypeSafe’s Jev integration.  
  - *API Behavior Change*: When `top_p` is omitted in `/v1/chat/completions`, it now defaults to `1.0` silently — overriding Modelfile `PARAMETER top_p`. [Issue #18690](https://github.com/ollama/ollama/issues/18690)  
  - *Migration Note*: Existing apps relying on custom `top_p` defaults may need to explicitly pass values.  
- **Critical Billing Bug**: Accounts are stuck in a Stripe retry loop due to automated billing logic failure. Users unable to downgrade or switch plans. [Issue #18683](https://github.com/ollama/ollama/issues/18683)  

---

### **3. New Model & Hardware Support**  
- **New Architecture Support**:  
  - Added experimental support for **K2 Horizon models** (architecture: `"k2-horizon"`) from MBZUAI IFM (3.7B, 7B, 32B, 36B MoE). [Issue #18698](https://github.com/ollama/ollama/issues/18698)  
  - Added support for **GraniteForCausalLM** in MLX backend (for IBM’s Granite 4.1/4.2 series). [PR #17972](https://github.com/ollama/ollama/pull/17972)  
- **Backend Enhancements**:  
  - MLX now supports System One decision models. [PR #18701](https://github.com/ollama/ollama/pull/18701)  
  - CUDA compatibility confirmed for RTX 5090 (though regression reported). [Issue #18642](https://github.com/ollama/ollama/issues/18642)

---

### **4. Performance & Optimization**  
- **Memory Management**:  
  - `OLLAMA_GPU_OVERHEAD` is now ignored by `llama-server` backend — VRAM reservation fails silently. [Issue #18679](https://github.com/ollama/ollama/issues/18679)  
  - Fixed: MLX runner now reports **actual memory usage**, including KV cache and compute graph overhead. [PR #14382](https://github.com/ollama/ollama/pull/14382)  
- **Throughput & Efficiency**:  
  - MTP models now reuse cache across non-thinking turns. [PR #17496](https://github.com/ollama/ollama/pull/17496)  
  - Automatic Flash Attention enabled when supported and safe. [PR #13448](https://github.com/ollama/ollama/pull/13448)  
- **CPU-Limited Containers**:  
  - Default `n_threads` ignores cgroup CPU quotas and cpuset, causing ~45x throughput collapse under limits. [Issue #17916](https://github.com/ollama/ollama/issues/17916)  

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Status |
|---------|-------|-------------|--------|
| 🔴 Critical | [Issue #18642](https://github.com/ollama/ollama/issues/18642) | CUDA illegal memory access crash on RTX 5090 with Cohere MoE models (Windows). | Open |
| 🔴 Critical | [Issue #18683](https://github.com/ollama/ollama/issues/18683) | Billing loop prevents subscription changes; unresponsive support. | Open |
| 🟡 High | [Issue #16532](https://github.com/ollama/ollama/issues/16532) | `gemma4` fails to process images on Windows (OCR prompt hangs). | Open |
| 🟡 Medium | [Issue #18690](https://github.com/ollama/ollama/issues/18690) | Silent override of `top_p` in OpenAI-compatible API. | Open |
| 🟡 Medium | [Issue #12638](https://github.com/ollama/ollama/issues/12638) | GUI pops up during API calls on Windows 11 (inconvenient in headless mode). | Open |

> ✅ **Fixes in Progress**: PRs exist for MLX System One support ([#18701](https://github.com/ollama/ollama/pull/18701)) and documentation ([#18702](https://github.com/ollama/ollama/pull/18702)). No fixes yet for critical crashes or billing loop.

---

### **6. What This Means for Application Developers**  
- **Build Decision Engines**: Use `/v1/systemone` for scalable, low-latency inference in agents requiring classification, routing, or scoring (e.g., ticket triage, model selection).  
- **Avoid Silent Defaults**: Explicitly set `top_p` in requests—don’t rely on Modelfile defaults.  
- **Watch Out for GPU Memory**: `OLLAMA_GPU_OVERHEAD` is ineffective in `llama-server`—manually manage VRAM via `--layers` or `--fit`.  
- **Containerize Carefully**: In cgroups, manually set `n_threads` to avoid catastrophic performance drops.  
- **Expect Regression Risks**: Avoid `gemma4` image processing on Windows until resolved. Test `cohere2moe` on RTX 5090 with caution.  
- **Integrate MLX Early**: Leverage MLX’s growing support for decision models and K2 Horizon for efficient local inference.

> 💡 *Pro Tip*: Use `ollama ps` to monitor CPU/GPU spillage — no warnings are issued when models run entirely on CPU. [PR #17542](https://github.com/ollama/ollama/pull/17542) adds this warning.

---  
*Data source: [github.com/ollama/ollama](https://github.com/ollama/ollama)*  
*Generated: 2026-09-29*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-29**

---

#### **1. Today's Highlights**  
LiteLLM v1.104.0-rc.1 introduces critical security hardening with **cosign-signed Docker images**, reinforcing trust in the supply chain. The proxy ecosystem sees major enhancements: a new **model leaderboard UI** (PR #43649), support for **Airia guardrails** (PR #43657), and expanded **realtime WebSocket routing** for OpenAI Live models via `/v1/live/sessions` (PR #43621). These updates reflect growing maturity in enterprise-grade LLM orchestration.

---

#### **2. Releases & Breaking Changes**  
- **v1.104.0-rc.1**: First release with **cosign image signing** using the same key introduced in [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). All users must verify signatures before upgrading.  
- **v1.103.0**: Released alongside RC, no breaking changes reported.  
- **Migration Note**: The `max_batch_file_records`, `max_batch_daily_uploads`, and `max_batch_file_download_size` limits are now enforced via PR #43632 to prevent abuse in batch processing workflows.

> 🔐 [Verify Docker Image Signature](https://docs.sigstore.dev/cosign/overview/)  
> 📦 [v1.104.0-rc.1 Release Notes](https://github.com/BerriAI/litellm/releases/tag/v1.104.0-rc.1)

---

#### **3. New Model & Hardware Support**  
- ✅ **OpenAI Live Models**: Full proxy support added via new `/v1/live/sessions` route (PR #43621). Enables real-time streaming for `gpt-live-1` and similar models.  
- ✅ **Databricks Foundation Models**: Added support for `system.ai.claude-opus-5` and `sonnet-5` with proper `reasoning` block handling (PR #36931 resolved).  
- ✅ **Bedrock Mantle Cost Rows**: Added cost entries for `claude-opus-5.5` and `sonnet-5.5` on Bedrock Mantle (PR #43647), enabling accurate billing in GovCloud and regional deployments.  
- ✅ **llmman Provider**: Added as an OpenAI-compatible local inference backend (PR #38925), serving models at `http://localhost:17434/v1`.

> 🛠️ [PR #43621: Proxy Live Sessions](https://github.com/BerriAI/litellm/pull/43621)  
> 💡 [PR #38925: Add llmman Provider](https://github.com/BerriAI/litellm/pull/38925)

---

#### **4. Performance & Optimization**  
- **Per-Second Pricing**: New `cost_per_second` field in cost calculator (PR #43614) resolves double-billing issues where `input_cost_per_second` and `output_cost_per_second` were both set to full rate.  
- **Batch File Limits**: Enforced per-file size (`max_batch_file_records`) and daily upload caps (PR #43632), preventing denial-of-service via massive batch uploads.  
- **Guardrail Timeouts**: Every guardrail check is now bounded by `litellm_params.timeout` (PR #43648), preventing indefinite hangs during policy evaluation.  

> ⚙️ [PR #43614: Chat Per-Second Pricing Fix](https://github.com/BerriAI/litellm/pull/43614)  
> ⏱️ [PR #43648: Guardrail Timeout Bounding](https://github.com/BerriAI/litellm/pull/43648)

---

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |  
|--------|------|--------|--------|  
| High | `sanitize_input_schema_for_anthropic` drops root `anyOf`/`$ref` → empty `properties` (Issue #43157) | Open | ❌ |  
| High | Redis cache fails due to `ssl_check_hostname` in `AbstractConnection.__init__()` (Issue #34614) | Open | ❌ |  
| Medium | `max_end_user_budget_id` not persisted to DB → budget reset skips auto-created users (Issue #25386) | Open | ❌ |  
| Medium | `/v1/responses` crashes Ollama with `unhashable type: 'dict'` when `reasoning.summary` present (Issue #37452) | Open | ❌ |  
| Low | Azure GPT-4.1 rejects both `max_tokens` and `max_completion_tokens` simultaneously (Issue #31614) | Open | ❌ |  

> 🔍 [Issue #43157: Anthropic Schema Sanitization Bug](https://github.com/BerriAI/litellm/issues/43157)  
> 🔒 [Issue #34614: Redis SSL Check Hostname Crash](https://github.com/BerriAI/litellm/issues/34614)

---

#### **6. What This Means for Application Developers**  
- **Security-first deployment**: Use `cosign verify` on all LiteLLM Docker images to ensure integrity—critical for production gateways.  
- **Enterprise cost control**: Leverage new project-level budgeting (Issue #28750) and per-team PTU ceilings (PR #43043) to enforce financial governance across teams.  
- **Agent reliability**: Avoid silent failures in fallback chains (Issue #31557) by ensuring fallback models have sufficient context window.  
- **Guardrail robustness**: Enable `timeout`-bounded guardrails (PR #43648) to prevent long-running checks from blocking your application.  
- **Realtime apps**: Build low-latency agents using OpenAI Live models via `/v1/live/sessions` (PR #43621)—ideal for voice, live chat, or interactive agents.  

> 🧩 [Guide: Building Reliable Agents with LiteLLM](https://docs.litellm.ai/docs/proxy/agents)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-29**

---

### **1. Today's Highlights**  
Unsloth v0.1.900-beta introduces **Laya Decision Models** and a unified **Skills Library**, enabling local execution of advanced reasoning agents like Jev (open-source Laya). The release delivers **~4.5× faster image and video generation** on Apple Silicon, alongside major improvements to the Skills Editor and document handling. Meanwhile, critical stability fixes address GPU offloading, tool call hangs, and antivirus false positives.

---

### **2. Releases & Breaking Changes**  
- **v0.1.900-beta**: Official launch with new **Decision Model support** and **Skills Editor** for creating and managing agent behaviors locally.  
  🔗 [GitHub Release v0.1.900-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.900-beta)  
- **Breaking Change Note**: `unsloth start opencode` now caps output at 8192 tokens regardless of `max_tokens` setting — this is a known bug ([#12009](https://github.com/unslothai/unsloth/issues/12009)) and will be addressed in an upcoming patch.

---

### **3. New Model & Hardware Support**  
- ✅ **Laya Decision Models** now supported via `unsloth_zoo` for local inference and fine-tuning.  
- ✅ **Idefics3 architecture** support requested ([#4079](https://github.com/unslothai/unsloth/issues/4079)), including Granite Docling VLM (258M), with native optimization pending.  
- ✅ **MLX on Apple Silicon**: fp16 support added for Laya checkpoints ([#12256](https://github.com/unslothai/unsloth/pull/12256)).  
- ✅ **AMD ROCm + NVIDIA CUDA hybrid systems**: Multiple PRs ([#12248](https://github.com/unslothai/unsloth/issues/12248), [#12246](https://github.com/unslothai/unsloth/issues/12246), [#12245](https://github.com/unslothai/unsloth/issues/12245)) enable selective backend assignment across GPUs; however, visibility and routing remain partially broken.  
- ⚠️ **Qwen 3.8 Flash Next (MLX)** fails to load on M5 Ultra ([#12257](https://github.com/unslothai/unsloth/issues/12257)) — likely due to model format or memory layout incompatibility.

---

### **4. Performance & Optimization**  
- 🚀 **Image/Video Generation**: ~4.5× speedup on Apple Silicon via optimized Metal kernels and improved offload planning ([#12256](https://github.com/unslothai/unsloth/pull/12256), [#12043](https://github.com/unslothai/unsloth/pull/12043)).  
- 🚀 **Laya Inference**: Faster decision making via marker-only heads and CUDA graphs, without requiring `torch.compile` ([#12224](https://github.com/unslothai/unsloth/pull/12224)).  
- 📈 **Memory Planning**: Auto-offload now uses measured activation size instead of fixed 8 GiB/megapixel budget — prevents VRAM starvation on smaller cards ([#12043](https://github.com/unslothai/unsloth/pull/12043)).  
- 📊 **Tool Call Efficiency**: Fixes prevent infinite hanging during terminal/Python tool calls ([#12234](https://github.com/unslothai/unsloth/pull/12234)), improving reliability under load.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| 🔴 High | Tool calls hang indefinitely past `max_tool_call_duration` | Open ([#12048](https://github.com/unslothai/unsloth/issues/12048)) | [#12234](https://github.com/unslothai/unsloth/pull/12234) |
| 🔴 High | Invalid base64 errors corrupt chat context despite valid image return | Open ([#12058](https://github.com/unslothai/unsloth/issues/12058)) | [#12236](https://github.com/unslothai/unsloth/pull/12236) |
| 🟡 Medium | Unsloth Desktop installer falsely flagged by Bitdefender/Windows AV | Closed ([#12140](https://github.com/unslothai/unsloth/issues/12140), [#11397](https://github.com/unslothai/unsloth/issues/11397)) | N/A (external detection) |
| 🟡 Medium | AMD image/video generation fails on RX 7600/Radeon 8060S | Open ([#9897](https://github.com/unslothai/unsloth/issues/9897)) | Pending |
| 🟡 Medium | `CUDA_VISIBLE_DEVICES=""` hides AMD card even when ROCm is active | Open ([#12245](https://github.com/unslothai/unsloth/issues/12245)) | [#12251](https://github.com/unslothai/unsloth/pull/12251) |

> *Note: Several regressions stem from mixed GPU environments and AV interference — common in developer workstations.*

---

### **6. What This Means for Application Developers**  
- **Build intelligent agents** using Laya Decision Models and the new **Skills Editor** for modular, reusable agent logic.  
- **Optimize for Apple Silicon**: Leverage MLX + fp16 + CUDA graphs for low-latency inference in vision-language and decision workflows.  
- **Avoid bottlenecks**: Be cautious with GGUF models in multi-chat scenarios — image requests may block other sessions due to base64 parsing issues ([#12236](https://github.com/unslothai/unsloth/pull/12236)).  
- **Hybrid GPU setups**: Use explicit backend selection (ROCm/CUDA) in settings until full cross-GPU routing stabilizes. Avoid relying on auto-detection on mixed systems.  
- **Export workflows**: Use `export_metadata.json` carefully — it leaks local paths on Mac pushes ([#12239](https://github.com/unslothai/unsloth/pull/12239)); consider sanitizing before sharing.  

👉 **Best Practice**: Always test tool calls under load and monitor for stuck processes. Use the **System tab** to verify which GPU a model runs on — especially when using CUDA/ROCm on mixed hardware ([#12251](https://github.com/unslothai/unsloth/pull/12251)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*