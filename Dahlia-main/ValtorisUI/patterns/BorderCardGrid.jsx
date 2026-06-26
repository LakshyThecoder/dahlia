import { motion } from "framer-motion";

/**
 * BorderCardGrid — hoverable 1px-border cards with ghost number background.
 * The standard "features / occasions / rituals" grid.
 *
 * Props:
 *   cards  — array of { icon: LucideIcon, title, body, tag? }
 *   cols   — "2" | "3" | "4" (default "3")
 *   accent — accent color for icons and hover states
 */
export default function BorderCardGrid({ cards = [], cols = "3", accent = "var(--dahlia-red)" }) {
  const colMap = {
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${colMap[cols]} gap-3 md:gap-4`}>
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            data-testid={`border-card-${i}`}
            className="group relative overflow-hidden border border-dahlia-border hover:border-dahlia-red transition-colors duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-dahlia-red/0 group-hover:bg-dahlia-red/[0.04] transition-colors duration-500" />
            <div className="absolute -bottom-6 -right-4 font-display text-[11rem] leading-none text-dahlia-text/[0.04] select-none pointer-events-none">
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="relative p-7 md:p-8">
              {Icon && (
                <Icon
                  size={26}
                  strokeWidth={1.4}
                  className="mb-5 transition-transform group-hover:scale-110 duration-300"
                  style={{ color: accent }}
                />
              )}
              {card.tag && (
                <span
                  className="text-[8px] uppercase tracking-[0.25em] border px-2 py-0.5 mb-4 inline-block"
                  style={{ borderColor: `${accent}40`, color: accent }}
                >
                  {card.tag}
                </span>
              )}
              <h3 className="font-display text-2xl md:text-3xl uppercase leading-none mb-3 text-dahlia-text">
                {card.title}
              </h3>
              <p className="text-sm text-dahlia-muted leading-snug">{card.body}</p>

              <div
                className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ color: accent }}
              >
                Learn more →
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-out"
              style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
