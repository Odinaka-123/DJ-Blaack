"use client";

import { motion } from "framer-motion";
import { Star, Mic2, MapPin, Users, Music, Zap } from "lucide-react";

const highlights = [
  {
    icon: Star,
    title: "Youngest Male Gospel DJ",
    desc: "Breaking barriers and setting new standards in the Nigerian gospel industry since 2025.",
    color: "#F5A623",
  },
  {
    icon: MapPin,
    title: "Lagos, Nigeria",
    desc: "Serving the vibrant Lagos gospel community and beyond with spirit-led performances.",
    color: "#E74C3C",
  },
  {
    icon: Users,
    title: "Diverse Event Portfolio",
    desc: "Experienced performing at church conferences, youth gatherings, and social gospel events across Lagos.",
    color: "#9B59B6",
  },
  {
    icon: Music,
    title: "Immersive Sets",
    desc: "Curating multi-genre experiences that blend contemporary gospel, Afro-Gospel, and Christian Hip-Hop.",
    color: "#27AE60",
  },
  {
    icon: Mic2,
    title: "Ministry Gatherings",
    desc: "Creating sacred atmospheres where music becomes a vehicle for worship and spiritual connection.",
    color: "#3498DB",
  },
  {
    icon: Zap,
    title: "High-Energy Excellence",
    desc: "Known for electrifying transitions and crowd engagement that keeps the spirit alive.",
    color: "#F39C12",
  },
];

export default function HighlightsSection() {
  return (
    <section id="highlights" className="relative py-32 px-6 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#1A0A14_0%,#0A0608_60%)]" />

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
            Career
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "#F8F0E8" }}
          >
            Career <span className="text-shimmer">Highlights</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[#5A4A4A] max-w-xs text-sm leading-relaxed"
          >
            A rising force in Nigeria&apos;s gospel entertainment landscape —
            driven by faith, music, and purpose.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="group relative p-7 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(18, 10, 15, 0.8)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${h.color}20 0%, transparent 100%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${h.color}15`,
                    border: `1px solid ${h.color}25`,
                  }}
                >
                  <Icon size={20} style={{ color: h.color }} />
                </div>

                <h3
                  className="font-semibold text-base mb-3 text-[#F8F0E8]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {h.title}
                </h3>

                <p className="text-xs text-[#5A4A4A] leading-relaxed">
                  {h.desc}
                </p>

                {/* Corner dot */}
                <div
                  className="absolute top-5 right-5 w-2 h-2 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ background: h.color }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Timeline bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative h-px origin-left"
          style={{
            background: "linear-gradient(90deg, #F5A623, #9B59B6, transparent)",
          }}
        >
          <div className="absolute left-0 -top-4 text-[10px] tracking-[0.3em] uppercase text-[#F5A623]">
            2025
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 text-[10px] tracking-[0.3em] uppercase text-[#8A7070]">
            Now
          </div>
          <div className="absolute right-0 -top-4 text-[10px] tracking-[0.3em] uppercase text-[#5A4A4A]">
            Beyond
          </div>
          {/* Glow dot at start */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full -translate-x-1/2"
            style={{
              background: "#F5A623",
              boxShadow: "0 0 12px #F5A623",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
