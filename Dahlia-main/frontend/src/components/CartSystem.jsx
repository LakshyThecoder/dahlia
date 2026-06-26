import { createContext, useContext, useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ShoppingBag, Plus, Minus, X, ArrowRight, Sparkles, Trash2, Zap, Clock, Gift, Copy, Star } from "lucide-react";
import OrderTracker from "@/components/OrderTracker";

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

const PAIRINGS = {
  // Maps category → suggested category
  sfizi: "gourmet",
  gourmet: "bevande",
  classiche: "bevande",
  bevande: "dolci",
  dolci: "caffetteria",
  caffetteria: "dolci",
};

// Lightweight default suggestion pool — id+name+price+category
const SUGGESTION_POOL = [
  { id: "g-04", category: "gourmet", name: "Datterino Giallo", sub: "Bufala · capperi · olive taggiasche", price: 12, tag: "Pair it!" },
  { id: "b-prosecco", category: "bevande", name: "Calice di Prosecco", sub: "Crisp · bubbly · obvious choice", price: 6, tag: "Goes with everything" },
  { id: "b-neropasso", category: "bevande", name: "Neropasso · Calice", sub: "Veneto red · pairs with red sauce", price: 6, tag: "Sommelier pick" },
  { id: "d-01", category: "dolci", name: "Soufflé al cioccolato", sub: "Warm · panna fresca", price: 5, tag: "Don't skip" },
  { id: "c-cappuccino", category: "caffetteria", name: "Cappuccino", sub: "Only before noon — but we won&apos;t tell", price: 3, tag: "Caffè ritual" },
  { id: "s-04", category: "sfizi", name: "Mortadella & stracciatella", sub: "Pugliese stracciatella · IGP mortadella", price: 6, tag: "Start light" },
];

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [lastCategory, setLastCategory] = useState(null);

  const add = (item) => {
    setItems((prev) => {
      const ex = prev.find((p) => p.id === item.id);
      if (ex) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...item, qty: 1 }];
    });
    setLastCategory(item.category);
    toast.success(`${item.name} added to cart`, {
      description: `€${Number(item.price).toFixed(2)} · tap the bag to review`,
    });
  };
  const change = (id, qty) =>
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, qty) } : p))
        .filter((p) => p.qty > 0)
    );
  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + Number(i.price) * i.qty, 0);
    const coperto = items.length > 0 ? 2 : 0;
    return { subtotal, coperto, total: subtotal + coperto, count: items.reduce((s, i) => s + i.qty, 0) };
  }, [items]);

  const suggestions = useMemo(() => {
    const wanted = PAIRINGS[lastCategory] || "bevande";
    const inCart = new Set(items.map((i) => i.id));
    const filtered = SUGGESTION_POOL.filter((p) => !inCart.has(p.id));
    const primary = filtered.filter((p) => p.category === wanted);
    const rest = filtered.filter((p) => p.category !== wanted);
    return [...primary, ...rest].slice(0, 3);
  }, [items, lastCategory]);

  return (
    <CartCtx.Provider value={{ items, add, change, remove, clear, totals, suggestions, open, setOpen }}>
      {children}
    </CartCtx.Provider>
  );
}

