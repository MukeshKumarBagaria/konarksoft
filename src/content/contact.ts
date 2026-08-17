import { siteConfig } from "@/config/site";
import type { ContactContent } from "@/types/content";

/**
 * The options in the form's service picker. Typed as plain strings rather than
 * a literal union because the server checks a submitted value against this list
 * at runtime — see `validateContactSubmission`.
 */
export const contactServices: readonly string[] = [
  "Website Development",
  "Mobile App Development",
  "Web & Mobile Design",
  "Meta & Google Ads",
  "Something else",
];

export const contactContent: ContactContent = {
  meta: {
    title: "Contact",
    description: `Start a project with ${siteConfig.name} — tell us what you are building and we will reply within one business day.`,
  },
  canonical: "/contact",
  header: {
    eyebrow: "Contact",
    title: "Get In",
    accent: "Touch",
    description:
      "Tell us what you are building, or what is underperforming. We read every message and reply within one business day.",
  },
  card: {
    heading: { lead: siteConfig.name, accent: "Your Design", trail: "Partner" },
    form: {
      title: { lead: "Contact", accent: "Us" },
      fields: {
        name: { label: "Name", placeholder: "Enter Your Name" },
        email: { label: "Email", placeholder: "Enter Your Email" },
        phone: { label: "Phone", placeholder: "Enter Your Phone Number" },
        service: { label: "Services", placeholder: "Select a Service" },
        message: { label: "Message", placeholder: "Enter Your Message" },
      },
      services: contactServices,
      submit: "Submit Now",
      pending: "Sending…",
      success: {
        title: "Message sent",
        description:
          "Thanks — it is with us. Expect a reply within one business day.",
        again: "Send another",
      },
      error:
        "That did not send. Try again, or email us directly at " +
        siteConfig.contactEmail,
    },
  },
};
