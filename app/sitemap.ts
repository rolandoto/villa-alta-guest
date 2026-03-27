import type { MetadataRoute } from "next";
import { ROOMS } from "@/app/data/hotel";

const BASE_URL = "https://villa-alta-guest-house.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/galeria", "/gallery", "/suites", "/contacto"];

  const staticEntries = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const suitesEntries = ROOMS.map((room) => ({
    url: `${BASE_URL}/suites/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...suitesEntries];
}
