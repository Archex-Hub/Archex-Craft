"use client";

import type { HomepageContent } from "@/lib/content/repository";
import { Container } from "@/components/layout/container";
import { ContentRail } from "@/components/sections/content-rail";
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { WhatWeDoSection } from "@/components/home/WhatWeDoSection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { AtlasSection } from "@/components/home/AtlasSection";
import { PrinciplesSection } from "@/components/home/PrinciplesSection";
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
    <div className="relative min-h-screen bg-paper text-ink transition-colors duration-300 selection:bg-copper/30 selection:text-ink dark:selection:text-amber-200">
      {/* 01 — HERO (3D Iridescent Crystal Centerpiece + Copy) */}
      <HeroSection />

      {/* 02 — THE PROBLEM */}
      <ProblemSection />

      {/* 03 — WHAT WE DO */}
      <WhatWeDoSection />

      {/* 03b — FEATURED SERVICES RAIL */}
      {serviceRailItems.length > 0 ? (
        <section className="border-y border-border py-12 sm:py-16 bg-surface/40">
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

      {/* 04 — THE ARCHEX ECOSYSTEM */}
      <EcosystemSection />

      {/* 05 — HOW WE WORK */}
      <HowWeWorkSection />

      {/* 06 — ENGINEERING ATLAS */}
      <AtlasSection />

      {/* 07 — ENGINEERING PRINCIPLES */}
      <PrinciplesSection />

      {/* 08 — FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 09 — FINAL CTA */}
      <FinalCtaSection />
    </div>
  );
}
