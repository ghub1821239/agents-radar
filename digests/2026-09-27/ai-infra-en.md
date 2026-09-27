# AI Infrastructure Digest 2026-09-27

> Generated: 2026-09-27 00:50 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-27**

---

### **1. Ecosystem Overview**  
The AI inference and serving landscape in late 2026 is characterized by rapid convergence toward high-performance, hardware-aware, and agent-ready platforms. Projects are increasingly focused on enabling low-latency, scalable deployment across diverse backends—NVIDIA Blackwell (sm_121), AMD ROCm gfx950/gfx1201, Apple Silicon MLX, and edge-capable Hexagon. A clear shift toward **speculative decoding maturity**, **distributed KV cache optimization**, and **multi-modal support** is evident, with strong emphasis on stability for production-grade agent workflows. The rise of local-first AI via tools like Ollama and Unsloth underscores growing demand for privacy-preserving, offline-capable systems.

---

### **2. Activity Comparison**

| Project       | Issues Opened (Last 24h) | PRs Merged (Last 24h) | Releases? | Breaking Changes? |
|---------------|----------------------------|--------------------------|-----------|-------------------|
| vLLM          | 8                          | 7                        | No        | No                |
| SGLang        | 5                          | 6                        | No        | No                |
| llama.cpp     | 6                          | 5                        | Yes (b11205–b11202) | Yes (context length revert) |
| Ollama        | 6                          | 5                        | No        | Yes (`typical_p` removal) |
| LiteLLM       | 4                          | 5                        | No        | Yes (usage limits reverted) |
| Unsloth       | 5                          | 4                        | No        | No                |

> ✅ *Note: All projects show active development; only llama.cpp and LiteLLM issued minor releases with backward-incompatible changes.*

---

### **3. Model Support Race**

| New Model / Architecture         | Supported By                     | Key Advancement |
|----------------------------------|----------------------------------|-----------------|
| **MiniCPM-V 4.7**                | vLLM                             | 3D canvas M-RoPE + video placeholder handling |
| **GLM-5.3-Flash-DFlash2**       | vLLM, SGLang                     | Full DFlash speculative decoding compatibility |
| **Qwen4-Exp fp8 indexer**        | SGLang                           | 50% memory reduction via `e4m3` compression |
| **Nemotron 3 Puzzle 75B-A9B**   | llama.cpp                        | CUDA `ssm_scan` with state size 96 — no CPU fallback |
| **K2 Horizon (MoVA)**            | Feature Request (llama.cpp)      | Pending implementation |
| **Ling-3.0 Flash-VL**            | llama.cpp                        | Vision-language model support added |
| **System 1 models (Kev, Laya)**  | Feature Request (Ollama)         | Lightweight reasoning models for real-time agents |

> 🏆 **Leader**: **vLLM** leads in architectural innovation with MoE offloading, DFlash/DSpark integration, and long-sequence optimizations on DGX Spark (GB10).  
> 🚀 **Rising Star**: **llama.cpp** gains traction in cross-platform reach with Hexagon, SYCL, and NVIDIA-specific kernels.

---

### **4. Performance Frontier**

| Optimization Focus             | Leading Projects                  | Key Developments |
|----------------------------------|-----------------------------------|------------------|
| **KV Cache Efficiency**          | vLLM, SGLang                      | Metadata reuse (Mamba/GDN), shared CPU prefix caches, unified decode pools |
| **Speculative Decoding**         | vLLM, SGLang, llama.cpp           | Pipeline-parallel DSpark, sliding-window eviction hooks, MTP support |
| **Quantization & Kernel Speed**  | llama.cpp, Unsloth                  | IQ3_S MMVQ 2.71x speedup, Block-FP8 LoRA training (15x faster), F16 input in FWHT |
| **Distributed Serving**          | vLLM, SGLang                      | PP prefill with KV transfer, tiered offloading, multi-GPU scaling |
| **Memory Management**            | vLLM, SGLang, LiteLLM             | Unified memory decode pools, LMCache leak fixes, Redis batching for cost tracking |

> 🔥 **Most Active Frontier**: **KV cache and speculative decoding efficiency** dominate R&D across vLLM and SGLang.  
> ⚙️ **Hardware-Specific Gains**: Unsloth and llama.cpp lead in kernel-level tuning (Triton, CUDA, Hexagon).

---

### **5. Layer Positioning**

| Project       | Primary Layer                 | Role Summary |
|---------------|-------------------------------|--------------|
| **vLLM**      | Inference Engine              | High-throughput, GPU-optimized engine with advanced speculative decoding and MoE support |
| **SGLang**    | Inference Engine + Gateway    | Flexible, distributed inference with strong multi-GPU and hybrid model support |
| **llama.cpp** | Local Runtime / Edge Engine   | Cross-platform, lightweight runtime ideal for edge devices and low-power inference |
| **Ollama**    | Gateway + Local Runtime       | Developer-friendly interface with tool call focus; strong UX but cloud reliability issues |
| **LiteLLM**   | API Gateway / Routing Layer   | Multi-provider routing, guardrails, cost-aware routing, and security scanning |
| **Unsloth**   | Training/Fine-Tuning + UI     | End-to-end platform for fine-tuning, visualization, and local deployment with rich UI |

