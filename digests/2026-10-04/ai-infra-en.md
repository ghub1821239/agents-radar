# AI Infrastructure Digest 2026-10-04

> Generated: 2026-10-04 01:58 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-04**

---

### **1. Ecosystem Overview**

The AI inference and serving ecosystem in Q4 2026 is marked by rapid specialization, intense focus on next-gen model efficiency, and growing fragmentation across hardware and deployment paradigms. Projects are converging on high-performance kernel optimization, MoE/MTP speculative decoding, and secure, scalable gateways—while also exposing deep stability challenges in production-grade deployments. The shift toward hybrid CPU/GPU workloads, multi-modal support, and agent-native workflows underscores a maturing infrastructure layer that prioritizes real-world reliability over feature velocity.

---

### **2. Activity Comparison**

| Project       | Issues Open | PRs Merged (Last 24h) | Releases | Breaking Changes |
|---------------|-------------|------------------------|----------|------------------|
| vLLM          | 87          | 12                     | None     | None             |
| SGLang        | 93          | 15                     | None     | None             |
| llama.cpp     | 108         | 10                     | b11382   | Yes (minor)      |
| Ollama        | 72          | 6                      | None     | None             |
| LiteLLM       | 104         | 11                     | v1.105.0-rc.1 | Yes (security) |
| Unsloth       | 115         | 8                      | v0.1.902-beta (unstable) | No |

> 🔍 *Insight*: **Unsloth** leads in issue volume but trails in PR throughput; **SGLang** shows highest engineering velocity. **LiteLLM** stands out with a security-focused RC release, signaling maturity in production trust.

---

### **3. Model Support Race**

| New Model / Architecture       | Supported By                          | Notes |
|--------------------------------|----------------------------------------|-------|
| **Qwen3.8-Flash-Next (Qwen4Exp)** | vLLM, SGLang, llama.cpp, Ollama (MLX) | Full support across engines; key focus for MTP/drafting |
| **DeepSeek-V4.1 Flash**         | vLLM, SGLang (ongoing)                | SGLang actively optimizing mHC/TP; vLLM enables full MoE routing |
| **Nemotron-3.5-Lightning NVFP4**| vLLM                                  | Improved decode tracking; no other engine supports yet |
| **Kolibri 1 / SystemOne**       | Ollama (MLX backend)                  | Exclusive MLX advantage; strong macOS/Windows integration |
| **MiniMax-M3 / H3**             | SGLang, Unsloth                         | SGLang leads in AMD ROCm + FP8 optimizations; Unsloth adds diffusion support |
| **LTX-2.3 Multimodal**          | llama.cpp (experimental)              | First project to expose `/v1/images/generations` API |

> 🏆 **Winner**: **SGLang** and **Ollama** lead in cutting-edge model coverage, especially in multimodal and Apple Silicon ecosystems. **vLLM** maintains edge in MoE and speculative decoding readiness.

---

### **4. Performance Frontier**

Optimization efforts are sharply focused on:

- **KV Cache & Prefix Caching**: vLLM and SGLang both report critical bugs around `nvfp4` reuse and EAGLE/MTP last-block drops—indicating intense focus on long-context memory efficiency.
- **Speculative Decoding**: vLLM and llama.cpp are battling performance regressions in dynamic MTP/draft-mtp; vLLM sees up to 14% throughput loss on Qwen3.5-122B.
- **Quantization & Kernels**:  
  - **AMD ROCm/FP8**: SGLang and llama.cpp leading with AITER, fused kernels, and `__builtin_amdgcn_perm` optimizations.  
  - **Q2_K/Q1_0**: llama.cpp delivers measurable speedups via reduced VGPR spills and optimized unpacking.
- **Distributed Serving**: LiteLLM’s agentic tracing and budget enforcement improvements signal rising complexity in multi-provider orchestration.
- **Kernel-Level Innovation**: SGLang’s `cake_kernels`, `mla_decode_fwd`, and Unsloth’s **SageAttention 2** reflect a push toward domain-specific acceleration.

