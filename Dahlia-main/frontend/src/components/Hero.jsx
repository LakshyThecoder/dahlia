import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG } from "@/lib/images";
import { ArrowDown } from "lucide-react";
import Magnetic from "@/components/Magnetic";

const word = {
  hidden: { y: "110%", rotateX: 40, opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { delay: 0.3 + i * 0.12, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.8]);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.img
          src={IMG.heroPizza}
          alt="Hand-tossed pizza on a moody table at Dahlia Milano"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          initial={{ scale: 1.3, filter: "brightness(0.4)" }}
          animate={{ scale: 1.05, filter: "brightness(1)" }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ scale: imgScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-dahlia-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50" />
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </motion.div>

      {/* Grain layer */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      {/* Top mini bar */}
      <div className="relative z-10 pt-28 md:pt-32 px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-dahlia-text/70"
        >
          <span data-testid="hero-since" className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-dahlia-red animate-pulse" />
            Est. Milano · Via Ripamonti 35
          </span>
          <span className="hidden md:inline font-mono text-[10px]">45.4435° N / 9.1948° E</span>
          <span className="text-dahlia-red font-semibold">8.8 / 10 · Fabulous</span>
        </motion.div>
      </div>

      {/* Headline with 3D perspective */}
      <motion.div className="relative z-10 px-6 md:px-12 lg:px-16 mt-16 md:mt-24" style={{ y: textY, perspective: "1200px" }}>
        <div className="overflow-hidden">
          <motion.h1
            variants={word}
            initial="hidden"
            animate="show"
            custom={0}
            data-testid="hero-title-line1"
            className="font-display text-[22vw] md:text-[18vw] lg:text-[16vw] leading-[0.85] tracking-tighter uppercase will-change-transform"
          >
            Dahlia
          </motion.h1>
        </div>
        <div className="overflow-hidden -mt-2 md:-mt-6">
          <motion.h1
            variants={word}
            initial="hidden"
            animate="show"
            custom={1}
            data-testid="hero-title-line2"
            className="font-display text-[22vw] md:text-[18vw] lg:text-[16vw] leading-[0.85] tracking-tighter uppercase text-stroke-red will-change-transform"
          >
            .oven
          </motion.h1>
        </div>

        {/* Accent line sweep */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] bg-gradient-to-r from-dahlia-red via-dahlia-yellow to-transparent mt-6 origin-left max-w-md"
        />
      </motion.div>

      {/* Playful sticker */}
      <motion.div
        initial={{ opacity: 0, rotate: -25, scale: 0.4, y: 30 }}
        animate={{ opacity: 1, rotate: -8, scale: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.9, type: "spring", stiffness: 180 }}
        className="absolute z-20 top-[42%] right-6 md:right-20 float-slow"
        style={{ "--r": "-8deg" }}
        data-testid="hero-sticker"
      >
        <div className="bg-dahlia-yellow text-dahlia-bg px-5 py-2 font-script text-3xl md:text-4xl shadow-[6px_6px_0_0_rgba(255,59,34,0.9)] hover:shadow-[10px_10px_0_0_rgba(255,59,34,0.9)] hover:rotate-[-4deg] transition-all duration-300 cursor-pointer">
          Ciao bella!
        </div>
      </motion.div>

      {/* Subtitle + CTAs */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 mt-10 md:mt-14 pb-24 md:pb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.0, duration: 0.9 }}
          data-testid="hero-subtitle"
          className="font-editorial italic text-2xl md:text-3xl max-w-xl text-dahlia-text/95 leading-snug"
        >
          Not just a pizza restaurant. The <span className="text-dahlia-red">coolest</span> place in the city — where every night feels like a soft little riot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="flex items-center gap-4"
        >
          <Magnetic strength={0.3}>
            <a
              href="#reserve"
              data-testid="hero-cta-book"
              className="inline-flex items-center gap-3 bg-dahlia-red text-white px-7 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-3px] hover:shadow-[0_12px_40px_-8px_rgba(255,59,34,0.5)] hover:bg-[#ff5039] transition-all duration-300"
            >
              Book a table
              <span className="text-base leading-none">→</span>
            </a>
          </Magnetic>
          <a
            href="/menu"
            data-testid="hero-cta-menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-dahlia-text/90 border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red transition-colors"
          >
            See the full menu →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-dahlia-text/60"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
