import type { MetadataRoute } from "next";
import { dishes } from "@/data/dishes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://taame-iran.example.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/dishes`, changeFrequency: "weekly", priority: 0.9 },
    ...dishes.map((d) => ({
      url: `${base}/dishes/${d.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
