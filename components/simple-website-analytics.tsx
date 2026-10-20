"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { simpleAnalyticsPath } from "@/lib/simple-analytics.mjs";

declare global {
  interface Window { sa_pageview?: (path: string) => void; }
}

export function SimpleWebsiteAnalytics() {
  const pathname = usePathname();
  const path = simpleAnalyticsPath(pathname);
  const [loaded, setLoaded] = useState(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!loaded || !path || !window.sa_pageview || lastPath.current === path) return;
    window.sa_pageview(path);
    lastPath.current = path;
  }, [loaded, path]);

  if (!path) return null;
  return <Script
    id="simple-website-analytics"
    src="https://scripts.simpleanalyticscdn.com/latest.js"
    async
    strategy="afterInteractive"
    data-auto-collect="false"
    data-ignore-pages="/oauth,/oauth/*,/mobileflow-callback,/mobileflow-callback/*,/mobileflow-token,/mobileflow-token/*"
    data-ignore-metrics="referrer,utm"
    referrerPolicy="no-referrer"
    onReady={() => setLoaded(true)}
  />;
}
