"use client";

import { useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
export const HERO_NODES = [
  {
    id: "product",
    label: "PRODUCT ENGINEERING",
    color: "#f59e0b",
  },
  {
    id: "ai",
    label: "AI & SYSTEMS INTEGRATION",
    color: "#38bdf8",
  },
  {
    id: "modernization",
    label: "SOFTWARE MODERNIZATION",
    color: "#ec4899",
  },
];

const DynamicSculpture = dynamic(
  () => import("./ContinuousMobiusSculpture"),
  {
    ssr: false,
    loading: () => <ReducedMotionFallback activeNode="product" />,
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

function ReducedMotionFallback({
  activeNode: _activeNode,
}: {
  activeNode?: string | null;
}) {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] flex items-center justify-center p-2 sm:p-4">
      {/* Annotated Product Engineering Frame (Template B) */}
      <div className="w-full max-w-[500px] rounded-xl border border-border/80 bg-[#0d1117] text-slate-200 shadow-2xl overflow-hidden font-mono text-[11px] sm:text-xs">
        {/* Console Header Chrome */}
        <div className="flex items-center justify-between border-b border-border/40 bg-[#161b22] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f85149]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d29922]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3fb950]/80" />
            <span className="ml-2 font-mono text-[10px] text-slate-400">
              archex-craft / core-engine.ts
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>200 OK · 18ms</span>
          </div>
        </div>

        {/* Code Specimen */}
        <div className="p-4 sm:p-5 space-y-2 text-slate-300 leading-relaxed overflow-x-auto">
          <div className="text-slate-500">{"// Archex Craft — Production Architecture Specimen"}</div>
          <div>
            <span className="text-[#ff7b72]">export const</span>{" "}
            <span className="text-[#79c0ff]">systemArchitecture</span> ={" "}
            <span className="text-[#d2a8ff]">defineSystem</span>({"{"}
          </div>
          <div className="pl-4">
            <span className="text-[#7ee787]">practice</span>:{" "}
            <span className="text-[#a5d6ff]">&quot;Archex Craft&quot;</span>,
          </div>
          <div className="pl-4">
            <span className="text-[#7ee787]">runtime</span>:{" "}
            <span className="text-[#a5d6ff]">&quot;TypeScript + Next.js App Router&quot;</span>,
          </div>
          <div className="pl-4">
            <span className="text-[#7ee787]">verification</span>: {"{"}
          </div>
          <div className="pl-8">
            <span className="text-[#7ee787]">schemas</span>:{" "}
            <span className="text-[#a5d6ff]">&quot;Strict Zod Validation&quot;</span>,
          </div>
          <div className="pl-8">
            <span className="text-[#7ee787]">automatedTesting</span>:{" "}
            <span className="text-[#a5d6ff]">&quot;Playwright E2E + Unit Suites&quot;</span>,
          </div>
          <div className="pl-8">
            <span className="text-[#7ee787]">codeOwnership</span>:{" "}
            <span className="text-[#a5d6ff]">&quot;100% Client Source Code &amp; IP&quot;</span>,
          </div>
          <div className="pl-4">{"}"},</div>
          <div className="pl-4">
            <span className="text-[#7ee787]">delivery</span>: {"{"}
          </div>
          <div className="pl-8">
            <span className="text-[#7ee787]">designHandoff</span>:{" "}
            <span className="text-[#a5d6ff]">&quot;Direct spec intake from Archex Studio&quot;</span>,
          </div>
          <div className="pl-8">
            <span className="text-[#7ee787]">architectureReview</span>:{" "}
            <span className="text-[#a5d6ff]">&quot;Direct Senior Engineering Access&quot;</span>,
          </div>
          <div className="pl-4">{"}"}</div>
          <div>{"});"}</div>
        </div>

        {/* Console Footer Status Strip */}
        <div className="border-t border-border/40 bg-[#161b22] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-semibold">✓ E2E Verified</span>
            <span className="text-slate-500">|</span>
            <span>Zero Lock-in</span>
          </div>
          <span className="text-slate-400">branch: main · v2.4.0</span>
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  const [activeNode, setActiveNode] = useState<string>("product");

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Canvas / Fallback */}
      <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px]">
        {prefersReducedMotion ? (
          <ReducedMotionFallback activeNode={activeNode} />
        ) : (
          <DynamicSculpture onPhaseChange={setActiveNode} />
        )}
      </div>
    </div>
  );
}
