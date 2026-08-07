/** Single source of truth for the values SEO output depends on. */
export const SITE = {
  name: "Al-Wahab Solar Traders",
  shortName: "Al-Wahab Solar",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alwahabsolar.pk",
  city: "Lahore",
  region: "Punjab",
  country: "PK",
  /** Main business line. The WhatsApp number is separate — it lives in the
   *  `business.whatsapp_number` setting so staff can change it without a deploy. */
  telephone: "+924211176576",
  whatsapp: "+923294777785",
  email: "info@alwahabsolar.pk",

  /**
   * Taken from the live Google Business Profile listing, because for local
   * search GBP is the authority and the site must match it byte-for-byte —
   * inconsistent NAP data actively suppresses local ranking
   * (docs/08-seo-strategy.md §7.3).
   */
  streetAddress: "Plot 62, J1 Block, Phase 2, Johar Town",
  postalCode: "54782",

  /**
   * Roads and neighbourhoods we cover. These feed `areaServed`, which is what
   * actually helps for "solar installation near <road>" queries — putting them
   * in the street address would just produce one invalid address.
   */
  serviceAreas: [
    "Johar Town",
    "Khayaban-e-Firdousi",
    "Canal Bank Road",
    "Maulana Shaukat Ali Road",
  ] as string[],

  /** The real pin from the Google Business Profile listing. */
  latitude: 31.4698867,
  longitude: 74.2505974,

  /**
   * Google Plus Code. Worth showing alongside the street address: plot-and-block
   * addressing in Lahore is ambiguous, and a Plus Code resolves to the exact
   * doorway in any maps app.
   */
  plusCode: "F792+X6 Lahore",

  /**
   * Canonical Google Maps place URL. Preferred over a coordinate search for
   * `hasMap`, and included in `sameAs` so the site and the GBP listing are
   * explicitly tied to the same entity.
   */
  googleMapsUrl:
    "https://www.google.com/maps/place/Al-Wahab+Solar+Traders/@31.4698867,74.2505974,17z/data=!4m6!3m5!1s0x391903a08ce12075:0x79a89de741ca77e3!8m2!3d31.4698867!4d74.2505974!16s%2Fg%2F11y5v5s_91",

  /** Must match the hours published on Google Business Profile exactly. */
  openingHours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "18:00",
  },

  socials: [] as string[],
} as const;

/** Stable @id for the organisation entity, referenced by every other schema. */
export const ORG_ID = `${SITE.url}/#organization`;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
