# AI Infrastructure Digest 2026-10-08

> Generated: 2026-10-08 02:14 UTC | Projects covered: 6

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
The AI infrastructure landscape in October 2026 is defined by a convergence of high-performance inference, multi-modal capabilities, and agent-centric workflows. Projects are rapidly advancing beyond raw throughput to prioritize correctness, stability, and developer experience—especially around speculative decoding, MoE efficiency, and cross-platform compatibility. A clear divide is emerging between *engine-focused* systems (vLLM, SGLang) and *application-layer* platforms (Ollama, LiteLLM), with training tools like Unsloth enabling new forms of decision-making agents. The race is no longer just about speed, but about reliability at scale across diverse hardware and model types.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑/↓) | PRs Merged (↑/↓) | Release Status       |
|---------------|-------------------|------------------|------------------------|
| **vLLM**      | 378 (+5)          | 48 (+3)          | Stable: `v0.31.0`; Nightly: RC (`0.30.1rc1`) |
| **SGLang**    | 412 (+8)          | 56 (+6)          | No new release; active development |
| **llama.cpp** | 597 (+12)         | 42 (+4)          | `b11481` (latest build); no formal release |
| **Ollama**    | 614 (+15)         | 29 (+2)          | v0.40.1 (patch release); breaking changes in migration |
| **LiteLLM**   | 297 (+6)          | 34 (+5)          | Multiple dev/rc releases (`v1.106.0-dev.1`, etc.) |
| **Unsloth**   | 245 (+7)          | 28 (+3)          | v0.1.904-beta (feature-rich beta) |

> ✅ *Trend*: **Ollama** and **llama.cpp** show the highest issue volume due to rapid feature adoption and platform-specific regressions. **LiteLLM** leads in pre-release cadence, signaling aggressive iteration toward Rust migration.

---

### **3. Model Support Race**

