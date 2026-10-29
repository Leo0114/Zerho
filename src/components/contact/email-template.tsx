import * as React from "react";

export interface EmailData {
  name?: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: "contact" | "footer";
}

interface EmailTemplateProps {
  data: EmailData;
  serviceLabel?: string;
}

/**
 * Paleta de marca Zerho Arquitectura (San Pedro Garza García, N.L.)
 * Pantone 553 C (#333A30), Black 7 C (#2B2A26), 465 C Bronce (#93774A), Hueso (#E9E1D1)
 */
const BRAND = {
  primary: "#333a30", // Verde profundo distintivo
  primaryDark: "#232821",
  primaryDeep: "#1a1e18",
  ink: "#2b2a26", // Negro cálido tipográfico
  inkMuted: "#4a463e",
  accent: "#93774a", // Bronce característico
  accentLight: "#c9a670",
  accentSoft: "#f7f3eb",
  canvas: "#f4efe6", // Hueso suave
  surface: "#ffffff",
  surfaceAlt: "#faf7f2",
  border: "#e6decb",
  borderLight: "#eee8dc",
  muted: "#736e63",
} as const;

const s = {
  wrapper: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: BRAND.canvas,
    padding: "40px 16px",
    margin: 0,
    WebkitTextSizeAdjust: "100%",
  } as React.CSSProperties,

  card: {
    maxWidth: 600,
    margin: "0 auto",
    backgroundColor: BRAND.surface,
    borderRadius: 20,
    overflow: "hidden",
    boxShadow:
      "0 20px 40px -15px rgba(43, 42, 38, 0.12), 0 2px 6px rgba(43, 42, 38, 0.04)",
    border: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,

  header: {
    backgroundColor: BRAND.primary,
    background: `linear-gradient(145deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
    padding: "36px 36px 32px",
    color: "#ffffff",
    textAlign: "left" as const,
  } as React.CSSProperties,

  logoBadge: {
    display: "inline-block",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
    padding: "4px 14px",
    color: BRAND.accentLight,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    marginBottom: 16,
  } as React.CSSProperties,

  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: 600,
    margin: 0,
    letterSpacing: "-0.02em",
    lineHeight: 1.25,
  } as React.CSSProperties,

  headerSubtitle: {
    color: "rgba(233, 225, 209, 0.85)",
    fontSize: 13,
    margin: "8px 0 0",
    lineHeight: 1.5,
  } as React.CSSProperties,

  body: {
    padding: "32px 36px",
  } as React.CSSProperties,

  greeting: {
    fontSize: 15,
    color: BRAND.inkMuted,
    marginTop: 0,
    marginBottom: 24,
    lineHeight: 1.6,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: BRAND.accent,
    margin: "0 0 14px",
  } as React.CSSProperties,

  tableGrid: {
    width: "100%",
    borderCollapse: "separate" as const,
    borderSpacing: "0 10px",
    marginBottom: 16,
  } as React.CSSProperties,

  fieldCell: {
    backgroundColor: BRAND.surfaceAlt,
    borderRadius: 12,
    padding: "14px 16px",
    border: `1px solid ${BRAND.borderLight}`,
  } as React.CSSProperties,

  fieldLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: BRAND.muted,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 4,
  } as React.CSSProperties,

  fieldValue: {
    fontSize: 14,
    color: BRAND.ink,
    fontWeight: 500,
    margin: 0,
    wordBreak: "break-word" as const,
  } as React.CSSProperties,

  badge: {
    display: "inline-block",
    backgroundColor: BRAND.accentSoft,
    color: BRAND.primary,
    border: `1px solid ${BRAND.accent}40`,
    borderRadius: 9999,
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.02em",
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: `1px solid ${BRAND.borderLight}`,
    margin: "24px 0",
  } as React.CSSProperties,

  messageBox: {
    backgroundColor: BRAND.accentSoft,
    borderLeft: `3px solid ${BRAND.accent}`,
    borderRadius: "0 12px 12px 0",
    padding: "18px 20px",
    marginBottom: 26,
  } as React.CSSProperties,

  messageText: {
    fontSize: 14,
    color: BRAND.ink,
    lineHeight: 1.7,
    margin: 0,
    whiteSpace: "pre-line" as const,
  } as React.CSSProperties,

  ctaWrapper: {
    textAlign: "center" as const,
    marginTop: 28,
    marginBottom: 8,
  } as React.CSSProperties,

  ctaButton: {
    display: "inline-block",
    backgroundColor: BRAND.primary,
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 13,
    padding: "13px 30px",
    borderRadius: 9999,
    textDecoration: "none",
    letterSpacing: "0.04em",
    boxShadow: "0 4px 14px rgba(51, 58, 48, 0.25)",
  } as React.CSSProperties,

  footer: {
    borderTop: `1px solid ${BRAND.borderLight}`,
    padding: "24px 36px",
    backgroundColor: BRAND.surfaceAlt,
    textAlign: "center" as const,
  } as React.CSSProperties,

  footerText: {
    fontSize: 12,
    color: BRAND.muted,
    margin: 0,
    lineHeight: 1.6,
  } as React.CSSProperties,
};

function FieldBox({
  label,
  value,
  badge = false,
  href,
}: {
  label: string;
  value: string;
  badge?: boolean;
  href?: string;
}) {
  return (
    <div style={s.fieldCell}>
      <span style={s.fieldLabel}>{label}</span>
      {badge ? (
        <span style={s.badge}>{value}</span>
      ) : href ? (
        <a
          href={href}
          style={{
            ...s.fieldValue,
            color: BRAND.accent,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          {value}
        </a>
      ) : (
        <p style={s.fieldValue}>{value}</p>
      )}
    </div>
  );
}

export function EmailTemplate({ data, serviceLabel }: EmailTemplateProps) {
  const isFooter = data.source === "footer" || (!data.name && !data.message);
  const displayName = data.name?.trim() ? data.name.trim() : "Cliente interesado";
  const displayService = serviceLabel || data.service || "Consulta general";
  const phoneText = data.phone?.trim() ? data.phone.trim() : "—";

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.logoBadge}>Zerho Arquitectura · San Pedro Garza García</div>
          <h1 style={s.headerTitle}>
            {isFooter
              ? "Nuevo contacto desde el pie de página"
              : "Nueva solicitud de proyecto"}
          </h1>
          <p style={s.headerSubtitle}>
            Recibida a través del portal <strong>zerho.mx</strong>
          </p>
        </div>

        {/* Body */}
        <div style={s.body}>
          <p style={s.greeting}>
            {isFooter ? (
              <>
                Un visitante ha ingresado su correo en el pie de página solicitando
                ser contactado para platicar sobre su proyecto.
              </>
            ) : (
              <>
                Hola equipo Zerho, se ha recibido una nueva solicitud de{" "}
                <strong>{displayName}</strong> para el servicio de{" "}
                <strong>{displayService}</strong>.
              </>
            )}
          </p>

          <p style={s.sectionTitle}>Datos del prospecto</p>

          <table style={s.tableGrid}>
            <tbody>
              {!isFooter && (
                <tr>
                  <td style={{ width: "50%", paddingRight: 6, verticalAlign: "top" }}>
                    <FieldBox label="Nombre" value={displayName} />
                  </td>
                  <td style={{ width: "50%", paddingLeft: 6, verticalAlign: "top" }}>
                    <FieldBox label="Servicio de interés" value={displayService} badge />
                  </td>
                </tr>
              )}
              <tr>
                <td
                  style={{
                    width: isFooter ? "100%" : "50%",
                    paddingRight: isFooter ? 0 : 6,
                    verticalAlign: "top",
                  }}
                  colSpan={isFooter ? 2 : 1}
                >
                  <FieldBox
                    label="Correo electrónico"
                    value={data.email}
                    href={`mailto:${data.email}`}
                  />
                </td>
                {!isFooter && (
                  <td style={{ width: "50%", paddingLeft: 6, verticalAlign: "top" }}>
                    <FieldBox
                      label="Teléfono"
                      value={phoneText}
                      href={data.phone?.trim() ? `tel:${data.phone.trim()}` : undefined}
                    />
                  </td>
                )}
              </tr>
            </tbody>
          </table>

          {data.message && (
            <>
              <hr style={s.divider} />
              <p style={s.sectionTitle}>Mensaje o detalles del proyecto</p>
              <div style={s.messageBox}>
                <p style={s.messageText}>{data.message}</p>
              </div>
            </>
          )}

          {/* Quick Action Button */}
          <div style={s.ctaWrapper}>
            <a
              href={`mailto:${data.email}?subject=Re:%20Zerho%20Arquitectura%20-%20Contacto`}
              style={s.ctaButton}
            >
              Responder a {data.email} &rarr;
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={s.footer}>
          <p style={s.footerText}>
            Mensaje enviado a <strong>atrevino@zerho.mx</strong> a través del sitio web oficial de <strong>Zerho Arquitectura</strong>.
          </p>
          <p style={{ ...s.footerText, marginTop: 4 }}>
            Haz clic en <em>Responder</em> directamente para escribir a{" "}
            <strong>{data.email}</strong>.
          </p>
          <p style={{ ...s.footerText, marginTop: 12, fontSize: 11, color: BRAND.muted }}>
            © {new Date().getFullYear()} Zerho Arquitectura · San Pedro Garza García, N.L., México · Cero sorpresas, por contrato.
          </p>
        </div>
      </div>
    </div>
  );
}
