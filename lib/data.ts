// shortcut: static sample data, move to Supabase tables (islands, artists, songs, events, words) when the DB is ready.

export type Island = { id: string; nombre: string; provincia: string; center: [number, number] };
export type Artist = { name: string; genre: string; island: string };

export const islands: Island[] = [
  { id: 'elhierro', nombre: 'El Hierro', provincia: 'Santa Cruz de Tenerife', center: [-18.0, 27.74] },
  { id: 'lapalma', nombre: 'La Palma', provincia: 'Santa Cruz de Tenerife', center: [-17.86, 28.68] },
  { id: 'lagomera', nombre: 'La Gomera', provincia: 'Santa Cruz de Tenerife', center: [-17.23, 28.1] },
  { id: 'tenerife', nombre: 'Tenerife', provincia: 'Santa Cruz de Tenerife', center: [-16.6, 28.29] },
  { id: 'grancanaria', nombre: 'Gran Canaria', provincia: 'Las Palmas', center: [-15.6, 27.96] },
  { id: 'fuerteventura', nombre: 'Fuerteventura', provincia: 'Las Palmas', center: [-14.0, 28.4] },
  { id: 'lanzarote', nombre: 'Lanzarote', provincia: 'Las Palmas', center: [-13.63, 29.04] },
];

export const artists: Artist[] = [
  { name: 'Los Sabandeños', genre: 'Folklore', island: 'tenerife' },
  { name: 'Pedro Guerra', genre: 'Cantautor', island: 'tenerife' },
  { name: 'Los Gofiones', genre: 'Folklore', island: 'grancanaria' },
  { name: 'Efecto Pasillo', genre: 'Pop', island: 'grancanaria' },
  { name: 'Taburiente', genre: 'Folk rock', island: 'lapalma' },
  { name: 'Rosana', genre: 'Pop', island: 'lanzarote' },
  { name: 'Benito Cabrera', genre: 'Timple · Autor', island: 'lanzarote' },
];

export const levels = ['A2', 'B1', 'B2', 'C1'] as const;

export const songs = [
  { title: '[Título 01]', artist: 'Los Sabandeños', genre: 'Folklore', level: 'A2' },
  { title: '[Título 02]', artist: 'Los Gofiones', genre: 'Folklore', level: 'B1' },
  { title: '[Título 03]', artist: 'Pedro Guerra', genre: 'Cantautor', level: 'B2' },
  { title: '[Título 04]', artist: 'Efecto Pasillo', genre: 'Pop', level: 'B1' },
  { title: '[Título 05]', artist: 'Rosana', genre: 'Pop', level: 'C1' },
];

export const events = [
  { day: '[00]', month: '[MES]', title: 'Canarias Suena en el aula', place: '[Escuela de idiomas]', kind: 'Taller para alumnado de ELE' },
  { day: '[00]', month: '[MES]', title: '[Concierto]', place: '[Isla · sala]', kind: 'Concierto' },
  { day: '[00]', month: '[MES]', title: '[Festival]', place: '[Isla · lugar]', kind: 'Festival' },
];

export const words = [
  { word: 'guagua', type: 'Sustantivo', def: 'Autobús. En Canarias nadie dice «autobús» en la calle.' },
  { word: 'chacho', type: 'Interjección', def: 'Forma cariñosa de dirigirse a alguien o de expresar sorpresa.' },
  { word: 'papas', type: 'Sustantivo', def: 'Patatas. Las papas arrugadas con mojo son un plato típico.' },
  { word: 'millo', type: 'Sustantivo', def: 'Maíz. De ahí viene el gofio.' },
  { word: 'bubango', type: 'Sustantivo', def: 'Calabacín.' },
  { word: 'ustedes', type: 'Gramática', def: 'En Canarias se usa «ustedes» en lugar de «vosotros» también entre amigos.' },
];

export const initials = (n: string) =>
  n.split(' ').filter((x) => x.length > 2).slice(0, 2).map((x) => x[0]).join('').toUpperCase();

export const islandName = (id: string) => islands.find((i) => i.id === id)?.nombre ?? id;
