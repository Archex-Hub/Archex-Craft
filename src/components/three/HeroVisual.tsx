"use client";

import { useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { HERO_NODES } from "./ContinuousMobiusSculpture";

const DynamicSculpture = dynamic(
  () => import("./ContinuousMobiusSculpture"),
  {
    ssr: false,
    loading: () => <SculptureLoadingFallback />,
  }
);

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

function SculptureLoadingFallback() {
  return (
    <div
      className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-copper/15 via-amber-500/10 to-transparent blur-3xl animate-pulse" />
      <div className="w-48 h-48 rounded-full border border-copper/30 flex items-center justify-center animate-[spin_16s_linear_infinite]">
        <div className="w-36 h-36 rounded-full border border-border/60" />
      </div>
      <span className="sr-only">Loading interactive 3D sculpture…</span>
    </div>
  );
}

function ReducedMotionFallback({
  activeNode,
  onHoverNode: _onHoverNode,
  onSelectNode: _onSelectNode,
}: {
  activeNode: string | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (id: string) => void;
}) {
  const activeColor =
    activeNode === "ai"
      ? "#38bdf8"
      : activeNode === "modernization"
      ? "#ec4899"
      : "#f59e0b";

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] flex items-center justify-center">
      <svg
        viewBox="0 0 520 520"
        className="w-full max-w-[440px] h-auto drop-shadow-xl"
        role="img"
        aria-label="Archex Craft Continuous Möbius Sculpture"
      >
        <defs>
          <radialGradient id="sculpture-glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={activeColor} stopOpacity="0.25" />
            <stop offset="60%" stopColor={activeColor} stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="translucent-glass" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#475569" stopOpacity="0.4" />
            <stop offset="50%" stopColor={activeColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <circle cx="260" cy="260" r="190" fill="url(#sculpture-glow)" />

        {/* Outer Faceted Ribbon Loop */}
        <path
          d="M 260 110 C 370 110, 440 210, 390 320 C 350 400, 240 430, 160 370 C 90 320, 100 210, 180 150 C 220 120, 250 110, 260 110 Z"
          fill="url(#translucent-glass)"
          stroke={activeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Intersecting Mobius Flow Path */}
        <path
          d="M 160 370 C 230 420, 340 370, 380 270 C 410 190, 340 140, 260 180 C 180 220, 140 310, 220 370 C 280 410, 360 380, 400 300"
          fill="url(#translucent-glass)"
          stroke={activeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Geometric Triangular Facet Mullion Lines */}
        <g stroke={activeColor} strokeWidth="1" opacity="0.45">
          <line x1="260" y1="110" x2="310" y2="160" />
          <line x1="310" y1="160" x2="370" y2="150" />
          <line x1="370" y1="150" x2="410" y2="220" />
          <line x1="410" y1="220" x2="370" y2="280" />
          <line x1="370" y1="280" x2="320" y2="340" />
          <line x1="320" y1="340" x2="250" y2="380" />
          <line x1="250" y1="380" x2="180" y2="360" />
          <line x1="180" y1="360" x2="130" y2="300" />
          <line x1="130" y1="300" x2="140" y2="210" />
          <line x1="140" y1="210" x2="200" y2="150" />
          <line x1="200" y1="150" x2="260" y2="110" />
        </g>
      </svg>
    </div>
  );
}

export function HeroVisual() {
  const [activeNode, setActiveNode] = useState<string | null>("product");

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* 3D Canvas / Fallback */}
      <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px]">
        {prefersReducedMotion ? (
          <ReducedMotionFallback
            activeNode={activeNode}
            onHoverNode={setActiveNode}
            onSelectNode={setActiveNode}
          />
        ) : (
          <DynamicSculpture
            activeNode={activeNode}
            onHoverNode={setActiveNode}
            onSelectNode={setActiveNode}
          />
        )}
      </div>

      {/* Floating Orbital Node Interactive Pill Callouts */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6">
        {/* Top-right Node badge: Product Engineering (Amber) */}
        <div className="flex justify-end pt-4 sm:pt-6">
          <button
            type="button"
            className={`pointer-events-auto group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 backdrop-blur-md border ${
              activeNode === "product"
                ? "bg-surface border-copper text-copper shadow-sm dark:bg-amber-950/40 dark:border-amber-400 dark:text-amber-200 dark:shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-105"
                : "bg-surface/85 border-border text-muted hover:border-copper hover:text-ink dark:bg-black/40 dark:border-white/10 dark:text-white/70 dark:hover:border-amber-400/50 dark:hover:text-white"
            }`}
            onClick={() => setActiveNode("product")}
            onMouseEnter={() => setActiveNode("product")}
          >
            <span
              className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                activeNode === "product"
                  ? "bg-copper dark:bg-amber-400 scale-125 shadow-[0_0_8px_#f59e0b]"
                  : "bg-muted/40 group-hover:bg-copper dark:bg-white/40 dark:group-hover:bg-amber-400"
              }`}
            />
            <span>PRODUCT ENGINEERING</span>
          </button>
        </div>

        {/* Middle-left Node badge: AI & Systems Integration (Sky Blue) */}
        <div className="flex justify-start">
          <button
            type="button"
            className={`pointer-events-auto group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 backdrop-blur-md border ${
              activeNode === "ai"
                ? "bg-surface border-sky-500 text-sky-600 shadow-sm dark:bg-sky-950/40 dark:border-sky-400 dark:text-sky-200 dark:shadow-[0_0_20px_rgba(56,189,248,0.35)] scale-105"
                : "bg-surface/85 border-border text-muted hover:border-sky-500 hover:text-ink dark:bg-black/40 dark:border-white/10 dark:text-white/70 dark:hover:border-sky-400/50 dark:hover:text-white"
            }`}
            onClick={() => setActiveNode("ai")}
            onMouseEnter={() => setActiveNode("ai")}
          >
            <span
              className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                activeNode === "ai"
                  ? "bg-sky-500 scale-125 shadow-[0_0_8px_#38bdf8]"
                  : "bg-muted/40 group-hover:bg-sky-500 dark:bg-white/40 dark:group-hover:bg-sky-400"
              }`}
            />
            <span>AI & SYSTEMS INTEGRATION</span>
          </button>
        </div>

        {/* Bottom-right Node badge: Software Modernization (Rose Pink) */}
        <div className="flex justify-end pb-4 sm:pb-6">
          <button
            type="button"
            className={`pointer-events-auto group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 backdrop-blur-md border ${
              activeNode === "modernization"
                ? "bg-surface border-pink-500 text-pink-600 shadow-sm dark:bg-pink-950/40 dark:border-pink-400 dark:text-pink-200 dark:shadow-[0_0_20px_rgba(236,72,153,0.35)] scale-105"
                : "bg-surface/85 border-border text-muted hover:border-pink-500 hover:text-ink dark:bg-black/40 dark:border-white/10 dark:text-white/70 dark:hover:border-pink-400/50 dark:hover:text-white"
            }`}
            onClick={() => setActiveNode("modernization")}
            onMouseEnter={() => setActiveNode("modernization")}
          >
            <span
              className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                activeNode === "modernization"
                  ? "bg-pink-500 scale-125 shadow-[0_0_8px_#ec4899]"
                  : "bg-muted/40 group-hover:bg-pink-500 dark:bg-white/40 dark:group-hover:bg-pink-400"
              }`}
            />
            <span>SOFTWARE MODERNIZATION</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export { HERO_NODES };
