import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart3, TrendingUp, Users, Clock, DollarSign, Pizza,
  Flame, AlertTriangle, ChefHat, ArrowUpRight, ArrowDownRight,
  Zap, Star, Calendar, ShoppingBag, Trophy
} from "lucide-react";

const HOURS = Array.from({ length: 7 }, (_, i) => `${18 + i}:00`);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const REVENUE_HEATMAP = {
  Mon: [120, 180, 220, 310, 280, 190, 80],
  Tue: [90, 140, 170, 240, 200, 150, 60],
  Wed: [150, 210, 290, 380, 340, 240, 110],
  Thu: [180, 260, 340, 450, 410, 300, 140],
  Fri: [320, 480, 620, 780, 720, 580, 280],
  Sat: [380, 540, 690, 860, 800, 640, 320],
  Sun: [290, 420, 520, 650, 590, 440, 210],
};

const TOP_ITEMS = [
  { name: "La Salsiccia", orders: 142, revenue: 1846, trend: 12, category: "gourmet" },
  { name: "Margherita", orders: 128, revenue: 1216, trend: 5, category: "classiche" },
  { name: "Spritz Dahlia", orders: 119, revenue: 1071, trend: 18, category: "cocktails" },
  { name: "Burrata & Crudo", orders: 97, revenue: 1552, trend: -3, category: "gourmet" },
  { name: "Prosecco (calice)", orders: 94, revenue: 564, trend: 8, category: "bevande" },
  { name: "La Zucchina", orders: 86, revenue: 1290, trend: 22, category: "gourmet" },
  { name: "Negroni Sbagliato", orders: 78, revenue: 780, trend: 15, category: "cocktails" },
  { name: "Soufflé cioccolato", orders: 65, revenue: 325, trend: 4, category: "dolci" },
];

const KPI = [
  { label: "Revenue (this week)", value: "€14,280", change: "+12%", up: true, icon: DollarSign },
  { label: "Avg spend / table", value: "€47.20", change: "+€3.10", up: true, icon: ShoppingBag },
  { label: "Covers served", value: "684", change: "+8%", up: true, icon: Users },
  { label: "Avg wait time", value: "11 min", change: "-2 min", up: true, icon: Clock },
  { label: "League members", value: "342", change: "+47 this week", up: true, icon: Trophy },
  { label: "Student visits", value: "58%", change: "+6%", up: true, icon: Star },
];

const STAFF_OPTIMIZER = [
  { slot: "Fri 18-20", current: 4, optimal: 3, savings: "€45/night", reason: "Low demand pre-20:00" },
  { slot: "Fri 20-22", current: 4, optimal: 5, savings: "-€45/night", reason: "Peak hour understaffed" },
  { slot: "Sat 20-22", current: 5, optimal: 6, savings: "-€45/night", reason: "Highest revenue window" },
  { slot: "Tue 18-22", current: 3, optimal: 2, savings: "€90/night", reason: "Quietest night — AI handles orders" },
  { slot: "Mon 19-22", current: 3, optimal: 2, savings: "€45/night", reason: "Dahlia Mondays = self-service heavy" },
];

const ALERTS = [
  { type: "warning", msg: "Mozzarella stock low — 12 portions left (avg 40/night Fri)", icon: AlertTriangle },
  { type: "info", msg: "Tuesday revenue down 15% vs last month — consider flash deal", icon: TrendingUp },
  { type: "success", msg: "La Zucchina trending +22% — consider featuring as special", icon: Flame },
  { type: "info", msg: "47 new League signups this week — referral engine working", icon: Trophy },
];

function heatColor(value, max) {
  const pct = value / max;
  if (pct > 0.8) return "bg-dahlia-red";
  if (pct > 0.6) return "bg-dahlia-red/70";
  if (pct > 0.4) return "bg-dahlia-yellow/60";
  if (pct > 0.2) return "bg-dahlia-yellow/30";
  return "bg-dahlia-border";
}

