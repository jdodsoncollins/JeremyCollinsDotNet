import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side Webflow OAuth token proxy for Mobileflow native apps.
 * Holds client_secret; never expose it to the client binary.
 *
 * POST JSON:
 *  - grant_type: authorization_code | refresh_token
 *  - code + code_verifier + redirect_uri + client_id (authorization_code)
 *  - refresh_token + client_id (refresh_token)
 *
 * Env (Vercel):
 *  - WEBFLOW_CLIENT_ID
 *  - WEBFLOW_CLIENT_SECRET
 *  - WEBFLOW_REDIRECT_URI (optional override; defaults to production callback)
 */

const WEBFLOW_TOKEN_URL = 'https://api.webflow.com/oauth/access_token';
const DEFAULT_REDIRECT = 'https://jeremycollins.net/mobileflow-callback';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type TokenBody = {
  grant_type?: string;
  code?: string;
  code_verifier?: string;
  redirect_uri?: string;
  client_id?: string;
  refresh_token?: string;
};

function corsHeaders(origin: string | null): HeadersInit {
  // Native apps don't send Origin; allow browser debugging of the proxy.
  const allow = origin ?? '*';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request.headers.get('origin')),
  });
}

export async function POST(request: NextRequest) {
  const headers = corsHeaders(request.headers.get('origin'));
  const clientId = process.env.WEBFLOW_CLIENT_ID;
  const clientSecret = process.env.WEBFLOW_CLIENT_SECRET;
  const configuredRedirect =
    process.env.WEBFLOW_REDIRECT_URI ?? DEFAULT_REDIRECT;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'server_misconfigured', error_description: 'Token proxy is not configured.' },
      { status: 500, headers },
    );
  }

  let body: TokenBody;
  try {
    body = (await request.json()) as TokenBody;
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', error_description: 'Expected JSON body.' },
      { status: 400, headers },
    );
  }

  const grantType = body.grant_type ?? 'authorization_code';

  // Only accept the public client id that matches this app deployment.
  if (body.client_id && body.client_id !== clientId) {
    return NextResponse.json(
      { error: 'invalid_client', error_description: 'client_id does not match proxy configuration.' },
      { status: 400, headers },
    );
  }

  // Webflow OAuth token endpoint accepts JSON (Data API docs).
  const upstreamBody: Record<string, string> = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: grantType,
  };

  if (grantType === 'authorization_code') {
    // Webflow requires code + client credentials. code_verifier is sent when the
    // client used PKCE (Mobileflow always does). redirect_uri must match authorize.
    // See: https://developers.webflow.com/data/reference/oauth-app
    if (!body.code) {
      return NextResponse.json(
        {
          error: 'invalid_request',
          error_description: 'code is required.',
        },
        { status: 400, headers },
      );
    }
    // Enforce registered redirect URI (do not trust arbitrary client-supplied URIs).
    const redirectUri = body.redirect_uri ?? configuredRedirect;
    const allowed = new Set([
      configuredRedirect,
      DEFAULT_REDIRECT,
      'https://www.jeremycollins.net/mobileflow-callback',
    ]);
    if (!allowed.has(redirectUri)) {
      return NextResponse.json(
        { error: 'invalid_request', error_description: 'redirect_uri is not allowed.' },
        { status: 400, headers },
      );
    }
    // Always send the apex redirect registered with Webflow (must match authorize URL).
    upstreamBody.code = body.code;
    upstreamBody.redirect_uri = DEFAULT_REDIRECT;
    if (body.code_verifier) {
      upstreamBody.code_verifier = body.code_verifier;
    }
  } else if (grantType === 'refresh_token') {
    if (!body.refresh_token) {
      return NextResponse.json(
        {
          error: 'invalid_request',
          error_description: 'refresh_token is required.',
        },
        { status: 400, headers },
      );
    }
    upstreamBody.refresh_token = body.refresh_token;
  } else {
    return NextResponse.json(
      { error: 'unsupported_grant_type' },
      { status: 400, headers },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(WEBFLOW_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(upstreamBody),
    });
  } catch {
    return NextResponse.json(
      { error: 'upstream_unreachable', error_description: 'Could not reach Webflow token endpoint.' },
      { status: 502, headers },
    );
  }

  const text = await upstream.text();
  const contentType = upstream.headers.get('content-type') ?? 'application/json';

  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      ...headers,
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
    },
  });
}
