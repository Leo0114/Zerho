/**
 * Rejillas sin huecos.
 *
 * Cuando el número de piezas no llena la última fila, el hueco se lee como
 * "falta una" (y en las rejillas con filete, además, se ve como un bloque de
 * color vacío). La última pieza se ensancha lo justo para cerrar la fila en
 * cada punto de corte.
 *
 * Las clases van escritas enteras —nunca interpoladas— para que Tailwind las
 * encuentre al compilar.
 */

type Breakpoint = "base" | "sm" | "lg";

/** Columnas de la rejilla en cada punto de corte (hereda del anterior). */
export type GridColumns = Partial<Record<Breakpoint, 1 | 2 | 3 | 4 | 5>>;

const SPAN: Record<Breakpoint, Record<number, string>> = {
  base: { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4", 5: "col-span-5" },
  sm: { 1: "sm:col-span-1", 2: "sm:col-span-2", 3: "sm:col-span-3", 4: "sm:col-span-4", 5: "sm:col-span-5" },
  lg: { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4", 5: "lg:col-span-5" },
};

const BREAKPOINTS: Breakpoint[] = ["base", "sm", "lg"];

/** Clases para la última pieza de una rejilla de `count` elementos. */
export function lastItemSpan(count: number, columns: GridColumns): string {
  const classes: string[] = [];
  let cols = 1;
  let previousSpan = 1;

  for (const bp of BREAKPOINTS) {
    cols = columns[bp] ?? cols;
    const remainder = count % cols;
    const span = remainder === 0 ? 1 : cols - remainder + 1;

    // Sólo se emite la clase cuando cambia respecto al punto de corte previo.
    if (span !== previousSpan) classes.push(SPAN[bp][span]!);
    previousSpan = span;
  }

  return classes.join(" ");
}
