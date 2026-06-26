import { motion } from "framer-motion";
import { GraduationCap, Cake, Users2, Building2, ArrowRight } from "lucide-react";

const OCCASIONS = [
  { icon: GraduationCap, title: "Graduation party", sub: "Bocconi, Polimi, Statale — bring the gown, we'll bring the prosecco." },
  { icon: Cake, title: "Birthday riot", sub: "Cake on the house if the group sings. Loudly. Out of tune is encouraged." },
  { icon: Users2, title: "Aperitivo with the crew", sub: "Tables for 8-30. Custom cocktail menu. Zero corporate energy." },
  { icon: Building2, title: "Private buyout", sub: "Take the whole place. From 50 to 120 guests. We hand you the keys." },
];

/**
 * variant: "dark" (Oven) | "light" (Lab)
 */
export default function HostEvent({ variant = "dark" }) {
  const isLight = variant === "light";
  const bg = isLight ? "#FBF6E9" : "var(--dahlia-bg)";
  const text = isLight ? "#161210" : "var(--dahlia-text)";
  const muted = isLight ? "rgba(22,18,16,0.65)" : "var(--dahlia-muted)";
  const border = isLight ? "rgba(22,18,16,0.2)" : "var(--dahlia-border)";
  const accent = "#FF3B22";

  return (
    <section
      id="host"
      data-testid={`host-section-${variant}`}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{ background: bg, color: text }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-16">
        <div className="md:col-span-7">
          <div className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: accent }}>
            Host your moment with us
          </div>
          <h2 className="font-display text-6xl md:text-9xl uppercase leading-[0.85] tracking-tighter">
            Your night.
            <br />
            <span className={isLight ? "" : "font-editorial italic font-medium normal-case tracking-normal"} style={{ WebkitTextStroke: isLight ? `1.5px ${text}` : undefined, color: isLight ? "transparent" : undefined }}>
              {isLight ? "Our room." : "Our room."}
            </span>
            <br />
            <span style={{ color: accent }}>Zero stress.</span>
          </h2>
        </div>
        <div className="md:col-span-5 flex flex-col justify-end">
          <p className="font-editorial italic text-xl leading-snug" style={{ color: muted }}>
            Graduation? Birthday? Promotion you weren&apos;t supposed to get? Bring it here. We do private events the way we do public ones — loud, warm, properly fed.
          </p>
          <a
            href="mailto:events@dahlia.it"
            data-testid={`host-cta-email-${variant}`}
            className="mt-6 inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 self-start"
            style={{
              background: accent,
              color: "#FBF6E9",
            }}
          >
            Pitch us your party <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" data-testid={`host-occasions-${variant}`}>
        {OCCASIONS.map((o, i) => {
          const I = o.icon;
          return (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              data-testid={`host-card-${variant}-${i}`}
              className="group relative p-6 md:p-7 transition-colors duration-300 cursor-pointer"
              style={{ border: `1px solid ${border}` }}
            >
              <I size={28} strokeWidth={1.4} style={{ color: accent }} className="mb-5" />
              <h3 className="font-display text-2xl md:text-3xl uppercase leading-none mb-3">{o.title}</h3>
              <p className="text-sm leading-snug" style={{ color: muted }}>{o.sub}</p>
              <div
                className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ color: accent }}
              >
                Plan with us → 
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stat ribbon */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-0" style={{ borderTop: `1px solid ${border}` }}>
        {[
          ["120", "Max guests"],
          ["48h", "Quote turnaround"],
          ["0%", "Booking fees"],
          ["100%", "Italian hospitality"],
        ].map(([n, l], i) => (
          <div key={l} className="py-6 px-4" style={{ borderRight: i < 3 ? `1px solid ${border}` : undefined }}>
            <div className="font-display text-4xl md:text-5xl leading-none">{n}</div>
            <div className="text-[10px] uppercase tracking-[0.25em] mt-3" style={{ color: muted }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
