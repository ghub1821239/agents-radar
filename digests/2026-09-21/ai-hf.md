# Hugging Face 热门模型周报 2026-09-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-21 00:28 UTC

---

### **今日亮点**

Qwen 在多个模态上持续保持领先地位，**Qwen3.8-27B** 及其变体在点赞数和下载量上均遥遥领先——尤其是由 **unsloth** 和 **ISTA-DASLab** 提供的 GGUF 量化版本，因在消费级硬件上的优化推理而获得大规模采用。**Lightricks/LTX-2.5** 与 **MiniMaxAI/MiniMax-H3** 的崛起，预示着图像转视频及多模态视频生成领域强劲的发展势头，这主要得益于基于扩散模型的单文件架构。与此同时，**prism-ml 的 Ternary-Bonsai-2-27B-gguf** 在超低比特量化（2位三进制）方面实现突破，使高性能 LLM 能在边缘设备上高效运行。最后，大量无审查、高速优化的微调模型（如 DavidAU 开发的超过 100 个参数的 Qwen 变体）的涌现，反映出用户对无限制、高速 AI 代理日益增长的需求。

---

### **热门模型**

#### 🧠 语言模型（LLMs、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,861 | 7,331,932 | 一款高度强大的对话式 LLM，具备出色的多模态准备能力；凭借开放权重和广泛的应用场景，引发社区大规模参与。 |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,769 | 5,910,102 | 本列表中采用最广泛的 LLM；因其在研究与生产环境中指令遵循任务中的可靠性和性能而广受信赖。 |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 3,549 | 76,669 | 基于 Qwen3.5-MoE 架构的大规模 MoE 模型，通过 MLX 实现轻量级推理；适用于 Apple Silicon 部署。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文本转 X）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,552 | 1,609,559 | 基于扩散模型的图像转视频模型，采用单文件打包；在实时创意工作流中迅速获得关注。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,525 | 4,057,444 | 文本转视频与图像转视频领域表现顶尖的模型之一；在动态视觉生成中优化了速度与连贯性。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 740 | 183 | 正在积极开发的下一代图像生成模型；利用 Diffusers 与 safetensors 实现高效训练与部署。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 915 | 17,403 | 一个紧凑且具备代理能力的音频生成器，支持符号规划与编辑；在结构化控制下生成音乐方面表现突出。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入表示）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) | harshatheg | 476 | 0 | 极小但功能强大的模型，支持约束解码与并行推理；专为 Apple Silicon 及结构化输出应用设计。 |
| [AlexWortega/openjev](https://huggingface.co/AlexWortega/openjev) | AlexWortega | 314 | 0 | 在 Qwen3.5 数据上微调的跨编码器 NLI 模型；在低资源环境下语义相似性与推理任务中展现出潜力。 |

#### 📦 微调与量化模型（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,428 | 6,941,478 | Hub 上下载量最高的量化模型——针对 llama.cpp 优化，采用混合精度 GGUF 格式；可在笔记本电脑上实现快速本地推理。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,494 | 1,908,396 | 首个大型 27B 模型的 2 位三进制量化方案；在极致压缩下仍接近全精度表现——非常适合边缘 AI 应用。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,002 | 1,301,417 | 一种超扩展、无审查的微调模型，包含超过 100 个专用子标记；深受追求极致自由与速度的 AI 爱好者欢迎。 |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 189 | 42,965 | 结合 GSQ 与 RCO 量化技术，兼顾内存效率与速度；代表了向混合高精度量化方法演进的趋势。 |

---

### **生态信号**

截至 2026 年 9 月，**Qwen** 已成为开放权重生态系统的主导力量，**Qwen3.8-27B** 及其衍生模型驱动了文本、图文与视频领域近半数顶级模型。其成功得益于社区对 GGUF 与 safetensors 格式的广泛采纳，尤其通过 **unsloth** 与 **ISTA-DASLab** 推动了量化效率的边界突破。值得注意的是，**三进制量化**（如 *prism-ml/Ternary-Bonsai*）标志着向超低比特推理范式的重大转变，在不牺牲可用性的前提下实现了极致压缩——这对边缘部署至关重要。**无审查、高速优化、多标记微调模型**的激增，反映了用户群体的成熟化，他们正寻求超越标准指令微调的可定制、高性能智能体。尽管像 DeepSeek-V4.1 这样的专有模型依然具有竞争力，但开放权重趋势依然强劲，尤其在多模态生成领域，Hugging Face 作为创新的核心枢纽地位愈发稳固。

---

### **值得探索**

1. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)** – 这一 2 位三进制模型重新定义了模型压缩的可能性。适合目标为计算资源极低的移动或嵌入式系统开发人员。  
2. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – Hugging Face 上下载量最高的模型；使用 llama.cpp 可实现本地推理的极致速度与最低延迟，是测试的理想选择。  
3. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 采用单文件打包的前沿图像转视频模型；对于希望以最少配置探索生成式视频流水线的创作者而言不可或缺。

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*