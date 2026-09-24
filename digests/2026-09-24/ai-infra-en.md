# AI Infrastructure Digest 2026-09-24

> Generated: 2026-09-24 00:51 UTC | Projects covered: 6

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
The AI inference infrastructure landscape in September 2026 is characterized by rapid convergence between high-performance serving engines, lightweight local runtimes, and production-grade LLM gateways. Projects like vLLM and SGLang are pushing the envelope in kernel-level optimization and speculative decoding, while llama.cpp and Unsloth prioritize cross-platform accessibility and low-latency deployment. Ollama and LiteLLM are maturing as unified developer platforms, blending model management, cost control, and agent tooling—reflecting a shift toward end-to-end application enablement. The rise of hybrid architectures (Mamba/GDN), MoE models, and multimodal capabilities underscores growing demand for flexible, efficient, and secure inference stacks.

---

### **2. Activity Comparison**

| Project       | Issues (Open) | PRs (Open) | Releases (Last 24h) | Status |
|---------------|---------------|------------|------------------------|--------|
| **vLLM**      | 87            | 132        | None                   | Stable RC in progress |
| **SGLang**    | 93            | 151        | None                   | High instability in RC |
| **llama.cpp** | 74            | 108        | ✅ `v0.5.0`            | New stable release |
| **Ollama**    | 105           | 127        | 🟡 `v0.34.4-rc1`       | RC with breaking changes |
| **LiteLLM**   | 112           | 149        | None                   | Dev build only |

> *Note: Issue/PR counts based on GitHub activity as of 2026-09-24. LiteLLM shows highest volume due to config complexity and security audits.*

---

### **3. Model Support Race**

| Model / Architecture          | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|
| **Qwen3.8-2.4T-A95B (ROCm)** | ✅ | ✅ (tracking) | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**             | ✅ (attention backend) | ⚠️ (vision broken) | ✅ (via GGUF) | ⚠️ (long-decode issues) | ✅ (FP8 fallback) |
| **Qwen3-VL-Embedding-8B**     | ✅ | ❌ | ❌ | ❌ | ❌ |
| **HRM-Text (DFM Mimir 1B)**   | ❌ | ❌ | ✅ (GGUF) | ❌ | ❌ |
| **MiMo-V2.6 & HunyuanOCR**    | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Gemma4 DSpark Draft**       | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Qwen-Image-2.1 (GGUF)**     | ❌ | ❌ | ❌ | ❌ | ✅ (local support) |
| **Nemotron (MLX)**            | ❌ | ❌ | ❌ | ✅ | ❌ |
| **AMD Ryzen AI NPU (XDNA 2)** | ❌ | ❌ | ❌ | ❌ | ✅ (via Lemonade) |

> **Leader**: **Unsloth** leads in novel model and hardware integration (especially NPU, image models).  
> **Strongest in general-purpose models**: **vLLM** and **llama.cpp** dominate mainstream coverage.  
> **Ollama** excels in MLX-backed model support but lags in broader architecture adoption.

---

### **4. Performance Frontier**

| Optimization Focus         | vLLM                     | SGLang                  | llama.cpp               | Ollama              | LiteLLM             |
|-----------------------------|--------------------------|-------------------------|-------------------------|---------------------|---------------------|
| **KV Cache & Speculative Decoding** | ✅ Multi-step fused decode, prefix checkpointing | ⚠️ `nvfp4` crashes, HiCache issues | ⚠️ Sparse FA regression | ⚠️ MLX stalls | ❌ |
| **Batching & Throughput**   | ✅ Batched grouped prefill (+7.58x) | ✅ Wave-aware split count | ✅ Vulkan RDNA3 int8 kernels | ✅ CPU utilization fix | ❌ |
| **Quantization & Memory**   | ✅ HiSparse MLA, MXFP4 MoE | ✅ FP8 KV cache, MXFP4 kernels | ✅ A8 dp4a, SYCL IQ3_S MMVQ | ✅ VRAM pressure handling | ✅ Cost accuracy via Rust |
| **Kernel-Level Optimizations** | ✅ SM120 split-K adaptive, Triton fusion | ✅ Fused Q/K prep kernel | ✅ CUDA sparse FA, Vulkan cm1 | ❌ | ❌ |
| **Distributed Serving**     | ✅ Stateful agentic session orchestration | ⚠️ HiCache + SSM crash | ❌ | ❌ | ✅ Budget enforcement, team limits |

