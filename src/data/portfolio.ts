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
      'FlatGRPO gives every turn in a successful trajectory the same advantage, even when some actions are decisive and others contribute little.',
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
    context: 'Published Stanford Symbolic Systems honors thesis',
    period: '2026',
    role: 'Sole author & engineer',
    summary:
      'A video-only system that analyzes piano hand motion and uses the model’s findings to generate technique feedback.',
    challenge:
      'Many learning tools score musical output without explaining how hand, wrist, and finger movements should change. Expert instruction is difficult for many students to access.',
    approach:
      'I built a multi-stage pipeline: normalized hand-kinematics features, a hybrid BiLSTM–Transformer anomaly detector, a 114-model HMM bank for interpretable evidence, and a gated LLM feedback stage.',
    result:
      'The system separated lower-level from advanced motion patterns. Generated feedback showed semantic overlap with human annotations, although calibration remained a limitation.',
    metrics: [
      { value: '137.2 hrs', label: 'piano video' },
      { value: '1.02M', label: 'motion windows' },
      { value: '16,846', label: 'processed clips' },
    ],
    technologies: ['PyTorch', 'BiLSTM', 'Transformers', 'HMMs', 'MediaPipe', 'LLM evaluation'],
    links: [
      {
        label: 'Read published thesis',
        href: 'https://purl.stanford.edu/vk447bc1950',
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
    number: '02',
    title: 'Comparing models for social feed ranking',
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
    number: '03',
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
    role: 'AI Software Engineer Intern',
    period: 'Jun–Sep 2026',
    summary:
      'Built AI tools for nonprofit software workflows as a Stanford CS + Social Good Fellow.',
    highlights: [
      'Built a TypeScript/React pre-call briefing system over Salesforce and Gong data, with role-specific briefs and attributable sources.',
      'Implemented a live call-coaching agent and validated it with unit, integration, and security tests.',
    ],
  },
  {
    organization: 'Stanford Social Media Lab',
    role: 'Research Assistant & AI Systems Engineer',
    period: '2025–present',
    location: 'Stanford, CA',
    summary:
      'Studying how recommendation models rank social feeds, including prediction quality, retrieval cost, and differences across users.',
    highlights: [
      'Developed and evaluated pointwise, two-tower, and collaborative-filtering recommendation architectures.',
      'Built privacy-preserving media pipelines and monitoring infrastructure for research-scale social data.',
    ],
  },
  {
    organization: 'WAW LIFE, Inc.',
    role: 'Software Engineering & Product Lead',
    period: 'Jun 2025–present',
    location: 'Stanford, CA',
    summary:
      'Leading product engineering for a consumer brand, from the storefront to ordering and fulfillment.',
    highlights: [
      'Designed and built wawbeverage.com with React, TypeScript, a custom GLSL hero, and Shopify checkout.',
      'Built a Next.js and Supabase VIP-ordering PWA with magic-link authentication, customer/admin roles, fulfillment tools, and webhook order routing.',
    ],
  },
  {
    organization: 'E3 Group',
    role: 'Software Engineer, Contract',
    period: 'Jun–Jul 2026',
    location: 'SF Bay Area',
    summary: 'Built document-verification workflows for driver-license documents.',
    highlights: [
      'Combined OCR, barcode decoding, and LLM extraction in a multi-stage verification pipeline.',
      'Developed image augmentation and stage-level benchmarks to identify failure modes and improve extraction reliability.',
    ],
  },
  {
    organization: 'Technische Universität Berlin',
    role: 'Functional Sound Research / App Development Intern',
    period: 'Jun - Sep 2024',
    location: 'Berlin, Germany',
    summary:
      'Built research tools for the Audio Communication Group’s functional-sound design work.',
    highlights: [
      'Created a real-time Mahalanobis-distance recommender for UX sounds.',
      'Developed an audio watermarking application for copyrighted research sounds.',
    ],
  },
]

export const archive: ArchiveItem[] = [
  {
    year: '2025',
    title: 'AI-Capella',
    type: 'Human-computer interaction',
    description:
      'An AI voice coach for singing practice. I contributed full-stack development on a team that won Best Demo at Stanford’s CS147 dt + UX Awards.',
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
      'Functional-sound recommendation and audio watermarking research tools, with a React sound-design demo and an audited Node ranking engine.',
    href: 'https://max-rodriguez-portfolio.vercel.app/somunicate/',
    label: 'Explore sounds',
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
