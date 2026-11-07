import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { MotionViewport } from "@/components/ui/motion-viewport";
import { InteractiveNeedDiagram } from "@/components/sections/interactive-need-diagram";
import type { HomepageContent } from "@/lib/content/repository";

const helpLinks = [
  {
    title: "Products and apps",
    body: "Explore published information about product, mobile app and custom software development.",
    href: "/services/mvp-development",
    link: "Explore product development information"
  },
  {
    title: "Business software",
    body: "See the current catalogue of software topics for tools used in day-to-day business work.",
    href: "/services/web-application-development",
    link: "Explore business software information"
  },
  {
    title: "Websites and online stores",
    body: "Find published website, content management and ecommerce information in the service catalogue.",
    href: "/services/custom-website-development",
    link: "Website development information",
    secondHref: "/services/ecommerce-development",
    secondLink: "Ecommerce information"
  },
  {
    title: "Manual or disconnected work",
    body: "Related software and AI pages may help frame the question. The situation alone does not confirm a particular service or integration.",
    href: "/ai-solutions",
    link: "Explore related information"
  },
  {
    title: "Software already in use",
    body: "Modernization information covers assessment and possible incremental change to existing software.",
    href: "/modernization",
    link: "Explore modernization"
  }
];

const processSteps = [
  {
    title: "Describe the situation",
    body: "Start with what is difficult, repeated or changing. A technology choice is not required."
  },
  {
    title: "Consider the setting",
    body: "The people, tools, goals and constraints already in place help shape what may be relevant."
  },
  {
    title: "Discuss a possible direction",
    body: "Review relevant information and discuss what may fit. Scope and arrangements depend on the situation."
  }
];

