"use client";

import dynamic from "next/dynamic";

const ModularScene = dynamic(
  () => import("@/components/three/ModularScene"),
  {
    ssr: false,
    loading: () => (
      <div className="hero-3d-placeholder" aria-hidden="true">
        <span className="sr-only">Loading 3D scene…</span>
      </div>
    ),
  }
);

/**
 * Client wrapper that lazy-loads the Three.js hero scene.
 * Kept as a separate `"use client"` entry point so the parent
 * home page can remain a Server Component if needed.
 */
export function HeroScene() {
  return (
    <div
      className="hero-3d-wrapper"
      role="img"
      aria-label="Interactive 3D modular software architecture diagram"
    >
      <ModularScene />
    </div>
  );
}

