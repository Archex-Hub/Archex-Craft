import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { InteractiveNeedDiagram } from "@/components/sections/interactive-need-diagram";
import { ContentRail } from "@/components/sections/content-rail";
import { EngineeringAtlas } from "@/components/home/engineering-atlas/EngineeringAtlas";
import type { HomepageContent } from "@/lib/content/repository";

const corePillars = [
  {
    number: "01",
    title: "Build digital products",
    tagline: "From concept to production-grade software",
    description:
      "We design and engineer browser-based applications, SaaS platforms, and mobile products built to scale. Every product begins with clear domain boundaries, testable architecture, and a maintainable path to market.",
    capabilities: [
      "Custom web and SaaS applications",
      "Native iOS and Android mobile software",
      "Modular design systems and frontend architecture",
      "API gateways and secure database foundations"
    ]
  },
  {
    number: "02",
    title: "Connect AI to real workflows",
    tagline: "Practical intelligence without opaque decisions",
    description:
      "We bring artificial intelligence directly into the tools and business processes your team already depends on. We engineer context pipelines, automated data extraction, and natural-language capabilities with strict human review.",
    capabilities: [
      "AI-integrated operational software",
      "Document processing and knowledge extraction",
      "Context and retrieval-augmented pipelines (RAG)",
      "Evaluation benchmarks and safety guardrails"
    ]
  },
  {
    number: "03",
    title: "Modernize software in use",
    tagline: "Upgrade systems without the rewrite reflex",
    description:
      "We stabilize, decouple, and incrementally improve legacy software that businesses cannot afford to take offline. We improve performance, security, and developer velocity without the cost and risk of a total rewrite.",
    capabilities: [
      "Legacy codebase assessment and risk audit",
      "Incremental architecture decoupling",
      "Zero-downtime database and cloud migration",
      "Automated test coverage and observability"
    ]
  }
];

export default function HomePageClient({ content }: { content: HomepageContent }) {
  // Prepare featured services for the ContentRail with universal catalogue link
  const serviceRailItems = (content.services || []).slice(0, 6).map((item) => ({
    eyebrow: item.category || "Capability",
    title: item.title,
    body: item.summary,
    href: "/services",
    meta: "Explore in catalogue"
  }));

  return (
    <div className="home-page">
      {/* ─── Section A: Signature Hero with Engineering Atlas ──────────── */}
      <section className="home-hero" aria-label="Hero">
        <Container className="home-hero-grid">
          <div className="home-hero-copy">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              <span>DIGITAL PRODUCTS</span>
              <span className="hero-eyebrow-sep" aria-hidden="true">·</span>
              <span>AI</span>
              <span className="hero-eyebrow-sep" aria-hidden="true">·</span>
              <span>SOFTWARE ENGINEERING</span>
            </div>

            <h1 className="atlas-hero-title">
              Build what’s next.
              <br />
              <em>Improve what already works.</em>
            </h1>

            <p className="hero-lead-text">
              We design and build digital products, bring AI into the workflows your team already
              uses, and modernize the software your business depends on.
            </p>

            <div className="home-actions">
              <Button href="/start-project">Start a project</Button>
              <Link className="home-text-link" href="https://studio.archexweb.in"
                target="_blank"
                rel="noopener noreferrer">
                Explore our work <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* Architectural metadata tags */}
            <div className="hero-meta-bar" aria-hidden="true">
              <div className="hero-meta-item">
                <span className="meta-label">01 / DISCIPLINE</span>
                <span className="meta-value">Product Engineering</span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-label">02 / WORKFLOWS</span>
                <span className="meta-value">Human-in-the-Loop AI</span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-label">03 / CONTINUITY</span>
                <span className="meta-value">Risk-Free Modernization</span>
              </div>
            </div>
          </div>

          {/* Signature 3D / Architectural Hero Atlas */}
          <div className="hero-atlas-container">
            <EngineeringAtlas />
          </div>
        </Container>
      </section>

      {/* ─── Section B: What Archex Craft Actually Does (Three Core Pillars) ─ */}
      <Section className="home-section home-pillars-section">
        <Container>
          <div className="home-section-heading">
            <h2>Three engineering outcomes. One consistent standard.</h2>
          </div>

          <div className="home-pillars-grid">
            {corePillars.map((pillar) => (
              <article key={pillar.number} className="home-pillar-card">
                <div className="pillar-header">
                  <span className="pillar-index">{pillar.number}</span>
                  <span className="pillar-tagline">{pillar.tagline}</span>
                </div>
                <h3>{pillar.title}</h3>
                <p className="pillar-description">{pillar.description}</p>

                <ul className="pillar-capabilities" aria-label={`Key capabilities for ${pillar.title}`}>
                  {pillar.capabilities.map((cap) => (
                    <li key={cap}>
                      <CheckCircle2 size={15} className="pillar-check-icon" aria-hidden="true" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── Section C: Business Situations (Preserved Need Explorer) ───── */}
      <section className="home-section" id="needs">
        <Container>
          <div className="home-section-heading">
            <h2>Where does your software challenge begin?</h2>
          </div>
          <InteractiveNeedDiagram />
        </Container>
      </section>

      {/* ─── Featured Capabilities Rail ─────────────────────────────── */}
      <Section className="home-section home-capabilities-section">
        <Container>
          {serviceRailItems.length > 0 ? (
            <ContentRail
              eyebrow="FEATURED CAPABILITIES"
              title="Explore engineering specialties"
              description="Browse active capabilities across web platforms, intelligent workflows, and system infrastructure."
              viewAllHref="/services"
              viewAllLabel="View full service catalogue"
              items={serviceRailItems}
            />
          ) : null}
        </Container>
      </Section>

      {/* ─── Delivery Methodology Teaser ────────────────────────────── */}
      <Section className="home-section home-how-it-works-teaser">
        <Container>
          <div className="how-it-works-card">
            <span className="section-eyebrow">DELIVERY METHODOLOGY</span>
            <h2 className="how-it-works-heading">How engineering happens.</h2>
            <p className="how-it-works-lead">
              From first conversation to long-term operational health, our structured four-stage
              delivery model guarantees technical clarity, accountability, and disciplined execution.
            </p>
            <div className="how-it-works-action">
              <Link href="/how-we-work" className="home-text-link">
                <span>Explore how we work</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Section I: High-Conversion Closing Invitation ────────────── */}
      <section className="home-contact">
        <Container className="home-contact-inner">
          <div className="contact-invite-copy">
            <span className="contact-eyebrow">NEXT STEPS</span>
            <h2>Have a better way to build in mind?</h2>
            <p>
              Whether you are developing a new digital product, integrating AI into your team’s
              workflows, or stabilizing software your business depends on, let’s discuss what is
              difficult and build the right solution.
            </p>
          </div>
          <div className="home-contact-actions">
            <Button href="/start-project" variant="secondary">
              Start a project
            </Button>
            <Link href="/contact" className="home-light-link">
              Contact Archex Craft <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
