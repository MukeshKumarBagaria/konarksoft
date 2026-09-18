import {
  sendEnquiryEmail,
  type EnquiryRow,
} from "@/lib/email/send-enquiry";
import {
  validateContactSubmission,
  type ContactSubmission,
} from "@/lib/contact/submission";

/** Receives the contact form on `/contact` and mails it to the studio. */

function rows(data: ContactSubmission): readonly EnquiryRow[] {
  return [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Service", data.service || "—"],
  ];
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

  const sent = await sendEnquiryEmail({
    subject: `New enquiry — ${result.data.name}${
      result.data.service ? ` · ${result.data.service}` : ""
    }`,
    rows: rows(result.data),
    message: result.data.message,
    replyTo: result.data.email,
  });

  if (!sent.ok) {
    return sent.reason === "unconfigured"
      ? Response.json(
          { message: "The contact form is not configured yet." },
          { status: 500 },
        )
      : Response.json(
          { message: "That did not send. Please try again in a moment." },
          { status: 502 },
        );
  }

  return Response.json({ ok: true });
}
