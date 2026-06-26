/**
 * ValtorisUI — Motion Presets
 * ===========================
 * Every Framer Motion variant, transition, and pattern used in Dahlia Milano.
 * Import what you need. Everything is copy-paste ready.
 */

// ─── EASING CURVES ────────────────────────────────────────────────────────
export const ease = {
  cinematic: [0.22, 1, 0.36, 1],
  snappy:    [0.76, 0, 0.24, 1],
  smooth:    [0.65, 0, 0.35, 1],
  bounce:    [0.34, 1.56, 0.64, 1],
};

// ─── WORD / LINE REVEAL (mask upward) ─────────────────────────────────────
// Usage: wrap each line in <div className="overflow-hidden">
export const wordReveal = {
  hidden: { y: "110%", rotateX: 40, opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 1.2,
      ease: ease.cinematic,
    },
  }),
};

// ─── FADE UP (scroll-triggered standard) ──────────────────────────────────
export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: ease.cinematic },
};

// ─── FADE UP WITH DELAY ───────────────────────────────────────────────────
export const fadeUpDelay = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: ease.cinematic },
});

// ─── FADE IN FROM LEFT ────────────────────────────────────────────────────
export const fadeLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: ease.cinematic },
};

// ─── FADE IN FROM RIGHT ───────────────────────────────────────────────────
export const fadeRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: ease.cinematic },
};

// ─── SCALE IN ─────────────────────────────────────────────────────────────
export const scaleIn = {
  initial: { opacity: 0, scale: 0.94 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: ease.cinematic },
};

// ─── STICKER SPRING IN ────────────────────────────────────────────────────
// Pass rotation as rotateDeg (number, e.g. -8)
export const stickerSpring = (rotateDeg = -8, delay = 0.5) => ({
  initial: { opacity: 0, rotate: rotateDeg - 14, scale: 0.5 },
  whileInView: { opacity: 1, rotate: rotateDeg, scale: 1 },
  viewport: { once: true },
  transition: { delay, duration: 0.7, type: "spring", stiffness: 180, damping: 16 },
});

// ─── IMAGE HERO ENTRY ─────────────────────────────────────────────────────
export const heroImage = {
  initial: { scale: 1.3, filter: "brightness(0.4)" },
  animate: { scale: 1.05, filter: "brightness(1)" },
  transition: { duration: 2.8, ease: ease.cinematic },
};

// ─── STAGGER LIST CONTAINER ───────────────────────────────────────────────
export const staggerContainer = (stagger = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

// ─── STAGGER CHILD ────────────────────────────────────────────────────────
export const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.cinematic },
  },
};

// ─── CHARACTER REVEAL (TextReveal) ────────────────────────────────────────
export const charRevealContainer = (stagger = 0.025, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const charRevealChild = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 0.8, ease: ease.cinematic },
  },
};

// ─── LOADER CURTAIN EXIT ──────────────────────────────────────────────────
export const curtainExit = {
  initial: { y: 0 },
  exit: { y: "-100%" },
  transition: { duration: 1.0, ease: ease.snappy },
};

// ─── LINE SWEEP (horizontal bar) ──────────────────────────────────────────
export const lineSweep = (delay = 1.4) => ({
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { delay, duration: 1.0, ease: ease.cinematic },
  className: "origin-left",
});

// ─── BOTTOM BAR SWEEP (hover) — use as inline CSS width transition ────────
// Apply to: <div style={{ width: isHovered ? "100%" : "0%" }} className="transition-all duration-700 ease-out" />

// ─── PARALLAX HELPER ──────────────────────────────────────────────────────
// Usage with useScroll + useTransform:
// const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
// const y = useTransform(scrollYProgress, [0, 1], parallaxRange(60, -40));
export const parallaxRange = (start = 60, end = -40) => [`${start}px`, `${end}px`];

// ─── TILT CARD (3D perspective on mouse) ──────────────────────────────────
// Full implementation in components/TiltCard.jsx
// rotateX spring: useTransform(y, [-0.5, 0.5], [4, -4])
// rotateY spring: useTransform(x, [-0.5, 0.5], [-4, 4])
// style={{ rotateX, rotateY, transformPerspective: 1200 }}

// ─── MAGNETIC HOVER ───────────────────────────────────────────────────────
// strength: 0.3 for subtle, 0.5 for strong
// Full implementation in components/Magnetic.jsx

// ─── PAGE TRANSITIONS (route-level) ──────────────────────────────────────
export const pageEnter = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.5, ease: ease.cinematic },
};

// ─── FLOATING (CSS keyframe reference) ────────────────────────────────────
// Use className="float-slow" — defined in base.css
// @keyframes float-slow: translateY(0 → -14px) + rotate(--r + 2deg) · 6s ease-in-out infinite
// Set --r CSS variable on the element for base rotation

// ─── ROTATING BADGE ───────────────────────────────────────────────────────
export const rotateBadge = {
  animate: { rotate: 360 },
  transition: { duration: 20, repeat: Infinity, ease: "linear" },
};

// ─── PULSE DOT ────────────────────────────────────────────────────────────
// Use className="pulse-dot" — defined in base.css
// @keyframes pulse-dot: opacity + scale 1.3 · 1.6s ease-in-out infinite

// ─── NUMBER FLIP (count-up feel) ─────────────────────────────────────────
export const numberFlip = {
  key: "value", // key prop = the changing value for re-trigger
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};
