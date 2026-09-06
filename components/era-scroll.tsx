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
    let lastInput = 0;
    let liveTimer = 0;
    const reveals = new Set<Element>();

    const clearLive = () => {
      window.clearTimeout(liveTimer);
      liveTimer = window.setTimeout(() => {
        delete root.dataset.scrollLive;
      }, 260);
    };

    const commit = (now: number) => {
      const era = eraOf();
      const interval = 1000 / (FPS[era] ?? 30);
      if (lastCommit !== 0 && now - lastCommit < interval) return false;
      lastCommit = now;

      const y = window.scrollY;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      const raw = Math.min(56, Math.max(0, y * 0.16));
      const parallax = motion.matches ? 0 : snap(raw, STEP[era] ?? 1);

      root.style.setProperty("--era-parallax", `${parallax}px`);
      root.style.setProperty("--era-scroll", (y / max).toFixed(4));

      if (!motion.matches && Math.abs(y - lastY) >= (STEP[era] ?? 1) * 0.25) {
        root.dataset.scrollLive = "true";
        clearLive();
      }
      lastY = y;
      return true;
    };

    const loop = (now: number) => {
      commit(now);
      if (now - lastInput < 900) {
        raf = window.requestAnimationFrame(loop);
      } else {
        raf = 0;
        delete root.dataset.scrollLive;
      }
    };

    const kick = () => {
      lastInput = performance.now();
      if (motion.matches) {
        root.style.setProperty("--era-parallax", "0px");
        delete root.dataset.scrollLive;
        return;
      }
      if (!raf) raf = window.requestAnimationFrame(loop);
    };

    const onScroll = () => kick();
    const onMotion = () => {
      if (motion.matches) {
        root.style.setProperty("--era-parallax", "0px");
        delete root.dataset.scrollLive;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-in", entry.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const watchReveals = () => {
      document.querySelectorAll(".era-reveal").forEach((node) => {
        if (!reveals.has(node)) {
          observer.observe(node);
          reveals.add(node);
        }
      });
    };

    const eraObserver = new MutationObserver(() => {
      lastCommit = 0;
      kick();
    });
    eraObserver.observe(root, { attributes: true, attributeFilter: ["data-era"] });

    watchReveals();
    kick();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    motion.addEventListener("change", onMotion);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.clearTimeout(liveTimer);
      observer.disconnect();
      eraObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motion.removeEventListener("change", onMotion);
      delete root.dataset.scrollLive;
      root.style.removeProperty("--era-parallax");
      root.style.removeProperty("--era-scroll");
    };
  }, []);

  return null;
}
