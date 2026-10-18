"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const home = document.querySelector<HTMLElement>("[data-home-page]");
    if (!home || typeof IntersectionObserver === "undefined") return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [...home.querySelectorAll<HTMLElement>("[data-home-reveal]")];
    let observer: IntersectionObserver | undefined;

    const reveal = (section: HTMLElement) => {
      section.dataset.homeState = "visible";
      observer?.unobserve(section);
    };

    const reset = () => {
      observer?.disconnect();
      for (const section of sections) delete section.dataset.homeState;
      if (motion.matches || document.documentElement.dataset.era !== "modern") return;

      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      }, { threshold: 0.08 });

      for (const section of sections) {
        if (section.getBoundingClientRect().top >= window.innerHeight) {
          section.dataset.homeState = "pending";
          observer.observe(section);
        }
      }
    };

    const onFocus = (event: FocusEvent) => {
      const section = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-home-reveal]")
        : null;
      if (section && home.contains(section)) reveal(section);
    };

    const era = new MutationObserver(reset);
    era.observe(document.documentElement, { attributes: true, attributeFilter: ["data-era"] });
    motion.addEventListener("change", reset);
    home.addEventListener("focusin", onFocus);
    reset();

    return () => {
      observer?.disconnect();
      era.disconnect();
      motion.removeEventListener("change", reset);
      home.removeEventListener("focusin", onFocus);
      for (const section of sections) delete section.dataset.homeState;
    };
  }, []);

  return null;
}
