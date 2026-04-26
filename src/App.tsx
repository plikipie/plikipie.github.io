import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "./lib/theme";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import PostDetail from "./pages/PostDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { BackgroundOrnaments } from "./components/ui/BackgroundOrnaments";
import { CustomCursor } from "./components/ui/CustomCursor";

function AppShell() {
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTheme();
  
  return (
    <div style={{ background: t.bg, minHeight: "100vh", color: t.text, transition: "background .4s ease, color .4s ease", position: "relative" }}>
      <CustomCursor />
      <BackgroundOrnaments />
      <Nav />
      <div style={{ paddingTop: 60, position: "relative", zIndex: 10 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<PostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
