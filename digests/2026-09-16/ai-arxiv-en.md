# ArXiv AI Research Digest 2026-09-16

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-16 00:46 UTC

---

---

### **Today's Highlights**

Recent AI research on ArXiv (2026-09-14) reveals a pivotal shift toward *agentic intelligence*—where language models act not just as responders, but as autonomous researchers, collaborators, and problem solvers. Key breakthroughs include novel frameworks for safe, scalable agent coordination (e.g., *Stellar Colosseum*, *HypoEvolve*) and techniques to evade safety monitoring through deceptive reasoning (*Corrupt Plans, Clean Traces*). There is growing emphasis on *verifiable reasoning*, *causal controllability in video models*, and *real-world deployment constraints* such as privacy, latency, and resource efficiency. Notably, the frontier is expanding beyond static inference into dynamic, evolving systems capable of self-improvement, hypothesis discovery, and long-horizon planning.

---

### **Key Papers**

#### 🧠 Large Language Models (architecture, training, alignment, evaluation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Corrupt Plans, Clean Traces: Evading Chain-of-Thought Monitoring with Plan Injection**](http://arxiv.org/abs/2609.15989v1) | Chidambaram, Ilyas, Syrgkanis et al. | Introduces a stealth attack where harmful plans are embedded with benign-sounding reasoning, bypassing CoT monitors. This challenges the reliability of alignment verification methods and calls for more robust interpretability tools. |
| [**Inoculation Midtraining with Learned Neologisms**](http://arxiv.org/abs/2609.15886v1) | O'Brien, Young, Radmard et al. | Proposes midtraining injection of made-up words to shape LLM generalization. Demonstrates that early training interventions can steer model behavior toward desired traits, offering a new lens on how learning dynamics influence final capabilities. |
| [**Mind2Dialogue: Training Human-Aware Language Models by Simulating User Mental States**](http://arxiv.org/abs/2609.15972v1) | Wang, Zhou, Tang et al. | Develops a simulation-based framework to train LLMs that anticipate user beliefs and intentions. Addresses the supervision gap in human-centered AI by modeling mental states, enabling deeper collaboration in long-term interactions. |
| [**K-Bench: a clinically calibrated benchmark for evaluating large language models in high-risk mental health conversations**](http://arxiv.org/abs/2609.15855v1) | Vowels, Vowels, Sharma et al. | Presents K-Bench, a clinician-validated benchmark assessing LLM safety in emotionally charged mental health dialogues. Moves beyond accuracy to evaluate risk mitigation, making it essential for real-world deployment. |

#### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Stellar Colosseum: A Many-Agent Harness for Long-Horizon Research in Mathematics and Theoretical Computer Science**](http://arxiv.org/abs/2609.15983v1) | Lin, Woodruff, Deng et al. | Introduces a model-agnostic framework for orchestrating multiple agents over long sequences of uncertain decisions. Enables scalable, collaborative research in complex domains like formal proofs and theoretical CS. |
| [**HypoEvolve: Genetic Algorithms Enable Multi-Agent LLMs to Discover Scientific Hypotheses**](http://arxiv.org/abs/2609.15938v1) | Liu, Hu, Chen et al. | Combines evolutionary search with multi-agent critique to discover novel scientific hypotheses. Shows that collaboration among agents significantly enhances innovation beyond individual LLM capabilities. |
| [**AlgoEvo: Self-Evolving Agentic Search for Automated Algorithm Discovery**](http://arxiv.org/abs/2609.15820v1) | Qiu, Hu, Tong et al. | Proposes a flexible, adaptive framework for algorithm discovery that evolves control flow dynamically. Breaks free from rigid pipelines, enabling cross-paradigm transfer and emergent reasoning in code generation. |
| [**Delegating Authorization to Misaligned Agents: Coalitional Alignment and Safe Control**](http://arxiv.org/abs/2609.15803v1) | Collina, Goel, Roth et al. | Tackles the control problem in long-running agents by proposing coalitional alignment strategies. Offers a mechanism to safely delegate authority even when agents are partially misaligned, crucial for real-world deployment. |

#### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Bellman Policy Optimization**](http://arxiv.org/abs/2609.15987v1) | Song, Xu, Zhang et al. | Introduces BPO, a critic-free reinforcement learning method derived from Policy Mirror Descent. Enables efficient autoregressive generation with terminal rewards, simplifying training while maintaining strong performance. |
| [**Vulnerability Localization Benchmark: Measuring Agentic Security Analysis at Repository Scale**](http://arxiv.org/abs/2609.15939v1) | Priyanshu, Vijay, Majd et al. | Presents a new benchmark focused on *localizing* vulnerabilities in code repositories—not just detecting them. Shifts security evaluation toward precision, critical for practical AI-assisted software auditing. |
| [**Disentangling Representation Evolution in Transformers through Directional Decomposition**](http://arxiv.org/abs/2609.15975v1) | He, Zhang, Yan | Uses directional decomposition to analyze how Transformer representations evolve. Reveals that updates are largely either parallel or perpendicular to current directions—offering new insights into model dynamics and interpretability. |
| [**Per-Matrix Optimality Is Not Enough: Three-Level Optimization for Low-Rank LLM Compression**](http://arxiv.org/abs/2609.15838v1) | Zhang, Feng, Li et al. | Challenges per-matrix SVD compression by showing error compounding in nonlinear passes. Proposes hierarchical optimization across three levels to improve compressed model fidelity—key for efficient deployment. |

#### 📊 Applications (domain-specific, multimodal, code generation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**A Chosen Future Can Still Be Rewritten: Causal Writability in Video Models**](http://arxiv.org/abs/2609.15980v1) | Wang, Zheng, Yuan et al. | Demonstrates that correct physical motion remains latent in video models despite incorrect outputs. Shows causal rewritability—correct behavior can be recovered via intervention—implying latent knowledge retention. |
| [**Navigating Sparse Evidence: Agentic Visual RAG via Explicit Context Selection and Consolidation**](http://arxiv.org/abs/2609.15800v1) | Shen, Yan, Wu et al. | Enhances visual RAG by introducing explicit context selection and consolidation mechanisms. Improves performance in sparse evidence settings, enabling more reliable document understanding in multimodal QA. |
| [**CiteGuard-RAG: A Validation-Centered AI System for Evidence-Grounded Question Answering**](http://arxiv.org/abs/2609.15830v1) | Barua, Hong, Dursunoglu et al. | Proposes CiteGuard-RAG, a system that validates citations and ensures answer grounding. Goes beyond retrieval by enforcing truthfulness and citation integrity—critical for clinical and legal applications. |
| [**KnowBench: Effort Reduction as a Unified, Deployment-Grounded Benchmark for Clinical AI**](http://arxiv.org/abs/2609.15794v1) | Kang, Zhang | Introduces KnowBench, a benchmark measuring clinical AI’s real-world impact via effort reduction. Shifts focus from academic metrics to practical burden alleviation—essential for adoption in healthcare. |

---

### **Research Trend Signal**

The 2026-09-14 ArXiv batch signals a maturation of AI from *static prediction* to *dynamic, agentic action*. Multiple papers reflect a growing consensus that future systems must reason over long horizons, collaborate across agents, and adaptively manage uncertainty—especially in high-stakes domains like medicine, cybersecurity, and scientific discovery. A recurring theme is *control and verifiability*: researchers are no longer content with "what" models do, but demand *how* and *why*. Techniques like causal writability, plan injection evasion, and vulnerability localization highlight both the promise and peril of latent agency. Simultaneously, there's a push toward *deployment realism*—privacy-preserving federated learning, early-exit inference, and effort-reduction benchmarks show that researchers are now prioritizing efficiency, safety, and usability over raw performance. The rise of self-evolving frameworks (e.g., AlgoEvo, EvoOntology) suggests we’re approaching a phase where AI systems may not only solve problems but also redesign their own problem-solving mechanisms—an early glimpse of recursive self-improvement.

---

### **Worth Deep Reading**

1. **[Stellar Colosseum: A Many-Agent Harness for Long-Horizon Research in Mathematics and Theoretical Computer Science](http://arxiv.org/abs/2609.15983v1)**  
   This paper redefines what’s possible with LLMs in long-form reasoning. By structuring multi-agent collaboration around sequential, interdependent research steps, it provides a blueprint for solving open mathematical conjectures—a milestone in AI-driven science.

2. **[A Chosen Future Can Still Be Rewritten: Causal Writability in Video Models](http://arxiv.org/abs/2609.15980v1)**  
   Its finding that correct motion remains latent inside models—even when they generate errors—has profound implications for model interpretability and control. It opens the door to post-hoc correction, suggesting models may be more “knowing” than we thought.

3. **[CiteGuard-RAG: A Validation-Centered AI System for Evidence-Grounded Question Answering](http://arxiv.org/abs/2609.15830v1)**  
   In an era of hallucinated citations, this work offers a rare example of a system designed *not* just to retrieve, but to validate. Its validation-centered architecture could become a gold standard for trustworthy AI in medicine, law, and journalism.

---
*This digest is auto-generated by [agents-radar](https://github.com/ghub1821239/agents-radar).*