export default function HomePageClient({ content }: { content: HomepageContent }) {
  const publishedInsights = content.insights.slice(0, 2);

  return (
    <div className="home-page">
      <section className="home-hero">
        <Container className="home-hero-grid">
          <div className="home-hero-copy">
            <h1>
              Start with the work.
              <br />
              <em>And explore other services.</em>
            </h1>
            <p>
              Archex Web helps businesses explore software problems, from a new product idea to the
              tools and systems already part of everyday work. You can begin with the problem, even
              if you do not know the technical answer.
            </p>
            <div className="home-actions">
              <Button href="#needs">Find a place to start</Button>
              <Link className="home-text-link" href="/contact">
                Tell us what is difficult <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <MotionViewport
            className="hero-orbit"
            aria-label="An illustrative view of work, tools and questions"
          >
            <div className="hero-orbit-ring hero-orbit-ring-one">
              <span className="hero-orbit-signal" aria-hidden="true" />
            </div>
            <div className="hero-orbit-ring hero-orbit-ring-two" />
            <svg viewBox="0 0 520 420" role="img" aria-labelledby="hero-art-title hero-art-desc">
              <title id="hero-art-title">Work, tools and possible next steps</title>
              <desc id="hero-art-desc">
                Three illustrative interface panels connect everyday work with the tools around it
                and a question to explore.
              </desc>
              <path
                className="hero-connector"
                d="M146 184 C176 184 176 138 204 138 M328 138 C356 138 350 184 378 184"
              />
              <rect
                className="hero-node hero-node-main"
                x="40"
                y="132"
                width="108"
                height="104"
                rx="3"
              />
              <rect className="hero-node" x="204" y="78" width="124" height="120" rx="3" />
              <rect
                className="hero-node hero-node-accent"
                x="378"
                y="132"
                width="108"
                height="104"
                rx="3"
              />
              <path
                className="hero-node-detail hero-node-detail-main"
                d="M59 161h48m-48 13h36m-36 13h42m-42 13h26"
              />
              <path
                className="hero-node-detail"
                d="M225 108h78m-78 13h55m-55 13h67m-67 13h48m-48 13h61"
              />
              <path className="hero-node-detail" d="M397 162h70m-70 13h52m-52 13h61m-61 13h35" />
              <circle className="hero-panel-pin" cx="225" cy="94" r="3" />
              <circle className="hero-panel-pin" cx="236" cy="94" r="3" />
              <circle className="hero-panel-pin" cx="247" cy="94" r="3" />
              <text x="94" y="270" textAnchor="middle">
                the work
              </text>
              <text x="266" y="230" textAnchor="middle">
                tools around it
              </text>
              <text x="432" y="270" textAnchor="middle">
                a question
              </text>
            </svg>
            <span className="hero-art-note">A business-first view · illustrative</span>
          </MotionViewport>
        </Container>
      </section>

      <section className="home-section" id="needs">
        <Container>
          <div className="home-section-heading">
            <h2>What would you like to make easier?</h2>
            <p>
              Choose a situation to explore. These are ways into a conversation, not promises that a
              particular service is available.
            </p>
          </div>
          <InteractiveNeedDiagram />
        </Container>
      </section>

      <section className="home-context-band">
        <Container className="home-context-grid">
          <h2>The right direction depends on your situation.</h2>
          <div>
            <p>
              Useful options depend on what is happening, which tools and people are involved, and
              what you hope to change. You can explain the problem in everyday language; choosing a
              technology can come later.
            </p>
            <Link href="/how-we-work" className="home-light-link">
              Read how the process is described <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <Section className="home-section">
        <Container>
          <div className="home-section-heading">
            <h2>Follow the thread that fits your question.</h2>
            <p>
              These links lead to existing published information. A page describes a topic; it does
              not by itself confirm current availability or scope.
            </p>
          </div>
          <MotionViewport className="home-scroll-story">
            <div className="home-help-list">
              {helpLinks.map((item, index) => (
                <article className="home-help-item" key={item.title}>
                  <span className="home-help-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  <div className="home-help-links">
                    <Link href={item.href} aria-label={`${item.link}: ${item.title}`}>
                      {item.link} <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                    {"secondHref" in item && item.secondHref && item.secondLink ? (
                      <Link href={item.secondHref} aria-label={`${item.secondLink}: ${item.title}`}>
                        {item.secondLink} <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </MotionViewport>
        </Container>
      </Section>

      <Section className="home-section">
        <Container>
          <div className="home-section-heading">
            <h2>Working together starts by understanding the need.</h2>
            <p>
              The published process describes understanding a problem, planning relevant work,
              building and validating, then considering what comes next.
            </p>
          </div>
          <MotionViewport className="home-scroll-story">
            <div className="home-process-list">
              {processSteps.map((step, index) => (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </MotionViewport>
          <div className="home-process-links">
            <Link href="/how-we-work">
              How we work <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>

      {publishedInsights.length > 0 ? (
        <Section className="home-section home-insights">
          <Container>
            <div className="home-section-heading">
              <h2>Keep following the question.</h2>
              <p>Published reading from the existing insights collection.</p>
            </div>
            <div className="home-insight-list">
              {publishedInsights.map((item) => (
                <Link href={item.href} key={item.slug} className="home-insight-link">
                  <span>
                    <small>{item.category || "Insight"}</small>
                    <strong>{item.title}</strong>
                    <span>{item.summary}</span>
                  </span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <Link className="home-secondary-link" href="/insights">
              Browse all insights <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Container>
        </Section>
      ) : null}

      <Section className="home-section home-faq">
        <Container>
          <div className="home-section-heading">
            <h2>A question before you begin.</h2>
          </div>
          <details>
            <summary>Do I need to know which technology I need?</summary>
            <p>
              No. You can start by describing what is happening. The relevant direction depends on
              the context and goals.
            </p>
          </details>
        </Container>
      </Section>

      <section className="home-contact">
        <Container className="home-contact-inner">
          <div>
            <h2>Start with the part you know.</h2>
            <p>
              Tell us what is difficult or what you hope to change. You do not need to choose a
              service or technology first.
            </p>
          </div>
          <div className="home-contact-actions">
            <Button href="/contact" variant="secondary">
              Start a conversation
            </Button>
            <Link href="/start-project" className="home-light-link">
              Already have a project in mind? <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
