---
description: Dahlia Milano — Master UI Orchestrator. Run this before generating ANY new component, page, or section to guarantee the correct design output.
---

# DAHLIA MILANO — MASTER UI ORCHESTRATOR
> Read every word before writing a single line of JSX. This document is the law.

---

## 0. ABSOLUTE NON-NEGOTIABLES

- **NO TypeScript** — standard JavaScript JSX only
- **NO purple/violet** anywhere, ever
- **NO generic restaurant card templates** — build bento layouts from scratch
- **NO uniform screen fills** — empty space is a design element, use it
- **NO rounded corners > 4px** on custom UI (buttons, cards, stickers)
- **ALL interactive elements** must have `data-testid` attributes
- **Lenis smooth scroll** — already initialized in `SmoothScroll.jsx`, do NOT add a second instance
- **Framer Motion** — `whileInView` with `viewport={{ once: true, margin: "-80px" }}` on every reveal
- **Path alias** `@/` maps to `src/` — always use it

---

## 1. COLOR SYSTEM (STRICT — NEVER DEVIATE)

```
Background:   #0D0C0B  → dahlia-bg        (darkest, main page bg)
Surface:      #1A1918  → dahlia-surface   (cards, bands, elevated)
Text:         #F4F0EA  → dahlia-text      (primary readable copy)
Muted:        #A39B8F  → dahlia-muted     (secondary copy, sub-labels)
RED:          #FF3B22  → dahlia-red       (primary CTA, accent, fire)
PINK:         #F74898  → dahlia-pink      (stickers, playful accents)
YELLOW:       #FFC01E  → dahlia-yellow    (prices, stickers, warm highlights)
Border:       #2E2C2A  → dahlia-border    (dividers, card borders)
Black:        #000000  → Footer only
```

**Hover red brightened:** `#ff5039` (use on button hover, never the same as base)
**Glass surface:** `rgba(13,12,11,0.55)` + `backdrop-blur-[18px] saturate-140` (Navbar only)

---

## 2. TYPOGRAPHY SYSTEM

### Font Families (loaded via Google Fonts in `/public/index.html`)
| Class | Font | Use |
|---|---|---|
| `font-display` | Bebas Neue | Giant headings, prices, numbers, marquee |
| `font-editorial` | Cormorant Garamond | Italic subtitles, quotes, secondary narrative |
| `font-script` | Caveat | Stickers ONLY — rotated, colorful |
| `font-body` | Outfit | All body copy, labels, UI text |

### Typographic Scale (copy exactly)
```
H1 giant:    font-display text-[22vw] md:text-[18vw] leading-[0.85] tracking-tighter uppercase
H1 hero:     font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter
H2 section:  font-display text-5xl md:text-7xl md:text-[9rem] uppercase leading-[0.85] tracking-tighter
H3:          font-display text-3xl md:text-5xl uppercase leading-none
Overline:    text-[10px] md:text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold
Body:        font-editorial italic text-xl md:text-2xl text-dahlia-muted leading-snug  (for editorial sub)
Body UI:     text-sm text-dahlia-muted leading-relaxed  (for descriptive copy)
Price:       font-display text-2xl md:text-3xl text-dahlia-red or text-dahlia-yellow
```

### Text Stroke Utility Classes (defined in `index.css`)
```css
.text-stroke       → -webkit-text-stroke: 1.5px #F4F0EA; color: transparent
.text-stroke-red   → -webkit-text-stroke: 1.5px #FF3B22; color: transparent
```
Use these for contrast + visual drama in headings.

### Mixed-font heading pattern (MANDATORY for all H2/H3 section titles)
```jsx
<h2 className="font-display text-7xl uppercase leading-[0.85] tracking-tighter">
  Nights<br />
  <span className="text-stroke">that turn</span><br />
  into{" "}
  <span className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-yellow">
    mornings.
  </span>
</h2>
```

---

## 3. LAYOUT SYSTEM

### Container
```
px-6 md:px-12 lg:px-16
```

### Section spacing
```
py-24 md:py-32
```

