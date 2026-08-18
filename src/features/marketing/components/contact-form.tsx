"use client";

import { useId, useState, type FormEvent } from "react";

import { buttonStyles } from "@/components/ui/button";
import { CheckCircleOutlineIcon, ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import type { ContactFieldErrors } from "@/lib/contact/submission";
import type { ContactContent } from "@/types/content";

type FormCopy = ContactContent["card"]["form"];

type Status = "idle" | "submitting" | "success" | "error";

/** Shared by every control, so the row never breaks rhythm between types. */
const controlStyles =
  "w-full rounded-xl bg-white px-4 text-[15px] text-ink ring-1 ring-hairline transition-[box-shadow,background] duration-200 placeholder:text-subtle";

/** Errors are drawn in the brand red — the palette carries no separate danger tone. */
const invalidStyles = "ring-brand/70";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[13px] font-medium text-ink/80"
    >
      {children}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;

  return (
    <p id={id} className="mt-1.5 text-[13px] text-brand">
      {children}
    </p>
  );
}

/**
 * The enquiry form inside the closing card on `/contact`.
 *
 * Native constraints do the first pass so the common mistakes are caught
 * without a round trip; `/api/contact` validates everything again and returns
 * per-field messages, which are what these fields render. Both layers exist
 * because the route is reachable without the form.
 */
export function ContactForm({ content }: { content: FormCopy }) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  // The only controlled field: an empty `<select>` has to look like a
  // placeholder, and there is no selector for "no option chosen".
  const [service, setService] = useState("");

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  /** `aria-describedby` must be absent, not empty, when there is no message. */
  const describedBy = (name: keyof ContactFieldErrors) =>
    fieldErrors[name] ? errorId(name) : undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setFormError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: { errors?: ContactFieldErrors; message?: string } =
        await response.json().catch(() => ({}));

      if (!response.ok) {
        setFieldErrors(result.errors ?? {});
        setFormError(result.errors ? "" : (result.message ?? content.error));
        setStatus("error");
        return;
      }

      form.reset();
      setService("");
      setStatus("success");
    } catch {
      // Offline, or the request never reached the route.
      setFormError(content.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="py-6 text-center">
        <span
          aria-hidden="true"
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft ring-1 ring-hairline"
        >
          <CheckCircleOutlineIcon className="h-8 w-8 text-brand" />
        </span>

        <h4 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-ink">
          {content.success.title}
        </h4>

        <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-muted text-pretty">
          {content.success.description}
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={buttonStyles({ variant: "secondary", className: "mt-7" })}
        >
          {content.success.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7">
      {/* Never shown to a person, so anything in it came from a bot. Positioned
          off-canvas rather than `hidden`, which many bots skip. */}
      <div
        aria-hidden="true"
        className="absolute top-0 -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={fieldId("company")}>Company</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor={fieldId("name")}>
            {content.fields.name.label}
          </FieldLabel>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder={content.fields.name.placeholder}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={cn(
              controlStyles,
              "mt-2 h-12",
              fieldErrors.name && invalidStyles,
            )}
          />
          <FieldError id={errorId("name")}>{fieldErrors.name}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor={fieldId("email")}>
            {content.fields.email.label}
          </FieldLabel>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            placeholder={content.fields.email.placeholder}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={cn(
              controlStyles,
              "mt-2 h-12",
              fieldErrors.email && invalidStyles,
            )}
          />
          <FieldError id={errorId("email")}>{fieldErrors.email}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor={fieldId("phone")}>
            {content.fields.phone.label}
          </FieldLabel>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            maxLength={32}
            autoComplete="tel"
            placeholder={content.fields.phone.placeholder}
            aria-invalid={fieldErrors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={cn(
              controlStyles,
              "mt-2 h-12",
              fieldErrors.phone && invalidStyles,
            )}
          />
          <FieldError id={errorId("phone")}>{fieldErrors.phone}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor={fieldId("service")}>
            {content.fields.service.label}
          </FieldLabel>

          <div className="relative mt-2">
            <select
              id={fieldId("service")}
              name="service"
              value={service}
              onChange={(event) => setService(event.target.value)}
              aria-invalid={fieldErrors.service ? true : undefined}
              aria-describedby={describedBy("service")}
              className={cn(
                controlStyles,
                "h-12 cursor-pointer appearance-none pe-11",
                service ? "text-ink" : "text-subtle",
                fieldErrors.service && invalidStyles,
              )}
            >
              <option value="">{content.fields.service.placeholder}</option>
              {content.services.map((option) => (
                <option key={option} value={option} className="text-ink">
                  {option}
                </option>
              ))}
            </select>

            <ChevronDownIcon
              className="pointer-events-none absolute inset-y-0 end-4 my-auto h-4 w-4 text-muted"
            />
          </div>

          <FieldError id={errorId("service")}>{fieldErrors.service}</FieldError>
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId("message")}>
            {content.fields.message.label}
          </FieldLabel>
          <textarea
            id={fieldId("message")}
            name="message"
            required
            rows={5}
            maxLength={4000}
            placeholder={content.fields.message.placeholder}
            aria-invalid={fieldErrors.message ? true : undefined}
            aria-describedby={describedBy("message")}
            className={cn(controlStyles, "mt-2 resize-y py-3", fieldErrors.message && invalidStyles)}
          />
          <FieldError id={errorId("message")}>{fieldErrors.message}</FieldError>
        </div>
      </div>

      {formError ? (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-brand-soft px-4 py-3 text-[13px] leading-relaxed text-brand-strong"
        >
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className={buttonStyles({ size: "lg", className: "mt-6 w-full" })}
      >
        {status === "submitting" ? content.pending : content.submit}
      </button>
    </form>
  );
}
