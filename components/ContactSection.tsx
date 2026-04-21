"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiInstagram, SiTiktok, SiAudiomack } from "react-icons/si";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuSend,
  LuChevronDown,
  LuCheck,
} from "react-icons/lu";

/* ── Event type options ──────────────────────────────── */
const EVENT_TYPES = [
  { value: "church", label: "Church Conference", icon: "✝" },
  { value: "youth", label: "Youth Concert", icon: "🎤" },
  { value: "ministry", label: "Ministry Gathering", icon: "🙏" },
  { value: "festival", label: "Gospel Festival", icon: "🌟" },
  { value: "other", label: "Other", icon: "📋" },
];

/* ── Custom Dropdown ─────────────────────────────────── */
function EventDropdown({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = EVENT_TYPES.find((e) => e.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "rgba(10,6,8,0.9)",
          border: `1px solid ${open ? "rgba(245,166,35,0.4)" : "rgba(245,166,35,0.12)"}`,
          color: selected ? "#F8F0E8" : "#3A2A3A",
          boxShadow: open ? "0 0 0 3px rgba(245,166,35,0.07)" : "none",
        }}
      >
        <span className="flex items-center gap-2.5">
          {selected ?
            <>
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                style={{
                  background: "rgba(245,166,35,0.12)",
                  border: "1px solid rgba(245,166,35,0.15)",
                }}
              >
                {selected.icon}
              </span>
              <span>{selected.label}</span>
            </>
          : <span className="text-[#3A2A3A]">Select event type</span>}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <LuChevronDown size={15} style={{ color: "#F5A623", opacity: 0.6 }} />
        </motion.span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 mt-2 z-50 rounded-xl py-1.5 list-none"
            style={{
              background: "rgba(12, 7, 10, 0.98)",
              border: "1px solid rgba(245,166,35,0.16)",
              backdropFilter: "blur(24px)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,166,35,0.04)",
            }}
          >
            {EVENT_TYPES.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm transition-all duration-150 group"
                    style={{ background: "transparent" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(245,166,35,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        isSelected ? "rgba(245,166,35,0.08)" : "transparent";
                    }}
                  >
                    <span className="flex items-center gap-3">
                      {/* Icon pill */}
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 transition-colors duration-150"
                        style={{
                          background:
                            isSelected ?
                              "rgba(245,166,35,0.18)"
                            : "rgba(245,166,35,0.05)",
                          border: `1px solid ${isSelected ? "rgba(245,166,35,0.25)" : "rgba(245,166,35,0.08)"}`,
                        }}
                      >
                        {opt.icon}
                      </span>
                      {/* Label */}
                      <span
                        style={{
                          color: isSelected ? "#FFC845" : "#8A7070",
                          fontWeight: isSelected ? 600 : 400,
                        }}
                      >
                        {opt.label}
                      </span>
                    </span>

                    {/* Checkmark */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <LuCheck size={14} style={{ color: "#F5A623" }} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Contact Section ─────────────────────────────────── */
type FormState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    event: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.event) return;
    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setFormState("success");
      setForm({ name: "", email: "", event: "", message: "" });
      setTimeout(() => setFormState("idle"), 5000);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send. Try again.",
      );
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  const isLoading = formState === "loading";

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1A0A14_0%,#0A0608_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-[#F5A623]/5 blur-[150px] pointer-events-none" />

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
          {/* ── Left — contact info ── */}
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
                {[
                  {
                    icon: LuMapPin,
                    label: "Based In",
                    value: "Lagos, Nigeria",
                  },
                  {
                    icon: LuMail,
                    label: "Email",
                    value: "blaackdj48@gmail.com",
                  },
                  {
                    icon: LuPhone,
                    label: "Phone / WhatsApp",
                    value: "+234 810 489 5559",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#F5A623]" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[#4A3A4A] mb-0.5">
                        {label}
                      </p>
                      <p className="text-[#F8F0E8] text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Socials */}
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
                  {
                    icon: SiInstagram,
                    label: "Instagram",
                    href: "https://www.instagram.com/dj_blaack/",
                  },
                  {
                    icon: SiTiktok,
                    label: "TikTok",
                    href: "https://www.tiktok.com/@djb.l.a.a.c.k",
                  },
                  {
                    icon: SiAudiomack,
                    label: "Audiomack",
                    href: "https://audiomack.com/Dblaack",
                  },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#F5A623]/15 text-[#8A7070] hover:text-[#FFC845] hover:border-[#F5A623]/30 transition-all duration-300 text-xs tracking-widest uppercase"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Event type tags */}
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

          {/* ── Right — form ── */}
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
                  disabled={isLoading}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F8F0E8] placeholder-[#3A2A3A] outline-none focus:ring-1 focus:ring-[#F5A623]/40 transition-all disabled:opacity-50"
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
                  disabled={isLoading}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F8F0E8] placeholder-[#3A2A3A] outline-none focus:ring-1 focus:ring-[#F5A623]/40 transition-all disabled:opacity-50"
                  style={{
                    background: "rgba(245,166,35,0.04)",
                    border: "1px solid rgba(245,166,35,0.12)",
                  }}
                />
              </div>
            </div>

            {/* Custom dropdown */}
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[#4A3A4A] mb-2">
                Event Type
              </label>
              <EventDropdown
                value={form.event}
                onChange={(v) => setForm({ ...form, event: v })}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[#4A3A4A] mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                disabled={isLoading}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell DJ Blaack about your event — date, location, expected crowd size..."
                className="w-full px-4 py-3 rounded-xl text-sm text-[#F8F0E8] placeholder-[#3A2A3A] outline-none focus:ring-1 focus:ring-[#F5A623]/40 transition-all resize-none disabled:opacity-50"
                style={{
                  background: "rgba(245,166,35,0.04)",
                  border: "1px solid rgba(245,166,35,0.12)",
                }}
              />
            </div>

            {/* Error banner */}
            <AnimatePresence>
              {formState === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(231,76,60,0.1)",
                    border: "1px solid rgba(231,76,60,0.25)",
                    color: "#E74C3C",
                  }}
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading || !form.event}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className="relative flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm tracking-[0.2em] uppercase overflow-hidden disabled:cursor-not-allowed transition-all duration-300"
              style={{
                background:
                  formState === "success" ? "rgba(39,174,96,0.15)"
                  : formState === "error" ? "rgba(231,76,60,0.15)"
                  : isLoading ? "rgba(245,166,35,0.25)"
                  : "linear-gradient(135deg, #F5A623, #D4861A)",
                color:
                  formState === "success" ? "#27AE60"
                  : formState === "error" ? "#E74C3C"
                  : isLoading ? "#F5A623"
                  : "#0A0608",
                border:
                  formState === "success" ? "1px solid rgba(39,174,96,0.4)"
                  : formState === "error" ? "1px solid rgba(231,76,60,0.3)"
                  : "none",
                opacity: formState === "idle" && !form.event ? 0.45 : 1,
              }}
            >
              {/* Shimmer sweep while loading */}
              {isLoading && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(245,166,35,0.18) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}

              <span className="relative flex items-center gap-3">
                {formState === "success" ?
                  <>
                    <LuCheck size={16} />
                    Message Sent!
                  </>
                : isLoading ?
                  <>
                    <motion.span
                      className="w-4 h-4 rounded-full border-2 border-[#F5A623]/30 border-t-[#F5A623] inline-block"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending…
                  </>
                : <>
                    <LuSend size={16} />
                    Send Booking Request
                  </>
                }
              </span>
            </motion.button>

            <p className="text-center text-[10px] text-[#3A2A3A] tracking-wider">
              You&apos;ll receive a confirmation email · Usually replies within
              24h
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
