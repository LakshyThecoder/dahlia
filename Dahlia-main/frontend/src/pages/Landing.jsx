import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { IMG } from "@/lib/images";
import { Moon, Sun, ArrowUpRight, Trophy, Zap, Crown, Star } from "lucide-react";
import LoaderCurtain from "@/components/LoaderCurtain";
import { useRef } from "react";

const SIDES = [
  {
    to: "/oven",
    eyebrow: "Notturno · Via Ripamonti 35",
    title: "DAHLIA",
    accent: ".oven",
    sub: "Pizza, cocktails & musica. Fri-Sun, 18:00 → 00:00. The loud one.",
    img: IMG.heroPizza,
    icon: Moon,
    color: "var(--dahlia-red)",
    tag: "8.8 · TheFork",
    cta: "Enter the night",
  },
  {
    to: "/lab",
    eyebrow: "Diurno · Via Bocconi 6",
    title: "DAHLIA",
    accent: ".lab",
    sub: "Café bar — croissants, espresso, piadinas, spritz. Daily 07:30 → 22:00. The bright one.",
    img: IMG.duomoMilano,
    icon: Sun,
    color: "var(--dahlia-yellow)",
    tag: "Lab · Bocconi",
    cta: "Enter the day",
  },
];

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div className="bg-dahlia-bg text-dahlia-text font-body grain min-h-screen" data-testid="landing-page">
      <LoaderCurtain />

      {/* Mini topbar */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 lg:px-16 py-6">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-dahlia-red pulse-dot" />
          <span className="font-display text-xl tracking-wide">DAHLIA</span>
          <span className="font-editorial italic text-sm text-dahlia-muted">milano</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <Link
            to="/community"
            data-testid="landing-league-link"
            className="text-[11px] uppercase tracking-[0.3em] text-dahlia-text/80 border-b border-dahlia-text/20 pb-1 hover:text-dahlia-yellow hover:border-dahlia-yellow transition-colors"
          >
            The Dahlia League →
          </Link>
        </motion.div>
      </header>

      <main className="min-h-screen flex flex-col">
        {/* Title block */}
        <section className="pt-32 md:pt-36 px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-[11px] uppercase tracking-[0.35em] text-dahlia-red font-semibold mb-5 flex items-center gap-3"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block w-8 h-[2px] bg-dahlia-red origin-left"
                />
                Welcome to Milano
              </motion.div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%", rotateX: 30 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter"
                  style={{ perspective: "1000px" }}
                >
                  Two doors.
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%", rotateX: 30 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter"
                  style={{ perspective: "1000px" }}
                >
                  <span className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-text/95">one</span>{" "}
                  <span className="text-stroke-red">Dahlia.</span>
                </motion.h1>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-editorial italic text-xl text-dahlia-muted max-w-sm"
            >
              Pick where the night begins. You can always come back and try the other one — most people do.
            </motion.p>
          </div>
        </section>

        {/* Two badges with tilt */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 px-6 md:px-12 lg:px-16 mt-10 md:mt-14 pb-14 flex-1">
          {SIDES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 80, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full">
                  <Link
                    to={s.to}
                    data-testid={`landing-badge-${s.accent.slice(1)}`}
                    className="group relative block overflow-hidden h-[60vh] md:h-[72vh] cursor-pointer"
                  >
                    <motion.img
                      src={s.img}
                      alt={s.title + s.accent}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.12]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/95 group-hover:via-black/50 transition-all duration-700" />

                    {/* Grain on card */}
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

                    {/* Eyebrow */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-dahlia-text/90">
                        <Icon size={14} style={{ color: s.color }} />
                        {s.eyebrow}
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] border border-white/25 px-3 py-1.5 backdrop-blur-sm bg-white/[0.04]">
                        {s.tag}
                      </span>
                    </div>

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 80%, ${s.color}15 0%, transparent 60%)` }}
                    />

                    {/* Bottom block */}
                    <div className="absolute inset-x-6 md:inset-x-10 bottom-8 md:bottom-12">
                      <div className="font-display text-7xl md:text-[10rem] uppercase leading-[0.85] tracking-tighter">
                        {s.title}
                        <span style={{ color: s.color }}>.</span>
                        <span className="text-stroke">{s.accent.slice(1)}</span>
                      </div>
                      <p className="font-editorial italic text-lg md:text-2xl text-dahlia-text/95 mt-5 max-w-md">
                        {s.sub}
                      </p>
                      <div
                        className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 group-hover:translate-x-3 group-hover:gap-4"
                        style={{ color: s.color }}
                      >
                        {s.cta} <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                      </div>
                    </div>

                    {/* Bottom accent sweep */}
                    <div
                      className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                      style={{ background: `linear-gradient(to right, ${s.color}, transparent)` }}
                    />
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </section>

        {/* Dahlia League Banner */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-6 md:mx-12 lg:mx-16 mb-8 border border-dahlia-border relative overflow-hidden group"
          data-testid="landing-league-banner"
        >
          <Link to="/community" className="block">
            <div className="absolute inset-0 bg-gradient-to-r from-dahlia-red/5 via-transparent to-dahlia-yellow/5 group-hover:from-dahlia-red/10 group-hover:to-dahlia-yellow/10 transition-all duration-700" />
            <div className="relative px-6 md:px-10 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Trophy size={24} className="text-dahlia-yellow" />
                </motion.div>
                <div>
                  <div className="font-display text-2xl md:text-3xl uppercase tracking-tighter">The Dahlia League</div>
                  <div className="text-[11px] text-dahlia-muted mt-1">Eat, compete, collect badges, climb the leaderboard. Free to join.</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-4">
                  {[
                    { icon: Crown, label: "Leaderboard", color: "text-dahlia-yellow" },
                    { icon: Zap, label: "XP System", color: "text-dahlia-red" },
                    { icon: Star, label: "Badges", color: "text-dahlia-pink" },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-dahlia-muted">
                      <f.icon size={11} className={f.color} /> {f.label}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-dahlia-yellow group-hover:gap-3 transition-all duration-300">
                  Join now <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out bg-gradient-to-r from-dahlia-yellow to-dahlia-red" />
          </Link>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="px-6 md:px-12 lg:px-16 pb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-dahlia-muted"
        >
          <span>© {new Date().getFullYear()} Dahlia Milano · Crafted by <a href="#" data-testid="valtoris-credit-landing" className="text-dahlia-red hover:text-dahlia-yellow transition-colors font-semibold">Valtoris</a></span>
          <span className="hidden md:inline">Made with passion, basil & loud bass</span>
        </motion.div>
      </main>
    </div>
  );
}
