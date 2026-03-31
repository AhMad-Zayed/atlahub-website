import Link from 'next/link';
import { notFound } from 'next/navigation';
import content from '@/data/content.json';
import { ArrowUpRight } from 'lucide-react';
import { getPortfolioCategoriesForService } from '@/components/Portfolio/portfolioSectors';

export default async function ServiceDetailPage({ params }) {
  const { lang, id } = await params;
  const pageContent = content[lang] || content.en;
  const serviceOverview = pageContent.services?.list?.find((item) => item.id === id);
  const serviceDetail = pageContent.serviceDetails?.[id];
  const categoryIds = getPortfolioCategoriesForService(id);
  const featuredCategories = categoryIds
    .map((categoryId) => {
      const category = pageContent.portfolio?.list?.find((entry) => entry.id === categoryId);
      const detail = pageContent.portfolio?.details?.[categoryId];

      if (!category || !detail) {
        return null;
      }

      return {
        ...category,
        detail,
      };
    })
    .filter(Boolean);

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
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
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
              <p className="mt-4 text-base leading-8 text-slate-200">
                {serviceDetail.valueProposition}
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-cairo text-2xl font-bold">
                {lang === 'ar' ? 'النطاق التقني' : 'Technical Scope'}
              </h2>
              <ul className="mt-6 space-y-4">
                {serviceDetail.technicalScope.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-200">
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
                    <p className="mt-3 leading-7 text-slate-200">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-cairo text-2xl font-bold">
                {lang === 'ar' ? 'لماذا أتلا هاب تك' : 'Why AtlaHub Tech'}
              </h2>
              <p className="mt-4 leading-8 text-slate-200">{serviceDetail.whyUs}</p>
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

        {featuredCategories.length ? (
          <section className="mt-16 border-t border-white/10 pt-16">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-blue-light">
                {lang === 'ar' ? 'أعمال مرتبطة' : 'Relevant Work'}
              </p>
              <h2 className="mt-4 font-cairo text-3xl font-bold md:text-4xl">
                {lang === 'ar' ? 'مشاريع بارزة في هذا القطاع' : 'Featured Projects in this Sector'}
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-200">
                {lang === 'ar'
                  ? 'نماذج مختارة من الأعمال المرتبطة مباشرة بهذا المسار الخدمي، مع تركيز على التنفيذ الفعلي والأثر التشغيلي.'
                  : 'Selected work directly tied to this service lane, focused on practical delivery and operational impact.'}
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {featuredCategories.map((category) => (
                <article
                  key={category.id}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(2,6,23,0.24)]"
                >
                  <div className="border-b border-white/10 px-7 py-6">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                          {category.title}
                        </p>
                        <h3 className="mt-3 font-cairo text-2xl font-bold text-white">
                          {category.detail.title}
                        </h3>
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-200">
                        {category.projectCount} {pageContent.portfolio.projectsLabel}
                      </span>
                    </div>
                    <p className="mt-4 max-w-2xl leading-8 text-slate-200">
                      {category.detail.subtitle}
                    </p>
                  </div>

                  <div className="space-y-5 px-7 py-6">
                    {category.detail.projects.map((project) => (
                      <div
                        key={project.name}
                        className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                      >
                        <h4 className="text-xl font-semibold text-white">{project.name}</h4>
                        <p className="mt-3 leading-7 text-slate-200">{project.result}</p>

                        {project.links?.length ? (
                          <div className="mt-4 flex flex-wrap gap-3">
                            {project.links
                              .filter((linkItem) => linkItem.type === 'website')
                              .map((linkItem) => (
                                <a
                                  key={linkItem.url}
                                  href={linkItem.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200 transition-all duration-300 hover:border-brand-blue/50 hover:bg-white/[0.07] hover:text-white"
                                >
                                  <span>{linkItem.label}</span>
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                              ))}
                          </div>
                        ) : null}
                      </div>
                    ))}

                    <Link
                      href={`/${lang}/portfolio/${category.id}`}
                      className="inline-flex items-center gap-3 rounded-full border border-white/14 px-5 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
                    >
                      <span>{lang === 'ar' ? 'عرض القسم' : 'View Category'}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
