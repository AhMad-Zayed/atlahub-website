import { notFound } from 'next/navigation';

const supportedLangs = new Set(['en', 'ar']);

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  if (!supportedLangs.has(lang)) {
    notFound();
  }

  return (
    <div
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="contents"
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
