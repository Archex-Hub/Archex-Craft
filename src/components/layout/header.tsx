"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const primaryLinks = [
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-copper focus:text-white focus:rounded-md focus:font-mono focus:text-xs"
        href="#main-content"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b border-border bg-paper/90 dark:bg-[#07080c]/90 backdrop-blur-xl transition-colors duration-300">
        <Container className="flex h-20 items-center justify-between">
          {/* Brand Monogram & Name */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-ink transition-opacity hover:opacity-95"
            aria-label="Archex Craft Home"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-sm border border-copper/40 bg-surface shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <span className="h-3 w-3 rotate-45 border-r border-t border-copper group-hover:scale-110 transition-transform" />
              <span className="absolute h-1.5 w-1.5 rounded-full bg-copper" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-base font-semibold tracking-wider text-ink uppercase">
                {siteConfig.name}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-muted uppercase">
                Engineering & Products
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 lg:flex"
          >
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-surface/90 shadow-xs">
              {primaryLinks.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-4 py-1.5 text-xs font-mono tracking-wider transition-colors rounded-full ${isActive
                      ? "text-copper bg-surface-muted font-semibold shadow-2xs"
                      : "text-muted hover:text-ink hover:bg-surface-muted/60"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Glowing Accent Button */}
            <Link
              href="/contact"
              style={{ color: "#ffffff" }}
              className="relative group inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-mono font-medium tracking-wider uppercase bg-forest dark:bg-white/[0.05] border border-forest dark:border-amber-500/40 hover:bg-forest-hover dark:hover:border-amber-400 transition-all duration-300 shadow-sm dark:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-2" style={{ color: "#ffffff" }}>
                Start a Conversation
              </span>
            </Link>

            <ThemeToggle />
          </nav>

          <MobileNav />
        </Container>
      </header>
    </>
  );
}
