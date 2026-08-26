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
      <g transform="translate(52 220)">
        <rect width="54" height="54" rx="14" fill="#f5c518" />
        <path
          d="M11 20h13c1.5 0 2.4.6 3 1.6L29 24h15c2.2 0 3.8 1.4 3.8 3.4v15c0 2-1.6 4-4 4H16c-2.2 0-4.2-2-4.2-4V20z"
          fill="#ffe26a"
        />
        <path d="M11 24h37v3H11z" fill="#e0a800" opacity="0.5" />
      </g>
      <g transform="translate(52 292)">
        <rect width="54" height="54" rx="14" fill="#c43e1c" />
        <rect x="13" y="14" width="28" height="20" rx="3" fill="#ffd7c8" />
        <circle cx="21" cy="22" r="3.5" fill="#c43e1c" />
        <path d="M13 32l7-6 6 5 6-8 9 9H13z" fill="#e37a54" />
      </g>
      <g transform="translate(1048 200)">
        <rect width="268" height="168" rx="14" fill="#2a303a" />
        <rect
          x="0.8"
          y="0.8"
          width="266.4"
          height="166.4"
          rx="13"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
        />
        <rect width="268" height="32" rx="14" fill="#3a4150" />
        <rect y="16" width="268" height="16" fill="#3a4150" />
        <circle cx="20" cy="16" r="5" fill="#ff5f57" />
        <circle cx="38" cy="16" r="5" fill="#febc2e" />
        <circle cx="56" cy="16" r="5" fill="#28c840" />
        <rect x="86" y="9" width="110" height="14" rx="7" fill="#232831" />
        <rect x="14" y="46" width="70" height="108" rx="8" fill="#1f242e" />
        <rect x="24" y="60" width="50" height="8" rx="4" fill="#4cc2ff" opacity="0.7" />
        <rect x="24" y="76" width="40" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect x="24" y="92" width="46" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
        <rect x="96" y="50" width="156" height="100" rx="10" fill="#1a1d24" />
      </g>
    </svg>
  );
}
