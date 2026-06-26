import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { toast } from "sonner";

const REACTIONS = [
  { emoji: "😍", label: "Amazing" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😕", label: "Not great" },
];

export default function TableFeedback() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const stop = (e) => { e.stopPropagation(); };
    el.addEventListener("wheel", stop, { passive: false });
    el.addEventListener("touchmove", stop, { passive: false });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, [open]);

  function submit() {
    if (selected === null) return;
    toast.success("Grazie! Your feedback helps us tonight.", {
      description: `${REACTIONS[selected].emoji} ${REACTIONS[selected].label}${comment ? ` — "${comment}"` : ""}`,
    });
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      setSelected(null);
      setComment("");
    }, 2000);
  }

  return (
    <>
      <motion.button
        data-testid="feedback-trigger"
        onClick={() => setOpen(true)}
        animate={open ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        className="fixed bottom-6 left-6 z-[60] w-12 h-12 bg-dahlia-surface border border-dahlia-border text-dahlia-muted flex items-center justify-center hover:text-dahlia-yellow hover:border-dahlia-yellow transition-all"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare size={18} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            ref={panelRef}
            className="fixed bottom-6 left-6 z-[70] w-[280px] bg-dahlia-bg border border-dahlia-border shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
            data-testid="feedback-panel"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-dahlia-border">
              <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold">Quick feedback</div>
              <button onClick={() => setOpen(false)} data-testid="feedback-close" className="p-1 hover:text-dahlia-red transition-colors">
                <X size={14} />
              </button>
            </div>

            {!sent ? (
              <div className="p-4">
                <div className="text-sm text-dahlia-muted mb-3">How's your experience?</div>
                <div className="flex justify-between gap-2 mb-4">
                  {REACTIONS.map((r, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelected(i)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      data-testid={`feedback-${r.label.toLowerCase().replace(/\s/g, "-")}`}
                      className={`flex-1 py-3 text-center border transition-all ${
                        selected === i
                          ? "border-dahlia-yellow bg-dahlia-yellow/10 scale-105"
                          : "border-dahlia-border hover:border-dahlia-yellow/50"
                      }`}
                    >
                      <div className="text-2xl">{r.emoji}</div>
                      <div className="text-[8px] uppercase tracking-wider text-dahlia-muted mt-1">{r.label}</div>
                    </motion.button>
                  ))}
                </div>

                {selected !== null && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Quick note (optional)..."
                      data-testid="feedback-comment"
                      className="w-full bg-transparent border-b border-dahlia-border focus:border-dahlia-yellow focus:outline-none py-2 text-sm placeholder:text-dahlia-muted/50 mb-3"
                    />
                    <button
                      onClick={submit}
                      data-testid="feedback-send"
                      className="w-full flex items-center justify-center gap-2 bg-dahlia-yellow text-dahlia-bg py-2.5 text-[10px] uppercase tracking-[0.25em] font-bold hover:translate-y-[-1px] transition-transform"
                    >
                      <Send size={12} /> Send feedback
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center"
              >
                <div className="text-4xl mb-2">🙏</div>
                <div className="font-display text-lg uppercase">Grazie!</div>
                <div className="text-[10px] text-dahlia-muted mt-1">Your feedback shapes tonight's service</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
