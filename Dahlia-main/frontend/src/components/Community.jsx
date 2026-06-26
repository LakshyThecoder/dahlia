import { motion } from "framer-motion";
import { Trophy, Beer, Pizza, Mic2, Users, Flame, Calendar, Crown, ArrowUpRight, Zap, Star, Target, Award } from "lucide-react";

const LEADERBOARD = [
  { rank: 1, name: "Marco \"Crustfather\" T.", uni: "Polimi", points: 487, xp: 92, badge: "Pizza King", color: "var(--dahlia-yellow)" },
  { rank: 2, name: "Giulia R.", uni: "Bocconi", points: 462, xp: 87, badge: "Spritz Queen", color: "var(--dahlia-pink)" },
  { rank: 3, name: "Trygve A.", uni: "Erasmus · NO", points: 441, xp: 83, badge: "Negroni Knight", color: "var(--dahlia-red)" },
  { rank: 4, name: "Lena K.", uni: "Berlin Visitor", points: 398, xp: 75, badge: "Karaoke Beast", color: "var(--dahlia-text)" },
  { rank: 5, name: "Hendrik R.", uni: "Erasmus · NL", points: 376, xp: 71, badge: "Calcio Captain", color: "var(--dahlia-text)" },
  { rank: 6, name: "Anonimo", uni: "Statale", points: 351, xp: 66, badge: "Mystery Eater", color: "var(--dahlia-muted)" },
];

const COMPETITIONS = [
  {
    title: "Pizza Eating Championship",
    sub: "8 slices. 12 minutes. One Crustfather. Free entry, €500 bar tab to the winner.",
    when: "Sat 14 Dec · 21:30",
    spots: "16 / 20",
    spotsNum: 16, spotsMax: 20,
    icon: Pizza,
    color: "var(--dahlia-red)",
    prize: "€500 bar tab",
  },
  {
    title: "Beer Pong Tournament",
    sub: "Doubles only. Bring your worst friend. Bracket of 32. Loser buys the next round.",
    when: "Fri 20 Dec · 20:00",
    spots: "22 / 32",
    spotsNum: 22, spotsMax: 32,
    icon: Beer,
    color: "var(--dahlia-yellow)",
    prize: "Free rounds all night",
  },
  {
    title: "Karaoke Riot Nights",
    sub: "International edition. Sing in any language. Worst voice wins a free pizza.",
    when: "Sun 22 Dec · 22:00",
    spots: "Open mic",
    spotsNum: 0, spotsMax: 0,
    icon: Mic2,
    color: "var(--dahlia-pink)",
    prize: "Free pizza",
  },
  {
    title: "Spritz Speed Challenge",
    sub: "How fast can you mix a perfect Spritz Dahlia? Judged by Marco, judged HARD.",
    when: "Fri 27 Dec · 19:00",
    spots: "9 / 12",
    spotsNum: 9, spotsMax: 12,
    icon: Flame,
    color: "var(--dahlia-red)",
    prize: "Bartender title",
  },
];

const BADGES = [
  { name: "Pizza King", desc: "10 different signatures in one month", icon: Crown, rarity: "Legendary" },
  { name: "Spritz Queen", desc: "Spotted at 5+ aperitivos", icon: Beer, rarity: "Epic" },
  { name: "Karaoke Beast", desc: "Performed in 3+ languages", icon: Mic2, rarity: "Rare" },
  { name: "Calcio Captain", desc: "Never missed a Serie A night", icon: Trophy, rarity: "Epic" },
  { name: "Night Owl", desc: "Last to leave 3 times in a row", icon: Star, rarity: "Common" },
  { name: "First Blood", desc: "Won your first competition", icon: Target, rarity: "Common" },
];

