'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import PortfolioMedia from './PortfolioMedia';

export default function PortfolioCard({
  item,
  href,
  projectsLabel,
  viewCategory,
  videoLabel,
  mounted,
  index = 0,
}) {
  const cardBody = (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(2,6,23,0.28)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-brand-blue/50 hover:bg-white/[0.07] hover:shadow-[0_34px_120px_rgba(14,165,233,0.14)]"
    >
      <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-white/[0.02]">
        <PortfolioMedia
          src={item.image || null}
          alt={item.title}
          className="transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={index < 2}
          showVideoHint={item.hasVideo}
          fallbackLabel={item.summary}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05),rgba(2,6,23,0.18)_40%,rgba(2,6,23,0.84))]" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-[12px] rounded-[1.4rem] border border-white/12 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md" />
        </div>
        {item.hasVideo ? (
          <div className="absolute start-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-100 backdrop-blur-md">
            <Play className="h-3 w-3 fill-current" />
            <span>{videoLabel}</span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-7 text-start">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[0.7rem] uppercase tracking-[0.35em] text-slate-300/65">
            {projectsLabel}
          </span>
          <span className="text-sm text-slate-100">{item.projectCount}</span>
        </div>

        <div className="space-y-3">
          <h3 className="font-[family-name:var(--font-playfair)] text-3xl italic tracking-tight text-slate-100">
            {item.title}
          </h3>
          <p className="max-w-xl text-sm leading-7 text-slate-100/88">
            {item.summary}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-3 text-sm font-medium text-slate-100 transition-colors duration-300 group-hover:text-white">
          <span>{viewCategory}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );

  if (!mounted) {
    return <div className="h-full">{cardBody}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="h-full"
    >
      {cardBody}
    </motion.div>
  );
}
