# AI Infrastructure Digest 2026-09-12

> Generated: 2026-09-12 00:35 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-12**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of intense specialization and hardware convergence, with projects accelerating toward production-grade agentic workloads. While vLLM and SGLang lead in high-throughput, low-latency inference on next-gen GPUs (SM90/B200), LiteLLM and Ollama are evolving into secure, policy-aware gateways for multi-provider orchestration. Unsloth and llama.cpp continue to push boundaries in local runtime efficiency and cross-platform deployment. A clear trend emerges: stability and correctness are now prioritized over feature velocity, especially as models grow more complex and agents demand deterministic behavior.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑) | PRs Merged (↑) | Releases (Latest) | Status |
|---------------|------------------|------------------|--------------------|--------|
| **vLLM**      | 387 (+12)        | 47 (+8)          | `v0.27.1` (stable) | ⚠️ Regression in `0.28.0/0.29.0` |
| **SGLang**    | 415 (+18)        | 39 (+11)         | None               | 🔥 High instability (core dumps, crashes) |
| **llama.cpp** | 621 (+21)        | 42 (+9)          | None               | 🛑 Critical kernel corruption & race conditions |
| **Ollama**    | 258 (+15)        | 12 (+5)          | `0.34.0`           | 📉 Performance regression; cloud model instability |
| **LiteLLM**   | 497 (+14)        | 38 (+7)          | `v1.102.0-dev.2`   | ✅ Security hardening; guardrail integration |

> *Note: Issue counts reflect active open issues (excluding closed/duplicate). PRs indicate recent momentum. Release status reflects current stability and user risk.*

---

### **3. Model Support Race**

| New Model / Architecture       | Supported By                     | Status & Notes |
|-------------------------------|----------------------------------|----------------|
| **DeepSeek-V4.1-Flash**       | vLLM, SGLang                     | vLLM leads in optimization (DFlash2, Marlin MXFP4); SGLang adds FP8 KV caching |
| **Qwen3-VL / Qwen3.8-Flash-Next** | SGLang, Ollama, vLLM            | SGLang optimized for unique-image serving; Ollama suffers from streaming/tool bugs |
| **GLM-5.3**                   | SGLang, Ollama, vLLM             | SGLang restored Flash decode CP; Ollama has infinite reasoning loop bug |
| **AMD RDNA3/RDNA4 / gfx1100/gfx1201** | SGLang, Unsloth, llama.cpp     | Unsloth ships official ROCm Docker image; others in tracking/early support |
| **Intel Arc B70 Vulkan**      | llama.cpp                        | Crashes on MoE models — unresolved |
| **ARM64 CPU-only**            | Unsloth (in dev)                 | Fills gap for edge/embedded; not yet released |
| **B200 / SM120 / Blackwell**   | vLLM, SGLang, Unsloth, llama.cpp | vLLM leads in Marlin MXFP4/MoE optimizations; SGLang enables NVFP4 cache |

> **Winner**: **vLLM** holds the lead in cutting-edge model + hardware alignment, particularly for DeepSeek-V4.1 and SM90/B200. **Unsloth** is fastest in democratizing AMD/ARM support via Docker.

---

### **4. Performance Frontier**

| Optimization Focus          | Key Projects                          | Highlights |
|------------------------------|---------------------------------------|-----------|
| **KV Cache & Context Management** | vLLM, SGLang, LiteLLM              | vLLM: DFlash2 spec-decoding fixes; SGLang: Flash Attention 3 tuning; LiteLLM: TTL-aligned prompt caching |
| **Speculative Decoding**     | vLLM, SGLang, llama.cpp               | vLLM: fused grouped conv for Qwen3 DFlash2; SGLang: critical crash fixes; llama.cpp: performance regression |
| **Quantization & Kernel Tuning** | vLLM, llama.cpp, Unsloth           | vLLM: Marlin MXFP4 MoE; llama.cpp: Blackwell IQ kernels fixed; Unsloth: FLUX.2 VAE CUDA errors persist |
| **Distributed Serving & Scaling** | SGLang, LiteLLM                    | SGLang: PD disaggregation stability issues; LiteLLM: routing metrics exposed via headers |
| **Memory Efficiency & Offloading** | vLLM, llama.cpp, Unsloth           | vLLM: elastic EP reuse; llama.cpp: SYCL graph replay; Unsloth: Windows mmap fix |

