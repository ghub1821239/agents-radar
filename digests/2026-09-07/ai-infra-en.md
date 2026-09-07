# AI Infrastructure Digest 2026-09-07

> Generated: 2026-09-07 00:19 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-07**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of high specialization and hardware convergence, with projects increasingly targeting next-generation accelerators like NVIDIA Blackwell (SM120/SM121), Apple Silicon M-series, and AMD RDNA4. Critical focus areas include stability in speculative decoding, multi-modal caching, and cross-platform parity—especially on ROCm and Apple MLX backends. While vLLM and SGLang lead in low-level kernel optimization and distributed inference, llama.cpp remains the dominant local runtime for edge and CPU-first deployments. Meanwhile, LiteLLM and Ollama serve as gateway layers enabling abstraction across providers, though both face growing pains around observability and reliability in cloud-native agent workflows.

---

### **2. Activity Comparison**

| Project        | Issues Open (High/Med) | PRs Merged (Last 24h) | Release Status         |
|----------------|------------------------|------------------------|------------------------|
| **vLLM**       | 5 (3 High, 2 Medium)   | 12                     | None                   |
| **SGLang**       | 5 (4 High, 1 Medium)   | 8                      | None                   |
| **llama.cpp**    | 5 (2 High, 3 Medium)   | 7                      | `b10826` stable        |
| **Ollama**       | 6 (2 High, 4 Medium)   | 2                      | None                   |
| **LiteLLM**      | 5 (2 High, 3 Medium)   | 5                      | `v1.101.0-rc.1` RC     |
| **Unsloth**      | 4 (2 High, 2 Medium)   | 6                      | None                   |

> 🔍 *Observation:* vLLM leads in active development velocity; Ollama lags in PR volume despite high-severity issues. LiteLLM is actively shipping RC releases with security hardening via cosign signing.

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**   | ✅ (Stable fix in progress) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **DeepSeek-V4-Flash**    | ✅ (Fixes in flight) | ✅ (Crash under load) | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**        | ✅ (SM120/SM121 native) | ⚠️ (Startup crash, HiCache corruption) | ❌ | ❌ | ❌ | ❌ |
| **Gemma 3/4 (NVFP4)**    | ✅ (Full SM120/SM121 support) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Spark2_5ForCausalLM**  | ❌ | ❌ | ✅ (Full GGUF support) | ⚠️ (Not recognized) | ❌ | ❌ |
| **ExLlamaV3 (MoE)**      | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PR #7115) |
| **Apple Silicon (MLX)**  | ❌ | ✅ (Roadmap) | ✅ (M2 Max FA-vec) | ⚠️ (Stuck "Stopping...") | ❌ | ❌ |

> 🏆 **Leader:** **vLLM** holds clear advantage in production-ready support for new models on cutting-edge GPUs (Blackwell, GB10). **llama.cpp** dominates in model conversion fidelity and local runtime flexibility. **Unsloth** is pioneering MoE and large-scale fine-tuning infrastructure.

---

### **4. Performance Frontier**

| Focus Area               | vLLM                              | SGLang                            | llama.cpp                        | Ollama                    | LiteLLM                  | Unsloth                     |
|--------------------------|-----------------------------------|-----------------------------------|----------------------------------|----------------------------|--------------------------|------------------------------|
| **KV Cache Optimization** | ✅ Hybrid GDN+attention MTP, UUID-based media caching | ✅ Network-aware KV broadcast (DSA) | ⚠️ Unified-KV limitation in flash-attn | ❌ Prefix-cache truncated to 8K tokens | ⚠️ Cross-team cache pollution risk | ✅ Shared KV preemption (async replicas) |
| **Batching & Throughput** | ✅ Sparse attention + persistent_topk fixes | ✅ DSA efficiency (inter-node transfer reduction) | ✅ Lazy mode refactoring (AMD iGPU) | ❌ Vulkan regression (iGPU) | ✅ AdaptiveRouter (beta) | ✅ Two-Spark async replica routing |
| **Quantization & Compression** | ✅ NVFP4, FP8 via FA2 | ✅ Default FP4 GEMM on SM120 | ✅ Q6_K/Q2_K/MMVQ warps (RDNA4) | ❌ MiniMax-W4A16 NUL output | ✅ Qwen3.7-Max (Anthropic API) | ✅ Explicit consent for FP8/FP4 export |
| **Distributed Serving**   | ✅ Multi-GPU, ROCm CI expansion | ✅ Pipeline parallelism (issue pending) | ❌ No distributed support | ❌ Limited DP/TP awareness | ✅ AdaptiveRouter (multi-provider) | ✅ Two-Spark DGX clustering (in dev) |
| **Kernel-Level Tuning**   | ✅ FlashInfer, FA2, sparse indexing | ✅ FlashInfer b12x NVFP4, MLA kernels | ✅ RDNA4 gfx1201 CUDA/HIP, Metal FA-vec | ❌ Flash Attention crash (Blackwell) | ❌ No kernel work | ❌ Triton pointer error (CPU tensor) |

