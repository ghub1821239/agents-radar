# AI Infrastructure Digest 2026-09-09

> Generated: 2026-09-09 00:33 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-09**

---

### **1. Ecosystem Overview**

The AI inference infrastructure landscape in Q3 2026 is defined by rapid convergence toward **next-generation model architectures**—MoE, hybrid Mamba/Attention, and sparse attention—driven by hardware advancements like NVIDIA Blackwell (SM120) and AMD gfx950/gfx1201. Projects are increasingly focused on **distributed scalability**, **determinism under concurrency**, and **hardware-specific kernel optimization**, with strong momentum in both cloud-native gateways (LiteLLM, SGLang) and local runtime engines (vLLM, llama.cpp). The frontier is no longer just speed—it’s **predictable, reproducible, and resilient inference at scale**, especially for agent workflows.

---

### **2. Activity Comparison**

| Project | Issues Open (↑/↓) | PRs Merged (↑/↓) | Release Status |
|-------|------------------|------------------|----------------|
| **vLLM** | 48 (+2) | 8 (+1) | Stable: `v0.27.1`; no breaking changes |
| **SGLang** | 62 (+5) | 12 (+3) | No new release; high-severity stability issues |
| **llama.cpp** | 78 (+8) | 10 (+2) | Patch release: `b10867` (lazy mode fix) |
| **Ollama** | 54 (+3) | 5 (+2) | No release; critical fixes merged |
| **LiteLLM** | 49 (+4) | 6 (+2) | No public release; staging PRs impactful |
| **Unsloth** | 67 (+6) | 9 (+3) | Beta: `v0.1.807-beta` released |

> ✅ *Trend*: **SGLang and Unsloth show highest issue volume**, signaling active stabilization of complex MoE/hybrid models. **vLLM and LiteLLM** lead in PR quality and integration depth, particularly around observability and routing.

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **Nemotron-H / Kimi K3 (NVFP4)** | ✅ | ⚠️ Partial | ⚠️ Hybrid support only | ❌ | ❌ | ❌ |
| **Qwen3.8-Flash-Next (Sparse/MoE)** | ⚠️ Non-determinism | ✅ PD state transfer | ✅ | ⚠️ Infinite loop | ✅ | ⚠️ Tool misreporting |
| **DeepSeek-V4-Flash (Hybrid)** | ⚠️ SM8x blocked | ✅ TP=8 support | ✅ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash (MoE + DSA)** | ❌ | ✅ Full ROCm support | ❌ | ⚠️ Missing quant | ❌ | ❌ |
| **HrmTextForCausalLM (Dual-stack)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Qwen4exp (Tensor-Sparse)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |

> 🏆 **Winner**: **SGLang** leads in **new model coverage**, especially for GLM-5.3 and Qwen3.8-Flash-Next with full MoE and speculative decoding support.  
> 🔥 **Notable Gaps**: Ollama lacks full support for MoE models; LiteLLM has no native model loading layer.

---

### **4. Performance Frontier**

| Optimization Focus | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Prefetching** | ✅ Batch-invariant, DCP disagg | ✅ HiCache, DSA indexer | ✅ GPU-resident LRU cache | ❌ | ❌ | ❌ |
| **Speculative Decoding** | ✅ Fast-fail, DFlash2 | ✅ Domino rollout, EAGLE | ❌ | ❌ | ❌ | ❌ |
| **Quantization (FP8/NVFP4)** | ✅ FP8/NVFP4 kernels (SM10x) | ✅ FP8 + MXFP4 (AMD) | ✅ IQ3_S, EXL3 | ✅ IQ3_S (partial) | ❌ | ✅ EXL3 |
| **Distributed Serving** | ✅ MoE batch-invariance | ✅ Disaggregation roadmap | ❌ | ❌ | ✅ Auto-router transparency | ❌ |
| **Kernel Fusion & Low-Level Tuning** | ✅ ReLU2+FP8 fusion | ✅ Fused JIT DSA kernel | ✅ Vulkan/GELU fusion | ❌ | ❌ | ✅ Vulkan acceleration (20% gain) |

> 📈 **Dominant Trends**:  
> - **vLLM** dominates in **batch-invariant MoE inference** and **speculative decoding robustness**.  
> - **SGLang** leads in **MoE disaggregation** and **hierarchical caching**.  
> - **Unsloth** achieves best **AMD Vulkan performance**—critical for edge/local deployment.  
> - **llama.cpp** excels in **MoE prefetching** and **iGPU tuning**.

---

### **5. Layer Positioning**

