# AI Infrastructure Digest 2026-09-18

> Generated: 2026-09-18 00:45 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-18**

---

### **1. Ecosystem Overview**

The AI infrastructure landscape in Q3 2026 is defined by a sharp bifurcation between **high-performance inference engines** and **application-layer orchestration platforms**, with growing convergence at the edge of model serving, fine-tuning, and agent execution. NVIDIA’s Blackwell (SM120) and AMD’s CDNA2 are now central to hardware-specific optimizations, driving deep kernel-level work across vLLM, SGLang, and llama.cpp. Meanwhile, gateways like LiteLLM and deployment frameworks like Ollama prioritize security, observability, and developer experience—reflecting enterprise-grade maturity. The rise of MoE models, multi-modality, and speculative decoding has intensified pressure on KV cache efficiency, memory safety, and deterministic output guarantees.

---

### **2. Activity Comparison**

| Project       | Issues Open (Last 24h) | PRs Merged (Last 24h) | Release Status        |
|---------------|------------------------|------------------------|------------------------|
| **vLLM**      | 7                      | 5                      | None                   |
| **SGLang**    | 12                     | 6                      | None                   |
| **llama.cpp** | 6                      | 5                      | b11028–b11017 (patch)  |
| **Ollama**    | 8                      | 4                      | None                   |
| **LiteLLM**   | 5                      | 3                      | None                   |
| **Unsloth**   | 6                      | 4                      | **v0.1.810-beta** (new) |

> 🔍 *Insight:* Unsloth leads in release velocity with a new beta, while SGLang shows the highest issue volume—indicating active but unstable development on next-gen hardware and speculative decoding paths.

---

### **3. Model Support Race**

| New Model / Architecture       | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next MTP**     | ✅   | ❌     | ✅        | ❌     | ❌      | ✅      |
| **GLM-5.3-Flash (ROCm/SM120)** | ✅   | ✅     | ✅        | ⚠️     | ❌      | ✅      |
| **LLaVA-OneVision (CUDA graphs)** | ✅   | ❌     | ❌        | ❌     | ❌      | ❌      |
| **T-Head PPU (ZW810/ZW-M890P)** | ❌   | ✅ (roadmap) | ❌      | ❌     | ❌      | ❌      |
| **SenseNova-U1/U1.5**          | ❌   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **Gemma3-4B, Nemotron 30B**   | ❌   | ❌     | ❌        | ❌     | ❌      | ✅      |

> 🏆 **Leader:** **Unsloth** is fastest to adopt emerging architectures (e.g., T-Head PPU, SenseNova), while **vLLM** leads in multi-modal and high-throughput model support (e.g., LLaVA-OneVision CUDA graphs, GLM-5.3-Flash). **llama.cpp** maintains strong cross-platform compatibility, especially for edge and Intel GPU use cases.

---

### **4. Performance Frontier**

| Optimization Focus         | vLLM                          | SGLang                         | llama.cpp                    | Ollama               | LiteLLM                 | Unsloth                  |
|----------------------------|-------------------------------|--------------------------------|------------------------------|----------------------|-------------------------|--------------------------|
| **KV Cache Efficiency**     | ✅ High (sparse MLA, FP8)     | ✅ Critical (HiCache, radix)   | ✅ Flash attention kernels   | ✅ Structured outputs| ✅ Cost tracking (Azure) | ❌ (context length bug) |
| **Speculative Decoding**    | ✅ Stable (with caveats)      | ⚠️ High risk (crashes, bugs)   | ❌ Not supported             | ✅ Fix in progress   | ✅ Guardrail guardrails | ❌ GRPO vision issues    |
| **Quantization & Kernels**  | ✅ FP32 router, MXFP8          | ✅ MXFP8, Quark quantization    | ✅ MFMA, DP4A, SYCL fixes    | ✅ Bonsai (1-bit)    | ✅ Drop `top_p` param   | ✅ FP8/INT8 diffusion    |
| **Distributed Serving**     | ✅ Async TP, sequence parallelism | ⚠️ Hierarchical cache bugs    | ❌ No distributed support    | ❌ No multi-node     | ✅ MCP tool routing     | ✅ Multi-user Docker     |
| **Edge & Heterogeneous**    | ❌ Limited                    | ✅ T-Head, AMD, WebGPU          | ✅ Vulkan, Hexagon NPU, ARM64| ✅ Vulkan ARM64      | ❌ No edge focus        | ✅ ROCm, ARM64 CUDA      |

> 🔥 **Frontier Leaders:**  
> - **vLLM**: Peak performance on SM120, sparse attention, and multi-GPU scalability.  
> - **SGLang**: Pushing boundaries in hierarchical caching and speculative correctness (despite instability).  
> - **llama.cpp**: Best-in-class cross-platform kernel optimization (Intel, AMD, Vulkan).  
> - **Unsloth**: Fastest adoption of novel hardware and quantization formats (FP8/INT8 diffusion).

