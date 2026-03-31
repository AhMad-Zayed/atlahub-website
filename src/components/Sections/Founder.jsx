'use client';

import { motion } from 'framer-motion';

export default function Founder({ data }) {
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
          className="text-start"
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
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/40 to-transparent z-10"></div>
          <img
            src={data.image}
            alt={data.alt}
            className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}
