"use client";

import type { HomepageContent } from "@/lib/content/repository";
import { Container } from "@/components/layout/container";
import { ContentRail } from "@/components/sections/content-rail";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatWeBuildSection } from "@/components/home/WhatWeBuildSection";
import { AtlasSection } from "@/components/home/AtlasSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { PrinciplesSection } from "@/components/home/PrinciplesSection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePageClient({ content }: { content: HomepageContent }) {
  const serviceRailItems = (content.services || []).slice(0, 6).map((item) => ({
    eyebrow: item.category || "Capability",
    title: item.title,
    body: item.summary,
    href: "/services",
    meta: "Explore in catalogue"
  }));

  return (
    <div className="relative min-h-screen bg-paper text-ink transition-colors duration-300 selection:bg-forest/20 selection:text-ink">
      {/* 01 — HERO (3D Crystal Centerpiece + Copy) */}
      <HeroSection />

      {/* 02 — WHAT ARE YOU LOOKING TO BUILD? + TRIAGE */}
      <WhatWeBuildSection />

      {/* 02b — FEATURED SERVICES RAIL */}
      {serviceRailItems.length > 0 ? (
        <section className="border-y border-border py-12 sm:py-16 bg-surface-muted/40">
          <Container>
            <ContentRail
              eyebrow="FEATURED CAPABILITIES"
              title="Explore engineering specialties"
              description="Browse active capabilities across web platforms, intelligent workflows, and system infrastructure."
              viewAllHref="/services"
              viewAllLabel="View full service catalogue"
              items={serviceRailItems}
            />
          </Container>
        </section>
      ) : null}

      {/* 03 — HOW WE BUILD IT (ENGINEERING DISCIPLINES) */}
      <AtlasSection />

      {/* 04 — WHAT WORKING WITH CRAFT LOOKS LIKE (4-STEP PROCESS) */}
      <HowWeWorkSection />

      {/* 05 — WHAT YOU CAN EXPECT (DELIVERABLES & STANDARDS) */}
      <PrinciplesSection />

      {/* 06 — HOW STUDIO AND CRAFT CONNECT (THE ARCHEX ECOSYSTEM) */}
      <EcosystemSection />

      {/* 07 — FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 08 — FINAL CTA (LET'S DISCUSS YOUR REQUIREMENT) */}
      <FinalCtaSection />
    </div>
  );
}
