import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../lib/theme";
import { useScrollReveal, srStyle } from "../hooks/useScrollReveal";
import { PROJECTS, WHY } from "../data";
import { PageWrapper } from "../components/PageWrapper";
import { AnimatedName } from "../components/ui/AnimatedName";
import { Btn, Tag } from "../components/ui/Elements";
import { Project } from "../types";

const WhyItem = ({ w, i, t }: any) => {
  const [h, setH] = useState(false);
  const { dark } = useTheme();
  return (
    <div
      data-sr
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        ...srStyle(i * 80),
        background: h ? t.bgHover : t.bgCard,
        border: `1px solid ${h ? t.borderHi : t.border}`,
        borderRadius: 6,
        padding: "1.45rem",
        minHeight: 190,
        transition: "all .25s",
        cursor: "default",
        transform: h ? "translateY(-3px)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.35rem",
          paddingBottom: "1rem",
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            color: t.accent,
            fontSize: ".78rem",
            letterSpacing: ".08em",
          }}
        >
          0{i + 1}
        </span>
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: dark ? w.color + "18" : "rgba(10,10,9,.055)",
            border: `1px solid ${dark ? w.color + "36" : t.border}`,
            fontSize: "1rem",
            filter: dark ? "none" : "grayscale(1)",
          }}
        >
          {w.icon}
        </span>
      </div>
      <h3
        style={{
          color: t.text,
          fontWeight: 800,
          fontSize: ".95rem",
          marginBottom: ".55rem",
        }}
      >
        {w.title}
      </h3>
      <p
        style={{
          color: t.textDim,
          fontSize: ".8rem",
          lineHeight: 1.72,
          fontFamily: "monospace",
          margin: 0,
        }}
      >
        {w.desc}
      </p>
    </div>
  );
};

