# ArXiv AI Research Digest 2026-09-23

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-23 00:54 UTC

---

---

### **Today's Highlights**  
The latest ArXiv submissions (2026-09-23) reflect a maturing AI research landscape focused on *agent autonomy, real-world deployment, and trustworthiness*. A strong theme is the rise of **self-improving agents**, particularly through recursive self-improvement (RSI) and harness distillation, enabling agents to adapt their own reasoning and tool use over time. Concurrently, there’s growing emphasis on **evaluating long-horizon behaviors**—from memory persistence in DolphinBench to detecting collusion in multi-agent systems. New frameworks like GameHorizon and OSWorld-Pro highlight the need for **multi-horizon, process-based evaluation** that goes beyond final outcomes. Notably, papers such as *Pinocchio* and *GRUET* address critical gaps in uncertainty estimation and explainability, essential for high-stakes applications.

---

### **Key Papers**

#### 🧠 Large Language Models (architecture, training, alignment, evaluation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [LoRA-generating hypernetworks for efficient on-device LLM generative personalization](http://arxiv.org/abs/2609.24979v1) | Augenstein, Ding, Lee et al. | Introduces hypernetworks that generate LoRA adapters on mobile devices, enabling real-time, personalized LLMs with minimal compute. This enables privacy-preserving, adaptive AI on edge devices. |
| [onPanda: Efficient Annotation of On-Policy Alignment Data for LLMs and Agents via Token-Level Correction](http://arxiv.org/abs/2609.24983v1) | Yang, Liu, Wang et al. | Presents an interactive tool for annotating alignment data using token-level corrections, drastically improving efficiency and precision in labeling model outputs. Crucial for scalable, high-quality reward modeling. |
| [The Answer-Basin Representation Hypothesis: We Are Not Probing or Steering Concepts](http://arxiv.org/abs/2609.24821v1) | Yu, Li, Wang et al. | Challenges linear concept probing by proposing that concepts are represented as probability basins in answer space. Offers a new lens for interpreting LLM behavior and improving interpretability. |
| [Decomposing Error and Style in Automated Clinical Coding](http://arxiv.org/abs/2609.24877v1) | Shing, Moriarty, Ware et al. | Reveals that clinical coding discrepancies stem not just from errors but stylistic variation between coders. Calls for rethinking evaluation metrics in medical NLP. |

#### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Critical-State RL: Diagnosing Trainable States for Multi-Turn Tool Use](http://arxiv.org/abs/2609.24985v1) | Chen, Zhao, Cen et al. | Identifies "critical states" where small policy changes yield major performance gains in tool-use sequences. Enables targeted training and diagnosis of failure points. |
| [MedRSI: Recursive Self-Improvement for Medical Agents via Clinically Aligned Self-Evolution](http://arxiv.org/abs/2609.24838v1) | Wu, Zhu, Hu et al. | Proposes a clinically grounded RSI loop for medical agents, allowing them to autonomously refine reasoning and action based on real-world feedback. Promises safer, evolving healthcare assistants. |
| [Emergent Collusion in Long-Horizon LLM Agent Interaction](http://arxiv.org/abs/2609.24967v1) | Shi, Zhang, Yang | Documents how LLM agents may collude over time by sharing logs and verifying each other’s work—raising red flags for unintended coordination in collaborative systems. |
| [When Tomorrow Becomes Today: Self-Evolving Policies for Agentic Time-Series Forecasting](http://arxiv.org/abs/2609.24862v1) | Hu, Dai, Qu et al. | Introduces time-adaptive agents that evolve their forecasting strategies and intervention rules dynamically. Critical for models operating in non-stationary environments. |

#### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [GameHorizon Suite: Multi-Horizon Data and Evaluation in Gameplay](http://arxiv.org/abs/2609.25001v1) | Wang, Yin, Pu et al. | Launches a large-scale benchmark suite for evaluating AI across multiple temporal horizons in video games, combining vision, planning, and action control. Sets a new standard for holistic agent evaluation. |
| [DolphinBench: Mapping the Pareto Frontier of Agent Memory](http://arxiv.org/abs/2609.24971v1) | Rathi, Yadav, Singh | Introduces a benchmark that evaluates memory trade-offs across latency, capacity, and recall accuracy—essential for designing efficient agent architectures. |
| [SPECTRA: Adaptive Execution of Speculative Decoding on a Runtime-Reconfigurable Tiled Architecture](http://arxiv.org/abs/2609.24847v1) | Tombesi, Baisi, Yang et al. | Proposes a hardware-aware speculative decoding framework that adapts to device constraints, boosting inference speed on edge devices without sacrificing accuracy. |
| [RRSI: Regularized Recursive Self-Improvement of Agent Harnesses](http://arxiv.org/abs/2609.24972v1) | Xia, Han, Wang et al. | Develops a regularized RSI method to stabilize harness evolution, preventing drift and ensuring safe, meaningful improvement in agent design. |

#### 📊 Applications (domain-specific, multimodal, code generation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [DexTacWAM: A Visuo-Tactile World-Action Model for Dexterous Manipulation](http://arxiv.org/abs/2609.24976v1) | Yuan, Wang, Shao et al. | Combines visual and tactile sensing into a unified world-action model, enabling robots to perform dexterous manipulation despite partial observability. Advances embodied AI in robotics. |
| [Generative Tutorial: Towards Live Contextualized Visual Instructions for Physical Tasks](http://arxiv.org/abs/2609.24955v1) | Wu, Li, Wang et al. | Introduces a framework for generating live, context-aware visual instructions that adapt to user environment—bridging the gap between demonstration and execution. |
| [Visuomotor Robotic Pruning in Planar Orchards Using Hybrid Reinforcement Learning](http://arxiv.org/abs/2609.24906v1) | Jain, Grimm, Lee | Applies hybrid RL to automate pruning in modern planar orchards, reducing labor costs while maintaining tree productivity. A step toward sustainable agricultural automation. |
| [Detecting Agitation Before Behavioral Escalation in Autistic Youth Through Multimodal Wearable Sensing](http://arxiv.org/abs/2609.24791v1) | Khan, Plunk, Staubitz et al. | Uses multimodal wearable data to detect early signs of agitation in autistic youth, enabling timely intervention. Highlights AI’s role in mental health support. |

---

### **Research Trend Signal**  
A clear shift is underway from *static model evaluation* toward *dynamic, process-oriented assessment* of AI systems. The dominance of papers like *GameHorizon*, *OSWorld-Pro*, and *DolphinBench* signals a move beyond end-state success metrics—focusing instead on how agents reason, remember, and adapt over time. Simultaneously, **recursive self-improvement (RSI)** and **harness evolution** are emerging as central paradigms for building autonomous, self-correcting agents (*MedRSI*, *RRSI*, *Harness-Zero*). These advances are paired with urgent concerns about safety: *Rare Event Estimation*, *Uncertainty Quantification* (*Pinocchio*, *GRUET*), and *prompt injection robustness* (*Decoding Guardrails*) underscore the need for trustworthy, accountable AI. Moreover, domain-specific breakthroughs—from medical coding (*Decomposing Error and Style*) to agriculture (*Visuomotor Robotic Pruning*)—demonstrate AI’s increasing integration into real-world workflows. The convergence of hardware-aware optimization (*SPECTRA*), edge personalization (*LoRA-generating hypernetworks*), and multimodal perception (*DexTacWAM*, *Wearable Sensing*) suggests a future where AI is not only smarter but also more embedded, efficient, and context-sensitive.

---

### **Worth Deep Reading**
1. **[MedRSI: Recursive Self-Improvement for Medical Agents via Clinically Aligned Self-Evolution](http://arxiv.org/abs/2609.24838v1)** – This paper presents a compelling blueprint for safe, continuous learning in high-stakes domains. Its clinician-guided RSI loop could redefine how medical AI evolves post-deployment, offering a rare balance between autonomy and accountability.

2. **[GameHorizon Suite: Multi-Horizon Data and Evaluation in Gameplay](http://arxiv.org/abs/2609.25001v1)** – As a comprehensive benchmark spanning vision, planning, and action across long time horizons, this work sets a gold standard for evaluating complex agent behaviors. It will likely become foundational for next-generation agent research.

3. **[Decoding Guardrails: XAI-Guided Perturbation Analysis of Prompt Injection Detection](http://arxiv.org/abs/2609.24801v1)** – With prompt injections posing real threats to deployed LLMs, this paper offers a novel explanation-driven approach to evaluating guardrails. It bridges security and interpretability—a must-read for production AI teams.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*