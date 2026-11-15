"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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

const DISCIPLINE_THEMES: Record<
  string,
  { color: string; emissive: string; rim: string }
> = {
  product: {
    color: "#fde68a",
    emissive: "#d97706",
    rim: "#f59e0b",
  },
  ai: {
    color: "#bae6fd",
    emissive: "#0284c7",
    rim: "#38bdf8",
  },
  modernization: {
    color: "#fbcfe8",
    emissive: "#db2777",
    rim: "#ec4899",
  },
};

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
  activeNode,
}: {
  activeNode: string | null;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
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

  // Target theme lookup
  const targetTheme = useMemo(() => {
    const key = activeNode && DISCIPLINE_THEMES[keyNode(activeNode)] ? keyNode(activeNode) : "product";
    return DISCIPLINE_THEMES[key];
  }, [activeNode]);

  function keyNode(id: string): string {
    if (id === "ai") return "ai";
    if (id === "modernization") return "modernization";
    return "product";
  }

  const curColor = useRef(new THREE.Color("#fde68a"));
  const curEmissive = useRef(new THREE.Color("#d97706"));
  const curRim = useRef(new THREE.Color("#f59e0b"));

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (!meshRef.current) return;

    // Smooth color morphing to the active discipline color
    curColor.current.lerp(new THREE.Color(targetTheme.color), delta * 3.5);
    curEmissive.current.lerp(new THREE.Color(targetTheme.emissive), delta * 3.5);
    curRim.current.lerp(new THREE.Color(targetTheme.rim), delta * 3.5);

    glassMaterial.color.copy(curColor.current);
    glassMaterial.emissive.copy(curEmissive.current);
    wireMaterial.color.copy(curRim.current);

    // Completely autonomous, calm, dignified turntable rotation (NO mouse interference!)
    meshRef.current.rotation.y += delta * 0.045;

    // Subtle natural breathing oscillation
    meshRef.current.rotation.x = 0.36 + Math.sin(time * 0.3) * 0.012;
    meshRef.current.rotation.z = -0.16 + Math.cos(time * 0.25) * 0.010;

    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <group ref={groupRef} scale={responsiveScale}>
      {/* Translucent Triangular Faceted Ribbon */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={glassMaterial}
        rotation={[0.36, 0.24, -0.16]}
      />

      {/* Structural Wireframe Tracing Every Triangle */}
      <mesh
        ref={wireRef}
        geometry={geometry}
        material={wireMaterial}
        rotation={[0.36, 0.24, -0.16]}
      />
    </group>
  );
}

/* ─── Studio & Internal Caustic Lighting Rig ──────────────────────────── */
function StudioLightingRig({ activeNode }: { activeNode: string | null }) {
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const centerLightRef = useRef<THREE.PointLight>(null);

  const targetRimColor = useMemo(() => {
    if (activeNode === "ai") return "#38bdf8";
    if (activeNode === "modernization") return "#ec4899";
    return "#f59e0b";
  }, [activeNode]);

  useFrame((_, delta) => {
    const target = new THREE.Color(targetRimColor);
    if (rimLightRef.current) {
      rimLightRef.current.color.lerp(target, delta * 3.5);
    }
    if (centerLightRef.current) {
      centerLightRef.current.color.lerp(target, delta * 3.5);
    }
  });

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
        color={targetRimColor}
      />

      {/* Internal Caustic Core Light: Illuminates Translucent Triangles from Within */}
      <pointLight
        ref={centerLightRef}
        position={[0, 0, 0]}
        intensity={3.2}
        distance={5.0}
        color={targetRimColor}
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
  activeNode,
  onHoverNode: _onHoverNode,
  onSelectNode: _onSelectNode,
}: {
  activeNode: string | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (id: string) => void;
}) {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] flex items-center justify-center select-none">
      {/* Subtle warm architectural horizon backdrop glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 w-[380px] h-[380px] rounded-full blur-[130px] opacity-25 dark:opacity-20 bg-gradient-to-tr from-amber-600 via-copper to-amber-200"
        aria-hidden="true"
      />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <StudioLightingRig activeNode={activeNode} />
        <FacetedTranslucentSculpture activeNode={activeNode} />
      </Canvas>
    </div>
  );
}
