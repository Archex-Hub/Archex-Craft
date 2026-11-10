"use client";

import { useRef, useMemo, useState, useEffect, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox, Line } from "@react-three/drei";
import * as THREE from "three";

/* ─── colour tokens (CSS-variable-aware would need extra plumbing, so we
       duplicate the brand palette inline for the WebGL context) ───────── */
const PALETTE = {
  forest: "#183d32",
  forestLight: "#235244",
  copper: "#9d3f2a",
  copperGlow: "#c4704f",
  paper: "#f3f0e7",
  ink: "#202923",
  surface: "#fbf9f3",
  muted: "#4f5b53",
  border: "#d3d0c5",
};

/* ─── a single architectural module (rounded-box with subtle glass) ──── */
function ArchModule({
  position,
  size = [1, 1, 1],
  color,
  label,
  delay = 0,
}: {
  position: [number, number, number];
  size?: [number, number, number];
  color: string;
  label: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const target = visible ? 1 : 0;
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, target, delta * 3);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, target, delta * 3);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, target, delta * 3);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group position={position}>
        <RoundedBox
          ref={meshRef}
          args={size}
          radius={0.12}
          smoothness={4}
          scale={0}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={hovered ? PALETTE.copperGlow : color}
            roughness={0.35}
            metalness={0.08}
            transparent
            opacity={0.92}
          />
        </RoundedBox>
        {/* Label positioned above the module */}
        <Text
          position={[0, size[1] / 2 + 0.22, 0]}
          fontSize={0.16}
          color={PALETTE.muted}
          anchorX="center"
          anchorY="bottom"
          maxWidth={2}
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

/* ─── connection lines between modules ────────────────────────────────── */
function ConnectionLine({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const points = useMemo(() => {
    const mid: [number, number, number] = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 0.4,
      (start[2] + end[2]) / 2,
    ];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(24);
  }, [start, end]);

  return (
    <Line
      points={points}
      color={PALETTE.copper}
      lineWidth={1.5}
      transparent
      opacity={0.5}
    />
  );
}

/* ─── central "core" element ──────────────────────────────────────────── */
function CoreElement() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.12;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.45, 1]} />
      <meshStandardMaterial
        color={PALETTE.forest}
        roughness={0.25}
        metalness={0.15}
        wireframe
      />
    </mesh>
  );
}

/* ─── the full scene composition ──────────────────────────────────────── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
  });

  const modules = [
    { pos: [-1.8, 1.0, 0] as [number, number, number], size: [0.9, 0.7, 0.5] as [number, number, number], color: PALETTE.forest, label: "Products", delay: 200 },
    { pos: [1.8, 1.0, -0.3] as [number, number, number], size: [0.9, 0.7, 0.5] as [number, number, number], color: PALETTE.forestLight, label: "Systems", delay: 400 },
    { pos: [-1.5, -1.0, 0.3] as [number, number, number], size: [0.85, 0.65, 0.5] as [number, number, number], color: PALETTE.forestLight, label: "Workflows", delay: 600 },
    { pos: [1.5, -1.0, 0] as [number, number, number], size: [0.85, 0.65, 0.5] as [number, number, number], color: PALETTE.forest, label: "Intelligence", delay: 800 },
    { pos: [0, 1.7, -0.5] as [number, number, number], size: [0.7, 0.5, 0.45] as [number, number, number], color: PALETTE.copper, label: "Integration", delay: 1000 },
  ];

  return (
    <group ref={groupRef}>
      {/* Central core representing the engineering foundation */}
      <CoreElement />

      {/* Architectural modules */}
      {modules.map((m) => (
        <ArchModule
          key={m.label}
          position={m.pos}
          size={m.size}
          color={m.color}
          label={m.label}
          delay={m.delay}
        />
      ))}

      {/* Connection lines from core to each module */}
      {modules.map((m) => (
        <ConnectionLine key={`line-${m.label}`} start={[0, 0, 0]} end={m.pos} />
      ))}
    </group>
  );
}

/* ─── reduced-motion fallback ─────────────────────────────────────────── */
function ReducedMotionFallback() {
  return (
    <div className="hero-3d-fallback" role="img" aria-label="Modular software architecture diagram">
      <svg viewBox="0 0 520 380" className="hero-fallback-svg">
        <title>Modular software architecture</title>
        <desc>
          Five interconnected modules — Products, Systems, Workflows, Intelligence and
          Integration — connected through a central engineering core.
        </desc>
        {/* Central node */}
        <circle cx="260" cy="190" r="28" fill={PALETTE.forest} opacity={0.9} />
        <text x="260" y="195" textAnchor="middle" fill={PALETTE.paper} fontSize="10" fontWeight="600">Core</text>

        {/* Module nodes */}
        {[
          { x: 100, y: 90, label: "Products", color: PALETTE.forest },
          { x: 420, y: 90, label: "Systems", color: PALETTE.forestLight },
          { x: 100, y: 290, label: "Workflows", color: PALETTE.forestLight },
          { x: 420, y: 290, label: "Intelligence", color: PALETTE.forest },
          { x: 260, y: 40, label: "Integration", color: PALETTE.copper },
        ].map((n) => (
          <g key={n.label}>
            <line x1={260} y1={190} x2={n.x} y2={n.y} stroke={PALETTE.copper} strokeWidth={1.5} opacity={0.4} />
            <rect x={n.x - 45} y={n.y - 18} width={90} height={36} rx={4} fill={n.color} opacity={0.9} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill={PALETTE.paper} fontSize="11" fontWeight="500">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

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

/* ─── exported component ──────────────────────────────────────────────── */
export default function ModularScene() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (prefersReducedMotion) {
    return <ReducedMotionFallback />;
  }

  return (
    <div className="hero-3d-canvas">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 4]} intensity={0.8} />
        <directionalLight position={[-3, -2, 2]} intensity={0.3} color={PALETTE.copper} />
        <Scene />
      </Canvas>
    </div>
  );
}
