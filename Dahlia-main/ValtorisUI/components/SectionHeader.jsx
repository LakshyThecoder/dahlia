import { motion } from "framer-motion";

/**
 * SectionHeader — standardized overline + display heading block.
 *
 * Props:
 *   overline      — small uppercase label (e.g. "01 — Our Menu")
 *   heading       — JSX or string for the main display heading
 *   sub           — optional italic editorial subtitle
 *   align         — "left" | "center" (default "left")
 *   accentColor   — overline + dash color (default var(--dahlia-red))
 *   className     — wrapper className
 */
export default function SectionHeader({
  overline,
  heading,
  sub,
  align = "left",
  accentColor = "var(--dahlia-red)",
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "text-center" : ""} ${className}`}>
      {overline && (
        <motion.div
          initial={{ opacity: 0, x: isCenter ? 0 : -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-xs uppercase tracking-[0.3em] font-semibold mb-4 flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}
          style={{ color: accentColor }}
        >
          <span className="inline-block w-6 h-[2px]" style={{ background: accentColor }} />
          {overline}
        </motion.div>
      )}

      {heading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {typeof heading === "string" ? (
            <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter text-dahlia-text">
              {heading}
            </h2>
          ) : (
            heading
          )}
        </motion.div>
      )}

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`font-editorial italic text-xl text-dahlia-muted mt-5 ${isCenter ? "mx-auto" : ""} max-w-xl`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
