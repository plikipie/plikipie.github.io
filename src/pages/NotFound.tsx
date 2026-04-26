import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../lib/theme";
import { Btn } from "../components/ui/Elements";
import { PageWrapper } from "../components/PageWrapper";

export default function NotFound() {
  const { t } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { document.title = "404 Not Found | Hermawan Prastiyanto"; }, []);

  return (
    <PageWrapper>
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "clamp(4rem, 10vw, 8rem)", fontWeight: 900, color: t.text, lineHeight: 1, marginBottom: "1rem" }}>404</h1>
        <p style={{ fontFamily: "monospace", color: t.textFaint, fontSize: "1.2rem", marginBottom: "3rem" }}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Btn onClick={() => navigate("/")}>← Back to Home</Btn>
      </div>
    </PageWrapper>
  );
}
