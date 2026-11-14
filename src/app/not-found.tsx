import Link from "next/link";
import { ArrowRight, Compass, Home, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-paper py-24 sm:py-32 border-b border-border">
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

      <Container className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-copper">
          <span>404 · PAGE NOT FOUND</span>
        </div>

        <h1 className="mt-5 font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink text-balance">
          This page does not exist or has been removed.
        </h1>

        <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted">
          The requested URL may be outdated, unpublished, or mistyped. Our core engineering services,
          delivery standards, and direct consultation paths remain available below.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="button-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold shadow-[0_8px_20px_rgba(17,28,46,0.18)] ring-1 ring-forest/15 transition duration-200 hover:-translate-y-px active:translate-y-0"
          >
            <Home size={15} aria-hidden="true" />
            <span>Return to homepage</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>

          <Link
            href="/services"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-2xs transition-colors hover:border-forest hover:bg-surface-muted"
          >
            <Compass size={15} className="text-copper" aria-hidden="true" />
            <span>Explore services catalogue</span>
          </Link>
        </div>

        {/* Quick Contact Link */}
        <div className="mt-12 border-t border-border/80 pt-6">
          <p className="text-xs text-muted">
            Looking for something specific?{" "}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 font-semibold text-forest hover:underline"
            >
              <Mail size={13} />
              <span>Contact our solutions engineers</span>
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
