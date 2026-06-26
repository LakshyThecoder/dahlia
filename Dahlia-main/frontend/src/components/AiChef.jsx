import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, ChefHat, Globe, ShoppingBag, Plus, Bell, Clock, Users, UtensilsCrossed } from "lucide-react";
import { askMistral, getQuickPrompts, LANGUAGES, findMenuItems } from "@/lib/mistral";
import { useCart } from "@/components/CartSystem";
import { toast } from "sonner";

const GREETINGS = {
  en: "Hi! I'm your AI sommelier & digital waiter. Pick your language, then ask me anything — pairings, orders, or just \"surprise me\" 🍷",
  it: "Ciao! Sono il tuo sommelier AI e cameriere digitale. Chiedimi qualsiasi cosa — abbinamenti, ordini, o \"sorprendimi\" 🍷",
  es: "¡Hola! Soy tu sommelier AI y camarero digital. Pregúntame lo que quieras — maridajes, pedidos, o \"sorpréndeme\" 🍷",
  fr: "Salut! Je suis votre sommelier IA et serveur digital. Demandez-moi ce que vous voulez — accords, commandes, ou \"surprenez-moi\" 🍷",
  de: "Hallo! Ich bin Ihr KI-Sommelier und digitaler Kellner. Fragen Sie mich alles — Paarungen, Bestellungen, oder \"überraschen Sie mich\" 🍷",
};

const MODE_TABS = [
  { id: "chat", label: "Chat", icon: ChefHat },
  { id: "order", label: "Order", icon: UtensilsCrossed },
  { id: "waiter", label: "Waiter", icon: Bell },
];

