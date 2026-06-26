import { motion } from "framer-motion";

/**
 * Sticker — floating, handwritten, slightly rotated playful badge.
 *
 * Props:
 *   text        — the sticker copy
 *   rotate      — base rotation in degrees (default -8)
 *   bg          — background color (default dahlia-yellow)
 *   color       — text color (default dahlia-bg)
 *   shadow      — box-shadow color hex (default red)
 *   delay       — animation delay (default 0.5)
 *   className   — positioning classes (e.g. "absolute top-8 right-8")
 *   size        — "sm" | "md" | "lg" (default "md")
 */
export default function Sticker({
  text = "Hello!",
  rotate = -8,
  bg = "#FFC01E",
  color = "#0D0C0B",
  shadowColor = "rgba(255,59,34,0.9)",
  delay = 0.5,
  className = "",
  size = "md",
}) {
  const sizes = {
    sm: "px-3 py-1 text-2xl",
    md: "px-5 py-2 text-3xl md:text-4xl",
    lg: "px-7 py-3 text-4xl md:text-5xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotate: rotate - 14, scale: 0.5 }}
      whileInView={{ opacity: 1, rotate, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, type: "spring", stiffness: 180, damping: 16 }}
      className={`float-slow z-20 ${className}`}
      style={{ "--r": `${rotate}deg` }}
    >
      <div
        className={`font-script ${sizes[size]} cursor-pointer transition-all duration-300`}
        style={{
          background: bg,
          color,
          boxShadow: `6px 6px 0 0 ${shadowColor}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `10px 10px 0 0 ${shadowColor}`;
          e.currentTarget.style.transform = `rotate(${rotate - 4}deg)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `6px 6px 0 0 ${shadowColor}`;
          e.currentTarget.style.transform = "";
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}
