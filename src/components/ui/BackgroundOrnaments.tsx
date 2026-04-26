import { useTheme } from "../../lib/theme";

export function BackgroundOrnaments() {
  const { dark, t } = useTheme();

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Animated Glowing Orbs */}
      <div className="orb orb-1" style={{ background: dark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.12)" }} />
      <div className="orb orb-2" style={{ background: dark ? "rgba(236,72,153,0.12)" : "rgba(236,72,153,0.08)" }} />
      <div className="orb orb-3" style={{ background: dark ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.05)" }} />

      {/* Grid Pattern with Radial Fade */}
      <div 
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(to right, ${t.borderMid} 1px, transparent 1px), linear-gradient(to bottom, ${t.borderMid} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 100% 100% at 50% 30%, #000 10%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 30%, #000 10%, transparent 80%)",
          opacity: dark ? 0.5 : 0.6,
        }}
      />
      
      {/* Noise Overlay for Premium Texture */}
      <div 
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          opacity: dark ? 0.05 : 0.08,
          mixBlendMode: dark ? "lighten" : "darken",
        }}
      />
    </div>
  );
}
