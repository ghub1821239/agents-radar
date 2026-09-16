# AI Infrastructure Digest 2026-09-16

> Generated: 2026-09-16 00:46 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-16**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *heterogeneous specialization*, where projects are diverging in focus: high-throughput, low-latency engines (vLLM, SGLang) target large-scale deployment; lightweight runtimes (llama.cpp, Ollama) dominate edge and local inference; gateways (LiteLLM) consolidate multi-provider workflows; and fine-tuning platforms (Unsloth) optimize training pipelines. Today’s activity reflects growing maturity in long-context handling, MoE scalability, and cross-hardware support—particularly for Intel XPU, AMD MI300/MI355, and Apple Silicon. Critical stability issues persist across all layers, signaling that production readiness remains a moving target.

---

### **2. Activity Comparison**

| Project       | Issues Open (Today) | PRs Merged (Today) | Release Status         |
|---------------|---------------------|--------------------|------------------------|
| **vLLM**      | 18                  | 7                  | No new release         |
| **SGLang**    | 14                  | 6                  | No new release         |
| **llama.cpp** | 15                  | 5                  | No new tagged release  |
| **Ollama**    | 12                  | 6                  | v0.34.2-rc0 (patch)    |
| **LiteLLM**   | 10                  | 5                  | v1.101.0 (security fix)|
| **Unsloth**   | 12                  | 4                  | No new release         |

> 🔍 *Observation*: vLLM leads in issue volume due to aggressive feature expansion (MoE, hybrid models). LiteLLM stands out with a security-focused release despite lower activity. Ollama’s RC release signals near-term production readiness.

---

### **3. Model Support Race**

| New Model / Architecture        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| Qwen3.8-27B (GDN/Mamba hybrid)   | ✅   | ⚠️     | ❌        | ❌     | ❌      | ❌      |
| DeepSeek-V4.1-Flash              | ✅   | ✅     | ✅        | ❌     | ❌      | ❌      |
| LongCat-Flash-Lite (embedding-opt)| ✅   | ❌     | ❌        | ❌     | ❌      | ❌      |
| Gluon MegaMoE (multi-node MoE)   | ❌   | ✅ (RFC)| ❌        | ❌     | ❌      | ❌      |
| SenseNova-U1/U1.5                | ❌   | ✅ (tracking) | ❌ | ❌     | ❌      | ❌      |
| DFlash2 draft models             | ❌   | ❌     | ✅ (SYCL) | ❌     | ❌      | ✅ (in progress) |

> 🏆 **Leader**: **vLLM** leads in cutting-edge model integration, particularly for hybrid architectures like Qwen3.8.  
> 🚀 **Emerging Player**: **SGLang** is rapidly expanding MoE and multi-node support, positioning itself as a future leader in scalable serving.  
> 🛠️ **Edge Focus**: **llama.cpp** dominates niche hardware (Hexagon, Vulkan, SYCL), enabling inference on ARM and embedded devices.

---

### **4. Performance Frontier**

| Optimization Focus          | vLLM                          | SGLang                         | llama.cpp                     | Ollama                    | LiteLLM                   | Unsloth               |
|------------------------------|-------------------------------|--------------------------------|-------------------------------|---------------------------|---------------------------|-----------------------|
| **KV Cache Efficiency**      | UltraQuant 4-bit (new)        | HiCache + unified radix tree   | Sparse FA (Vulkan)            | N/A                       | N/A                       | Metal context budgeting |
| **Batching & Parallelism**   | Batch-invariant MoE + async TP| Native 16-head attention (TP4)| MMQ pipelining (ROCm)         | Structured output pass    | Cost rollup aggregation   | TRL GRPOTrainer fixes |
| **Quantization & Kernel Fusion** | AWQ + GEMM fusion (batch-inv) | Hopper FP8 matmul tuning       | Hexagon DMA + AVX-512 safety  | MLX memory budgeting      | Token reconciliation      | Torch 2.10.0 conflict |
| **Distributed Serving**      | MoE expert offloading         | PD disaggregation + DCP        | N/A                           | N/A                       | MCP tool guardrails       | Multi-GPU training    |
| **Kernel-Level Optimization**| Fused kernel routing (Intel XPU)| JIT cooperative DSA top-k (AMD)| Generic ssm_scan (OpenCL)     | N/A                       | Streaming error recovery  | FlashAttention compatibility |

> 🔥 **Hotspots**:  
> - **KV cache optimization** is now a core battleground (vLLM’s UltraQuant vs. SGLang’s HiCache).  
> - **Hybrid model support** (Mamba/GDN) drives innovation in speculative decoding and MoE routing.  
> - **Hardware-specific kernels** (Hexagon DMA, AMD DSA, ROCm MMQ) are critical differentiators.

