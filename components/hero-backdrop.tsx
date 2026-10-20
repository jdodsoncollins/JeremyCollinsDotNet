const PLATES = [
  { era: "1980s", size: "phone", source: "/hero/hero-1980s-hill.png?v=land1" },
  { era: "1980s", size: "md", source: "/hero/hero-1980s-hill-md.png?v=land1" },
  {
    era: "1980s",
    size: "wide",
    source: "/hero/hero-1980s-hill-wide.png?v=land1",
  },
  { era: "1990s", size: "phone", source: "/hero/hero-1990s-hill.png?v=lom2" },
  { era: "1990s", size: "md", source: "/hero/hero-1990s-hill-md.png?v=lom2" },
  {
    era: "1990s",
    size: "wide",
    source: "/hero/hero-1990s-hill-wide.png?v=lom2",
  },
  {
    era: "modern",
    size: "phone",
    source: "/hero/hero-modern-forest.jpg?v=hq1",
  },
  {
    era: "modern",
    size: "wide",
    source: "/hero/hero-modern-forest-wide.jpg?v=hq1",
  },
] as const;

export function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop-photo">
        {PLATES.map(({ era, size, source }) => (
          // Existing era/breakpoint rules select one plate. Background images on
          // display:none elements are not requested, unlike hidden <img> sources.
          <div
            key={`${era}-${size}`}
            className={`hero-backdrop-${era}-plate hero-backdrop-${era}-${size}`}
            style={{
              backgroundImage: `url("${source}")`,
              backgroundSize: era === "modern" ? "cover" : "100% 100%",
              backgroundPosition: era === "modern" ? "50% 68%" : "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>
      <div className="hero-crt-stars" />
    </div>
  );
}
