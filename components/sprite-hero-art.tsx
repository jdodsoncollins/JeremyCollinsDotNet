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
    let frameStart = 0;
    let step = 0;
    let mode: keyof typeof config.sheets = "idle";
    let pendingInteraction = false;

    const smooth = config.era === "modern";
    // Mix premultiplied pixels on a scratch canvas. Source-over blending two
    // transparent poses would make their silhouettes pulse in opacity.
    const blend = document.createElement("canvas");
    blend.width = config.width;
    blend.height = config.height;
    const blendContext = blend.getContext("2d");
    const interacting = () => touching || performance.now() - lastScroll < 720;
    const nextPose = () => {
      if (mode === "idle" && (interacting() || pendingInteraction) && step === config.frameCount - 1) {
        return { mode: "petting" as const, step: 0 };
      }
      const next = (step + 1) % config.frameCount;
      return { mode: mode === "petting" && next === 0 && !interacting() ? "idle" as const : mode, step: next };
    };
    const paint = (target: CanvasRenderingContext2D, poseMode: keyof typeof sheets, frame: number) => {
      target.drawImage(sheets[poseMode],
        (frame % config.columns) * config.width,
        Math.floor(frame / config.columns) * config.height,
        config.width, config.height, 0, 0, config.width, config.height);
    };
    const draw = (fraction = 0) => {
      context.clearRect(0, 0, config.width, config.height);
      if (smooth && blendContext) {
        const next = nextPose();
        blendContext.clearRect(0, 0, config.width, config.height);
        blendContext.globalCompositeOperation = "source-over";
        blendContext.globalAlpha = 1 - fraction;
        paint(blendContext, mode, step);
        blendContext.globalCompositeOperation = "lighter";
        blendContext.globalAlpha = fraction;
        paint(blendContext, next.mode, next.step);
        blendContext.globalAlpha = 1;
        blendContext.globalCompositeOperation = "source-over";
        context.drawImage(blend, 0, 0);
      } else {
        paint(context, mode, step);
      }
      root.dataset.animation = mode;
    };
    const stop = () => {
      window.cancelAnimationFrame(timer);
      timer = 0;
    };
    const active = () => visible && document.documentElement.dataset.era === config.era && !document.hidden && !motion.matches && ready;
    const tick = (now: number) => {
      timer = 0;
      if (!active()) return;
      // Use elapsed time, not chained timeouts, so rendering work and scrolling
      // cannot accumulate drift. Resuming visibility establishes a fresh clock.
      while (now - frameStart >= config.frameMs[mode]) {
        frameStart += config.frameMs[mode];
        const next = nextPose();
        if (next.mode !== mode) pendingInteraction = false;
        mode = next.mode;
        step = next.step;
      }
      draw(smooth ? (now - frameStart) / config.frameMs[mode] : 0);
      timer = window.requestAnimationFrame(tick);
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
      frameStart = performance.now();
      timer = window.requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!active()) return;
      lastScroll = performance.now();
      if (mode === "idle") {
        pendingInteraction = true;
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || !active()) return;
      pointerId = event.pointerId;
      touching = true;
      if (mode === "idle") {
        pendingInteraction = true;
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
