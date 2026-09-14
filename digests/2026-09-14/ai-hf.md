# Hugging Face 热门模型周报 2026-09-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-14 00:23 UTC

---

### **今日亮点**

Qwen 的主导地位持续巩固，*Qwen3.8-27B* 以超过 770 万次下载领跑，并在多模态推理领域树立了新标杆。GGUF 量化版本的兴起——尤其是 *unsloth/Qwen3.8-27B-GGUF* 超过 1100 万次下载——表明市场对高效、本地化推理模型的需求强劲。与此同时，Lightricks 的 *LTX-2.5* 在视频生成领域迅速走红，下载量达 150 万次，展现出人们对高质量文本到视频模型日益增长的兴趣。值得注意的是，社区驱动的微调模型如 *DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion...* 等，凸显出向高度定制化、无审查、高性能模型演进的趋势。

---

### **热门模型**

#### 🧠 语言模型（LLMs、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,200 | 244,457 | 专为实时推理优化的轻量快速版 DeepSeek-V4.1，擅长低延迟文本生成任务。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,342 | 150,110 | 基于 MiniCPM 系列的紧凑型 20 亿参数模型，适合边缘部署和移动端应用。 |
| [nex-agi/Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 623 | 30,289 | 基于 Qwen3.5-MoE 架构的高性能 Pro 级模型，专为复杂推理与智能体工作流设计。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,154 | 21,336 | 新发布的 40 亿参数 LLM，具备强大的代码与数学能力，在开发者社区中迅速获得关注。 |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,737 | 7,979 | 基于 Qwen3.5-text 构建的智能体式指令微调模型，强调自主任务执行与工作流规划。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文本到 X）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,972 | 7,768,964 | Qwen 的旗舰多模态模型，广泛用于图文理解与对话式 AI；是 Hugging Face 上下载量最高的模型之一。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,742 | 1,548,442 | 强大的图像到视频扩散模型，可从静态图像生成电影级视频，正在创意工作流中快速普及。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 970 | 769,557 | 使用 GSQ 与 RCO 技术实现混合精度效率的前沿 GGUF 量化版本，适合在消费级硬件上本地运行大型模型。 |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 373 | 123,491 | 基于 Minimax-H3 的高保真视频生成模型，以逼真的输出与运动一致性著称。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,238 | 4,819,845 | 表现优异的图像到视频模型，支持无缝文本到视频合成，具备丰富的视觉细节与时间连贯性。 |
| [Viggle/Viggle-Animate](https://huggingface.co/Viggle/Viggle-Animate) | Viggle | 216 | 0 | 创新的视频到视频模型，专注于角色替换与动画编辑——尚处早期，但因其特定应用场景已吸引关注。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 774 | 797,832 | Google 最新时间序列预测模型，在金融、物联网等多个领域实现顶尖准确率。 |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 433 | 30,310 | 针对网络安全任务优化的 GLM 特化版本，训练目标为绕过拒绝机制并处理对抗输入。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 406 | 3,707 | 结合符号规划与智能体编辑的音乐生成模型，独特地支持 AI 辅助作曲与混音。 |
| [Qwen/Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 196 | 4,119 | 专为自动驾驶设计的 40 亿参数模型，集成运动规划与场景理解，适用于机器人应用。 |

#### 📦 微调与量化模型（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,009 | 11,005,880 | Qwen3.8-27B 最受欢迎的 GGUF 版本，通过 Unsloth 自定义内核优化，在 CPU 与 GPU 上实现速度与内存效率双提升。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 633 | 750,591 | 超高度特化的无审查微调模型，融合多种激进优化策略，深受追求极致输出自由的高级用户青睐。 |
| [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 217 | 99,716 | MiniCPM5-2B 的轻量级 GGUF 量化版本，可在低端设备上部署而无需牺牲核心功能。 |

---

### **生态信号**

截至 2026 年 9 月，Hugging Face 生态系统正明显转向**高效、可部署模型**——这一趋势由 **GGUF 量化版本**的爆炸式增长所驱动，尤其以源自 Qwen 与 GLM 系列的模型为代表。仅 *unsloth/Qwen3.8-27B-GGUF* 一项就突破 1100 万次下载，标志着大规模向消费级硬件本地推理迁移。社区驱动的微调模型也在迅猛发展，例如 *DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion...* 等模型将激进优化与无审查行为结合，反映出市场对可定制、高性能 AI 的强烈需求。Qwen、GLM 与 MiniCPM 系列的主导地位，凸显中国科技企业开源权重模型的强劲势头，正在挑战西方传统巨头。与此同时，**多模态生成**技术也日趋成熟——LTX-2.5 与 MiniMax-H3 均达到惊人的下载量，表明市场对 AI 视频工具已具备充分准备。值得注意的是，嵌入模型如 *all-MiniLM-L6-v2* 仍保持基础地位，下载量超 2.5 亿次，证明其在检索与语义搜索流程中的持久价值。

---

### **值得探索**

1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – 下载量超 1100 万次，该 GGUF 量化模型已成为本地高性能推理的黄金标准，非常适合在笔记本电脑或边缘设备上构建应用的开发者。

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 作为增长最快的视频生成模型之一，它展示了高质量文本到视频合成正变得越来越易用——对探索 AI 叙事创作的创作者与内容生产者而言尤为理想。

3. **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)** – 对关注开放权重模型微调边界、去审查化与性能优化的高级用户而言，这是必读案例。它体现了 Hugging Face 社区“自己动手”的精神。

---
*本日报由 [agents-radar](https://github.com/ghub1821239/agents-radar) 自动生成。*