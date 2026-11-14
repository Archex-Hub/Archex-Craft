"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe,
  ShoppingBag,
  Smartphone,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers
} from "lucide-react";
import { useState } from "react";
import {
  serviceCategories as sourceServiceCategories,
  type ServiceCategory
} from "@/lib/services/catalog";

function AiMlVisualizer() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/80 bg-surface-muted/50 dark:bg-black/30 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-copper uppercase">
            AI & Inference Engine
          </span>
        </div>
        <span className="rounded-full border border-copper/30 bg-copper/10 px-2.5 py-0.5 font-mono text-[10px] text-copper">
          Deterministic RAG
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">01 · INPUT</p>
          <p className="mt-1 text-xs font-semibold text-ink">Context & Prompts</p>
          <p className="mt-0.5 text-[10px] text-muted">Vector retrieval</p>
        </div>
        <div className="rounded-lg border border-copper/40 bg-copper/5 dark:bg-copper/10 p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-copper">02 · GUARDRAILS</p>
          <p className="mt-1 text-xs font-semibold text-ink">Schema Validation</p>
          <p className="mt-0.5 text-[10px] text-copper">Confidence &gt; 92%</p>
        </div>
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">03 · OUTPUT</p>
          <p className="mt-1 text-xs font-semibold text-ink">Verified Action</p>
          <p className="mt-0.5 text-[10px] text-muted">Human escalation</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-border/50 bg-surface/50 dark:bg-white/[0.02] px-3 py-2 text-[10px] font-mono text-muted">
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <ShieldCheck size={13} className="text-emerald-500" /> Grounded In Real Workflows
        </span>
        <span>P99: &lt;110ms · Zero Hallucination Guard</span>
      </div>
    </div>
  );
}

function WebCmsVisualizer() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/80 bg-surface-muted/50 dark:bg-black/30 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            Edge Web & CMS Engine
          </span>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
          Sub-second Delivery
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">01 · SOURCE</p>
          <p className="mt-1 text-xs font-semibold text-ink">Headless Content</p>
          <p className="mt-0.5 text-[10px] text-muted">Structured data</p>
        </div>
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10 p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">02 · EDGE CACHE</p>
          <p className="mt-1 text-xs font-semibold text-ink">Global SSR / ISR</p>
          <p className="mt-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">Sub-50ms TTFB</p>
        </div>
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">03 · CLIENT</p>
          <p className="mt-1 text-xs font-semibold text-ink">Accessible UI</p>
          <p className="mt-0.5 text-[10px] text-muted">100% Core Vitals</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-border/50 bg-surface/50 dark:bg-white/[0.02] px-3 py-2 text-[10px] font-mono text-muted">
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <Globe size={13} className="text-emerald-500" /> Core Web Vitals 100/100
        </span>
        <span>WCAG AA · Zero Layout Shift</span>
      </div>
    </div>
  );
}

function EcommerceVisualizer() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/80 bg-surface-muted/50 dark:bg-black/30 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
            Transactional Commerce
          </span>
        </div>
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-600 dark:text-amber-400">
          PCI-DSS Level 1
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">01 · CATALOG</p>
          <p className="mt-1 text-xs font-semibold text-ink">Faceted Search</p>
          <p className="mt-0.5 text-[10px] text-muted">Instant discovery</p>
        </div>
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10 p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-amber-600 dark:text-amber-400">02 · CHECKOUT</p>
          <p className="mt-1 text-xs font-semibold text-ink">Atomic Lock</p>
          <p className="mt-0.5 text-[10px] text-amber-600 dark:text-amber-400">Zero overselling</p>
        </div>
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">03 · LOGISTICS</p>
          <p className="mt-1 text-xs font-semibold text-ink">WMS & Webhooks</p>
          <p className="mt-0.5 text-[10px] text-muted">Automated sync</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-border/50 bg-surface/50 dark:bg-white/[0.02] px-3 py-2 text-[10px] font-mono text-muted">
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <ShoppingBag size={13} className="text-amber-500" /> High-Conversion Flow
        </span>
        <span>99.99% Uptime · Idempotent Billing</span>
      </div>
    </div>
  );
}

function MobileAppVisualizer() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/80 bg-surface-muted/50 dark:bg-black/30 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-sky-600 dark:text-sky-400 uppercase">
            Mobile Native & Multi-Platform
          </span>
        </div>
        <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[10px] text-sky-600 dark:text-sky-400">
          60 FPS Fluidity
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">01 · PLATFORMS</p>
          <p className="mt-1 text-xs font-semibold text-ink">iOS & Android</p>
          <p className="mt-0.5 text-[10px] text-muted">Swift & Kotlin</p>
        </div>
        <div className="rounded-lg border border-sky-500/40 bg-sky-500/5 dark:bg-sky-500/10 p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-sky-600 dark:text-sky-400">02 · SYNC</p>
          <p className="mt-1 text-xs font-semibold text-ink">Offline-First</p>
          <p className="mt-0.5 text-[10px] text-sky-600 dark:text-sky-400">Room & SQLite</p>
        </div>
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">03 · SECURITY</p>
          <p className="mt-1 text-xs font-semibold text-ink">Biometrics / JWT</p>
          <p className="mt-0.5 text-[10px] text-muted">Encrypted state</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-border/50 bg-surface/50 dark:bg-white/[0.02] px-3 py-2 text-[10px] font-mono text-muted">
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <Smartphone size={13} className="text-sky-500" /> Native Device Polish
        </span>
        <span>Full Gestures · WorkManager Sync</span>
      </div>
    </div>
  );
}