### The Bento Grid Rules
- Use `grid-cols-12` as base — then assign `col-span-N` to create **asymmetry**
- Image columns always paired with text: `col-span-7` image + `col-span-5` text (or 5/7 flipped)
- Never use `grid-cols-3` for equal-width content — break it: `col-span-4 col-span-4 col-span-4` is allowed only for stats rows
- Ritual/event cards: `grid-cols-1 md:grid-cols-2` with different heights is intentional
- Leave column gaps breathing: `gap-8 lg:gap-12` or `gap-3 md:gap-4` for dense grids

### Section Header Template (copy for every new section)
```jsx
<div>
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4 flex items-center gap-3"
  >
    <span className="inline-block w-6 h-[2px] bg-dahlia-red" />
    NN — Section Name
  </motion.div>
  <motion.h2 ...>
    Big Display Headline
  </motion.h2>
</div>
```

---

## 4. MOTION SYSTEM

### Page-entry reveal (y-axis mask — for headings)
```jsx
const word = {
  hidden: { y: "110%", rotateX: 40, opacity: 0 },
  show: (i = 0) => ({
    y: 0, rotateX: 0, opacity: 1,
    transition: { delay: 0.3 + i * 0.12, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  }),
};
// Wrap each line in: <div className="overflow-hidden"><motion.h1 variants={word} initial="hidden" animate="show" custom={i} /></div>
```

### Scroll-triggered reveal (for all section content)
```jsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
```

### Image parallax (for split-layout image columns)
```jsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const imgY = useTransform(scrollYProgress, [0, 1], [60, -40]);
// Apply: <motion.div style={{ y: imgY }}>
```

### Image hover zoom (apply to ALL image containers)
```jsx
className="overflow-hidden group"
// Inside: <img className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1.6s]" />
```

### Staggered list items
```jsx
transition={{ duration: 0.5, delay: i * 0.07 }}
```

### Sticker spring-in
```jsx
initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
className="float-slow"
style={{ "--r": "-6deg" }}
```

### Bottom accent sweep (hover underline for cards/links)
```jsx
<div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-out bg-gradient-to-r from-dahlia-red to-transparent" />
```

---

## 5. COMPONENT PATTERNS

### Button — Primary (CTA)
```jsx
<button
  data-testid="section-action-btn"
  className="inline-flex items-center gap-3 bg-dahlia-red text-white px-7 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-3px] hover:bg-[#ff5039] hover:shadow-[0_12px_40px_-8px_rgba(255,59,34,0.5)] transition-all duration-300"
>
  Label text <span className="text-base leading-none">→</span>
</button>
```

### Button — Ghost/Link
```jsx
<a
  data-testid="section-link"
  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red hover:gap-3 transition-all"
>
  Label →
</a>
```

### Sticker (floating, Caveat font)
```jsx
<motion.div
  initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
  whileInView={{ opacity: 1, rotate: -8, scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
  className="absolute z-20 [position] float-slow"
  style={{ "--r": "-8deg" }}
>
  <div className="bg-dahlia-yellow text-dahlia-bg px-5 py-2 font-script text-3xl md:text-4xl shadow-[6px_6px_0_0_rgba(255,59,34,0.9)] hover:shadow-[10px_10px_0_0_rgba(255,59,34,0.9)] hover:rotate-[-4deg] transition-all duration-300 cursor-pointer">
    Italian phrase here!
  </div>
</motion.div>
```
Sticker colors: bg-dahlia-yellow (primary), bg-dahlia-pink (secondary)
Sticker rotation: between -12deg and +8deg
Shadow: `[6px_6px_0_0_rgba(255,59,34,0.9)]` for yellow, `[5px_5px_0_0_rgba(255,192,30,0.9)]` for pink

### Border card (event/ritual/occasion)
```jsx
<motion.div
  className="group relative overflow-hidden border border-dahlia-border hover:border-dahlia-red transition-colors duration-300 cursor-pointer"
  ...
>
  <div className="absolute inset-0 bg-dahlia-red/0 group-hover:bg-dahlia-red/[0.04] transition-colors duration-500" />
  <div className="absolute -bottom-6 -right-4 font-display text-[12rem] leading-none text-dahlia-text/[0.04] select-none">
    {number}
  </div>
  <div className="relative p-7 md:p-10">
    {/* content */}
  </div>
</motion.div>
```