---

### **5. Layer Positioning**

| Project       | Primary Layer             | Key Differentiator                                  |
|---------------|----------------------------|------------------------------------------------------|
| **vLLM**      | Inference Engine           | High-throughput, long-context, MoE-native serving   |
| **SGLang**    | Distributed Inference Engine | Disaggregated serving, PD+DCP, hierarchical caching |
| **llama.cpp** | Local Runtime              | Cross-platform, bare-metal, edge-optimized kernels |
| **Ollama**    | Developer Gateway / CLI    | Unified UX, structured outputs, agent-ready pipeline |
| **LiteLLM**   | LLM Gateway & Orchestrator | Multi-provider routing, cost tracking, guardrails   |
| **Unsloth**   | Fine-Tuning & Training Stack | RLHF acceleration, Studio UI, model persistence    |

> 💡 **Strategic Insight**: The ecosystem is bifurcating into *production-grade engines* (vLLM/SGLang), *developer-facing tools* (Ollama/LiteLLM), and *training-specific stacks* (Unsloth)—with **llama.cpp** uniquely bridging the gap between runtime and edge.

---

### **6. Trend Signals**

#### **Key Industry Trends Extracted from Today’s Activity:**
1. **Long-Context Is Now a Feature, Not a Bug**  
   → UltraQuant 4-bit KV cache (vLLM), sparse Flash Attention (llama.cpp), and improved context handling (Unsloth) show that efficient long-context inference is no longer experimental—it’s table stakes.

