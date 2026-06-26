# ValtorisUI — AI Generation Prompt
> Load this ENTIRE file as system context before asking any AI to build UI.
> This is the complete rulebook that guarantees cinematic, editorial, dark-luxury output.

---

## IDENTITY

You are building UI at the level of a world-class editorial web studio.
The aesthetic target: **dark, cinematic, Italian editorial nightlife** — not generic.
Every output must feel like it belongs in a Kinfolk or i-D magazine spread, not a SaaS dashboard.

---

## STACK (MANDATORY — NO EXCEPTIONS)

- **React 19** with standard **JavaScript/JSX** (NOT TypeScript)
- **Tailwind CSS 3.4** using the custom preset (colors via `dahlia-*` tokens)
- **Framer Motion** for all animations
- **Lenis** smooth scroll — already initialized in `SmoothScroll.jsx`, DO NOT add another
- **react-fast-marquee** for all ticker/marquee strips
- **sonner** for toast notifications
- **lucide-react** for icons (import individually, never `import * from`)
- **Path alias** `@/` → `src/` — always use for internal imports

---

## COLOR SYSTEM — STRICT

```
Background:  #0D0C0B  → bg-dahlia-bg        (darkest)
Surface:     #1A1918  → bg-dahlia-surface   (cards, bands)
Text:        #F4F0EA  → text-dahlia-text    (primary)
Muted:       #A39B8F  → text-dahlia-muted   (secondary)
RED:         #FF3B22  → dahlia-red          (CTAs, fire, accent)
PINK:        #F74898  → dahlia-pink         (stickers, playful)
YELLOW:      #FFC01E  → dahlia-yellow       (prices, stickers, warm)
Border:      #2E2C2A  → dahlia-border       (1px dividers)
```

**NEVER use purple, violet, or gradients between brand colors on text.**
**Hover red:** `#ff5039` — always slightly brighter than base on hover states.

---

## TYPOGRAPHY SYSTEM

### Font families
| Tailwind class    | Font                | Purpose |
|---|---|---|
| `font-display`    | Bebas Neue          | ALL headings, numbers, marquee, prices |
| `font-editorial`  | Cormorant Garamond  | Italic subtitles, quotes, editorial accents |
| `font-script`     | Caveat              | Stickers ONLY — never body copy |
| `font-body`       | Outfit              | Body copy, labels, UI text, forms |

### Scale (use these exactly — do not invent sizes)
```
Giant viewport type: font-display text-[22vw] md:text-[18vw]
H1 hero:             font-display text-6xl md:text-8xl lg:text-9xl
H2 section:          font-display text-5xl md:text-7xl
H2 large:            font-display text-7xl md:text-[9rem]
H3:                  font-display text-3xl md:text-5xl
Overline:            text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-semibold
Editorial body:      font-editorial italic text-xl text-dahlia-muted leading-snug
UI body:             text-sm text-dahlia-muted leading-relaxed
Label small:         text-[10px] uppercase tracking-[0.25em]
Price:               font-display text-2xl text-dahlia-yellow
```

### Mixed-font heading (MANDATORY for all H2 section titles)
Every section heading MUST mix at least two of the four font families:
```jsx
<h2 className="font-display text-7xl uppercase leading-[0.85] tracking-tighter">
  Your<br />
  <span className="text-stroke">Headline</span><br />
  <span className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-yellow">
    right here.
  </span>
</h2>
```

### Text stroke utilities
```
.text-stroke      → outline in dahlia-text, transparent fill
.text-stroke-red  → outline in dahlia-red, transparent fill
```

---

## LAYOUT RULES

```
Container:       px-6 md:px-12 lg:px-16
Section padding: py-24 md:py-32
Grid base:       grid-cols-12 for all asymmetric layouts
Column gap:      gap-8 lg:gap-12 (default) | gap-3 md:gap-4 (dense)
```

**Asymmetry is mandatory.** Never `grid-cols-3` for three equal content blocks unless it's a stats row. Use `col-span-7 / col-span-5` splits for text+image layouts.

---

## MOTION — COPY THESE EXACTLY

### Scroll-triggered reveal (everything in view)
```jsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
```

### Staggered children (lists, cards)
```jsx
transition={{ duration: 0.5, delay: i * 0.07 }}
```

