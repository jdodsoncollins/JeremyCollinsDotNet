import { NextRequest, NextResponse } from 'next/server';

/**
 * HTTPS OAuth redirect target registered with Webflow.
 * Issues an empty 302 to the native custom scheme so
 * ASWebAuthenticationSession can complete. Do not attach an HTML body.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const APP_CALLBACK = 'mobileflow://oauth/callback';

function appTarget(request: NextRequest): string {
  // Preserve query as-is (code, state, error, …). Drop hash (never used for codes).
  const search = request.nextUrl.search || '';
  return `${APP_CALLBACK}${search}`;
}

export async function GET(request: NextRequest) {
  const target = appTarget(request);

  // Empty 302. A HTML body on this hop crashes ASWebAuthenticationSession
  // ("This page was reloaded because a problem occurred") after Google login.
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: target,
      'Cache-Control': 'no-store',
    },
  });
}