const HomeProjectCard = ({ project, i }: { project: Project; i: number }) => {
  const navigate = useNavigate();
  const { dark, t } = useTheme();
  const [h, setH] = useState(false);
  const visualBg = dark
    ? project.gradient
    : "linear-gradient(135deg,#0a0a09,#3a3832)";

  return (
    <button
      onClick={() => navigate("/projects/" + project.id)}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="card-hover"
      style={{
        width: "100%",
        minHeight: 365,
        display: "grid",
        gridTemplateRows: "auto 128px 1fr",
        background: h ? t.bgHover : t.bgCard,
        border: `1px solid ${h ? t.borderHi : t.border}`,
        borderRadius: 6,
        overflow: "hidden",
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color .25s, background .25s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem 1.1rem",
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            color: t.accent,
            fontSize: ".74rem",
            fontWeight: 800,
            letterSpacing: ".08em",
          }}
        >
          0{i + 1}
        </span>
        <span
          style={{
            fontFamily: "monospace",
            color: t.textFaint,
            fontSize: ".68rem",
            letterSpacing: ".08em",
          }}
        >
          {project.year}
        </span>
      </div>
      <div
        style={{
          background: visualBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,rgba(0,0,0,.18),transparent 45%,rgba(0,0,0,.18))",
          }}
        />
        <span
          style={{
            position: "relative",
            fontSize: "3rem",
            transform: h ? "scale(1.08) rotate(-3deg)" : "scale(1)",
            transition: "transform .25s",
            filter: dark ? "none" : "grayscale(1)",
          }}
        >
          {project.icon}
        </span>
      </div>
      <div
        style={{
          padding: "1.2rem 1.1rem 1.15rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: ".35rem",
            flexWrap: "wrap",
            marginBottom: "1rem",
          }}
        >
          {project.stack.slice(0, 3).map((tk) => (
            <Tag key={tk}>{tk}</Tag>
          ))}
        </div>
        <h3
          style={{
            color: t.text,
            fontWeight: 900,
            fontSize: "1rem",
            lineHeight: 1.25,
            marginBottom: ".55rem",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: t.textDim,
            fontSize: ".82rem",
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
          }}
        >
          {project.short}
        </p>
        <div
          style={{
            marginTop: "1.2rem",
            paddingTop: "1rem",
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              color: h ? t.accent : t.textFaint,
              fontFamily: "monospace",
              fontSize: ".7rem",
              fontWeight: 800,
              letterSpacing: ".08em",
              transition: "color .2s",
            }}
          >
            CASE STUDY
          </span>
          <span
            style={{
              color: h ? t.accent : t.textGhost,
              fontFamily: "monospace",
              transform: h ? "translateX(4px)" : "none",
              transition: "color .2s, transform .2s",
            }}
          >
            →
          </span>
        </div>
      </div>
    </button>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const homeProjects = PROJECTS;
  useEffect(() => {
    document.title = "Hermawan Prastiyanto | Portfolio";
  }, []);

  return (
    <PageWrapper>
      <section
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          padding: "4rem 1.5rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="editorial-wrap" style={{ paddingTop: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".8rem",
              marginBottom: "3rem",
            }}
          >
            <span
              style={{
                color: t.accent,
                fontFamily: "monospace",
                fontWeight: 800,
                fontSize: "1.05rem",
              }}
            >
              01
            </span>
            <span
              style={{
                color: t.textDim,
                fontFamily: "monospace",
                fontSize: ".68rem",
                letterSpacing: ".18em",
                textTransform: "uppercase",
              }}
            >
              The Work
            </span>
          </div>
          <div
            className="hero-kicker-grid"
            style={{ alignItems: "start" }}
          >
            <div
              style={{ borderTop: `1px solid ${t.border}`, paddingTop: "1rem" }}
            >
              <p
                style={{
                  color: t.textFaint,
                  fontFamily: "monospace",
                  fontSize: ".68rem",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  marginBottom: ".7rem",
                }}
              >
                Available
              </p>
              <p
                style={{
                  color: t.accent,
                  fontFamily: "monospace",
                  fontWeight: 800,
                  fontSize: ".8rem",
                  margin: 0,
                }}
              >
                FOR PROJECTS
              </p>
            </div>
            <div>
              <div>
                <AnimatedName t={t} />
              </div>
              <p
                style={{
                  color: t.textMuted,
                  fontSize: ".98rem",
                  maxWidth: 620,
                  lineHeight: 1.9,
                  marginBottom: "2.3rem",
                  fontFamily: "monospace",
                }}
              >
                AI powered web developer based in Indonesia. I design and build
                sharp landing pages, dashboards, and portfolios with fast
                execution and clean front-end fundamentals.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: ".85rem",
                  flexWrap: "wrap",
                }}
              >
                <Btn variant="white" onClick={() => navigate("/projects")}>
                  SEE MY WORK ↓
                </Btn>
                <Btn variant="ghost" onClick={() => navigate("/contact")}>
                  GET IN TOUCH
                </Btn>
              </div>
            </div>
          </div>
          <div
            className="archive-grid"
            style={{ marginTop: "5.2rem" }}
          >
            {[
              [
                "2024",
                "First Builds",
                "Landing pages, portfolios, and compact business sites shipped with lean front-end stacks.",
              ],
              [
                "2025",
                "AI Workflow",
                "Claude, ChatGPT, and disciplined review loops speed up execution without losing taste.",
              ],
              [
                "2026",
                "Open Slots",
                "Taking remote projects for teams that need fast, polished web delivery.",
              ],
            ].map(([n, l, d]) => (
              <div className="archive-cell" key={l}>
                <div
                  style={{
                    color: t.accent,
                    fontWeight: 900,
                    fontSize: "3.8rem",
                    lineHeight: 1,
                    marginBottom: "1.5rem",
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    color: t.text,
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    marginBottom: "1rem",
                  }}
                >
                  {l}
                </div>
                <p
                  style={{
                    color: t.textDim,
                    fontSize: ".86rem",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div>
        <section id="work-sec" style={{ padding: "6rem 1.5rem" }}>
          <div className="editorial-wrap">
            <div
              data-sr
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "3rem",
                ...srStyle(0),
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "monospace",
                    color: t.accent,
                    fontSize: ".7rem",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    marginBottom: ".7rem",
                  }}
                >
                  02 Archive
                </p>
                <h2
                  style={{
                    fontSize: "2.4rem",
                    fontWeight: 900,
                    letterSpacing: "0",
                    color: t.text,
                  }}
                >
                  Selected Projects
                </h2>
              </div>
              <Link
                to="/projects"
                style={{
                  fontFamily: "monospace",
                  color: t.textFaint,
                  fontSize: ".75rem",
                  letterSpacing: ".06em",
                  transition: "color .2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = t.textFaint)
                }
              >
                VIEW ALL →
              </Link>
            </div>
            <div className="home-project-grid">
              {homeProjects.map((p, i) => (
                <div key={p.id} data-sr style={{ ...srStyle(80 + i * 80) }}>
                  <HomeProjectCard project={p} i={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            padding: "5rem 1.5rem 6rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="editorial-wrap" style={{ position: "relative" }}>
            <div
              data-sr
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "1.5rem",
                marginBottom: "2rem",
                paddingTop: "2rem",
                borderTop: `1px solid ${t.border}`,
                ...srStyle(0),
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "monospace",
                    color: t.accent,
                    fontSize: ".7rem",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    marginBottom: ".7rem",
                  }}
                >
                  03 Method
                </p>
                <h2
                  style={{
                    fontSize: "2.4rem",
                    fontWeight: 900,
                    letterSpacing: "0",
                    color: t.text,
                  }}
                >
                  Why Hire Me?
                </h2>
              </div>
              <p
                style={{
                  color: t.textDim,
                  fontFamily: "monospace",
                  fontSize: ".78rem",
                  lineHeight: 1.7,
                  maxWidth: 360,
                  margin: 0,
                }}
              >
                Practical process, fast execution, and clear client
                communication.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                gap: "1rem",
              }}
            >
              {WHY.map((w, i) => (
                <WhyItem key={w.title} w={w} i={i} t={t} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
