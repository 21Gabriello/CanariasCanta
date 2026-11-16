import type { Metadata } from 'next';
import { words } from '@/lib/data';

export const metadata: Metadata = { title: 'Vocabulario canario' };

export default function VocabularioPage() {
  return (
    <section className="section">
      <div className="wrap row">
        <div style={{ flex: '1 1 280px', maxWidth: 360 }}>
          <div className="bar" />
          <h1 className="h2">Vocabulario canario</h1>
          <p style={{ lineHeight: 1.7, margin: 0 }}>Palabras que oirás en las canciones y en la calle.</p>
        </div>
        <div className="grid" style={{ flex: '2 1 500px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {words.map((w) => (
            <div key={w.word} className="card word">
              <b>{w.word}</b>
              <small>{w.type}</small>
              <span>{w.def}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
