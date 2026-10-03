# AI Infrastructure Digest 2026-10-03

> Generated: 2026-10-03 01:24 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-03**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of high-performance specialization, driven by next-generation hardware (Blackwell SM120, AMD RDNA GPUs, Apple M5) and agent-centric workloads. Projects are diverging in focus: vLLM and SGLang lead in low-latency, high-throughput inference with speculative decoding and MoE optimization; llama.cpp consolidates as the dominant local runtime for edge and heterogeneous deployment; Ollama remains a user-friendly gateway despite growing stability issues; LiteLLM evolves into a critical multi-provider orchestrator with enhanced cost control; while Unsloth pushes boundaries in fine-tuning efficiency and agent tooling—though at the cost of regressions. The convergence of model architectures (Flash attention, hybrid MoE), hardware-specific kernels, and distributed inference demands tighter integration across layers.

---

### **2. Activity Comparison**

| Project       | Issues Open | PRs Merged (Last 24h) | Releases (Last 24h) | Status |
|---------------|-------------|-------------------------|----------------------|--------|
| **vLLM**      | 18          | 7                       | None                 | Stable |
| **SGLang**    | 23          | 9                       | None                 | Stable |
| **llama.cpp** | 28          | 10                      | 3 (b11364, b11362, b11355) | Active |
| **Ollama**    | 25          | 6                       | None                 | Regressions |
| **LiteLLM**   | 22          | 6                       | 1 (v1.105.0-dev.2)   | Security-focused |
| **Unsloth**   | 27          | 5                       | None                 | Regression-prone |

> ✅ *Insight*: **llama.cpp** leads in release velocity, reflecting its role as a foundational runtime. **SGLang** and **Unsloth** show highest issue volume, indicating active feature development under pressure.

---

### **3. Model Support Race**

| New Model / Architecture        | First to Ship Support | Notes |
|-------------------------------|------------------------|-------|
| **GLM-5.3-Flash**             | vLLM, SGLang           | Both report speculative decoding issues on SM120; vLLM has 0% MTP acceptance rate bug |
| **DeepSeek-V4.1-Flash**       | vLLM, SGLang           | vLLM shows decode throughput degradation with `--enforce-eager` |
| **Kimi K3**                   | vLLM                   | Tracking only; no PRs yet |
| **Qwen3.8-2.4T-A95B**         | SGLang                 | ROCm optimization underway |
| **Nimble Decision Model**     | **llama.cpp**          | First project to enable structured agent reasoning natively |
| **Clef Decision Model**       | **llama.cpp**          | Added via runtime support |
| **Prism Bonsai 2 27B**        | **llama.cpp**          | New model added in `b11364` |
| **Reka / QuickSilver Pro**    | **LiteLLM**            | Native OpenAI-compatible providers added |
| **Gemma 3 (Vision)**          | Unsloth                | Partial support; text-only variants fail to save/load |
| **Qwen3-TTS**                 | Unsloth                | LoRA fine-tuning requested but not implemented |

> 🏆 **Winner**: **llama.cpp** holds an early lead in decision-model and vision-language support; **LiteLLM** dominates in provider diversity and new model integrations.

---

### **4. Performance Frontier**

| Optimization Focus               | Leading Projects                          | Key Developments |
|----------------------------------|-------------------------------------------|------------------|
| **KV Cache & Offloading**       | vLLM, SGLang                              | Async KV zeroing, sleep-mode CUDA graph offload, GPU-resident LRU cache for MoE |
| **Speculative Decoding**        | vLLM, SGLang, llama.cpp                   | MTP acceptance fixes, radix cache alignment, per-step width selection |
| **Kernel Efficiency (Flash/MLA)** | vLLM, SGLang, llama.cpp, LiteLLM         | FlashInfer kernel pre-download (`download-kernels`), Metal FA (F16 KV), Triton + Tencent hpc-ops backends |
| **Quantization & Memory**       | Unsloth, llama.cpp                        | Q2_K/Q3_K on Hexagon, FP8/FP4 export (security concerns), VRAM inflation bugs |
| **Distributed Serving**         | SGLang, LiteLLM                           | UnifiedRadixCache, multi-GPU routing, cloud cost tracking |
| **Low-Level Hardware Tuning**   | llama.cpp, vLLM                           | Metal flash attention (Apple Silicon), Vulkan/Rocm optimizations, SYCL graph replay |

