'use client';

import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function MobileflowCallback() {
  const [received, setReceived] = useState<string>('(loading...)');

  // Auto-redirect as soon as possible on the client
  useEffect(() => {
    try {
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      const target = 'mobileflow://oauth/callback' + search + hash;
      // Do the handoff to the native app
      window.location.replace(target);
    } catch (e) {
      // ignore for manual fallback
    }

    // Capture what we received for debug visibility
    setReceived(window.location.search || '(no query params)');
  }, []);

  const manualRedirect = () => {
    try {
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      window.location.replace('mobileflow://oauth/callback' + search + hash);
    } catch (e) {
      alert('Could not redirect. Please copy the URL and handle manually if needed.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace',
      background: '#0a0608',
      color: '#fff',
      padding: 24,
      textAlign: 'center' as const
    }}>
      <div>
        <p style={{ fontSize: 18, marginBottom: 12 }}>Returning to Mobileflow…</p>

        {/* Debug: show exactly what Webflow sent us */}
        <div style={{ 
          fontSize: 12, 
          opacity: 0.7, 
          marginBottom: 24, 
          wordBreak: 'break-all',
          background: 'rgba(255,255,255,0.05)',
          padding: '8px 12px',
          borderRadius: 4
        }}>
          Received at forwarder: {received}
        </div>

        <button
          onClick={manualRedirect}
          style={{
            background: '#fff',
            color: '#000',
            border: 'none',
            padding: '14px 24px',
            borderRadius: 6,
            fontSize: 16,
            fontFamily: 'monospace',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Return to Mobileflow app
        </button>

        <p style={{ fontSize: 11, opacity: 0.5, marginTop: 20, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
          Auto-redirect attempted. If the app doesn’t open, tap the button above.
          <br /><br />
          This page forwards the OAuth code/state from Webflow back to the native app via the registered custom scheme.
        </p>
      </div>
    </div>
  );
}
