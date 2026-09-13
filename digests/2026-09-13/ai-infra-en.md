# AI Infrastructure Digest 2026-09-13

> Generated: 2026-09-13 00:16 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-13**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *high specialization and hardware convergence*, with deepening focus on next-generation GPU architectures (SM120/Blackwell, SM90/H20, AMD MI355X/gfx1201) and model families (DeepSeek-V4.1, Qwen3.5/Gemmas). While vLLM and SGLang lead in low-level kernel optimization and speculative decoding robustness, LiteLLM and Ollama are maturing as critical gateways for multi-provider interoperability and agent workflows. Unsloth and llama.cpp continue to push boundaries in local inference efficiency and fine-tuning agility. A clear trend toward **hardware-aware inference**, **structured output reliability**, and **cross-platform stability** dominates the current landscape.

---

### **2. Activity Comparison**

| Project       | Issues Open (Today) | PRs Merged (Today) | Releases (Last 24h) | Status |
|---------------|---------------------|--------------------|---------------------|--------|
| **vLLM**      | 8                   | 7                  | None                | Active development, high engineering velocity |
| **SGLang**    | 6                   | 5                  | None                | Focused on Blackwell & ROCm stability |
| **llama.cpp** | 5                   | 4                  | `b10934`, `b10933`  | Frequent minor releases; rapid patching |
| **Ollama**    | 10                  | 4                  | None                | High regression volume; stability focus |
| **LiteLLM**   | 4                   | 4                  | None                | Strategic updates (pricing, security) |
| **Unsloth**   | 7                   | 5                  | None                | Critical fixes prioritized post-Docker breakage |

> ✅ *vLLM and Unsloth show the highest engineering throughput; Ollama and SGLang face more instability-related activity.*

---

### **3. Model Support Race**

