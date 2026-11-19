"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowRight, Globe, Layers, Cpu, Workflow, MessageSquare } from "lucide-react";

const solutions = [
  {
    number: "01",
    title: "Websites",
    question: "Need a professional website for your business, brand or service?",
    scope: "Business websites · Landing pages · Web presence",
    ctaLabel: "Explore website development",
    href: "/services#web-cms-development",
    icon: Globe,
  },
  {
    number: "02",
    title: "Web applications",
    question: "Need an interactive platform that users can log into and use?",
    scope: "SaaS products · Dashboards · Online platforms",
    ctaLabel: "Explore web applications",
    href: "/services#web-application-development",
    icon: Layers,
  },
  {
    number: "03",
    title: "Custom software",
    question: "Need software designed around a particular business process or requirement?",
    scope: "Business systems · Custom tools · Software solutions",
    ctaLabel: "Explore custom software",
    href: "/services#software-development",
    icon: Cpu,
  },
  {
    number: "04",
    title: "AI & integrations",
    question: "Need your tools to work together or repetitive work to happen automatically?",
    scope: "AI integration · Workflow automation · API connections",
    ctaLabel: "Explore AI & integrations",
    href: "/services#ai-ml-development",
    icon: Workflow,
  },
];

export function WhatWeBuildSection() {
  return (
    <section
      id="what-we-build"
      className="relative py-20 lg:py-28 border-b border-border bg-paper scroll-mt-20 transition-colors duration-300"
      aria-label="What are you looking to build"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
            What are you looking to build?
          </h2>
          <p className="text-muted text-base sm:text-lg">
            Choose the kind of solution you&apos;re looking for. You don&apos;t need to know the engineering stack—just what you need accomplished.
          </p>
        </div>

        {/* 4 Primary Solution Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-7 shadow-2xs transition-all duration-300 hover:border-forest hover:-translate-y-1 hover:shadow-sm"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-border/80 pb-4">
                    <span className="font-mono text-xs font-bold tracking-wider text-bronze">
                      {item.number}
                    </span>
                    <Icon size={18} className="text-muted group-hover:text-forest transition-colors" />
                  </div>

                  <h3 className="font-sans text-xl font-bold text-ink group-hover:text-forest transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-ink/90 font-medium leading-snug">
                    {item.question}
                  </p>

                  <p className="text-xs font-mono text-muted leading-relaxed">
                    {item.scope}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-border">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-forest hover:text-forest-hover transition-colors"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section 3 — Triage Lens for unclassified requirements */}
        <div className="mt-12 rounded-2xl border border-border bg-surface-muted p-8 sm:p-10 lg:p-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr] items-center gap-8">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-bronze">
                PROJECT TRIAGE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                Not sure what kind of solution you need?
              </h3>
              <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
                That&apos;s fine. Tell us what you&apos;re trying to achieve. We&apos;ll help you understand the right technical approach and architectural boundaries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:justify-end items-stretch sm:items-center gap-4">
              <Link
                href="/start-project"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-xs sm:text-sm font-mono font-medium tracking-wider uppercase text-white hover:bg-forest-hover transition-colors shadow-2xs"
              >
                <MessageSquare size={16} />
                <span>Describe what you&apos;re trying to build</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
