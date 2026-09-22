# AI Infrastructure Digest 2026-09-22

> Generated: 2026-09-22 01:06 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

---

### **Cross-Project Comparison Report: AI Infrastructure Ecosystem – 2026-09-22**

#### **1. Ecosystem Overview**  
The AI inference and serving landscape in Q3 2026 is characterized by rapid convergence toward **distributed, agent-aware, and hardware-agnostic execution**, with strong momentum in **speculative decoding**, **disaggregated serving (P/D)**, and **multi-backend support**. Projects are increasingly focused on enabling production-grade LLM applications—especially agents—through enhanced stability, structured output reliability, and cross-platform portability. The rise of MoE models like GLM-5.3-Flash and Qwen3.8-Flash has intensified competition in optimization and model-specific kernel tuning, while security and cost governance are becoming non-negotiable for enterprise adoption.

---

#### **2. Activity Comparison**

| Project       | Issues Open | PRs Merged (Last 24h) | Releases | Breaking Changes |
|---------------|-------------|-------------------------|----------|------------------|
| **vLLM**      | 87          | 12                      | None     | None             |
| **SGLang**    | 121         | 9                       | None     | None             |
| **llama.cpp** | 134         | 10                      | 1 (`b11094`) | 3 (new flags/env vars) |
| **Ollama**    | 153         | 5                       | None     | None             |
| **LiteLLM**   | 148         | 6                       | None     | None             |
| **Unsloth**   | 129         | 7                       | None     | 3 (config/behavior fixes) |

> ✅ *Observation*: **llama.cpp** leads in release velocity, while **SGLang** and **Unsloth** show the highest issue volume—indicating active stabilization and complex hardware integration challenges.

---

#### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash**         | ✅ (DFlash2 draft) | ✅ (SM120 + ROCm) | 🟡 (experimental) | ⚠️ (crash risk) | ✅ (via Fal AI) | ✅ (IFM protocol) |
| **Qwen3.8-Flash-Next**    | ✅ (ROCm, DFlash) | ✅ (MTP, SM120) | ❌ (Vulkan crash) | ⚠️ (tool call crash) | ✅ (via Fal AI) | ❌ (MTP abort) |
| **Ling-3.0-flash-VL**     | ❌ | ❌ | ✅ (experimental) | ❌ | ❌ | ❌ |
| **Prism Ternary GGUFs**   | ❌ | ❌ | ❌ | ✅ (in progress) | ❌ | ❌ |
| **Apple MLX (Gemma 4 MTP)** | ❌ | ✅ (ongoing) | ✅ (MTP speculative) | ✅ (MLX speedup) | ❌ | ✅ (IFM) |
| **AMD Strix Halo (gfx1151)** | ⚠️ (performance regression) | ❌ | ⚠️ (Vulkan crash) | ⚠️ (ROCm crash) | ❌ | ❌ |

> 🏆 **Leader**: **SGLang** and **llama.cpp** lead in broad, deep model support across NVIDIA, AMD, Apple, and Intel backends.  
> 🔥 **Emerging Edge**: **Unsloth** and **Ollama** are gaining traction in **agent-native workflows** (IFM, tool calling), while **vLLM** dominates **ROCm platform parity**.

---

#### **4. Performance Frontier**

| Optimization Focus        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Caching Logic** | ✅ (cache-aware admission) | ✅ (Agent-Aware KV Cache RFC) | ❌ | ❌ | ❌ | ❌ |
| **Speculative Decoding**   | ✅ (DFlash2, MXFP8 fusions) | ✅ (HiCache, MTP drafts) | ⚠️ (Vulkan OOB error) | ✅ (MLX speedup) | ❌ | ✅ (IFM/K2-Horizon) |
| **Batching & Graphs**      | ✅ (breakable CUDA graphs) | ✅ (pipelining, PD disaggregation) | ✅ (SYCL graph replay) | ❌ | ❌ | ❌ |
| **Quantization & MMVQ**    | ❌ | ✅ (IQ3_S/IQ3_XXS) | ✅ (Hexagon GATED_DELTA_NET) | ✅ (QAT memory spike) | ❌ | ✅ (T4 training crash) |
| **Distributed Serving (P/D)** | ✅ (PD-disaggregation) | ✅ (pipeline parallelism) | ❌ | ❌ | ❌ | ❌ |
| **Kernel-Level Tuning**    | ✅ (MXFP8 + reduce-scatter) | ✅ (DSA, unified RadixCache) | ✅ (Adreno 830 fusion) | ❌ | ❌ | ❌ |

