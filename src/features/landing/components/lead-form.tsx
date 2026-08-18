"use client";

import { useId, useState, type FormEvent } from "react";

import { buttonStyles } from "@/components/ui/button";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { callHref, chatHrefFor } from "@/features/landing/whatsapp";
import { cn } from "@/lib/utils/cn";
import type { LandingContent } from "@/types/content";

type FieldName = "name" | "phone" | "need";
type Errors = Partial<Record<FieldName, string>>;

/**
 * The form does not post anywhere. It assembles what was typed into a WhatsApp
 * message and hands the visitor off to their own app with it already written.
 *
 * That is a deliberate trade. A posted form needs an inbox someone watches, and
 * an enquiry that sits unread for a day is worth nothing; a WhatsApp thread is
 * where this market already replies, and the lead arrives in the studio's
 * pocket with the plan it came from on the first line. The cost is that it
 * needs JavaScript — so the aside beside it carries a plain link and a phone
 * number, both of which work with none.
 */
export function LeadForm({ content }: { content: LandingContent["form"] }) {
  const fieldId = useId();
  const [errors, setErrors] = useState<Errors>({});

  const id = (field: string) => `${fieldId}-${field}`;
  const errorId = (field: FieldName) => `${fieldId}-${field}-error`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (field: string) => String(data.get(field) ?? "").trim();

    const name = read("name");
    const phone = read("phone");
    const need = read("need");
    const business = read("business");
    const details = read("details");

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please tell us your name.";
    // Loose on formatting, strict on length: people type +91, spaces and
    // dashes, and rejecting those loses real leads over punctuation.
    if (phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid WhatsApp number, at least 10 digits.";
    }
    if (!need) nextErrors.need = "Pick what you need so we can quote it.";

    setErrors(nextErrors);

    const firstInvalid = (["name", "phone", "need"] as const).find(
      (field) => nextErrors[field],
    );
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    const message = [
      "Hi Konark Soft, I would like a quote.",
      `Name: ${name}`,
      `WhatsApp: ${phone}`,
      business && `Business: ${business}`,
      `Looking for: ${need}`,
      details && `Details: ${details}`,
    ]
      .filter(Boolean)
      .join("\n");

    const href = chatHrefFor(message);
    // Popup blockers allow this because it runs inside the submit gesture; the
    // fallback covers the browsers that still refuse.
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = href;
  }

  const fieldClass =
    "mt-1.5 block h-13 w-full rounded-2xl bg-white px-4 text-[16px] text-ink shadow-[inset_0_0_0_1px_var(--color-hairline)] transition-shadow duration-200 placeholder:text-subtle focus:shadow-[inset_0_0_0_2px_var(--color-brand)] focus:outline-none";
  const labelClass = "block text-[14px] font-semibold text-ink";
  const invalidClass = "shadow-[inset_0_0_0_2px_var(--color-brand-strong)]";

  return (
    <section
      id="quote"
      aria-labelledby="form-heading"
      className="lp-field scroll-mt-24 rounded-t-[2rem] py-20 sm:py-28 md:rounded-t-[2.75rem]"
    >
      <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
        <div className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_var(--color-hairline),0_30px_70px_-50px_rgba(18,18,32,0.55)] sm:p-10">
          <p className="text-[13px] font-bold tracking-[0.14em] text-brand-strong uppercase">
            {content.eyebrow}
          </p>

          <h2
            id="form-heading"
            className="mt-3 text-[clamp(1.6rem,4.6vw,2.2rem)] leading-[1.16] font-bold tracking-[-0.025em] text-ink text-balance"
          >
            {content.heading.lead}{" "}
            <span className="font-display text-[1.06em] font-normal text-brand italic">
              {content.heading.accent}
            </span>
          </h2>

          <p className="mt-3 text-[16.5px] leading-relaxed text-muted text-pretty">
            {content.description}
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={id("name")} className={labelClass}>
                  Your name
                </label>
                <input
                  id={id("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Rajesh Mehta"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? errorId("name") : undefined}
                  className={cn(fieldClass, errors.name && invalidClass)}
                />
                {errors.name ? (
                  <p
                    id={errorId("name")}
                    className="mt-1.5 text-[13.5px] font-medium text-brand-strong"
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={id("phone")} className={labelClass}>
                  WhatsApp number
                </label>
                {/* `inputMode` rather than `type="number"`: a numeric keypad
                    without the spinner, and it keeps a leading +91 intact. */}
                <input
                  id={id("phone")}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? errorId("phone") : undefined}
                  className={cn(fieldClass, errors.phone && invalidClass)}
                />
                {errors.phone ? (
                  <p
                    id={errorId("phone")}
                    className="mt-1.5 text-[13.5px] font-medium text-brand-strong"
                  >
                    {errors.phone}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={id("business")} className={labelClass}>
                  Business name and city{" "}
                  <span className="font-normal text-subtle">(optional)</span>
                </label>
                <input
                  id={id("business")}
                  name="business"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Mehta Interiors, Pune"
                  className={fieldClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={id("need")} className={labelClass}>
                  What do you need?
                </label>
                <select
                  id={id("need")}
                  name="need"
                  defaultValue=""
                  aria-invalid={errors.need ? true : undefined}
                  aria-describedby={errors.need ? errorId("need") : undefined}
                  className={cn(fieldClass, errors.need && invalidClass)}
                >
                  <option value="" disabled>
                    Choose one…
                  </option>
                  {content.needs.map((need) => (
                    <option key={need} value={need}>
                      {need}
                    </option>
                  ))}
                </select>
                {errors.need ? (
                  <p
                    id={errorId("need")}
                    className="mt-1.5 text-[13.5px] font-medium text-brand-strong"
                  >
                    {errors.need}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={id("details")} className={labelClass}>
                  Anything else?{" "}
                  <span className="font-normal text-subtle">(optional)</span>
                </label>
                <textarea
                  id={id("details")}
                  name="details"
                  rows={3}
                  placeholder="Pages you need, a site you like, your deadline…"
                  className={cn(fieldClass, "h-auto py-3.5 leading-relaxed")}
                />
              </div>
            </div>

            <button
              type="submit"
              className={buttonStyles({
                variant: "whatsapp",
                size: "xl",
                className: "mt-7 w-full",
              })}
            >
              <WhatsAppIcon className="h-[1.15em] w-[1.15em] shrink-0" />
              {content.submitLabel}
            </button>

            <p className="mt-3.5 text-center text-[14px] leading-relaxed text-muted text-pretty">
              {content.disclaimer}
            </p>
          </form>
        </div>

        <aside className="rounded-3xl bg-white/60 p-7 shadow-[inset_0_0_0_1px_var(--color-hairline)] sm:p-8 lg:self-start">
          <h3 className="text-[19px] font-bold tracking-[-0.02em] text-ink">
            {content.aside.title}
          </h3>

          <ul className="mt-5 flex flex-col gap-3.5">
            {content.aside.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-[15.5px] leading-snug text-ink/80"
              >
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
                {point}
              </li>
            ))}
          </ul>

          <a
            href={callHref}
            className={buttonStyles({
              variant: "secondary",
              size: "lg",
              className: "mt-7 w-full",
            })}
          >
            <PhoneIcon className="h-4 w-4" />
            {content.aside.callLabel}
          </a>

          <p className="mt-3 text-center text-[15px] font-semibold text-ink">
            {siteConfig.contactPhone}
          </p>
        </aside>
      </div>
    </section>
  );
}
