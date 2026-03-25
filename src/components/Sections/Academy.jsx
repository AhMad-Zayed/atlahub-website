'use client';

import Button from '@/components/UI/Button';
import { motion } from 'framer-motion';

export default function Academy() {
  return (
    <section id="academy" className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Top Blue Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-blue-light"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <div className="inline-block px-4 py-1 mb-6 bg-brand-blue/20 border border-brand-blue/40 text-brand-blue-light rounded-full text-sm font-bold tracking-widest uppercase animate-pulse">Coming Soon</div>
        <h2 className="text-4xl lg:text-5xl font-bold font-cairo mb-6">Atla Hub Academy</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-tajawal leading-relaxed">
          Elite training programs tailored for the next generation of software engineers and high-level cybersecurity experts.
        </p>
        
        <Button variant="outline">Explore Programs</Button>
      </motion.div>
    </section>
  );
}