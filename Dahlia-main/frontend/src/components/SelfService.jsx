import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, QrCode, Sparkles, Clock, UtensilsCrossed, Languages, ArrowUpRight } from "lucide-react";

const FEATURES = [
  { icon: Sparkles, title: "AI Sommelier", desc: "Get personalized food & wine pairings in your language. No waiting for a waiter.", color: "var(--dahlia-red)" },
  { icon: Smartphone, title: "Scan & Order", desc: "Scan the QR on your table. Browse the menu. Add to cart. Your order arrives — no flag-waving needed.", color: "var(--dahlia-yellow)" },
  { icon: Languages, title: "12 Languages", desc: "Our AI speaks English, Italian, Spanish, French, German, Portuguese, Dutch, Chinese, Japanese, Korean, Arabic & Russian.", color: "var(--dahlia-pink)" },
  { icon: Clock, title: "Smart Wait Times", desc: "Real-time estimates on your order. Know exactly when your pizza leaves the 480°C oven.", color: "var(--dahlia-red)" },
  { icon: UtensilsCrossed, title: "Dietary AI", desc: "Allergies? Vegan? Gluten-free? Our AI filters the menu instantly and suggests perfect alternatives.", color: "var(--dahlia-yellow)" },
  { icon: QrCode, title: "Split & Pay", desc: "Split the bill by item or equally. Pay from your phone. Leave when you want — no waiting for il conto.", color: "var(--dahlia-pink)" },
];

export default function SelfService() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-dahlia-surface" data-testid="self-service">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-3 flex items-center gap-2">
            <Sparkles size={10} /> Zero wait technology
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter">
            Your phone <span className="font-editorial italic font-medium normal-case tracking-normal">is</span> the waiter.
          </h2>
        </div>
        <p className="font-editorial italic text-lg text-dahlia-muted max-w-sm">
          We replaced clipboard menus with AI. Order, pay, and get recommendations — all from your table.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              data-testid={`feature-${f.title.replace(/\s/g, "-").toLowerCase()}`}
              className="border border-dahlia-border p-6 md:p-7 group hover:border-dahlia-red/40 hover:bg-dahlia-bg/50 transition-all duration-300"
            >
              <Icon size={20} style={{ color: f.color }} className="mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-display text-xl uppercase tracking-wider">{f.title}</div>
              <div className="text-sm text-dahlia-muted mt-2 leading-relaxed">{f.desc}</div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-10 border border-dahlia-border p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 border-2 border-dahlia-yellow flex items-center justify-center flex-shrink-0">
            <QrCode size={28} className="text-dahlia-yellow" />
          </div>
          <div>
            <div className="font-display text-2xl uppercase">Try it now</div>
            <div className="text-sm text-dahlia-muted mt-1">Open the AI assistant with the <span className="text-dahlia-red">red button</span> in the corner. It works right now on this website.</div>
          </div>
        </div>
        <Link
          to="/menu"
          data-testid="self-service-cta"
          className="inline-flex items-center gap-2 bg-dahlia-red text-white px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-2px] hover:bg-[#ff5039] transition-all flex-shrink-0"
        >
          Open smart menu <ArrowUpRight size={14} />
        </Link>
      </motion.div>
    </section>
  );
}
