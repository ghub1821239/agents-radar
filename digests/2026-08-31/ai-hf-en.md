# Hugging Face Trending Models Weekly 2026-08-31

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-31 15:48 UTC

---

---

### **Today's Highlights**

Qwen and GLM continue to dominate Hugging Face’s trending models, with Qwen3.8-27B leading in downloads (4.7M) and Kimi-K3 surging in popularity with 11K likes. The rise of quantized GGUF versions—especially for large models like Qwen3.8-27B and GLM-5.3—signals strong community-driven optimization for local inference. Notably, uncensored and abliterated variants are gaining traction, reflecting demand for more permissive, high-performance models. Meanwhile, MiniMax-H3 emerges as a top performer in video generation, with over 5.3M downloads.

---

### **Trending Models**

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,481 | 158,598 | A fast, lightweight variant of Qwen3.8 optimized for real-time conversational use; part of the growing Flash series focused on low-latency inference. |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 1,782 | 379,271 | A high-speed GLM-5.3 model tailored for efficient text generation, leveraging optimizations from the "Flash" lineage. |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,837 | 4,561,861 | A streamlined version of DeepSeek-V4 optimized for speed and scalability, widely adopted across developers and researchers. |
| [thomsonreuters/Thomson-1.0-Small](https://huggingface.co/thomsonreuters/Thomson-1.0-Small) | thomsonreuters | 170 | 1,045 | A compact, domain-specific LLM trained on financial data; notable for its niche application despite modest metrics. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,693 | 5,362,365 | A powerful multimodal video generation model supporting image-to-video and text-to-video; one of the most downloaded models in the ecosystem. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,329 | 1,182,585 | A cutting-edge image-to-video diffusion model enabling high-fidelity video synthesis from static images; popular for creative applications. |
| [FastVideo/FastVideo-FastH3-4-step-Preview-v1-VSA-DataFree](https://huggingface.co/FastVideo/FastVideo-FastH3-4-step-Preview-v1-VSA-DataFree) | FastVideo | 213 | 0 | An experimental fast video generator using a 4-step inference pipeline; designed for rapid prototyping without training data. |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 595 | 246,445 | A GGUF-quantized, uncensored version of Qwen3.8-27B tailored for local deployment; highlights the trend toward accessible, unrestricted models. |

#### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF](https://huggingface.co/peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF) | peculiar-ragdoll | 158 | 105,974 | A specialized code-generation model based on Qwen3.5-MoE, fine-tuned for programming tasks and optimized via GGUF for local execution. |
| [pipecat-ai/phonellm-alpha-1](https://huggingface.co/pipecat-ai/phonellm-alpha-1) | pipecat-ai | 166 | 4,721 | A lightweight voice-focused LLM designed for speech synthesis and phoneme-level control; part of an emerging trend in audio-centric AI. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,271 | 9,059,937 | The most-downloaded GGUF quantization of Qwen3.8-27B, enabling efficient CPU/GPU inference on consumer hardware. |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 808 | 1,202,914 | Aggressively optimized GGUF version with uncensored behavior and MTP (multi-token prediction) support—ideal for open-ended reasoning. |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 866 | 2,055,081 | One of the highest-download uncensored GGUF models, demonstrating strong demand for locally deployable, unrestricted AI. |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 1,314 | 307,496 | A rare FP8-quantized version of Qwen3.8-27B offering extreme compression while preserving performance—key for edge deployment. |

---

### **Ecosystem Signal**

The Hugging Face ecosystem in August 2026 is defined by **Qwen and GLM dominance**, particularly through their Flash and 27B variants. Qwen3.8-27B stands out not just for its raw size but for being the most heavily quantized and fine-tuned model in the space—over 10 million downloads across community GGUF and uncensored versions. This reflects a clear shift toward **open-weight, community-optimized models** that bypass proprietary constraints. The surge in **GGUF-based deployments** (e.g., unsloth, orcarouter, huihui-ai) indicates strong demand for local inference, especially on consumer-grade hardware. Uncensored and abliterated variants are proliferating rapidly, suggesting users prioritize freedom and performance over safety guardrails. Meanwhile, **multimodal video generation** is accelerating, led by MiniMax-H3 and Lightricks’ LTX-2.5, signaling a maturing frontier in generative media. The absence of commercial model releases from major players (like Meta or Google) further cements Hugging Face as the epicenter of open, community-driven AI innovation.

---

### **Worth Exploring**

1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – With over 9 million downloads, this is the de facto standard for running Qwen3.8-27B locally. Its widespread adoption makes it ideal for benchmarking, fine-tuning, and deploying on edge devices.

2. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** – Boasting over 5.3 million downloads, it’s the most popular multimodal video model. Worth studying for its architecture and performance in image-to-video and text-to-video workflows.

3. **[orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8)** – A pioneering FP8 quantization of a 27B model. It represents the cutting edge of compression efficiency and is essential for understanding next-gen model deployment strategies.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*