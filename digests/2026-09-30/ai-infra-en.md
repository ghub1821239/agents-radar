# AI Infrastructure Digest 2026-09-30

> Generated: 2026-09-30 01:30 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-30**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *deep specialization and cross-layer integration*. vLLM and SGLang are pushing the boundaries of high-throughput, low-latency inference with advanced speculative decoding and programmable memory management. LiteLLM and Ollama serve as critical abstraction layers, enabling secure, multi-provider routing and agent-friendly tooling. Meanwhile, unsloth accelerates training efficiency and model deployment velocity, particularly for compressed and hybrid architectures. Together, these projects reflect a maturing stack where performance, stability, and developer experience are increasingly intertwined — especially in agent-scale workloads requiring persistent state, multimodal input, and deterministic behavior.

---

### **2. Activity Comparison**

| Project         | Issues Open (Today) | PRs Merged (Today) | Release Status       |
|----------------|---------------------|--------------------|----------------------|
| **vLLM**       | 8                   | 15                 | Stable (`v0.30.0`)   |
| **SGLang**     | 12                  | 11                 | Pre-release          |
| **llama.cpp**  | 7                   | 6                  | Pre-release (`b11269`) |
| **Ollama**     | 10                  | 5                  | RC (`v0.35.1-rc0`)   |
| **LiteLLM**    | 6                   | 9                  | Multiple RCs (`v1.104.0-rc.2`) |
| **Unsloth**    | 5                   | 6                  | No new release       |

> ✅ *vLLM leads in stability and active development; LiteLLM shows highest release velocity with security-focused RCs.*

---

### **3. Model Support Race**

| New Model / Architecture        | Supported By                          | Key Differentiator |
|-------------------------------|----------------------------------------|--------------------|
| **Qwen3.8-Flash-Next**        | vLLM, SGLang, llama.cpp                | vLLM leads in kernel fusion & AMD support |
| **GLM-5.3-Flash-NVFP4**       | vLLM, SGLang                           | Both report logprob drift and crashes |
| **Kimi K2.5**, **DeepSeek-V4.1-Flash** | vLLM, Ollama                         | vLLM has deeper stability fixes |
| **GraniteSpeech5ForCTC**      | llama.cpp                              | Only project with encoder-only CTC support |
| **System One (decision-only)**| Ollama                                 | Exclusive to Ollama; enables lightweight agents |
| **GDN + Mamba hybrids**       | SGLang (ROCm), vLLM                    | SGLang leads in ROCm prefill optimizations |
| **FP8 Sparse MLA (SM90+)**     | SGLang (roadmap), vLLM (ongoing)        | SGLang has clearer path to hardware-specific kernels |

> 🏆 **Winner: vLLM** — broadest model coverage across flash, multimodal, and hybrid architectures, with strong backend parity.

---

### **4. Performance Frontier**

| Optimization Focus           | Leading Projects                     | Key Developments |
|------------------------------|--------------------------------------|------------------|
| **KV Cache Management**       | vLLM (Programmable KV Cache RFC), SGLang (HiSparse) | vLLM’s composable policies enable agent-scale memory control |
| **Speculative Decoding**      | vLLM, SGLang, llama.cpp              | vLLM fixes prefix reuse; SGLang improves MoE handling |
| **Kernel Fusion & Fusing**    | vLLM (`PR #57097`), SGLang (`PR #27220`) | vLLM fuses QK-norm/RoPE/gate into single Triton launch |
| **Quantization & FP8**        | vLLM (FP8 indexing), SGLang (FP8 sparse), llama.cpp (F32 GELU_ERF) | vLLM leads in production-ready FP8 support |
| **Distributed Serving**       | LiteLLM (auto-router), SGLang (P2P offload) | LiteLLM enhances cost-aware routing; SGLang adds P2P cache |
| **Batching & Throughput**     | SGLang (trace replay), vLLM (MTP)     | SGLang enables deterministic request replay for benchmarking |

> 🔥 **Trend**: Kernel-level fusion and composable memory are now foundational — not optional — for competitive inference performance.

---

### **5. Layer Positioning**

| Project         | Layer Position                     | Core Functionality |
|----------------|------------------------------------|--------------------|
| **vLLM**       | **Inference Engine**               | High-throughput, low-latency serving; kernel-optimized |
| **SGLang**     | **Inference Engine + Agent Runtime** | Hybrid Mamba/GDN support; trace replay; linear replay |
| **llama.cpp**  | **Local Runtime / Edge Inference** | Cross-platform, CPU/GPU/Vulkan/Hexagon; ideal for edge devices |
| **Ollama**     | **Gateway / Local Server**         | Unified CLI/UI; model management; web search integration |
| **LiteLLM**    | **LLM Gateway / Enterprise Proxy** | Multi-provider routing; cost tracking; OIDC auth; billing |
| **Unsloth**    | **Training & Fine-Tuning Framework** | Fast fine-tuning; packed INT4; gradient checkpointing; UI monitoring |