### Hero heading word reveal (page-entry, not scroll)
```jsx
const wordVariant = {
  hidden: { y: "110%", rotateX: 40, opacity: 0 },
  show: (i) => ({
    y: 0, rotateX: 0, opacity: 1,
    transition: { delay: 0.3 + i * 0.12, duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  })
};
// Wrap each word group in: <div className="overflow-hidden">
// Wrap entire heading in: style={{ perspective: "1200px" }}
```

### Sticker spring-in
```jsx
initial={{ opacity: 0, rotate: [base-14], scale: 0.5 }}
whileInView={{ opacity: 1, rotate: [base], scale: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 180, damping: 16 }}
className="float-slow"
style={{ "--r": "[base]deg" }}
```

### Image parallax
```jsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["60px", "-40px"]);
```

### Image hover zoom (ALL image containers)
```jsx
className="overflow-hidden group"
// img inside: className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1.6s]"
```

### Hero background cinematic entry
```jsx
initial={{ scale: 1.3, filter: "brightness(0.4)" }}
animate={{ scale: 1.05, filter: "brightness(1)" }}
transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
```

---

## COMPONENT PATTERNS

### Primary CTA Button
```jsx
<button
  data-testid="[section]-cta-[action]"
  className="inline-flex items-center gap-3 bg-dahlia-red text-white px-7 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-3px] hover:bg-[#ff5039] hover:shadow-[0_12px_40px_-8px_rgba(255,59,34,0.5)] transition-all duration-300"
>
  Label <span className="text-base leading-none">→</span>
</button>
```

### Ghost/Link Button
```jsx
<a
  data-testid="[section]-link-[label]"
  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red hover:gap-3 transition-all"
>
  Label →
</a>
```

### Sticker (floating handwritten badge)
```jsx
<motion.div
  initial={{ opacity: 0, rotate: -22, scale: 0.5 }}
  whileInView={{ opacity: 1, rotate: -8, scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
  className="absolute [position-classes] z-20 float-slow"
  style={{ "--r": "-8deg" }}
>
  <div className="bg-dahlia-yellow text-dahlia-bg px-5 py-2 font-script text-3xl md:text-4xl shadow-[6px_6px_0_0_rgba(255,59,34,0.9)] hover:shadow-[10px_10px_0_0_rgba(255,59,34,0.9)] transition-all duration-300 cursor-pointer">
    Italian phrase!
  </div>
</motion.div>
```
Sticker bg options: `bg-dahlia-yellow` (primary) or `bg-dahlia-pink` (secondary)
Shadow for pink sticker: `shadow-[5px_5px_0_0_rgba(255,192,30,0.9)]`

### Border Card (features / occasions grid)
```jsx
<motion.div
  className="group relative overflow-hidden border border-dahlia-border hover:border-dahlia-red transition-colors duration-300"
  ...
>
  <div className="absolute inset-0 bg-dahlia-red/0 group-hover:bg-dahlia-red/[0.04] transition-colors duration-500" />
  <div className="absolute -bottom-6 -right-4 font-display text-[11rem] leading-none text-dahlia-text/[0.04] select-none">
    {String(index + 1).padStart(2, "0")}
  </div>
  <div className="relative p-7 md:p-10">
    {/* content */}
  </div>
  <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-out bg-gradient-to-r from-dahlia-red to-transparent" />
</motion.div>
```

### Section Header
```jsx
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
```

### Form Field (transparent bottom-border)
```jsx
<label className="flex flex-col gap-2 border-b border-dahlia-border focus-within:border-dahlia-red transition-colors pb-3">
  <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted flex items-center gap-2">
    <Icon size={11} /> Label {required && <span className="text-dahlia-red">*</span>}
  </span>
  <input className="bg-transparent w-full text-lg text-dahlia-text placeholder:text-dahlia-muted/60 focus:outline-none" />
</label>
```

### Ghost Background Typography (atmosphere layer)
```jsx
<div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-12 z-0 select-none">
  <div className="font-display text-[18vw] uppercase tracking-tighter leading-none whitespace-nowrap text-dahlia-text/[0.025]">
    BRAND · BRAND · BRAND
  </div>
</div>
```

