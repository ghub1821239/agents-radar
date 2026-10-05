# Hugging Face Trending Models Weekly 2026-10-05

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-10-05 01:14 UTC

---

---

### **Today's Highlights**

Qwen’s dominance continues across multiple modalities, with **Qwen3.8-27B** and **Qwen3.8-Flash-Next** leading in likes and downloads, showcasing strong community adoption for high-performance multimodal reasoning. The surge in GGUF-quantized models—especially from ISTA-DASLab and DavidAU—signals growing demand for efficient, locally deployable inference. Meanwhile, Lightricks’ **LTX-2.5** stands out as a top-performing image-to-video model with over 1.6 million downloads, reflecting rising interest in AI-driven video generation. Notably, uncensored and fine-tuned variants (e.g., *Heretic*, *Uncensored-GGUF*) are gaining traction, indicating a shift toward customizable, unrestricted AI outputs.

---

### **Trending Models**

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,940 | 6,821,761 | A powerful multimodal LLM tuned for image-text understanding; its massive download count reflects widespread adoption in research and production. |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,416 | 4,045,810 | A 2-bit quantized LLM using ternary compression; its extreme efficiency makes it ideal for edge deployment despite being a fine-tune. |
| [Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw](https://huggingface.co/Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw) | Infatoshi | 213 | 946 | An uncensored GLM variant optimized for Apple Silicon via exllamav3; niche but indicative of growing cross-platform optimization efforts. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 6,312 | 1,626,951 | A top-tier image-to-video diffusion model enabling high-fidelity video synthesis; its record-breaking downloads highlight demand for creative AI tools. |
| [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo) | Viggle | 588 | 272,896 | A speed-optimized text-to-image model based on Qwen-Image-2.1; fine-tuned for rapid inference without sacrificing quality. |
| [Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap) | Alissonerdx | 1,180 | 203,086 | A highly rated LoRA-based face swap model leveraging Qwen-Image-2.1; popular among creators for seamless identity transfer. |
| [pablodawson/MiniMax-H3-360-Orbit-LoRA](https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA) | pablodawson | 186 | 5,742 | A specialized LoRA for 360° orbital video generation from images; pushes boundaries in dynamic scene animation. |

#### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 715 | 3,445 | A contrastive learning model designed for reranking and verification tasks; emerging as a tool for improving retrieval accuracy. |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 366 | 53,625 | A lightweight, intent-aware NER model optimized for decision-making pipelines; ideal for structured data extraction. |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 672 | 53,014 | A state-of-the-art voice activity detection model; leverages NVIDIA’s audio processing stack for real-time speaker separation. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 556 | 1,886,975 | A mixed-precision GGUF quantization of Qwen3.8-Flash-Next with GSQ+RCO compression; enables fast local inference at low resource cost. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,422 | 2,164,143 | One of the most complex fine-tunes to date—uncensored, turbo-optimized, and fused with multiple capabilities including coding and storytelling. |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,142 | 1,553,744 | The most downloaded uncensored GGUF version of Qwen-Image-2.1; widely used for unrestricted image generation on consumer hardware. |

---

### **Ecosystem Signal**

As of October 2026, the Hugging Face ecosystem is increasingly defined by **efficiency**, **customization**, and **open-weight empowerment**. Qwen remains the dominant model family, with **Qwen3.8-series** models leading in both popularity and deployment readiness across image-text-to-text and text-generation use cases. The explosive growth of **GGUF-quantized models**—particularly those from ISTA-DASLab and community contributors like DavidAU—demonstrates a clear shift toward **local, low-latency inference** on consumer-grade hardware. This trend is amplified by the rise of **uncensored and fine-tuned variants**, suggesting users are prioritizing control and flexibility over default safety constraints. Notably, **LoRA-based fine-tunes** for video and image editing (e.g., MiniMax-H3, BFS Face Swap) reflect a maturing creative AI pipeline, where modularity and reusability are key. While proprietary models still hold influence, open-weight alternatives are now driving innovation, especially in domains like code generation, speech processing, and multilingual reasoning.

---

### **Worth Exploring**

1. **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**  
   This ultra-complex, multi-capability GGUF model combines uncensored behavior, code generation, and narrative fusion—ideal for developers seeking a single, powerful, locally runnable LLM.

2. **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)**  
   A cutting-edge quantization of Qwen3.8-Flash-Next with advanced GSQ+RCO compression. Its 1.8M+ downloads prove its value for efficient, real-time multimodal applications.

3. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**  
   With over 1.6 million downloads, this image-to-video model represents the peak of generative video performance. It’s a must-try for creators and researchers in visual content automation.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*