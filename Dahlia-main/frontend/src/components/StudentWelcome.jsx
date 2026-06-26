import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Trophy, Percent, Gift, ArrowUpRight, Calculator } from "lucide-react";

const UNIS = [
  { name: "Politecnico di Milano", students: "47K", emoji: "🏛️" },
  { name: "Università Statale", students: "62K", emoji: "📚" },
  { name: "Bocconi", students: "15K", emoji: "💼" },
  { name: "Cattolica", students: "42K", emoji: "⛪" },
  { name: "NABA / Domus", students: "5K", emoji: "🎨" },
  { name: "Erasmus & Exchange", students: "1.7K+", emoji: "🌍" },
];

const DEALS = [
  { people: 1, discount: "10%", label: "Solo student", note: "Show your student ID" },
  { people: 2, discount: "10%", label: "Study buddy", note: "Both need student ID" },
  { people: 4, discount: "15%", label: "Squad dinner", note: "The sweet spot" },
  { people: 6, discount: "20%", label: "Full table", note: "Best deal. Book ahead." },
  { people: 8, discount: "25%", label: "Party mode", note: "DM us on IG for 8+" },
];

export default function StudentWelcome() {
  const [groupSize, setGroupSize] = useState(1);
  const currentDeal = DEALS.reduce((best, d) => (groupSize >= d.people ? d : best), DEALS[0]);

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-dahlia-bg relative overflow-hidden" data-testid="student-welcome">
      <div className="absolute top-8 right-8 font-script text-[140px] md:text-[200px] text-dahlia-yellow/[0.04] leading-none select-none pointer-events-none" aria-hidden>
        Benvenuti!
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap size={18} className="text-dahlia-yellow" />
          <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold">New in Milano?</div>
        </div>
        <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter">
          Welcome <span className="font-editorial italic font-medium normal-case tracking-normal">to</span> your
          <br />
          <span className="text-dahlia-red">new</span> favourite spot.
        </h2>
        <p className="font-editorial italic text-lg text-dahlia-muted mt-4 max-w-lg">
          Just landed for Erasmus? Polimi veteran? Doesn't matter — if you're a student in Milano, this is where you eat. Best pizza, best price, zero pretension.
        </p>
      </motion.div>

      {/* HERO DEAL BANNER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-10 mb-12 border-2 border-dahlia-red bg-dahlia-red/5 p-6 md:p-8 relative overflow-hidden"
        data-testid="pizza-beer-deal"
      >
        <div className="absolute -right-4 -top-4 font-script text-[120px] md:text-[160px] text-dahlia-red/[0.07] leading-none select-none pointer-events-none rotate-[-8deg]" aria-hidden>
          €10
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-3 flex items-center gap-2">
              <Percent size={10} /> Student special
            </div>
            <div className="font-display text-5xl md:text-6xl uppercase leading-[0.9] tracking-tighter">
              🍕 + 🍺 = <span className="text-dahlia-red">€10</span>
            </div>
            <div className="text-dahlia-muted mt-3 text-sm max-w-md leading-relaxed">
              Any classic pizza + any draft beer. That's it. That's the deal. Flash your student ID at checkout. Every day, all night.
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="text-center border border-dahlia-border px-4 py-3">
                <div className="font-display text-2xl line-through text-dahlia-muted">€15.50</div>
                <div className="text-[8px] text-dahlia-muted uppercase tracking-wider">Normal price</div>
              </div>
              <div className="text-dahlia-muted text-xl">→</div>
              <div className="text-center border-2 border-dahlia-red bg-dahlia-red/10 px-4 py-3">
                <div className="font-display text-3xl text-dahlia-red">€10</div>
                <div className="text-[8px] text-dahlia-red uppercase tracking-wider font-bold">Student deal</div>
              </div>
            </div>
            <div className="text-[9px] text-dahlia-muted/70 uppercase tracking-wider">
              Save €5.50 per combo · valid with student ID
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Group Deal Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 border border-dahlia-border p-6 md:p-8"
          data-testid="group-calculator"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calculator size={14} className="text-dahlia-red" />
            <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold">Group deal calculator</div>
          </div>
          <div className="font-display text-3xl uppercase mb-6">How many are you?</div>

          <div className="flex items-center gap-3 mb-6">
            {[1, 2, 4, 6, 8].map((n) => (
              <button
                key={n}
                onClick={() => setGroupSize(n)}
                data-testid={`group-size-${n}`}
                className={`w-12 h-12 border font-display text-xl transition-all ${
                  groupSize === n
                    ? "bg-dahlia-red border-dahlia-red text-white scale-110"
                    : "border-dahlia-border text-dahlia-muted hover:border-dahlia-red"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <motion.div
            key={currentDeal.discount}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-dahlia-yellow/40 bg-dahlia-yellow/5 p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-display text-4xl text-dahlia-yellow">{currentDeal.discount}</div>
              <div className="text-[10px] uppercase tracking-wider text-dahlia-yellow border border-dahlia-yellow/40 px-2 py-1">
                {currentDeal.label}
              </div>
            </div>
            <div className="text-sm text-dahlia-muted">{currentDeal.note}</div>
            <div className="mt-3 text-[10px] text-dahlia-muted">
              Example: {groupSize} × Margherita (€9.50) + {groupSize} × Prosecco (€6) = <span className="text-dahlia-yellow font-bold">€{((9.5 + 6) * groupSize * (1 - parseInt(currentDeal.discount) / 100)).toFixed(2)}</span>
            </div>
          </motion.div>

          <Link
            to="/menu"
            data-testid="student-menu-cta"
            className="mt-5 inline-flex items-center gap-2 bg-dahlia-red text-white px-5 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold hover:translate-y-[-2px] transition-all w-full justify-center"
          >
            Browse menu with student prices <ArrowUpRight size={12} />
          </Link>
        </motion.div>

        {/* Right column: uni badges + perks */}
        <div className="lg:col-span-7 space-y-6">
          {/* Uni badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-dahlia-border p-6"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-muted font-bold mb-4 flex items-center gap-2">
              <Users size={10} /> Your uni, your crew
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {UNIS.map((u) => (
                <div
                  key={u.name}
                  className="border border-dahlia-border p-3 hover:border-dahlia-yellow/50 hover:bg-dahlia-yellow/5 transition-all group"
                >
                  <div className="text-xl mb-1">{u.emoji}</div>
                  <div className="text-[11px] font-display uppercase tracking-wider">{u.name}</div>
                  <div className="text-[9px] text-dahlia-muted mt-0.5">{u.students} students</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Student perks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {[
              { icon: Percent, title: "Student ID = Discount", desc: "Flash your tessera at checkout. No apps, no codes.", color: "var(--dahlia-red)" },
              { icon: Trophy, title: "+100 XP First Visit", desc: "Join the League on your first night. Start with a boost.", color: "var(--dahlia-yellow)" },
              { icon: Gift, title: "Birthday = Free Pizza", desc: "Show your ID on your birthday week. A Margherita is on us.", color: "var(--dahlia-pink)" },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="border border-dahlia-border p-5 group hover:border-dahlia-red/40 transition-all">
                  <Icon size={18} style={{ color: p.color }} className="mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-display text-base uppercase tracking-wider">{p.title}</div>
                  <div className="text-[11px] text-dahlia-muted mt-1.5 leading-relaxed">{p.desc}</div>
                </div>
              );
            })}
          </motion.div>

          {/* League CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/community"
              data-testid="student-league-cta"
              className="block border border-dahlia-yellow/40 bg-dahlia-yellow/5 p-5 group hover:bg-dahlia-yellow/10 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy size={20} className="text-dahlia-yellow" />
                  <div>
                    <div className="font-display text-xl uppercase">Join the Dahlia League</div>
                    <div className="text-[11px] text-dahlia-muted mt-0.5">Eat, compete, earn badges. Your squad climbs the leaderboard together.</div>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-dahlia-yellow group-hover:rotate-45 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
