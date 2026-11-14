import { AboutPageContent } from "@/components/sections/about-page";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "About",
  description:
    "Archex Craft is an independent solutions engineering practice. We build durable software, practical AI workflows, and modern cloud systems with zero agency fluff.",
  path: "/about"
});

export default function AboutPage() {
  return <AboutPageContent />;
}
