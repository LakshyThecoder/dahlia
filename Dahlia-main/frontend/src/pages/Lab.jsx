import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { IMG } from "@/lib/images";
import { Coffee, Croissant, Salad, FlaskConical, Beaker, TestTube, MapPin, Phone, Clock, ArrowLeft, Sparkles, Zap } from "lucide-react";
import HostEvent from "@/components/HostEvent";
import { askMistral } from "@/lib/mistral";

// "Periodic table" menu — each item is an element
const ELEMENTS = [
  { sym: "Pc", n: 1, name: "Pistachio Cornetto", formula: "C₂H₅OH · 🌰 · butter laminate", price: "€2.80", note: "Bestseller", icon: Croissant },
  { sym: "Pl", n: 2, name: "Pasticciotto Leccese", formula: "Pasta frolla + vanilla custard", price: "€2.50", note: "Puglia import", icon: Croissant },
  { sym: "Pr", n: 3, name: "Piadina Romagnola", formula: "Squacquerone + rucola + crudo", price: "€7.00", note: "The Bocconi fix", icon: Salad },
  { sym: "Iq", n: 4, name: "Insalatona Lab", formula: "Quinoa + avocado + salmone + lime", price: "€11.00", note: "Productivity LARP", icon: Salad },
  { sym: "Ed", n: 5, name: "Espresso Doppio", formula: "Single origin · 18g · 36ml", price: "€1.50", note: "Standing only", icon: Coffee },
  { sym: "Ar", n: 6, name: "Affogato Riot", formula: "Gelato + espresso + amaro shot", price: "€6.00", note: "After 17:00", icon: Coffee },
  { sym: "Sp", n: 7, name: "Spritz Lab", formula: "Aperol · Prosecco · soda · pompelmo", price: "€7.00", note: "Aperitivo", icon: FlaskConical },
  { sym: "Mb", n: 8, name: "Muffin Bio", formula: "Spelt flour · dark chocolate 70%", price: "€2.20", note: "Vegan", icon: Croissant },
  { sym: "Tt", n: 9, name: "Toast Trifolato", formula: "Funghi · taleggio · thyme · truffle oil", price: "€7.50", note: "Lunch hit", icon: Salad },
  { sym: "Cc", n: 10, name: "Cappuccino Cardamom", formula: "Single-origin · house cardamom blend", price: "€2.50", note: "Signature", icon: Coffee },
  { sym: "Bp", n: 11, name: "Bistro Panino", formula: "Porchetta · provola · friarielli", price: "€8.50", note: "New", icon: Salad },
  { sym: "Cb", n: 12, name: "Club Bistro", formula: "Pollo grigliato · bacon · avocado · aioli", price: "€9.00", note: "Chef's pick", icon: Salad },
  { sym: "Zv", n: 13, name: "Zuppa del Giorno", formula: "Daily rotation · bread included", price: "€6.50", note: "Comfort", icon: FlaskConical },
  { sym: "Tl", n: 14, name: "Tagliere Lab", formula: "Salumi + formaggi + miele + noci", price: "€14.00", note: "Sharing", icon: Salad },
  { sym: "Ml", n: 15, name: "Matcha Latte", formula: "Ceremonial grade · oat milk · vanilla", price: "€3.50", note: "Trendy", icon: Coffee },
  { sym: "Ng", n: 16, name: "Negroni Bistrò", formula: "Gin · Cocchi · Campari · orange peel", price: "€9.00", note: "Aperitivo", icon: FlaskConical },
];

const HOURS = [
  { d: "MON", h: "07:30 — 22:00" },
  { d: "TUE", h: "07:30 — 22:00" },
  { d: "WED", h: "07:30 — 22:00" },
  { d: "THU", h: "07:30 — 22:00" },
  { d: "FRI", h: "07:30 — 22:00" },
  { d: "SAT", h: "07:30 — 22:00" },
  { d: "SUN", h: "07:30 — 22:00" },
];

