import type { MetadataRoute } from "next";
import { siteOrigin, publicRoutes } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteOrigin
    ? publicRoutes.map((path) => ({
        url: new URL(path, siteOrigin).href,
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.7,
      }))
    : [];
}
