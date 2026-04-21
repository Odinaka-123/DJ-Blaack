"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 border-t border-[#F5A623]/08">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full border border-[#F5A623]/40 flex items-center justify-center">
            <span
              className="text-[9px] font-bold text-[#FFC845]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DJ
            </span>
          </div>
          <span
            className="text-sm tracking-[0.3em] uppercase text-[#5A4A4A]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Blaack
          </span>
        </motion.div>

        {/* Center */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.3em] uppercase text-[#3A2A3A] text-center"
        >
          © {year} DJ Blaack · Lagos, Nigeria · Spreading Faith Through Music
        </motion.p>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#27AE60] animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#3A2A3A]">
            Available for Bookings
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
