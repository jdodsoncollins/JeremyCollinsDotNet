"use client";

import { useEffect, useRef, useState } from "react";

const THEMES = ["1980s", "1990s", "2000s", "modern"] as const;
const STORAGE_KEY = "jeremycollins-theme-era";

const ERA_NOTES: Record<(typeof THEMES)[number], string> = {
  "1980s": "Pixel type, scanlines, red phosphor. Your pick sticks; otherwise it randomizes on load.",
  "1990s": "Beige, bevels, and a monospace font that refuses to antialias. Your pick sticks; otherwise it randomizes on load.",
  "2000s": "Bliss sky, Luna blue, Aqua gel. Your pick sticks; otherwise it randomizes on load.",
  modern:
    "A little Windows 11, a little macOS. Your pick sticks; otherwise it randomizes on load.",
};

type EraTheme = (typeof THEMES)[number];

function isEraTheme(value: string | undefined): value is EraTheme {
  return THEMES.includes(value as EraTheme);
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<EraTheme>("1980s");
  const [infoOpen, setInfoOpen] = useState(false);
  const infoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.era;
    if (isEraTheme(currentTheme)) {
      setTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    if (!infoOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInfoOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !infoWrapRef.current?.contains(target)) {
        setInfoOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [infoOpen]);

  const updateTheme = (nextTheme: EraTheme) => {
    setTheme(nextTheme);
    document.documentElement.dataset.era = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <div className="theme-switcher-wrap" aria-label="Site theme controls">
      <div className="theme-switcher" role="radiogroup" aria-label="Theme era">
        {THEMES.map((era) => (
          <button
            key={era}
            type="button"
            role="radio"
            aria-checked={theme === era}
            aria-label={`${era} theme`}
            className="theme-switcher-option"
            data-active={theme === era}
            onClick={() => updateTheme(era)}
          >
            {era.replace("19", "").replace("20", "")}
          </button>
        ))}
      </div>
      <div className="theme-info-wrap" ref={infoWrapRef}>
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
          {ERA_NOTES[theme]} I like computing history. Might as well make it fun.
        </div>
      </div>
    </div>
  );
}
