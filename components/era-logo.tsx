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

      <svg className="era-logo-mark era-logo-1990s" viewBox="0 0 32 32" role="img">
        <rect x="1" y="1" width="30" height="30" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
        <path d="M2 30V2h28" fill="none" stroke="#fff" strokeWidth="1.25" />
        <path d="M30 2v28H2" fill="none" stroke="#808080" strokeWidth="1.25" />
        <rect x="5" y="5" width="22" height="22" fill="#fff" stroke="#000" strokeWidth="1" />
        <rect x="6" y="6" width="20" height="5" fill="#000080" />
        <rect x="22" y="7" width="3" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="0.6" />
        <g
          fill="none"
          stroke="#000080"
          strokeLinecap="butt"
          transform="rotate(-28 16 19)"
        >
          <circle
            cx="16"
            cy="19"
            r="7.3"
            strokeWidth="2.35"
            pathLength="46"
            strokeDasharray="37 9"
          />
          <circle
            cx="16"
            cy="19"
            r="4.15"
            strokeWidth="2.15"
            pathLength="26"
            strokeDasharray="20.5 5.5"
          />
        </g>
      </svg>

      <svg className="era-logo-mark era-logo-2000s" viewBox="0 0 40 40" role="img">
        <defs>
          <linearGradient id="era-logo-aqua-shell" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e7f7ff" />
            <stop offset="0.42" stopColor="#6ec8f8" />
            <stop offset="0.48" stopColor="#1a86e0" />
            <stop offset="1" stopColor="#0b4aa8" />
          </linearGradient>
        </defs>
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="8"
          fill="url(#era-logo-aqua-shell)"
          stroke="#083f8c"
          strokeWidth="1.2"
        />
        <g
          fill="none"
          stroke="#f4fbff"
          strokeLinecap="round"
          transform="rotate(-28 20 23)"
        >
          <circle
            cx="20"
            cy="23"
            r="10.2"
            strokeWidth="3.05"
            pathLength="64"
            strokeDasharray="51 13"
          />
          <circle
            cx="20"
            cy="23"
            r="5.7"
            strokeWidth="2.75"
            pathLength="36"
            strokeDasharray="28.5 7.5"
          />
        </g>
        <ellipse cx="20" cy="10" rx="10.5" ry="3.4" fill="rgba(255,255,255,0.62)" />
        <path
          d="M10 8.2h20"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      <img className="era-logo-mark era-logo-modern" src="/inv-logo.png" alt="" />
    </span>
  );
}
