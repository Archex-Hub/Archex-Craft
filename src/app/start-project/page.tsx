import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  FileText,
  Lock,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Start a Project",
  description:
    "Share your project scope, technical requirements, and delivery timeline with our senior engineering team.",
  path: "/start-project"
});

export default function StartProjectPage() {
  return (
    <>
      {/* ───────────────────────────────────────────────────────────────────
          1. HERO SECTION
          ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-14 lg:pb-16 bg-paper">
        {/* Architectural Grid Lines */}
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
              Tell us what you are trying to build, fix, or improve.
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted font-normal">
              Share the business problem, current technical constraints, and what success looks like.
              Our senior engineering team will evaluate your scope and prepare a transparent architecture proposal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#enquiry-form"
                className="button-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold shadow-[0_8px_20px_rgba(17,28,46,0.18)] ring-1 ring-forest/15 transition duration-200 hover:-translate-y-px active:translate-y-0"
              >
                <span>Jump to project brief</span>
                <ArrowDown size={16} aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-ink shadow-2xs transition-colors hover:border-forest hover:bg-surface-muted"
              >
                <span>General question? Use contact form</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border/80 pt-6">
              <div>
                <p className="font-mono text-base font-bold text-copper">&lt; 24h</p>
                <p className="mt-1 text-xs font-semibold text-ink">Technical Audit</p>
                <p className="text-[11px] text-muted">Direct engineering review</p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-copper">100%</p>
                <p className="mt-1 text-xs font-semibold text-ink">Client IP Ownership</p>
                <p className="text-[11px] text-muted">Zero proprietary lock-in</p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-copper">Weekly</p>
                <p className="mt-1 text-xs font-semibold text-ink">Demo Iterations</p>
                <p className="text-[11px] text-muted">Continuous delivery</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          2. PROJECT SCOPE & FORM SECTION
          ─────────────────────────────────────────────────────────────────── */}
      <Section className="bg-surface/50 border-b border-border py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          {/* Left Column: What to include guidelines & expectations */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-olive/30 bg-olive/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-olive">
              <span>Scope Preparation</span>
            </div>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              What helps us understand your project.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted font-normal">
              You do not need an exhaustive specification document. A high-level description of what you are
              trying to achieve and the known constraints is plenty for our team to begin shaping the work.
            </p>

            {/* What to include checklist */}
            <div className="mt-8 space-y-3.5">
              {[
                {
                  label: "The Business Problem",
                  desc: "What is currently broken, slow, or missing? What business outcome does this software solve?"
                },
                {
                  label: "Existing Technical Context",
                  desc: "Is this a greenfield application, or are we integrating with an existing codebase, database, or API?"
                },
                {
                  label: "Timeline & Key Checkpoints",
                  desc: "Do you have a strict launch date, upcoming funding milestone, or preferred delivery cadence?"
                },
                {
                  label: "Success Criteria",
                  desc: "How will your team judge whether the software was delivered successfully?"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/80 bg-surface dark:bg-[#111c2e] p-4 shadow-2xs"
                >
                  <div className="flex items-center gap-2 font-sans text-sm font-bold text-ink">
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted leading-relaxed pl-6">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Security note */}
            <div className="mt-8 rounded-xl border border-border/80 bg-paper/60 p-4 text-xs text-muted leading-relaxed">
              <strong className="text-ink font-semibold">Security Note: </strong>
              Please do not include server passwords, database credentials, or sensitive production secrets in this form.
              We establish secure vaults and access protocols once our collaboration begins.
            </div>
          </div>

          {/* Right Column: Full Enquiry Form */}
          <div className="w-full">
            <EnquiryForm id="enquiry-form" />
          </div>
        </Container>
      </Section>
    </>
  );
}
