"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./app-overview.module.css";

const overviews = {
  tabforge: {
    name: "TabForge",
    wide: "/apps/tabforge-overview-framed.mp4",
    square: "/apps/tabforge-overview-square.mp4",
    poster: "/apps/tabforge-overview-poster.jpg",
    squarePoster: "/apps/tabforge-overview-square-poster.jpg",
    paper: "#f7f7ef",
    line: "#c6cabb",
    caption: "15 seconds: Tab, Outdent, brackets, shortcuts, and Delete line on iPhone, iPhone Duo, and iPad. Watch Duo open into laptop mode before typing.",
  },
  "paper-and-grain": {
    name: "Paper & Grain",
    wide: "/apps/paper-and-grain-overview.mp4",
    square: "/apps/paper-and-grain-overview-square.mp4",
    poster: "/apps/paper-and-grain-overview-poster.webp",
    squarePoster: "/apps/paper-and-grain-overview-square-poster.webp",
    paper: "#f4eddf",
    line: "#cec4ad",
    caption: "18 seconds: pull a corner on iPhone, open and close iPhone Duo to fold the paper, and draw on iPad. Touch markers and close-ups follow the gestures.",
  },
} as const;

export function AppOverview({ app, square = false }: {
  app: keyof typeof overviews;
  square?: boolean;
}) {
  const media = overviews[app];
  const player = useRef<HTMLVideoElement>(null);
  const descriptionId = useId();
  const src = square ? media.square : media.wide;

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
  }, [app]);

  return (
    <figure
      className={styles.overview}
      data-app-overview={app}
      data-tabforge-overview={app === "tabforge" ? "" : undefined}
    >
      <video
        ref={player}
        className={styles.player}
        style={{ background: media.paper, borderColor: media.line }}
        width={square ? 1080 : 1920}
        height={1080}
        controls
        muted
        loop
        playsInline
        preload="none"
        poster={square ? media.squarePoster : media.poster}
        aria-label={`${media.name} app overview`}
        aria-describedby={descriptionId}
      >
        <source src={src} type="video/mp4" />
        <a href={src}>Watch the {media.name} overview</a>
      </video>
      <figcaption id={descriptionId} className={styles.caption}>
        {media.caption}
      </figcaption>
    </figure>
  );
}