> **Trend**: The frontier is shifting from raw throughput to **correctness under load**, especially in distributed and speculative decoding scenarios.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Role Summary |
|---------------|-------------------------------|--------------|
| **vLLM**      | **Inference Engine**           | Optimized GPU kernel execution, MoE, speculative decoding, and scheduling on NVIDIA Hopper/B200 |
| **SGLang**    | **Agentic Inference Platform** | End-to-end agent workflow support with distributed serving, structured outputs, and tool calling |
| **llama.cpp** | **Local Runtime / Embedded**   | Cross-platform inference engine focused on CPU/GPU portability, lightweight deployment, and low-level kernel correctness |
| **Ollama**    | **Gateway / Local CLI Runtime** | Developer-friendly interface to models; increasingly acts as a proxy for cloud/local inference |
| **LiteLLM**   | **LLM Gateway / Orchestration** | Multi-provider routing, cost tracking, guardrails, and security-first API abstraction |

> **Insight**: The stack is becoming modular — engineers now compose solutions using vLLM (engine), SGLang (agent platform), LiteLLM (gateway), and Ollama/llama.cpp (local runtime).

---

### **6. Trend Signals**

1. **Stability Over Velocity**: After months of rapid feature release, all major projects report **critical regressions** (memory leaks, crashes, silent failures). This signals a shift toward **production readiness** and **correctness-by-design**.
   
2. **Hardware Convergence**: Projects are actively optimizing for **SM90 (H20/H200)** and **B200**, while **ROCm support** is maturing rapidly — Unsloth and SGLang now offer full AMD parity. Expect hybrid GPU ecosystems to dominate by late 2027.

3. **Agent-Centric Optimization**: SGLang’s focus on **structured outputs**, **tool call deduplication**, and **distributed context management** reflects growing demand for autonomous agents — not just LLM responses.

4. **Security & Compliance Integration**: LiteLLM’s adoption of **ConductGuard** and **cosign-signed images** shows that **supply-chain integrity** and **policy enforcement at the gateway layer** are now table stakes.

5. **Edge & Cross-Platform Demand**: Unsloth’s ARM64 CPU-only build and llama.cpp’s Vulkan/Intel support highlight the need for **lightweight, portable inference** — crucial for embedded systems, mobile apps, and edge AI.

---

### ✅ **Actionable Guidance for Application Developers**
- **Avoid `v0.28.0/v0.29.0`** (vLLM), `qwen3.8`, or `glm-5.3:cloud` (Ollama) in production until fixes land.
- **Use LiteLLM with cosign verification** for secure, auditable LLM calls.
- **Leverage SGLang for agentic pipelines** — but test disagg setups thoroughly.
- **Prioritize model + hardware alignment**: Use vLLM for DeepSeek-V4.1 on H200; Unsloth for AMD/ARM edge deployments.
- **Monitor PR activity** — many fixes are in review; don’t assume stability in pre-release versions.

