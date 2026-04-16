'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/UI/Button';
import { motion } from 'framer-motion';

export default function Academy({ data }) {
  const [mounted, setMounted] = useState(false);
  const feature = data?.feature;

  useEffect(() => {
    setMounted(true);
  }, []);

  const MotionContainer = mounted ? motion.div : 'div';
  const motionProps = mounted
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      }
    : {};

  return (
    <section id="training" className="relative overflow-hidden bg-[#08111d] py-24 text-white md:py-32">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ef4444] via-[#ec4899] via-[#f97316] to-[#22d3ee]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(239,68,68,0.16),transparent_26%),radial-gradient(circle_at_82%_14%,rgba(236,72,153,0.18),transparent_22%),radial-gradient(circle_at_72%_78%,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,rgba(8,17,29,0.72),rgba(8,17,29,0.92))]" />

      <MotionContainer
        {...motionProps}
        className="container relative z-10 mx-auto px-6 text-start"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 font-tajawal text-xs font-semibold uppercase tracking-[0.4em] text-slate-100">
              {data.badge}
            </span>
            <h2 className="mt-6 font-cairo text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {data.headline}
            </h2>
            <p className="mt-5 max-w-2xl font-tajawal text-base leading-8 text-slate-200">
              {data.description}
            </p>

            {feature && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-start">
                <p className="font-tajawal text-xs font-semibold uppercase tracking-[0.36em] text-slate-300/70">
                  {feature.subtitle}
                </p>
                <h3 className="mt-3 font-cairo text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-4 font-tajawal text-sm leading-7 text-slate-200">
                  {feature.description}
                </p>
                {feature.chips?.length ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {feature.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-tajawal text-xs uppercase tracking-[0.2em] text-slate-100"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            )}

            <div className="mt-10">
              <Button variant="outline">{data.cta}</Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[2.6rem] border border-white/20 bg-[#0b1424] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                <div className="absolute left-1/2 top-3 h-2 w-16 -translate-x-1/2 rounded-full bg-white/15" />
                <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] border border-white/10 bg-[#0d1829]">
                  {feature?.image && (
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 60vw, 320px"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08111d]/85 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-4 pb-5 text-center">
                    <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-white/70">
                      {feature?.label}
                    </p>
                    <p className="mt-2 font-tajawal text-sm font-semibold text-white">
                      {feature?.caption}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center font-tajawal text-xs uppercase tracking-[0.4em] text-slate-300/70">
                {feature?.footnote}
              </div>
            </div>
          </div>
        </div>
      </MotionContainer>
    </section>
  );
}
