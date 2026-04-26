import { useState, ReactNode, CSSProperties } from "react";
import { useTheme } from "../../lib/theme";

export function Tag({ children }: { children: ReactNode }) {
  const { t } = useTheme();
  return <span style={{ background:t.bgHover, color:t.textDim, fontFamily:"monospace", fontSize:".66rem", padding:".18rem .55rem", borderRadius:4, border:`1px solid ${t.border}`, letterSpacing:".04em" }}>{children}</span>;
}

interface BtnProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "white";
  style?: CSSProperties;
}

export function Btn({ children, onClick, variant="primary", style:s }: BtnProps) {
  const { t } = useTheme();
  const [h,setH]=useState(false);
  const base: CSSProperties = { fontFamily:"monospace", fontWeight:800, fontSize:".78rem", letterSpacing:".06em", textTransform:"uppercase", border:"none", cursor:"pointer", borderRadius:9, padding:".65rem 1.6rem", transition:"all .2s", display:"inline-flex", alignItems:"center", justifyContent:"center", ...s };
  
  const styles: Record<string, CSSProperties> = {
    primary:{ background:h?t.accentHov:t.accent, color:"#fff", transform:h?"translateY(-1px)":"none" },
    ghost:  { background:"transparent", color:h?t.accentText:t.textMuted, border:`1px solid ${h?"rgba(99,102,241,.5)":t.border}` },
    white:  { background:h?"#e5e7eb":"#fff", color:"#000", transform:h?"translateY(-2px)":"none" },
  };
  
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{...base,...styles[variant]}}>{children}</button>;
}
