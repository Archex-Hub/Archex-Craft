export type AtlasModule = {
  id: string;
  categorySlug: string;
  title: string;
  shortLabel: string;
  subtitle: string;
  layer: string;
  tagline: string;
  role: string;
  protocols: string[];
  x: number;
  y: number;
  accentColor: string;
  accentGlow: string;
  status: string;
};

export const ATLAS_MODULES: AtlasModule[] = [
  {
    id: "ai-ml",
    categorySlug: "ai-ml-development",
    title: "AI & Machine Learning Engine",
    shortLabel: "AI & ML Systems",
    subtitle: "RAG & Workflows",
    layer: "L4 // INTELLIGENCE",
    tagline: "Autonomous workflows with verifiable human review.",
    role: "Context pipelines, LLM orchestration, and telemetry guardrails.",
    protocols: ["Vector Embeddings", "RAG Pipeline", "Guardrails"],
    x: 525,
    y: 80,
    accentColor: "#9d3f2a",
    accentGlow: "#c4704f",
    status: "ACTIVE · HUMAN-IN-THE-LOOP"
  },
  {
    id: "web-cms",
    categorySlug: "web-cms-development",
    title: "Web Applications & Content Systems",
    shortLabel: "Web & CMS",
    subtitle: "Edge & Headless",
    layer: "L1 // CLIENT EDGE",
    tagline: "Fast, accessible user interfaces built on modern edge infrastructure.",
    role: "Next.js App Router, React Server Components, and global edge caching.",
    protocols: ["Next.js App Router", "Server Components", "Headless CMS"],
    x: 155,
    y: 80,
    accentColor: "#183d32",
    accentGlow: "#235244",
    status: "OPTIMIZED · EDGE-FIRST"
  },
  {
    id: "ecommerce",
    categorySlug: "ecommerce-development",
    title: "Transactional Commerce Core",
    shortLabel: "Ecommerce",
    subtitle: "Cart & Catalogue",
    layer: "L2 // COMMERCE",
    tagline: "High-converting, resilient commerce with synchronized inventory and payments.",
    role: "Multi-currency checkout, custom carts, and payment orchestration.",
    protocols: ["Cart State Sync", "Stripe Webhooks", "Inventory Sync"],
    x: 140,
    y: 245,
    accentColor: "#526057",
    accentGlow: "#718377",
    status: "RESILIENT · TRANSACTIONAL"
  },
  {
    id: "mobile-app",
    categorySlug: "mobile-app-development",
    title: "Mobile Client Architecture",
    shortLabel: "Mobile Apps",
    subtitle: "iOS & Android",
    layer: "L5 // MOBILE RUNTIME",
    tagline: "Fluid native experiences with offline-first local data synchronization.",
    role: "iOS & Android architecture, local SQLite stores, and background sync.",
    protocols: ["Swift / Kotlin", "React Native", "Local SQLite"],
    x: 540,
    y: 245,
    accentColor: "#183d32",
    accentGlow: "#235244",
    status: "CONNECTED · OFFLINE-READY"
  },
  {
    id: "software-core",
    categorySlug: "software-development",
    title: "Core Platform & System Architecture",
    shortLabel: "Software & SaaS",
    subtitle: "Domain Core & APIs",
    layer: "L3 // DOMAIN CORE",
    tagline: "Mission-critical backend logic, resilient APIs, and data integrity.",
    role: "Domain modeling, PostgreSQL schema design, and event messaging.",
    protocols: ["PostgreSQL / Supabase", "Event Bus", "Row-Level Security"],
    x: 340,
    y: 300,
    accentColor: "#9d3f2a",
    accentGlow: "#c4704f",
    status: "STABILIZED · SCALABLE"
  }
];

export const ATLAS_CORE = {
  id: "core-engine",
  title: "Engineered System Core",
  shortLabel: "System Kernel",
  layer: "L0 // KERNEL",
  x: 340,
  y: 160,
  status: "SYNCHRONIZED"
};
