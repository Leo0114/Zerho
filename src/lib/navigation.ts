export interface NavItem {
  label: string;
  /** Id de la sección en la portada. */
  id: string;
}

export const HOME_SECTIONS: readonly NavItem[] = [
  { label: "Filosofía", id: "filosofia" },
  { label: "Compromiso", id: "promesa" },
  { label: "Servicios", id: "servicios" },
  { label: "Garantía", id: "garantia" },
  { label: "Trayectoria", id: "trayectoria" },
  { label: "Conócenos", id: "equipo" },
];

export const CONTACT_PATH = "/contact";

/** Raíz de las fichas de residencia: la destacada vive aquí, el resto debajo. */
export const PREVENTAS_PATH = "/preventas";

/** Páginas con ruta propia, tras las secciones de la portada. */
export const SITE_PAGES = [
  { label: "Preventas", path: PREVENTAS_PATH },
  { label: "Contacto", path: CONTACT_PATH },
] as const;

/** En la portada el ancla es local; desde otras páginas vuelve a la portada. */
export const sectionHref = (id: string, pathname: string) =>
  pathname === "/" ? `#${id}` : `/#${id}`;
