'use client';
import { useEffect, useRef, useState } from 'react';
import type { Map as MLMap, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import baseStyle from '@/lib/map-style.json';
import { islands, artists, initials } from '@/lib/data';

// Artist pins: island center, nudged so several artists on one island don't overlap.
const artistPoints = {
  type: 'FeatureCollection' as const,
  features: artists.map((a) => {
    const isl = islands.find((i) => i.id === a.island)!;
    const n = artists.filter((x) => x.island === a.island).indexOf(a);
    return {
      type: 'Feature' as const,
      properties: { name: a.name, island: a.island },
      geometry: { type: 'Point' as const, coordinates: [isl.center[0] + n * 0.08, isl.center[1] + n * 0.04] },
    };
  }),
};

export default function MapSection() {
  const [sel, setSel] = useState('tenerife');
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('maplibre-gl').then(({ Map, NavigationControl, setWorkerUrl }) => {
      if (cancelled || !box.current) return;
      setWorkerUrl('/maplibre-gl-worker.mjs'); // copied by postinstall; bundler can't resolve maplibre's worker URL
      const style = { ...baseStyle, sources: { ...baseStyle.sources, artists: { type: 'geojson', data: artistPoints } } } as unknown as StyleSpecification; // JSON import loses tuple/literal types
      const m = new Map({ container: box.current, style, bounds: [[-18.2, 27.6], [-13.3, 29.3]], fitBoundsOptions: { padding: 24 }, attributionControl: { compact: true } });
      m.addControl(new NavigationControl({ showCompass: false }), 'top-right');
      m.scrollZoom.disable(); // keep page scroll working over the map
      m.on('click', 'artists', (e) => {
        const id = e.features?.[0]?.properties?.island;
        if (id) setSel(id);
      });
      m.on('mouseenter', 'artists', () => (m.getCanvas().style.cursor = 'pointer'));
      m.on('mouseleave', 'artists', () => (m.getCanvas().style.cursor = ''));
      map.current = m;
    });
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  const cur = islands.find((i) => i.id === sel)!;
  const arts = artists.filter((a) => a.island === sel);

  const pick = (id: string) => {
    setSel(id);
    const isl = islands.find((i) => i.id === id)!;
    map.current?.flyTo({ center: isl.center, zoom: 8.6 });
  };

  return (
    <section id="mapa" className="section" style={{ paddingTop: 40 }}>
      <div className="wrap row">
        <div className="map-side">
          <div className="bar" />
          <h2 className="h2" style={{ marginBottom: 20 }}>Descubre las islas</h2>
          <p style={{ lineHeight: 1.7, margin: 0 }}>Elige una isla y conoce a quienes la hacen sonar.</p>
          <div className="card panel" aria-live="polite">
            <p className="eyebrow">{cur.provincia}</p>
            <h3>{cur.nombre}</h3>
            {arts.length ? (
              <ul className="list">
                {arts.map((a) => (
                  <li key={a.name}>
                    <span className="avatar" aria-hidden="true">{initials(a.name)}</span>
                    <span><strong>{a.name}</strong><small>{a.genre}</small></span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>Artistas de esta isla, próximamente.</p>
            )}
          </div>
        </div>
        <div className="map-main">
          <div className="map-box"><div ref={box} aria-label="Mapa de las Islas Canarias" role="region" /></div>
          <div className="chips" role="group" aria-label="Islas">
            {islands.map((i) => (
              <button key={i.id} className="chip" aria-pressed={i.id === sel} onClick={() => pick(i.id)}>{i.nombre}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
