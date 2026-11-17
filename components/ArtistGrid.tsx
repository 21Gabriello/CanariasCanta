'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { artists, islandName } from '@/lib/data';

// Chips are each artist's main genre (first tag); an artist matches any of its tags, so "Urbano · Rap" shows under Urbano.
const tags = (genre: string) => genre.split(' · ');
const genres = [...new Set(artists.map((a) => tags(a.genre)[0]))];

export default function ArtistGrid() {
  const [genre, setGenre] = useState('Todos');
  const shown = artists.filter((a) => genre === 'Todos' || tags(a.genre).includes(genre));

  return (
    <>
      <div className="chips" role="group" aria-label="Género" style={{ margin: '0 0 32px' }}>
        {['Todos', ...genres].map((g) => (
          <button key={g} className="chip" aria-pressed={g === genre} onClick={() => setGenre(g)}>{g}</button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} artistas</p>
      <div className="grid">
        {shown.map((a) => (
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
    </>
  );
}
