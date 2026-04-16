import Link from 'next/link';

export const dynamic = 'force-dynamic';

const LOCALIZED = {
  en: {
    title: 'Invalid Secure Onboarding Link',
    description: 'This onboarding portal is protected by a secure token. The link you used is expired, invalid, or deactivated.',
    help: 'Request a fresh link from your AtlaHub liaison to continue the elite onboarding experience.',
    button: 'Return to Home',
  },
  ar: {
    title: 'رابط التهيئة غير صالح',
    description: 'هذه البوابة محمية برمز آمن. الرابط الذي استخدمته منتهي الصلاحية أو غير صالح أو تم تعطيله.',
    help: 'اطلب رابطًا جديدًا من فريق AtlaHub للاستمرار في تجربة التهيئة الراقية.',
    button: 'العودة إلى الصفحة الرئيسية',
  },
};

export default function LocalizedAccessDeniedPage({ params }) {
  const locale = String(params?.lang || 'en').startsWith('ar') ? 'ar' : 'en';
  const labels = LOCALIZED[locale];

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="font-tajawal text-sm uppercase tracking-[0.35em] text-cyan-300">AtlaHub Secure Portal</p>
          <h2 className="mt-4 text-5xl font-cairo font-bold text-white">{labels.title}</h2>
          <p className="mt-4 text-base leading-8 text-slate-400">{labels.description}</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-[0_40px_120px_rgba(2,8,24,0.65)] backdrop-blur-xl">
          <p className="text-slate-300 leading-8">{labels.help}</p>
          <Link href={`/${params?.lang || 'en'}`} className="mt-8 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            {labels.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