| Model / Architecture             | vLLM         | SGLang       | llama.cpp     | Ollama        | LiteLLM           | Unsloth          |
|----------------------------------|--------------|--------------|---------------|---------------|-------------------|------------------|
| **DeepSeek-V4.1-Flash**         | ✅ Full       | ✅ Partial    | ❌ Experimental | ⚠️ Beta         | ✅ Added (PR #40919)| ⚠️ Requested (#10838) |
| **Qwen3.5 Hybrid GDN**          | ✅ Supported  | ✅ Supported  | ⚠️ Performance issue | ⚠️ Speculative decode loss | ✅ Supported | ✅ Supported |
| **Gemma 4 Multimodal (GGUF)**   | ❌            | ❌            | ❌            | ✅ Unified vision support | ❌ | ❌ |
| **AMD MI355X / gfx1201**        | ✅ ROCm opt.  | ✅ gfx950+    | ✅ GCN HIP config | ⚠️ Strix Halo bleed | ❌ | ✅ ROCm Docker image |
| **Blackwell (sm_120/sm_121)**   | ✅ H20/GB10   | ✅ VibeCUDA MSA | ✅ cuBLAS fallback | ❌ RTX 5090 hangs | ❌ | ❌ |
| **EXL3 Quantization Backend**   | ❌            | ❌            | ❌            | ❌            | ❌               | ✅ Experimental (PR #7115) |

> 🏆 **Winner: vLLM** – Most comprehensive support across new models and hardware, especially in Flash/MoE and ROCm/CUDA convergence.  
> 🥈 **Runner-up: SGLang** – Strongest Blackwell integration and emerging ROCm coverage.  
> 🥉 **Emerging: Unsloth** – Rapid expansion into ROCm and EXL3, positioning for future quantization leadership.

---

### **4. Performance Frontier**

| Focus Area                     | Leading Projects                              | Key Developments |
|-------------------------------|-----------------------------------------------|------------------|
| **KV Cache Efficiency**       | vLLM, SGLang                                  | MoE routing fixes (vLLM), unified cache validation (SGLang), sparse indexing (vLLM) |
| **Batching & Parallelism**    | vLLM                                          | Batch-invariant fixes under sequence parallelism, async TP stabilization |
| **Speculative Decoding**      | vLLM, SGLang                                  | DFlash2 warmup migration (vLLM), draft reuse & rejection fixes (SGLang) |
| **Quantization & Memory**     | llama.cpp, Unsloth                            | FP8 correctness (SGLang), IQ3_S MMQ (Vulkan), EXL3 backend (Unsloth) |
| **Kernel-Level Optimization** | vLLM, SGLang                                  | DeepSelect TopK (vLLM), fused FP8 KV prep (SGLang), mHC fusion (vLLM) |
| **Distributed Serving**       | vLLM                                          | Low-SM reduce-scatter (SM100/103), PCP+DCP sharding (ROCm) |

> 🔥 *vLLM remains the performance benchmark in kernel optimization and distributed inference.*  
> 💡 *SGLang leads in enabling new backends (VibeCUDA MSA) and reducing speculative overhead.*

---

### **5. Layer Positioning**

| Project       | Primary Layer                        | Core Differentiation |
|---------------|--------------------------------------|------------------------|
| **vLLM**      | Inference Engine (GPU-native)        | Highest throughput, kernel-optimized, supports SM120/H20, MoE, DFlash2 |
| **SGLang**    | Inference Engine + Runtime           | Deep integration with FlashInfer/VibeCUDA, strong speculation & memory pooling |
| **llama.cpp** | Local Runtime (CPU/GPU hybrid)       | Lightweight, cross-platform, excellent for edge/local agents, tool calling support |
| **Ollama**    | LLM Gateway + Agent Platform         | Unified CLI/UI, multimodal support, agent lifecycle management |
| **LiteLLM**   | LLM Gateway + Proxy                  | Multi-provider abstraction, cost tracking, MCP security, OpenAI-compatible proxy |
| **Unsloth**   | Fine-Tuning + Training Framework     | Fast LoRA training, GPU memory optimization, Docker Studio integration |

> 📊 **Layer Map**:  
> - **Engine Level**: vLLM, SGLang  
> - **Runtime Level**: llama.cpp  
> - **Gateway/Proxy**: LiteLLM, Ollama  
> - **Training/Fine-Tuning**: Unsloth

---

### **6. Trend Signals**

#### **Key Industry Trends Extracted:**
1. **Hardware Specialization is Now Mandatory**  
   — Projects are no longer "one-size-fits-all." vLLM, SGLang, and Unsloth now explicitly target SM120 (Blackwell), SM90 (H20), and AMD gfx1201. Developers must choose based on their GPU stack.

2. **Structured Output Reliability is Non-Negotiable**  
   — Multiple regressions in JSON schema parsing (Ollama, llama.cpp), deterministic failures (vLLM), and silent draft rejections (SGLang) highlight that agentic systems cannot tolerate silent errors. Expect stricter validation and schema-first design.

3. **Speculative Decoding is Becoming Production-Ready (But Fragile)**  
   — DFlash2 is being actively optimized in vLLM and SGLang, but performance degradation at 185k context (llama.cpp) and silent rejection (SGLang) indicate it’s still unstable at scale. Use cautiously.

4. **Quantization and Memory Management Are Critical for Deployment**  
   — FP8 correctness bugs (SGLang), CUDA graph crashes (llama.cpp), and OOMs on Jetson/ROCm (Ollama) underscore that quantization isn’t just about size—it’s about correctness and stability.

5. **Open Source Gateways Are Becoming Security-Critical**  
   — LiteLLM’s admission control (PR #40923) and Ollama’s Windows uninstaller fix signal growing maturity in enterprise-grade deployment hygiene.

#### **What Application Developers Should Watch:**
- ✅ **Pin to stable builds** (especially Ollama `0.34.0`, SGLang dev commits) until major regressions are resolved.
- ✅ **Avoid speculative decoding** on long-context models (>185k) unless you’ve tested your use case.
- ✅ **Validate tool call schemas**—spaces in keys, nested objects, and streaming order can silently fail.
- ✅ **Use nightly or pinned tags** for vLLM/Unsloth to access latest kernel optimizations and ROCm support.
- ✅ **Monitor CI health**—SGLang and Ollama have visible instability; prefer tagged releases for production.

---

> **Final Takeaway**: The AI infrastructure layer is no longer a commodity. It’s a strategic differentiator. Choose your stack not just by performance, but by **stability, correctness, and hardware alignment**. Today’s digest reveals that **engineers are building for tomorrow’s GPUs—not today’s benchmarks**.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-09-13

---

### **1. Today's Highlights**  
vLLM continues rapid progress in DeepSeek-V4.1/Flash support, with key performance and stability fixes for high-concurrency deployments on SM90 (H20) and SM120 (GB10). Critical issues around speculative decoding (DFlash2), MoE routing, and batch invariance under sequence parallelism have been highlighted, indicating growing maturity in large-scale inference workloads.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash**: Full support now being actively optimized across multiple backends — including ROCm (MI355X) and CUDA (H20, GB10).  
  - [Issue #56506](https://github.com/vllm-project/vllm/issues/56506): Performance analysis shows significant underutilization on AMD MI355X; ongoing optimization efforts underway.  
  - [PR #56633](https://github.com/vllm-project/vllm/pull/56633): Performance improvement via fusion of mHC post-block into delayed pre-projection.  

- ✅ **SM8x (Ampere A100/A800, RTX 30xx)**: Added to roadmap for **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731** via [Issue #50576](https://github.com/vllm-project/vllm/issues/50576), currently blocked due to missing kernel support.

- ✅ **ROCm (AMD)**: Active CI improvements and infrastructure upgrades:
  - [PR #56157](https://github.com/vllm-project/vllm/pull/56157): Enable PCP+DCP sharding on sparse-MLA models.
  - [PR #56645](https://github.com/vllm-project/vllm/pull/56645): Expose PCP producer KV shards as transfer ranks for better scalability.
  - [PR #56162](https://github.com/vllm-project/vllm/pull/56162): Deprecate DinD for MI250 test groups; improve CI stability.

---

### **4. Performance & Optimization**  
- 🔥 **Speculative Decoding (DFlash2)**:  
  - [PR #56323](https://github.com/vllm-project/vllm/pull/56323): Migrating sampling and DFlash JIT kernels to shared warmup infrastructure — critical for reducing cold-start latency across model families.  
  - [PR #56621](https://github.com/vllm-project/vllm/pull/56621): Fix CPU store submission timing in offload path — prevents silent data loss during request completion.

- 🚀 **Kernel-Level Optimizations**:  
  - [PR #56464](https://github.com/vllm-project/vllm/pull/56464): Integrating **DeepSelect TopK** (MIT-licensed) into DSA sparse indexer — enables high-performance, selectable top-k routing.  
  - [PR #55072](https://github.com/vllm-project/vllm/pull/55072): Low-SM multimem reduce-scatter backend for SM100/SM103 — improves distributed training efficiency on newer architectures.  
  - [PR #56633](https://github.com/vllm-project/vllm/pull/56633): Reduces redundant kernel launches by fusing mHC post-block and delayed pre-projection — direct impact on decode throughput.

- ⚙️ **Batch Invariant & Parallelism**:  
  - [Issue #27433](https://github.com/vllm-project/vllm/issues/27433): Ongoing work to stabilize batch-invariant behavior under async TP and sequence parallelism.  
  - [Issue #56370](https://github.com/vllm-project/vllm/issues/56370): Batch invariance broken when `enable_sp` is active — a known regression requiring fix.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🛑 High | [#56389](https://github.com/vllm-project/vllm/issues/56389) | Illegal memory access in `dsv4_topk` MoE kernel under high concurrency on H20 (SM90) | Mitigated by `max_num_seqs=256`; no PR yet |
| 🛑 High | [#56605](https://github.com/vllm-project/vllm/issues/56605) | GLM-5.3-Flash degenerates into repeated "word salad" in agentic workflows | Reproduced locally; root cause unknown |
| 🟡 Medium | [#54094](https://github.com/vllm-project/vllm/issues/54094) | DFlash2 + YaRN: zero prefix-cache reuse at 1.04M prompt vs ~1.039M reuse in target-only mode | WIP PR #54381 investigates draft group/block hash issue |
| 🟡 Medium | [#54691](https://github.com/vllm-project/vllm/issues/54691) | DFlash spec decode becomes net loss at 185k context on Qwen3.5 hybrid GDN models | Drafter re-scans full accumulated KV per cycle; no per-sequence-length disable hook |
| 🟡 Medium | [#55927](https://github.com/vllm-project/vllm/issues/55927) | Deterministic wrong token in DeepSeek-V4-Flash-0731 at 1-in-4 prompt lengths (mod 4) | Reproduced on multiple hosted providers; exact cause unclear |

---

### **6. What This Means for Application Developers**  
- **Use caution with high-concurrency DeepSeek-V4.1-Flash deployments** on H20 (SM90) — limit `max_num_seqs` to 256 until [#56389](https://github.com/vllm-project/vllm/issues/56389) is resolved.  
- **Enable `VLLM_BATCH_INVARIANT=1` only if you’re not using sequence parallelism** — [#56370](https://github.com/vllm-project/vllm/issues/56370) indicates it breaks correctness when enabled with `enable_sp`.  
- **Expect longer prefill times on long-context (≥185k) hybrid GDN models** when using speculative decoding — consider disabling DFlash2 unless you're confident in your context length distribution.  
- **For structured output use cases**, be aware of the [ongoing DFlash2 + xgrammar bug](https://github.com/vllm-project/vllm/issues/53777) causing deterministic FSM failure — avoid `response_format: json_object` until fixed.  
- **Monitor GPU memory usage carefully on GB10 (SM121)** — [#56457](https://github.com/vllm-project/vllm/issues/56457) reports device OOM/hang during long prefill due to unbounded logits buffer growth in Qwen4Exp QSA indexer.

> **Pro Tip**: Use nightly builds (`vllm/vllm-openai:nightly`) to access latest fixes and optimizations, especially for DeepSeek-V4.1 and ROCm support. Track PRs like #56633 and #56464 for future performance gains.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **1. Today's Highlights**  
SGLang continues to advance its low-level inference infrastructure with critical fixes for Blackwell-era GPU support and speculative decoding robustness. Key developments include a fix for DeepSeek-V4.1 FP8 correctness issues on SM121, validation of VibeCUDA MSA integration on Blackwell, and ongoing work to stabilize unified cache and MoE routing across diverse hardware backends.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. Users should remain cautious about unmerged PRs affecting behavior (e.g., `--moe-runner-backend deep_gemm` failures — see #39226).

---

### **3. New Model & Hardware Support**  
- ✅ **VibeCUDA MSA on Blackwell**: Integration merged via [PR #39233](https://github.com/sgl-project/sglang/pull/39233), enabling use of FlashInfer’s `vibecuda` backend with fail-closed provider selection and CUDA graph-safe metadata handling.
- ✅ **AMD gfx950**: Added support for `fp8 two-pool unified_kv` in DSV4 via [PR #37413](https://github.com/sgl-project/sglang/pull/37413), expanding ROCm compatibility.
- ✅ **Apple Silicon (MLX)**: Fixed headless trunk detection for VL-family models ([PR #39242](https://github.com/sgl-project/sglang/pull/39242)) and initialized Mamba grid attributes in auxiliary state ([PR #39238](https://github.com/sgl-project/sglang/pull/39238)), improving MLX backend stability.
- 🚧 **NPU Support**: [PR #37382](https://github.com/sgl-project/sglang/pull/37382) introduces host memory cache management for DeepSeek-V4 on NPU — still under CI validation.

---

### **4. Performance & Optimization**  
- 🔥 **Speculative Decoding Efficiency**: [PR #39232](https://github.com/sgl-project/sglang/pull/39232) reuses fused FP8 KV/Q preparation in TRTLLM MLA target verification, eliminating redundant kernel launches and reducing overhead in draft generation.
- ⚙️ **Memory Pooling & Buffering**: [PR #39223](https://github.com/sgl-project/sglang/pull/39223) adjusts MegaMoE buffer allocation based on effective SM budget, preventing over-allocation on high-concurrency setups.
- 📈 **Diffusion Pipeline**: [PR #34122](https://github.com/sgl-project/sglang/pull/34122) enables vectorized JointThreshold decoding on CUDA, replacing per-row Python path to reduce serialization at high concurrency.
- 🛠️ **CI Enforcement**: [PR #39206](https://github.com/sgl-project/sglang/pull/39206) makes diffusion E2E performance metrics mandatory and terminal in CI — now enforcing valid latency reporting even when `run_perf_check=False`.

---

### **5. Stability & Regressions**  
- 🔴 **Critical FP8 Correctness Bug**: On SM121, `deep_gemm.fp8_einsum` returns results ~25% wrong when `DEEPGEMM_SCALE_UE8M0=false` — no error raised ([#39193](https://github.com/sgl-project/sglang/issues/39193)). *Fix pending.*
- 🔴 **DeepGEMM Graph Capture Failure**: Using `--moe-runner-backend deep_gemm` on DeepSeek-V4.1 MXFP4 fails during CUDA graph capture due to layout assertion (`layout.hpp:108`) on sm_121 ([#39226](https://github.com/sgl-project/sglang/issues/39226)). *High severity; blocks production deployment.*
- 🔴 **Silent Draft Rejection**: Quantized DFlash2 drafts are rejected 100% silently — no warning or error — despite loading successfully ([#39087](https://github.com/sgl-project/sglang/issues/39087)). *Crucial for speculative decoding reliability.*
- 🟡 **Client Disconnect Crash**: A client disconnect during an active request causes a full engine crash due to uncaught `asyncio.CancelledError` bypassing `except Exception` ([#39216](https://github.com/sgl-project/sglang/issues/39216)). *Security and uptime risk.*
- 🟡 **Cache Inconsistency**: HiCacheFile reports hybrid prefix hits even when required auxiliary pool cannot restore it ([#39147](https://github.com/sgl-project/sglang/issues/39147)). *Can lead to incorrect output.*

---

### **6. What This Means for Application Developers**  
- **Avoid `--moe-runner-backend deep_gemm`** until [#39226](https://github.com/sgl-project/sglang/issues/39226) is resolved — it will crash your server on Blackwell GPUs.
- **Verify FP8 quantization correctness** if using DeepSeek-V4.1 on SM121; current behavior may silently degrade output quality ([#39193](https://github.com/sgl-project/sglang/issues/39193)).
- **Use `vibecuda` provider only if explicitly enabled** — it’s now supported but not default; ensure your deployment handles fail-closed fallback.
- **Expect instability in speculative decoding** with quantized DFlash2 drafts — consider disabling or monitoring acceptance rate closely.
- **Update your client code** to handle `CancelledError` exceptions gracefully, as crashes can occur on connection loss ([#39216](https://github.com/sgl-project/sglang/issues/39216)).
- **Monitor CI test status** — multiple regressions (e.g., #36131, #39103) indicate ongoing instability in core inference paths; prefer stable release tags over `dev` builds for production.

> 💡 *Recommendation:* Pin to a known-good commit until major regressions are addressed. Monitor [Issue #17050](https://github.com/sgl-project/sglang/issues/17050) for real-time CI health updates.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-13**

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes for GPU backends (CUDA, Vulkan, ROCm) and improved JSON schema handling in tool calling workflows. Notable progress includes support for dot-notation integer literals in Jinja templates and a major refactor of the internal JSON schema representation to enable more robust grammar generation.

---

### **2. Releases & Breaking Changes**  
- **`b10934`**: Introduced `common_schema` as an internal representation for JSON schemas (#28736), replacing ad-hoc parsing logic and enabling better type resolution. This is a non-breaking change but may affect downstream tools relying on schema-to-grammar conversion.  
  🔗 [PR #28736](https://github.com/ggml-org/llama.cpp/pull/28736)  
- **`b10933`**: Added support for `dot.property.integer` syntax in Jinja templates (e.g., `{% set x = [1,2].0 %}`), fixing tool call parsing inconsistencies with models like Qwen3-Coder.  
  🔗 [PR #28817](https://github.com/ggml-org/llama.cpp/pull/28817)  
- **`b10931`**: UI now includes caching layer via `--cache` flag, improving performance for repeated requests in local inference environments.  
  🔗 [PR #28802](https://github.com/ggml-org/llama.cpp/pull/28802)

---

### **3. New Model & Hardware Support**  
- **Model Support**: Added experimental support for **ELMOD 2.7b**, a German research GPTNeoX model with custom tokenizer.  
  🔗 [PR #28818](https://github.com/ggml-org/llama.cpp/pull/28818)  
- **Backend Enhancements**:  
  - AMD GCN-specific HIP config added for `ggml-cuda` backend (#27841).  
  - Vulkan: Added IQ3_S MMQ matmul kernels for Intel Arc GPUs to avoid performance regressions with `VK_KHR_cooperative_matrix`.  
    🔗 [PR #28822](https://github.com/ggml-org/llama.cpp/pull/28822)  
- **Hardware-Specific Optimizations**:  
  - Blackwell (sm_120) now forces cuBLAS fallback for IQ1_S/IQ2_XXS/XS/S/IQ3_XXS/S quants due to correctness issues in native kernels.  
    🔗 [PR #28823](https://github.com/ggml-org/llama.cpp/pull/28823)

---

### **4. Performance & Optimization**  
- **CUDA/Blackwell**: Native MMA FA kernel regresses prompt processing by up to 2x on RDNA4 (gfx1201); workaround is to disable `rocWMMA` path until stable replacement is available.  
  🔗 [Issue #26220](https://github.com/ggml-org/llama.cpp/issues/26220)  
- **RTX 5090 (sm_120)**: Token generation reaches only ~28% of memory bandwidth bound under Linux, significantly below RTX 4090 performance (~86%). CUDA graphs cause GPU hangs (Xid 8, RC watchdog), resolved by `GGML_CUDA_DISABLE_GRAPHS=1`.  
  🔗 [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)  
- **Vulkan**: Prompt processing speed dropped after `b10780` on RDNA3; ongoing investigation underway.  
  🔗 [Issue #28752](https://github.com/ggml-org/llama.cpp/issues/28752)  
- **Sparse Attention**: Enabled for Qwen4 via PR #28770 — improves attention efficiency in hybrid models with full KV re-scoring.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| Critical | [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) | CUDA graphs hang RTX 5090 (Xid 8, RC watchdog) | ✅ Workaround: `GGML_CUDA_DISABLE_GRAPHS=1` |
| High | [#26220](https://github.com/ggml-org/llama.cpp/issues/26220) | Native MMA FA kernel causes 2x slower prompt processing on RDNA4 | ⚠️ Regression; rocWMMA removed |
| High | [#28404](https://github.com/ggml-org/llama.cpp/issues/28404) | Two co-resident `llama-server` processes crash after CUDA graph reuse (Windows) | ✅ Fixed by disabling graphs |
| Medium | [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) | Prompt processing slowdown post `b10780` on Vulkan/RDNA3 | 🔍 In progress |
| Medium | [#28813](https://github.com/ggml-org/llama.cpp/issues/28813) | Consistent OOM crashes with `-np 3` (3 concurrent requests) | 🔍 Investigating memory leak |

---

### **6. What This Means for Application Developers**  
- **Tool Calling Reliability**: Use `b10933+` for consistent JSON schema parsing in Jinja-based tool interfaces (e.g., Qwen3-Coder). Avoid `anyOf` object serialization bugs.  
- **GPU Deployment Caution**: On **RTX 5090 (sm_120)** or **RDNA4 (gfx1201)**, disable CUDA graphs (`GGML_CUDA_DISABLE_GRAPHS=1`) to prevent hangs and crashes.  
- **Memory Management**: Be cautious with high concurrency (`-np > 2`) — recent builds show OOM risks under heavy load; monitor `--cache` usage.  
- **Future-Proofing**: With `common_schema` now in place, expect tighter integration between LLM gateways and structured output validation. Consider upgrading early if building agents that rely on JSON schema-driven tooling.  

> 💡 **Pro Tip**: For production deployments on newer GPUs, use `GGML_CUDA_DISABLE_GRAPHS=1` + `--cache` until further optimizations land. Monitor `b10934+` for schema-related improvements in agent workflows.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-13**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to stabilize around key model serving workflows, with active engineering efforts focused on fixing critical correctness and stability issues in tool calling, streaming responses, and context handling—especially for multimodal and high-context models like Gemma 4 and Qwen 3.8. Notably, multiple PRs were merged or proposed to address silent truncation, incorrect stream ordering, and memory leaks across diverse hardware (Jetson, ROCm, hybrid GPUs), indicating strong focus on robustness in production-grade deployments.

---

### **2. Releases & Breaking Changes**  
No new releases were published in the last 24 hours. However, **PR #18393** ([Revert built-in agent](https://github.com/ollama/ollama/pull/18393)) has been closed, reverting the CLI chat interface to its prior state. This may affect users relying on the newer agent-driven flow; migration notes are pending. Additionally, **PR #18409** and **#18386** address a long-standing Windows uninstaller bug: now, the Ollama install path will be removed from `PATH` during uninstall, preventing stale environment variables.

---

### **3. New Model & Hardware Support**  
- **Gemma 4 multimodal support**: PR #16879 ([unified vision support](https://github.com/ollama/ollama/pull/16879)) improves metadata detection and capability reporting for GGUF-based Gemma 4 models used as standalone multimodal projects.
- **ROCm on gfx1151 iGPU (Strix Halo)**: Issue #17847 highlights a severe KV cache bleed issue affecting AMD’s latest integrated graphics. While no fix is yet landed, this signals growing community interest in low-end ROCm deployment.
- **Windows desktop integration**: PR #18410 adds **AI Arena Lite** to official integrations ([link](https://github.com/ollama/ollama/pull/18410)), enabling multi-agent conversations via a Windows-native UI.

---

### **4. Performance & Optimization**  
- **Context handling**: PR #17894 ([preserve recent user message](https://github.com/ollama/ollama/pull/17894)) targets the root cause of `no user query found in messages` errors in Qwen 3.8 during tool loops—improving resilience under large context loads.
- **Tool call parsing**: PRs #18400 and #18398 ([parse keys with spaces](https://github.com/ollama/ollama/pull/18400) & [preserve bare object keys](https://github.com/ollama/ollama/pull/18398)) fix JSON parsing failures in Gemma 4 tool schemas with display names containing whitespace—critical for reliable agent tool use.
- **Memory efficiency**: PR #18407 ([preserve imported GGUF blobs](https://github.com/ollama/ollama/pull/18407)) prevents unnecessary rewrites during quantization, reducing I/O overhead and disk usage. Also, PR #18416 reports a 50GB untracked blob left after `--quantize`, highlighting a storage leak risk.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|--------|
| Critical 🔴 | **Qwen 3.8 crashes on tool loops** due to missing user query in truncated context | Open (#17778) | ✅ [PR #17894](https://github.com/ollama/ollama/pull/17894) |
| High 🔴 | **ROCm GPU bleeding KV state across requests** (Strix Halo gfx1151) | Open (#17847) | ❌ No fix yet |
| High 🔴 | **Gemma 3:12b structured output truncates early** on double quotes | Open (#18094) | ❌ No fix |
| High 🔴 | **Jetson Orin Nano OOM during multimodal projector load** | Open (#18396) | ❌ No fix |
| Medium 🟡 | **SIGABRT crash on Linux hybrid graphics (Intel + RTX 4080)** | Open (#18412) | ❌ No fix |
| Medium 🟡 | **`web_search` emits function_call before reasoning completes** | Open (#18411) | ✅ [PR #18413](https://github.com/ollama/ollama/pull/18413) |
| Medium 🟡 | **Exhaustion of loopback ports under sustained `/api/embed` load** | Open (#18392) | ❌ No fix |

> ⚠️ Multiple regressions involve streaming semantics, memory management, and cross-platform GPU drivers—highlighting fragility in edge cases.

---

### **6. What This Means for Application Developers**  
- **Avoid tool-heavy agents on Qwen 3.8 and Gemma 4 without validation**: These models are prone to silent failure under long contexts. Use `OLLAMA_CONTEXT_SHIFT` (via PR #18399) to proactively reject overlong prompts.
- **Validate tool call formatting**: Ensure schema keys don’t contain spaces unless using updated parsers (post-PR #18400/#18398).
- **Watch for memory leaks**: The `--quantize` command leaves unlinked F16 blobs (~50GB); manually clean up `~/.ollama/models/blobs` if needed.
- **Expect instability on Jetson, ROCm, and hybrid GPUs**: These platforms remain experimental. Avoid production use until PRs addressing OOM and crashes land.
- **Use stable API patterns**: Streaming responses may emit `function_call` prematurely (fix in PR #18413). Clients should buffer and reorder events logically.

> 💡 **Recommendation**: Pin to `0.34.0` for now, monitor fixes in PRs linked above, and avoid `create --quantize` until storage bugs are resolved.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **1. Today's Highlights**  
LiteLLM continues to evolve as a critical inference and LLM gateway infrastructure, with significant focus on **API fidelity**, **cost accuracy**, and **multi-agent security**. Key developments include fixes for Anthropic `vector_store_ids` validation errors, streaming reasoning state preservation, and improved OpenTelemetry tracing in proxy deployments. A major price sync PR (40919) updated 278 models across 5 providers, ensuring pricing alignment with upstream vendors.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several high-impact changes are pending merge:
- **PR #40919** ([chore(prices)](https://github.com/BerriAI/litellm/pull/40919)) – Syncs pricing for 278 models across 5 providers; includes 34 new models and updated source links. This will affect cost tracking and model routing logic.
- **PR #40924** ([fix(ui)](https://github.com/BerriAI/litellm/pull/40924)) – Adds Tencent TokenHub to the Add Model provider dropdown, enabling direct integration via UI.
- **PR #40923** ([fix(mcp)](https://github.com/BerriAI/litellm/pull/40923)) – Enforces admission control for delegated OAuth access, improving security for MCP-based agent workflows.

> ⚠️ *Developers using self-hosted OpenAI-compatible backends or custom model pricing should review these updates before deployment.*

---

### **3. New Model & Hardware Support**  
- **New Models Added**:  
  - `deepseek-v4-flash`, `deepseek-vr-p4o` (via [Issue #30430](https://github.com/BerriAI/litellm/issues/30430))  
  - GPT-Live API (`gpt-live-1`) support is under active development ([Issue #40888](https://github.com/BerriAI/litellm/issues/40888), [PR #40915](https://github.com/BerriAI/litellm/pull/40915))  
  - Video generation models from OpenRouter (pending [Issue #27724](https://github.com/BerriAI/litellm/issues/27724))

- **Hardware/Backend Notes**:  
  No new GPU/CPU/Metal/ROCm quantization support reported today. However, ongoing work on **Bedrock e2e test reproducibility** ([PR #40899](https://github.com/BerriAI/litellm/pull/40899)) improves reliability for AWS-optimized inference paths.

---

### **4. Performance & Optimization**  
- **Latency Reduction**:  
  - **PR #23544** ([Issue #23544](https://github.com/BerriAI/litellm/issues/23544)): Caches `list_tools` responses for HTTP MCP servers, eliminating redundant round-trips per tool call — reduces latency by ~50% in multi-tool scenarios.
- **Cost Accuracy Improvements**:  
  - **PR #40627** ([fix(cost)](https://github.com/BerriAI/litellm/pull/40627)): Corrects overbilling of cached audio tokens by applying proper cache-read rates (previously billed at full $32/M rate).
  - **PR #40915** ([fix(vertex-live)](https://github.com/BerriAI/litellm/pull/40915)): Ensures end-to-end billing for Gemini Live sessions, fixing misaligned cost margins per turn/session.

> ✅ *These changes significantly improve cost predictability and reduce overhead in long-running agentic workflows.*

---

### **5. Stability & Regressions**  
Top stability issues reported today:

| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [#23741](https://github.com/BerriAI/litellm/issues/23741): `AnthropicException 400` due to `vector_store_ids` | Critical | Open | [PR #23742](https://github.com/BerriAI/litellm/pull/23742), [PR #30086](https://github.com/BerriAI/litellm/pull/30086) |
| [#40887](https://github.com/BerriAI/litellm/issues/40887): Streaming reasoning progress lost in Responses-to-Chat bridge | High | Open | None |
| [#40851](https://github.com/BerriAI/litellm/issues/40851): `session_id` mismatch in spend logs breaks session grouping | Medium | Open | None |
| [#40651](https://github.com/BerriAI/litellm/issues/40651): `lite codex` bypasses proxy when `-c` passed after subcommand | Medium | Open | None |

> 🔴 **Critical regression**: `vector_store_ids` validation failure breaks Anthropic Vector Store integrations. Users relying on this feature must apply one of the referenced PRs or avoid passing `vector_store_ids`.

---

### **6. What This Means for Application Developers**  
- **For agents & multi-turn apps**: Ensure you’re not hitting `vector_store_ids` bugs (see #23741); use latest proxy versions with merged fixes. Use `enable_anthropic_prompt_caching` cautiously — it may interfere with vector store pre-calls (#40908).
- **For cost-sensitive deployments**: The recent price sync (PR #40919) ensures accurate billing. Verify that custom pricing isn’t silently ignored (e.g., OCR models defaulting to $0 — see #36608).
- **For security & observability**: Enable OTel spans via `@client` wrappers (PR #30402); legacy MCP routes now require admission control (PR #40923).
- **For UI developers**: Expect new provider options (Tencent) and enhanced logging (GCS flush failures now logged — PR #40922). Consider adding image rendering in logs (feature request #29877).

> 💡 **Action item**: Review your model routing logic if using `/v1/responses`, `/v1/messages`, or self-hosted OpenAI-compatible endpoints — recent bugs show silent mode degradation (e.g., multimodal loss in #40780, reasoning drops in #40854).

---  
*Digest generated: 2026-09-13 | Source: GitHub @ BerriAI/litellm*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **1. Today's Highlights**  
Unsloth continues to strengthen its core inference and training stack with critical fixes for GPU memory management, model loading stability, and compatibility with newer TRL and Hugging Face versions. Key progress includes resolving a major regression in the Docker Studio image that broke training on GPU hosts, and addressing a persistent issue where model cards were not properly named during upload. The team is also advancing support for AMD ROCm and new quantization backends like EXL3.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, **PR #10825** ([fix: stop disabling Unsloth’s TRL patches on GPU hosts](https://github.com/unslothai/unsloth/pull/10825)) resolves a breaking change introduced in `unsloth/unsloth:latest` that prevented training workflows from working on GPU-equipped machines due to `ENV UNSLOTH_ALLOW_CPU=1`. This fix restores functionality and should be considered mandatory for users running training jobs in Docker Studio.

Additionally, **PR #10836** ([fix: stop false ALL_COLUMNS_DROPPED when seed columns export](https://github.com/unslothai/unsloth/pull/10836)) corrects a misleading error message in Data Recipes that falsely claimed all columns were dropped — even when seed columns were preserved. This improves UX clarity for fine-tuning pipelines.

---

### **3. New Model & Hardware Support**  
- ✅ **AMD ROCm Support**: PR #10820 ([add AMD ROCm image for RDNA2–CDNA](https://github.com/unslothai/unsloth/pull/10820)) introduces official Docker images for AMD GPUs (ROCm), enabling training and inference on RDNA2 through CDNA architectures. This expands hardware coverage beyond CUDA-only environments.
- 🔮 **EXL3 Quantization Backend**: PR #7115 ([Add EXL3 backend: 2/3/4/6/8-bit + MoE support](https://github.com/unslothai/unsloth/pull/7115)) adds experimental ExLlamaV3 (EXL3) as a quantization option — supporting fractional bitrates and Mixture-of-Experts models (e.g., Qwen, DeepSeek), which are currently unsupported by bitsandbytes.
- 📌 **Deepseek v4.1 Flash GGUF**: Issue #10838 ([request: add Deepseek v4.1 flash GGUF](https://github.com/unslothai/unsloth/issues/10838)) highlights growing demand for next-gen model support. While no implementation yet, this signals future roadmap focus.

---

### **4. Performance & Optimization**  
- ⚡ **Qwen3.5-9B LoRA SFT Speedup**: PR #10744 ([perf: Qwen3.5-9B LoRA SFT on B200: 0.85s → 0.66s](https://github.com/unslothai/unsloth/pull/10744)) reports a **~22% reduction in per-step training time** (from 0.85s to 0.66s) on NVIDIA B200 via CPU-side overhead optimizations. Identified bottlenecks include data loading and pre-processing latency — key targets for further tuning.
- 🔄 **Prompt Processing Visibility**: PR #10834 ([show prompt-processing progress in API monitor](https://github.com/unslothai/unsloth/pull/10834)) enhances observability by adding real-time status updates (`Prompt processing · N%`) during GGUF inference, aiding debugging of long-latency prompts.
- 💾 **Image Model Asset Download Control**: PR #10789 ([download image model assets without loading](https://github.com/unslothai/unsloth/pull/10789)) allows users to download model dependencies separately from loading — improving control over bandwidth and memory usage in resource-constrained setups.

---

### **5. Stability & Regressions**  
⚠️ **High Severity**:  
- **Training Breakage on GPU Hosts**: Issue #10825 was caused by `UNSLOTH_ALLOW_CPU=1`, which disabled essential TRL patches in Docker Studio. Fixed in PR #10825 — *urgent update recommended*.  
- **Model Loading Crashes**: Issue #10817 ([Run settings sidebar silently disagrees](https://github.com/unslothai/unsloth/issues/10817)) reports UI inconsistency between two panels editing run settings, leading to silent data loss. Affects desktop app users; reproducible on Windows 11 + GGUF via llama-server.  
- **Crash on New Chat**: Issue #10288 ([tapClientLookup: Index 1 out of bounds](https://github.com/unslothai/unsloth/issues/10288)) causes random crashes when clicking "New chat" — likely due to improper state handling in client lookup logic.  

⚠️ **Medium Severity**:  
- **MCP Truncation / Deduplication Bugs**: Issues #10839 ([MCP call systematically truncated](https://github.com/unslothai/unsloth/issues/10839)) and #10379 ([disable tool call deduplication](https://github.com/unslothai/unsloth/issues/10379)) point to recurring issues with tool execution fidelity, especially when repeated calls are needed (e.g., compile commands).  
- **AppImage Missing Dependency**: Issue #10840 ([AppImage missing hf_xet package](https://github.com/unslothai/unsloth/issues/10840)) prevents downloading larger models (e.g., Qwen 3.8 Flash Next at Q5_K_XL). Requires manual `pip install hf_xet` workaround.

---

### **6. What This Means for Application Developers**  
- **Upgrade Immediately if Using Docker Studio**: If you're training models in `unsloth/unsloth:latest` on a GPU host, apply the fix from **PR #10825** — otherwise training will fail silently with `TypeError`.
- **Use Manual GPU Memory Mode with Caution**: The `--fit` logging bug (Issue #10821, fixed in PR #10831) may mislead developers about actual memory allocation. Monitor real-time logs carefully.
- **Design for Tool Call Idempotency**: Due to aggressive deduplication (Issue #10379), avoid relying on repeated identical tool calls unless explicitly disabled. Consider implementing custom retry logic or bypassing the frontend deduplication layer.
- **Plan for Multi-Hardware Deployment**: With ROCm image support now available, developers can build cross-platform agent systems targeting both NVIDIA and AMD GPUs. Use `docker pull unsloth/unsloth:rocm` for AMD workflows.
- **Leverage New Image Model Controls**: Use the `Download only` option (PR #10789) to pre-fetch assets without consuming GPU memory — ideal for CI/CD pipelines and remote deployment.

> 🔗 **Key Links**:  
> - [Fix for GPU Training Breakage](https://github.com/unslothai/unsloth/pull/10825)  
> - [AMD ROCm Image](https://github.com/unslothai/unsloth/pull/10820)  
> - [EXL3 Quantization Backend (Experimental)](https://github.com/unslothai/unsloth/pull/7115)  
> - [Data Recipe Fix](https://github.com/unslothai/unsloth/pull/10836)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*