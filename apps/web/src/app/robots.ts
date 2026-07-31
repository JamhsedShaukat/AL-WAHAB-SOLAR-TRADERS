import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api/",
          // Client portal — authenticated, nothing to index.
          "/dashboard",
          "/estimates",
          "/projects",
          "/notifications",
          "/profile",
          // Auth screens.
          "/login",
          "/signup",
          "/verify",
          "/reset",
        ],
      },
    ],
    sitemap: "https://alwahabsolar.pk/sitemap.xml",
  };
}
