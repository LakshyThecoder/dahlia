import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Sticker from "../components/Sticker";

/**
 * EditorialSplit — 60/40 text + dual stacked image columns with parallax.
 * The flagship "magazine spread" pattern.
 *
 * Props:
 *   overline     — small label
 *   heading      — JSX or string
 *   body         — body paragraph
 *   items        — array of { label, value } for bottom list
 *   ctaLabel     — CTA link label
 *   ctaHref      — CTA href
 *   imgTop       — top image URL
 *   imgBottom    — bottom image URL (optional, creates collage effect)
 *   stickerText  — sticker copy (omit to hide)
 *   stickerBg    — sticker background color
 *   reverse      — flip image/text order
 */
export default function EditorialSplit({
  overline = "02 — The Bar",
  heading,
  body = "An editorial description that sets the tone. Keep it moody, brief, and memorable.",
  items = [],
  ctaLabel = "See more →",
  ctaHref = "#",
  imgTop,
  imgBottom,
  stickerText,
  stickerBg = "#F74898",
  reverse = false,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-30px", "50px"]);

  const textCol = (
    <div className="lg:col-span-7 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-5 flex items-center gap-3"
      >
        <span className="inline-block w-6 h-[2px] bg-dahlia-red" />
        {overline}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {heading ? (
          typeof heading === "string" ? (
            <h2 className="font-display text-6xl md:text-[8rem] uppercase leading-[0.85] tracking-tighter">
              {heading}
            </h2>
          ) : heading
        ) : (
          <h2 className="font-display text-6xl md:text-[8rem] uppercase leading-[0.85] tracking-tighter">
            Your<br />
            <span className="text-stroke">Headline</span><br />
            <span className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-yellow">here.</span>
          </h2>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-editorial italic text-xl text-dahlia-muted mt-6 max-w-lg leading-snug"
      >
        {body}
      </motion.p>

      {items.length > 0 && (
        <ul className="mt-8 space-y-0">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
              className="flex items-baseline justify-between border-b border-dahlia-border py-3 group"
            >
              <span className="text-sm text-dahlia-text group-hover:text-dahlia-red transition-colors">{item.label}</span>
              {item.value && <span className="font-display text-xl text-dahlia-yellow">{item.value}</span>}
            </motion.li>
          ))}
        </ul>
      )}

      {ctaLabel && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <a
            href={ctaHref}
            data-testid="editorial-split-cta"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red hover:gap-3 transition-all"
          >
            {ctaLabel}
          </a>
        </motion.div>
      )}
    </div>
  );

  const imageCol = (
    <div className="lg:col-span-5 relative h-[520px] md:h-[640px]">
      {stickerText && (
        <Sticker
          text={stickerText}
          rotate={-10}
          bg={stickerBg}
          delay={0.6}
          className="absolute -top-5 -left-5 z-20"
        />
      )}
      <motion.div
        style={{ y: y1 }}
        className="absolute left-0 top-0 w-[70%] h-[72%] overflow-hidden group"
      >
        {imgTop && (
          <img src={imgTop} alt="" className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1.6s]" />
        )}
      </motion.div>
      {imgBottom && (
        <motion.div
          style={{ y: y2 }}
          className="absolute right-0 bottom-0 w-[60%] h-[52%] overflow-hidden group"
        >
          <img src={imgBottom} alt="" className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1.6s]" />
        </motion.div>
      )}
    </div>
  );

  return (
    <section
      ref={ref}
      data-testid="editorial-split"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-dahlia-bg overflow-hidden"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${reverse ? "direction-rtl" : ""}`}>
        {reverse ? <>{imageCol}{textCol}</> : <>{textCol}{imageCol}</>}
      </div>
    </section>
  );
}
