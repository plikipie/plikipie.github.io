import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../lib/theme";
import { useScrollReveal, srStyle } from "../hooks/useScrollReveal";
import { PROJECTS, WHY } from "../data";
import { PageWrapper } from "../components/PageWrapper";
import { AnimatedName } from "../components/ui/AnimatedName";
import { Btn } from "../components/ui/Elements";
import { FeaturedCard, ProjectCard } from "../components/ui/Cards";

const WhyItem = ({ w, i, t }: any) => {
  const [h,setH] = useState(false);
  return (
    <div data-sr onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ background:h?t.bgHover:t.bgMuted, border:`1px solid ${h?w.color+"28":t.border}`, borderRadius:14, padding:"1.8rem 1.5rem", transition:"all .25s", cursor:"default", transform:h?"translateY(-4px)":"none", ...srStyle(i*80) }}>
      <div style={{ width:42, height:42, borderRadius:"50%", background:w.color+"12", border:`1px solid ${w.color}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", marginBottom:"1.2rem" }}>{w.icon}</div>
      <h3 style={{ color:t.text, fontWeight:800, fontSize:".92rem", marginBottom:".45rem" }}>{w.title}</h3>
      <p style={{ color:t.textDim, fontSize:".8rem", lineHeight:1.72, fontFamily:"monospace" }}>{w.desc}</p>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [vis, setVis] = useState(false);
  const scrollRef = useScrollReveal();
  const featured = PROJECTS.find(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);
  
  useEffect(() => { document.title = "Hermawan Prastiyanto | Portfolio"; }, []);
  useEffect(() => { const tm = setTimeout(() => setVis(true), 50); return () => clearTimeout(tm); }, []);
  const fade = (delay: number) => ({ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:`opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms,transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms` });

  return (
    <PageWrapper>
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"0 1.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"15%", right:"-5%", width:600, height:600, background:t.heroBg, pointerEvents:"none" }}/>
        <div style={{ maxWidth:1080, margin:"0 auto", width:"100%", paddingTop:"5rem" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:".45rem", background:"rgba(34,197,94,.08)", border:"1px solid rgba(34,197,94,.2)", borderRadius:999, padding:".28rem .85rem", marginBottom:"2rem", ...fade(100) }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", display:"block" }}/>
            <span style={{ fontFamily:"monospace", color:"#22c55e", fontSize:".68rem", letterSpacing:".08em" }}>AVAILABLE FOR PROJECTS</span>
          </div>
          <div style={{ ...fade(200) }}>
            <AnimatedName t={t}/>
          </div>
          <p style={{ color:t.textMuted, fontSize:"clamp(.88rem,1.8vw,.98rem)", maxWidth:480, lineHeight:1.85, marginBottom:"2.5rem", fontFamily:"monospace", ...fade(900) }}>
            AI-Powered Web Developer — fast, modern websites using solid front-end fundamentals and AI-assisted workflows.
          </p>
          <div style={{ display:"flex", gap:".85rem", flexWrap:"wrap", ...fade(1050) }}>
            <Btn variant="white" onClick={() => navigate("/projects")}>SEE MY WORK ↓</Btn>
            <Btn variant="ghost" onClick={() => navigate("/contact")}>GET IN TOUCH</Btn>
          </div>
          <div style={{ marginTop:"5rem", display:"flex", gap:"3.5rem", flexWrap:"wrap", ...fade(1200) }}>
            {[["4+","Projects"],["AI","Workflow"],["2×","Faster"],["IDN","Based"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"monospace", fontSize:"1.5rem", fontWeight:900, color:t.text, letterSpacing:"-.03em" }}>{n}</div>
                <div style={{ fontFamily:"monospace", fontSize:".65rem", color:t.textFaint, letterSpacing:".1em", textTransform:"uppercase", marginTop:".2rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div ref={scrollRef}>
        <section id="work-sec" style={{ padding:"6rem 1.5rem" }}>
          <div style={{ maxWidth:1080, margin:"0 auto" }}>
            <div data-sr style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"3rem", ...srStyle(0) }}>
              <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:900, letterSpacing:"-.04em", color:t.text }}>Projects</h2>
              <Link to="/projects" style={{ fontFamily:"monospace", color:t.textFaint, fontSize:".75rem", letterSpacing:".06em", transition:"color .2s", textDecoration:"none" }}
                onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.textFaint}>VIEW ALL →</Link>
            </div>
            <div data-sr style={{ marginBottom:"2rem", ...srStyle(80) }}>{featured&&<FeaturedCard project={featured}/>}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:"1.5rem" }}>
              {rest.map((p,i)=><div key={p.id} data-sr style={{ ...srStyle(i*80) }}><ProjectCard project={p}/></div>)}
            </div>
          </div>
        </section>

        <section style={{ padding:"6rem 1.5rem", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:900, height:400, background:t.whyGlow, pointerEvents:"none" }}/>
          <div style={{ maxWidth:1080, margin:"0 auto", position:"relative" }}>
            <h2 data-sr style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:900, letterSpacing:"-.04em", color:t.text, marginBottom:"3rem", ...srStyle(0) }}>Why Hire Me?</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1.5rem" }}>
              {WHY.map((w,i) => <WhyItem key={w.title} w={w} i={i} t={t} />)}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
