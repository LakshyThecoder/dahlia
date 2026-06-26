# ValtorisUI
> The complete design system, component library, and AI prompt kit extracted from Dahlia Milano.
> Use this to build **any** cinematic, editorial, dark-luxury web product at the same quality level — or better.

---

## What's in here

```
ValtorisUI/
├── README.md                  ← You are here. Master index.
├── PROMPT.md                  ← Copy-paste AI generation prompt (load this first)
├── tokens.js                  ← All design tokens as JS constants
├── motion.js                  ← All Framer Motion animation presets
├── tailwind.preset.js         ← Drop-in Tailwind config preset
├── css/
│   └── base.css               ← Complete CSS: fonts, utilities, animations, scrollbar
├── components/
│   ├── Cursor.jsx             ← Custom ring+dot cursor
│   ├── SmoothScroll.jsx       ← Lenis wrapper
│   ├── LoaderCurtain.jsx      ← Page entry curtain reveal
│   ├── Magnetic.jsx           ← Magnetic hover for CTAs
│   ├── Parallax.jsx           ← Scroll-driven Y parallax
│   ├── TextReveal.jsx         ← Per-character mask reveal
│   ├── Sticker.jsx            ← Floating playful sticker
│   ├── MarqueeStrip.jsx       ← react-fast-marquee band
│   ├── GrainOverlay.jsx       ← Fixed SVG film grain
│   ├── Button.jsx             ← Primary + ghost variants
│   └── SectionHeader.jsx      ← Overline + display heading block
└── patterns/
    ├── HeroPattern.jsx        ← Cinematic full-viewport hero
    ├── BentoShowcase.jsx      ← Interactive image + list bento
    ├── EditorialSplit.jsx     ← 60/40 text + image parallax split
    ├── ManifestoSection.jsx   ← Full-width giant type manifesto
    ├── BorderCardGrid.jsx     ← Hoverable border card grid
    ├── StatsBand.jsx          ← Metrics ribbon
    ├── ReviewWall.jsx         ← Review cards + photo wall grid
    ├── SmartForm.jsx          ← Transparent bottom-border form
    └── GiantFooter.jsx        ← Brand monument footer
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install framer-motion lenis react-fast-marquee sonner lucide-react
```

### 2. Configure Tailwind
```js
// tailwind.config.js
const valtorisPreset = require("./ValtorisUI/tailwind.preset.js");
module.exports = { presets: [valtorisPreset], content: ["./src/**/*.{js,jsx}"] };
```

### 3. Import base CSS
```js
// index.js or main.jsx
import "./ValtorisUI/css/base.css";
```

### 4. Wrap your app
```jsx
import SmoothScroll from "./ValtorisUI/components/SmoothScroll";
import Cursor from "./ValtorisUI/components/Cursor";

function App() {
  return (
    <SmoothScroll>
      <Cursor />
      {/* routes */}
    </SmoothScroll>
  );
}
```

### 5. Load PROMPT.md into your AI before asking it to build anything
> This is the most important step. The prompt encodes every rule.

---

## The Design Philosophy

**Three laws that make this style work:**

1. **Asymmetry is intentional** — never fill the screen uniformly. Empty space earns trust.
2. **Typography is the UI** — giant display type at 18–22vw IS the hero. No hero image required.
3. **Every section needs one WOW moment** — parallax, rotating badge, interactive list, ticker, sticker, or a number so big it breaks the grid.

---

## Adapting to a new project

| Change this | Keep this |
|---|---|
| Color tokens in `tokens.js` | All motion curves `[0.22, 1, 0.36, 1]` |
| Brand name + copy | `font-display` for all headings |
| Images (swap Unsplash URLs) | Grain overlay + glass navbar |
| Section content | `whileInView` + `viewport={{ once: true }}` |
| Sticker text (Italian → anything) | Sticker format: rotated, Caveat, shadow |
| Route structure | Lenis smooth scroll |

---

## Credits
Built by **Valtoris** for Dahlia Milano, 2024–2026.
