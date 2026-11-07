import { redirect, RedirectType } from "next/navigation";

// Work showcase is temporarily removed until genuine client work history is published.
// Underlying source content is preserved in content/work/*.mdx.
export default function WorkPage() {
  redirect("/", RedirectType.replace);
}

/* Preserved for future restoration:
import { Container, Section } from "@/components/layout/container";
import { EntryGrid } from "@/components/sections/entry-grid";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { getEntriesAsync } from "@/lib/content/repository";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Work",
  description:
    "Illustrative engineering examples covering AI-assisted intake and legacy operations software.",
  path: "/work"
});

export async function PreservedWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Illustrative engineering examples."
        summary="These entries describe plausible software problems and engineering approaches. They are not client case studies and contain no claimed results."
      />
      <Section>
        <Container>
          <EntryGrid entries={await getEntriesAsync("work")} />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
*/