> 📈 **Trend:** The performance frontier is shifting toward **hardware-specific kernel tuning** (RDNA4, Blackwell, M2 Max), **distributed inference at scale**, and **efficient memory management** (KV cache sharing, quantized offloading).

---

### **5. Layer Positioning**

| Project        | Primary Layer                     | Key Differentiator |
|----------------|------------------------------------|--------------------|
| **vLLM**       | **Inference Engine**               | Industry standard for high-throughput, GPU-optimized LLM serving with deep kernel integration |
| **SGLang**     | **Inference Engine + Distributed Runtime** | Advanced DSA/MLA support, strong focus on multi-node and pipeline parallelism |
| **llama.cpp**  | **Local Runtime / Edge Inference** | Unmatched portability, CPU/GPU hybrid execution, model conversion fidelity |
| **Ollama**     | **LLM Gateway / Developer Experience** | Simplified local deployment, but suffers from stability regressions in cloud and MLX paths |
| **LiteLLM**    | **LLM Gateway / Abstraction Layer** | Provider-agnostic routing, cost tracking, OAuth2 integrations — critical for multi-cloud agents |
| **Unsloth**    | **Fine-Tuning & Scalable Training Infrastructure** | Leading in MoE training, async replica routing, and scalable cluster orchestration |

> 🧩 **Positioning Insight:** vLLM and SGLang are competing at the core inference layer; llama.cpp owns the edge/local space; Ollama and LiteLLM occupy the application-facing gateway layer—where stability and observability are now major differentiators.

---

### **6. Trend Signals**

#### 🔥 **Key Trends Extracted:**
1. **Hardware Convergence:** Projects are racing to enable native support for **Blackwell (SM120/SM121)**, **Apple M-series**, and **AMD RDNA4**, indicating that next-gen silicon is becoming the de facto baseline for high-performance inference.
2. **Speculative Decoding Stability Crisis:** Multiple projects report non-deterministic outputs or crashes under speculative decoding—highlighting a systemic challenge in ensuring deterministic behavior across quantized and hybrid models.
3. **Observability Gap:** Despite growing demand, **no project has shipped a full Prometheus `/metrics` endpoint** (Ollama, LiteLLM still pending). This creates blind spots in monitoring agent pipelines.
4. **Security & Trust by Design:** LiteLLM’s adoption of **cosign-signed Docker images** signals a shift toward verifiable software supply chains in production-grade AI infra.
5. **Agent Workload Pressure:** Persistent issues with **prefix cache truncation (Ollama)**, **grammar parsing limits (llama.cpp)**, and **JSON splitting (Ollama)** reveal that agent-centric use cases are exposing deeper architectural weaknesses.

#### 🛠️ **What Developers Should Watch:**
- ✅ **Pin to stable versions** (e.g., `vLLM v0.27`, `llama.cpp b10826`) until critical regressions are patched.
- ✅ **Avoid `:cloud` tags** in Ollama until JSON parsing bugs are resolved.
- ✅ **Enable `cosign verify`** for LiteLLM in production.
- ✅ **Monitor PRs #55563 (vLLM)**, **#38143 (SGLang)**, and **#16998 (Ollama)**—these are pivotal for agent reliability.
- ✅ **Prepare for FP8/FP4 exports** via Unsloth and consider dependency consent workflows in CI/CD.

> 💡 **Final Takeaway:** The AI inference stack is maturing rapidly—but only at the cost of increasing complexity. Developers must now prioritize **stability, observability, and trust** over raw speed. The winners will be those who build resilient, auditable, and interoperable pipelines across this fragmented yet accelerating landscape.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-07**

