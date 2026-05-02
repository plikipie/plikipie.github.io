import { useTheme } from "../../lib/theme";

export function BackgroundOrnaments() {
  const { dark, t } = useTheme();

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div 
        style={{
          position: "absolute", inset: 0,
          backgroundImage: dark
            ? `linear-gradient(to right, ${t.borderMid} 1px, transparent 1px)`
            : `linear-gradient(to right, ${t.borderMid} 1px, transparent 1px), linear-gradient(to bottom, ${t.borderMid} 1px, transparent 1px)`,
          backgroundSize: dark ? "min(25vw, 360px) 100%" : "60px 60px",
          maskImage: dark ? "none" : "radial-gradient(ellipse 100% 100% at 50% 30%, #000 10%, transparent 80%)",
          WebkitMaskImage: dark ? "none" : "radial-gradient(ellipse 100% 100% at 50% 30%, #000 10%, transparent 80%)",
          opacity: dark ? 0.34 : 0.6,
        }}
      />
      
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
