import type { Metadata } from 'next';
import { artists, initials, islandName } from '@/lib/data';

export const metadata: Metadata = { title: 'Artistas' };

export default function ArtistasPage() {
  return (
    <section className="section artists">
      <div className="wrap">
        <div className="bar" />
        <h1 className="h2">Artistas</h1>
        <p className="lead">Del folklore a la música urbana: voces de todas las islas y de varias épocas.</p>
        <div className="grid">
          {artists.map((a) => (
            <article key={a.name} className="card artist">
              <div className="artist-top" aria-hidden="true">{initials(a.name)}</div>
              <div className="artist-body">
                <strong>{a.name}</strong>
                <span>{a.genre} · {islandName(a.island)}</span>
                <span className="artist-city">{a.city} · {a.since}</span>
                <p>{a.bio}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="note">Fotos y biografías: pendientes de cada artista.</p>
      </div>
    </section>
  );
}
