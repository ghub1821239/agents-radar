# AI Infrastructure Digest 2026-09-01

> Generated: 2026-09-01 01:23 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-01**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem in Q3 2026 is characterized by rapid convergence toward **high-performance, multi-model, cross-hardware deployment**, with strong emphasis on speculative decoding, structured outputs, and agent-native workflows. Projects are increasingly focused on **hardware diversity**—Intel XPU, AMD ROCm, Apple Silicon, and Huawei NPU—while also addressing deep stability issues in MoE, vision, and long-context models. A clear trend toward **distributed scalability**, **security-by-design**, and **observability-first architectures** underscores the maturation of production-grade LLM infrastructure.

---

### **2. Activity Comparison**

| Project       | Issues Open (High Severity) | PRs Merged (Last 24h) | Release Status |
|---------------|-----------------------------|------------------------|----------------|
| **vLLM**      | 18 (4 critical)             | 7                      | Stable (`v0.27.1`) |
| **SGLang**    | 25 (5 high-severity)        | 12                     | Stable         |
| **llama.cpp** | 12 (5 high-severity)        | 8                      | No new release |
| **Ollama**    | 13 (2 high-severity)        | 3                      | Stable         |
| **LiteLLM**   | 14 (4 high-severity)        | 6                      | Upcoming `v1.99.0` |
| **Unsloth**   | 12 (3 high-severity)        | 5                      | Stable         |

> ✅ *Observation:* SGLang leads in activity volume, reflecting its focus on distributed systems and emerging hardware. vLLM maintains highest stability with minimal churn, while LiteLLM prepares for a major breaking change cycle.

---

### **3. Model Support Race**

| New Model / Architecture         | Supported By                         | Notes |
|----------------------------------|--------------------------------------|-------|
| **Qwen3.8-Flash-Next**          | SGLang, llama.cpp, Unsloth (partial) | SGLang has active fixes; llama.cpp supports via `qwen4exp`; Unsloth lacks `qwen4exp` recognition |
| **DeepSeek-V4-Pro (DSA/MLA)**   | vLLM (Intel XPU), SGLang             | vLLM leads in hardware-specific support (XPU + FP8 offload) |
| **GLM-5.3-Flash (glm5next)**    | llama.cpp (text/vision), SGLang      | llama.cpp has full integration; SGLang post-rebase stabilization |
| **Kimi-K3/K2.6**                | vLLM                                 | Only project with documented tool-call fixes |
| **Granite 4.1 (MLX)**           | Ollama                               | Experimental MLX backend only |
| **MXFP8/MXFP4 Quantized Models**| vLLM, SGLang, llama.cpp, Ollama       | vLLM and SGLang lead in kernel-level optimization (e.g., FlashInfer SM90, ROCm fusing) |

> 🏆 **Leader:** **vLLM** holds edge in model variety and hardware coverage, especially for Intel and NVIDIA. **SGLang** is fastest in adopting next-gen decode graphs and distributed scaling.

---

### **4. Performance Frontier**

| Optimization Focus         | Key Projects & Highlights |
|----------------------------|----------------------------|
| **KV Cache & Prefix Caching** | vLLM (hybrid GDN + MTP), SGLang (HiCache L3), llama.cpp (batched scatter, O(log n) indexing) |
| **Speculative Decoding**     | vLLM (DP sync overlapped), SGLang (windowed attention), llama.cpp (MOE fusion) |
| **Quantization & Fused Kernels** | vLLM (FlashInfer SM90 MXFP4 x FP8), SGLang (ROCm fused kernels), llama.cpp (radix TOP_K, FA-vec) |
| **Distributed Serving**      | SGLang (PD disaggregation, HiCache), LiteLLM (team-level routing) |
| **Kernel-Level Efficiency**  | vLLM (PTX 9.4 `ldmatrix.s8.s4`), SGLang (813 GB/s ROCm bandwidth), llama.cpp (XOR swizzle, Metal FA-vec) |

> 🔥 **Frontier Leader:** **vLLM** dominates in **kernel-level optimizations** and **speculative decoding maturity**, while **SGLang** leads in **distributed inference** and **hardware abstraction**.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Key Differentiators |
|---------------|-----------------------------------|---------------------|
| **vLLM**      | **Serving Engine (Inference)**    | High-throughput, low-latency, GPU-optimized; best for large-scale deployments |
| **SGLang**    | **Distributed Serving Gateway**   | Built for PD disaggregation, HiCache, and multi-node scalability |
| **llama.cpp** | **Local Runtime / Edge Inference**| CPU/GPU agnostic, lightweight, ideal for Apple Silicon and embedded |
| **Ollama**    | **Developer Gateway / CLI Tool**  | User-friendly, GGUF-centric, strong local dev experience |
| **LiteLLM**   | **API Gateway / Routing Layer**   | Multi-provider routing, observability, enterprise-grade logging |
| **Unsloth**   | **Agent Platform / Training Toolkit** | Security sandboxing, tool execution, UX-focused agent workflow |