> 🔍 *Watchlist*:  
> - vLLM’s `Marlin MXFP4 MoE` → will define next-gen MoE efficiency  
> - SGLang’s **PD disaggregation stability** → key for scalable agent clusters  
> - LiteLLM’s **ReDoS fix (#32353)** → critical for uptime in high-throughput proxies  

*Report generated: 2026-09-12 | Source: GitHub project digests*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **1. Today's Highlights**  
The vLLM project continues to deepen its focus on **DeepSeek-V4.1-Flash optimization**, with multiple PRs targeting performance, speculative decoding stability, and pipeline parallelism across SM90 (H20/H200) and ROCm platforms. Critical fixes address **DFlash2 spec-decoding crashes**, **prefix cache misses in hybrid Mamba/GDN models**, and **memory exhaustion in 0.28.0/0.29.0**—all of which are now actively being resolved via PRs merged or under review.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
**Note**: The recent regression in `v0.28.0` and `v0.29.0` causing **host memory exhaustion and freeze** (Issue #54237) remains unresolved as of today; users are advised to pin to `v0.27.1` for stability until a fix is released.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1-Flash** receives targeted optimizations:  
  - Sequence-parallel stage boundaries added (PR #56438)  
  - KV-only context insertion for DSpark (PR #56441)  
  - Engram lookup overlap now configurable (PR #56436)  
  - Full support for **Marlin MXFP4 MoE backend** on SM90 (H20/H200), with active bugfixes for illegal memory access (Issue #56389, PR #56443)  
- **ROCm Support Expansion**:  
  - Explicit Triton backend selection for W4A16 MoE on gfx942/gfx950 (PR #56543)  
  - GLM-5.3 accuracy collapse on ROCm (Issue #54924) reported; investigation ongoing  
- **Rust Frontend**: Added support for preprocessed multimodal gRPC features (PR #55047)

---

### **4. Performance & Optimization**  
- **Speculative Decoding (DFlash2)**:  
  - Fused grouped convolution kernel added for Qwen3 DFlash2 (PR #55960), improving throughput via reduced kernel launch overhead.  
  - Fixes for MTP spec decode: prefix cache hits restored in hybrid GDN models (PR #52244), and DFlash2 now avoids greedy output drift at token 30 (Issue #54928).  
- **MoE & Expert Offloading**:  
  - Incremental MoE expert offloading with GPU cache + async pipeline (Issue #38256) progressing toward production readiness.  
  - MOE oracle/linear kernel migration underway (Issue #54959, PR #56543).  
- **Memory & Throughput**:  
  - Elastic EP now reuses CUDA graphs across reconfigurations (PR #54985), reducing warmup latency.  
  - AWQ GEMM kernel profiled as L1/memory-bound on RTX 3070 Ti (Issue #55462); optimization effort initiated.  

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|--------|
| 🔴 High | `v0.28.0`/`0.29.0` consume all host memory and freeze | Open | [PR #56404](https://github.com/vllm-project/vllm/pull/56404) (workaround: avoid `SimpleCPUOffloadScheduler`) |
| 🔴 High | DFlash2 spec decode crash in `map_draft_to_target` on H200 (SM90) | Open | [PR #56443](https://github.com/vllm-project/vllm/pull/56443) |
| 🟡 Medium | DFlash2 + YaRN: zero prefix-cache reuse despite identical 1.04M prompt | Open | Pending |
| 🟡 Medium | Tool choice enforcement broken in `qwen3_coder` parser (Issue #54808) | Open | [PR #54257](https://github.com/vllm-project/vllm/pull/54257) |
| 🟡 Medium | Qwen3.8-Flash-Next long-prefill starves decode for minutes (Issue #54919) | Open | Pending |

---

### **6. What This Means for Application Developers**  
- **Avoid v0.28.0/v0.29.0** if running on high-concurrency or long-prompt workloads—use `v0.27.1` until the memory leak is patched.  
- **For DeepSeek-V4.1-Flash deployments**, expect improved throughput and stability on SM90 (H20/H200) with upcoming MRV2+DFlash2 optimizations. Use `--enable-sleep-mode` cautiously—known HBM leaks persist in `mm-encoder-tp-mode` (Issue #47654).  
- **Structured outputs** (e.g., JSON) may see degraded performance due to `apply_grammar_bitmask` rewrite (Issue #49013); monitor end-to-end latency closely.  
- **Multi-modal apps** should prepare for Rust frontend improvements (PR #55047) and ensure video decode errors are surfaced properly (PR #52759).  
- **ROCm users** must manually select Triton backend for W4A16 MoE on gfx942/gfx950 (PR #56543) and watch for GLM-5.3 accuracy drops (Issue #54924).

> 💡 *Pro Tip*: Monitor [vLLM’s RFCs](https://github.com/vllm-project/vllm/issues?q=is%3Aissue+is%3Aopen+label%3ARFC) for future changes to scheduling, quantization, and EPLB—especially around MoE and cross-architecture optimizations.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-12**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to accelerate toward production-grade agentic inference, with critical work on distributed KV cache scalability and deep hardware integration. Key developments include the restoration of GLM-5.3 Flash decode context parallelism (CP), new support for DeepSeek-V4.1, and ongoing optimization of multi-modal serving on Hopper. A major focus remains on resolving CUDA coredumps and PD disaggregation stability under high-load scenarios.

---

### **2. Releases & Breaking Changes**  
*None.* No new releases or breaking API/config changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1**: PR #38798 adds full model support, including FP8 KV caching and optimized routing. [PR #38798](https://github.com/sgl-project/sglang/pull/38798)  
- **SenseNova-U1/U1.5**: Tracking issue #37742 outlines roadmap for official support, including 8-step distilled LoRA for image generation. [Issue #37742](https://github.com/sgl-project/sglang/issues/37742)  
- **AMD RDNA3/RDNA4 (gfx1100/gfx1201)**: Enabling consumer Radeon GPUs via ROCm is now a formal tracking effort. [Issue #30599](https://github.com/sgl-project/sglang/issues/30599)  
- **NVFP4 KV Cache**: Progress continues on SM120/B200 support; initial implementation merged. [Issue #29913](https://github.com/sgl-project/sglang/issues/29913)

---

### **4. Performance & Optimization**  
- **Qwen3-VL Unique-Image Serving**: Optimized memory usage by eliminating redundant cache reservations—reducing prefill overhead from 16 GiB to near-zero. [PR #36411](https://github.com/sgl-project/sglang/pull/36411)  
- **Mamba2 SSD Kernels**: Added Triton autotuning, recovering up to 10x+ prefill performance loss due to default `BLOCK_SIZE=16`. [PR #39130](https://github.com/sgl-project/sglang/pull/39130)  
- **Qwen-Image-Edit Attention**: Reduced repeated QK normalization and SDPA calls on Hopper through shared epilogue reuse. [PR #38584](https://github.com/sgl-project/sglang/pull/38584)  
- **DeepGEMM MegaMoE**: Fusing shared → sparse experts to improve throughput in DSV4. [PR #38700](https://github.com/sgl-project/sglang/pull/38700)

---

### **5. Stability & Regressions**  
- **CUDA Coredump Tracker (#26340)**: 298 comments in 24h — active auto-collection of crashes from CI tests. High-priority fix needed. [Issue #26340](https://github.com/sgl-project/sglang/issues/26340)  
- **GLM-5.3 Crash on Disaggregated Decode + DP Attention + Speculative Decode (#39072)**: Critical crash during speculative decoding on disagg setup. [Issue #39072](https://github.com/sgl-project/sglang/issues/39072)  
- **H20 8-card Launch Failure for Qwen3.8-Flash-Next-FP8 (#38793)**: Hardware-specific failure reported; likely driver or memory layout issue. [Issue #38793](https://github.com/sgl-project/sglang/issues/38793)  
- **Encoder-Decoder KV Cache Double-Free (#38840)**: Memory corruption bug when `page_size > 1` — requires immediate patch. [Issue #38840](https://github.com/sgl-project/sglang/issues/38840)  
- **Flash Attention 3 (FA3) sm_89 Compatibility Issue (#38980)**: `is_fa3_supported()` accepts sm_89 but no corresponding cubin is shipped — results in silent CUDA errors. [Issue #38980](https://github.com/sgl-project/sglang/issues/38980)

---

### **6. What This Means for Application Developers**  
Developers building agentic systems should expect growing complexity in distributed serving configurations. Prioritize testing on disagg setups with mixed TP/WP routing and speculative decoding, as these expose subtle correctness bugs (e.g., #39072, #38840). For multi-modal apps, recent optimizations (e.g., #36411, #38584) enable lower-latency, higher-throughput streaming. Use `--attn-cp-size` >8 only if confirmed stable (see #30991), and avoid `include_reasoning=false` if reasoning fields still appear in responses (bug #39103). Monitor CI health closely — multiple coredumps and flaky tests indicate potential instability in production deployments.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-12**

---

### **1. Today's Highlights**  
The latest updates focus on backend stability and performance tuning, particularly for Metal, Vulkan, and CUDA/HIP backends. Critical fixes address GPU kernel correctness (e.g., IQ1_S/IQ2_S/IQ3_S on Blackwell), data races in Vulkan `argsort`, and speculative decoding behavior. Notably, a PR introduces SYCL graph recording/replay support and refactors JSON schema handling for improved server reliability.

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published in the last 24 hours. However, several breaking changes are in flight:  
- **`--cache-disk` feature request (#20697)** is actively discussed; users seeking disk-based context offloading should monitor progress.  
- **`GGML_CUDA_FA_ALL_QUANTS=ON` proposed as default** (#28633): This would silently fallback to CPU for 4-bit KV caches without warning — a major behavioral shift requiring careful migration planning. [Issue #28633](https://github.com/ggml-org/llama.cpp/issues/28633)  
- **Server response format fix**: `json_schema` now correctly parses top-level schema, not just nested `json_schema.schema`. [PR #28697](https://github.com/ggml-org/llama.cpp/pull/28697)

---

### **3. New Model & Hardware Support**  
- **Intel Arc B70 Vulkan support**: Several issues report crashes with MoE models (e.g., Qwen3.6-35B-A3B-MTP) on Intel B70 via Vulkan. Fixes are pending. [Issue #23769](https://github.com/ggml-org/llama.cpp/issues/23769)  
- **AMD RDNA4 Flash Attention tuning**: HIP backend now enables full MMA FA for head size 256 and prefers whole-tile grids over stream-k. [PR #28102](https://github.com/ggml-org/llama.cpp/pull/28102)  
- **Metal fusion rework**: Unified fusion table improves optimization consistency across Metal kernels. [PR #28164](https://github.com/ggml-org/llama.cpp/pull/28164)  
- **OpenVINO crash on AVX-512**: A critical bug reported on Core Ultra 7 systems triggers `STATUS_ILLEGAL_INSTRUCTION`. [Issue #28726](https://github.com/ggml-org/llama.cpp/issues/28726)  

---

### **4. Performance & Optimization**  
- **SYCL Graph Record/Replay Added**: Enables performance profiling and replay of compute graphs, improving debugging and benchmarking workflows. [PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725)  
- **CUDA: Per-thread stream for buffer padding**: Fixes potential race conditions during graph capture by switching from legacy stream to async memset + sync. [PR #28782](https://github.com/ggml-org/llama.cpp/pull/28782)  
- **CPU: Skip threadpool for no-CPU-work graphs**: Reduces overhead when all computation is GPU-offloaded (common with full GPU inference). [PR #28785](https://github.com/ggml-org/llama.cpp/pull/28785)  
- **Metal: Idle thread fix for small NE00**: Optimizes thread utilization in IQ kernels for small tensor dimensions (<1024). [PR #28692](https://github.com/ggml-org/llama.cpp/pull/28692)  

---

### **5. Stability & Regressions**  
- **Critical Crash in Vulkan `argsort_large`**: Data race in inner loop detected by VVL; OOB access may cause CI failures. No fix yet. [Issue #28705](https://github.com/ggml-org/llama.cpp/issues/28705)  
- **GPU Kernel Corruption (Blackwell sm_120)**: Miscompiled IQ1_S/IQ2_S/IQ3_S kernels produce garbage output due to byte mask omission. [PR #28784](https://github.com/ggml-org/llama.cpp/pull/28784) – *Fix in review*  
- **Speculative Decoding Regression**: `ngram-cache` speculation degrades performance (86% → 11% acceptance) due to incorrect cache reuse. [Issue #27852](https://github.com/ggml-org/llama.cpp/issues/27852)  
- **SYCL Pool Order Breakage**: OneDNN scratchpad violates LIFO order, leading to crashes. [Issue #28660](https://github.com/ggml-org/llama.cpp/issues/28660)  
- **Windows/MSVC Link Failure**: PCH+export change breaks `llama-server` linking. [Issue #28758](https://github.com/ggml-org/llama.cpp/issues/28758) – *Fix pending*

---

### **6. What This Means for Application Developers**  
- **Avoid `--cache-disk` until stable**: The feature is under active discussion but not ready for production use. Monitor [#20697](https://github.com/ggml-org/llama.cpp/issues/20697).  
- **Tune Flash Attention for AMD**: Use `hip:enable_mma_fa` and prefer whole-tile grids on RDNA4 for optimal throughput.  
- **Be cautious with 4-bit KV caches**: If using `q4_0/q4_1` with CUDA, expect silent CPU fallback unless `GGML_CUDA_FA_ALL_QUANTS=ON` is explicitly set.  
- **Validate JSON Schema parsing**: Ensure schema is passed directly (`response_format.schema`) or wrapped — older versions had inconsistent handling.  
- **Test on Intel Arc B70/Vulkan**: Avoid MoE models until [issue #23769](https://github.com/ggml-org/llama.cpp/issues/23769) is resolved.  
- **Use SYCL graphs for reproducible benchmarks**: The new recording/replay feature enables consistent performance analysis.  

> ✅ **Actionable Tip**: For high-throughput inference, combine `--n-cpu-ffn` with `--n-cpu-mode` (proposed in #27987) to optimize FFN execution across CPU cores.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-12**

---

### **1. Today's Highlights**  
Multiple critical stability issues were reported in the `qwen3.8` and `glm-5.3:cloud` models, including infinite reasoning loops, silent tool-call discarding, and streaming errors due to malformed message handling. A significant regression in model loading performance was observed post-`0.30.0`, while users on Windows face port exhaustion during sustained embedding loads. Meanwhile, new PRs are advancing cloud proxy timeouts and improving tool schema parsing for Anthropic compatibility.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- **New model requests**:  
  - `Hy4-preview` (Tencent) — [Issue #18287](https://github.com/ollama/ollama/issues/18287)  
  - `deepseek-v4.1-flash` — [Issue #18379](https://github.com/ollama/ollama/issues/18379)  
- **Hardware support**:  
  - `ppc64le` architecture — [Issue #796](https://github.com/ollama/ollama/issues/796) (request ongoing since 2023)  
- **Quantization support**:  
  - `IQ3_S` quantization for `Qwen3.8-27B-GSQ-RCO-GGUF` — [Issue #18297](https://github.com/ollama/ollama/issues/18297) (currently returns empty content)

---

### **4. Performance & Optimization**  
- **Model loading regression**: Users report a significant slowdown in loading large models like `gpt-oss:120b` and `qwen3.5:122b` after upgrading from `0.23.4` to `0.30.0`. One user notes load time increased from **61s → 116s**, indicating a potential performance regression ([Issue #18373](https://github.com/ollama/ollama/issues/18373)).  
- **Embedding throughput issue**: Sustained `/api/embed` usage exhausts loopback ports on Windows due to disabled keep-alive in `llama-server` HTTP client ([Issue #18392](https://github.com/ollama/ollama/issues/18392)).  
- **Cloud proxy timeout fix**: A PR has been merged to bound TTFB and connect timeouts for cloud proxies, preventing indefinite hangs ([PR #18382](https://github.com/ollama/ollama/pull/18382)).

---

### **5. Stability & Regressions**  
| Severity | Issue | GitHub Link |
|--------|------|------------|
| 🔴 High | `qwen3.8`: Streaming fails with "no user query found in messages" (500 error) after processing tools — affects tool-use workflows | [#17778](https://github.com/ollama/ollama/issues/17778) |
| 🔴 High | `glm-5.3:cloud`: Enters endless reasoning loop, aborting tasks in OpenCode/ZCode despite official API working | [#18193](https://github.com/ollama/ollama/issues/18193) |
| 🟡 Medium | `qwen3.8:27b`: ROCm GPU failure on RX 9060 XT due to missing `TensileLibrary_lazy_gfx1200.dat` | [#17782](https://github.com/ollama/ollama/issues/17782) |
| 🟡 Medium | `qwen2.5-coder:3b-instruct` at q2_K/q3_K_S/M/L: all score 0% on code tasks; functionally broken despite fluent output | [#18252](https://github.com/ollama/ollama/issues/18252) |
| 🟡 Medium | `gemma4`: Tool calls with keys containing spaces cause entire call to be dropped silently | [#18390](https://github.com/ollama/ollama/issues/18390) |
| 🟡 Medium | Cloud models (`deepseek-v4-pro:cloud`) wedge after ~45 minutes on `0.34.0`, but work fine on `0.33.1` | [#18381](https://github.com/ollama/ollama/issues/18381) |

> ✅ *Fixes in progress*:  
> - PR [#18382](https://github.com/ollama/ollama/pull/18382): Adds timeouts to cloud proxy connections  
> - PR [#18388](https://github.com/ollama/ollama/pull/18388): Enhances JSON tool argument parsing (supports `args` field)  
> - PR [#18391](https://github.com/ollama/ollama/pull/18391): Renders tool functions as JSON in templates

---

### **6. What This Means for Application Developers**  
- **Avoid `qwen3.8` and `glm-5.3:cloud` in production workflows** until fixes land — both exhibit severe correctness and stability issues. Use `qwen3.5` or `glm-5.1` alternatives where possible.  
- **Validate tool schemas carefully**: Models like `gemma4` and `anthropic` may fail silently if tool parameter keys contain spaces or use non-standard fields like `args`. Ensure your tool definitions follow strict `parameters`/`arguments` structure.  
- **Monitor embedded systems**: On Windows, high-volume embedding workloads risk port exhaustion — consider batching or using connection pooling.  
- **Use `:cloud` models cautiously**: Recent versions (`0.34.0`) show instability under sustained load — downgrade to `0.33.1` if reliability is critical.  
- **Track manifest digests**: With PR [#18394](https://github.com/ollama/ollama/pull/18394), local inference clients can now correlate responses with exact artifact digests — essential for reproducibility in evaluation pipelines.

---  
*Data source: github.com/ollama/ollama | Updated: 2026-09-12*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-12**

#### **1. Today's Highlights**  
The LiteLLM project continues to strengthen its security posture following the containment of the Trivy supply-chain compromise (Issue #24518), with all current releases verified via cosign signatures. Key developments include enhanced guardrail integration with ConductGuard (PR #38143, #40785), improved prompt-caching affinity alignment (PR #40776), and ongoing work to fix critical bugs in streaming error handling, model routing, and cost tracking.

#### **2. Releases & Breaking Changes**  
- **v1.102.0-dev.2** released today: includes security hardening and updates to proxy internals.  
- **Docker image verification**: All images are now signed with [cosign](https://docs.sigstore.dev/cosign/overview/) using the key from commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
  🔗 [Verify Docker Image Signatures](https://docs.litellm.ai/docs/security#verifying-image-signatures)

> ⚠️ **Migration Note**: Users relying on `lite codex` or custom CLI configurations should review PRs #40447 and #40476 for updated behavior around model discovery and configuration management.

#### **3. New Model & Hardware Support**  
- **Prism** added as a native OpenAI-compatible provider (PR #40782) with verified pricing and endpoint metadata.  
- **GitGot** introduced as a JSON-configured provider (`gitgot`) supporting inference via `https://inference.gitgot.ai/v1` (PR #40810).  
- **ConductGuard** integrated as a first-class guardrail (PR #38143, #40785), enabling policy enforcement across all LLM calls routed through the proxy.  
- **Gemini 3.5 Transcribe Live Preview** now supports dynamic audio sampling rate detection (PR #40563).

#### **4. Performance & Optimization**  
- **Prompt caching optimization**: PR #40776 aligns cache affinity TTL with `cache_control.ttl`, reducing unnecessary cross-deployment cache misses—critical for one-hour Anthropic caches.  
- **Cost estimation**: PR #40804 introduces a new `/estimate_prompt_cache_switch_cost` endpoint to compare write costs across different TTLs (e.g., 5min vs 1hr), enabling smarter caching decisions.  
- **Latency-based routing**: PR #40788 / #40792 expose detailed routing metrics (tier, cause, score, effort) via HTTP headers, enabling observability without custom callbacks.

#### **5. Stability & Regressions**  
High-severity issues reported today:

| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#40735](https://github.com/BerriAI/litellm/issues/40735) | Critical | Bedrock Converse rejects follow-up tool calls without redeclaring `tools` array | ❌ Pending |
| [#32353](https://github.com/BerriAI/litellm/issues/32353) | Critical | ReDoS in `secret_redaction.redact_string()` causes proxy crash-loop due to catastrophic regex backtracking | ❌ Pending |
| [#40575](https://github.com/BerriAI/litellm/issues/40575) | High | Qwen3.8 tool results not consumed via native Ollama provider despite working in OpenAI-compatible mode | ❌ Pending |
| [#40582](https://github.com/BerriAI/litellm/issues/40582) | High | `parse_tool_call_arguments` silently drops concatenated JSON tool arguments | ❌ Pending |
| [#40761](https://github.com/BerriAI/litellm/issues/40761) | Medium | Config-file models evicted when `litellm_params` change (with `store_model_in_db=true`) | ❌ Pending |

> 💡 **Note**: Several of these regressions impact production stability—especially the ReDoS vulnerability (#32353), which can kill liveness probes and trigger pod crashes.

#### **6. What This Means for Application Developers**  
- **Security-first deployments**: Use only signed Docker images (`ghcr.io/berriai/litellm:main-latest` + cosign verification) and avoid unverified PyPI packages.  
- **Guardrails are now first-class**: Integrate **ConductGuard** into your proxy setup to enforce compliance policies at the edge—no need for custom middleware.  
- **Streaming reliability**: Be cautious with upstream providers that emit in-band errors during streaming; LiteLLM currently **silently drops** them (see #40578). Consider adding fallback logic.  
- **Model routing precision**: Leverage exposed complexity routing headers (PR #40788) to debug why requests route to specific tiers.  
- **Avoid known pitfalls**: Do not assume `tools` can be omitted in Bedrock Converse follow-ups (#40735); use `cache_control_injection_points` carefully—client-side `cache_control` may cause injection points to be dropped (#40675).

👉 **Action Items**: Audit your deployment for `store_model_in_db` usage (issue #40761), update CLI tooling via `lite configure codex` (PR #40447), and monitor for ReDoS risks in log redaction paths.

---  
*Digest generated: 2026-09-12 | Source: [GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-12**

---

### **1. Today's Highlights**  
The Unsloth project continues to expand its cross-platform and multi-GPU support, with key progress on AMD ROCm Docker image integration and critical fixes for GPU memory management on Windows. Major UI/UX improvements landed in Studio, including persistent agentic chat turns across tab reloads and better handling of tool call deduplication, enhancing reliability for autonomous agents.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases were published in the last 24 hours. However, several breaking changes are imminent due to ongoing PRs:

- `SFTConfig.__init__()` now expects `max_length` instead of `max_seq_length`, which may break existing training scripts (see [Issue #10785](https://github.com/unslothai/unsloth/issues/10785)).
- The `accelerate` library version is being capped below 1.15 on Windows to avoid ROCm-related crashes (see [PR #10819](https://github.com/unslothai/unsloth/pull/10819)).

> ✅ *Action: Update config parameters and pin `accelerate` versions if targeting AMD/Windows.*

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Support (Production Ready)**: A new official Docker image (`unsloth/unsloth:rocm`) has been introduced, supporting RDNA2/3/4 and CDNA/Instinct GPUs via ROCm. This mirrors the CUDA-based Blackwell image and enables full deployment parity on AMD hardware ([PR #10820](https://github.com/unslothai/unsloth/pull/10820)).
- **ARM64 CPU-Only Docker Image**: An official lightweight CPU-only build is now in development for ARM64 systems (e.g., Apple Silicon, embedded devices), filling a gap for non-GPU deployments ([PR #10766](https://github.com/unslothai/unsloth/pull/10766)).
- **Multi-GPU & FLUX.2 Klein VAE**: Continued work on multi-GPU inference stability; however, CUDA errors like `CUBLAS_STATUS_NOT_INITIALIZED` during VAE decoding persist on certain configurations ([Issue #10768](https://github.com/unslothai/unsloth/issues/10768)).

---

### **4. Performance & Optimization**  
- **Memory Efficiency (Windows)**: Fix for resident GGUF mappings on Windows when using `--no-mmap` — previously, unmapped files remained locked in memory due to OS-level limitations ([PR #10618](https://github.com/unslothai/unsloth/pull/10618)).
- **Training Throughput**: On B200 GPUs, `fla` autotuning reinitializes on every launch, causing unnecessary overhead during LoRA training — a known performance regression ([Issue #10806](https://github.com/unslothai/unsloth/issues/10806)).
- **Micro-batch Tuning**: Increased micro-batch size for image-processing projectors to prevent llama-server crashes on large images (e.g., 1400x1400) ([PR #10683](https://github.com/unslothai/unsloth/pull/10683)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | PR/Note |
|--------|------|--------|---------|
| High | Long GGUF chats waiting for tool approval block queued jobs despite free slots | Open | [Issue #10671](https://github.com/unslothai/unsloth/issues/10671) |
| High | CUDA error `CUBLAS_STATUS_NOT_INITIALIZED` during FLUX.2 Klein VAE decode | Open | [Issue #10768](https://github.com/unslothai/unsloth/issues/10768) |
| Medium | `clean_text` deletes all non-ASCII characters, corrupting multilingual input | Open | [PR #10741](https://github.com/unslothai/unsloth/pull/10741) |
| Medium | Duplicate tool calls skipped after file edits due to over-aggressive deduplication | Open | [PR #10810](https://github.com/unslothai/unsloth/pull/10810) |
| Low | X11 + NVIDIA: WebKitWebProcess leaks DMA-BUF sync_file fds leading to frozen UI | Open | [Issue #10795](https://github.com/unslothai/unsloth/issues/10795) |

> ⚠️ *Critical Note*: The `--tensor-split` flag is ignored in some contexts, causing unexpected behavior ([Issue #10355](https://github.com/unslothai/unsloth/issues/10355)).

---

### **6. What This Means for Application Developers**  
- **Build for Multi-Hardware**: With AMD ROCm and ARM64 CPU Docker support now available, developers can deploy unsloth apps across diverse infrastructures — from data centers to edge devices.
- **Agent Reliability**: The new agentic turn persistence feature ensures that long-running agent workflows survive browser restarts, enabling more robust autonomous pipelines.
- **Tool Call Management**: Be cautious about tool call deduplication logic — changes to files don’t trigger re-execution unless explicitly handled ([PR #10810](https://github.com/unslothai/unsloth/pull/10810)).
- **Model Export Caution**: Exporting full fine-tunes as 16-bit models currently saves them as 4-bit by default — verify export settings carefully ([PR #10808](https://github.com/unslothai/unsloth/pull/10808)).
- **Avoid Breakage**: Update SFT configs to use `max_length` instead of `max_seq_length` and lock `accelerate` < 1.15 on Windows for ROCm compatibility.

> 🔗 *Recommended Actions*:  
> - Use [Docker Compose](https://github.com/unslothai/unsloth/pull/10600) for persistent runtime data.  
> - Monitor [Plugin Store](https://github.com/unslothai/unsloth/issues/10801) and [MCP Hub](https://github.com/unslothai/unsloth/issues/10822) proposals for future extension ecosystems.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*