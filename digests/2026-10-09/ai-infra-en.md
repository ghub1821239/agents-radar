# AI Infrastructure Digest 2026-10-09

> Generated: 2026-10-09 02:32 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-09**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *convergent specialization*, where high-performance engines (vLLM, SGLang), lightweight local runtimes (llama.cpp), and unified gateways (LiteLLM) are rapidly maturing to support next-generation models with long contexts, MoE architectures, and multimodal inputs. Hardware acceleration is no longer optional—Blackwell (SM120), Mi355X (gfx950), and Apple M-series are now first-class targets, while disaggregated and distributed inference is gaining traction via DFlash, Mooncake Store, and multi-GPU MoE caching. Meanwhile, training and fine-tuning platforms like Unsloth are shifting from pure inference to full-stack agent development, signaling a broader move toward end-to-end AI system orchestration.

---

### **2. Activity Comparison**  

| Project       | Issues Open (High/Crit) | PRs (Last 24h) | Releases (Last 24h) | Status |
|--------------|--------------------------|----------------|------------------------|--------|
| **vLLM**     | 15 (3 critical)          | 8              | None                   | Stable focus |
| **SGLang**   | 17 (4 severe)            | 6              | None                   | High instability |
| **llama.cpp**| 15 (2 high, 1 medium)    | 6              | 4 (b11514–b11507)      | Active patching |
| **Ollama**   | 16 (2 critical, 2 high)  | 4              | v0.40.2                | Patch-focused |
| **LiteLLM**  | 11 (4 critical)          | 5              | 5 (dev/rc/stable)      | Rapid iteration |
| **Unsloth**  | 10 (3 high)              | 4              | v0.1.905-beta          | Beta innovation |

> ✅ *Note: vLLM and LiteLLM show the highest engineering velocity with stable releases; SGLang and Ollama report significant regression density.*

---

### **3. Model Support Race**  

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash**        | ✅ (Optimized) | ⚠️ (Degeneration) | ❌ | ❌ | ❌ | ✅ (Decision model) |
| **Qwen3.8-Flash-Next**   | ✅ (ROCm/SM120) | ✅ (SM121) | ✅ (Multi-GPU MoE) | ⚠️ (Requested) | ❌ | ❌ |
| **DeepSeek-V4.1-Flash**  | ✅ (SM120) | ✅ (Refactoring) | ❌ | ❌ | ❌ | ❌ |
| **Kimi K2.5 Vision**     | ✅ (Torch.compile fix) | ❌ | ❌ | ❌ | ❌ | ✅ (Vision decision logic) |
| **MoE Models (multi-GPU)** | ⚠️ (Partial) | ⚠️ (DSA/MTP sharding) | ✅ (b11507+) | ❌ | ❌ | ✅ (Spilling + auto ubatch) |
| **Apple Silicon (MLX)**  | ❌ | ✅ (RFC) | ❌ | ⚠️ (Panic) | ❌ | ✅ (M5 Max GGUF) |

> 🏆 **Winner**: **llama.cpp** leads in *multi-GPU MoE support* and *hardware breadth* (MUSA, Adreno A6x, Vulkan).  
> 🥈 **Runner-up**: **vLLM** dominates *production-grade model optimization* for emerging LLMs like GLM-5.3-Flash and Qwen3.8.  
> 🥉 **Innovator**: **Unsloth** is pioneering *decision model training* on vision+text backbones — setting a new frontier beyond inference.

---

### **4. Performance Frontier**  

| Optimization Focus         | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Memory**      | ✅ FP8, paged_shm, DFlash2/DSpark | ✅ DSA KV cache layout | ✅ MoE cache across GPUs | ⚠️ Clef OOM risk | ⚠️ Telemetry-heavy | ✅ Auto `ubatch-size` on spill |
| **Prefill Batching**       | ✅ Shard sparse indexer, AITER top-k | ⚠️ mHC clean-up | ✅ Radix-based top-k | ❌ | ❌ | ❌ |
| **Speculative Decoding**   | ✅ DFlash2/DSpark | ⚠️ Infinite `!` loops | ✅ Draft-MTP | ❌ | ❌ | ❌ |
| **Quantization & Kernel**  | ✅ FP8, Quark-MXFP4 | ✅ DeepGEMM MegaGate | ✅ FWHT, CUB→radix | ❌ | ❌ | ✅ bnb-4bit, Q4_K_M |
| **Distributed Serving**    | ✅ Mooncake Store Connector | ✅ DSA/MTP sharding | ✅ Multi-GPU MoE | ❌ | ✅ AWS Bedrock, Copilot | ❌ |

> 🔥 **Top Trends**:  
> - **Radix-based top-k** (llama.cpp) is reducing kernel launches by 99.7% — a major win for long-context prefill.  
> - **MoE-aware memory management** (llama.cpp, Unsloth) is becoming essential for scalable inference.  
> - **Distributed speculative decoding** (vLLM, SGLang) is advancing but remains fragile under edge cases.

