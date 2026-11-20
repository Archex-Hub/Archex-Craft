"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Compass,
  FileCheck,
  Hammer,
  Rocket,
  Layers,
  Workflow,
  GitBranch,
  Cpu,
  ShieldCheck,
  FileText,
  Eye,
  MessageSquare,
  Target,
  Code2,
  BookOpen,
  Sparkles,
  Users,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/layout/container";

type Stage = {
  id: string;
  number: string;
  phase: string;
  title: string;
  headline: string;
  description: string;
  outputs: string[];
  client: string;
  icon: typeof Compass;
  accent: string;
  badge: string;
};

const stages: Stage[] = [
  {
    id: "understand",
    number: "01",
    phase: "UNDERSTAND",
    title: "Understand",
    headline: "Before we build anything, we understand what needs to change.",
    description:
      "We bring the business objective, users, existing workflows and software into the same conversation. That creates a grounded starting point instead of treating a symptom as the whole problem.",
    outputs: [
      "Shared understanding of the problem",
      "Initial requirements and priorities",
      "Existing systems and constraints audit",
      "Key questions, risks and assumptions map",
    ],
    client:
      "Share business context, introduce the people closest to the daily work, and help distinguish essential constraints from inherited habits.",
    icon: Compass,
    accent: "text-forest border-forest/20 bg-forest-subtle",
    badge: "text-forest bg-forest-subtle border-forest/20",
  },
  {
    id: "plan",
    number: "02",
    phase: "PLAN",
    title: "Plan",
    headline: "Agree what to do, what it involves, and how to judge progress.",
    description:
      "We shape the work into a clear boundary: what is included, what is not, how systems connect, and how progress will be evaluated. The plan is detailed enough to guide engineering without pretending uncertainty does not exist.",
    outputs: [
      "Documented scope and trade-off priorities",
      "Proposed technical approach & stack selection",
      "Architecture blueprint & data flow schema",
      "Checkpoints, success measures and open decisions",
    ],
    client:
      "Confirm priorities and trade-offs, review proposed architecture boundaries, and agree on what must work before delivery.",
    icon: FileCheck,
    accent: "text-forest border-forest/20 bg-forest-subtle",
    badge: "text-forest bg-forest-subtle border-forest/20",
  },
  {
    id: "build",
    number: "03",
    phase: "BUILD & VALIDATE",
    title: "Build and validate",
    headline: "Build the solution. Test the assumptions. Improve what matters.",
    description:
      "Engineering happens in reviewable slices. We implement, integrate, test and refine the solution while decisions are still close enough to the work to change course when the evidence calls for it.",
    outputs: [
      "Working software increments & clean code",
      "Demonstrable features and tested workflows",
      "Automated test coverage & validation records",
      "Documented decisions, changelogs and issues",
    ],
    client:
      "Review working progress in demo checkpoints, answer questions about real-world edge cases, and help refine the solution as new information appears.",
    icon: Hammer,
    accent: "text-forest border-forest/20 bg-forest-subtle",
    badge: "text-forest bg-forest-subtle border-forest/20",
  },
  {
    id: "deliver",
    number: "04",
    phase: "DELIVER & IMPROVE",
    title: "Deliver and improve",
    headline: "Delivery is a transition, not the end of the thinking.",
    description:
      "We prepare the agreed deliverables for their next environment, document what matters, and make the handover understandable. Where ongoing improvement is useful, the next step is based on what the software and its users reveal.",
    outputs: [
      "Production deployment & cloud infrastructure",
      "Documented codebase and operational runbooks",
      "Knowledge handover and training materials",
      "Agreed next steps and evolution roadmap",
    ],
    client:
      "Confirm the release or handover context, provide operational ownership, and decide which improvements belong in the next milestone.",
    icon: Rocket,
    accent: "text-forest border-forest/20 bg-forest-subtle",
    badge: "text-forest bg-forest-subtle border-forest/20",
  },
];

