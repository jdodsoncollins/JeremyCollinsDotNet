"use client";

import { useEffect, useId, useRef } from "react";
import { getImageProps } from "next/image";
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
    caption:
      "15 seconds: Tab, Outdent, brackets, shortcuts, and Delete line on iPhone, iPhone Duo, and iPad. Watch Duo open into laptop mode before typing.",
  },
  "paper-and-grain": {
    name: "Paper & Grain",
    wide: "/apps/paper-and-grain-overview.mp4",
    square: "/apps/paper-and-grain-overview-square.mp4",
    poster: "/apps/paper-and-grain-overview-poster.webp",
    squarePoster: "/apps/paper-and-grain-overview-square-poster.webp",
    paper: "#f4eddf",
    line: "#cec4ad",
    caption:
      "18 seconds: pull a corner on iPhone, open and close iPhone Duo to fold the paper, and draw on iPad. Touch markers and close-ups follow the gestures.",
  },
  codable: {
    name: "Codable",
    wide: "/apps/codable-overview.mp4",
    square: "/apps/codable-overview-square.mp4",
    poster: "/apps/codable-overview-poster.webp",
    squarePoster: "/apps/codable-overview-square-poster.webp",
    paper: "#edf6ff",
    line: "#b9d8ff",
    caption:
      "22 seconds: pick a page element in Safari, inspect its node tree, resize the viewport, change scale and pixel ratio, then use Console and Network on iPhone, iPhone Duo, and iPad.",
  },
  taktung: {
    name: "Taktung",
    wide: "/apps/taktung-overview.mp4",
    square: "/apps/taktung-overview-square.mp4",
    poster: "/apps/taktung-overview-poster.webp",
    squarePoster: "/apps/taktung-overview-square-poster.webp",
    paper: "#f5f6f8",
    line: "#d7dfe1",
    caption:
      "18 seconds: check production and build evidence on iPhone, open iPhone Duo to compare page captures, and keep a local Field Log on iPad. Touch markers follow the interactions.",
  },
} as const;

export function AppOverview({
  app,
  square = false,
  preview = false,
}: {
  app: keyof typeof overviews;
  square?: boolean;
  preview?: boolean;
}) {
  const media = overviews[app];
  const player = useRef<HTMLVideoElement>(null);
  const descriptionId = useId();
  const src = square ? media.square : media.wide;
  const { props: poster } = getImageProps({
    src: square ? media.squarePoster : media.poster,
    alt: "",
    width: square ? 540 : 960,
    height: 540,
    quality: 75,
  });

  useEffect(() => {
    const video = player.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    let visible = false;
    let started = false;
    let resume = false;
    let pending = false;
    let disposed = false;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const eligible = () =>
      !disposed &&
      visible &&
      !document.hidden &&
      !preference.matches &&
      !connection?.saveData;

    const updatePlayback = (replay = false) => {
      if (!eligible()) {
        video.autoplay = false;
        if (preview && !video.paused && !video.ended) resume = true;
        video.pause();
        return;
      }
      if (pending) return;
      const restart = preview && replay && video.ended;
      const shouldPlay = !started || (preview && resume) || restart;
      video.autoplay = preview && shouldPlay;
      if (!shouldPlay) return;
      if (restart) video.currentTime = 0;
      pending = true;
      void video
        .play()
        .then(() => {
          if (disposed) return;
          started = true;
          resume = false;
          if (!eligible()) {
            if (preview && !video.ended) resume = true;
            video.pause();
          }
        })
        .catch(() => {
          // A blocked attempt can retry on the next interaction; controls still work.
        })
        .finally(() => {
          pending = false;
        });
    };
    const sync = () => updatePlayback();
    const onPlay = () => {
      if (!pending) {
        started = true;
        resume = false;
      }
    };
    const onScroll = () => {
      if (!visible || (started && !video.ended)) return;
      const bounds = video.getBoundingClientRect();
      const inView = Math.max(
        0,
        Math.min(bounds.bottom, window.innerHeight) - Math.max(0, bounds.top),
      );
      if (inView >= bounds.height * 0.35) updatePlayback(true);
    };
    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") updatePlayback(true);
    };
    const onFocus = () => updatePlayback(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        const entered = next && !visible;
        visible = next;
        updatePlayback(entered);
      },
      { threshold: [0, 0.35] },
    );
    observer.observe(video);
    video.addEventListener("play", onPlay);
    preference.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    if (preview) {
      window.addEventListener("scroll", onScroll, { passive: true });
      video.addEventListener("pointerenter", onPointerEnter);
      video.addEventListener("focusin", onFocus);
    }

    return () => {
      disposed = true;
      observer.disconnect();
      video.removeEventListener("play", onPlay);
      preference.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("pointerenter", onPointerEnter);
      video.removeEventListener("focusin", onFocus);
      video.autoplay = false;
      video.pause();
    };
  }, [app, square, preview]);

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
        loop={!preview}
        playsInline
        preload="none"
        poster={poster.src}
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
