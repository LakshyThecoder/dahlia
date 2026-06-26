import { motion } from "framer-motion";

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.025,
  once = true,
  as: Tag = "span",
}) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren: delay } },
  };
  const child = {
    hidden: { y: "110%" },
    show:   { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-80px" }}
        className="inline"
      >
        {String(text).split(" ").map((word, wi) => (
          <span key={wi} className="inline-flex overflow-hidden align-top" style={{ marginRight: "0.25em" }}>
            {Array.from(word).map((char, ci) => (
              <motion.span key={ci} variants={child} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
