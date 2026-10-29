import type { APIRoute } from "astro";
import { Resend } from "resend";
import {
  contactSchema,
  footerContactSchema,
  getServiceLabel,
} from "@/components/contact/contact.schema";
import { EmailTemplate } from "@/components/contact/email-template";
import { renderToString } from "react-dom/server";
import React from "react";

export const prerender = false;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function parseEmailList(value: string | undefined, fallback: string[]): string[] {
  if (!value) return fallback;
  const addresses = value
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  return addresses.length > 0 ? addresses : fallback;
}

export const POST: APIRoute = async ({ request }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Solicitud inválida." }, 400);
  }

  // Comprobar si es formulario completo o sólo footer
  const isFooter =
    typeof payload === "object" &&
    payload !== null &&
    !("name" in payload) &&
    "email" in payload;

  const parsed = isFooter
    ? footerContactSchema.safeParse(payload)
    : contactSchema.safeParse(payload);

  if (!parsed.success) {
    return json({ error: "Revisa los campos del formulario." }, 400);
  }

  const { nickname, ...data } = parsed.data as {
    nickname?: string;
    email: string;
    name?: string;
    phone?: string;
    service?: string;
    message?: string;
  };

  // Bot honeypot: responder con éxito simulado
  if (nickname && nickname.trim().length > 0) {
    return json({ ok: true });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] Falta RESEND_API_KEY en variables de entorno.");
    return json({ error: "El servicio de correo no está configurado." }, 500);
  }

  const resend = new Resend(apiKey);

  const FROM_ADDRESS =
    import.meta.env.RESEND_FROM ??
    import.meta.env.CONTACT_FROM_EMAIL ??
    import.meta.env.CONTACT_FROM ??
    "Zerho <onboarding@resend.dev>";

  const TO_ADDRESSES = parseEmailList(
    import.meta.env.RESEND_TO ??
      import.meta.env.CONTACT_TO_EMAIL ??
      import.meta.env.CONTACT_TO,
    ["atrevino@zerho.mx"],
  );

  const serviceLabel = data.service ? getServiceLabel(data.service) : undefined;

  const html = renderToString(
    React.createElement(EmailTemplate, {
      data: {
        ...data,
        source: isFooter ? "footer" : "contact",
      },
      serviceLabel,
    }),
  );

  const subject = isFooter
    ? `Nuevo contacto desde pie de página — ${data.email} | Zerho`
    : `Nuevo proyecto (${serviceLabel}) — ${data.name} | Zerho`;

  const plainText = isFooter
    ? [
        "Un prospecto ha dejado su correo en el pie de página de zerho.mx:",
        `Correo: ${data.email}`,
      ].join("\n")
    : [
        `Nombre: ${data.name}`,
        `Correo: ${data.email}`,
        `Teléfono: ${data.phone || "—"}`,
        `Servicio: ${serviceLabel}`,
        "",
        "Mensaje del cliente:",
        data.message,
      ].join("\n");

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESSES,
    replyTo: data.email,
    subject,
    html,
    text: plainText,
  });

  if (error) {
    console.error("[contact] Error de Resend:", error);
    return json({ error: "No pudimos enviar tu mensaje." }, 502);
  }

  return json({ ok: true });
};
