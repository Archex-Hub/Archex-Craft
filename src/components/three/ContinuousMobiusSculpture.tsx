"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

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

const DISCIPLINE_PHASES = [
  {
    id: "product",
    color: new THREE.Color("#fde68a"), // Soft translucent amber
    emissive: new THREE.Color("#d97706"), // Rich amber caustic glow
    rim: new THREE.Color("#f59e0b"), // Key amber rim
  },
  {
    id: "ai",
    color: new THREE.Color("#bae6fd"), // Soft translucent sky
    emissive: new THREE.Color("#0284c7"), // Rich cyan caustic glow
    rim: new THREE.Color("#38bdf8"), // Key sky rim
  },
  {
    id: "modernization",
    color: new THREE.Color("#fbcfe8"), // Soft translucent rose
    emissive: new THREE.Color("#db2777"), // Rich magenta caustic glow
    rim: new THREE.Color("#ec4899"), // Key rose rim
  },
];

const CYCLE_DURATION = 18; // 18-second continuous routine cycle (6s per discipline)

/* ─── Procedural Faceted Möbius Ribbon Geometry (Triangular Panels) ───── */
function buildFacetedMobiusGeometry({
  scale = 0.82,
  width = 0.46,
  thickness = 0.08,
  segments = 130,
  twists = 3, // 3 half-twists = Mobius topology on 3-lobe knot
}: {
  scale?: number;
  width?: number;
  thickness?: number;
  segments?: number;
  twists?: number;
} = {}) {
  const points: THREE.Vector3[] = [];

  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    // Parameterized Trefoil space curve with architectural proportions
    const x = (Math.sin(t) + 2 * Math.sin(2 * t)) * 0.72;
    const y = (Math.cos(t) - 2 * Math.cos(2 * t)) * 0.72;
    const z = -Math.sin(3 * t) * 0.95;
    points.push(new THREE.Vector3(x * scale, y * scale, z * scale));
  }

  // Tangents via central difference
  const tangents: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const prev = points[(i - 1 + segments) % segments];
    const next = points[(i + 1) % segments];
    tangents.push(new THREE.Vector3().subVectors(next, prev).normalize());
  }

  // Rotation-Minimizing / Bishop frame
  let initNorm = new THREE.Vector3(0, 0, 1);
  if (Math.abs(tangents[0].dot(initNorm)) > 0.85) {
    initNorm = new THREE.Vector3(0, 1, 0);
  }
  const normals: THREE.Vector3[] = [
    new THREE.Vector3().crossVectors(tangents[0], initNorm).normalize(),
  ];
  const binormals: THREE.Vector3[] = [
    new THREE.Vector3().crossVectors(tangents[0], normals[0]).normalize(),
  ];

  for (let i = 1; i < segments; i++) {
    const t0 = tangents[i - 1];
    const t1 = tangents[i];
    const v = new THREE.Vector3().crossVectors(t0, t1);
    const cosAngle = THREE.MathUtils.clamp(t0.dot(t1), -1, 1);
    const angle = Math.acos(cosAngle);

    const norm = normals[i - 1].clone();
    if (v.lengthSq() > 1e-8) {
      v.normalize();
      norm.applyAxisAngle(v, angle);
    }
    norm.normalize();
    normals.push(norm);
    binormals.push(new THREE.Vector3().crossVectors(t1, norm).normalize());
  }

  // Holonomy closure drift angle
  const tLast = tangents[segments - 1];
  const t0 = tangents[0];
  const v = new THREE.Vector3().crossVectors(tLast, t0);
  const cosA = THREE.MathUtils.clamp(tLast.dot(t0), -1, 1);
  const finalNorm = normals[segments - 1].clone();
  if (v.lengthSq() > 1e-8) {
    v.normalize();
    finalNorm.applyAxisAngle(v, Math.acos(cosA));
  }
  finalNorm.normalize();

  const drift = Math.atan2(
    new THREE.Vector3().crossVectors(finalNorm, normals[0]).dot(t0),
    finalNorm.dot(normals[0])
  );

  // 8-point profile with anti-symmetry
  const halfW = width * 0.5;
  const halfT = thickness * 0.5;
  const P = [
    new THREE.Vector2(-halfW, halfT),
    new THREE.Vector2(0, halfT * 1.08), // crown top
    new THREE.Vector2(halfW, halfT),
    new THREE.Vector2(halfW, 0),
    new THREE.Vector2(halfW, -halfT),
    new THREE.Vector2(0, -halfT * 1.08), // crown bottom
    new THREE.Vector2(-halfW, -halfT),
    new THREE.Vector2(-halfW, 0),
  ];
  const profileCount = P.length; // 8
  const halfCount = profileCount / 2; // 4

  const ringVertices: THREE.Vector3[][] = [];
  for (let i = 0; i < segments; i++) {
    const fraction = i / segments;
    const twistAngle = fraction * drift + fraction * Math.PI * twists;
    const center = points[i];
    const norm = normals[i];
    const binorm = binormals[i];

    const cosT = Math.cos(twistAngle);
    const sinT = Math.sin(twistAngle);
    const uAxis = new THREE.Vector3()
      .copy(norm)
      .multiplyScalar(cosT)
      .addScaledVector(binorm, sinT)
      .normalize();
    const vAxis = new THREE.Vector3()
      .copy(norm)
      .multiplyScalar(-sinT)
      .addScaledVector(binorm, cosT)
      .normalize();

    const currentRing: THREE.Vector3[] = [];
    for (let j = 0; j < profileCount; j++) {
      const p2 = P[j];
      const pt = new THREE.Vector3()
        .copy(center)
        .addScaledVector(uAxis, p2.x)
        .addScaledVector(vAxis, p2.y);
      currentRing.push(pt);
    }
    ringVertices.push(currentRing);
  }

  // Construct explicit flat triangular facets
  const triPositions: number[] = [];
  const isOddTwist = Math.abs(twists % 2) === 1;

  for (let i = 0; i < segments; i++) {
    const nextI = (i + 1) % segments;
    const isClosingStep = i === segments - 1;
    const offset = isClosingStep && isOddTwist ? halfCount : 0;

    const r1 = ringVertices[i];
    const r2 = ringVertices[nextI];

    for (let j = 0; j < profileCount; j++) {
      const nextJ = (j + 1) % profileCount;
      const pA = r1[j];
      const pB = r2[(j + offset) % profileCount];
      const pC = r2[(nextJ + offset) % profileCount];
      const pD = r1[nextJ];

      // Tri 1: A -> B -> D
      triPositions.push(pA.x, pA.y, pA.z);
      triPositions.push(pB.x, pB.y, pB.z);
      triPositions.push(pD.x, pD.y, pD.z);

      // Tri 2: B -> C -> D
      triPositions.push(pB.x, pB.y, pB.z);
      triPositions.push(pC.x, pC.y, pC.z);
      triPositions.push(pD.x, pD.y, pD.z);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(triPositions, 3)
  );
  geometry.computeVertexNormals();
  return geometry;
}

