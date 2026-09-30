/**
 * Descubrimiento de imágenes por carpeta.
 *
 * Vive en un módulo y no dentro del componente de galería porque la ficha las
 * necesita en dos sitios: el mosaico y los bloques de texto e imagen. Un solo
 * `import.meta.glob` evita que Vite mantenga dos grafos de assets idénticos.
 *
 * `eager: true` sólo trae los metadatos (ruta, ancho, alto) en build; los
 * archivos los sigue procesando `<Image>` bajo demanda.
 */
const MODULES = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}",
  { eager: true },
);

const CACHE = new Map<string, ImageMetadata[]>();

/** La portada de cada carpeta se llama `one.*` y abre siempre el mosaico. */
const isCover = (path: string) => /\/one\.[^/]+$/i.test(path);

/**
 * Imágenes de `src/assets/<dir>/`: primero la portada (`one.*`) y después el
 * resto por nombre de archivo, para que el orden sea estable entre builds y
 * controlable renombrando.
 */
export function getGalleryImages(dir: string): ImageMetadata[] {
  const normalized = dir.replace(/^\/+|\/+$/g, "");

  const cached = CACHE.get(normalized);
  if (cached) return cached;

  const images = Object.entries(MODULES)
    .filter(([path]) => path.includes(`/assets/${normalized}/`))
    .sort(
      ([a], [b]) => Number(isCover(b)) - Number(isCover(a)) || a.localeCompare(b),
    )
    .map(([, mod]) => mod.default);

  CACHE.set(normalized, images);
  return images;
}

/**
 * Una imagen al azar de la carpeta, distinta de `exclude` (normalmente la
 * portada, que ya abre la ficha). Las fichas se prerenderizan, así que el
 * azar se resuelve una vez por build: la página publicada es estable.
 */
export function pickRandomGalleryImage(
  dir: string,
  fallback: ImageMetadata,
  exclude?: ImageMetadata,
): ImageMetadata {
  const pool = getGalleryImages(dir).filter((img) => img.src !== exclude?.src);
  if (!pool.length) return fallback;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

/** Identificador estable y válido como selector CSS para una carpeta. */
export function galleryId(dir: string) {
  return `pswp-${dir.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "-")}`;
}
