import {
  Brain, Cpu, Code2, Cloud, Smartphone, Palette, Database, Workflow,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Brain;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    tagline: "LLMs, agents & ML pipelines",
    description: "Production-grade AI systems — from RAG and fine-tuning to autonomous agents that actually ship.",
    icon: Brain,
    features: ["RAG & vector search", "LLM fine-tuning", "Agentic workflows", "Evals & guardrails"],
  },
  {
    slug: "web-platforms",
    title: "Web Platforms",
    tagline: "Full-stack engineering",
    description: "Scalable Next.js, TanStack and edge-native platforms built for speed and reliability.",
    icon: Code2,
    features: ["Edge-native SSR", "Type-safe stacks", "Design systems", "Performance audits"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    tagline: "iOS, Android & cross-platform",
    description: "Native-feel mobile experiences engineered for engagement and App Store success.",
    icon: Smartphone,
    features: ["React Native", "Swift & Kotlin", "Offline-first", "Push & analytics"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "Multi-cloud infrastructure",
    description: "Resilient infrastructure with IaC, observability, and zero-downtime deployments.",
    icon: Cloud,
    features: ["AWS · GCP · Azure", "Kubernetes", "CI/CD pipelines", "Cost optimization"],
  },
  {
    slug: "product-design",
    title: "Product Design",
    tagline: "Interfaces that convert",
    description: "Research-driven UX and pixel-perfect UI that turns visitors into power users.",
    icon: Palette,
    features: ["UX research", "Design systems", "Motion & prototyping", "Accessibility"],
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    tagline: "Warehouses, pipelines & BI",
    description: "Modern data stacks that make every team data-fluent — from ELT to dashboards.",
    icon: Database,
    features: ["dbt & Snowflake", "Real-time pipelines", "Reverse ETL", "Embedded analytics"],
  },
  {
    slug: "automation",
    title: "Automation",
    tagline: "Workflow & RPA",
    description: "Custom automation that eliminates busywork across sales, ops, and engineering.",
    icon: Workflow,
    features: ["Internal tools", "Workflow engines", "Integrations", "AI copilots"],
  },
  {
    slug: "mlops",
    title: "MLOps",
    tagline: "Model lifecycle in production",
    description: "Train, deploy, monitor — everything you need to run ML at scale, reliably.",
    icon: Cpu,
    features: ["Model registries", "Feature stores", "Drift monitoring", "GPU orchestration"],
  },
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "AI" | "Web" | "Mobile" | "Cloud" | "Data";
  summary: string;
  metric: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "neuralink-research-portal",
    title: "Neural Research Portal",
    client: "Helix Bio",
    category: "AI",
    summary: "RAG-powered research portal that lets scientists query 40 years of trial data in seconds.",
    metric: "92% faster discovery",
    tags: ["RAG", "Python", "Postgres", "OpenAI"],
  },
  {
    slug: "fintech-trading-platform",
    title: "Real-time Trading Platform",
    client: "Vantage Capital",
    category: "Web",
    summary: "Low-latency trading dashboard handling 50K events/sec with sub-100ms render.",
    metric: "50K events/sec",
    tags: ["Next.js", "WebSockets", "Rust", "Edge"],
  },
  {
    slug: "telemedicine-app",
    title: "Telemedicine Mobile App",
    client: "MediCare+",
    category: "Mobile",
    summary: "HIPAA-ready iOS & Android app that connects 200K patients with on-demand specialists.",
    metric: "4.9★ App Store",
    tags: ["React Native", "WebRTC", "FHIR"],
  },
  {
    slug: "k8s-platform-migration",
    title: "Kubernetes Platform Migration",
    client: "Northstar Logistics",
    category: "Cloud",
    summary: "Migrated 300+ microservices to a unified GitOps platform with zero downtime.",
    metric: "62% cost reduction",
    tags: ["Kubernetes", "ArgoCD", "Terraform"],
  },
  {
    slug: "retail-analytics-warehouse",
    title: "Retail Analytics Warehouse",
    client: "Bloom Retail",
    category: "Data",
    summary: "Modern data stack unifying 14 sources into a single source of truth for 60+ analysts.",
    metric: "14 sources unified",
    tags: ["dbt", "Snowflake", "Airbyte"],
  },
  {
    slug: "agentic-sales-copilot",
    title: "Agentic Sales Copilot",
    client: "Pipeline.ai",
    category: "AI",
    summary: "Autonomous agent that researches prospects and drafts personalized outreach in real time.",
    metric: "3.4× reply rate",
    tags: ["Agents", "LangGraph", "Vector DB"],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "IntelliForge shipped in 9 weeks what our internal team estimated at 9 months. The quality is staggering.",
    name: "Amelia Chen",
    role: "VP Engineering",
    company: "Vantage Capital",
  },
  {
    quote: "Their AI team didn't just build us a chatbot — they architected an entire knowledge platform we now run our business on.",
    name: "Marcus Reyes",
    role: "Chief Product Officer",
    company: "Helix Bio",
  },
  {
    quote: "Premium craft, zero drama. They felt like our most senior in-house team from week one.",
    name: "Priya Anand",
    role: "Founder & CEO",
    company: "Pipeline.ai",
  },
  {
    quote: "We've worked with three agencies. IntelliForge is in a different league — engineering, design, communication, all of it.",
    name: "Jonas Weber",
    role: "CTO",
    company: "Northstar Logistics",
  },
  {
    quote: "The mobile app they built for us is the highest-rated in our category. Six months in and adoption keeps climbing.",
    name: "Sara Okafor",
    role: "Head of Product",
    company: "MediCare+",
  },
  {
    quote: "Their MLOps work cut our model deployment time from weeks to hours. Game changer.",
    name: "David Park",
    role: "Director of ML",
    company: "Bloom Retail",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "shipping-llm-products",
    title: "Shipping LLM Products That Don't Hallucinate",
    excerpt: "A practical playbook for building production AI features users can actually trust.",
    category: "AI Engineering",
    readTime: "8 min read",
    date: "Apr 22, 2026",
  },
  {
    slug: "edge-native-architecture",
    title: "The Case for Edge-Native Architecture in 2026",
    excerpt: "Why the next generation of SaaS is being built at the edge — and how to get there.",
    category: "Architecture",
    readTime: "6 min read",
    date: "Apr 14, 2026",
  },
  {
    slug: "design-systems-that-scale",
    title: "Design Systems That Actually Scale With You",
    excerpt: "Lessons from building token-driven systems for products that 10× in a year.",
    category: "Design",
    readTime: "5 min read",
    date: "Apr 03, 2026",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "How quickly can you start an engagement?",
    a: "Most projects kick off within 1–2 weeks of signing. Discovery sprints can begin in days when there's a clear brief.",
  },
  {
    q: "What's a typical project size?",
    a: "Engagements range from focused 4-week sprints ($25K+) to multi-quarter platform builds ($250K+). We scope honestly.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — we love founder velocity. We offer flexible structures including milestone billing and limited equity arrangements.",
  },
  {
    q: "Where is your team based?",
    a: "Headquartered in San Francisco with senior engineers across North America and Europe. We're remote-first by design.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Always, before any technical detail is shared. We routinely operate under strict enterprise security and compliance agreements.",
  },
  {
    q: "How do you handle IP and code ownership?",
    a: "You own 100% of the code, designs, and IP we produce. We deliver clean repos, documentation, and full handoff support.",
  },
  {
    q: "Can you augment our existing team?",
    a: "Absolutely. We embed senior engineers into your stack, follow your standards, and exit cleanly when you're ready.",
  },
  {
    q: "What's your approach to AI safety?",
    a: "Every AI system we build ships with evals, guardrails, observability, and a human-in-the-loop fallback by default.",
  },
];

export const STATS = [
  { value: "120+", label: "Products shipped" },
  { value: "$2.4B", label: "Client value created" },
  { value: "40+", label: "Senior engineers" },
  { value: "98%", label: "Retention rate" },
];

export const WHY_US = [
  { title: "Senior-only teams", desc: "No juniors hiding behind PMs. The people who pitch you are the people who build." },
  { title: "AI-native by default", desc: "Intelligence is baked into every layer — not bolted on as a feature." },
  { title: "Ship in weeks", desc: "Modular architectures and ruthless DX let us deliver in a fraction of typical timelines." },
  { title: "Outcomes, not hours", desc: "We bill for value delivered. Fixed scopes, clear milestones, no surprises." },
  { title: "Long-term partners", desc: "98% of clients re-engage. We build for the next decade, not the next demo." },
  { title: "Premium craft", desc: "Code, design, and product polish that makes your team proud to demo." },
];

export const PROJECT_CATEGORIES = ["All", "AI", "Web", "Mobile", "Cloud", "Data"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