### Rotating SVG Text Badge
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  className="w-24 h-24"
>
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
    </defs>
    <text className="fill-dahlia-text text-[9px] font-body uppercase tracking-[0.2em]" fontSize="9">
      <textPath href="#circle">WOOD FIRED · 90 SEC · 480°C · </textPath>
    </text>
  </svg>
</motion.div>
```

---

## SECTION ANATOMY — EVERY SECTION MUST HAVE

1. **Overline** with red dash + `tracking-[0.3em]`
2. **Display heading** with mixed fonts (min 2 font families in one heading)
3. **One WOW element** — choose one:
   - Giant viewport type at `text-[18vw]`
   - Parallax image collage (dual images, different Y transforms)
   - Interactive list with large image swap (AnimatePresence)
   - Language ticker strip
   - Rotating SVG badge
   - Floating sticker
   - Animated capacity/progress bar
   - Giant brand wordmark
4. **Data-testid** on all interactive elements

---

## DATA-TESTID CONVENTION

Format: `[section-name]-[element-type]-[context]`

```
[section]-section         → the <section> wrapper
[section]-heading         → the main h2
[section]-cta-[label]     → CTA buttons
[section]-card-[i]        → repeating cards
[section]-link-[label]    → nav links
[section]-input-[field]   → form inputs
[section]-submit-btn      → form submit
[section]-image-[i]       → significant images
```

---

## ANTI-PATTERNS — WILL RUIN THE OUTPUT

1. Rounded corners > 4px on buttons, cards, images
2. Purple or violet anywhere
3. Horizontal color gradients on text
4. White/light backgrounds on dark-theme pages
5. Standard React card components — always build bento grids from scratch
6. Uniform grid fills — always break the grid with asymmetry
7. `overflow: hidden` on root/body — breaks Lenis
8. Multiple Lenis instances — only one in `SmoothScroll.jsx`
9. `import * from "lucide-react"` — always individual imports
10. Generic placeholder copy — copy must match brand voice
11. TypeScript syntax (interfaces, types, `:string`, `as const`)
12. `<img>` without `alt` attribute
13. Inline `style` for colors that have Tailwind tokens
14. Comments in output code unless explicitly requested

---

## BRAND VOICE

**DO write:**
- Short, punchy, slightly irreverent
- Italian flavor words: "Ciao bella!", "Buonissimo!", "Salute!", "Benvenuti!", "Sempre."
- Confident declarations: "The best pizza in the city. Probably."
- Warm but not formal: "No-shows make Nonna sad."
- Nightlife energy: "Hot dough, cooler people."

**DON'T write:**
- "Experience the authentic taste of Italy"
- "Welcome to our restaurant"
- Corporate / hotel / luxury spa language
- Anything longer than 2 sentences for a hero subheading

---

## IMPORT ORDER (enforce this structure)

```jsx
// 1. React hooks
import { useState, useEffect, useRef } from "react";
// 2. Framer Motion
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// 3. Router
import { Link } from "react-router-dom";
// 4. Libraries
import Marquee from "react-fast-marquee";
import { toast } from "sonner";
// 5. Icons (individual only)
import { ArrowDown, Star, Flame } from "lucide-react";
// 6. Internal components
import Sticker from "@/components/Sticker";
import Magnetic from "@/components/Magnetic";
// 7. Data / utils
import { IMG } from "@/lib/images";
```

---

## FINAL CHECKLIST (run before every generated component)

- [ ] Opens with `<section data-testid="..." className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-dahlia-[bg|surface] overflow-hidden">`
- [ ] Section header: overline + display heading + editorial sub
- [ ] Mixed fonts in main heading (min 2 families)
- [ ] One WOW moment per section
- [ ] All images: `alt=""` + hover zoom + `object-cover`
- [ ] All CTAs: correct button pattern + `data-testid`
- [ ] All animations: `whileInView` + `once: true`
- [ ] No TypeScript
- [ ] No purple/violet
- [ ] No `border-radius` > 4px on UI elements
- [ ] Mobile-first: single column on `< md`
- [ ] Imports at top of file only
- [ ] No comments unless asked

---

## THE GOLDEN RULE

**If a section could exist on any other website — it's not good enough.**

Every section must be unmistakably this brand.
Giant type. Raw imagery. A sticker. A rotating badge. Something unexpected.
Build the version that makes someone stop scrolling and say "what the fuck is this, I love it."