2. **MoE and Hybrid Models Are Driving Complexity**  
   → MoE correctness issues (vLLM #57092), speculative decoding divergence (llama.cpp #25618), and Gluon MegaMoE RFCs (SGLang) indicate that next-gen models are pushing the limits of deterministic inference and distributed routing.

3. **Hardware Fragmentation Demands Specialized Kernels**  
   → Projects are investing heavily in backend-specific optimizations: Intel XPU (vLLM), AMD MI355X (SGLang), Hexagon (llama.cpp), and Apple Silicon (Unsloth). This signals a move toward *hardware-aware* inference engines.

4. **Security and Observability Are Non-Negotiable in Production**  
   → LiteLLM’s cosign-signed images and cost-tracking fixes reflect rising enterprise demands for auditability, supply chain integrity, and financial transparency.

5. **Agent Workflows Are Becoming the Testbed for Stability**  
   → Silent crashes (Ollama macOS GUI), token corruption (Intel XPU), and stream failures (LiteLLM) reveal that agent pipelines are exposing deep reliability gaps in infrastructure.

#### **What Application Developers Should Watch:**
- ✅ **Avoid `VLLM_BATCH_INVARIANT=1`** with MoE or sequence parallelism—correctness is broken.
- ✅ **Monitor speculative decoding at scale**—it can degrade performance beyond ~100k tokens (vLLM/SGLang).
- ✅ **Use `--cpu-memory-utilization`** instead of `--gpu-memory-utilization` for consistent debugging.
- ✅ **Verify image signatures** (LiteLLM) and test structured outputs early (Ollama).
- ✅ **Prepare for model persistence and Docker state management**—critical for production agents (Unsloth #10923).

> 📌 **Bottom Line**: The AI infrastructure stack is maturing—but only through careful validation. Choose your stack not just by speed, but by *stability under stress*.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-16

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its focus on **long-context, multi-modal, and heterogeneous hardware support**, with key PRs enabling UltraQuant 4-bit KV caching for long-context inference and critical fixes for Intel XPU and ROCm stability. Notably, a high-severity regression in MoE expert offloading under `VLLM_BATCH_INVARIANT=1` was identified and addressed via PR #57092, while ongoing work on speculative decoding correctness for hybrid Mamba/GDN models (e.g., Qwen3.8) remains urgent.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several **configuration and API-related changes are in motion**:  
- `--cpu-memory-utilization` is being introduced as an alias for `--gpu-memory-utilization` to reduce confusion when running CPU-only or mixed-mode inference ([PR #56547](https://github.com/vllm-project/vllm/pull/56547)).  
- The experimental **Rust frontend** (`VLLM_USE_RUST_FRONTEND=1`) is nearing feature parity but remains incomplete ([Issue #44280](https://github.com/vllm-project/vllm/issues/44280)).

---

### **3. New Model & Hardware Support**  
- **UltraQuant 4-bit KV cache backend** added for long-context serving, targeting models where KV cache is the primary memory bottleneck ([PR #57057](https://github.com/vllm-project/vllm/pull/57057)).  
- **Intel XPU (Arc B70)**: Critical bugfixes for Qwen models with W4A16 quantization and audio processing ([PR #56912](https://github.com/vllm-project/vllm/pull/56912), [PR #52262](https://github.com/vllm-project/vllm/pull/52262)), though persistent output corruption remains ([Issue #53480](https://github.com/vllm-project/vllm/issues/53480)).  
- **ROCm (MI300/MI355)**: CI infrastructure expanded with single-GPU gating and opt-in "TheRock" builds for AMD testing ([PR #57080](https://github.com/vllm-project/vllm/pull/57080), [PR #56351](https://github.com/vllm-project/vllm/pull/56351)).  
- **New model support**: Qwen3.8-27B (hybrid GDN/Mamba), DeepSeek-V4.1-Flash, and LongCat-Flash-Lite (embedding-level optimization) are under active development ([Issue #33528](https://github.com/vllm-project/vllm/issues/33528)).

---

### **4. Performance & Optimization**  
- **~55% decode latency reduction** on Qwen3.5-9B on Intel XPU via fused kernel routing ([PR #56096](https://github.com/vllm-project/vllm/pull/56096)).  
- **AWQ dequant + GEMM fusion** under batch-invariant mode on SM89 reduces memory overhead and improves throughput by avoiding full FP16 weight materialization ([PR #57047](https://github.com/vllm-project/vllm/pull/57047)).  
- **Speculative decoding performance**: DFlash shows strong gains at short context (~218 tok/s at DT=8) but becomes a net slowdown at long context (~185k tokens) due to inefficient KV re-scanning ([Issue #54691](https://github.com/vllm-project/vllm/issues/54691)).  
- **MoE optimization**: Incremental expert offloading with GPU cache + async pipeline enables larger models on smaller hardware ([Issue #38256](https://github.com/vllm-project/vllm/issues/38256)).

---

### **5. Stability & Regressions**  
High-priority issues reported today include:  
- **Batch invariance broken** with sequence parallelism + async TP enabled (`VLLM_BATCH_INVARIANT=1` + `enable_sp`) → non-deterministic outputs ([Issue #56370](https://github.com/vllm-project/vllm/issues/56370)).  
- **MoE online FP8 experts not batch-invariant** → output varies based on batch composition ([Issue #57092](https://github.com/vllm-project/vllm/issues/57092)) → fixed in PR #57092.  
- **GLM-5.3-Flash degenerates into "word salad"** during multi-turn agentic use ([Issue #56605](https://github.com/vllm-project/vllm/issues/56605)).  
- **Silent token corruption** (endless "!" tokens) on Intel Arc B70 under sustained concurrent decode ([Issue #53480](https://github.com/vllm-project/vllm/issues/53480)).  
- **Sleep/wake crashes** on DGX Spark (GB10) with unified memory, even without FP8 KV cache ([Issue #50011](https://github.com/vllm-project/vllm/issues/50011)).  

> ✅ *Fix PRs exist for #57092 and #56370; others remain open.*

---

### **6. What This Means for Application Developers**  
- **Avoid `VLLM_BATCH_INVARIANT=1`** if you rely on deterministic outputs with MoE models or sequence parallelism—this setting currently breaks correctness.  
- **Use `--cpu-memory-utilization`** instead of `--gpu-memory-utilization` when debugging CPU/memory usage across platforms.  
- **Be cautious with speculative decoding on long-context hybrid models** (e.g., Qwen3.8) — DFlash may hurt rather than help beyond ~100k tokens.  
- **Monitor Intel XPU deployments closely** — silent corruption and memory leaks are still present in production workflows.  
- **Leverage emerging features like UltraQuant 4-bit KV cache** for cost-efficient long-context agents, but test thoroughly for consistency.  
- **Prepare for Rust frontend adoption** — it’s experimental but gaining traction; expect future API parity and better performance on low-latency systems.

---  
*Data source: [vllm-project/vllm GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-16

---

### **1. Today's Highlights**  
SGLang continues its aggressive push toward high-performance, multi-node inference with significant progress in kernel-level optimizations and disaggregated serving. Key developments include the integration of a new JIT-cooperative DSA top-k kernel for AMD ROCm, enhancements to HiCache observability and hybrid model support, and critical bugfixes for MoE routing and decode retraction on PD-disaggregated systems. The project is also stabilizing core infrastructure through unified radix cache synchronization and improved CI resilience.

---

### **2. Releases & Breaking Changes**  
None. No new releases were published in the last 24 hours.  

However, ongoing work includes:
- **[RFC] Sync Rust TreeCore and use it by default** ([PR #39627](https://github.com/sgl-project/sglang/pull/39627)) — This provisional change aims to unify the tree core implementation across Python and Rust, with potential implications for future binary compatibility and performance tuning.

---

### **3. New Model & Hardware Support**  
- **SenseNova-U1 / U1.5** support tracking initiated ([Issue #37742](https://github.com/sgl-project/sglang/issues/37742)) — The roadmap now tracks feature parity with OpenSenseNova/SenseNova-U1, enabling future deployment on this emerging Chinese LLM stack.
- **AMD MI355X** — Updated HiCache cookbook alignment with `--hicache-io-backend kernel` and `--hicache-mem-layout page_first` ([PR #39572](https://github.com/sgl-project/sglang/pull/39572)), improving compatibility with InferenceX’s latest inference runtime.
- **Gluon MegaMoE** — RFC submitted for integration with full multi-node support ([Issue #38334](https://github.com/sgl-project/sglang/issues/38334)), marking a major step toward scalable MoE serving.

---

### **4. Performance & Optimization**  
- **~3x faster KDA decode state transpose** via CuTe DSL coalescing ([PR #39680](https://github.com/sgl-project/sglang/pull/39680)) — Achieves bit-identical output with substantial latency reduction on large-batch decoding.
- **Native 16-head attention for DeepSeek-V4.1 TP4** ([PR #39674](https://github.com/sgl-project/sglang/pull/39674)) — Eliminates unnecessary padding in small decode batches, improving parallelism and reducing memory pressure.
- **Hopper FP8 matmul kernels & tuning** ([PR #39657](https://github.com/sgl-project/sglang/pull/39657)) — Adds optimized block-FP8 GEMMs with SWAP_AB/SPLIT_K support and 7 H200-tuned configurations, enabling better utilization on Blackwell-era hardware.
- **JIT cooperative DSA top-k for AMD** ([PR #39673](https://github.com/sgl-project/sglang/pull/39673)) — Enables dynamic, high-throughput top-k selection up to 4096 elements with raw-index output support.

---

### **5. Stability & Regressions**  
**Critical Crashes & Bugs:**  
1. **CUDA illegal memory access in QSA extend forward at 8 concurrent requests** ([Issue #37633](https://github.com/sgl-project/sglang/issues/37633)) — Affects H20 TP8 deployments using Qwen3.8-Flash-Next-FP8; crash suppressed only by `CUDA_LAUNCH_BLOCKING=1` or disabling overlap scheduling. Root cause remains unconfirmed.  
2. **GLM-5.3-Flash crashes on startup with `flashinfer_trtllm` MoE runner** ([Issue #36711](https://github.com/sgl-project/sglang/issues/36711)) — Index error during weight loading when `disable_shared_experts_fusion` is forced.  
3. **Decode retraction crashes with CUDA device-side assert** ([Issue #38645](https://github.com/sgl-project/sglang/issues/38645)) — Occurs under PD disaggregation with DCP > 1 due to index-space mismatch during KV backup.  

**Performance Regressions:**  
- **~4% DeepSeek-R1 NVFP4 decode regression on Blackwell** despite faster standalone kernel ([Issue #38628](https://github.com/sgl-project/sglang/issues/38628)) — Caused by replacing `dsv3_router_gemm` with `tiny_gemm`; not yet fixed by revert due to broader correctness implications.

---

### **6. What This Means for Application Developers**  
- **Deploying MoE models?** Be cautious with `--moe-runner-backend flashinfer_trtllm` on models like GLM-5.3-Flash or Qwen3.5-MoE — known crashes may affect stability. Use `flashinfer_cutedsl` as alternative if needed.  
- **Using PD-disaggregation?** Avoid `DCP > 1` with `--enable-hierarchical-cache` until fix PRs land (e.g., #38634). Also monitor decode retraction behavior under high concurrency.  
- **Optimizing for AMD?** Leverage the new JIT DSA top-k and updated HiCache layouts for MI355X — expect better throughput and lower latency in streaming scenarios.  
- **Building agents on SGLang?** Expect tighter control over KV cache management and hierarchical caching via upcoming unified radix tree changes. Monitor [Issue #39499](https://github.com/sgl-project/sglang/issues/39499) for dLLM serving roadmap updates.  

> 💡 **Actionable Tip**: For production stability, avoid `--disable-overlap-schedule` and `CUDA_LAUNCH_BLOCKING=1` unless debugging — they mask deeper issues but degrade throughput.

---  
*Data source: [sgl-project/sglang](https://github.com/sgl-project/sglang), 2026-09-16*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-16**

---

### **1. Today's Highlights**  
The latest updates focus on backend-specific performance optimizations and stability fixes, particularly for Hexagon, Vulkan, and HIP/ROCm. Key improvements include restoring contiguous memory paths in Hexagon, enabling sparse Flash Attention on Vulkan, and refining speculative decoding behavior across multiple backends. A critical scheduler hash set fix prevents crashes during speculative inference.

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published today. However, the following commits are notable:  
- `b10991`: Restores missing contiguous fast-path and `hvx_copy_uu` in Hexagon backend (#28886)  
- `b10990`: Uses DMA for contiguous `src/dst` in Hexagon (`hex-cpy`) (#28906)  
- `b10989`: Enables AllReduce for ROCm in HIP backend (#27825)  
- `b10988`: Adds MoE expert matmul selection via batch size for speculative decoding on OpenCL (#27637)  

> 🔗 [GitHub commit b10991](https://github.com/ggml-org/llama.cpp/commit/b10991) | [b10990](https://github.com/ggml-org/llama.cpp/commit/b10990) | [b10989](https://github.com/ggml-org/llama.cpp/commit/b10989) | [b10988](https://github.com/ggml-org/llama.cpp/commit/b10988)

---

### **3. New Model & Hardware Support**  
- **Vulkan**: Added support for **sparse Flash Attention (DSV4/GLM)** with tuning, atomic safety fixes, and CM2 f16 support (#28105).  
- **Hexagon**: Expanded HMX flash-attention to handle non-64-aligned head dimensions (e.g., SigLIP’s head_dim=72), avoiding fallback to slower CPU path (#26539).  
- **OpenCL**: Introduced generic `ssm_scan` kernel for state-space models (#28881).  
- **SYCL**: Experimental support for DFlash2 draft models on dual Intel Arc Pro B70 GPUs (though TDR resets remain an issue; #28778).  

> 🔗 [Vulkan sparse FA](https://github.com/ggml-org/llama.cpp/pull/28105) | [Hexagon HMX head_dim](https://github.com/ggml-org/llama.cpp/pull/26539) | [OpenCL ssm_scan](https://github.com/ggml-org/llama.cpp/pull/28881)

---

### **4. Performance & Optimization**  
- **Hexagon**: DMA-based copy for contiguous tensors improves reshape-heavy model performance (e.g., Qwen3.x) (#28906).  
- **HIP/ROCm**: Optimized MMQ pipelining for RDNA 3.5 by splitting MMA/load tiles to improve latency hiding (#28714); also uses 64-row MMQ tiles for better LDS utilization (#28195).  
- **CUDA**: Tuned MMVQ-to-MMQ crossover point for SM70 (Volta) based on AI-generated benchmarking (#28912).  
- **Vulkan**: Improved `MUL_MAT_ID` tile usage with BN/2 tail handling for small batches (#28923).  
- **RPC**: Hash-cache now only caches weights, reducing network transfer overhead for repeated model loads (#28789).  

> 🔗 [HIP MMQ pipelining](https://github.com/ggml-org/llama.cpp/pull/28714) | [Hexagon DMA](https://github.com/ggml-org/llama.cpp/pull/28906) | [RPC weight caching](https://github.com/ggml-org/llama.cpp/pull/28789)

---

### **5. Stability & Regressions**  
High-severity issues reported today:  
- **Crash on GPU driver TDR reset**: SYCL backend triggers `VIDEO_TDR_TIMEOUT_DETECTED` when loading DFlash2 draft models on dual Intel Arc Pro B70 GPUs (#28778).  
- **GPU crash due to AVX-512**: OpenVINO backend crashes with `STATUS_ILLEGAL_INSTRUCTION` on Intel Core Ultra CPUs (#28726).  
- **KV-cache exhaustion & stall**: DSV4-Flash context reuse leads to GPU memory churn and potential crashes (#25452).  
- **Speculative decoding divergence**: Greedy output differs between quantized (Q4_K_M) and BF16 targets under draft-MTP (#25618).  
- **Scheduler OOM**: Speculative decode graphs exceed fixed-size hash set → assertion failure (#28972 — PR submitted).  

> 🔗 [TDR crash (SYCL)](https://github.com/ggml-org/llama.cpp/issues/28778) | [AVX-512 crash (OpenVINO)](https://github.com/ggml-org/llama.cpp/issues/28726) | [KV-cache exhaustion](https://github.com/ggml-org/llama.cpp/issues/25452) | [Speculative divergence](https://github.com/ggml-org/llama.cpp/issues/25618) | [Scheduler fix PR](https://github.com/ggml-org/llama.cpp/pull/28972)

---

### **6. What This Means for Application Developers**  
- **Use `--spec-draft` cautiously**: Be aware of correctness risks in speculative decoding with quantized models (especially Q4_K_M); monitor output divergence.  
- **Optimize for backend-specific kernels**: Leverage Hexagon DMA and HIP/ROCm MMQ optimizations for better throughput on supported hardware.  
- **Avoid large contexts with draft models**: The `draft-mtp` context sizing bug may cause server crashes at high `--ctx-size` (#28433).  
- **Monitor memory growth**: Some models (e.g., qwen4_exp) show unbounded RSS+swap growth during chat sessions — consider periodic restarts or memory profiling.  
- **Prepare for API evolution**: Public C API exposure for speculative decoding is being tracked (#27469); expect future bindings to expose MTP/draft features directly.

> 🔗 [Feature request: MTP in C API](https://github.com/ggml-org/llama.cpp/issues/27469) | [Memory growth issue](https://github.com/ggml-org/llama.cpp/issues/28933)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-16**

---

### **1. Today's Highlights**  
The latest release, `v0.34.2-rc0`, includes critical updates to `llama.cpp` and addresses multiple stability issues affecting high-context inference on Jetson devices and macOS GUI clients. Key improvements focus on structured output correctness for reasoning models (especially MLX) and better handling of cloud stream failures—critical for agent workflows.

---

### **2. Releases & Breaking Changes**  
- **v0.34.2-rc0**: Primary update is a `llama.cpp` version bump (b10969), resolving symbol conflicts in CUDA builds. No breaking API changes reported.  
  🔗 [Full Changelog](https://github.com/ollama/ollama/compare/v0.34.1...v0.34.2-rc0)

---

### **3. New Model & Hardware Support**  
- **Qualcomm IQ-9075 NPU/GPU** support requested via #18445 — pending implementation; relevant for edge devices using Dragonwing™ platforms (e.g., Raxda Fogwise Airbeam).  
- **Vulkan backend now enabled on Linux ARM64** via PR #18466 — resolves prior omission in Docker images and enables GPU inference on Apple Silicon and ARM-based embedded systems.  
  🔗 [PR #18466](https://github.com/ollama/ollama/pull/18466)  

> *Note: No new model or quantization format support added today.*

---

### **4. Performance & Optimization**  
- **MLX memory budgeting** introduced via #18481: Allocates 95% of available GPU memory upfront to prevent OOM crashes during model load on CUDA devices.  
- **Structured outputs optimized for thinking models** via PRs #18479 and #18478: Eliminates double prefill by applying grammar parsing in a single pass—reducing latency by ~30–50% for long-chain reasoning tasks.  
- **Cloud stream failure propagation** fixed via #18475 and #18469: Prevents silent hangs when upstream providers truncate responses mid-stream—improves reliability in agentic pipelines.

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| Critical | Jetson Orin Nano 8GB OOM with Gemma 4 E4B using `--load-mode dio` (#18396) | Model fails to load due to multimodal projector memory leak | ✅ PRs in progress (see #18441, #18479) |
| High | Concurrent decode loses EOS in `gemma4:26b` (#18442) | Incomplete generation despite valid prompt | ⚠️ Under investigation |
| High | macOS GUI silently fails after ~6k tokens (#18368) | Long context processing breaks without notification | ❌ No fix yet |
| Medium | MLX: stray `.` prefix in structured output with thinking enabled (#18441) | Invalid JSON output from models like `qwen3.8-27b` | ✅ Fixed in #18459 |
| Medium | Vulkan iGPU runner wedges after cancelled prefill (#18477) | Requests hang indefinitely until restart | ⚠️ Partial mitigation in #18469 |

---

### **6. What This Means for Application Developers**  
- **Use `--load-mode dio` cautiously on Jetson devices**—it may trigger OOMs even with sufficient RAM due to unified memory fragmentation. Prefer `cpu` or `mixed` modes for Gemma 4 E4B.
- **Enable structured outputs with reasoning models safely**—the new single-pass logic reduces overhead and improves predictability. Avoid `format` + `thinking` unless you’ve verified the model supports it.
- **Monitor cloud integrations closely**—if using Claude or other external providers, ensure your client handles partial stream truncation (`http.ErrAbortHandler`) to avoid hanging requests.
- **Update to `v0.34.2` early** if deploying on ARM64 or using MLX/CUDA backends—critical memory safety and stability fixes are included.
- **Avoid `typical_p` parameter**—it’s been deprecated and returns HTTP 400 (see #18480); use `temperature` instead.

> 🛠️ **Recommended Actions**:  
> - Test structured outputs with `qwen3.8-27b`, `gemma4:e4b`, and `llama3.1:8b` on MLX and CUDA.  
> - Verify your agent pipeline handles `stream` interruptions gracefully.  
> - Monitor GitHub for resolution of #18396 (Jetson OOM) and #18477 (Vulkan hang).

🔗 Full issue tracker: [github.com/ollama/ollama/issues](https://github.com/ollama/ollama/issues)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-16**

---

#### **1. Today's Highlights**
The LiteLLM project continues to strengthen its enterprise-grade infrastructure with critical fixes for cost tracking, security, and observability. Key updates include enhanced guardrail execution across MCP tool calls, improved response model fidelity for Gemini, and new dashboard controls for capability classifiers. A major focus on stability is evident in multiple PRs addressing streaming edge cases, token billing, and admin UI resilience.

---

#### **2. Releases & Breaking Changes**
- **v1.101.0** released today with a significant emphasis on supply chain security: all Docker images are now signed via [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0), using a consistent key introduced in commit `0112e53`.  
  🔐 **Verify signature**: Use `cosign verify` with the public key from the repo’s `.sigstore` directory.
- No breaking API changes reported in this release cycle.

---

#### **3. New Model & Hardware Support**
- **Gemini**: Response model version (`modelVersion`) is now properly propagated in proxy responses ([PR #41338](https://github.com/BerriAI/litellm/pull/41338)).
- **Fireworks AI**: Reasoning effort fields (previously nested dict) are now flattened to strings, resolving compatibility issues ([PR #41335](https://github.com/BerriAI/litellm/pull/41335)).
- **Cohere v2**: Synthetic tool call index removed from non-streaming responses to prevent rejection during multi-turn tool calling ([PR #41332](https://github.com/BerriAI/litellm/pull/41332)).

> ✅ *Note*: No new hardware backends (CUDA/ROCm/Metal/CPU) or quantization formats added today.

---

#### **4. Performance & Optimization**
- **Cost Tracking Optimization**: Introduced `LiteLLM_DailyGlobalSpend` rollup key-free aggregation to reduce query load on large tenants ([PR #41324](https://github.com/BerriAI/litellm/pull/41324)). This reduces OOM risk and improves dashboard performance at scale.
- **S3 Logging Efficiency**: Added `s3_log_prompts_only` option to avoid storing full responses in S3 when only prompts are needed ([PR #41327](https://github.com/BerriAI/litellm/pull/41327)), reducing storage costs by up to 60% in high-throughput environments.
- **Token Reconciliation**: Streaming `/v1/responses` calls now estimate usage when `usage: null` is received, preventing $0 billing errors ([PR #41337](https://github.com/BerriAI/litellm/pull/41337)).

---

#### **5. Stability & Regressions**
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| `compression_savings_spend` and `prompt_caching_savings_spend` always $0 with cost-based routing and multiple deployments per model | High | Open | N/A |
| Per-customer RPM limits stop applying once virtual key is cached | High | Open | N/A |
| Admin UI sign-in attempts not rate-limited → DoS risk | Medium | Open | [PR #40982](https://github.com/BerriAI/litellm/pull/40982) |
| Dashboard logs flood with ERROR stacktraces for non-admin users | Medium | Open | [PR #30442](https://github.com/BerriAI/litellm/issues/30442) |
| Anthropic stream crashes on `message_delta` without `usage` | High | Open | [PR #41336](https://github.com/BerriAI/litellm/pull/41336) |
| `gemini` response model not updated from `modelVersion` | Medium | Open | [PR #41338](https://github.com/BerriAI/litellm/pull/41338) |

> ⚠️ Critical regression: **Project spend tracking disabled entirely** despite budget enforcement logic being present ([Issue #33871](https://github.com/BerriAI/litellm/issues/33871)) — impacts billing integrity.

---

#### **6. What This Means for Application Developers**
- **Use `s3_log_prompts_only`** if you're logging to S3 and want to avoid unnecessary data retention and compliance overhead.
- **Enable `LiteLLM_DailyGlobalSpend` rollup** if you’re running large-scale inference with many keys/users — it will significantly improve dashboard responsiveness and reduce database strain.
- **Monitor `project_spend` tracking** — current behavior means budgets may be enforced but not logged, leading to audit gaps. Expect a fix soon.
- **Guardrails are now more powerful**: post-MCP tool call guardrails can now run at key/team/policy level ([PR #41334](https://github.com/BerriAI/litellm/pull/41334)), enabling better PII and content control.
- **Avoid relying on `LITELLM_LOG=ERROR`** for suppressing request logs — it doesn’t work as expected ([Issue #10788](https://github.com/BerriAI/litellm/issues/10788)); use custom logging hooks instead.

> 💡 Pro Tip: Always verify Docker image signatures using `cosign verify` — essential for production deployments.

---  
*Digest generated from GitHub data: [BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-09-16**

---

### **1. Today's Highlights**  
The Unsloth project continues to prioritize stability and usability across diverse deployment environments, with several critical fixes for macOS, Windows, and multi-GPU workflows in the Studio UI and backend. A major focus this week is on resolving context budget miscalculations in the Metal backend and improving model persistence in Docker deployments, both of which impact real-world inference reliability.

Notably, a high-severity regression affecting Qwen3.5 training via TRL’s GRPOTrainer has been identified and is under active investigation—this could block RLHF workflows for users leveraging newer models.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, ongoing work in PRs suggests potential breaking changes in:
- **Model caching behavior**: PR #11026 reworks local model cache discovery to avoid reliance on Hugging Face API calls, which may affect offline workflows.
- **Context pricing logic**: PR #11025 ensures Studio honors user-specified context sizes instead of defaulting to measured estimates—impacting cost modeling for long-context applications.

> 🔗 [PR #11026: Read local model cache without HF network dependency](https://github.com/unslothai/unsloth/pull/11026)  
> 🔗 [PR #11025: Honor unmeasured context requests in pricing](https://github.com/unslothai/unsloth/pull/11025)

---

### **3. New Model & Hardware Support**  
- **Qwen3.5 support expanded**: Multiple issues confirm active use with `FastLanguageModel.from_pretrained()` and `GRPOTrainer`, though some edge cases remain (e.g., `apply_rotary_pos_emb` errors).
- **AMD ROCm improvements**: PR #8642 adds fallback decoding via PyAV when `torchcodec` fails to load—critical for audio training on Windows.
- **Metal backend enhancements**: PR #11060 addresses incorrect CPU-mapped embedding budgeting on Apple Silicon (M1/M2/M3), enabling higher effective context lengths on MacBooks with large RAM (e.g., 128GB).

> 🔗 [PR #8642: Fallback audio decoding on Windows](https://github.com/unslothai/unsloth/pull/8642)  
> 🔗 [PR #11060: Fix Metal context budgeting](https://github.com/unslothai/unsloth/pull/11060)

---

### **4. Performance & Optimization**  
- **Memory efficiency gains**: PR #11022 enables proper cleanup of `llama-server` processes on Windows, preventing memory leaks during model reloads—a key fix for long-running inference servers.
- **FlashAttention compatibility**: Issue #4983 highlights that unsloth forces Torch 2.10.0 install, which breaks FlashAttention 2 support; workaround involves manual version pinning or patching.
- **Latency reduction in Studio**: PR #11026 removes unnecessary round-trips to HF.co during local cache reads, reducing startup latency for cached models by ~30% in internal benchmarks.

> 🔗 [Issue #4983: FlashAttention broken due to forced torch==2.10.0](https://github.com/unslothai/unsloth/issues/4983)

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|------|--------|------------|
| 🚨 High | [#3211] Infinite loop with Qwen3 fine-tuning | Occurs after `unsloth-2025.7.1` — reproducible on RTX 4090D | ❌ Open (awaiting confirmation) |
| 🚨 High | [#4801] `RuntimeError: Sizes of tensors must match` in GRPOTrainer | Affects Qwen3.5 + TRL GRPOTrainer with `device_map='auto'` | ❌ Open (under investigation) |
| ⚠️ Medium | [#6276] Segfault in rocm-gfx1151 prebuilt binaries | Bundled ROCm runtime crashes on bare-metal Strix Halo (Ryzen AI MAX+ 395) | ✅ Patched in PR #8642 (fallback) |
| ⚠️ Medium | [#10923] Docker models not persisting | Mounted `/workspace/work` does not capture downloaded models | ❌ Open (documentation gap) |

> 🔗 [Issue #3211: Infinite loop in Qwen3 fine-tuning](https://github.com/unslothai/unsloth/issues/3211)  
> 🔗 [Issue #4801: GRPOTrainer tensor size mismatch](https://github.com/unslothai/unsloth/issues/4801)  
> 🔗 [Issue #10923: Docker model persistence missing](https://github.com/unslothai/unsloth/issues/10923)

---

### **6. What This Means for Application Developers**  
- **For LLM agents & RAG systems**: Avoid using `device_map='auto'` with `GRPOTrainer` and Qwen3.5 until #4801 is resolved—use `device_map="cuda"` as workaround.
- **For developers on Apple Silicon**: Use the latest Studio build to benefit from improved context handling and memory management—especially critical for long-context reasoning.
- **For production inference**: Always mount persistent volumes in Docker containers (e.g., `/models`, `/cache`) to prevent model loss between restarts—documented in #10923.
- **For fine-tuning pipelines**: Be cautious with `unsloth-2025.7.1+` versions when working with Qwen3.5; consider downgrading temporarily if encountering infinite loops.

> ✅ **Recommended action**: Monitor PRs #11025 and #11026 for immediate fixes impacting context length estimation and model persistence. Use `pip install --force-reinstall` to bypass Torch version conflicts until #4983 is addressed.

---  
*Digest compiled from GitHub activity: unslothai/unsloth • 2026-09-16*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*