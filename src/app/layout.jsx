import '@/styles/globals.css';
import LangSetter from '@/components/LangSetter';

export const metadata = {
  title: 'Atla Hub Tech | Elite Digital Solutions & Cybersecurity',
  description: 'High-converting websites, powerful applications, and elite cybersecurity solutions. Led by Ahmed Zayed and a team of 6 elite specialists.',
  keywords: ['Atla Hub Tech', 'Ahmed Zayed', 'Cybersecurity', 'Web Development', 'Digital Marketing', 'App Development'],
  icons: {
    icon: '/assets/images/Atlanta_Jerusalem.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="font-tajawal text-gray-900 bg-gray-50 antialiased">
        <LangSetter />
        <main>{children}</main>
      </body>
    </html>
  );
}
