"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function PageScrollNav() {
  const pathname = usePathname();
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    function updateScrollState() {
      if (typeof window === "undefined") return;
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

      // Only show controls if page is scrollable (longer than viewport + 80px)
      const isScrollable = documentHeight > innerHeight + 80;

      // Check if on enquiry page and form is in view
      const form = document.getElementById("enquiry-form");
      const formInView = form ? form.getBoundingClientRect().top <= innerHeight * 0.45 : false;

      // Can scroll up if scrolled down more than 70px
      setCanScrollUp(scrollY > 70);

      // Can scroll down if scrollable and not at bottom
      if (!isScrollable) {
        setCanScrollDown(false);
      } else if (form) {
        setCanScrollDown(!formInView);
      } else {
        const atBottom = scrollY + innerHeight >= documentHeight - 60;
        setCanScrollDown(!atBottom);
      }
    }

    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
    updateScrollState();

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [pathname]);

  function handleScrollUp() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  }

  function handleScrollDown() {
    const form = document.getElementById("enquiry-form");
    if (form) {
      form.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
      const firstInput = form.querySelector<HTMLInputElement>("input, textarea");
      firstInput?.focus({ preventScroll: true });
      return;
    }

    // Scroll to next section below current viewport
    const scrollY = window.scrollY;
    const sections = Array.from(
      document.querySelectorAll("section, article, #main-content > div, footer")
    );
    const nextSection = sections.find((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top > 80;
    });

    if (nextSection) {
      const targetY = scrollY + nextSection.getBoundingClientRect().top - 20;
      window.scrollTo({
        top: targetY,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    } else {
      window.scrollBy({
        top: window.innerHeight * 0.85,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }
  }

  const isEnquiryPage = pathname === "/contact" || pathname === "/start-project";
  const hasControls = canScrollUp || canScrollDown;

  return (
    <aside
      aria-label="Page scroll shortcuts"
      className={[
        "page-scroll-nav fixed right-3.5 sm:right-6 lg:right-10 z-30 flex flex-col gap-2.5 transition-all duration-300",
        "top-1/2 -translate-y-1/2",
        hasControls ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
      ].join(" ")}
    >
      {/* Scroll Up Button */}
      <button
        type="button"
        onClick={handleScrollUp}
        aria-label="Scroll to top of page"
        title="Scroll up to top"
        tabIndex={canScrollUp ? 0 : -1}
        className={[
          "page-scroll-btn group relative flex size-11 sm:size-12 items-center justify-center rounded-full border border-forest/30 bg-surface/90 text-forest shadow-md backdrop-blur transition-all duration-200 hover:border-forest hover:bg-white hover:text-forest hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2",
          canScrollUp
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-75 pointer-events-none h-0 p-0 m-0 border-0 overflow-hidden"
        ].join(" ")}
      >
        <span
          className="page-scroll-pulse absolute inset-0 rounded-full border border-forest/20 animate-pulse-beat pointer-events-none"
          aria-hidden="true"
        />
        <ArrowUp className="relative z-10 size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>

      {/* Scroll Down Button */}
      <button
        type="button"
        onClick={handleScrollDown}
        aria-label={isEnquiryPage ? "Scroll to enquiry form" : "Scroll down"}
        title={isEnquiryPage ? "Scroll down to enquiry form" : "Scroll down"}
        tabIndex={canScrollDown ? 0 : -1}
        className={[
          "page-scroll-btn group relative flex size-11 sm:size-12 items-center justify-center rounded-full border border-forest/30 bg-surface/90 text-forest shadow-md backdrop-blur transition-all duration-200 hover:border-forest hover:bg-white hover:text-forest hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2",
          canScrollDown
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-75 pointer-events-none h-0 p-0 m-0 border-0 overflow-hidden"
        ].join(" ")}
      >
        <span
          className="page-scroll-pulse absolute inset-0 rounded-full border border-forest/20 animate-pulse-beat pointer-events-none"
          aria-hidden="true"
        />
        <ArrowDown className="relative z-10 size-5 transition-transform duration-200 group-hover:translate-y-0.5" />
      </button>
    </aside>
  );
}

