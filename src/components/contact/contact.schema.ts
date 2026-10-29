/**
 * Esquema de contacto para Zerho.
 *
 * Fuente única de validación compartida entre:
 * - El formulario principal de `/contact` (nombre, correo, teléfono, servicio, mensaje)
 * - El formulario del footer (sólo correo → se envía al formulario completo)
 * - La acción del servidor / endpoint de la API
 *
 * Los mensajes de error están en español porque el sitio es monolingüe (es-MX).
 */
import { z } from "zod";
import { homeData } from "@/data/home";
import { splitIndexedTitle } from "@/lib/format";

/** Opciones de servicio derivadas dinámicamente de los datos de home. */
export const SERVICE_OPTIONS = homeData.services.map(
  (service) => splitIndexedTitle(service.title).label,
);

export type ServiceLabel = (typeof SERVICE_OPTIONS)[number];

/** Etiqueta legible para el asunto del correo. */
export function getServiceLabel(value?: string): string {
  if (!value) return "General";
  return value;
}

/** Schema completo: formulario principal de /contact. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre."),
  email: z.email("Revisa el formato del correo."),
  phone: z
    .string()
    .trim()
    .max(30, "Teléfono demasiado largo.")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Elige el servicio que te interesa."),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(2000, "Máximo 2000 caracteres."),
  /** Campo trampa: invisible para personas, los bots lo rellenan. */
  nickname: z.string().max(200).optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/** Schema reducido: formulario de sólo-correo del footer. */
export const footerContactSchema = z.object({
  email: z.email("Revisa el formato del correo."),
  /** Campo trampa. */
  nickname: z.string().max(200).optional().or(z.literal("")),
});

export type FooterContactData = z.infer<typeof footerContactSchema>;