/* ---------------- BUBBLE (floating button) ---------------- */
export function CartBubble() {
  const { totals, setOpen } = useCart();
  return (
    <AnimatePresence>
      {totals.count > 0 && (
        <motion.button
          key="bubble"
          initial={{ opacity: 0, y: 30, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => setOpen(true)}
          data-testid="cart-bubble"
          className="fixed bottom-6 right-6 z-40 group bg-dahlia-red text-white px-5 py-4 flex items-center gap-4 shadow-[6px_6px_0_0_var(--dahlia-yellow)] hover:translate-y-[-2px] transition-transform"
        >
          <ShoppingBag size={20} />
          <span className="font-display text-2xl leading-none">
            {totals.count}
          </span>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold border-l border-white/30 pl-4">
            €{totals.total.toFixed(2)}
          </span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const FREE_ESPRESSO_THRESHOLD = 35;
const HAPPY_HOUR_START = 18;
const HAPPY_HOUR_END = 19.5;
const HAPPY_HOUR_ITEM = { id: "hh-spritz", category: "bevande", name: "Spritz Dahlia (Happy Hour)", sub: "Aperol · prosecco · soda — discounted", price: 7 };

function isHappyHour() {
  const now = new Date();
  const h = now.getHours() + now.getMinutes() / 60;
  return h >= HAPPY_HOUR_START && h < HAPPY_HOUR_END;
}

function genReferralCode(name) {
  return (name || "DAHLIA").toUpperCase().replace(/\s/g, "").slice(0, 6) + Math.floor(Math.random() * 90 + 10);
}

/* ---------------- DRAWER ---------------- */
export function CartDrawer() {
  const { items, change, remove, totals, suggestions, add, open, setOpen, clear } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [reviewStar, setReviewStar] = useState(0);
  const [referral, setReferral] = useState("");
  const [form, setForm] = useState({ name: "", email: "", mode: "dine-in", time: "20:00" });
  const drawerRef = useRef(null);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    const stop = (e) => { e.stopPropagation(); };
    el.addEventListener("wheel", stop, { passive: false });
    el.addEventListener("touchmove", stop, { passive: false });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, [open]);

  const hasDrink = items.some((i) => i.category === "bevande" || i.category === "cocktails");
  const hasPizza = items.some((i) => i.category === "gourmet" || i.category === "classiche");
  const needsDrink = hasPizza && !hasDrink && items.length > 0;
  const happyHour = isHappyHour();
  const spendGap = Math.max(0, FREE_ESPRESSO_THRESHOLD - totals.subtotal);
  const spendProgress = Math.min(100, (totals.subtotal / FREE_ESPRESSO_THRESHOLD) * 100);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("We need a name and email to confirm.");
      return;
    }
    toast.success(`Ordine confermato, ${form.name}!`, {
      description: `${totals.count} items · €${totals.total.toFixed(2)} · ${form.mode === "dine-in" ? "Table " + form.time : "Pickup " + form.time}`,
    });
    setReferral(genReferralCode(form.name));
    setConfirmed(true);
    setCheckout(false);
  };

  const closeAll = () => {
    clear();
    setConfirmed(false);
    setReviewStar(0);
    setReferral("");
    setOpen(false);
    setForm({ name: "", email: "", mode: "dine-in", time: "20:00" });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => (checkout ? setCheckout(false) : setOpen(false))}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            data-testid="cart-drawer"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-dahlia-bg border-l border-dahlia-border flex flex-col"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-5 border-b border-dahlia-border">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold">Il tuo ordine</div>
                <div className="font-display text-2xl mt-1">{checkout ? "Checkout" : `${totals.count} items`}</div>
              </div>
              <button
                onClick={() => (checkout ? setCheckout(false) : setOpen(false))}
                data-testid="cart-close"
                className="p-2 hover:text-dahlia-red transition-colors"
              >
                <X size={20} />
              </button>
            </header>

            {/* Body */}
            {confirmed ? (
              <div className="flex-1 overflow-y-auto p-5 space-y-5" data-testid="post-checkout">
                <OrderTracker orderName={`${form.name}'s order`} />

                {/* Review */}
                <div className="border border-dahlia-border p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-3 flex items-center gap-1.5">
                    <Star size={10} /> Rate your experience
                  </div>
                  <div className="flex gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setReviewStar(s);
                          toast.success(`Thanks! ${s} stars — +${s * 10} League XP`);
                        }}
                        data-testid={`review-star-${s}`}
                        className={`w-10 h-10 border flex items-center justify-center text-lg transition-all ${
                          s <= reviewStar ? "bg-dahlia-yellow/20 border-dahlia-yellow text-dahlia-yellow" : "border-dahlia-border text-dahlia-muted hover:border-dahlia-yellow"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  {reviewStar > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-dahlia-yellow">
                      +{reviewStar * 10} XP earned for the Dahlia League!
                    </motion.div>
                  )}
                </div>

                {/* Referral */}
                {referral && (
                  <div className="border border-dahlia-border p-5">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-pink font-bold mb-2 flex items-center gap-1.5">
                      <Gift size={10} /> Share & earn
                    </div>
                    <div className="text-sm text-dahlia-muted mb-3">Your friend gets 10% off, you get 50 League XP.</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-dahlia-surface border border-dahlia-border px-3 py-2 font-display text-lg tracking-wider" data-testid="referral-code">{referral}</div>
                      <button
                        onClick={() => { navigator.clipboard.writeText(referral).catch(() => {}); toast.success("Code copied!"); }}
                        data-testid="copy-referral"
                        className="p-2.5 border border-dahlia-border hover:border-dahlia-pink hover:text-dahlia-pink transition-colors"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : !checkout ? (
              <div className="flex-1 overflow-y-auto" data-testid="cart-items">
                {/* Happy Hour Banner */}
                {happyHour && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-5 mt-4 border border-dahlia-yellow/50 bg-dahlia-yellow/5 p-3 flex items-center justify-between gap-3"
                    data-testid="happy-hour-banner"
                  >
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-dahlia-yellow" />
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-dahlia-yellow font-bold">Happy Hour active</div>
                        <div className="text-[11px] text-dahlia-muted">Spritz €7 instead of €9</div>
                      </div>
                    </div>
                    <button
                      onClick={() => add(HAPPY_HOUR_ITEM)}
                      data-testid="happy-hour-add"
                      className="text-[9px] uppercase tracking-wider font-bold text-dahlia-yellow border border-dahlia-yellow/50 px-2.5 py-1.5 hover:bg-dahlia-yellow/10 transition-colors"
                    >
                      + Add
                    </button>
                  </motion.div>
                )}

                {/* Combo Nudge */}
                {needsDrink && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-5 mt-4 border border-dahlia-red/40 bg-dahlia-red/5 p-3 flex items-center gap-3"
                    data-testid="combo-nudge"
                  >
                    <Zap size={14} className="text-dahlia-red flex-shrink-0" />
                    <div className="text-[11px] text-dahlia-muted">Pizza without a drink? Add a <span className="text-dahlia-red font-semibold">Prosecco (€6)</span> to complete your meal.</div>
                  </motion.div>
                )}

                {items.length === 0 ? (
                  <div className="p-10 text-center">
                    <ShoppingBag size={48} className="mx-auto text-dahlia-muted mb-5" />
                    <div className="font-display text-2xl uppercase">Il carrello è vuoto.</div>
                    <p className="text-sm text-dahlia-muted mt-3">Pick a pizza, a wine, a dolce — anything. The room will do the rest.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-dahlia-border">
                    {items.map((it) => (
                      <li key={it.id} data-testid={`cart-row-${it.id}`} className="p-5 grid grid-cols-[1fr_auto] gap-4 items-start">
                        <div>
                          <div className="font-display text-xl uppercase leading-none">{it.name}</div>
                          {it.sub && <div className="text-xs text-dahlia-muted mt-1.5 leading-snug">{it.sub}</div>}
                          <div className="mt-3 inline-flex items-center gap-1 border border-dahlia-border">
                            <button onClick={() => change(it.id, it.qty - 1)} data-testid={`cart-dec-${it.id}`} className="p-1.5 hover:bg-dahlia-red/10 transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="px-3 font-display text-base tabular-nums" data-testid={`cart-qty-${it.id}`}>{it.qty}</span>
                            <button onClick={() => change(it.id, it.qty + 1)} data-testid={`cart-inc-${it.id}`} className="p-1.5 hover:bg-dahlia-red/10 transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-xl text-dahlia-red tabular-nums">€{(Number(it.price) * it.qty).toFixed(2)}</div>
                          <button onClick={() => remove(it.id)} data-testid={`cart-rm-${it.id}`} className="mt-2 text-[10px] uppercase tracking-[0.2em] text-dahlia-muted hover:text-dahlia-red transition-colors inline-flex items-center gap-1">
                            <Trash2 size={11} /> Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Suggestions */}
                {items.length > 0 && suggestions.length > 0 && (
                  <div className="p-5 border-t-2 border-dashed border-dahlia-border" data-testid="cart-suggestions">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-4">
                      <Sparkles size={14} /> Aggiungilo? · Pairings the room loves
                    </div>
                    <div className="flex flex-col gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => add(s)}
                          data-testid={`cart-suggest-${s.id}`}
                          className="group flex items-center justify-between gap-4 border border-dahlia-border p-3 hover:border-dahlia-yellow hover:bg-dahlia-yellow/5 transition-colors text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="font-display text-base uppercase leading-none">{s.name}</span>
                              {s.tag && <span className="text-[8px] uppercase tracking-[0.25em] text-dahlia-yellow border border-dahlia-yellow/50 px-1.5 py-0.5">{s.tag}</span>}
                            </div>
                            <div className="text-[11px] text-dahlia-muted mt-1 truncate" dangerouslySetInnerHTML={{ __html: s.sub }} />
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-display text-base text-dahlia-red">€{s.price.toFixed(2)}</span>
                            <span className="w-7 h-7 bg-dahlia-yellow text-dahlia-bg flex items-center justify-center group-hover:bg-dahlia-red group-hover:text-white transition-colors">
                              <Plus size={14} />
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* CHECKOUT FORM */
              <form onSubmit={submit} className="flex-1 overflow-y-auto p-5 flex flex-col gap-5" data-testid="checkout-form">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted mb-2">Name *</div>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-testid="checkout-name" placeholder="Giulia Rossi" className="w-full bg-transparent border-b border-dahlia-border focus:border-dahlia-red focus:outline-none py-2 text-lg" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted mb-2">Email *</div>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="checkout-email" placeholder="ciao@dahlia.it" className="w-full bg-transparent border-b border-dahlia-border focus:border-dahlia-red focus:outline-none py-2 text-lg" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted mb-2">Mode</div>
                  <div className="grid grid-cols-2 gap-2">
                    {["dine-in", "takeaway"].map((m) => (
                      <button type="button" key={m} onClick={() => setForm({ ...form, mode: m })} data-testid={`checkout-mode-${m}`} className={`py-3 text-[11px] uppercase tracking-[0.25em] font-semibold border transition-colors ${form.mode === m ? "bg-dahlia-red border-dahlia-red text-white" : "border-dahlia-border hover:border-dahlia-red"}`}>
                        {m === "dine-in" ? "Mangia qui" : "Da asporto"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted mb-2">{form.mode === "dine-in" ? "Table time" : "Pickup time"}</div>
                  <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} data-testid="checkout-time" className="w-full bg-transparent border-b border-dahlia-border focus:border-dahlia-red focus:outline-none py-2 text-lg appearance-none">
                    {["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"].map((t) => (
                      <option key={t} value={t} className="bg-dahlia-bg">{t}</option>
                    ))}
                  </select>
                </div>

                {/* Order summary */}
                <div className="mt-2 border-t border-dahlia-border pt-4">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-yellow font-bold mb-3">Riepilogo</div>
                  <ul className="space-y-1 text-sm">
                    {items.map((it) => (
                      <li key={it.id} className="flex justify-between text-dahlia-text/85">
                        <span>{it.qty}× {it.name}</span>
                        <span className="tabular-nums">€{(Number(it.price) * it.qty).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            )}

            {/* Footer / total / checkout */}
            <footer className="border-t border-dahlia-border p-5 bg-dahlia-surface">
              {/* Spend threshold */}
              {items.length > 0 && !confirmed && spendGap > 0 && (
                <div className="mb-4" data-testid="spend-threshold">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1.5">
                    <span className="text-dahlia-muted flex items-center gap-1"><Gift size={9} className="text-dahlia-yellow" /> Free espresso at €{FREE_ESPRESSO_THRESHOLD}</span>
                    <span className="text-dahlia-yellow font-bold">€{spendGap.toFixed(2)} to go</span>
                  </div>
                  <div className="h-1.5 bg-dahlia-border overflow-hidden">
                    <motion.div
                      className="h-full bg-dahlia-yellow"
                      initial={{ width: 0 }}
                      animate={{ width: `${spendProgress}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              )}
              {items.length > 0 && !confirmed && spendGap <= 0 && (
                <div className="mb-4 text-[11px] text-dahlia-yellow flex items-center gap-1.5" data-testid="free-espresso-unlocked">
                  <Gift size={12} /> Free espresso unlocked! It'll be added to your order.
                </div>
              )}

              {!confirmed && items.length > 0 && (
                <div className="space-y-1 text-sm mb-4">
                  <div className="flex justify-between text-dahlia-muted"><span>Subtotal</span><span className="tabular-nums">€{totals.subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-dahlia-muted"><span>Coperto</span><span className="tabular-nums">€{totals.coperto.toFixed(2)}</span></div>
                  <div className="flex justify-between text-xl font-display pt-2 border-t border-dahlia-border mt-2"><span>Totale</span><span className="text-dahlia-red tabular-nums">€{totals.total.toFixed(2)}</span></div>
                </div>
              )}
              {confirmed ? (
                <button onClick={closeAll} data-testid="post-checkout-close" className="w-full bg-dahlia-red text-white py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#ff5039] transition-colors">
                  Done — close
                </button>
              ) : items.length === 0 ? (
                <button onClick={() => setOpen(false)} className="w-full bg-dahlia-red text-white py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#ff5039] transition-colors">
                  Browse menu →
                </button>
              ) : checkout ? (
                <button
                  type="submit"
                  onClick={submit}
                  data-testid="checkout-confirm"
                  className="w-full bg-dahlia-red text-white py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#ff5039] transition-colors flex items-center justify-center gap-3"
                >
                  Confirm order · €{totals.total.toFixed(2)} <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => setCheckout(true)}
                  data-testid="cart-go-checkout"
                  className="w-full bg-dahlia-red text-white py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#ff5039] transition-colors flex items-center justify-center gap-3"
                >
                  Checkout · €{totals.total.toFixed(2)} <ArrowRight size={16} />
                </button>
              )}
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
