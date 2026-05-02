import { useState } from "react";
import { useTheme } from "../../lib/theme";

export function ThemeSwitcher() {
  const { dark, toggle } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <button onClick={toggle} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      title={dark ? "Switch to Light" : "Switch to Dark"}
      style={{
        background: dark ? (hov?"rgba(202,255,36,.12)":"rgba(244,241,234,.04)") : (hov?"rgba(0,0,0,.1)":"rgba(0,0,0,.06)"),
        border: dark ? "1px solid rgba(231,225,210,.14)" : "1px solid rgba(0,0,0,.1)",
        borderRadius:4, width:40, height:40, cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"1.05rem", transition:"all .2s", flexShrink:0,
      }}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
