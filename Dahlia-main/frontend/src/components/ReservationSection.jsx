import { useState, useMemo } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, TrendingUp, Zap } from "lucide-react";

const TIMES = ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
const DEMAND = { "18:30": 30, "19:00": 55, "19:30": 72, "20:00": 93, "20:30": 88, "21:00": 65, "21:30": 45, "22:00": 28 };
const WAIT_MINS = { "18:30": 0, "19:00": 0, "19:30": 5, "20:00": 18, "20:30": 12, "21:00": 5, "21:30": 0, "22:00": 0 };
const CAPACITY = 52;
const SIZES = ["2", "3", "4", "5", "6", "7", "8+"];

function getDemandColor(pct) {
  if (pct >= 85) return { bg: "bg-dahlia-red/20", border: "border-dahlia-red/60", text: "text-dahlia-red", dot: "bg-dahlia-red", label: "Busy" };
  if (pct >= 55) return { bg: "bg-dahlia-yellow/15", border: "border-dahlia-yellow/50", text: "text-dahlia-yellow", dot: "bg-dahlia-yellow", label: "Filling" };
  return { bg: "bg-green-900/20", border: "border-green-500/40", text: "text-green-400", dot: "bg-green-400", label: "Open" };
}

export default function ReservationSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "20:00",
    guests: "2",
    requests: "",
  });
  const [loading, setLoading] = useState(false);

  const demand = DEMAND[form.time] || 50;
  const demandStyle = getDemandColor(demand);
  const waitMin = WAIT_MINS[form.time] || 0;
  const seatsLeft = Math.max(2, Math.round(CAPACITY * (1 - demand / 100)));
  const smartHint = useMemo(() => {
    if (demand >= 85) {
      const alt = TIMES.find((t) => (DEMAND[t] || 0) < 60 && t > form.time);
      return alt ? `${form.time} is almost full — try ${alt} for a shorter wait` : null;
    }
    return null;
  }, [form.time, demand]);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) {
      toast.error("Per favore — name, email and date please.", {
        description: "We need the basics to save your spot.",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Table booked! See you at the party.", {
        description: `${form.guests} guests · ${form.date} · ${form.time}${waitMin > 0 ? ` · ~${waitMin}min wait` : ""}. Ciao, ${form.name}!`,
      });
      setForm({ name: "", email: "", phone: "", date: "", time: "20:00", guests: "2", requests: "" });
    }, 900);
  };

  return (
    <section
      id="reserve"
      data-testid="reservation-section"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-dahlia-bg overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left side editorial */}
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4">
            05 — Prenotazione
          </div>
          <h2
            data-testid="reserve-heading"
            className="font-display text-6xl md:text-8xl uppercase leading-[0.9] tracking-tighter"
          >
            Save your
            <br />
            <span className="text-stroke-red">seat at</span>
            <br />
            the riot.
          </h2>
          <p className="font-editorial italic text-xl text-dahlia-muted mt-8 max-w-md">
            Tables fill faster than the dancefloor. Book ahead — bring your friends, your bad jokes, your hunger.
          </p>

          <ul className="mt-10 space-y-3 text-sm text-dahlia-muted">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-dahlia-red" />
              Confirmation in your inbox within 5 minutes.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-dahlia-yellow" />
              Free cancellation up to 2 hours before.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-dahlia-pink" />
              Groups of 8+ — DM us on Instagram.
            </li>
          </ul>

          {/* Live Capacity */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 border border-dahlia-border p-4"
            data-testid="capacity-bar"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted flex items-center gap-1.5">
                <TrendingUp size={10} className="text-dahlia-red" /> Tonight's capacity
              </div>
              <div className={`text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 ${demandStyle.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${demandStyle.dot} animate-pulse`} />
                {demand}% full · {seatsLeft} seats left
              </div>
            </div>
            <div className="h-2 bg-dahlia-border overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 via-dahlia-yellow to-dahlia-red"
                initial={{ width: 0 }}
                whileInView={{ width: `${demand}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          onSubmit={submit}
          data-testid="reservation-form"
          className="lg:col-span-7 border border-dahlia-border p-8 md:p-12 relative"
        >
          {/* Floating sticker */}
          <div
            className="absolute -top-5 right-6 md:right-10 rotate-3 float-slow"
            style={{ "--r": "3deg" }}
          >
            <div className="bg-dahlia-yellow text-dahlia-bg px-3 py-1 font-script text-2xl shadow-[4px_4px_0_0_#FF3B22]">
              Ti aspettiamo
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field icon={User} label="Your name" required>
              <input
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder="Giulia Rossi"
                data-testid="reserve-input-name"
                className="bg-transparent w-full text-lg text-dahlia-text placeholder:text-dahlia-muted/60 focus:outline-none"
              />
            </Field>
            <Field icon={Mail} label="Email" required>
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="ciao@dahlia.it"
                data-testid="reserve-input-email"
                className="bg-transparent w-full text-lg text-dahlia-text placeholder:text-dahlia-muted/60 focus:outline-none"
              />
            </Field>
            <Field icon={Phone} label="Phone (optional)">
              <input
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                placeholder="+39 ..."
                data-testid="reserve-input-phone"
                className="bg-transparent w-full text-lg text-dahlia-text placeholder:text-dahlia-muted/60 focus:outline-none"
              />
            </Field>
            <Field icon={Calendar} label="Date" required>
              <input
                type="date"
                value={form.date}
                onChange={update("date")}
                data-testid="reserve-input-date"
                className="bg-transparent w-full text-lg text-dahlia-text placeholder:text-dahlia-muted/60 focus:outline-none [color-scheme:dark]"
              />
            </Field>
            <div className="col-span-1 md:col-span-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted flex items-center gap-2 mb-3">
                <Clock size={12} /> Pick a time
              </span>
              <div className="grid grid-cols-4 gap-2">
                {TIMES.map((t) => {
                  const d = DEMAND[t] || 50;
                  const s = getDemandColor(d);
                  const active = form.time === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, time: t })}
                      data-testid={`reserve-time-${t}`}
                      className={`py-2.5 text-center border transition-all text-sm ${active ? "bg-dahlia-red border-dahlia-red text-white" : `${s.bg} ${s.border} ${s.text} hover:border-dahlia-red`}`}
                    >
                      {t}
                      <div className={`text-[7px] uppercase tracking-wider mt-0.5 ${active ? "text-white/70" : ""}`}>{s.label}</div>
                    </button>
                  );
                })}
              </div>
              {waitMin > 0 && (
                <motion.div
                  key={form.time}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-[11px] text-dahlia-yellow flex items-center gap-1.5"
                  data-testid="wait-estimate"
                >
                  <Zap size={10} /> ~{waitMin} min estimated wait at {form.time}
                </motion.div>
              )}
              {smartHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-[11px] text-dahlia-pink"
                  data-testid="smart-hint"
                >
                  💡 {smartHint}
                </motion.div>
              )}
            </div>
            <Field icon={Users} label="Guests">
              <select
                value={form.guests}
                onChange={update("guests")}
                data-testid="reserve-input-guests"
                className="bg-transparent w-full text-lg text-dahlia-text focus:outline-none appearance-none"
              >
                {SIZES.map((s) => (
                  <option key={s} value={s} className="bg-dahlia-bg">
                    {s} people
                  </option>
                ))}
              </select>
            </Field>
            <div className="col-span-1 md:col-span-2">
              <Field icon={MessageSquare} label="Special requests (optional)">
                <input
                  type="text"
                  value={form.requests}
                  onChange={update("requests")}
                  placeholder="Allergies, birthday, seating preference..."
                  data-testid="reserve-input-requests"
                  className="bg-transparent w-full text-lg text-dahlia-text placeholder:text-dahlia-muted/60 focus:outline-none"
                />
              </Field>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-dahlia-muted max-w-sm">
              By booking, you agree to be charming, hungry, and possibly dance. No-shows make Nonna sad.
            </p>
            <button
              type="submit"
              disabled={loading}
              data-testid="reservation-submit-btn"
              className="inline-flex items-center justify-center gap-3 bg-dahlia-red text-white px-9 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-3px] hover:bg-[#ff5039] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Booking..." : "Book my table"}
              {!loading && <span>→</span>}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, required, children }) {
  return (
    <label className="flex flex-col gap-2 border-b border-dahlia-border focus-within:border-dahlia-red transition-colors pb-3">
      <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted flex items-center gap-2">
        <Icon size={12} />
        {label} {required && <span className="text-dahlia-red">*</span>}
      </span>
      {children}
    </label>
  );
}