> 💡 **Strategic Insight**: vLLM and SGLang are converging into full-stack inference engines. LiteLLM and Ollama serve as abstraction layers atop them. Unsloth is evolving into a **local-first AI studio**.

---

### **6. Trend Signals**

#### **Key Industry Trends Extracted from Today’s Activity:**
1. **Speculative Decoding is Now Production-Ready**  
   → vLLM and SGLang have stabilized DFlash/DSpark pipelines with full PP support and draft model validation. Expect widespread adoption in agent workflows by Q4 2026.

2. **Hardware Diversity Demands First-Class Support**  
   → AMD ROCm, Apple Silicon MLX, and Hexagon are now actively supported or in active development. This signals a move beyond NVIDIA dominance.

3. **Local AI is Becoming Agent-First**  
   → Features like `/v1/systemone`, document viewers, and tool call resilience (Ollama, Unsloth) reflect a shift toward **local, interactive agents** over cloud-only APIs.

4. **Security & Cost Visibility Are Non-Negotiable**  
   → LiteLLM’s prompt injection scanning and cost-aware routing highlight the need for observability and compliance in multi-provider setups.

5. **Model Serving Is Being Replaced by Platform Experience**  
   → Unsloth’s UI enhancements (document rendering, config control) show that developers care more about **workflow experience** than raw inference speed.

