import { useEffect } from "react";
import { useTheme } from "../lib/theme";
import { useScrollReveal, srStyle } from "../hooks/useScrollReveal";
import { PROJECTS } from "../data";
import { PageWrapper } from "../components/PageWrapper";
import { FeaturedCard, ProjectCard } from "../components/ui/Cards";

export default function ProjectsPage() {
  const ref = useScrollReveal();
  const { t } = useTheme();
  const featured = PROJECTS.find(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  useEffect(() => { document.title = "Projects | Hermawan Prastiyanto"; }, []);
  
  return (
    <PageWrapper>
      <div ref={ref} style={{ maxWidth:1080, margin:"0 auto", padding:"7rem 1.5rem 5rem" }}>
        <h1 data-sr style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:900, letterSpacing:"-.04em", color:t.text, marginBottom:".6rem", ...srStyle(0) }}>All Projects</h1>
        <p data-sr style={{ color:t.textMuted, fontFamily:"monospace", fontSize:".84rem", marginBottom:"3.5rem", ...srStyle(80) }}>A collection of work — landing pages, dashboards, and everything in between.</p>
        <div data-sr style={{ marginBottom:"2rem", ...srStyle(160) }}>{featured && <FeaturedCard project={featured}/>}</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:"1.5rem" }}>
          {rest.map((p,i) => <div key={p.id} data-sr style={{ ...srStyle(160+i*80) }}><ProjectCard project={p}/></div>)}
        </div>
      </div>
    </PageWrapper>
  );
}
