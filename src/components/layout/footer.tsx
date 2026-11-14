import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowUpRight } from "lucide-react";

const exploreLinks = [
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "About", href: "/about" },
];

const ecosystemLinks = [
  {
    label: "Archex",
    href: "https://www.archexweb.in",
    external: true,
    tag: "Find your Solution",
  },
];

const talkLinks = [
  { label: "Start a Conversation", href: "/contact" },
  { label: "Project Enquiry", href: "/start-project" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface-muted/60 dark:bg-[#050609] text-ink dark:text-white/80 overflow-hidden transition-colors duration-300">
      {/* Background subtle atmospheric glow */}
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-copper/10 blur-[130px]"
        aria-hidden="true"
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2.6fr]">
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-ink"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-copper/40 bg-surface">
                <span className="h-3 w-3 rotate-45 border-r border-t border-copper group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-sans text-xl font-bold tracking-wider text-ink uppercase">
                Archex Craft
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Thoughtful engineering. Dependable software.
            </p>
          </div>

          {/* Pillars badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 w-fit shadow-2xs">
            <span className="font-mono text-[11px] tracking-widest text-copper font-medium">
              BUILD
            </span>
            <span className="text-muted/40">/</span>
            <span className="font-mono text-[11px] tracking-widest text-forest dark:text-sky-400 font-medium">
              CONNECT
            </span>
            <span className="text-muted/40">/</span>
            <span className="font-mono text-[11px] tracking-widest text-olive dark:text-pink-400 font-medium">
              IMPROVE
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Column 1: EXPLORE */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-wider text-ink uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: ARCHEX ECOSYSTEM */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-wider text-ink uppercase">
              Archex Ecosystem
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {ecosystemLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition-colors group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </a>
                  <span className="block text-[11px] text-muted/60 font-mono">
                    {item.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: LET'S TALK */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-wider text-ink uppercase">
              Let&apos;s Talk
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {talkLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: LEGAL */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-wider text-ink uppercase">
              Legal
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-paper/60 dark:bg-black/40 py-6 transition-colors duration-300">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <p>© {new Date().getFullYear()} ARCHEX CRAFT. All rights reserved.</p>
          <p className="tracking-wider">ENGINEERING & DIGITAL PRODUCTS</p>
        </Container>
      </div>
    </footer>
  );
}
