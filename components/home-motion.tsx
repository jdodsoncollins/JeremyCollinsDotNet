"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Entrance = {
  owner: HTMLElement;
  trigger: HTMLElement;
} & (
  | { kind: "scene"; glow: HTMLElement; focal: boolean }
  | {
      kind: "project";
      artwork: HTMLElement;
      light: HTMLElement | null;
      direction: number;
    }
  | { kind: "step"; delay: number }
);

export function HomeMotion() {
  useEffect(() => {
    const home = document.querySelector<HTMLElement>("[data-home-page]");
    if (!home || typeof IntersectionObserver === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const compact = window.matchMedia("(max-width: 760px)");
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    const scenes = [...home.querySelectorAll<HTMLElement>("[data-home-scene]")];
    const entrances: Entrance[] = [];

    for (const scene of scenes) {
      const glow = scene.querySelector<HTMLElement>("[data-home-glow]");
      if (!glow) continue;
      const placement = scene.dataset.homeScene;
      const trigger =
        placement === "projects"
          ? home.querySelector<HTMLElement>("#apps-title")
          : placement === "floor"
            ? home.querySelector<HTMLElement>("[data-home-about]")
            : scene;
      entrances.push({
        kind: "scene",
        owner: scene,
        trigger: trigger ?? scene,
        glow,
        focal: placement === "projects",
      });
    }
    home
      .querySelectorAll<HTMLElement>("[data-home-project]")
      .forEach((project, index) => {
        const artwork = project.querySelector<HTMLElement>(
          "[data-home-artwork]",
        );
        if (!artwork) return;
        entrances.push({
          kind: "project",
          owner: project,
          trigger: artwork,
          artwork,
          light: project.querySelector<HTMLElement>("[data-home-light]"),
          direction: index % 2 === 0 ? 1 : -1,
        });
      });
    home
      .querySelectorAll<HTMLElement>("[data-home-step]")
      .forEach((step, index) => {
        entrances.push({
          kind: "step",
          owner: step,
          trigger: step,
          delay: Math.min(index * 0.04, 0.2),
        });
      });

    const visible = new Set<Entrance>();
    const seen = new WeakSet<HTMLElement>();
    const pending = new Map<HTMLElement, object>();
    const running = new Map<HTMLElement, ReturnType<typeof gsap.context>>();
    const listeners: Array<() => void> = [];
    let landscapeContext: ReturnType<typeof gsap.context> | undefined;
    let enabled = false;
    let initialized = false;
    let disposed = false;

    const eligible = () =>
      !disposed &&
      !document.hidden &&
      !preference.matches &&
      !connection?.saveData &&
      document.documentElement.dataset.era === "modern";

    const stop = (owner: HTMLElement) => {
      pending.delete(owner);
      const sequence = running.get(owner);
      running.delete(owner);
      delete owner.dataset.homePlaying;
      // Each sequence restores its own original styles, including will-change.
      sequence?.revert();
    };

    const animate = (entrance: Entrance, replay: boolean) => {
      if (
        !enabled ||
        !eligible() ||
        !visible.has(entrance) ||
        running.has(entrance.owner)
      )
        return;
      let timeline: ReturnType<typeof gsap.timeline> | undefined;
      const context = gsap.context(() => {
        timeline = gsap.timeline({ onComplete: () => stop(entrance.owner) });
        if (entrance.kind === "scene") {
          const duration = entrance.focal ? 0.9 : 0.8;
          timeline
            .set(entrance.glow, { willChange: "transform, opacity" })
            .fromTo(
              entrance.glow,
              { xPercent: -28, opacity: 0 },
              {
                xPercent: 0,
                opacity: entrance.focal ? 0.85 : 0.6,
                duration: duration * 0.42,
                ease: "power2.out",
              },
            )
            .to(entrance.glow, {
              xPercent: 28,
              opacity: 0,
              duration: duration * 0.58,
              ease: "power2.out",
            });
        } else if (entrance.kind === "project") {
          if (!replay) {
            const figures = [
              ...entrance.artwork.querySelectorAll<HTMLElement>("figure"),
            ];
            const media = figures.length > 1 ? figures : [entrance.artwork];
            const direction = (index: number) =>
              entrance.direction * (index % 2 === 0 ? 1 : -1);
            timeline.set(media, { willChange: "transform, filter" }).fromTo(
              media,
              {
                x: (index: number) =>
                  direction(index) * (compact.matches ? 12 : 24),
                scale: 0.96,
                rotation: (index: number) => direction(index) * 1.2,
                filter: "brightness(0.86)",
              },
              {
                x: 0,
                scale: 1,
                rotation: 0,
                filter: "brightness(1)",
                duration: 0.8,
                stagger: media.length > 1 ? 0.08 : 0,
                ease: "power3.out",
              },
              0,
            );
          }
          if (entrance.light) {
            timeline
              .set(entrance.light, { willChange: "transform, opacity" }, 0)
              .fromTo(
                entrance.light,
                { xPercent: -34, opacity: 0 },
                {
                  xPercent: 0,
                  opacity: 0.95,
                  duration: 0.28,
                  ease: "power2.out",
                },
                0,
              )
              .to(
                entrance.light,
                {
                  xPercent: 34,
                  opacity: 0,
                  duration: 0.44,
                  ease: "power2.out",
                },
                0.28,
              );
          }
        } else {
          timeline.fromTo(
            entrance.owner,
            { "--trail-progress": 0 },
            {
              "--trail-progress": 1,
              duration: 0.45,
              delay: entrance.delay,
              ease: "power2.out",
            },
          );
        }
      }, home);
      if (timeline && timeline.duration() > 0) {
        running.set(entrance.owner, context);
        entrance.owner.dataset.homePlaying = entrance.kind;
      } else context.revert();
    };

    const enter = async (entrance: Entrance, replay = false) => {
      if (
        !enabled ||
        !eligible() ||
        !visible.has(entrance) ||
        running.has(entrance.owner) ||
        pending.has(entrance.owner) ||
        (!replay && seen.has(entrance.owner))
      )
        return;
      if (!replay) seen.add(entrance.owner);
      if (entrance.kind === "project" && !replay) {
        const token = {};
        pending.set(entrance.owner, token);
        await Promise.allSettled(
          [...entrance.artwork.querySelectorAll("img")].map((image) =>
            image.decode(),
          ),
        );
        if (pending.get(entrance.owner) !== token) return;
        pending.delete(entrance.owner);
      }
      animate(entrance, replay);
    };

    const records = new Map<Element, Entrance[]>();
    for (const entrance of entrances) {
      const group = records.get(entrance.trigger) ?? [];
      group.push(entrance);
      records.set(entrance.trigger, group);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          for (const entrance of records.get(entry.target) ?? []) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
              visible.add(entrance);
              if (enabled && eligible()) void enter(entrance);
              else seen.add(entrance.owner);
            } else {
              visible.delete(entrance);
              stop(entrance.owner);
            }
          }
        }
      },
      { threshold: [0, 0.08], rootMargin: "0px 0px -6% 0px" },
    );

    const sync = () => {
      enabled = false;
      for (const entrance of entrances) stop(entrance.owner);
      landscapeContext?.revert();
      landscapeContext = undefined;
      // Preference and tab restoration must not replay what is already on screen.
      // The observer also remembers sections visited while motion is disabled.
      if (initialized) {
        for (const entrance of entrances) {
          const bounds = entrance.trigger.getBoundingClientRect();
          if (bounds.bottom > 0 && bounds.top < window.innerHeight)
            seen.add(entrance.owner);
        }
      }
      initialized = true;
      if (!eligible()) {
        home.dataset.homeMotion = "static";
        return;
      }
      landscapeContext = gsap.context(() => {
        for (const scene of scenes) {
          const landscape = scene.querySelector<HTMLElement>(
            "[data-home-landscape]",
          );
          if (!landscape) continue;
          gsap.fromTo(
            landscape,
            { y: () => (compact.matches ? -32 : -64) },
            {
              y: () => (compact.matches ? 32 : 64),
              ease: "none",
              scrollTrigger: {
                trigger: scene,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      }, home);
      enabled = true;
      home.dataset.homeMotion = "ready";
    };

    for (const entrance of entrances) {
      if (entrance.kind !== "project") continue;
      const onPointerEnter = (event: PointerEvent) => {
        if (pointer.matches && event.pointerType === "mouse")
          void enter(entrance, true);
      };
      const onFocus = (event: FocusEvent) => {
        if (
          event.relatedTarget instanceof Node &&
          entrance.owner.contains(event.relatedTarget)
        )
          return;
        void enter(entrance, true);
      };
      entrance.owner.addEventListener("pointerenter", onPointerEnter);
      entrance.owner.addEventListener("focusin", onFocus);
      listeners.push(() => {
        entrance.owner.removeEventListener("pointerenter", onPointerEnter);
        entrance.owner.removeEventListener("focusin", onFocus);
      });
    }

    const era = new MutationObserver(sync);
    era.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-era"],
    });
    preference.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    for (const trigger of records.keys()) observer.observe(trigger);

    return () => {
      disposed = true;
      enabled = false;
      observer.disconnect();
      era.disconnect();
      preference.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      for (const remove of listeners) remove();
      for (const entrance of entrances) stop(entrance.owner);
      landscapeContext?.revert();
      delete home.dataset.homeMotion;
    };
  }, []);

  return null;
}
