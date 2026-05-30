export function CircuitBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base grid */}
      <div className="absolute inset-0 circuit-bg opacity-30" />
      
      {/* Animated circuit traces */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Horizontal traces */}
        <path
          d="M0 200 H300 L350 250 H500 L550 200 H1000"
          stroke="var(--color-neon-green)"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
          className="circuit-trace"
          style={{ animationDelay: "0s" }}
        />
        <path
          d="M0 400 H200 L250 450 H400 L450 400 H700 L750 450 H1000"
          stroke="var(--color-neon-cyan)"
          strokeWidth="1"
          fill="none"
          opacity="0.15"
          className="circuit-trace"
          style={{ animationDelay: "1s" }}
        />
        <path
          d="M0 600 H150 L200 650 H350 L400 600 H600 L650 650 H800 L850 600 H1000"
          stroke="var(--color-neon-magenta)"
          strokeWidth="1"
          fill="none"
          opacity="0.15"
          className="circuit-trace"
          style={{ animationDelay: "2s" }}
        />
        <path
          d="M0 800 H250 L300 850 H550 L600 800 H1000"
          stroke="var(--color-neon-green)"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
          className="circuit-trace"
          style={{ animationDelay: "1.5s" }}
        />
        
        {/* Vertical traces */}
        <path
          d="M200 0 V150 L250 200 V400 L200 450 V1000"
          stroke="var(--color-neon-cyan)"
          strokeWidth="1"
          fill="none"
          opacity="0.15"
          className="circuit-trace"
          style={{ animationDelay: "0.5s" }}
        />
        <path
          d="M500 0 V200 L550 250 V500 L500 550 V1000"
          stroke="var(--color-neon-green)"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
          className="circuit-trace"
          style={{ animationDelay: "1.5s" }}
        />
        <path
          d="M800 0 V300 L850 350 V600 L800 650 V1000"
          stroke="var(--color-neon-magenta)"
          strokeWidth="1"
          fill="none"
          opacity="0.15"
          className="circuit-trace"
          style={{ animationDelay: "2.5s" }}
        />
        
        {/* Circuit nodes */}
        <circle cx="200" cy="200" r="4" fill="var(--color-neon-green)" opacity="0.4" className="circuit-trace" />
        <circle cx="500" cy="250" r="4" fill="var(--color-neon-cyan)" opacity="0.4" className="circuit-trace" style={{ animationDelay: "0.5s" }} />
        <circle cx="800" cy="350" r="4" fill="var(--color-neon-magenta)" opacity="0.4" className="circuit-trace" style={{ animationDelay: "1s" }} />
        <circle cx="350" cy="450" r="4" fill="var(--color-neon-green)" opacity="0.4" className="circuit-trace" style={{ animationDelay: "1.5s" }} />
        <circle cx="650" cy="650" r="4" fill="var(--color-neon-cyan)" opacity="0.4" className="circuit-trace" style={{ animationDelay: "2s" }} />
      </svg>
      
      {/* Corner brackets - Y2K style */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neon-green/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-neon-magenta/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-neon-green/30" />
    </div>
  );
}
