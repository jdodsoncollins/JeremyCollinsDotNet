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
        <g fill="none" stroke="#050505" strokeLinecap="square" strokeLinejoin="miter" shapeRendering="crispEdges">
          <path d="M11 15V11H29V29H24" strokeWidth="2.4" />
          <path d="M20 31H10V25" strokeWidth="2.4" />
          <path d="M10 22V17" strokeWidth="2.4" />
          <path d="M15 27V15H27V20" strokeWidth="2.2" />
          <path d="M22 26H16" strokeWidth="2.2" />
          <path d="M18 25V18H24V25" strokeWidth="2" />
          <path d="M17 13H24" strokeWidth="1" />
          <path d="M18 30H22" strokeWidth="1" />
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
            <rect x="5" y="5" width="30" height="30" rx="7" />
          </clipPath>
        </defs>
        <rect x="5" y="5" width="30" height="30" rx="7" fill="url(#era-logo-aqua-shell)" stroke="#004f9f" strokeWidth="1.2" />
        <g clipPath="url(#era-logo-aqua-clip)" fill="none" stroke="url(#era-logo-aqua-stroke)" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M9 10H30V30H10" strokeWidth="2.8" />
          <path d="M13 27V14H27V20" strokeWidth="2.6" />
          <path d="M17 26V18H24V26" strokeWidth="2.4" />
          <path d="M18 12h6" strokeWidth="1" opacity="0.85" />
          <path d="M16 31h6" strokeWidth="1" opacity="0.72" />
        </g>
        <ellipse cx="20" cy="12" rx="11.5" ry="5.6" fill="rgba(255,255,255,0.58)" />
        <path d="M10 8H30" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.72" />
      </svg>

      <img className="era-logo-mark era-logo-modern" src="/inv-logo.png" alt="" />
    </span>
  );
}
