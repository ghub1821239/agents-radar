# AI Infrastructure Digest 2026-10-10

> Generated: 2026-10-10 01:54 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-10**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *hardware specialization and architectural refinement*, driven by next-gen GPUs (Blackwell, MI355X) and emerging model architectures (MoE, Flash variants). Projects are increasingly diverging in focus: high-performance engines like vLLM and SGLang push the limits of throughput and low-latency inference, while lightweight runtimes such as llama.cpp target portability across heterogeneous devices. Gateways like LiteLLM are evolving into secure, observability-rich orchestration layers, and fine-tuning platforms like Unsloth emphasize cross-platform compatibility and usability. The convergence of speculative decoding, structured outputs, and multi-modal support signals a shift toward agent-centric workflows.

---

### **2. Activity Comparison**  

| Project       | Issues Open (↑) | PRs Merged (↑) | Release Status       | Notes |
|---------------|------------------|------------------|------------------------|-------|
| **vLLM**      | 87 (↑4)          | 19 (↑6)          | Stable: v0.31.0; No new release | High focus on correctness & hardware fixes |
| **SGLang**    | 112 (↑5)         | 22 (↑8)          | Stable: v0.5.16; No new release | Active on CUDA Graphs & AMD prefill parallelism |
| **llama.cpp** | 108 (↑3)         | 14 (↑5)          | Nightly builds (b11539–b11531); No stable release | Stability issues dominate activity |
| **Ollama**    | 215 (↑12)        | 9 (↑3)           | v0.40.2 released; auto-upgrade bug reported | Critical regressions in MLX/CUDA backends |
| **LiteLLM**   | 231 (↑7)         | 12 (↑4)          | v1.106.0-dev.3 (security fix) | Security hardening and Rust migration in progress |
| **Unsloth**   | 168 (↑6)         | 15 (↑5)          | No new release; PyPI/GitHub misalignment | Strong AMD/Intel/Jetson support efforts |

> 🔍 *Observation*: Ollama and LiteLLM show highest issue volume due to production stability concerns and security incidents, while vLLM and SGLang lead in engineering velocity for performance-critical features.

---

