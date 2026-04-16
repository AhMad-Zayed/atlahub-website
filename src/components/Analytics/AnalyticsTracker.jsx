'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const consentRef = useRef(false);
  const timeOnPageRef = useRef(0);
  const timerLockRef = useRef(null);

  const checkConsent = useCallback(() => {
    return document.cookie.split('; ').some(row => row.startsWith('atla_consent=accepted'));
  }, []);

  const trackEvent = useCallback((type, extra = {}) => {
    if (!consentRef.current && !checkConsent()) return;
    
    consentRef.current = true;
    
    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          path: window.location.pathname,
          ...extra
        }),
        keepalive: true
      });
    } catch {}
  }, [checkConsent]);

  useEffect(() => {
    const handleConsentEvent = () => {
      consentRef.current = true;
      trackEvent('page_view', { dwell_ms: 0 }); // Fire immediately upon consent
    };
    
    window.addEventListener('atla_consent_accepted', handleConsentEvent);
    return () => window.removeEventListener('atla_consent_accepted', handleConsentEvent);
  }, [trackEvent]);

  useEffect(() => {
    // Route Change Event
    consentRef.current = checkConsent();
    if (consentRef.current) {
      trackEvent('page_view', { dwell_ms: 0 });
    }
  }, [pathname, checkConsent, trackEvent]);

  useEffect(() => {
    // Heartbeat for Active Duration Tracking
    const beat = () => {
      if (!consentRef.current) return;
      timeOnPageRef.current += 10;
      trackEvent('heartbeat', { dwell_ms: 10000 });
    };

    timerLockRef.current = setInterval(beat, 10000);
    return () => clearInterval(timerLockRef.current);
  }, [trackEvent]);

  useEffect(() => {
    // Lightweight Global Click Tracking
    const onClick = (e) => {
      if (!consentRef.current) return;
      const target = e.target;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        const el = target.closest('button') || target.closest('a') || target;
        trackEvent('click', {
          target: el.getAttribute('href') || el.innerText?.slice(0, 60) || el.getAttribute('aria-label') || el.tagName
        });
      }
    };
    
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [trackEvent]);

  return null;
}
