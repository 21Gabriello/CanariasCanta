import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { artists, events, songs, islandName } from '@/lib/data';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: artists.find((x) => x.slug === slug)?.name ?? 'Artista' };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const a = artists.find((x) => x.slug === slug);
  if (!a) notFound();
  // shortcut: events matched by artist name in the title, link by artist id once events live in Supabase.
  const own = events.filter((e) => e.title.includes(a.name));
  const ownSongs = songs.filter((s) => s.artist === a.name);

  return (
    <section className="section">
      <div className="wrap">
        <Link href="/artistas" className="back">← Todos los artistas</Link>
        <div className="row artist-detail">
          <div className="artist-hero">
            <Image src={a.photo} alt={a.name} fill priority sizes="(max-width: 800px) 100vw, 480px" style={{ objectFit: 'cover', objectPosition: a.focus }} />
          </div>
          <div style={{ flex: '1 1 320px' }}>
            <p className="eyebrow">{a.genre} · {islandName(a.island)}</p>
            <h1 className="h2" style={{ fontSize: 48, margin: '8px 0 24px' }}>{a.name}</h1>
            <dl className="facts">
              <div><dt>Origen</dt><dd>{a.city}</dd></div>
              <div><dt>Isla</dt><dd>{islandName(a.island)}</dd></div>
              <div><dt>Trayectoria</dt><dd>{a.since}</dd></div>
              <div><dt>Género</dt><dd>{a.genre}</dd></div>
            </dl>
            <p style={{ lineHeight: 1.7, fontSize: 18 }}>{a.bio}</p>
            {ownSongs.length > 0 && (
              <>
                <h2 style={{ fontSize: 22, margin: '32px 0 12px' }}>Para trabajar en clase</h2>
                <ul className="list">
                  {ownSongs.map((s) => (
                    <li key={s.title}><Link href="/canciones" className="song-link">{s.title}</Link> · nivel {s.level}</li>
                  ))}
                </ul>
              </>
            )}
            {own.length > 0 && (
              <>
                <h2 style={{ fontSize: 22, margin: '32px 0 12px' }}>Próximos eventos</h2>
                <ul className="list">
                  {own.map((e) => (
                    <li key={e.title}><strong>{e.day} {e.month} {e.year}</strong> · {e.place}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