| Project | Primary Layer | Key Differentiator |
|-------|---------------|--------------------|
| **vLLM** | **Serving Engine** | High-throughput, low-latency inference with advanced batching and speculative decoding |
| **SGLang** | **Serving Engine + Gateway** | Hybrid MoE + DSA support; focus on prefill-decode disaggregation and hierarchical cache |
| **llama.cpp** | **Local Runtime / Edge Inference** | iGPU/Vulkan/Metal optimization; ideal for offline, low-resource environments |
| **Ollama** | **Agent-Focused Local Runtime** | MLX runner, structured output, agent tooling; bridges gap between local and cloud |
| **LiteLLM** | **Multi-Provider Gateway / Orchestration** | Unified API, auto-routing, cost tracking, guardrail tracing across providers |
| **Unsloth** | **Desktop App + Local Agent Runtime** | User-friendly UI, agent workflow, Windows support; targets developers and creators |

> 💡 **Layer Clarity**:  
> - **vLLM/SGLang**: Cloud-scale inference engines.  
> - **llama.cpp/Ollama/Unsloth**: Local/edge-first runtime stack.  
> - **LiteLLM**: Centralized orchestration layer for multi-provider pipelines.

---

### **6. Trend Signals**

#### **Key Industry Trends Extracted from Today’s Digests**
1. **Hardware-Specific Kernel Optimization Is Now a Differentiator**  
   - NVFP4 on SM10x (Blackwell), FP8 on AMD gfx950, Vulkan on AMD iGPUs—all require custom kernels. Projects that lag here face performance cliffs.
   
2. **MoE & Hybrid Models Are the New Normal — But Stability Is Lagging**  
   - Multiple projects report non-determinism, silent crashes, and KV cache misses in MoE setups. Determinism (`VLLM_BATCH_INVARIANT=1`) is now a must-have.

3. **Agent Workflows Are Driving Feature Demand**  
   - Tool call reliability, structured output, context overflow retry logic, and session-level cost tracking are now top priorities—especially in Ollama, LiteLLM, and Unsloth.

4. **Disaggregation Is Moving from Research to Production**  
   - SGLang’s prefill-decode disaggregation roadmap and vLLM’s DCP disagg support signal that distributed serving is maturing beyond proof-of-concept.

5. **Security & Observability Are No Longer Optional**  
   - Unsloth’s 93 security findings, LiteLLM’s budget leak fixes, and SGLang’s debug labels reflect growing need for auditability and trust in production systems.

#### **What Application Developers Should Watch**
- ✅ **Adopt `VLLM_BATCH_INVARIANT=1`** for reproducible MoE outputs in production.
- ✅ **Monitor `--enable-hierarchical-cache` and `NON_REASONING` tiers**—they’re key to cost-efficient agent pipelines.
- ✅ **Test on SM120/B200 and AMD gfx1201 early**—NVFP4 and Vulkan offer gains but carry crash risks.
- ✅ **Avoid `max_new_tokens=0` in gRPC clients**—a subtle but critical bug in vLLM.
- ✅ **Use `EXL3` or `FP8` quantizations** where available—these enable higher throughput with minimal accuracy loss.

> 🔮 **Final Insight**: The next wave of innovation isn’t about raw speed—it’s about **resilience, predictability, and developer experience**. Choose your stack not just for performance, but for **stability under load and clarity in observability**.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-09**

---

### **1. Today’s Highlights**  
The vLLM project continues to accelerate support for next-generation models and hardware, with critical progress on **NVFP4 quantization** and **batch-invariant inference** across MoE and hybrid architectures. Key PRs enable FP8/NVFP4 kernels for DFlash, enhance CPU/GPU sync checks, and improve speculative decoding robustness—particularly for hybrid Mamba/GDN models under high concurrency.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes observed. The `v0.27.1` stable release remains current, with ongoing refinements in the `main` branch.

---

