import { heroContent } from "@/content/home";
import { capabilitiesContent } from "@/content/services";
import { Capabilities } from "@/features/marketing/components/capabilities";
import { Hero } from "@/features/marketing/components/hero";

export default function HomePage() {
  return (
    <>
      <Hero content={heroContent} />
      <Capabilities content={capabilitiesContent} />
    </>
  );
}
