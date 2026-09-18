import { Resend } from "resend";

import { siteConfig } from "@/config/site";

/**
 * Delivers a form submission to the studio inbox through Resend.
 *
 * Every form on the site funnels through here so there is one place that knows
 * the credentials, one HTML shell, and one escaping rule. Configured by:
 *   RESEND_API_KEY     — the key from resend.com/api-keys
 *   CONTACT_FROM_EMAIL — sender, on a domain verified with Resend
 *   CONTACT_TO_EMAIL   — where enquiries land (defaults to the site's address)
 *
 * The client is constructed per call rather than at module scope, so a missing
 * key fails the request rather than the build.
 */

/** One labelled line in the summary table at the top of the mail. */
export type EnquiryRow = readonly [label: string, value: string];

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "rejected" };

/** Escapes the five characters that could break out of the HTML body. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function textBody(rows: readonly EnquiryRow[], message: string) {
  const details = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  return message ? `${details}\n\nMessage:\n${message}` : details;
}

function htmlBody(rows: readonly EnquiryRow[], message: string) {
  const details = rows
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:6px 16px 6px 0;color:#6a6a78;font-size:14px;vertical-align:top">${escapeHtml(label)}</td>
           <td style="padding:6px 0;color:#1c1c22;font-size:14px"><strong>${escapeHtml(value)}</strong></td>
         </tr>`,
    )
    .join("");

  const body = message
    ? `<div style="border-top:1px solid rgba(18,18,32,0.12);padding-top:18px">
         <p style="margin:0 0 8px;color:#6a6a78;font-size:14px">Message</p>
         <p style="margin:0;color:#1c1c22;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>
       </div>`
    : "";

  // Inline styles only, and no external assets: every mail client strips or
  // blocks the alternatives.
  return `<div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:640px">
      <p style="margin:0 0 18px;font-size:15px;color:#6a6a78">
        New enquiry from the ${escapeHtml(siteConfig.name)} website.
      </p>
      <table style="border-collapse:collapse;margin-bottom:22px">${details}</table>
      ${body}
    </div>`;
}

export async function sendEnquiryEmail({
  subject,
  rows,
  message = "",
  replyTo,
}: {
  subject: string;
  rows: readonly EnquiryRow[];
  /** Free-text the sender wrote, shown under the summary table. */
  message?: string;
  /** So hitting reply answers the enquirer, not the no-reply sender. */
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contactEmail;

  if (!apiKey || !from) {
    console.error(
      "[enquiry] RESEND_API_KEY and CONTACT_FROM_EMAIL must both be set.",
    );
    return { ok: false, reason: "unconfigured" };
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    replyTo,
    subject,
    text: textBody(rows, message),
    html: htmlBody(rows, message),
  });

  if (error) {
    console.error("[enquiry] Resend rejected the message:", error);
    return { ok: false, reason: "rejected" };
  }

  return { ok: true };
}