#### **1. Today's Highlights**  
Critical stability fixes were merged for **Qwen3.8-Flash-Next** and **DeepSeek-V4-Flash**, addressing non-deterministic outputs at `temperature=0` due to sparse attention and persistent_topk issues. New PRs enhance **multi-modal media caching via UUIDs**, improve **KV cache error messaging**, and resolve **ROCm CI coverage gaps**—signaling stronger cross-platform reliability ahead of v0.28.

#### **2. Releases & Breaking Changes**  
None. No new releases or breaking API/config changes reported in the past 24 hours.

#### **3. New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash**: Native support enabled on SM120/SM121 (GB10/DGX Spark) without manual config edits via #55563.  
- ✅ **Gemma 3/4 (NVFP4)**: Full consumer Blackwell (sm120/sm121) support with FA2 NVFP4 KV cache via #46329.  
- ✅ **ROCm**: Expanded CI testing for `ROCM_AITER_FA` and `FLASH_ATTN MLA` prefill backends (#55611).  
- ✅ **Multi-modal UUID Caching**: Media identity now uses UUIDs by default, enabling faster cache hits and URL-agnostic lookups (#55616, #55583).

#### **4. Performance & Optimization**  
- 🔧 **Sparse Attention Optimization**: Reduced default indexer logits budget on unified-memory GPUs (e.g., GB10) to prevent OOM during long prefills (#55572).  
- 🚀 **KV Cache Efficiency**: PRs #55617 and #55603 address hybrid GDN+attention MTP speculative decoding edge cases and improve diagnostic clarity for `gpu_memory_utilization` errors.  
- ⚙️ **Tool-Calling & Determinism**: Added `thinking_token_budget` truncate mode for RL rollouts (#54864), and added chunked prefill coverage to batch-invariance tests (#55612).  
- 📊 **Mypy Enforcement**: Final phase of test suite type checking completed (#55485), improving code quality and maintainability.

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |  
|------|----------|--------|--------|  
| #55571: CUDA illegal memory access (Xid 13) on RTX PRO 5000 (SM120) under load | Critical | Open | [PR #55571](https://github.com/vllm-project/vllm/issues/55571) |  
| #54521: Non-deterministic greedy decoding in Qwen3.8-Flash-Next near `indexer_budget` | High | Open | [PR #55563](https://github.com/vllm-project/vllm/pull/55563) |  
| #53257: Non-deterministic output in DeepSeek-V4-Flash at `temperature=0`, concurrency-dependent | High | Open | [PR #55571](https://github.com/vllm-project/vllm/issues/55571) |  
| #53504: First repeat misses prefix cache in hybrid Mamba/GDN model | Medium | Open | N/A |  
| #53180: Degenerate output with TurboQuant k8v4 + MTP speculative decoding | Medium | Open | N/A |

> 💡 **Note**: The Xid 13 crash is reproducible under sustained load and can be mitigated via `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` or `--enforce-eager`.

#### **6. What This Means for Application Developers**  
- **Avoid deterministic failures** in production deployments using `Qwen3.8-Flash-Next` or `DeepSeek-V4-Flash` at `temperature=0` until #55563 and #55571 are resolved. Use `--enforce-eager` as a temporary workaround.  
- **Leverage UUID-based media caching** (`VLLM_EARLY_UUID_LOOKUPS`) to reduce latency in multi-modal apps—especially video-heavy agents.  
- **Expect better ROCm parity** post-#55611; ensure `VLLM_ROCM_USE_AITER=1` for full feature coverage.  
- **Monitor KV cache behavior** closely when using hybrid models (e.g., Mamba + GDN) with speculative decoding—first repeats may miss prefix cache entirely.  
- **Enable MyPy enforcement** in your CI if using vLLM’s test suites; this improves long-term maintainability and catchability of type bugs.

---  
*Digest generated from [vLLM GitHub](https://github.com/vllm-project/vllm) — 2026-09-07*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-07**

---

### **1. Today's Highlights**  
SGLang continues to advance its support for next-generation hardware, with critical work on Apple Silicon integration and Blackwell GPU optimizations. Notably, PR #38170 introduces default FP4 GEMM selection for SM120 (RTX PRO 6000/5090), while new PRs address high-severity DSA backend issues impacting GLM-5.3-Flash and DeepSeek-V4 long-context inference.

---

### **2. Releases & Breaking Changes**  
None. No new releases or breaking changes reported in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **Apple Silicon (M-series)**: Active roadmap progress via [Issue #19137](https://github.com/sgl-project/sglang/issues/19137) and [RFC #32321](https://github.com/sgl-project/sglang/issues/32321), focusing on Torch-owned SRT path with exported MLX model regions.  
- **T-Head PPU**: New feature request [Issue #37519](https://github.com/sgl-project/sglang/issues/37519) proposes first-class support for ZW810/810E and ZW-M890P cards.  
- **DGX Spark (GB10, SM121, aarch64)**: Ongoing efforts to resolve missing `sgl_kernel` wheels ([Issue #29317](https://github.com/sgl-project/sglang/issues/29317)) and enable full support for bfloat16 VLMs like `baidu/Unlimited-OCR`.

---

### **4. Performance & Optimization**  
- **Blackwell Optimization**: PR #37926 targets unified memory decode performance gap on Blackwell — reducing static pool latency difference from **1.96%** to near parity.  
- **FP4 GEMM Tuning**: PR #38170 enables FlashInfer’s `b12x` NVFP4 GEMM by default on SM120, improving cold-weight GEMM throughput.  
- **DSA Efficiency**: PR #37950 introduces network-aware KV broadcast for MLA models, eliminating redundant inter-node transfers in Prefill CP → Decode TP configurations.  
- **AMD ROCm Improvements**: Multiple PRs enhance sparse MLA kernels (`#30575`, `#37465`) and HiCache IO backend (`#37152`) for better performance on MI355X.

---

### **5. Stability & Regressions**  
High-priority regressions reported today:
- **GLM-5.3-Flash crashes at startup under pipeline parallelism** ([Issue #36906](https://github.com/sgl-project/sglang/issues/36906)) – *KeyError: 'residual'*.
- **GLM-5.3-Flash HiCache host-tier load-back corrupts generation without speculative decoding** ([Issue #38031](https://github.com/sgl-project/sglang/issues/38031)) – Causes dropped tool calls and degenerate repetition loops.
- **DeepSeek-V4 long-context prefill fails with illegal memory access** ([Issue #37892](https://github.com/sgl-project/sglang/issues/37892)) – Top-k kernel crash in `topk_v1.cuh`.
- **MiniMax-M3 W4A16 compressed tensors produce all-NUL output** ([Issue #38143](https://github.com/sgl-project/sglang/issues/38143)) – Triton MiniMaxSparse path defect; correct on vLLM.

*Note: No corresponding fix PRs submitted yet for these high-severity issues.*

---

### **6. What This Means for Application Developers**  
- **Expect improved performance on RTX PRO 6000/5090 (SM120)** with default FP4 GEMM tuning — ensure you’re using `v0.5.19.dev410+` or later.  
- Avoid `--speculative-algorithm NEXTN` with `DeepseekV4ForCausalLM` until [Issue #38236](https://github.com/sgl-project/sglang/issues/38236) is resolved.  
- If deploying on **ROCm**, verify that HiCache IO backend works correctly — current default (`kernel`) faults on ROCm ([PR #37152](https://github.com/sgl-project/sglang/pull/37152) in progress).  
- For **multi-GPU deployments**, monitor KV pool budgeting — [Issue #38202](https://github.com/sgl-project/sglang/issues/38202) reveals a `tp_size` vs `attn_tp_size` mismatch causing OOM in Kimi-K3 under DP attention.  

Stay tuned for upcoming Apple Silicon support and finalization of GLM-5.3-Flash stability tracking via [Issue #37524](https://github.com/sgl-project/sglang/issues/37524).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-09-07**

---

### **1. Today's Highlights**  
The latest updates focus on **model conversion fidelity**, **GPU kernel optimizations**, and **critical stability fixes** for speculative decoding and KV cache handling. Notable improvements include support for the Spark2_5 model architecture, a fix to GDN normalization in flash-linear-attention, and enhanced GPU backend tuning for RDNA4 (AMD) and M2 Max (Apple Silicon). These changes collectively improve inference reliability and performance across diverse hardware.

---

### **2. Releases & Breaking Changes**  
- **`--fuse-qkv` flag added** to HF-to-GGUF conversion (#22780): Enables fusion of Q/K/V projections into a single QKV matrix during model conversion, improving runtime efficiency on compatible backends. [PR #22780](https://github.com/ggml-org/llama.cpp/pull/22780)  
- **`--log-jsonl` option introduced** (#28437): Adds structured JSONL logging output for better observability in production systems. [PR #28437](https://github.com/ggml-org/llama.cpp/pull/28437)  
- **UI assets now embedded via CMake** (#28445): Removes external gzip dependency and build-time C++ helpers, simplifying cross-compilation workflows. [PR #28445](https://github.com/ggml-org/llama.cpp/pull/28445)

> 🔔 *Note:* No breaking API changes were reported in this cycle.

---

### **3. New Model & Hardware Support**  
- **Spark2_5ForCausalLM model support added** (#27868): Full end-to-end integration including GGUF conversion, tokenizer pre-tokenizer logic, tensor mapping, and loading pipeline. [PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868)  
- **Kimi-K3 recurrent-state rollback enabled** (#28466): Allows bounded state rollback during speculative decoding for Kimi-K3 models, enabling more reliable agentic behavior. [PR #28466](https://github.com/ggml-org/llama.cpp/pull/28466)  
- **RDNA4 (gfx1201) CUDA/HIP kernel optimizations** ongoing: PRs targeting `Q6_K`, `Q2_K`, and MMVQ warps are being tested; early results show improved decode throughput on AMD RX 9070 XT. [PR #25940](https://github.com/ggml-org/llama.cpp/pull/25940), [PR #28102](https://github.com/ggml-org/llama.cpp/pull/28102)  
- **M2 Max Metal FA-vec tunings added** (#28458): Optimized flash-attention vector kernels for Apple Silicon M2 Max GPUs. [PR #28458](https://github.com/ggml-org/llama.cpp/pull/28458)

---

### **4. Performance & Optimization**  
- **Flash Attention tuning for gfx1201 (RDNA4)**: Initial benchmarks indicate **~5–7x speedup** in token generation on RX 9070 XT vs. current Vulkan path, with effective bandwidth approaching ~100 GB/s. [PR #28102](https://github.com/ggml-org/llama.cpp/pull/28102)  
- **Qwen4exp PLE table direct reads** (PR #28136): Direct memory access improves prefill performance by **over 2x** on GB10 platforms, resolving inconsistent prefill rates previously observed.  
- **Lazy mode refactoring** (#28326): Redesigned `auto` mode to intelligently select load strategy based on system profile; resolves regression where `--lazy-mode auto` halved pp512 on AMD iGPU. [PR #28326](https://github.com/ggml-org/llama.cpp/pull/28326)  
- **OpenCL Q4_K/M mul_mat optimization** (#28402): Properly selects weight packing for Q4_K and Q5_K, reducing compute bottlenecks on multi-GPU OpenCL setups.

---

### **5. Stability & Regressions**  
- **Speculative decoding divergence on quantized targets** (#25618): Greedy sampling produces different outputs between speculative and vanilla runs when target is quantized (e.g., Q4_K_M), but matches on BF16. *No fix yet.*  
- **Prompt processing drops 42–54% after second long request** (#28495): Caused by unified-KV limitation in CUDA/HIP flash-attention kernels skipping only tail INF blocks, not interior ones. *Known root cause; pending patch.*  
- **Silent instant-EOS beyond ~130k context on Qwen3.5-hybrid** (#27756): Recurrent-state depth × layer-count degradation leads to premature EOS. Affects both CPU and CUDA. *No fix yet.*  
- **Grammar parser fails on array length test at exactly 2000 chars** (#27859): Invalid GBNF generated from JSON schema with `maxLength=2000`. *Fix expected soon.*  
- **SVG image rendering incomplete on download** (#28336): UI displays correctly, but downloaded SVG has missing parts — likely due to async rendering race. *Workaround: copy-paste from browser.*

---

### **6. What This Means for Application Developers**  
- ✅ **Use `--fuse-qkv`** during GGUF conversion for better prefill performance on supported models.  
- 🚨 **Avoid `--lazy-mode auto`** if running on AMD iGPUs or older Intel Arc devices — use `large` or `all` explicitly until PR #28326 lands.  
- ⚠️ **Be cautious with speculative decoding** on quantized models (especially Q4_K_M); expect potential output divergence under greedy sampling.  
- 🛠️ **Leverage `--log-jsonl`** for centralized logging in agent pipelines and monitoring stacks.  
- 💡 **Expect faster inference on RDNA4 GPUs** once tuned kernels are merged — ideal for high-throughput LLM agents.  
- 📌 **Monitor grammar parsing limits**: Avoid schemas with `maxLength >= 2000` until #27859 is resolved.  

> For production deployments: Pin to `b10826` or later for stability, especially when using speculative decoding or long-context models. [Latest release](https://github.com/ggml-org/llama.cpp/releases/tag/b10826) | [GitHub Attestations](https://github.com/ggml-org/llama.cpp/attestations/45586039)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-07**

---

### **1. Today's Highlights**  
Critical stability issues are emerging in Ollama Cloud and MLX backend workflows, including intermittent JSON output splitting for `minimax-m3:cloud`, persistent "Stopping..." states with `muse-glimmer:30b-mlx` on macOS, and a regression in Vulkan memory handling for large models on AMD iGPUs. Meanwhile, the community continues to push for essential observability improvements with multiple open requests for a Prometheus `/metrics` endpoint.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  

---

### **3. New Model & Hardware Support**  
- ✅ **New architecture support requested**: `spark2_5` (Spark-X2.5-4B / 1.7B) is not yet recognized by the Ollama runtime despite model download success ([#18195](https://github.com/ollama/ollama/issues/18195)).  
- ✅ **Community integrations added**: [deel](https://github.com/jysvai/deel-local-cli) and [INVAR](https://github.com/rybruscoe/invar) now listed in README as local agent and receipted Ollama gateway tools respectively ([#18270](https://github.com/ollama/ollama/pull/18270), [#18268](https://github.com/ollama/ollama/pull/18268)).

---

### **4. Performance & Optimization**  
- ⚠️ **MLX runner performance tax**: Prefix-cache restore is truncated to multiples of 8192 tokens, forcing a fixed 17–27s re-prefill after every cold prompt — a major latency hit for agent workloads ([#18267](https://github.com/ollama/ollama/issues/18267)).  
- ⚠️ **Flash Attention crash on Blackwell**: `qwen3-coder:30b` with `sm_120` (RTX 5070 Ti Laptop) crashes during warmup due to CUDA shared object initialization failure, despite successful memory fit ([#18276](https://github.com/ollama/ollama/issues/18276)).  
- 🔧 **Pending metrics endpoint**: PR [#16998](https://github.com/ollama/ollama/pull/16998) proposes an opt-in `/metrics` endpoint with granular gauges (queued requests, model load status, per-model token counts) for Prometheus monitoring.

---

### **5. Stability & Regressions**  
| Severity | Issue | GitHub Link |
|---------|------|------------|
| 🔴 High | `glm-5.3:cloud` enters endless reasoning loops, aborting tasks in OpenCode/ZCode; official Z.AI works normally | [#18193](https://github.com/ollama/ollama/issues/18193) |
| 🔴 High | `minimax-m3:cloud` intermittently splits JSON output between `reasoning` and `content`, rendering `content` invalid JSON | [#17987](https://github.com/ollama/ollama/issues/17987) |
| 🟡 Medium | Vulkan backend fails loading 66GB model on AMD iGPU (regression since v0.32.12) | [#18272](https://github.com/ollama/ollama/issues/18272) |
| 🟡 Medium | `muse-glimmer:30b-mlx` gets stuck in "Stopping..." state indefinitely on macOS (coincides with restarts) | [#18269](https://github.com/ollama/ollama/issues/18269) |
| 🟡 Medium | `gemma4:12b` tool call parser fails on `BEGIN_ARG/END_ARG`, triggering degenerate `<|channel>thought` loop | [#18275](https://github.com/ollama/ollama/issues/18275) |
| 🟡 Medium | Model name validation limit too short (80 chars), blocking long Hugging Face model names | [#18274](https://github.com/ollama/ollama/issues/18274) |

> *Note: No fix PRs submitted today for these critical regressions.*

---

### **6. What This Means for Application Developers**  
- **Avoid `:cloud` tags for production agents** if relying on structured JSON outputs — `minimax-m3:cloud` and `glm-5.3:cloud` exhibit unreliable parsing behavior.  
- **Use `OLLAMA_KEEP_ALIVE=30` or higher** for `muse-glimmer:30b-mlx` on macOS to mitigate “Stopping…” hangs, though this is a workaround, not a fix.  
- **Monitor for metric gaps** — no `/metrics` endpoint exists yet, so you’ll need external tools to track GPU/CPU utilization, queue depth, or request rates.  
- **Validate model names carefully** — avoid Hugging Face models with long paths until the 80-char limit is relaxed.  
- **Consider fallbacks for Flash Attention** — `qwen3-coder:30b` on Blackwell GPUs may fail silently under high load; disable `flash-attn` if instability occurs.

> 👉 Proactive developers should **track issue #18267 (MLX prefix-cache)** and **PR #16998 (/metrics)** closely — both are pivotal for optimizing agent inference pipelines.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-07**

---

### **1. Today's Highlights**  
The latest release, `v1.101.0-rc.1`, introduces enhanced security via cosign-signed Docker images—verified using the same key since commit `0112e53`. Critical stability fixes address persistent crashes in AdaptiveRouter (`gammavariate: alpha and beta must be > 0.0`) and streaming spend logging failures. A major regression in OAuth2 flow behavior (redirecting to LiteLLM UI instead of vendor auth) has been reported and is under active investigation.

---

### **2. Releases & Breaking Changes**  
- **`v1.101.0-rc.1`**: Release candidate with verified cosign signatures for all Docker images. [Verify signature](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
- **`v1.100.0`**: Stable release with no breaking changes noted.  
- **Breaking Change Alert**: Upgrading from `1.95.1` to `1.99.0+` triggers a regression where managed OAuth2 flows now open LiteLLM’s UI instead of the vendor’s authorization page ([#39665](https://github.com/BerriAI/litellm/issues/39665)).

---

### **3. New Model & Hardware Support**  
- Added support for **Qwen3.7-Max** via DashScope’s Anthropic-compatible API (`qwen3.7-max`). Model entry added to `model_prices_and_context_window.json` with proper `litellm_provider: "anthropic"` mapping. ([#29920](https://github.com/BerriAI/litellm/pull/29920))  
- Added **Foundry Local** as a first-class OpenAI-compatible provider with SDK 1.2 guidance and official logo. ([#29449](https://github.com/BerriAI/litellm/pull/29449))  

---

### **4. Performance & Optimization**  
No direct performance improvements or kernel optimizations were landed today. However, ongoing work on **response caching scoping per team** ([#29955](https://github.com/BerriAI/litellm/issues/29955)) aims to prevent cross-tenant cache pollution and improve isolation in multi-tenant deployments.

---

### **5. Stability & Regressions**  
**Critical Crashes & Bugs (Ranked by Impact):**  
1. **AdaptiveRouter crash post-restart**: `gammavariate: alpha and beta must be > 0.0` due to invalid state reload. Fixed in PR [#29398](https://github.com/BerriAI/litellm/pull/29398).  
2. **Streaming `/v1/responses` logs fail silently**: `dict` object has no attribute 'usage' → no spend log written, uncharged requests. Fixed in PR [#29943](https://github.com/BerriAI/litellm/pull/29943).  
3. **OAuth2 redirect bug**: Managed OAuth2 flow opens LiteLLM UI instead of vendor auth page. Reported in [#39665](https://github.com/BerriAI/litellm/issues/39665); fix pending.  
4. **Guardrail error surfaces as 500 instead of 400**: CustomCodeExecutionError not translated to HTTP 400. ([#29436](https://github.com/BerriAI/litellm/issues/29436))  
5. **Cache injection no-op + Claude tool-call loop**: `cache_control_injection_points` ignored on `/v1/responses` → infinite tool calls. ([#29810](https://github.com/BerriAI/litellm/issues/29810))

---

### **6. What This Means for Application Developers**  
- **Avoid upgrading to `1.99.0+` if using managed OAuth2** until [#39665](https://github.com/BerriAI/litellm/issues/39665) is resolved—your auth flow may break unexpectedly.  
- **Enable `cosign` verification** for production deployments: All images are signed; use `cosign verify` with the stable key from `0112e53`.  
- **Monitor spend tracking** closely: Streaming requests to `/v1/responses` may go uncharged if your config uses custom models without cost maps—fixes are incoming.  
- **Use `qwen3.7-max` via Anthropic protocol** with confidence—official support now included in pricing and routing.  
- **Expect instability in multi-tenant setups**: Cache sharing across teams remains a risk until [#29955](https://github.com/BerriAI/litellm/issues/29955) is implemented.  

> ✅ **Recommendation**: Pin to `v1.100.0` or `v1.101.0-rc.1` until critical regressions are patched. Audit guardrails, OAuth2, and cost tracking configurations immediately.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-07**

---

### **1. Today's Highlights**  
Unsloth continues its aggressive expansion into multi-node inference and high-performance fine-tuning infrastructure, with two major PRs introducing **two-Spark DGX clustering** and **async replica routing** for scalable model serving. Simultaneously, the team is refining **FP8/FP4 compression workflows** with explicit consent mechanisms and improved error handling, signaling a shift toward safer, more transparent model export pipelines.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, ongoing changes to `llm-compressor` integration (via #9405, #9554) will require explicit user consent before installing dependencies — a breaking change for automated workflows. Developers should update their scripts to handle `install_missing_dependencies=True` explicitly.

> 🔗 [PR #9405](https://github.com/unslothai/unsloth/pull/9405) | [PR #9554](https://github.com/unslothai/unsloth/pull/9554)

---

### **3. New Model & Hardware Support**  
- **ExLlamaV3 (EXL3) backend added** (#7115): Supports 2/3/4/6/8-bit quantization and MoE models — a major leap for Mixture-of-Experts (MoE) training and low-memory deployment.  
- **aarch64 container images requested** (#4198): Community demand growing for native support on Apple Silicon and ARM clusters.  
- **DGX Spark two-node clustering** now in development (#10280): Enables pipeline training across dual DGX Spark systems via ConnectX-7 200GbE links.  
- **Flux diffusion transformer** support requested (#876): High-priority feature for image generation workloads.

> 🔗 [PR #7115](https://github.com/unslothai/unsloth/pull/7115) | [Issue #876](https://github.com/unslothai/unsloth/issues/876) | [PR #10280](https://github.com/unslothai/unsloth/pull/10280)

---

### **4. Performance & Optimization**  
- **Two-Spark async replica routing** (#10323): Improves throughput by enabling parallel workloads across paired DGX Sparks without blocking event loops.  
- **KV preemption for shared cache** (#10301): Allows multiple parallel chats to share a unified KV cache, reducing memory pressure and improving concurrency.  
- **FP8/FP4 compression efficiency**: Now requires explicit consent but offers significant memory savings — ideal for large-scale LLM exports.  
- **WebkitGTK fence exhaustion fix** (#10214): Resolves progressive lag on NVIDIA X11 Linux AppImages by fixing WebKit compositing descriptor leaks.

> 🔗 [PR #10323](https://github.com/unslothai/unsloth/pull/10323) | [PR #10301](https://github.com/unslothai/unsloth/pull/10301) | [PR #10214](https://github.com/unslothai/unsloth/pull/10214)

---

### **5. Stability & Regressions**  
- **GPU detection failure on DGX Spark** (#3553): Users report `NotImplementedError` when following official manual; likely due to missing CUDA driver or kernel misalignment. *Fix pending.*  
- **Triton pointer access error (CPU tensor)** (#4137): Occurs during Qwen3-235B training with `load_in_4bit`. Likely caused by improper tensor handling in Triton kernels. *No fix yet.*  
- **Gemma3 fine-tuning crash** (#3996): `ConstantVariable(str: 'Missing required positional argument: x')` — possibly linked to outdated TRL or Hugging Face Transformers version.  
- **Ollama integration schema crash** (#9986): Models imported from Ollama are incorrectly labeled as "source=unknown", corrupting inventory. *High priority.*  

> 🔗 [Issue #3553](https://github.com/unslothai/unsloth/issues/3553) | [Issue #4137](https://github.com/unslothai/unsloth/issues/4137) | [Issue #9986](https://github.com/unslothai/unsloth/issues/9986)

---

### **6. What This Means for Application Developers**  
- **Build resilient, scalable agents** using the new two-Spark topology — ideal for enterprise-grade inference with failover and load balancing.  
- **Prepare for FP8/FP4 exports** by updating your pipelines to handle explicit dependency installation (`install_missing_dependencies=True`).  
- **Avoid GPU detection issues** by ensuring CUDA drivers and `torch` versions match exactly — use pinned constraints from `install.sh`.  
- **Watch for EXL3 backend adoption**: It enables MoE and ultra-low-bit quantization, unlocking smaller, faster models for edge and local deployment.  
- **Migrate from deprecated `evaluation_strategy`** (warning in #1941) to `eval_strategy` in Transformers 4.46+ to avoid deprecation warnings.

> ✅ Pro tip: Use `UNSLOTH_ALLOW_HOST_OFFLOAD=1` temporarily for models exceeding GPU RAM (see #9482), but plan for offloading-aware deployment architectures.

---  
*Data source: github.com/unslothai/unsloth | Updated: 2026-09-07*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*