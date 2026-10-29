/**
 * Re-exporta el esquema de contacto desde components/contact/contact.schema
 * para mantener una única fuente de verdad en todo el proyecto.
 */
export {
  SERVICE_OPTIONS,
  contactSchema,
  footerContactSchema,
  getServiceLabel,
  type ContactFormData,
  type ContactFormData as ContactInput,
  type FooterContactData,
  type ServiceLabel,
} from "@/components/contact/contact.schema";
