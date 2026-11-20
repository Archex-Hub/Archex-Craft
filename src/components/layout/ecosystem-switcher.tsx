"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface EcosystemSwitcherProps {
  currentPractice?: "parent" | "craft" | "studio" | "gtm";
  className?: string;
}

export function EcosystemSwitcher({
  currentPractice = "craft",
  className = "",
}: EcosystemSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      {/* Switcher Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="ecosystem-menu-craft"
        aria-label="Switch Archex practice"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono font-medium tracking-wider text-ink transition-colors hover:border-forest hover:bg-surface-muted"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden="true" />
        <span>Archex Craft</span>
        <ChevronDown
          size={12}
          className={`text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="ecosystem-menu-craft"
          role="menu"
          aria-orientation="vertical"
          className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-border bg-surface p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="border-b border-border px-3 py-2">
            <span className="block font-mono text-[9px] font-semibold tracking-widest text-muted uppercase">
              ARCHEX ECOSYSTEM
            </span>
            <span className="text-[11px] text-muted-foreground">
              One business. Three specialist capabilities.
            </span>
          </div>

          {/* Practice List */}
          <div className="py-1" role="none">
            {/* 01: Parent Gateway */}
            <a
              href="https://www.archexweb.in/"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-surface-muted group"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold text-ink group-hover:text-forest">
                    Archex
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                    Gateway
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="text-muted group-hover:text-forest"
                  />
                </div>
                <p className="mt-0.5 text-[11px] leading-tight text-muted">
                  Parent brand &amp; central gateway. Coordinates the practices.
                </p>
              </div>
            </a>

            {/* 02: Craft (Current) */}
            <Link
              href="/"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-start gap-3 rounded-lg p-2.5 bg-forest-subtle/50 transition-colors"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold text-forest">
                    Archex Craft
                  </span>
                  <span className="rounded bg-forest/10 px-1.5 py-0.5 font-mono text-[9px] text-forest font-medium">
                    Current
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-tight text-muted">
                  Websites, applications, custom software &amp; AI integrations.
                </p>
              </div>
            </Link>

            {/* 03: Studio */}
            <a
              href="https://studio.archexweb.in/"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-surface-muted group"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9c3e2f]" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold text-ink group-hover:text-forest">
                    Archex Studio
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                    Design
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="text-muted group-hover:text-forest"
                  />
                </div>
                <p className="mt-0.5 text-[11px] leading-tight text-muted">
                  Brand strategy, visual identity, UI/UX &amp; digital design.
                </p>
              </div>
            </a>

            {/* 04: GTM (In Development) */}
            <div
              role="menuitem"
              aria-disabled="true"
              className="flex items-start gap-3 rounded-lg p-2.5 opacity-60 cursor-default"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold text-ink">
                    Archex GTM
                  </span>
                  <span className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[9px] text-muted font-medium">
                    In Development
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-tight text-muted">
                  Go-to-market positioning &amp; growth. Coming soon.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Link */}
          <div className="border-t border-border mt-1 pt-2 px-2 pb-1">
            <a
              href="https://www.archexweb.in/contact?practice=craft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-[11px] font-mono text-forest hover:underline"
            >
              <span>Need help choosing? Contact central desk</span>
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
