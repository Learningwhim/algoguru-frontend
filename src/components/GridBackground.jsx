/**
 * Subtle graph-paper grid + radial vignette, meant to sit behind page
 * content on the dark bg. Parent needs `relative` (or `fixed`) — this
 * renders as an absolutely-positioned layer and won't block clicks.
 *
 * Usage:
 *   <div className="relative min-h-screen bg-[#0B0B0A]">
 *     <GridBackground />
 *     <div className="relative">...actual page content...</div>
 *   </div>
 */
export default function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* fine 40px grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* bolder 200px grid on top, like graph paper's major lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "200px 200px",
        }}
      />
      {/* soft light source top-center + edge falloff for the 3D/depth feel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.035), transparent 60%), radial-gradient(circle at 50% 40%, transparent 30%, #0B0B0A 100%)",
        }}
      />
    </div>
  );
}