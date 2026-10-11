import type { APIRoute } from "astro";
import { Resend } from "resend";
import { homeData } from "@/data/home";
import { contactSchema } from "@/lib/contact-schema";

export const prerender = false;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Variables de entorno:
 * - RESEND_API_KEY (obligatoria)
 * - CONTACT_TO     (por defecto, el correo de contacto de home.ts)
 * - CONTACT_FROM   (remitente verificado en Resend)
 */
export const POST: APIRoute = async ({ request }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Solicitud inválida." }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: "Revisa los campos del formulario." }, 400);
  }

  const { nickname, ...data } = parsed.data;
  // Bot: se le responde como si todo fuera bien y no se envía nada.
  if (nickname) return json({ ok: true });

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] Falta RESEND_API_KEY");
    return json({ error: "El formulario no está disponible ahora." }, 500);
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: import.meta.env.CONTACT_FROM ?? "Zerho <onboarding@resend.dev>",
    to: import.meta.env.CONTACT_TO ?? homeData.contact.email,
    replyTo: data.email,
    subject: `Nuevo proyecto · ${data.name}`,
    text: [
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      `Teléfono: ${data.phone || "—"}`,
      `Servicio: ${data.service}`,
      "",
      data.message,
    ].join("\n"),
  });

  if (error) {
    console.error("[contact] Resend:", error);
    return json({ error: "No pudimos enviar tu mensaje." }, 502);
  }

  return json({ ok: true });
};
