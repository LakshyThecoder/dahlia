import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, Clock, Gift, Flame, Calendar, Users, Repeat, Share2, Trophy, ArrowUpRight, BarChart3,
} from "lucide-react";

const AUTOMATIONS = [
  {
    icon: Clock,
    title: "Dead Hour Flash Deals",
    desc: "Tuesday 18–19? Auto-push: \"20% off all pizzas — tonight only.\" Fills empty seats without staff lifting a finger.",
    trigger: "Triggered when: occupancy < 30% on weeknight",
    color: "var(--dahlia-red)",
    tag: "Revenue recovery",
  },
  {
    icon: Calendar,
    title: "Birthday Auto-Reward",
    desc: "League members get a free Margherita during birthday week. Email sent automatically, code auto-generated.",
    trigger: "Triggered when: member birthday within 7 days",
    color: "var(--dahlia-pink)",
    tag: "Retention",
  },
  {
    icon: Flame,
    title: "Streak Bonus",
    desc: "Visit 3 weeks in a row → free drink. Visit 6 → free pizza. The app tracks it — you just serve.",
    trigger: "Triggered when: 3+ consecutive weekly visits",
    color: "var(--dahlia-yellow)",
    tag: "Habit building",
  },
  {
    icon: Share2,
    title: "Referral Chain",
    desc: "Every referral code used = 50 XP for the referrer + 10% off for the friend. Chains of 5+ unlock a secret menu item.",
    trigger: "Triggered when: referral code redeemed",
    color: "var(--dahlia-red)",
    tag: "Growth engine",
  },
  {
    icon: Users,
    title: "Squad Multiplier",
    desc: "Groups of 4+ on a weeknight? Auto-apply 15% off + double XP. Incentivizes big tables on quiet nights.",
    trigger: "Triggered when: group size ≥ 4 on Mon–Wed",
    color: "var(--dahlia-yellow)",
    tag: "Table fill",
  },
  {
    icon: Repeat,
    title: "Win-Back Campaign",
    desc: "Haven't visited in 30 days? Auto-email: \"We miss you — here's 15% off your next visit.\" Zero manual effort.",
    trigger: "Triggered when: no visit in 30+ days",
    color: "var(--dahlia-pink)",
    tag: "Re-engagement",
  },
];

const IMPACT = [
  { label: "Avg visits / member / month", before: "1.8", after: "2.9", delta: "+61%" },
  { label: "Referral conversion rate", before: "3%", after: "14%", delta: "+367%" },
  { label: "Tue/Wed revenue", before: "€680", after: "€1,120", delta: "+65%" },
  { label: "Staff hours on promos", before: "6h/week", after: "0h/week", delta: "-100%" },
];

export default function LoyaltyEngine() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-dahlia-surface" data-testid="loyalty-engine">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-dahlia-red font-bold mb-3 flex items-center gap-2">
            <Zap size={10} /> Automated loyalty
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter">
            Rewards <span className="font-editorial italic font-medium normal-case tracking-normal">that run</span>
            <br />themselves.
          </h2>
        </div>
        <p className="font-editorial italic text-lg text-dahlia-muted max-w-sm">
          Six automations. Zero staff needed. The system rewards your best customers while you focus on the kitchen.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {AUTOMATIONS.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              data-testid={`automation-${a.title.replace(/\s/g, "-").toLowerCase()}`}
              className="border border-dahlia-border p-6 group hover:border-dahlia-red/40 hover:bg-dahlia-bg/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={20} style={{ color: a.color }} className="group-hover:scale-110 transition-transform" />
                <span className="text-[7px] uppercase tracking-[0.25em] border border-dahlia-border text-dahlia-muted px-2 py-0.5 group-hover:border-dahlia-red/40">
                  {a.tag}
                </span>
              </div>
              <div className="font-display text-xl uppercase tracking-wider mb-2">{a.title}</div>
              <div className="text-sm text-dahlia-muted leading-relaxed mb-3">{a.desc}</div>
              <div className="text-[9px] text-dahlia-muted/60 uppercase tracking-wider border-t border-dahlia-border pt-2">{a.trigger}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Impact comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="border border-dahlia-border p-6 md:p-8"
        data-testid="loyalty-impact"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-yellow font-bold mb-6 flex items-center gap-2">
          <Trophy size={10} /> Projected impact (based on 340 League members)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {IMPACT.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="text-center"
            >
              <div className="text-[10px] text-dahlia-muted uppercase tracking-wider mb-3">{item.label}</div>
              <div className="flex items-center justify-center gap-4">
                <div>
                  <div className="text-dahlia-muted line-through text-sm">{item.before}</div>
                </div>
                <div className="text-dahlia-muted">→</div>
                <div>
                  <div className="font-display text-2xl text-dahlia-text">{item.after}</div>
                </div>
              </div>
              <div className="text-sm text-green-400 font-bold mt-1">{item.delta}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col md:flex-row gap-3"
      >
        <Link
          to="/community"
          data-testid="loyalty-join-cta"
          className="inline-flex items-center justify-center gap-2 bg-dahlia-red text-white px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-2px] transition-all"
        >
          Join the League <ArrowUpRight size={14} />
        </Link>
        <Link
          to="/admin"
          data-testid="loyalty-admin-cta"
          className="inline-flex items-center justify-center gap-2 border border-dahlia-border text-dahlia-muted px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:border-dahlia-red hover:text-dahlia-red transition-all"
        >
          View owner dashboard <BarChart3 size={14} />
        </Link>
      </motion.div>
    </section>
  );
}

