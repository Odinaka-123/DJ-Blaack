"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SiInstagram, SiYoutube } from "react-icons/si"; 
import { LuMail, LuPhone, LuMapPin, LuSend } from "react-icons/lu";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    event: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real project, connect to your email/backend here
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", event: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1A0A14_0%,#0A0608_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-[#F5A623]/5 blur-[150px] pointer-events-none" />

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
            Booking
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-bold mb-16"
          style={{ fontFamily: "var(--font-display)", color: "#F8F0E8" }}
        >
          Book DJ <span className="text-shimmer">Blaack</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — info */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#8A7070] leading-relaxed text-lg mb-8">
                Ready to take your event to the next level? DJ Blaack brings
                spirit-filled, high-energy gospel experiences to every stage.
                From intimate ministry gatherings to large youth concerts —
                let&apos;s make your event unforgettable.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4 text-[#6A5A6A]">
                  <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center">
                    <LuMapPin size={16} className="text-[#F5A623]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#4A3A4A] mb-0.5">
                      Based In
                    </p>
                    <p className="text-[#F8F0E8] text-sm">Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[#6A5A6A]">
                  <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center">
                    <LuMail size={16} className="text-[#F5A623]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#4A3A4A] mb-0.5">
                      Email
                    </p>
                    <p className="text-[#F8F0E8] text-sm">
                      booking@djblaack.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[#6A5A6A]">
                  <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center">
                    <LuPhone size={16} className="text-[#F5A623]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#4A3A4A] mb-0.5">
                      Phone / WhatsApp
                    </p>
                    <p className="text-[#F8F0E8] text-sm">
                      +234 — Contact via form
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#4A3A4A] mb-4">
                Follow the Journey
              </p>
              <div className="flex gap-3">
                {[
                  { icon: SiInstagram, label: "Instagram", href: "#" },
                  { icon: SiYoutube, label: "YouTube", href: "#" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#F5A623]/15 text-[#8A7070] hover:text-[#FFC845] hover:border-[#F5A623]/30 transition-all duration-300 text-xs tracking-widest uppercase"
                    >
                      <Icon size={14} />
                      {s.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Event types */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(245,166,35,0.05)",
                border: "1px solid rgba(245,166,35,0.12)",
              }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#F5A623] mb-4">
                Event Types
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Church Conferences",
                  "Youth Concerts",
                  "Ministry Gatherings",
                  "Gospel Festivals",
                  "Social Gospel Events",
                  "Worship Nights",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs text-[#8A7070] border border-[#F5A623]/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.9 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-8 rounded-3xl"
            style={{
              background: "rgba(18, 10, 16, 0.8)",
              border: "1px solid rgba(245,166,35,0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#4A3A4A] mb-2">
                  Your Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F8F0E8] placeholder-[#3A2A3A] outline-none focus:ring-1 focus:ring-[#F5A623]/40 transition-all"
                  style={{
                    background: "rgba(245,166,35,0.04)",
                    border: "1px solid rgba(245,166,35,0.12)",
                  }}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#4A3A4A] mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F8F0E8] placeholder-[#3A2A3A] outline-none focus:ring-1 focus:ring-[#F5A623]/40 transition-all"
                  style={{
                    background: "rgba(245,166,35,0.04)",
                    border: "1px solid rgba(245,166,35,0.12)",
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[#4A3A4A] mb-2">
                Event Type
              </label>
              <select
                required
                value={form.event}
                onChange={(e) => setForm({ ...form, event: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-[#F8F0E8] outline-none focus:ring-1 focus:ring-[#F5A623]/40 transition-all"
                style={{
                  background: "rgba(10,6,8,0.9)",
                  border: "1px solid rgba(245,166,35,0.12)",
                }}
              >
                <option value="" disabled>
                  Select event type
                </option>
                <option value="church">Church Conference</option>
                <option value="youth">Youth Concert</option>
                <option value="ministry">Ministry Gathering</option>
                <option value="festival">Gospel Festival</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[#4A3A4A] mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell DJ Blaack about your event — date, location, expected crowd size..."
                className="w-full px-4 py-3 rounded-xl text-sm text-[#F8F0E8] placeholder-[#3A2A3A] outline-none focus:ring-1 focus:ring-[#F5A623]/40 transition-all resize-none"
                style={{
                  background: "rgba(245,166,35,0.04)",
                  border: "1px solid rgba(245,166,35,0.12)",
                }}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300"
              style={{
                background:
                  sent ?
                    "rgba(39,174,96,0.2)"
                  : "linear-gradient(135deg, #F5A623, #D4861A)",
                color: sent ? "#27AE60" : "#0A0608",
                border: sent ? "1px solid rgba(39,174,96,0.4)" : "none",
              }}
            >
              {sent ?
                "Message Sent!"
              : <>
                  <LuSend size={16} />
                  Send Booking Request
                </>
              }
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}