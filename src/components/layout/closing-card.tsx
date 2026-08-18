"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Picks the card the page closes on: the enquiry form on `/contact`, the
 * booking card everywhere else.
 *
 * Both arrive already rendered from the layout, so this only chooses between
 * them — neither has to become a Client Component to be switchable.
 *
 * A client hook rather than a parallel-route slot on purpose. A slot keeps its
 * last matched subpage across client-side transitions, so navigating away from
 * `/contact` left the form standing where the booking card belonged; reading
 * the segment is correct on both soft and hard navigation.
 */
export function ClosingCard({
  contact,
  booking,
}: {
  contact: ReactNode;
  booking: ReactNode;
}) {
  return useSelectedLayoutSegment() === "contact" ? contact : booking;
}
