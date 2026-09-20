import { sendEnquiryEmail, type EnquiryRow } from "@/lib/email/send-enquiry";

/**
 * Receives the quote form on the ad landing pages, and the details form every
 * WhatsApp button opens first.
 *
 * Both forms' first job is still to hand the visitor to WhatsApp — this route
 * runs alongside so the lead is also captured in the inbox, and nothing is
 * lost if the visitor never sends the message their app opened with.
 *
 * Because of that it answers optimistically: the browser fires this without
 * waiting for it, so a failure here must never cost the visitor the handoff.
 * Failures are logged, not surfaced.
 */

type Lead = {
  /** `quote` is the landing-page form; `whatsapp` is the gate on the buttons. */
  kind: "quote" | "whatsapp";
  name: string;
  phone: string;
  email: string;
  need: string;
  business: string;
  details: string;
  /** Which page the form was filled on. */
  source: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(source: Record<string, unknown>, field: string) {
  const value = source[field];
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Unreadable request." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return Response.json({ message: "Unreadable request." }, { status: 400 });
  }

  const source = payload as Record<string, unknown>;

  // Same honeypot contract as the contact route.
  const trap = read(source, "company");
  if (trap) return Response.json({ ok: true });

  const lead: Lead = {
    kind: read(source, "kind") === "whatsapp" ? "whatsapp" : "quote",
    name: read(source, "name"),
    phone: read(source, "phone"),
    email: read(source, "email"),
    need: read(source, "need"),
    business: read(source, "business"),
    details: read(source, "details"),
    source: read(source, "source"),
  };

  // What the forms themselves insist on: a name, a need, and one way to reach
  // the person — the quote form collects a number, the gate an address.
  // Anything short of that did not come from a form.
  const reachable =
    lead.phone.replace(/\D/g, "").length >= 10 || EMAIL.test(lead.email);
  if (!lead.name || !lead.need || !reachable) {
    return Response.json({ message: "Incomplete lead." }, { status: 400 });
  }

  const rows: readonly EnquiryRow[] = [
    ["Name", lead.name],
    ["WhatsApp", lead.phone || "—"],
    ["Email", lead.email || "—"],
    ["Looking for", lead.need],
    ["Business", lead.business || "—"],
    ["Came from", lead.source || "—"],
  ];

  const sent = await sendEnquiryEmail({
    subject: `${
      lead.kind === "whatsapp" ? "New WhatsApp enquiry" : "New quote request"
    } — ${lead.name} · ${lead.need}`,
    rows,
    message: lead.details,
    // Only an address can be replied to; a number cannot go in this header.
    replyTo: lead.email || undefined,
  });

  if (!sent.ok) {
    return Response.json(
      { message: "Could not record the lead." },
      { status: sent.reason === "unconfigured" ? 500 : 502 },
    );
  }

  return Response.json({ ok: true });
}
