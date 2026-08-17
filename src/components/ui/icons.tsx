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
