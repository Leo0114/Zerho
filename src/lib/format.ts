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

export const phoneHref = (phone: string) =>
  `tel:${phone.replace(/[^\d+]/g, "")}`;

export const mailHref = (email: string, subject?: string) =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
