import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Mobileflow OAuth Callback",
  robots: {
    index: false,
    follow: false,
  },
  description: "OAuth callback forwarder for Mobileflow iOS app.",
};

export default function MobileflowCallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-mono text-foreground p-8">
      <div className="text-center max-w-sm">
        <div className="mb-6">
          <div className="inline-block w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-lg mb-2 tracking-tight">Returning to Mobileflow…</p>
        <p className="text-sm text-muted-foreground mb-6">
          If the app doesn’t open automatically,{" "}
          <a
            href="mobileflow://oauth/callback"
            className="underline hover:text-foreground transition-colors"
          >
            tap here
          </a>
          .
        </p>
        <p className="text-[10px] text-muted-foreground/60">
          jeremycollins.net • mobileflow callback
        </p>
      </div>

      {/* Immediate redirect to custom scheme, forwarding all query params (code, state, etc.) from Webflow */}
      <Script id="mobileflow-callback-redirect" strategy="beforeInteractive">
        {`
          (function() {
            try {
              const search = window.location.search || "";
              const hash = window.location.hash || "";
              const target = "mobileflow://oauth/callback" + search + hash;
              window.location.replace(target);
            } catch (e) {
              // Fallback: do nothing, the manual link is available
            }
          })();
        `}
      </Script>
    </div>
  );
}
