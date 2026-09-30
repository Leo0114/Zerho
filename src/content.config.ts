import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import z from "zod";

/**
 * Una colección, tres fichas. El sitio no tiene más páginas que éstas: la
 * portada monta la destacada (`featured`) y `[slug]` monta las demás.
 *
 * Regla de reparto del contenido:
 *  · frontmatter → todo lo estructurado (cifras, listas, planos, galería)
 *  · cuerpo .md  → la narrativa editorial, que se renderiza como prosa
 */
const propiedades = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/propiedades",
  }),
  schema: ({ image }) =>
    z.object({
      /** Nombre comercial. Es el <h1> de la ficha. */
      title: z.string().min(2),
      /** Municipio / fraccionamiento. Se muestra bajo el título. */
      location: z.string(),
      /** Etapa comercial: "Preventa exclusiva", "En obra", "Entrega inmediata". */
      status: z.string().default("Preventa exclusiva"),
      /** Precio en unidades enteras; se formatea con Intl en el render. */
      price: z.number().int().positive(),
      currency: z.string().default("MXN"),

      /** Resumen de una o dos frases para tarjetas, hero y metadatos. */
      excerpt: z.string().min(20),

      /** Portada: hero de la ficha y cara de la tarjeta. */
      cover: image(),
      coverAlt: z.string().default(""),

      /**
       * Carpeta bajo `src/assets/` de la que la galería toma sus imágenes.
       * Ej. `images/gal/prueba`.
       */
      galleryDir: z.string(),

      /** Orden de aparición. La ficha con `featured: true` abre el sitio. */
      order: z.number().int().default(0),
      featured: z.boolean().default(false),
      available: z.boolean().default(true),

      /** Tres o cuatro cifras de cabecera, en el hero. */
      highlights: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .min(1),

      /** Ficha técnica completa. `icon` es opcional y decorativo. */
      specs: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            note: z.string().optional(),
            icon: z.string().optional(),
          }),
        )
        .default([]),

      /**
       * Lo que distingue a la casa y atrae la visita: alberca, jacuzzi,
       * terrazas, salas de juego… Se muestra como fichas breves con icono.
       */
      amenities: z
        .array(
          z.object({
            label: z.string(),
            value: z.string().optional(),
            icon: z.string().optional(),
          }),
        )
        .default([]),

      /** Especificación constructiva agrupada por familia. */
      construction: z
        .array(
          z.object({
            group: z.string(),
            items: z.array(z.object({ title: z.string(), body: z.string() })),
          }),
        )
        .default([]),

      /** Plantas arquitectónicas. Cada una se abre a pantalla completa. */
      plans: z
        .array(
          z.object({
            label: z.string(),
            caption: z.string().optional(),
            /** Superficie de la planta, p. ej. "252.08 m²". */
            area: z.string().optional(),
            /** Programa arquitectónico: se consulta bajo demanda. */
            spaces: z
              .array(
                z.object({ name: z.string(), area: z.string().optional() }),
              )
              .default([]),
            image: image(),
          }),
        )
        .default([]),

      /** Metadatos sociales opcionales; si faltan se derivan del contenido. */
      seo: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
        })
        .optional(),

      /**
       * Datos del fraccionamiento y entorno (opcional).
       * Se muestra en la pestaña "Residencia" del modal.
       */
      fractionment: z
        .object({
          name: z.string(),
          description: z.string().optional(),
          security: z.string().optional(),
          amenitiesShared: z.array(z.string()).default([]),
        })
        .optional(),

      /**
       * Esquema financiero detallado (opcional).
       * Se muestra en la pestaña "Precio" del modal.
       */
      financing: z
        .object({
          priceNote: z.string().optional(),
          downPayment: z.number().optional(),
          downPaymentNote: z.string().optional(),
          balanceTerms: z.string().optional(),
          deliveryMonths: z.number().optional(),
          conditions: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { propiedades };
