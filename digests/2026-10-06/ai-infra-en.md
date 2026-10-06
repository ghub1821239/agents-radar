# AI Infrastructure Digest 2026-10-06

> Generated: 2026-10-06 02:29 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-06**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q4 2026 is defined by a sharp bifurcation between **high-performance, GPU-optimized serving engines** and **lightweight, portable runtime frameworks**, with growing convergence around multimodal, speculative, and distributed inference. vLLM, SGLang, and llama.cpp are pushing the envelope on raw throughput and low-latency execution across NVIDIA Blackwell, AMD MI350X/MI355X, and mobile SoCs, while Ollama and LiteLLM focus on developer experience and operational reliability for agent workloads. The rise of MLA (Multi-Layer Attention), MoE, and hybrid vision-language models is accelerating hardware-specific kernel optimizations and model-specific stability fixes.

---

### **2. Activity Comparison**

| Project       | Open Issues | Open PRs | Recent Release | Status |
|---------------|-------------|----------|----------------|--------|
| **vLLM**      | 98          | 127      | v0.31.0        | ✅ Active |
| **SGLang**    | 103         | 142      | None           | ⚠️ Active |
| **llama.cpp** | 106         | 134      | v0.6.0         | ✅ Active |
| **Ollama**    | 115         | 120      | None           | ⚠️ Patching |
| **LiteLLM**   | 89          | 112      | v1.104.1       | ✅ Maintenance |

> 🔍 *Insight*: vLLM and llama.cpp lead in release velocity; SGLang shows highest PR volume despite no new release—indicating deep feature development. Ollama is in post-release stabilization mode with high issue load.

---

### **3. Model Support Race**

