import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowRight, Compass, FileCheck, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "UNDERSTAND",
    headline: "Understand the requirement.",
    description:
      "We learn about your business, the people using the software, existing systems, and the actual challenge that needs to be solved.",
    deliverable: "Problem mapping & system audit",
    icon: Compass,
  },
  {
    number: "02",
    phase: "PLAN",
    headline: "Plan the architecture.",
    description:
      "We establish modular boundaries, choose appropriate technologies, and agree on technical scope and clear evaluation criteria.",
    deliverable: "Architecture blueprint & technical scope",
    icon: FileCheck,
  },
  {
    number: "03",
    phase: "BUILD",
    headline: "Engineer and validate.",
    description:
      "We build in testable increments with automated coverage, keeping code clean, documented, and reviewed with your team.",
    deliverable: "Working software & automated tests",
    icon: Hammer,
  },
  {
    number: "04",
    phase: "DELIVER",
    headline: "Deliver and refine.",
    description:
      "We release responsibly, complete comprehensive handover and documentation, and support continued operational improvement.",
    deliverable: "Production release & complete IP handover",
    icon: Rocket,
  },
];

export function HowWeWorkSection() {
  return (
    <section
      id="how-we-work"
      className="relative py-20 lg:py-28 border-b border-border bg-paper scroll-mt-20 transition-colors duration-300"
      aria-label="What working with Craft looks like"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-border">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
              What working with Craft looks like.
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Every project begins with clarity. Our four-step delivery process keeps engineering decisions visible and grounded in reality.
            </p>
          </div>

          <Link
            href="/how-we-work"
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-xs font-mono font-medium tracking-wider uppercase text-ink hover:border-forest hover:text-forest transition-colors shrink-0 shadow-2xs"
          >
            <span>Explore full process</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* 4 Step Sequential Process Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-7 shadow-2xs transition-all duration-300 hover:border-forest hover:-translate-y-1 hover:shadow-sm"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-forest/20 bg-forest-subtle font-mono text-[11px] font-semibold tracking-wider text-forest uppercase">
                      <span>{step.number}</span>
                      <span>/</span>
                      <span>{step.phase}</span>
                    </span>
                    <Icon size={18} className="text-muted group-hover:text-forest transition-colors" />
                  </div>

                  <h3 className="font-sans text-lg font-semibold text-ink leading-snug group-hover:text-forest transition-colors">
                    {step.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-border text-xs font-mono text-muted">
                  <span className="block text-[10px] uppercase text-muted/70 mb-1">KEY OUTCOME</span>
                  <span className="text-ink font-medium">{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