const PROCEDURE = [
  { t: "07:30", label: "Doors open. Espresso machine warms up." },
  { t: "08:15", label: "First batch of cornetti exits the oven." },
  { t: "11:00", label: "Pre-lecture caffeine peak ⚡" },
  { t: "13:00", label: "Piadinas + salads service." },
  { t: "17:00", label: "Apericena protocol initiated 🧪" },
  { t: "21:30", label: "Last orders. Lab closes." },
];

export default function Lab() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen bg-[#FBF6E9] text-[#161210] font-body" data-testid="lab-page">
      {/* Blueprint grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #161210 1px, transparent 1px), linear-gradient(to bottom, #161210 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Grain texture for Lab */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-[#FBF6E9]/90 backdrop-blur-md border-b border-[#161210]/20" data-testid="lab-navbar">
        <div className="px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
          <Link to="/" data-testid="lab-back-home" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] hover:text-[#FF3B22] transition-colors group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to entrance
          </Link>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            <FlaskConical size={14} className="text-[#FF3B22] animate-pulse" />
            DAHLIA<span className="text-[#FF3B22]">.LAB</span> · Café Bistro
          </div>
          <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.3em]">
            <Link to="/oven" data-testid="lab-to-oven" className="hover:text-[#FF3B22] transition-colors">→ Oven</Link>
            <Link to="/community" data-testid="lab-to-league" className="hover:text-[#FF3B22] transition-colors">League</Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section ref={heroRef} className="px-6 md:px-12 lg:px-16 pt-16 md:pt-24 pb-16">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-5 flex items-center gap-3"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block w-6 h-[2px] bg-[#FF3B22] origin-left"
                />
                Field report · Bocconi outpost · A <span className="text-[#161210]">Valtoris</span> production
              </motion.div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%", rotateX: 20 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-7xl md:text-[12rem] uppercase leading-[0.82] tracking-tighter"
                  style={{ perspective: "1200px" }}
                >
                  Café
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%", rotateX: 20 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-7xl md:text-[12rem] uppercase leading-[0.82] tracking-tighter"
                  style={{ perspective: "1200px" }}
                >
                  Bistro
                  <span className="text-[#FF3B22]">.</span>
                  <span style={{ WebkitTextStroke: "1.5px #161210", color: "transparent" }}>lab</span>
                </motion.h1>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] bg-gradient-to-r from-[#FF3B22] via-[#FFC01E] to-transparent mt-4 origin-left max-w-sm"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="col-span-12 md:col-span-4 font-mono text-sm leading-relaxed text-[#161210]/80"
            >
              <p className="border-l-2 border-[#FF3B22] pl-4">
                A daytime café bistro — fresh panini, single-origin espresso, bistro plates and Apericena. Run by hungry students, calibrated by caffeine, perfected by passion. No pizza here — that&apos;s the other sibling.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <Metric n="07:30" l="open" />
                <Metric n="3.5" l="rating" />
                <Metric n="67" l="reviews" />
              </div>
            </motion.div>
          </div>

          {/* Marquee-ish strip */}
          <div className="mt-12 md:mt-16 border-y border-[#161210]/20 py-3 overflow-hidden">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] flex items-center gap-8 whitespace-nowrap animate-[scroll_30s_linear_infinite]">
              {Array.from({ length: 3 }).map((_, k) => (
                <span key={k} className="flex items-center gap-8">
                  <Beaker size={12} className="text-[#FF3B22]" /> CROISSANT 7.30AM
                  <span className="text-[#FF3B22]">·</span>
                  <TestTube size={12} className="text-[#FFC01E]" /> PIADINA 1PM
                  <span className="text-[#FFC01E]">·</span>
                  <FlaskConical size={12} className="text-[#F74898]" /> SPRITZ 5PM
                  <span className="text-[#F74898]">·</span>
                  <Coffee size={12} className="text-[#FF3B22]" /> ESPRESSO ALWAYS
                  <span className="text-[#FF3B22]">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* HERO IMAGE collage with parallax */}
        <section className="px-6 md:px-12 lg:px-16 mb-20">
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-12 md:col-span-7 aspect-[16/10] overflow-hidden border-2 border-[#161210] relative group"
            >
              <motion.img src={IMG.pizzaTable} alt="Café counter" className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-[1.06]" style={{ y: heroImgY }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FormulaTag>FORMULA #001 · espresso · 18g · 36ml</FormulaTag>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="col-span-12 md:col-span-5 aspect-[16/10] md:aspect-auto overflow-hidden border-2 border-[#161210] relative group"
            >
              <img src={IMG.cheersFriends} alt="Friends at Lab" className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FormulaTag>SUBJECTS · happy specimens</FormulaTag>
            </motion.div>
          </div>
        </section>

        {/* PERIODIC MENU */}
        <section className="px-6 md:px-12 lg:px-16 mb-24" id="menu" data-testid="lab-menu">
          <div className="flex items-end justify-between mb-8 border-b-2 border-[#161210] pb-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-2">
                Section 2 · Edible specimens
              </div>
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter">
                Periodic table
                <br />
                <span style={{ WebkitTextStroke: "1.5px #161210", color: "transparent" }}>of the bistro</span>
              </h2>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] hidden md:block text-[#161210]/60">
              Hover an element to read the report ↓
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" data-testid="lab-elements-grid">
            {ELEMENTS.map((e, i) => {
              const I = e.icon;
              return (
                <motion.div
                  key={e.sym}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  data-testid={`lab-element-${i}`}
                  className="group relative border-2 border-[#161210] p-4 md:p-5 bg-[#FBF6E9] hover:bg-[#161210] hover:text-[#FBF6E9] transition-colors duration-300 cursor-pointer min-h-[200px] md:min-h-[240px] flex flex-col hover:shadow-[6px_6px_0_0_#FF3B22]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF3B22]/0 to-[#FF3B22]/0 group-hover:from-[#FF3B22]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                  <div className="flex items-start justify-between relative">
                    <span className="font-mono text-[10px] opacity-70">{String(e.n).padStart(3, "0")}</span>
                    <I size={18} className="opacity-70 group-hover:text-[#FFC01E] group-hover:rotate-12 transition-all duration-300" />
                  </div>

                  <div className="mt-2 font-display text-5xl md:text-6xl leading-none uppercase relative">
                    {e.sym}
                  </div>

                  <div className="font-display text-lg uppercase mt-3 leading-tight">{e.name}</div>
                  <div className="font-mono text-[10px] mt-1 opacity-70 leading-snug">{e.formula}</div>

                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70 group-hover:text-[#FFC01E] transition-colors">{e.note}</span>
                    <span className="font-display text-2xl text-[#FF3B22] group-hover:text-[#FFC01E] group-hover:scale-110 transition-all duration-300">{e.price}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* BISTRO COMBOS */}
        <section className="px-6 md:px-12 lg:px-16 mb-24" data-testid="lab-combos">
          <div className="flex items-end justify-between mb-8 border-b-2 border-[#161210] pb-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-2">
                Section 2b · Value formulas
              </div>
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter">
                Bistro
                <br />
                <span className="font-script text-[#FF3B22] normal-case tracking-normal text-6xl md:text-8xl">combos</span>
              </h2>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] hidden md:block text-[#161210]/60">
              Save up to 20% ↓
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              {
                title: "Colazione",
                time: "07:30 — 11:00",
                items: ["Cornetto or Pasticciotto", "Cappuccino or Espresso Doppio"],
                price: "€4.00",
                was: "€5.30",
                accent: "#FFC01E",
                emoji: "☀️",
              },
              {
                title: "Pranzo Bistro",
                time: "12:00 — 15:00",
                items: ["Panino or Piadina or Toast", "Insalatona or Zuppa", "Acqua or Caffè"],
                price: "€12.00",
                was: "€16.00",
                accent: "#FF3B22",
                emoji: "🍽️",
              },
              {
                title: "Apericena",
                time: "17:00 — 20:00",
                items: ["Spritz or Negroni Bistrò", "Tagliere Lab sharing board"],
                price: "€18.00",
                was: "€23.00",
                accent: "#F74898",
                emoji: "🥂",
              },
            ].map((combo, i) => (
              <motion.div
                key={combo.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                data-testid={`lab-combo-${i}`}
                className="group border-2 border-[#161210] p-6 md:p-7 hover:bg-[#161210] hover:text-[#FBF6E9] transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute -right-2 -top-2 text-[80px] opacity-[0.06] select-none pointer-events-none">{combo.emoji}</div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: combo.accent }}>{combo.time}</span>
                    <span className="text-2xl">{combo.emoji}</span>
                  </div>
                  <div className="font-display text-3xl md:text-4xl uppercase leading-none mb-4">{combo.title}</div>
                  <ul className="space-y-1.5 mb-6">
                    {combo.items.map((item, j) => (
                      <li key={j} className="font-mono text-[11px] flex items-center gap-2">
                        <span style={{ color: combo.accent }}>+</span> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between border-t border-[#161210]/20 group-hover:border-[#FBF6E9]/20 pt-4 transition-colors">
                    <div>
                      <span className="font-display text-3xl" style={{ color: combo.accent }}>{combo.price}</span>
                      <span className="font-mono text-[10px] text-[#161210]/50 group-hover:text-[#FBF6E9]/50 line-through ml-2">{combo.was}</span>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider border px-2 py-1 transition-colors" style={{ borderColor: combo.accent, color: combo.accent }}>
                      Save {Math.round((1 - parseFloat(combo.price.slice(1)) / parseFloat(combo.was.slice(1))) * 100)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BISTRO GALLERY */}
        <section className="px-6 md:px-12 lg:px-16 mb-24" data-testid="lab-gallery">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-4">
            Section 2c · Visual evidence
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter mb-8">
            Shot by
            <span className="font-script text-[#F74898] normal-case tracking-normal"> regulars.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {[
              { caption: "Morning pistachio ritual", tag: "@sara.m" },
              { caption: "Thesis fuel station", tag: "@lorenzo.b" },
              { caption: "The aperitivo board", tag: "@emma.o" },
              { caption: "Club Bistro debut", tag: "@marco.t" },
              { caption: "Matcha + muffin combo", tag: "@giulia.r" },
              { caption: "Sunday brunch chaos", tag: "@erasmus.crew" },
              { caption: "Toast Trifolato close-up", tag: "@foodie.mi" },
              { caption: "Golden hour spritz", tag: "@dahlia.lab" },
            ].map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group aspect-square border-2 border-[#161210] bg-[#161210] relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF3B22]/20 via-[#FFC01E]/10 to-[#F74898]/20 opacity-60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#FBF6E9] p-4 text-center">
                  <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">📸</div>
                  <div className="font-editorial italic text-sm leading-snug opacity-90">{photo.caption}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider mt-2 opacity-50">{photo.tag}</div>
                </div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#FFC01E] transition-colors duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* LAB AI EXPERIMENT */}
        <LabExperiment />

        {/* SPECIALS CHALKBOARD */}
        <section className="px-6 md:px-12 lg:px-16 mb-24" data-testid="lab-specials">
          <div className="bg-[#161210] text-[#FBF6E9] p-8 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(to right, #FBF6E9 1px, transparent 1px), linear-gradient(to bottom, #FBF6E9 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
              <div className="md:col-span-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FFC01E] mb-4">
                  Lavagna · December 12
                </div>
                <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter">
                  Today on
                  <br />
                  <span className="font-script text-[#FFC01E] normal-case tracking-normal text-6xl md:text-8xl">the board</span>
                </h2>
                <p className="font-editorial italic text-[#FBF6E9]/70 text-lg mt-6 max-w-xs">
                  Chef Roberta scribbles a new menu every morning. Today she was in a good mood.
                </p>
              </div>
              <ul className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5" data-testid="lab-specials-list">
                {[
                  ["Crostata di mele", "Grandma's recipe + cinnamon clouds", "€4"],
                  ["Vellutata di zucca", "Pumpkin · ginger · pumpkin seeds", "€8"],
                  ["Toast Trifolato", "Funghi · taleggio · thyme", "€7.50"],
                  ["Cheesecake Pistacchio", "Sicilian pistachio · raspberry", "€5"],
                  ["Cappuccino Cardamom", "Single-origin · house cardamom", "€2.50"],
                  ["Spremuta d&apos;arancia", "Sicilian blood orange · cold-pressed", "€3.80"],
                ].map((s, i) => (
                  <li key={i} data-testid={`lab-special-${i}`} className="font-script flex items-baseline justify-between gap-4 border-b border-[#FBF6E9]/15 pb-3 hover:border-[#FFC01E] transition-colors">
                    <div>
                      <div className="text-2xl md:text-3xl text-[#FBF6E9]" dangerouslySetInnerHTML={{ __html: s[0] }} />
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FBF6E9]/60 mt-1">{s[1]}</div>
                    </div>
                    <div className="font-display text-2xl text-[#FFC01E]">{s[2]}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* STUDENT LOYALTY CARD */}
        <section className="px-6 md:px-12 lg:px-16 mb-24" data-testid="lab-loyalty">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="col-span-12 md:col-span-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-3">
                Section 5 · Perks
              </div>
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
                The Lab
                <br />
                <span style={{ WebkitTextStroke: "1.5px #161210", color: "transparent" }}>passport.</span>
              </h2>
              <p className="font-editorial italic text-lg text-[#161210]/70 mt-6 max-w-md">
                Free to grab at the counter. Stamp it. Fill it. Get rewarded for caffeine addiction.
              </p>
              <ul className="mt-8 space-y-3 font-mono text-sm">
                <li className="flex gap-3"><span className="text-[#FF3B22]">→</span> 10 espressi = 1 free cornetto</li>
                <li className="flex gap-3"><span className="text-[#FF3B22]">→</span> 5 piadinas = 1 free Spritz</li>
                <li className="flex gap-3"><span className="text-[#FF3B22]">→</span> Bocconi ID = -15% always</li>
                <li className="flex gap-3"><span className="text-[#FF3B22]">→</span> Birthday week = free affogato</li>
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, rotate: 6, y: 30 }}
              whileInView={{ opacity: 1, rotate: 2, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-12 md:col-span-7 relative"
              data-testid="lab-passport-card"
            >
              <div className="bg-[#161210] text-[#FBF6E9] p-7 md:p-10 border-2 border-[#161210] shadow-[12px_12px_0_0_#FF3B22]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFC01E]">Dahlia.lab passport</div>
                    <div className="font-display text-3xl uppercase mt-2">N° 00427</div>
                  </div>
                  <FlaskConical size={32} className="text-[#FFC01E]" />
                </div>
                <div className="mt-8 grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`aspect-square border-2 border-[#FBF6E9]/30 flex items-center justify-center font-mono text-xs ${i < 7 ? "bg-[#FF3B22] border-[#FF3B22] text-[#FBF6E9]" : ""}`}>
                      {i < 7 ? "☕" : i + 1}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-end justify-between border-t border-[#FBF6E9]/15 pt-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FBF6E9]/70">
                    Holder: Marco T.<br />Bocconi · since Sept 2024
                  </div>
                  <div className="font-script text-2xl text-[#FFC01E]">grazie!</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LAB EVENTS */}
        <section className="px-6 md:px-12 lg:px-16 mb-24" data-testid="lab-events">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 border-b-2 border-[#161210] pb-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-3">
                Section 6 · Weekly experiments
              </div>
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter">
                What happens here.
              </h2>
            </div>
            <p className="font-editorial italic text-[#161210]/70 text-lg max-w-sm">
              Quiet caffeine in the morning, soft chaos by night. Same lab, different protocols.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { day: "Tue", title: "Thesis Survival", sub: "Free refills 14:00–18:00 for anyone writing a dissertation. Quiet zone enforced by Roberta.", icon: Coffee, accent: "#FF3B22" },
              { day: "Wed", title: "Croissant Lab", sub: "Watch the laminator in action at 08:00. Free first cornetto if you stay till bake-out.", icon: Croissant, accent: "#FFC01E" },
              { day: "Fri", title: "Acoustic Lunch", sub: "Live unplugged sets 12:30–14:30. Bring headphones if you actually need to study.", icon: TestTube, accent: "#F74898" },
              { day: "Sun", title: "Brunch Riot", sub: "11:00–15:00 prosecco-fuelled brunch. Reservation strongly advised.", icon: FlaskConical, accent: "#FF3B22" },
            ].map((e, i) => {
              const I = e.icon;
              return (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  data-testid={`lab-event-${i}`}
                  className="group border-2 border-[#161210] p-5 md:p-6 hover:bg-[#161210] hover:text-[#FBF6E9] transition-colors duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: e.accent }}>{e.day}</span>
                    <I size={20} strokeWidth={1.5} />
                  </div>
                  <div className="font-display text-2xl md:text-3xl uppercase leading-none">{e.title}</div>
                  <p className="font-mono text-[11px] mt-3 opacity-80 leading-snug">{e.sub}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* LAB REVIEWS */}
        <section className="px-6 md:px-12 lg:px-16 mb-24" data-testid="lab-reviews">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-4">
            Section 7 · Field notes
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter mb-10">
            From the regulars.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              ["The pistachio cornetto ruined every other croissant for me.", "Sara M.", "Bocconi · MSc"],
              ["I wrote 40 pages of my thesis here. Worth every espresso.", "Lorenzo B.", "Polimi"],
              ["The Spritz at 17:00 is the official transition into evening.", "Emma O.", "Erasmus · UK"],
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                data-testid={`lab-review-${i}`}
                className="border-2 border-[#161210] p-6 md:p-7 hover:bg-[#FFC01E] hover:shadow-[6px_6px_0_0_#161210] transition-all duration-300 cursor-pointer group"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF3B22] mb-4 group-hover:text-[#161210] transition-colors">★★★★★</div>
                <p className="font-editorial italic text-xl leading-snug">&ldquo;{r[0]}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-[#161210]/20 font-mono text-[10px] uppercase tracking-[0.25em] flex justify-between">
                  <span>{r[1]}</span>
                  <span className="opacity-70">{r[2]}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Procedure timeline + Hours */}
        <section className="px-6 md:px-12 lg:px-16 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-3">
              Section 3 · Daily procedure
            </div>
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-none tracking-tighter mb-8">
              How the lab runs
            </h2>
            <ul className="border-l-2 border-[#161210] pl-6 space-y-5" data-testid="lab-procedure">
              {PROCEDURE.map((p, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1 w-3 h-3 border-2 border-[#161210] bg-[#FF3B22]" />
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-2xl md:text-3xl text-[#161210] tabular-nums">{p.t}</span>
                    <span className="font-mono text-sm md:text-base">{p.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-3">
              Section 4 · Coordinates
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase leading-none tracking-tighter mb-6">
              Find the lab
            </h2>

            <div className="border-2 border-[#161210] p-6 bg-[#FBF6E9]">
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-[#FF3B22]" />
                  <span>Via Ferdinando Bocconi 6,<br />20136 Milano, Italia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#FF3B22]" />
                  <a href="tel:+393898892656" data-testid="lab-phone" className="hover:text-[#FF3B22] transition-colors">+39 389 889 2656</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 text-[#FF3B22]" />
                  <span>Daily · 07:30 — 22:00</span>
                </li>
              </ul>

              <div className="mt-6 grid grid-cols-7 gap-1 font-mono text-[10px] uppercase tracking-wider">
                {HOURS.map((h) => (
                  <div key={h.d} className="border border-[#161210]/30 p-2 text-center">
                    <div className="font-bold">{h.d}</div>
                    <div className="text-[8px] text-[#161210]/60 mt-1">{h.h.replace(" — ", "→")}</div>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=Via+Ferdinando+Bocconi+6+Milano"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="lab-directions"
                className="inline-flex mt-6 items-center gap-2 bg-[#161210] text-[#FBF6E9] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-[#FF3B22] transition-colors"
              >
                Get directions →
              </a>
            </div>
          </aside>
        </section>

        {/* HOST YOUR EVENT - LAB FLAVOUR */}
        <HostEvent variant="light" />

        {/* BIG BRANDED FOOTER */}
        <section className="border-t-2 border-[#161210] pt-16 md:pt-20 pb-6 px-6 md:px-12 lg:px-16" data-testid="lab-big-footer">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-14">
            <div className="md:col-span-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-3">Newsletter</div>
              <p className="font-editorial italic text-2xl leading-snug max-w-sm">Weekly Lab bulletin — new specials, secret pastries, exam-week survival tips. Zero spam.</p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex border-b-2 border-[#161210] focus-within:border-[#FF3B22] transition-colors max-w-md">
                <input type="email" placeholder="ciao@bocconi.it" data-testid="lab-newsletter-input" className="bg-transparent flex-1 py-2 font-mono text-sm focus:outline-none placeholder:text-[#161210]/40" />
                <button data-testid="lab-newsletter-btn" className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF3B22] px-3 hover:text-[#161210]">Subscribe →</button>
              </form>
            </div>
            <div className="md:col-span-3 font-mono text-sm">
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-3">Quick links</div>
              <ul className="space-y-2">
                <li><a href="#menu" className="hover:text-[#FF3B22] transition-colors">→ Periodic menu</a></li>
                <li><Link to="/oven" className="hover:text-[#FF3B22] transition-colors">→ Dahlia.oven</Link></li>
                <li><Link to="/community" className="hover:text-[#FF3B22] transition-colors">→ The League</Link></li>
                <li><a href="mailto:lab@dahlia.it" className="hover:text-[#FF3B22] transition-colors">→ Private events</a></li>
              </ul>
            </div>
            <div className="md:col-span-4 font-mono text-sm">
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] mb-3">Specimen info</div>
              <p className="leading-relaxed">Via Ferdinando Bocconi 6,<br />20136 Milano, Italia<br />Daily 07:30 — 22:00<br />+39 389 889 2656</p>
            </div>
          </div>

          {/* Giant brand */}
          <div className="relative overflow-hidden border-t border-[#161210]/30 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display uppercase leading-[0.78] tracking-tighter text-[28vw] md:text-[24vw]"
            >
              .LAB
            </motion.div>
            <motion.div
              initial={{ opacity: 0, rotate: -12, scale: 0.7 }}
              whileInView={{ opacity: 1, rotate: -4, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="absolute right-3 bottom-6 md:bottom-10 font-script text-3xl md:text-5xl text-[#FF3B22] rotate-[-4deg] hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              ci vediamo domani.
            </motion.div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#161210]/60 pt-4 border-t border-[#161210]/30">
            <span>© {new Date().getFullYear()} Dahlia.lab · All experiments edible · Crafted by <a href="#" data-testid="valtoris-credit-lab" className="text-[#FF3B22] hover:text-[#161210] transition-colors">Valtoris</a></span>
            <Link to="/oven" data-testid="lab-footer-oven-link" className="hover:text-[#FF3B22]">Switch to the night-time sibling →</Link>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

const LAB_MOODS = [
  { id: "focus", label: "Deep focus", emoji: "🧠", desc: "Need to write 10 pages before noon" },
  { id: "chill", label: "Just vibing", emoji: "☀️", desc: "People-watching + good music" },
  { id: "hangover", label: "Hangover mode", emoji: "💀", desc: "Was at Oven last night..." },
  { id: "date", label: "Study date", emoji: "💕", desc: "Impressing someone with taste" },
  { id: "quick", label: "In & out", emoji: "⚡", desc: "5 minutes between classes" },
  { id: "aperitivo", label: "Aperitivo time", emoji: "🍹", desc: "It's past 17:00, let's go" },
];

function LabExperiment() {
  const [mood, setMood] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleMood(m) {
    setMood(m);
    setLoading(true);
    setResult("");
    const prompt = `I'm at Dahlia Lab café in the morning. My mood is: "${m.label}" — ${m.desc}. What should I order from the Lab menu? Options include: Pistachio Cornetto (€2.80), Pasticciotto Leccese (€2.50), Piadina Romagnola (€7), Insalatona Lab (€11), Espresso Doppio (€1.50), Affogato Riot (€6), Spritz Lab (€7), Muffin Bio (€2.20), Cappuccino Cardamom (€2.50), Toast Trifolato (€7.50). Give me a 2-item combo recommendation in 2 playful sentences.`;
    const reply = await askMistral(prompt);
    setResult(reply);
    setLoading(false);
  }

  return (
    <section className="px-6 md:px-12 lg:px-16 mb-24" data-testid="lab-experiment">
      <div className="border-2 border-[#161210] p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-4 right-4 opacity-10 font-display text-[12rem] leading-none pointer-events-none select-none">?</div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Beaker size={18} className="text-[#FF3B22]" />
            </motion.div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF3B22]">
              Experiment #42 · AI Lab Assistant
            </span>
          </div>
          <h3 className="font-display text-4xl md:text-6xl uppercase leading-none tracking-tighter">
            What&apos;s your
            <br />
            <span className="font-script text-[#FF3B22] normal-case tracking-normal">mood today?</span>
          </h3>
          <p className="font-mono text-sm text-[#161210]/70 mt-4 max-w-lg">
            Select your current state and our AI will prescribe the perfect Lab combo.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mt-8">
            {LAB_MOODS.map((m) => (
              <motion.button
                key={m.id}
                onClick={() => handleMood(m)}
                data-testid={`lab-mood-${m.id}`}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
                className={`border-2 p-4 text-left transition-all duration-300 cursor-pointer ${
                  mood?.id === m.id
                    ? "border-[#FF3B22] bg-[#FF3B22] text-[#FBF6E9]"
                    : "border-[#161210] hover:border-[#FF3B22] hover:bg-[#161210] hover:text-[#FBF6E9]"
                }`}
              >
                <div className="text-2xl mb-2">{m.emoji}</div>
                <div className="font-display text-lg uppercase leading-tight">{m.label}</div>
                <div className="font-mono text-[10px] mt-1 opacity-70">{m.desc}</div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {(loading || result) && (
              <motion.div
                key={mood?.id}
                initial={{ opacity: 0, y: 16, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 border-t-2 border-[#161210] pt-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-[#FFC01E]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF3B22]">AI prescription for "{mood?.label}"</span>
                </div>
                {loading ? (
                  <div className="flex items-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <FlaskConical size={16} className="text-[#FF3B22]" />
                    </motion.div>
                    <span className="font-mono text-sm text-[#161210]/60">Mixing your formula...</span>
                  </div>
                ) : (
                  <p className="font-editorial italic text-xl leading-snug max-w-2xl">{result}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Metric({ n, l }) {
  return (
    <div className="border border-[#161210]/30 py-3">
      <div className="font-display text-2xl leading-none">{n}</div>
      <div className="text-[9px] uppercase tracking-[0.2em] mt-1 opacity-60">{l}</div>
    </div>
  );
}

function FormulaTag({ children }) {
  return (
    <div className="absolute bottom-3 left-3 bg-[#FBF6E9] border border-[#161210] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">
      {children}
    </div>
  );
}
