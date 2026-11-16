import type { Metadata } from 'next';
import { Outfit, Nunito_Sans } from 'next/font/google';
import Nav from '@/components/Nav';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });
const nunito = Nunito_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: { default: 'Canarias Suena', template: '%s · Canarias Suena' },
  description: 'Música canaria para aprender español.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${nunito.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="footer">
          <span className="logo" style={{ fontSize: 18 }}>canarias<span>suena</span></span>
          <span>Música canaria para aprender español.</span>
        </footer>
      </body>
    </html>
  );
}