const modes = {
  product: {
    label: "New digital product",
    icon: Layers,
    summary:
      "Taking an idea from inception to a scalable, user-centric application with modern architecture.",
    steps: [
      {
        num: "01",
        name: "Discovery & User Research",
        desc: "Understand users, business objectives and core product requirements.",
      },
      {
        num: "02",
        name: "Product & Architecture Plan",
        desc: "Plan user journeys, modular scope boundaries, tech stack, and API schema.",
      },
      {
        num: "03",
        name: "Sprint-Based Engineering",
        desc: "Build features iteratively, validate workflows, and refine user experience.",
      },
      {
        num: "04",
        name: "Launch & Growth Roadmap",
        desc: "Release with full documentation, telemetry, and a path for future development.",
      },
    ],
  },
  ai: {
    label: "AI integration",
    icon: Workflow,
    summary:
      "Introducing practical AI models and automated reasoning into existing business pipelines.",
    steps: [
      {
        num: "01",
        name: "Workflow & Data Audit",
        desc: "Understand workflow bottlenecks, data sources, decision points, and user needs.",
      },
      {
        num: "02",
        name: "Model & Evaluation Strategy",
        desc: "Plan model selection, integrations, privacy safeguards, and evaluation benchmarks.",
      },
      {
        num: "03",
        name: "Pipeline & Fallback Build",
        desc: "Build and test the workflow, including failure handling, guardrails, and human review.",
      },
      {
        num: "04",
        name: "Production Deployment",
        desc: "Deploy with continuous latency monitoring, accuracy checks, and operational controls.",
      },
    ],
  },
  modernization: {
    label: "Application modernization",
    icon: GitBranch,
    summary:
      "Refactoring and migrating legacy software without interrupting critical business operations.",
    steps: [
      {
        num: "01",
        name: "Codebase & Dependency Audit",
        desc: "Understand current software, dependency trees, performance bottlenecks, and risks.",
      },
      {
        num: "02",
        name: "Decoupling & Migration Plan",
        desc: "Plan stabilization, migration boundaries, rollback strategies, and priorities.",
      },
      {
        num: "03",
        name: "Incremental Refactoring",
        desc: "Improve or move parts of the system in manageable, continuous testing steps.",
      },
      {
        num: "04",
        name: "Verification & Documentation",
        desc: "Validate the result in production, document changes, and establish future improvements.",
      },
    ],
  },
  integration: {
    label: "Business-system integration",
    icon: Cpu,
    summary:
      "Connecting disparate tools, databases, and third-party APIs into synchronized workflows.",
    steps: [
      {
        num: "01",
        name: "Systems & Data Mapping",
        desc: "Understand software tools, data contracts, and manual handoffs involved.",
      },
      {
        num: "02",
        name: "API & Reliability Architecture",
        desc: "Plan event schemas, idempotency, webhook routing, and error recovery policies.",
      },
      {
        num: "03",
        name: "Integration Implementation",
        desc: "Implement and validate APIs, event buses, background queues, and data syncing.",
      },
      {
        num: "04",
        name: "Observability & Ownership",
        desc: "Verify live syncing, set up health alerts, and document system ownership.",
      },
    ],
  },
} as const;

/* ───────────────────────────────────────────────────────────────────────────
   Interactive Stage Visualizers
   ─────────────────────────────────────────────────────────────────────────── */

function UnderstandVisualizer() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-forest uppercase">
          System & Problem Mapping
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-forest-subtle px-2.5 py-0.5 font-mono text-[10px] text-forest">
          <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse" />
          Discovery Phase
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-surface-muted/40 p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-bronze font-semibold">
            01 / Objectives
          </span>
          <h4 className="mt-1 font-sans text-sm font-semibold text-ink">Business Goals</h4>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Revenue drivers, core metrics, and what success actually means.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-muted/40 p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-semibold">
            02 / People
          </span>
          <h4 className="mt-1 font-sans text-sm font-semibold text-ink">User Workflows</h4>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Daily routines, user friction points, and real-world edge cases.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-muted/40 p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-semibold">
            03 / Technology
          </span>
          <h4 className="mt-1 font-sans text-sm font-semibold text-ink">Existing Systems</h4>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Legacy code, databases, external APIs, and architectural constraints.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-muted/40 p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-forest font-semibold">
            04 / Synthesis
          </span>
          <h4 className="mt-1 font-sans text-sm font-semibold text-ink">Root Problem Map</h4>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Distinguishing essential constraints from inherited assumptions.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-surface-muted p-4 flex items-center justify-between">
        <span className="text-xs font-medium text-ink">
          Clear problem statement & technical constraints mapped
        </span>
        <span className="font-mono text-[11px] font-semibold text-forest">READY FOR PLAN &rarr;</span>
      </div>
    </div>
  );
}

