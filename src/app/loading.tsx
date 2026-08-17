/**
 * Route-level skeleton. Mirrors the hero rhythm (badge, heading, copy, button)
 * so the layout does not jump when the real content arrives.
 */
export default function Loading() {
  return (
    <div className="canvas-aurora relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="canvas-grid pointer-events-none absolute inset-0"
      />
      <div
        role="status"
        aria-live="polite"
        className="relative mx-auto flex max-w-3xl animate-pulse flex-col items-center px-5 pt-36 pb-24 sm:pt-44"
      >
        <span className="sr-only">Loading page</span>
        <div className="h-9 w-28 rounded-full bg-white/70" />
        <div className="mt-8 h-14 w-full max-w-2xl rounded-3xl bg-white/60" />
        <div className="mt-4 h-14 w-4/5 rounded-3xl bg-white/50" />
        <div className="mt-8 h-5 w-72 rounded-full bg-white/50" />
        <div className="mt-9 h-13 w-44 rounded-full bg-white/60" />
      </div>
    </div>
  );
}
