"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./tabforge-overview.module.css";

export function TabForgeOverview({ square = false }: { square?: boolean }) {
  const player = useRef<HTMLVideoElement>(null);
  const descriptionId = useId();
  const src = square
    ? "/apps/tabforge-overview-square.mp4"
    : "/apps/tabforge-overview-framed.mp4";

  useEffect(() => {
    const video = player.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let visible = false;
    let started = false;

    const updatePlayback = () => {
      if (!visible || document.hidden || preference.matches || connection?.saveData) {
        video.pause();
      } else if (!started) {
        // Autoplay once; returning to the section preserves a visitor's pause.
        started = true;
        void video.play().catch(() => {
          // Native controls remain available if the browser blocks autoplay.
        });
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        updatePlayback();
      },
      { threshold: [0, 0.35] },
    );
    observer.observe(video);
    preference.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, []);

  return (
    <figure className={styles.overview} data-tabforge-overview>
      <video
        ref={player}
        className={styles.player}
        width={square ? 1080 : 1920}
        height={1080}
        controls
        muted
        loop
        playsInline
        preload="none"
        poster={square
          ? "/apps/tabforge-overview-square-poster.jpg"
          : "/apps/tabforge-overview-poster.jpg"}
        aria-label="TabForge app overview"
        aria-describedby={descriptionId}
      >
        <source src={src} type="video/mp4" />
        <a href={src}>Watch the TabForge overview</a>
      </video>
      <figcaption id={descriptionId} className={styles.caption}>
        15 seconds: Tab, Outdent, brackets, shortcuts, and Delete line on iPhone,
        iPhone Duo, and iPad. Watch Duo open into laptop mode before typing.
      </figcaption>
    </figure>
  );
}
