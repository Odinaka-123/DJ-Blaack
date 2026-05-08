import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dj-blaack.vercel.app",
      lastModified: new Date(),
      priority: 1,
    },
  ];
}