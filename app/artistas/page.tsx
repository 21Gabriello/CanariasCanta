import type { Metadata } from 'next';
import ArtistGrid from '@/components/ArtistGrid';

export const metadata: Metadata = { title: 'Artistas' };

export default function ArtistasPage() {
  return (
    <section className="section artists">
      <div className="wrap">
        <div className="bar" />
        <h1 className="h2">Artistas</h1>
        <p className="lead">Del folklore a la música urbana: voces de todas las islas y de varias épocas.</p>
        <ArtistGrid />
      </div>
    </section>
  );
}
