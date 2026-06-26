import { motion } from "framer-motion";

/**
 * StatsBand — horizontal ribbon of 3–5 metrics.
 * Giant number + overline label, divided by border lines.
 *
 * Props:
 *   stats      — array of { value, label, suffix? }
 *   bigStat    — optional { value, label, sub, quote, author } for left anchor
 *   bg         — background (default dahlia-bg)
 */
export default function StatsBand({
  stats = [
    { value: "9.1", label: "Food" },
    { value: "8.7", label: "Service" },
    { value: "8.4", label: "Ambience" },
    { value: "82",  label: "Reviews" },
  ],
  bigStat,
  bg = "var(--dahlia-bg)",
}) {
  return (
    <section
      data-testid="stats-band"
      className="relative border-y border-dahlia-border py-14 md:py-20 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{ background: bg }}
    >
      <div className={`grid grid-cols-1 ${bigStat ? "lg:grid-cols-12" : ""} gap-10 items-center`}>
        {bigStat && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex items-end gap-4"
          >
            <div className="font-display text-[8rem] md:text-[12rem] leading-[0.8] text-dahlia-text">
              {bigStat.value}
            </div>
            <div className="pb-3">
              <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-2">
                {bigStat.label}
              </div>
              {bigStat.sub && (
                <div className="font-editorial italic text-3xl text-dahlia-yellow leading-none">
                  {bigStat.sub}
                </div>
              )}
            </div>
          </motion.div>
        )}

        <div className={`${bigStat ? "lg:col-span-8" : ""} grid grid-cols-2 md:grid-cols-${stats.length} gap-x-6 gap-y-8`}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              data-testid={`stat-${i}`}
              className="border-t border-dahlia-border pt-5"
            >
              <div className="font-display text-5xl md:text-6xl text-dahlia-text leading-none">
                {s.value}{s.suffix || ""}
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-dahlia-muted mt-3">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {bigStat?.quote && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-12 lg:col-start-9 lg:col-end-13 relative"
          >
            <div className="font-editorial italic text-xl text-dahlia-muted leading-snug">
              &ldquo;{bigStat.quote}&rdquo;
            </div>
            {bigStat.author && (
              <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-text/70 mt-3">
                — {bigStat.author}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
