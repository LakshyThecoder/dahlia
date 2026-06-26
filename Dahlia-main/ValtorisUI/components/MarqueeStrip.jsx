import Marquee from "react-fast-marquee";

/**
 * MarqueeStrip — full-width scrolling ticker band.
 *
 * Props:
 *   items    — array of strings to display
 *   variant  — "solid" (colored bg) | "outline" (dark bg)
 *   speed    — scroll speed (default 70)
 *   dotColor — separator dot color (default dahlia-yellow)
 *   bg       — background override
 *   textColor— text color override
 */
export default function MarqueeStrip({
  items = ["Item One", "Item Two", "Item Three"],
  variant = "solid",
  speed = 70,
  dotColor = "#FFC01E",
  bg,
  textColor,
}) {
  const solidBg = bg || (variant === "solid" ? "var(--dahlia-red)" : "var(--dahlia-bg)");
  const solidText = textColor || (variant === "solid" ? "#F4F0EA" : "var(--dahlia-text)");

  return (
    <div
      data-testid="marquee-strip"
      className="relative border-y border-dahlia-border"
      style={{ background: solidBg, color: solidText }}
    >
      <Marquee gradient={false} speed={speed} pauseOnHover>
        {items.concat(items).map((t, i) => (
          <span
            key={i}
            className="font-display text-5xl md:text-7xl uppercase tracking-tight px-8 py-5 flex items-center"
          >
            {t}
            <span
              className="mx-8 inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: dotColor }}
            />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
