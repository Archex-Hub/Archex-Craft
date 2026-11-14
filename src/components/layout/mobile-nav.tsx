"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavLink } from "@/components/layout/nav-link";
import Link from "next/link";

const primaryLinks = [
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "About", href: "/about" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!triggerRef.current?.parentElement?.contains(target)) setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-surface text-ink shadow-xs"
      >
        <span className="sr-only">Toggle navigation</span>
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <div
        id="mobile-navigation"
        hidden={!open}
        className="absolute left-4 right-4 top-[5rem] z-50 rounded-xl border border-border bg-surface/95 backdrop-blur-2xl p-5 shadow-2xl"
      >
        <nav aria-label="Mobile navigation" className="grid gap-2">
          {primaryLinks.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-mono tracking-wider text-muted hover:bg-surface-muted hover:text-ink"
              ref={item === primaryLinks[0] ? firstLinkRef : undefined}
            />
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center px-4 py-3 rounded-lg text-xs font-mono font-medium tracking-wider uppercase text-white bg-forest dark:bg-amber-500/20 border border-forest dark:border-amber-500/50 shadow-sm dark:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
          >
            Start a Conversation
          </Link>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs font-mono text-muted">
            <span>APPEARANCE</span>
            <ThemeToggle />
          </div>
        </nav>
        <p className="mt-4 border-t border-border pt-4 text-xs text-muted">
          {siteConfig.tagline}
        </p>
      </div>
    </div>
  );
}
