import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ChefHat, UtensilsCrossed, Check, X, Clock } from "lucide-react";

const STAGES = [
  { id: 0, label: "Order received", icon: Check, time: "Just now", color: "var(--dahlia-yellow)" },
  { id: 1, label: "In the oven · 480°C", icon: Flame, time: "~6 min", color: "var(--dahlia-red)" },
  { id: 2, label: "Plating up", icon: ChefHat, time: "~2 min", color: "var(--dahlia-pink)" },
  { id: 3, label: "Ready — buon appetito!", icon: UtensilsCrossed, time: "Now", color: "var(--dahlia-yellow)" },
];

export default function OrderTracker({ orderName, onClose }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage >= 3) return;
    const delays = [4000, 8000, 3000];
    const t = setTimeout(() => setStage((s) => Math.min(s + 1, 3)), delays[stage] || 5000);
    return () => clearTimeout(t);
  }, [stage]);

  const progress = ((stage + 1) / STAGES.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="border border-dahlia-border p-5"
      data-testid="order-tracker"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold flex items-center gap-2">
          <Clock size={10} /> Live order status
        </div>
        {onClose && (
          <button onClick={onClose} data-testid="tracker-close" className="p-1 hover:text-dahlia-red transition-colors">
            <X size={14} />
          </button>
        )}
      </div>

      {orderName && (
        <div className="font-display text-lg uppercase mb-3">{orderName}</div>
      )}

      <div className="relative h-1.5 bg-dahlia-border mb-5 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-dahlia-yellow via-dahlia-red to-dahlia-pink"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="space-y-3">
        {STAGES.map((s, i) => {
          const Icon = s.icon;
          const active = i === stage;
          const done = i < stage;
          const future = i > stage;
          return (
            <motion.div
              key={s.id}
              initial={false}
              animate={{ opacity: future ? 0.3 : 1, x: active ? 4 : 0 }}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-3 py-1.5 ${active ? "" : ""}`}
              data-testid={`tracker-stage-${i}`}
            >
              <div
                className={`w-7 h-7 flex items-center justify-center border flex-shrink-0 transition-colors ${
                  active ? "border-dahlia-red bg-dahlia-red/10" : done ? "border-dahlia-yellow/50 bg-dahlia-yellow/5" : "border-dahlia-border"
                }`}
              >
                <Icon size={12} style={{ color: future ? "var(--dahlia-muted)" : s.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm ${active ? "text-dahlia-text font-semibold" : done ? "text-dahlia-muted" : "text-dahlia-muted/50"}`}>
                  {s.label}
                </div>
              </div>
              <div className={`text-[10px] uppercase tracking-wider flex-shrink-0 ${active ? "text-dahlia-red" : "text-dahlia-muted/50"}`}>
                {active && (
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {s.time}
                  </motion.span>
                )}
                {done && <span className="text-dahlia-yellow">Done</span>}
                {future && <span>{s.time}</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {stage === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-4 border-t border-dahlia-border text-center"
        >
          <div className="font-script text-2xl text-dahlia-yellow">Buon appetito! 🍕</div>
          <div className="text-[10px] text-dahlia-muted mt-1 uppercase tracking-wider">Your order is ready for pickup</div>
        </motion.div>
      )}
    </motion.div>
  );
}
