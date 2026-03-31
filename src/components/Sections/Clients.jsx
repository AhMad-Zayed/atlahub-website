'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Clients({ data }) {
  const items = data?.list || [];
  const transitionClassName = 'transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]';

  return (
    <section id="clients" className="relative overflow-hidden bg-[#0a0a0a] py-28 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.08),transparent_58%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-24"
        >
          <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-zinc-500 [font-family:var(--font-inter)]">
            Brand Portfolio
          </p>
          <h2 className="mb-4 text-3xl font-semibold italic tracking-tight text-white md:text-5xl [font-family:var(--font-playfair)]">
            {data.headline}
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-8 text-zinc-400 md:text-base [font-family:var(--font-inter)]">
            {data.subheadline}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <p className="text-center text-white [font-family:var(--font-inter)]">{data.loading}</p>
        ) : (
          <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[#0a0a0a] p-px">
            <div className="grid grid-cols-2 gap-px bg-[rgba(255,255,255,0.08)] md:grid-cols-4 xl:grid-cols-6">
            {items.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.24) }}
                className="group relative aspect-[3/2] overflow-hidden bg-[#0a0a0a]"
                title={client.name}
              >
                <div className={`absolute inset-0 bg-white/[0.03] opacity-0 ${transitionClassName} group-hover:opacity-100`}></div>
                <div className={`absolute inset-0 flex items-center justify-center px-6 ${transitionClassName} group-hover:-translate-y-[10px]`}>
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 767px) 50vw, (max-width: 1279px) 25vw, 16vw"
                    className={`object-contain px-6 py-7 grayscale opacity-50 ${transitionClassName} group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100`}
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-3 bottom-5 flex justify-center overflow-hidden px-2">
                  <p className={`max-w-full translate-y-[10px] text-center text-[9px] leading-4 tracking-[0.14em] text-white opacity-0 ${transitionClassName} [font-family:var(--font-inter)] group-hover:translate-y-0 group-hover:opacity-100 md:text-[10px] md:tracking-[0.18em]`}>
                    {client.name}
                  </p>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