> 🚀 **Frontier Leaders**: **SGLang** (kernel-level), **llama.cpp** (quantized GPU kernels), **vLLM** (speculative decoding scale).

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Key Differentiators |
|---------------|------------------------------------|---------------------|
| **vLLM**      | High-Performance Serving Engine    | MoE, MTP, CUDA graph depth; dominant in cloud-scale inference |
| **SGLang**    | Low-Latency Inference Runtime      | Kernel fusion, SM120/ROCm support, file-backed PLE tables |
| **llama.cpp** | Local Runtime / Edge Execution     | WebGPU, Metal, SYCL; best-in-class for GGUF quantization |
| **Ollama**    | Developer-Focused Gateway + CLI    | MLX backend, structured output, Windows-first UX |
| **LiteLLM**   | Multi-Provider LLM Gateway         | Security hardening (cosign), agent tracing, budget enforcement |
| **Unsloth**   | Agent-First Runtime + Studio UI    | Automatic step skipping, SageAttention 2, tool lifecycle UX |

> 💡 **Positioning Insight**: The stack is bifurcating: **engineers** use vLLM/SGLang/llama.cpp for raw performance; **developers** rely on Ollama/LiteLLM for abstraction and tooling; **agents** are built atop Unsloth’s runtime and LiteLLM’s orchestration.

---

### **6. Trend Signals**

**Key Industry Trends Extracted from Today’s Activity:**

1. **Hardware-Specific Optimization Is Now Mandatory**  
   → Projects like SGLang and llama.cpp are deeply investing in ROCm, SM120, and AMD FP8 kernels. Developers must now choose tools based on *exact* GPU architecture.

2. **Speculative Decoding Is Becoming Production-Ready — But Fragile**  
   → Multiple projects (vLLM, llama.cpp) report catastrophic regressions under load. This signals that speculative decoding is moving from lab experiments to live systems—but requires rigorous validation.

3. **Security & Trust Are Moving Up the Stack**  
   → LiteLLM’s cosign-signed Docker images and Ollama’s strict JSON parsing show that **trust hygiene** (image signing, input validation) is now non-negotiable in enterprise deployments.

4. **Agent Workflows Demand Built-In Observability**  
   → LiteLLM’s Lens integration and Unsloth’s context metering indicate that debugging agents requires first-class telemetry—not just logging.

5. **Multimodal & Diffusion Pipelines Are Mainstreaming**  
   → SGLang, Unsloth, and llama.cpp all now support image/audio generation or pre-quantized diffusion models—signaling that vision and audio are no longer niche.

---

### ✅ **Recommendation for Application Developers**

- **Avoid unstable builds** (e.g., Unsloth v0.1.902-beta, SGLang’s `nvfp4` on SM120).
- **Validate input payloads** rigorously—JSON parsing bugs are widespread.
- **Test speculative decoding at scale** before production use.
- **Use security-hardened gateways** (LiteLLM v1.105.0-rc.1) in any financial or compliance-sensitive workload.
- **Choose your stack by target hardware**:  
  - **AMD/ROCm**: SGLang > llama.cpp > vLLM  
  - **Apple Silicon**: Ollama (MLX) > Unsloth > vLLM  
  - **Edge/Local**: llama.cpp > vLLM  
  - **Multi-Provider Orchestration**: LiteLLM > Ollama

> The infrastructure is ready—but only if you align your choice with your hardware, workload, and trust requirements.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-04

---

### **1. Today's Highlights**

