'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import PortfolioMedia from './PortfolioMedia';
import { getPortfolioTheme } from './portfolioTheme';

/**
 * PortfolioCard — opens a full-screen lightbox on ONE click.
 * No navigation to a separate page is needed for the image view.
 * The lightbox shows the full uncropped image + project details.
 */
export default function PortfolioCard({
  item,
  href,
  projectsLabel,
  viewCategory,
  videoLabel,
  mounted,
  index = 0,
  // Pass the full details object so we can show it in the lightbox
  details,
  lang = 'en',
}) {
  const theme = getPortfolioTheme(item.id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(0);

  // Collect all gallery images from the details projects
  const allImages = [];
  if (details?.projects) {
    details.projects.forEach((p) => {
      if (p.gallery) allImages.push(...p.gallery);
      else if (p.image) allImages.push(p.image);
    });
  }
  // Fallback to the card thumbnail
  if (allImages.length === 0 && item.image) allImages.push(item.image);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxImg((i) => (i + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setLightboxImg((i) => (i - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, allImages.length]);

  const openLightbox = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxImg(0);
    setLightboxOpen(true);
  };

  const cardBody = (
    <button
      type="button"
      onClick={openLightbox}
      aria-label={`View ${item.title} portfolio`}
      className={`group relative block w-full break-inside-avoid overflow-hidden rounded-[2rem] border bg-[rgba(9,17,30,0.78)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.005] text-start cursor-pointer ${theme.ring} ${theme.glow}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.accent}`} />

      <div className={`relative overflow-hidden aspect-[16/10] border-b border-white/10 bg-gradient-to-br ${theme.surface} ${theme.frame}`}>
        {item.image ? (
          <PortfolioMedia
            src={item.image}
            alt={item.title}
            className="p-5 transition-transform duration-700 group-hover:scale-[1.05] object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={index < 2}
            showVideoHint={item.hasVideo}
            fallbackLabel={item.summary}
            fit="cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B0F19]/80 overflow-hidden p-6 text-center">
            <div className="absolute w-40 h-40 bg-brand-pink/20 rounded-full blur-[3rem]" />
            <div className="absolute w-40 h-40 bg-brand-azure/20 rounded-full blur-[3rem] translate-x-12 translate-y-12" />
            <div className="relative z-10 h-12 w-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 flex items-center justify-center shadow-[0_0_15px_rgba(255,140,0,0.2)]">
              <span className="text-brand-orange text-xl font-bold">A</span>
            </div>
            <span className="relative z-10 font-cairo text-sm font-bold tracking-[0.2em] text-white/40 uppercase">{projectsLabel}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0)_26%,rgba(9,17,30,0.18)_74%,rgba(9,17,30,0.38))]" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-[14px] rounded-[1.45rem] border border-white/50 bg-white/15 backdrop-blur-sm" />
        </div>
        {item.hasVideo ? (
          <div className={`absolute start-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] backdrop-blur-md ${theme.chip}`}>
            <Play className="h-3 w-3 fill-current" />
            <span>{videoLabel}</span>
          </div>
        ) : null}
        {/* Zoom hint overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-semibold flex items-center gap-2">
            <span>🔍</span>
            <span>{lang === 'ar' ? 'عرض الصور' : 'View Images'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-7 text-start">
        <div className="flex items-center justify-between gap-4">
          <span className="font-tajawal text-[0.72rem] uppercase tracking-[0.35em] text-slate-300/85">
            {projectsLabel}
          </span>
          <span className={`rounded-full px-3 py-1 text-sm ${theme.chip}`}>{item.projectCount}</span>
        </div>

        <div className="space-y-3">
          <h3 className="font-cairo text-3xl font-semibold tracking-tight text-white">
            {item.title}
          </h3>
          <p className="max-w-xl font-tajawal text-base leading-7 text-slate-200">
            {item.summary}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-3 font-tajawal text-sm font-medium text-slate-100 transition-colors duration-300 group-hover:text-white">
          <span>{lang === 'ar' ? 'عرض الصور' : 'View Gallery'}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </button>
  );

  return (
    <>
      {/* Card */}
      {!mounted ? (
        <div className="mb-6">{cardBody}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.55, delay: index * 0.06 }}
          className="mb-6"
        >
          {cardBody}
        </motion.div>
      )}

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-lg"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h2 className="font-cairo text-xl font-bold text-white">{item.title}</h2>
                {allImages.length > 1 && (
                  <p className="text-sm text-slate-400 font-tajawal">
                    {lightboxImg + 1} / {allImages.length}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {/* Link to full detail page */}
                <a
                  href={href}
                  className="flex items-center gap-1.5 text-sm text-brand-blue-light hover:text-white transition-colors font-tajawal"
                  onClick={(e) => e.stopPropagation()}
                >
                  {lang === 'ar' ? 'صفحة المشروع' : 'Full Details'}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Image area */}
            <div
              className="relative flex-1 flex items-center justify-center p-4 md:p-8 min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={allImages[lightboxImg]}
                  src={allImages[lightboxImg]}
                  alt={`${item.title} — image ${lightboxImg + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-2xl select-none"
                  draggable={false}
                />
              </AnimatePresence>

              {/* Prev / Next arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setLightboxImg((i) => (i - 1 + allImages.length) % allImages.length)}
                    className="absolute start-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxImg((i) => (i + 1) % allImages.length)}
                    className="absolute end-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div
                className="flex gap-2 px-6 py-4 overflow-x-auto border-t border-white/10 flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {allImages.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setLightboxImg(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === lightboxImg ? 'border-brand-blue-light opacity-100 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
