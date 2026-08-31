# Hugging Face 热门模型周报 2026-08-31

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-31 15:48 UTC

---

### **今日亮点**

Qwen 和 GLM 依然在 Hugging Face 的热门模型中占据主导地位，其中 Qwen3.8-27B 以 470 万次下载量领跑，Kimi-K3 则人气飙升，收获 1.1 万点赞。量化版 GGUF 模型的兴起——尤其是 Qwen3.8-27B 与 GLM-5.3 等大模型的版本——反映出社区对本地推理优化的强烈需求。值得注意的是，无审查和去限制版本正迅速获得关注，反映出用户对更宽松、高性能模型的迫切需求。与此同时，MiniMax-H3 在视频生成领域表现卓越，下载量已超 530 万。

---

### **热门模型**

#### 🧠 语言模型（LLMs、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,481 | 158,598 | Qwen3.8 的轻量快速变体，专为实时对话场景优化；属于不断扩展的 Flash 系列，聚焦低延迟推理。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 1,782 | 379,271 | 高速版 GLM-5.3 模型，针对高效文本生成进行了优化，继承“Flash”系列的性能优势。 |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,837 | 4,561,861 | DeepSeek-V4 的精简优化版本，专注于速度与可扩展性，被开发者与研究者广泛采用。 |
| [thomsonreuters/Thomson-1.0-Small](https://huggingface.co/thomsonreuters/Thomson-1.0-Small) | thomsonreuters | 170 | 1,045 | 一款紧凑的领域专用语言模型，基于金融数据训练；尽管指标平平，但其垂直应用场景突出。 |

#### 🎨 多模态与生成（图像、视频、音频、文本转X）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,693 | 5,362,365 | 一款强大的多模态视频生成模型，支持图像到视频与文本到视频生成；是生态系统中下载量最高的模型之一。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,329 | 1,182,585 | 顶尖的图像到视频扩散模型，可从静态图像生成高保真视频；在创意应用中广受欢迎。 |
| [FastVideo/FastVideo-FastH3-4-step-Preview-v1-VSA-DataFree](https://huggingface.co/FastVideo/FastVideo-FastH3-4-step-Preview-v1-VSA-DataFree) | FastVideo | 213 | 0 | 实验性快速视频生成器，采用四步推理流程；专为无需训练数据的快速原型设计而打造。 |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 595 | 246,445 | 专为本地部署设计的 Qwen3.8-27B GGUF 量化无审查版本；凸显了对可访问、无限制模型的需求趋势。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF](https://huggingface.co/peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF) | peculiar-ragdoll | 158 | 105,974 | 基于 Qwen3.5-MoE 的专用代码生成模型，经过微调以适配编程任务，并通过 GGUF 优化实现本地高效运行。 |
| [pipecat-ai/phonellm-alpha-1](https://huggingface.co/pipecat-ai/phonellm-alpha-1) | pipecat-ai | 166 | 4,721 | 一款轻量级语音导向语言模型，专为语音合成与音素级控制设计；代表了以音频为核心的 AI 新趋势。 |

#### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,271 | 9,059,937 | Qwen3.8-27B 最受欢迎的 GGUF 量化版本，可在消费级硬件上实现高效的 CPU/GPU 推理。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 808 | 1,202,914 | 极度优化的 GGUF 版本，具备无审查行为与 MTP（多标记预测）支持，适用于开放式推理场景。 |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 866 | 2,055,081 | 下载量最高的无审查 GGUF 模型之一，充分体现了用户对本地部署、无限制 AI 的强烈需求。 |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 1,314 | 307,496 | Qwen3.8-27B 的罕见 FP8 量化版本，在保持性能的同时实现极致压缩，对边缘部署至关重要。 |

---

### **生态信号**

2026 年 8 月的 Hugging Face 生态系统由 **Qwen 与 GLM 的强势主导**所定义，尤其体现在它们的 Flash 与 27B 变体上。Qwen3.8-27B 不仅凭借其庞大的参数规模脱颖而出，更因是该领域被最多量化与微调的模型——社区版的 GGUF 与无审查版本总下载量已突破 1000 万——彰显出向 **开放权重、社区优化模型** 的明确转向。GGUF 部署的激增（如 unsloth、orcarouter、huihui-ai 等）表明用户对本地推理的强大需求，尤其是在消费级硬件上。无审查与去限制版本的迅速普及，暗示用户更看重自由与性能，而非安全防护机制。与此同时，**多模态视频生成** 正加速发展，由 MiniMax-H3 与 Lightricks 的 LTX-2.5 引领，标志着生成媒体领域的成熟。主要厂商（如 Meta 或 Google）未发布任何商业模型，进一步巩固了 Hugging Face 作为开放、社区驱动型 AI 创新中心的地位。

---

### **值得探索**

1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – 下载量超 900 万，已成为在本地运行 Qwen3.8-27B 的事实标准。其广泛应用使其成为基准测试、微调及边缘设备部署的理想选择。

2. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** – 下载量超 530 万，是最受欢迎的多模态视频模型。值得深入研究其架构与在图像转视频、文本转视频工作流中的性能表现。

3. **[orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8)** – 27B 模型的开创性 FP8 量化版本。代表了压缩效率的前沿水平，对于理解下一代模型部署策略至关重要。

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*