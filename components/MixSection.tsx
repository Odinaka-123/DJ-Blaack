"use client";

import { motion } from "framer-motion";
import { Play, Clock, Radio } from "lucide-react";

// Pre-calculate random durations outside to keep the component pure
const MAX_BARS = 20; // Enough to cover our longest bar array
const DURATIONS = Array.from(
  { length: MAX_BARS },
  () => 1.5 + Math.random() * 0.8,
);

const sets = [
  {
    title: "Sunday Morning Praise",
    genre: "Contemporary Gospel",
    duration: "90 min",
    vibe: "Worshipful · Uplifting · Spirit-Led",
    color: "#F5A623",
    bars: [6, 14, 20, 10, 18, 8, 22, 14, 10, 18, 6, 20, 12, 16, 8],
  },
  {
    title: "Afro-Gospel Vibes",
    genre: "Afro-Gospel",
    duration: "75 min",
    vibe: "Rhythmic · Cultural · Electric",
    color: "#9B59B6",
    bars: [10, 18, 8, 20, 12, 16, 6, 22, 14, 10, 18, 8, 20, 14, 10],
  },
  {
    title: "Kingdom Hip-Hop",
    genre: "Christian Hip-Hop",
    duration: "60 min",
    vibe: "High-Energy · Bold · Next-Gen",
    color: "#E74C3C",
    bars: [20, 8, 16, 22, 10, 18, 12, 6, 20, 14, 8, 18, 10, 22, 16],
  },
  {
    title: "Youth Concert Set",
    genre: "Mixed Gospel",
    duration: "120 min",
    vibe: "Explosive · Dynamic · Generation-Shifting",
    color: "#27AE60",
    bars: [14, 20, 10, 18, 6, 22, 14, 10, 18, 8, 20, 12, 16, 8, 22],
  },
];

function Waveform({ bars, color }: { bars: number[]; color: string }) {
  return (
    <div className="flex items-center gap-0.75 h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full shrink-0"
          style={{
            width: 3,
            height: h,
            background: color,
            opacity: 0.6,
          }}
          animate={{ height: [h, h * 0.3, h, h * 0.6, h] }}
          transition={{
            duration: DURATIONS[i % MAX_BARS], // Use the pre-calculated stable duration
            repeat: Infinity,
            delay: i * 0.06,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function MixSection() {
  return (
    <section id="mixes" className="relative py-32 px-6 overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#0E0618_0%,#0A0608_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px flex-1 max-w-15 bg-linear-to-r from-transparent to-[#F5A623]/40" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#F5A623]">
            Sets & Mixes
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "#F8F0E8" }}
          >
            Signature <span className="text-shimmer">Sounds</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-[#5A4A4A] text-sm"
          >
            <Radio size={14} className="text-[#F5A623]" />
            <span>Available for live performance booking</span>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {sets.map((set, i) => (
            <motion.div
              key={set.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative p-7 rounded-3xl overflow-hidden cursor-pointer"
              style={{
                background: "rgba(14, 8, 12, 0.9)",
                border: `1px solid ${set.color}18`,
              }}
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(ellipse at bottom left, ${set.color}10 0%, transparent 70%)`,
                }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-2 block"
                    style={{ color: set.color }}
                  >
                    {set.genre}
                  </span>
                  <h3
                    className="text-xl font-bold text-[#F8F0E8]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {set.title}
                  </h3>
                </div>

                {/* Play button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: `${set.color}20`,
                    border: `1px solid ${set.color}40`,
                  }}
                  title="Coming Soon"
                >
                  <Play
                    size={16}
                    style={{ color: set.color }}
                    fill={set.color}
                  />
                </motion.button>
              </div>

              {/* Waveform */}
              <div className="mb-6">
                <Waveform bars={set.bars} color={set.color} />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5A4A4A] italic">
                  {set.vibe}
                </span>
                <div className="flex items-center gap-1.5 text-[#5A4A4A]">
                  <Clock size={12} />
                  <span className="text-xs">{set.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-[#3A2A3A] text-sm"
        >
          Custom set curation available for every event · Contact for booking
          details
        </motion.p>
      </div>
    </section>
  );
}
