"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 15, suffix: "", label: "Years Old" },
  { value: 1, suffix: "st", label: "Youngest Male Gospel DJ in Nigeria" },
  { value: 2025, suffix: "", label: "Professional Journey Started" },
  { value: 100, suffix: "+", label: "Spirit-filled Sets" },
];

function AnimatedNumber({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-shimmer"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {count}
      {suffix}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 right-0 w-150 h-150 rounded-full bg-[#F5A623]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-purple-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-15 bg-linear-to-r from-transparent to-[#F5A623]/40" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#F5A623]">
            The Story
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-bold leading-[1.1] mb-8"
              style={{ fontFamily: "var(--font-display)", color: "#F8F0E8" }}
            >
              A New Voice for <span className="text-shimmer">Gospel Music</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-[#8A7070] leading-relaxed text-lg mb-6"
            >
              DJ Blaack is a dynamic 15-year-old Gospel DJ based in Lagos,
              Nigeria — the youngest male DJ in the Nigerian gospel scene.
              Dedicated to spreading the message of faith through high-energy,
              spirit-filled musical experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="text-[#8A7070] leading-relaxed mb-10"
            >
              Beginning his professional journey in 2025, DJ Blaack has quickly
              established a reputation for excellence, blending contemporary
              gospel sounds with a vibrant, uplifting atmosphere. He specializes
              in immersive sets for events, youth concerts, and ministry
              gatherings — ensuring every performance resonates with purpose and
              passion.
            </motion.p>

            {/* Mission statement */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative pl-6 border-l-2 border-[#F5A623]/60"
            >
              <p
                className="text-lg italic text-[#F8F0E8]/80 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                &quot;To redefine the gospel entertainment landscape and inspire a
                new generation through music.&quot;
              </p>
              <footer className="mt-3 text-xs tracking-[0.3em] uppercase text-[#F5A623]">
                — Mission Statement
              </footer>
            </motion.blockquote>
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="relative p-6 rounded-2xl overflow-hidden group"
                style={{
                  background: "rgba(30, 14, 24, 0.8)",
                  border: "1px solid rgba(245, 166, 35, 0.12)",
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-linear-to-br from-[#F5A623]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <AnimatedNumber target={s.value} suffix={s.suffix} />
                <p className="mt-3 text-xs tracking-wide text-[#5A4A4A] leading-snug">
                  {s.label}
                </p>
              </motion.div>
            ))}

            {/* Signature style card spanning full width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="col-span-2 p-6 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,166,35,0.1) 0%, rgba(30,14,24,0.8) 100%)",
                border: "1px solid rgba(245, 166, 35, 0.2)",
              }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#F5A623] mb-3">
                Signature Style
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Energetic Transitions",
                  "Spirit-Led Track Selection",
                  "High-Impact Crowd Engagement",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs border border-[#F5A623]/20 text-[#F8F0E8]/70"
                    style={{ background: "rgba(245,166,35,0.06)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
