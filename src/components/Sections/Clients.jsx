'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import content from '@/data/content.json';

export default function Clients({ lang = 'en' }) {
  const data = content[lang]?.clients || content.en.clients;
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch('/api/clients');
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        }
      } catch (error) {
        console.error('Failed to fetch clients', error);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  return (
    <section id="clients" className="relative py-32 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-tech-pattern pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-white mb-4 font-cairo">{data.headline}</h2>
          <p className="text-center text-gray-400 mb-12">{data.subheadline}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
        >
          {loading ? <p className="text-white">{data.loading}</p> : 
            clients.map((client) => (
              <div key={client.id} className="text-center" title={client.name}>
                <img src={client.logo_url} alt={client.name} className="h-12 max-w-[150px] object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
              </div>
            ))
          }
        </motion.div>
      </div>
    </section>
  );
}
