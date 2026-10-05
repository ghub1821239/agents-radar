# Hugging Face 热门模型周报 2026-10-05

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-05 01:14 UTC

---

### **今日亮点**

Qwen 在多个模态上持续保持领先地位，其中 **Qwen3.8-27B** 与 **Qwen3.8-Flash-Next** 在点赞数和下载量上均位居榜首，展现出社区对高性能多模态推理模型的广泛采纳。GGUF 量化模型的激增——尤其是来自 ISTA-DASLab 与 DavidAU 的模型——表明市场对高效、可本地部署推理的需求日益增长。与此同时，Lightricks 的 **LTX-2.5** 作为表现顶尖的图像转视频模型，下载量已超 160 万次，反映出人们对 AI 驱动视频生成的兴趣不断上升。值得注意的是，无审查及微调版本（如 *Heretic*、*Uncensored-GGUF*）正迅速获得关注，显示出用户对可定制、无限制输出的 AI 模型的偏好正在增强。

---

### **热门模型**

#### 🧠 语言模型（LLM、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,940 | 6,821,761 | 一款针对图文理解优化的强大多模态 LLM；其庞大的下载量反映了其在科研与生产环境中的广泛应用。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,416 | 4,045,810 | 采用三值压缩的 2 位量化 LLM；尽管是微调模型，但其极致的效率使其非常适合边缘部署。 |
| [Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw](https://huggingface.co/Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw) | Infatoshi | 213 | 946 | 通过 exllamav3 优化于 Apple Silicon 的无审查 GLM 变体；虽为小众用途，但体现了跨平台优化趋势的兴起。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文本转 X）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 6,312 | 1,626,951 | 顶级图像转视频扩散模型，支持高保真视频合成；创纪录的下载量凸显了创意类 AI 工具的强劲需求。 |
| [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo) | Viggle | 588 | 272,896 | 基于 Qwen-Image-2.1 的高速优化文本转图像模型；经微调后实现快速推理，同时保持高质量输出。 |
| [Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap) | Alissonerdx | 1,180 | 203,086 | 基于 LoRA 的高评分人脸替换模型，依托 Qwen-Image-2.1 构建；深受创作者欢迎，适用于无缝身份迁移。 |
| [pablodawson/MiniMax-H3-360-Orbit-LoRA](https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA) | pablodawson | 186 | 5,742 | 专用于从图像生成 360° 轨道视频的 LoRA 模型；推动动态场景动画的边界发展。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 715 | 3,445 | 专为重排序与验证任务设计的对比学习模型；正逐渐成为提升检索准确性的工具。 |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 366 | 53,625 | 轻量级、意图感知的 NER 模型，专为决策流水线优化；适用于结构化数据提取。 |
| [nvidia/Nemotron-3-Diarization](https://huggingface.co/nvidia/Nemotron-3-Diarization) | nvidia | 672 | 53,014 | 行业领先的语音活动检测模型；利用 NVIDIA 音频处理栈实现实时说话人分离。 |

#### 📦 微调与量化模型（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 556 | 1,886,975 | Qwen3.8-Flash-Next 的混合精度 GGUF 量化版本，采用 GSQ+RCO 压缩技术；可在低资源环境下实现快速本地推理。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,422 | 2,164,143 | 当前最复杂的微调之一——无审查、涡轮加速，并融合多项能力，包括编码与叙事生成。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,142 | 1,553,744 | Qwen-Image-2.1 最受欢迎的无审查 GGUF 版本；广泛用于消费级硬件上的自由图像生成。 |

---

### **生态信号**

截至 2026 年 10 月，Hugging Face 生态系统正日益由 **效率**、**可定制性** 和 **开放权重赋能** 所定义。Qwen 依然是主导模型家族，其 **Qwen3.8 系列** 在图像-文本-文本与文本生成等各类应用场景中兼具人气与部署就绪度。**GGUF 量化模型** 的爆炸式增长——尤其是来自 ISTA-DASLab 以及 DavidAU 等社区贡献者的作品——清晰地反映出向 **消费级硬件上的本地化、低延迟推理** 的转变趋势。这一趋势因 **无审查与微调变体** 的兴起而进一步放大，表明用户正越来越重视控制权与灵活性，而非默认的安全约束。特别值得注意的是，基于 LoRA 的视频与图像编辑微调模型（如 MiniMax-H3、BFS Face Swap）展现了创意 AI 流水线的成熟，模块化与可复用性已成为关键要素。尽管专有模型仍具影响力，但开源权重替代方案如今正驱动创新，尤其在代码生成、语音处理与多语言推理等领域。

---

### **值得探索**

1. **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**  
   这款超复杂、多功能的 GGUF 模型集无审查行为、代码生成与叙事融合于一体，是开发者寻求单一强大、可本地运行的 LLM 的理想选择。

2. **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)**  
   Qwen3.8-Flash-Next 的前沿量化版本，采用先进的 GSQ+RCO 压缩技术。超过 180 万次的下载量证明了其在高效、实时多模态应用中的价值。

3. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**  
   下载量突破 160 万次，该图像转视频模型代表了生成视频性能的巅峰。对于视觉内容自动化领域的创作者与研究人员而言，是不可错过的尝试。

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*