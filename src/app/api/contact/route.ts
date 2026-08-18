import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import {
  validateContactSubmission,
  type ContactSubmission,
} from "@/lib/contact/submission";

/**
 * Receives the contact form and forwards it to the studio inbox through Resend.
 *
 * Configured by three environment variables:
 *   RESEND_API_KEY     — the key from resend.com/api-keys
 *   CONTACT_FROM_EMAIL — sender, on a domain verified with Resend
 *   CONTACT_TO_EMAIL   — where enquiries land (defaults to the site's address)
 *
 * The client is constructed per request rather than at module scope, so a
 * missing key is a 500 on this route alone instead of a failed build.
 */

/** Escapes the five characters that could break out of the HTML email body. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Rows shown in the email, in the order they appear in the form. */
function rows(data: ContactSubmission) {
  return [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Service", data.service || "—"],
  ] as const;
}

function textBody(data: ContactSubmission) {
  const details = rows(data)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return `${details}\n\nMessage:\n${data.message}`;
}

function htmlBody(data: ContactSubmission) {
  const details = rows(data)
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:6px 16px 6px 0;color:#6a6a78;font-size:14px;vertical-align:top">${label}</td>
           <td style="padding:6px 0;color:#1c1c22;font-size:14px"><strong>${escapeHtml(value)}</strong></td>
         </tr>`,
    )
    .join("");

  // Inline styles only, and no external assets: every mail client strips or
  // blocks the alternatives.
  return `<div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:640px">
      <p style="margin:0 0 18px;font-size:15px;color:#6a6a78">
        New enquiry from the ${escapeHtml(siteConfig.name)} contact form.
      </p>
      <table style="border-collapse:collapse;margin-bottom:22px">${details}</table>
      <div style="border-top:1px solid rgba(18,18,32,0.12);padding-top:18px">
        <p style="margin:0 0 8px;color:#6a6a78;font-size:14px">Message</p>
        <p style="margin:0;color:#1c1c22;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(
          data.message,
        )}</p>
      </div>
    </div>`;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { message: "That request could not be read." },
      { status: 400 },
    );
  }

  // Honeypot. A real person never sees this field, so anything in it is a bot —
  // answered with the same success the form shows, so the sender learns nothing
  // about why nothing arrived.
  const trap = (payload as Record<string, unknown> | null)?.company;
  if (typeof trap === "string" && trap.trim() !== "") {
    return Response.json({ ok: true });
  }

  const result = validateContactSubmission(payload);
  if (!result.ok) {
    return Response.json(
      { message: "Please check the highlighted fields.", errors: result.errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contactEmail;

  if (!apiKey || !from) {
    console.error(
      "[contact] RESEND_API_KEY and CONTACT_FROM_EMAIL must both be set.",
    );
    return Response.json(
      { message: "The contact form is not configured yet." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    // So hitting reply in the inbox answers the person who wrote in, rather
    // than the no-reply address the mail was sent from.
    replyTo: result.data.email,
    subject: `New enquiry — ${result.data.name}${
      result.data.service ? ` · ${result.data.service}` : ""
    }`,
    text: textBody(result.data),
    html: htmlBody(result.data),
  });

  if (error) {
    console.error("[contact] Resend rejected the message:", error);
    return Response.json(
      { message: "That did not send. Please try again in a moment." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
