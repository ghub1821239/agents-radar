# Hugging Face Trending Models Weekly 2026-09-21

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-21 00:28 UTC

---

---

### **Today's Highlights**

Qwen’s dominance continues across multiple modalities, with **Qwen3.8-27B** and its variants leading in both likes and downloads—especially the GGUF-quantized versions from **unsloth** and **ISTA-DASLab**, which have seen massive adoption due to optimized inference on consumer hardware. The rise of **Lightricks/LTX-2.5** and **MiniMaxAI/MiniMax-H3** signals strong momentum in image-to-video and multimodal video generation, fueled by diffusion-based single-file models. Meanwhile, **prism-ml’s Ternary-Bonsai-2-27B-gguf** stands out as a breakthrough in ultra-low-bit quantization (2-bit ternary), enabling high-performance LLMs on edge devices. Finally, the proliferation of uncensored, turbo-charged fine-tunes—like DavidAU’s 100+ parameter-laden Qwen variant—reflects growing demand for unfiltered, high-speed AI agents.

---

### **Trending Models**

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,861 | 7,331,932 | A highly capable conversational LLM with strong multimodal readiness; drives massive community engagement due to open weights and broad use cases. |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,769 | 5,910,102 | The most widely adopted LLM in this list; trusted for reliability and performance in instruction-following tasks across research and production. |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 3,549 | 76,669 | A large-scale MoE model leveraging Qwen3.5-MoE architecture with lightweight inference via MLX; ideal for Apple Silicon deployment. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,552 | 1,609,559 | A diffusion-based image-to-video model with single-file packaging; rapidly gaining traction for real-time creative workflows. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,525 | 4,057,444 | One of the top-performing text-to-video and image-to-video models; optimized for speed and coherence in dynamic visual generation. |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 740 | 183 | A next-gen image-generation model under active development; leverages Diffusers and safetensors for efficient training and deployment. |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 915 | 17,403 | A compact, agentic audio generator with symbolic planning and editing capabilities; notable for music generation with structured control. |

#### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) | harshatheg | 476 | 0 | A tiny but powerful model with constrained decoding and parallel inference; tailored for Apple Silicon and structured output applications. |
| [AlexWortega/openjev](https://huggingface.co/AlexWortega/openjev) | AlexWortega | 314 | 0 | A cross-encoder NLI model fine-tuned on Qwen3.5 data; promising for semantic similarity and reasoning tasks in low-resource settings. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,428 | 6,941,478 | The most downloaded quantized model on Hub—optimized for llama.cpp with mixed-precision GGUF; enables fast, local inference on laptops. |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,494 | 1,908,396 | First major 2-bit ternary quantization of a 27B model; achieves near-full precision at extreme compression—ideal for edge AI. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,002 | 1,301,417 | A hyper-extended, uncensored fine-tune with over 100 specialized sub-tokens; popular among AI enthusiasts seeking maximal freedom and speed. |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 189 | 42,965 | Combines GSQ and RCO quantization for memory efficiency and speed; part of a growing trend toward hybrid mixed-precision techniques. |

---

### **Ecosystem Signal**

As of September 2026, **Qwen** has emerged as the dominant open-weight ecosystem leader, with **Qwen3.8-27B** and its derivatives powering nearly half the top-tier models across text, image-text, and video domains. Its success is amplified by widespread community adoption of GGUF and safetensors formats, particularly through **unsloth** and **ISTA-DASLab**, who are pushing the boundaries of quantization efficiency. Notably, **ternary quantization** (e.g., *prism-ml/Ternary-Bonsai*) marks a paradigm shift toward ultra-low-bit inference without sacrificing usability—critical for edge deployment. The surge in **uncensored**, **turbo-optimized**, and **multi-token fine-tunes** reflects a maturing user base demanding customizable, high-performance agents beyond standard instruction tuning. While proprietary models like DeepSeek-V4.1 remain competitive, the open-weight trend remains robust, especially in multimodal generation where Hugging Face serves as the central hub for innovation.

---

### **Worth Exploring**

1. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)** – This 2-bit ternary model redefines what’s possible in model compression. Ideal for developers targeting mobile or embedded systems with minimal compute.  
2. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – The most downloaded model on HF; perfect for testing local inference with maximum speed and lowest latency using llama.cpp.  
3. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – A cutting-edge image-to-video model packaged as a single file; essential for creators exploring generative video pipelines with minimal setup.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*