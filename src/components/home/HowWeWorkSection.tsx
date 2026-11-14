import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowUpRight, Compass, FileCheck, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "UNDERSTAND",
    headline: "Before building anything, we listen.",
    description:
      "We learn about your business, the people using the software, existing systems and the challenges that need to be addressed.",
    deliverable: "Stakeholder interviews, system audit & problem mapping",
    icon: Compass,
    accent: "text-copper border-copper/30 bg-copper/10",
  },
  {
    number: "02",
    phase: "DEFINE",
    headline: "Clarity before execution.",
    description:
      "We establish the requirements, identify the important technical considerations and agree on the scope and approach.",
    deliverable: "Architecture blueprint, data schema & technical scope",
    icon: FileCheck,
    accent: "text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
  {
    number: "03",
    phase: "BUILD",
    headline: "Thoughtful execution, step by step.",
    description:
      "We develop, integrate and test the solution, keeping the work visible and allowing room for review and refinement.",
    deliverable: "Iterative sprints, automated test coverage & CI/CD",
    icon: Hammer,
    accent: "text-indigo-600 dark:text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
  },
  {
    number: "04",
    phase: "DELIVER",
    headline: "Ready for real-world use.",
    description:
      "We prepare the software for release, document the important parts and establish the next steps for maintenance or improvement.",
    deliverable: "Production deployment, observability & documentation",
    icon: Rocket,
    accent: "text-pink-600 dark:text-pink-400 border-pink-500/30 bg-pink-500/10",
  },
];

export function HowWeWorkSection() {
  return (
    <section
      id="how-we-work"
      className="relative py-24 lg:py-32 border-b border-border bg-paper dark:bg-[#07080c] overflow-hidden scroll-mt-20 transition-colors duration-300"
      aria-label="How We Work"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-copper/5 blur-[160px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-border">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
              Good engineering starts with the right questions.
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Every project has its own challenges. Our process gives us a clear way to understand the requirements, make decisions and move towards a working solution.
            </p>
          </div>

          <Link
            href="/how-we-work"
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-xs font-mono font-medium tracking-wider uppercase text-ink hover:border-copper hover:text-copper transition-all shrink-0 shadow-2xs"
          >
            <span>Explore How We Work</span>
            <ArrowUpRight
              size={15}
              className="text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* 4 Step Sequential Process Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface dark:bg-[#0c0d14]/80 p-7 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-copper/50 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[11px] font-semibold tracking-wider uppercase ${step.accent}`}
                    >
                      <span>{step.number}</span>
                      <span>/</span>
                      <span>{step.phase}</span>
                    </span>
                    <Icon size={18} className="text-muted group-hover:text-ink transition-colors" />
                  </div>

                  <h3 className="font-sans text-lg font-semibold text-ink leading-snug group-hover:text-copper transition-colors">
                    {step.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-border text-xs font-mono text-muted">
                  <span className="block text-[10px] uppercase text-muted/60 mb-1">KEY OUTCOME</span>
                  <span className="text-ink/80">{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
