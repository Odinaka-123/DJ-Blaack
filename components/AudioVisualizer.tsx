"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Volume2 } from "lucide-react";

export default function AudioVisualizer() {
  const [active, setActive] = useState(false);
  const barCount = 20;

  const [visualData] = useState(() => {
    const heights = Array.from({ length: barCount }, () => [
      4 + Math.random() * 20,
      4 + Math.random() * 28,
      4 + Math.random() * 16,
    ]);
    const durations = Array.from(
      { length: barCount },
      () => 0.4 + Math.random() * 0.3,
    );

    return { heights, durations };
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="flex items-end gap-1 px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(10,6,8,0.9)",
              border: "1px solid rgba(245,166,35,0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            {Array.from({ length: barCount }).map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: 3,
                  background: `hsl(${38 + i * 2}, 90%, 60%)`,
                }}
                animate={{
                  height: visualData.heights[i],
                }}
                transition={{
                  duration: visualData.durations[i],
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.04,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActive((v) => !v)}
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background:
            active ?
              "linear-gradient(135deg, #F5A623, #D4861A)"
            : "rgba(18,10,16,0.9)",
          border: "1px solid rgba(245,166,35,0.3)",
          backdropFilter: "blur(20px)",
          boxShadow: active ? "0 0 30px rgba(245,166,35,0.4)" : "none",
        }}
        title={active ? "Hide visualizer" : "Show visualizer"}
      >
        {active ?
          <Volume2 size={18} color="#0A0608" />
        : <Music2 size={18} color="#F5A623" />}
      </motion.button>
    </div>
  );
}
