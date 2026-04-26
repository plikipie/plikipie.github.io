import { useEffect, useState } from "react";
import { useTheme } from "../../lib/theme";

export function CustomCursor() {
  const { t } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame: number;

    // Check if device is touch
    if (window.matchMedia("(pointer: coarse)").matches) {
      setHidden(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      setRingPos({ x: ringX, y: ringY });
      frame = requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === "a" || 
          target.tagName.toLowerCase() === "button" || 
          target.closest("a") || 
          target.closest("button") ||
          target.closest(".interactive")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    frame = requestAnimationFrame(animateRing);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Dot (Instant Follow) */}
      <div 
        style={{
          position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999,
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          width: 8, height: 8, borderRadius: "50%",
          background: t.accent,
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
          opacity: pos.x === -100 || hovered ? 0 : 1,
        }}
      />
      {/* Ring (Trailing Physics) */}
      <div 
        style={{
          position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9998,
          transform: `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`,
          width: hovered ? 46 : 28, height: hovered ? 46 : 28, borderRadius: "50%",
          border: `1px solid ${hovered ? t.accent : t.borderMid}`,
          background: hovered ? "rgba(99,102,241,0.1)" : "transparent",
          transition: "width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s, background 0.2s",
          opacity: ringPos.x === -100 ? 0 : 1,
        }}
      />
    </>
  );
}
