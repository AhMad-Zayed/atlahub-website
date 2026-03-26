'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LangSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname.startsWith('/ar') ? 'ar' : 'en';
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [pathname]);

  return null;
}