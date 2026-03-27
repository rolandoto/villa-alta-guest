import type { MetadataRoute } from "next";
import { ROOMS } from "@/app/data/hotel";

const BASE_URL = "https://villa-alta-guest-house.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/galeria`,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/suites`,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const suitesEntries: MetadataRoute.Sitemap = ROOMS.map((room) => ({
    url: `${BASE_URL}/suites/${room.slug}`,
    lastModified: updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...suitesEntries];
}
