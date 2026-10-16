import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Old installations must update; never forward authorization values from this host.
function retired() {
  return NextResponse.json({ error: 'endpoint_retired', message: 'Update Webflume to reconnect.' }, {
    status: 410,
    headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' },
  });
}

export { retired as GET, retired as POST, retired as OPTIONS, retired as PUT, retired as PATCH, retired as DELETE, retired as HEAD };