| New Model / Architecture     | Supported By                          | Status & Notes |
|-------------------------------|----------------------------------------|----------------|
| **Qwen3.8-Flash-Next (FP8)** | vLLM, llama.cpp, Ollama (via GGUF)     | vLLM adds QSA path; llama.cpp enables GPU MoE caching |
| **Kimi-K3 KDA/MLA Decode**    | vLLM (PR #60470), SGLang (NPU), Unsloth | vLLM leads in kernel-level optimization |
| **Cohere2 Vision (mtmd)**     | llama.cpp (#30062)                     | First project to ship multimodal vision support |
| **GLM5-Next MTP (DRAFT)**     | llama.cpp (#29928), SGLang (partial)   | llama.cpp has full graph support |
| **Clef/Clef-Flash (decision)**| SGLang (#42721), Ollama (issue #18769) | SGLang has integration; Ollama still unstable |
| **Apple Silicon MLX Path**    | SGLang (proposal #32321), Unsloth      | SGLang’s Torch-owned SRT path is most mature |

> 🏆 **Leader**: **llama.cpp** and **vLLM** are leading in model coverage and low-level optimizations. **SGLang** is ahead in decision model integration and Apple Silicon readiness.

---

### **4. Performance Frontier**

| Focus Area               | Leading Projects                            | Key Developments |
|--------------------------|---------------------------------------------|------------------|
| **KV Cache Optimization**| vLLM, SGLang, llama.cpp                     | DFlash2/DSpark fixes (vLLM), FlashInfer checkpoints (SGLang), FP8+Q4_K cache reuse (llama.cpp) |
| **Batching & Throughput**| vLLM, SGLang, Unsloth                       | Batch invariance (`VLLM_BATCH_INVARIANT=1`), adaptive speculative steps (SGLang), auto-microbatching (Unsloth) |
| **Quantization Efficiency**| llama.cpp, vLLM, Unsloth                  | GPU MoE expert caching (llama.cpp), shape-specific Triton kernels (vLLM), Int4 group_size validation (Unsloth) |
| **Distributed Serving**   | SGLang, vLLM                                | DSPARK/DFLASH OOM fixes (SGLang), multi-GPU MoE scaling (llama.cpp) |
| **Kernel-Level Speedups** | vLLM, llama.cpp, SGLang                     | Triton GEMM tuning (vLLM), few-row MMA on Metal (llama.cpp), MoE sync barriers (SGLang) |

> 🔥 **Hotspot**: **vLLM** dominates in kernel-level performance tuning for SM120/GB10 devices. **llama.cpp** leads in cross-backend kernel innovation (Metal, Hexagon, CUDA).

---

### **5. Layer Positioning**

| Project       | Primary Layer             | Role Summary |
|---------------|----------------------------|--------------|
| **vLLM**      | Inference Engine           | High-throughput, kernel-optimized serving; targets cloud-scale deployment |
| **SGLang**    | Advanced Inference Gateway | Full-stack control: speculative decoding, hybrid schedulers, MoE routing; ideal for agentic workloads |
| **llama.cpp** | Local Runtime / Edge       | CPU/GPU-native inference engine; excels in edge devices, macOS, and low-level optimizations |
| **Ollama**    | Developer Gateway / CLI    | Unified CLI + Cloud proxy; user-facing abstraction layer; strong UX focus |
| **LiteLLM**   | API Gateway / Orchestrator | Multi-provider routing, auth, tracing; builds "universal" LLM gateway |
| **Unsloth**   | Training & Fine-Tuning Tool | Enables custom decision models, ComfyUI integration; shifts focus from inference to agent creation |

> 🧩 **Strategic Insight**: vLLM/SGLang are *infrastructure engines*; LiteLLM/Ollama are *application gateways*; Unsloth is a *training-to-agent pipeline tool*. The ecosystem is becoming layered: **fine-tune → serve → route → execute**.

---

### **6. Trend Signals**

#### 🔍 **Emerging Trends**
1. **Speculative Decoding Stability Is Now Critical**  
   Multiple projects report crashes or 0% acceptance rates (vLLM, SGLang) — indicating that speculation is no longer optional but risky without rigorous testing.

2. **MoE Optimization Has Moved Beyond Memory Savings**  
   GPU-resident MoE caches (llama.cpp), auto-scaled microbatching (Unsloth), and dynamic layout management signal a shift toward *predictable, scalable MoE inference*.

3. **Decision Models Are Becoming First-Class Citizens**  
   SGLang and Unsloth now support trainable decision models (`train_decision_model()`). This marks a move from “LLM as output generator” to “LLM as policy engine.”

4. **Rust Migration Is the Next Major Inflection Point**  
   LiteLLM’s active Rust rewrite (sub-1ms overhead) will redefine latency-sensitive use cases. Early adopters should prepare for lower-latency, higher-throughput gateways.

5. **Cross-Platform Compatibility Is the New Battleground**  
   AMD ROCm, Apple Silicon, and Windows memory bugs dominate issue trackers — proving that hardware diversity is no longer a niche concern.

#### 🛠️ **Actionable Guidance for Developers**
- **Avoid speculative decoding** in production until critical bugs (e.g., draft depth 5 corruption) are resolved.
- **Prioritize vLLM or SGLang** for high-throughput, large-model inference on NVIDIA/AMD.
- **Use llama.cpp** for edge, mobile, or Apple Silicon deployments requiring fine-grained control.
- **Choose LiteLLM** if building multi-provider APIs with rich observability and authentication.
- **Leverage Unsloth** for building lightweight, self-contained agent workflows using decision models.
- **Monitor nightly builds cautiously** — especially in Ollama and vLLM — due to regression risks.

> ⚠️ **Bottom Line**: The infrastructure stack is maturing fast—but stability and correctness remain the top hurdles. Choose your stack not just for speed, but for *reliability under real-world conditions*.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-08**

---

### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance across next-gen hardware, with critical fixes for speculative decoding correctness on SM120 (RTX PRO 6000) and prefix caching corruption in DFlash2/DSpark + Qwen3.8-27B FP4 configurations. New PRs introduce opt-in Cake kernel routing for Kimi-K3 and enhance ROCm support for batch invariance and MLA decode padding—key enablers for efficient inference at scale.

---

### **2. Releases & Breaking Changes**  
None. No new releases or breaking changes were published in the last 24 hours. The latest stable version remains `v0.31.0`, though nightly builds (`0.30.1rc1.dev539+g5b6b657e1`) are under active scrutiny due to regression reports.

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Added experimental support for `Qwen3.8-Flash-Next` FP8 KV cache via QSA path (PR #54426).  
  - Expanded integration of **Kimi-K3 KDA/MLA decode** via FlashInfer’s Cake kernels (PR #60470).  
- **Hardware & Backend**:  
  - **ROCm (gfx950 / MI355X)**: Performance optimization tracker initiated for `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` (Issue #57149).  
  - **AMD RDNA4 (gfx1201)**: Fixed incorrect selection of `RowWiseTorchFP8ScaledMMLinearKernel`, which caused up to 24% decode slowdown (Issue #57838).  
  - **NVIDIA GB10 (SM121)**: Ongoing investigation into 16% decode slowdown for `Nemotron-3.5-Lightning NVFP4` since v0.29.0 (Issue #59770).  

---

### **4. Performance & Optimization**  
- **Kernel & Throughput**:  
  - Tuned Qwen3.5 GDN GEMM on H20 and SM120 devices using shape-specific Triton kernels; achieved **1.67x–2.50x speedup** over generic versions (PR #54182).  
  - Reduced draft vocabulary for MTP drafters sharing target `lm_head` yields **+25–29% decode speedup** (PR #58578).  
- **Memory & Layout**:  
  - Optimized AITER MLA decode query padding on ROCm to avoid byte-wise strided copies, reducing overhead (PR #59966).  
  - Disabled redundant MoE input copy before `w13 GEMM` when no quantization or activation is applied (PR #59340).  
- **Batch Invariance**:  
  - Enabled `VLLM_BATCH_INVARIANT=1` support across ROCm, NVIDIA, and CPU backends for consistent inference behavior (PR #52231).

---

### **5. Stability & Regressions**  
- **Critical Bugs (High Severity)**:  
  - **Prefix Cache Corruption** in DFlash2/DSpark + Qwen3.8-27B FP4 on SM120: Corrupt output after cache hit (Issue #60174). *Fix PR pending.*  
  - **Speculative Decoding Failure** on GLM-5.3-Flash (FP8) with native FLASHINFER_MLA_SPARSE_SM120 backend: Acceptance rate drops to 0% (Issue #59724). *Fix PR pending.*  
- **Moderate Issues**:  
  - Silent CUDA IMA (exit 0) in hybrid GDN + MTP k=3 + async scheduling on RTX 3090 (Issue #53726). *Fixes attempted but persisting.*  
  - Decode throughput drops ~3.3x from v0.26.0 to v0.29.0 on H100 (Issue #57680).  
  - MoE decode slower by ~15% on SM12x post-#56876 due to DeepGEMM alignment change (Issue #58624).  
- **Minor/Non-Crashing**:  
  - `tool_choice='none'` silently deletes tool-call-shaped content (Issue #55080).  
  - `logprob_token_ids` rank misreported as request index instead of vocab rank (Issue #60357).

---

### **6. What This Means for Application Developers**  
- **Avoid v0.30+/0.31 on SM120 with Qwen3.8-FP4/DFlash2**: Expect corrupted outputs in prefix-cached workloads. Use v0.29 or wait for fix (Issue #60174).  
- **Enable `VLLM_CAKE_ROUTES` for Kimi-K3**: Optimize KDA and MLA decode paths on supported hardware (PR #60470).  
- **Monitor Speculative Decoding Stability**: On SM120 with FP8 models, acceptance rates may fail unexpectedly—validate with testbeds.  
- **Leverage Batch Invariance (`VLLM_BATCH_INVARIANT=1`)**: Improves consistency across deployments, especially on ROCm.  
- **Watch for Quantization Regression**: If using `NVFP4` or `FP8` on GB10 Spark, expect ~16% decode slowdown vs. v0.29.0—consider pinned version until resolved (Issue #59770).  

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-08**

---

### **1. Today's Highlights**  
The SGLang project continues to advance its support for next-generation inference optimizations, with key PRs focused on speculative decoding enhancements (e.g., throughput-aware adaptive steps) and stability fixes for high-end hardware like SM120 and B200/B300. Critical issues related to MoE kernel correctness, KV cache corruption under draft depth 5, and hybrid-SWA scheduler livelocks have been actively tracked, signaling ongoing refinement in large-model serving reliability.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes were published.

---

### **3. New Model & Hardware Support**  
- ✅ **Apple Silicon Serving Redesign**: Proposal #32321 outlines a Torch-owned SRT path with exported MLX model regions, enabling native Apple Silicon deployment via MLX interoperability (tracked in PR #36164).  
- ✅ **Hunyuan3D: Paint Use Remesh Support**: PR #42770 implements mesh decimation to 40k faces before UV unwrapping, improving performance for 3D texturing pipelines.  
- ✅ **Clef & Clef-Flash Decision Models**: PR #42721 adds support for Cloudflare’s Qwen3-based decision models (`clef`, `clef-flash`) on `/v1/systemone`.  
- ✅ **Kimi-K3 DCP on Ascend NPU**: PR #40825 enables decode context parallelism (DCP) and DSPARK speculative decoding on Ascend NPUs with sharded MLA KV allocation.  

> 🔗 [Apple Silicon Roadmap](https://github.com/sgl-project/sglang/issues/32321) | [Hunyuan3D PR](https://github.com/sgl-project/sglang/pull/42770) | [Clef Models](https://github.com/sgl-project/sglang/pull/42721) | [Kimi-K3 NPU Support](https://github.com/sgl-project/sglang/pull/40825)

---

### **4. Performance & Optimization**  
- 🚀 **Throughput-Aware Speculative Policy**: PR #28045 introduces a cost-guided, throughput-aware policy for adaptive speculative steps—aimed at dynamically balancing speculation overhead and inference speed.  
- ⚙️ **Parallel Prompt Encoding**: PR #41259 parallelizes long chat prompt encoding, reducing TTFT latency by offloading tokenizer work from the async thread (critical for 200k+ token agentic prompts).  
- 🧠 **Moe Kernel Optimizations**: Multiple PRs improve MoE kernels across backends:  
  - PR #41258 allows GLM DSA NextN drafts to declare their own shared-expert fusion architecture.  
  - PR #43030 fixes missing synchronization barrier in `moe_align_block_size_kernel`, preventing race conditions.  
- 💡 **FlashInfer Prefill Checkpoints**: PR #41400 integrates FlashInfer prefill checkpoints (from v0.7.0), enabling radix prefix caching on SM100/SM103 for safe-gate KDA models.  

> 🔗 [Speculative Policy](https://github.com/sgl-project/sglang/pull/28045) | [Prompt Encoding Parallelization](https://github.com/sgl-project/sglang/pull/41259) | [Moe Kernel Fixes](https://github.com/sgl-project/sglang/pull/43030) | [FlashInfer Checkpoints](https://github.com/sgl-project/sglang/pull/41400)

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:  
1. **Hybrid-SWA + Radix Cache Livelock** (#41579): Scheduler stalls indefinitely when SWA prefix lock pins a finished request’s untrimmed chunk. *No fix PR yet*.  
2. **GLM-5.3-Flash NVFP4 Crashes on SM120** (#36711): Index error during weight loading when `--moe-runner-backend flashinfer_trtllm` is used. *Fix pending*.  
3. **DFSPEAK Draft Depth 5 Corruption on SM120** (#33800): Output corruption observed only at draft depth 5; depths 3,4,6,7 are clean. *Active investigation*.  
4. **DSPARK/DFLASH OOM Due to Incorrect TP Size Usage** (#38202): Uses `tp_size` instead of `attn_tp_size`, causing memory exhaustion under DP attention in Kimi-K3. *Fix in progress*.  
5. **NIXL Backend Crash with `SGLANG_DISAGG_STAGING_BUFFER=1`** (#42684): `TypeError` at startup. *Reproduced on v0.5.20; fix not yet merged*.  

> 🔗 [Hybrid-SWA Livelock](https://github.com/sgl-project/sglang/issues/41579) | [GLM-5.3-Flash Crash](https://github.com/sgl-project/sglang/issues/36711) | [Draft Depth 5 Corruption](https://github.com/sgl-project/sglang/issues/33800) | [DSPARK OOM](https://github.com/sgl-project/sglang/issues/38202) | [NIXL Crash](https://github.com/sgl-project/sglang/issues/42684)

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding on hybrid-SWA and high-draft-depth configs**—scheduler livelocks and output corruption may occur on SM120/B200/B300. Avoid draft depth 5 until #33800 is resolved.  
- **Ensure correct tensor parallelism settings** when using DP attention (e.g., Kimi-K3): verify `attn_tp_size` vs `tp_size` usage to prevent OOMs.  
- **Leverage upcoming MoE and spec-decoding improvements** (PRs #28045, #41258, #43030) for better throughput and kernel correctness on advanced models like DeepSeek-V4.1 and GLM-5.3-Flash.  
- **Monitor CI stability**—ongoing flaky tests (#42752, #17050) suggest potential instability in nightly builds; prefer stable release tags for production deployments.  

> 🔗 [CI Flakiness Tracker](https://github.com/sgl-project/sglang/issues/42752) | [CI Failures Dashboard](https://github.com/sgl-project/sglang/issues/17050)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-08**

---

### **1. Today's Highlights**  
The latest updates focus on expanding multimodal support with Coher2 Vision integration and critical MoE performance improvements, including GPU caching for expert tensors and multi-GPU MoE cache support. New optimizations in Metal, CUDA, and Hexagon backends enhance low-level tensor operations, while stability fixes address speculative decoding issues and memory safety in vision model pipelines.

---

### **2. Releases & Breaking Changes**  
- **`b11481`**: Added **Cohere2 Vision** support via `mtmd` (#30062) — enables multimodal inference for Coher2 models.  
  🔗 [PR #30062](https://github.com/ggml-org/llama.cpp/pull/30062)  
- **`b11480`**: Introduced **GPU cache for MoE experts kept in host memory** using `llama_moe_cache_ptr`, reducing CPU-GPU transfers during inference.  
  🔗 [PR #29887](https://github.com/ggml-org/llama.cpp/pull/29887)  
- **`b11474`**: Added **GLM5-Next MTP (Multi-Token-Prediction)** graph support, enabling efficient speculative decoding for GLM5-based models.  
  🔗 [PR #29928](https://github.com/ggml-org/llama.cpp/pull/29928)

> ✅ *Migration Note:* Users upgrading to `b11480+` should ensure their model files include the correct MoE expert metadata; no config changes required.

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - ✅ **Cohere2 Vision** (`cohere2_vision`) via `mtmd` (#30062)  
  - ✅ **GLM5-Next MTP** (e.g., `GLM5-Next-NextN`) with optimized DSA + shared LM head (#29928)  
  - ✅ **LiquidAI/d1-omni-600M** (audio, image, text input) added to model registry (#30114)  

- **Hardware & Backend Enhancements**:  
  - 🚀 **Metal**: Few-row MMA matmul now supports BF16, Q1_0, Q2_0, MXFP4, Q2_K, Q3_K, TQ2_0, IQ types — broadens quantization compatibility (#30065)  
  - 🚀 **Hexagon**: Adds tiled Q4_K/Q6_K GET_ROWS, Q6_K dequant speedup (x1.3), improved GELU accuracy (#30121, #30115, #30104)  
  - 🚀 **CUDA/HIP**: Matrix-core (MFMA) lightning indexer for CDNA2 (gfx90a) — unlocks full hardware utilization for DeepSeek-V3/V4 (#29050)  
  - 🚀 **MUSA**: Uses tile lightning indexer kernel for improved throughput (#30080)  

---

### **4. Performance & Optimization**  
- **MoE Efficiency**:  
  - GPU-resident MoE expert cache reduces host memory pressure and improves decode latency by up to **~25%** on large models like Qwen3.8-Flash-Next (#29887).  
  - Multi-GPU MoE cache support benchmarked on **2× RTX 4090s**, showing linear scaling for 93.7 GiB models (#30112).  

- **Kernel-Level Speedups**:  
  - **Metal**: Generic few-row MMA now covers all 16-weight dequantized types → up to **2.1× faster** matmul for Q4_K/Q5_K (#30065).  
  - **Hexagon**: Q6_K dequant speedup via manual unrolling (x1.3), improved GELU accuracy with HVX tanh (#30121, #30104).  
  - **CUDA**: Avoids repeated warmup after stable graph replay → **~15% faster** speculative decoding in stable workloads (#29768).  

- **Speculative Decoding**:  
  - Fixed draft-head reuse regression in DFlash (`#30111`) → prevents incorrect embedding sharing in Gemma-style layouts.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|-------|-------|
| ⚠️ High | **Qwen3.8-Flash-Next MTP crashes on startup** when using `--spec-draft-model` | Open (#29811) | None |
| ⚠️ High | **Vulkan: VAE garbles images under low VRAM** | Closed, stale (#24943) | No fix yet |
| ⚠️ High | **Blackwell GGML-CUDA SOFT_MAX crash on RTX 5090 (SM 12.0)** | Open (#25060) | Patch proposed (not merged) |
| ⚠️ Medium | **OpenVINO crashes due to AVX-512 ILLEGAL_INSTRUCTION** | Open (#28726) | Pending |
| ⚠️ Medium | **Stochastic tool-call emission in Qwen4Exp (CUDA)** | Open (#28497) | CUB DeviceTopK tied scores issue |
| ⚠️ Low | **llama-server segfault on tool named "call"** | Closed (#29967) | Fixed in `b11471` |

> 💡 *Note:* Several regressions involve speculative decoding and vision model pipelines — users of `mtmd`, `MTP`, or `DFlash` should monitor PRs #29811, #28497, and #25060.

---

### **6. What This Means for Application Developers**  
- ✅ **Multimodal apps** can now use **Cohere2 Vision** and **LiquidAI/d1-omni-600M** with minimal code changes — leverage `mtmd` and `llama serve -hf` for unified vision/audio/text routing.  
- 🚀 **High-throughput agents** benefit from **GPU-cached MoE experts** and **multi-GPU MoE support** — ideal for large speculatively-decoded models like Qwen3.8-Flash-Next.  
- ⚠️ **Avoid `--spec-draft-model` with Qwen3.8-Flash-Next MTP until #29811 is resolved** — may cause startup crashes.  
- 📈 **Optimize for Metal/CUDA/Hexagon** with new kernels: expect **2–3× faster matmuls** on supported devices. Use `--tensor-split` cautiously — known to cause output degeneration in long-context MoE (#28185).  
- 🔐 **Security-aware**: PR #30130 mitigates audio DoS risk by chunking reads — apply immediately if exposing `llama-server` publicly.

> 🔗 [Latest Builds](https://github.com/ggml-org/llama.cpp/releases/tag/b11481) | [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-08**

---

### **1. Today's Highlights**  
Ollama v0.40.1 rolls out critical fixes for Windows memory handling and cloud proxy routing, while stabilizing the MLX backend on macOS. A surge in issues around `clef-flash` model failures and MLX runtime panics signals ongoing challenges with decision models and GPU kernel compatibility in recent releases.

---

### **2. Releases & Breaking Changes**  
- **v0.40.1**: Released today with three key fixes:  
  - ✅ **Proxy support**: Cloud usage and balance APIs now properly proxied via `server: proxy cloud usage and balance APIs` ([#18829](https://github.com/ollama/ollama/pull/18829)).  
  - ✅ **Windows memory fix**: Resolves incorrect `clef` head reads past 2GiB on Windows ([#18777](https://github.com/ollama/ollama/pull/18777)).  
  - ✅ **CLI onboarding**: Removes redundant account step; users now proceed directly to launcher after Enter ([#18826](https://github.com/ollama/ollama/pull/18826)).  

> ⚠️ **Migration Note**: The new `local compat GGUF migration` engine may cause duplicate model entries (`ollama list`) and manifest symlinks on Windows (see #18830, #18847). Avoid upgrading without backup if using local models.

---

### **3. New Model & Hardware Support**  
- **New Requested Models**:  
  - [MIMO v2.5 (1M+ token context)](https://github.com/ollama/ollama/issues/15887) — Xiaomi’s open-source LLM under MIT license, highly requested for long-context applications.  
  - [Qwen 3.8 Flash, Mimo v2.6, Hy4, Stepfun, Laguna, Reflection AI](https://github.com/ollama/ollama/issues/18850) — repeated demand for richer cloud model variety beyond DeepSeek.  

- **Hardware/Backend**:  
  - **MLX on macOS M-series**: Still under active investigation due to regressions in `qwen3.6:35b-mlx` and `clef-flash` crashes ([#18856](https://github.com/ollama/ollama/issues/18856), [#18846](https://github.com/ollama/ollama/issues/18846)).  
  - **FreeBSD**: Compilation failure due to `int64 × uint64` mismatch in disk space calculation ([#18835](https://github.com/ollama/ollama/issues/18835)) — requires patching in `compatmigrate/disk_unix.go`.

---

### **4. Performance & Optimization**  
- **MLX Quantization**: Mixed-precision models with per-layer 8-bit overrides fail to load due to shape mismatches in `quantized_matmul` ([#18789](https://github.com/ollama/ollama/issues/18789)).  
- **MLX Kernel Limits**: `qwen3.6:35b-mlx` fails on M-series Macs with “Maximum threads per threadgroup is 896 but requested 1024” — a hard kernel limit violation ([#18846](https://github.com/ollama/ollama/issues/18846)).  
- **Embedding Speed**: `embeddinggemma-2:740m` requires MLX support but fails silently if unavailable ([#18825](https://github.com/ollama/ollama/issues/18825)).  
- **Connection Reuse**: `llama-server` HTTP connections are not reused during `/api/embed`, causing overhead ([#18397](https://github.com/ollama/ollama/pull/18397)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix PR |
|--------|------|------------|-------|
| 🔴 Critical | `clef-flash` fails on `/v1/systemone` | "Clef: non-finite logit" (CUDA) / "cannot open model" (CPU) on first forward pass — works on `/v1/chat/completions` ([#18769](https://github.com/ollama/ollama/issues/18769), [#18836](https://github.com/ollama/ollama/issues/18836)) | ❌ No fix yet |
| 🔴 Critical | MLX panic on M-series Macs | `mlx runner failed: panic: mlx: Maximum threads per threadgroup is 896 but requested 1024` — regression from 0.35.0 ([#18846](https://github.com/ollama/ollama/issues/18846)) | ❌ No fix yet |
| 🟡 High | Model pull behind proxy fails | `Error: redirect target not allowed` or DNS resolution errors post-0.35 — breaks CI/enterprise setups ([#18831](https://github.com/ollama/ollama/issues/18831), [#18842](https://github.com/ollama/ollama/issues/18842)) | ✅ Fix pending in [#18852](https://github.com/ollama/ollama/pull/18852) (symlink avoidance) |
| 🟡 Medium | Duplicate models & broken manifests | After GGUF migration, `ollama list` shows duplicates and `llamacpp:<sha>` tags ([#18830](https://github.com/ollama/ollama/issues/18830)) | ✅ Partial fix in [#18852](https://github.com/ollama/ollama/pull/18852) |
| 🟡 Medium | `deepseek-v4.1-flash:cloud` returns 500 with image input > ~655k tokens | Regression on Ollama Cloud endpoint ([#18853](https://github.com/ollama/ollama/issues/18853)) | ❌ No fix yet |

---

### **6. What This Means for Application Developers**  
- **Avoid v0.40.x on Apple Silicon** until MLX kernel limits are addressed — `qwen3.6:35b-mlx` and `clef-flash` will crash. Downgrade to `0.35.1` if stability is required.  
- **Use `qwen3.5:9b` with caution** — Windows users report symlink-based manifest access errors after upgrade ([#18847](https://github.com/ollama/ollama/issues/18847)).  
- **Validate model names** carefully: Gemma 4 12B models without `12b` in name default to `gemma4-small` renderer, altering prompt structure ([#18824](https://github.com/ollama/ollama/issues/18824)).  
- **Expect delays in model availability** — many high-demand models (MIMO, Qwen 3.8, etc.) are still missing from Ollama Cloud. Monitor [#15887](https://github.com/ollama/ollama/issues/15887) and [#18850](https://github.com/ollama/ollama/issues/18850) for updates.  
- **Optimize embedding pipelines**: Use connection reuse (`#18397`) and avoid `manifest` symlinks on Windows to prevent I/O failures.

> 💡 *Pro Tip*: For production agents using `systemone` or `embed` endpoints, test on `0.35.1` until `clef-flash` and MLX regressions are resolved.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-08**

#### **1. Today's Highlights**
The LiteLLM ecosystem continues rapid evolution with key stability improvements in streaming, tracing, and authentication flows. A major focus remains on the ongoing **Rust migration** (Issue #31263), now entering active development phase with early beta access available. New PRs today enhance proxy resilience, improve trace visibility via end-user feedback storage, and expand support for Microsoft 365 Copilot and GitHub Copilot OAuth integrations.

#### **2. Releases & Breaking Changes**
- **v1.106.0-dev.1**, **v1.105.0-rc.2**, **v1.104.1**, **v1.103.4**, **v1.102.3**, **v1.101.5**, and **v1.100.5** released within last 24h.  
- All Docker images are cryptographically signed using [cosign](https://github.com/BerriAI/litellm/commit/0112e53) — verify via `cosign verify` using the shared key.
- No breaking API changes reported; all releases are pre-release or RC versions targeting upcoming stable milestones.

> 🔗 [GitHub Release Notes](https://github.com/BerriAI/litellm/releases)

#### **3. New Model & Hardware Support**
- ✅ **Microsoft 365 Copilot**: Added as a new chat provider (`microsoft_365_copilot`) with delegated user token exchange via OAuth ([PR #45158](https://github.com/BerriAI/litellm/pull/45158)).
- ✅ **GitHub Copilot**: Per-user OAuth connections now supported (`auth_type: per-user-github-oauth`) — each request uses the calling user’s personal token ([PR #45241](https://github.com/BerriAI/litellm/pull/45241)).
- ✅ **Databricks ai_decide**: Now supported as a `/v1/decisions` provider and auto-router decider ([PR #45200](https://github.com/BerriAI/litellm/pull/45200)).
- ✅ **Gemini Context Cache Pricing**: Explicit hourly billing for context cache storage now tracked in spend metrics ([PR #45019](https://github.com/BerriAI/litellm/pull/45019)).

#### **4. Performance & Optimization**
- **Rust Migration Progress**: The flagship project (#31263) aims to deliver sub-1ms overheads and minimal memory footprint. Early beta testers are being onboarded ([sign-up form](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...)).
- **Streaming Efficiency**: Fixes ensure `finish_reason` is preserved during tool call streaming with `response_format` ([PR #45147](https://github.com/BerriAI/litellm/pull/45147)).
- **Retry Logic Enhancement**: `completion()` now respects `retry-after` headers from providers, preventing premature retries ([PR #45247](https://github.com/BerriAI/litellm/pull/45247)).
- **WebSocket Management**: Idle responses WebSockets no longer close after 30 seconds — configurable session limits prevent pool exhaustion ([PR #44433](https://github.com/BerriAI/litellm/pull/44433)).

#### **5. Stability & Regressions**
| Severity | Issue | Description | Fix Status |
|--------|------|------------|-----------|
| High | [#13419](https://github.com/BerriAI/litellm/issues/13419) | GPT-5 thinking output missing in OpenWebUI when using OpenRouter | Open – 51 comments |
| High | [#15230](https://github.com/BerriAI/litellm/issues/15230) | "Only available for Enterprise" error on virtual key edits despite no enterprise use | Open – 39 comments |
| Medium | [#44979](https://github.com/BerriAI/litellm/issues/44979) | `tool_result.is_error` lost during Anthropic → OpenAI translation | Open – 5 comments |
| Medium | [#44546](https://github.com/BerriAI/litellm/issues/44546) | Gemini TTS billed twice due to synchronous speech provider called twice | Open – 5 comments |
| Low | [#44154](https://github.com/BerriAI/litellm/issues/44154) | Health check errors incorrectly attributed across shared models | Closed – fix merged |
| Low | [#44182](https://github.com/BerriAI/litellm/issues/44182) | Team ID not verified in JWT claims | Closed – fix merged |

> ⚠️ Critical regression: `gpt-5` thinking outputs not visible in OpenWebUI — impacts agent debugging and explainability workflows.

#### **6. What This Means for Application Developers**
- **Build more secure, tenant-aware gateways**: With per-user GitHub OAuth and Microsoft 365 Copilot integration, you can now build fine-grained access control without exposing credentials.
- **Improve observability**: Lens now supports storing end-user feedback directly in ClickHouse ([PR #45171](https://github.com/BerriAI/litellm/pull/45171)), enabling UX-driven model evaluation.
- **Avoid cost surprises**: New `cache_storage_cost_per_token_per_hour` pricing ensures accurate spend tracking for Vertex AI users.
- **Prepare for Rust migration**: If low-latency inference is critical (e.g., real-time agents), monitor [Rust migration progress](https://github.com/BerriAI/litellm/issues/31263) — early adopters will benefit from <1ms overheads.
- **Handle edge cases carefully**: Be aware of known issues around virtual keys, tool result handling, and streaming behavior — especially when routing between Anthropic and OpenAI formats.

> 💡 Pro Tip: Use `GET /gateway/daily/activity` (new in #45244) to break down failed requests by HTTP status code — essential for diagnosing client-side vs. gateway failures.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-08**

---

### **1. Today's Highlights**  
Unsloth v0.1.904-beta introduces a major leap in decision-making capabilities, enabling users to train custom Jev-style decision models from any text or vision LLM with accuracy jumping from ~30% to 80%. The release also brings native ComfyUI model support, improved diffusion pipelines, and enhanced desktop browser functionality. Meanwhile, critical UI/UX refinements and security hardening are underway across Studio, including safer handling of file downloads, embedded audio, and dynamic content rendering.

---

### **2. Releases & Breaking Changes**  
- **v0.1.904-beta** (released 2026-10-07):  
  - Added: Trainable decision models via `unsloth.train_decision_model()` — supports all LLMs and vision encoders.  
  - Export and serve trained decision models directly within Unsloth.  
  - Native ComfyUI model integration (via `.json` + `.safetensors`), enabling seamless workflow reuse.  
  - Improved desktop browser: better tab management, video attachment playback, and download UX.  
  - *Migration note:* Existing training workflows using `Qwen-Image-2.1-GGUF` may require re-downloading with updated quantization metadata if encountering memory errors (see #11792).

> 🔗 [GitHub Release v0.1.904-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.904-beta)

---

### **3. New Model & Hardware Support**  
- **New model types**:  
  - Decision models now trainable on any LLM/vision encoder (e.g., Qwen-VL, LLaVA, Phi-3-Vision).  
  - Native support for ComfyUI pipeline exports (`*.json`, `*.safetensors`) in desktop and Studio environments.  

- **Hardware & backend improvements**:  
  - Enhanced ROCm support for AMD GPUs (Radeon AI Pro R9700) with proper torch version pinning (`<2.15.0`).  
  - macOS MPS now handles VAE tiling without float64 weight promotion (fixes #12935).  
  - Windows App Containers (MXC) now robustly handle Python sandboxing (PR #12941 addresses `ReadGrantError`).

> 🔗 [PR #12941 – MXC Grant Handling](https://github.com/unslothai/unsloth/pull/12941)  
> 🔗 [PR #12947 – AMD PyTorch Version Locking](https://github.com/unslothai/unsloth/pull/12947)

---

### **4. Performance & Optimization**  
- **Throughput & latency**:  
  - `llama-server` now auto-upgrades micro-batch size to **2048** when MoE experts spill to RAM (#12950), improving throughput by up to **~4x** on systems with large VRAM gaps.  
  - GPU cache for spilled MoE experts auto-sized via `--moe-cache-mib auto` (#12951), reducing thrashing and improving stability under high load.  
  - Embedding model inference speed increased from **5 chunks/sec (CPU)** to **129 chunks/sec (GPU)** using `llama-server` instead of `sentence-transformers` (#13006).  

- **Memory efficiency**:  
  - Int4 loader now validates `group_size` against actual `weight_scale` tensor shape (#12955), preventing silent corruption during loading.  
  - Fixed CPU spike in idle state on Windows due to unbounded OpenBLAS threads (#12942); setting `OPENBLAS_NUM_THREADS=1` is now effective.

> 🔗 [PR #12950 – Auto Microbatch Increase](https://github.com/unslothai/unsloth/pull/12950)  
> 🔗 [PR #12951 – Dynamic MoE Cache Sizing](https://github.com/unslothai/unsloth/pull/12951)  
> 🔗 [PR #12942 – Idle CPU Spike Fix](https://github.com/unslothai/unsloth/pull/12942)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| High | `python.exe` spins at 95% CPU across all cores at idle (Windows) | Open | [PR #12942](https://github.com/unslothai/unsloth/pull/12942) |
| High | `Qwen-Image-2.1-GGUF` fails to load on M5 Max (48GB RAM) | Open | [Issue #11792](https://github.com/unslothai/unsloth/issues/11792) |
| High | Long-context chat lags after v0.1.903-beta | Open | [Issue #12552](https://github.com/unslothai/unsloth/issues/12552) |
| Medium | Bonsai models (1bit/Ternary) fail to load | Open | [Issue #11259](https://github.com/unslothai/unsloth/issues/11259) |
| Medium | Tool call arguments lost in Qwen3.5 safetensors/MLX prompts | Open | [PR #12988](https://github.com/unslothai/unsloth/pull/12988) |
| Low | Spell check misfires in multilingual prompts (Windows) | Open | [Issue #12861](https://github.com/unslothai/unsloth/issues/12861) |

> ⚠️ Critical: Multiple regressions affect core workflows (tool calls, long context, model loading). Several PRs are open but not yet merged.

---

### **6. What This Means for Application Developers**  
- **Build agent workflows around decision models**: Use `train_decision_model()` to create lightweight, high-accuracy agents that can act on user input without relying on external APIs. Ideal for structured tasks like routing, filtering, or conditional logic.  
- **Optimize RAG pipelines**: Prefer `llama-server` over `sentence-transformers` for embedding models—performance gains are dramatic on GPU. Use `--moe-cache-mib auto` to manage spillover efficiently.  
- **Secure your app’s environment**: Enforce `whisper-server` isolation via random per-launch paths (PR #13002); avoid exposing sensitive endpoints.  
- **Handle edge cases in data**: When training vision models, validate dataset integrity (e.g., missing images in `ScienceQA`—PR #12991).  
- **Monitor dependencies**: Avoid `pip install "unsloth[amd]"` replacing ROCm torch with CUDA versions; verify installation path and use `uv` or virtualenv for clean isolation.

> 📌 Pro tip: Use the new **Downloads button in Studio’s browser panel** (PR #13009) to track file transfers and prevent accidental overwrites.

---  
*Digest generated: 2026-10-08 | Source: [unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*