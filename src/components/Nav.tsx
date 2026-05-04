import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../lib/theme";
import { Btn } from "./ui/Elements";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { t, dark } = useTheme();
  const [mob, setMob] = useState(false);

  const links = [{ label: "About", to: "/about" }, { label: "Projects", to: "/projects" }, { label: "Blogs", to: "/blogs" }];

  useEffect(() => { setMob(false); }, [path]);
  useEffect(() => { document.body.style.overflow = mob ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mob]);

  const isActive = (to: string) => path === to || (to === "/projects" && path.startsWith("/projects"));

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: t.navBg, backdropFilter: "blur(16px)", borderBottom: `1px solid ${t.borderMid}`, animation: "navIn .7s cubic-bezier(.22,1,.36,1) both", transition: "background .4s ease, border-color .4s ease" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link to="/" style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "1.15rem", color: t.text, textDecoration: "none", transition: "color .4s", letterSpacing: ".08em" }}>
            HP<span style={{ color: t.accent }}>.</span><span className="folio-wordmark" style={{ color: t.textMuted, marginLeft: ".35rem", letterSpacing: 0 }}>folio</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="desk-nav" style={{ gap: "2rem", alignItems: "center" }}>
              {links.map(l => (
                <Link key={l.to} to={l.to} className="link-line"
                  style={{ color: t.text, fontSize: ".95rem", fontFamily: "monospace", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
                  {l.label}
                </Link>
              ))}
              <ThemeSwitcher />
              <Btn onClick={() => navigate("/contact")}>Email Me</Btn>
            </div>
            <div className="ham-btn" style={{ gap: ".7rem", alignItems: "center" }}>
              <ThemeSwitcher />
              <button onClick={() => setMob(true)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 4, padding: ".42rem .55rem", cursor: "pointer", flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center", display: "flex" }}>
                {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 18, height: 1.5, background: t.text, transition: "background .4s" }} />)}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mob && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: t.bg, display: "flex", flexDirection: "column", padding: "1.5rem", animation: "fadeIn .22s ease both", transition: "background .4s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
            <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "1.3rem", color: t.text }}>HP<span style={{ color: t.accent }}>.</span></span>
            <button onClick={() => setMob(false)} style={{ background: t.bgHover, border: `1px solid ${t.border}`, borderRadius: 4, width: 40, height: 40, cursor: "pointer", color: t.textMuted, fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {links.map((l, i) => (
              <Link key={l.to} to={l.to}
                style={{ borderBottom: `1px solid ${t.border}`, color: t.textMuted, fontFamily: "monospace", fontWeight: 800, fontSize: "2rem", letterSpacing: "-.02em", padding: "1.2rem 0", display: "block", animation: `slideRight .3s ${i * .07}s ease both`, textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = t.text} onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>
                {l.label}
              </Link>
            ))}
          </div>
          <button onClick={() => { setMob(false); navigate("/contact"); }} style={{ width: "100%", background: t.accent, color: dark ? "#0a0a09" : "#ffffff", padding: ".9rem", borderRadius: 4, fontFamily: "monospace", fontWeight: 800, fontSize: "1rem", letterSpacing: ".08em", border: "none", cursor: "pointer", textTransform: "uppercase", marginBottom: "1rem" }}>Email Me →</button>
          <p style={{ fontFamily: "monospace", color: t.textFaint, fontSize: ".8rem", textAlign: "center" }}>hermawanprastiyanto@gmail.com</p>
        </div>
      )}
    </>
  );
}
