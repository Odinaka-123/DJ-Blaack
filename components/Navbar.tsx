"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Genres", href: "#genres" },
  { label: "Highlights", href: "#highlights" },
  { label: "Sets", href: "#mixes" },
  { label: "Book", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ?
            "py-3 bg-[#0A0608]/90 backdrop-blur-xl border-[#F5A623]/10"
          : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#F5A623] to-[#D4861A] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0.5 rounded-full border border-[#F5A623]/50 flex items-center justify-center">
                <span
                  className="text-[10px] font-bold text-[#FFC845]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  DJ
                </span>
              </div>
            </div>
            <span
              className="text-lg font-bold tracking-widest text-shimmer hidden sm:block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BLAACK
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-xs tracking-[0.2em] uppercase text-[#8A7070] hover:text-[#FFC845] transition-colors duration-300 font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase font-semibold border border-[#F5A623]/40 text-[#FFC845] hover:bg-[#F5A623]/10 transition-all duration-300"
          >
            Book Now
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-[#FFC845] p-2"
            aria-label="Toggle menu"
          >
            {open ?
              <X size={22} />
            : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0608]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="text-2xl tracking-[0.2em] uppercase text-[#8A7070] hover:text-[#FFC845] transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
