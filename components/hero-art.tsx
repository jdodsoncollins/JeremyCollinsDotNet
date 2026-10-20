"use client";

import { useEffect, useRef } from "react";

const SCROLL_IDLE_MS = 140;

export function HeroArt({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const phosphorShot = root.querySelector<HTMLElement>(".hero-art-1980s");
    const phosphorCat =
      phosphorShot?.querySelector<HTMLImageElement>(".hero-art-cat");
    let visible = false;
    let catIntroPlayed = false;
    let scrolling = false;
    let lastScrollY = window.scrollY;
    let idleTimer: number | null = null;
    let liveShot: HTMLElement | null = null;

    const visibleShot = () => {
      const era = document.documentElement.dataset.era;
      if (!era) return null;
      return root.querySelector<HTMLElement>(`.hero-art-${CSS.escape(era)}`);
    };

    const catEligible = () =>
      visible &&
      !document.hidden &&
      !motion.matches &&
      document.documentElement.dataset.era === "1980s" &&
      phosphorCat?.complete &&
      phosphorCat.naturalWidth > 0;

    const playCat = (playback: "intro" | "hover") => {
      if (!phosphorShot || !catEligible() || phosphorShot.dataset.catPlayback)
        return;
      phosphorShot.dataset.catPlayback = playback;
    };

    const stopCat = () => {
      if (phosphorShot) delete phosphorShot.dataset.catPlayback;
    };

    const sync = () => {
      const live = visible && !motion.matches && !document.hidden && scrolling;
      const next = live ? visibleShot() : null;
      if (liveShot && liveShot !== next) {
        liveShot.classList.remove("is-live");
      }
      liveShot = next;
      liveShot?.classList.add("is-live");
      root.closest(".hero-section")?.classList.toggle("is-live", live);
      if (!catEligible()) {
        stopCat();
        if (phosphorShot) delete phosphorShot.dataset.catVisible;
      } else {
        if (phosphorShot) phosphorShot.dataset.catVisible = "true";
        if (!catIntroPlayed) {
          catIntroPlayed = true;
          playCat("intro");
        }
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y === lastScrollY) return;
      lastScrollY = y;
      if (motion.matches) return;
      scrolling = true;
      sync();
      if (idleTimer != null) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        idleTimer = null;
        scrolling = false;
        sync();
      }, SCROLL_IDLE_MS);
    };

    const onScrollEnd = () => {
      if (idleTimer != null) {
        window.clearTimeout(idleTimer);
        idleTimer = null;
      }
      scrolling = false;
      sync();
    };

    const onMotionChange = () => {
      onScrollEnd();
    };

    const onCatEnter = () => {
      if (hover.matches && catIntroPlayed) playCat("hover");
    };

    const onCatLeave = () => {
      if (phosphorShot?.dataset.catPlayback === "hover") stopCat();
    };

    const onCatAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "hero-cat-1980s") stopCat();
    };

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    visibility.observe(root);

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-era"],
    });

    const scrollOpts: AddEventListenerOptions = { passive: true };

    window.addEventListener("scroll", onScroll, scrollOpts);
    window.addEventListener("scrollend", onScrollEnd, scrollOpts);
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onMotionChange);
    window.addEventListener("blur", onScrollEnd);
    phosphorShot?.addEventListener("pointerenter", onCatEnter);
    phosphorShot?.addEventListener("pointerleave", onCatLeave);
    phosphorCat?.addEventListener("load", sync);
    phosphorCat?.addEventListener("animationend", onCatAnimationEnd);

    return () => {
      if (idleTimer != null) window.clearTimeout(idleTimer);
      liveShot?.classList.remove("is-live");
      root.closest(".hero-section")?.classList.remove("is-live");
      stopCat();
      if (phosphorShot) delete phosphorShot.dataset.catVisible;
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("scroll", onScroll, scrollOpts);
      window.removeEventListener("scrollend", onScrollEnd, scrollOpts);
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onMotionChange);
      window.removeEventListener("blur", onScrollEnd);
      phosphorShot?.removeEventListener("pointerenter", onCatEnter);
      phosphorShot?.removeEventListener("pointerleave", onCatLeave);
      phosphorCat?.removeEventListener("load", sync);
      phosphorCat?.removeEventListener("animationend", onCatAnimationEnd);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-art" aria-hidden="true">
      {children}
    </div>
  );
}
