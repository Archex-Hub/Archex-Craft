"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";

export type ContentRailItem = {
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
};


import { cn } from "@/lib/utils";

export function ContentRail({
  eyebrow,
  title,
  description,
  viewAllHref,
  viewAllLabel = "View all",
  items,
  enableSearch = false,
  searchPlaceholder = "Filter services...",
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  items: ContentRailItem[];
  enableSearch?: boolean;
  searchPlaceholder?: string;
  className?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"start" | "middle" | "end">("start");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.body.toLowerCase().includes(q) ||
        item.eyebrow.toLowerCase().includes(q) ||
        (item.meta && item.meta.toLowerCase().includes(q))
    );
  }, [items, searchQuery]);

  function updatePosition() {
    const rail = railRef.current;
    if (!rail) return;
    const atStart = rail.scrollLeft <= 2;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    setPosition(atStart ? "start" : atEnd ? "end" : "middle");
  }

  function scrollByCard(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-rail-card]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: direction * ((card?.offsetWidth || rail.clientWidth) + 20),
      behavior: reduceMotion ? "auto" : "smooth"
    });
    window.setTimeout(updatePosition, 350);
  }

  return (
    <section className={cn("content-rail overflow-hidden border-y border-border py-12 sm:py-16", className)}>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{title}</h2>
          {description ? (
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">{description}</p>
          ) : null}
        </div>

        {/* Right side: Keystroke Search Filter + Navigation */}
        <div className="flex flex-wrap items-center gap-3">
          {enableSearch ? (
            <div className="relative flex items-center">
              <Search
                size={14}
                className="pointer-events-none absolute left-3.5 text-muted/70"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="h-10 w-52 sm:w-64 rounded-full border border-border/80 bg-surface/90 dark:bg-black/30 pl-9 pr-9 text-xs text-ink placeholder:text-muted/60 transition-all focus:border-forest focus:bg-surface focus:w-60 sm:focus:w-72 focus:outline-none focus:ring-2 focus:ring-forest/20 shadow-2xs"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Reset search and show all services"
                  title="Reset search"
                  className="absolute right-2.5 flex size-5 items-center justify-center rounded-full bg-surface-muted text-muted hover:bg-border hover:text-ink transition-colors"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              ) : null}
            </div>
          ) : null}

          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="mr-2 inline-flex items-center gap-2 text-sm font-semibold text-forest"
            >
              {viewAllLabel} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ) : null}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={position === "start" || filteredItems.length === 0}
              aria-label={`Previous ${title.toLowerCase()} item`}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border text-ink transition-colors hover:border-forest disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={position === "end" || filteredItems.length === 0}
              aria-label={`Next ${title.toLowerCase()} item`}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border text-ink transition-colors hover:border-forest disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-12 text-center bg-surface/30">
          <p className="text-sm font-semibold text-ink">
            No services matching &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-1 text-xs text-muted">
            Try a different technical keyword or clear your search query.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-ink hover:border-forest shadow-2xs transition-colors"
          >
            <X size={13} aria-hidden="true" />
            <span>Show all services ({items.length})</span>
          </button>
        </div>
      ) : (
        <>
          <div
            ref={railRef}
            onScroll={updatePosition}
            className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
          >
            {filteredItems.map((item) => (
              <RailCard key={item.title} item={item} />
            ))}
          </div>
          {filteredItems.length > 1 ? (
            <div className="mt-2 h-px bg-border">
              <div
                className="h-px w-1/3 bg-olive transition-transform duration-300"
                style={{
                  transform:
                    position === "end"
                      ? "translateX(200%)"
                      : position === "middle"
                        ? "translateX(100%)"
                        : "translateX(0)"
                }}
              />
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

function RailCard({ item }: { item: ContentRailItem }) {
  return (
    <article
      data-rail-card
      className="group flex min-h-[17.5rem] w-[min(80vw,24rem)] shrink-0 snap-start flex-col border border-border bg-surface p-5 transition-colors sm:min-h-[19.5rem] sm:p-6"
    >
      <div className="relative mb-5 flex min-h-20 items-end overflow-hidden bg-surface-muted p-3.5">
        <div className="absolute inset-3 border border-olive/50" />
        <div className="absolute right-4 top-4 h-9 w-9 rounded-full border border-olive/60 transition-transform duration-300 group-hover:translate-x-1.5" />
        <p className="relative z-10 font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
          {item.eyebrow}
        </p>
      </div>
      <h3 className="text-xl font-semibold leading-snug tracking-[-0.02em]">
        {item.href ? (
          <Link href={item.href} className="hover:text-olive focus-visible:underline">
            {item.title}
          </Link>
        ) : item.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.body}</p>
      {item.href ? (
        <div className="mt-auto flex items-center justify-between gap-4 pt-4 text-sm font-semibold text-forest">
          <Link href={item.href} className="inline-flex items-center gap-2 hover:text-olive">
            <span>{item.meta || "Explore in catalogue"}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      ) : item.meta ? (
        <div className="mt-auto flex items-center justify-between gap-4 pt-4 text-xs font-mono uppercase tracking-wider text-muted">
          <span>{item.meta}</span>
        </div>
      ) : null}
    </article>
  );
}