#### **What Application Developers Should Watch:**
- ✅ **Adopt vLLM/SGLang for high-throughput, speculative-decoding workloads** — but avoid unstable configurations (e.g., `fp8 + prefix caching` on Qwen3.5).
- ✅ **Use Ollama locally for agent prototyping** — but **avoid Ollama Cloud Pro** due to systemic 95% failure rate.
- ✅ **Leverage LiteLLM for secure, multi-provider routing** — especially if using Claude, Gemini, or Bedrock.
- ✅ **Monitor Unsloth v0.1.816-beta** for document processing and WSL2 inference engine support — critical for Windows-based agent deployment.
- ✅ **Prepare for MoE expert residency controls** (vLLM RFC #57794) and native span pooling (Issue #57826) — upcoming features for retrieval accuracy.

---

> 📌 **Final Takeaway**: The AI infrastructure stack is maturing rapidly — not just in performance, but in **developer experience, security, and agent readiness**. Choose your stack based on **use case layering**:  
> - **Inference Engine**: vLLM or SGLang  
> - **Gateway/Router**: LiteLLM  
> - **Local Agent Studio**: Unsloth  
> - **Developer Interface**: Ollama  

*Data-driven decisions require understanding both the technical frontier and the operational reality.*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-09-27

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its support for next-generation inference architectures, with critical fixes for speculative decoding (DSpark/DFlash) and MoE offloading on AMD ROCm and NVIDIA Blackwell (sm_121). A major focus is stabilizing long-sequence prefill workloads on GB10 (DGX Spark) systems, where memory management and weight loading bottlenecks are being addressed. Key PRs include a fix for GLM-5.3 draft model compatibility and optimizations for Mamba/GDN metadata reuse across KV cache groups.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- **New Model Support**:  
  - ✅ **MiniCPM-V 4.7** added via [PR #58674](https://github.com/vllm-project/vllm/pull/58674), including support for 3D canvas M-RoPE and updated video placeholder handling.  
  - ✅ **GLM-5.3-Flash-DFlash2** draft model now supported under DFlash speculative decoding ([PR #56983](https://github.com/vllm-project/vllm/pull/56983)).  

- **Hardware & Backend Support**:  
  - 🚀 **NVIDIA DGX Spark (GB10, sm_121)**: Critical fixes underway for `aarch64` and unified memory issues ([Issue #36821](https://github.com/vllm-project/vllm/issues/36821), [Issue #56457](https://github.com/vllm-project/vllm/issues/56457)).  
  - 📌 **AMD ROCm (gfx950, gfx1201)**: Continued improvements for MXFP8 MoE and dense linear backends ([Issue #57960](https://github.com/vllm-project/vllm/issues/57960), [Issue #51530](https://github.com/vllm-project/vllm/issues/51530)).  
  - ⚠️ **ROCm Multimodal Models**: Still failing on gfx1201 due to `CUDA error: invalid argument` in `vit_torch_sdpa_wrapper` ([Issue #49851](https://github.com/vllm-project/vllm/issues/49851)).

---

### **4. Performance & Optimization**  
- **KV Cache Efficiency**:  
  - [PR #58762](https://github.com/vllm-project/vllm/pull/58762): Reuse Mamba/GDN metadata across KV cache groups → reduces metadata overhead by up to 30% on Qwen3.6-35B-A3B + DFlash.  
  - [PR #58245](https://github.com/vllm-project/vllm/pull/58245): Enable shared CPU prefix caches across DP replicas → eliminates redundant recomputation during routing.  

- **Weight Loading Speed**:  
  - [Issue #58726](https://github.com/vllm-project/vllm/issues/58726): Per-tensor H2D copies from mmap views cause performance degradation on GB10; mitigation via direct GPU landing expected in future.  

- **Speculative Decoding**:  
  - [PR #56957](https://github.com/vllm-project/vllm/pull/56957): Full pipeline-parallel (PP) support for DSpark with KV transfer → enables disaggregated serving with PP prefill.  
  - [PR #58833](https://github.com/vllm-project/vllm/pull/58833): Fixes image-token mapping in GLM-5.3 MTP initialization → unblocks spec-decoding workflows.

---

### **5. Stability & Regressions**  
- **Critical Bugs (High Severity)**:  
  - 🔥 **V1 Engine Deadlock** under concurrent load with fp8 + prefix caching + Qwen3.5 ([Issue #37729](https://github.com/vllm-project/vllm/issues/37729), 36 comments) — no fix PR yet.  
  - 🔥 **Qwen4Exp QSA Indexer OOM** on GB10 unified memory during long prefill ([Issue #56457](https://github.com/vllm-project/vllm/issues/56457)) — persistent device hang due to per-chunk logits buffer growth.  
  - 🔥 **V1 Thinking Budget Corruption** under speculative decoding → breaks multi-token reasoning_end_str parsing ([Issue #58485](https://github.com/vllm-project/vllm/issues/58485)).  

- **Other Notable Issues**:  
  - [Issue #58804](https://github.com/vllm-project/vllm/issues/58804): Tiered offloading behavior misreported in metrics.  
  - [Issue #58597](https://github.com/vllm-project/vllm/issues/58597): MFU/MBU overestimates bandwidth due to linear attention misclassification.

---

### **6. What This Means for Application Developers**  
- **Use Case Guidance**:  
  - Avoid `vllm serve` with Qwen3.5 + fp8 + prefix caching on high-concurrency workloads until [Issue #37729](https://github.com/vllm-project/vllm/issues/37729) is resolved.  
  - For long-context inference on GB10 (DGX Spark), expect memory pressure; consider reducing `max_seq_len` or using tiered offloading with caution.  

- **Best Practices**:  
  - Use **speculative decoding (DSpark/DFlash)** only with tested draft models (e.g., GLM-5.3-Flash-DFlash2) — avoid unsupported combinations.  
  - Leverage **shared CPU prefix caches** ([PR #58245](https://github.com/vllm-project/vllm/pull/58245)) in distributed deployments to reduce latency.  
  - Monitor **tool call streaming behavior** — known issue with `{`-starting assistant content being dropped ([Issue #58824](https://github.com/vllm-project/vllm/issues/58824)).  

- **Future-Proofing**:  
  - Prepare for **MoE expert residency control** via RFCs like [#57794](https://github.com/vllm-project/vllm/issues/57794) — early adoption will enable smarter UVA offload decisions.  
  - Watch for **native span pooling** ([Issue #57826](https://github.com/vllm-project/vllm/issues/57826)) to improve retrieval accuracy in chunked document pipelines.  

> 💡 **Action Item**: If deploying on AMD ROCm or NVIDIA sm_121, validate model loading paths with recent nightly builds (`vllm/vllm-openai:latest`) and monitor [Issue #57960](https://github.com/vllm-project/vllm/issues/57960) for MXFP8 support.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-27**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with key stability improvements in speculative decoding and multi-GPU scaling, particularly around DeepSeek-V4.1 and Kimi-K3 deployments on AMD (MI350X) and NVIDIA Blackwell (RTX PRO 6000) hardware. Critical fixes were merged for LMCache memory leaks and hybrid Mamba state management, while new PRs advance support for unified memory decode pools and improved multimodal token accounting.

---

### **2. Releases & Breaking Changes**  
*None.* No new releases or breaking API/config changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1 on AMD gfx950 (MI350X)**: PR [#41308](https://github.com/sgl-project/sglang/pull/41308) enables full inference support via DSPARK and DCP backends on ROCm, marking a major milestone for AMD GPU users.  
- ✅ **Qwen4-Exp fp8 indexer cache**: PR [#39614](https://github.com/sgl-project/sglang/pull/39614) introduces optional `e4m3` storage for compressed QSA indexers, reducing memory footprint by up to 50% for large models.  
- ✅ **Apple Silicon MLX**: PRs [#40046](https://github.com/sgl-project/sglang/pull/40046) and [#40044](https://github.com/sgl-project/sglang/pull/40044) improve cache accounting and session cleanup for MLX-based inference on Apple Silicon.

---

### **4. Performance & Optimization**  
- 🔥 **Unified Memory Decode Pools**: PR [#39478](https://github.com/sgl-project/sglang/pull/39478) enables dynamic redistribution between full and sliding-window KV caches under unified memory, improving memory utilization by ~25% in high-concurrency workloads.  
- 🚀 **Sparse Prefill Workspace Optimization**: PR [#41378](https://github.com/sgl-project/sglang/pull/41378) ensures parity between real-model and tiny-model test coverage at page, chunk, and cached-prefix boundaries—critical for accurate latency profiling.  
- ⚙️ **Improved Speculative Decoding Efficiency**: PRs like [#41377](https://github.com/sgl-project/sglang/pull/41377) and [#41325](https://github.com/sgl-project/sglang/pull/41325) enhance extensibility of speculative batch padding and sliding-window eviction hooks, enabling faster retraction handling and lower overhead.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| Critical | [#41372](https://github.com/sgl-project/sglang/issues/41372) | `Req.decoded_text` is never written → scheduler fallback fails silently | Open |
| High | [#41076](https://github.com/sgl-project/sglang/issues/41076) | Unbounded `SparsePrefillWorkspace` allocation → OOM crash on DeepSeek-V4.1 + DSPARK | Open |
| High | [#40949](https://github.com/sgl-project/sglang/issues/40949) | LMCache MP mode + EAGLE3 → pool memory leak → OOM after load-back hit | Open |
| Medium | [#32569](https://github.com/sgl-project/sglang/issues/32569) | Kimi-K3 DSPARK crashes with `TypeError: 'NoneType' object is not callable` in `top_k_renorm_prob` | Closed (PR pending) |
| Medium | [#36889](https://github.com/sgl-project/sglang/issues/36889) | Mamba state cache caps concurrency silently on hybrid-KDA models (e.g., GLM-5.3-Flash) | Open |

> 💡 *Note:* Several high-severity issues are tied to speculative decoding paths and memory management under high concurrency—critical for production gateways.

---

### **6. What This Means for Application Developers**  
- **Production Deployments**: Use `--enable-lmcache` with caution on multi-GPU setups; avoid `page_size > 1` with EAGLE3 until [#40949] is resolved.  
- **Multi-modal Apps**: Ensure `image_tokens` are correctly propagated through `meta_info` → `usage.prompt_tokens_details` via updated tests in [#41379](https://github.com/sgl-project/sglang/pull/41379).  
- **Hardware Portability**: With AMD and MLX support now active, developers can target diverse inference backends without rewriting model-serving logic—use `--moe-runner-backend triton` explicitly on ROCm to avoid silent failures ([#41377](https://github.com/sgl-project/sglang/pull/41377)).  
- **Speculative Decoding Caution**: Avoid `--speculative-algorithm DSPARK` on large hybrid models (e.g., Kimi-K3, GLM-5.3) if using high concurrency or long prompts—expect potential OOMs until [#41076] is patched.

> 📌 *Pro Tip:* Monitor `queue_time` behavior during retraction-heavy workloads—PR [#41380](https://github.com/sgl-project/sglang/pull/41380) corrects timing misreporting in PD-decode pipelines.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-27**

---

### **1. Today's Highlights**  
The latest updates focus on expanding hardware support for NVIDIA’s Nemotron 3 Puzzle (state size 96) and improving CUDA kernel efficiency with F16 input support in FWHT. Critical fixes address Windows wake_fd warnings and a regression in context length handling, while new PRs advance backend modularity—particularly for SYCL and Hexagon. These changes reinforce llama.cpp’s growing role as a cross-platform inference engine.

---

### **2. Releases & Breaking Changes**  
- **b11205**: Added support for **Nemotron 3 Puzzle’s state size 96** in `ssm_scan` via CUDA (#28717). This avoids CPU fallback and enables full GPU offloading.  
  🔗 [PR #28717](https://github.com/ggml-org/llama.cpp/pull/28717)  
- **b11201**: Reverted recent change to auto-fitting max context length due to instability (#29437).  
  🔗 [PR #29437](https://github.com/ggml-org/llama.cpp/pull/29437)  
- **b11202**: Fixed `wake_fd` warning on Windows in server module.  
  🔗 [PR #29479](https://github.com/ggml-org/llama.cpp/pull/29479)

> ⚠️ **Migration Note**: Users relying on dynamic context length auto-fitting should expect reverted behavior until the underlying issue is resolved.

---

### **3. New Model & Hardware Support**  
- ✅ **Nemotron 3 Puzzle 75B-A9B (BF16)**: Full CUDA support added for `ssm_scan` with state size 96.  
  🔗 [HF Model](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-BF16)  
- ✅ **K2 Horizon (0.9B–36B MoVA)**: Feature request opened for support (#29424), pending implementation.  
  🔗 [Issue #29424](https://github.com/ggml-org/llama.cpp/issues/29424)  
- ✅ **Hexagon HTP**: Added support for `ADD`, `SUB`, `ARGSORT`, `TOP_K`, and chunked operations; includes ODR fix and sampler integration.  
  🔗 [PR #29502](https://github.com/ggml-org/llama.cpp/pull/29502)  
- ✅ **Qwen3.8-Flash-Next MTP**: Enabled faster MTP decoding via shared modules and improved memory layout.  
  🔗 [PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243)  
- ✅ **Ling-3.0 Flash-VL**: Added vision-language model support with dedicated parser and template handling.  
  🔗 [PR #29151](https://github.com/ggml-org/llama.cpp/pull/29151)

---

### **4. Performance & Optimization**  
- **CUDA FWHT**: Now supports **F16 input directly**, eliminating conversion overhead.  
  🔗 [PR #29096](https://github.com/ggml-org/llama.cpp/pull/29096)  
- **IQ3_S MMVQ**: Speedup of **2.71x** (978µs → 361µs) on Qwen3.8-27B IQ3_S-heavy GGUF using multi-column path.  
  🔗 [PR #29500](https://github.com/ggml-org/llama.cpp/pull/29500)  
- **OpenCL A8x Kernel**: Refined loading conditions to support broader A8 series GPUs beyond X2.  
  🔗 [PR #29503](https://github.com/ggml-org/llama.cpp/pull/29503)  
- **BF16/FP16 → FP32 Chunking**: Optional chunking reduces VRAM usage during conversion without sacrificing performance.  
  🔗 [PR #29442](https://github.com/ggml-org/llama.cpp/pull/29442)  
- **Tiled MulMat for k-quants**: Introduces tiled int8 unpacking (256×256 tiles) on CPU, enabling efficient quantized matrix multiplication.  
  🔗 [PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851)

---

### **5. Stability & Regressions**  
- 🟡 **Critical Regression**: Speculative decoding (`draft-mtp`) produces **divergent output on quantized models** (e.g., Q4_K_M) vs. BF16 — reported by 27 users.  
  🔗 [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618)  
- 🟡 **GPU Driver Crash**: Dual Intel Arc Pro B70 crashes under SYCL with DFlash2 draft model due to **TDR timeout**.  
  🔗 [Issue #28778](https://github.com/ggml-org/llama.cpp/issues/28778)  
- 🟥 **Silent Corruption**: ROCm backend silently truncates context on Qwen3.5-27B (Gated DeltaNet) — oldest tokens lost.  
  🔗 [Issue #27556](https://github.com/ggml-org/llama.cpp/issues/27556)  
- 🟥 **Memory Leak / OOM Crash**: Invalid JSON schema (e.g., `minItems > maxItems`) causes fatal OOM crash in `llama-server`.  
  🔗 [PR #29497](https://github.com/ggml-org/llama.cpp/pull/29497)  
- 🟡 **Vulkan Out-of-Memory**: `vk::Device::allocateMemory` failure on Apple M1 with small models.  
  🔗 [Issue #29270](https://github.com/ggml-org/llama.cpp/issues/29270)

> ✅ **Fixes in Progress**: Several PRs address SYCL, Vulkan, and memory management issues. No active fixes yet for speculative decoding or ROCm corruption.

---

### **6. What This Means for Application Developers**  
- **Deploying on Intel Arc?** Avoid `-cb` batching for now — it keeps GPU pinned at high power. Use `--no-cb` or monitor thermal behavior.  
- **Using speculative decoding?** Avoid `draft-mtp` with quantized targets (Q4_K_M, etc.) until #25618 is resolved — results may diverge from baseline.  
- **Targeting ARM/Hexagon?** The new Hexagon backend support enables low-power inference on edge devices (e.g., Qualcomm SoCs). Test with `Q3_K`, `Q5_K`, and `MXFP4` quants.  
- **Optimizing GPU Memory?** Enable `GGML_CUDA_CUBLAS_CONVERT_CHUNK_SIZE` to reduce VRAM during BF16/FP16 → FP32 conversion.  
- **Building Multi-Backend Apps?** Consider PR #29506 to allow independent compilation of SYCL and ROCm backends—critical for mixed-hardware deployments.

> 💡 **Pro Tip**: For best performance on large models like Qwen3.8-Flash-Next, use MTP + shared modules (via PR #28243) and ensure your build includes `--split-mode tensor` for optimal layer distribution across GPUs.

---  
*Digest generated: 2026-09-27 | Source: [ggml-org/llama.cpp GitHub](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-27**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with a strong focus on **tool call robustness**, particularly for Gemma4, Qwen3.8, and GLM-4.7, as multiple parser-level fixes were merged to handle malformed or edge-case inputs (e.g., `</tool_call>` in arguments, trailing noise). Meanwhile, **UX improvements** are gaining traction—new PRs enable narrower desktop windows, always-on-top mode, and tray icon behavior enhancements. A critical issue affecting **Ollama Cloud Pro users** persists with a reported 95% failure rate across cloud models, raising concerns about service reliability.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases were published in the last 24 hours.  

However, a notable regression was reported:  
- **Issue #18542**: `typical_p` is no longer supported, breaking existing clients (e.g., SillyTavern) that rely on its presence. This change likely stems from an upstream API adjustment but lacks deprecation notice. [GitHub Issue #18542](https://github.com/ollama/ollama/issues/18542)

---

### **3. New Model & Hardware Support**  
- **Feature Request #18594**: Proposal to support "System 1" models like **Kev** and **Laya**, which represent a new class of lightweight, fast reasoning models optimized for real-time agent workflows. [GitHub Issue #18594](https://github.com/ollama/ollama/issues/18594)  
- **Feature Request #18669**: Suggests enabling **shared model weights for concurrent MLX inference on Apple Silicon**, which could unlock high-throughput local inference on M-series chips. [GitHub Issue #18669](https://github.com/ollama/ollama/issues/18669)  
- **PR #18606**: Adds a new `/v1/systemone` endpoint for structured decision-making using local Nimble and Tev models, expanding Ollama’s agentic capabilities. [GitHub PR #18606](https://github.com/ollama/ollama/pull/18606)

---

### **4. Performance & Optimization**  
- **PR #18664**: Fixes Gemma4 tool call parsing by recovering valid tool calls even when followed by non-JSON noise — improving resilience without sacrificing correctness.  
- **PR #18663**: Preserves leading/trailing newlines in GLM string arguments and avoids premature termination at `</tool_call>`, reducing silent data loss.  
- **PR #18651**: MLX version bump to align with latest optimizations and hardware support, potentially improving performance on Apple Silicon. [GitHub PR #18651](https://github.com/ollama/ollama/pull/18651)  
- **PR #17480**: Benchmarks now use **HumanEval patch prompts**, improving realism for speculative draft model evaluation. [GitHub PR #17480](https://github.com/ollama/ollama/pull/17480)

---

### **5. Stability & Regressions**  
- **Critical (High Severity)**:  
  - **Issue #15453**: Ollama Cloud Pro users report **95% failure rate across all cloud models**, rendering the service unusable despite stable network and correct configuration. This is a systemic issue impacting paid-tier customers. [GitHub Issue #15453](https://github.com/ollama/ollama/issues/15453)  
- **High Severity**:  
  - **Issue #17778**: `qwen3.8:cloud` returns `500` error: *“no user query found in messages”* during streaming, even with valid input. Likely tied to message formatting or state handling. [GitHub Issue #17778](https://github.com/ollama/ollama/issues/17778)  
  - **Issue #18659 / #18658**: GLM-4.7 parser strips newlines and prematurely terminates tool calls on `</tool_call>` — silently dropping valid tool outputs. Fixes merged via PR #18663.  
- **Medium Severity**:  
  - **Issue #18632**: `think: "high"` / `"max"` values in `qwen3.8` silently default to `medium` instead of `xhigh`, contradicting documented behavior. [GitHub Issue #18632](https://github.com/ollama/ollama/issues/18632)  
  - **Issue #18390 / #18354**: Gemma4 parser drops tool calls with spaces in object keys or string placeholder collisions. Fixed via PR #18664.  

> ✅ **Fixes merged**: PR #18664 (Gemma4), PR #18663 (GLM), PR #18651 (MLX), PR #18660 (Windows build).

---

### **6. What This Means for Application Developers**  
- **Tool Call Reliability**: Be cautious with `gemma4`, `qwen3.8`, and `glm-4.7` tool calls — especially those containing special characters (`</tool_call>`, spaces in keys, newlines). Use client-side validation and fallback logic until patches propagate.  
- **Cloud Dependencies**: Avoid relying on Ollama Cloud Pro for production workflows due to the widespread 95% failure rate. Consider local deployment or migration to alternative providers.  
- **Desktop UX**: New PRs (#18661, #18662, #18668) will soon improve the desktop app experience — expect more compact, always-on-top window behavior and better tray interaction.  
- **API Design**: The removal of `typical_p` breaks backward compatibility — update integrations immediately. Watch for future deprecation warnings.  
- **Agent Integration**: With new `/v1/systemone` and Docker SBX support (PR #18425), Ollama is increasingly positioned as a core backend for **local-first coding agents** and **sandboxed AI workflows**.  

> 🔗 **Key Links**:  
> - [Ollama Cloud Pro Issue #15453](https://github.com/ollama/ollama/issues/15453)  
> - [Gemma4 Tool Call Fix #18664](https://github.com/ollama/ollama/pull/18664)  
> - [GLM-4.7 Parser Fix #18663](https://github.com/ollama/ollama/pull/18663)  
> - [System 1 Models Request #18594](https://github.com/ollama/ollama/issues/18594)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-27**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to strengthen its guardrail and routing capabilities, with critical fixes for prompt injection scanning across multiple endpoints (including `/v1/responses`, `/v1/messages`, and attachments) and improvements to cost-aware routing and batch handling. Notably, PRs #43350 and #43383 expand security coverage to include image and file inputs in Bedrock and Gemini, while #43232 introduces opt-in prompt-cache cost routing to improve budget accuracy.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, **PR #43385** reverted key usage limits introduced in `rc/1.104.0` (top-N key cap, daily global spend rollup), restoring full visibility into long-tail key spending — a significant change affecting dashboard behavior and compliance reporting. [GitHub PR #43385](https://github.com/BerriAI/litellm/pull/43385)

---

### **3. New Model & Hardware Support**  
*No new models or hardware backends added today.*  
However, **PR #43390** explicitly pins `fireworks_ai/minimax-m3` as **vision-capable** based on live call validation, correcting prior misclassification (`supports_vision: false`). This enables accurate vision request routing and cost tracking. [GitHub PR #43390](https://github.com/BerriAI/litellm/pull/43390)

---

### **4. Performance & Optimization**  
Significant performance refinements focused on **spend accounting efficiency**:
- **PR #43369**: Reduces Redis round trips by batching spend counter operations across admission and post-call phases, cutting redundant MGETs and INCRBYFLOAT calls.
- **PR #43367**: Implements pipelined reservation increments and batched cache reads per request, minimizing latency spikes under load.
- **PR #43232**: Introduces `cache_aware_routing` to factor in prompt cache savings during auto-router decisions, improving cost-efficiency without sacrificing model capability.

These changes collectively reduce per-request Redis overhead by ~50% in high-throughput scenarios.

---

### **5. Stability & Regressions**  
Critical stability issues reported today:

1. **Gemini tool schema loss** ([#43325](https://github.com/BerriAI/litellm/issues/43325)): Constraints like `enum`, `pattern`, `minLength`, and `maximum` are dropped when using `"type": ["string", "null"]`. *Fix PR pending.*
2. **Anthropic message-level `cache_control` lost** ([#43324](https://github.com/BerriAI/litellm/issues/43324)): When `content` is a list (e.g., multi-part messages), `cache_control` is silently ignored — breaking caching semantics for complex prompts.
3. **Responses API stream corruption** ([#43316](https://github.com/BerriAI/litellm/issues/43316)): A narrated tool call appears as two separate choices (text + function_call), causing clients to lose structured tool output — especially impactful for agent frameworks.
4. **Anthropic reasoning text duplication** ([#43010](https://github.com/BerriAI/litellm/issues/43010)): Streaming `/v1/responses` requests double the thinking text in `reasoning.encrypted_content`.

All four issues are actively being addressed via related PRs (e.g., #43383, #43380, #43369).

---

### **6. What This Means for Application Developers**  
- **Security**: Enable `detect_prompt_injection` across all endpoints — recent PRs (#43350, #43383) now scan images, files, and tool outputs. Ensure your guardrails are updated to avoid blind spots.
- **Cost Accuracy**: Use `cache_aware_routing` (via PR #43232) to prevent overestimating costs when prompt caches are warm — crucial for large-scale agent systems.
- **Reliability**: Avoid using `content: []` in Anthropic messages if you rely on `cache_control`. Similarly, be cautious with tool calls in `/v1/responses` streams — expect potential client-side parsing errors due to split responses.
- **Compliance & Observability**: The revert of top-N key caps in #43385 means full key-level spend visibility is restored — useful for auditing but may increase dashboard load; consider indexing strategies accordingly.

> 💡 **Pro Tip**: If using Claude Code or Fable agents, verify that your `/v1/messages` and `/v1/responses` integrations pass through the latest fix PRs to avoid context truncation, duplicated thinking, or missing tool calls.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-27**

---

### **1. Today's Highlights**  
Unsloth continues its rapid evolution toward a unified, high-performance AI development platform with major UI/UX refinements and deeper hardware-aware optimizations. Key highlights include the introduction of **document viewers for PDF/Word/Excel/PPT**, **per-model llama.cpp INI configuration**, and **GPU memory allocation visibility in the UI**, addressing long-standing user pain points around model loading and resource control.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes were published in the last 24 hours.*  
However, several PRs signal imminent updates:  
- **PR #12001** adds native document rendering (PDF, DOCX, XLSX, PPTX) with origin tracking in Library — expected to be included in v0.1.816-beta.  
- **PR #12016** restructures the sidebar into customizable sections with drag-to-reorder support — likely part of the same release cycle.  
- **PR #12030** reworks Appearance settings with new color themes and simplified UX; impacts UI consistency across platforms.

> 🔗 [PR #12001: Document Viewer](https://github.com/unslothai/unsloth/pull/12001) | [PR #12016: Custom Sidebar](https://github.com/unslothai/unsloth/pull/12016)

---

### **3. New Model & Hardware Support**  
- **Qwen-Image-2.1-GGUF**: Active issues persist on AMD/Windows due to `fp8:text_encoder` 404 errors (`#11638`) and missing `general.architecture` field causing it to be hidden in the On Device tab (`#11827`).  
- **Qwen3.5 GatedDeltaNet**: Context parallelism and FSDP2 sharding are not yet supported (`#12051`).  
- **Chinese Model Mirrors**: A feature request proposes adding support for `modelscope.cn`, `hf-mirror.com`, and `opencsg.com` (`#12041`) — critical for users in regulated regions.  
- **vLLM/SGLang on Windows via WSL2**: Experimental support now in progress (`#12024`), enabling advanced inference engines on Windows without direct GPU access.

> 🔗 [Issue #12041: Chinese Model Mirrors](https://github.com/unslothai/unsloth/issues/12041) | [PR #12024: vLLM/SGLang on WSL2](https://github.com/unslothai/unsloth/pull/12024)

---

### **4. Performance & Optimization**  
- **Block-FP8 LoRA Training Speedup**: Up to **15x faster** on L4 GPUs and **8.9x faster** on RTX PRO 6000 by running FP8 linears eagerly and optimizing Triton kernels (`#12027`).  
- **nvidia-smi Caching**: Backend now coalesces `nvidia-smi` calls, reducing poll latency from **~100s to sub-second** on multi-GPU systems (`#11995`).  
- **VAE Decode Optimization**: SDXL VAE now decodes in `fp16` on `fp16` GPUs, avoiding costly `force_upcast` to `fp32` — cutting decode time by ~2.2s per image on T4 (`#12036`).  
- **Llama 3.2 Vision Fix**: Disables flash attention on MllamaVision due to missing `is_causal` attribute — prevents crashes during vision processing (`#12033`).

> 🔗 [PR #12027: Block-FP8 LoRA Speedup](https://github.com/unslothai/unsloth/pull/12027) | [PR #11995: nvidia-smi Caching](https://github.com/unslothai/unsloth/pull/11995) | [PR #12036: SDXL VAE fp16 Decode](https://github.com/unslothai/unsloth/pull/12036)

---

### **5. Stability & Regressions**  
High-severity issues reported today:  
- **UI Lag in Large Codeblocks** (`#10769`): Desktop app lags severely when rendering large code outputs — affects usability in agent workflows.  
- **Tool Calls Hang Indefinitely** (`#12048`): Tool executions stall past `max_tool_call_duration` (e.g., 5 min), consuming resources and blocking flows.  
- **Model Export Fails Due to Read-Only HF Cache** (`#11785`): Post-fine-tuning GGUF export fails when merging LoRA models due to permission conflicts in Hugging Face cache.  
- **Stop Button Gives No Feedback** (`#11975`): Users click “Stop” multiple times thinking it’s unresponsive — poor UX during long-running tasks like image generation.  

> 🔗 [Issue #10769: UI Lag in Codeblocks](https://github.com/unslothai/unsloth/issues/10769) | [Issue #12048: Tool Call Hangs](https://github.com/unslothai/unsloth/issues/12048) | [Issue #11785: Read-Only Cache Export Fail](https://github.com/unslothai/unsloth/issues/11785) | [Issue #11975: Stop Button Feedback](https://github.com/unslothai/unsloth/issues/11975)

---

### **6. What This Means for Application Developers**  
- **Build robust agents with predictable resource use**: Use `--tensor-split` via the new GPU picker (`#12015`) to explicitly control model shard distribution across cards. Avoid surprises in multi-GPU setups.  
- **Leverage fine-grained config control**: With per-model `llama.cpp` INI support (`#10783`), you can override Studio defaults for custom tuning (e.g., `mlock`, `num_ctx`, `flash_attn`) without interference.  
- **Avoid export failures**: When exporting fine-tuned models, ensure your HF cache is writable or use a local clone. Consider pre-cleaning the cache before merging LoRA.  
- **Prepare for upcoming UI improvements**: The new document viewer and customizable sidebar (`#12001`, `#12016`) will enhance agent output presentation — ideal for RAG and research workflows.  

> ✅ **Pro Tip**: Monitor `#12024` for WSL2-based inference engine support if deploying on Windows. It enables vLLM/SGLang usage with full GPU offload, crucial for low-latency production deployments.

---  
*Digest generated: 2026-09-27 | Source: GitHub @ unslothai/unsloth*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*