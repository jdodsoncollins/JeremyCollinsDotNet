"use client";

import { useEffect, useRef } from "react";

export type HeroSpriteConfig = {
  era: "modern" | "1990s";
  sheets: { idle: string; petting: string };
  poster: string;
  width: number;
  height: number;
  frameCount: number;
  columns: number;
  rows: number;
  frameMs: { idle: number; petting: number };
};

export function SpriteHeroArt({ config }: { config: HeroSpriteConfig }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const sprite = spriteRef.current;
    if (!root || !sprite) return;
    const context = sprite.getContext("2d");
    if (!context) return;
    context.imageSmoothingEnabled = config.era !== "1990s";
    // Retain decoded sheets and paint whole cells on one surface. In particular,
    // Safari must not swap/re-rasterize a CSS background while scrolling.
    const sheets = { idle: new Image(), petting: new Image() };

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ready = false;
    let disposed = false;
    let visible = false;
    let touching = false;
    let pointerId: number | null = null;
    let lastScroll = -Infinity;
    let timer = 0;
    let step = 0;
    let mode: keyof typeof config.sheets = "idle";
    let pendingInteraction = false;

    const draw = () => {
      const frame = step;
      context.clearRect(0, 0, config.width, config.height);
      context.drawImage(sheets[mode],
        (frame % config.columns) * config.width,
        Math.floor(frame / config.columns) * config.height,
        config.width, config.height, 0, 0, config.width, config.height);
      root.dataset.animation = mode;
    };
    const stop = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
    const active = () => visible && document.documentElement.dataset.era === config.era && !document.hidden && !motion.matches && ready;
    const tick = () => {
      timer = 0;
      if (!active()) return;
      const interacting = touching || performance.now() - lastScroll < 720;
      // Complete a petting cycle before settling back to idle.
      if (mode === "idle" && (interacting || pendingInteraction) && (step === 0 || step === config.frameCount - 1)) {
        mode = "petting";
        step = 0;
        pendingInteraction = false;
      } else {
        step += 1;
        if (step >= config.frameCount) {
          step = 0;
          if (mode === "petting" && !interacting) mode = "idle";
        }
      }
      draw();
      timer = window.setTimeout(tick, config.frameMs[mode]);
    };
    const sync = () => {
      stop();
      if (!active()) {
        if (motion.matches) {
          mode = "idle";
          step = 0;
          delete root.dataset.ready;
          touching = false;
          pendingInteraction = false;
        }
        return;
      }
      root.dataset.ready = "true";
      draw();
      timer = window.setTimeout(tick, config.frameMs[mode]);
    };
    const onScroll = () => {
      if (!active()) return;
      lastScroll = performance.now();
      if (mode === "idle") {
        pendingInteraction = true;
        if (step === 0 || step === config.frameCount - 1) {
          stop();
          tick();
        }
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || !active()) return;
      pointerId = event.pointerId;
      touching = true;
      if (mode === "idle") {
        pendingInteraction = true;
        if (step === 0 || step === config.frameCount - 1) {
          stop();
          tick();
        }
      }
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

    const preload = (Object.keys(sheets) as Array<keyof typeof sheets>).map((key) => {
      const image = sheets[key];
      image.src = config.sheets[key];
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
  }, [config]);

  return (
    <div ref={rootRef} className={`hero-art-shot hero-art-${config.era} animated-hero ${config.era === "modern" ? "modern-hero" : "retro-hero"}`} aria-hidden="true">
      <img className="hero-art-still modern-hero-poster" src={config.poster} width={config.width} height={config.height} alt="" decoding="async" />
      <canvas ref={spriteRef} className="modern-hero-sprite" width={config.width} height={config.height} />
    </div>
  );
}
