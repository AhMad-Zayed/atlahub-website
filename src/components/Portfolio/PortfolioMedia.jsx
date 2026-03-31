'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { isRemoteUrl } from './portfolioMedia';

export default function PortfolioMedia({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '100vw',
  showVideoHint = false,
  fallbackLabel,
}) {
  if (!src) {
    return (
      <div
        className={`flex h-full w-full items-end justify-start bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.28),transparent_45%),linear-gradient(145deg,rgba(15,23,42,1),rgba(8,17,29,1),rgba(14,25,43,1))] p-6 ${className}`}
      >
        <div className="max-w-[14rem] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.34em] text-slate-300/70">AtlaHub Tech</p>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-100">
            {fallbackLabel || alt}
          </p>
        </div>
      </div>
    );
  }

  const overlay = showVideoHint ? (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <Play className="h-6 w-6 fill-current" />
      </div>
    </div>
  ) : null;

  if (isRemoteUrl(src)) {
    return (
      <>
        <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} loading={priority ? 'eager' : 'lazy'} />
        {overlay}
      </>
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
      {overlay}
    </>
  );
}
