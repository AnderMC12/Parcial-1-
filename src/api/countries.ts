import type { Country, Region } from '../types/country';
import type { RawCountry } from '../types/rest-countries';

/**
 * Fuente de datos.
 *
 * Se usa un archivo JSON servido junto con la aplicación, por un motivo
 * concreto: REST Countries retiró las versiones v1 a v4 de su API. El endpoint
 * `https://restcountries.com/v3.1/all` ya no devuelve países, sino un error de
 * versión obsoleta, y como esa respuesta llega sin cabeceras CORS el navegador
 * la reporta como fallo de CORS. La versión v5 sigue disponible, pero exige una
 * clave de acceso que en un sitio estático quedaría expuesta en el código
 * público.
 *
 * El enunciado del laboratorio contempla este caso: se conserva la petición
 * mediante `fetch`, el tipado y el manejo de errores, y solo cambia de dónde se
 * leen los datos. El archivo vive en `public/countries.json` y Vite lo publica
 * en la raíz del sitio.
 *
 * Para cambiar de fuente basta con reemplazar esta constante por una URL
 * absoluta; el resto del módulo no cambia. Por ejemplo, con una clave de v5:
 * `https://api.restcountries.com/v5/countries?api-key=TU_CLAVE`.
 */
export const DATA_SOURCE = './countries.json';

/** Milisegundos antes de abandonar la petición. */
const TIMEOUT_MS = 10_000;

/** Qué falló exactamente. Permite mostrar un mensaje útil en vez de uno genérico. */
export type CountriesErrorKind = 'red' | 'respuesta' | 'formato';

/**
 * Error propio de esta capa. Separa el motivo técnico (`kind`) del texto que
 * se muestra, de modo que la capa de renderizado no tenga que interpretar
 * mensajes de error ajenos.
 */
export class CountriesError extends Error {
  readonly kind: CountriesErrorKind;

  constructor(kind: CountriesErrorKind, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'CountriesError';
    this.kind = kind;
  }
}

/** Traducción de la región que devuelve la API a la que muestra la interfaz. */
const REGION_ES: Readonly<Record<string, Region>> = {
  Africa: 'África',
  Americas: 'América',
  Antarctic: 'Antártida',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
};

/**
 * Comprueba en tiempo de ejecución que un elemento de la respuesta tenga lo
 * mínimo imprescindible para construir una tarjeta: un código que lo
 * identifique y un nombre que mostrar. Todo lo demás se resuelve con valores
 * por defecto en `toCountry`.
 *
 * Una anotación de tipo no haría este trabajo: `as RawCountry[]` solo silencia
 * al compilador y deja pasar cualquier cosa que llegue por la red.
 */
function isRawCountry(value: unknown): value is RawCountry {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as RawCountry;
  const hasCode = typeof candidate.cca3 === 'string' && candidate.cca3.length > 0;
  const hasName = typeof candidate.name?.common === 'string' && candidate.name.common.length > 0;
  return hasCode && hasName;
}

/** Convierte un elemento validado de la API al modelo de dominio. */
function toCountry(raw: RawCountry): Country {
  const spanish = raw.translations?.['spa']?.common;

  const currencies = Object.values(raw.currencies ?? {})
    .map((currency) => currency?.name)
    .filter((name): name is string => typeof name === 'string' && name.length > 0);

  return {
    // `isRawCountry` ya garantizó que estos dos campos existen.
    code: raw.cca3 as string,
    name: spanish ?? (raw.name?.common as string),
    flagUrl: raw.flags?.svg ?? raw.flags?.png ?? '',
    flagAlt: raw.flags?.alt ?? null,
    population: typeof raw.population === 'number' ? raw.population : 0,
    region: REGION_ES[raw.region ?? ''] ?? 'Sin región',
    subregion: raw.subregion && raw.subregion.length > 0 ? raw.subregion : null,
    capital: raw.capital ?? [],
    languages: Object.values(raw.languages ?? {}),
    currencies,
    borders: raw.borders ?? [],
  };
}

/**
 * Obtiene la lista de países.
 *
 * El retorno explícito `Promise<Country[]>` obliga a que cualquier cambio en
 * el mapeo se detecte al compilar y no en el navegador.
 *
 * @throws {CountriesError} si falla la red, si el servidor responde con un
 * código de error o si el cuerpo no tiene la forma esperada.
 */
export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
  let response: Response;

  try {
    response = await fetch(DATA_SOURCE, {
      signal: signal ?? AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: 'application/json' },
    });
  } catch (cause) {
    throw new CountriesError(
      'red',
      'No se pudo conectar con el servicio de países. Revisa tu conexión a internet.',
      { cause },
    );
  }

  if (!response.ok) {
    throw new CountriesError(
      'respuesta',
      `El servicio de países respondió con el código ${response.status}.`,
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new CountriesError('formato', 'La respuesta recibida no es un JSON válido.', { cause });
  }

  if (!Array.isArray(payload)) {
    throw new CountriesError('formato', 'Se esperaba una lista de países y se recibió otra cosa.');
  }

  const countries = payload.filter(isRawCountry).map(toCountry);

  if (countries.length === 0) {
    throw new CountriesError(
      'formato',
      'La respuesta no contiene ningún país con la estructura esperada.',
    );
  }

  return countries.sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

/**
 * Devuelve un país por su código alpha-3, o `undefined` si no existe.
 * Reutiliza `fetchCountries` para no duplicar la validación ni el mapeo.
 */
export async function fetchCountryByCode(
  code: string,
  signal?: AbortSignal,
): Promise<Country | undefined> {
  const countries = await fetchCountries(signal);
  const target = code.trim().toUpperCase();
  return countries.find((country) => country.code === target);
}
