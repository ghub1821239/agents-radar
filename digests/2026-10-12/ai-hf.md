# Hugging Face 热门模型周报 2026-10-12

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-12 01:44 UTC

---

### **今日亮点**

截至2026年10月，Hugging Face 的模型生态以高性能、量化后的多模态模型为主导，其中通义千问的 Qwen3.8 系列在多个类别中领跑。GGUF 优化模型的激增——尤其是 Qwen3.8 变体和 Lightricks 的 LTX-2.5——反映出社区对本地推理与高效部署的强烈需求。值得注意的是，*unsloth/Qwen3.8-27B-GGUF* 已成为下载量最高的模型，累计下载超过640万次，凸显出用户对经过优化、易于访问的大模型日益增长的偏好。与此同时，图文生成视频技术持续升温，由 LTX-2.5 和 Prism 引领；而像 *google/embeddinggemma-2* 这样的嵌入模型则在检索与特征提取流程中保持稳定应用。

---

### **热门模型**

#### 🧠 语言模型（LLM、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | 通义千问 | 17,509 | 6,843,108 | 一款功能强大、支持对话的图文到文本模型，正因多模态推理能力迅速走红；本周最受欢迎的下载模型之一。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,657 | 2,016,567 | 一款针对编码与创意任务高度微调、未加限制的 Qwen3.8-27B GGUF 变体，深受追求高性能的开发者青睐。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 322 | 108,900 | 采用 2 位量化、支持工具调用的 Llama 系列模型，吸引注重效率与低资源部署的用户。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文生X）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,322 | 1,726,683 | 业界领先的图文生成视频扩散模型，具备出色的时序连贯性；凭借多功能性和易用性，现已成为视频生成领域的顶尖表现者。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,989 | 2,188,658 | 广泛采用的 Qwen-Image-2.1 未加限制 GGUF 版本，推动了无限制文生图生成的大规模下载。 |
| [AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 325 | 100,530 | Qwen 图像生成器的快速优化版本，创作者可实现极低延迟的快速原型开发，广受欢迎。 |
| [Prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,630 | 4,549,911 | 基于 Llama 架构、2 位量化的模型，专为速度与内存效率优化；因其可在消费级硬件上实现高吞吐推理而备受关注。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | Google | 1,712 | 98,829 | 基于 Gemma-2 架构构建的稳健轻量嵌入模型，适用于语义搜索与 RAG 系统；配备 safetensors 支持，生态完善。 |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 2,028 | 14,351 | 体积紧凑、精度高的图文到文本模型，专为边缘环境实时推理设计；属于 Cloudflare AI 基础设施布局的重要一环。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | Facebook | 4,073 | 2,081,596 | Segment Anything Model 的最新迭代，现已支持视频分割；在机器人、编辑与自动化工作流中被快速采纳。 |

#### 📦 微调与量化模型（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 5,026 | 6,488,262 | 本周下载量最高的模型——一个高度优化的 Qwen3.8-27B GGUF 版本，通过 llama.cpp 实现本地推理，表现出无与伦比的受欢迎程度。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 799 | 4,189,006 | Qwen3.8 Flash-Next 的混合精度、GSQ+RCO 量化版本，兼顾速度与精度，是生产级部署的理想选择。 |
| [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) | unsloth | 255 | 59,274 | Google embeddinggemma-2 的 GGUF 转换版，支持高效的本地嵌入提取——对注重隐私的应用至关重要。 |

---

### **生态信号**

2026年末的 Hugging Face 生态系统清晰地呈现出向**高效、可部署模型**的转变趋势，特别是那些面向边缘计算与本地推理优化的模型。通义千问在多个模态中持续主导，**Qwen3.8-27B** 正逐渐成为微调与量化的事实标准基础模型。其在 GGUF 格式中的广泛应用——由 ISTA-DASLab、DavidAU、unsloth 等社区驱动——表明开放权重生态系统已趋于成熟并具备自我维持能力。**量化技术**，尤其是 **GSQ、RCO 与 2 位压缩**，已不再是小众技巧，而是标准实践，使高性能推理得以在消费级显卡甚至 CPU 上实现。**未加限制与涡轮优化变体**的兴起，反映出对自由创作与低延迟生成的日益增长需求，尤其在图文生成视频与文生图领域。与此同时，来自主流厂商（如 Google、Meta、Cloudflare）的开源模型正越来越多地与社区驱动的增强功能结合，强化了一种混合创新模式：在专有基础之上融合开放协作。

---

### **值得探索**

1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – 下载量超640万次，该模型体现了优化、可及性与社区信任的完美融合。对于希望在本地运行强大 LLM 而无需依赖云服务的开发者而言，这是必试之选。

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 作为视频生成类别中点赞数最高的模型之一，它代表了图文生成视频的最前沿水平。非常适合希望以最少配置探索动态内容创作的创作者。

3. **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)** – 该模型展示了智能量化的未来。其精度与速度的平衡使其成为可扩展、真实世界多模态应用的首选候选。

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*