import { motion } from "framer-motion";
import { Star } from "lucide-react";

const STATS = [
  { n: "9.1", l: "Food" },
  { n: "8.7", l: "Service" },
  { n: "8.4", l: "Ambience" },
  { n: "82", l: "Verified reviews" },
];

export default function RatingsBand() {
  return (
    <section
      data-testid="ratings-band"
      className="relative border-y border-dahlia-border bg-dahlia-bg py-14 md:py-20 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Big rating */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 flex items-end gap-4"
        >
          <div className="font-display text-[8rem] md:text-[12rem] leading-[0.8] text-dahlia-text">
            8.8
          </div>
          <div className="pb-3">
            <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-2">
              On TheFork
            </div>
            <div className="font-editorial italic text-3xl text-dahlia-yellow leading-none">
              Fabulous.
            </div>
            <div className="flex items-center gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="#FFC01E" stroke="#FFC01E" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              data-testid={`rating-stat-${i}`}
              className="border-t border-dahlia-border pt-5"
            >
              <div className="font-display text-5xl md:text-6xl text-dahlia-text leading-none">
                {s.n}
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-dahlia-muted mt-3">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2 relative"
        >
          <div className="font-editorial italic text-xl text-dahlia-muted leading-snug">
            &ldquo;The best pizza I&apos;ve had in Italy this far.&rdquo;
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-text/70 mt-3">
            — Trygve A. · 9.5/10
          </div>
        </motion.div>
      </div>
    </section>
  );
}