> 🧩 **Strategic Insight**: The stack is bifurcating — **engineers** use vLLM/SGLang for performance, **operators** rely on Ollama/LiteLLM for manageability, and **researchers** lean on Unsloth for rapid iteration.

---

### **6. Trend Signals**

#### 🔍 **Key Industry Trends Extracted from Today’s Activity**:
1. **Agent Memory is Now a First-Class Concern**  
   → vLLM’s *Programmable KV Cache* RFC and SGLang’s HiSparse prefix handling signal that session state management is no longer an afterthought — it’s central to agentic systems.

2. **Hardware Diversity Demands Backend Specialization**  
   → AMD ROCm progress in SGLang (FlyDSL) and vLLM (gfx950/MI355X) shows that GPU heterogeneity is driving *backend-specific optimizations*, not just portability.

3. **Security & Identity Are Embedded at the Gateway Level**  
   → LiteLLM’s signed Docker images, OIDC support, and Entra integration indicate that enterprise-grade LLM gateways must now include identity federation, audit trails, and cryptographic verification by default.

4. **Stability Is No Longer Optional in Production**  
   → Critical crashes in `GLM-5.3-Flash`, `DeepSeek-V4.1-Flash`, and `Qwen3.8 DFlash` across vLLM, SGLang, and llama.cpp underscore that even top-tier models require rigorous runtime validation.

5. **Fine-Tuning Efficiency Is the Next Battleground**  
   → Unsloth’s focus on packed INT4, non-reentrant checkpoints, and context parallelism signals that training throughput — not just inference — is being optimized at the kernel level.

#### 📌 **What Application Developers Should Watch**:
- **Avoid speculative decoding** on `Qwen3.8`, `GLM-5.3-Flash`, or `DeepSeek-V4.1` until stability patches land.
- **Use `x-litellm-call-id`** for observability in LiteLLM deployments — it’s now essential for tracing agent workflows.
- **Leverage `X-Unsloth-Monitor-ID`** to build real-time UX feedback during long prefill tasks.
- **Pin to stable commits** when using TorchDynamo or mixed hardware (AMD/CUDA).
- **Monitor Ollama Cloud billing loops** and MLX stalls — they’re systemic risks in production pipelines.

> ✅ **Final Takeaway**: The infrastructure layer is no longer just about speed — it’s about **reliability, composability, and trust**. Choose tools not just for raw performance, but for their ability to scale safely with complex agent logic and enterprise requirements.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-30**

---

### **1. Today's Highlights**  
The vLLM project continues to deepen its support for multimodal and speculative decoding workloads, with critical fixes for prefix caching corruption under MTP (Multi-Token Prediction) and stability issues in GLM-5.3-Flash on high-concurrency deployments. Key progress includes a new RFC for *programmable KV cache policies* to enable composable, agentic serving workflows and performance optimizations for Qwen3.8-Flash-Next on both NVIDIA and AMD hardware.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed. The latest stable release remains `v0.30.0`.

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Active development for **Qwen3.8-Flash-Next**, including kernel fusion improvements for QK-norm/RoPE/gate (`PR #57097`).  
  - **GLM-5.3-Flash** is under active optimization across multiple backends (Ada SM89, B200 TP4+EP), with ongoing work on sparse-MLA attention paths (`#54059`) and FP8 autotuning (`#58864`).  
  - **Kimi K2.5**, **DeepSeek-V4.1-Flash**, and **NVIDIA Qwen3.6-35B-A3B-NVFP4** are seeing targeted stability and correctness fixes.  

- **Hardware & Backend**:  
  - **ROCm / AMD**: Performance tracking for `gfx950`/`MI355X` (Qwen3.8-2.4T-A95B) via `PR #57149`.  
  - **NVIDIA**: Fixes targeting H20, B200, GB300, and RTX 4090 (SM89) platforms.  
  - **Intel XPU**: Memory reduction issue under model loading (`#50269`) still open but tracked.

---

### **4. Performance & Optimization**  
- **Kernel & Memory Optimization**:  
  - **Qwen3.8-Flash-Next**: Fusion of QK-norm/RoPE/gate + KV-cache write into single Triton launch (`PR #57097`) reduces kernel overhead.  
  - **FP8 Acceleration**: Native FP8 dot product in Triton indexer for MiniMax-M3 (`PR #59331`) improves throughput; accuracy evals pending.  
  - **ROCm**: Fused QK-norm+RoPE+gate kernel enabled for Qwen3-Next (`PR #51406`).  

