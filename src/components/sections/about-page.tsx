"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Zap,
  Globe,
  Building2,
  HelpCircle,
  Check,
  X,
  ChevronDown,
  GitBranch,
  Compass,
  FileText,
  Lightbulb,
  Boxes,
  Lock,
  Workflow,
  Rocket,
  MessageSquare,
  Clock,
  HeartHandshake
} from "lucide-react";
import { Container } from "@/components/layout/container";

type PersonaKey = "startups" | "operations" | "engineering";

const PERSONAS: Record<
  PersonaKey,
  {
    title: string;
    subtitle: string;
    badge: string;
    icon: typeof Rocket;
    challenge: string;
    approach: string;
    deliverables: string[];
    accent: string;
    badgeColor: string;
  }
> = {
  startups: {
    title: "Founders & High-Growth Startups",
    subtitle: "Launch fast with architecture that won't need a rebuild next year.",
    badge: "EARLY STAGE & SCALE",
    icon: Rocket,
    challenge:
      "You need to reach market and validate traction quickly, but rushing with low-code or messy prototypes often leads to crippling technical debt, security flaws, and expensive complete rewrites when you hit scale.",
    approach:
      "We design and build production-grade web and mobile applications from day one. You get modular, type-safe foundations, automated tests, clean API contracts, and scalable cloud infrastructure built to impress users and technical due-diligence teams alike.",
    deliverables: [
      "Full-stack Web & Mobile MVP platforms",
      "Robust authentication & payment architecture",
      "Scalable database models (PostgreSQL, Supabase)",
      "Automated CI/CD pipelines & cloud infrastructure",
      "Complete IP transfer & technical handover documentation"
    ],
    accent: "text-forest",
    badgeColor: "bg-forest-subtle border-forest/20 text-forest"
  },
  operations: {
    title: "Operations-Heavy Businesses",
    subtitle: "Replace disjointed spreadsheets and manual friction with unified software.",
    badge: "WORKFLOW AUTOMATION",
    icon: Workflow,
    challenge:
      "Your team relies on disparate tools, manual data re-entry, fragile spreadsheets, and legacy systems that don't speak to each other — causing operational delays, expensive human errors, and frustrated employees.",
    approach:
      "We build bespoke operational hubs and intelligent automation pipelines that weave directly into your existing business rhythm. We don't force you to change what works; we connect your systems, eliminate manual repetition, and give operators instant visibility.",
    deliverables: [
      "Custom internal operations dashboards & portals",
      "Intelligent document parsing & automated data extraction",
      "Two-way ERP, CRM, and inventory synchronization",
      "Role-based access control & full audit logs",
      "Pragmatic human-in-the-loop AI workflows"
    ],
    accent: "text-forest",
    badgeColor: "bg-forest-subtle border-forest/20 text-forest"
  },
  engineering: {
    title: "In-House Engineering Teams",
    subtitle: "Senior engineering horsepower to accelerate roadmaps and modernize bottlenecks.",
    badge: "TEAM AUGMENTATION & MODERNIZATION",
    icon: Cpu,
    challenge:
      "Your engineering backlog is growing, legacy components are slowing release velocity, or you need specialized expertise in AI orchestration or complex migrations without the overhead of lengthy full-time hiring cycles.",
    approach:
      "We integrate directly into your existing workflows — opening PRs against your repos, following your branch conventions, participating in your code reviews, and delivering well-tested, documented modules that raise overall team velocity.",
    deliverables: [
      "Incremental legacy strangler-pattern migrations",
      "Dedicated AI/LLM retrieval and evaluation pipelines",
      "Performance optimization & database tuning",
      "Comprehensive unit, integration, and E2E test suites",
      "Clear Architecture Decision Records (ADRs)"
    ],
    accent: "text-forest",
    badgeColor: "bg-forest-subtle border-forest/20 text-forest"
  }
};

