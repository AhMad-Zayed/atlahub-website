import '../styles/globals.css';

export const metadata = {
  title: {
    default: 'Atla Hub Tech – Expert Tech & Media Solutions',
    template: '%s | Atla Hub Tech',
  },
  description:
    'AtlaHub is a B2B Customer Support and Omnichannel Messaging SaaS. Integrate WhatsApp, Facebook, Instagram, and TikTok to manage all customer communications in one platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
