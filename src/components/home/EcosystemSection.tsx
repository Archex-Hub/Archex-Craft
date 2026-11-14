import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowUpRight, Cpu, Globe, Palette } from "lucide-react";

export function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative py-24 lg:py-32 border-b border-border bg-surface/50 dark:bg-[#08090f] overflow-hidden scroll-mt-20 transition-colors duration-300"
      aria-label="The Archex Ecosystem"
    >
      {/* Background glow lines */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/4 w-[600px] h-[300px] bg-gradient-to-tr from-copper/10 via-purple-500/5 to-transparent blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-widest text-copper">
                THE ARCHEX ECOSYSTEM
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
              Different disciplines.
              <br />
              A shared commitment to good work.
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Archex brings together complementary capabilities across technology and creative work.
            </p>
          </div>

          <div className="shrink-0 md:pb-1">
            <a
              href="https://www.archexweb.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Archex parent site (opens in a new tab)"
              className="group inline-flex items-center gap-3.5 rounded-2xl border border-border bg-surface px-5 py-3.5 shadow-2xs transition-all duration-300 hover:border-copper/60 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted/60 text-ink group-hover:border-copper/40 group-hover:bg-copper/10 group-hover:text-copper transition-colors">
                <Globe size={18} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-ink group-hover:text-copper transition-colors">
                    archexweb.in
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-muted group-hover:text-copper transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <span className="text-[11px] font-mono text-muted block">
                  Archex Parent Site
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Two Ecosystem Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Archex Craft Card */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-copper/40 bg-surface dark:bg-[#0c0d15]/90 p-8 sm:p-10 backdrop-blur-xl hover:border-copper transition-all duration-300 hover:-translate-y-1 shadow-sm">
            {/* Top Highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-copper to-transparent opacity-80" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-copper/30 bg-copper/10 text-copper">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-copper uppercase tracking-widest block">
                      TECHNOLOGY & SYSTEMS
                    </span>
                    <h3 className="font-sans text-2xl font-bold text-ink uppercase tracking-wider">
                      ARCHEX CRAFT
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-copper rounded-full border border-copper/30 px-2.5 py-0.5 bg-copper/10">
                  CURRENT
                </span>
              </div>

              <div className="space-y-3">
                <p className="font-sans text-lg font-medium text-ink leading-snug">
                  Engineering the systems behind digital experiences.
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  We focus on software, applications, integrations and the technical foundations that help businesses operate and grow.
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted">
                  Custom Software
                </span>
                <span className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted">
                  AI Integration
                </span>
                <span className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted">
                  Modernization
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href="/services"
                className="group/btn inline-flex items-center justify-between w-full rounded-xl border border-copper/30 bg-copper/10 px-5 py-3 text-xs font-mono font-medium tracking-wider uppercase text-copper hover:bg-copper/20 hover:border-copper transition-all"
              >
                <span>Explore Archex Craft</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Archex Studio Card */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface dark:bg-[#0c0d15]/90 p-8 sm:p-10 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-1 shadow-sm">
            {/* Top Purple Highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-80 transition-opacity" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Palette size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-purple-600 dark:text-purple-400 uppercase tracking-widest block">
                      CREATIVE & BRAND
                    </span>
                    <h3 className="font-sans text-2xl font-bold text-ink uppercase tracking-wider">
                      ARCHEX STUDIO
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-muted rounded-full border border-border px-2.5 py-0.5">
                  PARTNER
                </span>
              </div>

              <div className="space-y-3">
                <p className="font-sans text-lg font-medium text-ink leading-snug">
                  Exploring the creative side of digital experiences.
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  Discover the design-led work and creative projects from another part of the Archex ecosystem.
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted">
                  Brand Identity
                </span>
                <span className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted">
                  UI/UX Systems
                </span>
                <span className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted">
                  Art Direction
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <a
                href="https://studio.archexweb.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-between w-full rounded-xl border border-border bg-surface-muted/50 px-5 py-3 text-xs font-mono font-medium tracking-wider uppercase text-ink hover:border-purple-400/80 hover:bg-purple-500/10 transition-all shadow-2xs"
              >
                <span>Explore Archex Studio</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
