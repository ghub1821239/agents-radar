# Hugging Face 热门模型周报 2026-09-28

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-28 01:09 UTC

---

### **今日亮点**

通义（Qwen）生态系统持续在 Hugging Face 上占据主导地位，**Qwen3.8-27B** 在点赞数（16,427）和下载量（670万）上均领先，进一步巩固其作为旗舰多模态模型的地位。**GGUF 量化模型**的兴起，尤其是针对 Qwen 与 Llama 系列变体的版本，反映出社区对高效本地推理的强烈需求——例如 **prism-ml/Ternary-Bonsai-2-27B-gguf** 已达 330 万次下载。与此同时，**Lightricks/LTX-2.5** 在视频生成领域表现突出，下载量超 160 万，显示出人们对高质量图像转视频流水线日益增长的兴趣。

---

### **热门模型**

#### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,782 | 45,028 | 一款大规模指令微调的语言模型，具备强大的对话能力；属于正在快速崛起的中国AI生态体系的一部分。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,811 | 651,078 | 一款快速轻量的视觉-语言模型，专为实时推理优化；尽管发布不久，但下载量极高，表现亮眼。 |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 349 | 3,456 | 俄罗斯 Yandex 公司迄今发布的最大开源权重语言模型，面向多语言及强推理任务；尚处早期阶段，但目标宏大。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 2,493 | 52,804 | 通义官方发布的 Qwen Image 2.1 模型，支持文生图与图像编辑；广泛用作微调基础模型。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,332 | 1,601,089 | 一款基于扩散机制的强大图像转视频模型，输出达到电影级质量；本周最受欢迎的生成类模型之一。 |
| [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo) | Viggle | 341 | 133,151 | 采用 LoRA 优化的 Qwen Image 2.1 速度增强版；深受注重低延迟生成用户的青睐。 |
| [Comfy-Org/Qwen-Image-2.1](https://huggingface.co/Comfy-Org/Qwen-Image-2.1) | Comfy-Org | 806 | 3,987,373 | 一个单文件兼容 ComfyUI 的 Qwen Image 2.1 版本；因易于集成至可视化工作流而获得广泛应用。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入向量）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 208 | 19,757 | 专用于意图分类与实体抽取的 NER 模型；适用于企业级 RAG 流水线。 |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 410 | 766 | 基于对比学习的验证模型，专为检索系统中的重排序与真实性校验设计。 |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 407 | 22,514 | NVIDIA 最新推出的语音分离模型，基于 NeMo 框架；在嘈杂音频中表现出色的说话人分离能力。 |

#### 📦 微调与量化模型（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,190 | 3,343,748 | 首个采用三值权重的 2 位量化 Llama 风格模型，实现接近量子效率的压缩性能，在消费级硬件上运行极优。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 2,082 | 964,220 | 完全无审查、经过 GGUF 量化的 Qwen Image 2.1 版本；因其不受限制的创作用途而备受追捧。 |
| [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF) | pottokao | 299 | 145,246 | 高度优化的 GGUF 版本，专注于文本编码器部分；可显著提升 ComfyUI 流水线中的提示处理速度。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,778 | 1,608,439 | Qwen3.8-27B 的混合精度、GSQ 量化变体；兼顾性能与体积，适合边缘部署场景。 |

---

### **生态信号**

截至 2026 年末，Hugging Face 生态系统的特征是 **通义（Qwen）在多个模态上的全面主导地位**，其核心模型 Qwen3.8-27B 及其衍生版本在质量和可访问性方面树立了新标杆。**GGUF 量化模型**的爆发式增长——特别是由 prism-ml、abenzerps、ISTA-DASLab 等社区贡献者推出的产品——清晰地反映出一种趋势：**高效、可本地部署的 AI 正成为主流**，背后驱动力是用户对隐私保护与低资源推理的需求。值得注意的是，**2 位量化**（如 Ternary-Bonsai）正逐步成为可行的技术前沿，使超轻量模型在不牺牲核心功能的前提下得以实现。尽管专有模型仍具影响力，但开源替代方案正在快速成熟，尤其在多模态与推理任务领域。**ComfyUI 优化资产**的普及，凸显出人们对模块化、可视化 AI 工作流的偏好。这一趋势推动了技术民主化，社区驱动的微调与量化已成为创新的关键方向。

---

### **值得探索**

1. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)** – 里程碑式的 2 位量化 LLM，突破了模型压缩的边界。非常适合在低端硬件上测试 AI 或部署于边缘环境。

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 本周下载量最高的生成模型之一，提供电影级的图像转视频转换。对探索下一代动画工具的创作者而言，必试之选。

3. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** – 多模态推理的行业标准。凭借 670 万次下载，它是构建高级视觉语言应用（包括文档分析与空间推理）的首选基础模型。

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*