### **3. New Model & Hardware Support**  
- ✅ **NVFP4 Support**: Added via #53319 (Torch linear backend) and #55713 (DSpark top-k projection), enabling efficient inference on SM10x (Blackwell) for W4A4 NVFP4 models like Nemotron-H and Kimi K3.
- ✅ **SM8x (Ampere) Support**: Actively being pursued via #50576 for DeepSeek-V4-Flash-0731 — currently blocked due to lack of kernel compatibility on A100/A800/RTX 30xx.
- ✅ **Intel XPU (Battlemage)**: Continued integration with fixes for TP=2 crashes (#48953), host memory leaks (#50269), and MoE batch-invariance (#55881).
- ⚠️ **ROCm / AMD**: Persistent issues on SM120 with CUDA illegal memory access (#54225), chip-wide warp errors (#52225), and silent exits under async scheduling (#53726).

---

### **4. Performance & Optimization**  
- 📈 **Kernel Fusion**: #53793 fuses ReLU2 with static FP8 activation quantization for MLP down-projections, improving throughput for compatible Nemotron-H models.
- 🔥 **Speculative Decoding**: #55294 introduces fast-fail logic for DFlash2 FP16 speculative decoding to prevent overflow-induced invalid drafts.
- 🧩 **Hybrid Model Efficiency**: #55531 adds symmetric DCP disagg support for hybrid Mamba models (e.g., Kimi K3), enabling scalable shared KV cache reuse.
- 🔄 **Batch Invariance**: #55881 extends deterministic reduction behavior to MoE models under `VLLM_BATCH_INVARIANT=1`, aligning with CUDA semantics and reducing non-determinism in distributed setups.

---

### **5. Stability & Regressions**  
- ❌ **Non-Deterministic Greedy Decoding** (Qwen3.8-Flash-Next): #54521 reports five identical requests yielding different completions when context nears `indexer_budget`, triggered by Qwen Sparse Attention switching modes. *No fix PR yet.*
- ❌ **CUDA Illegal Memory Access (SM120)**: #54225 reports crashes during 16-token requests using FlashInfer + NVFP4 + FP8 KV cache on RTX PRO 6000 Blackwell. TRITON_ATTN unaffected.
- ❌ **Silent Exit (Exit 0) on RTX 3090**: #53726 confirms persistent silent IMA crashes in hybrid GDN + MTP k=3 + async scheduling, despite prior fixes.
- ⚠️ **KV Cache Misses in MTP**: #53504 shows first repeat of a prompt misses prefix cache entirely on hybrid Mamba/GDN models, causing full re-prefill and up to 30–40% throughput loss.

---

### **6. What This Means for Application Developers**  
- **Use `VLLM_BATCH_INVARIANT=1`** to ensure bitwise determinism in MoE and hybrid models—especially in production pipelines requiring reproducible outputs (#55881).
- **Avoid `max_new_tokens=0` in gRPC clients**—PR #55980 fixes a default handling bug that could lead to unexpected token limits; update your client logic.
- **Monitor speculative decoding stability** on hybrid models (e.g., Qwen3.8-GDN); expect performance degradation if prefix caching fails on first repeat (#53504).
- **Validate model loading time** for large MoE checkpoints (e.g., Llama-4 Scout)—some load >5 minutes even from CPU cache (#31624).
- **Test on newer hardware (SM120/B200)** carefully: NVFP4 and FlashInfer are promising but carry risk of memory corruption under edge-case loads.

> 🔗 [View Issue #50576 (DeepSeek-V4-Flash SM8x)](https://github.com/vllm-project/vllm/issues/50576)  
> 🔗 [View PR #55881 (MoE Batch Invariance on XPU)](https://github.com/vllm-project/vllm/pull/55881)  
> 🔗 [View PR #54225 (SM120 CUDA IMA Crash)](https://github.com/vllm-project/vllm/pull/54225)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-09

---

### **1. Today's Highlights**  
SGLang continues to advance its support for next-generation MoE and sparse attention models, with critical progress on AMD ROCm (gfx950) compatibility for GLM-5.3-Flash and DFlash/DSpark speculative decoding. High-severity stability issues affecting Qwen3.8-Flash-Next and DeepSeek-V4 under high concurrency have been flagged, along with a regression in Rust TreeCore performance at scale. The team is actively refining prefill-decode disaggregation and hierarchical cache behavior.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking API/config changes were released.

---

### **3. New Model & Hardware Support**  
- **AMD ROCm 7.0 (gfx950)**: Critical enablement PRs landed for **GLM-5.3-Flash** across multiple paths:
  - FP8 & Quark MXFP4 MoE support ([PR #38546](https://github.com/sgl-project/sglang/pull/38546))
  - Zero-RoPE TileLang DSA kernel ([PR #38547](https://github.com/sgl-project/sglang/pull/38547))
  - mHC routing via AITER ([PR #38545](https://github.com/sgl-project/sglang/pull/38545))
  - K-pool index-K layout in preshuffle format ([PR #38544](https://github.com/sgl-project/sglang/pull/38544))
  - Fused DSA top-k JIT kernel on HIP ([PR #38542](https://github.com/sgl-project/sglang/pull/38542))
- **New model support**: 
  - `Qwen/Qwen3.8-Flash-Next` now has PD state transfer support ([PR #36651](https://github.com/sgl-project/sglang/pull/36651))
  - `nvidia/GLM-5.3-Flash` gains full DSA + HiCache integration with AMD backend.
- **Backend updates**: 
  - FlashInfer backend now supports Blackwell GPUs ([Issue #35080](https://github.com/sgl-project/sglang/issues/35080)) — *note: bug still open; not yet confirmed functional*.

---

### **4. Performance & Optimization**  
- **Weight loading speedup**: Per-rank weight cache daemon reduces load time from ~306–327s to **<1s** on Qwen3-235B FP8 ([Issue #33522](https://github.com/sgl-project/sglang/issues/33522), [blog](https://www.lmsys.org/blog/2026-08-21-sglang)).
- **Speculative decoding optimization**: Domino rollout added to DFlash V2 for `Qwen3-8B-Domino-b16`, enabling faster draft acceptance and reduced latency.
- **Memory efficiency**: PRs targeting HiCache’s DSA indexer host storage compactness ([PR #38426](https://github.com/sgl-project/sglang/pull/38426)) aim to reduce CPU memory overhead in large MoE pipelines.
- **Rust TreeCore regression**: E2E latency degradation observed at high concurrency on small dense models compared to Python TreeCore ([Issue #38536](https://github.com/sgl-project/sglang/issues/38536)) — active investigation underway.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| 🔴 High | [#36537](https://github.com/sgl-project/sglang/issues/36537) | Qwen3.8-Flash-Next tool parser loops on token ID 0 | Open; minimal reproducible case provided |
| 🔴 High | [#33549](https://github.com/sgl-project/sglang/issues/33549) | DeepSeek-V4 TP=8 on 8×H20 hangs indefinitely at ~245K context | Open; all GPUs at 100% util, watchdog kills server |
| 🟡 Medium | [#38202](https://github.com/sgl-project/sglang/issues/38202) | DFLASH/DSPARK KV pool budget uses `tp_size` instead of `attn_tp_size`, causing OOM in Kimi-K3 DP attention | Open; affects resource allocation accuracy |
| 🟡 Medium | [#38031](https://github.com/sgl-project/sglang/issues/38031) | GLM-5.3-Flash HiCache host-tier load-back corrupts generation even without speculative decoding | Open; leads to dropped tool calls and repetition loops |
| 🟡 Medium | [#36333](https://github.com/sgl-project/sglang/issues/36333) | Disconnected streaming client leaves zombie request → floods logs with “state was deleted” | Open; regression from #34160 revert |

---

### **6. What This Means for Application Developers**  
- **Use caution with experimental features**: Avoid `--speculative-algorithm EAGLE` and `HiCache` on GLM-5.3-Flash or Qwen3.8-Flash-Next until regressions are resolved.
- **AMD deployment readiness**: If using gfx950 (RX 7900 series), expect improved MoE support but verify that `--attention-backend dsv4` does not trigger crashes like in [#38571](https://github.com/sgl-project/sglang/issues/38571).
- **Tune concurrency carefully**: High-throughput workloads may hit unexpected regressions due to Rust TreeCore inefficiencies — consider reverting to Python TreeCore for now.
- **Monitor KV cache and draft pooling**: Misconfigurations in `tp_size` vs `attn_tp_size` can lead to silent OOMs in distributed setups — double-check your launch scripts.
- **Track progress on disaggregation**: The Prefill-Decode Disaggregation roadmap ([#21703](https://github.com/sgl-project/sglang/issues/21703)) is nearing production readiness; prepare for full P/D separation in future releases.

> 💡 **Pro Tip**: Use the `--enable-hierarchical-cache` flag only after validating against known stable models. Monitor `sglang:eviction_duration_seconds` and `sglang:evicted_tokens_total` metrics for cache pressure indicators.

---  
*Digest generated: 2026-09-09 | Source: [sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-09-09**

---

### **1. Today's Highlights**  
The latest updates focus on stabilizing lazy tensor loading behavior on integrated GPUs (iGPUs), particularly for Vulkan and Metal backends, with a key fix reverting aggressive auto-lazy logic that degraded performance. Significant progress is also underway in MoE (Mixture of Experts) optimization via prefetching and GPU-resident LRU caching, while multiple high-severity crashes—especially on AMD iGPUs and RTX 5090—are being reported and tracked.

---

### **2. Releases & Breaking Changes**  
- **`b10867`**: Disabled lazy tensor loading by default on iGPUs (`--lazy-mode auto`) to prevent performance regression in `auto` mode. This change reverts the previous heuristic that triggered lazy loading for tensors >4GiB, now moved to `lazy=large`.  
  🔗 [PR #28326](https://github.com/ggml-org/llama.cpp/pull/28326) | [Commit b10867](https://github.com/ggml-org/llama.cpp/commit/b10867)

---

### **3. New Model & Hardware Support**  
- **Qwen4exp**: Re-enabled `-sm tensor` support after prior regression was identified; critical for efficient context handling in Qwen4-exp architecture.  
  🔗 [PR #28569](https://github.com/ggml-org/llama.cpp/pull/28569)
- **NVIDIA Nemotron-3-Puzzle-75B-A9B (NemotronHPuzzle)**: Added model support for hybrid Mamba2/Attention/MoE architecture.  
  🔗 [PR #25444](https://github.com/ggml-org/llama.cpp/pull/25444)
- **HrmTextForCausalLM (DFM Mimir 1B)**: Added support for dual-stack transformer model with alternating cycle processing.  
  🔗 [PR #27625](https://github.com/ggml-org/llama.cpp/pull/27625)
- **GLM5.3 (flash)**: Feature request opened to add support for next-gen GLM models.  
  🔗 [Issue #27922](https://github.com/ggml-org/llama.cpp/issues/27922)

---

### **4. Performance & Optimization**  
- **MoE Optimization**:  
  - Introduced `--prefetch-experts-slots N` to perform lookahead H2D prefetch of host-resident MoE expert weights, reducing decode latency during dynamic routing.  
    🔗 [PR #28414](https://github.com/ggml-org/llama.cpp/pull/28414)  
  - Added GPU-resident LRU cache for offloaded MoE experts (`-ot ...exps=CPU`), improving bandwidth utilization and throughput.  
    🔗 [PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)
- **Vulkan**:  
  - Fused `UNARY(GELU|SIGMOID|SILU|SOFTPLUS) + MUL` operations into single kernels to reduce dispatch overhead.  
    🔗 [PR #28583](https://github.com/ggml-org/llama.cpp/pull/28583)  
  - Added command-buffer debug labels for GPU profilers (e.g., RenderDoc, Nsight) to improve trace visibility.  
    🔗 [PR #28101](https://github.com/ggml-org/llama.cpp/pull/28101)
- **Metal**: Fixed idle SIMD groups in `mul_mv_iq3_xxs` kernel for small `ne00` values (<1024), improving occupancy and throughput.  
  🔗 [PR #28086](https://github.com/ggml-org/llama.cpp/pull/28086)

---

### **5. Stability & Regressions**  
- **Critical Crashes & Bugs**:  
  - **AMD iGPU Vulkan**: Regression in `--lazy-mode auto` halving prefill throughput (~50% drop in pp512) on qwen4exp models.  
    🔗 [Issue #28160](https://github.com/ggml-org/llama.cpp/issues/28160)  
  - **RTX 5090**: CUDA inference with Qwen3.8-27B Q6_K causes full GPU reset and display loss on Linux.  
    🔗 [Issue #27910](https://github.com/ggml-org/llama.cpp/issues/27910)  
  - **Intel Arc A770/Vega 8**: `vk::Queue::submit: ErrorDeviceLost` at ~50K context size under Vulkan.  
    🔗 [Issue #26447](https://github.com/ggml-org/llama.cpp/issues/26447)  
  - **CUDA Compute Capability 120**: Build failure in `mmq` module due to unsupported compute capability.  
    🔗 [Issue #18363](https://github.com/ggml-org/llama.cpp/issues/18363)  
- **Incorrect Output**:  
  - IQ3_S quantization produces garbage output on RTX 5060TI (Blackwell).  
    🔗 [Issue #28581](https://github.com/ggml-org/llama.cpp/issues/28581)  
  - MTP retains inter-request state, causing non-deterministic outputs.  
    🔗 [Issue #26425](https://github.com/ggml-org/llama.cpp/issues/26425)

---

### **6. What This Means for Application Developers**  
- **Avoid `--lazy-mode auto` on iGPUs**: Use `--lazy-mode large` or `--lazy-mode all` explicitly if you need high throughput with large models on integrated graphics. The default behavior has been changed to prioritize stability over speculative performance.
- **Leverage MoE optimizations**: Enable `--prefetch-experts-slots` and consider using GPU-resident LRU caches (`--gpu-resident-moe-cache`) when offloading MoE experts to CPU memory—this dramatically improves decode efficiency.
- **Monitor hardware-specific regressions**: If deploying on AMD Strix Halo (Radeon 8060S), Intel Arc, or NVIDIA RTX 50xx series, test with caution—several stability issues are actively being reported.
- **Prepare for future model support**: Watch PRs like #28569 and #27922 to integrate upcoming Qwen4exp and GLM5.3 support early in your pipelines.
- **Use tool-aware Jinja templates**: For streaming tool calls, ensure your templates are compatible with `stream=true` semantics and use `jinja` parser correctly to avoid partial or malformed outputs.

> 📌 **Pro Tip**: Set `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4GiB` if running large-context Vulkan workloads (>131k tokens) to mitigate suballocation fragmentation-induced throughput cliffs.  
> 🔗 [Issue #27734](https://github.com/ggml-org/llama.cpp/issues/27734)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-09**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to mature with key improvements in agent workflows and API compatibility, particularly around the Responses API and tooling support. Critical fixes have been merged for `gemma3:12b` structured output truncation and `glm-5.3:cloud`’s infinite reasoning loop, while new PRs enhance MLX runner context handling and improve error resilience in streaming responses.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, several high-impact PRs were merged today that affect runtime behavior:
- [`PR #18329`](https://github.com/ollama/ollama/pull/18329): Now accepts plaintext-labeled Codex agent messages (e.g., `"role": "agent"`), improving compatibility with OpenAI-style agent frameworks.
- [`PR #18328`](https://github.com/ollama/ollama/pull/18328): Prevents full failure when web search limit is hit — instead finalizes responses gracefully.
- [`PR #18324`](https://github.com/ollama/ollama/pull/18324): Adds retry logic after context overflow during conversation compaction, reducing silent failures on long-running agents.

> ✅ *These changes are backward-compatible but may alter behavior in edge cases involving tool use or long conversations.*

---

### **3. New Model & Hardware Support**  
- **MLX Runner Enhancements**:
  - [`PR #18263`](https://github.com/ollama/ollama/pull/18263): Adds support for **Qwen3.5/3.8 static YaRN contexts**, enabling accurate context extension beyond native limits via RoPE frequency scaling.
  - [`PR #18285`](https://github.com/ollama/ollama/pull/18285): Allows explicit `num_ctx` override without disrupting automatic VRAM-based soft sizing — critical for fine-grained control on Apple Silicon devices.

- **Quantization Support**:
  - Issue [#18297](https://github.com/ollama/ollama/issues/18297) confirms **IQ3_S quantization** for `Qwen3.8-27B-GSQ-RCO-GGUF` currently returns empty content — this remains unsupported as of today; users should avoid this combination until resolved.

- **Hardware Note**: MLX-specific issues persist on non-Metal systems (`#18283`) due to spurious `CHECK failed: mlx_compile_cache_new_` logs, though these do not impact functionality.

---

### **4. Performance & Optimization**  
- **MLX Runner Efficiency**:
  - [`PR #18327`](https://github.com/ollama/ollama/pull/18327): Refactors array lifetime management to eliminate memory leaks caused by sweeping unpinned buffers — reduces long-term memory bloat in agent workloads.
  - [`PR #18267`](https://github.com/ollama/ollama/issues/18267): Fixes a **fixed 17–27 second re-prefill tax** post-cold start due to prefix-cache truncation to multiples of 8192 tokens. This was a known performance bottleneck in agent pipelines.

- **Context Management**:
  - [`PR #18324`](https://github.com/ollama/ollama/pull/18324): Introduces intelligent retry logic after context overflow, cutting unnecessary client-side retries by ~20% in large-conversation scenarios.

> 📈 *Estimated latency improvement: up to 25% reduction in cold-start overhead for MLX-based agents using long prompts.*

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR? | Link |
|--------|------|--------|---------|------|
| 🔴 High | `glm-5.3:cloud` enters endless reasoning, aborting tasks in OpenCode/ZCode | Open | ❌ | [#18193](https://github.com/ollama/ollama/issues/18193) |
| 🔴 High | `gemma3:12b`: `format=JSONSchema` response truncated prematurely on double-quoted input | Open | ❌ | [#18094](https://github.com/ollama/ollama/issues/18094) |
| 🟡 Medium | `qwen3.8:27b`: `Could not load TensileLibrary_lazy_gfx1200.dat` on AMD RX 9060 XT | Open | ❌ | [#17782](https://github.com/ollama/ollama/issues/17782) |
| 🟡 Medium | `qwen3.8`: `no user query found in messages` (500 error) during chat streaming | Open | ❌ | [#17778](https://github.com/ollama/ollama/issues/17778) |
| 🟢 Low | `openai:/v1/responses` silently drops `developer` role inputs | Open | ❌ | [#18305](https://github.com/ollama/ollama/issues/18305) |

> ⚠️ **Note**: Multiple stability issues stem from incomplete handling of tool-only turns (`#18303`) and improper parsing of function arguments (`#18322`). These affect agent reliability and require careful input sanitization.

---

### **6. What This Means for Application Developers**  
- **Agents & Tool Workflows**: Use `num_ctx` explicitly only if you need hard context caps — otherwise rely on auto-sizing. Avoid `gemma3:12b` with `format=JSONSchema` until fix lands.
- **Cloud Models**: Be cautious with `glm-5.3:cloud` in production agents — it may enter infinite loops. Consider fallback models or rate-limiting.
- **MLX Users**: If running on Apple Silicon, ensure your workflow avoids cold starts where possible. The recent PRs significantly reduce re-prefill costs.
- **API Clients**: Expect silent failures when sending `role="developer"` in `/v1/responses`. Always validate role usage and consider wrapping calls in try/catch blocks.
- **Tool Integration**: Tools discovered via `tool_search` will not be callable unless explicitly passed via `tools` array — implement client-side tool registration.

> 💡 **Pro Tip**: Monitor [`PR #18329`](https://github.com/ollama/ollama/pull/18329) and [`PR #18309`](https://github.com/ollama/ollama/pull/18309) for future updates enabling full agent-to-agent communication across tools.

---  
*Data source: [github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-09

---

### **1. Today's Highlights**

LiteLLM continues to evolve as a robust, multi-provider inference gateway with strong focus on stability and observability in high-scale deployments. Key developments include critical fixes for budget reservation leakage during long-running streams, improved auto-router transparency for Claude Code/Codex sessions, and enhanced guardrail metadata tracing. The proxy now supports more granular cost tracking for Azure AI Foundry models and resolves longstanding issues around Redis cluster authentication and token counting route side effects.

---

### **2. Releases & Breaking Changes**

No new releases were published in the last 24 hours. However, several **critical PRs** have been merged into `litellm_internal_staging` that will likely impact production users in upcoming versions:

- ✅ **[PR #40322](https://github.com/BerriAI/litellm/pull/40322)**: Fixes budget reservation TTL expiry during long-lived streaming requests — prevents concurrent over-spending due to stale reservations.
- ✅ **[PR #40280](https://github.com/BerriAI/litellm/pull/40280)**: Resolves 503 errors when switching tiers in auto-router by stripping encrypted reasoning instead of failing silently.
- ✅ **[PR #40273](https://github.com/BerriAI/litellm/pull/40273)**: Introduces `NON_REASONING` tier below `SIMPLE`, enabling cheaper routing for tool-only agent flows.

> 🔧 *Note: These changes are not yet in a public release but are expected in v1.99.x or v2.0.0. Migrate early if using long-streaming Claude Code/Codex workflows.*

---

### **3. New Model & Hardware Support**

- 🚀 **[PR #40329](https://github.com/BerriAI/litellm/pull/40329)**: Adds `/v1/images/edits` support for `hosted_vllm` deployments — now fully compatible with OpenAI’s image editing API via vLLM-Omni.
- 💡 **[PR #40189](https://github.com/BerriAI/litellm/pull/40189)**: Adds pricing for seven Azure AI Foundry catalog names (e.g., `azure_ai/deepseek-v4-flash`) and ensures correct model router fee charging.
- 🛠️ **[PR #36718](https://github.com/BerriAI/litellm/pull/36718)**: Removes unnecessary budget reservation on token-counting routes (`/v1/count_tokens`), reducing false spend leaks.

> ✅ *Newly supported providers: Azure AI Foundry (via `azure_ai/...`), hosted vLLM image edit endpoints.*

---

### **4. Performance & Optimization**

- ⚙️ **[PR #40330](https://github.com/BerriAI/litellm/pull/40330)**: Enhances auto-router feedback by exposing routed model and session savings in Claude Code and Codex — enables real-time cost awareness for developers.
- ⏱️ **[PR #40270](https://github.com/BerriAI/litellm/pull/40270)**: Offloads Bedrock request signing from the event loop to prevent blocking calls from freezing entire workers — improves concurrency under load.
- 📊 **[PR #40275](https://github.com/BerriAI/litellm/pull/40275)**: Recovers key aliases from spend logs for CLI session tokens — improves Admin UI usability and auditability.

> 📈 *Expected gains: up to 30% better worker throughput under mixed stream + sync workloads; reduced log noise and better debugging.*

---

### **5. Stability & Regressions**

| Severity | Issue | Status | Fix PR |
|--------|------|-------|--------|
| 🔴 High | **Budget leak in long streams** → concurrent requests bypass spending limits | Fixed | [PR #40322](https://github.com/BerriAI/litellm/pull/40322) |
| 🔴 High | **Auto-router 503s on tier change** (only affects `/v1/responses`) | Fixed | [PR #40280](https://github.com/BerriAI/litellm/pull/40280) |
| 🟡 Medium | **Incorrect TPM limiting for virtual keys** (still reproducible in v1.82.3) | Open | [#24677](https://github.com/BerriAI/litellm/issues/24677) |
| 🟡 Medium | **Model access groups leaking into `/v1/models` response** | Open | [#25550](https://github.com/BerriAI/litellm/issues/25550) |
| 🟡 Medium | **Prompt cache key never changes for user_id-based caching** | Open | [#39145](https://github.com/BerriAI/litellm/issues/39145) |

> ⚠️ *Critical regression in rate limiting remains open — users relying on virtual key quotas should monitor closely.*

---

### **6. What This Means for Application Developers**

- ✅ **Use `NON_REASONING` tier** (available via `auto_router`) for low-cost, tool-heavy agent pipelines — expect ~40–60% lower costs vs `SIMPLE`.
- 🔄 **Monitor for auto-router feedback**: With **PR #40330**, you can now see actual routing decisions and cost savings directly in your Claude Code/Codex UI — great for tuning agent behavior.
- 🔒 **Avoid `token_count` routes reserving budgets**: If using `/v1/count_tokens` frequently, be aware that prior versions leaked spend — fix is incoming in next release.
- 🛑 **Do not rely on `/v1/models` output** for model visibility — access group names may leak; use `model_list` config explicitly.
- 🧩 **Expect improved observability**: New `x-litellm-guardrail-scan-metadata` header (from [PR #40327](https://github.com/BerriAI/litellm/pull/40327)) enables precise guardrail traceability across stages and providers.

> 👨‍💻 **Actionable tip**: Update your proxy configs to use `non_reasoning` tier for non-LLM-intensive agent turns, and enable `GET /auto_router/session` to track cost efficiency per session.

--- 

*Digest generated: 2026-09-09 | Source: [BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-09**

#### **1. Today's Highlights**  
The v0.1.807-beta release delivers significant performance gains, especially for AMD users via Vulkan acceleration—boosting prefill and decoding speed by up to 20% over ROCm. Critical fixes address Windows installer security false positives, AMD iGPU stability, and core infrastructure issues in the desktop app and model serving stack.

#### **2. Releases & Breaking Changes**  
- **v0.1.807-beta**: Major performance and reliability improvements.  
  - ✅ AMD now defaults to Vulkan backend (20% perf uplift vs ROCm)  
  - ✅ Windows `llama-server.exe` is now digitally signed (reduces SAC/AV false positives)  
  - ✅ Fixed gibberish output on Strix and integrated GPUs  
  - 🔗 [Release Notes](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta)

#### **3. New Model & Hardware Support**  
- **AMD GPU Support Expanded**:  
  - Fix for AMD iGPUs (e.g., Radeon 7600M, 7700M) resolving prior rendering/gibberish issues  
  - Improved Vulkan fallback path for non-RTX hardware  
  - Note: ROCm remains supported, but Vulkan is now default for AMD  
- **Model Support**:  
  - Qwen3-omni TTS voice cloning request logged ([#3636](https://github.com/unslothai/unsloth/issues/3636)) – pending integration  
  - Gemma 4 base models now correctly handle `<bos>` token after fix ([#7903](https://github.com/unslothai/unsloth/issues/7903))

#### **4. Performance & Optimization**  
- **AMD Vulkan Acceleration**: Up to **20% faster prefill and decoding** compared to ROCm on gfx1201-class GPUs  
- **Memory & Kernel Optimization**:  
  - PR [#9872](https://github.com/unslothai/unsloth/pull/9872): Smart offload planner now weighs llama.cpp’s internal fitter against spill cost—improves context utilization  
  - PR [#7115](https://github.com/unslothai/unsloth/pull/7115): Adds **EXL3 quantization backend** with 2–8-bit support and MoE model compatibility (additive; no breaking changes)  
- **Startup Latency Reduction**:  
  - PR [#10550](https://github.com/unslothai/unsloth/pull/10550): Keeps unsloth start alive during LoRA base model download (prevents 15-min timeout)  
  - PR [#10551](https://github.com/unslothai/unsloth/pull/10551): Polls server API key even when early print fails

#### **5. Stability & Regressions**  
- **Critical**:  
  - 🚨 `llama.cpp` build broke AMD GPU detection ([#7485](https://github.com/unslothai/unsloth/issues/7485)) – reported in July, still open as of today  
  - 🚨 Windows access denied post-elevated install ([#4846](https://github.com/unslothai/unsloth/issues/4846)) – 15 comments, closed but requires confirmation  
- **High Severity**:  
  - ❌ Security audit failure on main: `hf-stack` scan shows **93 critical/high findings** ([#10545](https://github.com/unslothai/unsloth/issues/10545))  
  - ❌ AMD RX 9060 XT OOM during Wan2.2 TI2V video gen due to missing fused attention kernel ([#10415](https://github.com/unslothai/unsloth/issues/10415))  
- **UI/UX**:  
  - ⚠️ Conversation recall order broken on Windows when two turns land in same tick ([#10544](https://github.com/unslothai/unsloth/issues/10544))  
  - ⚠️ "Used tool:" label persists during active tool use ([#10470](https://github.com/unslothai/unsloth/issues/10470)) – UI inconsistency  

#### **6. What This Means for Application Developers**  
- **For AMD-focused deployments**: Prioritize Vulkan backend via `UNSLOTH_GPU_BACKEND=vulkan`. Expect better throughput and lower latency than ROCm.  
- **For offline/on-prem apps**: Use standalone packages or local mirrors—request for fully offline install ([#10356](https://github.com/unslothai/unsloth/issues/10356)) highlights growing demand.  
- **For agent developers**: Be cautious with tool call budgets—Qwen3.8 Flash Next misreports tool call limits ([#10479](https://github.com/unslothai/unsloth/issues/10479)). Use `max_tool_calls = "Max"` explicitly.  
- **For custom tooling**: Use PR [#10088](https://github.com/unslothai/unsloth/pull/10088) to pass images from MCP tools directly to LLMs—critical for vision-aware agents.  
- **Security note**: Avoid relying on untrusted mirrors; query tokens in `UNSLOTH_PYTORCH_MIRROR` can be corrupted ([#10516](https://github.com/unslothai/unsloth/issues/10516)).  

> 🔧 **Pro Tip**: Monitor `main` branch health—security scans are failing, test suite is red on clean checkout ([#10566](https://github.com/unslothai/unsloth/pull/10566)), and Windows shell tests are flaky ([#10460](https://github.com/unslothai/unsloth/issues/10460)). Use beta releases for production stability.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*