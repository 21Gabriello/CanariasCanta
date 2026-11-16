'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Mapa' },
  { href: '/artistas', label: 'Artistas' },
  { href: '/canciones', label: 'Canciones' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/vocabulario', label: 'Vocabulario canario' },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="nav" aria-label="Principal">
      <Link href="/" className="logo">canarias<span>suena</span></Link>
      <div className="nav-links">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={path === l.href ? 'page' : undefined}>{l.label}</Link>
        ))}
      </div>
    </nav>
  );
}
