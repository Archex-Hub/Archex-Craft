import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowUpRight, Code2, Network, ShieldCheck } from "lucide-react";

const pillars = [
  {
    number: "01",
    phase: "BUILD",
    title: "Turn ideas into working products.",
    description:
      "From the first concept to a fully developed application, we build digital products around real requirements.",
    subtext:
      "Whether it's a new business application, a customer-facing platform or a product you're bringing to market, we help turn the idea into working software.",
    capabilities: [
      "Custom software and SaaS",
      "Web applications and websites",
      "Ecommerce platforms",
      "Mobile applications",
      "Business applications and portals",
    ],
    ctaLabel: "Explore Product Engineering",
    ctaHref: "/services",
    icon: Code2,
    badgeColor: "text-copper border-copper/30 bg-copper/10",
    glowColor: "hover:border-copper/60 dark:hover:border-amber-400/60",
    dotColor: "bg-copper",
  },
  {
    number: "02",
    phase: "CONNECT",
    title: "Bring systems, data and workflows together.",
    description:
      "Software becomes more useful when the different parts of a business can work together.",
    subtext:
      "We integrate applications, connect business systems and introduce AI into workflows where it can reduce repetitive work and improve how information is used.",
    capabilities: [
      "API development and integration",
      "AI-powered applications",
      "Business workflow automation",
      "Document and information processing",
      "System and data integration",
    ],
    ctaLabel: "Explore AI & Integration",
    ctaHref: "/services",
    icon: Network,
    badgeColor: "text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10",
    glowColor: "hover:border-sky-500/60 dark:hover:border-sky-400/60",
    dotColor: "bg-sky-500",
  },
  {
    number: "03",
    phase: "IMPROVE",
    title: "Make existing software better.",
    description:
      "Not every technical problem needs a complete rebuild.",
    subtext:
      "We help businesses understand what's holding their software back and improve it through considered changes to architecture, performance, infrastructure and code.",
    capabilities: [
      "Legacy application assessment",
      "Software modernization",
      "Performance optimization",
      "Architecture improvements",
      "Migration and maintenance",
    ],
    ctaLabel: "Explore Software Engineering",
    ctaHref: "/services",
    icon: ShieldCheck,
    badgeColor: "text-pink-600 dark:text-pink-400 border-pink-500/30 bg-pink-500/10",
    glowColor: "hover:border-pink-500/60 dark:hover:border-pink-400/60",
    dotColor: "bg-pink-500",
  },
];

export function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="relative py-24 lg:py-32 border-b border-border bg-paper dark:bg-[#07080c] overflow-hidden scroll-mt-20 transition-colors duration-300"
      aria-label="What We Do"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -top-24 right-0 w-[500px] h-[500px] bg-copper/5 blur-[160px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
            Three ways we engineer better solutions.
          </h2>
          <p className="text-muted text-base sm:text-lg">
            Practical, disciplined software capabilities built around your organization&apos;s real-world operational challenges.
          </p>
        </div>

        {/* 3 Pillar Deep-Dive Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.number}
                className={`group relative flex flex-col justify-between rounded-xl border border-border bg-surface dark:bg-[#0c0d14]/80 p-8 backdrop-blur-xl shadow-xs transition-all duration-300 ${pillar.glowColor} hover:-translate-y-1.5 hover:shadow-lg`}
              >
                {/* Header tag */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs font-semibold tracking-wider uppercase ${pillar.badgeColor}`}
                    >
                      <span>{pillar.number}</span>
                      <span>/</span>
                      <span>{pillar.phase}</span>
                    </span>
                    <Icon className="w-5 h-5 text-muted group-hover:text-ink transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-sans text-2xl font-bold text-ink group-hover:text-copper transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                    <p className="text-xs text-muted/70 leading-relaxed">
                      {pillar.subtext}
                    </p>
                  </div>

                  {/* Capabilities List */}
                  <div className="pt-4 border-t border-border">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted/70 block mb-3">
                      Capabilities
                    </span>
                    <ul className="space-y-2.5 text-xs text-ink/90 font-mono">
                      {pillar.capabilities.map((cap) => (
                        <li key={cap} className="flex items-center gap-2.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${pillar.dotColor}`} />
                          <span className="text-muted group-hover:text-ink transition-colors">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Link */}
                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href={pillar.ctaHref}
                    className="group/link inline-flex items-center justify-between w-full rounded-lg border border-border bg-surface-muted/50 px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase text-ink hover:border-copper hover:text-copper transition-all shadow-2xs"
                  >
                    <span>{pillar.ctaLabel}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-copper group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
