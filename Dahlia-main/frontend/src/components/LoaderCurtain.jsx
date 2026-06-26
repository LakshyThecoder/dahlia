import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoaderCurtain() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          data-testid="loader-curtain"
          className="fixed inset-0 z-[200] bg-dahlia-bg flex items-center justify-center overflow-hidden"
        >
          {/* Grid lines */}
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
              className="text-[11px] uppercase tracking-[0.4em] text-dahlia-muted mb-6"
            >
              Loading the riot...
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-6xl md:text-9xl uppercase leading-none tracking-tighter"
            >
              <span className="text-dahlia-text">DAHLIA</span>
              <span className="text-dahlia-red">.</span>
              <span className="text-stroke-red">oven</span>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              className="origin-left mt-8 h-px bg-dahlia-red"
              style={{ maxWidth: 420, margin: "32px auto 0" }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 font-editorial italic text-dahlia-muted text-lg"
            >
              Pizza · Cocktails · Musica · Milano
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
