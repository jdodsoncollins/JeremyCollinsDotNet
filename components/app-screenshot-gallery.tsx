"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AppScreenshot } from "@/components/app-screenshot";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/app-pages.module.css";

type Shot = { src: string; alt: string; label: string };

export function AppScreenshotGallery({ shots, appName }: { shots: Shot[]; appName: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      const start = element.scrollLeft <= 2;
      const end = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
      setEdges(previous => previous.start === start && previous.end === end ? previous : { start, end });
    };
    const resize = new ResizeObserver(update);
    resize.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { resize.disconnect(); element.removeEventListener("scroll", update); };
  }, []);

  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollBy({ left: direction * element.clientWidth * .8, behavior: reduce ? "instant" : "smooth" });
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryToolbar}><span>{shots.length} views of {appName}</span><div><button type="button" aria-label="Previous screenshots" aria-controls={id} disabled={edges.start} onClick={() => move(-1)}><AppArrow direction="left" /></button><button type="button" aria-label="Next screenshots" aria-controls={id} disabled={edges.end} onClick={() => move(1)}><AppArrow direction="right" /></button></div></div>
      <div ref={rail} id={id} className={styles.galleryRail} tabIndex={0} role="region" aria-label={`${appName} screenshot gallery`}>
        {shots.map((shot, index) => <div className={styles.galleryItem} key={shot.src}><span className={styles.shotIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><AppScreenshot shot={shot} /></div>)}
      </div>
      <p className={styles.galleryHint}>Swipe to browse · Select an image for the full-size view</p>
    </div>
  );
}
