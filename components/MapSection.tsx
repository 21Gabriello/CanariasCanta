'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Map as MLMap, MapLayerMouseEvent, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import baseStyle from '@/lib/map-style.json';
import { islands, artists, islandName, type Artist } from '@/lib/data';

const artistPoints = {
  type: 'FeatureCollection' as const,
  features: artists.map((a, i) => ({
    type: 'Feature' as const,
    properties: { i },
    geometry: { type: 'Point' as const, coordinates: a.coords },
  })),
};

// Built with textContent, not innerHTML: artist data will come from Supabase later.
function popupContent(a: Artist) {
  const el = document.createElement('div');
  el.className = 'pop';
  const add = (tag: string, cls: string, text: string) => {
    const n = document.createElement(tag);
    n.className = cls;
    n.textContent = text;
    el.appendChild(n);
  };
  add('p', 'eyebrow', `${a.genre} · ${islandName(a.island)}`);
  add('strong', 'pop-name', a.name);
  add('span', 'pop-city', `${a.city} · ${a.since}`);
  add('p', 'pop-bio', a.bio);
  return el;
}

export default function MapSection() {
  const [sel, setSel] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('maplibre-gl').then(({ Map, NavigationControl, Popup, setWorkerUrl }) => {
      if (cancelled || !box.current) return;
      setWorkerUrl('/maplibre-gl-worker.mjs'); // copied by postinstall; bundler can't resolve maplibre's worker URL
      const style = { ...baseStyle, sources: { ...baseStyle.sources, artists: { type: 'geojson', data: artistPoints } } } as unknown as StyleSpecification; // JSON import loses tuple/literal types
      const m = new Map({ container: box.current, style, bounds: [[-18.2, 27.6], [-13.3, 29.3]], fitBoundsOptions: { padding: 40 }, attributionControl: { compact: true } });
      m.addControl(new NavigationControl({ showCompass: false }), 'top-right');
      m.scrollZoom.disable(); // keep page scroll working over the map

      const popup = new Popup({ closeButton: false, closeOnClick: false, offset: 14, maxWidth: '300px' });
      const show = (e: MapLayerMouseEvent) => {
        const a = artists[e.features?.[0]?.properties.i ?? -1];
        if (!a) return;
        m.getCanvas().style.cursor = 'pointer';
        popup.setLngLat(a.coords).setDOMContent(popupContent(a)).addTo(m);
      };
      m.on('mouseenter', 'artists', show);
      m.on('click', 'artists', show); // touch screens have no hover
      m.on('mouseleave', 'artists', () => {
        m.getCanvas().style.cursor = '';
        popup.remove();
      });
      map.current = m;
    });
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  const pick = (id: string) => {
    setSel(id);
    const isl = islands.find((i) => i.id === id)!;
    map.current?.flyTo({ center: isl.center, zoom: 8.6 });
  };

  const reset = () => {
    setSel(null);
    map.current?.fitBounds([[-18.2, 27.6], [-13.3, 29.3]], { padding: 40 });
  };

  return (
    <section className="home" aria-label="Mapa de artistas">
      <div ref={box} className="map-full" role="region" aria-label="Mapa de las Islas Canarias. Pasa el ratón sobre un punto para ver el artista." />
      <div className="card map-intro">
        <h1>Canarias Suena</h1>
        <p>Siete islas, un acento y mucha música. Pasa el ratón por los puntos del mapa para conocer a cada artista y su ciudad.</p>
        <Link href="/artistas" className="btn map-cta">Ver todos los artistas</Link>
      </div>
      <div className="map-chips" role="group" aria-label="Islas">
        <button className="chip" aria-pressed={sel === null} onClick={reset}>Todas</button>
        {islands.map((i) => (
          <button key={i.id} className="chip" aria-pressed={i.id === sel} onClick={() => pick(i.id)}>{i.nombre}</button>
        ))}
      </div>
    </section>
  );
}
