'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import OnboardingWizard from './OnboardingWizard';
import ProposalReviewLayout from '@/components/Onboarding/ProposalReviewLayout';

export default function LocalizedOnboardingPage() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState('en');
  const [token, setToken] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    const currentLang = path.startsWith('/ar') ? 'ar' : 'en';
    setLang(currentLang);

    let t = searchParams.get('t') || sessionStorage.getItem('secure_portal_token');
    
    if (!t) {
      setError('Access Denied: Secure token missing.');
      return;
    }

    if (searchParams.has('t')) {
      sessionStorage.setItem('secure_portal_token', t);
    }

    setToken(t);

    fetch('/api/onboarding/portal', {
      headers: { 'Authorization': `Bearer ${t}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid or expired token.');
        return res.json();
      })
      .then((data) => setProjectData(data))
      .catch((err) => setError(err.message));
  }, [searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-4 font-mono text-sm text-red-400 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
          {error}
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="animate-pulse font-tajawal text-xs uppercase tracking-[0.45em] text-cyan-400">
          Authenticating Payload...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-slate-100" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_55%)] blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.16),transparent_55%)] blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_140px_rgba(2,8,24,0.8)] backdrop-blur-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
            <div>
              <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">{lang.toUpperCase()} Client Portal</p>
              <h1 className="mt-4 font-cairo text-5xl font-bold uppercase tracking-[0.03em] text-white">AtlaHub Onboarding Gateway</h1>
              <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                Immersive setup for your project. This encrypted portal has successfully authorized your bearer token and will actively sync your decisions to the Admin lifecycle engine.
              </p>
            </div>
            <div className="rounded-[2rem] border border-cyan-400/10 bg-emerald-500/5 p-6 shadow-[0_30px_80px_rgba(16,185,129,0.1)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Connection Status</p>
              <p className="mt-4 font-mono text-sm text-emerald-200">
                [SECURE SESSION ESTABLISHED]
              </p>
              <p className="mt-4 text-sm text-slate-400 text-uppercase">Project Status: {projectData.project?.status || projectData.project?.lifecycleStatus || 'ACTIVE'}</p>
            </div>
          </div>
        </div>

        {projectData.project?.type === 'PROPOSAL' ? (
          <ProposalReviewLayout lang={lang} token={token} projectInfo={projectData.project} />
        ) : (
          <OnboardingWizard lang={lang} token={token} initialData={projectData} />
        )}
      </div>
    </div>
  );
}
