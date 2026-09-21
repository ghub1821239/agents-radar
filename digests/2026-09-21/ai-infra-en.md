# AI Infrastructure Digest 2026-09-21

> Generated: 2026-09-21 00:28 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-21**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q3 2026 is characterized by rapid specialization and convergence at the edge of performance, scalability, and developer experience. Projects are increasingly diverging along architectural lines: high-throughput engines (vLLM, SGLang) focus on distributed serving and kernel-level optimizations; lightweight runtimes (llama.cpp, Unsloth) prioritize portability and low-latency local execution; while gateways (Ollama, LiteLLM) emphasize usability, tooling, and cost visibility. A clear trend toward *stateful agent workloads* is driving demand for fine-grained cache control, multi-model routing, and recovery resilience—evident in new `KvHints`, weight cache daemons, and session-aware routing.

---

### **2. Activity Comparison**

| Project       | Open Issues | Open PRs | Recent Release? | Status Notes |
|---------------|-------------|----------|------------------|--------------|
| **vLLM**      | 48          | 72       | No (v0.28.1rc1) | High stability risk; critical bugs in GLM-5.3-Flash and speculative decoding |
| **SGLang**    | 61          | 89       | No               | Heavy engineering focus; 319 coredump reports indicate runtime instability |
| **llama.cpp** | 54          | 68       | Yes (b11065+)   | Active CUDA/ROCm tuning; MoE streaming support enables edge deployment |
| **Ollama**    | 76          | 41       | No               | Focus on hardware compatibility; Vulkan/MLX stability fixes ongoing |
| **LiteLLM**   | 82          | 57       | Yes (v1.103.0-rc.1)| Security hardening via cosign; budget tracking remains a major concern |
| **Unsloth**   | 49          | 34       | No (v0.1.811-beta)| Critical GGUF throughput regression; Windows sandboxing in progress |

> 🔍 *Insight:* SGLang and LiteLLM lead in engineering velocity (PR volume), but vLLM and Ollama face higher stability pressure due to open severity-1 issues.

---

### **3. Model Support Race**

| New Model / Architecture         | Supported By                          | Key Differentiator |
|----------------------------------|----------------------------------------|--------------------|
| **DeepSeek-V4.1**                | vLLM, SGLang                           | vLLM leads with ROCm-specific fusion (mHC + all-reduce); SGLang adds Dynamo routing |
| **MiniMax-M3**                   | vLLM (ROCm context-parallel sparse indexing) | Only project with opt-in TP>1 support on gfx950 |
| **Qwen3.8-MoE (UD-Q6_K)**        | llama.cpp (`--load-mode streaming`)   | Enables 96K context on 24GB VRAM — unmatched for edge use |
| **GLM-5.3-Flash**                | vLLM, SGLang, Ollama                    | All three have degeneration bugs; vLLM has best KV cache control via `KvHints` |
| **Kimi-K3**                      | SGLang (native Dynamo routing)         | First project to enable token-level cache forwarding |
| **Snapdragon X Elite NPU**       | Ollama (feature request)               | Only project actively pursuing ARM-native acceleration |
| **RTX 5070 Ti (sm_120)**         | Unsloth (issue reported)               | Performance gap vs official llama.cpp highlights ecosystem fragmentation |

> 🏆 **Winner:** **llama.cpp** leads in *practical model accessibility* (MoE streaming, GPU portability), while **vLLM** dominates in *high-end optimized inference* for top-tier models.

---

### **4. Performance Frontier**

| Optimization Focus             | Leading Projects                        | Key Advances |
|-------------------------------|-----------------------------------------|--------------|
| **KV Cache Management**       | vLLM (KvHintsEnvelope), SGLang (HiCache) | vLLM’s typed `KvHints` enables agent-state control; SGLang optimizes staged write-back |
| **Distributed Serving**       | SGLang (DCP, PD disaggregation)         | Progress on Decoding Context Parallelism; weight cache daemon reduces reload time from 327s → <1s |
| **Quantization & Memory**     | vLLM, llama.cpp                         | vLLM adds FP8 KV checks; llama.cpp enables streaming MoE loading |
| **Kernel Fusion & Launches**  | vLLM, SGLang                            | vLLM fuses mHC coefficients + normalization; SGLang overlaps KDA and metadata |
| **Local Runtime Efficiency**  | llama.cpp, Unsloth                      | llama.cpp tuned FlashAttention for Gemma 4; Unsloth fixing GPU memory spillover |

