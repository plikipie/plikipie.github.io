import { useState, ReactNode, CSSProperties } from "react";
import { useTheme } from "../../lib/theme";

export function Tag({ children }: { children: ReactNode }) {
  const { t } = useTheme();
  return <span style={{ background:t.bgMuted, color:t.textDim, fontFamily:"monospace", fontSize:".66rem", padding:".18rem .55rem", borderRadius:3, border:`1px solid ${t.border}`, letterSpacing:".04em" }}>{children}</span>;
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
  const base: CSSProperties = { fontFamily:"monospace", fontWeight:800, fontSize:".78rem", letterSpacing:".06em", textTransform:"uppercase", border:"none", cursor:"pointer", borderRadius:4, padding:".72rem 1.55rem", transition:"all .2s", display:"inline-flex", alignItems:"center", justifyContent:"center", ...s };
  
  const styles: Record<string, CSSProperties> = {
    primary:{ background:h?t.accentHov:t.accent, color:"#0a0a09", transform:h?"translateY(-1px)":"none" },
    ghost:  { background:"transparent", color:h?t.accentText:t.textMuted, border:`1px solid ${h?t.borderHi:t.border}` },
    white:  { background:h?t.accentHov:t.accent, color:"#0a0a09", transform:h?"translateY(-2px)":"none" },
  };
  
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{...base,...styles[variant]}}>{children}</button>;
}
