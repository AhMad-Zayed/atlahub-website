'use client';

import Button from '@/components/UI/Button';
import { motion } from 'framer-motion';
import content from '@/data/content.json';

export default function Academy({ lang = 'en' }) {
  const data = content[lang]?.academy || content.en.academy;

  return (
    <section id="academy" className="py-32 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-blue-light"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <div className="inline-block px-4 py-1 mb-6 bg-brand-blue/20 border border-brand-blue/40 text-brand-blue-light rounded-full text-sm font-bold tracking-widest uppercase animate-pulse">{data.badge}</div>
        <h2 className="text-4xl lg:text-5xl font-bold font-cairo mb-6">{data.headline}</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-tajawal leading-relaxed">
          {data.description}
        </p>
        
        <Button variant="outline">{data.cta}</Button>
      </motion.div>
    </section>
  );
}
