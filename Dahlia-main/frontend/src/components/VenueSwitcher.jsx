import { useState } from "react";
import { motion } from "framer-motion";
import { IMG } from "@/lib/images";
import { Moon, Sun, ArrowRight } from "lucide-react";

const VENUES = [
  {
    id: "oven",
    eyebrow: "Notturno · Via Ripamonti",
    name: "Dahlia.oven",
    sub: "Pizza, cocktails & musica until midnight. Fridays to Sundays — the loud one.",
    img: IMG.heroPizza,
    icon: Moon,
    color: "var(--dahlia-red)",
    href: "#pizza",
    tag: "8.8 · Fabulous",
  },
  {
    id: "lab",
    eyebrow: "Diurno · Via Bocconi 6",
    name: "Dahlia.lab",
    sub: "Croissants, piadinas & espresso. From 07:30 to 22:00 — the bright one.",
    img: IMG.duomoMilano,
    icon: Sun,
    color: "var(--dahlia-yellow)",
    href: "#lab",
    tag: "3.5 · The quiet sibling",
  },
];

export default function VenueSwitcher() {
  const [hover, setHover] = useState(null);

  return (
    <section
      data-testid="venue-switcher"
      className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-dahlia-bg overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4">
            00 — Two moods, one Dahlia
          </div>
          <h2 className="font-display text-6xl md:text-8xl uppercase leading-[0.9] tracking-tighter">
            Day or night,
            <br />
            <span className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-text/90">choose your</span>{" "}
            <span className="text-stroke-red">flavour.</span>
          </h2>
        </div>
        <p className="font-editorial italic text-xl text-dahlia-muted max-w-sm">
          Two Milano addresses. Same DNA — same chaos, just dressed differently. Pick a side.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 h-[560px] md:h-[640px]"
        onMouseLeave={() => setHover(null)}
      >
        {VENUES.map((v, i) => {
          const Icon = v.icon;
          const isActive = hover === v.id;
          const isDimmed = hover !== null && hover !== v.id;
          return (
            <motion.a
              key={v.id}
              href={v.href}
              data-testid={`venue-card-${v.id}`}
              onMouseEnter={() => setHover(v.id)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden cursor-pointer transition-[opacity,transform] duration-500 ${
                isDimmed ? "opacity-50" : "opacity-100"
              }`}
            >
              <img
                src={v.img}
                alt={v.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

              {/* Corner badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-dahlia-text/90">
                <Icon size={14} style={{ color: v.color }} />
                {v.eyebrow}
              </div>

              <div className="absolute top-5 right-5 text-[10px] uppercase tracking-[0.3em] text-dahlia-text/80 border border-white/20 px-2 py-1">
                {v.tag}
              </div>

              {/* Big name */}
              <div className="absolute inset-x-6 md:inset-x-10 bottom-6 md:bottom-10 flex flex-col">
                <div className="font-display text-7xl md:text-[9rem] uppercase leading-[0.85] tracking-tighter text-dahlia-text">
                  {v.name.split(".")[0]}
                  <span style={{ color: v.color }}>.</span>
                  <span className="text-stroke">{v.name.split(".")[1]}</span>
                </div>
                <p className="font-editorial italic text-lg md:text-2xl text-dahlia-text/95 mt-4 max-w-md">
                  {v.sub}
                </p>
                <div
                  className={`mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 ${
                    isActive ? "translate-x-2" : ""
                  }`}
                  style={{ color: v.color }}
                >
                  Enter <ArrowRight size={16} />
                </div>
              </div>

              {/* Hover bar */}
              <div
                className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                style={{
                  width: isActive ? "100%" : "0%",
                  background: v.color,
                }}
              />
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
