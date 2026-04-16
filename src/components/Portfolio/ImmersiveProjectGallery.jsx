'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from 'lucide-react';
import PortfolioMedia from './PortfolioMedia';
import { buildProjectMediaItems } from './portfolioMedia';
import { getPortfolioTheme } from './portfolioTheme';

function wrapIndex(index, total) {
  if (!total) return 0;
  return (index + total) % total;
}

function GalleryControl({ onClick, label, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#09111e]/80 text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-white/35 hover:bg-[#09111e] hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

function StudioFrame({ item, projectName }) {
  return (
    <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,#172033_0%,#0b1120_100%)] shadow-[0_32px_90px_rgba(2,6,23,0.2)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="font-cairo text-lg font-semibold text-white">{item.label || projectName}</p>
          <p className="mt-1 font-tajawal text-sm text-slate-300">{item.linkType}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-tajawal text-xs uppercase tracking-[0.28em] text-slate-300">
          <Play className="h-3 w-3 fill-current" />
          <span>Studio</span>
        </div>
      </div>
      <div className="p-4">
        <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#0d1627] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="aspect-video bg-black">
            <iframe
              src={item.embedUrl}
              title={item.title}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImmersiveProjectGallery({ project, labels, themeId }) {
  const mediaItems = useMemo(() => buildProjectMediaItems(project), [project]);
  const theme = getPortfolioTheme(themeId);
  const imageItems = mediaItems.filter((item) => item.type === 'image');
  const videoItems = mediaItems.filter((item) => item.type === 'video');
  const [activeIndex, setActiveIndex] = useState(null);
  const activeImage = activeIndex === null ? null : imageItems[activeIndex];
  const projectKey = `${themeId}-${project.name}`.replace(/\s+/g, '-').toLowerCase();

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((currentIndex) => wrapIndex((currentIndex ?? 0) + 1, imageItems.length));
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((currentIndex) => wrapIndex((currentIndex ?? 0) - 1, imageItems.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, imageItems.length]);

  return (
    <div className="space-y-8">
      {imageItems.length ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-cairo text-2xl font-semibold text-slate-950">{labels.visualStack}</h3>
            <div className={`rounded-full bg-gradient-to-r px-4 py-1.5 font-tajawal text-sm text-white ${theme.accent}`}>
              {imageItems.length} {labels.imageFrames}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {imageItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group block h-full w-full text-start"
              >
                <motion.div
                  layoutId={`case-study-${projectKey}-${item.id}`}
                  className="flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <div className={`flex min-h-[15rem] flex-1 items-center justify-center rounded-[1.35rem] bg-gradient-to-br ${theme.surface} p-5`}>
                    <PortfolioMedia
                      src={item.src}
                      alt={item.title}
                      fit="contain"
                      fill={false}
                      className="max-h-[22rem] rounded-[1rem] object-contain"
                    />
                  </div>
                </motion.div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {videoItems.length ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-cairo text-2xl font-semibold text-slate-950">{labels.screenings}</h3>
            <div className="rounded-full border border-slate-200 bg-white px-4 py-1.5 font-tajawal text-sm text-slate-600">
              {videoItems.length} {labels.videoLabel}
            </div>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            {videoItems.map((item) => (
              <StudioFrame key={item.id} item={item} projectName={project.name} />
            ))}
          </div>
        </div>
      ) : null}

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute inset-0 bg-[rgba(5,10,20,0.82)] backdrop-blur-2xl"
              aria-label={labels.closeGallery}
            />

            <div className="relative z-10 flex w-full max-w-7xl items-center gap-4">
              {imageItems.length > 1 ? (
                <GalleryControl onClick={() => setActiveIndex((currentIndex) => wrapIndex((currentIndex ?? 0) - 1, imageItems.length))} label={labels.previousMedia} className="hidden md:inline-flex">
                  <ChevronLeft className="h-5 w-5" />
                </GalleryControl>
              ) : null}

              <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#09111e] shadow-[0_40px_180px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                  <div>
                    <p className="font-cairo text-xl font-semibold text-white">{project.name}</p>
                    <p className="mt-1 font-tajawal text-sm text-slate-300">{labels.visualReview}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {project.links?.length ? (
                      project.links
                        .filter((linkItem) => linkItem.type === 'website')
                        .map((linkItem) => (
                          <a
                            key={linkItem.url}
                            href={linkItem.url}
                            target="_blank"
                            rel="noreferrer"
                            className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-tajawal text-sm text-slate-200 transition-colors duration-300 hover:border-white/30 hover:text-white md:inline-flex"
                          >
                            <span>{linkItem.label}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ))
                    ) : null}
                    <GalleryControl onClick={() => setActiveIndex(null)} label={labels.closeGallery}>
                      <X className="h-5 w-5" />
                    </GalleryControl>
                  </div>
                </div>

                <div className="max-h-[82vh] overflow-auto bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_28%),linear-gradient(180deg,#0b1120_0%,#09111e_100%)] p-4 md:p-8">
                  <motion.div
                    layoutId={`case-study-${projectKey}-${activeImage.id}`}
                    className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.25)]"
                  >
                    <div className={`flex min-h-[50vh] items-center justify-center rounded-[1.35rem] bg-gradient-to-br ${theme.surface} p-4 md:p-8`}>
                      <PortfolioMedia
                        src={activeImage.src}
                        alt={activeImage.title}
                        fit="contain"
                        fill={false}
                        className="mx-auto max-h-[70vh] w-full rounded-[1rem] object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                </div>

                {imageItems.length > 1 ? (
                  <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
                    <GalleryControl onClick={() => setActiveIndex((currentIndex) => wrapIndex((currentIndex ?? 0) - 1, imageItems.length))} label={labels.previousMedia} className="md:hidden">
                      <ChevronLeft className="h-5 w-5" />
                    </GalleryControl>
                    <div className="mx-auto flex items-center gap-2">
                      {imageItems.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          aria-label={`${labels.openMedia} ${index + 1}`}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            index === activeIndex ? 'w-10 bg-white' : 'w-2.5 bg-white/25 hover:bg-white/45'
                          }`}
                        />
                      ))}
                    </div>
                    <GalleryControl onClick={() => setActiveIndex((currentIndex) => wrapIndex((currentIndex ?? 0) + 1, imageItems.length))} label={labels.nextMedia} className="md:hidden">
                      <ChevronRight className="h-5 w-5" />
                    </GalleryControl>
                  </div>
                ) : null}
              </div>

              {imageItems.length > 1 ? (
                <GalleryControl onClick={() => setActiveIndex((currentIndex) => wrapIndex((currentIndex ?? 0) + 1, imageItems.length))} label={labels.nextMedia} className="hidden md:inline-flex">
                  <ChevronRight className="h-5 w-5" />
                </GalleryControl>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
