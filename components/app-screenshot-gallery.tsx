"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AppScreenshot } from "@/components/app-screenshot";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/app-pages.module.css";

type Shot = { src: string; alt: string; label: string; width?: number; height?: number };

export function AppScreenshotGallery({ shots, appName, variant = "gallery", priorityFirst = false, label }: { shots: Shot[]; appName: string; variant?: "gallery" | "hero"; priorityFirst?: boolean; label?: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: false, index: 0 });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      const start = element.scrollLeft <= 2;
      const end = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
      const first = element.firstElementChild as HTMLElement | null;
      const items = [...element.children] as HTMLElement[];
      const index = items.reduce((nearest, item, i) => Math.abs(item.offsetLeft - (first?.offsetLeft ?? 0) - element.scrollLeft) < Math.abs(items[nearest].offsetLeft - (first?.offsetLeft ?? 0) - element.scrollLeft) ? i : nearest, 0);
      setEdges(previous => previous.start === start && previous.end === end && previous.index === index ? previous : { start, end, index });
    };
    const resize = new ResizeObserver(update);
    resize.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { resize.disconnect(); element.removeEventListener("scroll", update); };
  }, [shots.length]);

  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (variant === "hero") {
      const first = element.firstElementChild as HTMLElement | null;
      const next = element.children[Math.max(0, Math.min(shots.length - 1, edges.index + direction))] as HTMLElement | undefined;
      if (next) element.scrollTo({ left: next.offsetLeft - (first?.offsetLeft ?? 0), behavior: reduce ? "instant" : "smooth" });
    } else element.scrollBy({ left: direction * element.clientWidth * .8, behavior: reduce ? "instant" : "smooth" });
  }

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (variant !== "hero" || event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
  }

  return (
    <div className={`${styles.gallery}${variant === "hero" ? ` ${styles.heroGallery}` : ""}`} data-app-gallery={variant}>
      <div className={styles.galleryToolbar}><span aria-live={variant === "hero" ? "polite" : undefined}>{variant === "hero" ? `${edges.index + 1} of ${shots.length}` : `${shots.length} views of ${appName}`}</span><div><button type="button" aria-label="Previous screenshots" aria-controls={id} disabled={edges.start} onClick={() => move(-1)}><AppArrow direction="left" />{variant === "hero" ? <span>Previous</span> : null}</button><button type="button" aria-label="Next screenshots" aria-controls={id} disabled={edges.end} onClick={() => move(1)}>{variant === "hero" ? <span>Next</span> : null}<AppArrow direction="right" /></button></div></div>
      <div ref={rail} id={id} className={styles.galleryRail} tabIndex={0} role="region" aria-label={label ?? `${appName} ${variant === "hero" ? "featured screenshots" : "screenshot gallery"}`} onKeyDown={navigate}>
        {shots.map((shot, index) => <div className={styles.galleryItem} key={shot.src}><span className={styles.shotIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><AppScreenshot shot={shot} priority={priorityFirst && index === 0} sizes={variant === "hero" ? "(max-width: 760px) 86vw, (max-width: 1100px) 27vw, 310px" : undefined} /></div>)}
      </div>
      <p className={styles.galleryHint}>Swipe to browse · Select an image for the full-size view</p>
    </div>
  );
}
