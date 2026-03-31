'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PortfolioCard from '@/components/Portfolio/PortfolioCard';

export default function Portfolio({ data, lang = 'en' }) {
  const [mounted, setMounted] = useState(false);
  const items = data?.list || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="portfolio" className="relative overflow-hidden bg-[#08111d] py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_58%)]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-5 font-[family-name:var(--font-inter)] text-[0.72rem] uppercase tracking-[0.42em] text-white/55">
            {data?.headline}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl italic tracking-tight text-white md:text-5xl">
            {data?.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-200">
            {data?.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              href={`/${lang}/portfolio/${item.id}`}
              projectsLabel={data?.projectsLabel}
              viewCategory={data?.viewCategory}
              videoLabel={data?.videoLabel}
              mounted={mounted}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={`/${lang}/portfolio`}
            className="inline-flex items-center gap-3 rounded-full border border-white/14 px-6 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
          >
            <span>{data?.viewPortfolio}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
