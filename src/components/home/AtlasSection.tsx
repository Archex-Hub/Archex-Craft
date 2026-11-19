"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowUpRight, Cpu, Database, Globe, ShieldCheck, Zap } from "lucide-react";

export const ATLAS_LAYERS = [
  {
    id: "layer-1",
    index: "01",
    name: "PRODUCT EXPERIENCE",
    badge: "FRONTEND & RUNTIME",
    headline: "Fast, responsive interfaces people actually want to use.",
    description:
      "Web applications, commerce engines, mobile experiences, and intuitive design systems built on accessible, edge-rendered architecture.",
    capabilities: [
      "Web & CMS",
      "Ecommerce",
      "Mobile Applications",
      "User Interfaces",
    ],
    techStack: ["Next.js App Router", "React Server Components", "React Native", "Tailwind CSS"],
    accentColor: "border-forest text-forest bg-forest-subtle",
    dotColor: "bg-forest",
    icon: Globe,
  },
  {
    id: "layer-2",
    index: "02",
    name: "APPLICATION ENGINEERING",
    badge: "DOMAIN & LOGIC",
    headline: "Resilient business logic and backend engines.",
    description:
      "Modular backend software, custom SaaS platforms, domain logic, and clean API contracts that keep data consistent and services decoupled.",
    capabilities: [
      "Custom Software",
      "SaaS Platforms",
      "Backend Systems",
      "Domain Logic & APIs",
    ],
    techStack: ["TypeScript / Node", "PostgreSQL", "REST & GraphQL", "Redis Caching"],
    accentColor: "border-forest text-forest bg-forest-subtle",
    dotColor: "bg-forest",
    icon: Cpu,
  },
  {
    id: "layer-3",
    index: "03",
    name: "INTELLIGENT SYSTEMS",
    badge: "AI & WORKFLOWS",
    headline: "Practical AI that solves tangible operational bottlenecks.",
    description:
      "Context retrieval pipelines, LLM-orchestrated document processing, predictive intelligence, and verifiable human-in-the-loop guardrails.",
    capabilities: [
      "AI & Machine Learning",
      "Knowledge Retrieval",
      "Document Processing",
      "Automated Workflows",
    ],
    techStack: ["Vector Databases", "Embeddings & RAG", "Model Evaluation", "Agentic Pipelines"],
    accentColor: "border-forest text-forest bg-forest-subtle",
    dotColor: "bg-forest",
    icon: Zap,
  },
  {
    id: "layer-4",
    index: "04",
    name: "CONNECTED INFRASTRUCTURE",
    badge: "DATA & CLOUD",
    headline: "High-throughput data bridges and cloud foundations.",
    description:
      "Robust API gateways, reliable webhooks, serverless cloud runtimes, and resilient data exchange channels connecting internal and third-party systems.",
    capabilities: [
      "API Integrations",
      "Data Exchange",
      "Cloud Infrastructure",
      "System Architecture",
    ],
    techStack: ["AWS / Supabase / Cloudflare", "Webhook Sync", "Queue Pipelines", "Observability"],
    accentColor: "border-forest text-forest bg-forest-subtle",
    dotColor: "bg-forest",
    icon: Database,
  },
  {
    id: "layer-5",
    index: "05",
    name: "QUALITY & CONTINUITY",
    badge: "STABILITY & LONGEVITY",
    headline: "Software engineered to thrive for years after delivery.",
    description:
      "Automated test suites, telemetry monitoring, performance budgets, modernization audits, and maintainable documentation.",
    capabilities: [
      "Testing & Validation",
      "Performance",
      "Modernization",
      "Maintainability",
    ],
    techStack: ["Vitest & Playwright", "Core Web Vitals", "Zero-Downtime Migration", "Telemetry"],
    accentColor: "border-forest text-forest bg-forest-subtle",
    dotColor: "bg-forest",
    icon: ShieldCheck,
  },
];

export function AtlasSection() {
  const [activeLayerId, setActiveLayerId] = useState("layer-1");
  const activeLayer = ATLAS_LAYERS.find((l) => l.id === activeLayerId) || ATLAS_LAYERS[0];
  const ActiveIcon = activeLayer.icon;

  return (
    <section
      id="engineering-atlas"
      className="relative py-20 lg:py-28 border-b border-border bg-paper scroll-mt-20 transition-colors duration-300"
      aria-label="Engineering Disciplines"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface w-fit shadow-2xs">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              HOW WE BUILD IT
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
            Engineering disciplines behind what we build.
          </h2>

          <div className="space-y-4 text-muted text-base sm:text-lg max-w-2xl">
            <p>
              Software is a system of connected disciplines. What users see on a screen is powered by backend engines, automated workflows, and reliable cloud foundations.
            </p>
          </div>
        </div>

        {/* Interactive 5-Layer Stack Explorer */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Left Column: Stack Layers Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 text-xs font-mono text-muted">
              <span>ENGINEERING DISCIPLINES</span>
              <span>SELECT DISCIPLINE</span>
            </div>

            {ATLAS_LAYERS.map((layer) => {
              const isSelected = activeLayerId === layer.id;
              const Icon = layer.icon;

              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`group relative flex w-full items-center justify-between rounded-xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-forest bg-surface shadow-xs translate-x-1"
                      : "border-border bg-surface hover:border-forest/50 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs font-semibold px-2.5 py-1 rounded border ${
                        isSelected
                          ? "border-forest text-forest bg-forest-subtle"
                          : "border-border text-muted group-hover:text-ink"
                      }`}
                    >
                      0{layer.index}
                    </span>

                    <div>
                      <h3 className="font-sans text-base font-semibold text-ink tracking-wide">
                        {layer.name}
                      </h3>
                      <p className="text-xs text-muted font-mono mt-0.5">
                        {layer.badge}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-xs font-mono text-muted">
                      {layer.capabilities.length} areas
                    </span>
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        isSelected ? "text-forest" : "text-muted group-hover:text-ink"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Layer Deep Dive Visualizer */}
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10 shadow-xs relative overflow-hidden">
            <div className="space-y-6">
              {/* Layer Header */}
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-muted text-forest">
                    <ActiveIcon size={22} />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-bronze tracking-wider uppercase block">
                      DISCIPLINE 0{activeLayer.index} // ARCHITECTURE
                    </span>
                    <h3 className="font-sans text-2xl font-bold text-ink">
                      {activeLayer.name}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-forest flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-subtle border border-forest/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                  ACTIVE
                </span>
              </div>

              {/* Headline & Description */}
              <div className="space-y-2">
                <h4 className="font-sans text-lg font-medium text-ink leading-snug">
                  {activeLayer.headline}
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {activeLayer.description}
                </p>
              </div>

              {/* Core Capabilities */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[11px] text-muted uppercase tracking-widest block">
                  CAPABILITIES UNDER THIS DISCIPLINE
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {activeLayer.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-2 rounded-lg border border-border bg-surface-muted/40 p-3 text-xs text-ink font-mono"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${activeLayer.dotColor}`} />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack & Protocols */}
              <div className="space-y-3 pt-2 border-t border-border">
                <span className="font-mono text-[11px] text-muted uppercase tracking-widest block">
                  STANDARDS & RUNTIMES
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Callout & CTA */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-muted italic">
                &ldquo;Technology should support the solution, not complicate it.&rdquo;
              </p>
              <Link
                href="/services"
                className="group/btn inline-flex items-center gap-2 rounded-lg border border-border bg-surface-muted px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-ink hover:border-forest hover:text-forest transition-colors shrink-0 shadow-2xs"
              >
                <span>View in catalog</span>
                <ArrowUpRight
                  size={14}
                  className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
