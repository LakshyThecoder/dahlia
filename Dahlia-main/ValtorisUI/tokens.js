/**
 * ValtorisUI Design Tokens
 * ========================
 * The complete token set extracted from Dahlia Milano.
 * Adapt the BRAND object for each new project.
 * Keep MOTION, EASING, and LAYOUT unchanged — they're the secret sauce.
 */

// ─── COLORS ────────────────────────────────────────────────────────────────
export const COLORS = {
  bg:      "#0D0C0B",
  surface: "#1A1918",
  text:    "#F4F0EA",
  muted:   "#A39B8F",
  red:     "#FF3B22",
  redHover:"#ff5039",
  pink:    "#F74898",
  yellow:  "#FFC01E",
  border:  "#2E2C2A",
  black:   "#000000",

  // Semantic
  primary:  "#FF3B22",
  secondary:"#F74898",
  accent:   "#FFC01E",

  // Glass
  glass:   "rgba(13, 12, 11, 0.55)",
  glassHover: "rgba(13, 12, 11, 0.75)",

  // Grain
  grain:   "rgba(244, 240, 234, 0.06)",
};

// ─── TYPOGRAPHY ────────────────────────────────────────────────────────────
export const FONTS = {
  display:  '"Bebas Neue", sans-serif',
  editorial:'"Cormorant Garamond", serif',
  script:   '"Caveat", cursive',
  body:     '"Outfit", system-ui, sans-serif',
};

export const FONT_GOOGLE_URL =
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=Caveat:wght@400;700&display=swap";

export const TYPE_SCALE = {
  hero:     "font-display text-[22vw] md:text-[18vw] leading-[0.85] tracking-tighter uppercase",
  h1:       "font-display text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter",
  h2:       "font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter",
  h2lg:     "font-display text-7xl md:text-[9rem] uppercase leading-[0.85] tracking-tighter",
  h3:       "font-display text-3xl md:text-5xl uppercase leading-none tracking-tight",
  overline: "text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold",
  body:     "font-editorial italic text-xl md:text-2xl leading-snug",
  small:    "text-sm leading-relaxed",
  label:    "text-[10px] uppercase tracking-[0.25em]",
  price:    "font-display text-2xl md:text-3xl",
};

// ─── LAYOUT ────────────────────────────────────────────────────────────────
export const LAYOUT = {
  container: "px-6 md:px-12 lg:px-16",
  section:   "py-24 md:py-32",
  sectionSm: "py-16 md:py-20",
  gap:       "gap-8 lg:gap-12",
  gapSm:     "gap-3 md:gap-4",
};

// ─── MOTION ────────────────────────────────────────────────────────────────
export const EASING = {
  cinematic: [0.22, 1, 0.36, 1],
  bounce:    [0.34, 1.56, 0.64, 1],
  snappy:    [0.76, 0, 0.24, 1],
  smooth:    [0.65, 0, 0.35, 1],
};

export const DURATION = {
  fast:   0.3,
  normal: 0.6,
  slow:   0.9,
  xslow:  1.2,
  hero:   2.8,
};

// ─── LENIS ─────────────────────────────────────────────────────────────────
export const LENIS_CONFIG = {
  duration:        1.15,
  easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel:     true,
  wheelMultiplier: 1,
  touchMultiplier: 1.4,
};

// ─── SHADOWS (stickers) ────────────────────────────────────────────────────
export const SHADOWS = {
  stickerRed:    "6px 6px 0 0 rgba(255,59,34,0.9)",
  stickerRedHover:"10px 10px 0 0 rgba(255,59,34,0.9)",
  stickerYellow: "5px 5px 0 0 rgba(255,192,30,0.9)",
  button:        "0 12px 40px -8px rgba(255,59,34,0.5)",
};

// ─── BREAKPOINTS ───────────────────────────────────────────────────────────
export const BP = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  xxl: "1536px",
};
