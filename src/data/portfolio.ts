export type ProjectLink = {
  label: string
  href: string
  kind: 'paper' | 'code' | 'demo'
}

export type ProjectMetric = {
  value: string
  label: string
}

export type Project = {
  id: string
  number: string
  title: string
  shortTitle: string
  context: string
  period: string
  role: string
  summary: string
  challenge: string
  approach: string
  result: string
  metrics: ProjectMetric[]
  technologies: string[]
  links: ProjectLink[]
  visual: 'agents' | 'piano' | 'ranking' | 'reasoning'
}

export type Experience = {
  organization: string
  role: string
  period: string
  location?: string
  summary: string
  highlights: string[]
}

export type ArchiveItem = {
  year: string
  title: string
  type: string
  description: string
  href?: string
  label?: string
}

export const projects: Project[] = [
  {
    id: 'hybrid-advantage-shaping',
    number: '01',
    title: 'Teaching LLM agents which decisions mattered',
    shortTitle: 'Hybrid Advantage Shaping',
    context: 'Stanford CS224R · Team of three',
    period: '2026',
    role: 'Researcher & ML engineer',
    summary:
      'A reinforcement-learning framework for assigning goal-aware, per-turn credit to multi-step language agents trained with sparse terminal rewards.',
    challenge:
      'FlatGRPO gives every turn in a successful trajectory the same advantage—even when some actions are decisive, incidental, or actively harmful.',
    approach:
      'We introduced Hybrid Advantage Shaping (HAS), blending stable trajectory-level GRPO credit with TurnRD, a compact bidirectional transformer that decomposes returns across turns. FiLM conditioning lets the credit model interpret each action relative to the agent’s goal.',
    result:
      'The same α-blend improved performance across two agentic benchmarks while preserving flatGRPO as an exact fallback at α = 1.',
    metrics: [
      { value: '91.3%', label: 'WebShop success' },
      { value: '+10.8 pp', label: 'over flatGRPO' },
      { value: '80%', label: 'AlfWorld success' },
    ],
    technologies: ['PyTorch', 'GRPO / PPO', 'Transformers', 'LoRA', 'FiLM', 'A100'],
    links: [
      {
        label: 'Read final report',
        href: '/research/hybrid-advantage-shaping.pdf',
        kind: 'paper',
      },
    ],
    visual: 'agents',
  },
  {
    id: 'fimo-klavier',
    number: '02',
    title: 'Turning piano motion into useful technical feedback',
    shortTitle: 'FiMo-Klavier',
    context: 'Stanford Symbolic Systems honors thesis',
    period: '2026',
    role: 'Sole author & engineer',
    summary:
      'A video-only machine-learning system that analyzes fine-motor piano technique and generates concise, evidence-grounded feedback for self-regulated practice.',
    challenge:
      'Most learning tools score musical output. They do not explain how a pianist’s hand, wrist, and finger movement should change—and expert instruction remains inaccessible to many students.',
    approach:
      'I built a multi-stage pipeline: normalized hand-kinematics features, a hybrid BiLSTM–Transformer anomaly detector, a 114-model HMM bank for interpretable evidence, and a gated LLM feedback stage.',
    result:
      'The system separated lower-level from advanced motion patterns and produced feedback with measurable semantic overlap to human-annotated technical observations, while surfacing clear calibration limits for future work.',
    metrics: [
      { value: '137.2 hrs', label: 'piano video' },
      { value: '1.02M', label: 'motion windows' },
      { value: '16,846', label: 'processed clips' },
    ],
    technologies: ['PyTorch', 'BiLSTM', 'Transformers', 'HMMs', 'MediaPipe', 'LLM evaluation'],
    links: [
      {
        label: 'Read honors thesis',
        href: '/research/fimo-klavier-honors-thesis.pdf',
        kind: 'paper',
      },
      {
        label: 'View earlier code',
        href: 'https://github.com/MaxLuisRodriguez/CS229-Final-Project-Temporal-Pianist-Technique-Classification',
        kind: 'code',
      },
    ],
    visual: 'piano',
  },
  {
    id: 'feed-ranking',
    number: '03',
    title: 'Ranking social feeds without losing sight of people',
    shortTitle: 'Interaction FITs the Trend',
    context: 'Stanford Social Media Lab · GreenEarth Social',
    period: '2025–2026',
    role: 'Research assistant & AI systems engineer',
    summary:
      'An end-to-end engagement-prediction pipeline for comparing scalable recommender architectures, cold-start behavior, and performance inequality.',
    challenge:
      'High-capacity pointwise models can rank well but are expensive at retrieval time. Lightweight recommenders must preserve quality while generalizing across seen and unseen users.',
    approach:
      'I engineered a five-stage data and evaluation pipeline and compared MLP, standard two-tower, fully interacted two-tower, and collaborative-filtering families on temporally split Bluesky interactions.',
    result:
      'The best early–late interaction model matched the higher-latency MLP on holdout AUC, while lightweight similarity scoring produced the strongest recall across users.',
    metrics: [
      { value: '0.834', label: 'holdout AUC' },
      { value: '0.811', label: 'best recall' },
      { value: '8,214', label: 'evaluated users' },
    ],
    technologies: ['PyTorch', 'Two-tower models', 'Recommender systems', 'DINOv2', 'MiniLM', 'Redis'],
    links: [
      {
        label: 'Read final report',
        href: '/research/social-feed-ranking.pdf',
        kind: 'paper',
      },
    ],
    visual: 'ranking',
  },
  {
    id: 'compact-reasoning',
    number: '04',
    title: 'Bootstrapping reasoning in a 0.5B model',
    shortTitle: 'Compact Model Reasoning',
    context: 'Stanford CS224N · Team of three',
    period: '2026',
    role: 'Researcher & ML engineer',
    summary:
      'A teacher-free reinforcement-learning pipeline that improves mathematical reasoning in a compact language model through staged exploration and targeted failure repair.',
    challenge:
      'Small language models are efficient enough for edge use, but reinforcement learning at sub-1B scale is prone to entropy collapse, unstable updates, and catastrophic forgetting.',
    approach:
      'We combined supervised fine-tuning, GRPO, and targeted DAPO repair with a replay buffer, evaluating Qwen2.5-0.5B-Instruct on the algebra subset of the MATH benchmark.',
    result:
      'The optimized pipeline surpassed a knowledge-distilled baseline without a strong teacher model and made its largest gain on Level 1 algebra.',
    metrics: [
      { value: '20.8%', label: 'overall accuracy' },
      { value: '56.3%', label: 'Level 1 algebra' },
      { value: '+21.5 pp', label: 'over SFT on Level 1' },
    ],
    technologies: ['Qwen2.5', 'GRPO', 'DAPO', 'LoRA', 'TRL', 'MATH benchmark'],
    links: [
      {
        label: 'Read final report',
        href: '/research/compact-language-model-reasoning.pdf',
        kind: 'paper',
      },
    ],
    visual: 'reasoning',
  },
]

