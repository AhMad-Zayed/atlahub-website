'use client';

import Link from 'next/link';
import { Code, TrendingUp, ShieldAlert, Video } from 'lucide-react';
import { Server, GraduationCap, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  code: <Code className="w-8 h-8 text-brand-blue-light" />,
  'trending-up': <TrendingUp className="w-8 h-8 text-brand-blue-light" />,
  'shield-alert': <ShieldAlert className="w-8 h-8 text-brand-blue-light" />,
  video: <Video className="w-8 h-8 text-brand-blue-light" />,
  server: <Server className="w-8 h-8 text-brand-blue-light" />,
  academy: <GraduationCap className="w-8 h-8 text-brand-blue-light" />,
  training: <GraduationCap className="w-8 h-8 text-brand-blue-light" />,
};

export default function Services({ data, lang = 'en' }) {
  const services = data?.list || [];

  return (
    <section id="services" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-tech-pattern pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-cairo text-gray-900">{data?.headline}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {data?.subheadline}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service, index) => {
            const isHighlighted = Boolean(service.featured);
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={service.id}
                className={`
                  rounded-xl transition-all duration-300 group text-start
                  ${isHighlighted 
                    ? 'bg-gray-900 text-white shadow-2xl shadow-brand-blue/20 scale-105 border-2 border-brand-blue-light' 
                    : 'bg-gray-100 hover:bg-gray-200 hover:shadow-lg'
                  }
                `}
              >
                <Link
                  href={`/${lang}/services/${service.id}`}
                  className="block h-full p-8"
                >
                  <div className={`
                    relative mb-6
                    ${isHighlighted ? 'flex items-center justify-between gap-3' : ''}
                  `}>
                    <div className={`
                      w-16 h-16 rounded-lg flex items-center justify-center 
                      ${isHighlighted ? 'bg-brand-blue/20' : 'bg-white'}
                    `}>
                      {iconMap[service.icon]}
                    </div>
                    {isHighlighted && (
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-light">
                        {data?.uniqueBadge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold font-cairo mb-3">{service.title}</h3>
                  <p className={`mb-5 ${isHighlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                  
                  {service.highlight && (
                    <div className={`rounded-lg border p-4 ${isHighlighted ? 'bg-brand-blue/10 border-brand-blue/30' : 'bg-white/70 border-gray-200'}`}>
                      <p className={`font-bold text-sm ${isHighlighted ? 'text-brand-blue-light' : 'text-gray-700'}`}>{service.highlight}</p>
                    </div>
                  )}

                  <div className={`mt-6 flex items-center gap-2 text-sm font-bold ${isHighlighted ? 'text-white' : 'text-brand-blue'}`}>
                    <span>{lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
