# ArXiv AI Research Digest 2026-09-30

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-30 01:30 UTC

---

---

### **Today's Highlights**  
Recent AI research on ArXiv (2026-09-30) underscores a strong momentum in *embodied and interactive agent systems*, particularly in long-horizon reasoning, robust tool use, and proactive behavior. Key advances include novel architectures for efficient on-device LLM inference (e.g., IronLLM), scalable vision-language-action models (AeroManip-VLA), and pre-cognitive planning (PrecogUI). There is growing focus on *alignment safety under real-world perturbations*, with new defenses against harmful fine-tuning and gradient-based jailbreaks. Additionally, significant progress is being made in *efficient long-context processing* through memory compression (ARC-KV), tokenization (NesTok), and position-aware encoding (Aperture), enabling more scalable and accurate language modeling.

---

### **Key Papers**

#### 🧠 Large Language Models (architecture, training, alignment, evaluation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [CoEM: Empowering Long-Context Reasoning with Commit-on-Evidence Memory](http://arxiv.org/abs/2609.36935v1) | Jingguang Li, Yebo Wu, Zuyi Guo et al. | Introduces a memory mechanism that commits only to evidence-backed knowledge, reducing hallucination in long-context tasks. This improves reliability without increasing context length. |
| [ER-JEPA: Experience Replay Improves Joint-Embedding Predictive Learning in Language Models](http://arxiv.org/abs/2609.36952v1) | Jingnan Pu, Zi-En Fan, Feng Lian | Enhances semantic alignment in LLMs via experience replay in JEPA, improving generalization and perception of abstract knowledge. Addresses core weaknesses in current LLM semantics. |
| [BaLEEN: Biasing with Latent Encoded Entities for Context-Aware ASR](http://arxiv.org/abs/2609.36913v1) | Chihiro Taguchi, Yotaro Kubo, Rujikorn Charakorn et al. | Enables dynamic contextual adaptation in ASR without fine-tuning by injecting latent entity biases. Crucial for domain-specific speech recognition accuracy. |
| [IronLLM: Forging Compact Edge-Native Language Models for Real-Time Embodied Intelligence](http://arxiv.org/abs/2609.36860v1) | Changdi Yang, Fengquan Jiao, Haochih Lin et al. | Presents a 654M-parameter model optimized for edge deployment using shared-KV prediction and hybrid attention. Enables real-time, low-latency LLM inference on devices. |

#### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [PrecogUI: Proactive GUI Agents via Pre-cognitive Simulation and Experience Retrieval](http://arxiv.org/abs/2609.36923v1) | Bin Kang, Jiarui Ouyang, Li Jiang et al. | Proposes a pre-cognitive architecture allowing GUI agents to simulate future states and avoid cascading failures. Shifts from reactive to anticipatory execution. |
| [Neuro-Symbolic Computer Use: Learning Reusable Policies for Reliable and Efficient Execution](http://arxiv.org/abs/2609.36927v1) | Hyewon Suh, Thanh Minh Nguyen, Chih-Lun Lee et al. | Introduces neuro-symbolic policies for recurring workflows, eliminating redundant re-planning. Boosts efficiency and reliability in repetitive automation tasks. |
| [When Upstream Messages Override Correct Answers: A Controlled Study of Multi-Agent LLM Collaboration](http://arxiv.org/abs/2609.36855v1) | Yaxin Gong, Gangyi Zhang, Chongming Gao et al. | Reveals how upstream agents can override downstream correct answers due to message bias. Highlights risks in collaborative LLM systems. |
| [The Default Trap: Rethinking Plan Evaluation in Tool-Using LLM Agents](http://arxiv.org/abs/2609.36829v1) | Xueqi Li, Jingjie Ning, Yibo Kong | Identifies a critical flaw in plan evaluation where removing default plans is misinterpreted as low responsiveness. Challenges standard evaluation paradigms. |

#### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Aperture: Merge-Consistent Rotary States for Compressed Tokens](http://arxiv.org/abs/2609.36781v1) | Yuhao Du, Shunian Chen | Proposes storing Fourier moments of merged tokens to preserve positional information across compressions. Solves a key challenge in token-level sequence merging. |
| [ARC-KV: Amortizing Anchor Search for Reconstruction-Based KV Cache Compaction](http://arxiv.org/abs/2609.36835v1) | Zheyu Shen, Guanhua Wang, Dezhan Tu et al. | Introduces an amortized anchor search method to reduce KV cache overhead in long-context inference. Significantly improves memory efficiency without reconstruction loss. |
| [WEFT: Scaling Tool-Use Post-Training for General-Purpose Agents](http://arxiv.org/abs/2609.36887v1) | Bo Mao, Hang He, Linting Wang et al. | Advocates scaling full agentic ecosystems—not just environments—for tool-use post-training. Emphasizes holistic system integration over isolated components. |
| [On-Policy Visual Evidence Distillation](http://arxiv.org/abs/2609.36838v1) | Shaohang Wei, Feifan Song, Guangyue Peng et al. | Develops a method to distill visual evidence from student-generated trajectories, correcting error propagation in visual agents. Enhances reasoning consistency. |

#### 📊 Applications (domain-specific, multimodal, code generation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [VLALight: A Vision-Language-Action Model for Traffic Signal Control](http://arxiv.org/abs/2609.36934v1) | Pan Zhang, Siqi Lai, Kemu Dong et al. | Uses roadside camera data with VLA to enable adaptive traffic signal control. Reduces congestion without relying on hand-engineered features. |
| [Automated Screw Planning for Reduced Pelvic Fractures Based on Statistical Shape Models and Deep Learning](http://arxiv.org/abs/2609.36847v1) | Yang Gao, Sutuke Yibulayimu, Yanzhen Liu et al. | Combines statistical shape modeling and deep learning for precise screw trajectory planning in pelvic surgery. Improves surgical safety and accuracy. |
| [Code4Scene: Benchmarking Coding Agents for Constructing and Editing 3D Scenes](http://arxiv.org/abs/2609.36777v1) | Xiaokang Ye, Siddhant Hitesh Mantri, Zimeng Chen et al. | Introduces a benchmark to evaluate coding agents’ spatial understanding in 3D scene construction. Exposes gaps in geometric fidelity despite visual plausibility. |
| [AeroManip-VLA: Scalable Vision-Language-Action Learning for Aerial Manipulation with RL-Generated Demonstrations](http://arxiv.org/abs/2609.36915v1) | Rui Huang, Yanlin Mu, Lidong Li et al. | Extends VLA to aerial robots using reinforcement learning-generated demonstrations. Enables complex 3D manipulation in hard-to-reach spaces. |

---

### **Research Trend Signal**  
A clear shift toward *robust, proactive, and embodied intelligence* is evident across today’s submissions. Researchers are moving beyond static, reactive models toward systems that anticipate failure (PrecogUI), reason about their own state (STRAT), and adaptively manage memory and tools (UpliftMem, WEFT). The emphasis on *efficiency and scalability*—especially in edge deployment (IronLLM), long-context handling (Aperture, ARC-KV), and compressed inference—is driven by real-world deployment needs. Meanwhile, *alignment safety* remains central, with new work probing vulnerabilities in collaborative settings (multi-agent message override) and fine-tuning pipelines (harmful fine-tuning defense). Notably, there is growing interest in *system-level integration*: the realization that tool-use agents require not just better models, but better ecosystems (WEFT). These trends suggest a maturing field focused on deploying AI not just as a black box, but as a reliable, self-aware, and contextually intelligent partner.

---

### **Worth Deep Reading**
1. **[PrecogUI: Proactive GUI Agents via Pre-cognitive Simulation and Experience Retrieval](http://arxiv.org/abs/2609.36923v1)**  
   *Why*: It redefines agent intelligence by introducing pre-cognitive simulation—a paradigm shift from reactive to predictive behavior. This paper addresses a fundamental limitation in GUI automation and offers a blueprint for building resilient, long-horizon agents.

2. **[Aperture: Merge-Consistent Rotary States for Compressed Tokens](http://arxiv.org/abs/2609.36781v1)**  
   *Why*: Solves a subtle but critical problem in token compression: preserving positional semantics across merges. Its Fourier-moment approach is elegant and widely applicable, potentially influencing future tokenizer design across multimodal and sequential models.

3. **[WEFT: Scaling Tool-Use Post-Training for General-Purpose Agents](http://arxiv.org/abs/2609.36887v1)**  
   *Why*: Challenges the dominant trend of isolating environment scaling. By advocating for holistic ecosystem scaling, it reframes the research agenda for agentic systems, making it essential reading for anyone building practical, deployable agents.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*