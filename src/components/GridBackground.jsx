import { useTheme } from "../context/ThemeContext";

/**
 * Subtle graph-paper grid, meant to sit behind page content. Parent needs
 * `relative` (or `fixed`) — this renders as an absolutely-positioned layer
 * and won't block clicks.
 *
 * In dark mode it also draws a soft vignette (matches the original design).
 * In light mode the vignette is skipped so the page's blue gradient stays
 * visible underneath — only the faint grid lines sit on top of it.
 *
 * Usage:
 *   <div className="relative min-h-screen bg-gradient-to-br from-[#CBDFEF] via-[#D2E4F1] to-[#D7E6F0] dark:from-[#0B0B0A] dark:via-[#0B0B0A] dark:to-[#0B0B0A]">
 *     <GridBackground />
 *     <div className="relative">...actual page content...</div>
 *   </div>
 */
export default function GridBackground() {
  const { isDark } = useTheme();
  const rgb = isDark ? "255,255,255" : "22,34,58";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* fine 40px grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(${rgb},0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(${rgb},0.025) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* bolder 200px grid on top, like graph paper's major lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(${rgb},0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(${rgb},0.05) 1px, transparent 1px)`,
          backgroundSize: "200px 200px",
        }}
      />
      {/* soft light source + edge falloff for the 3D/depth feel — dark mode only,
          so the light-mode blue gradient underneath stays visible */}
      {isDark && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.035), transparent 60%), radial-gradient(circle at 50% 40%, transparent 30%, #0B0B0A 100%)",
          }}
        />
      )}
    </div>
  );
}