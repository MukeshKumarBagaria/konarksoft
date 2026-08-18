const WHATSAPP_BASE = "https://wa.me/";

/**
 * Builds a click-to-chat link that opens WhatsApp with the message already
 * typed. Deliberately takes the number as an argument rather than reading
 * config, so this stays a pure helper at the bottom of the dependency graph.
 *
 * `wa.me` accepts digits only — no `+`, spaces or dashes — so the number is
 * stripped before use and a formatted string can be passed in safely.
 */
export function whatsappLink(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");

  return `${WHATSAPP_BASE}${digits}?text=${encodeURIComponent(message)}`;
}

/** `tel:` needs the same treatment, minus the `+` that makes it dialable. */
export function telLink(number: string): string {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}
