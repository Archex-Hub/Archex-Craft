import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  FileText,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ContactFaq } from "@/components/sections/contact-faq";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Direct engineering consultation for new digital products, AI integrations, and software modernization.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      {/* ───────────────────────────────────────────────────────────────────
          1. HERO SECTION (High Conversion Hook + Fast Direct Access to Form)
          ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-14 lg:pb-16 bg-paper">
        {/* Subtle Architectural Grid Lines */}
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

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="mt-5 font-serif text-[clamp(2.75rem,5.5vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink text-balance">
              Let&apos;s discuss what you want to build or change.
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted font-normal">
              Whether you are designing a new digital product, introducing AI into an active workflow,
              or stabilizing software your team depends on, our senior solutions engineers are ready to
              review your challenge and advise on the right technical path.
            </p>

            {/* Direct Action Buttons for Immediate CTR */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#enquiry-form"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3 text-sm font-semibold text-white shadow-2xs hover:bg-forest-hover transition-colors"
              >
                <span>Jump to enquiry form</span>
                <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@archexweb.in"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-2xs transition-colors hover:border-forest hover:bg-surface-muted"
              >
                <span>Direct email: hello@archexweb.in</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Trust Highlights Bar */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border/80 pt-6">
              <div>
                <p className="font-mono text-base font-bold text-forest">&lt; 24h</p>
                <p className="mt-1 text-xs font-semibold text-ink">Response SLA</p>
                <p className="text-[11px] text-muted">Direct technical reply</p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-forest">100%</p>
                <p className="mt-1 text-xs font-semibold text-ink">Senior Builders</p>
                <p className="text-[11px] text-muted">Zero sales filters</p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-forest">Mutual</p>
                <p className="mt-1 text-xs font-semibold text-ink">NDA Ready</p>
                <p className="text-[11px] text-muted">Complete confidentiality</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          2. MAIN ENQUIRY FORM & DIRECT CHANNELS SECTION
          ─────────────────────────────────────────────────────────────────── */}
      <Section className="bg-surface/50 border-b border-border py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          {/* Left Column: Context, Ways We Help & Direct Channels */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-olive/30 bg-olive/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-olive">
              <span>How We Can Help</span>
            </div>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              Start the conversation.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted font-normal">
              Share an overview of what you are trying to accomplish, your current system context, or
              any general questions. We do not use aggressive sales tactics—every response is written
              by an architect focused on technical feasibility.
            </p>

            {/* 3 Core Engagement Angles */}
            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Code2,
                  title: "Digital Product Engineering",
                  desc: "Design and build web applications, SaaS platforms, and mobile apps built to scale without early technical debt."
                },
                {
                  icon: Sparkles,
                  title: "AI & Workflow Integration",
                  desc: "Connect deterministic AI pipelines, document processing, and vector search to existing business software."
                },
                {
                  icon: Workflow,
                  title: "Software Modernization",
                  desc: "Untangle legacy codebases, decouple monoliths, and improve performance without high-risk total rewrites."
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 rounded-xl border border-border/80 bg-surface dark:bg-[#111c2e] p-4 shadow-2xs"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-copper/30 bg-copper/10 text-copper">
                      <Icon size={17} />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-bold text-ink">{item.title}</h3>
                      <p className="mt-1 text-xs text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Structured Project Brief Card */}
            <div className="mt-8 rounded-xl border border-forest/30 bg-forest/5 p-5">
              <h3 className="font-sans text-sm font-bold text-ink">
                Have a detailed technical scope or RFP?
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                If you already have budget parameters, timeline targets, and defined architectural requirements:
              </p>
              <Link
                href="/start-project"
                className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-hover transition-colors"
              >
                <span>Share a structured project brief</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Direct Email Channels & Privacy Contacts */}
            <div className="mt-8 rounded-xl border border-border/80 bg-surface dark:bg-[#111c2e] p-5 shadow-2xs">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                Direct Communication Channels
              </p>
              <ul className="mt-3 space-y-2.5 font-mono text-xs">
                <li className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-muted">General &amp; Projects:</span>
                  <a
                    href="mailto:hello@archexweb.in"
                    className="font-semibold text-forest hover:underline"
                  >
                    hello@archexweb.in
                  </a>
                </li>
                <li className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-muted">Privacy &amp; DPDP Act:</span>
                  <a
                    href="mailto:privacy@archexweb.in"
                    className="font-semibold text-forest hover:underline"
                  >
                    privacy@archexweb.in
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted">Grievance Officer:</span>
                  <a
                    href="mailto:grievance@archexweb.in"
                    className="font-semibold text-forest hover:underline"
                  >
                    grievance@archexweb.in
                  </a>
                </li>
                <li className="flex items-center justify-between border-t border-border/60 pt-2">
                  <span className="text-muted">Central Desk:</span>
                  <a
                    href="https://www.archexweb.in/contact?practice=craft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-forest hover:underline flex items-center gap-1"
                  >
                    <span>archexweb.in/contact</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2 text-[11px] font-mono text-muted">
                <Clock size={13} className="text-copper shrink-0" />
                <span>Operating hours: Monday – Friday, 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Beautified Enquiry Form */}
          <div className="w-full">
            <EnquiryForm compact id="enquiry-form" />
          </div>
        </Container>
      </Section>

      {/* ───────────────────────────────────────────────────────────────────
          3. WHAT HAPPENS NEXT (Process Transparency)
          ─────────────────────────────────────────────────────────────────── */}
      <section className="border-b border-border py-16 sm:py-20 bg-paper">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-copper">
              <span>Clear Expectations</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              What happens after you reach out.
            </h2>
            <p className="mt-3 text-base text-muted leading-relaxed">
              We respect your time. Here is our step-by-step intake process from enquiry to kickoff.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Engineering Audit",
                desc: "Within 24 hours, a senior engineer reviews your problem statement, tech stack context, and notes key feasibility factors.",
                timing: "Within 24 Hours"
              },
              {
                step: "02",
                title: "Technical Discovery",
                desc: "A focused 30-minute discussion with an architect to dive into constraints, dependencies, and business outcomes—zero sales pitch.",
                timing: "Day 2 – 3"
              },
              {
                step: "03",
                title: "Actionable Proposal",
                desc: "We provide an explicit architecture boundary, proposed team composition, sprint milestones, and transparent cost estimates.",
                timing: "Day 4 – 5"
              }
            ].map((phase) => (
              <div
                key={phase.step}
                className="flex flex-col justify-between rounded-2xl border border-border/80 bg-surface dark:bg-[#111c2e] p-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border/70 pb-3">
                    <span className="font-mono text-xs font-bold text-copper">{phase.step}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-semibold">
                      {phase.timing}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-ink">{phase.title}</h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-muted leading-relaxed">{phase.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={14} />
                  <span>Guaranteed milestone</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          4. CONTACT & CONSULTATION FAQ
          ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface/50">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-olive/30 bg-olive/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-olive">
              <span>FAQ</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              Frequently asked questions.
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted">
              Everything you need to know about initiating a conversation, NDAs, and our consultation model.
            </p>
          </div>

          <ContactFaq />
        </Container>
      </section>
    </>
  );
}
