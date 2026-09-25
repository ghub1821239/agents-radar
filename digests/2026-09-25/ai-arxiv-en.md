# ArXiv AI Research Digest 2026-09-25

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-25 00:46 UTC

---

**ArXiv AI Research Digest — 2026-09-25**

---

### **Today's Highlights**  
Recent submissions highlight a growing focus on *agent safety, robustness, and real-world deployment* across robotics, language modeling, and system-level AI governance. Key advances include novel world models that preserve motion dynamics (e.g., *Frozen Flows Forget*), scalable multi-agent reasoning frameworks (e.g., *COMPASS*), and rigorous evaluation pipelines for systemic risk under regulatory frameworks like the EU AI Act. There’s also strong momentum in efficient model compression—especially mixed-precision quantization and microscaling techniques—driven by edge deployment needs. Notably, research into *meaning identity as computation*, not geometry, challenges foundational assumptions in retrieval systems, while new benchmarks like *PASTABench* and *StudentBench* push toward proactive, longitudinal safety and pedagogical evaluation.

---

### **Key Papers**

#### 🧠 Large Language Models (architecture, training, alignment, evaluation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Can LLMs Reason About Runtime Behavior? A Repository-Level Dynamic Benchmark](http://arxiv.org/abs/2609.28449v1) | Taherkhani et al. | Introduces a dynamic benchmark to evaluate LLMs’ ability to reason about code execution across entire repositories—addressing a critical gap in static QA benchmarks. This enables more realistic assessment of coding agents. |
| [ForgetMimic: Motion Unlearning for Reinforcement Learning Humanoid Control](http://arxiv.org/abs/2609.28378v1) | Luan et al. | Proposes a method to selectively erase specific motions from RL policies without retraining, enabling safer, controllable humanoid behavior. Critical for ethical deployment in physical environments. |
| [Computation Over Geometry: Meaning Identity Is Computed, Not Shipped in the Embeddings](http://arxiv.org/abs/2609.28290v1) | Deng | Challenges the geometric interpretation of semantic equivalence in frozen encoders, showing identity is computed via interaction—not embedded. Impacts RAG, retrieval, and similarity search design. |

#### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Where Should I Join? Robot Group Joining via Language-Guided Goal Prediction](http://arxiv.org/abs/2609.28467v1) | Fang et al. | Develops a language-guided framework for robots to predict optimal group joining locations based on real-time activity—bridging social semantics with robotic navigation. |
| [Controlling Collectives of AI Agents in Reasoning Space with Spatial Transformers](http://arxiv.org/abs/28247v1) | Vatnsdal et al. | Presents COMPASS, a decentralized architecture using spatial transformers to scale reasoning across large collectives of agentic robots—overcoming scalability limits of current LLM-based planning. |
| [Agent-Editing World Model: Rethinking World Modeling for LLM Agents](http://arxiv.org/abs/2609.28416v1) | Sun et al. | Proposes a world model that allows agents to edit their internal representations dynamically, enabling adaptive, long-horizon task execution through iterative refinement. |
| [PASTABench: Proactive Assessment of Sequential Trajectories for Agent Safety](http://arxiv.org/abs/2609.28197v1) | Sun et al. | Introduces a proactive safety benchmark for multi-step agent workflows, detecting unsafe trajectories before execution—critical for real-world autonomy. |

#### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [MicroQonv: Reshaping Convolution Tensors for Efficient Microscaling](http://arxiv.org/abs/2609.28358v1) | Facq et al. | Proposes a tensor reshaping technique to enable efficient microscaling in convolutional layers—improving low-bit quantization performance on edge devices. |
| [RAMP: Robust Adaptive Mixed-Precision Quantization for Edge CPU Vision Models](http://arxiv.org/abs/2609.28262v1) | Población-Criado et al. | Introduces RAMP, a framework that adapts precision per layer based on sensitivity, significantly improving accuracy-efficiency trade-offs on resource-constrained CPUs. |
| [Predicting Quantization Price for Selecting PTQ Configurations Before Deployment](http://arxiv.org/abs/2609.28270v1) | Qiu et al. | Enables early prediction of quantization-induced degradation, allowing optimal PTQ configuration selection without full retraining—reducing trial-and-error in deployment. |
| [Support-Compiled Feature Folding: More Evidence at Lower Memory Across Tabular Foundation Models](http://arxiv.org/abs/2609.28208v1) | Zhou et al. | Introduces SCFF, a training-free inference method that folds features efficiently, resolving the feature scaling dilemma in tabular models while preserving predictive power. |

#### 📊 Applications (domain-specific, multimodal, code generation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Cross-Scale Transfer Learning for Depression Severity Prediction: From PHQ-8 to HAMD-17 Across Languages and Clinical Paradigms](http://arxiv.org/abs/2609.28430v1) | Feng et al. | Demonstrates effective cross-scale transfer learning between depression scales across languages, enabling low-data clinical severity estimation with minimal annotation. |
| [Mizar: A 159M-Parameter Audio-Language Model for Audio Understanding](http://arxiv.org/abs/2609.28344v1) | Li et al. | Presents Mizar, a compact audio-language model optimized for edge devices, achieving strong audio understanding with <200M parameters—enabling real-time, on-device speech and sound analysis. |
| [AnchorReasoning: A Visual Grounding and Causal Reasoning Dataset in Long-Tail Autonomous Driving Scenarios](http://arxiv.org/abs/2609.28366v1) | Bao et al. | Builds a dataset linking visual evidence to causal decisions in rare driving events, enhancing VLMs’ interpretability and robustness in long-tail scenarios. |
| [Shopping by algorithm: How agentic AI deploys human heuristics as a surrogate consumer](http://arxiv.org/abs/2609.28372v1) | Wadi & Ma | Reveals how LLMs mimic human pricing heuristics (e.g., just-below $9.99) when acting as surrogate shoppers—offering insights into behavioral economics in AI-driven commerce. |

---

### **Research Trend Signal**  
A clear shift toward *real-world, safety-critical deployment* is evident across recent submissions. The focus has evolved beyond model performance to include *longitudinal safety*, *motion control*, and *systemic risk monitoring*. Papers like *PASTABench*, *ForgetMimic*, and *LEAP-CBF* signal a maturing field where AI systems must be evaluated not just for accuracy but for *predictable, controllable, and safe behavior over time*. Concurrently, there's growing emphasis on *efficient, deployable AI*: microscaling, adaptive quantization, and memory-aware architectures are no longer niche but central to edge and mobile applications. The integration of *semantic reasoning with physical action*—seen in robot group joining, agent editing, and vision-language-action models—reflects a deeper convergence of language, perception, and motor control. Finally, the rise of *dynamic, repository-level benchmarks* indicates a move from isolated evaluations to holistic assessments of AI systems in operational contexts.

---

### **Worth Deep Reading**  
1. **[PASTABench: Proactive Assessment of Sequential Trajectories for Agent Safety](http://arxiv.org/abs/2609.28197v1)** – This paper introduces a forward-looking safety evaluation framework for multi-step agent workflows, addressing a major gap in current AI evaluation practices. Its proactive detection mechanism could become a gold standard for autonomous systems in healthcare, logistics, or infrastructure management.  
2. **[ForgetMimic: Motion Unlearning for Reinforcement Learning Humanoid Control](http://arxiv.org/abs/2609.28378v1)** – By enabling precise deletion of unwanted behaviors from learned policies, this work tackles a fundamental safety challenge in embodied AI. It offers a practical path toward "ethical erasure" in robotics—a crucial capability for public trust and regulatory compliance.  
3. **[Computation Over Geometry: Meaning Identity Is Computed, Not Shipped in the Embeddings](http://arxiv.org/abs/2609.28290v1)** – This conceptual breakthrough reframes how we understand semantic similarity in pre-trained models. If meaning identity is computed during interaction rather than embedded in vectors, it calls for a paradigm shift in retrieval systems, RAG, and embedding-based matching—making this essential reading for any researcher in NLP or information retrieval.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*