'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar({ lang = 'en', navData, brandData }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const activeLang = pathname?.startsWith('/ar') ? 'ar' : lang;

  const navLinks = [
    { href: '#services', label: navData?.services },
    { href: '#portfolio', label: navData?.portfolio },
    { href: '#about', label: navData?.about },
  ];

  const toggleLang = () => {
    const newLang = activeLang === 'ar' ? 'en' : 'ar';
    if (!pathname) return '/';
    return pathname.replace(/^\/(en|ar)/, `/${newLang}`);
  };

  const homePath = `/${activeLang}`;

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm font-cairo transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href={homePath} className="text-2xl font-bold text-brand-blue tracking-tight">
            {brandData?.part1}<span className="text-brand-blue-light">{brandData?.part2}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center ${activeLang === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-brand-blue font-semibold transition-colors duration-300">
                {link.label}
              </Link>
            ))}
            <Link href={toggleLang()} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors duration-300">
              {activeLang === 'ar' ? navData?.langEn : navData?.langAr}
            </Link>
            <Link href="#contact" className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white rounded-lg font-bold shadow-[0_4px_15px_rgba(0,86,179,0.3)] hover:shadow-[0_6px_25px_rgba(0,170,255,0.5)] hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wide">
              {navData?.startProject}
            </Link>
          </nav>

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-blue hover:text-brand-blue-light focus:outline-none transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white border-t border-gray-200/50`}>
        <nav className="flex flex-col items-center space-y-4 py-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-brand-blue font-semibold transition-colors duration-300">
              {link.label}
            </Link>
          ))}
          <Link href={toggleLang()} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors duration-300">
            {activeLang === 'ar' ? navData?.langEn : navData?.langAr}
          </Link>
          <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 px-8 py-3 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white rounded-lg font-bold shadow-md">
            {navData?.startProject}
          </Link>
        </nav>
      </div>
    </header>
  );
}