> 🎯 **Strategic Insight:** The stack is clearly segmenting: **vLLM/SGLang** for core inference, **llama.cpp/Ollama** for edge/local use, **LiteLLM** for orchestration, and **Unsloth** for secure agent execution.

---

### **6. Trend Signals**

**Key Industry Trends Extracted from Today’s Activity:**
- **Hardware Diversification**: Intel XPU, AMD ROCm, Apple Silicon, and Huawei NPU are no longer niche — all projects now actively support them.
- **MoE & Vision Models Are Now Production-Ready**: DeepSeek-V4, GLM-5.3, Qwen3.8-Flash-Next are being pushed into real-world use despite ongoing stability bugs.
- **Security & Isolation Are Non-Negotiable**: Unsloth’s OS-level sandboxing and LiteLLM’s credential propagation fixes signal that trust boundaries are being enforced at runtime.
- **Structured Outputs Are a Bottleneck**: Persistent tool-call parsing failures across vLLM, SGLang, and Ollama indicate this remains a high-risk area for agents.
- **Distributed Systems Are Becoming Standard**: SGLang’s HiCache, PD disaggregation, and weight cache daemon reflect a shift toward scalable, memory-efficient agent infra.

> ✅ **Actionable Guidance for Developers:**
> - Use **vLLM** for high-throughput, GPU-based inference with speculative decoding.
> - Choose **SGLang** for long-context, distributed agent workloads requiring HiCache or PD disaggregation.
> - Opt for **llama.cpp** on Apple Silicon or resource-constrained devices.
> - Use **Ollama** for local experimentation with GGUF models.
> - Deploy **LiteLLM** as an enterprise-grade API gateway with multi-provider fallback.
> - Leverage **Unsloth** when building secure, tool-augmented agents with sandboxed execution.

> ⚠️ **Watchlist:** Monitor **Qwen3.8-Flash-Next** stability across all platforms until PRs #37322 (SGLang), #54630 (vLLM), and #10015 (Unsloth) land. Avoid production use until resolved.

