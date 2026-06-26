import { useEffect, useRef, useState } from "react";

export default function Cursor({ primaryColor = "#FF3B22", accentColor = "#FFC01E" }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x, ry = y, raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const hover = e.target?.closest("a, button, input, select, textarea, [data-cursor-hover]");
      ringRef.current?.classList.toggle("cursor-hover", !!hover);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[150] w-9 h-9 rounded-full mix-blend-difference transition-[width,height,border-color,background-color] duration-200"
        style={{ border: `1px solid ${primaryColor}b3` }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[151] w-1.5 h-1.5 rounded-full mix-blend-difference"
        style={{ background: primaryColor }}
      />
      <style>{`
        .cursor-ring.cursor-hover {
          width: 56px; height: 56px;
          background: ${primaryColor}2e;
          border-color: ${accentColor}e6;
        }
      `}</style>
    </>
  );
}
