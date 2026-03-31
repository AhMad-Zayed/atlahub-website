import '@/styles/globals.css';
import { headers } from 'next/headers';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-playfair',
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
        className={`${inter.variable} ${playfairDisplay.variable} min-h-screen bg-slate-950 text-slate-100 antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
