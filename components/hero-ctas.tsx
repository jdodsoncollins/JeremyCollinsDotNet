"use client";

import { useEffect, useRef } from "react";

const MAG = 0.28;
const RADIUS = 118;
const LIFT = 10;

function resetDock(root: HTMLElement) {
  const icons = root.querySelectorAll<HTMLElement>(".hero-cta-icon");
  for (const icon of icons) {
    icon.style.transform = "";
    const cta = icon.closest<HTMLElement>(".hero-cta");
    if (cta) cta.style.zIndex = "";
  }
}

export function HeroCtas({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      if (root.dataset.era !== "modern" && rootRef.current) {
        resetDock(rootRef.current);
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-era"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="hero-ctas"
      onPointerMove={(event) => {
        const root = rootRef.current;
        if (!root) return;
        if (event.pointerType !== "mouse") return;
        if (document.documentElement.dataset.era !== "modern") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const icons = root.querySelectorAll<HTMLElement>(".hero-cta-icon");
        for (const icon of icons) {
          const rect = icon.getBoundingClientRect();
          const dx = Math.abs(event.clientX - (rect.left + rect.width / 2));
          const t = Math.max(0, 1 - (dx / RADIUS) ** 2);
          const scale = 1 + MAG * t;
          icon.style.transform = `translateY(${-(LIFT * t)}px) scale(${scale})`;
          const cta = icon.closest<HTMLElement>(".hero-cta");
          if (cta) cta.style.zIndex = String(Math.round(1 + t * 6));
        }
      }}
      onPointerLeave={() => {
        if (rootRef.current) resetDock(rootRef.current);
      }}
    >
      {children}
    </div>
  );
}
