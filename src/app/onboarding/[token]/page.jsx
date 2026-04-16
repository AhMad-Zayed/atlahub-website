import { redirect } from 'next/navigation';
import { getProjectByToken } from '@/lib/onboarding';
import OnboardingWizard from './OnboardingWizard';

export default async function OnboardingPage({ params }) {
  const resolvedParams = await params;
  const token = resolvedParams?.token;
  const projectData = await getProjectByToken(token);

  if (!projectData) {
    redirect('/onboarding/access-denied');
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-slate-100">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_55%)] blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.16),transparent_55%)] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_140px_rgba(2,8,24,0.8)] backdrop-blur-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
            <div>
              <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">Client Portal</p>
              <h1 className="mt-4 text-5xl font-cairo font-bold uppercase tracking-[0.03em] text-white">Onboarding Gateway</h1>
              <p className="mt-4 max-w-3xl text-slate-300 leading-8">
                Guided five-step luxury onboarding for high-value brand journeys. Your secure link retains progress, resumes updates, and keeps every draft in sync.
              </p>
            </div>
            <div className="rounded-[2rem] border border-cyan-400/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(6,24,44,0.45)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Secure access token</p>
              <p className="mt-4 break-all rounded-3xl bg-slate-900/90 px-4 py-4 font-mono text-sm text-cyan-100 shadow-inner shadow-cyan-500/10">
                {token}
              </p>
              <p className="mt-4 text-sm text-slate-400">Keep this link confidential. Your progress will automatically resume if you return with the same secure token.</p>
            </div>
          </div>
        </div>

        <OnboardingWizard token={token} initialData={projectData} />
      </div>
    </div>
  );
}
