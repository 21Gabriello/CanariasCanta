import type { Metadata } from 'next';
import { events } from '@/lib/data';

export const metadata: Metadata = { title: 'Próximos eventos' };

export default function EventosPage() {
  return (
    <section className="section events">
      <div className="wrap">
        <div className="bar" />
        <h1 className="h2" style={{ marginBottom: 40 }}>Próximos eventos</h1>
        <div className="grid">
          {events.map((e, i) => (
            <article key={i} className="event">
              <div className="event-date"><b>{e.day}</b><span>{e.month} {e.year}</span></div>
              <strong>{e.title}</strong>
              <span className="event-place">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
                {e.place}
              </span>
              <span style={{ fontSize: 14, opacity: 0.85 }}>{e.kind}</span>
            </article>
          ))}
        </div>
        <p className="note">Programación de ejemplo para 2027.</p>
      </div>
    </section>
  );
}
