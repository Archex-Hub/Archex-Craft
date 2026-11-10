"use client";

import { useState, useRef, useSyncExternalStore, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ATLAS_MODULES, type AtlasModule } from "./types";

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

export function EngineeringAtlas() {
  const [activeModule, setActiveModule] = useState<AtlasModule>(ATLAS_MODULES[0]);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    // Subtle tilt: max 3 deg
    setTilt({
      rx: -(ny * 5),
      ry: nx * 5
    });
  }

  function handlePointerLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <div
      className="engineering-atlas"
      role="region"
      aria-label="The Engineering Atlas: Interactive Software System Architecture"
    >
      {/* ─── Architectural Frame & Visual Space ─────────────────────────── */}
      <div
        ref={stageRef}
        className="atlas-stage"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Board content with smooth 3D perspective tilt */}
        <div
          className="atlas-board"
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
          }}
        >
          {/* Technical Corner Markers */}
          <div className="atlas-marker atlas-marker-tl" aria-hidden="true">
            <span>SYS.SPEC // 00-ENG-ATLAS</span>
            <span className="atlas-coord">GRID 680×360</span>
          </div>

          <div className="atlas-marker atlas-marker-tr" aria-hidden="true">
            <span className="atlas-status-pill">
              <span className="atlas-pulse-dot" />
              SYSTEM ACTIVE
            </span>
          </div>

          {/* ─── Architectural Blueprint SVG (Precision Grid & Conduits) ─── */}
          <svg
            className="atlas-blueprint-svg"
            viewBox="0 0 680 360"
            role="img"
            aria-label="Architectural blueprint of interconnected digital capabilities"
          >
            <defs>
              <pattern id="atlas-dot-grid" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="11" cy="11" r="0.75" fill="currentColor" opacity="0.22" />
              </pattern>
              <radialGradient id="atlas-core-radial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--copper)" stopOpacity="0.20" />
                <stop offset="60%" stopColor="var(--forest)" stopOpacity="0.07" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Dot-Matrix Grid */}
            <rect width="100%" height="100%" fill="url(#atlas-dot-grid)" />

            {/* Concentric Architectural Rings */}
            <circle cx="340" cy="160" r="130" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
            <circle cx="340" cy="160" r="80" fill="none" stroke="var(--strong-border)" strokeWidth="0.9" opacity="0.4" />
            <circle cx="340" cy="160" r="46" fill="url(#atlas-core-radial)" />

            {/* Crosshair Axes */}
            <line x1="340" y1="20" x2="340" y2="340" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.35" />
            <line x1="60" y1="160" x2="620" y2="160" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.35" />

            {/* Connecting Conduits from Core to Each Module */}
            {ATLAS_MODULES.map((mod) => {
              const isSelected = activeModule.id === mod.id;
              // Smooth quadratic bezier curve
              const midX = (340 + mod.x) / 2;
              const midY = (160 + mod.y) / 2 - (mod.y < 160 ? 12 : -10);
              const pathData = `M 340 160 Q ${midX} ${midY} ${mod.x} ${mod.y}`;

              return (
                <g key={`conduit-${mod.id}`} className={isSelected ? "conduit-active" : "conduit-idle"}>
                  {/* Base Conduit Path */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isSelected ? "var(--copper)" : "var(--border)"}
                    strokeWidth={isSelected ? "2" : "1"}
                    opacity={isSelected ? "0.9" : "0.45"}
                    strokeDasharray={isSelected ? "none" : "3 4"}
                  />
                  {/* Animated Traveling Pulse along active conduit */}
                  {isSelected ? (
                    <path
                      d={pathData}
                      fill="none"
                      stroke="var(--copper)"
                      strokeWidth="2.2"
                      strokeDasharray="10 160"
                      className="conduit-pulse-line"
                    />
                  ) : null}
                  {/* Target Node Attachment Ring */}
                  <circle
                    cx={mod.x}
                    cy={mod.y}
                    r={isSelected ? "6" : "4.5"}
                    fill="var(--surface)"
                    stroke={isSelected ? "var(--copper)" : "var(--strong-border)"}
                    strokeWidth={isSelected ? "1.8" : "1"}
                  />
                </g>
              );
            })}

            {/* Central Kernel Core */}
            <circle cx="340" cy="160" r="26" fill="var(--surface)" stroke="var(--forest)" strokeWidth="1.6" />
            <circle cx="340" cy="160" r="20" fill="color-mix(in srgb, var(--forest) 8%, var(--surface))" stroke="var(--border)" strokeWidth="0.9" strokeDasharray="2 3" />
            <circle cx="340" cy="160" r="6" fill="var(--copper)" />
            <text x="340" y="157" textAnchor="middle" fill="var(--ink)" fontSize="7.5" fontWeight="700" letterSpacing="0.08em" dy="0.3em">
              KERNEL
            </text>
            <text x="340" y="196" textAnchor="middle" fill="var(--muted)" fontSize="7" fontWeight="600" letterSpacing="0.08em">
              SYSTEM CORE
            </text>
          </svg>

          {/* ─── Unified Architectural Specimen Nodes (HTML Cards) ─────────── */}
          <div className="atlas-nodes-container" aria-hidden="false">
            {ATLAS_MODULES.map((mod) => {
              const isSelected = activeModule.id === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  className={`specimen-node ${isSelected ? "is-selected" : ""}`}
                  style={{
                    left: `${(mod.x / 680) * 100}%`,
                    top: `${(mod.y / 360) * 100}%`
                  }}
                  onClick={() => setActiveModule(mod)}
                  onMouseEnter={() => setActiveModule(mod)}
                  onFocus={() => setActiveModule(mod)}
                  aria-pressed={isSelected}
                  aria-label={`Inspect ${mod.title}`}
                >
                  <div className="specimen-node-header">
                    <span className="specimen-layer-tag">{mod.layer}</span>
                    <span className={`specimen-dot ${isSelected ? "is-pulse" : ""}`} />
                  </div>
                  <div className="specimen-node-title">{mod.shortLabel}</div>
                  <div className="specimen-node-sub">{mod.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Architectural Telemetry HUD (Compact Inspector) ─────────────── */}
      <div className="atlas-inspector" aria-live="polite">
        <div className="atlas-inspector-main">
          <div className="atlas-inspector-badge-group">
            <span className="atlas-inspector-layer">{activeModule.layer}</span>
            <span className="atlas-inspector-sep" aria-hidden="true">·</span>
            <span className="atlas-inspector-status">{activeModule.status}</span>
          </div>
          <h3 className="atlas-inspector-title">{activeModule.title}</h3>
          <p className="atlas-inspector-tagline">{activeModule.tagline}</p>
        </div>

        <div className="atlas-inspector-controls">
          <div className="atlas-protocol-list" aria-label="Key engineering standards">
            {activeModule.protocols.map((proto) => (
              <span key={proto} className="atlas-protocol-chip">
                {proto}
              </span>
            ))}
          </div>

          <div className="atlas-inspector-actions">
            <Link
              href="/services"
              className="atlas-inspector-link"
            >
              <span>Explore capabilities</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>

            {/* Quick Module Switcher Pill Buttons */}
            <div className="atlas-quick-nav" role="tablist" aria-label="System capability families">
              {ATLAS_MODULES.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={activeModule.id === m.id}
                  className={`atlas-nav-dot ${activeModule.id === m.id ? "is-active" : ""}`}
                  onClick={() => setActiveModule(m)}
                  title={`Switch to ${m.shortLabel}`}
                >
                  <span className="sr-only">{m.shortLabel}</span>
                  <span className="atlas-nav-num">0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