export default function Community() {
  return (
    <section
      id="community"
      data-testid="community-section"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-dahlia-bg overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4">
            06 — La Dahlia League
          </div>
          <h2
            data-testid="community-heading"
            className="font-display text-6xl md:text-9xl uppercase leading-[0.85] tracking-tighter"
          >
            Eat. Drink.
            <br />
            <span className="text-stroke-red">Compete.</span>
          </h2>
        </div>
        <p className="font-editorial italic text-xl text-dahlia-muted max-w-md">
          We don&apos;t just serve pizza — we host friendly chaos. Join the Dahlia League: leaderboards, championships, prizes you&apos;ll instantly regret winning.
        </p>
      </div>

      {/* Tonight ticker */}
      <div className="mb-12 md:mb-16 border border-dahlia-border p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="w-2.5 h-2.5 rounded-full bg-dahlia-red pulse-dot" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold">Live tonight</div>
            <div className="font-display text-2xl md:text-3xl uppercase mt-1 tracking-wide">
              Boiler Room Fridays · Pizza Eating Championship in T-minus 03:14:22
            </div>
          </div>
        </div>
        <a
          href="#reserve"
          data-testid="community-join-tonight"
          className="shrink-0 inline-flex items-center gap-2 bg-dahlia-red text-white px-5 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-2px] hover:bg-[#ff5039] transition-all duration-300"
        >
          Save my spot →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Leaderboard */}
        <div className="lg:col-span-7" data-testid="community-leaderboard">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-2">Monthly leaderboard</div>
              <h3 className="font-display text-4xl md:text-5xl uppercase leading-none">December · Top 6</h3>
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-dahlia-muted hidden md:block">
              Points = visits + competition wins + reviews
            </div>
          </div>

          <ul className="border-t border-dahlia-border">
            {LEADERBOARD.map((p, i) => (
              <motion.li
                key={p.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                data-testid={`leaderboard-row-${p.rank}`}
                className="group grid grid-cols-[40px_1fr_auto_auto] items-center gap-4 md:gap-6 py-5 border-b border-dahlia-border hover:bg-white/[0.03] hover:pl-2 transition-all duration-300 cursor-pointer"
              >
                <span
                  className="font-display text-3xl md:text-4xl leading-none group-hover:scale-110 transition-transform"
                  style={{ color: i < 3 ? p.color : "var(--dahlia-muted)" }}
                >
                  {String(p.rank).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-xl md:text-2xl uppercase tracking-wide text-dahlia-text">
                      {p.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted">
                      {p.uni}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="relative w-24 h-1.5 bg-dahlia-border overflow-hidden">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.xp}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0"
                        style={{ backgroundColor: p.color }}
                      />
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-dahlia-muted">{p.xp}% to next rank</span>
                  </span>
                </span>
                <span
                  className="hidden md:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 border group-hover:bg-white/5 transition-colors"
                  style={{ borderColor: p.color, color: p.color }}
                >
                  <Zap size={9} />
                  {p.badge}
                </span>
                <span className="font-display text-2xl md:text-3xl text-dahlia-text tabular-nums group-hover:text-dahlia-yellow transition-colors">
                  {p.points}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Badges */}
          <div className="mt-10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-4">
              Badges you can chase
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BADGES.map((b, bi) => {
                const I = b.icon;
                const rarityColor = b.rarity === "Legendary" ? "text-dahlia-yellow border-dahlia-yellow/60" : b.rarity === "Epic" ? "text-dahlia-pink border-dahlia-pink/60" : b.rarity === "Rare" ? "text-dahlia-red border-dahlia-red/60" : "text-dahlia-muted border-dahlia-border";
                return (
                  <motion.div
                    key={b.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: bi * 0.06, duration: 0.4 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    data-testid={`badge-${b.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`border p-4 cursor-pointer group transition-all duration-300 hover:bg-white/[0.03] ${rarityColor}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <I size={22} strokeWidth={1.4} className="text-dahlia-yellow group-hover:rotate-12 transition-transform" />
                      <span className="text-[8px] uppercase tracking-wider opacity-70">{b.rarity}</span>
                    </div>
                    <div className="font-display text-lg uppercase leading-none">{b.name}</div>
                    <div className="text-[11px] text-dahlia-muted mt-2 leading-snug">{b.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Competitions */}
        <div className="lg:col-span-5">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-pink font-bold mb-2">Upcoming chaos</div>
              <h3 className="font-display text-4xl md:text-5xl uppercase leading-none">Competitions</h3>
            </div>
            <Calendar size={22} className="text-dahlia-muted" />
          </div>

          <ul className="flex flex-col gap-3" data-testid="competitions-list">
            {COMPETITIONS.map((c, i) => {
              const I = c.icon;
              const fillPct = c.spotsMax > 0 ? (c.spotsNum / c.spotsMax) * 100 : 0;
              return (
                <motion.li
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  data-testid={`competition-${i}`}
                  className="group border border-dahlia-border p-5 hover:border-dahlia-red transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, transparent 60%, ${c.color}10 100%)` }} />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <I size={20} strokeWidth={1.4} className="group-hover:rotate-12 transition-transform" style={{ color: c.color }} />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted">
                          {c.when}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 border" style={{ borderColor: c.color, color: c.color }}>
                          <Award size={8} className="inline mr-1" />{c.prize}
                        </span>
                      </div>
                      <h4 className="font-display text-2xl md:text-3xl uppercase leading-none group-hover:text-dahlia-text transition-colors">
                        {c.title}
                      </h4>
                      <p className="text-sm text-dahlia-muted mt-2 leading-snug">{c.sub}</p>
                    </div>
                    <ArrowUpRight size={20} className="text-dahlia-muted group-hover:text-dahlia-red group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>

                  <div className="relative mt-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-text/70 flex items-center gap-2">
                      <Users size={12} /> {c.spots} spots
                      {c.spotsMax > 0 && (
                        <span className="relative w-16 h-1.5 bg-dahlia-border overflow-hidden ml-2">
                          <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: `${fillPct}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="absolute inset-y-0 left-0"
                            style={{ backgroundColor: fillPct > 80 ? "var(--dahlia-red)" : c.color }}
                          />
                        </span>
                      )}
                    </span>
                    <button
                      data-testid={`comp-join-${i}`}
                      className="text-[10px] uppercase tracking-[0.25em] font-bold border-b border-transparent hover:border-current pb-0.5 group-hover:translate-x-0.5 transition-all"
                      style={{ color: c.color }}
                    >
                      Sign me up →
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
