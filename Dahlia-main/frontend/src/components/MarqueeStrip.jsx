import Marquee from "react-fast-marquee";

const ITEMS = [
  "Aperitivo Hour",
  "DJ Sets",
  "Pizza Napoletana",
  "Spritz · Negroni · Boilermaker",
  "Milano No. 1",
  "Open till 02:00",
  "Student Tuesdays",
  "International Nights",
];

export default function MarqueeStrip({ variant = "solid" }) {
  return (
    <div
      data-testid="marquee-strip"
      className={`relative border-y border-dahlia-border ${
        variant === "solid" ? "bg-dahlia-red text-white" : "bg-dahlia-bg text-dahlia-text"
      }`}
    >
      <Marquee gradient={false} speed={70} pauseOnHover>
        {ITEMS.concat(ITEMS).map((t, i) => (
          <span
            key={i}
            className="font-display text-5xl md:text-7xl uppercase tracking-tight px-8 py-5 flex items-center"
          >
            {t}
            <span className="mx-8 inline-block w-2.5 h-2.5 rounded-full bg-dahlia-yellow" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
