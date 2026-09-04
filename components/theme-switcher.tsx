"use client";

import { useEffect, useRef, useState } from "react";

const THEMES = ["1980s", "1990s", "modern"] as const;
const STORAGE_KEY = "jeremycollins-theme-era";

const ERA_LABELS: Record<(typeof THEMES)[number], string> = {
  "1980s": "Ancient",
  "1990s": "Retro",
  modern: "Modern",
};

const ERA_NOTES: Record<(typeof THEMES)[number], string> = {
  "1980s": "Pixel type, scanlines, red phosphor. Your pick sticks",
  "1990s": "Beige, bevels, and a monospace font that refuses to antialias. Your pick sticks",
  modern:
    "A glade at dusk scene for fun, followed by some cool SAAS glass elements down below. Your pick sticks",
};

type EraTheme = (typeof THEMES)[number];

function isEraTheme(value: string | undefined): value is EraTheme {
  return THEMES.includes(value as EraTheme);
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<EraTheme>("1980s");
  const [panelOpen, setPanelOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.era;
    if (isEraTheme(currentTheme)) {
      setTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    if (!panelOpen && !infoOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInfoOpen(false);
        setPanelOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !wrapRef.current?.contains(target)) {
        setInfoOpen(false);
        setPanelOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [panelOpen, infoOpen]);

  const updateTheme = (nextTheme: EraTheme) => {
    setTheme(nextTheme);
    document.documentElement.dataset.era = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <div ref={wrapRef} className="theme-switcher-wrap" aria-label="Site theme controls">
      <button
        type="button"
        className="theme-disclosure"
        aria-expanded={panelOpen}
        aria-controls="theme-era-panel"
        aria-label="Theme"
        onClick={() => {
          setPanelOpen((open) => !open);
          setInfoOpen(false);
        }}
      >
        <span className="theme-disclosure-label">Theme</span>
        <span className="theme-disclosure-chevron" aria-hidden="true">
          ›
        </span>
      </button>
      <div
        id="theme-era-panel"
        className="theme-panel"
        data-open={panelOpen}
        hidden={!panelOpen}
      >
        <div className="theme-switcher" role="radiogroup" aria-label="Theme era">
          {THEMES.map((era) => (
            <button
              key={era}
              type="button"
              role="radio"
              aria-checked={theme === era}
              aria-label={`${ERA_LABELS[era]} theme`}
              className="theme-switcher-option"
              data-active={theme === era}
              onClick={() => updateTheme(era)}
            >
              {ERA_LABELS[era]}
            </button>
          ))}
        </div>
        <div className="theme-info-wrap">
          <button
            type="button"
            className="theme-info"
            aria-label="Why theme eras?"
            aria-expanded={infoOpen}
            aria-controls="theme-era-tooltip"
            onClick={() => setInfoOpen((open) => !open)}
          >
            i
          </button>
          <div
            id="theme-era-tooltip"
            className="theme-tooltip"
            role="tooltip"
            data-open={infoOpen}
          >
            {ERA_NOTES[theme]}
          </div>
        </div>
      </div>
    </div>
  );
}