> ⚙️ **Trend:** The frontier is shifting from pure speed to *predictable, recoverable, state-aware inference*. Engine-level resilience (recovery, caching, serialization) is now as critical as raw FLOPs.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Role Summary |
|---------------|-------------------------------|--------------|
| **vLLM**      | Inference Engine              | High-throughput, multi-GPU, multi-model engine; targets cloud-scale LLM serving |
| **SGLang**    | Distributed Inference Engine  | Specialized for large models (e.g., Qwen3-235B); focuses on fast recovery and distributed execution |
| **llama.cpp** | Local Runtime / Embedded      | Cross-platform, CPU/GPU/NPU inference; ideal for edge, mobile, and local dev |
| **Ollama**    | LLM Gateway / CLI Tool        | Developer-friendly interface with model management and API exposure; bridges local and cloud |
| **LiteLLM**   | LLM Gateway / Orchestration   | Unified API layer for cost tracking, guardrails, and multi-provider routing |
| **Unsloth**   | Agent-Focused Desktop Runtime | Hybrid client-engine with security sandboxing; emphasizes user workflow integration |

> 💡 **Positioning Insight:**  
> - **vLLM/SGLang**: Core inference layer for production clusters  
> - **llama.cpp/Ollama**: Local-first, developer-centric runtime  
> - **LiteLLM/Unsloth**: Application-layer enablers for agents and tools

---

### **6. Trend Signals**

#### 🔮 **Emergent Industry Trends (from 2026-09-21 activity):**
1. **Agent-Centric Infrastructure**  
   - `KvHints` (vLLM), `HiCache`, and `stream-idle-timeout` (SGLang) signal that *stateful reasoning* is no longer an afterthought—it's driving core engine design.
2. **Recovery & Resilience as a Feature**  
   - SGLang’s weight cache daemon reducing load time from ~327s to <1s is a paradigm shift: restart latency is now a key SLA metric.
3. **Hardware Fragmentation & Portability Gaps**  
   - RTX 5070 Ti underperforming in Unsloth, Snapdragon X Elite not fully utilized in Ollama—highlight growing challenges in cross-architecture optimization.
4. **Security-First Deployment**  
   - LiteLLM’s cosign-signed images and Unsloth’s MXC ProcessContainer show that *trusted execution* is becoming mandatory, especially for managed or enterprise workflows.
5. **Quantization ≠ Always Faster**  
   - FP8 KV cache broken on Hopper (vLLM), GLM-5.3-Flash degenerates under quantization (SGLang/Ollama)—underscoring that quantization must be validated per model/hardware combo.

