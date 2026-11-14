"use client";

import { useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { HERO_NODES } from "./MesmerizingHeroCrystal";

const DynamicCrystal = dynamic(
  () => import("./MesmerizingHeroCrystal"),
  {
    ssr: false,
    loading: () => <CrystalLoadingFallback />,
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

function CrystalLoadingFallback() {
  return (
    <div
      className="relative w-full h-full min-h-[420px] lg:min-h-[560px] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-copper/20 via-orange-500/20 to-cyan-500/10 blur-3xl animate-pulse" />
      <div className="w-48 h-48 rounded-full border border-copper/30 flex items-center justify-center animate-[spin_12s_linear_infinite]">
        <div className="w-36 h-36 rounded-full border border-border" />
      </div>
      <span className="sr-only">Loading interactive 3D visual…</span>
    </div>
  );
}

function ReducedMotionFallback({
  activeNode,
  onHoverNode,
  onSelectNode,
}: {
  activeNode: string | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (id: string) => void;
}) {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center">
      <svg
        viewBox="0 0 500 500"
        className="w-full max-w-[420px] h-auto drop-shadow-lg"
        role="img"
        aria-label="Archex Craft Engineering Prism"
      >
        <defs>
          <radialGradient id="prism-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="irid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="35%" stopColor="#ec4899" />
            <stop offset="70%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <circle cx="250" cy="250" r="180" fill="url(#prism-glow)" />
        <ellipse
          cx="250"
          cy="250"
          rx="210"
          ry="110"
          fill="none"
          stroke="rgba(245, 158, 11, 0.3)"
          strokeWidth="1.2"
          transform="rotate(-25 250 250)"
        />
        <polygon
          points="250,90 370,190 320,360 180,360 130,190"
          fill="none"
          stroke="url(#irid-grad)"
          strokeWidth="2"
        />
        <polygon
          points="250,90 250,260 370,190"
          fill="rgba(245, 158, 11, 0.12)"
          stroke="rgba(128, 128, 128, 0.3)"
          strokeWidth="1"
        />
        <polygon
          points="250,90 130,190 250,260"
          fill="rgba(56, 189, 248, 0.12)"
          stroke="rgba(128, 128, 128, 0.3)"
          strokeWidth="1"
        />
        <polygon
          points="250,260 370,190 320,360"
          fill="rgba(236, 72, 153, 0.12)"
          stroke="rgba(128, 128, 128, 0.3)"
          strokeWidth="1"
        />
        <polygon
          points="250,260 180,360 130,190"
          fill="rgba(16, 185, 129, 0.12)"
          stroke="rgba(128, 128, 128, 0.3)"
          strokeWidth="1"
        />
        <polygon
          points="250,260 320,360 180,360"
          fill="rgba(245, 158, 11, 0.18)"
          stroke="rgba(128, 128, 128, 0.3)"
          strokeWidth="1"
        />
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
          <DynamicCrystal
            activeNode={activeNode}
            onHoverNode={setActiveNode}
            onSelectNode={setActiveNode}
          />
        )}
      </div>

      {/* Floating Orbital Node Interactive Pill Callouts */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6">
        {/* Top-right Node badge */}
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

        {/* Middle-left Node badge */}
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

        {/* Bottom-right Node badge */}
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
