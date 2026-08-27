"use client";

import { useEffect, useRef } from "react";

const HOLD_MS = 70;
const SCROLL_IDLE_MS = 180;

export function HeroArt({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrolling = false;
    let touching = false;
    let pointerId: number | null = null;
    let holdTimer: number | null = null;
    let idleTimer: number | null = null;
    let liveShot: HTMLElement | null = null;

    const visibleShot = () => {
      const era = document.documentElement.dataset.era;
      if (!era) return null;
      return root.querySelector<HTMLElement>(`.hero-art-${CSS.escape(era)}`);
    };

    const sync = () => {
      const next =
        !motion.matches && (scrolling || touching) ? visibleShot() : null;
      if (liveShot && liveShot !== next) {
        liveShot.classList.remove("is-live");
      }
      liveShot = next;
      liveShot?.classList.add("is-live");
    };

    const stopHold = () => {
      if (holdTimer != null) {
        window.clearTimeout(holdTimer);
        holdTimer = null;
      }
    };

    const onScroll = () => {
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

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      if (motion.matches) return;
      const target = (event.target as HTMLElement | null)?.closest(".hero-art-shot");
      if (!(target instanceof HTMLElement) || !root.contains(target)) return;

      pointerId = event.pointerId;
      holdTimer = window.setTimeout(() => {
        holdTimer = null;
        touching = true;
        sync();
      }, HOLD_MS);
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (pointerId == null || event.pointerId !== pointerId) return;
      pointerId = null;
      stopHold();
      touching = false;
      sync();
    };

    const onMotionChange = () => {
      if (motion.matches) {
        scrolling = false;
        touching = false;
        stopHold();
      }
      sync();
    };

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-era"],
    });

    const scrollOpts: AddEventListenerOptions = { passive: true, capture: true };
    const pointerOpts: AddEventListenerOptions = { passive: true };

    window.addEventListener("scroll", onScroll, scrollOpts);
    window.addEventListener("scrollend", onScrollEnd, scrollOpts);
    motion.addEventListener("change", onMotionChange);
    root.addEventListener("pointerdown", onPointerDown, pointerOpts);
    window.addEventListener("pointerup", onPointerEnd, pointerOpts);
    window.addEventListener("pointercancel", onPointerEnd, pointerOpts);

    return () => {
      stopHold();
      if (idleTimer != null) window.clearTimeout(idleTimer);
      liveShot?.classList.remove("is-live");
      observer.disconnect();
      window.removeEventListener("scroll", onScroll, scrollOpts);
      window.removeEventListener("scrollend", onScrollEnd, scrollOpts);
      motion.removeEventListener("change", onMotionChange);
      root.removeEventListener("pointerdown", onPointerDown, pointerOpts);
      window.removeEventListener("pointerup", onPointerEnd, pointerOpts);
      window.removeEventListener("pointercancel", onPointerEnd, pointerOpts);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-art" aria-hidden="true">
      {children}
    </div>
  );
}
