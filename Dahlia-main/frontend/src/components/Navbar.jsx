import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Oven", href: "/oven" },
  { label: "Menu", href: "/menu" },
  { label: "Lab", href: "/lab" },
  { label: "Events", href: "/oven#events" },
  { label: "League", href: "/community" },
  { label: "Visit", href: "/oven#visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="px-6 md:px-12 lg:px-16 flex items-center justify-between">
        <a
          href="#top"
          data-testid="navbar-logo"
          className="flex items-center gap-2 group"
        >
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-dahlia-red pulse-dot" />
          <span className="font-display text-2xl md:text-[26px] tracking-wide">
            DAHLIA
          </span>
          <span className="font-editorial italic text-base text-dahlia-red -ml-1">
            .oven
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              href={l.href}
              className={`text-sm uppercase tracking-[0.18em] transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 hover:after:w-full after:transition-all after:duration-300 ${l.label === "League" ? "text-dahlia-yellow hover:text-dahlia-red after:bg-dahlia-yellow" : "text-dahlia-text/90 hover:text-dahlia-red after:bg-dahlia-red"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#reserve"
            data-testid="navbar-reserve-btn"
            className="hidden md:inline-flex items-center gap-2 bg-dahlia-red text-white px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold hover:translate-y-[-2px] hover:bg-[#ff5039] transition-all duration-300"
          >
            Book a table
            <span className="text-base leading-none">→</span>
          </a>
          <button
            onClick={() => setOpen((s) => !s)}
            data-testid="navbar-mobile-toggle"
            className="md:hidden p-2 -mr-2 text-dahlia-text"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out bg-dahlia-bg/95 backdrop-blur-xl ${
          open ? "max-h-[400px] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="px-6 pt-4 pb-6 flex flex-col gap-4 border-t border-white/5 mt-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-mobile-${l.label.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-display text-3xl tracking-wide text-dahlia-text hover:text-dahlia-red transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reserve"
            data-testid="navbar-mobile-reserve-btn"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center bg-dahlia-red text-white px-5 py-3 text-xs uppercase tracking-[0.2em] font-semibold"
          >
            Book a table →
          </a>
        </div>
      </div>
    </header>
  );
}
