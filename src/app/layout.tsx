import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Visit Shaftesbury - Discover Historic Dorset',
    template: '%s | Visit Shaftesbury',
  },
  description:
    'Discover the historic hilltop town of Shaftesbury, Dorset. Home to the iconic Gold Hill, Shaftesbury Abbey, and centuries of English heritage.',
  keywords: [
    'Shaftesbury',
    'Dorset',
    'Gold Hill',
    'Hovis',
    'Tourism',
    'England',
    'Historic Town',
    'Shaftesbury Abbey',
  ],
  authors: [{ name: 'Visit Shaftesbury' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://visitshaftesbury.co.uk',
    siteName: 'Visit Shaftesbury',
    title: 'Visit Shaftesbury - Discover Historic Dorset',
    description:
      'Discover the historic hilltop town of Shaftesbury, Dorset. Home to the iconic Gold Hill and centuries of English heritage.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold Hill, Shaftesbury',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visit Shaftesbury - Discover Historic Dorset',
    description:
      'Discover the historic hilltop town of Shaftesbury, Dorset. Home to the iconic Gold Hill and centuries of English heritage.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main id="main-content" className="flex-grow" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
