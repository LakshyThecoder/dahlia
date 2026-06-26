import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Community from "@/components/Community";
import { ArrowLeft, Trophy, Sparkles, Zap, Crown, Star, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-dahlia-bg text-dahlia-text font-body grain" data-testid="community-page">
      {/* Top bar */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
          <Link to="/" data-testid="league-back-home" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] hover:text-dahlia-red transition-colors">
            <ArrowLeft size={14} /> Back to entrance
          </Link>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]">
            <Trophy size={14} className="text-dahlia-yellow" />
            The Dahlia League
          </div>
          <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.3em]">
            <Link to="/league/account" data-testid="league-to-account" className="text-dahlia-yellow hover:text-dahlia-red transition-colors flex items-center gap-1.5"><Star size={10} /> My Account</Link>
            <Link to="/oven" data-testid="league-to-oven" className="hover:text-dahlia-red transition-colors">Oven</Link>
            <Link to="/lab" data-testid="league-to-lab" className="hover:text-dahlia-red transition-colors">Lab</Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-10 md:pb-16 relative overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
            className="absolute inset-x-0 top-20 pointer-events-none select-none opacity-[0.03]"
          >
            <div className="font-display text-[20vw] uppercase leading-none whitespace-nowrap text-dahlia-text">
              LEAGUE · EAT · COMPETE · WIN · LEAGUE · EAT · COMPETE · WIN · LEAGUE · EAT · COMPETE · WIN
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative grid grid-cols-12 gap-6 items-end"
          >
            <div className="col-span-12 md:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[11px] uppercase tracking-[0.35em] text-dahlia-red font-semibold mb-5 flex items-center gap-3"
              >
                <Zap size={12} className="text-dahlia-yellow" />
                The Dahlia League · S03 · Live now
                <span className="w-2 h-2 rounded-full bg-dahlia-red pulse-dot" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-7xl md:text-[11rem] uppercase leading-[0.82] tracking-tighter"
              >
                Where eating
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-stroke-red"
                >
                  becomes sport.
                </motion.span>
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="col-span-12 md:col-span-4 font-editorial italic text-xl text-dahlia-muted leading-snug"
            >
              <p className="border-l border-dahlia-red pl-5">
                A standalone universe of leaderboards, championships and prizes you&apos;ll instantly regret winning. Open to Oven regulars, Lab daylighters & anyone with a fork.
              </p>
            </motion.div>
          </motion.div>

          {/* Stat ribbon */}
          <div className="relative mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 border-y border-dahlia-border">
            {[
              { n: "1,247", l: "Active members", icon: Star },
              { n: "32", l: "Events this season", icon: Zap },
              { n: "€8.4K", l: "Prizes distributed", icon: Crown },
              { n: "6", l: "Countries represented", icon: Trophy },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                data-testid={`league-stat-${i}`}
                className={`py-8 md:py-10 px-4 md:px-6 ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 ? "border-r md:border-r" : ""} border-dahlia-border group hover:bg-dahlia-surface/50 transition-colors`}
              >
                <s.icon size={14} className="text-dahlia-red mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-display text-4xl md:text-6xl leading-none group-hover:text-dahlia-yellow transition-colors">{s.n}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted mt-3">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Season Progress */}
        <section className="px-6 md:px-12 lg:px-16 py-16 md:py-20 border-b border-dahlia-border" data-testid="league-season">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-2 flex items-center gap-2">
                  <Zap size={10} /> Season progress
                </div>
                <h3 className="font-display text-4xl md:text-5xl uppercase leading-none tracking-tighter">
                  Season 03 · December
                </h3>
              </div>
              <div className="text-right font-display">
                <div className="text-3xl md:text-4xl text-dahlia-yellow">18d</div>
                <div className="text-[10px] uppercase tracking-wider text-dahlia-muted">remaining</div>
              </div>
            </div>

            <div className="relative h-3 bg-dahlia-border overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "62%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-dahlia-red to-dahlia-yellow"
              />
              <div className="absolute inset-y-0 left-[25%] w-px bg-dahlia-text/30" />
              <div className="absolute inset-y-0 left-[50%] w-px bg-dahlia-text/30" />
              <div className="absolute inset-y-0 left-[75%] w-px bg-dahlia-text/30" />
            </div>

            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {[
                { tier: "Bronze", pts: "0", unlocked: true, reward: "Free espresso" },
                { tier: "Silver", pts: "200", unlocked: true, reward: "Priority booking" },
                { tier: "Gold", pts: "400", unlocked: false, reward: "Chef's table access" },
                { tier: "Diamond", pts: "600", unlocked: false, reward: "Private event invite" },
              ].map((t, i) => (
                <motion.div
                  key={t.tier}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  data-testid={`tier-${t.tier.toLowerCase()}`}
                  className={`border p-3 md:p-4 text-center transition-all duration-300 ${
                    t.unlocked
                      ? "border-dahlia-yellow/60 bg-dahlia-yellow/5"
                      : "border-dahlia-border opacity-60"
                  }`}
                >
                  <div className={`font-display text-lg md:text-xl uppercase ${t.unlocked ? "text-dahlia-yellow" : ""}`}>{t.tier}</div>
                  <div className="text-[9px] uppercase tracking-wider text-dahlia-muted mt-1">{t.pts} pts</div>
                  <div className="text-[10px] text-dahlia-muted mt-2 font-editorial italic">{t.reward}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Embedded community block (leaderboard + competitions) */}
        <Community />

        {/* Live Activity Feed */}
        <LiveFeed />

        {/* Hall of fame */}
        <section className="px-6 md:px-12 lg:px-16 py-20 md:py-28 bg-dahlia-surface" data-testid="hall-of-fame">
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[11px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-3 flex items-center gap-2"
              >
                <Crown size={12} /> Eternal glory
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tighter"
              >
                Hall of fame
              </motion.h2>
            </div>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={28} className="text-dahlia-yellow" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { title: "Largest pizza eaten in one sitting", who: "Marco \"Crustfather\" T.", val: "9 slices · 11 min", season: "S02", icon: "🍕" },
              { title: "Longest Negroni streak", who: "Giulia R.", val: "14 nights in a row", season: "S01", icon: "🥃" },
              { title: "Most languages sung at karaoke", who: "Lena K. + crew", val: "7 languages", season: "S02", icon: "🎤" },
            ].map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                data-testid={`hof-card-${i}`}
                className="border border-dahlia-border p-6 md:p-7 hover:border-dahlia-yellow hover:shadow-[0_8px_32px_rgba(255,192,30,0.1)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-500">{h.icon}</div>
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold flex items-center gap-2">
                    <Trophy size={10} /> {h.season}
                  </div>
                  <div className="font-display text-3xl uppercase leading-tight mt-3">{h.title}</div>
                  <div className="mt-5 pt-5 border-t border-dahlia-border">
                    <div className="text-sm text-dahlia-muted">{h.who}</div>
                    <div className="font-display text-2xl text-dahlia-red mt-2 group-hover:text-dahlia-yellow transition-colors">{h.val}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section className="px-6 md:px-12 lg:px-16 py-20 md:py-28 text-center relative overflow-hidden" data-testid="league-cta">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.03 }}
            viewport={{ once: true }}
            className="absolute inset-0 font-display text-[30vw] leading-none flex items-center justify-center pointer-events-none select-none"
          >
            🏆
          </motion.div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-5"
            >
              Free to join · 18+ · ID required for prizes
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl md:text-9xl uppercase leading-[0.85] tracking-tighter max-w-5xl mx-auto"
            >
              Sign up,
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-editorial italic font-medium normal-case tracking-normal"
              >
                show up,
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-stroke-red"
              >
                eat up.
              </motion.span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
            >
              <motion.button
                data-testid="league-join-btn"
                whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(255,59,34,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-dahlia-red text-white px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#ff5039] transition-all duration-300"
              >
                <Zap size={14} /> Join the League →
              </motion.button>
              <Link
                to="/oven"
                data-testid="league-cta-oven"
                className="text-xs uppercase tracking-[0.25em] border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red transition-colors"
              >
                See you Friday at .oven
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-dahlia-border px-6 md:px-12 lg:px-16 py-8 text-[10px] uppercase tracking-[0.3em] text-dahlia-muted flex flex-col md:flex-row justify-between gap-4">
        <span>© {new Date().getFullYear()} The Dahlia League · Milano · Crafted by <a href="#" data-testid="valtoris-credit-league" className="text-dahlia-red hover:text-dahlia-yellow transition-colors font-semibold">Valtoris</a></span>
        <span>Powered by hunger, hosted by Dahlia</span>
      </footer>

      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

const FEED_ITEMS = [
  { user: "Marco T.", action: "earned badge", detail: "Pizza Master 🍕", time: "2m ago", color: "var(--dahlia-yellow)" },
  { user: "Giulia R.", action: "climbed to", detail: "#3 on leaderboard", time: "5m ago", color: "var(--dahlia-red)" },
  { user: "Lena K.", action: "joined competition", detail: "Karaoke Clash", time: "12m ago", color: "var(--dahlia-pink)" },
  { user: "Stefano V.", action: "unlocked tier", detail: "Gold Status ⭐", time: "18m ago", color: "var(--dahlia-yellow)" },
  { user: "Emma O.", action: "completed challenge", detail: "3 Spritz Streak", time: "24m ago", color: "var(--dahlia-red)" },
  { user: "Alessandro P.", action: "earned XP", detail: "+150 points", time: "31m ago", color: "var(--dahlia-yellow)" },
  { user: "Chiara F.", action: "signed up for", detail: "Sunday Brunch Riot", time: "40m ago", color: "var(--dahlia-pink)" },
  { user: "Tomás G.", action: "reached", detail: "#7 on leaderboard", time: "1h ago", color: "var(--dahlia-red)" },
];

function LiveFeed() {
  const [visibleIdx, setVisibleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIdx((prev) => (prev + 1) % FEED_ITEMS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 md:px-12 lg:px-16 py-12 md:py-16 border-y border-dahlia-border" data-testid="live-feed">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Activity size={16} className="text-dahlia-red" />
          </motion.div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold">Live activity</span>
          <span className="w-2 h-2 rounded-full bg-dahlia-red pulse-dot" />
        </div>
        <span className="text-[10px] uppercase tracking-wider text-dahlia-muted">Real-time</span>
      </div>

      <div className="relative h-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={visibleIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 flex items-center gap-4"
          >
            <span className="font-display text-xl md:text-2xl uppercase">{FEED_ITEMS[visibleIdx].user}</span>
            <span className="text-sm text-dahlia-muted">{FEED_ITEMS[visibleIdx].action}</span>
            <span className="font-display text-lg md:text-xl uppercase" style={{ color: FEED_ITEMS[visibleIdx].color }}>
              {FEED_ITEMS[visibleIdx].detail}
            </span>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-dahlia-muted hidden md:block">
              {FEED_ITEMS[visibleIdx].time}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-1">
        {FEED_ITEMS.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 transition-colors duration-300 ${i === visibleIdx ? "bg-dahlia-red" : "bg-dahlia-border"}`}
          />
        ))}
      </div>
    </section>
  );
}
