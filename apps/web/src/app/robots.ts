import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/pricing", "/about"],
      disallow: ["/dashboard/", "/api/", "/settings/"],
    },
    sitemap: `${process.env.NEXTAUTH_URL || "https://payzen.app"}/sitemap.xml`,
  };
}