#### ✅ **What Application Developers Should Watch:**
- **Avoid `torch.compile` with certain MoE models** (vLLM Issue #56900) until upstream fixes land.
- **Do not rely on `fp8` KV cache on Hopper** until vLLM resolves Issue #57713.
- **Use `KvHints` (vLLM) or `HiCache` (SGLang)** for long-context agent systems requiring custom cache policies.
- **Pin to `v0.1.809-beta` in Unsloth** if using GGUF models—latest beta has a severe throughput regression.
- **Validate spend logging in LiteLLM** before deploying with virtual keys or model aliases—current billing logic has known gaps.

> 📌 **Bottom Line:** The era of "just run it" is over. Today’s infrastructure demands *architectural awareness*, *hardware validation*, and *resilience-by-design*—especially for agentic and production-grade applications.

---  
*Generated: 2026-09-21 | For technical decision-makers in AI infrastructure and agent development*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-21**

---

### **1. Today's Highlights**  
The vLLM project continues to advance multi-model and multi-architecture support, with new ROCm-specific optimizations for DeepSeek-V4.1 and MiniMax-M3 models. Critical stability fixes were merged for speculative decoding (PR #56734) and KV cache management (PRs #57775–#57777), addressing long-standing corruption and finalization issues in Model Runner V2. Meanwhile, a major new feature—first-class `KvHints` request envelope (PR #53423)—is now available for programmatic KV management.

---

### **2. Releases & Breaking Changes**  
*None*  
No new releases or breaking API/config changes were reported in the last 24 hours. The latest stable version remains `v0.28.1rc1`.

---

### **3. New Model & Hardware Support**  
- **ROCm Support**: New context-parallel sparse indexing for **MiniMax-M3** (PR #57832, #57840) on gfx950 with fp8 index caching and TP>1 support (opt-in).  
- **DeepSeek-V4.1 Optimizations**: Fuse decode metadata + final norm (PR #57756), overlap mHC coefficients (PR #57603), and fuse TP all-reduce with mHC input prep (PR #57643) — all targeting ROCm and NVIDIA platforms.  
- **Intel GPU (XPU)**: Added `VLLM_BATCH_INVARIANT=1` support for MoE models (PR #55881), enabling deterministic reduction behavior on Intel Arc GPUs.  
- **Quantization**: FP8 KV cache support is now explicitly checked for Hopper (PR #57713); however, GLM-5.3-Flash currently lacks FP8 KV cache dtype support on Hopper (Issue #57713).

---

### **4. Performance & Optimization**  
- **Speculative Decoding**: PR #56734 prevents KV-cache corruption during dummy draft steps under data parallelism, improving reliability without performance cost.  
- **MoE & Attention Fusion**: Multiple PRs (e.g., #57603, #57643) reduce kernel launches by fusing mHC coefficient generation, all-reduce, and normalization — critical for high-throughput inference on large models.  
- **KV Management**: PR #53423 introduces `KvHintsEnvelope`, enabling fine-grained control over KV cache placement and eviction via a typed, orchestrator-agnostic interface — key for agent systems with stateful reasoning.  
- **Memory Efficiency**: PR #57775–#57777 fix deferred save handling in `KVConnector`, reducing memory leaks and ensuring consistent cleanup across steps.

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - Issue #57719: `prompt_embeds` + penalties trigger device-side `scatter gather kernel index out of bounds` assertion (H100, Blackwell). *Fix pending*.  
  - Issue #57713: GLM-5.3-Flash fails to support `fp8` KV cache on Hopper despite hardware capability. *Workaround: avoid `--kv-cache-dtype fp8` until resolved.*  
- **Degeneration Bugs**:  
  - Issue #56605: GLM-5.3-Flash produces "word salad" in multi-turn agentic use. *High priority; impacts agent reliability*.  
  - Issue #56868: Long-decode degeneration after accumulated reasoning in quantized GLM-5.3-Flash. *Reproduced on B300 with W4A16 quantization*.  
- **CUDA IMA/Xid 31**: Issue #55279 reports engine crash after ~11k decode steps under sampling load using DFlash2 on sm_80 (H100). *Likely driver-level or memory leak issue*.  
- **Fixed**: PR #56734 resolves speculative decode KV corruption (high severity). PR #57775–#57777 address finalization race conditions.

---

### **6. What This Means for Application Developers**  
- **Agents & Reasoning Apps**: Use `KvHints` (PR #53423) to implement custom cache policies for stateful agents. Avoid `prompt_embeds` with penalties if using `torch.compile` (Issue #57719).  
- **Multi-Model Workloads**: Be cautious with `GLM-5.3-Flash` in long-context or multi-turn settings due to degeneration bugs (Issues #56605, #56868). Consider disabling `fp8` KV cache on Hopper until #57713 is fixed.  
- **Hardware-Specific Tuning**: For ROCm users, enable context-parallel sparse indexing (opt-in) for MiniMax-M3 and DeepSeek-V4.1 to improve throughput. On Intel GPUs, ensure `VLLM_BATCH_INVARIANT=1` is set for consistent MoE behavior.  
- **Stability Precautions**: Avoid `torch.compile` with Qwen1.5-MoE-A2.7B-Chat (Issue #56900) until upstream fix lands. Monitor for Xid 31 crashes under heavy decode loads (Issue #55279).

🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | 🔗 [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **SGLang Digest — 2026-09-21**

#### **1. Today's Highlights**  
The SGLang project continues to advance high-performance inference infrastructure with major progress in **engine recovery**, **distributed serving**, and **multi-model support**. Key developments include the stabilization of weight cache daemons for fast engine restarts (Qwen3-235B FP8: load time reduced from ~327s to <1s), and active work on **Decoding Context Parallelism (DCP)** and **PD disaggregation**. New PRs also enable native Dynamo support for Kimi-K3 and improve routing resilience via idle stream timeouts.

#### **2. Releases & Breaking Changes**  
None reported in the past 24 hours. No new versions or breaking API/config changes were released.

#### **3. New Model & Hardware Support**  
- ✅ **Kimi-K3**: Native Dynamo integration now enabled via `sgl-router` (#40390, #40391), allowing token-level cache routing and input forwarding.
- ✅ **SenseNova-U1/U1.5**: Tracking issue opened for feature and performance alignment with official repo (#37742).
- ✅ **AMD ROCm Support**: GLM-5.2 decode path fixes for MI355X (gfx950) including MXFP4 expert handling and launch geometry corrections (#40189).
- ✅ **InstantTensor Loader**: Added as an optional high-performance Safetensors loader (`--load-format instanttensor`) for distributed, pipelined weight loading (#40453).

#### **4. Performance & Optimization**  
- 🚀 **Weight Cache Daemon (Fast Engine Recovery)**: Phase 1 launched in #27139; per-rank daemon serves post-quantized weights via CUDA IPC, reducing Qwen3-235B FP8 weight load from **~306–327s to <1s** ([blog](https://www.lmsys.org/blog/2026-08-21-sglang-quick-recovery)).  
- ⚙️ **Kernel & Memory Optimizations**:  
  - Fused KDA projections and prefill metadata for GLM-5.3-Flash, overlapping key preparation and reducing synchronization (#39688).  
  - Reduced KPool planning sync and overlapped indexer prep (#39695).  
  - Optimized MoE runner tuning logic to avoid inflated shapes under EP (#40417).  
- 🔍 **Multi-Modal & Diffusion**:  
  - Fused rounded SwiGLU for quantized MiniMax-H3 MLPs to eliminate redundant kernels (#40378).  
  - Honor `--vae-slicing` in native pipelines (e.g., Qwen-Image 2.1) to reduce memory pressure (#40493).

#### **5. Stability & Regressions**  
⚠️ **Critical Crashes & Bugs (High Severity):**  
1. **CUDA Illegal Memory Access** in QSA extend forward at 8 concurrent requests (H20 TP8, Qwen3.8-Flash-Next-FP8) — crash persists despite `CUDA_LAUNCH_BLOCKING=1` workaround (#37633). *Root cause unconfirmed.*  
2. **CUDA Core Dump Tracker** (#26340): 319 comments from auto-collected coredumps during CI runs; ongoing investigation into GPU runtime instability across multiple test jobs.  
3. **Weight Load Crash** in `humming` quantization: `BlockQuantScaleParameter` missing `format_ue8m0` attribute on DeepSeek/GLM MLA checkpoints (#40393).  
4. **HiCache Staged Write-back Fault**: 128 KiB batch path passes registered host VAs to `cudaMemcpyBatchAsync` where `CanUseHostPointerForRegisteredMem == 0`, causing faults (#40232).  

🔧 **Other Notable Issues:**  
- `--ple-offload-embedding` unreachable when PLE table exceeds VRAM (embedding materialized before offload) (#39841).  
- `fp8_mqa_logits` OOM during long-context prefill on GLM-5.3-Flash, killing all TP ranks (#37712).  
- EAGLE spec-decode corrupts MoE dispatch due to zero `num_token_non_padded` in draft batches (#40156).

#### **6. What This Means for Application Developers**  
- **Faster Restart & Recovery**: Use `--weight-cache-daemon` (enabled by default in recent builds) to achieve near-instant engine reloads — critical for production LLM gateways and agent systems requiring uptime.  
- **Routing Resilience**: New `--stream-idle-timeout-secs` (default 180s) prevents resource leaks from idle SSE streams; use in conjunction with session-aware and cache-aware admission policies (#40366, #40271).  
- **Model Flexibility**: Leverage `--load-format instanttensor` for faster, distributed model loading; expect improved startup times for large models like Qwen3-235B.  
- **Avoid Pitfalls**: Avoid `--quantization humming` on DeepSeek/GLM MLA models until #40393 is patched. Be cautious with `--ple-offload-embedding` on large embeddings. Monitor H20 deployments for QSA-related crashes until #37633 is resolved.  

👉 [View Issue #26340 – CUDA Coredump Tracker](https://github.com/sgl-project/sglang/issues/26340)  
👉 [View PR #40390 – Enable Kimi-K3 in sgl-router](https://github.com/sgl-project/sglang/pull/40390)  
👉 [View PR #40453 – Add InstantTensor Loader Support](https://github.com/sgl-project/sglang/pull/40453)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-21**

---

### **1. Today's Highlights**  
The latest updates focus on performance tuning for **Gemma 4** on modern NVIDIA GPUs (Ampere+), with targeted CUDA FlashAttention optimizations and improved Metal support for Apple Silicon. Key progress includes enabling **sparse FlashAttention for Qwen4**, enhancing multi-GPU scalability via `--load-mode streaming` for MoE models, and removing legacy SYCL emulation layers to improve reliability.

---

### **2. Releases & Breaking Changes**  
- **b11065**: CUDA FlashAttention tuned for Gemma 4 on Ampere or newer architectures; improves small-model prompt processing latency. [PR #29152](https://github.com/ggml-org/llama.cpp/pull/29152)  
- **b11062**: Enabled sparse FA for Qwen4 (`--enable-sparse-fa`). [PR #28770](https://github.com/ggml-org/llama.cpp/pull/28770)  
- **b11060**: Fixed Mamba time-step projection contiguity issue. [PR #28832](https://github.com/ggml-org/llama.cpp/pull/28832)  
- **b11059**: Added F16 input support to Metal FWHT kernel, eliminating unnecessary conversion overhead. [PR #29094](https://github.com/ggml-org/llama.cpp/pull/29094)

> ✅ *No breaking API changes reported today.*

---

### **3. New Model & Hardware Support**  
- **Qwen3.8-MoE (UD-Q6_K)**: Streaming expert loading now supported via `--load-mode streaming` + `--gpu-pill`, enabling 85GB+ models to run on 24GB VRAM systems. [PR #29191](https://github.com/ggml-org/llama.cpp/pull/29191)  
- **Intel Xe-LPG Plus/Xe2/Xe3**: Vulkan backend gains flash attention optimization kernels. [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406)  
- **Apple Metal (macOS 27 SDK)**: Removed deprecated `MTLDevice.location` and `MTLGPUFamilyCommon{1,2,3}` calls. [PR #29136](https://github.com/ggml-org/llama.cpp/pull/29136)  
- **SYCL**: Legacy dpct layer removed; native out-of-order queues with `sycl::event` dependencies now used. [PR #29190](https://github.com/ggml-org/llama.cpp/pull/29190)  

> 📌 *XDNA backend remains requested but not implemented (Issue #21725)*

---

### **4. Performance & Optimization**  
- **Gemma 4 Prompt Processing**: CUDA FA tuned for head sizes 256/512 and batch sizes 1–4; favors larger CUDA blocks and MMA kernels for batch size 1. Improves throughput by ~5–10% on small models. [PR #29152](https://github.com/ggml-org/llama.cpp/pull/29152)  
- **Qwen3.8 MoE**: Streaming experts reduce memory pressure — model loads in chunks without full GPU VRAM allocation. Enables up to 96K context windows on 24GB cards. [PR #29191](https://github.com/ggml-org/llama.cpp/pull/29191)  
- **Metal FWHT**: F16 input avoids costly F32 conversion; reduces bandwidth usage and latency in quantized models. [PR #29094](https://github.com/ggml-org/llama.cpp/pull/29094)  
- **SYCL**: Removal of dpct layer reduces runtime overhead and simplifies error paths. [PR #29190](https://github.com/ggml-org/llama.cpp/pull/29190)  
- **Mamba**: Time-step projection now handles non-contiguous inputs efficiently. [PR #28832](https://github.com/ggml-org/llama.cpp/pull/28832)

---

### **5. Stability & Regressions**  
- **Critical**: `qwen35 / qwen35moe` MoE models leak recurrent state across requests on HIP/ROCm when reusing server slots. Results in earlier prompts being emitted verbatim. [Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092) *(No fix PR yet)*  
- **High Severity**: System prompt leakage between clients/slots in llama-server. Affects multi-user inference environments. [Issue #27422](https://github.com/ggml-org/llama.cpp/issues/27422) *(No fix PR yet)*  
- **Medium**: Invalid UTF-8 sequences cause HTTP 500 errors in PEG chat parser (e.g., OCR outputs). [Issue #27543](https://github.com/ggml-org/llama.cpp/issues/27543) *(Fix merged in #29161)*  
- **Low**: Model loads to dGPU VRAM but inference runs on iGPU due to KV-cache compression offloading. [Issue #29164](https://github.com/ggml-org/llama.cpp/issues/29164) *(No fix PR yet)*

---

### **6. What This Means for Application Developers**  
- **Use `--load-mode streaming` + `--gpu-pill`** to serve large MoE models (e.g., Qwen3.8) on constrained hardware — ideal for cloud inference or edge deployments.  
- **Upgrade to b11065+** for faster Gemma 4 inference on Ampere+ GPUs, especially with small batch sizes.  
- **Avoid `--ngl > 1` with Qwen3.6-35B-A3B-Q8_0** until the concurrent garbled output bug is resolved (reported in #26031).  
- **Expect stability improvements** from recent Metal and SYCL cleanup — particularly if targeting Apple Silicon or Intel Arc GPUs.  
- **Monitor for state leakage in MoE models** on HIP/ROCm and hybrid systems until fixes land.  
- **Consider `--cache-disk`** (requested in #20697) for long-context workloads — still pending, but highly anticipated.

> 🔗 *Track development: [GitHub repo](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-21**

---

### **1. Today's Highlights**  
The Ollama project continues to prioritize hardware compatibility and inference correctness, with multiple critical PRs addressing Vulkan crashes on AMD GPUs (#18557), memory bloat on MLX (Mac M1 Pro) via #18556, and JSON output corruption in structured responses (#18441). Notably, a fix was merged to separate thinking content from response output in `/api/generate` (#18561), resolving a long-standing issue affecting tooling workflows.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. However, ongoing work includes deprecation of `typical_p` parameter handling—now being *warned instead of rejected* in API requests to maintain backward compatibility (#18551).

---

### **3. New Model & Hardware Support**  
- **Snapdragon X Elite NPU/GPU**: Active feature request (#5360) for ARM-based Windows devices; users report full NPU not utilized despite support in upstream llama.cpp.
- **Prism Ternary GGUFs (PQ2_0/PTQ1_0)**: Import fails due to unsupported tensor size overflow (#18521); architecture is supported but quantization type not yet handled.
- **Vulkan Backend**: Now properly exposed in Docker via #18562, fixing GPU capability misconfiguration that previously prevented Vulkan use on NVIDIA systems.

---

### **4. Performance & Optimization**  
- **MLX Memory Management**: A new PR introduces configurable prefix-cache paged-out memory budget (#18556), critical for preventing macOS system freeze during sustained inference on 16GB M1 Pro Macs.
- **Kernel Optimization**: The `mlx: add prefill-shaped gated delta kernel` PR (#18550) aims to improve prompt processing efficiency for large models like Qwen3.8-27B by avoiding fallback to unrolled graphs.
- **Scheduler Robustness**: Fix for NaN/Inf values when GPU probe data is missing (#18552), improving stability across diverse hardware configurations.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Related PR(s) |
|--------|------|--------|---------------|
| 🔴 High | **Vulkan Access Violation (0xc0000005)** on AMD RX 6800 XT | Open | #18557 |
| 🔴 High | **Memory Leak in Python Client** (`ollama.Client`) | Closed | #18558 |
| 🟡 Medium | **Gemma4:e4b Vision Model Returns Blank Images** | Closed | #18560 |
| 🟡 Medium | **Tool Call Handling Breaks in Ollama vs. llama.cpp** | Open | #18509 |
| 🟡 Medium | **`think:true` leaks reasoning into `response` in `/api/generate`** | Closed | #18554 |
| 🟡 Medium | **Silent truncation of chat history & embeddings** | Open | #14259 |

> ✅ **Fixes merged**:  
> - #18554: Separates `thinking` and `response` fields in non-streaming generate calls.  
> - #18556: Adds config for MLX prefix-cache memory budget.  
> - #18562: Exposes `graphics` capability in Docker for Vulkan/NVIDIA.  
> - #18561: Ensures `thinking` content remains isolated from output.

---

### **6. What This Means for Application Developers**  
- **Tooling & Agents**: Be cautious with `tool` role usage—Ollama may reject or misclassify tool outputs differently than `llama.cpp`. Use `/api/chat` with `format` for more predictable behavior.
- **Structured Output**: Avoid relying on raw JSON responses from `thinking=true` in `/api/generate`; expect potential leading `.` characters on MLX backend (#18441).
- **Memory & Deployment**: On Apple Silicon (MLX), configure prefix cache limits explicitly to prevent system freezes (#18556). Monitor RAM usage in Python clients—known leak observed (#18558).
- **Hardware Awareness**: If deploying on Snapdragon X Elite or AMD Vulkan GPUs, expect limited or no acceleration until #5360 and #18557 are resolved.
- **API Compatibility**: Clients sending `typical_p=1.0` (e.g., SillyTavern) will now receive warnings instead of 400 errors (#18551)—safe to upgrade without breaking changes.

> 🔗 [GitHub Issues](https://github.com/ollama/ollama/issues) | [PRs](https://github.com/ollama/ollama/pulls)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest – 2026-09-21

---

### **Today's Highlights**  
LiteLLM v1.103.0-rc.1 introduces enhanced security via cosign-signed Docker images, with a strong focus on resolving critical budget tracking and tokenization issues. Key fixes include accurate spend logging for streamed requests (PR #42176), proper handling of mid-conversation `system` messages in Gemini (PR #42126), and improved guardrail behavior for PII masking (PR #42133). These updates significantly improve reliability in production agent deployments.

---

### **Releases & Breaking Changes**  
- **v1.103.0-rc.1** is now available with verified Docker image signatures using [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). All releases are signed with the same key since commit `0112e53`.  
  🔗 [Verify Docker Image Signature](https://docs.sigstore.dev/cosign/overview/)  
- No breaking API changes reported in this release cycle.

---

### **New Model & Hardware Support**  
- **DeepSeek V4 reasoning_effort** (`high`/`max`) now properly passed through to API via `reasoning_effort` parameter (tracked in #27439).  
  🔗 [Issue #27439](https://github.com/BerriAI/litellm/issues/27439)  
- **OpenRouter TTS support** now works for `openrouter/google/gemini-3.1-flash-tts-preview` after fixing provider mapping (PR #42111).  
  🔗 [Issue #42111](https://github.com/BerriAI/litellm/issues/42111)  
- **Vertex AI mREP (multi-region endpoint)** support added via feature request #23766 — relevant for global-scale deployments.

---

### **Performance & Optimization**  
- **Rust-based tokenizer refactoring** underway: PR #42174 replaces Python tokenizer dependencies with Rust, improving performance and reducing duplication.  
  🔗 [PR #42174](https://github.com/BerriAI/litellm/pull/42174)  
- **Token counter backend split** into modular crates (PR #42165) enables future optimizations and better maintainability across backends (tiktoken, Hugging Face, fast).  
  🔗 [PR #42165](https://github.com/BerriAI/litellm/pull/42165)  
- **Streamed cost accounting fix**: Prevents zero-cost logging when model aliases are used (PR #42176). Critical for accurate billing in high-throughput systems.  
  🔗 [PR #42176](https://github.com/BerriAI/litellm/pull/42176)

---

### **Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Notes |
|------|----------|--------|--------|-------|
| `BudgetExceededError` with stale spend despite valid usage (#27735) | High | Open | ❌ | Affects team-scoped virtual keys; related to #27639. |
| Mid-conversation `system` messages break Gemini prompt caching (#42104) | High | Open | ✅ [PR #42126](https://github.com/BerriAI/litellm/pull/42126) | Fixed: keeps system messages inline instead of hoisting. |
| Streaming requests costed as 0 when model is an alias (#42161) | High | Open | ✅ [PR #42176](https://github.com/BerriAI/litellm/pull/42176) | Resolved: preserves routed model for spend logging. |
| Presidio PII unmasking fails inside `tool_calls.arguments` (#31950) | Medium | Open | ❌ | Raw placeholders remain visible in tool args. |
| Guardrails can’t block MCP tools via Anthropic `/v1/messages` (#40583) | Medium | Open | ❌ | Pre-call guardrails miss MCP tool definitions. |

> ⚠️ **Critical Stability Note**: Several high-severity bugs impact budget enforcement, prompt caching, and data privacy—especially relevant for multi-agent systems and regulated environments.

---

### **What This Means for Application Developers**  
- **Use v1.103.0-rc.1 with caution** — it includes security hardening via signed images but contains unresolved budget and guardrail issues. Validate spending logic before production rollout.  
- **Ensure consistent model routing** by avoiding alias-only model names in streaming workloads — use real model IDs or verify spend logs via `routed_model`.  
- **Leverage new guardrail improvements** like `presidio.output_parse_pii` with overlapping span resolution (PR #42133) to avoid data leakage in PII-sensitive apps.  
- **Expect better performance** from upcoming Rust-based tokenizers and modular counters — ideal for large-scale inference pipelines and cost analytics.  
- **Monitor OpenRouter pricing sync** — recent price updates (PRs #42178, #42175, #42169) may affect cost calculations if you rely on pre-2026-09-20 values.

🔧 *Recommendation*: Upgrade only after testing in staging, especially if using virtual keys, streaming, or agent memory persistence.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-21**

#### **1. Today's Highlights**  
A critical regression in GGUF inference throughput following the `v0.1.810-beta` update has been reported by multiple users, indicating a performance degradation on local models despite unchanged hardware and settings. Concurrently, significant progress is underway in Windows security sandboxing with the integration of Microsoft’s MXC ProcessContainer in PR #11357 and #11390, enhancing isolation for Python and terminal tools.

#### **2. Releases & Breaking Changes**  
None. No new releases were published in the last 24 hours. The latest stable version remains `v0.1.811-beta`, with ongoing beta testing focused on stability and feature refinement.

#### **3. New Model & Hardware Support**  
- **RTX 5070 Ti (sm_120 / Blackwell)**: A performance discrepancy was reported where Unsloth’s bundled `llama.cpp` build (CUDA 13.4) runs ~5–6x slower than the official `ggml-org` CUDA 12 build, highlighting potential kernel or compilation inefficiencies for newer architectures. [Issue #11349](https://github.com/unslothai/unsloth/issues/11349)  
- **ARM64 Linux**: A long-standing gap persists; no native aarch64 build exists for Unsloth Desktop despite successful porting of the core app. [Issue #10332](https://github.com/unslothai/unsloth/issues/10332)  
- **SDXL Fine-tunes**: Community-supported SDXL fine-tunes (single-file GGUF/safetensors) are now under active consideration for direct loading via the Images page. [Feature Request #11391](https://github.com/unslothai/unsloth/issues/11391)

#### **4. Performance & Optimization**  
- **GGUF Inference Throughput Regression**: Users report significantly slower inference after updating to `v0.1.810-beta`, with no change in model, hardware, or configuration. This suggests a backend or loader-level regression in the latest release. [Issue #11221](https://github.com/unslothai/unsloth/issues/11221)  
- **GPU Memory Management Fix**: On Windows, a fix was landed to prevent `cudaMalloc` from silently spilling into system RAM beyond VRAM limits, which previously masked memory pressure. [PR #11368](https://github.com/unslothai/unsloth/pull/11368)  
- **Tokenization Overhead**: Long lines with backslashes cause seconds-long rendering delays due to inefficiency in Marked’s inline tokenizer. [Issue #11376](https://github.com/unslothai/unsloth/issues/11376)

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Link |
|---------|------|--------|------|
| High | GGUF inference throughput regression post-v0.1.810-beta | Open | [Issue #11221](https://github.com/unslothai/unsloth/issues/11221) |
| High | Tool call parsing failure: MCP image data output as raw text (1.5M chars), crashing generation | Open | [Issue #11358](https://github.com/unslothai/unsloth/issues/11358) |
| Medium | API key copy fails in Firefox/Brave (Linux) | Open | [Issue #11387](https://github.com/unslothai/unsloth/issues/11387) |
| Medium | Studio fails to start when binding to `0.0.0.0` in WSL | Open | [Issue #11187](https://github.com/unslothai/unsloth/issues/11187) |
| Low | File extension list in RAG is hardcoded and non-configurable | Open | [Issue #11385](https://github.com/unslothai/unsloth/issues/11385) |

> ✅ *Fixes in progress:*  
> - PR #11367 resolves the MCP image parsing bug by failing closed on invalid JSON envelopes.  
> - PR #11375 corrects a link reference probe mismatch that caused broken links in Markdown-heavy replies.

#### **6. What This Means for Application Developers**  
- **Avoid v0.1.810-beta** if using local GGUF inference—expect degraded throughput. Pin to `v0.1.809-beta` or earlier until regression is resolved.  
- **Windows deployments** should monitor GPU memory behavior closely: unsanctioned host-RAM spills can mask real OOM conditions. Use `--api-max-concurrency` and queue policies (`wait`/`reject`) to manage load safely. [PR #5482](https://github.com/unslothai/unsloth/pull/5482)  
- **Build robust tool integrations**: Be cautious with file formats passed to tools—many common types (`.zip`, `.parquet`, `.heic`, `.m2ts`) are currently rejected unless handled by a fallback Python tool. [PR #11379](https://github.com/unslothai/unsloth/pull/11379)  
- **Security-first design**: With upcoming MXC sandboxing (PR #11357), future versions will enforce stricter isolation—design agents accordingly, especially for remote or managed accounts.  

> 🔒 *Pro tip*: For private/local provider URLs in managed accounts, await admin toggle support ([Issue #11382](https://github.com/unslothai/unsloth/issues/11382)) before deploying sensitive workflows.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*