- **KV Cache & Offloading**:  
  - **HiSparse**: Fix to preserve host prefix publication after request completion (`PR #59007`).  
  - **P2P KV Offload**: Timeout handling improved by dropping timed-out store job blocks from round’s parked supply (`PR #59329`).  
  - **Programmable KV Cache (RFC)**: `#57103` proposes composable retention, movement, and quota policies — foundational for agent-scale memory management.

- **Speculative Decoding**:  
  - Fix for drafter KV group misidentification disabling prefix reuse in Mamba groups (`#57032`).  
  - Hybrid GDN prefix-cache hit restoration under MTP spec decoding (`PR #52244`).

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - **GLM-5.3-Flash**: Illegal memory access during long-context chunked prefill persists even in `v0.30.0` on B200 (TP4+EP, MTP) — confirmed by multiple users (`#59115`).  
  - **DeepSeek-V4.1-Flash**: CUDA illegal memory access in `dsv4_topk` MoE kernel under high concurrency (>256 `max_num_seqs`) on H20 GPUs (`#56389`). Mitigated by reducing `max_num_seqs` to 256.  

- **Correctness Bugs**:  
  - **Tool Calling**: Silent failure of `tool_choice: "required"` enforcement on `/v1/chat/completions` (`#54808`).  
  - **Streaming Tool Parsers**: Intermittent empty `tool_calls` deltas in Kimi K2 parser under concurrent load (`#54701`).  
  - **Prompt Logprobs Corruption**: Silently corrupted when MTP speculative decoding is enabled (`#53488`).  

- **Fixes in Progress**:  
  - Several PRs address these issues directly:  
    - `PR #59331` (FP8 indexing)  
    - `PR #57097` (kernel fusion)  
    - `PR #52244` (GDN prefix cache)  
    - `PR #59007` (HiSparse prefix publish)  

---

### **6. What This Means for Application Developers**  
- **Agents & Agentic Workflows**: Use `#57103` (Programmable KV Cache) to build fine-grained control over session state and memory pressure—critical for long-running agents.  
- **Production Stability**: Avoid `max_num_seqs > 256` with `DeepSeek-V4.1-Flash` on H20 until `#56389` is resolved. Monitor `#59115` for GLM-5.3-Flash crashes in high-throughput environments.  
- **Multimodal & Hybrid Models**: Ensure `--tool-call-parser kimi_k2` or `qwen3_coder` is used carefully—streaming tool calls may fail silently (`#54701`, `#54808`).  
- **Performance Tuning**: Enable fused kernels (`#57097`, `#51406`) and monitor KV cache metrics via `KVEvents` (`#57789`) for observability in disaggregated setups.  

