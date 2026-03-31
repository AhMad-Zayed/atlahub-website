import Link from 'next/link';
import { notFound } from 'next/navigation';
import content from '@/data/content.json';

export default async function ServiceDetailPage({ params }) {
  const { lang, id } = await params;
  const pageContent = content[lang] || content.en;
  const serviceOverview = pageContent.services?.list?.find((item) => item.id === id);
  const serviceDetail = pageContent.serviceDetails?.[id];

  if (!serviceOverview || !serviceDetail) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-gray-950 text-white">
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-6 py-20">
          <Link
            href={`/${lang}#services`}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue-light transition-colors hover:text-white"
          >
            <span>{lang === 'ar' ? 'العودة إلى الخدمات' : 'Back to Services'}</span>
          </Link>

          <div className="mt-10 max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-blue-light">
              {lang === 'ar' ? 'حلول متخصصة' : 'Specialized Service'}
            </p>
            <h1 className="mt-4 font-cairo text-4xl font-bold tracking-tight md:text-6xl">
              {serviceDetail.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              {serviceDetail.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-10">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-cairo text-2xl font-bold">
                {lang === 'ar' ? 'القيمة العملية' : 'Value Proposition'}
              </h2>
              <p className="mt-4 text-base leading-8 text-gray-300">
                {serviceDetail.valueProposition}
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-cairo text-2xl font-bold">
                {lang === 'ar' ? 'النطاق التقني' : 'Technical Scope'}
              </h2>
              <ul className="mt-6 space-y-4">
                {serviceDetail.technicalScope.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-blue-light"></span>
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-10">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-cairo text-2xl font-bold">
                {lang === 'ar' ? 'آلية التنفيذ' : 'Process'}
              </h2>
              <ol className="mt-6 space-y-5">
                {serviceDetail.process.map((step, index) => (
                  <li key={step} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue-light">
                      {lang === 'ar' ? `المرحلة ${index + 1}` : `Step ${index + 1}`}
                    </p>
                    <p className="mt-3 leading-7 text-gray-300">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-cairo text-2xl font-bold">
                {lang === 'ar' ? 'لماذا أتلا هاب تك' : 'Why AtlaHub Tech'}
              </h2>
              <p className="mt-4 leading-8 text-gray-300">{serviceDetail.whyUs}</p>
            </section>

            <section className="rounded-3xl border border-brand-blue/20 bg-brand-blue/10 p-8">
              <p className="text-sm uppercase tracking-[0.25em] text-brand-blue-light">
                {lang === 'ar' ? 'الخدمة المختارة' : 'Selected Service'}
              </p>
              <h3 className="mt-3 font-cairo text-2xl font-bold">{serviceOverview.title}</h3>
              <p className="mt-4 leading-7 text-gray-200">{serviceOverview.description}</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
