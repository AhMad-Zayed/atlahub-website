const AccessDeniedCard = () => (
  <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-[0_40px_120px_rgba(2,8,24,0.65)] backdrop-blur-xl">
    <div className="mb-4 inline-flex rounded-full bg-rose-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-rose-300">
      Access Denied
    </div>
    <h1 className="text-4xl font-bold text-white">Secure onboarding access is required.</h1>
    <p className="mt-4 text-slate-300 leading-8">
      The link you followed is invalid, expired, or no longer active. For ultra-secure client projects, AtlaHub Tech only exposes onboarding portals through authenticated tokens.
    </p>
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
      <p className="font-semibold text-white">What you can do next</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
        <li>Ask your AtlaHub contact for a fresh onboarding link.</li>
        <li>Verify the link has not expired.</li>
        <li>Contact support at <span className="text-cyan-300">support@atlahub.tech</span>.</li>
      </ul>
    </div>
  </div>
);

export default function OnboardingAccessDeniedPage() {
  return (
    <div className="min-h-screen bg-[#020617] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="font-tajawal text-sm uppercase tracking-[0.35em] text-cyan-300">AtlaHub Tech Secure Portal</p>
          <h2 className="mt-4 text-5xl font-cairo font-bold text-white">Invalid Access Token</h2>
          <p className="mt-4 text-base leading-8 text-slate-400">
            This onboarding experience is protected by a one-time secure token. The current link cannot be used to continue.
          </p>
        </div>
        <AccessDeniedCard />
      </div>
    </div>
  );
}
