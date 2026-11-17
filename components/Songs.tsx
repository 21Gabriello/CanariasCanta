'use client';
import { useState } from 'react';
import { songs, levels } from '@/lib/data';

export default function Songs() {
  const [lvl, setLvl] = useState('Todos');
  const shown = songs.filter((s) => lvl === 'Todos' || s.level === lvl);

  return (
    <section id="canciones" className="section">
      <div className="wrap">
        <div className="bar" />
        <h1 className="h2">Canciones</h1>
        <p className="lead" style={{ marginBottom: 0 }}>Filtra por nivel de español.</p>
        <div className="chips" role="group" aria-label="Nivel">
          {['Todos', ...levels].map((l) => (
            <button key={l} className="chip" aria-pressed={l === lvl} onClick={() => setLvl(l)}>{l}</button>
          ))}
        </div>
        <ul className="songs">
          {shown.map((s) => (
            <li key={s.title}>
              {/* shortcut: icon only, becomes a play button once songs have audio */}
              <span className="play" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span className="song-name"><strong>{s.title}</strong><span>{s.artist}</span></span>
              <span className="song-genre">{s.genre}</span>
              <span className="level">{s.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
