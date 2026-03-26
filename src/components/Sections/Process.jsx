'use client';

import { motion } from 'framer-motion';
import { Search, Map, Code2, Rocket } from 'lucide-react';
import content from '@/data/content.json';

const icons = [
  <Search key="search" className="w-8 h-8" />,
  <Map key="map" className="w-8 h-8" />,
  <Code2 key="code2" className="w-8 h-8" />,
  <Rocket key="rocket" className="w-8 h-8" />,
];

export default function Process({ lang = 'en' }) {
  const data = content[lang]?.process || content.en.process;
  const steps = (data.steps || []).map((step, index) => ({
    ...step,
    icon: icons[index] || icons[icons.length - 1],
  }));

  return (
    <section id="process" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-cairo text-gray-900 mb-4">{data.headline}</h2>
          <p className="text-xl text-gray-600 font-tajawal max-w-2xl mx-auto">{data.subheadline}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 start-[10%] end-[10%] h-1 bg-gradient-to-r from-brand-blue to-brand-blue-light opacity-20 z-0"></div>
          
          {steps.map((step, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              key={index} 
              className="relative z-10 text-center"
            >
              <div className="w-24 h-24 mx-auto bg-gray-900 text-brand-blue-light rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-brand-blue/10 border border-gray-800 rotate-3 hover:rotate-0 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold font-cairo text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 font-tajawal leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
