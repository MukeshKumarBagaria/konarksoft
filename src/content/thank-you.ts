import type { ThankYouContent } from "@/types/content";

/**
 * Written for the moment right after someone presses send, when the question
 * in their head is "did that work, and when do I hear back". So it confirms,
 * commits to a time, and gives them the studio's number — the enquiry is only
 * as good as the reply, and a lead who has saved the number answers the call.
 *
 * The promised hour matches the homepage and the landing pages. Change it in
 * one place and it has to change in all of them.
 */
export const thankYouContent: ThankYouContent = {
  meta: {
    title: "Thank you",
    description:
      "Your enquiry has reached Konark Soft. We reply within the hour in working hours, with a fixed quote.",
  },
  canonical: "/thank-you",
  eyebrow: "Enquiry received",
  heading: { lead: "Thanks — that's", accent: "with us now" },
  description:
    "A real person has your message, not an auto-responder. Here is exactly what happens next.",
  steps: [
    {
      index: "01",
      title: "We read it within the hour",
      description:
        "In working hours, every working day. You get a reply from the person who will actually do the work.",
    },
    {
      index: "02",
      title: "We ask anything we are missing",
      description:
        "A couple of questions on WhatsApp or a short call, whichever suits you. No forms to fill in again.",
    },
    {
      index: "03",
      title: "You get a fixed quote",
      description:
        "A written scope and a price that does not move later. Free, and yours to walk away from.",
    },
  ],
  chat: {
    label: "Add anything on WhatsApp",
    message:
      "Hi Konark Soft, I just sent an enquiry through your website. Here is a bit more detail:",
  },
  browse: { label: "See our recent work", href: "/work" },
  fallback: {
    lead: "Urgent, or nothing from us within the hour?",
    callLabel: "Call us directly",
  },
};
