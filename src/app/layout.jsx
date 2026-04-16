import '@/styles/globals.css';
import { headers } from 'next/headers';
import { Cairo, Tajawal } from 'next/font/google';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import CookieConsent from '@/components/Analytics/CookieConsent';
import ToasterProvider from '@/components/UI/ToasterProvider';

const cairo = Cairo({
  subsets: ['latin'],
  variable: '--font-cairo',
});

const tajawal = Tajawal({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
});

export const metadata = {
  title: 'Atla Hub Tech | Elite Digital Solutions & Cybersecurity',
  description: 'High-converting websites, powerful applications, and elite cybersecurity solutions. Led by Ahmed Zayed and a team of 6 elite specialists.',
  keywords: ['Atla Hub Tech', 'Ahmed Zayed', 'Cybersecurity', 'Web Development', 'Digital Marketing', 'App Development'],
  icons: {
    icon: '/assets/images/AtlaHub_Tech_Logo.png',
  },
};

export default async function RootLayout({ children }) {
  const headerStore = await headers();
  const lang = headerStore.get('x-current-lang') || 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cairo.variable} ${tajawal.variable} min-h-screen bg-slate-950 text-slate-100 antialiased`}
      >
        <AnalyticsTracker />
        <CookieConsent />
        <ToasterProvider />
        <main>{children}</main>
      </body>
    </html>
  );
}
