import { useState, useEffect } from "react";
import { useTheme } from "../lib/theme";
import { useScrollReveal, srStyle } from "../hooks/useScrollReveal";
import { SKILLS } from "../data";
import { PageWrapper } from "../components/PageWrapper";

const SkillItem = ({ s, t }: any) => {
  const [h,setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ padding:"1.2rem", background:h?t.bgHover:t.bgCard, transition:"background .18s", cursor:"default" }}>
      <div style={{ width:30, height:30, borderRadius:7, background:s.color+"14", border:`1px solid ${s.color}22`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:".7rem", color: s.color }} dangerouslySetInnerHTML={{ __html: s.svg }} />
      <div style={{ color:t.text, fontWeight:700, fontSize:".84rem", marginBottom:".15rem" }}>{s.name}</div>
      <div style={{ color:t.textFaint, fontFamily:"monospace", fontSize:".68rem" }}>{s.sub}</div>
    </div>
  );
};

export default function About() {
  const ref = useScrollReveal();
  const { t } = useTheme();

  useEffect(() => { document.title = "About | Hermawan Prastiyanto"; }, []);

  return (
    <PageWrapper>
      <div ref={ref} style={{ maxWidth:780, margin:"0 auto", padding:"7rem 1.5rem 5rem" }}>
        <p data-sr style={{ fontFamily:"monospace", color:t.accent, fontSize:".7rem", letterSpacing:".12em", textTransform:"uppercase", marginBottom:".6rem", ...srStyle(0) }}>About</p>
        <h1 data-sr style={{ fontSize:"clamp(2rem,5vw,3.2rem)", fontWeight:900, letterSpacing:"-.04em", color:t.text, marginBottom:"2.5rem", ...srStyle(80) }}>Hi, I'm Hermawan.</h1>
        {["I'm a web developer based in Indonesia. I build fast, modern websites by combining solid front-end fundamentals — HTML, CSS, Tailwind, JavaScript — with AI tools like Claude and ChatGPT.",
          "My workflow lets me move faster than traditional development without sacrificing design quality or code cleanliness. What might take a week elsewhere, I turn around in a day or two.",
          "I focus on the details that matter: clean typography, tight spacing, mobile responsiveness, and performance. Every project gets the same level of care.",
        ].map((tx,i)=><p key={i} data-sr style={{ color:t.textMuted, lineHeight:1.9, fontSize:".92rem", marginBottom:"1.2rem", ...srStyle(160+i*80) }}>{tx}</p>)}
        
        <div data-sr style={{ marginTop:"3rem", paddingTop:"2.5rem", borderTop:`1px solid ${t.borderMid}`, ...srStyle(400) }}>
          <h2 style={{ color:t.text, fontWeight:800, fontSize:"1.1rem", letterSpacing:"-.02em", marginBottom:"1.4rem" }}>My tech stack</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:"1px", background:t.border, border:`1px solid ${t.border}`, borderRadius:12, overflow:"hidden", marginBottom:"2.5rem" }}>
            {SKILLS.map(s => <SkillItem key={s.name} s={s} t={t} />)}
          </div>
        </div>
        
        <div data-sr style={{ ...srStyle(480) }}>
          <h2 style={{ color:t.text, fontWeight:800, fontSize:"1.1rem", letterSpacing:"-.02em", marginBottom:"1.4rem" }}>How I work</h2>
          <div style={{ display:"grid", gap:"1.5rem" }}>
            {[{n:"01",t:"Understand the brief",b:"Before writing a single line of code, I spend time understanding what the site needs to do and who it's for."},
              {n:"02",t:"Design in the browser",b:"I build designs directly with Tailwind — faster than Figma-to-code for most projects."},
              {n:"03",t:"AI-accelerated execution",b:"Claude and ChatGPT handle the repetition, letting me focus on design quality and architecture."},
            ].map(c => (
              <div key={c.n} style={{ padding:"1.4rem", border:`1px solid ${t.border}`, borderRadius:12, background:t.bgCard2, display:"grid", gridTemplateColumns:"36px 1fr", gap:"1rem", alignItems:"start" }}>
                <span style={{ fontFamily:"monospace", color:t.accent, fontSize:".7rem", letterSpacing:".08em", paddingTop:".15rem" }}>{c.n}</span>
                <div>
                  <div style={{ color:t.text, fontWeight:700, marginBottom:".4rem", fontSize:".88rem" }}>{c.t}</div>
                  <div style={{ color:t.textDim, fontSize:".8rem", lineHeight:1.75 }}>{c.b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div data-sr style={{ marginTop:"3rem", display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1px", background:t.border, border:`1px solid ${t.border}`, borderRadius:12, overflow:"hidden", ...srStyle(560) }}>
          {[["Location","Indonesia (Remote)"],["Available","Yes — new projects"],["Response","< 24 hours"],["Languages","Indonesian, English"]].map(([k,v])=>(
            <div key={k} style={{ padding:"1.1rem 1.4rem", background:t.bgCard }}>
              <div style={{ fontFamily:"monospace", color:t.textFaint, fontSize:".65rem", letterSpacing:".08em", textTransform:"uppercase", marginBottom:".25rem" }}>{k}</div>
              <div style={{ color:t.text, fontWeight:600, fontSize:".86rem" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
