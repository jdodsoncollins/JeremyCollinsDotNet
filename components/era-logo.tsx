export function EraLogo() {
  return (
    <span className="era-logo" aria-hidden="true">
      <svg className="era-logo-mark era-logo-1980s" viewBox="0 0 40 40" role="img">
        <g fill="currentColor" shapeRendering="crispEdges">
          <rect x="14" y="3" width="12" height="2" />
          <rect x="10" y="5" width="4" height="2" />
          <rect x="26" y="5" width="5" height="2" />
          <rect x="7" y="8" width="3" height="3" />
          <rect x="31" y="8" width="2" height="4" />
          <rect x="5" y="12" width="3" height="10" />
          <rect x="33" y="12" width="2" height="12" />
          <rect x="6" y="24" width="3" height="5" />
          <rect x="30" y="25" width="3" height="5" />
          <rect x="10" y="31" width="8" height="2" />
          <rect x="22" y="31" width="8" height="2" />
          <rect x="14" y="8" width="10" height="2" />
          <rect x="25" y="10" width="3" height="2" />
          <rect x="10" y="12" width="2" height="12" />
          <rect x="28" y="13" width="2" height="10" />
          <rect x="13" y="27" width="6" height="2" />
          <rect x="22" y="27" width="5" height="2" />
          <rect x="16" y="14" width="8" height="2" />
          <rect x="14" y="16" width="2" height="8" />
          <rect x="25" y="17" width="2" height="7" />
          <rect x="16" y="24" width="5" height="2" />
          <rect x="17" y="6" width="5" height="1" opacity="0.55" />
          <rect x="22" y="9" width="4" height="1" opacity="0.55" />
          <rect x="18" y="33" width="4" height="1" opacity="0.55" />
        </g>
      </svg>

      <svg className="era-logo-mark era-logo-1990s" viewBox="0 0 40 40" role="img">
        <defs>
          <linearGradient id="era-logo-beos-front" x1="0.15" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#ffe56a" />
            <stop offset="0.48" stopColor="#ffcc00" />
            <stop offset="1" stopColor="#d4a200" />
          </linearGradient>
          <linearGradient id="era-logo-beos-top" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#ffd34a" />
            <stop offset="1" stopColor="#fff4b8" />
          </linearGradient>
          <linearGradient id="era-logo-beos-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c49210" />
            <stop offset="1" stopColor="#8a6800" />
          </linearGradient>
          <clipPath id="era-logo-beos-face">
            <rect x="5" y="11" width="24" height="22" rx="4" />
          </clipPath>
        </defs>
        <ellipse cx="21" cy="35.6" rx="13" ry="2.4" fill="#000" opacity="0.2" />
        <path d="M29 12.2 34.6 8 34.6 29.6 29 33.2Z" fill="url(#era-logo-beos-side)" />
        <path d="M5.2 11.2 10.8 6.8 34.6 8 29 12.2Z" fill="url(#era-logo-beos-top)" />
        <rect
          x="5"
          y="11"
          width="24"
          height="22"
          rx="4"
          fill="url(#era-logo-beos-front)"
          stroke="#a37a00"
          strokeWidth="0.6"
        />
        <rect x="7" y="13" width="12" height="5.5" rx="2.2" fill="#fff" opacity="0.16" />
        <g
          clipPath="url(#era-logo-beos-face)"
          fill="none"
          stroke="#2a1f00"
          strokeLinecap="round"
          transform="rotate(-28 17 23)"
        >
          <circle
            cx="17"
            cy="23"
            r="7.8"
            strokeWidth="2.55"
            pathLength="49"
            strokeDasharray="39 10"
          />
          <circle
            cx="17"
            cy="23"
            r="4.3"
            strokeWidth="2.25"
            pathLength="27"
            strokeDasharray="21.4 5.6"
          />
        </g>
      </svg>

      <img className="era-logo-mark era-logo-modern" src="/inv-logo.png" alt="" />
    </span>
  );
}
