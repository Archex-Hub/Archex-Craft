import { AboutPageContent } from "@/components/sections/about-page";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "About",
  description:
    "Archex Craft is an independent software engineering practice. We build high-performance websites, custom applications, and reliable backend systems with direct technical collaboration.",
  path: "/about"
});

export default function AboutPage() {
  return <AboutPageContent />;
}
