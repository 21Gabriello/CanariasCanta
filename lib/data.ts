// shortcut: static sample data, move to Supabase tables (islands, artists, songs, events, words) when the DB is ready.

export type Island = { id: string; nombre: string; provincia: string; center: [number, number] };
// city: where the artist was born / the group was founded. coords: [lng, lat] of that city.
export type Artist = { name: string; genre: string; island: string; city: string; since: string; bio: string; coords: [number, number] };

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
  { name: 'Los Sabandeños', genre: 'Folklore', island: 'tenerife', city: 'San Cristóbal de La Laguna', since: 'Fundado en 1966', coords: [-16.316, 28.488],
    bio: 'Grupo nacido entre amigos de la Universidad de La Laguna para conservar y difundir la música popular canaria. Lo fundó, entre otros, Elfidio Alonso.' },
  { name: 'Pedro Guerra', genre: 'Cantautor', island: 'tenerife', city: 'Güímar', since: 'Nacido en 1966', coords: [-16.41, 28.315],
    bio: 'Estudió guitarra en el Conservatorio de Tenerife y empezó tocando en fiestas populares. En 1993 se instaló en Madrid para su carrera en solitario.' },
  { name: 'Los Gofiones', genre: 'Folklore', island: 'grancanaria', city: 'Las Palmas de Gran Canaria', since: 'Fundado en 1968', coords: [-15.43, 28.12],
    bio: 'Agrupación de música popular canaria creada a iniciativa del timplista Totoyo Millares. Reúne a unos cuarenta cantantes e instrumentistas.' },
  { name: 'Efecto Pasillo', genre: 'Pop', island: 'grancanaria', city: 'Gran Canaria (ciudad por confirmar)', since: 'Fundado en 2007', coords: [-15.6, 27.96],
    bio: 'Grupo de pop formado por cuatro amigos: Iván Torres, Javier Moreno, Nau Barreto y Arturo Sosa. El nombre homenajea el pasillo de su local de ensayo.' },
  { name: 'Taburiente', genre: 'Folk · Nueva Canción Canaria', island: 'lapalma', city: 'Santa Cruz de La Palma', since: 'Mediados de los años 70', coords: [-17.765, 28.683],
    bio: 'Fundado por Luis Morera, Miguel Pérez y Manolo Pérez. Su nombre viene de la Caldera de Taburiente, en el corazón de La Palma.' },
  { name: 'Rosana', genre: 'Pop', island: 'lanzarote', city: 'Arrecife', since: 'Nacida en 1963', coords: [-13.55, 28.963],
    bio: 'Rosana Arbelo empezó como compositora y triunfó como cantante en 1996. En 2022 fue la primera mujer nombrada Hija Predilecta de Arrecife.' },
  { name: 'Benito Cabrera', genre: 'Timple · Autor', island: 'lanzarote', city: 'Lanzarote (lugar de nacimiento por confirmar)', since: 'Nacido en 1963', coords: [-13.56, 29.06],
    bio: 'Timplista y folclorista, director musical de Los Sabandeños de 2007 a 2020. Dirige la Casa-Museo del Timple en Teguise.' },
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
