"use client";

import { useEffect, useRef } from "react";

const SHEETS = {
  idle: "/hero/hero-modern-v2-idle.webp",
  petting: "/hero/hero-modern-v2-petting.webp",
};
const IDLE_FRAMES = [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1];

export function ModernHeroArt() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const sprite = spriteRef.current;
    if (!root || !sprite) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ready = false;
    let disposed = false;
    let visible = false;
    let touching = false;
    let pointerId: number | null = null;
    let lastScroll = -Infinity;
    let timer = 0;
    let step = 0;
    let mode: keyof typeof SHEETS = "idle";

    const draw = () => {
      const frame = mode === "idle" ? IDLE_FRAMES[step] : step;
      sprite.style.backgroundImage = `url("${SHEETS[mode]}")`;
      sprite.style.backgroundPosition = `${(frame % 4) * 100 / 3}% ${Math.floor(frame / 4) * 100}%`;
      root.dataset.animation = mode;
    };
    const stop = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
    const active = () => visible && !document.hidden && !motion.matches && ready;
    const tick = () => {
      timer = 0;
      if (!active()) return;
      const interacting = touching || performance.now() - lastScroll < 720;
      // Complete a petting cycle before settling back to idle.
      if (mode === "idle" && interacting) {
        mode = "petting";
        step = 0;
      } else {
        step += 1;
        const count = mode === "idle" ? IDLE_FRAMES.length : 8;
        if (step >= count) {
          step = 0;
          if (mode === "petting" && !interacting) mode = "idle";
        }
      }
      draw();
      timer = window.setTimeout(tick, mode === "idle" ? 300 : 200);
    };
    const sync = () => {
      stop();
      if (!active()) {
        if (motion.matches) {
          mode = "idle";
          step = 0;
          delete root.dataset.ready;
          touching = false;
        }
        return;
      }
      root.dataset.ready = "true";
      draw();
      timer = window.setTimeout(tick, mode === "idle" ? 300 : 200);
    };
    const onScroll = () => {
      if (!active()) return;
      lastScroll = performance.now();
      if (mode === "idle") {
        stop();
        tick();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || !active()) return;
      pointerId = event.pointerId;
      touching = true;
      stop();
      tick();
    };
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      touching = false;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    const eraObserver = new MutationObserver(sync);
    eraObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-era"] });

    const preload = Object.values(SHEETS).map((src) => {
      const image = new Image();
      image.src = src;
      return image.decode();
    });
    Promise.all(preload).then(() => {
      if (disposed) return;
      ready = true;
      sync();
    }).catch(() => { /* The poster remains visible if a sheet cannot load. */ });

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    root.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      eraObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      root.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-art-shot hero-art-modern modern-hero" aria-hidden="true">
      <img className="hero-art-still modern-hero-poster" src="/hero/hero-modern-v2-still.webp" width={600} height={560} alt="" decoding="async" />
      <div ref={spriteRef} className="modern-hero-sprite" />
    </div>
  );
}
