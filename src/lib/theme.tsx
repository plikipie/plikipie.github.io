import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export const DARK = {
  bg:         "#000",
  bgCard:     "#0a0a0a",
  bgCard2:    "#080808",
  bgMuted:    "rgba(255,255,255,.015)",
  bgHover:    "rgba(255,255,255,.03)",
  border:     "rgba(255,255,255,.07)",
  borderMid:  "rgba(255,255,255,.06)",
  borderHi:   "rgba(99,102,241,.3)",
  text:       "#fff",
  textMuted:  "rgba(255,255,255,.42)",
  textDim:    "rgba(255,255,255,.32)",
  textFaint:  "rgba(255,255,255,.2)",
  textGhost:  "rgba(255,255,255,.1)",
  navBg:      "rgba(0,0,0,.92)",
  accent:     "#6366f1",
  accentHov:  "#4f46e5",
  accentText: "#a5b4fc",
  inputBg:    "rgba(255,255,255,.03)",
  inputBorder:"rgba(255,255,255,.08)",
  codeBg:     "#080808",
  heroBg:     "radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 65%)",
  whyGlow:    "radial-gradient(ellipse,rgba(34,197,94,.03) 0%,transparent 70%)",
  ctaGrad:    "linear-gradient(180deg,rgba(99,102,241,.04) 0%,transparent 100%)",
  skillBg:    "rgba(255,255,255,.06)",
  monoColor:  "rgba(255,255,255,.15)",
  shadowCard: "0 20px 50px rgba(0,0,0,.5)",
};

export const LIGHT = {
  bg:         "#ffffff",
  bgCard:     "#fafafa",
  bgCard2:    "#f4f4f5",
  bgMuted:    "#fcfcfc",
  bgHover:    "#f4f4f5",
  border:     "#e4e4e7",
  borderMid:  "#d4d4d8",
  borderHi:   "#a1a1aa",
  text:       "#18181b",
  textMuted:  "#71717a",
  textDim:    "#a1a1aa",
  textFaint:  "#d4d4d8",
  textGhost:  "#e4e4e7",
  navBg:      "rgba(255,255,255,.9)",
  accent:     "#18181b",
  accentHov:  "#3f3f46",
  accentText: "#52525b",
  inputBg:    "#fafafa",
  inputBorder:"#e4e4e7",
  codeBg:     "#f4f4f5",
  heroBg:     "radial-gradient(circle,rgba(0,0,0,.04) 0%,transparent 65%)",
  whyGlow:    "radial-gradient(ellipse,rgba(0,0,0,.02) 0%,transparent 70%)",
  ctaGrad:    "linear-gradient(180deg,rgba(0,0,0,.02) 0%,transparent 100%)",
  skillBg:    "#f4f4f5",
  monoColor:  "rgba(0,0,0,.2)",
  shadowCard: "0 12px 32px rgba(0,0,0,.05)",
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
  const [dark, setDark] = useState(true);
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
