'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import PortfolioMedia from './PortfolioMedia';
import { getPortfolioTheme } from './portfolioTheme';

export default function PortfolioCard({
  item,
  href,
  projectsLabel,
  viewCategory,
  videoLabel,
  mounted,
  index = 0,
}) {
  const theme = getPortfolioTheme(item.id);

  const cardBody = (
    <Link
      href={href}
      className={`group relative block break-inside-avoid overflow-hidden rounded-[2rem] border bg-[rgba(9,17,30,0.78)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.005] ${theme.ring} ${theme.glow}`}
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
            <div className="relative z-10 h-12 w-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 flex items-center justify-center shadow-[0_0_15px_rgba(255,140,0,0.2)]"><span className="text-brand-orange text-xl font-bold">A</span></div>
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
          <span>{viewCategory}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );

  if (!mounted) {
    return <div className="mb-6">{cardBody}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="mb-6"
    >
      {cardBody}
    </motion.div>
  );
}
