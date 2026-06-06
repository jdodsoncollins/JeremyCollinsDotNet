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
        <rect x="6" y="6" width="28" height="28" fill="#ece7db" stroke="#000" strokeWidth="2" shapeRendering="crispEdges" />
        <rect x="9" y="9" width="22" height="3" fill="#000080" shapeRendering="crispEdges" />
        <g fill="none" stroke="#050505" strokeLinecap="square">
          <path d="M10 10.5A15 15 0 1 1 10 29.5" strokeWidth="2.6" />
          <path d="M13 14.2A10 10 0 1 1 26.8 27" strokeWidth="2.4" />
          <path d="M16 26A7 7 0 1 1 25.8 25.7" strokeWidth="2.2" />
          <path d="M17.5 12.5h8" strokeWidth="1" />
        </g>
      </svg>

      <svg className="era-logo-mark era-logo-2000s" viewBox="0 0 40 40" role="img">
        <defs>
          <linearGradient id="era-logo-aqua-shell" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.46" stopColor="#9fe4ff" />
            <stop offset="0.5" stopColor="#168de8" />
            <stop offset="1" stopColor="#004aaf" />
          </linearGradient>
          <linearGradient id="era-logo-aqua-stroke" x1="0" x2="0" y1="5" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.42" stopColor="#dff7ff" />
            <stop offset="0.58" stopColor="#087bd6" />
            <stop offset="1" stopColor="#003d91" />
          </linearGradient>
          <clipPath id="era-logo-aqua-clip">
            <circle cx="20" cy="20" r="17" />
          </clipPath>
        </defs>
        <circle cx="20" cy="20" r="17" fill="url(#era-logo-aqua-shell)" stroke="#004f9f" strokeWidth="1.2" />
        <g clipPath="url(#era-logo-aqua-clip)" fill="none" stroke="url(#era-logo-aqua-stroke)" strokeLinecap="square">
          <path d="M14.5 26A9 9 0 1 1 26.2 26" strokeWidth="3.2" />
          <path d="M18 9.5h5.5" strokeWidth="1.1" opacity="0.85" />
          <path d="M15.5 31h5.5" strokeWidth="1.1" opacity="0.72" />
        </g>
        <ellipse cx="20" cy="12" rx="12.5" ry="6.4" fill="rgba(255,255,255,0.58)" />
        <path d="M9 7A18 18 0 0 1 31.5 9" fill="none" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.72" />
      </svg>

      <svg className="era-logo-mark era-logo-modern" viewBox="0 0 40 40" role="img">
        <g fill="none" stroke="currentColor" strokeLinecap="square">
          <path d="M8 7A18 18 0 1 1 8 33" strokeWidth="3.1" />
          <path d="M11.5 28.5A13 13 0 1 1 28.5 11.5" strokeWidth="2.6" />
          <path d="M14.5 26A9 9 0 1 1 26.2 26" strokeWidth="2.6" />
          <path d="M18 9.5h5.5" strokeWidth="0.9" opacity="0.9" />
          <path d="M22 11.7h6" strokeWidth="0.9" opacity="0.9" />
          <path d="M15.5 31h5.5" strokeWidth="0.9" opacity="0.9" />
        </g>
      </svg>
    </span>
  );
}