> 🔗 **Key Links**:  
> - [GLM-5.3-Flash crash tracker](https://github.com/vllm-project/vllm/issues/59115)  
> - [Programmable KV Cache RFC](https://github.com/vllm-project/vllm/issues/57103)  
> - [Qwen3.8-Flash-Next kernel fusion PR](https://github.com/vllm-project/vllm/pull/57097)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-30

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with active work on hybrid Mamba/GDN models and AMD ROCm support, particularly around the GDN prefill backend and FP8 quantization. Critical stability fixes were merged for `--strip-thinking-cache` and `--enable-linear-replayssm`, while new PRs focus on improving trace replay, kernel correctness, and memory efficiency in high-throughput scenarios.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, ongoing changes may affect users:
- `--enable-linear-replayssm` now forces `no_buffer`, which degrades Mamba prefix caching and increases TTFT by up to **4.7x** (see [Issue #37834](https://github.com/sgl-project/sglang/issues/37834)).
- The `is_musa()` graph-break issue (PR #39054) impacts TorchDynamo tracing and CUDA graph capture for prefill paths since commit `b6c31b155c`.

---

### **3. New Model & Hardware Support**  
- ✅ **AMD ROCm Support**: Active integration of FlyDSL-based GDN prefill kernels for AMD gfx95 (e.g., Qwen3.5-397B), with performance gains of **1.4–1.74x faster prefill** vs. baseline (see [PR #39595](https://github.com/sgl-project/sglang/pull/39595)).
- ✅ **Quark Weights Layout Optimization**: New PR ([#41794](https://github.com/sgl-project/sglang/pull/41794)) introduces Quark weight layout for ROCm decoding to improve speed.
- ✅ **SM90 Q8KV8 FP8 Sparse MLA Kernel**: Roadmap progress toward integrating sparse MLA prefill kernels for SM90+ GPUs (see [Issue #25746](https://github.com/sgl-project/sglang/issues/25746)).
- ✅ **Apple Silicon (MLX)**: Fix for MLX startup after logical token capacity change (see [PR #41314](https://github.com/sgl-project/sglang/pull/41314)).

---

### **4. Performance & Optimization**  
- 🔧 **Hybrid Mamba/GDN Optimization**: Fixed severe TTFT regression (~17.8x slower) when radix cache is enabled on hybrid models like Qwen3.5-35B-A3B (see [PR #27220](https://github.com/sgl-project/sglang/pull/27220)).
- ⚙️ **Kernel-Level Improvements**:
  - 64-bit indexing added to `merge_state_v2` kernel to prevent integer overflow in large-batch/long-sequence workloads (see [PR #29720](https://github.com/sgl-project/sglang/pull/29720)).
  - Reduced repeated attention setup during speculative decoding (see [PR #38213](https://github.com/sgl-project/sglang/pull/38213)).
- 📈 **Trace Replay & Analysis**: Added `trace_decode_token_ids` support for forcing decoder output sequences (see [PR #39157](https://github.com/sgl-project/sglang/pull/39157)), enabling request replay and performance benchmarking.

---

### **5. Stability & Regressions**  
Critical issues reported today include:
1. **Double free crash** in `--strip-thinking-cache` mode due to improper KV slot release (see [Issue #41617](https://github.com/sgl-project/sglang/issues/41617)) — *no fix yet*.
2. **Bit-identical drift** in `GLM-5.3-Flash-NVFP4` logprobs post-2026-09-18, possibly due to KDA fusion gate changes (see [Issue #41609](https://github.com/sgl-project/sglang/issues/41609)) — *reproducible nightly from 2026-09-21 to 27*.
3. **Crash in FlashInfer TRTLLM MoE batched GEMM** on `sm100f` with disaggregated prefill (see [Issue #31864](https://github.com/sgl-project/sglang/issues/31864)) — *active tracking*.
4. **NaN/inf in prob tensor** when DP-Attention is enabled (see [Issue #21460](https://github.com/sgl-project/sglang/issues/21460)) — *persistent bug*.

> 💡 *Note: CI pipeline currently reports 1 broken, 10 flaky, and 1,108 recently fixed tests (see [Issue #17050](https://github.com/sgl-project/sglang/issues/17050)).*

---

### **6. What This Means for Application Developers**  
- If you're using **hybrid Mamba/GDN models**, avoid `--strip-thinking-cache` until #41617 is resolved; expect higher TTFT if `--enable-linear-replayssm` is enabled.
- For **AMD ROCm deployments**, consider testing the new FlyDSL GDN backend via `--moe-a2a-backend flydsl` (PR #39595) for improved prefill throughput.
- Use `--max-total-tokens` cautiously with hybrid models — a simulator crash has been reported (see [Issue #41654](https://github.com/sgl-project/sglang/issues/41654)).
- Leverage `trace_decode_token_ids` (PR #39157) for deterministic agent behavior testing and replay analysis.
- Monitor `is_musa()`-related Dynamo graph breaks if using TorchDynamo with custom prefill paths.

👉 **Recommended Actions**:  
- Pin to known-stable commits (e.g., before `b6c31b155c`) if using TorchDynamo.  
- Test critical model serving workflows on nightly builds due to recent regression spikes.  
- Join Slack (`slack.sglang.io`) for real-time debugging help on AMD/Moore Threads issues.

---  
*Data source: github.com/sgl-project/sglang | Updated: 2026-09-30*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-30**

---

### **1. Today's Highlights**  
The latest development cycle focuses on Vulkan backend stability and performance tuning for Intel and AMD GPUs, with critical fixes for MoE dispatch logic and F32 load alignment. New support for FP32 GELU_ERF/GEGLU_ERF on Hexagon and a robust CI pipeline update (PR #29651) signal growing cross-architecture maturity. A notable fix in `ggml` ensures proper ODR compliance via `GGML_COMMON_DECL_CPP`, resolving C++ linkage issues.

---

### **2. Releases & Breaking Changes**  
No formal release was issued today; the latest builds are pre-release (`b11269`, `b11268`, etc.). However, several **non-breaking but impactful changes** were merged:
- `ggml`: Fixed C++ ODR violation using `GGML_COMMON_DECL_CPP` ([#29504](https://github.com/ggml-org/llama.cpp/pull/29504))
- `ggml`: Enforced input tensor validation to require `GGML_OP_NONE` ([#29647](https://github.com/ggml-org/llama.cpp/pull/29647))
- `vocab`: Prevented incorrect EOG token classification for PLaMo-2/3 by skipping heuristic for `</s>` marked as `NORMAL` ([#29580](https://github.com/ggml-org/llama.cpp/pull/29580))

> ✅ *Note: No breaking API changes reported. Developers should verify behavior if using custom backends or tensor ops.*

---

### **3. New Model & Hardware Support**  
- **Hexagon**: Added full FP32 support for `GELU_ERF` and `GEGLU_ERF` kernels ([#29631](https://github.com/ggml-org/llama.cpp/pull/29631)) — essential for precision-sensitive inference on Qualcomm AI chips.
- **Vulkan**: Introduced opt-in compatibility guard for Adreno 750 drivers ([#29165](https://github.com/ggml-org/llama.cpp/pull/29165)), mitigating shader compiler segfaults on Galaxy S24.
- **Model Architecture**: Initial support for `GraniteSpeech5ForCTC` (Turbo CTC), an encoder-only non-autoregressive model ([#29446](https://github.com/ggml-org/llama.cpp/pull/29446)) — enables voice-to-text pipelines.
- **Backends**: CI now includes `models-check` pipeline covering `fusion` tests, enabling broader backend validation ([#29651](https://github.com/ggml-org/llama.cpp/pull/29651)).

---

### **4. Performance & Optimization**  
- **Vulkan**: Optimized GDN kernel and tuned Intel-specific memory access patterns ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476)).
- **Vulkan**: Improved MoE-aware tile selection in `mat_mul_id`, preventing suboptimal workgroup assignment at low token counts ([#29182](https://github.com/ggml-org/llama.cpp/pull/29182)).
- **Vulkan**: Enabled 2-at-a-time F32 matrix loading when aligned (e.g., 2-aligned), improving throughput on Intel GPUs ([#29254](https://github.com/ggml-org/llama.cpp/pull/29254)).
- **AVX512-FP16**: Accumulated f16 dot products in f32 for higher precision and better convergence ([#29545](https://github.com/ggml-org/llama.cpp/pull/29545)).

> 🔍 *Performance gains expected in high-throughput MoE models (e.g., Qwen3-Coder-Next 30B-A3B) and mixed-precision inference workflows.*

---

### **5. Stability & Regressions**  
Critical issues reported today include:
- **Vulkan batch decode cliff at B=9** on many-expert MoE models (AMD Strix Halo gfx1151) — throughput drops from 122.5 → 82.9 t/s ([#25356](https://github.com/ggml-org/llama.cpp/issues/25356)) — *fix pending*.
- **Qwen3.8 DFlash/MTP speculative decoding crashes** due to OOB token ID (n_vocab = 248320) on Vulkan ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158)) — *critical severity, no fix yet*.
- **Vulkan long-running decode degradation** on A770 GPU after ~7–8 hours, resulting in empty EOS replies ([#29526](https://github.com/ggml-org/llama.cpp/issues/29526)) — *likely GPU fence or memory leak*.
- **macOS Metal OOM** on Gemma 4 31B with large default `n_ctx` despite sufficient unified memory ([#29521](https://github.com/ggml-org/llama.cpp/issues/29521)) — *possible memory accounting bug*.

> ⚠️ *These represent high-risk production concerns for server-side deployments using MoE, DFlash, or long-lived sessions.*

---

### **6. What This Means for Application Developers**  
- **Avoid `--spec-type draft-mtp`** on Qwen3.8 models until [#28158](https://github.com/ggml-org/llama.cpp/issues/28158) is resolved — it triggers OOB token errors.
- **Use `--cache-ram -1` cautiously**: It does not disable limits — RAM grows ~640 MiB per short prompt ([#29324](https://github.com/ggml-org/llama.cpp/issues/29324)). Use `--cache-idle-slots` only if needed.
- **Enable `--no-kv-offload` only if necessary**: It causes immediate EOS generation in some Qwen3.6 models on Vulkan ([#24519](https://github.com/ggml-org/llama.cpp/issues/24519)) — avoid unless debugging.
- **Monitor long-running jobs** on Vulkan/Arc A770 — expect degraded output after 7–8 hours ([#29526](https://github.com/ggml-org/llama.cpp/issues/29526)).
- **Leverage new `LLM-jp-4.1` parser** via `--jinja` for Japanese LLMs ([#29681](https://github.com/ggml-org/llama.cpp/pull/29681)) — improves tool call parsing accuracy.
- **Consider `--ui-config-file` settings** in router mode — they now apply on first visit ([#29668](https://github.com/ggml-org/llama.cpp/pull/29668)).

> 🛠️ *Recommend testing with `b11269+` for Vulkan/Metal stability and `--no-kv-offload` use cases.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-30**

---

### **1. Today's Highlights**  
Ollama v0.35.1-rc0 introduces enhanced web search support (up to 10 per response) and updates to `llama.cpp` (b11232) and MLX backend versions, signaling progress toward broader multimodal and inference efficiency improvements. Key developer-facing changes include new System One model capabilities and improved tool-call parsing stability.

---

### **2. Releases & Breaking Changes**  
- **v0.35.1-rc0** released with:  
  - ✅ **Web search expansion**: Up to 10 web searches per response via `web_search` parameter ([#18602](https://github.com/ollama/ollama/pull/18602)).  
  - 🔧 **MLX version bump**: Updated to latest MLX build for Apple Silicon optimizations ([#18651](https://github.com/ollama/ollama/pull/18651)).  
  - 🔧 **llama.cpp version bump**: Updated to `b11232` for improved CUDA and CPU performance ([#18652](https://github.com/ollama/ollama/pull/18652)).  
- ⚠️ **Bug Note**: v0.35.0 was incorrectly marked as a pre-release without `-rc` suffix — confirmed as unintended ([#18706](https://github.com/ollama/ollama/issues/18706)).

---

### **3. New Model & Hardware Support**  
- **System One Models**: Experimental support added for decision-only models like Kev and Laya via `CAPABILITY` declarations in Modelfiles ([#18708](https://github.com/ollama/ollama/pull/18708), [#18701](https://github.com/ollama/ollama/pull/18701)).  
- **GraniteForCausalLM**: Added experimental support for IBM’s Granite 4.1/4.2 models on MLX backend ([#17972](https://github.com/ollama/ollama/pull/17972)).  
- **Hardware**: Continued focus on Apple Silicon (MLX), Windows CUDA (GPU discovery fixes ongoing), and Linux compatibility (glibc linker fix: [#17567](https://github.com/ollama/ollama/pull/17567)).

---

### **4. Performance & Optimization**  
- **Context Length Auto-Tuning**: VRAM-based default context window now dynamically adjusts (≥47 GiB → 256k; ≥23 GiB → 32k; else 4k) — documented in FAQ ([#18710](https://github.com/ollama/ollama/pull/18710)).  
- **Tool Call Robustness**: Fixes landed to prevent premature or malformed tool call handling (e.g., missing closing braces, partial tag overlaps) — critical for agent reliability ([#17565](https://github.com/ollama/ollama/pull/17565), [#18289](https://github.com/ollama/ollama/pull/18289), [#18624](https://github.com/ollama/ollama/pull/18624)).  
- **Thinking Budgeting**: Proposed token budget limits per request/model to prevent infinite reasoning loops ([#17566](https://github.com/ollama/ollama/pull/17566)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Status |
|--------|------|--------|--------|
| 🟡 Critical | `llama-server` wedges on full-cache-hit tasks (CUDA/Linux) | All subsequent requests hang until unload ([#18685](https://github.com/ollama/ollama/issues/18685)) | Open |
| 🟡 High | MLX nvfp4 stalls under sustained load (zero tokens processed) | Request hangs indefinitely; only SIGTERM recovers ([#18505](https://github.com/ollama/ollama/issues/18505)) | Open |
| 🟡 High | macOS GUI fails silently after 60s during long document processing | No error notification; user unaware of failure ([#18368](https://github.com/ollama/ollama/issues/18368)) | Open |
| 🔴 Severe | Ollama Cloud billing loop (Stripe retry spam) | Users blocked from upgrading/downgrading subscriptions ([#18683](https://github.com/ollama/ollama/issues/18683)) | Open |

> *Note: Several PRs address underlying parsing logic (e.g., thinking tags, tool call validation), but no direct fixes yet for the above regressions.*

---

### **6. What This Means for Application Developers**  
- **Agents & Tool Use**: Expect more reliable tool call parsing and reduced risk of infinite thinking loops. Use `thinking` budgets cautiously — future API may enforce them.  
- **Model Choice**: With System One support emerging, consider using `CAPABILITY=decision` for lightweight, high-throughput yes/no/scoring tasks.  
- **Deployment**: Monitor for GPU stall issues on MLX (`nvfp4`) and CUDA (especially under sustained load). Avoid `OLLAMA_NUM_PARALLEL=1` in production if latency is critical.  
- **Offline Workflows**: The new `ollama export/import` CLI commands ([#18578](https://github.com/ollama/ollama/pull/18578)) enable secure model transfer across air-gapped environments.  
- **UI/UX**: Be aware that chat history is now read-only in the desktop app (PR [#18700](https://github.com/ollama/ollama/pull/18700)), and resizing the sidebar is broken on macOS ([#18709](https://github.com/ollama/ollama/issues/18709)).

---  
*Data source: [github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-30**

---

### **1. Today's Highlights**  
The LiteLLM proxy continues rapid iteration with a focus on security hardening, stability in high-concurrency scenarios, and deeper integration with enterprise identity systems. Key developments include improved session token handling, fixes for critical cost tracking and response streaming bugs, and enhanced agent authorization controls. A notable regression in OpenAI gpt-5.6 family models (e.g., `gpt-5.6-sol`) affecting function tools has been reported and is under active investigation.

---

### **2. Releases & Breaking Changes**  
- **v1.104.0-rc.2**, **v1.103.1**, **v1.102.2**, **v1.101.3**, and **v1.100.4** were released within the past 24 hours.  
- All Docker images are cryptographically signed via [cosign](https://docs.sigstore.dev/cosign/overview/) using the same key introduced in [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
- **Migration Note**: The `/chat` route was removed in PR #30178 ([#31222](https://github.com/BerriAI/litellm/issues/31222)), which may affect UI integrations relying on legacy chat endpoints.

---

### **3. New Model & Hardware Support**  
- **Anthropic Workload Identity Federation (OIDC JWT-bearer)**: Added support via [Issue #28607](https://github.com/BerriAI/litellm/issues/28607) — enables secure, federated authentication for Anthropic models in cloud-native environments.  
- **Gemini Robotics ER-2 Preview**: Now supported in model pricing config (`gemini/gemini-robotics-er-2-preview`), though billing logic requires correction due to incorrect reasoning token cost mapping ([#43575](https://github.com/BerriAI/litellm/issues/43575)).  
- **Bedrock Converse Routing**: Regional aliases now properly inherit Converse routing metadata ([PR #43785](https://github.com/BerriAI/litellm/pull/43785)).

---

### **4. Performance & Optimization**  
- **Auth Refresh Optimization**: PR [#43776](https://github.com/BerriAI/litellm/pull/43776) reduces per-key auth refresh latency by batching Redis operations via pipelining — previously caused up to 16 serial Redis calls per minute.  
- **OTel Span Filtering**: Introduced `excluded_services` opt-out for datastore spans in tenant destinations ([PR #43278](https://github.com/BerriAI/litellm/pull/43278)), reducing telemetry noise and improving ingestion efficiency.  
- **Batch Line Item Storage**: PR [#41691](https://github.com/BerriAI/litellm/pull/41691) enables callback storage of individual batch JSONL line items, preserving traceability after provider expiration.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| Critical | Function tools fail with `reasoning_effort=xhigh` error on OpenAI gpt-5.6 family models (`gpt-5.6-sol`, `gpt-5.6-luna`) | Open | [Issue #33221](https://github.com/BerriAI/litellm/issues/33221) |
| High | `PromptTokensDetailsWrapper` raises `AttributeError` when `cache_creation_tokens`/`cache_write_tokens` unset (DashScope first-turn requests) | Open | [Issue #43756](https://github.com/BerriAI/litellm/issues/43756) |
| High | Multiple logging callbacks use only last credential set; causes telemetry misrouting | Closed | [PR #30825](https://github.com/BerriAI/litellm/pull/30825) |
| Medium | `auto-router baseline observation could not be initialized` warning logged on every `/v1/messages` call despite no auto-router configured | Open | [Issue #43658](https://github.com/BerriAI/litellm/issues/43658) |
| Medium | User/team spend caches lose concurrent increments | Open | [Issue #43491](https://github.com/BerriAI/litellm/issues/43491) |

> 🔴 **Critical Note**: The gpt-5.6 family issue impacts function calling workflows — avoid using `reasoning_effort=xhigh` until resolved.

---

### **6. What This Means for Application Developers**  
- **Security**: Use signed Docker images (`cosign verify`) and ensure your CI/CD pipeline validates image signatures.  
- **Agent Development**: Be cautious with `gpt-5.6` models if using function tools or structured outputs — expect instability.  
- **Cost Tracking**: Enable `include_cost_in_streaming_usage` ([#31840](https://github.com/BerriAI/litellm/issues/31840)) for real-time cost visibility during streaming.  
- **Identity & Access**: Leverage new Entra identity support ([PR #43722](https://github.com/BerriAI/litellm/pull/43722)) and managed agent permissions ([PR #43721](https://github.com/BerriAI/litellm/pull/43721)) for fine-grained access control in multi-team deployments.  
- **Telemetry**: Use `x-litellm-call-id` for cross-correlation across logs, OTEL traces, and headers — now surfaced in search and logs UI ([PR #42436](https://github.com/BerriAI/litellm/pull/42436)).  

👉 **Action**: Review recent PRs related to auth, cost, and streaming — especially those addressing concurrency, logging, and response integrity.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-30**

---

### **1. Today's Highlights**  
The Unsloth project continues its aggressive optimization push with critical PRs targeting vLLM 0.29 compatibility and packed INT4 inference, including a fix for `marlin_gemm` crashes. Key UI/UX improvements are landing in Studio—especially around prefill progress visibility, HTML preview fidelity, and model update safety—while core training stability is strengthened via gradient checkpointing hardening for DeepSeek-V4.1.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, **PR #12320** addresses a critical regression: packed INT4 inference now properly handles vLLM 0.29’s `marlin_gemm` call via op schema-based GEMM construction. This change is essential for users relying on compressed-tensors checkpoints.  
→ [PR #12320](https://github.com/unslothai/unsloth/pull/12320)

Additionally, **PR #12318** enforces non-reentrant gradient checkpointing for `deepseek_v41`, preventing data corruption in high-throughput training scenarios.  
→ [PR #12318](https://github.com/unslothai/unsloth/pull/12318)

---

### **3. New Model & Hardware Support**  
*No new model architectures added today.*  
But significant work continues on **multi-GPU and heterogeneous hardware support**:  
- **AMD ROCm + CUDA coexistence** is being stabilized across workflows (training on AMD, inference on NVIDIA).  
- **PR #12248** enables dual-card usage for different jobs (e.g., image gen on NVIDIA, chat/training on AMD).  
- **PR #12247** fixes incorrect GPU reporting in System tab when backend differs between training and inference.  
→ [PR #12248](https://github.com/unslothai/unsloth/pull/12248), [PR #12247](https://github.com/unslothai/unsloth/pull/12247)  

Also, **PR #12310** improves vision model handling of transparent images by preserving dark text in PNG/WebP/GIF assets.  
→ [PR #12310](https://github.com/unslothai/unsloth/pull/12310)

---

### **4. Performance & Optimization**  
- **Context Parallelism (CP)**: PR #4257 introduces SDPA ring attention for SFT, enabling linear scaling of context size with GPUs. Ideal for large-scale fine-tuning on multi-GPU clusters.  
→ [PR #4257](https://github.com/unslothai/unsloth/pull/4257)  

- **Kernel-level optimizations**:  
  - **PR #12317** ensures `FP8Linear.block_size` is honored during forward passes, crucial for 32x32 block FP8 checkpoints.  
  - **PR #12319** freezes BatchNorm running stats during LoRA training to prevent drift and improve generalization.  
→ [PR #12317](https://github.com/unslothai/unsloth/pull/12317), [PR #12319](https://github.com/unslothai/unsloth/pull/12319)  

- **Latency reduction**:  
  - **PR #11161** exposes live prefill progress via API monitor (`X-Unsloth-Monitor-ID`), enabling clients to show loading indicators during long prompt processing.  
  → [PR #11161](https://github.com/unslothai/unsloth/pull/11161)  

---

### **5. Stability & Regressions**  
*Critical issues reported today include:*  
1. **vLLM crash on packed INT4 inference** (`marlin_gemm` type mismatch):  
   - Affects users of `compressed-tensors` models on vLLM 0.29.  
   - **Fix exists**: PR #12320 resolves the issue by building Marlin GEMM call from op schema.  
   → [Issue #4073](https://github.com/unslothai/unsloth/issues/4073), [PR #12320](https://github.com/unslothai/unsloth/pull/12320)  

2. **Memory exhaustion on M5 Max (48GB RAM)**:  
   - Users report inability to run `Qwen-Image-2.1-Q4_K_M` due to ~19 GB "Required assets" download post-initial GGUF fetch.  
   - Likely related to redundant asset fetching or caching logic in Studio.  
   → [Issue #11792](https://github.com/unslothai/unsloth/issues/11792)  

3. **Hard freeze on self-referential shell assignments**:  
   - Terminal tool calls containing `VAR=$VAR` in a single quoted string cause app-wide freeze due to unbounded recursion.  
   - **Reproducible**, requires immediate fix.  
   → [Issue #12084](https://github.com/unslothai/unsloth/issues/12084)  

4. **Training crash on Gemma 4 31B after v0.1.806-beta upgrade**:  
   - Error: `"indices should be either on cpu or on the same device as the indexed tensor (cuda:0)"`.  
   - Likely tied to recent CUDA/device management changes.  
   → [Issue #11952](https://github.com/unslothai/unsloth/issues/11952)  

---

### **6. What This Means for Application Developers**  
- **For inference-heavy apps**: Use `fast_inference=True` with caution—ensure your model architecture (e.g., LFM2.5) is compatible with vLLM state dict extraction. Monitor for crashes like #4073.  
- **For agent builders using MCP tools**: Expect improved HTML widget rendering (#9301, #12310) and better error visibility in previews. Avoid relying on `ui://` resources if not sandboxed.  
- **For training pipelines**: Be aware that `BatchNorm` statistics may drift unless explicitly frozen (PR #12319). Use `non-reentrant` checkpointing for DeepSeek-V4.1 (PR #12318).  
- **For low-latency UX**: Leverage the new `X-Unsloth-Monitor-ID` header to track prefill progress and show real-time feedback during long prompts.  
- **For deployment on mixed hardware**: You can now safely train on AMD ROCm while using CUDA for inference (via PRs #12248–#12246), but verify backend selection in Settings > System.  

> ✅ **Actionable takeaway**: Update to latest unsloth/unsloth_zoo versions immediately if using vLLM 0.29, packed INT4, or DeepSeek-V4.1. Watch for upcoming patches addressing memory leaks and freezing bugs.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*