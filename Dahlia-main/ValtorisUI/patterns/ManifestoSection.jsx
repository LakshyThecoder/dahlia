import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "react-fast-marquee";

/**
 * ManifestoSection — full-width giant-type manifesto + optional language ticker.
 * The "Events / Weekly Ritual" section pattern.
 *
 * Props:
 *   overline      — section label
 *   headingLines  — array of { text, stroke?, italic?, color? } for each heading line
 *   sub           — editorial subtitle paragraph
 *   tickerItems   — array of strings for the language ticker (omit to hide)
 *   tickerSpeed   — marquee speed (default 50)
 *   cards         — array of { number, title, body } ritual/event cards
 *   ctaLabel      — CTA button label
 *   ctaHref       — CTA href
 */
export default function ManifestoSection({
  overline = "03 — Every Week",
  headingLines = [
    { text: "YOUR", stroke: false },
    { text: "MANIFESTO", stroke: true },
    { text: "here.", italic: true, color: "var(--dahlia-yellow)" },
  ],
  sub = "A short manifesto-style paragraph. Keep it punchy, bold, and on-brand.",
  tickerItems,
  tickerSpeed = 50,
  cards = [],
  ctaLabel = "See the full schedule",
  ctaHref = "#",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0px", "80px"]);

  return (
    <section
      ref={ref}
      data-testid="manifesto-section"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-dahlia-surface overflow-hidden"
    >
      {/* Ghost background type */}
      <motion.div
        style={{ y: ghostY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 z-0 select-none"
      >
        <div className="font-display text-[18vw] uppercase tracking-tighter leading-none whitespace-nowrap text-dahlia-text/[0.025]">
          MANIFESTO · MANIFESTO
        </div>
      </motion.div>

      <div className="relative z-10">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-6 flex items-center gap-3"
        >
          <span className="inline-block w-6 h-[2px] bg-dahlia-red" />
          {overline}
        </motion.div>

        {/* Giant heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-[14vw] md:text-[10vw] uppercase leading-[0.88] tracking-tighter">
            {headingLines.map((line, i) => (
              <span
                key={i}
                className={`block ${line.italic ? "font-editorial italic font-medium normal-case tracking-normal text-[10vw] md:text-[7vw]" : ""} ${line.stroke ? "text-stroke" : ""}`}
                style={{ color: line.color || undefined }}
              >
                {line.text}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-editorial italic text-xl md:text-2xl text-dahlia-muted mt-8 max-w-2xl"
        >
          {sub}
        </motion.p>

        {/* Language ticker */}
        {tickerItems && (
          <div className="mt-12 mb-14 -mx-6 md:-mx-12 lg:-mx-16 border-y border-dahlia-border overflow-hidden py-3">
            <Marquee gradient={false} speed={tickerSpeed} pauseOnHover>
              {tickerItems.concat(tickerItems).map((t, i) => (
                <span key={i} className="font-editorial italic text-2xl text-dahlia-muted px-6">
                  {t}
                  <span className="mx-6 inline-block w-1.5 h-1.5 rounded-full bg-dahlia-red align-middle" />
                </span>
              ))}
            </Marquee>
          </div>
        )}

        {/* Ritual / event cards */}
        {cards.length > 0 && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                data-testid={`manifesto-card-${i}`}
                className="group relative overflow-hidden border border-dahlia-border hover:border-dahlia-red transition-colors duration-300 p-7"
              >
                <div className="absolute -bottom-6 -right-4 font-display text-[10rem] leading-none text-dahlia-text/[0.04] select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-3">
                    {card.number || `0${i + 1}`}
                  </div>
                  <h3 className="font-display text-2xl uppercase leading-none mb-3 text-dahlia-text">
                    {card.title}
                  </h3>
                  <p className="text-sm text-dahlia-muted leading-snug">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        {ctaLabel && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <a
              href={ctaHref}
              data-testid="manifesto-cta"
              className="inline-flex items-center gap-3 bg-dahlia-red text-white px-7 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-3px] hover:bg-[#ff5039] hover:shadow-[0_12px_40px_-8px_rgba(255,59,34,0.5)] transition-all duration-300"
            >
              {ctaLabel} <span className="text-base leading-none">→</span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
