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
        className="pointer-events-none absolute inset-0 z-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 divide-x divide-ink/[0.04] dark:divide-white/[0.03] opacity-60"
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

      {/* Top subtle horizon illumination */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-copper/15 via-orange-500/5 to-transparent blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full pt-2 pb-14 sm:pt-4 sm:pb-16 lg:pt-6 lg:pb-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 lg:gap-16">
          {/* ── Left Column: Copy & Actions ────────────────────────────── */}
          <div className="flex flex-col space-y-6 lg:space-y-8 max-w-2xl">

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.65rem] font-bold tracking-tight text-ink leading-[1.08] text-balance">
              We turn complex business needs into digital solutions.
            </h1>

            {/* Subhead & Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-muted leading-relaxed font-normal">
              <p>
                From developing new digital products to connecting business systems
                and improving existing applications, we help businesses solve real
                problems through thoughtful software engineering.
              </p>
              <p className="text-muted/80 text-sm sm:text-base border-l-2 border-copper/50 pl-4 italic">
                We start with understanding. We build with purpose. And we consider
                what happens long after the software is delivered.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              {/* Primary CTA */}
              <Link
                href="/contact"
                style={{ color: "#ffffff" }}
                className="relative group inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-sm font-mono font-medium tracking-wider uppercase bg-forest dark:bg-white/[0.04] border border-forest dark:border-amber-500/50 hover:bg-forest-hover dark:hover:border-amber-400 transition-all duration-300 shadow-sm dark:shadow-[0_0_25px_rgba(245,158,11,0.25)]"
              >
                <div
                  className="pointer-events-none absolute -top-[1px] left-1/2 -translate-x-1/2 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-95 group-hover:w-full transition-all duration-300 hidden dark:block"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center gap-2.5" style={{ color: "#ffffff" }}>
                  Start a Conversation
                </span>
              </Link>

              {/* Secondary CTA */}
              <a
                href="#what-we-do"
                className="group inline-flex items-center gap-2 text-sm font-mono tracking-wider uppercase text-muted hover:text-ink transition-colors"
              >
                <span>Explore Our Capabilities</span>
                <span className="text-copper group-hover:translate-x-1 transition-transform">
                  &rsaquo;
                </span>
              </a>
            </div>

            {/* Supporting labels ticker */}
            <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-wider text-copper uppercase">
                  01 / CAPABILITY
                </span>
                <span className="font-sans text-xs font-semibold text-ink uppercase tracking-wide mt-1">
                  Product Engineering
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-wider text-forest dark:text-sky-400 uppercase">
                  02 / CAPABILITY
                </span>
                <span className="font-sans text-xs font-semibold text-ink uppercase tracking-wide mt-1">
                  AI & Systems Integration
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-wider text-olive dark:text-pink-400 uppercase">
                  03 / CAPABILITY
                </span>
                <span className="font-sans text-xs font-semibold text-ink uppercase tracking-wide mt-1">
                  Software Modernization
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
