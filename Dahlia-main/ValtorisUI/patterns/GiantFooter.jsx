import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube } from "lucide-react";
import Magnetic from "../components/Magnetic";

/**
 * GiantFooter — brand monument footer.
 * Giant wordmark, social icons, newsletter, address, hours.
 *
 * Props:
 *   brand       — brand name (all caps, no spaces preferred)
 *   brandSuffix — e.g. ".oven"
 *   address     — { street, city, country }
 *   hours       — array of { days, time }
 *   links       — array of { label, href }
 *   socials     — array of { icon: LucideIcon, href, label }
 *   city        — city name for live local time (e.g. "Milano")
 *   timezone    — IANA timezone (e.g. "Europe/Rome")
 *   newsletter  — true to show newsletter form
 *   email       — contact email
 */
export default function GiantFooter({
  brand = "BRAND",
  brandSuffix = ".co",
  address = { street: "Via Example 1", city: "Milano", country: "Italy" },
  hours = [
    { days: "Mon – Thu", time: "12:00 – 23:00" },
    { days: "Fri – Sun", time: "12:00 – 02:00" },
  ],
  links = [
    { label: "Menu",      href: "/menu" },
    { label: "Events",    href: "#events" },
    { label: "Reservations", href: "#reserve" },
    { label: "Contact",   href: "mailto:hello@brand.co" },
  ],
  socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter,   href: "#", label: "Twitter" },
    { icon: Youtube,   href: "#", label: "YouTube" },
  ],
  city = "Milano",
  timezone = "Europe/Rome",
  newsletter = true,
  email = "hello@brand.co",
}) {
  const [time, setTime] = useState("");
  const [newsEmail, setNewsEmail] = useState("");

  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setTime(t);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [timezone]);

  return (
    <footer data-testid="footer" className="relative bg-black overflow-hidden">
      {/* Top grid */}
      <div className="px-6 md:px-12 lg:px-16 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-14 border-b border-white/10">

          {/* Address + hours */}
          <div className="md:col-span-3 space-y-8">
            <div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-dahlia-muted mb-3">Visit us</div>
              <p className="text-sm text-dahlia-text/80 leading-relaxed">
                {address.street}<br />{address.city}<br />{address.country}
              </p>
              <a href={`mailto:${email}`} data-testid="footer-email" className="text-xs text-dahlia-red hover:underline mt-2 block">
                {email}
              </a>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-dahlia-muted mb-3">Hours</div>
              {hours.map((h, i) => (
                <div key={i} className="flex justify-between text-xs text-dahlia-text/80 mb-1">
                  <span>{h.days}</span>
                  <span className="text-dahlia-muted">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-5">
            <div className="text-[9px] uppercase tracking-[0.3em] text-dahlia-muted mb-5">Navigate</div>
            <nav className="flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-sm text-dahlia-text/80 hover:text-dahlia-red transition-colors w-fit relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 hover:after:w-full after:bg-dahlia-red after:transition-all after:duration-300"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          {newsletter && (
            <div className="md:col-span-4 md:col-start-9">
              <div className="text-[9px] uppercase tracking-[0.3em] text-dahlia-muted mb-5">Stay in the loop</div>
              <p className="text-sm text-dahlia-text/60 mb-5 leading-relaxed">
                Events, offers, late-night drops. No spam, ever.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); setNewsEmail(""); }}
                className="flex border-b border-white/20 focus-within:border-dahlia-red transition-colors"
              >
                <input
                  type="email"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="your@email.com"
                  data-testid="footer-newsletter-input"
                  className="flex-1 bg-transparent text-sm text-dahlia-text placeholder:text-dahlia-muted/60 pb-2 focus:outline-none"
                />
                <button
                  type="submit"
                  data-testid="footer-newsletter-btn"
                  className="text-[10px] uppercase tracking-[0.25em] text-dahlia-red hover:text-dahlia-yellow transition-colors pb-2 pl-4 font-semibold"
                >
                  Subscribe →
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <Magnetic key={i} strength={0.3}>
                  <a
                    href={s.href}
                    data-testid={`footer-social-${i}`}
                    aria-label={s.label}
                    className="w-9 h-9 border border-white/15 flex items-center justify-center text-dahlia-muted hover:text-dahlia-text hover:border-white/40 transition-all"
                  >
                    <Icon size={15} />
                  </a>
                </Magnetic>
              );
            })}
          </div>
          <div className="text-[9px] uppercase tracking-[0.3em] text-dahlia-muted/60">
            © {new Date().getFullYear()} {brand}. All rights reserved.
          </div>
          {time && (
            <div className="text-[9px] uppercase tracking-[0.25em] text-dahlia-muted flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-dahlia-red pulse-dot" />
              {city} · {time}
            </div>
          )}
        </div>
      </div>

      {/* Giant brand wordmark */}
      <div className="relative px-4 pb-4 overflow-hidden select-none" aria-hidden="true">
        <div className="font-display text-[22vw] uppercase leading-[0.82] tracking-tighter text-white/[0.06] whitespace-nowrap">
          {brand}
        </div>
        <div
          className="absolute font-script text-[8vw] leading-none"
          style={{
            bottom: "12%",
            right: "6%",
            color: "var(--dahlia-red)",
            transform: "rotate(-4deg)",
          }}
        >
          {brandSuffix}
        </div>
      </div>
    </footer>
  );
}