> 🔍 **Key Insight**: **vLLM** and **SGLang** are leading in **distributed inference and speculative decoding**, while **llama.cpp** excels in **low-level backend efficiency** (Hexagon, Vulkan, SYCL). **Unsloth** is pushing boundaries in **agent-aware kernels**, but faces instability trade-offs.

---

#### **5. Layer Positioning**

| Project       | Primary Layer                  | Key Differentiator |
|---------------|--------------------------------|--------------------|
| **vLLM**      | **Inference Engine**           | Industry-standard GPU-accelerated serving with ROCm parity and speculative decoding |
| **SGLang**    | **Inference Engine + Gateway** | End-to-end agent-aware runtime with pipeline parallelism and HiCache |
| **llama.cpp** | **Local Runtime / Embedded**   | Cross-platform, CPU/GPU/Metal/SYCL-native; ideal for edge and mobile |
| **Ollama**    | **Gateway + Local Runtime**    | Developer-friendly CLI, MLX acceleration, and model export for air-gapped use |
| **LiteLLM**   | **API Gateway / Orchestration** | Enterprise routing, cost tracking, PII guardrails, and multi-provider abstraction |
| **Unsloth**   | **Fine-Tuning + Runtime**      | High-performance fine-tuning engine with emerging IFM/agent support |

> 🧩 **Strategic Implication**:  
> - **Engineers building high-throughput systems**: Lean on **vLLM** or **SGLang**.  
> - **Edge/mobile developers**: Choose **llama.cpp**.  
> - **Enterprise app teams**: Use **LiteLLM** as a secure gateway over any backend.  
> - **Agents & agentic apps**: **Unsloth** and **SGLang** offer unique advantages in stateful execution and reasoning protocols.

---

#### **6. Trend Signals**

1. **Agent-Native Infrastructure Is Maturing**  
   - **SGLang’s Agent-Aware KV Cache RFC**, **Unsloth’s IFM support**, and **Ollama’s structured output fixes** signal that infrastructure is shifting from pure LLM serving to **stateful, memory-aware agent execution**.

2. **Hardware Parity Is No Longer Optional**  
   - With **ROCm support in vLLM/SGLang**, **Intel Arc in llama.cpp**, and **Apple MLX in Ollama**, developers must now consider **cross-architecture portability** as a baseline requirement.

3. **Security & Governance Are Now Core Features**  
   - **LiteLLM’s Presidio PII masking**, **budget enforcement**, and **cost forecasting** reflect an industry shift toward **audit-ready, compliant inference stacks**.

4. **Speculative Decoding Is Becoming Standard**  
   - Enabled via DFlash2 (vLLM), MTP drafts (SGLang), and gated-delta kernels (Ollama), this is no longer experimental—it's essential for low-latency agents.

5. **Performance vs. Stability Trade-Offs Are Rising**  
   - **Unsloth’s AMD Strix Halo regression**, **vLLM’s ROCm CUDA graph crash**, and **llama.cpp’s Vulkan OOB bug** highlight that aggressive optimizations are introducing new failure modes—developers must test rigorously.

