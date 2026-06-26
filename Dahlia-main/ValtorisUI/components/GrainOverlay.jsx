/**
 * GrainOverlay — fixed SVG film grain texture over the entire page.
 * Renders as a fixed pseudo-element layer, pointer-events none.
 * Use on images for local grain, or on the root wrapper for global grain.
 *
 * Usage:
 *   <GrainOverlay />              — fixed, full-page
 *   <GrainOverlay local />        — absolute, parent-relative (add relative to parent)
 *   <GrainOverlay opacity={0.08} />
 */
export default function GrainOverlay({ local = false, opacity = 0.06, zIndex = 10 }) {
  const SVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>")`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: local ? "absolute" : "fixed",
        inset: 0,
        zIndex,
        opacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        backgroundImage: SVG,
      }}
    />
  );
}
