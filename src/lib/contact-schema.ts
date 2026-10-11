import { z } from "zod";
import { homeData } from "@/data/home";
import { splitIndexedTitle } from "./format";

export const SERVICE_OPTIONS = homeData.services.map(
  (service) => splitIndexedTitle(service.title).label,
);

/** Compartido por el formulario (validación en línea) y el endpoint. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre."),
  email: z.email("Revisa el formato del correo."),
  phone: z.string().trim().max(30, "Teléfono demasiado largo."),
  service: z.string().min(1, "Elige el servicio que te interesa."),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(2000, "Máximo 2000 caracteres."),
  /** Campo trampa: invisible para personas, los bots lo rellenan. */
  nickname: z.string().max(200),
});

export type ContactInput = z.infer<typeof contactSchema>;
