// shortcut: static sample data, move to Supabase tables (islands, artists, songs, events, words) when the DB is ready.

export type Island = { id: string; nombre: string; provincia: string; center: [number, number] };
// city: where the artist was born / the group was founded. coords: [lng, lat] of that city.
// focus: CSS object-position used to crop the photo into cards/panels.
export type Artist = { slug: string; photo: string; focus: string; name: string; genre: string; island: string; city: string; since: string; bio: string; coords: [number, number] };

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
  { slug: 'los-sabandenos', photo: '/artists/los-sabandenos.webp', focus: '50% 45%', name: 'Los Sabandeños', genre: 'Folklore', island: 'tenerife', city: 'San Cristóbal de La Laguna', since: 'Fundado en 1966', coords: [-16.316, 28.488],
    bio: 'Grupo nacido entre amigos de la Universidad de La Laguna para conservar y difundir la música popular canaria. Lo fundó, entre otros, Elfidio Alonso.' },
  { slug: 'pedro-guerra', photo: '/artists/pedro-guerra.webp', focus: '35% 30%', name: 'Pedro Guerra', genre: 'Cantautor', island: 'tenerife', city: 'Güímar', since: 'Nacido en 1966', coords: [-16.41, 28.315],
    bio: 'Estudió guitarra en el Conservatorio de Tenerife y empezó tocando en fiestas populares. En 1993 se instaló en Madrid para su carrera en solitario.' },
  { slug: 'los-gofiones', photo: '/artists/los-gofiones.webp', focus: '50% 65%', name: 'Los Gofiones', genre: 'Folklore', island: 'grancanaria', city: 'Las Palmas de Gran Canaria', since: 'Fundado en 1968', coords: [-15.43, 28.12],
    bio: 'Agrupación de música popular canaria creada a iniciativa del timplista Totoyo Millares. Reúne a unos cuarenta cantantes e instrumentistas.' },
  { slug: 'efecto-pasillo', photo: '/artists/efecto-pasillo.png', focus: '50% 40%', name: 'Efecto Pasillo', genre: 'Pop', island: 'grancanaria', city: 'Gran Canaria (ciudad por confirmar)', since: 'Fundado en 2007', coords: [-15.6, 27.96],
    bio: 'Grupo de pop formado por cuatro amigos: Iván Torres, Javier Moreno, Nau Barreto y Arturo Sosa. El nombre homenajea el pasillo de su local de ensayo.' },
  { slug: 'taburiente', photo: '/artists/taburiente.png', focus: '50% 35%', name: 'Taburiente', genre: 'Folk · Nueva Canción Canaria', island: 'lapalma', city: 'Santa Cruz de La Palma', since: 'Mediados de los años 70', coords: [-17.765, 28.683],
    bio: 'Fundado por Luis Morera, Miguel Pérez y Manolo Pérez. Su nombre viene de la Caldera de Taburiente, en el corazón de La Palma.' },
  { slug: 'rosana', photo: '/artists/rosana.png', focus: '50% 30%', name: 'Rosana', genre: 'Pop', island: 'lanzarote', city: 'Arrecife', since: 'Nacida en 1963', coords: [-13.55, 28.963],
    bio: 'Rosana Arbelo empezó como compositora y triunfó como cantante en 1996. En 2022 fue la primera mujer nombrada Hija Predilecta de Arrecife.' },
  { slug: 'benito-cabrera', photo: '/artists/benito-cabrera.png', focus: '55% 35%', name: 'Benito Cabrera', genre: 'Timple · Autor', island: 'lanzarote', city: 'Lanzarote (lugar de nacimiento por confirmar)', since: 'Nacido en 1963', coords: [-13.56, 29.06],
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
  // shortcut: invented sample programme for 2027, replace with real events from Supabase.
  { day: '23', month: 'ENE', year: '2027', title: 'Canarias Suena en el aula: el timple', place: 'EOI Santa Cruz de Tenerife', kind: 'Taller ELE · B1–B2' },
  { day: '13', month: 'FEB', year: '2027', title: 'Noche de folklore con Los Gofiones', place: 'Auditorio Alfredo Kraus · Las Palmas de Gran Canaria', kind: 'Concierto' },
  { day: '20', month: 'MAR', year: '2027', title: 'Rosana en Arrecife', place: 'Recinto Ferial · Arrecife, Lanzarote', kind: 'Concierto' },
  { day: '24', month: 'ABR', year: '2027', title: 'Canarias Suena en el aula: canciones y canarismos', place: 'Universidad de La Laguna · Tenerife', kind: 'Taller ELE · A2–B1' },
  { day: '29', month: 'MAY', year: '2027', title: 'Día de Canarias: Los Sabandeños', place: 'Plaza de España · Santa Cruz de Tenerife', kind: 'Concierto al aire libre' },
  { day: '17', month: 'JUL', year: '2027', title: 'Taburiente: 50 años y más', place: 'Teatro Circo de Marte · Santa Cruz de La Palma', kind: 'Concierto' },
  { day: '11', month: 'SEP', year: '2027', title: 'Pedro Guerra, guitarra y voz', place: 'Teatro Leal · La Laguna', kind: 'Concierto acústico' },
  { day: '16', month: 'OCT', year: '2027', title: 'Encuentro de timple con Benito Cabrera', place: 'Casa-Museo del Timple · Teguise, Lanzarote', kind: 'Taller y concierto' },
  { day: '27', month: 'NOV', year: '2027', title: 'Efecto Pasillo en directo', place: 'Gran Canaria Arena · Las Palmas de Gran Canaria', kind: 'Concierto' },
];

export const words = [
  { word: 'guagua', type: 'Sustantivo', def: 'Autobús. En Canarias nadie dice «autobús» en la calle.' },
  { word: 'chacho', type: 'Interjección', def: 'Forma cariñosa de dirigirse a alguien o de expresar sorpresa.' },
  { word: 'papas', type: 'Sustantivo', def: 'Patatas. Las papas arrugadas con mojo son un plato típico.' },
  { word: 'millo', type: 'Sustantivo', def: 'Maíz. De ahí viene el gofio.' },
  { word: 'bubango', type: 'Sustantivo', def: 'Calabacín.' },
  { word: 'ustedes', type: 'Gramática', def: 'En Canarias se usa «ustedes» en lugar de «vosotros» también entre amigos.' },
];

export const islandName = (id: string) => islands.find((i) => i.id === id)?.nombre ?? id;