> 🔥 **Frontier Insight**: **vLLM** and **SGLang** are leading in speculative decoding correctness and hardware-specific kernel tuning. **llama.cpp** excels in cross-platform low-level performance, especially on Apple Silicon and Vulkan.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Secondary Role                             | Differentiator |
|---------------|-------------------------------|--------------------------------------------|----------------|
| **vLLM**      | Inference Engine              | Model Serving (via OpenAI API)             | High-throughput, Blackwell-ready, speculative decoding |
| **SGLang**    | Inference Engine + Gateway    | Multi-model orchestration, agent workflows | Strong EAGLE/DSpark support, ROCm expansion |
| **llama.cpp** | Local Runtime / Edge Engine   | Tooling for offline inference              | Cross-backend (Metal/Vulkan/SYCL), decision model support |
| **Ollama**    | Gateway / Developer Experience | Self-hosted inference orchestration        | Simple CLI, MLX/ROCm/CUDA support, but unstable |
| **LiteLLM**   | API Gateway / Orchestration   | Cost monitoring, tracing, multi-provider routing | Budget enforcement, OTLP observability, Reka/QuickSilver support |
| **Unsloth**   | Fine-Tuning Framework         | Agent Studio, training data management     | Fast training, UI enhancements, but suffers from regressions |

> 💡 **Layer Summary**:  
> - **Engine Layer**: vLLM, SGLang  
> - **Local Runtime**: llama.cpp  
> - **Gateway**: Ollama, LiteLLM  
> - **Fine-Tuning**: Unsloth  

---

### **6. Trend Signals**

#### **Key Trends Extracted from Today’s Activity**:
1. **Hardware Specialization is Accelerating**:  
   - Blackwell (SM120) and AMD RDNA/GFX1151 are driving targeted kernel optimizations (e.g., FA4 crashes on SM120, ROCm MoE support).  
   - **Signal**: Developers must now consider GPU architecture-specific configurations—no "one-size-fits-all" inference.

2. **Agent Workloads Are Driving Feature Priorities**:  
   - Nimble/Clef decision models in llama.cpp, EAGLE/DSpark speculation in SGLang, and tool-call fidelity in Ollama/LiteLLM all point to agents as the new primary use case.  
   - **Signal**: Expect more tools to prioritize deterministic output, stateful sessions, and structured reasoning over raw speed.

3. **Security & Observability Are Non-Negotiable**:  
   - LiteLLM now signs Docker images via cosign; Ollama faces trust issues due to broken tool call handling.  
   - **Signal**: Production-grade deployments demand verifiable builds and end-to-end traceability.

4. **Regrettable Trade-offs in Optimization**:  
   - Unsloth’s 2.9x slowdown post `b10715`, Ollama’s memory unmapping delays, and vLLM’s MTP failure highlight that aggressive optimizations can introduce instability.  
   - **Signal**: Stability testing must scale with performance gains—especially for agent pipelines.

#### **What Application Developers Should Watch**:
- **Avoid nightly builds** on SM120 (vLLM, SGLang) until #59724 and #42012 land.
- **Pin versions** for Ollama (v0.35.0 or earlier) if using `tool_calls`.
- **Use `download-kernels`** in vLLM to avoid startup latency.
- **Monitor LiteLLM budget enforcement bugs**—do not rely on `max_budget` in v1.82.3–v1.90.2.
- **Expect stricter model pinning** in Unsloth and Ollama—design around managed state continuity.

> ✅ **Final Recommendation**: As infrastructure matures, **layered resilience** (hardware-aware, secure, observable, stable) will matter more than raw throughput. Choose tools not just for speed, but for **predictability under agent workloads**.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-03**

---

### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance for next-generation hardware, with critical fixes for Blackwell (SM120) GPU support and speculative decoding correctness. Key PRs today include a fix for MTP acceptance rate dropping to 0% on GLM-5.3-Flash under native FLASHINFER_MLA_SPARSE_SM120 backend and improvements to async KV loading and CUDA graph offloading in sleep mode.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes were published.

---

