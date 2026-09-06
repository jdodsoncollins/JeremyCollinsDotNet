const LEAVES = [
  { left: "8%", delay: "0s", duration: "5.4s", size: 11, drift: -28, spin: 140, kind: "leaf" },
  { left: "18%", delay: "1.1s", duration: "6.2s", size: 14, drift: 36, spin: -180, kind: "leaf" },
  { left: "29%", delay: "0.4s", duration: "7.8s", size: 7, drift: 86, spin: 40, kind: "puff" },
  { left: "41%", delay: "2.2s", duration: "5.8s", size: 12, drift: 22, spin: -120, kind: "leaf" },
  { left: "54%", delay: "0.8s", duration: "8.4s", size: 8, drift: 110, spin: -30, kind: "puff" },
  { left: "63%", delay: "1.8s", duration: "5.1s", size: 13, drift: 16, spin: -90, kind: "leaf" },
  { left: "74%", delay: "0.2s", duration: "7.2s", size: 6, drift: 94, spin: 25, kind: "puff" },
  { left: "86%", delay: "2.6s", duration: "4.7s", size: 9, drift: 30, spin: -150, kind: "leaf" },
  { left: "93%", delay: "1.4s", duration: "6.4s", size: 12, drift: -12, spin: 110, kind: "leaf" },
] as const;

export function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop-photo" />
      <div className="hero-plate-frames" />
      <div className="hero-crt-stars" />
      <div className="hero-paint-shift" />
      <div className="hero-canopy" />
      <div className="hero-cloud-shadow" />
      <div className="hero-backdrop-clouds">
        <span className="hero-cloud hero-cloud-a" />
        <span className="hero-cloud hero-cloud-b" />
        <span className="hero-cloud hero-cloud-c" />
      </div>
      <div className="hero-backdrop-rays" />
      <div className="hero-backdrop-leaves">
        {LEAVES.map((leaf, i) => (
          <span
            key={i}
            className={leaf.kind === "puff" ? "hero-leaf hero-puff" : "hero-leaf"}
            style={{
              left: leaf.left,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
              width: leaf.size,
              height: leaf.kind === "puff" ? leaf.size : leaf.size * 0.72,
              ["--leaf-drift" as string]: `${leaf.drift}px`,
              ["--leaf-spin" as string]: `${leaf.spin}deg`,
            }}
          />
        ))}
      </div>
      <div className="hero-fauna hero-fauna-1990s">
        <img className="hero-critter hero-critter-squirrel" src="/hero/fauna-1990s-squirrel.svg?v=f1" alt="" decoding="async" />
        <img className="hero-critter hero-critter-rabbit-a" src="/hero/fauna-1990s-rabbit-a.svg?v=f1" alt="" decoding="async" />
        <img className="hero-critter hero-critter-rabbit-b" src="/hero/fauna-1990s-rabbit-b.svg?v=f1" alt="" decoding="async" />
      </div>
      <div className="hero-fauna hero-fauna-modern">
        <span className="hero-bird hero-bird-1">
          <img className="hero-bird-up" src="/hero/fauna-modern-bird-up.png?v=f2" alt="" decoding="async" />
          <img className="hero-bird-down" src="/hero/fauna-modern-bird-down.png?v=f2" alt="" decoding="async" />
        </span>
        <span className="hero-bird hero-bird-2">
          <img className="hero-bird-up" src="/hero/fauna-modern-bird-up.png?v=f2" alt="" decoding="async" />
          <img className="hero-bird-down" src="/hero/fauna-modern-bird-down.png?v=f2" alt="" decoding="async" />
        </span>
        <span className="hero-bird hero-bird-3">
          <img className="hero-bird-up" src="/hero/fauna-modern-bird-up.png?v=f2" alt="" decoding="async" />
          <img className="hero-bird-down" src="/hero/fauna-modern-bird-down.png?v=f2" alt="" decoding="async" />
        </span>
      </div>
    </div>
  );
}