| New Model / Architecture     | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|-------------------------------|------|--------|-----------|--------|---------|
| **DeepSeek-V4.1-Flash**       | ✅ (SM100 + NVFP4) | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash (320B)**      | ✅ (WIP: degeneration issues) | ✅ (DCP support) | ✅ (full support) | ⚠️ Regression | ❌ |
| **Qwen3.8-2.4T-A95B (gfx950)**| ⚠️ (ROCm tracking) | ✅ (DCP + FP8) | ❌ | ❌ | ❌ |
| **Kimi-K3 Quark (FP8/MXFP4)** | ❌ | ✅ (fusion path) | ❌ | ❌ | ❌ |
| **MoE Models (Qwen3.5/3.6, Gemma-4)** | ⚠️ (limited) | ✅ (DCP + CP) | ✅ (MoE fusion) | ❌ | ✅ (PR #12742) |
| **Clef Decision Model (Vision+Text)** | ❌ | ❌ | ✅ (vision input) | ❌ | ❌ |
| **Speculative MTP Drafts**    | ✅ (Qwen3.8-flash-next) | ❌ | ✅ (mtp-Qwen3.8-Flash-Next-Q8_0.gguf) | ❌ | ❌ |

> 🏁 **Winner**: **llama.cpp** leads in **multimodal & speculative model support**; **SGLang** excels in **distributed architecture readiness** (CP, DCP); **vLLM** dominates **NVIDIA Blackwell optimization**.

---

### **4. Performance Frontier**

| Optimization Focus             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|----------------------------------|------|--------|-----------|--------|---------|
| **KV Cache Compression (NVFP4)** | ✅ (default SM100) | ⚠️ (ROCm WIP) | ❌ | ❌ | ❌ |
| **Context Parallelism (CP/DCP)** | ❌ | ✅ (Prefill CP, DCP) | ❌ | ❌ | ❌ |
| **Batching & Throughput**        | ✅ (FlashMLA, DeepGEMM) | ✅ (shared-pool I/O) | ✅ (multi-sequence matmul) | ✅ (SDPA on CUDA) | ✅ (concurrency fix) |
| **Quantization (FP8/MXFP4)**     | ✅ (NVFP4) | ✅ (Kimi-K3 fusion) | ✅ (Hexagon pooling) | ❌ | ❌ |
| **Edge/SoC Acceleration**        | ❌ | ❌ | ✅ (Hexagon HMX, Snapdragon) | ❌ | ❌ |
| **Memory Efficiency (Diffusion)**| ❌ | ✅ (tiered AdaLN cache) | ❌ | ❌ | ❌ |

> 🔥 **Key Trend**: **Kernel-level specialization** (FlashMLA, Triton attention, HMX matmul) is now central to performance gains. **Distributed inference** (CP, DCP) and **edge acceleration** are emerging frontiers beyond just throughput.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Key Differentiator |
|---------------|-------------------------------|--------------------|
| **vLLM**      | **Inference Engine (GPU-native)** | Optimized for NVIDIA Blackwell; defaults to FlashMLA, NVFP4, DeepGEMM |
| **SGLang**    | **Distributed Serving Framework** | Focus on disaggregated, context-parallel inference; strong ROCm/AMD support |
| **llama.cpp** | **Local Runtime (Cross-platform)** | True portability: CPU, Hexagon, Vulkan, CUDA; ideal for edge/multimodal apps |
| **Ollama**    | **Model Gateway / Developer CLI** | Unified interface for local inference; MLX engine for macOS performance |
| **LiteLLM**   | **API Gateway / Cost Manager** | Central routing, budgeting, cost tracking; critical for production orchestration |

> 💡 **Strategic Insight**: vLLM and SGLang are competing for the **high-end serving layer**; llama.cpp owns **edge/local deployment**; Ollama bridges **local dev-to-production**; LiteLLM governs **cost-aware orchestration**.

---

### **6. Trend Signals**

1. **Hardware-Specific Optimization is Now Table-Stakes**  
   - vLLM’s default SM100 + NVFP4 KV cache for DeepSeek-V4.1-Flash signals that **Blackwell-native tuning is non-negotiable** for competitive latency.
   - SGLang’s ROCm 10.1 and DCP support for AMD GPUs shows **AMD ecosystem maturity** is accelerating.

2. **Speculative Inference & MTP Are Moving from Research to Production**  
   - Multiple projects (vLLM, llama.cpp, SGLang) now support MTP draft models → **faster generation at lower cost** is becoming standard.

3. **Distributed Serving Is No Longer Optional**  
   - Context parallelism (CP/DCP) is actively being implemented in SGLang and vLLM — **scaling large models across multi-GPU clusters** is now a core requirement.

4. **Stability > Speed in Production Environments**  
   - High-severity regressions in Ollama (`glm-ocr`, `clef-flash`), LiteLLM (`silent image loss`), and SGLang (`scheduler crashes`) indicate that **reliability is the next bottleneck** after raw performance.

5. **Agent-Centric Design Is Driving UI & API Evolution**  
   - Unsloth’s focus on prompt retention and LoRA template preservation reflects a shift toward **agent workflow integrity** over pure inference speed.

> ✅ **Developer Action Items**:  
> - Prioritize **vLLM or SGLang** for high-throughput, multi-GPU LLM agents on Blackwell/AMD.  
> - Use **llama.cpp** for edge, mobile, or multimodal apps requiring cross-platform portability.  
> - Leverage **LiteLLM** for cost-controlled, scalable inference fleets.  
> - Avoid **production use of unstable models** (e.g., GLM-5.3-Flash, Qwen3.8-flash-next) until regressions are resolved.  
> - Monitor **disaggregated serving APIs** (vLLM `/derender`, SGLang RFCs) — future changes may break existing workflows.

---  
*Generated: 2026-10-06 | Source: GitHub digests from vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-06**

---

#### **1. Today's Highlights**  
The vLLM **v0.31.0** release introduces significant performance improvements for **DeepSeek-V4.1-Flash**, now defaulting to **SM100-optimized FlashMLA with NVFP4 compressed KV cache** and **DeepGEMM sparse MQA logits**. This marks a major step in optimizing high-throughput inference on next-gen NVIDIA Blackwell GPUs. Meanwhile, active work continues on **disaggregated serving**, with new RFCs and bugfixes targeting `derender`, `render`, and `KVConnector` endpoints.

> 🔗 [v0.31.0 Release](https://github.com/vllm-project/vllm/releases/tag/v0.31.0)

---

#### **2. Releases & Breaking Changes**  
- **v0.31.0**: The latest release includes **717 commits from 307 contributors**, with key changes:  
  - SM100 becomes the default for DeepSeek-V4.1-Flash via **FlashMLA mega attention + NVFP4 KV cache compression** (#56935).  
  - **DeepGEMM sparse MQA logits** enabled for indexer performance gains (#56254).  
  - No breaking API changes reported; backward compatibility preserved.

> 🔗 [Release Notes](https://github.com/vllm-project/vllm/releases/tag/v0.31.0)

---

#### **3. New Model & Hardware Support**  
- **Model Support**:  
  - **GLM-5.3-Flash** now under active optimization (Issue #57406), with ongoing fixes for long-decode degeneration (#56868) and gibberish at low concurrency on ROCm (#59413).  
  - **Qwen3.8-2.4T-A95B (gfx950 / MI355X)**: Performance optimization tracker launched (#57149).  
  - **Kimi-K2.6-nvfp4** and **Qwen3.8-flash-next** have open issues related to model loading and speculative decoding acceptance rates (#45647, #59642).  

- **Hardware & Backend**:  
  - **ROCm (gfx950 / MI355X)**: Active kernel tuning and support for Qwen3.8-2.4T-A95B, including Triton kernel fallback logic (#60055).  
  - **NVIDIA GB10 (DGX Spark)**: Weight loading perf issue identified due to per-tensor H2D copies from mmap views (#58726).  
  - **Rust Frontend**: Still experimental but feature parity roadmap underway (#44280).

> 🔗 [GLM-5.3 Issues](https://github.com/vllm-project/vllm/issues/56868) | 🔗 [ROCm Qwen3.8 Optimization](https://github.com/vllm-project/vllm/issues/57149)

---

#### **4. Performance & Optimization**  
- **DeepSeek-V4.1-Flash**:  
  - **FlashMLA mega attention** + **NVFP4 KV cache** now defaults on SM100 → improved throughput and memory efficiency.  
  - **DeepGEMM sparse MQA logits** reduce indexing overhead.

- **Kernel & Memory Optimizations**:  
  - **Small Engram lookups** sped up using two-row tiles (vs. 16-row path) → **+0.11% throughput** on balanced pairs (#57893).  
  - **DFlash metadata rebuilds skipped** during full graph replay when safe → reduces decode latency (#54485).  
  - **Triton attention**: Preserves small FP8 softmax weights via reversible scaling → avoids underflow corruption (#60156).  
  - **FlashInfer autotune table preloaded** on weight daemon → faster startup for reused models (#60085).

> 🔗 [Engram Lookup Perf](https://github.com/vllm-project/vllm/pull/57893) | 🔗 [DFlash Metadata Skip](https://github.com/vllm-project/vllm/pull/54485)

---

#### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix PR? |
|--------|------|-------------|--------|
| 🚨 Critical | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash long-decode degeneration after accumulated reasoning decode (W4A16 quantized) | ❌ Pending |
| 🚨 Critical | [#59642](https://github.com/vllm-project/vllm/issues/59642) | Qwen3.8-flash-next has 0% MTP acceptance rate in disaggregated PD serving | ❌ Pending |
| ⚠️ High | [#59413](https://github.com/vllm-project/vllm/issues/59413) | GLM-5.3-Flash outputs gibberish at low concurrency (ROCm) | ❌ Pending |
| ⚠️ High | [#53670](https://github.com/vllm-project/vllm/issues/53670) | EAGLE/MTP prefix-cache last-block drop causes 1,648-token recompute → ~30–40% batch loss | ✅ [PR #52244](https://github.com/vllm-project/vllm/pull/52244) |
| ⚠️ Medium | [#49497](https://github.com/vllm-project/vllm/issues/49497) | FlashInfer sampler JIT crashes if `nvcc` not found (no fallback) | ❌ Pending |
| ⚠️ Medium | [#46796](https://github.com/vllm-project/vllm/issues/46796) | DeepSeek-V4-Flash fails to start on B300 (invalid argument in sm100_tf32_hc_prenorm_gemm) | ❌ Pending |

> 🔗 [Critical GLM-5.3 Degeneration](https://github.com/vllm-project/vllm/issues/56868)

---

#### **6. What This Means for Application Developers**  
- **For high-throughput LLM apps**: Upgrade to **v0.31.0** to leverage **DeepSeek-V4.1-Flash optimizations** on SM100 GPUs — expect better latency and memory efficiency. Use `--kv-cache-dtype fp8` + `--enable-sleep-mode` for cost-effective long-context serving.  
- **For disaggregated agents**: Be cautious with **`/inference/v1/generate`** and **`derender`** endpoints — recent RFCs suggest future output formatting changes. Monitor #56851 and #42729 for spec updates.  
- **For quantized models**: Avoid W4A16 GLM-5.3 until #56868 is resolved. Watch for **Qwen3.8-flash-next** MTP acceptance issues in production.  
- **For developers on ROCm**: Expect instability with GLM-5.3 and Qwen3.8-2.4T-A95B; use nightly builds with explicit Triton checks.  
- **Future-proofing**: Consider contributing to **Rust frontend parity (#44280)** or **fast-track merging for model optimizations (#59665)** if building agent systems requiring low-latency, high-concurrency inference.

> 🔗 [Rust Frontend Roadmap](https://github.com/vllm-project/vllm/issues/44280) | 🔗 [Fast-Track Merging RFC](https://github.com/vllm-project/vllm/issues/59665)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-06

---

### **1. Today's Highlights**  
SGLang continues its aggressive push toward next-gen inference efficiency with major progress on **context parallelism (CP)** and **ROCm/AMD support**, particularly for DeepSeek-V4 and GLM-5 models. Critical stability fixes were merged for diffusion workflows and LoRA handling, while a new PR introduces **shared-pool streaming I/O** to reduce memory pressure in large-scale multimodal generation.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The project remains focused on feature development and stability improvements ahead of Q4 2026 milestones.

---

### **3. New Model & Hardware Support**  
- ✅ **ROCm 10.1 support** (`PR #42699`, `#42016`) — WIP AMD integration targeting ROCm 10.1, enabling future deployment on MI350X and Blackwell-class GPUs.
- ✅ **Decode Context Parallel (DCP) for GLM-5 / DeepSeek-V3.2** (`PR #42618`) — Reduces KV cache duplication across TP ranks; crucial for scaling MLA models on multi-GPU systems.
- ✅ **Kimi-K3 Quark FP8/MXFP4 fusion** (`PR #41794`) — Optimized weight merging path for Kimi-K3’s MLA projection route, improving throughput on AMD platforms.
- ✅ **SM12.x GPU support** (`PR #30705`) — Full runtime compatibility now confirmed for RTX PRO 6000 Blackwell (sm_121), DGX Spark GB10, and upcoming RTX 50xx cards.

> 🔗 [PR #42699](https://github.com/sgl-project/sglang/pull/42699) | [PR #42618](https://github.com/sgl-project/sglang/pull/42618)

---

### **4. Performance & Optimization**  
- ⚙️ **Prefill Context Parallelism (CP)**: On track for 2026 Q3 completion (`Issue #21788`). Already supports MLA models (Dpsk v3/Kimi-K2.5), SWA, and allreduce fusion. Work in progress for MHA/GQA backends like FlashInfer/TRTLLM-MHA (`Issue #31732`).
- 📈 **Kimi-K3 Projection Kernel Optimization**: Per-weight cached launcher reduces per-call overhead from ~100μs to near-zero at bs=1, 1024-token prefill (`PR #42698`).
- 💾 **Diffusion Memory Efficiency**:  
  - Shared-pool streaming I/O via `O_DIRECT` + host-memory debug aids (`PR #37680`)  
  - Read-only mapping of checkpoints to avoid redundant host copies (`PR #37822`)  
  - Tiered AdaLN cache reduces resident memory by up to 24.2 GiB per GPU (`PR #35623`)
- 🧠 **MoE Fusion Optimization**: Work underway to enable shared-to-sparse experts fusion for Qwen3.5/Qwen3.6 MoE on SM120 (`Issue #33706`).

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|------------|
| 🔴 High | [`#42508`](https://github.com/sgl-project/sglang/issues/42508) | Scheduler crashes with `double free or corruption` in idle-loop invariant check → permanent server hang | ❌ Open |
| 🔴 High | [`#42465`](https://github.com/sgl-project/sglang/issues/42465) | DeepSeek-V4 + HiCache `write_through` deadlocks under concurrent long prefills | ❌ Open |
| 🔴 High | [`#41939`](https://github.com/sgl-project/sglang/issues/41939) | GLM-5.3-Flash NVFP4 loops indefinitely in reasoning mode on B200/B300 | ❌ Open |
| 🟡 Medium | [`#42074`](https://github.com/sgl-project/sglang/issues/42074) | ~5% decode slowdown after #39704 on GB300 | ❌ Open |
| 🟡 Medium | [`#35884`](https://github.com/sgl-project/sglang/issues/35884) | `/health` handler leaks orphaned requests due to uncancelled scheduler-side request | ❌ Open |

> ⚠️ All high-severity issues are actively being investigated. No known fix PRs yet.

---

### **6. What This Means for Application Developers**  
- **Optimize for context parallelism early**: If you’re deploying large MLA models (e.g., Kimi-K3, Dpsk v3), plan for Prefill CP (`--prefill-cp-size`) and monitor `Issue #21788` for rollout updates.
- **Use `--enable-hierarchical-cache` cautiously**: Recent deadlock reports suggest potential race conditions in `write_through` mode — test thoroughly under burst load.
- **Leverage optimized AMD paths**: With ROCm 10.1 and DCP support now active, developers targeting MI350X or Blackwell GPUs should migrate to `PR #42618` and `#42699` branches for better scalability.
- **Avoid static LoRA merging on quantized models**: Use `--lora-merge-mode auto` only when base weights are not already quantized (per `PR #35975`); otherwise, use dynamic merging to prevent crashes.
- **Monitor health checks**: The `/health` endpoint can cause resource exhaustion if left unchecked — consider tuning timeout behavior or applying mitigation patches.

> 💡 Pro tip: For diffusion apps using MiniMax-H3, enable tiered AdaLN caching (`PR #35623`) and stream mapped weights (`PR #37680`) to cut GPU memory usage by over 20 GiB per GPU.

---  
*Digest generated: 2026-10-06 | Source: [sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-06**

---

### **1. Today's Highlights**  
The release of **v0.6.0** marks a major leap in multimodal and speculative inference capabilities, introducing `llama_batch_ext` for mixed token/embedding inputs and full support for the 320B GLM-5.3-Flash (GLM5-Next) model, Clef decision model (text + vision), and MTP spec. Concurrently, Hexagon backend enhancements unlock HMX acceleration for multi-sequence matmuls and 1D/2D pooling—critical for Gemma 4 image encoders—while Vulkan and CUDA stability fixes address out-of-bounds writes and GPU memory leaks.

---

### **2. Releases & Breaking Changes**  
- **v0.6.0**: Introduces `llama_batch_ext` API with `llama_process`, enabling mixed embedding/token batches and deepstack state handling.  
  - [GitHub Release](https://github.com/ggml-org/llama.cpp/releases/tag/v0.6.0)  
  - Migration note: Existing batch APIs may require updates to leverage new extended input semantics.  
- **API Change**: `server_batch::token::pos` now supports multi-dimensional indexing; `input_attn_causal` is moved to private scope.  
  - PR: [#29969](https://github.com/ggml-org/llama.cpp/pull/29969)

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - ✅ **GLM-5.3-Flash (GLM5-Next)** 320B hybrid model (supports MTP spec).  
  - ✅ **Clef Decision Model** (vision + text modality via `server: support vision input`).  
  - ✅ **Qwen3.8-Flash-Next** series with MTP draft models (e.g., `mtp-Qwen3.8-Flash-Next-Q8_0.gguf`).  
- **Hardware Backends**:  
  - ✅ **Hexagon (Qualcomm QCS610/QCS410)**: Adds 1D/2D pooling (`pool_1d`, `pool_2d`) and HMX matmul support for non-multiple-of-32 row counts.  
    - PRs: [#29995](https://github.com/ggml-org/llama.cpp/pull/29995), [#29779](https://github.com/ggml-org/llama.cpp/pull/29779)  
  - ✅ **Vulkan (Intel Arc A770)**: Fixes shmem OOB write in Flash Attention and stale prealloc_y reuse.  
    - PR: [#29988](https://github.com/ggml-org/llama.cpp/pull/29988), [#29591](https://github.com/ggml-org/llama.cpp/pull/29591)  
  - ✅ **CUDA**: Optimized `mmq` accumulation for NVFP4 type; fix for `alloc_deps` batch independence.  
    - PRs: [#29857](https://github.com/ggml-org/llama.cpp/pull/29857), [#29986](https://github.com/ggml-org/llama.cpp/pull/29986)  

---

### **4. Performance & Optimization**  
- **Hexagon**:  
  - Flattened 3D matmuls into 2D to enable HMX acceleration on n_seqs > 1 → up to **~25% speedup** in multi-sequence inference (measured on Snapdragon 8 Gen 3).  
  - Pooling pipeline rewrites improve DMA pipelining and boundary handling → reduces latency by ~18% in CLIP-based image processing.  
- **Vulkan**:  
  - RMSNorm optimization using subgroup reductions → **~12% decode throughput gain** on Intel B70 Arc Pro (vs. b11370).  
  - PR: [#29882](https://github.com/ggml-org/llama.cpp/pull/29882) (WIP)  
- **CUDA/ROCm**:  
  - Head-parallel flash_attn partitioning in row-split mode → better core utilization across multicore setups.  
  - PR: [#29974](https://github.com/ggml-org/llama.cpp/pull/29974)  
  - MMQ tuning for AMD GCN arch → targeted improvements for `stream_k` and quant config selection.  
  - PRs: [#30022](https://github.com/ggml-org/llama.cpp/pull/30022), [#30021](https://github.com/ggml-org/llama.cpp/pull/30021)  

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - **CUDA Flash Attention OOB Write**: Fixed in #29988 (Vulkan); affects long-running decode on A770 GPUs.  
  - **GPU Memory Leak**: Reported in #29526 — Vulkan backend degrades after ~7–8 hours, producing empty EOS replies.  
  - **Multi-GPU Crash**: #26837 — crashes when using `--sm tensor` on 3+ GPUs (reproducible on RTX 3090s).  
- **Unresolved Issues**:  
  - #29811: Assertion failure at startup with Qwen3.8-Flash-Next + MTP draft model.  
  - #28753: `ggml_backend_sched_alloc_splits` reallocation crash under high load (AMD Ryzen + Intel Arc).  
  - #24440: Fatal error in `fattn.cu:579` after editing system message (Gemma 4 31B + MTP + `-sm tensor`).  
- **Fixes Merged**:  
  - #29986: CUDA `alloc_deps` made batch-independent → resolves context leak risk.  
  - #29995: Hexagon pool op support → enables Gemma 4 vision encoder.  

---

### **6. What This Means for Application Developers**  
- **Multimodal Apps**: Use `llama_batch_ext` + `server: support vision input` to build agents that process images alongside text (e.g., Clef or Gemma 4).  
- **Speculative Inference**: Leverage `mtp-Qwen3.8-Flash-Next-Q8_0.gguf` with `--spec-type draft-mtp` for faster, lower-latency generation.  
- **Edge Deployment**: Hexagon optimizations enable efficient inference on mobile SoCs (Snapdragon 8 Gen 3) for low-power edge AI.  
- **Production Stability**: Avoid `--sm tensor` on 3+ GPUs until #26837 is resolved; monitor Vulkan servers for long-running decode degradation.  
- **Tooling**: Expect improved tool-call grammar parsing (PR #29915) and future support for `target_bpw_type` quantization (PR #15550) for precise model size control.  

> 🔗 **Key Resources**:  
> - [v0.6.0 Release Notes](https://github.com/ggml-org/llama.cpp/releases/tag/v0.6.0)  
> - [Hexagon Pooling & Matmul PRs](https://github.com/ggml-org/llama.cpp/pulls?q=is%3Amerged+label%3A%22ggml%22+label%3A%22Hexagon%22)  
> - [Vulkan & CUDA Stability Fixes](https://github.com/ggml-org/llama.cpp/issues?utf8=%E2%9C%93&q=labels%3Abug+updated%3A%3E2026-10-05)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-06**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with focused improvements in MLX engine stability and performance, particularly around GPU memory residency and speculative decoding. Critical regressions affecting `glm-ocr`, `clef-flash`, and `Muse Glimmer 30B GGUF` models were reported today, alongside ongoing issues with model loading under mixed quantization and streaming API correctness. A key PR mitigates high latency after GPU idle on macOS by enforcing periodic residency refreshes.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, users are advised to monitor for potential breaking changes following recent updates:
- **`glm-ocr:latest` regression in v0.35.1**: Model now returns plain text instead of structured HTML tables due to internal template handling or parsing drift.
- **`clef-flash` (Q8_0, 9.1B)**: Fails on `/v1/systemone` endpoint with "non-finite logit" (CUDA) or "cannot open model" (CPU), despite working on `/v1/chat/completions`.
- **`Muse Glimmer 30B-GGUF`**: Fails to respond entirely when run via `ollama run`, likely due to Jinja template conflicts in model card metadata.

> 🔗 [Issue #18810](https://github.com/ollama/ollama/issues/18810) | [Issue #18769](https://github.com/ollama/ollama/issues/18769) | [Issue #18808](https://github.com/ollama/ollama/issues/18808)

---

### **3. New Model & Hardware Support**  
- **MLX Engine**: Added support for **Kolibri 1** (PR #18780).  
- **CUDA / Metal Optimization**: Enhanced SDPA kernel usage for `gemma4` models on CUDA with wide head dimensions (PR #18809), improving prefill speed significantly (~12x on e2b, ~2–4x on 12b).
- **AMD GPU Support (Windows)**: Expanded ROCm compatibility list in docs to include `gfx1200`, `gfx1201` (PR #18804), enabling broader AMD GPU use on Windows.

> 🔗 [PR #18780](https://github.com/ollama/ollama/pull/18780) | [PR #18809](https://github.com/ollama/ollama/pull/18809) | [PR #18623](https://github.com/ollama/ollama/pull/18623)

---

### **4. Performance & Optimization**  
- **LLM Prefill Speedup**: `gemma4` models now leverage MLX’s native SDPA on CUDA for wide head dimensions (>128), reducing prompt processing latency by up to **12x** on e2b environments.
- **Memory & Latency Mitigation**: PR #18807 introduces a one-second residency refresh for MLX models on macOS, preventing weight paging after idle periods — directly addressing #18744.
- **Request Overhead Reduction**: PR #18806 reduces model lookup and decision request overhead by reusing Metal scratch buffers and avoiding unnecessary manifest decodes.

> 🔗 [PR #18809](https://github.com/ollama/ollama/pull/18809) | [PR #18807](https://github.com/ollama/ollama/pull/18807) | [PR #18806](https://github.com/ollama/ollama/pull/18806)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|--------|
| ⚠️ High | `clef-flash` fails on `/v1/systemone` (first forward pass) | Open (#18769) | No fix yet |
| ⚠️ High | `glm-ocr` regression in v0.35.1: loops, plain text output | Open (#18810) | No fix yet |
| ⚠️ High | `Muse Glimmer 30B-GGUF` produces no response | Open (#18808) | No fix yet |
| ⚠️ Medium | `llama-server` wedges on full-cache-hit task → hangs all future requests | Open (#18685) | No fix yet |
| ⚠️ Medium | Per-layer quantization overrides ignored in MLX import → shape mismatch | Open (#18789) | No fix yet |
| ✅ Low | `OLLAMA_KEEP_ALIVE`/`LOAD_TIMEOUT` integer overflow risk | Fixed (#18800) | [PR #18800](https://github.com/ollama/ollama/pull/18800) |

> 🔗 [Issue #18769](https://github.com/ollama/ollama/issues/18769) | [Issue #18810](https://github.com/ollama/ollama/issues/18810) | [Issue #18808](https://github.com/ollama/ollama/issues/18808) | [Issue #18685](https://github.com/ollama/ollama/issues/18685) | [Issue #18789](https://github.com/ollama/ollama/issues/18789) | [PR #18800](https://github.com/ollama/ollama/pull/18800)

---

### **6. What This Means for Application Developers**  
- **Streaming APIs are fragile**: Be cautious with `responses` streaming — current behavior may reorder outputs and reuse `output_index`, violating strict stream semantics (see #18798). Use `chat/completions` unless you need fine-grained control.
- **Tool call handling is inconsistent**: `qwen3.6` tool calls may fail if parsed by `qwen3.5` parser; avoid mixing versions unless explicitly supported. PR #18802 aims to improve partial tag tolerance.
- **Model-specific quirks matter**: `clef-flash` and `glm-ocr` should be avoided in production until fixes land. Monitor `systemone` endpoint behavior carefully.
- **MLX on macOS requires resilience**: Due to automatic weight unpinning after 2 seconds (PR #18807), expect higher latency after idle periods — consider warm-up strategies or keep models active.
- **Avoid long timeouts**: Integer overflow in `OLLAMA_LOAD_TIMEOUT` and `KEEP_ALIVE` can cause unintended short timeouts (fixed in #18800); prefer durations in nanoseconds or use envconfig validation.

> 🔗 [PR #18804](https://github.com/ollama/ollama/pull/18804) | [PR #18802](https://github.com/ollama/ollama/pull/18802) | [PR #18807](https://github.com/ollama/ollama/pull/18807) | [PR #18800](https://github.com/ollama/ollama/pull/18800)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-06**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem saw a wave of critical stability and cost accounting fixes, particularly around model routing, budgeting, and response handling under concurrent load. Key PRs addressed race conditions in `/v1/messages`, corrected spend misattribution for non-streaming requests, and fixed silent data loss in vision tool messages. A new `self_serve_budget_policy` opt-in feature empowers key owners to manage their own budgets, enhancing operational autonomy.

---

### **2. Releases & Breaking Changes**  
No new releases were published in the last 24 hours. However, four dependency refreshes were cut across stable branches:  
- `v1.101.5` (stable/1.101.x)  
- `v1.102.3` (stable/1.102.x)  
- `v1.103.4` (stable/1.103.x)  
- `v1.104.1` (stable/1.104.x)  

These are patch-level updates focused on locking down minimal, compatible versions of Python and dashboard dependencies. No breaking changes expected—only maintenance.  
👉 [PR #44773](https://github.com/BerriAI/litellm/pull/44773), [PR #44775](https://github.com/BerriAI/litellm/pull/44775), [PR #44776](https://github.com/BerriAI/litellm/pull/44776), [PR #44777](https://github.com/BerriAI/litellm/pull/44777)

---

### **3. New Model & Hardware Support**  
None reported today. The focus remains on refining existing backends rather than expanding hardware or model support.

---

### **4. Performance & Optimization**  
- **Latency & Concurrency**: A critical fix was merged to prevent `dictionary changed size during iteration` errors during high-concurrency `/v1/messages` calls, which previously caused 500 errors despite successful spends.  
  👉 [PR #44748](https://github.com/BerriAI/litellm/pull/44748)  
- **Cost Accounting Accuracy**: Fixes ensure `input_cost_per_character` is now properly honored for TTS deployments, preventing zero-cost responses with no `x-litellm-response-cost` header.  
  👉 [PR #44200](https://github.com/BerriAI/litellm/pull/44200)  
- **Model Group Pricing**: Routing logic now correctly prices model groups based on the actual serving deployments, not aliases—preventing over-budget rejections due to incorrect pricing chains.  
  👉 [PR #44732](https://github.com/BerriAI/litellm/pull/44732)

---

### **5. Stability & Regressions**  
Top stability issues reported today:  
1. **Silent image loss in DeepSeek vision tools** – Image content from `role=tool` messages is dropped silently due to incorrect `is_vision_forwardable_content` logic.  
   🔴 Severity: High (data loss risk)  
   👉 [Issue #44211](https://github.com/BerriAI/litellm/issues/44211)  
2. **Non-streaming request cancellation failure** – When clients disconnect, upstream work continues uncancelled, leading to wasted compute and billing.  
   🔴 Severity: High  
   👉 [Issue #37140](https://github.com/BerriAI/litellm/issues/37140)  
3. **Gemini TTS billed twice** – Due to synchronous speech provider being called twice via `run_in_executor`.  
   🔴 Severity: High (financial impact)  
   👉 [Issue #44546](https://github.com/BerriAI/litellm/issues/44546)  
4. **Pass-through endpoint registry grows unbounded** – Causes CPU to spike to 100% under idle conditions.  
   🔴 Severity: Medium-High  
   👉 [Issue #26081](https://github.com/BerriAI/litellm/issues/26081)  

All these issues have associated PRs in progress or merged.

---

### **6. What This Means for Application Developers**  
- **Avoid silent data loss**: If using `role=tool` with vision models (e.g., DeepSeek), validate that images are preserved—this bug may silently drop input.  
- **Ensure accurate cost tracking**: Use deployment-level `input_cost_per_character` only if you’re confident about its propagation—recent fixes confirm it’s now respected.  
- **Handle disconnections gracefully**: For long-running non-streaming requests, implement client-side timeouts; the proxy does not yet cancel upstream work when disconnected.  
- **Leverage new self-service features**: Enable `self_serve_budget_policy` to let users manage their own 24h budget windows without admin intervention.  
- **Monitor concurrency patterns**: Be cautious with `/v1/messages` at scale—race conditions were recently exposed and patched.

> ✅ **Action Item**: Upgrade to latest stable release (`v1.104.1` or later) to benefit from critical stability fixes, especially if running production inference at scale.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-06**

---

### **1. Today's Highlights**  
Unsloth continues to expand its support for advanced model architectures and fine-tuning workflows, with critical PRs landing to fix prompt retention in embedding models and preserve chat templates during LoRA export on Mac. The UI is undergoing refinement for mobile usability and desktop download behavior, while performance improvements for MoE models (Qwen3.5/3.6, Gemma-4) under `fast_inference=True` are now being actively implemented.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking changes were published. However, several high-priority PRs address long-standing issues in model handling and UI consistency, particularly around `fast_inference`, LoRA preservation, and file metadata integrity.

---

### **3. New Model & Hardware Support**  
- ✅ **MoE Model Support**: PR #12742 enables `fast_inference=True` for Qwen3.5/3.6 MoE (`qwen3_5_moe`) and Gemma-4 MoE (`gemma4`) with LoRA applied to expert layers—previously blocked by vLLM allowlist restrictions.  
- 📌 **Intel GPU Support**: Issue #8931 highlights ongoing demand for native Intel GPU (non-Vulkan) integration via `llama.cpp`. No official support yet, but community interest remains strong.  
- 🔗 [PR #12742](https://github.com/unslothai/unsloth/pull/12742): Add MoE model support in fast inference pipeline.

---

### **4. Performance & Optimization**  
- ⚡ **MoE Inference Acceleration**: Fast inference now supports expert-layer LoRAs on MoE models, unlocking significant speedups via vLLM offloading. This is a major step toward scalable, efficient Mixture-of-Experts inference.  
- 📈 **Mobile Sidebar UX**: PR #12806 improves mobile experience by showing the close button in narrow-screen sidebars—critical for accessibility and usability on smaller devices.  
- 💾 **Download Behavior Fix**: PR #12808 resolves silent download failures in the desktop app by using the OS-native save dialog instead of raw `<a download>` anchors.  
- 🔗 [PR #12806](https://github.com/unslothai/unsloth/pull/12806), [PR #12808](https://github.com/unslothai/unsloth/pull/12808)

---

### **5. Stability & Regressions**  
- 🔴 **Critical Prompt Loss in Embedding Models**: PR #12795 addresses a regression where `FastSentenceTransformer` dropped built-in prompts (e.g., `EmbeddingGemma`'s `"task: search result | query: "`) during fine-tuning, leading to training with no context. Fixed in latest PR.  
- 🔴 **LoRA Template Corruption on Mac**: PR #12794 fixes a severe bug where LoRAs trained on base models (e.g., Qwen3 0.6B Base) lost their chat templates when exported or used in Chat—causing “An internal error occurred” due to mismatched tokenizers.  
- 🔴 **Context Usage Visibility**: Issue #9327 reports users hitting context limits without knowing consumption—no live counter exposed via API. A feature request pending.  
- 🔥 **Web Search Failures**: Issue #12638 reports `primp h2_client connection reset` errors in v0.1.902-beta, affecting web search functionality.  
- 🔗 [PR #12795](https://github.com/unslothai/unsloth/pull/12795), [PR #12794](https://github.com/unslothai/unsloth/pull/12794), [Issue #12638](https://github.com/unslothai/unsloth/issues/12638)

---

### **6. What This Means for Application Developers**  
- **Use `fast_inference=True` with MoE models safely**: With PR #12742, developers can now leverage vLLM acceleration for Qwen3.5/3.6 MoE and Gemma-4 MoE with expert LoRAs—ideal for low-latency, high-throughput inference in agents.  
- **Preserve prompt fidelity in fine-tuned models**: Always verify that `prompts["query"]` and chat templates survive merge/fine-tune steps—this is now fixed upstream. Avoid relying on default tokenizers if your base model has custom templates.  
- **Enhanced UI reliability**: Desktop app downloads and mobile interactions are now more predictable thanks to native OS dialogs and improved sidebar controls—reduce user friction in production apps.  
- **Monitor context usage**: Until API exposes real-time context tracking (per #9327), implement client-side logging to prevent unexpected truncation.  

> 🔗 *For developers building LLM agents*: Prioritize testing with fine-tuned LoRAs on macOS and mobile, as recent PRs (#12794, #12795) directly impact workflow stability across platforms.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*