---

### **5. Layer Positioning**

| Project       | Primary Layer                | Key Differentiators                                                                 |
|---------------|-------------------------------|-------------------------------------------------------------------------------------|
| **vLLM**      | **Inference Engine**          | High-throughput, low-latency serving; optimized for large-scale, production-grade LLMs on NVIDIA GPUs. |
| **SGLang**    | **Inference Engine + Gateway**| Hybrid architecture with advanced caching (HiCache), speculative decoding, and standardized events—ideal for agent pipelines. |
| **llama.cpp** | **Local Runtime / Edge Inference** | Pure C++ runtime with minimal dependencies; best for offline, resource-constrained, or heterogeneous deployments. |
| **Ollama**    | **Local Runtime + Agent Gateway** | Developer-friendly CLI; bridges local inference with agent workflows; evolving toward secure, auditable inference. |
| **LiteLLM**   | **Inference Gateway / Orchestration** | Enterprise-grade proxy with auth, cost logging, and multi-provider routing—core for regulated environments. |
| **Unsloth**   | **Training/Fine-Tuning + Local Runtime** | Full-stack solution: training (LoRA SFT), inference, and UI—all in one Docker image with multi-user support. |

> 🎯 **Strategic Insight:** The ecosystem is fragmenting into **specialized layers**:  
> - *Engine* (vLLM, SGLang) → high throughput, low latency  
> - *Runtime* (llama.cpp, Ollama) → portability, edge readiness  
> - *Gateway* (LiteLLM) → compliance, observability, cost control  
> - *Full Stack* (Unsloth) → rapid iteration, end-to-end workflow

---

### **6. Trend Signals**

#### **Emerging Trends from Today’s Activity:**
1. **Hardware-Specific Optimization is Now Mandatory**  
   — SM120 (Blackwell) and AMD RDNA2/CDNA2 are no longer "future-proof" features—they’re current requirements. Projects like vLLM and SGLang are racing to fix crashes and regressions on these chips.

2. **Speculative Decoding Is Becoming a Liability**  
   — Despite its promise, speculative decoding remains unstable across multiple projects (SGLang, Ollama, vLLM), with crashes, memory leaks, and correctness bugs. Developers should **disable it (`--nodraft`) for debugging and audit-critical workloads**.

3. **KV Cache Consistency Is a Foundational Concern**  
   — Misreporting, silent overwrites (ROCm), and incorrect hit handling (SGLang) indicate that cache integrity is now a top-tier reliability requirement—not just a performance knob.

4. **Enterprise Compliance Is Driving Design Choices**  
   — Ollama removing the default CLI agent, LiteLLM adding team-level access controls, and Unsloth enabling multi-user Docker all signal a shift toward **air-gapped, auditable, and policy-enforced AI systems**.

5. **Model & Hardware Diversity Is Accelerating**  
   — From T-Head PPUs to SenseNova-U1, to Bonsai’s 1-bit weights, developers must now consider **non-NVIDIA ecosystems** as first-class targets—not just fallbacks.

#### **What Application Developers Should Watch:**
- ✅ **Monitor PR #57458 (vLLM)** and **PR #41711 (LiteLLM)** — both critical for stability.
- ✅ **Avoid speculative decoding until fixes land** in SGLang and Ollama.
- ✅ **Use `v0.1.810-beta` (Unsloth)** and **b11028+ (llama.cpp)** for stable inference.
- ✅ **Enable `--nodraft` and `OLLAMA_METRICS=1`** for reproducibility and observability.
- ✅ **Plan for ROCm/AMD support early**—projects like vLLM and Unsloth are already ahead.

> 📌 **Final Takeaway:** The AI stack is maturing rapidly—but with increasing complexity. Choose your layer wisely: **engine for scale, gateway for control, runtime for portability, and full stack for speed**. Always validate against real-world hardware and workload patterns before production rollout.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-18**

#### **1. Today's Highlights**
The vLLM project continues to accelerate its focus on **multi-modality**, **hardware-specific optimizations for SM120 (Blackwell)**, and **speculative decoding stability**. Key work includes CUDA graph support for ViT encoders in LLaVA-OneVision and critical fixes for GLM-5.3-Flash on both NVIDIA and ROCm platforms. A major performance optimization landed for GLM’s sparse MLA attention path, reducing preparation overhead significantly.

#### **2. Releases & Breaking Changes**
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

