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
