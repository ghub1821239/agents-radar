# AI Infrastructure Digest 2026-10-07

> Generated: 2026-10-07 01:47 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-07**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of high specialization and hardware-aware optimization, driven by the rollout of NVIDIA Blackwell (SM120), AMD ROCm advances, and emerging MoE/multimodal models. Projects are converging on performance-critical layers—KV cache management, kernel fusion, and quantization—while also expanding support for local agent workflows and cloud-native gateways. Stability remains a key challenge, with multiple critical bugs affecting production-grade deployments across vLLM, SGLang, and Ollama. The shift toward Rust-based gateways (LiteLLM) and GPU-resident MoE caching (llama.cpp) signals a maturing infrastructure stack focused on low-latency, scalable, and secure model delivery.

---

### **2. Activity Comparison**

| Project       | Issues Open (High/Med) | PRs Merged (Last 24h) | Releases | Breaking Changes |
|---------------|------------------------|------------------------|----------|------------------|
| **vLLM**      | 8 (3/5)                | 6                      | None     | None             |
| **SGLang**    | 12 (2/10)              | 5                      | None     | Yes (default opt)|
| **llama.cpp** | 9 (3/6)                | 7                      | 3 (b11457/b11450/b11447)| Yes (RPC `-sm tensor`) |
| **Ollama**    | 10 (4/6)               | 3                      | None     | None             |
| **LiteLLM**   | 7 (4/3)                | 2                      | None     | Yes (Rust migration) |
| **Unsloth**   | 6 (2/4)                | 4                      | v0.1.903-beta | No          |

> *Note: High-severity issues include silent corruption, crashes, and security vulnerabilities. SGLang and LiteLLM show strong innovation momentum despite stability risks.*

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **K2 Horizon (MoVA)**    | ✅ (GGUF) | ⚠️ Requested | ✅ (full) | ✅ (in request) | — | — |
| **DeepSeek-V4.1**        | ✅ (ROCm/Triton) | ✅ (field-deployed) | — | — | — | — |
| **GLM-5.3-Flash**        | ✅ (Blackwell + sparse MLA) | ✅ (breakable graphs) | ✅ (MTP) | ❌ GSQ-RCO issue | — | — |
| **Cohere2 Vision**       | — | — | ✅ | — | — | — |
| **EmbeddingGemma 2**     | — | — | — | ✅ | — | ✅ |
| **Qwen3.8-27B NVFP4**    | ✅ (Blackwell) | ⚠️ DFlash2 crash | — | — | — | — |
| **Maion-Coder**          | — | — | ✅ | — | — | — |

> ✅ **Leader**: **llama.cpp** leads in raw model coverage, especially for new GGUF formats and vision models.  
> 🏆 **Innovation Leader**: **vLLM** and **SGLang** are ahead in multi-modal and speculative decoding integration.  
> 🔧 **Agent Enabler**: **Unsloth** stands out with browser + voice cloning for fully local agents.

---

### **4. Performance Frontier**

