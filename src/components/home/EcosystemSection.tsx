import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowUpRight, Cpu, Globe, Palette } from "lucide-react";

export function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative py-20 lg:py-28 border-b border-border bg-paper scroll-mt-20 transition-colors duration-300"
      aria-label="The Archex Ecosystem"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface w-fit shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                THE ARCHEX ECOSYSTEM
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
              How Studio and Craft connect.
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Studio defines the brand and designs the experience. Craft turns designs and requirements into working technology. Both can collaborate on a project, or work independently.
            </p>
          </div>

          <div className="shrink-0 md:pb-1">
            <a
              href="https://www.archexweb.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Archex parent site (opens in a new tab)"
              className="group inline-flex items-center gap-3.5 rounded-xl border border-border bg-surface px-5 py-3 shadow-2xs transition-all duration-300 hover:border-forest hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-muted text-ink group-hover:text-forest transition-colors">
                <Globe size={16} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-ink group-hover:text-forest transition-colors">
                    archexweb.in
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-muted group-hover:text-forest transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Archex Craft Card (Current Division) */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-forest/30 bg-surface p-6 sm:p-8 lg:p-10 shadow-2xs transition-all duration-300 hover:border-forest min-w-0">
            <div className="space-y-6 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-forest/20 bg-forest-subtle text-forest">
                    <Cpu size={20} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] sm:text-xs text-forest uppercase tracking-widest block font-medium truncate">
                      TECHNOLOGY & SYSTEMS
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-ink uppercase tracking-wider truncate">
                      ARCHEX CRAFT
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-forest rounded-full border border-forest/20 px-2.5 py-0.5 bg-forest-subtle font-medium shrink-0">
                  CURRENT PRACTICE
                </span>
              </div>

              <div className="space-y-3">
                <p className="font-sans text-base sm:text-lg font-medium text-ink leading-snug">
                  Turning designs and requirements into working technology.
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  We build websites, web applications, custom business software, and workflow integrations with modular architectures and automated test coverage.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Websites", "Web Applications", "Custom Software", "AI & Integrations"].map((tag) => (
                  <span key={tag} className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href="/services"
                className="group/btn inline-flex items-center justify-between w-full rounded-lg border border-forest/30 bg-forest-subtle px-5 py-3 text-xs font-mono font-medium tracking-wider uppercase text-forest hover:bg-forest hover:text-white transition-all shadow-2xs"
              >
                <span>Explore Capabilities Directory</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Archex Studio Card */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-2xs transition-all duration-300 hover:border-forest min-w-0">
            <div className="space-y-6 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-muted text-ink group-hover:text-forest transition-colors">
                    <Palette size={20} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] sm:text-xs text-muted uppercase tracking-widest block font-medium truncate">
                      CREATIVE & BRAND
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-ink uppercase tracking-wider truncate">
                      ARCHEX STUDIO
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-muted rounded-full border border-border px-2.5 py-0.5 shrink-0">
                  SISTER PRACTICE
                </span>
              </div>

              <div className="space-y-3">
                <p className="font-sans text-base sm:text-lg font-medium text-ink leading-snug">
                  Defining the brand and designing the experience.
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  Studio shapes brand identities, visual languages, design systems, and user journeys that communicate clearly and establish market authority.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Brand Identity", "Design Systems", "UI/UX Design", "Art Direction"].map((tag) => (
                  <span key={tag} className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-mono text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <a
                href="https://studio.archexweb.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-between w-full rounded-lg border border-border bg-surface-muted px-5 py-3 text-xs font-mono font-medium tracking-wider uppercase text-ink hover:border-forest hover:text-forest transition-all shadow-2xs"
              >
                <span>Visit Archex Studio</span>
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
