import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils/whatsapp";

/** What `/api/lead` is sent, whichever form collected it. */
export type LeadPayload = {
  /** Which form: the quote form on a landing page, or the WhatsApp gate. */
  kind: "quote" | "whatsapp";
  name: string;
  phone?: string;
  email?: string;
  /** What they are after, as one line — several services joined by commas. */
  need: string;
  business?: string;
  details?: string;
  /** The page the form was filled on, so the inbox can tell them apart. */
  source: string;
};

/**
 * Opens WhatsApp in its own tab with `message` already typed, and returns
 * whether this tab is still on the site afterwards — the caller can then send
 * it on to the thank-you page.
 *
 * Opened blank and navigated after, rather than `open(href, "_blank",
 * "noopener")`: with `noopener` in the feature string `open` returns null by
 * specification, which is indistinguishable from a blocked popup, so a
 * fallback keyed on it fires on every submission and throws this tab — and the
 * ad click that paid for it — at WhatsApp as well. A blank tab is same-origin
 * for the moment it takes to sever `opener`, which is what `noopener` was for.
 *
 * Must be called inside the submit gesture: the user activation that lets a
 * popup through is spent by anything that yields first.
 */
export function openWhatsApp(message: string): boolean {
  const href = whatsappLink(siteConfig.whatsappNumber, message);

  const opened = window.open("", "_blank");
  if (!opened) {
    // Genuinely blocked. This tab leaves for WhatsApp instead.
    window.location.href = href;
    return false;
  }

  opened.opener = null;
  opened.location.replace(href);
  return true;
}

/**
 * Posts the lead to the inbox. Fire-and-forget, and deliberately not awaited:
 * the visitor is being handed to another app, and making them wait on our
 * mail — or showing them an error from it — would cost the handoff that
 * actually converts. `keepalive` lets the request finish after the tab moves
 * on.
 */
export function recordLead(lead: LeadPayload): void {
  void fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify(lead),
  }).catch(() => {});
}
