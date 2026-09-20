import { landingPages } from "@/config/navigation";
import type { WhatsAppGateContent } from "@/types/content";

/**
 * The form in front of every WhatsApp button.
 *
 * It costs a click-through — some people will close it rather than fill it —
 * and earns two things in return: a lead in the inbox even when the WhatsApp
 * message is never sent, and a first message that already says who they are
 * and what they want, so the reply can be a quote rather than three questions.
 *
 * The services are the four landing pages, read from the navigation config so
 * a fifth service appears here the day it gets a page.
 */
export const whatsappGateContent: WhatsAppGateContent = {
  title: "Before we chat",
  description:
    "A few details so the right person replies with a price, not with questions. Takes about twenty seconds.",
  fields: {
    name: { label: "Full name", placeholder: "e.g. Rajesh Mehta" },
    email: { label: "Email", placeholder: "you@yourbusiness.com" },
    services: { label: "What do you need?" },
    requirements: {
      label: "Tell us about the project",
      placeholder:
        "Your business, what you want built or run, and any deadline you are working to.",
    },
  },
  services: [...landingPages.map((page) => page.label), "Something else"],
  errors: {
    name: "Please tell us your name.",
    email: "Enter a valid email address.",
    services: "Pick at least one so we can quote it.",
    requirements: "A line or two is enough.",
  },
  cancel: "Cancel",
  submit: "Continue to WhatsApp",
  note: "Opens WhatsApp with this already typed — you just press send.",
};
