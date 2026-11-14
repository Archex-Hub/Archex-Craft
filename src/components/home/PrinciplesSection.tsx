import { Container } from "@/components/layout/container";
import { Compass, Lightbulb, Scale, Sparkles } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "UNDERSTAND THE CONTEXT",
    description:
      "A requirement is only part of the problem. We look at the people, workflows and systems around it before deciding how to approach the solution.",
    icon: Compass,
    accent: "text-copper",
  },
  {
    number: "02",
    title: "DESIGN FOR REAL OPERATIONS",
    description:
      "Software has to work in everyday situations. We consider how information moves, how people use systems and how the solution fits into existing operations.",
    icon: Lightbulb,
    accent: "text-sky-600 dark:text-sky-400",
  },
  {
    number: "03",
    title: "MAKE DELIBERATE DECISIONS",
    description:
      "Every technology and architecture decision should have a reason. We favour appropriate solutions over unnecessary complexity.",
    icon: Scale,
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    number: "04",
    title: "THINK BEYOND DELIVERY",
    description:
      "Software continues to evolve after launch. Maintainability, documentation, testing and future improvements deserve attention from the beginning.",
    icon: Sparkles,
    accent: "text-pink-600 dark:text-pink-400",
  },
];

export function PrinciplesSection() {
  return (
    <section
      id="principles"
      className="relative py-24 lg:py-32 border-b border-border bg-paper dark:bg-[#07080c] overflow-hidden scroll-mt-20 transition-colors duration-300"
      aria-label="Engineering Principles"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
            The way we think matters as much as what we build.
          </h2>
          <p className="text-muted text-base sm:text-lg">
            Engineering isn&apos;t just code—it&apos;s a series of considered decisions that dictate how long a system survives and how well it serves the people using it.
          </p>
        </div>

        {/* 4 Editorial Principles Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface dark:bg-[#0c0d15]/80 p-8 sm:p-10 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-copper/50 hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold tracking-widest ${item.accent}`}>
                      PRINCIPLE // {item.number}
                    </span>
                    <Icon size={18} className="text-muted group-hover:text-ink transition-colors" />
                  </div>

                  <h3 className="font-sans text-xl font-bold text-ink tracking-wide group-hover:text-copper transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