#### **3. New Model & Hardware Support**
- ✅ **LLaVA-OneVision encoder now supports CUDA graphs** via PR [#57379](https://github.com/vllm-project/vllm/pull/57379), improving multimodal prefill efficiency.
- ✅ **SM120 (NVIDIA Blackwell) support expanded**: PR [#56152](https://github.com/vllm-project/vllm/pull/56152) enables FP32 router for MiniMax-M3 and GLM-5.3-Flash on SM120.
- ✅ **ROCm (gfx950/gfx951) improvements**: Multiple PRs address kernel compatibility issues with GLM-5.3-Flash (`SparseAttnIndexerKpool` forward missing, `kpool indexer overwrites KV cache`) — see [#57424](https://github.com/vllm-project/vllm/issues/57424), [#54359](https://github.com/vllm-project/vllm/issues/54359).
- 🔧 **Intel GPU profiling support** being unified under a platform-aware torch profiler; PRs [#57460](https://github.com/vllm-project/vllm/pull/57460), [#56542](https://github.com/vllm-project/vllm/pull/56542).

#### **4. Performance & Optimization**
- 🚀 **GLM-5.3-Flash sparse MLA overhead reduced** by reusing contiguous NoPE queries when rotary tail is empty — avoids redundant `torch.cat` operations ([#57458](https://github.com/vllm-project/vllm/pull/57458)).
- ⚙️ **MiniMax-M3 optimizations** landed: split K-loop for small queries, fused top-k merge, and improved routing — all targeting SM120 efficiency ([#56150](https://github.com/vllm-project/vllm/pull/56150), [#56149](https://github.com/vllm-project/vllm/pull/56149), [#56151](https://github.com/vllm-project/vllm/pull/56151)).
- 💡 **Qwen3.8-Flash-Next**: Patch enables `fp8_e4m3` KV cache on QSA path, doubling effective KV pool size — measured ~2x throughput increase on GB10 ([#54426](https://github.com/vllm-project/vllm/issues/54426)).

#### **5. Stability & Regressions**
- 🔥 **Critical crash on ROCm**: GLM-5.3-Flash fails to boot due to `NotImplementedError` in `forward_cuda` of `SparseAttnIndexerKpool` — affecting nightly builds ([#57424](https://github.com/vllm-project/vllm/issues/57424)).
- 🐛 **GLM-5.3-Flash silently overwrites KV cache on ROCm** due to mismatched block size in kpool indexer — leads to long-context recall degradation ([#54359](https://github.com/vllm-project/vllm/issues/54359)).
- 🐛 **DeepSeek-V4.1-Flash + DSpark speculative decode crashes** on SM120 during long prompt prefill due to illegal memory access ([#56771](https://github.com/vllm-project/vllm/issues/56771)).
- 🐛 **Batch invariance broken** with sequence parallelism + async TP enabled (`VLLM_BATCH_INVARIANT=1`) — affects correctness in multi-GPU inference ([#56370](https://github.com/vllm-project/vllm/issues/56370)).
- ⚠️ **Host memory exhaustion at startup** in v0.28.0/v0.29.0 — reported as a regression from v0.27.1 ([#54237](https://github.com/vllm-project/vllm/issues/54237)).

#### **6. What This Means for Application Developers**
- **Prioritize ROCm and SM120 testing** if deploying GLM-5.3-Flash or DeepSeek-V4.1 — known regressions may cause silent data corruption or crashes.
- Use **CUDA graphs for multimodal models** (e.g., LLaVA-OneVision) to reduce prefill latency — already supported via PR [#57379](https://github.com/vllm-project/vllm/pull/57379).
- For **high-throughput MoE inference**, consider incremental expert offloading (RFC #38256) to run large models on smaller GPUs.
- Avoid `VLLM_BATCH_INVARIANT=1` with `enable_sp` until fix lands — it breaks deterministic output guarantees.
- Enable **per-session profiling controls** (PRs #56542, #57460) for better observability in production deployments.

> *For real-time monitoring, track issue #57424 (ROCm GLM-5.3-Flash crash) and PR #57458 (GLM MLA perf) for immediate impact.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-18**

---

### **1. Today's Highlights**  
The SGLang project continues to advance its support for next-generation hardware and inference optimizations, with critical work on **T-Head PPU**, **SenseNova-U1/U1.5**, and **AMD GPU compatibility** now actively tracked. Key progress includes the introduction of **optimistic prefill with HiCache write-through**, improvements to **speculative decoding correctness**, and a major push toward standardizing KV cache event schemas across serving frameworks.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The project remains focused on internal stability and feature integration ahead of upcoming milestones.

---

### **3. New Model & Hardware Support**  
- **T-Head PPU (ZW810/810E/ZW-M890P)**: A formal roadmap ([#37519](https://github.com/sgl-project/sglang/issues/37519)) has been opened to upstream first-class support for T-Head’s latest AI accelerators, targeting high-performance inference on Chinese-designed hardware.
- **SenseNova-U1/U1.5**: Tracking issue [#37742](https://github.com/sgl-project/sglang/issues/37742) outlines integration efforts based on OpenSenseNova/SenseNova-U1, enabling SGLang to serve these emerging LLMs.
- **AMD GLM-5.3-Flash**: PR [#39317](https://github.com/sgl-project/sglang/pull/39317) ensures correct handling of fused and per-expert names in Quark quantization, improving model fidelity on ROCm platforms.

---

### **4. Performance & Optimization**  
- **Optimistic Prefill + HiCache Write-Through**: PR [#40043](https://github.com/sgl-project/sglang/pull/40043) enables buffer-only L3 write-through HiCache, reducing host memory pressure during optimistic prefill while preserving prefix cache efficiency.
- **HiCache Memory Efficiency**: PRs [#39395](https://github.com/sgl-project/sglang/pull/39395) and [#38426](https://github.com/sgl-project/sglang/pull/38426) optimize HiCache storage by compacting DSA indexers and improving write-back behavior—critical for multi-node deployments.
- **Speculative Decoding Improvements**: Multiple PRs address sampling edge cases ([#35798](https://github.com/sgl-project/sglang/pull/35798), [#40001](https://github.com/sgl-project/sglang/pull/40001)) and CDF boundary logic to improve draft accuracy and hybrid recurrent-state consistency under pipeline parallelism.
- **DeepEP v2 MXFP8 Support**: PR [#40030](https://github.com/sgl-project/sglang/pull/40030) adds experimental support for MXFP8 and deferred routing weights, expanding quantization flexibility for large MoE models.

---

### **5. Stability & Regressions**  
- **Critical CUDA Core Dump Tracker** ([#26340](https://github.com/sgl-project/sglang/issues/26340)): Over **310 comments** from automated coredump collection—indicating widespread instability on SM120 (Blackwell) devices. High priority; likely tied to kernel dispatch or memory management.
- **Hierarchical Cache Incorrect Output** ([#39830](https://github.com/sgl-project/sglang/issues/39830)): Hybrid GDN/Mamba models return outputs from wrong generation pass due to incorrect host-tier cache hit handling—severe correctness bug affecting speculative serving.
- **KV Cache Misreporting** ([#39900](https://github.com/sgl-project/sglang/issues/39900), [#39922](https://github.com/sgl-project/sglang/issues/39922)): `cache_creation_input_tokens` not returned in Anthropic-compatible `/v1/messages`, leading to inaccurate billing. Fixed in [PR #40044](https://github.com/sgl-project/sglang/pull/40044) (pending).
- **FlashKDA Crash with Radix Cache Disabled** ([#39925](https://github.com/sgl-project/sglang/issues/39925)): Tuple return mismatch causes crash in GLM-5.3-Flash; fix underway via PR #39925.
- **OpenAI SSE Streaming Inconsistencies** ([#39864](https://github.com/sgl-project/sglang/issues/39864)): `id` and `created` fields change inconsistently across stream chunks—impacts client-side state management.

---

### **6. What This Means for Application Developers**  
- **Expect increased complexity in deployment tuning** as support for new hardware (PPU, SenseNova) and advanced caching (HiCache, unified radix) matures—monitor CI stability and test on target backends early.
- **Use caution with speculative decoding and hybrid models** (GDN/Mamba): Known issues with hierarchical cache and recurrent-state commit may affect output quality and latency.
- **Ensure your agent workflows handle streaming inconsistencies**—the `/v1/messages` endpoint currently reports unstable `id` and `created` values in streams.
- **Adopt standardized KV cache events** once schema alignment ([#39991](https://github.com/sgl-project/sglang/issues/39991)) is complete—this will enable interoperability with observability tools like vLLM.
- **Monitor for Blackwell-specific regressions** (SM120): If using RTX PRO 6000 or similar, expect potential crashes until PRs addressing CUDA core dumps are merged.

> 🔗 *Track key issues and PRs:*  
> - [CUDA Core Dumps (#26340)](https://github.com/sgl-project/sglang/issues/26340)  
> - [T-Head PPU Roadmap (#37519)](https://github.com/sgl-project/sglang/issues/37519)  
> - [KV Cache Schema Alignment (#39991)](https://github.com/sgl-project/sglang/issues/39991)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-18**

---

### **1. Today's Highlights**  
The latest release cycle (b11028–b11017) focuses on critical Vulkan and SYCL stability fixes, including memory corruption prevention in MoE models and a fix for excessive scratchpad allocation under SYCL. New support for Qwen3.8-Flash-Next MTP layers and Intel Xe flash attention kernels advances high-performance inference on modern GPU architectures.

---

### **2. Releases & Breaking Changes**  
- **b11028**: Fixed missing file eviction in CI (`#29041`) — no functional impact but improves build hygiene.  
- **b11027**: Skips ACCEL devices in RPC to avoid compatibility issues (`#29020`).  
- **b11026**: Respects `TENSOR_SKIP` flag when skipping gate_up_exps in Qwen3.5-MoE models (`#29014`).  
- **b11025**: Extended Nemotron MTP support with cleanup of redundant declarations (`#29018`).  
- **b11024**: Updated OpenVINO to **2026.4**, resolving clangd/MSVC warnings and internal linkage issues (`#29009`).  

> 📌 *No breaking API changes detected; all updates are non-breaking fixes or feature additions.*

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen3.8-Flash-Next MTP** now fully supported via PR #28243 — enables shared MTP modules and up to **1.3–2x faster** inference.  
- ✅ **Intel Xe-LPG Plus/Xe2/Xe3** receive dedicated flash attention optimization kernels (`#24406`, draft series).  
- ✅ **Hexagon NPU** backend now builds on Windows Arm64 (`#29052`), enabling edge deployment on Qualcomm platforms.  
- ✅ **OpenCL**: Added optimized DP4A bin kernels for Q4_0/Q4_K/Q6_K GEMMs (`#29055`, `#29056`, `#29057`).  
- ✅ **WebGPU**: Kernel order preservation during speculative decoding now enforced (`#29019`).

---

### **4. Performance & Optimization**  
- **Vulkan**: Optimized MoE work skipping in `mul_mm coopmat1` path (`#25483`) — reduces redundant compute.  
- **SYCL**: Fix for B70 memory alloc error (>19.3GB) (`#28953`) — enables stable large-model offloading.  
- **CUDA/HIP**: Added MFMA (matrix-core) lightning indexer for CDNA2 (gfx90a) (`#29050`, `#29047`) — unlocks full CDNA2 utilization.  
- **OpenCL**: Flash attention binary kernel added (`#29046`) — improves throughput for long sequences.  
- **OpenVINO**: Updated to **2026.4**, with improved performance and reduced compile-time noise (`#29009`).  

> 🔥 *Expected gains: ~20–30% faster decode on Intel Arc B70/Xe2 with MoE models; 2x speedup on CDNA2 with DeepSeek-V3.2/V4.*

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Status | PR / Fix |
|--------|------|-------------|--------|---------|
| Critical | #29028 | `qwen4exp` / `deepseek-v4` aborts at first decode on Vulkan (RADV gfx1151) | Open | No fix yet |
| High | #28933 | Memory growth (RSS+swap) during chat on 128GB unified memory system | Open | No fix yet |
| High | #28860 | SYCL demands 2GB+ scratchpad with ngram-mod enabled | Open | No fix yet |
| Medium | #25664 | `vk::DeviceLostError` on Linux 7.x kernels (RADV_STRIXHALO) | Open | No fix yet |
| Medium | #27046 | SIGSEGV on Intel Lunar Lake iGPU due to false positive `resolve_fused_ops` | Open | No fix yet |

> ⚠️ **Note**: Multiple regressions reported on **Intel Arc B70**, **AMD RADV**, and **SYCL** paths — users should avoid `--split-mode tensor` and `ngram-mod` until resolved.

---

### **6. What This Means for Application Developers**  
- **Use b11028+** for stable inference on Apple Silicon, Vulkan, and SYCL — especially if using MoE models like Qwen3.6-35B-A3B-MTP.  
- **Leverage new MTP support** in Qwen3.8-Flash-Next for lower VRAM usage and faster generation.  
- **Avoid `--split-mode tensor` with SYCL** until #28860 is fixed — expect high memory pressure.  
- **Enable `--swa-full` + `-sm tensor` cautiously** — known crash risk with Gemma4-31B (`#26122`).  
- **For WebUIs and agents**: Wait for PR #29019 to be merged before relying on speculative decoding order integrity.  
- **Build from source** if targeting Hexagon NPU or Intel Xe optimizations — prebuilt binaries may lag behind.

> 💡 *Pro Tip:* Use `--errors-only` in CI (`#29040`) to reduce test noise and accelerate debugging.

🔗 [GitHub Release Notes](https://github.com/ggml-org/llama.cpp/releases/tag/b11028) | [Issue Tracker](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-18**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its support for emerging models and hardware backends, with critical work on MLX integration for low-bit quantized weights (Bonsai) and Vulkan on ARM64. Key stability fixes address speculative decoding stalls on MLX nvfp4 and memory measurement issues in draft models, while new feature requests highlight growing demand for customizable roles (e.g., `tool`) and optional disablement of speculative decoding for debugging.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*  
However, ongoing PRs signal potential future shifts:  
- **PR #18393** removed the built-in CLI agent by default—users now must opt-in via flags or launcher options (*Issue #18490*). This reflects a broader move toward reducing implicit cloud dependencies and improving enterprise compliance.  
- **PR #18517** proposes a `--nodraft` flag to disable speculative decoding entirely, which may become a permanent CLI option to enable deterministic output testing.

---

### **3. New Model & Hardware Support**  
- **Model Architecture**: Native support requested for `spark2_5` (Spark-X2.5-4B / 1.7B) — currently unsupported due to unrecognized architecture in Ollama runtime (*Issue #18195*).  
- **Hardware Backends**:  
  - **Vulkan on ARM64**: A fix is merged (*PR #18502*) to restore Vulkan inference support on Linux ARM64 systems (e.g., Apple Silicon M1), previously falling back to CPU-only mode.  
  - **MLX Backend**:  
    - *Proposal*: Add support for Bonsai’s 1-bit/2-bit quantized weights via the new 0.19 MLX backend (*Issue #18515*).  
    - *Progress*: MLX runner now includes load progress reporting and stall detection (*PR #17834*), improving reliability under heavy load.

---

### **4. Performance & Optimization**  
- **Speculative Decoding**:  
  - **PR #18517** introduces `--nodraft` to disable speculative decoding—critical for developers needing reproducible outputs or performance comparisons.  
  - **PR #18510** fixes KV buffer release timing during speculative decode, preventing memory bloat and improving throughput consistency.  
- **Cold Start Latency**:  
  - **PR #16085** implements warm-up compilation paths on model load, reducing TTFT (Time To First Token) on cold models by pre-warming MLX compile caches.  
- **Memory Efficiency**:  
  - **PR #18479** optimizes structured outputs on thinking models by applying grammar constraints in a single pass, eliminating redundant prefill cycles and reducing latency by ~30% in benchmarked cases.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Link |
|---------|------|--------|------|
| Critical | MLX nvfp4: request stalls indefinitely at `processed=total-1` under sustained single-slot load; only SIGTERM recovers | Open | [Issue #18505](https://github.com/ollama/ollama/issues/18505) |
| High | `glm-ocr` enters infinite loop during text recognition (even simple prompts like "hi") | Open | [Issue #16892](https://github.com/ollama/ollama/issues/16892) |
| High | `minicpm5-2b`: native tool calls fail to parse, returning malformed XML fragments (`name="get_weather"> name="city...`) | Open | [Issue #18483](https://github.com/ollama/ollama/issues/18483) |
| Medium | `qwen3-vl:8b-instruct` crashes on Windows Vulkan AMD RX 6750 XT after multi-model load | Open | [Issue #18494](https://github.com/ollama/ollama/issues/18494) |
| Medium | `glm-5.3-flash`: intermittently emits malformed string-encoded tool calls instead of JSON array | Open | [Issue #18506](https://github.com/ollama/ollama/issues/18506) |
| Low | `deepseek-v4.1-flash:cloud`: `default_reasoning_level: "high"` not in `supported_reasoning_levels` list | Closed | [Issue #18484](https://github.com/ollama/ollama/issues/18484) |

> ✅ **Fixes in Progress**:  
> - **PR #18510** addresses KV buffer release in speculative decode.  
> - **PR #17834** adds stall detection and load progress reporting for MLX runner.  
> - **PR #18502** resolves Vulkan support on ARM64 Linux.

---

### **6. What This Means for Application Developers**  
- **Agent Builders**: The removal of the default CLI agent (*PR #18393*) means you must explicitly enable it via flags or custom launchers—ideal for secure, air-gapped environments but requires workflow updates.  
- **Tool Calling Users**: Be cautious with `tool` role usage—Ollama currently enforces `system`, `user`, `assistant` only (*Issue #6322*, *#18509*). Expect support for custom roles soon.  
- **Debugging & Reproducibility**: Use `--nodraft` (if available) to disable speculative decoding and obtain exact, non-speculative outputs—essential for accuracy-sensitive tasks.  
- **Enterprise Deployments**: Leverage `OLLAMA_METRICS=1` to expose Prometheus metrics (*PR #18508*) and monitor GPU utilization across containers. For shared GPU setups, consider external resource locks (*Issue #18487*) to avoid contention.  
- **Model Validation**: Use `/api/chat` response metadata (*Issue #18394*) to track exactly which artifact served a response—critical for auditability and evaluation pipelines.

> 🔗 **Key Links**:  
> - [Issue #18517 – `--nodraft` proposal](https://github.com/ollama/ollama/issues/18517)  
> - [PR #18502 – Vulkan ARM64 fix](https://github.com/ollama/ollama/pull/18502)  
> - [Issue #18483 – MiniCPM5 tool call parsing](https://github.com/ollama/ollama/issues/18483)  
> - [Issue #18505 – MLX nvfp4 stall](https://github.com/ollama/ollama/issues/18505)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-18**

---

### **1. Today's Highlights**  
The LiteLLM proxy continues to mature with critical fixes for authentication, logging, and cost tracking, particularly around JWT handling, MCP tooling, and streaming guardrails. Key PRs address security gatekeeping in OAuth flows, ensure accurate spend logging for Azure AI Foundry and Amazon Transcribe, and improve observability through normalized error clustering. These updates reinforce LiteLLM’s role as a robust inference gateway for enterprise-grade AI applications.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, several breaking changes are in flight:
- **PR #41709** introduces preemptive OAuth 401 challenges based on key allowlists — this may affect clients relying on post-challenge access control.
- **PR #41715** adds `normalized_error` cluster key to error metadata, changing how errors are grouped in dashboards (e.g., Langfuse). Existing alerting logic may need adjustment.
- **PR #36741** migrates the Langfuse SDK callback to v4, which breaks compatibility with older versions (`langfuse<4`). Developers using custom integrations must upgrade their dependencies.

> 🔗 [PR #41709](https://github.com/BerriAI/litellm/pull/41709) | [PR #41715](https://github.com/BerriAI/litellm/pull/41715) | [PR #36741](https://github.com/BerriAI/litellm/pull/36741)

---

### **3. New Model & Hardware Support**  
*No new model or hardware support added today.*  
However, ongoing work includes:
- **PR #41511**: Adds Entra ID (Azure AD) auth support for Microsoft Foundry agents via A2A relay — enabling integration with enterprise identity providers.
- **PR #41515**: Introduces **Amazon Transcribe batch job pass-through** with completion-time pricing — now supports cost-aware routing for speech-to-text workflows.
- **PR #41710**: Honors team/user-level MCP Tool Search settings for JWT-authenticated users — improving fine-grained control over AI agent capabilities.

> 🔗 [PR #41511](https://github.com/BerriAI/litellm/pull/41511) | [PR #41515](https://github.com/BerriAI/litellm/pull/41515) | [PR #41710](https://github.com/BerriAI/litellm/pull/41710)

---

### **4. Performance & Optimization**  
*No direct throughput or latency improvements reported today.*  
But significant optimizations are underway:
- **PR #41469**: Drops `top_p` parameter from GPT-5 reasoning models when `drop_params: true` is set — prevents rejection by Bedrock/Mantle and reduces unnecessary API overhead.
- **PR #41443**: Removes pinned cost-map prices and deprecation dates in unit tests — improves test reliability and enables faster CI/CD pipelines.
- **PR #41448**: Preserves upstream query parameters in passthrough routes (e.g., Vertex AI), ensuring correct tokenization and billing behavior during streaming.

> 🔗 [PR #41469](https://github.com/BerriAI/litellm/pull/41469) | [PR #41443](https://github.com/BerriAI/litellm/pull/41443) | [PR #41448](https://github.com/BerriAI/litellm/pull/41448)

---

### **5. Stability & Regressions**  
*Critical stability issues identified today:*
1. **Streaming Guardrails Failure** ([#41611](https://github.com/BerriAI/litellm/issues/41611))  
   - *Severity: High*  
   - Sensitive values split across SSE chunks can bypass per-chunk guardrail checks. This creates a potential data leakage vector in streaming responses.
   - ✅ **Fix PR:** [41711](https://github.com/BerriAI/litellm/pull/41711) (in progress) – preserves parent session context for intercepted searches.

2. **Azure AI Foundry Cost Logging Bug** ([#41605](https://github.com/BerriAI/litellm/issues/41605))  
   - *Severity: Medium-High*  
   - Synchronous requests to `azure_ai/gpt-5.6-luna` intermittently log `$0.00` despite non-zero prompt costs.
   - ✅ **Fix PR:** [41706](https://github.com/BerriAI/litellm/pull/41706) (pending review) – ensures proper cost propagation.

3. **Prisma Reconnection Failures** ([#26886](https://github.com/BerriAI/litellm/issues/26886))  
   - *Severity: Medium*  
   - Periodic crashes in LiteLLM proxy pod due to Prisma query engine instability.
   - ⚠️ No fix PR yet; requires deeper investigation into connection pooling and lifecycle management.

> 🔗 [Issue #41611](https://github.com/BerriAI/litellm/issues/41611) | [Issue #41605](https://github.com/BerriAI/litellm/issues/41605) | [Issue #26886](https://github.com/BerriAI/litellm/issues/26886)

---

### **6. What This Means for Application Developers**  
- **Use caution with streaming + guardrails**: If you’re building agents that process sensitive data, avoid relying solely on per-chunk guardrail checks until PR #41711 lands.
- **Ensure correct cost tracking**: For production workloads using Azure AI Foundry or Amazon Transcribe, verify your spending logs align with actual usage—especially if using synchronous calls.
- **Update Langfuse integrations**: Migrate to `langfuse>=4` and confirm your callback setup works with PR #36741.
- **Leverage enhanced auth controls**: With PRs like #41710 and #41709, teams can now enforce granular access policies at the user/team level without requiring virtual keys.
- **Monitor CI/CD health**: Several recent PRs (#41553, #41443) highlight ongoing test stability efforts—expect fewer red builds in future merges.

> 📌 Pro tip: Use `/version` or `/info` endpoints (requested in [#24109](https://github.com/BerriAI/litellm/issues/24109)) to audit deployed LiteLLM versions in staging/prod environments.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-18**

---

### **1. Today's Highlights**  
Unsloth releases **v0.1.810-beta**, introducing full **multi-user Docker support**, expanded **AMD (RDNA1/2) and ARM64 CUDA on Windows** compatibility, and enhanced **FP8/INT8 diffusion inference**. The release also includes critical stability fixes for GRPO and vision model handling, alongside ongoing efforts to modernize the Studio UI and infrastructure.

---

### **2. Releases & Breaking Changes**  
- **v0.1.810-beta**: New Docker image with multi-user accounts, AMD RDNA1+2 support, FP8/INT8 diffusion, ARM64 CUDA on Windows, and training/inference improvements.  
  🔗 [Release Notes](https://unsloth.ai/docs/get-started/insta)

> ⚠️ **Migration Note**: Users relying on outdated Docker images (e.g., `unsloth/unsloth:latest` from May 2026) should upgrade immediately — several issues stem from stale binaries and missing updates.

---

### **3. New Model & Hardware Support**  
- ✅ **AMD Support**: Full RDNA1/2 GPU support via ROCm in Docker (`unsloth/unsloth-rocm`).  
  🔗 [PR #11218](https://github.com/unslothai/unsloth/pull/11218) — now ships Unsloth Studio in ROCm image.
- ✅ **ARM64 CUDA on Windows**: Experimental support added for ARM64 systems using NVIDIA CUDA.
- ✅ **New Quantization Formats**: FP8 and INT8 diffusion support enabled for inference.
- 📌 **Model-Specific**: Qwen3.8-Flash-Next MTP (UD-IQ4_XS), Gemma3-4B, GPT-OSS-120b-K4-KM, and Nemotron 30B (via `NemotronHTopkRouter`) are under active support or testing.
- 🔁 **Model Download Sources**: Feature request for **ModelScope integration** (#2969, #9117) is actively discussed; not yet implemented.

---

### **4. Performance & Optimization**  
- **LoRA SFT Speedup**: On B200, LoRA fine-tuning of `Qwen3.5-9B` improved from **0.83s → 0.66s per step** (CPU-side overhead reduced).  
  🔗 [PR #10744](https://github.com/unslothai/unsloth/pull/10744)
- **Further Optimization**: Additional CPU kernel launch reduction cuts step time to **0.77s** (model-independent half).  
  🔗 [PR #11238](https://github.com/unslothai/unsloth/pull/11238)
- **Inference Efficiency**: Optimizations in llama.cpp runtime (e.g., cache recovery, binary probing) reduce startup delays on macOS and Windows.  
  🔗 [PR #11237](https://github.com/unslothai/unsloth/pull/11237), [PR #10494](https://github.com/unslothai/unsloth/pull/10494)

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR / Workaround |
|------|----------|--------|---------------------|
| `Qwen3Attention` has no `apply_qkv` attr | Critical | Closed | Upgrade to latest `unsloth_zoo` |
| NVFP4 load failure on RTX 5060Ti | High | Closed | Confirm driver version + use `--force-fp4` |
| MTP draft crash: `GGML_ASSERT(ggml_can_repeat(b, a))` | Critical | Open | [#11219](https://github.com/unslothai/unsloth/issues/11219) — affects RTX 5080 users |
| Studio fails to start on `0.0.0.0` | Medium | Open | [#11187](https://github.com/unslothai/unsloth/issues/11187) — network binding issue |
| KV cache quantization not reflected in context length (TP enabled) | Medium | Closed | Fixed in v0.1.810-beta |
| Token-carrying requests follow redirects without auth-safe policy | Security | Open | [#11103](https://github.com/unslothai/unsloth/issues/11103) — potential leakage risk |

> ❗ **Note**: Several regressions stem from stale Docker images — ensure you’re using `v0.1.810-beta` or later.

---

### **6. What This Means for Application Developers**  
- **Multi-User & Multi-Host Deployments**: With new Docker + multi-user support, **Unsloth is now viable for shared environments** (e.g., enterprise LLM platforms, research teams).
- **AMD First-Class Support**: ROCm-enabled Docker images allow **true cross-GPU parity** between NVIDIA and AMD — crucial for heterogeneous infra.
- **Fine-Tuning Performance**: The **0.66s/step LoRA SFT** on B200 is near real-time — ideal for rapid iteration in agent training pipelines.
- **Vision & Multimodal Ready**: GRPO now supports full vision kwargs and list-of-images input — essential for building **agent-based multimodal systems**.
- **Security & Reliability**: Addressing redirect leaks and sandboxing (via #11209, #11172) signals growing maturity for production-grade deployment.

> 💡 **Action Item**: Update all Docker images (`unsloth/unsloth`, `unsloth/unsloth-rocm`) to `v0.1.810-beta` immediately. Avoid legacy tags (`latest`, `0.1.43`) — they’re broken or outdated.

---  
*Digest compiled from GitHub activity (2026-09-17–18).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*