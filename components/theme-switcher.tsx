"use client";

import { useEffect, useState } from "react";

const THEMES = ["1980s", "1990s", "2000s"] as const;
const STORAGE_KEY = "jeremycollins-theme-era";

type EraTheme = (typeof THEMES)[number];

function isEraTheme(value: string | undefined): value is EraTheme {
  return THEMES.includes(value as EraTheme);
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<EraTheme>("1980s");

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.era;
    if (isEraTheme(currentTheme)) {
      setTheme(currentTheme);
    }
  }, []);

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
      <div className="theme-info-wrap">
        <button type="button" className="theme-info" aria-label="Why theme eras?">
          i
        </button>
        <div className="theme-tooltip" role="tooltip">
          I like computing history, and this is a small personal one-pager.
          Might as well make it fun.
        </div>
      </div>
    </div>
  );
}
