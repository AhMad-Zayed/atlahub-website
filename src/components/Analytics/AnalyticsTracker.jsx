'use client';

import { useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function sha256(value) {
  const encoded = new TextEncoder().encode(String(value || ''));
  const hash = await crypto.subtle.digest('SHA-256', encoded);
  return toHex(hash);
}

function getCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.textBaseline = 'top';
    ctx.font = '16px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(12, 12, 120, 28);
    ctx.fillStyle = '#069';
    ctx.fillText('AtlaHub-CMS', 14, 14);
    return canvas.toDataURL();
  } catch {
    return '';
  }
}

function getWebglFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return '';
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : '';
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    return `${vendor}|${renderer}|${gl.getParameter(gl.VERSION)}`;
  } catch {
    return '';
  }
}

function getSignals() {
  return {
    browser: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    screen: `${window.screen.width}x${window.screen.height}x${window.devicePixelRatio || 1}`,
  };
}

function readCookie(name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const fingerprintRef = useRef('');
  const scrollMarksRef = useRef(new Set());
  const dwellStartsRef = useRef(new Map());
  const currentPath = useMemo(() => pathname || '/', [pathname]);

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      const canvasRaw = getCanvasFingerprint();
      const webglRaw = getWebglFingerprint();
      const baseSignals = getSignals();
      const fingerprintRaw = [
        canvasRaw,
        webglRaw,
        baseSignals.browser,
        baseSignals.platform,
        baseSignals.language,
        baseSignals.timezone,
        baseSignals.screen,
      ].join('||');
      const fingerprint = await sha256(fingerprintRaw);
      const canvasHash = await sha256(canvasRaw || 'none');
      const webglHash = await sha256(webglRaw || 'none');
      if (cancelled) return;

      fingerprintRef.current = fingerprint;
      window.__atlaFingerprint = fingerprint;
      document.cookie = `atla_fp=${fingerprint}; path=/; max-age=${60 * 60 * 24 * 365 * 2}; samesite=lax`;
      const atlaUid = readCookie('atla_uid');
      const payloadBase = {
        fingerprint,
        visitor_uid: atlaUid || '',
        signals: {
          ...baseSignals,
          canvas_hash: canvasHash,
          webgl_hash: webglHash,
        },
        page_path: currentPath,
      };

      const sendEvent = async (event) => {
        try {
          await fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payloadBase, ...event }),
            keepalive: true,
          });
        } catch {
          // best effort only
        }
      };

      sendEvent({ type: 'page_view', metadata: { title: document.title } });

      const onScroll = () => {
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (pageHeight <= 0) return;
        const depth = Math.min(100, Math.round((window.scrollY / pageHeight) * 100));
        [25, 50, 75, 100].forEach((mark) => {
          if (depth >= mark && !scrollMarksRef.current.has(mark)) {
            scrollMarksRef.current.add(mark);
            sendEvent({ type: 'scroll_depth', scroll_depth: mark });
          }
        });
      };

      const onClick = (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const sectionEl = target.closest('[data-analytics-section]');
        const anchor = target.closest('a');
        const sectionKey = sectionEl?.getAttribute('data-analytics-section') || 'general';
        const targetLabel =
          target.getAttribute('aria-label') ||
          target.getAttribute('title') ||
          target.innerText?.slice(0, 120) ||
          target.tagName;

        sendEvent({
          type: 'click',
          section_key: sectionKey,
          click_x: event.clientX,
          click_y: event.clientY,
          click_target: targetLabel,
          metadata: {
            href: anchor?.getAttribute('href') || null,
          },
        });

        const href = (anchor?.getAttribute('href') || '').toLowerCase();
        if (href.includes('wa.me') || href.includes('whatsapp')) {
          fetch('/api/analytics/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...payloadBase,
              event_name: 'WhatsAppClickLead',
              page_path: currentPath,
              payload: { href },
            }),
            keepalive: true,
          }).catch(() => {});
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const key =
              entry.target.getAttribute('data-analytics-section') ||
              entry.target.id ||
              'section';
            if (entry.isIntersecting) {
              dwellStartsRef.current.set(key, performance.now());
            } else if (dwellStartsRef.current.has(key)) {
              const startedAt = dwellStartsRef.current.get(key);
              const dwellMs = Math.max(0, Math.round(performance.now() - startedAt));
              dwellStartsRef.current.delete(key);
              sendEvent({
                type: 'dwell_time',
                section_key: key,
                dwell_ms: dwellMs,
              });
            }
          });
        },
        { threshold: 0.5 },
      );

      document.querySelectorAll('[data-analytics-section]').forEach((el) => observer.observe(el));
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('click', onClick);
      onScroll();

      const onBeforeUnload = () => {
        dwellStartsRef.current.forEach((startedAt, key) => {
          const dwellMs = Math.max(0, Math.round(performance.now() - startedAt));
          navigator.sendBeacon(
            '/api/analytics/track',
            new Blob(
              [JSON.stringify({ ...payloadBase, type: 'dwell_time', section_key: key, dwell_ms: dwellMs })],
              { type: 'application/json' },
            ),
          );
        });
      };

      window.addEventListener('beforeunload', onBeforeUnload);

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('click', onClick);
        window.removeEventListener('beforeunload', onBeforeUnload);
      };
    };

    let cleanup = null;
    boot().then((dispose) => {
      cleanup = dispose;
    });

    return () => {
      cancelled = true;
      scrollMarksRef.current = new Set();
      dwellStartsRef.current.clear();
      if (typeof cleanup === 'function') cleanup();
    };
  }, [currentPath]);

  return null;
}
