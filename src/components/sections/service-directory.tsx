"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Globe,
  ShoppingBag,
  Smartphone,
  Terminal,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import {
  serviceCategories as sourceServiceCategories,
  type ServiceCategory
} from "@/lib/services/catalog";

function getCategoryIcon(slug: string) {
  switch (slug) {
    case "ai-ml-development":
      return Sparkles;
    case "web-cms-development":
      return Globe;
    case "ecommerce-development":
      return ShoppingBag;
    case "mobile-app-development":
      return Smartphone;
    case "software-development":
      return Terminal;
    default:
      return Terminal;
  }
}

export function ServiceDirectory({
  categories = sourceServiceCategories
}: {
  categories?: ServiceCategory[];
}) {
  const [selected, setSelected] = useState(() => {
    const webCmsIndex = categories.findIndex((category) => category.slug === "web-cms-development");
    return webCmsIndex >= 0 ? webCmsIndex : 0;
  });

  // Sync state with URL hash
  useEffect(() => {
    function handleHash() {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const index = categories.findIndex((c) => c.slug === hash);
      if (index >= 0) {
        setSelected(index);
      }
    }

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [categories]);

  function handleSelect(index: number, slug: string) {
    setSelected(index);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${slug}`);
    }
  }

  const category = categories[selected] || categories[0];
  const ActiveIcon = getCategoryIcon(category.slug);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
      {/* Left Sidebar Category Navigation */}
      <div className="space-y-2.5">
        {categories.map((item, index) => {
          const Icon = getCategoryIcon(item.slug);
          const isSelected = selected === index;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => handleSelect(index, item.slug)}
              aria-pressed={isSelected}
              className={`group relative flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${isSelected
                ? "border-forest bg-surface dark:bg-[#111c2e] text-ink shadow-md shadow-forest/5"
                : "border-border/80 bg-surface/50 text-muted hover:border-forest/60 hover:bg-surface hover:text-ink"
                }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${isSelected
                    ? "border-forest/30 bg-forest/10 text-forest"
                    : "border-border bg-paper text-muted group-hover:text-ink"
                    }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-olive font-semibold">
                      0{index + 1}
                    </span>
                    <span className="font-mono text-[10px] text-muted">
                      · {item.services.length} services
                    </span>
                  </div>
                  <span className="mt-1 block font-sans text-sm sm:text-base font-bold text-ink">
                    {item.name}
                  </span>
                </div>
              </div>

              <ChevronRight
                size={16}
                className={`transition-transform duration-200 ${isSelected
                  ? "translate-x-0 text-forest opacity-100"
                  : "-translate-x-1 text-muted opacity-40 group-hover:translate-x-0 group-hover:opacity-80"
                  }`}
              />
            </button>
          );
        })}
      </div>

      {/* Right Category Details & Services Grid */}
      <div
        id={category.slug}
        className="rounded-2xl border border-border/90 bg-surface dark:bg-[#111c2e] p-6 sm:p-8 shadow-sm transition-all"
      >
        {/* Category Header */}
        <div className="border-b border-border/80 pb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive font-semibold">
                Category {String(selected + 1).padStart(2, "0")} Specification
              </span>
            </div>
            <span className="rounded-full border border-forest/30 bg-forest/5 px-3 py-1 font-mono text-[11px] font-semibold text-forest">
              {category.services.length} Capabilities
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg border border-copper/30 bg-copper/10 text-copper">
              <ActiveIcon size={20} />
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {category.name}
            </h3>
          </div>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            {category.description}
          </p>
        </div>

        {/* Services Grid with Rich Actionable Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {category.services.map((service) => (
            <Link
              key={service.slug}
              href="/start-project"
              className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-paper/50 dark:bg-white/[0.02] p-5 transition-all duration-200 hover:border-forest hover:bg-surface hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans text-base font-bold text-ink transition-colors group-hover:text-forest">
                    {service.title}
                  </h3>
                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest"
                  />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                  {service.summary}
                </p>
              </div>

              {/* Capabilities Chips */}
              <div className="mt-4 pt-3 border-t border-border/50">
                {service.capabilities && service.capabilities.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.capabilities.slice(0, 2).map((cap, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-border/60 bg-surface px-2 py-0.5 text-[10px] font-mono text-muted"
                      >
                        {cap.replace(/\.$/, "")}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex items-center gap-1.5 text-xs font-semibold text-forest group-hover:text-forest-hover">
                  <span>Consult on this service</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