> **vLLM** remains the performance leader in scalable, stateful inference with advanced caching and speculative decoding.  
> **llama.cpp** leads in platform diversity and low-level kernel tuning across GPU/CPU/NPU.  
> **LiteLLM** is advancing operational excellence through cost accuracy and security hardening.

---

### **5. Layer Positioning**

| Project       | Primary Layer                 | Role Summary |
|---------------|-------------------------------|--------------|
| **vLLM**      | **Serving Engine**            | High-throughput, scalable inference with deep kernel optimizations; ideal for cloud-scale LLM APIs. |
| **SGLang**    | **Serving Engine / Framework** | Experimental, highly modular engine with strong ROCm/H200 focus; best for research and early adopters. |
| **llama.cpp** | **Local Runtime / Edge Inference** | Lightweight, portable, multi-backend runtime; optimized for edge devices, desktop, and offline use. |
| **Ollama**    | **Developer Platform / Gateway** | Unified CLI/tooling layer with model lifecycle management, structured output, and export/import workflows. |
| **LiteLLM**   | **LLM Gateway / Operations Layer** | Production-grade API gateway with budget enforcement, cost tracking, and auditability—critical for regulated environments. |

> **Strategic Differentiation**:  
> - **vLLM/SGLang** = Infrastructure backbone for high-scale deployments.  
> - **llama.cpp** = Foundational runtime for portability and edge.  
> - **Ollama** = Developer experience layer for rapid prototyping.  
> - **LiteLLM** = Operational control plane for cost, compliance, and observability.

---

### **6. Trend Signals**

#### 🔍 **Key Industry Trends from Today’s Activity**
1. **Hybrid Architectures Are Mainstream**  
   Hybrid Mamba/GDN models are now central to vLLM and SGLang development—indicating a shift beyond pure Transformer dominance.
   
2. **Speculative Decoding Is Now a Stability Challenge**  
   Multiple projects report crashes or regressions in speculative decoding (especially `nvfp4`, `GLM-5.3-Flash`)—highlighting that speed gains come at the cost of robustness.

3. **ROCm Momentum Is Accelerating**  
   AMD’s ROCm ecosystem is maturing rapidly: vLLM, SGLang, and llama.cpp all show dedicated optimizations for MI350/MI355X and gfx950/gfx1151, signaling a viable alternative to NVIDIA.

