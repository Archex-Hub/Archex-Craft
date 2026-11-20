import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Zap
} from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { ContentRail, type ContentRailItem } from "@/components/sections/content-rail";
import { ServiceCategorySlideshow } from "@/components/sections/service-category-slideshow";
import { ServiceDirectory } from "@/components/sections/service-directory";
import { ServicesFaq } from "@/components/sections/services-faq";
import { CTA } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import {
  getEntriesAsync,
  getPublishedServiceCategories
} from "@/lib/content/repository";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Software engineering for products, internal applications, AI workflows, and existing systems.",
  path: "/services"
});

export default async function ServicesPage() {
  const categories = await getPublishedServiceCategories();
  const catalogRailItems: ContentRailItem[] = categories.flatMap((cat) =>
    cat.services.map((svc) => ({
      eyebrow: cat.name,
      title: svc.title,
      body: svc.summary,
      href: "/start-project",
      meta: svc.capabilities?.[0]?.replace(/\.$/, "") || "Consult on this service"
    }))
  );

  return (
    <>
      {/* ───────────────────────────────────────────────────────────────────
          1. HERO SECTION (With Naturally Positioned, Balanced Slideshow Card)
          ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border pt-5 pb-10 sm:pt-6 sm:pb-12 lg:pt-7 lg:pb-14 bg-paper">
        {/* Subtle Background Architectural Lines */}
        <div
          className="pointer-events-none absolute inset-0 z-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 divide-x divide-border/20 opacity-50"
          aria-hidden="true"
        >
          <div /><div /><div /><div />
          <div className="hidden sm:block" /><div className="hidden sm:block" />
          <div className="hidden lg:block" /><div className="hidden lg:block" />
          <div className="hidden lg:block" /><div className="hidden lg:block" />
          <div className="hidden lg:block" /><div className="hidden lg:block" />
        </div>

        <Container className="relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          {/* Left Column: Headline, Narrative & Proof Badges */}
          <div>

            <h1 className="mt-5 font-serif text-[clamp(2.5rem,5vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.03em] text-ink text-balance">
              Software capabilities shaped around what you need built.
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted font-normal">
              Whether you need a new website, a custom web application, an automated business system, or AI connected to your existing tools — explore our full engineering capabilities below.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/start-project">
                Discuss a project
              </Button>
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-forest hover:bg-surface-muted shadow-2xs"
              >
                <span>Explore catalogue</span>
                <ArrowDown size={15} />
              </a>
            </div>

            {/* Value Guarantees */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border/80 pt-6">
              <div>
                <p className="font-mono text-base font-bold text-forest">100%</p>
                <p className="mt-1 text-xs font-semibold text-ink">Source &amp; IP Ownership</p>
                <p className="text-[11px] text-muted">Zero lock-in</p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-forest">Direct</p>
                <p className="mt-1 text-xs font-semibold text-ink">Senior Engineers</p>
                <p className="text-[11px] text-muted">No intermediaries</p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-forest">Verified</p>
                <p className="mt-1 text-xs font-semibold text-ink">Automated Testing</p>
                <p className="text-[11px] text-muted">Tested on every PR</p>
              </div>
            </div>

            {/* Category Quick Jump Chips */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                Solution jump:
              </span>
              {[
                { label: "Websites", slug: "web-cms-development" },
                { label: "Web Apps", slug: "web-cms-development" },
                { label: "Custom Software", slug: "software-development" },
                { label: "AI & ML", slug: "ai-ml-development" },
                { label: "Ecommerce", slug: "ecommerce-development" },
                { label: "Mobile Apps", slug: "mobile-app-development" }
              ].map((chip) => (
                <a
                  key={chip.label}
                  href={`#${chip.slug}`}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-muted transition-all hover:border-forest hover:text-ink shadow-2xs"
                >
                  {chip.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Category Slideshow (Flawlessly Aligned) */}
          <div className="w-full">
            <ServiceCategorySlideshow categories={categories} />
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          2. SERVICE DIRECTORY / CATALOGUE SECTION
          ─────────────────────────────────────────────────────────────────── */}
      <Section id="catalogue" className="bg-surface scroll-mt-12">
        <Container>
          <div className="mb-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-olive/30 bg-olive/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-olive">
              <span>Service Catalogue</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-ink">
              Explore the work behind the categories.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
              Every domain represents deep engineering specializations, backed by senior developers,
              production-tested patterns, and complete code ownership.
            </p>
          </div>
          <ServiceDirectory categories={categories} />
        </Container>
      </Section>

      {/* ───────────────────────────────────────────────────────────────────
          3. PRIMARY SERVICES CONTENT RAIL
          ─────────────────────────────────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <ContentRail
            eyebrow="Primary services"
            title="Choose the kind of help you need."
            description="Explore our complete catalogue of engineering capabilities. Use the live search filter to quickly find specialized services."
            items={catalogRailItems}
            enableSearch={true}
            searchPlaceholder="Filter services (e.g. AI, React, Shopify)..."
          />
        </Container>
      </Section>

      {/* ───────────────────────────────────────────────────────────────────
          4. ENGAGEMENT & DELIVERY MODELS
          ─────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-border py-16 sm:py-20 lg:py-24 bg-surface-muted">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
              <span>HOW WE PARTNER</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              Engagement models structured for clarity.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">
              Choose the collaboration structure that fits your operational timeline and team requirements.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                num: "01",
                title: "Full Product Sprints",
                subtitle: "End-to-end design & build",
                description:
                  "From greenfield concepts to production v1. We handle architecture, full-stack development, automated tests, and launch runbooks with weekly demonstrable increments.",
                deliverables: [
                  "Full system architecture & data schemas",
                  "Frontend & backend application engineering",
                  "Automated CI/CD and production deployment",
                  "Comprehensive team handover & runbooks"
                ],
                bestFor: "Founders launching a new product or teams replacing legacy monoliths."
              },
              {
                num: "02",
                title: "Targeted Capability Integration",
                subtitle: "High-impact workflow enhancements",
                description:
                  "Connect AI capabilities, build custom business automations, integrate third-party APIs, or implement custom commerce funnels within your existing codebase.",
                deliverables: [
                  "System & data integration mapping",
                  "Production-grade API & webhook connections",
                  "Deterministic AI/LLM evaluation pipelines",
                  "Observability alerts & error handling"
                ],
                bestFor: "Businesses wanting to add intelligence or automate workflows without rewrites."
              },
              {
                num: "03",
                title: "Modernization & Code Audit",
                subtitle: "Stabilize and decouple existing software",
                description:
                  "A disciplined engineering assessment to identify performance bottlenecks, tech debt, security vulnerabilities, and create an incremental refactoring path.",
                deliverables: [
                  "Deep-dive codebase & dependency audit",
                  "Decoupling strategy & risk migration plan",
                  "Automated test coverage implementation",
                  "Step-by-step modernization roadmap"
                ],
                bestFor: "Teams struggling with fragile codebases, slow releases, or scaling limits."
              }
            ].map((model) => (
              <div
                key={model.num}
                className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 sm:p-8 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="font-mono text-sm font-bold text-bronze">{model.num}</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                      {model.subtitle}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-bold text-ink">
                    {model.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {model.description}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Key Deliverables:
                    </p>
                    {model.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-ink">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-forest" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border">
                  <p className="text-xs text-muted">
                    <strong className="text-ink font-semibold">Best for: </strong>
                    {model.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          5. ARCHITECTURAL STANDARDS
          ─────────────────────────────────────────────────────────────────── */}
      <section className="border-b border-border py-16 sm:py-20 lg:py-24 bg-paper">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest-subtle px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-forest">
              <ShieldCheck size={14} className="text-forest" />
              <span>Architectural Standards</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              Architectural standards behind what we build.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">
              Reliability is engineered from the first commit. We build resilience directly into system boundaries, type contracts, and automated pipelines.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Code2,
                title: "Defensive Type Safety",
                description:
                  "Strict runtime validation with Zod and TypeScript eliminates silent data contract mismatches between frontend, APIs, and databases.",
                badge: "CONTRACTS FIRST"
              },
              {
                icon: Workflow,
                title: "Automated CI/CD Verification",
                description:
                  "Every commit is verified against Playwright E2E browser journeys, unit suites, and regression checks before touching production.",
                badge: "AUTOMATED SUITES"
              },
              {
                icon: Layers,
                title: "Deterministic State",
                description:
                  "Idempotent APIs, resilient background worker queues, and isolated error boundaries guarantee failures never cascade across features.",
                badge: "FAULT ISOLATION"
              },
              {
                icon: Terminal,
                title: "Observable Telemetry",
                description:
                  "Comprehensive structured logs, APM performance tracking, and health metrics catch and alert on anomalies before clients ever notice.",
                badge: "OBSERVABILITY"
              }
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6 shadow-2xs transition-all duration-300 hover:border-forest"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-wider text-forest font-semibold uppercase px-2 py-0.5 rounded bg-forest-subtle border border-forest/20">
                        {pillar.badge}
                      </span>
                      <Icon size={18} className="text-muted group-hover:text-forest transition-colors" />
                    </div>

                    <h3 className="font-sans text-lg font-bold text-ink">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          6. SERVICES FREQUENTLY ASKED QUESTIONS
          ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-paper">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-olive/30 bg-olive/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-olive">
              <span>FAQ</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              Frequently asked questions.
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted">
              Everything you need to know about our engineering approach, standards, and engagement process.
            </p>
          </div>

          <ServicesFaq />
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          STUDIO DESIGN HANDSHAKE CALLOUT
          ─────────────────────────────────────────────────────────────────── */}
      <section className="py-12 border-t border-border bg-surface-muted/30">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-border bg-surface shadow-2xs">
            <div className="max-w-xl space-y-2">
              <span className="font-mono text-[10px] tracking-widest text-[#9c3e2f] uppercase font-semibold">
                DESIGN &amp; ENGINEERING BOUNDARY
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink">
                Already have design specifications, or starting from scratch?
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Archex Craft builds from existing Figma specs or designs. If your business needs brand strategy, visual identity, or interface design created first, meet <strong>Archex Studio</strong>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://studio.archexweb.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-surface text-xs font-mono font-medium uppercase tracking-wider text-ink hover:border-[#9c3e2f] hover:text-[#9c3e2f] transition-colors"
              >
                <span>Meet Archex Studio</span>
                <span aria-hidden="true">↗</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest text-xs font-mono font-medium uppercase tracking-wider text-white hover:bg-forest-hover transition-colors shadow-2xs"
              >
                <span>Discuss Engineering</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          7. CALL TO ACTION
          ─────────────────────────────────────────────────────────────────── */}
      <CTA />
    </>
  );
}
