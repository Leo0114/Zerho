import placeholder from "@/assets/homeAssets/placeholder.jpeg";

/**
 * Un único punto para las imágenes del sitio. Mientras llegan las fotografías
 * definitivas todo apunta al placeholder: basta con cambiar el import aquí.
 */
export const images = {
  hero: placeholder,
  promise: placeholder,
  services: [placeholder, placeholder],
  contactCta: placeholder,
  contactHero: placeholder,
} as const;

export const IMAGE_ALT = "Residencia contemporánea diseñada por Zerho";
