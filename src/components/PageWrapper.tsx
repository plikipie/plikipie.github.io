import { useState, useEffect, ReactNode } from "react";

export function PageWrapper({ children }: { children: ReactNode }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { 
    const t = requestAnimationFrame(() => setVis(true)); 
    return () => cancelAnimationFrame(t); 
  }, []);
  
  return (
    <div style={{ 
      opacity: vis ? 1 : 0, 
      transform: vis ? "translateY(0)" : "translateY(28px)", 
      transition: "opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)" 
    }}>
      {children}
    </div>
  );
}
