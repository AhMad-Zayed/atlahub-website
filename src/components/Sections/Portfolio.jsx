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
    <section
      id="portfolio"
      data-analytics-section="portfolio"
      className="relative overflow-hidden bg-[#09111e] py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(249,115,22,0.22),transparent_24%),radial-gradient(circle_at_83%_12%,rgba(244,63,94,0.18),transparent_22%),radial-gradient(circle_at_74%_72%,rgba(34,197,94,0.16),transparent_20%),radial-gradient(circle_at_24%_78%,rgba(14,165,233,0.18),transparent_22%),linear-gradient(180deg,#09111e_0%,#10203b_48%,#09111e_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%,rgba(8,15,29,0.24)_100%)]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-5 font-tajawal text-[0.78rem] uppercase tracking-[0.42em] text-slate-200/75">
            {data?.headline}
          </p>
          <h2 className="font-cairo text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {data?.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-tajawal text-lg leading-8 text-slate-200">
            {data?.subheadline}
          </p>
        </div>

        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
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
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-tajawal text-sm font-medium text-slate-100 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.16] hover:text-white"
          >
            <span>{data?.viewPortfolio}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
