import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Flame, Wine, Coffee, Cookie, Salad, Pizza as PizzaIcon, Plus, Sparkles } from "lucide-react";
import { MENU } from "@/lib/menu";
import { CartProvider, CartBubble, CartDrawer, useCart } from "@/components/CartSystem";
import AiChef from "@/components/AiChef";

const SECTIONS = [
  { id: "sfizi", icon: Salad },
  { id: "gourmet", icon: Flame },
  { id: "classiche", icon: PizzaIcon },
  { id: "dolci", icon: Cookie },
  { id: "bevande", icon: Wine },
  { id: "caffetteria", icon: Coffee },
];

export default function Menu() {
  return (
    <CartProvider>
      <MenuInner />
      <CartDrawer />
      <CartBubble />
      <AiChef />
    </CartProvider>
  );
}

function MenuInner() {
  const [active, setActive] = useState("sfizi");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-dahlia-bg text-dahlia-text font-body grain" data-testid="menu-page">
      {/* Top bar */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
          <Link to="/oven" data-testid="menu-back" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] hover:text-dahlia-red transition-colors">
            <ArrowLeft size={14} /> Back to .oven
          </Link>
          <div className="flex items-center gap-2 font-display text-2xl tracking-wide">
            DAHLIA<span className="text-dahlia-red font-editorial italic text-base ml-1">.la carta</span>
          </div>
          <Link to="/oven#reserve" data-testid="menu-book" className="text-[11px] uppercase tracking-[0.3em] bg-dahlia-red text-white px-4 py-2 hover:bg-[#ff5039] transition-colors">
            Book a table →
          </Link>
          <CartTrigger />
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-12 md:pb-16 overflow-hidden">
          {/* Ghost background */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-33.33%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
            className="absolute inset-x-0 top-32 pointer-events-none select-none opacity-[0.04]"
          >
            <div className="font-display text-[28vw] uppercase leading-none whitespace-nowrap text-dahlia-text">
              LA CARTA · LA CARTA · LA CARTA · LA CARTA · LA CARTA · LA CARTA
            </div>
          </motion.div>

          <div className="relative grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-9">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[11px] uppercase tracking-[0.35em] text-dahlia-red font-semibold mb-5 flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-dahlia-red pulse-dot" />
                Dahlia Milano · La Carta · Updated weekly
                <span className="ml-3 inline-flex items-center gap-1.5 text-dahlia-yellow border border-dahlia-yellow/40 px-2 py-0.5">
                  <Sparkles size={10} /> AI-powered
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-7xl md:text-[12rem] uppercase leading-[0.82] tracking-tighter"
              >
                La carta
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-text/90"
                >
                  read it
                </motion.span>{" "}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-stroke-red"
                >
                  slow.
                </motion.span>
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="col-span-12 md:col-span-3"
            >
              <p className="font-editorial italic text-lg text-dahlia-muted leading-snug border-l border-dahlia-red pl-5">
                Long-leavened dough. Selected grains. Allergies? Tell the room. Some products are frozen and stored at –18°C.
              </p>
              <div className="mt-4 text-[10px] uppercase tracking-wider text-dahlia-muted/70 flex items-center gap-2">
                <Sparkles size={10} className="text-dahlia-yellow" />
                Ask our AI chef for pairings →
              </div>
            </motion.div>
          </div>

          {/* Quick stats ribbon */}
          <div className="relative mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 border-y border-dahlia-border">
            {[
              ["35+", "Dishes"],
              ["480°C", "Oven temp"],
              ["72h", "Dough lievitazione"],
              ["100%", "Italiano"],
            ].map(([n, l], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                data-testid={`menu-stat-${i}`}
                className={`py-6 md:py-8 px-4 ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 ? "border-r md:border-r" : ""} border-dahlia-border group hover:bg-dahlia-surface/50 transition-colors`}
              >
                <div className="font-display text-4xl md:text-5xl leading-none text-dahlia-yellow group-hover:scale-105 transition-transform origin-left">{n}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted mt-3">{l}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LAYOUT: sticky nav + content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-6 md:px-12 lg:px-16 pb-24">
          {/* Sticky nav */}
          <aside className="lg:col-span-3" data-testid="menu-nav">
            <div className="lg:sticky lg:top-28 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {SECTIONS.map((s) => {
                const I = s.icon;
                const isActive = active === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    data-testid={`menu-nav-${s.id}`}
                    className={`group flex items-center gap-3 px-4 py-3 border transition-all duration-300 shrink-0 ${
                      isActive
                        ? "bg-dahlia-red border-dahlia-red text-white"
                        : "border-dahlia-border text-dahlia-text/80 hover:border-dahlia-red hover:text-dahlia-text"
                    }`}
                  >
                    <I size={16} strokeWidth={1.5} />
                    <span className="font-display text-xl uppercase tracking-wide">
                      {MENU[s.id].label}
                    </span>
                  </a>
                );
              })}
              <div className="mt-6 px-4 py-3 border border-dahlia-border text-[10px] uppercase tracking-[0.25em] text-dahlia-muted hidden lg:block">
                Coperto <span className="text-dahlia-red float-right">2 €</span><br/>
                Extra <span className="text-dahlia-red float-right">1.5 €</span>
              </div>
              <div className="mt-3 px-4 py-3 border border-dahlia-yellow/30 bg-dahlia-yellow/5 hidden lg:block">
                <div className="text-[9px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-2 flex items-center gap-1.5">
                  <Sparkles size={9} /> Chef&apos;s tonight
                </div>
                <div className="text-[11px] text-dahlia-text/80 leading-snug">
                  La Salsiccia + Chianti — the perfect Friday combo 🍷
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9 flex flex-col gap-20 md:gap-28" data-testid="menu-content">
            {/* Sfizi */}
            <Section data={MENU.sfizi} number="01" />
            {/* Gourmet */}
            <Section data={MENU.gourmet} number="02" featured />
            {/* Classiche */}
            <Section data={MENU.classiche} number="03" twoCol />
            {/* Dolci */}
            <Section data={MENU.dolci} number="04" />
            {/* Bevande */}
            <BevandeSection data={MENU.bevande} number="05" />
            {/* Caffetteria */}
            <Section data={MENU.caffetteria} number="06" twoCol after={MENU.caffetteria.after} />

            {/* Footnote */}
            <div className="border-t border-dahlia-border pt-10 text-sm text-dahlia-muted font-editorial italic leading-relaxed max-w-3xl">
              Our long-leavened dough is born from a blend of selected grains. Please flag allergies or intolerances to our staff — some products are blast-chilled and stored at –18°C.
              <div className="mt-4 flex gap-6 font-body not-italic text-[11px] uppercase tracking-[0.25em] text-dahlia-text">
                <span>Coperto · <span className="text-dahlia-red">2 €</span></span>
                <span>Extra · <span className="text-dahlia-red">1.5 €</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA band */}
        <section className="border-y border-dahlia-border bg-dahlia-surface py-20 md:py-28 px-6 md:px-12 lg:px-16 text-center" data-testid="menu-cta">
          <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-5">
            Hungry now?
          </div>
          <h2 className="font-display text-6xl md:text-9xl uppercase leading-[0.85] tracking-tighter max-w-5xl mx-auto">
            Book a table.
            <br />
            <span className="text-stroke-red">Eat slowly.</span>
          </h2>
          <div className="mt-10 flex items-center justify-center gap-5">
            <Link
              to="/oven#reserve"
              data-testid="menu-cta-book"
              className="inline-flex items-center gap-3 bg-dahlia-red text-white px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-3px] hover:bg-[#ff5039] transition-all duration-300"
            >
              Book a table →
            </Link>
            <Link
              to="/oven"
              data-testid="menu-cta-back"
              className="text-xs uppercase tracking-[0.25em] border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red transition-colors"
            >
              Back to the dining room
            </Link>
          </div>
        </section>

        <footer className="border-t border-dahlia-border px-6 md:px-12 lg:px-16 py-8 flex flex-col md:flex-row justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-dahlia-muted">
          <span>© {new Date().getFullYear()} Dahlia Milano · La carta</span>
          <span>Crafted by <a href="#" data-testid="valtoris-credit-menu" className="text-dahlia-red hover:text-dahlia-yellow transition-colors font-semibold">Valtoris</a></span>
        </footer>
      </main>
    </div>
  );
}