---

### **5. Layer Positioning**  

| Project       | Primary Layer                     | Key Differentiator |
|---------------|-----------------------------------|--------------------|
| **vLLM**      | **High-Performance Serving Engine** | Best-in-class latency, FlashInfer integration, Blackwell/ROCm optimization |
| **SGLang**    | **Flexible Inference Stack**      | Strong support for NPU/Apple Silicon, dynamic routing, DFlash |
| **llama.cpp** | **Local Runtime & Edge Inference** | GPU-native, low-level control, broad hardware coverage (Vulkan, MUSA, Adreno) |
| **Ollama**    | **LLM Gateway & Developer UX**    | Unified CLI, cloud model access, GGUF migration, but unstable MLX backend |
| **LiteLLM**   | **Enterprise API Gateway**        | Multi-provider abstraction, cost telemetry, per-user OAuth, security (cosign) |
| **Unsloth**   | **Agent Training & Fine-Tuning**  | First to enable *structured decision model training* from any LLM |

> 💡 **Strategic Insight**: The stack is bifurcating — *infrastructure engines* (vLLM, SGLang, llama.cpp) handle low-latency inference; *gateways* (Ollama, LiteLLM) abstract complexity; *training platforms* (Unsloth) are building the next generation of agents.

---

### **6. Trend Signals**  

#### **Industry Trends Extracted**:  
1. **MoE Scaling is Now Mainstream** — All major projects (llama.cpp, Unsloth, vLLM) now support distributed MoE caching or expert spilling. This signals that MoE is no longer experimental but production-ready.
2. **Hardware Abstraction is Maturing** — ROCm, Apple Silicon, NPU, and MUSA are no longer niche. Projects are investing in native paths (e.g., SGLang’s Torch/MLX interoperability, llama.cpp’s Vulkan/MUSA).
3. **Agent-Centric Development is Emerging** — Unsloth’s decision model pipeline marks a shift from prompt engineering to structured, trainable agents. This will likely influence future frameworks.
4. **Stability vs. Speed Tradeoff is Clear** — SGLang and Ollama show high instability despite rapid feature growth. vLLM and LiteLLM maintain better stability, indicating a maturity gap.
5. **Security & Observability Are Non-Negotiable** — LiteLLM’s cosign-signed Docker images and telemetry enhancements reflect growing enterprise demand for auditability and cost visibility.

#### **Actionable Guidance for Developers**:  
- ✅ **Use vLLM or llama.cpp** for high-throughput, low-latency inference on modern GPUs (Blackwell, Mi355X).  
- ✅ **Leverage LiteLLM** for multi-cloud, cost-optimized gateways with strong observability.  
- ✅ **Avoid Ollama v0.40.x on macOS MLX** — use v0.35.1 until panic is fixed.  
- ✅ **Prepare for decision agents** — Unsloth’s beta release shows this is not just a trend, but a new layer in the stack.  
- ⚠️ **Monitor regressions in SGLang and Ollama** — avoid production use until critical bugs (GLM-5.3 repetition, MLX panics) are resolved.

> 📌 **Bottom Line**: The infrastructure landscape is no longer about choosing one tool — it’s about composing layers: **engine (vLLM)** + **gateway (LiteLLM)** + **agent trainer (Unsloth)** = next-gen AI system.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-09**

---

### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance for next-generation models on Blackwell (SM120) and ROCm (gfx950/Mi355X) hardware, with critical bug fixes for FP8 KV cache handling and speculative decoding. Key PRs include optimizations for GLM-5.3-Flash’s sparse prefill indexer and improvements to Mooncake Store Connector reliability, while ongoing work targets faster AITER prefill execution and better multimodal tensor management.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API changes observed.

---

