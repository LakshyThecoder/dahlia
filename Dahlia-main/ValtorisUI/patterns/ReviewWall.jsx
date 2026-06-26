import { motion } from "framer-motion";
import { Star, Instagram } from "lucide-react";

/**
 * ReviewWall — review cards + Instagram-style photo wall.
 *
 * Props:
 *   reviews  — array of { quote, author, rating (1–5), source? }
 *   photos   — array of image URLs (6 recommended, first is featured 2x2)
 *   heading  — section heading string/JSX
 *   overline — small label
 *   igHandle — @handle link (omit to hide)
 */
export default function ReviewWall({
  reviews = defaultReviews,
  photos = [],
  heading,
  overline = "04 — What they say",
  igHandle,
}) {
  return (
    <section
      data-testid="review-wall"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-dahlia-surface overflow-hidden"
    >
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-dahlia-red font-semibold mb-4 flex items-center gap-3"
          >
            <span className="inline-block w-6 h-[2px] bg-dahlia-red" />
            {overline}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {heading ? (
              typeof heading === "string" ? (
                <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
                  {heading}
                </h2>
              ) : heading
            ) : (
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
                The crowd<br />
                <span className="font-editorial italic font-medium normal-case tracking-normal text-dahlia-yellow">has spoken.</span>
              </h2>
            )}
          </motion.div>
        </div>

        {igHandle && (
          <motion.a
            href={`https://instagram.com/${igHandle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="review-wall-ig-link"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-dahlia-muted hover:text-dahlia-red transition-colors border-b border-dahlia-border hover:border-dahlia-red pb-1"
          >
            <Instagram size={14} /> {igHandle} →
          </motion.a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Reviews */}
        <div className="lg:col-span-5 space-y-4" data-testid="reviews-list">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              data-testid={`review-card-${i}`}
              className="border border-dahlia-border p-6 group hover:border-dahlia-red transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={12}
                      fill={s < (r.rating || 5) ? "#FFC01E" : "transparent"}
                      stroke={s < (r.rating || 5) ? "#FFC01E" : "var(--dahlia-border)"}
                    />
                  ))}
                </div>
                {r.source && (
                  <span className="text-[9px] uppercase tracking-[0.25em] text-dahlia-muted border border-dahlia-border px-2 py-0.5">
                    {r.source}
                  </span>
                )}
              </div>
              <p className="font-editorial italic text-lg text-dahlia-text/90 leading-snug mb-3">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="text-[10px] uppercase tracking-[0.25em] text-dahlia-muted">
                — {r.author}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photo wall */}
        {photos.length > 0 && (
          <div className="lg:col-span-7" data-testid="social-wall">
            <div className="grid grid-cols-3 gap-2 h-[460px] md:h-[540px]">
              {photos.slice(0, 6).map((src, i) => (
                <motion.a
                  key={i}
                  href={igHandle ? `https://instagram.com/${igHandle.replace("@", "")}` : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  data-testid={`social-tile-${i}`}
                  className={`group relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                >
                  <img
                    src={src}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1.4s]"
                  />
                  <div className="absolute inset-0 bg-dahlia-red/0 group-hover:bg-dahlia-red/30 transition-colors duration-400 flex items-center justify-center">
                    <Instagram
                      size={28}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const defaultReviews = [
  { quote: "The best pizza I've had in Italy this far. The vibe? Unmatched.", author: "Trygve A.", rating: 5, source: "TheFork" },
  { quote: "Came for the pizza, stayed for the DJ set and the people. Back next Friday.", author: "Sofia M.", rating: 5, source: "Google" },
  { quote: "Not your typical restaurant. It's an experience. Absolutely recommend.", author: "Marco B.", rating: 5, source: "TheFork" },
];
