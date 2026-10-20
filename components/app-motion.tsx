"use client";

import { useEffect } from "react";

type AppPage = "codable" | "taktung" | "tabforge" | "paper-and-grain";

// CSS owns the choreography. This controller gives it a finite, visible lifetime.
export function AppMotion({ app }: { app: AppPage }) {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(`[data-app-page="${app}"]`);
    if (!page || typeof IntersectionObserver === "undefined" || typeof page.getAnimations !== "function") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover)");
    const targets = [...page.querySelectorAll<HTMLElement>("[data-app-motion]")];
    const visible = new Set<HTMLElement>();
    const played = new WeakSet<HTMLElement>();
    const pending = new Map<HTMLElement, object>();
    const running = new Map<HTMLElement, { token: object; animations: Animation[] }>();
    const listeners: Array<() => void> = [];
    let disposed = false;

    const stop = (target: HTMLElement) => {
      pending.delete(target);
      const sequence = running.get(target);
      running.delete(target);
      delete target.dataset.motionActive;
      sequence?.animations.forEach(animation => animation.cancel());
    };

    const start = async (target: HTMLElement, replay = false) => {
      if (disposed || !visible.has(target) || document.hidden || running.has(target) || pending.has(target)) return;
      if (preference.matches) {
        played.add(target);
        return;
      }
      if (!replay && played.has(target)) return;

      const token = {};
      pending.set(target, token);
      // Wait for real media rather than animating an empty image placeholder.
      await Promise.allSettled([...target.querySelectorAll("img")].map(img => img.decode()));
      if (disposed || pending.get(target) !== token || preference.matches || document.hidden || !visible.has(target)) return;
      pending.delete(target);
      played.add(target);
      target.dataset.motionActive = "true";
      const animations = target.getAnimations({ subtree: true });
      running.set(target, { token, animations });

      await Promise.allSettled(animations.map(animation => animation.finished));
      if (!disposed && running.get(target)?.token === token) {
        running.delete(target);
        delete target.dataset.motionActive;
      }
    };

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          visible.add(target);
          void start(target);
        } else {
          visible.delete(target);
          stop(target);
        }
      }
    }, { threshold: 0.12 });

    for (const target of targets) {
      observer.observe(target);
      if (!target.hasAttribute("data-motion-replay")) continue;
      const onPointerEnter = (event: PointerEvent) => {
        if (hover.matches && event.pointerType === "mouse") void start(target, true);
      };
      const onFocus = (event: FocusEvent) => {
        if (event.relatedTarget instanceof Node && target.contains(event.relatedTarget)) return;
        void start(target, true);
      };
      target.addEventListener("pointerenter", onPointerEnter);
      target.addEventListener("focusin", onFocus);
      listeners.push(() => {
        target.removeEventListener("pointerenter", onPointerEnter);
        target.removeEventListener("focusin", onFocus);
      });
    }

    const stopAll = () => {
      targets.forEach(stop);
      // Include short, user-triggered tool-panel transitions outside observed targets.
      page.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
    };
    const onPreference = () => {
      page.dataset.reducedMotion = String(preference.matches);
      if (preference.matches) stopAll();
    };
    const onVisibility = () => {
      if (document.hidden) stopAll();
      else visible.forEach(target => { void start(target); });
    };

    page.dataset.appMotionReady = "true";
    onPreference();
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      observer.disconnect();
      stopAll();
      listeners.forEach(remove => remove());
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      delete page.dataset.appMotionReady;
      delete page.dataset.reducedMotion;
    };
  }, [app]);

  return null;
}
