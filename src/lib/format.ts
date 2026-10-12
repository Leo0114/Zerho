/** "01. Construcción" → { index: "01", label: "Construcción" } */
export function splitIndexedTitle(title: string) {
  const match = title.match(/^(\d+)\.\s*(.+)$/);
  return match
    ? { index: match[1]!, label: match[2]! }
    : { index: "", label: title };
}

/** "Gestión Integral: Desde…" → { label: "Gestión Integral", body: "Desde…" } */
export function splitLabel(text: string) {
  const at = text.indexOf(":");
  return at === -1
    ? { label: "", body: text.trim() }
    : { label: text.slice(0, at).trim(), body: text.slice(at + 1).trim() };
}

export const phoneHref = (phone: string) => {
  const digits = phone.replace(/[^\d]/g, "");
  // Si empieza con 52 y tiene 12 dígitos (código de país México + 10 dígitos)
  if (digits.startsWith("52") && digits.length === 12) {
    return `tel:+${digits}`;
  }
  // Si tiene 10 dígitos (número nacional de México), anteponer +52
  if (digits.length === 10) {
    return `tel:+52${digits}`;
  }
  // Para cualquier otro formato, asegurar que tenga el prefijo +
  return `tel:${phone.startsWith("+") ? phone.replace(/[^\d+]/g, "") : `+${digits}`}`;
};

export const mailHref = (email: string, subject?: string) =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
