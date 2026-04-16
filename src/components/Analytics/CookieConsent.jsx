'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = document.cookie.split('; ').find(row => row.startsWith('atla_consent='));
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (verdict) => {
    document.cookie = `atla_consent=${verdict}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    setShow(false);
    
    if (verdict === 'accepted') {
      window.dispatchEvent(new Event('atla_consent_accepted'));
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-32px)] max-w-2xl -translate-x-1/2 p-1"
        >
          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/90 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.8)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-cairo text-lg font-bold text-white">Your Privacy Matters</h3>
                <p className="mt-1 font-tajawal text-sm leading-6 text-slate-300">
                  We use cookies and telemetry strictly for improving performance, analytics, and security. No cross-site marketing trackers are used. tracking remains disabled by default until accepted.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 md:flex-row">
                <button
                  onClick={() => handleConsent('rejected')}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 font-tajawal text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Reject All
                </button>
                <button
                  onClick={() => handleConsent('accepted')}
                  className="rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-2.5 font-tajawal text-sm font-semibold text-slate-950 transition hover:brightness-110"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
