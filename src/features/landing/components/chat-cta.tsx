import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { chatHref } from "@/features/landing/whatsapp";
import type { WhatsAppAction } from "@/types/content";

/**
 * Every conversion on these pages runs through this link: it leaves for
 * WhatsApp with the message already typed, so the visitor's only remaining job
 * is to press send.
 *
 * `target="_blank"` is deliberate. On desktop `wa.me` opens WhatsApp Web, and
 * doing that in the same tab would throw away the landing page — along with the
 * ad click that paid for it — if the visitor is not signed in there.
 */
export function ChatCta({
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
    <a
      href={chatHref(action)}
      target="_blank"
      rel="noreferrer"
      className={buttonStyles({ variant, size, className })}
    >
      <WhatsAppIcon className="h-[1.15em] w-[1.15em] shrink-0" />
      {action.label}
    </a>
  );
}
