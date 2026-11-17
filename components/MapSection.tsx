'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  // The panel keeps showing the last artist while it slides out, so `open` and `picked` are separate.
  const [picked, setPicked] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const art = picked === null ? null : artists[picked];
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  // 'auto' lets CSS decide (open on desktop, closed on phones) so the first paint never flashes.
  const [side, setSide] = useState<'auto' | 'open' | 'closed'>('auto');
  const [wide, setWide] = useState(true);
  useEffect(() => setWide(matchMedia('(min-width: 641px)').matches), []);
  const sideOpen = side === 'auto' ? wide : side === 'open';
  const toggleSide = () => setSide(sideOpen ? 'closed' : 'open');

  useEffect(() => {
    if (open) closeBtn.current?.focus({ preventScroll: true });
  }, [open, picked]);

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
      m.on('click', 'artists', (e) => {
        const i = e.features?.[0]?.properties.i;
        if (i === undefined) return;
        popup.remove();
        setPicked(Number(i));
        setOpen(true);
      });
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

  // List entry: same result as clicking the pin, and the keyboard route to every artist.
  const showArtist = (i: number) => {
    setPicked(i);
    setOpen(true);
    map.current?.flyTo({ center: artists[i].coords, zoom: 9 });
    if (!wide) setSide('closed'); // on phones the list covers the map, so get it out of the way
  };

  const reset = () => {
    setSel(null);
    map.current?.fitBounds([[-18.2, 27.6], [-13.3, 29.3]], { padding: 40 });
  };

  return (
    <section className="home" aria-label="Mapa de artistas">
      <div ref={box} className="map-full" role="region" aria-label="Mapa de las Islas Canarias. Pasa el ratón sobre un punto para ver el artista." />
      <aside className="card map-side" data-side={side} inert={!sideOpen} aria-label="Artistas en el mapa" id="map-side">
        <div className="map-side-head">
          <h1>Canarias Suena</h1>
          <p>Siete islas, un acento y mucha música. Pasa el ratón por los puntos del mapa o elige un artista de la lista.</p>
          <Link href="/artistas" className="btn map-cta">Ver todos los artistas</Link>
        </div>
        <h2 className="map-side-title">Artistas <span>({artists.length})</span></h2>
        <ul className="map-list">
          {artists.map((a, i) => (
            <li key={a.slug}>
              <button onClick={() => showArtist(i)} aria-current={open && picked === i ? 'true' : undefined}>
                <strong>{a.name}</strong>
                <small>{a.genre} · {islandName(a.island)}</small>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <button className="side-toggle" data-side={side} onClick={toggleSide} aria-controls="map-side" aria-expanded={sideOpen} aria-label={sideOpen ? 'Ocultar lista de artistas' : 'Mostrar lista de artistas'}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        <span>Artistas</span>
      </button>
      <div className="map-chips" role="group" aria-label="Islas">
        <button className="chip" aria-pressed={sel === null} onClick={reset}>Todas</button>
        {islands.map((i) => (
          <button key={i.id} className="chip" aria-pressed={i.id === sel} onClick={() => pick(i.id)}>{i.nombre}</button>
        ))}
      </div>
      {art && (
        <aside className="card map-panel" data-open={open} inert={!open} aria-label={`Ficha de ${art.name}`} onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
          <button ref={closeBtn} className="panel-close" aria-label="Cerrar ficha" onClick={() => setOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="panel-photo">
            <Image src={art.photo} alt={art.name} fill sizes="380px" style={{ objectFit: 'cover', objectPosition: art.focus }} />
          </div>
          <div className="panel-body">
            <p className="eyebrow">{art.genre} · {islandName(art.island)}</p>
            <h2>{art.name}</h2>
            <p className="pop-city">{art.city} · {art.since}</p>
            <p className="pop-bio">{art.bio}</p>
            <Link href={`/artistas/${art.slug}`} className="btn map-cta">Ver ficha completa</Link>
          </div>
        </aside>
      )}
    </section>
  );
}
