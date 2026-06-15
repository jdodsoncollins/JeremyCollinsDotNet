import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobileflow OAuth Callback",
  robots: {
    index: false,
    follow: false,
  },
  description: "OAuth callback forwarder for Mobileflow iOS app.",
};

export default function MobileflowCallback() {
  // This runs on the client after mount. We also have an inline script below for earlier execution.
  // The goal is to immediately forward the ?code=...&state=... (and any other params Webflow sent)
  // to the app's custom scheme so ASWebAuthenticationSession can complete the OAuth.
  if (typeof window !== "undefined") {
    // Safety: try immediately if possible
    tryRedirect();
  }

  function tryRedirect() {
    try {
      const search = window.location.search || "";
      const hash = window.location.hash || "";
      const target = "mobileflow://oauth/callback" + search + hash;
      window.location.replace(target);
    } catch (e) {
      // ignore, manual button will be available
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "monospace",
      background: "#0a0608",
      color: "#fff",
      padding: 24,
      textAlign: "center"
    }}>
      <div>
        <p style={{ fontSize: 18, marginBottom: 12 }}>Returning to Mobileflow…</p>

        {/* Debug info so you can see what Webflow actually sent to this page */}
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 24, wordBreak: "break-all" }}>
          Received: {typeof window !== "undefined" ? window.location.search || "(no query)" : "(server)"}
        </div>

        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              const search = window.location.search || "";
              const hash = window.location.hash || "";
              window.location.replace("mobileflow://oauth/callback" + search + hash);
            }
          }}
          style={{
            background: "#fff",
            color: "#000",
            border: "none",
            padding: "12px 20px",
            borderRadius: 6,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Return to Mobileflow app
        </button>

        <p style={{ fontSize: 11, opacity: 0.5, marginTop: 20 }}>
          If the app doesn’t open, tap the button above.
        </p>
      </div>

      {/* Very early inline script — runs before React if possible */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var search = window.location.search || "";
                var hash = window.location.hash || "";
                var target = "mobileflow://oauth/callback" + search + hash;
                window.location.replace(target);
              } catch (e) {}
            })();
          `
        }}
      />
    </div>
  );
}
