# Hugging Face 热门模型周报 2026-09-07

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-07 00:19 UTC

---

### **今日亮点**  
2026年9月，Hugging Face 生态系统由高性能多模态与量化大模型主导，其中 Qwen3.8 系列模型在流行度和采用率上均处于领先地位。值得注意的是，*unsloth/Qwen3.8-27B-GGUF* 的下载量已突破千万级，凸显了对轻量级、本地可部署模型的庞大需求。GGUF 优化版本的兴起——尤其是标有“无审查”或“彻底解禁”的变体——表明社区对不受限制、自主驱动的微调模型兴趣日益增长。与此同时，*Lightricks/LTX-2.5* 等生成模型（下载量超150万）展现出强劲势头，尤其在创意工作流中推动了 AI 视频生成的发展。

---

### **热门模型**

#### 🧠 语言模型（LLMs、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,126 | 6,190,807 | 一款旗舰级 270 亿参数模型，具备强大的多模态支持；因其在研究与生产中的广泛应用，下载量巨大。 |
| [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,737 | 410,074 | 基于 MoE 架构的下一代文本生成器，推理性能优化；在对话类应用中迅速获得关注。 |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,707 | 14,612,342 | 尽管较老旧，gpt2 仍是轻量级推理与教育用途的基准模型，持续保持相关性。 |
| [tencent/Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 445 | 6,441 | 腾讯 Hunyuan 家族成员之一，这款 70 亿参数模型在中国语境下的大模型部署中初现增长迹象。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,961 | 1,526,928 | 基于扩散机制的图像转视频模型，可从静态图像生成电影级片段；其超百万下载量反映出对易用视频生成工具的强劲需求。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,967 | 4,986,349 | 强大的图像转视频与文本转视频模型，采用扩散器架构；广泛应用于内容创作管线。 |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 744 | 209,191 | 实验性视觉语言模型，专为速度与精度优化；属于 DeepSeek 积极拓展多模态能力的一部分。 |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 500 | 144,455 | Google 最新时间序列预测模型，在复杂时序数据上表现达到业界领先水平，广泛用于金融与物流领域。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入表示）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,566 | 253,029,336 | 全球最受欢迎的嵌入模型；凭借其高效与紧凑特性，非常适合语义搜索与检索任务。 |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 263 | 12,464 | 多语言语音模型，基于 3 亿小时音频训练；以零样本跨语言能力著称。 |
| [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 114 | 889 | 流式自动语音识别模型，专为实时转录设计；体现了微软在低延迟语音 AI 方向的重点布局。 |

#### 📦 微调与量化模型（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,584 | 10,311,462 | Hugging Face 上下载量最高的量化模型——GGUF 格式可在消费级硬件上实现高效本地推理；是当前趋势的引领者。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 979 | 1,568,315 | 高度无审查的微调版本，结合 MTP（多轮提示）优化；体现了向用户自定义、无边界模型转变的趋势。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 247 | 211,018 | 一个命名极长的模型，融合多种微调风格——异端、无审查、编码导向——凸显细分领域的专业化特征。 |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 749 | 287,720 | 另一主流无审查 GGUF 变体；反映了社区驱动的定制化如何重塑模型可及性。 |

---

### **生态信号**  
截至 2026 年 9 月，Hugging Face 生态系统正呈现出 **开放权重创新** 与 **社区驱动、非监管微调** 之间的明显分野。Qwen3.8 与 GLM-5.3 系列模型在多模态与大规模推理场景中明显加速扩张。尤为关键的是，**如 GGUF 这类量化格式已成为本地部署的事实标准**，*unsloth/Qwen3.8-27B-GGUF* 下载量突破千万，充分证明了对可访问、高性能模型的强烈需求。这一趋势因大量 **“无审查”、“彻底解禁”、“异端”** 等微调版本的涌现而进一步放大，标志着一种文化转向：用户正在掌控模型边界，尤其在大语言模型社区中表现突出。尽管专有模型仍具影响力（如 DeepSeek、NVIDIA），开源运动在数量与多样性上依然占据主导地位。同时，*LTX-2.5* 与 *MiniMax-H3* 等生成模型表明，视频与音频生成技术正迅速成熟，已从边缘实验迈向主流工具链。而 sentence-transformers 与嵌入模型的主导地位也再次印证了检索与相似性在现代 AI 架构中的基础性作用。

---

### **值得探索**  
1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – 下载量超千万，代表了人工智能民主化的巅峰。其 GGUF 格式支持在笔记本电脑与边缘设备上流畅部署，是开发离线 AI 应用的理想选择。  
2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 150 万次下载量，是创作者与营销人员不可错过的图像转视频模型。其从静态图像生成电影级视频的能力，展现了扩散式视频合成技术的成熟。  
3. **[HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)** – 此模型完美诠释了当前高度专业化、社区驱动的大语言模型文化。其价值不仅在于性能，更在于作为用户通过微调与叙事品牌塑造 AI 的典型案例研究。

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*