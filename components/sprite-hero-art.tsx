"use client";

import { useEffect, useRef } from "react";
import { EraHeroImage } from "@/components/era-hero-image";
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

// Keep decoded originals across era changes and route remounts. In particular,
// the Modern idle sheet remains the stable renderer's fixed body reference.
const decodedSheets = new Map<string, Promise<HTMLImageElement>>();

function loadSheet(source: string) {
  const cached = decodedSheets.get(source);
  if (cached) return cached;
  const image = new Image();
  image.src = source;
  const decoded = image.decode().then(() => image);
  decodedSheets.set(source, decoded);
  void decoded.catch(() => decodedSheets.delete(source));
  return decoded;
}

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
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean };
    }).connection;
    let sheets: { idle: HTMLImageElement; petting: HTMLImageElement } | undefined;
    let loading = false;
    let failed = false;
    let disposed = false;
    let visible = false;
    let timer = 0;
    let scrollFrame = 0;
    let idleRequest = 0;
    let loadTimer = 0;
    let step = 0;
    let introComplete = false;
    let hoverPlaying = false;
    let hoverFrames = 0;
    let lastScrollY = window.scrollY;
    let scrollOrigin = 0;
    let drawStableFrame: ReturnType<typeof createStableHeroRenderer> | undefined;
    // One authored pass, always below five seconds even if a later sheet is slower.
    const frameMs = Math.min(config.frameMs.petting, 4000 / config.frameCount);
    const pixelsPerFrame = 18;

    const draw = () => {
      if (!sheets) return;
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
      root.dataset.frame = String(step);
    };
    const stop = () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(scrollFrame);
      timer = 0;
      scrollFrame = 0;
    };
    const cancelLoad = () => {
      if (idleRequest) window.cancelIdleCallback(idleRequest);
      window.clearTimeout(loadTimer);
      idleRequest = 0;
      loadTimer = 0;
    };
    const eligible = () => visible && document.documentElement.dataset.era === config.era && !document.hidden && !motion.matches && !connection?.saveData;
    const active = () => eligible() && !!sheets && !failed;
    const tick = () => {
      timer = 0;
      if (!active()) return;
      if (hoverPlaying) {
        step = (step + 1) % config.frameCount;
        hoverFrames += 1;
        draw();
        if (hoverFrames === config.frameCount) {
          hoverPlaying = false;
          scrollOrigin = window.scrollY - step * pixelsPerFrame;
          root.dataset.playback = "held";
          return;
        }
        timer = window.setTimeout(tick, frameMs);
        return;
      }
      if (introComplete) return;
      step += 1;
      draw();
      if (step === config.frameCount - 1) {
        introComplete = true;
        scrollOrigin = window.scrollY - step * pixelsPerFrame;
        root.dataset.playback = "held";
        return;
      }
      timer = window.setTimeout(tick, frameMs);
    };
    const load = () => {
      idleRequest = 0;
      loadTimer = 0;
      if (!eligible() || disposed || loading || sheets || failed) return;
      loading = true;
      Promise.all([loadSheet(config.sheets.idle), loadSheet(config.sheets.petting)]).then(([idle, petting]) => {
        if (disposed) return;
        sheets = { idle, petting };
        sync();
      }).catch(() => {
        // Keep the original poster if either source cannot be decoded.
        failed = true;
      });
    };
    const sync = () => {
      stop();
      hoverPlaying = false;
      if (!eligible() || failed) {
        cancelLoad();
        delete root.dataset.ready;
        delete root.dataset.animation;
        delete root.dataset.playback;
        return;
      }
      if (!sheets) {
        // Prioritize the poster and document, then use the browser's idle budget.
        if (document.readyState === "complete" && !loading && !idleRequest && !loadTimer) {
          if (typeof window.requestIdleCallback === "function") idleRequest = window.requestIdleCallback(load, { timeout: 1200 });
          else loadTimer = window.setTimeout(load, 200);
        }
        return;
      }
      // Preserve the existing registered artwork and original pixel poses.
      if (config.stabilizeBodies && !drawStableFrame) {
        try {
          drawStableFrame = createStableHeroRenderer(context, sheets);
        } catch {
          failed = true;
          return;
        }
      }
      root.dataset.ready = "true";
      root.dataset.playback = introComplete ? "held" : "intro";
      draw();
      if (!introComplete) timer = window.setTimeout(tick, frameMs);
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (y === lastScrollY) return;
      lastScrollY = y;
      if (!active() || !introComplete || scrollFrame) return;
      if (hoverPlaying) {
        window.clearTimeout(timer);
        timer = 0;
        hoverPlaying = false;
        scrollOrigin = y - step * pixelsPerFrame;
        root.dataset.playback = "held";
      }
      // Coalesce actual scroll input into one paint, with no idle animation loop.
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        if (!active()) return;
        const next = ((Math.round((window.scrollY - scrollOrigin) / pixelsPerFrame) % config.frameCount) + config.frameCount) % config.frameCount;
        if (next !== step) {
          step = next;
          draw();
        }
      });
    };
    const onPointerEnter = () => {
      if (!hover.matches || !active() || !introComplete || hoverPlaying) return;
      stop();
      hoverPlaying = true;
      hoverFrames = 0;
      root.dataset.playback = "hover";
      timer = window.setTimeout(tick, frameMs);
    };
    const onPointerLeave = () => {
      if (!hoverPlaying) return;
      stop();
      hoverPlaying = false;
      scrollOrigin = window.scrollY - step * pixelsPerFrame;
      root.dataset.playback = "held";
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    const eraObserver = new MutationObserver(sync);
    eraObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-era"] });

    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    window.addEventListener("load", sync);
    window.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointerleave", onPointerLeave);

    return () => {
      disposed = true;
      stop();
      cancelLoad();
      observer.disconnect();
      eraObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
      window.removeEventListener("load", sync);
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
      delete root.dataset.ready;
      delete root.dataset.animation;
      delete root.dataset.frame;
      delete root.dataset.playback;
    };
  }, [config]);

  return (
    <div ref={rootRef} className={`hero-art-shot hero-art-${config.era} animated-hero ${config.era === "modern" ? "modern-hero" : "retro-hero"}`} aria-hidden="true">
      <EraHeroImage era={config.era} className="hero-art-still modern-hero-poster" src={config.poster} width={config.width} height={config.height} alt="" decoding="async" />
      <canvas ref={spriteRef} className="modern-hero-sprite" width={config.width} height={config.height} />
    </div>
  );
}
