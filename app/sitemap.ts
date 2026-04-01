import type { MetadataRoute } from "next";
import { ROOMS } from "@/app/data/hotel";
import { SITE_URL } from "@/app/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/galeria`,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/suites`,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const suitesEntries: MetadataRoute.Sitemap = ROOMS.map((room) => ({
    url: `${SITE_URL}/suites/${room.slug}`,
    lastModified: updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...suitesEntries];
}
