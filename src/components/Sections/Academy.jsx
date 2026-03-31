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
    <section id="academy" className="relative overflow-hidden bg-[#08111d] py-24 text-white md:py-32">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue to-brand-blue-light" />
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_58%)]" />

      <MotionContainer
        {...motionProps}
        className="container relative z-10 mx-auto px-6 text-start"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-brand-blue/40 bg-brand-blue/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-brand-blue-light">
              {data.badge}
            </span>
            <h2 className="mt-6 font-[family-name:var(--font-playfair)] text-4xl italic tracking-tight text-white md:text-5xl">
              {data.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
              {data.description}
            </p>

            {feature && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-start">
                <p className="text-xs font-semibold uppercase tracking-[0.36em] text-white/45">
                  {feature.subtitle}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  {feature.description}
                </p>
                {feature.chips?.length ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {feature.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70"
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
                    <p className="text-xs uppercase tracking-[0.35em] text-white/55">
                      {feature?.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {feature?.caption}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center text-xs uppercase tracking-[0.4em] text-white/40">
                {feature?.footnote}
              </div>
            </div>
          </div>
        </div>
      </MotionContainer>
    </section>
  );
}