export default function AiChef() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(null);
  const [mode, setMode] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [extractedItems, setExtractedItems] = useState([]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const cart = useCart();

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;
    requestAnimationFrame(() => {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, extractedItems, scrollToBottom]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const stop = (e) => {
      const scrollable = scrollRef.current;
      if (!scrollable) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
      if (!atTop && !atBottom) {
        e.stopPropagation();
      } else {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", stop, { passive: false });
    el.addEventListener("touchmove", stop, { passive: false });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, [open, lang]);

  useEffect(() => {
    if (open && lang && inputRef.current) inputRef.current.focus();
  }, [open, lang]);

  function selectLang(code) {
    setLang(code);
    const greeting = GREETINGS[code] || GREETINGS.en;
    setMessages([{ role: "assistant", content: greeting }]);
  }

  function addToCart(item) {
    if (cart && cart.add) {
      cart.add({ ...item, sub: "" });
    } else {
      toast.success(`${item.name} — €${item.price} noted!`);
    }
  }

  async function handleSend(text) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    setExtractedItems([]);
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setLoading(true);

    let finalMsg = msg;
    if (mode === "order") finalMsg = `I want to order: ${msg}. Confirm what I'm getting and suggest a drink pairing.`;
    if (mode === "waiter") finalMsg = `[WAITER REQUEST] ${msg}. Acknowledge and give an estimated time.`;

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    const rawReply = await askMistral(finalMsg, history, lang);
    const reply = rawReply.replace(/\*{1,3}/g, "").replace(/#{1,3}\s?/g, "").replace(/^-\s/gm, "• ").trim();

    const found = findMenuItems(reply);
    setExtractedItems(found);
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  const prompts = getQuickPrompts(lang);

  return (
    <>
      <motion.button
        data-testid="ai-chef-trigger"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-dahlia-red text-white flex items-center justify-center shadow-[0_8px_32px_rgba(255,59,34,0.4)] hover:scale-110 hover:shadow-[0_12px_40px_rgba(255,59,34,0.6)] transition-all duration-300"
        whileHover={{ rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={open ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      >
        <Sparkles size={22} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            ref={panelRef}
            className="fixed bottom-6 right-6 z-[70] w-[400px] max-w-[calc(100vw-3rem)] h-[580px] max-h-[calc(100vh-6rem)] bg-dahlia-bg border border-dahlia-border flex flex-col shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
            data-testid="ai-chef-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-dahlia-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-dahlia-red/10 border border-dahlia-red/30 flex items-center justify-center">
                  <ChefHat size={16} className="text-dahlia-red" />
                </div>
                <div>
                  <div className="font-display text-sm uppercase tracking-wider">AI Sommelier</div>
                  <div className="text-[10px] text-dahlia-muted uppercase tracking-wider flex items-center gap-1.5">
                    {lang && (
                      <button onClick={() => { setLang(null); setMessages([]); }} className="hover:text-dahlia-red transition-colors flex items-center gap-1" data-testid="ai-chef-change-lang">
                        <Globe size={9} /> {LANGUAGES.find((l) => l.code === lang)?.flag} Change
                      </button>
                    )}
                    {!lang && "Select language to start"}
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} data-testid="ai-chef-close" className="w-8 h-8 flex items-center justify-center hover:text-dahlia-red transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Mode tabs - only show after language selected */}
            {lang && (
              <div className="flex border-b border-dahlia-border">
                {MODE_TABS.map((t) => {
                  const I = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setMode(t.id)}
                      data-testid={`ai-mode-${t.id}`}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] uppercase tracking-wider transition-all ${mode === t.id ? "text-dahlia-red border-b-2 border-dahlia-red bg-dahlia-red/5" : "text-dahlia-muted hover:text-dahlia-text"}`}
                    >
                      <I size={12} /> {t.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Language selector */}
            {!lang && (
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <Globe size={28} className="text-dahlia-yellow mb-4" />
                <div className="font-display text-2xl uppercase tracking-wider text-center mb-2">Choose your language</div>
                <div className="text-[11px] text-dahlia-muted text-center mb-6">Our AI speaks your language. Pick one to start.</div>
                <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                  {LANGUAGES.map((l) => (
                    <motion.button
                      key={l.code}
                      onClick={() => selectLang(l.code)}
                      data-testid={`ai-lang-${l.code}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-dahlia-border px-2 py-2.5 text-center hover:border-dahlia-red hover:bg-dahlia-red/5 transition-all"
                    >
                      <div className="text-lg">{l.flag}</div>
                      <div className="text-[9px] uppercase tracking-wider text-dahlia-muted mt-1">{l.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat body */}
            {lang && (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-thin">
                  {messages.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-dahlia-red text-white" : "bg-dahlia-surface border border-dahlia-border text-dahlia-text"}`}>
                        {m.content}
                      </div>
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-dahlia-surface border border-dahlia-border px-4 py-3 text-sm text-dahlia-muted">
                        <span className="inline-flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-dahlia-red animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-dahlia-red animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-dahlia-red animate-bounce" style={{ animationDelay: "300ms" }} />
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Add to cart buttons for extracted items */}
                  {extractedItems.length > 0 && !loading && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1.5 pl-2">
                      <div className="text-[9px] uppercase tracking-wider text-dahlia-yellow flex items-center gap-1.5">
                        <ShoppingBag size={9} /> Add to your order:
                      </div>
                      {extractedItems.map((item) => (
                        <motion.button
                          key={item.id}
                          onClick={() => { addToCart(item); setExtractedItems((prev) => prev.filter((p) => p.id !== item.id)); }}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.97 }}
                          data-testid={`ai-add-${item.id}`}
                          className="flex items-center justify-between gap-3 border border-dahlia-border px-3 py-2 text-left hover:border-dahlia-red hover:bg-dahlia-red/5 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <Plus size={12} className="text-dahlia-red" />
                            <span className="text-[11px] font-display uppercase">{item.name}</span>
                          </div>
                          <span className="text-[11px] font-display text-dahlia-red">€{item.price}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Quick prompts */}
                {messages.length <= 1 && (
                  <div className="px-5 pb-2">
                    <div className="text-[10px] uppercase tracking-wider text-dahlia-muted mb-2">
                      {mode === "order" ? "Quick orders:" : mode === "waiter" ? "Common requests:" : "Try asking:"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {mode === "waiter" ? (
                        <>
                          {["We need more napkins", "Can we get the bill?", "How long for our pizza?", "Table for 4 please"].map((p) => (
                            <button key={p} onClick={() => handleSend(p)} className="text-[10px] px-2 py-1.5 border border-dahlia-border text-dahlia-text/80 hover:border-dahlia-red hover:text-dahlia-red transition-colors">{p}</button>
                          ))}
                        </>
                      ) : mode === "order" ? (
                        <>
                          {["Margherita + Prosecco", "La Salsiccia + Chianti", "2 Spritz + Polpette", "Full dinner for 2, €50"].map((p) => (
                            <button key={p} onClick={() => handleSend(p)} className="text-[10px] px-2 py-1.5 border border-dahlia-border text-dahlia-text/80 hover:border-dahlia-red hover:text-dahlia-red transition-colors">{p}</button>
                          ))}
                        </>
                      ) : (
                        prompts.map((p) => (
                          <button key={p} onClick={() => handleSend(p)} data-testid={`ai-prompt-${p.slice(0, 10)}`} className="text-[10px] px-2 py-1.5 border border-dahlia-border text-dahlia-text/80 hover:border-dahlia-red hover:text-dahlia-red transition-colors">{p}</button>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Input */}
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 px-4 py-3 border-t border-dahlia-border">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === "order" ? "Type your order..." : mode === "waiter" ? "What do you need?" : "Ask about pairings, dietary needs..."}
                    data-testid="ai-chef-input"
                    className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-dahlia-muted/60"
                    disabled={loading}
                  />
                  <button type="submit" data-testid="ai-chef-send" disabled={loading || !input.trim()} className="w-9 h-9 flex items-center justify-center bg-dahlia-red text-white hover:bg-[#ff5039] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <Send size={14} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
