import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export const DARK = {
  bg:         "#0a0a09",
  bgCard:     "#0f0f0d",
  bgCard2:    "#11110f",
  bgMuted:    "rgba(202,255,36,.025)",
  bgHover:    "rgba(202,255,36,.055)",
  border:     "rgba(231,225,210,.12)",
  borderMid:  "rgba(231,225,210,.10)",
  borderHi:   "rgba(202,255,36,.55)",
  text:       "#f4f1ea",
  textMuted:  "rgba(244,241,234,.68)",
  textDim:    "rgba(244,241,234,.50)",
  textFaint:  "rgba(244,241,234,.34)",
  textGhost:  "rgba(244,241,234,.18)",
  navBg:      "rgba(10,10,9,.86)",
  accent:     "#caff24",
  accentHov:  "#dcff5a",
  accentText: "#dfff67",
  inputBg:    "rgba(244,241,234,.035)",
  inputBorder:"rgba(231,225,210,.14)",
  codeBg:     "#0d0d0b",
  heroBg:     "linear-gradient(180deg,rgba(202,255,36,.05) 0%,transparent 62%)",
  whyGlow:    "linear-gradient(180deg,rgba(202,255,36,.035) 0%,transparent 80%)",
  ctaGrad:    "linear-gradient(180deg,rgba(202,255,36,.05) 0%,transparent 100%)",
  skillBg:    "rgba(202,255,36,.08)",
  monoColor:  "rgba(202,255,36,.24)",
  shadowCard: "0 18px 48px rgba(0,0,0,.45)",
};

export const LIGHT = {
  bg:         "#f4f1ea",
  bgCard:     "#eeeae1",
  bgCard2:    "#e8e3d8",
  bgMuted:    "rgba(10,10,9,.025)",
  bgHover:    "rgba(10,10,9,.055)",
  border:     "rgba(10,10,9,.14)",
  borderMid:  "rgba(10,10,9,.11)",
  borderHi:   "rgba(10,10,9,.55)",
  text:       "#0a0a09",
  textMuted:  "rgba(10,10,9,.68)",
  textDim:    "rgba(10,10,9,.50)",
  textFaint:  "rgba(10,10,9,.34)",
  textGhost:  "rgba(10,10,9,.18)",
  navBg:      "rgba(244,241,234,.88)",
  accent:     "#0a0a09",
  accentHov:  "#2a2925",
  accentText: "#1b1a17",
  inputBg:    "rgba(10,10,9,.035)",
  inputBorder:"rgba(10,10,9,.16)",
  codeBg:     "#e8e3d8",
  heroBg:     "linear-gradient(180deg,rgba(10,10,9,.04) 0%,transparent 62%)",
  whyGlow:    "linear-gradient(180deg,rgba(10,10,9,.03) 0%,transparent 80%)",
  ctaGrad:    "linear-gradient(180deg,rgba(10,10,9,.04) 0%,transparent 100%)",
  skillBg:    "rgba(10,10,9,.08)",
  monoColor:  "rgba(10,10,9,.24)",
  shadowCard: "0 16px 40px rgba(10,10,9,.08)",
};

export type ThemeTokens = typeof DARK;

interface ThemeContextType {
  dark: boolean;
  toggle: () => void;
  t: ThemeTokens;
}

const ThemeCtx = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const toggle = () => setDark(d => !d);
  const t = dark ? DARK : LIGHT;

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', t.bg);
    document.documentElement.style.setProperty('--border-color', t.border);
    document.documentElement.style.setProperty('--text-color', t.text);
    document.documentElement.style.setProperty('--accent-color', t.accent);
    document.documentElement.style.setProperty('--shadow-card', t.shadowCard);
  }, [t]);

  return <ThemeCtx.Provider value={{ dark, toggle, t }}>{children}</ThemeCtx.Provider>;
}
