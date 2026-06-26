import { motion } from "framer-motion";
import { IMG } from "@/lib/images";

const STATS = [
  { n: "8.8", l: "TheFork rating" },
  { n: "480°C", l: "Oven temperature" },
  { n: "€20", l: "Average ticket" },
  { n: "00:00", l: "Last call · Fri–Sun" },
];

export default function SmallStory() {
  return (
    <section
      data-testid="story-band"
      className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-dahlia-surface"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5 relative aspect-[4/5] overflow-hidden"
        >
          <img src={IMG.duomoMilano} alt="Milano rooftops" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dahlia-bg/70 to-transparent" />
          <div className="absolute bottom-5 left-5 font-script text-3xl text-dahlia-yellow rotate-[-4deg]">
            Milano, sempre.
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4">
            Intermezzo
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter">
            One oven. Two floors. <span className="text-dahlia-red">A thousand</span> stories.
          </h2>
          <p className="font-editorial italic text-xl text-dahlia-muted mt-6 max-w-xl">
            We opened Dahlia in 2014 with one rule — make pizza you&apos;d want to eat at 1AM, in a room you&apos;d want to spend the rest of the night in. Somehow it worked.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div key={s.l} className="border-t border-dahlia-border pt-4">
                <div className="font-display text-4xl md:text-5xl text-dahlia-text">{s.n}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-dahlia-muted mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
