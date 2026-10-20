"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { analyticsLocation, analyticsAcquisition, persistAnalyticsConsent, validMeasurementId } from "@/lib/website-analytics.mjs";
import styles from "./website-analytics.module.css";

const storageKey = "jeremycollins-website-analytics";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
type Consent = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function WebsiteAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const initialized = useRef(false);
  const acquisition = useRef(analyticsAcquisition("", ""));
  const lastPage = useRef<string | null>(null);
  const location = analyticsLocation(pathname);
  const enabled = validMeasurementId(measurementId);

  useEffect(() => {
    acquisition.current = analyticsAcquisition(window.location.search, document.referrer);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "accepted" || saved === "declined") setConsent(saved);
    } catch { /* Storage unavailable: ask again rather than assume consent. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!measurementId) return;
    const mayMeasure = enabled && ready && consent === "accepted" && Boolean(location);
    // Also stop an already-loaded tag after an SPA transition to an excluded route.
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = !mayMeasure;
    if (!mayMeasure || !location) return;
    if (!initialized.current) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer!.push(arguments); };
      window.gtag("consent", "default", {
        analytics_storage: "granted", ad_storage: "denied",
        ad_user_data: "denied", ad_personalization: "denied",
      });
      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        send_page_view: false,
        page_location: location,
        ...acquisition.current,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_expires: 60 * 60 * 24 * 90,
      });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.referrerPolicy = "no-referrer";
      document.head.appendChild(script);
      initialized.current = true;
    }
    window.gtag?.("set", { page_location: location, ...acquisition.current });
    if (lastPage.current !== location) {
      window.gtag?.("event", "page_view", {
        page_location: location,
        ...acquisition.current,
        page_title: pathname === "/" ? "Home" : pathname,
      });
      lastPage.current = location;
    }
  }, [consent, enabled, location, pathname, ready]);

  function choose(next: Exclude<Consent, null>) {
    let saved = false;
    try { saved = persistAnalyticsConsent(window.localStorage, storageKey, next); } catch { /* Storage getter may also be blocked. */ }
    setStorageWarning(!saved);
    setSettingsOpen(false);
    if (next === "declined" && initialized.current) {
      // Disable collection synchronously, clear first-party GA cookies, then unload the tag.
      (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.trim().split("=")[0];
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ["", locationHost(), ".jeremycollins.net"]) {
          document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""}`;
        }
      }
      // Never reload into stale accepted consent when storage writes fail.
      if (saved) window.location.reload();
    }
    setConsent(next);
  }

  if (!enabled || !ready || !location) return null;
  return (
    <aside className={styles.container} aria-label="Website analytics preferences">
      {(consent === null || settingsOpen) ? (
        <div className={styles.panel}>
          <p>Allow optional Google Analytics cookies to help improve this website? Nothing is sent to Google Analytics until you accept. This does not change privacy inside the apps.</p>
          <div className={styles.actions}>
            <button type="button" onClick={() => choose("accepted")}>Accept analytics</button>
            <button type="button" onClick={() => choose("declined")}>Decline analytics</button>
            <Link href="/privacy">Website privacy</Link>
            {consent !== null && <button type="button" onClick={() => setSettingsOpen(false)}>Close</button>}
          </div>
        </div>
      ) : <button type="button" className={styles.settings} onClick={() => setSettingsOpen(true)}>Analytics preferences</button>}
      {storageWarning && <p className={styles.panel} role="status">Your browser could not save this choice. It applies only to this tab until the page reloads. If you declined, analytics is stopped now, but may resume after reload if an older accepted choice is stored. Enable browser storage and decline again to save your preference.</p>}
    </aside>
  );
}

function locationHost() { return window.location.hostname; }
