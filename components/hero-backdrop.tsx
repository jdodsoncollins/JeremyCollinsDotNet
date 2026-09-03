const LEAVES = [
  { left: "8%", delay: "0s", duration: "5.4s", size: 11, drift: -28, spin: 140 },
  { left: "18%", delay: "1.1s", duration: "6.2s", size: 14, drift: 36, spin: -180 },
  { left: "29%", delay: "0.4s", duration: "4.8s", size: 9, drift: -18, spin: 90 },
  { left: "41%", delay: "2.2s", duration: "5.8s", size: 12, drift: 22, spin: -120 },
  { left: "54%", delay: "0.8s", duration: "6.6s", size: 10, drift: -40, spin: 200 },
  { left: "63%", delay: "1.8s", duration: "5.1s", size: 13, drift: 16, spin: -90 },
  { left: "74%", delay: "0.2s", duration: "5.9s", size: 11, drift: -24, spin: 160 },
  { left: "86%", delay: "2.6s", duration: "4.7s", size: 9, drift: 30, spin: -150 },
  { left: "93%", delay: "1.4s", duration: "6.4s", size: 12, drift: -12, spin: 110 },
] as const;

export function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop-photo" />
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
            className="hero-leaf"
            style={{
              left: leaf.left,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
              width: leaf.size,
              height: leaf.size * 0.72,
              ["--leaf-drift" as string]: `${leaf.drift}px`,
              ["--leaf-spin" as string]: `${leaf.spin}deg`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
