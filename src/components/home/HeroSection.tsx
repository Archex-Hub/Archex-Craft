"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { HeroVisual } from "@/components/three/HeroVisual";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-border bg-paper dark:bg-[#07080c] transition-colors duration-300"
      aria-label="Archex Craft Hero"
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 divide-x divide-border/30 opacity-60"
        aria-hidden="true"
      >
        <div />
        <div />
        <div />
        <div />
        <div className="hidden sm:block" />
        <div className="hidden sm:block" />
        <div className="hidden lg:block" />
        <div className="hidden lg:block" />
        <div className="hidden lg:block" />
        <div className="hidden lg:block" />
        <div className="hidden lg:block" />
        <div className="hidden lg:block" />
      </div>

      <Container className="relative z-10 w-full pt-1 pb-12 sm:pt-2 sm:pb-14 lg:pt-3 lg:pb-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 lg:gap-16 min-w-0">
          {/* ── Left Column: Copy & Actions ────────────────────────────── */}
          <div className="flex flex-col space-y-6 lg:space-y-8 max-w-2xl min-w-0">

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.65rem] font-bold tracking-tight text-ink leading-[1.08] text-balance">
              We build websites, applications and software for real business needs.
            </h1>

            {/* Subhead & Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-muted leading-relaxed font-normal">
              <p>
                From a business website to a custom software system, we help turn requirements into reliable digital solutions.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-1">
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-lg text-xs sm:text-sm font-mono font-medium tracking-wider uppercase bg-forest text-white hover:bg-forest-hover transition-colors shadow-2xs text-center"
              >
                Discuss what you need
              </Link>

              {/* Secondary CTA */}
              <a
                href="#what-we-build"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 sm:px-5 py-3 text-xs sm:text-sm font-mono tracking-wider uppercase text-ink hover:border-forest hover:text-forest transition-colors shadow-2xs text-center"
              >
                <span>Explore what we build</span>
                <span className="text-forest group-hover:translate-x-0.5 transition-transform">
                  &darr;
                </span>
              </a>
            </div>

            {/* Supporting labels ticker */}
            <div className="pt-6 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 min-w-0">
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-bronze uppercase truncate">
                  01 / WEBSITES
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-ink uppercase tracking-wide mt-0.5 sm:mt-1 truncate">
                  Brand & Landing
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-forest uppercase truncate">
                  02 / APPLICATIONS
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-ink uppercase tracking-wide mt-0.5 sm:mt-1 truncate">
                  SaaS & Platforms
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-muted uppercase truncate">
                  03 / SOFTWARE
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-ink uppercase tracking-wide mt-0.5 sm:mt-1 truncate">
                  Custom Systems
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-bronze uppercase truncate">
                  04 / AI & SYSTEMS
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-ink uppercase tracking-wide mt-0.5 sm:mt-1 truncate">
                  Integrations
                </span>
              </div>
            </div>
          </div>

          {/* ── Right Column: 3D Iridescent Sculpture (Centerpiece) ────── */}
          <div className="relative w-full aspect-square max-w-[540px] mx-auto lg:max-w-none flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
