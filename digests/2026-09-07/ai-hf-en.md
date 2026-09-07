# Hugging Face Trending Models Weekly 2026-09-07

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-07 00:19 UTC

---

---

### **Today's Highlights**  
The Hugging Face ecosystem in September 2026 is dominated by high-performance multimodal and quantized LLMs, with Qwen3.8 series models leading in both popularity and adoption. Notably, *unsloth/Qwen3.8-27B-GGUF* has surged to over 10 million downloads, underscoring the massive demand for lightweight, locally deployable models. The rise of GGUF-optimized variants—especially those labeled "uncensored" or "abliterated"—signals growing interest in unrestricted, community-driven fine-tunes. Meanwhile, generative models like *Lightricks/LTX-2.5* (1.5M+ downloads) highlight strong momentum in AI video generation, particularly for creative workflows.

---

### **Trending Models**

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,126 | 6,190,807 | A flagship 27B parameter model with strong multimodal support; its widespread use in research and production drives massive downloads. |
| [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,737 | 410,074 | A next-gen MoE-based text generator with optimized inference; gaining traction for conversational applications. |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,707 | 14,612,342 | Though older, gpt2 remains a benchmark for lightweight inference and educational use, with enduring relevance. |
| [tencent/Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 445 | 6,441 | Part of Tencent’s Hunyuan family, this 7B model shows early signs of growth in Chinese-language LLM deployment. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,961 | 1,526,928 | A diffusion-based image-to-video model capable of generating cinematic clips from static images; its 1.5M+ downloads reflect rising demand for accessible video generation tools. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,967 | 4,986,349 | A powerful image-to-video and text-to-video model leveraging diffusers; widely adopted for content creation pipelines. |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 744 | 209,191 | An experimental vision-language model optimized for speed and accuracy; part of DeepSeek’s aggressive multimodal expansion. |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 500 | 144,455 | Google’s latest time-series forecasting model offers state-of-the-art performance on complex temporal data, used in finance and logistics. |

#### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,566 | 253,029,336 | The most popular embedding model globally; ideal for semantic search and retrieval due to its speed and compact size. |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 263 | 12,464 | A multilingual speech model trained on 300M hours of audio; notable for zero-shot cross-lingual capabilities. |
| [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 114 | 889 | A streaming ASR model designed for real-time transcription; demonstrates Microsoft’s focus on low-latency voice AI. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,584 | 10,311,462 | The most downloaded quantized model on HF—GGUF format enables efficient local inference on consumer hardware; a clear trendsetter. |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 979 | 1,568,315 | Aggressively uncensored fine-tune with MTP (Multi-Turn Prompting) optimization; exemplifies the shift toward unrestricted, user-customized models. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 247 | 211,018 | One of the longest-named models, combining multiple fine-tuning styles—heretic, uncensored, coder-focused—highlighting niche specialization. |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 749 | 287,720 | Another prominent uncensored GGUF variant; reflects how community-driven customization is reshaping model accessibility. |

---

### **Ecosystem Signal**  
As of September 2026, the Hugging Face ecosystem is witnessing a bifurcation between **open-weight innovation** and **community-driven, unregulated fine-tuning**. The Qwen3.8 and GLM-5.3 families are clearly gaining momentum, especially in multimodal and large-scale inference scenarios. Notably, **quantization formats like GGUF** have become the de facto standard for local deployment, with *unsloth/Qwen3.8-27B-GGUF* reaching over 10 million downloads—a testament to demand for accessible, high-performance models. This trend is amplified by the proliferation of **"uncensored"**, **"abliterated"**, and **"heretic"** fine-tunes, signaling a cultural shift toward user-controlled, boundary-pushing models—particularly within the LLM community. While proprietary models remain influential (e.g., DeepSeek, NVIDIA), the open-source movement continues to dominate in volume and diversity. Meanwhile, generative models like LTX-2.5 and MiniMax-H3 show that video and audio generation are maturing rapidly, moving beyond niche experimentation into mainstream tooling. The dominance of sentence-transformers and embedding models also underscores the foundational role of retrieval and similarity in modern AI stacks.

---

### **Worth Exploring**  
1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – With over 10 million downloads, this model represents the peak of democratized AI. Its GGUF format enables smooth deployment on laptops and edge devices, making it ideal for developers building offline AI apps.  
2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – At 1.5 million downloads, this image-to-video model is a must-try for creatives and marketers. Its ability to generate cinematic-quality videos from still images showcases the maturity of diffusion-based video synthesis.  
3. **[HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)** – This model epitomizes the current culture of hyper-specialized, community-driven LLMs. It’s worth studying not just for its performance, but as a case study in how users are shaping AI through fine-tuning and narrative branding.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*