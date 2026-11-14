import Link from "next/link";
import { Container } from "@/components/layout/container";

export function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="relative py-28 lg:py-36 border-b border-border bg-paper dark:bg-[#07080c] overflow-hidden scroll-mt-20 transition-colors duration-300"
      aria-label="Final Call to Action"
    >
      {/* Background radial illumination */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-copper/15 via-orange-500/10 to-transparent blur-[160px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="relative rounded-3xl border border-border bg-surface dark:bg-[#0b0d14]/90 p-10 sm:p-16 lg:p-20 backdrop-blur-2xl shadow-xl overflow-hidden text-center max-w-4xl mx-auto">
          {/* Top flare accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-copper to-transparent opacity-90" />

          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-copper/30 bg-copper/10 mx-auto shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-widest text-copper dark:text-amber-300">
                NEXT STEPS
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.08] text-balance">
              Let&apos;s build something that works better.
            </h2>

            <div className="space-y-3 text-base sm:text-lg text-muted leading-relaxed">
              <p className="font-medium text-ink">
                A new idea. A complicated workflow. Software that needs a fresh start.
              </p>
              <p className="text-muted/80 text-sm sm:text-base">
                Whatever brought you here, we&apos;d be glad to understand the challenge and explore the right way forward.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              {/* Primary CTA */}
              <Link
                href="/contact"
                style={{ color: "#ffffff" }}
                className="relative group inline-flex items-center justify-center px-8 py-4 rounded-xl text-xs sm:text-sm font-mono font-medium tracking-wider uppercase bg-forest dark:bg-white/[0.04] border border-forest dark:border-amber-500/50 hover:bg-forest-hover dark:hover:border-amber-400 transition-all duration-300 shadow-md dark:shadow-[0_0_25px_rgba(245,158,11,0.25)]"
              >
                <div
                  className="pointer-events-none absolute -top-[1px] left-1/2 -translate-x-1/2 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-95 group-hover:w-full transition-all duration-300 hidden dark:block"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center gap-2.5" style={{ color: "#ffffff" }}>
                  Start a Conversation
                </span>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-mono font-medium tracking-wider uppercase text-ink bg-surface border border-border hover:border-copper hover:text-copper transition-all shadow-2xs"
              >
                <span>Discuss a Project</span>
                <span className="text-copper">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