### Form field (transparent bottom-border)
```jsx
<label className="flex flex-col gap-2 border-b border-dahlia-border focus-within:border-dahlia-red transition-colors pb-3">
  <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted flex items-center gap-2">
    <Icon size={12} /> Field Label {required && <span className="text-dahlia-red">*</span>}
  </span>
  <input
    className="bg-transparent w-full text-lg text-dahlia-text placeholder:text-dahlia-muted/60 focus:outline-none"
    placeholder="..."
    data-testid="..."
  />
</label>
```

### Ghost background type (section atmosphere)
```jsx
<motion.div style={{ y: yBig }} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-12 z-0 select-none">
  <div className="font-display text-[18vw] uppercase tracking-tighter leading-none whitespace-nowrap text-dahlia-text/[0.025]">
    DAHLIA · DAHLIA · DAHLIA
  </div>
</motion.div>
```

### Grain overlay (already on body via `.grain` class — do NOT add again)
Only add a local grain inside image containers:
```jsx
<div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
```

---

## 6. SECTION-BY-SECTION REFERENCE

### LoaderCurtain (page transition — already built)
- 1600ms delay → `y: "-100%"` exit
- Shows: DAHLIA.oven in giant display + loading text + red sweep line

### Navbar (already built — `Navbar.jsx`)
- Fixed, glass on scroll (`glass` utility class)
- Logo: dot + DAHLIA + .oven in red italic
- Desktop nav: underline hover effect
- Book a table CTA: dahlia-red button

### Hero (`Hero.jsx`) — CINEMATIC ANCHOR
Key techniques to replicate/upgrade:
- Parallax image (`imgY`, `imgScale` via `useScroll`)
- Scroll-driven overlay darkening (`overlayOpacity`)
- 3D word reveal (`rotateX: 40 → 0` + `y: "110%" → 0`)
- Giant viewport-spanning type: `text-[22vw] md:text-[18vw]`
- `"Ciao bella!"` sticker: yellow bg, red shadow, float-slow
- Scroll indicator: animated `ArrowDown` bouncing

### MarqueeStrip (`MarqueeStrip.jsx`)
- `variant="solid"` → red bg, white text (used after Hero)
- `variant="outline"` → dark bg, light text (used after BarSection)
- Font: `font-display text-5xl md:text-7xl`
- Speed: 70, yellow dot separators

### RatingsBand (`RatingsBand.jsx`)
- Giant `8.8` in `font-display text-[12rem]`
- Sub-stats grid with border-top dividers
- Pull quote in italic Cormorant on the right

### PizzaShowcase (`PizzaShowcase.jsx`) — INTERACTIVE
- Left col (`col-span-7`): large `aspect-[4/5]` image that swaps with AnimatePresence
- Right col (`col-span-5`): hover list, numbers in dahlia-red
- Active state: pizza name translates x + color changes
- Rotating SVG text circle top-right: "WOOD FIRED · 90 SEC · 480°C"
- Sticker: "Buonissimo!" in font-script on the image
- Tag badge: `bg-dahlia-yellow shadow-[4px_4px_0_0_rgba(255,59,34,0.8)]`

### BarSection (`BarSection.jsx`) — EDITORIAL SPLIT
- Left 7/12: huge heading with mixed text-stroke + italic
- Right 5/12: stacked parallax image collage (two images, different Y transforms)
- Bottom-border list for drinks
- Sticker: "Salute!" in dahlia-pink bg, yellow shadow

### EventsSection (`EventsSection.jsx`) — MANIFESTO + BENTO
- Ghost background type behind entire section
- Massive heading: `text-[16vw] md:text-[11vw]`
- Language ticker: auto-scroll animation with `animate-[scroll_28s_linear_infinite]`
- Timeline: 4 columns with red top border + dot markers
- 4 ritual cards: border cards with ghost number background
- CTA block: grid layout + stats column with border-b dividers

### HostEvent (`HostEvent.jsx`) — DUAL VARIANT
- `variant="dark"` (Oven page) vs `variant="light"` (Lab page)
- 4 occasion cards: lucide icons + display headings
- Stat ribbon: 4 metrics in `grid-cols-4` with border dividers

### SmallStory (`SmallStory.jsx`) — INTERMEZZO BAND
- `bg-dahlia-surface` (different from bg)
- Left: portrait image with "Milano, sempre." script overlay
- Right: editorial copy + 4 stats with `border-t` separator

