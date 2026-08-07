import type { MetadataRoute } from "next";
import {
  getAllProductsForSitemap,
  getCategories,
  getServices,
} from "@/services/catalog";
import { SITE } from "@/lib/seo/site";

const BASE_URL = SITE.url;

/**
 * Only published records reach the sitemap — the API filters drafts — so a
 * half-finished product page is never submitted for indexing.
 *
 * Deliberately dynamic rather than ISR: a prerendered sitemap is generated at
 * build time, when the API is usually unreachable, and would silently ship with
 * only the static routes. Crawlers fetch this rarely, so a live database read
 * per request is the right trade for never publishing an incomplete sitemap.
 */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/estimate`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const [categories, products, services] = await Promise.all([
      getCategories(),
      // Every published product must be discoverable — the catalogue is the
      // long-tail engine.
      getAllProductsForSitemap(),
      getServices(),
    ]);

    return [
      ...staticRoutes,
      ...categories.map((category) => ({
        url: `${BASE_URL}/products/${category.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...products.map((product) => ({
        url: `${BASE_URL}/products/${product.category.slug}/${product.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
      ...services.map((service) => ({
        url: `${BASE_URL}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch (error) {
    // Never fail the sitemap on an API hiccup — a 500 sitemap is worse for
    // indexing than one listing only the static pages. But do say so loudly:
    // a silently truncated sitemap looks identical to a healthy one.
    console.error(
      "[sitemap] catalogue fetch failed — serving static routes only:",
      error instanceof Error ? error.message : error,
    );
    return staticRoutes;
  }
}
