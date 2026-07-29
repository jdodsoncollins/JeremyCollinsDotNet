import { NextRequest, NextResponse } from 'next/server';

/**
 * HTTPS OAuth redirect target registered with Webflow.
 * Issues an immediate 302 to the native custom scheme so
 * ASWebAuthenticationSession / expo-web-browser can complete without
 * waiting on client JS. HTML body is a fallback when the hop fails.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const APP_CALLBACK = 'mobileflow://oauth/callback';

function appTarget(request: NextRequest): string {
  // Preserve query as-is (code, state, error, …). Drop hash (never used for codes).
  const search = request.nextUrl.search || '';
  return `${APP_CALLBACK}${search}`;
}

function fallbackHtml(target: string, received: string): string {
  const safeTarget = target
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
  const safeReceived = received
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="refresh" content="0;url=${safeTarget}" />
  <title>Returning to Mobileflow</title>
  <style>
    body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background:#0a0608; color:#fff;
      padding:24px; text-align:center; }
    a { display:inline-block; background:#fff; color:#000; padding:14px 24px; border-radius:6px;
      font-size:16px; font-weight:600; text-decoration:none; }
    .meta { font-size:12px; opacity:.7; margin:12px 0 24px; word-break:break-all;
      background:rgba(255,255,255,.05); padding:8px 12px; border-radius:4px; }
    .hint { font-size:11px; opacity:.5; margin-top:20px; max-width:280px; margin-left:auto; margin-right:auto; }
  </style>
</head>
<body>
  <div>
    <p style="font-size:18px;margin-bottom:12px">Returning to Mobileflow…</p>
    <div class="meta">Received at forwarder: ${safeReceived || '(no query params)'}</div>
    <a href="${safeTarget}">Return to Mobileflow app</a>
    <p class="hint">Auto-redirect attempted. If the app doesn’t open, tap the button above.</p>
  </div>
  <script>
    try { window.location.replace(${JSON.stringify(target)}); } catch (e) {}
  </script>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  const target = appTarget(request);
  const received = request.nextUrl.search || '';

  // Prefer Location for in-app auth sessions; HTML is the human fallback.
  return new NextResponse(fallbackHtml(target, received), {
    status: 302,
    headers: {
      Location: target,
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
