"use client";

import { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Torus,
  MeshDistortMaterial,
  Float,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { ChevronDown } from "lucide-react";

/* ── Orbiting particles Data (Outside to ensure purity) ── */
const PARTICLE_COUNT = 300;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);

// Generate random positions once at module load level
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const r = 3.5 + Math.random() * 3;
  const theta = Math.random() * Math.PI * 2;
  PARTICLE_POSITIONS[i * 3] = r * Math.cos(theta);
  PARTICLE_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 2;
  PARTICLE_POSITIONS[i * 3 + 2] = r * Math.sin(theta);
}

/* ── 3D Vinyl Record ─────────────────────────────────── */
function VinylRecord() {
  const groupRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= 0.008;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z += 0.015;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef}>
        {/* Outer vinyl disc */}
        <mesh>
          <cylinderGeometry args={[2.2, 2.2, 0.08, 64]} />
          <meshStandardMaterial
            color="#0f0010"
            roughness={0.05}
            metalness={0.9}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Groove rings */}
        {[1.0, 1.2, 1.4, 1.6, 1.8, 2.0].map((r, i) => (
          <Torus
            key={i}
            args={[r, 0.006, 8, 80]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color="#F5A623"
              emissive="#F5A623"
              emissiveIntensity={0.1}
              roughness={0.2}
              metalness={1}
            />
          </Torus>
        ))}

        {/* Center label */}
        <mesh ref={innerRef} position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.01, 32]} />
          <MeshDistortMaterial
            color="#F5A623"
            emissive="#D4861A"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.8}
            distort={0.1}
            speed={3}
          />
        </mesh>

        {/* Spindle hole */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.12, 16]} />
          <meshStandardMaterial color="#0A0608" />
        </mesh>

        {/* Ambient glow disc */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[2.4, 2.4, 0.02, 64]} />
          <meshStandardMaterial
            color="#F5A623"
            transparent
            opacity={0.04}
            emissive="#F5A623"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Orbiting particles ──────────────────────────────── */
function Particles() {
  const ref = useRef<THREE.Points>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#F5A623" transparent opacity={0.6} />
    </points>
  );
}

/* ── Hero Section ────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1E0D18_0%,#0A0608_70%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#FFC845 1px, transparent 1px), linear-gradient(90deg, #FFC845 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 2, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#FFD580" />
            <pointLight
              position={[-5, -5, -5]}
              intensity={0.5}
              color="#9B59B6"
            />
            <spotLight
              position={[0, 10, 0]}
              angle={0.3}
              penumbra={1}
              intensity={2}
              color="#F5A623"
              castShadow
            />
            <VinylRecord />
            <Particles />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Text content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="flex gap-1 items-end h-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="wave-bar"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#F5A623] font-semibold">
            Gospel Disc Jockey • Lagos, Nigeria
          </span>
          <div className="flex gap-1 items-end h-6">
            {[5, 4, 3, 2, 1].map((i) => (
              <span
                key={i}
                className="wave-bar"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-shimmer glow-text-gold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 14vw, 10rem)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "0.05em",
          }}
        >
          DJ BLAACK
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl tracking-[0.25em] uppercase text-[#8A7070] font-light"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Redefining Gospel Entertainment
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-4 text-sm text-[#5A4A4A] tracking-widest max-w-lg mx-auto"
        >
          Nigeria&apos;s Youngest Male Gospel DJ · Born 2025 · Spirit-Led Sounds
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-bold bg-linear-to-r from-[#F5A623] to-[#D4861A] text-[#0A0608] hover:from-[#FFD580] hover:to-[#F5A623] transition-all duration-300 glow-gold"
          >
            Book a Set
          </a>
          <a
            href="#about"
            className="px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-bold border border-[#F5A623]/30 text-[#FFC845] hover:bg-[#F5A623]/10 transition-all duration-300"
          >
            Discover More
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-[#5A4A4A]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-[#F5A623]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
