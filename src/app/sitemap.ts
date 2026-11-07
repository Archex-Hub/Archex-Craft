import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getEntriesAsync, getPublishedServiceCategories } from "@/lib/content/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/ai-solutions",
    "/modernization",
    "/industries",
    "/insights",
    "/how-we-work",
    "/about",
    "/contact",
    "/start-project",
    "/privacy",
    "/terms"
  ];
  const [entriesByKind, serviceCategories] = await Promise.all([
    Promise.all(
      ["services", "modernization", "industries", "insights"].map((kind) =>
        getEntriesAsync(kind as "services" | "modernization" | "industries" | "insights")
      )
    ),
    getPublishedServiceCategories()
  ]);
  const entries = entriesByKind.flat();

  const lastModified = (updated?: string, published?: string) => {
    for (const value of [updated, published]) {
      if (!value) continue;
      const date = new Date(value);
      if (!Number.isNaN(date.valueOf()) && date.valueOf() <= Date.now()) return date.toISOString();
    }
    return undefined;
  };

  const routeEntries: Array<{ href: string; lastModified?: string }> = [
    ...staticRoutes.map((route) => ({ href: route })),
    ...serviceCategories.flatMap((category) =>
      category.services.map((service) => ({ href: service.href }))
    ),
    ...entries.map((entry) => ({
      href: entry.href,
      lastModified: lastModified(entry.updated, entry.date)
    }))
  ];

  const uniqueEntries = new Map<string, (typeof routeEntries)[number]>();
  for (const entry of routeEntries) {
    const existing = uniqueEntries.get(entry.href);
    if (!existing || (!existing.lastModified && entry.lastModified)) {
      uniqueEntries.set(entry.href, entry);
    }
  }

  return [...uniqueEntries.values()].map((entry) => ({
    url: new URL(entry.href, siteConfig.url).toString(),
    ...(entry.lastModified ? { lastModified: new Date(entry.lastModified) } : {})
  }));
}
