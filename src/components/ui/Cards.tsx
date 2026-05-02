import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../lib/theme";
import { Project } from "../../types";
import { Tag } from "./Elements";

export function FeaturedCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const { dark, t } = useTheme();
  const [h,setH] = useState(false);
  const visualBg = dark ? project.gradient : "linear-gradient(135deg,#0a0a09,#3a3832)";
  return (
    <button onClick={()=>navigate("/projects/"+project.id)} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      className="feat-grid card-hover"
      style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, background:h?t.bgHover:t.bgCard, border:`1px solid ${h?t.borderHi:t.border}`, borderRadius:6, overflow:"hidden", cursor:"pointer", textAlign:"left", width:"100%", transition:"border-color .3s, background .3s" }}>
      <div style={{ background:visualBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"5rem", minHeight:250, position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.1)" }}/>
        <span style={{ position:"relative", filter:dark?"none":"grayscale(1)" }}>{project.icon}</span>
        <div style={{ position:"absolute", top:"1rem", left:"1rem", background:"rgba(10,10,9,.68)", backdropFilter:"blur(8px)", border:`1px solid ${t.border}`, borderRadius:3, padding:".22rem .55rem", fontFamily:"monospace", color:t.textMuted, fontSize:".65rem", letterSpacing:".06em" }}>Featured</div>
      </div>
      <div style={{ padding:"2rem", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div>
          <div style={{ display:"flex", gap:".4rem", flexWrap:"wrap", marginBottom:"1.2rem" }}>{project.stack.map(tk=><Tag key={tk}>{tk}</Tag>)}</div>
          <h3 style={{ color:t.text, fontWeight:900, fontSize:"1.3rem", letterSpacing:"-.03em", marginBottom:".6rem", lineHeight:1.2 }}>{project.title}</h3>
          <p style={{ color:t.textMuted, fontSize:".85rem", lineHeight:1.75 }}>{project.short}</p>
        </div>
        <div style={{ marginTop:"1.6rem", display:"flex", alignItems:"center", gap:".4rem", color:h?t.accent:t.textFaint, fontFamily:"monospace", fontSize:".75rem", fontWeight:800, letterSpacing:".06em", transition:"color .2s" }}>
          VIEW CASE STUDY <span style={{ transition:"transform .2s", transform:h?"translateX(5px)":"none", display:"inline-block" }}>→</span>
        </div>
      </div>
    </button>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const { dark, t } = useTheme();
  const [h,setH] = useState(false);
  const visualBg = dark ? project.gradient : "linear-gradient(135deg,#0a0a09,#3a3832)";
  return (
    <button onClick={()=>navigate("/projects/"+project.id)} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      className="card-hover"
      style={{ display:"flex", flexDirection:"column", background:h?t.bgHover:t.bgCard, border:`1px solid ${h?t.borderHi:t.border}`, borderRadius:6, overflow:"hidden", cursor:"pointer", textAlign:"left", width:"100%", transition:"border-color .3s, background .3s" }}>
      <div style={{ height:175, background:visualBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"3.2rem", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.12)" }}/>
        <span style={{ position:"relative", filter:dark?"none":"grayscale(1)" }}>{project.icon}</span>
        <div style={{ position:"absolute", top:".8rem", right:".8rem", background:"rgba(10,10,9,.68)", backdropFilter:"blur(8px)", border:`1px solid ${t.border}`, borderRadius:3, padding:".2rem .5rem", fontFamily:"monospace", color:t.textMuted, fontSize:".62rem", letterSpacing:".06em" }}>{project.year}</div>
      </div>
      <div style={{ padding:"1.4rem", flex:1, display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", gap:".35rem", flexWrap:"wrap", marginBottom:".8rem" }}>{project.stack.map(tk=><Tag key={tk}>{tk}</Tag>)}</div>
        <h3 style={{ color:t.text, fontWeight:800, fontSize:".95rem", letterSpacing:"-.02em", marginBottom:".4rem" }}>{project.title}</h3>
        <p style={{ color:t.textDim, fontSize:".8rem", lineHeight:1.7, flex:1 }}>{project.short}</p>
        <div style={{ marginTop:"1.2rem", display:"flex", alignItems:"center", gap:".35rem", color:h?t.accent:t.textGhost, fontFamily:"monospace", fontSize:".72rem", fontWeight:800, letterSpacing:".06em", transition:"color .2s" }}>
          VIEW CASE STUDY <span style={{ transition:"transform .2s", transform:h?"translateX(4px)":"none", display:"inline-block" }}>→</span>
        </div>
      </div>
    </button>
  );
}
