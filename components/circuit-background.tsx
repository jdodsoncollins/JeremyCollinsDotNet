export function CircuitBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 circuit-bg opacity-30" />
    </div>
  );
}

export function ModernDesktopIcons() {
  return (
    <svg
      className="era-modern-icons"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g>
        <g transform="translate(64 200)">
          <rect width="72" height="72" rx="18" fill="#f5c518" />
          <path
            d="M14 26h18c2 0 3.2.8 4 2.2L39 32h20c3 0 5 1.8 5 4.4v20c0 2.6-2.2 5.2-5.2 5.2H20.2C17 61.6 14 59 14 56.4V26z"
            fill="#ffe26a"
          />
          <path d="M14 32h50v4H14z" fill="#e0a800" opacity="0.55" />
        </g>
        <g transform="translate(64 292)">
          <rect width="72" height="72" rx="18" fill="#0078d4" />
          <circle cx="36" cy="36" r="11" fill="none" stroke="#e8f4ff" strokeWidth="3.4" />
          <path
            d="M36 14v8M36 50v8M14 36h8M50 36h8M19 19l5.6 5.6M47.4 47.4L53 53M19 53l5.6-5.6M47.4 24.6L53 19"
            fill="none"
            stroke="#e8f4ff"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </g>
        <g transform="translate(64 384)">
          <rect width="72" height="72" rx="18" fill="#0f7b3b" />
          <rect x="18" y="20" width="36" height="28" rx="4" fill="#d9f5e4" />
          <path d="M18 28h36M18 36h24" fill="none" stroke="#0f7b3b" strokeWidth="2.4" />
        </g>
        <g transform="translate(64 476)">
          <rect width="72" height="72" rx="18" fill="#c43e1c" />
          <rect x="17" y="18" width="38" height="26" rx="4" fill="#ffd7c8" />
          <circle cx="28" cy="29" r="5" fill="#c43e1c" />
          <path d="M17 42l10-9 8 6 8-10 12 13H17z" fill="#e37a54" />
        </g>
      </g>

      <g transform="translate(56 584)">
        <rect width="156" height="96" rx="22" fill="#1b3a63" />
        <rect
          x="1"
          y="1"
          width="154"
          height="94"
          rx="21"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
        />
        <circle cx="42" cy="48" r="18" fill="#ffb347" />
        <circle cx="34" cy="42" r="18" fill="#1b3a63" />
        <path
          d="M88 36h46M88 48h36M88 60h26"
          fill="none"
          stroke="rgba(255,255,255,0.62)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </g>

      <g transform="translate(980 188)">
        <rect width="320" height="210" rx="18" fill="#2a303a" />
        <rect
          x="1"
          y="1"
          width="318"
          height="208"
          rx="17"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
        />
        <rect width="320" height="38" rx="18" fill="#3a4150" />
        <rect y="20" width="320" height="18" fill="#3a4150" />
        <circle cx="24" cy="19" r="6" fill="#ff5f57" />
        <circle cx="44" cy="19" r="6" fill="#febc2e" />
        <circle cx="64" cy="19" r="6" fill="#28c840" />
        <rect x="96" y="11" width="140" height="16" rx="8" fill="#232831" />
        <rect x="16" y="54" width="84" height="140" rx="10" fill="#1f242e" />
        <rect x="28" y="70" width="60" height="10" rx="5" fill="#4cc2ff" opacity="0.8" />
        <rect x="28" y="90" width="50" height="10" rx="5" fill="rgba(255,255,255,0.24)" />
        <rect x="28" y="110" width="56" height="10" rx="5" fill="rgba(255,255,255,0.16)" />
        <rect x="114" y="58" width="188" height="132" rx="12" fill="#1a1d24" />
      </g>

    </svg>
  );
}
