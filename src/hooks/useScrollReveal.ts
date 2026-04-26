import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll("[data-sr]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { 
          e.target.classList.add("sr-show");
          io.unobserve(e.target); 
        }
      });
    }, { threshold: 0.12 });
    
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  
  return ref;
}

export const srStyle = (delay: number = 0) => ({
  opacity: 0, 
  transform: "translateY(40px)",
  transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}ms,transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
});
