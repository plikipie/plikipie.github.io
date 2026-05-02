import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../lib/theme";
import { useScrollReveal, srStyle } from "../hooks/useScrollReveal";
import { POSTS } from "../data";
import { PageWrapper } from "../components/PageWrapper";
import { Btn } from "../components/ui/Elements";

export default function PostDetail() {
  const navigate = useNavigate();
  const ref = useScrollReveal();
  const { t } = useTheme();
  const { id } = useParams();
  
  const post = POSTS.find(p => p.id === id);
  if (!post) return <PageWrapper><div style={{ maxWidth:680, margin:"0 auto", padding:"8rem 1.5rem", textAlign:"center" }}><p style={{ color:t.textMuted, fontFamily:"monospace" }}>Post not found.</p><Btn onClick={()=>navigate("/blogs")} style={{ marginTop:"1.5rem" }}>← All Posts</Btn></div></PageWrapper>;
  
  const idx = POSTS.findIndex(p => p.id === post.id);

  useEffect(() => { document.title = `${post.title} | Hermawan Prastiyanto`; }, [post.title]);
  
  return (
    <PageWrapper>
      <div ref={ref} style={{ maxWidth:680, margin:"0 auto", padding:"7rem 1.5rem 5rem" }}>
        <button data-sr onClick={()=>navigate("/blogs")} style={{ background:"none", border:"none", color:t.textFaint, fontFamily:"monospace", fontSize:".75rem", cursor:"pointer", marginBottom:"2.5rem", letterSpacing:".04em", padding:0, transition:"color .2s", ...srStyle(0) }} onMouseEnter={e=>e.currentTarget.style.color=t.text} onMouseLeave={e=>e.currentTarget.style.color=t.textFaint}>← Back to Blogs</button>
        <div data-sr style={{ display:"flex", alignItems:"center", gap:".7rem", marginBottom:"1.2rem", ...srStyle(80) }}>
          <span style={{ background:t.bgMuted, color:t.accentText, fontFamily:"monospace", fontSize:".65rem", padding:".2rem .6rem", borderRadius:3, letterSpacing:".06em", border:`1px solid ${t.border}` }}>{post.tag}</span>
          <span style={{ fontFamily:"monospace", color:t.textFaint, fontSize:".7rem" }}>{post.date} · {post.readTime}</span>
        </div>
        <h1 data-sr style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, letterSpacing:"-.04em", color:t.text, lineHeight:1.15, marginBottom:"2rem", ...srStyle(160) }}>{post.title}</h1>
        <p data-sr style={{ color:t.textMuted, fontSize:"1rem", lineHeight:1.8, marginBottom:"2.5rem", borderLeft:`2px solid ${t.borderHi}`, paddingLeft:"1.2rem", fontStyle:"italic", ...srStyle(240) }}>{post.desc}</p>
        
        <div style={{ display:"grid", gap:"2rem" }}>
          {post.content.map((s,i) => (
            <div key={i} data-sr style={{ ...srStyle(i*80) }}>
              <h2 style={{ color:t.text, fontWeight:800, fontSize:"1.05rem", marginBottom:".6rem", letterSpacing:"-.02em" }}>{s.h}</h2>
              <p style={{ color:t.textMuted, lineHeight:1.9, fontSize:".9rem" }}>{s.p}</p>
            </div>
          ))}
        </div>
        
        <div data-sr style={{ marginTop:"3.5rem", paddingTop:"2rem", borderTop:`1px solid ${t.borderMid}`, display:"flex", justifyContent:"space-between", ...srStyle(400) }}>
          <button onClick={()=>navigate("/blogs")} style={{ background:"none", border:"none", color:t.textFaint, fontFamily:"monospace", fontSize:".75rem", cursor:"pointer", transition:"color .2s", letterSpacing:".04em", padding:0 }} onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.textFaint}>← All posts</button>
          {idx<POSTS.length-1&&<button onClick={()=>navigate("/blogs/"+POSTS[idx+1].id)} style={{ background:"none", border:"none", color:t.textFaint, fontFamily:"monospace", fontSize:".75rem", cursor:"pointer", transition:"color .2s", letterSpacing:".04em", padding:0 }} onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.textFaint}>{POSTS[idx+1].title} →</button>}
        </div>
      </div>
    </PageWrapper>
  );
}