4. **Agent-Centric Optimization Is Rising**  
   Session-centric KV cache coordination (vLLM RFC #48501), prefix checkpointing, and agent skills (Unsloth) reflect a move toward long-running, stateful agent workflows.

5. **Security & Compliance Are Non-Negotiable**  
   LiteLLM’s critical budget bypass issue (#26672) and Ollama’s structured output fixes underscore that production systems demand rigorous validation, cost control, and PII protection.

#### 📌 **What Application Developers Should Watch**
- **Avoid `--block-size` with hybrid Mamba models** until vLLM PR #52244 is released.  
- **Do not deploy speculative decoding on GLM-5.3-Flash or `nvfp4`** without testing for hangs/repetition.  
- **Use `ollama export/import` for air-gapped or secure environments**—this feature is game-changing for compliance.  
- **Enable `--validate_config` in CI/CD for LiteLLM** to prevent silent configuration failures.  
- **Monitor memory fragmentation on Vulkan** (use `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4GiB`).  
- **Prioritize v0.5.0 for llama.cpp** if using router-mode or multi-device setups.

> ✅ **Bottom Line**: The stack is evolving fast—but stability, cost control, and cross-platform consistency remain key differentiators. Choose your tools based on **deployment scale**, **hardware target**, and **operational rigor**.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-24**

---

### **1. Today's Highlights**  
The vLLM project continues to advance its support for hybrid Mamba/GDN models and speculative decoding optimizations, with key PRs landing on prefix caching and multi-step fused decode execution. Critical stability fixes were merged for ROCm (MI355X) KV cache OOM issues and CUDA graph memory accounting, while new RFCs are driving deeper stateful agentic serving capabilities through session-centric KV orchestration.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
- **Pending**: vLLM 0.28.1rc1.dev580+g385dce36b (noted in Issue #56868) remains unstable for GLM-5.3-Flash long-decode workloads.
- **Migration Note**: The `--block-size` parameter behavior in prefix-cache resume logic is under active fix (PR #53142); users of hybrid Mamba models should avoid explicit block size until resolved.

---

### **3. New Model & Hardware Support**  
- **ROCm (AMD)**:  
  - Full support for `Qwen3.8-2.4T-A95B` on gfx950 / MI355X via dedicated performance optimization tracking (Issue #57149).  
  - HiSparse sparse MLA hot-buffering enabled on ROCm (PR #57602), improving memory efficiency for large MoE models.  
  - Fixed `Kimi-K3` TP8 crash on HIP 700 (PR #50347).  
- **Intel GPU (XPU)**:  
  - Improved handling of non-contiguous tensor strides during UVA view creation (PR #54874).  
  - Ongoing issues persist with multi-card inference and host memory reduction (Issues #53119, #50269).  
- **Model Architectures**:  
  - GLM-5.3-Flash now supported with attention backend `Glm5NextTextLinearAttention` (PR #54062).  
  - Qwen3-VL-Embedding-8B now has stable multimodal cache handling (Issue #33865).

---

### **4. Performance & Optimization**  
- **Hybrid GDN/Mamba Prefix Caching**:  
  - PR #55876 introduces batched two-phase grouped prefill execution (+7.58x throughput gain) for shared-prefix scenarios (e.g., agent workflows).  
  - Coordinated checkpointing across producers/consumers via scheduler state machine (PR #55875).  
- **Speculative Decoding**:  
  - PR #58463 removes redundant metadata rebuild during MTP fused multi-step decode — critical for DeepSeek V4 and future models.  
  - PR #53175 re-submits Gemma4 FP8 KV FA4 kernel with head dim 512; resolves perf regression from special token emission.  
- **Kernel-Level Optimizations**:  
  - PR #58482 implements occupancy-adaptive split-K segment count for SM120 (Blackwell), dynamically adjusting from 16 to 64 segments to maximize SM utilization.  
  - PR #51406 enables fused QK-norm+RoPE+gate Triton kernel for Qwen3-Next/Qwen3.5, reducing kernel launch overhead.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| ⚠️ High | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash long-decode degeneration after accumulated reasoning decode | Open; tracked in RC build |
| ⚠️ High | [#58031](https://github.com/vllm-project/vllm/issues/58031) | FlashInfer autotune hangs forever on SM103 (GB300) due to missing PTX in cubin | Root cause withdrawn; ongoing investigation |
| ⚠️ Medium | [#53142](https://github.com/vllm-project/vllm/issues/53142) | Illegal memory access on prefix-cache resume with explicit `--block-size` | PR #52244 fixes hybrid GDN case; pending broader validation |
| ⚠️ Medium | [#53130](https://github.com/vllm-project/vllm/issues/53130) | Scheduler permanently stops admitting requests after `max_num_seqs` reached | Open; symptoms suggest internal state corruption |
| ⚠️ Low | [#58029](https://github.com/vllm-project/vllm/issues/58029) | Whisper `verbose_json` silently drops words at chunk boundaries | Open; impacts long audio transcription accuracy |

---

### **6. What This Means for Application Developers**  
- **Agentic Workflows**: Expect significant improvements in prompt reuse and context sharing via upcoming session-centric KV cache coordination (RFC #48501) and prefix checkpointing (PRs #55875–#55876). Use `--enable-prefill-checkpointing` cautiously until stable.  
- **Tool Calling & Streaming**: Consider enabling parser cache for streaming derender (Issue #57571) to stabilize tool call IDs across retries.  
- **Production Deployment**: Avoid `--block-size` when using hybrid Mamba models until PR #52244 is released. Monitor GLM-5.3-Flash long-decode jobs closely (Issue #56868).  
- **Cross-Platform**: ROCm support is maturing rapidly—test AMD MI355X deployments with MoE models using `MXFP4` quantization (PR #58483). Intel GPU support remains fragile; expect memory bloat and multi-card instability.  

> 🔗 *Explore PRs and issues directly: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-24**

---

### **1. Today's Highlights**  
The SGLang project continues advancing its dLLM serving roadmap with new work on speculative decoding, hierarchical caching, and cross-backend compatibility. Key developments include a major PR to unify MoE routing logic and several critical fixes for FP8 KV cache and DFLASH/DSPARK memory management—especially impacting H200 (SM90) and AMD MI350/MI355X deployments.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking API/config changes were released. However, ongoing efforts are focused on aligning internal event schemas with vLLM (`#39991`) and stabilizing `--incremental-streaming-output` behavior (`#40901`).

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Support**: Active development for GLM-5.3-Flash on ROCm 7.x with MI350/MI355X; recent PRs optimize indexing kernels (`#34394`, `#40878`).  
- **New Model Roadmaps**:  
  - *Qwen3.8-Flash-Next*: Progress on kernel optimization and FP8 indexer support (`#38731`).  
  - *SenseNova-U1/U1.5*: Tracking integration via official OpenSenseNova repo (`#37742`).  
  - *Kimi-K3 EP32*: Identified issues with MegaMoE inference (`#40751`).  
- **Multi-modal**: Inkling now properly returns HTTP 400 on invalid image input instead of 500 (`#40897`).  

---

### **4. Performance & Optimization**  
- **AMD ROCm**:  
  - Fused Q/K prep into single aiter kernel reduces decode overhead by ~11 kernels per layer (`#34394`).  
  - Wave-aware split count optimization improves fp8 unified_kv decode scalability on MI355X (`#40878`).  
- **NVIDIA**:  
  - Updated CUDA 13.4 image with latest deepgemm, deep-ep, and sgl-kernel versions (`#40987`).  
  - MXFP4 MoE kernel optimized for small batches (1–40 tokens/rank) on gfx950 (`#40204`).  
- **CPU**: Fixed VLA model RoPE handling on CPU (`#40139`).  
- **General**:  
  - Added `--gsp-input-ids` flag to skip tokenization in benchmarks (`#40900`).  
  - Unified MoE router GEMM layer to reduce precision drift (`#38695`).  

---

### **5. Stability & Regressions**  
High-severity stability issues reported today:  
- **Critical**: `--attention-backend trtllm_mha` on H200 (SM90) returns incorrect completions despite appearing functional (`#40921`).  
- **Severe**: HiCache + hybrid SSM/Mamba fails with `cudaHostRegister` error, aborting entire instance (`#40926`).  
- **Regressions**:  
  - GLM-5.3-Flash vision broken due to pinned `transformers==5.12.1` lacking `glm5_next` support (`#39831`).  
  - Speculative decoding crashes with `nvfp4` KV cache due to `extend_prefix_lens_cpu is None` (`#36010`).  
  - DeepSeek chunked-prefix prefill silently loses accuracy due to base-2 vs natural-log LSE mismatch (`#40903`).  
  - Severe repetition in GLM-5.3 with DFLASH speculative decoding (`#40843`).  

*Note: No fix PRs have been merged yet for these regressions.*

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding** on `nvfp4` and `GLM-5.3-Flash` until `#36010` and `#40843` are resolved.  
- **Avoid `trtllm_mha` on H200 (SM90)** for large models like `gpt-oss-120b`—use `flashinfer` or `pytorch` backend instead.  
- **Leverage `--gsp-input-ids`** in benchmarks to isolate server-side performance from tokenization overhead.  
- **Expect instability when using hybrid SSM/Mamba with HiCache** until `#40926` is patched.  
- **Monitor CI status** (`#17050`) for flaky tests and infrastructure issues affecting deployment reliability.  

> 🔗 [GitHub Issues](https://github.com/sgl-project/sglang/issues) | [Pull Requests](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-24**

---

### **1. Today's Highlights**  
The `v0.5.0` release delivers a major leap in backend stability and model coverage, with key improvements to CUDA, Vulkan, and Metal performance. Critical fixes address server crash risks during sleep/wake cycles and token counting, while new support for HRM-Text (DFM Mimir 1B), MiMo-V2.6, HunyuanOCR, and Gemma4 DSpark drafts expands the project’s multimodal and low-latency inference capabilities.

---

### **2. Releases & Breaking Changes**  
- **`v0.5.0` released** ([GitHub](https://github.com/ggml-org/llama.cpp/releases/tag/v0.5.0))  
  - Includes breaking changes in server routing logic and HTTP binding behavior; see [changelog](https://github.com/ggml-org/llama.cpp/blob/main/CHANGELOG.md) for migration guidance.  
  - Multi-address HTTP binding now supported via `--host` list syntax (e.g., `--host 0.0.0.0,127.0.0.1`).  
  - `server: fix token counting API crash on sleep` (#29309) resolves a critical stability issue in router-mode deployments.

---

### **3. New Model & Hardware Support**  
- ✅ **HRM-Text (DFM Mimir 1B)**: Added GGUF conversion and runtime support.  
  [PR #27372](https://github.com/ggml-org/llama.cpp/pull/27372)  
- ✅ **MiMo-V2.6 & HunyuanOCR**: Conversion support added for vision-language models.  
  [PR #29339](https://github.com/ggml-org/llama.cpp/pull/29339)  
- ✅ **Gemma4 DSpark Draft Backbone**: Full support for SWA and full-attention variants with tied output weights.  
  [PR #29226](https://github.com/ggml-org/llama.cpp/pull/29226)  
- ✅ **Hexagon NPU**: CI now builds Windows Arm64 binaries for Hexagon NPU (targeting edge AI devices).  
  [PR #29052](https://github.com/ggml-org/llama.cpp/pull/29052)  
- ✅ **OpenCL**: Added A8 Q6_K non-MoE dp4a binary kernel for improved efficiency on AMD GPUs.  
  [PR #29057](https://github.com/ggml-org/llama.cpp/pull/29057)

---

### **4. Performance & Optimization**  
- 🔥 **CUDA Sparse Flash Attention**: Re-enabled `sparse-fa` for dsv4 prefill with loop unrolling improving throughput.  
  [PR #29298](https://github.com/ggml-org/llama.cpp/pull/29298)  
- 🚀 **SYCL (Intel Arc)**: IQ3_S/IQ3_XXS MMVQ reorder-aware dequantization reduces latency by ~18% on B70.  
  [PR #29107](https://github.com/ggml-org/llama.cpp/pull/29107)  
- ⚙️ **Vulkan RDNA3/RDNA4**: Int8 coopmat1 matmul implementation (cm1 shader) enables faster q4_0/q5_1/q8_0 inference.  
  [PR #27952](https://github.com/ggml-org/llama.cpp/pull/27952)  
- 💡 **Qwen4exp**: Direct reads (`-lzm on-direct`) reduce lazy tensor overhead by up to 40% on Strix Halo platforms.  
  [PR #29030](https://github.com/ggml-org/llama.cpp/pull/29030)  

---

### **5. Stability & Regressions**  
- ⚠️ **Critical Crash**: Server crashes when handling requests during sleep state due to stale vocab/mctx capture.  
  Fixed in [#29309](https://github.com/ggml-org/llama.cpp/pull/29309) (merged in v0.5.0).  
- ⚠️ **Performance Regression**: CUDA sparse flash attention decode is **1.6x slower** after b11047 → b11062.  
  [Issue #29281](https://github.com/ggml-org/llama.cpp/issues/29281) — under investigation.  
- ⚠️ **Metal**: Decode throughput collapses when batching multiple long sequences (M3 Ultra).  
  [Issue #29335](https://github.com/ggml-org/llama.cpp/issues/29335) — reproducible in prebuilt binaries.  
- ⚠️ **Vulkan**: ~78% decode throughput cliff at 131072 context due to suballocation fragmentation.  
  Solved via `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`.  
  [Issue #27734](https://github.com/ggml-org/llama.cpp/issues/27734)  
- ⚠️ **ROCm/HIP**: Wrong logits reported on gfx1151 (RDNA3) for prompts > `n_ubatch`.  
  [Issue #28211](https://github.com/ggml-org/llama.cpp/issues/28211)

---

### **6. What This Means for Application Developers**  
- **Upgrade to v0.5.0** immediately if using router mode or multi-device setups—critical crash fixes are included.  
- Use `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4GiB` for large-context Vulkan workloads (≥131k tokens).  
- For high-throughput inference on Intel Arc or AMD RDNA3/4, enable SYCL or Vulkan int8 kernels via `--backend vulkan` or `--backend sycl`.  
- Avoid `q4_0/q4_1` KV cache with default CUDA builds—use `GGML_CUDA_FA_ALL_QUANTS=ON` to prevent silent CPU fallbacks.  
  [Issue #28633](https://github.com/ggml-org/llama.cpp/issues/28633)  
- Monitor `--n-cpu-moe` behavior on multi-GPU systems: freed memory may not distribute evenly across devices.  
  [PR #29343](https://github.com/ggml-org/llama.cpp/pull/29343) provides clarification.  

> ✅ **Best Practice**: Always test with `--log-file` enabled when deploying in production to catch silent regressions early.  
> 📌 See [docs](https://github.com/ggml-org/llama.cpp#running-the-server) for updated config patterns.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **1. Today's Highlights**  
Ollama’s latest release, `v0.34.4-rc1`, addresses critical stability fixes including intermittent "model not found" errors and long-standing structured output issues on MLX-backed models. Key improvements include enhanced stall detection in the MLX runner, better handling of GPU memory pressure, and a new `export/import` command for model portability—signaling strong momentum in both reliability and developer workflow.

---

### **2. Releases & Breaking Changes**  
- **`v0.34.4-rc1` (Release Candidate)**:  
  - Fixes intermittent "model not found" errors ([#18438](https://github.com/ollama/ollama/pull/18438)).  
  - Applies structured outputs in a single pass for thinking models ([#18479](https://github.com/ollama/ollama/pull/18479)).  
  - Introduces `ollama export <model> <target-dir>` and `import` commands for offline model transfer ([#18578](https://github.com/ollama/ollama/pull/18578)).  
  > ⚠️ Note: This release includes breaking changes to model storage format; users should back up models before upgrading.

---

### **3. New Model & Hardware Support**  
- **MLX Engine**:  
  - Enhanced support for **Nemotron** models with global scale parameters and fixed layer-count inference ([#18614](https://github.com/ollama/ollama/pull/18614)).  
  - Improved `xgrammar` integration via update to v0.2.7, fixing schema handling for typed dictionaries and short arrays ([#18615](https://github.com/ollama/ollama/pull/18615)).  
- **New Model Requests**:  
  - Strong community demand for **MIMO v2.5** and **MIMO v2.6-Pro/Flash** (million-token context window models) ([#15887](https://github.com/ollama/ollama/issues/15887), [#18616](https://github.com/ollama/ollama/issues/18616)).

---

### **4. Performance & Optimization**  
- **CPU Utilization Fix**:  
  - A regression in `v0.32.14` caused excessive CPU usage (~100% idle cores) even when models were fully loaded in VRAM ([#17833](https://github.com/ollama/ollama/issues/17833)).  
  - Fixed by passing `--poll 0` to `llama-server` when GPU is available ([#18613](https://github.com/ollama/ollama/pull/18613)), reducing background CPU load by ~90%.  
- **Memory Efficiency**:  
  - PRs like [#18612](https://github.com/ollama/ollama/issues/18612) propose best-effort VRAM release under GPU-memory pressure—critical for multi-workload environments (e.g., gaming + LLM inference).  
- **Embedding Throughput**:  
  - Optimized `/api/embed` path avoids unnecessary JSON round-trip serialization ([#18610](https://github.com/ollama/ollama/pull/18610)), improving batch processing performance on large inputs.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |  
|------|----------|--------|--------|  
| MLX `nvfp4`: request stalls indefinitely during prefill (`processed=total-1`) | Critical | Open | [PR #17834](https://github.com/ollama/ollama/pull/17834) (in progress) |  
| Structured output never terminates on MLX (emits whitespace) | High | Closed | [PR #18569](https://github.com/ollama/ollama/pull/18569) |  
| Homebrew-installed Ollama fails to provide structured output with MLX models | Medium | Open | [Issue #18597](https://github.com/ollama/ollama/issues/18597) |  
| `glm-ocr` returns HTTP 500 after `v0.34.1` due to token repeat limit | High | Open | [PR #17195](https://github.com/ollama/ollama/pull/17195) (fix in review) |  
| Tool calls dropped in Gemma 4 with >45 string values due to argument parsing collision | Medium | Closed | [Issue #18605](https://github.com/ollama/ollama/issues/18605) |  

> ✅ **Note**: Multiple regressions in MLX engine are actively being addressed, indicating ongoing refinement of low-level inference paths.

---

### **6. What This Means for Application Developers**  
- **Build Resilient Agents**: The fix for structured output termination on MLX ([#18569](https://github.com/ollama/ollama/pull/18569)) enables reliable JSON schema enforcement—essential for tool-calling agents.  
- **Avoid CPU Bloat**: If using GPU-based inference, ensure you’re on `v0.34.4+` or later to prevent runaway CPU usage.  
- **Plan for Offline Workflows**: Use `ollama export/import` ([#18578](https://github.com/ollama/ollama/pull/18578)) for secure, air-gapped model deployment.  
- **Watch for MLX Limitations**: Until stall detection and memory pressure handling mature, avoid high-throughput MLX workloads without monitoring.  
- **Future-Proof Tooling**: Consider adopting custom tools ([#17673](https://github.com/ollama/ollama/issues/17673)) as OpenAI compatibility evolves.

> 🔗 *Follow development at:* [github.com/ollama/ollama](https://github.com/ollama/ollama)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-24**

---

### **1. Today's Highlights**  
The LiteLLM project continues rapid iteration with a focus on cost accuracy, security hardening, and operational robustness. Key updates include critical fixes for budget enforcement bypasses (Issue #26672), improved model cost mapping for Vertex AI and OpenRouter (PRs #42837, #42832), and enhanced auditability via `--validate_config` dry-run support (PR #41705). These changes reinforce LiteLLM’s role as a production-grade LLM gateway in regulated and high-traffic environments.

---

### **2. Releases & Breaking Changes**  
No new stable releases were published today. The latest release is **v1.104.0-dev.1**, a development build that includes ongoing improvements to Docker image signing via **cosign** (verified using the key from [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)). No breaking API or config changes are reported in this window.

---

### **3. New Model & Hardware Support**  
- Added support for **Vertex AI’s Llama 3.3 70B MaaS**, **Veo 2/3**, **Virtual Try-On**, and **GA 2.5 TTS models** via PR [#42837](https://github.com/BerriAI/litellm/pull/42837).  
- Added **Gemini preview aliases** and **Deep Research 04-2026** model rows in cost maps via PR [#42833](https://github.com/BerriAI/litellm/pull/42833).  
- Updated **OpenRouter pricing** to reflect real-time model API data (PR [#42832](https://github.com/BerriAI/litellm/pull/42832)), including tiered Qwen pricing above 32k/128k/256k context windows.  
- Fixed Azure FLUX.2 image edit billing to account for **reference image pixel count** (PR [#42829](https://github.com/BerriAI/litellm/pull/42829)).

---

### **4. Performance & Optimization**  
- **Cost tracking now supports native batch JSONL input** for Vertex AI via PR [#42810](https://github.com/BerriAI/litellm/pull/42810), enabling full fidelity in batch processing without format conversion.  
- Introduced **Rust-based standalone cost calculations** (PR [#42620](https://github.com/BerriAI/litellm/pull/42620)), improving cross-language consistency and enabling faster validation of cost logic in CI/CD pipelines.  
- Optimized **prompt caching UI pagination** to load only 10 requests per page (PR [#42638](https://github.com/BerriAI/litellm/pull/42638)), reducing frontend load time and improving usability.

---

### **5. Stability & Regressions**  
- **Critical**: Budget enforcement bypass in v1.82.3 (Issue #26672) — users report `max_budget` limits being ignored despite spend exceeding threshold. This affects all keys and teams using rate limiting. *Fix pending.*  
- **High**: Rate limiter double-counts team-per-model limits (Issue #34140) — effective RPM/TPM is half configured. Confirmed in v1.100.x–v1.104.x. *Fix PR under review.*  
- **Medium**: Streaming guardrails can miss sensitive values split across SSE chunks (Issue #41611) — risk of undetected PII leakage.  
- **Low**: Cache misses `provider_specific_fields` (e.g., Anthropic citations) due to incomplete response storage (Issue #13048).  
- **Low**: Startup race condition causes Redis coordination failure in multi-pod deployments (Issue #42653) — budgets may be misaligned across pods.

---

### **6. What This Means for Application Developers**  
- **Avoid v1.82.3** if budget enforcement is critical — upgrade immediately to v1.100+ and monitor for regression fixes.  
- **Enable `--validate_config`** during CI/CD to catch configuration errors before deployment (PR #41705).  
- Use updated cost maps for **Vertex AI, OpenRouter, and Gemini models** to avoid $0 spend logging and ensure accurate billing.  
- For agents requiring **PII protection**, verify that guardrails are applied consistently across streaming and non-streaming paths (Issue #41265, #41611).  
- Consider **Rust-based cost validation** (via `litellm-cost`) for end-to-end consistency in multi-language environments.  

> 🔗 Full details: [GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-24**

---

### **1. Today's Highlights**  
Unsloth v0.1.815-beta launches with full local support for **Qwen-Image-2.1**, including custom Agent Skills and improved chat/project management. Key performance gains include **2x faster reasoning blocks (60 FPS vs 30 FPS)**, while multiple PRs address critical AMD/ROCm stability issues—particularly around VAE decode hangs and GPU driver conflicts.

---

### **2. Releases & Breaking Changes**  
- **v0.1.815-beta**: Adds Qwen-Image-2.1 GGUF support, agent skills, and 60 FPS reasoning.  
  [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.815-beta)  
- *Note*: No breaking API changes reported; backward compatibility maintained.

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - `unsloth/Qwen-Image-2.1-GGUF` now fully supported locally with FP8 text encoder fallback.  
    [Issue #11567](https://github.com/unslothai/unsloth/issues/11567)  
  - `unsloth/Qwen3.8-27B-NVFP4` safetensors model added (NVIDIA-only).  
    [Issue #11728](https://github.com/unslothai/unsloth/issues/11728)  

- **Hardware & Backends**:  
  - **AMD Ryzen AI NPU (XDNA 2)**: First-class support via Lemonade + FastFlowLM for on-device inference.  
    [PR #11743](https://github.com/unslothai/unsloth/pull/11743)  
  - **Adreno GPU (Qualcomm)**: Feature request opened to enable GGUF execution via GenieX/llama.cpp.  
    [Issue #11674](https://github.com/unslothai/unsloth/issues/11674)  
  - **ROCm 10 & 7.14**: Installer fixes ensure correct PyTorch version detection.  
    [Issue #10657](https://github.com/unslothai/unsloth/issues/10657), [PR #11736](https://github.com/unslothai/unsloth/pull/11736)

---

### **4. Performance & Optimization**  
- **Reasoning Speed**: 2x improvement in reasoning blocks → **60 FPS** (up from 30 FPS).  
- **Image Generation**:  
  - Static step skip cache introduced (PR #11737, #11748) enables CUDA graph-compatible skipping, reducing startup overhead.  
  - VAE decode progress now shown on UI bar (PR #11740).  
- **NVFP4 Backend**: FlashInfer now installed on-demand for NVFP4 models (PR #11730), avoiding slower torchao fallback.  
- **Speed Tier Optimization**: Prevents recompilation on every prompt length (PR #11731).

---

### **5. Stability & Regressions**  
- **Critical (High Severity)**:  
  - **AMD ROCm VAE decode crashes** due to `cudnn.benchmark=True` triggering exhaustive MIOpen tuning.  
    Fixed by PR #11732.  
  - **GPU kernel failure kills entire server process** during image gen (PR #9130).  
  - **Qwen-Image-2.1 fails to load on Windows ROCm** due to missing FP8 repo (`404`).  
    [Issue #11638](https://github.com/unslothai/unsloth/issues/11638)  
- **Moderate**:  
  - **Constant CPU usage** in desktop app (Issue #10390).  
  - **Unsloth Desktop installer fails on Snapdragon X2 Elite** due to `pyarrow` dependency.  
    [Issue #8495](https://github.com/unslothai/unsloth/issues/8495)  
- **UI/UX**:  
  - Bottom window strip unresponsive when maximized (PR #11734).  
  - Image generation appears "hung" after last step (PR #11740 fixes).

---

### **6. What This Means for Application Developers**  
- **Build smarter agents**: With **custom Agent Skills** and **toolcall disabling options**, developers can enforce safer, more predictable behavior—especially for sensitive data workflows.  
  [Issue #11671](https://github.com/unslothai/unsloth/issues/11671)  
- **Optimize for multi-backend deployment**: The new **ROCm 10 support**, **AMD NPU integration**, and **vLLM/SGLang opt-in** (PR #11491) enable cross-platform inference strategies.  
- **Improve UX**: Use the **static step skip cache** (#11737, #11748) and **VAE progress reporting** (#11740) to reduce perceived latency in image/video pipelines.  
- **Avoid silent failures**: Be cautious with `save_pretrained_gguf` on LoRA models—current behavior exports base model instead of merged weights.  
  [Issue #11698](https://github.com/unslothai/unsloth/issues/11698)  
- **Leverage native llama.cpp APIs**: Future support for toggling raw `llama.cpp` endpoints alongside OpenAI-compat will enable advanced tooling integration.  
  [Issue #11705](https://github.com/unslothai/unsloth/issues/11705)

---  
*Digest compiled from GitHub activity (2026-09-24).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*