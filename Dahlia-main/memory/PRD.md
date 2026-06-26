# Dahlia Milano — PRD

## Original Problem
World-class premium single-page website UI for "Dahlia Milano", a pizza restaurant & bar in Milano, Italy targeted at university students, young professionals, travelers, and social groups. Brand personality: funny, playful, energetic party, international, student-friendly but not cheap, premium but not luxurious. Frontend showcase only, no backend persistence. Cinematic editorial nightlife aesthetic.

## User Choices
- Brand: Dahlia Milano (Milano, Italy)
- Scope: Frontend showcase only
- Visual mood: "Surprise me" — chosen Cinematic Editorial Nightlife (dark theme, Tomato Red #FF3B22 + Yellow + Pink accents)
- Language: English with Italian flavor sprinkled in
- No 3rd party integrations

## Architecture
- React 19 + CRA/CRACO, Tailwind, Shadcn UI primitives, Framer Motion, Lenis (smooth scroll), react-fast-marquee, sonner toasts, lucide-react icons.
- Fonts: Bebas Neue (display), Cormorant Garamond italic (editorial), Outfit (body), Caveat (script stickers).
- Single-page composition in /app/frontend/src/App.js.

## User Personas
1. **University students (Bocconi, Polimi, Statale)** — value, student night, late hours
2. **Young professionals** — aperitivo, dates, Friday/Saturday
3. **Travelers / Erasmus / international visitors** — discoverability, English copy, atmosphere
4. **Social groups** — celebrations, sports nights, group bookings

## Core Requirements (static)
- Hero with cinematic image and big "DAHLIA MILANO" typography
- Interactive pizza menu showcase
- Bar & drinks editorial split
- Events / nightlife collage (Mon/Tue/Thu/Sat)
- Social proof: reviews + IG-style wall
- Reservation form (UI only, sonner toast feedback)
- Premium oversized branded footer
- Mobile-first responsive, smooth scroll, micro-interactions

## What's Been Implemented (2026-12)
- All 7 homepage sections + intermezzo story band + 2 marquee dividers
- Lenis smooth scroll, grain overlay, custom selection color, custom scrollbar
- Hero with staggered framer-motion reveal + "Ciao bella!" floating sticker
- Pizza showcase: 5 items, hover/click swaps large image and price/name
- Bar: 4 drinks list, dual image collage, "Salute!" sticker
- Events: bento collage (4 images) + 4 event cards with icons
- Story band with Milano photo + 4 stats
- Social Proof: 3 reviews + 6 IG tiles
- Reservation: full form with sonner validation toast (error + success), form reset
- Footer: address, hours, newsletter, socials, giant DAHLIA wordmark, Milano live time
- Navbar: glass-on-scroll, desktop links, mobile drawer with solid bg
- 58/58 frontend tests passed

## Prioritized Backlog
**P1**
- Dedicated /menu page with full food + drinks card
- Page-level loader / curtain reveal animation on first load
- Image preloader + LQIP placeholders for hero
**P2**
- Multi-language toggle (EN / IT)
- Real reservation backend (MongoDB) with admin dashboard
- Online ordering flow (Stripe checkout)
- Newsletter capture → Resend
- Press / "as seen in" logo row
- Events calendar grid view
- "Private events" inquiry form