| Focus Area              | vLLM                          | SGLang                         | llama.cpp                     | Ollama                    | LiteLLM                   | Unsloth                 |
|-------------------------|-------------------------------|--------------------------------|-------------------------------|---------------------------|---------------------------|-------------------------|
| **KV Cache & Memory**   | 2-bit quant, KVarN, LHBNC fix | HiCache deadlock risk          | GPU MoE caching (PR #29887)   | CPU pinning bug (#29932)  | —                         | —                       |
| **Kernel Optimization** | Fused QK+RoPE+gate, Triton    | Breakable CUDA graphs, sigmoid fix | BF16, V dequant fixes, Vulkan RMS Norm | — | — | — |
| **Speculative Decoding**| Correctness fixes (SM120)     | Repetition loops, degenerate output | `d2t` draft trimming           | Not supported             | Not supported             | —                       |
| **Distributed Serving** | Multi-GPU, CPU offloading     | Multi-GPU, NPU support           | RPC backend (`-sm tensor`)     | —                         | Proxy routing (Rust)      | —                       |
| **Quantization**        | FP8, NVFP4, compressed tensors| —                              | Q2_K, Q8 CPU pinning, GSQ-RCO  | GSQ-RCO fails             | —                         | —                       |

> 🔥 **Top Performers**: vLLM and llama.cpp lead in kernel-level optimizations and memory efficiency.  
> ⚠️ **Critical Bottleneck**: Ollama’s MLX runner shows extreme underutilization (96% GPU idle), while SGLang suffers from HiCache deadlocks.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Secondary Role                     | Key Differentiator                                  |
|---------------|--------------------------------|------------------------------------|-----------------------------------------------------|
| **vLLM**      | Inference Engine (CUDA/ROCm)  | Model Serving, Speculative Decoding| Industry-standard engine; deep SM120 support       |
| **SGLang**    | Inference Engine + Gateway    | Agent Workflow Orchestration       | Hierarchical cache (HiCache), breakable graphs      |
| **llama.cpp** | Local Runtime / GGUF Engine   | Cross-platform, Low-level Kernel   | Full control over quantization, GPU backends        |
| **Ollama**    | Local Runtime + CLI Gateway   | Model Management, Embeddings       | Developer-friendly UX; agent tooling via Golem       |
| **LiteLLM**   | Cloud Gateway / API Proxy     | Cost Tracking, Observability       | Rust migration → sub-1ms overhead; trace ID enforcement |
| **Unsloth**   | Local Agent Platform          | Training/Fine-tuning UI            | Browser + voice cloning; multimodal agent workflows |

> 💡 **Strategic Insight**: The layering is becoming more distinct—engine (vLLM/SGLang), runtime (llama.cpp/Ollama), gateway (LiteLLM), and agent platform (Unsloth)—with minimal overlap.

---

### **6. Trend Signals**

#### **Emerging Trends Extracted from Today’s Activity**:
1. **Hardware-Specific Optimization Is Now Mandatory**:  
   - Blackwell (SM120) support is no longer optional—projects like vLLM, SGLang, and llama.cpp are actively fixing layout mismatches, sparse MLA paths, and kernel launch overheads.  
   - **Developer Watch**: Avoid generic configurations (e.g., `LHBNC`, `DFlash2`) unless validated on your hardware.

2. **MoE and Multimodal Models Are Driving Infrastructure Innovation**:  
   - GPU-resident MoE caching (llama.cpp), fused Triton kernels (vLLM), and vision model support (Cohere2 Vision, EmbeddingGemma 2) are now core differentiators.  
   - **Developer Watch**: Expect rising demand for efficient expert routing and vision-audio fusion in local agents.

3. **Gateway Performance Is Shifting to Rust and Typed Payloads**:  
   - LiteLLM’s Rust migration aims for sub-1ms overhead—indicating that API proxy latency is now a bottleneck in large-scale systems.  
   - **Developer Watch**: Prepare for future SDK changes; early adoption of trace ID enforcement is recommended.

4. **Stability Still Lags Behind Feature Velocity**:  
   - Critical regressions in vLLM (silent corruption), SGLang (deadlocks), and Ollama (segfaults) highlight the cost of rapid innovation.  
   - **Developer Watch**: Use pinned versions (e.g., v0.29.0 for Qwen3.8-27B) and test with `-np > 1` and `--spec-draft-n-max 1` to detect edge cases.

5. **Local Agents Are Becoming First-Class Citizens**:  
   - Unsloth’s browser + voice cloning, Ollama’s Golem integration, and SGLang’s tool parsing show a clear trend toward self-contained, privacy-preserving agent platforms.  
   - **Developer Watch**: Build with local execution in mind—avoid cloud-dependent features until proven stable.

---

### **Final Recommendation for Application Developers**  
Prioritize **stability over novelty** in production systems. Use **pinned versions** where available, avoid experimental flags (e.g., `--enable-breakable-prefill-cuda-graph`), and monitor `collect_env.py` or `bench.go` outputs for hidden bottlenecks. For high-performance inference, lean on **vLLM** or **llama.cpp**; for agent workflows, **Unsloth** and **SGLang** offer unique advantages. For cloud-scale deployment, **LiteLLM’s Rust gateway** will be pivotal—join the beta early.  

> 🔗 **Action Items**:  
> - Test all speculative decoding paths with real-world prompts.  
> - Audit model loading behavior on constrained systems (CPU pinning).  
> - Enable trace IDs and observability in LiteLLM proxies.  
> - Avoid naming tools “call” in llama.cpp.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-07

---

### **1. Today's Highlights**  
The vLLM project continues to strengthen its support for multi-modal and high-performance inference, with critical fixes to speculative decoding correctness and KV cache management on SM120 (Blackwell) hardware. Notably, PRs #60005 and #59999 resolve a persistent layout mismatch issue that could cause silent output corruption when using `LHBNC` KV cache layouts with CPU offloading — a fix essential for stable production use on modern NVIDIA GPUs.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The latest stable version remains **v0.31.0**, with ongoing work focused on stability and performance improvements ahead of the next release cycle.

---

### **3. New Model & Hardware Support**  
- **New model support**:  
  - **DeepSeek-V4-Flash** now has improved compatibility on B300 (SM100) via PR #46796, which resolves a kernel launch failure during engine startup.  
  - **Qwen3.8-27B-NVFP4** and **GLM-5.3-Flash** are receiving targeted optimizations for Blackwell (SM120) architectures, including new attention kernels and sparse MLA path fixes (#53963, #57406).  
- **Hardware/Backend Advances**:  
  - **ROCm (AMD)**: Significant progress on **DeepSeek V4.1** and **Qwen4Exp** integration via fused Triton kernels (#59668, #60021), with AITER-based MoE routing now enabled for DeepSeek-V4 via #59685.  
  - **NVIDIA Blackwell (SM120)**: Multiple fixes ensure stable operation of **Qwen3.8-27B NVFP4**, **Kimi-K2.6-nvfp4**, and **Nemotron-3.5-Lightning** on RTX PRO 6000 and DGX Spark systems.

---

### **4. Performance & Optimization**  
- **Speculative Decoding**:  
  - PR #59668 reduces decode candidate mask overhead on ROCm from four kernels per layer to one, enabling single-launch DSA decode — a major latency win for long-context inference.  
- **KV Cache & Memory Efficiency**:  
  - PR #60043 removes legacy `mamba_cache_mode="all"` code, streamlining Mamba prefix caching logic.  
  - Work continues on **2-bit KV cache quantization** (#46221) and **KVarN** calibration-free sub-8-bit backend (#46613), promising up to 4x memory savings without accuracy loss.  
- **Kernel Fusion**:  
  - Fused QK-norm+RoPE+gate kernels for **Qwen3-Next** (#51406) and **Qwen4Exp** (#60021) reduce kernel launch overhead and improve throughput on both CUDA and ROCm.

---

### **5. Stability & Regressions**  
**Critical Issues Reported Today**:  
1. **#60174 [Bug]**: DFlash2/DSpark + prefix caching corrupts output after a cache hit on **Qwen3.8-27B NVFP4** (SM120) with FP8 and compressed tensors. Reproduced in v0.30.0/v0.31.0; fixed in v0.29.0.  
   🔗 [GitHub Issue](https://github.com/vllm-project/vllm/issues/60174) | *Fix PR pending*  
2. **#60197 [Bug]**: PEFT LoRA adapters fail to load on **RobertaForSequenceClassification** models despite recent enablement (#58884).  
   🔗 [GitHub Issue](https://github.com/vllm-project/vllm/issues/60197) | *Fix PR pending*  
3. **#53963 [Bug]**: GLM-5.3-Flash fails to start on **RTX PRO 6000 (SM120)** due to missing rope-free sparse MLA path — three distinct failure modes observed.  
   🔗 [GitHub Issue](https://github.com/vllm-project/vllm/issues/53963) | *Fix PR pending*

> ⚠️ **Note**: Several issues involve **silent output corruption** or **engine crashes** under specific configurations (e.g., prefix caching + DSpark, LHBNC layout). Users should avoid these combinations until fixes land.

---

### **6. What This Means for Application Developers**  
- **Avoid `VLLM_KV_CACHE_LAYOUT=LHBNC`** if using native CPU offloading — this layout is now rejected at startup via PR #60005/#59999 to prevent silent corruption.  
- **Use `--enable-sleep-mode` cautiously**: Avoid with `--kv-offloading-backend native` unless testing on v0.29.0 or earlier — known deadlock risks exist (#45268).  
- **Multi-modal apps**: Ensure tool parsers like `qwen3_xml` are updated — PR #51679 fixes incorrect merging of reasoning content into `content`.  
- **ROCm users**: Leverage fused Triton kernels (`fused_qk_rmsnorm_rope_gate`, `AITER MegaMoEV2`) for better throughput on Qwen and DeepSeek models.  
- **Future-proofing**: Monitor RFCs like #38175 (ViT CUDA graph) and #25700 (envvar cleanup) — they signal upcoming shifts toward more robust, config-driven infrastructure.

👉 **Recommended Actions**:  
- Pin to v0.29.0 if running Qwen3.8-27B with DSpark + prefix caching.  
- Update to latest `main` for ROCm performance gains and bug fixes.  
- Review `collect_env.py` output when encountering startup failures — especially for FP8/RoBERTa/DeepSeek models.

---  
*Digest generated from GitHub data: [vllm-project/vllm](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-07**

---

### **1. Today's Highlights**  
The SGLang project continues strong momentum in infrastructure stability and model-specific optimizations, with a focus on resolving critical CI flakiness and deepening support for DeepSeek-V4.1 and GLM-5.3-Flash. Key work includes enabling breakable prefill CUDA graphs by default for GLM-5.3-Flash and advancing hierarchical cache (HiCache) reliability across multi-GPU and NPU platforms.

---

### **2. Releases & Breaking Changes**  
None. No new releases were published in the last 24 hours. However, **`--enable-breakable-prefill-cuda-graph` is now enabled by default for `GLM-5.3-Flash`** via PR [#42845](https://github.com/sgl-project/sglang/pull/42845), which may affect users relying on legacy graph behavior—review performance impact under sustained load.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1**: Active optimization tracking ([#42170](https://github.com/sgl-project/sglang/issues/42170)) with ongoing refactors (mHC cleanup, TP optimizations). Field deployment confirmed on 8× RTX PRO 6000 (PCIe-only, SM120) ([#40877](https://github.com/sgl-project/sglang/issues/40877)).
- **GLM-5.3-Flash**: Enhanced support with breakable prefill CUDA graphs enabled by default ([#42845](https://github.com/sgl-project/sglang/pull/42845)), and fixes for speculative decoding issues ([#40843](https://github.com/sgl-project/sglang/issues/42849)).
- **NPU (Ascend)**: HiCache-related crashes reported ([#42672](https://github.com/sgl-project/sglang/issues/42672)), and validation of diffusion model loading for gated repos ([#34903](https://github.com/sgl-project/sglang/pull/34903)).
- **ROCm (AMD)**: Workarounds for gfx1250 tilelang compilation failures ([#42747](https://github.com/sgl-project/sglang/pull/42747)).

---

### **4. Performance & Optimization**  
- **GLM-5.3-Flash**: Breakable prefill CUDA graphs now default enabled → improved memory efficiency and reduced GPU idle time during long prefills.
- **DeepSeek-V4.1**: Optimizations underway for mHC (multi-head chunked) and TP (tensor parallelism) scaling; field data shows stable throughput on 8× RTX PRO 6000 (no NVLink).
- **Kernel-level**: Triton sigmoid bit-identical fix in KDA gate kernel ([#42611](https://github.com/sgl-project/sglang/pull/42611)) improves deterministic inference fidelity.
- **Diffusion**: FLUX.2 block output projection optimized to avoid `torch.cat`, reducing memory bandwidth usage ([#41943](https://github.com/sgl-project/sglang/pull/41943)).

---

### **5. Stability & Regressions**  
- **Critical (High Severity)**:  
  - **HiCache deadlock under concurrent long prefills** with `--hicache-write-policy write_through` on DeepSeek-V4 ([#42465](https://github.com/sgl-project/sglang/issues/42465)). Scheduler and detokenizer go silent → `/health` returns 503. *No fix PR yet.*  
  - **CUDA coredumps** tracked in real-time via auto-collection ([#26340](https://github.com/sgl-project/sglang/issues/26340)) — 324 comments, indicating systemic instability in test runs. *Action required: investigate backend or driver mismatch.*
- **Moderate**:  
  - **Repetition and degenerate loops** in GLM-5.3 output with DFLASH speculative decoding ([#40843](https://github.com/sgl-project/sglang/issues/40843)).  
  - **Hybrid-SWA + radix cache livelock** when SWA prefix lock pins finished request chunks ([#41579](https://github.com/sgl-project/sglang/issues/41579)).  
  - **GSM8K accuracy regression** on B200 (`test_gsm8k` fails at ~0.87 vs 0.93 threshold) since Oct 6 ([#42749](https://github.com/sgl-project/sglang/issues/42749)).

---

### **6. What This Means for Application Developers**  
- **Use caution with HiCache + write-through policies** on large models (e.g., DeepSeek-V4) under bursty long prompts — expect potential deadlocks. Monitor logs and consider disabling `write_through` temporarily.
- **Enable `breakable-prefill-cuda-graph` for GLM-5.3-Flash** to improve throughput and reduce memory pressure during long context processing.
- **Avoid speculative decoding with GLM-5.3** if you observe repetition or degenerate outputs — use standard decode until issue is resolved.
- **CI instability** (flaky tests, core dumps) suggests that nightly builds may be unreliable — prefer tagged versions for production deployments.
- **For agents using tools + JSON format**, ensure `response_format` and `tool-call-parser` are aligned — current version silently drops tool calls on GLM-5.3 ([#42269](https://github.com/sgl-project/sglang/issues/42269)).

> 🔗 [GitHub Issue Tracker](https://github.com/sgl-project/sglang/issues) | [PR Dashboard](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-07**

---

### **1. Today's Highlights**  
The latest updates focus on critical performance fixes for Blackwell-era GPUs (sm_120) and expanded support for emerging models like **K2 Horizon** and **GLM5Next**, including MoVA and MTP optimizations. Key improvements include BF16 support in CUDA kernels, GPU-accelerated MoE expert caching via PR #29887, and a fix for excessive CPU pinning in Q8 model loading—directly addressing memory bottlenecks in high-end inference setups.

---

### **2. Releases & Breaking Changes**  
- **b11457**: Added `BF16` support to XIELU CUDA kernel template; removed temporary `supports_op` gate in `ggml-cuda`.  
  🔗 [PR #29955](https://github.com/ggml-org/llama.cpp/pull/29955)  
- **b11450**: Introduced `-sm tensor` flag for RPC backend, bumping major version.  
  🔗 [PR #26610](https://github.com/ggml-org/llama.cpp/pull/26610)  
- **b11447**: Added support for **pplx-decider** model type (used in reasoning pipelines).  
  🔗 [PR #30044](https://github.com/ggml-org/llama.cpp/pull/30044)

> ✅ *No breaking API changes beyond version bump in RPC; all other changes are additive or bug fixes.*

---

### **3. New Model & Hardware Support**  
- **K2 Horizon (0.9B, 3.7B, 7B, 32B, 36B MoVA)**: Full support added via GGUF conversion, hparams parsing, compute graph integration, and tokenizer registration.  
  🔗 [PR #29535](https://github.com/ggml-org/llama.cpp/pull/29535)  
- **GLM5Next (GLM-5.3-Flash)**: Added MTP (Multi-Token Prediction) support and optimized compute graph.  
  🔗 [PR #29928](https://github.com/ggml-org/llama.cpp/pull/29928)  
- **Cohere2 Vision**: Added vision model support with `image_preprocessor` and `Cohere2VisionModel` implementation.  
  🔗 [PR #30062](https://github.com/ggml-org/llama.cpp/pull/30062)  
- **Maion-Coder**: Native architecture support now available in `models.h` and loader.  
  🔗 [PR #29778](https://github.com/ggml-org/llama.cpp/pull/29778)  
- **PLaMo-3 Tokenizer**: Pre-segmentation logic implemented to handle special tokens and repeated character runs.  
  🔗 [PR #30045](https://github.com/ggml-org/llama.cpp/pull/30045)

---

### **4. Performance & Optimization**  
- **CUDA (Blackwell sm_120)**: Fixed severe V dequantization slowdowns in `q4_0`/`q5_0` due to stack frame bloat (128 → 336 bytes).  
  🔗 [PR #30077](https://github.com/ggml-org/llama.cpp/pull/30077)  
- **Q2_K Quantization**: Reduced VGPR spills on AMD GCN via gentler unroll and loop simplification.  
  🔗 [PR #29910](https://github.com/ggml-org/llama.cpp/pull/29910)  
- **MoE Expert Caching (GPU-resident LRU)**: PR #29887 enables GPU-side execution of host-expert `MUL_MAT_ID` ops with LRU cache — reduces CPU-GPU data movement.  
  🔗 [PR #29887](https://github.com/ggml-org/llama.cpp/pull/29887)  
- **Vulkan RMS Norm**: Subgroup reductions improve performance on Intel Arc B70 and RTX 4060 Ti.  
  🔗 [PR #29882](https://github.com/ggml-org/llama.cpp/pull/29882)  
- **Metal Flash Attention**: Fixed excess threadgroup memory usage in quantized flash attention.  
  🔗 [PR #29340](https://github.com/ggml-org/llama.cpp/pull/29340)

---

### **5. Stability & Regressions**  
- **Critical Memory Issue**: Q8 model fails to load on Vulkan+RPC due to **~50.7 GiB CPU-pinned buffer** (`per_layer_token_embd`) when host RAM is limited (~30 GiB usable).  
  🔗 [Issue #29932](https://github.com/ggml-org/llama.cpp/issues/29932) *(High severity — blocks large model deployment)*  
- **Segmentation Fault**: Occurs when a tool named `"call"` is invoked in `llama-server`.  
  🔗 [Issue #29967](https://github.com/ggml-org/llama.cpp/issues/29967) *(High severity — security risk in agent workflows)*  
- **CUDA Illegal Memory Access**: On GLM-5.3-Flash at long prefill (`-ub 2048`) with Blackwell.  
  🔗 [Issue #28282](https://github.com/ggml-org/llama.cpp/issues/28282) *(High severity — affects production inference)*  
- **Vulkan Slowdown on RX 9070 XT**: 5–7x slower token generation vs. HIP backend despite ~100 GB/s bandwidth.  
  🔗 [Issue #26663](https://github.com/ggml-org/llama.cpp/issues/26663) *(Medium severity — hardware-specific regression)*

> ⚠️ *Fixes exist for Q8 CPU pinning (PR #29887), but not yet merged. No patch for segfault or CUDA crash as of today.*

---

### **6. What This Means for Application Developers**  
- **Deploying large MoE or vision models?** Use the new K2 Horizon and Cohere2 Vision support — but be cautious with Q8 models on constrained systems due to CPU pinning issues (see #29932).  
- **Optimizing for Blackwell GPUs?** Upgrade to `b11457+` to avoid severe performance regressions in `q4_0/q5_0` quantizations.  
- **Building agents with speculative decoding?** The new `d2t` draft-vocabulary trimming (PR #29143) and MTP support for GLM5Next enable more efficient, compact drafts.  
- **Use GPU-resident MoE caching?** Monitor PR #29887 for stable release — it promises up to 30% improvement in throughput for large MoE models across multi-GPU setups.  
- **Avoid naming tools “call”** — this triggers a segfault until patched.

> 📌 *Best practice: Always test with `-np > 1` and `--spec-draft-n-max 1` to detect speculative decoding edge cases early.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **Ollama Digest — 2026-10-07**

#### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its support for emerging LLM architectures and hardware backends, with key developments in model parsing, renderer resolution, and cloud API proxying. Critical stability issues persist around `clef-flash` and multimodal models on Metal/CUDA, while performance bottlenecks in MLX runner remain a concern for high-end Apple Silicon deployments.

#### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking configuration changes.

#### **3. New Model & Hardware Support**  
- ✅ **K2 Horizon models** now under active request (#18698): Support sought for MBZUAI’s new `k2-horizon` family (0.9B–36B MoE), with official GGUF releases available on Hugging Face.  
- ✅ **Golem framework integration** added to community tools (#18816): Open-source Go framework for AI agents now officially supported via Ollama’s `/v1` endpoint.  
- ✅ **EmbeddingGemma2Model** implemented on MLX runner (#18820): Adds multimodal embedding support with shared vision/audio towers and mean-pool + L2 output.  
- ⚠️ **GSQ-RCO quantization** fails despite architecture support (#18817): `Qwen3.8-Flash-Next` with GSQ-RCO quantization triggers "unsupported tensor size overflows" error—requires investigation.

#### **4. Performance & Optimization**  
- 🔥 **MLX runner inefficiency**: `gemma4:26b-mlx-bf16` decodes at only ~1 tok/s on M2 Ultra (192GB), with GPU idle ~96% per step; command-buffer submit latency suspected (#18823).  
- 📉 **Context handling inefficiencies**: `num_ctx` from Modelfile not enforced on MLX runner, leading to Metal watchdog panics during long prefill phases (#18125).  
- 🚀 **Speculative decoding** requested as a feature: High-impact performance enhancement (already in llama.cpp) is being considered for Ollama (#5800).  
- 🧪 **Profiling improvements**: Enhanced `bench.go` tooling now supports direct runner profiling (mlx/gguf) for deeper GPU-level diagnostics (#16611).

#### **5. Stability & Regressions**  
High-severity issues reported today:  
- ❌ **`clef-flash` crashes on `/v1/systemone`**: Consistent `Clef: non-finite logit` (HTTP 500) on both CUDA and CPU, even after full reinstall (#18769, #18815). The same model works fine on `/v1/chat/completions`.  
- ❌ **Multi-model crash in `llama-server`**: Segfault (`SIGSEGV`) during `clip_encode` when loading `qwen3-vl:8b` alongside another large model on two GPUs (#18821).  
- ❌ **Duplicate model entries post-migration**: After local compat GGUF migration, `ollama list` shows duplicate entries and a bogus `llamacpp:<sha>` tag (#18830).  
- ❌ **MLX runner uses only partial GPU**: On M4 Pro, `qwen3.8:27b-mxfp8` fails to utilize full GPU capacity despite sufficient memory (#18754).  

> *Fix PRs exist for some regressions:*  
> - #18827 resolves gemma4-small renderer misclassification for 11.9B models (#18824).  
> - #18818 fixes Windows "View Logs" crash due to unquoted paths (#10915).  
> - #18813 improves disk-full error reporting during blob download (#18644).

#### **6. What This Means for Application Developers**  
- Avoid using `clef-flash` on `/v1/systemone` until the `non-finite logit` issue is resolved—use `/v1/chat/completions` instead.  
- Be cautious with GSQ-RCO quantized models—they may fail silently despite correct architecture. Verify compatibility before deployment.  
- For Apple Silicon users: Expect suboptimal performance with `mlx-bf16` builds; consider switching to GGUF or lower-precision variants until #18823 is addressed.  
- Leverage the new `EmbeddingGemma2Model` support for multimodal embeddings in agent workflows.  
- Use `--force` flag cautiously with large models; future versions may enforce pull rejection by default (#18243).  
- Monitor for duplicate model tags and inconsistent renderer selection—especially with name-free model naming conventions.

🔗 [GitHub Issues](https://github.com/ollama/ollama/issues) | [Pull Requests](https://github.com/ollama/ollama/pulls)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-07**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem is accelerating its shift toward a high-performance, Rust-based inference gateway with the launch of the **Rust Migration initiative (#31263)**—aiming for sub-1ms overheads and enabling ultra-low-latency model serving. Concurrently, significant progress has been made in **proxy stability**, **cost accounting integrity**, and **observability enforcement**, including mandatory trace IDs per team and improved handling of streaming edge cases.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, the ongoing **Rust migration (#31263)** signals a major architectural shift that may introduce breaking changes in future releases. Early adopters are encouraged to join the [Beta Tester Group](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...) to provide feedback ahead of public rollout.

---

### **3. New Model & Hardware Support**  
*No new models or hardware backends announced today.*  
The project continues to expand support for **MCP tool passthrough**, with recent PRs like [#38952](https://github.com/BerriAI/litellm/pull/38952) adding YAML OpenAPI spec parsing for MCP registries—improving compatibility with declarative tool configurations.

---

### **4. Performance & Optimization**  
- **Rust Gateway Initiative**: The core effort to migrate LiteLLM to Rust is underway ([#31263](https://github.com/BerriAI/litellm/issues/31263)), targeting **sub-1ms overheads** and improved memory safety. Initial work includes typed LLM payloads ([#44669](https://github.com/BerriAI/litellm/pull/44669)) and optimized router behavior.
- **Cost Estimation & Caching**: PRs like [#44948](https://github.com/BerriAI/litellm/pull/44948) enhance cross-provider baseline cache history estimation, improving reuse and reducing redundant cost calculations.
- **SDK Optimization**: Refactor efforts ([#44447](https://github.com/BerriAI/litellm/pull/44447), [#44446](https://github.com/BerriAI/litellm/pull/44446)) decouple AWS and tokenizer dependencies, enabling leaner SDK installations and faster cold starts.

---

### **5. Stability & Regressions**  
High-severity issues remain active, primarily around **cost tracking**, **streaming correctness**, and **concurrency bugs**:

| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#31263](https://github.com/BerriAI/litellm/issues/31263) | Critical | Rust migration in progress — potential impact on existing deployments | In progress |
| [#44535](https://github.com/BerriAI/litellm/issues/44535) | High | Anthropic responses missing `usage` cause retry loops and HTTP 500s | No fix yet |
| [#44154](https://github.com/BerriAI/litellm/issues/44154) | High | Background health checks misattribute results across models | Closed as "not planned" (related: #19758) |
| [#25429](https://github.com/BerriAI/litellm/issues/25429) | High | ChatGPT/gpt-5.4 returns empty final response; completion bridge fails | No fix yet |
| [#25260](https://github.com/BerriAI/litellm/issues/25260) | Medium | Prisma query engine crashes on Windows after pip install | Affects 1.82.x–1.83.0; workaround: revert to 1.81.16 |
| [#44546](https://github.com/BerriAI/litellm/issues/44546) | Medium | `aspeech` calls Gemini TTS twice → double billing | Fix PR pending |

> 🔍 *Note*: Several issues relate to **budgeting, caching, and concurrency**—critical for production-grade systems.

---

### **6. What This Means for Application Developers**  
- **Adopt caution with `gpt-5.4` and non-streaming `chatgpt/*` routes**—known regressions may break production workflows until resolved ([#25429](https://github.com/BerriAI/litellm/issues/25429), [#37039](https://github.com/BerriAI/litellm/issues/37039)).
- **Enable trace ID enforcement** via new proxy setting (`require_trace_id`) ([#44933](https://github.com/BerriAI/litellm/pull/44933)) to ensure observability and auditability in multi-team environments.
- **Prepare for upcoming Rust migration**—this will reshape performance characteristics and may require re-evaluation of deployment patterns. Join the [early access group](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...) for updates.
- **Use `denied_passthrough_routes`** ([#44924](https://github.com/BerriAI/litellm/pull/44924)) to fine-grain access control for custom endpoints without relying solely on allowlists.

👉 *Best practice*: Monitor the [LiteLLM Blog](https://docs.litellm.ai/blog/) for migration guides and stability reports ahead of next major release.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-07**

---

### **1. Today's Highlights**  
Unsloth v0.1.903-beta introduces a new in-app browser and voice cloning capabilities, enhancing local AI agent workflows with integrated web access and multimodal audio support. Key UX improvements include better API visibility (LAN address display), improved model loading behavior, and fixes for critical desktop app issues on macOS and Linux.

---

### **2. Releases & Breaking Changes**  
- **v0.1.903-beta**: Adds browser integration (for file/web page viewing alongside chat), supports Google’s [EmbeddingGemma 2](https://unsloth.ai/docs/models/embeddinggemma-2), and enhances audio functionality via new Voice pages.  
- **macOS Installer Fix**: PR [#12917](https://github.com/unslothai/unsloth/pull/12917) ensures `llama-fit-params` is executable post-install, resolving context truncation from 262k to 8k due to incorrect permissions (see #12901).  
- **CI/CD Improvements**: PRs [#12899](https://github.com/unslothai/unsloth/pull/12899) parallelize shell suite and browser checks, reducing CI runtime significantly.

---

### **3. New Model & Hardware Support**  
- **New Models**:  
  - [EmbeddingGemma 2](https://unsloth.ai/docs/models/embeddinggemma-2): Google’s latest multimodal embedding model now natively supported in `FastSentenceTransformer`.  
  - GigaAM (GGUF): Multiple quantization variants now selectable via Voice Settings (#12900).  
- **Hardware & Backend**:  
  - **AMD RDNA1 (gfx1010)**: Experimental training support confirmed on Windows (PR #11614); limited by lack of Triton dot product kernels.  
  - **Intel GPU Pinning**: Documented in issue #12836; required for installation on Intel GPUs without auto-detection.  
  - **ARM64**: Fixed mislabeled Linux ARM64 builds (PR #12680); now correctly distributed.

---

### **4. Performance & Optimization**  
- **Latency & Throughput**:  
  - Improved handling of large text inputs via auto-chunking (tracked in #12369), preventing “Message too long” errors.  
  - PRs [#12915](https://github.com/unslothai/unsloth/pull/12915) and [#12909](https://github.com/unslothai/unsloth/pull/12909) ensure correct sequence length handling and proper column parsing during vision dataset training.  
- **Memory & Kernel**:  
  - Fixed silent GPU picker override via `UUID-form CUDA_VISIBLE_DEVICES` (issue #8873).  
  - Image LoRA training now preserves transparency in PNG/WebP files (PR #12908).

---

### **5. Stability & Regressions**  
- **Critical**:  
  - **Model Unload Freeze** (#12592): Stop button freezes after model unload; ongoing investigation.  
  - **FP8 Pre-Quantization Crash** (#12860): Windows FP8 text-encoder pre-quantization can exhaust commit limit (error 1455), leading to shard load failures.  
- **UI/UX**:  
  - **Live Monitor Overlap** (#12623): Z-index collision between Live Monitor and download popovers — fixed via PR #12904.  
  - **Window Resize Issues**: AppImage on Wayland/GNOME (Arch) fails to resize (PR #12845); desktop app on Linux/Kubuntu also reports resize problems (PR #12862).  
- **Fixes Merged**:  
  - #12917 (executable `llama-fit-params`)  
  - #12904 (live monitor background in light mode)  
  - #12891 (new badge for Audio tab)

---

### **6. What This Means for Application Developers**  
- **Build Reliable Agents**: With the new browser and voice cloning features, developers can build fully local, multimodal agents that browse, transcribe, clone voices, and interact with real-time web content—no cloud dependency.  
- **Enhanced Model Management**: Use `FastLanguageModel.get_peft_model()` with MiCA support (feature request #6730) once merged into PEFT; prepare for future LoRA-compatible fine-tuning workflows.  
- **Avoid Installation Pitfalls**: Explicitly pin Intel GPU drivers or use documented workarounds (issue #12836); ensure macOS install scripts run with proper file permissions (`chmod +x`).  
- **API Integration**: Leverage updated API endpoints (e.g., `/v1/audio/run`, `/v1/decision`) with full documentation in Settings → API cards (PR #12821, #12916).  
- **Training Robustness**: When training on vision datasets, verify column names are properly mapped (PR #12909); avoid losing question prompts in training data.

> 🔗 **Key Resources**:  
> - [Unsloth Studio Docs](https://unsloth.ai/docs/new/studio/install)  
> - [ModelScope Integration Request](https://github.com/unslothai/unsloth/issues/9117)  
> - [Chinese Mirror Proposal](https://github.com/unslothai/unsloth/issues/12041)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*