> ✅ **Actionable Advice for Application Developers**:  
> - **Avoid `max_tokens` in `/v1/chat/completions`** (Ollama); enforce limits client-side.  
> - **Disable speculative decoding (`--nodraft`) when debugging** (Ollama).  
> - **Use `export/import` for offline deployment** (Ollama).  
> - **Monitor critical issues (#57064, #40232, #11143)** before deploying production agents.  
> - **Prioritize LiteLLM or SGLang for regulated environments** requiring audit trails and guardrails.

---  
*Generated: 2026-09-22 | Source: GitHub activity summaries across vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-22**

#### **1. Today's Highlights**  
The vLLM project continues to advance its support for next-generation hardware and inference patterns, with significant progress on **ROCm (AMD) platform parity**, **disaggregated serving (P/D)**, and **speculative decoding integration**. Key PRs today focus on stabilizing **DeepSeek-V4/5.3-Flash** on ROCm, improving **KV cache management** across distributed engines, and enabling **DFlash2 draft models** for GLM-5.3-Flash.  

#### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The latest stable version remains `v0.28.1rc1.dev580+g385dce36b` (as of issue #56868). Developers should monitor `main` for upcoming features and stability improvements.

#### **3. New Model & Hardware Support**  
- ✅ **ROCm (AMD) Platform Expansion**:  
  - Added dedicated unit test group for **MI355X / gfx950** via PR #58012, targeting Qwen3.8-2.4T-A95B and Kimi-K3 models.  
  - PR #57428 introduces fused **MXFP8 GEMM + reduce-scatter** kernel for DeepSeek-V4.1 under sequence parallelism—critical for performance on AMD GPUs.  
- ✅ **Model-Specific Support**:  
  - PR #56983 enables **DFlash2 draft models** (`incoai/GLM-5.3-Flash-DFlash2`) with `GLM-5.3-Flash`, unlocking speculative decoding for this model family.  
  - PR #58040 fixes **QSA metadata padding issues** in Qwen models under graph capture, improving reliability for long-context workloads.  

> 🔗 [PR #58012](https://github.com/vllm-project/vllm/pull/58012), [PR #56983](https://github.com/vllm-project/vllm/pull/56983), [PR #57428](https://github.com/vllm-project/vllm/pull/57428)

#### **4. Performance & Optimization**  
- **Speculative Decoding Efficiency**:  
  - PR #57428 fuses **MXFP8 GEMM + reduce-scatter** on SM100, reducing HBM round trips and improving throughput for sequence-parallel DeepSeek-V4.1.  
- **KV Cache Management**:  
  - PR #54625 introduces **cache-aware admission ordering**, prioritizing requests with cached prefixes—reducing decode starvation during long prefill workloads (see #54919).  
- **Graph & Compile Optimization**:  
  - PR #57586 proposes using **breakable CUDA graphs by default** under `VLLM_BATCH_INVARIANT=1`, allowing tuned matmul configs to adapt dynamically to runtime M dimensions.  

> 🔗 [PR #57586](https://github.com/vllm-project/vllm/pull/57586), [PR #54625](https://github.com/vllm-project/vllm/pull/54625), [PR #57428](https://github.com/vllm-project/vllm/pull/57428)

#### **5. Stability & Regressions**  
- ⚠️ **Critical Stability Issues**:  
  - **Issue #57064**: **Degenerate output (`locklocklock...`) in DeepSeek-V3.2/GLM-5.x** when running decode under **CUDA graphs in PD-disaggregation mode** on ROCm. High severity; no fix yet.  
  - **Issue #56868**: **Long-decode degeneration** in **GLM-5.3-Flash** after accumulated reasoning steps (TP=1, B300). Reproducible in `v0.28.1rc1`.  
- ⚠️ **Hardware-Specific Bugs**:  
  - **Issue #41663**: Intel Arc B70 (Battlemage) GPU **GP fault + BCS engine reset** on `intel/vllm:0.17.0-xpu` (Ubuntu 24.04 HWE). Affects XPU backend stability.  
- 🛠 **Fixes in Progress**:  
  - PR #57914 resolves a missing `/dev/shm` check that caused crashes during engram table sharing.  
  - PR #55390 adds positional annotation for MTP draft groups—fixing silent misclassification in hybrid models.

> 🔗 [Issue #57064](https://github.com/vllm-project/vllm/issues/57064), [Issue #56868](https://github.com/vllm-project/vllm/issues/56868), [PR #57914](https://github.com/vllm-project/vllm/pull/57914)

#### **6. What This Means for Application Developers**  
- **For agents & tool-calling apps**: Enable `--speculative-config` with DFlash2 drafts (via #56983) for faster response times on GLM-5.3-Flash. Watch for regression #46249 (Qwen3.6 tool calls fail with MTP enabled).  
- **For multi-modal/Mamba apps**: Avoid `mm-encoder-tp-mode data` with sleep mode (#47654); memory leaks may block container orchestration. Use `--sleep-preserve-parameter-names` if needed.  
- **For high-throughput systems**: Leverage cache-aware admission (#54625) and breakable graphs (#57586) to minimize decode latency spikes during bursty traffic.  
- **For AMD users**: Expect improved stability with MI355X/GFX950 via recent CI/test updates (#58012, #57428); avoid `CUDA graphs` in PD-disaggregation until #57064 is resolved.  

> 💡 **Action Item**: Review your deployment stack against `v0.28.1rc1` and test for GLM-5.3-Flash and DeepSeek-V4.1 behavior under ROCm + PD disaggregation. Monitor #57064 for critical fixes.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-22

---

### **1. Today's Highlights**  
SGLang continues its aggressive push toward scalable, production-grade LLM serving with major progress on **pipeline parallelism**, **prefill-decode disaggregation**, and **agent-aware KV cache design**. Key PRs today focus on enabling **GLM-5.3-Flash on Blackwell GPUs (SM120)**, improving **AMD ROCm support for sparse attention**, and refining **HiCache staging logic** for better memory safety. The community is actively stabilizing the CI pipeline, with 3 broken and 10 flaky tests reported in #17050.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash on SM120 (Blackwell)**: Critical fixes landed to enable full support on RTX PRO 6000 (96GB), including DSA backend compatibility and non-2048 top-k width handling (#39340, #37813).  
- ✅ **AMD ROCm**: Expanded support via PRs enabling `aiter allreduce fusion` (#39790) and unified page-zeroing testing (#40123).  
- ✅ **Apple Silicon (MLX)**: Continued development on Gemma 4 MTP speculative decoding and frozen-KV paths (#32264, #32101).  
- 🟡 **NPU (Ascend)**: CANN 9.1.0 update rolled out (#40524), aligning with latest Ascend toolchain.

> 🔗 [PR #39340](https://github.com/sgl-project/sglang/pull/39340) – GLM-5.3-Flash supports 2051-token widths  
> 🔗 [PR #40524](https://github.com/sgl-project/sglang/pull/40524) – CANN 9.1.0 / Python 3.12 upgrade for NPU  

---

### **4. Performance & Optimization**  
- 🚀 **Pipeline Parallelism Roadmap** (Issue #11857): Progress on reducing TTFT for long-context inputs (e.g., 1M tokens) via PD disaggregation and pipelining — a key enabler for high-throughput inference.  
- ⚙️ **UnifiedRadixCache + LMCache Integration** (PR #38652): Enables persistent KV reuse across restarts, critical for agent workflows and low-latency re-runs.  
- 🔥 **HiCache Staged Write-Back Fix** (PR #40232): Addresses host VA registration failure during batch async copy, preventing crashes on large-batch workloads.  
- 💡 **Kernel Optimizations**:  
  - PR #40628 ensures BF16 shared experts are excluded from NVFP4 fusions, fixing TP1 weight loading failures.  
  - PR #40656 routes FlashInfer MTP verification through public dispatch, ensuring correct state handling on SM100.

> 🔗 [PR #38652](https://github.com/sgl-project/sglang/pull/38652) – LMCache now integrated into UnifiedRadixCache  
> 🔗 [PR #40656](https://github.com/sgl-project/sglang/pull/40656) – Correct MTP verify routing on SM100  

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Status |
|--------|------|-------------|--------|
| ⚠️ High | #40232 | HiCache staged write-back faults due to invalid host VA passed to `cudaMemcpyBatchAsync` | Open |
| ⚠️ High | #40574 | Two-level candidate indexer tracking missing for DeepSeek-V4.1 | Open |
| ⚠️ Medium | #40144 | DFLASH draft layout assumed without validation → silent anchor shifts | Open |
| ❌ Low | #39103 | `include_reasoning=false` still returns reasoning metadata | Closed |

> 🔗 [Issue #40232](https://github.com/sgl-project/sglang/issues/40232) – Host pointer fault in HiCache batch path  
> 🔗 [Issue #40144](https://github.com/sgl-project/sglang/issues/40144) – Silent DFLASH layout assumption bug  

---

### **6. What This Means for Application Developers**  
- **Agents & Agentic Workflows**: The upcoming **Agent-Aware KV Cache (Phase 1, RFC #24656)** will allow you to pass workflow context (e.g., step IDs, action history) into the runtime, enabling smarter caching and stateful execution.  
- **Long Context Apps**: Pipeline parallelism and PD disaggregation are maturing rapidly — expect significantly reduced TTFT for documents >100K tokens.  
- **Multi-GPU Deployments**: Use `--disaggregation-decode-host-receive-threshold` (PR #40238) to optimize slow prefill → decode handoff on high-latency networks.  
- **Model Portability**: With ongoing **GLM-5.3-Flash** and **DeepSeek-V4.1** support, your apps can now leverage cutting-edge MoE models across NVIDIA, AMD, and Apple Silicon backends.  

👉 *Pro Tip*: Monitor #39499 (dLLM Serving) and #21891 (Simulator) for next-gen block-diffusion and performance benchmarking capabilities — both critical for scaling agents and fine-tuning pipelines.

---  
*Generated from GitHub data: sgl-project/sglang | 2026-09-22*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-22**

---

### **1. Today's Highlights**  
The latest updates focus on backend stability and cross-platform compatibility, with critical fixes for Metal flash attention bounds and CUDA Volta tile compilation errors. A new `--no-mmap-prefetch` flag addresses macOS performance bottlenecks during large model loading, while enhanced SYCL support improves inference efficiency on Intel Arc GPUs.

---

### **2. Releases & Breaking Changes**  
- **New release**: `b11094` (latest) includes a vendor update to `cpp-httplib@0.57.1` ([#29239](https://github.com/ggml-org/llama.cpp/pull/29239)).  
- **Configurable environment variables**: Added `LLAMA_ARG_*` env vars for temperature, top-p, min-p, and penalties ([#27380](https://github.com/ggml-org/llama.cpp/pull/27380)) — enables full server control via `EnvironmentFile` (e.g., systemd).  
- **New flag**: `--no-mmap-prefetch` disables `MADV_WILLNEED` on Linux/macOS, preventing long blocking waits when loading models > half RAM size ([#29250](https://github.com/ggml-org/llama.cpp/pull/29250)).

---

### **3. New Model & Hardware Support**  
- **Model support**: Added experimental support for **Ling-3.0-flash-VL** (BailingMoeV3VL), a 124B hybrid KDA + gated MLA vision-language model ([#29151](https://github.com/ggml-org/llama.cpp/pull/29151)).  
- **Hardware backends**:  
  - **SYCL**: Enhanced graph recording/replay and persistent reorder layouts for IQ3_S/IQ3_XXS MMVQ ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725), [#29107](https://github.com/ggml-org/llama.cpp/pull/29107)).  
  - **Hexagon**: New HMX-optimized GATED_DELTA_NET kernel delivers **1.5–3× faster prompt processing** on Galaxy S26/S25/S24 and VentunoQ devices ([#29199](https://github.com/ggml-org/llama.cpp/pull/29199)).  
  - **Vulkan**: Optimized F32 A matrix loading in aligned batches for Intel GPUs ([#29254](https://github.com/ggml-org/llama.cpp/pull/29254)).  
- **Quantization**: Added `sophia` pre-tokenizer type (no regex splitting) for GGUF models like [Sophia](https://huggingface.co/Arain119/sophia) ([#29211](https://github.com/ggml-org/llama.cpp/pull/29211)).

---

### **4. Performance & Optimization**  
- **MoE Optimization**: PR #27861 introduces GPU-resident LRU cache for host-offloaded MoE expert weights — reduces decode latency by avoiding repeated CPU-to-GPU bandwidth bottlenecks.  
- **SYCL**: IQ3 code reordering improves attention/decode paths on Intel Arc Pro B70; focused backend tests added ([#29107](https://github.com/ggml-org/llama.cpp/pull/29107)).  
- **Vulkan**: 2-aligned F32 matrix loading reduces GPU memory stalls on Intel platforms ([#29254](https://github.com/ggml-org/llama.cpp/pull/29254)).  
- **OpenCL**: Fused QK normalization + RoPE + V materialization boosts performance on Adreno 830 ([#28446](https://github.com/ggml-org/llama.cpp/pull/28446)).

---

### **5. Stability & Regressions**  
- **Critical crash**: Qwen3.8 DFlash/MTP speculative decoding fails on Vulkan due to OOB token ID (`n_vocab`) — likely caused by invalid batch init ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158)).  
- **Metal**: Flash attention block pre-pass had incorrect mask bounds — fixed in `b11093` ([#29220](https://github.com/ggml-org/llama.cpp/pull/29220)).  
- **CUDA**: Volta SM70 tile mismatch due to missing `tile<8,4>` definition — resolved in `b11090` ([#29224](https://github.com/ggml-org/llama.cpp/pull/29224)).  
- **Router mode**: Model load failure despite standalone success — issue reported but no fix yet ([#29225](https://github.com/ggml-org/llama.cpp/issues/29225)).  
- **Vulkan**: High CPU usage during token generation and severe prompt slowdown after `b10780` on RDNA3 — under investigation ([#28752](https://github.com/ggml-org/llama.cpp/issues/28752)).

---

### **6. What This Means for Application Developers**  
- Use `LLAMA_ARG_*` env vars to fully manage llama-server parameters via config files — ideal for production deployments with systemd or container orchestration.  
- Avoid `mmap` thrashing on macOS/Linux with large models: use `--no-mmap-prefetch` to prevent blocking model loading.  
- For high-throughput inference on Intel Arc or mobile SoCs, leverage SYCL and Hexagon optimizations — expect up to **3× faster prompt processing**.  
- Be cautious with Qwen3.8 DFlash/MTP on Vulkan — current builds may emit invalid tokens; monitor [#28158](https://github.com/ggml-org/llama.cpp/issues/28158) for patches.  
- When building agents, consider the new `echo=true` + `logprobs=N` support in `/v1/completions` ([#27537](https://github.com/ggml-org/llama.cpp/pull/27537)) for better output tracing and debugging.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-22**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with significant progress in MLX engine performance and structured output reliability. Key PRs improve Qwen 3.8 prompt processing speed by up to **+19%** on M5 Max hardware, while fixes address critical issues in JSON schema handling and tool call parsing that were causing deterministic agent failures. Additionally, support for Prism’s ternary GGUFs is now being tracked with a dedicated fix in progress.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **Prism Ternary GGUFs (PQ2_0/PTQ1_0)**: Support is under active development. The parser currently fails with "unsupported tensor size overflows" — see [Issue #18521](https://github.com/ollama/ollama/issues/18521) and [PR #18573](https://github.com/ollama/ollama/pull/18573) for tracking.
- 🚧 **Video Model Integration**: Users report inability to send video inputs to models like `qwen3-vl`, despite their native video capabilities — see [Issue #18151](https://github.com/ollama/ollama/issues/18151).
- ⚠️ **AMD Mixed GPU Architectures (gfx1200 + gfx1201)**: MoE models crash with "ROCm error: no kernel image is available" when split across different AMD GPUs — see [Issue #18162](https://github.com/ollama/ollama/issues/18162).

---

### **4. Performance & Optimization**  
- 🔥 **MLX Engine Speedup**: A new PR ([#18550](https://github.com/ollama/ollama/pull/18550)) introduces gated-delta kernels and MLP optimization, boosting Qwen 3.8 prompt throughput by:
  - **+18.7% at 2k tokens**
  - **+19.1% at 8k tokens** (M5 Max)
- 📦 **Model Export/Import**: A new CLI/server feature ([#18578](https://github.com/ollama/ollama/pull/18578)) enables offline model transfer via `ollama export` and `import`, critical for air-gapped environments.
- 🛠️ **Speculative Decoding Control**: A proposed `--nodraft` flag ([#18517](https://github.com/ollama/ollama/issues/18517)) would allow disabling speculative decoding for debugging and accuracy-sensitive tasks.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| Critical | `qwen3coder` tool-call parser crashes on long file-write calls, returning parse errors as responses | Open ([#18563](https://github.com/ollama/ollama/issues/18563)) | [PR #18571](https://github.com/ollama/ollama/pull/18571) |
| High | MLX engine generates infinite whitespace during structured output (JSON schema), never terminating | Open ([#18567](https://github.com/ollama/ollama/issues/18567)) | [PR #18569](https://github.com/ollama/ollama/pull/18569) |
| High | `/v1/chat/completions` ignores `max_tokens` and overrides `num_predict` from Modelfile → unbounded generation | Open ([#18575](https://github.com/ollama/ollama/issues/18575)) | Pending |
| Medium | Windows wildcard `FROM` path unmatched fails instead of falling back | Open ([#18568](https://github.com/ollama/ollama/issues/18568)) | [PR #18572](https://github.com/ollama/ollama/pull/18572) |
| Medium | `gemma4` image processing fails on Windows | Open ([#16532](https://github.com/ollama/ollama/issues/16532)) | Pending |
| Low | `qwen3.8` streaming returns `no user query found` error | Open ([#17778](https://github.com/ollama/ollama/issues/17778)) | Pending |

---

### **6. What This Means for Application Developers**  
- **Avoid unbounded generation**: Do not rely on `max_tokens` in `/v1/chat/completions` — use `num_predict` in your Modelfile or enforce limits client-side until [#18575](https://github.com/ollama/ollama/issues/18575) is resolved.
- **Handle structured outputs carefully**: If using MLX backend with JSON schema, expect potential infinite hangs — consider switching to CPU/CUDA or applying temporary workarounds until [#18569](https://github.com/ollama/ollama/pull/18569) lands.
- **Be cautious with tool calling**: Qwen 3.8 coding agents may fail deterministically on complex tool calls — ensure robust error handling and consider upgrading to a patched version once [#18571](https://github.com/ollama/ollama/pull/18571) is merged.
- **Use `export/import` for secure deployment**: Leverage the new `ollama export` functionality ([#18578](https://github.com/ollama/ollama/pull/18578)) for offline model distribution in regulated or isolated environments.

> 💡 *Pro Tip*: For high-stakes applications, disable speculative decoding (`--nodraft`) temporarily via future flag to validate deterministic outputs.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-22**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to strengthen its enterprise-grade capabilities with critical fixes to security, cost tracking, and guardrail reliability. Key PRs today focus on resolving high-severity issues in streaming PII masking (Presidio), zero-cost budget bypasses, and Databricks reasoning payload validation. Additionally, new UI features enhance visibility into team usage and routing forecasts, improving auditability and operational control.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking configuration changes were published. The project remains stable at v1.86.2, though several patch-level fixes are pending merge.

---

### **3. New Model & Hardware Support**  
- ✅ **Fal AI**: Added support for `fal-ai/flux-lora-depth` (image editing) and `fal-ai/moondream3-preview/query` (vision Q&A). [PR #42334](https://github.com/BerriAI/litellm/pull/42334)  
- ✅ **OpenRouter**: Added pricing for `openrouter/typesafe/jev-1.13` and a new pass-through route `/openrouter/decisions`. [PR #42301](https://github.com/BerriAI/litellm/pull/42301)  
- ✅ **Meta Model API**: Now available in the UI dashboard dropdown despite prior omission. [Issue #36164](https://github.com/BerriAI/litellm/issues/36164)  

> *Note: No new hardware backends (e.g., ROCm/Metal/CPU-only) were added.*

---

### **4. Performance & Optimization**  
- 🔧 **Priority Routing Group Strategy**: Introduced per-group priority routing, allowing teams to define preferred models and ordered fallbacks without affecting global behavior. [PR #42378](https://github.com/BerriAI/litellm/pull/42378)  
- 📊 **Cost Forecasting Visibility**: UI now displays Capability and FUSE v2 routing forecasts directly in request cards. [PR #42057](https://github.com/BerriAI/litellm/pull/42057)  
- 📈 **Team Usage Export Enhancements**: Export now includes `User ID` and `User Email`, enabling direct spend attribution without external joins. [PR #42367](https://github.com/BerriAI/litellm/pull/42367)  
- ⚙️ **Telemetry Opt-In**: Added anonymous usage telemetry via `LITELLM_TELEMETRY=true`, helping maintain long-term stability across OSS deployments. [PR #42373](https://github.com/BerriAI/litellm/pull/42373)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| 🔴 Critical | **Zero-cost budget bypass leaks unbounded spend** when fallback is priced | Closed | [PR #42170](https://github.com/BerriAI/litellm/pull/42170) |
| 🔴 Critical | **Responses→Chat bridge loses native tool calls** after multi-turn replay; returns model reasoning as assistant text | Closed | [PR #42005](https://github.com/BerriAI/litellm/pull/42005) |
| 🔴 High | **Presidio PII guardrail fails open on analyzer error** and skips input/streaming bytes | Open | [Issue #30728](https://github.com/BerriAI/litellm/issues/30728) |
| 🔴 High | **Streaming `/v1/messages` output skips Presidio masking**, leaking card numbers | Open | [PR #42351](https://github.com/BerriAI/litellm/pull/42351), [PR #42335](https://github.com/BerriAI/litellm/pull/42335) |
| 🟡 Medium | **Databricks non-GPT models fail with `reasoning_effort` not being a string** | Open | [Issue #42347](https://github.com/BerriAI/litellm/issues/42347) |
| 🟡 Medium | **Wrong cost calculation for Nebius provider** (off by 10x) | Open | [Issue #41782](https://github.com/BerriAI/litellm/issues/41782) |

> *All critical bugs have either been fixed or have active PRs addressing them.*

---

### **6. What This Means for Application Developers**  
- **Guardrails are now more reliable**: Ensure you’re using up-to-date versions to avoid PII leakage via Presidio or incorrect fallback handling. The fix for streaming PII masking is particularly important for production apps handling sensitive data.
- **Budget enforcement is stricter**: Avoid relying on zero-cost budgets if fallbacks exist — this can lead to unexpected costs. Use explicit rate limiting and monitoring.
- **Routing is more predictable**: With group-scoped priority routing, you can now design robust fallback chains without global side effects.
- **Auditability improves**: Team usage exports now include user context, making it easier to enforce cost accountability in shared environments.
- **Be cautious with custom models**: If using `/v1/responses` or `/v1/messages` with non-OpenAI backends, verify that `response.id` format won’t break downstream tools like LangFuse or S3 logging. [Issue #31055](https://github.com/BerriAI/litellm/issues/31055)

👉 *Recommendation: Upgrade to the latest build and validate all guardrails and cost tracking logic before deploying to production.*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-22**

#### **1. Today's Highlights**  
The Unsloth ecosystem continues to mature with a focus on stability, UI polish, and deeper hardware integration. Key developments include improved error visibility in Studio (via #8804, #11460), critical fixes for ROCm and Vulkan backends (#11143, #11453), and new support for IFM reasoning protocols. A major regression in model loading performance on AMD Strix Halo GPUs has been flagged, indicating ongoing challenges with ROCm compatibility.

#### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, several PRs address breaking behaviors:
- **#11467**: Resolves `ValueError` when loading `Qwen3-Omni-30B-A3B-Instruct` due to unrecognized config class.
- **#11469**: Restores image processor re-exports from Transformers 4.x to enable loading of `microsoft/Phi-4-reasoning-vision-15B`.
- **#11468**: Prevents auto-enabling padding-free batching on models that cannot handle it, avoiding `TypeError` at runtime.

> 🔗 [PR #11467](https://github.com/unslothai/unsloth/pull/11467) | [PR #11469](https://github.com/unslothai/unsloth/pull/11469) | [PR #11468](https://github.com/unslothai/unsloth/pull/11468)

#### **3. New Model & Hardware Support**  
- **IFM Protocol Support Added** via #10948: Native handling of IFM/K2-Horizon reasoning channels, including XML tool-call parsing and turn-end EOS detection.
- **Vulkan Training Feature Requested** (#11184): Community interest in enabling Vulkan-based training, though no implementation yet.
- **ROCm & AMD GPU Focus**: Multiple issues highlight instability on AMD Strix Halo (gfx1151) and Intel Arc B60 (Vulkan ErrorDeviceLost), underscoring need for better ROCm/Vulkan validation.

> 🔗 [Issue #11184](https://github.com/unslothai/unsloth/issues/11184) | [Issue #11453](https://github.com/unslothai/unsloth/issues/11453)

#### **4. Performance & Optimization**  
- **Severe Performance Regression on RTX 5070 Ti (sm_120)**: Bundled `b11030-mix` build is ~5–6× slower than official `ggml-org` CUDA 12 build. Likely tied to kernel compilation or memory layout inefficiencies.
- **Memory Overhead in QAT Models**: `Gemma 4 26B A4B QAT` uses >15 GB RAM on a 16 GB system, suggesting inefficient memory management during quantized inference.
- **Optimization Efforts**: PRs like #11494 aim to skip redundant kbit prep steps in TRL, reducing unnecessary memory spikes during fine-tuning setup.

> 🔗 [Issue #11349](https://github.com/unslothai/unsloth/issues/11349) | [Issue #11435](https://github.com/unslothai/unsloth/issues/11435) | [PR #11494](https://github.com/unslothai/unsloth/pull/11494)

#### **5. Stability & Regressions**  
Top stability concerns:
1. **Qwen3.8-Flash-Next MTP Abort** (#11143): Critical crash during load (`hc_head_norm still [hc_dim]`) in `b10995-mix`, affecting users on newer builds.
2. **AMD ROCm + Windows Crash** (#7371): Performance regression on Strix Halo after `b10079` update; reproducible on bare-metal Windows.
3. **Intel Arc B60 Vulkan Lockup** (#11453): `ErrorDeviceLost` mid-generation causes chat freeze requiring reload.
4. **T4 Kaggle Training Crash** (#7506): Model training fails during BF16 training on T4 with no clear log output.

> 🔗 [Issue #11143](https://github.com/unslothai/unsloth/issues/11143) | [Issue #7371](https://github.com/unslothai/unsloth/issues/7371) | [Issue #11453](https://github.com/unslothai/unsloth/issues/11453) | [Issue #7506](https://github.com/unslothai/unsloth/issues/7506)

#### **6. What This Means for Application Developers**  
- **Expect robust error reporting**: The team is actively improving diagnostics—expect clearer logs for failed loads, training crashes, and API errors (e.g., #8804).
- **Avoid `b11000+` builds on AMD/ROCm**: If using AMD GPUs, consider pinning to stable `b10079` or earlier until #7371 and #11453 are resolved.
- **Use caution with QAT and large models**: Be mindful of memory usage—especially with `Gemma 4 26B A4B QAT` on low-RAM systems.
- **Design for fallbacks**: With inconsistent support for Vulkan and emerging formats (MiCA, IFM), applications should gracefully handle missing features or backend failures.
- **Leverage upcoming UI improvements**: Future Studio updates will offer better control over GPU memory caps (#8178), per-GPU layer distribution (#11474), and error visibility (#11465).

> ✅ Pro tip: Monitor `unsloth_zoo` for updated training scripts and model-specific optimizations as they land.

---  
*Digest generated: 2026-09-22 | Source: [github.com/unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*