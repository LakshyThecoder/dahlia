import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMG } from "@/lib/images";

const PIZZAS = [
  {
    n: "01",
    name: "La Zucchina",
    sub: "Crema di zucchine · Stracciatella allo zafferano · Gamberetti saltati · Erba cipollina",
    price: "€15",
    img: IMG.heroPizza,
    tag: "Signature",
  },
  {
    n: "02",
    name: "La Zola",
    sub: "Gorgonzola Zola · Fior di latte · Mela · Grana · Noci · Basilico",
    price: "€13",
    img: IMG.pizzaTwo,
    tag: "House Favourite",
  },
  {
    n: "03",
    name: "La Salsiccia",
    sub: "Pomodoro San Marzano DOP · Fior di latte · Patate al forno · Salsiccia · Rosmarino",
    price: "€13",
    img: IMG.pizzaSliceHand,
    tag: "Best Seller",
  },
  {
    n: "04",
    name: "Studente Felice",
    sub: "Margherita DOC · Plus anything you want · ID required, vibes mandatory",
    price: "€9",
    img: IMG.pizzaTable,
    tag: "Student deal",
  },
  {
    n: "05",
    name: "Burrata & Crudo",
    sub: "S. Marzano DOP · Pomodorini confit · Burrata pugliese · Crudo di Parma 24m",
    price: "€16",
    img: IMG.pizzaTwo,
    tag: "Premium",
  },
];

export default function PizzaShowcase() {
  const [active, setActive] = useState(0);
  const current = PIZZAS[active];

  return (
    <section
      id="pizza"
      data-testid="pizza-section"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4 flex items-center gap-3"
          >
            <span className="inline-block w-6 h-[2px] bg-dahlia-red" />
            01 — La Carta · Signatures
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            data-testid="pizza-heading"
            className="font-display text-6xl md:text-8xl uppercase leading-[0.9] tracking-tighter"
          >
            Hot dough,
            <br />
            <span className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-text/90">
              cooler people.
            </span>
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:max-w-xs flex flex-col gap-4"
        >
          <p className="font-editorial italic text-xl text-dahlia-muted">
            Five signatures. Wood-fired. Zero compromises. The full carta has thirty more.
          </p>
          <a
            href="/menu"
            data-testid="pizza-see-full-menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-dahlia-red font-semibold border-b border-dahlia-red/40 pb-1 hover:border-dahlia-red hover:gap-3 transition-all self-start"
          >
            Read the full carta →
          </a>
        </motion.div>
      </div>

      {/* Interactive showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Big image */}
        <div className="lg:col-span-7 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, scale: 1.06, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden bg-dahlia-surface"
              data-testid="pizza-active-image"
            >
              <motion.img
                src={current.img}
                alt={current.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute top-5 left-5 flex items-center gap-2"
              >
                <span className="bg-dahlia-yellow text-dahlia-bg px-3 py-1 text-[11px] font-bold uppercase tracking-widest shadow-[4px_4px_0_0_rgba(255,59,34,0.8)]">
                  {current.tag}
                </span>
              </motion.div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="font-script text-3xl text-dahlia-yellow -mb-1"
                  >
                    Buonissimo!
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="font-display text-5xl md:text-7xl uppercase leading-none"
                  >
                    {current.name}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
                  className="font-display text-5xl text-dahlia-red"
                >
                  {current.price}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating sticker */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -right-3 md:-right-8 z-10"
            aria-hidden="true"
          >
            <svg width="120" height="120" viewBox="0 0 120 120" className="hidden md:block">
              <defs>
                <path
                  id="curve"
                  d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                />
              </defs>
              <circle cx="60" cy="60" r="55" fill="none" stroke="#FF3B22" strokeWidth="1" />
              <text fill="#FFC01E" fontFamily="Bebas Neue" fontSize="11" letterSpacing="3">
                <textPath href="#curve">WOOD FIRED · 90 SEC · 480°C · DAHLIA MILANO · </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Menu list */}
        <ul className="lg:col-span-5 flex flex-col" data-testid="pizza-menu-list">
          {PIZZAS.map((p, i) => {
            const isActive = i === active;
            return (
              <li key={p.name} className="border-t border-dahlia-border last:border-b">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-testid={`pizza-item-${i}`}
                  className={`group w-full text-left py-6 md:py-7 grid grid-cols-[40px_1fr_auto] items-center gap-4 transition-all duration-300 ${
                    isActive ? "text-dahlia-text pl-2" : "text-dahlia-muted hover:text-dahlia-text hover:pl-1"
                  }`}
                >
                  <span className={`font-display text-2xl transition-colors duration-300 ${isActive ? "text-dahlia-red" : ""}`}>{p.n}</span>
                  <span className="flex flex-col">
                    <span className={`font-display text-3xl md:text-4xl uppercase leading-none transition-all duration-300 ${isActive ? "text-dahlia-red translate-x-1" : ""}`}>
                      {p.name}
                    </span>
                    <span className={`text-sm mt-1.5 font-body text-dahlia-muted transition-all duration-300 ${isActive ? "opacity-100" : "opacity-70"}`}>
                      {p.sub}
                    </span>
                  </span>
                  <span className={`font-display text-2xl md:text-3xl transition-all duration-300 ${isActive ? "text-dahlia-yellow scale-110" : ""}`}>{p.price}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
