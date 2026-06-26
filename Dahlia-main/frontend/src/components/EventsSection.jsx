import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Users, Mic2, Globe2, Brain, Phone, ArrowDown, Trophy } from "lucide-react";

const TIMELINE = [
  { t: "19:30", label: "Arrive · check-in on the app · phones away" },
  { t: "20:15", label: "The ritual of the week" },
  { t: "21:30", label: "Community free time" },
  { t: "22:00", label: "Music + chats between new groups" },
];

const RITUALS = [
  { n: "01", week: "Week 1", title: "Community Tables", sub: "You get a number. Tables are mixed at random. Each table has 5 conversation starters waiting (\"What's your favourite spot in Milano?\", \"What made you smile today?\"...). Strangers leave as friends.", icon: Users, accent: "var(--dahlia-red)" },
  { n: "02", week: "Week 2", title: "Open Mic + Karaoke", sub: "Not a lame karaoke. An Open Mic. Sing, read a poem (steal one from Oven's books), tell a story, play an instrument. Five minutes of stage — yours.", icon: Mic2, accent: "var(--dahlia-yellow)" },
  { n: "03", week: "Week 3", title: "International Monday", sub: "Each table = one language: Italiano · English · Español · Русский · हिन्दी · العربية. You rotate tables through the night. Languages collide. Vibes win.", icon: Globe2, accent: "var(--dahlia-pink)" },
  { n: "04", week: "Week 4", title: "Team Quiz Night", sub: "You don't bring a team. A team is created the moment you walk in. Random strangers, shared trivia, one trophy, infinite chaos.", icon: Brain, accent: "var(--dahlia-red)" },
];

const LANG_TICKER = ["ITALIANO", "ENGLISH", "ESPAÑOL", "РУССКИЙ", "हिन्दी", "العربية", "DEUTSCH", "FRANÇAIS", "PORTUGUÊS", "中文"];