const COMPARISONS = [
  {
    topic: "Engineering Team",
    agency:
      "High-level account managers, with real coding outsourced to junior developers or churn-and-burn offshore pools.",
    archex:
      "Direct access to seasoned solutions engineers who think in systems and write the production code themselves."
  },
  {
    topic: "Architecture & Longevity",
    agency:
      "Cookie-cutter templates, copy-paste codebases, and rushed scaffolding that breaks at the first sign of customization.",
    archex:
      "Bespoke, modular system architecture engineered around your real operational constraints and future growth."
  },
  {
    topic: "AI & Modern Tools",
    agency:
      "Slapping generic wrapper chatbots everywhere for hype, without data protection or accuracy safeguards.",
    archex:
      "Targeted, pragmatic AI applications with deterministic fallbacks, vector retrieval, and human review guardrails."
  },
  {
    topic: "Transparency & Communication",
    agency:
      "Bi-weekly status meetings with non-technical middle managers; black-box development between delivery dates.",
    archex:
      "Direct Slack or Discord channels, weekly working software demos, open GitHub access, and documented trade-offs."
  },
  {
    topic: "Code Ownership & Handover",
    agency:
      "Proprietary frameworks, hostage codebases, vendor lock-in, and sparse documentation designed to force retainers.",
    archex:
      "100% intellectual property and code ownership from day one. Clean git histories, clear docs, and zero vendor lock-in."
  }
];

const VALUES = [
  {
    number: "01",
    title: "Understand Before Building",
    description:
      "Every piece of software serves an operational reality. We take time to understand user workflows, edge cases, and business constraints before committing to a technical architecture.",
    icon: Compass,
    color: "text-forest",
    borderColor: "border-forest/20"
  },
  {
    number: "02",
    title: "Clarity Over Cleverness",
    description:
      "Clever code is a liability. We write clean, type-safe, well-documented code that is easy to read, simple to test, and maintainable by any competent engineer years into the future.",
    icon: Code2,
    color: "text-forest",
    borderColor: "border-forest/20"
  },
  {
    number: "03",
    title: "Pragmatic Innovation",
    description:
      "We adopt modern technologies — including AI, edge runtimes, and vector search — only when they solve tangible bottlenecks, never to pad our resume at your expense.",
    icon: Sparkles,
    color: "text-forest",
    borderColor: "border-forest/20"
  },
  {
    number: "04",
    title: "Radical Engineering Transparency",
    description:
      "No smoke, mirrors, or inflated estimates. You get honest technical assessments, direct line-of-sight to our engineers, and visibility into every architectural trade-off.",
    icon: ShieldCheck,
    color: "text-forest",
    borderColor: "border-forest/20"
  }
];

const FAQS = [
  {
    question: "What kind of company is Archex Craft?",
    answer:
      "Archex Craft is an independent solutions engineering practice. We are not a massive marketing agency or an offshore factory. We are a dedicated studio of experienced engineers who specialize in custom software development, system modernization, and practical AI workflow integration for growing businesses and tech teams."
  },
  {
    question: "Who will actually be engineering our software?",
    answer:
      "Experienced solutions engineers. You work directly with the technical specialists building your platform — no account managers, sales intermediaries, or junior handoffs."
  },
  {
    question: "Do we own 100% of the code and intellectual property?",
    answer:
      "Yes, completely. From the first commit to final release, all code, repository rights, schemas, documentation, and intellectual property belong exclusively to your company. We do not use proprietary lock-in licenses."
  },
  {
    question: "Can we start with a small pilot or discovery project?",
    answer:
      "Yes. In fact, we often recommend starting with a focused discovery sprint, technical assessment, or a tightly scoped MVP milestone. This allows both teams to align on working rhythm, validate the technical approach, and prove value before committing to larger investments."
  },
  {
    question: "How does Archex Craft fit with Archex Studio?",
    answer:
      "Archex Craft is the technology, systems, and solutions engineering wing of the Archex ecosystem. Archex Studio is the creative and brand wing. When clients require both world-class brand identity and high-performance software engineering, our disciplines collaborate seamlessly under one roof."
  },
  {
    question: "What tech stacks and tools do you work with?",
    answer:
      "We specialize in modern, reliable, and scalable technology ecosystems: Next.js / React Server Components, TypeScript, Node.js, Python for AI/data workflows, PostgreSQL, Supabase, Tailwind CSS, Docker, and major cloud providers (AWS, GCP, Cloudflare). We select the stack based on your operational reality, not personal whims."
  },
  {
    question: "How do you handle maintenance and support after launch?",
    answer:
      "We design every system to be autonomous and low-maintenance. After delivery, we provide comprehensive handover documentation and runbooks. We also offer tailored ongoing support agreements, monitoring, and iterative feature development for clients who want long-term engineering partnership."
  }
];