### SocialProof (`SocialProof.jsx`) — REVIEW + WALL
- Left 5/12: border cards with star ratings + italic Cormorant quotes
- Right 7/12: `grid-cols-3` photo wall where tile 0 is `row-span-2 col-span-2`
- Hover: red overlay + Instagram icon

### ReservationSection (`ReservationSection.jsx`) — SMART FORM
- Left 5/12: editorial copy + live capacity bar with motion width
- Right 7/12: form with `border border-dahlia-border p-8 md:p-12`
- Time selector: colored demand states (red/yellow/green)
- Sticker: "Ti aspettiamo" floating on form
- Submit: CTA button with loading state

### Footer (`Footer.jsx`) — BRAND MONUMENT
- `bg-black` (NOT dahlia-bg)
- 12-col mini grid: address / hours / nav links / newsletter
- Giant `DAHLIA` at `text-[22vw]` with `.oven` script overlay
- Magnetic social icons (framer-motion spring)
- Live Milano time (Europe/Rome timezone)

---

## 7. ROUTE ARCHITECTURE

| Route | Component | Theme | Purpose |
|---|---|---|---|
| `/` | `Landing.jsx` | Dark | Venue picker (Oven vs Lab) with tilt cards |
| `/oven` | `Oven.jsx` | Dark | Main restaurant page (full scroll experience) |
| `/menu` | `Menu.jsx` | Dark | Full menu + cart system |
| `/lab` | `Lab.jsx` | Light `#FBF6E9` | Café bar — periodic table aesthetic |
| `/community` | `CommunityPage.jsx` | Dark | Dahlia League leaderboards + badges |
| `/league/account` | `LeagueAccount.jsx` | Dark | Personal XP/rewards account |
| `/admin` | `AdminDashboard.jsx` | Dark | Internal admin panel |

---

## 8. OVEN PAGE COMPONENT ORDER

```
Navbar (fixed)
↓ Hero
↓ MarqueeStrip (solid — red)
↓ RatingsBand
↓ PizzaShowcase
↓ BarSection
↓ MarqueeStrip (outline — dark)
↓ EventsSection
↓ HostEvent (dark)
↓ SmallStory
↓ KitchenStatus
↓ SelfService
↓ StudentWelcome
↓ LoyaltyEngine
↓ SocialProof
↓ ReservationSection
↓ Footer
[Floating overlays]: TableFeedback · AiChef · Toaster
```

---

## 9. IMAGE LIBRARY (`@/lib/images.js` → `IMG.xxx`)

```
IMG.heroPizza          → moody pizza, hero bg
IMG.pizzaTwo           → second pizza angle
IMG.pizzaSliceHand     → pizza slice held up
IMG.pizzaTable         → table pizza spread
IMG.cocktailNegroni    → moody Negroni hero shot
IMG.cocktailBar        → marble bar counter
IMG.nightlifeFriends   → friends cheersing cocktails
IMG.nightlifeDj        → DJ + crowd
IMG.cheersFriends      → overhead cheers
IMG.partyCrowd         → party crowd
IMG.duomoMilano        → Milano Duomo (Lab/SmallStory)
IMG.smokeMood          → moody smoke atmosphere
IMG.s1–s6              → social wall thumbnails
```

---

## 10. BRAND VOICE — COPY GUIDELINES

**DO use:**
- "Ciao bella!", "Buonissimo!", "Salute!", "Ti aspettiamo", "Milano, sempre."
- "Not just a pizza restaurant. The coolest place in the city."
- "A soft little riot", "Nights that turn into mornings", "Hot dough, cooler people."
- "Zero stress.", "No-shows make Nonna sad.", "Made with passion, basil & loud bass."
- TheFork rating: **8.8 / 10 — Fabulous**
- Prices: always in € with font-display, use dahlia-yellow for emphasis

**DON'T write:**
- Generic welcome messages
- "Experience the taste of Italy"
- Formal or corporate language
- Anything that sounds like a luxury hotel

---

## 11. DATA-TESTID NAMING CONVENTION

Format: `[section]-[element]-[context]`

