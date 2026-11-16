import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { artists, islandName } from '@/lib/data';

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
            <Link key={a.slug} href={`/artistas/${a.slug}`} className="card artist">
              <div className="artist-photo">
                <Image src={a.photo} alt={a.name} fill sizes="(max-width: 640px) 100vw, 360px" style={{ objectFit: 'cover', objectPosition: a.focus }} />
              </div>
              <div className="artist-body">
                <strong>{a.name}</strong>
                <span>{a.genre} · {islandName(a.island)}</span>
                <span className="artist-city">{a.city}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
