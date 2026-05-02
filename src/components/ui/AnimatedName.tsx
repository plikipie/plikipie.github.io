import { useState, useEffect, useRef } from "react";
import { ThemeTokens } from "../../lib/theme";

export function AnimatedName({ t }: { t: ThemeTokens }) {
  const first = "Hermawan";
  const second = "Prastiyanto";
  const [show, setShow] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => { 
    const tm = setTimeout(() => setShow(true), 300); 
    const tm2 = setTimeout(() => setInteractive(true), 1800); // Activate hover effect after entry animation
    return () => { clearTimeout(tm); clearTimeout(tm2); }; 
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    spansRef.current.forEach((span) => {
      if (!span) return;
      const rect = span.getBoundingClientRect();
      const spanX = rect.left + rect.width / 2;
      const spanY = rect.top + rect.height / 2;
      
      const dx = mouseX - spanX;
      const dy = mouseY - spanY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const maxDist = 200; // Radius sensor efek
      if (distance < maxDist) {
        // Kurva eksponensial agar tarikan di dekat kursor lebih kuat
        const force = Math.pow((maxDist - distance) / maxDist, 1.2); 
        const rand = parseFloat(span.dataset.rand || "1");
        
        // Memecah/mendorong huruf menjauhi kursor
        const pushX = -(dx / distance) * force * (90 * rand);
        const pushY = -(dy / distance) * force * (90 * rand);
        const rotate = -(dx / distance) * force * (70 * rand);
        
        span.style.transform = `translate(${pushX}px, ${pushY}px) rotate(${rotate}deg) rotateX(0deg) scale(${1 + force*0.3})`;
        span.style.color = force > 0.4 ? t.accent : span.dataset.color || t.text;
        span.style.transition = "transform 0.15s ease-out, color 0.15s ease-out";
        span.style.zIndex = "10";
      } else {
        span.style.transform = `translate(0px, 0px) rotate(0deg) rotateX(0deg) scale(1)`;
        span.style.color = span.dataset.color || t.text;
        span.style.transition = "transform 0.6s cubic-bezier(.22,1,.36,1), color 0.6s ease";
        span.style.zIndex = "1";
      }
    });
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    spansRef.current.forEach((span) => {
      if (!span) return;
      span.style.transform = `translate(0px, 0px) rotate(0deg) rotateX(0deg) scale(1)`;
      span.style.color = span.dataset.color || t.text;
      span.style.transition = "transform 0.8s cubic-bezier(.22,1,.36,1), color 0.8s ease";
      span.style.zIndex = "1";
    });
  };

  const renderWord = (word: string, baseDelay: number, color: string, offset: number) =>
    word.split("").map((ch, i) => {
      // Konstanta acak per huruf untuk efek pecah yang natural (chaos)
      const rand = (Math.random() * 1.5 + 0.5).toFixed(2);
      return (
        <span 
          key={i} 
          ref={el => spansRef.current[offset + i] = el}
          data-color={color}
          data-rand={rand}
          style={{ 
            display:"inline-block", 
            position: "relative",
            opacity:show?1:0, 
            transform:show?"translateY(0px) rotateX(0deg)":"translateY(60px) rotateX(-80deg)", 
            transition: interactive ? "transform 0.5s cubic-bezier(.22,1,.36,1)" : `opacity .4s ease ${baseDelay+i*38}ms,transform .5s cubic-bezier(.22,1,.36,1) ${baseDelay+i*38}ms`, 
            transformOrigin:"center", 
            color,
            pointerEvents: "none" 
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      );
    });
    
  return (
    <h1 
      className="animated-name"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ fontWeight:900, lineHeight:.98, letterSpacing:"0", marginBottom:"1.5rem", perspective:800, cursor:"crosshair", position:"relative", zIndex:20 }}
    >
      <div style={{ overflow: interactive ? "visible" : "hidden", paddingBottom:".1em" }}>
        {renderWord(first,  500, t.text, 0)}
      </div>
      <div style={{ overflow: interactive ? "visible" : "hidden", paddingBottom:".1em" }}>
        {renderWord(second, 500+first.length*38-80, t.accent, first.length)}
      </div>
    </h1>
  );
}
