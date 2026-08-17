"use client";

import { useEffect, type RefObject } from "react";

/**
 * Closes a disclosure (dropdown, menu panel) on Escape or on a pointer press
 * outside of it. Shared by the desktop dropdown and the mobile menu so both
 * behave identically.
 */
export function useDismiss({
  open,
  onDismiss,
  refs,
}: {
  open: boolean;
  onDismiss: () => void;
  refs: readonly RefObject<HTMLElement | null>[];
}): void {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (refs.some((ref) => ref.current?.contains(target))) return;
      onDismiss();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
    // `refs` is a stable array of refs owned by the caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onDismiss]);
}
