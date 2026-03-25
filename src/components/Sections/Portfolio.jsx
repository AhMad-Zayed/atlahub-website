'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          setPortfolioItems(data);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-cairo text-gray-900 mb-4">Proven Results</h2>
          <p className="text-xl text-gray-600 font-tajawal max-w-2xl mx-auto">Explore the elite systems and applications we have engineered for our partners.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12"><span className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></span></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={item.id} 
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-[0_0_30px_rgba(0,86,179,0.3)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative bg-gray-200">
                   <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-md border border-gray-700">{item.type}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold font-cairo mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 font-tajawal mb-4 line-clamp-3">{item.description}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-brand-blue font-bold font-cairo">Result: <span className="text-gray-900 font-normal">{item.result}</span></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}