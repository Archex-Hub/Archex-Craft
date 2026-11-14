import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/how-we-work",
    "/about",
    "/contact",
    "/start-project",
    "/privacy",
    "/terms"
  ];

  return staticRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString()
  }));
}
