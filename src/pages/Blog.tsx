import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../lib/theme";
import { useScrollReveal, srStyle } from "../hooks/useScrollReveal";
import { POSTS } from "../data";
import { PageWrapper } from "../components/PageWrapper";

const PostItem = ({ p, i, t, navigate }: any) => {
  const [h,setH] = useState(false);
  return (
    <button onClick={()=>navigate("/blogs/"+p.id)} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:"grid", gridTemplateColumns:"1fr auto", alignItems:"center", gap:"1.5rem", padding:"1.6rem 1.8rem", background:h?t.bgHover:t.bgCard, border:"none", cursor:"pointer", textAlign:"left", borderBottom:i<POSTS.length-1?`1px solid ${t.border}`:"none", transition:"background .18s" }}>
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:".7rem", marginBottom:".5rem" }}>
          <span style={{ background:t.bgMuted, color:t.accentText, fontFamily:"monospace", fontSize:".62rem", padding:".18rem .55rem", borderRadius:3, letterSpacing:".06em", border:`1px solid ${t.border}` }}>{p.tag}</span>
          <span style={{ fontFamily:"monospace", color:t.textFaint, fontSize:".68rem" }}>{p.date}</span>
        </div>
        <h2 style={{ color:t.text, fontWeight:800, fontSize:"1rem", letterSpacing:"-.02em", marginBottom:".4rem" }}>{p.title}</h2>
        <p style={{ color:t.textDim, fontSize:".8rem", lineHeight:1.65 }}>{p.desc}</p>
        <span style={{ fontFamily:"monospace", color:t.textFaint, fontSize:".68rem", marginTop:".5rem", display:"block" }}>{p.readTime}</span>
      </div>
      <span style={{ color:h?t.accent:t.textGhost, fontSize:"1.1rem", transition:"color .2s,transform .2s", transform:h?"translateX(4px)":"none", display:"block" }}>→</span>
    </button>
  );
};

export default function Blog() {
  const navigate = useNavigate();
  const ref = useScrollReveal();
  const { t } = useTheme();

  useEffect(() => { document.title = "Blogs | Hermawan Prastiyanto"; }, []);
  
  return (
    <PageWrapper>
      <div ref={ref} style={{ maxWidth:780, margin:"0 auto", padding:"7rem 1.5rem 5rem" }}>
        <p data-sr style={{ fontFamily:"monospace", color:t.accent, fontSize:".7rem", letterSpacing:".12em", textTransform:"uppercase", marginBottom:".6rem", ...srStyle(0) }}>Writing</p>
        <h1 data-sr style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:900, letterSpacing:"-.04em", color:t.text, marginBottom:".6rem", ...srStyle(80) }}>Blogs</h1>
        <p data-sr style={{ color:t.textMuted, fontFamily:"monospace", fontSize:".84rem", marginBottom:"3.5rem", ...srStyle(160) }}>Thoughts on AI, web development, and building things on the internet.</p>
        <div data-sr style={{ display:"grid", gap:"1px", background:t.border, border:`1px solid ${t.border}`, borderRadius:6, overflow:"hidden", ...srStyle(240) }}>
          {POSTS.map((p,i) => <PostItem key={p.id} p={p} i={i} t={t} navigate={navigate} />)}
        </div>
      </div>
    </PageWrapper>
  );
}
