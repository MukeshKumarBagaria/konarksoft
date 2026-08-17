type IconProps = {
  className?: string;
};

/**
 * Inline SVG icons. Decorative by default (`aria-hidden`) — the accessible name
 * always comes from the surrounding control's text or `aria-label`.
 */
const baseProps = {
  "aria-hidden": true,
  focusable: "false",
  xmlns: "http://www.w3.org/2000/svg",
} as const;

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m4 6.5 4 4 4-4" />
    </svg>
  );
}

/** Points right; rotate it 180° for the matching "previous" control. */
export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 4 4 4-4 4" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M7.4 3.3a1.4 1.4 0 0 0-1.9-.5l-1.3.8a2.7 2.7 0 0 0-1.2 2.8 13.6 13.6 0 0 0 3.6 6.6 13.6 13.6 0 0 0 6.5 3.7 2.7 2.7 0 0 0 2.9-1.2l.8-1.3a1.4 1.4 0 0 0-.5-1.9l-2.1-1.2a1.4 1.4 0 0 0-1.8.4l-.6.8a10.6 10.6 0 0 1-3.5-3.5l.8-.6a1.4 1.4 0 0 0 .4-1.8Z" />
    </svg>
  );
}

export function PaperPlaneIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M17.6 2.5a.9.9 0 0 1 .3 1L14.4 16a1 1 0 0 1-1.7.4l-3.2-3.6-2.2 2.2a.5.5 0 0 1-.9-.4V11L16.5 4 5.9 9.9 2.2 8.6a1 1 0 0 1 0-1.8l14.4-4.4a.9.9 0 0 1 1 .1Z" />
    </svg>
  );
}

/** Solid triangle — sits inside a disc, so it needs no outline of its own. */
export function PlayIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M15.6 8.7a1.5 1.5 0 0 1 0 2.6l-7.9 4.6A1.5 1.5 0 0 1 5.5 14.6V5.4a1.5 1.5 0 0 1 2.2-1.3Z" />
    </svg>
  );
}

export function CoinIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 5.75v8.5M12.1 7.7a2.1 2.1 0 0 0-2-1.1c-1.2 0-2.1.7-2.1 1.8s.9 1.5 2.1 1.7 2.1.6 2.1 1.7-.9 1.8-2.1 1.8a2.1 2.1 0 0 1-2.1-1.2" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      {/* The second figure is held back so the pair reads as one glyph at 16px
          rather than two competing silhouettes. */}
      <g opacity="0.7">
        <path d="M13.9 9.7a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" />
        <path d="M13.9 11a5.9 5.9 0 0 0-1.7.24c.87.79 1.4 1.83 1.4 2.99v1.5c0 .1 0 .19-.02.28h3.32c.5 0 .9-.4.9-.9v-1.13c0-1.65-1.75-2.98-3.9-2.98Z" />
      </g>
      <path d="M7.7 9.9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M7.7 11.2c-3 0-5.2 1.44-5.2 3.35v1.16c0 .5.4.9.9.9h8.6c.5 0 .9-.4.9-.9v-1.16c0-1.91-2.2-3.35-5.2-3.35Z" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m3.2 8.4 3.1 3.1 6.5-7" />
    </svg>
  );
}

/** Solid disc — for feature lists on dark cards, where an outline would vanish. */
export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18.4a8.4 8.4 0 1 0 0-16.8 8.4 8.4 0 0 0 0 16.8Zm4-10.5a1 1 0 0 0-1.55-1.26l-3.6 4.42-1.7-1.7a1 1 0 1 0-1.4 1.4l2.47 2.48a1 1 0 0 0 1.48-.07Z"
      />
    </svg>
  );
}

/** Ring — the same mark for light cards, where a solid disc would shout. */
export function CheckCircleOutlineIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="10" cy="10" r="7.4" />
      <path d="m6.6 10.2 2.3 2.3 4.5-4.9" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 11 11 5M5.8 5H11v5.2" />
    </svg>
  );
}

/**
 * WhatsApp's glyph, drawn rather than imported so it inherits `currentColor`
 * and needs no network request. The mark is recognised on sight in the markets
 * these pages advertise into, so it is worth carrying exactly.
 */
export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.81c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.73c0 4.46-3.63 8.09-8.1 8.09a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.05 8.05 0 0 1-1.24-4.29c0-4.46 3.64-8.09 8.1-8.09Z" />
      <path d="M8.53 7.33c-.19-.42-.38-.43-.56-.44h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.89 2.38 1.01 2.54c.12.17 1.71 2.74 4.22 3.73 2.09.82 2.51.66 2.97.62.45-.04 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.54.07-.25-.13-1.05-.39-2-1.24a7.5 7.5 0 0 1-1.39-1.72c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.34-.75-1.83Z" />
    </svg>
  );
}

/** Filled star for rating rows. */
export function StarIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M10 1.8a.7.7 0 0 1 .63.4l2.09 4.24 4.68.68a.7.7 0 0 1 .39 1.2l-3.39 3.3.8 4.66a.7.7 0 0 1-1.02.74L10 14.82l-4.18 2.2a.7.7 0 0 1-1.02-.74l.8-4.66-3.39-3.3a.7.7 0 0 1 .39-1.2l4.68-.68 2.09-4.24a.7.7 0 0 1 .63-.4Z" />
    </svg>
  );
}

/** Shield with a tick — ownership, guarantees, anything reassuring. */
export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 2.2 3.9 4.6v4.5c0 3.5 2.4 6.7 6.1 8.1 3.7-1.4 6.1-4.6 6.1-8.1V4.6Z" />
      <path d="m7.4 9.9 1.9 1.9 3.5-3.8" />
    </svg>
  );
}

/** Lightning bolt — speed, turnaround, performance. */
export function BoltIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M11.6 1.8a.6.6 0 0 1 1.05.55l-1.4 5.03h3.4a.7.7 0 0 1 .53 1.16l-7.2 8.4a.6.6 0 0 1-1.04-.55l1.4-5.03h-3.4a.7.7 0 0 1-.53-1.16Z" />
    </svg>
  );
}

/** Ringed cross — the counterpart to the check, for the "what goes wrong" list. */
export function CrossCircleIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="10" cy="10" r="7.4" />
      <path d="m7.6 7.6 4.8 4.8M12.4 7.6l-4.8 4.8" />
    </svg>
  );
}

/**
 * Plus that becomes a minus by hiding one stroke — the FAQ rows rotate it
 * rather than swapping icons, so the marker animates instead of popping.
 */
export function PlusIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className={className}
    >
      <path d="M3 8h10" />
      <path d="M8 3v10" className="faq-plus-stem" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      {...baseProps}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
