import { sendEnquiryEmail, type EnquiryRow } from "@/lib/email/send-enquiry";

/**
 * Receives the quote form on the ad landing pages.
 *
 * That form's first job is still to hand the visitor to WhatsApp — this route
 * runs alongside it so the lead is also captured in the inbox, and nothing is
 * lost if the visitor never sends the message their app opened with.
 *
 * Because of that it answers optimistically: the browser fires this without
 * waiting for it, so a failure here must never cost the visitor the handoff.
 * Failures are logged, not surfaced.
 */

type Lead = {
  name: string;
  phone: string;
  need: string;
  business: string;
  details: string;
  /** Which landing page the form was filled on. */
  source: string;
};

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
    name: read(source, "name"),
    phone: read(source, "phone"),
    need: read(source, "need"),
    business: read(source, "business"),
    details: read(source, "details"),
    source: read(source, "source"),
  };

  // The same three the form itself insists on. Anything else reaching here did
  // not come from the form.
  if (!lead.name || lead.phone.replace(/\D/g, "").length < 10 || !lead.need) {
    return Response.json({ message: "Incomplete lead." }, { status: 400 });
  }

  const rows: readonly EnquiryRow[] = [
    ["Name", lead.name],
    ["WhatsApp", lead.phone],
    ["Looking for", lead.need],
    ["Business", lead.business || "—"],
    ["Came from", lead.source || "—"],
  ];

  const sent = await sendEnquiryEmail({
    subject: `New quote request — ${lead.name} · ${lead.need}`,
    rows,
    message: lead.details,
  });

  if (!sent.ok) {
    return Response.json(
      { message: "Could not record the lead." },
      { status: sent.reason === "unconfigured" ? 500 : 502 },
    );
  }

  return Response.json({ ok: true });
}
