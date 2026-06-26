import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Sticker from "../components/Sticker";

/**
 * HeroPattern — cinematic full-viewport hero.
 * Replace props with your brand values.
 *
 * Props:
 *   image       — background image URL
 *   line1       — first heading line (large)
 *   line2       — second heading line
 *   line3       — third heading line (italic editorial)
 *   sub         — subtitle paragraph
 *   ctaLabel    — primary CTA label
 *   ctaHref     — primary CTA href
 *   stickerText — floating sticker copy
 *   scrollTarget— element ID to scroll to on arrow click
 */
export default function HeroPattern({
  image,
  line1 = "YOUR",
  line2 = "HEADLINE",
  line3 = "right here.",
  sub = "A short editorial subtitle that sets the mood.",
  ctaLabel = "Discover more",
  ctaHref = "#next",
  stickerText = "Hello!",
  scrollTarget = "#next",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY     = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.82]);

  const wordVariant = {
    hidden: { y: "110%", rotateX: 40, opacity: 0 },
    show: (i) => ({
      y: 0, rotateX: 0, opacity: 1,
      transition: { delay: 0.3 + i * 0.12, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-end overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imgY, scale: imgScale }}
        initial={{ scale: 1.3, filter: "brightness(0.4)" }}
        animate={{ scale: 1.05, filter: "brightness(1)" }}
        transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={image} alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity, background: "linear-gradient(to top, #0D0C0B 0%, rgba(13,12,11,0.55) 50%, rgba(13,12,11,0.3) 100%)" }}
      />

      {/* Floating sticker */}
      <Sticker
        text={stickerText}
        rotate={-8}
        delay={1.8}
        className="absolute top-[22%] right-[8%] md:right-[12%]"
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pb-16 md:pb-20 lg:pb-24">
        <div style={{ perspective: "1200px" }}>
          {[line1, line2].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                variants={wordVariant}
                initial="hidden"
                animate="show"
                custom={i}
                data-testid={`hero-title-line${i + 1}`}
                className="font-display text-[18vw] md:text-[16vw] uppercase leading-[0.85] tracking-tighter text-dahlia-text"
              >
                {line}
              </motion.h1>
            </div>
          ))}
          <div className="overflow-hidden">
            <motion.h1
              variants={wordVariant}
              initial="hidden"
              animate="show"
              custom={2}
              data-testid="hero-title-line3"
              className="font-editorial italic font-medium normal-case tracking-normal text-[12vw] md:text-[10vw] leading-[0.85] text-dahlia-text"
            >
              {line3}
            </motion.h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial italic text-xl md:text-2xl text-dahlia-text/80 max-w-lg"
          >
            {sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <a
              href={ctaHref}
              data-testid="hero-cta-primary"
              className="inline-flex items-center gap-3 bg-dahlia-red text-white px-7 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-3px] hover:bg-[#ff5039] hover:shadow-[0_12px_40px_-8px_rgba(255,59,34,0.5)] transition-all duration-300"
            >
              {ctaLabel} <span className="text-base leading-none">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href={scrollTarget}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        data-testid="hero-scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-dahlia-muted hover:text-dahlia-red transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
