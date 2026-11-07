import { redirect, RedirectType } from "next/navigation";

// Work case studies are temporarily removed until genuine client work history is published.
// Underlying source content is preserved in content/work/*.mdx.
// Return empty array so no static HTML or RSC files are pre-rendered into the build.
export async function generateStaticParams() {
  return [];
}

export default async function WorkDetailPage() {
  redirect("/", RedirectType.replace);
}

/* Preserved for future restoration:
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/sections/detail-page";
import { getEntriesAsync, getEntryAsync } from "@/lib/content/repository";
import { createMetadata } from "@/lib/seo/metadata";

export async function preservedGenerateStaticParams() {
  return (await getEntriesAsync("work")).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryAsync("work", slug);
  return entry
    ? createMetadata({
        title: entry.title,
        description: entry.summary,
        path: `/work/${entry.slug}`
      })
    : {};
}

export async function PreservedWorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryAsync("work", slug);
  if (!entry) notFound();
  return <DetailPage entry={entry} backHref="/work" backLabel="Work" />;
}
*/
