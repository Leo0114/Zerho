# Zerho — Arquitectura Extraordinaria

Un solo sitio para dos frentes de la misma marca. Monolingüe (`es-MX`).

| Frente        | Rutas                              | Layout            | Estilos               |
| ------------- | ---------------------------------- | ----------------- | --------------------- |
| **Estudio**   | `/`, `/contact`                    | `HomeLayout`      | `styles/newIndex.css` |
| **Preventas** | `/preventas`, `/preventas/[slug]`  | `PreventasLayout` | `styles/global.css`   |

Cada frente conserva su propio sistema de diseño. Varios tokens comparten
nombre con valores distintos (`--color-accent`, `--color-canvas`,
`--font-display`…), así que **cada layout importa una sola hoja** y nunca se
mezclan: Astro empaqueta el CSS por página y el `ClientRouter` cambia las hojas
al navegar entre un frente y otro. No importar `global.css` desde el estudio ni
`newIndex.css` desde las preventas.

## Cómo está organizado

```text
src/
├── content/propiedades/        # las fichas. Una propiedad = un .md
├── content.config.ts           # esquema Zod de la colección `propiedades`
├── data/
│   ├── site.ts                 # marca, contacto, redes (SOCIAL_LINKS), compromisos
│   └── home.ts                 # textos de la portada y de contacto
├── lib/
│   ├── navigation.ts           # rutas (PREVENTAS_PATH, CONTACT_PATH) y secciones del home
│   ├── properties.ts           # acceso a la colección, URLs canónicas, precios
│   └── gallery.ts              # descubrimiento de imágenes por carpeta
├── assets/
│   ├── homeAssets/             # imágenes del estudio
│   └── images/                 # imágenes de las preventas
├── components/
│   ├── home/ · contact/        # secciones del estudio
│   ├── homeShared/             # Navbar, Footer, SmoothScroll y ui/ del estudio
│   ├── property/PropertyView   # el único montaje de ficha
│   ├── shared/                 # piezas de las preventas (+ ScrollReveal, común)
│   └── ui/                     # Button, Icon, Modal de las preventas
├── layouts/
│   ├── BaseHead.astro          # <head> común: SEO, favicon, ClientRouter
│   ├── HomeLayout.astro
│   └── PreventasLayout.astro
├── styles/                     # una hoja por frente (ver tabla)
└── pages/                      # index · contact · preventas/ · api/contact · 404
```

Los scripts de componente sobreviven a las navegaciones del `ClientRouter`:
si un script sólo debe actuar en un frente, que compruebe un elemento propio de
ese frente (ver `SmoothScroll.astro`, o los ids `#site-header` /
`#preventas-header`).

El formulario de contacto (`/api/contact`) necesita `RESEND_API_KEY` y, de
forma opcional, `CONTACT_TO` y `CONTACT_FROM`.

## Añadir o editar una propiedad

1. Crear un `.md` en `src/content/propiedades/`. El nombre del archivo es el
   slug (`balcones-del-campestre.md` → `/preventas/balcones-del-campestre`).
2. Rellenar el frontmatter siguiendo el esquema de `src/content.config.ts`. El
   esquema es estricto: si falta un campo o cambia un tipo, la build falla con
   el error señalado.
3. El **cuerpo del `.md`** es la narrativa editorial y se renderiza como prosa.
   Todo lo estructurado (cifras, listas, planos) va en el frontmatter.

### Reglas de contenido

- **Exactamente una** ficha lleva `featured: true`. Esa abre `/preventas` y **no**
  se publica además bajo su slug: una sola URL canónica por residencia. Si hay
  cero o más de una, la build se detiene con un mensaje explícito.
- `order` define el orden en cabecera, pie y bloque de "otras residencias".
- `galleryDir` apunta a una carpeta bajo `src/assets/`. Añadir una foto a esa
  carpeta la publica en la galería: no hay que tocar el `.md`.
- En YAML, un valor sin comillas **no puede contener `: `**. Entrecomillar o
  reescribir con raya (`—`).

## Sistema de diseño

Preventas: todo el color, la tipografía, la elevación y el ritmo viven en `@theme` dentro
de `src/styles/global.css`. Ningún componente escribe un hex: consumen tokens
(`bg-primary`, `text-accent-deep`, `rounded-panel`, `shadow-e2`, `type-title`).

Paleta Pantone de marca:

| Pantone      | Hex       | Token                 | Uso                       |
| ------------ | --------- | --------------------- | ------------------------- |
| 553 C        | `#333A30` | `primary`             | Secciones estructurales   |
| Black 7 C    | `#2B2A26` | `ink`                 | Tipografía                |
| Black 6 C    | `#000000` | `base-black`          | Velos y visor             |
| 465 C        | `#93774A` | `accent`              | Acento                    |
| Warm Gray 2C | `#C2B6AA` | `sand`                | Texto secundario oscuro   |
| Cool Gray 1C | `#E9E1D1` | `canvas` / `bone`     | Lienzo                    |

`accent-deep` y `accent-light` son matices del 465 C para que el acento cumpla
contraste AA en texto pequeño sobre fondo claro y sobre fondo verde.

## Movimiento

Lo que se puede agarrar con el dedo se anima con muelles en JS
(`src/scripts/indicator.ts`), no con transiciones CSS: un muelle re-apunta desde
la posición y la velocidad actuales, una transición reinicia y salta. Lo que no
es interrumpible (hover, revelado al scroll) usa curvas CSS.

El sitio responde a `prefers-reduced-motion`, `prefers-reduced-transparency` y
`prefers-contrast`.

## Comandos

| Comando         | Acción                                  |
| --------------- | --------------------------------------- |
| `npm run dev`   | Servidor local en `localhost:4321`      |
| `npm run build` | Build de producción en `./dist/`        |
| `npm run preview` | Previsualiza el build                 |
| `npx @astrojs/check` | Comprobación de tipos              |

## Pendiente

- Logotipo definitivo: la cabecera y el pie usan un monograma provisional.
- Datos de contacto reales en `src/data/site.ts` (marcados con `TODO`).
- Fotografía propia y planos definitivos (ahora se reutiliza
  `src/assets/images/gal/prueba/`).
- Confirmar los datos comerciales de `sierra-alta-24.md`, que es una ficha de
  demostración.
