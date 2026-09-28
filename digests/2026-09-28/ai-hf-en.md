# Hugging Face Trending Models Weekly 2026-09-28

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-28 01:09 UTC

---

---

### **Today's Highlights**

Qwen’s ecosystem continues to dominate Hugging Face, with **Qwen3.8-27B** leading the pack in both likes (16,427) and downloads (6.7M), cementing its status as a flagship multimodal model. The rise of **GGUF quantized models**, especially for Qwen and Llama-family variants, reflects strong community demand for efficient local inference—evidenced by **prism-ml/Ternary-Bonsai-2-27B-gguf** hitting 3.3M downloads. Meanwhile, **Lightricks/LTX-2.5** stands out in video generation with over 1.6M downloads, signaling growing interest in high-fidelity image-to-video pipelines.

---

### **Trending Models**

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,782 | 45,028 | A large-scale instruction-tuned LLM with strong conversational capabilities; part of an emerging Chinese AI ecosystem gaining traction. |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,811 | 651,078 | A fast, lightweight vision-language model optimized for real-time inference; notable for high download volume despite being relatively new. |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 349 | 3,456 | Yandex’s largest open-weight LLM to date, targeting multilingual and reasoning-heavy applications; early-stage but ambitious. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,493 | 52,804 | Official Qwen Image 2.1 model supporting text-to-image and image editing; widely used as base for fine-tunes. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,332 | 1,601,089 | A powerful diffusion-based image-to-video model delivering cinematic-quality output; one of the most downloaded generative models this week. |
| [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo) | Viggle | 341 | 133,151 | A speed-optimized variant of Qwen Image 2.1 using LoRA; popular among users prioritizing low-latency generation. |
| [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) | Comfy-Org | 806 | 3,987,373 | A single-file ComfyUI-compatible version of Qwen Image 2.1; massive adoption due to ease of integration into visual workflows. |

#### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 208 | 19,757 | A specialized NER model trained for intent classification and entity extraction; ideal for enterprise RAG pipelines. |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 410 | 766 | A contrastive learning-based verifier model designed for reranking and truth validation in retrieval systems. |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 407 | 22,514 | NVIDIA’s latest diarization model leveraging NeMo framework; excels at speaker separation in noisy audio. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,190 | 3,343,748 | A groundbreaking 2-bit quantized Llama-style model using ternary weights; achieves near-quantum efficiency on consumer hardware. |
| [abeznerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 2,082 | 964,220 | A fully uncensored, GGUF-quantized version of Qwen Image 2.1; highly sought after for unrestricted creative use. |
| [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF) | pottokao | 299 | 145,246 | A highly optimized GGUF version focusing on the text encoder; enables faster prompt processing in ComfyUI workflows. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,778 | 1,608,439 | A mixed-precision, GSQ-quantized variant of Qwen3.8-27B; balances performance and size for edge deployment. |

---

### **Ecosystem Signal**

The Hugging Face ecosystem in late 2026 is defined by **Qwen’s dominance across multiple modalities**, with Qwen3.8-27B and its derivatives setting benchmarks in both quality and accessibility. The surge in **GGUF-quantized models**—especially those from community contributors like prism-ml, abenzerps, and ISTA-DASLab—reflects a clear shift toward **efficient, locally deployable AI**, driven by demand for privacy-preserving, low-resource inference. Notably, **2-bit quantization** (e.g., Ternary-Bonsai) is emerging as a viable frontier, enabling ultra-lightweight models without sacrificing core functionality. While proprietary models remain influential, open-weight alternatives are rapidly maturing, particularly in multimodal and reasoning tasks. The proliferation of **ComfyUI-optimized assets** underscores a growing preference for modular, visual AI workflows. This trend favors democratized access, with community-driven fine-tunes and quantizations becoming key innovation vectors.

---

### **Worth Exploring**

1. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)** – A landmark 2-bit quantized LLM that pushes the boundaries of model compression. Ideal for testing AI on low-end hardware or deploying in edge environments.

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – One of the most downloaded generative models this week, offering cinematic image-to-video conversion. A must-try for creators exploring next-gen animation tools.

3. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** – The gold standard in multimodal reasoning. With 6.7M downloads, it’s the go-to base for building advanced vision-language applications, including document analysis and spatial reasoning.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*