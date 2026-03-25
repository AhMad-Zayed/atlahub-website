'use client';

import { motion } from 'framer-motion';
import { Search, Map, Code2, Rocket } from 'lucide-react';

const steps = [
  { icon: <Search className="w-8 h-8" />, title: "Discovery & Audit", desc: "We deep-dive into your existing infrastructure and market positioning." },
  { icon: <Map className="w-8 h-8" />, title: "Strategic Planning", desc: "Crafting a tactical blueprint focused purely on ROI and scalability." },
  { icon: <Code2 className="w-8 h-8" />, title: "Rapid Execution", desc: "Our 6 elite specialists engineer the solution with military-grade precision." },
  { icon: <Rocket className="w-8 h-8" />, title: "Deployment & Scale", desc: "Launch the system into production and actively monitor for optimal performance." },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-cairo text-gray-900 mb-4">Our Elite Framework</h2>
          <p className="text-xl text-gray-600 font-tajawal max-w-2xl mx-auto">We do not guess. We operate on a proven, systematic methodology.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-brand-blue to-brand-blue-light opacity-20 z-0"></div>
          
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
              <p className="text-gray-600 font-tajawal leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}