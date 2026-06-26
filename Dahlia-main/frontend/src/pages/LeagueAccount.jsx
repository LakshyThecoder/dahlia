import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, Zap, Star, Crown, Medal, Target, Flame, Gift, ChevronRight, Lock, Check, Calendar, MapPin, Users, TrendingUp, Award, Sparkles } from "lucide-react";

const DEMO_USER = {
  name: "Marco T.",
  handle: "@crustfather",
  uni: "Politecnico di Milano",
  tier: "Gold",
  xp: 487,
  xpNext: 600,
  rank: 1,
  season: "S03",
  memberSince: "Sep 2024",
  visits: 34,
  streak: 7,
  totalSpent: "€612",
};

const BADGES = [
  { name: "Pizza Master", icon: "🍕", earned: true, rarity: "Legendary", desc: "Eat 20 different pizzas", date: "Nov 2024" },
  { name: "Negroni Knight", icon: "🥃", earned: true, rarity: "Epic", desc: "Order 10 Negroni Sbagliato", date: "Oct 2024" },
  { name: "First Timer", icon: "⭐", earned: true, rarity: "Common", desc: "Complete your first visit", date: "Sep 2024" },
  { name: "Spritz Streak", icon: "🍹", earned: true, rarity: "Rare", desc: "Order Spritz 3 visits in a row", date: "Dec 2024" },
  { name: "Karaoke Beast", icon: "🎤", earned: true, rarity: "Epic", desc: "Sing at 5 karaoke nights", date: "Nov 2024" },
  { name: "Group Leader", icon: "👥", earned: true, rarity: "Rare", desc: "Bring a group of 6+", date: "Oct 2024" },
  { name: "Weekend Warrior", icon: "🔥", earned: true, rarity: "Common", desc: "Visit every weekend for a month", date: "Dec 2024" },
  { name: "The Closer", icon: "🌙", earned: true, rarity: "Rare", desc: "Be last to leave 3 times", date: "Nov 2024" },
  { name: "Diamond Diner", icon: "💎", earned: false, rarity: "Legendary", desc: "Reach Diamond tier", date: null },
  { name: "Menu Explorer", icon: "📖", earned: false, rarity: "Epic", desc: "Try every item on the menu", date: null },
  { name: "Chef's Friend", icon: "👨‍🍳", earned: false, rarity: "Legendary", desc: "Get personally recommended by the chef", date: null },
  { name: "100 Club", icon: "💯", earned: false, rarity: "Epic", desc: "Visit 100 times", date: null },
];

const ACTIVE_COMPS = [
  { name: "Karaoke Clash · December", spots: "12/20", progress: 60, prize: "Free dinner for 2", status: "joined", ends: "Dec 31" },
  { name: "Pizza Speed Run", spots: "8/15", progress: 53, prize: "€50 credit", status: "joined", ends: "Dec 28" },
  { name: "Spritz Marathon", spots: "18/25", progress: 72, prize: "Private event pass", status: "available", ends: "Jan 5" },
];

const ORDER_HISTORY = [
  { date: "Dec 20", items: ["La Salsiccia", "Chianti", "Soufflé al cioccolato"], total: "€24", xpEarned: 24 },
  { date: "Dec 14", items: ["Burrata & Crudo", "Prosecco", "Polpette al sugo"], total: "€27", xpEarned: 27 },
  { date: "Dec 7", items: ["Margherita", "Spritz Dahlia", "Negroni Sbagliato"], total: "€28.50", xpEarned: 29 },
  { date: "Nov 30", items: ["La Zucchina", "Falanghina", "Babà"], total: "€26", xpEarned: 26 },
  { date: "Nov 23", items: ["Diavola", "Neropasso", "Panna cotta"], total: "€21", xpEarned: 21 },
];

const TIERS = [
  { name: "Bronze", pts: 0, color: "#CD7F32", unlocked: true },
  { name: "Silver", pts: 200, color: "#C0C0C0", unlocked: true },
  { name: "Gold", pts: 400, color: "#FFC01E", unlocked: true },
  { name: "Diamond", pts: 600, color: "#B9F2FF", unlocked: false },
];

const RARITY_COLORS = {
  Legendary: "text-dahlia-yellow border-dahlia-yellow/50 bg-dahlia-yellow/5",
  Epic: "text-dahlia-pink border-dahlia-pink/50 bg-dahlia-pink/5",
  Rare: "text-dahlia-red border-dahlia-red/50 bg-dahlia-red/5",
  Common: "text-dahlia-text border-dahlia-border bg-dahlia-surface",
};

