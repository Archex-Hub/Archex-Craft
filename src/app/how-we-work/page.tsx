import { HowWeWorkPage as HowWeWorkContent } from "@/components/sections/how-we-work-page";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "How We Work",
  description:
    "A clear, deliberate software engineering process from understanding the problem to delivering working software and the next improvement.",
  path: "/how-we-work"
});

export default function HowWeWorkPage() {
  return <HowWeWorkContent />;
}
