import { Container } from "@/components/layout/container";
import { Layers, RefreshCw, Cpu } from "lucide-react";

const challenges = [
  {
    number: "01",
    tag: "FOUNDATION",
    title: "A new idea needs the right technical foundation to become a product.",
    description:
      "Too many promising products stall because early architecture couldn't handle real users, edge cases, or database scaling. Building right means laying modular domain boundaries from day one.",
    icon: Layers,
    accent: "from-copper/20 to-orange-500/0",
    borderGlow: "hover:border-copper/60 dark:hover:border-amber-400/50",
    indicatorColor: "text-copper dark:text-amber-400",
  },
  {
    number: "02",
    tag: "FRAGMENTATION",
    title: "Disconnected tools and repetitive processes need a better way to work together.",
    description:
      "Teams lose hundreds of hours to manual copy-pasting, mismatched APIs, and fragmented systems. Practical automation and AI pipelines bridge these gaps without fragile glue.",
    icon: Cpu,
    accent: "from-sky-500/20 to-blue-500/0",
    borderGlow: "hover:border-sky-500/60 dark:hover:border-sky-400/50",
    indicatorColor: "text-sky-600 dark:text-sky-400",
  },
  {
    number: "03",
    tag: "TECHNICAL DEBT",
    title: "And software that has been around for years needs to keep up with the business using it.",
    description:
      "Total rewrites are costly and risky. Modernizing core systems through disciplined refactoring, decoupled services, and cloud migrations unlocks velocity without shutting down operations.",
    icon: RefreshCw,
    accent: "from-pink-500/20 to-rose-500/0",
    borderGlow: "hover:border-pink-500/60 dark:hover:border-pink-400/50",
    indicatorColor: "text-pink-600 dark:text-pink-400",
  },
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative py-24 lg:py-32 border-b border-border bg-surface/50 dark:bg-[#08090f] overflow-hidden scroll-mt-20 transition-colors duration-300"
      aria-label="The Software Engineering Problem"
    >
      {/* Background glow orb */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-copper/5 dark:bg-cyan-500/5 blur-[160px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
            Software should make work simpler.
            <br />
            <span className="text-muted/60">Not more complicated.</span>
          </h2>
        </div>

        {/* 3 Challenge Cards Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {challenges.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className={`group relative flex flex-col justify-between rounded-xl border border-border bg-surface dark:bg-white/[0.02] p-8 backdrop-blur-md shadow-xs transition-all duration-300 ${item.borderGlow} hover:-translate-y-1 hover:shadow-md`}
              >
                {/* Top hairline ambient glow */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-sm font-bold tracking-widest ${item.indicatorColor}`}>
                      {item.number}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl font-semibold text-ink leading-snug group-hover:text-copper transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs font-mono text-muted">
                  <span>SYSTEM RESILIENCE</span>
                  <Icon size={16} className="text-muted group-hover:text-ink transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Synthesis Anchor Banner */}
        <div className="mt-12 rounded-xl border border-border bg-surface-muted/60 dark:bg-gradient-to-r dark:from-white/[0.03] dark:via-amber-500/[0.04] dark:to-white/[0.03] p-8 sm:p-10 backdrop-blur-md shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-copper">
                CORE PHILOSOPHY
              </p>
              <p className="font-sans text-xl sm:text-2xl font-semibold text-ink">
                Different challenges. Different solutions.
              </p>
              <p className="text-muted text-sm max-w-xl">
                But they all begin with understanding what needs to work better.
              </p>
            </div>
            <a
              href="#what-we-do"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-xs font-mono tracking-wider uppercase text-ink hover:border-copper hover:text-copper transition-all shrink-0 shadow-2xs"
            >
              <span>See How We Engineer</span>
              <span className="text-copper">&rarr;</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