export const experience: Experience[] = [
  {
    organization: 'Bonterra · Commercial AI',
    role: 'Summer Intern',
    period: 'Summer 2026',
    summary:
      'Prototyping role-aware AI workflows that help go-to-market teams prepare, decide, and act with less tool switching.',
    highlights: [
      'Conducting stakeholder discovery across distinct sales motions and translating field research into product requirements.',
      'Designing concise, source-aware agent experiences around the time and attention constraints of real users.',
    ],
  },
  {
    organization: 'Stanford Social Media Lab',
    role: 'Research Assistant & AI Systems Engineer',
    period: '2025 — present',
    location: 'Stanford, CA',
    summary:
      'Building transparent, deployment-minded recommender systems for research into how feed-ranking algorithms shape online behavior.',
    highlights: [
      'Developed and evaluated pointwise, two-tower, and collaborative-filtering recommendation architectures.',
      'Built privacy-preserving media pipelines and monitoring infrastructure for research-scale social data.',
    ],
  },
  {
    organization: 'WAW LIFE, Inc.',
    role: 'Chief Software Engineer & Product Strategist',
    period: '2025 — 2026',
    location: 'Stanford, CA',
    summary:
      'Owned product engineering and technical strategy for an early-stage consumer brand.',
    highlights: [
      'Built a React, Node.js, and Supabase web platform and delivery experience.',
      'Created automated competitive-intelligence pipelines and decision dashboards for company leadership.',
    ],
  },
  {
    organization: 'Technische Universität Berlin',
    role: 'Research & App Development Intern',
    period: 'Summer 2024',
    location: 'Berlin, Germany',
    summary:
      'Built research tools for the Audio Communication Group’s functional-sound design work.',
    highlights: [
      'Created a real-time Mahalanobis-distance recommender for UX sounds.',
      'Developed a frequency-layer watermarking workflow used to protect a 2,000-sound licensed corpus.',
    ],
  },
]

export const archive: ArchiveItem[] = [
  {
    year: '2025',
    title: 'AI-Capella',
    type: 'Human-computer interaction',
    description:
      'A confidence-centered voice-AI coaching experience. Full-stack contributor on a team recognized with Best Demo at Stanford’s CS147 dt + UX Awards.',
    href: '/research/ai-capella-final-report.pdf',
    label: 'Read project report',
  },
  {
    year: '2025',
    title: 'Galaxy morphology detection',
    type: 'Computer vision',
    description:
      'A multistage DETR and DINO feature pipeline for identifying and classifying galaxy morphology, reaching 98.5% on GalaxyMNIST and 95.36% on Galaxy Zoo 2.',
    href: 'https://colab.research.google.com/drive/1tznApY1237MswM2FQ3wNe4E1aQMUxihs?usp=sharing',
    label: 'Open Colab',
  },
  {
    year: '2025',
    title: 'Temporal pianist technique classification',
    type: 'Machine learning · computer vision',
    description:
      'Two successive research projects using hand landmarks, temporal features, optical flow, and CNNs to distinguish levels of piano technique.',
    href: 'https://github.com/MaxLuisRodriguez/Updated-CS131-FinProj',
    label: 'View code',
  },
  {
    year: '2024',
    title: 'Somunicate',
    type: 'Audio research · product engineering',
    description:
      'A pair of Streamlit research applications for functional-sound recommendation and robust audio watermarking.',
    href: 'https://www.tu.berlin/en/ak/research/projects/somunicate',
    label: 'View research',
  },
]

export const capabilities = [
  {
    label: 'ML systems',
    items: ['PyTorch', 'Transformers', 'Reinforcement learning', 'Recommenders', 'Multimodal ML'],
  },
  {
    label: 'Product engineering',
    items: ['Python', 'TypeScript', 'React', 'Node.js', 'SQL', 'Supabase'],
  },
  {
    label: 'Research practice',
    items: ['Experimental design', 'Model evaluation', 'HCI', 'Technical writing', 'Responsible AI'],
  },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/MaxLuisRodriguez' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/max-rodriguez-b05542249/' },
  { label: 'Email', href: 'mailto:maxrod@stanford.edu' },
]
