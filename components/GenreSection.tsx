"use client";

import { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

const genres = [
  {
    title: "Contemporary Gospel",
    desc: "Modern worship anthems and praise tracks that stir the soul and lift the spirit.",
    icon: "✝",
    color: "#F5A623",
    delay: 0,
  },
  {
    title: "Afro-Gospel",
    desc: "African rhythms fused with the gospel message — a sound born from the heart of Nigeria.",
    icon: "🌍",
    color: "#9B59B6",
    delay: 0.1,
  },
  {
    title: "Christian Hip-Hop",
    desc: "Hard-hitting beats carrying scripture. Culture-shifting lyricism for the next generation.",
    icon: "🎤",
    color: "#E74C3C",
    delay: 0.2,
  },
];

function FloatingOrb({
  color,
  position,
}: {
  color: string;
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={ref} args={[0.7, 32, 32]} position={position}>
        <MeshWobbleMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          factor={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#F5A623" />
      <pointLight position={[-3, -3, -3]} intensity={0.8} color="#9B59B6" />
      <FloatingOrb color="#F5A623" position={[-2.5, 0.5, 0]} />
      <FloatingOrb color="#7B2FBE" position={[0, -0.5, -1]} />
      <FloatingOrb color="#C0392B" position={[2.5, 0.8, 0]} />
    </>
  );
}

export default function GenreSection() {
  return (
    <section id="genres" className="relative py-32 px-6 overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px flex-1 max-w-15 bg-linear-to-r from-transparent to-[#F5A623]/40" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#F5A623]">
            Sound
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-bold mb-20"
          style={{ fontFamily: "var(--font-display)", color: "#F8F0E8" }}
        >
          Genre Focus
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {genres.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: g.delay,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-3xl cursor-default overflow-hidden"
              style={{
                background: "rgba(20, 10, 18, 0.85)",
                border: `1px solid ${g.color}22`,
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Glow corner */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ background: g.color }}
              />

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 relative z-10"
                style={{
                  background: `${g.color}15`,
                  border: `1px solid ${g.color}30`,
                }}
              >
                {g.icon}
              </div>

              {/* Number */}
              <span
                className="absolute top-6 right-8 text-7xl font-black opacity-5 select-none"
                style={{ fontFamily: "var(--font-display)", color: g.color }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className="text-xl font-bold mb-4 relative z-10"
                style={{ fontFamily: "var(--font-display)", color: "#F8F0E8" }}
              >
                {g.title}
              </h3>

              <p className="text-sm text-[#6A5A5A] leading-relaxed relative z-10">
                {g.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="mt-8 h-px w-0 group-hover:w-full transition-all duration-700"
                style={{
                  background: `linear-gradient(90deg, ${g.color}60, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
