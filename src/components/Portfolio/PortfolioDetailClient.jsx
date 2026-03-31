'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Play } from 'lucide-react';
import PortfolioMedia from './PortfolioMedia';
import PortfolioVideoModal from './PortfolioVideoModal';
import {
  getFirstVideoLink,
  getProjectPrimaryMedia,
  getVideoEmbedUrl,
  getVideoThumbnail,
} from './portfolioMedia';

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

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

function MotionShell({ mounted, variants, children, className = '' }) {
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

function ProjectGallery({ images = [], projectName }) {
  if (!images.length) return null;

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-3">
      {images.map((image, imageIndex) => (
        <div
          key={`${projectName}-${imageIndex}`}
          className="group relative aspect-square overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03]"
        >
          <PortfolioMedia
            src={image}
            alt={`${projectName} gallery ${imageIndex + 1}`}
            className="transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 22vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.2)_40%,rgba(2,6,23,0.72))]" />
        </div>
      ))}
    </div>
  );
}

export default function PortfolioDetailClient({ lang = 'en', item, detail, labels }) {
  const [mounted, setMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const isArabic = lang === 'ar';
  const BackIcon = isArabic ? ArrowRight : ArrowLeft;

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
    <section className="relative overflow-hidden bg-[#08111d] py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,29,0),rgba(8,17,29,0.08)_30%,rgba(8,17,29,0.4))]" />

      <div className="container relative z-10 mx-auto px-6">
        <MotionShell mounted={mounted} variants={sectionVariants}>
          <Link
            href={`/${lang}/portfolio`}
            className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-100/80 transition-all duration-300 hover:border-brand-blue/40 hover:bg-white/[0.06] hover:text-white"
          >
            <BackIcon className="h-4 w-4" />
            <span>{labels.backToPortfolio}</span>
          </Link>
        </MotionShell>

        <MotionShell mounted={mounted} variants={sectionVariants}>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-6 text-start">
              <p className="font-[family-name:var(--font-inter)] text-[0.72rem] uppercase tracking-[0.42em] text-slate-300/55">
                {labels.portfolioLabel}
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl italic tracking-tight text-slate-100 md:text-6xl">
                {detail.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-100/85 md:text-lg">
                {detail.subtitle}
              </p>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-slate-100/80">
                <span>{labels.projectsLabel}</span>
                <span className="text-slate-100">{item.projectCount}</span>
              </div>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
              <PortfolioMedia
                src={heroMedia}
                alt={item.title}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                fallbackLabel={detail.subtitle}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,29,0.05),rgba(8,17,29,0.18)_35%,rgba(8,17,29,0.82))]" />
              <div className="absolute inset-[14px] rounded-[1.55rem] border border-white/10 bg-white/[0.02] backdrop-blur-[2px]" />
            </div>
          </div>
        </MotionShell>

        <MotionShell mounted={mounted} variants={listVariants} className="mt-16 grid gap-6">
          {detail.projects.map((project) => {
            const primaryMedia = getProjectPrimaryMedia(project);
            const videoLinks = (project.links || []).filter(
              (link) => link.type === 'youtube' || link.type === 'facebook',
            );
            const externalLinks = (project.links || []).filter(
              (link) => link.type !== 'youtube' && link.type !== 'facebook',
            );
            const previewVideo = getFirstVideoLink(project.links);
            const previewThumbnail =
              !project.image && previewVideo
                ? getVideoThumbnail(previewVideo.url, previewVideo.type)
                : null;

            return (
              <motion.article
                key={project.name}
                variants={itemVariants}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-[0_30px_100px_rgba(2,6,23,0.28)]"
              >
                <div className="grid gap-px bg-white/10 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative aspect-video bg-[#0c1422] lg:aspect-auto lg:min-h-[28rem]">
                    <PortfolioMedia
                      src={primaryMedia}
                      alt={project.name}
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="transition-transform duration-700 hover:scale-105"
                      showVideoHint={!project.image && !!previewThumbnail}
                      fallbackLabel={project.result}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.16)_40%,rgba(2,6,23,0.84))]" />

                    {previewVideo ? (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveVideo({
                            title: project.name,
                            embedUrl: getVideoEmbedUrl(previewVideo.url, previewVideo.type),
                          })
                        }
                        className="absolute bottom-4 start-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-100 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/50 hover:bg-black/50 hover:text-white"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>{labels.playVideo}</span>
                      </button>
                    ) : null}
                  </div>

                  <div className="bg-[#0a1019] p-7 text-start md:p-10">
                    <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic tracking-tight text-slate-100">
                      {project.name}
                    </h2>

                    <dl className="mt-8 space-y-6">
                      <div>
                        <dt className="mb-2 font-[family-name:var(--font-inter)] text-[0.68rem] uppercase tracking-[0.36em] text-slate-300/55">
                          {labels.role}
                        </dt>
                        <dd className="text-sm leading-7 text-slate-100/88 md:text-base">
                          {project.role}
                        </dd>
                      </div>
                      <div>
                        <dt className="mb-2 font-[family-name:var(--font-inter)] text-[0.68rem] uppercase tracking-[0.36em] text-slate-300/55">
                          {labels.action}
                        </dt>
                        <dd className="text-sm leading-7 text-slate-100/88 md:text-base">
                          {project.action}
                        </dd>
                      </div>
                      <div>
                        <dt className="mb-2 font-[family-name:var(--font-inter)] text-[0.68rem] uppercase tracking-[0.36em] text-slate-300/55">
                          {labels.result}
                        </dt>
                        <dd className="text-sm leading-7 text-slate-100 md:text-base">
                          {project.result}
                        </dd>
                      </div>

                      {videoLinks.length ? (
                        <div>
                          <dt className="mb-3 font-[family-name:var(--font-inter)] text-[0.68rem] uppercase tracking-[0.36em] text-slate-300/55">
                            {labels.screenings}
                          </dt>
                          <dd className="flex flex-wrap gap-3 text-sm">
                            {videoLinks.map((linkItem, videoIndex) => (
                              <button
                                key={linkItem.url}
                                type="button"
                                onClick={() =>
                                  setActiveVideo({
                                    title: `${project.name} ${videoIndex + 1}`,
                                    embedUrl: getVideoEmbedUrl(linkItem.url, linkItem.type),
                                  })
                                }
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-100 transition-all duration-300 hover:border-brand-blue/50 hover:bg-white/[0.07]"
                              >
                                <Play className="h-3 w-3 fill-current" />
                                <span>{linkItem.label}</span>
                              </button>
                            ))}
                          </dd>
                        </div>
                      ) : null}

                      {externalLinks.length ? (
                        <div>
                          <dt className="mb-3 font-[family-name:var(--font-inter)] text-[0.68rem] uppercase tracking-[0.36em] text-slate-300/55">
                            {labels.references}
                          </dt>
                          <dd className="flex flex-wrap gap-3 text-sm">
                            {externalLinks.map((linkItem) => (
                              <a
                                key={linkItem.url}
                                href={linkItem.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-100 transition-all duration-300 hover:border-brand-blue/50 hover:bg-white/[0.07]"
                              >
                                <span>{linkItem.label}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </dd>
                        </div>
                      ) : null}
                    </dl>

                    <ProjectGallery images={project.gallery} projectName={project.name} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </MotionShell>
      </div>

      {mounted ? (
        <PortfolioVideoModal
          open={!!activeVideo?.embedUrl}
          onClose={() => setActiveVideo(null)}
          title={activeVideo?.title || labels.videoPreview}
          embedUrl={activeVideo?.embedUrl || null}
        />
      ) : null}
    </section>
  );
}