export function AboutPageContent() {
  const [activePersona, setActivePersona] = useState<PersonaKey>("startups");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [comparisonMode, setComparisonMode] = useState<"side-by-side" | "archex">("side-by-side");

  const currentPersona = PERSONAS[activePersona];
  const PersonaIcon = currentPersona.icon;

  return (
    <div className="relative overflow-hidden bg-paper text-ink transition-colors duration-300">
      {/* ───────────────────────────────────────────────────────────────────
          1. HERO SECTION
          ─────────────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-border pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-16 lg:pb-28 overflow-hidden bg-paper">
        <Container className="relative z-10">
          <div className="max-w-4xl space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-surface shadow-2xs">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                ABOUT ARCHEX CRAFT
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.08] text-balance">
              Engineering software that businesses can stake their operations on.
            </h1>

            {/* Sub-summary */}
            <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl">
              We are an independent solutions engineering practice. We partner with founders,
              operators, and product teams to architect, build, and modernize digital products and
              workflow systems — with zero agency fluff, direct senior engineering access, and
              absolute transparency.
            </p>

            {/* Quick jump navigation pills */}
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <span className="text-xs font-mono uppercase text-muted tracking-wider mr-2">
                Quick Jump:
              </span>
              {[
                { label: "Our Story", href: "#story" },
                { label: "The Difference", href: "#difference" },
                { label: "Craft Standards", href: "#standards" },
                { label: "Who We Partner With", href: "#partners" },
                { label: "Ecosystem", href: "#ecosystem" },
                { label: "FAQ", href: "#faq" }
              ].map((jump) => (
                <a
                  key={jump.label}
                  href={jump.href}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-muted hover:text-ink hover:border-copper transition-all shadow-2xs"
                >
                  {jump.label}
                </a>
              ))}
            </div>
          </div>

          {/* Value Highlights / Proof Points Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6 border-t border-border pt-10">
            {[
              {
                metric: "100%",
                label: "Dedicated Engineers",
                description: "Direct collaboration with senior builders, zero junior handoffs."
              },
              {
                metric: "Zero",
                label: "Hype-Driven Rewrites",
                description: "Pragmatic, durable architecture focused on real business ROI."
              },
              {
                metric: "Full IP",
                label: "Client Code Ownership",
                description: "Clean repos, automated CI/CD, and zero proprietary lock-in."
              },
              {
                metric: "Weekly",
                label: "Demonstrable Delivery",
                description: "Working software increments shipped every sprint, not slide decks."
              }
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface/70 dark:bg-[#0c0d15]/80 p-5 backdrop-blur-md"
              >
                <span className="font-mono text-2xl sm:text-3xl font-bold text-copper block">
                  {stat.metric}
                </span>
                <h2 className="mt-2 text-sm font-semibold text-ink leading-snug">{stat.label}</h2>
                <p className="mt-1 text-xs text-muted leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          2. OUR STORY & PURPOSE
          ─────────────────────────────────────────────────────────────────── */}
      <section
        id="story"
        className="py-20 sm:py-28 border-b border-border bg-surface/40 scroll-mt-16"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1.3fr] lg:items-center">
            {/* Story text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
                <span className="font-mono text-xs uppercase tracking-widest text-copper">
                  Our Purpose & Story
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
                Built to be the antidote to agency bloat and disposable software.
              </h2>

              <p className="text-muted leading-relaxed text-base sm:text-lg">
                The software industry has an integrity problem. Far too many companies pay high
                rates to digital agencies only to find their work handed off to junior contractors,
                their systems bloated with unnecessary libraries, and their timelines bogged down in
                endless meetings with non-technical middle managers.
              </p>

              <p className="text-muted leading-relaxed text-base sm:text-lg">
                Archex Craft was founded to operate differently: a lean, disciplined solutions
                engineering practice where clients collaborate directly with the engineers writing
                their software. We treat code as durable infrastructure that should run quietly,
                scale predictably, and remain understandable for years to come.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-copper/30 bg-copper/10 text-copper">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">Built For Longevity</h3>
                  <p className="text-xs text-muted">
                    We build software you can confidently run without weekend emergencies.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Story Pillars Cards */}
            <div className="grid gap-4 sm:gap-5">
              {[
                {
                  icon: Terminal,
                  title: "Direct Engineering Craft",
                  text: "You speak directly to the architects and developers building your platform. No game of telephone, no miscommunicated specifications, and zero fluff.",
                  accent: "border-copper/40 bg-copper/5"
                },
                {
                  icon: Boxes,
                  title: "Systems Thinking First",
                  text: "Software doesn't exist in a vacuum. We map the entire workflow: human operators, data inputs, edge cases, and external APIs before choosing the technical path.",
                  accent: "border-sky-500/30 bg-sky-500/5"
                },
                {
                  icon: Lock,
                  title: "Zero Vendor Lock-In",
                  text: "Everything we write is yours. Documented schemas, clean Git commits, standard cloud providers, and complete runbooks so your team can maintain it autonomously.",
                  accent: "border-emerald-500/30 bg-emerald-500/5"
                }
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-6 backdrop-blur-md bg-surface shadow-xs transition-all duration-300 hover:shadow-md ${card.accent}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-ink">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-sans text-lg font-bold text-ink">{card.title}</h3>
                        <p className="mt-2 text-sm text-muted leading-relaxed">{card.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          3. THE ARCHEX DIFFERENCE (INTERACTIVE COMPARISON)
          ─────────────────────────────────────────────────────────────────── */}
      <section
        id="difference"
        className="py-20 sm:py-28 border-b border-border bg-paper scroll-mt-16"
      >
        <Container>
          <div className="max-w-3xl space-y-4 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
              <span className="font-mono text-xs uppercase tracking-widest text-copper">
                THE ARCHEX STANDARD
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              How we compare to the traditional alternative.
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Here is what happens when you remove sales overhead and replace agency bloat with
              disciplined solutions engineering.
            </p>

            {/* Toggle controls for small screens */}
            <div className="inline-flex p-1 rounded-xl border border-border bg-surface mx-auto sm:hidden">
              <button
                type="button"
                onClick={() => setComparisonMode("side-by-side")}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${comparisonMode === "side-by-side"
                  ? "bg-forest text-on-forest font-bold"
                  : "text-muted"
                  }`}
              >
                Comparison
              </button>
              <button
                type="button"
                onClick={() => setComparisonMode("archex")}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${comparisonMode === "archex" ? "bg-copper text-white font-bold" : "text-muted"
                  }`}
              >
                Archex Standard
              </button>
            </div>
          </div>

          {/* Comparison Matrix Table / Cards */}
          <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-[1.2fr_2fr_2fr] border-b border-border bg-surface-muted/60 p-5 text-xs font-mono font-bold tracking-wider uppercase">
              <div className="text-muted">Dimension</div>
              <div className="text-red-700 dark:text-red-400 flex items-center gap-2">
                <X size={15} /> Typical Agency / Freelance Shop
              </div>
              <div className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <Check size={15} /> The Archex Craft Way
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {COMPARISONS.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-[1.2fr_2fr_2fr] p-5 sm:p-6 gap-4 sm:gap-6 hover:bg-surface-muted/30 transition-colors"
                >
                  {/* Topic */}
                  <div className="font-sans font-bold text-ink sm:text-sm flex items-center gap-2">
                    <span className="font-mono text-xs text-copper sm:hidden">0{index + 1}.</span>
                    {row.topic}
                  </div>

                  {/* Typical Agency */}
                  <div
                    className={`rounded-xl sm:rounded-none border sm:border-0 p-4 sm:p-0 bg-red-500/5 sm:bg-transparent border-red-500/20 text-xs sm:text-sm text-muted leading-relaxed ${comparisonMode === "archex" ? "hidden sm:block" : "block"
                      }`}
                  >
                    <div className="sm:hidden font-mono text-[11px] uppercase tracking-wider text-red-600 dark:text-red-400 mb-1 flex items-center gap-1 font-bold">
                      <X size={13} /> Typical Agency
                    </div>
                    {row.agency}
                  </div>

                  {/* Archex Craft */}
                  <div
                    className={`rounded-xl sm:rounded-none border sm:border-0 p-4 sm:p-0 bg-emerald-500/5 sm:bg-transparent border-emerald-500/20 text-xs sm:text-sm text-ink leading-relaxed font-medium ${comparisonMode === "side-by-side" ? "block" : "block"
                      }`}
                  >
                    <div className="sm:hidden font-mono text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1 font-bold">
                      <Check size={13} /> Archex Craft
                    </div>
                    {row.archex}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          4. OUR CORE CRAFT VALUES
          ─────────────────────────────────────────────────────────────────── */}
      <section
        id="standards"
        className="py-20 sm:py-28 border-b border-border bg-surface/50 scroll-mt-16"
      >
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
              <span className="font-mono text-xs uppercase tracking-widest text-copper">
                ENGINEERING ETHOS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              Our non-negotiable engineering principles.
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Architecture isn&apos;t just code syntax — it&apos;s a series of conscious decisions
              that dictate whether a system survives for five years or degrades in five months.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.number}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-7 shadow-2xs transition-all duration-300 hover:border-copper/60 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-bold tracking-widest ${val.color}`}>
                        PRINCIPLE // {val.number}
                      </span>
                      <Icon
                        size={20}
                        className="text-muted group-hover:text-copper transition-colors"
                      />
                    </div>

                    <h3 className="font-sans text-xl font-bold text-ink leading-snug group-hover:text-copper transition-colors">
                      {val.title}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed">{val.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted">
                    <span>STANDARD SPEC</span>
                    <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          5. WHO WE PARTNER WITH (INTERACTIVE PERSONA EXPLORER)
          ─────────────────────────────────────────────────────────────────── */}
      <section
        id="partners"
        className="py-20 sm:py-28 border-b border-border bg-paper scroll-mt-16"
      >
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
              <span className="font-mono text-xs uppercase tracking-widest text-copper">
                WHO WE WORK WITH
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              Engineered for teams solving real operational problems.
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Explore how we tailor our solutions engineering approach to your organization&apos;s
              specific size, complexity, and roadmap goals.
            </p>
          </div>

          {/* Interactive Persona Tabs */}
          <div className="mt-10 flex flex-wrap gap-3 border-b border-border pb-4">
            {(Object.keys(PERSONAS) as PersonaKey[]).map((key) => {
              const item = PERSONAS[key];
              const Icon = item.icon;
              const isActive = activePersona === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePersona(key)}
                  className={`group inline-flex items-center gap-3 rounded-xl border px-5 py-3 text-sm font-semibold transition-all ${isActive
                    ? "border-copper bg-surface text-ink shadow-sm ring-1 ring-copper/30"
                    : "border-border bg-surface/50 text-muted hover:border-border hover:bg-surface hover:text-ink"
                    }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-copper" : "text-muted group-hover:text-ink"}
                  />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Persona Detailed Card */}
          <div className="mt-8 rounded-3xl border border-border bg-surface p-8 sm:p-12 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              {/* Left Column: Challenge & Approach */}
              <div className="space-y-6">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider font-bold shadow-2xs"
                  style={{ borderColor: "currentColor" }}
                >
                  <PersonaIcon size={14} className={currentPersona.accent} />
                  <span className={currentPersona.accent}>{currentPersona.badge}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-snug">
                  {currentPersona.subtitle}
                </h3>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted">
                  <div className="rounded-xl border border-border bg-surface-muted/40 p-5">
                    <p className="font-mono text-xs uppercase tracking-wider text-red-600 dark:text-red-400 font-bold mb-1">
                      The Common Bottleneck:
                    </p>
                    <p>{currentPersona.challenge}</p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface-muted/40 p-5">
                    <p className="font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                      How Archex Craft Solves It:
                    </p>
                    <p>{currentPersona.approach}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Typical Deliverables */}
              <div className="rounded-2xl border border-border bg-surface-muted/60 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-muted font-bold mb-6">
                    Key Outcomes & Deliverables
                  </h4>
                  <ul className="space-y-4">
                    {currentPersona.deliverables.map((deliv, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-ink">
                        <CheckCircle2 size={18} className="text-copper shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href="/start-project"
                    className="inline-flex items-center justify-between w-full rounded-xl border border-copper bg-copper/10 px-5 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-copper hover:bg-copper hover:text-white transition-all shadow-xs"
                  >
                    <span>Discuss This Solution With Us</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          6. THE ARCHEX ECOSYSTEM
          ─────────────────────────────────────────────────────────────────── */}
      <section
        id="ecosystem"
        className="py-20 sm:py-28 border-b border-border bg-surface/50 scroll-mt-16"
      >
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
                <span className="font-mono text-xs uppercase tracking-widest text-copper">
                  THE ARCHEX ECOSYSTEM
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
                Different disciplines. One standard of excellence.
              </h2>
              <p className="text-muted text-base sm:text-lg">
                Archex is composed of specialized wings that can engage independently or unite to
                deliver end-to-end brand and software solutions.
              </p>
            </div>

            <div className="shrink-0 md:pb-1">
              <a
                href="https://www.archexweb.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Archex parent site (opens in a new tab)"
                className="group inline-flex items-center gap-3.5 rounded-2xl border border-border bg-surface px-5 py-3.5 shadow-2xs transition-all duration-300 hover:border-copper/60 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted/60 text-ink group-hover:border-copper/40 group-hover:bg-copper/10 group-hover:text-copper transition-colors">
                  <Globe size={18} />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-ink group-hover:text-copper transition-colors">
                      archexweb.in
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-muted group-hover:text-copper transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-muted block">
                    Archex Parent Site
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Archex Craft */}
            <div className="group relative flex flex-col justify-between rounded-3xl border-2 border-copper/50 bg-surface p-8 sm:p-10 shadow-sm transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-copper/30 bg-copper/10 text-copper">
                      <Cpu size={22} />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-copper uppercase tracking-widest font-bold block">
                        TECHNOLOGY & ENGINEERING
                      </span>
                      <h3 className="font-sans text-2xl font-bold text-ink uppercase tracking-wider">
                        ARCHEX CRAFT
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-copper rounded-full border border-copper/40 px-3 py-1 bg-copper/10 font-bold">
                    YOU ARE HERE
                  </span>
                </div>

                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  Engineering the high-performance engines behind modern products and operations:
                  custom web applications, scalable backends, automated data pipelines, and
                  purposeful AI workflows.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Full-Stack Web & Mobile",
                    "Custom Software",
                    "AI Integration",
                    "System Modernization",
                    "Cloud Infrastructure"
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-xs font-mono text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-between w-full rounded-xl border border-copper/30 bg-copper/10 px-5 py-3 text-xs font-mono font-bold tracking-wider uppercase text-copper hover:bg-copper hover:text-white transition-all"
                >
                  <span>Explore Engineering Services</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Archex Studio */}
            <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-surface p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-purple-400/50">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-purple-600 dark:text-purple-400 uppercase tracking-widest font-bold block">
                        CREATIVE & BRAND
                      </span>
                      <h3 className="font-sans text-2xl font-bold text-ink uppercase tracking-wider">
                        ARCHEX STUDIO
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-muted rounded-full border border-border px-3 py-1 bg-surface-muted">
                    PARTNER WING
                  </span>
                </div>

                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  Crafting distinctive brand identities, editorial art direction, design systems,
                  and immersive visual storytelling that captures market attention and leaves a
                  lasting impression.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Brand Identity & Strategy",
                    "UI/UX Design Systems",
                    "Art Direction & Motion",
                    "Design-Led Experiences"
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-xs font-mono text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href="https://studio.archexweb.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full rounded-xl border border-border bg-surface-muted/60 px-5 py-3 text-xs font-mono font-bold tracking-wider uppercase text-ink hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                >
                  <span>Visit Archex Studio</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          7. HOW WE COMMUNICATE (TRANSPARENCY IN PRACTICE)
          ─────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 border-b border-border bg-paper">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
              <span className="font-mono text-xs uppercase tracking-widest text-copper">
                HOW WE COMMUNICATE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              Quiet predictability, zero surprises.
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Here is what a normal engagement feels like from week to week: calm, organized, and
              completely transparent.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MessageSquare,
                title: "Shared Workspace",
                desc: "A dedicated Slack or Teams channel directly with the engineers working on your code. Ask questions, clarify edge cases, get instant answers."
              },
              {
                icon: Clock,
                title: "Weekly Demos",
                desc: "Every milestone ends with a working demo you can click, test, and critique. Progress is proven in code, not status slide decks."
              },
              {
                icon: FileText,
                title: "Decision Records",
                desc: "We write down Architecture Decision Records (ADRs) explaining every key choice and trade-off, so your future team has total context."
              },
              {
                icon: HeartHandshake,
                title: "Honest Scoping",
                desc: "If a feature is risky, unnecessary, or better solved with a standard tool, we will tell you straight. We protect your budget like our own."
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-surface p-7 shadow-xs hover:border-copper/40 transition-colors"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-copper/30 bg-copper/10 text-copper mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          8. INTERACTIVE FAQ
          ─────────────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="py-20 sm:py-28 border-b border-border bg-surface/50 scroll-mt-16"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr]">
            <div className="space-y-4 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
                <span className="font-mono text-xs uppercase tracking-widest text-copper">
                  FAQ
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
                Everything you need to know about working with us.
              </h2>
              <p className="text-muted text-base">
                Have a unique question not listed here? We are always happy to answer candidly over
                a quick introductory conversation.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-copper hover:underline"
                >
                  <span>Ask us directly</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                      ? "border-copper/50 bg-surface shadow-sm"
                      : "border-border bg-surface/60 hover:border-border"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex items-center justify-between w-full p-5 sm:p-6 text-left transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-sans text-base sm:text-lg font-bold text-ink pr-4">
                        {faq.question}
                      </span>
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 ${isOpen
                          ? "border-copper bg-copper text-white rotate-180"
                          : "border-border bg-surface text-muted"
                          }`}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-muted leading-relaxed border-t border-border/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          9. FINAL CALL TO ACTION
          ─────────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-paper overflow-hidden">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-copper/15 via-orange-500/10 to-transparent blur-[160px]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="relative rounded-3xl border border-border bg-surface p-10 sm:p-16 lg:p-20 shadow-xl overflow-hidden text-center max-w-4xl mx-auto backdrop-blur-xl">
            {/* Top highlight accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-copper to-transparent opacity-90" />

            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-copper/30 bg-copper/10 shadow-2xs">
                <span className="font-mono text-xs uppercase tracking-widest text-copper font-bold">
                  READY TO START?
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
                Let&apos;s build something your business can depend on.
              </h2>

              <p className="text-muted text-base sm:text-lg leading-relaxed">
                Whether you have an upcoming product launch, an operational workflow that needs
                automation, or a legacy system in need of modernization — let&apos;s have a candid
                conversation about the best way forward.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider uppercase bg-forest text-on-forest hover:bg-forest-hover shadow-md transition-all duration-300"
                >
                  <span>Start a Conversation</span>
                </Link>

                <Link
                  href="/start-project"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-ink bg-surface border border-border hover:border-copper hover:text-copper transition-all shadow-2xs"
                >
                  <span>Project Enquiry</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="pt-6 flex items-center justify-center gap-6 text-xs font-mono text-muted">
                <Link href="/services" className="hover:text-copper transition-colors">
                  &larr; View Services Catalog
                </Link>
                <span>&bull;</span>
                <Link href="/how-we-work" className="hover:text-copper transition-colors">
                  Read How We Work &rarr;
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