### **3. Model Support Race**  

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash**   | ✅ (SM120, ROCm) | ✅ (DP attention, context parallel) | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.8-Flash-Next**    | ✅ (ROCm, FP8 hybrid) | ✅ (AMD GPU) | ❌ | ⚠️ (requested) | ❌ | ❌ |
| **Qwen3.8-2.4T-A95B**     | ✅ (ROCm) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Prism Bonsai 2 27B**     | ❌ | ❌ | ✅ (nightly) | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1-Turbo**  | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (PR #13159) |
| **Gemma4-assistant**      | ❌ | ❌ | ❌ (regression) | ❌ | ❌ | ❌ |
| **ScaleDown models**      | ❌ | ❌ | ❌ | ❌ | ✅ (native) | ❌ |

> 🏆 **Leader**: **vLLM** leads in cutting-edge model + hardware support, especially for Blackwell and ROCm. **SGLang** excels in AMD and speculative decoding optimizations. **Unsloth** stands out in multimodal and GGUF model coverage.

---

### **4. Performance Frontier**  

| Focus Area               | vLLM                          | SGLang                        | llama.cpp                   | Ollama                     | LiteLLM                      | Unsloth                     |
|--------------------------|-------------------------------|-------------------------------|------------------------------|----------------------------|------------------------------|------------------------------|
| **KV Cache Optimization** | ✅ FP8 auto-select (breaking), SM120 sparse-MLA | ✅ Skip eager reserve (PR #43435) | ❌ (OOM on long convs)       | ❌ (memory bloat: 127GB RAM) | ✅ Spend cache tuning        | ❌ (VRAM inflation in QLoRA) |
| **Batching & Overlap**   | ✅ DPA+ETP dual-batch overlap | ✅ Overlap scheduler (PR #11762) | ❌ (no batch overlap)        | ❌ (latency ~1 wpm)        | ✅ Telemetry persistence      | ❌ (infinite indexing loops) |
| **Quantization Efficiency**| ✅ NVFP4+FP8 hybrid, FlashInfer autotune | ✅ FP4 GEMM autotuning (AMD) | ✅ Q4_K/MVQ cutoff tuning    | ❌ (crashes with Qwen3.6)  | ✅ ScaleDown pricing model   | ✅ Embedding LR fix (PR #13171) |
| **Distributed Serving**  | ✅ NIXL P/D side-channel config | ❌ (no explicit support)       | ❌ (local-only)              | ❌ (no disaggregated)      | ✅ Multi-provider routing     | ❌ (no distributed)          |
| **Kernel-Level Tuning**  | ✅ Sparse-MLA, TD adoption RFC | ✅ Context parallel (AMD)     | ✅ SYCL multi-column engine  | ❌ (fallback to CPU)       | ✅ Rust gateway (sub-1ms)    | ✅ `tl.program_id` cast fix  |

> 🔥 **Top Performers**: vLLM and SGLang are leading in kernel-level optimization and distributed efficiency. LiteLLM’s Rust rewrite promises a paradigm shift in gateway performance.

---

### **5. Layer Positioning**  

| Project       | Primary Layer                  | Secondary Role                         | Key Differentiator |
|---------------|--------------------------------|----------------------------------------|--------------------|
| **vLLM**      | Inference Engine (GPU)         | Model Serving (with async batching)    | Industry standard for high-throughput, Blackwell-optimized inference |
| **SGLang**    | Inference Engine + Speculative | Agent Pipeline Orchestration           | Best-in-class speculative decoding + multi-node scaling |
| **llama.cpp** | Local Runtime (CPU/GPU)        | Edge & Mobile Inference                | Unmatched portability; minimal dependencies |
| **Ollama**    | Developer-Facing Gateway       | Local Model Runner (CLI/UI)            | Simplicity at cost of stability; aggressive auto-updates |
| **LiteLLM**   | LLM Gateway / API Proxy        | Enterprise Observability & Security    | First-mover in supply-chain security & Rust-based proxy |
| **Unsloth**   | Fine-Tuning & Local Runtime    | Multimodal Document Processing         | Strongest cross-platform support (AMD, Intel, Jetson) |

> 💡 **Strategic Insight**: The stack is maturing — engines (vLLM/SGLang) handle core inference, gateways (LiteLLM) manage multi-provider routing, local runtimes (llama.cpp) serve edge use cases, and fine-tuning tools (Unsloth) enable rapid customization.

---

### **6. Trend Signals**  

1. **Hardware-Specific Optimization is Now Mandatory**  
   - Blackwell (SM120) and MI355X support is no longer experimental — it's production-ready in vLLM and SGLang. Developers must now consider GPU architecture at deployment time.
   - *Action*: Prioritize `VLLM_ROCM_MONO_DECODE=1`, `--block-size 64`, and `VLLM_USE_FLASHINFER=0` for optimal performance.

2. **Speculative Decoding is Reaching Production Maturity — But With Caveats**  
   - Both vLLM and SGLang have made major strides in speculative decoding (DSpark, MTP), but critical bugs remain (e.g., JSON schema corruption, divergence on quantized targets).
   - *Action*: Avoid speculative decoding with Q4_K_M or NVFP4 models until fixes land.

3. **Security and Supply Chain Integrity Are Non-Negotiable**  
   - LiteLLM’s recent security incident and Ollama’s auto-upgrade risk highlight that trust is a foundational requirement. Signed Docker images and version pinning are now expected.
   - *Action*: Always upgrade to signed releases (v1.106.0-dev.3+) and avoid auto-upgrades in production.

4. **Rust Migration Is the Next Wave of Performance**  
   - LiteLLM’s Rust gateway initiative aims for sub-1ms overhead — a game-changer for high-throughput, low-latency systems.
   - *Action*: Monitor beta access and prepare for infrastructure rearchitecting in early 2027.

5. **Agent-Centric Workflows Demand Integrated Tooling**  
   - Structured output, tool calling, reasoning content, and streaming reliability are now central concerns. Regressions in Mistral, Bedrock, and Ollama indicate gaps in agent pipeline fidelity.
   - *Action*: Validate streaming behavior, schema parsing, and `reasoning_content` handling end-to-end before deploying agents.

---

> ✅ **Final Recommendation for Application Developers**:  
> - **Production Systems**: Use **vLLM** (Blackwell/ROCm) or **SGLang** (AMD/Hybrid) for high-throughput inference.  
> - **Edge/Local Devices**: Lean on **llama.cpp** with `--no-logits-buffer` and pinned versions.  
> - **Enterprise APIs**: Choose **LiteLLM** for security, telemetry, and multi-provider routing — but monitor streaming stability.  
> - **Fine-Tuning & Multimodal**: **Unsloth** remains best-in-class for non-NVIDIA hardware and document processing.  
> - **Avoid v0.40.x (Ollama)** until memory and MLX crashes are resolved.  

*Report generated: 2026-10-10 | Source: GitHub project digests*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **1. Today's Highlights**  
vLLM continues to accelerate support for next-gen hardware, with critical performance and stability fixes for DeepSeek-V4.1-Flash on SM120 (Blackwell) and ROCm (MI355X). Key work includes optimizing sparse-MLA kernels for SM120, enabling mono-decode paths on ROCm, and resolving multiple correctness issues in structured output and speculative decoding. The project is actively addressing model-specific regressions while advancing MoE residency and KV-cache planning.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, **vLLM 0.31.0** (latest stable) has introduced breaking changes in `kv_cache_dtype="fp8"` behavior: it now auto-selects FlashInfer backend even without a usable JIT, crashing instead of falling back to Triton (`#60262`). Developers must ensure `VLLM_USE_FLASHINFER=0` or install `flashinfer-cubin` when using FP8 cache.

> 🔗 [Issue #60262](https://github.com/vllm-project/vllm/issues/60262) | [PR #60762](https://github.com/vllm-project/vllm/pull/60762) (fix pending)

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1-Flash**: Full support on **SM120 (RTX PRO 6000 Blackwell)** via optimized sparse-MLA kernels and mono-decode path (`#60397`, `#60762`).  
- **ROCm (gfx950 / MI355X)**: Performance optimizations for **Qwen3.8-Flash-Next**, **Qwen3.8-2.4T-A95B**, and **DeepSeek-V4.1-Flash** (`#60397`, `#59575`, `#57149`).  
- **Intel GPU (XPU)**: Fixed W4A8 weight repacking leak (`#57511`).  
- **Quantization**: NVFP4 + FP8 hybrid checkpoint support for Qwen3.8-Flash-Next (`#54765`).

> 🔗 [PR #60397](https://github.com/vllm-project/vllm/pull/60397) | [Issue #54765](https://github.com/vllm-project/vllm/issues/54765)

---

### **4. Performance & Optimization**  
- **SM120 (Blackwell)**: `--block-size 64` now supported for DSV4.1 sparse-MLA via `#60762`, fixing prior kernel block size negotiation failures.  
- **ROCm (MI355X)**: Mono-decode path for DSV4.1 enables ~20–30% decode throughput gain (`#60397`).  
- **Prefill Overlap**: DPA+ETP dual-batch-overlap enabled for DeepSeek-V4 on ROCm (`#57773`), improving prefill efficiency in data-parallel setups.  
- **Kernel-Level**: Tensor Descriptor (TD) adoption strategy RFC underway (`#42545`) to modernize Triton memory access patterns.  
- **Memory Efficiency**: `max_num_batched_tokens` now affects KV cache pool size — documentation updated (`#48322`).

> 🔗 [PR #60762](https://github.com/vllm-project/vllm/pull/60762) | [RFC #42545](https://github.com/vllm-project/vllm/issues/42545)

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| Critical | `GLM-5.3-Flash` long-decode degeneration after accumulated reasoning (`#56868`) | Output drift over time | Pending |
| High | DFlash2/DSpark + prefix caching corrupts output on Qwen3.8-27B NVFP4 (`#60174`) | Inconsistent responses post-cache-hit | Pending |
| High | `kv_cache_dtype="fp8"` crashes due to missing FlashInfer JIT (`#60262`) | Runtime failure | PR open (`#60762`) |
| Medium | Structured output invalid with MTP speculative decoding (`#60830`) | JSON schema outputs malformed | Closed |
| Medium | `_compute_slot_mapping_kernel` out-of-bounds read on ROCm (`#53982`) | Potential memory corruption | Pending |

> 🔗 [Issue #56868](https://github.com/vllm-project/vllm/issues/56868) | [PR #60762](https://github.com/vllm-project/vllm/pull/60762)

---

### **6. What This Means for Application Developers**  
- **Use `VLLM_USE_FLASHINFER=0`** if you're running FP8 KV caches without FlashInfer JIT to avoid crashes (`#60262`).  
- **For Blackwell (SM120) deployments**, prefer `--block-size 64` and enable `VLLM_ROCM_MONO_DECODE=1` for DSV4.1 and Qwen models to maximize throughput.  
- **Avoid `max_tokens > max_model_len`** — vLLM currently rejects such requests instead of clamping; handle this client-side (`#42474`).  
- **Structured output workflows** should avoid MTP speculative decoding until `#60830` fix is released.  
- **Multi-node disaggregated serving** (e.g., NIXL P/D) requires explicit side-channel configuration (`VLLM_NIXL_SIDE_CHANNEL_HOST`) to avoid loopback errors (`#59583`).  

> 📌 Pro Tip: Monitor `collect_env.py` for platform compatibility — non-Linux crashes have been fixed (`#48354`).

---  
*Digest generated: 2026-10-10 | Source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **1. Today's Highlights**  
The SGLang project continues to strengthen its support for DeepSeek-V4.1 and DSpark speculative decoding, with key PRs addressing prefill parallelism on AMD GPUs and fixing critical CUDA Graph issues in high-TP deployments. Notably, a fix has been merged to prevent deterministic inference hangs caused by misaligned prefill chunks, while ongoing work targets robustness in multimodal (VMM) and diffusion serving pipelines.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several breaking changes are imminent:  
- `--enable-deterministic-inference` now requires proper alignment handling — a recent fix (#43444) resolves a hang when `chunked_prefill_size < 4096`.  
- The `dtype="float32"` config option is now validated; using it without proper type mapping may trigger `KeyError: torch.float32` (see #43162).  
- Users of `sglang.Engine` should avoid setting `chunked_prefill_size=-1`, as it causes negative `mem_fraction_static` and engine startup failure (#43160).

> 🔗 [PR #43444](https://github.com/sgl-project/sglang/pull/43444) | [Issue #43162](https://github.com/sgl-project/sglang/issues/43162) | [Issue #43160](https://github.com/sgl-project/sglang/issues/43160)

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1**: Active optimization progress with PRs enabling DP attention for MegaMoE models (#43228), context parallel prefill on AMD (#43465), and mHC/engram fusion improvements (#43065).  
- **AMD GPU Support**: Expanded via prefill context parallelization and FP4 GEMM autotuning for compressed tensors (#43465, #43464).  
- **Moore Threads (MUSA)**: Feature request remains open (#16565); no implementation yet.  
- **MLX Backend**: Stability updates for native generation and chat consistency (fixes #42415).  
- **Multimodal (CUDA VMM)**: Ongoing work to prevent memory leaks during aborted requests (#43402).

> 🔗 [PR #43465](https://github.com/sgl-project/sglang/pull/43465) | [PR #43464](https://github.com/sgl-project/sglang/pull/43464) | [Issue #16565](https://github.com/sgl-project/sglang/issues/16565)

---

### **4. Performance & Optimization**  
- **Speculative Decoding**: Overlap scheduler enhancements are under active development (#11762), aiming to improve throughput via asynchronous planning.  
- **KV Memory Efficiency**: PR #43435 skips eager activation reserve in capped Full prefill roles, reducing static memory overhead for disaggregated servers.  
- **FlashInfer Autotuning**: Now enabled for NVFP4-compressed checkpoints, improving kernel efficiency for W4A4/NVFP4 quantized models (#43464).  
- **Mamba Caching**: Optimizations continue with PR #41701 ensuring checkpoint donation remains viable during chunked prefills.  

> 🔗 [PR #43435](https://github.com/sgl-project/sglang/pull/43435) | [PR #43464](https://github.com/sgl-project/sglang/pull/43464) | [PR #41701](https://github.com/sgl-project/sglang/pull/41701)

---

### **5. Stability & Regressions**  
**Critical Issues Reported (Ranked by Severity):**  
1. **CUDA Graph Crashes on TP8** – Multiple reports of illegal memory access in `DSpark`'s compact ragged target-verify path (`#31023`, `#33356`, `#33412`) affect `DeepSeek-V4-Pro-DSpark` on H800/B300 TP8. Fixes merged in #31195.  
2. **Deterministic Inference Failure** – `--enable-deterministic-inference` fails silently or crashes due to misaligned prefill chunks (#43055, #43444). Fix merged.  
3. **Zombie Requests & Memory Leaks** – Disconnected clients leave stale requests that decode to max tokens and flood logs (#36333); also, VMM transport slices leak if requests abort early (#43402).  
4. **Crash on Invalid Configs** – Using `dtype="float32"` or `chunked_prefill_size=-1` can crash the engine (#43162, #43160).  
5. **Tool Call Schema Corruption** – Nullable string arguments incorrectly parsed as numbers/booleans (#43149 → fixed in #43389).  

> 🔗 [Issue #31023](https://github.com/sgl-project/sglang/issues/31023) | [PR #31195](https://github.com/sgl-project/sglang/pull/31195) | [PR #43444](https://github.com/sgl-project/sglang/pull/43444) | [PR #43389](https://github.com/sgl-project/sglang/pull/43389)

---

### **6. What This Means for Application Developers**  
- **Avoid `chunked_prefill_size=-1`** — it will cause engine startup failure. Use positive values aligned with your hardware.  
- **Enable `--enable-deterministic-inference` only with aligned prefill sizes** — ensure `chunked_prefill_size` ≥ 4096 to prevent hangs.  
- **Use `--radix-eviction-policy-config` with care** — NPU support is now tested end-to-end (#39938), but tuning parameters must be validated.  
- **Watch for tool schema parsing bugs** — nullable strings may be misparsed unless explicitly handled (fixed in #43389).  
- **Monitor for VMM leaks** — if using `--mm-feature-transport cuda_vmm`, ensure client disconnects don’t leave unclosed memory slices.  
- **Test against latest main** — many regressions (e.g., GLM-5.3 speculative decoding loops, #40843) persist beyond v0.5.16.

> 📌 Pro Tip: Always validate `dtype`, `chunked_prefill_size`, and `routing-key` settings before deploying production workloads.

---  
*Digest generated: 2026-10-10 | Source: [sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-10**

---

### **1. Today's Highlights**  
The latest updates focus on critical correctness fixes in speculative decoding and GPU kernel stability, particularly for CUDA and OpenCL backends. Key improvements include a fix for round-off discrepancies between CPU and GPU in CUDA (`#30229`), resolution of an A6x OpenCL shader compilation crash (`#30176`), and a deep JSON patch applied from upstream to prevent nested config corruption (`#30253`). These changes reinforce the project’s commitment to robust inference across heterogeneous hardware.

---

### **2. Releases & Breaking Changes**  
No new stable releases were published today. However, **b11539–b11531** (latest nightly builds) contain several breaking changes:
- `b11539`: Fixes deep nested JSON parsing via upstream nlohmann/json patch (`#30253`) — required if using complex configuration files.
- `b11538`: Resolves GPU/CPU divergence in floating-point rounding under MSVC (`#30229`) — may affect reproducibility in mixed-precision scenarios.
- `b11537`: Reorders embedding graph logic for Gemma4; includes TODO for LoRA support (`#30160`).  
➡️ *Migration Note:* Users relying on custom embedding paths or speculative decoding with quantized targets should test behavior post-upgrade.

🔗 [GitHub Releases](https://github.com/ggml-org/llama.cpp/releases)

---

### **3. New Model & Hardware Support**  
- ✅ **New model support**: Added runtime support for **Prism Bonsai 2 27B** (`#29600`) — enables inference with this emerging LLM family.
- ✅ **Hardware backend improvements**:  
  - OpenCL now supports Adreno bin kernels for MoE Q4_K/Q6_K (`#30187`), improving performance on mobile GPUs.
  - Vulkan CI updated to use NVIDIA r615 driver (`#28659`) — resolves intermittent coopmat1 failures in CI.
- ✅ **Quantization**: No new formats added, but ongoing work on MoE expert caching (`#29949`) and Q4_0/MVQ cutoff tuning (`#28090`) suggest future optimizations.

---

### **4. Performance & Optimization**  
- ⚡ **CUDA**: Reduced redundant memory copies in SSM_SCAN (`#29807`) — improves throughput in stateful models like MTP draft decoders.
- ⚡ **SYCL**: Multi-column matrix engine optimization for Intel XMX (up to 80 columns) enhances speculative decoding efficiency (`#29864`).
- ⚡ **Vulkan**: RMS norm optimized using subgroup reductions (`#29882`) — reported ~12% faster norm ops on B70 Arc Pro.
- 💡 **Memory**: PR `#30255` eliminates unnecessary logits buffer allocation for non-logit-producing models (e.g., rerankers, embeddings), saving up to **~1 MiB per token** for large vocabularies (e.g., bge-m3: 250K+ tokens).

---

### **5. Stability & Regressions**  
High-severity issues reported today:
1. **Speculative decoding divergence** on quantized targets (`#25618`, 30 comments): Greedy sampling produces different outputs vs vanilla run when target model is quantized (Q4_K_M). *No fix PR yet.*  
   🔗 [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618)
2. **CUDA crashes with Qwen3.6-27B** (`#23210`, 14 comments): Server crashes during inference on Windows CUDA. Reproducible on RTX 5060 Ti. *Fix pending.*
   🔗 [Issue #23210](https://github.com/ggml-org/llama.cpp/issues/23210)
3. **Gemma4-assistant MTP draft load failure** (`#24795`, 12 comments): “Invalid vector subscript” error since `b9702`. Works on `b9553`. Regression confirmed.  
   🔗 [Issue #24795](https://github.com/ggml-org/llama.cpp/issues/24795)
4. **Long conversation OOM crashes** (`#30091`, 8 comments): `bad allocation` during extended conversations on HIP backend.  
   🔗 [Issue #30091](https://github.com/ggml-org/llama.cpp/issues/30091)

> ⚠️ **Priority**: Users running speculative decoding with quantized models or long-context chats should avoid `b11539` until regression fixes are merged.

---

### **6. What This Means for Application Developers**  
- 🛠️ **Avoid speculative decoding** with Q4_K_M or similar quantizations until `#25618` is resolved — results may be inconsistent.
- 📦 **Leverage new optimizations**: Use `b11539+` for better performance on Intel XMX/SYCL and Adreno/OpenCL devices. Enable `--no-logits-buffer` for embedding/reranking pipelines to reduce RAM usage.
- 🔄 **Update dependencies**: Ensure your build uses latest `nlohmann/json` (via `vendor: apply deep nested json patch`) to prevent config corruption in complex setups.
- 🧩 **Plan for MoE scalability**: With `#29949` open, expect future GPU-resident LRU expert caching — ideal for high-throughput agent systems.

🔧 *Recommendation*: Pin to `b11531` or earlier for production stability until speculative decoding and MTP regressions are addressed.

---  
*Data source: [ggml-org/llama.cpp GitHub](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-10**

---

### **1. Today's Highlights**  
Multiple critical stability issues have emerged in Ollama 0.40.x, particularly affecting MLX and CUDA backends on Apple Silicon and Windows systems, with users reporting crashes during model warmup and excessive memory usage (e.g., 127GB RAM for a 80GB model). Concurrently, new feature requests highlight growing demand for decision models (e.g., *d1-3B*, *d1-omni-600M*) and native TTS support—indicating broader use cases beyond standard LLM inference.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, **v0.40.2 introduced an automatic model upgrade feature** that has already sparked concern: users report it may exhaust SSD space without warning ([#18909](https://github.com/ollama/ollama/issues/18909)). A request to disable this behavior is pending.

---

### **3. New Model & Hardware Support**  
- **MLX backend**: PRs #18780 and #18856 confirm active development for Kolibri 1 support and ongoing fixes for `qwen3.6:35b-mlx` regressions in v0.40.x.  
- **New model requests**: Users are requesting support for **d1-3B**, **d1-omni-600M** (decision models with image input), **Qwen 3.8 flash next**, **mimo v2.6**, **hy4**, **stepfun**, **laguna**, and **reflection ai** ([#18850](https://github.com/ollama/ollama/issues/18850), [#18890](https://github.com/ollama/ollama/issues/18890)).  
- **Hardware**: AMD Radeon 780M Vulkan backend continues to suffer from memory allocation failures in >=0.32.10 ([#17748](https://github.com/ollama/ollama/issues/17748)).

---

### **4. Performance & Optimization**  
- **Memory inefficiency**: A user reports **127GB RAM usage** and **>100GB wired memory** when loading `mistral-medium-3.5:128b` on M4 Mac with 128GB RAM, despite the model being ~80GB — indicating severe memory bloat or mismanagement ([#18770](https://github.com/ollama/ollama/issues/18770)).  
- **Latency**: Inference drops to **~1 word per minute** under these conditions, suggesting system-level bottlenecks or GPU/CPU fallback.  
- **Optimization note**: The background model compatibility migration was temporarily skipped due to GC pressure and per-request overhead ([#18908](https://github.com/ollama/ollama/pull/18908)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Details | PR/Ref |
|--------|------|--------|-------|
| 🔴 Critical | MLX runner panic with `qwen3.6:35b-mlx` | Regression in v0.40.x; works in v0.35.0 ([#18856](https://github.com/ollama/ollama/issues/18856)) | [PR #18856](https://github.com/ollama/ollama/issues/18856) |
| 🔴 Critical | CUDA error: shared object initialization failed | Occurs intermittently on Windows with RTX 5070 Ti (Blackwell), leading to silent CPU fallback ([#17380](https://github.com/ollama/ollama/issues/17380), [#18276](https://github.com/ollama/ollama/issues/18276)) | [PR #18276](https://github.com/ollama/ollama/issues/18276) |
| 🟡 High | Gemma4:12b fails with "ctx_other must be set" | Error occurs only on specific versions (e.g., `gemma4:12b`), not `latest` ([#18898](https://github.com/ollama/ollama/issues/18898)) | Pending |
| 🟡 Medium | Windows auto-update leaves `.tmp` DLLs | Corrupts `ggml-cuda.dll`, causing GPU detection failure and CPU fallback ([#18712](https://github.com/ollama/ollama/issues/18712)) | [PR #18660](https://github.com/ollama/ollama/pull/18660) |

---

### **6. What This Means for Application Developers**  
- **Avoid v0.40.x on MLX and CUDA** if using large models (`qwen3.6:35b-mlx`, `mistral-medium-3.5:128b`)—use v0.35.0 as a stable baseline until regressions are patched.  
- **Monitor disk space closely**—the new auto-upgrade feature can silently fill storage ([#18909](https://github.com/ollama/ollama/issues/18909)).  
- **Expect instability on newer GPUs** (RTX 5070 Ti, AMD 780M); validate deployments on target hardware before production use.  
- **Design around OpenAI endpoint limitations**: `max_tokens` is ignored in `/v1/chat/completions`, and `reasoning_content` is silently dropped for DeepSeek models ([#18575](https://github.com/ollama/ollama/issues/18575), [#18534](https://github.com/ollama/ollama/issues/18534)).  
- **Consider external tooling** for advanced features like TTS ([#1234](https://github.com/ollama/ollama/issues/1234)) or observability ([#18912](https://github.com/ollama/ollama/pull/18912), Vessel proxy).

---  
*Data source: [github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-10**

---

### **1. Today's Highlights**  
The LiteLLM project continues its momentum toward high-performance, secure, and enterprise-grade inference serving with a strong focus on stability and observability. Key developments include the launch of **Rust-based gateway work** (Issue #31263), ongoing **security hardening post-supply-chain incident**, and critical fixes for budget enforcement, streaming reliability, and telemetry in production deployments.

---

### **2. Releases & Breaking Changes**  
- **v1.106.0-dev.3** released today with enhanced security posture: all Docker images are now signed via [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) using a consistent key introduced in March 2026. This ensures trust in the supply chain.  
- **Security Note**: The prior compromise (Issue #24518) has been fully contained; all affected PyPI packages (v1.82.7–v1.82.8) have been removed. Users should upgrade to v1.106.0-dev.3 or later. See full details: [Security Townhall](https://docs.litellm.ai/blog/security-townhall-updates)

---

### **3. New Model & Hardware Support**  
- **ScaleDown models** added as a new chat provider (#44167, #44168): five models (`scaledown/extract`, `summarization/abstractive`, etc.) now supported natively via ScaleDown’s API endpoints. Pricing is defined ($0.05 per million input tokens, zero output).  
- **Bedrock GPT-5.6+ tool calls with reasoning** now bridge directly to native `/responses` instead of falling back to Converse (#45609), improving agent performance and prompt caching fidelity.  
- **Vertex AI Claude batching** now uses correct Anthropic model paths and row shapes (#45715), enabling batch processing of Claude models on Google Cloud.

---

### **4. Performance & Optimization**  
- **Rust Migration Initiative** (Issue #31263): The core proxy is being rewritten in Rust to achieve sub-1ms overheads and maximize throughput. Early beta signups open via [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...). This is expected to reduce latency by ~70% in high-throughput scenarios.  
- **Telemetry Persistence** (PR #45490): Air-gapped proxies can now persist telemetry reports locally with a stable instance ID and export via admin UI — critical for monitoring in isolated environments.  
- **Spend Cache Optimization** (Issue #31866): Introduces `disable_entity_spend_updates` flag to suppress redundant database UPDATEs during high-load spikes, reducing DB contention and improving scalability.

---

### **5. Stability & Regressions**  
Top severity issues reported today:

| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [#45457](https://github.com/BerriAI/litellm/issues/45457) – Stream dropped before first chunk never retried | High | Open | No fix yet |
| [#45546](https://github.com/BerriAI/litellm/issues/45546) – Mistral drops `reasoning_content` in replayed chunks | High | Open | No fix yet |
| [#45411](https://github.com/BerriAI/litellm/issues/45411) – `per-turn-control-2026-07-01` filtered incorrectly for Bedrock | Medium | Open | No fix yet |
| [#45406](https://github.com/BerriAI/litellm/issues/45406) – Non-Responses error frame emitted mid-stream | Medium | Open | No fix yet |
| [#45379](https://github.com/BerriAI/litellm/issues/45379) – `soundfile` missing in non-proxy extras breaks transcribe | Medium | Open | No fix yet |

> **Note**: Several regressions in `end_user` tracking (#31441), budget enforcement (#26672), and spend cache consistency (#43491) remain unresolved but are under active review.

---

### **6. What This Means for Application Developers**  
- **Upgrade immediately** if using v1.82.7–v1.82.8 due to confirmed supply-chain compromise. Use v1.106.0-dev.3 or later.  
- **Leverage new ScaleDown support** for cost-effective summarization and extraction workflows without vendor lock-in.  
- **Enable `disable_entity_spend_updates`** if running high-volume inference systems to prevent DB overload from spend updates.  
- **Monitor streaming behavior closely** — several bugs in stream handling (especially for Vertex AI, Bedrock, and Mistral) may cause silent failures or misreported costs.  
- **Prepare for Rust migration** — expect major performance gains and lower latency in early 2027. Stay tuned for beta access.  

> 🔗 *Full issue tracker*: [GitHub Issues](https://github.com/BerriAI/litellm/issues)  
> 🔗 *Rust Migration Blog*: [litellm.ai/blog/litellm-rust-launch](https://docs.litellm.ai/blog/litellm-rust-launch)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-10-10**

---

### **1. Today's Highlights**  
The Unsloth team continues to prioritize stability and cross-platform compatibility, with a strong focus on AMD, Intel, and Jetson hardware support. Key PRs address critical issues in model loading (e.g., Qwen3-VL GGUF crashes), GPU selection logic (especially on APU+discrete setups), and security hardening of API endpoints. Notably, multiple fixes are targeted at preventing infinite re-indexing loops and improving document parsing fidelity across formats.

---

### **2. Releases & Breaking Changes**  
None. No new releases were published in the last 24 hours. The project remains stable but faces ongoing challenges with version alignment between PyPI and GitHub tags (see [#2368](https://github.com/unslothai/unsloth/issues/2368)).

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen-Image-2.1-Turbo**: Added support via PR [#13159](https://github.com/unslothai/unsloth/pull/13159) with dedicated 8-step sampling schedule.  
- ✅ **Intel Arc / Data Center GPUs**: Installer now automatically detects and installs XPU PyTorch when no other GPU is present ([#13193](https://github.com/unslothai/unsloth/pull/13193)).  
- ✅ **AMD ROCm + APU Hybrid Systems**: PR [#13196](https://github.com/unslothai/unsloth/pull/13196) ensures discrete GPUs are preferred over APUs during automatic selection.  
- ✅ **Jetson Orin Compatibility**: PR [#13191](https://github.com/unslothai/unsloth/pull/13191) preserves JetPack’s CUDA runtime precedence over pip-installed versions to prevent server crashes.  

---

### **4. Performance & Optimization**  
- 🚀 **Kernel-Level Improvements**: PR [#13121](https://github.com/unslothai/unsloth/pull/13121) casts `tl.program_id` to `int64` in RoPE, RMSNorm, and LayerNorm kernels — resolving overflow risks beyond 2³¹ elements (tested with ~5.5 GiB free VRAM).  
- 🔧 **Embedding Learning Rate Fix**: PR [#13171](https://github.com/unslothai/unsloth/pull/13171) enables `embedding_learning_rate` to apply during full fine-tuning, previously silently ignored.  
- ⏱️ **Latency Reduction**: Ongoing work on reducing prompt processing time (see issue #5756) suggests potential for configurable timeouts to avoid performance degradation due to partial CPU/GPU offloading.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Notes |
|------|----------|--------|-------|
| [#9792](https://github.com/unslothai/unsloth/issues/9792) | Critical | Closed | Qwen3.8-27B V3 GGUF crashes on AMD R9700 after prefill; rollback to V2 fixes it. |
| [#7449](https://github.com/unslothai/unsloth/issues/7449) | High | Closed | Unsloth Studio uses system RAM instead of VRAM on Strix Halo (Windows); GPU compute visible but VRAM unused. |
| [#13145](https://github.com/unslothai/unsloth/pull/13145) | High | Open | Infinite retry loop on failed file indexing in linked folders — no exit path. |
| [#13188](https://github.com/unslothai/unsloth/pull/13188) | Medium | Open | Blank image output from Qwen-Image-2.1 on Apple Silicon at 2048x2048; fails loudly on NaN inputs. |
| [#13192](https://github.com/unslothai/unsloth/pull/13192) | Security | Open | Unbounded request body handling in `/api` routes; now capped before auth. |

> *Note: Several regressions involve model-specific crashes or memory misbehavior under high load (e.g., GRPO on 183GB B200 — #3411).*

---

### **6. What This Means for Application Developers**  
- **Avoid unstable model variants**: Do not use Qwen3.8-27B V3 GGUF on AMD systems until patched. Prefer V2 or non-GGUF formats.  
- **Hardware-aware deployment**: On hybrid APU/discrete GPU systems (e.g., Strix Halo), explicitly set `GPU_ID` or use manual selection to avoid APU overuse.  
- **Secure API design**: Ensure all `/api` write endpoints cap input size and sanitize logs — PRs like [#13192](https://github.com/unslothai/unsloth/pull/13192) provide templates.  
- **Document parsing robustness**: Use latest Studio builds to ensure tables (`<table>`, `<tr>`, `<td>`), exponents (`²`, `×10⁵`), and multi-article web content are preserved (PRs [#13183](https://github.com/unslothai/unsloth/pull/13183), [#13178](https://github.com/unslothai/unsloth/pull/13178)).  
- **Fine-tuning caution**: Be aware of VRAM inflation in QLoRA training (issue #4504) — actual usage may exceed advertised estimates. Monitor per-iteration time spikes (issue #3943).

> ✅ **Best Practice**: Always test inference and training workflows on target hardware early — especially on non-NVIDIA platforms (AMD, Intel, Jetson). Use `UNSLOTH_TORCH_INDEX_FAMILY=xpu` or similar flags where needed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*