import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../lib/theme";
import { useScrollReveal, srStyle } from "../hooks/useScrollReveal";
import { PROJECTS } from "../data";
import { PageWrapper } from "../components/PageWrapper";
import { Btn } from "../components/ui/Elements";

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dark, t } = useTheme();
  const ref = useScrollReveal();
  const project = PROJECTS.find(p => p.id === id);
  const [ctaHov, setCtaHov] = useState(false);
  
  if (!project) return <PageWrapper><div style={{ maxWidth:1080, margin:"0 auto", padding:"8rem 1.5rem", textAlign:"center" }}><h1 style={{ color:t.text }}>Project not found</h1><Btn onClick={()=>navigate("/projects")} style={{ marginTop:"2rem" }}>Back to Projects</Btn></div></PageWrapper>;

  useEffect(() => { document.title = `${project.title} | Hermawan Prastiyanto`; }, [project.title]);

  const idx = PROJECTS.findIndex(p => p.id === project.id);
  
  return (
    <PageWrapper>
      <div ref={ref}>
        <div style={{ background:dark?project.bg:"linear-gradient(135deg,#0a0a09,#3a3832)", padding:"8rem 1.5rem 5rem", borderBottom:`1px solid ${t.borderMid}` }}>
          <div style={{ maxWidth:1080, margin:"0 auto" }}>
            <button data-sr onClick={()=>navigate("/projects")} style={{ background:"none", border:"none", color:"rgba(255,255,255,.4)", fontFamily:"monospace", fontSize:".75rem", cursor:"pointer", marginBottom:"2rem", letterSpacing:".04em", padding:0, transition:"color .2s", ...srStyle(0) }} onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.4)"}>← Back to Profile</button>
            <div data-sr style={{ display:"flex", gap:".5rem", marginBottom:"1.2rem", flexWrap:"wrap", ...srStyle(80) }}>{project.stack.map(tk=><span key={tk} style={{ background:"rgba(255,255,255,.1)", color:"rgba(255,255,255,.6)", fontFamily:"monospace", fontSize:".66rem", padding:".18rem .55rem", borderRadius:4, border:"1px solid rgba(255,255,255,.15)", letterSpacing:".04em" }}>{tk}</span>)}</div>
            <h1 data-sr style={{ fontSize:"clamp(2rem,5vw,3.8rem)", fontWeight:900, letterSpacing:"-.04em", color:"#fff", marginBottom:".8rem", ...srStyle(160) }}>{project.title}</h1>
            <p data-sr style={{ color:"rgba(255,255,255,.5)", fontFamily:"monospace", fontSize:".88rem", maxWidth:540, ...srStyle(240) }}>{project.tagline}</p>
            <div data-sr style={{ display:"flex", gap:"3rem", marginTop:"2.5rem", ...srStyle(320) }}>
              {[["Year",project.year],["Role",project.role]].map(([k,v])=>(
                <div key={k}><div style={{ fontFamily:"monospace", color:"rgba(255,255,255,.3)", fontSize:".65rem", letterSpacing:".1em", textTransform:"uppercase" }}>{k}</div><div style={{ color:"#fff", fontWeight:600, marginTop:".2rem", fontSize:".88rem" }}>{v}</div></div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ maxWidth:720, margin:"0 auto", padding:"4rem 1.5rem 0" }}>
          <p data-sr style={{ color:t.textMuted, lineHeight:1.9, fontSize:".92rem", marginBottom:"3rem", ...srStyle(0) }}>{project.desc}</p>
          <div data-sr style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:t.border, border:`1px solid ${t.border}`, borderRadius:12, overflow:"hidden", marginBottom:"3rem", ...srStyle(80) }}>
            {project.results.map(r=><div key={r} style={{ padding:"1.2rem", background:t.bg, textAlign:"center" }}><div style={{ color:t.accent, fontFamily:"monospace", fontWeight:700, fontSize:".78rem" }}>{r}</div></div>)}
          </div>
          <div style={{ display:"grid", gap:"2.5rem" }}>
            {project.sections.map((s,i)=>(
              <div key={i} data-sr style={{ paddingLeft:"1.4rem", borderLeft:`2px solid ${dark?project.color+"30":t.borderHi}`, ...srStyle(i*100) }}>
                <h3 style={{ color:t.text, fontWeight:800, fontSize:".92rem", marginBottom:".5rem" }}>{s.title}</h3>
                <p style={{ color:t.textMuted, lineHeight:1.85, fontSize:".86rem" }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div data-sr style={{ marginTop:"4rem", paddingTop:"2rem", borderTop:`1px solid ${t.borderMid}`, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem", paddingBottom:"4rem", ...srStyle(300) }}>
            {idx>0&&<button onClick={()=>navigate("/projects/"+PROJECTS[idx-1].id)} style={{ background:"none", border:"none", color:t.textFaint, fontFamily:"monospace", fontSize:".75rem", cursor:"pointer", transition:"color .2s", letterSpacing:".04em", padding:0 }} onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.textFaint}>← {PROJECTS[idx-1].title}</button>}
            {idx<PROJECTS.length-1&&<button onClick={()=>navigate("/projects/"+PROJECTS[idx+1].id)} style={{ background:"none", border:"none", color:t.textFaint, fontFamily:"monospace", fontSize:".75rem", cursor:"pointer", marginLeft:"auto", transition:"color .2s", letterSpacing:".04em", padding:0 }} onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.textFaint}>{PROJECTS[idx+1].title} →</button>}
          </div>
        </div>
        
        <div data-sr style={{ borderTop:`1px solid ${t.borderMid}`, background:t.ctaGrad, padding:"5rem 1.5rem", textAlign:"center", ...srStyle(0) }}>
          <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:900, letterSpacing:"-.04em", color:t.text, marginBottom:".75rem" }}>Interested in working with me?</h2>
          <p style={{ color:t.textMuted, fontFamily:"monospace", fontSize:".88rem", marginBottom:"2rem" }}>Let's build something great together.</p>
          <button onClick={()=>navigate("/contact")} onMouseEnter={()=>setCtaHov(true)} onMouseLeave={()=>setCtaHov(false)}
            style={{ background:ctaHov?t.accentHov:t.accent, color:"#0a0a09", padding:".75rem 2rem", borderRadius:4, fontFamily:"monospace", fontWeight:800, fontSize:".82rem", letterSpacing:".08em", border:"none", cursor:"pointer", transition:"all .2s", transform:ctaHov?"translateY(-2px)":"none", boxShadow:ctaHov?`0 10px 28px ${t.borderHi}`:"none" }}>
            EMAIL ME →
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
