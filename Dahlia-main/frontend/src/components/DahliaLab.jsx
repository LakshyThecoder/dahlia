import { motion } from "framer-motion";
import { IMG } from "@/lib/images";
import { Coffee, Croissant, Salad, Clock, Phone, MapPin } from "lucide-react";

const ITEMS = [
  { name: "Cornetto Pistacchio", sub: "Sicilian pistachio cream, hand-laminated, suspiciously addictive.", price: "€2.80", icon: Croissant },
  { name: "Pasticciotto Leccese", sub: "Pasta frolla shell, vanilla custard, baked till golden.", price: "€2.50", icon: Croissant },
  { name: "Piadina Romagnola", sub: "Squacquerone, rucola, prosciutto crudo. The Bocconi lifesaver.", price: "€7", icon: Salad },
  { name: "Insalatona Lab", sub: "Quinoa, avocado, salmone, lime. For days you pretend to be productive.", price: "€11", icon: Salad },
  { name: "Espresso Doppio", sub: "Single origin, dark, honest. €1 if you stand at the bar.", price: "€1.50", icon: Coffee },
  { name: "Affogato Riot", sub: "Vanilla gelato drowned in espresso + a shot of Amaro. After 17:00 only.", price: "€6", icon: Coffee },
];

const MOMENTS = [
  { time: "07:30", label: "Colazione · Croissants out of the oven" },
  { time: "11:00", label: "Pre-lecture espresso panic" },
  { time: "13:00", label: "Piadinas + salads for the cool kids" },
  { time: "17:00", label: "Apericena · Spritz hits the counter" },
  { time: "22:00", label: "Last call. See you at .oven →" },
];

export default function DahliaLab() {
  return (
    <section
      id="lab"
      data-testid="lab-section"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#FDF6E9] text-[#1A1410] overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[#FF3B22] font-semibold mb-4">
            00B — Dahlia by daylight
          </div>
          <h2
            data-testid="lab-heading"
            className="font-display text-6xl md:text-9xl uppercase leading-[0.85] tracking-tighter"
          >
            Dahlia
            <span className="text-[#FF3B22]">.lab</span>
            <br />
            <span className="font-editorial italic font-medium normal-case tracking-normal text-[#1A1410]/80">
              your daytime
            </span>{" "}
            <span className="font-editorial italic font-medium normal-case tracking-normal" style={{ WebkitTextStroke: "1.5px #1A1410", color: "transparent" }}>
              riot.
            </span>
          </h2>
        </div>
        <p className="font-editorial italic text-xl text-[#1A1410]/70 max-w-sm">
          Croissants at sunrise, piadinas at lunch, spritz at golden hour. The kind of caffè that quietly powers Bocconi.
        </p>
      </div>

      {/* Top mosaic */}
      <div className="grid grid-cols-12 gap-3 md:gap-4 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="col-span-12 md:col-span-7 aspect-[16/10] overflow-hidden bg-[#E9DDC4]"
        >
          <img
            src={IMG.cocktailBar}
            alt="The Lab counter"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.4s]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="col-span-6 md:col-span-5 aspect-[4/5] md:aspect-auto overflow-hidden bg-[#E9DDC4] relative"
        >
          <img
            src={IMG.pizzaTable}
            alt="Croissants out of the oven"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.4s]"
          />
          <div className="absolute bottom-4 left-4 font-script text-3xl text-[#FF3B22] rotate-[-4deg]">
            buongiorno!
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-6 md:col-span-3 aspect-square overflow-hidden bg-[#E9DDC4]"
        >
          <img src={IMG.cheersFriends} alt="Lab friends" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.4s]" />
        </motion.div>
      </div>

      {/* Menu + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Menu */}
        <div className="lg:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] font-bold mb-6">
            Il banco
          </div>
          <ul className="divide-y divide-[#1A1410]/15" data-testid="lab-menu-list">
            {ITEMS.map((i, idx) => {
              const Icon = i.icon;
              return (
                <li
                  key={i.name}
                  data-testid={`lab-item-${idx}`}
                  className="group py-5 md:py-6 grid grid-cols-[28px_1fr_auto] items-center gap-5 hover:translate-x-2 transition-transform duration-300"
                >
                  <Icon size={20} strokeWidth={1.6} className="text-[#1A1410]/60 group-hover:text-[#FF3B22] transition-colors" />
                  <div>
                    <div className="font-display text-2xl md:text-3xl uppercase leading-none text-[#1A1410]">
                      {i.name}
                    </div>
                    <div className="text-sm text-[#1A1410]/65 mt-1.5">{i.sub}</div>
                  </div>
                  <div className="font-display text-2xl text-[#FF3B22]">{i.price}</div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Timeline */}
        <aside className="lg:col-span-5 lg:pl-8 lg:border-l border-[#1A1410]/15">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#FF3B22] font-bold mb-6">
            La giornata
          </div>
          <ul className="space-y-5" data-testid="lab-timeline">
            {MOMENTS.map((m, i) => (
              <li key={i} className="flex items-start gap-5">
                <div className="font-display text-3xl text-[#1A1410] w-20 shrink-0 leading-none">
                  {m.time}
                </div>
                <div className="pt-1 text-sm text-[#1A1410]/75 leading-snug">{m.label}</div>
              </li>
            ))}
          </ul>

          {/* Visit card */}
          <div className="mt-10 border border-[#1A1410]/20 p-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#1A1410]/60 mb-3">
              Trova il Lab
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-[#FF3B22]" />
                <span>Via Ferdinando Bocconi 6, 20136 Milano</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-[#FF3B22]" />
                <span>Mon — Sun · 07:30 — 22:00</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#FF3B22]" />
                <a href="tel:+393898892656" data-testid="lab-phone" className="hover:text-[#FF3B22] transition-colors">
                  +39 389 889 2656
                </a>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Via+Ferdinando+Bocconi+6+Milano"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="lab-directions"
              className="inline-flex mt-6 items-center gap-2 bg-[#1A1410] text-[#FDF6E9] px-5 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#FF3B22] transition-colors"
            >
              Get directions →
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