export default function LeagueAccount() {
  const [tab, setTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "badges", label: "Badges" },
    { id: "competitions", label: "Competitions" },
    { id: "history", label: "History" },
    { id: "rewards", label: "Rewards" },
  ];

  return (
    <div className="min-h-screen bg-dahlia-bg text-dahlia-text font-body grain" data-testid="league-account-page">
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
          <Link to="/community" data-testid="account-back" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] hover:text-dahlia-red transition-colors">
            <ArrowLeft size={14} /> Back to League
          </Link>
          <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-muted">Demo Account</div>
        </div>
      </header>

      <main className="px-6 md:px-12 lg:px-16">
        {/* Profile header */}
        <section className="py-10 md:py-14 border-b border-dahlia-border" data-testid="account-profile">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-dahlia-yellow/20 to-dahlia-red/20 border-2 border-dahlia-yellow flex items-center justify-center flex-shrink-0"
            >
              <span className="text-5xl">👑</span>
            </motion.div>

            <div className="flex-1">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tighter">{DEMO_USER.name}</h1>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 border border-dahlia-yellow/60 text-dahlia-yellow bg-dahlia-yellow/5 font-bold">{DEMO_USER.tier}</span>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 border border-dahlia-red/60 text-dahlia-red">#{DEMO_USER.rank}</span>
                </div>
                <div className="text-sm text-dahlia-muted mt-2">{DEMO_USER.handle} · {DEMO_USER.uni}</div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-dahlia-muted">XP Progress</span>
                  <span className="text-[10px] uppercase tracking-wider text-dahlia-yellow font-bold">{DEMO_USER.xp}/{DEMO_USER.xpNext} XP</span>
                </div>
                <div className="relative h-3 bg-dahlia-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(DEMO_USER.xp / DEMO_USER.xpNext) * 100}%` }}
                    transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-dahlia-yellow to-dahlia-red"
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  {TIERS.map((t) => (
                    <span key={t.name} className="text-[9px] uppercase tracking-wider" style={{ color: t.unlocked ? t.color : "var(--dahlia-muted)" }}>{t.name}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {[
                  { icon: Flame, label: "Streak", value: `${DEMO_USER.streak} weeks` },
                  { icon: MapPin, label: "Visits", value: DEMO_USER.visits },
                  { icon: Calendar, label: "Member since", value: DEMO_USER.memberSince },
                  { icon: TrendingUp, label: "Total spent", value: DEMO_USER.totalSpent },
                ].map((s, i) => (
                  <div key={i} className="border border-dahlia-border p-3 group hover:border-dahlia-red/50 transition-colors">
                    <s.icon size={12} className="text-dahlia-red mb-2" />
                    <div className="font-display text-xl uppercase">{s.value}</div>
                    <div className="text-[9px] uppercase tracking-wider text-dahlia-muted">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-dahlia-border overflow-x-auto scrollbar-thin mt-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              data-testid={`account-tab-${t.id}`}
              className={`px-5 py-4 text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-all ${tab === t.id ? "text-dahlia-red border-b-2 border-dahlia-red bg-dahlia-red/5" : "text-dahlia-muted hover:text-dahlia-text"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="py-10 md:py-14">

            {tab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-dahlia-border p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-4 flex items-center gap-2"><Flame size={10} /> Current streak</div>
                  <div className="font-display text-6xl text-dahlia-yellow">{DEMO_USER.streak}</div>
                  <div className="text-sm text-dahlia-muted mt-2">consecutive weekends. Keep it going to unlock <span className="text-dahlia-text">Streak Master</span> badge!</div>
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className={`h-2 flex-1 ${i < DEMO_USER.streak ? "bg-dahlia-yellow" : "bg-dahlia-border"}`} />
                    ))}
                  </div>
                </div>

                <div className="border border-dahlia-border p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-4 flex items-center gap-2"><Trophy size={10} /> Season standing</div>
                  <div className="font-display text-6xl">#{DEMO_USER.rank}</div>
                  <div className="text-sm text-dahlia-muted mt-2">Season {DEMO_USER.season} · 18 days remaining</div>
                  <div className="mt-4 flex items-center gap-3 text-[11px]">
                    <span className="text-dahlia-yellow">+42 pts ahead of #2</span>
                    <span className="text-dahlia-muted">·</span>
                    <span className="text-dahlia-muted">113 pts to Diamond</span>
                  </div>
                </div>

                <div className="border border-dahlia-border p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-4 flex items-center gap-2"><Award size={10} /> Recent badges</div>
                  <div className="flex gap-3">
                    {BADGES.filter((b) => b.earned).slice(0, 4).map((b, i) => (
                      <div key={i} className={`w-14 h-14 border flex items-center justify-center text-2xl ${RARITY_COLORS[b.rarity]}`} title={b.name}>
                        {b.icon}
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-dahlia-muted mt-3">{BADGES.filter((b) => b.earned).length}/{BADGES.length} badges collected</div>
                </div>

                <div className="border border-dahlia-border p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-4 flex items-center gap-2"><Target size={10} /> Active competitions</div>
                  {ACTIVE_COMPS.filter((c) => c.status === "joined").map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-dahlia-border last:border-0">
                      <span className="text-sm">{c.name}</span>
                      <span className="text-[10px] text-dahlia-yellow font-bold">{c.spots}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "badges" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {BADGES.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    data-testid={`badge-${b.name.replace(/\s/g, "-").toLowerCase()}`}
                    className={`border p-5 text-center relative overflow-hidden transition-all duration-300 ${b.earned ? RARITY_COLORS[b.rarity] + " hover:translate-y-[-4px]" : "border-dahlia-border opacity-50 grayscale"}`}
                  >
                    {!b.earned && <Lock size={12} className="absolute top-3 right-3 text-dahlia-muted" />}
                    <div className="text-4xl mb-3">{b.icon}</div>
                    <div className="font-display text-sm uppercase tracking-wider">{b.name}</div>
                    <div className="text-[9px] uppercase tracking-wider mt-1 opacity-70">{b.rarity}</div>
                    <div className="text-[10px] text-dahlia-muted mt-2">{b.desc}</div>
                    {b.date && <div className="text-[9px] text-dahlia-muted mt-2 flex items-center justify-center gap-1"><Check size={8} /> {b.date}</div>}
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "competitions" && (
              <div className="space-y-4">
                {ACTIVE_COMPS.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    data-testid={`comp-${i}`}
                    className="border border-dahlia-border p-6 hover:border-dahlia-red/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-display text-2xl uppercase">{c.name}</div>
                        <div className="text-[10px] text-dahlia-muted uppercase tracking-wider mt-1">Ends {c.ends} · {c.spots} spots filled</div>
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider px-3 py-1.5 border font-bold ${c.status === "joined" ? "border-dahlia-yellow/60 text-dahlia-yellow bg-dahlia-yellow/5" : "border-dahlia-red/60 text-dahlia-red"}`}>
                        {c.status === "joined" ? "Joined" : "Join now"}
                      </span>
                    </div>
                    <div className="relative h-2 bg-dahlia-border overflow-hidden mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.progress}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                        className={`absolute inset-y-0 left-0 ${c.progress > 70 ? "bg-dahlia-red" : "bg-dahlia-yellow"}`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift size={12} className="text-dahlia-yellow" />
                      <span className="text-[11px] text-dahlia-yellow">{c.prize}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "history" && (
              <div className="space-y-3">
                {ORDER_HISTORY.map((o, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    data-testid={`history-${i}`}
                    className="border border-dahlia-border p-5 flex items-center gap-6 hover:bg-dahlia-surface/50 transition-colors"
                  >
                    <div className="text-center flex-shrink-0 w-16">
                      <div className="font-display text-lg uppercase">{o.date}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{o.items.join(" · ")}</div>
                      <div className="text-[10px] text-dahlia-muted mt-1">{o.items.length} items</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-display text-xl text-dahlia-red">{o.total}</div>
                      <div className="text-[10px] text-dahlia-yellow">+{o.xpEarned} XP</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "rewards" && (
              <div className="space-y-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-4">Your tier perks</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { perk: "Free espresso every visit", unlocked: true, tier: "Bronze" },
                      { perk: "Priority booking on weekends", unlocked: true, tier: "Silver" },
                      { perk: "Chef's table access once/month", unlocked: true, tier: "Gold" },
                      { perk: "10% off total bill", unlocked: true, tier: "Gold" },
                      { perk: "Private event invitations", unlocked: false, tier: "Diamond" },
                      { perk: "Personalized menu from the chef", unlocked: false, tier: "Diamond" },
                      { perk: "Free bottle on birthday", unlocked: false, tier: "Diamond" },
                      { perk: "VIP area access at all events", unlocked: false, tier: "Diamond" },
                    ].map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`border p-4 flex items-center gap-3 ${r.unlocked ? "border-dahlia-yellow/40 bg-dahlia-yellow/5" : "border-dahlia-border opacity-50"}`}
                      >
                        {r.unlocked ? <Check size={14} className="text-dahlia-yellow flex-shrink-0" /> : <Lock size={14} className="text-dahlia-muted flex-shrink-0" />}
                        <div>
                          <div className="text-sm">{r.perk}</div>
                          <div className="text-[9px] uppercase tracking-wider text-dahlia-muted">{r.tier} tier</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-4">Redeemable rewards</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { name: "Free Dessert", cost: 50, icon: "🍰" },
                      { name: "Free Cocktail", cost: 80, icon: "🍸" },
                      { name: "Free Pizza", cost: 120, icon: "🍕" },
                    ].map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="border border-dahlia-border p-5 text-center hover:border-dahlia-yellow transition-colors group"
                      >
                        <div className="text-3xl mb-3">{r.icon}</div>
                        <div className="font-display text-lg uppercase">{r.name}</div>
                        <div className="text-[10px] text-dahlia-muted mt-1">{r.cost} XP</div>
                        <button className="mt-3 text-[10px] uppercase tracking-wider px-4 py-2 bg-dahlia-yellow text-dahlia-bg font-bold hover:translate-y-[-2px] transition-transform" data-testid={`redeem-${i}`}>
                          {DEMO_USER.xp >= r.cost ? "Redeem" : `Need ${r.cost - DEMO_USER.xp} more XP`}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-dahlia-border px-6 md:px-12 lg:px-16 py-8 text-[10px] uppercase tracking-[0.3em] text-dahlia-muted flex flex-col md:flex-row justify-between gap-4">
        <span>Demo account · Not real user data</span>
        <span>The Dahlia League · Milano</span>
      </footer>
    </div>
  );
}
