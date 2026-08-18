import { contactServices } from "@/content/contact";

/**
 * The contact form's payload, validated on the server before anything is sent.
 *
 * The browser does a first pass with native constraints (`required`, `type`,
 * `maxLength`), but that only covers the form — the route is a public endpoint,
 * so every rule is enforced again here and these messages are what the form
 * renders under each field.
 */
export const contactFields = [
  "name",
  "email",
  "phone",
  "service",
  "message",
] as const;

export type ContactField = (typeof contactFields)[number];

export type ContactSubmission = Record<ContactField, string>;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactValidation =
  | { ok: true; data: ContactSubmission }
  | { ok: false; errors: ContactFieldErrors };

/**
 * Deliberately loose: the strict grammar rejects addresses that are legal and
 * in daily use, and the only real test of an address is whether mail to it
 * arrives. This catches typing a name into the email box, and nothing else.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Long enough for an international number with spacing, short enough to bound. */
const PHONE_PATTERN = /^[\d\s()+.-]{6,32}$/;

const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  phone: { max: 32 },
  message: { min: 10, max: 4000 },
} as const;

/** Trims, and treats anything that is not a string as absent. */
function read(source: Record<string, unknown>, field: string) {
  const value = source[field];
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactSubmission(input: unknown): ContactValidation {
  if (typeof input !== "object" || input === null) {
    return { ok: false, errors: { name: "Something went wrong. Try again." } };
  }

  const source = input as Record<string, unknown>;
  const data: ContactSubmission = {
    name: read(source, "name"),
    email: read(source, "email"),
    phone: read(source, "phone"),
    service: read(source, "service"),
    message: read(source, "message"),
  };

  const errors: ContactFieldErrors = {};

  if (!data.name) errors.name = "Please tell us your name.";
  else if (data.name.length < LIMITS.name.min)
    errors.name = "That name looks too short.";
  else if (data.name.length > LIMITS.name.max)
    errors.name = `Please keep this under ${LIMITS.name.max} characters.`;

  if (!data.email) errors.email = "We need an email to reply to.";
  else if (data.email.length > LIMITS.email.max)
    errors.email = "That email address is too long.";
  else if (!EMAIL_PATTERN.test(data.email))
    errors.email = "That does not look like an email address.";

  // Optional — only checked once something has actually been typed.
  if (data.phone && !PHONE_PATTERN.test(data.phone))
    errors.phone = "That does not look like a phone number.";

  if (data.service && !contactServices.includes(data.service))
    errors.service = "Please pick one of the listed services.";

  if (!data.message) errors.message = "Tell us a little about the project.";
  else if (data.message.length < LIMITS.message.min)
    errors.message = "A sentence or two would help us reply properly.";
  else if (data.message.length > LIMITS.message.max)
    errors.message = `Please keep this under ${LIMITS.message.max} characters.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, data };
}