function Section({ data, number, twoCol = false, featured = false, after }) {
  return (
    <section id={data.id} data-testid={`section-${data.id}`} className="scroll-mt-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end justify-between border-b border-dahlia-border pb-6 mb-10"
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-3 flex items-center gap-2">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block w-4 h-[2px] bg-dahlia-red origin-left"
            />
            Section {number}
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter">
            {data.label}
          </h2>
          <p className="font-editorial italic text-lg text-dahlia-muted mt-3">{data.sub}</p>
        </div>
        <div className="hidden md:block font-display text-7xl md:text-9xl text-dahlia-border leading-none select-none">
          {number}
        </div>
      </motion.div>

      {/* Items */}
      <ul className={`grid ${twoCol ? "grid-cols-1 md:grid-cols-2 gap-x-10" : "grid-cols-1"} divide-y divide-dahlia-border md:divide-y-0`}>
        {data.items.map((it, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.03 }}
            data-testid={`item-${data.id}-${i}`}
            className={`group py-5 md:py-6 grid grid-cols-[40px_1fr_auto_auto] items-center gap-4 ${twoCol ? "border-b border-dahlia-border" : ""} hover:translate-x-1 hover:bg-white/[0.02] transition-all duration-300`}
          >
            <span className="font-display text-xl text-dahlia-muted group-hover:text-dahlia-red transition-colors self-start mt-1">
              {it.n}
            </span>
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className={`font-display ${featured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} uppercase leading-none`}>
                  {it.name}
                </span>
                {it.tag && (
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-dahlia-yellow border border-dahlia-yellow/40 px-2 py-0.5 group-hover:bg-dahlia-yellow/10 transition-colors">
                    {it.tag}
                  </span>
                )}
              </div>
              <div className={`text-sm text-dahlia-muted leading-snug mt-2 ${featured ? "max-w-2xl" : "max-w-xl"}`}>
                {it.sub}
              </div>
            </div>
            <span className="font-display text-2xl md:text-3xl text-dahlia-red tabular-nums whitespace-nowrap self-center group-hover:scale-105 transition-transform origin-right">
              {it.price} <span className="text-base text-dahlia-text/60">€</span>
            </span>
            <AddBtn item={{ id: `${data.id}-${i}`, category: data.id, name: it.name, sub: it.sub, price: Number(it.price) }} />
          </motion.li>
        ))}
      </ul>

      {/* After / liquori */}
      {after && (
        <div className="mt-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-4">
            {after.head}
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid={`after-${data.id}`}>
            {after.items.map(([n, p], i) => (
              <li key={i} className="border border-dahlia-border p-4 flex items-baseline justify-between hover:border-dahlia-red transition-colors">
                <span className="font-display text-xl uppercase">{n}</span>
                <span className="font-display text-xl text-dahlia-red">{p} €</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function BevandeSection({ data, number }) {
  return (
    <section id={data.id} data-testid={`section-${data.id}`} className="scroll-mt-28">
      <div className="flex items-end justify-between border-b border-dahlia-border pb-6 mb-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-3">
            Section {number}
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter">
            {data.label}
          </h2>
          <p className="font-editorial italic text-lg text-dahlia-muted mt-3">{data.sub}</p>
        </div>
        <div className="hidden md:block font-display text-7xl md:text-9xl text-dahlia-border leading-none select-none">
          {number}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
        {data.groups.map((g, gi) => (
          <div key={gi} data-testid={`bevande-group-${gi}`}>
            <div className="flex items-end justify-between mb-4">
              <div className="font-display text-3xl md:text-4xl uppercase">{g.head}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted flex gap-6">
                {g.cols.map((c, ci) => c && <span key={ci}>{c}</span>)}
              </div>
            </div>
            <ul className="divide-y divide-dahlia-border">
              {g.items.map((row, ri) => (
                <li key={ri} className="py-3 grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 md:gap-5 group hover:translate-x-1 transition-transform">
                  <span className="font-display text-xl uppercase leading-none">{row[0]}</span>
                  <span className="font-display text-lg text-dahlia-red tabular-nums w-12 text-right">
                    {row[1]} €
                  </span>
                  <span className={`font-display text-lg text-dahlia-text/70 tabular-nums w-14 text-right ${row[2] ? "" : "opacity-0"}`}>
                    {row[2] && `${row[2]} €`}
                  </span>
                  <AddBtn item={{ id: `bev-${gi}-${ri}`, category: "bevande", name: row[0], sub: g.head, price: Number(row[1]) }} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


function AddBtn({ item }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={() => add(item)}
      data-testid={`add-${item.id}`}
      className="shrink-0 w-9 h-9 md:w-10 md:h-10 border border-dahlia-border hover:bg-dahlia-red hover:border-dahlia-red hover:text-white flex items-center justify-center transition-colors group/btn"
      aria-label={`Add ${item.name} to cart`}
    >
      <Plus size={16} className="group-hover/btn:scale-125 transition-transform" />
    </button>
  );
}

function CartTrigger() {
  const { totals, setOpen } = useCart();
  return (
    <button
      onClick={() => setOpen(true)}
      data-testid="header-cart-trigger"
      className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] border border-dahlia-border px-3 py-2 hover:border-dahlia-red hover:text-dahlia-red transition-colors"
    >
      Carrello
      <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-dahlia-red text-white text-[10px] font-bold tabular-nums">
        {totals.count}
      </span>
    </button>
  );
}
