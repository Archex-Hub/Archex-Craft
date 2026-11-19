import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowRight, MessageSquare } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="relative py-24 lg:py-32 border-b border-border bg-paper scroll-mt-20 transition-colors duration-300"
      aria-label="Final Call to Action"
    >
      <Container className="relative z-10">
        <div className="relative rounded-2xl border border-border bg-surface p-10 sm:p-14 lg:p-16 shadow-xs text-center max-w-3xl mx-auto">
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-muted mx-auto shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                START A CONVERSATION
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.1] text-balance">
              Have an idea, a challenge, or software you want to improve?
            </h2>

            <div className="space-y-3 text-base sm:text-lg text-muted leading-relaxed">
              <p>
                Tell us what you&apos;re working on. We&apos;ll help you evaluate the requirement and find the right technical path forward.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-mono font-medium tracking-wider uppercase bg-forest text-white hover:bg-forest-hover transition-colors shadow-2xs"
              >
                <MessageSquare size={16} />
                <span>Tell us about your project</span>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-mono font-medium tracking-wider uppercase text-ink bg-surface border border-border hover:border-forest hover:text-forest transition-colors shadow-2xs"
              >
                <span>Structured Brief</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
