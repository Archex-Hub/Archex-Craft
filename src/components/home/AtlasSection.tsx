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
    accentColor: "border-copper text-copper bg-copper/10",
    dotColor: "bg-copper",
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
    accentColor: "border-sky-500 text-sky-600 dark:text-sky-300 bg-sky-500/10",
    dotColor: "bg-sky-500",
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
    accentColor: "border-emerald-500 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10",
    dotColor: "bg-emerald-500",
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
    accentColor: "border-purple-500 text-purple-600 dark:text-purple-300 bg-purple-500/10",
    dotColor: "bg-purple-500",
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
    accentColor: "border-pink-500 text-pink-600 dark:text-pink-300 bg-pink-500/10",
    dotColor: "bg-pink-500",
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
      className="relative py-24 lg:py-32 border-b border-border bg-surface/50 dark:bg-[#06070b] overflow-hidden scroll-mt-20 transition-colors duration-300"
      aria-label="Engineering Atlas"
    >
      {/* Background blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px] text-ink/[0.04] dark:text-white/[0.04]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
            Software is a system of connected parts.
          </h2>

          <div className="space-y-4 text-muted text-base sm:text-lg max-w-2xl">
            <p>
              What people see on a screen is only one part of a software product.
              Behind it are the applications, databases, integrations, infrastructure
              and processes that make everything work together.
            </p>
            <p className="text-sm sm:text-base text-muted/80">
              We consider these layers together, so the solution isn&apos;t just functional
              on the surface but has a sound technical foundation underneath.
            </p>
          </div>
        </div>

        {/* Interactive 5-Layer Stack Explorer */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Left Column: Stack Layers Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 text-xs font-mono text-muted">
              <span>SYSTEM ARCHITECTURE TIERS</span>
              <span>CLICK TO INSPECT LAYER</span>
            </div>

            {ATLAS_LAYERS.map((layer) => {
              const isSelected = activeLayerId === layer.id;
              const Icon = layer.icon;

              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`group relative flex w-full items-center justify-between rounded-xl border p-5 text-left transition-all duration-300 backdrop-blur-md ${
                    isSelected
                      ? "border-copper bg-surface shadow-md translate-x-1"
                      : "border-border bg-surface/70 hover:border-copper/50 hover:bg-surface shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs font-semibold px-2.5 py-1 rounded border ${
                        isSelected
                          ? "border-copper text-copper bg-copper/10"
                          : "border-border text-muted group-hover:text-ink"
                      }`}
                    >
                      L{layer.index}
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
                      {layer.capabilities.length} domains
                    </span>
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        isSelected ? "text-copper" : "text-muted group-hover:text-ink"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Layer Deep Dive Visualizer */}
          <div className="rounded-2xl border border-border bg-surface dark:bg-[#0c0d15]/95 p-8 sm:p-10 backdrop-blur-2xl shadow-xl relative overflow-hidden">
            {/* Top glowing ambient highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-copper to-transparent opacity-80" />

            <div className="space-y-6">
              {/* Layer Telemetry Header */}
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-copper/30 bg-copper/10 text-copper">
                    <ActiveIcon size={22} />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-copper tracking-wider uppercase block">
                      LAYER {activeLayer.index} // ARCHITECTURE INSPECTOR
                    </span>
                    <h3 className="font-sans text-2xl font-bold text-ink">
                      {activeLayer.name}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
                  CAPABILITIES UNDER THIS LAYER
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
                className="group/btn inline-flex items-center gap-2 rounded-lg border border-copper/40 bg-copper/10 px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-copper hover:bg-copper/20 hover:border-copper transition-all shrink-0 shadow-2xs"
              >
                <span>Explore Engineering Capabilities</span>
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
