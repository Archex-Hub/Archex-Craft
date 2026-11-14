"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export const HERO_NODES = [
  {
    id: "product",
    label: "PRODUCT ENGINEERING",
    angle: 0.4,
    color: "#f59e0b",
    description: "Digital products, web apps, SaaS & mobile platforms built for scale.",
  },
  {
    id: "ai",
    label: "AI & SYSTEMS INTEGRATION",
    angle: 2.4,
    color: "#38bdf8",
    description: "Intelligent workflows, context pipelines, APIs & automated data exchange.",
  },
  {
    id: "modernization",
    label: "SOFTWARE MODERNIZATION",
    angle: 4.5,
    color: "#ec4899",
    description: "Stabilizing, decoupling & evolving mission-critical applications.",
  },
];

/* ─── Mesmerizing Iridescent Dispersion & Specular Glass Shader ──────── */
const IridescentShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uActiveNode: { value: 0 },
    uActiveColor: { value: new THREE.Color("#f59e0b") },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vPosition = position;
      
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      vNormal = normalize(mat3(modelMatrix) * normal);
      
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform int uActiveNode;
    uniform vec3 uActiveColor;
    uniform vec2 uMouse;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vPosition;
    varying vec2 vUv;

    // Prismatic cosine spectrum (chromatic thin-film iridescence)
    vec3 spectralPalette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.02, 0.33, 0.67);
      return a + b * cos(6.283185 * (c * t + d));
    }

    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      vec3 normal = normalize(vNormal);

      // Multi-layer Fresnel
      float NdotV = max(0.0, dot(normal, viewDir));
      float fresnel = pow(1.0 - NdotV, 2.4);
      float rimFresnel = pow(1.0 - NdotV, 4.5);

      // Dynamic chromatic wave interference across faceted surface
      float normalDisp = dot(normal, vec3(0.577, 0.577, 0.577));
      float swirl = sin(vPosition.x * 3.2 + sin(vPosition.y * 2.8 + uTime * 0.35)) * 0.55 +
                    cos(vPosition.z * 3.0 + cos(vPosition.x * 2.6 + uTime * 0.28)) * 0.45;
      
      float opd = normalDisp * 1.6 + fresnel * 2.4 + swirl + uTime * 0.1;
      vec3 rainbow = spectralPalette(opd);

      // Deep, dark obsidian glass foundation
      vec3 baseColor = vec3(0.02, 0.025, 0.04);

      // Light 1: Warm Golden Sun Key Light (top-right, matching reference image)
      vec3 keyLightDir = normalize(vec3(4.5, 5.0, 3.5));
      vec3 keyHalf = normalize(keyLightDir + viewDir);
      float keySpec = pow(max(0.0, dot(normal, keyHalf)), 84.0);

      // Light 2: Electric Cyan / Rim Light (lower left)
      vec3 rimLightDir = normalize(vec3(-4.5, -3.0, -2.5));
      vec3 rimHalf = normalize(rimLightDir + viewDir);
      float rimSpec = pow(max(0.0, dot(normal, rimHalf)), 56.0);

      // Simulated environment reflection
      vec3 refl = reflect(-viewDir, normal);
      float reflIndex = refl.y * 1.5 + refl.x * 1.2 + uTime * 0.08;
      vec3 envRefl = spectralPalette(reflIndex);

      // Blend layers
      vec3 finalColor = mix(baseColor, rainbow, fresnel * 0.75 + 0.35);
      finalColor += envRefl * rimFresnel * 0.9;

      // Active discipline node accentuation
      if (uActiveNode > 0) {
        finalColor = mix(finalColor, uActiveColor, 0.28);
      }

      // Specular highlights: key sun glints + rim glints
      finalColor += vec3(1.0, 0.92, 0.75) * keySpec * 3.2;
      finalColor += vec3(0.35, 0.88, 1.0) * rimSpec * 2.2;

      // Additional edge shimmer
      finalColor += rainbow * rimFresnel * 1.4;

      gl_FragColor = vec4(finalColor, 0.98);
    }
  `,
};

function OrganicPrismaticGem({
  activeNode,
  mousePos,
}: {
  activeNode: string | null;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uActiveNode: { value: 0 },
        uActiveColor: { value: new THREE.Color("#f59e0b") },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: IridescentShaderMaterial.vertexShader,
      fragmentShader: IridescentShaderMaterial.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  const gemGeometry = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1.65, 4);
    const pos = geom.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const len = v.length();
      const n1 = Math.sin(v.x * 2.3 + v.y * 1.7) * 0.26;
      const n2 = Math.cos(v.y * 2.9 + v.z * 1.8) * 0.20;
      const n3 = Math.sin(v.z * 3.0 + v.x * 2.2) * 0.16;
      const factor = 1 + (n1 + n2 + n3);
      v.normalize().multiplyScalar(len * factor);
      pos.setXYZ(i, v.x, v.y, v.z);
    }

    geom.computeVertexNormals();
    return geom;
  }, []);

  const innerGeometry = useMemo(() => {
    const geom = new THREE.OctahedronGeometry(0.85, 1);
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    shaderMaterial.uniforms.uTime.value = time;
    shaderMaterial.uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);

    if (activeNode === "product") {
      shaderMaterial.uniforms.uActiveNode.value = 1;
      shaderMaterial.uniforms.uActiveColor.value.set("#f59e0b");
    } else if (activeNode === "ai") {
      shaderMaterial.uniforms.uActiveNode.value = 2;
      shaderMaterial.uniforms.uActiveColor.value.set("#38bdf8");
    } else if (activeNode === "modernization") {
      shaderMaterial.uniforms.uActiveNode.value = 3;
      shaderMaterial.uniforms.uActiveColor.value.set("#ec4899");
    } else {
      shaderMaterial.uniforms.uActiveNode.value = 0;
    }

    const targetRotX = mousePos.current.y * 0.45;
    const targetRotY = mousePos.current.x * 0.65;

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.24;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotX + Math.sin(time * 0.5) * 0.08,
        delta * 2.5
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        targetRotY * 0.5 + Math.cos(time * 0.4) * 0.06,
        delta * 2.5
      );
    }

    if (wireRef.current && meshRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation);
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.38;
      innerRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={gemGeometry} material={shaderMaterial} />

      <mesh ref={wireRef} geometry={gemGeometry}>
        <meshBasicMaterial
          wireframe
          color="#fef08a"
          transparent
          opacity={0.06}
        />
      </mesh>

      <mesh ref={innerRef} geometry={innerGeometry}>
        <meshBasicMaterial
          wireframe
          color="#f59e0b"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function OrbitalSystem({
  activeNode,
  onHoverNode,
  onSelectNode,
}: {
  activeNode: string | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (id: string) => void;
}) {
  const ringGroupRef = useRef<THREE.Group>(null);
  const radius = 2.55;

  const nodePositions = useMemo(() => {
    return HERO_NODES.map((node) => {
      const x = Math.cos(node.angle) * radius;
      const z = Math.sin(node.angle) * radius;
      return { ...node, pos: [x, 0, z] as [number, number, number] };
    });
  }, [radius]);

  useFrame((state, delta) => {
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <group ref={ringGroupRef} rotation={[0.45, 0.2, -0.15]}>
      {/* Primary Orbital Hairline Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.008, radius + 0.008, 128]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Secondary Faint Outer Harmonic Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 1.18 - 0.005, radius * 1.18 + 0.005, 128]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Interactive Beacon Nodes along the orbit */}
      {nodePositions.map((node) => {
        const isActive = activeNode === node.id;
        return (
          <group
            key={node.id}
            position={node.pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverNode(node.id);
            }}
            onPointerOut={() => onHoverNode(null)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node.id);
            }}
          >
            <mesh>
              <sphereGeometry args={[isActive ? 0.16 : 0.08, 24, 24]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isActive ? 0.6 : 0.25}
              />
            </mesh>

            <mesh>
              <sphereGeometry args={[isActive ? 0.08 : 0.045, 16, 16]} />
              <meshBasicMaterial
                color="#ffffff"
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function MesmerizingHeroCrystal({
  activeNode,
  onHoverNode,
  onSelectNode,
}: {
  activeNode: string | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (id: string) => void;
}) {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handlePointerMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[580px] flex items-center justify-center select-none">
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 w-[420px] h-[420px] rounded-full blur-[120px] opacity-40 bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-200"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-1/4 w-[320px] h-[320px] rounded-full blur-[100px] opacity-25 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600"
        aria-hidden="true"
      />

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 44 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} color="#e2e8f0" />

        <directionalLight
          position={[5, 4.5, 3.5]}
          intensity={2.5}
          color="#ffb366"
        />

        <directionalLight
          position={[-4.5, -3, -2]}
          intensity={1.8}
          color="#38bdf8"
        />

        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.35}>
          <OrganicPrismaticGem activeNode={activeNode} mousePos={mousePos} />
          <OrbitalSystem
            activeNode={activeNode}
            onHoverNode={onHoverNode}
            onSelectNode={onSelectNode}
          />
        </Float>

        <Sparkles
          count={32}
          scale={5.5}
          size={1.5}
          speed={0.25}
          opacity={0.4}
          color="#fde047"
        />
      </Canvas>
    </div>
  );
}
