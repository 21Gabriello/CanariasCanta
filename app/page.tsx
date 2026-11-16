import Link from 'next/link';
import MapSection from '@/components/MapSection';

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="wrap hero-body">
          <div className="bar" />
          <h1>Canarias Suena</h1>
          <p>Siete islas, un acento y mucha música. Aprende español escuchando a los artistas canarios, de la timple al trap.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <a href="#mapa" className="btn" style={{ background: 'var(--paper)', color: 'var(--blue-dark)' }}>
              Explorar el mapa
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <Link href="/canciones" className="btn" style={{ border: '2px solid #fff' }}>Escuchar canciones</Link>
          </div>
        </div>
        <svg className="edge" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 120V70l40-8 36 14 50-26 44 18 60-30 52 22 70-14 48 20 66-28 58 16 72-22 64 20 62-18 70 24 56-26 74 18 60-16 66 22 58-20 70 16 64-24 58 20 42-8v90z" fill="var(--paper)" />
        </svg>
      </header>
      <MapSection />
    </>
  );
}
