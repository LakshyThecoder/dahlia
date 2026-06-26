import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG } from "@/lib/images";

const DRINKS = [
  { name: "Negroni Sbagliato", sub: "Campari · Vermouth · Prosecco", price: "€10" },
  { name: "Spritz Dahlia", sub: "House Aperol · Grapefruit · Soda", price: "€9" },
  { name: "Espresso Riot", sub: "Cold brew · Vodka · Salted caramel", price: "€11" },
  { name: "Limoncello Bomb", sub: "Limoncello · Tonic · Basil", price: "€10" },
];

export default function BarSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgOneY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const imgTwoY = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <section
      ref={sectionRef}
      id="bar"
      data-testid="bar-section"
      className="relative py-24 md:py-32 bg-dahlia-bg overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 px-6 md:px-12 lg:px-16">
        {/* Left typography */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4 flex items-center gap-3"
          >
            <span className="inline-block w-6 h-[2px] bg-dahlia-red" />
            02 — Il Bar
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            data-testid="bar-heading"
            className="font-display text-7xl md:text-[9rem] uppercase leading-[0.85] tracking-tighter"
          >
            Nights
            <br />
            <span className="text-stroke">that turn</span>
            <br />
            into <span className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-yellow">mornings.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-editorial italic text-xl md:text-2xl text-dahlia-muted mt-8 max-w-lg"
          >
            From the first <em>spritz</em> at 18:00 to the last shot before sunrise — our bartenders mix drinks like Milano mixes people. Fast, fizzy, a little reckless.{" "}
          </motion.p>

          {/* Drink list */}
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 max-w-xl" data-testid="bar-drink-list">
            {DRINKS.map((d, i) => (
              <motion.li
                key={d.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="border-b border-dahlia-border py-4 flex items-start justify-between gap-4 group cursor-pointer hover:border-dahlia-red/50 transition-colors"
                data-testid={`bar-drink-${i}`}
              >
                <div>
                  <div className="font-display text-xl uppercase tracking-wide group-hover:text-dahlia-text transition-colors">{d.name}</div>
                  <div className="text-xs text-dahlia-muted mt-1">{d.sub}</div>
                </div>
                <div className="font-display text-lg text-dahlia-red group-hover:scale-110 transition-transform">{d.price}</div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center gap-4"
          >
            <a
              href="#events"
              data-testid="bar-cta-events"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red hover:gap-3 transition-all"
            >
              Tonight&apos;s lineup →
            </a>
            <span className="text-xs uppercase tracking-[0.25em] text-dahlia-muted">
              Happy hour 18:00 – 20:30
            </span>
          </motion.div>
        </div>

        {/* Right image collage with parallax */}
        <div className="lg:col-span-5 relative min-h-[520px]">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imgOneY }}
            className="absolute top-0 right-0 w-[78%] aspect-[3/4] overflow-hidden bg-dahlia-surface group"
          >
            <img
              src={IMG.cocktailNegroni}
              alt="A backlit Negroni at the Dahlia bar"
              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1.6s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imgTwoY }}
            className="absolute bottom-0 left-0 w-[58%] aspect-[4/5] overflow-hidden border-4 border-dahlia-bg group"
          >
            <img
              src={IMG.cocktailBar}
              alt="The marble bar counter"
              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1.6s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Sticker */}
          <motion.div
            initial={{ opacity: 0, rotate: 20, scale: 0.6 }}
            whileInView={{ opacity: 1, rotate: 6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
            className="absolute top-10 -left-2 md:left-4 z-10 float-slow"
          >
            <div className="bg-dahlia-pink text-dahlia-bg px-4 py-2 font-script text-2xl md:text-3xl rotate-6 shadow-[5px_5px_0_0_rgba(255,192,30,0.9)] hover:shadow-[8px_8px_0_0_rgba(255,192,30,0.9)] hover:rotate-0 transition-all duration-300 cursor-pointer">
              Salute!
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
