# ArXiv AI Research Digest 2026-09-18

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-18 00:45 UTC

---

**ArXiv AI Research Digest (2026-09-18)**

---

### **Today's Highlights**

Recent submissions reveal a strong momentum in *agentic systems*, with multiple papers addressing core challenges in reasoning, tool use, and policy compliance. A notable shift toward *mechanistic interpretability* is evident, as researchers probe internal representations to detect reward hacking and model collapse. Advances in *efficient inference and training*—from memory-aware vision-language models to sparse landmark embeddings—are enabling scalable deployment. Meanwhile, domain-specific applications in healthcare, robotics, and scientific discovery highlight the growing maturity of AI agents in real-world settings. The convergence of *multi-modal understanding*, *physical grounding*, and *structured reasoning* signals a move beyond pure language modeling toward embodied, accountable intelligence.

---

### **Key Papers**

#### 🧠 Large Language Models (architecture, training, alignment, evaluation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Objective vs. Search: Decomposing What Makes a Good Tokeniser](http://arxiv.org/abs/2609.19145v1) | Yavuz, Meister, Pimentel et al. | This work disentangles BPE and UnigramLM into orthogonal axes—optimization objective (compression vs. likelihood) and search procedure (merging vs. pruning)—offering a principled framework for designing future tokenizers. It matters because tokenization fundamentally shapes model efficiency and generalization. |
| [A Zeroth-Order Paradigm for LLM Preference Alignment](http://arxiv.org/abs/2609.19144v1) | Chen, Chen, Yin et al. | Proposes a zeroth-order method to align LLMs with human preferences without relying on likelihood gradients, improving robustness in low-margin preference pairs. This enables more reliable and efficient alignment, especially in safety-critical domains. |
| [Preventing Model Collapse: A Fisher-Rao Perspective on the Dynamics of Training with Synthetic Data](http://arxiv.org/abs/2609.18878v1) | Marchi, Silvestre, Gharesifard et al. | Introduces a Fisher-Rao information geometry lens to explain and prevent model collapse during synthetic data training, identifying instability triggers in parameter space. This provides a theoretical foundation for safer, sustainable LLM scaling. |
| [Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data](http://arxiv.org/abs/2609.18842v1) | Hu, Clarke, Zhang et al. | Demonstrates a paradigm where LLM weights are dynamically generated from live input data rather than pre-stored, enabling infinite scalability and adaptive behavior. This redefines the boundaries of model capacity and personalization. |

#### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Cognitive Extensions for Dual-Process Language Agents: Memory and Self-Reflection in Interactive Environments](http://arxiv.org/abs/2609.19128v1) | Santos, Oliveira et al. | Enhances dual-process agents with modular memory and self-reflection modules, enabling long-horizon state tracking and recovery from failures. This advances robustness in complex, interactive tasks. |
| [Ask the Tool, Don't Guess: Agent Tool Calls Hold Their Progress, and the Serving System Should Read It](http://arxiv.org/abs/2609.18849v1) | Liu, Zhang, Li et al. | Argues that serving systems should read agent tool call states directly instead of guessing durations, reducing cache overhead and latency. This improves efficiency and reliability in agentic workflows. |
| [Compositional Policy Violations: When Step-Level Compliance Fails In Agentic AI Workflows](http://arxiv.org/abs/2609.18820v1) | Kurady, Grandhi, Gupta et al. | Reveals that per-step compliance checks can miss systemic violations in multi-step workflows, advocating for compositional policy evaluation. This is critical for regulatory and ethical governance of AI agents. |
| [Taming the Agentic RAN: Stability-Guaranteed Arbitration of Autonomous AI Agents in O-RAN](http://arxiv.org/abs/2609.18857v1) | Natanzi, Tang | Demonstrates unsafe interference between independently optimized AI agents in O-RAN control planes, proposing arbitration mechanisms to ensure system-wide stability. This addresses a pressing risk in real-time network autonomy. |

#### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [rMuscle: Robotic Muscle Memory for Efficient Vision-Language-Action Model Inference](http://arxiv.org/abs/2609.19104v1) | Zhou, Li, Chen et al. | Introduces "robotic muscle memory" to reuse partial inference across repetitive factory tasks, drastically reducing computational cost. This enables practical deployment of VLA models in industrial automation. |
| [ReFigBench: Benchmarking Scientific Figure Reconstruction as Editable PowerPoint Artifacts](http://arxiv.org/abs/2609.18844v1) | Fan, Wei, Li et al. | Proposes ReFigBench, a benchmark evaluating multimodal agents’ ability to reconstruct figures into editable, reusable formats—beyond simple image-to-text matching. This advances evaluation of practical scientific workflow automation. |
| [ASLEval: Measuring Privacy Exposure Displacement in LLM Agent Sessions](http://arxiv.org/abs/2609.18864v1) | Wu, Huang, Long et al. | Introduces ASLEval to detect privacy leaks across entire agent sessions, not just final outputs, using a holistic exposure metric. This fills a critical gap in agent privacy evaluation. |
| [How Model Growth, Recursion, and Boundary Operators Influence Scaling Exponents](http://arxiv.org/abs/2609.19107v1) | Chen, Vegesna, Dahal et al. | Shows architectural choices can alter scaling exponents, enabling exponential performance gains with compute—a challenge to conventional wisdom about fixed scaling laws. This opens new pathways for model design. |

#### 📊 Applications (domain-specific, multimodal, code generation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [PANORAMA: Panoptic Grounded Captioning via Mask Proposal Selection](http://arxiv.org/abs/2609.19143v1) | Pieri, Kazakos, Chen et al. | Achieves comprehensive, pixel-level grounded captioning by selecting high-quality mask proposals, overcoming spatial ambiguity in current VLMs. This advances visual understanding for robotics and accessibility. |
| [Dreaming the Sound of Contact: Leveraging Video and Audio Generation for Zero-Shot Force-Aware Manipulation and Data Generation](http://arxiv.org/abs/2609.19137v1) | Ji, Li, Suh et al. | Uses video-audio generation to simulate contact forces in robot manipulation, enabling zero-shot learning of force-aware trajectories. This bridges the gap between kinematic and physical planning. |
| [ScienceIDE: Turning World's Scientific Codebase into Agent Learnable Environments](http://arxiv.org/abs/2609.19134v1) | Geng, Huang, Li et al. | Transforms scientific code repositories into structured, agent-friendly environments, overcoming fragmentation and implicit conventions. This unlocks massive real-world knowledge for AI agents. |
| [EviGen: Predictive Evidence Scaffolding for Verifiable Clinical Rationale Generation](http://arxiv.org/abs/2609.18852v1) | Li, Burre, Sun et al. | Builds a system that proactively scaffolds evidence from EHRs to generate verifiable clinical rationales, reducing burden on LLMs and clinicians. This supports trustworthy decision-making in medicine. |

---

### **Research Trend Signal**

A clear trend emerging from today’s submissions is the *move from isolated model capabilities to integrated, accountable, and physically grounded agentic systems*. Researchers are increasingly focused on *end-to-end agent reliability*, spanning from memory management and tool use to policy compliance and privacy. The rise of *mechanistic interpretability*—evident in studies of reward hacking, model collapse, and internal representations—reflects a maturing field prioritizing safety and transparency. Simultaneously, there's a push toward *practical benchmarks* that assess not just output quality but process integrity (e.g., ReFigBench, ASLEval). The integration of *physics-informed learning*, *sparse representations*, and *dynamic parameter generation* suggests a future where models are not only smarter but also more efficient, adaptive, and aligned with real-world constraints. These developments point toward a new era of *embodied, responsible AI* that operates within complex, dynamic environments.

---

### **Worth Deep Reading**

1. **[Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data](http://arxiv.org/abs/2609.18842v1)**  
   This paper redefines the very concept of model parameters, proposing a system where weights are generated on-demand from input data. It challenges foundational assumptions about model size and storage, offering a path to truly scalable, context-sensitive LLMs. Its implications for personalization, privacy, and deployment are profound.

2. **[Compositional Policy Violations: When Step-Level Compliance Fails In Agentic AI Workflows](http://arxiv.org/abs/2609.18820v1)**  
   This paper exposes a critical flaw in current AI governance: checking each step individually fails to catch systemic policy breaches. By introducing a compositional evaluation framework, it sets a new standard for auditing complex agentic systems—essential for legal, medical, and financial applications.

3. **[PANORAMA: Panoptic Grounded Captioning via Mask Proposal Selection](http://arxiv.org/abs/2609.19143v1)**  
   For vision-language research, this paper offers a significant leap in spatial grounding. By combining panoptic segmentation with intelligent mask selection, it achieves accurate, detailed, and pixel-aligned descriptions—key for robotics, assistive tech, and immersive interfaces.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*