export default function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const maxRevenue = useMemo(() => Math.max(...Object.values(REVENUE_HEATMAP).flat()), []);

  return (
    <div className="bg-dahlia-bg text-dahlia-text font-body grain min-h-screen" data-testid="admin-dashboard">
      {/* Header */}
      <header className="border-b border-dahlia-border px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 size={20} className="text-dahlia-red" />
          <div>
            <div className="font-display text-xl uppercase tracking-wider">Dahlia Command Center</div>
            <div className="text-[10px] text-dahlia-muted uppercase tracking-wider">Owner dashboard · Demo mode</div>
          </div>
        </div>
        <Link to="/oven" className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted hover:text-dahlia-red transition-colors">
          ← Back to site
        </Link>
      </header>

      {/* Tabs */}
      <div className="border-b border-dahlia-border px-6 md:px-12 flex gap-0">
        {[
          { id: "overview", label: "Overview" },
          { id: "revenue", label: "Revenue" },
          { id: "menu", label: "Menu Intel" },
          { id: "staff", label: "Staff Optimizer" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            data-testid={`admin-tab-${t.id}`}
            className={`px-5 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold transition-all border-b-2 ${
              tab === t.id ? "text-dahlia-red border-dahlia-red" : "text-dahlia-muted border-transparent hover:text-dahlia-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <main className="px-6 md:px-12 py-8 max-w-7xl mx-auto">
        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div className="space-y-8">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" data-testid="kpi-grid">
              {KPI.map((k, i) => {
                const Icon = k.icon;
                return (
                  <motion.div
                    key={k.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border border-dahlia-border p-4"
                  >
                    <Icon size={14} className="text-dahlia-muted mb-2" />
                    <div className="font-display text-2xl leading-none">{k.value}</div>
                    <div className="text-[9px] text-dahlia-muted uppercase tracking-wider mt-1">{k.label}</div>
                    <div className={`text-[10px] mt-1.5 flex items-center gap-1 ${k.up ? "text-green-400" : "text-dahlia-red"}`}>
                      {k.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      {k.change}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Alerts */}
            <div className="space-y-2" data-testid="alerts">
              <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-muted font-bold mb-2 flex items-center gap-2">
                <Zap size={10} /> Smart alerts
              </div>
              {ALERTS.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className={`flex items-center gap-3 border p-3 text-sm ${
                      a.type === "warning" ? "border-dahlia-red/40 bg-dahlia-red/5" :
                      a.type === "success" ? "border-green-500/40 bg-green-900/10" :
                      "border-dahlia-border"
                    }`}
                  >
                    <Icon size={14} className={a.type === "warning" ? "text-dahlia-red" : a.type === "success" ? "text-green-400" : "text-dahlia-yellow"} />
                    <span className="text-dahlia-muted">{a.msg}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* REVENUE TAB */}
        {tab === "revenue" && (
          <div className="space-y-6">
            <div>
              <div className="font-display text-3xl uppercase mb-2">Revenue Heatmap</div>
              <div className="text-sm text-dahlia-muted">€ per hour slot · darker = higher revenue</div>
            </div>
            <div className="overflow-x-auto" data-testid="revenue-heatmap">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-left text-[9px] uppercase tracking-wider text-dahlia-muted p-2 w-16"></th>
                    {HOURS.map((h) => (
                      <th key={h} className="text-center text-[9px] uppercase tracking-wider text-dahlia-muted p-2">{h}</th>
                    ))}
                    <th className="text-right text-[9px] uppercase tracking-wider text-dahlia-muted p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map((d) => {
                    const row = REVENUE_HEATMAP[d] || [];
                    const total = row.reduce((s, v) => s + v, 0);
                    return (
                      <tr key={d}>
                        <td className="text-[10px] font-display uppercase text-dahlia-text p-2">{d}</td>
                        {row.map((v, i) => (
                          <td key={i} className="p-1">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.02 * (DAYS.indexOf(d) * 7 + i) }}
                              className={`h-10 flex items-center justify-center text-[10px] font-display ${heatColor(v, maxRevenue)}`}
                              title={`${d} ${HOURS[i]}: €${v}`}
                            >
                              €{v}
                            </motion.div>
                          </td>
                        ))}
                        <td className="text-right font-display text-sm text-dahlia-yellow p-2">€{total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MENU INTEL TAB */}
        {tab === "menu" && (
          <div className="space-y-6">
            <div>
              <div className="font-display text-3xl uppercase mb-2">Menu Intelligence</div>
              <div className="text-sm text-dahlia-muted">Top performers this week · sorted by orders</div>
            </div>
            <div className="space-y-2" data-testid="menu-intel">
              {TOP_ITEMS.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-12 gap-4 items-center border border-dahlia-border p-4 hover:border-dahlia-red/30 transition-colors"
                >
                  <div className="col-span-1 font-display text-2xl text-dahlia-muted">#{i + 1}</div>
                  <div className="col-span-4">
                    <div className="font-display text-lg uppercase">{item.name}</div>
                    <div className="text-[9px] uppercase tracking-wider text-dahlia-muted">{item.category}</div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="font-display text-xl">{item.orders}</div>
                    <div className="text-[9px] text-dahlia-muted">orders</div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="font-display text-xl text-dahlia-yellow">€{item.revenue}</div>
                    <div className="text-[9px] text-dahlia-muted">revenue</div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="h-2 bg-dahlia-border overflow-hidden">
                      <motion.div
                        className="h-full bg-dahlia-red"
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.orders / TOP_ITEMS[0].orders) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                      />
                    </div>
                  </div>
                  <div className={`col-span-1 text-right text-sm flex items-center justify-end gap-1 ${item.trend >= 0 ? "text-green-400" : "text-dahlia-red"}`}>
                    {item.trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(item.trend)}%
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* STAFF OPTIMIZER TAB */}
        {tab === "staff" && (
          <div className="space-y-6">
            <div>
              <div className="font-display text-3xl uppercase mb-2">Staff Optimizer</div>
              <div className="text-sm text-dahlia-muted">AI-suggested staffing adjustments based on demand patterns</div>
            </div>
            <div className="space-y-3" data-testid="staff-optimizer">
              {STAFF_OPTIMIZER.map((s, i) => {
                const saving = s.savings.startsWith("-");
                return (
                  <motion.div
                    key={s.slot}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`border p-5 grid grid-cols-12 gap-4 items-center ${
                      saving ? "border-dahlia-red/30 bg-dahlia-red/5" : "border-green-500/30 bg-green-900/5"
                    }`}
                  >
                    <div className="col-span-3">
                      <div className="font-display text-xl uppercase">{s.slot}</div>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="font-display text-2xl">{s.current}</div>
                      <div className="text-[9px] text-dahlia-muted">current</div>
                    </div>
                    <div className="col-span-1 text-center text-dahlia-muted">→</div>
                    <div className="col-span-2 text-center">
                      <div className={`font-display text-2xl ${saving ? "text-dahlia-red" : "text-green-400"}`}>{s.optimal}</div>
                      <div className="text-[9px] text-dahlia-muted">optimal</div>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className={`font-display text-lg ${saving ? "text-dahlia-red" : "text-green-400"}`}>{s.savings}</div>
                      <div className="text-[9px] text-dahlia-muted">{saving ? "invest" : "save"}</div>
                    </div>
                    <div className="col-span-2 text-right text-[11px] text-dahlia-muted">{s.reason}</div>
                  </motion.div>
                );
              })}
            </div>
            <div className="border border-dahlia-yellow/40 bg-dahlia-yellow/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-dahlia-yellow" />
                <div className="font-display text-xl uppercase">Net savings potential</div>
              </div>
              <div className="font-display text-4xl text-dahlia-yellow">€180/week</div>
              <div className="text-sm text-dahlia-muted mt-1">By shifting 2 staff from quiet slots to peak hours + letting AI handle low-demand periods</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
