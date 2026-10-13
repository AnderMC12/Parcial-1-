/**
 * Modelo de dominio de la aplicación.
 *
 * Es deliberadamente distinto de la forma en que la API devuelve los datos
 * (ver `rest-countries.ts`): la interfaz de usuario trabaja con una estructura
 * plana y sin valores nulos, y la traducción entre ambas vive en `src/api`.
 * Así, si la fuente de datos cambia, solo se toca la capa de API.
 */
export interface Country {
  /** Código ISO 3166-1 alpha-3. Identificador estable del país. */
  readonly code: string;
  /** Nombre en español cuando la fuente lo ofrece; si no, el nombre común. */
  readonly name: string;
  /** URL de la imagen de la bandera. */
  readonly flagUrl: string;
  /**
   * Texto alternativo de la bandera. La fuente no siempre lo incluye, por eso
   * puede ser `null`: quien renderiza decide cómo resolverlo.
   */
  readonly flagAlt: string | null;
  readonly population: number;
  readonly region: Region;
  /** La subregión no existe para todos los territorios. */
  readonly subregion: string | null;
  /** Hay territorios sin capital registrada, por eso puede quedar vacío. */
  readonly capital: readonly string[];
  readonly languages: readonly string[];
  readonly currencies: readonly string[];
  /** Códigos alpha-3 de los países fronterizos. Vacío en islas. */
  readonly borders: readonly string[];
}

/** Regiones tal como se muestran en la interfaz, ya traducidas al español. */
export type Region =
  | 'África'
  | 'América'
  | 'Antártida'
  | 'Asia'
  | 'Europa'
  | 'Oceanía'
  | 'Sin región';

/** Criterios activos de búsqueda. Ambos se aplican de forma combinada. */
export interface CountryFilters {
  /** Texto escrito por la persona usuaria. Cadena vacía significa «sin filtro». */
  readonly query: string;
  /** Región seleccionada. Cadena vacía significa «todas las regiones». */
  readonly region: string;
}
