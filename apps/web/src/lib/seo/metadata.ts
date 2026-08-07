import type { Metadata } from "next";
import type {
  ProductCategoryDetail,
  ProductDetail,
  ServiceDetail,
} from "@wahab/types";
import { SITE, absoluteUrl } from "./site";
import { formatPkr } from "@/lib/format";

/**
 * Title and description formulas from docs/08-seo-strategy.md §4.
 *
 * These exist so a generated catalogue cannot drift into duplicate titles, which
 * is the default failure mode of programmatic pages and a hard ranking cap.
 *
 * Two rules that are easy to get wrong:
 *  - Generated titles must NOT contain the site name. The root layout applies
 *    `template: "%s — Al-Wahab Solar Traders"`, so adding it here prints it twice.
 *  - An admin-supplied metaTitle is authoritative and already includes whatever
 *    branding they want, so it is passed through as `absolute` to bypass the
 *    template.
 */

/** Descriptions must stay under ~155 chars or Google truncates them. */
function clamp(text: string, max = 155): string {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed.length <= max) return collapsed;
  return `${collapsed.slice(0, max - 1).trimEnd()}…`;
}

function baseMetadata(options: {
  /** Generated title — the layout template appends the site name. */
  title?: string;
  /** Admin-supplied title — used verbatim. */
  absoluteTitle?: string | null;
  description: string;
  path: string;
  images?: string[];
}): Metadata {
  const title = options.absoluteTitle
    ? { absolute: options.absoluteTitle }
    : (options.title ?? SITE.name);

  const ogTitle = options.absoluteTitle ?? options.title ?? SITE.name;

  return {
    title,
    description: clamp(options.description),
    alternates: { canonical: absoluteUrl(options.path) },
    openGraph: {
      title: ogTitle,
      description: clamp(options.description),
      url: absoluteUrl(options.path),
      siteName: SITE.name,
      type: "website",
      ...(options.images?.length ? { images: options.images } : {}),
    },
  };
}

/**
 * Products are often named with the brand already in them ("Growatt SPF 5000
 * ES"), so prefixing the brand unconditionally produced "Growatt Growatt SPF…".
 */
function withBrand(name: string, brand?: string | null): string {
  if (!brand) return name;
  return name.toLowerCase().startsWith(brand.toLowerCase())
    ? name
    : `${brand} ${name}`;
}

export function categoryMetadata(category: ProductCategoryDetail): Metadata {
  const description =
    category.metaDescription ??
    category.summaryEn ??
    `${category.nameEn} available in ${SITE.city} from ${SITE.name}. Genuine products, warranty backed, supplied and installed by our own team.`;

  return baseMetadata({
    absoluteTitle: category.metaTitle,
    title: `${category.nameEn} in ${SITE.city} — Prices & Models`,
    description,
    path: `/products/${category.slug}`,
  });
}

export function productMetadata(product: ProductDetail): Metadata {
  const fullName = withBrand(product.nameEn, product.brand?.name);
  const hasPrice = product.priceMode !== "on_request" && product.pricePkr;

  const title = hasPrice
    ? `${fullName} Price in ${SITE.city} — ${formatPkr(product.pricePkr)}`
    : `${fullName} in ${SITE.city}`;

  const specSummary = Object.entries(product.specs ?? {})
    .slice(0, 3)
    .map(([key, value]) => `${key.replace(/_/g, " ")} ${String(value)}`)
    .join(", ");

  const description =
    product.metaDescription ??
    product.summaryEn ??
    `${fullName}${specSummary ? ` — ${specSummary}` : ""}. Available in ${SITE.city}. WhatsApp us for current price and availability.`;

  return baseMetadata({
    absoluteTitle: product.metaTitle,
    title,
    description,
    path: `/products/${product.category.slug}/${product.slug}`,
    images: product.images.map((image) => image.url),
  });
}

export function serviceMetadata(service: ServiceDetail): Metadata {
  const description =
    service.metaDescription ??
    service.summaryEn ??
    `${service.nameEn} in ${SITE.city} by ${SITE.name}.`;

  return baseMetadata({
    absoluteTitle: service.metaTitle,
    title: `${service.nameEn} in ${SITE.city}`,
    description,
    path: `/services/${service.slug}`,
  });
}
