/**
 * Hand-drawn emphasis stroke under an accent word. Sized in `em` so it tracks
 * whatever heading it sits in, and stretched rather than scaled so the sweep
 * always spans the word exactly.
 *
 * The word it underlines must be `relative inline-block`.
 */
export function UnderlineStroke({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 300 14"
      fill="none"
      preserveAspectRatio="none"
      className={
        className ??
        "absolute -bottom-[0.12em] left-0 h-[0.16em] w-full text-brand"
      }
    >
      <path
        d="M2 10.5C48 4.8 104 2 150 2c46 0 102 2.8 148 8.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