function PlanVisualizer() {
  const steps = [
    { title: "Requirements Scope", desc: "Boundaries & trade-offs agreed" },
    { title: "Architecture Blueprint", desc: "Components, APIs & data flows" },
    { title: "Technical Stack", desc: "Frameworks, databases & libraries" },
    { title: "Milestone Roadmaps", desc: "Reviewable delivery checkpoints" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-forest uppercase">
          Architecture & Scope Blueprint
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-forest-subtle px-2.5 py-0.5 font-mono text-[10px] text-forest">
          Clarity Before Code
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {steps.map((item, idx) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl border border-border bg-surface-muted/30 p-3.5 transition-all hover:border-forest/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface font-mono text-xs font-bold text-ink">
                0{idx + 1}
              </span>
              <div>
                <h4 className="font-sans text-sm font-semibold text-ink leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-forest font-medium">
              VERIFIED
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-border bg-surface-muted p-4 flex items-center justify-between">
        <span className="text-xs font-medium text-ink">
          Agreed scope boundary and system architecture
        </span>
        <span className="font-mono text-[11px] font-semibold text-forest">
          READY FOR BUILD &rarr;
        </span>
      </div>
    </div>
  );
}

function BuildVisualizer() {
  const sprintPhases = [
    { title: "Slice Spec", tag: "Design", color: "text-muted" },
    { title: "Clean Code", tag: "Engineer", color: "text-forest" },
    { title: "Integration", tag: "Connect", color: "text-muted" },
    { title: "Automated Tests", tag: "Validate", color: "text-forest" },
    { title: "Stakeholder Demo", tag: "Review", color: "text-bronze" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-forest uppercase">
          Iterative Sprint Pipeline
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-forest-subtle px-2.5 py-0.5 font-mono text-[10px] text-forest">
          Continuous Delivery
        </span>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-2">
        {sprintPhases.map((phase, idx) => (
          <div
            key={phase.title}
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-muted/30 p-2.5 text-center transition-all hover:border-forest"
          >
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
              0{idx + 1}
            </span>
            <span className={`mt-1 font-sans text-xs font-bold ${phase.color}`}>
              {phase.tag}
            </span>
            <span className="mt-1 font-sans text-[11px] font-medium text-ink leading-tight">
              {phase.title}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface-muted/40 p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-muted">CI / CD AUTOMATED PIPELINE</span>
          <span className="text-forest font-semibold">ALL CHECKS PASSING</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-border/40 overflow-hidden">
          <div className="h-full w-full bg-forest rounded-full" />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-muted pt-1">
          <span>Sprint Slice 03/04</span>
          <span>Automated Unit &amp; E2E Tests</span>
        </div>
      </div>
    </div>
  );
}

function DeliverVisualizer() {
  const deliverables = [
    { label: "Deployment", desc: "Production release with zero downtime" },
    { label: "Telemetry", desc: "Observability, logging & performance monitoring" },
    { label: "Handover", desc: "Architecture docs, runbooks & team walkthrough" },
    { label: "Roadmap", desc: "Prioritized enhancements based on real data" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-forest uppercase">
          Production Readiness & Evolution
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-forest-subtle px-2.5 py-0.5 font-mono text-[10px] text-forest">
          Sustainable Delivery
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3.5">
        {deliverables.map((item, idx) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-surface-muted/30 p-4 transition-all hover:border-forest"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
              0{idx + 1} — {item.label}
            </span>
            <p className="mt-1.5 text-xs text-muted leading-relaxed font-normal">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-border bg-surface-muted p-4 flex items-center justify-between">
        <span className="text-xs font-medium text-ink">
          Operational software with clean handover & continuous path
        </span>
        <span className="font-mono text-[11px] font-semibold text-forest">
          COMPLETED &rarr;
        </span>
      </div>
    </div>
  );
}

function StageVisualizer({ kind }: { kind: "understand" | "plan" | "build" | "deliver" }) {
  switch (kind) {
    case "understand":
      return <UnderstandVisualizer />;
    case "plan":
      return <PlanVisualizer />;
    case "build":
      return <BuildVisualizer />;
    case "deliver":
      return <DeliverVisualizer />;
  }
}

/* ───────────────────────────────────────────────────────────────────────────
   Main Component: HowWeWorkPage
   ─────────────────────────────────────────────────────────────────────────── */

export function HowWeWorkPage() {
  const [activeHeroStage, setActiveHeroStage] = useState(0);
  const [mode, setMode] = useState<keyof typeof modes>("product");
  const selectedMode = modes[mode];

  const heroStage = stages[activeHeroStage];
  const HeroStageIcon = heroStage.icon;

  return (
    <>
      {/* ───────────────────────────────────────────────────────────────────
          01 — HERO (Main Stage Pipeline Header)
          Retains className="bg-deep-navy text-on-dark" and <h1> for contract
          ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-deep-navy text-on-dark border-b border-dark-border/40 py-20 lg:py-28 transition-colors duration-300">
        {/* Background Architectural Grid Lines */}
        <div
          className="pointer-events-none absolute inset-0 z-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 divide-x divide-white/[0.04] opacity-70"
          aria-hidden="true"
        >
          <div />
          <div />
          <div />
          <div />
          <div className="hidden sm:block" />
          <div className="hidden sm:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
        </div>

        {/* Ambient Warm Horizon Glows */}
        <div
          className="pointer-events-none absolute -top-40 right-1/4 w-[700px] h-[400px] bg-gradient-to-b from-copper/25 via-amber-500/10 to-transparent blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-copper/10 blur-[150px]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-16">
            {/* Left Column: Headline & Narrative */}
            <div className="flex flex-col space-y-7 max-w-2xl">              

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08] text-balance">
                A clear, considered way to build and improve software.
              </h1>

              {/* Description */}
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-white/80 font-normal">
                <p>
                  We understand the business need, agree on what success looks like, share visible
                  progress as the work takes shape, and prepare a thoughtful handover.
                </p>
                <p className="text-white/70 text-sm sm:text-base border-l-2 border-copper/50 pl-4 italic">
                  No black-box delivery. No unnecessary surprises. Every phase is structured around
                  real evidence and transparent decisions.
                </p>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  style={{ color: "#ffffff" }}
                  className="relative group inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-xs sm:text-sm font-mono font-medium tracking-wider uppercase bg-copper/25 hover:bg-copper/35 border border-copper/60 hover:border-copper transition-all duration-300 shadow-[0_0_20px_rgba(209,164,119,0.25)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Discuss a Project
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <a
                  href="#stages"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-xs sm:text-sm font-mono tracking-wider uppercase text-white/90 hover:text-white transition-all backdrop-blur-md"
                >
                  <span>Explore The 4 Stages</span>
                  <ArrowDown
                    size={14}
                    className="text-copper group-hover:translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Process Pipeline Console */}
            <div className="relative rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-7 backdrop-blur-2xl shadow-2xl overflow-hidden">
              {/* Top Hairline Ambient Glow */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
                aria-hidden="true"
              />

              {/* Console Top Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-copper animate-ping" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-amber-300 font-semibold">
                    Archex Delivery Pipeline
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">
                  Phase 0{activeHeroStage + 1} of 04
                </span>
              </div>

              {/* 4 Interactive Pipeline Stepper Buttons */}
              <div className="mt-6 relative">
                {/* Connecting Track Line */}
                <div
                  className="absolute top-5 left-4 right-4 h-[2px] bg-white/10 -z-0"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-4 gap-2 relative z-10">
                  {stages.map((stage, idx) => {
                    const isSelected = activeHeroStage === idx;
                    const Icon = stage.icon;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setActiveHeroStage(idx)}
                        className={`group flex flex-col items-center text-center transition-all focus:outline-hidden ${isSelected ? "opacity-100" : "opacity-60 hover:opacity-90"
                          }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${isSelected
                            ? "border-amber-400 bg-amber-400/20 text-white shadow-[0_0_15px_rgba(245,158,11,0.35)] scale-110"
                            : "border-white/15 bg-black/40 text-white/70 group-hover:border-white/30"
                            }`}
                        >
                          <Icon size={16} />
                        </div>

                        <span className="mt-2 font-mono text-[10px] tracking-wider font-semibold text-white">
                          {stage.number}
                        </span>
                        <span className="font-sans text-[11px] font-medium text-white/90 leading-tight">
                          {stage.title}
                        </span>
                        <span className="font-mono text-[9px] text-white/50 uppercase mt-0.5">
                          {["Context", "Direction", "Evidence", "Momentum"][idx]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Stage Inspection Pane */}
              <div className="mt-7 rounded-xl border border-white/10 bg-black/40 p-5 space-y-3.5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border font-mono text-[10px] font-semibold tracking-wider uppercase ${heroStage.badge}`}
                    >
                      <span>STAGE {heroStage.number}</span>
                      <span>/</span>
                      <span>{heroStage.phase}</span>
                    </span>
                  </div>
                  <HeroStageIcon size={16} className="text-white/60" />
                </div>

                <h3 className="font-sans text-base font-semibold text-white leading-snug">
                  {heroStage.headline}
                </h3>

                <p className="text-xs text-white/75 leading-relaxed font-normal">
                  {heroStage.description}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-white/50 tracking-wider">
                    Key Outcome
                  </span>
                  <a
                    href={`#${heroStage.id}`}
                    className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-copper hover:text-amber-300 transition-colors"
                  >
                    <span>View Stage Details</span>
                    <ChevronRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          02 — 4-STAGE QUICK JUMP NAVIGATION
          Retains id="stages" and bg-paper for test contract
          ─────────────────────────────────────────────────────────────────── */}
      <section
        id="stages"
        className="border-b border-border bg-paper dark:bg-[#07080c] py-14 transition-colors duration-300"
        aria-label="Process Stages Navigation"
      >
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/80">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper font-semibold">
                Four Sequential Phases
              </span>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                From problem understanding to continuous software delivery.
              </h2>
            </div>
            <p className="font-mono text-xs text-muted uppercase tracking-wider">
              Click any stage to inspect
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <a
                  key={stage.id}
                  href={`#${stage.id}`}
                  className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface dark:bg-[#0c0d15]/80 p-6 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-copper/60 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-mono text-[10px] font-semibold tracking-wider uppercase ${stage.accent}`}
                      >
                        STAGE {stage.number}
                      </span>
                      <Icon size={16} className="text-muted group-hover:text-ink transition-colors" />
                    </div>

                    <h3 className="font-sans text-lg font-bold text-ink leading-snug group-hover:text-copper transition-colors">
                      {stage.title}
                    </h3>

                    <p className="text-xs text-muted leading-relaxed">
                      {[
                        "Context before solutions. Root problems mapped before writing code.",
                        "Boundaries before building. Scope and technical architecture agreed.",
                        "Evidence through working software. Reviewed in iterative sprint slices.",
                        "A handover with a next step. Production deployment and roadmap.",
                      ][index]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted group-hover:text-copper transition-colors">
                    <span>EXPLORE STAGE</span>
                    <ArrowDown
                      size={14}
                      className="transition-transform group-hover:translate-y-1"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          03 — THE 4 STAGE DEEP-DIVE SECTIONS
          ─────────────────────────────────────────────────────────────────── */}
      {stages.map((stage, index) => (
        <section
          key={stage.id}
          id={stage.id}
          className={`py-20 sm:py-28 border-b border-border scroll-mt-20 transition-colors duration-300 ${index % 2 === 0
            ? "bg-paper dark:bg-[#07080c]"
            : "bg-surface/50 dark:bg-[#08090f]"
            }`}
        >
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-start">
            {/* Left Column: Stage Copy & Partnership */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[11px] font-semibold tracking-wider uppercase ${stage.accent}`}
                >
                  <span>STAGE {stage.number}</span>
                  <span>/</span>
                  <span>{stage.phase}</span>
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
                {stage.headline}
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-muted font-normal">
                {stage.description}
              </p>

              {/* Client Collaboration / Your Role Card */}
              <div className="rounded-xl border border-border bg-surface dark:bg-[#0c0d15]/80 p-6 backdrop-blur-md shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-copper" />
                  <span className="font-mono text-xs uppercase tracking-wider text-copper font-semibold">
                    Client Collaboration — Your Role
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{stage.client}</p>
              </div>

              {/* Deliverables List */}
              <div className="pt-4 border-t border-border space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted/80 font-semibold block">
                  What This Stage Produces
                </span>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {stage.outputs.map((output) => (
                    <div
                      key={output}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-ink leading-snug"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-copper"
                        aria-hidden="true"
                      />
                      <span>{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Architecture Visualizer */}
            <div>
              <StageVisualizer
                kind={stage.id as "understand" | "plan" | "build" | "deliver"}
              />
            </div>
          </Container>
        </section>
      ))}

      {/* ───────────────────────────────────────────────────────────────────
          04 — COLLABORATION PRINCIPLES
          Retains bg-deep-navy text-on-dark for test contracts
          ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-deep-navy text-on-dark py-24 lg:py-32 border-b border-dark-border/40 transition-colors duration-300">
        {/* Subtle grid lines */}
        <div
          className="pointer-events-none absolute inset-0 z-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 divide-x divide-white/[0.04] opacity-70"
          aria-hidden="true"
        >
          <div />
          <div />
          <div />
          <div />
          <div className="hidden sm:block" />
          <div className="hidden sm:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-copper/40 bg-copper/15 shadow-2xs backdrop-blur-md">
              <span className="font-mono text-[11px] uppercase tracking-widest text-amber-300 dark:text-amber-300">
                Collaboration Principles
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              You stay close to the work, not just the status.
            </h2>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Software engineering shouldn&apos;t be a black box. We maintain direct visibility,
              documented decisions, and shared ownership from day one.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                num: "01",
                title: "Clear Decisions",
                body: "Important scope, architecture, and technology decisions are documented with reasons.",
                icon: FileText,
              },
              {
                num: "02",
                title: "Visible Progress",
                body: "Work is shared in regular, demonstrable increments so you see software taking shape.",
                icon: Eye,
              },
              {
                num: "03",
                title: "Direct Communication",
                body: "Questions, risks, dependencies, and blockers are surfaced early, not avoided.",
                icon: MessageSquare,
              },
              {
                num: "04",
                title: "Agreed Priorities",
                body: "Scope changes are evaluated against effort, timelines, and real business value.",
                icon: Target,
              },
              {
                num: "05",
                title: "Responsible Delivery",
                body: "Automated testing, documentation, and operational handover are baked into every step.",
                icon: ShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-all hover:border-copper/60 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-copper tracking-widest">
                      {item.num}
                    </span>
                    <Icon size={16} className="text-white/60" />
                  </div>
                  <h3 className="mt-6 font-sans text-base font-semibold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-12 rounded-2xl border border-copper/40 bg-copper/10 p-6 sm:p-8 backdrop-blur-md text-center max-w-3xl mx-auto">
            <p className="font-sans text-xl sm:text-2xl font-semibold text-white">
              No unnecessary surprises. No hidden decisions. No black-box delivery.
            </p>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          05 — WHAT CLIENTS RECEIVE (Tangible Artifacts)
          ─────────────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-b border-border bg-surface/50 dark:bg-[#07080c] transition-colors duration-300">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper font-semibold">
              Tangible Artifacts
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
              The work leaves you with software you actually own and understand.
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              Not every engagement requires every deliverable, but the outcomes are always tangible,
              documented, and ready for your team.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Requirements & Scope Documentation",
                desc: "User stories, acceptance criteria, and explicit boundaries.",
                icon: FileText,
              },
              {
                title: "User Flows & Workflow Maps",
                desc: "Interaction diagrams showing how information moves.",
                icon: Workflow,
              },
              {
                title: "Technical Architecture & API Plans",
                desc: "Component diagrams, database schemas, and integration contracts.",
                icon: Layers,
              },
              {
                title: "Interface Designs & Prototypes",
                desc: "Validated user experiences built for intuitive real-world use.",
                icon: Sparkles,
              },
              {
                title: "Working Software & Clean Code",
                desc: "Production-grade, fully tested, modular repository source code.",
                icon: Code2,
              },
              {
                title: "Test Suites & Validation Records",
                desc: "Automated unit, integration, and end-to-end regression tests.",
                icon: ShieldCheck,
              },
              {
                title: "Technical Documentation",
                desc: "Developer guides, API references, and system runbooks.",
                icon: BookOpen,
              },
              {
                title: "Deployment & Handover Materials",
                desc: "CI/CD configuration, environment blueprints, and team walkthroughs.",
                icon: Rocket,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-border bg-surface dark:bg-[#0c0d15]/80 p-6 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-copper/50 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-paper text-copper group-hover:scale-105 transition-transform">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-semibold text-ink leading-snug group-hover:text-copper transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-xs font-mono text-muted text-center">
            * Specific deliverables and review milestones are agreed before work begins.
          </p>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          06 — THE PROCESS ADAPTS TO THE WORK (Engagement Modes)
          ─────────────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-b border-border bg-paper dark:bg-[#07080c] transition-colors duration-300">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-start">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper font-semibold">
                Adaptable by Design
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
                The process adapts to the work.
              </h2>
              <p className="text-muted text-base leading-relaxed">
                These are illustrative delivery models. The same disciplined engineering mindset
                takes a different shape depending on whether you are building fresh, connecting
                systems, or modernizing legacy software.
              </p>
            </div>

            <div className="space-y-6">
              {/* Tab Switcher */}
              <div
                role="tablist"
                aria-label="Engagement types"
                className="grid gap-2.5 sm:grid-cols-2"
              >
                {Object.entries(modes).map(([key, item]) => {
                  const Icon = item.icon;
                  const isSelected = mode === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setMode(key as keyof typeof modes)}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-semibold transition-all ${isSelected
                        ? "border-forest bg-forest text-white shadow-xs dark:border-amber-400 dark:bg-white/[0.05]"
                        : "border-border bg-surface hover:border-copper/50 text-ink"
                        }`}
                    >
                      <Icon
                        size={18}
                        className={isSelected ? "text-amber-300" : "text-copper"}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mode Details Card */}
              <div
                className="rounded-2xl border border-border bg-surface dark:bg-[#0c0d15]/80 p-7 backdrop-blur-md shadow-xs space-y-6"
                role="tabpanel"
              >
                <div className="border-b border-border pb-4">
                  <h3 className="font-sans text-lg font-bold text-ink">{selectedMode.label}</h3>
                  <p className="text-xs sm:text-sm text-muted mt-1">{selectedMode.summary}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedMode.steps.map((step) => (
                    <div
                      key={step.num}
                      className="rounded-xl border border-border/70 bg-paper/50 dark:bg-white/[0.02] p-4 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-copper">
                          STEP {step.num}
                        </span>
                      </div>
                      <h4 className="font-sans text-sm font-semibold text-ink leading-snug">
                        {step.name}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          07 — FINAL CALL TO ACTION
          Signature Archex Craft CTA Card styling
          ─────────────────────────────────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-32 border-b border-border bg-paper dark:bg-[#07080c] overflow-hidden transition-colors duration-300"
        aria-label="Start a Project CTA"
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-copper/15 via-orange-500/10 to-transparent blur-[160px]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="relative rounded-3xl border border-border bg-surface dark:bg-[#0b0d14]/90 p-10 sm:p-16 lg:p-20 backdrop-blur-2xl shadow-xl overflow-hidden text-center max-w-4xl mx-auto">
            {/* Top flare accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-copper to-transparent opacity-90" />

            <div className="space-y-6 max-w-2xl mx-auto">

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.1] text-balance">
                Start with the problem. We&apos;ll work through the next step together.
              </h2>

              <p className="text-muted text-base sm:text-lg leading-relaxed">
                Tell us what you are trying to build, improve or connect. We can begin by
                understanding the context and identifying a sensible way forward.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/start-project"
                  className="relative group inline-flex items-center justify-center px-8 py-4 rounded-xl text-xs sm:text-sm font-mono font-medium tracking-wider uppercase bg-forest border border-forest hover:bg-forest-hover transition-all duration-300 shadow-md"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Discuss a Project
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-mono font-medium tracking-wider uppercase text-ink bg-surface border border-border hover:border-copper hover:text-copper transition-all shadow-2xs"
                >
                  <span>Explore Services</span>
                  <span className="text-copper">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