export default function EventsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id="events" data-testid="events-section" className="relative py-24 md:py-32 overflow-hidden bg-dahlia-bg">
      {/* GIANT GHOST BACKGROUND TYPE */}
      <motion.div
        style={{ y: yBig }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 md:top-20 z-0 select-none"
      >
        <div className="font-display text-[20vw] md:text-[18vw] uppercase tracking-tighter leading-none whitespace-nowrap text-dahlia-text/[0.025]">
          DAHLIA · DAHLIA · DAHLIA
        </div>
      </motion.div>

      <div className="relative z-10 px-6 md:px-12 lg:px-16">
        {/* TOP NUMBER + EYEBROW */}
        <div className="flex items-center gap-6 mb-10">
          <div className="font-display text-7xl md:text-8xl text-dahlia-red leading-none">03</div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-dahlia-red font-bold">Dahlia Mondays</div>
            <div className="font-editorial italic text-dahlia-muted text-lg mt-1">A weekly ritual.</div>
          </div>
        </div>

        {/* MASSIVE MANIFESTO */}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            data-testid="events-heading"
            className="font-display text-[16vw] md:text-[11vw] uppercase leading-[0.82] tracking-tighter"
          >
            <span className="block">We don&apos;t</span>
            <span className="block">organise events.</span>
            <span className="block text-stroke-red">We create moments</span>
            <span className="block font-editorial italic font-medium normal-case tracking-normal text-dahlia-yellow">worth remembering.</span>
          </motion.h2>

          {/* Floating sticker */}
          <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
            whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
            className="absolute top-4 right-2 md:top-12 md:right-12 float-slow"
            style={{ "--r": "-6deg" }}
          >
            <div className="bg-dahlia-yellow text-dahlia-bg px-5 py-2 font-script text-3xl md:text-4xl shadow-[6px_6px_0_0_rgba(255,59,34,0.9)]">
              ogni lunedì
            </div>
          </motion.div>
        </div>

        {/* MANIFESTO LINE + ARROW */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <p className="md:col-span-7 font-editorial italic text-2xl md:text-3xl text-dahlia-muted leading-snug max-w-2xl">
            Every Monday. One city. One ritual. <span className="text-dahlia-text">Different people.</span> Same room — never the same night twice.
          </p>
          <div className="md:col-span-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-dahlia-red md:justify-end">
            <ArrowDown size={14} className="animate-bounce" />
            Scroll into the ritual
          </div>
        </div>

        {/* LANGUAGE TICKER STRIP */}
        <div className="mt-16 mb-20 border-y-2 border-dahlia-border py-5 overflow-hidden bg-dahlia-surface/40">
          <div className="flex items-center gap-10 whitespace-nowrap animate-[scroll_28s_linear_infinite]">
            {[...LANG_TICKER, ...LANG_TICKER, ...LANG_TICKER].map((l, i) => (
              <span key={i} className="flex items-center gap-10 font-display text-3xl md:text-5xl uppercase tracking-tight text-dahlia-text/90">
                {l}
                <span className="w-2 h-2 rounded-full bg-dahlia-red shrink-0" />
              </span>
            ))}
          </div>
        </div>

        {/* TIMELINE — cinematic horizontal */}
        <div className="mb-20 md:mb-24" data-testid="dahlia-timeline">
          <div className="flex items-end justify-between mb-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold">A Monday at Dahlia</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-muted hidden md:flex items-center gap-2">
              <Phone size={12} /> Phones-away policy enforced at the door
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t-2 border-dahlia-red">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative py-8 md:py-10 px-5 md:px-7 ${i < 3 ? "md:border-r" : ""} border-r border-dahlia-border ${i < 2 ? "border-b md:border-b-0" : ""}`}
              >
                <div className="absolute -top-[7px] left-5 w-3 h-3 rounded-full bg-dahlia-red" />
                <div className="font-display text-5xl md:text-6xl text-dahlia-yellow leading-none tabular-nums">{t.t}</div>
                <div className="text-sm text-dahlia-text/85 leading-snug mt-4">{t.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4 RITUALS — bento layout */}
        <div className="mb-16" data-testid="events-list">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-2">Four rituals · one month</div>
              <h3 className="font-display text-4xl md:text-5xl uppercase leading-none">The cycle</h3>
            </div>
            <div className="font-script text-2xl md:text-3xl text-dahlia-red rotate-[-3deg]">repeat & rinse</div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {RITUALS.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.li
                  key={r.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  data-testid={`event-card-${i}`}
                  className="group relative overflow-hidden border border-dahlia-border hover:border-dahlia-red transition-colors duration-300 cursor-pointer"
                >
                  {/* Hover background sweep */}
                  <div className="absolute inset-0 bg-dahlia-red/0 group-hover:bg-dahlia-red/[0.04] transition-colors duration-500" />
                  {/* Big bg week number */}
                  <div className="absolute -bottom-6 -right-4 font-display text-[12rem] leading-none text-dahlia-text/[0.04] select-none">
                    {r.n}
                  </div>
                  <div className="relative p-7 md:p-10">
                    <div className="flex items-start justify-between gap-6 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-3xl text-dahlia-muted">{r.n}</span>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: r.accent }}>{r.week}</span>
                      </div>
                      <Icon size={36} strokeWidth={1.3} className="text-dahlia-text/60 group-hover:text-dahlia-red group-hover:rotate-6 transition-all duration-300" />
                    </div>
                    <h4 className="font-display text-4xl md:text-5xl uppercase leading-[0.95] mb-5">{r.title}</h4>
                    <p className="text-sm text-dahlia-muted max-w-md leading-relaxed">{r.sub}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300" style={{ color: r.accent }}>
                      Reserve a seat →
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* DAHLIA MONDAYS CTA — bold closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          data-testid="dahlia-mondays-cta"
          className="relative border border-dahlia-border bg-dahlia-surface overflow-hidden p-8 md:p-14"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #F4F0EA 1px, transparent 1px), linear-gradient(to bottom, #F4F0EA 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-5">Every Monday · 19:30 · Dahlia.oven</div>
              <h3 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
                Your Monday
                <br />
                <span className="text-stroke-red">starts here.</span>
              </h3>
              <p className="font-editorial italic text-lg md:text-xl text-dahlia-muted mt-6 max-w-xl leading-snug">
                No ticket. No app. Just show up with an open mind and an empty stomach. The room does the rest — new faces, good chaos, proper pizza.
              </p>
              <a
                href="#reserve"
                data-testid="dahlia-mondays-reserve"
                className="mt-8 inline-flex items-center gap-3 bg-dahlia-red text-white px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-3px] hover:bg-[#ff5039] transition-all duration-300"
              >
                Reserve your Monday →
              </a>
              <Link
                to="/community"
                data-testid="events-league-link"
                className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-dahlia-yellow hover:text-dahlia-red transition-colors border-b border-dahlia-yellow/30 pb-1"
              >
                <Trophy size={12} /> Earn 2x League XP on Mondays →
              </Link>
            </div>

            <div className="md:col-span-5 flex flex-col gap-4">
              {[
                { n: "52", l: "Mondays hosted" },
                { n: "1.2K+", l: "Strangers connected" },
                { n: "4", l: "Rituals per month" },
                { n: "0", l: "Boring nights" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-baseline justify-between border-b border-dahlia-border pb-3"
                >
                  <span className="font-display text-4xl md:text-5xl text-dahlia-text leading-none">{s.n}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted">{s.l}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
    </section>
  );
}