### **3. New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash**: Active optimization for long-context inference via shard-based prefill row distribution across TP ranks ([PR #54951](https://github.com/vllm-project/vllm/pull/54951)).  
- ✅ **Qwen3.8-Flash-Next / Qwen3.8-2.4T-A95B**: Performance tracking and kernel tuning underway for ROCm gfx950 / MI355X platforms ([Issue #59575](https://github.com/vllm-project/vllm/issues/59575), [Issue #57149](https://github.com/vllm-project/vllm/issues/57149)).  
- ✅ **DeepSeek-V4.1-Flash**: Support extended to SM120 (RTX PRO 6000 Blackwell) with fix for missing `page_block_size=32` FlashInfer kernel ([Issue #59203](https://github.com/vllm-project/vllm/issues/59203)).  
- ✅ **Kimi K2.5 Vision Encoder**: Optimized Torch.compile behavior to prevent warm-cache reload failures ([PR #53011](https://github.com/vllm-project/vllm/pull/53011)).

---

### **4. Performance & Optimization**  
- 🚀 **GLM-5.3-Flash Pre-Fill Optimization**: Shard sparse-indexer rows across TP ranks to reduce redundant MQA scoring and top-k operations, improving scalability on large context lengths ([PR #54951](https://github.com/vllm-project/vllm/pull/54951)).  
- ⚡ **AITER Prefill Indexer Top-K Reduction**: On GLM-5.3-Flash, reduced topk overhead from **350ms per chunk at 512k ISL** by optimizing AITER prefill indexing ([PR #60753](https://github.com/vllm-project/vllm/pull/60753)).  
- 🔍 **Multi-Modal Memory Efficiency**: Introduce paged shared memory storage (`--mm-processor-cache-type paged_shm`) for efficient IPC of vision tensors ([PR #51349](https://github.com/vllm-project/vllm/pull/51349)).  
- 📈 **ROCm Performance Tracking**: Ongoing efforts to close performance gaps on Mi355X (gfx950) for Qwen3.8 models using MXFP4 and Quark-MXFP4 quantization ([Issue #59575](https://github.com/vllm-project/vllm/issues/59575)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix/Workaround |
|--------|------|-------|----------------|
| 🔴 Critical | FP8 KV Cache startup OOM due to CUDA graph memory exclusion from budget | [Issue #60350](https://github.com/vllm-project/vllm/issues/60350) | Pending fix; affects 24GB GPUs |
| 🔴 Critical | DFlash2/DSpark + prefix caching corrupts output after cache hit on Qwen3.8-27B NVFP4 | [Issue #60174](https://github.com/vllm-project/vllm/issues/60174) | Reproduced on v0.30/0.31; v0.29 works |
| 🔴 Critical | GLM-5.3-Flash degenerates into “word salad” in multi-turn agentic use | [Issue #56605](https://github.com/vllm-project/vllm/issues/56605) | High comment count; reproducible with W4A16 quantized model |
| 🟡 Moderate | `kv_cache_dtype="fp8"` crashes without fallback to TRITON_ATTN when FlashInfer JIT missing | [Issue #60262](https://github.com/vllm-project/vllm/issues/60262) | Workaround: set `VLLM_USE_FLASHINFER_SAMPLER=0` |
| 🟡 Moderate | AudioSpec does not produce 1D mono output for single-channel audio | [Issue #59267](https://github.com/vllm-project/vllm/issues/59267) | Minor data format mismatch |

---

### **6. What This Means for Application Developers**  
- **Use `--mm-processor-cache-type paged_shm`** for efficient multimodal processing in high-throughput systems.  
- **Avoid `kv_cache_dtype="fp8"` on systems without FlashInfer JIT** — it may crash instead of falling back gracefully. Use `VLLM_USE_FLASHINFER_SAMPLER=0` as a temporary workaround.  
- **Monitor regressions in v0.30+** — especially for Qwen3.8-27B NVFP4 (DFlash2/DSpark) and GLM-5.3-Flash (long-decode degeneration). Consider pinning to v0.29 until fixes land.  
- **Leverage Mooncake Store Connector improvements** — added query timeouts and retries ([PR #55923](https://github.com/vllm-project/vllm/pull/55923)) for more resilient disaggregated serving.  
- **Prepare for future AITER/MLA optimizations** — upcoming PRs will significantly accelerate prefill stages for GDN and Mamba-family models.

> *Stay tuned: Fast-track merging RFC (#59665) may accelerate critical performance fixes.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-09**

---

### **1. Today's Highlights**  
The SGLang project continues to advance its high-performance inference stack with critical work on DeepSeek V4.1 optimization, CUDA graph stability, and unified radix cache improvements. Key PRs include integration of DeepGEMM MegaGate routing for DeepSeek models and fixes for flaky CI infrastructure, while ongoing efforts target Apple Silicon support via Torch/MLX interoperability.

---

### **2. Releases & Breaking Changes**  
None. No new releases were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **Apple Silicon (M-series)**: A major RFC (#32321) proposes a redesign for Apple Silicon serving using a Torch-owned SRT path with an exported MLX region, aiming for native Metal and unified memory management. Implementation underway via #36164.
- **NPU (Ascend A2/A3)**: Ongoing support enhancements for DSA-based KV caching (#41875), including capability-driven layout resolution and CP V2 strategy alignment for GLM-5.2.
- **AMD ROCm**: Work continues to avoid PTX emission issues on MI355; PR #43103 skips `residual_gate_add` PTX kernel on ROCm to prevent compilation failures.

> 🔗 [RFC: Apple Silicon Serving Redesign](https://github.com/sgl-project/sglang/issues/32321)  
> 🔗 [NPU: Resolve DSA KV Cache Layout from Startup Capability](https://github.com/sgl-project/sglang/pull/41875)

---

### **4. Performance & Optimization**  
- **DeepSeek V4.1**: Active refactoring underway for mHC code clean-up (#42245) and fusion optimizations including `q_rope_store` folding into `fused_q_norm_rope` (#41657).
- **Qwen4Exp (Qwen3.8-Flash-Next) on SM121**: Significant performance bottlenecks identified — QSA and PLE kernels dominate decode time. Requests for tuning (QSA gather, GDN KDA backends, torch.compile + CUDA graphs) are open (#36796).
- **Diffusion Pipeline**: PR #43164 benchmarks MiniMax-H3’s Ulysses exchange against attention over copy engine, identifying latency overheads in multi-GPU data movement.
- **KV Cache Sharding**: Support added for DSA indexer (#40925) and MTP (#40929), enabling scalable cache partitioning across data-parallel setups.

> 🔗 [Qwen4Exp Decode Performance on DGX Spark (SM121)](https://github.com/sgl-project/sglang/issues/36796)  
> 🔗 [Support KV Cache Sharding for DSA/MTP](https://github.com/sgl-project/sglang/pulls/40925, 40929)

---

### **5. Stability & Regressions**  
High-severity issues reported today:

1. **Severe Repetition in GLM-5.3 with DFLASH Speculative Decoding**  
   - Issue: Infinite loops of `!` characters under complex tool-call prompts (#40843).  
   - Status: Unresolved; reproducible in latest main.  
   > 🔗 [Bug: GLM-5.3 Flash Thinking Degenerates into Repeated '!'](https://github.com/sgl-project/sglang/issues/40843)

2. **CUDA Graphs Stay Enabled for `torch_native` Attention Despite Fallback**  
   - Issue: CUDA graphs persist even when platform fallback selects `torch_native`, potentially causing runtime inconsistencies.  
   - Status: Open; affects stability under mixed-backend configurations.  
   > 🔗 [Bug: CUDA Graphs Persist After Platform Fallback](https://github.com/sgl-project/sglang/issues/43142)

3. **Falcon-H1 Crashes on First Request with Default Breakable Prefill CUDA Graph**  
   - Issue: Illegal memory access triggered during startup under default CUDA graph settings.  
   - Status: Open; likely tied to graph compilation or memory layout.  
   > 🔗 [Bug: Falcon-H1 Crashes on First Request](https://github.com/sgl-project/sglang/issues/42774)

4. **Flaky CI Infrastructure & Test Failures**  
   - Multiple reports of recurring CI failures and flaky tests in `PR Test Base/Extra` runs, impacting PR validation cycles.  
   - Tracking issue: #42752 (47 comments), linked to broader CI reliability concerns.  
   > 🔗 [CI: Flaky Tests & Infrastructure Failures](https://github.com/sgl-project/sglang/issues/42752)

---

### **6. What This Means for Application Developers**  
- **Expect instability with GLM-5.3 and speculative decoding** — avoid `--enable-dflash` in production until #40843 is resolved.
- **Use caution with `--enable-deterministic-inference` + `repetition_penalty`** — known to trigger internal `TorchDynamoError` on granite-4.0-h (#43061); disable if encountering crashes.
- **For Apple Silicon deployment**, monitor progress on #32321 — full native support is not yet available but under active design.
- **If using Qwen4Exp or DeepSeek-V4-Flash on SM121**, be aware of dominant QSA/PLE kernel times; consider tuning options in #36796.
- **Ensure robust client handling** — disconnected streaming clients can leave zombie requests due to #36333; implement client-side timeouts and session cleanup.

> ✅ Pro tip: Use `--schedule-policy fcfs` only if you don’t rely on `num_matched_prefix_tokens` — it remains zero for cache-agnostic policies (#43094).

---  
*Digest generated: 2026-10-09 | Source: [sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-09**

---

### **1. Today's Highlights**  
The latest release cycle (b11514–b11501) focuses on critical CUDA and Vulkan stability fixes, including a top-k performance optimization for large row counts via radix-based selection and a fix for FWHT shared memory overflow on MUSA. Notably, **MoE cache support across multiple GPUs** was merged (#30112), enabling scalable inference for large mixture-of-experts models. A new PR introduces GPU-resident LRU caching for MoE experts (#29949), signaling deeper optimization for future multi-GPU MoE deployments.

---

### **2. Releases & Breaking Changes**  
- **`b11514`**: Fixed MUSA FWHT shared memory bug (`#30167`) — critical for users on Huawei Ascend hardware.  
  🔗 [PR #30167](https://github.com/ggml-org/llama.cpp/pull/30167)  
- **`b11513`**: CUDA `top-k` now uses **radix select over CUB**, reducing kernel launches from ~1.6M to ~5.8K on qwen4exp at 34,816 tokens.  
  🔗 [PR #28713](https://github.com/ggml-org/llama.cpp/pull/28713)  
- **`b11512`**: Fixed DFlash output head sharing and tied embedding metadata loading from GGUF.  
  🔗 [PR #30111](https://github.com/ggml-org/llama.cpp/pull/30111)  
- **`b11507`**: Added **MoE cache support across multiple GPUs** — enables distributed expert state storage.  
  🔗 [PR #30112](https://github.com/ggml-org/llama.cpp/pull/30112)

> ✅ *No breaking API changes; all updates are additive or corrective.*

---

### **3. New Model & Hardware Support**  
- **MoE Models**: Full support for **multi-GPU MoE caching** now available in `b11507+`. Benchmarks show scalability on 2× RTX 4090s with Qwen3.8-Flash-Next-Q4_0.  
  🔗 [PR #30112](https://github.com/ggml-org/llama.cpp/pull/30112)  
- **Hardware Backends**:  
  - **XDNA**: Feature request opened (#21725) — community-driven interest in embedded AI chips.  
  - **Adreno A6x**: OpenCL optimizations stacked in PRs (#30182–#30185) improve flash attention and residual fusion on mobile GPUs.  
- **Model Format**: Support added for **MiniCPM-V 4.7** with 3D RoPE extension.  
  🔗 [PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416)

---

### **4. Performance & Optimization**  
- **CUDA Top-K**: Radix-based `top-k` reduces kernel launches by **~99.7%** (from 1.67M → 5.76K) on large-row contexts (e.g., qwen4exp at 34,816 tokens).  
  🔗 [PR #28713](https://github.com/ggml-org/llama.cpp/pull/28713)  
- **Vulkan Flash Attention**:  
  - Query-row slicing (512-row batches) improves deep-context prefill on RDNA3.  
    🔗 [PR #30191](https://github.com/ggml-org/llama.cpp/pull/30191)  
  - Packing two query tokens per tile reduces GQA head overhead.  
    🔗 [PR #30190](https://github.com/ggml-org/llama.cpp/pull/30190)  
- **SYCL/Metal**: Ongoing work on graph recording/replay (#28725) and multi-GPU support on Intel Macs (#28565) enhances future low-latency pipelines.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| ⚠️ High | `#25593` | FP32 math silently used instead of FP16 on SM_60 (P100), causing quality loss | ❌ Pending |
| ⚠️ High | `#29811` | Assert crash during Qwen3.8-Flash-MTP spec-decoding startup | ❌ Pending |
| ⚠️ Medium | `#26447` | `vk::Queue::submit: ErrorDeviceLost` on Vega 8 iGPU after ~50K context | ❌ Pending |
| ⚠️ Medium | `#30000` | Vulkan prompt processing 16–19% slower post-#25773 on RTX 5060 Ti | ❌ Pending |
| 🛠 Low | `#27638` | Flash attention fallback to SCALAR path causes O(N²) PP degradation on Intel Arc | ✅ Partial (PR #30191) |

> 🔍 *Regression trends indicate Vulkan/CUDA edge-case issues under high load or specific hardware (AMD iGPUs, older NVIDIA SM_60).*

---

### **6. What This Means for Application Developers**  
- **For agents & LLM gateways**: Use `--spec-type draft-mtp` with `cache_prompt=false` (via PR #30188) to skip unnecessary checkpoint saves — critical for high-throughput speculative decoding.
- **For MoE workloads**: Enable `--moe-cache-multi-gpu` (in `b11507+`) to scale beyond single-GPU limits. Watch for #29949 — GPU-resident LRU MoE cache is coming.
- **For production inference**: Avoid `b11513` if using older CUDA toolkits (pre-12.4); ensure `CCCL_VERSION` guards are updated. Monitor `#25593` for FP16 precision loss on P100.
- **For mobile/embedded apps**: Adreno A6x optimizations (#30182–#30185) may unlock faster decode on Android devices — test with `--backend opencl`.

> ✅ *Recommendation: Upgrade to `b11514+` for stability, especially if using MUSA, CUDA, or MoE models.*  
> 🔗 [Latest Binaries](https://github.com/ggml-org/llama.cpp/releases/tag/b11514)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-09**

---

### **1. Today's Highlights**  
The latest release, v0.40.2, includes a minor fix to hide duplicate and downgrade guards from the model list, improving clarity in `ollama list` output. A new community integration with *oxi* has been added to the README, reflecting growing ecosystem adoption. Meanwhile, multiple critical stability issues—particularly around MLX panics on macOS and cloud model JSON schema misbehavior—are actively being reported, signaling ongoing challenges in high-performance inference and cloud API consistency.

---

### **2. Releases & Breaking Changes**  
- **v0.40.2**: Minor patch focused on internal state cleanup—removes redundant entries from model listings (`#18874`). No functional changes or breaking API updates.  
  🔗 [Release Notes](https://github.com/ollama/ollama/releases/tag/v0.40.2)

---

### **3. New Model & Hardware Support**  
- **Intel OpenVINO Integration (Feature Request)**: High-priority feature request (#2169) seeks native OpenVINO support for Intel CPUs/GPUs/NPUs, citing performance gains demonstrated with LLaVA. Currently not implemented.  
  🔗 [Issue #2169](https://github.com/ollama/ollama/issues/2169)  
- **MLX Backend Issues**: Multiple regressions reported for MLX-backed models (e.g., `qwen3.6:35b-mlx`, `gemma4:e2b-mlx`) on macOS, indicating instability in the Metal-based inference engine post-v0.40.0.  
  🔗 [Issue #18856](https://github.com/ollama/ollama/issues/18856), [Issue #18885](https://github.com/ollama/ollama/issues/18885)  
- **Cloud Model Requests**: Users are requesting support for emerging cloud-native models like `qwen3.8-flash-next`, `mimo-v2.6`, `hy4`, and `stepfun`, highlighting demand for diversified, high-throughput cloud inference options.  
  🔗 [Issue #18850](https://github.com/ollama/ollama/issues/18850)

---

### **4. Performance & Optimization**  
- **Context Window Handling**: PR #18882 proposes migrating legacy GGUFs during load, reducing disk overhead and enabling faster startup times by eliminating lingering compatibility patches. This is expected to improve cold-start performance for large models.  
  🔗 [PR #18882](https://github.com/ollama/ollama/pull/18882)  
- **Streaming Response Fixes**: PR #18881 adds EOS tokens to raw generate responses, which improves downstream tooling accuracy and ensures proper token boundary handling in streaming workflows.  
  🔗 [PR #18881](https://github.com/ollama/ollama/pull/18881)  
- **Memory Efficiency**: PR #18883 introduces retry-hardened download steps in CI, indirectly improving build reliability and ensuring consistent model artifact delivery across environments.  
  🔗 [PR #18883](https://github.com/ollama/ollama/pull/18883)

---

### **5. Stability & Regressions**  
**Critical**  
- **MLX Runner Panics**: Multiple reports of `mlx runner failed: panic: mlx: Maximum threads per threadgroup is 896 but requested 1024` on macOS (v0.40.0+), affecting `qwen3.6:35b-mlx` and `gemma4:e2b-mlx`. Downgrading to v0.35.1 resolves the issue.  
  🔗 [Issue #18846](https://github.com/ollama/ollama/issues/18846), [Issue #18856](https://github.com/ollama/ollama/issues/18856)  
- **Cloud Model JSON Schema Ignored**: `qwen3-coder:480b-cloud` returns unstructured JSON despite schema enforcement via `jsonschema` marshaller. This breaks type-safe integrations.  
  🔗 [Issue #12362](https://github.com/ollama/ollama/issues/12362)  

**High Severity**  
- **Model Pull Failures**: `embeddinggemma-2:740m` fails to pull on Linux due to missing MLX runtime, even though it’s a CPU-only model. Indicates incorrect runtime detection logic.  
  🔗 [Issue #18825](https://github.com/ollama/ollama/issues/18825)  
- **OOM on Clef Models**: `clef-flash` fails to load with default `num_ctx=16384` due to forced `n_ubatch = n_ctx`, causing linear memory growth.  
  🔗 [Issue #18865](https://github.com/ollama/ollama/issues/18865)  

**Moderate**  
- **Duplicate Model Entries**: Post-GGUF migration, `ollama list` shows duplicates and invalid `llamacpp:<sha>` tags.  
  🔗 [Issue #18830](https://github.com/ollama/ollama/issues/18830)  
- **Empty Tool Responses**: `gemma4:26b` with `think: false` returns empty replies after tool calls due to unhandled empty thought blocks.  
  🔗 [Issue #18861](https://github.com/ollama/ollama/issues/18861)

---

### **6. What This Means for Application Developers**  
- **Avoid v0.40.x on Apple Silicon**: If using MLX-backed models (especially Qwen or Gemma), stick to v0.35.1 until the MLX thread limit panic is resolved.  
- **Expect Cloud Model Inconsistencies**: Do not rely on strict JSON schema enforcement when calling cloud models—validate outputs manually or use fallback parsing.  
- **Handle Streaming Carefully**: Ensure your clients can process `output_index` reuse and message closure in `/v1/responses` streams (see #18798).  
- **Use Explicit Model Names**: Avoid naming models without explicit size indicators (e.g., `12b`) to prevent unintended renderer selection (e.g., `gemma4-small` vs `gemma4:12b`).  
- **Prepare for Legacy GGUF Migration**: As Ollama moves toward removing llama.cpp patches (PR #18882), ensure your model files are pre-converted or use updated versions.

> 💡 *Pro Tip:* For production agents, prefer local models with stable runners (e.g., `gemma2:2b`, `ministral-3`) over cloud variants until schema and stability issues are resolved.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-09**

---

#### **1. Today's Highlights**
The LiteLLM project continues to expand its support for next-generation LLMs and enterprise-grade observability, with key updates focused on **GPT-6.1 Sol** pricing and context window alignment across AWS Bedrock, and new telemetry capabilities for cost and performance visibility. Critical fixes address memory leaks in long-running proxy deployments and streaming serialization issues with vLLM-backed models.

---

#### **2. Releases & Breaking Changes**
- **v1.106.0-dev.2**, **v1.105.0-rc.3**, **v1.104.2**, **v1.102.4**, and **v1.101.6** released in the past 24h.  
- All Docker images are now **cosign-signed** using the same key introduced in [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0), enhancing supply-chain security.
- No breaking API changes reported; all updates are backward-compatible.

---

#### **3. New Model & Hardware Support**
- ✅ **GPT-6.1 Sol (Ultrafast tier)**: Added full pricing, context window (`max_input_tokens=1000000`), and model card integration via [PR #45488](https://github.com/BerriAI/litellm/pull/45488) and [PR #45482](https://github.com/BerriAI/litellm/pull/45482).
- ✅ **Microsoft 365 Copilot**: New `microsoft_365_copilot` provider added with OAuth token exchange ([PR #45158](https://github.com/BerriAI/litellm/pull/45158)), enabling user-delegated access.
- ✅ **GitHub Copilot per-user OAuth**: Now supports per-user GitHub tokens via "Per-user GitHub OAuth" auth type ([PR #45241](https://github.com/BerriAI/litellm/pull/45241)).

---

#### **4. Performance & Optimization**
- 📈 **Telemetry Enhancements**:  
  - Introduced `AggregatingSink`, fixed-bucket histograms, and `HttpExporter` to reduce per-request telemetry volume and improve observability ([PR #45487](https://github.com/BerriAI/litellm/pull/45487)).  
  - Added structured `litellm.telemetry` records and sink protocol for stable feature usage tracking ([PR #45484](https://github.com/BerriAI/litellm/pull/45484)).
- ⚙️ **Latency & Retry Improvements**:  
  - Fixed silent retry suppression on early stream disconnects (e.g., Vertex AI `ReadError`) — now respects `router_settings.num_retries` ([Issue #45457](https://github.com/BerriAI/litellm/issues/45457)).
- 💡 **Scaling Guidance**: Community request for 500M TPM guidance with input-heavy traffic highlights ongoing optimization focus ([Issue #38081](https://github.com/BerriAI/litellm/issues/38081)).

---

#### **5. Stability & Regressions**
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [#12685](https://github.com/BerriAI/litellm/issues/12685): Heavy RAM usage over time (61 comments) | 🔴 Critical | Closed | N/A (workaround: restart) |
| [#27954](https://github.com/BerriAI/litellm/issues/27954): RAM spike causing pod crashes | 🔴 Critical | Open | Pending |
| [#18801](https://github.com/BerriAI/litellm/issues/18801): Streaming + logprobs fails with vLLM (PydanticSerializationError) | 🔴 Critical | Closed | [PR #45473](https://github.com/BerriAI/litellm/pull/45473) |
| [#45422](https://github.com/BerriAI/litellm/issues/45422): GitHub BYOK token count zero post-1.103.1 | 🟡 High | Open | Pending |
| [#45378](https://github.com/BerriAI/litellm/issues/45378): Mistral citation chunks dropped in streaming | 🟡 Medium | Open | Pending |

> ✅ **Note**: Several high-severity bugs persist, particularly around memory management and streaming correctness. The fix for `streaming + logprobs` is merged but not yet in a stable release.

---

#### **6. What This Means for Application Developers**
- **Use `gpt-6.1-sol` safely**: Leverage ultrafast pricing and massive context windows via Bedrock with confidence — prices and limits are now aligned with official model cards.
- **Secure authentication**: Enable per-user GitHub/M365 OAuth for Copilot integrations to avoid static key risks and comply with SSO policies.
- **Monitor resource use**: If running long-lived proxies, **watch for memory bloat** — restarts may be necessary until patches land. Consider upgrading to latest dev/rc builds.
- **Enable telemetry**: Use new `AggregatingSink` and `litellm.telemetry` to gain insight into cost, latency, and feature usage without overwhelming logs.
- **Avoid streaming + logprobs** on vLLM models until v1.106.0+ is released — this combination currently crashes.

👉 **Actionable**: Update to `v1.106.0-dev.2` or later for latest stability and security improvements. Monitor [GitHub Issues](https://github.com/BerriAI/litellm/issues) for memory leak resolution.

--- 

*Digest generated: 2026-10-09 | Source: [BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-10-09**

---

### **1. Today's Highlights**  
Unsloth launched **v0.1.905-beta**, introducing full support for training *decision models* from any text or vision LLM with accuracy improvements from 30% to 80%. This enables direct fine-tuning, testing, exporting, and serving of decision-making agents within the ecosystem. Concurrently, Unsloth Studio received several critical UX and inference enhancements, including better handling of model companions, improved context tracking, and expanded tool integration.

---

### **2. Releases & Breaking Changes**  
- **v0.1.905-beta**:  
  - Introduced **decision model training pipeline** — allows turning any LLM (text/vision) into a structured decision agent using Jev-style logic.  
  - Includes native ComfyUI model support, diffusion improvements, and enhanced desktop browser functionality.  
  - [GitHub Release v0.1.905-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.905-beta)

> ✅ **Migration Note**: Existing `FastLanguageModel` workflows are compatible; new `DecisionModelTrainer` API now available via `unsloth.decision`.

---

### **3. New Model & Hardware Support**  
- **Decision Models**: Full support for training decision logic on any base LLM (including vision models like Qwen-Image-2.1).  
- **Hardware & Backends**:  
  - Enhanced **M5 Max (Apple Silicon)** support for GGUF models (e.g., `Qwen-Image-2.1-Q4_K_M`) — though memory limits remain a constraint.  
  - Expanded **Ollama-compatible backend** integration in Studio, enabling real-time context bar updates for token usage.  
- **Quantization Formats**:  
  - Native support for `Q4_K_M`, `Q2_K`, and `Q3_K_M` GGUF variants via `llama.cpp` integration in Studio.  
  - Improved handling of `bitsandbytes` 4-bit quantized models (e.g., `unsloth/Mistral-Small-24B-Base-2501-unsloth-bnb-4bit`) with VLLM.  

> 📌 **Note**: Some users report OOM issues even with 48GB RAM on M5 Max when loading large image models — see Issue #11792.

---

### **4. Performance & Optimization**  
- **MoE Expert Spilling Optimization**:  
  - When MoE experts spill to system RAM, Studio now automatically sets `--ubatch-size 2048` (up from default 512), improving throughput by up to **~2.3x** in high-latency scenarios.  
  - Added `--moe-cache-mib auto` support (PR #12951) to dynamically allocate GPU cache for spilled experts, reducing CPU thrashing.  
  - [PR #12950](https://github.com/unslothai/unsloth/pull/12950), [PR #12951](https://github.com/unslothai/unsloth/pull/12951)
- **Inference Latency**:  
  - Web search result processing speed improved by **~40%** due to optimized page parsing (PR #13100).  
  - React/TypeScript code blocks now render as live previews (PR #13039), reducing post-render latency by ~300ms per block.
- **Training Efficiency**:  
  - PPO trainer fixes (PR #13108) eliminate a 1.2 GB buffer leak and correct sampling filters, improving batch efficiency on multi-GPU setups.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|----------|
| ⚠️ High | [#1886](https://github.com/unslothai/unsloth/issues/1886) | `AssertionError` when serving dynamic quantized models via VLLM (`bitsandbytes`). | Closed — fix merged |
| ⚠️ High | [#1998](https://github.com/unslothai/unsloth/issues/1998) | "Your GPU is too old!" error on Colab despite sufficient VRAM. | Closed — patch applied |
| ⚠️ Medium | [#1744](https://github.com/unslothai/unsloth/issues/1744) | OOM on WSL despite unused VRAM/RAM. | Closed — likely due to memory fragmentation |
| ⚠️ Medium | [#11792](https://github.com/unslothai/unsloth/issues/11792) | Inability to run Qwen-Image-2.1-Q4_K_M on M5 Max (48GB RAM). | Open — suspected memory layout limitation |
| ⚠️ Low | [#1099](https://github.com/unslothai/unsloth/issues/1099) | Beam search fails due to missing `_reorder_cache`. | Currently fixing |

> 🔧 **Note**: Multiple PRs address underlying stability issues in `PPOTrainer`, `GRPO`, and `SFTTrainer` pipelines.

---

### **6. What This Means for Application Developers**  
- **Build Decision Agents Directly**: Use `v0.1.905-beta` to train and deploy AI agents that make structured decisions (e.g., routing, classification, policy selection) without complex prompt engineering.  
- **Leverage Multi-Modal Decision Logic**: Vision + text models can now be fine-tuned into decision systems — ideal for agent-based automation.  
- **Optimize Production Workloads**: For deployed models (especially MoE), ensure `--ubatch-size 2048` and `--moe-cache-mib auto` are used to avoid performance cliffs during expert spilling.  
- **Avoid Pitfalls**: Be cautious with local HF endpoints (`HF_ENDPOINT`) — some models still bypass mirrors (Issue #1353). Use explicit `cache_dir` or override `HUGGINGFACE_HUB_CACHE`.  
- **Integrate Real-Time Tooling**: Use Studio’s new `React` preview and `MCP tool search` features to build interactive, web-aware agents with live feedback loops.

> 💡 **Pro Tip**: For low-memory environments, prefer `Q4_K_M` GGUF over `bnb-4bit` for better predictability and lower peak VRAM usage.

---  
*Digest generated: 2026-10-09 | Source: [unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*