'use client';

import content from '@/data/content.json';
import { Code, TrendingUp, ShieldAlert, Video, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  code: <Code className="w-8 h-8 text-brand-blue-light" />,
  'trending-up': <TrendingUp className="w-8 h-8 text-brand-blue-light" />,
  'shield-alert': <ShieldAlert className="w-8 h-8 text-brand-blue-light" />,
  video: <Video className="w-8 h-8 text-brand-blue-light" />,
};

export default function Services() {
  const { services } = content;

  return (
    <section id="services" className="relative py-20 bg-white overflow-hidden">
      {/* Tech Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/assets/tech-pattern.svg')] bg-repeat opacity-5 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-cairo text-gray-900">Our Core Capabilities</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We deliver end-to-end solutions that drive growth, ensure security, and capture attention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const isHighlighted = service.highlight !== "";
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={service.id}
                className={`
                  p-8 rounded-xl transition-all duration-300 group
                  ${isHighlighted 
                    ? 'bg-gray-900 text-white shadow-2xl shadow-brand-blue/20 scale-105 border-2 border-brand-blue-light' 
                    : 'bg-gray-100 hover:bg-gray-200 hover:shadow-lg'
                  }
                `}
              >
                <div className={`
                  relative mb-6
                  ${isHighlighted ? 'flex items-center justify-between' : ''}
                `}>
                  <div className={`
                    w-16 h-16 rounded-lg flex items-center justify-center 
                    ${isHighlighted ? 'bg-brand-blue/20' : 'bg-white'}
                  `}>
                    {iconMap[service.icon]}
                  </div>
                  {isHighlighted && (
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-light animate-pulse">
                      Unique Selling Point
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold font-cairo mb-3">{service.title}</h3>
                <p className={`mb-4 ${isHighlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                  {service.description}
                </p>
                
                {isHighlighted && (
                  <div className="mt-6 p-4 rounded-lg bg-brand-blue/10 border border-brand-blue/30">
                    <p className="font-bold text-sm text-brand-blue-light">{service.highlight}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}