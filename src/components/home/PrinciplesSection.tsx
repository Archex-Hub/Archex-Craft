import { Container } from "@/components/layout/container";
import { Code2, KeyRound, ShieldCheck, FileCheck } from "lucide-react";

const expectations = [
  {
    number: "01",
    title: "DIRECT SENIOR BUILDERS",
    description:
      "You work directly with experienced solutions engineers who understand systems and write the production code. No middle management filters or junior handoffs.",
    icon: Code2,
  },
  {
    number: "02",
    title: "100% CODE & IP OWNERSHIP",
    description:
      "Full intellectual property, clean Git repositories, and complete deployment control belong to you from day one. Zero vendor lock-in and zero hostage codebases.",
    icon: KeyRound,
  },
  {
    number: "03",
    title: "TESTED & MODULAR ARCHITECTURE",
    description:
      "Type-safe foundations, automated test coverage, and clear domain boundaries ensure software is stable under production load and straightforward to evolve.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "DELIBERATE DECISIONS & DOCUMENTATION",
    description:
      "Every architecture choice has a documented reason. We write clear documentation, operational runbooks, and handover guides for lasting independence.",
    icon: FileCheck,
  },
];

export function PrinciplesSection() {
  return (
    <section
      id="expectations"
      className="relative py-20 lg:py-28 border-b border-border bg-paper scroll-mt-20 transition-colors duration-300"
      aria-label="What you can expect"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
            What you can expect.
          </h2>
          <p className="text-muted text-base sm:text-lg">
            Engineering isn&apos;t just writing code—it&apos;s establishing reliable, maintainable systems that your team can run with confidence.
          </p>
        </div>

        {/* 4 Editorial Expectations Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {expectations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-8 shadow-2xs transition-all duration-300 hover:border-forest hover:shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-widest text-bronze">
                      STANDARD // {item.number}
                    </span>
                    <Icon size={18} className="text-muted group-hover:text-forest transition-colors" />
                  </div>

                  <h3 className="font-sans text-xl font-bold text-ink tracking-wide group-hover:text-forest transition-colors">
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
