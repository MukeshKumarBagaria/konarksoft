"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { buttonStyles } from "@/components/ui/button";
import { CloseIcon, WhatsAppIcon } from "@/components/ui/icons";
import { openWhatsApp, recordLead } from "@/features/leads/handoff";
import type { GateRequest } from "@/features/leads/whatsapp-gate";
import { newLeadId, thankYouHref } from "@/lib/analytics/lead-redirect";
import { cn } from "@/lib/utils/cn";
import type { WhatsAppGateContent } from "@/types/content";

type FieldName = "name" | "email" | "services" | "requirements";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "mt-1.5 block w-full rounded-2xl bg-white px-4 text-[16px] text-ink shadow-[inset_0_0_0_1px_var(--color-hairline)] transition-shadow duration-200 placeholder:text-subtle focus:shadow-[inset_0_0_0_2px_var(--color-brand)] focus:outline-none";
const labelClass = "block text-[14px] font-semibold text-ink";
const invalidClass = "shadow-[inset_0_0_0_2px_var(--color-brand-strong)]";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;

  return (
    <p id={id} className="mt-1.5 text-[13.5px] font-medium text-brand-strong">
      {children}
    </p>
  );
}

/**
 * The details form in front of every WhatsApp button.
 *
 * A native `<dialog>` opened with `showModal()`: that gives the focus trap,
 * Escape, and the top layer for free — so it sits above the fixed header pill
 * without joining the z-index ladder. The page behind it is locked the same
 * way the mobile menu locks it.
 *
 * On submit it does three things in one gesture, in this order: opens
 * WhatsApp with the message typed, posts the same details to the inbox, and
 * sends this tab to the thank-you page so the lead is counted. The order
 * matters — the popup has to be first, while the click's user activation is
 * still unspent.
 */
export function ContactDialog({
  request,
  onClose,
  content,
}: {
  request: GateRequest | null;
  onClose: () => void;
  content: WhatsAppGateContent;
}) {
  const router = useRouter();
  const smoothScroll = useSmoothScroll();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const baseId = useId();
  const [errors, setErrors] = useState<Errors>({});

  const id = (field: string) => `${baseId}-${field}`;
  const errorId = (field: FieldName) => `${baseId}-${field}-error`;

  const open = request !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) dialog.showModal();
    nameRef.current?.focus();

    document.documentElement.setAttribute("data-scroll-locked", "");
    smoothScroll?.pause();

    return () => {
      document.documentElement.removeAttribute("data-scroll-locked");
      smoothScroll?.resume();
    };
    // `request.key` is in the list so a second request with the same opener
    // still re-runs the focus.
  }, [open, request?.key, smoothScroll]);

  function close() {
    setErrors({});
    onClose();
  }

  /** The backdrop is the dialog element itself; the card is its child. */
  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) close();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!request) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (field: string) => String(data.get(field) ?? "").trim();

    const name = read("name");
    const email = read("email");
    const services = data.getAll("services").map(String);
    const requirements = read("requirements");

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = content.errors.name;
    if (!EMAIL.test(email)) nextErrors.email = content.errors.email;
    if (services.length === 0) nextErrors.services = content.errors.services;
    if (!requirements) nextErrors.requirements = content.errors.requirements;
    setErrors(nextErrors);

    const firstInvalid = (
      ["name", "email", "services", "requirements"] as const
    ).find((field) => nextErrors[field]);
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid);
      const target = field instanceof RadioNodeList ? field[0] : field;
      if (target instanceof HTMLElement) target.focus();
      return;
    }

    const need = services.join(", ");
    const message = [
      request.opener,
      `Name: ${name}`,
      `Email: ${email}`,
      `Looking for: ${need}`,
      `Details: ${requirements}`,
    ].join("\n");

    const source = window.location.pathname;

    // Popup first — see the note on `openWhatsApp`.
    const stayed = openWhatsApp(message);

    recordLead({
      kind: "whatsapp",
      name,
      email,
      need,
      details: requirements,
      source,
    });

    form.reset();
    close();

    if (stayed) {
      router.push(thankYouHref({ source, form: "whatsapp", id: newLeadId() }));
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={id("title")}
      onCancel={(event) => {
        // Escape. Prevented so React's state, not the browser, closes it.
        event.preventDefault();
        close();
      }}
      onClick={onBackdropClick}
      className="chat-dialog m-auto w-[calc(100%-2rem)] max-w-lg rounded-[1.75rem] border-0 bg-transparent p-0 text-ink backdrop:bg-ink-strong/55 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[1.75rem] bg-white p-6 shadow-float sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id={id("title")}
              className="text-[clamp(1.5rem,4vw,1.9rem)] leading-tight font-bold tracking-[-0.025em] text-ink"
            >
              {content.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted text-pretty">
              {content.description}
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label={content.cancel}
            className="-mt-1 -mr-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink transition-colors duration-200 hover:bg-black/5"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id("name")} className={labelClass}>
                {content.fields.name.label}
              </label>
              <input
                ref={nameRef}
                id={id("name")}
                name="name"
                type="text"
                autoComplete="name"
                placeholder={content.fields.name.placeholder}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? errorId("name") : undefined}
                className={cn(fieldClass, "h-12", errors.name && invalidClass)}
              />
              <FieldError id={errorId("name")}>{errors.name}</FieldError>
            </div>

            <div>
              <label htmlFor={id("email")} className={labelClass}>
                {content.fields.email.label}
              </label>
              <input
                id={id("email")}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={content.fields.email.placeholder}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? errorId("email") : undefined}
                className={cn(fieldClass, "h-12", errors.email && invalidClass)}
              />
              <FieldError id={errorId("email")}>{errors.email}</FieldError>
            </div>

            <fieldset
              className="sm:col-span-2"
              aria-invalid={errors.services ? true : undefined}
              aria-describedby={
                errors.services ? errorId("services") : undefined
              }
            >
              <legend className={labelClass}>
                {content.fields.services.label}
              </legend>

              <div className="mt-2.5 grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
                {content.services.map((service) => (
                  <label
                    key={service}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-1 py-1 text-[15px] text-ink"
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      className="h-[18px] w-[18px] shrink-0 cursor-pointer rounded accent-brand"
                    />
                    {service}
                  </label>
                ))}
              </div>

              <FieldError id={errorId("services")}>
                {errors.services}
              </FieldError>
            </fieldset>

            <div className="sm:col-span-2">
              <label htmlFor={id("requirements")} className={labelClass}>
                {content.fields.requirements.label}
              </label>
              <textarea
                id={id("requirements")}
                name="requirements"
                rows={4}
                maxLength={2000}
                placeholder={content.fields.requirements.placeholder}
                aria-invalid={errors.requirements ? true : undefined}
                aria-describedby={
                  errors.requirements ? errorId("requirements") : undefined
                }
                className={cn(
                  fieldClass,
                  "resize-y py-3",
                  errors.requirements && invalidClass,
                )}
              />
              <FieldError id={errorId("requirements")}>
                {errors.requirements}
              </FieldError>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={close}
              className={buttonStyles({ variant: "secondary", size: "lg" })}
            >
              {content.cancel}
            </button>
            <button
              type="submit"
              className={buttonStyles({ variant: "whatsapp", size: "lg" })}
            >
              <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" />
              {content.submit}
            </button>
          </div>

          <p className="mt-4 text-center text-[13px] text-muted sm:text-right">
            {content.note}
          </p>
        </form>
      </div>
    </dialog>
  );
}
