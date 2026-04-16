'use client';

import { Toaster } from 'sonner';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        classNames: {
          toast: 'bg-slate-950/95 text-white border border-white/10 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl',
          title: 'font-cairo font-semibold',
          description: 'font-tajawal text-slate-200',
          actionButton: 'bg-cyan-500 text-slate-950',
          cancelButton: 'bg-white/10 text-white',
        },
      }}
    />
  );
}