/* ─── Translucent Triangular Faceted Sculpture Mesh ───────────────────── */
function FacetedTranslucentSculpture({
  onPhaseChange,
  rimLightRef,
  centerLightRef,
  onCursorChange,
}: {
  onPhaseChange?: (phaseId: string) => void;
  rimLightRef: React.RefObject<THREE.DirectionalLight | null>;
  centerLightRef: React.RefObject<THREE.PointLight | null>;
  onCursorChange?: (cursor: "default" | "grab" | "grabbing") => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const rotGroupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Responsive scale ensuring proportional fit on mobile viewports
  const responsiveScale = useMemo(() => {
    const aspect = viewport.width / viewport.height;
    return aspect < 1 ? Math.min(1, Math.max(0.78, aspect * 1.05)) : 1;
  }, [viewport.width, viewport.height]);

  const geometry = useMemo(() => {
    return buildFacetedMobiusGeometry({
      scale: 0.82,
      width: 0.46,
      thickness: 0.08,
      segments: 130,
      twists: 3,
    });
  }, []);

  // Translucent Crystalline Material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#fde68a"),
      emissive: new THREE.Color("#d97706"),
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0.85, // Reliable high-fidelity translucency across all viewports
      roughness: 0.18, // Frosted architectural diffusion
      metalness: 0.14,
      clearcoat: 0.7,
      clearcoatRoughness: 0.14,
      reflectivity: 0.9,
      flatShading: true, // Crisp flat triangular facets!
      side: THREE.DoubleSide,
    });
  }, []);

  // Architectural Titanium Wireframe Mullions
  const wireMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#f59e0b"),
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
  }, []);

  // Routine color cycling refs
  const lastReportedPhase = useRef<string>("product");
  const blendedColor = useRef(new THREE.Color());
  const blendedEmissive = useRef(new THREE.Color());
  const blendedRim = useRef(new THREE.Color());

  // Physical 3D orientation & momentum physics
  const initialEuler = useMemo(() => new THREE.Euler(0.36, 0.24, -0.16, "YXZ"), []);
  const currentQuat = useRef(new THREE.Quaternion().setFromEuler(initialEuler));
  const angularVelocity = useRef(new THREE.Vector3(0, 0, 0));
  const pinchScale = useRef(1.0);

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastPointerTime = useRef(0);
  const recentDeltas = useRef<{ dx: number; dy: number; dt: number }[]>([]);

  // Reusable vectors/quaternions for zero allocation in animation loop
  const worldY = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const tempDeltaQuat = useMemo(() => new THREE.Quaternion(), []);
  const ambientQuat = useMemo(() => new THREE.Quaternion(), []);

  // Pointer event handlers
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    onCursorChange?.("grabbing");
    lastPointer.current = { x: e.clientX, y: e.clientY };
    lastPointerTime.current = performance.now();
    recentDeltas.current = [];
    angularVelocity.current.set(0, 0, 0);

    const el = e.nativeEvent.target as HTMLElement;
    if (el?.setPointerCapture) {
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDraggingRef.current) return;
    e.stopPropagation();

    const now = performance.now();
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    const dt = Math.max(now - lastPointerTime.current, 1);

    lastPointer.current = { x: e.clientX, y: e.clientY };
    lastPointerTime.current = now;

    recentDeltas.current.push({ dx, dy, dt });
    if (recentDeltas.current.length > 5) {
      recentDeltas.current.shift();
    }

    const distSq = dx * dx + dy * dy;
    if (distSq > 0.05) {
      const dist = Math.sqrt(distSq);
      // Perpendicular axis to screen drag vector for direct omnidirectional manipulation
      const axis = new THREE.Vector3(dy, dx, 0).normalize();
      const sensitivity = 0.0054;
      const angle = dist * sensitivity;

      const deltaQ = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      currentQuat.current.premultiply(deltaQ);
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (!isDraggingRef.current) return;
    e.stopPropagation();
    isDraggingRef.current = false;
    onCursorChange?.(isHoveredRef.current ? "grab" : "default");

    const el = e.nativeEvent.target as HTMLElement;
    if (el?.releasePointerCapture) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }

    // Momentum calculation from recent gesture history
    if (recentDeltas.current.length > 0) {
      let totalDx = 0;
      let totalDy = 0;
      let totalDt = 0;
      for (const d of recentDeltas.current) {
        totalDx += d.dx;
        totalDy += d.dy;
        totalDt += d.dt;
      }
      const count = recentDeltas.current.length;
      const avgDt = Math.max(totalDt / count, 8);
      const avgDx = totalDx / count;
      const avgDy = totalDy / count;

      const timeSinceLastMove = performance.now() - lastPointerTime.current;
      if (timeSinceLastMove < 90) {
        const dist = Math.sqrt(avgDx * avgDx + avgDy * avgDy);
        if (dist > 1.0) {
          const axis = new THREE.Vector3(avgDy, avgDx, 0).normalize();
          const frameFactor = 16.6 / avgDt;
          const speed = dist * 0.0054 * frameFactor;
          // Graceful clamping to ensure elegant spin rather than frantic blur
          const clampedSpeed = Math.min(speed, 0.075);
          angularVelocity.current.copy(axis.multiplyScalar(clampedSpeed));
        } else {
          angularVelocity.current.set(0, 0, 0);
        }
      } else {
        angularVelocity.current.set(0, 0, 0);
      }
    }
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isHoveredRef.current = true;
    if (!isDraggingRef.current) {
      onCursorChange?.("grab");
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isHoveredRef.current = false;
    if (!isDraggingRef.current) {
      onCursorChange?.("default");
    }
  };

  // Window-level safety cleanup
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        onCursorChange?.("default");
      }
    };
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
    };
  }, [onCursorChange]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (!meshRef.current || !rotGroupRef.current) return;

    // Routine continuous autonomous color blending
    const numPhases = DISCIPLINE_PHASES.length;
    const phaseDuration = CYCLE_DURATION / numPhases;
    const normalizedTime = (time % CYCLE_DURATION) / phaseDuration;
    const index = Math.floor(normalizedTime);
    const frac = normalizedTime - index;

    // Smoothstep interpolation (40% hold, 60% smooth transition)
    let blendFactor = 0;
    if (frac > 0.35) {
      const t = (frac - 0.35) / 0.65;
      blendFactor = t * t * (3 - 2 * t);
    }

    const currentPhase = DISCIPLINE_PHASES[index % numPhases];
    const nextPhase = DISCIPLINE_PHASES[(index + 1) % numPhases];

    blendedColor.current.lerpColors(currentPhase.color, nextPhase.color, blendFactor);
    blendedEmissive.current.lerpColors(currentPhase.emissive, nextPhase.emissive, blendFactor);
    blendedRim.current.lerpColors(currentPhase.rim, nextPhase.rim, blendFactor);

    glassMaterial.color.copy(blendedColor.current);
    glassMaterial.emissive.copy(blendedEmissive.current);
    wireMaterial.color.copy(blendedRim.current);

    // Sync lights
    if (rimLightRef.current) {
      rimLightRef.current.color.copy(blendedRim.current);
    }
    if (centerLightRef.current) {
      centerLightRef.current.color.copy(blendedRim.current);
    }

    // Report active phase to synchronized badge indicators
    const currentActiveId = blendFactor > 0.5 ? nextPhase.id : currentPhase.id;
    if (currentActiveId !== lastReportedPhase.current) {
      lastReportedPhase.current = currentActiveId;
      onPhaseChange?.(currentActiveId);
    }

    // Tactile pinch spring: slight elastic compression during grip (0.952), subtle hover reaction (1.018), resting at 1.0
    const targetScale = isDraggingRef.current
      ? 0.952
      : isHoveredRef.current
      ? 1.018
      : 1.0;
    pinchScale.current = THREE.MathUtils.damp(
      pinchScale.current,
      targetScale,
      9,
      delta
    );
    rotGroupRef.current.scale.setScalar(pinchScale.current);

    // Dynamic tactile emissive glow during pinch
    const targetEmissiveIntensity = isDraggingRef.current ? 0.34 : 0.22;
    glassMaterial.emissiveIntensity = THREE.MathUtils.damp(
      glassMaterial.emissiveIntensity,
      targetEmissiveIntensity,
      6,
      delta
    );

    // 3D Omnidirectional Rotation & Graceful Momentum Physics
    if (isDraggingRef.current) {
      rotGroupRef.current.quaternion.copy(currentQuat.current);
    } else {
      const velLength = angularVelocity.current.length();

      if (velLength > 0.0003) {
        // Active inertia spin along the exact release vector
        const axis = angularVelocity.current.clone().normalize();
        const angle = velLength * (delta * 60);
        tempDeltaQuat.setFromAxisAngle(axis, angle);
        currentQuat.current.premultiply(tempDeltaQuat);

        // Fluid physical air friction damping
        const damping = Math.pow(0.954, delta * 60);
        angularVelocity.current.multiplyScalar(damping);

        // Seamless handover back to ambient turntable drift as velocity decays
        const ambientWeight = 1 - Math.min(1, velLength / 0.014);
        if (ambientWeight > 0) {
          ambientQuat.setFromAxisAngle(worldY, delta * 0.045 * ambientWeight);
          currentQuat.current.premultiply(ambientQuat);
        }
      } else {
        // Pure dignified ambient turntable drift
        angularVelocity.current.set(0, 0, 0);
        ambientQuat.setFromAxisAngle(worldY, delta * 0.045);
        currentQuat.current.premultiply(ambientQuat);
      }

      rotGroupRef.current.quaternion.copy(currentQuat.current);
    }
  });

  return (
    <group scale={responsiveScale} position={[0, 0.28, 0]}>
      <group ref={rotGroupRef}>
        {/* Translucent Triangular Faceted Ribbon */}
        <mesh
          ref={meshRef}
          geometry={geometry}
          material={glassMaterial}
        />

        {/* Structural Wireframe Tracing Every Triangle */}
        <mesh
          ref={wireRef}
          geometry={geometry}
          material={wireMaterial}
        />

        {/* Interactive Hit Sphere: Seamless omnidirectional grab & spin zone */}
        <mesh
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[2.08, 24, 24]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Studio & Internal Caustic Lighting Rig ──────────────────────────── */
function StudioLightingRig({
  rimLightRef,
  centerLightRef,
}: {
  rimLightRef: React.RefObject<THREE.DirectionalLight | null>;
  centerLightRef: React.RefObject<THREE.PointLight | null>;
}) {
  return (
    <>
      {/* Studio Ambient Daylight */}
      <ambientLight intensity={0.92} color="#f8fafc" />

      {/* Key Directional White Light: Sharp Specular Facet Highlights */}
      <directionalLight
        position={[4.5, 5.5, 4.0]}
        intensity={3.4}
        color="#ffffff"
      />

      {/* Dynamic Color Grazing Rim Light: Highlights Facet Edges */}
      <directionalLight
        ref={rimLightRef}
        position={[-4.5, -2.5, -2.5]}
        intensity={4.4}
        color="#f59e0b"
      />

      {/* Internal Caustic Core Light: Illuminates Translucent Triangles from Within */}
      <pointLight
        ref={centerLightRef}
        position={[0, 0.28, 0]}
        intensity={3.2}
        distance={5.0}
        color="#f59e0b"
      />

      {/* Champagne Glint on Top Facet Crests */}
      <directionalLight
        position={[-2.0, 5.0, -2.0]}
        intensity={1.8}
        color="#fef3c7"
      />

      {/* Soft Slate Fill (retains dimensional depth) */}
      <directionalLight
        position={[-3.5, 3.5, 3.5]}
        intensity={1.2}
        color="#94a3b8"
      />
    </>
  );
}

/* ─── Main Hero Sculpture Component ───────────────────────────────────── */
export default function ContinuousMobiusSculpture({
  onPhaseChange,
}: {
  onPhaseChange?: (phaseId: string) => void;
  activeNode?: string | null;
  onHoverNode?: (id: string | null) => void;
  onSelectNode?: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const centerLightRef = useRef<THREE.PointLight>(null);
  const [cursor, setCursor] = useState<"default" | "grab" | "grabbing">("default");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? true);
      },
      { rootMargin: "120px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] flex items-center justify-center select-none"
      style={{ cursor }}
    >
      {/* Subtle warm architectural horizon backdrop glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 w-[380px] h-[380px] rounded-full blur-[130px] opacity-25 dark:opacity-20 bg-gradient-to-tr from-amber-600 via-copper to-amber-200"
        aria-hidden="true"
      />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent", cursor, touchAction: "pan-y" }}
        className="pointer-events-auto"
      >
        <StudioLightingRig
          rimLightRef={rimLightRef}
          centerLightRef={centerLightRef}
        />
        <FacetedTranslucentSculpture
          onPhaseChange={onPhaseChange}
          rimLightRef={rimLightRef}
          centerLightRef={centerLightRef}
          onCursorChange={setCursor}
        />
      </Canvas>
    </div>
  );
}
