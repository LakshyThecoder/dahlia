import { motion } from "framer-motion";
import { IMG } from "@/lib/images";
import { Instagram, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Trygve A.",
    handle: "Verified TheFork diner",
    text: "The food was really good! The best pizza I have had in Italy this far — and that&apos;s after 1.5 months and ~10 pizzas of homework.",
    rating: 5,
  },
  {
    name: "Hendrik R.",
    handle: "10/10 · 7 months ago",
    text: "Very good pizza. Plus they showed the football on the big screen. What more do you want from a Friday night?",
    rating: 5,
  },
  {
    name: "Laila J.",
    handle: "8.5/10 · 1 year ago",
    text: "Nice pizzas, good service and properly stylish decoration. The kind of place you instinctively photograph before eating.",
    rating: 5,
  },
];

const WALL = [IMG.s1, IMG.s2, IMG.s3, IMG.s4, IMG.s5, IMG.s6];

export default function SocialProof() {
  return (
    <section
      id="story"
      data-testid="social-section"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-dahlia-bg"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4">
            04 — La Voce
          </div>
          <h2
            data-testid="social-heading"
            className="font-display text-6xl md:text-8xl uppercase leading-[0.9] tracking-tighter"
          >
            They say we&apos;re
            <br />
            <span className="font-editorial italic font-medium normal-case tracking-normal">crazy.</span> <span className="text-dahlia-red">We say</span>
            <br />
            we&apos;re Dahlia.
          </h2>
        </div>
        <a
          href="#"
          data-testid="social-instagram-link"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red transition-colors"
        >
          <Instagram size={16} /> @dahlia.milano
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Reviews */}
        <div className="lg:col-span-5 flex flex-col gap-4" data-testid="reviews-list">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              data-testid={`review-card-${i}`}
              className="border border-dahlia-border p-6 md:p-7 hover:border-dahlia-red/70 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#FFC01E" stroke="#FFC01E" />
                ))}
              </div>
              <p className="font-editorial italic text-xl md:text-2xl leading-snug text-dahlia-text/95">
                &ldquo;<span dangerouslySetInnerHTML={{ __html: r.text }} />&rdquo;
              </p>
              <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.25em]">
                <span className="text-dahlia-text">{r.name}</span>
                <span className="text-dahlia-muted">{r.handle}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram-style wall */}
        <div className="lg:col-span-7 grid grid-cols-3 gap-2 md:gap-3" data-testid="social-wall">
          {WALL.map((src, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              data-testid={`social-tile-${i}`}
              className={`relative overflow-hidden bg-dahlia-surface group ${
                i === 0 ? "row-span-2 col-span-2 aspect-auto" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt={`Dahlia social ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.4s]"
              />
              <div className="absolute inset-0 bg-dahlia-red/0 group-hover:bg-dahlia-red/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
