'use client';

import content from '@/data/content.json';
import { motion } from 'framer-motion';

export default function WhyUs() {
  const { whyUs } = content;
  
  return (
    <section id="why-us" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-cairo text-gray-900">{whyUs.headline}</h2>
          <p className="mt-4 text-lg text-gray-600 font-tajawal max-w-2xl mx-auto">{whyUs.subheadline}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyUs.points.map((point, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-brand-blue hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-brand-blue font-bold text-xl font-cairo">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold font-cairo mb-4 text-gray-900">{point.title}</h3>
              <p className="text-gray-600 font-tajawal leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}