---  
*Data Source: GitHub repositories (vllm-project/vllm, sgl-project/sglang, ggml-org/llama.cpp, ollama/ollama, BerriAI/litellm, unslothai/unsloth)*  
*Report Generated: 2026-09-01*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-01**

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its focus on speculative decoding, structured output robustness, and multi-backend support. Key developments include a fix for MTP speculative decoding crashes on long sequences (PR #54630), critical improvements in prefix cache utilization under hybrid MTP + GDN models (PR #52244), and ongoing efforts to stabilize tool-call parsing across diverse model families like Qwen3, Gemma4, and Kimi-K3.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The project remains stable at `v0.27.1`, with ongoing work focused on feature parity and correctness fixes rather than version bumps.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4-Pro (DSA/MLA)** now supported on Intel XPU via PR #54460, enabling FP8 block-scaled weights with CPU offload.
- **Qwen3-Next (GDN)** gains full `mamba_cache_mode="all"` prefix caching support with MTP speculative decoding on V1 engine (PR #50172).
- **FlashInfer SM90 MXFP4 x FP8 fused MoE backend** added for DeepSeek-V4-family models (PR #54032), enabling optimized inference on SM90 GPUs.
- **Intel GPU (XPU)** support expanded: sequence parallelism for MXFP8 models (PR #49303), activation routing to SYCL kernels (PR #53734), and skipped gsm8k checks for unsupported models (PR #54010).

> 🔗 [PR #54460](https://github.com/vllm-project/vllm/pull/54460) | [PR #50172](https://github.com/vllm-project/vllm/pull/50172) | [PR #54032](https://github.com/vllm-project/vllm/pull/54032)

---

### **4. Performance & Optimization**  
- **Triton kernel optimization**: A new split-row pipeline for top-p masking removes batch-size gate (`batch >= 8`), improving efficiency for small batches (PR #54651).
- **MTP speculative decoding**: Draft continuation DP sync is now overlapped with prefill processing (PR #54656), reducing idle time in high-concurrency scenarios.
- **Kernel-level optimizations**: 
  - Adoption of PTX 9.4 `ldmatrix.s8.s4` for W4A8-INT8 paths (PR #49529), enabling faster INT4→INT8 expansion during shared-memory loads.
  - Integration of DeepGEMM NVFP4 MegaMoE with fused BF16 shared experts (PR #54520), improving throughput for large MoE models.
- **KV Cache**: Hybrid GDN prefix-cache hits restored under MTP spec decoding (PR #52244), significantly improving reuse rates for repeated prompts.

> 🔗 [PR #54651](https://github.com/vllm-project/vllm/pull/54651) | [PR #54656](https://github.com/vllm-project/vllm/pull/54656) | [PR #49529](https://github.com/vllm-project/vllm/pull/49529) | [PR #54520](https://github.com/vllm-project/vllm/pull/54520)

---

### **5. Stability & Regressions**  
Top stability concerns today involve **tool-call parsing failures**, **structured output corruption**, and **CUDA memory access crashes**:

- **Critical crash**: Illegal memory access with FlashInfer attention backend on sm_120 with NVFP4 + FP8 KV cache (PR #54225). Reproducible on 16-token requests; TRITON_ATTN unaffected. *Fix pending.*
- **Tool-call regression**: Qwen3.6-27B tool calls fail when MTP is enabled (Issue #46249); linked to parser state misalignment.
- **Structured output bugs**: 
  - Gemma4 produces `<pad>` tokens under concurrency (Issue #39392).
  - Qwen3.5 `thinking_token_budget` leaks `reasoning_end_str` into `content` field (Issue #39697).
- **Model-specific issues**: Kimi-K2.6 intermittently outputs only `"!!!!!!!!!!"` with null content (Issue #42426), affecting reasoning pipelines.

> 🔗 [Issue #42426](https://github.com/vllm-project/vllm/issues/42426) | [Issue #46249](https://github.com/vllm-project/vllm/issues/46249) | [Issue #39392](https://github.com/vllm-project/vllm/issues/39392) | [Issue #54225](https://github.com/vllm-project/vllm/issues/54225)

---

### **6. What This Means for Application Developers**  
- **Use caution with MTP speculative decoding** on Qwen3.6-27B and newer models — ensure you're on `v0.27.1+` and avoid `--moe-backend flashinfer_cutlass_humming` if using NVFP4 + FP8 KV cache until PR #54225 lands.
- **Enable structured outputs carefully**: For Qwen3.5 and Gemma4, validate that `response_format` and `strict=false` are correctly wired (PR #50544 fixes this), especially in streaming workflows.
- **Leverage new hardware support**: Intel XPU users can now run DeepSeek-V4-Pro and MXFP8 models with SP and proper activation routing — ideal for low-latency agent inference.
- **Monitor prefix cache hit rates** on GDN models with MTP; recent fixes (PR #52244) improve reuse but require correct `mamba_cache_mode` configuration.
- **Avoid relying on deterministic greedy decoding** when using Qwen3.8-Flash-Next with long prompts near `indexer_budget` (Issue #54521); non-determinism is observed even at `temperature=0`.

> ✅ **Actionable Tip**: If building agents with tool calling, prefer `--tool-call-parser qwen3_coder` over auto-tool-choice for Qwen3.5 series until Issue #39056 is resolved.

---  
*Data source: [vllm-project/vllm GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-01**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to accelerate its focus on **distributed inference scalability**, with major progress in **PD disaggregation unification**, **HiCache L3 storage planning**, and **multi-modal/agent workload optimization**. Notably, multiple PRs were merged or submitted targeting critical stability fixes for Qwen3.8-Flash-Next and MiniMax-M3 tool parsing, while new work on unified cache systems and AMD/NPU support signals growing hardware diversity.

---

### **2. Releases & Breaking Changes**  
*None*  
No new releases were published in the last 24 hours. No breaking API or config changes are active as of this date.

---

### **3. New Model & Hardware Support**  
- **Qwen3.8-Flash-Next**: Active bug tracking (#36537, #37111) due to token ID 0 loops and silent output corruption under `NEXTN` decode graphs; ongoing fixes via PR #37322 (FP4 draft preservation).
- **MiniMax-M3**: Ongoing kernel optimizations for MXFP8 quantization and MoE fusion (#36575, #36574), including per-token FP8+RMSNorm fusing and BF16 FP8-GEMM backend.
- **GLM-5.3-Flash**: Support now being stabilized post-rebase (#37298), with fix for vision config handling and MTP index sharing.
- **AMD ROCm (gfx950)**: New kernel optimizations for rope_cache grouping (PR #37315) yielding **2.15–2.5x speedup** on gpt-oss shapes.
- **Ascend NPU A5**: RFC #21584 tracks MXFP8/MXFP4 support, indicating early-stage expansion into Huawei’s ecosystem.
- **Intel XPU**: Weekly enablement PR #37193 adds basic model support for Intel GPU backends.

---

### **4. Performance & Optimization**  
- **Weight Cache Daemon**: Phase 1 launched (#27139), reducing Qwen3-235B FP8 weight load time from **~306–327s to <1s** ([blog](https://www.lmsys.org/blog/2026-08-21-sglang-weight-cache-daemon)).
- **ROCm Optimization**: Fused `qk-rope + cache` kernel on gfx950 achieves **813 GB/s bandwidth**, with **2.15–2.5x performance gains** via per-KV-group program grouping (PR #37315).
- **MoE Kernel Improvements**: Small-batch sorting path with fused MXFP8 quantization reduces per-layer overhead by ~7μs (PR #36559); MoE all-reduce folding into next layer improves pipeline efficiency.
- **Speculative Decoding**: PR #32673 introduces windowed attention for built-in EAGLE/MTP drafts to reduce KV read cost during long prefixes.

---

### **5. Stability & Regressions**  
*High-severity issues reported today:*
1. **CUDA Coredump Tracker** (#26340): Auto-collected coredumps from CI — 269 comments, no known root cause yet. Critical for debugging production crashes.
2. **Qwen3.8-Flash-Next Silent Corruption** (#37111): Output silently corrupted on GB10 TP2 under `QSA + NEXTN` decode graph — high risk for agent workflows.
3. **HiCache Prefetch Deadlock** (#30760): TP=4, no PP setup causes deadlock in `check_prefetch_progress`, leading to server hang.
4. **DFLASH Speculative Decode Crash** (#36140): Crashes when decode runs in PD disaggregation mode (`--disaggregation-mode decode`) due to missing spec_info wiring.
5. **Unified-Cache Default Flip Regression** (#36131): Post-PR #34653, long-prefix decode throughput drops significantly on Spark and Thor.

> ✅ *Fixes in progress*: PR #37322 addresses draft-load failure in Deepseek NextN models; PR #37316 resolves request-state leak and decode prealloc timeout.

---

### **6. What This Means for Application Developers**  
- **Avoid Qwen3.8-Flash-Next with `NEXTN` decoding** until PR #37322 is merged — silent corruption risks data integrity.
- **Use `--disaggregation-mode decode` cautiously** — DFLASH speculative decoding remains unsupported; use only with DSPARK/EAGLE backends.
- **Leverage HiCache and distributed KV cache roadmap** (#21846, #28874) for long-context agentic apps requiring low memory footprint.
- **Monitor CI health** — recent flakiness (11 flaky tests) and test failures tracked in #17050 may impact deployment reliability.
- **Expect faster startup times** via the new Weight Cache Daemon — ideal for multi-model, high-availability deployments.

👉 [Join Slack](https://slack.sglang.ai/) for real-time updates on these developments.  
🔗 Full issue tracker: [sgl-project/sglang Issues](https://github.com/sgl-project/sglang/issues)  
🔗 Latest PRs: [sgl-project/sglang PRs](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-01**

---

### **1. Today's Highlights**  
The latest updates focus on deep performance optimizations for Apple Silicon (M1/M1 Ultra) and NVIDIA/AMD GPU backends, with critical kernel-level improvements to Flash Attention and KV cache handling. Notably, Metal now includes dedicated FA-vec tunings for M1 Ultra, while CUDA and ROCm see targeted fixes for MOE fusion and TOP_K scalability—especially impactful for large-context models like DeepSeek-V4-Flash.

---

### **2. Releases & Breaking Changes**  
No new tagged releases today. However, the following PRs introduce behavior changes requiring attention:  
- **PR #28130** (`qwen4exp`: gather-based sparse attention) — restructures QSA decode path; may affect output consistency if `--cache-disk` or `--split-mode` are used. [GitHub](https://github.com/ggml-org/llama.cpp/pull/28130)  
- **PR #28129** (`cuda`: dispatch batched top-k via argsort) — replaces per-row `DeviceTopK` with a unified path; could alter timing profiles in high-throughput prefill scenarios. [GitHub](https://github.com/ggml-org/llama.cpp/pull/28129)  

> ✅ *Note: These changes are not breaking but may require re-testing of speculative decoding and long-context workloads.*

---

### **3. New Model & Hardware Support**  
- **New Models**:  
  - Added support for **DeepSeek-V4-Flash-Vision-Exp** (text + vision) via PR #28133. [GitHub](https://github.com/ggml-org/llama.cpp/pull/28133)  
  - Added **GLM-5.3-Flash (glm5next)** — 321B hybrid MoE model with KDA linear + DSA sparse attention. Multiple PRs (#27754, #27752, #27773) cover text and vision towers. [GitHub](https://github.com/ggml-org/llama.cpp/pull/27754)  
- **Hardware Backends**:  
  - **Metal**: Full FA-vec tuning for **M1 Ultra** added (PR #28088).  
  - **ROCm**: Added radix-based TOP_K optimization for long rows (PR #27466).  
  - **OpenCL**: Tuned quant paths for Intel Xe-LP GPUs (Q4_K/Q5_K), improving TG/PP by up to 2x (PR #26438).  
  - **WebGPU**: Fixed crash when offset is not multiple of 4 (PR #28045).  

---

### **4. Performance & Optimization**  
- **Metal (Apple Silicon)**:  
  - M1 Ultra FA-vec kernels show measurable gains in flash attention throughput (exact numbers pending benchmarking).  
  - M1-specific FA-vec tunings moved into proper section for clarity.  
- **CUDA**:  
  - XOR swizzle flash attn K,V smem fp16 tiles improve memory coalescing (PR #25635).  
  - Extended MOE fusion to specdec and topk-router, enabling multi-token parallelism (PR #27621).  
- **ROCm**:  
  - Radix TOP_K reduces overhead for long rows (>1024 cols); mitigates regression seen in #26399.  
- **KV Cache**:  
  - Batched scatter reads during non-contiguous restore (PR #27991) reduce latency in fragmented ring buffers.  
  - Indexing `(seq, pos)` cells for O(log n) lookup in `get_prev_tokens()` (PR #27992) targets decode bottlenecks in qwen4exp.  

> 📈 *Expected impact: 1.5–3x faster decode at 100K+ context for Qwen3.8-Flash-Next and DeepSeek-V4-Flash on supported hardware.*

---

### **5. Stability & Regressions**  
Critical stability issues reported today:  
1. **SYCL crashes on Intel Arc A770/B70** (PR #27063): Full runtime failure under sustained load. Likely tied to host-pinned memory management (see #27038).  
2. **Vulkan GATED_DELTA_NET pipeline hang** on gfx1103 (RADV 780M) — server never starts (Issue #27998).  
3. **ROCm TOP_K crashes** when `ncols > 1024` due to bitonic kernel block-size overflow (Issue #27021).  
4. **SYCL multi-GPU crash** with B50+B70 combo (Issue #27888).  
5. **CUDA Blackwell (sm_100) decode hang** with Qwen3.8-27B-NVFP4 (Issue #27329) — CPU spins, no GPU activity.  

> 🔴 *Severity*: High — all affect production deployment readiness. No fix PRs yet for these, though several are actively being investigated.

---

### **6. What This Means for Application Developers**  
- **Use caution with SYCL and multi-GPU setups** — current builds are unstable on Intel Arc cards under load. Avoid in production until #27063 and #27888 are resolved.  
- **Leverage new model support** for GLM-5.3-Flash and DeepSeek-V4-Flash-Vision in agent workflows; ensure you’re using `NVIDIA_TF32_OVERRIDE=0` for correct GLM output.  
- **Optimize for large contexts**: The new `kv-cache` indexing (PR #27992) and batched restores (PR #27991) will significantly improve performance for long-running LLM agents.  
- **Monitor upcoming port change**: `llama-server` default port moving from `8080` → `9931` (leetspeak of GGML) — update configs accordingly (PR #26508).  
- **Prepare for web UI enhancements**: Hugging Face Hub integration and model compatibility estimation (PRs #27947, #27957) will soon enable better model discovery and deployment planning.

> 💡 *Pro Tip:* For best performance on Apple Silicon, use `--metal-fa-vec` with M1/M1 Ultra. On ROCm, avoid `--ctx-size > 131072` until #27021 is patched.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-01**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its support for advanced multimodal and MoE (Mixture-of-Experts) models, with critical stability fixes for MLX and ROCm backends now in progress. A high-priority regression affecting GPU driver stability on Windows (VIDEO_TDR_TIMEOUT_DETECTED) has been reported between v0.32.15 and v0.33.0, impacting multi-turn inference workflows. Meanwhile, ongoing work on `mlxrunner` and GGUF compatibility aims to improve reliability across diverse hardware configurations.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking changes were published in the last 24 hours. However, users are advised to monitor [PR #18156](https://github.com/ollama/ollama/pull/18156) and [PR #18157](https://github.com/ollama/ollama/pull/18157), which address critical issues in MLX runner behavior and dependency hygiene ahead of future updates.

---

### **3. New Model & Hardware Support**  
- **New model support**: Experimental MLX backend now includes `GraniteForCausalLM` architecture via [PR #17972](https://github.com/ollama/ollama/pull/17972), enabling use of IBM’s Granite 4.1 series models.
- **Hardware/backends**:  
  - AMD ROCm support for MoE models is under active investigation due to crashes on mixed GPU architectures (`gfx1200 + gfx1201`) — see [Issue #18162](https://github.com/ollama/ollama/issues/18162).  
  - MLX runner now supports `qwen3-vl` and other video-capable models in theory, though no input mechanism exists yet — [Issue #18151](https://github.com/ollama/ollama/issues/18151) calls for video input integration.
- **Quantization**: Split GGUF quantizations (e.g., `UD-Q4_K_XL`) continue to face validation issues — see [Issue #18146](https://github.com/ollama/ollama/issues/18146).

---

### **4. Performance & Optimization**  
- **Memory efficiency**: MLX runner exhibits ~0.147 GiB resident memory growth per request, plateauing at ~28.5 GiB — a known leak tracked in [Issue #17924](https://github.com/ollama/ollama/issues/17924).
- **Cache metrics**: The server now reports cached prompt token counts via `/api/generate`, `/api/chat`, and OpenAI-compatible endpoints ([PR #16916](https://github.com/ollama/ollama/pull/16916), [PR #17943](https://github.com/ollama/ollama/pull/17943)) — improving observability for cost-aware inference.
- **Build optimization**: PRs like [18159](https://github.com/ollama/ollama/pull/18159) aim to reduce redundant license file duplication, potentially shrinking image size.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🔴 High | [Issue #18152](https://github.com/ollama/ollama/issues/18152) | GPU driver crash (VIDEO_TDR_TIMEOUT_DETECTED) on Windows + NVIDIA when switching from single-turn to multi-turn requests — regression from v0.32.15 to v0.33.0 | ❌ No fix PR yet; urgent |
| 🔴 High | [Issue #18162](https://github.com/ollama/ollama/issues/18162) | MoE models crash on mixed AMD GPU architectures (gfx1200 + gfx1201) due to ROCm kernel image mismatch | ❌ No fix PR yet |
| 🟡 Medium | [Issue #17778](https://github.com/ollama/ollama/issues/17778) | Qwen 3.8 fails during chat streaming: “no user query found in messages” (500 error) | ⚠️ Partial root cause identified; tool-calling context handling issue |
| 🟡 Medium | [Issue #14493](https://github.com/ollama/ollama/issues/14493) | Qwen 3.5 27B: tool calling non-functional, repetition penalties ignored | ⚠️ Active investigation |
| 🟡 Medium | [Issue #17587](https://github.com/ollama/ollama/issues/17587) | Qwen2.5-3B GGUF outputs garbage ASCII tokens on Chinese input (CPU-only) | ⚠️ Tokenizer mis-detection on Windows |

---

### **6. What This Means for Application Developers**  
- **Avoid v0.33.0 on Windows + NVIDIA** if using multi-turn or long-context workflows — consider downgrading to v0.32.15 until [Issue #18152](https://github.com/ollama/ollama/issues/18152) is resolved.
- **Do not rely on tool calling with Qwen 3.5/3.8** in production until [Issue #14493](https://github.com/ollama/ollama/issues/14493) and [Issue #17778](https://github.com/ollama/ollama/issues/17778) are fixed.
- **Use `max_soft_tokens` parameter** for Gemma 4 vision models once exposed — currently hardcoded; track [Issue #15626](https://github.com/ollama/ollama/issues/15626).
- **Monitor cache metrics** via new `/metrics` and response fields — essential for cost control and performance tuning.
- **Prepare for split-GGUF limitations**: Avoid importing unsloth-quantized `Qwen3.8-Flash-Next` models until [Issue #18146](https://github.com/ollama/ollama/issues/18146) is addressed.
- **Consider CPU-only builds** if bandwidth is constrained — [Issue #14228](https://github.com/ollama/ollama/issues/14228) highlights demand for CUDA-free packages.

> ✅ *Recommendation*: Use `--platform=cpu` or `--platform=mlx` for stable inference on non-NVIDIA systems until ROCm/MoE bugs are patched.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-01**

---

### **1. Today's Highlights**  
The LiteLLM project continues to strengthen its enterprise-grade observability and routing capabilities, with key PRs enabling team-level logging callbacks on passthrough endpoints and fixing critical model alias visibility in `/v2/team/list`. A major focus on stability includes resolving silent failures in `request_timeout` handling and improving credential propagation across vector stores and MCP integrations.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several breaking changes are imminent in the upcoming `v1.99.0` release:  
- **Python 3.13 pinning** in Docker images (PR #39048) may affect users relying on prebuilt images; ensure compatibility with `uvloop` and other C extensions.  
- **Credential handling improvements** (PRs #39045, #39005) now preserve `litellm_credential_name` in UI params even when no credential is selected — a behavioral change that could impact downstream tooling expecting null values.  
- **Runtime-registered callbacks** will now appear in the UI Logging page (PR #38974), enhancing transparency for custom observability setups.

> 🔗 [PR #39048](https://github.com/BerriAI/litellm/pull/39048) | [PR #39045](https://github.com/BerriAI/litellm/pull/39045) | [PR #38974](https://github.com/BerriAI/litellm/pull/38974)

---

### **3. New Model & Hardware Support**  
- **Milvus gRPC support added** via PR #39039, enabling secure, high-throughput vector search for gRPC-only Milvus deployments.  
- **OpenAI Workload Identity Federation (OIDC)** support is under development (Issue #31649), which will allow seamless authentication for cloud-native environments without managing API keys directly.

> 🔗 [PR #39039](https://github.com/BerriAI/litellm/pull/39039) | [Issue #31649](https://github.com/BerriAI/litellm/issues/31649)

---

### **4. Performance & Optimization**  
- **Adaptive token cost arbitrage via Markov-based routing** is proposed (Issue #31555), aiming to dynamically optimize provider selection based on real-time cost, latency, and success rate metrics — potentially reducing inference costs by up to 30% in multi-provider setups.  
- **E2E test automation** for UI flows (PR #39025) will reduce regression risk and improve release velocity, indirectly boosting performance consistency across environments.  
- **Rust interop refactoring** (PR #39026) aims to reduce Python-to-Rust bridge overhead and improve startup time for hybrid applications.

> 🔗 [Issue #31555](https://github.com/BerriAI/litellm/issues/31555) | [PR #39025](https://github.com/BerriAI/litellm/pull/39025) | [PR #39026](https://github.com/BerriAI/litellm/pull/39026)

---

### **5. Stability & Regressions**  
Top stability concerns today:  
1. **`request_timeout` not firing** on silent upstreams (Issue #38358): A streaming request to an upstream that accepts TCP but never sends data will hang indefinitely. *Fix pending* — this is a critical reliability issue for production proxies.  
2. **Bedrock headers missing from `_hidden_params.additional_headers`** (Issue #38357): AWS `x-amzn-RequestId` and other metadata are lost during calls, hindering debugging and audit trails. *Fix PR under review*.  
3. **Gemini reasoning content leaks into output_text** (Issue #36929): When `reasoning.effort=medium|high`, non-JSON content appears in `output_text`, breaking strict `json_schema` parsing. *High severity for structured output apps*.  
4. **Model access groups leaking into `/v1/models`** (Issue #25550): Non-existent models still expose access group names, exposing internal policy details. *Fix PR pending*.  

> 🔗 [Issue #38358](https://github.com/BerriAI/litellm/issues/38358) | [Issue #38357](https://github.com/BerriAI/litellm/issues/38357) | [Issue #36929](https://github.com/BerriAI/litellm/issues/36929) | [Issue #25550](https://github.com/BerriAI/litellm/issues/25550)

---

### **6. What This Means for Application Developers**  
- **Use `litellm_credential_name` carefully**: The latest UI changes mean credentials are preserved even if not selected — validate your logic around fallback behaviors.  
- **Monitor timeouts and upstream silence**: If using long-running or streaming requests, ensure `request_timeout` is properly configured and tested, as it may not trigger on silent backends.  
- **Enable per-team observability early**: With team-level logging callbacks now supported on passthrough routes (PR #38979), you can enforce consistent monitoring across teams without duplicating config.  
- **Avoid untrusted model aliases**: The `/v1/models` response leak (Issue #25550) exposes access policies — avoid exposing this endpoint publicly in production.  
- **Plan for OIDC and gRPC migration**: Future-proof your infra by preparing for OpenAI Workload Identity (Issue #31649) and Milvus gRPC (PR #39039).

> ✅ Pro Tip: Use the new automated UI tests (PR #39025) to validate your own deployment workflows before upgrade.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-01**

---

### **1. Today’s Highlights**  
The Unsloth project continues its rapid evolution with a strong focus on **security hardening**, **multi-model compatibility**, and **cross-platform stability**. Key developments include the introduction of OS-level sandboxing for tool execution (via bubblewrap/Seatbelt), critical fixes for AMD ROCm GPU support (including BF16 detection and training crashes), and ongoing efforts to stabilize model loading across GGUF, MLX, and Ollama integrations. A new PR introduces Swedish locale support, signaling continued global usability expansion.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The codebase remains stable, with ongoing refinements in CI/CD, security, and UX improvements.

---

### **3. New Model & Hardware Support**  
- **Qwen3.8-Flash-Next-GGUF**: Not yet supported due to `qwen4exp` architecture not being recognized by `llama.cpp` — issue #10015 is open.
- **MLX Models**: Real context length now derived from model config (PR #8125), fixing hardcoded 4096-token limit.
- **AMD ROCm (gfx1032/gfx1200/gfx1201)**: Critical fixes merged (#7682, #8791) addressing BF16 false positives and training GPU selection failures.
- **Ollama Integration**: Broken schema handling and incorrect `source` tagging persist (#9986); multiple PRs aim to unify inventory stacks (#10051).
- **Deepseek & Qwen**: Model load issues observed on desktop and studio; regression tracking ongoing.

---

### **4. Performance & Optimization**  
- **Memory Efficiency**: Studio now reports actual GPU visibility via `nvidia-smi`, not just PyTorch-detectable devices (PR #9858).
- **Kernel Optimization**: On AMD gfx1200, SDPA fallback to math kernel causes 66.54 GiB memory spike during video inference (Issue #8225). Fix requires flash attention or memory-efficient kernels.
- **Prompt Cache**: MLX prompt cache not reused with Qwen3.8-27B due to `ArraysCache` layout mismatch (Issue #10031).
- **Inference Speed**: Ongoing work to optimize `llama.cpp` integration with proper `--fit-target` control (PR #4882).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Related PR(s) |
|--------|------|--------|--------------|
| 🔴 High | **Studio SQLite deadlock under concurrent DB access** → backend unresponsive | Open (#10022) | N/A |
| 🔴 High | **Tool call arguments concatenated into malformed JSON string** → 400 errors in thread replay | Closed (#9807) | Fixed in internal build |
| 🔴 High | **AMD gfx1032 training crash** due to false `bf16` support | Open (#7922) | Fixed via PR #7682 |
| 🟡 Medium | **Ollama models incorrectly tagged and excluded from inventory** | Open (#9986) | In progress |
| 🟡 Medium | **Deepseek model triggers unintended download** | Open (#10047) | N/A |
| 🟡 Medium | **Intermittent multi-turn determinism failure in CI** | Open (#10004) | N/A |

> *Note: Several regressions are tied to platform-specific behavior (ROCm, Windows, macOS), indicating active cross-platform testing.*

---

### **6. What This Means for Application Developers**  
- **Security**: Use of `bubblewrap`/`Seatbelt` (PR #7101) means LLM-driven tools now run in isolated sandboxes—ideal for production agents. However, verify that your custom tool scripts don’t rely on system-wide access.
- **Model Portability**: Expect tighter integration with `llama.cpp` and Ollama, but validate model compatibility manually until `qwen4exp` and `mlx` context-length fixes land.
- **GPU Reliability**: If deploying on AMD ROCm (especially gfx1032), ensure you’re using the latest `unsloth` + `torch` builds with PR #7682 applied to avoid silent BF16 crashes.
- **Developer UX**: Feature requests like **search within chat** (#10036), **Markdown formatting** (#10067), and **VS Code integration** (#10052) signal growing demand for richer UIs—consider contributing to these if building agent workflows.
- **Deployment**: The new `--lan-port` setting (PR #10082) enables predictable LAN access; use it instead of relying on auto-ports in headless deployments.

👉 [View Issues](https://github.com/unslothai/unsloth/issues) | [View Pull Requests](https://github.com/unslothai/unsloth/pulls)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*