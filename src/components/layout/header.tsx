"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { EcosystemSwitcher } from "@/components/layout/ecosystem-switcher";

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

      <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md transition-colors duration-200">
        <Container className="flex h-16 items-center justify-between">
          {/* Brand Monogram, Name & Ecosystem Switcher */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="group flex items-center gap-3 text-ink transition-opacity hover:opacity-95"
              aria-label="Archex Craft Home"
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-surface shadow-2xs">
                <span className="h-3 w-3 rotate-45 border-r border-t border-forest group-hover:scale-110 transition-transform" />
                <span className="absolute h-1.5 w-1.5 rounded-full bg-forest" />
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

            <EcosystemSwitcher currentPractice="craft" className="hidden sm:inline-block" />
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 lg:flex"
          >
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-border bg-surface shadow-2xs">
              {primaryLinks.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-3.5 py-1 text-xs font-mono tracking-wider transition-colors rounded-full ${isActive
                      ? "text-forest bg-forest-subtle font-semibold"
                      : "text-muted hover:text-ink hover:bg-surface-muted/60"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Accent Button */}
            <Link
              href="/contact"
              className="header-cta-btn inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wider uppercase bg-forest hover:bg-forest-hover transition-colors shadow-2xs"
            >
              Discuss a project
            </Link>

            <ThemeToggle />
          </nav>

          <MobileNav />
        </Container>
      </header>
    </>
  );
}
