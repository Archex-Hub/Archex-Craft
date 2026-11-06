import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";

const primaryLinks = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-we-work" },
  { label: "About", href: "/about" }
];

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-paper/95 backdrop-blur">
        <Container className="flex h-[4.5rem] items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-[-0.03em]">
            {siteConfig.name}
          </Link>
          <nav aria-label="Primary navigation" className="hidden items-center gap-4 lg:flex">
            {primaryLinks.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                className="text-sm font-medium"
              />
            ))}
            <Button href="/contact" className="ml-2 min-w-[8rem] whitespace-nowrap px-4">
              Start a conversation
            </Button>
            <ThemeToggle />
          </nav>
          <MobileNav />
        </Container>
      </header>
    </>
  );
}
