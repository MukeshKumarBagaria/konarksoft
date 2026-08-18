import { siteConfig } from "@/config/site";
import { telLink, whatsappLink } from "@/lib/utils/whatsapp";
import type { WhatsAppAction } from "@/types/content";

/**
 * Binds the pure link helpers to the studio's own numbers, so no component on
 * a landing page has to know where the contact details live.
 */
export function chatHref(action: WhatsAppAction): string {
  return whatsappLink(siteConfig.whatsappNumber, action.message);
}

/** Same, for a message assembled at runtime rather than written in content. */
export function chatHrefFor(message: string): string {
  return whatsappLink(siteConfig.whatsappNumber, message);
}

export const callHref = telLink(siteConfig.contactPhone);
