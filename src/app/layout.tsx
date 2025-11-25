import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import RootShell from '@/components/layout/RootShell';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Abufa Plywood - Plywood & Panel Supplier Depok',
  description:
    'Abufa Plywood adalah penyedia plywood, MDF, block melamin, partikel board, dan phenolic film di Depok untuk kebutuhan furniture dan interior proyek.',
  icons: {
    icon: '/img/logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.className} antialiased`}>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
