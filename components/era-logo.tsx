export function EraLogo() {
  return (
    <span className="era-logo" aria-hidden="true">
      <svg className="era-logo-mark era-logo-1980s" viewBox="0 0 40 40" role="img">
        <path d="M20 4c8.8 0 16 7.2 16 16s-7.2 16-16 16S4 28.8 4 20 11.2 4 20 4Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 9c6.1 0 11 4.9 11 11s-4.9 11-11 11S9 26.1 9 20 13.9 9 20 9Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 26c2.3 2.1 5.4 3 8.4 2.4 4.7-.9 7.9-5.5 7-10.2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
        <path d="M27 7h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <svg className="era-logo-mark era-logo-1990s" viewBox="0 0 40 40" role="img">
        <rect x="5" y="6" width="30" height="28" fill="var(--card)" stroke="#000" strokeWidth="1.5" />
        <rect x="7" y="8" width="26" height="6" fill="#000080" />
        <rect x="9" y="10" width="3" height="2" fill="#fff" />
        <rect x="25" y="9.5" width="3" height="3" fill="#c0c0c0" stroke="#fff" strokeWidth="0.5" />
        <rect x="29" y="9.5" width="3" height="3" fill="#c0c0c0" stroke="#fff" strokeWidth="0.5" />
        <path d="M13 28h14" stroke="#000" strokeWidth="3" strokeLinecap="square" />
        <path d="M13 28c0-6 3-10 8-10" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="square" />
      </svg>

      <svg className="era-logo-mark era-logo-2000s" viewBox="0 0 40 40" role="img">
        <defs>
          <linearGradient id="era-logo-aqua" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.46" stopColor="#86d8ff" />
            <stop offset="0.5" stopColor="#0b83df" />
            <stop offset="1" stopColor="#0051b5" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="16" fill="url(#era-logo-aqua)" stroke="#004f9f" strokeWidth="1.5" />
        <ellipse cx="20" cy="13" rx="11" ry="6" fill="rgba(255,255,255,0.72)" />
        <path d="M13 26c2.2 2.3 5.5 3.4 8.8 2.7 4.7-1 7.7-5.6 6.8-10.3" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <path d="M13 26c2.2 2.3 5.5 3.4 8.8 2.7 4.7-1 7.7-5.6 6.8-10.3" fill="none" stroke="#043a7a" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      <svg className="era-logo-mark era-logo-modern" viewBox="0 0 40 40" role="img">
        <defs>
          <linearGradient id="era-logo-modern-shell" x1="7" x2="33" y1="4" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.94" />
            <stop offset="0.48" stopColor="#9db7ff" stopOpacity="0.46" />
            <stop offset="1" stopColor="#111827" stopOpacity="0.62" />
          </linearGradient>
          <linearGradient id="era-logo-modern-stroke" x1="10" x2="30" y1="7" y2="33" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c7d2fe" />
            <stop offset="1" stopColor="#f8fafc" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="28" height="28" rx="9" fill="url(#era-logo-modern-shell)" stroke="rgba(255,255,255,0.52)" strokeWidth="1.2" />
        <path d="M14 26c2.2 2.2 5.4 3.1 8.4 2.4 4.7-1.1 7.6-5.7 6.6-10.4" fill="none" stroke="url(#era-logo-modern-stroke)" strokeWidth="3" strokeLinecap="round" />
        <path d="M12 14h16" stroke="rgba(255,255,255,0.72)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12 19h9" stroke="rgba(255,255,255,0.48)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}
