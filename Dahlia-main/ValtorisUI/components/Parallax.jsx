import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Parallax({ children, speed = 0.25, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 80}px`, `${speed * -80}px`]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
