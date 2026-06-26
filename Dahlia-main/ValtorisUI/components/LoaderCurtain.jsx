import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoaderCurtain({
  brandName = "BRAND",
  brandSuffix = ".launch",
  tagline = "Loading the experience...",
  delay = 1600,
  bgColor = "var(--dahlia-bg)",
  accentColor = "var(--dahlia-red)",
  muteColor = "var(--dahlia-muted)",
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          data-testid="loader-curtain"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: bgColor }}
        >
          <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/[0.03] last:border-r-0" />
            ))}
          </div>

          <div className="text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.4em] mb-6"
              style={{ color: muteColor }}
            >
              {tagline}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-6xl md:text-9xl uppercase leading-none tracking-tighter"
            >
              <span style={{ color: "var(--dahlia-text)" }}>{brandName}</span>
              <span style={{ color: accentColor }}>.</span>
              <span className="text-stroke-red">{brandSuffix.replace(".", "")}</span>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              className="origin-left mt-8 h-px"
              style={{ background: accentColor, maxWidth: 420, margin: "32px auto 0" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
