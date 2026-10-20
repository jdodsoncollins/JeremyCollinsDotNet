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
    let sheets: { idle: HTMLImageElement; petting: HTMLImageElement } | undefined;
    let loading = false;
    let failed = false;
    let disposed = false;
    let visible = false;
    let timer = 0;
    let lastFrameAt = 0;
    let step = 0;
    let drawStableFrame: ReturnType<typeof createStableHeroRenderer> | undefined;

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
    };
    const stop = () => {
      window.cancelAnimationFrame(timer);
      timer = 0;
    };
    const eligible = () => visible && document.documentElement.dataset.era === config.era && !document.hidden && !motion.matches;
    const active = () => eligible() && !!sheets && !failed;
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
      if (!eligible() || failed) {
        if (motion.matches) step = 0;
        delete root.dataset.ready;
        delete root.dataset.animation;
        return;
      }
      if (!sheets) {
        if (!loading) {
          loading = true;
          Promise.all([loadSheet(config.sheets.idle), loadSheet(config.sheets.petting)]).then(([idle, petting]) => {
            if (disposed) return;
            sheets = { idle, petting };
            sync();
          }).catch(() => {
            // Keep the original poster if either source cannot be decoded.
            failed = true;
          });
        }
        return;
      }
      // Prepare registered poses only while this art can actually animate.
      // Painting and timing below remain the same as the original player.
      if (config.stabilizeBodies && !drawStableFrame) {
        try {
          drawStableFrame = createStableHeroRenderer(context, sheets);
        } catch {
          failed = true;
          return;
        }
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

    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      eraObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      delete root.dataset.ready;
      delete root.dataset.animation;
    };
  }, [config]);

  return (
    <div ref={rootRef} className={`hero-art-shot hero-art-${config.era} animated-hero ${config.era === "modern" ? "modern-hero" : "retro-hero"}`} aria-hidden="true">
      <EraHeroImage era={config.era} className="hero-art-still modern-hero-poster" src={config.poster} width={config.width} height={config.height} alt="" decoding="async" />
      <canvas ref={spriteRef} className="modern-hero-sprite" width={config.width} height={config.height} />
    </div>
  );
}
