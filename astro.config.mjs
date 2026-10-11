// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import icon from "astro-icon";

// El sitio es monolingüe (es-MX) y une dos frentes de la misma marca: el
// estudio (`/`, `/contact`) y las preventas (`/preventas` monta la residencia
// destacada y `/preventas/[slug]` el resto).
export default defineConfig({
  site: "https://zerho.mx",

  // Direcciones publicadas antes de la unión, cuando las fichas colgaban de
  // la raíz. La destacada vivía en `/`, que ahora es la portada del estudio.
  redirects: {
    "/encinos-11": "/preventas/encinos-11",
    "/balcones-del-campestre": "/preventas/balcones-del-campestre",
  },

  output: "server",
  adapter: netlify({
    imageCDN: false,
  }),

  integrations: [react(), icon(), robotsTxt(), sitemap()],

  image: {
    // Las fichas viven de la fotografía: conviene servir formatos modernos.
    responsiveStyles: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
