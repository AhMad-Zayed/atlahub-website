'use client';

import { useEffect, useState } from 'react';
import { createProjectAction } from '@/lib/actions/onboarding';

export default function CreateEliteProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [localePrefix, setLocalePrefix] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const pathParts = window.location.pathname.split('/');
    const maybeLang = pathParts[1];
    setLocalePrefix(maybeLang === 'en' || maybeLang === 'ar' ? `/${maybeLang}` : '');
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const response = await createProjectAction(clientName, projectTitle);
    setIsSubmitting(false);

    if (!response.success) {
      setError(response.error || 'Unable to generate the onboarding link.');
      return;
    }

    setResult(response);
    setProjectTitle('');
    setClientName('');
    setIsOpen(false);
  };

  const copyLink = async () => {
    if (!result?.tokenId || typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${localePrefix}/onboarding/${result.tokenId}`);
    } catch {
      // silently ignore copy failures
    }
  };

  return (
    <div className="inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
      >
        Create Elite Project
      </button>

      {result ? (
        <div className="mt-4 rounded-[1.6rem] border border-cyan-400/20 bg-slate-900/90 p-4 text-slate-100 shadow-[0_20px_60px_rgba(2,8,24,0.35)]">
          <p className="text-sm text-slate-400">Secure onboarding link created successfully.</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={`${localePrefix}/onboarding/${result.tokenId}`}
              className="break-all text-base font-semibold text-cyan-300 hover:text-cyan-100"
            >
              {localePrefix || ''}/onboarding/{result.tokenId}
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Copy Link
            </button>
          </div>
        </div>
      ) : null}

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_120px_rgba(2,8,24,0.8)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">Secure Launch</p>
                <h2 className="mt-3 text-3xl font-cairo font-bold text-white">Create Elite Client Onboarding</h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-slate-400 transition hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
              <label className="space-y-3 text-sm text-slate-200">
                <span className="block font-semibold">Client Name</span>
                <input
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  placeholder="Coffee House"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                />
              </label>

              <label className="space-y-3 text-sm text-slate-200">
                <span className="block font-semibold">Project Title</span>
                <input
                  value={projectTitle}
                  onChange={(event) => setProjectTitle(event.target.value)}
                  placeholder="Coffee House Brand Experience"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                />
              </label>

              {error ? <p className="text-sm text-rose-400">{error}</p> : null}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-60"
                >
                  {isSubmitting ? 'Creating...' : 'Generate Secure Link'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