The vLLM project continues to advance its speculative decoding and MoE infrastructure, with critical fixes for Marlin int8-activation corruption (PR #59895) and a key patch restoring hybrid GDN prefix-cache hits under MTP spec decoding (PR #52244). A major performance regression in dynamic speculative decoding on Qwen3.5-122B — causing up to a 14% throughput drop — is under active investigation (Issue #49548), while priority preemption support is being pushed forward (Issue #40004).

---

### **2. Releases & Breaking Changes**

None.

---

### **3. New Model & Hardware Support**

- **ROCm Support**: ROCm builds now include updated AITER (v0.1.24.post1) via PR #59794, improving compatibility.
- **Intel GPU (XPU)**: Fused input norm kernel fixed for multi-modality models (PR #59865), enabling better CPU/GPU integration.
- **Model Architectures**:
  - DeepSeek-V4.1 Flash now supports full MoE routing simulation (PR #52780).
  - Qwen3.8-Flash-Next (Qwen4Exp) model loading restored after fix for `indexed_attention` layer type error (Issue #59756).
  - Nemotron-3.5-Lightning NVFP4 now has improved decode performance tracking (Issue #59770).

---

### **4. Performance & Optimization**

- **Speculative Decoding**: Dynamic speculative decoding (`num_speculative_tokens_per_batch_size`) causes catastrophic throughput collapse (~14% single-stream loss) at batch-size thresholds on Qwen3.5-122B (Issue #49548). The root cause lies in cudagraph downgrade from FULL_AND_PIECEWISE → PIECEWISE.
- **Prefix Caching**: Hybrid GDN + MoE workloads suffer ~30–40% batch throughput loss due to EAGLE/MTP prefix-cache last-block drops (Issue #53670). Fix landed in PR #52244.
- **Memory Efficiency**: CUDA graph profiling now extends to V2 model runner (PR #54061); memory reserved during profiling is now accounted for before KV cache sizing (PR #57865).
- **KV Cache Optimization**: SWA bounded replay now skipped for requests carrying their own window (PR #59197), avoiding redundant recomputation of sliding-window tokens.

---

### **5. Stability & Regressions**

| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| 🚨 High | [Bug] Marlin int8-activation corrupts groups with negative scales (#59403) | Reads `int16` group scales as `uint16_t`, corrupting all negative-scale groups. | ✅ Fixed in PR #59895 (depends on #48926) |
| 🚨 High | [Bug] EAGLE/MTP prefix-cache last-block drop causes 1,648-token recompute (#53670) | Results in ~30–40% batch throughput loss on prefix-reusing workloads with speculative decoding. | ✅ Fixed in PR #52244 |
| ⚠️ Medium | [Bug] `prompt_logprobs` silently corrupted with MTP speculative decoding (#53488) | Occurs in Qwen3.5-family models using chunked prefill. | In progress |
| ⚠️ Medium | [Bug] LoRA adapters with `rank_pattern`/`alpha_pattern` use wrong scaling (#59799) | Leads to incorrect output behavior in fine-tuned models. | Open |
| ⚠️ Medium | [Bug] Responses API streaming regenerates `item_id`/`call_id` (Issue #59834) | Breaks strict clients relying on stable IDs across stream events. | ✅ Fixed in PR #59859 |

---

### **6. What This Means for Application Developers**

- **Avoid speculative decoding** on Qwen3.5-122B until the dynamic speculative decoding regression (Issue #49548) is resolved — it can severely degrade throughput.
- **Verify your quantized models** if using Marlin int8-activation: ensure no negative group scales exist, or apply the fix from PR #59895 immediately.
- **Use hybrid GDN + MoE models** safely again — prefix-cache hits are now preserved under MTP speculative decoding (PR #52244).
- **Be cautious with LoRA adapters** using complex `rank_pattern` or `alpha_pattern` configurations; current behavior may lead to inconsistent outputs (Issue #59799).
- **Ensure client compatibility** with `/v1/responses` streaming: avoid relying on stable `item_id`/`call_id` unless you’re on a version with PR #59859 applied.

> 🔗 **Key Links**:
> - Marlin fix: [#59895](https://github.com/vllm-project/vllm/pull/59895)
> - Prefix cache fix: [#52244](https://github.com/vllm-project/vllm/pull/52244)
> - Responses API fix: [#59859](https://github.com/vllm-project/vllm/pull/59859)
> - Speculative decoding regression: [#49548](https://github.com/vllm-project/vllm/issues/49548)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **SGLang Digest — 2026-10-04**

#### **1. Today’s Highlights**  
The SGLang project continues to advance high-performance inference for next-gen LLMs and multimodal models, with key focus on **DeepSeek V4.1 optimization**, **NVFP4 KV cache correctness**, and **SM120/GB10 hardware support**. Critical stability fixes were introduced for `nvfp4` KV reuse corruption and `fa4` attention crashes on SM120, while new PRs enable AMD FP8 optimizations and file-backed PLE tables for cold-row performance.

#### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

#### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1**: Active optimization tracking via #42170; ongoing refactor of mHC code and TP improvements.  
- **AMD ROCm (gfx950/gfx951)**:  
  - Enabled `unified_kv` FP8 prefill with CP (#39923)  
  - Added AITER FP8 block selection for MiniMax-M3 (#41708)  
  - Fuse sparse QK norm + RoPE + cache writes via AITER (#35357)  
- **NVIDIA SM120 (RTX PRO 6000 / DGX Spark)**:  
  - Full support for `--kv-cache-dtype nvfp4` now under scrutiny due to critical corruption bug (#42369)  
  - `fa4` attention backend crashes during CUDA graph capture — triton remains only stable path (#42012)  
- **Diffusion Models**:  
  - H3 INT8 ConvRot checkpoint loading fixed in ComfyUI mode (#42121)  
  - Added support for MiniMax-H3 on Ascend NPU (temporary guide, not merged yet) (#33357)

#### **4. Performance & Optimization**  
- **File-backed PLE table**: Concurrent host reads for cold rows → **6.8x lower cold-prefill TTFT on GB10** (#42392)  
- **AMD Optimization**:  
  - AITER ASM prefill enabled for MiniMax-M3 HD128 attention → improved prefix processing (#41707)  
  - Small-batch MoE expert-count gate fused with FP8 kernel → better throughput at low concurrency (#41982)  
- **Kernel-Level**:  
  - `mla_decode_fwd` now used for DCP verify prefix on SM120 when `SGLANG_AITER_MLA_DCP_DECODE_BACKEND=asm` (#42439)  
  - `cake_kernels` opt-in routing for DeepSeek-V4 sparse MLA decode, Mamba2 SSD/SSU, SP all-gather matmul (#42416)  

#### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| 🚨 Critical | [#42369](https://github.com/sgl-project/sglang/issues/42369) | `nvfp4` KV cache silently reuses fp8-calibrated scales → deterministic long-context corruption on sm_120 | Open |
| 🚨 Critical | [#42012](https://github.com/sgl-project/sglang/issues/42012) | `fa4` attention backend crashes at CUDA-graph capture on GLM-5.3-Flash (SM120) | Open |
| ⚠️ High | [#39684](https://github.com/sgl-project/sglang/issues/39684) | `sgl-deep-gemm 0.2.0`: weight-scale transform returns non-owning alias | Open |
| ⚠️ Medium | [#42085](https://github.com/sgl-project/sglang/issues/42085) | `--bf16-gemm-backend gemv` accepted but ignored | Open |
| ⚠️ Medium | [#41743](https://github.com/sgl-project/sglang/issues/41743) | `--enable-return-routed-experts` returns all-zero routings on triton/flashinfer paths | Open |

> 🔥 **Note**: The `nvfp4` corruption issue is particularly severe—users serving long-context models on SM120 should avoid `--kv-cache-dtype nvfp4` until resolved.

#### **6. What This Means for Application Developers**  
- **Avoid `--kv-cache-dtype nvfp4` on SM120** if you're using long-context models until #42369 is fixed. Use `fp8` or `bf16` instead.  
- **Leverage `SGLANG_CAKE_ROUTES`** to opt-in to performance-enhancing kernels like sparse MLA decode and Mamba2 SSD/SSU.  
- **Enable `SGLANG_AITER_MLA_DCP_DECODE_BACKEND=asm`** for faster DCP verification on supported AMD/NVIDIA GPUs.  
- **For diffusion apps**: Use `--enable-comfyui-integration` and ensure `INT8` checkpoints are loaded correctly via updated loaders (#42121).  
- **Monitor CI health** via #17050 — 8 flaky tests indicate potential instability in nightly builds; use `main` branch cautiously.  

👉 [GitHub Issues Dashboard](https://github.com/sgl-project/sglang/issues) | [PRs Summary](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-04**

---

### **1. Today's Highlights**  
The latest development cycle focuses on stabilizing speculative decoding (MTP/draft-mtp) and improving GPU backend robustness across WebGPU, CUDA, and SYCL. Key fixes address crashes in long-context inference for Qwen4Exp and GLM-5.3-Flash models, while new optimizations enhance MoE expert caching and quantized kernel performance—particularly for Q2_K and Q1_0 on AMD GPUs.

---

### **2. Releases & Breaking Changes**  
No formal releases were published today; the latest build is `b11382`. However, several critical bug fixes were merged:  
- **WebGPU**: Added `f16` support to `fill/set_rows` operations (#29897), resolving CI failures with `glm5-next` when Fast Attention (FA) is enabled.  
- **Server**: Fixed `laya abort` by limiting `n_batch` to `n_ubatch` (#29903), preventing crashes under high concurrency.  
- **Windows**: Resolved deprecated `strdup` warning on Windows (#29863).  
- **Common**: Added `common_is_tty()` helper and fixed Windows deprecation warnings (#29860).  
*Note: These changes are backward-compatible but may affect behavior in edge cases involving speculative decoding or batch limits.*

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - MTP (Multi-Token Prediction) added for **GLM5Next** and **Qwen3.8-Flash-Next (Qwen4Exp)** via PR #29928 and #29761.  
  - Experimental support for **LTX-2.3** multimodal generation (`/v1/images/generations`) introduced via PR #28540.  
- **Hardware & Backend**:  
  - **WebGPU**: Expanded support for `f16` tensors in `fill/set_rows`, enabling better compatibility with FP16-based models.  
  - **SYCL**: Fixes for memory errors in `mul_mat`, `split buffer`, and host pool handling (#29889).  
  - **CUDA**: Optimizations for Q2_K kernels using gentler unroll and reduced VGPR spills (#29910).  
  - **HIP/ROCm**: Improved device listing, expanded ops, and performance tuning in OpenVINO backend update to v2026.4.1 (#29852).

---

### **4. Performance & Optimization**  
- **MoE Expert Caching**: PR #29887 introduces a GPU cache for MoE experts kept in host memory, reducing offload overhead for small batches (≤32 tokens).  
- **Quantization Improvements**:  
  - Q2_K: Reduced VGPR spills on AMD GCN5 (MI50) by modifying loop unrolling strategy → measurable speedup in latency.  
  - Q1_0: HIP backend now uses `__builtin_amdgcn_perm` instead of `__byte_perm` for faster unpacking (#29927).  
- **MMVQ Support**: WebGPU now supports Q1_0/Q5_0/Q5_1/Q3_K/Q5_K/Q6_K/MXFP4 via PR #29483 — benchmarked at up to **+1.8x throughput** on Tesla V100.  
- **Memory Efficiency**: Qwen4Exp now halves indexer score memory usage (#29825), critical for long-context inference.

---

### **5. Stability & Regressions**  
Top stability concerns reported today:  
1. **Critical Crash**: `Qwen3.8-Flash-Next` + MTP + `-np N` causes silent draft acceptance collapse due to async `t_h_nextn` race (#27572). *Fix pending.*  
2. **Severe Corruption**: ROCm backend produces corrupted output on gfx1151 (Strix Halo APU) while Vulkan works correctly (#27579). *Investigation ongoing.*  
3. **Deterministic Crash**: `qwen4exp` crashes at fixed token position under multi-GPU layer split (FA on/off, graphs on/off) (#29562).  
4. **Regression in Speculative Decoding**: Greedy sampling diverges from vanilla output on **quantized targets (e.g., Q4_K_M)** when using draft-mtp (#25618). *Fix PRs exist but not yet merged.*  
5. **Stall on Metal**: GLM-5.3-Flash decode stalls due to fused Lightning Indexer falling back to CPU (#29867).  

---

### **6. What This Means for Application Developers**  
- **Use MTP with caution** on `Qwen3.8-Flash-Next` and `GLM5Next` until fixes land—especially under multi-slot (`-np N`) workloads.  
- **Avoid ROCm on gfx1151** for production inference until issue #27579 is resolved.  
- **Enable MoE caching** (via PR #29887) for improved throughput in low-batch scenarios (e.g., chat agents).  
- **Upgrade to b11382+** if using WebGPU or MTP—critical fixes for `f16` tensor handling and server stability.  
- **Monitor speculative decoding behavior** closely when quantizing models; greedy outputs may diverge on Q4_K_M and similar formats.  
- Consider **preloading model metadata** (e.g., `mmproj` files) for vision models—support for quantized `mmproj` is still pending (#18881).  

> 🔗 [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues) | [Pull Requests](https://github.com/ggml-org/llama.cpp/pulls) | [Latest Builds](https://github.com/ggml-org/llama.cpp/releases)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-04**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to strengthen its support for multimodal and structured reasoning workflows, with key PRs advancing MLX backend fidelity and system-level robustness. Critical stability fixes were merged for `clef-flash` on Windows and `/api/generate` JSON parsing, while new work on structured outputs and tool handling improves agent reliability.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- ✅ **MLX Backend Expansion**:  
  - Added support for **Kolibri 1** (PR #18780) via MLX.  
  - Enhanced tokenizer alignment for MLX models (PR #18779), reducing token-ID mismatches due to pretokenizer/normalization discrepancies.  
  - Full **SystemOne model support** now available on MLX (PR #18701).  
- ✅ **Windows & GPU Discovery Improvements**:  
  - Fixes for device index misalignment when skipping zero-memory pseudo-devices (PR #18773) ensure correct GPU assignment across architectures.

> 🔗 [PR #18780](https://github.com/ollama/ollama/pull/18780) | [PR #18779](https://github.com/ollama/ollama/pull/18779) | [PR #18701](https://github.com/ollama/ollama/pull/18701)

---

### **4. Performance & Optimization**  
- 📈 **Decision Model Latency Reduction**:  
  - `clef-flash` route flow tuning improved warm latency by ~5ms on M5 chips (PR #18776).  
- ⚙️ **Efficient Blob Handling**:  
  - `transfer: consume direct blob responses without refetching` (PR #18781) eliminates redundant downloads—reducing bandwidth usage by up to 50% for small blobs.  
- 💾 **Disk & Memory Efficiency**:  
  - Improved disk-full error propagation (PR #18648) prevents silent failures during large model pulls.  
  - Hostname colons now encoded in manifest paths (PR #18771), fixing Windows path issues.

> 🔗 [PR #18781](https://github.com/ollama/ollama/pull/18781) | [PR #18776](https://github.com/ollama/ollama/pull/18776)

---

### **5. Stability & Regressions**  
- 🔴 **Critical: `clef-flash` Fails on `/v1/systemone` (Windows)**  
  - Issue: `Clef: non-finite logit` (CUDA) / `cannot open model` (CPU) on first forward pass.  
  - Fix: PR #18777 patches a head weights read overrun in `llama/clef/clef.cpp` — confirmed working on Linux/macOS, now addressed for Windows.  
  > 🔗 [Issue #18769](https://github.com/ollama/ollama/issues/18769) | [PR #18777](https://github.com/ollama/ollama/pull/18777)  

- 🔴 **JSON Parsing Vulnerability in `/api/generate`**  
  - Bug: Accepts valid JSON followed by trailing garbage, risking malformed payloads.  
  - Fix: PR #18778 enforces strict JSON parsing; returns HTTP 400 on invalid bodies.  
  > 🔗 [Issue #18775](https://github.com/ollama/ollama/issues/18775) | [PR #18778](https://github.com/ollama/ollama/pull/18778)  

- 🟡 **Structured Output Order Regression**  
  - Bug: Property order lost in JSON schema outputs via native `llama-server` chat path (alphabetical override).  
  - Impact: Breaks step-dependent schemas used in agents.  
  > 🔗 [Issue #18717](https://github.com/ollama/ollama/issues/18717)  

- 🟡 **Gemma4: Schema Enforcement Bypass When `think:true`**  
  - Bug: Model returns non-compliant JSON when answering directly without reasoning steps.  
  > 🔗 [Issue #18774](https://github.com/ollama/ollama/issues/18774)

---

### **6. What This Means for Application Developers**  
- **Build more reliable agents**: Use `think: "high"` reliably only if you’re using models with proper `reasoning_effort` template support (watch out for Qwen3.8 GGUF issue, #18766).  
- **Avoid input corruption**: Ensure clients send clean JSON to `/api/generate`; use middleware to validate payloads until fix rolls out.  
- **Leverage MLX for macOS/Windows**: Kolibri 1 and enhanced SystemOne support enable faster decision logic on Apple Silicon.  
- **Expect better stability on Windows**: The `clef-flash` crash is fixed — upgrade to latest build for full Windows compatibility.  
- **Use structured outputs safely**: Until #18717 is resolved, avoid relying on property order in JSON schema outputs from `llama-server`.

> 👉 Stay tuned: Upcoming Ollama v0.36 will likely include these fixes and MLX enhancements. Monitor [GitHub](https://github.com/ollama/ollama) for release notes.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-10-04**

---

### **1. Today's Highlights**  
LiteLLM continues its rapid evolution with a focus on **security hardening**, **telemetry fidelity**, and **agent orchestration maturity**. The release of `v1.105.0-rc.1` introduces verified Docker image signing via cosign, reinforcing trust in production deployments. Key PRs today enhance traceability in agentic workflows (e.g., Lens integration) and fix critical issues around budget accounting and cache behavior — particularly for zero-cost models and virtual keys under load.

---

### **2. Releases & Breaking Changes**  
- **`v1.105.0-rc.1`** (Release Candidate):  
  - All Docker images are now signed using [cosign](https://docs.sigstore.dev/cosign/overview/) with the same key introduced in [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
  - *Action Required*: Verify signatures before deployment (`cosign verify --certificate-oidc-issuer=...`).  
  - [GitHub Release](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-rc.1)

- **`v1.104.0`, `v1.103.3`**: Stable updates with no breaking changes; focused on internal stability and telemetry fixes.

---

### **3. New Model & Hardware Support**  
- ✅ **Anthropic Workload Identity Federation (OIDC JWT-bearer)**: Added support via [#28607](https://github.com/BerriAI/litellm/issues/28607), enabling secure, identity-based access to Claude models in cloud-native environments (e.g., GCP/AWS workload identity).
- ✅ **OpenRouter TTS Support**: Fixed via [#42111](https://github.com/BerriAI/litellm/issues/42111), resolving "Unable to map custom provider" error when calling `/v1/audio/speech`.
- 🔧 **Vertex AI Agent Engine (image/audio/file content)**: Still under investigation ([#44336](https://github.com/BerriAI/litellm/issues/44336)) — current behavior silently drops non-text parts; not yet supported.

> No new hardware backends (CUDA/ROCm/Metal/CPU) or quantization formats added today.

---

### **4. Performance & Optimization**  
- 📈 **Tracing & Pagination Improvements**:  
  - Shared signed pagination across trace list/detail reads ([#44452](https://github.com/BerriAI/litellm/pull/44452)) eliminates drift during scroll and prevents cursor tampering.
  - Storage-independent trace reads and typed failure handling ([#44422](https://github.com/BerriAI/litellm/pull/44422)) enable future multi-storage support (e.g., ClickHouse → Postgres).
- ⏱️ **Latency Reduction**:  
  - Optimized `SlackAlerting.periodic_flush` task leak ([#41357](https://github.com/BerriAI/litellm/issues/41357)) ensures long-running proxies don’t accumulate background tasks.

> No measurable throughput or token/sec gains reported directly, but infrastructure stability improves operational efficiency.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Description |
|------|----------|--------|--------|-----------|
| [#39057](https://github.com/BerriAI/litellm/issues/39057) | High | Open | ❌ | Cache hit spend = 0, but token usage still logged — semantic confusion in cost reporting. |
| [#27735](https://github.com/BerriAI/litellm/issues/27735) | Critical | Open | ❌ | Virtual key incorrectly rejects requests despite spend < max_budget. Related to stale Redis state. |
| [#43732](https://github.com/BerriAI/litellm/issues/43732) | High | Open | ❌ | Key admitted again after 60s idle until batch writer flushes — violates budget enforcement. |
| [#44336](https://github.com/BerriAI/litellm/issues/44336) | Critical | Open | ❌ | Vertex AI agent engine silently drops image/audio content, returns fabricated answer (HTTP 200). |
| [#32226](https://github.com/BerriAI/litellm/issues/32226) | Medium | Closed | ✅ | UTF-8 truncation in large MCP payloads causing 500 errors (fixed in v1.103.3). |

> **Critical Note**: Multiple budget enforcement bugs indicate risk in financial accounting for high-volume gateways.

---

### **6. What This Means for Application Developers**  
- 🔐 **Security First**: Always verify Docker image signatures (`cosign verify`) — this is now mandatory for production use.
- 💰 **Budgeting Caution**: Avoid relying on `max_budget` for zero-cost models if your system uses virtual keys. Current logic may block them post-budget exhaustion due to lingering auth checks ([#38515](https://github.com/BerriAI/litellm/issues/38515)).
- 🤖 **Agentic Workflows**: New Lens integrations ([#44475](https://github.com/BerriAI/litellm/pull/44475), [#44472](https://github.com/BerriAI/litellm/pull/44472)) enable real-time tracing and investigation review — ideal for debugging complex agents.
- 🛠️ **SDK Enhancements**: Use `litellm.run_tool_loop()` and `arun_tool_loop()` ([#44381](https://github.com/BerriAI/litellm/pull/44381)) to avoid boilerplate in tool execution loops.
- ⚠️ **Avoid Pitfalls**: Do not assume model availability post-budget breach — even zero-cost models can be blocked due to caching or stale state.

> **Recommendation**: Upgrade to `v1.105.0-rc.1` for improved security and telemetry, but test budget logic thoroughly in staging.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-04**

#### **1. Today's Highlights**  
A surge in UI/UX and backend stability issues has emerged, particularly around **model loading, audio workflows, and context management**, with several critical regressions reported in v0.1.902-beta. Meanwhile, significant progress is being made on **SageAttention 2 integration**, **automatic step skipping**, and **multi-model support**, indicating deeper infrastructure refinement ahead of next-gen inference optimizations.

#### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, **v0.1.902-beta** (and earlier) is now flagged as unstable due to multiple regressions:  
- `--mlock` rejection and `mmproj-F16.gguf` disk spooling in Studio ([#12372](https://github.com/unslothai/unsloth/issues/12372))  
- Web search failures via `primp h2_client connection reset` ([#12638](https://github.com/unslothai/unsloth/issues/12638))  
- Tool call lifecycle bugs under `tool_choice="none"` ([#12626](https://github.com/unslothai/unsloth/issues/12626))  

> ⚠️ **Migration Note**: Avoid upgrading to v0.1.902-beta until these are resolved. Stick to stable builds like `b10687-mix-67dfc8b` for performance-critical workloads.

#### **3. New Model & Hardware Support**  
- **SageAttention 2** now integrated into Studio’s kernel hub, with automatic probing and fallback logic ([PR #12654](https://github.com/unslothai/unsloth/pull/12654)).  
- **FlashAttention 4** dependencies now auto-load on fresh install ([PR #12654](https://github.com/unslothai/unsloth/pull/12654)).  
- **Vulkan multi-GPU pinning** improved: discrete GPU now prioritized over shared iGPU in mixed configurations ([PR #12650](https://github.com/unslothai/unsloth/pull/12650)).  
- **Pre-quantized diffusion models** (e.g., HTDemucs, Mel-Band RoFormer GGUFs) now load from `safetensors` on torchao 0.17–0.18 ([PR #12645](https://github.com/unslothai/unsloth/pull/12645)).

#### **4. Performance & Optimization**  
- **Automatic step skip** introduced: enables 1.44x–1.81x speedup across five models by default; up to 2.1x on MiniMax-H3 ([PR #12652](https://github.com/unslothai/unsloth/pull/12652)).  
- **Tensor split decode performance regression**: Since `b10715-mix-86bd2d3`, tensor-split inference on dual RTX 5070 Ti drops to ~48 t/s (vs. 115+ t/s on older builds), possibly due to `max_cuda_graphs = 64` limit ([#12468](https://github.com/unslothai/unsloth/issues/12468)).  
- **Context length meter enhancements** proposed: track compaction events and tool-call handoffs for better real-time visibility ([#12625](https://github.com/unslothai/unsloth/issues/12625), [#12624](https://github.com/unslothai/unsloth/issues/12624)).

#### **5. Stability & Regressions**  
| Severity | Issue | Impact | Status |
|---------|------|--------|--------|
| 🔴 High | Tensor split decode slowdown (2.9x slower) | Critical for multi-GPU users | Open ([#12468](https://github.com/unslothai/unsloth/issues/12468)) |
| 🔴 High | Studio pages `mmproj-F16.gguf` from disk | Severe throughput drop, memory bloat | Closed ([#12372](https://github.com/unslothai/unsloth/issues/12372)) |
| 🟡 Medium | Xet health probe breaks diffusers/xformers | Blocks image/video generation | Open ([#12466](https://github.com/unslothai/unsloth/issues/12466)) |
| 🟡 Medium | "nul" file blocks Windows terminal tools | Silent failure in sandbox | Open ([#12473](https://github.com/unslothai/unsloth/issues/12473)) |
| 🟡 Medium | Live Monitor overlaps with popovers | UX degradation in Studio | Open ([#12623](https://github.com/unslothai/unsloth/issues/12623)) |

> ✅ **Fixes in Progress**: PRs addressing `tool_choice="none"` lifecycle ([#12627](https://github.com/unslothai/unsloth/pull/12627)) and toast styling ([#12655](https://github.com/unslothai/unsloth/pull/12655)) have been merged.

#### **6. What This Means for Application Developers**  
- **Avoid `b10715-mix-86bd2d3`+** if using tensor-split inference on multi-GPU setups—use `b10687-mix-67dfc8b` or official ggml builds for optimal throughput.  
- Leverage **automatic step skipping** and **SageAttention 2** for faster image/video generation without manual tuning.  
- Be cautious with `tool_choice="none"`: streamed tool calls may not emit terminal events—implement client-side validation.  
- For **diffusion pipelines**, expect improved support via `safetensors`-based pre-quantized checkpoints and refined kernel probing.  
- **Future-proof your agent apps**: monitor context tracking improvements (compaction, tool handoff) to enhance stateful reasoning accuracy.

> 💡 *Pro Tip*: Use `--spec-type draft-mtp` + `--split-mode tensor` cautiously—this combination is currently destabilizing on newer builds. Test with legacy versions until [#12468](https://github.com/unslothai/unsloth/issues/12468) is resolved.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*