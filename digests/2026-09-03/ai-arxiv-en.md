# ArXiv AI Research Digest 2026-09-03

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-03 00:36 UTC

---

---

### **Today's Highlights**  
Recent submissions reveal a strong momentum in *agent-centric AI*, where large language models (LLMs) are no longer just passive tools but active, self-modifying participants in complex workflows. Key advances include frameworks enabling LLMs to design video coding tools, evolve their own execution harnesses, and reason about dynamic software lifecycles—signaling a shift toward autonomous, adaptive systems. Parallel progress in evaluation rigor is evident: new benchmarks like CordisBench and TempCloze challenge models’ reasoning beyond surface-level patterns, while studies on quantization damage and alignment fragility expose deeper vulnerabilities in model behavior. Meanwhile, efficiency innovations—from LatentPress for context compression to power-law entropy search for hyperparameter tuning—reflect growing attention to deployability and scalability.

---

### **Key Papers**

#### 🧠 Large Language Models (architecture, training, alignment, evaluation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Beyond Scores: Understanding LLM-as-a-Judge Mechanisms in Summarization Evaluation](http://arxiv.org/abs/2609.01604v1) | Himil Vasava, Ming Jiang et al. | Reveals the internal mechanisms behind LLM-based evaluators, showing how they assign scores through subtle linguistic and structural cues. This insight is critical for improving fairness and reliability in automated NLG evaluation. |
| [When Safety Routing Breaks: Understanding Alignment Fragility under Benign Fine-Tuning](http://arxiv.org/abs/2609.01455v1) | Yitong Guo, Xiaoyi Chen et al. | Proposes a Fisher-geometric explanation for safety alignment collapse during fine-tuning, challenging the dominant gradient-conflict narrative. This reframing offers new paths for robustness in aligned model deployment. |
| [The Rise of Verbal Reinforcement Learning](http://arxiv.org/abs/2609.01597v1) | Kshitij Tayal, Arun Sharma et al. | Introduces Verbal RL—a paradigm where natural language feedback guides agent behavior. It unifies human intent with machine learning, enabling more intuitive and interpretable policy improvement. |
| [StudentSim: Training LLM-based Student Simulators](http://arxiv.org/abs/2609.01591v1) | Ke Yang, Chenglong Wang et al. | Presents a method to train AI tutors using synthetic student simulators, reducing reliance on costly real-user data. This enables scalable personalization in educational AI systems. |

#### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Harness-of-Harness: Multi-Day Autonomous Software Development with Continual Improvement](http://arxiv.org/abs/2609.01481v1) | Haoyang Yan, Min-le Su et al. | Introduces HoH, a framework allowing coding agents to autonomously improve their execution environment over time. Enables long-horizon, self-evolving software development without human intervention. |
| [CordisBench: Can Language Models Reason About Component Lifecycles in Dynamic Agent Harnesses?](http://arxiv.org/abs/2609.01600v1) | Damien Sileo, Dimitri Kachler | Launches a 1,200-question benchmark assessing LLMs' ability to track cascading effects of plugin changes in dynamic agent systems. Crucial for ensuring safe and predictable agent evolution. |
| [GlossoGen: Emergent Language in Complex Multi-Agent LLM Interactions](http://arxiv.org/abs/2609.01491v1) | Elias Stengel-Eskin, Newton Sander et al. | Introduces a platform to study emergent communication in multi-LLM-agent ecosystems. Finds that agents develop structured, efficient languages—raising both safety and monitoring challenges. |
| [EvoSCM: Scientific Belief Revision Through Causal Model Evolution and Experimentation](http://arxiv.org/abs/2609.01526v1) | Qing Zhao, Haowei Li et al. | Equips scientific agents with explicit causal models to enable testable belief revision. Moves beyond free-form hypothesis generation toward accountable, iterative scientific reasoning. |

#### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Efficient SWE Agent Benchmarking via Trajectory-Aware Evaluation](http://arxiv.org/abs/2609.01603v1) | Kefeng Duan, Dewu Zheng et al. | Proposes trajectory-aware evaluation to reduce cost in software engineering agent testing by focusing on meaningful execution paths. Offers a scalable alternative to full-benchmark runs. |
| [LatentPress: Context Compression Beyond Text and Vision](http://arxiv.org/abs/2609.01507v1) | Zhengze Zhou, Hejian Sang | Introduces latent memory tokens as a compressed, model-native representation of conversation history. Reduces context bloat and improves inference efficiency across multimodal tasks. |
| [Adaptive Critical Token-Aware Retrieval for Repository-Level Code Generation](http://arxiv.org/abs/2609.01601v1) | Kefeng Duan, Dewu Zheng et al. | Develops retrieval strategies that prioritize semantically critical code segments when generating from large repositories. Improves coherence and consistency in code synthesis. |
| [Scaling Near-Optimal SFT-RL Annotation Budget Allocation from Small to Large LLMs](http://arxiv.org/abs/2609.01573v1) | Jingtan Wang, Arun Verma et al. | Provides a principled framework for allocating annotation budgets between SFT and RL stages. Enables cost-effective post-training at scale. |
| [Efficiently Estimating Optimal Hyperparameter Scaling Laws through Power-Law Entropy Search](http://arxiv.org/abs/2609.01431v1) | Zhiliang Chen, Sebastian Ament et al. | Uses entropy-based search to estimate scaling laws for hyperparameters, enabling accurate prediction of optimal configurations without exhaustive tuning. |

#### 📊 Applications (domain-specific, multimodal, code generation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Can LLMs Design Video Coding Tools? A Case Study on Planar Mode](http://arxiv.org/abs/2609.01535v1) | Yingwen Zhang, Meng Wang et al. | Demonstrates that LLMs can propose novel algorithmic modifications to video coding tools with measurable performance gains. Opens new avenues for AI-driven media technology innovation. |
| [EdiTikZ: Scientific Figure Editing from Revision Trajectories](http://arxiv.org/abs/2609.01409v1) | Christian Greisinger, Zhixue Zhao et al. | Enables VLMs to edit scientific figures by interpreting revision histories, reducing manual effort in figure refinement. Advances automation in scholarly publishing. |
| [Semantic-Guided Multimodal Preprocessing for Vision Transformer-Based Clear Cell Renal Cell Carcinoma Grading](http://arxiv.org/abs/2609.01426v1) | Fatemeh Javadian, Zhu Chen et al. | Integrates semantic knowledge into preprocessing pipelines for medical imaging, improving grading accuracy by aligning image analysis with clinical context. |
| [Evaluating Multimodal LLMs as Generalist Vision-Language-Action Agents for Drone Control](http://arxiv.org/abs/2609.01404v1) | Jaewoo Park, Minyoung Lee et al. | Tests MLLMs directly in drone control loops using only textual commands. Shows strong performance in command-following, tracking, and searching—demonstrating vision-language-action generalization. |

---

### **Research Trend Signal**  
A clear trend emerging from today’s submissions is the **rise of self-referential, self-improving AI agents**—systems that don’t just execute tasks but evolve their own infrastructure, reasoning, and even language. Frameworks like *Harness-of-Harness* and *GlossoGen* signal a move beyond static agent designs toward living, adaptive systems capable of continuous learning and structural change. This shift demands new evaluation paradigms: benchmarks like *CordisBench* and *TempCloze* emphasize reasoning about temporal causality and hidden structure, moving past superficial metrics. At the same time, efficiency remains paramount—innovations in context compression (*LatentPress*), budget allocation (*SFT-RL scaling*), and hyperparameter prediction show that deployment readiness is now central to research. The fusion of symbolic reasoning (*NeuSOGA*) with deep learning, and the formalization of alignment risks (*Fisher-geometric fragility*), further indicate a maturing field focused not just on capability, but on accountability, safety, and interpretability.

---

### **Worth Deep Reading**

1. **[CordisBench: Can Language Models Reason About Component Lifecycles in Dynamic Agent Harnesses?](http://arxiv.org/abs/2609.01600v1)**  
   *Why*: As agents gain autonomy, their ability to manage dependencies and side effects becomes existential. This benchmark exposes a critical blind spot in current models—reasoning about cascading changes—and provides a rigorous way to measure it. Essential reading for anyone building or evaluating next-gen agentic systems.

2. **[The Rise of Verbal Reinforcement Learning](http://arxiv.org/abs/2609.01597v1)**  
   *Why*: This paper redefines feedback in agent training, positioning natural language as the primary channel for shaping behavior. Its unified framework could transform how we interact with AI—making training more intuitive, transparent, and aligned with human intent.

3. **[From Rollouts to Recipes: Self-Contained Post-Training for LLMs](http://arxiv.org/abs/2609.01422v1)**  
   *Why*: By dynamically routing post-training based on model behavior, this work introduces a form of *meta-learning within training*. It addresses one of the biggest inefficiencies in LLM finetuning—uniform treatment of diverse samples—and points toward smarter, adaptive training pipelines.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*