import { Instagram, Facebook, Twitter } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function MagneticIcon({ children, href, testId }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      data-testid={testId}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="w-11 h-11 border border-dahlia-border flex items-center justify-center hover:border-dahlia-red hover:text-dahlia-red hover:bg-dahlia-red/10 transition-colors duration-300"
      aria-label="social"
    >
      {children}
    </motion.a>
  );
}

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Rome",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(d);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      id="visit"
      data-testid="footer"
      className="relative bg-black pt-20 md:pt-28 pb-8 overflow-hidden"
    >
      <div className="px-6 md:px-12 lg:px-16">
        {/* Mini grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-4"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4">
              Visit us
            </div>
            <p className="font-editorial italic text-2xl md:text-3xl leading-snug text-dahlia-text">
              Via Giuseppe Ripamonti 35,
              <br />
              20135 Milano, Italia.
            </p>
            <p className="mt-4 text-sm text-dahlia-muted">
              Tram 24 · Isonzo / Ripamonti · 8 min from Bocconi
            </p>
            <a
              href="https://maps.google.com/?q=Via+Giuseppe+Ripamonti+35+Milano"
              data-testid="footer-directions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 items-center gap-2 text-xs uppercase tracking-[0.25em] border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red hover:gap-3 transition-all"
            >
              Get directions →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-3"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4">
              Hours
            </div>
            <ul className="space-y-2 text-sm text-dahlia-text/90">
              <li className="flex justify-between"><span>Mon — Thu</span><span className="text-dahlia-muted">Closed (we&apos;re resting)</span></li>
              <li className="flex justify-between"><span>Fri — Sun</span><span className="text-dahlia-muted">18:00 — 00:00</span></li>
              <li className="flex justify-between"><span>Kitchen</span><span className="text-dahlia-muted">Last order 23:15</span></li>
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-dahlia-yellow">
              · Milano time {time}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4">
              Menu
            </div>
            <ul className="space-y-2 text-sm">
              {["Pizza", "Bar", "Events", "Reserve"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    data-testid={`footer-link-${l.toLowerCase()}`}
                    className="text-dahlia-text/80 hover:text-dahlia-red hover:translate-x-1 inline-block transition-all"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-3"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4">
              Stay loud
            </div>
            <p className="text-sm text-dahlia-muted mb-4">
              Newsletter for parties, secret menus & student deals. Zero spam — full vibes.
            </p>
            <form
              onClick={(e) => e.preventDefault()}
              className="flex border-b border-dahlia-border focus-within:border-dahlia-red transition-colors"
            >
              <input
                type="email"
                placeholder="your@email.it"
                data-testid="footer-newsletter-input"
                className="bg-transparent flex-1 py-2 text-sm focus:outline-none placeholder:text-dahlia-muted/60"
              />
              <button
                type="submit"
                data-testid="footer-newsletter-btn"
                className="text-xs uppercase tracking-[0.25em] text-dahlia-red px-2 hover:text-dahlia-yellow transition-colors"
              >
                Join →
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4">
              {[Instagram, Facebook, Twitter].map((I, i) => (
                <MagneticIcon key={i} href="#" testId={`footer-social-${i}`}>
                  <I size={16} />
                </MagneticIcon>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Giant brand */}
        <div className="relative overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            data-testid="footer-brand"
            className="font-display uppercase leading-[0.8] tracking-tighter text-[28vw] md:text-[22vw] text-dahlia-text/95 select-none"
            aria-hidden="true"
          >
            DAHLIA
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, rotate: -16, scale: 0.6 }}
            whileInView={{ opacity: 1, rotate: -4, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="absolute right-2 bottom-3 md:bottom-6 font-script text-3xl md:text-5xl text-dahlia-red rotate-[-4deg] hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            .oven
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-dahlia-muted">
          <div>© {new Date().getFullYear()} Dahlia Milano. Made with passion, basil & loud bass. <span className="text-dahlia-text/80">Crafted by <a href="#" data-testid="valtoris-credit" className="text-dahlia-red hover:text-dahlia-yellow transition-colors font-semibold">Valtoris</a>.</span></div>
          <div className="flex items-center gap-6">
            <a href="#" data-testid="footer-privacy" className="hover:text-dahlia-text transition-colors">Privacy</a>
            <a href="#" data-testid="footer-terms" className="hover:text-dahlia-text transition-colors">Terms</a>
            <span>P.IVA 09988776655</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
