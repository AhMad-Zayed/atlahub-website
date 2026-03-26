'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import content from '@/data/content.json';

export default function Founder({ lang = 'en' }) {
  const data = content[lang]?.founder || content.en.founder;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(data.image) && !imageFailed;

  return (
    <section id="about" className="relative py-32 bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-tech-pattern pointer-events-none"></div>
      <div className="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-blue-light"></div>
      <div className="absolute -bottom-40 -start-40 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-cairo text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-lg text-gray-400 font-tajawal leading-relaxed mb-8">
            {data.story}
          </p>
          <div className="inline-block px-6 py-3 bg-brand-blue/10 border border-brand-blue/30 rounded-lg shadow-[0_0_15px_rgba(0,170,255,0.15)]">
            <p className="text-brand-blue-light font-bold font-cairo uppercase tracking-wide">
              {data.badge}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
        >
          {showImage ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/40 to-transparent z-10"></div>
              <img
                src={data.image}
                alt={data.fallbackTitle}
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                onError={() => setImageFailed(true)}
              />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-brand-blue/30 p-8 text-center">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-brand-blue/40 bg-brand-blue/15 text-3xl font-bold text-brand-blue-light">
                AZ
              </div>
              <p className="text-2xl font-bold font-cairo text-white">{data.fallbackTitle}</p>
              <p className="mt-3 text-sm font-tajawal text-gray-300">{data.fallbackSubtitle}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
