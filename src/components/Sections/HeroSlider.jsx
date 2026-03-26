'use strict';
'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import dynamic from 'next/dynamic';
import atlantaJerusalem from '../../assets/images/Atlanta_Jerusalem.png';
import content from '@/data/content.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });

export default function HeroSlider({ lang = 'en' }) {
  const heroContent = content[lang] || content.en;
  const slides = (heroContent.heroSlides || []).map((slide) => ({ ...slide, image: atlantaJerusalem }));
  const ctaData = heroContent.hero || {};
  const isArabic = lang === 'ar';

  return (
    <section className="relative h-screen w-full bg-blue-50 overflow-hidden" id="hero">
      <div className="absolute inset-0 z-0 bg-tech-pattern" />

      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect={'fade'}
        speed={1000}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-blue-600"></span>`;
          },
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <Image
              src={slide.image}
              alt="Atla Hub Tech"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-20">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white max-w-3xl"
              >
                <h1 className={`font-cairo text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight ${isArabic ? 'md:leading-[1.4]' : ''}`}>
                  {slide.title}
                </h1>
                <p className="font-tajawal text-base sm:text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="font-tajawal font-bold bg-gradient-to-r from-blue-700 to-blue-400 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
                    {ctaData?.cta_primary}
                  </button>
                  <button className="font-tajawal font-bold border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/20 transition-colors">
                    {ctaData?.cta_secondary}
                  </button>
                </div>
              </MotionDiv>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
