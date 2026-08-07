import type {
  ProductCategorySummary,
  ProductDetail,
  ProductSummary,
  ServiceDetail,
  StockStatus,
} from "@wahab/types";
import { ORG_ID, SITE, absoluteUrl } from "./site";

/**
 * Typed JSON-LD builders. Per docs/08-seo-strategy.md §3, JSON-LD is never
 * hand-written in a page component — it comes from here so the shape stays
 * consistent across a generated catalogue.
 *
 * Builders omit `@context`: pages combine them under a single `@graph`.
 */

type Json = Record<string, unknown>;

const STOCK_MAP: Record<StockStatus, string> = {
  in_stock: "https://schema.org/InStock",
  out_of_stock: "https://schema.org/OutOfStock",
  preorder: "https://schema.org/PreOrder",
  discontinued: "https://schema.org/Discontinued",
};

/** Drops null/undefined/empty values so we never emit hollow properties. */
function compact(input: Json): Json {
  return Object.fromEntries(
    Object.entries(input).filter(([, v]) => {
      if (v === null || v === undefined || v === "") return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  );
}

export function organizationSchema(): Json {
  return compact({
    "@type": "ElectricalContractor",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/logo-mark.svg"),
    telephone: SITE.telephone,
    email: SITE.email,
    description:
      "Lahore's honest solar estimator. Price your system, book a free survey, and let our own certified team supply and install it.",
    priceRange: "$$",
    address: compact({
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    }),
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    // The city plus the specific roads we cover. Named areas are what surface
    // for "<service> near <road>" searches.
    areaServed: [
      { "@type": "City", name: SITE.city },
      ...SITE.serviceAreas.map((area) => ({
        "@type": "Place",
        name: `${area}, ${SITE.city}`,
      })),
    ],
    // Opening hours are a map-pack signal and must match Google Business
    // Profile. Displayed hours and these values come from the same constant.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SITE.openingHours.days,
        opens: SITE.openingHours.opens,
        closes: SITE.openingHours.closes,
      },
    ],
    hasMap: SITE.googleMapsUrl,
    currenciesAccepted: "PKR",
    // Tie the site to the Google Business Profile entity explicitly.
    sameAs: [SITE.googleMapsUrl, ...SITE.socials],
  });
}

/**
 * FAQPage. Local searchers ask questions ("do I need net metering in Lahore?"),
 * and FAQ rich results occupy extra height in the result — worth having on the
 * one page that already holds this content.
 */
export function faqSchema(
  faqs: Array<{ question: string; answer: string }>,
): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** ContactPage, referencing the one organisation entity by @id. */
export function contactPageSchema(): Json {
  return {
    "@type": "ContactPage",
    url: absoluteUrl("/contact"),
    mainEntity: { "@id": ORG_ID },
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(
  crumbs: Array<{ name: string; path: string }>,
): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      // schema.org positions are 1-based.
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function itemListSchema(
  products: ProductSummary[],
  pathFor: (product: ProductSummary) => string,
): Json {
  return {
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(pathFor(product)),
      name: product.nameEn,
    })),
  };
}

export function collectionPageSchema(category: ProductCategorySummary): Json {
  return compact({
    "@type": "CollectionPage",
    name: category.nameEn,
    description: category.summaryEn,
    url: absoluteUrl(`/products/${category.slug}`),
    isPartOf: { "@id": `${SITE.url}/#website` },
  });
}

/**
 * Product schema.
 *
 * Critical: when a product is quote-only we omit `offers` entirely. Emitting an
 * Offer with a missing or zero price is invalid structured data and can suppress
 * rich results across the whole catalogue. See docs/08-seo-strategy.md §3.3.
 */
export function productSchema(product: ProductDetail, path: string): Json {
  const hasPrice =
    product.priceMode !== "on_request" &&
    product.pricePkr !== null &&
    product.pricePkr !== undefined;

  const specs = Object.entries(product.specs ?? {}).map(([name, value]) => ({
    "@type": "PropertyValue",
    name: humanizeSpecKey(name),
    value: String(value),
  }));

  return compact({
    "@type": "Product",
    name: product.nameEn,
    description: product.summaryEn,
    url: absoluteUrl(path),
    sku: product.sku,
    image: product.images.map((image) => image.url),
    brand: product.brand
      ? { "@type": "Brand", name: product.brand.name }
      : undefined,
    category: product.category.nameEn,
    additionalProperty: specs,
    ...(hasPrice
      ? {
          offers: compact({
            "@type": "Offer",
            url: absoluteUrl(path),
            price: product.pricePkr,
            priceCurrency: product.currency,
            availability: STOCK_MAP[product.stockStatus],
            seller: { "@id": ORG_ID },
          }),
        }
      : {}),
    // No aggregateRating until real approved reviews exist — inventing one is a
    // manual-action risk.
  });
}

export function serviceSchema(service: ServiceDetail, path: string): Json {
  return compact({
    "@type": "Service",
    name: service.nameEn,
    description: service.summaryEn,
    url: absoluteUrl(path),
    serviceType: service.nameEn,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: SITE.city },
    ...(service.priceMode !== "on_request" && service.priceFromPkr
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "PKR",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: service.priceFromPkr,
              priceCurrency: "PKR",
            },
          },
        }
      : {}),
  });
}

/** Wraps builders into a single @graph document for a page. */
export function graph(...nodes: Json[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

/** Domain acronyms and units that must not be sentence-cased. */
const SPEC_TOKENS: Record<string, string> = {
  mppt: "MPPT",
  pv: "PV",
  dc: "DC",
  ac: "AC",
  lfp: "LFP",
  bms: "BMS",
  ip: "IP",
  kw: "kW",
  kwh: "kWh",
  kwp: "kWp",
  w: "W",
  v: "V",
  a: "A",
  mm: "mm",
  sqft: "sq ft",
  pct: "%",
};

/** `rated_power_kw` → `Rated power kW`. Used for spec tables and JSON-LD. */
export function humanizeSpecKey(key: string): string {
  const words = key.split("_").filter(Boolean);

  return words
    .map((word, index) => {
      const token = SPEC_TOKENS[word.toLowerCase()];
      if (token) return token;
      return index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word;
    })
    .join(" ");
}
