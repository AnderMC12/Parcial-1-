/**
 * Forma de la respuesta de REST Countries v3.1.
 *
 * Solo se declaran los campos que la aplicación pide con el parámetro
 * `fields`. Casi todos son opcionales a propósito: la API omite claves enteras
 * en territorios sin capital, sin idiomas o sin moneda, y declararlos como
 * obligatorios haría que TypeScript nos diera una confianza que los datos no
 * respaldan.
 *
 * Importante: una interfaz describe lo que *esperamos*, no comprueba lo que
 * *llega*. La validación en tiempo de ejecución está en `src/api/countries.ts`.
 */
export interface RawCountry {
  name?: {
    common?: string;
    official?: string;
  };
  translations?: Record<string, { common?: string; official?: string } | undefined>;
  flags?: {
    png?: string;
    svg?: string;
    alt?: string;
  };
  population?: number;
  region?: string;
  subregion?: string;
  capital?: string[];
  /** Diccionario de código de idioma a nombre: `{ spa: "Spanish" }`. */
  languages?: Record<string, string>;
  /** Diccionario de código de moneda a datos: `{ USD: { name: "..." } }`. */
  currencies?: Record<string, { name?: string; symbol?: string } | undefined>;
  cca3?: string;
  borders?: string[];
}
