import type { Route } from "next";

/**
 * A per-submission id, minted by the form and read back by the thank-you page.
 *
 * Its job is deduplication: both platforms are given it as their event id, so
 * a refresh of the thank-you page, a trip back and forward, or a shared link
 * reports the same lead rather than a new one.
 */
export function newLeadId(): string {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  );
}

/**
 * The thank-you URL, carrying what the tags need: which page the form was on,
 * which form it was, and the id above.
 *
 * `src` is the pathname rather than a hand-written name so a new landing page
 * needs no change here and still reports itself correctly.
 */
export function thankYouHref({
  source,
  form,
  id,
}: {
  source: string;
  form: string;
  id: string;
}): Route {
  const query = new URLSearchParams({ src: source, form, lead: id });

  // Typed routes check literals, and this query is assembled at runtime; the
  // path in front of it is the checked part.
  return `/thank-you?${query.toString()}` as Route;
}
