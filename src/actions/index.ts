import { ActionError, defineAction } from "astro:actions";
import { Resend } from "resend";
import {
  contactSchema,
  footerContactSchema,
  getServiceLabel,
} from "@/components/contact/contact.schema";
import { EmailTemplate } from "@/components/contact/email-template";
import { renderToString } from "react-dom/server";
import React from "react";

const DEFAULT_TO_ADDRESSES = ["atrevino@zerho.mx"];

function parseEmailList(
  value: string | undefined,
  fallback: string[],
): string[] {
  if (!value) return fallback;

  const addresses = value
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  return addresses.length > 0 ? addresses : fallback;
}

function getResendClient() {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[actions] RESEND_API_KEY no está configurada en las variables de entorno.",
    );
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "El servicio de correo no está configurado en el servidor.",
    });
  }
  return new Resend(apiKey);
}

function getEmailConfig() {
  const FROM_ADDRESS =
    import.meta.env.RESEND_FROM ??
    import.meta.env.CONTACT_FROM_EMAIL ??
    "Zerho <onboarding@resend.dev>";

  const TO_ADDRESSES = parseEmailList(
    import.meta.env.RESEND_TO ?? import.meta.env.CONTACT_TO_EMAIL,
    DEFAULT_TO_ADDRESSES,
  );

  return { FROM_ADDRESS, TO_ADDRESSES };
}

export const server = {
  /** Acción principal: formulario de contacto completo (/contact). */
  send: defineAction({
    accept: "json",
    input: contactSchema,
    handler: async (data) => {
      // Detección de bots por honeypot
      if (data.nickname && data.nickname.trim().length > 0) {
        return { success: true, id: "honeypot" };
      }

      const resend = getResendClient();
      const { FROM_ADDRESS, TO_ADDRESSES } = getEmailConfig();
      const serviceLabel = getServiceLabel(data.service);

      const html = renderToString(
        React.createElement(EmailTemplate, {
          data: {
            ...data,
            source: "contact",
          },
          serviceLabel,
        }),
      );

      const subject = `Nuevo proyecto (${serviceLabel}) — ${data.name} | Zerho`;

      const plainText = [
        `Nombre: ${data.name}`,
        `Correo: ${data.email}`,
        `Teléfono: ${data.phone || "—"}`,
        `Servicio de interés: ${serviceLabel}`,
        "",
        "Mensaje del cliente:",
        data.message,
      ].join("\n");

      const { data: resendData, error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESSES,
        replyTo: data.email,
        subject,
        html,
        text: plainText,
      });

      if (error) {
        console.error("[actions.send] Error de entrega Resend:", error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "No se pudo entregar el mensaje.",
        });
      }

      return { success: true, id: resendData?.id };
    },
  }),

  /** Acción rápida: formulario de sólo correo en el pie de página (Footer). */
  sendFooter: defineAction({
    accept: "json",
    input: footerContactSchema,
    handler: async (data) => {
      // Detección de bots
      if (data.nickname && data.nickname.trim().length > 0) {
        return { success: true, id: "honeypot" };
      }

      const resend = getResendClient();
      const { FROM_ADDRESS, TO_ADDRESSES } = getEmailConfig();

      const html = renderToString(
        React.createElement(EmailTemplate, {
          data: {
            email: data.email,
            source: "footer",
          },
        }),
      );

      const subject = `Nuevo contacto desde pie de página — ${data.email} | Zerho`;

      const plainText = [
        "Un prospecto ha dejado su correo en el pie de página de zerho.mx:",
        `Correo: ${data.email}`,
      ].join("\n");

      const { data: resendData, error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESSES,
        replyTo: data.email,
        subject,
        html,
        text: plainText,
      });

      if (error) {
        console.error("[actions.sendFooter] Error de entrega Resend:", error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "No se pudo entregar el mensaje.",
        });
      }

      return { success: true, id: resendData?.id };
    },
  }),
};
