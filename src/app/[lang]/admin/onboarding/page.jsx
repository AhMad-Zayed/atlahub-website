import Link from 'next/link';
import { createOnboardingProject, extendOnboardingTokenAction, promoteOnboardingProject, regenerateOnboardingTokenAction, revokeOnboardingTokenAction } from '../actions';
import { getPipelineProjects } from '@/lib/onboarding';

function TokenStatusBadge({ token }) {
  if (!token) {
    return <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-rose-200">No token</span>;
  }

  const expiresAt = new Date(token.expires_at);
  const isExpired = expiresAt <= new Date();

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${isExpired ? 'bg-rose-500/10 text-rose-200' : 'bg-emerald-400/10 text-emerald-200'}`}>
      {isExpired ? 'Expired' : token.is_active ? 'Active' : 'Inactive'}
    </span>
  );
}

function formatUtcDate(value) {
  return new Date(value).toUTCString();
}

export default async function OnboardingAdminPage({ params }) {
  const { lang } = params;
  const createOnboardingProjectAction = createOnboardingProject.bind(null, lang);
  const projects = await getPipelineProjects();
  const totals = {
    pipeline: projects.filter((project) => project.status === 'Pipeline').length,
    review: projects.filter((project) => project.status === 'Review').length,
    approved: projects.filter((project) => project.status === 'Approved').length,
    completed: projects.filter((project) => project.status === 'Completed').length,
    total: projects.length,
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_rgba(2,8,24,0.75)] backdrop-blur-xl">
          <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">Onboarding Control Room</p>
          <h1 className="mt-4 text-4xl font-cairo font-bold text-white">Elite Onboarding Token Management</h1>
          <p className="mt-4 max-w-3xl text-slate-400 leading-8">
            Monitor secure onboarding links, extend access windows, revoke expired tokens, and promote completed client submissions into the public portfolio.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-4">
          {[
            { label: 'Total Projects', value: totals.total, accent: 'from-cyan-400 to-sky-500' },
            { label: 'In Pipeline', value: totals.pipeline, accent: 'from-fuchsia-500 to-pink-500' },
            { label: 'Awaiting Review', value: totals.review, accent: 'from-amber-400 to-orange-500' },
            { label: 'Approved', value: totals.approved, accent: 'from-emerald-400 to-teal-400' },
          ].map((card) => (
            <div key={card.label} className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <p className="font-tajawal text-xs uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
              <p className={`mt-4 text-4xl font-cairo font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.accent}`}>{card.value}</p>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">Create New Secure Project</p>
              <h2 className="mt-3 text-2xl font-bold text-white">Issue a new onboarding token</h2>
            </div>
            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
              Secure token lifecycle
            </div>
          </div>

          <form action={createOnboardingProjectAction} className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <label className="mb-2 block font-cairo text-sm font-semibold text-slate-200">Project Title</label>
              <input
                name="project_title"
                placeholder="Atlas Brand Launch"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
              />
            </div>
            <div>
              <label className="mb-2 block font-cairo text-sm font-semibold text-slate-200">Client Name</label>
              <input
                name="client_name"
                placeholder="AtlaHub Premium"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
              />
            </div>
            <button
              type="submit"
              className="col-span-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Create Secure Link
            </button>
          </form>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl">
          <div className="mb-6">
            <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">Live Token Registry</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Active Client Onboarding Sessions</h2>
          </div>

          <div className="space-y-4">
            {projects.map((project) => {
              const token = project.tokens?.find((t) => t.is_active) || project.tokens?.[0] || null;
              const filledSteps = [
                Boolean(project.submission?.step1_soul?.trim()),
                Boolean(project.submission?.step2_market?.trim()),
                Boolean(project.submission?.step3_visual?.trim()),
                Array.isArray(project.submission?.step4_media) && project.submission.step4_media.length > 0,
                Boolean(project.submission?.step5_summary?.trim()),
              ].filter(Boolean).length;
              const progress = Math.round((filledSteps / 5) * 100);

              return (
                <article key={project.id} className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-cairo text-xl font-semibold text-white">{project.title}</h3>
                        <TokenStatusBadge token={token} />
                      </div>
                      <p className="text-sm text-slate-400">Client: {project.client_name}</p>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Pipeline step: {project.status}</p>
                    </div>
                    <div className="space-y-2 text-right">
                      {token ? (
                        <p className="text-sm text-slate-300">
                          Link:{' '}
                          <Link href={`/${lang}/onboarding/${token.id}`} className="font-medium text-cyan-300 hover:text-cyan-100">
                            /{lang}/onboarding/{token.id}
                          </Link>
                        </p>
                      ) : null}
                      <p className="text-sm text-slate-400">Expires: {token ? formatUtcDate(token.expires_at) : 'N/A'}</p>
                      <p className="text-sm text-slate-400">Progress: {progress}%</p>
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" style={{ width: `${progress}%` }} />
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <form action={revokeOnboardingTokenAction} className="col-span-1">
                      <input type="hidden" name="token" value={token?.id || ''} />
                      <button
                        type="submit"
                        disabled={!token}
                        className="w-full rounded-full bg-rose-500/90 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Revoke Token
                      </button>
                    </form>
                    <form action={extendOnboardingTokenAction} className="col-span-1">
                      <input type="hidden" name="token" value={token?.id || ''} />
                      <button
                        type="submit"
                        disabled={!token}
                        className="w-full rounded-full bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Extend 30 Days
                      </button>
                    </form>
                    <form action={regenerateOnboardingTokenAction} className="col-span-1">
                      <input type="hidden" name="token" value={token?.id || ''} />
                      <button
                        type="submit"
                        disabled={!token}
                        className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Regen Token
                      </button>
                    </form>
                    <form action={promoteOnboardingProject} className="col-span-1">
                      <input type="hidden" name="projectId" value={project.id} />
                      <button
                        type="submit"
                        className="w-full rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                      >
                        Promote to Portfolio
                      </button>
                    </form>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
