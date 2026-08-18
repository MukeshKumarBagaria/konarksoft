import { ChatCta } from "@/features/landing/components/chat-cta";
import type { LandingContent } from "@/types/content";

/**
 * The offer, pinned to the bottom of the viewport for the whole page. On a
 * phone this is the only call to action guaranteed to be on screen at any given
 * moment, which makes it the most valuable strip of the layout — so it carries
 * the price, not just a verb.
 *
 * It is present from the first paint rather than fading in past the hero.
 * Waiting costs the visitors who bounce early, and being there from the start
 * means no scroll listener, no state, and no JavaScript in this component at
 * all — the offer is server-rendered HTML that cannot fail to arrive.
 */
export function StickyOfferBar({
  content,
}: {
  content: LandingContent["sticky"];
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
      {/* The safe-area inset is what keeps the pill clear of the iOS home
          indicator; without it the button's lower third is unpressable. */}
      <div className="mx-auto max-w-2xl px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:pb-5">
        <div className="lp-sticky pointer-events-auto flex items-center justify-between gap-3 rounded-full py-2.5 pr-2.5 pl-5">
          <p className="min-w-0">
            <span className="block truncate text-[15px] leading-tight font-bold text-white sm:text-base">
              {content.headline}
            </span>
            <span className="mt-0.5 block truncate text-[12.5px] leading-tight text-white/60">
              {content.support}
            </span>
          </p>

          <ChatCta
            action={content.cta}
            variant="whatsapp"
            size="md"
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