### **3. New Model & Hardware Support**  
- **Blackwell (SM120)**: Active development and bug fixes for RTX PRO 6000 Blackwell (8xTP) and RTX 5080. Critical issues around `--enforce-eager`, CUDA graph capture, and speculative decoding acceptance rates are being addressed ([#56892](https://github.com/vllm-project/vllm/issues/56892), [#59724](https://github.com/vllm-project/vllm/issues/59724)).  
- **ROCm (gfx950 / MI355X)**: Ongoing optimization for Qwen3.8-2.4T-A95B and GLM-5.3-Flash; new test coverage added for padding correctness in MoE models ([#57149](https://github.com/vllm-project/vllm/issues/57149), [#59333](https://github.com/vllm-project/vllm/pr/59333)).  
- **New Models**: Tracking support for Kimi K3 ([#50001](https://github.com/vllm-project/vllm/issues/50001)) and DeepSeek-V4.1-Flash ([#56892](https://github.com/vllm-project/vllm/issues/56892)).

---

### **4. Performance & Optimization**  
- **Speculative Decoding**: Fixes landed for MTP acceptance rate drops on SM120 with GLM-5.3-Flash ([#59724](https://github.com/vllm-project/vllm/issues/59724)), and ongoing work to consolidate correctness tests ([#59566](https://github.com/vllm-project/vllm/issues/59566)).  
- **KV Cache & Offloading**: Improvements to async KV load zeroing race prevention ([#59504](https://github.com/vllm-project/vllm/pr/59504)) and exposure of cached prompt tokens by tier ([#56318](https://github.com/vllm-project/vllm/pr/56318)).  
- **Kernel & Memory Efficiency**: Addition of `vllm download-kernels` command to pre-download FlashInfer kernels and avoid runtime compilation ([#58765](https://github.com/vllm-project/vllm/pr/58765)).  
- **Sleep Mode**: Opt-in CUDA graph pool release via `sleep_mode_offload_cudagraph` to reduce memory pressure in large MoE deployments ([#59160](https://github.com/vllm-project/vllm/pr/59160), [#59523](https://github.com/vllm-project/vllm/pr/59523)).

---

### **5. Stability & Regressions**  
- **Critical**: `GLM-5.3-Flash` exhibits 0% MTP acceptance rate on nightly builds with `FLASHINFER_MLA_SPARSE_SM120` backend ([#59724](https://github.com/vllm-project/vllm/issues/59724)) — **PR #59724 is open**.  
- **High Severity**: `DeepSeek-V4.1-Flash` shows extremely low decode throughput on SM120 when using `--enforce-eager` and unusable CUDA graphs ([#56892](https://github.com/vllm-project/vllm/issues/56892)).  
- **Medium**: `Qwen3-VL-8B-FP8` hangs silently during generation on RTX 5080 (SM120) despite successful engine init ([#46625](https://github.com/vllm-project/vllm/issues/46625)).  
- **Low**: `GLM-5.3-Flash` kpool indexer overwrites its own KV cache on ROCm ([#54359](https://github.com/vllm-project/vllm/issues/54359)); model still runs but long-context recall degrades.

---

### **6. What This Means for Application Developers**  
- **Avoid Nightly Builds on SM120**: If deploying DeepSeek-V4.1-Flash or GLM-5.3-Flash on Blackwell GPUs, use stable releases until [#59724](https://github.com/vllm-project/vllm/issues/59724) lands.  
- **Enable `download-kernels`**: Use `vllm download-kernels` post-install to avoid startup latency from kernel compilation, especially on Hopper+ GPUs.  
- **Monitor Sleep Mode Memory Usage**: For large MoE models, enable `sleep_mode_offload_cudagraph` to prevent memory bloat during idle periods.  
- **Prefix Cache & Speculative Decoding**: Be cautious with hybrid attention models (e.g., DeepSeek-V4-Flash + DSpark) — prefix cache reuse may be disabled under MTP spec decoding until [#52244](https://github.com/vllm-project/vllm/pr/52244) is merged.  
- **Use Stable Image Tags**: Avoid `vllm/vllm-openai:latest` if using Transformers 5.15.0 — it’s known to fail with Gemma4 ([#51744](https://github.com/vllm-project/vllm/issues/51744)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-03

---

### **1. Today's Highlights**

SGLang continues to advance its support for speculative decoding and multi-model serving, with critical fixes to EAGLE and DSpark performance issues impacting real-world inference workloads. New PRs focus on robustness in distributed and streaming scenarios—especially around radix cache behavior, GPU memory management, and cross-platform compatibility—while the community pushes forward on AMD ROCm integration and MoE/Flash attention optimizations.

---

### **2. Releases & Breaking Changes**

*No new releases were published in the last 24 hours.*

> ✅ *Note: The latest stable release remains `v0.5.21` (as of 2026-09-18). Users should verify compatibility with upcoming changes in `main`, particularly around `--enable-streaming-session` and `UnifiedRadixCache` usage.*

---

### **3. New Model & Hardware Support**

- **AMD ROCm Support Expansion**:  
  - PR #41389 enables W4A16 MoE inference via Triton kernels on RDNA GPUs (gfx1151), crucial for running Quark MXFP4 models like `amd/Qwen3.5-35B-A3B-MXFP4` on Radeon 8060S / Strix Halo.  
  - Issue #35003 outlines a broader AMD roadmap targeting MI45x (gfx1250), Helios rack systems, and Ryzen AI Halo (gfx1151/1152) platforms.  
  🔗 [PR #41389](https://github.com/sgl-project/sglang/pull/41389) | 🔗 [Issue #35003](https://github.com/sgl-project/sglang/issues/35003)

- **NPU (Ascend) MoE Fix**:  
  PR #39351 addresses a critical FP32 → hidden-dtype downcast bug in AscendTPDispatcher that breaks MoE routing precision.  
  🔗 [PR #39351](https://github.com/sgl-project/sglang/pull/39351)

- **Model-Specific Optimizations**:  
  - PR #42203 adds guards to prevent incompatible LoRA + NVFP4 shared-expert fusion in DeepSeek-V4, avoiding silent failures.  
  - Issue #42170 tracks ongoing DeepSeek V4.1 optimizations including mHC cleanup and TP improvements.  
  🔗 [PR #42203](https://github.com/sgl-project/sglang/pull/42203) | 🔗 [Issue #42170](https://github.com/sgl-project/sglang/issues/42170)

---

### **4. Performance & Optimization**

- **Speculative Decoding Enhancements**:  
  - PR #42281 introduces per-step static verify width selection in DSpark, improving efficiency at batch sizes >64.  
  - PR #42178 resolves prefix reuse collapse in GLM-5.3-Flash under EAGLE speculation by aligning k-pool page logic with logical token boundaries.  
  🔗 [PR #42281](https://github.com/sgl-project/sglang/pull/42281) | 🔗 [PR #42178](https://github.com/sgl-project/sglang/pull/42178)

- **Kernel & Memory Efficiency**:  
  - PR #42264 fixes a write-back SWA assertion failure in HiCache, enabling stable operation on sliding-window models.  
  - PR #42295 enforces `UnifiedRadixCache` as the default for streaming sessions, preventing invalid tree cache use.  
  - PR #42254 adds Foundry Adapter documentation, expanding tooling integrations.  
  🔗 [PR #42264](https://github.com/sgl-project/sglang/pull/42264) | 🔗 [PR #42295](https://github.com/sgl-project/sglang/pull/42295) | 🔗 [PR #42254](https://github.com/sgl-project/sglang/pull/42254)

- **Hardware Acceleration**:  
  - PR #29839 integrates Tencent’s hpc-ops attention and MoE backends for Hopper GPUs (H20/H200), promising SOTA performance in production-scale inference.  
  🔗 [PR #29839](https://github.com/sgl-project/sglang/pull/29839)

---

### **5. Stability & Regressions**

| Severity | Issue | Impact | Status |
|--------|------|--------|--------|
| ⚠️ High | #42012 – FA4 attention backend crashes on SM120 (RTX PRO 6000) during hybrid extend | GLM-5.3-Flash fails at CUDA graph capture; only Triton works | Open, no fix yet |
| ⚠️ High | #32459 – EAGLE speculative decoding collapses radix prefix reuse (97% → 40–53%) | Multi-turn agent traffic suffers severe latency spikes | Closed (no crash), but still active issue |
| ⚠️ Medium | #34974 – DSPARK crashes on `on_select_experts scatter_add_` dimension mismatch | Fails during draft CUDA graph capture | Open, no fix |
| ⚠️ Medium | #37633 – CUDA illegal memory access in QSA extend (8 concurrent requests) | H20 TP8 crashes under load | Open, workaround exists (`CUDA_LAUNCH_BLOCKING=1`) |
| ⚠️ Low | #42143 – HarmonyParser emits tool arguments as reasoning | Streaming output misclassification | Open, minor UX impact |

> 🔗 [Issue #42012](https://github.com/sgl-project/sglang/issues/42012) | 🔗 [Issue #32459](https://github.com/sgl-project/sglang/issues/32459) | 🔗 [Issue #34974](https://github.com/sgl-project/sglang/issues/34974) | 🔗 [Issue #37633](https://github.com/sgl-project/sglang/issues/37633) | 🔗 [Issue #42143](https://github.com/sgl-project/sglang/issues/42143)

---

### **6. What This Means for Application Developers**

- **Avoid EAGLE speculation** on GLM-DSA NVFP4 models until #32459 is resolved—expect up to 60% worse prefix reuse and degraded throughput in long-running agents.
- **Use Triton instead of FA4** for GLM-5.3-Flash on SM120 (RTX PRO 6000) due to known CUDA graph crashes.
- **Enable `UnifiedRadixCache` explicitly** if using streaming sessions—avoid unsupported tree caches in pure-SWA or FlexKV models.
- **Verify model-specific configurations** before deploying LoRA adapters on DeepSeek-V4 or LFM2; ensure fused paths are compatible with quantization and LoRA settings.
- **Monitor CI stability** via #17050: 2 broken, 5 flaky tests reported today—may affect nightly builds and deployment pipelines.

> 💡 *Best Practice*: For high-concurrency or low-latency applications, disable speculative decoding temporarily if encountering unexpected cache misses or crashes. Use `--disable-overlap-schedule` or `CUDA_LAUNCH_BLOCKING=1` as temporary workarounds.

--- 

*Digest compiled from GitHub activity on 2026-10-03. For real-time updates, join the [SGLang Slack](https://slack.sglang.io).*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-03**

---

### **1. Today's Highlights**  
The latest release (`b11364`) introduces support for the *Nimble Decision Model*, expanding llama.cpp’s capabilities in agent-driven workflows. On the performance front, Metal now includes a new flash attention kernel for F16 KV with full support for attention sinks, ALiBi, and logit softcap—critical for high-throughput inference on Apple Silicon. Concurrently, Vulkan and SYCL backends see targeted optimizations for GLM, Intel Arc, and MoE models.

---

### **2. Releases & Breaking Changes**  
- `b11364`: Added runtime support for **Nimble Decision Model** via `model: support nimble decision model` ([#29844](https://github.com/ggml-org/llama.cpp/pull/29844)).  
- `b11362`: Introduced **Metal tensor API flash attention kernel (F16 KV)** with support for attention sinks, ALiBi, and logit softcap ([#29570](https://github.com/ggml-org/llama.cpp/pull/29570)).  
- `b11355`: Disabled large matmul tile on Samsung GPUs with 32KB shared memory to avoid crashes ([#28531](https://github.com/ggml-org/llama.cpp/pull/28531)).  
- `b11351`: Added `alloc_buffer_n` to `ggml_backend_buffer_type_i` interface for improved buffer management ([#23671](https://github.com/ggml-org/llama.cpp/pull/23671)).

> ✅ **Migration Note**: The new Metal FA kernel may require reconfiguring `--flash-attn` and `--logit-softcap` settings for optimal behavior.

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - Added support for **Clef Decision Model (text-only)** via `model: add support for clef decision model` ([#29831](https://github.com/ggml-org/llama.cpp/pull/29831)).  
  - Added support for **Prism Bonsai 2 27B** in runtime ([#29600](https://github.com/ggml-org/llama.cpp/pull/29600)).  
  - Updated `convert_hf_to_gguf.py` to support **Qwen3.5 embedding models** ([#27920](https://github.com/ggml-org/llama.cpp/pull/27920)).  

- **Hardware & Backends**:  
  - **Hexagon**: Added `q2_k` and `q3_k` quantization support ([#29717](https://github.com/ggml-org/llama.cpp/pull/29717)).  
  - **Vulkan**: Improved logging during pipeline compilation ([#29794](https://github.com/ggml-org/llama.cpp/pull/29794)).  
  - **SYCL**: Added graph recording/replay functionality ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725)).  
  - **OpenVINO**: Updated to 2026.4.1 with enhanced MoE fusion and device listing ([#29852](https://github.com/ggml-org/llama.cpp/pull/29852)).

---

### **4. Performance & Optimization**  
- **Metal**: Flash attention kernel (F16 KV) enables efficient speculative decoding with attention sinks and ALiBi.  
- **Vulkan**: RMS norm optimization using subgroup reductions improves throughput on Intel Arc B70 and RTX 4060 Ti ([#29882](https://github.com/ggml-org/llama.cpp/pull/29882)).  
- **CUDA**: Optimized multi-row TOP_K using segmented radix sort reduces decode latency ([#29883](https://github.com/ggml-org/llama.cpp/pull/29883)).  
- **SYCL**: Accelerated GLM MLA prefill via MKL flash attention and optimized IQ3_S/MMVQ layouts ([#29171](https://github.com/ggml-org/llama.cpp/pull/29171), [#29696](https://github.com/ggml-org/llama.cpp/pull/29696)).  
- **MoE**: GPU-resident LRU cache for host-offloaded experts reduces decode stalls by minimizing RAM bandwidth pressure ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861)).

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:  
- **Vulkan Flash Attention Crash**: Massive performance drop or crash on AMD GPUs with Vulkan backend ([#25207](https://github.com/ggml-org/llama.cpp/issues/25207)).  
- **Metal OOM on Gemma 4 31B**: Memory errors on Apple M5 Max due to large default `n_ctx` ([#29521](https://github.com/ggml-org/llama.cpp/issues/29521)).  
- **Adreno Driver Abort**: `llama.cpp` crashes silently on Qualcomm Adreno drivers with `-ngl >= 1` ([#29786](https://github.com/ggml-org/llama.cpp/issues/29786)).  
- **Draft-MTP Prompt Corruption**: `DeviceLost` error during prompt processing on AMD RADV/Vulkan ([#27306](https://github.com/ggml-org/llama.cpp/issues/27306)).  
- **Speculative Decode Crashes**: Query head dimension mismatch in `gemma4-assistant` with MTP + flash attention ([#29419](https://github.com/ggml-org/llama.cpp/issues/29419)).  

> ⚠️ **Note**: No PRs yet address these regressions; users should avoid `--spec-type draft-mtp` with Flash Attention until resolved.

---

### **6. What This Means for Application Developers**  
- **Agents & Decision Engines**: With Nimble and Clef model support, you can now deploy structured reasoning pipelines directly within llama.cpp without external orchestration.  
- **High-Throughput Inference**: Use Metal’s new flash attention kernel for faster speculative decoding on Apple Silicon devices—ideal for real-time chat agents.  
- **Multi-GPU & MoE Optimization**: Leverage the GPU-resident LRU cache for MoE models to reduce latency when offloading experts to CPU memory.  
- **Caution with Speculative Decoding**: Avoid `draft-mtp` with Flash Attention on Vulkan and AMD platforms until stability fixes land.  
- **Build Robustness**: Use `--log-level debug` and monitor logs closely—silent crashes (e.g., Adreno) are still unresolved.

> 🔗 [Official Release Page](https://github.com/ggml-org/llama.cpp/releases/tag/b11364) | [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-03**

---

### **1. Today's Highlights**  
A critical regression in Ollama Cloud Pro has triggered a 95% failure rate across all cloud-hosted models, rendering the service unusable for paying customers—this is the top-priority issue today. On the local side, multiple stability and performance regressions have emerged post-0.35.1, particularly affecting MLX on macOS (M4 Pro), Vulkan GPU detection on Windows, and ROCm VRAM utilization. Meanwhile, PR activity reflects strong momentum in tool-call parsing correctness, model runtime support (MLX/ROCm/CUDA), and integration with agent frameworks.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases were published in the last 24 hours. However, **Ollama v0.35.1** is now under active scrutiny due to several breaking issues:
- **Windows installer signature failure** (`HashMismatch`) reported in [#18765](https://github.com/ollama/ollama/issues/18765) — may block enterprise deployments.
- The `/v1/chat/completions` endpoint now incorrectly associates tool results by position instead of `tool_call_id` ([#18762](https://github.com/ollama/ollama/issues/18762)), breaking deterministic tool execution in agents.

> 🔔 *Developers using `tool_calls` in production should verify behavior with v0.35.1 until fix PRs land.*

---

### **3. New Model & Hardware Support**  
- **MLX engine**: Added support for `GraniteForCausalLM` architecture via PR [#17972](https://github.com/ollama/ollama/pull/17972), enabling use of IBM’s Granite 4.1/4.2 models on Apple Silicon.
- **ROCm + CUDA dual-runtime support**: Requested in [#18545](https://github.com/ollama/ollama/issues/18545); currently not implemented but acknowledged as a high-priority feature for multi-GPU systems.
- **Intel UHD Vulkan detection**: Issue [#18672](https://github.com/ollama/ollama/issues/18672) reports that Intel iGPU on Windows is not detected via Vulkan backend in v0.34.4 — a hardware compatibility gap.

---

### **4. Performance & Optimization**  
- **MLX engine inefficiency on M4 Pro**: Issue [#18754](https://github.com/ollama/ollama/issues/18754) shows that Qwen 3.8 (27B) is not utilizing full GPU memory capacity in v0.40.0, despite having 48GB available. A downgrade to v0.35.1-rc2 restores proper usage.
- **MLX weights unmapped after idle**: PR [#18744](https://github.com/ollama/ollama/issues/18744) reveals that MLX unmaps model weights ~2 seconds after each request, causing page-ins on subsequent queries under memory pressure — severely impacting latency in long-running services.
- **ROCm VRAM ignored during eviction**: [#18756](https://github.com/ollama/ollama/issues/18756) confirms that even when unified VRAM is available, older models are evicted prematurely due to incorrect VRAM accounting.

> ✅ *Fixes in progress: PR [#18755](https://github.com/ollama/ollama/pull/18755) aims to decouple decision preparation from forward pass, improving efficiency for Strands Decider and future inference pipelines.*

---

### **5. Stability & Regressions**  
| Severity | Issue | Link | Status |
|--------|------|------|--------|
| 🔴 Critical | Ollama Cloud Pro: 95% failure rate across all cloud models | [#15453](https://github.com/ollama/ollama/issues/15453) | Open |
| 🔴 High | Llama3.2-vision broken after latest update | [#16490](https://github.com/ollama/ollama/issues/16490) | Open |
| 🟡 Medium | Tool-call tag loss across chunk boundaries | [#18681](https://github.com/ollama/ollama/issues/18681) | Open |
| 🟡 Medium | `/v1/chat/completions` misassociates tool results by index | [#18762](https://github.com/ollama/ollama/issues/18762) | Open — Fix PR submitted: [#18763](https://github.com/ollama/ollama/pull/18763) |
| 🟡 Medium | MLX weights unmapped after idle (~2 sec delay) | [#18744](https://github.com/ollama/ollama/issues/18744) | Open |
| 🟡 Medium | ROCm VRAM not properly accounted for during model eviction | [#18756](https://github.com/ollama/ollama/issues/18756) | Open |

> ⚠️ **Notable**: Several regressions stem from recent changes to streaming parsers, tool call handling, and runtime dispatch logic. These affect both local and cloud workflows.

---

### **6. What This Means for Application Developers**  
- **Avoid v0.35.1+** if using `tool_calls` or `systemone` endpoints — expect incorrect result association and potential crashes. Use v0.35.0 or earlier until fixes land.
- **Cloud users**: If relying on Ollama Cloud Pro, prepare for outages — consider migrating to self-hosted instances or evaluating alternatives temporarily.
- **macOS/M4 developers**: Be aware that MLX may not fully utilize GPU memory; monitor for page-in delays under load. Downgrade if necessary.
- **Multi-GPU users (NVIDIA + AMD)**: You cannot currently run both CUDA and ROCm backends simultaneously — this is actively requested in [#18545](https://github.com/ollama/ollama/issues/18545).
- **Agent integrators**: Ensure your parser logic handles partial tool tags — [#18759](https://github.com/ollama/ollama/pull/18759) addresses this, but downstream apps must validate input integrity.

> 💡 *Recommendation*: Pin your Ollama version in CI/CD pipelines and monitor GitHub issues closely. Consider leveraging `ollama create --quantize` only after confirming blob cleanup behavior — unreferenced F16 blobs persist post-quantization ([#18416](https://github.com/ollama/ollama/issues/18416)).

---  
*Digest generated: 2026-10-03 | Source: [github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-03**

---

### **1. Today's Highlights**  
The LiteLLM project continues rapid evolution with critical fixes to budget enforcement, tracing reliability, and model compatibility—especially around Anthropic’s Sonnet 5.5 and Bedrock pricing. Key PRs address high-severity issues like silent budget bypasses (`#26672`), incorrect cost tracking for custom models (`#35691`), and improper handling of `reasoning_effort='none'` on Azure GPT-5 (`#31243`). New provider support for Reka and QuickSilver Pro expands OpenAI-compatible inference options.

---

### **2. Releases & Breaking Changes**  
- **v1.105.0-dev.2** released today with a strong emphasis on security: all Docker images are now signed via [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
  🔐 Verify signatures using `cosign verify` and the public key from commit `0112e53`.  
  → [GitHub Release Notes](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-dev.2)  

No breaking API changes reported in this release cycle.

---

### **3. New Model & Hardware Support**  
- ✅ **Reka** added as first-class OpenAI-compatible provider (`reka/`) via [PR #44278](https://github.com/BerriAI/litellm/pull/44278).  
- ✅ **QuickSilver Pro** now supported natively via `quicksilverpro/` provider ([PR #44303](https://github.com/BerriAI/litellm/pull/44303)).  
- ✅ **CoralBricks** (GLM 5.3, DeepSeek V4.1 Flash) integrated with full cost tracking and config support ([PR #35957](https://github.com/BerriAI/litellm/pull/35957)).  
- ✅ **Amazon Nova 2 Pro (Preview)** now correctly priced at Standard tier rates in Bedrock catalog ([PR #44302](https://github.com/BerriAI/litellm/pull/44302)).

---

### **4. Performance & Optimization**  
- 🚀 **Prompt Cache Eligibility Optimization**: PR [#44221](https://github.com/BerriAI/litellm/pull/44221) removes full-conversation tokenization during cache eligibility checks—improving latency for long-context routing.  
- 📊 **OTEL Span Efficiency**: PRs [#44240](https://github.com/BerriAI/litellm/pull/44240) and [#44148](https://github.com/BerriAI/litellm/pull/44148) refine PostgreSQL span naming and reduce unnecessary DB I/O, improving observability performance.  
- ⏱️ **Stream Retry Logic Fix**: PR [#44276](https://github.com/BerriAI/litellm/pull/44276) ensures `/v1/messages` streams retry when dropped before first content chunk—critical for Databricks AI backend stability.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|-------|
| 🔴 High | Budget enforcement bypassed for `key/max_budget` despite spend > limit (`#26672`) | Open | ❌ No fix yet |
| 🔴 High | `reasoning_effort='none'` fails on Azure GPT-5 due to ignored base model (`#31243`) | Closed | ✅ [PR #44299](https://github.com/BerriAI/litellm/pull/44299) (fixes reasoning mapping) |
| 🔴 High | `model_max_budget` enforcement not applied to end-users (`#31842`) | Open | ❌ No fix yet |
| 🟡 Medium | Silent skip of MCP tool auto-execution for Ollama models (`#31911`) | Open | ❌ No fix yet |
| 🟡 Medium | OTLP span events lost before ClickHouse storage (`#44274`) | Open | ❌ No fix yet |
| 🟡 Medium | Redis cluster shutdown failure on `REDIS_CLUSTER_NODES` (`#31206`) | Open | ❌ No fix yet |

> 💡 Note: Several high-severity bugs remain open despite recent activity—users relying on budgeting or agent tooling should monitor these closely.

---

### **6. What This Means for Application Developers**  
- **Budgeting & Cost Control**: Avoid v1.82.3–v1.90.2 if you rely on `max_budget` enforcement—bugs may cause unbounded spending. Upgrade to latest stable or use `v1.105.0-dev.2` with verified signing.  
- **Agent Development**: Ensure your tooling uses `openai/` routes for Ollama models to avoid silent MCP execution failures (`#31911`). Consider switching to native providers like Reka or QuickSilver Pro for better cost visibility.  
- **Observability**: Enable OTEL v2 with `litellm_otel_postgres_span_operation_table` and `cache_token_counts` attributes (via #43992) to gain deeper insight into prompt caching and trace lineage.  
- **Security**: Always validate Docker image signatures using `cosign`—this is now mandatory for production deployments.  
- **Future-Proofing**: Monitor `#361` (wishlist) for upcoming features like shared-wallet fallbacks (`#43652`) and enhanced tagging (`#44289`) that will improve team-level cost governance.

👉 Stay ahead: Follow [Discord](https://discord.gg/berriai) and watch PRs linked above for real-time updates.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-03**

#### **1. Today's Highlights**  
The Unsloth ecosystem continues to expand its agent-centric tooling, with major UI/UX improvements in Studio focused on multi-model management, tool call fidelity, and training data integrity. Critical performance regressions were identified in recent builds—specifically a **2.9x slowdown in tensor-split decoding** since `b10715-mix-86bd2d3`, impacting users on dual-GPU setups. Meanwhile, persistent VRAM overuse during fine-tuning remains a top concern, with multiple reports of OOMs even when models are advertised as memory-efficient.

#### **2. Releases & Breaking Changes**  
*No new releases in the last 24h.*  
However, several PRs suggest imminent changes:  
- **PR #12573**: Addresses a hard 8,192-token cutoff in `unsloth start openclaw`—a significant limitation for long-context generation.  
- **PR #12569**: Reverts 10 merged PRs pending Codex review convergence, indicating ongoing internal quality control tightening.  
- **PR #12588**: Fixes inconsistent image generation across servers by pinning `dynamic_scale_rblock`, improving reproducibility for FLUX.1-schnell inference.

> 🔗 [PR #12573](https://github.com/unslothai/unsloth/pull/12573) | [PR #12569](https://github.com/unslothai/unsloth/pull/12569) | [PR #12588](https://github.com/unslothai/unsloth/pull/12588)

#### **3. New Model & Hardware Support**  
- **Qwen3-TTS**: Feature request (#3951) highlights demand for LoRA fine-tuning support, now pending implementation.  
- **Gemma 3 (Vision)**: Issue #12554 flags problems saving/loading text-only variants of VLMs, suggesting incomplete model variant handling.  
- **Multi-GPU Training**: Requested via #5764; currently limited to single-card use despite `device_map` support in scripts.  
- **Windows Backend Customization**: PR #11327 enables configurable backend install paths, easing deployment in locked environments.

> 🔗 [Issue #3951](https://github.com/unslothai/unsloth/issues/3951) | [Issue #12554](https://github.com/unslothai/unsloth/issues/12554) | [Issue #5764](https://github.com/unslothai/unsloth/issues/5764) | [PR #11327](https://github.com/unslothai/unsloth/pull/11327)

#### **4. Performance & Optimization**  
- **Critical Regression**: Tensor-split decoding (**`--split-mode tensor`**) is **2.9x slower** post `b10715-mix-86bd2d3`, dropping from **115–118 t/s** (pre-release) to **~48 t/s** on RTX 5070 Ti. Root cause likely tied to CUDA graph limits (`max_cuda_graphs = 64`) or kernel launch overhead.  
- **API Latency Overhead**: OpenAI-compatible API adds **~1.2s fixed latency per request** (Issue #12364), severely impacting short-text workloads.  
- **FP8/FP4 Export**: Auto-installation of `llm-compressor` without consent raises security concerns (Issue #8904).  

> 🔗 [Issue #12468](https://github.com/unslothai/unsloth/issues/12468) | [Issue #12364](https://github.com/unslothai/unsloth/issues/12364) | [Issue #8904](https://github.com/unslothai/unsloth/issues/8904)

#### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| ⚠️ High | #4504 | Fine-tuning uses **far more VRAM than advertised**, causing OOMs on large models despite efficient quantization claims. | ❌ No fix yet; affects all users attempting big-model tuning |
| ⚠️ High | #9867 / #10017 | `Qwen3.8-27B-bnb-4bit` crashes during forward pass due to **shape mismatch** from improperly loaded `quant_state`. | ✅ Patch under review (see #10276) |
| ⚠️ Medium | #12518 | "Generation stopped making progress" + `chat_generation_run_lease_expired` errors disrupt long-running agents. | ❌ No known resolution |
| ⚠️ Medium | #12467 | `--mmproj-device CUDA1` rejected if model has saved `gpu_ids`, breaking vision model routing. | ❌ Unresolved |

> 🔗 [Issue #4504](https://github.com/unslothai/unsloth/issues/4504) | [Issue #9867](https://github.com/unslothai/unsloth/issues/9867) | [Issue #12518](https://github.com/unslothai/unsloth/issues/12518) | [Issue #12467](https://github.com/unslothai/unsloth/issues/12467)

#### **6. What This Means for Application Developers**  
- **Avoid recent builds** (`b10715-mix-86bd2d3+`) if you rely on **multi-GPU tensor splitting**—expect severe throughput degradation. Use `b10687-mix-67dfc8b` or official `ggml-org` builds for stable performance.  
- **Fine-tune cautiously**: The VRAM inflation bug (#4504) invalidates advertised memory efficiency—monitor actual usage closely, especially for 27B+ models.  
- **Agent workflows may break**: Tool calls are being dropped in exports (#12574), and API latency can dominate response times. Consider bypassing Studio’s OpenAI endpoint for low-latency apps.  
- **Future-proof your pipelines**: Expect stricter model pinning and state persistence (e.g., #12549), so design around managed account state continuity.

> 🔗 [All issues tracked here](https://github.com/unslothai/unsloth/issues?q=is%3Aopen+sort%3Aupdated-desc)

---  
*Digest generated: 2026-10-03 | Source: github.com/unslothai/unsloth*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*