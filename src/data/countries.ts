/**
 * Datos estáticos. El proyecto no consume ninguna API: este archivo es la
 * única fuente de datos y se empaqueta junto con el sitio en tiempo de build.
 */

export type Region =
  | 'África'
  | 'América'
  | 'Asia'
  | 'Europa'
  | 'Oceanía';

export interface Country {
  /** Código ISO 3166-1 alpha-3, usado como identificador en la URL. */
  code: string;
  name: string;
  capital: string;
  region: Region;
  subregion: string;
  population: number;
  languages: string[];
  currency: string;
  /** Códigos de países fronterizos. Vacío para islas. */
  borders: string[];
  /**
   * Código ISO 3166-1 alpha-2. Se muestra como distintivo del país en lugar
   * del emoji de bandera, que no se dibuja en Windows y deja ver las letras
   * indicadoras en crudo. Así el resultado es idéntico en todos los sistemas.
   */
  iso2: string;
}

export const REGIONS: Region[] = [
  'África',
  'América',
  'Asia',
  'Europa',
  'Oceanía',
];

export const COUNTRIES: Country[] = [
  {
    code: 'ARG',
    name: 'Argentina',
    capital: 'Buenos Aires',
    region: 'América',
    subregion: 'América del Sur',
    population: 45376763,
    languages: ['Español'],
    currency: 'Peso argentino',
    borders: ['CHL', 'BRA', 'URY', 'PRY', 'BOL'],
    iso2: 'AR',
  },
  {
    code: 'DZA',
    name: 'Argelia',
    capital: 'Argel',
    region: 'África',
    subregion: 'África del Norte',
    population: 44700000,
    languages: ['Árabe', 'Bereber'],
    currency: 'Dinar argelino',
    borders: ['MAR', 'TUN'],
    iso2: 'DZ',
  },
  {
    code: 'ARM',
    name: 'Armenia',
    capital: 'Ereván',
    region: 'Asia',
    subregion: 'Asia Occidental',
    population: 2963000,
    languages: ['Armenio'],
    currency: 'Dram armenio',
    borders: ['GEO', 'TUR'],
    iso2: 'AM',
  },
  {
    code: 'CAN',
    name: 'Canadá',
    capital: 'Ottawa',
    region: 'América',
    subregion: 'América del Norte',
    population: 38005238,
    languages: ['Inglés', 'Francés'],
    currency: 'Dólar canadiense',
    borders: ['USA'],
    iso2: 'CA',
  },
  {
    code: 'JPN',
    name: 'Japón',
    capital: 'Tokio',
    region: 'Asia',
    subregion: 'Asia Oriental',
    population: 125836021,
    languages: ['Japonés'],
    currency: 'Yen japonés',
    borders: [],
    iso2: 'JP',
  },
  {
    code: 'FRA',
    name: 'Francia',
    capital: 'París',
    region: 'Europa',
    subregion: 'Europa Occidental',
    population: 67391582,
    languages: ['Francés'],
    currency: 'Euro',
    borders: ['ESP', 'DEU', 'ITA', 'BEL', 'CHE'],
    iso2: 'FR',
  },
  {
    code: 'AUS',
    name: 'Australia',
    capital: 'Canberra',
    region: 'Oceanía',
    subregion: 'Australia y Nueva Zelanda',
    population: 25687041,
    languages: ['Inglés'],
    currency: 'Dólar australiano',
    borders: [],
    iso2: 'AU',
  },
  {
    code: 'SLV',
    name: 'El Salvador',
    capital: 'San Salvador',
    region: 'América',
    subregion: 'América Central',
    population: 6486201,
    languages: ['Español'],
    currency: 'Dólar estadounidense',
    borders: ['GTM', 'HND'],
    iso2: 'SV',
  },
  {
    code: 'ESP',
    name: 'España',
    capital: 'Madrid',
    region: 'Europa',
    subregion: 'Europa del Sur',
    population: 47351567,
    languages: ['Español'],
    currency: 'Euro',
    borders: ['FRA', 'PRT', 'AND'],
    iso2: 'ES',
  },
  {
    code: 'BRA',
    name: 'Brasil',
    capital: 'Brasilia',
    region: 'América',
    subregion: 'América del Sur',
    population: 212559417,
    languages: ['Portugués'],
    currency: 'Real brasileño',
    borders: ['ARG', 'URY', 'PRY', 'BOL', 'CHL'],
    iso2: 'BR',
  },
  {
    code: 'CHL',
    name: 'Chile',
    capital: 'Santiago',
    region: 'América',
    subregion: 'América del Sur',
    population: 19116201,
    languages: ['Español'],
    currency: 'Peso chileno',
    borders: ['ARG', 'BOL', 'PER'],
    iso2: 'CL',
  },
  {
    code: 'URY',
    name: 'Uruguay',
    capital: 'Montevideo',
    region: 'América',
    subregion: 'América del Sur',
    population: 3473727,
    languages: ['Español'],
    currency: 'Peso uruguayo',
    borders: ['ARG', 'BRA'],
    iso2: 'UY',
  },
  {
    code: 'PRY',
    name: 'Paraguay',
    capital: 'Asunción',
    region: 'América',
    subregion: 'América del Sur',
    population: 7132538,
    languages: ['Español', 'Guaraní'],
    currency: 'Guaraní',
    borders: ['ARG', 'BRA', 'BOL'],
    iso2: 'PY',
  },
  {
    code: 'BOL',
    name: 'Bolivia',
    capital: 'Sucre',
    region: 'América',
    subregion: 'América del Sur',
    population: 11673021,
    languages: ['Español', 'Quechua', 'Aimara'],
    currency: 'Boliviano',
    borders: ['ARG', 'BRA', 'CHL', 'PRY', 'PER'],
    iso2: 'BO',
  },
  {
    code: 'DEU',
    name: 'Alemania',
    capital: 'Berlín',
    region: 'Europa',
    subregion: 'Europa Central',
    population: 83240525,
    languages: ['Alemán'],
    currency: 'Euro',
    borders: ['FRA', 'POL', 'AUT', 'CHE', 'BEL'],
    iso2: 'DE',
  },
  {
    code: 'MAR',
    name: 'Marruecos',
    capital: 'Rabat',
    region: 'África',
    subregion: 'África del Norte',
    population: 36910560,
    languages: ['Árabe', 'Bereber'],
    currency: 'Dírham marroquí',
    borders: ['DZA', 'ESP'],
    iso2: 'MA',
  },
  {
    code: 'NZL',
    name: 'Nueva Zelanda',
    capital: 'Wellington',
    region: 'Oceanía',
    subregion: 'Australia y Nueva Zelanda',
    population: 5084300,
    languages: ['Inglés', 'Maorí'],
    currency: 'Dólar neozelandés',
    borders: [],
    iso2: 'NZ',
  },
  {
    code: 'KEN',
    name: 'Kenia',
    capital: 'Nairobi',
    region: 'África',
    subregion: 'África Oriental',
    population: 53771300,
    languages: ['Suajili', 'Inglés'],
    currency: 'Chelín keniano',
    borders: ['TZA', 'UGA', 'ETH'],
    iso2: 'KE',
  },
];

/** Países que se muestran en la portada. */
export const FEATURED_CODES = ['CAN', 'JPN', 'FRA', 'AUS'];

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code.toUpperCase());
}

export function getCountryByName(name: string): Country | undefined {
  const target = normalize(name);
  return COUNTRIES.find((c) => normalize(c.name) === target);
}

/** Quita acentos y pasa a minúsculas para que "argent" encuentre "Argentina". */
export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export interface SearchOptions {
  query?: string;
  region?: string;
}

export function searchCountries({ query = '', region = '' }: SearchOptions): Country[] {
  const q = normalize(query);
  return COUNTRIES.filter((country) => {
    const matchesRegion = !region || country.region === region;
    const matchesQuery = !q || normalize(country.name).includes(q);
    return matchesRegion && matchesQuery;
  }).sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

export function formatPopulation(value: number): string {
  return new Intl.NumberFormat('es-ES').format(value);
}