```
hero-section, hero-title-line1, hero-cta-book, hero-sticker
navbar, navbar-logo, navbar-reserve-btn, navbar-mobile-toggle
nav-link-[label], nav-mobile-[label]
pizza-section, pizza-heading, pizza-active-image, pizza-item-[i], pizza-see-full-menu
bar-section, bar-heading, bar-drink-[i], bar-cta-events
events-section, events-heading, event-card-[i], dahlia-timeline, dahlia-mondays-cta
host-section-dark, host-occasions-dark, host-card-dark-[i], host-cta-email-dark
ratings-band, rating-stat-[i]
story-band
social-section, social-heading, reviews-list, review-card-[i], social-wall, social-tile-[i]
reservation-section, reservation-form, reservation-submit-btn
reserve-heading, reserve-input-name, reserve-input-email, reserve-input-date
reserve-time-[HH:MM], reserve-input-guests, capacity-bar
footer, footer-brand, footer-directions, footer-newsletter-input, footer-newsletter-btn
footer-link-[label], footer-social-[i]
landing-page, landing-badge-oven, landing-badge-lab, landing-league-banner, landing-league-link
loader-curtain
marquee-strip
```

---

## 12. ANTI-PATTERNS — NEVER DO THESE

1. **Rounded corners on CTA buttons** — sharp edges only (`rounded-none` or at most `rounded-sm`)
2. **Gradient from one brand color to another** horizontally on text (only on lines/bars)
3. **White backgrounds in dark sections** — only allowed in Lab (`/lab` page)
4. **Padding smaller than px-6** at container level
5. **More than 2 columns on mobile** — always collapse to 1 col on small screens
6. **Purple or violet tones** — will corrupt the brand palette entirely
7. **Border-radius > 4px** on cards, containers, images
8. **Adding Lenis initialization outside `SmoothScroll.jsx`**
9. **Inline `style` for colors that have Tailwind tokens** — always use `bg-dahlia-red`, not `style={{ background: '#FF3B22' }}`
   - Exception: when using CSS variables with opacity modifiers not supported by Tailwind
10. **Image `<img>` without `alt` attribute**
11. **Generic placeholder copy** — all text must match Dahlia's voice
12. **`overflow: hidden` on the root** — Lenis needs free scroll

---

## 13. SPECIAL UTILITY CLASSES (defined in `index.css`)

```css
.float-slow   → 6s ease-in-out floating animation, uses --r CSS var for rotation
.spin-slow    → 22s linear infinite rotation (SVG badge spinners)
.pulse-dot    → 1.6s pulse for the red live indicator dot
.grain        → fixed grain overlay on bg via ::before pseudo (body-level)
.glass        → glassmorphism: rgba bg + backdrop-blur + border (Navbar only)
.img-liquid   → scale(1.06) + saturate on hover with cubic-bezier easing
.text-stroke  → text outline in dahlia-text
.text-stroke-red → text outline in dahlia-red
```

---

## 14. PACKAGE IMPORTS CHEATSHEET

```jsx
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import Marquee from "react-fast-marquee";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { Link } from "react-router-dom";
import { IMG } from "@/lib/images";
// lucide-react icons — import individually, never the entire library
import { ArrowDown, Star, Trophy, Crown, Zap, Instagram, X, Menu } from "lucide-react";
```

---

## 15. WHEN BUILDING A NEW COMPONENT — CHECKLIST

- [ ] Opens with correct Tailwind section wrapper: `<section data-testid="..." className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-dahlia-[bg|surface]">`
- [ ] Section header has overline + display heading with mixed font technique
- [ ] All images have hover zoom (`group` + `group-hover:scale-[1.06]`) and `alt`
- [ ] All CTAs have correct button pattern with `data-testid`
- [ ] Framer Motion `whileInView` with `once: true` on every animated element
- [ ] At least one sticker OR ghost type element for atmosphere
- [ ] Colors only from the 8-token palette
- [ ] No TypeScript syntax
- [ ] No purple/violet
- [ ] Mobile-first: collapses cleanly to single column
- [ ] Imports at top of file only

---

## 16. THE GOLDEN RULE

**Every section must have one "wow moment"** — something that makes the person stop scrolling:
- A giant viewport-width heading (`text-[18vw]`)
- A parallax image collage
- An interactive pizza/menu list
- A language ticker strip
- A rotating SVG badge
- A sticker that floats
- A capacity bar animating in
- A giant brand word filling the footer

If a section has none of these — add one. Then ship it.
