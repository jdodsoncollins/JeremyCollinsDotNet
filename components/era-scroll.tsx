"use client";

import { useEffect } from "react";

const FPS: Record<string, number> = {
  "1980s": 4,
  "1990s": 15,
  modern: 30,
};

const STEP: Record<string, number> = {
  "1980s": 8,
  "1990s": 3,
  modern: 1,
};

function eraOf() {
  return document.documentElement.dataset.era || "modern";
}

function snap(value: number, step: number) {
  if (step <= 1) return Math.round(value);
  return Math.round(value / step) * step;
}

export function EraScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let lastCommit = 0;
    let lastY = window.scrollY;
    let liveTimer = 0;
    let lastParallax: number | undefined;

    const clearLive = () => {
      window.clearTimeout(liveTimer);
      liveTimer = window.setTimeout(() => {
        delete root.dataset.scrollLive;
      }, 260);
    };

    const commit = (now: number) => {
      const era = eraOf();
      const interval = 1000 / (FPS[era] ?? 30);
      if (lastCommit !== 0 && now - lastCommit < interval) {
        raf = window.requestAnimationFrame(commit);
        return;
      }
      raf = 0;
      lastCommit = now;

      const y = window.scrollY;
      const raw = Math.min(56, Math.max(0, y * 0.16));
      const parallax = motion.matches ? 0 : snap(raw, STEP[era] ?? 1);

      if (parallax !== lastParallax) {
        root.style.setProperty("--era-parallax", `${parallax}px`);
        lastParallax = parallax;
      }

      if (!motion.matches && Math.abs(y - lastY) >= (STEP[era] ?? 1) * 0.25) {
        root.dataset.scrollLive = "true";
        clearLive();
      }
      lastY = y;
    };

    const kick = () => {
      if (motion.matches) {
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0;
        window.clearTimeout(liveTimer);
        root.style.setProperty("--era-parallax", "0px");
        lastParallax = 0;
        lastY = window.scrollY;
        delete root.dataset.scrollLive;
        return;
      }
      if (!raf) raf = window.requestAnimationFrame(commit);
    };

    const onScroll = () => kick();
    const onMotion = () => {
      lastCommit = 0;
      kick();
    };

    const eraObserver = new MutationObserver(() => {
      lastCommit = 0;
      kick();
    });
    eraObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-era"],
    });

    kick();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    motion.addEventListener("change", onMotion);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.clearTimeout(liveTimer);
      eraObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motion.removeEventListener("change", onMotion);
      delete root.dataset.scrollLive;
      root.style.removeProperty("--era-parallax");
    };
  }, []);

  return null;
}
