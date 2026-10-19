"use client";

import { useEffect, useRef } from "react";
import { createStableHeroRenderer } from "@/lib/stable-hero-frames";

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
  stabilizeBodies?: boolean;
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
    let timer = 0;
    let lastFrameAt = 0;
    let step = 0;
    let drawStableFrame: ReturnType<typeof createStableHeroRenderer> | undefined;

    const draw = () => {
      const frame = step;
      if (drawStableFrame) {
        drawStableFrame("petting", frame);
      } else {
        context.clearRect(0, 0, config.width, config.height);
        context.drawImage(sheets.petting,
          (frame % config.columns) * config.width,
          Math.floor(frame / config.columns) * config.height,
          config.width, config.height, 0, 0, config.width, config.height);
      }
      root.dataset.animation = "petting";
    };
    const stop = () => {
      window.cancelAnimationFrame(timer);
      timer = 0;
    };
    const active = () => visible && document.documentElement.dataset.era === config.era && !document.hidden && !motion.matches && ready;
    const tick = (now: number) => {
      timer = 0;
      if (!active()) return;
      const elapsed = now - lastFrameAt;
      if (elapsed >= config.frameMs.petting) {
        step = (step + 1) % config.frameCount;
        lastFrameAt = now - elapsed % config.frameMs.petting;
        draw();
      }
      timer = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      stop();
      if (!active()) {
        if (motion.matches) {
          step = 0;
          delete root.dataset.ready;
          delete root.dataset.animation;
        }
        return;
      }
      root.dataset.ready = "true";
      draw();
      lastFrameAt = performance.now();
      timer = window.requestAnimationFrame(tick);
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
      if (config.stabilizeBodies) drawStableFrame = createStableHeroRenderer(context, sheets);
      ready = true;
      sync();
    }).catch(() => { /* The poster remains visible if a sheet cannot load. */ });

    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      eraObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [config]);

  return (
    <div ref={rootRef} className={`hero-art-shot hero-art-${config.era} animated-hero ${config.era === "modern" ? "modern-hero" : "retro-hero"}`} aria-hidden="true">
      <img className="hero-art-still modern-hero-poster" src={config.poster} width={config.width} height={config.height} alt="" decoding="async" />
      <canvas ref={spriteRef} className="modern-hero-sprite" width={config.width} height={config.height} />
    </div>
  );
}
