import { NextRequest, NextResponse } from "next/server";

/**
 * OAuth callback bridge for provider flows that are completed by a local CLI.
 *
 * The X `xurl auth oauth2 --headless` flow can use this URL as the registered
 * callback. After consent, X redirects here with `code` and `state`; this page
 * displays the complete callback URL so the operator can paste it back into
 * xurl. The route deliberately does not exchange, log, or persist tokens.
 *
 * Register this exact URL with the provider:
 *   https://jeremycollins.net/oauth
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function page(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: dark; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center;
      background: #09090b; color: #f4f4f5; font: 16px/1.55 system-ui, sans-serif; }
    main { width: min(680px, calc(100% - 40px)); }
    h1 { font-size: 1.35rem; }
    p { color: #a1a1aa; }
    code, pre { overflow-wrap: anywhere; white-space: pre-wrap; }
    pre { padding: 16px; border: 1px solid #3f3f46; border-radius: 8px;
      background: #18181b; color: #e4e4e7; }
    .warning { color: #fbbf24; }
  </style>
</head>
<body><main>${body}</main></body>
</html>`;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    const description = url.searchParams.get("error_description") ?? "The provider rejected authorization.";
    return new NextResponse(
      page(
        "OAuth authorization failed",
        `<h1>OAuth authorization failed</h1><p class="warning">${escapeHtml(error)}</p><p>${escapeHtml(description)}</p><p>You can close this tab and retry the authorization flow.</p>`,
      ),
      { status: 400, headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
      } },
    );
  }

  if (!code || !state) {
    return new NextResponse(
      page(
        "OAuth callback",
        `<h1>OAuth callback endpoint</h1><p>This URL is ready to receive an OAuth callback. Start the provider flow from the local CLI or application.</p>`,
      ),
      { status: 200, headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
      } },
    );
  }

  // Do not log or persist the authorization code. The URL is intentionally
  // shown only for the local operator to paste into the waiting xurl process.
  const callbackUrl = url.toString();
  return new NextResponse(
    page(
      "OAuth authorization complete",
      `<h1>Authorization complete</h1><p>Copy the callback URL below and paste it into the waiting local OAuth command.</p><p class="warning">This URL contains a one-time authorization code. Treat it as sensitive and do not share it.</p><pre>${escapeHtml(callbackUrl)}</pre><p>You can close this tab after the local command reports success.</p>`,
    ),
    { status: 200, headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
      } },
  );
}
