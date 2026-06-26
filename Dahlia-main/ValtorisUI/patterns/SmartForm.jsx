import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { User, Mail, Phone, Calendar, MessageSquare, Send } from "lucide-react";
import Sticker from "../components/Sticker";

/**
 * SmartForm — transparent bottom-border form with sticker + capacity bar.
 * The reservation / contact / booking form pattern.
 *
 * Props:
 *   heading       — JSX or string for left column heading
 *   sub           — left column sub copy
 *   fields        — array of field configs (see below)
 *   ctaLabel      — submit button label
 *   successMsg    — toast message on success
 *   stickerText   — floating sticker copy (omit to hide)
 *   capacityPct   — 0–100 number for the capacity/demand bar (omit to hide)
 *   capacityLabel — label next to bar
 *   onSubmit      — async handler(formData) → void
 *
 * Field config: { id, label, icon?, type, placeholder, required?, options? }
 *   type: "text" | "email" | "tel" | "date" | "select" | "textarea"
 */
export default function SmartForm({
  heading,
  sub = "Fill in your details and we'll confirm within 24 hours.",
  fields = defaultFields,
  ctaLabel = "Send request",
  successMsg = "Request sent! We'll be in touch.",
  stickerText,
  capacityPct,
  capacityLabel = "Capacity filling up fast",
  onSubmit,
}) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (id, val) => setForm((f) => ({ ...f, [id]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (onSubmit) await onSubmit(form);
      toast.success(successMsg);
      setForm({});
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      data-testid="smart-form-section"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-dahlia-bg overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: editorial copy */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-5 flex items-center gap-3">
              <span className="inline-block w-6 h-[2px] bg-dahlia-red" />
              Book your spot
            </div>

            {heading ? (
              typeof heading === "string" ? (
                <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
                  {heading}
                </h2>
              ) : heading
            ) : (
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
                Reserve<br />
                <span className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-yellow">your table.</span>
              </h2>
            )}

            <p className="font-editorial italic text-xl text-dahlia-muted mt-6 max-w-md leading-snug">{sub}</p>

            {capacityPct !== undefined && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted">{capacityLabel}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-dahlia-red font-bold">{capacityPct}%</span>
                </div>
                <div className="h-1 bg-dahlia-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${capacityPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-dahlia-red"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7 relative">
          {stickerText && (
            <Sticker
              text={stickerText}
              rotate={-6}
              delay={0.6}
              className="absolute -top-8 right-4 md:right-10 z-20"
            />
          )}

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            data-testid="smart-form"
            className="border border-dahlia-border p-8 md:p-12 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((f) => {
                const Icon = f.icon;
                const cls = "border-b border-dahlia-border focus-within:border-dahlia-red transition-colors pb-3 flex flex-col gap-2";
                const inputCls = "bg-transparent w-full text-lg text-dahlia-text placeholder:text-dahlia-muted/60 focus:outline-none";
                const labelCls = "text-[10px] uppercase tracking-[0.25em] text-dahlia-muted flex items-center gap-2";

                return (
                  <label
                    key={f.id}
                    className={`${cls} ${f.fullWidth ? "md:col-span-2" : ""}`}
                    data-testid={`form-field-${f.id}`}
                  >
                    <span className={labelCls}>
                      {Icon && <Icon size={11} />}
                      {f.label}
                      {f.required && <span className="text-dahlia-red">*</span>}
                    </span>
                    {f.type === "select" ? (
                      <select
                        className={`${inputCls} appearance-none cursor-pointer`}
                        value={form[f.id] || ""}
                        onChange={(e) => set(f.id, e.target.value)}
                        required={f.required}
                        data-testid={`form-input-${f.id}`}
                      >
                        <option value="" disabled>Select…</option>
                        {(f.options || []).map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : f.type === "textarea" ? (
                      <textarea
                        className={`${inputCls} resize-none`}
                        rows={3}
                        placeholder={f.placeholder}
                        value={form[f.id] || ""}
                        onChange={(e) => set(f.id, e.target.value)}
                        data-testid={`form-input-${f.id}`}
                      />
                    ) : (
                      <input
                        type={f.type}
                        className={inputCls}
                        placeholder={f.placeholder}
                        value={form[f.id] || ""}
                        onChange={(e) => set(f.id, e.target.value)}
                        required={f.required}
                        data-testid={`form-input-${f.id}`}
                      />
                    )}
                  </label>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={loading}
              data-testid="form-submit-btn"
              className="w-full inline-flex items-center justify-center gap-3 bg-dahlia-red text-white py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:translate-y-[-2px] hover:bg-[#ff5039] hover:shadow-[0_12px_40px_-8px_rgba(255,59,34,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? "Sending…" : ctaLabel}
              {!loading && <Send size={14} />}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

const defaultFields = [
  { id: "name",    label: "Full name",    icon: User,          type: "text",  placeholder: "Your name",         required: true },
  { id: "email",   label: "Email",        icon: Mail,          type: "email", placeholder: "you@example.com",   required: true },
  { id: "phone",   label: "Phone",        icon: Phone,         type: "tel",   placeholder: "+39 000 000 0000" },
  { id: "date",    label: "Date",         icon: Calendar,      type: "date",  placeholder: "",                  required: true },
  { id: "guests",  label: "Guests",       icon: null,          type: "select",options: ["1","2","3","4","5","6","7","8+"], required: true },
  { id: "message", label: "Message",      icon: MessageSquare, type: "textarea", placeholder: "Any special requests?", fullWidth: true },
];