function SoftwareDevVisualizer() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/80 bg-surface-muted/50 dark:bg-black/30 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            Custom Systems & SaaS
          </span>
        </div>
        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
          Clean Architecture
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">01 · DOMAIN</p>
          <p className="mt-1 text-xs font-semibold text-ink">Typed Schemas</p>
          <p className="mt-0.5 text-[10px] text-muted">Strict contracts</p>
        </div>
        <div className="rounded-lg border border-indigo-500/40 bg-indigo-500/5 dark:bg-indigo-500/10 p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400">02 · EVENT BUS</p>
          <p className="mt-1 text-xs font-semibold text-ink">Queues & Jobs</p>
          <p className="mt-0.5 text-[10px] text-indigo-600 dark:text-indigo-400">Fault-isolated</p>
        </div>
        <div className="rounded-lg border border-border/70 bg-surface/80 dark:bg-white/[0.03] p-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted">03 · DEPLOY</p>
          <p className="mt-1 text-xs font-semibold text-ink">Zero Downtime</p>
          <p className="mt-0.5 text-[10px] text-muted">Blue-green CI/CD</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-border/50 bg-surface/50 dark:bg-white/[0.02] px-3 py-2 text-[10px] font-mono text-muted">
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <Terminal size={13} className="text-indigo-500" /> Production-Grade Reliability
        </span>
        <span>98% Automated Coverage · Full IP Ownership</span>
      </div>
    </div>
  );
}

function CategoryBlueprintVisualizer({ slug }: { slug: string }) {
  switch (slug) {
    case "ai-ml-development":
      return <AiMlVisualizer />;
    case "web-cms-development":
      return <WebCmsVisualizer />;
    case "ecommerce-development":
      return <EcommerceVisualizer />;
    case "mobile-app-development":
      return <MobileAppVisualizer />;
    case "software-development":
      return <SoftwareDevVisualizer />;
    default:
      return <AiMlVisualizer />;
  }
}

export function ServiceCategorySlideshow({
  categories = sourceServiceCategories
}: {
  categories?: ServiceCategory[];
}) {
  const [selected, setSelected] = useState(0);
  const category = categories[selected] || categories[0];

  function move(direction: number) {
    setSelected((current) => (current + direction + categories.length) % categories.length);
  }

  function handleExploreClick(categorySlug: string) {
    if (typeof window !== "undefined") {
      window.location.hash = categorySlug;
      const target = document.getElementById(categorySlug) || document.getElementById("catalogue");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <div className="rounded-2xl border border-border/90 bg-surface dark:bg-[#111c2e] p-5 sm:p-7 shadow-lg shadow-black/5 dark:shadow-black/25 transition-all">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-paper px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-olive">
            Category {String(selected + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline font-mono text-xs text-muted">
            {category.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous service category"
            className="inline-flex size-9 sm:size-10 items-center justify-center rounded-lg border border-border bg-surface text-ink transition-colors hover:border-forest hover:bg-forest/5 active:scale-95"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next service category"
            className="inline-flex size-9 sm:size-10 items-center justify-center rounded-lg border border-border bg-surface text-ink transition-colors hover:border-forest hover:bg-forest/5 active:scale-95"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-5 min-h-[24rem]">
        {/* Dynamic Architectural Blueprint Visualizer */}
        <CategoryBlueprintVisualizer slug={category.slug} />

        {/* Heading & Summary */}
        <h2 className="mt-6 font-serif text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-ink">
          {category.name}
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted font-normal">
          {category.description}
        </p>

        {/* Clickable Service Pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {category.services.slice(0, 4).map((service) => (
            <a
              key={service.slug}
              href="#catalogue"
              className="group/pill inline-flex items-center gap-1.5 rounded-full border border-border bg-paper/70 px-3 py-1.5 text-xs text-muted transition-all hover:border-forest hover:bg-surface hover:text-ink shadow-2xs"
            >
              <span>{service.title}</span>
              <ArrowDown
                size={11}
                className="text-forest opacity-60 transition-transform group-hover/pill:translate-y-0.5 group-hover/pill:opacity-100"
              />
            </a>
          ))}
        </div>

        {/* Explore In Catalogue Action */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
          <button
            type="button"
            onClick={() => handleExploreClick(category.slug)}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-hover transition-colors"
          >
            <span>Explore all {category.name} capabilities</span>
            <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
          </button>
          <span className="font-mono text-xs text-muted">
            {category.services.length} services in catalog
          </span>
        </div>
      </div>

      {/* Category Selector Tabs */}
      <div className="mt-6 flex gap-1.5" aria-label="Service category selector">
        {categories.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            aria-label={`Show ${item.name}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${selected === index
              ? "bg-forest scale-y-125"
              : "bg-border/70 hover:bg-olive/40"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
