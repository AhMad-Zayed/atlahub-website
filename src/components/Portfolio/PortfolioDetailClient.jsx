'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import ImmersiveProjectGallery from './ImmersiveProjectGallery';
import PortfolioMedia from './PortfolioMedia';
import { getProjectPrimaryMedia } from './portfolioMedia';
import { getPortfolioTheme } from './portfolioTheme';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

function MotionShell({ mounted, children, className = '' }) {
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={sectionVariants} className={className}>
      {children}
    </motion.div>
  );
}

function CaseStudyMetric({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-white/15 bg-white/[0.08] p-5">
      <p className="font-tajawal text-xs uppercase tracking-[0.34em] text-slate-200/75">{label}</p>
      <p className="mt-3 font-cairo text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default function PortfolioDetailClient({ lang = 'en', item, detail, labels }) {
  const [mounted, setMounted] = useState(false);
  const isArabic = lang === 'ar';
  const BackIcon = isArabic ? ArrowRight : ArrowLeft;
  const theme = getPortfolioTheme(item.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroMedia = useMemo(() => {
    if (item?.image) return item.image;

    for (const project of detail?.projects || []) {
      const media = getProjectPrimaryMedia(project);
      if (media) return media;
    }

    return null;
  }, [detail?.projects, item?.image]);

  return (
    <section className="relative overflow-hidden bg-[#f5f8ff] py-20 text-slate-950 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_14%,rgba(249,115,22,0.12),transparent_18%),radial-gradient(circle_at_88%_10%,rgba(244,63,94,0.12),transparent_18%),radial-gradient(circle_at_80%_66%,rgba(16,185,129,0.12),transparent_16%),radial-gradient(circle_at_20%_82%,rgba(14,165,233,0.14),transparent_18%),linear-gradient(180deg,#f7fbff_0%,#eef5ff_48%,#f8fbff_100%)]" />

      <div className="container relative z-10 mx-auto px-6">
        <MotionShell mounted={mounted}>
          <Link
            href={`/${lang}/portfolio`}
            className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 font-tajawal text-sm text-slate-700 transition-all duration-300 hover:border-slate-300 hover:text-slate-950"
          >
            <BackIcon className="h-4 w-4" />
            <span>{labels.backToPortfolio}</span>
          </Link>
        </MotionShell>

        <MotionShell mounted={mounted} className="mt-8">
          <div className={`overflow-hidden rounded-[2.4rem] bg-gradient-to-br ${theme.accent} p-[1px] shadow-[0_35px_120px_rgba(15,23,42,0.14)]`}>
            <div className="grid gap-10 rounded-[2.35rem] bg-[linear-gradient(135deg,rgba(8,17,30,0.94),rgba(9,20,38,0.84))] p-8 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-6">
                <p className="font-tajawal text-[0.78rem] uppercase tracking-[0.42em] text-slate-200/80">
                  {labels.portfolioLabel}
                </p>
                <h1 className="font-cairo text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  {detail.title}
                </h1>
                <p className="max-w-2xl font-tajawal text-lg leading-8 text-slate-200">
                  {detail.subtitle}
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <CaseStudyMetric label={labels.projectsLabel} value={item.projectCount} />
                  <CaseStudyMetric label={labels.caseStudyLabel} value={detail.projects[0]?.name || detail.title} />
                  <CaseStudyMetric label={labels.sectorLabel} value={item.title} />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <div className="rounded-[1.6rem] bg-white/95 p-4">
                  <div className={`rounded-[1.35rem] bg-gradient-to-br ${theme.surface} p-5`}>
                    <PortfolioMedia
                      src={heroMedia}
                      alt={item.title}
                      fit="contain"
                      fill={false}
                      priority
                      className="max-h-[28rem] rounded-[1rem]"
                      fallbackLabel={detail.subtitle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionShell>

        <div className="mt-14 grid gap-8">
          {detail.projects.map((project, index) => {
            const externalLinks = (project.links || []).filter(
              (link) => link.type !== 'youtube' && link.type !== 'facebook',
            );

            return (
              <motion.article
                key={project.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                variants={itemVariants}
                data-analytics-section={`project:${project.name}`}
                className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_28px_110px_rgba(15,23,42,0.08)]"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${theme.accent}`} />
                <div className="grid gap-10 p-7 md:p-10 xl:grid-cols-[0.9fr_1.1fr]">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="font-tajawal text-[0.74rem] uppercase tracking-[0.4em] text-slate-500">
                        {labels.caseStudyLabel} {index + 1}
                      </p>
                      <h2 className="font-cairo text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                        {project.name}
                      </h2>
                    </div>

                    <div className="space-y-5">
                      <div className="rounded-[1.5rem] bg-slate-50 p-6" data-analytics-section={`project:${project.name}:role`}>
                        <p className="font-tajawal text-xs uppercase tracking-[0.34em] text-slate-500">{labels.role}</p>
                        <p className="mt-3 font-tajawal text-base leading-8 text-slate-700">{project.role}</p>
                      </div>
                      <div className="rounded-[1.5rem] bg-slate-50 p-6" data-analytics-section={`project:${project.name}:action`}>
                        <p className="font-tajawal text-xs uppercase tracking-[0.34em] text-slate-500">{labels.action}</p>
                        <p className="mt-3 font-tajawal text-base leading-8 text-slate-700">{project.action}</p>
                      </div>
                      <div className="rounded-[1.5rem] bg-slate-950 p-6" data-analytics-section={`project:${project.name}:result`}>
                        <p className="font-tajawal text-xs uppercase tracking-[0.34em] text-slate-300/75">{labels.result}</p>
                        <p className="mt-3 font-tajawal text-base leading-8 text-slate-200">{project.result}</p>
                      </div>
                    </div>

                    {externalLinks.length ? (
                      <div className="flex flex-wrap gap-3">
                        {externalLinks.map((linkItem) => (
                          <a
                            key={linkItem.url}
                            href={linkItem.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-tajawal text-sm text-slate-700 transition-all duration-300 hover:border-slate-300 hover:text-slate-950"
                          >
                            <span>{linkItem.label}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-[1.9rem] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-1" data-analytics-section={`project:${project.name}:gallery`}>
                    <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6">
                      <ImmersiveProjectGallery
                        project={project}
                        labels={labels}
                        themeId={item.id}
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
