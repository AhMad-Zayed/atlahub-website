import '@/styles/globals.css';
import { headers } from 'next/headers';
import { Cairo, Tajawal } from 'next/font/google';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import CookieConsent from '@/components/Analytics/CookieConsent';
import ToasterProvider from '@/components/UI/ToasterProvider';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
});

const tajawal = Tajawal({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
});

const siteUrl = 'https://www.atlahub.tech';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Atla Hub Tech | Software, Cybersecurity & Digital Marketing — Jerusalem',
    template: '%s | Atla Hub Tech',
  },
  description:
    'Atla Hub Tech delivers elite software development, cybersecurity & forensics, digital marketing, media production, and professional training. Led by Ahmad Zayed from Jerusalem.',
  keywords: [
    'Atla Hub Tech', 'Ahmad Zayed', 'أتلا هاب تك', 'أحمد زايد',
    'Cybersecurity Jerusalem', 'Software Development Palestine',
    'Digital Marketing Palestine', 'Web Development Jerusalem',
    'App Development', 'Digital Forensics', 'Training Palestine',
    'IT Solutions Jerusalem', 'شركة برمجة القدس', 'أمن سيبراني فلسطين',
  ],
  authors: [{ name: 'Ahmad Zayed', url: siteUrl }],
  creator: 'Ahmad Zayed — Atla Hub Tech',
  publisher: 'Atla Hub Tech',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en': `${siteUrl}/en`,
      'ar': `${siteUrl}/ar`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_PS',
    url: siteUrl,
    siteName: 'Atla Hub Tech',
    title: 'Atla Hub Tech | Software, Cybersecurity & Digital Marketing',
    description:
      'Elite tech solutions from Jerusalem: software development, cybersecurity, digital marketing, media production, and professional training. Led by Ahmad Zayed.',
    images: [
      {
        url: `${siteUrl}/assets/images/AtlaHub_Tech_Logo.png`,
        width: 1200,
        height: 630,
        alt: 'Atla Hub Tech Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atla Hub Tech | Software, Cybersecurity & Digital Marketing',
    description:
      'Elite tech solutions from Jerusalem: software, cybersecurity, marketing, media & training. Led by Ahmad Zayed.',
    images: [`${siteUrl}/assets/images/AtlaHub_Tech_Logo.png`],
  },
  icons: {
    icon: '/assets/images/AtlaHub_Tech_Logo.png',
    apple: '/assets/images/AtlaHub_Tech_Logo.png',
  },
  verification: {
    google: 'Apib7-x98H0j5cPqHWwSMm6dNU4GmODRoqxLiDzdx9I',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Atla Hub Tech',
  alternateName: 'أتلا هاب تك',
  url: siteUrl,
  logo: `${siteUrl}/assets/images/AtlaHub_Tech_Logo.png`,
  image: `${siteUrl}/assets/images/AtlaHub_Tech_Logo.png`,
  description:
    'Atla Hub Tech provides elite software development, cybersecurity, digital marketing, media production, and professional training services from Jerusalem, Palestine.',
  founder: {
    '@type': 'Person',
    name: 'Ahmad Zayed',
    email: 'azayed@atlahub.tech',
    jobTitle: 'Founder & Lead Specialist',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+972522977790',
      contactType: 'customer support',
      availableLanguage: ['English', 'Arabic'],
    },
    {
      '@type': 'ContactPoint',
      email: 'info@atlahub.tech',
      contactType: 'customer support',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jerusalem',
    addressCountry: 'PS',
  },
  sameAs: ['https://github.com/AhMad-Zayed'],
  serviceType: [
    'Software Development',
    'Cybersecurity',
    'Digital Marketing',
    'Media Production',
    'Professional Training',
  ],
};

export default async function RootLayout({ children }) {
  const headerStore = await headers();
  const lang = headerStore.get('x-current-lang') || 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
