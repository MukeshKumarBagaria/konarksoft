"use client";

import type { MouseEvent, ReactNode } from "react";

import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { useWhatsAppGate } from "@/features/leads/whatsapp-gate";
import { whatsappLink } from "@/lib/utils/whatsapp";
import type { WhatsAppAction } from "@/types/content";

/**
 * A link to WhatsApp that opens the details form first.
 *
 * It is still a real `<a href="https://wa.me/…">` underneath: with JavaScript
 * off, or outside the provider, it opens the chat directly with `message`
 * typed, which is what every WhatsApp button did before the gate existed. With
 * JavaScript, the click is intercepted and the form takes over, carrying the
 * same message as its opening line.
 */
export function WhatsAppLink({
  message,
  className,
  children,
}: {
  message: string;
  className?: string;
  children: ReactNode;
}) {
  const gate = useWhatsAppGate();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!gate) return;
    // Modified clicks (new tab, new window) keep their native meaning.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)
      return;

    event.preventDefault();
    gate.open(message);
  }

  return (
    <a
      href={whatsappLink(siteConfig.whatsappNumber, message)}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}

/**
 * The WhatsApp button, in the site's button styles. Every WhatsApp call to
 * action on the site is one of these, so they all go through the same gate.
 */
export function WhatsAppCta({
  action,
  variant = "brand",
  size = "xl",
  className,
}: {
  action: WhatsAppAction;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return (
    <WhatsAppLink
      message={action.message}
      className={buttonStyles({ variant, size, className })}
    >
      <WhatsAppIcon className="h-[1.15em] w-[1.15em] shrink-0" />
      {action.label}
    </WhatsAppLink>
  );
}
