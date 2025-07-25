import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "ANGELICA'S DIAMONDS - handmade bags",
  description:
    'Scopri la nostra collezione di borse fatte a mano,Qualità premium, design senza tempo e maestria artigianale eccezionale in ogni pezzo.',
  keywords:
    'borse, artigianali, fatte a mano, custom, borse premium, maestria artigianale',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/logo-small-circular.png',
    apple: '/logo-small-circular.png',
  },
  openGraph: {
    title: "ANGELICA'S DIAMONDS",
    description:
      'Borse di lusso realizzate a mano con qualità eccezionale ed eleganza senza tempo',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body
        className={`${inter.variable} font-sans antialiased bg-beige text-darkBrown`}
      >
        {children}
      </body>
    </html>
  );
}
